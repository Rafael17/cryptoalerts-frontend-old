
const Chart = {

    removedNodes: {},

    appendGContent: (containers) => {
        var color = d3.scale.category10();
        containers.append("circle")
            .attr("fill",function(d,i){ return color(i);})
            .attr("stroke", function(d,i){ return color(i);})
        containers.append("text")
            .text(function(d){return d3.select(this.parentNode).datum().symbol});
    },

    draw: (svg, { width, height }, firstPass = true) => {
        
        var force = d3.layout.force()
            .nodes(Chart.nodes)
            .size([width, height])
            .gravity(.02)
            .charge(2)
            .on("tick", tick)
            .start();

        var containers = svg.selectAll("g")
            .data(Chart.nodes, d => d.name)

        containers.exit().remove();
        containers.enter()
            .append("g")
            .on("dblclick",function(d, i) {
                const removedNode = Chart.nodes.splice(d.index,1)[0];
                Chart.removedNodes[removedNode.symbol] = removedNode;
                var maxCap = Chart.nodes.reduce((acc, { market_cap }) => { return acc + market_cap}, 0);
                Chart.nodes = Chart.nodes.map((n,index) => {
                    n.radius = Chart.getRadius(n.market_cap, maxCap)
                    return n;
                })
                Chart.draw(svg, { width, height }, false)
              })
              .call(force.drag);
        
        if(firstPass) {
            Chart.appendGContent(containers);
        }

        d3.selectAll("circle")
            .attr("r", function(d) { return d3.select(this.parentNode).datum().radius })

        d3.selectAll("text")
            .style("font-size", function(d) { return d3.select(this.parentNode).datum().radius / 2; })
            

        function tick(e) {
            containers
                .each(Chart.collide(.3))
                .attr("transform", function(d){return "translate("+d.x+","+d.y+")"})
        }
    },

    // Resolves collisions between d and all other circles.
    collide: (alpha) => {
        const padding = 3; // separation between same-color circles
        var quadtree = d3.geom.quadtree(Chart.nodes);
        return function(d) {
            var r = d.radius + Chart.maxRadius + padding,
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;
            quadtree.visit(function(quad, x1, y1, x2, y2) {
                if (quad.point && (quad.point !== d)) {
                    var x = d.x - quad.point.x,
                    y = d.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = d.radius + quad.point.radius + padding;
                    if (l < r) {
                        l = (l - r) / l * alpha;
                        d.x -= x *= l;
                        d.y -= y *= l;
                        quad.point.x += x;
                        quad.point.y += y;
                    }
                }
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
        };
    },

    getRadius: (market_cap, maxCap) => {
        const xPercent = market_cap / maxCap;
        return Math.sqrt(xPercent * Chart.maxArea/ Math.PI);
    },

    start: (unparsedData) => {
        const data = unparsedData.map( ({symbol, name, quote}) => {
            const {price, market_cap} = quote.USD
            return {symbol, name, price, market_cap }
        })
        const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      
        Chart.maxRadius = Math.max(vw,vh) / 7;
        Chart.maxArea = Math.PI * Chart.maxRadius * Chart.maxRadius;

        var n = data.length; 
        var maxCap = data.reduce((acc, { market_cap }) => { return acc + market_cap}, 0);
        Chart.nodes = data.map(function(e, index) {
            const { market_cap, name, price, symbol } = data[index];
            const r = Chart.getRadius(market_cap, maxCap)
            const rounder = (price < 1 ? 10000 : 100);
            const d = {radius: r, symbol, market_cap, name, price: Math.round(price * rounder) / rounder };
            return d;
        });

        var svg = d3.select(".svg-container").append("svg")
            .attr("width", vw)
            .attr("height", vh);

        Chart.draw(svg, {width: vw, height: vh});
    }
}

export default Chart;
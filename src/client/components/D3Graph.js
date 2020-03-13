import React, { Component } from 'react'

class Graph extends React.Component {

    componentDidMount() {

      fetch('/api/coinmarketcap', {headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(result => {
          this.drawD3Object(result);
        });
    }

    drawD3Object (unparsedData) {
      const data = unparsedData.map( ({symbol, name, quote}) => {
        const {price, market_cap} = quote.USD
        return {symbol, name, price, market_cap }
      })
      
      var width = this.props.width,
          height = this.props.height,
          padding = 1.5, // separation between same-color circles
          clusterPadding = 6, // separation between different-color circles
          maxRadius = 200,
          maxArea = Math.PI * maxRadius * maxRadius

      //data.splice(2,98)
      var n = data.length; 
      var color = d3.scale.category10();

      var maxCap = data.reduce((acc, { market_cap }) => { return acc + market_cap}, 0);
      var nodes = d3.range(n).map(function(e, index) {
        const { market_cap, name, price, symbol } = data[index];
        const xPercent = market_cap / maxCap;
        const r = Math.sqrt(xPercent * maxArea/ Math.PI)
        const rounder = (price < 1 ? 10000 : 100);
        const d = {cluster: 0, radius: r, symbol, name, price: Math.round(price * rounder) / rounder };
        return d;
      });

      var svg = d3.select(".svg-container").append("svg")
          .attr("width", width)
          .attr("height", height);

      function draw(firstPass) {
        
        var force = d3.layout.force()
          .nodes(nodes)
          .size([width, height])
          .gravity(.06)
          .charge(.4)
          .on("tick", tick)
          .start();

        var containers = svg.selectAll("g")
          .data(nodes)

        containers.exit().remove();
        containers.enter()
          .append("g")
          .on("dblclick",function(d, i) {
            this.remove();
            nodes.splice(d.index,1);
            data.splice(d.index,1);
            maxCap = data.reduce((acc, { market_cap }) => { return acc + market_cap}, 0);
            
            nodes = nodes.map((n,index) => {
              const xPercent = data[index].market_cap / maxCap;
              const r = Math.sqrt(xPercent * maxArea/ Math.PI)
              //const r = xPercent * maxRadius;
              n.radius = r;
              return n;
            })
            draw(false)
          })
          .call(force.drag);
        
        if(firstPass) {
          containers.append("circle").attr("fill",function(d,i){ return color(i);})
          containers.append("text");
        }

        svg.selectAll("circle")
          .transition()
          .duration(1000)
          .attr("r", function(d) { return d3.select(this.parentNode).datum().radius })

        svg.selectAll("text")
          .style("font-size", function(d) { return d3.select(this.parentNode).datum().radius / 2; })
          .text(function(d){return d3.select(this.parentNode).datum().symbol})

        function tick(e) {
          containers
              .each(collide(.3))
              .attr("transform", function(d){return "translate("+d.x+","+d.y+")"})
        }
      }

      draw(true);
      
      // Resolves collisions between d and all other circles.
      function collide(alpha) {
        var quadtree = d3.geom.quadtree(nodes);
        return function(d) {
          var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
              nx1 = d.x - r,
              nx2 = d.x + r,
              ny1 = d.y - r,
              ny2 = d.y + r;
          quadtree.visit(function(quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== d)) {
              var x = d.x - quad.point.x,
                  y = d.y - quad.point.y,
                  l = Math.sqrt(x * x + y * y),
                  r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
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
      }
    }

    render() {
      return <div className="svg-container"></div>
    }
}

export default Graph
import React, { Component } from 'react'
import Chart from './d3MarketcapChart'

class Graph extends React.Component {

    componentDidMount() {

      fetch('/api/coinmarketcap', {headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(result => {
          this.drawD3Object(result);
        });
    }

    drawD3Object (unparsedData) {
      Chart.start(unparsedData, this.props);
    }

    render() {
      return <div className="svg-container"></div>
    }
}

export default Graph
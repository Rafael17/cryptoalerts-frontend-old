import React, { Component } from 'react';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import D3Graph from './../../components/d3MarketcapChart';

class PriceAlerts extends Component {

  componentDidMount() {
    fetch('/api/coinmarketcap', { headers: { 'Content-Type': 'application/json' } })
      .then(response => response.json())
      .then(result => {
        this.drawD3Object(result);
      });
  }

  drawD3Object(unparsedData) {
    D3Graph.start(unparsedData);
  }

  render() {
    return (
      <div className="svg-container"></div>
    )
  }
}

export default PriceAlerts;
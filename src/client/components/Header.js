import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Header extends Component {



	handleSignout = (event) => {
		fetch('/api/logout', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'}})
		.then(response => response.json())
		.then(response => {console.log(response)})

		this.props.history.push('/');
	}

	handlePageSelect = (event) => {
		this.props.history.push('/'+event.currentTarget.dataset.page)
	}
	render() {
		return(
			<nav className="navbar navbar-expand">
				<div data-page="alerts" onClick={this.handlePageSelect} className={(this.props.page === 'alerts' ? 'nav-selected ' : '') + "nav-item nav-item-custom"}>
					<div className="">
						Alerts
					</div>
				</div>
				<div data-page="market-cap" onClick={this.handlePageSelect} className={(this.props.page === 'market-cap' ? 'nav-selected ' : '') + "nav-item nav-item-custom"}>
					<div className="">
						Market Cap
					</div>
				</div>
				<div className="nav-item">
					<button onClick={this.handleSignout} className="btn navbar-btn btn-outline-dark">Sign Out</button>
				</div>
			</nav>
		)
	}
}

export default withRouter(Header);
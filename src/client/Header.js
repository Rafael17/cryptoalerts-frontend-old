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
	render() {
		return(
			<nav className="navbar navbar-expand">
				<div className="nav-item">
					<div className="navbar-brand">
						Price Alerts
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
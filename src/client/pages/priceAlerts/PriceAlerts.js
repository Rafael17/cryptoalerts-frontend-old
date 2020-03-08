import React, { Component } from 'react';
import './price-alerts.scss';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import CreateAlertForm from './../../components/forms/CreateAlert';
import Modal from './../../components/Modal';

class PriceAlerts extends Component {

	state = {
		pairs: null,
		hideCreatePrice: true,
		alerts: [],
		userData: {telegramPasscode: null},
		showModal: false,
		modal: {title: "", body: ""},
		botName: ""
	}

	updateAlerts = () => {
		fetch('/api/price-alerts', {headers: {'Content-Type': 'application/json'}})
		.then(response => response.json())
		.then((result) => {
			console.log(result);
			this.setState(result);
		})
	}

	componentDidMount() {
		this.updateAlerts();
    }

    handleButtonClick = (event) => {
    	this.setState({hideCreatePrice:false});
    }

    handleCancelCreateAlert = (event) => {
		this.setState({hideCreatePrice:true});
	}

	handleDeleteAlert = (event) => {
		const id = event.target.dataset.id;
		
		fetch('/api/alerts/' + id, {
			headers: {'Content-Type': 'application/json'},
			method: 'DELETE',
		})
		.then(response => response.json())
		.then((result) => {
			if(result.success) {
				this.updateAlerts();
			}
		})
	}

	showModalError = (modalData) => {
		this.setState(modalData);
		this.setState({showModal:true})
	}

	hideModal = () => {
		this.setState({showModal:false})
	}

	render() {
		const thead = ['Exchange', 'Trading Pair', 'Price', 'Cross Type', 'Message', 'Delete'];
		
		const theadHTML = thead.map((title, index) => <td key={index}>{title}</td>)
		const hideOverlay = (this.state.hideCreatePrice ? " hide" : "");
		const alertsHTML = this.state.alerts.map( (e, i) => {
			return(
				<tr key={i}>
					<td>{e.exchange}</td>
					<td>{e.pair}</td>
					<td>{e.price}</td>
					<td>{e.cross}</td>
					<td>{e.message}</td>
					<td><button data-id={e._id} className="btn btn-outline-dark" onClick={this.handleDeleteAlert}>X</button></td>
				</tr>
			)}
		);

		return(
			<div>
				<Header />
				<div>
					<table className="table table-bordered table-striped">
						<thead className="thead-dark">
							<tr>
								{ theadHTML }
							</tr>
						</thead>
						<tbody>
							{ alertsHTML }
						</tbody>
					</table>
				</div>
				<button className="btn btn-outline-dark" onClick={this.handleButtonClick}>Create Alert</button>
				<CreateAlertForm 
					updateAlerts={this.updateAlerts} 
					handleCancelCreateAlert={this.handleCancelCreateAlert} 
					hide={this.state.hideCreatePrice} 
					pairs={this.state.pairs}
					userData={this.state.userData}
					botName={this.state.botName}
					showModalError={this.showModalError}
				/>
				<Footer />
				<Modal 
					title={this.state.modal.title}
					body={this.state.modal.body}
					show={this.state.showModal}
					hideModal={this.hideModal}
				/>
				<div className={"overlay" + hideOverlay}></div>
			</div>
		)
	}
}

export default PriceAlerts;
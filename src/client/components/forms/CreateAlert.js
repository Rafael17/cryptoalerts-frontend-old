import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import AlertModal from '../modal/AlertModal';

class CreateAlert extends Component {

	state = {
		price: "",
		exchangePair: "",
		cross: "Cross Up",
		message: "",
		exchange: "",
		pair: "",
		userData: null,
		isAlertModalOpen: false
	}

	handleSelectPairChange = (selectedOption) => {
		this.setState({ exchangePair: selectedOption });
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	submitForm = () => {
		const { value } = this.state.exchangePair;
		const data = this.state;

		if (value === undefined) {
			this.setState({ isAlertModalOpen: true, errorTitle: "Whoops", errorMessage: "Please select a Trading Pair from the list" });
			return;
		}
		if (!data.price) {
			this.setState({ isAlertModalOpen: true, errorTitle: "Whoops", errorMessage: "Please add a target price" });
			return;
		}

		data.exchange = value.split(" - ")[0];
		data.pair = value.split(" - ")[1];

		fetch('/api/alerts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then((result) => {
				if (result.success) {
					this.props.updateAlerts();
					this.props.handleCancelCreateAlert();
				}
			})
	}

	handleSubmit = (event) => {
		event.preventDefault();

		// check if user has set up telegram before continuing
		const { telegramChatId, _id } = this.props.userData;

		if (telegramChatId === undefined) {
			fetch('/api/users/' + _id + '/?filters=telegramChatId', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			})
				.then(response => response.json())
				.then(result => {
					if (result.error) {
						this.setState({ isAlertModalOpen: true, errorTitle: "Telegram has not been linked!", errorMessage: this.renderModalBody() });
					} else {
						this.submitForm();
					}
				});
		} else {
			this.submitForm();
		}

	}

	renderModalBody = () => {
		return (
			<p>To send/receive alerts we use Telegram. Please set up Telegram notifications by sending the following passcode
				<span className="highlight"> {this.props.userData.telegramPasscode}</span> to <span className="highlight">{this.props.botName} </span>
		to receive alerts right on your phone</p>
		)
	}

	render() {

		const hideCreatePrice = (this.props.hide ? "hide" : "");

		return (
			< div className={"create-price-box " + hideCreatePrice} >
				<AlertModal isOpen={this.state.isAlertModalOpen} title={this.state.errorTitle} hideModal={() => this.setState({ isAlertModalOpen: false })}>
					{this.state.errorMessage}
				</AlertModal>
				<form autoComplete="off" onSubmit={this.handleSubmit}>
					<div className="form-group row margin-zero">
						<label className="col-sm-3 col-form-label col-form-label-sm">Trading Pair</label>
						<div className="col-sm-9">
							<Select
								value={this.state.exchangePair}
								name="exchangePair"
								onChange={this.handleSelectPairChange}
								options={this.props.pairs}
							/>
						</div>
					</div>
					<div className="form-group row margin-zero">
						<label className="col-sm-3 col-form-label col-form-label-sm">Target Price</label>
						<div className="col-sm-9">
							<input
								className="form-control"
								type="number"
								onChange={this.handleChange}
								name="price"
								value={this.state.price}
							/>
						</div>
					</div>
					<div className="form-group row margin-zero">
						<label className="col-sm-3 col-form-label col-form-label-sm">Cross Type</label>
						<div className="col-sm-9">
							<div className="radio">
								<label style={{ paddingRight: 20 }}>
									<input
										type="radio"
										value="Cross Up"
										name="cross"
										checked={this.state.cross === "Cross Up"}
										onChange={this.handleChange}
									/> Up
								</label>
								<label>
									<input
										type="radio"
										value="Cross Down"
										name="cross"
										checked={this.state.cross === "Cross Down"}
										onChange={this.handleChange}
									/> Down
								</label>
							</div>
						</div>
					</div>
					<div className="form-group row margin-zero">
						<label className="col-sm-3 col-form-label col-form-label-sm">Message</label>
						<div className="col-sm-9">
							<textarea
								className="form-control"
								type="text"
								onChange={this.handleChange}
								name="message"
								value={this.state.message}
							/>
						</div>
					</div>
					<div className="form-group row margin-zero">
						<label className="col-sm-3 col-form-label col-form-label-sm"></label>
						<div className="col-sm-9">
							<button style={{ marginRight: 10 }} className="btn btn-primary">Submit</button>
							<button type="button" onClick={this.props.handleCancelCreateAlert} className="btn btn-outline-dark">Cancel</button>
						</div>
					</div>
				</form>
			</div >
		)
	}
}

export default withRouter(CreateAlert);
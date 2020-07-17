import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import AlertModal from '../modal/AlertModal';

class CreateIndicatorAlert extends Component {

	state = {
		exchangePair: "",
		indicator: "",
		timeframe: [
			{ label: '1 minutes', value: '1', isChecked: false },
			{ label: '5 minutes', value: '5', isChecked: false },
			{ label: '15 minutes', value: '15', isChecked: false },
			{ label: '1 hour', value: '60', isChecked: false },
			{ label: '4 hours', value: '240', isChecked: false },
		],
		exchangePairSelect: [
			{ label: "Binance - ETHUSDT", value: "Binance - ETHUSDT" },
			{ label: "Binance - BTCUSDT", value: "Binance - BTCUSDT" }
		],
		indicatorSelect: [
			{ value: 'Engulfing', label: 'Bullish/Bearish Engulfing' },
			{ value: 'Star', label: 'Morning/Evening Star' }
		],
		userData: null,
	}

	handleSelectPairChange = (selectedOption) => {
		this.setState({ exchangePair: selectedOption });
	}

	handleSelectIndicatorChange = (selectedOption) => {
		this.setState({ indicator: selectedOption });
	}

	handleChange = (event) => {
		const { name, value, type, checked } = event.target;
		if (type == 'checkbox') {
			this.setState({ [name]: checked })
		} else {
			this.setState({ [name]: value });
		}
	}

	submitForm = () => {
		const { value } = this.state.exchangePair;
		const post = {};

		if (value === undefined) {
			this.setState({ isAlertModalOpen: true, errorTitle: "Whoops", errorMessage: "Please select a Trading Pair from the list" });
			return;
		}

		if (this.state.indicator.value === undefined) {
			this.setState({ isAlertModalOpen: true, errorTitle: "Whoops", errorMessage: "Please select an Indicator" });
			return;
		}

		post.exchange = value.split(" - ")[0];
		post.pair = value.split(" - ")[1];
		post.indicator = this.state.indicator.value;
		this.state.timeframe.map(timeframe => {
			post["timeframe_" + timeframe.value] = this.state["timeframe_" + timeframe.value];
		})

		fetch('/api/indicator-alert', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(post)
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
		return (<p>To send/receive alerts we use Telegram. Please set up Telegram notifications by sending the following passcode
			<span className="highlight"> {this.props.userData.telegramPasscode}</span> to <span className="highlight">{this.props.botName} </span>
		to receive alerts right on your phone</p>)
	}

	render() {

		const createTimeframeCheckboxes = () => {
			const html = this.state.timeframe.map((time, index) => {
				return (
					<div key={index}>
						<label style={{ paddingRight: 20 }}>
							<input
								type="checkbox"
								name={"timeframe_" + time.value}
								checked={this.state["timeframe_" + time.value]}
								onChange={this.handleChange}
							/> {time.label}
						</label>
					</div>
				)
			});
			return html;
		}

		return (
			<div className={"create-price-box "}>
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
								options={this.state.exchangePairSelect}
							/>
						</div>
					</div>
					<div className="form-group row margin-zero">
						<label className="col-sm-3 col-form-label col-form-label-sm">Indicator</label>
						<div className="col-sm-9">
							<Select
								value={this.state.indicator}
								name="indicator"
								onChange={this.handleSelectIndicatorChange}
								options={this.state.indicatorSelect}
							/>
						</div>
					</div>
					<div className="form-group row margin-zero">
						<label className="col-sm-3 col-form-label col-form-label-sm">Timeframe</label>
						<div className="col-sm-9">
							<div className="checkbox">
								{createTimeframeCheckboxes()}
							</div>
						</div>
					</div>
					<div className="form-group row margin-zero">
						<label className="col-sm-3 col-form-label col-form-label-sm"></label>
						<div className="col-sm-9">
							<button style={{ marginRight: 10 }} className="btn btn-primary">Submit</button>
							<button type="button" onClick={this.props.handleCancelCreateAlert} className="btn btn-outline-dark">Cancel</button>
						</div>
					</div>
					<p>The implemented indicators are reversal indicators that should only be consider when they occur at that timeframes' Support/Resistance zones. They will only trigger if they are a recent low/high in an attempt to reduce noise</p>
				</form>
			</div>
		)
	}
}

export default withRouter(CreateIndicatorAlert);
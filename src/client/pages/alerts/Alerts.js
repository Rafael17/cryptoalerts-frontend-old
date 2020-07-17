import React, { Component } from 'react';
import './alerts.scss';
import Modal from './../../components/modal';
import CreateAlertForm from './../../components/forms/CreateAlert';
import CreateIndicatorAlertForm from './../../components/forms/CreateIndicatorAlert';
import AlertsTable from './AlertsTable';

class PriceAlerts extends Component {

	state = {
		pairs: null,
		priceAlerts: [],
		indicatorAlerts: [],
		userData: { telegramPasscode: null },
		botName: "",
		isPriceModalOpen: false,
		isIndicatorModalOpen: false,
	}

	updateAlerts = () => {
		fetch('/api/price-alerts', { headers: { 'Content-Type': 'application/json' } })
			.then(response => response.json())
			.then((result) => {
				console.log(result);
				this.setState(result);
			})
	}

	componentDidMount() {
		this.updateAlerts();
	}

	handleDeletePriceAlert = (event) => {
		const id = event.currentTarget.dataset.id;

		fetch('/api/alerts/' + id, {
			headers: { 'Content-Type': 'application/json' },
			method: 'DELETE',
		})
			.then(response => response.json())
			.then((result) => {
				if (result.success) {
					this.updateAlerts();
				}
			})
	}

	handleDeleteIndicatorAlert = (event) => {
		const id = event.currentTarget.dataset.id;

		fetch('/api/indicator-alert/' + id, {
			headers: { 'Content-Type': 'application/json' },
			method: 'DELETE',
		})
			.then(response => response.json())
			.then((result) => {
				if (result.success) {
					this.updateAlerts();
				}
			})
	}

	priceProperties = [
		{ label: 'Exchange', property: 'exchange' },
		{ label: 'Trading Pair', property: 'pair' },
		{ label: 'Price', property: 'price' },
		{ label: 'Cross Type', property: 'cross' },
		{ label: 'Message', property: 'message' },
	];

	indicatorProperties = [
		{ label: 'Exchange', property: 'exchange' },
		{ label: 'Trading Pair', property: 'pair' },
		{ label: 'Indicator', property: 'indicator' },
		{ label: '1 min', property: 'timeframe_1', isCheckbox: true },
		{ label: '5 min', property: 'timeframe_5', isCheckbox: true },
		{ label: '15 min', property: 'timeframe_15', isCheckbox: true },
		{ label: '1 hour', property: 'timeframe_60', isCheckbox: true },
		{ label: '4 hour', property: 'timeframe_240', isCheckbox: true },
	];

	render() {

		return (
			<React.Fragment>
				<AlertsTable
					list={this.priceProperties}
					title="Price Alerts"
					alerts={this.state.priceAlerts}
					handleDeleteAlert={this.handleDeletePriceAlert}
					openModal={() => this.setState({ isPriceModalOpen: true })}>
				</AlertsTable>
				<AlertsTable
					list={this.indicatorProperties}
					title="Indicator Alerts"
					alerts={this.state.indicatorAlerts}
					handleDeleteAlert={this.handleDeleteIndicatorAlert}
					openModal={() => this.setState({ isIndicatorModalOpen: true })}>
				</AlertsTable>
				<Modal isOpen={this.state.isPriceModalOpen} hideFooter={true} title="Create a new Price Alert" hideModal={() => this.setState({ isPriceModalOpen: false })}>
					<CreateAlertForm
						updateAlerts={this.updateAlerts}
						handleCancelCreateAlert={() => this.setState({ isPriceModalOpen: false })}
						pairs={this.state.pairs}
						userData={this.state.userData}
						botName={this.state.botName}
					/>
				</Modal>
				<Modal isOpen={this.state.isIndicatorModalOpen} hideFooter={true} title="Create a new Indicator Alert" hideModal={() => this.setState({ isIndicatorModalOpen: false })}>
					<CreateIndicatorAlertForm
						updateAlerts={this.updateAlerts}
						handleCancelCreateAlert={() => this.setState({ isIndicatorModalOpen: false })}
						pairs={this.state.pairs}
						userData={this.state.userData}
						botName={this.state.botName}
					/>
				</Modal>
			</React.Fragment>
		)
	}
}

export default PriceAlerts;
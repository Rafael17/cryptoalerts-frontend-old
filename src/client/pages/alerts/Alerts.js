import React, { Component } from 'react';
import './alerts.scss';
import WithPage from './../../components/withPage';
import Modal from './../../components/modal';
import CreateAlertForm from './../../components/forms/CreateAlert';
import CreateIndicatorAlertForm from './../../components/forms/CreateIndicatorAlert';
import AlertsTable from './AlertsTable';

class PriceAlerts extends Component {

	state = {
		pairs: null,
		hideCreatePrice: true,
		hideCreateIndicator: true,
		priceAlerts: [],
		indicatorAlerts: [],
		userData: { telegramPasscode: null },
		showModal: false,
		modal: { title: "", body: "" },
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

	showModalError = (modalData) => {
		this.setState(modalData);
		this.setState({ showModal: true })
	}

	openModal = () => this.setState({ isPriceModalOpen: true })

	render() {

		const priceProperties = [
			{ label: 'Exchange', property: 'exchange' },
			{ label: 'Trading Pair', property: 'pair' },
			{ label: 'Price', property: 'price' },
			{ label: 'Cross Type', property: 'cross' },
			{ label: 'Message', property: 'message' },
		];

		const indicatorProperties = [
			{ label: 'Exchange', property: 'exchange' },
			{ label: 'Trading Pair', property: 'pair' },
			{ label: 'Indicator', property: 'indicator' },
			{ label: '1 min', property: 'timeframe_1', isCheckbox: true },
			{ label: '5 min', property: 'timeframe_5', isCheckbox: true },
			{ label: '15 min', property: 'timeframe_15', isCheckbox: true },
			{ label: '1 hour', property: 'timeframe_60', isCheckbox: true },
			{ label: '4 hour', property: 'timeframe_240', isCheckbox: true },
		];

		return (
			<WithPage page="alerts">
				<AlertsTable
					list={priceProperties}
					title="Price Alerts"
					alerts={this.state.priceAlerts}
					handleDeleteAlert={this.handleDeletePriceAlert}
					openModal={() => this.setState({ isPriceModalOpen: true })}>
				</AlertsTable>
				<AlertsTable
					list={indicatorProperties}
					title="Indicator Alerts"
					alerts={this.state.indicatorAlerts}
					handleDeleteAlert={this.handleDeleteIndicatorAlert}
					openModal={() => this.setState({ isIndicatorModalOpen: true })}>
				</AlertsTable>
				{
					this.state.isPriceModalOpen ?
						<Modal hideFooter={true} title="Create a new Price Alert" hideModal={() => this.setState({ isPriceModalOpen: false })}>
							<CreateAlertForm
								updateAlerts={this.updateAlerts}
								handleCancelCreateAlert={() => this.setState({ isPriceModalOpen: false })}
								hide={false}
								pairs={this.state.pairs}
								userData={this.state.userData}
								botName={this.state.botName}
								showModalError={this.showModalError}
							/>
						</Modal>
						: null
				}
				{
					this.state.isIndicatorModalOpen ?
						<Modal hideFooter={true} title="Create a new Indicator Alert" hideModal={() => this.setState({ isIndicatorModalOpen: false })}>
							<CreateIndicatorAlertForm
								updateAlerts={this.updateAlerts}
								handleCancelCreateAlert={() => this.setState({ isIndicatorModalOpen: false })}
								hide={this.state.hideCreateIndicator}
								pairs={this.state.pairs}
								userData={this.state.userData}
								botName={this.state.botName}
								showModalError={this.showModalError}
							/>
						</Modal>
						: null
				}
			</WithPage>
		)
	}
}

export default PriceAlerts;
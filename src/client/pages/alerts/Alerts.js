import React, { Component } from 'react';
import './alerts.scss';
import WithPage from './../../components/withPage';
import Modal from './../../components/modal';
import CreateAlertForm from './../../components/forms/CreateAlert';
import CreateIndicatorAlertForm from './../../components/forms/CreateIndicatorAlert';
import AddSVG from './../../svgs/addSVG.js';
import DeleteSVG from './../../svgs/deleteSVG.js';

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

	render() {
		const thead = ['Exchange', 'Trading Pair', 'Price', 'Cross Type', 'Message', ''];

		const theadHTML = thead.map((title, index) => <td key={index}>{title}</td>)
		const hideOverlay = (this.state.hideCreatePrice && this.state.hideCreateIndicator ? " hide" : "");
		const priceAlertsHTML = this.state.priceAlerts.map((e, i) => {
			return (
				<tr key={i}>
					<td>{e.exchange}</td>
					<td>{e.pair}</td>
					<td>{e.price}</td>
					<td>{e.cross}</td>
					<td>{e.message}</td>
					<td style={{ width: '25px' }}>
						<div data-id={e._id} className="button-svg-wrapper" onClick={this.handleDeletePriceAlert}>
							<DeleteSVG />
						</div>
					</td>
				</tr>
			)
		}
		);

		const theadIndicator = ['Exchange', 'Trading Pair', 'Indicator', '1 min', '5 min', '15 min', '1 hour', '4 hour', ''];
		const theadIndicatorAlertsHTML = theadIndicator.map((title, index) => <td key={index}>{title}</td>)
		const checkbox = (checked) => {

			return (checked ? <input disabled="disabled" type="checkbox" checked /> : <input disabled="disabled" type="checkbox" />)
		};
		const indicatorAlertsHTML = this.state.indicatorAlerts.map((e, i) => {
			return (
				<tr key={i}>
					<td>{e.exchange}</td>
					<td>{e.pair}</td>
					<td>{e.indicator}</td>
					<td>{checkbox(e.timeframe_1)}</td>
					<td>{checkbox(e.timeframe_5)}</td>
					<td>{checkbox(e.timeframe_15)}</td>
					<td>{checkbox(e.timeframe_60)}</td>
					<td>{checkbox(e.timeframe_240)}</td>
					<td style={{ width: '25px' }}>
						<div data-id={e._id} className="button-svg-wrapper" onClick={this.handleDeleteIndicatorAlert}>
							<DeleteSVG />
						</div>
					</td>
				</tr>
			)
		}
		);

		return (
			<WithPage page="alerts">
				<div className="alerts-table-container">
					<h2>Price Alerts</h2>
					<table className="table table-bordered table-striped">
						<thead className="thead-dark">
							<tr>
								{theadHTML}
							</tr>
						</thead>
						<tbody>
							{priceAlertsHTML}
						</tbody>
					</table>
					<div className="button-svg-wrapper" onClick={() => this.setState({ isPriceModalOpen: true })}>
						<AddSVG />
					</div>
				</div>
				<div className="alerts-table-container">
					<h2>Indicator Alerts</h2>
					<table className="table table-bordered table-striped">
						<thead className="thead-dark">
							<tr>
								{theadIndicatorAlertsHTML}
							</tr>
						</thead>
						<tbody>
							{indicatorAlertsHTML}
						</tbody>
					</table>
					<div className="button-svg-wrapper" onClick={() => this.setState({ isIndicatorModalOpen: true })}>
						<AddSVG />
					</div>
				</div>
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
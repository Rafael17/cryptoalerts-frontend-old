import React, { Component } from 'react';

class Modal extends Component {

	componentDidUpdate() {
		if(this.props.show) {
			this.closeButton.focus();
		}
	}

	render() {
		
		return (
			<div className={"modal-alert modal fade" + (this.props.show ? " show" : "")}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">{this.props.title}</h4>
						</div>
						<div className="modal-body">
							{this.props.body}
						</div>
						<div className="modal-footer">
							<button 
								onClick={this.props.hideModal} 
								className="btn btn-primary"
								ref={(button) => { this.closeButton = button; }}
							>OK</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Modal;



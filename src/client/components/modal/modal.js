import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

const Modal = (props) => {

	const clickOverlay = (e) => {
		props.hideModal(e);
	}

	const stopPropagation = (e) => {
		e.stopPropagation();
	}

	return (
		<React.Fragment>
			<div className={`overlay ${props.isOpen ? "show" : ""}`} style={{ zIndex: props.zIndex }}></div>
			<div onClick={e => clickOverlay(e)} className={`modal-alert modal ${props.isOpen ? "show" : ""}`} style={{ zIndex: props.zIndex }}>
				<div onClick={e => stopPropagation(e)} className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">{props.title}</h4>
						</div>
						<div className="modal-body">
							{props.children}
						</div>
						<div style={{ display: (props.hideFooter ? "none" : "block") }} className="modal-footer">
							<button
								onClick={() => props.hideModal()}
								className="btn btn-primary"
							>OK</button>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

Modal.propTypes = {
	title: PropTypes.string,
	hideModal: PropTypes.func,
	zIndex: PropTypes.number
}

export default Modal;



import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';

const modalRoot = document.getElementById('modal-root');

class ModalContainer extends Component {

    el = document.createElement('div')

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            <Modal {...this.props} />,
            this.el
        );
    }
}

export default ModalContainer;



import React from 'react';
import Modal from './Modal';


const AlertModal = (props) => {
    return (

        <Modal
            {...props}
            zIndex={20}
        >
            {props.children}
        </Modal>
    )
}


export default AlertModal;
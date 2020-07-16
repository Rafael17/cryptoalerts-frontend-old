import React from 'react';
import Modal from './modal';


const WithAlertModal = (props) => {
    return (

        <Modal
            {...props}
            zIndex={20}
        >
            {props.children}
        </Modal>
    )
}


export default WithAlertModal;
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Modal from './modal';
import WithAlertModal from './withAlertModal.js'


const withPage = (props) => {
    return (
        <React.Fragment>
            <Header {...props}></Header>
            {props.children}
            <Footer></Footer>
        </React.Fragment>
    )
}

export default withPage;
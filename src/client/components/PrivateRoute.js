import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Utils from './../utils';
import Header from './Header';
import Footer from './Footer';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            Utils.isLogin() ?
                <React.Fragment>
                    <Header page={rest.page}></Header>
                    <Component {...props} />
                    <Footer></Footer>
                </React.Fragment>
                : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;
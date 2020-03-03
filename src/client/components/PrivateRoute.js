import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';


const isLogin = () => {
	console.log(Cookies.get("login"));

    if (Cookies.get("login")) {
        return true;
    }

    return false;
}

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;
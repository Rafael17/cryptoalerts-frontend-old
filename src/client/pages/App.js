import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './app.scss';
import Login from './login/Login';
import PrivateRoute from './../components/PrivateRoute';
import PriceAlerts from './priceAlerts/PriceAlerts';
import Utils from './../utils';

class App extends Component {

    componentWillMount() {
        if(Utils.isLogin() && this.props.location.pathname === '/') {
            window.location = '/price-alerts';
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <PrivateRoute path='/price-alerts' component={PriceAlerts} />
                </Switch>
            </main>
        );
    }
}

export default withRouter(App);
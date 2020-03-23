import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './app.scss';

import Login from './login/Login';
import PrivateRoute from './../components/PrivateRoute';
import Alerts from './alerts/Alerts';
import MarketCap from './marketCap/MarketCap';
import Utils from './../utils';

class App extends Component {

    componentWillMount() {
        if(Utils.isLogin() && this.props.location.pathname === '/') {
            window.location = '/alerts';
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <PrivateRoute path='/alerts' component={Alerts} />
                    <PrivateRoute path='/market-cap' component={MarketCap} />
                </Switch>
            </main>
        );
    }
}

export default withRouter(App);
import React, { Component } from 'react';
import './app.scss';
import Login from './Login';
import { Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PriceAlerts from './PriceAlerts';
import Utils from './utils';

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
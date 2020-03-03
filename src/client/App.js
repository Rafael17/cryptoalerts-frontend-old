import React, { Component } from 'react';
import './app.scss';
import Login from './Login';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PriceAlerts from './PriceAlerts';

class App extends Component {

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

export default App;
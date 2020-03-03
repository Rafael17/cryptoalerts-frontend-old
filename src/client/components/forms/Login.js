import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Login extends Component {

	state = { 
        pass: "",
        user: "",
        loginError: false
    }

	handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]:value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loginError: false });
        fetch('/api', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify( this.state )})
        .then(response => response.json())
        .then((result) => {
            if( result.error ) {
                this.setState({ loginError: true});
                this.props.handleLoginError("Wrong username and/or password");
            } else {
                this.props.history.push('/price-alerts');
            }
        })
    }

	render() {

		return(
			<div>
				<h2 style={{marginBottom: 30, color: "#333"}}>LOGIN</h2>
				<form autoComplete="off" className="login-form" onSubmit={ this.handleSubmit }>
					<div className="input-wrapper">
						<input 
							className={ this.state.user != "" ? "has-val" : undefined } 
							type="text" 
							onChange={ this.handleChange } 
							name="user"
							value={ this.state.user }
						/>
						<span data-placeholder="Username"></span>
					</div>
					<div className="input-wrapper">
						<input 
							className={ this.state.pass != "" ? "has-val" : undefined } 
							type="password" 
							onChange={ this.handleChange } 
							name="pass" 
							value={ this.state.pass }
						/>
						<span data-placeholder="Password"></span>
					</div>
					<button style={{marginTop: 60}}>Sign In</button>
				</form>
			</div>
		)
	}
}

export default withRouter(Login);
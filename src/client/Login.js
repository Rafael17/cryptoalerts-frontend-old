import React, { Component } from 'react';
import './login.scss';
import LoginForm from './components/forms/Login'
import CreateAccountForm from './components/forms/CreateAccount'
import AlarmSVG from './svgs/AlarmSVG';
import BitcointSVG from './svgs/BitcoinSVG';
import Modal from './components/Modal';

class Login extends Component {

    state = { 
        isSignUp: false,
        loginError: false,
        signupError: false,
        showModal: false,
        modal: {title: "", body: ""},
    }

    handleClick = () => {
        this.setState( prevState => ({
          isSignUp: !prevState.isSignUp,
          loginError: false,
          signupError: false
        }));
    }

    handleLoginError = (message) => {
        this.setState({loginError: message});
    }

    handleSignupError = (message) => {
        this.setState({signupError: message});
    }

    componentDidMount() {

    }

    showModal = (modalData) => {
        this.setState(modalData);
        this.setState({showModal: true})
    }

    hideModal = () => {
        this.setState({showModal: false});
        this.setState({isSignUp: false});
    }

    render() {

        const className = (this.state.isSignUp ? "sign-up " : " ");
        const classNameLoginError = (this.state.loginError ? "shake " : " ");
        const spans = Array.from(Array(10).keys());
        const svg = spans.map(s => <BitcointSVG key={s}/>);

        return (
            <div>
                <div className="background">
                    {svg}
                </div>
                <div className="main-app">
                    <div className="login-container">
                        <div className={"login-wrapper front " + className + classNameLoginError}>
                            <div className="login-header">
                                <div>
                                    <h2>
                                        Welcome to<br/>Crypto Alerts
                                    </h2>
                                </div>
                                <div>
                                    <AlarmSVG />
                                </div>
                            </div>
                            <div>
                                <LoginForm handleLoginError = { this.handleLoginError } />
                                <div 
                                    onClick={ this.handleClick } 
                                    style={{marginTop:20}}
                                >or Sign Up</div>
                            </div>
                            <div style={{display: this.state.loginError ? "block" : "none"}} className="login-error">
                                {this.state.loginError}
                            </div>
                        </div>
                        <div className={"login-wrapper back " + className}>
                            <div style={{marginTop:40}}>
                                <h5>
                                    Create account and track your favorite cryptocurrency coins!
                                </h5>
                            </div>
                            <div style={{marginTop:20}}>
                                <CreateAccountForm 
                                    showModal = {this.showModal}
                                    handleSignupError = { this.handleSignupError } 
                                />
                                <div 
                                    onClick={ this.handleClick } 
                                    style={{marginTop:20}}
                                >or Sign In</div>
                            </div>
                            <div style={{display: this.state.signupError ? "block" : "none"}} className="login-error">
                                {this.state.signupError}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"overlay" + (this.state.showModal ? "" : "hide")}></div>
                <Modal 
                    title={this.state.modal.title}
                    body={this.state.modal.body}
                    show={this.state.showModal}
                    hideModal={this.hideModal}
                />
            </div>
        );
    }
}

export default Login;
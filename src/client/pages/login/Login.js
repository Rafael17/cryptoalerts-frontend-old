import React, { Component } from 'react';
import LoginForm from './../../components/forms/Login';
import CreateAccountForm from './../../components/forms/CreateAccount';
import AlarmSVG from './../../svgs/AlarmSVG';
import BitcointSVG from './../../svgs/BitcoinSVG';
import AlertModal from '../../components/modal/AlertModal';
import './login.scss';

class Login extends Component {

    state = {
        isSignUp: false,
        loginError: false,
        signupError: false,
        isModalOpen: false
    }

    handleClick = () => {
        this.setState(prevState => ({
            isSignUp: !prevState.isSignUp,
            loginError: false,
            signupError: false
        }));
    }

    handleLogin = (error) => {
        this.setState({ loginError: error });
    }

    handleSignup = (error) => {
        this.setState({ signupError: error });
    }

    showModal = () => {
        this.setState({ isModalOpen: true })
    }

    hideModal = () => {
        this.setState({ isModalOpen: false });
        this.setState({ isSignUp: false });
    }

    render() {

        const className = (this.state.isSignUp ? "sign-up " : " ");
        const classNameLoginError = (this.state.loginError ? "shake " : " ");
        const classNameSignupError = (this.state.signupError ? "shake " : " ");
        const spans = Array.from(Array(10).keys());
        const svg = spans.map(s => <BitcointSVG key={s} />);

        return (
            <div className="login-page-wrapper">
                <div className="background-svgs">
                    {svg}
                </div>
                <div className="login-container">
                    <div className={"login-wrapper front " + className + classNameLoginError}>
                        <div className="login-header">
                            <div>
                                <h2>
                                    Welcome to<br />Crypto Alerts
                                </h2>
                            </div>
                            <div>
                                <AlarmSVG />
                            </div>
                        </div>
                        <div>
                            <LoginForm handleLogin={this.handleLogin} />
                            <div
                                onClick={this.handleClick}
                                style={{ marginTop: 20, cursor: 'pointer' }}
                            >or Sign Up</div>
                        </div>
                        <div style={{ display: this.state.loginError ? "block" : "none" }} className="login-error">
                            {this.state.loginError}
                        </div>
                    </div>
                    <div className={"login-wrapper back " + className + classNameSignupError}>
                        <div className="header">
                            <h5>
                                Create account and track your favorite cryptocurrency coins!
                            </h5>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <CreateAccountForm
                                showModal={this.showModal}
                                handleSignup={this.handleSignup}
                            />
                            <div
                                onClick={this.handleClick}
                                style={{ marginTop: 20, cursor: 'pointer' }}
                            >or Sign In</div>
                        </div>
                        <div style={{ display: this.state.signupError ? "block" : "none" }} className="login-error">
                            {this.state.signupError}
                        </div>
                    </div>
                </div>
                <AlertModal
                    isOpen={this.state.isModalOpen}
                    title="Account Created"
                    hideModal={this.hideModal}
                >
                    Please login to your newly created account
                    </AlertModal>
            </div>
        );
    }
}

export default Login;
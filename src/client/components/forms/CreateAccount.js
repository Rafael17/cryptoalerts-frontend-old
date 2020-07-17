import React, { Component } from 'react';

class CreateAccount extends Component {

	state = {
		user: "",
		pass: "",
		email: "",
		company: ""
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.handleSignup(false);

		fetch('/api/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(this.state)
		})
			.then(response => response.json())
			.then(result => {
				if (result.error) {
					this.props.handleSignup(result.message);
				} else {
					this.props.showModal({ modal: { title: "Account Created", children: "Please login to your newly created account" } });
				}
			})
	}

	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	render() {
		return (
			<div>
				<form autoComplete="off" className="login-form" onSubmit={this.handleSubmit}>
					<div className="input-wrapper">
						<input
							className={this.state.email != "" ? "has-val" : undefined}
							placeholder="" type="text"
							onChange={this.handleChange}
							name="email"
							required
							pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
							value={this.state.email}
						/>
						<span data-placeholder="Email"></span>
					</div>
					<div className="input-wrapper">
						<input
							className={this.state.company != "" ? "has-val" : undefined}
							placeholder="" type="text"
							onChange={this.handleChange}
							name="company"
							required
							value={this.state.company}
						/>
						<span data-placeholder="Company"></span>
					</div>
					<div className="input-wrapper">
						<input
							className={this.state.user != "" ? "has-val" : undefined}
							placeholder="" type="text"
							onChange={this.handleChange}
							name="user"
							minLength="4"
							required
							value={this.state.user}
						/>
						<span data-placeholder="Username"></span>
					</div>
					<div className="input-wrapper">
						<input
							className={this.state.pass != "" ? "has-val" : undefined}
							placeholder=""
							type="password"
							onChange={this.handleChange}
							name="pass"
							minLength="4"
							required
							value={this.state.pass}
						/>
						<span data-placeholder="Password"></span>
					</div>
					<button style={{ marginTop: 20 }}>Sign Up</button>
				</form>
			</div>
		)
	}
}

export default CreateAccount;
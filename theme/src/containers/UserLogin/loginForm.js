import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, RaisedButton, Dialog, Checkbox } from 'material-ui';

import AuthActions from '../../actions/authActions';

import styles from './style';

class LoginForm extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			open: true,
			checked: false,
			errors: {}
		};
	}

	componentDidMount() {
		// If logged in and user navigates to Login page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/');
		}

		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
		this.props.history.push('/');
	};

	updateCheck() {
		this.setState(oldState => {
			return {
				checked: !oldState.checked
			};
		});
	}

	async authenticateUser() {
		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		try {
			let response = AuthActions.loginUser(userData);
			if (200 === response.status) {
				this.props.history.push('/');
			} else if (400 == response.status) {
				this.setState({
					errors: response.JsonData
				});
			}
		} catch (e) {
			console.log('exception occurred ' + e.toString());
		}
	}

	onSubmit = e => {
		e.preventDefault();
		this.authenticateUser();
	};

	render() {
		const { errors } = this.state.errors;

		const actions = [
			<a href="#">Forget My Password</a>,
			<RaisedButton
				label="Cancel"
				onClick={this.handleClose}
				secondary={true}
				style={styles.buttonStyle}
			/>,
			<RaisedButton
				label="Submit"
				onClick={this.onSubmit}
				secondary={true}
				style={styles.buttonStyle}
			/>
		];

		return (
			<MuiThemeProvider>
				<Dialog
					title="Sign In To FashionFactory"
					actions={actions}
					modal={true}
					open={this.state.open}
					contentStyle={styles.customContentStyle}
				>
					<TextField
						floatingLabelText="Username or Email"
						floatingLabelStyle={styles.floatingLabelStyle}
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
						underlineFocusStyle={styles.underlineStyle}
						fullWidth={true}
						id="email"
						value={this.state.email}
						onChange={this.onChange}
					/>
					<br />
					<TextField
						type="password"
						floatingLabelText="Password"
						floatingLabelStyle={styles.floatingLabelStyle}
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
						underlineFocusStyle={styles.underlineStyle}
						fullWidth={true}
						id="password"
						value={this.state.password}
						onChange={this.onChange}
					/>
					<br />
					<Checkbox
						label="Remember Me"
						checked={this.state.checked}
						onCheck={this.updateCheck.bind(this)}
						style={styles.checkbox}
					/>
					<signUp style={styles.signUpStyle}>
						I don't have an account
						<a href="/signup" style={styles.loginLink}>
							Sign Up Now
						</a>
					</signUp>
				</Dialog>
			</MuiThemeProvider>
		);
	}
}

LoginForm.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps)(LoginForm);

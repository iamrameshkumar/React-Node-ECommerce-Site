import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, RaisedButton, Dialog, Checkbox } from 'material-ui';

import { loginUser } from '../../actions/authActions';

import styles from './style';

class LoginForm extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			open: true,
			checked: false
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
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	updateCheck() {
		this.setState(oldState => {
			return {
				checked: !oldState.checked
			};
		});
	}

	onSubmit = e => {
		e.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(userData);
	};

	render() {
		const { errors } = this.props.errors;

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
					title="Sign In To Webjustify "
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
					/>
					<br />
					<TextField
						type="password"
						floatingLabelText="Password"
						floatingLabelStyle={styles.floatingLabelStyle}
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
						underlineFocusStyle={styles.underlineStyle}
						fullWidth={true}
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
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(LoginForm);

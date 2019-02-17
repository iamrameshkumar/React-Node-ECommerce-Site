import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, RaisedButton, Dialog, Checkbox } from 'material-ui';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import styles from './style';

import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class SignUp extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {},
			open: true,
			checked: false,
			finished: false,
			stepIndex: 0
		};
	}

	componentDidMount() {
		// If logged in and user navigates to Register page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};

		this.props.registerUser(newUser, this.props.history);
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

	handleNext = () => {
		const { stepIndex } = this.state;
		if (stepIndex === 2) {
			this.setState({ stepIndex: 0, finished: false });
			window.location = 'http://www.webjustify.com';
		}
		this.setState({
			stepIndex: stepIndex + 1,
			finished: stepIndex >= 2
		});
	};

	handlePrev = () => {
		const { stepIndex } = this.state;
		if (stepIndex > 0) {
			this.setState({ stepIndex: stepIndex - 1 });
		}
	};

	getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return (
					<div>
						<TextField
							floatingLabelText="First Name"
							floatingLabelStyle={styles.floatingLabelStyle}
							floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
							underlineFocusStyle={styles.underlineStyle}
							fullWidth={true}
						/>
						<br />
						<TextField
							floatingLabelText="Last Name"
							floatingLabelStyle={styles.floatingLabelStyle}
							floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
							underlineFocusStyle={styles.underlineStyle}
							fullWidth={true}
						/>
						<br />
						<TextField
							floatingLabelText="Phone Number"
							floatingLabelStyle={styles.floatingLabelStyle}
							floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
							underlineFocusStyle={styles.underlineStyle}
							fullWidth={true}
						/>
					</div>
				);
			case 1:
				return (
					<div>
						<TextField
							floatingLabelText="Username"
							floatingLabelStyle={styles.floatingLabelStyle}
							floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
							underlineFocusStyle={styles.underlineStyle}
							fullWidth={true}
						/>
						<br />
						<TextField
							floatingLabelText="Email"
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
					</div>
				);
			case 2:
				return (
					<TextField
						floatingLabelText="Address"
						floatingLabelStyle={styles.floatingLabelStyle}
						floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
						underlineFocusStyle={styles.underlineStyle}
						multiLine={true}
						rows={2}
						fullWidth={true}
					/>
				);
			default:
				return 'Your default steper';
		}
	}

	render() {
		const { finished, stepIndex } = this.state;
		const contentStyle = { margin: '0 16px' };
		const actions = [
			<RaisedButton
				label="Back"
				disabled={stepIndex === 0}
				onClick={this.handlePrev}
				primary={true}
				style={{ marginRight: 12 }}
			/>,
			<RaisedButton
				label={stepIndex === 2 ? 'Submit' : 'Next'}
				value={stepIndex === 2 ? 'Submit' : 'Next'}
				secondary={true}
				onClick={this.handleNext}
			/>,
			<RaisedButton
				label="Cancel"
				onClick={this.handleClose}
				secondary={true}
				style={styles.buttonStyle}
			/>
		];

		return (
			<MuiThemeProvider>
				<Dialog
					title="Sign Up To Fashion Factory"
					actions={actions}
					modal={true}
					open={this.state.open}
					contentStyle={styles.customContentStyle}
				>
					<Stepper activeStep={stepIndex}>
						<Step>
							<StepLabel>Basic Info</StepLabel>
						</Step>
						<Step>
							<StepLabel>Set Login Info</StepLabel>
						</Step>
						<Step>
							<StepLabel>Address Info</StepLabel>
						</Step>
					</Stepper>
					<div style={contentStyle}>
						{finished ? (
							<div>
								I don't have account
								<a
									href="http://www.webjustify.com"
									onClick={event => {
										event.preventDefault();
										this.setState({ stepIndex: 0, finished: false });
									}}
									style={styles.loginLink}
								>
									SignUp
								</a>
							</div>
						) : (
							<div>
								<p>{this.getStepContent(stepIndex)}</p>
							</div>
						)}
					</div>
					<Checkbox
						label="I am agree with Term & Condition"
						checked={this.state.checked}
						onCheck={this.updateCheck.bind(this)}
						style={styles.checkbox}
					/>
					<login style={styles.loginStyle}>
						I have an account
						<a href="http://www.webjustify.com" style={styles.loginLink}>
							Login
						</a>
					</login>
				</Dialog>
			</MuiThemeProvider>
		);
	}
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(SignUp));
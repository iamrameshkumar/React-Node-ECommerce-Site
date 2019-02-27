'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _materialUi = require('material-ui');

var _Stepper = require('material-ui/Stepper');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _authActions = require('../../actions/authActions');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SignUpForm = function (_Component) {
	(0, _inherits3.default)(SignUpForm, _Component);

	function SignUpForm() {
		(0, _classCallCheck3.default)(this, SignUpForm);

		var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this));

		_this.onSubmit = function (e) {
			e.preventDefault();

			var newUser = {
				name: _this.state.name,
				email: _this.state.email,
				password: _this.state.password,
				password2: _this.state.password2
			};

			var returnCode = _this.props.registerUser(newUser, _this.props.history);

			if (200 === returnCode) {
				history.push('/login');
			} else if (400 == returnCode) {}
		};

		_this.onChange = function (e) {
			var _this$setState;

			_this.setState((_this$setState = {}, _this$setState[e.target.id] = e.target.value, _this$setState));
		};

		_this.handleOpen = function () {
			_this.setState({ open: true });
		};

		_this.handleClose = function () {
			_this.setState({ open: false });
			_this.props.history.push('/');
		};

		_this.handleNext = function () {
			var stepIndex = _this.state.stepIndex;

			if (stepIndex === 2) {
				_this.setState({ stepIndex: 0, finished: false });
				window.location = '/';
			}
			_this.setState({
				stepIndex: stepIndex + 1,
				finished: stepIndex >= 2
			});
		};

		_this.handlePrev = function () {
			var stepIndex = _this.state.stepIndex;

			if (stepIndex > 0) {
				_this.setState({ stepIndex: stepIndex - 1 });
			}
		};

		_this.state = {
			firstname: '',
			lastname: '',
			name: '',
			email: '',
			password: '',
			password2: '',
			open: true,
			checked: false,
			finished: false,
			stepIndex: 0,
			errors: {}
		};
		return _this;
	}

	SignUpForm.prototype.componentDidMount = function componentDidMount() {
		// If logged in and user navigates to Register page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	};

	SignUpForm.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	};

	SignUpForm.prototype.updateCheck = function updateCheck() {
		this.setState(function (oldState) {
			return {
				checked: !oldState.checked
			};
		});
	};

	SignUpForm.prototype.getStepContent = function getStepContent(stepIndex) {
		var _React$createElement;

		switch (stepIndex) {
			case 0:
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_materialUi.TextField, {
						floatingLabelText: 'First Name',
						floatingLabelStyle: _style2.default.floatingLabelStyle,
						floatingLabelFocusStyle: _style2.default.floatingLabelFocusStyle,
						underlineFocusStyle: _style2.default.underlineStyle,
						fullWidth: true,
						id: 'firstname',
						value: this.state.firstname,
						onChange: this.onChange
					}),
					_react2.default.createElement('br', null),
					_react2.default.createElement(_materialUi.TextField, {
						floatingLabelText: 'Last Name',
						floatingLabelStyle: _style2.default.floatingLabelStyle,
						floatingLabelFocusStyle: _style2.default.floatingLabelFocusStyle,
						underlineFocusStyle: _style2.default.underlineStyle,
						fullWidth: true,
						id: 'lastname',
						value: this.state.lastname,
						onChange: this.onChange
					}),
					_react2.default.createElement('br', null),
					_react2.default.createElement(_materialUi.TextField, {
						floatingLabelText: 'Phone Number',
						floatingLabelStyle: _style2.default.floatingLabelStyle,
						floatingLabelFocusStyle: _style2.default.floatingLabelFocusStyle,
						underlineFocusStyle: _style2.default.underlineStyle,
						fullWidth: true
					})
				);
			case 1:
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_materialUi.TextField, (_React$createElement = {
						floatingLabelText: 'Username',
						floatingLabelStyle: _style2.default.floatingLabelStyle,
						floatingLabelFocusStyle: _style2.default.floatingLabelFocusStyle,
						underlineFocusStyle: _style2.default.underlineStyle,
						fullWidth: true
					}, _React$createElement['fullWidth'] = true, _React$createElement.id = 'name', _React$createElement.value = this.state.name, _React$createElement.onChange = this.onChange, _React$createElement)),
					_react2.default.createElement('br', null),
					_react2.default.createElement(_materialUi.TextField, {
						floatingLabelText: 'Email',
						floatingLabelStyle: _style2.default.floatingLabelStyle,
						floatingLabelFocusStyle: _style2.default.floatingLabelFocusStyle,
						underlineFocusStyle: _style2.default.underlineStyle,
						fullWidth: true,
						id: 'email',
						value: this.state.email,
						onChange: this.onChange
					}),
					_react2.default.createElement('br', null),
					_react2.default.createElement(_materialUi.TextField, {
						type: 'password',
						floatingLabelText: 'Password',
						floatingLabelStyle: _style2.default.floatingLabelStyle,
						floatingLabelFocusStyle: _style2.default.floatingLabelFocusStyle,
						underlineFocusStyle: _style2.default.underlineStyle,
						fullWidth: true,
						id: 'password',
						value: this.state.password,
						onChange: this.onChange
					}),
					_react2.default.createElement('br', null)
				);
			case 2:
				return _react2.default.createElement(_materialUi.TextField, {
					floatingLabelText: 'Address',
					floatingLabelStyle: _style2.default.floatingLabelStyle,
					floatingLabelFocusStyle: _style2.default.floatingLabelFocusStyle,
					underlineFocusStyle: _style2.default.underlineStyle,
					multiLine: true,
					rows: 2,
					fullWidth: true
				});
			default:
				return 'Your default steper';
		}
	};

	SignUpForm.prototype.render = function render() {
		var _this2 = this;

		var _state = this.state,
		    finished = _state.finished,
		    stepIndex = _state.stepIndex;

		var contentStyle = { margin: '0 16px' };
		var errors = this.state.errors;


		var actions = [_react2.default.createElement(_materialUi.RaisedButton, {
			label: 'Back',
			disabled: stepIndex === 0,
			onClick: this.handlePrev,
			primary: true,
			style: { marginRight: 12 }
		}), _react2.default.createElement(_materialUi.RaisedButton, {
			label: stepIndex === 2 ? 'Submit' : 'Next',
			value: stepIndex === 2 ? 'Submit' : 'Next',
			secondary: true,
			onClick: stepIndex === 2 ? this.onSubmit : this.handleNext
		}), _react2.default.createElement(_materialUi.RaisedButton, {
			label: 'Cancel',
			onClick: this.handleClose,
			secondary: true,
			style: _style2.default.buttonStyle
		})];

		return _react2.default.createElement(
			_MuiThemeProvider2.default,
			null,
			_react2.default.createElement(
				_materialUi.Dialog,
				{
					title: 'Sign Up To Fashion Factory',
					actions: actions,
					modal: true,
					open: this.state.open,
					contentStyle: _style2.default.customContentStyle
				},
				_react2.default.createElement(
					_Stepper.Stepper,
					{ activeStep: stepIndex },
					_react2.default.createElement(
						_Stepper.Step,
						null,
						_react2.default.createElement(
							_Stepper.StepLabel,
							null,
							'Basic Info'
						)
					),
					_react2.default.createElement(
						_Stepper.Step,
						null,
						_react2.default.createElement(
							_Stepper.StepLabel,
							null,
							'Set Login Info'
						)
					),
					_react2.default.createElement(
						_Stepper.Step,
						null,
						_react2.default.createElement(
							_Stepper.StepLabel,
							null,
							'Address Info'
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ style: contentStyle },
					finished ? _react2.default.createElement(
						'div',
						null,
						'I don\'t have account',
						_react2.default.createElement(
							'a',
							{
								href: '/',
								onClick: function onClick(event) {
									event.preventDefault();
									_this2.setState({ stepIndex: 0, finished: false });
								},
								style: _style2.default.loginLink
							},
							'SignUp'
						)
					) : _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'p',
							null,
							this.getStepContent(stepIndex)
						)
					)
				),
				_react2.default.createElement(_materialUi.Checkbox, {
					label: 'I am agree with Term & Condition',
					checked: this.state.checked,
					onCheck: this.updateCheck.bind(this),
					style: _style2.default.checkbox
				}),
				_react2.default.createElement(
					'login',
					{ style: _style2.default.loginStyle },
					'I have an account',
					_react2.default.createElement(
						'a',
						{ href: '/login', style: _style2.default.loginLink },
						'Login'
					)
				)
			)
		);
	};

	return SignUpForm;
}(_react.Component);

SignUpForm.propTypes = {
	registerUser: _propTypes2.default.func.isRequired,
	auth: _propTypes2.default.object.isRequired,
	errors: _propTypes2.default.object.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
	return {
		auth: state.auth,
		errors: state.errors
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, { registerUser: _authActions.registerUser })((0, _reactRouterDom.withRouter)(SignUpForm));
//# sourceMappingURL=SignupForm.js.map
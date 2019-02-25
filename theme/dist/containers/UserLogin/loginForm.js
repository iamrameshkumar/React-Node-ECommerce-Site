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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _materialUi = require('material-ui');

var _authActions = require('../../actions/authActions');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginForm = function (_Component) {
	(0, _inherits3.default)(LoginForm, _Component);

	function LoginForm() {
		(0, _classCallCheck3.default)(this, LoginForm);

		var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this));

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

		_this.onSubmit = function (e) {
			e.preventDefault();

			var userData = {
				email: _this.state.email,
				password: _this.state.password
			};

			_this.props.loginUser(userData);
		};

		_this.state = {
			email: '',
			password: '',
			open: true,
			checked: false,
			errors: {}
		};
		return _this;
	}

	LoginForm.prototype.componentDidMount = function componentDidMount() {
		// If logged in and user navigates to Login page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	};

	LoginForm.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/');
		}

		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	};

	LoginForm.prototype.updateCheck = function updateCheck() {
		this.setState(function (oldState) {
			return {
				checked: !oldState.checked
			};
		});
	};

	LoginForm.prototype.render = function render() {
		var errors = this.state.errors.errors;


		var actions = [_react2.default.createElement(
			'a',
			{ href: '#' },
			'Forget My Password'
		), _react2.default.createElement(_materialUi.RaisedButton, {
			label: 'Cancel',
			onClick: this.handleClose,
			secondary: true,
			style: _style2.default.buttonStyle
		}), _react2.default.createElement(_materialUi.RaisedButton, {
			label: 'Submit',
			onClick: this.onSubmit,
			secondary: true,
			style: _style2.default.buttonStyle
		})];

		return _react2.default.createElement(
			_MuiThemeProvider2.default,
			null,
			_react2.default.createElement(
				_materialUi.Dialog,
				{
					title: 'Sign In To Webjustify ',
					actions: actions,
					modal: true,
					open: this.state.open,
					contentStyle: _style2.default.customContentStyle
				},
				_react2.default.createElement(_materialUi.TextField, {
					floatingLabelText: 'Username or Email',
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
				_react2.default.createElement('br', null),
				_react2.default.createElement(_materialUi.Checkbox, {
					label: 'Remember Me',
					checked: this.state.checked,
					onCheck: this.updateCheck.bind(this),
					style: _style2.default.checkbox
				}),
				_react2.default.createElement(
					'signUp',
					{ style: _style2.default.signUpStyle },
					'I don\'t have an account',
					_react2.default.createElement(
						'a',
						{ href: '/signup', style: _style2.default.loginLink },
						'Sign Up Now'
					)
				)
			)
		);
	};

	return LoginForm;
}(_react.Component);

LoginForm.propTypes = {
	loginUser: _propTypes2.default.func.isRequired,
	auth: _propTypes2.default.object.isRequired,
	errors: _propTypes2.default.object.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
	return {
		auth: state.auth,
		errors: state.errors
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, { loginUser: _authActions.loginUser })(LoginForm);
//# sourceMappingURL=loginForm.js.map
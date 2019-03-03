'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _api = require('../lib/api');

var _api2 = _interopRequireDefault(_api);

var _setAuthToken = require('../lib/utils/setAuthToken');

var _setAuthToken2 = _interopRequireDefault(_setAuthToken);

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _authActiontypes = require('./authActiontypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthActions = function () {
	function AuthActions() {
		(0, _classCallCheck3.default)(this, AuthActions);

		this.setCurrentUser = function (decoded) {
			return {
				type: _authActiontypes.SET_CURRENT_USER,
				payload: decoded
			};
		};

		this.setUserLoading = function () {
			return {
				type: _authActiontypes.USER_LOADING
			};
		};

		this.logoutUser = function () {
			return function (dispatch) {
				// Remove token from local storage
				localStorage.removeItem('jwtToken');
				// Remove auth header for future requests
				(0, _setAuthToken2.default)(false);
				// Set current user to empty object {} which will set isAuthenticated to false
				dispatch(setCurrentUser({}));
			};
		};
	}

	// Register User
	AuthActions.prototype.registerUser = function () {
		var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(userData, history) {
			var response;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return _api2.default.restClient.post('/users/register', userData);

						case 2:
							response = _context.sent;
							return _context.abrupt('return', response);

						case 4:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function registerUser(_x, _x2) {
			return _ref.apply(this, arguments);
		}

		return registerUser;
	}();

	// Login - get user token


	AuthActions.prototype.loginUser = function () {
		var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(userData) {
			var response, token, decoded;
			return _regenerator2.default.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							response = _api2.default.restClient.post('/users/login', userData);

							if (response) {
								// Save to localStorage
								if (200 === response.status) {
									// Set token to localStorage
									token = response.json.token.token;

									localStorage.setItem('jwtToken', token);
									// Set token to Auth header
									(0, _setAuthToken2.default)(token);
									// Decode token to get user data
									decoded = (0, _jwtDecode2.default)(token);
									// Set current user

									dispatch(setCurrentUser(decoded));
								}
							}
							return _context2.abrupt('return', response);

						case 3:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, this);
		}));

		function loginUser(_x3) {
			return _ref2.apply(this, arguments);
		}

		return loginUser;
	}();

	// Set logged in user


	// User loading


	// Log user out


	return AuthActions;
}();

exports.default = new AuthActions();
//# sourceMappingURL=authActions.js.map
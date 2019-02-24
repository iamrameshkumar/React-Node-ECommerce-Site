'use strict';

exports.__esModule = true;
exports.logoutUser = exports.setUserLoading = exports.setCurrentUser = exports.loginUser = exports.registerUser = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _setAuthToken = require('../lib/utils/setAuthToken');

var _setAuthToken2 = _interopRequireDefault(_setAuthToken);

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _authActiontypes = require('./authActiontypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Register User
var registerUser = exports.registerUser = function registerUser(userData, history) {
	return function (dispatch) {
		_axios2.default.post('/api/v1/users/register', userData).then(function (res) {
			return history.push('/login');
		}).catch(function (err) {
			return dispatch({
				type: _authActiontypes.GET_ERRORS,
				payload: err.response.data
			});
		});
	};
};

// Login - get user token

//import api from '../../../lib/api';
var loginUser = exports.loginUser = function loginUser(userData) {
	return function (dispatch) {
		_axios2.default.post('/api/v1/users/login', userData).then(function (res) {
			// Save to localStorage

			// Set token to localStorage
			var token = res.data.token;

			localStorage.setItem('jwtToken', token);
			// Set token to Auth header
			(0, _setAuthToken2.default)(token);
			// Decode token to get user data
			var decoded = (0, _jwtDecode2.default)(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		}).catch(function (err) {
			return dispatch({ type: _authActiontypes.GET_ERRORS, payload: err.response.data });
		});
	};
};

// Set logged in user
var setCurrentUser = exports.setCurrentUser = function setCurrentUser(decoded) {
	return {
		type: _authActiontypes.SET_CURRENT_USER,
		payload: decoded
	};
};

// User loading
var setUserLoading = exports.setUserLoading = function setUserLoading() {
	return {
		type: _authActiontypes.USER_LOADING
	};
};

// Log user out
var logoutUser = exports.logoutUser = function logoutUser() {
	return function (dispatch) {
		// Remove token from local storage
		localStorage.removeItem('jwtToken');
		// Remove auth header for future requests
		(0, _setAuthToken2.default)(false);
		// Set current user to empty object {} which will set isAuthenticated to false
		dispatch(setCurrentUser({}));
	};
};
//# sourceMappingURL=authActions.js.map
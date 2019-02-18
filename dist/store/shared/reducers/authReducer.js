'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	var action = arguments[1];

	switch (action.type) {
		case _authActiontypes.SET_CURRENT_USER:
			return (0, _extends3.default)({}, state, {
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			});
		case _authActiontypes.USER_LOADING:
			return (0, _extends3.default)({}, state, {
				loading: true
			});
		default:
			return state;
	}
};

var _authActiontypes = require('../actions/authActiontypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isEmpty = require('is-empty');

var initialState = {
	isAuthenticated: false,
	user: {},
	loading: false
};
//# sourceMappingURL=authReducer.js.map
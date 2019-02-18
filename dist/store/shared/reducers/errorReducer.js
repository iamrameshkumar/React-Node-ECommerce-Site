'use strict';

exports.__esModule = true;

exports.default = function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	var action = arguments[1];

	switch (action.type) {
		case _authActiontypes.GET_ERRORS:
			return action.payload;
		default:
			return state;
	}
};

var _authActiontypes = require('../actions/authActiontypes');

var initialState = {};
//# sourceMappingURL=errorReducer.js.map
'use strict';

exports.__esModule = true;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setAuthToken = function setAuthToken(token) {
	if (token) {
		// Apply authorization token to every request if logged in
		_axios2.default.defaults.headers.common['Authorization'] = token;
	} else {
		// Delete auth header
		delete _axios2.default.defaults.headers.common['Authorization'];
	}
};

exports.default = setAuthToken;
//# sourceMappingURL=setAuthToken.js.map
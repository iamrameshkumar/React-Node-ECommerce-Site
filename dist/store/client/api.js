'use strict';

exports.__esModule = true;
exports.restapi = exports.api = undefined;

var _cezerinClient = require('cezerin-client');

var _cezerinClient2 = _interopRequireDefault(_cezerinClient);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = exports.api = new _cezerinClient2.default({
	ajaxBaseUrl: _settings2.default.ajaxBaseUrl || '/ajax'
});

var restapi = exports.restapi = new _cezerinClient2.default({
	apiBaseUrl: _settings2.default.apiBaseUrl || '/api/v1'
});
//# sourceMappingURL=api.js.map
'use strict';

exports.__esModule = true;

var _cezerinClient = require('cezerin-client');

var _cezerinClient2 = _interopRequireDefault(_cezerinClient);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = new _cezerinClient2.default({
	ajaxBaseUrl: _settings2.default.ajaxBaseUrl || '/ajax',
	apiBaseUrl: _settings2.default.apiBaseUrl || '/api/v1'
});

exports.default = api;
//# sourceMappingURL=api.js.map
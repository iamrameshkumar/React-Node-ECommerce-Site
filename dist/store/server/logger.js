'use strict';

exports.__esModule = true;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGS_FILE = 'logs/server.log';

_winston2.default.configure({
	transports: [new _winston2.default.transports.Console({
		level: 'debug',
		handleExceptions: true,
		format: _winston2.default.format.combine(_winston2.default.format.colorize(), _winston2.default.format.simple())
	}), new _winston2.default.transports.File({
		level: 'info',
		handleExceptions: true,
		format: _winston2.default.format.json(),
		filename: LOGS_FILE
	})]
});

exports.default = {};
//# sourceMappingURL=logger.js.map
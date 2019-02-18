"use strict";

exports.__esModule = true;
var themeSettings = exports.themeSettings = null;
var text = exports.text = null;
var language = exports.language = null;
var api = exports.api = null;

var setVariables = function setVariables(options) {
	if (options.themeSettings) {
		exports.themeSettings = themeSettings = options.themeSettings;
	}

	if (options.text) {
		exports.text = text = options.text;
	}

	if (options.language) {
		exports.language = language = options.language;
	}

	if (options.api) {
		exports.api = api = options.api;
	}
};

var initOnClient = exports.initOnClient = function initOnClient(options) {
	setVariables(options);
};

var initOnServer = exports.initOnServer = function initOnServer(options) {
	setVariables(options);
};
//# sourceMappingURL=settings.js.map
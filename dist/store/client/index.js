'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRouterDom = require('react-router-dom');

var _theme = require('theme');

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _reducers = require('../shared/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _analytics = require('../shared/analytics');

var analytics = _interopRequireWildcard(_analytics);

var _app = require('../shared/app');

var _app2 = _interopRequireDefault(_app);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = window.__APP_STATE__;
var themeText = window.__APP_TEXT__;

(0, _theme.initOnClient)({
	themeSettings: initialState.app.themeSettings,
	text: themeText,
	language: _settings2.default.language,
	api: _api2.default
});

var store = (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.applyMiddleware)(_reduxThunk2.default));

_reactDom2.default.hydrate(_react2.default.createElement(
	_reactRedux.Provider,
	{ store: store },
	_react2.default.createElement(
		_reactRouterDom.BrowserRouter,
		null,
		_react2.default.createElement(_app2.default, null)
	)
), document.getElementById('app'));

analytics.onPageLoad({ state: initialState });

if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.register('/sw.js').then(function (registration) {
			console.log('SW registered.');
		}).catch(function (registrationError) {
			console.log('SW registration failed: ', registrationError);
		});
	});
}
//# sourceMappingURL=index.js.map
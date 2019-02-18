'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _settings = require('../lib/settings');

var _header = require('../components/header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../components/footer');

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SharedContainer = function SharedContainer(props) {
	var children = props.children,
	    _props$state = props.state,
	    currentPage = _props$state.currentPage,
	    settings = _props$state.settings;

	var hideFooter = currentPage.path !== '/' && _settings.themeSettings.hide_footer_on_checkout === true;

	return _react2.default.createElement(
		_react.Fragment,
		null,
		_react2.default.createElement(_header2.default, props),
		children,
		!hideFooter && _react2.default.createElement(_footer2.default, { settings: settings })
	);
};

SharedContainer.propTypes = {
	children: _propTypes2.default.element.isRequired,
	state: _propTypes2.default.shape({
		currentPage: _propTypes2.default.shape({}),
		settings: _propTypes2.default.shape({})
	}).isRequired
};

exports.default = SharedContainer;
//# sourceMappingURL=shared.js.map
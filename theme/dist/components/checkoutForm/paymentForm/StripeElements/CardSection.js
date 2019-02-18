'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactStripeElements = require('react-stripe-elements');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardSection = function CardSection(_ref) {
	var title = _ref.title;
	return _react2.default.createElement(
		_react.Fragment,
		null,
		_react2.default.createElement(
			'p',
			null,
			title
		),
		_react2.default.createElement(_reactStripeElements.CardElement, null)
	);
};

exports.default = CardSection;
//# sourceMappingURL=CardSection.js.map
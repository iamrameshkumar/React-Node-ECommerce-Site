'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactStripeElements = require('react-stripe-elements');

var _CheckoutForm = require('./CheckoutForm');

var _CheckoutForm2 = _interopRequireDefault(_CheckoutForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StoreCheckout = function StoreCheckout(_ref) {
	var formSettings = _ref.formSettings,
	    shopSettings = _ref.shopSettings,
	    onPayment = _ref.onPayment,
	    onCreateToken = _ref.onCreateToken;
	return _react2.default.createElement(
		_reactStripeElements.Elements,
		null,
		_react2.default.createElement(_CheckoutForm2.default, {
			formSettings: formSettings,
			shopSettings: shopSettings,
			onPayment: onPayment,
			onCreateToken: onCreateToken
		})
	);
};

exports.default = StoreCheckout;
//# sourceMappingURL=StoreCheckout.js.map
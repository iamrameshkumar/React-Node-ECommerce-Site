'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _settings = require('../../lib/settings');

var _paymentForm = require('./paymentForm');

var _paymentForm2 = _interopRequireDefault(_paymentForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckoutStepPayment = function CheckoutStepPayment(props) {
	var cart = props.cart,
	    settings = props.settings,
	    processingCheckout = props.processingCheckout,
	    handleSuccessPayment = props.handleSuccessPayment,
	    inputClassName = props.inputClassName,
	    buttonClassName = props.buttonClassName,
	    show = props.show,
	    title = props.title,
	    onCreateToken = props.onCreateToken;
	var payment_method_gateway = cart.payment_method_gateway,
	    grand_total = cart.grand_total;


	if (!show) {
		return _react2.default.createElement(
			'div',
			{ className: 'checkout-step' },
			_react2.default.createElement(
				'h1',
				null,
				_react2.default.createElement(
					'span',
					null,
					'3'
				),
				title
			)
		);
	}
	return _react2.default.createElement(
		'div',
		{ className: 'checkout-step' },
		_react2.default.createElement(
			'h1',
			null,
			_react2.default.createElement(
				'span',
				null,
				'3'
			),
			title
		),
		_react2.default.createElement(
			'div',
			{ className: 'checkout-button-wrap' },
			!processingCheckout && _react2.default.createElement(_paymentForm2.default, {
				gateway: payment_method_gateway,
				amount: grand_total,
				shopSettings: settings,
				onPayment: handleSuccessPayment,
				inputClassName: inputClassName,
				buttonClassName: buttonClassName,
				onCreateToken: onCreateToken
			}),
			processingCheckout && _react2.default.createElement(
				'p',
				null,
				_settings.text.loading
			)
		)
	);
};

exports.default = CheckoutStepPayment;
//# sourceMappingURL=stepPayment.js.map
'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scriptAdded = false;

var PayPalButton = function (_React$Component) {
	(0, _inherits3.default)(PayPalButton, _React$Component);

	function PayPalButton(props) {
		(0, _classCallCheck3.default)(this, PayPalButton);

		var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

		_this.addScript = function () {
			if (scriptAdded) {
				_this.executeScript();
				return;
			}

			var SCRIPT_URL = 'https://www.paypalobjects.com/api/checkout.min.js';
			var container = document.body || document.head;
			var script = document.createElement('script');
			script.src = SCRIPT_URL;
			script.onload = function () {
				_this.executeScript();
			};
			container.appendChild(script);
			scriptAdded = true;
		};

		_this.executeScript = function () {
			var _this$props = _this.props,
			    formSettings = _this$props.formSettings,
			    shopSettings = _this$props.shopSettings,
			    onPayment = _this$props.onPayment;


			document.getElementById('paypal-button-container').innerHTML = null;

			paypal.Button.render({
				// Set your environment
				env: formSettings.env, // sandbox | production
				// Show the buyer a 'Pay Now' button in the checkout flow
				commit: true,
				// Specify the style of the button
				style: {
					label: 'pay',
					size: formSettings.size,
					shape: formSettings.shape,
					color: formSettings.color
				},
				client: {
					sandbox: formSettings.client,
					production: formSettings.client
				},
				// Wait for the PayPal button to be clicked
				payment: function payment(data, actions) {
					return actions.payment.create({
						payment: {
							intent: 'sale',
							transactions: [{
								custom: formSettings.order_id,
								notify_url: formSettings.notify_url,
								amount: {
									total: formSettings.amount,
									currency: formSettings.currency
								}
							}]
						},
						experience: {
							input_fields: { no_shipping: 1 }
						}
					});
				},
				// Wait for the payment to be authorized by the customer
				onAuthorize: function onAuthorize(data, actions) {
					return actions.payment.execute().then(function () {
						onPayment();
					});
				}
			}, '#paypal-button-container');
		};

		return _this;
	}

	PayPalButton.prototype.componentDidMount = function componentDidMount() {
		this.addScript();
	};

	PayPalButton.prototype.componentDidUpdate = function componentDidUpdate() {
		this.executeScript();
	};

	PayPalButton.prototype.render = function render() {
		var _props = this.props,
		    formSettings = _props.formSettings,
		    shopSettings = _props.shopSettings,
		    onPayment = _props.onPayment;


		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement('div', { id: 'paypal-button-container' })
		);
	};

	return PayPalButton;
}(_react2.default.Component);

exports.default = PayPalButton;
//# sourceMappingURL=PayPalCheckout.js.map
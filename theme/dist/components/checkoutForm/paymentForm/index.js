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

var _api = require('../../../lib/api');

var _api2 = _interopRequireDefault(_api);

var _PayPalCheckout = require('./PayPalCheckout');

var _PayPalCheckout2 = _interopRequireDefault(_PayPalCheckout);

var _LiqPay = require('./LiqPay');

var _LiqPay2 = _interopRequireDefault(_LiqPay);

var _StripeElements = require('./StripeElements');

var _StripeElements2 = _interopRequireDefault(_StripeElements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaymentForm = function (_React$Component) {
	(0, _inherits3.default)(PaymentForm, _React$Component);

	function PaymentForm(props) {
		(0, _classCallCheck3.default)(this, PaymentForm);

		var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

		_this.fetchFormSettings = function () {
			_this.setState({
				loading: true
			});

			_api2.default.ajax.paymentFormSettings.retrieve().then(function (_ref) {
				var status = _ref.status,
				    json = _ref.json;

				_this.setState({
					formSettings: json,
					loading: false
				});
			}).catch(function (e) {
				_this.setState({
					formSettings: null,
					loading: false
				});
				console.log(e);
			});
		};

		_this.state = {
			formSettings: null,
			loading: false
		};
		return _this;
	}

	PaymentForm.prototype.componentDidMount = function componentDidMount() {
		this.fetchFormSettings();
	};

	PaymentForm.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		if (nextProps.gateway !== this.props.gateway || nextProps.amount !== this.props.amount) {
			this.fetchFormSettings();
		}
	};

	PaymentForm.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
		return nextProps.gateway !== this.props.gateway || nextProps.amount !== this.props.amount || this.state !== nextState;
	};

	PaymentForm.prototype.render = function render() {
		var _props = this.props,
		    gateway = _props.gateway,
		    shopSettings = _props.shopSettings,
		    onPayment = _props.onPayment,
		    onCreateToken = _props.onCreateToken;
		var _state = this.state,
		    formSettings = _state.formSettings,
		    loading = _state.loading;


		if (loading) {
			return null;
		} else if (formSettings && gateway && gateway !== '') {
			switch (gateway) {
				case 'paypal-checkout':
					return _react2.default.createElement(
						'div',
						{ className: 'payment-form' },
						_react2.default.createElement(_PayPalCheckout2.default, {
							formSettings: formSettings,
							shopSettings: shopSettings,
							onPayment: onPayment
						})
					);
				case 'liqpay':
					return _react2.default.createElement(
						'div',
						{ className: 'payment-form' },
						_react2.default.createElement(_LiqPay2.default, {
							formSettings: formSettings,
							shopSettings: shopSettings,
							onPayment: onPayment
						})
					);
				case 'stripe-elements':
					return _react2.default.createElement(
						'div',
						{ className: 'payment-form' },
						_react2.default.createElement(_StripeElements2.default, {
							formSettings: formSettings,
							shopSettings: shopSettings,
							onPayment: onPayment,
							onCreateToken: onCreateToken
						})
					);
				default:
					return _react2.default.createElement(
						'div',
						null,
						'Payment Gateway ',
						_react2.default.createElement(
							'b',
							null,
							gateway
						),
						' not found!'
					);
			}
		} else {
			return null;
		}
	};

	return PaymentForm;
}(_react2.default.Component);

exports.default = PaymentForm;
//# sourceMappingURL=index.js.map
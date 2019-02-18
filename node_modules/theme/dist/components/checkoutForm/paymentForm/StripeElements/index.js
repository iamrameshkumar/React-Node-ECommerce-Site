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

var _reactStripeElements = require('react-stripe-elements');

var _StoreCheckout = require('./StoreCheckout');

var _StoreCheckout2 = _interopRequireDefault(_StoreCheckout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StripeElements = function (_React$Component) {
	(0, _inherits3.default)(StripeElements, _React$Component);

	function StripeElements(props) {
		(0, _classCallCheck3.default)(this, StripeElements);

		var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

		_this.state = { stripe: null };
		return _this;
	}

	StripeElements.prototype.componentDidMount = function componentDidMount() {
		var _this2 = this;

		var SCRIPT_URL = 'https://js.stripe.com/v3/';
		var container = document.body || document.head;
		var script = document.createElement('script');
		script.src = SCRIPT_URL;
		script.async = true;
		script.onload = function () {
			_this2.setState({
				stripe: window.Stripe(_this2.props.formSettings.public_key)
			});
		};
		container.appendChild(script);
	};

	StripeElements.prototype.render = function render() {
		var _props = this.props,
		    formSettings = _props.formSettings,
		    shopSettings = _props.shopSettings,
		    onPayment = _props.onPayment,
		    onCreateToken = _props.onCreateToken;

		return _react2.default.createElement(
			_reactStripeElements.StripeProvider,
			{ stripe: this.state.stripe },
			_react2.default.createElement(_StoreCheckout2.default, {
				formSettings: formSettings,
				shopSettings: shopSettings,
				onPayment: onPayment,
				onCreateToken: onCreateToken
			})
		);
	};

	return StripeElements;
}(_react2.default.Component);

exports.default = StripeElements;
//# sourceMappingURL=index.js.map
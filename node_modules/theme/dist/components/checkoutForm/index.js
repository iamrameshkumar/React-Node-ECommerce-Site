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

var _settings = require('../../lib/settings');

var _stepContacts = require('./stepContacts');

var _stepContacts2 = _interopRequireDefault(_stepContacts);

var _stepShipping = require('./stepShipping');

var _stepShipping2 = _interopRequireDefault(_stepShipping);

var _stepPayment = require('./stepPayment');

var _stepPayment2 = _interopRequireDefault(_stepPayment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckoutForm = function (_React$Component) {
	(0, _inherits3.default)(CheckoutForm, _React$Component);

	function CheckoutForm(props) {
		(0, _classCallCheck3.default)(this, CheckoutForm);

		var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

		_this.changeStep = function (step) {
			_this.setState({ step: step });
		};

		_this.handleContactsSave = function () {
			_this.changeStep(2);
		};

		_this.handleContactsEdit = function () {
			_this.changeStep(1);
		};

		_this.handleShippingSave = function () {
			_this.changeStep(3);
		};

		_this.handleShippingEdit = function () {
			_this.changeStep(2);
		};

		_this.handleContactsSubmit = function (values) {
			_this.props.updateCart({
				email: values.email,
				mobile: values.mobile
			});
			_this.handleContactsSave();
		};

		_this.handleLocationSave = function (shippingLocation) {
			_this.props.updateCart({
				shipping_address: shippingLocation,
				billing_address: shippingLocation,
				payment_method_id: null,
				shipping_method_id: null
			}, function (cart) {
				_this.props.loadShippingMethods();
				_this.props.loadPaymentMethods();
			});
		};

		_this.handleShippingMethodSave = function (shippingMethodId) {
			_this.props.updateCart({
				payment_method_id: null,
				shipping_method_id: shippingMethodId
			}, function (cart) {
				_this.props.loadPaymentMethods();
			});
		};

		_this.handlePaymentMethodSave = function (paymentMethodId) {
			_this.props.updateCart({
				payment_method_id: paymentMethodId
			});
		};

		_this.isShowPaymentForm = function () {
			var payment_method_gateway = _this.props.state.cart.payment_method_gateway;

			var paymentGatewayExists = payment_method_gateway && payment_method_gateway !== '';
			return paymentGatewayExists;
		};

		_this.handleShippingSubmit = function (values) {
			if (_this.isShowPaymentForm()) {
				var shipping_address = values.shipping_address,
				    billing_address = values.billing_address,
				    comments = values.comments;


				_this.props.updateCart({
					shipping_address: shipping_address,
					billing_address: billing_address,
					comments: comments
				});
				_this.handleShippingSave();
			} else {
				_this.props.checkout(values);
			}
		};

		_this.handleSuccessPayment = function () {
			_this.props.checkout(null);
		};

		_this.handleCheckoutWithToken = function (tokenId) {
			_this.props.updateCart({
				payment_token: tokenId
			}, function (cart) {
				_this.props.checkout(null);
			});
		};

		_this.state = {
			step: 1
		};
		return _this;
	}

	CheckoutForm.prototype.componentDidMount = function componentDidMount() {
		this.props.loadShippingMethods();
		this.props.loadPaymentMethods();
	};

	CheckoutForm.prototype.render = function render() {
		var step = this.state.step;
		var _props$state = this.props.state,
		    settings = _props$state.settings,
		    cart = _props$state.cart,
		    paymentMethods = _props$state.paymentMethods,
		    shippingMethods = _props$state.shippingMethods,
		    loadingShippingMethods = _props$state.loadingShippingMethods,
		    loadingPaymentMethods = _props$state.loadingPaymentMethods,
		    checkoutFields = _props$state.checkoutFields,
		    processingCheckout = _props$state.processingCheckout;
		var _themeSettings$checko = _settings.themeSettings.checkoutInputClass,
		    checkoutInputClass = _themeSettings$checko === undefined ? 'checkout-field' : _themeSettings$checko,
		    _themeSettings$checko2 = _settings.themeSettings.checkoutButtonClass,
		    checkoutButtonClass = _themeSettings$checko2 === undefined ? 'checkout-button' : _themeSettings$checko2,
		    _themeSettings$checko3 = _settings.themeSettings.checkoutEditButtonClass,
		    checkoutEditButtonClass = _themeSettings$checko3 === undefined ? 'checkout-button-edit' : _themeSettings$checko3;


		if (cart && cart.items.length > 0) {
			var showPaymentForm = this.isShowPaymentForm();

			var shippingMethod = null;
			var shipping_method_id = cart.shipping_method_id;

			if (shipping_method_id && shippingMethods && shippingMethods.length > 0) {
				shippingMethod = shippingMethods.find(function (method) {
					return method.id === shipping_method_id;
				});
			}

			return _react2.default.createElement(
				'div',
				{ className: 'checkout-form' },
				_react2.default.createElement(_stepContacts2.default, {
					isReadOnly: step > 1,
					title: _settings.text.customerDetails,
					inputClassName: checkoutInputClass,
					buttonClassName: checkoutButtonClass,
					editButtonClassName: checkoutEditButtonClass,
					initialValues: cart,
					settings: settings,
					paymentMethods: paymentMethods,
					shippingMethods: shippingMethods,
					loadingShippingMethods: loadingShippingMethods,
					loadingPaymentMethods: loadingPaymentMethods,
					checkoutFields: checkoutFields,
					onEdit: this.handleContactsEdit,
					onSubmit: this.handleContactsSubmit,
					saveShippingLocation: this.handleLocationSave,
					saveShippingMethod: this.handleShippingMethodSave,
					savePaymentMethod: this.handlePaymentMethodSave
				}),
				_react2.default.createElement(_stepShipping2.default, {
					show: step >= 2,
					isReadOnly: step > 2,
					title: _settings.text.shipping,
					inputClassName: checkoutInputClass,
					buttonClassName: checkoutButtonClass,
					editButtonClassName: checkoutEditButtonClass,
					initialValues: cart,
					settings: settings,
					processingCheckout: processingCheckout,
					shippingMethod: shippingMethod,
					checkoutFields: checkoutFields,
					showPaymentForm: showPaymentForm,
					onSave: this.handleShippingSave,
					onEdit: this.handleShippingEdit,
					onSubmit: this.handleShippingSubmit
				}),
				showPaymentForm && _react2.default.createElement(_stepPayment2.default, {
					show: step === 3,
					title: _settings.text.payment,
					inputClassName: checkoutInputClass,
					buttonClassName: checkoutButtonClass,
					cart: cart,
					settings: settings,
					processingCheckout: processingCheckout,
					handleSuccessPayment: this.handleSuccessPayment,
					onCreateToken: this.handleCheckoutWithToken
				})
			);
		} else {
			return _react2.default.createElement(
				'p',
				null,
				_settings.text.emptyCheckout
			);
		}
	};

	return CheckoutForm;
}(_react2.default.Component);

exports.default = CheckoutForm;
//# sourceMappingURL=index.js.map
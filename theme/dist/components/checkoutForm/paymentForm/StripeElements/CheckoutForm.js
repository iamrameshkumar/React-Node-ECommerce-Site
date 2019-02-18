'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactStripeElements = require('react-stripe-elements');

var _CardSection = require('./CardSection');

var _CardSection2 = _interopRequireDefault(_CardSection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckoutForm = function (_React$Component) {
	(0, _inherits3.default)(CheckoutForm, _React$Component);

	function CheckoutForm(props) {
		(0, _classCallCheck3.default)(this, CheckoutForm);

		var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

		_this.state = {
			inProgress: false
		};
		_this.submit = _this.submit.bind(_this);
		return _this;
	}

	CheckoutForm.prototype.submit = function () {
		var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ev) {
			var _props, formSettings, onCreateToken, stripe, _ref2, token;

			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							this.setState({
								inProgress: true
							});
							_props = this.props, formSettings = _props.formSettings, onCreateToken = _props.onCreateToken, stripe = _props.stripe;
							_context.next = 4;
							return stripe.createToken({
								name: formSettings.email
							});

						case 4:
							_ref2 = _context.sent;
							token = _ref2.token;

							if (token && token !== 'undefined') {
								onCreateToken(token.id);
							} else {
								this.setState({
									inProgress: false
								});
							}

						case 7:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, this);
		}));

		function submit(_x) {
			return _ref.apply(this, arguments);
		}

		return submit;
	}();

	CheckoutForm.prototype.render = function render() {
		var inProgress = this.state.inProgress;

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(_CardSection2.default, { title: 'Credit Card details' }),
			_react2.default.createElement(
				'div',
				{ className: 'checkout-button-wrap' },
				_react2.default.createElement(
					'button',
					{
						onClick: this.submit,
						disabled: inProgress,
						className: 'checkout-button button is-primary' + (inProgress ? ' is-loading' : '')
					},
					'Confirm order'
				)
			)
		);
	};

	return CheckoutForm;
}(_react2.default.Component);

exports.default = (0, _reactStripeElements.injectStripe)(CheckoutForm);
//# sourceMappingURL=CheckoutForm.js.map
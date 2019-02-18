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

var _reactRouterDom = require('react-router-dom');

var _settings = require('../../lib/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CartCount = function CartCount(_ref) {
	var cart = _ref.cart;

	if (cart && cart.items && cart.items.length > 0) {
		var itemsCount = cart.items.reduce(function (a, b) {
			return a + b.quantity;
		}, 0);
		return _react2.default.createElement(
			'span',
			{ className: 'cart-count' },
			itemsCount
		);
	}
	return null;
};

var CartIcon = function CartIcon(_ref2) {
	var cartIsActive = _ref2.cartIsActive;

	if (cartIsActive) {
		return _react2.default.createElement('img', {
			src: '/assets/images/close.svg',
			className: 'icon',
			alt: _settings.text.close,
			title: _settings.text.close,
			style: { minWidth: 24, padding: 4 }
		});
	}
	return _react2.default.createElement('img', {
		src: '/assets/images/shopping-bag.svg',
		className: 'icon',
		alt: _settings.text.cart,
		title: _settings.text.cart,
		style: { minWidth: 24 }
	});
};

var CartIndicator = function (_React$PureComponent) {
	(0, _inherits3.default)(CartIndicator, _React$PureComponent);

	function CartIndicator() {
		(0, _classCallCheck3.default)(this, CartIndicator);
		return (0, _possibleConstructorReturn3.default)(this, _React$PureComponent.apply(this, arguments));
	}

	CartIndicator.prototype.render = function render() {
		var _props = this.props,
		    cart = _props.cart,
		    onClick = _props.onClick,
		    cartIsActive = _props.cartIsActive;

		return _react2.default.createElement(
			'span',
			{ className: 'cart-button', onClick: onClick },
			_react2.default.createElement(CartIcon, { cartIsActive: cartIsActive }),
			_react2.default.createElement(CartCount, { cart: cart })
		);
	};

	return CartIndicator;
}(_react2.default.PureComponent);

exports.default = CartIndicator;
//# sourceMappingURL=cartIndicator.js.map
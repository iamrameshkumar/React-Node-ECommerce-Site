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

var _helper = require('../../lib/helper');

var helper = _interopRequireWildcard(_helper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CartItem = function CartItem(_ref) {
	var item = _ref.item,
	    deleteCartItem = _ref.deleteCartItem,
	    settings = _ref.settings;

	var thumbnail = helper.getThumbnailUrl(item.image_url, _settings.themeSettings.cartThumbnailWidth);

	return _react2.default.createElement(
		'div',
		{ className: 'columns is-mobile' },
		_react2.default.createElement(
			'div',
			{ className: 'column is-2' },
			_react2.default.createElement(
				'div',
				{ className: 'image' },
				_react2.default.createElement(
					_reactRouterDom.NavLink,
					{ to: item.path },
					_react2.default.createElement('img', { src: thumbnail })
				)
			)
		),
		_react2.default.createElement(
			'div',
			{ className: 'column' },
			_react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_reactRouterDom.NavLink,
					{ to: item.path },
					item.name
				)
			),
			item.variant_name.length > 0 && _react2.default.createElement(
				'div',
				{ className: 'cart-option-name' },
				item.variant_name
			),
			_react2.default.createElement(
				'div',
				{ className: 'cart-quantity' },
				_settings.text.qty,
				': ',
				item.quantity
			)
		),
		_react2.default.createElement(
			'div',
			{ className: 'column is-4 has-text-right' },
			_react2.default.createElement(
				'div',
				{ className: 'mini-cart-item-price' },
				helper.formatCurrency(item.price_total, settings)
			),
			_react2.default.createElement(
				'a',
				{
					className: 'button is-light is-small',
					onClick: function onClick() {
						return deleteCartItem(item.id);
					}
				},
				_settings.text.remove
			)
		)
	);
};

var Cart = function (_React$PureComponent) {
	(0, _inherits3.default)(Cart, _React$PureComponent);

	function Cart() {
		(0, _classCallCheck3.default)(this, Cart);
		return (0, _possibleConstructorReturn3.default)(this, _React$PureComponent.apply(this, arguments));
	}

	Cart.prototype.render = function render() {
		var _props = this.props,
		    cart = _props.cart,
		    deleteCartItem = _props.deleteCartItem,
		    settings = _props.settings,
		    cartToggle = _props.cartToggle;


		if (cart && cart.items && cart.items.length > 0) {
			var items = cart.items.map(function (item) {
				return _react2.default.createElement(CartItem, {
					key: item.id,
					item: item,
					deleteCartItem: deleteCartItem,
					settings: settings
				});
			});

			return _react2.default.createElement(
				'div',
				{ className: 'mini-cart' },
				items,
				_react2.default.createElement('hr', { className: 'separator' }),
				_react2.default.createElement(
					'div',
					{ className: 'columns is-mobile is-gapless' },
					_react2.default.createElement(
						'div',
						{ className: 'column is-7' },
						_react2.default.createElement(
							'b',
							null,
							_settings.text.subtotal
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'column is-5 has-text-right' },
						_react2.default.createElement(
							'b',
							null,
							helper.formatCurrency(cart.subtotal, settings)
						)
					)
				),
				_react2.default.createElement(
					_reactRouterDom.NavLink,
					{
						className: 'button is-primary is-fullwidth has-text-centered',
						style: { textTransform: 'uppercase' },
						to: '/checkout',
						onClick: cartToggle
					},
					_settings.text.proceedToCheckout
				)
			);
		}
		return _react2.default.createElement(
			'div',
			{ className: 'mini-cart' },
			_react2.default.createElement(
				'p',
				null,
				_settings.text.cartEmpty
			)
		);
	};

	return Cart;
}(_react2.default.PureComponent);

exports.default = Cart;
//# sourceMappingURL=cart.js.map
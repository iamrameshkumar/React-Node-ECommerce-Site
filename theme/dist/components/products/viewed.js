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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _settings = require('../../lib/settings');

var _custom = require('./custom');

var _custom2 = _interopRequireDefault(_custom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ViewedProducts = function (_React$Component) {
	(0, _inherits3.default)(ViewedProducts, _React$Component);

	function ViewedProducts() {
		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, ViewedProducts);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
			viewedProducts: []
		}, _this.getArrayFromLocalStorage = function () {
			var values = [];
			var viewedProducts = localStorage.getItem('viewedProducts');

			try {
				if (viewedProducts && viewedProducts.length > 0) {
					var viewedProductsParsed = JSON.parse(viewedProducts);
					if (Array.isArray(viewedProductsParsed)) {
						values = viewedProductsParsed;
					}
				}
			} catch (e) {
				//
			}

			return values;
		}, _this.addProductIdToLocalStorage = function (productId) {
			if (productId && productId.length > 0) {
				var viewedProducts = _this.getArrayFromLocalStorage();

				if (viewedProducts.includes(productId)) {
					var index = viewedProducts.indexOf(productId);
					viewedProducts.splice(index, 1);
					viewedProducts.push(productId);
				} else {
					viewedProducts.push(productId);
				}

				localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
				_this.setState({ viewedProducts: viewedProducts });
			}
		}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	ViewedProducts.prototype.componentDidMount = function componentDidMount() {
		var product = this.props.product;

		var viewedProducts = this.getArrayFromLocalStorage();
		this.setState({ viewedProducts: viewedProducts });

		if (product && product.id) {
			this.addProductIdToLocalStorage(product.id);
		}
	};

	ViewedProducts.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		if (this.props.product !== nextProps.product && nextProps.product && nextProps.product.id) {
			this.addProductIdToLocalStorage(nextProps.product.id);
		}
	};

	ViewedProducts.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
		return this.state.viewedProducts !== nextState.viewedProducts;
	};

	ViewedProducts.prototype.render = function render() {
		var _props = this.props,
		    limit = _props.limit,
		    settings = _props.settings,
		    addCartItem = _props.addCartItem,
		    product = _props.product;
		var viewedProducts = this.state.viewedProducts;


		if (viewedProducts && product && product.id) {
			viewedProducts = viewedProducts.filter(function (id) {
				return id !== product.id;
			});
		}

		if (viewedProducts && viewedProducts.length > 0) {
			var ids = viewedProducts.reverse().slice(0, limit);
			return _react2.default.createElement(
				'section',
				{ className: 'section section-product-related' },
				_react2.default.createElement(
					'div',
					{ className: 'container' },
					_react2.default.createElement(
						'div',
						{ className: 'title is-4 has-text-centered' },
						_settings.text.recentlyViewed
					),
					_react2.default.createElement(_custom2.default, {
						ids: ids,
						settings: settings,
						addCartItem: addCartItem,
						limit: limit,
						isCentered: true
					})
				)
			);
		}
		return null;
	};

	return ViewedProducts;
}(_react2.default.Component);

ViewedProducts.propTypes = {
	limit: _propTypes2.default.number.isRequired,
	settings: _propTypes2.default.shape({}).isRequired,
	addCartItem: _propTypes2.default.func.isRequired,
	product: _propTypes2.default.shape({}).isRequired
};
exports.default = ViewedProducts;
//# sourceMappingURL=viewed.js.map
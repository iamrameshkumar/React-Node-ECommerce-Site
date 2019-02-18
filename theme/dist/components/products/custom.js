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

var _api = require('../../lib/api');

var _api2 = _interopRequireDefault(_api);

var _productList = require('../productList');

var _productList2 = _interopRequireDefault(_productList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomProducts = function (_React$Component) {
	(0, _inherits3.default)(CustomProducts, _React$Component);

	function CustomProducts() {
		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, CustomProducts);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
			products: []
		}, _this.fetchProducts = function (_ref) {
			var ids = _ref.ids,
			    sku = _ref.sku,
			    sort = _ref.sort,
			    limit = _ref.limit,
			    category_id = _ref.category_id,
			    tags = _ref.tags,
			    attributes = _ref.attributes,
			    price_from = _ref.price_from,
			    price_to = _ref.price_to,
			    on_sale = _ref.on_sale;

			var filter = {
				ids: ids,
				sku: sku,
				tags: tags,
				on_sale: on_sale,
				search: null,
				category_id: category_id,
				price_from: price_from,
				price_to: price_to,
				sort: sort,
				fields: 'path,id,name,category_id,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,attributes,tags',
				limit: limit || 4,
				offset: 0
			};

			if (attributes && Array.isArray(attributes) && attributes.length > 0) {
				attributes.forEach(function (attr) {
					filter['attributes.' + attr.name] = attr.value;
				});
			}

			_api2.default.ajax.products.list(filter).then(function (_ref2) {
				var json = _ref2.json;

				if (!_this.isCancelled) {
					_this.setState({
						products: json.data
					});
				}
			}).catch(function () {});
		}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	CustomProducts.prototype.componentDidMount = function componentDidMount() {
		this.isCancelled = false;
		this.fetchProducts(this.props);
	};

	CustomProducts.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		this.fetchProducts(nextProps);
	};

	CustomProducts.prototype.componentWillUnmount = function componentWillUnmount() {
		this.isCancelled = true;
	};

	CustomProducts.prototype.render = function render() {
		var _props = this.props,
		    settings = _props.settings,
		    addCartItem = _props.addCartItem,
		    isCentered = _props.isCentered,
		    className = _props.className,
		    columnCountOnMobile = _props.columnCountOnMobile,
		    columnCountOnTablet = _props.columnCountOnTablet,
		    columnCountOnDesktop = _props.columnCountOnDesktop,
		    columnCountOnWidescreen = _props.columnCountOnWidescreen,
		    columnCountOnFullhd = _props.columnCountOnFullhd;
		var products = this.state.products;


		return _react2.default.createElement(_productList2.default, {
			products: products,
			addCartItem: addCartItem,
			settings: settings,
			loadMoreProducts: null,
			hasMore: false,
			columnCountOnMobile: columnCountOnMobile,
			columnCountOnTablet: columnCountOnTablet,
			columnCountOnDesktop: columnCountOnDesktop,
			columnCountOnWidescreen: columnCountOnWidescreen,
			columnCountOnFullhd: columnCountOnFullhd,
			isCentered: isCentered,
			className: className
		});
	};

	return CustomProducts;
}(_react2.default.Component);

CustomProducts.propTypes = {
	ids: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
	sku: _propTypes2.default.string,
	sort: _propTypes2.default.string,
	limit: _propTypes2.default.number.isRequired,
	category_id: _propTypes2.default.string,
	tags: _propTypes2.default.string,
	attributes: _propTypes2.default.arrayOf(_propTypes2.default.shape({
		name: _propTypes2.default.string.isRequired,
		value: _propTypes2.default.string.isRequired
	})),
	price_from: _propTypes2.default.number,
	price_to: _propTypes2.default.number,
	on_sale: _propTypes2.default.bool,
	settings: _propTypes2.default.shape({}).isRequired,
	addCartItem: _propTypes2.default.func.isRequired,
	isCentered: _propTypes2.default.bool,
	className: _propTypes2.default.string,
	columnCountOnMobile: _propTypes2.default.number,
	columnCountOnTablet: _propTypes2.default.number,
	columnCountOnDesktop: _propTypes2.default.number,
	columnCountOnWidescreen: _propTypes2.default.number,
	columnCountOnFullhd: _propTypes2.default.number
};
CustomProducts.defaultProps = {
	ids: null,
	sku: null,
	sort: null,
	category_id: null,
	tags: null,
	attributes: null,
	price_from: null,
	price_to: null,
	on_sale: null,
	isCentered: true,
	className: 'columns is-multiline is-mobile products',
	columnCountOnMobile: 2,
	columnCountOnTablet: 3,
	columnCountOnDesktop: 4,
	columnCountOnWidescreen: 4,
	columnCountOnFullhd: 4
};
exports.default = CustomProducts;
//# sourceMappingURL=custom.js.map
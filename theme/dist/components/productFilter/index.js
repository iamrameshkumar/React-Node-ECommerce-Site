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

var _sort = require('../sort');

var _sort2 = _interopRequireDefault(_sort);

var _priceSlider = require('./priceSlider');

var _priceSlider2 = _interopRequireDefault(_priceSlider);

var _attributeFilter = require('./attributeFilter');

var _attributeFilter2 = _interopRequireDefault(_attributeFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductFilter = function (_React$Component) {
	(0, _inherits3.default)(ProductFilter, _React$Component);

	function ProductFilter(props) {
		(0, _classCallCheck3.default)(this, ProductFilter);

		var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

		_this.sidebarToggle = function () {
			_this.setState({
				sidebarIsActive: !_this.state.sidebarIsActive
			});
			document.body.classList.toggle('noscroll');
		};

		_this.sidebarClose = function () {
			_this.setState({ sidebarIsActive: false });
			document.body.classList.remove('noscroll');
		};

		_this.state = {
			sidebarIsActive: false
		};
		return _this;
	}

	ProductFilter.prototype.render = function render() {
		var sidebarIsActive = this.state.sidebarIsActive;
		var _props$state = this.props.state,
		    categoryDetails = _props$state.categoryDetails,
		    categories = _props$state.categories,
		    settings = _props$state.settings,
		    productFilter = _props$state.productFilter,
		    productsMinPrice = _props$state.productsMinPrice,
		    productsMaxPrice = _props$state.productsMaxPrice,
		    productsAttributes = _props$state.productsAttributes;


		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'div',
				{ className: 'is-hidden-tablet' },
				_react2.default.createElement(
					'button',
					{ className: 'button is-fullwidth', onClick: this.sidebarToggle },
					_settings.text.filterProducts
				)
			),
			_react2.default.createElement(
				'div',
				{
					className: sidebarIsActive ? 'modal is-active' : 'is-hidden-mobile',
					style: { zIndex: 101 }
				},
				_react2.default.createElement('div', {
					className: sidebarIsActive ? 'dark-overflow' : '',
					onClick: this.sidebarClose
				}),
				_react2.default.createElement(
					'div',
					{ className: sidebarIsActive ? 'modal-content' : '' },
					_react2.default.createElement(
						'div',
						{ className: sidebarIsActive ? 'box sidebar' : '' },
						_react2.default.createElement(
							'div',
							{ className: 'is-hidden-tablet', style: { marginBottom: 30 } },
							_react2.default.createElement(_sort2.default, {
								defaultSort: settings.default_product_sorting,
								currentSort: productFilter.sort,
								setSort: this.props.setSort
							})
						),
						_react2.default.createElement(_attributeFilter2.default, {
							attributes: productsAttributes,
							setFilterAttribute: this.props.setFilterAttribute,
							unsetFilterAttribute: this.props.unsetFilterAttribute
						}),
						_react2.default.createElement(_priceSlider2.default, {
							minPrice: productsMinPrice,
							maxPrice: productsMaxPrice,
							minValue: productFilter.priceFrom,
							maxValue: productFilter.priceTo,
							setPriceFromAndTo: this.props.setPriceFromAndTo,
							settings: settings
						}),
						_react2.default.createElement(
							'button',
							{
								className: 'button is-fullwidth is-dark is-hidden-tablet',
								onClick: this.sidebarClose
							},
							_settings.text.close
						)
					)
				)
			)
		);
	};

	return ProductFilter;
}(_react2.default.Component);

exports.default = ProductFilter;
//# sourceMappingURL=index.js.map
'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _settings = require('../lib/settings');

var _metaTags = require('../components/metaTags');

var _metaTags2 = _interopRequireDefault(_metaTags);

var _productList = require('../components/productList');

var _productList2 = _interopRequireDefault(_productList);

var _productFilter = require('../components/productFilter');

var _productFilter2 = _interopRequireDefault(_productFilter);

var _sort = require('../components/sort');

var _sort2 = _interopRequireDefault(_sort);

var _categoryBreadcrumbs = require('../components/categoryBreadcrumbs');

var _categoryBreadcrumbs2 = _interopRequireDefault(_categoryBreadcrumbs);

var _helper = require('../lib/helper');

var helper = _interopRequireWildcard(_helper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFilterAttributesSummary = function getFilterAttributesSummary(productFilter) {
	var attributesSummary = '';
	if (productFilter.attributes) {
		Object.keys(productFilter.attributes).forEach(function (attributeKey) {
			var attributeName = attributeKey.replace('attributes.', '');
			var attributeValue = productFilter.attributes[attributeKey];
			var attributeValueFormatted = Array.isArray(attributeValue) ? attributeValue.join(', ') : attributeValue;
			attributesSummary += '. ' + attributeName + ': ' + attributeValueFormatted;
		});
	}
	return attributesSummary;
};

var getFilterPriceSummary = function getFilterPriceSummary(productFilter, settings) {
	var priceSummary = '';
	if (productFilter.priceFrom > 0 && productFilter.priceTo > 0) {
		var priceFrom = helper.formatCurrency(productFilter.priceFrom, settings);
		var priceTo = helper.formatCurrency(productFilter.priceTo, settings);
		priceSummary = '. ' + _settings.text.price + ': ' + priceFrom + ' - ' + priceTo;
	}
	return priceSummary;
};

var CategoryHero = function CategoryHero(_ref) {
	var categoryDetails = _ref.categoryDetails,
	    categories = _ref.categories;
	return _react2.default.createElement(
		'section',
		{ className: 'hero is-light' },
		_react2.default.createElement(
			'div',
			{ className: 'hero-body' },
			_react2.default.createElement(
				'div',
				{ className: 'container' },
				_settings.themeSettings.show_category_breadcrumbs && _react2.default.createElement(_categoryBreadcrumbs2.default, {
					currentCategory: categoryDetails,
					categories: categories
				}),
				_react2.default.createElement(
					'h1',
					{ className: 'category-title' },
					categoryDetails.name
				),
				_react2.default.createElement('div', {
					className: 'category-description is-hidden-mobile content',
					dangerouslySetInnerHTML: { __html: categoryDetails.description }
				})
			)
		)
	);
};

CategoryHero.propTypes = {
	categoryDetails: _propTypes2.default.shape({}).isRequired,
	categories: _propTypes2.default.arrayOf(_propTypes2.default.shape({})).isRequired
};

var CategoryContainer = function CategoryContainer(props) {
	var setSort = props.setSort,
	    addCartItem = props.addCartItem,
	    loadMoreProducts = props.loadMoreProducts,
	    getJSONLD = props.getJSONLD,
	    state = props.state,
	    _props$state = props.state,
	    products = _props$state.products,
	    categoryDetails = _props$state.categoryDetails,
	    settings = _props$state.settings,
	    productFilter = _props$state.productFilter,
	    productsHasMore = _props$state.productsHasMore,
	    categories = _props$state.categories,
	    loadingProducts = _props$state.loadingProducts,
	    loadingMoreProducts = _props$state.loadingMoreProducts;


	var filterAttributesSummary = getFilterAttributesSummary(productFilter);
	var filterPriceSummary = getFilterPriceSummary(productFilter, settings);

	var pageTitle = categoryDetails.meta_title && categoryDetails.meta_title.length > 0 ? categoryDetails.meta_title : categoryDetails.name;
	var title = '' + pageTitle + filterAttributesSummary + filterPriceSummary;

	var jsonld = getJSONLD(state);

	var showFilter = _settings.themeSettings.show_product_filter;

	return _react2.default.createElement(
		_react.Fragment,
		null,
		_react2.default.createElement(_metaTags2.default, {
			title: title,
			description: categoryDetails.meta_description,
			canonicalUrl: categoryDetails.url,
			imageUrl: categoryDetails.image,
			ogType: 'product.group',
			ogTitle: categoryDetails.name,
			ogDescription: categoryDetails.meta_description,
			jsonld: jsonld
		}),
		_react2.default.createElement(CategoryHero, { categoryDetails: categoryDetails, categories: categories }),
		_react2.default.createElement(
			'section',
			{ className: 'section section-category' },
			_react2.default.createElement(
				'div',
				{ className: 'container' },
				_react2.default.createElement(
					'div',
					{ className: 'columns' },
					showFilter === true && _react2.default.createElement(
						'div',
						{ className: 'column is-one-quarter left-sidebar' },
						_react2.default.createElement(_productFilter2.default, props)
					),
					_react2.default.createElement(
						'div',
						{ className: 'column' },
						_react2.default.createElement(
							'div',
							{ className: 'columns is-hidden-mobile' },
							_react2.default.createElement('div', { className: 'column' }),
							_react2.default.createElement(
								'div',
								{ className: 'column is-5' },
								_react2.default.createElement(_sort2.default, {
									defaultSort: settings.default_product_sorting,
									currentSort: productFilter.sort,
									setSort: setSort
								})
							)
						),
						_react2.default.createElement(_productList2.default, {
							products: products,
							addCartItem: addCartItem,
							settings: settings,
							loadMoreProducts: loadMoreProducts,
							hasMore: productsHasMore,
							loadingProducts: loadingProducts,
							loadingMoreProducts: loadingMoreProducts
						})
					)
				)
			)
		)
	);
};

CategoryContainer.propTypes = {
	setSort: _propTypes2.default.func.isRequired,
	addCartItem: _propTypes2.default.func.isRequired,
	loadMoreProducts: _propTypes2.default.func.isRequired,
	getJSONLD: _propTypes2.default.func.isRequired,
	state: _propTypes2.default.shape({
		settings: _propTypes2.default.shape({}),
		products: _propTypes2.default.arrayOf(_propTypes2.default.shape({})),
		productFilter: _propTypes2.default.shape({}),
		productsHasMore: _propTypes2.default.bool,
		categoryDetails: _propTypes2.default.shape({}),
		categories: _propTypes2.default.arrayOf(_propTypes2.default.shape({})),
		loadingProducts: _propTypes2.default.bool,
		loadingMoreProducts: _propTypes2.default.bool
	}).isRequired
};

exports.default = CategoryContainer;
//# sourceMappingURL=category.js.map
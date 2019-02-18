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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchContainer = function SearchContainer(props) {
	var addCartItem = props.addCartItem,
	    loadMoreProducts = props.loadMoreProducts,
	    _props$state = props.state,
	    products = _props$state.products,
	    settings = _props$state.settings,
	    productFilter = _props$state.productFilter,
	    productsHasMore = _props$state.productsHasMore;

	var searchNotEmpty = productFilter.search && productFilter.search !== '';
	var searchDescription = searchNotEmpty ? _settings.text.resultsFor + ' "' + productFilter.search + '"' : _settings.text.search;
	var title = searchNotEmpty ? productFilter.search + ' - ' + _settings.text.search : _settings.text.search;

	return _react2.default.createElement(
		_react.Fragment,
		null,
		_react2.default.createElement(_metaTags2.default, { title: title }),
		_react2.default.createElement(
			'section',
			{ className: 'hero is-light' },
			_react2.default.createElement(
				'div',
				{ className: 'hero-body' },
				_react2.default.createElement(
					'div',
					{ className: 'container' },
					_react2.default.createElement(
						'h1',
						{ className: 'title is-4' },
						searchDescription
					)
				)
			)
		),
		_react2.default.createElement(
			'section',
			{ className: 'section' },
			_react2.default.createElement(
				'div',
				{ className: 'container' },
				_react2.default.createElement(_productList2.default, {
					products: products,
					addCartItem: addCartItem,
					settings: settings,
					loadMoreProducts: loadMoreProducts,
					hasMore: productsHasMore
				})
			)
		)
	);
};

SearchContainer.propTypes = {
	addCartItem: _propTypes2.default.func.isRequired,
	loadMoreProducts: _propTypes2.default.func.isRequired,
	state: _propTypes2.default.shape({
		settings: _propTypes2.default.shape({}),
		products: _propTypes2.default.arrayOf(_propTypes2.default.shape({})),
		productFilter: _propTypes2.default.shape({}),
		productsHasMore: _propTypes2.default.bool
	}).isRequired
};

exports.default = SearchContainer;
//# sourceMappingURL=search.js.map
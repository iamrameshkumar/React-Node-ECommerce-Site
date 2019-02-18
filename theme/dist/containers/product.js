'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _metaTags = require('../components/metaTags');

var _metaTags2 = _interopRequireDefault(_metaTags);

var _productDetails = require('../components/productDetails');

var _productDetails2 = _interopRequireDefault(_productDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductContainer = function ProductContainer(props) {
	var addCartItem = props.addCartItem,
	    getJSONLD = props.getJSONLD,
	    _props$state = props.state,
	    productDetails = _props$state.productDetails,
	    settings = _props$state.settings,
	    categories = _props$state.categories;


	if (productDetails) {
		var images = productDetails.images;

		var imageUrl = images && images.length > 0 ? images[0].url : null;
		var title = productDetails.meta_title && productDetails.meta_title.length > 0 ? productDetails.meta_title : productDetails.name;
		var jsonld = getJSONLD(props.state);

		return _react2.default.createElement(
			_react.Fragment,
			null,
			_react2.default.createElement(_metaTags2.default, {
				title: title,
				description: productDetails.meta_description,
				canonicalUrl: productDetails.url,
				imageUrl: imageUrl,
				ogType: 'product',
				ogTitle: productDetails.name,
				ogDescription: productDetails.meta_description,
				jsonld: jsonld
			}),
			_react2.default.createElement(_productDetails2.default, {
				settings: settings,
				product: productDetails,
				addCartItem: addCartItem,
				categories: categories
			})
		);
	}
	return null;
};

ProductContainer.propTypes = {
	getJSONLD: _propTypes2.default.func.isRequired,
	addCartItem: _propTypes2.default.func.isRequired,
	state: _propTypes2.default.shape({
		settings: _propTypes2.default.shape({}),
		productDetails: _propTypes2.default.shape({}),
		categories: _propTypes2.default.arrayOf(_propTypes2.default.shape({}))
	}).isRequired
};

exports.default = ProductContainer;
//# sourceMappingURL=product.js.map
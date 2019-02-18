'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _settings = require('../lib/settings');

var _metaTags = require('../components/metaTags');

var _metaTags2 = _interopRequireDefault(_metaTags);

var _custom = require('../components/products/custom');

var _custom2 = _interopRequireDefault(_custom);

var _homeSlider = require('../components/homeSlider');

var _homeSlider2 = _interopRequireDefault(_homeSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndexContainer = function IndexContainer(props) {
	var addCartItem = props.addCartItem,
	    _props$state = props.state,
	    pageDetails = _props$state.pageDetails,
	    settings = _props$state.settings;


	return _react2.default.createElement(
		_react.Fragment,
		null,
		_react2.default.createElement(_metaTags2.default, {
			title: pageDetails.meta_title,
			description: pageDetails.meta_description,
			canonicalUrl: pageDetails.url,
			ogTitle: pageDetails.meta_title,
			ogDescription: pageDetails.meta_description
		}),
		_react2.default.createElement(_homeSlider2.default, { images: _settings.themeSettings.home_slider }),
		pageDetails.content && pageDetails.content.length > 10 && _react2.default.createElement(
			'section',
			{ className: 'section' },
			_react2.default.createElement(
				'div',
				{ className: 'container' },
				_react2.default.createElement(
					'div',
					{ className: 'content' },
					_react2.default.createElement('div', {
						dangerouslySetInnerHTML: {
							__html: pageDetails.content
						}
					})
				)
			)
		),
		_react2.default.createElement(
			'section',
			{ className: 'section' },
			_react2.default.createElement(
				'div',
				{ className: 'container' },
				_react2.default.createElement(
					'div',
					{ className: 'title is-4 has-text-centered' },
					_settings.themeSettings.home_products_title
				),
				_react2.default.createElement(_custom2.default, {
					sku: _settings.themeSettings.home_products_sku,
					sort: _settings.themeSettings.home_products_sort,
					limit: _settings.themeSettings.home_products_limit,
					settings: settings,
					addCartItem: addCartItem
				})
			)
		)
	);
};

IndexContainer.propTypes = {
	addCartItem: _propTypes2.default.func.isRequired,
	state: _propTypes2.default.shape({
		settings: _propTypes2.default.shape({}),
		pageDetails: _propTypes2.default.shape({})
	}).isRequired
};

exports.default = IndexContainer;
//# sourceMappingURL=index.js.map
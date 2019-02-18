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

var _settings = require('../../lib/settings');

var _custom = require('../products/custom');

var _custom2 = _interopRequireDefault(_custom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RelatedProducts = function (_React$PureComponent) {
	(0, _inherits3.default)(RelatedProducts, _React$PureComponent);

	function RelatedProducts() {
		(0, _classCallCheck3.default)(this, RelatedProducts);
		return (0, _possibleConstructorReturn3.default)(this, _React$PureComponent.apply(this, arguments));
	}

	RelatedProducts.prototype.render = function render() {
		var _props = this.props,
		    ids = _props.ids,
		    settings = _props.settings,
		    addCartItem = _props.addCartItem,
		    limit = _props.limit;

		if (ids && ids.length > 0) {
			var title = _settings.themeSettings.related_products_title && _settings.themeSettings.related_products_title.length > 0 ? _settings.themeSettings.related_products_title : _settings.text.relatedProducts;

			return _react2.default.createElement(
				'section',
				{ className: 'section section-product-related' },
				_react2.default.createElement(
					'div',
					{ className: 'container' },
					_react2.default.createElement(
						'div',
						{ className: 'title is-4 has-text-centered' },
						title
					),
					_react2.default.createElement(_custom2.default, {
						ids: ids,
						sort: null,
						limit: limit,
						isCentered: true,
						settings: settings,
						addCartItem: addCartItem
					})
				)
			);
		} else {
			return null;
		}
	};

	return RelatedProducts;
}(_react2.default.PureComponent);

exports.default = RelatedProducts;
//# sourceMappingURL=relatedProducts.js.map
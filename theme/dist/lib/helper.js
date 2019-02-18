'use strict';

exports.__esModule = true;
exports.getCheckoutFieldLabel = exports.getShippingFieldLabel = exports.getFieldLabelByKey = exports.getShippingMethodFromOrder = exports.getCategoryBreadcrumbs = exports.getProductBreadcrumbs = exports.getParentIds = exports.getThumbnailUrl = exports.formatCurrency = exports.formatNumber = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _settings = require('./settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatNumber = exports.formatNumber = function formatNumber(number, settings) {
	var x = 3;
	var floatNumber = parseFloat(number || 0) || 0;

	var re = '\\d(?=(\\d{' + x + '})+' + (settings.decimal_number > 0 ? '\\D' : '$') + ')';

	var num = floatNumber.toFixed(Math.max(0, Math.floor(settings.decimal_number)));

	return (settings.decimal_separator ? num.replace('.', settings.decimal_separator) : num).replace(new RegExp(re, 'g'), '$&' + settings.thousand_separator);
};

var amountPattern = '{amount}';
var formatCurrency = exports.formatCurrency = function formatCurrency() {
	var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	var settings = arguments[1];
	return settings.currency_format.replace(amountPattern, formatNumber(number, settings));
};

var getThumbnailUrl = exports.getThumbnailUrl = function getThumbnailUrl(originalUrl, width) {
	if (originalUrl && originalUrl.length > 0) {
		var pos = originalUrl.lastIndexOf('/');
		var thumbnailUrl = originalUrl.substring(0, pos) + '/' + width + '/' + originalUrl.substring(pos + 1);
		return thumbnailUrl;
	}
	return '';
};

var getParentIds = exports.getParentIds = function getParentIds(categories, id) {
	var categoryId = id;
	var parentIds = [];
	var parentExists = false;

	do {
		var category = categories.find(function (item) {
			return item.id === categoryId;
		});
		parentExists = category && category.parent_id;
		if (parentExists) {
			parentIds.push(category.parent_id);
			categoryId = category.parent_id;
		}
	} while (parentExists);

	return parentIds;
};

var getProductBreadcrumbs = exports.getProductBreadcrumbs = function getProductBreadcrumbs(product, categories) {
	if (product && product.category_id) {
		var ids = [product.category_id];
		var parentIds = getParentIds(categories, product.category_id);
		ids.push.apply(ids, (0, _toConsumableArray3.default)(parentIds));

		var index = 0;
		var breadcrumbs = ids.reverse().map(function (categoryId) {
			var category = categories.find(function (item) {
				return item.id === categoryId;
			});
			if (category) {
				index += 1;
				return _react2.default.createElement(
					'li',
					{ key: index },
					_react2.default.createElement(
						_reactRouterDom.NavLink,
						{ to: category.path },
						category.name
					)
				);
			}
			return null;
		}).filter(function (item) {
			return !!item;
		});

		return breadcrumbs;
	}
	return null;
};

var getCategoryBreadcrumbs = exports.getCategoryBreadcrumbs = function getCategoryBreadcrumbs(currentCategoryId, categories) {
	if (currentCategoryId) {
		var ids = getParentIds(categories, currentCategoryId);

		var index = 0;
		var breadcrumbs = ids.reverse().map(function (categoryId) {
			var category = categories.find(function (item) {
				return item.id === categoryId;
			});
			if (category) {
				index += 1;
				return _react2.default.createElement(
					'li',
					{ key: index },
					_react2.default.createElement(
						_reactRouterDom.NavLink,
						{ to: category.path },
						category.name
					)
				);
			}
			return null;
		}).filter(function (item) {
			return !!item;
		});

		return breadcrumbs;
	}
	return null;
};

var getShippingMethodFromOrder = exports.getShippingMethodFromOrder = function getShippingMethodFromOrder(order, shippingMethods) {
	if (order && order.shipping_method_id && shippingMethods && shippingMethods.length > 0) {
		return shippingMethods.find(function (method) {
			return method.id === order.shipping_method_id;
		});
	}
	return null;
};

var getFieldLabelByKey = exports.getFieldLabelByKey = function getFieldLabelByKey(key) {
	switch (key) {
		case 'full_name':
			return _settings.text.fullName;
		case 'address1':
			return _settings.text.address1;
		case 'address2':
			return _settings.text.address2;
		case 'postal_code':
			return _settings.text.postal_code;
		case 'phone':
			return _settings.text.phone;
		case 'company':
			return _settings.text.company;
		case 'mobile':
			return _settings.text.mobile;
		case 'city':
			return _settings.text.city;
		case 'comments':
			return _settings.text.comments;
		default:
			return '';
	}
};

var getShippingFieldLabel = exports.getShippingFieldLabel = function getShippingFieldLabel(_ref) {
	var label = _ref.label,
	    key = _ref.key;
	return label && label.length > 0 ? label : getFieldLabelByKey(key);
};

var getCheckoutFieldLabel = exports.getCheckoutFieldLabel = function getCheckoutFieldLabel(_ref2) {
	var label = _ref2.label,
	    name = _ref2.name;
	return label && label.length > 0 ? label : getFieldLabelByKey(name);
};
//# sourceMappingURL=helper.js.map
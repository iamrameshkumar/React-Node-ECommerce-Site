'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _helper = require('../lib/helper');

var helper = _interopRequireWildcard(_helper);

var _metaTags = require('../components/metaTags');

var _metaTags2 = _interopRequireDefault(_metaTags);

var _checkoutSuccess = require('../components/checkoutSuccess');

var _checkoutSuccess2 = _interopRequireDefault(_checkoutSuccess);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckoutSuccessContainer = function CheckoutSuccessContainer(props) {
	var _props$state = props.state,
	    pageDetails = _props$state.pageDetails,
	    order = _props$state.order,
	    settings = _props$state.settings,
	    shippingMethods = _props$state.shippingMethods,
	    checkoutFields = _props$state.checkoutFields;

	var shippingMethod = helper.getShippingMethodFromOrder(order, shippingMethods);

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
		_react2.default.createElement(
			'section',
			{ className: 'section section-checkout' },
			_react2.default.createElement(
				'div',
				{ className: 'container' },
				_react2.default.createElement(
					'div',
					{ className: 'columns content' },
					_react2.default.createElement(
						'div',
						{ className: 'column is-8 is-offset-2' },
						_react2.default.createElement(
							'div',
							{ className: 'checkout-box' },
							_react2.default.createElement(_checkoutSuccess2.default, {
								order: order,
								settings: settings,
								pageDetails: pageDetails,
								shippingMethod: shippingMethod,
								checkoutFields: checkoutFields
							})
						)
					)
				)
			)
		)
	);
};

CheckoutSuccessContainer.propTypes = {
	state: _propTypes2.default.shape({
		settings: _propTypes2.default.shape({}),
		pageDetails: _propTypes2.default.shape({}),
		order: _propTypes2.default.shape({}),
		shippingMethods: _propTypes2.default.arrayOf(_propTypes2.default.shape({})),
		checkoutFields: _propTypes2.default.arrayOf(_propTypes2.default.shape({}))
	}).isRequired
};

exports.default = CheckoutSuccessContainer;
//# sourceMappingURL=checkoutSuccess.js.map
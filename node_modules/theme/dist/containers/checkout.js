'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _metaTags = require('../components/metaTags');

var _metaTags2 = _interopRequireDefault(_metaTags);

var _orderSummary = require('../components/orderSummary');

var _orderSummary2 = _interopRequireDefault(_orderSummary);

var _checkoutForm = require('../components/checkoutForm');

var _checkoutForm2 = _interopRequireDefault(_checkoutForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckoutContainer = function CheckoutContainer(props) {
	var pageDetails = props.state.pageDetails;


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
					{ className: 'columns columns-checkout' },
					_react2.default.createElement(
						'div',
						{ className: 'column is-5-widescreen is-offset-1-widescreen is-6-desktop' },
						_react2.default.createElement(_orderSummary2.default, props)
					),
					_react2.default.createElement(
						'div',
						{ className: 'column is-6-widescreen is-6-desktop' },
						_react2.default.createElement(_checkoutForm2.default, props)
					)
				)
			)
		)
	);
};

CheckoutContainer.propTypes = {
	state: _propTypes2.default.shape({
		pageDetails: _propTypes2.default.shape({})
	}).isRequired
};

exports.default = CheckoutContainer;
//# sourceMappingURL=checkout.js.map
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

var _reduxForm = require('redux-form');

var _settings = require('../../lib/settings');

var _inputField = require('./inputField');

var _inputField2 = _interopRequireDefault(_inputField);

var _textareaField = require('./textareaField');

var _textareaField2 = _interopRequireDefault(_textareaField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateRequired = function validateRequired(value) {
	return value && value.length > 0 ? undefined : _settings.text.required;
};

var getFieldLabelByKey = function getFieldLabelByKey(key) {
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
		default:
			return '';
	}
};

var getFieldLabel = function getFieldLabel(field) {
	var label = field.label && field.label.length > 0 ? field.label : getFieldLabelByKey(field.key);
	return field.required === true ? label : label + ' (' + _settings.text.optional + ')';
};

var CheckoutStepShipping = function (_React$Component) {
	(0, _inherits3.default)(CheckoutStepShipping, _React$Component);

	function CheckoutStepShipping(props) {
		(0, _classCallCheck3.default)(this, CheckoutStepShipping);

		var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

		_this.onChangeBillingAsShipping = function (event) {
			_this.setState({
				billingAsShipping: event.target.checked
			});
		};

		_this.state = {
			billingAsShipping: true
		};
		return _this;
	}

	CheckoutStepShipping.prototype.render = function render() {
		var _props = this.props,
		    handleSubmit = _props.handleSubmit,
		    pristine = _props.pristine,
		    invalid = _props.invalid,
		    valid = _props.valid,
		    reset = _props.reset,
		    submitting = _props.submitting,
		    processingCheckout = _props.processingCheckout,
		    initialValues = _props.initialValues,
		    shippingMethod = _props.shippingMethod,
		    checkoutFields = _props.checkoutFields,
		    settings = _props.settings,
		    inputClassName = _props.inputClassName,
		    buttonClassName = _props.buttonClassName,
		    editButtonClassName = _props.editButtonClassName,
		    title = _props.title,
		    show = _props.show,
		    isReadOnly = _props.isReadOnly,
		    showPaymentForm = _props.showPaymentForm,
		    onEdit = _props.onEdit;


		var hideBillingAddress = settings.hide_billing_address === true;
		var commentsField = checkoutFields.find(function (f) {
			return f.name === 'comments';
		});
		var commentsFieldPlaceholder = commentsField && commentsField.placeholder && commentsField.placeholder.length > 0 ? commentsField.placeholder : '';
		var commentsFieldLabel = commentsField && commentsField.label && commentsField.label.length > 0 ? commentsField.label : _settings.text.comments;
		var commentsFieldStatus = commentsField && commentsField.status.length > 0 ? commentsField.status : null;
		var commentsValidate = commentsFieldStatus === 'required' ? validateRequired : null;
		var hideCommentsField = commentsFieldStatus === 'hidden';

		if (!show) {
			return _react2.default.createElement(
				'div',
				{ className: 'checkout-step' },
				_react2.default.createElement(
					'h1',
					null,
					_react2.default.createElement(
						'span',
						null,
						'2'
					),
					title
				)
			);
		} else if (isReadOnly) {
			var shippingFields = null;
			if (shippingMethod && shippingMethod.fields && shippingMethod.fields.length > 0) {
				shippingFields = shippingMethod.fields.map(function (field, index) {
					var fieldLabel = getFieldLabel(field);
					var fieldValue = initialValues.shipping_address[field.key];

					return _react2.default.createElement(
						'div',
						{ key: index, className: 'checkout-field-preview' },
						_react2.default.createElement(
							'div',
							{ className: 'name' },
							fieldLabel
						),
						_react2.default.createElement(
							'div',
							{ className: 'value' },
							fieldValue
						)
					);
				});
			}

			return _react2.default.createElement(
				'div',
				{ className: 'checkout-step' },
				_react2.default.createElement(
					'h1',
					null,
					_react2.default.createElement(
						'span',
						null,
						'2'
					),
					title
				),
				shippingFields,
				!hideCommentsField && initialValues.comments !== '' && _react2.default.createElement(
					'div',
					{ className: 'checkout-field-preview' },
					_react2.default.createElement(
						'div',
						{ className: 'name' },
						commentsFieldLabel
					),
					_react2.default.createElement(
						'div',
						{ className: 'value' },
						initialValues.comments
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'checkout-button-wrap' },
					_react2.default.createElement(
						'button',
						{
							type: 'button',
							onClick: onEdit,
							className: editButtonClassName
						},
						_settings.text.edit
					)
				)
			);
		} else {
			var _shippingFields = null;
			if (shippingMethod && shippingMethod.fields && shippingMethod.fields.length > 0) {
				_shippingFields = shippingMethod.fields.map(function (field, index) {
					var fieldLabel = getFieldLabel(field);
					var fieldId = 'shipping_address.' + field.key;
					var fieldClassName = inputClassName + ' shipping-' + field.key;
					var validate = field.required === true ? validateRequired : null;

					return _react2.default.createElement(_reduxForm.Field, {
						key: index,
						className: fieldClassName,
						name: fieldId,
						id: fieldId,
						component: _inputField2.default,
						type: 'text',
						label: fieldLabel,
						validate: validate
					});
				});
			}

			return _react2.default.createElement(
				'div',
				{ className: 'checkout-step' },
				_react2.default.createElement(
					'h1',
					null,
					_react2.default.createElement(
						'span',
						null,
						'2'
					),
					title
				),
				_react2.default.createElement(
					'form',
					{ onSubmit: handleSubmit },
					_shippingFields,
					!hideCommentsField && _react2.default.createElement(_reduxForm.Field, {
						className: inputClassName + ' shipping-comments',
						name: 'comments',
						id: 'customer.comments',
						component: _textareaField2.default,
						type: 'text',
						label: commentsFieldLabel,
						placeholder: commentsFieldPlaceholder,
						validate: commentsValidate,
						rows: '3'
					}),
					!hideBillingAddress && _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'h2',
							null,
							_settings.text.billingAddress
						),
						_react2.default.createElement(
							'div',
							{ className: 'billing-as-shipping' },
							_react2.default.createElement('input', {
								id: 'billingAsShipping',
								type: 'checkbox',
								onChange: this.onChangeBillingAsShipping,
								checked: this.state.billingAsShipping
							}),
							_react2.default.createElement(
								'label',
								{ htmlFor: 'billingAsShipping' },
								_settings.text.sameAsShipping
							)
						),
						!this.state.billingAsShipping && _react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(_reduxForm.Field, {
								className: inputClassName + ' billing-fullname',
								name: 'billing_address.full_name',
								id: 'billing_address.full_name',
								component: _inputField2.default,
								type: 'text',
								label: _settings.text.fullName,
								validate: [validateRequired]
							}),
							_react2.default.createElement(_reduxForm.Field, {
								className: inputClassName + ' billing-address1',
								name: 'billing_address.address1',
								id: 'billing_address.address1',
								component: _inputField2.default,
								type: 'text',
								label: _settings.text.address1,
								validate: [validateRequired]
							}),
							_react2.default.createElement(_reduxForm.Field, {
								className: inputClassName + ' billing-address2',
								name: 'billing_address.address2',
								id: 'billing_address.address2',
								component: _inputField2.default,
								type: 'text',
								label: _settings.text.address2 + (' (' + _settings.text.optional + ')')
							}),
							_react2.default.createElement(_reduxForm.Field, {
								className: inputClassName + ' billing-postalcode',
								name: 'billing_address.postal_code',
								id: 'billing_address.postal_code',
								component: _inputField2.default,
								type: 'text',
								label: _settings.text.postal_code + (' (' + _settings.text.optional + ')')
							}),
							_react2.default.createElement(_reduxForm.Field, {
								className: inputClassName + ' billing-phone',
								name: 'billing_address.phone',
								id: 'billing_address.phone',
								component: _inputField2.default,
								type: 'text',
								label: _settings.text.phone + (' (' + _settings.text.optional + ')')
							}),
							_react2.default.createElement(_reduxForm.Field, {
								className: inputClassName + ' billing-company',
								name: 'billing_address.company',
								id: 'billing_address.company',
								component: _inputField2.default,
								type: 'text',
								label: _settings.text.company + (' (' + _settings.text.optional + ')')
							})
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'checkout-button-wrap' },
						_react2.default.createElement(
							'button',
							{
								type: 'submit',
								disabled: submitting || processingCheckout || invalid,
								className: '' + buttonClassName + (processingCheckout ? ' is-loading' : '')
							},
							showPaymentForm ? _settings.text.next : _settings.text.orderSubmit
						)
					)
				)
			);
		}
	};

	return CheckoutStepShipping;
}(_react2.default.Component);

exports.default = (0, _reduxForm.reduxForm)({
	form: 'CheckoutStepShipping',
	enableReinitialize: true,
	keepDirtyOnReinitialize: false
})(CheckoutStepShipping);
//# sourceMappingURL=stepShipping.js.map
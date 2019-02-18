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

var _helper = require('../../lib/helper');

var _inputField = require('./inputField');

var _inputField2 = _interopRequireDefault(_inputField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateRequired = function validateRequired(value) {
	return value && value.length > 0 ? undefined : _settings.text.required;
};

var validateEmail = function validateEmail(value) {
	return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? _settings.text.emailInvalid : undefined;
};

var ReadOnlyField = function ReadOnlyField(_ref) {
	var name = _ref.name,
	    value = _ref.value;

	return _react2.default.createElement(
		'div',
		{ className: 'checkout-field-preview' },
		_react2.default.createElement(
			'div',
			{ className: 'name' },
			name
		),
		_react2.default.createElement(
			'div',
			{ className: 'value' },
			value
		)
	);
};

var CheckoutStepContacts = function (_React$Component) {
	(0, _inherits3.default)(CheckoutStepContacts, _React$Component);

	function CheckoutStepContacts(props) {
		(0, _classCallCheck3.default)(this, CheckoutStepContacts);

		var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

		_this.getField = function (fieldName) {
			var fields = _this.props.checkoutFields || [];
			var field = fields.find(function (item) {
				return item.name === fieldName;
			});
			return field;
		};

		_this.getFieldStatus = function (fieldName) {
			var field = _this.getField(fieldName);
			return field && field.status ? field.status : 'required';
		};

		_this.isFieldOptional = function (fieldName) {
			return _this.getFieldStatus(fieldName) === 'optional';
		};

		_this.isFieldHidden = function (fieldName) {
			return _this.getFieldStatus(fieldName) === 'hidden';
		};

		_this.getFieldValidators = function (fieldName) {
			var isOptional = _this.isFieldOptional(fieldName);
			var validatorsArray = [];
			if (!isOptional) {
				validatorsArray.push(validateRequired);
			}
			if (fieldName === 'email') {
				validatorsArray.push(validateEmail);
			}

			return validatorsArray;
		};

		_this.getFieldPlaceholder = function (fieldName) {
			var field = _this.getField(fieldName);
			return field && field.placeholder && field.placeholder.length > 0 ? field.placeholder : '';
		};

		_this.getFieldLabelText = function (fieldName) {
			var field = _this.getField(fieldName);
			if (field && field.label && field.label.length > 0) {
				return field.label;
			} else {
				switch (fieldName) {
					case 'email':
						return _settings.text.email;
						break;
					case 'mobile':
						return _settings.text.mobile;
						break;
					case 'country':
						return _settings.text.country;
						break;
					case 'state':
						return _settings.text.state;
						break;
					case 'city':
						return _settings.text.city;
						break;
					default:
						return 'Unnamed field';
				}
			}
		};

		_this.getFieldLabel = function (fieldName) {
			var labelText = _this.getFieldLabelText(fieldName);
			return _this.isFieldOptional(fieldName) ? labelText + ' (' + _settings.text.optional + ')' : labelText;
		};

		return _this;
	}

	CheckoutStepContacts.prototype.render = function render() {
		var _props = this.props,
		    handleSubmit = _props.handleSubmit,
		    pristine = _props.pristine,
		    invalid = _props.invalid,
		    valid = _props.valid,
		    reset = _props.reset,
		    submitting = _props.submitting,
		    loadingShippingMethods = _props.loadingShippingMethods,
		    loadingPaymentMethods = _props.loadingPaymentMethods,
		    initialValues = _props.initialValues,
		    settings = _props.settings,
		    saveShippingLocation = _props.saveShippingLocation,
		    saveShippingMethod = _props.saveShippingMethod,
		    savePaymentMethod = _props.savePaymentMethod,
		    paymentMethods = _props.paymentMethods,
		    shippingMethods = _props.shippingMethods,
		    inputClassName = _props.inputClassName,
		    buttonClassName = _props.buttonClassName,
		    editButtonClassName = _props.editButtonClassName,
		    onEdit = _props.onEdit,
		    isReadOnly = _props.isReadOnly,
		    title = _props.title;


		if (isReadOnly) {
			return _react2.default.createElement(
				'div',
				{ className: 'checkout-step' },
				_react2.default.createElement(
					'h1',
					null,
					_react2.default.createElement(
						'span',
						null,
						'1'
					),
					title
				),
				!this.isFieldHidden('email') && _react2.default.createElement(ReadOnlyField, { name: _settings.text.email, value: initialValues.email }),
				!this.isFieldHidden('mobile') && _react2.default.createElement(ReadOnlyField, { name: _settings.text.mobile, value: initialValues.mobile }),
				!this.isFieldHidden('country') && _react2.default.createElement(ReadOnlyField, {
					name: _settings.text.country,
					value: initialValues.shipping_address.country
				}),
				!this.isFieldHidden('state') && _react2.default.createElement(ReadOnlyField, {
					name: _settings.text.state,
					value: initialValues.shipping_address.state
				}),
				!this.isFieldHidden('city') && _react2.default.createElement(ReadOnlyField, {
					name: _settings.text.city,
					value: initialValues.shipping_address.city
				}),
				_react2.default.createElement(ReadOnlyField, {
					name: _settings.text.shippingMethod,
					value: initialValues.shipping_method
				}),
				_react2.default.createElement(ReadOnlyField, {
					name: _settings.text.paymentMethod,
					value: initialValues.payment_method
				}),
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
			return _react2.default.createElement(
				'div',
				{ className: 'checkout-step' },
				_react2.default.createElement(
					'h1',
					null,
					_react2.default.createElement(
						'span',
						null,
						'1'
					),
					title
				),
				_react2.default.createElement(
					'form',
					{ onSubmit: handleSubmit },
					!this.isFieldHidden('email') && _react2.default.createElement(_reduxForm.Field, {
						className: inputClassName,
						name: 'email',
						id: 'customer.email',
						component: _inputField2.default,
						type: 'email',
						label: this.getFieldLabel('email'),
						validate: this.getFieldValidators('email'),
						placeholder: this.getFieldPlaceholder('email')
					}),
					!this.isFieldHidden('mobile') && _react2.default.createElement(_reduxForm.Field, {
						className: inputClassName,
						name: 'mobile',
						id: 'customer.mobile',
						component: _inputField2.default,
						type: 'tel',
						label: this.getFieldLabel('mobile'),
						validate: this.getFieldValidators('mobile'),
						placeholder: this.getFieldPlaceholder('mobile')
					}),
					_react2.default.createElement(
						'h2',
						null,
						_settings.text.shippingTo
					),
					!this.isFieldHidden('country') && _react2.default.createElement(_reduxForm.Field, {
						className: inputClassName,
						name: 'shipping_address.country',
						id: 'shipping_address.country',
						component: _inputField2.default,
						type: 'text',
						label: this.getFieldLabel('country'),
						validate: this.getFieldValidators('country'),
						placeholder: this.getFieldPlaceholder('country'),
						onBlur: function onBlur(event, value) {
							return setTimeout(function () {
								return saveShippingLocation({ country: value });
							});
						}
					}),
					!this.isFieldHidden('state') && _react2.default.createElement(_reduxForm.Field, {
						className: inputClassName,
						name: 'shipping_address.state',
						id: 'shipping_address.state',
						component: _inputField2.default,
						type: 'text',
						label: this.getFieldLabel('state'),
						validate: this.getFieldValidators('state'),
						placeholder: this.getFieldPlaceholder('state'),
						onBlur: function onBlur(event, value) {
							return setTimeout(function () {
								return saveShippingLocation({ state: value });
							});
						}
					}),
					!this.isFieldHidden('city') && _react2.default.createElement(_reduxForm.Field, {
						className: inputClassName,
						name: 'shipping_address.city',
						id: 'shipping_address.city',
						component: _inputField2.default,
						type: 'text',
						label: this.getFieldLabel('city'),
						validate: this.getFieldValidators('city'),
						placeholder: this.getFieldPlaceholder('city'),
						onBlur: function onBlur(event, value) {
							return setTimeout(function () {
								return saveShippingLocation({ city: value });
							});
						}
					}),
					_react2.default.createElement(
						'h2',
						null,
						_settings.text.shippingMethods,
						' ',
						loadingShippingMethods && _react2.default.createElement(
							'small',
							null,
							_settings.text.loading
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'shipping-methods' },
						shippingMethods.map(function (method, index) {
							return _react2.default.createElement(
								'label',
								{
									key: index,
									className: 'shipping-method' + (method.id === initialValues.shipping_method_id ? ' active' : '')
								},
								_react2.default.createElement(_reduxForm.Field, {
									name: 'shipping_method_id',
									component: 'input',
									type: 'radio',
									value: method.id,
									onClick: function onClick() {
										return saveShippingMethod(method.id);
									}
								}),
								_react2.default.createElement(
									'div',
									null,
									_react2.default.createElement(
										'div',
										{ className: 'shipping-method-name' },
										method.name
									),
									_react2.default.createElement(
										'div',
										{ className: 'shipping-method-description' },
										method.description
									)
								),
								_react2.default.createElement(
									'span',
									{ className: 'shipping-method-rate' },
									(0, _helper.formatCurrency)(method.price, settings)
								)
							);
						})
					),
					_react2.default.createElement(
						'h2',
						null,
						_settings.text.paymentMethods,
						' ',
						loadingPaymentMethods && _react2.default.createElement(
							'small',
							null,
							_settings.text.loading
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'payment-methods' },
						paymentMethods.map(function (method, index) {
							return _react2.default.createElement(
								'label',
								{
									key: index,
									className: 'payment-method' + (method.id === initialValues.payment_method_id ? ' active' : '')
								},
								_react2.default.createElement(_reduxForm.Field, {
									name: 'payment_method_id',
									validate: [validateRequired],
									component: 'input',
									type: 'radio',
									value: method.id,
									onClick: function onClick() {
										return savePaymentMethod(method.id);
									}
								}),
								_react2.default.createElement(
									'div',
									null,
									_react2.default.createElement(
										'div',
										{ className: 'payment-method-name' },
										method.name
									),
									_react2.default.createElement(
										'div',
										{ className: 'payment-method-description' },
										method.description
									)
								),
								_react2.default.createElement('span', { className: 'payment-method-logo' })
							);
						})
					),
					_react2.default.createElement(
						'div',
						{ className: 'checkout-button-wrap' },
						_react2.default.createElement(
							'button',
							{
								type: 'submit',
								disabled: invalid,
								className: buttonClassName
							},
							_settings.text.next
						)
					)
				)
			);
		}
	};

	return CheckoutStepContacts;
}(_react2.default.Component);

exports.default = (0, _reduxForm.reduxForm)({
	form: 'CheckoutStepContacts',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(CheckoutStepContacts);
//# sourceMappingURL=stepContacts.js.map
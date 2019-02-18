'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextareaField = function TextareaField(field) {
	return _react2.default.createElement(
		'div',
		{ className: field.className },
		_react2.default.createElement(
			'label',
			{ htmlFor: field.id },
			field.label,
			field.meta.touched && field.meta.error && _react2.default.createElement(
				'span',
				{ className: 'error' },
				field.meta.error
			)
		),
		_react2.default.createElement('textarea', (0, _extends3.default)({}, field.input, {
			placeholder: field.placeholder,
			rows: field.rows,
			id: field.id,
			className: field.meta.touched && field.meta.error ? 'invalid' : ''
		}))
	);
};

exports.default = TextareaField;
//# sourceMappingURL=textareaField.js.map
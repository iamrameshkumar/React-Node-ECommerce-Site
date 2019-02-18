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

var _reactRouterDom = require('react-router-dom');

var _settings = require('../../lib/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AttributeValue = function (_React$Component) {
	(0, _inherits3.default)(AttributeValue, _React$Component);

	function AttributeValue(props) {
		(0, _classCallCheck3.default)(this, AttributeValue);

		var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

		_this.onChange = function (event) {
			var _this$props = _this.props,
			    attributeName = _this$props.attributeName,
			    valueName = _this$props.valueName,
			    setFilterAttribute = _this$props.setFilterAttribute,
			    unsetFilterAttribute = _this$props.unsetFilterAttribute;

			var checked = event.target.checked;

			_this.setState({ checked: checked });

			if (checked) {
				setFilterAttribute(attributeName, valueName);
			} else {
				unsetFilterAttribute(attributeName, valueName);
			}
		};

		_this.state = {
			checked: props.checked
		};
		return _this;
	}

	AttributeValue.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		if (nextProps.checked !== this.props.checked) {
			this.setState({ checked: nextProps.checked });
		}
	};

	AttributeValue.prototype.render = function render() {
		var _props = this.props,
		    valueName = _props.valueName,
		    count = _props.count;

		var isDisabled = count === 0;
		var classChecked = this.state.checked ? 'attribute-checked' : '';
		var classDisabled = isDisabled ? 'attribute-disabled' : '';

		return _react2.default.createElement(
			'label',
			{ className: classChecked + ' ' + classDisabled },
			_react2.default.createElement('input', {
				type: 'checkbox',
				disabled: isDisabled,
				onChange: this.onChange,
				checked: this.state.checked
			}),
			valueName
		);
	};

	return AttributeValue;
}(_react2.default.Component);

var AttributeSet = function AttributeSet(_ref) {
	var attribute = _ref.attribute,
	    setFilterAttribute = _ref.setFilterAttribute,
	    unsetFilterAttribute = _ref.unsetFilterAttribute;

	var values = attribute.values.map(function (value, index) {
		return _react2.default.createElement(AttributeValue, {
			key: index,
			attributeName: attribute.name,
			valueName: value.name,
			checked: value.checked,
			count: value.count,
			setFilterAttribute: setFilterAttribute,
			unsetFilterAttribute: unsetFilterAttribute
		});
	});

	return _react2.default.createElement(
		'div',
		{ className: 'attribute' },
		_react2.default.createElement(
			'div',
			{ className: 'attribute-title' },
			attribute.name
		),
		values
	);
};

var AttributeFilter = function AttributeFilter(_ref2) {
	var attributes = _ref2.attributes,
	    setFilterAttribute = _ref2.setFilterAttribute,
	    unsetFilterAttribute = _ref2.unsetFilterAttribute;

	var attributeSets = attributes.map(function (attribute, index) {
		return _react2.default.createElement(AttributeSet, {
			key: index,
			attribute: attribute,
			setFilterAttribute: setFilterAttribute,
			unsetFilterAttribute: unsetFilterAttribute
		});
	});

	return _react2.default.createElement(
		'div',
		{ className: 'attribute-filter' },
		attributeSets
	);
};

exports.default = AttributeFilter;
//# sourceMappingURL=attributeFilter.js.map
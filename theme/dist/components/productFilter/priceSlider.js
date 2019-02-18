'use strict';

exports.__esModule = true;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _rcSlider = require('rc-slider');

var _settings = require('../../lib/settings');

var _helper = require('../../lib/helper');

var helper = _interopRequireWildcard(_helper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PriceSlider = function (_React$Component) {
	(0, _inherits3.default)(PriceSlider, _React$Component);

	function PriceSlider(props) {
		(0, _classCallCheck3.default)(this, PriceSlider);

		var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

		_this.setValues = function (values) {
			if (Array.isArray(values) && values.length === 2) {
				_this.setState({
					minValue: values[0],
					maxValue: values[1]
				});
			}
		};

		_this.state = {
			minValue: props.minValue > 0 ? props.minValue : props.minPrice,
			maxValue: props.maxValue > 0 ? props.maxValue : props.maxPrice
		};
		return _this;
	}

	PriceSlider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		if (nextProps.minPrice !== this.props.minPrice || nextProps.maxPrice !== this.props.maxPrice) {
			this.setState({
				minValue: nextProps.minPrice,
				maxValue: nextProps.maxPrice
			});
		}
	};

	PriceSlider.prototype.render = function render() {
		var _props = this.props,
		    minPrice = _props.minPrice,
		    maxPrice = _props.maxPrice,
		    setPriceFromAndTo = _props.setPriceFromAndTo,
		    settings = _props.settings;


		return _react2.default.createElement(
			'div',
			{ className: 'price-filter' },
			_react2.default.createElement(
				'div',
				{ className: 'attribute-title' },
				_settings.text.price
			),
			_react2.default.createElement(_rcSlider.Range, {
				min: minPrice,
				max: maxPrice,
				value: [this.state.minValue, this.state.maxValue],
				disabled: maxPrice === 0,
				className: 'price-filter-range',
				onAfterChange: function onAfterChange(values) {
					setPriceFromAndTo.apply(undefined, (0, _toConsumableArray3.default)(values));
				},
				onChange: this.setValues
			}),
			_react2.default.createElement(
				'div',
				{ className: 'columns is-mobile is-gapless price-filter-values' },
				_react2.default.createElement(
					'div',
					{ className: 'column has-text-left' },
					helper.formatCurrency(this.state.minValue, settings)
				),
				_react2.default.createElement(
					'div',
					{ className: 'column has-text-right' },
					helper.formatCurrency(this.state.maxValue, settings)
				)
			)
		);
	};

	return PriceSlider;
}(_react2.default.Component);

exports.default = PriceSlider;
//# sourceMappingURL=priceSlider.js.map
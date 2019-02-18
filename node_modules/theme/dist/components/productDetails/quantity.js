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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Quantity = function (_React$PureComponent) {
	(0, _inherits3.default)(Quantity, _React$PureComponent);

	function Quantity(props) {
		(0, _classCallCheck3.default)(this, Quantity);

		var _this = (0, _possibleConstructorReturn3.default)(this, _React$PureComponent.call(this, props));

		_this.handleChange = function (event) {
			_this.setQuantity(event.target.value);
		};

		_this.setQuantity = function (quantity) {
			var intQuantity = parseInt(quantity);
			if (intQuantity > 0 && intQuantity <= _this.props.maxQuantity) {
				_this.setState({ quantity: intQuantity });
				_this.props.onChange(intQuantity);
			}
		};

		_this.increment = function () {
			var newQuantity = _this.state.quantity + 1;
			_this.setQuantity(newQuantity);
		};

		_this.decrement = function () {
			var newQuantity = _this.state.quantity - 1;
			_this.setQuantity(newQuantity);
		};

		_this.state = {
			quantity: 1
		};
		return _this;
	}

	Quantity.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		if (this.state.quantity > nextProps.maxQuantity) {
			this.setQuantity(nextProps.maxQuantity);
		}
	};

	Quantity.prototype.render = function render() {
		var maxQuantity = this.props.maxQuantity;
		var quantity = this.state.quantity;

		var disabled = maxQuantity === 0;
		var value = disabled ? 0 : quantity;

		return _react2.default.createElement(
			_react.Fragment,
			null,
			_react2.default.createElement(
				'div',
				null,
				_settings.text.qty
			),
			_react2.default.createElement(
				'div',
				{ className: 'product-quantity' },
				_react2.default.createElement('a', { className: 'decrement', onClick: this.decrement }),
				_react2.default.createElement('input', {
					value: value,
					onChange: this.handleChange,
					maxLength: '3',
					type: 'number',
					pattern: '\\d*',
					disabled: disabled
				}),
				_react2.default.createElement('a', { className: 'increment', onClick: this.increment })
			)
		);
	};

	return Quantity;
}(_react2.default.PureComponent);

exports.default = Quantity;
//# sourceMappingURL=quantity.js.map
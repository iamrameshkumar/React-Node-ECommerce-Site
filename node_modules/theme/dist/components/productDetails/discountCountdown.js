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

var DiscountCountdown = function (_React$Component) {
	(0, _inherits3.default)(DiscountCountdown, _React$Component);

	function DiscountCountdown(props) {
		(0, _classCallCheck3.default)(this, DiscountCountdown);

		var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

		_this.tick = function () {
			var dateNow = new Date();
			var dateTo = new Date(_this.props.product.date_sale_to);
			var diff = Math.abs(Math.floor((dateTo.getTime() - dateNow.getTime()) / 1000));

			_this.setState({
				diff: diff
			});
		};

		_this.pad = function (num) {
			return num < 10 ? '0' + num : num;
		};

		_this.state = {
			timer: null,
			diff: null
		};
		return _this;
	}

	DiscountCountdown.prototype.componentDidMount = function componentDidMount() {
		var timer = setInterval(this.tick, 1000);
		this.setState({
			timer: timer
		});
	};

	DiscountCountdown.prototype.componentWillUnmount = function componentWillUnmount() {
		clearInterval(this.state.timer);
	};

	DiscountCountdown.prototype.render = function render() {
		var product = this.props.product;
		var diff = this.state.diff;


		if (product) {
			var days = Math.floor(diff / (24 * 60 * 60));
			var leftSec = diff - days * 24 * 60 * 60;

			var hrs = Math.floor(leftSec / (60 * 60));
			leftSec = leftSec - hrs * 60 * 60;

			var min = Math.floor(leftSec / 60);
			leftSec = leftSec - min * 60;

			return _react2.default.createElement(
				'div',
				{ className: 'discount-countdown' },
				_react2.default.createElement(
					'div',
					{ className: 'discount-title' },
					_settings.text.saleEnds,
					':'
				),
				_react2.default.createElement(
					'div',
					{
						className: 'columns is-mobile has-text-centered discount-numbers is-gapless',
						style: { margin: '8px 0' }
					},
					_react2.default.createElement(
						'div',
						{ className: 'column is-2' },
						this.pad(days)
					),
					_react2.default.createElement(
						'div',
						{ className: 'column is-1' },
						':'
					),
					_react2.default.createElement(
						'div',
						{ className: 'column is-2' },
						this.pad(hrs)
					),
					_react2.default.createElement(
						'div',
						{ className: 'column is-1' },
						':'
					),
					_react2.default.createElement(
						'div',
						{ className: 'column is-2' },
						this.pad(min)
					),
					_react2.default.createElement(
						'div',
						{ className: 'column is-1' },
						':'
					),
					_react2.default.createElement(
						'div',
						{ className: 'column is-2' },
						this.pad(leftSec)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'columns is-mobile has-text-centered discount-labels is-gapless' },
					_react2.default.createElement(
						'div',
						{ className: 'column is-2' },
						_settings.text.days
					),
					_react2.default.createElement('div', { className: 'column is-1' }),
					_react2.default.createElement(
						'div',
						{ className: 'column is-2' },
						_settings.text.hours
					),
					_react2.default.createElement('div', { className: 'column is-1' }),
					_react2.default.createElement(
						'div',
						{ className: 'column is-2' },
						_settings.text.minutes
					),
					_react2.default.createElement('div', { className: 'column is-1' }),
					_react2.default.createElement(
						'div',
						{ className: 'column is-2' },
						_settings.text.seconds
					)
				)
			);
		} else {
			return null;
		}
	};

	return DiscountCountdown;
}(_react2.default.Component);

exports.default = DiscountCountdown;
//# sourceMappingURL=discountCountdown.js.map
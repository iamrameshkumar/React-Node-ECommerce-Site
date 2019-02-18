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

var SearchBox = function (_React$Component) {
	(0, _inherits3.default)(SearchBox, _React$Component);

	function SearchBox(props) {
		(0, _classCallCheck3.default)(this, SearchBox);

		var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

		_this.handleChange = function (event) {
			_this.setState({ value: event.target.value });
		};

		_this.handleKeyPress = function (e) {
			if (e.keyCode === 13 || e.which === 13) {
				_this.handleSearch();
			}
		};

		_this.handleKeyDown = function (e) {
			if (e.keyCode === 27) {
				_this.handleClear();
			}
		};

		_this.handleSearch = function () {
			_this.props.onSearch(_this.state.value);
		};

		_this.handleClear = function () {
			_this.setState({ value: '' });
			_this.props.onSearch('');
		};

		_this.handleFocus = function () {
			_this.setState({ hasFocus: true });
		};

		_this.handleBlur = function () {
			_this.setState({ hasFocus: false });
		};

		_this.state = {
			value: props.value,
			hasFocus: false
		};
		return _this;
	}

	SearchBox.prototype.render = function render() {
		var hasFocus = this.state.hasFocus;

		var placeholderText = _settings.themeSettings.search_placeholder && _settings.themeSettings.search_placeholder.length > 0 ? _settings.themeSettings.search_placeholder : _settings.text.searchPlaceholder;

		return _react2.default.createElement(
			'div',
			{
				className: 'search-box ' + this.props.className + (hasFocus ? ' has-focus' : '')
			},
			_react2.default.createElement('input', {
				className: 'search-input',
				type: 'text',
				placeholder: placeholderText,
				value: this.state.value,
				onChange: this.handleChange,
				onKeyPress: this.handleKeyPress,
				onKeyDown: this.handleKeyDown,
				onFocus: this.handleFocus,
				onBlur: this.handleBlur
			}),
			_react2.default.createElement('img', {
				className: 'search-icon-search',
				src: '/assets/images/search.svg',
				alt: _settings.text.search,
				title: _settings.text.search,
				onClick: this.handleSearch
			}),
			this.state.value && this.state.value !== '' && _react2.default.createElement('img', {
				className: 'search-icon-clear',
				src: '/assets/images/close.svg',
				onClick: this.handleClear
			})
		);
	};

	return SearchBox;
}(_react2.default.Component);

exports.default = SearchBox;
//# sourceMappingURL=searchBox.js.map
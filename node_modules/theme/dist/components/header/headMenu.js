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

var _settings = require('../../lib/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeadMenuItem = function (_React$Component) {
	(0, _inherits3.default)(HeadMenuItem, _React$Component);

	function HeadMenuItem(props) {
		(0, _classCallCheck3.default)(this, HeadMenuItem);

		var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

		_this.onMouseEnterHandler = function () {
			if (!_this.props.isMobile && _this.props.level === 1) {
				_this.setState({
					isActive: true
				});
			}
		};

		_this.onMouseLeaveHandler = function () {
			if (!_this.props.isMobile && _this.props.level === 1) {
				_this.setState({
					isActive: false
				});
			}
		};

		_this.isActiveToggle = function () {
			return _this.setState({
				isActive: !_this.state.isActive
			});
		};

		_this.state = {
			isActive: false
		};
		return _this;
	}

	HeadMenuItem.prototype.render = function render() {
		var _props = this.props,
		    categories = _props.categories,
		    category = _props.category,
		    onClick = _props.onClick,
		    level = _props.level,
		    isMobile = _props.isMobile;

		var items = categories.filter(function (item) {
			return item.parent_id === category.id;
		}).map(function (subcategory, index) {
			return _react2.default.createElement(HeadMenuItem, {
				key: index,
				category: subcategory,
				onClick: onClick,
				categories: categories,
				level: level + 1,
				isMobile: isMobile
			});
		});
		var hasItems = items.length > 0;

		return _react2.default.createElement(
			'li',
			{
				onMouseEnter: this.onMouseEnterHandler,
				onMouseLeave: this.onMouseLeaveHandler,
				onMouseUp: this.onMouseLeaveHandler,
				className: (level === 2 ? 'column is-3' : '') + (this.state.isActive ? ' is-active' : '') + (hasItems ? ' has-items' : '')
			},
			_react2.default.createElement(
				'div',
				{ className: 'cat-parent' },
				_react2.default.createElement(
					_reactRouterDom.NavLink,
					{
						activeClassName: 'is-active',
						className: hasItems ? 'has-items' : '',
						to: category.path,
						onClick: onClick
					},
					category.name
				),
				hasItems && isMobile && _react2.default.createElement('span', { onClick: this.isActiveToggle })
			),
			hasItems && _react2.default.createElement(
				'ul',
				{
					className: (level === 1 ? 'columns is-gapless is-multiline' : '') + ' nav-level-' + level
				},
				items
			)
		);
	};

	return HeadMenuItem;
}(_react2.default.Component);

var HeadMenu = function (_React$PureComponent) {
	(0, _inherits3.default)(HeadMenu, _React$PureComponent);

	function HeadMenu() {
		(0, _classCallCheck3.default)(this, HeadMenu);
		return (0, _possibleConstructorReturn3.default)(this, _React$PureComponent.apply(this, arguments));
	}

	HeadMenu.prototype.render = function render() {
		var _props2 = this.props,
		    categories = _props2.categories,
		    onClick = _props2.onClick,
		    isMobile = _props2.isMobile;

		var addItemsToMenu = [];
		if (_settings.themeSettings.header_menu && _settings.themeSettings.header_menu.length > 0) {
			addItemsToMenu = _settings.themeSettings.header_menu.map(function (item) {
				return {
					name: item.text,
					path: item.url,
					id: item.id || '',
					parent_id: item.parent_id || null
				};
			});
		}
		var menuItems = [].concat((0, _toConsumableArray3.default)(categories), (0, _toConsumableArray3.default)(addItemsToMenu));

		var items = menuItems.filter(function (category) {
			return category.parent_id === null;
		}).map(function (category, index) {
			return _react2.default.createElement(HeadMenuItem, {
				key: index,
				category: category,
				onClick: onClick,
				categories: categories,
				level: 1,
				isMobile: isMobile
			});
		});

		return _react2.default.createElement(
			'ul',
			{ className: 'nav-level-0' },
			items
		);
	};

	return HeadMenu;
}(_react2.default.PureComponent);

exports.default = HeadMenu;
//# sourceMappingURL=headMenu.js.map
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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _settings = require('../lib/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FooterMenu = function (_React$Component) {
	(0, _inherits3.default)(FooterMenu, _React$Component);

	function FooterMenu(props) {
		(0, _classCallCheck3.default)(this, FooterMenu);

		var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

		_this.isActiveToggle = function () {
			_this.setState({
				isActive: !_this.state.isActive
			});
		};

		_this.state = {
			isActive: false
		};
		return _this;
	}

	FooterMenu.prototype.render = function render() {
		var _props = this.props,
		    title = _props.title,
		    items = _props.items;

		var ulItems = null;

		if (items && items.length > 0) {
			ulItems = items.map(function (item, index) {
				return _react2.default.createElement(
					'li',
					{ key: index },
					_react2.default.createElement(
						_reactRouterDom.NavLink,
						{ to: item.url || '' },
						item.text
					)
				);
			});
		}

		return _react2.default.createElement(
			'div',
			{ className: 'column is-3' },
			_react2.default.createElement(
				'div',
				{
					className: 'footer-title mobile-padding' + (this.state.isActive ? ' footer-menu-open' : ''),
					onClick: this.isActiveToggle
				},
				title,
				_react2.default.createElement('span', null)
			),
			_react2.default.createElement(
				'ul',
				{ className: 'footer-menu' },
				ulItems
			)
		);
	};

	return FooterMenu;
}(_react2.default.Component);

var SocialIcons = function SocialIcons(_ref) {
	var icons = _ref.icons;

	if (icons && icons.length > 0) {
		var items = icons.map(function (icon, index) {
			return _react2.default.createElement('a', {
				key: index,
				href: icon.url || '',
				target: '_blank',
				rel: 'noopener',
				title: icon.type,
				className: icon.type
			});
		});
		return _react2.default.createElement(
			'p',
			{ className: 'social-icons' },
			items
		);
	} else {
		return null;
	}
};

var Contacts = function Contacts(_ref2) {
	var contacts = _ref2.contacts;

	if (contacts && contacts.length > 0) {
		var items = contacts.map(function (item, index) {
			var contact = item ? item.text : null;
			if (contact && contact.indexOf('@') > 0) {
				return _react2.default.createElement(
					'li',
					{ key: index },
					_react2.default.createElement(
						'a',
						{ href: 'mailto:' + contact },
						contact
					)
				);
			} else {
				return _react2.default.createElement(
					'li',
					{ key: index },
					contact
				);
			}
		});
		return _react2.default.createElement(
			'ul',
			{ className: 'footer-contacts' },
			items
		);
	} else {
		return null;
	}
};

var Footer = function (_React$PureComponent) {
	(0, _inherits3.default)(Footer, _React$PureComponent);

	function Footer() {
		(0, _classCallCheck3.default)(this, Footer);
		return (0, _possibleConstructorReturn3.default)(this, _React$PureComponent.apply(this, arguments));
	}

	Footer.prototype.render = function render() {
		var settings = this.props.settings;

		var footerLogoUrl = _settings.themeSettings.footer_logo_url && _settings.themeSettings.footer_logo_url.length > 0 ? '/assets/images/' + _settings.themeSettings.footer_logo_url : settings.logo;

		return _react2.default.createElement(
			'section',
			{ className: 'section section-footer' },
			_react2.default.createElement('hr', null),
			_react2.default.createElement(
				'footer',
				null,
				_react2.default.createElement(
					'div',
					{ className: 'container' },
					_react2.default.createElement(
						'div',
						{ className: 'content' },
						_react2.default.createElement(
							'div',
							{ className: 'columns is-gapless' },
							_react2.default.createElement(
								'div',
								{ className: 'column is-5' },
								_react2.default.createElement(
									'div',
									{ className: 'mobile-padding' },
									_react2.default.createElement(
										'div',
										{ className: 'footer-logo' },
										_react2.default.createElement('img', { src: footerLogoUrl, alt: 'logo' })
									),
									_react2.default.createElement(
										'p',
										null,
										_react2.default.createElement(
											'small',
											null,
											_settings.themeSettings.footer_about
										)
									),
									_react2.default.createElement(Contacts, { contacts: _settings.themeSettings.footer_contacts }),
									_react2.default.createElement(SocialIcons, { icons: _settings.themeSettings.footer_social })
								)
							),
							_react2.default.createElement('div', { className: 'column is-1 is-hidden-mobile' }),
							_react2.default.createElement(FooterMenu, {
								title: _settings.themeSettings.footer_menu_1_title,
								items: _settings.themeSettings.footer_menu_1_items
							}),
							_react2.default.createElement(FooterMenu, {
								title: _settings.themeSettings.footer_menu_2_title,
								items: _settings.themeSettings.footer_menu_2_items
							})
						)
					)
				)
			)
		);
	};

	return Footer;
}(_react2.default.PureComponent);

Footer.propTypes = {
	settings: _propTypes2.default.shape({}).isRequired
};
exports.default = Footer;
//# sourceMappingURL=footer.js.map
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

var _reactRouter = require('react-router');

var _reactRouterDom = require('react-router-dom');

var _reactRedux = require('react-redux');

var _reactScroll = require('react-scroll');

var _index = require('./containers/index');

var _index2 = _interopRequireDefault(_index);

var _shared = require('./containers/shared');

var _shared2 = _interopRequireDefault(_shared);

var _category = require('./containers/category');

var _category2 = _interopRequireDefault(_category);

var _product = require('./containers/product');

var _product2 = _interopRequireDefault(_product);

var _page = require('./containers/page');

var _page2 = _interopRequireDefault(_page);

var _checkout = require('./containers/checkout');

var _checkout2 = _interopRequireDefault(_checkout);

var _checkoutSuccess = require('./containers/checkoutSuccess');

var _checkoutSuccess2 = _interopRequireDefault(_checkoutSuccess);

var _notfound = require('./containers/notfound');

var _notfound2 = _interopRequireDefault(_notfound);

var _search = require('./containers/search');

var _search2 = _interopRequireDefault(_search);

var _loginForm = require('./containers/UserLogin/loginForm');

var _loginForm2 = _interopRequireDefault(_loginForm);

var _SignupForm = require('./containers/Signup/SignupForm');

var _SignupForm2 = _interopRequireDefault(_SignupForm);

var _actions = require('./actions');

var _pageTypes = require('./pageTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SwitchContainers = function (_React$Component) {
	(0, _inherits3.default)(SwitchContainers, _React$Component);

	function SwitchContainers(props) {
		(0, _classCallCheck3.default)(this, SwitchContainers);
		return (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));
	}

	SwitchContainers.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		this.props.setCurrentPage(nextProps.location);

		if (nextProps.location && this.props.location) {
			var pathnameChanged = nextProps.location.pathname !== this.props.location.pathname;
			var queryChanged = nextProps.location.search !== this.props.location.search;
			var isSearchPage = nextProps.location.pathname === '/search';

			if (pathnameChanged || queryChanged && isSearchPage) {
				_reactScroll.animateScroll.scrollToTop({
					duration: 500,
					delay: 100,
					smooth: true
				});
			}
		}
	};

	SwitchContainers.prototype.render = function render() {
		var _props = this.props,
		    history = _props.history,
		    location = _props.location,
		    currentPage = _props.currentPage;

		var locationPathname = location && location.pathname ? location.pathname : '/';

		switch (currentPage.type) {
			case _pageTypes.PRODUCT:
				return _react2.default.createElement(_product2.default, null);
			case _pageTypes.PRODUCT_CATEGORY:
				return _react2.default.createElement(_category2.default, null);
			case _pageTypes.SEARCH:
				return _react2.default.createElement(_search2.default, null);
			case _pageTypes.PAGE:
				if (locationPathname === '/login' || locationPathname === '/signin') {
					return _react2.default.createElement(_loginForm2.default, null);
				} else if (locationPathname === '/signup') {
					return _react2.default.createElement(_SignupForm2.default, null);
				} else if (locationPathname === '/') {
					return _react2.default.createElement(_index2.default, null);
				} else if (locationPathname === '/checkout') {
					return _react2.default.createElement(_checkout2.default, null);
				}
				if (locationPathname === '/checkout-success') {
					return _react2.default.createElement(_checkoutSuccess2.default, null);
				} else {
					return _react2.default.createElement(_page2.default, null);
				}
			default:
				return _react2.default.createElement(_notfound2.default, null);
		}
	};

	return SwitchContainers;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
	return {
		currentPage: state.app.currentPage
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
	return {
		setCurrentPage: function setCurrentPage(location) {
			dispatch((0, _actions.setCurrentPage)(location));
		}
	};
};

var SwitchContainersConnected = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SwitchContainers);

var App = function App() {
	return _react2.default.createElement(
		_shared2.default,
		null,
		_react2.default.createElement(_reactRouter.Route, { component: SwitchContainersConnected })
	);
};

exports.default = App;
//# sourceMappingURL=app.js.map
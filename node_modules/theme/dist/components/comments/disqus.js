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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DISQUS_CONFIG = ['shortname', 'identifier', 'title', 'url', 'category_id', 'onNewComment'];
var __disqusAdded = false;

function copyProps(context, props) {
	var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

	Object.keys(props).forEach(function (prop) {
		context[prefix + prop] = props[prop];
	});

	if (typeof props.onNewComment === 'function') {
		context[prefix + 'config'] = function config() {
			this.callbacks.onNewComment = [function handleNewComment(comment) {
				props.onNewComment(comment);
			}];
		};
	}
}

var Disqus = function (_React$PureComponent) {
	(0, _inherits3.default)(Disqus, _React$PureComponent);

	function Disqus(props) {
		(0, _classCallCheck3.default)(this, Disqus);
		return (0, _possibleConstructorReturn3.default)(this, _React$PureComponent.call(this, props));
	}

	Disqus.prototype.componentDidMount = function componentDidMount() {
		this.loadDisqus();
	};

	Disqus.prototype.componentDidUpdate = function componentDidUpdate() {
		this.loadDisqus();
	};

	Disqus.prototype.addDisqusScript = function addDisqusScript() {
		if (__disqusAdded) {
			return;
		}

		var child = this.disqus = document.createElement('script');
		var parent = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];

		child.async = true;
		child.type = 'text/javascript';
		child.src = '//' + this.props.shortname + '.disqus.com/embed.js';

		parent.appendChild(child);
		__disqusAdded = true;
	};

	Disqus.prototype.loadDisqus = function loadDisqus() {
		var _this2 = this;

		var props = {};

		// Extract Disqus props that were supplied to this component
		DISQUS_CONFIG.forEach(function (prop) {
			if (!!_this2.props[prop]) {
				props[prop] = _this2.props[prop];
			}
		});

		// Always set URL
		if (!props.url || !props.url.length) {
			props.url = window.location.href;
		}

		// If Disqus has already been added, reset it
		if (typeof DISQUS !== 'undefined') {
			DISQUS.reset({
				reload: true,
				config: function config() {
					copyProps(this.page, props);

					// Disqus needs hashbang URL, see https://help.disqus.com/customer/portal/articles/472107
					this.page.url = this.page.url.replace(/#/, '') + '#!newthread';
				}
			});
		} else {
			// Otherwise add Disqus to the page
			copyProps(window, props, 'disqus_');
			this.addDisqusScript();
		}
	};

	Disqus.prototype.render = function render() {
		return _react2.default.createElement('div', { id: 'disqus_thread' });
	};

	return Disqus;
}(_react2.default.PureComponent);

exports.default = Disqus;
//# sourceMappingURL=disqus.js.map
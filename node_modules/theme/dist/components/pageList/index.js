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

var _api = require('../../lib/api');

var _api2 = _interopRequireDefault(_api);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomPageList = function (_React$Component) {
	(0, _inherits3.default)(CustomPageList, _React$Component);

	function CustomPageList(props) {
		(0, _classCallCheck3.default)(this, CustomPageList);

		var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

		_this.fetchData = function (_ref) {
			var tags = _ref.tags,
			    sort = _ref.sort;

			var filter = {
				tags: tags,
				sort: sort
			};

			_api2.default.ajax.pages.list(filter).then(function (_ref2) {
				var status = _ref2.status,
				    json = _ref2.json;

				_this.setState({
					pages: json
				});
			});
		};

		_this.state = {
			pages: []
		};
		return _this;
	}

	CustomPageList.prototype.componentDidMount = function componentDidMount() {
		this.fetchData(this.props);
	};

	CustomPageList.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		this.fetchData(nextProps);
	};

	CustomPageList.prototype.render = function render() {
		var pages = this.state.pages;

		return _react2.default.createElement(_list2.default, { pages: pages });
	};

	return CustomPageList;
}(_react2.default.Component);

exports.default = CustomPageList;
//# sourceMappingURL=index.js.map
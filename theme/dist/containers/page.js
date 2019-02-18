'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _settings = require('../lib/settings');

var _metaTags = require('../components/metaTags');

var _metaTags2 = _interopRequireDefault(_metaTags);

var _pageList = require('../components/pageList');

var _pageList2 = _interopRequireDefault(_pageList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageContainer = function PageContainer(props) {
	var pageDetails = props.state.pageDetails;

	var pageListTag = _settings.themeSettings.page_list_tag;
	var pageListTagDefined = pageListTag && pageListTag.length > 0;
	var pageListPath = pageListTagDefined ? '/' + pageListTag : null;
	var showPageList = pageListTagDefined && pageDetails.path === pageListPath;

	return _react2.default.createElement(
		_react.Fragment,
		null,
		_react2.default.createElement(_metaTags2.default, {
			title: pageDetails.meta_title,
			description: pageDetails.meta_description,
			canonicalUrl: pageDetails.url,
			ogType: 'article',
			ogTitle: pageDetails.meta_title,
			ogDescription: pageDetails.meta_description
		}),
		_react2.default.createElement(
			'section',
			{ className: 'section' },
			_react2.default.createElement(
				'div',
				{ className: 'container' },
				_react2.default.createElement(
					'div',
					{ className: 'content' },
					_react2.default.createElement('div', {
						className: 'page-content',
						dangerouslySetInnerHTML: {
							__html: pageDetails.content
						}
					}),
					showPageList && _react2.default.createElement(_pageList2.default, { tags: pageListTag, sort: '-date_created' })
				)
			)
		)
	);
};

PageContainer.propTypes = {
	state: _propTypes2.default.shape({
		pageDetails: _propTypes2.default.shape({})
	}).isRequired
};

exports.default = PageContainer;
//# sourceMappingURL=page.js.map
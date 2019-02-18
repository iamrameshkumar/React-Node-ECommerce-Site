'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _reactImageGallery = require('react-image-gallery');

var _reactImageGallery2 = _interopRequireDefault(_reactImageGallery);

var _settings = require('../lib/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderItem = function renderItem(item) {
	return _react2.default.createElement(
		'div',
		{ className: 'image-gallery-image' },
		_react2.default.createElement(
			_reactRouterDom.NavLink,
			{ to: item.path || '' },
			_react2.default.createElement('img', { src: item.original, alt: item.title }),
			_react2.default.createElement(
				'div',
				{
					className: 'caption',
					style: { color: _settings.themeSettings.home_slider_color || '#fff' }
				},
				_react2.default.createElement(
					'div',
					{ className: 'caption-title' },
					item.title
				),
				_react2.default.createElement(
					'div',
					{ className: 'caption-description' },
					item.description
				)
			)
		)
	);
};

var HomeSlider = function HomeSlider(_ref) {
	var images = _ref.images;

	if (images && images.length > 0) {
		var items = images.map(function (item) {
			return {
				original: '/assets/images/' + item.image,
				title: item.title,
				description: item.description,
				path: item.path || '',
				button: item.button
			};
		});

		return _react2.default.createElement(
			'section',
			{ className: 'section', style: { padding: 0 } },
			_react2.default.createElement(
				'div',
				{ className: 'home-slider' },
				_react2.default.createElement(_reactImageGallery2.default, {
					items: items,
					lazyLoad: true,
					showThumbnails: true,
					infinite: true,
					autoPlay: true,
					slideInterval: 5000,
					showNav: _settings.themeSettings.home_gallery_shownav === true,
					showBullets: images.length > 1,
					showPlayButton: false,
					showFullscreenButton: false,
					slideOnThumbnailHover: true,
					renderItem: renderItem
				})
			)
		);
	}
	return null;
};

HomeSlider.propTypes = {
	images: _propTypes2.default.arrayOf(_propTypes2.default.shape({}))
};

HomeSlider.defaultProps = {
	images: null
};

exports.default = HomeSlider;
//# sourceMappingURL=homeSlider.js.map
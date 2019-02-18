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

var _reactImageGallery = require('react-image-gallery');

var _reactImageGallery2 = _interopRequireDefault(_reactImageGallery);

var _reactImageLightbox = require('react-image-lightbox');

var _reactImageLightbox2 = _interopRequireDefault(_reactImageLightbox);

var _helper = require('../../lib/helper');

var helper = _interopRequireWildcard(_helper);

var _settings = require('../../lib/settings');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Gallery = function (_React$Component) {
	(0, _inherits3.default)(Gallery, _React$Component);

	function Gallery(props) {
		(0, _classCallCheck3.default)(this, Gallery);

		var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

		_this.openLightbox = function () {
			_this.setState({ lightboxIsOpen: true });
		};

		_this.closeLightbox = function () {
			_this.setState({ lightboxIsOpen: false });
		};

		_this.setPhotoIndex = function (index) {
			_this.setState({ lightboxPhotoIndex: index });
		};

		_this.state = {
			lightboxIsOpen: false,
			lightboxPhotoIndex: 0
		};
		return _this;
	}

	Gallery.prototype.render = function render() {
		var _this2 = this;

		var images = this.props.images;
		var _state = this.state,
		    lightboxIsOpen = _state.lightboxIsOpen,
		    lightboxPhotoIndex = _state.lightboxPhotoIndex;


		if (images && images.length > 0) {
			var imagesArray = images.map(function (image) {
				return {
					original: helper.getThumbnailUrl(image.url, _settings.themeSettings.bigThumbnailWidth),
					thumbnail: helper.getThumbnailUrl(image.url, _settings.themeSettings.previewThumbnailWidth),
					originalAlt: image.alt,
					thumbnailAlt: image.alt
				};
			});

			var originalImages = images.map(function (image) {
				return image.url;
			});
			var showThumbnails = images.length > 1;

			return _react2.default.createElement(
				_react.Fragment,
				null,
				_react2.default.createElement(_reactImageGallery2.default, {
					items: imagesArray,
					showThumbnails: showThumbnails,
					onClick: this.openLightbox,
					lazyLoad: true,
					slideInterval: 2000,
					showNav: _settings.themeSettings.product_gallery_shownav === true,
					showBullets: showThumbnails,
					showPlayButton: false,
					showFullscreenButton: false,
					slideOnThumbnailHover: true,
					thumbnailPosition: _settings.themeSettings.product_thumbnail_position,
					onSlide: this.setPhotoIndex
				}),
				lightboxIsOpen && _react2.default.createElement(_reactImageLightbox2.default, {
					reactModalStyle: { overlay: { zIndex: 1099 } },
					mainSrc: originalImages[lightboxPhotoIndex],
					nextSrc: originalImages[(lightboxPhotoIndex + 1) % originalImages.length],
					prevSrc: originalImages[(lightboxPhotoIndex + originalImages.length - 1) % originalImages.length],
					onCloseRequest: this.closeLightbox,
					onMovePrevRequest: function onMovePrevRequest() {
						return _this2.setState({
							lightboxPhotoIndex: (lightboxPhotoIndex + originalImages.length - 1) % originalImages.length
						});
					},
					onMoveNextRequest: function onMoveNextRequest() {
						return _this2.setState({
							lightboxPhotoIndex: (lightboxPhotoIndex + 1) % originalImages.length
						});
					}
				})
			);
		} else {
			return _react2.default.createElement('div', { className: 'large-image-placeholder' });
		}
	};

	return Gallery;
}(_react2.default.Component);

exports.default = Gallery;
//# sourceMappingURL=gallery.js.map
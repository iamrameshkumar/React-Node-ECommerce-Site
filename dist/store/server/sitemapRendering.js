'use strict';

exports.__esModule = true;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _sitemap = require('sitemap');

var _sitemap2 = _interopRequireDefault(_sitemap);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SITEMAP_EXCLUDE_PATH = ['/', '/checkout', '/checkout-success', '/account', '/cart', '/login', '/signin', '/logout', '/signup', '/register'];

var sitemapRendering = function sitemapRendering(req, res) {
	Promise.all([_api2.default.sitemap.list({ enabled: true }), _api2.default.settings.retrieve()]).then(function (_ref) {
		var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
		    sitemapResponse = _ref2[0],
		    settingsResponse = _ref2[1];

		var sitemapArray = sitemapResponse.json;
		var settings = settingsResponse.json;
		var hostname = settings.domain && settings.domain.length > 0 ? settings.domain : req.protocol + '://' + req.hostname;

		var urls = sitemapArray.filter(function (item) {
			return item.type !== 'reserved' && item.type !== 'search' && !SITEMAP_EXCLUDE_PATH.includes(item.path);
		}).map(function (item) {
			return item.path;
		});
		var sitemap = _sitemap2.default.createSitemap({ hostname: hostname, urls: urls });
		sitemap.toXML(function (err, xml) {
			if (err) {
				_winston2.default.error(err.message ? err.message : err);
				res.status(500).end();
			} else {
				res.header('Content-Type', 'application/xml');
				res.send(xml);
			}
		});
	});
};

exports.default = sitemapRendering;
//# sourceMappingURL=sitemapRendering.js.map
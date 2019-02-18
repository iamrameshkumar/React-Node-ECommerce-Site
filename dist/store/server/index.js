'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _responseTime = require('response-time');

var _responseTime2 = _interopRequireDefault(_responseTime);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _server = require('../../../config/server');

var _server2 = _interopRequireDefault(_server);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _robotsRendering = require('./robotsRendering');

var _robotsRendering2 = _interopRequireDefault(_robotsRendering);

var _sitemapRendering = require('./sitemapRendering');

var _sitemapRendering2 = _interopRequireDefault(_sitemapRendering);

var _redirects = require('./redirects');

var _redirects2 = _interopRequireDefault(_redirects);

var _pageRendering = require('./pageRendering');

var _pageRendering2 = _interopRequireDefault(_pageRendering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var ADMIN_INDEX_PATH = _path2.default.resolve('public/admin/index.html');
var STATIC_OPTIONS = {
	maxAge: 31536000000 // One year
};

app.set('trust proxy', 1);
app.use((0, _helmet2.default)());
app.get('/images/:entity/:id/:size/:filename', function (req, res, next) {
	// A stub of image resizing (can be done with Nginx)
	var newUrl = '/images/' + req.params.entity + '/' + req.params.id + '/' + req.params.filename;
	req.url = newUrl;
	next();
});
app.use(_express2.default.static('public/content', STATIC_OPTIONS));
app.use('/assets', _express2.default.static('theme/assets', STATIC_OPTIONS));
app.use('/admin-assets', _express2.default.static('public/admin-assets', STATIC_OPTIONS));
app.use('/sw.js', _express2.default.static('theme/assets/sw.js'));
app.use('/admin', function (req, res) {
	res.sendFile(ADMIN_INDEX_PATH);
});
app.get(/^.+\.(jpg|jpeg|gif|png|bmp|ico|webp|svg|css|js|zip|rar|flv|swf|xls)$/, function (req, res) {
	res.status(404).end();
});
app.get('/robots.txt', _robotsRendering2.default);
app.get('/sitemap.xml', _sitemapRendering2.default);
app.get('*', _redirects2.default);
app.use((0, _responseTime2.default)());
app.use((0, _cookieParser2.default)(_server2.default.cookieSecretKey));
app.get('*', _pageRendering2.default);

var server = app.listen(_server2.default.storeListenPort, function () {
	var serverAddress = server.address();
	_winston2.default.info('Store running at http://localhost:' + serverAddress.port);
});
//# sourceMappingURL=index.js.map
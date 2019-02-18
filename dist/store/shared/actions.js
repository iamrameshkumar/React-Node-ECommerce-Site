'use strict';

exports.__esModule = true;
exports.setCurrentPage = exports.updateCart = exports.analyticsSetPaymentMethod = exports.analyticsSetShippingMethod = exports.setSort = exports.setCategory = exports.setCurrentLocation = exports.receiveSitemap = exports.checkout = exports.fetchShippingMethods = exports.fetchPaymentMethods = exports.deleteCartItem = exports.updateCartItemQuantiry = exports.addCartItem = exports.fetchCart = exports.fetchMoreProducts = exports.getParsedProductFilter = exports.getProductFilterForSearch = exports.getProductFilterForCategory = exports.fetchProducts = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actionTypes = require('./actionTypes');

var t = _interopRequireWildcard(_actionTypes);

var _pageTypes = require('./pageTypes');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _reactScroll = require('react-scroll');

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

var _analytics = require('./analytics');

var analytics = _interopRequireWildcard(_analytics);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestProduct = function requestProduct() {
	return { type: t.PRODUCT_REQUEST };
};

var receiveProduct = function receiveProduct(product) {
	return { type: t.PRODUCT_RECEIVE, product: product };
};

var fetchProducts = exports.fetchProducts = function fetchProducts() {
	return function () {
		var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch, getState) {
			var _getState, app, filter, response, products;

			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							dispatch(requestProducts());
							_getState = getState(), app = _getState.app;
							filter = getParsedProductFilter(app.productFilter);
							_context.next = 5;
							return _api2.default.ajax.products.list(filter);

						case 5:
							response = _context.sent;
							products = response.json;

							dispatch(receiveProducts(null));
							dispatch(receiveProducts(products));

						case 9:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined);
		}));

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}();
};

var getProductFilterForCategory = exports.getProductFilterForCategory = function getProductFilterForCategory(locationSearch, sortBy) {
	var queryFilter = _queryString2.default.parse(locationSearch);

	var attributes = {};
	for (var querykey in queryFilter) {
		if (querykey.startsWith('attributes.')) {
			attributes[querykey] = queryFilter[querykey];
		}
	}

	return {
		priceFrom: parseInt(queryFilter.price_from || 0),
		priceTo: parseInt(queryFilter.price_to || 0),
		attributes: attributes,
		search: null,
		sort: sortBy
	};
};

var getProductFilterForSearch = exports.getProductFilterForSearch = function getProductFilterForSearch(locationSearch) {
	var queryFilter = _queryString2.default.parse(locationSearch);

	return {
		categoryId: null,
		priceFrom: parseInt(queryFilter.price_from || 0),
		priceTo: parseInt(queryFilter.price_to || 0),
		search: queryFilter.search,
		sort: 'search'
	};
};

var getParsedProductFilter = exports.getParsedProductFilter = function getParsedProductFilter(productFilter) {
	var filter = Object.assign({}, {
		on_sale: productFilter.onSale,
		search: productFilter.search,
		category_id: productFilter.categoryId,
		price_from: productFilter.priceFrom,
		price_to: productFilter.priceTo,
		sort: productFilter['sort'],
		fields: productFilter['fields'],
		limit: productFilter['limit'],
		offset: 0
	}, productFilter.attributes);

	return filter;
};

var requestProducts = function requestProducts() {
	return { type: t.PRODUCTS_REQUEST };
};

var receiveProducts = function receiveProducts(products) {
	return { type: t.PRODUCTS_RECEIVE, products: products };
};

var fetchMoreProducts = exports.fetchMoreProducts = function fetchMoreProducts() {
	return function () {
		var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch, getState) {
			var _getState2, app, filter, response, products;

			return _regenerator2.default.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_getState2 = getState(), app = _getState2.app;

							if (!(app.loadingProducts || app.loadingMoreProducts || app.products.length === 0 || !app.productsHasMore)) {
								_context2.next = 5;
								break;
							}

							return _context2.abrupt('return');

						case 5:
							dispatch(requestMoreProducts());

							filter = getParsedProductFilter(app.productFilter);

							filter.offset = app.products.length;

							_context2.next = 10;
							return _api2.default.ajax.products.list(filter);

						case 10:
							response = _context2.sent;
							products = response.json;

							dispatch(receiveMoreProducts(products));
							_reactScroll.animateScroll.scrollMore(200);

						case 14:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, undefined);
		}));

		return function (_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	}();
};

var requestMoreProducts = function requestMoreProducts() {
	return { type: t.MORE_PRODUCTS_REQUEST };
};

var receiveMoreProducts = function receiveMoreProducts(products) {
	return {
		type: t.MORE_PRODUCTS_RECEIVE,
		products: products
	};
};

var requestPage = function requestPage() {
	return { type: t.PAGE_REQUEST };
};

var receivePage = function receivePage(pageDetails) {
	return { type: t.PAGE_RECEIVE, pageDetails: pageDetails };
};

var fetchCart = exports.fetchCart = function fetchCart() {
	return function () {
		var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dispatch, getState) {
			var response, cart;
			return _regenerator2.default.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							dispatch(requestCart());
							_context3.next = 3;
							return _api2.default.ajax.cart.retrieve();

						case 3:
							response = _context3.sent;
							cart = response.json;

							dispatch(receiveCart(cart));

						case 6:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, undefined);
		}));

		return function (_x5, _x6) {
			return _ref3.apply(this, arguments);
		};
	}();
};

var requestCart = function requestCart() {
	return { type: t.CART_REQUEST };
};

var receiveCart = function receiveCart(cart) {
	return { type: t.CART_RECEIVE, cart: cart };
};

var addCartItem = exports.addCartItem = function addCartItem(item) {
	return function () {
		var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(dispatch, getState) {
			var response, cart;
			return _regenerator2.default.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							dispatch(requestAddCartItem());
							_context4.next = 3;
							return _api2.default.ajax.cart.addItem(item);

						case 3:
							response = _context4.sent;
							cart = response.json;

							dispatch(receiveCart(cart));
							analytics.addCartItem({
								item: item,
								cart: cart
							});

						case 7:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, undefined);
		}));

		return function (_x7, _x8) {
			return _ref4.apply(this, arguments);
		};
	}();
};

var requestAddCartItem = function requestAddCartItem() {
	return { type: t.CART_ITEM_ADD_REQUEST };
};

var updateCartItemQuantiry = exports.updateCartItemQuantiry = function updateCartItemQuantiry(item_id, quantity) {
	return function () {
		var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(dispatch, getState) {
			var response;
			return _regenerator2.default.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							dispatch(requestUpdateCartItemQuantiry());
							_context5.next = 3;
							return _api2.default.ajax.cart.updateItem(item_id, {
								quantity: quantity
							});

						case 3:
							response = _context5.sent;

							dispatch(receiveCart(response.json));
							dispatch(fetchShippingMethods());

						case 6:
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, undefined);
		}));

		return function (_x9, _x10) {
			return _ref5.apply(this, arguments);
		};
	}();
};

var requestUpdateCartItemQuantiry = function requestUpdateCartItemQuantiry() {
	return {
		type: t.CART_ITEM_UPDATE_REQUEST
	};
};

var deleteCartItem = exports.deleteCartItem = function deleteCartItem(item_id) {
	return function () {
		var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(dispatch, getState) {
			var _getState3, app, response;

			return _regenerator2.default.wrap(function _callee6$(_context6) {
				while (1) {
					switch (_context6.prev = _context6.next) {
						case 0:
							dispatch(requestDeleteCartItem());
							_getState3 = getState(), app = _getState3.app;
							_context6.next = 4;
							return _api2.default.ajax.cart.deleteItem(item_id);

						case 4:
							response = _context6.sent;

							dispatch(receiveCart(response.json));
							dispatch(fetchShippingMethods());
							analytics.deleteCartItem({
								itemId: item_id,
								cart: app.cart
							});

						case 8:
						case 'end':
							return _context6.stop();
					}
				}
			}, _callee6, undefined);
		}));

		return function (_x11, _x12) {
			return _ref6.apply(this, arguments);
		};
	}();
};

var requestDeleteCartItem = function requestDeleteCartItem() {
	return { type: t.CART_ITEM_DELETE_REQUEST };
};

var fetchPaymentMethods = exports.fetchPaymentMethods = function fetchPaymentMethods() {
	return function () {
		var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(dispatch, getState) {
			var response;
			return _regenerator2.default.wrap(function _callee7$(_context7) {
				while (1) {
					switch (_context7.prev = _context7.next) {
						case 0:
							dispatch(requestPaymentMethods());
							_context7.next = 3;
							return _api2.default.ajax.paymentMethods.list();

						case 3:
							response = _context7.sent;

							dispatch(receivePaymentMethods(response.json));

						case 5:
						case 'end':
							return _context7.stop();
					}
				}
			}, _callee7, undefined);
		}));

		return function (_x13, _x14) {
			return _ref7.apply(this, arguments);
		};
	}();
};

var requestPaymentMethods = function requestPaymentMethods() {
	return { type: t.PAYMENT_METHODS_REQUEST };
};

var receivePaymentMethods = function receivePaymentMethods(methods) {
	return {
		type: t.PAYMENT_METHODS_RECEIVE,
		methods: methods
	};
};

var fetchShippingMethods = exports.fetchShippingMethods = function fetchShippingMethods() {
	return function () {
		var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(dispatch, getState) {
			var response;
			return _regenerator2.default.wrap(function _callee8$(_context8) {
				while (1) {
					switch (_context8.prev = _context8.next) {
						case 0:
							dispatch(requestShippingMethods());
							_context8.next = 3;
							return _api2.default.ajax.shippingMethods.list();

						case 3:
							response = _context8.sent;

							dispatch(receiveShippingMethods(response.json));

						case 5:
						case 'end':
							return _context8.stop();
					}
				}
			}, _callee8, undefined);
		}));

		return function (_x15, _x16) {
			return _ref8.apply(this, arguments);
		};
	}();
};

var requestShippingMethods = function requestShippingMethods() {
	return { type: t.SHIPPING_METHODS_REQUEST };
};

var receiveShippingMethods = function receiveShippingMethods(methods) {
	return {
		type: t.SHIPPING_METHODS_RECEIVE,
		methods: methods
	};
};

var checkout = exports.checkout = function checkout(cart, history) {
	return function () {
		var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(dispatch, getState) {
			var cartResponse, chargeNeeded, chargeResponse, chargeSucceeded, response, order;
			return _regenerator2.default.wrap(function _callee9$(_context9) {
				while (1) {
					switch (_context9.prev = _context9.next) {
						case 0:
							dispatch(requestCheckout());

							if (!cart) {
								_context9.next = 4;
								break;
							}

							_context9.next = 4;
							return _api2.default.ajax.cart.update({
								shipping_address: cart.shipping_address,
								billing_address: cart.billing_address,
								email: cart.email,
								mobile: cart.mobile,
								payment_method_id: cart.payment_method_id,
								shipping_method_id: cart.shipping_method_id,
								comments: cart.comments
							});

						case 4:
							_context9.next = 6;
							return _api2.default.ajax.cart.retrieve();

						case 6:
							cartResponse = _context9.sent;
							chargeNeeded = !!cartResponse.json.payment_token;

							if (!chargeNeeded) {
								_context9.next = 15;
								break;
							}

							_context9.next = 11;
							return _api2.default.ajax.cart.client.post('/cart/charge');

						case 11:
							chargeResponse = _context9.sent;
							chargeSucceeded = chargeResponse.status === 200;

							if (chargeSucceeded) {
								_context9.next = 15;
								break;
							}

							return _context9.abrupt('return');

						case 15:
							_context9.next = 17;
							return _api2.default.ajax.cart.checkout();

						case 17:
							response = _context9.sent;
							order = response.json;

							dispatch(receiveCheckout(order));
							history.push('/checkout-success');
							analytics.checkoutSuccess({ order: order });

						case 22:
						case 'end':
							return _context9.stop();
					}
				}
			}, _callee9, undefined);
		}));

		return function (_x17, _x18) {
			return _ref9.apply(this, arguments);
		};
	}();
};

var requestCheckout = function requestCheckout() {
	return { type: t.CHECKOUT_REQUEST };
};

var receiveCheckout = function receiveCheckout(order) {
	return { type: t.CHECKOUT_RECEIVE, order: order };
};

var receiveSitemap = exports.receiveSitemap = function receiveSitemap(currentPage) {
	return {
		type: t.SITEMAP_RECEIVE,
		currentPage: currentPage
	};
};

var setCurrentLocation = exports.setCurrentLocation = function setCurrentLocation(location) {
	return {
		type: t.LOCATION_CHANGED,
		location: location
	};
};

var setCategory = exports.setCategory = function setCategory(categoryId) {
	return function (dispatch, getState) {
		var _getState4 = getState(),
		    app = _getState4.app;

		var category = app.categories.find(function (c) {
			return c.id === categoryId;
		});
		if (category) {
			dispatch(setCurrentCategory(category));
			dispatch(setProductsFilter({ categoryId: categoryId }));
			dispatch(receiveProduct(null));
		}
	};
};

var setCurrentCategory = function setCurrentCategory(category) {
	return {
		type: t.SET_CURRENT_CATEGORY,
		category: category
	};
};

var setSort = exports.setSort = function setSort(sort) {
	return function (dispatch, getState) {
		dispatch(setProductsFilter({ sort: sort }));
		dispatch(fetchProducts());
	};
};

var setProductsFilter = function setProductsFilter(filter) {
	return {
		type: t.SET_PRODUCTS_FILTER,
		filter: filter
	};
};

var analyticsSetShippingMethod = exports.analyticsSetShippingMethod = function analyticsSetShippingMethod(method_id) {
	return function (dispatch, getState) {
		var _getState5 = getState(),
		    app = _getState5.app;

		analytics.setShippingMethod({
			methodId: method_id,
			allMethods: app.shippingMethods
		});
	};
};

var analyticsSetPaymentMethod = exports.analyticsSetPaymentMethod = function analyticsSetPaymentMethod(method_id) {
	return function (dispatch, getState) {
		var _getState6 = getState(),
		    app = _getState6.app;

		analytics.setPaymentMethod({
			methodId: method_id,
			allMethods: app.paymentMethods
		});
	};
};

var updateCart = exports.updateCart = function updateCart(data, callback) {
	return function () {
		var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(dispatch, getState) {
			var response, newCart;
			return _regenerator2.default.wrap(function _callee10$(_context10) {
				while (1) {
					switch (_context10.prev = _context10.next) {
						case 0:
							_context10.next = 2;
							return _api2.default.ajax.cart.update(data);

						case 2:
							response = _context10.sent;
							newCart = response.json;

							dispatch(receiveCart(newCart));
							if (typeof callback === 'function') {
								callback(newCart);
							}

						case 6:
						case 'end':
							return _context10.stop();
					}
				}
			}, _callee10, undefined);
		}));

		return function (_x19, _x20) {
			return _ref10.apply(this, arguments);
		};
	}();
};

var setCurrentPage = exports.setCurrentPage = function setCurrentPage(location) {
	return function () {
		var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(dispatch, getState) {
			var locationPathname, locationSearch, locationHash, _getState7, app, statePathname, stateSearch, stateHash, currentPageAlreadyInState, category, newCurrentPage, sitemapResponse, _newCurrentPage;

			return _regenerator2.default.wrap(function _callee11$(_context11) {
				while (1) {
					switch (_context11.prev = _context11.next) {
						case 0:
							locationPathname = '/404';
							locationSearch = '';
							locationHash = '';


							if (location) {
								locationPathname = location.pathname;
								locationSearch = location.search;
								locationHash = location.hash;
							}

							_getState7 = getState(), app = _getState7.app;
							statePathname = '/404';
							stateSearch = '';
							stateHash = '';


							if (app.location) {
								statePathname = app.location.pathname;
								stateSearch = app.location.search;
								stateHash = app.location.hash;
							}

							currentPageAlreadyInState = statePathname === locationPathname && stateSearch === locationSearch;

							if (!currentPageAlreadyInState) {
								_context11.next = 13;
								break;
							}

							_context11.next = 25;
							break;

						case 13:
							dispatch(setCurrentLocation({
								hasHistory: true,
								pathname: locationPathname,
								search: locationSearch,
								hash: locationHash
							}));

							category = app.categories.find(function (c) {
								return c.path === locationPathname;
							});

							if (!category) {
								_context11.next = 21;
								break;
							}

							newCurrentPage = {
								type: 'product-category',
								path: category.path,
								resource: category.id
							};

							dispatch(receiveSitemap(newCurrentPage)); // remove .data
							dispatch(fetchDataOnCurrentPageChange(newCurrentPage));
							_context11.next = 25;
							break;

						case 21:
							_context11.next = 23;
							return _api2.default.ajax.sitemap.retrieve({
								path: locationPathname
							});

						case 23:
							sitemapResponse = _context11.sent;

							if (sitemapResponse.status === 404) {
								dispatch(receiveSitemap({
									type: 404,
									path: locationPathname,
									resource: null
								}));
							} else {
								_newCurrentPage = sitemapResponse.json;

								dispatch(receiveSitemap(_newCurrentPage));
								dispatch(fetchDataOnCurrentPageChange(_newCurrentPage));
							}

						case 25:
						case 'end':
							return _context11.stop();
					}
				}
			}, _callee11, undefined);
		}));

		return function (_x21, _x22) {
			return _ref11.apply(this, arguments);
		};
	}();
};

var fetchDataOnCurrentPageChange = function fetchDataOnCurrentPageChange(currentPage) {
	return function (dispatch, getState) {
		var _getState8 = getState(),
		    app = _getState8.app;

		var productFilter = null;

		// clear product data
		dispatch(receiveProduct(null));

		analytics.pageView({
			path: currentPage.path,
			title: '-'
		});

		switch (currentPage.type) {
			case _pageTypes.PRODUCT_CATEGORY:
				productFilter = getProductFilterForCategory(app.location.search, app.settings.default_product_sorting);
				dispatch(setCategory(currentPage.resource));
				dispatch(setProductsFilter(productFilter));
				dispatch(fetchProducts());
				break;
			case _pageTypes.SEARCH:
				productFilter = getProductFilterForSearch(app.location.search);
				dispatch(setProductsFilter(productFilter));
				dispatch(fetchProducts());
				analytics.search({ searchText: productFilter.search });
				break;
			case _pageTypes.PRODUCT:
				var productData = currentPage.data;
				dispatch(receiveProduct(productData));
				analytics.productView({ product: productData });
				break;
			case _pageTypes.PAGE:
				var pageData = currentPage.data;
				dispatch(receivePage(pageData));
				if (currentPage.path === '/checkout') {
					analytics.checkoutView({ order: app.cart });
				}
				break;
		}
	};
};
//# sourceMappingURL=actions.js.map
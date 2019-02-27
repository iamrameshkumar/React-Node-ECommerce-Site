import security from '../lib/security';
import AuthService from '../services/customers/users';

var httpErrorInterfaces = require('./httpError.js');
var httpError = httpErrorInterfaces.httpError;

// Routes
class AuthRoute {
	constructor(router) {
		this.router = router;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.post(
			'/v1/users/login',
			security.checkUserScope.bind(this, security.scope.LOGIN_USER),
			this.loginUser.bind(this)
		);
		this.router.post(
			'/v1/users/register',
			security.checkUserScope.bind(this, security.scope.REGISTER_USER),
			this.registerUser.bind(this)
		);
	}

	loginUser(req, res, next) {
		try {
			res.status(200).json(AuthService.loginUser(req.body));
		} catch (err) {
			if (err instanceof httpError) {
				res.status(err.code).send(err.message);
			} else {
				res.status(500).send('internal server error');
			}
		}
	}

	registerUser(req, res, next) {
		try {
			res.status(200).json(AuthService.registerUser(req.body));
		} catch (err) {
			if (err instanceof httpError) {
				res.status(err.code).send(err.message);
			} else {
				res.status(500).send('internal server error');
			}
		}
	}
}

export default AuthRoute;

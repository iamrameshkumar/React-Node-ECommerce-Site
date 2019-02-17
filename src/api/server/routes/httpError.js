class httpError {
	constructor() {}
}

class httpForbidden extends httpError {
	constructor(message, stack = null) {
		super();
		this.code = 403;
		this.message = message;
		this.stack = stack;
	}
}

class httpNotFound extends httpError {
	constructor(message, stack = null) {
		super();
		this.code = 404;
		this.message = message;
		this.stack = stack;
	}
}

class httpBadRequest extends httpError {
	constructor(message, stack = null) {
		super();
		this.code = 400;
		this.message = message;
		this.stack = stack;
	}
}

class httpInternalServerError extends httpError {
	constructor(message, stack = null) {
		super();
		this.code = 500;
		this.message = message;
		this.stack = stack;
	}
}

module.exports = {
	httpError,
	httpForbidden,
	httpNotFound,
	httpBadRequest,
	httpInternalServerError
};

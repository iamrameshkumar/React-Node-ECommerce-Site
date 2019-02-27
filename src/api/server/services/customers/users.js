import { ObjectID } from 'mongodb';
import { db } from '../../lib/mongo';
import utils from '../../lib/utils';
import parse from '../../lib/parse';
import webhooks from '../../lib/webhooks';
import CustomerGroupsService from './customerGroups';

var httpErrorInterfaces = require('../../routes/httpError.js');
var httpError = httpErrorInterfaces.httpError;
var httpInternalServerError = httpErrorInterfaces.httpInternalServerError;
var httpForbidden = httpErrorInterfaces.httpForbidden;
var httpNotFound = httpErrorInterfaces.httpNotFound;
var httpBadRequest = httpErrorInterfaces.httpBadRequest;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

class AuthService {
	constructor() {}

	async registerUser(userInfo) {
		// @route POST api/users/register
		// @desc Register user
		// @access Public
		const { errors, isValid } = validateRegisterInput(userInfo);

		// Check validation
		if (!isValid) {
			throw new httpBadRequest(errors.toString());
		}

		db.collection('customers')
			.findOne({ email: userInfo.email })
			.then(user => {
				if (user) {
					throw new httpBadRequest(
						JSON.stringify({
							email: 'Email already exists'
						})
					);
				} else {
					let customer = {
						date_created: new Date(),
						date_updated: null,
						full_name: userInfo.name,
						email: userInfo.email,
						password: userInfo.password
					};
					// Hash password before saving in database
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(customer.password, salt, async (err, hash) => {
							if (err) throw new httpInternalServerError(err.toString());
							customer.password = hash;

							const insertResponse = await db
								.collection('customers')
								.insertMany([customer]);
							const newCustomerId = insertResponse.ops[0]._id.toString();
							const newCustomer = await this.getSingleCustomer(newCustomerId);
							await webhooks.trigger({
								event: webhooks.events.CUSTOMER_CREATED,
								payload: newCustomer
							});
							return newCustomer;
						});
					});
				}
			})
			.catch(err => {
				throw new httpInternalServerError(err.toString());
			});
	}

	loginUser(userInfo) {
		// @route POST api/users/login
		// @desc Login user and return JWT token
		// @access Public

		// Form validation

		const { errors, isValid } = validateLoginInput(userInfo);

		// Check validation
		if (!isValid) {
			throw new httpBadRequest(errors.toString());
		}

		const email = userInfo.email;
		const password = userInfo.password;

		// Find user by email
		db.collection('customers')
			.findOne({ email })
			.then(user => {
				// Check if user exists
				if (!user) {
					throw new httpNotFound({ emailnotfound: 'Email not found' });
				}

				// Check password
				bcrypt.compare(password, user.password).then(isMatch => {
					if (isMatch) {
						// User matched
						// Create JWT Payload
						const payload = { id: user.id, name: user.name };

						// Sign token
						jwt.sign(
							payload,
							keys.secretOrKey,
							{
								expiresIn: 31556926 // 1 year in seconds
							},
							(err, token) => {
								return {
									success: true,
									token: 'Bearer ' + token
								};
							}
						);
					} else {
						throw new httpBadRequest(
							JSON.stringify({
								passwordincorrect: 'Password incorrect'
							})
						);
					}
				});
			})
			.catch(err => {
				throw new httpInternalServerError(err.toString());
			});
	}
}

export default new AuthService();

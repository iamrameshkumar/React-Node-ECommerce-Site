import api from '../lib/api';
import setAuthToken from '../lib/utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './authActiontypes';
class AuthActions {
	// Register User
	async registerUser(userData, history) {
		let response = await api.restClient.post('/users/register', userData);
		return response;
	}

	// Login - get user token
	async loginUser(userData) {
		let response = api.restClient.post('/users/login', userData);
		if (response) {
			// Save to localStorage
			if (200 === response.status) {
				// Set token to localStorage
				const { token } = response.json.token;
				localStorage.setItem('jwtToken', token);
				// Set token to Auth header
				setAuthToken(token);
				// Decode token to get user data
				const decoded = jwt_decode(token);
				// Set current user
				dispatch(setCurrentUser(decoded));
			}
		}
		return response;
	}

	// Set logged in user
	setCurrentUser = decoded => {
		return {
			type: SET_CURRENT_USER,
			payload: decoded
		};
	};

	// User loading
	setUserLoading = () => {
		return {
			type: USER_LOADING
		};
	};

	// Log user out
	logoutUser = () => dispatch => {
		// Remove token from local storage
		localStorage.removeItem('jwtToken');
		// Remove auth header for future requests
		setAuthToken(false);
		// Set current user to empty object {} which will set isAuthenticated to false
		dispatch(setCurrentUser({}));
	};
}

export default new AuthActions();
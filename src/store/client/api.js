import CezerinClient from 'cezerin-client';
import clientSettings from './settings';

export const api = new CezerinClient({
	ajaxBaseUrl: clientSettings.ajaxBaseUrl || '/ajax'
});

export const restapi = new CezerinClient({
	apiBaseUrl: clientSettings.apiBaseUrl || '/api/v1'
});

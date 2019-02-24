import CezerinClient from 'cezerin-client';
import clientSettings from './settings';

const api = new CezerinClient({
	ajaxBaseUrl: clientSettings.ajaxBaseUrl || '/ajax',
	apiBaseUrl: clientSettings.apiBaseUrl || '/api/v1'
});

export default api;

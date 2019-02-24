import CezerinClient from 'cezerin-client';
import clientSettings from './settings';

const restapi = new CezerinClient({
	apiBaseUrl: clientSettings.apiBaseUrl || '/api/v1'
});

export default restapi;

import axios from 'axios';
import BASE_URL from '../../utils/baseUrl';

axios.defaults.baseURL = BASE_URL;

const getUsersAction = async () => {
	const response = await axios.get('/users');
	console.log('Get users Response: ', response);
	if(response.data) {
		const {data} = response.data;
		return data;
	}
};

export default getUsersAction;
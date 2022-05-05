import axios from 'axios';

interface InputType {
	id?: string;
	userName: string;
	fullName: string;
	lastLogin: string;
	enabled: boolean | string;
}

const addUserAction = async (user: InputType) => {
	try {
		const response = await axios.post('/adduser', user);
		return response.data;
	} catch (error) {
		return error;
	}
};

export default addUserAction;
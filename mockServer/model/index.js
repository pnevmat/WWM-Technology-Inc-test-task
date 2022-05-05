const db = require('../db/users.json');
const fs = require('fs').promises;
const bufferDecoder = require('../utils/bufferDecoder/bufferDecoder');

const getUsers = async () => {
	try {
		const db = await fs.readFile(
			'../wwm-technology-inc-test-task/mockServer/db/users.json',
			'utf8',
			(err) => {
				if (err) {
					return err.message;
				}
			},
		);

		const decodedBuffer = bufferDecoder(db);
		return decodedBuffer;
	} catch (e) {
		return e.message;
	}
};

const addUser = async (body) => {
	const id = `${body.userName[0]}${body.userName[1]}${
		body.fullName[body.fullName.length - 2]
	}${body.fullName[body.fullName.length - 1]}${body.fullName[0]}${
		body.fullName[1]
	}`;
	const user = {id, ...body};
	const usersList = JSON.stringify([...db, user]);

	try {
		fs.writeFile(
			'../wwm-technology-inc-test-task/mockServer/db/users.json',
			usersList,
			(err) => {
				if (err) {
					return err.message;
				}
			},
		);
		return user;
	} catch {
		return {};
	}
};

module.exports = {getUsers, addUser};

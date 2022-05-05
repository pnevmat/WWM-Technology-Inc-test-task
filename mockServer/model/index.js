const db = require('../db/users.json');
const fs = require('fs').promises;
const bufferLayout = require('buffer-layout');
const bufferDecoder = require('../utils/bufferDecoder/bufferDecoder');

const getUsers = async () => {
	try {
		const db = await fs.readFile(
			'../training-with-kendo/mockServer/db/users.json',
			'utf8',
			(err) => {
				if (err) {
					return err.message;
				}
			},
		);

		// console.log('Buffer db: ', db);
		const array = [
			{
				id: 'ffrf',
				userName: 'Pnevmat',
				fullName: 'Vadim Kravchenko',
				lastLogin: 'Fri March 15 2022',
			},
			{
				id: 'ffrf',
				userName: 'Lipka',
				fullName: 'Peter Laners',
				lastLogin: 'Wed Oct 25 2021',
			},
		];
		// const buffer = Buffer.from(JSON.stringify(array), 'utf-8');
		// console.log('Training buffer: ', buffer);
		// console.log('Type of training buffer', typeof buffer);
		// const stringBuffer = buffer.toString();
		// console.log('Stringified buffer in index.js: ', stringBuffer);
		// console.log(
		// 	'Type of stringified buffer in index.js: ',
		// 	typeof stringBuffer,
		// );
		console.log('Stringified db in index.js: ', db);
		console.log('Type of stringified db in index.js: ', typeof db);
		const decodedBuffer = bufferDecoder(db);
		console.log('Decoded buffer: ', decodedBuffer);
		return decodedBuffer;
	} catch (e) {
		return e.message;
	}
};

const addUser = async (body) => {
	console.log('Add user func body: ', body);
	const id = `${body.userName[0]}${body.userName[1]}${
		body.fullName[body.fullName.length - 2]
	}${body.fullName[body.fullName.length - 1]}${body.fullName[0]}${
		body.fullName[1]
	}`;
	const user = {id, ...body};
	const usersList = JSON.stringify([...db, user]);
	console.log(`Users list: ${usersList}`);
	try {
		fs.writeFile(
			'../training-with-kendo/mockServer/db/users.json',
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

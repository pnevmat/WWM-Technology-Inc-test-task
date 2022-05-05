const express = require('express');
const {validateCreateUser} = require('../../validation/validate');
const router = express.Router();

const {getUsers, addUser} = require('../../model/index.js');

router.get('/users', async (req, res, next) => {
	try {
		const usersList = await getUsers(req, res);

		res.json({status: 'Success', code: 200, data: usersList});
	} catch (e) {
		next(e);
	}
});

router.post('/adduser', validateCreateUser, async (req, res, next) => {
	try {
		const user = await addUser(req.body);

		res.json({status: 'Success', code: 201, data: user});
	} catch (e) {
		next(e);
	}
});

module.exports = router;

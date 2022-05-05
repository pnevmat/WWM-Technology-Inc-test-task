// const express = require('express');
// const cors = require('cors');
// const getUsers = require('./model/getUsersList');
// const addUser = require('./model/addUser');

// const port = 5000;
// const server = express();

// server.use(cors());
// server.use(express.json());

// server.get('/users', (req, res) => getUsers(req, res));
// server.post('/adduser', (req, res) => {
// 	// const request = JSON.parse(req);
// 	console.log('Received request: ', req);
// 	// console.log('Received request body: ', req.config);
// 	const response = res.json({status: 'success', code: 201});
// 	// console.log('Response: ', response);
// 	addUser(req, response);
// 	return response;
// });

const app = require('../app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running. Use our API on port: ${PORT}`);
});

// console.log(`Mock API Server is up and running at: http://localhost:${port}`);
// server.listen(port);

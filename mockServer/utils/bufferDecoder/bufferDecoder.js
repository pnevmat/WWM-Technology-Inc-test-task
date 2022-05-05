const arrayOfObjectsHandler = require('./arrayOfObjectsHandler');

const bufferDecoder = (buffer) => {
	if (typeof buffer !== 'string') {
		return 'You need to provide stringified entity to bufferDecoder';
	}
	let result = null;

	if (buffer[0] === '[' || buffer[1] === '[') {
		result = arrayOfObjectsHandler(buffer);

		return result;
	} else {
		return result;
	}
};

module.exports = bufferDecoder;

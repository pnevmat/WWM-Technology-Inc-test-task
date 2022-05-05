const arrayOfObjectsHandler = require('./arrayOfObjectsHandler');

const bufferDecoder = (buffer) => {
	// const stringBuffer = buffer.toString();
	// console.log('Stringified buffer in decoder func: ', buffer);
	// console.log('Type of stringified buffer: ', typeof buffer);
	if (typeof buffer !== 'string') {
		return 'You need to provide stringified entity to bufferDecoder';
	}
	let result = null;

	if (buffer[0] === '[' || buffer[1] === '[') {
		//Get next code to separate func (arrayOfObjectsHandler)
		result = arrayOfObjectsHandler(buffer);
		// console.log('Result in bufferDecoder: ', result);
		return result;
	} else {
		return result;
	}
};

module.exports = bufferDecoder;

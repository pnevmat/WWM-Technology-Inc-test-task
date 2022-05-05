const arrayOfObjectsHandler = (buffer) => {
	let result = null;
	let object = null;
	let objectProperty = null;
	let objectValue = null;
	let valueStartIndex = 0;

	for (let i = 0; i <= buffer.length - 1; i++) {
		if (i <= 1 && buffer[i] === '[') {
			result = [];
		} else if (i >= 1 && buffer[i] === '{') {
			object = {};
		} else if (
			i > 1 &&
			buffer[i] !== '{' &&
			buffer[i] !== '}' &&
			buffer[i] !== '[' &&
			buffer[i] !== ']' &&
			buffer[i] !== '/' &&
			buffer[i] !== ':' &&
			buffer[i] !== ',' &&
			buffer[i] !== '"' &&
			!valueStartIndex
		) {
			if (!objectProperty) {
				objectProperty = buffer[i];
			} else {
				objectProperty += buffer[i];
			}
		} else if (i > 1 && buffer[i] === ':') {
			valueStartIndex = i + 1;
		} else if (
			i > 1 &&
			i >= valueStartIndex &&
			buffer[i] !== ',' &&
			buffer[i] !== '"' &&
			buffer[i] !== '}'
		) {
			if (!objectValue) {
				objectValue = buffer[i];
			} else {
				objectValue += buffer[i];
			}
		} else if (i > 1 && buffer[i] === ',' && i < buffer.length - 1) {
			object[objectProperty] = objectValue;
			objectProperty = null;
			objectValue = null;
			valueStartIndex = 0;
		} else if (i > 1 && buffer[i] === '}') {
			if (
				(i > 1 && buffer[i - 1] === '"' && i < buffer.length - 1) ||
				(i > 1 &&
					buffer[i - 4] + buffer[i - 3] + buffer[i - 2] + buffer[i - 1] ===
						'true' &&
					i < buffer.length - 1) ||
				(i > 1 &&
					buffer[i - 5] +
						buffer[i - 4] +
						buffer[i - 3] +
						buffer[i - 2] +
						buffer[i - 1] ===
						'false' &&
					i < buffer.length - 1)
			) {
				if (objectValue === 'true') {
					object[objectProperty] = true;
				} else {
					object[objectProperty] = false;
				}
			}
			result.push(object);
			object = {};
			objectProperty = null;
			objectValue = null;
			valueStartIndex = 0;
		}
	}
	return result;
};

module.exports = arrayOfObjectsHandler;

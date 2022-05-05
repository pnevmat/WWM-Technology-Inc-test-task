const Joi = require('joi');

// interface UsersListType {
// 	userName: string;
// 	fullName: string;
// 	lastLogin: string;
// 	enabled: boolean;
// }

const schemaCreateUser = Joi.object({
	userName: Joi.string().alphanum().min(1).max(15).required(),
	fullName: Joi.string().min(3).max(40).required(),
	lastLogin: Joi.string().min(3).required(),
	enabled: Joi.boolean(),
	// email: Joi.string()
	// 	.email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
	// 	.required(),
	// phone: Joi.string().pattern(new RegExp('^[0-9]{3,30}$')).required(),
});

const validate = (schema, body, next) => {
	const {error} = schema.validate(body);
	if (error) {
		const [{message}] = error.details;
		return next({
			code: 400,
			message: `${message.replace(/"/g, '')}`,
		});
	}
	next();
};

module.exports.validateCreateUser = (req, res, next) => {
	return validate(schemaCreateUser, req.body, next);
};

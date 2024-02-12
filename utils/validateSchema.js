const Joi = require("joi");

const signUpBodyValidation = (body) => {
	const schema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		userRole:Joi.string().optional(),
	});
	return schema.validate(body);
};

const logInBodyValidation = (body) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(body);
};

const verifyTokenBodyValidation = (body) => {
	const schema = Joi.object({
		token: Joi.string().required().label("Token"),
		email:Joi.string().email().required().label("Email"),
		password:Joi.string().required().label("Password"),
	});
	return schema.validate(body);
};

const forgotPasswordBodyValidation=(body)=>{
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
	});
	return schema.validate(body);
}

module.exports= {
	signUpBodyValidation,
	logInBodyValidation,
	verifyTokenBodyValidation,
	forgotPasswordBodyValidation
};
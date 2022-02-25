import Joi from "joi";

const signInSchemaValidator = Joi.object({
  email: Joi
    .string()
    .email()
    .message("Email is required and must be an email"),
  password: Joi
    .string()
    .required()
});

export default signInSchemaValidator;

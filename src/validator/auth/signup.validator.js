import Joi from "joi";

const signUpSchemaValidator = Joi.object({
  firstname: Joi
    .string()
    .required()
    .min(3)
    .message(
      "Firstname is required and must be a string of 3 characters minimum"
    ),
  lastname: Joi
    .string()
    .required()
    .min(3)
    .message(
      "Lastname is required and must be a string of 3 characters minimum"
    ),
  email: Joi
    .string()
    .email()
    .message("Email is required and must be an email"),
  mobileNo: Joi
    .string()
    .required()
    .pattern(/^\+[1-9]{1}[0-9]{3,14}$/)
    .message('Mobile No must match the format +86415555267'), // should only match phone no of not more than 14 character including the a "+" symbol and country coder
  country: Joi
    .string()
    .required(),
  password: Joi
    .string()
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/)
    .message(
      "Password must contain 1 or more special characters, uppercase letters, lowercase letters"
    ),
  confirmPassword: Joi.ref("password")
});

export default signUpSchemaValidator;

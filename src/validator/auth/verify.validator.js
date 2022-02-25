import Joi from "joi";


const verificationTokenValidator = Joi.string().required()

export default verificationTokenValidator
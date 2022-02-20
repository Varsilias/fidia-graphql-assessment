import { ApolloError } from "apollo-server-core";
import signUpSchemaValidator from "../../validator/auth/signup.validator";
import authController from "../controllers/auth.controller";

const resolvers = {
  Query: {
    getAllUsers: async () => await authController.getUsers(),
  },

  Mutation: {
    createUser: async (parent, args) => {
      try {
        const value  = await signUpSchemaValidator.validateAsync(args, { abortEarly: false })
        return authController.createUser(value)
      } catch (error) {

        if (error === undefined) {
          return
        }
        const errorsArray = error.details.map(({ message, context }) => ({ field: context.label, errorMessage: message }))
        for (let i = 0; i <= errorsArray.length; i++) {
          console.log(errorsArray[i]);
          throw new ApolloError(errorsArray[i].errorMessage, 'BAD_USER_INPUT')
        }

      }
    }
  }
};

export default resolvers
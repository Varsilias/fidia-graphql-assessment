import { ApolloError } from "apollo-server-core";
import signUpSchemaValidator from "../../validator/auth/signup.validator";
import authService from "../services/auth.service";
import { dateScalar } from "../scalars/date.scalar";
import verificationTokenValidator from "../../validator/auth/verify.validator";
import signInSchemaValidator from '../../validator/auth/signin.validator'

const resolvers = {
  Query: {
    getAllUsers: async () => await authService.getUsers(),
  },

  Mutation: {
    signUp: async (_, { SignupInput }) => {
      try {
        const value = await signUpSchemaValidator.validateAsync(SignupInput, {
          abortEarly: false,
        });
        return authService.signUp(value);
      } catch (error) {
        if (error === undefined) {
          return;
        }
        const errorsArray = error.details.map(({ message, context }) => ({
          field: context.label,
          errorMessage: message,
        }));
        for (let i = 0; i <= errorsArray.length; i++) {
          throw new ApolloError(errorsArray[i].errorMessage, "BAD_USER_INPUT");
        }
      }
    },

    verifyEmail: async (_, { verificationToken } ) => {
      try {
        const value = await verificationTokenValidator.validateAsync(verificationToken)
        return authService.verifyEmail(value)
      } catch (error) {
        // console.log(error)

        if(error === undefined) return
        const errorsArray = error.details.map(({ message, context }) => ({
          field: context.label,
          errorMessage: message,
        }));
        for (let i = 0; i <= errorsArray.length; i++) {
          throw new ApolloError(errorsArray[i].errorMessage, "BAD_USER_INPUT");
        }
      }
    },

    resendVerificationEmail: async(_, { oldToken }) => {
      try {
        const value = await verificationTokenValidator.validateAsync(oldToken)
        return authService.resendVerificationEmail(value)
      } catch (error) {
        if(error === undefined) return
        const errorsArray = error.details.map(({ message, context }) => ({
          field: context.label,
          errorMessage: message,
        }));
        for (let i = 0; i <= errorsArray.length; i++) {
          throw new ApolloError(errorsArray[i].errorMessage, "BAD_USER_INPUT");
        }
      }
    },

    login: async (_, { LoginInput }) => {
      try {
        const values = await signInSchemaValidator.validateAsync(LoginInput, { abortEarly: false })
        return authService.login(values)

      } catch (error) {
        if(error === undefined) return
        const errorsArray = error.details.map(({ message, context }) => ({
          field: context.label,
          errorMessage: message,
        }));
        for (let i = 0; i <= errorsArray.length; i++) {
          throw new ApolloError(errorsArray[i].errorMessage, "BAD_USER_INPUT");
        }
      }
    }

  },

  

  Date: dateScalar
};

export default resolvers;

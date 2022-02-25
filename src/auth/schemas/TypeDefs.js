import { gql } from "apollo-server-express";

const typeDefs = gql`

  # Scalars
  scalar Date

  # Types

  type User {
    id: ID
    firstname: String!
    lastname: String!
    email: String!
    mobileNo: String!
    country: String!
    emailVerified: String!
    password: String
    confirmPassword: String
    createdAt: Date
    updatedAt: Date
  }

  type SuccessResponse {
    message: String!
    user: User!
  }

  type LoginPayload {
    token: String!
    user: User!
  }

  # Queries

  type Query {
    getAllUsers: [User!]!
  }

  # Mutations

  type Mutation {
    signUp(
      SignupInput: SignupInput!
    ): SuccessResponse!

    verifyEmail(verificationToken: String!): SuccessResponse!

    resendVerificationEmail(oldToken: String!): SuccessResponse!

    login(LoginInput: LoginInput!): LoginPayload!
  }

  input SignupInput {
    firstname: String!
    lastname: String!
    email: String!
    mobileNo: String!
    country: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;

import { gql } from "apollo-server-express";

const typeDefs = gql`
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
    createdAt: String
    updatedAt: String
  }

  # Queries

  type Query {
    getAllUsers: [User!]!
  }

  # Mutations

  type Mutation {
    createUser(
      firstname: String!
      lastname: String!
      email: String!
      mobileNo: String!
      country: String!
      password: String!
      confirmPassword: String!
    ): User!
  }
`;

export default typeDefs;

import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    login(email: String!, password: String!): Account!
  }

  extend type Mutation {
    signUp(email: String!, password: String!, password: String!, passwordConfirmation: String!): Account!
  }

  type Account {
    accessToken: String!
    name: String!
  }
`;

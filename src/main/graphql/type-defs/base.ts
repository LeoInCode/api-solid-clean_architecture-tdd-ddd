import { gql } from 'apollo-server-express';

export default gql`
  scalar DateTime

  type Query {
    _: String
  }

  type Muttion {
    _: String
  }
`;

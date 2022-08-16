import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import resolvers from '@/main/graphql/resolvers';
import typeDefs from '@/main/graphql/type-defs';

const setApolloServer = async (app: Express): Promise<void> => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
  });
  await server.start();
  server.applyMiddleware({ app });
};

export default setApolloServer;

import express, { Express } from 'express';
import setupMiddlewares from './middlewares';
import setupRoutes from './routes';
import setupSwagger from './swagger';
import { setupApolloServer } from '@/main/graphql/apollo/';

export const setupApp = async (): Promise<Express> => {
  const app = express();
  setupSwagger(app);
  setupMiddlewares(app);
  setupRoutes(app);
  const server = await setupApolloServer();
  await server.start();
  server.applyMiddleware({ app });
  return app;
};

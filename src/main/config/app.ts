import express from 'express';
import setupMiddlewares from './middlewares';
import setupRoutes from './routes';
import setupSwagger from './swagger';
import setupApolloServer from './apollo-server';

const app = express();
(async () => {
  await setupApolloServer(app);
})();
setupSwagger(app);
setupMiddlewares(app);
setupRoutes(app);

export default app;

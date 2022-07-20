import { unauthorized, serverError, badRequest, notFound } from './components';
import { loginPath } from './paths';
import { accountSchema, loginParamsSchema, errorSchema } from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Solid Clean Architecture TDD DDD',
    description: 'Projeto desenvolvido seguindo o curso do Rodrigo Mango',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/api',
    },
  ],
  tags: [
    {
      name: 'Login',
    },
  ],
  paths: {
    '/login': loginPath,
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound,
  },
};

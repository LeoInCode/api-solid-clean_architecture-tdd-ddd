import {
  unauthorized,
  serverError,
  badRequest,
  notFound,
  forbidden,
} from './components';
import { loginPath, surveyPath } from './paths';
import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  surveySchema,
  surveysSchema,
  surveyAnswerSchema,
  apiKeyAuthSchema,
} from './schemas';

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
    {
      name: 'Enquete',
    },
  ],
  paths: {
    '/login': loginPath,
    '/surveys': surveyPath,
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    surveyAnswer: surveyAnswerSchema,
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema,
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden,
  },
};

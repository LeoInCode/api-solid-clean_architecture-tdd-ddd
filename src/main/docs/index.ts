import {
  unauthorized,
  serverError,
  badRequest,
  notFound,
  forbidden,
} from './components';
import { loginPath, signUpPath, surveyPath, surveyResultPath } from './paths';
import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  surveySchema,
  surveysSchema,
  surveyAnswerSchema,
  apiKeyAuthSchema,
  signUpParamsSchema,
  addSurveyParamsSchema,
  saveSurveyParamsSchema,
  surveyResultSchema,
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
    '/signup': signUpPath,
    '/surveys': surveyPath,
    '/surveys/{surveyId}/results': surveyResultPath,
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    addSurveyParams: addSurveyParamsSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    surveyAnswer: surveyAnswerSchema,
    signUpParams: signUpParamsSchema,
    saveSurveyResultParams: saveSurveyParamsSchema,
    surveyReuslt: surveyResultSchema,
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

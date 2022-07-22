import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  surveySchema,
  surveysSchema,
  surveyAnswerSchema,
  signUpParamsSchema,
  addSurveyParamsSchema,
  saveSurveyParamsSchema,
  surveyResultSchema,
} from './schemas/';

export default {
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
};

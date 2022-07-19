import {
  SaveSurveyResulParams,
  SurveyResultModel,
} from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols';

export const mockSurveyResultParams = (): SaveSurveyResulParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date(),
});

export const mockSurveyResultModel = (): SurveyResultModel =>
  Object.assign({}, mockSurveyResultParams(), {
    id: 'any_id',
  });

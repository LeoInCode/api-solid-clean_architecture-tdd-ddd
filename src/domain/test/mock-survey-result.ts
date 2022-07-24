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

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_survey_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      count: 1,
      percent: 50,
    },
    {
      answer: 'other_answer',
      image: 'any_image',
      count: 10,
      percent: 80,
    },
  ],
  date: new Date('2022-07-24 00:00:00'),
});

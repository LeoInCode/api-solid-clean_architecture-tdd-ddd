import { SurveyResultModel } from '@/domain/models';
import { SaveSurveyResulParams } from '@/domain/usecases';

export const mockSurveyResultParams = (): SaveSurveyResulParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date(),
});

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      count: 0,
      percent: 0,
      isCurrentAccountAnswer: false,
    },
    {
      answer: 'other_answer',
      image: 'any_image',
      count: 0,
      percent: 0,
      isCurrentAccountAnswer: false,
    },
  ],
  date: new Date(),
});

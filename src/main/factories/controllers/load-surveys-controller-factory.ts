import { makeDbLoadSurvey } from '@/main/factories/usecases';
import { makeLogControllerDecorator } from '@/main/factories/decorators';
import { LoadSurveysController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';

export const makeLoadSurveyController = (): Controller => {
  const surveyController = new LoadSurveysController(makeDbLoadSurvey());
  return makeLogControllerDecorator(surveyController);
};

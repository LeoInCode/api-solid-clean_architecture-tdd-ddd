import { makeDbLoadSurvey } from '@/main/factories/usecases/survey/load-surveys/db-load-surveys-factory';
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller';
import { Controller } from '@/presentation/protocols';

export const makeLoadSurveyController = (): Controller => {
  const surveyController = new LoadSurveysController(makeDbLoadSurvey());
  return makeLogControllerDecorator(surveyController);
};

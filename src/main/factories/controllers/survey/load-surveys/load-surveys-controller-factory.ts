import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller';
import { Controller } from '../../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory';
import { makeDbLoadSurvey } from '../../../usecases/survey/load-surveys/db-load-surveys-factory';

export const makeLoadSurveyController = (): Controller => {
  const surveyController = new LoadSurveysController(makeDbLoadSurvey());
  return makeLogControllerDecorator(surveyController);
};

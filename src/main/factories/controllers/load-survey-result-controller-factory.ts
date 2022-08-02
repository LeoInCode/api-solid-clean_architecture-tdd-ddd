import { makeDbLoadSurveyResult } from '@/main/factories/usecases/db-load-survey-result-factory';
import { makeDbLoadSurveyById } from '@/main/factories/usecases/db-load-survey-by-id-factory';
import { LoadSurveyResultController } from '@/presentation/controllers/load-survey-result-controller';
import { Controller } from '@/presentation/protocols';

export const makeLoadSurveyResultController = (): Controller => {
  const loadSurveyResultController = new LoadSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbLoadSurveyResult(),
  );
  return loadSurveyResultController;
};

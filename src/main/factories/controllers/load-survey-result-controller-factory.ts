import { makeDbLoadSurveyResult } from '@/main/factories/usecases';
import { LoadSurveyResultController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';
import { makeDbCheckSurveyById } from '../usecases/db-check-survey-by-id-factory';

export const makeLoadSurveyResultController = (): Controller => {
  const loadSurveyResultController = new LoadSurveyResultController(
    makeDbCheckSurveyById(),
    makeDbLoadSurveyResult(),
  );
  return loadSurveyResultController;
};

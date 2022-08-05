import { makeDbLoadSurveyResult, makeDbLoadSurveyById } from '@/main/factories/usecases';
import { LoadSurveyResultController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';

export const makeLoadSurveyResultController = (): Controller => {
  const loadSurveyResultController = new LoadSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbLoadSurveyResult(),
  );
  return loadSurveyResultController;
};

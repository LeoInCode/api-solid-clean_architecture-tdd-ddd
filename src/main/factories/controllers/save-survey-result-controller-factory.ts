import { makeDbSaveSurveyResult } from '@/main/factories/usecases/db-save-survey-result-factory';
import { makeDbLoadSurveyById } from '@/main/factories/usecases/db-load-survey-by-id-factory';
import { SaveSurveyResultController } from '@/presentation/controllers/save-survey-result-controller';
import { Controller } from '@/presentation/protocols';

export const makeSaveSurveyResultController = (): Controller => {
  const saveSurveyResultController = new SaveSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbSaveSurveyResult(),
  );
  return saveSurveyResultController;
};

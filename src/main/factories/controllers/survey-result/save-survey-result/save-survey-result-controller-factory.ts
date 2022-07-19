import { makeDbSaveSurveyResult } from '@/main/factories/usecases/survey-result/save-survey-result/db-save-survey-result-factory';
import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey/load-survey-by-id/db-load-survey-by-id-factory';
import { SaveSarveyResultController } from '@/presentation/controllers/survey-result/save-survey-result/save-survey-result-controller';
import { Controller } from '@/presentation/protocols';

export const makeSaveSurveyResultController = (): Controller => {
  const saveSurveyResultController = new SaveSarveyResultController(
    makeDbLoadSurveyById(),
    makeDbSaveSurveyResult(),
  );
  return saveSurveyResultController;
};

import {
  makeDbSaveSurveyResult,
  makeDbLoadSurveyById,
} from '@/main/factories/usecases';
import { SaveSurveyResultController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';

export const makeSaveSurveyResultController = (): Controller => {
  const saveSurveyResultController = new SaveSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbSaveSurveyResult(),
  );
  return saveSurveyResultController;
};

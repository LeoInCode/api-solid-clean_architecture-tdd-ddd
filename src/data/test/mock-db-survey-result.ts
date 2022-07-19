import { SurveyResultModel } from '@/domain/models/survey-result';
import { SaveSurveyResulParams } from '@/domain/usecases/survey-result/save-survey-result';
import { SaveSurveyResultRepository } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols';
import { mockSurveyResultModel } from '@/domain/test';

export const mockSaveSurveyResultRepository =
  (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
      async save(data: SaveSurveyResulParams): Promise<SurveyResultModel> {
        return new Promise((resolve) => resolve(mockSurveyResultModel()));
      }
    }

    return new SaveSurveyResultRepositoryStub();
  };

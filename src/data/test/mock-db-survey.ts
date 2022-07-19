import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository';
import { LoadSurveyByIdRepository } from '@/data/usecases/survey/load-survey-by-id/load-survey-by-id-protocols';
import { AddSurveyRepository } from '@/data/usecases/survey/add-survey/db-add-survey-protocols';
import { SurveyModel } from '@/domain/models/survey';
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey';
import { mockSurveyModel, mockSurveyModels } from '@/domain/test';

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(surveyData: AddSurveyParams): Promise<void> {
      return Promise.resolve();
    }
  }

  return new AddSurveyRepositoryStub();
};

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel());
    }
  }
  return new LoadSurveyByIdRepositoryStub();
};

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll(): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveyModels());
    }
  }
  return new LoadSurveysRepositoryStub();
};

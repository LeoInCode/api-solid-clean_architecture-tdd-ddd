import {
  LoadSurveysRepository,
  AddSurveyRepository,
  LoadSurveyByIdRepository,
  CheckSurveyByIdRepository,
} from '@/data/protocols';
import { SurveyModel } from '@/domain/models';
import { LoadAnswersBySurvey } from '@/domain/usecases';
import { mockSurveyModel, mockSurveyModels } from '@/tests/domain/mocks';

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(surveyData: AddSurveyRepository.Params): Promise<void> {
      return Promise.resolve();
    }
  }

  return new AddSurveyRepositoryStub();
};

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById(id: string): Promise<LoadSurveyByIdRepository.Result> {
      return Promise.resolve(mockSurveyModel());
    }
  }
  return new LoadSurveyByIdRepositoryStub();
};

export const mockLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
  class LoadAnswersBySurveyStub implements LoadAnswersBySurvey {
    async loadAnswers(id: string): Promise<LoadAnswersBySurvey.Result> {
      const survey = mockSurveyModel();
      return Promise.resolve(survey.answers.map((a) => a.answer));
    }
  }
  return new LoadAnswersBySurveyStub();
};

export const mockCheckSurveyByIdRepository = (): CheckSurveyByIdRepository => {
  class CheckSurveyByIdRepositoryStub implements CheckSurveyByIdRepository {
    async checkById(id: string): Promise<CheckSurveyByIdRepository.Result> {
      return Promise.resolve(true);
    }
  }
  return new CheckSurveyByIdRepositoryStub();
};

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll(): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveyModels());
    }
  }
  return new LoadSurveysRepositoryStub();
};

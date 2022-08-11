import { SurveyModel } from '@/domain/models';
import { AddSurvey, LoadSurveys, LoadAnswersBySurvey, CheckSurveyById } from '@/domain/usecases';
import { mockSurveyModel, mockSurveyModels } from '@/tests/domain/mocks';

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    add(data: AddSurvey.Params): Promise<void> {
      return Promise.resolve();
    }
  }
  return new AddSurveyStub();
};

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(accountId: string): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveyModels());
    }
  }
  return new LoadSurveysStub();
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

export const mockCheckSurveyById = (): CheckSurveyById => {
  class CheckSurveyByIdStub implements CheckSurveyById {
    async checkById(id: string): Promise<CheckSurveyById.Result> {
      return Promise.resolve(true);
    }
  }
  return new CheckSurveyByIdStub();
};

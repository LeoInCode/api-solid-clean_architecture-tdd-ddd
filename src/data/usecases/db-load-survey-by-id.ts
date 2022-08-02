import {
  LoadSurveyByIdRepository,
  SurveyModel,
  LoadSurveyById,
} from './survey/load-survey-by-id/load-survey-by-id-protocols';

export class DbLoadSurveyById implements LoadSurveyById {
  constructor(
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository,
  ) {}

  async loadById(id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(id);
    return survey;
  }
}

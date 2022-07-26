import {
  SaveSurveyResulParams,
  SaveSurveyResult,
  SaveSurveyResultRepository,
  SurveyResultModel,
  LoadSurveyResultRepository,
} from './db-save-survey-result-protocols';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
  ) {}

  async save(data: SaveSurveyResulParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data);
    const serveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      data.surveyId,
    );
    return serveyResult;
  }
}

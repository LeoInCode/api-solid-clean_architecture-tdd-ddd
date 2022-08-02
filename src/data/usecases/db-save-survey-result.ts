import {
  LoadSurveyResultRepository,
  SaveSurveyResultRepository,
} from '@/data/protocols';
import { SurveyResultModel } from '@/domain/models';
import { SaveSurveyResult, SaveSurveyResulParams } from '@/domain/usecases';

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
  ) {}

  async save(data: SaveSurveyResulParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data);
    const serveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      data.surveyId,
      data.accountId,
    );
    return serveyResult;
  }
}

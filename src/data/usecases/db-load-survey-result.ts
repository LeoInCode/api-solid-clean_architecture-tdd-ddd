import { LoadSurveyResultRepository, LoadSurveyByIdRepository } from '@/data/protocols';
import { SurveyResultModel } from '@/domain/models';
import { LoadSurveyResult } from '@/domain/usecases';

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository,
  ) {}

  async load(surveyId: string, accountId: string): Promise<SurveyResultModel> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId, accountId);
    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepositoryStub.loadById(surveyId);
      surveyResult = {
        surveyId: survey.id,
        question: survey.question,
        date: survey.date,
        answers: survey.answers.map((answer) =>
          Object.assign(answer, {
            count: 0,
            percent: 0,
            isCurrentAccountAnswer: false,
          }),
        ),
      };
    }
    return surveyResult;
  }
}

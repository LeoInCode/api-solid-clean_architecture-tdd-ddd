import { InvalidParamError } from '@/presentation/errors';
import {
  forbidden,
  serverError,
} from '@/presentation/helpers/http/http-helper';
import {
  HttpRequest,
  HttpResponse,
  Controller,
  LoadSurveyById,
  SaveSurveyResult,
} from './save-survey-result-controller-protocols';

export class SaveSarveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const { answer } = httpRequest.body;
      const { accountId } = httpRequest;
      const survey = await this.loadSurveyById.loadById(surveyId);
      if (survey) {
        const answers = survey.answers.map((a) => a.answer);
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'));
        }
        await this.saveSurveyResult.save({
          accountId,
          surveyId,
          answer,
          date: new Date(),
        });
      } else {
        return forbidden(new InvalidParamError('surveyId'));
      }
      return null;
    } catch (error) {
      return serverError(error);
    }
  }
}

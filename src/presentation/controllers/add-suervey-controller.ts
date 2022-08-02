import {
  serverError,
  badRequest,
  noContent,
} from '@/presentation/helpers/http-helper';
import { Controller } from '@/presentation/protocols/controller';
import {
  AddSurvey,
  HttpRequest,
  HttpResponse,
  Validation,
} from './survey/add-survey/add-survey-controller-protocols';

export class AddSurveyController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const { question, answers } = httpRequest.body;

      await this.addSurvey.add({ question, answers, date: new Date() });

      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

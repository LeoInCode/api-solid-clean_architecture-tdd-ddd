import {
  HttpRequest,
  HttpResponse,
  Validation,
} from './add-survey-controller-protocols';
import { Controller } from '../../../protocols/controller';
import { badRequest } from '../../../helpers/http/http-helper';

export class AddSurveyController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body);
    if (error) {
      return badRequest(error);
    }
    return new Promise((resolve) => resolve(null));
  }
}

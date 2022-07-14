import { serverError, badRequest } from '../../helpers/http-helper';
import { EmailValidator } from '../../protocols/email-validator';
import { InvalidParamError, MissingParamError } from '../../errors';

import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;
      if (!email) {
        return badRequest(new MissingParamError('email'));
      }
      if (!password) {
        return badRequest(new MissingParamError('password'));
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamError('password'));
      }
    } catch (error) {
      return serverError(error);
    }
  }
}

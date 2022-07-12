import MissingParamError from '../errors/missing-param-error';
import { HttpResponse, HttpRequest } from '../protocols/http';
import badRequest from '../helpers/http-helper';

class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'));
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'));
    }
  }
}

export default SignUpController;

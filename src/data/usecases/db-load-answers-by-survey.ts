import { LoadAnswersBySurvey } from '@/domain/usecases';

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor(private readonly loadAnswersBySurveyRepository: LoadAnswersBySurvey) {}

  async loadAnswers(id: string): Promise<LoadAnswersBySurvey.Result> {
    const answers = await this.loadAnswersBySurveyRepository.loadAnswers(id);
    return answers;
  }
}

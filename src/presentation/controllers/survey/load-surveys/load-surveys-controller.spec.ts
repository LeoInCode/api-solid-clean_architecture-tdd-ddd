import MockDate from 'mockdate';
import { LoadSurveys, SurveyModel } from './load-survey-controller-protocols';
import { LoadSurveysController } from './load-surveys-controller';

const makeFakeSurveys = (): SurveyModel[] => {
  return [
    {
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer',
        },
      ],
      date: new Date(),
    },
    {
      question: 'other_question',
      answers: [
        {
          image: 'other_image',
          answer: 'other_answer',
        },
      ],
      date: new Date(),
    },
  ];
};

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveys', () => {
    class LoadSurveysStub implements LoadSurveys {
      async load(): Promise<SurveyModel[]> {
        return new Promise((resolve) => resolve(makeFakeSurveys()));
      }
    }
    const loadSurveysStub = new LoadSurveysStub();
    const sut = new LoadSurveysController(loadSurveysStub);
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');
    sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });
});

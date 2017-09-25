import factory from 'factory-girl';
import faker from 'faker';
import User from '../../app/models/user';
import Game from '../../app/models/game';
import Match from '../../app/models/match';

factory.define('user', User, {
  nickname: () => faker.name.firstName().replace("'",'-') +
                  faker.random.number(1000) +
                  faker.name.lastName().replace("'",'-') + 
                  faker.random.number(1000),
  email: () => faker.name.firstName().replace("'",'-') +
               faker.random.number(1000) +
               faker.internet.email(),
  password: () => faker.internet.password(15)
});

factory.define('game', Game, {
  name: () => faker.name.firstName().replace("'",'-') +
              faker.random.number(1000) +
              faker.name.lastName().replace("'",'-') + 
              faker.random.number(1000),
  description: () => faker.lorem.sentence(),
  rating: () => faker.random.number(5),
  timesPlayed: () => faker.random.number(20),
  creator: () => faker.name.findName(),
  "questions": fakeQuestions(),
  "tags": [
    "bla",
    "you just lost the game"
  ],
  "ranking": [],
  "creationDate": () => faker.date.past(),
  "image": "fake base64"
});

factory.define('match', Match, {
  url: () => faker.name.firstName().replace("'",'-') +
             faker.random.number(1000) +
             faker.name.lastName().replace("'",'-') + 
             faker.random.number(1000),
  isRealTime: () => faker.random.boolean(),
  players: [
    () => faker.internet.userName(),
    () => faker.internet.userName()
  ],
  owner: () => faker.fake('{{name.firstName}} {{name.lastName}}'),
  endingDate: () => faker.date.future(),
  game: {
    name: () => faker.name.firstName().replace("'",'-') + 
                faker.random.number(1000) +
                faker.name.lastName().replace("'",'-') + 
                faker.random.number(1000),
    description: () => faker.lorem.sentence(),
    rating: () => faker.random.number(5),
    timesPlayed: () => faker.random.number(),
    creator: () => faker.fake('{{name.firstName}} {{name.lastName}}'),
    questions: fakeQuestions(),
    tags: [
      () => faker.random.word(),
      () => faker.random.word()
    ],
    ranking: [{
      user: () => faker.internet.userName(),
      points: () => faker.random.number()
    }],
    endingDate: () => faker.date.past(),
    image: () => faker.image.imageUrl()
  },
  result: [
    () => faker.random.number(),
    () => faker.random.number()
  ]
});

function fakeQuestions() {
  let question, questionSet = [];
  for (let i = 0; i < 4; i++) {
    question = {
      text: () => faker.lorem.sentence(),
      difficulty: () => faker.random.arrayElement(["Easy", "Medium", "Hard"]),
      answers: [
        {answer: faker.lorem.sentence()},
        {answer: faker.lorem.sentence()},
        {answer: faker.lorem.sentence()},
        {answer: faker.lorem.sentence()}
      ],
      correctAnswer: () => faker.random.number({
        min: 0,
        max: 3
      })
    }
    questionSet.push(question);
  }
  return questionSet;
}

export default factory;

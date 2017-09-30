import factory from 'factory-girl';
import faker from 'faker';
import User from '../../app/models/user';
import Game from '../../app/models/game';
import Match from '../../app/models/match';

factory.define('user', User, {
  nickname: () => faker.name.firstName().replace("'",'-') +
                  faker.random.number(1000) +
                  faker.name.lastName().replace("'",'-'),
  email: () => faker.name.firstName().replace("'",'-') +
               faker.random.number(1000) +
               faker.internet.email(),
  password: () => faker.internet.password(15)
});

var questGame = faker.random.number(30);

factory.define('game', Game, {
  name: () => faker.name.firstName().replace("'",'-') +
              faker.random.number(1000) +
              faker.name.lastName().replace("'",'-'),
  description: () => faker.lorem.sentence(),
  rating: () => faker.random.number(5),
  creator: () => faker.name.findName(),
  "questions": fakeQuestions(questGame),
  "tags": [
    "bla",
    "you just lost the game"
  ],
  "ranking": [],
  "creationDate": () => faker.date.past(),
  "image": "fake base64"
});

factory.define('gameMore', Game, {
  name: () => faker.name.firstName().replace("'",'-') +
              faker.random.number(1000) +
              faker.name.lastName().replace("'",'-'),
  description: () => faker.lorem.sentence(),
  rating: () => faker.random.number(5),
  creator: () => faker.name.findName(),
  "questions": fakeQuestions(31),
  "tags": [
    "bla",
    "you just lost the game"
  ],
  "ranking": [],
  "creationDate": () => faker.date.past(),
  "image": "fake base64"
});

var questMatch = faker.random.number(30);

factory.define('match', Match, {
  url: () => faker.name.firstName().replace("'",'-') +
             faker.random.number(1000) +
             faker.name.lastName().replace("'",'-'),
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
                faker.name.lastName().replace("'",'-'),
    description: () => faker.lorem.sentence(),
    rating: () => faker.random.number(5),
    timesPlayed: () => faker.random.number(),
    creator: () => faker.fake('{{name.firstName}} {{name.lastName}}'),
    questions: fakeQuestions(questMatch),
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
  result: [{
      user: () => faker.internet.userName(),
      points: () => faker.random.number()
    }],
});

function fakeQuestions(cantQuest) {
  let question, questionSet = [];
  for (let i = 0; i < cantQuest; i++) {
    question = {
      text: () => faker.lorem.sentence(),
      difficulty: () => faker.random.arrayElement(["Easy", "Medium", "Hard"]),
      hint: () => faker.lorem.sentence(), 
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

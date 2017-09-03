import factory from 'factory-girl';
import faker from 'faker';
import User from '../../app/models/user';
import Game from '../../app/models/game';
import Match from '../../app/models/match';

factory.define('user', User, {
    email: () => faker.internet.email(),
    password: () => faker.internet.password()
});

factory.define('game', Game, {
    name: faker.name.findName(),
    description: "Great game",
    rating: () => faker.random.number(100),
    timesPlayed: () => faker.random.number(20),
    creator: () => faker.name.findName(),
    "questions": [{
        "text": "Who is the best?",
        "difficulty": "easy",
        "correctAnswer": 0,
        "_id": "59a9c900b8f51d245cbf034e",
        "answers": [
            () => faker.name.findName()
        ]
    }],
    "tags": [
        "bla",
        "you just lost the game"
    ],
    "ranking": [],
    "creationDate": () => faker.date.past(),
    "image": "fake base64"
});

factory.define('match', Match, {
    isRealTime: () => faker.random.boolean(),
    players: ['player1', 'player2', 'player3'],
    owner: () => faker.fake('{{name.firstName}} {{name.lastName}}'),
    endingDate: () => faker.date.future(),
    game: {
        // id: { type: () => faker.random.number },
        name: () => faker.fake('{{name.firstName}} {{name.lastName}}'),
        description: () => faker.lorem.sentence(),
        rating: () => faker.random.number(),
        timesPlayed: () => faker.random.number(),
        creator: () => faker.fake('{{name.firstName}} {{name.lastName}}'),
        questions: [
            {
                // id: { type: () => faker.random.number() },
                text: () => faker.lorem.sentence(),
                difficulty: () => faker.random.arrayElement(["low", "medium", "high"]),
                answers: ['resp1', 'resp2', 'resp3', 'resp4'],
                correctAnswer: () => faker.random.number({ min:1, max:4 })
            },
            {
                text: () => faker.lorem.sentence(),
                difficulty: () => faker.random.arrayElement(["low", "medium", "high"]),
                answers: ['resp1', 'resp2', 'resp3', 'resp4'],
                correctAnswer: () => faker.random.number({ min:1, max:4 })
            },
            {
                text: () => faker.lorem.sentence(),
                difficulty: () => faker.random.arrayElement(["low", "medium", "high"]),
                answers: ['resp1', 'resp2', 'resp3', 'resp4'],
                correctAnswer: () => faker.random.number({ min:1, max:4 })
            },
            {
                text: () => faker.lorem.sentence(),
                difficulty: () => faker.random.arrayElement(["low", "medium", "high"]),
                answers: ['resp1', 'resp2', 'resp3', 'resp4'],
                correctAnswer: () => faker.random.number({ min:1, max:4 })
            }],
        tags: ['tag1', 'tag2', 'tag3'],
        ranking: [{
            user: () => faker.internet.userName(),
            points: () => faker.random.number()
        }],
        endingDate: () => faker.date.past(),
        image: () => faker.image.imageUrl()
    },
    result: [1, 2, 3]
});

export default factory;

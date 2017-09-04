import factory from 'factory-girl';
import faker from 'faker';
import User from '../../app/models/user';
import Game from '../../app/models/game';

factory.define('user', User,
{
	email: () => faker.internet.email(),
	password: () => faker.internet.password()
}
);

factory.define('game', Game, {
	name: faker.name.findName(),
	description: "Great game",
	rating: () => faker.random.number(100),
	timesPlayed: () => faker.random.number(20),
	creator: () => faker.name.findName(),
	"questions": [
	{
		"text": "Who is the best?",
		"difficulty": "easy",
		"correctAnswer": 0,
		"_id": "59a9c900b8f51d245cbf034e",
		"answers": [
		() => faker.name.findName()
		]
	}
	],
	"tags": [
	"bla",
	"you just lost the game"
	],
	"ranking": [],
	"creationDate": () => faker.date.past(),
	"image": "fake base64"
});

export default factory;

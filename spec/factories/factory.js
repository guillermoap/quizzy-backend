import factory from 'factory-girl';
import User from '../../app/models/user';
import faker from 'faker';

factory.define('user', User,
  {
    email: () => faker.internet.email(),
    password: () => faker.internet.password()
  }
);

export default factory;

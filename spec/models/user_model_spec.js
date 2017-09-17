import chai, {
  expect,
  request
} from 'chai';
import chaiHttp from 'chai-http';
import factory from '../factories/factory.js';
import app from '../../server.js';
import mongoose from 'mongoose';
import User from '../../app/models/user';

chai.use(chaiHttp);

describe('UsersModel', () => {
  var user;
  var user2;
  var user3;
  var user4;
  var user5;
  var user6;
  var userWithoutNick;
  var userDupNick;
  var userInvalidNick; 
  var userWithoutEmail;
  var userDupEmail;
  var userInvalidEmail;
  var userWithoutPass;
  var countBefore;

  beforeEach(function(done) {
    factory.createMany('user', 2, [{
      email: 'jose2017@spec.com', nickname: 'jose2017'
    }, {
      email: 'juan2017@spec.com', nickname: 'juan2017'
    }])
    .then(userArray => {
      user = userArray[0];
      user2 = userArray[1];
      done();
    });
  });

  afterEach(function(done) {
    User.remove({}, function() {
      done();
    });
  });
   
  factory.attrsMany('user', 11, [{
    nickname: null
  }, {
    nickname: 'juan2017'
  }, {
    nickname: 'sebas--'
  }, {
    email: null
  }, {
    email: 'jose2017@spec.com'
  }, {
    email: 'jose2017$$@spec.com'
  }, {
    password: null
  }, {
    nickname: 'juan_perez'
  }, {
    nickname: 'juan'
  }, {
    nickname: '12345'
  }, {
    email: '124512@hotmail.com'
  }])
  .then(userAttrsArray => {
    userWithoutNick = userAttrsArray [0];
    userDupNick = userAttrsArray [1];
    userInvalidNick = userAttrsArray [2];
    userWithoutEmail = userAttrsArray [3];
    userDupEmail = userAttrsArray [4];
    userInvalidEmail = userAttrsArray [5];
    userWithoutPass = userAttrsArray [6];
    user3 = userAttrsArray [7];
    user4 = userAttrsArray [8];
    user5 = userAttrsArray [9];
    user6 = userAttrsArray [10];
  })

  describe('Without nickname', () => {
    it('return correct error', (done) => {
      User.create(userWithoutNick, (err, user) => {
        expect(err).to.match(/you must enter a nickname/);
        done();
      });
    });
    it('dose not create a user', (done) => {
      User.count({}).exec((err, count) => {
        countBefore = count;
      });
      User.create(userWithoutNick);
      User.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Same nickname', () => {
    it('return correct error', (done) => {
      User.create(userDupNick, (err, user) => {
        expect(err).to.match(/E11000 duplicate key error collection: quizzy-backend-test.users index: nickname_1/);
        done();
      });
    });
    it('dose not create a user', (done) => {
      User.count({}).exec((err, count) => {
        countBefore = count;
      });
      User.create(userDupNick);
      User.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Invalid nickname', () => {
    it('return correct error', (done) => {
      User.create(userInvalidNick, (err, user) => {
        expect(err).to.match(/invalid nickname/);
        done();
      });
    });
    it('dose not create a user', (done) => {
      User.count({}).exec((err, count) => {
        countBefore = count;
      });
      User.create(userInvalidNick);
      User.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });
  
  describe('Without email', () => {
    it('return correct error', (done) => {
      User.create(userWithoutEmail, (err, user) => {
        expect(err).to.match(/you must enter a email/);
        done();
      });
    });
    it('dose not create a user', (done) => {
      User.count({}).exec((err, count) => {
        countBefore = count;
      });
      User.create(userWithoutEmail);
      User.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Same email', () => {
    it('return correct error', (done) => {
      User.create(userDupEmail, (err, user) => {
        expect(err).to.match(/E11000 duplicate key error collection: quizzy-backend-test.users index: email_1/);
        done();
      });
    });
    it('dose not create a user', (done) => {
      User.count({}).exec((err, count) => {
        countBefore = count;
      });
      User.create(userDupEmail);
      User.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Invalid email', () => {
    it('return correct error', (done) => {
      User.create(userInvalidEmail, (err, user) => {
        expect(err).to.match(/invalid email/);
        done();
      });
    });
    it('dose not create a user', (done) => {
      User.count({}).exec((err, count) => {
        countBefore = count;
      });
      User.create(userInvalidEmail);
      User.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });
  
  describe('Without password', () => {
    it('return correct error', (done) => {
      User.create(userWithoutPass, (err, user) => {
        expect(err).to.match(/you must enter a password/);
        done();
      });
    });
    it('dose not create a user', (done) => {
      User.count({}).exec((err, count) => {
        countBefore = count;
      });
      User.create(userWithoutPass);
      User.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Nickname wiht "_"', () => {
    it('does not return error', (done) => {
      User.create(user3, (err, user) => {
        expect(err).to.eq(null);
        done();
      });
    });
    it('creates a user', (done) => {
      User.count({}).exec((err, count) => {
        countBefore = count;
      });
      User.create(user3);
      User.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore++);   
      });
      done();
    });
  });

  describe('Nickname with only letters', () => {
    it('does not return error', (done) => {
      User.create(user4, (err, user) => {
        expect(err).to.eq(null);
        done();
      });
    });
    it('creates a user', (done) => {
      User.count({}).exec((err, count) => {
        countBefore = count;
      });
      User.create(user4);
      User.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore++);   
      });
      done();
    });
  });

  describe('Nickname with only numbers', () => {
    it('does not return error', (done) => {
      User.create(user5, (err, user) => {
        expect(err).to.eq(null);
        done();
      });
    });
    it('creates a user', (done) => {
      User.count({}).exec((err, count) => {
        countBefore = count;
      });
      User.create(user5);
      User.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore++);   
      });
      done();
    });
  });

  describe('Email with only numbers', () => {
    it('does not return error', (done) => {
      User.create(user6, (err, user) => {
        expect(err).to.eq(null);
        done();
      });
    });
    it('creates a user', (done) => {
      User.count({}).exec((err, count) => {
        countBefore = count;
      });
      User.create(user6);
      User.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore++);   
      });
      done();
    });
  });
});
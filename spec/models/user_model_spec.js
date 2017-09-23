import chai, {
  expect
} from 'chai';
import factory from '../factories/factory.js';
import app from '../../server.js';
import mongoose from 'mongoose';
import User from '../../app/models/user';

describe('UsersModel', () => {
  var user;
  var user2;
  var user3;
  var user4;
  var user5;
  var user6;
  var user7;
  var user8;
  var userWithoutNick;
  var userDupNick;
  var userInvalidNick; 
  var userWithoutEmail;
  var userDupEmail;
  var userInvalidEmail;
  var userWithoutPass;
  var userinvalidPass;
  var userinvalidPass2;
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
   
  factory.attrsMany('user', 15, [{
    nickname: null
  }, {
    nickname: 'Juan2017'
  }, {
    nickname: 'sebas$^f'
  }, {
    email: null
  }, {
    email: 'jose2017@spec.com'
  }, {
    email: 'jose2017$$@spec.com'
  }, {
    password: null
  }, {
    nickname: 'juan_perez-3'
  }, {
    nickname: 'juan'
  }, {
    nickname: '12345'
  }, {
    email: '124512@hotmail.com'
  }, {
    password: '234123asad'
  }, {
    password: 'Assd34342-45'
  }, {
    password: 'adadasdqdasd'
  }, {
    password: 'A25245729842'  
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
    userinvalidPass = userAttrsArray[11];
    userinvalidPass2 = userAttrsArray[12];
    user7 = userAttrsArray[13];
    user8 = userAttrsArray[14];
  });

  afterEach(function(done) {
    User.remove({}, function() {
      done();
    });
  });

  describe('Without nickname', () => {
    it('returns correct error and does not create a user1', (done) => {
      User.create(userWithoutNick, (err, user) => {
        expect(err).to.match(/you must enter a nickname/);
        User.count({}).exec((err, count) => {
          expect(count).to.eq(2); 
          done();
        });
      });
    });
  });

  describe('Same nickname', () => {
    it('returns correct error and does not create a user2', (done) => {
      User.create(userDupNick, (err, user) => {
        expect(err).to.match(/E11000 duplicate key error collection: quizzy-backend-test.users index: nickname_1/);
        User.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });  

  describe('Invalid nickname', () => {
    it('returns correct error and does not creat a user3', (done) => {
      User.create(userInvalidNick, (err, user) => {
        expect(err).to.match(/invalid nickname/);
        User.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });
  
  describe('Without email', () => {
    it('returns correct error and does not create a user4', (done) => {
      User.create(userWithoutEmail, (err, user) => {
        expect(err).to.match(/you must enter a email/);
        User.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });

  describe('Same email', () => {
    it('returns correct error and does not create a user5', (done) => {
      User.create(userDupEmail, (err, user) => {
        expect(err).to.match(/E11000 duplicate key error collection: quizzy-backend-test.users index: email_1/);
        User.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });

  describe('Invalid email', () => {
    it('returns correct error and does not create a user6', (done) => {
      User.create(userInvalidEmail, (err, user) => {
        expect(err).to.match(/invalid email/);
        User.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });
  
  describe('Without password', () => {
    it('returns correct error and does not create a user7', (done) => {
      User.create(userWithoutPass, (err, user) => {
        expect(err).to.match(/you must enter a password/);
        User.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });

  describe('Nickname wiht "_" and "-"', () => {
    it('does not returns error and creates a user', (done) => {
      User.create(user3, (err, user) => {
        expect(err).to.eq(null);
        User.count({}).exec((err, count) => {
          expect(count).to.eq(3);   
          done();
        });
      });
    });
  });

  describe('Nickname with only letters', () => {
    it('does not returns error and creates a user', (done) => {
      User.create(user4, (err, user) => {
        expect(err).to.eq(null);
        User.count({}).exec((err, count) => {
          expect(count).to.eq(3);   
          done();
        });
      });
    });
  });

  describe('Nickname with only numbers', () => {
    it('does not returns error and creates a user', (done) => {
      User.create(user5, (err, user) => {
        expect(err).to.eq(null);
        User.count({}).exec((err, count) => {
          expect(count).to.eq(3);   
          done();
        });
      });
    });
  });

  describe('Email with only numbers', () => {
    it('does not returns error and creates a user', (done) => {
      User.create(user6, (err, user) => {
        expect(err).to.eq(null);
        User.count({}).exec((err, count) => {
          expect(count).to.eq(3);   
          done();
        });
      });
    });
  });

  describe('Pasword begins with number', () => {
    it('returns correct error and does not create a user', (done) => {
      User.create(userinvalidPass, (err, user) => {
        expect(err).to.match(/invalid password/);
        User.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });

  describe('Pasword with "-"', () => {
    it('returns correct error and does not create a user', (done) => {
      User.create(userinvalidPass2, (err, user) => {
        expect(err).to.match(/invalid password/);
        User.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });

  describe('Pasword with only letters', () => {
    it('does not returns error and creates a user', (done) => {
      User.create(user7, (err, user) => {
        expect(err).to.eq(null);
        User.count({}).exec((err, count) => {
          expect(count).to.eq(3);   
          done();
        });
      });
    });
  });

  describe('Pasword with only numbers', () => {
    it('does not returns error and creates a user', (done) => {
      User.create(user8, (err, user) => {
        expect(err).to.eq(null);
        User.count({}).exec((err, count) => {
          expect(count).to.eq(3);   
          done();
        });
      });
    });
  });
});

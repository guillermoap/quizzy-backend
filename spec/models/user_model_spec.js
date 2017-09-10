/*import chai, {
  expect,
  request
} from 'chai';
import chaiHttp from 'chai-http';
import factory from '../factories/factory.js';
import app from '../../server.js';
import mongoose from 'mongoose';
import User from '../../app/models/user';

chai.use(chaiHttp);

describe('UsersController', () => {
  var userOk;
  var userWithoutnickname;
  var userWithoutemail;
  var userWithoutpassword;
  var userWithErrorNickname;
  var userWithErrorEmail;
  var userDuplicatedNickname;
  var userDuplicatedEmail;

  beforeEach(function(done) {
    factory.createMany('user', 8, [{
        email: 'pis@spec.com', nickname: 'sebas17'
      }, {
        nickname: null
      }, {
        email: null
      }, {
        password: null
      }, {
        nickname: '$$$$$'
      }, {
        email: '$$$$$'
      }, {
        email: 'pis@spec.com'
      }, {
        nickname: 'sebas'
      }])
      .then(userArray => {
        userOk = userArray[0];
        console.log(userOk);
        userWithoutnickname = userArray[1];
        console.log(userWithoutnickname);
        userWithoutemail = userArray[2];
        userWithoutpassword = userArray[3];
        userWithErrorNickname = userArray[4];
        userWithErrorEmail = userArray[5];
        userDuplicatedNickname = userArray[6];
        userDuplicatedEmail = userArray[7];
        done();
      });
  });

  afterEach(function(done) {
    User.remove({}, function() {
      done();
    });
  });

  describe('create', () => {
    context('with valid params', () => {
      let params;
      factory.attrs('userOk')
        .then(attrs => {
          params = {
            user: attrs
          };
        })

      it('returns 200', (done) => {
        console.log(params),
        request(app).post('/users')
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

      it('creates a user', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/users')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count++);
              done();
            });
        });
      });
    });

    context('with invalid params', () => {
      let params;
      factory.attrs('user', {
          email: 'spec@spec.com'
        })
        .then(attrs => {
          params = {
            user: attrs
          };
        })

      it('returns 400', (done) => {
        request(app).post('/users')
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });

      it('does not create a user', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/users')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count);
              done();
            });
        });
      });
    })
  })
});*/
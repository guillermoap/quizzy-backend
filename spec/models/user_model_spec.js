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
    factory.createMany('user', 1, [{
        email: 'jose2017@spec.com', nickname: 'jose2017'
      }])
      .then(userArray => {
        userOk = userArray[0];
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
      factory.attrs('user')
        .then(attrs => {
          params = {
            user: attrs
          };
        })

      it('returns 200', (done) => {
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

    context('same email', () => {
      let params;
      factory.attrs('user', {
          email: 'jose2017@spec.com'
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
    });

    context('Invalid email', () => {
      let params;
      factory.attrs('user', {
          email: 'jose2017   @spec.com'
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
    });
    context('Without email', () => {
      let params;
      factory.attrs('user', {
          email: null
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
    });
    context('Without nickname', () => {
      let params;
      factory.attrs('user', {
          nickname: null
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
    });
    
    context('Same nickname', () => {
      let params;
      factory.attrs('user', {
          nickname: 'jose2017'
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
            console.log(res.error.text);
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
    });

    context('Invalid nickname', () => {
      let params;
      factory.attrs('user', {
          nickname: '$$hola'
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
    });
    context('Without pasword', () => {
      let params;
      factory.attrs('user', {
          password: null
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
    });


  })
});
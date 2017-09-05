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
  var user;
  var user2;

  beforeEach(function(done) {
    factory.createMany('user', 2, [{
        email: 'spec@spec.com'
      }, {
        email: 'spec2@spec.com'
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

  describe('index', () => {
    it('returns 200', (done) => {
      request(app).get('/users')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('returns the right json object', (done) => {
      request(app).get('/users')
        .end((err, res) => {
          expect(res.body.users[0]).to.have.keys('email', 'pass', 'id');
          done();
        });
    });
  });

  describe('show', () => {
    it('returns 200', (done) => {
      request(app).get(`/users/${user.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('returns the right json object', (done) => {
      request(app).get(`/users/${user.id}`)
        .end((err, res) => {
          expect(res.body.user).to.have.keys('email', 'pass', 'id');
          done();
        });
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
  });

  describe('update', () => {
    context('with valid params', () => {
      let params;
      factory.attrs('user', {
          email: 'new@spec.com'
        })
        .then(attrs => {
          params = {
            user: attrs
          };
        })

      it('returns 200', (done) => {
        request(app).put(`/users/${user.id}`)
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

      it('updates a user', (done) => {
        request(app).put(`/users/${user.id}`)
          .send(params)
          .end((err, res) => {
            User.findById(user.id).lean().exec((err, user) => {
              expect(user.email).to.eq('new@spec.com');
              done();
            });
          });
      });
    });

    context('with invalid params', () => {
      let params;
      factory.attrs('user', {
          email: 'spec2@spec.com'
        })
        .then(attrs => {
          params = {
            user: attrs
          };
        })

      it('returns 400', (done) => {
        request(app).put(`/users/${user.id}`)
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });

      it('does not update a user', (done) => {
        request(app).put(`/users/${user.id}`)
          .send(params)
          .end((err, res) => {
            User.findById(user.id).lean().exec((err, user) => {
              expect(user.email).to.eq('spec@spec.com');
              done();
            });
          });
      });
    });
  });

  describe('destroy', () => {
    it('returns 200', (done) => {
      request(app).delete(`/users/${user.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('deletes the right user', (done) => {
      request(app).delete(`/users/${user.id}`)
        .end((err, res) => {
          User.findById(user.id).lean().exec((err, user) => {
            expect(user).to.eq(null);
            done();
          });
        });
    });
  })
});
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
        nickname: 'spec',
        email: 'spec@spec.com'
      }, {
        nickname: 'spec2',
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
          expect(res.body.users[0]).to.have.keys('nickname', 'email', 'pass', 'id');
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
          expect(res.body.user).to.have.keys('nickname', 'email', 'pass', 'id');
          done();
        });
    });
    //find user who does not exist
    it('returns 404', (done) => {
      request(app).get(`/users/0000000`)
        .end((err, res) => {
          expect(res).to.have.status(404);
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
        request(app).post('/users')
          .send(params)
          .end((err, res) => {
            User.count({}).exec((err, count) => {
              expect(count).to.eq(3);
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
        request(app).post('/users')
          .send(params)
          .end((err, res) => {
            User.count({}).exec((err, count) => {
              expect(count).to.eq(2);
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
    //destroy user who does not exist
    it('returns 400', (done) => {
      request(app).delete(`/users/000000`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  })

  describe('Errors', () => {
    context('more one error', () => {
      var user_1;
      var user_2;
      var user_3;
      var user_4;
      var user_5;
      var user_6;
      var user_7;
      var user_8;
      
      factory.attrsMany('user', 8, [
      {
        email: null,
        nickname: null,
        password: null
      }, {
        email: 'sebas',
        nickname: null,
        password: null
      }, {
        nickname: null,
        password: null
      }, {
        nickname: 'sebas felix',
        password: null
      }, {
        password: null
      }, {
        password: 'as'
      }, {
        email: 'spec@spec.com'
      }, {
        nickname: 'spec'
      }])
      .then(userAttrsArray => {
        user_1 = { user: userAttrsArray[0] };
        user_2 = { user: userAttrsArray[1] };
        user_3 = { user: userAttrsArray[2] };
        user_4 = { user: userAttrsArray[3] };
        user_5 = { user: userAttrsArray[4] };
        user_6 = { user: userAttrsArray[5] };
        user_7 = { user: userAttrsArray[6] };
        user_8 = { user: userAttrsArray[7] };
      })

      it('return correct error', (done) => {
        request(app).post('/users')
          .send(user_1)
          .end((err, res) => {
            expect(res.body.error).to.eq('You must enter an email');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/users')
          .send(user_2)
          .end((err, res) => {
            expect(res.body.error).to.eq('Invalid email');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/users')
          .send(user_3)
          .end((err, res) => {
            expect(res.body.error).to.eq('You must enter a nickname');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/users')
          .send(user_4)
          .end((err, res) => {
            expect(res.body.error).to.eq('Invalid nickname');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/users')
          .send(user_5)
          .end((err, res) => {
            expect(res.body.error).to.eq('You must enter a password');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/users')
          .send(user_6)
          .end((err, res) => {
            expect(res.body.error).to.eq('Invalid password');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/users')
          .send(user_7)
          .end((err, res) => {
            expect(res.body.error).to.eq('The email already exists');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/users')
          .send(user_8)
          .end((err, res) => {
            expect(res.body.error).to.eq('The nickname already exists');
            done();
          });
      });
    });
  });
});

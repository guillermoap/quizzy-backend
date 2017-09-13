import chai, {
  expect,
  request
} from 'chai';
import chaiHttp from 'chai-http';
import factory from '../factories/factory.js';
import app from '../../server.js';
import mongoose from 'mongoose';
import User from '../../app/models/game';

chai.use(chaiHttp);

describe('GamesModel', () => {
  var gameOk;

  beforeEach(function(done) {
    factory.createMany('game', 1, [{
        name: 'Game2017'
      }])
      .then(gameArray => {
        gameOk = gameArray[0];
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
      factory.attrs('game')
        .then(attrs => {
          params = {
            game: attrs
          };
        })

      it('returns 200', (done) => {
        request(app).post('/games')
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

      it('creates a game', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/games')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count++);
              done();
            });
        });
      });
    });

    context('same name', () => {
      let params;
      factory.attrs('game', {
          name: 'Game2017'
        })
        .then(attrs => {
          params = {
            game: attrs
          };
        })

      it('returns 400', (done) => {
        request(app).post('/games')
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.error.text).to.match(/E11000 duplicate key error collection: quizzy-backend-test.games index: name_1/);
            done();
          });
      });

      it('does not create a game', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/games')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count);
              done();
            });
        });
      });
    });
    context('without name', () => {
      let params;
      factory.attrs('game', {
          name: null
        })
        .then(attrs => {
          params = {
            game: attrs
          };
        })

      it('returns 400', (done) => {
        request(app).post('/games')
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.error.text).to.match(/you must enter a name/);
            done();
          });
      });

      it('does not create a game', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/games')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count);
              done();
            });
        });
      });
    });
    context('invalid name', () => {
      let params;
      factory.attrs('game', {
          name: 'Game--2017'
        })
        .then(attrs => {
          params = {
            game: attrs
          };
        })

      it('returns 400', (done) => {
        request(app).post('/games')
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.error.text).to.match(/invalid name/);
            done();
          });
      });

      it('does not create a game', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/games')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count);
              done();
            });
        });
      });
    });
    context('negative rating', () => {
      let params;
      factory.attrs('game', {
          rating: -4
        })
        .then(attrs => {
          params = {
            game: attrs
          };
        })

      it('returns 400', (done) => {
        request(app).post('/games')
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.error.text).to.match(/there must be a correct rating/);
            done();
          });
      });

      it('does not create a game', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/games')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count);
              done();
            });
        });
      });
    });
    context('invalid rating', () => {
      let params;
      factory.attrs('game', {
          rating: 8 
        })
        .then(attrs => {
          params = {
            game: attrs
          };
        })

      it('returns 400', (done) => {
        request(app).post('/games')
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.error.text).to.match(/there must be a correct rating/);
            done();
          });
      });

      it('does not create a game', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/games')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count);
              done();
            });
        });
      });
    });
    context('invalid timesPlayed', () => {
      let params;
      factory.attrs('game', {
          timesPlayed: -10
        })
        .then(attrs => {
          params = {
            game: attrs
          };
        })

      it('returns 400', (done) => {
        request(app).post('/games')
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.error.text).to.match(/timesPlayed must be positive/);
            done();
          });
      });

      it('does not create a game', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/games')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count);
              done();
            });
        });
      });
    });
    context('whitout creator', () => {
      let params;
      factory.attrs('game', {
          creator: null
        })
        .then(attrs => {
          params = {
            game: attrs
          };
        })

      it('returns 400', (done) => {
        request(app).post('/games')
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.error.text).to.match(/must have a creator/);
            done();
          });
      });

      it('does not create a game', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/games')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count);
              done();
            });
        });
      });
    });
    context('whitout questions', () => {
      let params;
      factory.attrs('game', {
          questions: null
        })
        .then(attrs => {
          params = {
            game: attrs
          };
        })

      it('returns 400', (done) => {
        request(app).post('/games')
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.error.text).to.match(/there must be at least one question/);
            done();
          });
      });

      it('does not create a game', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/games')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count);
              done();
            });
        });
      });
    });
    context('ranking whitout points', () => {
      let params;
      factory.attrs('game', {
          ranking: [{user: "sebas"}]
        })
        .then(attrs => {
          params = {
            game: attrs
          };
        })

      it('returns 400', (done) => {
        request(app).post('/games')
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.error.text).to.match(/Path `points` is required/);
            done();
          });
      });

      it('does not create a game', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/games')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count);
              done();
            });
        });
      });
    });
    context('ranking whitout user', () => {
      let params;
      factory.attrs('game', {
          ranking: [{points: 123}]
        })
        .then(attrs => {
          params = {
            game: attrs
          };
        })

      it('returns 400', (done) => {
        request(app).post('/games')
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.error.text).to.match(/Path `user` is required/);
            done();
          });
      });

      it('does not create a game', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/games')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count);
              done();
            });
        });
      });
    });
    context('invalid creationDate', () => {
      let params;
      factory.attrs('game', {
          creationDate: "hola"
        })
        .then(attrs => {
          params = {
            game: attrs
          };
        })

      it('returns 400', (done) => {
        request(app).post('/games')
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.error.text).to.match(/Cast to Date failed/);
            done();
          });
      });

      it('does not create a game', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/games')
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
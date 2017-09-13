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
        name: 'GameQ2017'
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

    context('without text', () => {
      let params;
      factory.attrs('game', {
          questions:[{text: null}] 
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
            expect(res.error.text).to.match(/you must write the question/);
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
    context('invalid dificulty', () => {
      let params;
      factory.attrs('game', {
          questions:[{difficulty: "facil"}] 
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
            expect(res.error.text).to.match(/is not a valid enum value for path `difficulty`/);
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
    context('without answers', () => {
      let params;
      factory.attrs('game', {
          questions:[{answers: null}] 
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
            expect(res.error.text).to.match(/you must write the answers/);
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
    context('less answers', () => {
      let params;
      factory.attrs('game', {
          questions:[{answers: ["ans1", "ans2", "ans3"]}] 
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
            expect(res.error.text).to.match(/Validator failed for path `answers`/);
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
    context('more answers', () => {
      let params;
      factory.attrs('game', {
          questions:[{answers: ["ans1", "ans2", "ans3", "ans4", "ans5"]}] 
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
            expect(res.error.text).to.match(/Validator failed for path `answers`/);
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
    context('invalid correctAnswer (0)', () => {
      let params;
      factory.attrs('game', {
          questions:[{correctAnswer: 0}] 
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
            expect(res.error.text).to.match(/there must be a correct answer/);
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
    context('invalid correctAnswer(5)', () => {
      let params;
      factory.attrs('game', {
          questions:[{correctAnswer: 5}] 
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
            expect(res.error.text).to.match(/there must be a correct answer/);
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
    context('without correctAnswer', () => {
      let params;
      factory.attrs('game', {
          questions:[{correctAnswer: null}] 
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
            expect(res.error.text).to.match(/you must select correct answer/);
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
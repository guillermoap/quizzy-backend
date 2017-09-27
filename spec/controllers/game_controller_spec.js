import chai, {
  expect,
  request
} from 'chai';
import chaiHttp from 'chai-http';
import factory from '../factories/factory.js';
import app from '../../server.js';
import mongoose from 'mongoose';
import Game from '../../app/models/game';

chai.use(chaiHttp);

describe('GameController', () => {
  var game;
  var game2;

  beforeEach(function(done) {
    factory.createMany('game', 2, [{
        name: 'Futbol'
      }, {
        name: 'Basket'
      }])
      .then(gameArray => {
        game = gameArray[0];
        game2 = gameArray[1];
        done();
      });
  });

  afterEach(function(done) {
    Game.remove({}, function() {
      done();
    });
  });

  describe('index', () => {
    it('returns 200', (done) => {
      request(app).get('/games')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('returns the right json object', (done) => {
      request(app).get('/games')
        .end((err, res) => {
          expect(res.body.games[0].game).to.have.keys('id', 'name', 'description', 'rating', 'creator',
            'creationDate', 'image', 'questions', 'ranking', 'tags');
          done();
        });
    });
  });

  describe('show', () => {
    it('returns 200', (done) => {
      request(app).get(`/games/${game.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('returns the right json object', (done) => {
      request(app).get(`/games/${game.id}`)
        .end((err, res) => {
          expect(res.body.game).to.have.keys('id', 'name', 'description', 'rating', 'creator',
            'creationDate', 'image', 'questions', 'ranking', 'tags');
          done();
        });
    });
    //find game that does not exist
    it('returns 404', (done) => {
      request(app).get(`/games/000000`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
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
        Game.count({}).exec((err, count) => {
          request(app).post('/games')
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
      factory.attrs('game', {
          name: 'Futbol'
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
            expect(res).to.have.status(500);
            done();
          });
      });

      it('does not create a game', (done) => {
        Game.count({}).exec((err, count) => {
          request(app).post('/games')
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
      factory.attrs('game', {
          name: 'Golf'
        })
        .then(attrs => {
          params = {
            game: attrs
          };
        })

      it('returns 200', (done) => {
        request(app).put(`/games/${game.id}`)
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

      it('updates a game', (done) => {
        request(app).put(`/games/${game.id}`)
          .send(params)
          .end((err, res) => {
            Game.findById(game.id).lean().exec((err, game) => {
              expect(game.name).to.eq('Golf');
              done();
            });
          });
      });
    });

    context('with invalid params', () => {
      let params;
      factory.attrs('game', {
          name: 'basket'
        })
        .then(attrs => {
          params = {
            game: attrs
          };
        })

      it('returns 400', (done) => {
        request(app).put(`/games/${game.id}`)
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });

      it('does not update a game', (done) => {
        request(app).put(`/games/${game.id}`)
          .send(params)
          .end((err, res) => {
            Game.findById(game.id).lean().exec((err, game) => {
              expect(game.name).to.eq('futbol');
              done();
            });
          });
      });
    });
  });

  describe('destroy', () => {
    it('returns 200', (done) => {
      request(app).delete(`/games/${game.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('deletes the right game', (done) => {
      request(app).delete(`/games/${game.id}`)
        .end((err, res) => {
          Game.findById(game.id).lean().exec((err, game) => {
            expect(game).to.eq(null);
            done();
          });
        });
    });
    //destroy game that does not exist
    it('returns 400', (done) => {
      request(app).delete(`/games/000000`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});

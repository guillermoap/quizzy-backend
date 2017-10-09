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

  describe('Errors', () => {
    context('more one error', () => {
      var game_1;
      var game_2;
      var game_3;
      var game_4;
      var game_5;
      var game_6;
      var game_7;
      var game_8;
      var game_9;
      var game_10;
      var game_11;
      var game_12;
      var game_13;
      var game_14;
      var game_15;
      var game_16;
      var game_17;
      
      factory.attrsMany('game', 16, [
      {
        name: null, 
        rating: -3, 
        creator: null, 
        ranking: [
          {points: 3}, 
          {user: 'user'}
        ], 
        creationDate: 'el dia de hoy',
        questions: null
      }, { //el checkeo de duplicated se realiza al final de todos por defecto
        name: 'basket'
      }, {
        name: '$$$$$', 
        rating: -3, 
        creator: null, 
        ranking: [
          {points: 3}, 
          {user: 'user'}
        ], 
        creationDate: 'el dia de hoy',
        questions: null
      }, { 
        rating: -3, 
        creator: null, 
        ranking: [
          {points: 3}, 
          {user: 'user'}
        ], 
        creationDate: 'el dia de hoy',
        questions: null
      }, {
        creator: null, 
        ranking: [
          {points: 3}, 
          {user: 'user'}
        ], 
        creationDate: 'el dia de hoy',
        questions: null
      }, { 
        ranking: [
          {points: 3}, 
          {user: 'user'}
        ], 
        creationDate: 'el dia de hoy',
        questions: null
      }, {
        ranking: [ 
          {user: 'user'}
        ], 
        creationDate: 'el dia de hoy',
        questions: null
      }, {
        creationDate: 'el dia de hoy',
        questions: null
      }, {
        questions: null
      }, {
        questions: [{
          text: null,
          difficulty: 'Hardly',
          answers: null,
          correctAnswer: null
        }]
      }, {
        questions: [{
          text: 'text',
          difficulty: 'Hardly',
          answers: null,
          correctAnswer: null
        }]
      }, {
        questions: [{
          text: 'text',
          answers: null,
          correctAnswer: null
        }]
      }, {
        questions: [{
          text: 'text',
          correctAnswer: null,
          answers: [{
            answer: 'answer'  
          }]
        }]
      }, {
        questions: [{
          text: 'text',
          correctAnswer: null,
          answers: [{
            answer: '    '      
          }, {
            answer: 'sebas'
          }]
        }]
      }, {
        questions: [{
          text: 'text',
          answers: [{
            answer: 'answer'  
          }, {
            answer: 'answer'
          }],
          correctAnswer: null
        }] 
      }, {
        questions: [{
          text: 'text',
          answers: [{
            answer: 'answer'  
          }, {
            answer: 'answer'
          }],
          correctAnswer: 10
        }] 
      }])
      .then(gameAttrsArray => {
        game_1 = { game: gameAttrsArray[0] };
        game_2 = { game: gameAttrsArray[1] };
        game_3 = { game: gameAttrsArray[2] };
        game_4 = { game: gameAttrsArray[3] };
        game_5 = { game: gameAttrsArray[4] };
        game_6 = { game: gameAttrsArray[5] };
        game_7 = { game: gameAttrsArray[6] };
        game_8 = { game: gameAttrsArray[7] };
        game_9 = { game: gameAttrsArray[8] };
        game_10 = { game: gameAttrsArray[9] };
        game_11 = { game: gameAttrsArray[10] };
        game_12 = { game: gameAttrsArray[11] };
        game_13 = { game: gameAttrsArray[12] };
        game_14 = { game: gameAttrsArray[13] };
        game_15 = { game: gameAttrsArray[14] };
        game_16 = { game: gameAttrsArray[15] };
      })

      it('return correct error', (done) => {
        request(app).post('/games')
          .send(game_1)
          .end((err, res) => {
            expect(res.body.error).to.eq('you must enter a name');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/games')
          .send(game_2)
          .end((err, res) => {
            expect(res.body.error).to.eq('the name already exists');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/games')
          .send(game_3)
          .end((err, res) => {
            expect(res.body.error).to.eq('invalid name');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/games')
          .send(game_4)
          .end((err, res) => {
            expect(res.body.error).to.eq('there must be a correct rating');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/games')
          .send(game_5)
          .end((err, res) => {
            expect(res.body.error).to.eq('must have a creator');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/games')
          .send(game_6)
          .end((err, res) => {
            expect(res.body.error).to.eq('ranking must have a user');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/games')
          .send(game_7)
          .end((err, res) => {
            expect(res.body.error).to.eq('ranking must have a points');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/games')
          .send(game_8)
          .end((err, res) => {
            expect(res.body.error).to.eq('invalid Date');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/games')
          .send(game_9)
          .end((err, res) => {
            expect(res.body.error).to.eq('there must be at least one question');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/games')
          .send(game_10)
          .end((err, res) => {
            expect(res.body.error).to.eq('question can not be empty');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/games')
          .send(game_11)
          .end((err, res) => {
            expect(res.body.error).to.eq('invalid difficluty');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/games')
          .send(game_12)
          .end((err, res) => {
            expect(res.body.error).to.eq('you must write the answers');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/games')
          .send(game_13)
          .end((err, res) => {
            expect(res.body.error).to.eq('there must write between 2 and 6 possibles answers');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/games')
          .send(game_14)
          .end((err, res) => {
            expect(res.body.error).to.eq('answer can not be empty');            
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/games')
          .send(game_15)
          .end((err, res) => {
            expect(res.body.error).to.eq('you must select correct answer');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/games')
          .send(game_16)
          .end((err, res) => {
            expect(res.body.error).to.eq('there must be a correct answer');
            done();
          });
      });
    });
  });
});

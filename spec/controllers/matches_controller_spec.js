import chai, {
  expect,
  request
} from 'chai';
import chaiHttp from 'chai-http';
import factory from '../factories/factory.js';
import app from '../../server.js';
import mongoose from 'mongoose';
import Match from '../../app/models/match';

chai.use(chaiHttp);

describe('MatchesController', () => {
  var match;
  var match2;

  beforeEach(function(done) {
    factory.createMany('match', 2, [{
        url: 'testURL'
      }, {
        url: 'testURL2'
      }])
      .then(matchArray => {
        match = matchArray[0];
        match2 = matchArray[1];
        done();
      })
  });

  afterEach(function(done) {
    Match.remove({}, function() {
      done();
    });
  });

  describe('index', () => {
    it('returns 200', (done) => {
      request(app).get('/matches')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('returns the right json object', (done) => {
      request(app).get('/matches')
        .end((err, res) => {
          expect(res.body.matches[0])
            .to.have.keys('id', 'url', 'isRealTime', 'cantPlayers',
              'owner', 'endingDate', 'game', 'result');
          done();
        });
    });
  });

  describe('show', () => {
    it('returns 200', (done) => {
      request(app).get(`/matches/${match.url}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('returns the right json object', (done) => {
      request(app).get(`/matches/${match.url}`)
        .end((err, res) => {
          expect(res.body.match)
            .to.have.keys('id', 'url', 'isRealTime', 'cantPlayers',
              'owner', 'endingDate', 'game', 'result');
          done();
        });
    });
    //find match that does not exist
    it('returns 404', (done) => {
      request(app).get(`/matches/0000000`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('create', () => {
    context('with valid params', () => {
      let params;
      factory.attrs('match')
        .then(attrs => {
          params = {
            match: attrs
          };
        })

      it('returns 200', (done) => {
        request(app).post('/matches')
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

      it('creates a match', (done) => {
        request(app).post('/matches')
          .send(params)
          .end((err, res) => {
            Match.count({}).exec((err, count) => {
              expect(count).to.eq(3);
              done();
          });
        });
      });
    });

    context('with invalid params', () => {
      let params;
      factory.attrs('match', {
          url: 'testURL'
        })
        .then(attrs => {
          params = {
            match: attrs
          };
        })

      it('returns 400', (done) => {
        request(app).post('/matches')
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });

      it('does not create a match', (done) => {
        request(app).post('/matches')
          .send(params)
          .end((err, res) => {
            Match.count({}).exec((err, count) => {
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
      factory.attrs('match', {
          url: 'updatedURL'
        })
        .then(attrs => {
          params = {
            match: attrs
          };
        })

      it('returns 200', (done) => {
        request(app).put(`/matches/${match.id}`)
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

      it('updates a match', (done) => {
        request(app).put(`/matches/${match.id}`)
          .send(params)
          .end((err, res) => {
            Match.findById(match.id).lean().exec((err, match) => {
              expect(match.url).to.eq('updatedURL');
              done();
            });
          });
      });
    });

    context('with invalid params', () => {
      let params;
      factory.attrs('match', {
          url: 'testurl2'
        })
        .then(attrs => {
          params = {
            match: attrs
          };
        })

      it('returns 400', (done) => {
        request(app).put(`/matches/${match.id}`)
          .send(params)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });

      it('does not update a match', (done) => {
        request(app).put(`/match/${match.id}`)
          .send(params)
          .end((err, res) => {
            Match.findById(match.id).lean().exec((err, match) => {
              expect(match.url).to.eq('testurl');
              done();
            });
          });
      });
    });
  });

  describe('destroy', () => {
    it('returns 200', (done) => {
      request(app).delete(`/matches/${match.id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('deletes the right match', (done) => {
      request(app).delete(`/matches/${match.id}`)
        .end((err, res) => {
          Match.findById(match.id).lean().exec((err, match) => {
            expect(match).to.eq(null);
            done();
          });
        });
    });
    //destroy match that does not exist
    it('returns 400', (done) => {
      request(app).delete(`/matches/000000`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  })

  describe('Errors', () => {
    context('more one error', () => {
      var match_1;
      var match_2;
      var match_3;
      var match_4;
      var match_5;
      var match_6;
      var match_7;
      var match_8;
      var match_9;
      var match_10;
      var match_11;
      
      factory.attrsMany('match', 11, [
      {
        url: null, 
        isRealTime: null,
        cantPlayers: 0,
        owner: null, 
        result: [
          { points: 3 }, 
          { user: 'user' }
        ], 
        endingDate: 'el dia de hoy',
        game: null
      }, {
        url: 's e b a s', 
        isRealTime: null,
        cantPlayers: 0,
        owner: null, 
        result: [
          { points: 3 }, 
          { user: 'user' }
        ], 
        endingDate: 'el dia de hoy',
        game: null
      }, { 
        isRealTime: null,
        cantPlayers: 0,
        owner: null, 
        result: [
          { points: 3 }, 
          { user: 'user' }
        ], 
        endingDate: 'el dia de hoy',
        game: null
      }, {
        owner: null, 
        result: [
          { points: 3 }, 
          { user: 'user' }
        ], 
        endingDate: 'el dia de hoy',
        game: null
      }, { 
        result: [
          { points: 3 }, 
          { user: 'user' }
        ], 
        endingDate: 'el dia de hoy',
        game: null
      }, { 
        result: [
          { user: 'user' }
        ], 
        endingDate: 'el dia de hoy',
        game: null
      }, { 
        endingDate: 'el dia de hoy',
        game: null
      }, {
        game: null
      }, {
        game: { }
      }, {
        url: 'testURL'
      }, { 
        cantPlayers: 0, 
        owner: null, 
        result: [
          { points: 3 }, 
          { user: 'user' }
        ], 
        endingDate: 'el dia de hoy',
        game: null
      }])
      .then(matchAttrsArray => {
        match_1 = { match: matchAttrsArray[0] };
        match_2 = { match: matchAttrsArray[1] };
        match_3 = { match: matchAttrsArray[2] };
        match_4 = { match: matchAttrsArray[3] };
        match_5 = { match: matchAttrsArray[4] };
        match_6 = { match: matchAttrsArray[5] };
        match_7 = { match: matchAttrsArray[6] };
        match_8 = { match: matchAttrsArray[7] };
        match_9 = { match: matchAttrsArray[8] };
        match_10 = { match: matchAttrsArray[9] };
        match_11 = { match: matchAttrsArray[10] };
      })

      it('return correct error', (done) => {
        request(app).post('/matches')
          .send(match_1)
          .end((err, res) => {
            expect(res.body.error).to.eq('You must enter a url');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/matches')
          .send(match_2)
          .end((err, res) => {
            expect(res.body.error).to.eq('Invalid url');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/matches')
          .send(match_3)
          .end((err, res) => {
            expect(res.body.error).to.eq('You must enter a type of match');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/matches')
          .send(match_11)
          .end((err, res) => {
            expect(res.body.error).to.eq('There must be at least two players');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/matches')
          .send(match_4)
          .end((err, res) => {
            expect(res.body.error).to.eq('Must have an owner');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/matches')
          .send(match_5)
          .end((err, res) => {
            expect(res.body.error).to.eq('Result must have a user');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/matches')
          .send(match_6)
          .end((err, res) => {
            expect(res.body.error).to.eq('Result must have points');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/matches')
          .send(match_7)
          .end((err, res) => {
            expect(res.body.error).to.eq('Invalid date');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/matches')
          .send(match_8)
          .end((err, res) => {
            expect(res.body.error).to.eq('There must be a game');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/matches')
          .send(match_9)
          .end((err, res) => {
            expect(res.body.error).to.eq('Error in the definition of the game');
            done();
          });
      });

      it('return correct error', (done) => {
        request(app).post('/matches')
          .send(match_10)
          .end((err, res) => {
            expect(res.body.error).to.eq('The url already exists');
            done();
          });
      });
    });
  });
});

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
        url: 'testURL_2'
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
            .to.have.keys('id', 'url', 'isRealTime', 'players',
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
            .to.have.keys('id', 'url', 'isRealTime', 'players',
              'owner', 'endingDate', 'game', 'result');
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
        Match.count({}).exec((err, count) => {
          request(app).post('/matches')
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
        Match.count({}).exec((err, count) => {
          request(app).post('/matches')
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
          url: 'testURL_2'
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
              expect(match.url).to.eq('testURL');
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
  })

});

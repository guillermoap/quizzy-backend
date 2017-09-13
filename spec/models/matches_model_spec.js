import chai, {
  expect,
  request
} from 'chai';
import chaiHttp from 'chai-http';
import factory from '../factories/factory.js';
import app from '../../server.js';
import mongoose from 'mongoose';
import User from '../../app/models/match';

chai.use(chaiHttp);

describe('MatchesModel', () => {
  var matchOk;

  beforeEach(function(done) {
    factory.createMany('match', 1, [{
        url: 'Match2017'
      }])
      .then(matchArray => {
        matchOk = matchArray[0];
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
        User.count({}).exec((err, count) => {
          request(app).post('/match')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count++);
              done();
            });
        });
      });
    });

    context('without url', () => {
      let params;
      factory.attrs('match', {
          url:null 
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
            expect(res.error.text).to.match(/you must enter a url/);
            done();
          });
      });

      it('does not create a match', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/matches')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count);
              done();
            });
        });
      });
    });

    context('same url', () => {
      let params;
      factory.attrs('match', {
          url: "Match2017"
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
            expect(res.error.text).to.match(/E11000 duplicate key error collection: quizzy-backend-test.matches index: url_1/);
            done();
          });
      });

      it('does not create a match', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/matches')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count);
              done();
            });
        });
      });
    });

    context('invalid url', () => {
      let params;
      factory.attrs('match', {
          url: "match&&"
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
            expect(res.error.text).to.match(/invalid url/);
            done();
          });
      });

      it('does not create a match', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/matches')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count);
              done();
            });
        });
      });
    });

    context('without players', () => {
      let params;
      factory.attrs('match', {
          players: null 
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
            expect(res.error.text).to.match(/there must be at least one player/);
            done();
          });
      });

      it('does not create a match', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/matches')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count);
              done();
            });
        });
      });
    });

    context('without owner', () => {
      let params;
      factory.attrs('match', {
          owner: null 
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
            expect(res.error.text).to.match(/must have a owner/);
            done();
          });
      });

      it('does not create a match', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/matches')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count);
              done();
            });
        });
      });
    });

    context('invalid endingDate', () => {
      let params;
      factory.attrs('match', {
          endingDate: "4 de Julio"
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
            expect(res.error.text).to.match(/Cast to Date failed/);
            done();
          });
      });

      it('does not create a match', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/matches')
            .send(params)
            .end((err, res) => {
              expect(count).to.eq(count);
              done();
            });
        });
      });
    });
    
    context('without game', () => {
      let params;
      factory.attrs('match', {
          game: null
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
            expect(res.error.text).to.match(/there must be a game/);
            done();
          });
      });

      it('does not create a match', (done) => {
        User.count({}).exec((err, count) => {
          request(app).post('/matches')
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
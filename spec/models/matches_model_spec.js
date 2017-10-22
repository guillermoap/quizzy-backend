import chai, {
  expect
} from 'chai';
import factory from '../factories/factory.js';
import app from '../../server.js';
import mongoose from 'mongoose';
import Match from '../../app/models/match';

describe('MatchesModel', () => {
  var match;
  var match2;
  var match3;
  var match4;
  var matchWithoutUrl;
  var matchUrlEmpty;
  var matchDupUrl;
  var matchInvalidUrl;
  var matchWithoutOwner;
  var matchInvalidDate;
  var matchWithoutGame;
  var matchResultWithoutUser;
  var matchResultWithoutPoints;
  var matchInvalidtotalPlayers;

  beforeEach(function(done) {
    factory.createMany('match', 2, [{
      url: 'quizzY2017'
    }, {
      url: 'MatchTest'
    }])
    .then(matchArray => {
      match = matchArray[0];
      match2 = matchArray[1];
      done();
    });
  });

  afterEach(function(done) {
    Match.remove({}, function() {
      done();
    });
  });
   
  factory.attrsMany('match', 12, [{
    url: null
  }, {
    url: '          '
  }, {
    url: 'Quizzy2017'
  }, {
    url: 'sebass%s'
  }, {
    owner: null
  }, {
    endingDate: 'Lunes 20 de Julio de 1999' 
  }, {
    game: null
  }, {
    url: 'Futbol_Uruguayo-2017'
  }, {
    url: '12345'
  }, {
    result: [{ points: 8 }]
  }, {
    result: [{ user: 'sebas' }]
  }, {
    totalPlayers: 1
  }])
  .then(matchAttrsArray => {
    matchWithoutUrl = matchAttrsArray[0];
    matchUrlEmpty = matchAttrsArray[1];
    matchDupUrl = matchAttrsArray[2];
    matchInvalidUrl = matchAttrsArray[3];
    matchWithoutOwner = matchAttrsArray[4];
    matchInvalidDate = matchAttrsArray[5];
    matchWithoutGame = matchAttrsArray[6];
    match3 = matchAttrsArray[7];
    match4 = matchAttrsArray[8];
    matchResultWithoutUser = matchAttrsArray[9];
    matchResultWithoutPoints = matchAttrsArray[10];
    matchInvalidtotalPlayers = matchAttrsArray[11];
  })

  describe('Without url', () => {
    it('returns correct error and does not create a match', (done) => {
      Match.create(matchWithoutUrl, (err, match) => {
        expect(err).to.match(/you must enter a url/);
        Match.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });

  describe('Url empty', () => {
    it('returns correct error and does not create a match', (done) => {
      Match.create(matchUrlEmpty, (err, match) => {
        expect(err).to.match(/you must enter a url/);
        Match.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });

  describe('Same url', () => {
    it('returns correct error and does not create a match', (done) => {
      Match.create(matchDupUrl, (err, match) => {
        expect(err).to.match(/E11000 duplicate key error collection: quizzy-backend-test.matches index: url_1/);
        Match.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });

  describe('Invalid url', () => {
    it('returns correct error and does not create a match', (done) => {
      Match.create(matchInvalidUrl, (err, match) => {
        expect(err).to.match(/invalid url/);
        Match.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });

  describe('Without owner', () => {
    it('returns correct error and does not create a match', (done) => {
      Match.create(matchWithoutOwner, (err, match) => {
        expect(err).to.match(/must have a owner/);
        Match.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });

  describe('Invalid Date', () => {
    it('returns correct error and does not create a match', (done) => {
      Match.create(matchInvalidDate, (err, match) => {
        expect(err).to.match(/Cast to Date failed/);
        Match.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });

  describe('Without game', () => {
    it('returns correct error and does not create a match', (done) => {
      Match.create(matchWithoutGame, (err, match) => {
        expect(err).to.match(/there must be a game/);
        Match.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });

  describe('Url with "_" and "-"', () => {
    it('does not returns error and creates a match', (done) => {
      Match.create(match3, (err, match) => {
        expect(err).to.eq(null);
        Match.count({}).exec((err, count) => {
          expect(count).to.eq(3);   
          done();
        });
      });
    });
  });

  describe('Url with only numbers', () => {
    it('does not returns error and creates a match', (done) => {
      Match.create(match4, (err, match) => {
        expect(err).to.eq(null);
        Match.count({}).exec((err, count) => {
          expect(count).to.eq(3);
          done();
        }); 
      });
    });
  });

  describe('Result without user', () => {
    it('returns correct error and does not create a game', (done) => {
      Match.create(matchResultWithoutUser, (err, match) => {
        expect(err).to.match(/result must have a user/);
        Match.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();  
        }); 
      });
    });
  });

  describe('Result without points', () => {
    it('returns correct error and does not create a game', (done) => {
      Match.create(matchResultWithoutPoints, (err, match) => {
        expect(err).to.match(/result must have a points/);
        Match.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });      
      });
    });
  });

  describe('Negative totalPlayers', () => {
    it('returns correct error and does not create a game', (done) => {
      Match.create(matchInvalidtotalPlayers, (err, match) => {
        expect(err).to.match(/there must be at least two players/);
        Match.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });      
      });
    });
  });
});

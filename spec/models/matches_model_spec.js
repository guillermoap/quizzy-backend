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

describe('MatchesModel', () => {
  var match;
  var match2;
  var match3;
  var match4;
  var matchWithoutUrl;
  var matchDupUrl;
  var matchInvalidUrl;
  var matchPlayersNull;
  var matchWithoutPlayers;
  var matchWithoutOwner;
  var matchInvalidDate;
  var matchWithoutGame;
  var countBefore;

  beforeEach(function(done) {
    factory.createMany('match', 2, [{
      url: 'quizzy2017'
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
   
  factory.attrsMany('match', 10, [{
    url: null
  }, {
    url: 'quizzy2017'
  }, {
    url: 'sebas%%'
  }, {
    players: null
  }, {
    players: []
  }, {
    owner: null
  }, {
    endingDate: 'Lunes 20 de Julio de 1999' 
  }, {
    game: null
  }, {
    url: 'futbol_uruguayo_2017'
  }, {
    url: '12345'
  }])
  .then(matchAttrsArray => {
    matchWithoutUrl = matchAttrsArray[0];
    matchDupUrl = matchAttrsArray[1];
    matchInvalidUrl = matchAttrsArray[2];
    matchPlayersNull = matchAttrsArray[3];
    matchWithoutPlayers = matchAttrsArray[4];
    matchWithoutOwner = matchAttrsArray[5];
    matchInvalidDate = matchAttrsArray[6];
    matchWithoutGame = matchAttrsArray[7];
    match3 = matchAttrsArray[8];
    match4 = matchAttrsArray[9];
  })

  describe('Without url', () => {
    it('returns correct error', (done) => {
      Match.create(matchWithoutUrl, (err, match) => {
        expect(err).to.match(/you must enter a url/);
        done();
      });
    });
    
    it('does not create a match', (done) => {
      Match.count({}).exec((err, count) => {
        countBefore = count;
      });
      Match.create(matchWithoutUrl);
      Match.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Same url', () => {
    it('returns correct error', (done) => {
      Match.create(matchDupUrl, (err, match) => {
        expect(err).to.match(/ /);
        done();
      });
    });
    
    it('does not create a match', (done) => {
      Match.count({}).exec((err, count) => {
        countBefore = count;
      });
      Match.create(matchDupUrl);
      Match.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Invalid url', () => {
    it('returns correct error', (done) => {
      Match.create(matchInvalidUrl, (err, match) => {
        expect(err).to.match(/invalid url/);
        done();
      });
    });
    
    it('does not create a match', (done) => {
      Match.count({}).exec((err, count) => {
        countBefore = count;
      });
      Match.create(matchInvalidUrl);
      Match.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Players null', () => {
    it('returns correct error', (done) => {
      Match.create(matchPlayersNull, (err, match) => {
        expect(err).to.match(/there must be at least one player/);
        done();
      });
    });
    
    it('does not create a match', (done) => {
      Match.count({}).exec((err, count) => {
        countBefore = count;
      });
      Match.create(matchPlayersNull);
      Match.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Players empty', () => {
    it('returns correct error', (done) => {
      Match.create(matchWithoutPlayers, (err, match) => {
        expect(err).to.match(/there must be at least one player/);
        done();
      });
    });
    
    it('does not create a match', (done) => {
      Match.count({}).exec((err, count) => {
        countBefore = count;
      });
      Match.create(matchWithoutPlayers);
      Match.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Without owner', () => {
    it('returns correct error', (done) => {
      Match.create(matchWithoutOwner, (err, match) => {
        expect(err).to.match(/must have a owner/);
        done();
      });
    });
    
    it('does not create a match', (done) => {
      Match.count({}).exec((err, count) => {
        countBefore = count;
      });
      Match.create(matchWithoutOwner);
      Match.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Invalid Date', () => {
    it('returns correct error', (done) => {
      Match.create(matchInvalidDate, (err, match) => {
        expect(err).to.match(/Cast to Date failed/);
        done();
      });
    });
    
    it('does not create a match', (done) => {
      Match.count({}).exec((err, count) => {
        countBefore = count;
      });
      Match.create(matchInvalidDate);
      Match.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Without game', () => {
    it('returns correct error', (done) => {
      Match.create(matchWithoutGame, (err, match) => {
        expect(err).to.match(/there must be a game/);
        done();
      });
    });
    
    it('does not create a match', (done) => {
      Match.count({}).exec((err, count) => {
        countBefore = count;
      });
      Match.create(matchWithoutGame);
      Match.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Url with "-"', () => {
    it('does not returns error', (done) => {
      Match.create(match3, (err, match) => {
        expect(err).to.eq(null);
        done();
      });
    });
    
    it('creates a match', (done) => {
      Match.count({}).exec((err, count) => {
        countBefore = count;
      });
      Match.create(match3);
      Match.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore++);   
      });
      done();
    });
  });

  describe('Url with only numbers', () => {
    it('does not returns error', (done) => {
      Match.create(match4, (err, match) => {
        expect(err).to.eq(null);
        done();
      });
    });
    
    it('creates a match', (done) => {
      Match.count({}).exec((err, count) => {
        countBefore = count;
      });
      Match.create(match4);
      Match.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore++);   
      });
      done(); 
    });
  });
});

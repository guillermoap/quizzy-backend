import chai, {
  expect
} from 'chai';
import factory from '../factories/factory.js';
import app from '../../server.js';
import mongoose from 'mongoose';
import Game from '../../app/models/game';

describe('GamesModel', () => {
  var game;
  var game2;
  var game3;
  var game4;
  var gameWithoutName;
  var gameDupName;
  var gameInvalidName;
  var gameNegativeRating;
  var gameInvalidRating;
  var gameNegativeTimesPlayed;
  var gameWithoutCreator;
  var gameWithoutQuestions;
  var gameRankingWithoutUser;
  var gameRankingWithoutPoints;
  var gameInvalidDate;
  var countBefore;

  beforeEach(function(done) {
    factory.createMany('game', 2, [{
      name: 'quizzy'
    }, {
      name: 'Futbol'
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
   
  factory.attrsMany('game', 13, [{
    name: null
  }, {
    name: 'quizzy'
  }, {
    name: 'tennis-2010'
  }, {
    rating: -2
  }, {
    rating: 8
  }, {
    timesPlayed: -1
  }, {
    creator: null
  }, {
    questions: null 
  }, {
    ranking: [{points: 8}]
  }, {
    ranking: [{user: 'sebas'}]
  }, {
    creationDate: 'Lunes 20 de Julio de 1999'
  }, {
    name: 'Juego_Aleatorio' 
  }, {
    name: '1324'
  }])
  .then(gameAttrsArray => {
    gameWithoutName = gameAttrsArray[0];
    gameDupName = gameAttrsArray[1];
    gameInvalidName = gameAttrsArray[2];
    gameNegativeRating = gameAttrsArray[3];
    gameInvalidRating = gameAttrsArray[4];
    gameNegativeTimesPlayed = gameAttrsArray[5];
    gameWithoutCreator = gameAttrsArray[6];
    gameWithoutQuestions = gameAttrsArray[7];
    gameRankingWithoutUser = gameAttrsArray[8];
    gameRankingWithoutPoints = gameAttrsArray[9];
    gameInvalidDate = gameAttrsArray[10];
    game3 = gameAttrsArray[11];
    game4 = gameAttrsArray[12];
  })

  describe('Without name', () => {
    it('returns correct error', (done) => {
      Game.create(gameWithoutName, (err, game) => {
        expect(err).to.match(/you must enter a name/);
        done();
      });
    });
    
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(gameWithoutName);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Same name', () => {
    it('returns correct error', (done) => {
      Game.create(gameDupName, (err, game) => {
        expect(err).to.match(/E11000 duplicate key error collection: quizzy-backend-test.games index: name_1/);
        done();
      });
    });
    
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(gameDupName);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Invalid name', () => {
    it('returns correct error', (done) => {
      Game.create(gameInvalidName, (err, game) => {
        expect(err).to.match(/invalid name/);
        done();
      });
    });
    
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(gameInvalidName);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Negative Rating', () => {
    it('returns correct error', (done) => {
      Game.create(gameNegativeRating, (err, game) => {
        expect(err).to.match(/there must be a correct rating/);
        done();
      });
    });
    
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(gameNegativeRating);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Rating out of range', () => {
    it('returns correct error', (done) => {
      Game.create(gameInvalidRating, (err, game) => {
        expect(err).to.match(/there must be a correct rating/);
        done();
      });
    });
    
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(gameInvalidRating);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Negative timesPlayed', () => {
    it('returns correct error', (done) => {
      Game.create(gameNegativeTimesPlayed, (err, game) => {
        expect(err).to.match(/timesPlayed must be positive/);
        done();
      });
    });
    
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(gameNegativeTimesPlayed);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });
  
  describe('Without creator', () => {
    it('returns correct error', (done) => {
      Game.create(gameWithoutCreator, (err, game) => {
        expect(err).to.match(/must have a creator/);
        done();
      });
    });
    
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(gameWithoutCreator);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Without questions', () => {
    it('returns correct error', (done) => {
      Game.create(gameWithoutQuestions, (err, game) => {
        expect(err).to.match(/there must be at least one question/);
        done();
      });
    });
    
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(gameWithoutQuestions);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Ranking without user', () => {
    it('returns correct error', (done) => {
      Game.create(gameRankingWithoutUser, (err, game) => {
        expect(err).to.match(/ranking must have a user/);
        done();
      });
    });
    
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(gameRankingWithoutUser);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Ranking without points', () => {
    it('returns correct error', (done) => {
      Game.create(gameRankingWithoutPoints, (err, game) => {
        expect(err).to.match(/ranking must have a points/);
        done();
      });
    });
    
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(gameRankingWithoutPoints);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Invalid date', () => {
    it('returns correct error', (done) => {
      Game.create(gameInvalidDate, (err, game) => {
        expect(err).to.match(/Cast to Date failed/);
        done();
      });
    });
    
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(gameInvalidDate);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Name with only numbers', () => {
    it('does not returns error', (done) => {
      Game.create(game3, (err, game) => {
        expect(err).to.eq(null);
        done();
      });
    });
    
    it('creates a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(game3);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore++);   
      });
      done();
    });
  });

  describe('Name with "_"', () => {
    it('does not returns error', (done) => {
      Game.create(game4, (err, game) => {
        expect(err).to.eq(null);
        done();
      });
    });
    
    it('creates a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(game4);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore++);   
      });
      done();
    });
  });
});

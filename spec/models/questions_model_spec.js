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

describe('QuestionModel', () => {
  var QuestWithoutText;
  var QuestInvalidDifficulty;
  var QuestWithoutAnswers;
  var QuestLessAnswers;
  var QuestMoreAnswers;
  var QuestInvalidCorrect;
  var QuestInvalidCorrect2;
  var QuestWithoutCorrect;
  var countBefore;

  afterEach(function(done) {
    Game.remove({}, function() {
      done();
    });
  });
   
  factory.attrsMany('game', 8, [{
    questions: [{test: null}]
  }, {
    questions: [{difficulty: 'facil'}]
  }, {
    questions: [{answers: null}]
  }, {
    questions: [{answers: ['ans1', 'ans2', 'ans3']}]
  }, {
    questions: [{answers: ['ans1', 'ans2', 'ans3', 'ans4', 'ans5']}]
  }, {
    questions: [{correctAnswer: -1}]
  }, {
    questions: [{correctAnswer: 5}]
  }, {
    questions: [{correctAnswer: null}]
  }])
  .then(gameAttrsArray => {
    QuestWithoutText = gameAttrsArray[0];
    QuestInvalidDifficulty = gameAttrsArray[1];
    QuestWithoutAnswers = gameAttrsArray[2];
    QuestLessAnswers = gameAttrsArray[3];
    QuestMoreAnswers = gameAttrsArray[4];
    QuestInvalidCorrect = gameAttrsArray[5];
    QuestInvalidCorrect2 = gameAttrsArray[6];
    QuestWithoutCorrect = gameAttrsArray[7];
  })

  describe('Without text', () => {
    it('returns correct error', (done) => {
      Game.create(QuestWithoutText, (err, game) => {
        expect(err).to.match(/you must write the question/);
        done();
      });
    });
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(QuestWithoutText);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });
  
  describe('Invalid difficulty', () => {
    it('returns correct error', (done) => {
      Game.create(QuestInvalidDifficulty, (err, game) => {
        expect(err).to.match(/is not a valid enum value for path `difficulty`/);
        done();
      });
    });
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(QuestInvalidDifficulty);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Wihtout answers', () => {
    it('returns correct error', (done) => {
      Game.create(QuestWithoutAnswers, (err, game) => {
        expect(err).to.match(/you must write the answers/);
        done();
      });
    });
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(QuestWithoutAnswers);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Less answers', () => {
    it('returns correct error', (done) => {
      Game.create(QuestLessAnswers, (err, game) => {
        expect(err).to.match(/there must be 4 possibles answers/);
        done();
      });
    });
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(QuestLessAnswers);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('More answers', () => {
    it('returns correct error', (done) => {
      Game.create(QuestMoreAnswers, (err, game) => {
        expect(err).to.match(/there must be 4 possibles answers/);
        done();
      });
    });
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(QuestMoreAnswers);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Without correctAnswer', () => {
    it('returns correct error', (done) => {
      Game.create(QuestWithoutCorrect, (err, game) => {
        expect(err).to.match(/you must select correct answer/);
        done();
      });
    });
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(QuestWithoutCorrect);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Invalid correctAnswer (0)', () => {
    it('returns correct error', (done) => {
      Game.create(QuestInvalidCorrect, (err, game) => {
        expect(err).to.match(/there must be a correct answer/);
        done();
      });
    });
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(QuestInvalidCorrect);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });

  describe('Invalid correctAnswer (5)', () => {
    it('returns correct error', (done) => {
      Game.create(QuestInvalidCorrect2, (err, game) => {
        expect(err).to.match(/there must be a correct answer/);
        done();
      });
    });
    it('does not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        countBefore = count;
      });
      Game.create(QuestInvalidCorrect2);
      Game.count({}).exec((err, count) => {
        expect(count).to.eq(countBefore);   
      });
      done();
    });
  });
});

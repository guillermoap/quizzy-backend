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
    questions: [{correctAnswer: 0}]
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
    it('return correct error', (done) => {
      Game.create(QuestWithoutText, (err, game) => {
        expect(err).to.match(/you must write the question/);
        done();
      });
    });
    it('dose not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        Game.create(QuestWithoutText, (err, game) => {
          expect(count).to.eq(count);
          done();
        });
      });
    });
  });
  
  describe('Invalid difficulty', () => {
    it('return correct error', (done) => {
      Game.create(QuestInvalidDifficulty, (err, game) => {
        expect(err).to.match(/is not a valid enum value for path `difficulty`/);
        done();
      });
    });
    it('dose not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        Game.create(QuestInvalidDifficulty, (err, game) => {
          expect(count).to.eq(count);
          done();
        });
      });
    });
  });

  describe('Wihtout answers', () => {
    it('return correct error', (done) => {
      Game.create(QuestWithoutAnswers, (err, game) => {
        expect(err).to.match(/you must write the answers/);
        done();
      });
    });
    it('dose not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        Game.create(QuestWithoutAnswers, (err, game) => {
          expect(count).to.eq(count);
          done();
        });
      });
    });
  });

  describe('Less answers', () => {
    it('return correct error', (done) => {
      Game.create(QuestLessAnswers, (err, game) => {
        expect(err).to.match(/there must be 4 possibles answers/);
        done();
      });
    });
    it('dose not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        Game.create(QuestLessAnswers, (err, game) => {
          expect(count).to.eq(count);
          done();
        });
      });
    });
  });

  describe('More answers', () => {
    it('return correct error', (done) => {
      Game.create(QuestMoreAnswers, (err, game) => {
        expect(err).to.match(/there must be 4 possibles answers/);
        done();
      });
    });
    it('dose not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        Game.create(QuestMoreAnswers, (err, game) => {
          expect(count).to.eq(count);
          done();
        });
      });
    });
  });

  describe('Without correctAnswer', () => {
    it('return correct error', (done) => {
      Game.create(QuestWithoutCorrect, (err, game) => {
        expect(err).to.match(/you must select correct answer/);
        done();
      });
    });
    it('dose not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        Game.create(QuestWithoutCorrect, (err, game) => {
          expect(count).to.eq(count);
          done();
        });
      });
    });
  });

  describe('Invalid correctAnswer (0)', () => {
    it('return correct error', (done) => {
      Game.create(QuestInvalidCorrect, (err, game) => {
        expect(err).to.match(/there must be a correct answer/);
        done();
      });
    });
    it('dose not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        Game.create(QuestInvalidCorrect, (err, game) => {
          expect(count).to.eq(count);
          done();
        });
      });
    });
  });

  describe('Invalid correctAnswer (5)', () => {
    it('return correct error', (done) => {
      Game.create(QuestInvalidCorrect2, (err, game) => {
        expect(err).to.match(/there must be a correct answer/);
        done();
      });
    });
    it('dose not create a game', (done) => {
      Game.count({}).exec((err, count) => {
        Game.create(QuestInvalidCorrect2, (err, game) => {
          expect(count).to.eq(count);
          done();
        });
      });
    });
  });
});
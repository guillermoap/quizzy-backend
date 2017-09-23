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
  var QuestTextEmpty;
  var QuestInvalidDifficulty;
  var QuestWithoutAnswers;
  var QuestLessAnswers;
  var QuestMoreAnswers;
  var QuestWithAnswerEmpty;
  var QuestInvalidCorrect;
  var QuestInvalidCorrect2;
  var QuestWithoutCorrect;
  var countBefore;

  afterEach(function(done) {
    Game.remove({}, function() {
      done();
    });
  });
   
  factory.attrsMany('game', 10, [{
    questions: [{
      text: null,
      difficulty: 'Hard',
      answers: [{
        answer: 'ans1'
      }, {
        answer: 'ans2'
      }, {
        answer: 'ans3'
      }, {
        answer: 'ans4'  
      }],
      correctAnswer: 3
    }]
  }, {
    questions: [{
      text: '                 ',
      difficulty: 'Hard',
      answers: [{
        answer: 'ans1'
      }, {
        answer: 'ans2'
      }, {
        answer: 'ans3'
      }, {
        answer: 'ans4'  
      }],
      correctAnswer: 3
    }]
  }, {
    questions: [{
      text: 'ques',
      difficulty: 'facil',
      answers: [{
        answer: 'ans1'
      }, {
        answer: 'ans2'
      }, {
        answer: 'ans3'
      }, {
        answer: 'ans4'  
      }],
      correctAnswer: 3
    }]
  }, {
    questions: [{
      text: 'ques',
      difficulty: 'facil',
      answers: null,
      correctAnswer: 3
    }]
  }, {
    questions: [{
      text: 'ques',
      difficulty: 'facil',
      answers: [{
        answer: 'ans1'  
      }],
      correctAnswer: 3
    }]
  }, {
    questions: [{
      text: 'ques',
      difficulty: 'facil',
      answers: [{
        answer: 'ans1'
      }, {
        answer: 'ans2'
      }, {
        answer: 'ans3'
      }, {
        answer: 'ans4'  
      }],
      correctAnswer: -1
    }]
  }, {
    questions: [{
      text: 'ques',
      difficulty: 'facil',
      answers: [{
        answer: 'ans1'
      }, {
        answer: 'ans2'
      }, {
        answer: 'ans3'
      }, {
        answer: 'ans4'  
      }],
      correctAnswer: 8
    }]
  }, {
    questions: [{
      text: 'ques',
      difficulty: 'facil',
      answers: [{
        answer: 'ans1'
      }, {
        answer: 'ans2'
      }, {
        answer: 'ans3'
      }, {
        answer: 'ans4'  
      }],
      correctAnswer: null
    }]
  }, {
    questions: [{
      text: 'ques',
      difficulty: 'facil',
      answers: [{
        answer: 'ans1'
      }, {
        answer: 'ans2'
      }, {
        answer: '         '
      }, {
        answer: 'ans4'  
      }],
      correctAnswer: 3
    }]
  }, {
    questions: [{
      text: 'ques',
      difficulty: 'facil',
      answers: [{
        answer: 'ans1'
      }, {
        answer: 'ans2'
      }, {
        answer: 'ans3'
      }, {
        answer: 'ans4'
      }, {
        answer: 'ans5'
      }, {
        answer: 'ans6'
      }, {
        answer: 'ans7' 
      }],
      correctAnswer: 3
    }]
  }])
  .then(gameAttrsArray => {
    QuestWithoutText = gameAttrsArray[0];
    QuestTextEmpty = gameAttrsArray[1];
    QuestInvalidDifficulty = gameAttrsArray[2];
    QuestWithoutAnswers = gameAttrsArray[3];
    QuestLessAnswers = gameAttrsArray[4];
    QuestInvalidCorrect = gameAttrsArray[5];
    QuestInvalidCorrect2 = gameAttrsArray[6];
    QuestWithoutCorrect = gameAttrsArray[7];
    QuestWithAnswerEmpty = gameAttrsArray[8];
    QuestMoreAnswers = gameAttrsArray[9];
  })

  describe('Without text', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(QuestWithoutText, (err, game) => {
        expect(err).to.match(/you must write the question/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(0);   
          done();  
        });
      });
    });
  });

  describe('Text empty', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(QuestTextEmpty, (err, game) => {
        expect(err).to.match(/you must write the question/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(0);   
          done();  
        });
      });
    });
  });
  
  describe('Invalid difficulty', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(QuestInvalidDifficulty, (err, game) => {
        expect(err).to.match(/is not a valid enum value for path `difficulty`/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(0);   
          done();  
        });
      });
    });
  });

  describe('Wihtout answers', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(QuestWithoutAnswers, (err, game) => {
        expect(err).to.match(/you must write the answers/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(0);   
          done();  
        }); 
      });
    });
  });

  describe('Less answers', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(QuestLessAnswers, (err, game) => {
        expect(err).to.match(/there must write between 2 and 6 possibles answers/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(0);   
          done();
        });
      }); 
    });
  });

  describe('More answers', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(QuestMoreAnswers, (err, game) => {
        expect(err).to.match(/there must write between 2 and 6 possibles answers/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(0);   
          done();
        });
      }); 
    });
  });

  describe('Without correctAnswer', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(QuestWithoutCorrect, (err, game) => {
        expect(err).to.match(/you must select correct answer/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(0);  
          done(); 
        });
      });
    });
  });

  describe('Invalid correctAnswer (0)', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(QuestInvalidCorrect, (err, game) => {
        expect(err).to.match(/there must be a correct answer/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(0);   
          done();
        });
      });
    });
  });

  describe('Invalid correctAnswer (5)', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(QuestInvalidCorrect2, (err, game) => {
        expect(err).to.match(/there must be a correct answer/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(0);   
          done();
        });
      });
    });
  });

  describe('Answers empty', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(QuestWithAnswerEmpty, (err, game) => {
        expect(err).to.match(/answer can not be empty/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(0);   
          done();
        });
      });
    });
  });
});

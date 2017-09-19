import Game from '../app/models/schemas/game.schema';

describe('Game model', function() {

  describe('Create', function() {

    context('valid data', function() {

      before(function(){
        Game.create({
          "name" : "game1",
          "description" : "description1"
          "timesPlayed" : 10,
          "creator" : "Horacio Colbert",
          "questions" : [{
            "text" : "what is the meaning of life?",
            "difficulty" : "medium",
            "answers" : [
              "to be happy",
              "to help others",
              "to find the meaning of life",
              "none"
            ],
            "correctAnswer" : 4
          }],
          "tags" : ["math", "music"],
          "ranking" : [{"Monty Python", 0}],
          "creationDate" : "2017-09-13T01:44:03.577Z",
          "image" : "oli"
        })
      })

      afterEach(function(done) {
        Game.remove({}, function() {
          done();
        });
      });

      it('should be valid', function() {
        Game.create({})
      });
    });

  });
});

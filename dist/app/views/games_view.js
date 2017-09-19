"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function gameIndex(games) {
  return {
    games: games.map(function (game) {
      return gameShow(game);
    })
  };
}

function gameShow(game) {
  return {
    game: {
      id: game._id,
      name: game.name,
      description: game.description,
      rating: game.rating,
      timesPlayed: game.timesPlayed,
      creator: game.creator,
      questions: game.questions,
      tags: game.tags,
      ranking: game.ranking,
      creationDate: game.creationDate,
      image: game.image
    }
  };
}

exports.gameIndex = gameIndex;
exports.gameShow = gameShow;
//# sourceMappingURL=games_view.js.map
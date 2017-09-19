"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function matchIndex(matches) {
  return {
    matches: matches.map(function (match) {
      return {
        id: match._id,
        url: match.url,
        isRealTime: match.isRealTime,
        players: match.players,
        owner: match.owner,
        endingDate: match.endingDate,
        game: match.game,
        result: match.result
      };
    })
  };
}

function matchShow(match) {
  return {
    match: {
      id: match._id,
      url: match.url,
      isRealTime: match.isRealTime,
      players: match.players,
      owner: match.owner,
      endingDate: match.endingDate,
      game: match.game,
      result: match.result
    }
  };
}

exports.matchIndex = matchIndex;
exports.matchShow = matchShow;
//# sourceMappingURL=matches_view.js.map
//# sourceMappingURL=matches_view.js.map
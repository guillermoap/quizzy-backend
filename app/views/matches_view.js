import { gameShow } from './games_view';

function matchIndex(matches) {
  return {
    matches: matches.map(match => ({
      id: match._id,
      url: match.url,
      isRealTime: match.isRealTime,
      totalPlayers: match.totalPlayers,
      players: match.players,
      owner: match.owner,
      endingDate: match.endingDate,
      game: gameShow(match.game).game,
      result: match.result
    }))
  }
}

function matchShow(match) {
  return {
    match: {
      id: match._id,
      url: match.url,
      isRealTime: match.isRealTime,
      totalPlayers: match.totalPlayers,
      players: match.players,
      owner: match.owner,
      endingDate: match.endingDate,
      game: gameShow(match.game).game,
      result: match.result
    }
  }
}

export {
  matchIndex,
  matchShow
}
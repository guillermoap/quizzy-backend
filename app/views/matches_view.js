import { EncriptCorrectAnswers } from '../functions/game_functions';

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
      game: {
        id: match.game._id,
        name: match.game.name,
        description: match.game.description,
        rating: match.game.rating,
        timesPlayed: match.game.timesPlayed,
        creator: match.game.creator,
        questions: EncriptCorrectAnswers(match.game.questions),
        tags: match.game.tags,
        ranking: match.game.ranking,
        creationDate: match.game.creationDate,
        image: match.game.image
      },
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
      game: {
        id: match.game._id,
        name: match.game.name,
        description: match.game.description,
        rating: match.game.rating,
        timesPlayed: match.game.timesPlayed,
        creator: match.game.creator,
        questions: EncriptCorrectAnswers(match.game.questions),
        tags: match.game.tags,
        ranking: match.game.ranking,
        creationDate: match.game.creationDate,
        image: match.game.image
      },
      result: match.result
    }
  }
}

export {
  matchIndex,
  matchShow
}
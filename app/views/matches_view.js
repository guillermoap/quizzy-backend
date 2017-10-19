function matchIndex(matches) {
  return {
    matches: matches.map(match => ({
      id: match._id,
      url: match.url,
      isRealTime: match.isRealTime,
      cantPlayers: match.cantPlayers,
      players: match.players,
      owner: match.owner,
      endingDate: match.endingDate,
      game: match.game,
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
      cantPlayers: match.cantPlayers,
      players: match.players,
      owner: match.owner,
      endingDate: match.endingDate,
      game: match.game,
      result: match.result
    }
  }
}

export {
  matchIndex,
  matchShow
}
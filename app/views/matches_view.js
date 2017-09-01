function matchIndex(matches) {
    matches: matches.map((match) => gameShow(match))    
}
  
function matchShow(matches) {
    return {
        id: match._id,
        isRealTime: match.isRealTime,
        players: match.players,
        owner: match.owner,
        endingDate: match.endingDate,
        game: match.game,
        result: match.result
    }
}
    
export { matchIndex, matchShow }
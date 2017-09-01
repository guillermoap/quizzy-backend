function matchIndex(matches) {
    return {
        matches: matches.map((match) => matchShow(match))  
    }
}
  
function matchShow(match) {
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
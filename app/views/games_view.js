function gameIndex(games) {
  return {
    games: games.map((game) => gameShow(game))
  }
}

function gameShow(game) {
  return { game: {
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
  }}
}

export { gameIndex, gameShow}

function rankingInsert(match, user, points) {
  let ranking = match.game.ranking.slice();
  let userPosition = ranking.findIndex(greaterOrEqual);
  if (userPosition === -1) {
    //add user at the end of the ranking
    userPosition = ranking.size;
  }
  ranking.splice(userPosition, 0, {
    user: user,
    points: points
  });
  match.game.ranking = ranking;
  return match;
  function greaterOrEqual(item) {
    return points >= item.points;
  }
};

export {
  rankingInsert
}
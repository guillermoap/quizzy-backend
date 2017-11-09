function rankingInsert(match, user, points) {
  let userPosition = match.game.ranking.findIndex(greaterOrEqual);
  if (userPosition === -1) {
    userPosition = match.game.ranking.length;
  }
  match.game.ranking.splice(userPosition, 0, {
    user: user,
    points: points
  });
  return match;
  function greaterOrEqual(item) {
    return points >= item.points;
  }
};

export {
  rankingInsert
}
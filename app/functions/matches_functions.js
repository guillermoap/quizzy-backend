function rankingInsert(match, user, points) {
  let ranking = match.game.ranking.slice();  //copia el ranking del juego en una variable ranking
  let userPosition = ranking.findIndex(greaterOrEqual);    //busca en que posición va a quedar el user en el ranking
  if (userPosition === -1) {
    //add user at the end of the ranking
    userPosition = ranking.size;
  }
  ranking.splice(userPosition, 0, {   //la función splice agrega al ranking en la posición userPosition el elemento. El 0 va así
    user: user,
    points: points
  });

   //para terminar, sobreescribir el ranking del game del match con la variable ranking, y devolver esa variable como resultado de la funcion       para utilizar en el fronten
  match.game.ranking = ranking;
  return match;
  function greaterOrEqual(item) {
    return points >= item.points;
  }
};



export {
  rankingInsert
}
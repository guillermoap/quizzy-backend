function EncriptCorrectAnswers(questions) {
  let questionsEncript = questions;
  for (let i = 0; i < questionsEncript.length ; i++) {
    questionsEncript[i] = encript(questionsEncript[i]);
  }
  return questionsEncript;
}

function encript(question) {
  let lengthAnswers = question.answers.length;
  let numberDifficulty
  if (question.difficulty === 'Easy') {
    numberDifficulty = 20;
  } else if (question.difficulty === 'Medium') {
    numberDifficulty = 40;
  } else {
    numberDifficulty = 60;
  };
  let lengthText = question.text.length;
  let correctEncript = (((question.correctAnswer + numberDifficulty) - lengthAnswers) * lengthText);
  question.correctAnswer = correctEncript;
  return question
};

export {
  EncriptCorrectAnswers
}

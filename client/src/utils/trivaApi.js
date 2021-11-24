export const searchQuiz = async (query) => {
  const quizData = await fetch(
    `https://opentdb.com/api.php?amount=${query.amount}&category=${query.category}&difficulty=${query.difficulty}&type=${query.type}`
  );
  const resp = await quizData.json();
  return resp;
};

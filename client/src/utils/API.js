// make a search to google books api
// https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple
export const searchQuiz = (query) => {
  return fetch(
    `https://opentdb.com/api.php?amount=${query.amount}&category=${query.category}&difficulty=${query.difficulty}&type=${query.type}`
  );
};

// const query={
// amount:5,
// category:18,
// difficulty:"easy",
// type:"multiple"

// }

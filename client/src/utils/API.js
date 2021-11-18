// Axios is a popular NPM package used for preforming API requests
// import axios from 'axios';

// const { REACT_APP_BASEURL, REACT_APP_APIKEY } = process.env;
// export default search;
export const searchQuiz = (query) => {
  return fetch(
    `https://opentdb.com/api.php?amount=${query.amount}&category=${query.category}&difficulty=${query.difficulty}&type=${query.type}`
    
    
  );
};



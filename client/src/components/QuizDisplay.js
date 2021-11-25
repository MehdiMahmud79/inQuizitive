import React from 'react';
import { useState, useEffect } from 'react';
// import Container from './Container';
// import Row from './Row';
// import Col from './Col';
// import Card from './Card';
import { useQuery } from "@apollo/client";
import QuizDetails from './QuizDetails';
import {getAllQuizzes}  from "../utils/queries"





function QuizDisplay() {
    
    let [getAllQuizzes, { data: allQuizzesData, error: quizDataError }] =
    useQuery(getAllQuizzes);
    useEffect(() => {
        if (!allQuizzesData)return; 

       getAllQuizzes()
      }, [allQuizzesData]);

    const [result, setResult] = useState([]);
//  console.log(allQuizzesData)



// const [results, setResults] = useState([]);

// // Method to get search results and set state
// const searchQuiz = async (useQuery) => {
//   const response = await getAllQuizzes (useQuery);
//   setResults(response.data.data);
// };

// // We want to run this method when the component first loads so that we have images of kittens to display
// // The second argument is the dependency array. This means that this method will only run when the component first loads
// useEffect(() => {
//   searchQuiz('general knowledge');
// }, []);
 

    return(
        <div>
       <QuizDetails result={result} />
        <h1 className="text-green-800 m-3 text-center">Georgia sadf</h1>
        </div>
    )
}





export default QuizDisplay;
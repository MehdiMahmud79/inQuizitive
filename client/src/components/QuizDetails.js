import React from 'react';

function QuizDetails(props) {
  return (
    <ul className="list-group">
    {props.results.map((result) => (
      <li className="list-group-item" key={result._id}>
        <p  {result.title}/>
      </li>
    ))}
  </ul>
  );
}

export default QuizDetails;
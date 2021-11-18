import React from 'react';
import { categories as categoryOptions } from '../utils/categories';
const options = [1,2,3,4,5,6,7,8,9,10]
const difficultyOptions = ["easy", "medium","hard"]
const typeOptions = ["multiple choice", "true/false"]

function QuizSearchForm(props) {
  return (
    <form>
    
    <div >
    <h2> amount of questions </h2>
        <select value="amount">
        {options.map((number) => <option value={number}>{number}</option>)}
        </select>
    </div>
      

    <div >
<h2> select category </h2>
        <select value="category">
        {categoryOptions.map(({id, name}) => <option value={id}>{name}</option>)}
        </select>
    </div>

    <div >
<h2> difficulty </h2>
        <select value="difficulty">
        {difficultyOptions.map((difficultyoption) => <option value={difficultyoption}>{difficultyoption}</option>)}
        </select>
    </div>

    <div >
<h2> type of question </h2>
        <select value="difficulty">
        {typeOptions.map((typeoption) => <option value={typeoption}>{typeoption}</option>)}
        </select>
    </div>
      
    </form>
  );
}

// const query={
//   amount:5,
//   category:18,
//   difficulty:"easy",
//   type:"multiple"
  
//   }

export default QuizSearchForm;
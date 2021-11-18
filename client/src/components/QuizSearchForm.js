import React, {useState} from 'react';
import {searchQuiz} from '../utils/API'
// import { categories as categoryOptions } from '../utils/categories';
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";

const options = [1,2,3,4,5,6,7,8,9,10]
// const difficultyOptions = ["easy", "medium","hard"]
// const typeOptions = ["multiple choice", "true/false"]

function QuizSearchForm(props) {
  const [showAlert, setShowAlert] = useState(false);

  const [userFormData, setUserFormData] = useState({
    amount: "5",
    category: "18",
    type: "multiple",
difficulty:"easy"
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  const [validated] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      let quizData=  await searchQuiz(userFormData );
      console.log(quizData)
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      amount: "5",
      category: "18",
      type: "multiple",
  difficulty:"easy"
    });
  };
  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your quiz search!
        </Alert>  
        <Form.Group>
        <Form.Label htmlFor="amount">amount of questions</Form.Label>
        <Form.Select value="amount" name="amount" onChange={handleInputChange}>
        {options.map((number) => <option key={number} value={number}>{number}</option>)}
        </Form.Select>
        </Form.Group>
      

    {/* <div >
<h2> select category </h2>
        <select value="category" name="category">
        {categoryOptions.map(({id, name}) => <option value={id}>{name}</option>)}
        </select>
    </div>

    <div >
<h2> difficulty </h2>
        <select value="difficulty" name="difficulty">
        {difficultyOptions.map((difficultyoption) => <option value={difficultyoption}>{difficultyoption}</option>)}
        </select>
    </div>

    <div >
<h2> type of question </h2>
        <select value="type" name="type">
        {typeOptions.map((typeoption) => <option value={typeoption}>{typeoption}</option>)}
        </select>
    </div>
       */}
              
        <Button

          type="submit"
          variant="success"
        >
          Submit
        </Button>
    </Form>
  );
}

// const query={
//   amount:5,
//   category:18,
//   difficulty:"easy",
//   type:"multiple"
  
//   }

export default QuizSearchForm;
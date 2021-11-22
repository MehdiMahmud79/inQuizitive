import { gql } from "@apollo/client";

export const getUser = gql`
  query getMe {
    me {
      _id
      username
      email
      
    }
  }
`;

export const signUpMutation = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;



// mutation queries to GraphQl
export const loginUserMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
export const addQuizMutation = gql`
mutation addQuiz{
  addQuiz(
    questions: []
  )
  {
    _id
    questions {
      question
    }
  }
}
`;

export const populateQuizWithQuestionsMutation = gql`
mutation populateQuizWithQuestions($question: String!, $correct_answer: String!, $incorrect_answers: [String!], $category: String!, $type: String!, $difficulty: String!, $quiz_id: String!){
  populateQuizWithQuestions(
    question: 
      {
      question:$question,
      correct_answer: $correct_answer,
      incorrect_answers: $incorrect_answers,
      category: $category,
      type: $type,
      difficulty: $difficulty
      },
      quiz_id : $quiz_id
  ){
      user_id
    }
  }
`;
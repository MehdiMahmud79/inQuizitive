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
  mutation addQuiz($questions: [String]!, $user_id: Integer!) {
    addQuiz(questions: $questions, user_id: $user_id) {
      _id
    }
  }
`;
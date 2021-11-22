const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    image: String
  }

  type Token {
    token: String!
    user: User!
  }

  input Question {
    question: String!,
    correct_answer: String!,
    incorrect_answers: [String!],
    category: String!,
    type: String!,
    difficulty: String!
  }

  type savedQuestion {
    question: String!,
    correct_answer: String!,
    incorrect_answers: [String!],
    category: String!,
    type: String!,
    difficulty: String!
  }
  type Quiz {
    _id:ID!,
    user_id: String!,
    questions: [savedQuestion!]
  }
  
  type Query {
    getUser: User!
  }

  type Mutation {
    login(email: String!, password: String!): Token
    signUp(username: String!, email: String!, password: String!): Token
    addQuiz(questions: [String]): Quiz
    addQuiz2(questions: [Question!]): Quiz
    populateQuizWithQuestions(question: Question!, quiz_id: String!): Quiz
  }
`;

module.exports = typeDefs;


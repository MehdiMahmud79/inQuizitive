const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    image: String
  }

  input Question {
    question: String!
    correct_answer: String!
    incorrect_answers: [String!]
    category: String!
    type: String!
    difficulty: String!
  }
  type savedQuestion {
    question: String!
    correct_answer: String!
    incorrect_answers: [String!]
    category: String!
    type: String!
    difficulty: String!
  }
  type Quiz {
    user_id: String!
    questions: [savedQuestion!]
  }
  type Token {
    token: String!
    user: User!
  }
  type Query {
    getUser: User!
  }

  type Mutation {
    login(email: String!, password: String!): Token
    signUp(
      username: String!
      email: String!
      password: String!
      password2: String!
    ): Token
    addQuiz(questions: [Question!]): Quiz
  }
`;

module.exports = typeDefs;

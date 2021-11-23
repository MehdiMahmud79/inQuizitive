const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
    _id: ID!
    title: String!
    author_id: String!
    author: String!
    created_at: String!
    questions: [savedQuestion!]
  }

  type Token {
    token: String!
    user: User!
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    image: String
  }
  type Query {
    getUser: User
    getQuiz(_id: ID!): Quiz
    getAllQuizzes: [Quiz]
    getUserQuizzes: [Quiz]
  }

  type Mutation {
    login(email: String!, password: String!): Token
    signUp(
      username: String!
      email: String!
      password: String!
      password2: String!
    ): Token
    addQuiz(title: String!, questions: [Question!]): Quiz!
  }
`;

module.exports = typeDefs;

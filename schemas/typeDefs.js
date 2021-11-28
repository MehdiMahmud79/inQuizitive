const { gql } = require('apollo-server-express');

const typeDefs = gql`
  input Question {
    question: String!
    correct_answer: String!
    incorrect_answers: [String!]
  }
  type savedQuestion {
    question: String!
    correct_answer: String!
    incorrect_answers: [String!]
  }
  input Score {
    user_id: ID!
    score: String!
  }
  type ScoreType {
    user_id: ID!
    score: String!
  }
  type Quiz {
    _id: ID!
    title: String!
    author_id: String!
    author: String!
    created_at: String!
    category: String!
    amount: String!
    type: String!
    difficulty: String!
    questions: [savedQuestion!]
    scores: [ScoreType]
  }

  type Token {
    token: String!
    user: User!
  }
  type User {
    _id: ID!
    avatar: String!
    username: String!
    email: String!
    password: String!
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
      avatar: String!
      username: String!
      email: String!
      password: String!
      password2: String!
    ): Token
    addQuiz(
      title: String!
      category: String!
      amount: String!
      type: String!
      difficulty: String!
      amount: String!
      questions: [Question!]
    ): [Quiz]
    AddScoreToQuiz(_id: ID!, score: Score!): Quiz!
    removeQuiz(_id: ID!): [Quiz]
  }
`;

module.exports = typeDefs;

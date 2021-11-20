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

  type Question {
    question: String!,
    correct_answer: String!,
    incorrect_answers: String[]!,
    category: String!,
    type: String!,
    difficulty: String!
  }

  type Quiz {
    _id: ID!,
    question: Question!
  }
  
  type Query {
    getUser: User!
  }

  type Mutation {
    login(email: String!, password: String!): Token
    signUp(username: String!, email: String!, password: String!): Token
    addQuiz(userId: Interger, question: Question!): ID
  }
`;

module.exports = typeDefs;


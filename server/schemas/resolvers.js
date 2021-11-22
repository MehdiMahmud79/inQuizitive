const { AuthenticationError } = require("apollo-server-express");
const { User, Quiz } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUser: async (parent, args, { user }) => {
      if (user) {
        return User.findOne({ _id: user._id });
      }
      throw new AuthenticationError("login first!");
    },
  },

  Mutation: {
    signUp: async (parent, { username, email, password }) => {
      console.log("new user sign up");
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      console.log("user login");

      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    addQuiz: async (parent, _, { user = { _id: "Anon" } }) => {
      // if (user) {

      return await Quiz.create({ user_id: user._id });
      // } else {
      //   return "Not added";

    },
    addQuiz2: async (parent, _, { questions }, { user }) => {
      // if (user) {

      return await Quiz.create({ user_id: user._id, questions: questions });
      // } else {
      //   return "Not added";

    },

    populateQuizWithQuestions: async (parent, { question, quiz_id }, context) => {
      return await Quiz.findOneAndUpdate(
        { _id: quiz_id },
        { $addToSet: { questions: question } },
        { new: true, runValidators: true }
      );
    }
  }
}
module.exports = resolvers;

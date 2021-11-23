const { AuthenticationError } = require("apollo-server-express");
const { User, Quiz } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUser: async (parent, args, { user }) => {
      console.log("getUser");
      if (user) {
        return User.findOne({ _id: user._id });
      } else {
        throw new AuthenticationError("login first!");
      }
    },
    getQuiz: async (parent, { _id }, { user }) => {
      console.log("get A Single Quiz for the current logged in user", _id);
      if (user) {
        return await Quiz.findById(_id);
      } else {
        throw new AuthenticationError("login first!");
      }
    },

    getAllQuizzes: async () => {
      console.log("get All Quizzes in the Database");
      return await Quiz.find();
    },

    getUserQuizzes: async (parent, args, { user }) => {
      console.log("get all Quizzes for the logged in user");
      if (user) {
        return await Quiz.find({ Author_id: user._id });
      } else {
        throw new AuthenticationError("login first!");
      }
    },
  },

  Mutation: {
    signUp: async (parent, { username, email, password, password2 }) => {
      console.log("new user sign up");
      if (password != password2) {
        throw new AuthenticationError("passwords should match!");
        return;
      }

      try {
        const user = await User.create({
          username,
          email,
          password,
        });
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        throw new AuthenticationError(
          "A user exists with the provided Username/Email!"
        );
      }
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
    addQuiz: async (parent, { title, questions }, { user }) => {
      console.log("title", title);
      // console.log("user", context);
      if (user) {
        const myquestions = JSON.parse(JSON.stringify(questions, null, 2));
        try {
          const newQuiz = await Quiz.create({
            Author_id: user._id,
            Author: user.username,
            title: title,
            questions: myquestions,
          });
          return newQuiz;
        } catch (err) {
          throw new AuthenticationError(err);
        }
      } else {
        throw new AuthenticationError("Login first please!");
      }
    },
  },
};

module.exports = resolvers;

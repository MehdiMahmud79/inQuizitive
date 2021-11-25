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
        return await Quiz.find({ author_id: user._id });
      } else {
        throw new AuthenticationError("login first!");
      }
    },
  },

  Mutation: {
    signUp: async (
      parent,
      { avatar, username, email, password, password2 }
    ) => {
      console.log("new user sign up");
      if (password != password2) {
        throw new AuthenticationError("passwords should match!");
        return;
      }

      try {
        const user = await User.create({
          avatar,
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

    addQuiz: async (
      parent,
      { title, category, amount, type, difficulty, questions },
      { user }
    ) => {
      console.log(
        "title",
        title,
        category,
        amount,
        type,
        difficulty,
        questions
      );
      // console.log("user", context);
      if (user) {
        // const myquestions = JSON.parse(JSON.stringify(questions, null, 2));
        try {
          const newQuiz = await Quiz.create({
            author_id: user._id,
            author: user.username,
            title,
            category,
            amount,
            type,
            difficulty,
            questions: questions,
          });
          return newQuiz;
        } catch (err) {
          throw new AuthenticationError(err);
        }
      } else {
        throw new AuthenticationError("Login first please!");
      }
    },
    AddScoreToQuiz: async (parent, { _id, score }, { user }) => {
      console.log("add score to a quiz");
      // console.log("user", context);
      if (user) {
        try {
          const updatedQuiz = await Quiz.findByIdAndUpdate(_id, {
            $push: { scores: score },
          });

          return updatedQuiz;
        } catch (err) {
          throw new AuthenticationError(err);
        }
      } else {
        throw new AuthenticationError("Login first please!");
      }
    },
    removeQuiz: async (parent, { _id }, { user }) => {
      if (user) {
        const quiz = await Quiz.findOneAndDelete({
          _id: _id,
          author_id: user._id,
        });

        return quiz;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;

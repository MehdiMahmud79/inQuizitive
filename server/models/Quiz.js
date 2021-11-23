const { Schema, model } = require("mongoose");
const questionSchema = require("./questionSchema");

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    Author_id: {
      type: String,
      required: true,
    },
    Author: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    questions: [questionSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Quiz = model("Quiz", quizSchema);

module.exports = Quiz;

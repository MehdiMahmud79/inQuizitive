const { Schema, model } = require("mongoose");
const questionSchema = require("./questionSchema");

const quizSchema = new Schema(
  {
    user_id: String,
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

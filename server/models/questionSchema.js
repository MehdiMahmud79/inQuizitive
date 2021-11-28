import { Schema } from "mongoose"

const questionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  correct_answer: {
    type: String,
    required: true
  },
  incorrect_answers: [{
    type: String,
    required: true
  }],
});

module.exports = questionSchema;

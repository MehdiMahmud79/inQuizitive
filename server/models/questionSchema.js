const { Schema } = require("mongoose");
const questionSchema = new Schema({
  question: { type: String, required: true },
  correct_answer: { type: String, required: true },
  incorrect_answers: [{ type: String, required: true }],
  category: { type: String, required: true },
  type: { type: String, required: true },
  difficulty: { type: String, required: true },
});

module.exports = questionSchema;

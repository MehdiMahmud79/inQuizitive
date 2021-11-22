const { Schema } = require("mongoose");
const questionSchema = new Schema(
    {
        question: String,
        correct_answer: String,
        incorrect_answers: [String],
        category: String,
        type: String,
        difficulty: String,

    }
);

module.exports = questionSchema;




const { Schema, model } = require("mongoose");
const questionSchema = require("./questionSchema")
const quizSchema = new Schema(
    {
        questions: [questionSchema],
        user_id: String
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


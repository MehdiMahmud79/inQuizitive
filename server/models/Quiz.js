const { Schema, model } = require("mongoose");

const quizSchema = new Schema(
    {

        questions: [{
            question: String,
            correct_answer: String,
            incorrect_answers: [String],
            category: String,
            type: String,
            difficulty: String,
        }],

        user_id: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
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


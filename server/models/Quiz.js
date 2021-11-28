import { Schema, model } from "mongoose";
import questionSchema from "./questionSchema";
import dateFormat from "../utils/dateFormat";
import scoreSchema from "./scoreSchema";

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author_id: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    category: { type: String, required: true },
    type: { type: String, required: true },
    amount: { type: String, required: true },
    difficulty: { type: String, required: true },
    questions: [questionSchema],
    scores: [scoreSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

export const Quiz = model("Quiz", quizSchema);

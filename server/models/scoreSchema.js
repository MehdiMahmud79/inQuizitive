import { Schema } from "mongoose";

export const scoreSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  score: {
    type: String,
    required: true
  },
});

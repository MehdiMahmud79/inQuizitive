const { Schema } = require("mongoose");

const scoreSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    default: ''
  },
  score: {
    type: String,
    required: true,
    default: ''
  },
});

module.exports = scoreSchema;

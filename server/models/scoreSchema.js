const { Schema } = require("mongoose");

const scoreSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  score: {
    type: String,
    required: true
  },
});

module.exports = scoreSchema;

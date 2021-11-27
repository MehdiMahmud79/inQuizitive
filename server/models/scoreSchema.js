const { Schema } = require("mongoose");
const scoreSchema = new Schema({
  user_id: { type: String },
  score: { type: String },
});

module.exports = scoreSchema;

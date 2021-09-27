const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const faqModel = mongoose.model("faq", faqSchema);
module.exports = faqModel;

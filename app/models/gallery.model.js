const mongoose = require("mongoose");
const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};
const gallery = mongoose.model(
  "gallery",
  new mongoose.Schema(
    {
      category: String,
      images: [String],
      societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Society",
      },
    },
    schemaOptions
  )
);

module.exports = gallery;

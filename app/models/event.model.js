const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const eventSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    societyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Society",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fromDateTime: {
      type: Date,
      default: Date.now,
    },
    toDateTime: {
      type: Date,
      default: Date.now,
    },
    venue: String,
    img: String,
  },
  schemaOptions
);
eventSchema.plugin(mongoosePaginate);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

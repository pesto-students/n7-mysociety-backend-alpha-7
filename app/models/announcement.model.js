const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const schemaOptions = {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const announcementSchema = new mongoose.Schema(
    {
        title: String,
        desc: String,
        societyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Society",
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    schemaOptions
);
announcementSchema.plugin(mongoosePaginate);

const Announcement = mongoose.model("Announcement", announcementSchema);
module.exports = Announcement;

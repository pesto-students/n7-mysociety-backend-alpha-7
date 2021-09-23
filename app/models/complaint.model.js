const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const schemaOptions = {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const commentSchema = new mongoose.Schema({
    time: { type: Date, default: Date.now },
    comment: String,
});
const complaintSchema = new mongoose.Schema(
    {
        title: String,
        desc: String,
        status: String,
        priority: String,
        comments: [commentSchema],
        societyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Society",
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    schemaOptions
);
complaintSchema.plugin(mongoosePaginate);

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const schemaOptions = {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};
const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        mobile: String,
        societyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Society",
        },
        flatNo: String,
        role: String,
        password: String,
        isConfirmed: Boolean,
        isActive: Boolean,
    },
    schemaOptions
);

userSchema.plugin(mongoosePaginate);
const User = mongoose.model("User", userSchema);
module.exports = User;

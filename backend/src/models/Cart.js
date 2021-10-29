const { model, Schema } = require("mongoose");

const cartSchema = new Schema(
    {
        items: [Schema.Types.ObjectId],
        subtotal: Number,
        discount: Number,
        total: Number
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("Cart", cartSchema);

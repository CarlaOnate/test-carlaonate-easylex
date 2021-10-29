const { model, Schema } = require("mongoose");

const cartSchema = new Schema(
    {
        items: [{item: Schema.Types.ObjectId, qty:Number}],
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

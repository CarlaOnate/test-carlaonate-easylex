const { model, Schema } = require("mongoose");

const productSchema = new Schema(
    {
        name: String,
        price: Number,
        type: String
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("Product", productSchema);

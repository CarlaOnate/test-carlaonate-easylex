const {Cart} = require("../models/Cart")

const cart = {

    Query: {},
    Mutation: {
        createCart:async () => {
            await Cart.create({
                items: [],
                subtotal: 0,
                discount: 0,
                total: 0,
            })
            return "Created Cart"
        }
    }
}

module.exports = cart

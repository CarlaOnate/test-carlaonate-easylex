const Cart = require("../models/Cart")
const Product = require("../models/Product")

const cart = {

    Query: {

    },
    Mutation: {
        createCart: async () => {
            const cart = await Cart.create({
                items: [],
                subtotal: 0,
                discount: 0,
                total: 0,
            })
            return cart.id
        },
        addItem: async (_, {type}) => {
            console.log(type)
        },
        calculateDiscount: () => {}

    }
}

module.exports = cart

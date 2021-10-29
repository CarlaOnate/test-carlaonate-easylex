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
        addItem: async (_, {type, cartId}) => {
            console.log(type, cartId)
            const product = await Product.findOne({type: type}).exec()
            console.log(product)

            // const itemInd = cart.items.find()
            // cart.items[itemInd].qty += 1
            // cart.save()
            // console.log(cart)

        },
        calculateDiscount: () => {}

    }
}

module.exports = cart

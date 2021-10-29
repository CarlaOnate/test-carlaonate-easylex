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
            //Buscar type existe ya en cart
                //Si no existe agregra obj a lista
                //Si existe solo sumarle 1
            console.log(type, cartId)
            const product = await Product.findOne({type: type})
            const cart = await Cart.findById(cartId).populate({path: 'items', populate: [{path: 'item', ref: 'Product'}]})
            console.log(cart)

            const itemIndex = cart.items.findIndex(el => el.item.type === type)
            console.log("Index", itemIndex)
            if(itemIndex >= 0){
               cart.items[itemIndex].qty += 1
            } else {
                cart.items.push({item: product.id, qty: 1})
            }
            cart.save()

            console.log(cart)
            return cart
        },
        deleteItem: async (_, {type, cartId}) => {},
        calculateDiscount: () => {}

    }
}

module.exports = cart

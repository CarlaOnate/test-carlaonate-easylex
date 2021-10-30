const Cart = require("../models/Cart")
const Product = require("../models/Product")

const cart = {

    Query: {
        getCart: async (_, {cartId}) => {
            const cart = await Cart.findById(cartId).populate({path: 'items', populate: [{path: 'item', ref: 'Product'}]}).then().catch();
            console.log(cart)
            return cart
        }
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
                //Si no existe agregar obj a lista
                //Si existe solo sumarle 1
            console.log("Add", type, cartId)
            const product = await Product.findOne({type: type})
            const cart = await Cart.findById(cartId).populate({path: 'items', populate: [{path: 'item', ref: 'Product'}]})

            const itemIndex = cart.items.findIndex(el => el.item.type === type)
            if(itemIndex >= 0){
               cart.items[itemIndex].qty += 1
            } else {
                cart.items.push({item: product.id, qty: 1})
            }
            await cart.save()
            await cart.populate({path: 'items', populate: [{path: 'item', ref: 'Product'}]})

            return "Added item"
        },

        deleteItem: async (_, {type, cartId}) => {
            console.log("Del", type, cartId)
            const cart = await Cart.findById(cartId).populate({path: 'items', populate: [{path: 'item', ref: 'Product'}]})
            console.log(cart.items)

            const itemIndex = cart.items.findIndex(el => el.item.type === type)

            if(itemIndex >= 0){
                if(cart.items[itemIndex].qty === 1){
                    const newItems = cart.items.splice(itemIndex, 1)
                    console.log(newItems)
                } else {
                    cart.items[itemIndex].qty -= 1
                }
            }

            await cart.save()

            return "Deleted item"
        },
        calculateDiscount: () => {}

    }
}

module.exports = cart

const Cart = require("../models/Cart")

const cartResolvers = {

    Query: {
        getCart: async (_, {cartId}) => {
            const cart = await Cart.findById(cartId).populate({path: 'items', populate: [{path: 'item', ref: 'Product'}]}).then().catch();
            return cart
        },
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
        calculatePrice: async (_, {cart}) => {
                console.log("cart", cart)
                cart.discount = 0
                //Calculate discounts
                if(cart.items.length > 0){
                    const ndaIndex = cart.items.findIndex(el => el.item.type === "Nda")
                    const termSheetIndex = cart.items.findIndex(el => el.item.type === "TermSheet")

                    if(ndaIndex !== -1){
                    //2x1 in Nda items
                        const {qty} = cart.items[ndaIndex]
                        const {price} = cart.items[ndaIndex].item
                        qty % 2 === 0 ? cart.discount += (price*qty)/2 : cart.discount += ((qty-1)*price)/2
                    }
                    if (termSheetIndex !== -1){
                    //3 or more Termsheet then price is 100 each
                        const {qty} = cart.items[termSheetIndex]
                        const {price} = cart.items[termSheetIndex].item
                        if(qty > 2) cart.discount += (price-100)*qty
                    }

                    cart.subtotal = cart.items.map(el => el.qty*el.item.price).reduce((prev, current) => prev + current).toFixed(2)
                    cart.total = (cart.subtotal*1.16).toFixed(2)
                } else {
                    cart.total = 0
                    cart.subtotal = 0
                }

                console.log("final cart", cart)

                return cart

        }

    }
}

module.exports = cartResolvers

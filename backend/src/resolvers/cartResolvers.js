const Cart = require("../models/Cart")
const Product = require("../models/Product")

const cartResolvers = {

    Query: {
        getCart: async (_, {cartId}) => {
            const cart = await Cart.findById(cartId).populate({path: 'items', populate: [{path: 'item', ref: 'Product'}]}).then().catch();
            console.log(cart)
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

        addItem: async (_, {type, cartId}) => {
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
            await cartResolvers.Mutation.calculatePrice(cartId)

            await cart.populate({path: 'items', populate: [{path: 'item', ref: 'Product'}]})

            return "Added item"
        },

        deleteItem: async (_, {type, cartId}) => {
            console.log("Del", type, cartId)
            const cart = await Cart.findById(cartId).populate({path: 'items', populate: [{path: 'item', ref: 'Product'}]})

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
            await cartResolvers.Mutation.calculatePrice(cartId)

            return "Deleted item"
        },
        calculatePrice: async (cartId) => {
            console.log("calculateDis inside", cartId)
            const cart = await Cart.findById(cartId).populate({path: 'items', populate: [{path: 'item', ref: 'Product'}]})
            cart.discount = 0
            console.log(cart)
            //Calculate discounts
            if(cart.items.length > 0){
                const ndaIndex = cart.items.findIndex(el => el.item.type === "Nda")
                const termSheetIndex = cart.items.findIndex(el => el.item.type === "TermSheet")
                console.log("Indexes", ndaIndex, termSheetIndex)

                if(ndaIndex !== -1){
                //2 of Nda items menas price of one
                    console.log(cart.items, cart.items[ndaIndex])
                    const {qty} = cart.items[ndaIndex]
                    const {price} = cart.items[ndaIndex].item
                    qty % 2 === 0 ? cart.discount += (price*qty)/2 : cart.discount += ((qty-1)*price)/2
                    console.log("Nda", cart.discount, qty)
                }
                if (termSheetIndex !== -1){
                //3 or more Termsheet then price is 100 each
                    console.log(cart.items, cart.items[termSheetIndex])
                    const {qty} = cart.items[termSheetIndex]
                    const {price} = cart.items[termSheetIndex].item
                    if(qty > 2) cart.discount += (price-100)*qty
                    console.log("TermSheet", cart.discount, qty)
                }

                cart.subtotal = cart.items.reduce((prev, current) => (prev.qty*prev.item.price)+(current.qty*current.item.price))
                cart.total = cart.subtotal*1.16


                cart.save()
                console.log(cart)

            }

            return cart

        }

    }
}

module.exports = cartResolvers

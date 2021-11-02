const Cart = require("../models/Cart")
const Product = require("../models/Product")

const cartResolvers = {

    Query: {
        //Regresa el carrito que se tiene guardado en DB
        getCart: async (_, {cartId}) => {
            const cart = await Cart.findById(cartId).populate({path: 'items', populate: [{path: 'item', ref: 'Product'}]}).then().catch();
            return cart
        },
    },

    Mutation: {
        createCart: async () => {
            //Se crea el carrito en DB y regresa el ID para accesarlo en otros resolvers
            const cart = await Cart.create({
                items: [],
                subtotal: 0,
                discount: 0,
                total: 0,
            })
            return cart.id
        },

        addItem: async (_, {type, cartId}) => {
            const product = await Product.findOne({type: type})
            const cart = await Cart.findById(cartId).populate({path: 'items', populate: [{path: 'item', ref: 'Product'}]})

            //Si el elemento existe entonces agregar +1 a llave qty o sino agregar elemento con qty: 1 al array de items
            const itemIndex = cart.items.findIndex(el => el.item.type === type)
            if(itemIndex >= 0){
               cart.items[itemIndex].qty += 1
            } else {
                cart.items.push({item: product.id, qty: 1})
            }

            await cart.save()
            await cartResolvers.Mutation.calculatePrice(cartId)

            //Se hace un populate para regresar el carrito con todos los objectos correspondientes dentro de items.
            //En la base de datos el item es el ID de ese objeto
            await cart.populate({path: 'items', populate: [{path: 'item', ref: 'Product'}]})

            return "Added item"
        },

        deleteItem: async (_, {type, cartId}) => {
            const cart = await Cart.findById(cartId).populate({path: 'items', populate: [{path: 'item', ref: 'Product'}]})

            const itemIndex = cart.items.findIndex(el => el.item.type === type)
            //Si el elemento esta dentro de la lista
            if(itemIndex >= 0){
                //Borrarlo del array en caso de que solo existe 1 elemento de ese tipo
                if(cart.items[itemIndex].qty === 1){
                    const newItems = cart.items.splice(itemIndex, 1)
                    console.log(newItems)
                } else {
                    //Restarle 1 a la cantidad de ese elemento cuando qty sea mayor a 1
                    cart.items[itemIndex].qty -= 1
                }
            }
            await cart.save()
            //Se llama a calculate price antes de regresar el string para actualizar el carrito con los precios correspondientes
            await cartResolvers.Mutation.calculatePrice(cartId)

            return "Deleted item"
        },
        calculatePrice: async (cartId) => {
            const cart = await Cart.findById(cartId).populate({path: 'items', populate: [{path: 'item', ref: 'Product'}]})
            cart.discount = 0
            //Calculate discounts
            if(cart.items.length > 0){
                //Buscar si existe algún elemento tipo Nda O TermSheet
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
                //Se agrega un toFixed para que los elementos no tengan mas de dos decimales
                cart.discount = cart.discount.toFixed(2)
                cart.subtotal = (cart.items.map(el => el.qty*el.item.price).reduce((prev, current) => prev + current)-cart.discount).toFixed(2)
                cart.total = ((cart.subtotal*1.16)-cart.discount).toFixed(2)
                cart.save()
            } else {
                //Si no hay elementos en el array entonces los precios son 0
                //Esto hace un reset en caso que se eliminen todos los elementos de la lista
                cart.total = 0
                cart.subtotal = 0
                cart.save()
            }

            return "Price updated in cart"

        }

    }
}

module.exports = cartResolvers

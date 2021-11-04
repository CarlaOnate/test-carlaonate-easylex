
exports.saveCart = async ({body}, res) => {
    //se crea un nuevo carrito en la base de datos con los valores del cart guardado en react hasta este momento y lo regresa
    // const newCart = await Cart.create({
    //     items: cart.items.map(el => ({
    //         item: el.item.id,
    //         qty: el.qty
    //     })), total: cart.total, subtotal: cart.subtotal, discount: cart.discount
    // })
    // await newCart.populate({path: 'items', populate: [{path: 'item', ref: 'Product'}]}).then().catch()
    // res.status(200).json({
    //     id: newCart._id,
    //     items: newCart.items.map(el => ({
    //         qty: el.qty,
    //         item: {
    //             id: el.item._id,
    //             name: el.item.name,
    //             price: el.item.price,
    //             type: el.item.type
    //         }
    //     })),
    //     subtotal: newCart.subtotal,
    //     discount: newCart.discount,
    //     total: newCart.total
    // })
    res.status(200).json({msg: "saceCart"})
}


exports.calculatePrice = async ({body}, res) => {
    //Se calculan los descuentos usando el carrito hasta ese momento
    // cart.discount = 0 //Se inicializa la llave descuento
    // //Calculate discounts
    // if(cart.items.length > 0){
    //     const ndaIndex = cart.items.findIndex(el => el.item.type === "Nda")
    //     const termSheetIndex = cart.items.findIndex(el => el.item.type === "TermSheet")
    //
    //     if(ndaIndex !== -1){
    //         //2x1 in Nda items
    //         const {qty} = cart.items[ndaIndex]
    //         const {price} = cart.items[ndaIndex].item
    //         qty % 2 === 0 ? cart.discount += (price*qty)/2 : cart.discount += ((qty-1)*price)/2
    //     }
    //     if (termSheetIndex !== -1){
    //         //3 or more Termsheet then price is 100 each
    //         const {qty} = cart.items[termSheetIndex]
    //         const {price} = cart.items[termSheetIndex].item
    //         if(qty > 2) cart.discount += (price-100)*qty
    //     }
    //     //Se le agrega un toFixed para que numeros no tengan mas de dos decimales
    //     cart.discount = cart.discount.toFixed(2)
    //     cart.subtotal = (cart.items.map(el => el.qty*el.item.price).reduce((prev, current) => prev + current)-cart.discount).toFixed(2)
    //     cart.total = ((cart.subtotal*1.16)-cart.discount).toFixed(2)
    // } else {
    //     //Si nuestro carrito esta vacío se agregan los valores restantes del precio como 0
    //     //Esto hace reset los precios cuando se eliminan los elementos del carrito
    //     cart.total = 0
    //     cart.subtotal = 0
    // }

    res.status(200).json({msg: "calc Price"})

}

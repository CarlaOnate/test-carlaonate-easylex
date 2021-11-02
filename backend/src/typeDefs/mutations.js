const {gql} = require("apollo-server-express")

//Estas son las mutaciones de esta app
const mutations = gql`
    type Mutation {
        #Product
        fillProducts: String #Esta solo se usó manualmente para agregar la lista de prodctos a la base de datos. 
        
        #Cart
        saveCart(cart: CartInput): Cart #Guarda el carrito de react en la base de datos y regresa el carrito guardado con su id
        calculatePrice(cart: CartInput): Cart #Calcula el precio usando el carrito como input, regresa objeto cart modificado
    }
`

module.exports = mutations

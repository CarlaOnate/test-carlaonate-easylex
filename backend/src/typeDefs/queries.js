const {gql} = require("apollo-server-express")

const queries = gql`
    
    type Query {
        #Product
        getProducts: [Product], #Regresa un arra y de productos guardados en la colección de Products
        #Cart
        getCart(cartId: ID): Cart #Regresa el carrito que se tiene guardado en la DB
        
    }
`

module.exports = queries

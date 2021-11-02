const {gql} = require("apollo-server-express")

const queries = gql`
    type Query {
        #Product
        getProducts: [Product], #Regresa la lista de productos con sus respectivos precios y tipo de documento
        #Cart
        getCart(cartId: ID): Cart #Regresa el carrito guardado en la base de datos. Esta función no fue necesaria en esta verisón
        
    }
`

module.exports = queries

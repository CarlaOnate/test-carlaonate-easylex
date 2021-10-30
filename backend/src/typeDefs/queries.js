const {gql} = require("apollo-server-express")

const queries = gql`
    type Query {
        #Product
        getProducts: [Product],
        #Cart
        getCart(cartId: ID): Cart
        
    }
`

module.exports = queries

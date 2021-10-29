const {gql} = require("apollo-server-express")

const queries = gql`
    type Query {
        #Product
        getProduct(type: String): Product,
        getProducts: [Product],
        getPrice(type: String): Int
        
    }
`

module.exports = queries

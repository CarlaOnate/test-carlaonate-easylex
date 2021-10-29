const {gql} = require("apollo-server-express")

const queries = gql`
    type Query {
        #Product
        getProduct(type: String): Product,
        getPrice(type: String): Int
        
    }
`

module.exports = queries

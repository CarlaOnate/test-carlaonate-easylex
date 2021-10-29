const {gql} = require("apollo-server-express")

const types = gql`
    type Product {
        id: ID!
        name: String
        price: Int
        type: String
        qty: Int
    } 
    
    type Cart {
        id: ID!
        items: [Product]
        subtotal: Int
        discount: Int
        total: Int
    }
`

module.exports = types

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
        items: [Items]
        subtotal: Int
        discount: Int
        total: Int
    }
    
    type Items {
        item: Product
        qty: Int
    }
`

module.exports = types

const {gql} = require("apollo-server-express")

const types = gql`
    type Product {
        id: ID!
        name: String
        price: Float
        type: String
        qty: Int
    } 
    
    type Cart {
        id: ID!
        items: [Items]
        subtotal: Float
        discount: Float
        total: Float
    }
    
    type Items {
        item: Product
        qty: Int
    }
`

module.exports = types

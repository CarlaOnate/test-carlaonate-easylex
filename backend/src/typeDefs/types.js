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
    
    input CartInput {
        items: [ItemInput]
        subtotal: Float
        discount: Float
        total: Float
    }
    
    input ItemInput {
        item: ProductInput
        qty: Int
    }
    
    input ProductInput {
        id: ID!
        name: String
        price: Float
        type: String
    }
`

module.exports = types

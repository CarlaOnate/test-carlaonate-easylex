const {gql} = require("apollo-server-express")

//Solo se tiene tipos de Output porque de input solo se usan Strings
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

const {gql} = require("apollo-server-express")

//Estos son los tipos que se usarán en nuestro backend
//Los valores de type son para output y los de input son para input de los queries o mutations.
const types = gql`
    #Outputs
    type Product {
        id: ID!
        name: String
        price: Float
        type: String
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
    #Inputs
    input CartInput {
        id: ID
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

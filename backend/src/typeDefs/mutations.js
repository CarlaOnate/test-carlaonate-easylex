const {gql} = require("apollo-server-express")

const mutations = gql`
    type Mutation {
        #Product
        fillProducts: String
        
        #Cart 
        createCart: ID!
        updateCart(type: String, cartId: ID, operation: String): Cart
        addItem(type: String, cartId: ID): String
        deleteItem(type: String, cartId: ID): String
        calculatePrice(cartId: ID): Cart
    }
`

module.exports = mutations

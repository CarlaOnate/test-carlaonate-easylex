const {gql} = require("apollo-server-express")

const mutations = gql`
    type Mutation {
        #Product
        fillProducts: String
        
        #Cart 
        createCart: ID!
        addItem(type: String, cartId: ID): Cart
        deleteItem(type: String, cartId: ID): Cart
        calculateDiscount: Cart
    }
`

module.exports = mutations

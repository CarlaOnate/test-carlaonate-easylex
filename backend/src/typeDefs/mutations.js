const {gql} = require("apollo-server-express")

const mutations = gql`
    type Mutation {
        #Product
        fillProducts: String
        
        #Cart 
        createCart: ID!
        addItem(type: String, cart: ID): Cart 
        calculateDiscount: Cart
    }
`

module.exports = mutations

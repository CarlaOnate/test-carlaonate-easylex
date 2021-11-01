const {gql} = require("apollo-server-express")

const mutations = gql`
    type Mutation {
        #Product
        fillProducts: String #Used once to add items to DB
        
        #Cart
        saveCart(cart: CartInput): Cart
        calculatePrice(cart: CartInput): Cart
    }
`

module.exports = mutations

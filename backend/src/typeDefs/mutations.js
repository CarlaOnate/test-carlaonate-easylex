const {gql} = require("apollo-server-express")

const mutations = gql`
    type Mutation {
        #Product
        fillProducts: String #Used once to add items to DB
        
        #Cart 
        createCart: ID!
        addItem(type: String, cartId: ID): String
        deleteItem(type: String, cartId: ID): String
        calculatePrice(cartId: ID): String
    }
`

module.exports = mutations

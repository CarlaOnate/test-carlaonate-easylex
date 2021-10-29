const {gql} = require("apollo-server-express")

const mutations = gql`
    type Mutation {
        #Product
        fillProducts: String
        
        #Cart 
        createCart: String
        addItem(type: String): Cart 
    }
`

module.exports = mutations

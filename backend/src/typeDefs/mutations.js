const {gql} = require("apollo-server-express")

const mutations = gql`
    type Mutation {
        createCart: String
        fillProducts: String
    }
`

module.exports = mutations

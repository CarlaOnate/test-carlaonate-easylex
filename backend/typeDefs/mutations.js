const {gql} = require("apollo-server-express")

const mutations = gql`
    type Mutation {
        addItem(input: String): String
    }
`

module.exports = mutations

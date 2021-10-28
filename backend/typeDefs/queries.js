const {gql} = require("apollo-server-express")

const queries = gql`
    type Query {
        cart(input: String): String
    }
`

module.exports = queries

const {gql} = require("apollo-server-express")

const types = gql`
    type sth {
        products: [String]
    } 
`

module.exports = types

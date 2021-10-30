const cartResolvers = require('./cartResolvers')
const productResolvers = require('./productResolvers')

const resolvers = [
    cartResolvers,
    productResolvers
]

module.exports = resolvers

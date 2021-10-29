const cartResolvers = require('./cart')
const productResolvers = require('./product')

const resolvers = [
    cartResolvers,
    productResolvers
]

module.exports = resolvers

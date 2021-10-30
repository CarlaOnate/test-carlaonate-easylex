const Product = require("../models/Product")

const productResolvers = {

    Query: {
        getProducts: async () => {
            return Product.find();
        }

    },

    Mutation: {
        //This was called once to fill the DB with the products
        fillProducts: async () => {
            await Product.create({
                name: "Confidencialidad",
                price: 500,
                type: "Nda"
            })
            await Product.create({
                name: "Carta poder",
                price: 150.50,
                type: "PowerLetter"
            })
            await Product.create({
                name: "Acuerdo de inversion",
                price: 170.60,
                type: "TermSheet"
            })
            await Product.create({
                name: "Arrendamiento",
                price: 342,
                type: "Leasing"
            })
            await Product.create({
                name: "Trabajo",
                price: 700.50,
                type: "Employment"
            })
            return "Added products to DB"
        }
    }

}

module.exports = productResolvers

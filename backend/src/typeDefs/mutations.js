const {gql} = require("apollo-server-express")


const mutations = gql`
    type Mutation {
        #Product
        fillProducts: String #Used once to add items to DB
        
        #Cart 
        createCart: ID! #Crea el carrito en DB y regresa ID, solo se corré al inicio de la aplicación
        addItem(type: String, cartId: ID): String #Agrega el elemento al carrito, lo guarda en la DB y regresa el carrito actualizado
        deleteItem(type: String, cartId: ID): String #Borra el elemento del carrito, guarda cambio en DB y regresa carrito actualizado
        calculatePrice(cartId: ID): String #Calcula los precios del carrito actual, guarda en DB y regresa carrito actualizado
    }
`

module.exports = mutations

import axios from 'axios'
let baseURL = 'http://localhost:4000'

export const service = axios.create({baseURL, withCredentials:true})

//All the endpoints for the Product Model
export const PRODUCT_SERVICE = {
    getProducts: async () => await service.get('/products/get-products')
}

//All the endpoint for the Cart model
export const CART_SERVICE = {
    getCart: async (id) => await service.get(`/cart/${id}`), //return specific cart using ID to find it
    saveCart: async (cart) => await service.post('/cart/save', cart), //send cart, save in DB and return id
    calculatePrice: async (cart) => await service.put('/cart/price', cart) //calculate current cart price and return updated cart

}


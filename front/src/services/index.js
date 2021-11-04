import axios from 'axios'
let baseURL = 'http://localhost:4000'

export const service = axios.create({baseURL, withCredentials:true})

export const PRODUCT_SERVICE = {
    getProducts: async () => await service.get('/products/get-products')
}


export const CART_SERVICE = {
    saveCart: async () => await service.post('cart/save'),
    calculatePrice: async (cart) => await service.get('cart/price', cart)
}


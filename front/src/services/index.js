import axios from 'axios'
let baseURL = 'http://localhost:4000'

export const service = axios.create({baseURL, withCredentials:true})

export const PRODUCT_SERVICE = {
    getProducts: async () => await service.get('/products/get-products')
}


export const CART_SERVICE = {
    getCart: async (id) => await service.get(`/cart/${id}`),
    saveCart: async (cart) => await service.post('/cart/save', cart),
    calculatePrice: async (cart) => await service.put('/cart/price', cart)

}


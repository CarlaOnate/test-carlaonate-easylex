
const express = require('express');
const router = express.Router();

const {getCart, saveCart, calculatePrice} = require('../controllers/Cart')

router.get('/:id', getCart)  //get cart from DB with id
router.post('/save', saveCart) //save cart in DB and return cartId
router.put('/price', calculatePrice) //Calculate price of current cart

module.exports = router

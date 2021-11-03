
const express = require('express');
const router = express.Router();

const {saveCart, calculatePrice} = require('../controllers/Cart')

router.post('/save', saveCart)
router.get('/price', calculatePrice) //Todo: Sería get???

module.exports = router

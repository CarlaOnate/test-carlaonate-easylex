const Product = require('../../models/Product')

exports.getProducts = async (req, res) => {
    //Regresa productos que se tienen en colección de Products.
    const products = await Product.find()
    res.status(200).json({products})
}

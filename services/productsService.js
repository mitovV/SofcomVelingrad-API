import Product from '../data/models/Product.js'

const all = () => {
    return Product.find()
}

export default {
    all
}
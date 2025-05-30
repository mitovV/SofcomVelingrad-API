import Product from '../data/models/Product.js'

const all = () => {
    return Product.find()
}

const create = (
    categoryId,
    categoryName,
    material,
    weight,
    size,
    goldCarat,
    condition,
    silverCarat,
    title,
    model,
    brand,
    ram,
    rom,
    price,
    description
) => {
    let product = new Product({
        categoryId, categoryName, material, weight, size, goldCarat, condition, silverCarat, title,
        model, brand, ram, rom, price, description
    })

    return product.save()
}

const latest = () => {
    return Product.find()
        .sort({ 'createdOn': -1 })
        .limit(8)
}

const getByCategoryId = (id, material) => {
    if (material) {
        return Product.find({ categoryId: id, material }).populate('goldCarat').populate('size')
            .then(async (products) => {
                const productsWithPrices = await Promise.all(products.map(async (product) => {
                    const goldPrice = await product.calculateGoldPrice()

                    return { ...product.toObject(), goldCalcPrice: goldPrice }
                }))
                
               return productsWithPrices
            })
    }

    return Product.find({ categoryId: id })
}

const getById = async (id) => {
    let product = await Product.findById(id).populate('size').populate('goldCarat')
    const goldPrice = await product.calculateGoldPrice()

    return { ...product.toObject(), goldCalcPrice: goldPrice }
}

export default {
    all,
    create,
    latest,
    getByCategoryId,
    getById
}

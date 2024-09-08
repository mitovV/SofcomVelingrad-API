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
        return Product.find({ categoryId: id, material })
            .then(async (products) => {
                const productsWithPrices = await Promise.all(products.map(async (product) => {
                    const goldPrice = await product.calculateGoldPrice()

                    return { ...product.toObject(), goldCalcPrice: goldPrice }
                }))
console.log(productsWithPrices);

               return productsWithPrices
            })
    }

    return Product.find({ categoryId: id })
}

export default {
    all,
    create,
    latest,
    getByCategoryId
}
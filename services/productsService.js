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
        categoryId, categoryName, material, weight, size, goldCarat, silverCarat, title,
        model, brand, ram, rom, price, description
    })

    return product.save()
}

const latest = () => {
    return Product.find()
        .sort({ 'createdOn': -1 })
        .limit(10)
}

export default {
    all,
    create,
    latest
}
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
    let product = new Product({categoryId, categoryName, material, weight, size, goldCarat, silverCarat, title,
        model, brand, ram, rom, price, description})

        return product.save()
}

export default {
    all,
    create
}
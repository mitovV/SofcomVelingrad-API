import GoldPrice from '../data/models/GoldPrice.js'

const all = () => {
    return GoldPrice.find()
}

const create = async (condition, price) => {
    let goldPrice = new GoldPrice({condition, price})

    return await goldPrice.save()
}

export default {
    all,
    create
}
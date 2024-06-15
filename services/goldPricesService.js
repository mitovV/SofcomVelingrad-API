import GoldPrice from "../data/models/GoldPrice.js"

const all = async () => {
    return await GoldPrice.find()
}

export default {
    all
}
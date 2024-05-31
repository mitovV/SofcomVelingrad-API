import MainCategory from "../data/models/MainCategory.js"

const all = () => {
    return MainCategory.find().populate('subCategories')
}

export default {
    all
}
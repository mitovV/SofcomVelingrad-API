import MainCategory from "../data/models/MainCategory.js"

const all = () => {
    return MainCategory.find().populate({
        path: 'subCategories',
        populate: {
            path: 'subCategories'
        }
    })
}

export default {
    all
}
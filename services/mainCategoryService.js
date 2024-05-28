import MainCategory from "../data/models/MainCategory.js"

const all = () => {
    return MainCategory.find()
}

export default {
    all
}
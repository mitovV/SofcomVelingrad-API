import MainCategory from "../data/models/MainCategory.js"
import SubCategory from  "../data/models/SubCategory.js"
import RingCategory from "../data/models/RingCategory.js"

const all = () => {
    return MainCategory.find().populate({
        path: 'subCategories',
        populate: {
            path: 'subCategories'
        }
    })
}

const getById = async (id) => {
    let mainCategory =  await MainCategory.findOne({_id: id}).lean()

    if(!mainCategory){
        let subCategory = await SubCategory.findOne({_id: id}).lean()

        if(!subCategory){
            return await RingCategory.findOne({_id: id}).lean()
        }
        else{
            return subCategory
        }
    }
    else{
        return mainCategory
    }
}

export default {
    all,
    getById
}
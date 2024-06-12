import MainCategory from "../data/models/MainCategory.js"
import SubCategory from  "../data/models/SubCategory.js"
import RingCategory from "../data/models/RingCategory.js"

const mainAll = () => {
    return MainCategory.find().populate({
        path: 'subCategories',
        populate: {
            path: 'subCategories'
        }
    })
}

const subAll = () => {
    return SubCategory.find()
}

const ringAll = () => {
    return RingCategory.find()
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

const updateMain = async (_id, name) => {
    return await MainCategory.findOneAndUpdate({_id}, {name})
}

const updateSub = async (_id, name) => {
    return await SubCategory.findOneAndUpdate({_id}, {name})
}

const updateRing = async (_id, name) => {
    return await RingCategory.findOneAndUpdate({_id}, {name})
}

const deleteRingById = async (_id) => {
    return await RingCategory.deleteOne({_id})
}

const deleteMainById = async (_id) => {
    return await MainCategory.deleteOne({_id})
}

const deleteSubById = async (_id) => {
    return await SubCategory.deleteOne({_id})
}

export default {
    mainAll,
    getById,
    subAll,
    ringAll,
    updateMain,
    updateSub,
    updateRing,
    deleteRingById,
    deleteMainById,
    deleteSubById
}
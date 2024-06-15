import MainCategory from "../data/models/MainCategory.js"
import SubCategory from "../data/models/SubCategory.js"
import RingCategory from "../data/models/RingCategory.js"

const mainAll = () => {
    return MainCategory.find().populate({
        path: 'subCategories',
        populate: {
            path: 'subCategories'
        }
    })
}

const mainAllWhichHaveSub = () => {
    return MainCategory.find({ subCategories: { $ne: [] } })
}

const getSubByParentId = (id) => {
    return SubCategory.find({
        $or: [
            { parentId: id },
            { secondParentId: id }
        ]
    })
}

const createMain = async (name) => {
    let category = new MainCategory({ name })

    return await category.save()
}

const createSub = async (categoryId, name) => {
    let subCategory = new SubCategory({ parentId: categoryId, name })

    await subCategory.save()

    let mainCategory = await MainCategory.findById(categoryId)
    mainCategory.subCategories.push(subCategory)
    return await mainCategory.save()
}

const subAll = () => {
    return SubCategory.find()
}

const ringAll = () => {
    return RingCategory.find()
}

const getById = async (id) => {
    let mainCategory = await MainCategory.findOne({ _id: id }).lean()

    if (!mainCategory) {
        let subCategory = await SubCategory.findOne({ _id: id }).lean()

        if (!subCategory) {
            return await RingCategory.findOne({ _id: id }).lean()
        }
        else {
            return subCategory
        }
    }
    else {
        return mainCategory
    }
}

const updateMain = async (_id, name) => {
    return await MainCategory.findOneAndUpdate({ _id }, { name })
}

const updateSub = async (_id, name) => {
    return await SubCategory.findOneAndUpdate({ _id }, { name })
}

const updateRing = async (_id, name) => {
    return await RingCategory.findOneAndUpdate({ _id }, { name })
}

const deleteRingById = async (_id) => {
    return await RingCategory.deleteOne({ _id })
}

const deleteMainById = async (_id) => {
    return await MainCategory.deleteOne({ _id })
}

const deleteSubById = async (_id) => {
    let subCategory = await SubCategory.findById(_id)
    let parentId = subCategory.parentId
    let secondParentId = subCategory.secondParentId

    let parent = await MainCategory.findById(parentId)
    let secondParent = await MainCategory.findById(secondParentId)

    if (parent) {
        parent.subCategories.remove(subCategory._id)
    }

    if (secondParent) {
        secondParent.subCategories.remove(subCategory._id)
    }

    await parent.save()
    await secondParent.save()

    return await SubCategory.findByIdAndDelete(_id)
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
    deleteSubById,
    createMain,
    createSub,
    mainAllWhichHaveSub,
    getSubByParentId
}
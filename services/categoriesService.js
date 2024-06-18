import Category from "../data/models/Category.js"

const mainAll = () => {
    return Category.find({parentId: null}).populate({
        path: 'subCategories',
        populate: {
            path: 'subCategories'
        }
    })
}

const all = (offset, limit) => {
    return Category.find().sort({name : 'asc'}).skip(offset).limit(limit)
}

const count = async () => {
    return await Category.countDocuments()
 }

const create = async (name, parentId, secondParentId) => {
    let category = new Category({ name, parentId, secondParentId })
    await category.save()

    if (parentId) {
        let parent = Category.findById(parentId)
        parent.subCategories.push(category)
        await category.save()

        if (secondParentId) {
            let secondParent = Category.findById(secondParentId)
            secondParent.subCategories.push(category)
            await secondParent.save()
        }
    }

    return category
}


const update = async (_id, name) => {
    return await Category.findOneAndUpdate({ _id }, { name })
}

export const getById = async (_id) => {
    return await Category.findById(_id)
}

const deleteById = async (_id) => {
    let category = await Category.findById(_id)

    if(category.parentId){
        let parent = Category.findById(category.parentId)
        parent.subCategories.remove(_id)
        await parent.save()

        if(category.secondParentId){
            let secondParent = Category.findById(category.secondParentId)
            secondParent.subCategories.remove(_id)
            await secondParent.save()
        }
    }

    return await Category.findByIdAndDelete(_id)
}

export default {
    mainAll,
    all,
    create, 
    update,
    getById,
    deleteById,
    count
}
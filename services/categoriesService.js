import Category from "../data/models/Category.js"

const mainAll = async () => {
  const populateSubCategories = async (category) => {
    await category.populate('subCategories')

    const promises = category.subCategories.map(async (child) => {
      return await populateSubCategories(child)
    })
    await Promise.all(promises)
    return category
  };

  const findTopLevelCategoriesWithSubCategories = async () => {
    try {
      const topCategories = await Category.find({ parentId: null }).exec()
      const populatedCategories = await Promise.all(topCategories.map(async (category) => {
        return await populateSubCategories(category)
      }))
      return populatedCategories
    } catch (err) {
      console.error(err)
    }
  }

  return await findTopLevelCategoriesWithSubCategories()
}

const all = (offset, limit) => {
  return Category.find().sort({ name: 'asc' }).skip(offset).limit(limit)
}

const count = async () => {
  return await Category.countDocuments()
}

const create = async (name, parentId, secondParentId) => {
  let category = new Category({ name, parentId, secondParentId })

  if (parentId) {
    let parent = await Category.findById(parentId)
    parent.subCategories.push(category)
    await parent.save()

    if (secondParentId) {
      let secondParent = await Category.findById(secondParentId)
      secondParent.subCategories.push(category)
      await secondParent.save()
    }
  }

  return await category.save()
}


const update = async (_id, name) => {
  return await Category.findOneAndUpdate({ _id }, { name })
}

export const getById = async (_id) => {
  return await Category.findById(_id)
}

const deleteById = async (_id) => {
  let category = await Category.findById(_id)

  if (category.parentId) {
    let parent = await Category.findById(category.parentId)
    parent.subCategories.remove(category)
    await parent.save()

    if (category.secondParentId) {
      let secondParent = await Category.findById(category.secondParentId)
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

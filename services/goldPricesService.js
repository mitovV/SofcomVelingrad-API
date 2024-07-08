import GoldPrice from '../data/models/GoldPrice.js'

const all = () => {
    return GoldPrice.find().populate('condition')
}

const create = async (condition, price) => {
    let goldPrice = new GoldPrice({condition, price})

    return await goldPrice.save()
}

const getById = async (_id) => {
    return await GoldPrice.findById(_id)
}

const update = async (_id, condition, price) => {
    return await GoldPrice.findOneAndUpdate({ _id }, { condition, price })
  }

const deleteById = async (_id) => {
    return await GoldPrice.deleteOne({_id})
}

export default {
    all,
    create,
    getById,
    update,
    deleteById
}
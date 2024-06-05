import RingSize from "../data/models/RingSize.js"

const create = async (size) => {
    let ringSize = new RingSize({ size })

    return await ringSize.save()
}

const all = async (offset, limit) => {
    return await RingSize.find({}).sort({size : 'asc'}).skip(offset).limit(limit).lean()
}

const count = async () => {
   return await RingSize.countDocuments()
}

const getBySize = async (size) => {
    return await RingSize.findOne({ size })
}

const getById = async (_id) => {
    return await RingSize.findOne({ _id })
}

const deleteById = async (_id) => {
    return await RingSize.deleteOne({_id})
}

const update = async (_id, size) => {
    return await RingSize.findOneAndUpdate({_id}, {size})
}

export default {
    create,
    all,
    count,
    getBySize,
    getById,
    deleteById,
    update
}
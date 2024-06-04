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

export default {
    create,
    all,
    getBySize,
    count
}
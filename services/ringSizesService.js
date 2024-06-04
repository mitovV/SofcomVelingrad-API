import RingSize from "../data/models/RingSize.js"

const create = async (size) => {

    let ringSize = new RingSize({ size })

    return await ringSize.save()
}

const all = async () => {
    return await RingSize.find({}).lean()
}

const getBySize = async (size) => {
    return await RingSize.findOne({ size })
}

export default {
    create,
    all
}
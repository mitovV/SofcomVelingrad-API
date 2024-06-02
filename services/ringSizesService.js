import RingSize from "../data/models/RingSize.js"

const create = async (value) => {
    let ringSize = new RingSize(value)

    return await ringSize.save()
}

const all = async () => {
    return await RingSize.find({}).lean()
}

export default {
    create,
    all
}
import RingSize from "../data/models/RingSize"

const create = async (value) => {
    let ringSize = new RingSize(value)

    return await ringSize.save()
}

export default {
    create
}
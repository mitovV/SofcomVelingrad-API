import GoldCondition from '../data/models/GoldCondition.js'

const all = () => {
    return GoldCondition.find()
}

const create = async (name) => {
    let goldCondition = new GoldCondition({ name })

    return await goldCondition.save()
}

export default {
    all,
    create,
}
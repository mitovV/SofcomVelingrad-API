import GoldCondition from '../data/models/GoldCondition.js'

const all = () => {
    return GoldCondition.find()
}

export default {
    all
}
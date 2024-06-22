import GoldCarat from '../data/models/GoldCarat.js'

const all = () => {
    return GoldCarat.find()
}

export default {
    all
}
import SilverCarat from '../data/models/SilverCarat.js'

const all = () => {
    return SilverCarat.find()
}

export default {
    all
}
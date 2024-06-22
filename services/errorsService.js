import Error from '../data/models/Error.js'

const log = async (error) => {
    let errorObj = new Error({ error })
    return await errorObj.save()
}

export default {
    log
}
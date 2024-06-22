import mongoose from 'mongoose'

const { Schema } = mongoose

const ringSizeSchema = new Schema({
    size: {
        type: String,
        require: true,
        minLength: [3, 'Size must be more than 3 characters'],
        unique: true,
    }
})

export default mongoose.model('RingSize', ringSizeSchema)
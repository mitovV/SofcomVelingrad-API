import mongoose from "mongoose"

const { Schema } = mongoose

const ringSizeSchema = new Schema({
    value: {
        type: String,
        require: true,
    }
})

export default mongoose.model('RingSize', ringSizeSchema)
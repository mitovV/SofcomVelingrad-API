import mongoose, { Schema } from "mongoose"

const { Schema } = mongoose

const goldPriceSchema = new Schema({
    condition: {
        type: String,
        require: true,
        enum: ['new', 'used'],
    },
    price: {
        type: Number,
        require: true
    }
})

export default mongoose.model('goldPrice', goldPriceSchema)
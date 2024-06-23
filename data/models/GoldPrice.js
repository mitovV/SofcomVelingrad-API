import mongoose  from 'mongoose'

const { Schema } = mongoose

const goldPriceSchema = new Schema({
    condition: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true
    }
})

export default mongoose.model('goldPrice', goldPriceSchema)
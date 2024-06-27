import mongoose  from 'mongoose'

const { Schema } = mongoose

const goldPriceSchema = new Schema({
    condition: {
        type: mongoose.Types.ObjectId,
        ref: 'GoldCondition',
        require: true,
    },
    price: {
        type: Number,
        require: true
    }
})

export default mongoose.model('goldPrice', goldPriceSchema)
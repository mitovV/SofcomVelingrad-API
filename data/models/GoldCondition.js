import mongoose from 'mongoose'

const { Schema } = mongoose

const goldConditionSchema = new Schema({
    name: {
        type: String,
        require: true
    }
})

export default mongoose.model('GoldCondition', goldConditionSchema)
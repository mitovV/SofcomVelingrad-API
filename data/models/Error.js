import mongoose from "mongoose"

const { Schema } = mongoose

const errorSchema = new Schema({
    error: {
        type: Object,
        require: true
    },
    created: {
        type: Date
    }
})

errorSchema.pre('save', function(next) {
    this.created = Date.now()
    next()
})

export default mongoose.model('Error', errorSchema)
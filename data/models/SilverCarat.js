import mongoose from 'mongoose'

const { Schema } = mongoose

const silverCaratSchema = new Schema({
    carat: {
        type: String,
        require: true,
        minLength: [3, 'Silver carat must be more than 3 characters'],
        unique: true,
    }
})

export default mongoose.model('SilverCarat', silverCaratSchema)
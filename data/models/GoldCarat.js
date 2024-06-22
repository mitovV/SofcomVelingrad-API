import mongoose from "mongoose"

const { Schema } = mongoose

const goldCaratSchema = new Schema({
    carat: {
        type: String,
        require: true,
        minLength: [3, 'Gold carat must be more than 3 characters'],
        unique: true,
    }
})

export default mongoose.model('GoldCarat', goldCaratSchema)
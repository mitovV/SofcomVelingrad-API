import mongoose from "mongoose"

const { Schema } = mongoose

const ringCategorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    parentId: {
        type: mongoose.Types.ObjectId,
        ref: 'SubCategory',
        require: true
    },
})

export default mongoose.model('RingCategory', ringCategorySchema)
import mongoose, { Types } from "mongoose"

const { Schema } = mongoose

const ringCategorySchema = new Schema({
    name: {
        type: String,
        enum: ['Дамски', 'Детски', 'Мъжки'],
        require: true
    },
    parentId: {
        type: mongoose.Types.ObjectId,
        ref: 'SubCategory',
        require: true
    },
})

export default mongoose.model('RingCategory', ringCategorySchema)
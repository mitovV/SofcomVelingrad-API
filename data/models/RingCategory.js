import mongoose, { Types } from "mongoose"

const { Schema } = mongoose

const ringCategorySchema = new Schema({
    name: {
        type: String,
        enum: ['Дамски', 'Детски', 'Мъжки'],
        require: true
    },
    firsParentId: {
        type: mongoose.Types.ObjectId,
        ref: 'SubCategory',
        require: true
    },
    secondParentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Subcategory',
        require: true
    }
})

export default mongoose.model('RingCategory', ringCategorySchema)
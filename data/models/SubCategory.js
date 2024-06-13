import mongoose from "mongoose"
import category from "../validations/category.js"

const { Schema } = mongoose

const subCategoryShema = new Schema({
    name: {
        type: String,
        require: true,
        minLength: [category.NAME_MIN_LENGHT, category.MESSAGE],
        maxLenght: [category.NAME_MAX_LENGHT, category.MESSAGE]
    },
    parentId: {
        type: mongoose.Types.ObjectId,
        ref: 'MainCategory',
        require:true
    },
    secondParentId: {
        type: mongoose.Types.ObjectId,
        ref: 'MainCategory',
    },
    subCategories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'RingCategory'
        }
    ]
})

export default mongoose.model('SubCategory', subCategoryShema)

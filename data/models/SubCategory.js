import mongoose from "mongoose"
import category from "../validations/category.js"

const { Schema } = mongoose

const subCategoryShema = new Schema({
    name: {
        type: String,
        require: true,
        minlenght: [category.NAME_MIN_LENGHT, category.MESSAGE],
        maxlenght: [category.NAME_MAX_LENGHT, category.MESSAGE]
    },
    firstParentId: {
        type: mongoose.Types.ObjectId,
        ref: 'MainCategory',
        require:true
    },
    secondParentId: {
        type: mongoose.Types.ObjectId,
        ref: 'MainCategory',
        require: true
    }
})

export default mongoose.model('SubCategory', subCategoryShema)

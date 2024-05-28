import mongoose from "mongoose"
import {NAME_MIN_LENGHT, NAME_MAX_LENGHT, MESSAGE} from "../validations/category"

const { Schema } = mongoose

const subCategoryShema = new Schema({
    name: {
        type: String,
        require: true,
        minlenght: [NAME_MIN_LENGHT, MESSAGE],
        maxlenght: [NAME_MAX_LENGHT, MESSAGE]
    },
    parentId: {
        type: mongoose.Types.ObjectId,
        ref: 'MainCategory',
        require:true
    }
})

export default mongoose.model('SubCategory', subCategoryShema)

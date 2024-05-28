import mongoose from "mongoose"
import {NAME_MIN_LENGHT, NAME_MAX_LENGHT, MESSAGE} from "../validations/category.js"

const { Schema } = mongoose

const mainCategorySchema = new Schema({
    name: {
        type: String,
        require: true,
        minlenght: [NAME_MIN_LENGHT, MESSAGE],
        maxlenght: [NAME_MAX_LENGHT, MESSAGE]
    }
  })

export default mongoose.model('MainCategory', mainCategorySchema)
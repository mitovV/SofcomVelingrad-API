import mongoose from "mongoose"
import category from "../validations/category.js"

const { Schema } = mongoose

const message = `Name must be between ${category.NAME_MIN_LENGHT} and ${category.NAME_MAX_LENGHT} characters log.`

const categorySchema = new Schema({
    name: {
        type: String,
        require: true,
        minlenght: [category.NAME_MIN_LENGHT, message],
        maxlenght: [category.NAME_MAX_LENGHT, message]
    },
    subcategories: [{
            type: mongoose.Types.ObjectId,
            ref: 'Category'
        }
    ]
})

export default mongoose.model('Category', categorySchema)
import mongoose from "mongoose"
import category from "../validations/category.js"

const { Schema } = mongoose

const mainCategorySchema = new Schema({
    name: {
        type: String,
        require: true,
        minlenght: [category.NAME_MIN_LENGHT, category.MESSAGE],
        maxlenght: [category.NAME_MAX_LENGHT, category.MESSAGE]
    },
    subCategories: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'SubCategory'
      }
    ]

    
  })

export default mongoose.model('MainCategory', mainCategorySchema)
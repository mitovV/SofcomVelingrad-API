import mongoose from "mongoose"
import category from "../validations/category.js"

const { Schema } = mongoose

const categorySchema = new Schema({
  name: {
    type: String,
    require: true,
    minLength: [category.NAME_MIN_LENGHT, category.MESSAGE],
    maxLenght: [category.NAME_MAX_LENGHT, category.MESSAGE]
  },
  parentId: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    require: true
  },
  secondParentId: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
  },
  subCategories: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Category'
    }
  ]
})

export default mongoose.model('Category', categorySchema)
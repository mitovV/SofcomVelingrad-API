import mongoose, { Mongoose } from 'mongoose'

const { Schema } = mongoose

const GOLD_CATEGORY_NAME = 'Злато'
const SILVER_CATEGORY_NEM = 'Сребро'
const BRACELETS_CATEGORY_NAME = 'Гривни'
const CHAINS_CATEGORY_NAME = 'Синджири'
const RING_CATEGORY_NAME = 'Пръстени'
const GSM_CATEGORY_NAME = 'GSM'
const WATCHES_CATEGORY_NAME = 'Часовници'
const WEDDING_RING_CATEGORY_NAME = 'Халки'
const GOLD_AND_SILVER_CATEGORIES = [GOLD_CATEGORY_NAME, SILVER_CATEGORY_NEM]
const GOLD_AND_SILER_SUB_CATEGORIES = [RING_CATEGORY_NAME, 'Обеци', 'Висулки', 'Колиета', BRACELETS_CATEGORY_NAME, 'Монети', CHAINS_CATEGORY_NAME, WEDDING_RING_CATEGORY_NAME]
const OTHER_CATEGORIES = ['Техника', GSM_CATEGORY_NAME, WATCHES_CATEGORY_NAME, 'Аудио и видео', 'Компютри и перифе', 'Автомобили и аксесоари', 'Други']

const productSchema = new Schema({
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    categoryName: {
        type: String,
        require: true
    },
    material: {
        type: String,
        require: function () { return GOLD_AND_SILVER_CATEGORIES.includes(this.categoryName) }
    },
    weight: {
        type: Number,
        require: function () { return GOLD_AND_SILER_SUB_CATEGORIES.includes(this.categoryName) }
    },
    size: {
        type: mongoose.Types.ObjectId,
        ref: 'RingSize',
        require: function () { return [RING_CATEGORY_NAME, WEDDING_RING_CATEGORY_NAME].includes(this.categoryName) }
    },
    goldCarat: {
        type: mongoose.Types.ObjectId,
        ref: 'GoldCarat',
        require: function () { return this.material === GOLD_CATEGORY_NAME }
    },
    silverCarat: {
        type: mongoose.Types.ObjectId,
        ref: 'SilverCarat',
        require: function () { return this.material === SILVER_CATEGORY_NEM }
    },
    condition: {
        type: mongoose.Types.ObjectId,
        ref: 'GoldCondition',
        require: function () { return this.material === GOLD_CATEGORY_NAME }
    },
    length: {
        type: Number,
        require: function () { return [BRACELETS_CATEGORY_NAME, CHAINS_CATEGORY_NAME].includes(this.categoryName) }
    },
    goldPrice: {
        type: mongoose.Types.ObjectId,
        ref: 'GoldPrice',
        require: function () { return this.material === GOLD_CATEGORY_NAME }
    },
    price: {
        type: Number,
        require: function () { return OTHER_CATEGORIES.includes(this.categoryName) }
    },
    description: {
        type: String,
        minLength: [10, 'Desctiption must be at least 10 characters long'],
        require: function () { return OTHER_CATEGORIES.includes(this.categoryName) }
    },
    title: {
        type: String,
        minLength: [5, 'Title must be at least 5 characters long'],
        require: function () { return OTHER_CATEGORIES.includes(this.categoryName) }
    },
    brand: {
        type: String,
        minLength: [3, 'Brand must be at least 3 characters long'],
        maxLength: [10, 'Brand must not be more than 10 characters long'],
        require: function () { return [WATCHES_CATEGORY_NAME].includes(this.categoryName) }
    },
    model: {
        type: String,
        minLength: [3, 'Model must be at least 3 characters long'],
        maxLength: [10, 'Model must not be more than 10 characters long'],
        require: function () { return [WATCHES_CATEGORY_NAME, GSM_CATEGORY_NAME].includes(this.categoryName) }
    },
    ram: {
        type: Number,
        require: function () { return this.categoryName === GSM_CATEGORY_NAME }
    },
    rom: {
        type: Number,
        require: function () { return this.categoryName === GSM_CATEGORY_NAME }
    },
    createdOn: {
        type: Date
    },
    images: [{
        type: String
    }]
})

productSchema.pre('save', function (next) {
    this.createdOn = Date.now()
    next()
})

export default mongoose.model('Product', productSchema)

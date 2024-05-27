import mongoose, { Schema } from "mongoose"
const { Schema } = mongoose

const GOLD_CATEGORY_NAME = 'Злато'
const SILVER_CATEGORY_NEM = 'Сребро'
const BRACELETS_CATEGORY_NAME = 'Гривни'
const CHAINS_CATEGORY_NAME = 'Синджири'
const GOLD_AND_SILVER_CATEGORIES = [GOLD_CATEGORY_NAME, SILVER_CATEGORY_NEM]
const GOLD_AND_SILER_SUB_CATEGORIES = ['Пръстени', 'Обеци', 'Висулки', 'Колиета', BRACELETS_CATEGORY_NAME, 'Монети', CHAINS_CATEGORY_NAME, 'Халки']
const OTHER_CATEGORIES = ['Техника', 'GSM', 'Часовници', 'Аудио и видео', 'Компютри и перифе', 'Автомобили и аксесоари', 'Други']

const productSchema = new Schema({
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    categoryName: {
        type: String,
        require: true
    },
    material: {
        type: String,
        enum: GOLD_AND_SILVER_CATEGORIES,
        require: function () { return GOLD_AND_SILER_SUB_CATEGORIES.includes(this.categoryName) }
    },
    weight: {
        type: Number,
        require: function () { return GOLD_AND_SILVER_CATEGORIES.includes(this.categoryName) }
    },
    size: {
        type: Number,
        require: function () { return ['Пръстени'].includes(this.categoryName) }
    },
    goldCarat: {
        type: String,
        enum: {
            values: ['(8K)-33.33% злато', '(9K)-37.5% злато', '(10K)-41.67% злато', '(11K)-45.83% злато', '(12K)-50% злато', '13K)-54.17% злато', '(14K)-58.50% злато', '15 карата (15K) - 62.5% злато', '(16K)-66.67% злато', '(17K)-70.83% злато', '(18K)-75% злато', '(19K)-79.17% злато', '(20K)-83.33% злато', '(21K)-87.5% злато', '(22K)-91.67% злато', '(23K)-95.83% злато', '(24K)-99.9% злато'],
            message: 'Invalid carat for gold'
        },
        require: function () { return this.material === GOLD_CATEGORY_NAME }
    },
    silverCarat: {
        type: String,
        enum: {
            values: ['(900)-90% сребро', '(925)-92.5% сребро', '(999)-99.9% сребро'],
            message: 'Invalid carat for silver'
        },
        require: function () { return this.material === SILVER_CATEGORY_NEM }
    },
    condition: {
        type: String,
        enum: ['Втора', 'Полирано'],
        require: function () { return this.categoryName === GOLD_CATEGORY_NAME }
    },
    length: {
        type: Number,
        require: function () { return [BRACELETS_CATEGORY_NAME, CHAINS_CATEGORY_NAME].includes(this.categoryName) }
    },
    price: {
        type: Number,
        require: function () { return OTHER_CATEGORIES.includes(this.categoryName) }
    },
    description: {
        type: String,
        minlenght: [10, 'Desctiption should be more than 10 characters long'],
        require: function () { return OTHER_CATEGORIES.includes(this.categoryName) }
    },
    title: {
        type: String,
        minlenght: [5, 'Title should be more than 5 characters long'],
        require: function () { return OTHER_CATEGORIES.includes(this.categoryName) }
    },
    imagePaths: [{
        type: String,
        require: true
    }]
})

export default mongoose.model('Product', productSchema)
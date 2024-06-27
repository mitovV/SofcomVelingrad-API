import mongoose from 'mongoose'

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
        require: function () { return this.material === GOLD_CATEGORY_NAME },
        enum: {
            values: ['(8K)-33.33% злато', '(9K)-37.5% злато', '(10K)-41.67% злато', '(11K)-45.83% злато', '(12K)-50% злато', '13K)-54.17% злато', '(14K)-58.50% злато', '15 карата (15K) - 62.5% злато', '(16K)-66.67% злато', '(17K)-70.83% злато', '(18K)-75% злато', '(19K)-79.17% злато', '(20K)-83.33% злато', '(21K)-87.5% злато', '(22K)-91.67% злато', '(23K)-95.83% злато', '(24K)-99.9% злато'],
            message: 'Invalid carat for gold'
        }
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
        type: mongoose.Types.ObjectId,
        ref: 'GoldCondition',
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
        require: function () { return [WATCHES_CATEGORY_NAME, GSM_CATEGORY_NAME].includes(this.categoryName) }
    },
    model: {
        type: String,
        minLength: [3, 'Model must be at least 3 characters long'],
        maxLength: [10, 'Model must not be more than 10 characters long'],
        require: function () { return [WATCHES_CATEGORY_NAME, GSM_CATEGORY_NAME].includes(this.categoryName) }
    },
    imagePaths: [{
        type: [String],
        require: true,
        validate: {
            validator: function (arr) {
                return arr.length === 3
            },
            message: 'The images must be exactly 3'
        }
    }]
})

export default mongoose.model('Product', productSchema)
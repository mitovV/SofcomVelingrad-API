import mongoose, { Schema } from "mongoose"
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
        require: function () { return OTHER_CATEGORIES.includes(this.categoryName) }
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
        type: String,
        enum: {
            values: ['41-13.0(mm)','42-13.4(mm)','43-13.7(mm)','44-14.0(mm)','45-14.3(mm)','46-14.6(mm)','47-15.0(mm)','48-15.3(mm)','49-15.6(mm)','50-15.9(mm)','51-16.2(mm)','52-16.5(mm)','53-16.8(mm)','54-17.2(mm)','55-17.5(mm)','56-17.8(mm)','57-18.1(mm)','58-18.4(mm)','59-18.8(mm)','60-19.1(mm)','61-19.4(mm)','62-19.7(mm)','63-20.0(mm)','64-20.3(mm)','65-20.6(mm)','66-21.0(mm)','67-21.3(mm)','68-21.6(mm)','69-22.0(mm)','70-22.3(mm)','71-22.6(mm)','72-22.9(mm)','73-23.2(mm)','74-23.5(mm)','75-23.9(mm)', '76-24.2(mm)'],
            message: 'Invalid size for ring'
        },
        require: function () { return [RING_CATEGORY_NAME, WEDDING_RING_CATEGORY_NAME].includes(this.categoryName) }
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
        minlenght: [10, 'Desctiption must be at least 10 characters long'],
        require: function () { return OTHER_CATEGORIES.includes(this.categoryName) }
    },
    title: {
        type: String,
        minlenght: [5, 'Title must be at least 5 characters long'],
        require: function () { return OTHER_CATEGORIES.includes(this.categoryName) }
    },
    brand:{
        type: String,
        minlenght: [3, 'Brand must be at least 3 characters long'],
        maxlenght: [10, 'Brand must not be more than 10 characters long'],
        require: function () { return [WATCHES_CATEGORY_NAME, GSM_CATEGORY_NAME].includes(this.categoryName) }
    },
    model: {
        type: String,
        minlenght: [3, 'Model must be at least 3 characters long'],
        maxlenght: [10, 'Model must not be more than 10 characters long'],
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
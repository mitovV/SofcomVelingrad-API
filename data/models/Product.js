import mongoose from 'mongoose'
import GoldPrice from '../models/GoldPrice.js'
import GoldCarat from '../models/GoldCarat.js'

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

productSchema.methods.calculateGoldPrice = async function () {
    if (this.material === 'Злато') {
        let goldPrice = await GoldPrice.findOne({ condition: this.condition }).lean()
        let goldCarat = await GoldCarat.findOne({ _id: this.goldCarat }).lean()        
        let calcWeight

        if (goldCarat.carat.includes('(8K)')) {
            calcWeight = this.weight * 8 / 14
        }
        else if (goldCarat.carat.includes('(9K)')) {
            calcWeight = this.weight * 9 / 14
        }
        else if (goldCarat.carat.includes('(10K)')) {
            calcWeight = this.weight * 10 / 14
        }
        else if (goldCarat.carat.includes('(11K)')) {
            calcWeight = this.weight * 11 / 14
        }
        else if (goldCarat.carat.includes('(12K)')) {
            calcWeight = this.weight * 12 / 14
        }
        else if (goldCarat.carat.includes('(13K)')) {
            calcWeight = this.weight * 13 / 14
        }
        else if (goldCarat.carat.includes('(14K)')) {
            calcWeight = this.weight
        }
        else if (goldCarat.carat.includes('(15K)')) {
            calcWeight = this.weight * 15 / 14
        }
        else if (goldCarat.carat.includes('(16K)')) {
            calcWeight = this.weight * 16 / 14
        }
        else if (goldCarat.carat.includes('(17K)')) {
            calcWeight = this.weight * 17 / 14
        }
        else if (goldCarat.carat.includes('(18K)')) {
            calcWeight = this.weight * 18 / 14
        }
        else if (goldCarat.carat.includes('(19K)')) {
            calcWeight = this.weight * 19 / 14
        }
        else if (goldCarat.carat.includes('(20K)')) {
            calcWeight = this.weight * 20 / 14
        }
        else if (goldCarat.carat.includes('(21K)')) {
            calcWeight = this.weight * 21 / 14
        }
        else if (goldCarat.carat.includes('(22K)')) {
            calcWeight = this.weight * 22 / 14
        }
        else if (goldCarat.carat.includes('(23K)')) {
            calcWeight = this.weight * 23 / 14
        }
        else if (goldCarat.carat.includes('(24K)')) {
            calcWeight = this.weight * 24 / 14
        }

        if (goldPrice) {            
            return Math.round(calcWeight * goldPrice.price)
        }
    }
}

export default mongoose.model('Product', productSchema)

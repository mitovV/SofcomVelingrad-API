import MainCategory from "../models/MainCategory.js"
import RingCategory from "../models/RingCategory.js"
import SubCategory from "../models/SubCategory.js"

const mainCategories = [

    { name: 'Злато' },
    { name: 'Сребро' },
    { name: 'Техника' },
    { name: 'GSM' },
    { name: 'Часовници' },
    { name: 'Аудио и видео' },
    { name: 'Компютри и периферия' },
    { name: 'Автомобили и аксесоари' },
    { name: 'Други' },

]

const goldAndSilverCategories = [
    { name: 'Пръстени' },
    { name: 'Обеци' },
    { name: 'Висулки' },
    { name: 'Колиета' },
    { name: 'Гривни' },
    { name: 'Монети' },
    { name: 'Синджири' },
    { name: 'Халки' },
]

const ringCategories = [
    { name: 'Дамски' },
    { name: 'Мъжки' },
    { name: 'Детски' },
]

let data = await MainCategory.find({})

if (data.length === 0) {
    mainCategories.forEach(async (categoryData) => {
        let mainCategory = new MainCategory({ name: categoryData.name })

        await mainCategory.save()
    })
}

let goldCategory = await MainCategory.findOne({ name: 'Злато' })
let silverCategory = await MainCategory.findOne({ name: 'Сребро' })
let subCategories = await SubCategory.find({})

if (subCategories.length === 0) {
    for (let index = 0; index < goldAndSilverCategories.length; index++) {
        let name = goldAndSilverCategories[index].name
        let subCategory = new SubCategory({name: name, firstParentId: goldCategory._id, secondParentId: silverCategory._id})
        await subCategory.save()
    }
}

let ringCategoriesData = await RingCategory.find({})
let ringSubCategory = await SubCategory.findOne({ name: 'Пръстени' })

if (ringCategoriesData.length === 0){
    for (let index = 0; index < ringCategories.length; index++) {
        const data = ringCategories[index];

        let ringCategory = new RingCategory({name: data.name, parentId: ringSubCategory._id })

        await ringCategory.save()
    }
}

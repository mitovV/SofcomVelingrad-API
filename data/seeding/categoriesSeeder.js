import Category from "../models/Category.js";

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

let data = await Category.find({})

if (data.length === 0) {
    let allCategories = Array.prototype.concat(mainCategories, goldAndSilverCategories, ringCategories)

    allCategories.forEach(async (categoryData) => {
        let category = new Category({ name: categoryData.name })

        await category.save()
    })
}

let goldCategory = await Category.findOne({ name: 'Злато' })
let silverCategory = await Category.findOne({ name: 'Сребро' })

if (goldCategory.subcategories.length === 0 && silverCategory.subcategories.length === 0) {

    for (let index = 0; index < goldAndSilverCategories.length; index++) {
        let name = goldAndSilverCategories[index].name
        let category = await Category.findOne({ name }).lean()
        
        goldCategory.subcategories.push(category)
        silverCategory.subcategories.push(category)
    }

    await goldCategory.save()
    await silverCategory.save()
}

let ringCategory = await Category.findOne({ name: 'Пръстени' })

if (ringCategory.subcategories.length === 0){
    for (let index = 0; index < ringCategories.length; index++) {
        const data = ringCategories[index];

        let category = await Category.findOne(data).lean()

       ringCategory.subcategories.push(category)
    }

    await ringCategory.save()
}

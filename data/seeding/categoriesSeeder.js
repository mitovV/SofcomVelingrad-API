import Category from '../models/Category.js'

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
    for (let index = 0; index < mainCategories.length; index++) {
        const element = mainCategories[index];
        let mainCategory = new Category(element)

        await mainCategory.save()
    }
}

let goldCategory = await Category.findOne({ name: 'Злато' })
let silverCategory = await Category.findOne({ name: 'Сребро' })

if (goldCategory.subCategories.length === 0 && silverCategory.subCategories.length === 0) {
    for (let index = 0; index < goldAndSilverCategories.length; index++) {
        let name = goldAndSilverCategories[index].name
        let subCategory = new Category({name: name, parentId: goldCategory._id, secondParentId: silverCategory._id})
        await subCategory.save()
        goldCategory.subCategories.push(subCategory)
        silverCategory.subCategories.push(subCategory)
    }

   await goldCategory.save()
   await silverCategory.save()
}

let ringSubCategory = await Category.findOne({ name: 'Пръстени' })
let subCategoriesLength = ringSubCategory.subCategories.length

if (subCategoriesLength === 0){
    for (let index = 0; index < ringCategories.length; index++) {
        const data = ringCategories[index];

        let ringCategory = new Category({name: data.name, parentId: ringSubCategory._id })

        await ringCategory.save()
        ringSubCategory.subCategories.push(ringCategory)
    }

   await ringSubCategory.save()
}

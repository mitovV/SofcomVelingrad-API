import Category from "../models/Category.js";

const categories = [

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

let data = await Category.find({})

if (data.length  === 0) {
    categories.forEach(categoryData => {
        let category = new Category({name: categoryData.name})

        category.save()
    })
}
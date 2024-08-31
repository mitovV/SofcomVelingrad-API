import { Router } from 'express'
import productsService from '../services/productsService.js'
import formidable from 'formidable'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

const router = Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rootDir = join(__dirname, '..')

const createFolderIfNotExists = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true })
    }
}

router.get('/', (req, res) => {
    productsService.all()
        .then(response => res
            .status(200)
            .json(response)
        )
        .catch(err => res.status(400).json({ err }))
})

router.get('/latest', (req, res) => {
    productsService.latest()
        .then(response => res
            .status(200)
            .json(response)
        )
        .catch(err => res.status(400).json({ err }))
})

router.post('/', (req, res) => {
    const form = formidable({
        multiples: true,
        uploadDir: join(rootDir, 'uploads/tmp'),
        keepExtensions: true,
    })

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: 'Error processing form data' })
        }

        let categoryId = fields.categoryId[0]
        let categoryName = fields.categoryName[0]
        let mainCategory = fields.mainCategory[0]

        let material, weight, size, goldCarat, silverCarat, title, model, brand, ram, rom, price, description

        if (mainCategory === 'Злато') {
            if (categoryName === 'Детски' || categoryName === 'Мъжки' || categoryName === 'Дамски') {
                size = fields.size[0]
            }

            weight = fields.weight[0]
            material = fields.material[0]
            goldCarat = fields.goldCarat[0]
        }
        else if (mainCategory === 'Сребро') {
            if (categoryName === 'Детски' || categoryName === 'Мъжки' || categoryName === 'Дамски') {
                size = fields.size[0]
            }
            silverCarat = fields.silverCarat[0]
        }
        else if (mainCategory === 'GSM') {
            model = fields.model[0]
            ram = fields.ram[0]
            rom = fields.rom[0]
            price = fields.price[0]
            description = fields.description[0]
        }
        else if (mainCategory === 'Техника') {
            title = fields.title[0]
            price = fields.price[0]
            description = fields.description[0]
        }
        else if (mainCategory === 'Часовници') {
            model = fields.model[0]
            price = fields.price[0]
            description = fields.description[0]
            brand = fields.brand[0]
        }
        else if (mainCategory === 'Аудио и видео') {
            title = fields.title[0]
            price = fields.price[0]
            description = fields.description[0]
        }
        else if (mainCategory === 'Компютри и периферия') {
            title = fields.title[0]
            price = fields.price[0]
            description = fields.description[0]
        }
        else if (mainCategory === 'Автомобили и аксесоари') {
            title = fields.title[0]
            price = fields.price[0]
            description = fields.description[0]
        }
        else if (mainCategory === 'Други') {
            title = fields.title[0]
            price = fields.price[0]
            description = fields.description[0]
        }

        const savedProduct = await productsService.create(categoryId, categoryName, material, weight, size,
            goldCarat, silverCarat, title, model, brand, ram, rom, price, description)

        // Създаване на папка за качване на файловете според productId
        const uploadPath = join(rootDir, 'uploads', savedProduct._id.toString())
        createFolderIfNotExists(uploadPath)

        // Преместване на качените файлове в новата директория
        Object.values(files).forEach((file) => {
            const oldPath = file[0].filepath

            const newPath = join(uploadPath, file[0].originalFilename)
            let imgPath = join(savedProduct._id.toString(), file[0].originalFilename)
            savedProduct.images.push(imgPath)

            fs.renameSync(oldPath, newPath)
        })
        savedProduct.save()

        // Връщане на отговор след успешна обработка
        res.status(201).json({ message: 'Product created and files uploaded successfully', product: savedProduct._id })
    })
})

export default router

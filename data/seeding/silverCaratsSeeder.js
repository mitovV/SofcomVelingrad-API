import SilverCarat from '../models/SilverCarat.js'

const carats = [
    '(900)-90% сребро',
    '(925)-92.5% сребро',
    '(999)-99.9% сребро'
]

let data = await SilverCarat.find()

if (data.length === 0) {
    for (let index = 0; index < carats.length; index++) {
        const carat = carats[index];
        let silverCarat = new SilverCarat({ carat })

        await silverCarat.save()
    }
}

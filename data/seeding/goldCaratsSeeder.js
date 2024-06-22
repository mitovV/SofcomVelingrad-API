import GoldCarat from '../models/GoldCarat.js'

const carats = [
    '(8K)-33.33% злато',
    '(9K)-37.5% злато',
    '(10K)-41.67% злато',
    '(11K)-45.83% злато',
    '(12K)-50% злато',
    '(13K)-54.17% злато',
    '(14K)-58.50% злато',
    '(15K)-62.5% злато',
    '(16K)-66.67% злато',
    '(17K)-70.83% злато',
    '(18K)-75% злато',
    '(19K)-79.17% злато',
    '(20K)-83.33% злато',
    '(21K)-87.5% злато',
    '(22K)-91.67% злато',
    '(23K)-95.83% злато',
    '(24K)-99.9% злато']

    let data = await GoldCarat.find()

    if (data.length === 0) {
        for (let index = 0; index < carats.length; index++) {
            const carat = carats[index];
            let goldCarat = new GoldCarat({carat})

            await goldCarat.save()
        }
    }

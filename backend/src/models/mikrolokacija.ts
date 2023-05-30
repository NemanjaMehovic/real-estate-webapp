import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Mikrolokacija = new Schema({
    id: {
        type: Number
    },
    ime: {
        type: String
    },
    gradId:{
        type:Number
    },
    opstinaId: {
        type: [Number]
    }
});

export default mongoose.model('Mikrolokacija', Mikrolokacija, 'Mikrolokacija');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Agencija = new Schema({
    id: {
        type: Number
    },
    naziv: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    },
    pib: {
        type: Number
    },
    gradId: {
        type: Number
    }
});

export default mongoose.model('Agencija', Agencija, 'Agencija');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Ulica = new Schema({
    id: {
        type: Number
    },
    ime: {
        type: String
    },
    gradId:{
        type:Number
    },
    mikrolokacijaId: {
        type: [Number]
    }
});

export default mongoose.model('Ulica', Ulica, 'Ulica');
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Opstina = new Schema({
    id: {
        type: Number
    },
    ime: {
        type: String
    },
    gradID: {
        type: Number
    }
});

export default mongoose.model('Opstina', Opstina, 'Opstina');
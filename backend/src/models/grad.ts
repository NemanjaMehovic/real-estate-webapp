import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Grad = new Schema({
    id: {
        type: Number
    },
    ime: {
        type: String
    }
});

export default mongoose.model('Grad', Grad, 'Grad');
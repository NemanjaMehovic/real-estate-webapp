import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Linija = new Schema({
    ime: {
        type: String
    }
});

export default mongoose.model('Linija', Linija, 'Linije');
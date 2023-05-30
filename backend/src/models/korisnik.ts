import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    username: {
        type: String
    },
    sifra: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    email: {
        type: String
    },
    telefon: {
        type: String
    },
    tip: {
        type: String
    },
    odobren: {
        type: String
    },
    brojLicence: {
        type: Number
    },
    agencijaID: {
        type: Number
    },
    gradID: {
        type: Number
    },
    datumR: {
        type: Date
    },
    omiljeno: {
        type: [Number]
    }
});

export default mongoose.model('Korisnik', Korisnik, 'Korisnici');
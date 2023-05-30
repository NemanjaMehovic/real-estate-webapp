import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Nekretnina = new Schema({
    id: {
        type: Number
    },
    ime: {
        type: String
    },
    ulicaId:{
        type:Number
    },
    mikrolokacijaId: {
        type: Number
    },
    gradId:{
        type:Number
    },
    opstinaId:{
        type:Number
    },
    vlasnikId:{
        type:String
    },
    tip:{
        type:String
    },
    kvadratura:{
        type:Number
    },
    brojSoba:{
        type:Number
    },
    cena:{
        type:Number
    },
    godinaIzd:{
        type:String
    },
    stanje:{
        type:String
    },
    tipGrejanja:{
        type:String
    },
    sprat:{
        type:Number
    },
    maxSprat:{
        type:Number
    },
    parking:{
        type:Boolean
    },
    opis:{
        type:String
    },
    prodato:{
        type:Boolean
    },
    datumIzmene:{
        type:Date
    },
    mesecnaCena:{
        type:Number
    },
    karakteristike:{
        type:[String]
    },
    gradskiPrevoz:{
        type:[String]
    },
    slike:{
        type:[String]
    }
});

export default mongoose.model('Nekretnina', Nekretnina, 'Nekretnina');
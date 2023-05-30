export class Nekretnina {
    id: Number = -1;
    ime: String = "";
    ulicaId: Number = -1;
    mikrolokacijaId: Number = -1;
    gradId: Number = -1;
    opstinaId: Number = -1;
    vlasnikId: String;
    tip: String
    kvadratura: Number = -1;
    brojSoba: Number = -1;
    cena: Number = -1;
    godinaIzd: String = "";
    stanje: String = "";
    tipGrejanja: String = "";
    sprat: Number = -1;
    maxSprat: Number = -1;
    parking: Boolean = null;
    opis: String = "";
    prodato: Boolean = null;
    datumIzmene: Date = null;
    mesecnaCena: Number;
    karakteristike: Array<String> = [];
    gradskiPrevoz: Array<String> = [];
    slike: Array<String> = [];
}
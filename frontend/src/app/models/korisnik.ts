export class Korisnik {
    username: String = "";
    sifra: String = ""
    ime: String = "";
    prezime: String = "";
    email: String = "";
    telefon: String = "";
    tip: String = "";
    odobren: String = "";
    brojLicence: number = -1;
    agencijaID: number = -1;
    gradID: number = -1;
    datumR: Date = new Date();
    omiljeno: Array<Number> = [];
}
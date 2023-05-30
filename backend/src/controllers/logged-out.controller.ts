import * as express from 'express';
import Korisnik from '../models/korisnik';
import Grad from '../models/grad';
import Agencija from '../models/agencija';
import Opstina from '../models/opstina';

export class LoggedOutController {

    passwordValidator: RegExp = new RegExp("^(?=.*\\d)(?=.*[A-Z])(?=.*[^A-Za-z\\d])[A-Za-z].{7,}$");
    emailVailidator: RegExp = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    telValidator: RegExp = new RegExp("^\\+\\d{2,3} \\d{2} \\d{7}$");

    login(req: express.Request, res: express.Response) {
        try {
            let u = req.body.username;
            let p = req.body.sifra;

            Korisnik.findOne({ "username": u }, (err, tmp) => {
                if (err) {
                    console.log(err);
                }
                else if (tmp == null) {
                    res.json({ "username": "" });
                }
                else {
                    let tmpObject = tmp.toObject({ getters: true });
                    if (tmpObject.sifra == p)
                        res.json(tmp);
                    else
                        res.json({ "username": tmpObject.username.toString(), "sifra": "" });
                }
            });
        }
        catch (exception: any) {
            console.log(exception);
        }
    }

    getData(req: express.Request, res: express.Response) {
        Grad.find((err, gradovi) => {
            if (err)
                console.log(err);
            else {
                Agencija.find((errA, agencije) => {
                    if (errA)
                        console.log(errA);
                    else {
                        Opstina.find((errO, opstine) => {
                            if (errO)
                                console.log(errO);
                            else
                                res.json({ "gradovi": gradovi, "agencije": agencije, "opstine": opstine });
                        });
                    }
                });
            }
        });
    }


    getOpstine(req: express.Request, res: express.Response) {
        Opstina.find({ "gradID": parseInt(req.body.gradId) }, (err, tmp) => {
            if (err)
                console.log(err);
            else {
                res.json(tmp);
            }
        });
    }

    register(req: any, res: any) {
        try {
            let picture = req.files.image;
            let data = JSON.parse(req.body.data);
            let tmpString: String = picture.name;
            tmpString = data.username + tmpString.substring(tmpString.lastIndexOf("."));

            let errors: Array<String> = [];

            let passwordTmp = data.sifra;
            if (!this.passwordValidator.test(passwordTmp))
                errors.push("Password must contain 8 characters at least one uppercase letter, one number, one special character and start with a letter.");
            if (passwordTmp != data.sifraP)
                errors.push("Passwords do not match.");
            if (!this.emailVailidator.test(data.email))
                errors.push("Not an email entered");
            if (!this.telValidator.test(data.tel))
                errors.push("Phone number must be in +11{1} 11 1111111 format");

            if (errors.length > 0) {
                res.json({ "errors": errors });
                return;
            }

            Korisnik.findOne({ "username": data.username }, (err, user) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (user != null) {
                    errors.push("Username already taken");
                    res.json({ "errors": errors });
                    return;
                }
                Korisnik.findOne({ "email": data.email }, (errEmail, userEmail) => {
                    if (errEmail) {
                        console.log(errEmail);
                        return;
                    }
                    if (userEmail != null) {
                        errors.push("Email already used");
                        res.json({ "errors": errors });
                        return;
                    }

                    let jsonKorisnik = {
                        username: data.username,
                        sifra: data.sifra,
                        ime: data.ime,
                        prezime: data.prezime,
                        email: data.email,
                        telefon: data.tel,
                        tip: data.tip,
                        odobren: data.odobren,
                        brojLicence: data.tip == "S" ? (data.brojLicence != "" ? parseInt(data.brojLicence) : null) : null,
                        agencijaID: data.tip == "S" ? (data.agencijaId != "" ? parseInt(data.agencijaId) : null) : null,
                        gradID: parseInt(data.gradId),
                        datumR: new Date(data.datumR),
                        omiljeno: Array<Number>()
                    };

                    let tmpKorisnik = new Korisnik(jsonKorisnik);
                    tmpKorisnik.save((errSave) => {
                        if (errSave) {
                            console.log(errSave);
                            return;
                        }
                        picture.mv("pictures/users/" + tmpString, (err: any) => {
                            if (err)
                                console.log(err);
                        });
                        res.json(jsonKorisnik);
                    });

                });
            });
        }
        catch (exception: any) {
            console.log(exception);
        }
    }
}
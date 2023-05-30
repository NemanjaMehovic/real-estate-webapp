import * as express from 'express';
import Nekretnina from '../models/nekretnina';
import Korisnik from '../models/korisnik';
import fs from 'fs';

export class UserController {

    passwordValidator: RegExp = new RegExp("^(?=.*\\d)(?=.*[A-Z])(?=.*[^A-Za-z\\d])[A-Za-z].{7,}$");

    changePassword(req: express.Request, res: express.Response) {
        try {
            let username = req.body.username;
            let sifraCurr = req.body.sifraCurr;

            let errors = [];
            if (!this.passwordValidator.test(req.body.sifraNew))
                errors.push("Password must contain 8 characters at least one uppercase letter, one number, one special character and start with a letter.");
            if (req.body.sifraNew != req.body.sifraNewP)
                errors.push("Passwords do not match.");

            if (errors.length > 0) {
                res.json({ "errors": errors });
                return;
            }

            Korisnik.collection.updateOne({ "username": username, "sifra": sifraCurr }, { $set: { "sifra": req.body.sifraNew } }, (err, tmp) => {
                if (err)
                    console.log(err);
                else if (tmp.result.nModified != 0)
                    res.json({ "errors": null });
                else
                    res.json({ "errors": "Wrong password" });
            });
        }
        catch (exception: any) {
            console.log(exception);
        }
    }

    getAllUnapprovedUsers(req: express.Request, res: express.Response) {
        try {
            Korisnik.find({ "odobren": "P" }, (err, korisnici) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnici);
            })
        }
        catch (exception: any) {
            console.log(exception);
        }
    }


    getAllUsers(req: express.Request, res: express.Response) {
        try {
            Korisnik.find((err, korisnici) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnici);
            })
        }
        catch (exception: any) {
            console.log(exception);
        }
    }

    updateUserStatus(req: express.Request, res: express.Response) {
        try {
            let username = req.body.username;
            let odobren = req.body.odobren;

            Korisnik.collection.updateOne({ "username": username }, { $set: { "odobren": odobren } }, (err, tmp) => {
                if (err)
                    console.log(err);
                else
                    res.json(tmp);
            });
        }
        catch (exception: any) {
            console.log(exception);
        }
    }


    deletePictures(username: String) {
        fs.stat("pictures/users/" + username + ".png", (errC, sta) => {
            if (errC == null)
                fs.unlink("pictures/users/" + username + ".png", (errD) => {
                    if (errD) {
                        console.log("png");
                        console.log(errD);
                    }
                })
        });
        fs.stat("pictures/users/" + username + ".jpg", (errC, sta) => {
            if (errC == null)
                fs.unlink("pictures/users/" + username + ".jpg", (errD) => {
                    if (errD) {
                        console.log("jpg");
                        console.log(errD);
                    }
                })
        });
        fs.stat("pictures/users/" + username + ".jpeg", (errC, sta) => {
            if (errC == null)
                fs.unlink("pictures/users/" + username + ".jpeg", (errD) => {
                    if (errD) {
                        console.log("jpeg");
                        console.log(errD);
                    }
                })
        });
    }

    removeUser(req: express.Request, res: express.Response) {
        try {
            let username = req.body.username;
            Korisnik.deleteMany({ "username": username }, (err) => {
                if (err)
                    console.log(err);
                else {
                    Nekretnina.find({ "vlasnikId": username }, (err, tmp) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        for (let i = 0; i < tmp.length; i++)
                            for (let slika of tmp[i].toObject().slike)
                                fs.unlink("pictures/nekretnine/" + slika, (err) => {
                                    if (err) {
                                        console.log(slika);
                                        console.log(err);
                                    }
                                });
                        Nekretnina.deleteMany({ "vlasnikId": username }, (errN) => {
                            if (errN) {
                                console.log(errN);
                                return;
                            }
                            this.deletePictures(username);
                            res.json({ "OK": true });
                        });
                    });
                }
            });
        }
        catch (exception: any) {
            console.log(exception);
        }
    }

    updateUser(req: any, res: any) {
        try {
            let picture = req.files.image;
            let data = JSON.parse(req.body.data);
            let tmpString: String = picture.name;
            tmpString = data.username + tmpString.substring(tmpString.lastIndexOf("."));

            let errors: Array<String> = [];
            Korisnik.findOne({ "username": data.oldUsername }, (err, user) => {
                if (err) {
                    console.log(err);
                    return;
                }
                Korisnik.findOne({ "username": data.username }, (err, userN) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (data.oldUsername != data.username && userN != null) {
                        errors.push("Username already taken");
                        res.json({ "errors": errors });
                        return;
                    }
                    Korisnik.findOne({ "email": data.email }, (err, userE) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (userE != null && userE.toObject().username != data.oldUsername) {
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
                            gradID: parseInt(data.gradId)
                        };

                        Korisnik.collection.updateOne({ "username": data.oldUsername }, { $set: jsonKorisnik }, (err, newUser) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            if (data.oldUsername != data.username)
                                this.deletePictures(data.oldUsername);
                            picture.mv("pictures/users/" + tmpString, (err: any) => {
                                if (err)
                                    console.log(err);
                            });
                            Nekretnina.collection.updateMany({ "vlasnikId": data.oldUsername }, { $set: { "vlasnikId": data.username } }, (err, nekretnine) => {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                res.json(newUser);
                            });
                        });
                    });
                });
            });
        }
        catch (exception: any) {
            console.log(exception);
        }
    }

    updateSeller(req: express.Request, res: express.Response) {
        try {
            Korisnik.findOne({ "email": req.body.email }, (err, tmp) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (tmp != null && req.body.email != req.body.oldEmail) {
                    res.json({ "errors": "Email already used" });
                    return;
                }

                let jsonKorisnik = {
                    email: req.body.email,
                    telefon: req.body.tel,
                    agencijaID: req.body.agencijaId != "" ? parseInt(req.body.agencijaId) : null
                }

                Korisnik.collection.updateOne({ "email": req.body.oldEmail }, { $set: jsonKorisnik }, (err, tmp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(tmp);
                })
            })
        }
        catch (exception: any) {
            console.log(exception);
        }
    }

    addFav(req: express.Request, res: express.Response) {
        try {
            let username = req.body.username;
            let nekretnina = req.body.nekretnina;
            Korisnik.collection.updateOne({ "username": username }, { $push: { "omiljeno": parseInt(nekretnina) } }, (err, tmp) => {
                if (err)
                    console.log(err);
                else
                    res.json(tmp);
            });
        }
        catch (exception: any) {
            console.log(exception);
        }
    }

    removeFav(req: express.Request, res: express.Response){
        try {
            let username = req.body.username;
            let nekretnina = req.body.nekretnina;
            Korisnik.collection.updateOne({ "username": username }, { $pull: { "omiljeno": parseInt(nekretnina) } }, (err, tmp) => {
                if (err)
                    console.log(err);
                else
                    res.json(tmp);
            });
        }
        catch (exception: any) {
            console.log(exception);
        }
    }
}
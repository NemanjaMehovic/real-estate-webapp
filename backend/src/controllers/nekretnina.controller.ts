import * as express from 'express'
import Nekretnina from "../models/nekretnina";

export class NekretninaController {

    getAll(req: express.Request, res: express.Response) {
        Nekretnina.find((err, tmp) => {
            if (err)
                console.log(err);
            else
                res.json(tmp);
        })
    }

    add(req: any, res: any) {
        try {
            Nekretnina.find((err, tmp) => {
                if (err) {
                    console.log(err);
                    return;
                }
                let tmpId = tmp.length > 0 ? parseInt(tmp[0].toObject().id) + 1 : 0;
                let imenaSlika: Array<String> = [];
                let slike = req.files.slike
                for (var i = 0; i < slike.length; i++) {
                    imenaSlika.push(tmpId + "." + i + slike[i].name.substring(slike[i].name.lastIndexOf(".")));
                    slike[i].mv("pictures/nekretnine/" + imenaSlika[i], (err: any) => {
                        if (err)
                            console.log(err);
                    });
                }

                let data = JSON.parse(req.body.data);

                let tmpObject = {
                    id: tmpId,
                    ime: data.ime,
                    ulicaId: parseInt(data.ulicaId),
                    mikrolokacijaId: parseInt(data.mikrolokacijaId),
                    gradId: parseInt(data.gradId),
                    opstinaId: parseInt(data.opstinaId),
                    vlasnikId: data.vlasnikId,
                    tip: data.tip,
                    kvadratura: data.kvadratura,
                    brojSoba: data.brojSoba,
                    cena: data.cena,
                    godinaIzd: data.godinaIzd,
                    stanje: data.stanje,
                    tipGrejanja: data.tipGrejanja,
                    sprat: data.sprat,
                    maxSprat: data.maxSprat,
                    parking: Boolean(data.parking),
                    opis: data.opis,
                    prodato: false,
                    datumIzmene: new Date(data.datumIzmene),
                    mesecnaCena: data.mesecnaCena,
                    karakteristike: data.karakteristike,
                    gradskiPrevoz: data.gradskiPrevoz,
                    slike: imenaSlika
                }

                let tmpNekretnina = new Nekretnina(tmpObject);
                tmpNekretnina.save((err, tmp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(tmp);
                })
            }).sort({ "id": -1 }).limit(1);
        }
        catch (exception: any) {
            console.log(exception);
        }
    }

    sold(req: express.Request, res: express.Response) {
        try {
            Nekretnina.collection.updateOne({ "id": parseInt(req.body.id) }, { $set: { "prodato": true, "datumIzmene": new Date() } }, (err, tmp) => {
                if (err)
                    console.log(err);
                else
                    res.json(tmp);
            })
        }
        catch (exception: any) {
            console.log(exception);
        }
    }

    update(req: any, res: any) {
        try {
            let data = JSON.parse(req.body.data);
            let tmpId = parseInt(data.id);
            let imenaSlika: Array<String> = [];
            let slike = req.files.slike
            for (var i = 0; i < slike.length; i++) {
                imenaSlika.push(tmpId + "." + i + slike[i].name.substring(slike[i].name.lastIndexOf(".")));
                slike[i].mv("pictures/nekretnine/" + imenaSlika[i], (err: any) => {
                    if (err)
                        console.log(err);
                });
            }


            let tmpObject = {
                ime: data.ime,
                ulicaId: parseInt(data.ulicaId),
                mikrolokacijaId: parseInt(data.mikrolokacijaId),
                gradId: parseInt(data.gradId),
                opstinaId: parseInt(data.opstinaId),
                vlasnikId: data.vlasnikId,
                tip: data.tip,
                kvadratura: data.kvadratura,
                brojSoba: data.brojSoba,
                cena: data.cena,
                godinaIzd: data.godinaIzd,
                stanje: data.stanje,
                tipGrejanja: data.tipGrejanja,
                sprat: data.sprat,
                maxSprat: data.maxSprat,
                parking: Boolean(data.parking),
                opis: data.opis,
                prodato: false,
                datumIzmene: new Date(data.datumIzmene),
                mesecnaCena: data.mesecnaCena,
                karakteristike: data.karakteristike,
                gradskiPrevoz: data.gradskiPrevoz,
                slike: imenaSlika
            }

            Nekretnina.collection.updateOne({ "id": parseInt(data.id) }, { $set: tmpObject }, (err, tmp) => {
                if (err)
                    console.log(err);
                else
                    res.json(tmp);
            })
        }
        catch (exception: any) {
            console.log(exception);
        }
    }
}
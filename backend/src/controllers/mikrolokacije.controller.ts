import * as express from "express";
import Mikrolokacija from "../models/mikrolokacija";

export class MikrolokacijeController {

    add(req: express.Request, res: express.Response) {
        try {
            Mikrolokacija.find((err, tmp) => {
                if (err) {
                    console.log(err);
                    return;
                }
                let tmpId = tmp.length > 0 ? parseInt(tmp[0].toObject().id) + 1 : 0
                let tmpObject = {
                    id: tmpId,
                    ime: req.body.mikrolokacija,
                    opstinaId: req.body.opstinaId,
                    gradId: req.body.gradId
                };
                let tmpMikrolokacija = new Mikrolokacija(tmpObject);
                tmpMikrolokacija.save((errS, tmpS) => {
                    if (errS)
                        console.log(errS);
                    else
                        res.json(tmpS);
                })

            }).sort({ "id": -1 }).limit(1);
        }
        catch (exception: any) {
            console.log(exception);
        }
    }

    remove(req: express.Request, res: express.Response) {
        try {
            let id = parseInt(req.body.id);
            Mikrolokacija.deleteOne({ "id": id }, (err) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "OK": true });
            })
        }
        catch (exception: any) {
            console.log(exception);
        }
    }

    getAll(req: express.Request, res: express.Response) {
        Mikrolokacija.find((err, tmp) => {
            if (err)
                console.log(err);
            else
                res.json(tmp);
        })
    }

    getFromCity(req: express.Request, res: express.Response) {
        Mikrolokacija.find({ "gradId": parseInt(req.body.gradId) }, (err, tmp) => {
            if (err)
                console.log(err);
            else
                res.json(tmp);
        })
    }
}
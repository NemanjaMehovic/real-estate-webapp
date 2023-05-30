import * as express from 'express';
import Ulica from "../models/ulica";

export class UlicaController {
    add(req: express.Request, res: express.Response) {
        try {
            Ulica.find((err, tmp) => {
                if (err) {
                    console.log(err);
                    return;
                }
                let tmpId = tmp.length > 0 ? parseInt(tmp[0].toObject().id) + 1 : 0
                let tmpObject = {
                    id: tmpId,
                    ime: req.body.ulica,
                    mikrolokacijaId: req.body.mikrolokacijaId,
                    gradId: req.body.gradId
                };
                let tmpUlica = new Ulica(tmpObject);
                tmpUlica.save((errS, tmpS) => {
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

    get(req: express.Request, res: express.Response) {
        Ulica.find((err, tmp) => {
            if (err)
                console.log(err);
            else
                res.json(tmp);
        })
    }

    remove(req: express.Request, res: express.Response){
        try {
            let id = parseInt(req.body.id);
            Ulica.deleteOne({ "id": id }, (err) => {
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
}
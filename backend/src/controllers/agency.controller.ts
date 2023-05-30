import * as express from 'express';
import Agencija from '../models/agencija';

export class AgencyController {

    telValidator: RegExp = new RegExp("^\\+\\d{2,3} \\d{2} \\d{7}$");
    pibValidato: RegExp = new RegExp("[1-9]\\d{7}");


    add(req: express.Request, res: express.Response) {
        try {
            Agencija.find((err, tmp) => {
                if (err) {
                    console.log(err);
                    return;
                }
                let tmpId = tmp.length > 0 ? parseInt(tmp[0].toObject().id) + 1 : 0
                let tmpObject = {
                    id: tmpId,
                    naziv: req.body.agency,
                    adresa: req.body.adresa,
                    telefon: req.body.tel,
                    pib: parseInt(req.body.pib),
                    gradId: req.body.gradId
                }
                if (!this.telValidator.test(tmpObject.telefon)) {
                    res.json({ "errors": "Phone number must be in +11{1} 11 1111111 format" });
                    return;
                }
                else if (tmpObject.pib < 10000000 || tmpObject.pib > 99999999) {
                    res.json({ "errors": "PIB must be a number between 10000000 and 99999999" });
                    return;
                }
                Agencija.findOne({ "pib": tmpObject.pib }, (errP, tmpP) => {
                    if (errP) {
                        console.log(errP);
                        return;
                    }
                    if (tmpP != null) {
                        res.json({ "errors": "Agency with same pib already exists" });
                        return;
                    }
                    let tmpAgency = new Agencija(tmpObject);
                    tmpAgency.save((errS, tmpS) => {
                        if (errS) {
                            console.log(errS);
                            return;
                        }
                        res.json(tmpS);
                    })
                });
            }).sort({ "id": -1 }).limit(1);
        }
        catch (exception: any) {
            console.log(exception);
        }
    }


}
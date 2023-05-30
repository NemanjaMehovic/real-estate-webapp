import * as express from 'express';
import Linija from "../models/linija";

export class LinijaController {
    get(req: express.Request, res: express.Response) {
        Linija.find((err, tmp) => {
            if (err)
                console.log(err);
            else
                res.json(tmp);
        })
    }
}
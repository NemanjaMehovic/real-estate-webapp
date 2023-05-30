import express from "express";
import { LinijaController } from "../controllers/linija.controller";

const linijaRouter = express.Router();


linijaRouter.route("/get").get((req, res) => {
    new LinijaController().get(req,res);
});

export default linijaRouter;
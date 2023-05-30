import express from "express";
import { UlicaController } from "../controllers/ulica.controller";

const ulicaRouter = express.Router();

ulicaRouter.route("/add").post((req, res) => {
    new UlicaController().add(req,res);
});

ulicaRouter.route("/remove").post((req, res) => {
    new UlicaController().remove(req,res);
});

ulicaRouter.route("/get").get((req, res) => {
    new UlicaController().get(req,res);
});

export default ulicaRouter;
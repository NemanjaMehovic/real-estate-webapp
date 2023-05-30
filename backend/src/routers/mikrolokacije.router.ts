import express from "express";
import { MikrolokacijeController } from "../controllers/mikrolokacije.controller";

const mikrolokacijeRouter = express.Router();

mikrolokacijeRouter.route("/add").post((req, res) => {
    new MikrolokacijeController().add(req,res);
});

mikrolokacijeRouter.route("/remove").post((req, res) => {
    new MikrolokacijeController().remove(req,res);
});

mikrolokacijeRouter.route("/getFromCity").post((req, res) => {
    new MikrolokacijeController().getFromCity(req,res);
});

mikrolokacijeRouter.route("/mikrolokacije").get((req, res) => {
    new MikrolokacijeController().getAll(req,res);
});

export default mikrolokacijeRouter;
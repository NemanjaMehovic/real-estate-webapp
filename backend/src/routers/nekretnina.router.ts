import express from "express";
import { NekretninaController } from "../controllers/nekretnina.controller";

const nekretninaRouter = express.Router();

nekretninaRouter.route("/nekretnine").get((req, res) => {
    new NekretninaController().getAll(req,res);
});

nekretninaRouter.route("/add").post((req, res) => {
    new NekretninaController().add(req,res);
});

nekretninaRouter.route("/sold").post((req, res) => {
    new NekretninaController().sold(req,res);
});

nekretninaRouter.route("/update").post((req, res) => {
    new NekretninaController().update(req,res);
});

export default nekretninaRouter;
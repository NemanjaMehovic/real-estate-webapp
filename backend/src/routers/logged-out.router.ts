import express from "express";
import { LoggedOutController } from "../controllers/logged-out.controller";

const loggedOutRouter = express.Router();

loggedOutRouter.route("/login").post((req, res) => {
    new LoggedOutController().login(req,res);
});

loggedOutRouter.route("/data").get((req, res) => {
    new LoggedOutController().getData(req,res);
});

loggedOutRouter.route("/opstine").post((req, res) => {
    new LoggedOutController().getOpstine(req,res);
});

loggedOutRouter.route("/register").post( (req, res) => {
    new LoggedOutController().register(req,res);
});

export default loggedOutRouter;
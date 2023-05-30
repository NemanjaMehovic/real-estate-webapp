import express from "express";
import { AgencyController } from "../controllers/agency.controller";

const agencyRouter = express.Router();

agencyRouter.route("/add").post((req,res)=>{
    new AgencyController().add(req,res);
});

export default agencyRouter;
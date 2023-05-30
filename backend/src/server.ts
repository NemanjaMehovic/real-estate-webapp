import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import loggedOutRouter from './routers/logged-out.router';
import userRouter from './routers/user.router';
import agencyRouter from './routers/agency.router';
import mikrolokacijeRouter from './routers/mikrolokacije.router';
import ulicaRouter from './routers/ulica.router';
import nekretninaRouter from './routers/nekretnina.router';
import linijaRouter from './routers/linija.router';

const app = express();
const fileUpload = require("express-fileupload");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('pictures'));
app.use(fileUpload({
    createParentPath: true,
}));

mongoose.connect('mongodb://localhost:27017/pia_projekat');
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("connection open");
});


const router = express.Router();

router.use("/loggedOut", loggedOutRouter);
router.use("/user", userRouter);
router.use("/agency", agencyRouter);
router.use("/mikrolokacije", mikrolokacijeRouter);
router.use("/ulica", ulicaRouter);
router.use("/nekretnina", nekretninaRouter);
router.use("/linija", linijaRouter);

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
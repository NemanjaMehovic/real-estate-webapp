import express from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route("/changePassword").post((req, res) => {
    new UserController().changePassword(req, res);
});

userRouter.route("/UnapprovedUsers").get((req, res) => {
    new UserController().getAllUnapprovedUsers(req, res);
});

userRouter.route("/users").get((req, res) => {
    new UserController().getAllUsers(req, res);
});

userRouter.route("/UpdateStatus").post((req, res) => {
    new UserController().updateUserStatus(req, res);
});

userRouter.route("/remove").post((req, res) => {
    new UserController().removeUser(req, res);
});

userRouter.route("/updateAdmin").post((req, res) => {
    new UserController().updateUser(req, res);
});

userRouter.route("/updateSeller").post((req, res) => {
    new UserController().updateSeller(req, res);
});

userRouter.route("/addFav").post((req, res) => {
    new UserController().addFav(req, res);
});

userRouter.route("/removeFav").post((req, res) => {
    new UserController().removeFav(req, res);
});

export default userRouter;
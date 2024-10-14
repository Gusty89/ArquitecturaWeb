import {Router} from "express";
import { allUsersCtrl } from "../controllers/user.controllers.js";

const userRoutes = Router();

userRoutes.get("/", allUsersCtrl);

export {userRoutes};
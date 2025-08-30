import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload, handleMulterError } from "../middlewares/multer.js";
 
const router = express.Router();

router.route("/register").post(singleUpload, handleMulterError, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload, handleMulterError, updateProfile);

export default router;


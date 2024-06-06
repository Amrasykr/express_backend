import express from "express";
import { login, logout, checkAuth } from "../controller/Auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.get("/check-auth", checkAuth);

export default router;
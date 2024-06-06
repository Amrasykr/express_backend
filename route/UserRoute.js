import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/Users.js";
import { verifyUser, verifyAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", verifyUser, verifyAdmin, getUsers);
router.get("/users/:id", verifyUser, verifyAdmin, getUserById);
router.post("/users", verifyUser, verifyAdmin, createUser);
router.put("/users/:id", verifyUser, verifyAdmin, updateUser);
router.delete("/users/:id", verifyUser, verifyAdmin, deleteUser);

export default router;

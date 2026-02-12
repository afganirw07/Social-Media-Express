import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById, loginUser } from "../controllers/User";
import { Router } from "express";

const router = Router();

// User routes
router.post("/user", createUser);
router.post("/login", loginUser);
router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", updateUserById);
router.delete("/user/:id", deleteUserById);

export default router;
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById, loginUser } from "../controllers/User";
import { Router } from "express";
import { userSchema, loginSchema } from "../schemas/user";
import { validateData } from "../middleware/zod";

const router = Router();

// User routes
router.post("/user", validateData(userSchema), createUser);
router.post("/login", validateData(loginSchema), loginUser);
router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", validateData(userSchema), updateUserById);
router.delete("/user/:id", deleteUserById);

export default router;
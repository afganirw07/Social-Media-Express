import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById, loginUser, verifyEmail, resendOTP } from "../controllers/User";
import { Router } from "express";
import { userSchema, loginSchema } from "../schemas/user";
import { validateData } from "../middleware/zod";
import { JwtVerify } from "../middleware/jwt";

const router = Router();

// User routes
router.post("/user", validateData(userSchema), createUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-otp", resendOTP);
router.post("/login", validateData(loginSchema), loginUser);
router.get("/user", getAllUsers);
router.get("/user/:id", JwtVerify, getUserById);
router.put("/user/:id", JwtVerify, validateData(userSchema), updateUserById);
router.delete("/user/:id", JwtVerify, deleteUserById);

export default router; 
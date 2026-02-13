import { instagramDownloaderVideo } from "../controllers/Instagram";
import { Router } from "express";
import { validateData } from "../middleware/zod";
import { JwtVerify } from "../middleware/jwt";
import { InstagramSchema } from "../schemas/instagram";

const router = Router();

router.get("/instagram", validateData(InstagramSchema), JwtVerify, instagramDownloaderVideo);

export default router;
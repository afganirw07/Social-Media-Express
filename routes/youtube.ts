import { youtubeDownloader } from "../controllers/Youtube";
import { Router } from "express";
import { YoutubeSchema } from "../schemas/youtube";
import { validateData } from "../middleware/zod";
import { JwtVerify } from "../middleware/jwt";

const router = Router();

router.post("/youtube", JwtVerify, validateData(YoutubeSchema), youtubeDownloader);

export default router;
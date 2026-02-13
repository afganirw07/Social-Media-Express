import { youtubeDownloader } from "../controllers/Youtube";
import { Router } from "express";
import { YoutubeSchema } from "../schemas/youtube";
import { validateData } from "../middleware/zod";

const router = Router();

router.post("/youtube", validateData(YoutubeSchema), youtubeDownloader);

export default router;
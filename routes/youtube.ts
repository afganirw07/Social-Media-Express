import { youtubeDownloader } from "../controllers/Youtube";
import { Router } from "express";

const router = Router();

router.post("/youtube", youtubeDownloader);

export default router;
import { twitterController } from "../controllers/Twitter";
import { Router } from "express";
import { TwitterSchema } from "../schemas/twitter";
import { validateData } from "../middleware/zod";
import { JwtVerify } from "../middleware/jwt";

const router = Router();

// Twitter
router.post("/twitter", JwtVerify, validateData(TwitterSchema), twitterController);

export default router;

import express from "express";
import type { Request, Response, NextFunction } from "express";
import User from "./routes/user.ts";
import Tiktok from "./routes/tiktok.ts";
import Youtube from "./routes/youtube.ts";
import Facebook from "./routes/facebook.ts";
import Instagram from "./routes/instagram.ts";
import Twitter from "./routes/twitter.ts";
import cors from "cors";
import rateLimiter from "./middleware/rateLimit.ts";


// server setup
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(rateLimiter);

app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// routes
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello World with Bun and Express!" });
});
app.use("/api", User);
app.use("/api", Tiktok);
app.use("/api", Youtube);
app.use("/api", Facebook);
app.use("/api", Instagram);
app.use("/api", Twitter);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

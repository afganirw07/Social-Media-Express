import express from "express";
import type { Request, Response } from "express";
import User from "./routes/user.ts";
import Tiktok from "./routes/tiktok.ts";
import Youtube from "./routes/youtube.ts";
import Facebook from "./routes/facebook.ts";
import Instagram from "./routes/instagram.ts";
import Twitter from "./routes/twitter.ts";


// server setup
const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());


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

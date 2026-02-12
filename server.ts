import express from "express";
import type { Request, Response } from "express";
import User from "./routes/user.ts";


// server setup
const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());


// routes
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello World with Bun and Express!" });
});
app.use("/api", User);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

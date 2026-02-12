import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 9000;

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello World with Bun and Express!" });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

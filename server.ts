import express from "express";

const app = express();
const port = 9000;

app.get("/", (req, res) => {
    res.send("Hello World with Bun and Express!");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

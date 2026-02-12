import express from "express";
import type { Request, Response } from "express";
import User from "./routes/user.ts";

// swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// server setup
const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());


// Swagger definition options
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger and Bun',
            version: '1.0.0',
            description: 'API documentation for my project',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./routes/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// routes
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello World with Bun and Express!" });
});
app.use("/api", User);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});

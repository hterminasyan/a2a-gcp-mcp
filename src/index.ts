import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from a2a-gcp-mcp-typescript!");
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

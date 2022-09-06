import * as dotenv from "dotenv";
import express, { Request, Response, Express } from "express";
import path from "node:path";
dotenv.config();
const app: Express = express();

const { cwd, env } = process;

const { NODE_PORT } = env;

const buildPath = path.resolve(cwd(), "build");
app.use(express.static(buildPath));

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(buildPath, "index.html"), (err) => {
    if (err) console.error(err);
  });
});

app.listen(NODE_PORT, () => {
  console.log("Listening on port " + NODE_PORT);
});

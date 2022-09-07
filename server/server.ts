import axios from "axios";
import * as dotenv from "dotenv";
import express, { Request, Response, Express } from "express";
import path from "node:path";
dotenv.config();
const app: Express = express();

const { cwd, env } = process;

const { NODE_PORT, TILELAYER_BASE_URL } = env;

const buildPath = path.resolve(cwd(), "build");
app.use(express.static(buildPath));

app.get("/gettiles", async (req: Request, res: Response) => {
  const { query } = req;
  const s = query.s;
  const { x, y, z } = query;
  const url = s
    ? `https://${s}.${TILELAYER_BASE_URL}/${z}/${x}/${y}`
    : `https://${TILELAYER_BASE_URL}/${z}/${x}/${y}`;
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    res.send(response.data as Buffer);
  } catch (e: any) {
    console.log({ e: e.message });
  }
});

app.get("/", (req: Request, res: Response) => {
  console.log("*");
  res.sendFile(path.join(buildPath, "index.html"), (err) => {
    if (err) console.error(err);
  });
});

app.listen(NODE_PORT, () => {
  console.log("Listening on port " + NODE_PORT);
});

import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDaniPlan } from "./planner.js";
import { callMockModel } from "./mock-model.js";

const root = join(fileURLToPath(new URL("..", import.meta.url)), "public");
const contentTypes = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8" };

function json(res, status, value) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(value));
}

async function readJson(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 20_000) throw new Error("Request body too large");
  }
  return JSON.parse(body || "{}");
}

function serveStatic(pathname, res) {
  const relative = pathname === "/" ? "index.html" : pathname.slice(1);
  const filePath = normalize(join(root, relative));
  if (!filePath.startsWith(root)) return json(res, 404, { error: "not_found" });
  try {
    const body = readFileSync(filePath);
    res.writeHead(200, { "Content-Type": contentTypes[extname(filePath)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    json(res, 404, { error: "not_found" });
  }
}

export function createAppServer({ logPath = "model-calls.log" } = {}) {
  return createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (req.method === "GET" && url.pathname === "/api/plan") return json(res, 200, buildDaniPlan());
    if (req.method === "POST" && url.pathname === "/api/explain") {
      try {
        const result = callMockModel(await readJson(req), { logPath });
        return json(res, 200, { explanation: result.output, model: result.label });
      } catch (error) {
        return json(res, 400, { error: "invalid_model_request", message: error.message });
      }
    }
    if (req.method === "GET") return serveStatic(url.pathname, res);
    return json(res, 404, { error: "not_found" });
  });
}

if (process.argv[1] && import.meta.url === new URL(`file:///${process.argv[1].replaceAll("\\", "/")}`).href) {
  const port = Number(process.env.PORT ?? 3000);
  createAppServer().listen(port, () => console.log(`Pathways demo listening on http://localhost:${port}`));
}

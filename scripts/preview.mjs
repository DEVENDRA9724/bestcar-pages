import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../out/", import.meta.url));
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    let target = resolve(root, `.${pathname}`);
    if (
      target !== root.slice(0, -1) &&
      !target.startsWith(root.endsWith(sep) ? root : root + sep)
    ) {
      res.writeHead(403).end();
      return;
    }
    try {
      if ((await stat(target)).isDirectory())
        target = resolve(target, "index.html");
    } catch {}
    try {
      const body = await readFile(target);
      res.writeHead(200, {
        "Content-Type": mime[extname(target)] || "application/octet-stream",
      });
      res.end(body);
    } catch {
      const fallback = await readFile(resolve(root, "404.html")).catch(() =>
        Buffer.from(
          "Page not found. Build the project before starting the preview.",
        ),
      );
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(fallback);
    }
  } catch {
    if (!res.headersSent) res.writeHead(400);
    res.end("Bad request");
  }
}).listen(Number(process.env.PORT || 3000), "127.0.0.1", () =>
  console.log(`Static preview: http://127.0.0.1:${process.env.PORT || 3000}`),
);

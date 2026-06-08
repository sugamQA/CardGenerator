import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const DIST = path.join(__dirname, "dist");

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

http
  .createServer((req, res) => {
    let filePath = path.join(DIST, req.url === "/" ? "index.html" : req.url);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        fs.readFile(path.join(DIST, "index.html"), (err2, data2) => {
          if (err2) {
            res.writeHead(500);
            return res.end("Server error");
          }
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data2);
        });
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

import express from 'express';
import http from 'http';
import { fileURLToPath } from 'url';
const app = express();
const port = process.env.PORT || 3000;
import path from 'path';
const server = http.createServer(app);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname + '/dist'));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});
server.listen(port, () => {
    console.log(`Server on port ${port}!`);
});

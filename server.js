import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('./dist'));
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
});

server.listen(port, function () {
    console.log(`===> Listening on port ${port}!`);
});
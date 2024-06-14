import express from 'express';
import http from 'http';

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(express.static('./dist'));

server.listen(port, function () {
    console.log(`Server on port ${port}!`);
});

import * as express from 'express';

const app = express();
const port = 3000;

app.use(require('morgan')('short'));

app.get("/", (req, res, next) => {
  res.send("Jello World");
});

app.listen(port);
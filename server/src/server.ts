import * as express from 'express';
import { Sequelize } from "sequelize-typescript";
import { ApodData } from './models/ApodData';
import { API_KEY } from "./apikey";
import "isomorphic-fetch";

const app = express();
const port = 3000;

const db = new Sequelize({
  database: "ApodData",
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: "./instance/database.sqlite",
  modelPaths: [__dirname + "/models"]
});

const apodSource = "https://api.nasa.gov/planetary/apod";

ApodData.sync().then(()=>{
  app.use(require('morgan')('short'));

  // Enable cors
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get("/", (req, res, next) => {
    if(!req.query.date || !/\d{4}-\d{2}-\d{2}/.test(req.query.date)) res.sendStatus(400);
    else {
      const d = req.query.date;
      ApodData.find({where: {date: d}}).then((val => {
        if(val) {
          res.send(val);
        }
        else 
          fetch(`${apodSource}?api_key=${API_KEY}&date=${d}`)
          .then((val) => {
            if(val) return val.json();
            else res.sendStatus(404);
          }).then((val) => {
            if(val)return ApodData.create(val)
            else res.sendStatus(500);
          }).then(val => {
            res.send(val);
          })
      })).catch(next);
    }
  });

  app.listen(port);

});

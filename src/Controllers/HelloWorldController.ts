/* eslint-disable */
import * as express from 'express';
import * as mongodb from "mongodb";
/* eslint-enable */

export default function init(app: express.Application, db: mongodb.Db) {
    app.get('/', function(req, res) {
        res.send('Hello World');
    });
}

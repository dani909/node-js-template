/* eslint-disable */
import * as express from 'express';
import * as mongodb from "mongodb";
import Settings from '../Settings';
/* eslint-enable */

export default function init(app: express.Application, db: mongodb.Db, settings:Settings) {
    app.get('/', function(req, res) {
        res.send('Hello World');
    });
}

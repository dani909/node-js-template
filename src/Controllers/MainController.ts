/* eslint-disable */
import * as express from 'express';
import * as mongodb from 'mongodb';
/* eslint-enable */

// Import your Controllers here
import helloWorldController from './HelloWorldController';

export default function init(app: express.Application, db: mongodb.Db) {
    // Call init functions for controllers here
    helloWorldController(app, db);

    // TODO customize or remove static folder
    app.use('/', express.static(require('path')
        .join(__dirname, '..', '..', '/public')));
}

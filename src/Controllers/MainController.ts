/* eslint-disable */
import * as express from 'express';
import * as mongodb from 'mongodb';
import Settings from '../Settings';
/* eslint-enable */

// Import your Controllers here
import helloWorldController from './HelloWorldController';

export default function init(app: express.Application, db: mongodb.Db, settings: Settings) {
    // Call init functions for controllers here
    helloWorldController(app, db, settings);

    // TODO customize or remove static folder
    app.use('/', express.static(require('path')
        .join(__dirname, '..', '..', '/public')));
}

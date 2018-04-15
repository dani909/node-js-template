import Settings from './Settings';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongodb from 'mongodb';
import * as fs from 'fs';
import * as https from 'https';
import mainController from './Controllers/MainController';

let settings: Settings;
let args = process.argv;
let settingsPath = path.join(__dirname, '..', '/settings.json');

try {
    if (args.length > 2) {
        // Specified setting
        settings = Settings.loadSettings(false, args[2], settingsPath);
    } else {
        // Use standart setting
        settings = Settings.loadSettings(true, '', settingsPath);
    }
} catch (e) {
    console.error('Couldn\'t load Settings:\n' + e);
    process.exit(1);
}

console.log(`Starting with ${settings.name} Settings`);

let app = express();

// Parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongodb.MongoClient.connect(settings.dbUrl, (err, client) => {
    if (err) return console.log('Err at connecting to MongoDB:\n' + err);

    // Get DB
    const db = client.db(settings.dbName);
    console.log('Connected to MongoDB');

    // TODO add middlewares if needede here

    mainController(app, db);

    // Start HTTP Server
    if (!settings.httpPort) {
        console.log('Don\'t start HTTP Server because it is disabled in the Settings');
    } else {
        app.listen(settings.httpPort, () => {
            console.log('Started HTTP Server at ' + settings.httpPort);
        });
    }

    // Start HTTPS Server
    if (!settings.httpsPort) {
        console.log('Don\'t start HTTPS Server because it is disabled in the Settings');
    } else {
        try {
            let privateKey = fs.readFileSync(settings.privateKeyPath)
            let certificate = fs.readFileSync(settings.certificatePath);

            let server = https.createServer({
                key: privateKey,
                cert: certificate,
            }, app);

            server.listen(settings.httpsPort, () => {
                console.log('Started HTTPS Server at ' + settings.httpsPort);
            });
        } catch (e) {
            console.log(`Error at starting HTTPS Server:\n${e}`)
        }
    }
});

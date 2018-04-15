import Settings from './Settings';
import * as path from 'path';

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


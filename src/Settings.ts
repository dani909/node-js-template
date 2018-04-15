import * as fs from 'fs';

export default class Settings {
    name: string;
    httpPort: number;
    httpsPort: number;
    httpsEnabled: boolean;
    privateKeyPath: string;
    certificatePath: string;
    dbUrl: string;
    logFolder: string;

    static loadSetting = function (useDefault: boolean, settingName: string, path: string): Settings {
        var json = fs.readFileSync(path, 'utf8')

        var allSettings = { standartSetting: '', settings: Array<Settings>() }
        allSettings = JSON.parse(json)

        if (useDefault) {
            return allSettings.settings.filter(s => s.name === allSettings.standartSetting)[0]
        } else {
            return allSettings.settings.filter(s => s.name === settingName)[0]
        }
    }
};
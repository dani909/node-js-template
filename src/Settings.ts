import * as fs from 'fs';

// TODO add other settings for example a folder for logs
export default class Settings {
    name: string;
    httpPort: number;
    httpsPort: number;
    httpsEnabled: boolean;
    privateKeyPath: string;
    certificatePath: string;
    dbUrl: string;

    static loadSettings = function(useDefault: boolean, settingName: string, path: string): Settings {
        let json = fs.readFileSync(path, 'utf8');

        let allSettings = {standartSetting: '', settings: Settings[0]};
        allSettings = JSON.parse(json);

        if (allSettings.settings.length == 0) throw new Error('No Settings specified');

        if (useDefault) {
            console.log(allSettings.standartSetting);
            if (allSettings.standartSetting == null) throw new Error('No Settings arg found and no standartSetting specified');

            let filteredSettings = allSettings.settings.filter((s) => s.name === allSettings.standartSetting);

            if (filteredSettings.length == 0) throw new Error('The standartSetting with the Name ' + allSettings.standartSetting + ' couldn\'t be found!');

            return filteredSettings[0];
        } else {
            let filteredSettings = allSettings.settings.filter((s) => s.name === settingName);

            if (filteredSettings.length == 0) throw new Error('No Settings with the Name ' + settingName + ' found!');

            return filteredSettings[0];
        }
    }
};

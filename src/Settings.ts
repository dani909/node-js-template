import * as fs from 'fs';

//TODO add other settings for example a folder for logs
export default class Settings {
    name: string;
    httpPort: number;
    httpsPort: number;
    httpsEnabled: boolean;
    privateKeyPath: string;
    certificatePath: string;
    dbUrl: string;

    static loadSettings = function (useDefault: boolean, settingName: string, path: string): Settings {
        var json = fs.readFileSync(path, 'utf8')

        var allSettings = { standartSetting: '', settings: Array<Settings>() }
        allSettings = JSON.parse(json)

        if(allSettings.settings.length == 0) throw "No Settings specified";

        if (useDefault) {
            console.log(allSettings.standartSetting)
            if(allSettings.standartSetting == null) throw 'No Settings arg found and no standartSetting specified'

            var filteredSettings = allSettings.settings.filter(s => s.name === allSettings.standartSetting)

            if(filteredSettings.length == 0) throw "The standartSetting with the Name " + allSettings.standartSetting + " couldn't be found!"

            return filteredSettings[0]
        } else {
            var filteredSettings = allSettings.settings.filter(s => s.name === settingName)
            
            if(filteredSettings.length == 0) throw "No Settings with the Name " + settingName + " found!"

            return filteredSettings[0]
        }
    }
};
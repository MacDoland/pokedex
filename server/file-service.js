const fs = require('fs');

class FileService {

    static loadFile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (error, data) => {
                if (error) {
                    reject(error)
                }
                else {
                    resolve(JSON.parse(data));
                }
            });
        });
    }

    static writeFile(path, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, data, (error) => {
                if (error) {
                    reject(error)
                }
                else {
                    resolve();
                }
            });
        });
    }
}

modules.exports = FileService;
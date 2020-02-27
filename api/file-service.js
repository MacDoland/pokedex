var fs = require('fs');

class FileService {

    static readFile(path) {
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
            fs.writeFile(path, JSON.stringify(data), (error) => {
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

module.exports = FileService;
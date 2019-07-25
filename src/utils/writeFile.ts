import fs from 'fs';
import mkdirp from 'mkdirp';
import { dirname } from 'path';

export default function writeFile(path: string, contents: string) {
    return new Promise((resolve, reject) => {
        mkdirp(dirname(path), (err) => {
            if (err) return reject(err);
            fs.writeFile(path, contents, (error) => {
                if (error) reject(error);
                resolve();
            });
        });
    });
}

import fs from 'fs';
import { join } from 'path';

// 删除文件夹
export function removeFolder(path: string) {
    if (fs.existsSync(path)) {
        const files = fs.readdirSync(path);
        files.forEach(file => {
            const curPath = join(path, file);
            if (fs.statSync(curPath).isDirectory()) {
                removeFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

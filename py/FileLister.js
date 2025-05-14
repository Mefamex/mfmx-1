const fs = require('fs');
const path = require('path');


class DirExVis {
    /**
     * Bu sınıf, bir dizin yapısını gezerek, dosya ve dizinler hakkında bilgi toplar ve biçimlendirilmiş bir şekilde sunar.
     */

    static tabSize = 6;
    static detailsSize = false;
    static detailsDate = false;
    static detailsFolderCount = false;
    static width = 35;
    static maxNameLength = [0, 0]; // name, depth
    static passDotDirs = true; // passing dirs and files is starts with dot (.)

    static unixToDate(unix) {
        return new Date(unix * 1000).toISOString().replace('T', ' ').slice(0, 19);
    }

    constructor(dirPath = '') {
        this.dirPath = dirPath || process.cwd();
        this.datas = {}; // { "name" : [depth(int) ,type (file/dir) , size , date , {childs}]  }
        this.dataStr = '';
        this.printAllDotted = true;
        this.start();
        this.saveDirExVis();
    }

    walker(dirPath, depth = 0, data = null) {
        if (!dirPath) {
            dirPath = this.dirPath;
        }
        if (!data) {
            data = this.datas;
        }
        const files = fs.readdirSync(dirPath);
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);
            if (DirExVis.passDotDirs && file.startsWith('.')) {
                continue;
            }
            if (stats.isDirectory()) {
                data[file] = [
                    depth + 1,
                    'dir',
                    0,
                    DirExVis.unixToDate(stats.mtimeMs / 1000),
                    {},
                ];
                DirExVis.maxNameLength[0] = Math.max(DirExVis.maxNameLength[0], file.length);
                DirExVis.maxNameLength[1] = Math.max(DirExVis.maxNameLength[1], depth);
                this.printAll({ [file]: data[file] });
                this.walker(filePath, depth + 1, data[file][4]);
            } else {
                data[file] = [
                    depth + 1,
                    'file',
                    stats.size,
                    DirExVis.unixToDate(stats.mtimeMs / 1000),
                ];
                DirExVis.maxNameLength[0] = Math.max(DirExVis.maxNameLength[0], file.length);
                this.printAll({ [file]: data[file] });
            }
        }
    }

    printAll(data = {}) {
        if (Object.keys(data).length === 0) {
            data = this.datas;
        }
        for (const key in data) {
            const value = data[key];
            const bas = ('|' + ' '.repeat(DirExVis.tabSize)) * value[0];
            const folderCount = value[1] === 'dir' ? `(${Object.keys(value[4]).length})` : '';
            const size = DirExVis.detailsSize ? `${(value[2] / (1024 * 1024)).toFixed(3)}mb ` : '';
            const date = DirExVis.detailsDate ? value[3] : '';
            const arabosluk = DirExVis.detailsSize || DirExVis.detailsDate
                ? ' '.repeat(
                    DirExVis.width +
                    DirExVis.maxNameLength[0] +
                    DirExVis.maxNameLength[1] * DirExVis.tabSize -
                    (bas + key + folderCount + size + date).length,
                )
                : '';
            this.printAllDotted = !this.printAllDotted;
            if (this.printAllDotted) {
                this.dataStr += `${bas}${key}${folderCount}${arabosluk.replace(/ /g, '-')}${size}${date}\n`;
                console.log(`${bas}${key}${folderCount}${arabosluk.replace(/ /g, '-')}${size}${date}`);
            } else {
                this.dataStr += `${bas}${key}${folderCount}${arabosluk}${size}${date}\n`;
                console.log(`${bas}${key}${folderCount}${arabosluk}${size}${date}`);
            }
            if (value[1] === 'dir' && Object.keys(value[4]).length > 0) {
                this.printAll(value[4]);
            }
        }
    }

    saveDirExVis() {
        const date = new Date().toISOString().replace('T', ' ').slice(0, 19).replace(/:/g, '.');
        fs.writeFileSync(`DirExVis_${date}.txt`, this.dataStr);
        console.log(`File saved at: ${process.cwd()} and its name starts with: DirExVis_******.txt`);
    }
}
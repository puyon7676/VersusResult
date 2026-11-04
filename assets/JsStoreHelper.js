//declare const Connection: any;
export class JsStoreHelper {
    // JSStoreのコネクション保持
    connection;
    async connect(workerFile) {
        /*
        this.connection = new JsStore.Connection(
            new Worker(workerFile)
        );
        console.log("connection started");
        */
        console.log("Waiting for JsStore library...");
        // JsStoreがグローバル(window)に出現するまで最大5秒間、0.1秒ごとにチェックする
        let retry = 0;
        while (typeof window.JsStore === 'undefined') {
            if (retry > 50) { // 5秒待ってもダメなら異常事態
                throw new Error("JsStore library load timeout. Check script tag order.");
            }
            await new Promise(resolve => setTimeout(resolve, 100)); // 100ms待機
            retry++;
        }
        // ここまで来れば、確実に JsStore は定義されている
        const lib = window.JsStore;
        this.connection = new lib.Connection(new Worker(workerFile));
        console.log("connection started with library version:", lib.VERSION);
    }
    async term() {
        const res = await this.connection.terminate();
        console.log("connection terminated");
    }
    async initDb() {
        const res = await this.connection.initDb(this.db);
        if (res) {
            console.log('Db Created & connection is opened');
        }
        else {
            console.log('Db connection is opened');
        }
        return res;
    }
    async dropDb() {
        let res = false;
        await this.connection.dropDb().then(function () {
            console.log('Db deleted successfully');
            res = true;
        }).catch(function ( /*error*/) {
            console.error('dropDb error');
        });
        return res;
    }
    async deleteAllRecords(tableName) {
        if (await this.existsTable(tableName) === false) {
            console.log(`[${tableName}] not exist`);
            return false;
        }
        await this.connection.clear(tableName);
        console.log(`[${tableName}] all record deleted successfully`);
        return true;
    }
    async existsTable(tableName) {
        try {
            const results = await this.connection.count({
                from: tableName,
                /*
                where: {
                    key: key
                }
                */
            });
            //results will be a number
            //console.log(results);
            return true;
        }
        catch (error) {
            console.log("[existsTable] JsStore Select Error:", error);
        }
        return false;
    }
    get defWorkerFile() {
        return window.EVONA_CONFIG.workerFile;
    }
    async setup() {
        await this.connect(this.defWorkerFile);
        const res = await this.initDb();
        return res;
    }
    sortByIdAscAsNum(results) {
        if (results) {
            results.sort((a, b) => {
                return Number(a.id) - Number(b.id); // 明示的にNumberキャストして比較
            });
        }
    }
    tblNameCharImages = `CharImages`;
    tblCharImages = {
        name: this.tblNameCharImages,
        columns: {
            //id: { primaryKey: true, autoIncrement: true },
            ns: { dataType: 'string', index: true },
            name: { dataType: 'string' },
            fileName: { dataType: 'string', index: true },
            fileData: { dataType: 'object' }
        }
    };
    tblNameSettings = `Settings`;
    tblSettings = {
        name: this.tblNameSettings,
        columns: {
            //id: { primaryKey: true, autoIncrement: true },
            key: { dataType: 'string', primaryKey: true },
            value: { dataType: 'string' },
        }
    };
    tblNameActionLog = `ActionLog`;
    tblActionLog = {
        name: this.tblNameActionLog,
        columns: {
            id: { primaryKey: true, autoIncrement: true },
            logType: { dataType: 'string' },
            log: { dataType: 'string' },
        }
    };
    dbName = `EvonaDB`;
    db = {
        name: this.dbName,
        tables: [this.tblCharImages, this.tblSettings, this.tblActionLog]
    };
}
export class CharImageTable extends JsStoreHelper {
    async insert(fileName, ns, blob) {
        //await importSripts("transaction.js");        
        /*
        // トランザクションの実行
        await this.connection.transaction({
            tables: [ `${this.tblNameCharImages}` ],
            method: this.insertZipFile,
            data: {
                ns: ns,
                name: ``,
                fileName: fileName,
                fileData: blob
            }
        });
        */
        await this.connection.insert({
            into: this.tblNameCharImages,
            values: [{
                    ns: ns,
                    name: ``,
                    fileName: fileName,
                    fileData: blob
                }]
        });
    }
    // トランザクション内で実行する関数
    async insertZipFile(data) {
        await this.connection.insert({
            into: this.tblNameCharImages,
            values: [{
                    ns: data.ns,
                    name: data.name,
                    fileName: data.name,
                    fileData: data.fileData
                }]
        });
    }
    // 引数を配列形式に。型定義は適宜調整してください。
    async insertMultiple(dataList) {
        // dataList（配列）を JsStore が期待する values の形式へ「一括変換」します
        const values = dataList.map(item => ({
            ns: item.ns,
            name: ``, // 固定値ならここで指定
            fileName: item.fileName,
            fileData: item.blob
        }));
        // 配列をそのまま values に渡すだけで、JsStoreが内部で一気に処理してくれます
        return await this.connection.insert({
            into: this.tblNameCharImages,
            values: values,
            upsert: true // もし同じfileNameがあれば上書きする場合はこれを入れると便利です
        });
    }
    async selectBlob(ns, fileName) {
        try {
            var results = await this.connection.select({
                from: this.tblNameCharImages,
                where: {
                    ns: ns,
                    fileName: fileName
                }
            });
            //results will be array of objects.
            //console.log(results);
            //console.log(results[0].fileData);
            return results.length >= 1 ? results[0].fileData : null;
        }
        catch (error) {
            console.error("[selectBlob] JsStore Select Error:", error);
        }
        return null;
    }
    async selectBlobByNs(ns) {
        try {
            var results = await this.connection.select({
                from: this.tblNameCharImages,
                where: {
                    ns: ns
                }
            });
            //results will be array of objects.
            //console.log(results);
            const map = new Map;
            for (const item of results) {
                map.set(item.fileName, item.fileData);
            }
            return results.length >= 1 ? map : null;
        }
        catch (error) {
            console.error("[selectBlobByNs] JsStore Select Error:", error);
        }
        return null;
    }
    async selectNs(fileName) {
        try {
            var results = await this.connection.select({
                from: this.tblNameCharImages,
                where: {
                    fileName: fileName
                }
            });
            //results will be array of objects.
            //console.log(results);
            //console.log(results[0].ns);
            return results.length >= 1 ? results[0].ns : null;
        }
        catch (error) {
            console.error("[selectNs] JsStore Select Error:", error);
        }
        return null;
    }
    async countNs(ns) {
        try {
            const results = await this.connection.count({
                from: this.tblNameCharImages,
                where: {
                    ns: ns
                }
            });
            //results will be a number
            //console.log(results);
            return results;
        }
        catch (error) {
            console.error("[countNs] JsStore Select Error:", error);
        }
        return -1;
    }
}
export class SettingTable extends JsStoreHelper {
    async insert(key, value) {
        await this.connection.insert({
            into: this.tblNameSettings,
            values: [{
                    key: key,
                    value: value,
                }],
            upsert: true
        });
    }
    async insertMultiple(dataList) {
        // dataList（配列）を JsStore が期待する values の形式へ「一括変換」します
        const values = dataList.map(item => ({
            key: item.key,
            value: item.value
        }));
        // 配列をそのまま values に渡すだけで、JsStoreが内部で一気に処理してくれます
        return await this.connection.insert({
            into: this.tblNameSettings,
            values: values,
            upsert: true // もし同じfileNameがあれば上書きする場合はこれを入れると便利です
        });
    }
    async selectKey(key) {
        try {
            var results = await this.connection.select({
                from: this.tblNameSettings,
                where: {
                    key: key
                }
            });
            //results will be array of objects.
            //console.log(results);
            return results.length >= 1 ? results[0].value : null;
        }
        catch (error) {
            console.error("[selectKey] JsStore Select Error:", error);
        }
        return null;
    }
    async countKey(key) {
        try {
            const results = await this.connection.count({
                from: this.tblNameSettings,
                where: {
                    key: key
                }
            });
            //results will be a number
            //console.log(results);
            return results;
        }
        catch (error) {
            console.error("[countKey] JsStore Select Error:", error);
        }
        return -1;
    }
    async clear() {
        await this.deleteAllRecords(this.tblNameSettings);
    }
}
export class SettingAccess {
    table = new SettingTable();
    envRecKey = `env`;
    homeRecKey = `home`;
    async init() {
        const table = new SettingTable;
        await table.setup();
        this.table = table;
    }
    async saveEnv(keyValuePairs) {
        let saveText = this.toSaveText(keyValuePairs);
        if (saveText.length === 0)
            return false;
        await this.table.insert(this.envRecKey, `${saveText}`);
        return true;
    }
    async loadEnv() {
        let env = new Array;
        const text = await this.table.selectKey(this.envRecKey);
        if (text !== null) {
            env = this.fromLoadText(text);
        }
        return env;
    }
    async saveHome(keyValuePairs) {
        let saveText = this.toSaveText(keyValuePairs);
        if (saveText.length === 0)
            return false;
        await this.table.insert(this.homeRecKey, `${saveText}`);
        return true;
    }
    async loadHome() {
        let env = new Array;
        const text = await this.table.selectKey(this.homeRecKey);
        if (text !== null) {
            env = this.fromLoadText(text);
        }
        return env;
    }
    toSaveText(keyValuePairs) {
        let saveText = ``;
        for (const pair of keyValuePairs) {
            const keyValue = pair.split(`=`);
            if (keyValue.length <= 1)
                continue;
            if (saveText === ``)
                saveText = pair;
            else
                saveText += `,` + pair;
        }
        return saveText;
    }
    fromLoadText(text) {
        const env = new Array;
        if (text !== null) {
            const ary = text.split(`,`);
            for (const pair of ary) {
                const keyValue = text.split(`=`);
                if (keyValue.length <= 1)
                    continue;
                env.push(pair);
            }
        }
        return env;
    }
    async saveDialogPos(dlg) {
        const parentElement = dlg.parentElement;
        const posText = `${parentElement?.className},${parentElement?.style.left},${parentElement?.style.top}`;
        await this.table.insert(dlg.className, `${posText}`);
    }
    async loadDialogPos(dlg) {
        const parentElement = dlg.parentElement;
        //const posText = `${parentElement?.className},${parentElement?.style.left},${parentElement?.style.top}`
        const text = await this.table.selectKey(dlg.className);
        if (text !== null) {
            const ary = text.split(`,`);
            if (ary.length === 3) {
                if (parentElement !== null) {
                    if (ary[0] === parentElement.className) {
                        parentElement.style.left = ary[1];
                        parentElement.style.top = ary[2];
                    }
                }
            }
        }
    }
    async saveKeyValue(key, value) {
        await this.table.insert(key, value);
        return true;
    }
    async loadKeyValue(key) {
        const text = await this.table.selectKey(key);
        return text;
    }
    async clear() {
        this.table.clear();
    }
}
export class LogTable extends JsStoreHelper {
    async insert(logType, log) {
        await this.connection.insert({
            into: this.tblNameActionLog,
            values: [{
                    logType: logType,
                    log: log,
                }],
            //upsert: true
        });
    }
    async insertMultiple(dataList) {
        // dataList（配列）を JsStore が期待する values の形式へ「一括変換」します
        const values = dataList.map(item => ({
            logType: item.logType,
            log: item.log
        }));
        // 配列をそのまま values に渡すだけで、JsStoreが内部で一気に処理してくれます
        return await this.connection.insert({
            into: this.tblNameActionLog,
            values: values,
            //upsert: true    // もし同じfileNameがあれば上書きする場合はこれを入れると便利です
        });
    }
    async selectType(logType) {
        try {
            var results = await this.connection.select({
                from: this.tblNameActionLog,
                where: {
                    logType: logType
                },
                order: {
                    by: 'id',
                    type: 'asc'
                }
            });
            //results will be array of objects.
            //console.log(results);
            this.sortByIdAscAsNum(results);
            return results.length >= 1 ? results : null;
        }
        catch (error) {
            console.error("[selectType] JsStore Select Error:", error);
        }
        return null;
    }
    async countType(logType) {
        try {
            const results = await this.connection.count({
                from: this.tblNameActionLog,
                where: {
                    logType: logType
                }
            });
            //results will be a number
            //console.log(results);
            return results;
        }
        catch (error) {
            console.error("[countType] JsStore Select Error:", error);
        }
        return -1;
    }
    async clear() {
        await this.deleteAllRecords(this.tblNameActionLog);
    }
}
export class LogAccessRec {
    id = -1;
    log = "";
}
export class LogAccess {
    table = new LogTable();
    async init() {
        const table = new LogTable;
        await table.connect(table.defWorkerFile);
        await table.initDb();
        this.table = table;
    }
    async clear() {
        this.table.clear();
    }
    async put(logType, text) {
        return await this.table.insert(logType, text);
    }
    async get(logType) {
        const recs = await this.table.selectType(logType);
        if (recs === null)
            return null;
        const logs = new Array;
        for (const rec of recs) {
            //logs.push(rec.log)
            logs.push({ id: rec.id, log: rec.log });
        }
        return logs;
    }
}
export const LogTypes = {
    None: "None",
    CharSummaryAction: "CharSummaryAction",
    ResourceEditAction: "ResourceEditAction",
    GameEditAction: "GameEditAction",
    ScoreEditAction: "ScoreEditAction",
};
let instSettingAccess = null;
export async function getSettingAccessInstance() {
    if (!instSettingAccess) {
        instSettingAccess = new SettingAccess();
        await instSettingAccess.init();
        console.log("SettingAccess instance created (Singleton)");
    }
    return instSettingAccess;
}
let instLogAccess = null;
export async function getLogAccessInstance() {
    if (!instLogAccess) {
        instLogAccess = new LogAccess();
        await instLogAccess.init();
        console.log("LogAccess instance created (Singleton)");
    }
    return instLogAccess;
}
function generateUUID() {
    // 10年前の環境でも動く、伝統的なUUID生成ロジック
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
export function generateSafeID() {
    const timestamp = Date.now().toString(16); // 現在時刻（ミリ秒）
    const uuid = generateUUID(); // さっきのUUID生成関数
    return `${timestamp}-${uuid}`;
}
//# sourceMappingURL=JsStoreHelper.js.map
import { GameEnv } from "./GameEnv.js";
import { nsMap, CharStatusClassifyTypes, CharNameSpaceTypes, CharStatusNameTypes } from "./CharClass.js";
import { CharSkillData } from "./CharDB.js";
import { SegmenterHelper } from "./SegmenterHelper.js";
import { getSettingAccessInstance } from "./JsStoreHelper.js";
/**改行を取り除く */
export function toPlainText(elem) {
    let result = "";
    /*
    elem.childNodes.forEach(node => {
        console.log(node.nodeType)
        console.log(Node.TEXT_NODE)
        if (node.nodeType === 3/*Node.TEXT_NODE* /) {
            // テキスト内の \n (改行コード) や余計な空白を削除・整理
            if (node.textContent !== null) {
                result += node.textContent.replace(/\s+/g, '');
            }
        }
        else if (node.nodeType === 1/*Node.ELEMENT_NODE* /) {
        }
        else if (node.nodeName === 'BR') {
            // <br> を見つけたら意図通り ',' に置換
            result += ",";
        }
    });
    */
    for (const node of elem.childNodes) {
        //console.log(node.nodeType)
        //console.log(Node.TEXT_NODE)
        if (node.nodeType === 3 /*Node.TEXT_NODE*/) {
            // テキスト内の \n (改行コード) や余計な空白を削除・整理
            if (node.textContent !== null) {
                result += node.textContent.replace(/\s+/g, '');
            }
        }
        else if (node.nodeType === 1 /*Node.ELEMENT_NODE*/) {
            if (node.nodeName === 'BR') {
                // <br> を見つけたら意図通り ',' に置換
                result += ",";
            }
            else if (node.textContent !== null) {
                result += node.textContent.replace(/\s+/g, '');
            }
        }
    }
    //console.log(`${elem.textContent} -> ${result}`)
    return result;
}
export class ImporterNsLastUpdate {
    ns = CharNameSpaceTypes.None;
    lastUpdate = ``; //保存した更新日時
    checkRes = false; //checkChangeの処理結果
    changedDateTime = ``; //更新確認した日時テキスト
    checkChange(timeElem) {
        let attr = timeElem.getAttribute('datetime');
        if (attr === null) {
            attr = timeElem.textContent;
            if (attr === null)
                return false;
        }
        if (attr.trim() === ``)
            return false;
        this.checkRes = this.lastUpdate !== attr;
        this.changedDateTime = attr;
        return true;
    }
}
export class ImporterGmLastUpdate {
    gm = CharStatusClassifyTypes.none;
    nsMap = new Map;
    importer;
    /**IndexedDB保存キー */
    get key() {
        return `lastUpdate-${this.gm}`;
    }
    /**IndexedDBからロード */
    async loadUpdate() {
        const settingAccess = await getSettingAccessInstance();
        const loadTextAll = await settingAccess.loadKeyValue(this.key);
        if (loadTextAll === null || loadTextAll === ``) {
            console.log(`not exist lastUpdate [${this.gm}]`);
            return;
        }
        const loadArray = loadTextAll.split(`,`);
        if (loadArray.length !== this.nsMap.size)
            return;
        let itemIndex = 0;
        for (const [ns, nsItem] of this.nsMap) {
            const loadParts = loadArray[itemIndex].split(`=`);
            if (loadParts.length === 2) {
                if (loadParts[0] === ns) {
                    nsItem.lastUpdate = loadParts[1];
                    nsItem.checkRes = false;
                }
            }
            itemIndex++;
        }
    }
    /**IndexedDBへ保存 */
    async saveUpdate() {
        let saveTextAll = ``;
        for (const [ns, nsItem] of this.nsMap) {
            if (saveTextAll !== ``)
                saveTextAll += `,`;
            const saveText = `${ns}=${nsItem.lastUpdate}`;
            saveTextAll += saveText;
        }
        const settingAccess = await getSettingAccessInstance();
        settingAccess.saveKeyValue(this.key, saveTextAll);
    }
}
/**更新日時テーブル */
export const ImporterLastUpdateMap = new Map();
/**更新日時テーブル初期化 */
export async function initImportersLastUpdate() {
    for (const [gm, importer] of ImporterMap) {
        const gmLastUpdate = new ImporterGmLastUpdate();
        gmLastUpdate.gm = importer.gm;
        gmLastUpdate.importer = importer;
        if (importer.nsURLs !== undefined) {
            for (const nsi of importer.nsURLs) {
                const lu = new ImporterNsLastUpdate();
                lu.ns = nsi.ns;
                gmLastUpdate.nsMap.set(nsi.ns, lu);
            }
        }
        await gmLastUpdate.loadUpdate();
        ImporterLastUpdateMap.set(gm, gmLastUpdate);
    }
}
export class ImporterNsItem {
    ns = CharNameSpaceTypes.None;
    nsName = ``;
    url = ``;
    lastUpdate = null;
}
export class ImporterMapItem {
    gm = CharStatusClassifyTypes.none;
    displayText = ``;
    inst; //登録元クラスのインスタンス
    nsURLs;
    htmlMarker = ``;
    chListMaker = ``;
    parseHtml;
    statusMaker = ``;
    parseStatus;
    statusZip = ``;
    charHtmlZip = ``;
    charRisticWd = ``;
}
/**インポーターテーブル */
export const ImporterMap = new Map();
/**インポーターテーブルへの登録 */
export function registImporter(importerMapItem) {
    const importer = ImporterMap.get(importerMapItem.gm);
    if (importer === undefined) {
        ImporterMap.set(importerMapItem.gm, importerMapItem);
        return importer;
    }
    return undefined;
}
/**プラグインオートローディング */
/*古いバージョン
export async function bootstrapPlugins() {
    // 1. 名簿を読み込む
    const response = await fetch('/dist/SiteImporters/plugins.json');
    const plugins = await response.json();

    // 2. 動的ロード
    for (const file of plugins) {
        const module = await import(`/dist/SiteImporters/${file}`);
        
        // --- 💡 ここを変更！ ---
        // default があればそれを使う。なければモジュール内の最初のクラス（エクスポート値）を探す
        const TargetClass = module.default || Object.values(module)[0];

        if (TargetClass) {
            // 💡 変更点：プロトタイプではなく、動的に「new」して実体（インスタンス）を作る！
            const instance = new TargetClass();

            // インスタンス側に register があれば実行！
            if (instance.register && typeof instance.register === 'function') {
                instance.register(); // これでメンバ変数も100%完璧に動きます！
            }
        }
    }
}
*/
/**プラグインオートローディング */
export async function bootstrapPlugins() {
    const baseDir = new URL('.', import.meta.url);
    // 1. 名簿を読み込む
    //const response = await fetch('/dist/SiteImporters/plugins.json');
    const jsonUrl = new URL('./SiteImporters/plugins.json', baseDir);
    const response = await fetch(jsonUrl);
    const plugins = await response.json();
    // 2. 動的ロード
    for (const file of plugins) {
        //const module = await import(`/dist/SiteImporters/${file}`);
        const moduleUrl = new URL(`./SiteImporters/${file}`, baseDir);
        const module = await import(moduleUrl.href);
        // --- 💡 完璧なクラス抽出ロジック！ ---
        // 1. default エクスポートがあれば最優先
        // 2. なければ モジュール内の全エクスポート値から「class（コンストラクタ）」であるものを検索！
        const exports = Object.values(module);
        const TargetClass = module.default || exports.find(exp => typeof exp === 'function' &&
            exp.prototype &&
            exp.prototype.constructor === exp);
        if (TargetClass) {
            // 動的に「new」して実体（インスタンス）を作る！
            const instance = new TargetClass();
            // インスタンス側に register があれば実行！
            if (instance.register && typeof instance.register === 'function') {
                instance.register();
            }
        }
    }
}
import { ServerTools } from './ServerTools.js';
/**攻略サイトインポート */
export class SiteImporter extends ServerTools {
    static prefixImgGetCmd = `chImgGetCmd`;
    static prefixPropGetCmd = `chPropGetCmd`;
    /**キャラ一覧HTML取得 */
    static async doFetchGetHtml(imItem, nsUrl) {
        const targetUrl = encodeURIComponent(nsUrl.url);
        const fileName = `${imItem.htmlMarker}${nsUrl.ns.substring(3)}.html`;
        const cmd = `get-html?url=${targetUrl}&html=${fileName}`;
        console.log(`${nsUrl.ns} : request `);
        const result = await this.request(cmd);
        console.log(`${nsUrl.ns} : サーバーからの応答:`, result);
        return result;
    }
    /**imgダウンロード指示Zipファイル名 */
    static chImgGetCmdZip(imItem) {
        const fileName = `${this.prefixImgGetCmd}_${imItem.chListMaker}.zip`;
        return fileName;
    }
    /**imgダウンロード指示Zip解凍 */
    static async doFetchUnzipImg(imItem) {
        const fileName = this.chImgGetCmdZip(imItem);
        const cmd = `nunzip?zip=${fileName}`;
        console.log(`${cmd} : request `);
        const result = await this.request(cmd);
        console.log(`${cmd} : サーバーからの応答:`, result);
        return result;
    }
    /**img一括ダウンロード(NS単位) */
    static async doFetchDlImg(imItem, nsUrl) {
        const fileName = `${this.prefixImgGetCmd}_${imItem.chListMaker}_${nsUrl.ns}.txt`;
        const cmd = `dl-files?list=${fileName}`;
        console.log(`${cmd} : request `);
        const result = await this.request(cmd);
        console.log(`${cmd} : サーバーからの応答:`, result);
        return result;
    }
    /**imgサブフォルダへ一括移動(NS単位) */
    static async doFetchMvImg() {
        const cmd = `mv-files?ext=png&mvdir=images`;
        console.log(`${cmd} : request `);
        const result = await this.request(cmd);
        console.log(`${cmd} : サーバーからの応答:`, result);
        return result;
    }
    /**imgサブフォルダを属性別フォルダ名にリネーム(NS単位) */
    static async doFetchRenameImg(nsUrl) {
        const cmd = `rename?from=images&to=images_${nsUrl.ns}`;
        console.log(`${cmd} : request `);
        const result = await this.request(cmd);
        console.log(`${cmd} : サーバーからの応答:`, result);
        return result;
    }
    /**キャラステータスダウンロード指示Zipファイル */
    static chPropGetCmdZip(imItem) {
        const fileName = `${this.prefixPropGetCmd}_${imItem.chListMaker}.zip`;
        return fileName;
    }
    /**キャラステータスダウンロード指示Zip解凍 */
    static async doFetchUnzipProp(imItem) {
        const fileName = this.chPropGetCmdZip(imItem);
        const cmd = `nunzip?zip=${fileName}`;
        console.log(`${cmd} : request `);
        const result = await this.request(cmd);
        console.log(`${cmd} : サーバーからの応答:`, result);
        return result;
    }
    /**キャラステータス一括ダウンロード(NS単位) */
    static async doFetchDlProp(imItem, nsUrl) {
        const fileName = `${this.prefixPropGetCmd}_${imItem.chListMaker}_${nsUrl.ns}.txt`;
        const cmd = `dl-files?list=${fileName}`;
        console.log(`${cmd} : request `);
        const result = await this.request(cmd);
        console.log(`${cmd} : サーバーからの応答:`, result);
        return result;
    }
    /**キャラステータスサブフォルダへ一括移動(NS単位) */
    static async doFetchMvProp() {
        const cmd = `mv-files?ext=txt&mvdir=status`;
        console.log(`${cmd} : request `);
        const result = await this.request(cmd);
        console.log(`${cmd} : サーバーからの応答:`, result);
        return result;
    }
    /**キャラステータスサブフォルダを属性別フォルダ名にリネーム(NS単位) */
    static async doFetchRenameProp(nsUrl) {
        const cmd = `rename?from=status&to=status_${nsUrl.ns}`;
        console.log(`${cmd} : request `);
        const result = await this.request(cmd);
        console.log(`${cmd} : サーバーからの応答:`, result);
        return result;
    }
    /**ファイル移動時の除外リスト作成 */
    static async doFetchExcludeFileList(imItem, nsUrls) {
        //ファイル移動時の除外リスト作成
        const excludeFiles = new Array;
        for (const nsUrl of nsUrls) {
            const fileName1 = `${this.prefixImgGetCmd}_${imItem.chListMaker}_${nsUrl.ns}.txt`;
            const fileName2 = `${this.prefixPropGetCmd}_${imItem.chListMaker}_${nsUrl.ns}.txt`;
            excludeFiles.push(fileName1);
            excludeFiles.push(fileName2);
        }
        const cmd = `set-exclude`;
        const bodyText = JSON.stringify({ excludeList: excludeFiles }); // ⚡️ 配列をJSON文字列にして直列送信！
        console.log(`${cmd} : request `);
        const result = await this.post(cmd, bodyText);
        console.log(`${cmd} : サーバーからの応答:`, result);
        return result;
        /*
        fetch("http://localhost:3000/set-exclude", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // ⚡️ JSONを送るよ、という法律
            },
            body: JSON.stringify({ excludeList: excludeFiles }) // ⚡️ 配列をJSON文字列にして直列送信！
        })
        .then(res => res.json())
        .then(data => {
            console.log("サーバーのメモリに除外リストを格納完了しました法律:", data);
        });
        */
    }
    files;
    remain = 0;
    charStockArray = new Array(nsMap.size);
    saveCharJsonFile = ``;
    onCharListUpdate;
    onCharListNotUpdate;
    onProgress;
    isAvailFile(fileInfo) {
        if (fileInfo.type === `text/html`)
            return true;
        if (fileInfo.type === `application/x-zip-compressed`)
            return true;
        if (fileInfo.type === `text/plain`)
            return true;
        return false;
    }
    getNs(fileName, gameType) {
        let ns = CharNameSpaceTypes.None;
        let group = fileName.substring(gameType.length);
        let pos = group.lastIndexOf(`.`);
        if (pos !== undefined) {
            group = group.substring(0, pos);
        }
        for (const [key, item] of nsMap) {
            if (item.marker === group) {
                ns = key;
                break;
            }
        }
        return ns;
    }
    async checkDone() {
        if (this.remain === 0) {
            /*保留
            reader.removeEventListener("loadend", onReaderLoaded)
            */
            if (this.onProgress !== undefined) {
                await this.onProgress(undefined, this.files.length - this.remain, this.files.length);
            }
        }
    }
    imgCurlZipFile = ``;
    imgCurlZip = new window.JSZip();
    makeImgCurlCmd(chListSave, saveTextFile) {
        //キャラ画像作成用コマンドファイルは属性毎で１ファイル(プレーンテキスト圧縮なし)で保存
        let cmdTextAll = ``;
        for (const ch of chListSave) {
            let echoCmd = `echo now downloading "${ch.name}"`;
            let cmdText = echoCmd + `\r\n` + `curl -L -A "Mozilla/5.0" --ssl-no-revoke "${ch.iconURL}" > "${ch.iconFileName}"`;
            if (cmdTextAll === ``)
                cmdTextAll += cmdText;
            else
                cmdTextAll += `\r\n` + cmdText;
        }
        //downloadText(cmdTextAll, saveTextFile)
        this.imgCurlZip.file(saveTextFile, cmdTextAll);
    }
    propCurlZipFile = ``;
    propCurlZip = new window.JSZip();
    makePropCurlCmd(chListSave, saveTextFile, propCurlType) {
        //キャラ詳細作成用コマンドファイルは属性毎で１ファイル(プレーンテキスト圧縮なし)で保存
        let cmdTextAll = ``;
        for (const ch of chListSave) {
            let echoCmd = `echo now downloading "${ch.name}"`;
            let cmdText = echoCmd + `\r\n` + `curl -L -A "Mozilla/5.0" --ssl-no-revoke "${ch.contentURL}" > "${propCurlType}Status_${ch.id}.txt"`;
            if (cmdTextAll === ``)
                cmdTextAll += cmdText;
            else
                cmdTextAll += `\r\n` + cmdText;
        }
        //downloadText(cmdTextAll, saveTextFile)
        this.propCurlZip.file(saveTextFile, cmdTextAll);
    }
    statusZipFile = ``;
    statusZip = new window.JSZip();
    stockToStatusZip(txtFile, parseStatus) {
        let jsonFile = txtFile;
        let jsonWithoutExt = ``;
        let pos = jsonFile.lastIndexOf(`.`);
        if (pos !== undefined) {
            jsonWithoutExt = txtFile.substring(0, pos);
            jsonFile = jsonWithoutExt + `.json`;
        }
        const jsonStr = JSON.stringify(parseStatus, null, 2);
        this.statusZip.file(jsonFile, jsonStr);
        console.log(`**stockToStatusZip**`, jsonFile);
        return jsonWithoutExt;
    }
    charHtmlZipFile = ``;
    charHtmlZip = new window.JSZip();
    stockToCharHtmlZip(txtFile, htmlContent) {
        let htmlFile = txtFile;
        let pos = htmlFile.lastIndexOf(`.`);
        if (pos !== undefined) {
            htmlFile = txtFile.substring(0, pos) + `.html`;
        }
        this.charHtmlZip.file(htmlFile, htmlContent);
        console.log(`**stockToCharHtmlZip**`, htmlFile);
    }
    saveCurlCmds(parseStatus, importer, ns) {
        const imgCurlTextFile = `${SiteImporter.prefixImgGetCmd}_${importer.chListMaker}_${ns}.txt`;
        this.makeImgCurlCmd(parseStatus, imgCurlTextFile);
        console.log(`saved char img cmd file : ${imgCurlTextFile}`);
        this.imgCurlZipFile = `${SiteImporter.prefixImgGetCmd}_${importer.chListMaker}.zip`;
        const propCurlType = `${importer.chListMaker}`;
        const propCurlTextFile = `${SiteImporter.prefixPropGetCmd}_${propCurlType}_${ns}.txt`;
        this.makePropCurlCmd(parseStatus, propCurlTextFile, propCurlType);
        console.log(`saved char status cmd file : ${propCurlTextFile}`);
        this.propCurlZipFile = `${SiteImporter.prefixPropGetCmd}_${propCurlType}.zip`;
    }
    charRisticWdFile = ``;
    async downloadStatus(filename) {
        // 2. ZIPファイルを生成
        const content = await this.statusZip.generateAsync({ type: "blob" });
        // 3. ダウンロード用のURLを生成
        const url = URL.createObjectURL(content);
        // 4. ダミーの<a>タグを作成してクリック
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        // 5. 後始末
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    async downloadJson(data, filename) {
        // 1. JSON文字列に変換
        const jsonStr = JSON.stringify(data, null, 2);
        // 2. Blobを作成
        const blob = new Blob([jsonStr], { type: 'application/json' });
        // 3. ダウンロード用のURLを生成
        const url = URL.createObjectURL(blob);
        // 4. ダミーの<a>タグを作成してクリック
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        // 5. 後始末
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    async downloadText(text, filename) {
        // 2. Blobを作成
        const blob = new Blob([text], { type: 'application/json' });
        // 3. ダウンロード用のURLを生成
        const url = URL.createObjectURL(blob);
        // 4. ダミーの<a>タグを作成してクリック
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        // 5. 後始末
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    async downloadCurl(zip, filename) {
        // 2. ZIPファイルを生成
        const content = await zip.generateAsync({ type: "blob" });
        // 3. ダウンロード用のURLを生成
        const url = URL.createObjectURL(content);
        // 4. ダミーの<a>タグを作成してクリック
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        // 5. 後始末
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    isAvailFiles(files) {
        let isOk = false;
        for (const file of files) {
            if (this.isAvailFile(file) === true)
                isOk = true;
        }
        return isOk;
    }
    async start(files) {
        this.files = files;
        this.remain = files.length;
        //キャラ一覧パースで１ファイル内に複数属性の場合の保存域
        let importerSingle = undefined;
        let parseStatusSingle = new Array;
        let checkChangeImporter = undefined;
        let checkChangeNsMap = new Map;
        for (const file of files) {
            this.remain--;
            console.log(file.name, file.type);
            if (this.isAvailFile(file) === false) {
                await this.checkDone();
                continue;
            }
            if (this.onProgress !== undefined) {
                await this.onProgress(file, files.length - this.remain, files.length);
            }
            switch (file.type) {
                case `application/x-zip-compressed`:
                    /*保留
                    reader.readAsArrayBuffer(file)
                    while (reader.readyState !== reader.DONE) {
                        await new Promise(res => setTimeout(res, 100))
                    }
                    */
                    break;
                case `text/html`:
                    //キャラ一覧HTML？
                    const htmlText = await file.text();
                    if (htmlText.trimStart().toUpperCase().startsWith(`<!DOCTYPE HTML`)) {
                        console.log(`htmlText loaded ${htmlText.length} length`);
                        for (const [gameType, importer] of ImporterMap) {
                            if (importer.parseHtml === undefined)
                                continue;
                            if (file.name.startsWith(importer.htmlMarker)) {
                                const ns = this.getNs(file.name, importer.htmlMarker);
                                if (ns !== CharNameSpaceTypes.None) {
                                    const parseStatus = await importer.parseHtml(htmlText, ns);
                                    this.saveCharJsonFile = `chListFile_${importer.chListMaker}.json`;
                                    const nsMapItem = nsMap.get(ns);
                                    if (nsMapItem !== undefined) {
                                        this.charStockArray[nsMapItem.seq] = parseStatus;
                                        const nsUrl = importer.nsURLs?.find(url => url.ns === ns);
                                        if (nsUrl !== undefined) {
                                            checkChangeImporter = importer;
                                            checkChangeNsMap.set(ns, nsUrl);
                                        }
                                    }
                                    let isSingle = false;
                                    for (const item of importer.nsURLs) {
                                        if (item.url === ``) {
                                            isSingle = true;
                                            break;
                                        }
                                    }
                                    if (isSingle) {
                                        //後で一括保存
                                        importerSingle = importer;
                                        parseStatusSingle = parseStatus;
                                    }
                                    else {
                                        this.saveCurlCmds(parseStatus, importer, ns);
                                    }
                                }
                            }
                        }
                    }
                    else {
                        console.log(`unsupported html loaded ${htmlText.length} length`);
                    }
                    await this.checkDone();
                    break;
                case `text/plain`:
                    //キャラ詳細ステータスファイル？
                    const statusText = await file.text();
                    if (statusText.trimStart().toUpperCase().startsWith(`<!DOCTYPE HTML`)) {
                        console.log(`statusText loaded ${statusText.length} length`);
                        for (const [gameType, importer] of ImporterMap) {
                            if (importer.parseStatus === undefined)
                                continue;
                            if (file.name.startsWith(importer.statusMaker)) {
                                const parseStatus = await importer.parseStatus(statusText);
                                if (parseStatus.length >= 1) {
                                    const jsonWithoutExt = this.stockToStatusZip(file.name, parseStatus);
                                    this.statusZipFile = importer.statusZip;
                                    const idText = jsonWithoutExt !== `` ? jsonWithoutExt.substring(importer.statusMaker.length) : ``;
                                    this.extractingRisticWordsInSkillText(importer, idText, parseStatus);
                                    this.charRisticWdFile = importer.charRisticWd;
                                }
                                /*不要なタグを取り除く（広告タグを取り除く） */
                                const env = new GameEnv;
                                const doc = await env.getDoc(statusText);
                                const pargeElems = doc.querySelectorAll("script, iframe, svg");
                                pargeElems.forEach(el => el.remove());
                                const checkElems = doc.querySelectorAll("script, iframe, svg");
                                if (checkElems.length === 0) {
                                    const htmlContent = new XMLSerializer().serializeToString(doc);
                                    this.stockToCharHtmlZip(file.name, htmlContent);
                                    this.charHtmlZipFile = importer.charHtmlZip;
                                }
                            }
                        }
                    }
                    else {
                        console.log(`unsupported text loaded ${statusText.length} length`);
                    }
                    await this.checkDone();
                    break;
            }
        }
        let saveArrayAll = new Array;
        for (const chList of this.charStockArray) {
            if (chList === undefined)
                continue;
            saveArrayAll = saveArrayAll.concat(chList);
        }
        console.log(saveArrayAll);
        let isSave = true;
        if (saveArrayAll.length > 0) {
            //更新確認
            if (checkChangeImporter !== undefined) {
                isSave = false;
                const gmInfo = ImporterLastUpdateMap.get(checkChangeImporter.gm);
                if (gmInfo !== undefined) {
                    for (const [ns, nsUrl] of checkChangeNsMap) {
                        if (nsUrl.lastUpdate === null)
                            continue;
                        const compSrc = gmInfo.nsMap.get(ns);
                        if (compSrc === undefined)
                            continue;
                        if (compSrc.checkChange(nsUrl.lastUpdate)) {
                            const res = compSrc.checkRes;
                            if (res === true)
                                isSave = true;
                        }
                    }
                    if (isSave) {
                        if (this.onCharListUpdate !== undefined) {
                            isSave = await this.onCharListUpdate();
                            if (isSave) {
                                for (const [ns, nsUrl] of checkChangeNsMap) {
                                    if (nsUrl.lastUpdate === null)
                                        continue;
                                    const compSrc = gmInfo.nsMap.get(ns);
                                    if (compSrc === undefined)
                                        continue;
                                    compSrc.lastUpdate = compSrc.changedDateTime;
                                }
                                gmInfo.saveUpdate();
                                console.log(`**saved lastUpdate**`, gmInfo);
                            }
                        }
                    }
                    else {
                        if (this.onCharListNotUpdate !== undefined) {
                            await this.onCharListNotUpdate();
                        }
                    }
                }
            }
            if (isSave) {
                //保存していい場合
                this.downloadJson(saveArrayAll, this.saveCharJsonFile);
                console.log(`saved char list file : ${this.saveCharJsonFile}`);
            }
        }
        if (isSave) {
            if (importerSingle !== undefined) {
                //キャラ一覧パースで１ファイル内に複数属性の場合にグループ毎にわける
                const importer = importerSingle;
                for (const item of importerSingle.nsURLs) {
                    const ns = item.ns;
                    const parseStatus = parseStatusSingle.filter(chi => chi.ns === ns);
                    if (parseStatus.length === 0) {
                        console.log(`parse status skip ${ns}`);
                        continue;
                    }
                    this.saveCurlCmds(parseStatus, importer, ns);
                }
            }
            //キャラ画像DLファイル保存？
            if (this.imgCurlZipFile !== ``) {
                await this.downloadCurl(this.imgCurlZip, this.imgCurlZipFile);
                console.log(`img-curl zip saved ${this.imgCurlZipFile}`);
            }
            //キャラ詳細(Html)DLファイル保存？
            if (this.propCurlZipFile !== ``) {
                await this.downloadCurl(this.propCurlZip, this.propCurlZipFile);
                console.log(`prop-curl zip saved ${this.propCurlZipFile}`);
            }
        }
        //キャラ詳細ステータスファイル保存？
        if (this.statusZipFile !== ``) {
            await this.downloadStatus(this.statusZipFile);
            console.log(`status zip saved ${this.statusZipFile}`);
        }
        //キャラ詳細(Html)ファイル保存？
        if (this.charHtmlZipFile !== ``) {
            await this.downloadCurl(this.charHtmlZip, this.charHtmlZipFile);
            console.log(`char-html zip saved ${this.charHtmlZipFile}`);
        }
        //キャラスキル保存？
        if (this.charRisticWdFile !== ``) {
            console.log(`**corrected**`, this.skillMap);
            this.purgeSkillMap();
            console.log(`**purged**`, this.skillMap);
            const obj = Object.fromEntries(this.skillMap);
            await this.downloadJson(obj, this.charRisticWdFile);
            console.log(`char-skill json saved ${this.charRisticWdFile}`);
        }
        return true;
    }
    skillMap = new Map;
    /**スキル文書内の特徴単語を抽出 */
    extractingRisticWordsInSkillText(importer, idText, parseStatus) {
        if (idText === ``) {
            console.log(`**id is empty**`);
            return;
        }
        const inst = importer.inst;
        const detailTable = inst.detailTable;
        const segh = new SegmenterHelper();
        for (const st of detailTable) {
            if (st.isSkill === false)
                continue;
            const key = st.key;
            const skillData = parseStatus.find(item => item.key === key);
            if (skillData === undefined)
                continue;
            const skillText = skillData.value;
            segh.decipheringContextJapaneseText(skillText);
            console.log(`**${idText}**`, segh.resMap);
            //console.log(segh.resMapCountSorted)
        }
        //const id = Number(idText)
        for (const [keyword, count] of segh.resMap) {
            let skillData = this.skillMap.get(keyword);
            if (skillData === undefined) {
                skillData = new CharSkillData();
                skillData.count = count;
                skillData.ids.push(idText);
                this.skillMap.set(keyword, skillData);
            }
            else {
                skillData.count += count;
                const exist = skillData.ids.find(ent => ent === idText);
                if (exist === undefined)
                    skillData.ids.push(idText);
            }
        }
    }
    /**出現数が多い特徴単語を除く */
    purgeSkillMap() {
        const purgeKeys = new Array;
        for (const [key, skillData] of this.skillMap) {
            if (skillData.ids.length >= 40) {
                purgeKeys.push(key);
            }
            else if (key.length <= 2) {
                purgeKeys.push(key);
            }
            else if (skillData.count === 1 || skillData.ids.length === 1) {
                //出現数=1、または、引用しているキャラ数=1
                if (SegmenterHelper.isKatakana2(key)) { }
                else if (SegmenterHelper.containsHiragana(key)) {
                    purgeKeys.push(key);
                }
            }
        }
        console.log(`**purged**`, purgeKeys);
        for (const pk of purgeKeys) {
            this.skillMap.delete(pk);
        }
    }
}
/** 実行時に使用する実体マップ（初期値は標準キー） */
const registeredCharStatusNames = { ...CharStatusNameTypes };
/** プラグイン等からスコアキー群を一括登録する関数 */
export function registerCharStatusNames(newTypes) {
    Object.assign(registeredCharStatusNames, newTypes);
}
/** 登録済みの全スコアキーを取得する関数（UIやパース処理用） */
export function getCharStatusNames() {
    return registeredCharStatusNames;
}
//# sourceMappingURL=SiteImporter.js.map
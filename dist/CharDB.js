import { GameEnv } from "./GameEnv.js";
import { CharStatusClassifyTypes, CharNameSpaceTypes } from "./CharClass.js";
import { CharLoader } from "./CharLoader.js";
import { CharSpecSet } from "./CharSpec.js";
import { ScoreConfigItem, ScoreConfigSet } from "./ScoreConfig.js";
import { TableEditSet, EditorTypes, ScoreEditSelectTypes } from "./TableEdit.js";
import { ConvertTools } from "./ConvertTools.js";
import { ServerTools } from './ServerTools.js';
/*
import { existFileNode, loadFileNode, saveTextNode } from "./nodeTools.js";
*/
/*キャライメージのZIP作成
*/
export async function makeImages(dataBasePath) {
    const charLoader = new CharLoader;
    //await charLoader.savePuyoData(dataBasePath)
    //await charLoader.saveMemeData(dataBasePath)
    //await charLoader.saveHouchiData(dataBasePath)
}
/*ぷよクエ詳細情報のZIP作成
*/
export async function makePuyoCharStatusDB(dataBasePath, chListFile) {
    const charLoader = new CharLoader;
    //const chListFile = `./User1/puyoQue.json`
    const charSpecList = new CharSpecSet();
    const chList = await charSpecList.LoadList(chListFile);
    //const dataBasePath = `../キャラパースデータ`
    const htmlBasePath = `${dataBasePath}/ぷよクエ_詳細HTML保存`;
    const jsonBasePath = `${dataBasePath}/ぷよクエ_詳細JSON`;
    const chRed = charSpecList.findByNs(CharNameSpaceTypes.CnsRed);
    const id = 119595;
    //const id = 119596
    //const id = 119658
    //const id = 465524
    //const id = 426125
    //const id = 661557
    //const id = 613874
    //const id = 631129
    //const id = 339742
    //const id = 694200
    //const id = 425335
    //const id = 135133
    //const id = 755737：これは未確認
    /*特定キャラの、詳細URLを取得してファイル保存
    const match = chList.chList.find(ch => ch.id === id);
    if (match) {
        console.log(`fetching ${match.name}(${id}) ...`)
        const html = await charLoader.getHtmlFromURL(match.contentURL)

        const statusFile = `${htmlBasePath}/puyoStatus_${id}.txt`
        saveTextNode(statusFile, html)
        console.log(`saved ${statusFile}`)
    }
    else {
        console.log(`cannot found chid ${id}`)
    }
    */
    /*全キャラの詳細URLを取得してファイル保存
    let successIndex = 0
    for (const ch of chList.chList) {
        try {
            successIndex++

            const statusFile = `${htmlBasePath}/puyoStatus_${ch.id}.txt`
            if (existFileNode(statusFile)) {
                console.log(`file checking ${ch.name}(${ch.id}) ...`)
                console.log(`-- exist(${successIndex}) ${statusFile}`)
            }
            else {
                console.log(`fetching ${ch.name}(${ch.id}) ...`)
                const html = await charLoader.getHtmlFromURL(ch.contentURL)

                saveTextNode(statusFile, html)
                console.log(`-- saved(${successIndex}) ${statusFile}`)
            }
        } catch (e) {
            console.error(`🚨 Error at ${ch.name}. Stopping to be safe.`);
            break; // エラー（403等）が出たら即座に中止
        }
    }
    if (successIndex === chList.chList.length) {
        console.log(`-- all success ${successIndex}`)
    }
    */
    /*範囲を指定して、キャラの詳細URLを取得してファイル保存
    const startIndex = 0
    const nSlice = 50
    let sucessIndex = startIndex
    const chSliceList = chList.chList.slice(startIndex, nSlice)
    for (const ch of chSliceList) {
        try {
            console.log(`fetching ${ch.name}(${ch.id}) ...`)
            const html = await charLoader.getHtmlFromURL(ch.contentURL)

            const statusFile = `${htmlBasePath}/puyoStatus_${ch.id}.txt`
            saveTextNode(statusFile, html)
            console.log(`saved ${statusFile}`)

            sucessIndex++
            console.log(`-- sucess ${sucessIndex}`)
        } catch (e) {
            console.error(`🚨 Error at ${ch.name}. Stopping to be safe.`);
            break; // エラー（403等）が出たら即座に中止
        }
    }
    if (sucessIndex === nSlice) {
        console.log(`-- all sucess ${sucessIndex}`)
    }
    */
    /*特定キャラの、ファイルからのパース
    const match = chList.chList.find(ch => ch.id === id);
    if (match) {
        const statusFile = `${htmlBasePath}/puyoStatus_${id}.txt`
        const readText = await loadFileNode(statusFile)
        if (readText === null) {
            console.log(`cannot read ${statusFile}`)
        }
        else {
            console.log(`parsing ${statusFile}`)
            await charLoader.parsePuyoInfoHtml(readText,
                parseArray => {}
            )
        }
    }
    */
    /*全キャラのファイルからのパース：nodeTools.js が必要
    let successIndex = 0
    for (const ch of chList.chList) {
        successIndex++

        const id = ch.id === null ? ch.idAsText : ch.id
        const statusJsonFile = `${jsonBasePath}/puyoStatus_${id}.json`
        if (existFileNode(statusJsonFile)) {
            console.log(`already ${statusJsonFile}`)
            continue
        }
        const statusFile = `${htmlBasePath}/puyoStatus_${id}.txt`
        const readText = await loadFileNode(statusFile)
        if (readText === null) {
            console.log(`cannot read ${statusFile}`)
        }
        else {
            console.log(`parsing ${statusFile}`)
            const saveArray = new Array<CharSaveStatusData>()
            const res = await charLoader.parsePuyoInfoHtml(readText,
                parseArray => {
                    for (const item of parseArray) {
                        if (item.need) {
                            if (item.value === ``) {
                                continue
                            }
                        }
                        else {
                            if (item.value === ``) {
                                continue
                            }
                        }
                        const saveItem = new CharSaveStatusData()
                        saveItem.disp = item.find
                        saveItem.key = item.key
                        saveItem.value = item.value
                        saveItem.useCombo = item.useCombo
                        saveArray.push(saveItem)
                    }
                }
            )
            if (saveArray.length >= 1) {
                const parseText = JSON.stringify(saveArray, null, 2)
                //console.log(`parsed ${parseText}`)
                saveTextNode(statusJsonFile, parseText)
                console.log(`-- saved(${successIndex}) ${statusJsonFile}`)
            }
        }
    }
    */
}
/*メメントモリ詳細情報のZIP作成
*/
export async function makeMemeCharStatusDB(dataBasePath, chListFile) {
    const charLoader = new CharLoader;
    //const chListFile = `./User1/memeMori.json`
    const charSpecList = new CharSpecSet();
    const chList = await charSpecList.LoadList(chListFile);
    //const dataBasePath = `../キャラパースデータ`
    const htmlBasePath = `${dataBasePath}/メメントモリ_詳細HTML保存`;
    const jsonBasePath = `${dataBasePath}/メメントモリ_詳細JSON`;
    const id = 47;
    //後処理（"x位/n位"の表記の場合に100倍）：必要なので消さないこと！
    function postProc(statusData) {
        for (const status of statusData) {
            if (status.useCombo)
                continue;
            //値に順位が含まれている場合100倍する
            let ratio = 1;
            let text = status.value;
            let pos = text.indexOf(`(`);
            if (pos >= 0) {
                text = status.value.substring(0, pos);
                ratio = 100;
            }
            //カンマを取り除く
            text = text.replace(/,/g, '');
            //変換結果設定
            status.converted = `${parseInt(text) * ratio}`;
        }
    }
    /*全キャラの詳細URLを取得してファイル保存
    let successIndex = 0
    for (const ch of chList.chList) {
        try {
            const id = ch.id === null ? ch.idAsText : ch.id

            const statusFile = `${htmlBasePath}/memeStatus_${id}.txt`
            if (existFileNode(statusFile)) {
                console.log(`already ${statusFile}`)
                continue
            }

            console.log(`fetching ${ch.name}(${id}) ...`)
            const html = await charLoader.getHtmlFromURL(ch.contentURL)

            saveTextNode(statusFile, html)
            console.log(`saved ${statusFile}`)

            successIndex++
            console.log(`-- success ${successIndex}`)
        } catch (e) {
            console.error(`🚨 Error at ${ch.name}. Stopping to be safe.`);
            break; // エラー（403等）が出たら即座に中止
        }
    }
    if (successIndex === chList.chList.length) {
        console.log(`-- all success ${successIndex}`)
    }
    */
    /*特定キャラのファイルからのパース
    const match = chList.chList.find(ch => ch.id === id);
    if (match) {
        const statusFile = `${htmlBasePath}/memeStatus_${id}.txt`
        const readText = await loadFileNode(statusFile)
        if (readText === null) {
            console.log(`cannot read ${statusFile}`)
        }
        else {
            console.log(`parsing ${statusFile}`)
            await charLoader.parseMemeInfoHtml(readText,
                parseArray => {}
            )
        }
    }
    */
    /*全キャラのファイルからのパース：nodeTools.js が必要
    let successIndex = 0
    for (const ch of chList.chList) {
        successIndex++

        const id = ch.id === null ? ch.idAsText : ch.id
        const statusJsonFile = `${jsonBasePath}/memeStatus_${id}.json`
        if (existFileNode(statusJsonFile)) {
            console.log(`already ${statusJsonFile}`)
            continue
        }
        const statusFile = `${htmlBasePath}/memeStatus_${id}.txt`
        const readText = await loadFileNode(statusFile)
        if (readText === null) {
            console.log(`cannot read ${statusFile}`)
        }
        else {
            console.log(`parsing ${statusFile}`)
            const saveArray = new Array<CharSaveStatusData>()
            const res = await charLoader.parseMemeInfoHtml(readText,
                parseArray => {
                    for (const item of parseArray) {
                        if (item.need) {
                            if (item.value === ``) {
                                continue
                            }
                        }
                        else {
                            if (item.value === ``) {
                                continue
                            }
                        }
                        const saveItem = new CharSaveStatusData()
                        saveItem.disp = item.find
                        saveItem.key = item.key
                        saveItem.value = item.value
                        saveItem.useCombo = item.useCombo
                        saveArray.push(saveItem)
                    }
                }
            )
            if (saveArray.length >= 1) {
                postProc(saveArray)

                const parseText = JSON.stringify(saveArray, null, 2)
                //console.log(`parsed ${parseText}`)
                saveTextNode(statusJsonFile, parseText)
                console.log(`-- saved(${successIndex}) ${statusJsonFile}`)
            }
        }
    }
    */
}
//詳細JSONファイルを圧縮しzip作成
/*
export async function zipDB(statusDir: string, zipPrefix: string) {
    const env = new GameEnv
    const toCharStatusZip = env.charStatusZip.substring(2) // "./"を取り除く
    //const statusDir = `../ぷよクエ_詳細JSON/`
    //const zipPrefix = `puyoQue_`
    const zipFile = `${zipPrefix}${toCharStatusZip}`

    let toZip: any = null
    if (env.isWebRunning) {
        toZip = new (window as any).JSZip();
    }
    else {
        const { createZipNode, loadFileNode } = await import(env.nodeToolsImportFilename)
        toZip = createZipNode();

        const { getFiles } = await import(env.nodeToolsImportFilename)
        const files = getFiles(statusDir, `.json`)
        for (const file of files) {
            const filePart = file.split(`/`)
            let fileName = filePart[filePart.length - 1]

            const json = await loadFileNode(`${statusDir}/${fileName}`)

            toZip.file(fileName, json);
        }

        const content = await toZip.generateAsync({ type: "nodebuffer" });

        const { saveZipNode } = await import(env.nodeToolsImportFilename)
        saveZipNode(zipFile, content);
    }
}
*/
/**キャラ詳細情報zipアクセス */
export class CharStatusDB {
    zip;
    fileNames = null;
    charSpecSet;
    auxScoreSet;
    async loadDB(toCharStatusZip) {
        const env = new GameEnv;
        const data = await env.loadBinFile(toCharStatusZip);
        if (env.isWebRunning)
            this.zip = await window.JSZip.loadAsync(data);
        else {
            //this.zip = await JSZip.loadAsync(data);
            const { loadZipNode } = await import(env.nodeToolsImportFilename);
            this.zip = await loadZipNode(data);
        }
        this.fileNames = Object.keys(this.zip.files);
        return true;
    }
    async enumStatus(callback) {
        if (this.fileNames === null)
            return;
        for (const file of this.fileNames) {
            const data = await this.getFileContent(file);
            if (data === null)
                continue;
            if (callback === undefined)
                continue;
            const isCont = callback(file, data);
            if (!isCont)
                break;
        }
    }
    async debugStatus() {
        await this.enumStatus((fileName, statusData) => {
            console.log(fileName, statusData);
            return true;
        });
    }
    async debugCombo() {
        await this.enumStatus((fileName, statusData) => {
            for (const item of statusData) {
                if (item.useCombo) {
                    console.log(`${fileName}:[${item.value}]`);
                }
            }
            return true;
        });
    }
    async loadAuxScoreSet(gameType) {
        const tableEditSet = new TableEditSet();
        await tableEditSet.load(EditorTypes.ScoreUI, gameType);
        const resScoreSet = new ScoreConfigSet();
        for (const tblItem of tableEditSet.itemList) {
            const scItem = tblItem.scItem;
            if (!tblItem.scItem.isScoreAvail)
                continue;
            //console.log(scItem)
            const newScItem = new ScoreConfigItem();
            newScItem.title = scItem.text; //combo選択のタイトル文字列
            newScItem.key = scItem.key; //combo選択の識別
            newScItem.available = false; //選択肢が有効か
            switch (scItem.selectType) {
                case ScoreEditSelectTypes.Sequence:
                    const start = this.auxScoreTextToValue(scItem.start);
                    const end = this.auxScoreTextToValue(scItem.end);
                    const step = this.auxScoreTextToValue(scItem.step);
                    const stepArray = new Array();
                    for (let val = start; val <= end; val += step) {
                        stepArray.push(`${val}/${val}`);
                    }
                    newScItem.selectionPair = stepArray; //combo選択肢：["Lv1/1", "Lv2/2"]
                    newScItem.selectedVal = `${start}`; //combo初期選択の値
                    newScItem.initScoreVal = start; //スコア計算の最小値
                    newScItem.mulScoreVal = step; //スコア計算の増分
                    newScItem.orgMaxVal = end; //元の最大値
                    if (stepArray.length >= 1) {
                        newScItem.available = false;
                    }
                    break;
                case ScoreEditSelectTypes.Text:
                    const textArray = scItem.keyValue.split(`,`);
                    let firstSelected = ``;
                    let index = -1;
                    for (const arr of textArray) {
                        index++;
                        const firstPair = arr.split(`/`);
                        if (firstPair.length >= 2) {
                            firstSelected = firstPair[1];
                            break;
                        }
                    }
                    newScItem.selectionPair = textArray; //combo選択肢：["Lv1/1", "Lv2/2"]
                    newScItem.selectedVal = firstSelected; //combo初期選択の値
                    newScItem.initScoreVal = 0; //スコア計算の最小値
                    newScItem.mulScoreVal = 0; //スコア計算の増分
                    if (textArray.length >= 1) {
                        newScItem.available = false;
                    }
                    break;
            }
            resScoreSet.items.push(newScItem);
        }
        //console.log(`loadAuxScoreSet`)
        //console.log(resScoreSet)
        this.auxScoreSet = resScoreSet;
        return resScoreSet;
    }
    auxScoreTextToValue(text) {
        const keyValue = text.split(`/`);
        const valueText = (keyValue.length === 1) ? keyValue[0] : keyValue[1];
        return parseInt(valueText);
    }
    //標準化した値を計算するかの設定
    static useStdConv = false;
    //標準化計算のための最小値
    minMap = new Map();
    //標準化計算のための最大値
    maxMap = new Map();
    //標準化計算のための範囲値（最小値～最大値）
    rangeMap = new Map();
    digLenMax = 0;
    nMul = 0;
    async getMinMax() {
        await this.enumStatus((fileName, statusData) => {
            for (const item of statusData) {
                if (item.useCombo)
                    continue;
                let num = parseInt(this.itemValue(item));
                if (!this.minMap.has(item.key))
                    this.minMap.set(item.key, num);
                else {
                    const now = this.minMap.get(item.key);
                    if (now === undefined)
                        this.minMap.set(item.key, num);
                    else if (now > num)
                        this.minMap.set(item.key, num);
                }
                if (!this.maxMap.has(item.key))
                    this.maxMap.set(item.key, num);
                else {
                    const now = this.maxMap.get(item.key);
                    if (now === undefined)
                        this.maxMap.set(item.key, num);
                    else if (now < num)
                        this.maxMap.set(item.key, num);
                }
            }
            return true;
        });
    }
    async getRanges() {
        await this.getMinMax();
        this.digLenMax = 0;
        for (const [key, value] of this.minMap) {
            const min = value;
            const max = this.maxMap.get(key);
            let range = 0;
            if (min !== undefined && max !== undefined) {
                range = max - min;
            }
            if (range <= 0)
                range = 1;
            this.rangeMap.set(key, range);
            if (max !== undefined) {
                const digLen = Math.log10(max);
                if (digLen > this.digLenMax)
                    this.digLenMax = digLen;
            }
        }
        this.nMul = this.digLenMax > 0 ? Math.pow(10, Math.ceil(this.digLenMax)) : 1;
        for (const [key, value] of this.minMap) {
            console.log(`[${key}] = ${this.minMap.get(key)},${this.maxMap.get(key)} ${this.rangeMap.get(key)}`);
        }
        console.log(`digLenMax=[${this.digLenMax}] nMul=[${this.nMul}]`);
    }
    stdBy(scKey, scValue) {
        let range = undefined;
        let min = undefined;
        if (this.rangeMap.has(scKey)) {
            range = this.rangeMap.get(scKey);
        }
        if (this.minMap.has(scKey)) {
            min = this.minMap.get(scKey);
        }
        if (range === undefined || min === undefined) {
            return null;
        }
        if (this.isNumeric(scValue) === false) {
            return null;
        }
        if (range <= 0)
            range = 1;
        const ratio = (parseInt(scValue) - min) * range;
        return this.nMul * ratio;
    }
    getChIdFrom(filename) {
        let pos = filename.indexOf(`_`);
        if (pos >= 0) {
            let idPart = filename.substring(pos + 1);
            pos = idPart.indexOf(`.`);
            if (pos >= 0) {
                idPart = idPart.substring(0, pos);
                return idPart;
            }
        }
        return "";
    }
    getFilename(chId) {
        /*
// 参考：正規表現を使ったパターン（もし今後コードをスッキリさせたくなったら）
const match = this.fileNames!.find(file => {
    const regex = new RegExp(`_${chId}\\.json$`); // "_ID.json" で終わるものを探す
    return regex.test(file);
});
        */
        let match = null;
        for (let file of this.fileNames) {
            /*
            let pos = file.indexOf(`_`)
            if (pos >= 0) {
                let idPart = file.substring(pos + 1)
                pos = idPart.indexOf(`.`)
                if (pos >= 0) {
                    idPart = idPart.substring(0, pos)
                }
                if (idPart === chId) {
                    match = file
                    break
                }
            }
            */
            const id = this.getChIdFrom(file);
            if (id === "")
                continue;
            if (id === chId) {
                match = file;
                break;
            }
        }
        return match;
    }
    async getFileContent(fileName) {
        if (fileName === null)
            return null;
        const jsonFile = this.zip.file(fileName);
        if (jsonFile) {
            const jsonText = await jsonFile.async("string");
            const resInst = JSON.parse(jsonText);
            //console.log(resInst)
            return resInst;
        }
        return null;
    }
    async getStatus(chId) {
        if (this.digLenMax === 0) {
            await this.getRanges();
        }
        const fileName = this.getFilename(chId);
        if (fileName === null)
            return null;
        const content = await this.getFileContent(fileName);
        if (content === null)
            return null;
        //ロール別ステータスを返すかの確認
        let roleInfo = null;
        for (const item of content) {
            if (item.useCombo)
                continue;
            for (const pri of this.rolePriolity) {
                const matchPri = pri.statusKey.find(key => key === item.key);
                if (matchPri) {
                    roleInfo = pri;
                    console.log(`find role : ${roleInfo.roleKey}`);
                    break;
                }
            }
            if (roleInfo !== null)
                break;
        }
        const scoreSet = new ScoreConfigSet();
        if (roleInfo !== null) {
            //優先ステータス値を返す
            for (const item of content) {
                if (item.useCombo)
                    continue;
                const matchPri = roleInfo.statusKey.find(key => key === item.key);
                if (matchPri) {
                    const matchSc = this.scoreTable.find(sc => sc.key === item.key);
                    if (matchSc) {
                        const initScoreVal = item.init === "" ? 0 : Number(item.init);
                        const saveItem = matchSc.scoreFunc(item.key, initScoreVal, this.itemValue(item));
                        saveItem.title = item.disp;
                        saveItem.key = item.key;
                        saveItem.selectedVal = `1`;
                        scoreSet.items.push(saveItem);
                    }
                }
            }
        }
        else {
            //全ステータス値を返す
            for (const item of content) {
                if (item.useCombo) {
                    continue;
                }
                const match = this.scoreTable.find(sc => sc.key === item.key);
                if (match) {
                    const initScoreVal = item.init === "" ? 0 : Number(item.init);
                    const saveItem = match.scoreFunc(item.key, initScoreVal, this.itemValue(item));
                    saveItem.title = item.disp;
                    saveItem.key = item.key;
                    saveItem.selectedVal = `1`;
                    scoreSet.items.push(saveItem);
                }
            }
        }
        const newScSet = new ScoreConfigSet;
        ScoreConfigSet.copy(this.auxScoreSet, newScSet, true);
        scoreSet.items = scoreSet.items.concat(newScSet.items);
        //const id = parseInt(chId)
        const id = chId;
        scoreSet.ns = this.charSpecSet.findNs(id);
        return scoreSet;
    }
    async getDetail(chId) {
        if (this.digLenMax === 0) {
            await this.getRanges();
        }
        const fileName = this.getFilename(chId);
        if (fileName === null)
            return null;
        const content = await this.getFileContent(fileName);
        if (content === null)
            return null;
        const scoreSet = new ScoreConfigSet();
        //全ステータス値を返す
        for (const item of content) {
            if (item.useCombo) {
                continue;
            }
            const match = this.detailTable.find(sc => sc.key === item.key);
            if (match) {
                const initScoreVal = item.init === "" ? 0 : Number(item.init);
                const saveItem = match.scoreFunc(item.key, initScoreVal, this.itemValue(item));
                saveItem.title = item.disp;
                saveItem.key = item.key;
                if (match.isSkill === false)
                    saveItem.selectedVal = `1`;
                saveItem.isSkill = match.isSkill;
                scoreSet.items.push(saveItem);
            }
        }
        const newScSet = new ScoreConfigSet;
        ScoreConfigSet.copy(this.auxScoreSet, newScSet, true);
        scoreSet.items = scoreSet.items.concat(newScSet.items);
        //const id = parseInt(chId)
        const id = chId;
        scoreSet.ns = this.charSpecSet.findNs(id);
        return scoreSet;
    }
    async getComboKeywords(chIds) {
        let nStock = 0;
        const comboMap = new Map;
        const kwMapAll = new Map;
        for (const chId of chIds) {
            const fileName = this.getFilename(chId);
            if (fileName === null)
                continue;
            const content = await this.getFileContent(fileName);
            if (content === null)
                continue;
            const kwMap = new Map;
            for (const item of content) {
                if (!item.useCombo)
                    continue;
                const keywords = item.value.split(`,`);
                for (const kw of keywords) {
                    if (kwMap.has(kw) === false)
                        kwMap.set(kw, 1);
                    else {
                        const n = kwMap.get(kw);
                        kwMap.set(kw, n + 1);
                    }
                }
            }
            if (kwMap.size === 0) {
                nStock = 0;
                kwMapAll.clear();
                continue;
            }
            for (const [kw, count] of kwMap) {
                if (kwMapAll.has(kw) === false)
                    kwMapAll.set(kw, count);
                else {
                    const n = kwMapAll.get(kw);
                    kwMapAll.set(kw, n + count);
                }
            }
            nStock++;
            if (nStock <= 2) {
                continue;
            }
            for (const [kw, count] of kwMapAll) {
                if (count >= 3) {
                    comboMap.set(kw, count);
                }
            }
        }
        return comboMap;
    }
    async getComboNameMap() {
        const idMap = new Map; //id, Array<comboName>
        const kwMap = new Map; //comboName, 出現数
        await this.enumStatus((fileName, statusData) => {
            const id = this.getChIdFrom(fileName);
            if (id === "")
                return true;
            let comboNames = new Array;
            for (const item of statusData) {
                if (item.useCombo) {
                    const keywords = item.value.split(`,`);
                    for (let kw of keywords) {
                        kw = kw.trim();
                        if (kwMap.has(kw) === false)
                            kwMap.set(kw, 1);
                        else {
                            const n = kwMap.get(kw);
                            kwMap.set(kw, n + 1);
                        }
                    }
                    comboNames = comboNames.concat(keywords);
                }
            }
            idMap.set(id, comboNames);
            return true;
        });
        console.log(`**getComboNameMap**`, idMap, kwMap);
        return [idMap, kwMap];
    }
    async getComparisonStatusList(chIds) {
        const charMap = new Map; //キャラ毎ステータスリスト
        const scoreKeyMap = new Map; //ステータス毎キャラID
        for (const chId of chIds) {
            if (charMap.has(chId))
                continue;
            const scs = await this.getDetail(chId);
            if (scs === null)
                continue;
            charMap.set(chId, scs);
            for (const sci of scs.items) {
                const exist = scoreKeyMap.get(sci.key);
                if (exist === undefined) {
                    const ids = new Array;
                    ids.push(chId);
                    scoreKeyMap.set(sci.key, ids);
                }
                else {
                    exist.push(chId);
                }
            }
        }
        //console.log(scoreKeyMap, charMap)
        const resMatrix = new Map; //ステータス毎キャラID配列
        for (const [scKey, ids] of scoreKeyMap) {
            const colIds = new Array;
            for (let i = 0; i < chIds.length; i++)
                colIds.push(undefined); //for `[NaN]`
            resMatrix.set(scKey, colIds);
        }
        for (const [scKey, ids] of scoreKeyMap) {
            const row = resMatrix.get(scKey);
            if (row === undefined)
                continue;
            for (let i = 0; i < chIds.length; i++) {
                const index = ids.findIndex(id => id === chIds[i]);
                if (index !== -1)
                    row[i] = ids[index];
            }
        }
        console.log(resMatrix);
        return [charMap, resMatrix];
    }
    isNumeric(value) {
        if (value.trim() === ``)
            return false;
        return !isNaN(Number(value));
    }
    itemValue(item) {
        const res = item.converted === `` ? item.value : item.converted;
        return res;
    }
    toScoreMaxNum(key, value) {
        if (this.isNumeric(value) === false) {
            return null;
        }
        if (CharStatusDB.useStdConv) {
            return this.stdBy(key, value);
        }
        let valueMax = value !== `` ? parseInt(value) : 1;
        return valueMax;
    }
    toScoreRateMaxNum(key, value) {
        const match1 = value.match(/(\d+)%/);
        const match2 = value.match(/(\d+)/);
        const match = match1 !== null ? match1 : match2;
        if (match) {
            return Number(match[1]);
        }
        return 0;
    }
    scoreFunc(valueMin, valueMax, stMax) {
        const scItem = new ScoreConfigItem();
        if (valueMin === null || valueMax === null) {
            return scItem;
        }
        const range = valueMax - valueMin;
        const rate = range / stMax;
        scItem.initScoreVal = valueMin;
        scItem.orgMaxVal = valueMax;
        scItem.mulScoreVal = rate;
        for (let lv = 1; lv <= stMax; lv++) {
            const lvValue = valueMin + Math.ceil(rate * (lv - 1));
            //console.log(`${rule.find} (${lv}) = ${lvValue}`)
            scItem.selectionPair.push(`Lv${lv}/${lv}`);
            /*
            if (lv === 1)
                scItem.initScoreVal = lvValue
            */
        }
        scItem.available = true;
        return scItem;
    }
    scoreTable = [];
    detailTable = [];
    rolePriolity = [];
}
export class CharStatusScoreTable {
    key = "";
    isSkill = false;
    scoreFunc;
}
export class CharRoleUsingStatus {
    roleKey = "";
    priority = CharRolePriolityTypes.priHi;
    statusKey = [];
}
export const CharRolePriolityTypes = {
    priHi: 0,
    priMid: 1,
    priLow: 2,
};
/**優先表示するコンビネーション(ぷよクエ用) */
const pqComboImp = [
    `こうげき・単体`,
    `かいふく・単体`,
    `バランス・単体`,
    `たいりょく・単体`,
    `たいりょく・全体`,
    `こうげき・全体`,
    `かいふく・全体`,
    `バランス`,
    `ボス`,
    `ボーイズ`, `ボーイズ.スピリッツ`,
    `ガールズ`, `ガールズ、トラベラー`, `スピリッツガールズ`,
    `初代メンバー`,
    `すずらん`,
    `魔導学校`, `魔道学校`,
    `蒸気都市`,
    `幾星学園`,
];
/**優先表示するコンビネーション */
const comboImportantMap = new Map([
    [CharStatusClassifyTypes.classPq, pqComboImp],
    [CharStatusClassifyTypes.classMM, []],
]);
/**コンビネーション名をソート : kwMap:getComboNameMap()の結果を想定 */
export function getSortedComboKeywords(gameType, kwMap) {
    function isIgnore(kw) {
        if (kw.trim().length === 0)
            return true;
        if (kw.includes(`※調査中`))
            return true;
        return false;
    }
    let res = new Array;
    const comboImp = comboImportantMap.get(gameType);
    if (comboImp === undefined) {
        for (const [key, count] of kwMap) {
            if (isIgnore(key))
                continue;
            res.push(key);
        }
        res = res.sort((a, b) => { return a.localeCompare(b); });
        console.log(`**getSortedComboKeywords**`, res);
        return res;
    }
    for (const [key, count] of kwMap) {
        if (comboImp.find(imp => imp === key))
            continue;
        if (isIgnore(key))
            continue;
        res.push(key);
    }
    res = res.sort((a, b) => { return a.localeCompare(b); });
    res = comboImp.concat(res);
    //console.log(`**getSortedComboKeywords**`, res)
    return res;
}
/**ソート済コンビネーション名を列に分ける : sortedKw:getSortedComboKeywords()の結果を想定 */
export function splitRowByComboSortedKw(sortedKw) {
    //横に表示できる文字数をあらかじめ決めておく・・・２４～２６くらい
    const rowKwArr = new Array;
    let colAllLen = 0;
    let colKwArr = undefined;
    for (const kw of sortedKw) {
        //console.log(kw, kw.length, [...kw].length)
        const kwLen = getVisualWidth(kw);
        if (colAllLen + kwLen > 24) {
            if (colKwArr !== undefined) {
                rowKwArr.push(colKwArr);
                colKwArr = undefined;
            }
        }
        if (colKwArr === undefined) {
            colKwArr = new Array;
            colAllLen = 0;
        }
        colKwArr.push(kw);
        colAllLen += kw.length;
    }
    if (colKwArr !== undefined) {
        rowKwArr.push(colKwArr);
        colKwArr = undefined;
    }
    console.log(`**splitRowByComboSortedKw**`, rowKwArr);
    return rowKwArr;
}
/**文字の見た目の幅（全角＝2、半角＝1）を計算する*/
function getVisualWidth(str) {
    let width = 0;
    for (const char of str) {
        // 半角英数・半角カナなどの範囲なら幅1、それ以外（全角）なら幅2
        if (char.match(/^[\x20-\x7e\uff61-\uff9f]$/)) {
            width += 1;
        }
        else {
            width += 2; // 全角文字
        }
    }
    return width;
}
/**キャラ詳細HTMLzipアクセス */
export class CharHtmlDB {
    zip;
    fileNames = null;
    loaded = false;
    async loadDB(toCharHtmlZip) {
        this.loaded = false;
        try {
            const env = new GameEnv;
            const data = await env.loadBinFile(toCharHtmlZip);
            if (env.isWebRunning)
                this.zip = await window.JSZip.loadAsync(data);
            else {
                //this.zip = await JSZip.loadAsync(data);
                const { loadZipNode } = await import(env.nodeToolsImportFilename);
                this.zip = await loadZipNode(data);
            }
            this.fileNames = Object.keys(this.zip.files);
            this.loaded = true;
        }
        catch (error) {
            console.error("[loadDB] load error:", error);
            return false;
        }
        return true;
    }
    getChIdFrom(filename) {
        let pos = filename.indexOf(`_`);
        if (pos >= 0) {
            let idPart = filename.substring(pos + 1);
            pos = idPart.indexOf(`.`);
            if (pos >= 0) {
                idPart = idPart.substring(0, pos);
                return idPart;
            }
        }
        return "";
    }
    getFilename(chId) {
        let match = null;
        for (let file of this.fileNames) {
            const id = this.getChIdFrom(file);
            if (id === "")
                continue;
            if (id === chId) {
                match = file;
                break;
            }
        }
        return match;
    }
    async getFileContent(fileName) {
        if (fileName === null)
            return null;
        const htmlFile = this.zip.file(fileName);
        if (htmlFile) {
            const htmlText = await htmlFile.async("string");
            //console.log(htmlText)
            return htmlText;
        }
        return null;
    }
    async getFileUrl(fileName) {
        const htmlText = await this.getFileContent(fileName);
        if (htmlText === null)
            return null;
        const blob = new Blob([htmlText], { type: 'text/html' });
        const blobUrl = URL.createObjectURL(blob);
        return blobUrl;
    }
    async openUrl(fileName) {
        /*これは無理っぽい
        const blobUrl = await this.getFileUrl(fileName)
        if (blobUrl === null) return false
        window.open(blobUrl, '_blank');
        */
        const newWindow = window.open("", "_blank");
        if (newWindow) {
            const htmlText = await this.getFileContent(fileName);
            if (htmlText === null) {
                console.log(`**openUrl**`, `not found ${fileName}`);
                return null;
            }
            // 2. 新しい窓のドキュメントを「今から書き込むぞ」と大開通させます
            newWindow.document.open();
            // 3. Zipから抜いたHTML文字列を、そのまま新しい窓の脳内に直接ド流し込み！！！
            newWindow.document.write(htmlText);
            // 4. 書き込み完了の法律を宣言します
            newWindow.document.close();
        }
        return true;
    }
}
/**単語のカテゴリ */
export const CharDbCodeTypes = {
    Unknown: "Unknown",
    Symbol: "Symbol",
    Hiragana: "Hiragana",
    Katakana: "Katakana",
    Kanji: "Kanji",
    Other: "Other",
};
/**単語のカテゴリ管理 */
export class CharDbCodeCategory {
    /**単語の先頭文字からカテゴリ（インデックス）を判定する関数 */
    static getWordCategory(word) {
        if (!word || word.length === 0)
            return CharDbCodeTypes.Other;
        const firstChar = word.charAt(0);
        // 1. ひらがな判定 (Unicode: \u3040-\u309F)
        if (/^[\u3040-\u309F]/.test(firstChar)) {
            return CharDbCodeTypes.Hiragana;
        }
        // 2. カタカナ判定 (Unicode: \u30A0-\u30FF)
        if (/^[\u30A0-\u30FF]/.test(firstChar)) {
            return CharDbCodeTypes.Katakana;
        }
        // 3. 漢字判定 (Unicode: CJK統合漢字 \u4E00-\u9FFF 等)
        if (/^[\u4E00-\u9FFF\u3400-\u4DBF]/.test(firstChar)) {
            return CharDbCodeTypes.Kanji;
        }
        // 4. それ以外（英数字や全角/半角記号）
        return CharDbCodeTypes.Symbol;
    }
    static displayTextMap = new Map([
        //[HtmlMakerCodeTypes.Unknown,  `不明`],
        [CharDbCodeTypes.Symbol, `記号`],
        [CharDbCodeTypes.Hiragana, `あ～ん`],
        [CharDbCodeTypes.Katakana, `ア～ン`],
        [CharDbCodeTypes.Kanji, `漢字`],
    ]);
    static idMap = new Map([
        [CharDbCodeTypes.Unknown, -1],
        [CharDbCodeTypes.Symbol, 0],
        [CharDbCodeTypes.Hiragana, 1],
        [CharDbCodeTypes.Katakana, 2],
        [CharDbCodeTypes.Kanji, 3],
    ]);
}
/**濁点同一視マップ */
const dakutenOrderMap = new Map([
    [`か`, `が`],
    [`き`, `ぎ`],
    [`く`, `ぐ`],
    [`け`, `げ`],
    [`こ`, `ご`],
    [`さ`, `ざ`],
    [`し`, `じ`],
    [`す`, `ず`],
    [`せ`, `ぜ`],
    [`そ`, `ぞ`],
    [`た`, `だ`],
    [`ち`, `ぢ`],
    [`つ`, `づ`],
    [`て`, `で`],
    [`と`, `ど`],
    [`は`, `ば`],
    [`ひ`, `び`],
    [`ふ`, `ぶ`],
    [`へ`, `べ`],
    [`ほ`, `ぼ`],
    [`ウ`, `ヴ`],
    [`カ`, `ガ`],
    [`キ`, `ギ`],
    [`ク`, `グ`],
    [`ケ`, `ゲ`],
    [`コ`, `ゴ`],
    [`サ`, `ザ`],
    [`シ`, `ジ`],
    [`ス`, `ズ`],
    [`セ`, `ゼ`],
    [`ソ`, `ゾ`],
    [`タ`, `ダ`],
    [`チ`, `ヂ`],
    [`ツ`, `ヅ`],
    [`テ`, `デ`],
    [`ト`, `ド`],
    [`ハ`, `バ`],
    [`ヒ`, `ビ`],
    [`フ`, `ブ`],
    [`ヘ`, `ベ`],
    [`ホ`, `ボ`],
]);
/**半濁点同一視マップ */
const handakutenOrderMap = new Map([
    [`は`, `ぱ`],
    [`ひ`, `ぴ`],
    [`ふ`, `ぷ`],
    [`へ`, `ぺ`],
    [`ほ`, `ぽ`],
    [`ば`, `ぱ`],
    [`び`, `ぴ`],
    [`ぶ`, `ぷ`],
    [`べ`, `ぺ`],
    [`ぼ`, `ぽ`],
    [`ハ`, `パ`],
    [`ヒ`, `ピ`],
    [`フ`, `プ`],
    [`ヘ`, `ペ`],
    [`ホ`, `ポ`],
    [`バ`, `パ`],
    [`ビ`, `ピ`],
    [`ブ`, `プ`],
    [`ベ`, `ペ`],
    [`ボ`, `ポ`],
]);
/**同一視する記号マップ */
const symIndicEquivMap = new Map([
    [`（`, `(`],
    [`［`, `[`],
    [`「`, `｢`],
    [`：`, `:`],
]);
/**キャラ特徴語DB(JSON)アクセス */
export class CharRisticDB {
    skillMap = new Map;
    loaded = false;
    rowIdsMap = new Map; //ソート前RowIndex,キャラIDs
    get rowIdsArray() { return Array.from(this.rowIdsMap.entries()); }
    appearsMap = new Map; //出現数,行インデックス
    idsMap = new Map; //キャラID,行インデックス
    async loadDB(jsonFile) {
        this.loaded = false;
        try {
            const env = new GameEnv;
            const data = await env.loadJson(jsonFile);
            const map = new Map(Object.entries(data));
            if (map.size === 0)
                return false;
            this.skillMap = map;
            this.loaded = true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
        return true;
    }
    appears() {
        if (this.appearsMap.size !== 0)
            return this.appearsMap;
        const map = new Map;
        let rowIndex = -1;
        for (const [key, data] of this.skillMap) {
            rowIndex++;
            const exist = map.get(data.count);
            if (exist === undefined) {
                const index = new Array;
                index.push(rowIndex);
                map.set(data.count, index);
            }
            else
                exist.push(rowIndex);
        }
        const sortedEntries = Array.from(map.entries()).sort((p1, p2) => {
            return p1[0] - p2[0];
        });
        const sortedMap = new Map(sortedEntries);
        this.appearsMap = sortedMap;
        return this.appearsMap;
    }
    ids() {
        if (this.idsMap.size !== 0)
            return this.idsMap;
        const map = new Map;
        let rowIndex = -1;
        for (const [key, data] of this.skillMap) {
            rowIndex++;
            const exist = map.get(data.ids.length);
            if (exist === undefined) {
                const index = new Array;
                index.push(rowIndex);
                map.set(data.ids.length, index);
            }
            else
                exist.push(rowIndex);
        }
        const sortedEntries = Array.from(map.entries()).sort((p1, p2) => {
            return p1[0] - p2[0];
        });
        const sortedMap = new Map(sortedEntries);
        this.idsMap = sortedMap;
        return this.idsMap;
    }
    sort(table, prefixClassName, sortClassNames, isAsc = true) {
        if (table === null)
            return null;
        if (sortClassNames.length === 0)
            return null;
        const tbody = table.tBodies[0] || table;
        const rows = Array.from(tbody.rows);
        if (rows.length <= 1)
            return null;
        // --- 【お父様式・超高速パージ法律】 ---
        // ソートが始まる前に、全行からソート用のデータを1回だけ引っこ抜いてメモリに格納する！
        let convKeyClassName = ``;
        let convKeyCount = 0;
        const sortDataItems = rows.map((row, index) => {
            let rawValue = "";
            for (const colName of sortClassNames) {
                const elem = row.getElementsByClassName(colName)[0];
                if (elem) {
                    rawValue = elem.textContent?.trim() || "";
                    convKeyClassName = colName;
                    break;
                }
            }
            //単語を「\\u0020→` `」の置き換える必要があるか
            if (rawValue.startsWith(`・`)) {
                let converted = rawValue.replace(/\\u0020/g, ' ');
                if (rawValue !== converted) {
                    const test = converted.substring(1);
                    if (ConvertTools.isAsciiConvetable(test)) {
                        console.log(`**converted(sort)**`, rawValue, converted);
                        rawValue = converted;
                        convKeyCount++;
                    }
                    else if (ConvertTools.isMorseCode(test)) {
                        console.log(`**converted(sort)**`, rawValue, converted);
                        rawValue = converted;
                        convKeyCount++;
                    }
                }
            }
            const containsNum = ConvertTools.containsNumeric(rawValue);
            return {
                rowIndex: index, // 元の行のインデックス（罠①を完全に防衛！）
                value: rawValue, // ソートに使う生データ（DOM探索はこれでもう終わり！）
                category: CharDbCodeCategory.getWordCategory(rawValue),
                numericInfo: ConvertTools.isNumericStarting(rawValue),
                containsNum: containsNum
            };
        });
        if (convKeyCount === 0)
            convKeyClassName = ``; //置き換えた単語がなかった
        // --- 【超高速ソート実行】 ---
        // ここではDOM探索は1ミリも発生しません！メモリ上のクリーンな配列を爆速でシャffleします！
        // カテゴリの優先度を数値化してソート
        const catMap = CharDbCodeCategory.idMap;
        /*
        sortDataItems.sort((a, b) => {
            const catAs = catMap.get(a.category)! // 0:記号, 1:あ～ん, 2:ア～ン, 3:漢字
            const catBs = catMap.get(b.category)!

            // カテゴリが違う場合は、カテゴリの順序を優先
            if (catAs !== catBs) {
                return isAsc ? catAs - catBs : catBs - catAs;
            }

            // 同じカテゴリ内なら localeCompare で自然に並べる
            return isAsc
                ? a.value.localeCompare(b.value, 'ja')
                : b.value.localeCompare(a.value, 'ja');
        });
        */
        // 1. 大量データ処理（19万行規模）で爆速化するため Collator インスタンスを生成
        const jaCollator = new Intl.Collator('ja', {
            //numeric: true,              // ★ ×5 と ×10 を数値として比較（×5 < ×10 にする）
            ignorePunctuation: false, // ★ カッコや記号の差分（半角/全角、記号の種類）も無視せず識別する
            sensitivity: 'accent' // ★ 濁点・半濁点・小文字（ぁ/あ）などの差分を厳密に区別してソートする！
        });
        sortDataItems.sort((a, b) => {
            const catAs = catMap.get(a.category); // 0:記号, 1:あ～ん, 2:ア～ン, 3:漢字
            const catBs = catMap.get(b.category);
            // カテゴリが違う場合は、カテゴリの順序を優先
            if (catAs !== catBs) {
                return isAsc ? catAs - catBs : catBs - catAs;
            }
            //数値比較可能かの場合
            const aN = a.numericInfo;
            const bN = b.numericInfo;
            if (aN.isNumeric && bN.isNumeric) {
                if (aN.firstChar === bN.firstChar) //先頭１文字が同じ場合、数値比較
                    return isAsc ? aN.value - bN.value : bN.value - aN.value;
            }
            //数値を含む比較可能かの場合
            const aCn = a.containsNum;
            const bCn = b.containsNum;
            if (aCn !== null && bCn !== null) {
                if (aCn.leadingText === bCn.leadingText) {
                    const numComp = isAsc ? aCn.numeric - bCn.numeric : bCn.numeric - aCn.numeric;
                    if (numComp)
                        return numComp;
                }
            }
            const aF = a.value.charAt(0);
            const bF = b.value.charAt(0);
            /*
            if ( (aF === `ウ` || aF === `ヴ`) && (bF === `ウ` || bF === `ヴ`) ) {
                const aFake = (aF === `ウ` ? 'A' : `B`) + a.value.substring(1)
                const bFake = (bF === `ウ` ? 'A' : `B`) + b.value.substring(1)
                return isAsc
                    ? jaCollator.compare(aFake, bFake)
                    : jaCollator.compare(bFake, aFake);
            }
            */
            const dMap = dakutenOrderMap;
            for (const [nKey, dKey] of dMap) {
                if ((aF === nKey || aF === dKey) && (bF === nKey || bF === dKey)) {
                    const aFake = (aF === nKey ? 'A' : `B`) + a.value.substring(1);
                    const bFake = (bF === nKey ? 'A' : `B`) + b.value.substring(1);
                    return isAsc
                        ? jaCollator.compare(aFake, bFake)
                        : jaCollator.compare(bFake, aFake);
                }
            }
            const hMap = handakutenOrderMap;
            for (const [nKey, dKey] of hMap) {
                if ((aF === nKey || aF === dKey) && (bF === nKey || bF === dKey)) {
                    const aFake = (aF === nKey ? 'A' : `B`) + a.value.substring(1);
                    const bFake = (bF === nKey ? 'A' : `B`) + b.value.substring(1);
                    return isAsc
                        ? jaCollator.compare(aFake, bFake)
                        : jaCollator.compare(bFake, aFake);
                }
            }
            // 同じカテゴリ内なら localeCompare で自然に並べる
            return isAsc
                ? jaCollator.compare(a.value, b.value)
                : jaCollator.compare(b.value, a.value);
        });
        //console.log(sortDataItems)
        // --- 【DOM物理再整列】 ---
        // ソート結果のインデックス順に、既存のtrをtbodyへガチャンとハメ直すだけ！
        for (const item of sortDataItems) {
            tbody.appendChild(rows[item.rowIndex]);
        }
        const skillArray = Array.from(this.skillMap.entries());
        const orgRowIdsMap = new Map;
        let catCur = CharDbCodeTypes.Unknown;
        let prefixCur = ``;
        const catStartRowMap = new Map;
        let rowIndex = -1;
        for (const row of tbody.rows) {
            rowIndex++;
            row.setAttribute("item-id", `${rowIndex + 1}`);
            const orgRowIndex = sortDataItems[rowIndex].rowIndex;
            if (orgRowIdsMap.has(orgRowIndex)) {
                console.log(`**duplicate orgRowIndex = ${orgRowIndex}**`);
            }
            else {
                const orgIds = skillArray[orgRowIndex][1].ids;
                orgRowIdsMap.set(orgRowIndex, orgIds);
            }
            const cat = sortDataItems[rowIndex].category;
            if (catCur !== cat) {
                catStartRowMap.set(cat, rowIndex);
                catCur = cat;
            }
            const elems = row.getElementsByClassName(prefixClassName);
            if (elems.length >= 1) {
                const span = elems[0];
                let prefix = span.textContent.charAt(0);
                prefix = this.symIndicatingEquiv(prefix);
                if (prefixCur === prefix) {
                    span.textContent = `　`;
                }
                else
                    prefixCur = prefix;
                row.dataset.prefix = prefix; //索引の再作成用に保持
            }
            if (convKeyClassName !== ``) {
                const elem = row.getElementsByClassName(convKeyClassName)[0];
                const rawValue = elem.textContent;
                if (rawValue.startsWith(`・`)) {
                    const converted = rawValue.replace(/\\u0020/g, ' ');
                    if (rawValue !== converted) {
                        const test = converted.substring(1);
                        if (ConvertTools.isAsciiConvetable(test)) {
                            console.log(`**converted(sorted)**`, rawValue, converted);
                            elem.textContent = converted;
                        }
                        else if (ConvertTools.isMorseCode(test)) {
                            console.log(`**converted(sorted)**`, rawValue, converted);
                            elem.textContent = converted;
                        }
                    }
                }
            }
        }
        console.log(catStartRowMap, orgRowIdsMap);
        this.rowIdsMap = orgRowIdsMap;
        return catStartRowMap;
    }
    async reindex(table, prefixClassName, visibleMap) {
        if (table === null)
            return null;
        let prefixCur = ``;
        for (const row of table.rows) {
            const rowindex = row.rowIndex;
            const visible = visibleMap.get(rowindex);
            if (visible === undefined)
                continue;
            row.style.display = visible ? `` : `none`;
            if (visible === false)
                continue;
            let prefix = row.dataset.prefix;
            if (prefix === undefined)
                continue;
            const tdCss = `.${prefixClassName}`;
            const elems = row.querySelectorAll(tdCss);
            if (elems.length === 0)
                continue;
            prefix = this.symIndicatingEquiv(prefix);
            const span = elems[0];
            if (prefixCur === prefix) {
                span.textContent = `　`;
            }
            else {
                span.textContent = prefix;
                prefixCur = prefix;
            }
        }
    }
    combine(srcWord, destWord, delWords) {
        if (srcWord === `` || destWord === ``)
            return false;
        const srcSkill = this.skillMap.get(srcWord);
        if (srcSkill === undefined)
            return false;
        console.log(`**src**`, srcWord, srcSkill);
        for (const delWd of delWords) {
            const delSkill = this.skillMap.get(delWd);
            if (delSkill === undefined)
                continue;
            console.log(`**del**`, delWd, delSkill);
            srcSkill.count += delSkill.count;
            srcSkill.ids = srcSkill.ids.concat(delSkill.ids);
            this.skillMap.delete(delWd);
        }
        this.skillMap.delete(srcWord);
        this.skillMap.set(destWord, srcSkill);
        console.log(`**combine**`, destWord, srcSkill);
        return true;
    }
    /**同一視する数値記号に変換 */
    symIndicatingEquiv(symbol) {
        const res = symIndicEquivMap.get(symbol);
        if (res === undefined) {
            const conv = ConvertTools.convNumZenToHan(symbol);
            return conv;
        }
        return res;
    }
    async save() {
        const skillArray = Array.from(this.skillMap.entries());
        const json = JSON.stringify({ skillArray: skillArray });
        console.log(`**save**`, json);
        const cmd = `save-skillmap`;
        await ServerTools.post(cmd, json);
    }
}
export class CharParseDebug {
    static debug = false;
}
/**キャラ一覧HTML解析結果 */
export class CharParseData {
    nRow = 0; // <tr>数
    name = ""; // "あかいパプリス"
    id = ""; // 134992
    rarity = ""; // "6","7"
    imageFileName = ""; // "show(5).png"
    contentURL = ""; // https://game8.jp/puyoque/135149
}
/**キャラ詳細HTML抽出結果 */
export class CharParseStatusData {
    hContent = ""; //hタグ内の検索文字列
    find = ""; //TABLEタグ内の検索文字列
    key = ""; //ステータス値の識別キー
    value = ""; //TABLEタグからの取得文字列
    need = true; //必要なステータス値か
    useCombo = false; //キャラ毎のスコア計算(=false)or編成スコア計算(=true)
}
/**キャラ詳細HTML解析結果 */
export class CharSaveStatusData {
    disp = ""; //表示用テキスト
    key = ""; //ステータス値の識別キー
    value = ""; //TABLEタグからの取得文字列
    init = ""; //valueの変換結果(初期値)
    converted = ""; //valueの変換結果(最大値)
    useCombo = false; //キャラ毎のスコア計算(=false)or編成スコア計算(=true)
}
/**スキル文解析結果 */
export class CharSkillData {
    count = 0; //出現数
    ids = new Array; //関連キャラID
}
/**文字列に濁点・半濁点（全角・半角）が含まれているか判定する */
/*
console.log(hasDakutenOrHandakuten("あいうえお")); // false
console.log(hasDakutenOrHandakuten("が"));         // true (全角濁点)
console.log(hasDakutenOrHandakuten("ぱ"));         // true (全角半濁点)
console.log(hasDakutenOrHandakuten("ｶﾞ"));        // true (半角濁点)
*/
function hasDakutenOrHandakuten(text) {
    // 1. 全角の濁音・半濁音を結合文字に分解 (例: "が" -> "か" + "\u3099")
    const normalized = text.normalize("NFD");
    // 2. 濁点・半濁点・半角カナ用濁点などを網羅した正規表現
    // \u3099: 結合用濁点, \u309A: 結合用半濁点
    // \u309B: 独立濁点, \u309C: 独立半濁点
    // \uFF9E: 半角濁点, \uFF9F: 半角半濁点
    const dakutenRegex = /[\u3099\u309A\u309B\u309C\uFF9E\uFF9F]/;
    return dakutenRegex.test(normalized);
}
/**文字列内のすべての濁点・半濁点を除去し、清音に変換する */
/*
console.log(removeDakuten("がんばる")); // "かんはる"
console.log(removeDakuten("ポテトチップス")); // "ホテトチツフス"
console.log(removeDakuten("ヴ")); // "ウ" (「ヴ」も「ウ」＋濁点なので変換されます)
console.log(removeDakuten("ｶﾞﾝﾊﾞﾙ")); // "ｶﾝﾊﾙ" (半角カナもそのまま清音になります)
*/
function removeDakuten(text) {
    // 1. 全角の濁音・半濁音を「ベース文字 ＋ 結合濁点/半濁点」に分解
    // 例: "が" -> "か" + "\u3099", "ぱ" -> "は" + "\u309A"
    const normalized = text.normalize("NFD");
    // 2. 結合用の濁点・半濁点、および半角カナの濁点・半濁点を空文字に置換して消去
    // \u3099: 結合用濁点, \u309A: 結合用半濁点
    // \uFF9E: 半角濁点, \uFF9F: 半角半濁点
    const cleaned = normalized.replace(/[\u3099\u309A\uFF9E\uFF9F]/g, "");
    // 3. 分解されていた文字を元の綺麗な状態（NFC形式）に復元して返す
    return cleaned.normalize("NFC");
}
function isConvDakuten(text) {
    return `ウかきくけこさしすせそたちつてとはひふへほ`.includes(text);
}
//# sourceMappingURL=CharDB.js.map
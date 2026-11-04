/*
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
*/
import { TableEditSet } from "./TableEdit.js";
import { BroadcastChannelHelper } from "./BroadcastChannelHelper.js";
import { getSettingAccessInstance } from "./JsStoreHelper.js";
import { ImporterMap } from "./SiteImporter.js";
import { ClipboardHelper } from "./ClipboardHelper.js";
import { CharStatusClassifyTypes, EnvUrlTypes, EnvWallpaperTypes, } from "./CharClass.js";
export const EvonaTypes = {
    None: "None",
    Full: "Full",
    Demo: "Demo",
    Limit: "Limit",
    NotRun: "NotRun",
};
export const EvonaBools = {
    Undef: "Undef",
    True: "True",
    False: "False",
};
export const EvonaActions = {
    None: "None",
    VideoPlay: "VideoPlay",
    YtPlay: "YtPlay",
};
export const EvonaComings = {
    Undef: "Undef",
    Qiita: "Qiita",
    Line: "Line",
};
/**ホームパス定義 */
export const UserHomes = {
    user1Home: "./User1/",
    user2Home: "./User2/",
    user3Home: "./User3/",
    user4Home: "./User4/",
    user5Home: "./User5/",
    user6Home: "./User6/",
};
export class GameEnv {
    qiitaRepository = `https://puyon7676.github.io/`;
    localRepository = `http://localhost:8000/`;
    qiitaImageRepository = `${this.qiitaRepository}GameImages/`;
    localImageRepository = `${this.localRepository}`;
    imageHome = "";
    currentUserHome = "";
    userHomePaths;
    appHref = ``; //アプリの起動元URL
    isLocal = false;
    action = EvonaActions.None; //機能へのショートカット
    admin = false; //アドミニストレータモード
    cmd = ``; //アドミニストレータモードのコマンド
    edit = CharStatusClassifyTypes.none; //エディタモード
    evonaType = EvonaTypes.None;
    aslocal = EvonaBools.Undef; //ネット・ローカル環境強制モード
    coming = EvonaComings.Undef; //経由URL指定
    dataBasePath = `../キャラパースデータ`;
    statusJsonPath = ``;
    chListFile = ``;
    chStatusListFile = ``;
    chHtmlListFile = ``;
    chRisticWdFile = ``;
    currentImporter;
    nodeToolsImportFilename = "./nodeTools.js";
    /**ImageHome初期化*/
    setImageHome(isLocal) {
        this.isLocal = isLocal;
        if (isLocal) {
            this.imageHome = `${this.currentUserHome}Image/`;
        }
        else {
            let userHome = this.currentUserHome;
            if (userHome.substring(0, 2) === `./`) {
                userHome = userHome.substring(2);
            }
            this.imageHome = `${this.qiitaImageRepository}${userHome}`;
        }
    }
    /**環境設定ロード内容をImageHomeへ反映*/
    applyImageHome() {
        //ローカル起動は反映しない
        //if (this.isLocal) return
        let userHome = this.currentUserHome;
        if (userHome.substring(0, 2) === `./`) {
            userHome = userHome.substring(2);
        }
        switch (this.envUrlType) {
            case EnvUrlTypes.Local:
                break; //反映なし
            case EnvUrlTypes.GitHub:
                this.imageHome = `${this.qiitaImageRepository}${userHome}`;
                break;
            case EnvUrlTypes.GitHubLocal:
                this.imageHome = `${this.localImageRepository}${userHome}Image/`;
                const charPath = `${this.localImageRepository}${userHome}`;
                this.chListFile = charPath + this.getLastPathPart(this.chListFile);
                this.chStatusListFile = charPath + this.getLastPathPart(this.chStatusListFile);
                this.chHtmlListFile = charPath + this.getLastPathPart(this.chHtmlListFile);
                this.chRisticWdFile = charPath + this.getLastPathPart(this.chRisticWdFile);
                break;
        }
    }
    getLastPathPart(fullpath) {
        if (fullpath.length === 0)
            return ``;
        const pathsplit = fullpath.split(`/`);
        if (pathsplit.length === 0)
            return ``;
        return pathsplit[pathsplit.length - 1];
    }
    async initDataPath(userHome) {
        await this.loadHomePathFromJson();
        await this.loadHomeSetting();
        let importer = undefined;
        for (const [key, uh] of this.userHomeMap) {
            if (uh === userHome) {
                importer = ImporterMap.get(key);
                break;
            }
        }
        this.setDataPath(importer, userHome);
        this.currentImporter = importer;
    }
    async loadHomePathFromJson() {
        const data = await this.loadJson(`./homePath.json`);
        const map = new Map(Object.entries(data));
        this.userHomePaths = new Map;
        for (const [k, v] of map) {
            this.userHomePaths.set(k, v);
        }
        console.log(`**loadHomePathFromJson::loaded**`, this.userHomePaths);
    }
    setDataPath(importer, userHome) {
        if (importer !== undefined) {
            //キャラ一覧
            this.chListFile = `${userHome}chListFile_${importer.chListMaker}.json`;
            //キャラ詳細情報
            this.chStatusListFile = `${userHome}${importer.statusZip}`;
            this.chHtmlListFile = `${userHome}${importer.charHtmlZip}`;
            this.chRisticWdFile = `${userHome}${importer.charRisticWd}`;
        }
    }
    /**ホームパス定義 */
    get userHomeMap() {
        /*
        return new Map<CharStatusClassify, UserHome>([
            [CharStatusClassifyTypes.classPq, UserHomes.user1Home],
            [CharStatusClassifyTypes.classMM, UserHomes.user2Home],
            [CharStatusClassifyTypes.classHS, UserHomes.user3Home],
            [CharStatusClassifyTypes.classUm, UserHomes.user4Home],
            [CharStatusClassifyTypes.classBa, UserHomes.user5Home],
            [CharStatusClassifyTypes.classFg, UserHomes.user6Home],
        ])
        */
        return this.userHomePaths;
    }
    /**ゲームタイプ設定*/
    set gameType(newType) {
        const importer = ImporterMap.get(newType);
        const userHome = this.userHomeMap.get(newType);
        if (importer !== undefined && userHome !== undefined) {
            this.currentUserHome = userHome;
            this.setDataPath(importer, this.currentUserHome);
            this.currentImporter = importer;
            console.log(`**[gameType changed]**`, importer);
        }
        else {
            console.log(`**[gameType fail]**`, newType);
        }
    }
    /**ゲームタイプ*/
    get gameType() {
        if (this.currentImporter !== undefined) {
            return this.currentImporter.gm;
        }
        return CharStatusClassifyTypes.none;
    }
    get gameTitle() {
        /*
        if (this.edit !== CharStatusClassifyTypes.none)
            return `エディタ(${this.edit})`
        if (this.currentImporter !== undefined) {
            return this.currentImporter.displayText
        }
        */
        if (this.currentImporter !== undefined) {
            if (this.edit !== CharStatusClassifyTypes.none) {
                return `エディタ(${this.currentImporter.displayText})`;
            }
            return this.currentImporter.displayText;
        }
        return `**Unknown::gameTitle**`;
    }
    setBrowserTitle() {
        const res = this.gameTitle;
        document.head.title = res;
        for (const elem of document.head.children) {
            if (elem.nodeName === `TITLE`) {
                elem.innerHTML = `EvoNa：${res} モード`;
            }
        }
        return res;
    }
    get editorURL() {
        return `${this.appHref}?edit=${this.gameType}`;
    }
    setEditorMode() {
        const homePath = this.userHomePaths.get(this.edit);
        if (homePath !== undefined) {
            const importer = ImporterMap.get(this.edit);
            if (importer !== undefined) {
                this.setDataPath(importer, homePath);
                this.currentUserHome = homePath;
                this.currentImporter = importer;
            }
        }
    }
    get isWebRunning() {
        if (typeof document === "undefined") {
            //console.log("please run web env!");
            return false;
        }
        return true;
    }
    parseURLParams() {
        if (!this.isWebRunning) {
            console.log(`cannot parse URL params!`);
            return;
        }
        const params = new URLSearchParams(window.location.search);
        for (const [key, value] of params) {
            switch (key.trim()) {
                case `debug`:
                    break;
                case `action`:
                    this.action = EvonaActions.None;
                    switch (value.trim()) {
                        case "videoPlay":
                            this.action = EvonaActions.VideoPlay;
                            break;
                        case "YtPlay":
                            this.action = EvonaActions.YtPlay;
                            break;
                    }
                    break;
                case `admin`:
                    this.admin = value.trim() === "true" ? true : false;
                    break;
                case `cmd`:
                    this.cmd = value;
                    break;
                case `edit`:
                    //this.edit = value.trim() === CharStatusClassifyTypes.classMM ? CharStatusClassifyTypes.classMM : CharStatusClassifyTypes.classPq
                    this.edit = value.trim();
                    break;
                case `aslocal`:
                    this.aslocal = value.trim() === "true" ? EvonaBools.True : EvonaBools.False;
                    break;
                case `coming`:
                    switch (value.trim()) {
                        case EvonaComings.Qiita:
                            this.coming = EvonaComings.Qiita;
                            break;
                        case EvonaComings.Line:
                            this.coming = EvonaComings.Line;
                            break;
                    }
                    break;
            }
        }
    }
    get availComing() {
        return this.coming !== EvonaComings.Undef;
    }
    async loadGameConfig(gameType) {
        const tableEditSet = new TableEditSet();
        const gameConfig = await tableEditSet.loadGameConfig(gameType);
        if (gameConfig !== undefined)
            return gameConfig;
        tableEditSet.setDefaultGameConfig();
        const match = tableEditSet.itemList.filter(item => item.gameItem.key === gameType);
        return match.length === 1 ? match[0].gameItem : undefined;
    }
    bc = new BroadcastChannelHelper();
    onGameConfigChanged;
    startBcHelper() {
        console.log(`startBcHelper`);
        this.bc.Start();
        this.bc.onNotify = this.onNotifyBcHelper;
    }
    stopBcHelper() {
        console.log(`stopBcHelper`);
        this.bc.Stop();
    }
    notifyGameConfigChanged() {
        console.log(`notifyGameConfigChanged`);
        this.bc.notifyBool(true);
    }
    onNotifyBcHelper = async (sender) => {
        console.log(`onNotifyBcHelper`);
        if (this.onGameConfigChanged !== undefined) {
            await this.onGameConfigChanged(sender);
        }
    };
    envUrlKey = `EnvUrlType`;
    envWallpaperKey = `EnvWallpaperType`;
    envUrlType = EnvUrlTypes.Local;
    envWallpaperType = EnvWallpaperTypes.WP1;
    async loadEnvSetting() {
        const settingAccess = await getSettingAccessInstance();
        const envPairs = await settingAccess.loadEnv();
        for (const pair of envPairs) {
            const [envKey, envValue] = pair.split(`=`);
            switch (envKey) {
                case this.envUrlKey:
                    this.envUrlType = envValue;
                    break;
                case this.envWallpaperKey:
                    this.envWallpaperType = envValue;
                    break;
            }
        }
    }
    async saveEnvSetting() {
        const pairs = new Array;
        pairs.push(`${this.envUrlKey}=${this.envUrlType}`);
        pairs.push(`${this.envWallpaperKey}=${this.envWallpaperType}`);
        const settingAccess = await getSettingAccessInstance();
        await settingAccess.saveEnv(pairs);
    }
    replaceWallpaper(png) {
        // ② さっき大開通した「キャッシュバスター（ミリ秒）」をケツにバインド！
        const version = Date.now();
        const wallpaperUrl = `./${png}?v=${version}`;
        // ③ document.body.style を使って、index.htmlに書いていた法律を直列で叩き落とす！！！
        const bodyStyle = document.body.style;
        bodyStyle.backgroundImage = `url('${wallpaperUrl}')`;
    }
    async loadHomeSetting() {
        const settingAccess = await getSettingAccessInstance();
        const homePairs = await settingAccess.loadHome();
        if (homePairs.length === 0)
            return;
        this.userHomePaths.clear();
        for (const pair of homePairs) {
            const [homeKey, homePath] = pair.split(`=`);
            this.userHomePaths.set(homeKey, homePath);
        }
        console.log(`**loadHomeSetting::overwrite indexedDB**`, this.userHomePaths);
    }
    async saveHomeSetting() {
        const pairs = new Array;
        for (const [key, path] of this.userHomePaths) {
            pairs.push(`${key}=${path}`);
        }
        const settingAccess = await getSettingAccessInstance();
        await settingAccess.saveHome(pairs);
    }
    homeSettingJsonMaker = `homeSetting:`;
    async putClipBoardHomeSetting(putMap) {
        const jsonText = JSON.stringify(Object.fromEntries(putMap), null, 2);
        await ClipboardHelper.put(this.homeSettingJsonMaker + jsonText);
    }
    async getClipBoardHomeSetting() {
        let jsonText = await ClipboardHelper.get();
        if (jsonText === null)
            return false;
        if (jsonText.startsWith(this.homeSettingJsonMaker) === false)
            return;
        jsonText = jsonText.substring(this.homeSettingJsonMaker.length);
        const resInst = new Map(Object.entries(JSON.parse(jsonText)));
        if (resInst.size === 0)
            return false;
        this.userHomePaths = resInst;
        return true;
    }
    async loadJson(file) {
        console.log(`[loadJson] file=[${file}]`);
        return await this._loadJson(file);
    }
    async _loadJson(file) {
        if (this.isWebRunning) {
            const response = await fetch(file, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`HTTPエラー! ステータス: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        else {
            /*
            const data = await import(file, { with: { type: 'json' } });
            return data.default
            */
            const { loadJsonNode } = await import(this.nodeToolsImportFilename);
            return loadJsonNode(file);
        }
    }
    async saveJson(file, inst) {
        const json = JSON.stringify(inst);
        if (this.isWebRunning) {
            const blob = new Blob([json], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = file;
            a.click();
        }
        else {
            /*
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);

            // dist/User1/file.json に書き込む
            const pathToWrite = join(__dirname, file);

            writeFileSync(pathToWrite, json);
            */
            const { saveJsonNode } = await import(this.nodeToolsImportFilename);
            return saveJsonNode(file, inst);
        }
    }
    async loadBinFile(file) {
        if (this.isWebRunning) {
            const resp = await fetch(file, { cache: 'no-store' });
            const blob = await resp.blob();
            return blob;
        }
        else {
            const { readBinNode } = await import(this.nodeToolsImportFilename);
            return readBinNode(file);
        }
    }
    async getDoc(htmlText) {
        let parser;
        let doc;
        if (this.isWebRunning) {
            parser = new DOMParser();
            doc = parser.parseFromString(htmlText, "text/html");
        }
        else {
            const { createHtmlParserNode } = await import(this.nodeToolsImportFilename);
            parser = createHtmlParserNode(htmlText);
            doc = parser.parseFromString(htmlText, "text/html");
        }
        //↓：Node.jsで必要
        /*
        //const dom = new JSDOM(htmlText);
        const dom = new JSDOM(tableHtml, {
            resources: "usable", // リソースの扱いを指定
            // もしスタイルで落ちるなら、そもそも解釈させないように以下の設定を確認
            runScripts: "outside-only"
        });
        const { DOMParser } = dom.window;
        */
        //↑：Node.jsで必要
        /*
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");
        */
        return doc;
    }
}
export class RebootGame {
    static selectedGameKey = `selectedGame`;
    static get gameType() {
        const savedGame = sessionStorage.getItem(RebootGame.selectedGameKey);
        if (savedGame === null)
            return CharStatusClassifyTypes.classPq;
        return savedGame;
    }
    static set gameType(gm) {
        sessionStorage.setItem(RebootGame.selectedGameKey, gm);
    }
    static removeGameType() {
        sessionStorage.removeItem(RebootGame.selectedGameKey);
    }
    static reboot() {
        //A. 通常のリロード（キャッシュを利用）
        //location.reload();
        //B. 同一URLへ再遷移させる（履歴を残さないリロード）
        location.replace(location.href);
        //C. パラメータやハッシュを維持・クリアして再読込
        // 例：フォームの送信状態や検索パラメータをリセットしてTOP状態に戻したい時
        //location.href = location.pathname;
    }
}
//# sourceMappingURL=GameEnv.js.map
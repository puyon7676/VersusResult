import { GameEnv, EvonaBools } from "./GameEnv.js";
import { EvonaTypes } from "./GameEnv.js";
import { ClipboardHelper } from "./ClipboardHelper.js";
import { bootstrapPlugins, initImportersLastUpdate } from "./SiteImporter.js";
//import { EvonaMessageBox, MessageBoxResultTypes } from "./MessageBox.js"
//環境初期化
const env = new GameEnv;
const isWebRunning = env.isWebRunning;
let isLocal = true;
//起動元判定
if (isWebRunning) {
    setWallpaper();
    env.parseURLParams();
    //env.setUser(UserHomes.user3Home)
    //ローカル起動か・Web起動か
    superMain();
    isLocal = window.EVONA_CONFIG.isLocal || window.EVONA_CONFIG.isElectron;
    //強制的にローカルとみなすか
    if (env.aslocal !== EvonaBools.Undef)
        isLocal = env.aslocal === EvonaBools.True ? true : false;
    //アプリ起動URLを保持
    env.appHref = window.location.href;
}
//プラグインロード
await bootstrapPlugins();
//更新日時テーブル初期化
await initImportersLastUpdate();
await env.initDataPath(env.currentUserHome);
ClipboardHelper.encodeEnable = !isLocal;
env.setImageHome(isLocal);
//env.setImageHome(false)
console.log(`**main()**`, env);
const canActivateApp = isComingQiita(isLocal) || env.availComing;
//const canActivateApp = isComingQiita(false)
const currentUserHome = env.currentUserHome;
//import { getSettingAccessInstance, getLogAccessInstance } from "./JsStoreHelper.js"
import { mainAdmin } from "./mainAdmin.js";
import { mainNormal, mainNormalInit, mainNormalInitToolTipMgr } from "./mainNormal.js";
import { mainEditor } from "./mainResource.js";
import { CharStatusClassifyTypes } from "./CharClass.js";
switch (env.admin) {
    case true:
        await mainAdmin(env);
        break;
    case false:
        if (isWebRunning) {
            if (env.edit === CharStatusClassifyTypes.none) {
                await mainNormalInitToolTipMgr();
                await mainNormalInit(env, isLocal, canActivateApp);
                switch (env.evonaType) {
                    case EvonaTypes.Full:
                        window.EVONA_CONFIG.demo = false;
                        await mainNormal(env);
                        break;
                    case EvonaTypes.Limit:
                        window.EVONA_CONFIG.demo = true;
                        await mainNormal(env);
                        break;
                }
            }
            else {
                env.setEditorMode();
                const title = env.setBrowserTitle();
                await mainEditor(env);
            }
        }
        break;
}
function superMain() {
    // 1. 今の場所が「Electron」かどうかを判定
    const isElectron = window.location.protocol === "file:";
    // 1. 今の場所が「自分のPC（開発環境）」かどうかを判定
    const isLocal = window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname.startsWith("192.168."); // iPadからPCを見る時用
    // 2. 読み込むファイルの「住所」を振り分ける
    const jszipSrc = isLocal ?
        "./jszip_dist/jszip.min.js" :
        "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js";
    const jsstoreSrc = isLocal ?
        "./jsstore_dist/jsstore.min.js" :
        "https://cdn.jsdelivr.net/npm/jsstore/dist/jsstore.min.js";
    // 後で main.js から見れるように、window（グローバル）に覚えさせる
    window.EVONA_CONFIG = {
        isLocal: isLocal,
        isElectron: isElectron,
        workerFile: isLocal || isElectron ?
            "./jsstore_dist/jsstore.worker.min.js" :
            //"https://cdn.jsdelivr.net/npm/jsstore/dist/jsstore.worker.min.js"
            "./jsstore_dist/jsstore.worker.min.js",
        demo: isLocal || isElectron ? false : true
    };
    // 3. 順番通りに「粛々と」読み込ませる関数
    function injectScript(src, isModule = false) {
        const s = document.createElement('script');
        s.src = src;
        if (isModule)
            s.type = "module";
        s.async = false; // これをfalseにすることで、上の行から順番に読み込まれます
        document.head.appendChild(s);
    }
    // 実行（JSZip -> JsStore の順で読み込み）
    injectScript(jszipSrc);
    injectScript(jsstoreSrc);
}
function isComingQiita(isLocal) {
    if (isLocal)
        return true;
    const ref = document.referrer;
    console.log(`${ref}`);
    const key = "evona_auth";
    const value = "granted";
    if (sessionStorage.getItem(key) === value) {
        return true;
    }
    if (ref.includes("qiita.com")) {
        sessionStorage.setItem(key, value);
        return true;
    }
    return false;
}
function setWallpaper() {
    // ① アプリ開始タイミングで、IndexedDBや復元された設定から壁紙名を取得する法律
    // （もしデータが空なら、デフォルトの 'wallpaper.png' を一本釣り！）
    const currentWallpaper = /*currentSettings.backgroundImage ||*/ 'wallpaper.png';
    // ② さっき大開通した「キャッシュバスター（ミリ秒）」をケツにバインド！
    const version = Date.now();
    const wallpaperUrl = `./${currentWallpaper}?v=${version}`;
    // ③ document.body.style を使って、index.htmlに書いていた法律を直列で叩き落とす！！！
    const bodyStyle = document.body.style;
    bodyStyle.backgroundImage = `url('${wallpaperUrl}')`;
    bodyStyle.backgroundAttachment = 'fixed';
    bodyStyle.backgroundSize = 'cover';
    bodyStyle.backgroundPosition = 'center';
    // 暗幕テクニック（色とブレンドモード）もTypeScriptの手癖で完全コントロール！
    bodyStyle.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    bodyStyle.backgroundBlendMode = 'darken';
}
//# sourceMappingURL=main.js.map
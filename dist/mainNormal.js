import { RebootGame } from "./GameEnv.js";
import { EvonaTypes, EvonaActions } from "./GameEnv.js";
import { getSettingAccessInstance, getLogAccessInstance } from "./JsStoreHelper.js";
import { CharStatusClassifyTypes, CharNameSpaceTypes, EnvUrlMap, EnvUrlTypes, EnvWallpaperMap, AutoScoreTypes, BoostMap, BoostTypes } from "./CharClass.js";
import { ImageLoader } from "./ImageLoader.js";
import { CharStatusDB, getSortedComboKeywords, splitRowByComboSortedKw } from "./CharDB.js";
import { CharHtmlDB, CharRisticDB } from "./CharDB.js";
import { DockSet, DockItem, DockSetJson } from "./DockLaucher.js";
import { CharSpecList, CharSpecSet, CharSpecItem } from "./CharSpec.js";
import { CharSummary, CharSummaryActionReq } from "./CharSummary.js";
import { FormationMake, FormationSetJson } from "./FormationMake.js";
import { HtmlMaker, HtmlZindexHelper, HtmlMakerDialogDesc, HtmlMakerCopyPasteTypes } from "./HtmlMaker.js";
import { HtmlMakerOptionRadio, HtmlMakerOptionInput } from "./HtmlMaker.js";
import { HtmlMakerToolTipReqTypes, HtmlMakerToolTipMgr, HtmlMakerToolTipCloseTypes, HtmlMakerToolTipMgrTypes } from "./HtmlMaker.js";
import { HtmlMakerDialogB2Types } from "./HtmlMaker.js";
import { HtmlMakerTable } from "./HtmlMaker.js";
import { HtmlMakerChoiceItem, HtmlMakerChoice, HtmlMakerChoiceTwinModes, HtmlMakerChoiceHeaderModes } from "./HtmlMaker.js";
import { HtmlMakerCommonCss, HtmlMakerMisc } from "./HtmlMaker.js";
import { EvonaMessageBox, MessageBoxResultTypes } from "./MessageBox.js";
import { DragDropHelper } from "./HtmlMaker.js";
import { FileSelect } from "./HtmlMaker.js";
import { ClipboardHelper } from "./ClipboardHelper.js";
import { FilterOption } from "./FilterOption.js";
import { RisticWords } from "./RisticWords.js";
import { VersusScoreItemProp, VersusScoreItem, VersusGroupRow, VersusResult, } from "./VersusResult.js";
import { CombatResultPair, CombatResult, CombatFormationTypes, CombatLevelTypes, CombatComboTypes, CombatResultItem, } from "./CombatResult.js";
import { SiteImporter, ImporterMap } from "./SiteImporter.js";
//import { experiment05 } from "./SegmenterHelper.js"
//import { sortEx05 } from "./CharDB.js"
//import { fullscreenScreensaver } from "./Screensaver.js"
import { ytInfos, ytInfo, convYtUrlPrefix } from "./YoutubeInfos.js";
export const LoadedResultTypes = {
    Unknown: "Unknown",
    Success: "Success",
    Fail: "Fail",
    Cancel: "Cancel",
};
/**ツーチップ一覧UI生成 */
export async function mainNormalInitToolTipMgr() {
    const title = "ツールチップ一覧";
    const html = HtmlMakerToolTipMgr.toHTML();
    const dlg = HtmlMakerToolTipMgr.createMgrBox(title, html);
    HtmlMakerToolTipMgr.uiInfo.left = "400";
    HtmlMakerToolTipMgr.uiInfo.top = "100";
    HtmlMakerToolTipMgr.applyCss();
    dlg.show();
    dlg.parentElement.style.zIndex = `${HtmlZindexHelper.ignoreIndex + 1}`;
    //dlg.parentElement!.hidden = false
    HtmlMakerToolTipMgr.enableEvents();
}
/**ゲーム選択UI生成 */
export async function initGameSelectToolTip() {
    let gameSelectToolTip = null;
    let resolver;
    //ゲーム選択UI（ツールチップUIで作成）
    const gameSelectTipTitle = "ゲーム選択";
    let gameSelected = RebootGame.gameType; //CharStatusClassifyTypes.classPq
    const gameSelectFormName = "dockForm";
    const onGameSelectChanged = async function (classify, selectedKey, selectedValue, changed, rowIndex) {
        console.log(`onGameSelectChanged::radio`, classify, selectedKey, selectedValue);
        switch (classify) {
            case `gameSelectUI-opt-game`:
                gameSelected = selectedKey;
                if (gameSelectToolTip !== null)
                    gameSelectToolTip.SetVisible(false);
                if (resolver)
                    resolver(gameSelected);
                break;
        }
    };
    function makeGemeSelectTable() {
        //表示行数
        const importerList = Array.from(ImporterMap.entries());
        const nGame = ImporterMap.size;
        let nGameInRow = 4;
        let nRowGame = Math.floor(nGame / nGameInRow);
        if (((nGame % nGameInRow) !== 0))
            nRowGame++;
        //テーブル作成
        const nCol = 2;
        const table = new HtmlMakerTable();
        table.makeDim(nCol, 1 + nGame);
        //カラム定義
        let title1 = `🛸`;
        let manual1 = `「処理対象ゲーム」を選択してください`;
        setTableRowLabel(0, 0, title1, manual1, table, gameSelectTitleCssClassName(), gameSelectTitleCssClassName());
        //
        let iGmIndex = -1;
        for (let iRowGm = 0; iRowGm < nRowGame; iRowGm++) {
            let gmPairs = new Array;
            let nRemain = nGameInRow;
            for (let iGm = 0; iGm < nRemain; iGm++) {
                iGmIndex++;
                if (iGmIndex >= nGame)
                    break;
                const gameType = importerList[iGmIndex][0];
                const importer = importerList[iGmIndex][1];
                gmPairs.push(`${[importer.displayText]}/${gameType}`);
            }
            const gameOpt = new HtmlMakerOptionRadio();
            gameOpt.selectionPair = gmPairs;
            gameOpt.selectedItem = gameSelected;
            gameOpt.classify = `gameSelectUI-opt-game`;
            setTableRowRadio(0, 1 + iRowGm, `　`, gameOpt, table, gameSelectTitleCssClassName(), gameSelectCssClassName());
        }
        //行テンプレート初期化
        table.makeRowTemplate(tableRowCssClassName());
        return table;
    }
    function tableRowCssClassName() {
        return `${gameSelectFormName}-row`;
    }
    function gameSelectTitleCssClassName() {
        return `${gameSelectFormName}-title`;
    }
    function gameSelectCssClassName() {
        return `${gameSelectFormName}-select`;
    }
    function gameSelectCssText() {
        const siteGame = gameSelectCssClassName();
        const marker = HtmlMakerCommonCss.radioBackClassMark;
        const activeKeyText = HtmlMakerCommonCss.radioActiveKeyText;
        return `
/* 「ゲーム選択」の箱（td、またはその中のdivコンテナ） */
[id*="${siteGame}${marker}"] {
${HtmlMakerCommonCss.radioBackCssText}
width: 92%;        /* 親のツールチップの幅いっぱいに広げる */
}
/* 「ゲーム選択」の選択肢（div）それぞれの法律 */
[id*="${siteGame}"] {
${HtmlMakerCommonCss.radioNormCssText}
}
/* 「ゲーム選択」現在選択されているアイテム（selectedItem = '1' など）が光る法律 */
[id*="${siteGame}"].${activeKeyText} {
${HtmlMakerCommonCss.radioActCssText}
}

`.trim();
    }
    async function makeGameSelectToolTip() {
        const toolTipName = HtmlMakerToolTipMgr.MakeUniqueName(gameSelectFormName, `gameUI`);
        const toolTipFind = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipFind !== null)
            return null;
        HtmlMakerToolTipMgr.Add(toolTipName, HtmlMakerToolTipCloseTypes.None);
        const toolTipNew = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipNew !== null) {
            const uiLabelText = gameSelectTipTitle;
            const table = await makeGemeSelectTable();
            toolTipNew.name = toolTipName;
            toolTipNew.InvisibleAll();
            toolTipNew.SetTitle(uiLabelText + ``);
            toolTipNew.SetTable(table, gameSelectCssText());
            toolTipNew.onChangedTableSelection = onGameSelectChanged;
            toolTipNew.MgrType = HtmlMakerToolTipMgrTypes.NotMgr;
            toolTipNew.heightPx = `200`;
            toolTipNew.applyCss();
            toolTipNew.Show(document.body);
            toolTipNew.SetVisible(true);
            toolTipNew.EnableEvents();
            gameSelectToolTip = toolTipNew;
        }
        return toolTipNew;
    }
    return new Promise((resolve) => {
        resolver = resolve;
        const gameSelectToolTip = makeGameSelectToolTip();
        if (gameSelectToolTip !== null) {
            //dockUI.envSiteZipToolTip = gameSelectToolTip    //""タップしたときに閉じる対象のツールチップUI
        }
    });
}
/**選択したゲームによる初期設定 */
export async function mainNormalInit(env, isLocal, canActivateApp) {
    if (env.action !== EvonaActions.None) {
        env.gameType = CharStatusClassifyTypes.classMM;
        env.setImageHome(isLocal);
        env.evonaType = EvonaTypes.Limit;
        return;
    }
    const gameSelected = await initGameSelectToolTip();
    RebootGame.removeGameType();
    env.gameType = gameSelected;
    env.setImageHome(isLocal);
    let cleanMode = false;
    let secretMode = false;
    //MessageBox初期化
    const msgbox = new EvonaMessageBox;
    msgbox.CheckVisible = true;
    msgbox.CheckText = `位置情報を初期化`;
    msgbox.SecretEnable = true;
    const title = env.setBrowserTitle();
    const res = await msgbox.showWait(`「${title} 」モードで起動します`);
    if (res === MessageBoxResultTypes.Secret)
        secretMode = true;
    cleanMode = msgbox.Checked;
    //console.log(`secretMode=[${secretMode}]`)
    //console.log(`cleanMode=[${cleanMode}]`)
    let evonaType = EvonaTypes.None;
    if (isLocal) {
        evonaType = EvonaTypes.Full;
    }
    else {
        evonaType = EvonaTypes.NotRun;
        if (secretMode) {
            let authResultText = ``;
            msgbox.CheckVisible = false;
            msgbox.SecretEnable = false;
            msgbox.AuthVisible = true;
            msgbox.onAuthChecking = (authText) => {
                authResultText = authText;
                return true;
            };
            const res = await msgbox.showWait(`認証コードを入力してください`);
            const now = new Date();
            const mm = ("0" + (now.getMonth() + 1)).slice(-2);
            const dd = ("0" + now.getDate()).slice(-2);
            const isMoonFirst = Math.random() > 0.5;
            const correctCode = isMoonFirst ? `${mm}${dd}` : `${dd}${mm}`;
            if (authResultText === correctCode) {
                console.log(`auth success`);
                evonaType = EvonaTypes.Full;
            }
            else
                console.log(`auth fail`);
        }
        else {
            if (canActivateApp) {
                evonaType = EvonaTypes.Limit;
            }
        }
    }
    if (cleanMode) {
        const setting = await getSettingAccessInstance();
        await setting.clear();
        const log = await getLogAccessInstance();
        await log.clear();
    }
    env.evonaType = evonaType;
}
function setTableRowRadio(cellIndex, rowIndex, title, opt, table, titleCssClassName, optCssClassName) {
    table.getCell(cellIndex, rowIndex).typeInfo.setLabel(title, false);
    table.getCell(cellIndex, rowIndex).className = titleCssClassName;
    table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    cellIndex++;
    const cellOpt = table.getCell(cellIndex, rowIndex);
    cellOpt.typeInfo.setRadio(opt);
    cellOpt.className = optCssClassName;
    cellOpt.typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    return cellOpt;
}
function setTableRowLabel(cellIndex, rowIndex, title, content, table, titleCssClassName, contentCssClassName) {
    table.getCell(cellIndex, rowIndex).typeInfo.setLabel(title, false);
    table.getCell(cellIndex, rowIndex).className = titleCssClassName;
    table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    cellIndex++;
    table.getCell(cellIndex, rowIndex).typeInfo.setLabel(content, false);
    table.getCell(cellIndex, rowIndex).className = contentCssClassName;
    table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
}
function setTableRowButton(cellIndex, rowIndex, title, content, table, titleCssClassName, contentCssClassName) {
    table.getCell(cellIndex, rowIndex).typeInfo.setLabel(title, false);
    table.getCell(cellIndex, rowIndex).className = titleCssClassName;
    table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    cellIndex++;
    table.getCell(cellIndex, rowIndex).typeInfo.setButton(content);
    table.getCell(cellIndex, rowIndex).className = contentCssClassName;
    table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
}
function setTableRowInput(cellIndex, rowIndex, title, input, table, titleCssClassName, optCssClassName) {
    table.getCell(cellIndex, rowIndex).typeInfo.setLabel(title, false);
    table.getCell(cellIndex, rowIndex).className = titleCssClassName;
    table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    cellIndex++;
    const cellOpt = table.getCell(cellIndex, rowIndex);
    cellOpt.typeInfo.setInput(input);
    cellOpt.className = optCssClassName;
    cellOpt.typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    return cellOpt;
}
/**通常モードメイン */
export async function mainNormal(env) {
    //experiment05()
    //fullscreenScreensaver()
    const isWebRunning = env.isWebRunning;
    //const currentUserHome = env.currentUserHome
    const chListFile = env.chListFile;
    const chStatusListFile = env.chStatusListFile;
    const chHtmlListFile = env.chHtmlListFile;
    const chRisticWdFile = env.chRisticWdFile;
    //スプラッシュUI初期化
    const fsHtmlMaker = new HtmlMaker;
    const splashName = `splash-screen`;
    fsHtmlMaker.initFullScreen(splashName, `エボナ データベース初期化中...`);
    fsHtmlMaker.applyFullScreenCss(splashName);
    //処理中パネル初期化
    const msgElem = fsHtmlMaker.getFullScreenMsgElem(splashName);
    const msgText = msgElem !== null ? msgElem.innerHTML : ``;
    //環境設定ロード
    await env.loadEnvSetting();
    env.applyImageHome();
    const wp = EnvWallpaperMap.get(env.envWallpaperType);
    if (wp !== undefined) {
        env.replaceWallpaper(wp.png);
    }
    await env.loadHomeSetting();
    console.log(`**mainNormal()**`, env);
    //ImageLoader
    const imgLoader = new ImageLoader;
    imgLoader.enableCheckExist = env.envUrlType !== EnvUrlTypes.GitHubLocal;
    //キャラ情報ロード
    CharSpecItem.env = env;
    const charSpecSet = new CharSpecSet();
    charSpecSet.env = env;
    const chSpecList = await charSpecSet.LoadList(chListFile);
    //キャラ詳細情報ロード
    const charDB = new CharStatusDB();
    await charDB.loadDB(chStatusListFile);
    charDB.charSpecSet = chSpecList;
    const auxScoreSet = await charDB.loadAuxScoreSet(env.gameType);
    const comboRes = await charDB.getComboNameMap();
    const idComboKwMap = comboRes[0];
    const comboKwCntMap = comboRes[1];
    const comboKwSorted = getSortedComboKeywords(env.gameType, comboKwCntMap);
    const comboKwRows = splitRowByComboSortedKw(comboKwSorted);
    //キャラ詳細HTMLロード
    if (msgElem !== null)
        msgElem.innerHTML = `キャラ詳細ロード中 ...`;
    const charHtmlDB = new CharHtmlDB();
    if (env.isLocal)
        await charHtmlDB.loadDB(chHtmlListFile);
    else
        charHtmlDB.loaded = true;
    //キャラ特徴語DBロード
    const charRisticDB = new CharRisticDB();
    await charRisticDB.loadDB(chRisticWdFile);
    //sortEx05(charRisticDB)
    let loadErrMsg = ``;
    if (charHtmlDB.loaded === false) {
        loadErrMsg = `・キャラ詳細ローカルキャッシュ`;
    }
    if (charRisticDB.loaded === false) {
        if (loadErrMsg !== ``)
            loadErrMsg += `<br>`;
        loadErrMsg += `・特徴語DB`;
    }
    if (loadErrMsg !== ``) {
        const msgbox = new EvonaMessageBox;
        await msgbox.showWait(`キャラ詳細をロードできませんでした。<br>${loadErrMsg}`);
    }
    //利用プラグイン判定
    let nsURLs;
    const importer = ImporterMap.get(env.gameType);
    if (importer !== undefined) {
        nsURLs = importer.nsURLs;
        const hsInst = importer.inst; //PuyoQueSiteImporter, MemeMoriSiteImporter, ...
        hsInst.charStatusDB = charDB;
        charDB.scoreTable = hsInst.scoreTable;
        charDB.detailTable = hsInst.detailTable;
        if (hsInst.rolePriolity !== undefined)
            charDB.rolePriolity = hsInst.rolePriolity;
    }
    //キャラ画像ロード
    let parseSources;
    if (importer !== undefined) {
        parseSources = new Array;
        for (const item of nsURLs) {
            if (msgElem !== null)
                msgElem.innerHTML = `${msgText} ${item.nsName}`;
            await imgLoader.setupNs(item.ns, env, chSpecList);
            parseSources.push({ ns: item.ns, nsName: item.nsName });
        }
    }
    //キャラスキルロード
    if (msgElem !== null)
        msgElem.innerHTML = `キャラスキルロード中 ...`;
    const charSkillMap = new Map;
    for (const chItem of chSpecList.chList) {
        const scs = await charDB.getDetail(chItem.idAsText);
        if (scs !== null) {
            const skillMap = new Map;
            for (const sci of scs.items) {
                if (sci.isSkill) {
                    skillMap.set(sci.key, sci.selectedVal !== undefined ? sci.selectedVal : ``);
                }
            }
            if (skillMap.size >= 1) {
                charSkillMap.set(chItem.id, skillMap);
            }
        }
    }
    //ゲーム構成ロード＆構成変更通知
    let gameConfig = undefined;
    gameConfig = await env.loadGameConfig(env.gameType);
    console.log(gameConfig);
    env.onGameConfigChanged = async (sender) => {
        /*
        console.log(`onGameConfigChanged`)
        console.log(sender)
        console.log(sender.receivedBool)
        */
        if (sender.receivedBool === true) {
            console.log(`onGameConfigChanged`);
            console.log(sender.receivedBool);
            gameConfig = await env.loadGameConfig(env.gameType);
            console.log(gameConfig);
            //対戦結果UI更新
            await updateCombatResultAll();
        }
    };
    env.startBcHelper();
    if (msgElem !== null)
        msgElem.innerHTML = `UI 初期化中 ...`;
    //DockUI作成
    const dockUI = new DockSet();
    dockUI.env = env;
    //キャラ選択UI
    async function makeCharListUI() {
        const chList = new CharSpecList();
        chList.chSet = chSpecList;
        chList.charSkillMap = charSkillMap;
        chList.uiInfo.name = chListFormName;
        chList.uiInfo.left = "300";
        chList.uiInfo.top = "100";
        const uiName = chList.uiInfo.name;
        const chListHTML = await chList.toHTML(imgLoader);
        if (isWebRunning) {
            const title = chListFormTitle;
            const dlg = chList.createSelectorBox(title, uiName, chListHTML);
            //chList.applyCss();
            chList.addEventHandlers(dlg);
            chList.addItemEventHandlers();
            chList.enableLazyImages(imgLoader);
            dlg.show();
            chListDlgElem = dlg;
            const dockItem = new DockItem();
            dockItem.setAsDlg(dlg, title);
            dockUI.add(dockItem);
        }
        return chList;
    }
    const chListFormName = "charListArea";
    const chListFormTitle = "キャラ選択";
    let chListDlgElem;
    const chListUI = await makeCharListUI();
    chListUI.charDB = charDB;
    chListUI.idComboKwMap = idComboKwMap;
    if (env.isLocal)
        chListUI.charHtmlDB = charHtmlDB;
    //キャラ一覧UI
    async function makeNewSummaryChar(chItem, result) {
        result.selectCh = chItem;
        const fileURL = await imgLoader.getImageUrlBy(chItem.iconFileName, chItem.ns);
        if (fileURL === null) {
            result.selectedImg = ``;
            result.cancel = true;
        }
        else {
            result.selectedImg = fileURL;
            result.cancel = false;
            const scItems = await charDB.getStatus(chItem.idAsText);
            //console.log(scItems)
            result.scoreSet = scItems;
        }
        console.log(`selected ch = ${result.selectCh.name}`);
    }
    async function makeCharSummary() {
        const summaryUI = new CharSummary();
        summaryUI.env = env;
        await summaryUI.load(charDB.charSpecSet);
        summaryUI.uiInfo.name = `CharSummary`;
        summaryUI.uiInfo.left = `400`;
        summaryUI.uiInfo.top = `100`;
        const uiName = summaryUI.uiInfo.name;
        const summaryHTML = await summaryUI.toHTML();
        if (isWebRunning) {
            const title = "キャラ一覧";
            const dlg = summaryUI.createSummaryBox(title, uiName, summaryHTML);
            //summaryUI.applyCss();
            summaryUI.addEventHandlers(dlg, 
            /*onAdd*/
            async (result) => {
                await makeNewSummaryChar(chListUI.selectedCh, result);
            });
            /**お試しコード */
            await summaryUI.createCharSummaryNodes(imgLoader, parseSources);
            summaryUI.enableLazyImages(imgLoader);
            dlg.show();
            const dockItem = new DockItem();
            dockItem.setAsDlg(dlg, title);
            dockUI.add(dockItem);
        }
        return summaryUI;
    }
    const summaryUI = await makeCharSummary();
    //編成UI
    async function makeFormationUI(formName, leftPos, topPos, title) {
        const formUI = new FormationMake();
        if (formName === playerFormName) {
            formUI.InitForPlayer(summaryUI);
            formUI.autoForm = true;
            formUI.editFormEnable = false;
            formUI.saveEnable = false;
            formUI.imgLoader = imgLoader;
        }
        if (formName === enemyFormName) {
            formUI.InitForEnemy(charDB);
            formUI.autoForm = false;
            formUI.editFormEnable = true;
            formUI.saveEnable = true;
        }
        formUI.formation.uiInfo.name = formName;
        formUI.formation.uiInfo.left = `${leftPos}`;
        formUI.formation.uiInfo.top = `${topPos}`;
        const uiName = formUI.formation.uiInfo.name;
        const formHTML = await formUI.toHTML(uiName);
        /*敵編成の場合は必要なので、とりあえずコメント
        const propGridHTML = ``
        */
        const propGridHTML = formName === enemyFormName ? formUI.toGridHTML() : ``;
        if (isWebRunning) {
            const dlg = formUI.createFormationBox(title, uiName, formHTML, propGridHTML);
            //formUI.applyCss();
            formUI.addEventHandlers(dlg);
            formUI.addItemEventkHandlers(
            /*onPut*/
            async (result) => {
                // result.selectedImg：""の場合、キャラ選択から取得、""でない場合、このファイルを通知
                let fileName = ``;
                let ns = ``;
                if (result.selectedImg === ``) {
                    fileName = chListUI.selectedCh.iconFileName;
                    ns = chListUI.selectedCh.ns;
                    result.selectCh = chListUI.selectedCh;
                }
                else {
                    fileName = result.item.ch.iconFileName;
                    ns = result.item.ch.ns;
                    result.selectCh = result.item.ch;
                }
                const fileURL = await imgLoader.getImageUrlBy(fileName, ns);
                if (fileURL === null)
                    return;
                result.selectedImg = fileURL;
                result.item.isEmpty = false;
                //console.log(`[onPut] selected ch = ${result.selectCh.name}`);
                //対戦予想UI：キャライメージ・判定マーク差し替え
                updateCombatChar(result.uiName, result.item, result.selectCh);
            }, 
            /*onEmpty*/
            async (result) => {
                const fileURL = await imgLoader.getImageUrlBy(result.selectedImg, chListUI.selectedCh.ns);
                if (fileURL === null)
                    return;
                result.selectedImg = fileURL;
                result.item.isEmpty = true;
                //console.log(`[onEmpty] empty ch = ${result.selectedImg}`);
                //対戦予想UI：キャライメージ・判定マーク差し替え
                updateCombatChar(result.uiName, result.item, result.selectCh);
            }, 
            /*onStock*/
            async (result) => {
                console.log(`selected ch = ${result.item.ch.name}`);
                /*後で消す
                const req = new CharSummaryActionReq
                req.selectCh = result.item.ch
                req.selectedImg = result.selectedImg
                req.scoreSet = result.scoreSet
                summaryUI.charStock(req)
                */
            }, 
            /*onPropChanged*/
            async (changed) => {
                //対戦結果UI更新
                await updateCombatResultAll();
            });
            formUI.enableLazyImages(imgLoader);
            dlg.show();
            if (formName === playerFormName) {
                playerDlgElem = dlg;
            }
            const dockItem = new DockItem();
            dockItem.setAsDlg(dlg, title);
            dockUI.add(dockItem);
        }
        return formUI;
    }
    const playerFormName = "playerForm";
    const enemyFormName = "enemyForm";
    const playerFormTitle = "自編成";
    const enemyFormTitle = "敵編成";
    let playerDlgElem;
    const playerForm = await makeFormationUI(playerFormName, 100, 100, playerFormTitle);
    const enemyForm = await makeFormationUI(enemyFormName, 100, 200, enemyFormTitle);
    playerForm.idComboKwMap = idComboKwMap;
    //対戦UI作成
    const combatFormName = "combatForm";
    const combatFormTitle = "対戦予想";
    let combatDlgElem;
    async function makeCombatTable(formName, leftPos, topPos, title) {
        combatResult.uiInfo.name = formName;
        combatResult.uiInfo.left = `${leftPos}`;
        combatResult.uiInfo.top = `${topPos}`;
        const combatHTML = await combatResult.toHTML("combatTable", imgLoader);
        const dlg = combatResult.createCombatBox(title, formName, combatHTML);
        combatResult.enableLazyImages(imgLoader);
        await combatResult.replaceJudge(imgLoader);
        dlg.show();
        combatDlgElem = dlg;
        const dockItem = new DockItem();
        dockItem.setAsDlg(dlg, title);
        dockUI.add(dockItem);
    }
    const combatResult = new CombatResult();
    await makeCombatRes();
    await makeCombatTable(combatFormName, 100 + 20, 300, combatFormTitle);
    //操作UI
    const saveMenuText = "保存";
    {
        const dockItem = new DockItem();
        dockItem.setAsMenu(saveMenuText);
        //とりあえず無効化：dockUI.add(dockItem)
    }
    const loadMenuText = "復帰";
    {
        const dockItem = new DockItem();
        dockItem.setAsMenu(loadMenuText);
        //とりあえず無効化：dockUI.add(dockItem)
    }
    /*
    const configMenuText = "設定"
    {
        const dockItem = new DockItem()
        dockItem.setAsMenu(configMenuText)
        dockUI.add(dockItem)
    }
    */
    // DOCK UI 作成
    const dockFormName = "dockForm";
    let dockDlg = null;
    const dockHTML = await dockUI.toHTML(dockFormName, imgLoader);
    if (isWebRunning) {
        const dlg = dockUI.createDockBox(dockFormName, dockHTML, true);
        //dockForm.applyCss();
        dockUI.addItemClickHandlers(
        /*onApply*/
        async (result) => {
            const stdApply = dockUI.stdApplyAction(result);
            if (stdApply === false)
                return;
            if (result.item.isMenuType) {
                if (result.item.toolTip === saveMenuText) {
                    await onSaveAction();
                }
                if (result.item.toolTip === loadMenuText) {
                    await onLoadAction(
                    /* onLoadAction::callback */
                    async (loadedResult) => {
                        console.log(`[loadedResult] ${loadedResult}`);
                        if (loadedResult !== LoadedResultTypes.Success)
                            return;
                        const playerFormationSet = FormationSetJson.fromJsonInst(loadedPlayerFormationSet);
                        const enemyFormationSet = FormationSetJson.fromJsonInst(loadedEnemyFormationSet);
                        loadedPlayerFormationSet = null;
                        loadedEnemyFormationSet = null;
                        await playerForm.Setup(playerFormationSet, imgLoader);
                        await enemyForm.Setup(enemyFormationSet, imgLoader);
                    });
                }
                /*
                if (result.item.toolTip === configMenuText) {
                    // 別タブで開く
                    const url = env.editorURL
                    window.open(url, url);
                }
                */
            }
        });
        dockUI.enableLazyImages(imgLoader);
        dlg.show();
        dockDlg = dlg;
    }
    //セーブ処理
    const playerJsonFile = "playerForm.json";
    const enemyJsonFile = "enemyForm.json";
    const dockJsonFile = "dockForm.json";
    async function onSaveAction() {
        //zindex コピー
        dockUI.InitZOrder(zindexHelper);
        //JSON 作成
        const playerJson = FormationSetJson.toJsonText(playerForm.formation, playerForm.scsList, playerForm.formationOptList);
        const enemyJson = FormationSetJson.toJsonText(enemyForm.formation, enemyForm.scsList, enemyForm.formationOptList);
        const dockJson = DockSetJson.toJsonText(dockUI);
        // ライブラリを使用
        const zip = new window.JSZip();
        // 1. 各編成を個別のファイルとしてZIP内に追加
        zip.file(playerJsonFile, playerJson);
        zip.file(enemyJsonFile, enemyJson);
        zip.file(dockJsonFile, dockJson);
        // 2. ZIPファイルを生成
        const content = await zip.generateAsync({ type: "blob" });
        /*
        const fileHandle = saveZipFilePicker()
        if (fileHandle === null) {
            return
        }
        const fileName = (fileHandle as any).name as string
        */
        const fileName = "gameConfig.zip";
        // 3. ダウンロード用のリンクを作ってクリックさせる
        const url = URL.createObjectURL(content);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        // メモリ解放
        URL.revokeObjectURL(url);
        //save done!
        console.log("saved!");
    }
    //ロード処理
    let loadedDockUI = null;
    let loadedPlayerFormationSet = null;
    let loadedEnemyFormationSet = null;
    async function onLoadAction(callback) {
        const elem = document.createElement("input");
        elem.type = "file";
        elem.accept = ".zip";
        elem.addEventListener("cancel", () => {
            console.log("Cancelled.");
            return LoadedResultTypes.Cancel;
        });
        elem.addEventListener("change", async () => {
            if (elem.files.length == 1) {
                console.log("File selected: ", elem.files[0].name);
                const file = elem.files[0];
                // 1. ファイルを ArrayBuffer として読み込む
                const arrayBuffer = await file.arrayBuffer();
                // 2. JSZip で展開
                const zip = new window.JSZip();
                const unzipped = await zip.loadAsync(arrayBuffer);
                // 3. 中にある特定のファイルを取り出す
                async function unzipAction(fileName) {
                    const jsonFile = unzipped.file(fileName);
                    if (jsonFile) {
                        const jsonText = await jsonFile.async("string");
                        const resInst = JSON.parse(jsonText);
                        console.log(resInst);
                        return resInst;
                    }
                }
                //Dock UI
                {
                    const resInst = await unzipAction(dockJsonFile);
                    if (resInst)
                        loadedDockUI = resInst;
                }
                //player Formation UI
                {
                    const resInst = await unzipAction(playerJsonFile);
                    if (resInst)
                        loadedPlayerFormationSet = resInst;
                }
                //enemy Formation UI
                {
                    const resInst = await unzipAction(enemyJsonFile);
                    if (resInst)
                        loadedEnemyFormationSet = resInst;
                }
                const res = loadedDockUI !== null &&
                    loadedPlayerFormationSet !== null &&
                    loadedEnemyFormationSet !== null ?
                    LoadedResultTypes.Success : LoadedResultTypes.Fail;
                callback(res);
            }
        });
        elem.click();
        /*
        // loadしたことにする
        const testDockSetJson = dockJson
        // 検証用DockUI
        const testDockSet = new DockSet()
        testDockSet.add(dockUI.items[0])    //キャラ選択
        testDockSet.add(dockUI.items[1])    //自編成
        // DockUI復帰
        testDockSetJson.restore(testDockSet, zindexHelper)
        */
        return LoadedResultTypes.Unknown;
    }
    async function saveZipFilePicker() {
        try {
            // 保存ダイアログを表示
            const handle = await window.showSaveFilePicker({
                suggestedName: 'gameConfig.zip',
                types: [{
                        description: 'Zip Files',
                        accept: { 'application/zip': ['.zip'] },
                    }],
            });
            return handle; //FileSystemFileHandleが返ってくるらしい
        }
        catch (err) {
            console.error("ユーザーがキャンセルしたか、エラーが発生しました", err);
        }
        return null;
    }
    // ZOrder 初期化
    function setVisible(parentElem, visible) {
        parentElem.style.display = visible ? `` : `none`;
        //parentElem.hidden = !visible
    }
    const zindexHelper = new HtmlZindexHelper();
    if (isWebRunning) {
        zindexHelper.AddDialogs();
        zindexHelper.AssignIndexies();
        await zindexHelper.LoadAllSetting();
        await zindexHelper.loadSetting(dockDlg);
        dockUI.InitZOrder(zindexHelper);
        await zindexHelper.ForEachAsync((parentName) => {
            const parentElem = HtmlMakerDialogDesc.FindDialogParent(parentName);
            if (parentElem !== null) {
                /*
                if (env.isLocal) {
                    parentElem.hidden = false
                }
                else {
                    if (parentName === `charListArea`) {
                        parentElem.hidden = false
                    }
                    else {
                        parentElem.hidden = env.evonaType === EvonaTypes.Full ? false : true
                    }
                }
                */
                if (parentName === chListFormName) {
                    setVisible(parentElem, true); //本当は非表示にしたいけどToolTipの連動がむずいのでtrue
                }
                if (parentName === `CharSummary`) {
                    setVisible(parentElem, false);
                }
                if (parentName === playerFormName) {
                    setVisible(parentElem, true); //本当は非表示にしたいけどToolTipの連動がむずいのでtrue
                }
                if (parentName === enemyFormName) {
                    setVisible(parentElem, false);
                }
                if (parentName === combatFormName) {
                    setVisible(parentElem, true); //本当は非表示にしたいけどToolTipの連動がむずいのでtrue
                }
            }
            return true;
        });
        if (dockDlg !== null) {
            //setVisible(dockDlg.parentElement!, env.evonaType === EvonaTypes.Full ? true : false)
            const visible = env.evonaType === EvonaTypes.Full ?
                env.action === EvonaActions.None ? true : false
                : false;
            setVisible(dockDlg.parentElement, visible);
        }
    }
    await summaryUI.showCharSummaryNodes();
    //ツールチップ一覧
    if (isWebRunning) {
        /*
        const title = "ツールチップ一覧"
        const html = HtmlMakerToolTipMgr.toHTML()
        const dlg = HtmlMakerToolTipMgr.createMgrBox(title, html)
        HtmlMakerToolTipMgr.uiInfo.left = "400"
        HtmlMakerToolTipMgr.uiInfo.top = "100"
        HtmlMakerToolTipMgr.applyCss()
        dlg.show()
        //dlg.parentElement!.hidden = false
        HtmlMakerToolTipMgr.enableEvents()

        const dockItem = new DockItem()
        dockItem.setAsDlg(dlg, title)
        dockUI.add(dockItem)
        */
    }
    //ツールチップ追加要求
    chListUI.requestToolTip = requestToolTip;
    playerForm.requestToolTip = requestToolTip;
    enemyForm.requestToolTip = requestToolTip;
    async function requestToolTip(req) {
        console.log(`[${req.uiName}] requestToolTip`);
        const toolTipName = HtmlMakerToolTipMgr.MakeUniqueName(req.uiName, req.itemName);
        const toolTipFind = HtmlMakerToolTipMgr.FindBy(toolTipName);
        switch (req.reqType) {
            case HtmlMakerToolTipReqTypes.AddMemo:
                if (toolTipFind === null) {
                    HtmlMakerToolTipMgr.Add(toolTipName);
                    const toolTipNew = HtmlMakerToolTipMgr.FindBy(toolTipName);
                    if (toolTipNew !== null) {
                        let uiLabelText = `*unknown*`;
                        switch (req.uiName) {
                            case chListFormName:
                                uiLabelText = chListFormTitle;
                                break;
                            case playerFormName:
                                uiLabelText = playerFormTitle;
                                break;
                            case enemyFormName:
                                uiLabelText = enemyFormTitle;
                                break;
                        }
                        toolTipNew.name = toolTipName;
                        toolTipNew.SetTitle(uiLabelText);
                        toolTipNew.VisibleCpBtn(false);
                        toolTipNew.VisibleActBtn(false);
                        toolTipNew.SetMemo(req.memo, ``);
                        toolTipNew.applyCss();
                        toolTipNew.Show(req.parentClassName);
                        toolTipNew.SetVisible(true);
                        toolTipNew.EnableEvents();
                        const rowIndex = HtmlMakerToolTipMgr.AddRow();
                        HtmlMakerToolTipMgr.SetTitle(rowIndex, uiLabelText, req.title);
                        HtmlMakerToolTipMgr.Sort();
                    }
                }
                break;
            case HtmlMakerToolTipReqTypes.AddTable:
                if (toolTipFind === null) {
                    HtmlMakerToolTipMgr.Add(toolTipName);
                    const toolTipNew = HtmlMakerToolTipMgr.FindBy(toolTipName);
                    if (toolTipNew !== null) {
                        let uiLabelText = `*unknown*`;
                        switch (req.uiName) {
                            case chListFormName:
                                uiLabelText = req.title;
                                break;
                        }
                        toolTipNew.name = toolTipName;
                        toolTipNew.SetTitle(uiLabelText);
                        toolTipNew.VisibleCpBtn(false);
                        toolTipNew.VisibleActBtn(false);
                        toolTipNew.SetTable(req.table, req.tblAuxCss);
                        toolTipNew.SetTableFirstRowHeader();
                        toolTipNew.heightPx = `400`;
                        toolTipNew.applyCss();
                        toolTipNew.Show(req.parentClassName);
                        toolTipNew.SetVisible(true);
                        toolTipNew.EnableEvents();
                        const rowIndex = HtmlMakerToolTipMgr.AddRow();
                        HtmlMakerToolTipMgr.SetTitle(rowIndex, uiLabelText, req.title);
                        HtmlMakerToolTipMgr.Sort();
                    }
                }
                break;
            case HtmlMakerToolTipReqTypes.Remove:
                if (toolTipFind !== null) {
                    HtmlMakerToolTipMgr.Remove(toolTipName);
                }
                break;
        }
    }
    //オプションUI共通
    function tableRowCssClassName() {
        return `${combatFormName}-optionUI-row`;
    }
    function itemNameCssClassName() {
        return `${combatFormName}-optionUI-title`;
    }
    function urlOptCssClassName() {
        return `${dockFormName}-optionUI-url`;
    }
    function wallpaperOptCssClassName() {
        return `${dockFormName}-optionUI-wallpaper`;
    }
    function homePathCssClassName() {
        return `${dockFormName}-optionUI-homePath`;
    }
    function siteZipCssClassName() {
        return `${dockFormName}-optionUI-site`;
    }
    function siteGameCssClassName() {
        return `${dockFormName}-optionUI-sitegame`;
    }
    function siteHtmlCssClassName() {
        return `${dockFormName}-optionUI-sitehtml`;
    }
    function siteImgCssClassName() {
        return `${dockFormName}-optionUI-siteimg`;
    }
    function siteStsCssClassName() {
        return `${dockFormName}-optionUI-sitests`;
    }
    function siteDropCssClassName() {
        return `${dockFormName}-optionUI-sitedrop`;
    }
    function boostOptCssClassName() {
        return `${combatFormName}-optionUI-boost`;
    }
    //環境設定(DockUI)のオプションUI（ツールチップUIで作成）
    const envToolTipTitle = "環境設定";
    const onEnvOptionChanged = async function (classify, selectedKey, selectedValue, changed, rowIndex) {
        console.log(`onEnvOptionChanged::radio`, classify, selectedKey, selectedValue);
        switch (classify) {
            case `optionUI-opt-envurl`:
                switch (selectedKey) {
                    case EnvUrlTypes.GitHub:
                    case EnvUrlTypes.GitHubLocal:
                    case EnvUrlTypes.Local:
                        env.envUrlType = selectedKey;
                        await env.saveEnvSetting();
                        break;
                }
                break;
            case `optionUI-opt-envwp`:
                const wp = EnvWallpaperMap.get(selectedKey);
                if (wp !== undefined) {
                    env.replaceWallpaper(wp.png);
                    env.envWallpaperType = selectedKey;
                    await env.saveEnvSetting();
                }
                break;
        }
    };
    function makeEnvOptionTable() {
        //環境設定のURLの選択肢
        const urlOpt = new HtmlMakerOptionRadio();
        const urlPairs = new Array;
        for (const [key, item] of EnvUrlMap) {
            if (env.isLocal === false) {
                if (key === EnvUrlTypes.Local)
                    continue;
            }
            urlPairs.push(`${item.displayText}:${item.desc}/${key}`);
        }
        urlOpt.selectionPair = urlPairs;
        urlOpt.selectedItem = env.envUrlType; //EnvUrlTypes.Local
        urlOpt.classify = `optionUI-opt-envurl`;
        //環境設定の壁紙の選択肢
        const wpOpt = new HtmlMakerOptionRadio();
        const wpPairs = new Array;
        for (const [key, item] of EnvWallpaperMap) {
            wpPairs.push(`${[item.displayText]}/${key}`);
        }
        wpOpt.selectionPair = wpPairs;
        wpOpt.selectedItem = env.envWallpaperType; //EnvWallpaperTypes.WP1
        wpOpt.classify = `optionUI-opt-envwp`;
        //テーブル作成
        const nCol = 2;
        const table = new HtmlMakerTable();
        table.makeDim(nCol, 2);
        //カラム定義
        setTableRowRadio(0, 0, `URL選択`, urlOpt, table, itemNameCssClassName(), urlOptCssClassName());
        setTableRowRadio(0, 1, `壁紙選択`, wpOpt, table, itemNameCssClassName(), wallpaperOptCssClassName());
        //行テンプレート初期化
        table.makeRowTemplate(tableRowCssClassName());
        return table;
    }
    function envOptCssText() {
        const url = urlOptCssClassName();
        const wp = wallpaperOptCssClassName();
        const marker = HtmlMakerCommonCss.radioBackClassMark;
        const activeText = HtmlMakerCommonCss.radioActiveKeyText;
        return `
/* タイトル */
[class*="${itemNameCssClassName()}"] {
white-space: nowrap;
}
/* 右側のセルの箱（td、またはその中のdivコンテナ） */
[id*="${url}${marker}"], 
[id*="${wp}${marker}"] {
${HtmlMakerCommonCss.radioBackCssText}
width: 92%;        /* 親のツールチップの幅いっぱいに広げる */
}
/* 5つの選択肢（div）それぞれの法律 */
[id*="${url}"], 
[id*="${wp}"] {
${HtmlMakerCommonCss.radioNormCssText}
}
/* 現在選択されているアイテム（selectedItem = '1' など）が光る法律 */
[id*="${url}"].${activeText}, 
[id*="${wp}"].${activeText} {
${HtmlMakerCommonCss.radioActCssText}
}
`.trim();
    }
    async function makeEnvOptionToolTip() {
        const toolTipName = HtmlMakerToolTipMgr.MakeUniqueName(dockFormName, `optionUI`);
        const toolTipFind = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipFind !== null)
            return null;
        HtmlMakerToolTipMgr.Add(toolTipName);
        const toolTipNew = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipNew !== null) {
            const uiLabelText = envToolTipTitle;
            const table = await makeEnvOptionTable();
            toolTipNew.name = toolTipName;
            toolTipNew.InvisibleAll();
            toolTipNew.SetTitle(uiLabelText + ``);
            toolTipNew.SetTable(table, envOptCssText());
            toolTipNew.onChangedTableSelection = onEnvOptionChanged;
            toolTipNew.MgrType = HtmlMakerToolTipMgrTypes.NotMgr;
            toolTipNew.applyCss();
            toolTipNew.Show(dockDlg.className);
            toolTipNew.SetVisible(false);
            toolTipNew.EnableEvents();
        }
        return toolTipNew;
    }
    const envOptionToolTip = await makeEnvOptionToolTip();
    if (envOptionToolTip !== null) {
        dockUI.envOptionToolTip = envOptionToolTip; //"環境設定"タップしたときに閉じる対象のツールチップUI
    }
    //ホームパス設定UI(DockUI)（ツールチップUIで作成）
    const homePathTipTitle = "ホームパス設定";
    const onHomePathChanged = async function (classify, selectedKey, selectedValue, changed, rowIndex) {
        console.log(`onHomePathChanged::radio`, classify, selectedKey, selectedValue);
        switch (classify) {
            case `optionUI-opt-site-game`:
                break;
        }
    };
    const onHomePathActionReq = async function () {
        await env.saveHomeSetting();
    };
    function makeHomePathTable() {
        const nHomePath = env.userHomePaths.size;
        //テーブル作成
        const nCol = 2;
        const table = new HtmlMakerTable();
        table.makeDim(nCol, nHomePath);
        //カラム定義
        let rowIndex = 0;
        for (const [key, homePath] of env.userHomePaths) {
            const importer = ImporterMap.get(key);
            const title = importer !== undefined ? importer.displayText : `N/A`;
            const inputOpt = new HtmlMakerOptionInput();
            inputOpt.disableKeyDown = false;
            inputOpt.enableClicked = true;
            inputOpt.placeholder = `ここへフォルダをドロップ`;
            inputOpt.value = homePath;
            setTableRowInput(0, rowIndex, title, inputOpt, table, itemNameCssClassName(), homePathCssClassName());
            rowIndex++;
        }
        //行テンプレート初期化
        table.makeRowTemplate(tableRowCssClassName());
        return table;
    }
    function homePathCssText() {
        const homeDrop = homePathCssClassName();
        return `
/* タイトル */
[class*="${homeDrop}"] {
white-space: nowrap;
border-radius: 3px;
border: 2px solid #3b3a03;
}
[class*="${homeDrop}"].drag-hover {
white-space: nowrap;
color: ${HtmlMakerCommonCss.normBkColor};
}
`.trim();
    }
    async function onHomePathCopyPaste(dlg, cpType) {
        switch (cpType) {
            case HtmlMakerCopyPasteTypes.Copy:
                if (homePathToolTip !== null) {
                    const rows = homePathToolTip.TableRows();
                    if (rows !== null) {
                        let rowIndex = 0;
                        const putMap = new Map;
                        for (const [key, path] of env.userHomePaths) {
                            const row = rows[rowIndex];
                            const cell = row.cells[1];
                            const input = cell.children[0];
                            const path = input.value;
                            putMap.set(key, path);
                            rowIndex++;
                        }
                        await env.putClipBoardHomeSetting(putMap);
                    }
                }
                break;
            case HtmlMakerCopyPasteTypes.Paste:
                await env.getClipBoardHomeSetting();
                if (homePathToolTip !== null) {
                    const rows = homePathToolTip.TableRows();
                    if (rows !== null) {
                        let rowIndex = 0;
                        const putMap = new Map;
                        for (const [key, path] of env.userHomePaths) {
                            const row = rows[rowIndex];
                            const cell = row.cells[1];
                            const input = cell.children[0];
                            input.value = path;
                            rowIndex++;
                        }
                    }
                }
                break;
        }
    }
    async function makeHomePathToolTip() {
        const toolTipName = HtmlMakerToolTipMgr.MakeUniqueName(dockFormName, `homePathUI`);
        const toolTipFind = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipFind !== null)
            return null;
        HtmlMakerToolTipMgr.Add(toolTipName);
        const toolTipNew = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipNew !== null) {
            const uiLabelText = homePathTipTitle;
            const table = await makeHomePathTable();
            const cpMenu = toolTipNew.cpMenu;
            cpMenu.SetType(HtmlMakerDialogB2Types.CopyPaste, onHomePathCopyPaste);
            cpMenu.SetDlgInfo(toolTipNew.dlg, HtmlMakerToolTipMgr.TopElement());
            cpMenu.EnableEvent();
            toolTipNew.name = toolTipName;
            toolTipNew.VisibleMgrBtn(false);
            toolTipNew.SetTitle(uiLabelText + ``);
            toolTipNew.SetTable(table, homePathCssText());
            toolTipNew.onChangedTableSelection = onHomePathChanged;
            toolTipNew.EnableAction(`保存`, onHomePathActionReq);
            toolTipNew.MgrType = HtmlMakerToolTipMgrTypes.NotMgr;
            toolTipNew.heightPx = `400`;
            toolTipNew.applyCss();
            toolTipNew.Show(document.body);
            toolTipNew.EnableEvents();
            toolTipNew.SetVisible(false);
        }
        return toolTipNew;
    }
    const homePathToolTip = await makeHomePathToolTip();
    if (homePathToolTip !== null) {
        const drogdrop = new DragDropHelper();
        drogdrop.onDropDir = onDropDir;
        drogdrop.Start(homePathCssClassName());
        dockUI.envHomePathToolTip = homePathToolTip; //"ホームパス"タップしたときに閉じる対象のツールチップUI
    }
    async function onDropDir(elem, relativeDirInfo) {
        if (relativeDirInfo.isDirectory === false)
            return;
        if (elem.tagName !== `INPUT`)
            return;
        const inputElem = elem;
        if (inputElem.type !== `text`)
            return;
        inputElem.value = relativeDirInfo.name;
    }
    //攻略サイトデータインポートUI（ツールチップUIで作成）
    const siteZipTipTitle = "攻略サイトデータインポート";
    let siteGameSelected = env.gameType !== CharStatusClassifyTypes.none ? env.gameType : CharStatusClassifyTypes.classPq;
    const onSiteZipChanged = async function (classify, selectedKey, selectedValue, changed, rowIndex) {
        console.log(`onSiteZipChanged::radio`, classify, selectedKey, selectedValue);
        switch (classify) {
            case `optionUI-opt-site-game`:
                siteGameSelected = selectedKey;
                break;
        }
    };
    const onSiteActionReq = async function () {
        RebootGame.gameType = env.gameType;
        RebootGame.reboot();
    };
    function makeSiteZipTable() {
        //ゲームタイトルの選択肢
        const importerList = Array.from(ImporterMap.entries());
        const nGame = ImporterMap.size;
        let nGameInRow = 4;
        let nRowGame = Math.floor(nGame / nGameInRow);
        if (((nGame % nGameInRow) !== 0))
            nRowGame++;
        //テーブル作成
        const nCol = 2;
        const table = new HtmlMakerTable();
        table.makeDim(nCol, 1 + nGame);
        //カラム定義
        let title1 = `🕐1️⃣<br><br><br><br><br><br><br><br><br>`;
        let manual1 = `★前準備★`;
        manual1 += `<br>⚙インポート中に「ブロックしました」が出た場合に備え`;
        manual1 += `<br>　ブラウザ設定を変更してください`;
        manual1 += `<br>　※Edge の場合の例`;
        manual1 += `<br>　プライバシー/検索/サービス→`;
        manual1 += `<br>　サイトのアクセス許可→`;
        manual1 += `<br>　すべてのアクセス許可→`;
        manual1 += `<br>　自動ダウンロード`;
        manual1 += `<br>🏍「ダウンロードサーバー」を起動してください`;
        manual1 += `<br>🛸「処理対象ゲーム」を選択してください`;
        setTableRowLabel(0, 0, title1, manual1, table, siteZipCssClassName(), siteZipCssClassName());
        //
        let iGmIndex = -1;
        for (let iRowGm = 0; iRowGm < nRowGame; iRowGm++) {
            let gmPairs = new Array;
            let nRemain = nGameInRow;
            for (let iGm = 0; iGm < nRemain; iGm++) {
                iGmIndex++;
                if (iGmIndex >= nGame)
                    break;
                const gameType = importerList[iGmIndex][0];
                const importer = importerList[iGmIndex][1];
                gmPairs.push(`${[importer.displayText]}/${gameType}`);
            }
            const gameOpt = new HtmlMakerOptionRadio();
            gameOpt.selectionPair = gmPairs;
            gameOpt.selectedItem = siteGameSelected;
            gameOpt.classify = `optionUI-opt-site-game`;
            setTableRowRadio(0, 1 + iRowGm, `　`, gameOpt, table, siteZipCssClassName(), siteGameCssClassName());
        }
        const rowIndex = nRowGame;
        let title2 = `🕑2️⃣<br><br><br>`;
        let manual2 = `攻略サイトからキャラ一覧を取得する場合タップ`;
        manual2 += `<br>全属性のHTMLファイルを`;
        manual2 += `<br>「ダウンロードサーバー」フォルダへ作成します`;
        setTableRowButton(0, rowIndex + 2, title2, manual2, table, siteZipCssClassName(), siteHtmlCssClassName());
        let title3 = `🕒3️⃣<br><br><br><br><br>`;
        let manual3 = `ここに全属性のHTMLをドロップ`;
        manual3 += `<br>以下のファイルを「ダウンロード」フォルダへ作成します`;
        manual3 += `<br>📔キャラ一覧ファイル`;
        manual3 += `<br>🚢キャラ画像ダウンロード用ファイル`;
        manual3 += `<br>🚢キャラステータスダウンロード用ファイル`;
        setTableRowLabel(0, rowIndex + 3, title3, manual3, table, itemNameCssClassName(), siteDropCssClassName());
        let title4 = `🕓4️⃣<br><br>`;
        let manual4 = `攻略サイトからキャラ画像を取得する場合タップ`;
        manual4 += `<br>結果を「ダウンロードサーバー」フォルダへ保存します`;
        setTableRowButton(0, rowIndex + 4, title4, manual4, table, siteZipCssClassName(), siteImgCssClassName());
        let title5 = `🕔5️⃣<br><br>`;
        let manual5 = `攻略サイトからキャラ詳細を取得する場合タップ`;
        manual5 += `<br>結果を「ダウンロードサーバー」フォルダへ保存します`;
        setTableRowButton(0, rowIndex + 5, title5, manual5, table, siteZipCssClassName(), siteStsCssClassName());
        let title6 = `🕕6️⃣<br><br><br><br><br>`;
        let manual6 = `ここに全てのキャラ詳細(*Status_*.txt)をドロップ`;
        manual6 += `<br>以下のファイルを「ダウンロード」フォルダへ保存します`;
        manual6 += `<br>📦キャラステータスzip`;
        manual6 += `<br>📦攻略サイトhtml(ローカル保存zip)`;
        manual6 += `<br>📦特徴語抽出json`;
        setTableRowLabel(0, rowIndex + 6, title6, manual6, table, itemNameCssClassName(), siteDropCssClassName());
        //行テンプレート初期化
        table.makeRowTemplate(tableRowCssClassName());
        return table;
    }
    function siteZipCssText() {
        const siteGame = siteGameCssClassName();
        const siteDrop = siteDropCssClassName();
        const marker = HtmlMakerCommonCss.radioBackClassMark;
        const activeKeyText = HtmlMakerCommonCss.radioActiveKeyText;
        return `
/* タイトル */
[class*="${siteDrop}"] {
white-space: nowrap;
border-radius: 3px;
border: 2px solid #3b3a03;
}
[class*="${siteDrop}"].drag-hover {
white-space: nowrap;
color: ${HtmlMakerCommonCss.normBkColor};
}

/* 「ゲーム選択」の箱（td、またはその中のdivコンテナ） */
[id*="${siteGame}${marker}"] {
${HtmlMakerCommonCss.radioBackCssText}
width: 92%;        /* 親のツールチップの幅いっぱいに広げる */
}
/* 「ゲーム選択」の選択肢（div）それぞれの法律 */
[id*="${siteGame}"] {
${HtmlMakerCommonCss.radioNormCssText}
}
/* 「ゲーム選択」現在選択されているアイテム（selectedItem = '1' など）が光る法律 */
[id*="${siteGame}"].${activeKeyText} {
${HtmlMakerCommonCss.radioActCssText}
}

/* HTML取得ボタン */
.${siteHtmlCssClassName()} {
background: ${HtmlMakerCommonCss.DefaultYellowColor};
color: black;
border-radius: 4px;
padding: 4px 12px;
cursor: pointer;
font-size: 1.0em;
text-align: left;
}
/* IMG取得ボタン */
.${siteImgCssClassName()} {
background: ${HtmlMakerCommonCss.DefaultYellowColor};
color: black;
border-radius: 4px;
padding: 4px 12px;
cursor: pointer;
font-size: 1.0em;
text-align: left;
}
/* Status取得ボタン */
.${siteStsCssClassName()} {
background: ${HtmlMakerCommonCss.DefaultYellowColor};
color: black;
border-radius: 4px;
padding: 4px 12px;
cursor: pointer;
font-size: 1.0em;
text-align: left;
}

`.trim();
    }
    async function makeSiteZipToolTip() {
        const toolTipName = HtmlMakerToolTipMgr.MakeUniqueName(dockFormName, `siteUI`);
        const toolTipFind = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipFind !== null)
            return null;
        HtmlMakerToolTipMgr.Add(toolTipName);
        const toolTipNew = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipNew !== null) {
            const uiLabelText = siteZipTipTitle;
            const table = await makeSiteZipTable();
            toolTipNew.name = toolTipName;
            //toolTipNew.InvisibleAll()
            toolTipNew.VisibleMgrBtn(false);
            toolTipNew.VisibleCpBtn(false);
            toolTipNew.SetTitle(uiLabelText + ``);
            toolTipNew.SetTable(table, siteZipCssText());
            toolTipNew.onChangedTableSelection = onSiteZipChanged;
            toolTipNew.EnableAction(`更新`, onSiteActionReq);
            toolTipNew.MgrType = HtmlMakerToolTipMgrTypes.NotMgr;
            toolTipNew.heightPx = `400`;
            toolTipNew.applyCss();
            toolTipNew.Show(document.body);
            toolTipNew.SetVisible(false);
            toolTipNew.EnableEvents();
        }
        return toolTipNew;
    }
    const envSiteZipToolTip = await makeSiteZipToolTip();
    if (envSiteZipToolTip !== null) {
        const drogdrop = new DragDropHelper();
        drogdrop.onDropFiles = doDropFiles;
        drogdrop.Start(siteDropCssClassName());
        dockUI.envSiteZipToolTip = envSiteZipToolTip; //"攻略サイトデータインポート"タップしたときに閉じる対象のツールチップUI
        /**キャラ一覧HTMLダウンロードをリクエスト */
        const elemSiteHtml = getSiteButton(siteHtmlCssClassName());
        if (elemSiteHtml !== null) {
            elemSiteHtml.onclick = async () => {
                console.log(`elemSiteHtml.onclick`);
                const msgElem = fsHtmlMaker.getFullScreenMsgElem(splashName);
                fsHtmlMaker.showFullScreenCss(splashName);
                const importer = ImporterMap.get(siteGameSelected);
                const nsUrls = importer.nsURLs;
                if (nsUrls === undefined)
                    return;
                let resp = false;
                try {
                    let progCnt = 0;
                    for (const nsUrl of nsUrls) {
                        progCnt++;
                        msgElem.innerHTML = `[${nsUrl.nsName}]：取得中 (${progCnt}/${nsUrls.length})...`;
                        if (nsUrl.url === ``) {
                            //未設定の場合、取得なし
                            console.log(`${nsUrl.ns} : (URL未設定) HTML取得をスキップしました`);
                            continue;
                        }
                        const result = await SiteImporter.doFetchGetHtml(importer, nsUrl);
                        if (result !== null)
                            resp = true;
                        console.log(`${nsUrl.ns} : サーバーからの応答:`, result);
                    }
                }
                catch (error) {
                    // 万が一、裏のNode.jsサーバーが立ち上がっていなかったり、通信エラーが起きた時の防御壁です
                    console.error("", error);
                }
                fsHtmlMaker.hideFullScreenCss(splashName);
                await msgboxIfFail(resp, envSiteZipToolTip.dlg.className);
            };
        }
        /**キャラ画像ダウンロードをリクエスト */
        const elemSiteImg = getSiteButton(siteImgCssClassName());
        if (elemSiteImg !== null) {
            elemSiteImg.onclick = async () => {
                console.log(`elemSiteImg.onclick`);
                const msgElem = fsHtmlMaker.getFullScreenMsgElem(splashName);
                fsHtmlMaker.showFullScreenCss(splashName);
                //const importer = ImporterMap.get(env.gameType)!
                const importer = ImporterMap.get(siteGameSelected);
                const nsUrls = importer.nsURLs;
                if (nsUrls === undefined)
                    return;
                let resp = false;
                try {
                    //zip 解凍
                    const zipName = SiteImporter.chImgGetCmdZip(importer);
                    msgElem.innerHTML = `[${zipName}]：解凍中 ...`;
                    const result = await SiteImporter.doFetchUnzipImg(importer);
                    if (result !== null)
                        resp = true;
                    console.log(`${zipName} : サーバーからの応答:`, result);
                    //ダウンロード＆ファイル移動
                    let progCnt = 0;
                    for (const nsUrl of nsUrls) {
                        progCnt++;
                        msgElem.innerHTML = `[${nsUrl.nsName}]：ロード中 (${progCnt}/${nsUrls.length})...`;
                        //ダウンロード
                        const resDlImg = await SiteImporter.doFetchDlImg(importer, nsUrl);
                        if (resDlImg !== null)
                            resp = true;
                        console.log(`${nsUrl.ns} : サーバーからの応答:`, resDlImg);
                        //ファイル移動
                        const resMvImg = await SiteImporter.doFetchMvImg();
                        if (resMvImg !== null)
                            resp = true;
                        console.log(`${nsUrl.ns} : サーバーからの応答:`, resMvImg);
                        //フォルダ名を属性別になるようリネーム
                        const resRenImg = await SiteImporter.doFetchRenameImg(nsUrl);
                        if (resRenImg !== null)
                            resp = true;
                        console.log(`${nsUrl.ns} : サーバーからの応答:`, resRenImg);
                        if (progCnt !== nsUrls.length) {
                            const msgbox = new EvonaMessageBox;
                            msgbox.setParent(envSiteZipToolTip.dlg.className);
                            msgbox.setYesNo();
                            const res = await msgbox.showWait(`続けて処理してよろしいですか？`);
                            if (res !== MessageBoxResultTypes.Yes) {
                                break;
                            }
                        }
                    }
                }
                catch (error) {
                    // 万が一、裏のNode.jsサーバーが立ち上がっていなかったり、通信エラーが起きた時の防御壁です
                    console.error("", error);
                }
                fsHtmlMaker.hideFullScreenCss(splashName);
                await msgboxIfFail(resp, envSiteZipToolTip.dlg.className);
            };
        }
        /**キャラ詳細ダウンロードをリクエスト */
        const elemSiteSts = getSiteButton(siteStsCssClassName());
        if (elemSiteSts !== null) {
            elemSiteSts.onclick = async () => {
                console.log(`elemSiteSts.onclick`);
                const msgElem = fsHtmlMaker.getFullScreenMsgElem(splashName);
                fsHtmlMaker.showFullScreenCss(splashName);
                //const importer = ImporterMap.get(env.gameType)!
                const importer = ImporterMap.get(siteGameSelected);
                const nsUrls = importer.nsURLs;
                if (nsUrls === undefined)
                    return;
                let resp = false;
                try {
                    //zip 解凍
                    const zipName = SiteImporter.chPropGetCmdZip(importer);
                    msgElem.innerHTML = `[${zipName}]：解凍中 ...`;
                    const result = await SiteImporter.doFetchUnzipProp(importer);
                    if (result !== null)
                        resp = true;
                    console.log(`${zipName} : サーバーからの応答:`, result);
                    //ファイル移動時の除外リスト作成
                    const result2 = await SiteImporter.doFetchExcludeFileList(importer, nsUrls);
                    if (result2 !== null)
                        resp = true;
                    console.log(`${zipName} : サーバーからの応答:`, result2);
                    //ダウンロード＆ファイル移動
                    let progCnt = 0;
                    for (const nsUrl of nsUrls) {
                        progCnt++;
                        msgElem.innerHTML = `[${nsUrl.nsName}]：ロード中 (${progCnt}/${nsUrls.length})...`;
                        //ダウンロード
                        const resDlProp = await SiteImporter.doFetchDlProp(importer, nsUrl);
                        if (resDlProp !== null)
                            resp = true;
                        console.log(`${nsUrl.ns} : サーバーからの応答:`, resDlProp);
                        //ファイル移動
                        const resMvProp = await SiteImporter.doFetchMvProp();
                        if (resMvProp !== null)
                            resp = true;
                        console.log(`${nsUrl.ns} : サーバーからの応答:`, resMvProp);
                        //フォルダ名を属性別になるようリネーム
                        const resRenProp = await SiteImporter.doFetchRenameProp(nsUrl);
                        if (resRenProp !== null)
                            resp = true;
                        console.log(`${nsUrl.ns} : サーバーからの応答:`, resRenProp);
                        if (progCnt !== nsUrls.length) {
                            const msgbox = new EvonaMessageBox;
                            msgbox.setParent(envSiteZipToolTip.dlg.className);
                            msgbox.setYesNo();
                            const res = await msgbox.showWait(`続けて処理してよろしいですか？`);
                            if (res !== MessageBoxResultTypes.Yes) {
                                break;
                            }
                        }
                    }
                }
                catch (error) {
                    // 万が一、裏のNode.jsサーバーが立ち上がっていなかったり、通信エラーが起きた時の防御壁です
                    console.error("", error);
                }
                fsHtmlMaker.hideFullScreenCss(splashName);
                await msgboxIfFail(resp, envSiteZipToolTip.dlg.className);
            };
        }
    }
    async function msgboxIfFail(resp, parentClassName) {
        if (resp === false) {
            const msgbox = new EvonaMessageBox;
            msgbox.setParent(parentClassName);
            let res = MessageBoxResultTypes.None;
            res = await msgbox.showWait(`サーバーが応答しません！<br>${resp}`);
        }
    }
    function getSiteButton(className) {
        const elems = document.getElementsByClassName(className);
        if (elems.length !== 0) {
            const elem = elems[0];
            return elem;
        }
        return null;
    }
    async function doDropFiles(elem, files) {
        const siteImporter = new SiteImporter();
        if (siteImporter.isAvailFiles(files) === false)
            return false;
        const msgElem = fsHtmlMaker.getFullScreenMsgElem(splashName);
        const msgText = msgElem !== null ? msgElem.innerHTML : ``;
        fsHtmlMaker.showFullScreenCss(splashName);
        /*保留
        const reader = new FileReader();
        reader.addEventListener("loadend", onReaderLoaded)
        */
        /**処理中 */
        siteImporter.onProgress = async (fileInfo, progCnt, lastCnt) => {
            if (msgElem !== null) {
                if (fileInfo !== undefined) {
                    msgElem.innerHTML = `[${fileInfo.name}]：ロード中 (${progCnt}/${lastCnt})...`;
                }
            }
            if (progCnt === lastCnt) {
                /*保留
                reader.removeEventListener("loadend", onReaderLoaded)
                */
                fsHtmlMaker.hideFullScreenCss(splashName);
            }
            return true;
        };
        /**更新確認通知 */
        siteImporter.onCharListUpdate = async () => {
            const parentClassName = envSiteZipToolTip.dlg.className;
            const msgbox = new EvonaMessageBox;
            msgbox.setParent(parentClassName);
            msgbox.setYesNo();
            let res = MessageBoxResultTypes.None;
            let msg = `攻略サイトの更新日時が変更されたようです<br>` +
                `更新しますか？　　　　　　　　　　　　　<br>` +
                `🚀更新する場合、以下の処理を順次実行してください<br>` +
                `・キャラ画像DL、キャラ詳細DL、キャラ詳細パース　`;
            res = await msgbox.showWait(msg);
            return res === MessageBoxResultTypes.Yes ? true : false;
        };
        siteImporter.onCharListNotUpdate = async () => {
            const parentClassName = envSiteZipToolTip.dlg.className;
            const msgbox = new EvonaMessageBox;
            msgbox.setParent(parentClassName);
            let res = MessageBoxResultTypes.None;
            res = await msgbox.showWait(`更新されたキャラ情報はないようでした`);
            return true;
        };
        siteImporter.start(files);
    }
    //関連単語UI（ツールチップUIで作成）
    async function requestCharListSearch(targetChar) {
        chListUI.scrollByKw(targetChar.displayText, fsHtmlMaker);
    }
    async function requestCharListVisible(risticVisible) {
        chListUI.cmdsVisible(risticVisible);
    }
    async function requestSummaryAdd(targetChar) {
        const req = new CharSummaryActionReq();
        await makeNewSummaryChar(targetChar, req);
        await summaryUI.onItemAdd(req);
    }
    const risticWordsUI = new RisticWords();
    risticWordsUI.chSpecList = chSpecList;
    risticWordsUI.charRisticDB = charRisticDB;
    risticWordsUI.fsHtmlMaker = new HtmlMaker;
    risticWordsUI.splashName = `splash-screen`;
    risticWordsUI.requestCharListSearch = requestCharListSearch;
    risticWordsUI.requestCharListVisible = requestCharListVisible;
    risticWordsUI.requestSummaryAdd = requestSummaryAdd;
    const risticToolTip = await risticWordsUI.makeRisticToolTip();
    if (risticToolTip !== null) {
        dockUI.risticToolTip = risticToolTip; //"関連語"タップしたときに閉じる対象のツールチップUI
        chListUI.risticWordsUI = risticWordsUI;
    }
    //キャラ選択UIのオプションUI（ツールチップUIで作成）
    const charFormOption = new FilterOption();
    charFormOption.nsDefines = parseSources;
    charFormOption.comboKwRows = comboKwRows;
    const charOptionToolTip = await charFormOption.makeFilterToolTip(chListFormName, chListFormTitle, chListDlgElem);
    if (charOptionToolTip !== null) {
        chListUI.option = charOptionToolTip; //オプションボタン[O]タップしたときに閉じる対象のツールチップUI
        charFormOption.chListUI = chListUI;
        charOptionToolTip.SetVisible(false);
    }
    //自動選定UIのオプションUI（ツールチップUIで作成）
    const playerFormOption = new FilterOption();
    playerFormOption.nsDefines = parseSources;
    playerFormOption.comboKwRows = comboKwRows;
    const playerOptionToolTip = await playerFormOption.makeFilterToolTip(playerFormName, playerFormTitle, playerDlgElem);
    if (playerOptionToolTip !== null) {
        playerForm.option = playerOptionToolTip; //オプションボタン[O]タップしたときに閉じる対象のツールチップUI
        playerFormOption.playerForm = playerForm;
        playerOptionToolTip.SetVisible(false);
    }
    //対戦UIのオプションUI（ツールチップUIで作成）
    var enemyBoost = 1;
    const onCombatOptionChanged = async function (classify, selectedKey, selectedValue, changed, rowIndex) {
        console.log(`onCombatOptionChanged::radio`, classify, selectedKey, selectedValue);
        const newBoost = BoostMap.get(selectedKey);
        if (newBoost === undefined)
            return;
        enemyBoost = newBoost.ratio;
        await updateCombatResultAll();
    };
    function makeCombatOptionTable() {
        //ブースト率の選択肢
        const boostOpt = new HtmlMakerOptionRadio();
        const boostPairs = new Array;
        for (const [key, item] of BoostMap) {
            boostPairs.push(`${[item.displayText]}/${key}`);
        }
        boostOpt.selectionPair = boostPairs;
        boostOpt.selectedItem = BoostTypes.B100;
        boostOpt.classify = `optionUI-opt-boost`;
        //テーブル作成
        const nCol = 2;
        const table = new HtmlMakerTable();
        table.makeDim(nCol, 1);
        //カラム定義
        setTableRowRadio(0, 0, `ブースト率`, boostOpt, table, itemNameCssClassName(), boostOptCssClassName());
        //行テンプレート初期化
        table.makeRowTemplate(tableRowCssClassName());
        return table;
    }
    function combatOptCssText() {
        const marker = HtmlMakerCommonCss.radioBackClassMark;
        const activeKeyText = HtmlMakerCommonCss.radioActiveKeyText;
        return `
/* タイトル */
[class*="${itemNameCssClassName()}"] {
white-space: nowrap;
}
/* 右側のセルの箱（td、またはその中のdivコンテナ） */
[id*="${boostOptCssClassName()}${marker}"] {
${HtmlMakerCommonCss.radioBackCssText}
width: 92%;        /* 親のツールチップの幅いっぱいに広げる */
}
/* 5つの選択肢（div）それぞれの法律 */
[id*="${boostOptCssClassName()}"] {
${HtmlMakerCommonCss.radioNormCssText}
}
/* 現在選択されているアイテム（selectedItem = '1' など）が光る法律 */
[id*="${boostOptCssClassName()}"].${activeKeyText} {
${HtmlMakerCommonCss.radioActCssText}
}
`.trim();
    }
    async function makeCombatOptionToolTip() {
        const toolTipName = HtmlMakerToolTipMgr.MakeUniqueName(combatFormName, `optionUI`);
        const toolTipFind = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipFind !== null)
            return null;
        HtmlMakerToolTipMgr.Add(toolTipName);
        const toolTipNew = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipNew !== null) {
            const uiLabelText = combatFormTitle;
            const table = await makeCombatOptionTable();
            toolTipNew.name = toolTipName;
            toolTipNew.InvisibleAll();
            toolTipNew.SetTitle(uiLabelText + `：オプション`);
            toolTipNew.SetTable(table, combatOptCssText());
            toolTipNew.onChangedTableSelection = onCombatOptionChanged;
            toolTipNew.MgrType = HtmlMakerToolTipMgrTypes.NotMgr;
            toolTipNew.applyCss();
            toolTipNew.Show(combatDlgElem.className);
            toolTipNew.SetVisible(false);
            toolTipNew.EnableEvents();
        }
        return toolTipNew;
    }
    const combatOptionToolTip = await makeCombatOptionToolTip();
    if (combatOptionToolTip !== null) {
        combatResult.option = combatOptionToolTip; //オプションボタン[O]タップしたときに閉じる対象のツールチップUI
    }
    if (env.action !== EvonaActions.None) {
        setVisible(chListDlgElem.parentElement, false);
    }
    setVisible(playerDlgElem.parentElement, false);
    setVisible(combatDlgElem.parentElement, false);
    fsHtmlMaker.hideFullScreenCss(splashName);
    //ローカル動画再生（videoタグ）
    function isAvailVideoFiles(files) {
        let isOk = false;
        for (const file of files) {
            if (file.type === `video/mp4`)
                return true;
            if (file.type === `audio/mpeg`)
                return true;
        }
        return isOk;
    }
    async function onVideoLoadedMetadata(event) {
        console.log(`**onVideoLoadedMetadata**`, event);
    }
    async function onCanPlay(event) {
        console.log(`**onCanPlay**`, event);
    }
    async function onCanPlayThrough(event) {
        console.log(`**onCanPlayThrough**`, event);
        isSeekEnd = false;
    }
    async function onPause(event) {
        console.log(`**onPause**`, event);
        const videoElem = event.target;
        const pauseTime = videoElem.currentTime;
        const duration = videoElem.duration;
        console.log(`**onPause**`, pauseTime, duration);
        if (pauseTime === duration)
            return; //最後まで再生してポーズした場合は、NOP
        if (isSeekEnd) {
            isSeekEnd = false;
            return;
        }
        let isDl = isPinP;
        if (!isPinP) {
            const res = await ClipboardHelper.put(`${videoFile}\t${pauseTime}`);
            isDl = !res;
        }
        if (isDl) {
            const pauseInfo = `${videoFile}\t${pauseTime}`;
            downloadVideoInfoFile(`pauseInfo.txt`, pauseInfo);
        }
    }
    async function onVideoEnded(event) {
        await playNext();
    }
    async function onEnterPictureInPicture(event) {
        isPinP = true;
    }
    async function onLeavePictureInPicture(event) {
        isPinP = false;
    }
    async function onSeeking(event) {
        //console.log(`**onSeeking**`, event)
    }
    async function onSeeked(event) {
        console.log(`**onSeeked**`, event);
        isSeekEnd = true;
    }
    async function onVideoError(event) {
        console.log(`**onVideoError**`, event);
    }
    function setSrc(file) {
        videoFile = file.name;
        const url = URL.createObjectURL(file);
        videoElem.src = url;
        repeatMap.set(file, url);
    }
    function revokeSrc() {
        const urls = repeatMap.entries();
        let existFile = null;
        for (const [file, url] of urls) {
            if (file.name === videoFile) {
                URL.revokeObjectURL(url);
                existFile = file;
                break;
            }
        }
        return existFile;
    }
    function shuffle() {
        playList.sort(() => Math.random() - 0.5);
    }
    async function playNext() {
        const existFile = revokeSrc();
        if (playList.length === 0 && !canRepaet) {
            videoFile = ``;
            return;
        }
        const videoInfo = playList[0];
        playList.splice(0, 1);
        setSrc(videoInfo);
        await videoElem.play();
        shuffle();
        if (canRepaet) {
            if (existFile !== null)
                playList.push(existFile);
            else {
                console.log(`**bug!!**`);
            }
        }
        if (playListCtl !== null) {
            const texts = new Array;
            texts.push(`${videoFile} ${currentPlayMark}`);
            playList.forEach(file => texts.push(fileToPlayDispText(file)));
            playListCtl.UpdateItems(texts);
        }
    }
    function downloadVideoInfoFile(filename, content) {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    function fileToPlayDispText(file) {
        let name = file.name;
        if (name.endsWith(`.mp3`)) {
            name = name.substring(0, name.length - 4);
        }
        if (name.endsWith(`.mp4`)) {
            name = name.substring(0, name.length - 4);
        }
        return `${name} [${file.type}]`;
    }
    function videoDropVideoCssClassName() {
        return `evonaVideo-drop`;
    }
    let canRepaet = true;
    let isPinP = false;
    let isSeekEnd = false;
    let videoFile = ``;
    let playList = new Array;
    let repeatMap = new Map;
    const videoCssName = videoDropVideoCssClassName();
    const videoElem = document.createElement(`video`);
    videoElem.className = videoCssName;
    videoElem.id = videoCssName;
    videoElem.style.display = `none`;
    videoElem.style.width = `98vw`; //`100vw`
    videoElem.style.height = `98vh`; //`100vh`
    //videoElem.width = 100
    //videoElem.height = 100
    //videoElem.autoplay = true
    videoElem.controls = true;
    videoElem.addEventListener(`loadedmetadata`, onVideoLoadedMetadata);
    videoElem.addEventListener(`canplay`, onCanPlay);
    videoElem.addEventListener(`canplaythrough`, onCanPlayThrough);
    videoElem.addEventListener(`pause`, onPause);
    videoElem.addEventListener(`ended`, onVideoEnded);
    videoElem.addEventListener(`enterpictureinpicture`, onEnterPictureInPicture);
    videoElem.addEventListener(`leavepictureinpicture`, onLeavePictureInPicture);
    videoElem.addEventListener(`seeking`, onSeeking);
    videoElem.addEventListener(`seeked`, onSeeked);
    videoElem.addEventListener(`error`, onVideoError);
    document.body.appendChild(videoElem);
    dockUI.videoPlay = videoElem;
    const drogdrop = new DragDropHelper();
    drogdrop.onDropFiles = doDropVideoFiles;
    drogdrop.Start(videoCssName);
    async function doDropVideoFiles(elem, files) {
        if (isAvailVideoFiles(files) === false)
            return;
        let isFirstPlay = playList.length === 0 && videoFile === ``;
        let isFirstMsg = true;
        if (!isFirstPlay) {
            const parentClassName = videoElem.className;
            const msgbox = new EvonaMessageBox;
            msgbox.setParent(parentClassName);
            msgbox.setYesNo();
            const res = await msgbox.showWait(`再生リストを空にして追加しますか？`);
            if (res === MessageBoxResultTypes.Yes) {
                playList.splice(0, playList.length);
                isFirstPlay = true;
                isFirstMsg = false;
            }
        }
        for (let iList = 0; iList < files.length; iList++) {
            const file = files[iList];
            let isOk = false;
            if (file.type === `video/mp4`)
                isOk = true;
            else if (file.type === `audio/mpeg`)
                isOk = true;
            if (!isOk)
                continue;
            playList.push(file);
        }
        shuffle();
        const file = playList[0];
        if (isFirstPlay) {
            videoFile = file.name;
            let currentTime = 0;
            if (isFirstMsg) {
                await ClipboardHelper.put(`${videoFile}`);
                const parentClassName = videoElem.className;
                const msgbox = new EvonaMessageBox;
                msgbox.setParent(parentClassName);
                let res = MessageBoxResultTypes.None;
                res = await msgbox.showWait(`${videoFile}<br>ファイル名を検索して続きの時間をコピーすると再開します`);
                const currentTimeText = await ClipboardHelper.get();
                currentTime = isNaN(Number(currentTimeText)) ? 0 : Number(currentTimeText);
            }
            setSrc(file);
            videoElem.currentTime = currentTime;
            await videoElem.play();
            playList.splice(0, 1);
        }
        setPlayListItems = setVideoPlayListItems;
        if (playListCtl !== null) {
            //表示中なら内容を更新
            makePlayListCtl();
        }
    }
    //
    let videoToolTip = null;
    let playEditToolTip = null;
    let playListCtl = null;
    const currentPlayMark = `🎦`;
    let setPlayListItems;
    function setVideoPlayListItems(choiceItems) {
        let playIndex = 0;
        if (videoFile !== ``) {
            const itemPlay = new HtmlMakerChoiceItem();
            itemPlay.key = `playListCtl-${playIndex}`;
            itemPlay.text = `${videoFile} ${currentPlayMark}`;
            choiceItems.push(itemPlay);
        }
        for (const file of playList) {
            playIndex++;
            const itemMedia = new HtmlMakerChoiceItem();
            itemMedia.key = `playListCtl-${playIndex}`;
            itemMedia.text = fileToPlayDispText(file);
            choiceItems.push(itemMedia);
        }
    }
    function makePlayListCtl() {
        const dlg = videoToolTip.dlg;
        const btn = videoListButton;
        //const btn: HTMLButtonElement = dockUI.selectedPlayer === videoElem ? optListButton! : optNextButton!
        if (playListCtl !== null) {
            playListCtl.dispose();
            if (btn !== null) {
                const htmlMaker = new HtmlMaker();
                htmlMaker.EnableElem(btn, true);
            }
        }
        const choiceItems = new Array;
        if (setPlayListItems !== undefined)
            setPlayListItems(choiceItems);
        const choice = new HtmlMakerChoice();
        choice.itemWordWrap = true;
        choice.itemWidth = 200;
        choice.twinText = `❌`;
        choice.setChoiceItems(choiceItems, HtmlMakerChoiceTwinModes.VisLast);
        choice.headerTitle = `プレイリスト`;
        choice.onCancel = onVideoListButtonCancel;
        choice.callerElem = btn;
        const htmlMaker = new HtmlMaker();
        if (htmlMaker.IsEnabledElem(btn) === false)
            return;
        htmlMaker.EnableElem(btn, false);
        const rcDlg = htmlMaker.GetRect(dlg);
        const rcBtn = htmlMaker.GetRect(btn);
        const parentName = dlg.id;
        choice.setListener(`${parentName}-choice`, parentName, `${parentName}-playSelect`, HtmlMakerChoiceHeaderModes.Visible);
        choice.enableOverlay(false);
        choice.applyCss();
        choice.show(`${parseInt(rcBtn.left) - parseInt(rcDlg.left) - 1}`, `${parseInt(rcBtn.top) - parseInt(rcDlg.top) + parseInt(rcBtn.height)}`);
        //choice.moveLeftByWidth(parseInt(rcBtn.left) - parseInt(rcDlg.left) - 1 + parseInt(rcBtn.width))
        choice.enableEvents(
        /*onSelect*/
        async (ev) => {
            //console.log(`[onSelect] ${ev.callerName} ${ev.result}`)
            //choice.dispose()
            if (choice.isCallerTwin(ev.callerName)) {
            }
            else {
                if (ev.result !== ``) {
                    const splited = ev.result.split(`-`);
                    if (splited.length >= 2) {
                        const existFile = revokeSrc();
                        const playIndex = Number(splited[splited.length - 1]);
                        const videoInfo = playIndex !== 0 ? playList[playIndex - 1] : existFile;
                        setSrc(videoInfo);
                        await videoElem.play();
                        console.log(`**update before**`, playList);
                        playList[playIndex - 1] = existFile;
                        console.log(`**update after** `, playList);
                    }
                }
            }
            htmlMaker.EnableElem(btn, true);
        });
        playListCtl = choice;
    }
    //
    function setPlayEditTableRow(cellIndex, rowIndex, title, url, table) {
        const titleCssClassName = plEditTitleCssName();
        const inputTitle = new HtmlMakerOptionInput();
        inputTitle.disableKeyDown = false;
        inputTitle.enableClicked = true;
        inputTitle.placeholder = `動画タイトル`;
        inputTitle.value = title;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(inputTitle);
        table.getCell(cellIndex, rowIndex).className = titleCssClassName;
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        cellIndex++;
        const urlCssClassName = plEditUrlCssName();
        const inputUrl = new HtmlMakerOptionInput();
        inputUrl.disableKeyDown = false;
        inputUrl.enableClicked = true;
        inputUrl.placeholder = `動画VID`;
        inputUrl.value = url;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(inputUrl);
        table.getCell(cellIndex, rowIndex).className = urlCssClassName;
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        cellIndex++;
        const upCssClassName = plEditUpCssName();
        table.getCell(cellIndex, rowIndex).typeInfo.setButton(`🔼`);
        table.getCell(cellIndex, rowIndex).className = upCssClassName;
        table.getCell(cellIndex, rowIndex).tdName = `td_` + upCssClassName;
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        cellIndex++;
        const dnCssClassName = plEditDnCssName();
        table.getCell(cellIndex, rowIndex).typeInfo.setButton(`🔽`);
        table.getCell(cellIndex, rowIndex).className = dnCssClassName;
        table.getCell(cellIndex, rowIndex).tdName = `td_` + dnCssClassName;
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    }
    function makePlayEditTable() {
        const nPl = 300;
        //テーブル作成
        const nCol = 4;
        const table = new HtmlMakerTable();
        table.makeDim(nCol, nPl);
        //カラム定義
        for (let iPl = 0; iPl < nPl; iPl++) {
            let title = ``;
            let url = ``;
            if (iPl < ytInfos.length) {
                const info = ytInfos[iPl];
                title = info.title;
                url = ytVid(info.url);
            }
            setPlayEditTableRow(0, iPl, title, url, table);
        }
        //行テンプレート初期化
        table.makeRowTemplate(plEditTableRowCssName());
        return table;
    }
    const onPlayEditActionReq = async function () {
        if (playEditToolTip === null)
            return;
        const rows = playEditToolTip.TableRows();
        if (rows === null)
            return;
        const plArray = new Array;
        for (const row of rows) {
            const texts = playEditToolTip.RowTexts(row);
            const info = new ytInfo;
            info.title = texts.get(plEditTitleCssName()) || ``;
            info.url = texts.get(plEditUrlCssName()) || ``;
            plArray.push(info);
        }
        const plJson = JSON.stringify(plArray, null, 2);
        const plFile = `playList.ytpl`;
        downloadVideoInfoFile(plFile, plJson);
        const msgbox = new EvonaMessageBox;
        await msgbox.showWait(`ダウンロードフォルダへプレイリストを保存しました。<br>${plFile}`);
    };
    const onPlayEditButtonClick = async (rowindex, btn, div, tbl, row, col) => {
        console.log(`onPlayEditButtonClick`, rowindex, btn, div, tbl, row, col);
        if (rowindex <= -1)
            return;
        if (playEditToolTip === null)
            return;
        const rows = playEditToolTip.TableRows();
        if (rows === null)
            return;
        const titleCss = plEditTitleCssName();
        const urlCss = plEditUrlCssName();
        function swap(row, ofs) {
            const row2 = rows[row.rowIndex + ofs];
            const texts1 = playEditToolTip.RowTexts(row);
            const texts2 = playEditToolTip.RowTexts(row2);
            const title1 = texts1.get(titleCss) || ``;
            const url1 = texts1.get(urlCss) || ``;
            const title2 = texts2.get(titleCss) || ``;
            const url2 = texts2.get(urlCss) || ``;
            const elems1 = playEditToolTip.RowElems(row.rowIndex);
            const elems2 = playEditToolTip.RowElems(row.rowIndex + ofs);
            const title1Elem = elems1.get(titleCss) || null;
            const url1Elem = elems1.get(urlCss) || null;
            const title2Elem = elems2.get(titleCss) || null;
            const url2Elem = elems2.get(urlCss) || null;
            if (title1Elem && url1Elem && title2Elem && url2Elem) {
                title1Elem.value = title2;
                url1Elem.value = url2;
                title2Elem.value = title1;
                url2Elem.value = url1;
            }
        }
        switch (btn.className) {
            case plEditUpCssName():
                swap(row, -1);
                break;
            case plEditDnCssName():
                swap(row, 1);
                break;
        }
    };
    async function makePlayEditCtlToolTip() {
        const toolTipName = HtmlMakerToolTipMgr.MakeUniqueName(`play`, `edit`);
        const toolTipFind = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipFind !== null)
            return null;
        HtmlMakerToolTipMgr.Add(toolTipName, HtmlMakerToolTipCloseTypes.InVisible);
        const toolTipNew = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipNew !== null) {
            const table = await makePlayEditTable();
            let uiLabelText = `プレイリスト編集`;
            toolTipNew.name = toolTipName;
            toolTipNew.SetTitle(uiLabelText);
            toolTipNew.EnableAction(`保存`, onPlayEditActionReq);
            //toolTipNew.InvisibleAll()
            toolTipNew.VisibleCpBtn(false);
            toolTipNew.VisibleMgrBtn(false);
            toolTipNew.SetTable(table, playEditCssText());
            toolTipNew.heightPx = `400`;
            toolTipNew.applyCss();
            toolTipNew.MgrType = HtmlMakerToolTipMgrTypes.NotMgr;
            toolTipNew.Show(document.body); //videoElem.className
            toolTipNew.SetVisible(false);
            toolTipNew.EnableEvents();
            toolTipNew.onButtonClicked = onPlayEditButtonClick;
            //toolTipNew.EnableFirstVisible(onVideoOnFirstVisible)
            //toolTipNew.onChangeVisible = onVideoOnChangeVisible
            const rows = toolTipNew.TableRows();
            if (rows !== null) {
                const firstRow = toolTipNew.RowElems(rows[0].rowIndex);
                if (firstRow !== null) {
                    const elem = firstRow.get(plEditUpCssName());
                    if (elem !== undefined) {
                        elem.style.display = `none`;
                    }
                }
                const lastRow = toolTipNew.RowElems(rows[rows.length - 1].rowIndex);
                if (lastRow !== null) {
                    const elem = lastRow.get(plEditDnCssName());
                    if (elem !== undefined) {
                        elem.style.display = `none`;
                    }
                }
            }
        }
        return toolTipNew;
    }
    function playEditUpdate(ytArray) {
        if (playEditToolTip === null)
            return;
        const rows = playEditToolTip.TableRows();
        if (rows === null)
            return;
        const titleCss = plEditTitleCssName();
        const urlCss = plEditUrlCssName();
        let iPl = 0;
        for (const row of rows) {
            const elems1 = playEditToolTip.RowElems(row.rowIndex);
            const title1Elem = elems1.get(titleCss) || null;
            const url1Elem = elems1.get(urlCss) || null;
            if (title1Elem && url1Elem) {
                if (iPl < ytArray.length) {
                    title1Elem.value = ytArray[iPl].title;
                    url1Elem.value = ytVid(ytArray[iPl].url); //ytArray[iPl].url
                }
                else {
                    title1Elem.value = ``;
                    url1Elem.value = ``;
                }
            }
            iPl++;
        }
    }
    function playEditCssText() {
        const btnUpName = plEditUpCssName();
        const btnDnName = plEditDnCssName();
        const btnCss = `
background: ${HtmlMakerCommonCss.normBkColor};
color: black;
border: 1px solid #777;
border-radius: 3px;
width: 24px;
height: 24px;
display: inline-flex;
align-items: center;
justify-content: center;
font-size: 12px;
padding-bottom: 4px; /* 下にパディングを入れて、文字を上に押し上げる */
cursor: pointer;
transition: background 0.2s;
`;
        return `
[class*="${btnUpName}"] {
${btnCss}
}
[class*="${btnUpName}"]:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
[class*="${btnDnName}"] {
${btnCss}
}
[class*="${btnDnName}"]:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
`.trim();
    }
    function plEditTableRowCssName() {
        return `playEdit-row`;
    }
    function plEditTitleCssName() {
        return `playEdit-title`;
    }
    function plEditUrlCssName() {
        return `playEdit-url`;
    }
    function plEditUpCssName() {
        return `playEdit-up`;
    }
    function plEditDnCssName() {
        return `playEdit-down`;
    }
    playEditToolTip = await makePlayEditCtlToolTip();
    //
    async function onVideoOnFirstVisible() {
        if (videoToolTip === null)
            return;
        const dlg = videoToolTip.dlg;
        const rcDlg = dlg.getBoundingClientRect();
        if (dockUI.selectedPlayer === videoElem) {
            const rcVideo = videoElem.getBoundingClientRect();
            dlg.style.left = `${rcVideo.left + rcDlg.width / 2 + 20}px`;
            dlg.style.top = `${rcVideo.top + 20}px`;
        }
        else {
            const rcVideo = document.getElementById(ytElemId).getBoundingClientRect();
            dlg.style.left = `${rcVideo.left + rcDlg.width / 2 + 20}px`;
            dlg.style.top = `${rcVideo.top + 20}px`;
            setPlayListItems = setYtPlayListItems;
            makePlayListCtl();
            ytPlayListUpdate();
            if (playListCtl !== null)
                playListCtl.setVisible(false);
            if (playEditToolTip !== null)
                playEditToolTip.SetVisible(false);
        }
    }
    async function onVideoOnChangeVisible(toTrue) {
        if (dockUI.selectedPlayer === videoElem) {
            HtmlMakerMisc.SetVisible(dockUI.ytPlayer, false);
        }
        else {
            HtmlMakerMisc.SetVisible(videoElem, false);
        }
        HtmlMakerMisc.SetVisible(videoOpenButton, true);
        //Ytのときだけ表示
        const visible = dockUI.selectedPlayer === dockUI.ytPlayer ? true : false;
        HtmlMakerMisc.SetVisible(videoEditButton, visible);
        //playEditToolTip!.SetVisible(visible)
    }
    let openUI = null;
    const onClickOpenBtn = async (event) => {
        if (openUI !== null)
            return;
        openUI = new FileSelect();
        if (dockUI.selectedPlayer === dockUI.ytPlayer) {
            openUI.accept = `.ytpl`;
            openUI.multiple = false;
        }
        openUI.onSelect = async (files) => {
            if (videoOpenButton === null)
                return;
            if (dockUI.selectedPlayer === videoElem) {
                await doDropVideoFiles(videoOpenButton, files);
            }
            else {
                const jsonURL = URL.createObjectURL(files[0]);
                const dataArray = await env.loadJson(jsonURL);
                URL.revokeObjectURL(jsonURL);
                console.log(dataArray);
                // ⚡️ 鉄壁の検査線：1件目のデータを取り出して、.ytpl 特有のプロティ（title）があるか逆引きする！
                if (Array.isArray(dataArray) && dataArray.length > 0 && !("title" in dataArray[0])) {
                    console.error("❌【防衛線発火】ファイルはJSONだけど、中身が.ytplデータじゃありません！");
                    const msgbox = new EvonaMessageBox();
                    await msgbox.showWait("選択されたファイルの形式（内容）が正しくありません。");
                    return; // 処理をここで安全にブレーキ（遮断）して、クラッシュを未然に防ぎます！
                }
                const ytArray = dataArray;
                ytInfos.splice(0, ytInfos.length);
                for (const info of ytArray) {
                    info.url = convYtUrlPrefix(info.url);
                    if (info.url.length === 0)
                        continue;
                    ytInfos.push(info);
                }
                ytFirstPlay = true;
                ytFirstSeek = -1;
                ytIndex = 0;
                ytDestory();
                await createYtPlayer();
                setPlayListItems = setYtPlayListItems;
                makePlayListCtl();
                ytPlayListUpdate();
                playEditUpdate(ytInfos);
            }
            openUI = null;
        };
        openUI.onCancel = async () => {
            openUI = null;
        };
        openUI.parentElem = videoOpenButton;
        openUI.Open();
    };
    const onClickBackBtn = async (event) => {
        if (dockUI.selectedPlayer === videoElem)
            videoElem.currentTime = 0;
        else {
            ytPlayer.seekTo(0, true);
            ytPlayer.playVideo();
        }
    };
    const onClickNextBtn = async (event) => {
        if (dockUI.selectedPlayer === videoElem)
            await playNext();
        else
            await ytPlayNext();
    };
    const onClickListBtn = async (event) => {
        makePlayListCtl();
    };
    const onClickEditBtn = async (event) => {
        if (playEditToolTip === null)
            return;
        const visible = playEditToolTip.GetVisible();
        playEditToolTip.SetVisible(!visible);
    };
    const onVideoListButtonCancel = async (choice, callerElem) => {
        choice.dispose();
        if (callerElem !== null) {
            const htmlMaker = new HtmlMaker();
            htmlMaker.EnableElem(callerElem, true);
        }
    };
    let videoOpenButton = null;
    let videoBackButton = null;
    let videoNextButton = null;
    let videoListButton = null;
    let videoEditButton = null;
    function makeVideoCtlBtns() {
        if (videoToolTip === null)
            return;
        if (videoToolTip.actDiv === null)
            return;
        const actDiv = videoToolTip.actDiv;
        const actDivParent = actDiv.parentElement;
        const openBtnName = `${actDiv.className}-open`;
        const backBtnName = `${actDiv.className}-back`;
        const nextBtnName = `${actDiv.className}-next`;
        const listBtnName = `${actDiv.className}-list`;
        const editBtnName = `${actDiv.className}-edit`;
        const openButton = document.createElement("button");
        openButton.id = openBtnName;
        openButton.className = openBtnName;
        openButton.innerHTML = FileSelect.emoji1;
        openButton.title = `FileSelect`;
        actDivParent.appendChild(openButton);
        openButton.addEventListener("click", onClickOpenBtn);
        const backButton = document.createElement("button");
        backButton.id = backBtnName;
        backButton.className = backBtnName;
        backButton.innerHTML = `⏮`;
        backButton.title = `Back`;
        actDivParent.appendChild(backButton);
        backButton.addEventListener("click", onClickBackBtn);
        const nextButton = document.createElement("button");
        nextButton.id = nextBtnName;
        nextButton.className = nextBtnName;
        nextButton.innerHTML = `⏭`;
        nextButton.title = `Next`;
        actDivParent.appendChild(nextButton);
        nextButton.addEventListener("click", onClickNextBtn);
        const listButton = document.createElement("button");
        listButton.id = listBtnName;
        listButton.className = listBtnName;
        listButton.innerHTML = `🎦`;
        listButton.title = `PlayList`;
        actDivParent.appendChild(listButton);
        listButton.addEventListener("click", onClickListBtn);
        const editButton = document.createElement("button");
        editButton.id = editBtnName;
        editButton.className = editBtnName;
        editButton.innerHTML = `🎹`;
        editButton.title = `EditPlayList`;
        actDivParent.appendChild(editButton);
        editButton.addEventListener("click", onClickEditBtn);
        videoOpenButton = openButton;
        videoBackButton = backButton;
        videoNextButton = nextButton;
        videoListButton = listButton;
        videoEditButton = editButton;
    }
    function videoCtlCssText() {
        const btnOpenName = `${videoOpenButton.className}`;
        const btnBackName = `${videoBackButton.className}`;
        const btnNextName = `${videoNextButton.className}`;
        const btnListName = `${videoListButton.className}`;
        const btnEditName = `${videoEditButton.className}`;
        const btnCss = `
background: ${HtmlMakerCommonCss.normBkColor};
color: black;
border: 1px solid #777;
border-radius: 3px;
width: 24px;
height: 24px;
display: inline-flex;
align-items: center;
justify-content: center;
font-size: 12px;
padding-bottom: 4px; /* 下にパディングを入れて、文字を上に押し上げる */
cursor: pointer;
transition: background 0.2s;
`;
        return `
#${btnOpenName} {
${btnCss}
}
#${btnOpenName}:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
#${btnBackName} {
${btnCss}
}
#${btnBackName}:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
#${btnNextName} {
${btnCss}
}
#${btnNextName}:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
#${btnListName} {
${btnCss}
}
#${btnListName}:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
#${btnEditName} {
${btnCss}
}
#${btnEditName}:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
`.trim();
    }
    async function makeVideoCtlToolTip() {
        const toolTipName = HtmlMakerToolTipMgr.MakeUniqueName(`video`, `controls`);
        const toolTipFind = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipFind !== null)
            return null;
        HtmlMakerToolTipMgr.Add(toolTipName, HtmlMakerToolTipCloseTypes.None);
        const toolTipNew = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipNew !== null) {
            videoToolTip = toolTipNew;
            makeVideoCtlBtns();
            let uiLabelText = ``;
            toolTipNew.name = toolTipName;
            toolTipNew.SetTitle(uiLabelText);
            toolTipNew.InvisibleAll();
            //toolTipNew.VisibleCpBtn(false)
            //toolTipNew.VisibleActBtn(false)
            toolTipNew.SetMemo(``, videoCtlCssText());
            toolTipNew.applyCss();
            toolTipNew.MgrType = HtmlMakerToolTipMgrTypes.NotMgr;
            toolTipNew.heightPx = `100`;
            toolTipNew.Show(document.body); //videoElem.className
            toolTipNew.SetVisible(false);
            toolTipNew.EnableEvents();
            toolTipNew.EnableFirstVisible(onVideoOnFirstVisible);
            toolTipNew.onChangeVisible = onVideoOnChangeVisible;
        }
        return toolTipNew;
    }
    videoToolTip = await makeVideoCtlToolTip();
    if (videoToolTip !== null) {
        dockUI.videoToolTip = videoToolTip; //ツールチップUI
        if (env.action === EvonaActions.VideoPlay) {
            dockUI.selectVideoPlay();
        }
    }
    /*YouTube再生（iframe）
    const iframeElem = document.createElement(`iframe`)
    const iframeCssName = `youtube-test`
    iframeElem.className = iframeCssName
    iframeElem.id = iframeCssName
    iframeElem.style.display = ``   //none
    iframeElem.style.width = `100vw`
    iframeElem.style.height = `100vh`
    iframeElem.src = `https://youtube.com/embed/_ey15xZIZxw`
    iframeElem.title = "YouTube video player"
    iframeElem.frameBorder = "0"
    iframeElem.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    iframeElem.allowFullscreen = true
    document.body.appendChild(iframeElem)
    */
    /*YouTube再生（YouTube API） */
    function ytVid(url) {
        const pos = url.indexOf(`?v=`);
        if (pos === -1)
            return ``;
        return url.substring(pos + 3);
    }
    /*
    for (const info of ytInfos) {
        console.log(ytVid(info.url))
    }
    */
    //YouTube再生（YouTube API）
    const ytElemId = 'youtube-player'; //このdivを利用して再生動画を表示
    // 1. すでに画面に同じIDのdivがない場合だけ作成して追加する
    if (!document.getElementById(ytElemId)) {
        const placeholderDiv = document.createElement('div');
        placeholderDiv.id = ytElemId;
        placeholderDiv.style.display = 'none';
        placeholderDiv.style.width = '100vw';
        placeholderDiv.style.height = '100vh';
        document.body.appendChild(placeholderDiv);
        dockUI.ytElemId = ytElemId;
        dockUI.ytPlayer = placeholderDiv;
    }
    // 2. YouTube APIのスクリプトを動的に読み込む
    const ytApiScrElem = document.createElement('script');
    ytApiScrElem.src = 'https://youtube.com/iframe_api'; // ← ここを正しく修正しました
    document.head.appendChild(ytApiScrElem);
    // YouTubeプレイヤー本体（再生と終了イベント待ち）
    let ytFirstPlay = true;
    let ytFirstSeek = -1;
    let ytIndex = 0;
    let ytPlayer = null;
    async function createYtPlayer() {
        if (ytInfos.length === 0) {
            const msgbox = new EvonaMessageBox;
            await msgbox.showWait(`「${FileSelect.emoji1}」をタップしてプレイリストを選択してください。`);
            return;
        }
        if (ytFirstPlay) {
            ytFirstPlay = false;
            const currentPlayText = await ClipboardHelper.get();
            if (currentPlayText !== null && currentPlayText !== ``) {
                const currentPlay = currentPlayText?.split(`\t`);
                if (currentPlay.length === 2) {
                    const currentTitle = currentPlay[0];
                    let currentTime = isNaN(Number(currentPlay[1])) ? 0 : Number(currentPlay[1]);
                    const exist = ytInfos.find(info => info.title === currentTitle);
                    if (exist !== undefined) {
                        const parentClassName = ytElemId;
                        const msgbox = new EvonaMessageBox;
                        msgbox.setParent(parentClassName);
                        msgbox.setYesNo();
                        let res = MessageBoxResultTypes.None;
                        res = await msgbox.showWait(`${currentTitle}<br>続きを再開しますか？`);
                        if (res === MessageBoxResultTypes.Yes) {
                            ytFirstSeek = currentTime;
                            ytIndex = ytInfos.findIndex(info => info.title === currentTitle);
                        }
                    }
                }
            }
        }
        const info = ytInfos[ytIndex];
        const vid = ytVid(info.url);
        ytPlayer = new YT.Player(ytElemId, {
            width: '100%',
            height: '100%',
            videoId: vid, // 動画IDを指定（例：'_ey15xZIZxw'）
            playerVars: {
                playsinline: 1,
                // 自動再生（テスト時はミュートとセットにすると確実です）
                autoplay: 1,
                mute: 0
            },
            events: {
                onReady: () => {
                    console.log('YouTubeプレイヤーの準備が完了し、動画が表示されました！');
                    if (ytFirstSeek > 0) {
                        ytPlayer.seekTo(ytFirstSeek, true);
                        ytFirstSeek = -1;
                    }
                    ytPlayer.playVideo();
                },
                onStateChange: async (event) => {
                    //console.log('現在の状態コード:', event.data);
                    switch (event.data) {
                        case 0: //再生終了：YT.PlayerState.ENDED
                            console.log('動画の再生が終了しました！');
                            //alert('再生が終了しました');
                            await ytPlayNext();
                            break;
                        case 2: //一時停止：YT.PlayerState.PAUSED
                            const pauseTime = ytPlayer.getCurrentTime();
                            const yti = ytInfos[ytIndex];
                            const res = await ClipboardHelper.put(`${yti.title}\t${pauseTime}`);
                            break;
                    }
                }
            }
        });
    }
    // 3. APIの準備が完了したときに自動的に呼ばれる関数
    window.onYouTubeIframeAPIReady = () => {
        console.log('APIの初期化が始まりました');
        dockUI.ytStartPlay = createYtPlayer;
        switch (env.action) {
            case EvonaActions.YtPlay:
                dockUI.selectYtPlay();
                break;
        }
    };
    function ytDestory() {
        if (ytPlayer !== null) {
            ytPlayer.destroy();
            ytPlayer = null;
        }
    }
    async function ytPlayNext() {
        ytDestory();
        ytIndex++;
        if (ytIndex < ytInfos.length) {
            await createYtPlayer();
            ytPlayListUpdate();
        }
    }
    function ytPlayListUpdate() {
        if (playListCtl !== null) {
            const texts = new Array;
            let playIndex = -1;
            for (const info of ytInfos) {
                playIndex++;
                if (ytIndex === playIndex) {
                    texts.push(`${info.title} ${currentPlayMark}`);
                }
                else {
                    texts.push(`${info.title}`);
                }
                playListCtl.UpdateItems(texts);
                playListCtl.scroll(ytIndex);
            }
        }
    }
    function setYtPlayListItems(choiceItems) {
        let playIndex = -1;
        for (const info of ytInfos) {
            playIndex++;
            const itemMedia = new HtmlMakerChoiceItem();
            itemMedia.key = `${info.url}-${playIndex}`;
            itemMedia.text = `${info.title} ${currentPlayMark}`;
            choiceItems.push(itemMedia);
        }
    }
    //ゲームパッド
    /*
    const gamepad = new GamepadHelper()
    gamepad.usingButtonChanged(5, on5btnChanged)    //L上
    gamepad.usingButtonChanged(6, on6btnChanged)    //R上
    gamepad.usingButtonChanged(12, on12btnChanged)
    gamepad.enableGamePad()
    function on5btnChanged(item: GamepadHelperItem) {
        console.log(`**on5btnChanged**`, item)
    }
    function on6btnChanged(item: GamepadHelperItem) {
        console.log(`**on6btnChanged**`, item)
    }
    function on12btnChanged(item: GamepadHelperItem) {
        console.log(`**on12btnChanged**`, item)
    }
    */
    //UIアクティブ化要求
    chListUI.requestActivate = requestActivate;
    summaryUI.requestActivate = requestActivate;
    playerForm.requestActivate = requestActivate;
    enemyForm.requestActivate = requestActivate;
    combatResult.requestActivate = requestActivate;
    HtmlMakerToolTipMgr.requestActivate = requestActivate;
    async function requestActivate(dlg) {
        console.log(`[${dlg.className}] requestActivate`);
        dockUI.activateItem(dlg);
    }
    //編成内キャラスコア計算
    function toScoreRes(formMake) {
        const versusResult = new VersusResult();
        const groupRow = new VersusGroupRow;
        const formSet = formMake.formation;
        if (formSet.uiInfo.name === playerFormName) {
        }
        if (formSet.uiInfo.name === enemyFormName) {
        }
        if (formMake.scsList === undefined) {
            console.log(`[${formMake.formation.uiInfo.name}] 対戦予想結果の作成は工事中です`);
        }
        let id = 0;
        for (const fItem of formSet.items) {
            if (formMake.scsList === undefined)
                continue;
            let optListEnable = true;
            if (formMake.formationOptList === undefined ||
                formMake.formationOptList !== undefined && formMake.formationOptList.length < 1) {
                optListEnable = false;
                if (formSet.uiInfo.name === enemyFormName) {
                    console.log(`[${formMake.formation.uiInfo.name}] 敵編成の「スコアの自動選定」は工事中です`);
                }
            }
            const scSet = formMake.scsList[id];
            if (scSet.ns === CharNameSpaceTypes.None) {
                const ns = fItem.ch.ns;
                scSet.ns = ns;
                console.log(`[toScoreRes] set ns (${formMake.formation.uiInfo.name}::${fItem.ch.name}) : None -> ${ns}`);
            }
            let autoScoreType = AutoScoreTypes.None;
            if (optListEnable) {
                autoScoreType = formMake.formationOptList[id].autoScoreType;
            }
            id++;
            /*スコア計算修正予定
                    const inst = scoreConfigSet.toInst(item.values)
                    const score = ScoreConfigSet.calcScoreAdvanced(inst, "chLvId+chArId*chHpId")
            */
            /*スコア計算修正予定
                    //「プロパティ名, 値」に変換(DynamicClass)
                    const inst = changed.scoreConfigSet.toInst(changed.values)
                    //console.log(inst)
                    //スコア計算（計算できることの検証用）
                    const calcRes = ScoreConfigSet.calcScoreAdvanced(inst, "chLvId+chArId*chHpId")
                    console.log(`uiName = ${changed.uiName}, calcRes = ${calcRes}`);
            */
            const vProp = new VersusScoreItemProp();
            vProp.chName = fItem.prop.comment;
            vProp.autoScoreType = autoScoreType;
            const item = new VersusScoreItem(fItem.ch, vProp, fItem.isEmpty, scSet);
            item.allAvailable = scSet.allAvailable;
            groupRow.Add(item);
        }
        versusResult.Add(groupRow);
        //versusResult.debug();
        return versusResult;
    }
    function toChIds(formMake) {
        const chIds = new Array();
        const formSet = formMake.formation;
        for (const fItem of formSet.items) {
            if (fItem.isEmpty === true)
                continue;
            if (fItem.ch.ns === CharNameSpaceTypes.None)
                continue;
            chIds.push(`${fItem.ch.id}`);
        }
        return chIds;
    }
    //スコア計算計算から対戦結果を判定
    async function makeCombatRes() {
        combatResult.gameConfig = gameConfig;
        //編成毎スコア計算
        const playerScoreResult = toScoreRes(playerForm);
        const enemyScoreResult = toScoreRes(enemyForm);
        //編成毎GMコンボ対象データ
        const playerGmIds = toChIds(playerForm);
        const enemyGmIds = toChIds(enemyForm);
        const playerGmKw = await charDB.getComboKeywords(playerGmIds);
        const enemyGmKw = await charDB.getComboKeywords(enemyGmIds);
        //自編成の対戦判定データ
        const playerCombatRes = new CombatResultItem();
        playerCombatRes.setScoreItems(playerScoreResult.groupRows[0].columns);
        playerCombatRes.gmComboKeywords = playerGmKw;
        playerCombatRes.boost = 100;
        //敵編成の対戦判定データ
        const enemyCombatRes = new CombatResultItem();
        enemyCombatRes.setScoreItems(enemyScoreResult.groupRows[0].columns);
        enemyCombatRes.gmComboKeywords = enemyGmKw;
        enemyCombatRes.boost = enemyBoost * 100;
        //ペアセット
        const combatResultPair = new CombatResultPair();
        combatResultPair.setPlayer(playerCombatRes);
        combatResultPair.setEnemy(enemyCombatRes);
        combatResult.setPair(CombatLevelTypes.HiLv, combatResultPair);
        //編成の成績計算
        combatResult.calcCombatScore();
        //結果判定(デバッグ)
        for (const [combatLevel, pair] of combatResult.combatPairs) {
            const judge = pair.judge(CombatComboTypes.None);
            console.log(`judge=[${judge}]`);
        }
    }
    //対戦予想UI：イメージ更新
    async function updateCombatChar(uiName, fItem, chItem) {
        //キャライメージ差し替え
        const levelType = CombatLevelTypes.HiLv;
        const combatPair = combatResult.combatPairs.get(levelType);
        if (uiName === playerFormName) {
            await combatResult.replaceChar(levelType, CombatFormationTypes.Player, fItem, chItem, imgLoader);
        }
        if (uiName === enemyFormName) {
            await combatResult.replaceChar(levelType, CombatFormationTypes.Enemy, fItem, chItem, imgLoader);
        }
        /*updateCombatResultAll()を後で実行する前提でコメントアウト
        */
        //判定マーク差し替え
        await combatResult.replaceJudge(imgLoader);
        //ガイド更新
        await combatResult.updateGuide();
    }
    //対戦予想UI更新
    async function updateCombatResultAll() {
        //対戦結果をまとめる
        await makeCombatRes();
        //console.log(combatResult)
        //判定マーク差し替え
        await combatResult.replaceJudge(imgLoader);
        //ガイド更新
        await combatResult.updateGuide();
    }
}
// --------------------------------------------------
//# sourceMappingURL=mainNormal.js.map
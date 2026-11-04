import { ImporterMap } from "./SiteImporter.js";
import { CharStatusClassifyTypes } from "./CharClass.js";
import { DockSet, DockItem } from "./DockLaucher.js";
import { HtmlMakerDialogDesc, HtmlZindexHelper } from "./HtmlMaker.js";
import { TableEdit, EditorTypes } from "./TableEdit.js";
import { resourceEditorConfig, gameEditorConfig, scoreEditorConfig, makeResourceTableEditConfig, makeGameTableEditConfig, makeScoreTableEditConfig } from "./TableEdit.js";
export async function mainEditor(env) {
    if (!env.isWebRunning)
        return;
    const isWebRunning = env.isWebRunning;
    console.log(`mode=${env.edit}`);
    const dockUI = new DockSet();
    //リソースエディタUI
    async function makeResUI() {
        const editorType = EditorTypes.Resource;
        const editUI = new TableEdit();
        editUI.init();
        editUI.setConfig(resourceEditorConfig());
        await editUI.load(editorType, CharStatusClassifyTypes.none);
        editUI.uiInfo.name = `ResourceEdit`;
        editUI.uiInfo.left = `110`;
        editUI.uiInfo.top = `10`;
        const uiName = editUI.uiInfo.name;
        const editHTML = await editUI.toHTML(makeResourceTableEditConfig());
        if (isWebRunning) {
            const div = document.createElement(`div`);
            div.id = editUI.uiInfo.name;
            div.className = editUI.uiInfo.name;
            document.body.appendChild(div);
            const title = "文字列リソース";
            const dlg = editUI.createEditorBox(title, uiName, editHTML);
            //resUI.applyCss();
            editUI.addEventHandlers(dlg);
            editUI.addItemEventHandlers();
            //resUI.enableLazyImages(imgLoader)
            dlg.show();
            editUI.enableResize();
            const dockItem = new DockItem();
            dockItem.setAsDlg(dlg, title);
            dockUI.add(dockItem);
        }
        return editUI;
    }
    //ゲームエディタUI
    async function makeGameUI() {
        const nGame = ImporterMap.size === 0 ? 5 : ImporterMap.size;
        const editorType = EditorTypes.GameUI;
        const editUI = new TableEdit();
        editUI.initNumItems = nGame;
        editUI.canAdd = false;
        editUI.init();
        editUI.setConfig(gameEditorConfig());
        await editUI.load(editorType, CharStatusClassifyTypes.none);
        editUI.uiInfo.name = `GameEdit`;
        editUI.uiInfo.left = `110`;
        editUI.uiInfo.top = `10`;
        editUI.uiInfo.height = `235`;
        const uiName = editUI.uiInfo.name;
        const editHTML = await editUI.toHTML(makeGameTableEditConfig());
        if (isWebRunning) {
            const div = document.createElement(`div`);
            div.id = editUI.uiInfo.name;
            div.className = editUI.uiInfo.name;
            document.body.appendChild(div);
            const title = "ゲーム設定";
            const dlg = editUI.createEditorBox(title, uiName, editHTML);
            //resUI.applyCss();
            editUI.addEventHandlers(dlg);
            editUI.addItemEventHandlers();
            //resUI.enableLazyImages(imgLoader)
            dlg.show();
            editUI.enableResize();
            const dockItem = new DockItem();
            dockItem.setAsDlg(dlg, title);
            dockUI.add(dockItem);
        }
        return editUI;
    }
    //スコアUI
    async function makeScoreUI() {
        const editorType = EditorTypes.ScoreUI;
        const editUI = new TableEdit();
        editUI.init();
        editUI.setConfig(scoreEditorConfig(env.gameType));
        await editUI.load(editorType, env.edit);
        editUI.uiInfo.name = `ScoreEdit`;
        editUI.uiInfo.left = `110`;
        editUI.uiInfo.top = `100`;
        const uiName = editUI.uiInfo.name;
        const editHTML = await editUI.toHTML(makeScoreTableEditConfig());
        if (isWebRunning) {
            const div = document.createElement(`div`);
            div.id = editUI.uiInfo.name;
            div.className = editUI.uiInfo.name;
            document.body.appendChild(div);
            const title = "スコア設定";
            const dlg = editUI.createEditorBox(title, uiName, editHTML);
            //resUI.applyCss();
            editUI.addEventHandlers(dlg);
            editUI.addItemEventHandlers();
            //resUI.enableLazyImages(imgLoader)
            dlg.show();
            editUI.enableResize();
            const dockItem = new DockItem();
            dockItem.setAsDlg(dlg, title);
            dockUI.add(dockItem);
        }
        return editUI;
    }
    const resEdit = await makeResUI();
    resEdit.startAutoSave();
    const gameUI = await makeGameUI();
    gameUI.startAutoSave();
    gameUI.onSaved = async (sender) => {
        env.startBcHelper();
        env.notifyGameConfigChanged();
    };
    const scoreUI = await makeScoreUI();
    scoreUI.startAutoSave();
    // DOCK UI parent
    const divDockParent = document.createElement(`div`);
    const dockParentName = `dockEdit`;
    divDockParent.id = dockParentName;
    divDockParent.className = dockParentName;
    document.body.appendChild(divDockParent);
    // DOCK UI 作成
    let dockDlg = null;
    const dockHTML = await dockUI.toHTML(dockParentName, null);
    if (isWebRunning) {
        const dlg = dockUI.createDockBox(dockParentName, dockHTML, false);
        //dockForm.applyCss();
        dockUI.addItemClickHandlers(
        /*onApply*/
        async (result) => {
            dockUI.stdApplyAction(result);
        });
        //dockUI.enableLazyImages(imgLoader)
        dlg.show();
        dockDlg = dlg;
    }
    // ZOrder 初期化
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
                        parentElem.hidden = true
                    }
                }
                */
                if (parentName !== `ResourceEdit`) {
                    parentElem.hidden = false;
                }
                else {
                    parentElem.hidden = true;
                }
            }
            return true;
        });
        if (dockDlg !== null) {
            //dockDlg.parentElement!.hidden = env.isLocal ? false : true
            dockDlg.parentElement.hidden = false;
        }
    }
    //UIアクティブ化要求
    resEdit.requestActivate = requestActivate;
    gameUI.requestActivate = requestActivate;
    scoreUI.requestActivate = requestActivate;
    async function requestActivate(dlg) {
        console.log(`[${dlg.className}] requestActivate`);
        dockUI.activateItem(dlg);
    }
}
//# sourceMappingURL=mainResource.js.map
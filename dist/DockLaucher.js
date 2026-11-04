import { HtmlMaker, HtmlMakerItem, HtmlMakerDialogDesc, HtmlMakerDialogB3Types, HtmlMakerDialogOTypes, HtmlMakerDialogHTypes, HtmlDialogInfo, HtmlZindexHelper } from "./HtmlMaker.js";
import { HtmlMakerChoice, HtmlMakerChoiceItem } from "./HtmlMaker.js";
export const DockItemTypes = {
    None: "None",
    UI: "UI",
    InvisibleUI: "InvisibleUI",
    Menu: "Menu",
};
export class DockItem {
    dockType = DockItemTypes.None;
    iconFileName = "";
    toolTip = "";
    dlg;
    dlgParent;
    idAttributeForHTML = "";
    get labelWrap() {
        let res = this.toolTip;
        let len = this.toolTip.length;
        if (len > 3) {
            const lenHalf = ((len % 2) === 0) ? len / 2 : len / 2 + 1;
            const left = res.substring(0, lenHalf);
            const right = res.substring(lenHalf);
            res = left + "\n" + right;
        }
        return res;
    }
    setAsDlg(dlg, toolTip) {
        this.dockType = DockItemTypes.UI;
        this.dlg = dlg;
        this.toolTip = toolTip;
    }
    setAsInvisibleDlg(dlg, toolTip) {
        this.dockType = DockItemTypes.InvisibleUI;
        this.dlg = dlg;
        this.toolTip = toolTip;
    }
    setAsMenu(toolTip) {
        this.dockType = DockItemTypes.Menu;
        this.toolTip = toolTip;
    }
    get isUIType() {
        return this.dockType == DockItemTypes.UI;
    }
    get isMenuType() {
        return this.dockType == DockItemTypes.Menu;
    }
    ToggleStatus() {
        if (this.dlg === undefined || this.dlg === null)
            return;
        //console.log(`${this.dlg.style.display}`)
        this.dlg.hidden = !this.dlg.hidden;
    }
}
export class DockSet {
    items = new Array;
    env;
    selectedItem;
    onApply;
    envOptionToolTip; //環境設定
    envHomePathToolTip; //ホームパス設定
    envSiteZipToolTip; //攻略サイトデータインポート
    risticToolTip; //関連語
    selectedPlayer = null; //閃絡したプレーヤー
    videoPlay = null; //ローカル動画/MP3再生
    ytPlayer = null; //YouTube動画再生
    ytElemId = ``; //YouTube動画要素ID(iframe)
    ytStartPlay; //YouTube再生関数
    videoToolTip; //再生リスト
    parentName = "";
    listName = "";
    htmlMaker;
    add(item) {
        if (item.dockType == DockItemTypes.UI)
            item.dlgParent = item.dlg.parentElement;
        this.items.push(item);
        return true;
    }
    async toHTML(listName, imgLoader = null) {
        if (!this.items)
            return "";
        this.listName = listName;
        this.htmlMaker = new HtmlMaker;
        let id = 0;
        let rows = "";
        for (const fItem of this.items) {
            id++;
            const idHTML = `dock-uid${id}`;
            fItem.idAttributeForHTML = idHTML;
            const item = new HtmlMakerItem;
            const label = fItem.labelWrap;
            item.props.name = this.itemCssClassName();
            item.props.id = idHTML;
            item.props.className = this.imgCssClassName();
            item.props.option.toolTip = fItem.toolTip;
            item.props.option.setLabel(label, true);
            item.props.option.onSelect = (evArgs) => {
                const match = this.items.find(item => evArgs.item.props.id === item.idAttributeForHTML);
                if (match) {
                    this.selectedItem = match;
                    //this.selectedItem.ToggleStatus()
                    if (this.onApply !== undefined) {
                        const notify = new DockSelectResult();
                        notify.item = this.selectedItem;
                        this.onApply(notify);
                    }
                }
            };
            this.htmlMaker.add(item);
        }
        return this.htmlMaker.MakeScrollableList(this.listCssClassName());
    }
    createDockBox(parentName, launchHTML, enableOpt, hidden = true) {
        this.parentName = parentName;
        const dlgHTML = `<div class="${this.parentName}-dlg-content">
    ${launchHTML}
</div>`;
        const dialogDesc = new HtmlMakerDialogDesc();
        dialogDesc.SetB3Type(HtmlMakerDialogB3Types.Hide);
        if (enableOpt)
            dialogDesc.SetOType(HtmlMakerDialogOTypes.OptionWithArgs, this.onOptionClick);
        dialogDesc.SetHType(HtmlMakerDialogHTypes.Help, this.onHelp);
        const dlg = dialogDesc.NewDialog(parentName, this.dlgCssClassName());
        dialogDesc.SetContent(parentName, dlgHTML, hidden);
        this.applyCss();
        dialogDesc.EnableEventHandlers();
        dialogDesc.onMoveDone = this.moverOnMoveDone;
        return dlg;
    }
    addItemClickHandlers(onApply) {
        //クリック通知を受け取るコールバックを保持
        this.onApply = onApply;
        //クリック有効化
        this.htmlMaker.SelectByID(this.itemCssClassName(), this.htmlMaker.GetIdByIndex(0));
        this.htmlMaker.enableEvents(this.itemCssClassName());
    }
    stdApplyAction(result) {
        if (result.item.dlgParent === null) {
            result.cancel = true;
            return false;
        }
        console.log(`selected item = [${result.item.toolTip}::${result.item.dockType}]`);
        if (result.item.isUIType) {
            this.htmlMaker.UnselectAll(this.itemCssClassName());
            this.htmlMaker.SelectByID(this.itemCssClassName(), result.item.idAttributeForHTML);
        }
        if (result.item.isUIType) {
            const zindexHelper = new HtmlZindexHelper();
            zindexHelper.MoveHiestLayer(result.item.dlgParent);
            /*
            if (result.item.dlgParent.hidden)
                result.item.dlgParent.hidden = false
            */
            if (result.item.dlgParent.style.display === `none`)
                result.item.dlgParent.style.display = ``;
        }
        return true;
    }
    activateItem(dlg) {
        const match = this.items.find(item => item.dlg === dlg);
        if (match !== undefined) {
            const notify = new DockSelectResult();
            notify.item = match;
            this.stdApplyAction(notify);
        }
    }
    moverOnMoveDone = async (dlg) => {
        console.log(`[${dlg.className}] moved`);
        const zindexHelper = new HtmlZindexHelper();
        zindexHelper.SaveSetting(dlg, false);
    };
    oBtn = null;
    onOptionClick = async (dlg, oType, args) => {
        console.log(`**onOptionClick**`, args);
        if (args === null)
            return;
        if (this.oBtn === null)
            this.oBtn = args.btnElem;
        const htmlMaker = new HtmlMaker();
        if (htmlMaker.IsEnabledElem(this.oBtn) === false)
            return;
        const choiceItems = new Array;
        const itemEnv = new HtmlMakerChoiceItem();
        itemEnv.key = `envSettings`;
        itemEnv.text = `📰環境設定`;
        choiceItems.push(itemEnv);
        const itemHome = new HtmlMakerChoiceItem();
        itemHome.key = `homeSettings`;
        itemHome.text = `📰パス設定`;
        choiceItems.push(itemHome);
        const itemGame = new HtmlMakerChoiceItem();
        itemGame.key = `gameSettings`;
        itemGame.text = `📰ゲーム設定`;
        choiceItems.push(itemGame);
        const itemScore = new HtmlMakerChoiceItem();
        itemScore.key = `scoreSettings`;
        itemScore.text = `📰スコア設定`;
        choiceItems.push(itemScore);
        const itemSite = new HtmlMakerChoiceItem();
        itemSite.key = `site`;
        itemSite.text = `🚀攻略サイト`;
        choiceItems.push(itemSite);
        const itemRistic = new HtmlMakerChoiceItem();
        itemRistic.key = `ristic`;
        itemRistic.text = this.risticToolTip !== undefined ? `💬関連語一覧` : `⛔関連語一覧`;
        itemRistic.state = this.risticToolTip !== undefined ? `` : `is-disable`;
        choiceItems.push(itemRistic);
        const itemVideo = new HtmlMakerChoiceItem();
        itemVideo.key = `video`;
        itemVideo.text = `🎧プレーヤー`;
        choiceItems.push(itemVideo);
        const itemYtplay = new HtmlMakerChoiceItem();
        itemYtplay.key = `ytplay`;
        itemYtplay.text = this.ytStartPlay !== undefined ? `🎥YT再生` : `⛔YT再生`;
        itemYtplay.state = this.ytStartPlay !== undefined ? `` : `is-disable`;
        choiceItems.push(itemYtplay);
        const itemCancel = new HtmlMakerChoiceItem();
        itemCancel.key = `Cancel`;
        itemCancel.text = `❌キャンセル`;
        choiceItems.push(itemCancel);
        const choice = new HtmlMakerChoice();
        choice.setChoiceItems(choiceItems);
        htmlMaker.EnableElem(this.oBtn, false);
        const parentName = args.dlg.className;
        choice.setListener(`${parentName}-choice`, parentName, `${parentName}-opt`);
        choice.applyCss();
        choice.show(args.leftPx, args.topPx);
        choice.enableEvents(
        /*onSelect*/
        async (ev) => {
            console.log(`[onSelect] ${ev.callerName} ${ev.result}`);
            choice.dispose();
            switch (ev.result) {
                case `envSettings`:
                    if (this.envOptionToolTip !== undefined) {
                        this.envOptionToolTip.SetVisible(true);
                    }
                    break;
                case `homeSettings`:
                    if (this.envHomePathToolTip !== undefined) {
                        this.envHomePathToolTip.SetVisible(true);
                    }
                    break;
                case `gameSettings`:
                    // 別タブで開く
                    const url1 = this.env.editorURL;
                    window.open(url1, url1);
                    break;
                case `scoreSettings`:
                    const url2 = this.env.editorURL;
                    window.open(url2, url2);
                    break;
                case `site`:
                    if (this.envSiteZipToolTip !== undefined) {
                        this.envSiteZipToolTip.SetVisible(true);
                    }
                    break;
                case `ristic`:
                    if (this.risticToolTip !== undefined) {
                        this.risticToolTip.SetVisible(true);
                    }
                    break;
                case `video`:
                    this.selectVideoPlay();
                    break;
                case `ytplay`:
                    await this.selectYtPlay();
                    break;
                case `Cancel`:
                    break;
            }
            if (this.oBtn !== null) {
                const htmlMaker = new HtmlMaker();
                htmlMaker.EnableElem(this.oBtn, true);
                this.oBtn = null;
            }
        });
    };
    onHelp = async (dlg, helpType) => {
        await aboutBox();
    };
    selectVideoPlay() {
        if (this.videoPlay !== null) {
            const visible = this.videoPlay.style.display === `` ? true : false;
            this.videoPlay.style.display = visible ? `none` : ``;
            this.selectedPlayer = this.videoPlay;
            this.videoToolTip.SetVisible(!visible);
        }
    }
    async selectYtPlay() {
        if (this.ytElemId !== `` && this.ytStartPlay !== undefined) {
            this.ytPlayer = document.getElementById(this.ytElemId);
            if (this.ytPlayer !== null) {
                const tagName = this.ytPlayer.tagName;
                let visible = this.ytPlayer.style.display === `` ? true : false;
                this.ytPlayer.style.display = visible ? `none` : ``;
                if (tagName === `DIV`) {
                    //再生開始
                    await this.ytStartPlay();
                    //再生するタグが`DIV`から`iframe`に変わる！
                    this.ytPlayer = document.getElementById(this.ytElemId);
                    visible = this.ytPlayer.style.display === `` ? true : false;
                    this.selectedPlayer = this.ytPlayer;
                    this.videoToolTip.SetVisible(visible);
                }
                else {
                    const visible = this.ytPlayer.style.display === `` ? true : false;
                    this.selectedPlayer = this.ytPlayer;
                    this.videoToolTip.SetVisible(visible);
                }
            }
        }
    }
    enableLazyImages(imageLoader) {
        this.htmlMaker.initObserver(this.dlgCssClassName(), imageLoader);
    }
    applyCss() {
        const listName = this.listCssClassName();
        const itemName = this.itemCssClassName();
        const imgName = this.imgCssClassName();
        const launchSize = 48;
        const nItem = this.items.length;
        const style = document.createElement("style");
        style.textContent =
            `
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName, 60, 10, HtmlZindexHelper.ignoreIndex)}
${this.htmlMaker.MakeSystematicDialogCss(this.dlgCssClassName())}
.${this.parentName}-dlg-content {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

${this.htmlMaker.MakeDefaultNonScrollCss(this.parentName, 0)}
${this.htmlMaker.MakeDefaultGridColCss(listName, launchSize, nItem, launchSize * nItem)}

${this.htmlMaker.MakeDefaultItemLabelCss(itemName, imgName, launchSize, launchSize)}
${this.htmlMaker.MakeSystematicSelectionCss(itemName)}

${this.htmlMaker.MakeDefaultButtonsCss()}
span {
display: grid;
align-content: center;
white-space: pre-wrap;
}
`.trim();
        document.head.appendChild(style);
        const dlgParent = document.getElementById(this.parentName);
        this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`, dlgParent);
    }
    itemCssClassName() {
        return `${this.listName}-item`;
    }
    imgCssClassName() {
        return `${this.listName}-img`;
    }
    listCssClassName() {
        return `${this.listName}-list`;
    }
    dlgCssClassName() {
        return `${this.parentName}-dlg`;
    }
    static GetDialogInfo(parentName) {
        return HtmlMakerDialogDesc.GetDialogInfo(parentName);
    }
    static SetDialogInfo(info) {
        return HtmlMakerDialogDesc.SetDialogInfo(info);
    }
    /** DockUIへのzIndexセット */
    async InitZOrder(zindexHelper) {
        await zindexHelper.ForEachAsync((parentName) => {
            const dlgInfo = DockSet.GetDialogInfo(parentName);
            const dlg = zindexHelper.FindByName(parentName);
            if (dlgInfo !== null)
                dlgInfo.zindex = dlg !== null ? dlg.style.zIndex : "";
            console.log(dlgInfo);
            return true;
        });
    }
}
export class DockSelectResult {
    item;
    cancel = false;
}
export class DockDialogInfo extends HtmlDialogInfo {
    zindex = "";
    toString() {
        return `[${this.name}] ${this.left},${this.top} ${this.width},${this.height}`;
    }
}
import { EvonaMessageBox } from "./MessageBox.js";
export async function aboutBox() {
    const msgbox = new EvonaMessageBox;
    msgbox.title = `About EvoNa`;
    const msg = `EvoNa (Evolution Navigator)<br>Release 1`;
    const img = `<img src="./wallpaper.png" width="64" height="auto"></img>`;
    const pow = `Powered By Gemini/Chromium Tech.`;
    const res = await msgbox.showWait(`${msg}<br>${img}<br><br>${pow}`);
}
class DockItemJson {
    dockType = DockItemTypes.None;
    iconFileName = "";
    toolTip = "";
    dlgName = "";
    hidden = false; //until-found
    zIndex = "";
    topPx = "";
    leftPx = "";
    static toJsonText(item) {
        const res = DockItemJson.toJsonInst(item);
        return JSON.stringify(res, null, 2);
    }
    static toJsonInst(item) {
        const res = new DockItemJson;
        res.dockType = item.dockType;
        res.iconFileName = item.iconFileName;
        res.toolTip = item.toolTip;
        if (item.isUIType) {
            res.dlgName = item.dlgParent.id;
            res.hidden = typeof (item.dlgParent.hidden) === `string` ? false : item.dlgParent.hidden;
            res.zIndex = item.dlgParent.style.zIndex;
            res.leftPx = item.dlgParent.style.left;
            res.topPx = item.dlgParent.style.top;
        }
        return res;
    }
}
export class DockSetJson {
    items;
    static toJsonText(dockSet) {
        const res = DockSetJson.toJsonInst(dockSet);
        return JSON.stringify(res, null, 2);
    }
    static toJsonInst(dockSet) {
        const res = new DockSetJson;
        res.items = new Array;
        for (const item of dockSet.items) {
            res.items.push(DockItemJson.toJsonInst(item));
        }
        return res;
    }
    /** DockUI 復帰 */
    restore(dockSet, zindexHelper) {
        //DockUIを生成したあとに呼ばれる
        for (const itemJson of this.items) {
            const match = dockSet.items.find(item => item.dlg.id === itemJson.dlgName);
            if (match) {
                match.dockType = itemJson.dockType;
                match.iconFileName = itemJson.iconFileName;
                match.toolTip = itemJson.toolTip;
                if (match.isUIType) {
                    match.dlgParent.hidden = typeof (itemJson.hidden) === `string` ? false : itemJson.hidden;
                    match.dlgParent.style.zIndex = itemJson.zIndex;
                    match.dlgParent.style.left = itemJson.leftPx;
                    match.dlgParent.style.top = itemJson.topPx;
                }
            }
        }
        //zIndex ソート
        zindexHelper.ReOrder();
    }
}
//# sourceMappingURL=DockLaucher.js.map
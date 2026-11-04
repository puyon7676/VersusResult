import { CharStatusClassifyTypes, FixedFormSlotTypes, fixedMap } from "./CharClass.js";
import { HtmlMaker } from "./HtmlMaker.js";
import { HtmlMakerDialogDesc, HtmlDialogInfo, HtmlZindexHelper } from "./HtmlMaker.js";
import { HtmlMakerGrid } from "./HtmlMaker.js";
import { HtmlMakerTableCell } from "./HtmlMaker.js";
import { HtmlMakerOptionCombo, HtmlMakerOptionInput } from "./HtmlMaker.js";
import { HtmlMakerNestedNodeGroup, HtmlMakerNestedNodeOption } from "./HtmlMaker.js";
import { HtmlMakerDialogB2Types } from "./HtmlMaker.js";
import { HtmlMakerCopyPasteTypes } from "./HtmlMaker.js";
import { HtmlMakerConst, HtmlMakerCommonCss } from "./HtmlMaker.js";
import { EvonaMessageBox, MessageBoxResultTypes } from "./MessageBox.js";
import { CharSpecItem, CharSpecItemJson } from "./CharSpec.js";
import { ScoreConfigSet } from "./ScoreConfig.js";
import { getLogAccessInstance, generateSafeID, LogTypes } from "./JsStoreHelper.js";
import { getConvertToolsInstance } from "./ConvertTools.js";
import { ClipboardHelper } from "./ClipboardHelper.js";
export class CharSummaryItemProp {
    comment = ``;
    fixedType = FixedFormSlotTypes.None;
    static copy(from, to) {
        to.comment = from.comment;
        to.fixedType = from.fixedType;
    }
}
export class CharSummaryItem {
    chUuid = ``;
    ch = new CharSpecItem;
    prop = new CharSummaryItemProp;
    scoreSet;
    setDefault() {
        if (this.prop.comment === ``)
            this.prop.comment = `${this.ch.name.replace(`（星7）`, ``)}(Lv1)`;
    }
}
export class CharSummary {
    env;
    chList = new Array;
    uiInfo = new HtmlDialogInfo;
    requestActivate;
    htmlMaker;
    parentName = "";
    scoreGrid = new HtmlMakerGrid();
    gridHeaderName = `${this.dlgCssClassName()}-headerName`;
    gridFooterName = `${this.dlgCssClassName()}-footerName`;
    gridName = `${this.dlgCssClassName()}-gridName`;
    gridRowName = `${this.dlgCssClassName()}-gridRowName`;
    keyClassName = `${this.dlgCssClassName()}-keyClassName`;
    valueClassName = `${this.dlgCssClassName()}-valueClassName`;
    commentClassName = `${this.dlgCssClassName()}-commentClassName`;
    fixedClassName = `${this.dlgCssClassName()}-fixedClassName`;
    onAdd;
    async load(charSpecSet) {
        const logInst = await getLogAccessInstance();
        const logs = await logInst.get(LogTypes.CharSummaryAction);
        if (logs === null)
            return;
        const useLogMap = new Map();
        const notUseLogMap = new Array();
        this.usingLog(logs, useLogMap, notUseLogMap);
        this.chList = new Array;
        for (const [uuid, rec] of useLogMap) {
            const logInst = CharSummaryActionLog.fromJsonText(rec.log);
            /*
            if (logInst.ch.gt === undefined || logInst.ch.gt === CharStatusClassifyTypes.none) {
                if (this.env !== undefined) logInst.ch.gt = this.env.gameType
            }
            else {
                if (this.env === undefined) continue
                if (logInst.ch.gt !== this.env.gameType) continue
            }
            */
            if (logInst.ch.gt === undefined || logInst.ch.gt === CharStatusClassifyTypes.none) {
                //ゲームタイプが未設定の場合、contentURL(キャラ取得元URL)が同じかを検証し
                //同じ場合、同一ゲーム内のキャラとみなす
                const chSame = charSpecSet.chList.find(ch => ch.contentURL === logInst.ch.contentURL);
                if (chSame === undefined) {
                    console.log(`**missing logInst.ch.gt(ignore)**`, logInst.ch);
                    continue;
                }
            }
            else {
                if (this.env === undefined)
                    continue;
                if (logInst.ch.gt !== this.env.gameType) {
                    console.log(`**missmatch logInst.ch.gt(ignore)**`, logInst.ch);
                    continue;
                }
            }
            const ch = new CharSpecItem();
            CharSpecItem.copy(logInst.ch, ch);
            const prop = new CharSummaryItemProp();
            CharSummaryItemProp.copy(logInst.prop, prop);
            const scSet = new ScoreConfigSet();
            ScoreConfigSet.copy(logInst.scoreSet, scSet, true);
            const item = new CharSummaryItem();
            item.chUuid = logInst.chUuid;
            item.ch = ch;
            item.prop = prop;
            item.scoreSet = scSet;
            item.setDefault();
            this.chList.push(item);
        }
    }
    usingLog(logs, useLogMap, unUseLogArray) {
        for (const log of logs) {
            const logInst = CharSummaryActionLog.fromJsonText(log.log);
            /*
            console.log(logInst.logType)
            console.log(logInst.ch)
            console.log(logInst.scoreSet)
            */
            if (logInst.chUuid === ``)
                continue;
            let valid = false;
            let isDelete = false;
            switch (logInst.logType) {
                case CharSummaryActionLogTypes.None:
                    break;
                case CharSummaryActionLogTypes.Add:
                    valid = true; //常に追加したキャラが有効
                    break;
                case CharSummaryActionLogTypes.Update:
                    if (useLogMap.has(logInst.chUuid)) {
                        valid = true; //更新内容を有効にする
                    }
                    else {
                        valid = false; //追加していないのに更新のみがあるのは変かも
                    }
                    break;
                case CharSummaryActionLogTypes.Delete:
                    valid = true; //過去の追加・更新の有無は関係なく削除は有効
                    isDelete = true;
                    break;
            }
            if (!valid)
                continue;
            if (!isDelete) {
                if (useLogMap.has(logInst.chUuid)) {
                    const notUse = useLogMap.get(logInst.chUuid);
                    unUseLogArray.push(notUse);
                    useLogMap.delete(logInst.chUuid);
                }
                useLogMap.set(logInst.chUuid, log);
            }
            else {
                if (useLogMap.has(logInst.chUuid)) {
                    useLogMap.delete(logInst.chUuid);
                    const notUse = useLogMap.get(logInst.chUuid);
                    unUseLogArray.push(notUse);
                }
            }
        }
    }
    sortByScore() {
        if (this.chList.length === 0)
            return null;
        const chListNew = new Array;
        for (const item of this.chList) {
            const ch = new CharSpecItem();
            CharSpecItem.copy(item.ch, ch);
            const scSet = new ScoreConfigSet();
            ScoreConfigSet.copy(item.scoreSet, scSet, true);
            const itemNew = new CharSummaryItem();
            itemNew.chUuid = item.chUuid;
            itemNew.ch = ch;
            CharSummaryItemProp.copy(item.prop, itemNew.prop);
            itemNew.setDefault();
            itemNew.scoreSet = scSet;
            chListNew.push(itemNew);
        }
        const sorted = chListNew.sort((ch1, ch2) => {
            return ch2.scoreSet.stdScore - ch1.scoreSet.stdScore;
        });
        return sorted;
    }
    findItemByDropText(dropText) {
        //CnsRed_幾星学園のりんご先生（星7）_673771_uuid19f96499663-f1a98fbb-a432-4738-8c36-db7b52455b23
        const splited = dropText.split(`_`);
        if (splited.length === 0)
            return undefined;
        const uuid = splited[splited.length - 1].substring(4);
        const exist = this.chList.find(item => item.chUuid === uuid);
        return exist;
    }
    toHTML() {
        this.htmlMaker = new HtmlMaker;
        return this.htmlMaker.ToHTML();
    }
    createSummaryBox(title, parentName, chListHTML) {
        this.parentName = parentName;
        let btns = `
<button id="${this.itemAddCssClassName()}">キャラ追加</button>
`.trim();
        this.htmlMaker.defaultToolButtonsCssName = `${this.dlgCssClassName()}-tool-btns`;
        const toolbarsHTML = this.htmlMaker.MakeDefaultToolButtonsHTML(btns);
        const dlgHTML = `<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${toolbarsHTML}
    ${chListHTML}
</div>`;
        const dialogDesc = new HtmlMakerDialogDesc();
        dialogDesc.title = "<" + title + ">";
        dialogDesc.SetB2Type(HtmlMakerDialogB2Types.CopyPaste, this.onCopyPaste);
        const dlg = dialogDesc.NewDialog(parentName, this.dlgCssClassName());
        dialogDesc.SetContent(parentName, dlgHTML);
        this.applyCss();
        dialogDesc.EnableEventHandlers();
        dialogDesc.onMoveDone = this.moverOnMoveDone;
        return dlg;
    }
    addEventHandlers(dlg, onAdd) {
        this.onAdd = onAdd;
        //キャラ追加
        document.getElementById(`${this.itemAddCssClassName()}`).onclick = async () => {
            if (this.onAdd === undefined)
                return;
            //追加対象のキャラ情報を取得
            const req = new CharSummaryActionReq();
            await this.onAdd(req);
            if (req.cancel === true)
                return;
            await this.onItemAdd(req);
        };
    }
    nsDefs = [];
    nested;
    updateItemId = 1;
    deleteItemId = 2;
    async createCharSummaryNodes(imageLoader, nsDefs) {
        this.imageLoader = imageLoader;
        const nested = new HtmlMakerNestedNodeGroup();
        nested.init();
        nested.setListener(`charNodes`, this.dlgContentCssClassName(), this.dlgContentCssClassName());
        this.nested = nested;
        this.nsDefs = nsDefs;
        await this.addAllCharNodes();
        nested.setSize(`400`);
        nested.applyCss();
        //nested.show(`0`, `0`)
    }
    async showCharSummaryNodes() {
        this.nested.enableOverlay(false);
        let padding = 10;
        /*
        const dlgElems = document.getElementsByClassName(this.dlgCssClassName())
        if (dlgElems.length >= 1) {
            const dlgElem = dlgElems[0] as HTMLElement
            padding = Number(dlgElem.style.paddingTop)
        }
        */
        const dlgContElems = document.getElementsByClassName(this.dlgContentCssClassName());
        let top = padding;
        let toolElem = null;
        if (dlgContElems.length >= 1) {
            const dlgContElem = dlgContElems[0];
            const toolElems = dlgContElem.getElementsByClassName(this.htmlMaker.defaultToolButtonsCssName);
            toolElem = toolElems[0];
            const rcTool = this.htmlMaker.GetRect(toolElem);
            console.log(`toolRc`, rcTool);
            top = padding + Number(rcTool.height);
        }
        this.nested.show(`0`, `${top}`);
        this.nested.enableEvents(this.onNestedNodeSelect);
        this.nested.startWatch(this.onNotifyWatched);
        if (toolElem !== null) {
            const nsComboName = this.nsComboCssClassName();
            const selectElem = this.createNsCombo(nsComboName);
            toolElem.appendChild(selectElem);
        }
    }
    onNotifyWatched = async (trElem) => {
        console.log(`${trElem.className} が見えました！`);
        const splited = trElem.className.split(`-`);
        const nsKey = splited.length >= 2 ? splited[0] : ``;
        const nsComboName = this.nsComboCssClassName();
        const nsComboElems = document.getElementsByClassName(nsComboName);
        if (nsComboElems.length >= 1) {
            const nsComboElem = nsComboElems[0];
            if (nsComboElem.value !== nsKey)
                nsComboElem.value = nsKey;
        }
    };
    createNsCombo(comboName) {
        let index = -1;
        let optionHtmls = ``;
        for (const nsDef of this.nsDefs) {
            index++;
            const value = nsDef.ns;
            const title = nsDef.nsName;
            const selected = index === 0 ? " selected" : "";
            const optionHtml = `
 <option value="${value}"${selected}>${title}</option>
`.trim();
            optionHtmls += optionHtml;
        }
        const select = document.createElement("select");
        select.id = comboName;
        select.className = comboName;
        select.innerHTML = optionHtmls;
        select.addEventListener("change", (ev) => {
            const target = ev.target;
            const nsElem = this.nested.findNodeBy(target.value);
            if (nsElem !== null) {
                this.nested.scroll(nsElem);
            }
        });
        return select;
    }
    getCharUuidClassName(item) {
        const ch = item.ch;
        const ns = ch.ns;
        const chFullName = `${ns}_${ch.name}_${ch.id}`;
        //属性グループ確認
        const nsGroupElem = this.nested.findNodeBy(ns);
        if (nsGroupElem === null)
            return null;
        //キャラグループ確認
        const charGroupClassName = chFullName;
        let chGroupElem = this.nested.findNodeBy(charGroupClassName);
        let charUuidClassName = `${chGroupElem.className}_uuid${item.chUuid}`;
        return charUuidClassName;
    }
    async addAllCharNodes() {
        this.nested.createRoot();
        const rootElem = this.nested.topTableElem;
        for (const nsDef of this.nsDefs) {
            const nodeOpt = new HtmlMakerNestedNodeOption();
            nodeOpt.enableWatchNotify = true;
            this.nested.createNode(rootElem, nsDef.ns, nodeOpt);
            const nsGroupElem = this.nested.findNodeBy(nsDef.ns);
            const html = this.nested.makeTextCell(`${nsDef.ns}Label`, nsDef.nsName, `${nsDef.nsName}グループ`).ToHTML();
            this.nested.setCellContent(nsGroupElem, 0, html);
        }
        for (const item of this.chList) {
            await this.addCharNode(this.nested, item, true);
        }
        console.log(`**[TOP]**`, this.nested.findNodeBy(this.nested.rootName));
    }
    async addCharNode(nested, item, isLazyImg) {
        const ch = item.ch;
        const ns = ch.ns;
        const chFullName = `${ns}_${ch.name}_${ch.id}`;
        //属性グループ確認
        const nsGroupElem = nested.findNodeBy(ns);
        if (nsGroupElem === null)
            return null;
        //キャラグループ確認
        const charGroupClassName = chFullName;
        let chGroupElem = nested.findNodeBy(charGroupClassName);
        if (chGroupElem === null) {
            //キャラグループ追加
            nested.createNode(nsGroupElem, charGroupClassName);
            chGroupElem = nested.findNodeBy(charGroupClassName);
            let imgSrc = await this.imageLoader.getImageUrlBy(ch.iconFileName, ch.ns);
            let imgFile = ``;
            let toolTip = ch.name;
            let html = nested.makeImgCell(`${charGroupClassName}Img`, imgSrc, imgFile, toolTip).ToHTML();
            nested.setCellContent(chGroupElem, 0, html);
        }
        //キャラ追加
        let charUuidClassName = `${chGroupElem.className}_uuid${item.chUuid}`;
        const nodeOpt = new HtmlMakerNestedNodeOption();
        nodeOpt.numCell = 2;
        nested.createNode(chGroupElem, charUuidClassName, nodeOpt);
        const charUuidElem = nested.findNodeBy(charUuidClassName);
        let chName = item.prop.comment;
        let scoreText = this.getChScoreText(item);
        const conv = getConvertToolsInstance();
        const labelText = conv.convTitle(chName);
        const statusText = `${chName}${scoreText}`;
        let html = nested.makeTextCell(`${charUuidClassName}`, labelText, statusText).ToHTML();
        const charUuidCellElem = nested.setCellContent(charUuidElem, 0, html);
        const btn1 = nested.makeBtnCell(`${charUuidClassName}`, `更新`, `更新`, this.updateItemId).ToHTML();
        const btn2 = nested.makeBtnCell(`${charUuidClassName}`, `削除`, `削除`, this.deleteItemId).ToHTML();
        nested.setCellContent(charUuidElem, 1, btn1 + btn2);
        nested.setDraggable(this.onDragAction, charUuidCellElem, true);
        return charUuidElem;
    }
    onDragAction = async (dragMap) => {
        const className = dragMap.get(`className`);
        if (className === undefined)
            return;
        const charUuidElem = this.nested.findNodeBy(className);
        console.log(dragMap, charUuidElem);
    };
    getChScoreText(chItem) {
        let scoreText = ``;
        for (const scItem of chItem.scoreSet.items) {
            let scText = scItem.selectedText;
            scText = scText === undefined ? `*bug*` : scText;
            scoreText += HtmlMakerConst.toolTipNewLine + scItem.title + "：" + scText + "(" + Math.ceil(scItem.stdScore) + ")";
        }
        return scoreText;
    }
    onNestedNodeSelect = async (evArgs) => {
        //class="CnsRed_フローレ（星7）_119651_uuid19ddc3ba03e-b174bdc7-e5bb-43ea-9b31-29a8e4b89aae"
        const className = evArgs.callerName;
        const classParts = className.split(`_`);
        if (classParts.length === 0)
            return;
        let uuid = classParts.find(part => part.startsWith(`uuid`));
        if (uuid === undefined)
            return;
        uuid = uuid.substring(4);
        //console.log(uuid, evArgs.result)
        const chItem = this.chList.find(ch => ch.chUuid === uuid);
        if (chItem === undefined)
            return;
        console.log(chItem);
        switch (evArgs.result) {
            case `${this.updateItemId}`:
                this.editingCh = chItem;
                const scoreSet = chItem.scoreSet;
                CharSummaryItemProp.copy(chItem.prop, this.savedProp);
                this.savedScoreSet = new ScoreConfigSet();
                ScoreConfigSet.copy(scoreSet, this.savedScoreSet, true);
                this.createScoreGrid(chItem, scoreSet);
                this.htmlMaker.setVisible(this.htmlMaker.defaultToolButtonsCssName, false);
                this.nested.setVisible(false);
                const parentElem = this.nested.findParentNodeBy(className);
                console.log(parentElem);
                const cellElem = this.nested.getCell(parentElem);
                console.log(cellElem);
                const imgElem = this.nested.findCell(cellElem, `img`);
                console.log(imgElem);
                const imgSrc = imgElem.src;
                const imgElemNew = document.createElement(`img`);
                imgElemNew.src = imgSrc;
                imgElemNew.style.width = `100px`;
                imgElemNew.style.height = `100px`;
                this.scoreGrid.headerElem?.appendChild(imgElemNew);
                break;
            case `${this.deleteItemId}`:
                const msgbox = new EvonaMessageBox;
                msgbox.setParent(this.dlgCssClassName());
                let res = MessageBoxResultTypes.None;
                msgbox.setYesNo();
                res = await msgbox.showWait(`${chItem.ch.name} を削除しますか？`);
                switch (res) {
                    case MessageBoxResultTypes.Yes:
                        const parentElem = this.nested.findParentNodeBy(className);
                        console.log(parentElem);
                        const children = this.nested.getChildren(parentElem);
                        console.log(children);
                        this.nested.removeNodeBy(className);
                        if (children !== null && children.length === 1) {
                            //ノード削除
                            this.nested.removeNode(parentElem);
                            //操作ログ
                            this.addActionLog(chItem, CharSummaryActionLogTypes.Delete);
                        }
                        break;
                    case MessageBoxResultTypes.No:
                        return;
                    case MessageBoxResultTypes.Cancel:
                        return;
                }
                break;
        }
    };
    createScoreGrid(chItem, scoreSet) {
        const parentName = this.dlgContentCssClassName();
        const conv = getConvertToolsInstance();
        const pair = this.scoreGrid.makePair();
        this.setCommentPair(chItem, pair);
        this.setFixedFormPair(chItem, pair);
        for (const scItem of scoreSet.items) {
            const label = conv.convTitle(scItem.title);
            const toolTip = scItem.title;
            const keyCell = this.scoreGrid.makeKeyCell(label, this.keyClassName, toolTip);
            const combo = new HtmlMakerOptionCombo();
            combo.selectionPair = scItem.selectionPair;
            combo.selectedItem = scItem.selectedVal;
            combo.classify = scItem.key;
            const valueCell = new HtmlMakerTableCell();
            valueCell.makeItems();
            valueCell.items[0].typeInfo.setCombo(combo);
            valueCell.items[0].className = this.valueClassName;
            pair.set(keyCell, valueCell);
        }
        this.scoreGrid.setPair(pair);
        this.scoreGrid.setListener(this.gridName, this.gridRowName, parentName, this.gridHeaderName, this.gridFooterName);
        this.scoreGrid.enableEvents(this.onSelect);
        if (this.scoreGrid.footerElem !== null) {
            let btns = `
<button id="${this.gridFooterName}-okBtn">OK</button>
<button id="${this.gridFooterName}-canBtn">CANCEL</button>
`.trim();
            this.scoreGrid.footerElem.innerHTML = btns;
            //キャラ変更：OK
            document.getElementById(`${this.gridFooterName}-okBtn`).onclick = async () => {
                const chItem = this.editingCh;
                if (chItem === null)
                    return;
                const scoreSet = chItem.scoreSet;
                const commentElems = document.getElementsByClassName(this.commentClassName);
                if (commentElems.length === 1) {
                    const commentElem = commentElems[0];
                    chItem.prop.comment = commentElem.value;
                }
                //操作ログ
                this.addActionLog(chItem, CharSummaryActionLogTypes.Update);
                this.removeScoreGrid();
                //スコア計算パラメータ表示更新
                this.updateChScoreInfo(this.editingCh);
            };
            //キャラ変更：CANCEL
            document.getElementById(`${this.gridFooterName}-canBtn`).onclick = async () => {
                const chItem = this.editingCh;
                if (chItem === null)
                    return;
                chItem.prop.comment = this.savedProp.comment;
                const scoreSet = chItem.scoreSet;
                ScoreConfigSet.copy(this.savedScoreSet, scoreSet);
                this.removeScoreGrid();
            };
        }
    }
    setCommentPair(chItem, pair) {
        const label = chItem.prop.comment.trim();
        const toolTip = `キャラ情報を入力`;
        const keyCell = this.scoreGrid.makeKeyCell(`キャラ情報`, this.keyClassName, toolTip);
        const comment = new HtmlMakerOptionInput();
        comment.value = label;
        comment.placeholder = toolTip;
        /*
        if (this.editType !== HtmlMakerInputEditTypes.KeyValue) {
            comment.disableKeyDown = numPadEnable
            comment.enableClicked = numPadEnable
        }
        */
        const commentCell = new HtmlMakerTableCell();
        commentCell.makeItems();
        commentCell.items[0].typeInfo.setInput(comment);
        commentCell.items[0].className = this.commentClassName;
        commentCell.items[0].typeInfo.using.itemId = 1; //イベントを受け取れるようにするため必要
        pair.set(keyCell, commentCell);
    }
    setFixedFormPair(chItem, pair) {
        const label = `固定枠`;
        const toolTip = `自動編成の固定枠を選択`;
        const keyCell = this.scoreGrid.makeKeyCell(label, this.keyClassName, toolTip);
        let selectionPair = new Array;
        let selectedVal = ``;
        for (const [key, text] of fixedMap) {
            const seletion = `${text}/${key}`;
            selectionPair.push(seletion);
            if (chItem.prop.fixedType === key)
                selectedVal = key;
        }
        const combo = new HtmlMakerOptionCombo();
        combo.selectionPair = selectionPair;
        combo.selectedItem = selectedVal;
        combo.classify = this.fixedClassName;
        const valueCell = new HtmlMakerTableCell();
        valueCell.makeItems();
        valueCell.items[0].typeInfo.setCombo(combo);
        valueCell.items[0].className = this.fixedClassName;
        pair.set(keyCell, valueCell);
    }
    removeScoreGrid() {
        if (this.scoreGrid.headerElem !== null) {
            let imgElem = this.scoreGrid.headerElem.children[0];
            if (imgElem !== null) {
                imgElem.remove();
                imgElem = null;
            }
        }
        if (this.scoreGrid === null)
            return;
        this.scoreGrid.dispose();
        this.htmlMaker.setVisible(this.htmlMaker.defaultToolButtonsCssName, true);
        this.nested.setVisible(true);
    }
    editingCh = null;
    onSelect = async (evArgs) => {
        console.log(`classify = ${evArgs.classify} selectedValue = ${evArgs.selectedValue} targetId = ${evArgs.targetId}`);
        switch (evArgs.classify) {
            case this.commentClassName:
                const commentElems = document.getElementsByClassName(this.commentClassName);
                //console.log(`** comment input & enter! **`, commentElems)
                if (commentElems.length === 1) {
                    const commentElem = commentElems[0];
                    console.log(`** comment input & enter! **`, commentElem.value);
                }
                return;
            case this.fixedClassName:
                if (this.editingCh !== null) {
                    this.editingCh.prop.fixedType = evArgs.selectedValue;
                }
                return;
        }
        const chItem = this.editingCh;
        if (chItem === null)
            return;
        const scoreSet = chItem.scoreSet;
        const scItem = scoreSet.items.find(scItem => scItem.key === evArgs.classify);
        if (scItem) {
            scItem.selectedVal = evArgs.selectedValue;
        }
    };
    async onItemAdd(req) {
        //追加確認メッセージ
        const msgbox = new EvonaMessageBox;
        msgbox.setParent(this.dlgCssClassName());
        let res = MessageBoxResultTypes.None;
        msgbox.setYesNo();
        res = await msgbox.showWait(`${req.selectCh.name} を追加しますか？`);
        if (res === MessageBoxResultTypes.No)
            return;
        //キャラ配列へ追加
        const chItem = new CharSummaryItem();
        chItem.chUuid = generateSafeID();
        chItem.ch = req.selectCh;
        chItem.ch.iconURL = req.selectedImg;
        chItem.scoreSet = req.scoreSet;
        chItem.setDefault();
        this.chList.push(chItem);
        //ノードへ追加
        const charUuidElem = await this.addCharNode(this.nested, chItem, false);
        if (charUuidElem !== null) {
            //スクロール
            this.nested.scroll(charUuidElem);
            //操作ログ
            this.addActionLog(chItem, CharSummaryActionLogTypes.Add);
        }
    }
    savedProp = new CharSummaryItemProp();
    savedScoreSet = new ScoreConfigSet();
    async addActionLog(chItem, logType) {
        //操作ログ
        const actLog = new CharSummaryActionLog();
        actLog.logType = logType;
        actLog.chUuid = chItem.chUuid;
        actLog.ch = chItem.ch;
        actLog.prop = chItem.prop;
        actLog.scoreSet = chItem.scoreSet;
        const jsonText = CharSummaryActionLog.toJsonText(actLog);
        const logInst = await getLogAccessInstance();
        await logInst.put(LogTypes.CharSummaryAction, jsonText);
    }
    updateChScoreInfo(chItem) {
        const charUuidClassName = this.getCharUuidClassName(chItem);
        if (charUuidClassName === null)
            return;
        const charUuidElem = this.nested.findNodeBy(charUuidClassName);
        let scoreText = this.getChScoreText(chItem);
        const labelText = `${chItem.prop.comment}`;
        const statusText = `${labelText}${scoreText}`;
        let html = this.nested.makeTextCell(`${charUuidClassName}`, labelText, statusText).ToHTML();
        this.nested.setCellContent(charUuidElem, 0, html);
    }
    moverOnMoveDone = async (dlg) => {
        console.log(`[${dlg.className}] moved`);
        const zindexHelper = new HtmlZindexHelper();
        zindexHelper.SaveSetting(dlg);
        if (this.requestActivate !== undefined) {
            await this.requestActivate(dlg);
        }
    };
    imageLoader;
    enableLazyImages(imageLoader) {
        this.htmlMaker.initObserver(this.dlgCssClassName(), imageLoader);
        this.imageLoader = imageLoader;
    }
    onCopyPaste = async (dlg, cpType) => {
        console.log(`[${dlg.className}] selected [${cpType}]`);
        const marker = `charSummary:`;
        switch (cpType) {
            case HtmlMakerCopyPasteTypes.Copy:
                const toText = CharSummaryJson.toJsonText(this);
                await ClipboardHelper.put(`${marker}${toText}`);
                break;
            case HtmlMakerCopyPasteTypes.Paste:
                const fromText = await ClipboardHelper.get();
                if (fromText === null)
                    break;
                if (!fromText.startsWith(marker)) {
                    //ペーストエラーメッセージ
                    const msgbox = new EvonaMessageBox;
                    msgbox.setParent(this.dlgCssClassName());
                    let res = MessageBoxResultTypes.None;
                    res = await msgbox.showWait(`ペーストデータの形式が不正です<br>${marker}`);
                    break;
                }
                const resInst = JSON.parse(fromText.substring(marker.length));
                //console.log(resInst)
                const newInst = CharSummaryJson.fromJsonInst(resInst);
                this.chList = newInst.chList;
                this.nested.disableEvents();
                this.nested.reset();
                await this.addAllCharNodes();
                this.enableLazyImages(this.imageLoader);
                this.nested.enableEvents(this.onNestedNodeSelect);
                break;
            default:
                break;
        }
    };
    itemAddCssClassName() {
        return `char-summary-add`;
    }
    nsComboCssClassName() {
        return `${this.dlgCssClassName()}-nscombo`;
    }
    dlgContentCssClassName() {
        return `${this.dlgCssClassName()}-content`;
    }
    dlgCssClassName() {
        return "char-summary-dlg";
    }
    applyCss() {
        const leftPos = parseInt(this.uiInfo.left);
        const topPos = parseInt(this.uiInfo.top);
        const style = document.createElement("style");
        style.textContent =
            `
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName, leftPos, topPos)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgContentCssClassName()} {
  width: 100%;
  height: 420px;
  max-width: 320px;
  min-width: 240px;
  margin: 0 auto;
}

${this.htmlMaker.MakeDefaultToolButtonsCss()}

/* 登録キャラの名前 */
span[class^="Cns"] {
${HtmlMakerCommonCss.spanCssText(`0.8`, true)}
}
/* 登録キャラのボタン */
button[class^="Cns"] {
${HtmlMakerCommonCss.spanCssText(`0.8`, true)}
}
/* 更新ボタン */
button[class^="Cns"][item-id="${this.updateItemId}"] {
background: #9c27b0; /* 紫 */
color: white;
border-radius: 4px;
padding: 4px 12px;
cursor: pointer;
}
/* 削除ボタン */
button[class^="Cns"][item-id="${this.deleteItemId}"] {
background: #e91e63; /* ピンクがかった赤（ポップな警告色） */
color: white;
border-radius: 4px;
padding: 4px 12px;
cursor: pointer;
}

${this.scoreGrid.getCssText(this.gridName, this.keyClassName, this.commentClassName)}
${this.scoreGrid.getCssText(this.gridName, this.keyClassName, this.fixedClassName)}
${this.scoreGrid.getCssText(this.gridName, this.keyClassName, this.valueClassName)}

.${this.gridFooterName} {
${HtmlMakerCommonCss.footerText()}
}
.${this.gridFooterName} button {
${HtmlMakerCommonCss.footerButtonText()}
}

`.trim();
        document.head.appendChild(style);
        const dlgParent = document.getElementById(this.parentName);
        this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`, dlgParent);
    }
}
export class CharSummaryActionReq {
    selectCh;
    selectedImg;
    scoreSet;
    cancel = false;
}
export const CharSummaryActionLogTypes = {
    None: "None",
    Add: "Add",
    Delete: "Delete",
    Update: "Update",
};
export class CharSummaryActionLog {
    logType = CharSummaryActionLogTypes.None;
    chUuid = ``;
    ch;
    prop;
    scoreSet;
    static toJsonText(log) {
        return JSON.stringify(log, null, 2);
    }
    static fromJsonText(jsonText) {
        const resJson = JSON.parse(jsonText);
        return resJson;
    }
}
class CharSummaryItemJson {
    chUuid = ``;
    ch = new CharSpecItemJson;
    prop = new CharSummaryItemProp;
    scoreSet;
    static toJsonText(item) {
        const res = CharSummaryItemJson.toJsonInst(item);
        return JSON.stringify(res, null, 2);
    }
    static toJsonInst(item) {
        const res = new CharSummaryItemJson;
        res.chUuid = item.chUuid;
        res.ch = CharSpecItemJson.toJsonInst(item.ch);
        CharSummaryItemProp.copy(item.prop, res.prop);
        res.scoreSet = item.scoreSet;
        return res;
    }
    static fromJsonInst(item) {
        const res = new CharSummaryItem;
        res.ch = CharSpecItemJson.fromJsonInst(item.ch);
        CharSummaryItemProp.copy(item.prop, res.prop);
        res.scoreSet = new ScoreConfigSet;
        ScoreConfigSet.copy(item.scoreSet, res.scoreSet, true);
        return res;
    }
}
export class CharSummaryJson {
    items = new Array;
    static toJsonText(charSummay) {
        const res = CharSummaryJson.toJsonInst(charSummay);
        return JSON.stringify(res, null, 2);
    }
    static toJsonInst(charSummay) {
        const res = new CharSummaryJson;
        res.items = new Array;
        for (const item of charSummay.chList) {
            res.items.push(CharSummaryItemJson.toJsonInst(item));
        }
        return res;
    }
    static fromJsonInst(charSummay) {
        const res = new CharSummary;
        res.chList = new Array;
        for (const item of charSummay.items) {
            res.chList.push(CharSummaryItemJson.fromJsonInst(item));
        }
        return res;
    }
}
//# sourceMappingURL=CharSummary.js.map
import { CharStatusClassifyTypes, CharNameSpaceTypes, } from "./CharClass.js";
export class CharSpecItem {
    gt = CharStatusClassifyTypes.none;
    ns = CharNameSpaceTypes.None;
    //id: number = 0
    name = "";
    contentURL = "";
    iconURL = "";
    idAsText = "";
    idAttributeForHTML = "";
    static env;
    get id() { return this.idAsText; }
    get displayText() { return `${this.name}(${this.id})`; }
    get uniqueName() { return `${this.name.replace(/[\s\u3000.]+/g, `_`)}_${this.id}`; }
    get iconFileName() {
        return this.id === null && !Number.isNaN(this.id) ? `${this.name}_${this.idAsText}.png` : `${this.name}_${this.id}.png`;
    }
    get contentAppURL() {
        //return `http://localhost:8000/Status/puyoStatus_119595.html`
        const pathsplit = this.contentURL.split(`/`);
        if (pathsplit.length === 0)
            return ``;
        const fileName = pathsplit[pathsplit.length - 1];
        const importer = ImporterMap.get(CharSpecItem.env.gameType);
        return `${CharSpecItem.env.appHref}Status/${importer.statusMaker}${fileName}.html`;
    }
    get contentHtmlFile() {
        //return `./User1/puyoStatus_119595.html`
        const pathsplit = this.contentURL.split(`/`);
        if (pathsplit.length === 0)
            return ``;
        let fileName = pathsplit[pathsplit.length - 1];
        if (!this.isNumeric(fileName))
            fileName = this.idAsText;
        const ext = fileName.endsWith(`.html`) ? `` : `.html`;
        const importer = ImporterMap.get(CharSpecItem.env.gameType);
        return `${importer.statusMaker}${fileName}${ext}`;
    }
    isNumeric(value) {
        if (value.trim() === ``)
            return false;
        return !isNaN(Number(value));
    }
    parseFromImgName(imgName) {
        let pDelim = imgName.indexOf("_");
        if (pDelim >= 0) {
            const namePart = imgName.substring(0, pDelim);
            let idPart = imgName.substring(pDelim + 1);
            pDelim = idPart.indexOf(".");
            if (pDelim >= 0) {
                idPart = idPart.substring(0, pDelim);
                //this.id = Number.parseInt(idPart)
                this.idAsText = idPart;
                this.name = namePart;
                this.idAsText = Number.isNaN(this.id) ? idPart : "";
                return true;
            }
        }
        return false;
    }
    static copy(from, to) {
        to.gt = from.gt;
        to.ns = from.ns;
        //to.id = from.id
        to.name = from.name;
        to.contentURL = from.contentURL;
        to.iconURL = from.iconURL;
        to.idAsText = from.idAsText;
        to.idAttributeForHTML = from.idAttributeForHTML;
    }
}
/**検索方法 */
export const CharFinderTypes = {
    Name: "Name",
    Skill: "Skill",
};
export class CharFinderTypeItem {
    finderType;
    displayText = ``;
    placeholder = ``;
}
/**検索方法定義 */
export const charFinderMap = new Map([
    [CharFinderTypes.Name, { finderType: CharFinderTypes.Name, displayText: `キャラ名`, placeholder: `キャラ名検索...` }],
    [CharFinderTypes.Skill, { finderType: CharFinderTypes.Skill, displayText: `スキル`, placeholder: `スキル検索...` }],
]);
/**キャラファインダ */
export class CharFinder {
    itemName = ``;
    onScroll;
    chNames = new Array;
    index = -1;
    chSet; //for name finder
    charSkillMap; //for skill finder
    matchChList;
    typesElem;
    inputElem;
    reset() {
        this.itemName = ``;
        this.chNames = new Array;
        this.index = -1;
        this.onScroll = null;
    }
    makeInputWidgets(inputParentCssClassName, typesCssClassName, inputCssClassName) {
        const inputParents = document.getElementsByClassName(inputParentCssClassName);
        if (inputParents === null)
            return null;
        const inputParent = inputParents[0];
        const typesElem = this.makeTypesCombo(typesCssClassName);
        const inputElem = document.createElement(`input`);
        inputElem.type = `text`;
        inputElem.className = inputCssClassName;
        inputElem.id = inputCssClassName;
        inputElem.placeholder = charFinderMap.get(CharFinderTypes.Name).displayText;
        inputParent.appendChild(typesElem);
        inputParent.appendChild(inputElem);
        this.typesElem = typesElem;
        this.inputElem = inputElem;
        typesElem.addEventListener("change", this.onTypesChanged);
        return inputParent;
    }
    makeTypesCombo(comboName) {
        let index = -1;
        let optionHtmls = ``;
        for (const [key, item] of charFinderMap) {
            index++;
            const value = key;
            const title = item.displayText;
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
        return select;
    }
    onTypesChanged = async (ev) => {
        console.log(this.typesElem.value);
        const typeItem = this.selectedType;
        if (typeItem === undefined)
            return;
        this.inputElem.placeholder = typeItem.placeholder;
    };
    get selectedType() {
        switch (this.typesElem.value) {
            case CharFinderTypes.Name:
                return charFinderMap.get(CharFinderTypes.Name);
            case CharFinderTypes.Skill:
                return charFinderMap.get(CharFinderTypes.Skill);
        }
        return undefined;
    }
    makeNamesCombo(itemName, comboName, keyword) {
        this.reset();
        const typeItem = this.selectedType;
        if (typeItem === undefined)
            return null;
        if (typeItem.finderType === CharFinderTypes.Name)
            this.matchChList = this.chSet.chList.filter(ch => ch.name.includes(keyword));
        else {
            this.matchChList = new Array;
            for (const [id, skillMap] of this.charSkillMap) {
                for (const [key, skillText] of skillMap) {
                    const match = skillText.includes(keyword);
                    if (match) {
                        const chItem = this.chSet.chList.filter(ch => ch.id === id);
                        this.matchChList.push(chItem[0]);
                        break;
                    }
                }
            }
        }
        const itemCss = `.${itemName}`;
        let index = -1;
        let optionHtmls = ``;
        for (const ch of this.matchChList) {
            const targets = document.querySelectorAll(`${itemCss} div[title^="${ch.name}"]`);
            const elem = targets[0];
            console.log(`**makeNamesCombo**`, elem.title);
            if (elem.parentElement.style.display === `none`)
                continue;
            index++;
            //const value = elem.title.trim()
            const value = ch.name;
            const title = value;
            const selected = index === 0 ? " selected" : "";
            const optionHtml = `
 <option value="${value}"${selected}>${title}</option>
`.trim();
            optionHtmls += optionHtml;
            //this.chNames.push(title)
            this.chNames.push(ch.displayText);
        }
        if (index === -1)
            return null;
        const select = document.createElement("select");
        select.id = comboName;
        select.className = comboName;
        select.innerHTML = optionHtmls;
        select.style.width = `100%`;
        this.itemName = itemName;
        return select;
    }
    addEvent(select, onScroll) {
        select.addEventListener("change", (ev) => {
            const target = ev.target;
            const keyword = target.value;
            //const match = this.chNames.find(chName => chName === keyword)
            const match = this.chNames.find(chName => chName.startsWith(`${keyword}(`));
            if (match) {
                //this.scrollAction(keyword)
                this.scrollAction(match);
            }
        });
        this.onScroll = onScroll;
    }
    findFirst() {
        if (this.chNames.length === 0)
            return false;
        this.index = 0;
        this.scrollAction(this.chNames[this.index]);
        return true;
    }
    scroll(keyword, itemNameOpt = ``) {
        const itemCss = this.itemName === `` ? `.${itemNameOpt}` : `.${this.itemName}`;
        // 1. title属性（キャラ名）が一致する要素を探す
        // ※部分一致にしたい場合は [title*="${name}"] にします
        const target = document.querySelector(`${itemCss} div[title="${keyword}"]`);
        if (target === null)
            return null;
        // 2. その親要素（char-item）をスクロール位置へ持ってくる
        const parent = target.closest(itemCss);
        if (parent === null)
            return null;
        parent.scrollIntoView({
            behavior: 'smooth', // スルスルと動かす
            block: 'center' // `center`だとうまく位置あわせできないときがあるみたい：画面の真ん中に持ってくる
        });
        /*
        // 3. せっかくなので、目立つように一時的に光らせる（視覚的なフォーカス）
        parent.style.outline = "5px solid yellow";
        setTimeout(() => parent.style.outline = "none", 2000);
        */
        return target;
    }
    scrollAction(keyword) {
        const res = this.scroll(keyword);
        if (res) {
            if (this.onScroll !== null)
                this.onScroll(res);
        }
    }
}
//import { getPngFiles } from "./nodeTools.js";
import { GameEnv } from "./GameEnv.js";
import { ImporterMap } from "./SiteImporter.js";
import { HtmlMaker, HtmlMakerItem, HtmlMakerOptionImg } from "./HtmlMaker.js";
import { HtmlMakerDialogDesc, HtmlDialogInfo, HtmlZindexHelper } from "./HtmlMaker.js";
import { HtmlMakerDialogB4Types, HtmlMakerDialogOTypes } from "./HtmlMaker.js";
import { HtmlMakerToolTipReq, HtmlMakerToolTipReqTypes } from "./HtmlMaker.js";
import { HtmlMakerOptionItemUsingTypes } from "./HtmlMaker.js";
import { HtmlMakerTable } from "./HtmlMaker.js";
import { HtmlMakerDivScroller } from "./HtmlMaker.js";
import { HtmlMakerConst, HtmlMakerCommonCss } from "./HtmlMaker.js";
import { HtmlMakerChoice, HtmlMakerChoiceItem, HtmlMakerChoiceHeaderModes } from "./HtmlMaker.js";
import { EvonaMessageBox, MessageBoxResultTypes } from "./MessageBox.js";
import { ScoreConfigSet } from "./ScoreConfig.js";
export class CharSpecSet {
    env;
    chList;
    async LoadList(file) {
        const env = new GameEnv;
        const resJson = await env.loadJson(file);
        const resMap = resJson.map((item) => Object.assign(new CharSpecItem(), item));
        const res = new CharSpecSet();
        res.chList = resMap;
        for (const ch of res.chList) {
            if (ch.gt === undefined || ch.gt === CharStatusClassifyTypes.none)
                if (this.env !== undefined)
                    ch.gt = this.env.gameType;
        }
        return res;
    }
    findNs(id) {
        const match = this.chList.find(x => x.id === id);
        if (match) {
            return match.ns;
        }
        return CharNameSpaceTypes.None;
    }
    findByNs(ns) {
        if (ns === CharNameSpaceTypes.None)
            return undefined;
        const match = this.chList.filter(ch => ch.ns === ns);
        return match;
    }
    MakeList() {
        /*
        const pngFiles = getPngFiles()

        this.chList = new Array<CharSpecItem>

        for (const png of pngFiles) {
            const chItem = new CharSpecItem()
            //const fileName = path.basename(png)
            const res = chItem.parseFromImgName(png)
            if (res) {
                this.chList.push(chItem)
            }
        }
        */
    }
}
export class CharSpecList {
    chSet;
    uiInfo = new HtmlDialogInfo;
    charDB;
    charHtmlDB;
    charSkillMap;
    charFinder = new CharFinder;
    htmlMaker;
    parentName = "";
    selectedCh;
    requestActivate;
    requestToolTip;
    risticWordsUI;
    option = undefined;
    async toHTML(imgLoader) {
        if (!this.chSet.chList)
            return "";
        /*
        const rows = this.chList
            .map(ch => `<div class="char-item">${ch.id}: ${ch.name}</div>`)
            .join("\n");
        */
        this.htmlMaker = new HtmlMaker;
        let id = 0;
        let rows = "";
        for (const ch of this.chSet.chList) {
            id++;
            const idHTML = `chuid${id}`;
            ch.idAttributeForHTML = idHTML;
            //const url = await imgLoader.getImageUrl(ch.iconFileName);
            const url = ""; //遅延ロード有効化
            const img = new HtmlMakerOptionImg();
            img.imgSrc = url;
            img.imgFile = ch.iconFileName;
            img.marker.push(`ns="${ch.ns}"`);
            img.marker.push(`id="${ch.id}"`);
            const item = new HtmlMakerItem;
            item.props.name = this.itemCssClassName();
            item.props.id = idHTML;
            item.props.className = this.imgCssClassName();
            item.props.option.setImg(img);
            item.props.option.toolTip = ch.displayText; //`${ch.name}(${ch.id})`
            item.props.option.onSelect = (evArgs) => {
                this.setSelectedItem(evArgs.item.props.id);
                if (evArgs.parentElem !== null)
                    this.manualCheckOnOff(evArgs.parentElem);
            };
            this.htmlMaker.add(item);
        }
        return this.htmlMaker.MakeScrollableList(this.listCssClassName());
    }
    createSelectorBox(title, parentName, chListHTML) {
        this.parentName = parentName;
        let viewBtn = `
<button id="${this.dlgCssClassName()}-tbView">詳細</button>
`.trim();
        let urlBtn = `
<button id="${this.charOpenUrlCssClassName()}">URL</button>
`.trim();
        let wdBtn = `
<button id="${this.charWdsCssClassName()}">関連語</button>
`.trim();
        let selBtn = `
<button id="${this.charSelectModeCssClassName()}">選択</button>
`.trim();
        let compBtn = `
<button id="${this.charCompCssClassName()}">比較</button>
`.trim();
        let resetBtn = `
<button id="${this.charResetCssClassName()}">リセット</button>
`.trim();
        let btns = `
${viewBtn}
${urlBtn}
${wdBtn}
${selBtn}
${compBtn}
${resetBtn}
`.trim();
        const toolbarsHTML = this.htmlMaker.MakeDefaultToolButtonsHTML(btns);
        const dlgHTML = `<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
  ${toolbarsHTML}
  ${chListHTML}
  <label id="char-dlg-chinfo">未選択</label>
  <div class="${this.charSeachParentCssClassName()}" id="${this.charSeachParentCssClassName()}">
  </div>
</div>`;
        const dialogDesc = new HtmlMakerDialogDesc();
        dialogDesc.title = "<" + title + ">";
        dialogDesc.SetB4Type(HtmlMakerDialogB4Types.DialogHide);
        dialogDesc.SetOType(HtmlMakerDialogOTypes.Option, this.onVisibleToggle);
        const dlg = dialogDesc.NewDialog(parentName, this.dlgCssClassName());
        dialogDesc.SetContent(parentName, dlgHTML);
        const inputParent = this.charFinder.makeInputWidgets(this.charSeachParentCssClassName(), this.charSeachTypesCssClassName(), this.charSeachInputCssClassName());
        if (inputParent !== null) {
            this.charFinder.chSet = this.chSet;
            this.charFinder.charSkillMap = this.charSkillMap;
        }
        this.applyCss();
        dialogDesc.EnableEventHandlers();
        dialogDesc.onMoveDone = this.moverOnMoveDone;
        return dlg;
    }
    addEventHandlers(dlg) {
        //キャラ検索
        document.getElementById(this.charSeachInputCssClassName()).oninput = (e) => {
            if (e !== null && e.target !== null) {
                const input = e.target;
                console.log(input.value);
                const keyword = input.value;
                this.seachKwAction(keyword);
            }
        };
        //キャラ詳細
        const tbView = document.getElementById(`${this.dlgCssClassName()}-tbView`);
        if (tbView !== null) {
            tbView.onclick = async () => { await this.onCharView(); };
        }
        //キャラ関連語
        const wdsBtn = document.getElementById(this.charWdsCssClassName());
        wdsBtn.onclick = async () => {
            const words = this.risticWordsUI.getRisticWdForChListUI(this.selectedCh.id);
            if (words.length === 0)
                return;
            if (wdsBtn === null)
                return;
            const btn = wdsBtn;
            const choiceItems = new Array;
            for (let iWd = 0; iWd < words.length; iWd++) {
                const itemWd = new HtmlMakerChoiceItem();
                itemWd.key = `${iWd}`;
                itemWd.text = words[iWd];
                choiceItems.push(itemWd);
            }
            const choice = new HtmlMakerChoice();
            choice.headerTitle = `${this.selectedCh.name}の関連語`;
            choice.setChoiceItems(choiceItems);
            choice.onCancel = onRisticCharButtonCancel;
            choice.callerElem = btn;
            //const dlg = risticToolTip!.dlg
            const htmlMaker = this.htmlMaker;
            if (htmlMaker.IsEnabledElem(btn) === false)
                return;
            htmlMaker.EnableElem(btn, false);
            const rcDlg = htmlMaker.GetRect(dlg);
            const rcBtn = htmlMaker.GetRect(btn);
            const parentName = dlg.id;
            choice.setListener(`${parentName}-choice`, parentName, `${parentName}-wds`, HtmlMakerChoiceHeaderModes.Visible);
            choice.applyCss();
            choice.show(`${parseInt(rcBtn.left) - parseInt(rcDlg.left) - 1}`, `${parseInt(rcBtn.top) - parseInt(rcDlg.top) + parseInt(rcBtn.height)}`);
            //choice.moveLeftByWidth(parseInt(rcBtn.left) - parseInt(rcDlg.left) - 1 + parseInt(rcBtn.width))
            choice.enableEvents(
            /*onSelect*/
            async (ev) => {
                //console.log(`[onSelect] ${ev.callerName} ${ev.result}`)
                choice.dispose();
                const iWd = Number(ev.result);
                const word = words[iWd];
                await this.risticWordsUI.activateRisticWdForChListUI(word);
                htmlMaker.EnableElem(btn, true);
            });
        };
        const onRisticCharButtonCancel = async function (choice, callerElem) {
            choice.dispose();
            if (callerElem !== null) {
                const htmlMaker = new HtmlMaker();
                htmlMaker.EnableElem(callerElem, true);
            }
        };
        //キャラ詳細情報URLを開く
        document.getElementById(this.charOpenUrlCssClassName()).onclick = async () => {
            if (this.selectedCh === undefined)
                return;
            const match = this.chSet.chList.find(ch => this.selectedCh.idAttributeForHTML === ch.idAttributeForHTML);
            if (match) {
                const parentName = this.charOpenUrlCssClassName();
                const msgbox = new EvonaMessageBox;
                msgbox.setParent(this.dlgCssClassName());
                msgbox.setYesNo();
                const res = await msgbox.showWait(`${match.name} をブラウザで開いてよろしいですか？`);
                if (res === MessageBoxResultTypes.Yes) {
                    // 別タブで開く
                    //const url = match.contentURL
                    /*これは解凍済みのHTMLを表示する場合
                    const url = match.contentAppURL
                    window.open(url, '_blank');
                    */
                    let cacheOpen = false;
                    if (this.charHtmlDB !== undefined) {
                        if (this.charHtmlDB.fileNames !== null)
                            cacheOpen = true;
                    }
                    if (cacheOpen) {
                        //ローカルキャッシュ(zipに入ったhtml)を利用する場合
                        await this.charHtmlDB.openUrl(match.contentHtmlFile);
                    }
                    else {
                        //ネットワークアクセス
                        const url = match.contentURL;
                        window.open(url, '_blank');
                    }
                }
            }
        };
        //マルチ選択モード
        const tbSel = document.getElementById(`${this.charSelectModeCssClassName()}`);
        if (tbSel !== null) {
            tbSel.onclick = async () => { await this.toggleMultiSelect(); };
        }
        //マルチ選択リセット
        const tbReset = document.getElementById(`${this.charResetCssClassName()}`);
        if (tbReset !== null) {
            tbReset.onclick = async () => { await this.onCompReset(); };
        }
        //キャラ比較
        const tbComp = document.getElementById(`${this.charCompCssClassName()}`);
        if (tbComp !== null) {
            this.compBtnVisible(false);
            tbComp.onclick = async () => { await this.onCompView(); };
        }
    }
    addItemEventHandlers() {
        //クリック有効化
        const idText = this.htmlMaker.GetIdByIndex(0);
        this.htmlMaker.SelectByID(this.itemCssClassName(), idText);
        this.htmlMaker.enableEvents(this.itemCssClassName());
        this.setSelectedItem(idText);
    }
    isMulitiSelect = false;
    multiSelect = new Array;
    /**シングル/マルチ選択の切り替え */
    async toggleMultiSelect() {
        if (this.isMulitiSelect) {
            this.isMulitiSelect = false;
            this.multiSelect = new Array;
            this.htmlMaker.removeCheckBox(this.itemCssClassName(), this.chkCssClassName());
            this.compBtnVisible(false);
        }
        else {
            this.isMulitiSelect = true;
            this.multiSelect = new Array;
            this.htmlMaker.appendCheckBox(this.itemCssClassName(), this.chkCssClassName());
            this.compBtnVisible(true);
        }
    }
    /**マルチ選択のチェックOn/Off切り替え */
    manualCheckOnOff(parentElem) {
        console.log(parentElem);
        const onoff = this.htmlMaker.findCheckBox(parentElem, this.chkCssClassName());
        if (onoff === null)
            return;
        const chIdText = this.htmlMaker.getCheckBoxDataId(parentElem);
        if (chIdText === undefined)
            return;
        const chId = chIdText;
        const chItem = this.chSet.chList.find(item => item.id === chId);
        if (chItem === undefined)
            return;
        if (onoff === false) {
            if (this.multiSelect.length >= 3)
                return;
            this.htmlMaker.toggleCheckBox(parentElem, this.chkCssClassName());
            const exist = this.multiSelect.find(item => item.id === chId);
            if (exist === undefined) {
                this.multiSelect.push(chItem);
            }
        }
        else {
            this.htmlMaker.toggleCheckBox(parentElem, this.chkCssClassName());
            const exist = this.multiSelect.findIndex(item => item.id === chId);
            if (exist !== -1) {
                this.multiSelect.splice(exist, 1);
            }
        }
        //console.log(this.multiSelect)
        const ids = this.multiSelect.map((chItem) => chItem.idAsText);
        console.log(ids);
        //this.charDB.getComparisonStatusList(ids)
    }
    compBtnVisible(vis) {
        this.htmlMaker.setVisible(this.charCompCssClassName(), vis);
        this.htmlMaker.setVisible(this.charResetCssClassName(), vis);
    }
    async onCompReset() {
        this.multiSelect = new Array;
        this.htmlMaker.resetCheckBox(this.itemCssClassName(), this.chkCssClassName());
    }
    async onCompView() {
        await this.requestCompToToolTipMgr(HtmlMakerToolTipReqTypes.AddTable);
    }
    async requestCompToToolTipMgr(reqType) {
        if (this.requestToolTip === undefined)
            return;
        const compFormName = `charComp`;
        function tableRowCssClassName() {
            return `${compFormName}-row`;
        }
        function itemNameCssClassName() {
            return `${compFormName}-title`;
        }
        function itemIdCssClassName() {
            return `${compFormName}-chid`;
        }
        function getRowTitle(keyStatus, chIds) {
            let title = `**bug:st**`;
            for (const chId of chIds) {
                if (chId === undefined)
                    continue;
                const existScs = charMap.get(chId);
                if (existScs !== undefined) {
                    const existSci = existScs.items.find(sci => sci.key === keyStatus);
                    if (existSci !== undefined) {
                        title = `${existSci.title}`;
                        break;
                    }
                }
            }
            return title;
        }
        function setColTitles(chList) {
            const titleRow = 0;
            let colIndex = 0;
            table.getCell(colIndex, titleRow).typeInfo.setLabel(`　`, false);
            table.getCell(colIndex, titleRow).className = titleCssClassName;
            table.getCell(colIndex, titleRow).typeInfo.using.itemId = titleRow + table.firstRowIndex;
            let titles = ``;
            for (const [chId, scs] of charMap) {
                const existCh = chList.find(ch => ch.idAsText === chId);
                let colTitle = ``;
                if (existCh !== undefined)
                    colTitle = `${existCh.uniqueName}`;
                else
                    colTitle = `**bug:id**`;
                colIndex++;
                table.getCell(colIndex, titleRow).typeInfo.setLabel(colTitle, false);
                table.getCell(colIndex, titleRow).className = titleCssClassName;
                table.getCell(colIndex, titleRow).typeInfo.using.itemId = titleRow + table.firstRowIndex;
                if (titles !== ``)
                    titles += `_`;
                titles += colTitle;
            }
            return titles;
        }
        const ids = this.multiSelect.map((chItem) => chItem.idAsText);
        if (ids.length === 0)
            return;
        const cmpRes = await this.charDB.getComparisonStatusList(ids);
        const charMap = cmpRes[0];
        const resMatrix = cmpRes[1];
        console.log(charMap, resMatrix);
        for (const [chId, scs] of charMap) {
            ScoreConfigSet.renameTitles(scs);
        }
        //テーブル作成
        const nRow = resMatrix.size;
        const nCol = charMap.size;
        const table = new HtmlMakerTable();
        table.makeDim(1 + nCol, 1 + nRow);
        //カラム定義
        const titleCssClassName = itemNameCssClassName();
        const idsCssClassName = itemIdCssClassName();
        //カラムタイトル
        const titles = setColTitles(this.chSet.chList);
        let rowIndex = -1;
        for (const [keyStatus, chIds] of resMatrix) {
            //行タイトル
            let title = getRowTitle(keyStatus, chIds);
            rowIndex++;
            const titleRow = rowIndex + 1;
            const lenLimit = 16;
            let nLineMax = 0;
            for (const chId of chIds) {
                let nLine = 0;
                if (chId !== undefined) {
                    const scs = charMap.get(chId);
                    if (scs === undefined)
                        continue;
                    const existSci = scs.items.find(sci => sci.key === keyStatus);
                    if (existSci === undefined)
                        continue;
                    if (existSci.isSkill) {
                        const skills = existSci.selectedVal.split(`=`);
                        for (const skillText of skills) {
                            const skillParts = skillText.split(`<br>`);
                            for (const skillPart of skillParts) {
                                let skill = skillPart;
                                while (skill.length > lenLimit) {
                                    skill = skill.substring(lenLimit);
                                    nLine++;
                                }
                                if (skill.length !== 0) {
                                    nLine++;
                                }
                            }
                        }
                    }
                    else {
                        nLine = 1;
                    }
                }
                if (nLine > nLineMax)
                    nLineMax = nLine;
            }
            let colIndex = 0;
            for (const chId of chIds) {
                let content = `[NaN]`;
                let nLine = 0;
                if (chId !== undefined) {
                    const scs = charMap.get(chId);
                    if (scs === undefined)
                        continue;
                    const existSci = scs.items.find(sci => sci.key === keyStatus);
                    if (existSci === undefined)
                        continue;
                    if (existSci.isSkill) {
                        const skills = existSci.selectedVal.split(`=`);
                        content = ``;
                        for (const skillText of skills) {
                            const skillParts = skillText.split(`<br>`);
                            for (const skillPart of skillParts) {
                                let skill = skillPart;
                                while (skill.length > lenLimit) {
                                    if (content !== ``)
                                        content += `<br>`;
                                    content += skill.substring(0, lenLimit);
                                    skill = skill.substring(lenLimit);
                                    nLine++;
                                }
                                if (skill.length !== 0) {
                                    if (content !== ``)
                                        content += `<br>`;
                                    content += skill.substring(0, lenLimit);
                                    nLine++;
                                }
                            }
                        }
                        /*連続する <br> を1つにまとめて前後を掃除！
                        */
                        // 💡 仕上げ：連続する <br> を1つにまとめて前後を掃除！
                        content = content
                            .replace(/(<br\s*\/?>\s*)+/g, '<br>') // 連続 <br> を1つに集約
                            .replace(/^<br\s*\/?>|<br\s*\/?>$/g, ''); // 先頭・末尾の <br> を除去
                    }
                    else {
                        content = `${existSci.maxScore}`;
                        nLine = 1;
                    }
                }
                colIndex++;
                if (nLineMax >= 2)
                    content += `<br>`.repeat(nLineMax - nLine + 1);
                table.getCell(colIndex, titleRow).typeInfo.setLabel(content, false);
                table.getCell(colIndex, titleRow).className = idsCssClassName;
                table.getCell(colIndex, titleRow).typeInfo.using.itemId = titleRow + table.firstRowIndex;
                //if (nLine > nLineMax) nLineMax = nLine
            }
            if (nLineMax >= 2)
                title += `<br>`.repeat(nLineMax);
            colIndex = 0;
            table.getCell(colIndex, titleRow).typeInfo.setLabel(title, false);
            table.getCell(colIndex, titleRow).className = titleCssClassName;
            table.getCell(colIndex, titleRow).typeInfo.using.itemId = titleRow + table.firstRowIndex;
        }
        //行テンプレート初期化
        table.makeRowTemplate(tableRowCssClassName());
        const name = this.selectedCh.name;
        const req = new HtmlMakerToolTipReq();
        req.reqType = reqType;
        req.parentClassName = this.dlgCssClassName();
        req.uiName = this.uiInfo.name;
        req.itemName = titles;
        req.title = `キャラ比較`;
        req.table = table;
        req.tblAuxCss = `
.${titleCssClassName} {
white-space: pre;
justify-content: flex-end;
}
.${idsCssClassName} {
white-space: pre;
justify-content: flex-end;
}
`.trim();
        await this.requestToolTip(req);
    }
    async onCharView() {
        await this.requestToToolTipMgr(HtmlMakerToolTipReqTypes.AddMemo);
    }
    async requestToToolTipMgr(reqType) {
        if (this.requestToolTip !== undefined) {
            const chId = `${this.selectedCh.id}`;
            const scItems = await this.charDB.getStatus(chId);
            if (scItems !== null && scItems.items !== undefined) {
                ScoreConfigSet.renameTitles(scItems);
                const name = this.selectedCh.name;
                const req = new HtmlMakerToolTipReq();
                req.reqType = reqType;
                req.parentClassName = this.dlgCssClassName();
                req.uiName = this.uiInfo.name;
                req.itemName = this.selectedCh.uniqueName;
                req.title = name;
                req.memo = name + scItems.getMaxScoreText(HtmlMakerConst.toolTipNewLine);
                await this.requestToolTip(req);
            }
        }
    }
    seachKwAction(keyword) {
        const comboName = this.charSeachComboCssClassName();
        const oldCombo = document.getElementById(comboName);
        if (oldCombo !== null) {
            oldCombo.parentNode?.removeChild(oldCombo);
        }
        if (keyword === ``)
            return;
        const combo = this.charFinder.makeNamesCombo(this.itemCssClassName(), comboName, keyword);
        if (combo !== null) {
            const parent = document.getElementById(this.charSeachParentCssClassName());
            if (parent !== null) {
                parent.appendChild(combo);
                this.charFinder.addEvent(combo, (elem) => {
                    this.htmlMaker.UnselectAll(this.itemCssClassName());
                    const parent = elem.parentElement;
                    const id = parent.getAttribute("item-id");
                    this.htmlMaker.SelectByID(this.itemCssClassName(), id);
                });
                this.charFinder.findFirst();
            }
        }
    }
    tableScroll = null;
    fsHtmlMaker;
    scrollByKw(keyword, fsHtmlMaker) {
        const elem = this.charFinder.scroll(keyword, this.itemCssClassName());
        if (elem !== null) {
            this.htmlMaker.UnselectAll(this.itemCssClassName());
            const parent = elem.parentElement;
            const id = parent.getAttribute("item-id");
            this.htmlMaker.SelectByID(this.itemCssClassName(), id);
            //スクロールイベント登録
            if (this.tableScroll === null) {
                this.tableScroll = new HtmlMakerDivScroller();
                this.tableScroll.onStart = this.onScrollStart;
                this.tableScroll.onEnd = this.onScrollEnd;
                this.tableScroll.enableEvent(this.listCssClassName());
            }
            this.tableScroll.isPause = true; //スクロールしていない
            this.fsHtmlMaker = new HtmlMaker;
        }
    }
    onScrollStart = async () => {
        if (this.tableScroll === null)
            return;
        //検索開始を通知
        if (this.fsHtmlMaker !== undefined) {
            const splashName = `splash-screen`;
            const msgElem = this.fsHtmlMaker.getFullScreenMsgElem(splashName);
            if (msgElem !== null)
                msgElem.innerHTML = `キャラ検索中 ...`;
            this.fsHtmlMaker.showFullScreenCss(splashName);
        }
    };
    onScrollEnd = async () => {
        if (this.tableScroll === null)
            return;
        //検索終了を通知
        if (this.fsHtmlMaker !== undefined) {
            const splashName = `splash-screen`;
            this.fsHtmlMaker.hideFullScreenCss(splashName);
        }
    };
    cmdsVisible(risticVisible) {
        this.htmlMaker.setVisible(this.charWdsCssClassName(), risticVisible);
    }
    moverOnMoveDone = async (dlg) => {
        console.log(`[${dlg.className}] moved`);
        const zindexHelper = new HtmlZindexHelper();
        zindexHelper.SaveSetting(dlg);
        if (this.requestActivate !== undefined) {
            await this.requestActivate(dlg);
        }
    };
    onVisibleToggle = async (dlg, oType) => {
        console.log(`**onVisibleToggle**`);
        if (this.option !== undefined) {
            this.option.SetVisible(!this.option.GetVisible());
            return;
        }
    };
    idComboKwMap;
    nsFilter = [CharNameSpaceTypes.None, CharNameSpaceTypes.None];
    gmFilter = []; //コンビネーション名の配列
    onNsOptionChanged = async (nsCells) => {
        //console.log(`**onNsOptionChanged**`)
        if (this.option === undefined)
            return;
        this.nsFilter = new Array;
        for (const nsCell of nsCells) {
            this.nsFilter.push(nsCell.typeInfo.using.radio.selectedItem);
        }
        console.log(`**onNsOptionChanged**`, this.nsFilter);
        this.charFilter();
    };
    onGmOptionChanged = async (gmCells) => {
        //console.log(`**onGmOptionChanged**`)
        if (this.option === undefined)
            return;
        this.gmFilter = new Array;
        for (const cell of gmCells) {
            if (cell.typeInfo.using.itemType !== HtmlMakerOptionItemUsingTypes.Radio)
                continue;
            const radio = cell.typeInfo.using.radio;
            if (radio.selectedItems.length === 0)
                continue;
            for (const pair of radio.selectionPair) {
                const [title, value] = pair.split(`/`);
                const findText = radio.selectedItems.find(sel => sel === value);
                if (findText !== undefined) {
                    this.gmFilter.push(title);
                }
            }
        }
        console.log(`**onGmOptionChanged**`, this.gmFilter);
        this.charFilter();
    };
    charFilter() {
        const listElems = document.querySelectorAll(`.${this.listCssClassName()}`);
        if (listElems === null || listElems.length === 0)
            return;
        const charElems = listElems[0].children;
        for (const charElem of charElems) {
            if (charElem instanceof HTMLDivElement) {
                const divElem = charElem;
                const ns = divElem.dataset.ns || ``;
                const id = divElem.dataset.id || ``;
                if (ns.trim() === `` || id.trim() === ``)
                    continue;
                const imgElem = divElem.children[0];
                const filename = imgElem.dataset.filename;
                //console.log(divElem.dataset, imgElem.dataset)
                let isEnableGmFilter = false;
                if (this.gmFilter.length === 0)
                    isEnableGmFilter = true;
                else {
                    const kws = this.idComboKwMap.get(id);
                    if (kws !== undefined) {
                        for (const kw of kws) {
                            const isMatch = this.gmFilter.find(filterText => filterText === kw);
                            if (isMatch !== undefined) {
                                isEnableGmFilter = true;
                                break;
                            }
                        }
                    }
                }
                //console.log(`**charFilter**`, filename, isEnableGmFilter)
                let isVisible = false;
                for (const filter of this.nsFilter) {
                    const isEnableNsFilter = filter === CharNameSpaceTypes.None || ns === filter;
                    if (isEnableNsFilter && isEnableGmFilter) {
                        isVisible = true;
                        break;
                    }
                }
                //console.log(`**charFilter**`, filename, isEnableGmFilter, isVisible)
                divElem.style.display = isVisible ? `` : `none`;
                if (!imgElem.src && filename) {
                    imgElem.src = filename;
                }
            }
        }
        //強制リセット！
        //window.dispatchEvent(new Event('scroll'));
        const inputElem = document.getElementById(this.charSeachInputCssClassName());
        if (inputElem !== null) {
            const input = inputElem;
            const keyword = input.value;
            this.seachKwAction(keyword);
        }
    }
    setSelectedItem(idText) {
        const match = this.chSet.chList.find(ch => idText === ch.idAttributeForHTML);
        if (match) {
            document.getElementById("char-dlg-chinfo").textContent = match.name;
            this.selectedCh = match;
        }
    }
    enableLazyImages(imageLoader) {
        this.htmlMaker.initObserver(this.dlgCssClassName(), imageLoader);
        //this.htmlMaker.enableScrollEvent(this.listCssClassName())
    }
    itemCssClassName() {
        return "char-item";
    }
    imgCssClassName() {
        return "base";
    }
    chkCssClassName() {
        return "char-chk";
    }
    listCssClassName() {
        return "char-list";
    }
    dlgContentCssClassName() {
        return `char-dlg-content`;
    }
    dlgCssClassName() {
        return "char-dlg";
    }
    charSeachTypesCssClassName() {
        return "char-search-types";
    }
    charSeachInputCssClassName() {
        return "char-search-input";
    }
    charSeachComboCssClassName() {
        return "char-search-combo";
    }
    charSeachParentCssClassName() {
        return "char-search-parent";
    }
    charOpenUrlCssClassName() {
        return "char-open-url";
    }
    charWdsCssClassName() {
        return "char-words";
    }
    charSelectModeCssClassName() {
        return "char-select-mode";
    }
    charCompCssClassName() {
        return "char-comp";
    }
    charResetCssClassName() {
        return "char-reset";
    }
    applyCss() {
        const listName = this.listCssClassName();
        const itemName = this.itemCssClassName();
        const imgName = this.imgCssClassName();
        const chkName = this.chkCssClassName();
        const leftPos = parseInt(this.uiInfo.left);
        const topPos = parseInt(this.uiInfo.top);
        const style = document.createElement("style");
        style.textContent =
            `
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName, leftPos, topPos)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgContentCssClassName()} {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

${this.htmlMaker.MakeDefaultScrollCss(this.parentName, 300)}
${this.htmlMaker.MakeDefaultGridColCss(listName, 64, 5, 64 * 5 + 16)}

${this.htmlMaker.MakeDefaultItemImgCss(itemName, imgName, 64, 64)}
${this.htmlMaker.MakeDefaultSelectionCss(itemName)}

.${itemName} .${chkName} {
  position: absolute;
  width: 16px;
  height: 16px;
  right: 0;
  bottom: 0;
  accent-color: ${HtmlMakerCommonCss.onColor};
}

${this.htmlMaker.MakeDefaultToolButtonsCss()}
${this.htmlMaker.MakeDefaultButtonsCss()}
`.trim();
        document.head.appendChild(style);
        const dlgParent = document.getElementById(this.parentName);
        this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`, dlgParent);
    }
}
export class CharSpecListSelectResult {
    ch;
    cancel = false;
}
export class CharSpecItemJson {
    gt = CharStatusClassifyTypes.none;
    ns = CharNameSpaceTypes.None;
    //id: number = 0
    name = "";
    contentURL = "";
    iconURL = "";
    idAsText = "";
    static toJsonText(item) {
        const res = CharSpecItemJson.toJsonInst(item);
        return JSON.stringify(res, null, 2);
    }
    static toJsonInst(item) {
        const res = new CharSpecItemJson;
        res.gt = item.gt;
        res.ns = item.ns;
        //res.id = item.id
        res.idAsText = item.idAsText;
        res.name = item.name;
        res.contentURL = item.contentURL;
        res.iconURL = item.iconURL;
        return res;
    }
    static fromJsonInst(item) {
        const res = new CharSpecItem;
        res.gt = item.gt;
        res.ns = item.ns;
        //res.id = item.id
        res.idAsText = item.idAsText;
        res.name = item.name;
        res.contentURL = item.contentURL;
        res.iconURL = item.iconURL;
        return res;
    }
}
export class CharSpecListJson {
    chList;
    static toJsonText(list) {
        const res = CharSpecListJson.toJsonInst(list);
        return JSON.stringify(res, null, 2);
    }
    static toJsonInst(list) {
        const res = new CharSpecListJson;
        res.chList = new Array;
        for (const item of list.chSet.chList) {
            res.chList.push(CharSpecItemJson.toJsonInst(item));
        }
        return res;
    }
    static fromJsonInst(list) {
        const res = new CharSpecList;
        res.chSet.chList = new Array;
        for (const item of list.chList) {
            res.chSet.chList.push(CharSpecItemJson.fromJsonInst(item));
        }
        return res;
    }
}
/*
export class NodeJsonLoader {
    async load<T extends object>(file: string, ctor: { new (...args: any[]): T }): Promise<T[]> {
        const data = await import(file, { with: { type: "json" } });
        return data.default.map((item: any) => Object.assign(new ctor(), item));
    }
}
export class BrowserJsonLoader {
    async load<T extends object>(file: string, ctor: { new (...args: any[]): T }): Promise<T[]> {
        const res = await fetch(file);
        const data = await res.json();
        return data.map((item: any) => Object.assign(new ctor(), item));
    }
}
*/
//# sourceMappingURL=CharSpec.js.map
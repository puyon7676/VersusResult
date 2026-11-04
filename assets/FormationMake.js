import { HtmlMaker, HtmlMakerItem, HtmlMakerOptionImg } from "./HtmlMaker.js";
import { HtmlMakerDialogDesc, HtmlDialogInfo, HtmlZindexHelper } from "./HtmlMaker.js";
import { HtmlMakerDialogB2Types, HtmlMakerDialogB4Types, HtmlMakerDialogOTypes } from "./HtmlMaker.js";
import { EvonaMessageBox, MessageBoxResultTypes } from "./MessageBox.js";
import { HtmlMakerCopyPasteTypes } from "./HtmlMaker.js";
import { HtmlMakerOptionCombo, HtmlMakerOptionItemUsingTypes } from "./HtmlMaker.js";
import { HtmlMakerTableCell } from "./HtmlMaker.js";
import { HtmlMakerListViewGroup, HtmlMakerListViewGroupImgProp } from "./HtmlMaker.js";
import { HtmlMakerFlyoutGrid, HtmlMakerFlyoutGridItem } from "./HtmlMaker.js";
import { HtmlMakerCtlEventTypes } from "./HtmlMaker.js";
import { HtmlMakerConst, HtmlMakerCommonCss } from "./HtmlMaker.js";
import { HtmlMakerToolTipReq, HtmlMakerToolTipReqTypes } from "./HtmlMaker.js";
import { ClipboardHelper } from "./ClipboardHelper.js";
import { CharStatusNameTypes, CharNameSpaceTypes, FixedFormSlotTypes, fixedMap, AutoScoreTypes, autoScoreMap } from "./CharClass.js";
import { CharSpecItem, CharSpecItemJson } from "./CharSpec.js";
import { CharSummaryItem, CharSummaryItemProp } from "./CharSummary.js";
import { ScoreConfigSet } from "./ScoreConfig.js";
import { getConvertToolsInstance } from "./ConvertTools.js";
export class FormationItemDetails {
    TextMap = new Map();
    set(key, text) {
        const exist = this.TextMap.has(key);
        this.TextMap.set(key, text);
        return exist;
    }
    remove(key) {
        const exist = this.TextMap.has(key);
        if (exist) {
            this.TextMap.delete(key);
        }
        return exist;
    }
    get count() {
        return this.TextMap.size;
    }
    clear() {
        this.TextMap.clear();
    }
    forEach(callback) {
        if (callback === undefined)
            return;
        let cancel = false;
        for (const [key, value] of this.TextMap) {
            cancel = callback(key, value);
            if (cancel)
                break;
        }
        return cancel;
    }
    values() {
        const map = new Map();
        for (const [key, text] of this.TextMap) {
            map.set(key, parseInt(text));
        }
        return map;
    }
}
export class FormationItem {
    ch = new CharSpecItem;
    prop = new CharSummaryItemProp;
    isEmpty = true;
    details = new FormationItemDetails();
    set(key, text) {
        const exist = this.details.TextMap.has(key);
        this.details.set(key, text);
        return exist;
    }
    get values() {
        return this.details.values();
    }
    get itemID() {
        const keyPart = this.itemKey;
        const posPart = this.ch.idAttributeForHTML.substring(keyPart.length);
        let pos = parseInt(posPart);
        if (pos <= 0)
            return -1;
        return pos;
    }
    get itemKey() { return "chuid"; }
}
export class FormationSet {
    items;
    nFormationItem = 5;
    uiInfo = new HtmlDialogInfo;
    Init() {
        this.items = new Array;
        for (let i = 0; i < this.nFormationItem; i++) {
            //this.items.push(new FormationItem())
            const fItem = new FormationItem();
            const idHTML = `${fItem.itemKey}${i + 1}`;
            fItem.ch.idAttributeForHTML = idHTML;
            this.items.push(fItem);
        }
    }
    put(item, ch) {
        const found = this.items.find(x => this.isExistCh(x, ch));
        if (found !== undefined) {
            if (found.isEmpty === false)
                return false;
        }
        item.ch.gt = ch.gt;
        item.ch.ns = ch.ns;
        //item.ch.id = ch.id
        item.ch.idAsText = ch.idAsText;
        item.ch.name = ch.name;
        item.isEmpty = false;
        return true;
    }
    empty(item) {
        const org = item.isEmpty;
        item.isEmpty = true;
        return item.isEmpty == org ? false : true;
    }
    isExistCh(item, ch) {
        return item.ch.name === ch.name && item.ch.id === ch.id;
    }
    equalsFormationItem(a, b) {
        return a.ch.name === b.ch.name && a.ch.id === b.ch.id;
    }
}
export class FormationOption {
    autoScoreType = AutoScoreTypes.High;
    static copy(from, to) {
        to.autoScoreType = from.autoScoreType;
    }
}
export class FormationMake {
    formation;
    scsList;
    formationOptList;
    emptyFile = "plus.png"; //「空欄」用PNG
    charDB;
    charSummary;
    imgLoader;
    requestActivate;
    requestToolTip;
    option = undefined;
    autoForm = false; //自動選定
    editFormEnable = false; //編成変更：[キャラ配置][キャラ抹消][←][→]
    saveEnable = false; //保存
    enableScoreEvent = false;
    enableDropEvent = false; //自編成で使う
    parentName = "";
    listName = "";
    htmlMakerChSel;
    htmlMakerProp;
    selectedItem;
    onPut;
    onEmpty;
    onStock;
    onPropChanged;
    gridHeaderName = `${this.dlgCssClassName()}-headerName`;
    gridFooterName = `${this.dlgCssClassName()}-footerName`;
    gridName = `${this.dlgCssClassName()}-gridName`;
    scoreGrid = null;
    editingIndex = -1;
    InitForEnemy(charDB) {
        this.charDB = charDB;
        this.formation = new FormationSet();
        this.formation.Init();
        this.enableScoreEvent = true;
        this.initScoreOptions();
        this.initScsList();
    }
    InitForPlayer(charSummary) {
        this.charSummary = charSummary;
        this.enableDropEvent = true;
        //後で消す：this.autoFormation()
        this.formation = new FormationSet();
        this.formation.Init();
        this.initScsList();
    }
    initScsList() {
        this.scsList = new Array;
        const nForm = this.formation.nFormationItem;
        for (let i = 0; i < nForm; i++) {
            const scSet = new ScoreConfigSet();
            this.scsList.push(scSet);
        }
    }
    initScoreOptions() {
        this.formationOptList = new Array;
        const nForm = this.formation.nFormationItem;
        for (let i = 0; i < nForm; i++) {
            const opt = new FormationOption();
            this.formationOptList.push(opt);
        }
    }
    async Setup(formation, imgLoader) {
        if (!formation)
            return;
        this.formation = formation;
        let id = 0;
        for (const item of this.formation.items) {
            if (item.isEmpty)
                this.formation.empty(item);
            else
                this.formation.put(item, item.ch);
            id++;
            const idHTML = `${item.itemKey}${id}`;
            item.ch.idAttributeForHTML = idHTML;
            const imgFile = item.isEmpty ? this.emptyFile : item.ch.iconFileName;
            //const img = await imgLoader.getImageUrl(imgFile)
            const img = await imgLoader.getImageUrlBy(imgFile, item.ch.ns);
            if (img === null)
                return;
            this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(), item.ch.idAttributeForHTML, img);
        }
    }
    async toHTML(listName) {
        if (!this.formation)
            return "";
        this.listName = listName;
        this.htmlMakerChSel = new HtmlMaker;
        let id = 0;
        for (const fItem of this.formation.items) {
            const ch = fItem.ch;
            id++;
            const idHTML = `${fItem.itemKey}${id}`;
            ch.idAttributeForHTML = idHTML;
            //const url = await imgLoader.getImageUrl(ch.iconFileName);
            const url = ""; //遅延ロード有効化
            const imgFile = fItem.isEmpty ? this.emptyFile : ch.iconFileName;
            const img = new HtmlMakerOptionImg();
            img.imgSrc = url;
            img.imgFile = imgFile; //ch.iconFileName
            const item = new HtmlMakerItem;
            item.props.name = this.itemCssClassName();
            item.props.id = idHTML;
            item.props.className = this.imgCssClassName();
            item.props.option.setImg(img);
            item.props.option.toolTip = ch.name;
            item.props.option.onSelect = (evArgs) => {
                console.log(`notifty id = ${evArgs.item.props.id}`);
                this.setSelectedItem(evArgs.item.props.id);
            };
            this.htmlMakerChSel.add(item);
        }
        return this.htmlMakerChSel.MakeScrollableList(this.listCssClassName());
    }
    toGridHTML() {
        this.htmlMakerProp = new HtmlMaker;
        let id = 0;
        for (const fItem of this.formation.items) {
            const ch = fItem.ch;
            const scSet = this.scsList[id];
            id++;
            for (const sItem of scSet.items) {
                //選択初期値セット
                fItem.details.set(sItem.key, sItem.selectedVal);
            }
            const itemDiv = new HtmlMakerItem;
            itemDiv.props.name = `${this.propItemCssClassName()}-${id}`;
            itemDiv.props.id = `${id}`;
            itemDiv.props.className = `${this.propItemCssClassName()}`;
            itemDiv.props.option.setButton(`スコア`);
            itemDiv.props.option.using.itemId = id;
            itemDiv.props.option.onSelect = this.onScoreGridOpen;
            this.htmlMakerProp.add(itemDiv);
        }
        return this.htmlMakerProp.MakeScrollableList(this.propCssClassName());
    }
    lvgAutoFormView;
    async autoFormation() {
        if (this.lvgAutoFormView !== undefined)
            return;
        /*後で消す
        const uiInfo = this.formation !== undefined ? this.formation.uiInfo : undefined

        this.formation = new FormationSet()
        this.formation.Init()
        
        if (uiInfo === undefined)
            this.initScsList()

        if (uiInfo !== undefined)
            this.formation.uiInfo = uiInfo

        await this.makeLvwGroup(this.imgLoader)
        */
        this.formation.Init();
        await this.makeLvwGroup(this.imgLoader);
    }
    async autoFormationApply(applyRow) {
        //const sortedChSummary = this.charSummary.sortByScore()
        const sortedChSummary = this.playerScore();
        if (sortedChSummary === null || sortedChSummary.length === 0) {
            console.log(`[autoFormationApply] sortedChSummary.length === 0`);
            return false;
        }
        const nChars = this.formation.nFormationItem;
        const lockInfo = this.moveLockedFormation(nChars);
        if (lockInfo === null) {
            console.log(`[autoFormationApply] lockInfo === null`);
            return false;
        }
        const isMoved = lockInfo[0];
        const formIndexes = lockInfo[1];
        const nChSummay = sortedChSummary.length;
        let nForms = Math.floor(nChSummay / nChars);
        if (nChSummay % nChars)
            nForms++;
        let rowIndex = 0;
        let rowMatch = -1;
        let isLockedForm = false;
        for (let i = 0; i < nForms; i++) {
            if (isMoved[i]) {
                rowIndex++;
                if (rowIndex === applyRow) {
                    //枠固定を考慮する編成
                    rowMatch = i;
                    isLockedForm = true;
                    //console.log(`locked row selected`, applyRow, rowIndex)
                    break;
                }
                rowIndex++;
                if (rowIndex === applyRow) {
                    //枠固定を考慮しない編成
                    rowMatch = i;
                    //console.log(`normal row selected`, applyRow, rowIndex)
                    break;
                }
            }
            else {
                rowIndex++;
                if (rowIndex !== applyRow)
                    continue;
                //枠固定を考慮しない編成
                rowMatch = i;
                //console.log(`normal row selected`, applyRow, rowIndex)
                break;
            }
        }
        if (rowMatch === -1)
            return;
        this.initScsList();
        const iStart = rowMatch * nChars;
        if (isLockedForm) {
            console.log(`**lock form selected**`, isLockedForm, rowMatch, formIndexes[rowMatch]);
            for (let i = 0; i < nChars; i++) {
                let pos = formIndexes[rowMatch][i];
                let isEmpty = false;
                switch (pos) {
                    case -1: //位置移動しなかったキャラ
                        pos = iStart + i;
                        console.log(`not moved`, pos);
                        break;
                    case -2: //空欄だったキャラ
                        isEmpty = true;
                        break;
                    default:
                        if (pos >= sortedChSummary.length) {
                            //空欄へ移動したので移動元が空欄になる
                            isEmpty = true;
                            console.log(`to sapce moved`, iStart + i);
                        }
                        else {
                            console.log(`to moved`, pos);
                        }
                        break;
                }
                const item = this.formation.items[i];
                if (isEmpty) {
                    this.formation.empty(item);
                }
                else {
                    this.formation.put(item, sortedChSummary[pos].ch);
                    CharSummaryItemProp.copy(sortedChSummary[pos].prop, item.prop);
                    ScoreConfigSet.copy(sortedChSummary[pos].scoreSet, this.scsList[i], true);
                }
            }
        }
        else {
            console.log(`**normal form selected**`, iStart);
            for (let i = 0; i < nChars; i++) {
                let isEmpty = false;
                if (iStart + i >= sortedChSummary.length)
                    isEmpty = true;
                const pos = iStart + i;
                console.log(`->`, pos);
                const item = this.formation.items[i];
                if (isEmpty) {
                    this.formation.empty(item);
                }
                else {
                    this.formation.put(item, sortedChSummary[pos].ch);
                    CharSummaryItemProp.copy(sortedChSummary[pos].prop, item.prop);
                    ScoreConfigSet.copy(sortedChSummary[pos].scoreSet, this.scsList[i], true);
                }
            }
        }
        let id = 0;
        for (const fItem of this.formation.items) {
            id++;
            //const idHTML = `${fItem.itemKey}${id}`
            //fItem.ch.idAttributeForHTML = idHTML
            if (fItem.isEmpty)
                await this.charEmptyItem(fItem);
            else
                await this.charPutItem(fItem);
            await this.notifyChangeScore(fItem, this.scsList[id - 1]);
            //console.log(`**autoFormationApply(${id})**`, this.scsList[id - 1])
        }
        const fItem = this.formation.items.find(fItem => fItem.ch.ns !== CharNameSpaceTypes.None);
        if (fItem !== undefined) {
            this.selectedItem = this.formation.items[0];
            //console.log(`**initial select**`, this.selectedItem)
        }
    }
    moveLockedFormation(nChars) {
        //nChars：編成内キャラ数
        //編成内キャラ数を３～９を想定
        let nFixIndex = Math.floor(nChars / 3);
        if (nFixIndex < 0 || nFixIndex > 3)
            return null;
        /*
        //テストデータの登録キャラ数
        let nChSummary = 9
        //テストデータを固定指定
        const sortedChSummary = new Array<CharSummaryItem>
        for (let i = 0; i < nChSummary; i++) {
            sortedChSummary.push(new CharSummaryItem())
        }
        //・１編成目
        //  中央→前衛
        sortedChSummary[2].prop.fixedType = FixedFormSlotTypes.Front
        //  後衛→前衛
        sortedChSummary[4].prop.fixedType = FixedFormSlotTypes.Front
        //・２編成目
        //  前衛→中央
        sortedChSummary[5].prop.fixedType = FixedFormSlotTypes.Center
        */
        //const sortedChSummary = this.charSummary.sortByScore()
        const sortedChSummary = this.playerScore();
        if (sortedChSummary === null || sortedChSummary.length === 0) {
            console.log(`[moveLockedFormation] sortedChSummary.length === 0`);
            return null;
        }
        let nChSummary = sortedChSummary.length;
        //結果の編成数
        let nForms = Math.floor(nChSummary / nChars);
        if (nChSummary % nChars)
            nForms++;
        //編成の使用状況：-2=空枠、-1=非固定枠、0>=固定枠
        const formIndexes = new Array;
        const isMoved = new Array;
        for (let i = 0; i < nForms; i++) {
            formIndexes.push(new Array);
            isMoved.push(false);
        }
        let iChSummary = 0;
        for (let i = 0; i < nForms; i++) {
            let colIndex = 0;
            while (colIndex < nChars) {
                if (iChSummary >= nChSummary) {
                    formIndexes[i].push(-2);
                    //空欄に移動していいことにする
                    sortedChSummary.push(new CharSummaryItem());
                }
                else {
                    if (sortedChSummary[iChSummary].prop.fixedType === FixedFormSlotTypes.None)
                        formIndexes[i].push(-1);
                    else
                        formIndexes[i].push(iChSummary);
                }
                colIndex++;
                iChSummary++;
            }
        }
        //console.log(nFixIndex, formIndexes)
        /*編成数毎の移動先パターン
        編成数　　前衛　　中央　　後衛
          ３　　　１　　　２　　　３
          ４　　 1,2　　　３　　　４
          ５　　 1,2　　　３　　 4,5
          ６　　 1,2　　 3,4　　 5,6
          ７　 1,2,3　　 4,5　　 6,7
          ８　 1,2,3　　 4,5　 6,7,8
          ９　 1,2,3　 4,5,6　 7,8,9
        */
        //前衛
        const frontMap = new Map([
            [3, [1, 1]],
            [4, [1, 2]],
            [5, [1, 2]],
            [6, [1, 2]],
            [7, [1, 3]],
            [8, [1, 3]],
            [9, [1, 3]],
        ]);
        //中央
        const centerMap = new Map([
            [3, [2, 2]],
            [4, [3, 3]],
            [5, [3, 3]],
            [6, [3, 4]],
            [7, [4, 5]],
            [8, [4, 5]],
            [9, [4, 6]],
        ]);
        //後衛
        const backendMap = new Map([
            [3, [3, 3]],
            [4, [4, 4]],
            [5, [4, 5]],
            [6, [5, 6]],
            [7, [6, 7]],
            [8, [6, 8]],
            [9, [7, 9]],
        ]);
        const checkRangeMap = new Map([
            [FixedFormSlotTypes.Front, frontMap],
            [FixedFormSlotTypes.Center, centerMap],
            [FixedFormSlotTypes.Backend, backendMap],
        ]);
        function findFromIndex(colIndexes) {
            let fromIndex = -1;
            for (const colIndex of colIndexes) {
                if (colIndex < 0)
                    continue;
                const fixedType = sortedChSummary[colIndex].prop.fixedType;
                if (fixedType !== FixedFormSlotTypes.None) {
                    fromIndex = colIndex;
                    break;
                }
            }
            return fromIndex;
        }
        function findToIndex(colIndexes) {
            let toIndex = -1;
            for (const colIndex of colIndexes) {
                if (colIndex < 0)
                    continue;
                //移動元の枠
                const fixedType = sortedChSummary[colIndex].prop.fixedType;
                const checkRange = checkRangeMap.get(fixedType);
                if (checkRange === undefined)
                    continue;
                //移動先の範囲
                const range = checkRange.get(nChars);
                if (range === undefined)
                    continue;
                let stIndex = range[0] - 1;
                let edIndex = range[1] - 1;
                for (let index = stIndex; index <= edIndex; index++) {
                    if (colIndexes[index] === -1) {
                        //移動先が移動可能
                        toIndex = index;
                        break;
                    }
                    if (colIndexes[index] === -2) {
                        //移動先が空欄の場合移動OK
                        console.log(`[findToIndex] move to space-form(${index})`);
                        toIndex = index;
                        break;
                    }
                }
                if (toIndex !== -1)
                    break;
            }
            return toIndex;
        }
        let formIndex = 0;
        let colOffs = 0;
        let nMoved = 0;
        for (const colIndexes of formIndexes) {
            while (true) {
                //固定枠を指定したキャラの存在確認
                const fromIndex = findFromIndex(colIndexes);
                if (fromIndex === -1)
                    break;
                //編成毎に固定したい枠への移動可否をチェック
                const toIndex = findToIndex(colIndexes);
                if (toIndex !== -1) {
                    console.log(`move from ${fromIndex} -> ${colOffs + toIndex}`);
                    //移動元を移動完了にする（チェックから除外する）
                    const workIndex = colIndexes[fromIndex % nChars];
                    sortedChSummary[workIndex].prop.fixedType = FixedFormSlotTypes.None;
                    //移動元と移動先を入れ替える
                    colIndexes[fromIndex % nChars] = colOffs + toIndex; //colIndexes[toIndex]
                    colIndexes[toIndex] = workIndex;
                    nMoved++;
                    isMoved[formIndex] = true;
                }
            }
            formIndex++;
            colOffs += nChars;
        }
        //入れ替えなかった箇所に元の順序を入れる
        /*
        colOffs = 0
        for (const colIndexes of formIndexes) {
            for (const colIndex of colIndexes) {
                if (colIndex === -1) {
                    colIndexes[colOffs % nChars] = colOffs
                }
                colOffs++
            }
        }
        */
        //console.log(`result(nMoved=${nMoved})`, isMoved, formIndexes)
        return [isMoved, formIndexes];
    }
    async makeLvwGroup(imgLoader) {
        if (imgLoader === undefined) {
            console.log(`[makeLvwGroup] not initialized imgLoader`);
            return false;
        }
        //スコア高順ソート結果
        //const sortedChSummary = this.charSummary.sortByScore()
        const sortedChSummary = this.playerScore();
        if (sortedChSummary === null || sortedChSummary.length === 0) {
            console.log(`[makeLvwGroup] sortedChSummary.length === 0`);
            return false;
        }
        //キャラ固定枠情報
        const nChars = this.formation.nFormationItem;
        const lockInfo = this.moveLockedFormation(nChars);
        if (lockInfo === null) {
            console.log(`[makeLvwGroup] lockInfo === null`);
            return false;
        }
        const isMoved = lockInfo[0];
        const formIndexes = lockInfo[1];
        console.log(`lockInfo`, isMoved, formIndexes);
        const nChSummay = sortedChSummary.length;
        let nForms = Math.floor(nChSummay / nChars);
        if (nChSummay % nChars)
            nForms++;
        const rowIndexes = new Array;
        for (let i = 0; i < nForms; i++)
            rowIndexes.push(i + 1);
        const className = `player`;
        const lvg = new HtmlMakerListViewGroup();
        let iChSummay = 0;
        let rowUniqid = 0;
        for (const rowIndex of rowIndexes) {
            //枠固定を考慮する編成？
            if (isMoved[rowIndex - 1]) {
                rowUniqid++;
                const lockedRowIndex = rowIndex - 1;
                const lockedColIndexes = formIndexes[lockedRowIndex];
                const header = lvg.makeCheckHeader(`${className}Header`, `Locked Form${rowIndex}`, `${rowUniqid}`);
                const imgUrls = new Array;
                let colIndex = 0;
                for (const lockedColIndex of lockedColIndexes) {
                    const prop = new HtmlMakerListViewGroupImgProp();
                    const isEmpty = lockedColIndex === -2 || lockedColIndex >= nChSummay;
                    if (isEmpty) {
                        const imgFile = this.emptyFile;
                        const img = await imgLoader.getImageUrlBy(imgFile, ``);
                        if (img === null)
                            continue;
                        prop.url = img;
                        prop.toolTip = ``;
                    }
                    else {
                        let chIndex = lockedColIndex === -1 ? (rowIndex - 1) * nChars + colIndex : lockedColIndex;
                        const chsItem = sortedChSummary[chIndex];
                        const ch = chsItem.ch;
                        const imgFile = ch.iconFileName;
                        const img = await imgLoader.getImageUrlBy(imgFile, ch.ns);
                        if (img === null)
                            continue;
                        prop.url = img;
                        prop.toolTip = chsItem.prop.comment + HtmlMakerConst.toolTipNewLine + fixedMap.get(chsItem.prop.fixedType);
                    }
                    imgUrls.push(prop);
                    colIndex++;
                }
                const subTbl = lvg.makeImgSubTbl(`${className}SubTbl`, imgUrls, `${rowUniqid}`);
                lvg.addGroupPair(header, subTbl);
            }
            //ここから、枠固定を考慮しない編成
            rowUniqid++;
            const header = lvg.makeCheckHeader(`${className}Header`, `Form${rowIndex}`, `${rowUniqid}`);
            const imgUrls = new Array;
            let colIndex = 0;
            while (colIndex < nChars) {
                const prop = new HtmlMakerListViewGroupImgProp();
                if (iChSummay >= nChSummay) {
                    const imgFile = this.emptyFile;
                    const img = await imgLoader.getImageUrlBy(imgFile, ``);
                    if (img === null)
                        continue;
                    prop.url = img;
                    prop.toolTip = ``;
                }
                else {
                    const chsItem = sortedChSummary[iChSummay];
                    const ch = chsItem.ch;
                    const imgFile = ch.iconFileName;
                    const img = await imgLoader.getImageUrlBy(imgFile, ch.ns);
                    if (img === null)
                        continue;
                    prop.url = img;
                    prop.toolTip = chsItem.prop.comment;
                }
                imgUrls.push(prop);
                colIndex++;
                iChSummay++;
            }
            const subTbl = lvg.makeImgSubTbl(`${className}SubTbl`, imgUrls, `${rowUniqid}`);
            lvg.addGroupPair(header, subTbl);
        }
        lvg.makeFooter();
        lvg.setListener(className, this.listCssClassName(), this.listCssClassName());
        lvg.setFontConfig(`0.9`);
        //lvg.show(`0`, `0`)
        const parentElem = document.getElementById(this.dlgContentCssClassName());
        const btnElem = parentElem.getElementsByClassName(this.htmlMakerChSel.defaultToolButtonsCssName);
        const rcParent = this.htmlMakerChSel.GetRect(btnElem[0]);
        lvg.show(`0`, `${parseInt(rcParent.height) + 10}`);
        lvg.setSize(`350`);
        lvg.applyCss();
        lvg.setCheckByRow(HtmlMakerListViewGroup.allRowAction);
        lvg.setCheck();
        lvg.selectFirstCell(HtmlMakerListViewGroup.allRowAction);
        lvg.enableEvents(this.onNotifyLvg);
        this.lvgAutoFormView = lvg;
        return true;
    }
    onNotifyLvg = async (evArgs) => {
        //console.log(evArgs)
        if (evArgs.classify === HtmlMakerCtlEventTypes.Ok) {
            const notify = evArgs.notify;
            const checked = notify.checkedRow();
            //console.log(checked)
            if (checked !== -1) {
                notify.dispose();
                this.lvgAutoFormView = undefined;
                await this.autoFormationApply(checked);
            }
        }
        if (evArgs.classify === HtmlMakerCtlEventTypes.Cancel) {
            const notify = evArgs.notify;
            notify.dispose();
            this.lvgAutoFormView = undefined;
        }
    };
    createFormationBox(title, parentName, formationHTML, propGridHTML) {
        this.parentName = parentName;
        let viewBtn = `
<button id="${this.dlgCssClassName()}-tbView">詳細</button>
`.trim();
        let moveBtn = `
<button id="${this.dlgCssClassName()}-tbLeft">←</button>
<button id="${this.dlgCssClassName()}-tbRight">→</button>
`.trim();
        let autoBtn = ``;
        if (this.autoForm) {
            autoBtn = `
<button id="${this.dlgCssClassName()}-auto">自動選定</button>
${viewBtn}
${moveBtn}
`.trim();
        }
        let editBtn = ``;
        if (this.editFormEnable) {
            editBtn = `
${viewBtn}
<button id="${this.dlgCssClassName()}-tbput">配置</button>
<button id="${this.dlgCssClassName()}-tbempty">抹消</button>
${moveBtn}
`.trim();
        }
        let saveBtn = ``;
        if (this.saveEnable) {
            saveBtn = `<button id="${this.dlgCssClassName()}-stock">編成保存</button>`;
        }
        let btns = `
${autoBtn}
${editBtn}
${saveBtn}
`.trim();
        const toolbarsHTML = this.htmlMakerChSel.MakeDefaultToolButtonsHTML(btns);
        /*
        const buttonsHTML = this.htmlMakerChSel.MakeDefaultButtonsHTML(`
<button id="${this.dlgCssClassName()}-close">閉じる</button>
`)
        */
        const buttonsHTML = ``;
        let dlgHTML = ``;
        if (propGridHTML !== ``) {
            dlgHTML =
                `<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${toolbarsHTML}
    ${formationHTML}
    ${propGridHTML}
    ${buttonsHTML}
</div>`;
        }
        else {
            dlgHTML =
                `<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${toolbarsHTML}
    ${formationHTML}
    ${buttonsHTML}
</div>`;
        }
        const dialogDesc = new HtmlMakerDialogDesc();
        dialogDesc.title = "<" + title + ">";
        dialogDesc.SetB2Type(HtmlMakerDialogB2Types.CopyPaste, this.onCopyPaste);
        dialogDesc.SetB4Type(HtmlMakerDialogB4Types.DialogHide);
        if (this.autoForm === true) {
            dialogDesc.SetOType(HtmlMakerDialogOTypes.Option, this.onVisibleToggle);
        }
        const dlg = dialogDesc.NewDialog(parentName, this.dlgCssClassName());
        dialogDesc.SetContent(parentName, dlgHTML);
        this.applyCss();
        dialogDesc.EnableEventHandlers();
        dialogDesc.onMoveDone = this.moverOnMoveDone;
        return dlg;
    }
    addEventHandlers(dlg) {
        //自動選定
        const tbauto = document.getElementById(`${this.dlgCssClassName()}-auto`);
        if (tbauto !== null) {
            tbauto.onclick = async () => { await this.onAutoPut(); };
        }
        //キャラ詳細
        const tbView = document.getElementById(`${this.dlgCssClassName()}-tbView`);
        if (tbView !== null) {
            tbView.onclick = async () => { await this.onCharView(); };
        }
        //キャラ設定
        const tbput = document.getElementById(`${this.dlgCssClassName()}-tbput`);
        if (tbput !== null) {
            tbput.onclick = async () => { await this.onCharPut(); };
        }
        //キャラ抹消
        const tbempty = document.getElementById(`${this.dlgCssClassName()}-tbempty`);
        if (tbempty !== null) {
            tbempty.onclick = async () => { await this.onCharEmpty(); };
        }
        //←
        const tbLeft = document.getElementById(`${this.dlgCssClassName()}-tbLeft`);
        if (tbLeft !== null) {
            tbLeft.onclick = async () => { await this.onCharLeft(); };
        }
        //→
        const tbRight = document.getElementById(`${this.dlgCssClassName()}-tbRight`);
        if (tbRight !== null) {
            tbRight.onclick = async () => { await this.onCharRight(); };
        }
        //キャラ保存
        const saveElem = document.getElementById(`${this.dlgCssClassName()}-stock`);
        if (saveElem !== null) {
            saveElem.onclick = async () => {
                if (this.onStock !== undefined) {
                    //空欄か
                    if (this.selectedItem.ch.ns === CharNameSpaceTypes.None)
                        return;
                    const fileURL = this.htmlMakerChSel.FindImgByID(this.itemCssClassName(), this.selectedItem.ch.idAttributeForHTML);
                    const notify = new FormationListSelectResult();
                    notify.item = this.selectedItem;
                    notify.selectedImg = fileURL === null ? `` : fileURL.src;
                    const id = this.findPropSelectedPos();
                    if (id !== -1) {
                        notify.scoreSet = this.scsList[id];
                    }
                    await this.onStock(notify);
                }
            };
        }
    }
    addItemEventkHandlers(onPut, onEmpty, onStock, onPropChanged) {
        //クリック通知を受け取るコールバックを保持
        this.onStock = onStock;
        this.onPut = onPut;
        this.onEmpty = onEmpty;
        this.onPropChanged = onPropChanged;
        //クリック有効化
        const idText = this.htmlMakerChSel.GetIdByIndex(0);
        this.htmlMakerChSel.SelectByID(this.itemCssClassName(), idText);
        this.htmlMakerChSel.enableEvents(this.itemCssClassName());
        if (this.enableScoreEvent === true) {
            //敵編成の場合は必要
            let id = 0;
            for (const fItem of this.formation.items) {
                id++;
                const propName = `${this.propItemCssClassName()}-${id}`;
                this.htmlMakerProp.EnableId(propName, false);
            }
            this.htmlMakerProp.enableEvents(this.propCssClassName());
        }
        if (this.enableDropEvent === true) {
            let id = 0;
            for (const fItem of this.formation.items) {
                const idText = this.htmlMakerChSel.GetIdByIndex(id);
                const elem = this.htmlMakerChSel.FindDivByID(this.itemCssClassName(), idText);
                console.log(elem);
                if (elem !== null) {
                    elem.addEventListener('dragover', this.onDragOver);
                    elem.addEventListener('drop', this.onDrop);
                }
                id++;
            }
        }
        this.setSelectedItem(idText);
    }
    onDragOver = async (event) => {
        // ブラウザのデフォルト拒否挙動をキャンセルして「ドロップ可能」にする
        event.preventDefault();
        if (event.dataTransfer) {
            // ドラッグ側の effectAllowed ('move'等) に合わせてカーソル表示を変更
            event.dataTransfer.dropEffect = 'link';
        }
    };
    onDrop = async (event) => {
        // ブラウザ標準のページ遷移等の挙動をキャンセル
        event.preventDefault();
        if (event.dataTransfer === null)
            return;
        // setData で入れたデータ（chUuid など）を取り出す
        const chDropText = event.dataTransfer.getData('text/plain');
        //console.log(`🎯 キャラID [${chDropText}] を自編成スロットに受け取りました！`);
        const chSummaryItem = this.charSummary.findItemByDropText(chDropText);
        console.log(chSummaryItem);
        if (chSummaryItem === undefined)
            return;
        // ここで自編成スロットへのキャラセット処理を呼ぶ
        const target = event.target;
        if (target.parentElement === null)
            return;
        //配置先
        const idText = target.parentElement.getAttribute("item-id");
        console.log(target.parentElement, idText);
        let id = 0;
        for (const fItem of this.formation.items) {
            id++;
            if (fItem.ch.idAttributeForHTML !== idText)
                continue;
            if (fItem.isEmpty) {
                this.formation.put(fItem, chSummaryItem.ch);
                const notify = await this.notiftyOnPut(fItem, chSummaryItem.ch.iconFileName);
                this.replaceCharImg(fItem.ch.idAttributeForHTML, notify.selectedImg, fItem.ch.name);
                const scSet = new ScoreConfigSet();
                ScoreConfigSet.copy(chSummaryItem.scoreSet, scSet, true);
                this.scsList[id - 1] = scSet;
                await this.notifyChangeScore(fItem, this.scsList[id - 1]);
            }
            break;
        }
    };
    moverOnMoveDone = async (dlg) => {
        console.log(`[${dlg.className}] moved`);
        const zindexHelper = new HtmlZindexHelper();
        zindexHelper.SaveSetting(dlg);
        if (this.requestActivate !== undefined) {
            await this.requestActivate(dlg);
        }
    };
    onVisibleToggle = async (dlg, oType) => {
        //console.log(`**onVisibleToggle**`)
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
        if (this.lvgAutoFormView !== undefined) {
            this.lvgAutoFormView.dispose();
            this.lvgAutoFormView = undefined;
            await this.autoFormation();
        }
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
        if (this.lvgAutoFormView !== undefined) {
            this.lvgAutoFormView.dispose();
            this.lvgAutoFormView = undefined;
            await this.autoFormation();
        }
    };
    playerScore() {
        let sortedChSummary = this.charSummary.sortByScore();
        if (sortedChSummary === null || sortedChSummary.length === 0) {
            console.log(`[playerScore] sortedChSummary.length === 0`);
            return null;
        }
        /*これはAND
        for (const filter of this.nsFilter) {
            if (filter === CharNameSpaceTypes.None) continue
            sortedChSummary = sortedChSummary.filter(csItem => csItem.ch.ns === filter)
            if (sortedChSummary.length === 0) break
        }
        return sortedChSummary
        */
        const res = new Array;
        for (const csItem of sortedChSummary) {
            let isEnableGmFilter = false;
            if (this.gmFilter.length === 0)
                isEnableGmFilter = true;
            else {
                const kws = this.idComboKwMap.get(`${csItem.ch.id}`);
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
            console.log(`**playerScore**`, csItem.ch, isEnableGmFilter);
            for (const filter of this.nsFilter) {
                const isEnableNsFilter = filter === CharNameSpaceTypes.None || csItem.ch.ns === filter;
                if (isEnableNsFilter && isEnableGmFilter) {
                    res.push(csItem);
                    break;
                }
            }
        }
        return res;
    }
    async onAutoPut() {
        await this.autoFormation();
    }
    async notifyChangeForm() {
        for (const fItem of this.formation.items) {
            await this.notifyChangeFormItem(fItem);
        }
    }
    async notifyChangeFormItem(fItem) {
        if (fItem.isEmpty) {
            await this.notiftyOnEmpty(fItem);
        }
        else {
            await this.notiftyOnPut(fItem, fItem.ch.iconFileName);
        }
    }
    async notiftyOnPut(fItem, putFile) {
        const notify = new FormationListSelectResult();
        notify.uiName = this.formation.uiInfo.name;
        notify.item = fItem;
        notify.selectedImg = putFile; //""の場合、キャラ選択から取得、""でない場合、このファイルを通知
        await this.onPut(notify);
        return notify;
    }
    async notiftyOnEmpty(fItem) {
        const notify = new FormationListSelectResult();
        notify.uiName = this.formation.uiInfo.name;
        notify.item = fItem;
        notify.selectedImg = this.emptyFile;
        await this.onEmpty(notify);
        return notify;
    }
    async notifyChangeScore(fItem, scoreSet) {
        const notifyArg = new FormationListPropChangedResult();
        notifyArg.uiName = this.parentName;
        notifyArg.item = fItem;
        notifyArg.values = fItem.values;
        notifyArg.scoreConfigSet = scoreSet;
        await this.onPropChanged(notifyArg);
    }
    async onCharView() {
        await this.requestToToolTipMgr(HtmlMakerToolTipReqTypes.AddMemo);
    }
    async requestToToolTipMgr(reqType) {
        if (this.requestToolTip !== undefined) {
            const index = this.selectedItem.itemID - 1;
            const scItems = await this.loadScoreConfig(this.selectedItem, index);
            if (scItems !== null) {
                const name = this.selectedItem.prop.comment !== `` ? this.selectedItem.prop.comment : this.selectedItem.ch.name;
                const req = new HtmlMakerToolTipReq();
                req.reqType = reqType;
                req.parentClassName = this.dlgCssClassName();
                req.uiName = this.formation.uiInfo.name;
                req.itemName = this.selectedItem.ch.uniqueName;
                req.title = name;
                req.memo = name + this.scsList[this.selectedItem.itemID - 1].getScoreText(HtmlMakerConst.toolTipNewLine);
                await this.requestToolTip(req);
            }
        }
    }
    async onCharPut() {
        if (this.onPut === undefined)
            return;
        this.selectedItem.isEmpty = false;
        const notify = await this.notiftyOnPut(this.selectedItem, ``);
        this.formation.put(this.selectedItem, notify.selectCh);
        this.replaceCharImg(this.selectedItem.ch.idAttributeForHTML, notify.selectedImg, this.selectedItem.ch.name);
        this.propSelectedEnabled(true);
        const id = this.findPropSelectedPos();
        if (id !== -1) {
            const index = this.selectedItem.itemID - 1;
            const scItems = await this.loadScoreConfig(this.selectedItem, index);
            if (scItems !== null)
                await this.notifyChangeScore(this.selectedItem, scItems);
        }
    }
    async onCharEmpty() {
        if (this.onEmpty !== undefined) {
            this.selectedItem.isEmpty = true;
            const notify = await this.notiftyOnEmpty(this.selectedItem);
            this.formation.empty(this.selectedItem);
            this.replaceCharImg(this.selectedItem.ch.idAttributeForHTML, notify.selectedImg, ``);
            this.propSelectedEnabled(false);
            const id = this.findPropSelectedPos();
            if (id !== -1) {
                this.scsList[id] = new ScoreConfigSet;
            }
            await this.requestToToolTipMgr(HtmlMakerToolTipReqTypes.Remove);
        }
    }
    async onCharLeft() {
        if (!this.canSwap(1))
            return;
        await this.formSwap(-1);
    }
    async onCharRight() {
        if (!this.canSwap(this.formation.nFormationItem))
            return;
        await this.formSwap(1);
    }
    canSwap(limitPos) {
        //if (this.onSwap === undefined) return false
        if (this.selectedItem === undefined)
            return false;
        if (this.selectedItem.isEmpty === true)
            return false;
        if (this.selectedItem.itemID === limitPos)
            return false;
        return true;
    }
    async formSwap(offset) {
        const baseItem = this.selectedItem;
        const basePos = baseItem.itemID - 1;
        const sidePos = basePos + offset;
        const sideItem = this.formation.items[sidePos];
        const baseIdHTML = baseItem.ch.idAttributeForHTML;
        const sideIdHTML = sideItem.ch.idAttributeForHTML;
        const baseScSet = this.scsList[basePos];
        const sideScSet = this.scsList[sidePos];
        const itemCss = this.itemCssClassName();
        const baseImg = this.htmlMakerChSel.FindImgByID(itemCss, baseIdHTML);
        const sideImg = this.htmlMakerChSel.FindImgByID(itemCss, sideIdHTML);
        if (baseImg !== null && sideImg !== null) {
            this.htmlMakerChSel.SwapImgSrcAndPairToolTip(baseImg, sideImg);
            const idText = `${sideItem.itemKey}${sideItem.itemID}`;
            this.htmlMakerChSel.UnselectAll(itemCss);
            this.htmlMakerChSel.SelectByID(itemCss, idText);
            this.formation.items[basePos] = sideItem;
            this.formation.items[sidePos] = baseItem;
            this.formation.items[basePos].ch.idAttributeForHTML = baseIdHTML;
            this.formation.items[sidePos].ch.idAttributeForHTML = sideIdHTML;
            this.scsList[basePos] = sideScSet;
            this.scsList[sidePos] = baseScSet;
            this.setSelectedItem(idText);
            const baseItemNew = this.formation.items[sidePos];
            const sideItemNew = this.formation.items[basePos];
            if (this.enableScoreEvent) {
                this.propAutoEnabled(baseItemNew);
                this.propAutoEnabled(sideItemNew);
            }
            await this.notifyChangeFormItem(baseItemNew);
            await this.notifyChangeFormItem(sideItemNew);
            //変更通知：スコア計算
            await this.notifyChangeScore(baseItemNew, this.scsList[basePos]);
            await this.notifyChangeScore(sideItemNew, this.scsList[sidePos]);
        }
    }
    async charPutItem(fItem) {
        const notify = await this.notiftyOnPut(fItem, fItem.ch.iconFileName);
        this.replaceCharImg(fItem.ch.idAttributeForHTML, notify.selectedImg, fItem.prop.comment);
    }
    async charEmptyItem(fItem) {
        const notify = await this.notiftyOnEmpty(fItem);
        this.replaceCharImg(fItem.ch.idAttributeForHTML, notify.selectedImg, ``);
    }
    replaceCharImg(idAttributeForHTML, imgName, toolTip) {
        this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(), idAttributeForHTML, imgName);
        this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(), idAttributeForHTML, toolTip);
    }
    onScoreGridOpen = async (evArgs) => {
        console.log(`notifty id     = ${evArgs.item.props.id}`);
        console.log(` targetId      = ${evArgs.targetId}`);
        console.log(` classify      = ${evArgs.classify}`);
        console.log(` selectedValue = ${evArgs.selectedValue}`);
        const id = evArgs.item.props.id;
        const index = parseInt(id) - 1;
        if (0 <= index && index < this.formation.items.length) {
            const propName = `${this.propItemCssClassName()}-${id}`;
            const enabled = this.htmlMakerProp.IsEnabledId(propName);
            if (enabled !== true)
                return;
            if (this.enableScoreEvent) {
                const fItem = this.formation.items[index];
                if (fItem.ch.idAsText === ``) { //if (fItem.ch.id === 0) {
                    console.log(`*bug?*`);
                    return;
                }
                /*
                if (this.scsList[index].items.length === 0) {
                    const chId = `${fItem.ch.id}`
                    const scItems = await this.charDB.getStatus(chId)
                    if (scItems !== null && scItems.items !== undefined) {
                        ScoreConfigSet.renameTitles(scItems)
                        this.scsList[index] = scItems
                        this.makeFlyoutGrid(scItems, index)
                    }
                }
                else {
                    const scItems = this.scsList[index]
                    ScoreConfigSet.renameTitles(scItems)
                    this.makeFlyoutGrid(scItems, index)
                }
                */
                const scItems = await this.loadScoreConfig(fItem, index);
                if (scItems !== null) {
                    this.makeFlyoutGrid(scItems, index);
                }
            }
        }
        else {
            console.log(`invalid index = ${index}`);
        }
    };
    async loadScoreConfig(fItem, index) {
        if (this.scsList[index].items.length === 0) {
            const chId = `${fItem.ch.id}`;
            const scItems = await this.charDB.getStatus(chId);
            if (scItems !== null && scItems.items !== undefined) {
                ScoreConfigSet.renameTitles(scItems);
                this.scsList[index] = scItems;
                return scItems;
            }
        }
        else {
            const scItems = this.scsList[index];
            ScoreConfigSet.renameTitles(scItems);
            return scItems;
        }
        return null;
    }
    propSelectedEnabled(enabled) {
        const id = this.findPropSelectedPos();
        if (id !== -1) {
            const propName = `${this.propItemCssClassName()}-${id + 1}`;
            this.htmlMakerProp.EnableId(propName, enabled);
        }
    }
    propAutoEnabled(fItem) {
        const enabled = fItem.isEmpty ? false : true;
        const propName = `${this.propItemCssClassName()}-${fItem.itemID}`;
        this.htmlMakerProp.EnableId(propName, enabled);
    }
    savedOpt = new FormationOption();
    savedScoreSet = new ScoreConfigSet();
    setOptionItem(opt, items) {
        const label = `ステータス選定`;
        const toolTip = `敵編成のステータス計算方法を選択`;
        let selectionPair = new Array;
        let selectedVal = ``;
        for (const [key, asItem] of autoScoreMap) {
            const seletion = `${asItem.displayText}/${key}`;
            selectionPair.push(seletion);
            if (opt.autoScoreType === key)
                selectedVal = key;
        }
        const combo = new HtmlMakerOptionCombo();
        combo.selectionPair = selectionPair;
        combo.selectedItem = selectedVal;
        combo.classify = CharStatusNameTypes.cmAutoScore;
        const valueCell = new HtmlMakerTableCell();
        valueCell.makeItems();
        valueCell.items[0].typeInfo.setCombo(combo);
        valueCell.items[0].className = ``;
        const gridItem = new HtmlMakerFlyoutGridItem();
        gridItem.key = CharStatusNameTypes.cmAutoScore;
        gridItem.text = label;
        gridItem.value = valueCell;
        items.push(gridItem);
    }
    makeFlyoutGrid(scoreSet, pos) {
        if (this.scoreGrid !== null)
            return;
        this.editingIndex = pos;
        this.savedOpt = new FormationOption();
        FormationOption.copy(this.formationOptList[pos], this.savedOpt);
        this.savedScoreSet = new ScoreConfigSet();
        ScoreConfigSet.copy(scoreSet, this.savedScoreSet, true);
        const conv = getConvertToolsInstance();
        const items = new Array;
        this.setOptionItem(this.formationOptList[pos], items);
        for (const scItem of scoreSet.items) {
            const combo = new HtmlMakerOptionCombo();
            combo.selectionPair = scItem.selectionPair;
            combo.selectedItem = scItem.selectedVal;
            combo.classify = scItem.key;
            const valueCell = new HtmlMakerTableCell();
            valueCell.makeItems();
            valueCell.items[0].typeInfo.setCombo(combo);
            valueCell.items[0].className = ``;
            const gridItem = new HtmlMakerFlyoutGridItem();
            gridItem.key = scItem.key;
            gridItem.text = conv.convTitle(scItem.title);
            gridItem.value = valueCell;
            items.push(gridItem);
        }
        const id = pos + 1;
        const grid = new HtmlMakerFlyoutGrid();
        grid.setGridtems(items);
        grid.setListener(`${this.gridName}-${id}`, `${this.propItemCssClassName()}-${id}`, this.dlgContentCssClassName(), `${this.gridHeaderName}-${id}`, `${this.gridFooterName}-${id}`);
        grid.setVisible(true);
        grid.setFontConfig(`0.8`);
        grid.setSize(`190`, `200`);
        grid.applyCss();
        grid.enableEvents(this.onScoreValueSelect);
        this.scoreGrid = grid;
        if (this.scoreGrid.footerElem !== null) {
            let btns = `
<button id="${this.gridFooterName}-okBtn">OK</button>
<button id="${this.gridFooterName}-canBtn">CANCEL</button>
`.trim();
            this.scoreGrid.footerElem.innerHTML = btns;
            //キャラ変更：OK
            document.getElementById(`${this.gridFooterName}-okBtn`).onclick = this.onOkClickScoreGrid;
            //キャラ変更：CANCEL
            document.getElementById(`${this.gridFooterName}-canBtn`).onclick = this.onCancelClickScoreGrid;
        }
        const parentElem = document.getElementById(this.dlgContentCssClassName());
        const rcParent = this.htmlMakerChSel.GetRect(parentElem);
        const propElem = this.htmlMakerChSel.FindDivByClassName(this.parentName, this.propCssClassName());
        const rcProp = this.htmlMakerChSel.GetRect(propElem);
        const listElem = this.htmlMakerChSel.FindDivByClassName(this.parentName, this.listCssClassName());
        const rcList = this.htmlMakerChSel.GetRect(listElem);
        /*
        grid.show(`0`, `0`)
        */
        grid.show(`${parseInt(rcList.left) - parseInt(rcParent.left) + pos * 100 + 5}`, `${parseInt(rcList.top) - parseInt(rcParent.top) + parseInt(rcList.height) + 5}`);
    }
    disposeScorGrid() {
        if (this.scoreGrid !== null) {
            this.scoreGrid.dispose();
            this.scoreGrid = null;
        }
        this.editingIndex = -1;
    }
    onScoreValueSelect = async (evArgs) => {
        console.log(`[onScoreValueSelect] callerName=${evArgs.callerName}, result=${evArgs.result}`);
        switch (evArgs.callerName) {
            case CharStatusNameTypes.cmAutoScore:
                const fOpt = this.formationOptList[this.editingIndex];
                fOpt.autoScoreType = evArgs.result;
                return;
        }
        const scoreSet = this.scsList[this.editingIndex];
        const match = scoreSet.items.find(item => item.key === evArgs.callerName);
        if (match !== undefined) {
            match.selectedVal = evArgs.result;
        }
    };
    onOkClickScoreGrid = async (event) => {
        //選択結果セット
        const fItem = this.formation.items[this.editingIndex];
        const scoreSet = this.scsList[this.editingIndex];
        this.disposeScorGrid();
        //変更通知：スコア計算
        await this.notifyChangeScore(fItem, scoreSet);
    };
    onCancelClickScoreGrid = async (event) => {
        const fOpt = this.formationOptList[this.editingIndex];
        FormationOption.copy(this.savedOpt, fOpt);
        const scoreSet = this.scsList[this.editingIndex];
        ScoreConfigSet.copy(this.savedScoreSet, scoreSet);
        this.disposeScorGrid();
    };
    onCopyPaste = async (dlg, cpType) => {
        console.log(`[${dlg.className}] selected [${cpType}]`);
        const marker = `formation:`;
        switch (cpType) {
            case HtmlMakerCopyPasteTypes.Copy:
                const toText = FormationSetJson.toJsonText(this.formation, this.scsList, this.formationOptList);
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
                const prevSelected = this.selectedItem.itemID;
                this.formation.Init();
                let index = -1;
                for (const item of resInst.items) {
                    index++;
                    this.formation.items[index] = FormationItemJson.fromJsonInst(item);
                    const fItem = this.formation.items[index];
                    fItem.ch.idAttributeForHTML = `${fItem.itemKey}${index + 1}`;
                }
                if (this.enableScoreEvent === true) {
                    //敵編成
                    if (resInst.formationOptList.length >= 1) {
                        //敵編成→敵編成
                        this.formationOptList = new Array;
                        for (const item of resInst.formationOptList) {
                            const toItem = new FormationOption();
                            FormationOption.copy(item, toItem);
                            this.formationOptList.push(toItem);
                        }
                    }
                    else {
                        //自編成→敵編成
                        for (const item of this.formationOptList) {
                            item.autoScoreType = AutoScoreTypes.None;
                        }
                    }
                }
                else {
                    //自編成：コピー元の情報を破棄する
                    this.formationOptList = new Array;
                }
                this.scsList = new Array;
                for (const item of resInst.scsList) {
                    const toItem = new ScoreConfigSet();
                    ScoreConfigSet.copy(item, toItem, true);
                    this.scsList.push(toItem);
                }
                index = -1;
                for (const item of this.formation.items) {
                    index++;
                    let enabled = false;
                    if (item.isEmpty)
                        await this.charEmptyItem(item);
                    else {
                        await this.charPutItem(item);
                        enabled = true;
                    }
                    if (this.enableScoreEvent === false) {
                        //自編成の場合はスコア設定UIがない
                    }
                    else {
                        const propName = `${this.propItemCssClassName()}-${index + 1}`;
                        this.htmlMakerProp.EnableId(propName, enabled);
                    }
                    //変更通知：スコア計算
                    const scoreSet = this.scsList[index];
                    await this.notifyChangeScore(item, scoreSet);
                }
                this.selectedItem = this.formation.items[prevSelected - 1];
                break;
            default:
                break;
        }
    };
    findPropSelectedPos() {
        const div = this.htmlMakerChSel.FindDivByClassName(this.dlgContentCssClassName(), this.propCssClassName());
        if (div !== null && div.className.startsWith(this.propCssClassName())) {
            let id = -1;
            for (const fItem of this.formation.items) {
                id++;
                if (fItem === this.selectedItem) {
                    console.log(`pos=${id}`);
                    return id;
                }
            }
        }
        return -1;
    }
    setSelectedItem(idText) {
        const match = this.formation.items.find(item => idText === item.ch.idAttributeForHTML);
        if (match) {
            this.selectedItem = match;
        }
    }
    enableLazyImages(imageLoader) {
        this.htmlMakerChSel.initObserver(this.dlgCssClassName(), imageLoader);
    }
    itemCssClassName() {
        return `${this.listName}-item`;
    }
    imgCssClassName() {
        return `${this.listName}-img`;
    }
    propCssClassName() {
        return `${this.listName}-prop`;
    }
    propItemCssClassName() {
        return `${this.listName}-prop-item`;
    }
    lblCssClassName() {
        return `${this.listName}-lbl`;
    }
    listCssClassName() {
        return `${this.listName}-list`;
    }
    dlgContentCssClassName() {
        return `${this.parentName}-dlg-content`;
    }
    dlgCssClassName() {
        return `${this.parentName}-dlg`;
    }
    applyCss() {
        const listName = this.listCssClassName();
        const itemName = this.itemCssClassName();
        const imgName = this.imgCssClassName();
        const propName = this.propCssClassName();
        const propItemName = this.propItemCssClassName();
        const lblName = this.lblCssClassName();
        const leftPos = parseInt(this.formation.uiInfo.left);
        const topPos = parseInt(this.formation.uiInfo.top);
        const launchSize = 100;
        const style = document.createElement("style");
        style.textContent =
            `
${this.htmlMakerChSel.MakeDefaultDialogParentCss(this.parentName, leftPos, topPos)}
${this.htmlMakerChSel.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgContentCssClassName()} {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

${this.htmlMakerChSel.MakeDefaultNonScrollCss(this.parentName, 500)}
${this.htmlMakerChSel.MakeDefaultGridColCss(listName, launchSize, 5, launchSize * 5 /*+16*/)}

${this.htmlMakerChSel.MakeDefaultItemImgCss(itemName, imgName, launchSize, launchSize)}
${this.htmlMakerChSel.MakeDefaultSelectionCss(itemName)}

${this.htmlMakerChSel.MakeDefaultGridColCss(propName, launchSize, 5, launchSize * 5 /*+16*/)}
${this.htmlMakerChSel.MakeDefaultItemJustifyCenterCss(propItemName, launchSize, 30)}

${this.htmlMakerChSel.MakeDefaultToolButtonsCss()}
${this.htmlMakerChSel.MakeDefaultButtonsCss()}
.${propItemName} {
  width: 100%;
  ${HtmlMakerCommonCss.footerButtonText()}
}
[class^="${this.gridFooterName}-"] {
display: flex;
gap: unset;
padding: 4px;
justify-content: flex-end;
  background-color: #f7eb86e6;
  border: 1px solid #b4b107;
}
[class^="${this.gridFooterName}"] button {
${HtmlMakerCommonCss.footerButtonText()}
}
`.trim();
        document.head.appendChild(style);
        const dlgParent = document.getElementById(this.parentName);
        this.htmlMakerChSel.copyCssToInlineStyle(`.${this.parentName}`, dlgParent);
    }
}
export class FormationListSelectResult {
    uiName;
    item;
    selectCh;
    selectedImg;
    scoreSet;
    cancel = false;
}
export class FormationListPropChangedResult {
    uiName = "";
    item;
    values;
    /**スコア計算設定
     *
     * 通知先で「scoreConfigSet.toInst(values)→
     *
     * calcRes = ScoreConfigSet.calcScoreAdvanced(inst, "式")」を実行すると計算できる
     */
    scoreConfigSet;
    cancel = false;
}
class FormationItemJson {
    ch = new CharSpecItemJson;
    prop = new CharSummaryItemProp;
    isEmpty = true;
    TextMap = ""; //FormationItemDetails
    static toJsonText(item) {
        const res = CharSpecItemJson.toJsonInst(item.ch);
        return JSON.stringify(res, null, 2);
    }
    static toJsonInst(item) {
        const res = new FormationItemJson;
        res.ch = CharSpecItemJson.toJsonInst(item.ch);
        CharSummaryItemProp.copy(item.prop, res.prop);
        res.isEmpty = item.isEmpty;
        const temp = Object.fromEntries(item.details.TextMap);
        res.TextMap = JSON.stringify(temp, null, 2);
        return res;
    }
    static fromJsonInst(item) {
        const res = new FormationItem;
        res.ch = CharSpecItemJson.fromJsonInst(item.ch);
        CharSummaryItemProp.copy(item.prop, res.prop);
        res.isEmpty = item.isEmpty;
        const temp = new Map(Object.entries(JSON.parse(item.TextMap)));
        res.details.TextMap = temp;
        return res;
    }
}
export class FormationSetJson {
    items;
    scsList;
    formationOptList;
    uiInfo;
    static toJsonText(formation, scsList, optList) {
        const res = FormationSetJson.toJsonInst(formation, scsList, optList);
        return JSON.stringify(res, null, 2);
    }
    static toJsonInst(formation, scsList, optList) {
        const res = new FormationSetJson;
        res.items = new Array;
        res.scsList = new Array;
        res.formationOptList = new Array;
        for (const item of formation.items) {
            res.items.push(FormationItemJson.toJsonInst(item));
        }
        for (const sc of scsList) {
            res.scsList.push(sc);
        }
        if (optList === undefined) {
            console.log(`[FormationSetJson::toJsonInst] optList === undefined (${formation.uiInfo.name})`);
        }
        else {
            for (const op of optList) {
                res.formationOptList.push(op);
            }
        }
        return res;
    }
    static fromJsonInst(formation) {
        const res = new FormationSet;
        res.items = new Array;
        for (const item of formation.items) {
            res.items.push(FormationItemJson.fromJsonInst(item));
        }
        return res;
    }
}
//# sourceMappingURL=FormationMake.js.map
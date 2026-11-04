import { CharDbCodeTypes, CharDbCodeCategory } from "./CharDB.js";
import { ConvertTools } from "./ConvertTools.js";
import { ClipboardHelper } from "./ClipboardHelper.js";
import { SegmenterHelperBuilder } from "./SegmenterHelperBuilder.js";
import { HtmlMaker, HtmlMakerCopyPasteTypes, HtmlMakerConst } from "./HtmlMaker.js";
import { HtmlMakerTable } from "./HtmlMaker.js";
import { HtmlMakerCommonCss } from "./HtmlMaker.js";
import { HtmlMakerChoiceItem, HtmlMakerChoice, HtmlMakerChoiceTwinModes, HtmlMakerChoiceHeaderModes } from "./HtmlMaker.js";
import { HtmlMakerOptionRadio, HtmlMakerOptionItemSelectTypes } from "./HtmlMaker.js";
import { HtmlMakerUpDown } from "./HtmlMaker.js";
import { HtmlMakerToolTipMgr, HtmlMakerToolTipMgrTypes } from "./HtmlMaker.js";
import { HtmlMakerDialogB2Types } from "./HtmlMaker.js";
import { EvonaMessageBox, MessageBoxResultTypes } from "./MessageBox.js";
export class RisticWords {
    chSpecList;
    charRisticDB;
    fsHtmlMaker = new HtmlMaker;
    splashName = `splash-screen`;
    requestCharListSearch;
    requestCharListVisible;
    requestSummaryAdd;
    RisticWordsFormName = `RisticUI`;
    tableRowCssName() {
        return `${this.RisticWordsFormName}-row`;
    }
    pxCssName() {
        return `${this.RisticWordsFormName}-px`;
    }
    wdCssName() {
        return `${this.RisticWordsFormName}-wd`;
    }
    refCssName() {
        return `${this.RisticWordsFormName}-ref`;
    }
    bmkCssName() {
        return `${this.RisticWordsFormName}-bmk`;
    }
    visibleCssName() {
        return `${this.RisticWordsFormName}-visible`;
    }
    combineCssName() {
        return `${this.RisticWordsFormName}-combine`;
    }
    onRisticChanged = async (classify, selectedKey, selectedValue, changed, rowIndex) => {
        console.log(`onRisticChanged::radio`, classify, selectedKey, selectedValue, changed, rowIndex);
        switch (classify) {
            case this.bmkCssName():
                if (this.risticToolTip === null)
                    return;
                if (this.bmkCtl === null)
                    return;
                const rows = this.risticToolTip.TableRows();
                if (rows === null)
                    return;
                if (changed === true) {
                    const textMap = this.risticToolTip.RowTexts(rows[rowIndex]);
                    const word = textMap.get(this.wdCssName());
                    if (word === undefined)
                        return;
                    const choiceItems = new Array;
                    const itemWd = new HtmlMakerChoiceItem();
                    itemWd.key = `Word_${rowIndex}`;
                    itemWd.text = word;
                    choiceItems.push(itemWd);
                    const itemDel = new HtmlMakerChoiceItem();
                    itemDel.key = `Delete_${rowIndex}`;
                    itemDel.text = `❌`;
                    choiceItems.push(itemDel);
                    this.bmkCtl.makeRowTemplate(choiceItems);
                    const addRowIndex = this.bmkCtl.AddRow();
                    this.risticBmkRowsRef.set(rowIndex, addRowIndex);
                }
                else {
                    this.bmkCtlDelete(rowIndex);
                }
                break;
        }
    };
    onRisticButtonClick = async (rowindex, btn, div, tbl, row, col) => {
        //console.log(`onRisticButtonClick`, rowindex, btn, div, tbl, row, col)
        if (rowindex <= -1)
            return;
        switch (btn.className) {
            case this.refCssName():
                await this.onRisticCharButton(rowindex, btn, div, tbl, row, col);
                break;
        }
    };
    onRisticCheckChanged = async (rowindex, chk, div, tbl, row, col) => {
        console.log(`onRisticCheckChanged`, rowindex, chk, div, tbl, row, col);
        if (this.risticToolTip === null)
            return null;
        if (this.combineMode === true) {
            const check = chk.checked;
            if (check) {
                const nCheck = this.combineMap.size;
                if (this.combineMap.size >= 3) {
                    chk.checked = !check;
                    return;
                }
                const elem = this.getWdElemBy(rowindex - this.risticToolTip.TableFirstRowIndex);
                if (elem === null)
                    return;
                this.combineMap.set(row.rowIndex, elem.textContent);
                elem.textContent = this.selectIcon[nCheck] + elem.textContent;
            }
            else {
                const text = this.combineMap.get(row.rowIndex);
                this.combineMap.delete(row.rowIndex);
                const elem = this.getWdElemBy(rowindex - this.risticToolTip.TableFirstRowIndex);
                if (elem === null)
                    return;
                elem.textContent = text;
                let iIcon = 0;
                for (const [rowIndex, text] of this.combineMap) {
                    const elem = this.getWdElemBy(rowIndex);
                    if (elem === null)
                        return;
                    elem.textContent = this.selectIcon[iIcon] + text;
                    iIcon++;
                }
            }
        }
    };
    getWdElemBy(rowIndex) {
        if (this.risticToolTip === null)
            return null;
        const elems = this.risticToolTip.RowElems(rowIndex);
        if (elems === null)
            return null;
        const elem = elems.get(this.wdCssName());
        if (elem === undefined)
            return null;
        return elem;
    }
    onRisticCharButton = async (rowindex, btn, div, tbl, row, col) => {
        if (this.risticToolTip === null)
            return;
        const chRisticItem = this.charRisticDB.rowIdsMap.get(rowindex - this.risticToolTip.TableFirstRowIndex);
        if (chRisticItem === undefined)
            return;
        console.log(chRisticItem);
        const rowMap = this.risticToolTip.RowTextsByIndex(row.rowIndex);
        if (rowMap === null)
            return;
        let word = rowMap.get(this.wdCssName());
        if (word === undefined)
            return;
        if (word.startsWith(`・`))
            word = word.substring(1);
        const isDecode = (ConvertTools.isUnicodeEscaped(word) || ConvertTools.isAsciiConvetable(word) || ConvertTools.isMorseCode(word));
        const choiceItems = new Array;
        if (isDecode) {
            const itemDec = new HtmlMakerChoiceItem();
            itemDec.key = `Decode`;
            itemDec.text = `🔓デコード`; //👁‍🗨🈁
            choiceItems.push(itemDec);
        }
        for (const chid of chRisticItem) {
            const idText = `${chid}`;
            const exist = this.chSpecList.chList.find(chItem => chItem.id === idText);
            if (exist === undefined)
                continue;
            const itemCh = new HtmlMakerChoiceItem();
            itemCh.key = idText;
            itemCh.text = `${exist.name}`;
            choiceItems.push(itemCh);
        }
        /*
        const itemCancel = new HtmlMakerChoiceItem()
        itemCancel.key = `Cancel`
        itemCancel.text = `❌キャンセル`
        choiceItems.push(itemCancel)
        */
        //
        const choice = new HtmlMakerChoice();
        choice.itemWordWrap = true;
        choice.itemWidth = 200;
        choice.setChoiceItems(choiceItems, HtmlMakerChoiceTwinModes.VisLast);
        choice.onCancel = this.onRisticCharButtonCancel;
        choice.callerElem = btn;
        const dlg = this.risticToolTip.dlg;
        const htmlMaker = new HtmlMaker();
        if (htmlMaker.IsEnabledElem(btn) === false)
            return;
        htmlMaker.EnableElem(btn, false);
        const rcDlg = htmlMaker.GetRect(dlg);
        const rcBtn = htmlMaker.GetRect(btn);
        const parentName = dlg.id;
        choice.setListener(`${parentName}-choice`, parentName, `${parentName}-chSelect`, HtmlMakerChoiceHeaderModes.Visible);
        choice.applyCss();
        choice.show(`${parseInt(rcBtn.left) - parseInt(rcDlg.left) - 1}`, `${parseInt(rcBtn.top) - parseInt(rcDlg.top) + parseInt(rcBtn.height)}`);
        choice.moveLeftByWidth(parseInt(rcBtn.left) - parseInt(rcDlg.left) - 1 + parseInt(rcBtn.width));
        choice.enableEvents(
        /*onSelect*/
        async (ev) => {
            //console.log(`[onSelect] ${ev.callerName} ${ev.result}`)
            choice.dispose();
            if (choice.isCallerTwin(ev.callerName)) {
                await this.risticSelectedCharTwinAction(ev);
            }
            else {
                await this.risticSelectedCharAction(ev, word);
            }
            htmlMaker.EnableElem(btn, true);
        });
    };
    async risticSelectedCharAction(ev, word) {
        switch (ev.result) {
            case `Decode`:
                let msg = ``;
                if (ConvertTools.isUnicodeEscaped(word)) {
                    const decoded = ConvertTools.decodeUnicodeEscapes(word);
                    msg = `${word}<br>→<br>${decoded}`;
                }
                if (ConvertTools.isAsciiConvetable(word)) {
                    if (msg !== ``)
                        msg += `<br>`;
                    const decoded = ConvertTools.decodeAsciiDec(word);
                    msg += `${word}<br>→<br>${decoded}`;
                }
                if (ConvertTools.isMorseCode(word)) {
                    if (msg !== ``)
                        msg += `<br>`;
                    const decoded = ConvertTools.decodeMorse(word);
                    msg += `${word}<br>→<br>${decoded}`;
                }
                const msgbox = new EvonaMessageBox;
                await msgbox.showWait(`デコード結果<br>${msg}`);
                //htmlMaker.EnableElem(btn, true)
                return;
            case `Cancel`:
                //htmlMaker.EnableElem(btn, true)
                return;
        }
        const targetChar = this.chSpecList.chList.find(chItem => chItem.id === ev.result);
        if (targetChar) {
            console.log(`🚀 ${targetChar.displayText} へテレポートします！`);
            /*
            chListUI.scrollByKw(targetChar.displayText, fsHtmlMaker)
            */
            if (this.requestCharListSearch !== undefined)
                this.requestCharListSearch(targetChar);
        }
    }
    async risticSelectedCharTwinAction(ev) {
        const targetChar = this.chSpecList.chList.find(chItem => chItem.id === ev.result);
        if (targetChar) {
            console.log(`🚀 ${targetChar.displayText} の追加要求です！`);
            /*
            const req = new CharSummaryActionReq()
            await makeNewSummaryChar(targetChar, req)
            await summaryUI.onItemAdd(req)
            */
            if (this.requestSummaryAdd !== undefined)
                this.requestSummaryAdd(targetChar);
        }
    }
    onRisticCharButtonCancel = async (choice, callerElem) => {
        choice.dispose();
        if (callerElem !== null) {
            const htmlMaker = new HtmlMaker();
            htmlMaker.EnableElem(callerElem, true);
        }
    };
    onRisticTableMouseUp = async (target) => {
        if (target instanceof HTMLSpanElement) {
            const span = target;
            // 現在ブラウザで選択されているテキストを取得
            const selection = document.getSelection();
            if (!selection)
                return;
            const selectedText = selection.toString().trim();
            ClipboardHelper.put(selectedText);
        }
        if (this.updnCtl !== null) {
            this.updnCtl.setVisible(true);
        }
    };
    onRisticTableSelection = async (target) => {
        console.log(`**onRisticTableSelection**`, target);
        if (this.updnCtl !== null) {
            this.updnCtl.setVisible(false);
        }
    };
    risticFindStartWd = ``;
    onRisticTableLongTap = async (isLongPressed, target) => {
        //console.log(isLongPressed, target.className, target.tagName)
        if (this.risticToolTip === null)
            return;
        if (target.className !== this.pxCssName())
            return;
        const curRow = this.risticToolTip.CurRow;
        if (curRow === null)
            return;
        const elems = curRow.getElementsByClassName(target.className);
        if (elems.length === 0)
            return;
        this.risticFindStartWd = elems[0].textContent;
        if (isLongPressed) {
            //prev
            const res = await this.risticToolTip.FindPrevRow(this.onRisticTableFindCallback);
            if (res) {
                this.risticToolTip.SetCurRowIndex(this.risticToolTip.MatchRowIndex, true);
                await this.syncRisticCategoryCombo(this.risticToolTip.MatchRowIndex + 1); //スクロールイベント発生してもObserver検知しないのでコールする
                this.setRisticUpDnIndexText(this.risticToolTip.MatchRowIndex);
            }
        }
        else {
            //next
            const res = await this.risticToolTip.FindNextRow(this.onRisticTableFindCallback);
            if (res) {
                this.risticToolTip.SetCurRowIndex(this.risticToolTip.MatchRowIndex, true);
                await this.syncRisticCategoryCombo(this.risticToolTip.MatchRowIndex + 1); //スクロールイベント発生してもObserver検知しないのでコールする
                this.setRisticUpDnIndexText(this.risticToolTip.MatchRowIndex);
            }
        }
    };
    onRisticTableFindCallback = async (tblElem, row) => {
        const elems = row.getElementsByClassName(this.pxCssName());
        if (elems.length === 0)
            return false;
        const wd = elems[0].textContent;
        if (wd === `　`)
            return false;
        return this.risticFindStartWd !== wd;
    };
    onRisticTableOnFirstVisible = async () => {
        await this.jumpCategoryTop(CharDbCodeTypes.Hiragana);
        await this.resetRisticAllRows();
        const dlg = this.risticToolTip.dlg;
        const htmlMaker = new HtmlMaker();
        const rcDlg = htmlMaker.GetRect(dlg);
        const rcRow = htmlMaker.GetRect(this.risticToolTip.Table.rows[0]);
        const rcCols = this.risticToolTip.RowRects(0);
        const rcRef = rcCols.get(this.refCssName());
        const wRef = rcRef.width;
        const rcBmk = rcCols.get(this.bmkCssName());
        const wBmk = rcBmk.width;
        const rcUpDnCtl = this.updnCtl.getRect();
        this.updnCtl.moveTo(parseInt(rcRow.left) + parseInt(rcRow.width)
            - wRef - wBmk - rcUpDnCtl.width - parseInt(rcDlg.left) - 10, 32);
        const rcBmkCtl = this.bmkCtl.getRect();
        this.bmkCtl.moveTo(parseInt(rcRow.left) + parseInt(rcRow.width)
            - wRef - wBmk - rcBmkCtl.width - parseInt(rcDlg.left) - 10, parseInt(rcDlg.height) - rcBmkCtl.height - 32);
    };
    onChangeCategory = async (event) => {
        if (this.comboEnabled === false)
            return;
        const target = event.target;
        const category = target.value;
        await this.jumpCategoryTop(category);
    };
    async jumpCategoryTop(category) {
        if (this.risticToolTip === null)
            return;
        const table = this.risticToolTip.Table;
        if (table === null)
            return;
        if (this.risticStartRow === null)
            return;
        let rowIndex = this.risticStartRow.get(category);
        if (rowIndex === undefined)
            return;
        do {
            const dispProp = table.rows[rowIndex].style.display;
            if (dispProp !== `none`)
                break;
            rowIndex++;
        } while (rowIndex < table.rows.length);
        if (rowIndex < table.rows.length) {
            this.risticToolTip.SetCurRowIndex(rowIndex, true);
            await this.syncRisticCategoryCombo(rowIndex + 1); //スクロールイベント発生してもObserver検知しないのでコールする
            await this.syncRisticUpDnByCategory();
        }
        else {
            console.error(`cannot scroll for category : ${category}`);
        }
    }
    async syncRisticUpDnByCategory() {
        if (this.risticToolTip === null)
            return;
        if (this.updnCtl === null)
            return;
        const row = this.risticToolTip.CurRow;
        if (row === null)
            return;
        const texts = this.risticToolTip.RowTextsByIndex(row.rowIndex);
        if (texts === null)
            return;
        const findText = texts.get(this.pxCssName());
        if (findText === undefined)
            return;
        const pair = this.updnCtl.updateValue(findText);
        //const updateRowIndex = Number(pair[1])
        //risticToolTip.SetCurRowIndex(updateRowIndex, true)
        //await syncRisticCategoryCombo(updateRowIndex + 1)  //スクロールイベント発生してもObserver検知しないのでコールする
    }
    setRisticUpDnIndexText(rowIndex) {
        if (this.risticToolTip === null)
            return;
        if (this.updnCtl === null)
            return;
        do {
            const texts = this.risticToolTip.RowTextsByIndex(rowIndex);
            if (texts === null)
                return;
            const findText = texts.get(this.pxCssName());
            if (findText === undefined)
                return;
            if (findText !== `　`) {
                this.updnCtl.updateValue(findText);
                break;
            }
            rowIndex--;
        } while (rowIndex >= 0);
    }
    onChangeAppears = async (event) => {
        if (this.comboEnabled === false)
            return;
        if (this.risticToolTip === null)
            return;
        const rows = this.risticToolTip.TableRows();
        if (rows === null)
            return;
        const target = event.target;
        const pairIndex = target.className.includes(`-appears`) ? 0 : 1;
        const keyword = target.value;
        for (const row of rows) {
            const colMap = this.risticToolTip.RowTexts(row);
            if (colMap === undefined)
                continue;
            const info = colMap.get(this.refCssName());
            const pair = info.split(`/`);
            if (pair.length !== 2)
                continue;
            if (pair[pairIndex] === keyword) {
                row.style.display = ``;
            }
            else {
                row.style.display = `none`;
            }
        }
    };
    onClickRisticOption = async (event) => {
        const dlg = this.risticToolTip.dlg;
        const htmlMaker = new HtmlMaker();
        if (htmlMaker.IsEnabledElem(this.optButton) === false)
            return;
        const choiceItems = new Array;
        if (this.allOptionVisible) {
            const itemCopy = new HtmlMakerChoiceItem();
            itemCopy.key = HtmlMakerCopyPasteTypes.Copy;
            itemCopy.text = `💬全コピー`;
            choiceItems.push(itemCopy);
        }
        if (this.allOptionVisible) {
            const itemReset = new HtmlMakerChoiceItem();
            itemReset.key = `Reset`;
            itemReset.text = `🔙リセット`;
            choiceItems.push(itemReset);
        }
        if (this.combineMode === false) {
            const itemVisible = new HtmlMakerChoiceItem();
            itemVisible.key = `Visible`;
            itemVisible.text = this.visibleMode === false ? `🔍表示選択` : `🔍選択終了`;
            choiceItems.push(itemVisible);
        }
        if (this.visibleMode === false) {
            const itemCombine = new HtmlMakerChoiceItem();
            itemCombine.key = `Combine`;
            itemCombine.text = this.combineMode === false ? `🔤単語連結` : `🔤連結終了`;
            choiceItems.push(itemCombine);
        }
        if (this.allOptionVisible) {
            const itemBmk = new HtmlMakerChoiceItem();
            itemBmk.key = `Bmk`;
            itemBmk.text = `🚩しおり`;
            choiceItems.push(itemBmk);
        }
        if (this.allOptionVisible) {
            const itemMdn = new HtmlMakerChoiceItem();
            itemMdn.key = `MdnTest`;
            itemMdn.text = `🌍MDN実験`;
            choiceItems.push(itemMdn);
        }
        const itemCancel = new HtmlMakerChoiceItem();
        itemCancel.key = `Cancel`;
        itemCancel.text = `❌キャンセル`;
        choiceItems.push(itemCancel);
        const choice = new HtmlMakerChoice();
        choice.setChoiceItems(choiceItems);
        htmlMaker.EnableElem(this.optButton, false);
        const rcDlg = htmlMaker.GetRect(dlg);
        const rcOpt = htmlMaker.GetRect(this.optButton);
        const parentName = dlg.id;
        choice.setListener(`${parentName}-choice`, parentName, `${parentName}-opt`);
        choice.applyCss();
        choice.show(`${parseInt(rcOpt.left) - parseInt(rcDlg.left) - 1}`, `${parseInt(rcOpt.top) - parseInt(rcDlg.top) + parseInt(rcOpt.height)}`);
        choice.moveLeftByWidth(parseInt(rcOpt.left) - parseInt(rcDlg.left) - 1 + parseInt(rcOpt.width));
        choice.enableEvents(
        /*onSelect*/
        async (ev) => {
            //console.log(`[onSelect] ${ev.callerName} ${ev.result}`)
            choice.dispose();
            switch (ev.result) {
                case HtmlMakerCopyPasteTypes.Copy:
                    await this.onClickRisticCopy();
                    break;
                case `Visible`:
                    const fsHtmlMaker = this.fsHtmlMaker;
                    const splashName = this.splashName;
                    const msgElem = fsHtmlMaker.getFullScreenMsgElem(splashName);
                    fsHtmlMaker.showFullScreenCss(splashName);
                    msgElem.innerHTML = `切替中 ...`;
                    //最初の選択はチェックボッスだけ表示、以降はチェックボックス非表示・ワード数表示
                    //  appendCheckBoxはremoveしないとなにもしない
                    const cssNames = [
                        this.refCssName(),
                        this.bmkCssName(),
                        this.bmkCssName() + HtmlMakerCommonCss.radioBackClassMark,
                        this.visibleCssName()
                    ];
                    this.risticToolTip.visibleToggleRowsElem(cssNames);
                    this.risticToolTip.autoCheck = true;
                    this.risticToolTip.defCheck = true;
                    this.risticToolTip.initChecks = this.visibleMap;
                    this.risticToolTip.appendCheckBox(this.refCssName(), this.visibleCssName());
                    fsHtmlMaker.hideFullScreenCss(splashName);
                    this.visibleMode = !this.visibleMode;
                    if (this.visibleMode === false) {
                        //選択結果を保存
                        const msgbox = new EvonaMessageBox;
                        msgbox.setParent(dlg.className);
                        msgbox.setYesNo();
                        const res = await msgbox.showWait(`選択結果を保存してよろしいですか？`);
                        if (res === MessageBoxResultTypes.Yes) {
                            const visibleMap = this.risticToolTip.getRowsCheckValues(this.visibleCssName());
                            console.log(visibleMap);
                            if (visibleMap !== null)
                                this.charRisticDB.reindex(this.risticToolTip.Table, this.pxCssName(), visibleMap);
                        }
                    }
                    else {
                        this.risticToolTip?.visibleRows(); //全行表示
                        const msgbox = new EvonaMessageBox;
                        msgbox.setParent(dlg.className);
                        await msgbox.showWait(`関連語の表示状態を切り替えます。<br>表示選択メニューをOFFにしたとき保存します。`);
                    }
                    this.charListVisible(!this.visibleMode);
                    break;
                case `Combine`:
                    if (this.combineMode === false) {
                        const cssNames2 = [
                            this.refCssName(),
                            this.bmkCssName(),
                            this.bmkCssName() + HtmlMakerCommonCss.radioBackClassMark,
                        ];
                        this.risticToolTip.visibleToggleRowsElem(cssNames2);
                        this.risticToolTip.autoCheck = false;
                        this.risticToolTip.defCheck = false;
                        this.risticToolTip.initChecks = new Map;
                        this.risticToolTip.appendCheckBox(this.refCssName(), this.combineCssName());
                        this.combineMap = new Map;
                    }
                    else {
                        switch (this.combineMap.size) {
                            case 0:
                                /*nop*/ break;
                            case 1:
                                for (const [rowIndex, text] of this.combineMap) {
                                    const elem = this.getWdElemBy(rowIndex);
                                    if (elem === null)
                                        continue;
                                    elem.textContent = text;
                                }
                                break;
                            default:
                                /*
                                this.combineMap = new Map<number, string>
                                this.combineMap.set(1, `あいうえお`)
                                this.combineMap.set(2, `あいう`)
                                this.combineMap.set(3, `あいうえおかき`)
                                */
                                //含んでいる単語があるか
                                const delWords = new Array;
                                let containsWord = ``;
                                for (const [rowIndex, wd] of this.combineMap) {
                                    if (containsWord === ``) {
                                        containsWord = wd;
                                        continue;
                                    }
                                    if (wd.length >= containsWord.length) {
                                        if (wd.includes(containsWord)) {
                                            delWords.push(containsWord);
                                            containsWord = wd;
                                        }
                                    }
                                    else {
                                        if (containsWord.includes(wd)) {
                                            delWords.push(wd);
                                        }
                                    }
                                }
                                //console.log(delWords)
                                //選択マークを元に戻す＆連結
                                let combinedDest = ``; //連結結果
                                for (const [rowIndex, text] of this.combineMap) {
                                    const elem = this.getWdElemBy(rowIndex);
                                    if (elem === null)
                                        continue;
                                    elem.textContent = text;
                                    if (!delWords.includes(text)) {
                                        combinedDest += text;
                                    }
                                }
                                //連結結果
                                let isFirst = true;
                                let combineSrc = ``; //連結先の単語
                                for (const [rowIndex, text] of this.combineMap) {
                                    const elem = this.getWdElemBy(rowIndex);
                                    if (elem === null)
                                        continue;
                                    if (delWords.includes(text)) {
                                        elem.textContent = `💔` + text;
                                        continue;
                                    }
                                    if (isFirst) {
                                        isFirst = false;
                                        combineSrc = text;
                                        elem.textContent = `✅` + combinedDest;
                                    }
                                    else {
                                        delWords.push(text); //連結したので削除対象の単語
                                        elem.textContent = `❎` + text;
                                    }
                                }
                                console.log(combineSrc, delWords);
                                //元データを更新
                                this.charRisticDB.combine(combineSrc, combinedDest, delWords);
                                await this.charRisticDB.save();
                                break;
                        }
                        this.risticToolTip.removeCheckBox(this.refCssName(), this.combineCssName());
                        const cssNames2 = [
                            this.refCssName(),
                            this.bmkCssName(),
                            this.bmkCssName() + HtmlMakerCommonCss.radioBackClassMark,
                        ];
                        this.risticToolTip.visibleToggleRowsElem(cssNames2);
                    }
                    this.combineMode = !this.combineMode;
                    this.charListVisible(!this.combineMode);
                    break;
                case `Bmk`:
                    if (this.bmkCtl !== null) {
                        const visible = this.bmkCtl.getVisible();
                        this.bmkCtl.setVisible(!visible);
                    }
                    break;
                case `MdnTest`:
                    const builder = new SegmenterHelperBuilder();
                    // 1. クラスソースをフェッチして再帰で終わりのカッコを一本釣り！
                    const isLoaded = await builder.LoadHelper();
                    if (isLoaded) {
                        // 2. データをはめ込んだ完全なJSコードをクリップボードに格納！
                        await builder.makeCaller();
                        // 3. MDNのIntl.Segmenter公式プレイグラウンドへテレポート！
                        builder.openIntlSegmenterDocs();
                    }
                    else {
                        console.error("SegmenterHelperの読み込みに失敗しました。");
                    }
                    break;
                case `Reset`:
                    await this.onClickRisticReset();
                    break;
            }
            htmlMaker.EnableElem(this.optButton, true);
        });
    };
    async onClickRisticCopy() {
        if (this.risticToolTip === null)
            return;
        if (this.comboEnabled === false)
            return;
        const lf = HtmlMakerConst.toolTipNewLine;
        const textAll = this.makeCharSummary() + lf + this.makeRisticSummary();
        const encEnable = ClipboardHelper.encodeEnable;
        ClipboardHelper.encodeEnable = false;
        await ClipboardHelper.put(textAll);
        ClipboardHelper.encodeEnable = encEnable;
        this.comboEnabled = true;
    }
    charListVisible(visible) {
        if (this.requestCharListVisible !== undefined) {
            this.requestCharListVisible(visible);
        }
    }
    makeCharSummary() {
        const skillMap = this.charRisticDB.skillMap;
        const idMap = new Map();
        for (const [word, chids] of skillMap) {
            for (const chid of chids.ids) {
                const idText = `${chid}`;
                const idExist = idMap.get(idText);
                if (idExist === undefined)
                    idMap.set(idText, chid);
            }
        }
        let textAll = `# キャラID一覧 (${idMap.size})`;
        const lf = HtmlMakerConst.toolTipNewLine;
        for (const [idText, chid] of idMap) {
            const exist = this.chSpecList.chList.find(chItem => chItem.id === idText);
            if (exist === undefined)
                continue;
            textAll += lf + `- ID_${chid}：(${exist.name})`;
        }
        return textAll;
    }
    makeRisticSummary() {
        const rows = this.risticToolTip.TableRows();
        if (rows === null)
            return ``;
        const rowIdsArray = this.charRisticDB.rowIdsArray;
        let textAll = `# 関連語一覧 (${rows.length})`;
        let prefixCur = ``;
        let rowIndex = -1;
        const lf = HtmlMakerConst.toolTipNewLine;
        for (const row of rows) {
            const colMap = this.risticToolTip?.RowTexts(row);
            if (colMap === undefined)
                continue;
            const prefix = colMap.get(this.pxCssName());
            const word = colMap.get(this.wdCssName());
            const info = colMap.get(this.refCssName());
            rowIndex++;
            const ids = rowIdsArray[rowIndex][1];
            let idTexts = ``;
            for (const id of ids) {
                if (idTexts !== ``)
                    idTexts += `/`;
                idTexts += `ID_${id}`;
            }
            if (prefix !== `　` && prefix !== prefixCur) {
                textAll += lf + `- **${prefix}**`;
                prefixCur = prefix;
            }
            textAll += lf + `  - ${word} (${info}) ${idTexts}`;
        }
        return textAll;
    }
    async onClickRisticReset() {
        if (this.risticToolTip === null)
            return;
        if (this.comboEnabled === false)
            return;
        function reset(select) {
            if (select !== null) {
                const option = select.item(0);
                if (option !== null)
                    select.value = option.value;
            }
        }
        this.comboEnabled = false;
        reset(this.appearsCombo);
        reset(this.idsCombo);
        this.resetRisticAllRows();
        this.comboEnabled = true;
    }
    async resetRisticAllRows() {
        if (this.risticToolTip === null)
            return;
        const rows = this.risticToolTip.TableRows();
        if (rows === null)
            return;
        for (const row of rows) {
            row.style.display = ``;
        }
    }
    onRisticTableNotifyWatched = async (trElem) => {
        const rowId = trElem.getAttribute("item-id");
        console.log(`[${trElem.className}::${rowId}] が見えました！`);
        const rowIndex = Number(rowId);
        await this.syncRisticCategoryCombo(rowIndex);
        if (this.risticToolTip !== null && this.risticToolTip.FirstVisbleRow !== null) {
            const rows = this.risticToolTip.TableRows();
            if (rows !== null) {
                let findRowIndex = this.risticToolTip.FirstVisbleRow.rowIndex;
                while (findRowIndex >= 0) {
                    if (rows[findRowIndex].style.display === ``) {
                        const texts = this.risticToolTip.RowTextsByIndex(findRowIndex);
                        if (texts !== null) {
                            const findText = texts.get(this.pxCssName());
                            if (findText !== undefined) {
                                //console.log(findRowIndex, findText)
                                if (findText !== `　`) {
                                    this.risticToolTip.SetCurRowIndex(findRowIndex, false);
                                    await this.syncRisticUpDnByCategory();
                                    break;
                                }
                            }
                        }
                    }
                    findRowIndex--;
                }
            }
        }
    };
    async syncRisticCategoryCombo(rowIndex) {
        if (this.risticStartRow === null)
            return;
        if (this.risticToolTip === null)
            return;
        const table = this.risticToolTip.Table;
        if (table === null)
            return;
        if (this.categoryCombo === null)
            return;
        const categoryElem = this.categoryCombo.item(this.categoryCombo.selectedIndex);
        if (categoryElem === null)
            return;
        const startRowArray = Array.from(this.risticStartRow.entries());
        const nArray = startRowArray.length;
        if (nArray === 0)
            return;
        let keyMatch = ``;
        for (let index = 0; index < startRowArray.length; index++) {
            const [key, start] = startRowArray[index];
            let end = 0;
            if (index < startRowArray.length - 1) {
                const [keyNext, startNext] = startRowArray[index + 1];
                end = startNext; //+ 1
            }
            else {
                end = table.rows.length;
            }
            if (start <= rowIndex && rowIndex <= end) { //start + 1 <= rowIndex && rowIndex <= end
                keyMatch = key;
                break;
            }
        }
        if (keyMatch !== ``) {
            if (keyMatch !== categoryElem.value) {
                console.log(`${keyMatch} changed`);
                this.categoryCombo.value = keyMatch;
            }
        }
        else {
            console.log(`cannot found keyMatch`);
        }
    }
    risticBmkOffText = `🚩`; //🔖📙
    setRisticTableRowButtonWithPx(cellIndex, rowIndex, title, content, table) {
        const pxCssClassName = this.pxCssName();
        table.getCell(cellIndex, rowIndex).typeInfo.setLabel(title.charAt(0), false);
        table.getCell(cellIndex, rowIndex).className = pxCssClassName;
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        cellIndex++;
        const titleCssClassName = this.wdCssName();
        table.getCell(cellIndex, rowIndex).typeInfo.setLabel(title, false);
        table.getCell(cellIndex, rowIndex).className = titleCssClassName;
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        cellIndex++;
        const contentCssClassName = this.refCssName();
        table.getCell(cellIndex, rowIndex).typeInfo.setButton(content);
        table.getCell(cellIndex, rowIndex).className = contentCssClassName;
        table.getCell(cellIndex, rowIndex).tdName = `td_` + contentCssClassName;
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        cellIndex++;
        const bmkCssClassName = this.bmkCssName();
        const bmkPairs = new Array;
        bmkPairs.push(`${this.risticBmkOffText}/${rowIndex}`);
        const rowSelectedItems = new Array;
        const bmkOpt = new HtmlMakerOptionRadio();
        bmkOpt.selectionPair = bmkPairs;
        bmkOpt.selectedItems = rowSelectedItems;
        bmkOpt.selectType = HtmlMakerOptionItemSelectTypes.Multi;
        bmkOpt.classify = bmkCssClassName;
        const cellOpt = table.getCell(cellIndex, rowIndex);
        cellOpt.typeInfo.setRadio(bmkOpt);
        cellOpt.className = bmkCssClassName;
        cellOpt.typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    }
    makeRisticTable() {
        const nRistic = this.charRisticDB.skillMap.size;
        //テーブル作成
        const nCol = 4;
        const table = new HtmlMakerTable();
        table.makeDim(nCol, nRistic);
        //カラム定義
        let rowIndex = 0;
        for (const [key, data] of this.charRisticDB.skillMap) {
            let title1 = `${key}`;
            let manual1 = `${data.count}/${data.ids.length}`;
            this.setRisticTableRowButtonWithPx(0, rowIndex, title1, manual1, table);
            rowIndex++;
        }
        //行テンプレート初期化
        table.makeRowTemplate(this.tableRowCssName());
        return table;
    }
    comboEnabled = false;
    categoryCombo = null;
    appearsCombo = null;
    idsCombo = null;
    optButton = null;
    visibleMode = false;
    combineMode = false;
    visibleMap = new Map;
    combineMap = new Map;
    get allOptionVisible() { return this.visibleMode === false && this.combineMode === false; }
    get selectIcon() { return [`1️⃣`, `2️⃣`, `3️⃣`, `4️⃣`, `5️⃣`, `6️⃣`, `7️⃣`, `8️⃣`, `9️⃣`, `🔟`]; }
    makeRisticActions() {
        if (this.risticToolTip === null)
            return;
        if (this.risticToolTip.actDiv === null)
            return;
        const actDiv = this.risticToolTip.actDiv;
        const comboCategory = `${actDiv.className}-category`;
        this.categoryCombo = this.makeCategoryJumpCombo(``, comboCategory);
        const appears = this.charRisticDB.appears();
        const comboAppears = `${actDiv.className}-appears`;
        this.appearsCombo = this.makeFilterCombo(`単語数：`, appears, comboAppears);
        const ids = this.charRisticDB.ids();
        const comboIds = `${actDiv.className}-ids`;
        this.idsCombo = this.makeFilterCombo(`／キャラ数：`, ids, comboIds);
        const btnOptName = `${actDiv.className}-options`;
        const optButton = document.createElement("button");
        optButton.id = btnOptName;
        optButton.className = btnOptName;
        optButton.innerHTML = `…`;
        optButton.title = `Options`;
        actDiv.appendChild(optButton);
        optButton.addEventListener("click", this.onClickRisticOption);
        this.optButton = optButton;
        this.comboEnabled = true;
    }
    makeCategoryJumpCombo(title, comboName) {
        let index = -1;
        let optionHtmls = ``;
        for (const [cat, dispText] of CharDbCodeCategory.displayTextMap) {
            index++;
            const selected = cat === CharDbCodeTypes.Hiragana ? " selected" : "";
            const optionHtml = `
<option value="${cat}"${selected}>${dispText}</option>
`.trim();
            optionHtmls += optionHtml;
        }
        if (index === -1)
            return null;
        const actDiv = this.risticToolTip.actDiv;
        const aTag = document.createElement("a");
        aTag.innerHTML = title;
        actDiv.appendChild(aTag);
        const select = document.createElement("select");
        select.id = comboName;
        select.className = comboName;
        select.innerHTML = optionHtmls;
        actDiv.appendChild(select);
        select.addEventListener("change", this.onChangeCategory);
        return select;
    }
    makeFilterCombo(title, ds, comboName) {
        let index = -1;
        let optionHtmls = ``;
        for (const [app, indexies] of ds) {
            index++;
            const selected = index === 0 ? " selected" : "";
            const optionHtml = `
<option value="${app}"${selected}>${app}</option>
`.trim();
            optionHtmls += optionHtml;
        }
        if (index === -1)
            return null;
        const actDiv = this.risticToolTip.actDiv;
        const aTag = document.createElement("a");
        aTag.innerHTML = title;
        actDiv.appendChild(aTag);
        const select = document.createElement("select");
        select.id = comboName;
        select.className = comboName;
        select.innerHTML = optionHtmls;
        actDiv.appendChild(select);
        select.addEventListener("change", this.onChangeAppears);
        return select;
    }
    risticCssText() {
        let btnOptCss = ``;
        if (this.risticToolTip !== null) {
            const actDiv = this.risticToolTip.actDiv;
            if (actDiv !== null) {
                const btnOptName = `${actDiv.className}-options`;
                btnOptCss = `
#${btnOptName} {
    background: ${HtmlMakerCommonCss.normBkColor};
    color: black;
    border: 1px solid #777;
    border-radius: 3px;
    width: 22px;
    height: 22px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    padding-bottom: 4px; /* 下にパディングを入れて、文字を上に押し上げる */
    cursor: pointer;
    transition: background 0.2s;
}
#${btnOptName}:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
`.trim();
            }
        }
        const bmkCssClassName = this.bmkCssName();
        const marker = HtmlMakerCommonCss.radioBackClassMark;
        const activeText = HtmlMakerCommonCss.radioActiveKeyText;
        return `
.${this.wdCssName()} {
${HtmlMakerCommonCss.textEnableText}
width: 400px;
border: 1px solid #b4b10780;
  overflow-wrap: anywhere; /* 長い単語であっても、枠の右端に達したら強制的に途中折り返しする！ */
  /* または */
  word-break: break-all;
}
.${this.wdCssName()}:hover {
background: ${HtmlMakerCommonCss.onColor};
border: 1px solid #b4b107;
}

#td_${this.refCssName()} {
height: 32px;
padding: 0;
}
.${this.refCssName()} {
text-align: center;
width: 100%; height: 100%;
background: ${HtmlMakerCommonCss.btnBkColor};
border: 1px solid #777;
border-radius: 16px;
cursor: pointer;
font-size: 14px;
}
.${this.refCssName()}:hover {
background: ${HtmlMakerCommonCss.onColor};
border: 1px solid #b4b107;
}

[id*="${bmkCssClassName}"] {
${HtmlMakerCommonCss.radioNormCssText}
}
[id*="${bmkCssClassName}"].${activeText} {
${HtmlMakerCommonCss.radioActCssText}
}

${btnOptCss}
`.trim();
    }
    bmkCtl = null;
    risticBmkRowsRef = new Map; //関連語UIのrowIndex, 付箋UIのrowIndex
    makeBookmarkCtl(toolTipNew) {
        const dlg = toolTipNew.dlg;
        const choiceItems = new Array;
        const choice = new HtmlMakerChoice();
        const itemWd = new HtmlMakerChoiceItem();
        itemWd.key = `Dummy`;
        itemWd.text = ``;
        choiceItems.push(itemWd);
        choice.setChoiceItems(choiceItems, HtmlMakerChoiceTwinModes.VisLast);
        choice.headerTitle = `しおり`;
        choice.setMinSize(200, 100);
        const parentName = dlg.id;
        choice.setListener(`${parentName}-choice-bmk`, parentName, `${parentName}-bmk`, HtmlMakerChoiceHeaderModes.Visible);
        choice.applyCss();
        choice.show(`0`, `0`);
        choice.enableEvents(
        /*onSelect*/
        async (ev) => {
            //console.log(`[onSelect] ${ev.callerName} ${ev.result}`)
            //choice.dispose()
            switch (ev.result) {
                case HtmlMakerCopyPasteTypes.Copy:
                    break;
            }
            if (ev.callerName.includes(`Word_`)) {
                const caller = ev.callerName.split(`_`);
                const wdListRowIndex = Number(caller[caller.length - 1]);
                if (this.risticToolTip !== null) {
                    this.risticToolTip.SetCurRowIndex(wdListRowIndex, true);
                    await this.syncRisticCategoryCombo(wdListRowIndex + 1); //スクロールイベント発生してもObserver検知しないのでコールする
                    this.setRisticUpDnIndexText(wdListRowIndex);
                }
            }
            if (ev.callerName.includes(`Delete_`)) {
                const caller = ev.callerName.split(`_`);
                const wdListRowIndex = Number(caller[caller.length - 1]);
                this.bmkCtlDelete(wdListRowIndex);
                const elems = this.risticToolTip.RowElems(wdListRowIndex);
                if (elems !== null) {
                    const elem = elems.get(this.bmkCssName());
                    if (elem !== undefined) {
                        this.risticToolTip.ToggleActive(elem);
                    }
                }
            }
            //htmlMaker.EnableElem(optButton! as HTMLElement, true)
        });
        choice.onCancel = this.onBmkButtonCancel;
        choice.enableOverlay(false);
        choice.DeleteRow();
        this.bmkCtl = choice;
    }
    onBmkButtonCancel = async (choice, callerElem) => {
        choice.setVisible(false);
    };
    bmkCtlDelete(wdListRowIndex) {
        if (this.bmkCtl === null)
            return;
        const bmkRowIndex = this.risticBmkRowsRef.get(wdListRowIndex);
        if (bmkRowIndex !== undefined) {
            this.bmkCtl.DeleteRow(bmkRowIndex);
            this.bmkCtl.redimAllRows();
            this.risticBmkRowsRef.delete(wdListRowIndex);
            const redim = new Map;
            let newIndex = 0;
            for (const [wdIndex, bmkIndex] of this.risticBmkRowsRef) {
                newIndex++;
                redim.set(wdIndex, newIndex);
            }
            this.risticBmkRowsRef = redim;
        }
    }
    updnCtl = null;
    makeIndexCtl(toolTipNew) {
        const indexMap = toolTipNew.AllVisibleRowsText(this.pxCssName(), `　`);
        if (indexMap === null) {
            this.updnCtl = null;
            return;
        }
        let callerText = ``;
        const pair = new Array;
        for (const [rowIndex, text] of indexMap) {
            pair.push(`${text}/${rowIndex}`);
            if (callerText === ``)
                callerText = text;
        }
        const callerName = `risticToolTip`;
        const parentClassName = toolTipNew.Table.parentElement.className;
        const updn = new HtmlMakerUpDown();
        updn.setListener(`risticUpdn`, parentClassName, callerName);
        updn.setSelectedByValue(callerText, pair);
        updn.applyCss();
        updn.show(`0`, `0`);
        updn.enableEvents(
        /*onApply*/ async (ev) => {
            //console.log(`[onApply] ${ev.callerName} ${ev.result}`)
        }, 
        /*onUp*/ async (ev) => {
            //console.log(`[onUp] ${ev.callerName} ${ev.result}`)
            if (this.risticToolTip === null)
                return;
            if (this.updnCtl === null)
                return;
            const pair = this.updnCtl.getValue(this.updnCtl.selectedIndex - 1);
            const rowIndex = Number(pair[1]);
            this.risticToolTip.SetCurRowIndex(rowIndex, true);
            await this.syncRisticCategoryCombo(rowIndex + 1); //スクロールイベント発生してもObserver検知しないのでコールする
        }, 
        /*onDown*/ async (ev) => {
            //console.log(`[onDown] ${ev.callerName} ${ev.result}`)
            if (this.risticToolTip === null)
                return;
            if (this.updnCtl === null)
                return;
            const pair = this.updnCtl.getValue(this.updnCtl.selectedIndex + 1);
            const rowIndex = Number(pair[1]);
            this.risticToolTip.SetCurRowIndex(rowIndex, true);
            await this.syncRisticCategoryCombo(rowIndex + 1); //スクロールイベント発生してもObserver検知しないのでコールする
        });
        //this.enableWindowEvent()
        updn.enableOverlay(false);
        this.updnCtl = updn;
    }
    async onRisticCopyPaste(dlg, cpType) {
        switch (cpType) {
            case HtmlMakerCopyPasteTypes.Copy:
                if (this.risticToolTip !== null) {
                    const rows = this.risticToolTip.TableRows();
                    if (rows !== null) {
                        let rowIndex = 0;
                    }
                }
                break;
            case HtmlMakerCopyPasteTypes.Paste:
                if (this.risticToolTip !== null) {
                    const rows = this.risticToolTip.TableRows();
                    if (rows !== null) {
                        let rowIndex = 0;
                    }
                }
                break;
        }
    }
    getRisticWdForChListUI(chId) {
        const res = new Array;
        for (const [wd, info] of this.charRisticDB.skillMap) {
            const exist = info.ids.find(id => `${id}` === chId);
            if (exist) {
                res.push(wd);
            }
        }
        return res;
    }
    async activateRisticWdForChListUI(word) {
        if (this.risticToolTip === null)
            return;
        if (this.risticToolTip.GetVisible() === false) {
            this.risticToolTip.SetVisible(true);
        }
        const wordMap = this.risticToolTip.AllVisibleRowsText(this.wdCssName(), ``);
        if (wordMap === null)
            return;
        let existRowIndex = -1;
        for (const [rowIndex, wd] of wordMap) {
            if (wd === word) {
                existRowIndex = rowIndex;
                break;
            }
        }
        if (existRowIndex === -1)
            return;
        this.risticToolTip.SetCurRowIndex(existRowIndex, true);
        await this.syncRisticCategoryCombo(existRowIndex + 1); //スクロールイベント発生してもObserver検知しないのでコールする
        this.setRisticUpDnIndexText(existRowIndex);
    }
    risticStartRow = null;
    risticToolTip = null; //= this.charRisticDB.loaded === false ? null : await this.makeRisticToolTip()
    async makeRisticToolTip() {
        if (this.charRisticDB.loaded === false) {
            this.risticToolTip = null;
            return null;
        }
        const toolTipName = HtmlMakerToolTipMgr.MakeUniqueName(this.RisticWordsFormName, `risticUI`);
        const toolTipFind = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipFind !== null)
            return null;
        HtmlMakerToolTipMgr.Add(toolTipName);
        const toolTipNew = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipNew !== null) {
            this.risticToolTip = toolTipNew;
            const uiLabelText = `関連語 ${this.charRisticDB.skillMap.size}`;
            const table = await this.makeRisticTable();
            this.makeRisticActions();
            toolTipNew.name = toolTipName;
            //toolTipNew.InvisibleAll()
            toolTipNew.VisibleMgrBtn(false);
            toolTipNew.VisibleActBtn(false);
            toolTipNew.SetTitle(uiLabelText + ``);
            toolTipNew.SetTable(table, this.risticCssText());
            const keys = new Array;
            keys.push(this.wdCssName());
            this.risticStartRow = this.charRisticDB.sort(toolTipNew.Table, this.pxCssName(), keys, true);
            for (const row of toolTipNew.Table.rows) {
                this.visibleMap.set(row.rowIndex, true);
            }
            this.makeIndexCtl(toolTipNew);
            this.makeBookmarkCtl(toolTipNew);
            const cpMenu = toolTipNew.cpMenu;
            cpMenu.SetType(HtmlMakerDialogB2Types.CopyPaste, this.onRisticCopyPaste);
            cpMenu.SetDlgInfo(toolTipNew.dlg, HtmlMakerToolTipMgr.TopElement());
            cpMenu.EnableEvent();
            toolTipNew.onChangedTableSelection = this.onRisticChanged;
            toolTipNew.onButtonClicked = this.onRisticButtonClick;
            toolTipNew.onCheckChanged = this.onRisticCheckChanged;
            //toolTipNew.closeType = HtmlMakerToolTipCloseTypes.InVisible
            toolTipNew.MgrType = HtmlMakerToolTipMgrTypes.NotMgr;
            toolTipNew.heightPx = `400`;
            toolTipNew.applyCss();
            toolTipNew.Show(document.body);
            toolTipNew.SetVisible(false);
            toolTipNew.EnableEvents();
            toolTipNew.EnableMouseUp(this.onRisticTableMouseUp);
            toolTipNew.EnableLongTap(this.onRisticTableLongTap);
            const selectionNames = [this.wdCssName()];
            toolTipNew.EnableSelection(this.onRisticTableSelection, selectionNames);
            toolTipNew.EnableFirstVisible(this.onRisticTableOnFirstVisible);
            toolTipNew.EnableTableWatch(this.onRisticTableNotifyWatched);
        }
        return toolTipNew;
    }
}
//# sourceMappingURL=RisticWords.js.map
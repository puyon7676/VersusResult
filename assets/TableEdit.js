import { ImporterMap } from "./SiteImporter.js";
import { CharStatusClassifyTypes, CharStatusNameTypes } from "./CharClass.js";
import { HtmlMaker, HtmlMakerItem, HtmlMakerTable, HtmlMakerKeyEnterTypes } from "./HtmlMaker.js";
import { HtmlMakerDialogDesc, HtmlDialogInfo, HtmlZindexHelper } from "./HtmlMaker.js";
import { HtmlMakerOptionCombo, HtmlMakerOptionInput, HtmlMakerOptionCheck } from "./HtmlMaker.js";
import { HtmlMakerUpDown, HtmlMakerNumPad, HtmlMakerEventTypes, HtmlMakerKeyEventTypes } from "./HtmlMaker.js";
import { HtmlMakerInputEdit, HtmlMakerInputEditTypes, HtmlMakerInputEditValueTypes } from "./HtmlMaker.js";
import { HtmlMakerCommonCss } from "./HtmlMaker.js";
import { HtmlMakerDialogB2Types, HtmlMakerDialogB4Types } from "./HtmlMaker.js";
import { HtmlMakerCopyPasteTypes } from "./HtmlMaker.js";
import { EvonaMessageBox, MessageBoxResultTypes } from "./MessageBox.js";
import { TimerHelper } from "./TimerHelper.js";
import { getLogAccessInstance, LogTypes } from "./JsStoreHelper.js";
export const EditorTypes = {
    Resource: "Resource", //文字列リソースエディタ
    ScoreUI: "ScoreUI", //ScoreUI
    GameUI: "GameUI", //GameUI
};
export const ScoreEditSelectTypes = {
    Sequence: "Sequence", //連続タイプ
    Text: "Text", //文字列タイプ
};
export class EditItem {
    key = ``;
    text = ``;
    static copy(from, to) {
        to.key = from.key;
        to.text = from.text;
    }
}
export class ResourceEditItem extends EditItem {
    comment = ``;
    static copy(from, to) {
        to.key = from.key;
        to.text = from.text;
        to.comment = from.comment;
    }
}
export class ScoreEditItem extends EditItem {
    selectType = ScoreEditSelectTypes.Sequence;
    start = ``; //連続タイプの場合：開始
    end = ``; //連続タイプの場合：終了
    step = ``; //連続タイプの場合：ステップ
    keyValue = ``; //文字列タイプの場合：key/valueを","で区切った文字列
    static copy(from, to) {
        to.key = from.key;
        to.text = from.text;
        to.selectType = from.selectType;
        to.start = from.start;
        to.end = from.end;
        to.step = from.step;
        to.keyValue = from.keyValue;
    }
    get isScoreAvail() {
        if (this.key.trim().length === 0)
            return false;
        if (this.text.trim().length === 0)
            return false;
        if (this.selectType === ScoreEditSelectTypes.Sequence) {
            if (this.start.trim().length === 0)
                return false;
            if (this.end.trim().length === 0)
                return false;
            if (this.step.trim().length === 0)
                return false;
        }
        else {
            if (this.keyValue.trim().length === 0)
                return false;
        }
        return true;
    }
}
export class GameEditItem extends EditItem {
    formation = ``;
    nsEnable = false;
    nsCombo = ``;
    nsScore = ``;
    gameEnable = false;
    gameCombo = ``;
    gameScore = ``;
    static copy(from, to) {
        to.key = from.key;
        to.text = from.text;
        to.formation = from.formation;
        to.nsEnable = `${from.nsEnable}` === `` ? false : true;
        to.nsCombo = from.nsCombo;
        to.nsScore = from.nsScore;
        to.gameEnable = `${from.gameEnable}` === `` ? false : true;
        to.gameCombo = from.gameCombo;
        to.gameScore = from.gameScore;
    }
    get nsComboAvail() {
        if (this.nsEnable === false)
            return 0;
        if (this.nsCombo.trim().length === 0)
            return 0;
        if (this.nsScore.trim().length === 0)
            return 0;
        return parseInt(this.nsCombo.trim());
    }
    get gameComboAvail() {
        if (this.gameEnable === false)
            return 0;
        if (this.gameCombo.trim().length === 0)
            return 0;
        if (this.gameScore.trim().length === 0)
            return 0;
        return parseInt(this.gameCombo.trim());
    }
    get nsComboScoreList() {
        let comboAvail = this.nsComboAvail;
        if (comboAvail === 0)
            return new Map;
        return this.toScoreMap(this.nsScore, comboAvail);
    }
    get gameComboScoreList() {
        let comboAvail = this.gameComboAvail;
        if (comboAvail === 0)
            return new Map;
        return this.toScoreMap(this.gameScore, comboAvail);
    }
    toScoreMap(scoreListText, comboAvail) {
        const resMap = new Map;
        const split = scoreListText.split(`,`);
        if (split.length === 0)
            return resMap;
        for (const scoreText of split) {
            if (scoreText.trim().length === 0)
                continue;
            const score = parseInt(scoreText);
            resMap.set(comboAvail, score);
            comboAvail++;
        }
        return resMap;
    }
}
export function resourceEditorConfig() {
    const resLogToItem = (logInst, tableEditSet) => {
        const resLog = logInst;
        for (const item of resLog.inst) {
            const resItem = new ResourceEditItem();
            ResourceEditItem.copy(item, resItem);
            const tableItem = new TableEditItem();
            tableItem.resItem = resItem;
            tableItem.owner = tableEditSet;
            tableEditSet.itemList.push(tableItem);
        }
    };
    return {
        gameType: CharStatusClassifyTypes.none,
        editorType: EditorTypes.Resource,
        logType: LogTypes.ResourceEditAction,
        fromJsonText: ResourceEditActionLog.fromJsonText,
        logToItem: resLogToItem
    };
}
export function gameEditorConfig() {
    const gameLogToItem = (logInst, tableEditSet) => {
        const resLog = logInst;
        for (const item of resLog.inst) {
            const gameItem = new GameEditItem();
            GameEditItem.copy(item, gameItem);
            const tableItem = new TableEditItem();
            tableItem.gameItem = gameItem;
            tableItem.owner = tableEditSet;
            tableEditSet.itemList.push(tableItem);
        }
    };
    return {
        gameType: CharStatusClassifyTypes.none,
        editorType: EditorTypes.GameUI,
        logType: LogTypes.GameEditAction,
        fromJsonText: GameEditActionLog.fromJsonText,
        logToItem: gameLogToItem
    };
}
export function scoreEditorConfig(gameType) {
    const scLogToItem = (logInst, tableEditSet) => {
        const scLog = logInst;
        if (scLog.gameType !== gameType)
            return;
        for (const item of scLog.inst) {
            const scItem = new ScoreEditItem();
            ScoreEditItem.copy(item, scItem);
            const tableItem = new TableEditItem();
            tableItem.scItem = scItem;
            tableItem.owner = tableEditSet;
            tableEditSet.itemList.push(tableItem);
        }
    };
    return {
        gameType: gameType,
        editorType: EditorTypes.ScoreUI,
        logType: LogTypes.ScoreEditAction,
        fromJsonText: ScoreEditActionLog.fromJsonText,
        logToItem: scLogToItem
    };
}
export class TableEditItem {
    resItem = new ResourceEditItem();
    gameItem = new GameEditItem();
    scItem = new ScoreEditItem();
    owner;
}
export class TableEditSet {
    gameType = CharStatusClassifyTypes.none;
    itemList = new Array;
    initNumItems = 10;
    editorConfig;
    setConfig(config) {
        if (config === undefined)
            return;
        this.editorConfig = config;
        this.gameType = config.gameType;
    }
    async loadGameConfig(gameType) {
        this.setConfig(gameEditorConfig());
        await this.load(EditorTypes.GameUI, gameType);
        const match = this.itemList.filter(item => item.gameItem.key === gameType);
        if (match.length === 0)
            return undefined;
        if (match[0].gameItem.key !== gameType)
            return undefined;
        return match[0].gameItem;
    }
    setDefaultGameConfig() {
        this.init();
        let rowIndex = 0;
        for (const [key, importer] of ImporterMap) {
            const gi = this.itemList[rowIndex].gameItem;
            gi.key = importer.gm;
            gi.text = importer.displayText;
            gi.formation = `5`;
            rowIndex++;
        }
    }
    init() {
        this.itemList = new Array;
        for (let row = 0; row < this.initNumItems; row++) {
            const item = new TableEditItem();
            item.owner = this;
            this.itemList.push(item);
        }
    }
    async load(editorType, gameType) {
        const editor = this.getEditor(editorType);
        if (editor === undefined)
            return;
        const logType = editor.logType;
        const logInst = await getLogAccessInstance();
        const logs = await logInst.get(logType);
        if (logs === null) {
            if (editorType === EditorTypes.GameUI) {
                this.setDefaultGameConfig();
            }
            return;
        }
        const uuid = logType; //ログへの追加は単一なのでlogTypeをuuidとして扱う
        const useLogMap = new Map();
        const notUseLogMap = new Array();
        this.usingLog(uuid, logs, useLogMap, notUseLogMap);
        this.itemList = new Array;
        for (const [uuid, rec] of useLogMap) {
            const logInst = editor.fromJsonText(rec.log);
            editor.logToItem(logInst, this);
        }
        if (this.itemList.length === 0) {
            this.init();
        }
        if (editorType === EditorTypes.GameUI) {
            let rowIndex = 0;
            for (const [key, importer] of ImporterMap) {
                if (rowIndex >= this.itemList.length) {
                    console.error(`invalid saved log`);
                    break;
                }
                if (this.itemList[rowIndex].gameItem.key.length === 0) {
                    const gi = this.itemList[rowIndex].gameItem;
                    gi.key = importer.gm;
                    gi.text = importer.displayText;
                    gi.formation = `5`;
                }
                rowIndex++;
            }
        }
    }
    async loadUnused(logType) {
        const logInst = await getLogAccessInstance();
        const logs = await logInst.get(logType);
        if (logs === null)
            return null;
        const useLogMap = new Map();
        const unUseLogMap = new Array();
        this.usingLog(logType, logs, useLogMap, unUseLogMap);
        return unUseLogMap;
    }
    usingLog(uuid, logs, useLogMap, unUseLogArray) {
        if (this.editorConfig === undefined)
            return;
        for (const rec of logs) {
            //const logInst = this.actEditor.fromJsonText(rec.log)
            const logInst = this.editorConfig.fromJsonText(rec.log);
            let actionType = logInst.logType;
            let valid = false;
            let isDelete = false;
            switch (actionType) {
                case TableEditActionLogTypes.None:
                    break;
                case TableEditActionLogTypes.Add:
                    valid = true; //常に追加したキャラが有効
                    break;
                case TableEditActionLogTypes.Update:
                    valid = true; //更新内容を有効にする
                    break;
                case TableEditActionLogTypes.Delete:
                    valid = true; //過去の追加・更新の有無は関係なく削除は有効
                    isDelete = true;
                    break;
            }
            if (!valid)
                continue;
            if (!isDelete) {
                if (useLogMap.has(uuid)) {
                    const notUse = useLogMap.get(uuid);
                    unUseLogArray.push(notUse);
                    useLogMap.delete(uuid);
                }
                useLogMap.set(uuid, rec);
            }
            else {
                if (useLogMap.has(uuid)) {
                    const notUse = useLogMap.get(uuid);
                    unUseLogArray.push(notUse);
                    useLogMap.delete(uuid);
                }
            }
        }
    }
    getEditor(editorType) {
        return this.editorConfig;
    }
    get editorType() { return this.editorConfig?.editorType; }
}
export class TableEditConfig {
    gameType = CharStatusClassifyTypes.none;
    editItems;
    makeLog;
    onSelect;
    getCssText;
}
export function makeResourceTableEditConfig() {
    function itemKeyCssClassName() {
        return `${tableCssClassName()}-key`;
    }
    function itemDispCssClassName() {
        return `${tableCssClassName()}-text`;
    }
    function itemCommentCssClassName() {
        return `${tableCssClassName()}-comment`;
    }
    function itemDeleteCssClassName() {
        return `${tableCssClassName()}-delete`;
    }
    function tableCssClassName() {
        return `${EditorTypes.Resource}-edit-table-row`;
    }
    const setColKey = (cellIndex, item, rowIndex, table) => {
        const key = new HtmlMakerOptionInput();
        key.value = item.resItem.key;
        key.placeholder = `キー`;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(key);
        table.getCell(cellIndex, rowIndex).className = itemKeyCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    };
    const setColValue = (cellIndex, item, rowIndex, table) => {
        const text = new HtmlMakerOptionInput();
        text.value = item.resItem.text;
        text.placeholder = `文字列`;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(text);
        table.getCell(cellIndex, rowIndex).className = itemDispCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    };
    const setColComment = (cellIndex, item, rowIndex, table) => {
        const comment = new HtmlMakerOptionInput();
        comment.value = item.resItem.comment;
        comment.placeholder = `コメント`;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(comment);
        table.getCell(cellIndex, rowIndex).className = itemCommentCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    };
    const setColDelBtn = (cellIndex, item, rowIndex, table) => {
        table.getCell(cellIndex, rowIndex).typeInfo.setButton(`削除`);
        table.getCell(cellIndex, rowIndex).className = itemDeleteCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    };
    const makeResLog = async (gameType, table, rows) => {
        const log = new ResourceEditActionLog();
        log.logType = TableEditActionLogTypes.Add;
        for (const row of rows) {
            const logRow = new ResourceEditItem();
            for (const col of row.cells) {
                for (const elem of col.children) {
                    if (elem.className === itemDeleteCssClassName())
                        continue;
                    const value = table.getElemValue(elem) || ``;
                    //console.log(`[${elem.className}] [${value}]`)
                    switch (elem.className) {
                        case itemKeyCssClassName():
                            logRow.key = value;
                            break;
                        case itemDispCssClassName():
                            logRow.text = value;
                            break;
                        case itemCommentCssClassName():
                            logRow.comment = value;
                            break;
                    }
                }
            }
            log.inst.push(logRow);
        }
        const jsonText = ResourceEditActionLog.toJsonText(log);
        const logInst = await getLogAccessInstance();
        await logInst.put(LogTypes.ResourceEditAction, jsonText);
    };
    const onSelect = async (evArgs, tableEdit) => {
        console.log(`classify = ${evArgs.classify} targetId = ${evArgs.targetId}`);
        switch (evArgs.classify) {
            case itemDeleteCssClassName():
                const msgbox = new EvonaMessageBox;
                msgbox.setParent(tableEdit.dlgCssClassName());
                let res = MessageBoxResultTypes.None;
                msgbox.setYesNo();
                res = await msgbox.showWait(`${evArgs.targetId} を削除しますか？`);
                switch (res) {
                    case MessageBoxResultTypes.Yes:
                        break;
                    case MessageBoxResultTypes.No:
                        return;
                    case MessageBoxResultTypes.Cancel:
                        return;
                }
                const rowIndex = parseInt(evArgs.targetId);
                if (rowIndex >= 1) {
                    tableEdit.table.deleteRow(rowIndex);
                    tableEdit.table.redimAllRows();
                    tableEdit.itemList.splice(rowIndex - tableEdit.table.firstRowIndex, 1);
                }
                break;
        }
    };
    function getCssText() {
        return `
.${itemKeyCssClassName()} {
height: 90%;
}
.${itemDispCssClassName()} {
height: 90%;
}
.${itemCommentCssClassName()} {
height: 90%;
}
.${itemDeleteCssClassName()} {
${itemDeleteBtnCssText()}
}
`.trim();
    }
    const config = new TableEditConfig();
    config.editItems = [
        { className: itemKeyCssClassName(), colConfig: setColKey },
        { className: itemDispCssClassName(), colConfig: setColValue },
        { className: itemCommentCssClassName(), colConfig: setColComment },
        { className: itemDeleteCssClassName(), colConfig: setColDelBtn },
    ];
    config.makeLog = makeResLog;
    config.onSelect = onSelect;
    config.getCssText = getCssText;
    return config;
}
export function makeScoreTableEditConfig() {
    function itemKeyCssClassName() {
        return `${tableCssClassName()}-key`;
    }
    function itemDispCssClassName() {
        return `${tableCssClassName()}-text`;
    }
    function itemSelectTypeCssClassName() {
        return `${tableCssClassName()}-select-type`;
    }
    function itemSeqTypeStartCssClassName() {
        return `${tableCssClassName()}-seq-type-start`;
    }
    function itemSeqTypeEndCssClassName() {
        return `${tableCssClassName()}-seq-type-end`;
    }
    function itemSeqTypeStepCssClassName() {
        return `${tableCssClassName()}-seq-type-step`;
    }
    function itemTextTypeCssClassName() {
        return `${tableCssClassName()}-text-type`;
    }
    function itemDeleteCssClassName() {
        return `${tableCssClassName()}-delete`;
    }
    function tableCssClassName() {
        return `${EditorTypes.ScoreUI}-edit-table`;
    }
    function getCssText() {
        return `
.${itemKeyCssClassName()} {
height: 90%;
}
.${itemDispCssClassName()} {
height: 90%;
}
.${itemSelectTypeCssClassName()} {
height: 106%;
}
.${itemSeqTypeStartCssClassName()} {
width: 60px;
height: 90%;
}
.${itemSeqTypeEndCssClassName()} {
width: 60px;
height: 90%;
}
.${itemSeqTypeStepCssClassName()} {
width: 60px;
height: 90%;
}
.${itemTextTypeCssClassName()} {
height: 90%;
}
.${itemDeleteCssClassName()} {
${itemDeleteBtnCssText()}
}
`.trim();
    }
    const setColKey = (cellIndex, item, rowIndex, table) => {
        const key = new HtmlMakerOptionInput();
        key.value = item.scItem.key;
        key.placeholder = `キー`;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(key);
        table.getCell(cellIndex, rowIndex).className = itemKeyCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    };
    const setColValue = (cellIndex, item, rowIndex, table) => {
        const text = new HtmlMakerOptionInput();
        text.value = item.scItem.text;
        text.placeholder = `文字列`;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(text);
        table.getCell(cellIndex, rowIndex).className = itemDispCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    };
    //選択肢タイプ
    const setColSelectType = (cellIndex, item, rowIndex, table) => {
        const combo = new HtmlMakerOptionCombo();
        combo.selectionPair = [`連続/${ScoreEditSelectTypes.Sequence}`, `文字列/${ScoreEditSelectTypes.Text}`];
        combo.selectedItem = item.scItem.selectType;
        combo.classify = `selectType`;
        table.getCell(cellIndex, rowIndex).typeInfo.setCombo(combo);
        table.getCell(cellIndex, rowIndex).className = itemSelectTypeCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    };
    //連続タイプの場合：開始
    const setColSelectStart = (cellIndex, item, rowIndex, table) => {
        const start = new HtmlMakerOptionInput();
        start.value = item.scItem.start;
        start.placeholder = `開始`;
        start.disableKeyDown = true;
        start.enableClicked = true;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(start);
        table.getCell(cellIndex, rowIndex).className = itemSeqTypeStartCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    };
    //連続タイプの場合：終了
    const setColSelectEnd = (cellIndex, item, rowIndex, table) => {
        const end = new HtmlMakerOptionInput();
        end.value = item.scItem.end;
        end.placeholder = `終了`;
        end.disableKeyDown = true;
        end.enableClicked = true;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(end);
        table.getCell(cellIndex, rowIndex).className = itemSeqTypeEndCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    };
    //連続タイプの場合：ステップ
    const setColSelectStep = (cellIndex, item, rowIndex, table) => {
        const step = new HtmlMakerOptionInput();
        step.value = item.scItem.step;
        step.placeholder = `ステップ`;
        step.disableKeyDown = true;
        step.enableClicked = true;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(step);
        table.getCell(cellIndex, rowIndex).className = itemSeqTypeStepCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    };
    //文字列タイプの場合：key/valueを","で区切った文字列
    const setColText = (cellIndex, item, rowIndex, table) => {
        const textType = new HtmlMakerOptionInput();
        textType.value = item.scItem.keyValue;
        textType.placeholder = `key/valueを&quot;,&quot;で区切った文字列`;
        textType.disableKeyDown = true;
        textType.enableClicked = true;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(textType);
        table.getCell(cellIndex, rowIndex).className = itemTextTypeCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    };
    //削除ボタン (少し警戒色を入れたボタン)
    const setColDelBtn = (cellIndex, item, rowIndex, table) => {
        table.getCell(cellIndex, rowIndex).typeInfo.setButton(`削除`);
        table.getCell(cellIndex, rowIndex).className = itemDeleteCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    };
    const makeScoreLog = async (gameType, table, rows) => {
        const log = new ScoreEditActionLog();
        log.logType = TableEditActionLogTypes.Add;
        log.gameType = gameType;
        for (const row of rows) {
            const logRow = new ScoreEditItem();
            for (const col of row.cells) {
                for (const elem of col.children) {
                    if (elem.className === itemDeleteCssClassName())
                        continue;
                    const value = table.getElemValue(elem) || ``;
                    //console.log(`[${elem.className}] [${value}]`)
                    switch (elem.className) {
                        case itemKeyCssClassName():
                            logRow.key = value;
                            break;
                        case itemDispCssClassName():
                            logRow.text = value;
                            break;
                        case itemSelectTypeCssClassName():
                            logRow.selectType = value;
                            break;
                        case itemSeqTypeStartCssClassName():
                            logRow.start = value;
                            break;
                        case itemSeqTypeEndCssClassName():
                            logRow.end = value;
                            break;
                        case itemSeqTypeStepCssClassName():
                            logRow.step = value;
                            break;
                        case itemTextTypeCssClassName():
                            logRow.keyValue = value;
                            break;
                    }
                }
            }
            log.inst.push(logRow);
        }
        const jsonText = ScoreEditActionLog.toJsonText(log);
        const logInst = await getLogAccessInstance();
        await logInst.put(LogTypes.ScoreEditAction, jsonText);
    };
    const onSelect = async (evArgs, tableEdit) => {
        console.log(`classify = ${evArgs.classify} targetId = ${evArgs.targetId}`);
        switch (evArgs.classify) {
            case itemKeyCssClassName():
                await tableEdit.showUpDn(evArgs, statusPair());
                break;
            case itemSeqTypeStartCssClassName():
                //console.log(`Keydown = ${evArgs.Keydown} KeyEnter = ${evArgs.KeyEnter}`)
                await tableEdit.showUpDn(evArgs, seqPair());
                break;
            case itemSeqTypeEndCssClassName():
                await tableEdit.showUpDn(evArgs, seqPair());
                break;
            case itemSeqTypeStepCssClassName():
                await tableEdit.showUpDn(evArgs, seqPair());
                break;
            case itemTextTypeCssClassName():
                await tableEdit.showMiniTableEditor(evArgs, HtmlMakerInputEditTypes.KeyValue, HtmlMakerInputEditValueTypes.asNumber, `スコアキー`, `スコア値`);
                break;
            case itemDeleteCssClassName():
                const msgbox = new EvonaMessageBox;
                msgbox.setParent(tableEdit.dlgCssClassName());
                let res = MessageBoxResultTypes.None;
                msgbox.setYesNo();
                res = await msgbox.showWait(`${evArgs.targetId} を削除しますか？`);
                switch (res) {
                    case MessageBoxResultTypes.Yes:
                        break;
                    case MessageBoxResultTypes.No:
                        return;
                    case MessageBoxResultTypes.Cancel:
                        return;
                }
                const rowIndex = parseInt(evArgs.targetId);
                if (rowIndex >= 1) {
                    tableEdit.table.deleteRow(rowIndex);
                    tableEdit.table.redimAllRows();
                    tableEdit.itemList.splice(rowIndex - tableEdit.table.firstRowIndex, 1);
                }
                break;
        }
    };
    const config = new TableEditConfig();
    config.editItems = [
        { className: itemKeyCssClassName(), colConfig: setColKey },
        { className: itemDispCssClassName(), colConfig: setColValue },
        //{ className: itemCommentCssClassName(),  colConfig: setColComment },
        { className: itemSelectTypeCssClassName(), colConfig: setColSelectType },
        { className: itemSeqTypeStartCssClassName(), colConfig: setColSelectStart },
        { className: itemSeqTypeEndCssClassName(), colConfig: setColSelectEnd },
        { className: itemSeqTypeStepCssClassName(), colConfig: setColSelectStep },
        { className: itemTextTypeCssClassName(), colConfig: setColText },
        { className: itemDeleteCssClassName(), colConfig: setColDelBtn },
    ];
    config.makeLog = makeScoreLog;
    config.onSelect = onSelect;
    config.getCssText = getCssText;
    return config;
}
export function makeGameTableEditConfig() {
    function itemNameCssClassName() {
        return `${tableCssClassName()}-name`;
    }
    function itemFormationCssClassName() {
        return `${tableCssClassName()}-form`;
    }
    function itemNsEnableCssClassName() {
        return `${tableCssClassName()}-ns-enable`;
    }
    function itemNsComboCssClassName() {
        return `${tableCssClassName()}-ns-combo`;
    }
    function itemNsScoreCssClassName() {
        return `${tableCssClassName()}-ns-score`;
    }
    function itemGameEnableCssClassName() {
        return `${tableCssClassName()}-game-enable`;
    }
    function itemGameComboCssClassName() {
        return `${tableCssClassName()}-game-combo`;
    }
    function itemGameScoreCssClassName() {
        return `${tableCssClassName()}-game-score`;
    }
    function tableCssClassName() {
        return `${EditorTypes.GameUI}-edit-table`;
    }
    const setColName = (cellIndex, item, rowIndex, table) => {
        const name = new HtmlMakerOptionInput();
        name.value = item.gameItem.text;
        name.placeholder = `ゲーム名`;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(name);
        table.getCell(cellIndex, rowIndex).className = itemNameCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    };
    const setColForm = (cellIndex, item, rowIndex, table) => {
        const form = new HtmlMakerOptionInput();
        form.value = item.gameItem.formation;
        form.placeholder = `編成数`;
        form.disableKeyDown = true;
        form.enableClicked = true;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(form);
        table.getCell(cellIndex, rowIndex).className = itemFormationCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    };
    const setColNsEnable = (cellIndex, item, rowIndex, table) => {
        const ns = new HtmlMakerOptionCheck();
        ns.value = item.gameItem.nsEnable;
        ns.placeholder = `NS有効`;
        table.getCell(cellIndex, rowIndex).typeInfo.setCheck(ns);
        table.getCell(cellIndex, rowIndex).className = itemNsEnableCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        table.getCell(cellIndex, rowIndex).typeInfo.toolTip = `N<br>S`;
    };
    const setColNsCombo = (cellIndex, item, rowIndex, table) => {
        const ns = new HtmlMakerOptionInput();
        ns.value = item.gameItem.nsCombo;
        ns.placeholder = `コンボ数`;
        ns.disableKeyDown = true;
        ns.enableClicked = true;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(ns);
        table.getCell(cellIndex, rowIndex).className = itemNsComboCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        table.getCell(cellIndex, rowIndex).typeInfo.toolTip = `NSコンボ数`;
    };
    const setColNsScore = (cellIndex, item, rowIndex, table) => {
        const ns = new HtmlMakerOptionInput();
        ns.value = item.gameItem.nsScore;
        ns.placeholder = `NSコンボ加点`;
        ns.disableKeyDown = true;
        ns.enableClicked = true;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(ns);
        table.getCell(cellIndex, rowIndex).className = itemNsScoreCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        table.getCell(cellIndex, rowIndex).typeInfo.toolTip = `NSコンボ加点\n(コンボ数毎の加点を,で区切って入力)`;
    };
    const setColGameEnable = (cellIndex, item, rowIndex, table) => {
        const text = new HtmlMakerOptionCheck();
        text.value = item.gameItem.gameEnable;
        text.placeholder = `GM有効`;
        table.getCell(cellIndex, rowIndex).typeInfo.setCheck(text);
        table.getCell(cellIndex, rowIndex).className = itemGameEnableCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        table.getCell(cellIndex, rowIndex).typeInfo.toolTip = `G<br>M`;
    };
    const setColGameCombo = (cellIndex, item, rowIndex, table) => {
        const game = new HtmlMakerOptionInput();
        game.value = item.gameItem.gameCombo;
        game.placeholder = `コンボ数`;
        game.disableKeyDown = true;
        game.enableClicked = true;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(game);
        table.getCell(cellIndex, rowIndex).className = itemGameComboCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        table.getCell(cellIndex, rowIndex).typeInfo.toolTip = `GMコンボ数`;
    };
    const setColGameScore = (cellIndex, item, rowIndex, table) => {
        const game = new HtmlMakerOptionInput();
        game.value = item.gameItem.gameScore;
        game.placeholder = `GMコンボ加点`;
        game.disableKeyDown = true;
        game.enableClicked = true;
        table.getCell(cellIndex, rowIndex).typeInfo.setInput(game);
        table.getCell(cellIndex, rowIndex).className = itemGameScoreCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        table.getCell(cellIndex, rowIndex).typeInfo.toolTip = `GMコンボ加点\n(コンボ数毎の加点を,で区切って入力)`;
    };
    const makeGameLog = async (gameType, table, rows) => {
        const log = new GameEditActionLog();
        log.logType = TableEditActionLogTypes.Add;
        const importerArray = Array.from(ImporterMap.values());
        let rowIndex = 0;
        for (const row of rows) {
            const logRow = new GameEditItem();
            for (const col of row.cells) {
                for (const elem of col.children) {
                    const value = table.getElemValue(elem) || ``;
                    const orgElem = table.findInputElem(elem);
                    //console.log(`[${elem.className}] [${orgElem!.className}] [${value}]`)
                    switch (orgElem.className) {
                        case itemNameCssClassName():
                            logRow.text = value;
                            break;
                        case itemFormationCssClassName():
                            logRow.formation = value;
                            break;
                        case itemNsEnableCssClassName():
                            logRow.nsEnable = value;
                            break;
                        case itemNsComboCssClassName():
                            logRow.nsCombo = value;
                            break;
                        case itemNsScoreCssClassName():
                            logRow.nsScore = value;
                            break;
                        case itemGameEnableCssClassName():
                            logRow.gameEnable = value;
                            break;
                        case itemGameComboCssClassName():
                            logRow.gameCombo = value;
                            break;
                        case itemGameScoreCssClassName():
                            logRow.gameScore = value;
                            break;
                    }
                }
            }
            logRow.key = importerArray[rowIndex].gm;
            rowIndex++;
            console.log(logRow);
            log.inst.push(logRow);
        }
        const jsonText = GameEditActionLog.toJsonText(log);
        const logInst = await getLogAccessInstance();
        await logInst.put(LogTypes.GameEditAction, jsonText);
    };
    const onSelect = async (evArgs, tableEdit) => {
        console.log(`classify = ${evArgs.classify} targetId = ${evArgs.targetId}`);
        switch (evArgs.classify) {
            case itemFormationCssClassName():
                await tableEdit.showNumpad(evArgs, 1);
                break;
            case itemNsComboCssClassName():
                await tableEdit.showNumpad(evArgs, 1);
                break;
            case itemNsScoreCssClassName():
                await tableEdit.showMiniTableEditor(evArgs, HtmlMakerInputEditTypes.Text, HtmlMakerInputEditValueTypes.asNumber, ``, `NSコンボ加点`);
                break;
            case itemGameComboCssClassName():
                await tableEdit.showNumpad(evArgs, 1);
                break;
            case itemGameScoreCssClassName():
                await tableEdit.showMiniTableEditor(evArgs, HtmlMakerInputEditTypes.Text, HtmlMakerInputEditValueTypes.asNumber, ``, `ゲームコンボ加点`);
                break;
        }
    };
    function getCssText() {
        const nsCssName = `${itemNsEnableCssClassName()}`;
        const gameCssName = `${itemGameEnableCssClassName()}`;
        return `
.${itemNameCssClassName()} {
height: 90%;
width: 100px;
}
.${itemFormationCssClassName()} {
height: 90%;
width: 40px;
}

.${nsCssName} {
height: 90%;
}
${HtmlMakerCommonCss.sliderText(nsCssName, `65`)}
.${itemNsComboCssClassName()} {
height: 90%;
width: 40px;
}
.${itemNsScoreCssClassName()} {
height: 90%;
width: 100px;
}

.${gameCssName} {
height: 90%;
}
${HtmlMakerCommonCss.sliderText(gameCssName, `65`)}
.${itemGameComboCssClassName()} {
height: 90%;
width: 40px;
}
.${itemGameScoreCssClassName()} {
height: 90%;
width: 100px;
}
`.trim();
    }
    const config = new TableEditConfig();
    config.editItems = [
        { className: itemNameCssClassName(), colConfig: setColName },
        { className: itemFormationCssClassName(), colConfig: setColForm },
        { className: itemNsEnableCssClassName(), colConfig: setColNsEnable },
        { className: itemNsComboCssClassName(), colConfig: setColNsCombo },
        { className: itemNsScoreCssClassName(), colConfig: setColNsScore },
        { className: itemGameEnableCssClassName(), colConfig: setColGameEnable },
        { className: itemGameComboCssClassName(), colConfig: setColGameCombo },
        { className: itemGameScoreCssClassName(), colConfig: setColGameScore },
    ];
    config.makeLog = makeGameLog;
    config.onSelect = onSelect;
    config.getCssText = getCssText;
    return config;
}
function itemDeleteBtnCssText() {
    return `
width: 100%;
height: 100%;
white-space: nowrap;
background: #e91e63; /* ピンクがかった赤（ポップな警告色） */
color: white;
border-radius: 4px;
padding: 4px 12px;
`.trim();
}
function statusPair() {
    const types = Object.values(CharStatusNameTypes);
    const pair = new Array;
    for (const type of types) {
        const lvText = type;
        pair.push(`${lvText}/${lvText}`);
    }
    return pair;
}
function seqPair() {
    //選択肢
    const pair = new Array;
    pair.push(`1/1`);
    for (let lv = 1; lv <= 30; lv++) {
        const lvText = `${lv * 10}`;
        pair.push(`${lvText}/${lvText}`);
    }
    return pair;
}
export class TableEdit extends TableEditSet {
    uiInfo = new HtmlDialogInfo;
    canAdd = true;
    onSaved;
    requestActivate;
    htmlMaker;
    parentName = "";
    table;
    saveTimer = null;
    async startAutoSave() {
        this.saveTimer = new TimerHelper();
        this.saveTimer.intervalMs = 1000;
        this.saveTimer.isOneShot = false;
        this.saveTimer.start(this, this.onAutoSave);
    }
    onAutoSave = async (arg) => {
        const resEdit = arg;
        console.log(`${resEdit.parentName}`);
        /*
        if (this.saveTimer !== null) {
            if (!this.saveTimer.isOneShot) {
                this.saveTimer.start(this, this.onSave)
            }
        }
        return true
        */
        return false;
    };
    setRow(teItem, rowIndex, table) {
        //const actEditItems = this.editItems
        const actEditItems = this.config.editItems;
        if (actEditItems === undefined)
            return;
        let cellIndex = -1;
        for (const act of actEditItems) {
            cellIndex++;
            act.colConfig(cellIndex, teItem, rowIndex, table);
        }
    }
    config;
    toHTML(config) {
        if (!this.itemList)
            return "";
        config.gameType = this.gameType;
        this.config = config;
        const editItems = config.editItems;
        const nCol = editItems.length;
        const table = new HtmlMakerTable();
        if (this.itemList.length >= 1) {
            // 4列 × 保存キャラ数 の次元を作成
            table.makeDim(nCol, this.itemList.length);
            this.itemList.forEach((item, rowIndex) => {
                this.setRow(item, rowIndex, table);
            });
            //行テンプレート初期化
            table.makeRowTemplate(this.tableRowCssClassName());
            this.table = table;
        }
        else {
            // 4列 × 1行 の次元を作成
            table.makeDim(nCol, 1);
            const item = new TableEditItem;
            this.setRow(item, 0, table);
            //行テンプレート初期化
            table.makeRowTemplate(this.tableRowCssClassName());
            table.clearRows();
            this.table = table;
        }
        // スクロール可能なHTMLとして出力
        const tableName = this.tableCssClassName();
        const tableHTML = this.table.ToScrollHTML(tableName, tableName);
        //イベントリスナーへの接続
        this.htmlMaker = new HtmlMaker;
        const item = new HtmlMakerItem;
        item.props.name = ``;
        item.props.id = tableName;
        item.props.className = tableName;
        item.props.option.setTable(tableHTML);
        item.props.option.onSelect = async (evArgs) => {
            console.log(`classify = ${evArgs.classify} targetId = ${evArgs.targetId}`);
            /*
            const rcOwn = this.htmlMaker.GetRect(evArgs.parentElem!.parentElement!.parentElement!.parentElement!.parentElement!.parentElement!)
            console.log(`[OWNER] ${rcOwn.left}, ${rcOwn.top}`)
            const rcTbl = this.htmlMaker.GetRect(evArgs.parentElem!.parentElement!.parentElement!.parentElement!)
            console.log(`[TABLE] ${rcTbl.left}, ${rcTbl.top}`)
            const rcTbody = this.htmlMaker.GetRect(evArgs.parentElem!.parentElement!.parentElement!)
            console.log(`[TBODY] ${rcTbody.left}, ${rcTbody.top}`)
            const rcRow = this.htmlMaker.GetRect(evArgs.parentElem!.parentElement!)
            console.log(`[TROW] ${rcRow.left}, ${rcRow.top}`)
            */
            this.config.onSelect(evArgs, this);
        };
        this.htmlMaker.add(item);
        return this.htmlMaker.ToHTML();
    }
    checkValidStatus(statusKey) {
        const types = Object.values(CharStatusNameTypes);
        const match = types.find(type => statusKey);
        return match !== undefined ? true : false;
    }
    updn = null;
    async showUpDn(evArgs, pair) {
        const canMiniEdit = evArgs.KeyEnter === HtmlMakerKeyEnterTypes.Special ||
            evArgs.eventType === HtmlMakerEventTypes.Click;
        if (canMiniEdit) {
            if (this.updn !== null)
                return;
            const rcCol = this.table.getScrollCellRect(evArgs.parentElem);
            //呼び出し元セル名
            const callerName = this.table.makeCallerName(evArgs.classify, evArgs.targetId);
            const callerElem = this.table.getCallerCellElem(callerName);
            let callerText = ``;
            if (callerElem !== null) {
                const inputElem = callerElem;
                callerText = inputElem.value;
            }
            const updn = new HtmlMakerUpDown();
            updn.setListener(`updn`, this.dlgContentCssClassName(), callerName);
            updn.setSelectedByValue(callerText, pair);
            updn.applyCss();
            updn.show(rcCol.left, rcCol.top);
            updn.enableEvents(
            /*onApply*/
            (ev) => {
                console.log(`[onApply] ${ev.callerName} ${ev.result}`);
                const notifyElem = this.table.getCallerCellElem(ev.callerName);
                if (notifyElem !== null) {
                    const inputElem = notifyElem;
                    inputElem.value = ev.result;
                }
                this.closeUpDn();
            }, 
            /*onUp*/
            (ev) => {
                console.log(`[onUp] ${ev.callerName} ${ev.result}`);
            }, 
            /*onDown*/
            (ev) => {
                console.log(`[onDown] ${ev.callerName} ${ev.result}`);
            });
            this.enableWindowEvent();
            this.updn = updn;
        }
    }
    closeUpDn() {
        this.disableWindowEvent();
        if (this.updn === null)
            return;
        this.updn.dispose();
        this.updn = null;
    }
    numpad = null;
    async showNumpad(evArgs, digLen) {
        const canNumpad = evArgs.KeyEnter === HtmlMakerKeyEnterTypes.Special ||
            evArgs.eventType === HtmlMakerEventTypes.Click;
        if (canNumpad) {
            if (this.numpad !== null)
                return;
            const rcCol = this.table.getScrollCellRect(evArgs.parentElem);
            //呼び出し元セル名
            const callerName = this.table.makeCallerName(evArgs.classify, evArgs.targetId);
            const callerElem = this.table.getCallerCellElem(callerName);
            let callerText = ``;
            if (callerElem !== null) {
                const inputElem = callerElem;
                callerText = inputElem.value;
            }
            const numpad = new HtmlMakerNumPad();
            numpad.setNum(callerText);
            numpad.maxDig = digLen;
            numpad.setListener(`numpad`, this.dlgContentCssClassName(), callerName);
            numpad.applyCss();
            numpad.show(rcCol.left, rcCol.top);
            numpad.enableEvents(
            /*onApply*/
            (ev) => {
                console.log(`[onApply] ${ev.callerName} ${ev.result}`);
                const notifyElem = this.table.getCallerCellElem(ev.callerName);
                if (notifyElem !== null) {
                    const inputElem = notifyElem;
                    inputElem.value = ev.result;
                }
                this.closeNumpad();
            });
            this.enableWindowEvent();
            this.numpad = numpad;
            this.setB2Allow(false);
        }
    }
    closeNumpad() {
        this.disableWindowEvent();
        this.setB2Allow(true);
        if (this.numpad === null)
            return;
        this.numpad.dispose();
        this.numpad = null;
    }
    miniEdit = null;
    numTableFooterName = `numTableFooter`;
    async showMiniTableEditor(evArgs, editType, valueType, keyToolTip, valueToolTip) {
        const canMiniEdit = evArgs.KeyEnter === HtmlMakerKeyEnterTypes.Special ||
            evArgs.eventType === HtmlMakerEventTypes.Click;
        if (canMiniEdit) {
            if (this.miniEdit !== null)
                return;
            const rcCol = this.table.getScrollCellRect(evArgs.parentElem);
            //呼び出し元セル名
            const callerName = this.table.makeCallerName(evArgs.classify, evArgs.targetId);
            const callerElem = this.table.getCallerCellElem(callerName);
            let callerText = ``;
            if (callerElem !== null) {
                const inputElem = callerElem;
                callerText = inputElem.value;
            }
            const numTableName = `${callerName}-numTable`;
            const footerName = `${this.numTableFooterName}-${callerName}`;
            const miniEdit = new HtmlMakerInputEdit();
            if (editType === HtmlMakerInputEditTypes.KeyValue) {
                miniEdit.setKeyValuePairs(callerText);
            }
            else {
                miniEdit.setTexts(callerText);
            }
            miniEdit.setValueType(5, valueType);
            miniEdit.keyToolTip = keyToolTip;
            miniEdit.valueToolTip = valueToolTip;
            miniEdit.setListener(numTableName, this.dlgContentCssClassName(), callerName, ``, footerName);
            miniEdit.applyCss();
            miniEdit.show(rcCol.left, rcCol.top);
            miniEdit.enableEvents(
            /*onApply*/
            (ev) => {
                console.log(`[onApply] ${ev.callerName} ${ev.result}`);
                /*
                const notifyElem = this.table.getCallerCellElem(ev.callerName)
                if (notifyElem !== null) {
                    const inputElem = notifyElem as HTMLInputElement
                    inputElem.value = ev.result
                }
                this.closeNumTable()
                */
            });
            this.miniEdit = miniEdit;
            if (this.miniEdit.footerElem !== null) {
                let btns = `
<button id="${footerName}-okBtn">OK</button>
<button id="${footerName}-canBtn">CANCEL</button>
`.trim();
                this.miniEdit.footerElem.innerHTML = btns;
                //キャラ変更：OK
                document.getElementById(`${footerName}-okBtn`).onclick = this.onOkClickNumTable;
                //キャラ変更：CANCEL
                document.getElementById(`${footerName}-canBtn`).onclick = this.onCancelClickNumTable;
            }
            this.enableWindowEvent();
            this.setB2Allow(false);
        }
    }
    closeNumTable() {
        this.disableWindowEvent();
        this.setB2Allow(true);
        if (this.miniEdit === null)
            return;
        this.miniEdit.dispose();
        this.miniEdit = null;
    }
    onOkClickNumTable = async (event) => {
        //選択結果セット
        if (this.miniEdit !== null) {
            const res = this.miniEdit.editedResult();
            if (res !== undefined) {
                const callerElem = this.table.getCallerCellElem(this.miniEdit.callerName);
                if (callerElem !== null) {
                    const inputElem = callerElem;
                    inputElem.value = res;
                }
            }
        }
        this.closeNumTable();
    };
    onCancelClickNumTable = async (event) => {
        this.closeNumTable();
    };
    createEditorBox(title, parentName, resHTML) {
        this.parentName = parentName;
        let addBtn = ``;
        if (this.canAdd) {
            addBtn = `<button id="${this.rowAddCssClassName()}">追加</button>`;
        }
        const buttonsHTML = this.htmlMaker.MakeDefaultButtonsHTML(`
${addBtn}
<button id="${this.applyCssClassName()}">保存</button>
`);
        const dlgHTML = `<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
   ${buttonsHTML}
   ${resHTML}
</div>`;
        const dialogDesc = new HtmlMakerDialogDesc();
        dialogDesc.title = "<" + title + ">";
        dialogDesc.SetB2Type(HtmlMakerDialogB2Types.CopyPaste, this.onCopyPaste);
        dialogDesc.SetB4Type(HtmlMakerDialogB4Types.DialogHide);
        const dlg = dialogDesc.NewDialog(parentName, this.dlgCssClassName());
        dialogDesc.SetContent(parentName, dlgHTML, false);
        this.applyCss();
        dialogDesc.EnableEventHandlers();
        dialogDesc.onMoveDone = this.moverOnMoveDone;
        this.dialogDesc = dialogDesc;
        return dlg;
    }
    addEventHandlers(dlg) {
        //文字列リソース追加
        const addElem = document.getElementById(this.rowAddCssClassName());
        if (addElem !== null) {
            addElem.onclick = async () => {
                const conf = await this.confirmMsgBox(`行を追加しますか？`);
                if (conf === false)
                    return;
                const rowName = this.tableRowCssClassName();
                const rowIndex = this.table.addRow(rowName);
            };
        }
        //保存
        document.getElementById(this.applyCssClassName()).onclick = async () => {
            const conf = await this.confirmMsgBox(`保存しますか？`);
            if (conf === false)
                return;
            const rows = this.table.getRowElems();
            if (rows === null)
                return;
            await this.config.makeLog(this.config.gameType, this.table, rows);
            if (this.onSaved !== undefined) {
                await this.onSaved(this);
            }
        };
    }
    isEnableWindowEvent = false;
    enableWindowEvent() {
        if (this.isEnableWindowEvent)
            return false;
        this.isEnableWindowEvent = true;
        window.addEventListener('keydown', this.onWindowKeyboard);
        return true;
    }
    disableWindowEvent() {
        if (!this.isEnableWindowEvent)
            return false;
        window.removeEventListener('keydown', this.onWindowKeyboard);
        this.isEnableWindowEvent = false;
        return true;
    }
    onWindowKeyboard = (e) => {
        //console.log(`${e.target}::${e.key}`)
        const ke = e;
        switch (ke.key) {
            case HtmlMakerKeyEventTypes.Escape:
                if (this.isEnableWindowEvent) {
                    this.disableWindowEvent();
                    this.closeUpDn();
                    this.closeNumpad();
                }
                break;
        }
    };
    addItemEventHandlers() {
        //クリック有効化
        this.htmlMaker.enableTableEvents(this.tableCssClassName());
    }
    moverOnMoveDone = async (dlg) => {
        console.log(`[${dlg.className}] moved`);
        const zindexHelper = new HtmlZindexHelper();
        zindexHelper.SaveSetting(dlg);
        if (this.requestActivate !== undefined) {
            await this.requestActivate(dlg);
        }
    };
    dialogDesc;
    resizerOnResizeDone = async (dlg, deltaW, deltaH) => {
        console.log(`[${dlg.className}] resized (${deltaW}, ${deltaH})`);
        const dw = parseInt(deltaW);
        const dh = parseInt(deltaH);
        const dlgContent = document.getElementById(this.dlgContentCssClassName());
        if (dlgContent !== null) {
            const px = dlgContent.style.width === `` ? dlgContent.offsetWidth : parseInt(dlgContent.style.width);
            dlgContent.style.maxWidth = `none`;
            //dlgContent.style.width = `${px + dw}px`   //←これがあると、初期状態でスクロールバーが付いていないとリサイズで幅がわずかに大きくなる
            const py = dlgContent.style.height === `` ? dlgContent.offsetHeight : parseInt(dlgContent.style.height);
            dlgContent.style.maxHeight = `none`;
            dlgContent.style.height = `${py + dh}px`;
            const dlgTable = dlgContent.querySelectorAll(`.${this.tableCssClassName()}`);
            if (dlgTable !== null) {
                const divTable = dlgTable[0];
                const py = divTable.style.height === `` ? divTable.offsetHeight : parseInt(divTable.style.height);
                divTable.style.maxHeight = `none`;
                divTable.style.height = `${py + dh}px`;
            }
        }
    };
    enableResize() {
        this.dialogDesc.onResizeDone = this.resizerOnResizeDone;
        this.dialogDesc.EnableResize();
    }
    onCopyPaste = async (dlg, cpType) => {
        console.log(`[${dlg.className}] selected [${cpType}]`);
        switch (cpType) {
            case HtmlMakerCopyPasteTypes.Copy:
                await this.table.toClipboard();
                break;
            case HtmlMakerCopyPasteTypes.Paste:
                await this.table.fromClipboard();
                break;
            default:
                break;
        }
    };
    setB2Allow(isAllow = true) {
        this.dialogDesc.setB2Allow(isAllow);
    }
    async confirmMsgBox(msg) {
        const msgbox = new EvonaMessageBox;
        msgbox.setParent(this.dlgCssClassName());
        let res = MessageBoxResultTypes.None;
        msgbox.setYesNo();
        res = await msgbox.showWait(msg);
        switch (res) {
            case MessageBoxResultTypes.Yes:
                break;
            case MessageBoxResultTypes.No:
                return false;
            case MessageBoxResultTypes.Cancel:
                return false;
        }
        return true;
    }
    rowAddCssClassName() {
        return `${this.editorType}-edit-add`;
    }
    applyCssClassName() {
        return `${this.editorType}-edit-apply`;
    }
    tableRowCssClassName() {
        return `${this.editorType}-edit-table-row`;
    }
    tableCssClassName() {
        return `${this.editorType}-edit-table`;
    }
    dlgContentCssClassName() {
        return `${this.dlgCssClassName()}-content`;
    }
    dlgCssClassName() {
        return `${this.editorType}-edit-dlg`;
    }
    applyCss() {
        const leftPos = parseInt(this.uiInfo.left);
        const topPos = parseInt(this.uiInfo.top);
        const height = this.uiInfo.height !== `` ? parseInt(this.uiInfo.height) : 400;
        const tableCssName = this.tableCssClassName();
        const style = document.createElement("style");
        style.textContent =
            `
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName, leftPos, topPos)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgContentCssClassName()} {
width: 100%;
max-width: 640px;
margin: 0 0;    /*左上位置固定*/
}
${this.table.MakeTableScrollCss(tableCssName, height, true)}
.${tableCssName} {
${HtmlMakerCommonCss.spacingTable}
}
.${tableCssName} tr {
${HtmlMakerCommonCss.spacingTr}
}
${this.config.getCssText()}
${this.htmlMaker.MakeDefaultButtonsCss()}

/*ミニエディタのボタン*/
[class^="${this.numTableFooterName}"] {
${HtmlMakerCommonCss.footerText()}
}
[class^="${this.numTableFooterName}"] button {
${HtmlMakerCommonCss.footerButtonText()}
}
`.trim();
        document.head.appendChild(style);
        const dlgParent = document.getElementById(this.parentName);
        this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`, dlgParent);
    }
}
export const TableEditActionLogTypes = {
    None: "None",
    Add: "Add",
    Delete: "Delete",
    Update: "Update",
};
export class TableEditActionLog {
    logType = TableEditActionLogTypes.None;
}
export class ResourceEditActionLog extends TableEditActionLog {
    inst = new Array;
    static toJsonText(log) {
        return JSON.stringify(log, null, 2);
    }
    static fromJsonText(jsonText) {
        const resJson = JSON.parse(jsonText);
        return resJson;
    }
}
export class GameEditActionLog extends TableEditActionLog {
    inst = new Array;
    static toJsonText(log) {
        return JSON.stringify(log, null, 2);
    }
    static fromJsonText(jsonText) {
        const resJson = JSON.parse(jsonText);
        return resJson;
    }
}
export class ScoreEditActionLog extends TableEditActionLog {
    gameType = CharStatusClassifyTypes.none;
    inst = new Array;
    static toJsonText(log) {
        return JSON.stringify(log, null, 2);
    }
    static fromJsonText(jsonText) {
        const resJson = JSON.parse(jsonText);
        return resJson;
    }
}
//# sourceMappingURL=TableEdit.js.map
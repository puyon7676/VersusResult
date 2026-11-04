import { CharNameSpaceTypes, } from "./CharClass.js";
import { HtmlMakerCommonCss } from "./HtmlMaker.js";
import { HtmlMakerTable } from "./HtmlMaker.js";
import { HtmlMakerOptionRadio, HtmlMakerOptionItemSelectTypes } from "./HtmlMaker.js";
import { HtmlMakerToolTipMgr, HtmlMakerToolTipMgrTypes } from "./HtmlMaker.js";
export class FilterOption {
    nsDefines;
    comboKwRows;
    chListUI;
    playerForm;
    filterUiName = `FilterOption`;
    filterToolTip = null;
    async makeFilterToolTip(formName, formTitle, dlgElem) {
        const toolTipName = HtmlMakerToolTipMgr.MakeUniqueName(formName, `optionUI`);
        const toolTipFind = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipFind !== null)
            return null;
        HtmlMakerToolTipMgr.Add(toolTipName);
        const toolTipNew = HtmlMakerToolTipMgr.FindBy(toolTipName);
        if (toolTipNew !== null) {
            const table = await this.makeFilterTable();
            toolTipNew.name = toolTipName;
            toolTipNew.InvisibleAll();
            toolTipNew.SetTitle(formTitle + `：オプション`);
            toolTipNew.SetTable(table, this.filterCssText());
            toolTipNew.onChangedTableSelection = this.onOptionChanged;
            //toolTipNew.closeType = HtmlMakerToolTipCloseTypes.InVisible
            toolTipNew.MgrType = HtmlMakerToolTipMgrTypes.NotMgr;
            toolTipNew.heightPx = `250`;
            toolTipNew.applyCss();
            toolTipNew.Show(dlgElem.className);
            toolTipNew.SetVisible(true);
            toolTipNew.EnableEvents();
        }
        this.filterUiName = formName;
        this.filterToolTip = toolTipNew;
        return toolTipNew;
    }
    setTableRowRadio(cellIndex, rowIndex, title, opt, table, titleCssClassName, optCssClassName) {
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
    onOptionChanged = async (classify, selectedKey, selectedValue, changed) => {
        if (this.filterToolTip === null)
            return;
        if (classify.includes(`ns`)) {
            console.log(`onPlayerOptionChanged::radio(ns)`, classify, selectedKey, selectedValue, changed);
            this.filterToolTip.SetTableValue(classify, selectedKey, selectedValue, changed);
            let nNone1 = 0;
            const ns1NoneCells = new Array;
            for (const cell of this.ns1Cells) {
                if (cell.typeInfo.using.radio.selectedItem === CharNameSpaceTypes.None)
                    nNone1++;
                else
                    ns1NoneCells.push(cell);
            }
            let nNone2 = 0;
            const ns2NoneCells = new Array;
            for (const cell of this.ns2Cells) {
                if (cell.typeInfo.using.radio.selectedItem === CharNameSpaceTypes.None)
                    nNone2++;
                else
                    ns2NoneCells.push(cell);
            }
            let nsCells = new Array;
            if (ns1NoneCells.length === 0) {
                nsCells.push(this.ns1Cells[0]);
            }
            else {
                nsCells = nsCells.concat(ns1NoneCells);
            }
            if (ns2NoneCells.length === 0) {
                nsCells.push(this.ns2Cells[0]);
            }
            else {
                nsCells = nsCells.concat(ns2NoneCells);
            }
            if (this.chListUI !== undefined)
                await this.chListUI.onNsOptionChanged(nsCells);
            if (this.playerForm !== undefined)
                await this.playerForm.onNsOptionChanged(nsCells);
        }
        else if (classify.includes(`gm`)) {
            console.log(`onPlayerOptionChanged::radio(gm)`, classify, selectedKey, selectedValue, changed);
            this.filterToolTip.SetTableValue(classify, selectedKey, selectedValue, changed);
            //console.log(gmCells)
            if (this.chListUI !== undefined)
                await this.chListUI.onGmOptionChanged(this.gmCells);
            if (this.playerForm !== undefined)
                await this.playerForm.onGmOptionChanged(this.gmCells);
        }
        else {
            console.log(`onPlayerOptionChanged::radio(*bug*)`, classify, selectedKey, selectedValue, changed);
        }
    };
    ns1Cells = new Array;
    ns2Cells = new Array;
    gmCells = new Array;
    makeFilterTable() {
        //NSフィルタ行数
        const nNs = 1 + this.nsDefines.length;
        let nNsInRow = 6;
        let nRowNs = 0;
        if (1 + this.nsDefines.length > 6) {
            nNsInRow = ((nNs % 2) !== 0) ? Math.floor(nNs / 2) + 1 : Math.floor(nNs / 2);
            nRowNs = 2;
        }
        else {
            nRowNs = ((nNs % nNsInRow) !== 0) ? Math.floor(nNs / nNsInRow) + 1 : Math.floor(nNs / nNsInRow);
        }
        //テーブル作成
        const nCol = 2;
        const nRow = nRowNs * 2 + this.comboKwRows.length;
        const table = new HtmlMakerTable();
        table.makeDim(nCol, nRow);
        //NSフィルタの選択肢
        let rowIndex = 0;
        let iNsIndex = -1;
        for (let iRowNs = 0; iRowNs < nRowNs; iRowNs++) {
            let nsPairs = new Array;
            let nRemain = nNsInRow;
            if (iRowNs === 0) {
                nsPairs.push(`なし/${CharNameSpaceTypes.None}`);
                nRemain--;
            }
            for (let iNs = 0; iNs < nRemain; iNs++) {
                iNsIndex++;
                if (iNsIndex >= nNs - 1)
                    break;
                const nsDef = this.nsDefines[iNsIndex];
                nsPairs.push(`${[nsDef.nsName]}/${nsDef.ns}`);
            }
            const nsOpt1 = new HtmlMakerOptionRadio();
            nsOpt1.selectionPair = nsPairs;
            nsOpt1.selectedItem = CharNameSpaceTypes.None; //parseSources[0].ns
            nsOpt1.classify = `optionUI-opt-ns1`;
            const nsOpt2 = new HtmlMakerOptionRadio();
            nsOpt2.selectionPair = nsPairs;
            nsOpt2.selectedItem = CharNameSpaceTypes.None; //parseSources[0].ns
            nsOpt2.classify = `optionUI-opt-ns2`;
            const titleText1 = iRowNs === 0 ? `NSフィルタ1` : `　　　　　`;
            const ns1Cell = this.setTableRowRadio(0, iRowNs, titleText1, nsOpt1, table, this.itemNameCssClassName(), this.ns1CssClassName());
            this.ns1Cells.push(ns1Cell);
            const titleText2 = iRowNs === 0 ? `NSフィルタ2` : `　　　　　`;
            const ns2Cell = this.setTableRowRadio(0, nRowNs + iRowNs, titleText2, nsOpt2, table, this.itemNameCssClassName(), this.ns2CssClassName());
            this.ns2Cells.push(ns2Cell);
        }
        rowIndex = nRowNs * 2;
        //const srcSelectedItems = [`1`, `2`, `4`]
        const srcSelectedItems = new Array;
        let gmRowIndex = rowIndex - 1;
        let gmItemIndex = -1;
        for (const comboRow of this.comboKwRows) {
            gmRowIndex++;
            //GMフィルタの選択肢：行ごとに選択状態を持っている
            const gmPairs = new Array;
            const rowSelectedItems = new Array;
            for (const comboKw of comboRow) {
                gmItemIndex++;
                gmPairs.push(`${comboKw}/${gmItemIndex}`);
                const findText = `${gmItemIndex}`;
                if (srcSelectedItems.find(item => item === findText) !== undefined)
                    rowSelectedItems.push(findText);
            }
            const gmOpt1 = new HtmlMakerOptionRadio();
            gmOpt1.selectionPair = gmPairs;
            gmOpt1.selectedItems = rowSelectedItems;
            gmOpt1.selectType = HtmlMakerOptionItemSelectTypes.Multi;
            gmOpt1.classify = `optionUI-opt-gm1`;
            //カラム定義
            const titleText = gmRowIndex === rowIndex ? `GMフィルタ` : `　　　　　`;
            const gmCell = this.setTableRowRadio(0, gmRowIndex, titleText, gmOpt1, table, this.itemNameCssClassName(), this.gm1CssClassName());
            this.gmCells.push(gmCell);
        }
        return table;
    }
    filterCssText() {
        // 2つのフィルタのクラス名（または識別文字列）をあらかじめ取得
        const ns1 = this.ns1CssClassName();
        const ns2 = this.ns2CssClassName();
        const gm1 = this.gm1CssClassName();
        const marker = HtmlMakerCommonCss.radioBackClassMark;
        const activeText = HtmlMakerCommonCss.radioActiveKeyText;
        return `
/* タイトル */
[class*="${this.itemNameCssClassName()}"] {
white-space: nowrap;
}
/* ========================================================
右側のセルの箱（td、またはその中のdivコンテナ）のOR指定
======================================================== */
[id*="${ns1}${marker}"], 
[id*="${ns2}${marker}"],
[id*="${gm1}${marker}"] {
${HtmlMakerCommonCss.radioBackCssText}
/*width: 96%;*/           /* 親のツールチップの幅いっぱいに広げる */
}

/* ========================================================
各選択肢ボタンそれぞれの法律（OR指定で均等分配）
======================================================== */
[id*="${ns1}"], 
[id*="${ns2}"],
[id*="${gm1}"] {
${HtmlMakerCommonCss.radioNormCssText}
}

/* ========================================================
現在選択されているアイテム（is-active）が光る法律のOR指定
======================================================== */
[id*="${ns1}"].${activeText}, 
[id*="${ns2}"].${activeText},
[id*="${gm1}"].${activeText} {
${HtmlMakerCommonCss.radioActCssText}
}
`.trim();
    }
    tableRowCssClassName() {
        return `${this.filterUiName}-row`;
    }
    itemNameCssClassName() {
        return `${this.filterUiName}-title`;
    }
    ns1CssClassName() {
        return `${this.filterUiName}-ns1`;
    }
    ns2CssClassName() {
        return `${this.filterUiName}-ns2`;
    }
    gm1CssClassName() {
        return `${this.filterUiName}-gm1`;
    }
}
//# sourceMappingURL=FilterOption.js.map
export const HtmlMakerEventTypes = {
    Unknown: "Unknown",
    KeyDown: "KeyDown",
    Click: "Click",
};
export class HtmlMakerEvent {
    eventType = HtmlMakerEventTypes.Unknown;
    parentElem = null;
    item;
    cancel = false;
    targetId = ""; //combo:識別
    classify = ""; //combo:クラス
    selectedValue = ""; //combo:選択結果
    Keydown = ""; //input:キー入力
    KeyEnter = HtmlMakerKeyEnterTypes.None; //input:キー入力
}
export const HtmlMakerCtlEventTypes = {
    Unknown: "Unknown",
    Ok: "Ok",
    Cancel: "Cancel",
};
export class HtmlMakerCtlEvent {
    callerName = ``;
    result = ``;
    classify = HtmlMakerCtlEventTypes.Unknown; //イベント識別
    notify;
}
export class HtmlMakerRect {
    parentElem = null;
    left = "";
    top = "";
    width = "";
    height = "";
}
export const HtmlMakerKeyEventTypes = {
    Enter: "Enter",
    Escape: "Escape",
    Tab: "Tab",
    Process: "Process",
};
export const HtmlMakerKeyEnterTypes = {
    None: "None",
    Normal: "Normal",
    Special: "Special",
};
export const HtmlMakerOptionItemUsingTypes = {
    Unknown: "Unknown",
    Btn: "Btn",
    Chk: "Chk",
    Img: "Img",
    Label: "Label",
    LabelRO: "LabelRO",
    Combo: "Combo",
    Radio: "Radio",
    Input: "Input",
    TextArea: "TextArea",
    Plain: "Plain",
    Table: "Table",
    LowerTable: "LowerTable",
};
export const HtmlMakerOptionItemSelectTypes = {
    Single: "Single",
    Multi: "Multi",
};
export class HtmlMakerConst {
    static toolTipNewLine = `\n`;
}
export class HtmlMakerCssSliderParams {
    movingPx = `20`; /*つまみの移動量*/
    textWidthPx = `20`; /*タイトルの幅*/
    textAlign = `center`; /*タイトルの幅寄せ*/
}
export class HtmlMakerCommonCss {
    static width = "16px";
    static offColor = "#fff176";
    static onColor = "#fbc02d";
    static normBkColor = "#f5ecc6";
    static btnBkColor = "#f7d98f";
    /** テキスト選択有効 */
    static get textEnableText() {
        return `
-webkit-user-select: text;   /* テキスト選択を有効(iOS Safari用) */
user-select: text;           /* テキスト選択を有効 */
`.trim();
    }
    static get textDisableText() {
        return `
-webkit-user-select: none;   /* テキスト選択を禁止(iOS Safari用) */
user-select: none;           /* テキスト選択を禁止 */
touch-action: none;          /* ブラウザ独自のスクロールやズームを無効化 */
`.trim();
    }
    /** ダイアログタイトル全般 */
    static get titleColorText() {
        return `
background: linear-gradient(to bottom, ${this.offColor}, ${this.onColor}); /* Win風グラデ */
color: #000000;

${this.textDisableText}

white-space: nowrap;         /* 改行を禁止 */
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`.trim();
    }
    /** ダイアログ背景全般 */
    static get dlgBkColorText() {
        return `
 background-color: #f7eb86e6;
 border: 2px solid #2c3e50;
`.trim();
    }
    /** box-shadow: 右へのズレ 下へのズレ ぼかし具合 影の広がり 影の色 */
    static get borderShadowText() {
        return `
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3); /* ほんのり黒い影 */
border-radius: 4px; /* 角を少し丸くすると、影と馴染みます（任意） */
`.trim();
    }
    /** スクロールバー */
    static get scrollBarText() {
        return `
&::-webkit-scrollbar { width: ${this.width}; }
&::-webkit-scrollbar-track { background: ${this.normBkColor}; border-radius: 10px; }
&::-webkit-scrollbar-thumb {
 background: #eeee52;
 border-radius: 10px;
 border: 1px solid #3b3a03;
}
&::-webkit-scrollbar-thumb:hover { background: ${this.onColor}; }
`.trim();
    }
    static getTableCssText(tableName, height) {
        const spacingTable = this.spacingTable;
        const spacingTr = this.spacingTr;
        return `
.${tableName} {
width: 100%;            /* テーブル全体を親要素いっぱいに広げる */
table-layout: fixed;    /* これが重要！これで td の％指定が絶対になります */
height: ${height}px;    /* ダイアログに合わせた固定高 */
overflow-y: auto;
${this.scrollBarText}
${spacingTable}
}
.${tableName} tr {
background-color: #f5f5dc; /* ベージュ */
${spacingTr}
}
.${tableName} td {
background-color: #f5f5dc; /* ベージュ */
  padding: 0;           /* 上下の余白を完全にゼロにする */
  border-top: none;     /* 上の線を消す */
  border-bottom: none;  /* 下の線を消す */
  line-height: 2;       /* 文字の上下の隙間をなくす */
}
`.trim();
    }
    /** TABLEの隙間を無くす */
    static get spacingTable() {
        return `border-collapse: collapse; border-spacing: 0;`;
    }
    /** TABLE/TRの隙間を無くす */
    static get spacingTr() {
        return `background: ${this.normBkColor};`;
    }
    /** スライドスイッチ */
    static sliderText(sliderCssName, widthPx, sliderParam = new HtmlMakerCssSliderParams()) {
        return `
/* スイッチ全体のレイアウト */
.${sliderCssName}-container {
  display: flex;
  align-items: center;
  gap: 10px 0px;
  padding: 2px 0px 5px 2px;
width: ${widthPx}px;
}
/* スイッチのタイトル */
.${sliderCssName}-label {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}
/* 本物のチェックボックスは透明にして重ねる */
.${sliderCssName} {
  opacity: 0;
  width: 0;
  height: 0;
}
/* スライダーの溝（レール） */
.${sliderCssName}-slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: ${this.offColor};
  transition: .3s;
  border-radius: 17px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.4); /* 内側に影を入れて立体感を出す */
}
/* 動くツマミ部分 */
.${sliderCssName}-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background: linear-gradient(to bottom, #fff, #ccc); /* グラデーションで金属感 */
  transition: .3s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
/* 【魔法】ONになった時の変化 */
.${sliderCssName}:checked + .${sliderCssName}-slider {
  background-color: ${this.onColor};
}
.${sliderCssName}:checked + .${sliderCssName}-slider:before {
  transform: translateX(${sliderParam.movingPx}px); /* ツマミが右に滑る */
}
/* ラベルテキストの装飾 */
.${sliderCssName}-text {
  font-size: 0.75rem;
  color: black;
  user-select: none;
  width: ${sliderParam.textWidthPx}px;
  text-align: ${sliderParam.textAlign};
}
`.trim();
    }
    /** 標準ボタン */
    static stdButtonText() {
        return `
text-align: center;
background: ${this.btnBkColor};
color: black;
//width: 100%; height: 100%;
border: 1px solid #4d4949;
border-radius: 3px;
cursor: pointer;
transition: background 0.2s;
`.trim();
    }
    /** フッターのボタン */
    static footerButtonText() {
        return `
background: ${this.btnBkColor};
color: black;
border: 1px solid #4d4949;
border-radius: 3px;
cursor: pointer;
transition: background 0.2s;
`.trim();
    }
    /** フッター背景 */
    static footerText() {
        return `
display: flex;
gap: unset;
padding: ${this.footerPadding}px;
justify-content: flex-end;
  background-color: ${this.DefaultYellowColor};
  border: 1px solid #b4b107;
`.trim();
    }
    /** フッター余白 */
    static get footerPadding() { return 4; }
    /** SPANスタイル */
    static spanCssText(fontSizeEm, isWrap) {
        let wrapText = ``;
        if (isWrap) {
            wrapText = `
overflow: hidden;
`;
        }
        return `
background-color: #f5f5dc; /* ベージュ */
color: #4b0082;       /* インディゴ/紫 */
font-weight: bold;
${fontSizeEm}
text-align: right;
padding-right: 8px;
border: 1px solid #f5f5dc; /* 境界線 */

/* 内容が溢れても折り返さない、あるいは省略する設定 */
white-space: nowrap;
text-overflow: ellipsis;
${wrapText}
`;
    }
    /** Radioスタイル(背景) */
    static get radioBackCssText() {
        return `
display: flex;           /* 5つの選択肢を綺麗に横一列に整列！ */
gap: 4px;                /* ボタンとボタンの間に心地よい隙間をあける */
background: #2c3e50;   /* 外枠にシブいダークカラーを敷く */
padding: 2px;
border-radius: 4px;
`;
    }
    /** Radioスタイル(ノーマル表示) */
    static get radioNormCssText() {
        return `
flex: 1;                /* 5つのボタンの横幅を1ミリの狂いもなく完全均等に分配！ */
text-align: center;
padding: 4px 8px;
background: ${HtmlMakerCommonCss.offColor};
color: black;
cursor: pointer;
border-radius: 3px;
font-size: 14px;
transition: all 0.9s;
`;
    }
    /** Radioスタイル(アクティブ) */
    static get radioActCssText() {
        return `
background: ${HtmlMakerCommonCss.onColor};
color: #000;          /* 文字をクッキリ黒にして視認性MAX！ */
font-weight: bold;
`;
    }
    /** Radioスタイル(背景DIVクラス名に付加するマーカ) */
    static radioBackClassMark = "-divs";
    /** Radioスタイル(選択を表すクラス名に付加するマーカ) */
    static radioActiveKeyText = `is-active`;
    /** UIのコントロールボタン */
    static get ctlHeaderBtnCssText() {
        return `
 background: #9c27b0;
 color: white;
 border: 1px solid #777;
 border-radius: 3px;
 width: 24px;
 height: 24px;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 12px;
 padding-bottom: 4px; /* 下にパディングを入れて、文字を上に押し上げる */
 cursor: pointer;
 transition: background 0.2s;
`.trim();
    }
    static get btnHoverCssText() {
        return `
background: #fbc02d; /* 共通のホバー色 */
`.trim();
    }
    get DefaultBlueColor() {
        return "#86aef7e6";
    }
    static get DefaultYellowColor() {
        return "#f7eb86e6";
    }
    get DefaultBorderColor() {
        return "#2c3e50ff";
    }
}
export class HtmlMakerMisc {
    /** デバイスの判定 */
    static isIPad = /iPad|Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;
    /** タッチ操作ができるかどうか */
    static isTouchDevice = () => {
        return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
    };
    static ToElem(html) {
        const div = document.createElement(`div`);
        if (div === null)
            return null;
        div.innerHTML = html;
        const child = div.firstElementChild;
        div.remove();
        return child;
    }
    static SetVisible(elem, visible = true) {
        if (elem === null)
            return;
        elem.style.display = visible ? `` : `none`;
    }
}
export class HtmlMakerCanvasTool {
    canvas = null;
    ctx = null;
    create2dContext() {
        if (this.ctx !== null)
            return null;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (ctx !== null) {
            this.canvas = canvas;
            this.ctx = ctx;
            return canvas;
        }
        this.dispose();
        return null;
    }
    dispose() {
        if (this.canvas === null)
            return false;
        this.canvas.remove();
        this.canvas = null;
    }
    setFont(fontStyle = "normal 16px 'Yu Gothic', sans-serif") {
        if (this.ctx === null)
            return false;
        //実際にテーブルに適用しているフォントと字体を、ここに100%シンクロさせる
        //this.ctx.font = "bold 16px 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif";
        this.ctx.font = fontStyle;
        return true;
    }
    measureTextWidth(text) {
        if (this.ctx === null)
            return -1;
        const metrics = this.ctx.measureText(text);
        return metrics.width; // ➔ 例：「124.5px」のようなガチの物理サイズが返ってくる！！！
    }
}
export class HtmlMakerOptionImg {
    imgSrc = ""; //遅延ロード有効の場合""セット
    imgFile = ""; //遅延ロード有効の場合画像ファイル名セット
    alt = ""; //<img>代替えテキスト
    lazy = false; //imgElem.loading = 'lazy'を追加する場合true
    marker = new Array; //divタグに追加で付加する文字列配列(data-*="??")
}
export class HtmlMakerOptionCombo {
    selectedItem = "";
    selectionPair = []; //"Title/value"のペア配列
    classify = ""; //コンボボックス識別文字列（同じitem-idを共有しているコンボの識別）
}
export class HtmlMakerOptionRadio {
    selectedItem = ""; //Single の場合に初期選択項目
    selectedItems = []; //Multi  の場合に初期選択項目
    selectionPair = []; //"Title:description/value"のペア配列（:descriptionは指定任意）
    classify = ""; //ラジオボタン識別文字列（同じitem-idを共有しているラジオボタンの識別）
    selectType = HtmlMakerOptionItemSelectTypes.Single;
}
export class HtmlMakerOptionInput {
    type = "text"; //type
    value = ""; //value
    placeholder = ""; //placeholder
    disableKeyDown = false; //keydown時の通常キー無効
    enableClicked = false; //clickイベント有効
}
export class HtmlMakerOptionCheck {
    type = "checkbox"; //type
    value = false; //value
    placeholder = ""; //placeholder
    enableClicked = ""; //clickイベント有効：""=イベント無効、"false"=クリック無効、"true"=クリック無効
}
export class HtmlMakerOptionTextArea {
    value = ""; //value
    placeholder = ""; //placeholder
    enableClicked = ""; //clickイベント有効：""=イベント無効、"false"=クリック無効、"true"=クリック無効
    cols = `20`; //平均的な文字幅による、テキストコントロールの外見上の幅です。
    rows = `2`; //コントロールで見ることが可能なテキストの行数です。
    readonly = false;
    disabled = false;
    wrap = `soft`; //ブラウザーは、入力された値の改行がすべて CR+LF のペアであることを保証しますが、値にそれ以外の改行が追加されることはありません。
    resize = `none`; //テキストエリアの大きさの変更が可能かどうかの制御
    minlength = `0`;
    maxlength = `1000`;
}
export class HtmlMakerTableCellInfo {
    typeInfo = new HtmlMakerOption();
    className = ``;
    tdName = ``;
    ToHTML() {
        let dispTag = ``;
        switch (this.typeInfo.using.itemType) {
            case HtmlMakerOptionItemUsingTypes.Btn:
                dispTag = this.typeInfo.ToButtonHTML(this.className);
                break;
            case HtmlMakerOptionItemUsingTypes.Label:
                dispTag = this.typeInfo.ToLableHTML(this.className);
                break;
            case HtmlMakerOptionItemUsingTypes.LabelRO:
                dispTag = this.typeInfo.ToLableROHTML(this.className);
                break;
            case HtmlMakerOptionItemUsingTypes.Combo:
                dispTag = this.typeInfo.ToComboHTML(this.className);
                break;
            case HtmlMakerOptionItemUsingTypes.Radio:
                dispTag = this.typeInfo.ToRadioHTML(this.className);
                break;
            case HtmlMakerOptionItemUsingTypes.Input:
                dispTag = this.typeInfo.ToInputHTML(this.className);
                break;
            case HtmlMakerOptionItemUsingTypes.Chk:
                dispTag = this.typeInfo.ToCheckHTML(this.className);
                break;
            case HtmlMakerOptionItemUsingTypes.TextArea:
                dispTag = this.typeInfo.ToTextAreaHTML(this.className);
                break;
            case HtmlMakerOptionItemUsingTypes.Img:
                const imgTag = this.typeInfo.ToImgHTML(this.className, this.typeInfo.using.img.alt);
                const ovlayTag = `<div class="overlay" title="${this.typeInfo.toolTip}"></div>`;
                dispTag = `<div class="cell-${this.className}" item-id="${this.typeInfo.using.itemId}">${imgTag}${ovlayTag}</div>`;
                break;
            case HtmlMakerOptionItemUsingTypes.Plain:
                dispTag = this.typeInfo.using.innerHTML;
                break;
        }
        return dispTag;
    }
    copyTo(toInst) {
        toInst.className = this.className;
        toInst.tdName = this.tdName;
        toInst.typeInfo.toolTip = this.typeInfo.toolTip;
        toInst.typeInfo.using.itemType = this.typeInfo.using.itemType;
        toInst.typeInfo.using.label = this.typeInfo.using.label;
        toInst.typeInfo.using.combo = this.typeInfo.using.combo;
        toInst.typeInfo.using.radio = this.typeInfo.using.radio;
        toInst.typeInfo.using.input = this.typeInfo.using.input;
        toInst.typeInfo.using.innerHTML = this.typeInfo.using.innerHTML;
        toInst.typeInfo.using.img = this.typeInfo.using.img;
    }
}
export class HtmlMakerTableCell {
    items = new Array();
    makeItems(nItem = 1) {
        if (this.items.length > 0)
            this.items.splice(0, this.items.length);
        for (let i = 0; i < nItem; i++) {
            const item = new HtmlMakerTableCellInfo();
            this.items.push(item);
        }
    }
    ToHTML() {
        let resHTML = ``;
        for (const item of this.items) {
            const dispTag = item.ToHTML();
            if (dispTag !== ``) {
                if (this.items.length >= 2)
                    resHTML = `${resHTML}<div>${dispTag}</div>`;
                else
                    resHTML = dispTag;
            }
        }
        return resHTML;
    }
}
export class HtmlMakerTableRow {
    rowName = ``;
    cols = new Array();
    makeCols(nCol) {
        if (this.cols.length > 0)
            this.cols.splice(0, this.cols.length);
        for (let i = 0; i < nCol; i++) {
            const cell = new HtmlMakerTableCell();
            cell.makeItems();
            this.cols.push(cell);
        }
    }
    ToHTML() {
        let resHTML = ``;
        for (const col of this.cols) {
            let dispTag = col.ToHTML();
            if (dispTag !== ``) {
                let className = ``;
                let id = ``;
                let colspan = ``;
                if (col.items.length === 1) {
                    const item = col.items[0];
                    const using = item.typeInfo.using;
                    if (using.itemType === HtmlMakerOptionItemUsingTypes.Radio) {
                        colspan = ` colspan="${using.radio.selectionPair.length}"`;
                        if (item.className !== ``) {
                            const name = `"${item.className}${HtmlMakerCommonCss.radioBackClassMark}"`;
                            className = ` className=${name}`;
                            id = ` id=${name}`;
                        }
                    }
                    else {
                        const name = item.tdName !== `` ? item.tdName : item.className;
                        className = ` className=${name}`;
                        id = ` id=${name}`;
                    }
                }
                resHTML = `${resHTML}<td${className}${id}${colspan}>${dispTag}</td>`;
            }
            if (col.items.length === 1 && col.items[0].typeInfo.using.itemType === HtmlMakerOptionItemUsingTypes.LowerTable) {
                //TABLEタグ用のTDを用意
                resHTML = `${resHTML}<td></td>`;
            }
        }
        return resHTML;
    }
    toTemplate() {
        const row = new HtmlMakerTableRow;
        row.rowName = this.rowName;
        for (const col of this.cols) {
            const newCol = new HtmlMakerTableCell;
            newCol.makeItems(col.items.length);
            let index = -1;
            for (const item of col.items) {
                index++;
                const newItem = newCol.items[index];
                newItem.className = item.className;
                newItem.typeInfo.toolTip = item.typeInfo.toolTip;
                newItem.typeInfo.using.itemType = item.typeInfo.using.itemType;
                newItem.typeInfo.using.label = item.typeInfo.using.label;
                newItem.typeInfo.using.combo = item.typeInfo.using.combo;
                newItem.typeInfo.using.radio = item.typeInfo.using.radio;
                newItem.typeInfo.using.input = item.typeInfo.using.input;
                newItem.typeInfo.using.innerHTML = item.typeInfo.using.innerHTML;
                newItem.typeInfo.using.img = item.typeInfo.using.img;
            }
            row.cols.push(newCol);
        }
        return row;
    }
}
export class HtmlMakerTable {
    tableName = ``;
    rows = new Array();
    template = null;
    invalidRowIndex = -1;
    firstRowIndex = 1;
    height = `300`;
    fontSize = `0.9`;
    makeDim(nCol, nRow) {
        if (this.rows.length > 0)
            this.rows.splice(0, this.rows.length);
        for (let i = 0; i < nRow; i++) {
            const row = new HtmlMakerTableRow();
            row.makeCols(nCol);
            this.rows.push(row);
        }
    }
    growCell(colIndex, nItem = 1) {
        const nRow = this.rows.length;
        for (let i = 0; i < nRow; i++) {
            this.rows[i].cols[colIndex].makeItems(nItem);
        }
    }
    getCell(colIndex, rowIndex, itemIndex = 0) {
        return this.rows[rowIndex].cols[colIndex].items[itemIndex];
    }
    ToHTML(className = ``, idName) {
        this.tableName = className;
        let resHTML = ``;
        let rowId = 0; //初期値1～
        for (const row of this.rows) {
            rowId++;
            let dispTag = ``;
            dispTag = row.ToHTML();
            if (dispTag !== ``) {
                const rowClassName = (row.rowName !== ``) ? ` class="${row.rowName}"` : ``;
                resHTML = `${resHTML}<tr ${rowClassName} item-id="${rowId}">${dispTag}</tr>`;
            }
        }
        //if (resHTML !== ``) {
        const cssClassName = (className !== ``) ? ` class="${className}"` : ``;
        const id = (idName !== ``) ? ` id="${idName}"` : ``;
        const itemId = (idName !== ``) ? ` item-id="${idName}"` : ``;
        resHTML = `<table${cssClassName}${id}${itemId}>${resHTML}</table>`;
        //}
        return resHTML;
    }
    ToScrollHTML(className = ``, id) {
        const cssClassName = (className !== ``) ? ` class="${className}"` : ``;
        const itemId = (id !== ``) ? ` item-id="${id}"` : ``;
        return `<div${cssClassName}${itemId}>
${this.ToHTML(className, id)}
</div>`;
    }
    makeRowTemplate(className) {
        if (this.rows.length >= 1) {
            for (const row of this.rows) {
                row.rowName = className;
            }
            this.template = this.rows[0].toTemplate();
        }
    }
    clearRows() {
        this.rows = new Array();
    }
    addRow(className) {
        const table = this.getTable();
        if (table === null)
            return -1;
        return this.addTblRow(table, className);
    }
    addTblRow(table, className) {
        const newRow = table.insertRow(-1);
        const nRow = table.rows.length; //行がない場合「table.rows.length」は「1」みたい
        newRow.className = className;
        newRow.setAttribute(`item-id`, `${nRow}`);
        if (this.template !== null) {
            if (this.template.cols.length >= 1) {
                const template = this.template.toTemplate();
                let rowHTML = ``;
                for (const col of template.cols) {
                    let colHTML = ``;
                    for (const item of col.items) {
                        item.typeInfo.using.itemId = nRow;
                        const dispTag = item.ToHTML();
                        if (dispTag !== ``) {
                            if (col.items.length >= 2)
                                colHTML = `${colHTML}<div>${dispTag}</div>`;
                            else
                                colHTML = dispTag;
                        }
                    }
                    if (colHTML !== ``) {
                        rowHTML = `${rowHTML}<td>${colHTML}</td>`;
                    }
                }
                newRow.innerHTML = rowHTML;
                return nRow;
            }
        }
        return -1;
    }
    deleteRow(rowIndex) {
        const table = this.getTable();
        if (table === null)
            return false;
        return this.deleteTblRow(table, rowIndex);
    }
    deleteTblRow(table, rowIndex) {
        for (const rowElem of table.rows) {
            const rowId = rowElem.getAttribute("item-id");
            if (rowId === null)
                continue;
            if (rowId === `${rowIndex}`) {
                //console.log(`row deleted : ${rowId}`)
                table.deleteRow(rowIndex - this.firstRowIndex);
                return true;
            }
        }
        return false;
    }
    redimAllRows() {
        const table = this.getTable();
        if (table === null)
            return;
        this.redimTblAllRows(table);
    }
    redimTblAllRows(table) {
        let rowIndex = this.firstRowIndex - 1;
        for (const rowElem of table.rows) {
            const rowId = rowElem.getAttribute("item-id");
            if (rowId === null)
                continue;
            rowIndex++;
            rowElem.setAttribute("item-id", `${rowIndex}`);
            for (const cell of rowElem.cells) {
                this.redimElems(cell.children, rowIndex);
            }
        }
    }
    redimElems(elems, rowIndex) {
        for (const itemElem of elems) {
            const itemId = itemElem.getAttribute("item-id");
            if (itemId !== null) {
                itemElem.setAttribute("item-id", `${rowIndex}`);
            }
            if (itemElem.children === undefined)
                continue;
            this.redimElems(itemElem.children, rowIndex);
        }
    }
    selectRow(id) {
        const table = this.getTable();
        if (table === null)
            return;
        if (id <= 0)
            return;
        if (id > table.rows.length)
            return;
        // すでに選択されているものを解除
        for (const rowElem of table.rows) {
            if (rowElem.classList === undefined)
                continue;
            rowElem.classList.remove("selected");
        }
        // 今クリックしたものを選択
        table.rows[id - 1].classList.add("selected");
    }
    getSelectedRow() {
        const table = this.getTable();
        if (table === null)
            return this.invalidRowIndex;
        for (const rowElem of table.rows) {
            if (rowElem.classList === undefined)
                continue;
            if (rowElem.classList.contains("selected")) {
                const rowId = rowElem.getAttribute("item-id");
                if (rowId !== null) {
                    return parseInt(rowId);
                }
                return this.invalidRowIndex;
            }
        }
        return this.invalidRowIndex;
    }
    updateRowImage(id, newSrc) {
        const table = this.getTable();
        const targetImg = table?.querySelector(`tr[item-id="${id}"] img`);
        if (targetImg instanceof HTMLImageElement) {
            targetImg.src = newSrc;
        }
    }
    updateRowImageToolTip(id, toolTip) {
        const table = this.getTable();
        const targetImg = table?.querySelector(`tr[item-id="${id}"] img`);
        if (targetImg instanceof HTMLImageElement) {
            targetImg.title = toolTip;
        }
    }
    updateText(elem, text) {
        if (elem.children !== null) {
            const elem2 = elem.children[0];
            elem2.textContent = text;
        }
    }
    scroll(id) {
        const table = this.getTable();
        if (table === null)
            return null;
        if (id <= 0)
            return null;
        if (id > table.rows.length)
            return null;
        // 1. title属性（キャラ名）が一致する要素を探す
        const target = table.querySelector(`tr[item-id="${id}"] img`);
        if (target === null)
            return null;
        if (target === undefined)
            return null;
        target.scrollIntoView({
            behavior: 'smooth', // スルスルと動かす
            block: 'center' // 画面の真ん中に持ってくる
        });
        /*
        // 3. せっかくなので、目立つように一時的に光らせる（視覚的なフォーカス）
        parent.style.outline = "5px solid yellow";
        setTimeout(() => parent.style.outline = "none", 2000);
        */
        return target;
    }
    getRowElems() {
        const table = this.getTable();
        if (table === null)
            return null;
        return table.rows;
    }
    sortRows(colClassNames, isAsc = true) {
        const table = this.getTable();
        if (table === null)
            return false;
        if (colClassNames.length === 0)
            return false;
        const tbody = table.tBodies[0] || table;
        const rows = Array.from(tbody.rows);
        if (rows.length <= 1)
            return true;
        // --- 【お父様式・超高速パージ法律】 ---
        // ソートが始まる前に、全行からソート用のデータを1回だけ引っこ抜いてメモリに格納する！
        const sortDataItems = rows.map((row, index) => {
            let rawValue = "";
            for (const colName of colClassNames) {
                const elem = row.getElementsByClassName(colName)[0];
                if (elem) {
                    rawValue = elem.textContent?.trim() || "";
                    break;
                }
            }
            // 数値として扱えるかどうかも事前に判定しておく
            const isNum = rawValue !== "" && !isNaN(Number(rawValue));
            const parsedValue = isNum ? parseFloat(rawValue) : rawValue;
            return {
                rowIndex: index, // 元の行のインデックス（罠①を完全に防衛！）
                value: parsedValue // ソートに使う生データ（DOM探索はこれでもう終わり！）
            };
        });
        // --- 【超高速ソート実行】 ---
        // ここではDOM探索は1ミリも発生しません！メモリ上のクリーンな配列を爆速でシャffleします！
        sortDataItems.sort((a, b) => {
            if (a.value < b.value)
                return isAsc ? -1 : 1;
            if (a.value > b.value)
                return isAsc ? 1 : -1;
            return 0;
        });
        // --- 【DOM物理再整列】 ---
        // ソート結果のインデックス順に、既存のtrをtbodyへガチャンとハメ直すだけ！
        for (const item of sortDataItems) {
            tbody.appendChild(rows[item.rowIndex]);
        }
        return true;
    }
    findInputElem(elem) {
        if (elem === null)
            return null;
        const tagName = elem.tagName;
        if (tagName !== `INPUT`) {
            for (const child of elem.children) {
                const findElem = this.findInputElem(child);
                if (findElem === null)
                    continue;
                if (findElem.tagName === `INPUT`)
                    return findElem;
            }
            return null;
        }
        return elem;
    }
    getElemValue(elem) {
        if (elem instanceof HTMLInputElement) {
            const input = elem;
            //console.log(`[${elem.className}] [${input.value}]`)
            return input.value;
        }
        else if (elem instanceof HTMLSelectElement) {
            const sel = elem;
            //console.log(`[${elem.className}] [${sel.value}]`)
            return sel.value;
        }
        else {
            const inputElem = this.findInputElem(elem);
            if (inputElem !== null) {
                if (inputElem.type === `checkbox`)
                    return inputElem.checked;
                return inputElem.value;
            }
        }
        return null;
    }
    setElemValue(elem, value) {
        if (elem instanceof HTMLInputElement) {
            const input = elem;
            //console.log(`[${elem.className}] [${input.value}]`)
            const before = input.value;
            input.value = value;
            return before;
        }
        else if (elem instanceof HTMLSelectElement) {
            const sel = elem;
            //console.log(`[${elem.className}] [${sel.value}]`)
            const before = sel.value;
            sel.value = value;
            return before;
        }
        else {
            const inputElem = this.findInputElem(elem);
            if (inputElem !== null) {
                if (inputElem.type === `checkbox`) {
                    const before = inputElem.checked;
                    inputElem.checked = `${value}`.toLowerCase() === 'true';
                    return before;
                }
                const before = inputElem.value;
                inputElem.value = value;
                return before;
            }
        }
        return null;
    }
    getRowElem(rowIndex) {
        const table = this.getTable();
        if (table === null)
            return null;
        for (const rowElem of table.rows) {
            const rowId = rowElem.getAttribute("item-id");
            if (rowId === null)
                continue;
            if (rowId === `${rowIndex}`) {
                console.log(`match row id : ${rowId}`);
                return table.rows[rowIndex - this.firstRowIndex];
            }
        }
        return null;
    }
    getCellElems(rowElem) {
        if (rowElem === null)
            return null;
        const cells = new Array();
        for (const cell of rowElem.cells) {
            if (cell === null)
                continue;
            const items = new Array();
            for (const child of cell.children) {
                items.push(child);
            }
            cells.push(items);
        }
        return cells;
    }
    setVisible(visible) {
        const table = this.getTable();
        if (table === null)
            return null;
        table.hidden = !visible;
        table.parentElement.hidden = !visible;
        return true;
    }
    getCellRect(cellElem) {
        //cellElem は、[TD]が来ることを想定
        const htmlMaker = new HtmlMaker();
        const rcRow = htmlMaker.GetRect(cellElem.parentElement);
        const rcCol = htmlMaker.GetRect(cellElem);
        const res = new HtmlMakerRect();
        res.left = `${rcCol.left}`;
        res.top = `${rcRow.top}`;
        res.width = `${rcCol.width}`;
        res.height = `${rcCol.height}`;
        return res;
    }
    getTableOwnerRect(cellElem) {
        //cellElem は、[TD]が来ることを想定
        const htmlMaker = new HtmlMaker();
        const rcOwn = htmlMaker.GetRect(cellElem.parentElement.parentElement.parentElement.parentElement.parentElement);
        console.log(`[OWNER] ${rcOwn.left}, ${rcOwn.top}`);
        const rcTbl = htmlMaker.GetRect(cellElem.parentElement.parentElement.parentElement);
        console.log(`[TABLE] ${rcTbl.left}, ${rcTbl.top}`);
        const rcTbody = htmlMaker.GetRect(cellElem.parentElement.parentElement);
        console.log(`[TBODY] ${rcTbody.left}, ${rcTbody.top}`);
        const rcRow = htmlMaker.GetRect(cellElem.parentElement);
        console.log(`[TROW] ${rcRow.left}, ${rcRow.top}`);
        const res = new HtmlMakerRect();
        res.left = `${rcTbl.left}`;
        res.top = `${rcOwn.top}`;
        res.width = `${0}`;
        res.height = `${0}`;
        return res;
    }
    rowIdDelimiter = `_`;
    makeCallerName(classify, rowId) {
        return `${classify}${this.rowIdDelimiter}${rowId}`;
    }
    getCallerCellElem(callerName) {
        const keyRow = callerName.split(this.rowIdDelimiter);
        if (keyRow === undefined)
            return null;
        if (keyRow.length !== 2)
            return null;
        const rowElem = this.getRowElem(parseInt(keyRow[1]));
        if (rowElem === null)
            return null;
        const colElems = this.getCellElems(rowElem);
        if (colElems === null)
            return null;
        for (const col of colElems) {
            for (const item of col) {
                if (item.className === keyRow[0])
                    return item;
            }
        }
        return null;
    }
    async toClipboard() {
        const table = this.getTable();
        if (table === null)
            return false;
        let rows = ``;
        for (const rowElem of table.rows) {
            let cols = ``;
            const colElems = this.getCellElems(rowElem);
            if (colElems === null)
                return false;
            for (const col of colElems) {
                let items = ``;
                for (const item of col) {
                    const elemValue = this.getElemValue(item);
                    let itemText = elemValue === null ? `&null&` : `&${elemValue}&`;
                    if (items.length !== 0) {
                        items = `${items}\t${itemText}`;
                    }
                    else {
                        items = itemText;
                    }
                }
                if (cols.length !== 0) {
                    cols = `${cols}\t${items}`;
                }
                else {
                    cols = `${items}`;
                }
            }
            if (rows.length !== 0) {
                rows = `${rows}\n${cols}`;
            }
            else {
                rows = `${cols}`;
            }
        }
        const tableText = `table:{${rows}}`;
        try {
            await navigator.clipboard.writeText(tableText);
        }
        catch (err) {
            console.error("コピー失敗...", err);
            return false;
        }
        return true;
    }
    clipboardText = ``;
    async fromClipboard() {
        const table = this.getTable();
        if (table === null)
            return false;
        let tableText = ``;
        try {
            tableText = await navigator.clipboard.readText();
        }
        catch (err) {
            console.error("ペースト失敗...", err);
            return false;
        }
        this.clipboardText = tableText;
        //table:{${rows}}
        const marker = `table:{`;
        if (tableText.length < marker.length + 1)
            return false;
        if (tableText.startsWith(marker) === false)
            return false;
        if (tableText.endsWith(`}`) === false)
            return false;
        tableText = tableText.substring(marker.length);
        tableText = tableText.substring(0, tableText.length - 1);
        const tableTextRows = tableText.split(`\n`);
        //形式チェック
        let rowIndex = 0;
        for (const rowElem of table.rows) {
            const rowText = tableTextRows[rowIndex];
            const colTexts = rowText.split(`\t`);
            const colElems = this.getCellElems(rowElem);
            if (colElems === null)
                return false;
            if (colTexts.length !== colElems.length) {
                console.log(`different column size : line ${rowIndex + 1}`);
                return false;
            }
            rowIndex++;
        }
        rowIndex = 0;
        for (const rowElem of table.rows) {
            const rowText = tableTextRows[rowIndex];
            const colTexts = rowText.split(`\t`);
            const colElems = this.getCellElems(rowElem);
            if (colElems === null)
                return false;
            let colIndex = 0;
            for (const col of colElems) {
                let colText = colTexts[colIndex];
                if (colText.endsWith('\r') === true) {
                    colText = colText.substring(0, colText.length - 1);
                }
                if (colText.startsWith('&') === false)
                    continue;
                if (colText.endsWith('&') === false)
                    continue;
                colText = colText.substring(1, colText.length - (2 - 1));
                if (colText === `null`)
                    continue;
                for (const item of col) {
                    const elemValue = this.setElemValue(item, colText);
                    break;
                }
                colIndex++;
            }
            rowIndex++;
        }
        return true;
    }
    getTable() {
        const tableName = `.${this.tableName}`;
        const divList = document.querySelectorAll(tableName);
        if (divList === null)
            return null;
        if (divList.length <= 0)
            return null;
        const div = divList[0];
        const tableList = div.querySelectorAll(tableName);
        if (tableList === null)
            return null;
        if (tableList.length <= 0)
            return null;
        const table = tableList[0];
        return table;
    }
    getParentElem() {
        const tableName = `.${this.tableName}`;
        const divList = document.querySelectorAll(tableName);
        if (divList === null)
            return null;
        if (divList.length <= 0)
            return null;
        const div = divList[0];
        return div;
    }
    getScrollCellRect(cellElem) {
        //cellElem は、[TD]が来ることを想定
        const htmlMaker = new HtmlMaker();
        const rcCol = this.getCellRect(cellElem);
        const rcTbl = this.getTableOwnerRect(cellElem);
        const tableParentElem = this.getParentElem();
        const scrollLeft = tableParentElem !== null ? tableParentElem.scrollLeft : 0;
        //console.log(`${tableParentElem?.className} ${scrollLeft}`)
        const res = new HtmlMakerRect();
        res.left = `${parseInt(rcCol.left) - parseInt(rcTbl.left) + 10 - scrollLeft}`;
        res.top = `${parseInt(rcCol.top) - parseInt(rcTbl.top) + 10}`;
        res.width = `${rcCol.width}`;
        res.height = `${rcCol.height}`;
        return res;
    }
    setFontConfig(sizeEm = `0.9`) {
        this.fontSize = `font-size: ${sizeEm}em;`;
    }
    getItemCssText() {
        return `
${HtmlMakerCommonCss.spanCssText(this.fontSize, true)}
width: 100%;            /* 幅を固定するとGridらしくなります */
`;
    }
    getKvpCssText(tableName, keyClassName, valueClassName) {
        const tableCss = HtmlMakerCommonCss.getTableCssText(tableName, this.height);
        return `
/* テーブル */
${tableCss}
/* 左側のラベルセル (Key) */
.${keyClassName} {
${this.getItemCssText()}
}
/* 右側の入力セル (Value) */
.${valueClassName} {
    background-color: #f5f5dc;
    padding: 0;             /* 1. 余白をゼロにして、コンボを端まで広げる */
    width: 100%;
    border: none;
    vertical-align: middle; /* 上下の位置を中央に */
    padding-top: 4px; /* 下にパディングを入れて、文字を上に押し上げる */
    padding-bottom: 4px;    /* 下にパディングを入れて、文字を上に押し上げる */
}
.${valueClassName} select {
    width: 100%;            /* 2. 95% から 100% に変更 */
    height: 100%;           /* セルの高さに合わせる（必要に応じて） */
    border: none;           /* 3. 枠線を消す、あるいは内側に寄せる */
    border-left: 1px solid #ddd; /* 必要なら左側だけに境界線を入れる */
    border-radius: 4px;     /* 4pxのこだわり！ */
    background-color: #fff;
    color: #333;
    ${this.fontSize}
    cursor: pointer;
    padding: 4px 8px;       /* 内側に少し余白を持たせて文字を見やすく */
    box-sizing: border-box; /* width: 100% に padding を含める設定 */
}

.${valueClassName} select:focus {
    outline: none;
    box-shadow: 0 0 3px #4b0082; /* 選択中に光らせる */
}

/* テーブルの行にマウスが乗ったら背景を変える */
tr:hover .${keyClassName} {
    background-color: #e9e9d0; /* 少し濃いベージュ */
}
tr:hover .${valueClassName} {
    background-color: #f0f0ff; /* 親のホバー色に合わせる */
}
`.trim();
    }
    /** (特殊なケース)高さ指定するときにスクロールバー利用するCSS */
    MakeTableScrollCss(tableName, heightPx, horzScroll = false) {
        const horzScrollCss = horzScroll ? `auto` : `hidden`;
        return `
.${tableName} {
height: ${heightPx}px;              /* ダイアログに合わせた固定高 */
overflow-y: auto;
overflow-x: ${horzScrollCss};
-webkit-overflow-scrolling: touch;  /* iPad用の滑らか設定 */
border: 1px solid #7b1fa2;        /* 紫色の枠線 */
background: rgba(192, 192, 192, 0.6);
${HtmlMakerCommonCss.scrollBarText}
}
`.trim();
    }
}
export class HtmlMakerGrid {
    htmlMaker = new HtmlMaker();
    table = new HtmlMakerTable();
    gridElem = null;
    headerElem = null;
    footerElem = null;
    onSelect;
    makeKeyCell(label, className, toolTip) {
        const res = new HtmlMakerTableCellInfo();
        res.typeInfo.setLabel(label, false);
        res.className = className;
        res.typeInfo.toolTip = toolTip;
        return res;
    }
    makePair() {
        return new Map;
    }
    setPair(pair) {
        if (pair.size === 0)
            return false;
        // 2列 × n行 の次元を作成
        this.table.makeDim(2, pair.size);
        pair.forEach((cell, key) => {
            this.table.growCell(1, cell.items.length);
        });
        let rowIndex = -1;
        pair.forEach((cell, key) => {
            rowIndex++;
            this.table.getCell(0, rowIndex).typeInfo.setLabel(key.typeInfo.using.label, false);
            this.table.getCell(0, rowIndex).className = key.className;
            let itemIndex = -1;
            for (const item of cell.items) {
                itemIndex++;
                //item.copyTo(this.table.getCell(1, rowIndex, itemIndex))
                this.table.getCell(1, rowIndex, itemIndex).typeInfo = item.typeInfo;
                this.table.getCell(1, rowIndex, itemIndex).className = item.className;
            }
        });
        return true;
    }
    setListener(gridName, gridRowName, parentName, headerName = ``, footerName = ``) {
        this.dispose();
        //行テンプレート初期化
        this.table.makeRowTemplate(gridRowName);
        const parentElem = document.getElementById(parentName);
        if (parentElem === null) {
            console.log(`[setListener] cannot found ${parentName}`);
            return false;
        }
        const gridHTML = this.table.ToScrollHTML(gridName, gridName);
        const item = new HtmlMakerItem;
        item.props.name = ``;
        item.props.id = gridName;
        item.props.className = gridName;
        item.props.option.setTable(gridHTML);
        item.props.option.onSelect = async (evArgs) => {
            console.log(`classify = ${evArgs.classify} targetId = ${evArgs.targetId}`);
            if (this.onSelect !== undefined)
                await this.onSelect(evArgs);
        };
        this.htmlMaker = new HtmlMaker();
        this.htmlMaker.add(item);
        const tableHtml = this.htmlMaker.ToHTML();
        let gridElem = document.createElement("div");
        gridElem.className = gridName;
        gridElem.innerHTML = tableHtml;
        //console.log(`${gridElem.innerHTML}`)
        //const divElems = gridElem.querySelectorAll(`.${gridName}`)
        //const activeElems = Array.from(divElems).filter(el => el.isConnected);
        //this.gridElem = divElems[0] as HTMLDivElement
        this.gridElem = gridElem.children[0];
        if (headerName !== ``) {
            this.headerElem = document.createElement("div");
            this.headerElem.className = headerName;
            this.headerElem.id = headerName;
            parentElem.appendChild(this.headerElem);
        }
        parentElem.appendChild(this.gridElem);
        gridElem.remove();
        gridElem = null;
        if (footerName !== ``) {
            this.footerElem = document.createElement("div");
            this.footerElem.className = footerName;
            this.footerElem.id = footerName;
            parentElem.appendChild(this.footerElem);
        }
        return true;
    }
    getSelectedRow() {
        return this.table.getSelectedRow();
    }
    enableEvents(onSelect) {
        if (this.gridElem === null)
            return false;
        this.htmlMaker.enableTableEvents(this.gridElem.className);
        this.onSelect = onSelect;
        return true;
    }
    disableEvents() {
        if (this.gridElem === null)
            return false;
        this.htmlMaker.disableTableEvents(this.gridElem.className);
        return true;
    }
    setVisible(visible) {
        if (this.gridElem === null)
            return false;
        this.gridElem.hidden = !visible;
        return true;
    }
    dispose() {
        if (this.headerElem !== null) {
            const parentElem = this.headerElem.parentElement;
            parentElem?.removeChild(this.headerElem);
            this.headerElem.remove();
        }
        if (this.footerElem !== null) {
            const parentElem = this.footerElem.parentElement;
            parentElem?.removeChild(this.footerElem);
            this.footerElem.remove();
        }
        if (this.gridElem !== null) {
            const parentElem = this.gridElem.parentElement;
            parentElem?.removeChild(this.gridElem);
            this.gridElem.remove();
        }
        this.disableEvents();
        this.headerElem = null;
        this.footerElem = null;
        this.gridElem = null;
    }
    getCssText(gridName, keyClassName, valueClassName) {
        return this.table.getKvpCssText(gridName, keyClassName, valueClassName);
    }
}
export class HtmlMakerCtlBase {
    ctlName = ``;
    styleId = ``;
    ovElem = null;
    ctlElem = null;
    firstAction(ctlName, parentName) {
        const parentElem = document.getElementById(parentName);
        if (parentElem === null) {
            console.log(`[firstAction] cannot found ${parentName}`);
            return null;
        }
        this.createOverlay(parentElem);
        this.ctlName = ctlName;
        return parentElem;
    }
    createOverlay(parentElem) {
        const barrier = document.createElement('div');
        barrier.id = `${this.ovCssName()}`;
        barrier.style.position = 'absolute';
        barrier.style.inset = '0'; // 親の端から端まで
        barrier.style.zIndex = this.zIndexOv(); // UpDown(1000)より少し下、他より上
        barrier.style.background = 'transparent'; // 完全透明
        barrier.style.background = 'rgba(0,0,0,0.1)'; // 開発中は色をつけるとデバッグしやすいです！
        parentElem.appendChild(barrier);
        this.ovElem = barrier;
        //barrier.dataset.display = barrier.style.display
    }
    enableOverlay(enabled = true) {
        if (this.ovElem === null)
            return;
        //this.ovElem.style.display = enabled ? this.ovElem.dataset.display! : `none`
        this.ovElem.style.display = enabled ? `` : `none`;
    }
    get isEnableOverlay() {
        const res = this.ovElem.style.display === `none` ? false : true;
        return res;
    }
    resultTable(tableName) {
        const ctlName = `.${this.ctlName}`;
        const divList = document.querySelectorAll(ctlName);
        if (divList === null)
            return null;
        if (divList.length <= 0)
            return null;
        const div = divList[0];
        const tableCssName = `.${tableName}`;
        const tableList = div.querySelectorAll(tableCssName);
        if (tableList === null)
            return null;
        if (tableList.length <= 0)
            return null;
        const table = tableList[0];
        return table;
    }
    setVisible(visible) {
        if (this.ctlElem === null)
            return false;
        //this.ctlElem.hidden = !visible
        this.ctlElem.style.display = visible ? "" : "none";
        return true;
    }
    getVisible() {
        if (this.ctlElem === null)
            return false;
        //return this.ctlElem.hidden === true ? false : true
        return this.ctlElem.style.display === "none" ? false : true;
    }
    moveTo(left, top) {
        if (this.ctlElem === null)
            return false;
        this.ctlElem.style.left = `${left}px`;
        this.ctlElem.style.top = `${top}px`;
        return true;
    }
    getRect() {
        if (this.ctlElem === null)
            return null;
        const rc = this.ctlElem.getBoundingClientRect();
        return rc;
    }
    getBaseElem() { return this.ovElem !== null ? this.ovElem.parentElement : null; }
    getOuterCssText() {
        return `
.${this.ctlName} {
  position: absolute;
  inset: auto;

  padding: 0;       /* 内側の余白をゼロに */
  border: none;     /* 枠線を消す（枠線があると1px〜ズレます） */
  overflow: hidden; /* 中身がはみ出さないように（任意） */

  ${HtmlMakerCommonCss.borderShadowText}

  z-index: ${this.zIndexCtl()};
}
`.trim();
    }
    getBaseCssText() {
        return `
border-collapse: collapse; /* セルの境界線を重ねて隙間を消す */
border-spacing: 0;         /* 念のため間隔もゼロに */
margin: 0;                 /* 外側の余白もゼロに */
display: block;            /* もしくは table。配置を安定させます */
${HtmlMakerCommonCss.dlgBkColorText}
padding: 1px;
        `.trim();
    }
    appendStyle(styleId) {
        const style = document.createElement("style");
        style.id = styleId;
        document.head.appendChild(style);
        this.styleId = styleId;
        return style;
    }
    dispose() {
        const style = document.getElementById(this.styleId);
        if (style !== null) {
            style.remove();
        }
        if (this.ovElem !== null) {
            const parentElem = this.ovElem.parentElement;
            parentElem?.removeChild(this.ovElem);
            this.ovElem.remove();
        }
    }
    ovCssName() { return `${this.ctlName}-barrier`; }
    zIndexCtl() { return `1000`; }
    zIndexOv() { return `999`; }
}
export const HtmlMakerUpDownMatchTypes = {
    ByText: "ByText",
    ByValue: "ByValue",
    Both: "Both",
};
export class HtmlMakerUpDown extends HtmlMakerCtlBase {
    initValue = ``;
    keyValuePairs;
    selectedIndex = -1;
    delimiter = `/`;
    callerName = ``;
    htmlMaker = new HtmlMaker();
    table = new HtmlMakerTable();
    onApply;
    onUp;
    onDown;
    setListener(ctlName, parentName, callerName) {
        this.dispose();
        this.callerName = callerName;
        this.ctlName = ctlName;
        // 1列 × 3行 の次元を作成
        const table = new HtmlMakerTable();
        table.makeDim(1, 3);
        let rowIndex = 0;
        // ▲ボタン
        table.getCell(0, rowIndex).typeInfo.setButton(`⏫`);
        table.getCell(0, rowIndex).className = this.upCssName();
        table.getCell(0, rowIndex).typeInfo.using.itemId = rowIndex;
        // values
        rowIndex++;
        table.getCell(0, rowIndex).typeInfo.setButton(``);
        table.getCell(0, rowIndex).className = this.valCssName();
        table.getCell(0, rowIndex).typeInfo.using.itemId = rowIndex;
        // ▼ボタン
        rowIndex++;
        table.getCell(0, rowIndex).typeInfo.setButton(`⏬`);
        table.getCell(0, rowIndex).className = this.dwCssName();
        table.getCell(0, rowIndex).typeInfo.using.itemId = rowIndex;
        const parentElem = this.firstAction(ctlName, parentName);
        if (parentElem === null) {
            //console.log(`[setListener] cannot found ${parentName}`)
            return false;
        }
        const ctlHTML = table.ToScrollHTML(ctlName, ctlName);
        const item = new HtmlMakerItem;
        item.props.name = ``;
        item.props.id = this.tblCssName();
        item.props.className = this.tblCssName();
        item.props.option.setTable(ctlHTML);
        item.props.option.onSelect = async (evArgs) => {
            //console.log(`classify = ${evArgs.classify} targetId = ${evArgs.targetId}`)
            switch (evArgs.classify) {
                case this.valCssName():
                    if (this.onApply !== undefined) {
                        const evCtl = new HtmlMakerCtlEvent();
                        evCtl.callerName = this.callerName;
                        evCtl.result = this.keyValuePairs[this.selectedIndex];
                        await this.onApply(evCtl);
                    }
                    break;
                case this.upCssName():
                    if (this.onUp !== undefined) {
                        const evCtl = new HtmlMakerCtlEvent();
                        evCtl.callerName = this.callerName;
                        evCtl.result = this.keyValuePairs[this.selectedIndex];
                        await this.onUp(evCtl);
                        if (!evArgs.cancel) {
                            this.onUpAction();
                        }
                    }
                    break;
                case this.dwCssName():
                    if (this.onDown !== undefined) {
                        const evCtl = new HtmlMakerCtlEvent();
                        evCtl.callerName = this.callerName;
                        evCtl.result = this.keyValuePairs[this.selectedIndex];
                        await this.onDown(evCtl);
                        if (!evArgs.cancel) {
                            this.onDnAction();
                        }
                    }
                    break;
            }
        };
        this.htmlMaker = new HtmlMaker();
        this.htmlMaker.add(item);
        const tableHtml = this.htmlMaker.ToHTML();
        let ctlElem = document.createElement("dialog");
        ctlElem.className = ctlName;
        ctlElem.innerHTML = tableHtml;
        this.ctlElem = ctlElem;
        let div = ctlElem.children[0];
        let tbl = div.children[0];
        tbl.className = `${this.tblCssName()}`;
        tbl.id = `${this.tblCssName()}`;
        this.ctlElem.appendChild(tbl);
        div.remove();
        div = null;
        parentElem.appendChild(this.ctlElem);
        /*
        ctlElem.remove()
        ctlElem = null
        */
        this.table = table;
        return true;
    }
    setSelectedByValue(initValue, keyValuePairs, match = HtmlMakerUpDownMatchTypes.Both) {
        const comps = new Array();
        switch (match) {
            case HtmlMakerUpDownMatchTypes.ByText:
                comps.push(0);
                break;
            case HtmlMakerUpDownMatchTypes.ByValue:
                comps.push(1);
                break;
            case HtmlMakerUpDownMatchTypes.Both:
                comps.push(0);
                comps.push(1);
                break;
            default:
                return false;
        }
        this.initValue = initValue;
        this.keyValuePairs = keyValuePairs;
        this.selectedIndex = -1;
        const initPair = initValue.split(this.delimiter);
        let findText = initPair.length >= 2 ? initPair[1] : initValue;
        let selText = ``;
        for (const comp of comps) {
            let index = -1;
            for (const pair of keyValuePairs) {
                index++;
                if (pair !== null && pair !== ``) {
                    const keyValueArray = pair.split(this.delimiter);
                    if (keyValueArray.length >= 2) {
                        if (keyValueArray[comp] === findText) {
                            this.selectedIndex = index;
                            selText = keyValueArray[0];
                            break;
                        }
                    }
                }
            }
            if (this.selectedIndex !== -1) {
                break;
            }
        }
        if (this.selectedIndex === -1) {
            const pair = keyValuePairs[0];
            const keyValueArray = pair.split(this.delimiter);
            this.selectedIndex = 0;
            selText = keyValueArray[0];
        }
        this.updateValueElemByText(selText);
        return this.selectedIndex === -1 ? false : true;
    }
    show(left, top) {
        if (this.ctlElem === null)
            return;
        this.ctlElem.style.left = `${left}px`;
        this.ctlElem.style.top = `${top}px`;
        this.ctlElem.show();
    }
    applyCss() {
        const styleId = `${this.getBaseElem().className}-updn-style`;
        if (document.getElementById(styleId))
            return;
        const style = this.appendStyle(styleId);
        style.textContent = `
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
  ${HtmlMakerCommonCss.spacingTable}
}
.${this.tblCssName()} tr {
  ${HtmlMakerCommonCss.spacingTr}
}
.${this.tblCssName()} button {
${HtmlMakerCommonCss.stdButtonText()}
width: 32px; height: 32px;
font-size: 20px;
padding: unset;
}
.${this.tblCssName()} button:hover {
${HtmlMakerCommonCss.btnHoverCssText}
border: 1px solid #b4b107;
}
`.trim();
    }
    enableEvents(onApply, onUp, onDown) {
        if (this.ctlElem === null)
            return false;
        this.htmlMaker.enableTableEvents(this.ctlElem.className);
        this.onApply = onApply;
        this.onUp = onUp;
        this.onDown = onDown;
        return true;
    }
    disableEvents() {
        if (this.ctlElem === null)
            return false;
        this.htmlMaker.disableTableEvents(this.ctlElem.className);
        return true;
    }
    dispose() {
        super.dispose();
        if (this.ctlElem !== null) {
            const parentElem = this.ctlElem.parentElement;
            parentElem?.removeChild(this.ctlElem);
            this.ctlElem.remove();
        }
        this.disableEvents();
        this.ctlElem = null;
    }
    updateValue(selText) {
        this.setSelectedByValue(selText, this.keyValuePairs, HtmlMakerUpDownMatchTypes.ByText);
        const pair = this.keyValuePairs[this.selectedIndex];
        const keyValueArray = pair.split(this.delimiter);
        return keyValueArray;
    }
    getValue(index = -1) {
        if (index === -1)
            index = this.selectedIndex;
        const pair = this.keyValuePairs[index];
        const keyValueArray = pair.split(this.delimiter);
        return keyValueArray;
    }
    onUpAction = async () => {
        if (this.keyValuePairs === undefined)
            return;
        this.selectedIndex = this.selectedIndex <= 0 ? this.keyValuePairs.length - 1 : this.selectedIndex - 1;
        this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]);
    };
    onDnAction = async () => {
        if (this.keyValuePairs === undefined)
            return;
        this.selectedIndex = this.selectedIndex >= this.keyValuePairs.length - 1 ? 0 : this.selectedIndex + 1;
        this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]);
    };
    updateValueElemByKeyValue(keyValue) {
        if (this.ctlElem === null)
            return;
        let selText = ``;
        const keyValueArray = keyValue.split(this.delimiter);
        if (keyValueArray.length >= 2) {
            selText = keyValueArray[0];
        }
        this.updateValueElemByText(selText);
    }
    updateValueElemByText(selText) {
        if (this.ctlElem === null)
            return;
        const valElem = this.ctlElem.querySelectorAll(`.${this.valCssName()}`);
        if (valElem !== null) {
            valElem[0].textContent = selText;
        }
    }
    tblCssName() { return `${this.ctlName}-tbl`; }
    upCssName() { return `${this.ctlName}-upBtn`; }
    dwCssName() { return `${this.ctlName}-dwBtn`; }
    valCssName() { return `${this.ctlName}-values`; }
}
export class HtmlMakerChoiceItem {
    key = ``;
    text = ``;
    state = ``;
}
export const HtmlMakerChoiceHeaderModes = {
    None: "None",
    Visible: "Visible",
};
export const HtmlMakerChoiceTwinModes = {
    None: "None",
    VisLast: "VisLast",
    InVisLast: "InVisLast",
};
export class HtmlMakerChoice extends HtmlMakerCtlBase {
    items;
    headerMode = HtmlMakerChoiceHeaderModes.None;
    headerTitle = ``;
    minWidth = ``;
    minHeight = ``;
    itemWordWrap = false;
    itemWidth = 100; //itemWordWrap = true の場合の幅(px)
    twins;
    twinText = `📌`;
    //private callerName: string = ``
    htmlMaker = new HtmlMaker();
    onSelect;
    table;
    tblElem = null;
    isCallerTwin(callerName) {
        return callerName.endsWith(`-twin`);
    }
    setChoiceItems(items, twinMode = HtmlMakerChoiceTwinModes.None) {
        this.items = items;
        if (twinMode !== HtmlMakerChoiceTwinModes.None) {
            this.twins = new Array;
            let rowIndex = 0;
            for (const item of items) {
                if (twinMode === HtmlMakerChoiceTwinModes.VisLast ||
                    twinMode === HtmlMakerChoiceTwinModes.InVisLast && rowIndex < items.length - 1) {
                    const twin = new HtmlMakerChoiceItem();
                    twin.key = `${item.key}-twin`;
                    twin.text = this.twinText;
                    twin.state = item.state;
                    this.twins.push(twin);
                }
                rowIndex++;
            }
        }
    }
    setListener(ctlName, parentName, callerName, headerMode = HtmlMakerChoiceHeaderModes.None) {
        if (this.items === undefined)
            return false;
        this.dispose();
        //this.callerName = callerName
        this.ctlName = ctlName;
        this.headerMode = headerMode;
        // 1列 × n行 の次元を作成
        const nRow = this.items.length;
        const nCol = this.twins != undefined && this.twins.length >= 1 ? 2 : 1;
        const table = new HtmlMakerTable();
        table.makeDim(nCol, nRow);
        let rowIndex = 0;
        for (const item of this.items) {
            const state = item.state !== `` ? ` ${item.state}` : ``;
            table.getCell(0, rowIndex).typeInfo.setButton(`${item.text}`);
            table.getCell(0, rowIndex).className = `${ctlName}-${item.key}${state}`;
            table.getCell(0, rowIndex).typeInfo.using.itemId = rowIndex;
            if (nCol >= 2 && rowIndex < this.twins.length) {
                const twin = this.twins[rowIndex];
                const state = twin.state !== `` ? ` ${twin.state}` : ``;
                table.getCell(1, rowIndex).typeInfo.setButton(`${twin.text}`);
                table.getCell(1, rowIndex).className = `${ctlName}-${twin.key}${state}`;
                table.getCell(1, rowIndex).typeInfo.using.itemId = rowIndex;
            }
            rowIndex++;
        }
        const parentElem = this.firstAction(ctlName, parentName);
        if (parentElem === null) {
            //console.log(`[setListener] cannot found ${parentName}`)
            return false;
        }
        const ctlHTML = table.ToScrollHTML(ctlName, ctlName);
        const item = new HtmlMakerItem;
        item.props.name = ``;
        item.props.id = this.tblCssName;
        item.props.className = this.tblCssName;
        item.props.option.setTable(ctlHTML);
        item.props.option.onSelect = async (evArgs) => {
            console.log(`classify = ${evArgs.classify} targetId = ${evArgs.targetId}`);
            if (this.onSelect !== undefined) {
                const rowIndex = parseInt(evArgs.targetId);
                const evCtl = new HtmlMakerCtlEvent();
                evCtl.callerName = evArgs.classify; //this.callerName
                evCtl.result = 0 <= rowIndex && rowIndex < this.items.length ? this.items[rowIndex].key : ``;
                await this.onSelect(evCtl);
            }
        };
        this.htmlMaker = new HtmlMaker();
        this.htmlMaker.add(item);
        const tableHtml = this.htmlMaker.ToHTML();
        const div = HtmlMakerMisc.ToElem(tableHtml);
        div.className = this.divCssName;
        div.id = this.divCssName;
        let ctlElem = document.createElement("dialog");
        ctlElem.className = ctlName;
        ctlElem.id = ctlName;
        this.ctlElem = ctlElem;
        let tbl = div.children[0];
        tbl.className = this.tblCssName;
        tbl.id = this.tblCssName;
        if (headerMode !== HtmlMakerChoiceHeaderModes.None) {
            const B0Btn = `<button class="${this.toolNameB0}" id="${this.toolNameB0}" title="DragMove">[＊]</button>`;
            const B4Btn = `<button class="${this.toolNameB4}" id="${this.toolNameB4}" title="Close">[×]</button>`;
            const head = `<div class="${this.toolsCssName}" id="${this.toolsCssName}">${B0Btn}${B4Btn}${this.headerTitle}</div>`;
            const headElem = document.createElement("div");
            const headName = this.headCssName;
            headElem.className = headName;
            headElem.id = headName;
            headElem.innerHTML = head;
            headElem.style.display = headerMode === HtmlMakerChoiceHeaderModes.Visible ? `` : `none`;
            this.ctlElem.appendChild(headElem);
        }
        this.ctlElem.appendChild(div);
        parentElem.appendChild(this.ctlElem);
        this.table = table;
        this.tblElem = tbl;
        return true;
    }
    show(left, top) {
        if (this.ctlElem === null)
            return;
        this.ctlElem.style.left = `${left}px`;
        this.ctlElem.style.top = `${top}px`;
        this.ctlElem.show();
    }
    setMinSize(minWidth, minHeight) {
        this.minWidth = `${minWidth}px`;
        this.minHeight = `${minHeight}px`;
    }
    applyCss() {
        //const styleId = `${this.getBaseElem()!.className}-choice-style`;
        const styleId = `${this.ctlName}-choice-style`;
        if (document.getElementById(styleId))
            return;
        const minWidth = this.minWidth !== `` ? `min-width: ${this.minWidth};` : ``;
        const minHeight = this.minHeight !== `` ? `min-height: ${this.minHeight};` : ``;
        const headCss = this.headerMode !== HtmlMakerChoiceHeaderModes.None ? `
.${this.divCssName} {
max-height: 200px;
${minWidth}
${minHeight}
overflow-y: auto;
${HtmlMakerCommonCss.scrollBarText}
}
.${this.toolsCssName} {
display: flex;
${HtmlMakerCommonCss.titleColorText}
}

#${this.toolNameB0} {
${HtmlMakerCommonCss.ctlHeaderBtnCssText}
}
#${this.toolNameB0}:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
#${this.toolNameB4} {
${HtmlMakerCommonCss.ctlHeaderBtnCssText}
}
#${this.toolNameB4}:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
`.trim() : ``;
        let stateCssAll = ``;
        for (const item of this.items) {
            if (item.state === ``)
                continue;
            const stateCss = `
[class*="${this.ctlName}-${item.key}"].${item.state} {
 text-decoration: line-through;    /* 文字に取り消し線を付与 */
 text-decoration-color: #ff4d4d; /* 線の色だけ赤にする */
 text-decoration-thickness: 2px;   /* 線の太さ */
}`.trim();
            stateCssAll += stateCss;
        }
        const leftWidth = this.itemWordWrap ?
            `
width: ${this.itemWidth}px;
white-space: normal;
` :
            `
width: 100%;
white-space: nowrap;
`;
        let leftCssAll = ``;
        for (const item of this.items) {
            const leftCss = `
[class*="${this.ctlName}-${item.key}"] {
${leftWidth}
background: ${HtmlMakerCommonCss.normBkColor};
border-radius: 8px;
cursor: pointer;
}
[class*="${this.ctlName}-${item.key}"]:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
`.trim();
            leftCssAll += leftCss;
        }
        let twinCssAll = ``;
        if (this.twins !== undefined) {
            for (const twin of this.twins) {
                const twinCss = `
[class*="${this.ctlName}-${twin.key}"] {
width: 100%;
white-space: nowrap;
background: ${HtmlMakerCommonCss.normBkColor};
border-radius: 8px;
cursor: pointer;
}
[class*="${this.ctlName}-${twin.key}"]:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}
`.trim();
                twinCssAll += twinCss;
            }
        }
        const style = this.appendStyle(styleId);
        style.textContent = `
${this.getOuterCssText()}

${headCss}

.${this.tblCssName} {
  ${this.getBaseCssText()}
}

${leftCssAll}
${stateCssAll}
${twinCssAll}
        `.trim();
    }
    enableEvents(onSelect) {
        if (this.ctlElem === null)
            return false;
        this.htmlMaker.enableTableEvents(this.ctlElem.className);
        this.onSelect = onSelect;
        if (this.headerMode !== HtmlMakerChoiceHeaderModes.None) {
            const elemB0 = document.getElementById(this.toolNameB0);
            elemB0.onclick = this.onB0Click;
            this.mover.onMoveDone = this.moverOnMoveDone;
            this.mover.attach(elemB0, this.ctlElem);
            document.getElementById(this.toolNameB4).onclick = this.onB4Click;
        }
        return true;
    }
    disableEvents() {
        if (this.ctlElem === null)
            return false;
        this.htmlMaker.disableTableEvents(this.ctlElem.className);
        return true;
    }
    moveLeftByWidth(left) {
        if (this.ctlElem === null)
            return;
        const rc = this.htmlMaker.GetRect(this.ctlElem);
        this.ctlElem.style.left = `${left - Number(rc.width)}px`;
    }
    dispose() {
        super.dispose();
        if (this.ctlElem !== null) {
            const parentElem = this.ctlElem.parentElement;
            parentElem?.removeChild(this.ctlElem);
            this.ctlElem.remove();
        }
        this.disableEvents();
        this.ctlElem = null;
    }
    get divCssName() { return `${this.ctlName}-div`; }
    get tblCssName() { return `${this.ctlName}-tbl`; }
    get headCssName() { return `${this.ctlName}-head`; }
    get toolsCssName() { return `${this.ctlName}-tools`; }
    get toolNameB0() { return `${this.ctlElem.id}-tool-b0`; }
    get toolNameB4() { return `${this.ctlElem.id}-tool-b4`; }
    onB0Click = async (event) => {
        console.log(`onB0Click`, event);
    };
    onCancel;
    callerElem = null;
    onB4Click = async (event) => {
        if (this.onCancel !== undefined) {
            this.onCancel(this, this.callerElem);
        }
    };
    mover = new DialogMover;
    onMoveDone;
    moverOnMoveDone = async () => {
        if (this.onMoveDone !== undefined) {
            await this.onMoveDone(this.ctlElem);
        }
    };
    AddRow() {
        const rowIndex = this.table.addTblRow(this.tblElem, this.tableRowCssName);
        return rowIndex;
    }
    DeleteRow(rowIndex = -1) {
        if (rowIndex === -1) {
            rowIndex = this.table.firstRowIndex;
            this.table.deleteTblRow(this.tblElem, rowIndex);
            return;
        }
        this.table.deleteTblRow(this.tblElem, rowIndex);
    }
    UpdateItems(texts) {
        if (this.tblElem === null)
            return false;
        const rows = this.tblElem.rows;
        let rowIndex = 0;
        for (const row of rows) {
            if (rowIndex >= texts.length)
                continue;
            row.cells[0].children[0].textContent = texts[rowIndex];
            rowIndex++;
        }
        return true;
    }
    redimAllRows() {
        this.table.redimTblAllRows(this.tblElem);
    }
    makeRowTemplate(items) {
        const table = this.table;
        const ctlName = this.ctlName;
        const nCol = items.length;
        this.table.makeDim(nCol, 1);
        /*
        */
        let rowIndex = 0;
        let colIndex = 0;
        for (const item of items) {
            const state = item.state !== `` ? ` ${item.state}` : ``;
            table.getCell(colIndex, rowIndex).typeInfo.setButton(`${item.text}`);
            table.getCell(colIndex, rowIndex).className = `${ctlName}-${item.key}${state}`;
            table.getCell(colIndex, rowIndex).typeInfo.using.itemId = rowIndex;
            colIndex++;
        }
        table.makeRowTemplate(this.tableRowCssName);
    }
    scroll(rowIndex) {
        if (this.tblElem === null)
            return false;
        this.tblElem.rows[rowIndex].scrollIntoView({ behavior: 'auto', block: 'start' });
        return true;
    }
    get tableRowCssName() {
        return `${this.tblElem.className}-row`;
    }
}
export class HtmlMakerFlyoutGridItem {
    key = ``;
    text = ``;
    value;
}
export class HtmlMakerFlyoutGrid extends HtmlMakerCtlBase {
    items;
    callerName = ``;
    htmlMaker = new HtmlMaker();
    table = new HtmlMakerTable();
    headerElem = null;
    footerElem = null;
    onSelect;
    setGridtems(items) {
        this.items = items;
    }
    setListener(ctlName, parentName, callerName, headerName = ``, footerName = ``) {
        if (this.items === undefined)
            return false;
        this.dispose();
        this.callerName = callerName;
        this.ctlName = ctlName;
        // 2列 × n行 の次元を作成
        const nItem = this.items.length;
        const table = new HtmlMakerTable();
        table.makeDim(2, nItem);
        let rowIndex = 0;
        for (const item of this.items) {
            table.getCell(0, rowIndex).typeInfo.setLabel(`${item.text}`, false);
            table.getCell(0, rowIndex).className = this.keyCssName();
            table.getCell(0, rowIndex).typeInfo.using.itemId = rowIndex;
            table.getCell(1, rowIndex).typeInfo = item.value.items[0].typeInfo;
            table.getCell(1, rowIndex).className = this.valueCssName();
            table.getCell(1, rowIndex).typeInfo.using.itemId = rowIndex;
            rowIndex++;
        }
        const parentElem = this.firstAction(ctlName, parentName);
        if (parentElem === null) {
            //console.log(`[setListener] cannot found ${parentName}`)
            return false;
        }
        const ctlHTML = table.ToScrollHTML(ctlName, this.tblCssName());
        const item = new HtmlMakerItem;
        item.props.name = ``;
        item.props.id = this.tblCssName();
        item.props.className = this.tblCssName();
        item.props.option.setTable(ctlHTML);
        item.props.option.onSelect = async (evArgs) => {
            if (this.onSelect !== undefined) {
                //console.log(`classify = ${evArgs.classify} targetId = ${evArgs.targetId}`)
                const evCtl = new HtmlMakerCtlEvent();
                evCtl.callerName = evArgs.classify;
                evCtl.result = evArgs.selectedValue;
                await this.onSelect(evCtl);
            }
        };
        this.htmlMaker = new HtmlMaker();
        this.htmlMaker.add(item);
        const tableHtml = this.htmlMaker.ToHTML();
        let ctlElem = document.createElement("dialog");
        ctlElem.className = ctlName;
        ctlElem.innerHTML = tableHtml;
        this.ctlElem = ctlElem;
        let div = ctlElem.children[0];
        const divName = this.divCssName();
        div.className = divName;
        div.id = divName;
        let tbl = div.children[0];
        tbl.className = `${this.tblCssName()}`;
        tbl.id = `${this.tblCssName()}`;
        if (headerName !== ``) {
            this.headerElem = document.createElement("div");
            this.headerElem.className = headerName;
            this.headerElem.id = headerName;
            ctlElem.appendChild(this.headerElem);
        }
        parentElem.appendChild(this.ctlElem);
        if (footerName !== ``) {
            this.footerElem = document.createElement("div");
            this.footerElem.className = footerName;
            this.footerElem.id = footerName;
            ctlElem.appendChild(this.footerElem);
        }
        this.table = table;
        return true;
    }
    show(left, top) {
        if (this.ctlElem === null)
            return;
        this.ctlElem.style.left = `${left}px`;
        this.ctlElem.style.top = `${top}px`;
        this.ctlElem.show();
    }
    setFontConfig(sizeEm = `0.9`) {
        this.table.setFontConfig(sizeEm);
    }
    setSize(widthPx = `200`, heightPx = `300`) {
        let footerHeight = 0;
        if (this.footerElem !== null) {
            const rc = this.htmlMaker.GetRect(this.footerElem);
            footerHeight = Number(rc.height);
        }
        this.table.height = `${Number(heightPx) - footerHeight}`;
        this.height = Number(heightPx) + HtmlMakerCommonCss.footerPadding;
        this.width = Number(widthPx);
    }
    width = 0;
    height = 0;
    applyCss() {
        const styleId = `${this.getBaseElem().className}-flgrd-style`;
        if (document.getElementById(styleId))
            return;
        const style = this.appendStyle(styleId);
        style.textContent = `
${this.getOuterCssText()}
${this.table.getKvpCssText(this.divCssName(), this.keyCssName(), this.valueCssName())}
.${this.ctlName} {
width: ${this.width}px;
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim();
    }
    enableEvents(onSelect) {
        if (this.ctlElem === null)
            return false;
        this.htmlMaker.enableTableEvents(this.ctlElem.className);
        this.onSelect = onSelect;
        return true;
    }
    disableEvents() {
        if (this.ctlElem === null)
            return false;
        this.htmlMaker.disableTableEvents(this.ctlElem.className);
        return true;
    }
    /*
    public setVisible(visible: boolean) {
        if (this.ctlElem === null) return false
        this.ctlElem.hidden = !visible
        return true
    }
    */
    dispose() {
        super.dispose();
        if (this.headerElem !== null) {
            const parentElem = this.headerElem.parentElement;
            parentElem?.removeChild(this.headerElem);
            this.headerElem.remove();
        }
        if (this.footerElem !== null) {
            const parentElem = this.footerElem.parentElement;
            parentElem?.removeChild(this.footerElem);
            this.footerElem.remove();
        }
        if (this.ctlElem !== null) {
            const parentElem = this.ctlElem.parentElement;
            parentElem?.removeChild(this.ctlElem);
            this.ctlElem.remove();
        }
        this.disableEvents();
        this.ctlElem = null;
    }
    divCssName() { return `${this.ctlName}-div`; }
    tblCssName() { return `${this.ctlName}-tbl`; }
    keyCssName() { return `${this.ctlName}-key`; }
    valueCssName() { return `${this.ctlName}-value`; }
}
export const HtmlMakerInputEditTypes = {
    Text: "Text",
    KeyValue: "KeyValue",
};
export const HtmlMakerInputEditValueTypes = {
    asText: "asText",
    asNumber: "asNumber",
};
export class HtmlMakerInputEdit extends HtmlMakerCtlBase {
    pairDelimiter = `,`;
    itemDelimiter = `/`;
    keyToolTip = `キー`;
    valueToolTip = `テキスト`;
    editType = HtmlMakerInputEditTypes.KeyValue;
    valueType = HtmlMakerInputEditValueTypes.asText;
    digLen = 5;
    items;
    callerName = ``;
    htmlMaker = new HtmlMaker();
    table = new HtmlMakerTable();
    headerElem = null;
    footerElem = null;
    onSelect;
    setKeyValuePairs(keyValuePairs, maxPair = 8) {
        const pairs = keyValuePairs.split(this.pairDelimiter);
        if (pairs.length === 0)
            return;
        const items = new Array;
        for (const itemText of pairs) {
            const keyValue = itemText.split(this.itemDelimiter);
            if (keyValue.length <= 1)
                continue;
            const item = new HtmlMakerChoiceItem;
            item.key = keyValue[0];
            item.text = keyValue[1];
            items.push(item);
        }
        const numAdd = maxPair - items.length;
        if (numAdd > 0) {
            for (let i = 0; i < numAdd; i++) {
                const item = new HtmlMakerChoiceItem;
                item.key = `key${items.length + 1}`;
                item.text = ``;
                items.push(item);
            }
        }
        this.editType = HtmlMakerInputEditTypes.KeyValue;
        this.items = items;
    }
    setTexts(texts, maxPair = 8) {
        const pairs = texts.split(this.pairDelimiter);
        if (pairs.length === 0)
            return;
        const items = new Array;
        for (const itemText of pairs) {
            const item = new HtmlMakerChoiceItem;
            item.text = itemText;
            items.push(item);
        }
        const numAdd = maxPair - items.length;
        if (numAdd > 0) {
            for (let i = 0; i < numAdd; i++) {
                const item = new HtmlMakerChoiceItem;
                item.key = `key${items.length + i}`;
                item.text = ``;
                items.push(item);
            }
        }
        this.editType = HtmlMakerInputEditTypes.Text;
        this.items = items;
    }
    setValueType(digLen, valueType = HtmlMakerInputEditValueTypes.asNumber) {
        this.digLen = digLen;
        this.valueType = valueType;
    }
    setListener(ctlName, parentName, callerName, headerName, footerName) {
        if (this.items === undefined)
            return false;
        this.dispose();
        this.callerName = callerName;
        this.ctlName = ctlName;
        // 2列 × n行 の次元を作成
        const nItem = this.items.length;
        const table = new HtmlMakerTable();
        const nCol = this.editType === HtmlMakerInputEditTypes.KeyValue ? 2 : 1;
        table.makeDim(nCol, nItem);
        let numPadEnable = this.valueType === HtmlMakerInputEditValueTypes.asNumber;
        let rowIndex = 0;
        for (const item of this.items) {
            let cellIndex = 0;
            let keyContent = ``;
            let keyToolTip = ``;
            if (this.editType === HtmlMakerInputEditTypes.KeyValue) {
                keyContent = item.key;
                keyToolTip = this.keyToolTip;
            }
            else {
                keyContent = item.text;
                keyToolTip = this.valueToolTip;
            }
            const key = new HtmlMakerOptionInput();
            key.value = keyContent;
            key.placeholder = keyToolTip;
            if (this.editType !== HtmlMakerInputEditTypes.KeyValue) {
                key.disableKeyDown = numPadEnable;
                key.enableClicked = numPadEnable;
            }
            table.getCell(cellIndex, rowIndex).typeInfo.setInput(key);
            table.getCell(cellIndex, rowIndex).className = `${ctlName}-key-${rowIndex + 1}`;
            table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
            table.getCell(cellIndex, rowIndex).typeInfo.toolTip = keyToolTip;
            if (this.editType === HtmlMakerInputEditTypes.KeyValue) {
                cellIndex++;
                const value = new HtmlMakerOptionInput();
                value.value = item.text;
                value.placeholder = this.valueToolTip;
                value.disableKeyDown = numPadEnable;
                value.enableClicked = numPadEnable;
                table.getCell(cellIndex, rowIndex).typeInfo.setInput(value);
                table.getCell(cellIndex, rowIndex).className = `${ctlName}-text-${rowIndex + 1}`;
                table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
                table.getCell(cellIndex, rowIndex).typeInfo.toolTip = this.valueToolTip;
            }
            rowIndex++;
        }
        const parentElem = this.firstAction(ctlName, parentName);
        if (parentElem === null) {
            //console.log(`[setListener] cannot found ${parentName}`)
            return false;
        }
        const ctlHTML = table.ToScrollHTML(ctlName, ctlName);
        const item = new HtmlMakerItem;
        item.props.name = ``;
        item.props.id = this.tblCssName();
        item.props.className = this.tblCssName();
        item.props.option.setTable(ctlHTML);
        item.props.option.onSelect = async (evArgs) => {
            console.log(`[HtmlMakerInputEdit] classify = ${evArgs.classify} targetId = ${evArgs.targetId}`);
            if (this.onSelect !== undefined) {
                this.showNumpad(evArgs, this.digLen);
            }
        };
        this.htmlMaker = new HtmlMaker();
        this.htmlMaker.add(item);
        const tableHtml = this.htmlMaker.ToHTML();
        let ctlElem = document.createElement("dialog");
        ctlElem.className = ctlName;
        ctlElem.innerHTML = tableHtml;
        this.ctlElem = ctlElem;
        let div = ctlElem.children[0];
        let tbl = div.children[0];
        tbl.className = `${this.tblCssName()}`;
        tbl.id = `${this.tblCssName()}`;
        this.ctlElem.appendChild(tbl);
        div.remove();
        div = null;
        if (headerName !== ``) {
            this.headerElem = document.createElement("div");
            this.headerElem.className = headerName;
            this.headerElem.id = headerName;
            ctlElem.appendChild(this.headerElem);
        }
        parentElem.appendChild(this.ctlElem);
        if (footerName !== ``) {
            this.footerElem = document.createElement("div");
            this.footerElem.className = footerName;
            this.footerElem.id = footerName;
            ctlElem.appendChild(this.footerElem);
        }
        this.table = table;
        return true;
    }
    show(left, top) {
        if (this.ctlElem === null)
            return;
        this.ctlElem.style.left = `${left}px`;
        this.ctlElem.style.top = `${top}px`;
        this.ctlElem.show();
    }
    applyCss() {
        const styleId = `${this.getBaseElem().className}-inputedit-style`;
        if (document.getElementById(styleId))
            return;
        const style = this.appendStyle(styleId);
        style.textContent = `
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
  height: 180px;
overflow-y: auto;
${HtmlMakerCommonCss.scrollBarText}
}
[class^="${this.ctlName}-key-"] {
height: 25px;
}
[class^="${this.ctlName}-text-"] {
height: 25px;
}
        `.trim();
    }
    enableEvents(onSelect) {
        if (this.ctlElem === null)
            return false;
        this.htmlMaker.enableTableEvents(this.ctlElem.className);
        this.onSelect = onSelect;
        return true;
    }
    disableEvents() {
        if (this.ctlElem === null)
            return false;
        this.htmlMaker.disableTableEvents(this.ctlElem.className);
        return true;
    }
    /*
    public setVisible(visible: boolean) {
        if (this.ctlElem === null) return false
        this.ctlElem.hidden = !visible
        return true
    }
    */
    dispose() {
        super.dispose();
        if (this.headerElem !== null) {
            const parentElem = this.headerElem.parentElement;
            parentElem?.removeChild(this.headerElem);
            this.headerElem.remove();
        }
        if (this.footerElem !== null) {
            const parentElem = this.footerElem.parentElement;
            parentElem?.removeChild(this.footerElem);
            this.footerElem.remove();
        }
        if (this.ctlElem !== null) {
            const parentElem = this.ctlElem.parentElement;
            parentElem?.removeChild(this.ctlElem);
            this.ctlElem.remove();
        }
        this.disableEvents();
        this.ctlElem = null;
    }
    /*
    private resultTable(): HTMLTableElement | null {
        const ctlName = `.${this.ctlName}`
        const divList = document!.querySelectorAll(ctlName)
        if (divList === null) return null
        if (divList.length <= 0) return null
        const div = divList[0] as HTMLDivElement

        const tableName = `.${this.tblCssName()}`
        const tableList = div.querySelectorAll(tableName)
        if (tableList === null) return null
        if (tableList.length <= 0) return null
        const table = tableList[0] as HTMLTableElement

        return table
    }
    */
    editedResult() {
        const table = this.resultTable(this.tblCssName());
        if (table === null)
            return undefined;
        let res = ``;
        for (const row of table.rows) {
            if (row === null)
                continue;
            if (this.editType === HtmlMakerInputEditTypes.KeyValue) {
                const keyElem = row.cells[0];
                const valueElem = row.cells[1];
                if (keyElem === null)
                    continue;
                if (valueElem === null)
                    continue;
                const keyText = this.table.getElemValue(keyElem) || ``;
                const valueText = this.table.getElemValue(valueElem) || ``;
                if (res === ``)
                    res = keyText + this.itemDelimiter + valueText;
                else
                    res += this.pairDelimiter + keyText + this.itemDelimiter + valueText;
            }
            else {
                const valueElem = row.cells[0];
                if (valueElem === null)
                    continue;
                const valueText = this.table.getElemValue(valueElem) || ``;
                if (res === ``)
                    res = `${valueText}`;
                else
                    res += this.pairDelimiter + valueText;
            }
        }
        return res;
    }
    numpad = null;
    showNumpad(evArgs, digLen) {
        const canNumpad = evArgs.KeyEnter === HtmlMakerKeyEnterTypes.Special ||
            evArgs.eventType === HtmlMakerEventTypes.Click;
        if (canNumpad) {
            if (this.numpad !== null)
                return;
            const rcCol = this.table.getCellRect(evArgs.parentElem);
            //const rcTbl = this.table.getTableOwnerRect(evArgs.parentElem!)
            //console.log(`[showNumpad] rcCol`, rcCol)
            //console.log(`[showNumpad] rcTbl`, rcTbl)
            //呼び出し元セル名
            /*
            const callerName = this.table.makeCallerName(evArgs.classify, evArgs.targetId)
            const callerElem = this.table.getCallerCellElem(callerName)
            let callerText = ``
            if (callerElem !== null) {
                const inputElem = callerElem as HTMLInputElement
                callerText = inputElem.value
            }
            */
            const callerName = evArgs.classify;
            const callerElem = document.getElementsByClassName(evArgs.classify);
            let callerText = ``;
            if (callerElem.length >= 1) {
                const inputElem = callerElem[0];
                callerText = inputElem.value;
            }
            let posLeft = ``;
            if (this.editType === HtmlMakerInputEditTypes.KeyValue) {
                //posLeft = `270`
                posLeft = `${parseInt(rcCol.width) + parseInt(rcCol.width) / 2}`;
            }
            else {
                //posLeft = `90`
                posLeft = `${parseInt(rcCol.width) / 2}`;
            }
            console.log(`[showNumpad] posLeft`, posLeft);
            const numpadName = `${this.ctlName}-numpad`;
            const numpad = new HtmlMakerNumPad();
            numpad.setNum(callerText);
            numpad.maxDig = digLen;
            numpad.setListener(numpadName, this.resultTable(this.tblCssName()).className, callerName);
            numpad.applyCss();
            /*
            numpad.show(
                `${parseInt(rcCol.left) - parseInt(rcTbl.left) + 10}`,
                `${parseInt(rcCol.top) - parseInt(rcTbl.top) + 10}`)
            */
            numpad.show(posLeft, `4`);
            numpad.enableEvents(
            /*onApply*/
            (ev) => {
                console.log(`[onApply] ${ev.callerName} ${ev.result}`);
                //const notifyElem = this.table.getCallerCellElem(ev.callerName)
                const notifyElem = document.getElementsByClassName(evArgs.classify);
                if (notifyElem !== null) {
                    //const inputElem = notifyElem as HTMLInputElement
                    const inputElem = notifyElem[0];
                    inputElem.value = ev.result;
                }
                this.closeNumpad();
            });
            //this.enableWindowEvent()
            this.numpad = numpad;
        }
    }
    closeNumpad() {
        //this.disableWindowEvent()
        if (this.numpad === null)
            return;
        this.numpad.dispose();
        this.numpad = null;
    }
    tblCssName() { return `${this.ctlName}-tbl`; }
}
export class HtmlMakerNumPad extends HtmlMakerCtlBase {
    num = `0`;
    edit = `0`;
    maxDig = 7;
    errText = `NaN`;
    callerName = ``;
    prevPad = ``;
    htmlMaker = new HtmlMaker();
    table = new HtmlMakerTable();
    onSelect;
    setNum(num) {
        if (num.length === 0) {
            this.num = `0`;
            this.edit = ``;
        }
        else if (num.length <= this.maxDig) {
            if (num.length !== 0) {
                let isErr = false;
                for (let i = 0; i < num.length; i++) {
                    const ch = num.charAt(i);
                    if (/[0-9]/.test(ch) === false) {
                        isErr = true;
                        break;
                    }
                }
                if (isErr) {
                    this.num = this.errText;
                    this.edit = this.errText;
                }
                else {
                    this.num = num;
                    this.edit = num;
                }
            }
        }
    }
    setListener(ctlName, parentName, callerName) {
        if (this.num === undefined)
            return false;
        this.dispose();
        this.callerName = callerName;
        this.ctlName = ctlName;
        // 各パーツの次元を作成
        /*
        table1:[1234567]
        table2:[AC][ESC]
        table3:[7][8][9]
               [4][5][6]
               [1][2][3]
        table4:[0][ENTR]
        */
        const table1 = new HtmlMakerTable();
        table1.makeDim(1, 1);
        const table2 = new HtmlMakerTable();
        table2.makeDim(2, 1);
        const table3 = new HtmlMakerTable();
        table3.makeDim(3, 3);
        const table4 = new HtmlMakerTable();
        table4.makeDim(2, 1);
        table1.getCell(0, 0).typeInfo.setLabel(`${this.num}`, false);
        table1.getCell(0, 0).className = this.resultCssName();
        table1.getCell(0, 0).typeInfo.using.itemId = 0;
        table2.getCell(0, 0).typeInfo.setButton(`AC`);
        table2.getCell(0, 0).className = this.acCssName();
        table2.getCell(0, 0).typeInfo.using.itemId = 0;
        table2.getCell(1, 0).typeInfo.setButton(`ESC`);
        table2.getCell(1, 0).className = this.escCssName();
        table2.getCell(1, 0).typeInfo.using.itemId = 1;
        table2.getCell(1, 0).typeInfo.toolTip = `1回タップ：元の値に戻す\n2回タップ：入力キャンセル`;
        let padIndex = 0;
        for (const pad of [7, 8, 9, 4, 5, 6, 1, 2, 3]) {
            const col = padIndex % 3;
            const row = Math.floor(padIndex / 3);
            table3.getCell(col, row).typeInfo.setButton(`${pad}`);
            table3.getCell(col, row).className = `${ctlName}-pad-${pad}`;
            table3.getCell(col, row).typeInfo.using.itemId = padIndex;
            padIndex++;
        }
        table4.getCell(0, 0).typeInfo.setButton(`0`);
        table4.getCell(0, 0).className = `${ctlName}-pad-0`;
        table4.getCell(0, 0).typeInfo.using.itemId = 0;
        table4.getCell(1, 0).typeInfo.setButton(`ENTR`);
        table4.getCell(1, 0).className = this.entrCssName();
        table4.getCell(1, 0).typeInfo.using.itemId = 1;
        table4.getCell(1, 0).typeInfo.toolTip = `入力確定`;
        const parentElem = this.firstAction(ctlName, parentName);
        if (parentElem === null) {
            console.log(`[setListener] cannot found ${parentName}`);
            return false;
        }
        const cltHTMLs = new Map;
        cltHTMLs.set(`pad1`, table1.ToScrollHTML(ctlName, ctlName));
        cltHTMLs.set(`pad2`, table2.ToScrollHTML(ctlName, ctlName));
        cltHTMLs.set(`pad3`, table3.ToScrollHTML(ctlName, ctlName));
        cltHTMLs.set(`pad4`, table4.ToScrollHTML(ctlName, ctlName));
        let ctlElem = document.createElement("dialog");
        ctlElem.className = ctlName;
        this.ctlElem = ctlElem;
        for (const [key, ctlHTML] of cltHTMLs) {
            const tblName = this.tblCssName(key);
            const item = new HtmlMakerItem;
            item.props.name = ``;
            item.props.id = tblName;
            item.props.className = tblName;
            item.props.option.setTable(ctlHTML);
            item.props.option.onSelect = async (evArgs) => {
                console.log(`classify = ${evArgs.classify} targetId = ${evArgs.targetId}`);
                if (this.onSelect !== undefined) {
                    const resultCell = this.resultCell();
                    if (resultCell === null)
                        return;
                    const nowValue = resultCell.textContent;
                    switch (evArgs.classify) {
                        case this.acCssName():
                            resultCell.textContent = `0`;
                            this.prevPad = this.acCssName();
                            break;
                        case this.escCssName():
                            resultCell.textContent = this.edit !== `` ? this.edit : `0`;
                            if (this.prevPad === this.escCssName()) {
                                //ESC２回クリックはキャンセル
                                const evCtl = new HtmlMakerCtlEvent();
                                evCtl.callerName = this.callerName;
                                evCtl.result = this.edit;
                                await this.onSelect(evCtl);
                            }
                            this.prevPad = this.escCssName();
                            break;
                        case this.entrCssName():
                            this.num = resultCell.textContent;
                            const evCtl = new HtmlMakerCtlEvent();
                            evCtl.callerName = this.callerName;
                            evCtl.result = this.num;
                            await this.onSelect(evCtl);
                            break;
                        case ``:
                            //<tr>や<td>をクリックした
                            break;
                        default:
                            if (this.maxDig === 1) {
                                const dig = evArgs.classify.charAt(evArgs.classify.length - 1);
                                resultCell.textContent = dig;
                                this.prevPad = dig;
                            }
                            if (nowValue.length >= this.maxDig)
                                return;
                            const dig = evArgs.classify.charAt(evArgs.classify.length - 1);
                            const isInit = nowValue === `0` || nowValue === this.edit;
                            resultCell.textContent = isInit ? dig : resultCell.textContent + dig;
                            this.prevPad = dig;
                            break;
                    }
                }
            };
            const htmlMaker = new HtmlMaker();
            htmlMaker.add(item);
            const tableHtml = htmlMaker.ToHTML();
            const tableDiv = HtmlMakerMisc.ToElem(tableHtml);
            this.htmlMaker.add(item);
            let div = tableDiv;
            let tbl = div.children[0];
            tbl.className = tblName;
            tbl.id = tblName;
            this.ctlElem.appendChild(tbl);
            div.remove();
            div = null;
        }
        parentElem.appendChild(this.ctlElem);
        this.table = table1;
        return true;
    }
    show(left, top) {
        if (this.ctlElem === null)
            return;
        this.ctlElem.style.left = `${left}px`;
        this.ctlElem.style.top = `${top}px`;
        this.ctlElem.show();
    }
    applyCss() {
        const styleId = `${this.getBaseElem().className}-numpad-style`;
        if (document.getElementById(styleId))
            return;
        const style = this.appendStyle(styleId);
        style.textContent = `
${this.getOuterCssText()}
.${this.tblCssName(`pad1`)} {
  ${this.getBaseCssText()}
}
.${this.tblCssName(`pad1`)} {
width: 100%;
white-space: nowrap;
display: flex;
justify-content: flex-end;
}

[class^="${this.tblCssName(`pad2`)}"] {
border-radius: 4px;
display: flex;
justify-content: center;
}
[class^="${this.tblCssName(`pad2`)}"] button {
cursor: pointer;
}

[class^="${this.tblCssName(`pad3`)}"] {
border-radius: 4px;
display: flex;
justify-content: center;
}
[class^="${this.tblCssName(`pad3`)}"] button {
cursor: pointer;
border-radius: 4px;
border: 1px solid black;
display: flex;
width: 100%;
height: 100%;
}

[class^="${this.tblCssName(`pad4`)}"] {
border-radius: 4px;
display: flex;
justify-content: center;
}
[class^="${this.tblCssName(`pad4`)}"] button {
cursor: pointer;
}
        `.trim();
    }
    enableEvents(onSelect) {
        if (this.ctlElem === null)
            return false;
        this.htmlMaker.enableTableEvents(this.ctlElem.className);
        this.onSelect = onSelect;
        return true;
    }
    disableEvents() {
        if (this.ctlElem === null)
            return false;
        this.htmlMaker.disableTableEvents(this.ctlElem.className);
        return true;
    }
    /*
    public setVisible(visible: boolean) {
        if (this.ctlElem === null) return false
        this.ctlElem.hidden = !visible
        return true
    }
    */
    dispose() {
        super.dispose();
        if (this.ctlElem !== null) {
            const parentElem = this.ctlElem.parentElement;
            parentElem?.removeChild(this.ctlElem);
            this.ctlElem.remove();
        }
        this.disableEvents();
        this.ctlElem = null;
    }
    /*
    private resultTable(): HTMLTableElement | null {
        const ctlName = `.${this.ctlName}`
        const divList = document!.querySelectorAll(ctlName)
        if (divList === null) return null
        if (divList.length <= 0) return null
        const div = divList[0] as HTMLDivElement

        const tableName = `.${this.tblCssName(`pad1`)}`
        const tableList = div.querySelectorAll(tableName)
        if (tableList === null) return null
        if (tableList.length <= 0) return null
        const table = tableList[0] as HTMLTableElement

        return table
    }
    */
    resultCell() {
        const table = this.resultTable(this.tblCssName(`pad1`));
        if (table === null)
            return null;
        return table.rows[0].cells[0];
    }
    tblCssName(id) { return `${this.ctlName}-tbl-${id}`; }
    resultCssName() { return `${this.ctlName}-result`; }
    acCssName() { return `${this.ctlName}-ac`; }
    escCssName() { return `${this.ctlName}-esc`; }
    entrCssName() { return `${this.ctlName}-entr`; }
}
export class HtmlMakerGuideBarItem {
    value = new HtmlMakerTableCell();
}
export class HtmlMakerGuideBar extends HtmlMakerCtlBase {
    items;
    indexList;
    cells;
    callerName = ``;
    htmlMaker = new HtmlMaker();
    table = new HtmlMakerTable();
    onSelect;
    setGuidetems(items) {
        this.items = items;
    }
    setListener(ctlName, parentName, callerName) {
        if (this.items === undefined)
            return false;
        this.dispose();
        this.callerName = callerName;
        this.ctlName = ctlName;
        // n列 × 1行 の次元を作成
        const nItem = this.items.size;
        const table = new HtmlMakerTable();
        table.makeDim(nItem, 1);
        this.indexList = new Map;
        let colIndex = 0;
        for (const [key, item] of this.items) {
            table.getCell(colIndex, 0).typeInfo = item.value.items[0].typeInfo;
            table.getCell(colIndex, 0).className = item.value.items[0].className;
            table.getCell(colIndex, 0).typeInfo.using.itemId = colIndex;
            this.indexList.set(key, colIndex);
            colIndex++;
        }
        const parentElem = this.firstAction(ctlName, parentName);
        if (parentElem === null) {
            //console.log(`[setListener] cannot found ${parentName}`)
            return false;
        }
        const ctlHTML = table.ToScrollHTML(ctlName, this.tblCssName());
        const item = new HtmlMakerItem;
        item.props.name = ``;
        item.props.id = this.tblCssName();
        item.props.className = this.tblCssName();
        item.props.option.setTable(ctlHTML);
        item.props.option.onSelect = async (evArgs) => {
            if (this.onSelect !== undefined) {
                //console.log(`classify = ${evArgs.classify} targetId = ${evArgs.targetId}`)
                const evCtl = new HtmlMakerCtlEvent();
                evCtl.callerName = evArgs.classify;
                evCtl.result = evArgs.selectedValue;
                await this.onSelect(evCtl);
            }
        };
        this.htmlMaker = new HtmlMaker();
        this.htmlMaker.add(item);
        const tableHtml = this.htmlMaker.ToHTML();
        let ctlElem = document.createElement("dialog");
        ctlElem.className = ctlName;
        ctlElem.innerHTML = tableHtml;
        this.ctlElem = ctlElem;
        let div = ctlElem.children[0];
        const divName = this.divCssName();
        div.className = divName;
        div.id = divName;
        let tbl = div.children[0];
        tbl.className = `${this.tblCssName()}`;
        tbl.id = `${this.tblCssName()}`;
        parentElem.appendChild(this.ctlElem);
        this.table = table;
        this.table.height = `36`;
        this.table.fontSize = `0.6`;
        const tableElem = this.resultTable(this.tblCssName());
        this.cells = new Array;
        if (tableElem !== null) {
            const row = tableElem.rows[0];
            if (row !== null) {
                const cells = this.table.getCellElems(row);
                if (cells !== null) {
                    for (const elems of cells) {
                        for (const elem of elems) {
                            this.cells.push(elem);
                        }
                    }
                }
            }
        }
        return true;
    }
    show(left, top) {
        if (this.ctlElem === null)
            return;
        this.ctlElem.style.left = `${left}px`;
        this.ctlElem.style.top = `${top}px`;
        this.ctlElem.show();
    }
    setFontConfig(sizeEm = `0.9`) {
        this.table.setFontConfig(sizeEm);
    }
    applyCss() {
        const styleId = `${this.getBaseElem().className}-guidebar-style`;
        if (document.getElementById(styleId))
            return;
        let cellsCss = ``;
        for (const cell of this.cells) {
            const cellClassName = cell.className;
            if (cellClassName === ``)
                continue;
            cellsCss += `
.${cellClassName} {
${this.table.getItemCssText()}
}
`;
        }
        const style = this.appendStyle(styleId);
        style.textContent = `
${this.getOuterCssText()}
${HtmlMakerCommonCss.getTableCssText(this.divCssName(), this.table.height)}
.${this.ctlName} {
width: 360px;
}
${cellsCss}
        `.trim();
    }
    enableEvents(onSelect) {
        if (this.ctlElem === null)
            return false;
        this.htmlMaker.enableTableEvents(this.ctlElem.className);
        this.onSelect = onSelect;
        return true;
    }
    disableEvents() {
        if (this.ctlElem === null)
            return false;
        this.htmlMaker.disableTableEvents(this.ctlElem.className);
        return true;
    }
    /*
    public setVisible(visible: boolean) {
        if (this.ctlElem === null) return false
        this.ctlElem.hidden = !visible
        return true
    }
    public getVisible() {
        if (this.ctlElem === null) return false
        return this.ctlElem.hidden === true ? false : true
    }
    */
    setTextByIndex(index, text) {
        if (this.cells === undefined)
            return false;
        if (0 <= index && index < this.cells.length) {
            this.cells[index].textContent = text;
            return true;
        }
        return false;
    }
    setTextByKey(key, text) {
        if (this.cells === undefined)
            return false;
        if (this.indexList === undefined)
            return false;
        if (this.indexList.has(key) === false)
            return false;
        const index = this.indexList.get(key);
        if (index === undefined)
            return false;
        this.cells[index].textContent = text;
        return true;
    }
    dispose() {
        super.dispose();
        if (this.ctlElem !== null) {
            const parentElem = this.ctlElem.parentElement;
            parentElem?.removeChild(this.ctlElem);
            this.ctlElem.remove();
        }
        this.disableEvents();
        this.ctlElem = null;
    }
    divCssName() { return `${this.ctlName}-div`; }
    tblCssName() { return `${this.ctlName}-tbl`; }
}
export class HtmlMakerGroupTableItem {
    tblCssName = ``;
    table;
    onSelect;
    htmlMaker;
}
export class HtmlMakerGroupTablePair {
    headerElem = null;
    subTblElem = null;
    headerItem;
    subTblItem;
}
export const HtmlMakerGroupTableFooterTypes = {
    none: "none",
    OkCancel: "OkCancel",
};
export class HtmlMakerGroupTable extends HtmlMakerCtlBase {
    items = new Array;
    firstRowIndex = 1;
    /** 全行に操作を適用する */
    static allRowAction = -1;
    callerName = ``;
    htmlMaker = new HtmlMaker();
    table = new HtmlMakerTable();
    onSelect;
    headerName = ``;
    footerName = ``;
    headerElem = null;
    footerElem = null;
    makeSubTable(tblItem) {
        const className = tblItem.tblCssName;
        const tblHTML = tblItem.table.ToHTML(className, className);
        const item = new HtmlMakerItem;
        item.props.name = ``;
        item.props.id = className;
        item.props.className = className;
        item.props.option.setTable(tblHTML);
        item.props.option.onSelect = async (evArgs) => {
            if (this.onSelect !== undefined) {
                //console.log(`classify = ${evArgs.classify} targetId = ${evArgs.targetId}`)
                const evCtl = new HtmlMakerCtlEvent();
                evCtl.callerName = evArgs.classify;
                evCtl.result = evArgs.selectedValue;
                await this.onSelect(evCtl);
                if (evArgs.cancel)
                    return;
            }
            for (const pair of this.items) {
                if (evArgs.classify.includes(pair.headerItem.tblCssName)) {
                    //console.log(`[headerEvt] classify = ${evArgs.classify} targetId = ${evArgs.targetId}`)
                    if (pair.headerItem.onSelect !== undefined) {
                        pair.headerItem.onSelect(evArgs);
                    }
                    break;
                }
                if (evArgs.classify.includes(pair.subTblItem.tblCssName)) {
                    //console.log(`[subTblEvt] classify = ${evArgs.classify} targetId = ${evArgs.targetId}`)
                    if (pair.subTblItem.onSelect !== undefined) {
                        pair.subTblItem.onSelect(evArgs);
                    }
                    break;
                }
            }
        };
        const htmlMaker = tblItem.htmlMaker;
        htmlMaker.add(item);
        const tableHtml = htmlMaker.ToHTML();
        const tbl = HtmlMakerMisc.ToElem(tableHtml);
        tblItem.htmlMaker = htmlMaker;
        return tbl;
    }
    addGroupPair(tiHeader, tiSubTbl) {
        const pair = new HtmlMakerGroupTablePair();
        if (tiHeader.htmlMaker === undefined)
            tiHeader.htmlMaker = new HtmlMaker();
        if (tiSubTbl.htmlMaker === undefined)
            tiSubTbl.htmlMaker = new HtmlMaker();
        const header = this.makeSubTable(tiHeader);
        const subTable = this.makeSubTable(tiSubTbl);
        pair.headerElem = header;
        pair.subTblElem = subTable;
        pair.headerItem = tiHeader;
        pair.subTblItem = tiSubTbl;
        this.items.push(pair);
    }
    makeHeader() {
        this.headerName = `-header`; //仮のクラス名
        this.headerElem = document.createElement("div");
    }
    makeFooter(type = HtmlMakerGroupTableFooterTypes.OkCancel) {
        this.footerName = `-footer-${type}`; //仮のクラス名
        this.footerElem = document.createElement("div");
    }
    onOkClickFooter = async (event) => {
        if (this.onSelect !== undefined) {
            const evArgs = new HtmlMakerCtlEvent();
            evArgs.callerName = this.callerName;
            evArgs.result = ``;
            evArgs.classify = HtmlMakerCtlEventTypes.Ok;
            evArgs.notify = this;
            await this.onSelect(evArgs);
        }
    };
    onCancelClickFooter = async (event) => {
        if (this.onSelect !== undefined) {
            const evArgs = new HtmlMakerCtlEvent();
            evArgs.callerName = this.callerName;
            evArgs.result = ``;
            evArgs.classify = HtmlMakerCtlEventTypes.Cancel;
            evArgs.notify = this;
            await this.onSelect(evArgs);
        }
    };
    setListener(ctlName, parentName, callerName) {
        if (this.items === undefined)
            return false;
        this.dispose();
        this.callerName = callerName;
        this.ctlName = ctlName;
        // 1列 × 2×n行 の次元を作成
        const nItem = this.items.length;
        const table = new HtmlMakerTable();
        table.makeDim(1, 2 * nItem);
        let rowIndex = 0;
        for (const item of this.items) {
            if (item.headerElem !== null) {
                table.getCell(0, rowIndex).typeInfo.setLowerTable();
                //table.getCell(0, rowIndex).className = item.subTable.className
                //table.getCell(0, rowIndex).typeInfo.using.itemId = rowIndex
                rowIndex++;
            }
            if (item.subTblElem !== null) {
                table.getCell(0, rowIndex).typeInfo.setLowerTable();
                //table.getCell(0, rowIndex).className = item.subTable.className
                //table.getCell(0, rowIndex).typeInfo.using.itemId = rowIndex
                rowIndex++;
            }
        }
        const parentElem = this.firstAction(ctlName, parentName);
        if (parentElem === null) {
            //console.log(`[setListener] cannot found ${parentName}`)
            return false;
        }
        const ctlHTML = table.ToScrollHTML(ctlName, this.tblCssName());
        const item = new HtmlMakerItem;
        item.props.name = ``;
        item.props.id = this.tblCssName();
        item.props.className = this.tblCssName();
        item.props.option.setTable(ctlHTML);
        item.props.option.onSelect = async (evArgs) => {
            if (this.onSelect !== undefined) {
                //console.log(`classify = ${evArgs.classify} targetId = ${evArgs.targetId}`)
                const evCtl = new HtmlMakerCtlEvent();
                evCtl.callerName = evArgs.classify;
                evCtl.result = evArgs.selectedValue;
                await this.onSelect(evCtl);
            }
        };
        this.htmlMaker = new HtmlMaker();
        this.htmlMaker.add(item);
        const tableHtml = this.htmlMaker.ToHTML();
        //イベント認識に必要
        for (const item of this.items) {
            if (item.headerItem !== undefined) {
                for (const hItem of item.headerItem.htmlMaker.itemList) {
                    this.htmlMaker.add(hItem);
                }
            }
            if (item.subTblItem !== undefined) {
                for (const sItem of item.subTblItem.htmlMaker.itemList) {
                    this.htmlMaker.add(sItem);
                }
            }
        }
        let ctlElem = document.createElement("dialog");
        ctlElem.className = ctlName;
        ctlElem.innerHTML = tableHtml;
        this.ctlElem = ctlElem;
        let div = ctlElem.children[0];
        const divName = this.divCssName();
        div.className = divName;
        div.id = divName;
        let tbl = div.children[0];
        tbl.className = `${this.tblCssName()}`;
        tbl.id = `${this.tblCssName()}`;
        rowIndex = 0;
        let itemIndex = 0;
        for (const row of tbl.rows) {
            if ((rowIndex % 2) === 0) {
                const cell = row.cells[0];
                cell.appendChild(this.items[itemIndex].headerElem);
                rowIndex++;
            }
            else {
                const cell = row.cells[0];
                cell.appendChild(this.items[itemIndex].subTblElem);
                rowIndex++;
                itemIndex++;
            }
        }
        if (this.headerElem !== null) {
            this.headerElem.className = this.headerName;
            this.headerElem.id = this.headerName;
            ctlElem.appendChild(this.headerElem);
        }
        parentElem.appendChild(this.ctlElem);
        if (this.footerElem !== null) {
            const footerCssName = this.footerCssName();
            this.footerElem.className = footerCssName;
            this.footerElem.id = footerCssName;
            ctlElem.appendChild(this.footerElem);
            //"Ok/Cancel"を標準で装着する場合
            if (this.footerName.endsWith(HtmlMakerGroupTableFooterTypes.OkCancel)) {
                const okBtn = `${footerCssName}-okBtn`;
                const canBtn = `${footerCssName}-canBtn`;
                let btns = `
<button id="${okBtn}">OK</button>
<button id="${canBtn}">CANCEL</button>
`.trim();
                this.footerElem.innerHTML = btns;
                document.getElementById(okBtn).onclick = this.onOkClickFooter;
                document.getElementById(canBtn).onclick = this.onCancelClickFooter;
            }
        }
        this.table = table;
        return true;
    }
    show(left, top) {
        if (this.ctlElem === null)
            return;
        this.ctlElem.style.left = `${left}px`;
        this.ctlElem.style.top = `${top}px`;
        this.ctlElem.show();
    }
    enableEvents(onSelect) {
        if (this.ctlElem === null)
            return false;
        const excludeClassList = new Array;
        excludeClassList.push(this.items[0].headerItem.tblCssName);
        excludeClassList.push(this.items[0].subTblItem.tblCssName);
        this.htmlMaker.enableTableEvents(this.ctlElem.className, excludeClassList);
        this.onSelect = onSelect;
        return true;
    }
    disableEvents() {
        if (this.ctlElem === null)
            return false;
        this.htmlMaker.disableTableEvents(this.ctlElem.className);
        return true;
    }
    dispose() {
        super.dispose();
        if (this.headerElem !== null) {
            const parentElem = this.headerElem.parentElement;
            parentElem?.removeChild(this.headerElem);
            this.headerElem.remove();
        }
        if (this.footerElem !== null) {
            const parentElem = this.footerElem.parentElement;
            parentElem?.removeChild(this.footerElem);
            this.footerElem.remove();
        }
        if (this.ctlElem !== null) {
            const parentElem = this.ctlElem.parentElement;
            parentElem?.removeChild(this.ctlElem);
            this.ctlElem.remove();
        }
        this.disableEvents();
        this.ctlElem = null;
    }
    setSize(heightPx = `300`) {
        let footerHeight = 0;
        if (this.footerElem !== null) {
            const rc = this.htmlMaker.GetRect(this.footerElem);
            footerHeight = Number(rc.height);
        }
        this.table.height = `${Number(heightPx) - footerHeight}`;
        this.height = Number(heightPx) + HtmlMakerCommonCss.footerPadding;
    }
    height = 0;
    setFontConfig(sizeEm = `0.9`) {
        this.table.setFontConfig(sizeEm);
    }
    get cssText() {
        const footerCssName = this.footerCssName();
        const footerCssText = this.footerName !== `` ? `
/*フッター背景*/
[class^="${footerCssName}"] {
${HtmlMakerCommonCss.footerText()}
}
/*フッターのボタン*/
[class^="${footerCssName}"] button {
${HtmlMakerCommonCss.footerButtonText()}
}
`.trim() : ``;
        return `
${this.getOuterCssText()}
${HtmlMakerCommonCss.getTableCssText(this.divCssName(), this.table.height)}
${footerCssText}
`.trim();
    }
    divCssName() { return `${this.ctlName}-div`; }
    tblCssName() { return `${this.ctlName}-tbl`; }
    headerCssName() { return `${this.ctlName}${this.headerName}`; }
    footerCssName() { return `${this.ctlName}${this.footerName}`; }
}
export class HtmlMakerListViewGroupImgProp {
    url = ``;
    toolTip = ``;
}
export class HtmlMakerListViewGroup extends HtmlMakerGroupTable {
    checkClassName = ``;
    subTblClassName = ``;
    imgClassName = ``;
    imgSize = 100;
    bgColor = `${HtmlMakerCommonCss.onColor}66`;
    onSelectHeader = async (evArgs) => {
        //console.log(evArgs)
        const classNames = evArgs.classify.split(`-`);
        if (classNames.length >= 1)
            this.setCheck(Number(classNames[classNames.length - 1]));
    };
    onSelectSubTbl = async (evArgs) => {
        console.log(evArgs);
    };
    makeCheckHeader(className, title, rowIndex) {
        const table = new HtmlMakerTable();
        table.makeDim(1, 1);
        this.checkClassName = `${className}-check`;
        const check = new HtmlMakerOptionCheck();
        check.placeholder = title;
        check.value = false;
        check.enableClicked = `true`;
        const checkCell = new HtmlMakerTableCell();
        checkCell.makeItems();
        checkCell.items[0].typeInfo.setCheck(check);
        checkCell.items[0].className = `${this.checkClassName}-${rowIndex}`;
        table.getCell(0, 0).typeInfo = checkCell.items[0].typeInfo;
        table.getCell(0, 0).className = checkCell.items[0].className;
        table.getCell(0, 0).typeInfo.using.itemId = 1;
        table.getCell(0, 0).typeInfo.toolTip = title;
        const tiHeader = new HtmlMakerGroupTableItem();
        tiHeader.tblCssName = className;
        tiHeader.table = table;
        tiHeader.onSelect = this.onSelectHeader;
        return tiHeader;
    }
    makeImgSubTbl(className, props, rowIndex) {
        const table = new HtmlMakerTable();
        table.makeDim(props.length, 1);
        this.subTblClassName = className;
        this.imgClassName = `${className}-img`;
        let colIndex = 0;
        for (const prop of props) {
            const img = new HtmlMakerOptionImg();
            img.imgFile = ``;
            img.imgSrc = prop.url;
            img.alt = ``;
            const imgCell = new HtmlMakerTableCell();
            imgCell.makeItems();
            imgCell.items[0].typeInfo.setImg(img);
            imgCell.items[0].className = `${this.imgClassName}-${rowIndex}-${colIndex}`;
            table.getCell(colIndex, 0).typeInfo = imgCell.items[0].typeInfo;
            table.getCell(colIndex, 0).className = imgCell.items[0].className;
            table.getCell(colIndex, 0).typeInfo.using.itemId = colIndex;
            table.getCell(colIndex, 0).typeInfo.toolTip = prop.toolTip;
            colIndex++;
        }
        const tiSubTbl = new HtmlMakerGroupTableItem();
        tiSubTbl.tblCssName = className;
        tiSubTbl.table = table;
        tiSubTbl.onSelect = this.onSelectSubTbl;
        return tiSubTbl;
    }
    /**指定行をチェックON/OFF(他の行を関知しない) */
    setCheckByRow(rowIndex = this.firstRowIndex, check = true) {
        if (rowIndex === HtmlMakerGroupTable.allRowAction) {
            for (const row of this.items) {
                this.setCheckInternal(row);
            }
            return true;
        }
        if (rowIndex < 0 || rowIndex >= this.items.length)
            return false;
        const row = this.items[rowIndex - this.firstRowIndex];
        return this.setCheckInternal(row);
    }
    /**指定行をチェックON(他の行をOFF) */
    setCheck(rowIndex = this.firstRowIndex) {
        let curRowIndex = this.firstRowIndex;
        for (const row of this.items) {
            if (curRowIndex === rowIndex)
                this.setCheckInternal(row, true);
            else
                this.setCheckInternal(row, false);
            curRowIndex++;
        }
    }
    setCheckInternal(row, check = true) {
        const table = row.headerElem;
        if (table === null)
            return false;
        const rowElem = table.rows[0];
        for (const cellElem of rowElem.cells) {
            for (const divElem of cellElem.children) {
                if (divElem.tagName !== `DIV`)
                    continue;
                row.headerItem.table.setElemValue(divElem, check);
                break;
            }
            break;
        }
        return true;
    }
    getCheckMap() {
        const resMap = new Map;
        let curRowIndex = this.firstRowIndex;
        for (const row of this.items) {
            const table = row.headerElem;
            if (table === null)
                continue;
            const rowElem = table.rows[0];
            for (const cellElem of rowElem.cells) {
                for (const divElem of cellElem.children) {
                    if (divElem.tagName !== `DIV`)
                        continue;
                    const elemValue = row.headerItem.table.getElemValue(divElem);
                    const check = elemValue;
                    resMap.set(curRowIndex, check);
                    break;
                }
                break;
            }
            curRowIndex++;
        }
        return resMap;
    }
    checkedRow() {
        const map = this.getCheckMap();
        for (const [key, check] of map) {
            if (check === true)
                return key;
        }
        return -1;
    }
    /**指定の先頭IMGを選択(他は選択解除) */
    selectFirstCell(rowIndex = this.firstRowIndex) {
        if (rowIndex === HtmlMakerGroupTable.allRowAction) {
            for (const row of this.items) {
                this.selectFirstCellInternal(row);
            }
            return true;
        }
        if (rowIndex < 0 || rowIndex >= this.items.length)
            return false;
        const row = this.items[rowIndex - this.firstRowIndex];
        return this.selectFirstCellInternal(row);
    }
    selectFirstCellInternal(row) {
        const table = row.subTblElem;
        if (table === null)
            return false;
        const rowElem = table.rows[0];
        for (const cellElem of rowElem.cells) {
            for (const divElem of cellElem.children) {
                if (divElem.tagName !== `DIV`)
                    continue;
                divElem.classList.remove(`selected`);
            }
            if (cellElem.children.length >= 1) {
                cellElem.children[0].classList.add(`selected`);
                break;
            }
            break;
        }
        return true;
    }
    applyCss() {
        const styleId = `${this.getBaseElem().className}-listviewgroup-style`;
        if (document.getElementById(styleId))
            return;
        const spacingTable = HtmlMakerCommonCss.spacingTable;
        const style = this.appendStyle(styleId);
        style.textContent = `
${this.cssText}

.${this.ctlName} {
width: ${(this.imgSize + 4) * 5}px; height: ${this.imgSize + 50}px;
height: ${this.height}px;
}

[class^="${this.checkClassName}"] {
display: flex;
${HtmlMakerCommonCss.spanCssText(this.table.fontSize, false)}
width: 100%;            /* 幅を固定するとGridらしくなります */
}

[class^="${this.subTblClassName}"] {
${spacingTable}
}
[class^="${this.imgClassName}"] {
width: ${this.imgSize}px; height: ${this.imgSize}px;
    display: block;
}
[class^="cell-${this.imgClassName}"] {
position: relative;
    width: 100%;
    height: 100%;
    display: block; /* または flex */
}
[class^="cell-${this.imgClassName}"] .overlay {
    position: absolute;
    inset: 0; /* top:0; left:0; right:0; bottom:0; と同じ（最強のバリア） */
    
    /* 重ねた要素の中身を真ん中に配置したい場合（お好みで） */
    display: flex;
    justify-content: center;
    align-items: center;
    
    /* 背景を少し半透明にしたり、文字色を変えたり */
    background-color: ${this.bgColor};
    color: white;

opacity: 0;
transition: opacity 0.2s;
}
[class^="cell-${this.imgClassName}"].selected .overlay {
opacity: 1;
}
`.trim();
    }
}
export class HtmlMakerNestedNodeOption {
    numCell = 1;
    enableWatchNotify = false;
}
export class HtmlMakerNestedNodeGroup extends HtmlMakerGroupTable {
    indentPx = 10;
    topTableElem = null;
    init() {
        const pair = new HtmlMakerGroupTablePair();
        pair.headerElem = null;
        pair.subTblElem = null;
        this.items.push(pair);
    }
    createRoot() {
        const tableParentElem = this.table.getParentElem();
        if (tableParentElem === null)
            return;
        const divElem = tableParentElem.children[0];
        if (divElem === null)
            return;
        const tableElem = divElem.children[0];
        //console.log(tableElem)
        divElem.style.padding = `unset`;
        tableElem.style.padding = `unset`;
        this.topTableElem = tableElem;
        this.newRow(tableElem, `-root`, new HtmlMakerNestedNodeOption());
        this.rowVisible(tableElem, false, null);
    }
    createNode(tableParentElem, className, cellOpt = new HtmlMakerNestedNodeOption()) {
        const tableElem = document.createElement(`table`);
        tableElem.className = className;
        this.newRow(tableElem, ``, cellOpt);
        const targetCell = tableParentElem.rows[1].cells[0];
        targetCell.appendChild(tableElem);
        return tableElem;
    }
    removeNode(existElem) {
        if (existElem === null)
            return;
        const parentElem = existElem.parentElement;
        if (parentElem === null)
            return;
        parentElem.removeChild(existElem);
        existElem.remove();
        existElem = null;
    }
    removeNodeBy(className) {
        let existElem = this.findNodeBy(className);
        this.removeNode(existElem);
    }
    findParentNodeBy(className) {
        let existElem = this.findNodeBy(className);
        if (existElem === null)
            return null;
        let parentElem = existElem.parentElement;
        while (parentElem !== null) {
            if (parentElem === this.topTableElem) {
                return null;
            }
            if (parentElem.tagName === `TABLE`)
                break;
            parentElem = parentElem.parentElement;
        }
        return parentElem;
    }
    getChildren(existElem) {
        if (existElem === null)
            return null;
        if (existElem.rows.length !== 2)
            return null;
        const subTblElem = existElem.rows[1].cells[0].children;
        if (subTblElem.length === 0)
            return null;
        const resTblElems = new Array;
        for (const tblElem of subTblElem) {
            resTblElems.push(tblElem);
        }
        return resTblElems;
    }
    newRow(tableElem, rowPrefix, cellOpt) {
        const row1 = tableElem.insertRow(-1); //for display
        const row2 = tableElem.insertRow(-1); //for sub node
        row1.className = `${tableElem.className}${rowPrefix}-row_1`;
        row2.className = `${tableElem.className}${rowPrefix}-row_2`;
        row1.innerHTML = `<td></td>`.repeat(cellOpt.numCell);
        row2.innerHTML = `<td></td>`;
        if (cellOpt.enableWatchNotify === true) {
            row1.dataset.enableWatchNotify = `true`;
        }
    }
    rowVisible(tableElem, visible1, visible2) {
        if (tableElem === null)
            return;
        if (visible1 !== null)
            tableElem.rows[0].style.display = visible1 === true ? "" : "none";
        if (visible2 !== null)
            tableElem.rows[1].style.display = visible2 === true ? "" : "none";
    }
    makeTextCell(className, label, toolTip) {
        const res = new HtmlMakerTableCellInfo();
        res.typeInfo.setLabel(label, false);
        res.className = className;
        res.typeInfo.toolTip = toolTip;
        return res;
    }
    makeImgCell(className, imgSrc, imgFile, toolTip) {
        const imgOpt = new HtmlMakerOptionImg();
        imgOpt.imgSrc = imgSrc;
        imgOpt.imgFile = imgFile;
        imgOpt.lazy = true;
        const res = new HtmlMakerTableCellInfo();
        res.typeInfo.setImg(imgOpt);
        res.className = className;
        res.typeInfo.toolTip = toolTip;
        return res;
    }
    makeBtnCell(className, label, toolTip, itemId) {
        const res = new HtmlMakerTableCellInfo();
        res.typeInfo.setButton(label);
        res.className = className;
        res.typeInfo.toolTip = toolTip;
        res.typeInfo.using.itemId = itemId;
        return res;
    }
    get rootName() { return this.topTableElem.className; }
    findNodeBy(className) {
        if (this.topTableElem === null)
            return null;
        if (this.topTableElem.className === className)
            return this.topTableElem;
        const elems = this.topTableElem.getElementsByClassName(className);
        if (elems.length === 0)
            return null;
        return elems[0];
    }
    getCell(tableElem, colIndex = 0) {
        if (tableElem === null)
            return null;
        const rowElem = tableElem.rows[0];
        if (colIndex < 0 || colIndex >= rowElem.cells.length)
            return null;
        const cellElem = rowElem.cells[colIndex];
        return cellElem;
    }
    findCell(cellElem, tagName) {
        if (cellElem === null)
            return null;
        const matchElem = cellElem.querySelector(tagName);
        return matchElem;
    }
    setCellContent(tableElem, colIndex, text) {
        const cellElem = this.getCell(tableElem, colIndex);
        if (cellElem === null)
            return null;
        cellElem.innerHTML = text;
        return cellElem;
    }
    enableEvents(onSelect) {
        if (this.topTableElem === null)
            return false;
        this.topTableElem.addEventListener("click", this.onButtonClicked);
        this.onSelect = onSelect;
        return true;
    }
    disableEvents() {
        if (this.topTableElem === null)
            return false;
        this.topTableElem.removeEventListener("click", this.onButtonClicked);
        return true;
    }
    elemDrag;
    setDraggable(onDragAction, cellElem, draggable, elemIndex = 0) {
        if (cellElem === null)
            return false;
        if (elemIndex < 0 || elemIndex >= cellElem.children.length)
            return false;
        const tableElem = this.getTableElemByCellElem(cellElem);
        if (tableElem === null)
            return false;
        const elem = cellElem.children[elemIndex];
        /*
        elem.draggable = draggable

        if (draggable) {
            tableElem.addEventListener('dragstart', this.onDragStart)
            tableElem.addEventListener('dragend', this.onDragEnd)
        }
        else {
            tableElem.removeEventListener('dragstart', this.onDragStart)
            tableElem.removeEventListener('dragend', this.onDragEnd)
        }

        this.onDragAction = onDragAction
        */
        this.elemDrag = new DragDropElement();
        if (draggable) {
            this.elemDrag.DragStart(elem, onDragAction);
        }
        else {
            this.elemDrag.DragStop();
        }
        return true;
    }
    /*
    private onDragAction!: (dragMap: Map<string, string>) => void
    private dragStartMap: Map<string, string> = new Map<string, string>
    private dragEndMap: Map<string, string> = new Map<string, string>
    private onDragStart = async (event: DragEvent) => {
        const target = event.target as HTMLElement
        this.dragStartMap.set(`name`, `dragStart`)
        this.dragStartMap.set(`tagName`, target.tagName)
        this.dragStartMap.set(`className`, target.className)
        this.dragStartMap.set(`operation`, ``)
        //console.log('ドラッグを開始しました', event, this.dragStartMap)

        // dataTransfer が null でないかチェック
        if (event.dataTransfer) {
            event.dataTransfer.setData('text/plain', target.className)
            event.dataTransfer.effectAllowed = 'link'
        }

        if (this.onDragAction !== undefined)
            await this.onDragAction(this.dragStartMap)
    }
    private onDragEnd = async (event: DragEvent) => {
        const target = event.target as HTMLElement
        const operation = event.dataTransfer !== null ?
                event.dataTransfer.dropEffect !== 'none' ? `success` : `cancel`
                : `unknown`
        this.dragEndMap.set(`name`, `dragEnd`)
        this.dragEndMap.set(`tagName`, target.tagName)
        this.dragEndMap.set(`className`, target.className)
        this.dragEndMap.set(`operation`, operation)
        //console.log('ドラッグを終了しました', event, this.dragEndMap)

        if (this.onDragAction !== undefined)
            await this.onDragAction(this.dragEndMap)
    }
    */
    getTableElemByCellElem(cellElem) {
        let elem = cellElem;
        if (elem === null)
            return null;
        let parent = elem.parentElement;
        while (elem !== null && elem.tagName !== `TABLE`) {
            parent = elem.parentElement;
            elem = parent;
        }
        return parent;
    }
    onButtonClicked = async (event) => {
        const elemSend = event.target;
        if (elemSend === null)
            return;
        if (elemSend.tagName !== `BUTTON`)
            return;
        //console.log(elemSend)
        if (this.onSelect !== undefined) {
            const id = elemSend.getAttribute("item-id");
            const evArgs = new HtmlMakerCtlEvent();
            evArgs.callerName = elemSend.className;
            evArgs.result = id || ``;
            evArgs.classify = HtmlMakerCtlEventTypes.Unknown;
            evArgs.notify = this;
            await this.onSelect(evArgs);
        }
    };
    rowObserver = null;
    rowSelector = ``;
    trSelector = `tr[data-enable-watch-notify="true"]`; //単語の先頭大文字は「"-"と小文字」に置き換わるみたい
    onNotifyWatched;
    tableScroll = null;
    startWatch(onNotifyWatched, selector = this.ctlName) {
        if (this.rowObserver !== null)
            return;
        const div = document.getElementById(`${selector}-div`);
        if (div === null)
            return;
        const options = {
            // 【最重要！】ブラウザに「画面全体じゃなく、このスクロールするDIVの檻を基準に交差を監視しろ！」と法律を敷く
            root: div,
            rootMargin: '0px',
            threshold: 0.1 // 対象の行が10%でも見えたら発火（0.0なら1ピクセルでも見えたら発火）
        };
        const rowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // 対象の行（tr）を一本釣り
                const trElem = entry.target;
                if (entry.isIntersecting) {
                    if (this.tableScroll !== null && this.tableScroll.isPause) {
                        console.log(`${trElem.className} が見えました！(ポーズ中)`);
                        return;
                    }
                    // 😄 行がDIVの見える領域に「入った時」の処理
                    console.log(`${trElem.className} が見えました！(ポーズ解除)`);
                    // ここで特殊なエフェクトをかけたり、データを逆引きしてログを出したりする
                    if (trElem.dataset.enableWatchNotify === 'true') {
                        if (this.onNotifyWatched !== undefined) {
                            this.onNotifyWatched(trElem);
                        }
                    }
                }
                else {
                    // 😢 行がスクロールしてDIVの領域から「完全に隠れた時」の処理
                    //console.log(`${trElem.className} が隠れました！`);
                }
                // ⚡️ 【ここがお父様の仰る核心！】
                // ここで「observer.unobserve(entry.target)」を【呼び出さない】（引き算する）ことで、
                // 何度スクロールで行ったり来たりしても、入る度・隠れる度にこの関数が無限にトリガーされます！
            });
        }, options);
        const allRows = document.querySelectorAll(`.${selector}-tbl tbody ${this.trSelector}`);
        allRows.forEach(row => {
            rowObserver.observe(row);
        });
        this.rowObserver = rowObserver;
        this.rowSelector = selector;
        this.onNotifyWatched = onNotifyWatched;
        const divName = `${selector}-div`;
        this.tableScroll = new HtmlMakerDivScroller();
        this.tableScroll.enableEvent(divName);
    }
    stopWatch() {
        if (this.rowObserver === null)
            return;
        const allRows = document.querySelectorAll(`.${this.rowSelector}-tbl tbody ${this.trSelector}`);
        for (const row of allRows) {
            this.rowObserver.unobserve(row);
        }
        this.rowObserver = null;
        this.rowSelector = ``;
        this.onNotifyWatched = undefined;
        if (this.tableScroll !== null)
            this.tableScroll.disableEvent();
    }
    reset() {
        if (this.topTableElem !== null) {
            this.topTableElem.innerHTML = "";
            this.topTableElem = null;
        }
    }
    dispose() {
        super.dispose();
        this.disableEvents();
        this.stopWatch();
    }
    scroll(tableElem) {
        if (tableElem === null)
            return;
        if (this.tableScroll !== null)
            this.tableScroll.isPause = false;
        tableElem.scrollIntoView({
            behavior: 'smooth', // スルスルと動かす
            block: 'center' // 画面の真ん中に持ってくる
        });
        if (this.tableScroll !== null)
            this.tableScroll.isPause = true;
    }
    applyCss() {
        const styleId = `${this.getBaseElem().className}-nestednodegroup-style`;
        if (document.getElementById(styleId))
            return;
        //const spacingTable = HtmlMakerCommonCss.spacingTable
        const style = this.appendStyle(styleId);
        style.textContent = `
.${this.ctlName} {
width: 100%;
}
.${this.topTableElem?.className} {
width: 100%;
}

${this.cssText}

.${this.ctlName} table table {
    margin-left: ${this.indentPx}px;
    border-left: 1px dashed #ccc; /* 好みで薄い点線を垂らすと一気に開発ツールっぽくなります */
}

.${this.ctlName} img {
width: 100px; height: auto;
}

.${this.ctlName} span {
${HtmlMakerCommonCss.textDisableText}
}

`.trim();
    }
}
export class HtmlMakerOptionItemUsing {
    itemType = HtmlMakerOptionItemUsingTypes.Unknown;
    itemId = -1;
    label = "";
    combo;
    radio;
    input;
    check;
    textarea;
    innerHTML = "";
    img;
}
export class HtmlMakerOption {
    toolTip = "";
    using = new HtmlMakerOptionItemUsing();
    onSelect;
    setButton(labelText) {
        this.using.itemType = HtmlMakerOptionItemUsingTypes.Btn;
        this.using.label = labelText;
    }
    setLabel(labelText, isRW) {
        this.using.itemType = isRW ? HtmlMakerOptionItemUsingTypes.Label : HtmlMakerOptionItemUsingTypes.LabelRO;
        this.using.label = labelText;
    }
    setCombo(combo) {
        this.using.itemType = HtmlMakerOptionItemUsingTypes.Combo;
        this.using.combo = combo;
    }
    setRadio(radio) {
        this.using.itemType = HtmlMakerOptionItemUsingTypes.Radio;
        this.using.radio = radio;
    }
    setInput(input) {
        this.using.itemType = HtmlMakerOptionItemUsingTypes.Input;
        this.using.input = input;
    }
    setCheck(check) {
        this.using.itemType = HtmlMakerOptionItemUsingTypes.Chk;
        this.using.check = check;
    }
    setTextArea(ta) {
        this.using.itemType = HtmlMakerOptionItemUsingTypes.TextArea;
        this.using.textarea = ta;
    }
    setImg(img) {
        this.using.itemType = HtmlMakerOptionItemUsingTypes.Img;
        this.using.img = img;
    }
    setPlain(divInner) {
        this.using.itemType = HtmlMakerOptionItemUsingTypes.Plain;
        this.using.innerHTML = divInner;
    }
    setTable(tableHTML) {
        this.using.itemType = HtmlMakerOptionItemUsingTypes.Table;
        this.using.innerHTML = tableHTML;
    }
    setLowerTable() {
        this.using.itemType = HtmlMakerOptionItemUsingTypes.LowerTable;
    }
    ToButtonHTML(className) {
        const itemId = this.using.itemId >= 0 ? ` item-id="${this.using.itemId}"` : ``;
        return `
<button class="${className}"${itemId} title="${this.toolTip}">${this.using.label}</button>
`.trim();
    }
    ToLableHTML(className) {
        const toolTip = this.toolTip !== `` ? ` title="${this.toolTip}"` : ``;
        return `
<span class="${className}" data-readonly="false"${toolTip}>${this.using.label}</span>
`.trim();
    }
    ToLableROHTML(className) {
        const toolTip = this.toolTip !== `` ? ` title="${this.toolTip}"` : ``;
        return `
<span class="${className}" data-readonly="true"${toolTip}>${this.using.label}</span>
`.trim();
    }
    ToComboHTML(className) {
        if (this.using.combo === undefined)
            return "";
        const combo = this.using.combo;
        let optionHtmls = HtmlMakerItem.makeComboItemsHTML(combo);
        const classify = combo.classify !== "" ? ` data-classify="${combo.classify}"` : ``;
        return `
<select class="${className}" ${classify} title="${this.toolTip}">
  ${optionHtmls}
</select>
`.trim();
    }
    ToRadioHTML(className) {
        if (this.using.radio === undefined)
            return "";
        const radio = this.using.radio;
        if (radio.selectionPair === undefined)
            return "";
        if (radio.selectionPair.length <= 0)
            return "";
        const classify = radio.classify !== "" ? ` data-classify="${radio.classify}"` : ``;
        let divHtmls = ``;
        for (const pair of radio.selectionPair) {
            let [title, value] = pair.split("/");
            value = value.trim();
            const display = title.split(`:`);
            let toolTip = ``;
            if (display.length !== 1) {
                title = display[0];
                toolTip = ` title="${display[1]}"`;
            }
            const activeKeyText = HtmlMakerCommonCss.radioActiveKeyText;
            let selected = ``;
            if (radio.selectType === HtmlMakerOptionItemSelectTypes.Single)
                selected = radio.selectedItem === value ? ` ${activeKeyText}` : ``;
            else
                selected = radio.selectedItems.find(findText => findText === value) ? ` ${activeKeyText}` : ``;
            const divHtml = `
<div class="${className}${selected}" id="${className}"${classify}${toolTip}>${title}</div>
`.trim();
            divHtmls += divHtml;
        }
        return divHtmls;
    }
    ToInputHTML(className) {
        if (this.using.input === undefined)
            return "";
        const input = this.using.input;
        const itemId = this.using.itemId >= 0 ? ` item-id="${this.using.itemId}"` : ``;
        const value = input.value !== `` ? ` value="${input.value}"` : ``;
        const placeholder = input.placeholder !== `` ? ` placeholder="${input.placeholder}"` : ``;
        const disableKeyDown = input.disableKeyDown === true ? ` data-disableKeyDown="true"` : ``;
        const enableClicked = input.enableClicked === true ? ` data-enableClicked="true"` : ``;
        const appEvent = `${disableKeyDown}${enableClicked}`;
        return `
<input type="${input.type}" class="${className}"${itemId}${value}${placeholder}${appEvent} title="${this.toolTip}">
`.trim();
    }
    ToCheckHTML(className) {
        if (this.using.check === undefined)
            return "";
        const check = this.using.check;
        const itemId = this.using.itemId >= 0 ? ` item-id="${this.using.itemId}"` : ``;
        const checked = check.value ? ` checked` : ``;
        const placeholder = check.placeholder !== `` ? ` placeholder="${check.placeholder}"` : ``;
        const enableClicked = check.enableClicked === `` ? `` :
            check.enableClicked === `true` ?
                ` data-enableClicked="true"` :
                ` data-enableClicked="false"`;
        const appEvent = `${enableClicked}`;
        return `
<div class="${className}-container">
 <span class="${className}-text">${this.toolTip}</span>
 <label class="${className}-label" title="${check.placeholder}">
  <input type="${check.type}" class="${className}"${itemId}${checked}${placeholder}${appEvent}>
  <span class="${className}-slider"></span>
 </label>
</div>
`.trim();
    }
    ToTextAreaHTML(className) {
        if (this.using.textarea === undefined)
            return "";
        const textarea = this.using.textarea;
        const itemId = this.using.itemId >= 0 ? ` item-id="${this.using.itemId}"` : ``;
        const value = textarea.value !== `` ? ` "${textarea.value}"` : ``;
        const placeholder = textarea.placeholder !== `` ? ` placeholder="${textarea.placeholder}"` : ``;
        const props = `
cols=${textarea.cols}
rows=${textarea.rows}
readonly=${textarea.readonly}
disabled=${textarea.disabled}
wrap=${textarea.wrap}
resize=${textarea.resize}
minlength=${textarea.minlength}
maxlength=${textarea.maxlength}
`.trim();
        return `
<textarea class="${className}"${itemId}${placeholder} title="${this.toolTip}" ${props}>
${value}
</textarea>
`.trim();
    }
    ToImgHTML(className, alt) {
        let imgSrc = "";
        let lazy = ``;
        if (this.using.img.lazy === true) {
            lazy = `loading="lazy"`;
            imgSrc = `src="${this.using.img.imgSrc}"`;
        }
        else {
            if (this.using.img.imgSrc === "") {
                imgSrc = `src="" data-filename="${this.using.img.imgFile}"`;
            }
            else {
                imgSrc = `src="${this.using.img.imgSrc}"`;
            }
        }
        return `
<img class="${className}" ${imgSrc}${lazy} alt="${alt}">
`.trim();
    }
    ToOverlayHTML() {
        return `<div class="overlay" title="${this.toolTip}"></div>`;
    }
}
export class HtmlMakerProps {
    name = "";
    id = "";
    className = "";
    option = new HtmlMakerOption();
}
export class HtmlMakerItem {
    props = new HtmlMakerProps();
    ToHTML(props) {
        let dispTag = ``;
        let ovlayTag = ``;
        switch (props.option.using.itemType) {
            case HtmlMakerOptionItemUsingTypes.Btn:
                dispTag = props.option.ToButtonHTML(props.className);
                break;
            case HtmlMakerOptionItemUsingTypes.Label:
                dispTag = props.option.ToLableHTML(props.className);
                ovlayTag = props.option.ToOverlayHTML();
                break;
            case HtmlMakerOptionItemUsingTypes.LabelRO:
                dispTag = props.option.ToLableROHTML(props.className);
                break;
            case HtmlMakerOptionItemUsingTypes.Plain:
                dispTag = `
${props.option.using.innerHTML}
`.trim();
                break;
            case HtmlMakerOptionItemUsingTypes.Combo:
                dispTag = props.option.ToComboHTML(props.className);
                break;
            case HtmlMakerOptionItemUsingTypes.Input:
                dispTag = props.option.ToInputHTML(props.className);
                break;
            case HtmlMakerOptionItemUsingTypes.Chk:
                dispTag = props.option.ToCheckHTML(props.className);
                break;
            case HtmlMakerOptionItemUsingTypes.Img:
                dispTag = props.option.ToImgHTML(props.className, props.option.using.img.alt);
                ovlayTag = props.option.ToOverlayHTML();
                break;
        }
        return `
  ${dispTag}
  ${ovlayTag}
`.trim();
    }
    MakeSelectableHTML() {
        let marker = ``;
        if (this.props.option.using.itemType === HtmlMakerOptionItemUsingTypes.Img) {
            for (const mk of this.props.option.using.img.marker) {
                marker += ` data-${mk}`;
            }
        }
        return `
<div class="${this.props.name}" id="${this.props.name}" item-id="${this.props.id}"${marker}>
${this.ToHTML(this.props)}
</div>
`.trim();
    }
    static makeComboItemsHTML(combo) {
        if (combo.selectionPair === undefined)
            return "";
        if (combo.selectionPair.length <= 0)
            return "";
        let optionHtmls = ``;
        for (const pair of combo.selectionPair) {
            let [title, value] = pair.split("/");
            value = value.trim();
            const selected = combo.selectedItem === value ? " selected" : "";
            const optionHtml = `
<option value="${value}"${selected}>${title}</option>
`.trim();
            optionHtmls += optionHtml;
        }
        return optionHtmls;
    }
}
export class HtmlMaker {
    itemList;
    selectedCh;
    observer;
    constructor() {
        this.itemList = new Array;
    }
    add(item) {
        this.itemList.push(item);
    }
    /** ダイアログオーナー用CSS */
    MakeDefaultDialogParentCss(parentName, leftPx, topPx, zIndex = 0) {
        return `
.${parentName} {
  position: fixed;
  inset: auto; /* ブラウザの中央寄せを無効化 */
  top: ${topPx}px;
  left: ${leftPx}px;
  transform: translateX(-50%);
  z-index: ${zIndex};
}
`.trim();
    }
    /** ダイアログ用CSS */
    MakeSystematicDialogCss(dlgName) {
        return `
.${dlgName} {
  background-color: #86aef7;
  border: 2px solid #2c3e50;
  padding: 10px;
  ${HtmlMakerCommonCss.borderShadowText}
}
`.trim();
    }
    /** ダイアログ用CSS */
    MakeDefaultDialogCss(dlgName) {
        return `
.${dlgName} {
${HtmlMakerCommonCss.dlgBkColorText}
  padding: 10px;
  ${HtmlMakerCommonCss.borderShadowText}
}
`.trim();
    }
    /** HTML変換 */
    ToHTML() {
        let rows = "";
        for (const item of this.itemList) {
            if (item.props.option.using.itemType === HtmlMakerOptionItemUsingTypes.Table) {
                rows += item.props.option.using.innerHTML;
                continue;
            }
            rows += item.MakeSelectableHTML();
        }
        return `${rows}`;
    }
    /** スクロールバー付き項目選択を作成 */
    MakeScrollableList(className) {
        let rows = "";
        for (const item of this.itemList) {
            rows += item.MakeSelectableHTML();
        }
        return `<div id="${className}" class="${className} scroll">\n${rows}\n</div>`;
    }
    /** [MakeScrollableList]を利用するときにスクロールバー利用するCSS */
    MakeDefaultScrollCss(className, heightPx) {
        return `
.${className} .scroll {
max-height: ${heightPx}px;
overflow-y: auto;
${HtmlMakerCommonCss.scrollBarText}
}
`.trim();
    }
    /** [MakeScrollableList]を利用するときにスクロールバー利用しないCSS */
    MakeDefaultNonScrollCss(className, heightPx) {
        return "";
    }
    /** "Column Dir Grid"CSS */
    MakeDefaultGridColCss(gridName, itemPx, nItem, widthPx) {
        return `
.${gridName} {
display: grid;
grid-template-columns: repeat(${nItem}, ${itemPx}px);
gap: 0px;
width: ${widthPx}px;
}
`.trim();
    }
    /** "Row Dir Grid"CSS */
    MakeDefaultGridRowCss(gridName, itemPx, nItem, heightPx) {
        return `
.${gridName} {
display: grid;
grid: repeat(${nItem}, ${heightPx}px) / auto-flow ${itemPx}px;
gap: 0px;
height: ${(heightPx + 2) * nItem}px;
}
`.trim();
    }
    /** "Grid"内の項目CSS(右揃え用) */
    MakeDefaultItemJustifyRightCss(itemName, widthPx, heightPx) {
        return `
.${itemName} {
position: relative;
width: ${widthPx}px;
height: ${heightPx}px;
display: flex;
justify-content: flex-end;
font-size: 12px;
cursor: pointer;
}
`.trim();
    }
    /** "Grid"内の項目CSS(センター用) */
    MakeDefaultItemJustifyCenterCss(itemName, widthPx, heightPx) {
        return `
.${itemName} {
position: relative;
width: ${widthPx}px;
height: ${heightPx}px;
display: flex;
justify-content: center;
font-size: 12px;
cursor: pointer;
}
`.trim();
    }
    /** "Grid"内の項目CSS(img表示用) */
    MakeDefaultItemImgCss(itemName, imgName, widthPx, heightPx) {
        return `
.${itemName} {
position: relative;
width: ${widthPx}px;
height: auto;
cursor: pointer;
}
.${itemName} .${imgName} {
width: 100%;
height: 100%;
aspect-ratio: 1 / 1; /*スクロールしたとき確実に位置をあわせる*/
}
`.trim();
    }
    /** "Grid"内の項目CSS(label表示用) */
    MakeDefaultItemLabelCss(itemName, lblName, widthPx, heightPx) {
        return `
.${itemName} {
position: relative;
width: ${widthPx}px;
height: ${heightPx}px;
cursor: pointer;
}
.${itemName} .${lblName} {
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
font-size: 14px;
text-align: center;
line-height: 1.2;
word-break: break-all;
color: white;
border: 1px solid black;
}
`.trim();
    }
    /** "Grid"内の項目の選択・非選択CSS */
    MakeSystematicSelectionCss(itemName) {
        const bgColor = `rgba(128, 128, 128, 0.4)`;
        return this.overlayCss(itemName, bgColor);
    }
    /** "Grid"内の項目の選択・非選択CSS */
    MakeDefaultSelectionCss(itemName) {
        const bgColor = `rgba(0, 128, 255, 0.4)`;
        return this.overlayCss(itemName, bgColor);
    }
    overlayCss(itemName, bgColor) {
        return `
.${itemName} .overlay {
position: absolute;
inset: 0;
background: ${bgColor}; /* 選択時の色 */
opacity: 0;
transition: opacity 0.2s;
}
.${itemName}.selected .overlay {
opacity: 1;
}
`.trim();
    }
    _defaultButtonsName = "dialog-buttons";
    /** デフォルトの「ボタン領域」名 */
    get defaultButtonsCssName() {
        return this._defaultButtonsName;
    }
    /** デフォルトの「ボタン領域」CSS */
    set defaultButtonsCssName(value) {
        this._defaultButtonsName = value;
    }
    /** デフォルトの「ボタン領域」HTML */
    MakeDefaultButtonsHTML(buttonsHTML) {
        return `
<div class="${this.defaultButtonsCssName}">
    ${buttonsHTML}
</div>
`.trim();
    }
    /** デフォルトの「ボタン」CSS */
    MakeDefaultButtonsCss() {
        return `
.${this.defaultButtonsCssName} {
    display: flex;
    justify-content: flex-end; /* 右寄せも簡単 */
    gap: 8px;
}
.${this.defaultButtonsCssName} button {
    width: 120px; /* または flex:1 */
    ${HtmlMakerCommonCss.footerButtonText()}
}`.trim();
    }
    _defaultToolButtonsName = "dialog-tool-btns";
    /** デフォルトの「ツールボタン領域」名 */
    get defaultToolButtonsCssName() {
        return this._defaultToolButtonsName;
    }
    /** デフォルトの「ツールボタン領域」CSS */
    set defaultToolButtonsCssName(value) {
        this._defaultToolButtonsName = value;
    }
    /** デフォルトの「ツールボタン領域」HTML */
    MakeDefaultToolButtonsHTML(buttonsHTML) {
        return `
<div class="${this.defaultToolButtonsCssName}" id="${this.defaultToolButtonsCssName}">
    ${buttonsHTML}
</div>
`.trim();
    }
    /** デフォルトの「ツールボタン」CSS */
    MakeDefaultToolButtonsCss() {
        return `
.${this.defaultToolButtonsCssName} {
    display: flex;
    justify-content: flex-start; /* 左寄せも簡単 */
    gap: unset;
}
.${this.defaultToolButtonsCssName} button {
    height: 30px;
    ${HtmlMakerCommonCss.footerButtonText()}
}
.${this.defaultToolButtonsCssName} select {
    height: 30px;
    ${HtmlMakerCommonCss.footerButtonText()}
}
`.trim();
    }
    /** フルスクリーン初期化 */
    initFullScreen(parentName, initMsgText) {
        const splash = document.getElementById(parentName);
        if (splash === null)
            return false;
        splash.innerHTML = `
<div class="loader-content">
  <p>${initMsgText}</p>
  <div class="spinner">
    <img class="spinner-spin" src="spinner.gif"></img>
  </div>
</div>
`.trim();
    }
    /** フルスクリーン用CSS */
    MakeFullScreenCss(parentName) {
        return `
#${parentName} {
    /* 画面全体を固定して覆う */
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    
    /* 半透明の黒（0.7が不透明度。ここを調整すると後ろの透け具合が変わります） */
    background-color: rgba(0, 0, 0, 0.7);
    
    /* 中身を真ん中に寄せる */
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    z-index: 9999; /* 他の要素より必ず上にくるようにする「最前面」指定 */
    
    /* フェードアウト用の設定 */
    transition: opacity 0.5s ease;
}

/* 非表示にするためのクラス */
.hidden {
    opacity: 0;
    pointer-events: none; /* 下のボタンをクリックできるようにする */
}
.spinner {
  display: flex;
  justify-content: center;
}
`.trim();
    }
    /** フルスクリーン用CSS適用 */
    applyFullScreenCss(parentName) {
        const splash = document.getElementById(parentName);
        if (splash === null)
            return false;
        if (splash.classList.contains('hidden'))
            return false;
        const style = document.createElement("style");
        style.textContent =
            `
${this.MakeFullScreenCss(parentName)}
`.trim();
        document.head.appendChild(style);
        return true;
    }
    /** フルスクリーン用CSS非表示 */
    hideFullScreenCss(parentName) {
        const splash = document.getElementById(parentName);
        if (splash) {
            splash.classList.add('hidden'); // CSSのフェードアウトが走る
            // 完全に消去するなら setTimeout で remove してもOK
        }
    }
    /** フルスクリーン用CSS再表示 */
    showFullScreenCss(parentName) {
        const splash = document.getElementById(parentName);
        if (splash) {
            splash.classList.remove('hidden'); // CSSのフェードアウトが走る
        }
    }
    /** フルスクリーン用メッセージElem */
    getFullScreenMsgElem(parentName) {
        const splash = document.getElementById(parentName);
        if (splash) {
            const msgList = splash.querySelectorAll(`p`);
            const msg = msgList !== null && msgList.length >= 1 ? msgList[0] : null;
            return msg;
        }
        return null;
    }
    /** 画像遅延ロード有効化 */
    initObserver(scrollTag, loader) {
        const scrollRoot = document.getElementById(scrollTag);
        if (!scrollRoot)
            return;
        const callback = async (entries) => {
            await entries.forEach(async (entry) => {
                // もし監視対象（img）が「器」の中に見えたら
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const fileName = this.isDemo && !loader.isMaterial(img.dataset.filename) ? `demo.png` : img.dataset.filename;
                    //console.log(`[${this.isDemo}] 見えた！:${img.dataset.filename}`);
                    if (fileName && img.src === "" || img.src.startsWith(window.location.origin)) {
                        // ★ ここで ZIP から解凍して src にセット！
                        const ns = await loader.findNs(fileName);
                        if (ns === null || ns === "") {
                            //キャラ一覧にあるキャラがキャラ画像として登録していない場合
                            this.observer.unobserve(img);
                            console.log(`cannot set image : ${fileName}`);
                        }
                        else {
                            await loader.getImageUrlBy(fileName, ns).then((url) => {
                                if (url !== null) {
                                    const version = Date.now();
                                    img.src = `${url}?v=${version}`;
                                    // 一度表示したら監視を解除して負荷を下げる
                                    this.observer.unobserve(img);
                                }
                                else
                                    console.log(`pending set image : ${fileName}`);
                            });
                        }
                    }
                }
            });
        };
        const options = {
            root: scrollRoot, // ★ここがミソ！ブラウザ全体ではなく、このDIV内を基準にする
            rootMargin: "0px", // ギリギリで見えたら反応
            threshold: 0.1 // 10%見えたら反応
        };
        this.observer = new IntersectionObserver(callback, options);
        // ★重要：現在リストにある全画像を監視対象に加える
        const images = scrollRoot.querySelectorAll(`img[data-filename]`);
        images.forEach(img => this.observer.observe(img));
        console.log("[initObserver] enabled!");
    }
    get isDemo() {
        return window.EVONA_CONFIG.demo;
    }
    get isScrolling() {
        return this._enableScrollEvt ?
            this._scrollTimer !== null && this._isScrolling ? false : true
            :
                false;
    }
    _enableScrollEvt = false;
    _scrollTimer = null;
    _isScrolling = false;
    enableScrollEvent(scrollTag) {
        this._isScrolling = false;
        const scrollRoot = document.getElementById(scrollTag);
        if (!scrollRoot)
            return false;
        this._enableScrollEvt = true;
        scrollRoot.addEventListener('scroll', () => {
            //console.log("[enableScrollEvent] starting scrolled!");
            this._isScrolling = true;
            // 前のタイマーをキャンセル（連打を打ち消す）
            clearTimeout(this._scrollTimer);
            // 0.2秒ほど「静止」したら「止まった」とみなす
            this._scrollTimer = setTimeout(() => {
                this._scrollTimer = null;
                this._isScrolling = false;
                const entries = this.observer.takeRecords();
                console.log(`[enableScrollEvent] stopped ${entries.length}`);
            }, 200);
        });
        console.log("[enableScrollEvent] enabled!");
        return true;
    }
    /** イベント有効化 */
    enableEvents(itemName) {
        const itemCss = `.${itemName}`;
        const elems = document.querySelectorAll(`${itemCss}`);
        elems.forEach(elem => {
            const imgs = elem.querySelectorAll(`img`);
            if (imgs.length >= 1) {
                const img = imgs[0];
                //console.log(`${elem.tagName}::${itemCss}::img`)
                this.addButtonEvent(itemCss, elem);
            }
            const spns = elem.querySelectorAll(`span`);
            if (spns.length >= 1) {
                const spn = spns[0];
                //console.log(`${elem.tagName}::${itemCss}::span`)
                if (spn?.dataset.readonly == "false")
                    this.addButtonEvent(itemCss, elem);
            }
            const sels = elem.querySelectorAll(`select`);
            if (sels.length >= 1) {
                const sel = sels[0];
                //console.log(`${elem.tagName}::${itemCss}::select`)
                this.addSelectEvent(itemCss, elem);
            }
            const btns = elem.querySelectorAll(`button`);
            if (btns.length >= 1) {
                for (const btn of btns) {
                    console.log(`${elem.tagName}::${itemCss}::button::${btn.innerHTML}`);
                    elem.addEventListener("click", this.onButtonClicked);
                }
            }
            /*
            const tables = elem.querySelectorAll(`table`);
            if (tables.length >= 1) {
                const table = tables[0] as HTMLTableElement
                //console.log(`${elem.tagName}::${itemCss}::table`)
                elem.addEventListener("click", this.onButtonClicked)
                elem.addEventListener("keydown", this.onInputKeydown)
            }
            */
        });
    }
    /** イベント有効化(TABLEタグ専用) */
    enableTableEvents(itemName, excludeClassList = undefined) {
        const itemCss = `.${itemName}`;
        const elems = document.querySelectorAll(`${itemCss}`);
        elems.forEach(elem => {
            const tables = elem.querySelectorAll(`table`);
            if (tables.length >= 1) {
                for (const table of tables) {
                    //console.log(`${elem.tagName}::${itemCss}::table`)
                    if (excludeClassList !== undefined) {
                        const match = excludeClassList.find(className => { return className === table.className; });
                        if (match) {
                            console.log(`[enableTableEvents] exclude table ${elem.className}`);
                            continue;
                        }
                    }
                    table.addEventListener("click", this.onButtonClicked);
                    table.addEventListener("keydown", this.onInputKeydown);
                    table.addEventListener("click", this.onInputClicked);
                    table.addEventListener("change", this.onSelectChange);
                }
            }
        });
    }
    /** イベント無効化(TABLEタグ専用) */
    disableTableEvents(itemName) {
        const itemCss = `.${itemName}`;
        const elems = document.querySelectorAll(`${itemCss}`);
        elems.forEach(elem => {
            const tables = elem.querySelectorAll(`table`);
            if (tables.length >= 1) {
                /*
                const table = tables[0] as HTMLTableElement
                //console.log(`${elem.tagName}::${itemCss}::table`)
                elem.removeEventListener("click", this.onButtonClicked)
                elem.removeEventListener("keydown", this.onInputKeydown)
                elem.removeEventListener("click", this.onInputClicked)
                elem.removeEventListener("change", this.onSelectChange)
                */
                for (const table of tables) {
                    //console.log(`${elem.tagName}::${itemCss}::table`)
                    elem.removeEventListener("click", this.onButtonClicked);
                    elem.removeEventListener("keydown", this.onInputKeydown);
                    elem.removeEventListener("click", this.onInputClicked);
                    elem.removeEventListener("change", this.onSelectChange);
                }
            }
        });
    }
    addButtonEvent(itemCss, elem) {
        const id = elem.getAttribute("item-id");
        if (id) {
            elem.addEventListener("click", this.onButtonClicked);
        }
    }
    onButtonClicked = (event) => {
        const elemSend = event.target;
        if (elemSend === null)
            return;
        const elem = elemSend.tagName === `BUTTON` ? elemSend : elemSend.parentElement;
        if (elem === null)
            return;
        let className = this.supplessSelected(elem.className);
        if (className !== "") {
            className = CSS.escape(className);
            className = `.${className}`;
            // すでに選択されているものを解除
            const elems = document.querySelectorAll(`${className}.selected`);
            if (elems.length >= 1)
                elems.forEach(sel => sel.classList.remove("selected"));
            else {
                //TABLEタグ内のセルかを確認
                let tableElem = this.getTopElement(elemSend);
                if (tableElem !== null) {
                    const tagName = elem.tagName;
                    const elems = tableElem.querySelectorAll(`${tagName}.selected`);
                    if (elems.length >= 1)
                        elems.forEach(sel => sel.classList.remove("selected"));
                }
            }
            // 今クリックしたものを選択
            elem.classList.add("selected");
        }
        // 必要ならキャラ情報を返す
        const id = elem.getAttribute("item-id");
        if (id) {
            const match = this.itemList.find(item => `${item.props.id}` === id);
            if (match) {
                if (match.props.option.onSelect) {
                    let targetId = ``;
                    if (elemSend.tagName === `BUTTON`) {
                        targetId = elemSend.getAttribute("item-id");
                        if (targetId === null)
                            targetId = ``;
                    }
                    const evArgs = new HtmlMakerEvent;
                    evArgs.parentElem = elemSend.parentElement;
                    evArgs.item = match;
                    evArgs.targetId = targetId;
                    match.props.option.onSelect(evArgs);
                }
                this.selectedCh = match;
            }
            else {
                let parentElement = this.getTopElement(elemSend);
                if (parentElement?.tagName === `TABLE`) {
                    //const id = parentElement.getAttribute("item-id");
                    const className = parentElement.className;
                    const match = this.itemList.find(item => item.props.className === className);
                    if (match) {
                        if (match.props.option.onSelect) {
                            let targetId = ``;
                            if (elemSend.tagName === `BUTTON`) {
                                targetId = elemSend.getAttribute("item-id");
                                if (targetId === null)
                                    targetId = ``;
                            }
                            const parentClassName = elemSend.parentElement !== null ? elemSend.parentElement.className : ``;
                            let className = elemSend.className;
                            if (className === `overlay`) {
                                className = parentClassName;
                                if (elemSend.parentElement !== null) {
                                    targetId = elemSend.parentElement.getAttribute("item-id");
                                    if (targetId === null)
                                        targetId = ``;
                                }
                            }
                            const evArgs = new HtmlMakerEvent;
                            evArgs.parentElem = elemSend.parentElement;
                            evArgs.item = match;
                            evArgs.targetId = targetId;
                            evArgs.classify = this.supplessSelected(className);
                            match.props.option.onSelect(evArgs);
                        }
                        this.selectedCh = match;
                    }
                }
            }
        }
    };
    onInputKeydown = (event) => {
        const elemSend = event.target;
        if (elemSend === null)
            return;
        if (elemSend.tagName !== `INPUT`)
            return;
        const input = elemSend;
        const ke = event;
        let keyEnter = HtmlMakerKeyEnterTypes.None;
        // どのキーが押されたか判定
        switch (ke.key) {
            case HtmlMakerKeyEventTypes.Enter:
                keyEnter = HtmlMakerKeyEnterTypes.Normal;
                const repeat = ke.repeat;
                const timeStampMsNow = ke.timeStamp;
                let pressInfo = input.dataset.pressInfo;
                if (pressInfo === undefined) {
                    pressInfo = `1;${timeStampMsNow}`; //pressCount;timeStampMs
                    keyEnter = HtmlMakerKeyEnterTypes.Normal;
                }
                else {
                    if (repeat) {
                        //おしっぱ状態はカウントしない
                    }
                    else {
                        const args = pressInfo.split(`;`);
                        if (args.length === 2) {
                            let pressCount = parseInt(args[0]);
                            let timeStampMs = parseFloat(args[1]);
                            if (timeStampMsNow - timeStampMs >= 4 * 1000) {
                                pressCount = 1;
                            }
                            else {
                                pressCount++;
                                if (pressCount >= 3) {
                                    pressCount = 0;
                                    keyEnter = HtmlMakerKeyEnterTypes.Special;
                                }
                            }
                            pressInfo = `${pressCount};${timeStampMsNow}`; //pressCount;timeStampMs
                        }
                    }
                }
                input.dataset.pressInfo = pressInfo;
                //console.log(`[Enter] repeat=${repeat}  timeStamp=${timeStampMsNow} pressInfo=${pressInfo}`)
                ke.preventDefault(); // ブラウザ標準の挙動（フォーム送信など）を防ぐ
                break;
            case HtmlMakerKeyEventTypes.Escape:
                // 編集をキャンセルして元の値に戻す
                input.value = "元の値";
                input.blur(); // フォーカスを外す
                break;
            case HtmlMakerKeyEventTypes.Tab:
                // 右隣のセルへ移動（標準挙動に近いですが、制御も可能）
                break;
            case HtmlMakerKeyEventTypes.Process:
                return;
            default:
                let disableKeyDown = input.dataset.disablekeydown;
                if (disableKeyDown !== undefined) {
                    ke.preventDefault(); //通常キーを無効化
                }
                return;
        }
        this.notifyOnInputEvent(input, HtmlMakerEventTypes.KeyDown, ke.key, keyEnter);
    };
    onInputClicked = (event) => {
        const elemSend = event.target;
        if (elemSend === null)
            return;
        if (elemSend.tagName !== `INPUT`)
            return;
        const input = elemSend;
        const enableClicked = input.dataset.enableclicked;
        if (enableClicked === undefined)
            return;
        this.notifyOnInputEvent(input, HtmlMakerEventTypes.Click, ``, HtmlMakerKeyEnterTypes.None);
    };
    notifyOnInputEvent(input, eventType, keydown, keyEnter) {
        //inputタグの"item-id"
        const id = input.getAttribute("item-id");
        if (id) {
            let topElement = this.getTopElement(input);
            if (topElement?.tagName === `TABLE`) {
                const className = topElement.className;
                const match = this.itemList.find(item => item.props.className === className);
                if (match) {
                    const evArgs = new HtmlMakerEvent;
                    evArgs.parentElem = input.parentElement;
                    evArgs.item = match;
                    evArgs.targetId = id;
                    evArgs.classify = this.supplessSelected(input.className);
                    evArgs.eventType = eventType;
                    evArgs.Keydown = keydown;
                    evArgs.KeyEnter = keyEnter;
                    match.props.option.onSelect(evArgs);
                }
            }
        }
        else {
            console.log(`**notifyOnInputEvent::invalid id**`);
            console.log(input);
        }
    }
    onSelectChange = (event) => {
        const elemSend = event.target;
        if (elemSend === null)
            return;
        if (elemSend.tagName !== `SELECT`)
            return;
        const classfy = elemSend?.dataset.classify;
        //target.id
        let id = elemSend.getAttribute("item-id");
        if (id === null) {
            const elem = this.getTopElement(elemSend);
            if (elem !== null) {
                id = elem.getAttribute("item-id");
            }
        }
        if (id) {
            let match = this.itemList.find(item => `${item.props.id}` === id);
            if (match === undefined) {
                match = this.itemList.find(item => `${classfy}${item.props.id}` === id);
            }
            if (match) {
                if (match.props.option.onSelect) {
                    const evArgs = new HtmlMakerEvent;
                    evArgs.parentElem = elemSend.parentElement;
                    evArgs.item = match;
                    evArgs.targetId = id;
                    evArgs.classify = classfy === undefined ? "?" : classfy;
                    evArgs.selectedValue = elemSend.value;
                    match.props.option.onSelect(evArgs);
                }
                this.selectedCh = match;
            }
        }
    };
    addSelectEvent(itemCss, elem) {
        elem.addEventListener("change", (ev) => {
            const target = ev.target;
            const classfy = target?.dataset.classify;
            //target.id
            const id = elem.getAttribute("item-id");
            if (id) {
                let match = this.itemList.find(item => `${item.props.id}` === id);
                if (match === undefined) {
                    match = this.itemList.find(item => `${classfy}${item.props.id}` === id);
                }
                if (match) {
                    if (match.props.option.onSelect) {
                        const evArgs = new HtmlMakerEvent;
                        evArgs.item = match;
                        evArgs.targetId = id;
                        evArgs.classify = classfy === undefined ? "?" : classfy;
                        evArgs.selectedValue = target.value;
                        match.props.option.onSelect(evArgs);
                    }
                    this.selectedCh = match;
                }
            }
        });
    }
    supplessSelected(className) {
        let res = className;
        let pos = className.indexOf(` selected`);
        if (pos >= 0) {
            res = className.substring(0, pos);
        }
        return res;
    }
    getTopElement(elem) {
        let parentElement = elem.parentElement;
        while (parentElement !== null) {
            if (parentElement.tagName === `DIV`) {
                parentElement = parentElement.parentElement;
                continue;
            }
            if (parentElement.tagName === `TD`) {
                parentElement = parentElement.parentElement;
                continue;
            }
            if (parentElement.tagName === `TR`) {
                parentElement = parentElement.parentElement;
                continue;
            }
            if (parentElement.tagName === `TBODY`) {
                parentElement = parentElement.parentElement;
                continue;
            }
            if (parentElement.tagName === `LABEL`) {
                if (elem.tagName === `INPUT`) {
                    const inputElem = elem;
                    if (inputElem.type === `checkbox`) {
                        parentElement = parentElement.parentElement;
                        continue;
                    }
                }
            }
            break;
        }
        return parentElement;
    }
    GetRect(elem) {
        /*
        console.log({
            isConnected: elem.isConnected,             // DOMツリーに結合されているか（falseなら結合前）
            offsetParent: (elem as any).offsetParent,  // 親の配置状態（nullなら非表示かdisplay:none）
            display: window.getComputedStyle(elem).display // 実際のCSSのdisplay状態
        })
        */
        const rect = elem.getBoundingClientRect();
        //console.log(`[${elem.className}] ${rect.left},${rect.top}-${rect.width},${rect.height}`)
        const res = new HtmlMakerRect();
        res.left = `${rect.left}`;
        res.top = `${rect.top}`;
        res.width = `${rect.width}`;
        res.height = `${rect.height}`;
        return res;
    }
    EnableElem(elem, enabled) {
        // 引数の enabled が true なら ariaDisabled は "false"（＝無効ではない）
        elem.ariaDisabled = enabled ? "false" : "true";
    }
    IsEnabledElem(elem) {
        // null の場合（初期状態）は有効とみなす
        if (elem.ariaDisabled === null)
            return true;
        // 文字列の "false" なら有効、それ以外（"true"）なら無効
        return elem.ariaDisabled === "false";
    }
    EnableId(elemId, enabled) {
        const elem = document.getElementById(elemId);
        if (elem === null)
            return null;
        this.EnableElem(elem, enabled);
        return enabled;
    }
    IsEnabledId(elemId) {
        const elem = document.getElementById(elemId);
        if (elem === null)
            return null;
        return this.IsEnabledElem(elem);
    }
    ReplaceElem(parentName, repElem) {
        if (repElem === null)
            return;
        const parentElems = document.getElementsByClassName(parentName);
        if (parentElems.length === 0)
            return;
        const parentElem = parentElems[0];
        const workElems = new Array;
        let pos = -1;
        let matchPos = -1;
        for (const elem of parentElem.children) {
            pos++;
            if (elem.className === repElem.className && elem.tagName === repElem.tagName) {
                matchPos = pos;
            }
            else {
                workElems.push(elem);
            }
        }
        if (matchPos === -1)
            return;
        const nElem = parentElem.children.length;
        const removeElems = new Array;
        for (const elem of parentElem.children) {
            removeElems.push(elem);
        }
        for (const elem of removeElems) {
            parentElem.removeChild(elem);
            elem.remove();
        }
        removeElems.slice(0, removeElems.length);
        let workPos = -1;
        for (pos = 0; pos < nElem; pos++) {
            if (pos === matchPos) {
                parentElem.appendChild(repElem);
            }
            else {
                workPos++;
                parentElem.appendChild(workElems[workPos]);
            }
        }
    }
    GetIdByIndex(index) {
        if (index < 0 || index >= this.itemList.length) {
            console.error(`invalid index : ${index}`);
            return `**bug**`;
        }
        return this.itemList[index].props.id;
    }
    UnselectAll(itemName) {
        const itemCss = `.${itemName}`;
        document.querySelectorAll(`${itemCss}.selected`)
            .forEach(sel => sel.classList.remove("selected"));
    }
    SelectByID(itemName, idHTML) {
        const elem = this.FindByID(itemName, idHTML);
        if (elem) {
            elem.classList.add("selected");
            const id = elem.getAttribute("item-id");
            if (id) {
                const match = this.itemList.find(item => `${item.props.id}` === id);
                if (match) {
                    this.selectedCh = match;
                }
            }
            return elem;
        }
        return null;
    }
    FindDivByClassName(itemName, divName) {
        const itemCss = `.${itemName}`;
        const elems = document.querySelectorAll(`${itemCss}`);
        for (const elem of elems) {
            const divs = elem.querySelectorAll(`div`);
            for (const div of divs) {
                if (div.className === divName) {
                    return div;
                }
                if (div.className.startsWith(divName)) {
                    //クラス名が「divName scroll」という風になっているかもしれない
                    return div;
                }
            }
        }
        return null;
    }
    FindByID(itemName, idHTML) {
        const itemCss = `.${itemName}`;
        const elems = document.querySelectorAll(`${itemCss}`);
        for (const elem of elems) {
            const id = elem.getAttribute("item-id");
            if (id) {
                if (id === idHTML) {
                    return elem;
                }
            }
        }
        return null;
    }
    FindImgByID(itemName, idHTML) {
        const itemCss = `.${itemName}`;
        const elems = document.querySelectorAll(`${itemCss}`);
        for (const elem of elems) {
            const id = elem.getAttribute("item-id");
            if (id) {
                if (id === idHTML) {
                    const imgs = elem.querySelectorAll(`img`);
                    if (imgs.length >= 1) {
                        return imgs[0];
                    }
                    return null;
                }
            }
        }
        return null;
    }
    FindImgsByID(itemName, idHTML) {
        const itemCss = `.${itemName}`;
        const elems = document.querySelectorAll(`${itemCss}`);
        for (const elem of elems) {
            const id = elem.getAttribute("item-id");
            if (id) {
                if (id === idHTML) {
                    const imgs = elem.querySelectorAll(`img`);
                    if (imgs.length >= 1) {
                        return imgs;
                    }
                    return null;
                }
            }
        }
        return null;
    }
    FindDivByID(itemName, idHTML) {
        const itemCss = `.${itemName}`;
        const elems = document.querySelectorAll(`${itemCss}`);
        for (const elem of elems) {
            const id = elem.getAttribute("item-id");
            if (id) {
                if (id === idHTML) {
                    const divs = elem.querySelectorAll(`div`);
                    if (divs.length >= 1) {
                        return divs[0];
                    }
                    return null;
                }
            }
        }
        return null;
    }
    FindSelectByID(itemName, idHTML, classify) {
        const itemCss = `.${itemName}`;
        const elems = document.querySelectorAll(`${itemCss}`);
        for (const elem of elems) {
            const id = elem.getAttribute("item-id");
            if (id) {
                if (id === idHTML) {
                    const sels = elem.querySelectorAll(`select`);
                    if (sels.length >= 1) {
                        for (const sel of sels) {
                            if (sel?.dataset.classify === classify) {
                                return sel;
                            }
                        }
                    }
                    return null;
                }
            }
        }
        return null;
    }
    ReplaceImg(itemName, idHTML, imgFileName) {
        const img = this.FindImgByID(itemName, idHTML);
        if (img === null)
            return null;
        const fileName = img.dataset.filename;
        //if (img.src === "")
        //    img.dataset.filename = imgFileName    //遅延ロード前
        //else
        img.src = imgFileName; //遅延ロード後
        return img;
    }
    ReplaceDivToolTip(itemName, idHTML, title) {
        const div = this.FindDivByID(itemName, idHTML);
        if (div === null)
            return null;
        div.title = title;
        return div;
    }
    ReplaceImgToolTip(itemName, idHTML, title) {
        const img = this.FindImgByID(itemName, idHTML);
        if (img === null)
            return null;
        img.title = title;
        return img;
    }
    SwapImgSrcAndPairToolTip(img1, img2) {
        if (img1 === null)
            return false;
        if (img2 === null)
            return false;
        const parent1 = img1.parentElement;
        const parent2 = img2.parentElement;
        let div1 = null;
        let div2 = null;
        if (parent1 !== null) {
            for (const elem of parent1.children) {
                if (elem.tagName === `DIV`) {
                    div1 = elem;
                    break;
                }
            }
        }
        if (parent2 !== null) {
            for (const elem of parent2.children) {
                if (elem.tagName === `DIV`) {
                    div2 = elem;
                    break;
                }
            }
        }
        const src1 = img1.src;
        const src2 = img2.src;
        img1.src = src2;
        img2.src = src1;
        if (div1 !== null && div2 !== null) {
            const title1 = div1.title;
            const title2 = div2.title;
            div1.title = title2;
            div2.title = title1;
        }
        else {
            console.log(`[SwapImgSrcAndBrosToolTip] cannot swap title`);
        }
        return true;
    }
    SetImgSrc(img, imgFileName) {
        if (img === null)
            return null;
        const fileName = img.dataset.filename;
        //if (img.src === "")
        //    img.dataset.filename = imgFileName    //遅延ロード前
        //else
        img.src = imgFileName; //遅延ロード後
    }
    SetImgSize(img, imgWidthPx, imgHeihtPx) {
        if (img === null)
            return null;
        img.style.width = `${imgWidthPx}px`;
        img.style.height = `${imgHeihtPx}px`;
    }
    ReplaceComboItems(itemName, idHTML, combo) {
        const select = this.FindSelectByID(itemName, idHTML, combo.classify);
        if (select === null)
            return null;
        const opts = select.querySelectorAll(`option`);
        if (opts.length >= 1) {
            select.innerHTML = ``;
        }
        const optionHtmls = HtmlMakerItem.makeComboItemsHTML(combo);
        if (optionHtmls !== '') {
            select.innerHTML = optionHtmls;
        }
        return select;
    }
    setVisible(itemName, visible) {
        const itemElem = document.getElementById(itemName);
        if (itemElem === null)
            return null;
        //itemElem.hidden = !visible
        itemElem.style.display = visible === true ? `` : `none`;
        return true;
    }
    appendCheckBox(itemName, chkName, visible = true) {
        const itemCss = `.${itemName}`;
        const chkCss = `.${chkName}`;
        const elems = document.querySelectorAll(itemCss);
        for (const elem of elems) {
            const chks = elem.querySelectorAll(chkCss);
            if (chks.length >= 1)
                continue;
            const itemId = elem.getAttribute(`item-id`);
            const chkElem = document.createElement(`input`);
            chkElem.type = `checkbox`;
            chkElem.className = chkName;
            chkElem.id = chkName;
            chkElem.value = ``;
            chkElem.style.display = visible ? `` : `none`;
            chkElem.style.pointerEvents = `none`; //自動チェックON/OFFを禁止
            if (itemId !== null)
                chkElem.setAttribute(`item-id`, itemId);
            elem.appendChild(chkElem);
        }
    }
    removeCheckBox(itemName, chkName) {
        const itemCss = `.${itemName}`;
        const chkCss = `.${chkName}`;
        const elems = document.querySelectorAll(itemCss);
        for (const elem of elems) {
            const chks = elem.querySelectorAll(chkCss);
            if (chks.length === 0)
                continue;
            for (const chkElem of chks) {
                elem.removeChild(chkElem);
                chkElem.remove();
            }
        }
    }
    resetCheckBox(itemName, chkName, chk = false) {
        const itemCss = `.${itemName}`;
        const chkCss = `.${chkName}`;
        const elems = document.querySelectorAll(itemCss);
        for (const elem of elems) {
            const chks = elem.querySelectorAll(chkCss);
            if (chks.length === 0)
                continue;
            for (const inputElem of chks) {
                const chkElem = inputElem;
                if (chkElem.type.toLowerCase() !== `checkbox`)
                    continue;
                chkElem.checked = chk;
            }
        }
    }
    findCheckBox(parentElem, chkName) {
        const chkCss = `.${chkName}`;
        const chks = parentElem.querySelectorAll(chkCss);
        if (chks.length >= 1) {
            const chk = chks[0];
            return chk.checked;
        }
        return null;
    }
    toggleCheckBox(parentElem, chkName) {
        const chkCss = `.${chkName}`;
        const chks = parentElem.querySelectorAll(chkCss);
        if (chks.length >= 1) {
            const chk = chks[0];
            chk.checked = !chk.checked;
            return chk.checked;
        }
        return null;
    }
    getCheckBoxDataId(parentElem) {
        return parentElem.dataset.id;
    }
    copyCssToInlineStyle(selector, elem) {
        // すべてのスタイルシートを走査
        for (const sheet of document.styleSheets) {
            let rules;
            try {
                rules = sheet.cssRules; // CORS の場合は例外になるので try が必要
            }
            catch {
                continue;
            }
            for (const rule of rules) {
                // セレクタ一致した CSSStyleRule を探す
                if (rule instanceof CSSStyleRule && rule.selectorText === selector) {
                    const style = rule.style;
                    // すべてのプロパティを elem.style に転記
                    console.log(`[copyCssToInlineStyle] coping [${selector}]`);
                    for (let i = 0; i < style.length; i++) {
                        const prop = style[i]; // 例: "top"
                        const value = style.getPropertyValue(prop); // 例: "100px"
                        elem.style.setProperty(prop, value);
                        //console.log(`[copyCssToInlineStyle] copied [${prop}]=[${value}]`)
                    }
                    return;
                }
            }
        }
    }
}
export const HtmlMakerDialogB2Types = {
    Hide: "Hide",
    CopyPaste: "CopyPaste",
};
export const HtmlMakerDialogB3Types = {
    Hide: "Hide",
    MoveLowest: "MoveLowest",
};
export const HtmlMakerDialogB4Types = {
    Hide: "Hide",
    DialogHide: "DialogHide",
};
export const HtmlMakerDialogHTypes = {
    Hide: "Hide",
    Help: "Help",
};
export const HtmlMakerDialogOTypes = {
    Hide: "Hide",
    Option: "Option",
    OptionWithArgs: "OptionWithArgs",
};
export const HtmlMakerDialogGTypes = {
    Hide: "Hide",
    Guide: "Guide",
};
export const HtmlMakerCopyPasteTypes = {
    Copy: "Copy",
    Paste: "Paste",
    Cancel: "Cancel",
};
export class HtmlMakerDialogOptionEventArgs {
    leftPx = ``;
    topPx = ``;
    btnElem = null;
    dlg = null;
    enabled = true;
}
export class HtmlMakerClipboardMenu {
    B2Type = HtmlMakerDialogB2Types.Hide;
    onCopyPaste;
    dlg;
    dlgParent;
    toolNameB2 = ``;
    b2cursor = ``;
    /** コピー＆ペーストモード */
    SetType(B2Type = HtmlMakerDialogB2Types.CopyPaste, onCopyPaste) {
        this.B2Type = B2Type;
        this.onCopyPaste = onCopyPaste;
    }
    SetDlgInfo(dlg, dlgParent) {
        this.dlg = dlg;
        this.dlgParent = dlgParent;
    }
    MakeHTML(toolNameB2) {
        this.toolNameB2 = toolNameB2;
        /*
        let B2Btn = ""
        switch (this.B2Type) {
        case HtmlMakerDialogB2Types.CopyPaste:
            B2Btn = `<button class="${toolNameB2}" id="${toolNameB2}" title="Copy&Paste">[⇔]</button>`
            break
        case HtmlMakerDialogB2Types.Hide:
            break
        }
        */
        const B2Btn = `<button class="${toolNameB2}" id="${toolNameB2}" title="Copy&Paste">[⇔]</button>`;
        return B2Btn;
    }
    EnableEvent() {
        switch (this.B2Type) {
            case HtmlMakerDialogB2Types.CopyPaste:
                document.getElementById(`${this.toolNameB2}`).onclick = async () => {
                    if (this.dlgParent === undefined)
                        return;
                    if (this.onCopyPaste === undefined)
                        return;
                    if (this.isB2Allow() === false) {
                        console.log(`[${this.dlg.className}] not-allowed copy-paste`);
                        return;
                    }
                    const divElem = this.dlgParent;
                    const b2Elems = divElem.querySelectorAll(`.${this.toolNameB2}`);
                    const b2Elem = b2Elems.length >= 1 ? b2Elems[0] : null;
                    const htmlMaker = new HtmlMaker();
                    if (htmlMaker.IsEnabledElem(b2Elem) === false)
                        return;
                    const choiceItems = new Array;
                    const itemCopy = new HtmlMakerChoiceItem();
                    itemCopy.key = HtmlMakerCopyPasteTypes.Copy;
                    itemCopy.text = `📋コピー`; //クリップボードへコピー
                    choiceItems.push(itemCopy);
                    const itemPaste = new HtmlMakerChoiceItem();
                    itemPaste.key = HtmlMakerCopyPasteTypes.Paste;
                    itemPaste.text = `📋ペースト`; //クリップボードからペースト
                    choiceItems.push(itemPaste);
                    const itemCancel = new HtmlMakerChoiceItem();
                    itemCancel.key = HtmlMakerCopyPasteTypes.Cancel;
                    itemCancel.text = `❌キャンセル`;
                    choiceItems.push(itemCancel);
                    const choice = new HtmlMakerChoice();
                    choice.setChoiceItems(choiceItems);
                    htmlMaker.EnableElem(b2Elem, false);
                    const rcParent = htmlMaker.GetRect(divElem);
                    const rcDlg = htmlMaker.GetRect(this.dlg);
                    const rcB2 = htmlMaker.GetRect(b2Elem);
                    const parentName = this.dlg.id; //this.dlg.className
                    choice.setListener(`${parentName}-choice`, parentName, `${parentName}-B2`);
                    choice.applyCss();
                    /*
                    choice.show(`${parseInt(rcB2.left) - parseInt(rcParent.left)}`,
                                `0`)
                    */
                    /*
                    choice.show(`0`,
                                `0`)
                    */
                    choice.show(`${parseInt(rcB2.left) - parseInt(rcDlg.left) - 1}`, `${parseInt(rcB2.top) - parseInt(rcDlg.top) + parseInt(rcB2.height)}`);
                    choice.enableEvents(
                    /*onSelect*/
                    async (ev) => {
                        console.log(`[onSelect] ${ev.callerName} ${ev.result}`);
                        choice.dispose();
                        this.onCopyPaste(this.dlg, ev.result);
                        htmlMaker.EnableElem(b2Elem, true);
                    });
                };
                break;
            case HtmlMakerDialogB2Types.Hide:
                break;
        }
    }
    SetVisible(visible) {
        const btnElems = this.dlg.querySelector(`.${this.toolNameB2}`);
        if (btnElems !== null) {
            const btnElem = btnElems;
            btnElem.style.display = visible ? `` : `none`;
        }
    }
    setB2Allow(isAllow = true) {
        const elem = document.getElementById(`${this.toolNameB2}`);
        if (elem === null)
            return;
        if (this.b2cursor === ``)
            this.b2cursor = elem.style.cursor;
        const cursor = isAllow ? this.b2cursor : `not-allowed`;
        elem.style.cursor = cursor;
    }
    isB2Allow() {
        const elem = document.getElementById(`${this.toolNameB2}`);
        if (elem === null)
            return false;
        const cursor = elem.style.cursor === this.b2cursor ? true : false;
        return cursor;
    }
}
export class HtmlMakerDialogDesc {
    title = "";
    dlgName = "";
    B2Type = HtmlMakerDialogB2Types.Hide;
    B3Type = HtmlMakerDialogB3Types.MoveLowest;
    B4Type = HtmlMakerDialogB4Types.Hide;
    HType = HtmlMakerDialogHTypes.Hide;
    OType = HtmlMakerDialogOTypes.Hide;
    GType = HtmlMakerDialogGTypes.Hide;
    dlg;
    dlgParent;
    initLeft = 0;
    initTop = 0;
    cornerIndex = -1;
    mover = new DialogMover;
    onMoveDone;
    moverOnMoveDone = async () => {
        if (this.onMoveDone !== undefined) {
            await this.onMoveDone(this.dlg);
            this.cornerIndex = 0; //リセット
        }
    };
    resizer = new DialogResizer;
    onResizeDone;
    resizerOnResizeDone = async (deltaW, deltaH) => {
        if (this.onResizeDone !== undefined) {
            await this.onResizeDone(this.dlg, deltaW, deltaH);
        }
    };
    onOption;
    onHelp;
    onGuide;
    onCopyPaste;
    b2cursor = ``;
    /** コピー＆ペーストモード */
    SetB2Type(B2Type = HtmlMakerDialogB2Types.CopyPaste, onCopyPaste) {
        this.B2Type = B2Type;
        this.onCopyPaste = onCopyPaste;
    }
    /** 最背面有効モード */
    SetB3Type(B3Type = HtmlMakerDialogB3Types.MoveLowest) {
        this.B3Type = B3Type;
    }
    /** ダイアログを非表示 */
    SetB4Type(B4Type = HtmlMakerDialogB4Types.Hide) {
        this.B4Type = B4Type;
    }
    /** Option */
    SetOType(OType = HtmlMakerDialogOTypes.Option, onOption = undefined) {
        this.OType = OType;
        this.onOption = onOption;
    }
    /** Help */
    SetHType(HType = HtmlMakerDialogHTypes.Help, onHelp) {
        this.HType = HType;
        this.onHelp = onHelp;
    }
    /** Guide */
    SetGuide(GType = HtmlMakerDialogGTypes.Guide, onGuide) {
        this.GType = GType;
        this.onGuide = onGuide;
    }
    /** ダイアログ作成 */
    NewDialog(parentName, dlgName) {
        this.dlgName = dlgName;
        const dlg = document.createElement("dialog");
        dlg.id = dlgName;
        dlg.className = dlgName;
        const dlgParent = document.getElementById(parentName);
        dlgParent.appendChild(dlg);
        this.dlgParent = dlgParent;
        this.dlg = dlg;
        return dlg;
    }
    /** ダイアログ内容を設定 */
    SetContent(parentName, contentHTML, hidden = true) {
        const dlg = this.dlg;
        const B0Btn = `<button class="${this.toolNameB0}" id="${this.toolNameB0}" title="DragMove">[＊]</button>`;
        const B1Btn = `<button class="${this.toolNameB1}" id="${this.toolNameB1}" title="SideBy">[≫]</button>`;
        let B2Btn = "";
        switch (this.B2Type) {
            case HtmlMakerDialogB2Types.CopyPaste:
                B2Btn = `<button class="${this.toolNameB2}" id="${this.toolNameB2}" title="Copy&Paste">[⇔]</button>`;
                break;
            case HtmlMakerDialogB2Types.Hide:
                break;
        }
        let B3Btn = "";
        switch (this.B3Type) {
            case HtmlMakerDialogB3Types.MoveLowest:
                B3Btn = `<button class="${this.toolNameB3}" id="${this.toolNameB3}" title="MoveLowest">[_]</button>`;
                break;
            case HtmlMakerDialogB3Types.Hide:
                break;
        }
        let B4Btn = "";
        switch (this.B4Type) {
            case HtmlMakerDialogB4Types.DialogHide:
                B4Btn = `<button class="${this.toolNameB4}" id="${this.toolNameB4}" title="Close">[×]</button>`;
                break;
            case HtmlMakerDialogB4Types.Hide:
                break;
        }
        let optBtn = "";
        switch (this.OType) {
            case HtmlMakerDialogOTypes.Option:
            case HtmlMakerDialogOTypes.OptionWithArgs:
                optBtn = `<button class="${this.toolNameO}" id="${this.toolNameO}" title="Option">[…]</button>`;
                break;
            case HtmlMakerDialogOTypes.Hide:
                break;
        }
        let helpBtn = "";
        switch (this.HType) {
            case HtmlMakerDialogHTypes.Help:
                helpBtn = `<button class="${this.toolNameH}" id="${this.toolNameH}" title="Help">[？]</button>`;
                break;
            case HtmlMakerDialogHTypes.Hide:
                break;
        }
        let GBtn = "";
        switch (this.GType) {
            case HtmlMakerDialogGTypes.Guide:
                GBtn = `
<div class="${this.toolNameGuideOwn}" id="${this.toolNameGuideOwn}" style="position: relative;">
<button class="${this.toolNameGuideCtl}" id="${this.toolNameGuideCtl}" title="Guide">[G]</button>
</div>
`;
                break;
            case HtmlMakerDialogHTypes.Hide:
                break;
        }
        const toolBtns = `${B0Btn}${B1Btn}${B2Btn}${B3Btn}${B4Btn}${optBtn}${helpBtn}${GBtn}`;
        let dlgTool = "";
        if (this.title !== "") {
            dlgTool = `<div class="${this.titleName}">${this.title}${toolBtns}</div>`;
        }
        else {
            dlgTool = `<div class="${this.titleName}">${toolBtns}</div>`;
        }
        const toolsDiv = document.createElement("div");
        toolsDiv.innerHTML = dlgTool;
        dlg.innerHTML = contentHTML;
        const dlgParent = document.getElementById(parentName);
        //dlgParent!.hidden = hidden
        dlgParent.style.display = hidden ? `none` : ``;
        dlgParent.appendChild(toolsDiv);
        dlgParent.appendChild(dlg);
        this.applyCss();
    }
    /** ダイアログ操作イベント有効化 */
    EnableEventHandlers() {
        const left = this.dlgParent.style.left;
        const top = this.dlgParent.style.top;
        this.initLeft = parseInt(left.substring(0, left.length - 2));
        this.initTop = parseInt(top.substring(0, top.length - 2));
        console.log(`[EnableEventHandlers] ${this.dlgParent.id}::(${left},${top})::(${this.initLeft},${this.initTop})`);
        //B0
        const elemB0 = document.getElementById(`${this.toolNameB0}`);
        if (elemB0 !== null) {
            this.mover.onMoveDone = this.moverOnMoveDone;
            this.mover.attach(elemB0, this.dlgParent);
        }
        //B1
        const elemB1 = document.getElementById(`${this.toolNameB1}`);
        if (elemB1 !== null) {
            elemB1.onclick = async () => {
                if (this.dlgParent === undefined) {
                    return;
                }
                const bw = window.innerWidth;
                const bh = window.innerHeight;
                const myLeft = this.dlgParent.offsetWidth / 2;
                const myWidth = Math.max(this.dlgParent.offsetWidth, this.dlg.offsetWidth);
                const myHeight = this.dlgParent.offsetHeight + this.dlg.offsetHeight;
                this.cornerIndex = (this.cornerIndex + 1) % 4; // 0,1,2,3をループ
                switch (this.cornerIndex) {
                    case 0: // 左上
                        this.dlgParent.style.left = `${myLeft}px`;
                        this.dlgParent.style.top = `${0}px`;
                        break;
                    case 1: // 右上
                        this.dlgParent.style.left = `${bw - myWidth + myLeft}px`;
                        this.dlgParent.style.top = `${0}px`;
                        break;
                    case 2: // 右下
                        this.dlgParent.style.left = `${bw - myWidth + myLeft}px`;
                        this.dlgParent.style.top = `${bh - myHeight}px`;
                        break;
                    case 3: // 左下
                        this.dlgParent.style.left = `${myLeft}px`;
                        this.dlgParent.style.top = `${bh - myHeight}px`;
                        break;
                }
            };
        }
        //B2
        switch (this.B2Type) {
            case HtmlMakerDialogB2Types.CopyPaste:
                document.getElementById(`${this.toolNameB2}`).onclick = async () => {
                    if (this.dlgParent === undefined) {
                        return;
                    }
                    if (this.onCopyPaste === undefined) {
                        return;
                    }
                    if (this.isB2Allow() === false) {
                        console.log(`[${this.dlgName}] not-allowed copy-paste`);
                        return;
                    }
                    const divElem = this.dlgParent;
                    const b2Elems = divElem.querySelectorAll(`.${this.toolNameB2}`);
                    const b2Elem = b2Elems.length >= 1 ? b2Elems[0] : null;
                    const htmlMaker = new HtmlMaker();
                    if (htmlMaker.IsEnabledElem(b2Elem) === false)
                        return;
                    const choiceItems = new Array;
                    const itemCopy = new HtmlMakerChoiceItem();
                    itemCopy.key = HtmlMakerCopyPasteTypes.Copy;
                    itemCopy.text = `📋コピー`; //クリップボードへコピー
                    choiceItems.push(itemCopy);
                    const itemPaste = new HtmlMakerChoiceItem();
                    itemPaste.key = HtmlMakerCopyPasteTypes.Paste;
                    itemPaste.text = `📋ペースト`; //クリップボードからペースト
                    choiceItems.push(itemPaste);
                    const itemCancel = new HtmlMakerChoiceItem();
                    itemCancel.key = HtmlMakerCopyPasteTypes.Cancel;
                    itemCancel.text = `❌キャンセル`;
                    choiceItems.push(itemCancel);
                    const choice = new HtmlMakerChoice();
                    choice.setChoiceItems(choiceItems);
                    htmlMaker.EnableElem(b2Elem, false);
                    const rcParent = htmlMaker.GetRect(divElem);
                    const rcDlg = htmlMaker.GetRect(this.dlg);
                    const rcB2 = htmlMaker.GetRect(b2Elem);
                    const parentName = this.dlg.className;
                    choice.setListener(`${parentName}-choice`, parentName, `${parentName}-B2`);
                    choice.applyCss();
                    /*
                    choice.show(`${parseInt(rcParent.left) - parseInt(rcDlg.left) + parseInt(rcB2.left)}`,
                                `0`)
                    */
                    choice.show(`${parseInt(rcB2.left) - parseInt(rcParent.left)}`, `0`);
                    choice.enableEvents(
                    /*onSelect*/
                    async (ev) => {
                        console.log(`[onSelect] ${ev.callerName} ${ev.result}`);
                        choice.dispose();
                        this.onCopyPaste(this.dlg, ev.result);
                        htmlMaker.EnableElem(b2Elem, true);
                    });
                };
                break;
            case HtmlMakerDialogB2Types.Hide:
                break;
        }
        //B3
        switch (this.B3Type) {
            case HtmlMakerDialogB3Types.MoveLowest:
                document.getElementById(`${this.toolNameB3}`).onclick = async () => {
                    if (this.dlgParent === undefined) {
                        return;
                    }
                    const zindexHelper = new HtmlZindexHelper();
                    zindexHelper.MoveLowestLayer(this.dlgParent);
                };
                break;
            case HtmlMakerDialogB3Types.Hide:
                break;
        }
        //B4
        switch (this.B4Type) {
            case HtmlMakerDialogB4Types.DialogHide:
                document.getElementById(`${this.toolNameB4}`).onclick = async () => {
                    if (this.dlgParent === undefined) {
                        return;
                    }
                    const htmlMaker = new HtmlMaker();
                    htmlMaker.setVisible(this.dlgParent.className, false);
                };
                break;
            case HtmlMakerDialogB4Types.Hide:
                break;
        }
        //Option
        switch (this.OType) {
            case HtmlMakerDialogOTypes.Option:
            case HtmlMakerDialogOTypes.OptionWithArgs:
                document.getElementById(`${this.toolNameO}`).onclick = async () => {
                    if (this.dlgParent === undefined) {
                        return;
                    }
                    if (this.onOption !== undefined) {
                        if (this.OType === HtmlMakerDialogOTypes.OptionWithArgs) {
                            const divElem = this.dlgParent;
                            const oElems = divElem.querySelectorAll(`.${this.toolNameO}`);
                            const oElem = oElems.length >= 1 ? oElems[0] : null;
                            const oBtn = oElem instanceof HTMLButtonElement ? oElem : null;
                            const htmlMaker = new HtmlMaker();
                            const enabled = oBtn !== null ? htmlMaker.IsEnabledElem(oBtn) : false;
                            const rcParent = htmlMaker.GetRect(divElem);
                            const rcO = htmlMaker.GetRect(oElem);
                            const leftPx = `${parseInt(rcO.left) - parseInt(rcParent.left)}`;
                            const topPx = `0`;
                            const args = new HtmlMakerDialogOptionEventArgs();
                            args.leftPx = leftPx;
                            args.topPx = topPx;
                            args.btnElem = oBtn;
                            args.dlg = this.dlg;
                            args.enabled = enabled;
                            await this.onOption(this.dlg, this.OType, args);
                        }
                        else {
                            await this.onOption(this.dlg, this.OType, null);
                        }
                    }
                };
                break;
            case HtmlMakerDialogOTypes.Hide:
                break;
        }
        //Help
        switch (this.HType) {
            case HtmlMakerDialogHTypes.Help:
                document.getElementById(`${this.toolNameH}`).onclick = async () => {
                    if (this.dlgParent === undefined) {
                        return;
                    }
                    if (this.onHelp !== undefined) {
                        await this.onHelp(this.dlg, this.HType);
                    }
                };
                break;
            case HtmlMakerDialogHTypes.Hide:
                break;
        }
        //Guide
        switch (this.GType) {
            case HtmlMakerDialogGTypes.Guide:
                document.getElementById(`${this.toolNameGuideOwn}`).onclick = async () => {
                    if (this.dlgParent === undefined) {
                        return;
                    }
                    if (this.onGuide !== undefined) {
                        const divElem = this.dlgParent;
                        const gOwnElems = divElem.querySelectorAll(`.${this.toolNameGuideOwn}`);
                        const gOwnElem = gOwnElems.length >= 1 ? gOwnElems[0] : null;
                        if (gOwnElem !== null) {
                            await this.onGuide(this.dlg, this.GType, gOwnElem);
                        }
                    }
                };
                break;
            case HtmlMakerDialogGTypes.Hide:
                break;
        }
    }
    /** ダイアログリサイズ有効化 */
    EnableResize() {
        if (HtmlMakerMisc.isIPad && HtmlMakerMisc.isTouchDevice()) {
            console.log(`EVONA: Touch device detected. Priority given to flick scrolling.`);
            return;
        }
        const handleBtn = `<button class="${this.handleNameB0}" id="${this.handleNameB0}" title="Resize">[」]</button>`;
        const handleDiv = document.createElement("div");
        handleDiv.className = this.handleName;
        handleDiv.id = this.handleName;
        handleDiv.innerHTML = `${handleBtn}`;
        this.dlg.appendChild(handleDiv);
        const handleElem = document.getElementById(`${this.handleName}`);
        if (handleElem !== null) {
            handleElem.style.position = `absolute`;
            handleElem.style.left = `${this.dlg.clientWidth - handleElem.clientWidth}px`;
            handleElem.style.top = `${this.dlg.clientHeight - handleElem.clientHeight}px`;
            this.resizer.onResizeDone = this.resizerOnResizeDone;
            this.resizer.attach(handleElem, this.dlg);
        }
    }
    static GetDialogInfo(parentName) {
        const dlgParent = this.FindDialogParent(parentName);
        if (dlgParent === null) {
            return null;
        }
        const dlg = dlgParent.querySelector(`dialog`);
        if (dlg === null) {
            return null;
        }
        const res = new HtmlDialogInfo;
        const width = dlg.clientWidth;
        const height = dlg.clientHeight;
        res.name = parentName;
        res.left = dlgParent.style.left;
        res.top = dlgParent.style.top;
        res.width = `${width}px`;
        res.height = `${height}px`;
        return res;
    }
    static SetDialogInfo(info) {
        const dlgParent = this.FindDialogParent(info.name);
        if (dlgParent === null) {
            return false;
        }
        const dlg = dlgParent.querySelector(`dialog`);
        if (dlg === null) {
            return false;
        }
        const res = new HtmlDialogInfo;
        dlgParent.style.left = info.left;
        dlgParent.style.top = info.top;
        dlg.style.width = info.width;
        dlg.style.height = info.height;
        return true;
    }
    static FindDialogParent(parentName) {
        const dlgParent = document.getElementById(parentName);
        if (dlgParent === undefined || dlgParent === null) {
            return null;
        }
        return dlgParent;
    }
    get titleName() { return `${this.dlgName}-dlg-title-00`; }
    get toolNameB0() { return `${this.dlgName}-dlg-tool-b0`; }
    get toolNameB1() { return `${this.dlgName}-dlg-tool-b1`; }
    get toolNameB2() { return `${this.dlgName}-dlg-tool-b2`; }
    get toolNameB3() { return `${this.dlgName}-dlg-tool-b3`; }
    get toolNameB4() { return `${this.dlgName}-dlg-tool-b4`; }
    get toolNameO() { return `${this.dlgName}-dlg-tool-o0`; }
    get toolNameH() { return `${this.dlgName}-dlg-tool-h0`; }
    get toolNameGuideOwn() { return `${this.dlgName}-dlg-tool-guide-own`; }
    get toolNameGuideCtl() { return `${this.dlgName}-dlg-tool-guide-ctl`; }
    get handleName() { return `${this.dlgName}-dlg-handle-00`; }
    get handleNameB0() { return `${this.dlgName}-dlg-handle-b0`; }
    applyCss() {
        const styleId = `${this.dlgName}-header-style`;
        if (document.getElementById(styleId))
            return;
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
/* タイトルバー全体 */
.${this.titleName} {
    display: flex;
    align-items: center;
    justify-content: space-between; /* 左右に振り分け */
${HtmlMakerCommonCss.titleColorText}
    padding: 4px 8px;
    border: 1px solid #000;
    border-bottom: none;
    border-radius: 6px 6px 0 0; /* 上だけ角丸 */
    font-family: 'Segoe UI', sans-serif;
    font-size: 14px;
}

/* タイトル文字列 */
.${this.titleName} .dlg-title-text {
    font-weight: bold;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 10px;
}

/* ボタンをまとめるコンテナ */
.${this.titleName} .dlg-controls {
    display: flex;
    gap: 4px;
}

/* ボタン共通設定 */
.${this.titleName} button {
    background: #9c27b0;
    color: white;
    border: 1px solid #777;
    border-radius: 3px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    padding-bottom: 4px; /* 下にパディングを入れて、文字を上に押し上げる */
    cursor: pointer;
    transition: background 0.2s;
}

/* 1. まず共通のホバー設定を「B3以外」にも効くように整理 */
.${this.titleName} button:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}

/* 2. B3ボタン自体の背景色（ID指定は強いので、これで上書きされます） */
#${this.toolNameB3} { 
    background: #9c27b0; 
}

/* 3. 【重要】B3ボタン自体のホバー設定 */
#${this.toolNameB3}:hover { 
    background: #e1bee7; /* 黄色に映える薄紫などに変えるとポップです！ */
}


/* リサイズボタン設定 */
.${this.handleName} button {
    background: #d484e2;
    color: black;
    border: 1px solid #777;
    border-radius: 3px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    padding-bottom: 4px; /* 下にパディングを入れて、文字を上に押し上げる */
    cursor: pointer;
    transition: background 0.2s;
}
#${this.handleNameB0}:hover { 
    background: #e1bee7; /* 黄色に映える薄紫などに変えるとポップです！ */
}
`.trim();
        document.head.appendChild(style);
    }
    setB2Allow(isAllow = true) {
        const elem = document.getElementById(`${this.toolNameB2}`);
        if (elem === null)
            return;
        if (this.b2cursor === ``)
            this.b2cursor = elem.style.cursor;
        const cursor = isAllow ? this.b2cursor : `not-allowed`;
        elem.style.cursor = cursor;
    }
    isB2Allow() {
        const elem = document.getElementById(`${this.toolNameB2}`);
        if (elem === null)
            return false;
        const cursor = elem.style.cursor === this.b2cursor ? true : false;
        return cursor;
    }
}
/**Tableスクロールイベント */
export class HtmlMakerDivScroller {
    isPause = true;
    onStart;
    onEnd;
    divName = ``;
    isScrolling = false;
    onDivScroll = async (event) => {
        if (!this.isScrolling) {
            this.isScrolling = true;
            console.log('🚀 スクロールを開始しました！');
            this.isPause = false;
            if (this.onStart !== undefined)
                this.onStart();
        }
    };
    onDivScrollEnd = async (event) => {
        this.isScrolling = false;
        console.log('⏹️ スクロールが停止しました。');
        this.isPause = true;
        if (this.onEnd !== undefined)
            this.onEnd();
    };
    enableEvent(divName) {
        const div = document.getElementById(divName);
        if (div === null)
            return false;
        div.addEventListener('scroll', this.onDivScroll);
        div.addEventListener('scrollend', this.onDivScrollEnd);
        this.divName = divName;
        return true;
    }
    disableEvent() {
        if (this.divName === ``)
            return false;
        const div = document.getElementById(this.divName);
        if (div === null)
            return false;
        div.removeEventListener('scroll', this.onDivScroll);
        div.removeEventListener('scrollend', this.onDivScrollEnd);
        this.divName = ``;
        return true;
    }
}
export const HtmlMakerToolTipReqTypes = {
    None: "None",
    AddMemo: "AddMemo",
    AddTable: "AddTable",
    Remove: "Remove",
};
export class HtmlMakerToolTipReq {
    reqType = HtmlMakerToolTipReqTypes.None;
    parentClassName = ``; //DIALOGのCSSがセットされることを想定
    uiName = ``;
    itemName = ``;
    title = ``;
    memo = ``; //メモタイプ
    table; //テーブルタイプ
    tblAuxCss = ``;
}
export const HtmlMakerToolTipTypes = {
    None: "None",
    Memo: "Memo", //メモタイプ
    Table: "Table", //テーブルタイプ
};
export const HtmlMakerToolTipCloseTypes = {
    None: "None",
    Remove: "Remove", //完全抹消
    InVisible: "InVisible", //非表示
};
export const HtmlMakerToolTipMgrTypes = {
    None: "None",
    Mgr: "Mgr", //管理対象
    NotMgr: "NotMgr", //管理対象外
};
export class HtmlMakerToolTip {
    heightPx = `100`;
    dlg;
    div;
    name = ``;
    title = ``;
    closeType = HtmlMakerToolTipCloseTypes.None;
    MgrType = HtmlMakerToolTipMgrTypes.None;
    toolTipType = HtmlMakerToolTipTypes.None;
    cpMenu = new HtmlMakerClipboardMenu();
    actDiv = null;
    auxCssText = ``;
    NewToolTip(dlgParent, dlgName, closeType) {
        if (dlgParent === null)
            return null;
        const dlg = document.createElement("dialog");
        dlg.id = dlgName;
        dlg.className = this.dlgName;
        dlgParent.appendChild(dlg);
        this.dlg = dlg;
        this.cpMenu.SetDlgInfo(this.dlg, dlgParent);
        const B0Btn = `<button class="${this.toolNameB0}" id="${this.toolNameB0}" title="DragMove">[＊]</button>`;
        const B2Btn = this.cpMenu.MakeHTML(this.toolNameB2);
        const B4Btn = closeType !== HtmlMakerToolTipCloseTypes.None ?
            `<button class="${this.toolNameB4}" id="${this.toolNameB4}" title="Close">[×]</button>`
            : ``;
        const MgBtn = `<button class="${this.toolNameMg}" id="${this.toolNameMg}" title="ActivateMgr">[Ｍ]</button>`;
        const title = `<span class="${this.toolNameTitle}" id="${this.toolNameTitle}" title="UIName">UIName</span>`;
        const ActBtn = `<button class="${this.toolNameAct}" id="${this.toolNameAct}" title="Action">${this.actDisplayText}</button>`;
        const ActBtns = `<div class="${this.toolNameActs}" id="${this.toolNameActs}">${ActBtn}</div>`;
        const toolBtns = `${B0Btn}${B2Btn}${B4Btn}${MgBtn}${title}${ActBtns}`;
        const toolsDiv = document.createElement("div");
        toolsDiv.id = this.toolDivName;
        toolsDiv.className = this.toolDivName;
        toolsDiv.innerHTML = toolBtns;
        const div = document.createElement("div");
        const divName = this.divName;
        div.id = divName;
        div.className = divName;
        dlg.appendChild(toolsDiv);
        dlg.appendChild(div);
        this.div = div;
        const actDivs = dlg.getElementsByClassName(this.toolNameActs);
        this.actDiv = actDivs.length >= 1 ? actDivs[0] : null;
        this.closeType = closeType;
        return dlg;
    }
    SetTitle(title) {
        const divElems = this.dlg.getElementsByClassName(`${this.toolDivName}`);
        if (divElems.length >= 1) {
            const divElem = divElems[0]; //toolsDiv
            const titleElems = divElem.getElementsByClassName(`${this.toolNameTitle}`);
            if (titleElems.length >= 1) {
                const titleElem = titleElems[0];
                titleElem.innerHTML = title;
            }
        }
    }
    SetMemo(memoText, memoAuxCss) {
        if (this.toolTipType !== HtmlMakerToolTipTypes.None)
            return false;
        if (this.memoSpanElem === null)
            this.initMemoMode(this.div);
        if (this.memoSpanElem !== null)
            this.memoSpanElem.innerHTML = memoText;
        this.auxCssText = memoAuxCss;
        this.toolTipType = HtmlMakerToolTipTypes.Memo;
        return true;
    }
    SetTable(table, tblAuxCss) {
        if (this.toolTipType !== HtmlMakerToolTipTypes.None)
            return false;
        if (table === undefined)
            return false;
        if (this.tblElem === null) {
            this.table = table;
            this.initTableMode(this.div);
        }
        this.auxCssText = tblAuxCss;
        this.toolTipType = HtmlMakerToolTipTypes.Table;
        return true;
    }
    tableFirstRowCssText = ``;
    SetTableFirstRowHeader() {
        this.tableFirstRowCssText = `
/* ★ここを追加：ヘッダの行（一番最初のTR）にあるTDを固定する */
.${this.divName} table tr:first-child td {
  position: sticky;  /* スクロールしても位置を固定する設定 */
  top: 0;            /* 一番上に固定 */
  background-color: ${HtmlMakerCommonCss.DefaultYellowColor}; /* 重要：後ろの文字が透けないように背景色を指定 */
  z-index: 1;        /* データ行より手前に表示させる */
}
`.trim();
    }
    InvisibleAll() {
        this.VisibleMgrBtn(false);
        this.VisibleActBtn(false);
        this.cpMenu.SetVisible(false);
    }
    VisibleCpBtn(visible) {
        const btnElems = this.dlg.querySelector(`.${this.toolNameB2}`);
        if (btnElems !== null) {
            const btnElem = btnElems;
            btnElem.style.display = visible ? `` : `none`;
        }
    }
    VisibleMgrBtn(visible) {
        const btnElems = this.dlg.querySelector(`.${this.toolNameMg}`);
        if (btnElems !== null) {
            const btnElem = btnElems;
            btnElem.style.display = visible ? `` : `none`;
        }
    }
    VisibleActBtn(visible) {
        const btnElems = this.dlg.querySelector(`.${this.toolNameAct}`);
        if (btnElems !== null) {
            const btnElem = btnElems;
            btnElem.style.display = visible ? `` : `none`;
        }
    }
    SetTableValue(classify, selectedKey, selectedValue, changed) {
        for (const row of this.table.rows) {
            for (const col of row.cols) {
                for (const item of col.items) {
                    if (item.typeInfo.using.itemType !== HtmlMakerOptionItemUsingTypes.Radio)
                        continue;
                    const radio = item.typeInfo.using.radio;
                    if (radio.classify !== classify)
                        continue;
                    if (radio.selectType === HtmlMakerOptionItemSelectTypes.Single) {
                        radio.selectedItem = selectedKey;
                        return;
                    }
                    else {
                        //selectedKey を colIndex とみなす
                        let colIndex = -1;
                        let colFind = -1;
                        for (const pair of radio.selectionPair) {
                            colIndex++;
                            const [title, value] = pair.split(`/`);
                            if (value === selectedKey) {
                                colFind = colIndex;
                                break;
                            }
                        }
                        if (colFind === -1)
                            continue;
                        //選択状態のみの配列を作る
                        //console.log(`*multi before*`, radio.selectionPair, radio.selectedItems, colFind)
                        if (changed === false) {
                            //配列から削除
                            const delIndex = radio.selectedItems.findIndex(sel => sel === selectedKey);
                            if (delIndex !== undefined)
                                radio.selectedItems.splice(delIndex, 1);
                        }
                        else {
                            //配列に追加
                            let selectedItems = new Array;
                            if (radio.selectedItems.length >= 1)
                                selectedItems = selectedItems.concat(radio.selectedItems);
                            selectedItems.push(selectedKey);
                            radio.selectedItems = selectedItems.sort((a, b) => { return a.localeCompare(b); });
                        }
                        console.log(`*multi changed*`, radio.selectionPair, radio.selectedItems, colFind);
                        return;
                    }
                }
            }
        }
    }
    memoSpanElem = null;
    initMemoMode(ownerDivElem) {
        const span = document.createElement("span");
        const spanName = this.spanName;
        span.id = spanName;
        span.className = spanName;
        ownerDivElem.appendChild(span);
        this.memoSpanElem = span;
    }
    actDisplayText = ``;
    onActionReq;
    EnableAction(actDisplayText, onActionReq) {
        this.actDisplayText = actDisplayText;
        this.onActionReq = onActionReq;
        const elems = this.actDiv.getElementsByClassName(this.toolNameAct);
        if (elems.length >= 1) {
            const elem = elems[0];
            elem.textContent = actDisplayText;
        }
    }
    onChangedTableSelection;
    onButtonClicked;
    onCheckChanged;
    table;
    tblElem = null;
    initTableMode(ownerDivElem) {
        const className = this.tableName;
        const tblHTML = this.table.ToHTML(className, className);
        const item = new HtmlMakerItem;
        item.props.name = ``;
        item.props.id = className;
        item.props.className = className;
        item.props.option.setTable(tblHTML);
        item.props.option.onSelect = async (evArgs) => {
            //console.log(`classify = ${evArgs.classify} targetId = ${evArgs.targetId}`)
        };
        const htmlMaker = new HtmlMaker();
        htmlMaker.add(item);
        const tableHtml = htmlMaker.ToHTML();
        const tbl = HtmlMakerMisc.ToElem(tableHtml);
        ownerDivElem.appendChild(tbl);
        this.tblElem = tbl;
    }
    get Table() { return this.tblElem; }
    TableRows() { return this.tblElem !== null ? this.tblElem.rows : null; }
    get FirstVisbleRow() {
        const tableElem = this.Table;
        if (tableElem === null)
            return null;
        const containerTop = tableElem.parentElement.getBoundingClientRect().top;
        let firstVisibleRow = null;
        for (let row of tableElem.rows) {
            const rowRect = row.getBoundingClientRect();
            // 行の下端が、コンテナの上端より下にあれば「見えている」と判定
            if (rowRect.bottom > containerTop + 6) { //+6=見えている感覚で少し下で比較
                firstVisibleRow = row;
                break; // 最初に見つかった行が先頭行なのでループを抜ける
            }
        }
        return firstVisibleRow;
    }
    elemText(elem) {
        if (elem instanceof HTMLInputElement) {
            return elem.value;
        }
        return elem.textContent;
    }
    RowTextsByIndex(rowIndex) {
        const rows = this.TableRows();
        if (rows === null)
            return null;
        const row = rows[rowIndex];
        const resMap = new Map;
        for (const td of row.cells) {
            const elem = td.children[0];
            resMap.set(elem.className, this.elemText(elem));
        }
        return resMap;
    }
    RowTexts(row) {
        const resMap = new Map;
        for (const td of row.cells) {
            const elem = td.children[0];
            resMap.set(elem.className, this.elemText(elem));
        }
        return resMap;
    }
    AllVisibleRowsText(findColName, igroreText) {
        const rows = this.TableRows();
        if (rows === null)
            return null;
        const resMap = new Map;
        let firstVisibleRowIndex = -1;
        let cellIndex = -1;
        for (const row of rows) {
            if (firstVisibleRowIndex === -1) {
                if (row.style.display !== ``)
                    continue;
                const cols = row.getElementsByClassName(findColName);
                if (cols.length === 0)
                    continue;
                const col = cols[0];
                if (col.textContent === igroreText)
                    continue;
                firstVisibleRowIndex = row.rowIndex;
                cellIndex = col.parentElement.cellIndex;
                resMap.set(row.rowIndex, col.textContent);
            }
            else {
                const col = row.cells[cellIndex];
                if (col.textContent === igroreText)
                    continue;
                resMap.set(row.rowIndex, col.textContent);
            }
        }
        //console.log(resMap)
        return resMap;
    }
    get TableFirstRowIndex() { return this.table.firstRowIndex; }
    RowRects(rowIndex) {
        const rows = this.TableRows();
        if (rows === null)
            return null;
        const row = rows[rowIndex];
        const resMap = new Map;
        for (const td of row.cells) {
            const elem = td.children[0];
            const rect = td.getBoundingClientRect();
            resMap.set(elem.className, rect);
        }
        return resMap;
    }
    RowElems(rowIndex) {
        const rows = this.TableRows();
        if (rows === null)
            return null;
        const row = rows[rowIndex];
        const resMap = new Map;
        const activeKeyText = HtmlMakerCommonCss.radioActiveKeyText;
        for (const td of row.cells) {
            const elem = td.children[0];
            let className = elem.className;
            const pos = className.indexOf(activeKeyText);
            if (pos !== -1) {
                className = className.substring(0, pos - 1);
            }
            resMap.set(className, elem);
        }
        return resMap;
    }
    ToggleActive(elem) {
        const activeKeyText = HtmlMakerCommonCss.radioActiveKeyText;
        let changed = false;
        if (elem.classList.contains(activeKeyText)) {
            elem.classList.remove(activeKeyText);
            changed = false;
        }
        else {
            elem.classList.add(activeKeyText);
            changed = true;
        }
        return changed;
    }
    curRowIndex = -1;
    SetCurRowIndex(rowIndex = -1, toScroll = false) {
        if (this.tblElem === null)
            return false;
        if (rowIndex === -1) {
            this.curRowIndex = this.table.firstRowIndex;
        }
        else {
            if (rowIndex >= this.tblElem.rows.length)
                return false;
            this.curRowIndex = rowIndex;
        }
        if (toScroll) {
            this.tblElem.rows[rowIndex].scrollIntoView({ behavior: 'auto', block: 'start' });
            //this.tblElem.scrollTop = risticToolTip!.Table!.rows[rowIndex].offsetTop
        }
        return true;
    }
    get CurRowIndex() { return this.curRowIndex; }
    get CurRow() { return this.tblElem === null ? null : this.tblElem.rows[this.curRowIndex]; }
    get MatchRowIndex() { return this.matchRowIndex; }
    matchRowIndex = -1;
    async FindNextRow(callback) {
        this.matchRowIndex = -1;
        if (this.tblElem === null)
            return false;
        if (this.curRowIndex === -1)
            return false;
        let rowIndex = this.curRowIndex + 1;
        while (rowIndex < this.tblElem.rows.length) {
            const res = await callback(this.tblElem, this.tblElem.rows[rowIndex]);
            if (res === true) {
                this.matchRowIndex = rowIndex;
                return true;
            }
            rowIndex++;
        }
        return false;
    }
    async FindPrevRow(callback) {
        this.matchRowIndex = -1;
        if (this.tblElem === null)
            return false;
        if (this.curRowIndex === -1)
            return false;
        let rowIndex = this.curRowIndex - 1;
        while (rowIndex >= 0) {
            const res = await callback(this.tblElem, this.tblElem.rows[rowIndex]);
            if (res === true) {
                this.matchRowIndex = rowIndex;
                return true;
            }
            rowIndex--;
        }
        return false;
    }
    /**チェックしたときの挙動 */
    autoCheck = true;
    /**チェックの初期状態 */
    initChecks = new Map;
    /**チェックのデフォルト値 */
    defCheck = false;
    appendCheckBox(tdParentName, chkName, visible = true) {
        const rows = this.TableRows();
        if (rows === null)
            return;
        const tdCss = `.${tdParentName}`;
        const chkCss = `.${chkName}`;
        for (const row of rows) {
            const tds = row.querySelectorAll(tdCss);
            if (tds.length === 0)
                continue;
            const td = tds[0].parentElement;
            if (td === null)
                continue;
            const chks = td.querySelectorAll(chkCss);
            if (chks.length >= 1)
                continue;
            const itemId = row.getAttribute(`item-id`);
            let checked = this.initChecks.get(row.rowIndex);
            const chkElem = document.createElement(`input`);
            chkElem.type = `checkbox`;
            chkElem.className = chkName;
            chkElem.id = chkName;
            chkElem.value = ``;
            chkElem.checked = checked !== undefined ? checked : this.defCheck;
            chkElem.style.display = visible ? `` : `none`;
            //if (!auto)
            //    chkElem.style.pointerEvents = `none`    //自動チェックON/OFFを禁止
            chkElem.style.accentColor = HtmlMakerCommonCss.onColor;
            if (itemId !== null)
                chkElem.setAttribute(`item-id`, itemId);
            td.appendChild(chkElem);
        }
    }
    removeCheckBox(tdName, chkName) {
        const rows = this.TableRows();
        if (rows === null)
            return;
        const tdCss = `.${tdName}`;
        const chkCss = `.${chkName}`;
        for (const row of rows) {
            const tds = row.querySelectorAll(tdCss);
            if (tds.length === 0)
                continue;
            const td = tds[0].parentElement;
            if (td === null)
                continue;
            const chks = td.querySelectorAll(chkCss);
            //if (chks.length >= 1) continue
            for (const chkElem of chks) {
                td.removeChild(chkElem);
                chkElem.remove();
            }
        }
    }
    resetCheckBox(tdName, chkName, chk = false) {
        const rows = this.TableRows();
        if (rows === null)
            return;
        const tdCss = `.${tdName}`;
        const chkCss = `.${chkName}`;
        for (const row of rows) {
            const tds = row.querySelectorAll(tdCss);
            if (tds.length === 0)
                continue;
            const chks = tds[0].querySelectorAll(chkCss);
            if (chks.length === 0)
                continue;
            for (const inputElem of chks) {
                const chkElem = inputElem;
                if (chkElem.type.toLowerCase() !== `checkbox`)
                    continue;
                chkElem.checked = chk;
            }
        }
    }
    visibleRows(visible = true) {
        const rows = this.TableRows();
        if (rows === null)
            return;
        for (const row of rows) {
            row.style.display = visible ? `` : `none`;
        }
    }
    visibleToggleRowsElem(tdNames) {
        const rows = this.TableRows();
        if (rows === null)
            return;
        for (const row of rows) {
            for (const tdName of tdNames) {
                const td = row.cells.namedItem(tdName);
                if (td !== null) {
                    const visible = td.style.display === `` ? true : false;
                    td.style.display = !visible ? `` : `none`;
                }
                const tdCss = `.${tdName}`;
                const tds = row.querySelectorAll(tdCss);
                if (tds.length === 0)
                    continue;
                const elem = tds[0];
                const visible = elem.style.display === `` ? true : false;
                elem.style.display = !visible ? `` : `none`;
            }
        }
    }
    getRowsCheckValues(tdName) {
        const rows = this.TableRows();
        if (rows === null)
            return null;
        const checkedMap = new Map;
        for (const row of rows) {
            const tdCss = `.${tdName}`;
            const tds = row.querySelectorAll(tdCss);
            if (tds.length === 0)
                continue;
            for (const td of tds) {
                const elem = td;
                if (td.tagName.toLocaleUpperCase() === `INPUT` && elem.type.toLocaleUpperCase() === `CHECKBOX`) {
                    checkedMap.set(row.rowIndex, elem.checked);
                    break;
                }
            }
        }
        return checkedMap;
    }
    Show(parentClassName) {
        this.dlg.show();
        let dlgParent = null;
        if (parentClassName instanceof HTMLElement) {
            dlgParent = parentClassName;
        }
        else {
            dlgParent = document.getElementById(parentClassName);
        }
        if (dlgParent !== null) {
            const rcParent = dlgParent.getBoundingClientRect();
            let px = rcParent.left + rcParent.width / 2;
            let py = rcParent.top + rcParent.height / 2;
            if (rcParent.height === 0) {
                const rcDlg = this.dlg.getBoundingClientRect();
                py = rcParent.top + (rcParent.right - rcDlg.height) / 2;
            }
            const rcDlg = this.dlg.getBoundingClientRect();
            if (px - rcDlg.width / 2 <= 0)
                px += rcParent.width / 4;
            this.dlg.style.left = `${px}px`;
            this.dlg.style.top = `${py}px`;
        }
    }
    onFirstVisible = undefined;
    firstVisibled = false;
    EnableFirstVisible(onFirstVisible) {
        this.onFirstVisible = onFirstVisible;
        this.firstVisibled = false;
    }
    onChangeVisible = undefined;
    SetVisible(isShow = true) {
        const beforeVisible = this.GetVisible();
        this.dlg.style.display = isShow ? `` : `none`;
        if (isShow) {
            HtmlMakerToolTipMgr.MoveTop(this.name);
        }
        if (this.onFirstVisible !== undefined && this.firstVisibled === false) {
            if (isShow) {
                this.firstVisibled = true;
                this.onFirstVisible();
            }
        }
        if (this.onChangeVisible !== undefined) {
            this.onChangeVisible(beforeVisible === false && isShow === true);
        }
    }
    GetVisible() {
        return this.dlg.style.display === `none` ? false : true;
    }
    EnableEvents() {
        const elemB0 = document.getElementById(this.toolNameB0);
        elemB0.onclick = this.onB0Click;
        this.mover.onMoveDone = this.moverOnMoveDone;
        this.mover.attach(elemB0, this.dlg);
        const elemB4 = document.getElementById(this.toolNameB4);
        if (elemB4 !== null)
            elemB4.onclick = this.onB4Click;
        document.getElementById(this.toolNameMg).onclick = this.onMgClick;
        const elem = document.getElementById(this.toolNameAct);
        if (elem !== null)
            elem.onclick = this.onActClick;
        this.EnableTableClick();
    }
    EnableTableClick() {
        if (this.tblElem !== null) {
            this.tblElem.addEventListener(`click`, this.onTableClick);
        }
    }
    DisableTableClick() {
        if (this.tblElem !== null) {
            this.tblElem.removeEventListener(`click`, this.onTableClick);
        }
    }
    tableScroll = null;
    rowObserver = null;
    onNotifyWatched;
    /**テーブル内容のスクロール検知 */
    EnableTableWatch(onNotifyWatched) {
        const div = this.div;
        if (div === null)
            return;
        const table = this.tblElem;
        if (table === null)
            return;
        const options = {
            // 【最重要！】ブラウザに「画面全体じゃなく、このスクロールするDIVの檻を基準に交差を監視しろ！」と法律を敷く
            root: div,
            rootMargin: '0px 0px -95% 0px', //DIVの下側95%を「監視対象外」にし、一番上の5%だけにセンサーを敷く！
            threshold: 0 // センサー領域に1ピクセルでも入ったら発火
        };
        const rowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // 対象の行（tr）を一本釣り
                const trElem = entry.target;
                if (entry.isIntersecting) {
                    if (this.tableScroll !== null && this.tableScroll.isPause) {
                        //const rowId = trElem.getAttribute("item-id")
                        //console.log(`[${trElem.className}::${rowId}] が見えました！(ポーズ中)`);
                        return;
                    }
                    // 😄 行がDIVの見える領域に「入った時」の処理
                    //const rowId = trElem.getAttribute("item-id")
                    //console.log(`[${trElem.className}::${rowId}] が見えました！(ポーズ解除)`);
                    // ここで特殊なエフェクトをかけたり、データを逆引きしてログを出したりする
                    if (this.onNotifyWatched !== undefined) {
                        this.onNotifyWatched(trElem);
                    }
                }
                else {
                    // 😢 行がスクロールしてDIVの領域から「完全に隠れた時」の処理
                    //console.log(`${trElem.className} が隠れました！`);
                }
                // ⚡️ 【ここがお父様の仰る核心！】
                // ここで「observer.unobserve(entry.target)」を【呼び出さない】（引き算する）ことで、
                // 何度スクロールで行ったり来たりしても、入る度・隠れる度にこの関数が無限にトリガーされます！
            });
        }, options);
        for (const row of table.rows) {
            rowObserver.observe(row);
        }
        this.rowObserver = rowObserver;
        this.onNotifyWatched = onNotifyWatched;
        this.tableScroll = new HtmlMakerDivScroller();
        this.tableScroll.enableEvent(this.divName);
    }
    DisableTableWatch() {
        if (this.tableScroll === null)
            return;
        this.tableScroll.disableEvent();
        if (this.rowObserver === null)
            return;
        const table = this.tblElem;
        if (table === null)
            return;
        for (const row of table.rows) {
            this.rowObserver.unobserve(row);
        }
        this.rowObserver = null;
        this.onNotifyWatched = undefined;
    }
    onMouseUp = undefined;
    EnableMouseUp(onMouseUp) {
        if (this.tblElem !== null) {
            this.onMouseUp = onMouseUp;
            this.tblElem.tBodies[0].addEventListener(`mouseup`, this.onTableMouseUp);
        }
    }
    DisableMouseUp() {
        if (this.tblElem !== null) {
            this.onMouseUp = undefined;
            this.tblElem.tBodies[0].removeEventListener(`mouseup`, this.onTableMouseUp);
        }
    }
    onTableMouseUp = async (event) => {
        const target = event.target;
        if (target instanceof HTMLSpanElement) { }
        else
            return;
        if (this.onMouseUp !== undefined) {
            await this.onMouseUp(target);
        }
    };
    downTimeStamp = 0;
    LONG_PRESS_MS = 350; // 350ms以上なら長タップ判定
    onLongTap = undefined;
    EnableLongTap(onLongTap) {
        if (this.tblElem !== null) {
            this.onLongTap = onLongTap;
            const elem = this.tblElem.tBodies[0];
            elem.addEventListener(`pointerdown`, this.onTablePointerDn);
            elem.addEventListener(`pointerup`, this.onTablePointerUp);
        }
    }
    DisableLongTap() {
        if (this.tblElem !== null) {
            this.onLongTap = undefined;
            const elem = this.tblElem.tBodies[0];
            elem.removeEventListener(`pointerdown`, this.onTablePointerDn);
            elem.removeEventListener(`pointerup`, this.onTablePointerUp);
        }
    }
    onTablePointerDn = async (event) => {
        const target = event.target;
        console.log(`**onTablePointerDn**`, event.timeStamp);
        this.downTimeStamp = event.timeStamp;
    };
    onTablePointerUp = async (event) => {
        const target = event.target;
        //console.log(`**onTablePointerUp**`, event.timeStamp)
        // 離した瞬間のタイムスタンプとの差分を計算！
        const duration = event.timeStamp - this.downTimeStamp;
        const isLongPress = duration >= this.LONG_PRESS_MS;
        //console.log(`押していた時間: ${duration}ms -> 長タップ判定: ${isLongPress}`)
        if (this.onLongTap !== undefined) {
            // isLongPress が true なら下ジャンプ、false なら上ジャンプ！
            await this.onLongTap(isLongPress, target);
        }
        this.downTimeStamp = 0;
    };
    enableSelectStart = false;
    notifySelectClassNames = null;
    notifySelectElem = null;
    get enableOnSelection() { return this.enableSelectStart && this.notifySelectElem !== null && this.downTimeStamp >= 1; }
    onSelection = undefined;
    EnableSelection(onSelection, notifyClassNames) {
        if (this.tblElem !== null) {
            document.addEventListener(`selectionchange`, this.onTableSelection);
            this.enableSelectStart = true;
            this.notifySelectClassNames = notifyClassNames;
            this.notifySelectElem = null;
            this.onSelection = onSelection;
        }
    }
    DisableSelection() {
        if (this.tblElem !== null) {
            document.removeEventListener(`selectionchange`, this.onTableSelection);
        }
        this.enableSelectStart = false;
        this.notifySelectClassNames = null;
        this.notifySelectElem = null;
        this.onSelection = undefined;
    }
    onTableSelection = async (event) => {
        //const target = event.target as HTMLElement
        this.notifySelectElem = null;
        const selection = document.getSelection();
        if (selection === null)
            return;
        const hasSelection = selection && !selection.isCollapsed && selection.toString().length > 0;
        if (hasSelection === false)
            return;
        const node = selection.anchorNode;
        if (node === null)
            return;
        const elem = node.parentElement;
        if (elem === null)
            return;
        if (this.notifySelectClassNames === null)
            return;
        const exist = this.notifySelectClassNames.find(name => name === elem.className);
        if (exist === undefined)
            return;
        //console.log(`**onTableSelection**`, event.timeStamp, elem)
        this.notifySelectElem = elem;
        if (this.enableOnSelection && this.onSelection !== undefined) {
            await this.onSelection(this.notifySelectElem);
        }
    };
    onB0Click = async (event) => {
        console.log(`onB0Click`, event);
    };
    onB4Click = async (event) => {
        if (this.closeType === HtmlMakerToolTipCloseTypes.InVisible) {
            this.SetVisible(false);
            return;
        }
        await HtmlMakerToolTipMgr.Remove(this.dlg.id);
    };
    onMgClick = async (event) => {
        //console.log(`onMgClick`, event)
        await HtmlMakerToolTipMgr.Activate(this);
    };
    onActClick = async (event) => {
        //console.log(`onActClick`, event)
        if (this.onActionReq !== undefined) {
            await this.onActionReq();
        }
    };
    onTableClick = async (event) => {
        //console.log(`onTableClick`, event)
        const elemSend = event.target;
        if (elemSend === null)
            return;
        switch (elemSend.tagName) {
            case `DIV`:
                await this.onDivEvent(elemSend);
                return;
            case `BUTTON`:
                if (this.onButtonClicked !== undefined) {
                    const btn = elemSend;
                    const col = btn.parentElement;
                    const row = col.parentElement;
                    const tbl = row.parentElement;
                    const div = tbl.parentElement;
                    const itemId = btn.getAttribute(`item-id`);
                    const rowindex = itemId !== null ? Number(itemId) : -1;
                    await this.onButtonClicked(rowindex, btn, div, tbl, row, col);
                }
                return;
            case `INPUT`:
                const input = elemSend;
                if (input.type === `checkbox`) {
                    if (this.onCheckChanged !== undefined) {
                        //if (this.autoCheck === false)
                        //    event.preventDefault()  //チェック状態を元に戻す
                        const col = input.parentElement;
                        const row = col.parentElement;
                        const tbl = row.parentElement;
                        const div = tbl.parentElement;
                        const itemId = input.getAttribute(`item-id`);
                        const rowindex = itemId !== null ? Number(itemId) : -1;
                        await this.onCheckChanged(rowindex, input, div, tbl, row, col);
                    }
                }
                return;
        }
    };
    async onDivEvent(elemSend) {
        const activeElem = elemSend;
        const activeElemClassName = activeElem.className !== `` ? activeElem.classList[0] : ``;
        const activeElemContent = activeElem.textContent;
        const activeKeyText = HtmlMakerCommonCss.radioActiveKeyText;
        //console.log(`onTableClick`, elemSend)
        let selectedKey = ``;
        let selectedValue = ``;
        for (const row of this.table.rows) {
            for (const col of row.cols) {
                for (const item of col.items) {
                    if (item.className !== activeElemClassName)
                        continue;
                    if (item.typeInfo.using.itemType !== HtmlMakerOptionItemUsingTypes.Radio)
                        continue;
                    if (activeElem.dataset === undefined)
                        continue;
                    if (item.typeInfo.using.radio.classify !== activeElem.dataset.classify)
                        continue;
                    for (const pair of item.typeInfo.using.radio.selectionPair) {
                        if (pair.length === 0)
                            continue;
                        const keyValue = pair.split(`/`);
                        if (keyValue.length <= 1)
                            continue;
                        if (keyValue[0] === activeElemContent) {
                            let changed = false;
                            if (item.typeInfo.using.radio.selectType === HtmlMakerOptionItemSelectTypes.Single) {
                                document.querySelectorAll(`.${elemSend.className}`).forEach(el => el.classList.remove(activeKeyText));
                                elemSend.classList.add(activeKeyText);
                                changed = true;
                            }
                            else {
                                if (elemSend.classList.contains(activeKeyText)) {
                                    elemSend.classList.remove(activeKeyText);
                                    changed = false;
                                }
                                else {
                                    elemSend.classList.add(activeKeyText);
                                    changed = true;
                                }
                            }
                            if (this.onChangedTableSelection !== undefined) {
                                selectedValue = keyValue[0];
                                selectedKey = keyValue[1];
                                const col = activeElem.parentElement;
                                const row = col.parentElement;
                                //console.log(`onTableClick::radio`, selectedKey, selectedValue, row.rowIndex)
                                await this.onChangedTableSelection(item.typeInfo.using.radio.classify, selectedKey, selectedValue, changed, row.rowIndex);
                            }
                            return;
                        }
                    }
                }
            }
        }
    }
    applyCss() {
        const styleId = `${this.name}-style`;
        if (document.getElementById(styleId))
            return;
        const topPx = `100`;
        const leftPx = `120`;
        const spanCssText = this.toolTipType === HtmlMakerToolTipTypes.Memo ? `
.${this.spanName} {
white-space: pre;
${HtmlMakerCommonCss.textEnableText}
}
`.trim() : ``;
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
/* ツールチップ外枠 */
.${this.dlgName} {
  position: fixed;
  inset: auto; /* ブラウザの中央寄せを無効化 */
  top: ${topPx}px;
  left: ${leftPx}px;
  transform: translateX(-50%);

${HtmlMakerCommonCss.dlgBkColorText}
  padding: 2px;
  ${HtmlMakerCommonCss.borderShadowText}

 ${HtmlMakerCommonCss.titleColorText}
}

/* ボタンをまとめるコンテナ */
.${this.toolDivName} {
 ${HtmlMakerCommonCss.titleColorText}
 display: flex;
 gap: 0px;
}
/* ボタン共通設定 */
.${this.toolDivName} button {
    background: #9c27b0;
    color: white;
    border: 1px solid #777;
    border-radius: 3px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    padding-bottom: 4px; /* 下にパディングを入れて、文字を上に押し上げる */
    cursor: pointer;
    transition: background 0.2s;
}
.${this.toolDivName} button:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}

/* アクションボタン設定 */
.${this.toolNameActs} {
    margin-left: auto;
}
#${this.toolNameAct} {
    background: ${HtmlMakerCommonCss.normBkColor};
    color: black;
    border: 1px solid #777;
    border-radius: 3px;
    width: 36px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    padding-bottom: 4px; /* 下にパディングを入れて、文字を上に押し上げる */
    cursor: pointer;
    transition: background 0.2s;
}
#${this.toolNameAct}:hover {
${HtmlMakerCommonCss.btnHoverCssText}
}

.${this.divName} {
max-height: ${this.heightPx}px;
overflow-y: auto;
${HtmlMakerCommonCss.scrollBarText}
}
${spanCssText}

${this.tableFirstRowCssText}
${this.auxCssText}
`.trim();
        document.head.appendChild(style);
    }
    dispose() {
        this.DisableTableClick();
        this.DisableMouseUp();
    }
    mover = new DialogMover;
    onMoveDone;
    moverOnMoveDone = async () => {
        if (this.onMoveDone !== undefined) {
            await this.onMoveDone(this.dlg);
        }
    };
    get toolDivName() { return `${this.dlgName}-tool-div`; }
    get toolNameB0() { return `${this.dlg.id}-tool-b0`; }
    get toolNameB2() { return `${this.dlg.id}-tool-b2`; }
    get toolNameB4() { return `${this.dlg.id}-tool-b4`; }
    get toolNameMg() { return `${this.dlg.id}-tool-Mg`; }
    get toolNameActs() { return `${this.dlgName}-tool-acts`; }
    get toolNameAct() { return `${this.dlg.id}-tool-act`; }
    get toolNameTitle() { return `${this.dlg.id}-tool-title`; }
    get dlgName() { return `toolTip-dlg-common`; }
    get divName() { return `${this.dlg.id}-div`; }
    get spanName() { return `${this.dlgName}-span`; }
    get tableName() { return `${this.dlgName}-table`; }
}
export class HtmlMakerToolTipMgr {
    static items = new Array;
    static zIndexFirst = 2000;
    static FindParent(parentName) {
        const dlgParent = document.getElementById(parentName);
        return dlgParent;
    }
    static TopElement() { return document.body; }
    static MakeUniqueName(uiName, itemName) {
        return `${uiName}_${itemName}`;
    }
    static Add(name, closeType = HtmlMakerToolTipCloseTypes.InVisible) {
        const exist = HtmlMakerToolTipMgr.FindBy(name);
        if (exist !== null)
            return false;
        //const zIndex = HtmlMakerToolTipMgr.items.length + HtmlMakerToolTipMgr.zIndexFirst
        const zIndex = HtmlMakerToolTipMgr.zIndexFirst;
        const toolTip = new HtmlMakerToolTip();
        toolTip.NewToolTip(HtmlMakerToolTipMgr.TopElement(), name, closeType);
        toolTip.dlg.style.zIndex = `${zIndex}`;
        HtmlMakerToolTipMgr.items.push(toolTip);
        return true;
    }
    static Remove(name) {
        /*
        const index = HtmlMakerToolTipMgr.items.findIndex(elem => elem.dlg.id === name)
        if (index === -1) return false
        this.table.deleteRow(index + this.table.firstRowIndex)
        this.table.redimAllRows()
        const elem = HtmlMakerToolTipMgr.items[index]
        elem.dlg.innerHTML = ``
        elem.dlg.remove()
        HtmlMakerToolTipMgr.items.splice(index, 1)
        */
        //一覧の行を特定する
        let matchIndex = -1;
        let index = -1;
        for (const item of this.items) {
            if (item.MgrType === HtmlMakerToolTipMgrTypes.NotMgr)
                continue;
            index++;
            if (item.dlg.id === name) {
                matchIndex = index;
                break;
            }
        }
        if (matchIndex === -1)
            return false;
        this.table.deleteRow(matchIndex + this.table.firstRowIndex);
        this.table.redimAllRows();
        //管理配列を特定する
        index = HtmlMakerToolTipMgr.items.findIndex(elem => elem.dlg.id === name);
        if (index === -1)
            return false;
        const elem = HtmlMakerToolTipMgr.items[index];
        elem.dlg.innerHTML = ``;
        elem.dlg.remove();
        HtmlMakerToolTipMgr.items.splice(index, 1);
        return true;
    }
    static SetToolTipText(name, title, toolTipText) {
        const exist = HtmlMakerToolTipMgr.FindBy(name);
        if (exist === null)
            return false;
        exist.SetTitle(title);
        exist.SetMemo(toolTipText, ``);
        return true;
    }
    static MoveTop(name) {
        const exist = HtmlMakerToolTipMgr.FindBy(name);
        if (exist === null)
            return false;
        let zIndex = HtmlMakerToolTipMgr.items.length - 1 + HtmlMakerToolTipMgr.zIndexFirst;
        for (const item of HtmlMakerToolTipMgr.items) {
            if (item.dlg.id !== exist.dlg.id) {
                item.dlg.style.zIndex = `${zIndex}`;
                zIndex--;
            }
        }
        zIndex = HtmlMakerToolTipMgr.items.length + HtmlMakerToolTipMgr.zIndexFirst;
        exist.dlg.style.zIndex = `${zIndex}`;
        return true;
    }
    static FindBy(name) {
        const index = HtmlMakerToolTipMgr.items.findIndex(elem => elem.dlg.id === name);
        if (index === -1)
            return null;
        return HtmlMakerToolTipMgr.items[index];
    }
    static async Activate(item) {
        const parentName = this.parentCssClassName();
        const dlgParent = document.getElementById(parentName);
        if (dlgParent === null)
            return;
        dlgParent.style.display = ``;
        dlgParent.hidden = false;
        if (this.requestActivate !== undefined) {
            for (const elem of dlgParent.children) {
                if (elem.tagName === `DIALOG`) {
                    const dlg = elem;
                    await this.requestActivate(dlg);
                    break;
                }
            }
        }
    }
    static uiInfo;
    static requestActivate;
    static htmlMaker;
    static table;
    static dlg;
    static setRow(ttItem, rowIndex, table) {
        let cellIndex = 0;
        table.getCell(cellIndex, rowIndex).typeInfo.setLabel(`${ttItem.title}`, false);
        table.getCell(cellIndex, rowIndex).className = this.itemNameCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        table.getCell(cellIndex, rowIndex, 1).typeInfo.setLabel(`${ttItem.title}`, false);
        table.getCell(cellIndex, rowIndex, 1).className = this.itemNameCssClassName();
        table.getCell(cellIndex, rowIndex, 1).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
        cellIndex++;
        table.getCell(cellIndex, rowIndex).typeInfo.setButton(`アクティブ化`);
        table.getCell(cellIndex, rowIndex).className = this.itemActCssClassName();
        table.getCell(cellIndex, rowIndex).typeInfo.using.itemId = rowIndex + table.firstRowIndex;
    }
    static toHTML() {
        if (!this.items)
            return "";
        const nCol = 2;
        const table = new HtmlMakerTable();
        if (this.items.length >= 1) {
            // 4列 × 保存キャラ数 の次元を作成
            table.makeDim(nCol, this.items.length);
            table.growCell(0, 2);
            this.items.forEach((item, rowIndex) => {
                this.setRow(item, rowIndex, table);
            });
            //行テンプレート初期化
            table.makeRowTemplate(this.tableRowCssClassName());
            this.table = table;
        }
        else {
            // 4列 × 1行 の次元を作成
            table.makeDim(nCol, 1);
            table.growCell(0, 2);
            const item = new HtmlMakerToolTip;
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
        };
        this.htmlMaker.add(item);
        return this.htmlMaker.ToHTML();
    }
    static AddRow() {
        const rowIndex = this.table.addRow(this.tableRowCssClassName());
        return rowIndex;
    }
    static SetTitle(rowIndex, group, title) {
        const rowElem = this.table.getRowElem(rowIndex);
        if (rowElem === null)
            return;
        //rowElem.cells[0].children[0].innerHTML = title
        rowElem.cells[0].children[0].children[0].innerHTML = group;
        rowElem.cells[0].children[1].children[0].innerHTML = title;
    }
    static Sort() {
        const cols = new Array;
        cols.push(this.itemNameCssClassName());
        this.table.sortRows(cols);
    }
    mover = new DialogMover;
    static onMoveDone;
    static moverOnMoveDone = async (dlg) => {
        if (HtmlMakerToolTipMgr.onMoveDone !== undefined) {
            await HtmlMakerToolTipMgr.onMoveDone(dlg);
        }
        if (this.requestActivate !== undefined) {
            await this.requestActivate(dlg);
        }
    };
    static createMgrBox(title, listHTML) {
        const parentDiv = document.createElement("div");
        const parentName = this.parentCssClassName();
        parentDiv.id = parentName;
        parentDiv.className = parentName;
        this.TopElement().appendChild(parentDiv);
        this.uiInfo = new HtmlDialogInfo();
        const dialogDesc = new HtmlMakerDialogDesc();
        dialogDesc.title = "<" + title + ">";
        dialogDesc.SetB4Type(HtmlMakerDialogB4Types.DialogHide);
        const dlg = dialogDesc.NewDialog(parentName, this.dlgCssClassName());
        dialogDesc.SetContent(parentName, listHTML);
        //this.applyCss()
        dialogDesc.EnableEventHandlers();
        dialogDesc.onMoveDone = HtmlMakerToolTipMgr.moverOnMoveDone;
        this.dlg = dlg;
        return dlg;
    }
    static enableEvents() {
        const tableElem = this.getTableElem();
        if (tableElem === null)
            return false;
        tableElem.addEventListener("click", this.onButtonClicked);
        return true;
    }
    static disableEvents() {
        const tableElem = this.getTableElem();
        if (tableElem === null)
            return false;
        tableElem.removeEventListener("click", this.onButtonClicked);
        return true;
    }
    static getTableElem() {
        const tableList = document.getElementsByClassName(this.tableCssClassName());
        if (tableList === null)
            return null;
        if (tableList.length <= 0)
            return null;
        const tableElem = tableList[0];
        return tableElem;
    }
    static onButtonClicked = async (event) => {
        const elemSend = event.target;
        if (elemSend === null)
            return;
        if (elemSend.tagName !== `BUTTON`)
            return;
        console.log(elemSend);
        const id = elemSend.getAttribute("item-id");
        if (id === null)
            return;
        const rowIndex = Number(id) - this.table.firstRowIndex;
        //const item = this.items[rowIndex]
        //item.Show(this.dlg.className)
        //this.MoveTop(item.name)
        let index = -1;
        for (const item of this.items) {
            if (item.MgrType === HtmlMakerToolTipMgrTypes.NotMgr)
                continue;
            index++;
            if (index === rowIndex) {
                item.Show(this.dlg.className);
                this.MoveTop(item.name);
                break;
            }
        }
    };
    static applyCss() {
        const parentName = this.parentCssClassName();
        const leftPos = parseInt(this.uiInfo.left);
        const topPos = parseInt(this.uiInfo.top);
        const htmlMaker = new HtmlMaker();
        const style = document.createElement("style");
        style.textContent =
            `
${htmlMaker.MakeDefaultDialogParentCss(parentName, leftPos, topPos)}
${htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgCssClassName()} {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

/* テーブル */
${HtmlMakerCommonCss.getTableCssText(this.tableCssClassName(), `200`)}
/* 左側のラベルセル (Key) */
.${this.itemNameCssClassName()} {
${this.table.getItemCssText()}
}
/* アクティブボタン */
.${this.itemActCssClassName()} {
background: #9c27b0; /* 紫 */
color: white;
border-radius: 4px;
padding: 4px 12px;
cursor: pointer;
}

`.trim();
        document.head.appendChild(style);
        const dlgParent = document.getElementById(parentName);
        htmlMaker.copyCssToInlineStyle(`.${parentName}`, dlgParent);
    }
    static itemNameCssClassName() {
        return `${this.tableCssClassName()}-name`;
    }
    static itemActCssClassName() {
        return `${this.tableCssClassName()}-act`;
    }
    static tableRowCssClassName() {
        return `${this.parentCssClassName()}-table-row`;
    }
    static tableCssClassName() {
        return `${this.parentCssClassName()}-table`;
    }
    static dlgCssClassName() {
        return `${this.parentCssClassName()}-dlg`;
    }
    static parentCssClassName() {
        return "toolTipMgr-top";
    }
}
export class HtmlDialogInfo {
    name = "";
    left = "";
    top = "";
    width = "";
    height = "";
    copyTo(toInst) {
        toInst.name = this.name;
        toInst.left = this.left;
        toInst.top = this.top;
        toInst.width = this.width;
        toInst.height = this.height;
    }
}
import { getSettingAccessInstance } from "./JsStoreHelper.js";
export class HtmlZindexHelper {
    /**管理除外する z-index */
    static ignoreIndex = 1000;
    static dlgElems;
    /**保存復帰クラス */
    static setingAccess = null;
    add(elem) {
        HtmlZindexHelper.dlgElems.push(elem);
    }
    AddDialogs() {
        HtmlZindexHelper.dlgElems = new Array;
        const elems = document.querySelectorAll(`div`);
        for (const elem of elems) {
            if (elem.style.zIndex === "")
                continue;
            if (parseInt(elem.style.zIndex) >= HtmlZindexHelper.ignoreIndex)
                continue;
            //console.log(elem.style.zIndex)
            if (elem.querySelector(`dialog`)) {
                console.log(`${elem.id} added!`);
                this.add(elem);
            }
        }
    }
    AssignIndexies() {
        let zIndex = HtmlZindexHelper.dlgElems.length - 1; //最上位
        for (const elem of HtmlZindexHelper.dlgElems) {
            elem.style.zIndex = `${zIndex}`;
            zIndex--;
        }
    }
    MoveLowestLayer(elemTarget) {
        const nElem = HtmlZindexHelper.dlgElems.length;
        for (const elem of HtmlZindexHelper.dlgElems) {
            if (elem.id === elemTarget.id) {
                elem.style.zIndex = "0";
            }
            else {
                const zIndex = elem.style.zIndex;
                elem.style.zIndex = `${parseInt(zIndex) + 1}`;
            }
        }
    }
    MoveHiestLayer(elemTarget) {
        const nElem = HtmlZindexHelper.dlgElems.length;
        let maxIndex = -1;
        for (const elem of HtmlZindexHelper.dlgElems) {
            const index = parseInt(elem.style.zIndex);
            if (index >= HtmlZindexHelper.ignoreIndex)
                continue;
            if (index > maxIndex)
                maxIndex = index;
        }
        for (const elem of HtmlZindexHelper.dlgElems) {
            if (elem.id === elemTarget.id) {
                elem.style.zIndex = `${maxIndex}`;
                break;
            }
        }
        for (const elem of HtmlZindexHelper.dlgElems) {
            if (elem.id === elemTarget.id) {
                continue;
            }
            else {
                const index = parseInt(elem.style.zIndex);
                if (index >= HtmlZindexHelper.ignoreIndex)
                    continue;
                maxIndex--;
                elem.style.zIndex = `${maxIndex}`;
            }
        }
    }
    FindByName(name) {
        const match = HtmlZindexHelper.dlgElems.find(item => item.id === name);
        if (match)
            return match;
        return null;
    }
    async ForEachAsync(callback) {
        for (const elem of HtmlZindexHelper.dlgElems) {
            if (elem.parentNode === null)
                continue;
            await callback(elem.id);
        }
    }
    ReOrder() {
        HtmlZindexHelper.dlgElems.sort((a, b) => {
            const za = a.style.zIndex;
            const zb = b.style.zIndex;
            if (za === "" || zb === "")
                throw new Error("z-index が未設定の要素が混入しています");
            return parseInt(b.style.zIndex) - parseInt(a.style.zIndex);
        });
    }
    async SaveSetting(dlg, checkDlgValid = true) {
        if (!this.canSave)
            return;
        if (dlg === null)
            return;
        if (dlg.parentElement === null)
            return;
        if (checkDlgValid) {
            if (this.FindByName(dlg.parentElement.className) === null) {
                console.log(`${dlg.className} is out of managed dlg`);
                return;
            }
        }
        await this.initSetting();
        await HtmlZindexHelper.setingAccess.saveDialogPos(dlg);
    }
    async LoadAllSetting() {
        if (!this.canSave)
            return;
        await this.initSetting();
        for (const elem of HtmlZindexHelper.dlgElems) {
            const dlg = elem.querySelector('dialog');
            if (dlg === null)
                continue;
            await HtmlZindexHelper.setingAccess.loadDialogPos(dlg);
        }
    }
    async loadSetting(dlg) {
        if (!this.canSave)
            return;
        await this.initSetting();
        if (dlg === null)
            return;
        await HtmlZindexHelper.setingAccess.loadDialogPos(dlg);
    }
    async initSetting() {
        if (HtmlZindexHelper.setingAccess === null) {
            /*
            HtmlZindexHelper.setingAccess = new SettingAccess
            await HtmlZindexHelper.setingAccess.init()
            */
            HtmlZindexHelper.setingAccess = await getSettingAccessInstance();
        }
    }
    get canSave() {
        const htmlMaker = new HtmlMaker();
        return !htmlMaker.isDemo;
    }
}
export class DialogMover {
    isDragging = false;
    startX = 0;
    startY = 0;
    onMoveDone;
    /**
     * @param handle 掴むボタン（SetCapture対象）
     * @param dialog 動かす対象
     */
    attach(handle, dialog) {
        // Windowsの WM_LBUTTONDOWN に相当
        handle.onpointerdown = (e) => {
            // これが WinAPI の ::SetCapture(hwnd) です！
            handle.setPointerCapture(e.pointerId);
            this.isDragging = true;
            // クリックした瞬間のマウス位置とダイアログ位置の「オフセット」を記録
            this.startX = e.clientX - dialog.offsetLeft;
            this.startY = e.clientY - dialog.offsetTop;
            // 見た目のフィードバック（お好みで）
            handle.style.cursor = "grabbing";
        };
        // Windowsの WM_MOUSEMOVE に相当
        handle.onpointermove = (e) => {
            if (!this.isDragging)
                return;
            // キャプチャしているので、マウスがボタンを追い越してもイベントが届く！
            const x = e.clientX - this.startX;
            const y = e.clientY - this.startY;
            dialog.style.left = `${x}px`;
            dialog.style.top = `${y}px`;
            dialog.style.margin = "0"; // 中央寄せ設定などを解除
        };
        // Windowsの WM_LBUTTONUP に相当
        handle.onpointerup = async (e) => {
            this.isDragging = false;
            // これが WinAPI の ::ReleaseCapture() です
            handle.releasePointerCapture(e.pointerId);
            handle.style.cursor = "grab";
            if (this.onMoveDone !== undefined) {
                await this.onMoveDone();
            }
        };
    }
}
export class DialogResizer {
    isDragging = false;
    startX = 0;
    startY = 0;
    startW = 0;
    startH = 0;
    handleX = 0;
    handleY = 0;
    onResizeDone;
    /**
     * @param handle 掴むボタン（SetCapture対象）
     * @param dialog 動かす対象
     */
    attach(handle, dialog) {
        // Windowsの WM_LBUTTONDOWN に相当
        handle.onpointerdown = (e) => {
            // これが WinAPI の ::SetCapture(hwnd) です！
            handle.setPointerCapture(e.pointerId);
            this.isDragging = true;
            // クリックした瞬間のマウス位置とダイアログ位置の「オフセット」を記録
            this.startX = e.clientX;
            this.startY = e.clientY;
            const rcDlg = dialog.getBoundingClientRect();
            console.log(`[${dialog.className}] (${rcDlg.left},${rcDlg.top}) - (${rcDlg.width},${rcDlg.height})`);
            this.startW = rcDlg.width;
            this.startH = rcDlg.height;
            this.handleX = handle.offsetLeft;
            this.handleY = handle.offsetTop;
            // 見た目のフィードバック（お好みで）
            handle.style.cursor = "grabbing";
        };
        // Windowsの WM_MOUSEMOVE に相当
        handle.onpointermove = (e) => {
            if (!this.isDragging)
                return;
            // キャプチャしているので、マウスがボタンを追い越してもイベントが届く！
            const x = e.clientX - this.startX;
            const y = e.clientY - this.startY;
            dialog.style.width = `${this.startW + x - handle.clientWidth}px`;
            dialog.style.height = `${this.startH + y - handle.clientHeight}px`;
            handle.style.left = `${this.handleX + x}px`;
            handle.style.top = `${this.handleY + y}px`;
            handle.style.margin = "0"; // 中央寄せ設定などを解除
        };
        // Windowsの WM_LBUTTONUP に相当
        handle.onpointerup = async (e) => {
            this.isDragging = false;
            // これが WinAPI の ::ReleaseCapture() です
            handle.releasePointerCapture(e.pointerId);
            handle.style.cursor = "grab";
            if (this.onResizeDone !== undefined) {
                const rcDlg = dialog.getBoundingClientRect();
                await this.onResizeDone(`${rcDlg.width - this.startW}`, `${rcDlg.height - this.startH}`);
            }
        };
    }
}
/**ファイル・フォルダドラッグドロップ */
export class DragDropHelper {
    onDropFiles;
    onDropDir;
    elems = null;
    Start(className) {
        const elems = document.getElementsByClassName(className);
        if (elems.length === 0)
            return false;
        for (const elem of elems) {
            elem.addEventListener("dragover", this.onDragover);
            elem.addEventListener("dragleave", this.onDragleave);
            elem.addEventListener("drop", this.onDrop);
        }
        this.elems = elems;
        return true;
    }
    Stop() {
        if (this.elems === null)
            return false;
        for (const elem of this.elems) {
            elem.removeEventListener("dragover", this.onDragover);
            elem.removeEventListener("dragleave", this.onDragleave);
            elem.removeEventListener("drop", this.onDrop);
        }
        return true;
    }
    onDragover = async (event) => {
        if (this.elems === null)
            return;
        event.preventDefault(); // これがブラウザの自爆を止める絶対の呪文さ（￣ー￣）
        const elem = event.target;
        elem.classList.add("drag-hover"); // 画面に「今乗ってるよ！」と黄色ハイライトするCSSを当てる
    };
    onDragleave = async (event) => {
        if (this.elems === null)
            return;
        const elem = event.target;
        elem.classList.remove("drag-hover");
    };
    onDrop = async (event) => {
        if (this.elems === null)
            return;
        const elem = event.target;
        event.preventDefault(); // ブラウザの一人歩きをここでも阻止！
        elem.classList.remove("drag-hover");
        const dragEvt = event;
        if (dragEvt.dataTransfer === null)
            return;
        const items = dragEvt.dataTransfer.items;
        if (items.length === 0)
            return;
        if (this.onDropDir !== undefined) {
            const item = items[0].webkitGetAsEntry();
            console.log(item);
            if (item === null || item.isFile)
                return;
            await this.onDropDir(elem, item);
        }
        const files = dragEvt.dataTransfer.files;
        if (!files || files.length === 0)
            return;
        if (this.onDropFiles !== undefined) {
            //console.log(`**DragDropHelper**`, this.elem, files)
            await this.onDropFiles(elem, files);
        }
    };
}
/**Elementドラッグドロップ */
export class DragDropElement {
    dragElem = null;
    onDragAction;
    DragStart(dragElem, onDragAction) {
        dragElem.draggable = true;
        dragElem.addEventListener('dragstart', this.onDragStart);
        dragElem.addEventListener('dragend', this.onDragEnd);
        this.dragElem = dragElem;
        this.onDragAction = onDragAction;
    }
    DragStop() {
        if (this.dragElem === null)
            return;
        this.dragElem.draggable = false;
        this.dragElem.removeEventListener('dragstart', this.onDragStart);
        this.dragElem.removeEventListener('dragend', this.onDragEnd);
        this.dragElem = null;
    }
    onDragStart = async (event) => {
        const target = event.target;
        const dragStartMap = new Map;
        dragStartMap.set(`name`, `dragStart`);
        dragStartMap.set(`tagName`, target.tagName);
        dragStartMap.set(`className`, target.className);
        dragStartMap.set(`operation`, ``);
        //console.log('ドラッグを開始しました', event, this.dragStartMap)
        // dataTransfer が null でないかチェック
        if (event.dataTransfer) {
            event.dataTransfer.setData('text/plain', target.className);
            event.dataTransfer.effectAllowed = 'link';
        }
        if (this.onDragAction !== undefined)
            await this.onDragAction(dragStartMap);
    };
    onDragEnd = async (event) => {
        const target = event.target;
        const operation = event.dataTransfer !== null ?
            event.dataTransfer.dropEffect !== 'none' ? `success` : `cancel`
            : `unknown`;
        const dragEndMap = new Map;
        dragEndMap.set(`name`, `dragEnd`);
        dragEndMap.set(`tagName`, target.tagName);
        dragEndMap.set(`className`, target.className);
        dragEndMap.set(`operation`, operation);
        //console.log('ドラッグを終了しました', event, this.dragEndMap)
        if (this.onDragAction !== undefined)
            await this.onDragAction(dragEndMap);
    };
    dropElem = null;
    onDropAction;
    DropStart(dropElem, onDropAction) {
        dropElem.addEventListener('dragover', this.onDragOver);
        dropElem.addEventListener('drop', this.onDrop);
        this.dropElem = dropElem;
        this.onDropAction = onDropAction;
    }
    DropStop() {
        if (this.dropElem === null)
            return;
        this.dropElem.removeEventListener('dragover', this.onDragOver);
        this.dropElem.removeEventListener('drop', this.onDrop);
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
        const dropText = event.dataTransfer.getData('text/plain');
        //console.log(`🎯 キャラID [${dropText}] を自編成スロットに受け取りました！`);
        const target = event.target;
        const dropMap = new Map;
        dropMap.set(`name`, `onDrop`);
        dropMap.set(`tagName`, target.tagName);
        dropMap.set(`className`, target.className);
        dropMap.set(`operation`, dropText);
        //console.log('ドラッグを終了しました', event, this.dragEndMap)
        if (this.onDropAction !== undefined)
            await this.onDropAction(dropMap);
    };
}
/**ファイル選択：📁📂 */
export class FileSelect {
    static emoji1 = `📁`;
    static emoji2 = `📂`;
    parentElem = document.body;
    accept = `video/mp4,audio/mpeg`;
    multiple = true;
    autoClose = true;
    onSelect = undefined;
    onCancel = undefined;
    fileInput = null;
    Open() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = this.multiple; // 複数選択を許可する場合
        fileInput.accept = this.accept; // 必要に応じて拡張子を制限
        fileInput.style.display = 'none';
        //this.setFolderMode(fileInput)
        this.parentElem.appendChild(fileInput);
        fileInput.addEventListener('change', this.onChange);
        fileInput.addEventListener('cancel', this.onCancelInternal);
        fileInput.click();
        this.fileInput = fileInput;
    }
    onChange = async (event) => {
        const files = event.target.files;
        if (files !== null) {
            if (this.onSelect !== undefined) {
                this.onSelect(files);
            }
        }
        if (this.autoClose) {
            this.dispose();
        }
    };
    onCancelInternal = async (event) => {
        if (this.autoClose) {
            this.dispose();
        }
        if (this.onCancel !== undefined) {
            this.onCancel();
        }
    };
    dispose() {
        if (this.fileInput !== null) {
            this.parentElem.removeChild(this.fileInput);
            this.fileInput.removeEventListener('change', this.onChange);
            this.fileInput.remove();
            this.fileInput = null;
        }
    }
    setFolderMode(fileInput = null) {
        if (fileInput === null)
            return;
        //フォルダ選択用の属性を設定（TypeScriptの型エラーを防ぐため Object.assign を使用）
        Object.assign(fileInput, {
            webkitdirectory: true,
            directory: true
        });
    }
    isFolderSelect(files) {
        const fileArray = Array.from(files);
        // 最初のファイルで、フォルダとしての相対パスが取れているか判定
        const hasDirectoryStructure = fileArray[0].webkitRelativePath !== "";
        if (hasDirectoryStructure) {
            console.log("フォルダとして正常に読み込まれました");
            fileArray.forEach(file => {
                // 対応ブラウザ：フォルダ名を含んだ相対パスが取れる
                console.log("相対パス:", file.webkitRelativePath);
            });
        }
        else {
            console.warn("未対応環境です。通常の複数ファイルとして処理します。");
            fileArray.forEach(file => {
                // 未対応ブラウザ：ファイル名のみ（webkitRelativePathは空文字）
                console.log("ファイル名のみ:", file.name);
            });
        }
        return hasDirectoryStructure;
    }
}
/**ゲームパッド */
export class GamepadHelper {
    gamepadConnected = false;
    gamepadMap = new Map;
    axesMap = new Map;
    enableGamePad() {
        if (this.gamepadConnected)
            return;
        window.addEventListener("gamepadconnected", (event) => {
            this.gamepadConnected = true;
            console.log("ゲームパッドが接続されました:%s (index: %d, axes: %d, buttons: %d)", event.gamepad.id, event.gamepad.index, event.gamepad.axes.length, event.gamepad.buttons.length);
            for (let index = 0; index < event.gamepad.axes.length; index++) {
                this.axesMap.set(index, -2);
            }
            this.sense();
        });
    }
    usingButtonChanged(bid, onChanged) {
        const item = new GamepadHelperItem;
        item.bid = bid;
        item.onChanged = onChanged;
        this.gamepadMap.set(bid - 1, item);
    }
    sense = () => {
        if (!this.gamepadConnected)
            return;
        if (this.gamepadMap === null)
            return;
        const gamepads = navigator.getGamepads();
        const gamepad = gamepads[0];
        if (gamepad !== null) {
            for (const [index, button] of gamepad.buttons.entries()) {
                const item = this.gamepadMap.get(index);
                if (item === undefined)
                    continue;
                const pchanged = button.pressed !== item.pval;
                const tchanged = button.touched !== item.tval;
                if (pchanged || tchanged) {
                    //console.log(index, pchanged, tchanged)
                    item.pval = button.pressed;
                    item.tval = button.touched;
                    item.pchanged = pchanged;
                    item.tchanged = tchanged;
                    if (item.onChanged !== undefined)
                        item.onChanged(item);
                }
                if (button.pressed || button.touched) {
                    item.pval = button.pressed;
                    item.tval = button.touched;
                    if (item.onPressed !== undefined)
                        item.onPressed(item);
                }
            }
            for (const [index, axis] of gamepad.axes.entries()) {
                //index === 0 : X方向：左=-1、右=1
                //index === 1 : Y方向：上=-1、下=1
                //離したときの通知はないみたい
                const old = this.axesMap.get(index);
                if (old === undefined)
                    continue;
                if (index === 0 || index === 1) {
                    if (axis === -1 || axis === 0 || axis === 1) {
                        const isFirst = old === -2 ? true : false;
                        console.log(`**P**`, index, axis, isFirst);
                        this.axesMap.set(index, axis);
                    }
                    else {
                        if (axis === old) {
                        }
                        else {
                        }
                        this.axesMap.set(index, -2);
                    }
                }
            }
        }
        requestAnimationFrame(this.sense);
    };
}
export class GamepadHelperItem {
    bid = -1;
    pval = false;
    pchanged = false;
    tval = false;
    tchanged = false;
    onChanged;
    onPressed;
}
//# sourceMappingURL=HtmlMaker.js.map
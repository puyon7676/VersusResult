(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const Y={none:"none",classPq:"pq",classMM:"mm"},z={None:"None",CnsRed:"CnsRed",CnsBlue:"CnsBlue",CnsGreen:"CnsGreen",CnsYellow:"CnsYellow",CnsViolet:"CnsViolet",CnsWhite:"CnsWhite",CnsBlack:"CnsBlack"},me={None:"None",Front:"Front",Center:"Center",Backend:"Backend"},Ne={None:"None",High:"High",Mid:"Mid",Low:"Low"},v={cmAutoScore:"cmAutoScore",pqStatusHP:"pqStatusHP",pqStatusATK:"pqStatusATK",pqStatusREC:"pqStatusREC",pqTokkunHP:"pqTokkunHP",pqTokkunATK:"pqTokkunATK",pqTokkunREC:"pqTokkunREC",pqTokuSp1:"pqTokuSp1",pqTokuSp2:"pqTokuSp2",pqStatusType:"pqStatusType",pqStatusCombo:"pqStatusCombo",mmAbilitySTR:"mmAbilitySTR",mmStatusFGT:"mmStatusFGT",mmStatusATK:"mmStatusATK",mmStatusPDF:"mmStatusPDF",mmStatusACC:"mmStatusACC",mmStatusEVA:"mmStatusEVA",mmStatusCRI:"mmStatusCRI",mmStatusMDF:"mmStatusMDF",mmStatusHP:"mmStatusHP",mmStatusCRD:"mmStatusCRD",mmStatusDEF:"mmStatusDEF",mmStatusSPD:"mmStatusSPD",mmAbilityDEX:"mmAbilityDEX",mmAbilityMGC:"mmAbilityMGC",mmAbilityDUR:"mmAbilityDUR",mmRole:"mmRole"},ft={RlAttacker:"RlAttacker",RlHealer:"RlHealer",RlDebuffer:"RlDebuffer",RlBuffer:"RlBuffer"},Cs=new Map([[me.None,"なし"],[me.Front,"前衛"],[me.Center,"中央"],[me.Backend,"後衛"]]),bs=new Map([[Ne.None,{displayText:"なし",ratio:0}],[Ne.High,{displayText:"高Lv",ratio:1}],[Ne.Mid,{displayText:"中Lv",ratio:.6}],[Ne.Low,{displayText:"低Lv",ratio:.3}]]);class Ns{constructor(){this.tblNameCharImages="CharImages",this.tblCharImages={name:this.tblNameCharImages,columns:{ns:{dataType:"string",index:!0},name:{dataType:"string"},fileName:{dataType:"string",index:!0},fileData:{dataType:"object"}}},this.tblNameSettings="Settings",this.tblSettings={name:this.tblNameSettings,columns:{key:{dataType:"string",primaryKey:!0},value:{dataType:"string"}}},this.tblNameActionLog="ActionLog",this.tblActionLog={name:this.tblNameActionLog,columns:{id:{primaryKey:!0,autoIncrement:!0},logType:{dataType:"string"},log:{dataType:"string"}}},this.dbName="EvonaDB",this.db={name:this.dbName,tables:[this.tblCharImages,this.tblSettings,this.tblActionLog]}}async connect(e){console.log("Waiting for JsStore library...");let t=0;for(;typeof window.JsStore>"u";){if(t>50)throw new Error("JsStore library load timeout. Check script tag order.");await new Promise(n=>setTimeout(n,100)),t++}const s=window.JsStore;this.connection=new s.Connection(new Worker(e)),console.log("connection started with library version:",s.VERSION)}async term(){await this.connection.terminate(),console.log("connection terminated")}async initDb(){const e=await this.connection.initDb(this.db);return console.log(e?"Db Created & connection is opened":"Db connection is opened"),e}async dropDb(){let e=!1;return await this.connection.dropDb().then(function(){console.log("Db deleted successfully"),e=!0}).catch(function(){console.error("dropDb error")}),e}async deleteAllRecords(e){return await this.existsTable(e)===!1?(console.log(`[${e}] not exist`),!1):(await this.connection.clear(e),console.log(`[${e}] all record deleted successfully`),!0)}async existsTable(e){try{const t=await this.connection.count({from:e});return!0}catch(t){console.log("[existsTable] JsStore Select Error:",t)}return!1}get defWorkerFile(){return window.EVONA_CONFIG.workerFile}async setup(){return await this.connect(this.defWorkerFile),await this.initDb()}sortByIdAscAsNum(e){e&&e.sort((t,s)=>Number(t.id)-Number(s.id))}}class ms extends Ns{async insert(e,t){await this.connection.insert({into:this.tblNameSettings,values:[{key:e,value:t}],upsert:!0})}async insertMultiple(e){const t=e.map(s=>({key:s.key,value:s.value}));return await this.connection.insert({into:this.tblNameSettings,values:t,upsert:!0})}async selectKey(e){try{var t=await this.connection.select({from:this.tblNameSettings,where:{key:e}});return t.length>=1?t[0].value:null}catch(s){console.error("[selectKey] JsStore Select Error:",s)}return null}async countKey(e){try{return await this.connection.count({from:this.tblNameSettings,where:{key:e}})}catch(t){console.error("[countKey] JsStore Select Error:",t)}return-1}async clear(){await this.deleteAllRecords(this.tblNameSettings)}}class ws{constructor(){this.table=new ms}async init(){const e=new ms;await e.setup(),this.table=e}async saveDialogPos(e){const t=e.parentElement,s=`${t?.className},${t?.style.left},${t?.style.top}`;await this.table.insert(e.className,`${s}`)}async loadDialogPos(e){const t=e.parentElement,s=await this.table.selectKey(e.className);if(s!==null){const n=s.split(",");n.length===3&&t!==null&&n[0]===t.className&&(t.style.left=n[1],t.style.top=n[2])}}async clear(){this.table.clear()}}class Ot extends Ns{async insert(e,t){await this.connection.insert({into:this.tblNameActionLog,values:[{logType:e,log:t}]})}async insertMultiple(e){const t=e.map(s=>({logType:s.logType,log:s.log}));return await this.connection.insert({into:this.tblNameActionLog,values:t})}async selectType(e){try{var t=await this.connection.select({from:this.tblNameActionLog,where:{logType:e},order:{by:"id",type:"asc"}});return this.sortByIdAscAsNum(t),t.length>=1?t:null}catch(s){console.error("[selectType] JsStore Select Error:",s)}return null}async countType(e){try{return await this.connection.count({from:this.tblNameActionLog,where:{logType:e}})}catch(t){console.error("[countType] JsStore Select Error:",t)}return-1}async clear(){await this.deleteAllRecords(this.tblNameActionLog)}}class Ls{constructor(){this.table=new Ot}async init(){const e=new Ot;await e.connect(e.defWorkerFile),await e.initDb(),this.table=e}async clear(){this.table.clear()}async put(e,t){return await this.table.insert(e,t)}async get(e){const t=await this.table.selectType(e);if(t===null)return null;const s=new Array;for(const n of t)s.push({id:n.id,log:n.log});return s}}const $e={CharSummaryAction:"CharSummaryAction",ResourceEditAction:"ResourceEditAction",GameEditAction:"GameEditAction",ScoreEditAction:"ScoreEditAction"};let pt=null;async function Bs(){return pt||(pt=new ws,await pt.init(),console.log("SettingAccess instance created (Singleton)")),pt}let gt=null;async function Se(){return gt||(gt=new Ls,await gt.init(),console.log("LogAccess instance created (Singleton)")),gt}function Hs(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,h=>{const e=Math.random()*16|0;return(h==="x"?e:e&3|8).toString(16)})}function As(){const h=Date.now().toString(16),e=Hs();return`${h}-${e}`}const De={Unknown:"Unknown",KeyDown:"KeyDown",Click:"Click"};class qe{constructor(){this.eventType=De.Unknown,this.parentElem=null,this.cancel=!1,this.targetId="",this.classify="",this.selectedValue="",this.Keydown="",this.KeyEnter=fe.None}}const Ge={Unknown:"Unknown",Ok:"Ok",Cancel:"Cancel"};class le{constructor(){this.callerName="",this.result="",this.classify=Ge.Unknown}}class Nt{constructor(){this.parentElem=null,this.left="",this.top="",this.width="",this.height=""}}const je={Enter:"Enter",Escape:"Escape",Tab:"Tab",Process:"Process"},fe={None:"None",Normal:"Normal",Special:"Special"},R={Unknown:"Unknown",Btn:"Btn",Chk:"Chk",Img:"Img",Label:"Label",LabelRO:"LabelRO",Combo:"Combo",Input:"Input",Plain:"Plain",Table:"Table",LowerTable:"LowerTable"};class jt{}jt.toolTipNewLine=`
`;class Ds{constructor(){this.movingPx="20",this.textWidthPx="20",this.textAlign="center"}}class L{static get titleColorText(){return`
background: linear-gradient(to bottom, ${this.offColor}, ${this.onColor}); /* Win風グラデ */
color: #000000;

user-select: none;           /* テキスト選択を禁止 */
-webkit-user-select: none;   /* iOS Safari用 */
touch-action: none;          /* ブラウザ独自のスクロールやズームを無効化 */

white-space: nowrap;         /* 改行を禁止 */
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`.trim()}static get borderShadowText(){return`
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3); /* ほんのり黒い影 */
border-radius: 4px; /* 角を少し丸くすると、影と馴染みます（任意） */
`.trim()}static get scrollBarText(){return`
&::-webkit-scrollbar { width: ${this.width}; }
&::-webkit-scrollbar-track { background: ${this.normBkColor}; border-radius: 10px; }
&::-webkit-scrollbar-thumb {
 background: #eeee52;
 border-radius: 10px;
 border: 1px solid #3b3a03;
}
&::-webkit-scrollbar-thumb:hover { background: ${this.onColor}; }
`.trim()}static getTableCssText(e,t){const s=this.spacingTable,n=this.spacingTr;return`
.${e} {
width: 100%;            /* テーブル全体を親要素いっぱいに広げる */
table-layout: fixed;    /* これが重要！これで td の％指定が絶対になります */
height: ${t}px;    /* ダイアログに合わせた固定高 */
overflow-y: auto;
${this.scrollBarText}
${s}
}
.${e} tr {
background-color: #f5f5dc; /* ベージュ */
${n}
}
.${e} td {
background-color: #f5f5dc; /* ベージュ */
  padding: 0;           /* 上下の余白を完全にゼロにする */
  border-top: none;     /* 上の線を消す */
  border-bottom: none;  /* 下の線を消す */
  line-height: 2;       /* 文字の上下の隙間をなくす */
}
`.trim()}static get spacingTable(){return"border-collapse: collapse; border-spacing: 0;"}static get spacingTr(){return`background: ${this.normBkColor};`}static sliderText(e,t,s=new Ds){return`
/* スイッチ全体のレイアウト */
.${e}-container {
  display: flex;
  align-items: center;
  gap: 10px 0px;
  padding: 2px 0px 5px 2px;
width: ${t}px;
}
/* スイッチのタイトル */
.${e}-label {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}
/* 本物のチェックボックスは透明にして重ねる */
.${e} {
  opacity: 0;
  width: 0;
  height: 0;
}
/* スライダーの溝（レール） */
.${e}-slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: ${this.offColor};
  transition: .3s;
  border-radius: 17px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.4); /* 内側に影を入れて立体感を出す */
}
/* 動くツマミ部分 */
.${e}-slider:before {
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
.${e}:checked + .${e}-slider {
  background-color: ${this.onColor};
}
.${e}:checked + .${e}-slider:before {
  transform: translateX(${s.movingPx}px); /* ツマミが右に滑る */
}
/* ラベルテキストの装飾 */
.${e}-text {
  font-size: 0.75rem;
  color: black;
  user-select: none;
  width: ${s.textWidthPx}px;
  text-align: ${s.textAlign};
}
`.trim()}static footerButtonText(){return`
background: #f7d98f;
color: black;
border: 1px solid #4d4949;
border-radius: 3px;
cursor: pointer;
transition: background 0.2s;
`.trim()}static footerText(){return`
display: flex;
gap: unset;
padding: ${this.footerPadding}px;
justify-content: flex-end;
  background-color: #f7eb86e6;
  border: 1px solid #b4b107;
`.trim()}static get footerPadding(){return 4}static spanCssText(e,t){let s="";return t&&(s=`
overflow: hidden;
`),`
background-color: #f5f5dc; /* ベージュ */
color: #4b0082;       /* インディゴ/紫 */
font-weight: bold;
${e}
text-align: right;
padding-right: 8px;
border: 1px solid #f5f5dc; /* 境界線 */

/* 内容が溢れても折り返さない、あるいは省略する設定 */
white-space: nowrap;
text-overflow: ellipsis;
${s}
`}get DefaultBlueColor(){return"#86aef7e6"}get DefaultYellowColor(){return"#f7eb86e6"}get DefaultBorderColor(){return"#2c3e50ff"}}L.width="16px";L.offColor="#fff176";L.onColor="#fbc02d";L.normBkColor="#f5ecc6";class Mt{constructor(){this.imgSrc="",this.imgFile="",this.alt="",this.lazy=!1}}class nt{constructor(){this.selectedItem="",this.selectionPair=[],this.classify=""}}class _{constructor(){this.type="text",this.value="",this.placeholder="",this.disableKeyDown=!1,this.enableClicked=!1}}class Ut{constructor(){this.type="checkbox",this.value=!1,this.placeholder="",this.enableClicked=""}}class _e{constructor(){this.typeInfo=new Is,this.className=""}ToHTML(){let e="";switch(this.typeInfo.using.itemType){case R.Btn:e=this.typeInfo.ToButtonHTML(this.className);break;case R.Label:e=this.typeInfo.ToLableHTML(this.className);break;case R.LabelRO:e=this.typeInfo.ToLableROHTML(this.className);break;case R.Combo:e=this.typeInfo.ToComboHTML(this.className);break;case R.Input:e=this.typeInfo.ToInputHTML(this.className);break;case R.Chk:e=this.typeInfo.ToCheckHTML(this.className);break;case R.Img:const t=this.typeInfo.ToImgHTML(this.className,this.typeInfo.using.img.alt),s=`<div class="overlay" title="${this.typeInfo.toolTip}"></div>`;e=`<div class="cell-${this.className}" item-id="${this.typeInfo.using.itemId}">${t}${s}</div>`;break;case R.Plain:e=this.typeInfo.using.innerHTML;break}return e}copyTo(e){e.className=this.className,e.typeInfo.toolTip=this.typeInfo.toolTip,e.typeInfo.using.itemType=this.typeInfo.using.itemType,e.typeInfo.using.label=this.typeInfo.using.label,e.typeInfo.using.combo=this.typeInfo.using.combo,e.typeInfo.using.input=this.typeInfo.using.input,e.typeInfo.using.innerHTML=this.typeInfo.using.innerHTML,e.typeInfo.using.img=this.typeInfo.using.img}}class ge{constructor(){this.items=new Array}makeItems(e=1){this.items.length>0&&this.items.splice(0,this.items.length);for(let t=0;t<e;t++){const s=new _e;this.items.push(s)}}ToHTML(){let e="";for(const t of this.items){const s=t.ToHTML();s!==""&&(this.items.length>=2?e=`${e}<div>${s}</div>`:e=s)}return e}}class Yt{constructor(){this.rowName="",this.cols=new Array}makeCols(e){this.cols.length>0&&this.cols.splice(0,this.cols.length);for(let t=0;t<e;t++){const s=new ge;s.makeItems(),this.cols.push(s)}}ToHTML(){let e="";for(const t of this.cols){let s="";s=t.ToHTML(),s!==""&&(e=`${e}<td>${s}</td>`),t.items.length===1&&t.items[0].typeInfo.using.itemType===R.LowerTable&&(e=`${e}<td></td>`)}return e}toTemplate(){const e=new Yt;e.rowName=this.rowName;for(const t of this.cols){const s=new ge;s.makeItems(t.items.length);let n=-1;for(const i of t.items){n++;const o=s.items[n];o.className=i.className,o.typeInfo.toolTip=i.typeInfo.toolTip,o.typeInfo.using.itemType=i.typeInfo.using.itemType,o.typeInfo.using.label=i.typeInfo.using.label,o.typeInfo.using.combo=i.typeInfo.using.combo,o.typeInfo.using.input=i.typeInfo.using.input,o.typeInfo.using.innerHTML=i.typeInfo.using.innerHTML,o.typeInfo.using.img=i.typeInfo.using.img}e.cols.push(s)}return e}}class W{constructor(){this.tableName="",this.rows=new Array,this.template=null,this.invalidRowIndex=-1,this.firstRowIndex=1,this.height="300",this.fontSize="0.9",this.rowIdDelimiter="_",this.clipboardText=""}makeDim(e,t){this.rows.length>0&&this.rows.splice(0,this.rows.length);for(let s=0;s<t;s++){const n=new Yt;n.makeCols(e),this.rows.push(n)}}growCell(e,t=1){const s=this.rows.length;for(let n=0;n<s;n++)this.rows[n].cols[e].makeItems(t)}getCell(e,t,s=0){return this.rows[t].cols[e].items[s]}ToHTML(e="",t){this.tableName=e;let s="",n=0;for(const a of this.rows){n++;let r="";if(r=a.ToHTML(),r!==""){const c=a.rowName!==""?` class="${a.rowName}"`:"";s=`${s}<tr ${c} item-id="${n}">${r}</tr>`}}const i=e!==""?` class="${e}"`:"",o=t!==""?` id="${t}"`:"",l=t!==""?` item-id="${t}"`:"";return s=`<table${i}${o}${l}>${s}</table>`,s}ToScrollHTML(e="",t){const s=e!==""?` class="${e}"`:"",n=t!==""?` item-id="${t}"`:"";return`<div${s}${n}>
${this.ToHTML(e,t)}
</div>`}makeRowTemplate(e){if(this.rows.length>=1){for(const t of this.rows)t.rowName=e;this.template=this.rows[0].toTemplate()}}clearRows(){this.rows=new Array}addRow(e){const t=this.getTable();if(t===null)return-1;const s=t.insertRow(-1),n=t.rows.length;if(s.className=e,s.setAttribute("item-id",`${n}`),this.template!==null&&this.template.cols.length>=1){const i=this.template.toTemplate();let o="";for(const l of i.cols){let a="";for(const r of l.items){r.typeInfo.using.itemId=n;const c=r.ToHTML();c!==""&&(l.items.length>=2?a=`${a}<div>${c}</div>`:a=c)}a!==""&&(o=`${o}<td>${a}</td>`)}return s.innerHTML=o,n}return-1}deleteRow(e){const t=this.getTable();if(t===null)return!1;for(const s of t.rows){const n=s.getAttribute("item-id");if(n!==null&&n===`${e}`)return t.deleteRow(e-this.firstRowIndex),!0}return!1}redimAllRows(){const e=this.getTable();if(e===null)return;let t=this.firstRowIndex-1;for(const s of e.rows)if(s.getAttribute("item-id")!==null){t++,s.setAttribute("item-id",`${t}`);for(const i of s.cells)this.redimElems(i.children,t)}}redimElems(e,t){for(const s of e)s.getAttribute("item-id")!==null&&s.setAttribute("item-id",`${t}`),s.children!==void 0&&this.redimElems(s.children,t)}selectRow(e){const t=this.getTable();if(t!==null&&!(e<=0)&&!(e>t.rows.length)){for(const s of t.rows)s.classList!==void 0&&s.classList.remove("selected");t.rows[e-1].classList.add("selected")}}getSelectedRow(){const e=this.getTable();if(e===null)return this.invalidRowIndex;for(const t of e.rows)if(t.classList!==void 0&&t.classList.contains("selected")){const s=t.getAttribute("item-id");return s!==null?parseInt(s):this.invalidRowIndex}return this.invalidRowIndex}updateRowImage(e,t){const n=this.getTable()?.querySelector(`tr[item-id="${e}"] img`);n instanceof HTMLImageElement&&(n.src=t)}updateRowImageToolTip(e,t){const n=this.getTable()?.querySelector(`tr[item-id="${e}"] img`);n instanceof HTMLImageElement&&(n.title=t)}updateText(e,t){if(e.children!==null){const s=e.children[0];s.textContent=t}}scroll(e){const t=this.getTable();if(t===null||e<=0||e>t.rows.length)return null;const s=t.querySelector(`tr[item-id="${e}"] img`);return s===null||s===void 0?null:(s.scrollIntoView({behavior:"smooth",block:"center"}),s)}getRowElems(){const e=this.getTable();return e===null?null:e.rows}findInputElem(e){if(e===null)return null;if(e.tagName!=="INPUT"){for(const s of e.children){const n=this.findInputElem(s);if(n!==null&&n.tagName==="INPUT")return n}return null}return e}getElemValue(e){if(e instanceof HTMLInputElement)return e.value;if(e instanceof HTMLSelectElement)return e.value;{const t=this.findInputElem(e);if(t!==null)return t.type==="checkbox"?t.checked:t.value}return null}setElemValue(e,t){if(e instanceof HTMLInputElement){const s=e,n=s.value;return s.value=t,n}else if(e instanceof HTMLSelectElement){const s=e,n=s.value;return s.value=t,n}else{const s=this.findInputElem(e);if(s!==null){if(s.type==="checkbox"){const i=s.checked;return s.checked=`${t}`.toLowerCase()==="true",i}const n=s.value;return s.value=t,n}}return null}getRowElem(e){const t=this.getTable();if(t===null)return null;for(const s of t.rows){const n=s.getAttribute("item-id");if(n!==null&&n===`${e}`)return console.log(`match row id : ${n}`),t.rows[e-this.firstRowIndex]}return null}getCellElems(e){if(e===null)return null;const t=new Array;for(const s of e.cells){if(s===null)continue;const n=new Array;for(const i of s.children)n.push(i);t.push(n)}return t}setVisible(e){const t=this.getTable();return t===null?null:(t.hidden=!e,t.parentElement.hidden=!e,!0)}getCellRect(e){const t=new A,s=t.GetRect(e.parentElement),n=t.GetRect(e),i=new Nt;return i.left=`${n.left}`,i.top=`${s.top}`,i.width=`${n.width}`,i.height=`${n.height}`,i}getTableOwnerRect(e){const t=new A,s=t.GetRect(e.parentElement.parentElement.parentElement.parentElement.parentElement);console.log(`[OWNER] ${s.left}, ${s.top}`);const n=t.GetRect(e.parentElement.parentElement.parentElement);console.log(`[TABLE] ${n.left}, ${n.top}`);const i=t.GetRect(e.parentElement.parentElement);console.log(`[TBODY] ${i.left}, ${i.top}`);const o=t.GetRect(e.parentElement);console.log(`[TROW] ${o.left}, ${o.top}`);const l=new Nt;return l.left=`${n.left}`,l.top=`${s.top}`,l.width="0",l.height="0",l}makeCallerName(e,t){return`${e}${this.rowIdDelimiter}${t}`}getCallerCellElem(e){const t=e.split(this.rowIdDelimiter);if(t===void 0||t.length!==2)return null;const s=this.getRowElem(parseInt(t[1]));if(s===null)return null;const n=this.getCellElems(s);if(n===null)return null;for(const i of n)for(const o of i)if(o.className===t[0])return o;return null}async toClipboard(){const e=this.getTable();if(e===null)return!1;let t="";for(const n of e.rows){let i="";const o=this.getCellElems(n);if(o===null)return!1;for(const l of o){let a="";for(const r of l){const c=this.getElemValue(r);let m=c===null?"&null&":`&${c}&`;a.length!==0?a=`${a}	${m}`:a=m}i.length!==0?i=`${i}	${a}`:i=`${a}`}t.length!==0?t=`${t}
${i}`:t=`${i}`}const s=`table:{${t}}`;try{await navigator.clipboard.writeText(s)}catch(n){return console.error("コピー失敗...",n),!1}return!0}async fromClipboard(){const e=this.getTable();if(e===null)return!1;let t="";try{t=await navigator.clipboard.readText()}catch(o){return console.error("ペースト失敗...",o),!1}this.clipboardText=t;const s="table:{";if(t.length<s.length+1||t.startsWith(s)===!1||t.endsWith("}")===!1)return!1;t=t.substring(s.length),t=t.substring(0,t.length-1);const n=t.split(`
`);let i=0;for(const o of e.rows){const a=n[i].split("	"),r=this.getCellElems(o);if(r===null)return!1;if(a.length!==r.length)return console.log(`different column size : line ${i+1}`),!1;i++}i=0;for(const o of e.rows){const a=n[i].split("	"),r=this.getCellElems(o);if(r===null)return!1;let c=0;for(const m of r){let p=a[c];if(p.endsWith("\r")===!0&&(p=p.substring(0,p.length-1)),p.startsWith("&")!==!1&&p.endsWith("&")!==!1&&(p=p.substring(1,p.length-1),p!=="null")){for(const u of m){this.setElemValue(u,p);break}c++}}i++}return!0}getTable(){const e=`.${this.tableName}`,t=document.querySelectorAll(e);if(t===null||t.length<=0)return null;const n=t[0].querySelectorAll(e);return n===null||n.length<=0?null:n[0]}getParentElem(){const e=`.${this.tableName}`,t=document.querySelectorAll(e);return t===null||t.length<=0?null:t[0]}getScrollCellRect(e){new A;const t=this.getCellRect(e),s=this.getTableOwnerRect(e),n=this.getParentElem(),i=n!==null?n.scrollLeft:0,o=new Nt;return o.left=`${parseInt(t.left)-parseInt(s.left)+10-i}`,o.top=`${parseInt(t.top)-parseInt(s.top)+10}`,o.width=`${t.width}`,o.height=`${t.height}`,o}setFontConfig(e="0.9"){this.fontSize=`font-size: ${e}em;`}getItemCssText(){return`
${L.spanCssText(this.fontSize,!0)}
width: 100%;            /* 幅を固定するとGridらしくなります */
`}getKvpCssText(e,t,s){return`
/* テーブル */
${L.getTableCssText(e,this.height)}
/* 左側のラベルセル (Key) */
.${t} {
${this.getItemCssText()}
}
/* 右側の入力セル (Value) */
.${s} {
    background-color: #f5f5dc;
    padding: 0;             /* 1. 余白をゼロにして、コンボを端まで広げる */
    width: 100%;
    border: none;
    vertical-align: middle; /* 上下の位置を中央に */
    padding-top: 4px; /* 下にパディングを入れて、文字を上に押し上げる */
    padding-bottom: 4px;    /* 下にパディングを入れて、文字を上に押し上げる */
}
.${s} select {
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

.${s} select:focus {
    outline: none;
    box-shadow: 0 0 3px #4b0082; /* 選択中に光らせる */
}

/* テーブルの行にマウスが乗ったら背景を変える */
tr:hover .${t} {
    background-color: #e9e9d0; /* 少し濃いベージュ */
}
tr:hover .${s} {
    background-color: #f0f0ff; /* 親のホバー色に合わせる */
}
`.trim()}MakeTableScrollCss(e,t,s=!1){return`
.${e} {
height: ${t}px;              /* ダイアログに合わせた固定高 */
overflow-y: auto;
overflow-x: ${s?"auto":"hidden"};
-webkit-overflow-scrolling: touch;  /* iPad用の滑らか設定 */
border: 1px solid #7b1fa2;        /* 紫色の枠線 */
background: rgba(192, 192, 192, 0.6);
${L.scrollBarText}
}
`.trim()}}class Fs{constructor(){this.htmlMaker=new A,this.table=new W,this.gridElem=null,this.headerElem=null,this.footerElem=null}makeKeyCell(e,t,s){const n=new _e;return n.typeInfo.setLabel(e,!1),n.className=t,n.typeInfo.toolTip=s,n}makePair(){return new Map}setPair(e){if(e.size===0)return!1;this.table.makeDim(2,e.size),e.forEach((s,n)=>{this.table.growCell(1,s.items.length)});let t=-1;return e.forEach((s,n)=>{t++,this.table.getCell(0,t).typeInfo.setLabel(n.typeInfo.using.label,!1),this.table.getCell(0,t).className=n.className;let i=-1;for(const o of s.items)i++,this.table.getCell(1,t,i).typeInfo=o.typeInfo,this.table.getCell(1,t,i).className=o.className}),!0}setListener(e,t,s,n="",i=""){this.dispose(),this.table.makeRowTemplate(t);const o=document.getElementById(s);if(o===null)return console.log(`[setListener] cannot found ${s}`),!1;const l=this.table.ToScrollHTML(e,e),a=new te;a.props.name="",a.props.id=e,a.props.className=e,a.props.option.setTable(l),a.props.option.onSelect=async m=>{console.log(`classify = ${m.classify} targetId = ${m.targetId}`),this.onSelect!==void 0&&await this.onSelect(m)},this.htmlMaker=new A,this.htmlMaker.add(a);const r=this.htmlMaker.ToHTML();let c=document.createElement("div");return c.className=e,c.innerHTML=r,this.gridElem=c.children[0],n!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=n,this.headerElem.id=n,o.appendChild(this.headerElem)),o.appendChild(this.gridElem),c.remove(),c=null,i!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=i,this.footerElem.id=i,o.appendChild(this.footerElem)),!0}getSelectedRow(){return this.table.getSelectedRow()}enableEvents(e){return this.gridElem===null?!1:(this.htmlMaker.enableTableEvents(this.gridElem.className),this.onSelect=e,!0)}disableEvents(){return this.gridElem===null?!1:(this.htmlMaker.disableTableEvents(this.gridElem.className),!0)}setVisible(e){return this.gridElem===null?!1:(this.gridElem.hidden=!e,!0)}dispose(){this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.gridElem!==null&&(this.gridElem.parentElement?.removeChild(this.gridElem),this.gridElem.remove()),this.disableEvents(),this.headerElem=null,this.footerElem=null,this.gridElem=null}getCssText(e,t,s){return this.table.getKvpCssText(e,t,s)}}class Fe{constructor(){this.ctlName="",this.styleId="",this.ovElem=null,this.ctlElem=null}firstAction(e,t){const s=document.getElementById(t);return s===null?(console.log(`[firstAction] cannot found ${t}`),null):(this.createOverlay(s),this.ctlName=e,s)}createOverlay(e){const t=document.createElement("div");t.id=`${this.ovCssName()}`,t.style.position="absolute",t.style.inset="0",t.style.zIndex=this.zIndexOv(),t.style.background="transparent",t.style.background="rgba(0,0,0,0.1)",e.appendChild(t),this.ovElem=t}enableOverlay(e=!0){this.ovElem!==null&&(this.ovElem.style.display=e?"":"none")}get isEnableOverlay(){return this.ovElem.style.display!=="none"}resultTable(e){const t=`.${this.ctlName}`,s=document.querySelectorAll(t);if(s===null||s.length<=0)return null;const n=s[0],i=`.${e}`,o=n.querySelectorAll(i);return o===null||o.length<=0?null:o[0]}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.style.display=e?"":"none",!0)}getVisible(){return this.ctlElem===null?!1:this.ctlElem.style.display!=="none"}getBaseElem(){return this.ovElem!==null?this.ovElem.parentElement:null}getOuterCssText(){return`
.${this.ctlName} {
  position: absolute;
  inset: auto;

  padding: 0;       /* 内側の余白をゼロに */
  border: none;     /* 枠線を消す（枠線があると1px〜ズレます） */
  overflow: hidden; /* 中身がはみ出さないように（任意） */

  ${L.borderShadowText}

  z-index: ${this.zIndexCtl()};
}
        `.trim()}getBaseCssText(){return`
border-collapse: collapse; /* セルの境界線を重ねて隙間を消す */
border-spacing: 0;         /* 念のため間隔もゼロに */
margin: 0;                 /* 外側の余白もゼロに */
display: block;            /* もしくは table。配置を安定させます */
background-color: #f7eb86e6;
border: 1px solid #2c3e50;
padding: 1px;
        `.trim()}appendStyle(e){const t=document.createElement("style");return t.id=e,document.head.appendChild(t),this.styleId=e,t}dispose(){const e=document.getElementById(this.styleId);e!==null&&e.remove(),this.ovElem!==null&&(this.ovElem.parentElement?.removeChild(this.ovElem),this.ovElem.remove())}ovCssName(){return`${this.ctlName}-barrier`}zIndexCtl(){return"1000"}zIndexOv(){return"999"}}const yt={ByText:"ByText",ByValue:"ByValue",Both:"Both"};class Rs extends Fe{constructor(){super(...arguments),this.initValue="",this.selectedIndex=-1,this.delimiter="/",this.callerName="",this.htmlMaker=new A,this.table=new W,this.onUpAction=async()=>{this.keyValuePairs!==void 0&&(this.selectedIndex=this.selectedIndex<=0?this.keyValuePairs.length-1:this.selectedIndex-1,this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]))},this.onDnAction=async()=>{this.keyValuePairs!==void 0&&(this.selectedIndex=this.selectedIndex>=this.keyValuePairs.length-1?0:this.selectedIndex+1,this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]))}}setListener(e,t,s){this.dispose(),this.callerName=s,this.ctlName=e;const n=new W;n.makeDim(1,3);let i=0;n.getCell(0,i).typeInfo.setButton("▲"),n.getCell(0,i).className=this.upCssName(),n.getCell(0,i).typeInfo.using.itemId=i,i++,n.getCell(0,i).typeInfo.setButton(""),n.getCell(0,i).className=this.valCssName(),n.getCell(0,i).typeInfo.using.itemId=i,i++,n.getCell(0,i).typeInfo.setButton("▼"),n.getCell(0,i).className=this.dwCssName(),n.getCell(0,i).typeInfo.using.itemId=i;const o=this.firstAction(e,t);if(o===null)return!1;const l=n.ToScrollHTML(e,e),a=new te;a.props.name="",a.props.id=this.tblCssName(),a.props.className=this.tblCssName(),a.props.option.setTable(l),a.props.option.onSelect=async u=>{switch(u.classify){case this.valCssName():if(this.onApply!==void 0){const f=new le;f.callerName=this.callerName,f.result=this.keyValuePairs[this.selectedIndex],await this.onApply(f)}break;case this.upCssName():if(this.onUp!==void 0){const f=new le;f.callerName=this.callerName,f.result=this.keyValuePairs[this.selectedIndex],await this.onUp(f),u.cancel||this.onUpAction()}break;case this.dwCssName():if(this.onDown!==void 0){const f=new le;f.callerName=this.callerName,f.result=this.keyValuePairs[this.selectedIndex],await this.onDown(f),u.cancel||this.onDnAction()}break}},this.htmlMaker=new A,this.htmlMaker.add(a);const r=this.htmlMaker.ToHTML();let c=document.createElement("dialog");c.className=e,c.innerHTML=r,this.ctlElem=c;let m=c.children[0],p=m.children[0];return p.className=`${this.tblCssName()}`,p.id=`${this.tblCssName()}`,this.ctlElem.appendChild(p),m.remove(),m=null,o.appendChild(this.ctlElem),this.table=n,!0}setSelectedByValue(e,t,s=yt.Both){const n=new Array;switch(s){case yt.ByText:n.push(0);break;case yt.ByValue:n.push(1);break;case yt.Both:n.push(0),n.push(1);break;default:return!1}this.initValue=e,this.keyValuePairs=t,this.selectedIndex=-1;const i=e.split(this.delimiter);let o=i.length>=2?i[1]:e,l="";for(const a of n){let r=-1;for(const c of t)if(r++,c!==null&&c!==""){const m=c.split(this.delimiter);if(m.length>=2&&m[a]===o){this.selectedIndex=r,l=m[0];break}}if(this.selectedIndex!==-1)break}if(this.selectedIndex===-1){const r=t[0].split(this.delimiter);this.selectedIndex=0,l=r[0]}return this.updateValueElemByText(l),this.selectedIndex!==-1}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-updn-style`;if(document.getElementById(e))return;const t=this.appendStyle(e);t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim()}enableEvents(e,t,s){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onApply=e,this.onUp=t,this.onDown=s,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}updateValueElemByKeyValue(e){if(this.ctlElem===null)return;let t="";const s=e.split(this.delimiter);s.length>=2&&(t=s[0]),this.updateValueElemByText(t)}updateValueElemByText(e){if(this.ctlElem===null)return;const t=this.ctlElem.querySelectorAll(`.${this.valCssName()}`);t!==null&&(t[0].textContent=e)}tblCssName(){return`${this.ctlName}-tbl`}upCssName(){return`${this.ctlName}-upBtn`}dwCssName(){return`${this.ctlName}-dwBtn`}valCssName(){return`${this.ctlName}-values`}}class Be{constructor(){this.key="",this.text=""}}class Ps extends Fe{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new A,this.table=new W}setChoiceItems(e){this.items=e}setListener(e,t,s){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const n=this.items.length,i=new W;i.makeDim(1,n);let o=0;for(const f of this.items)i.getCell(0,o).typeInfo.setButton(`${f.text}`),i.getCell(0,o).className=`${e}-${f.key}`,i.getCell(0,o).typeInfo.using.itemId=o,o++;const l=this.firstAction(e,t);if(l===null)return!1;const a=i.ToScrollHTML(e,e),r=new te;r.props.name="",r.props.id=this.tblCssName(),r.props.className=this.tblCssName(),r.props.option.setTable(a),r.props.option.onSelect=async f=>{if(console.log(`classify = ${f.classify} targetId = ${f.targetId}`),this.onSelect!==void 0){const y=parseInt(f.targetId),d=new le;d.callerName=this.callerName,d.result=0<=y&&y<this.items.length?this.items[y].key:"",await this.onSelect(d)}},this.htmlMaker=new A,this.htmlMaker.add(r);const c=this.htmlMaker.ToHTML();let m=document.createElement("dialog");m.className=e,m.innerHTML=c,this.ctlElem=m;let p=m.children[0],u=p.children[0];return u.className=`${this.tblCssName()}`,u.id=`${this.tblCssName()}`,this.ctlElem.appendChild(u),p.remove(),p=null,l.appendChild(this.ctlElem),this.table=i,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-updn-style`;if(document.getElementById(e))return;const t=this.appendStyle(e);t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
}
.${this.tblCssName()} button {
width: 100%;
white-space: nowrap;
cursor: pointer;
}
        `.trim()}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}tblCssName(){return`${this.ctlName}-tbl`}}class hs{constructor(){this.key="",this.text=""}}class Os extends Fe{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new A,this.table=new W,this.headerElem=null,this.footerElem=null,this.width=0,this.height=0}setGridtems(e){this.items=e}setListener(e,t,s,n="",i=""){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const o=this.items.length,l=new W;l.makeDim(2,o);let a=0;for(const b of this.items)l.getCell(0,a).typeInfo.setLabel(`${b.text}`,!1),l.getCell(0,a).className=this.keyCssName(),l.getCell(0,a).typeInfo.using.itemId=a,l.getCell(1,a).typeInfo=b.value.items[0].typeInfo,l.getCell(1,a).className=this.valueCssName(),l.getCell(1,a).typeInfo.using.itemId=a,a++;const r=this.firstAction(e,t);if(r===null)return!1;const c=l.ToScrollHTML(e,this.tblCssName()),m=new te;m.props.name="",m.props.id=this.tblCssName(),m.props.className=this.tblCssName(),m.props.option.setTable(c),m.props.option.onSelect=async b=>{if(this.onSelect!==void 0){const E=new le;E.callerName=b.classify,E.result=b.selectedValue,await this.onSelect(E)}},this.htmlMaker=new A,this.htmlMaker.add(m);const p=this.htmlMaker.ToHTML();let u=document.createElement("dialog");u.className=e,u.innerHTML=p,this.ctlElem=u;let f=u.children[0];const y=this.divCssName();f.className=y,f.id=y;let d=f.children[0];return d.className=`${this.tblCssName()}`,d.id=`${this.tblCssName()}`,n!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=n,this.headerElem.id=n,u.appendChild(this.headerElem)),r.appendChild(this.ctlElem),i!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=i,this.footerElem.id=i,u.appendChild(this.footerElem)),this.table=l,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}setFontConfig(e="0.9"){this.table.setFontConfig(e)}setSize(e="200",t="300"){let s=0;if(this.footerElem!==null){const n=this.htmlMaker.GetRect(this.footerElem);s=Number(n.height)}this.table.height=`${Number(t)-s}`,this.height=Number(t)+L.footerPadding,this.width=Number(e)}applyCss(){const e=`${this.getBaseElem().className}-flgrd-style`;if(document.getElementById(e))return;const t=this.appendStyle(e);t.textContent=`
${this.getOuterCssText()}
${this.table.getKvpCssText(this.divCssName(),this.keyCssName(),this.valueCssName())}
.${this.ctlName} {
width: ${this.width}px;
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim()}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}dispose(){super.dispose(),this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}divCssName(){return`${this.ctlName}-div`}tblCssName(){return`${this.ctlName}-tbl`}keyCssName(){return`${this.ctlName}-key`}valueCssName(){return`${this.ctlName}-value`}}const oe={Text:"Text",KeyValue:"KeyValue"},Ue={asText:"asText",asNumber:"asNumber"};class Us extends Fe{constructor(){super(...arguments),this.pairDelimiter=",",this.itemDelimiter="/",this.keyToolTip="キー",this.valueToolTip="テキスト",this.editType=oe.KeyValue,this.valueType=Ue.asText,this.digLen=5,this.callerName="",this.htmlMaker=new A,this.table=new W,this.headerElem=null,this.footerElem=null,this.numpad=null}setKeyValuePairs(e,t=8){const s=e.split(this.pairDelimiter);if(s.length===0)return;const n=new Array;for(const o of s){const l=o.split(this.itemDelimiter);if(l.length<=1)continue;const a=new Be;a.key=l[0],a.text=l[1],n.push(a)}const i=t-n.length;if(i>0)for(let o=0;o<i;o++){const l=new Be;l.key=`key${n.length+1}`,l.text="",n.push(l)}this.editType=oe.KeyValue,this.items=n}setTexts(e,t=8){const s=e.split(this.pairDelimiter);if(s.length===0)return;const n=new Array;for(const o of s){const l=new Be;l.text=o,n.push(l)}const i=t-n.length;if(i>0)for(let o=0;o<i;o++){const l=new Be;l.key=`key${n.length+o}`,l.text="",n.push(l)}this.editType=oe.Text,this.items=n}setValueType(e,t=Ue.asNumber){this.digLen=e,this.valueType=t}setListener(e,t,s,n,i){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const o=this.items.length,l=new W,a=this.editType===oe.KeyValue?2:1;l.makeDim(a,o);let r=this.valueType===Ue.asNumber,c=0;for(const E of this.items){let I=0,$="",g="";this.editType===oe.KeyValue?($=E.key,g=this.keyToolTip):($=E.text,g=this.valueToolTip);const T=new _;if(T.value=$,T.placeholder=g,this.editType!==oe.KeyValue&&(T.disableKeyDown=r,T.enableClicked=r),l.getCell(I,c).typeInfo.setInput(T),l.getCell(I,c).className=`${e}-key-${c+1}`,l.getCell(I,c).typeInfo.using.itemId=c+l.firstRowIndex,l.getCell(I,c).typeInfo.toolTip=g,this.editType===oe.KeyValue){I++;const C=new _;C.value=E.text,C.placeholder=this.valueToolTip,C.disableKeyDown=r,C.enableClicked=r,l.getCell(I,c).typeInfo.setInput(C),l.getCell(I,c).className=`${e}-text-${c+1}`,l.getCell(I,c).typeInfo.using.itemId=c+l.firstRowIndex,l.getCell(I,c).typeInfo.toolTip=this.valueToolTip}c++}const m=this.firstAction(e,t);if(m===null)return!1;const p=l.ToScrollHTML(e,e),u=new te;u.props.name="",u.props.id=this.tblCssName(),u.props.className=this.tblCssName(),u.props.option.setTable(p),u.props.option.onSelect=async E=>{console.log(`[HtmlMakerInputEdit] classify = ${E.classify} targetId = ${E.targetId}`),this.onSelect!==void 0&&this.showNumpad(E,this.digLen)},this.htmlMaker=new A,this.htmlMaker.add(u);const f=this.htmlMaker.ToHTML();let y=document.createElement("dialog");y.className=e,y.innerHTML=f,this.ctlElem=y;let d=y.children[0],b=d.children[0];return b.className=`${this.tblCssName()}`,b.id=`${this.tblCssName()}`,this.ctlElem.appendChild(b),d.remove(),d=null,n!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=n,this.headerElem.id=n,y.appendChild(this.headerElem)),m.appendChild(this.ctlElem),i!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=i,this.footerElem.id=i,y.appendChild(this.footerElem)),this.table=l,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-inputedit-style`;if(document.getElementById(e))return;const t=this.appendStyle(e);t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
  height: 180px;
overflow-y: auto;
${L.scrollBarText}
}
[class^="${this.ctlName}-key-"] {
height: 25px;
}
[class^="${this.ctlName}-text-"] {
height: 25px;
}
        `.trim()}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}dispose(){super.dispose(),this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}editedResult(){const e=this.resultTable(this.tblCssName());if(e===null)return;let t="";for(const s of e.rows)if(s!==null)if(this.editType===oe.KeyValue){const n=s.cells[0],i=s.cells[1];if(n===null||i===null)continue;const o=this.table.getElemValue(n)||"",l=this.table.getElemValue(i)||"";t===""?t=o+this.itemDelimiter+l:t+=this.pairDelimiter+o+this.itemDelimiter+l}else{const n=s.cells[0];if(n===null)continue;const i=this.table.getElemValue(n)||"";t===""?t=`${i}`:t+=this.pairDelimiter+i}return t}showNumpad(e,t){if(e.KeyEnter===fe.Special||e.eventType===De.Click){if(this.numpad!==null)return;const n=this.table.getCellRect(e.parentElem),i=e.classify,o=document.getElementsByClassName(e.classify);let l="";o.length>=1&&(l=o[0].value);let a="";this.editType===oe.KeyValue?a=`${parseInt(n.width)+parseInt(n.width)/2}`:a=`${parseInt(n.width)/2}`,console.log("[showNumpad] posLeft",a);const r=`${this.ctlName}-numpad`,c=new Ts;c.setNum(l),c.maxDig=t,c.setListener(r,this.resultTable(this.tblCssName()).className,i),c.applyCss(),c.show(a,"4"),c.enableEvents(m=>{console.log(`[onApply] ${m.callerName} ${m.result}`);const p=document.getElementsByClassName(e.classify);if(p!==null){const u=p[0];u.value=m.result}this.closeNumpad()}),this.numpad=c}}closeNumpad(){this.numpad!==null&&(this.numpad.dispose(),this.numpad=null)}tblCssName(){return`${this.ctlName}-tbl`}}class Ts extends Fe{constructor(){super(...arguments),this.num="0",this.edit="0",this.maxDig=7,this.errText="NaN",this.callerName="",this.prevPad="",this.htmlMaker=new A,this.table=new W}setNum(e){if(e.length===0)this.num="0",this.edit="";else if(e.length<=this.maxDig&&e.length!==0){let t=!1;for(let s=0;s<e.length;s++){const n=e.charAt(s);if(/[0-9]/.test(n)===!1){t=!0;break}}t?(this.num=this.errText,this.edit=this.errText):(this.num=e,this.edit=e)}}setListener(e,t,s){if(this.num===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const n=new W;n.makeDim(1,1);const i=new W;i.makeDim(2,1);const o=new W;o.makeDim(3,3);const l=new W;l.makeDim(2,1),n.getCell(0,0).typeInfo.setLabel(`${this.num}`,!1),n.getCell(0,0).className=this.resultCssName(),n.getCell(0,0).typeInfo.using.itemId=0,i.getCell(0,0).typeInfo.setButton("AC"),i.getCell(0,0).className=this.acCssName(),i.getCell(0,0).typeInfo.using.itemId=0,i.getCell(1,0).typeInfo.setButton("ESC"),i.getCell(1,0).className=this.escCssName(),i.getCell(1,0).typeInfo.using.itemId=1,i.getCell(1,0).typeInfo.toolTip=`1回タップ：元の値に戻す
2回タップ：入力キャンセル`;let a=0;for(const p of[7,8,9,4,5,6,1,2,3]){const u=a%3,f=Math.floor(a/3);o.getCell(u,f).typeInfo.setButton(`${p}`),o.getCell(u,f).className=`${e}-pad-${p}`,o.getCell(u,f).typeInfo.using.itemId=a,a++}l.getCell(0,0).typeInfo.setButton("0"),l.getCell(0,0).className=`${e}-pad-0`,l.getCell(0,0).typeInfo.using.itemId=0,l.getCell(1,0).typeInfo.setButton("ENTR"),l.getCell(1,0).className=this.entrCssName(),l.getCell(1,0).typeInfo.using.itemId=1,l.getCell(1,0).typeInfo.toolTip="入力確定";const r=this.firstAction(e,t);if(r===null)return console.log(`[setListener] cannot found ${t}`),!1;const c=new Map;c.set("pad1",n.ToScrollHTML(e,e)),c.set("pad2",i.ToScrollHTML(e,e)),c.set("pad3",o.ToScrollHTML(e,e)),c.set("pad4",l.ToScrollHTML(e,e));let m=document.createElement("dialog");m.className=e,this.ctlElem=m;for(const[p,u]of c){const f=this.tblCssName(p),y=new te;y.props.name="",y.props.id=f,y.props.className=f,y.props.option.setTable(u),y.props.option.onSelect=async g=>{if(console.log(`classify = ${g.classify} targetId = ${g.targetId}`),this.onSelect!==void 0){const T=this.resultCell();if(T===null)return;const C=T.textContent;switch(g.classify){case this.acCssName():T.textContent="0",this.prevPad=this.acCssName();break;case this.escCssName():if(T.textContent=this.edit!==""?this.edit:"0",this.prevPad===this.escCssName()){const ne=new le;ne.callerName=this.callerName,ne.result=this.edit,await this.onSelect(ne)}this.prevPad=this.escCssName();break;case this.entrCssName():this.num=T.textContent;const N=new le;N.callerName=this.callerName,N.result=this.num,await this.onSelect(N);break;case"":break;default:if(this.maxDig===1){const ne=g.classify.charAt(g.classify.length-1);T.textContent=ne,this.prevPad=ne}if(C.length>=this.maxDig)return;const w=g.classify.charAt(g.classify.length-1),D=C==="0"||C===this.edit;T.textContent=D?w:T.textContent+w,this.prevPad=w;break}}};const d=new A;d.add(y);const b=d.ToHTML(),E=d.ToElem(b);this.htmlMaker.add(y);let I=E,$=I.children[0];$.className=f,$.id=f,this.ctlElem.appendChild($),I.remove(),I=null}return r.appendChild(this.ctlElem),this.table=n,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-numpad-style`;if(document.getElementById(e))return;const t=this.appendStyle(e);t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName("pad1")} {
  ${this.getBaseCssText()}
}
.${this.tblCssName("pad1")} {
width: 100%;
white-space: nowrap;
display: flex;
justify-content: flex-end;
}

[class^="${this.tblCssName("pad2")}"] {
border-radius: 4px;
display: flex;
justify-content: center;
}
[class^="${this.tblCssName("pad2")}"] button {
cursor: pointer;
}

[class^="${this.tblCssName("pad3")}"] {
border-radius: 4px;
display: flex;
justify-content: center;
}
[class^="${this.tblCssName("pad3")}"] button {
cursor: pointer;
border-radius: 4px;
border: 1px solid black;
display: flex;
width: 100%;
height: 100%;
}

[class^="${this.tblCssName("pad4")}"] {
border-radius: 4px;
display: flex;
justify-content: center;
}
[class^="${this.tblCssName("pad4")}"] button {
cursor: pointer;
}
        `.trim()}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}resultCell(){const e=this.resultTable(this.tblCssName("pad1"));return e===null?null:e.rows[0].cells[0]}tblCssName(e){return`${this.ctlName}-tbl-${e}`}resultCssName(){return`${this.ctlName}-result`}acCssName(){return`${this.ctlName}-ac`}escCssName(){return`${this.ctlName}-esc`}entrCssName(){return`${this.ctlName}-entr`}}class us{constructor(){this.value=new ge}}class Gs extends Fe{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new A,this.table=new W}setGuidetems(e){this.items=e}setListener(e,t,s){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const n=this.items.size,i=new W;i.makeDim(n,1),this.indexList=new Map;let o=0;for(const[d,b]of this.items)i.getCell(o,0).typeInfo=b.value.items[0].typeInfo,i.getCell(o,0).className=b.value.items[0].className,i.getCell(o,0).typeInfo.using.itemId=o,this.indexList.set(d,o),o++;const l=this.firstAction(e,t);if(l===null)return!1;const a=i.ToScrollHTML(e,this.tblCssName()),r=new te;r.props.name="",r.props.id=this.tblCssName(),r.props.className=this.tblCssName(),r.props.option.setTable(a),r.props.option.onSelect=async d=>{if(this.onSelect!==void 0){const b=new le;b.callerName=d.classify,b.result=d.selectedValue,await this.onSelect(b)}},this.htmlMaker=new A,this.htmlMaker.add(r);const c=this.htmlMaker.ToHTML();let m=document.createElement("dialog");m.className=e,m.innerHTML=c,this.ctlElem=m;let p=m.children[0];const u=this.divCssName();p.className=u,p.id=u;let f=p.children[0];f.className=`${this.tblCssName()}`,f.id=`${this.tblCssName()}`,l.appendChild(this.ctlElem),this.table=i,this.table.height="36",this.table.fontSize="0.6";const y=this.resultTable(this.tblCssName());if(this.cells=new Array,y!==null){const d=y.rows[0];if(d!==null){const b=this.table.getCellElems(d);if(b!==null)for(const E of b)for(const I of E)this.cells.push(I)}}return!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}setFontConfig(e="0.9"){this.table.setFontConfig(e)}applyCss(){const e=`${this.getBaseElem().className}-guidebar-style`;if(document.getElementById(e))return;let t="";for(const n of this.cells){const i=n.className;i!==""&&(t+=`
.${i} {
${this.table.getItemCssText()}
}
`)}const s=this.appendStyle(e);s.textContent=`
${this.getOuterCssText()}
${L.getTableCssText(this.divCssName(),this.table.height)}
.${this.ctlName} {
width: 360px;
}
${t}
        `.trim()}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setTextByIndex(e,t){return this.cells===void 0?!1:0<=e&&e<this.cells.length?(this.cells[e].textContent=t,!0):!1}setTextByKey(e,t){if(this.cells===void 0||this.indexList===void 0||this.indexList.has(e)===!1)return!1;const s=this.indexList.get(e);return s===void 0?!1:(this.cells[s].textContent=t,!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}divCssName(){return`${this.ctlName}-div`}tblCssName(){return`${this.ctlName}-tbl`}}class ds{constructor(){this.tblCssName=""}}class ks{constructor(){this.headerElem=null,this.subTblElem=null}}const fs={OkCancel:"OkCancel"};class Ze extends Fe{constructor(){super(...arguments),this.items=new Array,this.firstRowIndex=1,this.callerName="",this.htmlMaker=new A,this.table=new W,this.headerName="",this.footerName="",this.headerElem=null,this.footerElem=null,this.onOkClickFooter=async e=>{if(this.onSelect!==void 0){const t=new le;t.callerName=this.callerName,t.result="",t.classify=Ge.Ok,t.notify=this,await this.onSelect(t)}},this.onCancelClickFooter=async e=>{if(this.onSelect!==void 0){const t=new le;t.callerName=this.callerName,t.result="",t.classify=Ge.Cancel,t.notify=this,await this.onSelect(t)}},this.height=0}makeSubTable(e){const t=e.tblCssName,s=e.table.ToHTML(t,t),n=new te;n.props.name="",n.props.id=t,n.props.className=t,n.props.option.setTable(s),n.props.option.onSelect=async a=>{if(this.onSelect!==void 0){const r=new le;if(r.callerName=a.classify,r.result=a.selectedValue,await this.onSelect(r),a.cancel)return}for(const r of this.items){if(a.classify.includes(r.headerItem.tblCssName)){r.headerItem.onSelect!==void 0&&r.headerItem.onSelect(a);break}if(a.classify.includes(r.subTblItem.tblCssName)){r.subTblItem.onSelect!==void 0&&r.subTblItem.onSelect(a);break}}};const i=e.htmlMaker;i.add(n);const o=i.ToHTML(),l=i.ToElem(o);return e.htmlMaker=i,l}addGroupPair(e,t){const s=new ks;e.htmlMaker===void 0&&(e.htmlMaker=new A),t.htmlMaker===void 0&&(t.htmlMaker=new A);const n=this.makeSubTable(e),i=this.makeSubTable(t);s.headerElem=n,s.subTblElem=i,s.headerItem=e,s.subTblItem=t,this.items.push(s)}makeHeader(){this.headerName="-header",this.headerElem=document.createElement("div")}makeFooter(e=fs.OkCancel){this.footerName=`-footer-${e}`,this.footerElem=document.createElement("div")}setListener(e,t,s){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const n=this.items.length,i=new W;i.makeDim(1,2*n);let o=0;for(const d of this.items)d.headerElem!==null&&(i.getCell(0,o).typeInfo.setLowerTable(),o++),d.subTblElem!==null&&(i.getCell(0,o).typeInfo.setLowerTable(),o++);const l=this.firstAction(e,t);if(l===null)return!1;const a=i.ToScrollHTML(e,this.tblCssName()),r=new te;r.props.name="",r.props.id=this.tblCssName(),r.props.className=this.tblCssName(),r.props.option.setTable(a),r.props.option.onSelect=async d=>{if(this.onSelect!==void 0){const b=new le;b.callerName=d.classify,b.result=d.selectedValue,await this.onSelect(b)}},this.htmlMaker=new A,this.htmlMaker.add(r);const c=this.htmlMaker.ToHTML();for(const d of this.items){if(d.headerItem!==void 0)for(const b of d.headerItem.htmlMaker.itemList)this.htmlMaker.add(b);if(d.subTblItem!==void 0)for(const b of d.subTblItem.htmlMaker.itemList)this.htmlMaker.add(b)}let m=document.createElement("dialog");m.className=e,m.innerHTML=c,this.ctlElem=m;let p=m.children[0];const u=this.divCssName();p.className=u,p.id=u;let f=p.children[0];f.className=`${this.tblCssName()}`,f.id=`${this.tblCssName()}`,o=0;let y=0;for(const d of f.rows)o%2===0?(d.cells[0].appendChild(this.items[y].headerElem),o++):(d.cells[0].appendChild(this.items[y].subTblElem),o++,y++);if(this.headerElem!==null&&(this.headerElem.className=this.headerName,this.headerElem.id=this.headerName,m.appendChild(this.headerElem)),l.appendChild(this.ctlElem),this.footerElem!==null){const d=this.footerCssName();if(this.footerElem.className=d,this.footerElem.id=d,m.appendChild(this.footerElem),this.footerName.endsWith(fs.OkCancel)){const b=`${d}-okBtn`,E=`${d}-canBtn`;let I=`
<button id="${b}">OK</button>
<button id="${E}">CANCEL</button>
`.trim();this.footerElem.innerHTML=I,document.getElementById(b).onclick=this.onOkClickFooter,document.getElementById(E).onclick=this.onCancelClickFooter}}return this.table=i,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}enableEvents(e){if(this.ctlElem===null)return!1;const t=new Array;return t.push(this.items[0].headerItem.tblCssName),t.push(this.items[0].subTblItem.tblCssName),this.htmlMaker.enableTableEvents(this.ctlElem.className,t),this.onSelect=e,!0}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}dispose(){super.dispose(),this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}setSize(e="300"){let t=0;if(this.footerElem!==null){const s=this.htmlMaker.GetRect(this.footerElem);t=Number(s.height)}this.table.height=`${Number(e)-t}`,this.height=Number(e)+L.footerPadding}setFontConfig(e="0.9"){this.table.setFontConfig(e)}get cssText(){const e=this.footerCssName(),t=this.footerName!==""?`
/*フッター背景*/
[class^="${e}"] {
${L.footerText()}
}
/*フッターのボタン*/
[class^="${e}"] button {
${L.footerButtonText()}
}
`.trim():"";return`
${this.getOuterCssText()}
${L.getTableCssText(this.divCssName(),this.table.height)}
${t}
`.trim()}divCssName(){return`${this.ctlName}-div`}tblCssName(){return`${this.ctlName}-tbl`}headerCssName(){return`${this.ctlName}${this.headerName}`}footerCssName(){return`${this.ctlName}${this.footerName}`}}Ze.allRowAction=-1;class ps{constructor(){this.url="",this.toolTip=""}}class At extends Ze{constructor(){super(...arguments),this.checkClassName="",this.subTblClassName="",this.imgClassName="",this.imgSize=100,this.bgColor=`${L.onColor}66`,this.onSelectHeader=async e=>{const t=e.classify.split("-");t.length>=1&&this.setCheck(Number(t[t.length-1]))},this.onSelectSubTbl=async e=>{console.log(e)}}makeCheckHeader(e,t,s){const n=new W;n.makeDim(1,1),this.checkClassName=`${e}-check`;const i=new Ut;i.placeholder=t,i.value=!1,i.enableClicked="true";const o=new ge;o.makeItems(),o.items[0].typeInfo.setCheck(i),o.items[0].className=`${this.checkClassName}-${s}`,n.getCell(0,0).typeInfo=o.items[0].typeInfo,n.getCell(0,0).className=o.items[0].className,n.getCell(0,0).typeInfo.using.itemId=1,n.getCell(0,0).typeInfo.toolTip=t;const l=new ds;return l.tblCssName=e,l.table=n,l.onSelect=this.onSelectHeader,l}makeImgSubTbl(e,t,s){const n=new W;n.makeDim(t.length,1),this.subTblClassName=e,this.imgClassName=`${e}-img`;let i=0;for(const l of t){const a=new Mt;a.imgFile="",a.imgSrc=l.url,a.alt="";const r=new ge;r.makeItems(),r.items[0].typeInfo.setImg(a),r.items[0].className=`${this.imgClassName}-${s}-${i}`,n.getCell(i,0).typeInfo=r.items[0].typeInfo,n.getCell(i,0).className=r.items[0].className,n.getCell(i,0).typeInfo.using.itemId=i,n.getCell(i,0).typeInfo.toolTip=l.toolTip,i++}const o=new ds;return o.tblCssName=e,o.table=n,o.onSelect=this.onSelectSubTbl,o}setCheckByRow(e=this.firstRowIndex,t=!0){if(e===Ze.allRowAction){for(const n of this.items)this.setCheckInternal(n);return!0}if(e<0||e>=this.items.length)return!1;const s=this.items[e-this.firstRowIndex];return this.setCheckInternal(s)}setCheck(e=this.firstRowIndex){let t=this.firstRowIndex;for(const s of this.items)t===e?this.setCheckInternal(s,!0):this.setCheckInternal(s,!1),t++}setCheckInternal(e,t=!0){const s=e.headerElem;if(s===null)return!1;const n=s.rows[0];for(const i of n.cells){for(const o of i.children)if(o.tagName==="DIV"){e.headerItem.table.setElemValue(o,t);break}break}return!0}getCheckMap(){const e=new Map;let t=this.firstRowIndex;for(const s of this.items){const n=s.headerElem;if(n===null)continue;const i=n.rows[0];for(const o of i.cells){for(const l of o.children){if(l.tagName!=="DIV")continue;const r=s.headerItem.table.getElemValue(l);e.set(t,r);break}break}t++}return e}checkedRow(){const e=this.getCheckMap();for(const[t,s]of e)if(s===!0)return t;return-1}selectFirstCell(e=this.firstRowIndex){if(e===Ze.allRowAction){for(const s of this.items)this.selectFirstCellInternal(s);return!0}if(e<0||e>=this.items.length)return!1;const t=this.items[e-this.firstRowIndex];return this.selectFirstCellInternal(t)}selectFirstCellInternal(e){const t=e.subTblElem;if(t===null)return!1;const s=t.rows[0];for(const n of s.cells){for(const i of n.children)i.tagName==="DIV"&&i.classList.remove("selected");if(n.children.length>=1){n.children[0].classList.add("selected");break}break}return!0}applyCss(){const e=`${this.getBaseElem().className}-listviewgroup-style`;if(document.getElementById(e))return;const t=L.spacingTable,s=this.appendStyle(e);s.textContent=`
${this.cssText}

.${this.ctlName} {
width: ${(this.imgSize+4)*5}px; height: ${this.imgSize+50}px;
height: ${this.height}px;
}

[class^="${this.checkClassName}"] {
display: flex;
${L.spanCssText(this.table.fontSize,!1)}
width: 100%;            /* 幅を固定するとGridらしくなります */
}

[class^="${this.subTblClassName}"] {
${t}
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
`.trim()}}class Tt{constructor(){this.numCell=1,this.enableWatchNotify=!1}}class Vs extends Ze{constructor(){super(...arguments),this.indentPx=10,this.topTableElem=null,this.onButtonClicked=async e=>{const t=e.target;if(t!==null&&t.tagName==="BUTTON"&&this.onSelect!==void 0){const s=t.getAttribute("item-id"),n=new le;n.callerName=t.className,n.result=s||"",n.classify=Ge.Unknown,n.notify=this,await this.onSelect(n)}},this.rowObserver=null,this.rowSelector="",this.trSelector='tr[data-enable-watch-notify="true"]'}init(){const e=new ks;e.headerElem=null,e.subTblElem=null,this.items.push(e)}createRoot(){const e=this.table.getParentElem();if(e===null)return;const t=e.children[0];if(t===null)return;const s=t.children[0];t.style.padding="unset",s.style.padding="unset",this.topTableElem=s,this.newRow(s,"-root",new Tt),this.rowVisible(s,!1,null)}createNode(e,t,s=new Tt){const n=document.createElement("table");return n.className=t,this.newRow(n,"",s),e.rows[1].cells[0].appendChild(n),n}removeNode(e){if(e===null)return;const t=e.parentElement;t!==null&&(t.removeChild(e),e.remove(),e=null)}removeNodeBy(e){let t=this.findNodeBy(e);this.removeNode(t)}findParentNodeBy(e){let t=this.findNodeBy(e);if(t===null)return null;let s=t.parentElement;for(;s!==null;){if(s===this.topTableElem)return null;if(s.tagName==="TABLE")break;s=s.parentElement}return s}getChildren(e){if(e===null||e.rows.length!==2)return null;const t=e.rows[1].cells[0].children;if(t.length===0)return null;const s=new Array;for(const n of t)s.push(n);return s}newRow(e,t,s){const n=e.insertRow(-1),i=e.insertRow(-1);n.className=`${e.className}${t}-row_1`,i.className=`${e.className}${t}-row_2`,n.innerHTML="<td></td>".repeat(s.numCell),i.innerHTML="<td></td>",s.enableWatchNotify===!0&&(n.dataset.enableWatchNotify="true")}rowVisible(e,t,s){e!==null&&(t!==null&&(e.rows[0].style.display=t===!0?"":"none"),s!==null&&(e.rows[1].style.display=s===!0?"":"none"))}makeTextCell(e,t,s){const n=new _e;return n.typeInfo.setLabel(t,!1),n.className=e,n.typeInfo.toolTip=s,n}makeImgCell(e,t,s,n){const i=new Mt;i.imgSrc=t,i.imgFile=s,i.lazy=!0;const o=new _e;return o.typeInfo.setImg(i),o.className=e,o.typeInfo.toolTip=n,o}makeBtnCell(e,t,s,n){const i=new _e;return i.typeInfo.setButton(t),i.className=e,i.typeInfo.toolTip=s,i.typeInfo.using.itemId=n,i}get rootName(){return this.topTableElem.className}findNodeBy(e){if(this.topTableElem===null)return null;if(this.topTableElem.className===e)return this.topTableElem;const t=this.topTableElem.getElementsByClassName(e);return t.length===0?null:t[0]}getCell(e,t=0){if(e===null)return null;const s=e.rows[0];return t<0||t>=s.cells.length?null:s.cells[t]}findCell(e,t){return e===null?null:e.querySelector(t)}setCellContent(e,t,s){const n=this.getCell(e,t);return n===null?!1:(n.innerHTML=s,!0)}enableEvents(e){return this.topTableElem===null?!1:(this.topTableElem.addEventListener("click",this.onButtonClicked),this.onSelect=e,!0)}disableEvents(){return this.topTableElem===null?!1:(this.topTableElem.removeEventListener("click",this.onButtonClicked),!0)}startWatch(e,t=this.ctlName){if(this.rowObserver!==null)return;const s=document.getElementById(`${t}-div`);if(s===null)return;const n={root:s,rootMargin:"0px",threshold:.1},i=new IntersectionObserver(l=>{l.forEach(a=>{const r=a.target;a.isIntersecting&&r.dataset.enableWatchNotify==="true"&&this.onNotifyWatched!==void 0&&this.onNotifyWatched(r)})},n);document.querySelectorAll(`.${t}-tbl tbody ${this.trSelector}`).forEach(l=>{i.observe(l)}),this.rowObserver=i,this.rowSelector=t,this.onNotifyWatched=e}stopWatch(){if(this.rowObserver===null)return;const e=document.querySelectorAll(`.${this.rowSelector}-tbl tbody ${this.trSelector}`);for(const t of e)this.rowObserver.unobserve(t);this.rowObserver=null,this.rowSelector="",this.onNotifyWatched=void 0}reset(){this.topTableElem!==null&&(this.topTableElem.innerHTML="",this.topTableElem=null)}dispose(){super.dispose(),this.disableEvents(),this.stopWatch()}scroll(e){e!==null&&e.scrollIntoView({behavior:"smooth",block:"center"})}applyCss(){const e=`${this.getBaseElem().className}-nestednodegroup-style`;if(document.getElementById(e))return;const t=this.appendStyle(e);t.textContent=`
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
width: 100px; height: 100px;
}

`.trim()}}class zs{constructor(){this.itemType=R.Unknown,this.itemId=-1,this.label="",this.innerHTML=""}}class Is{constructor(){this.toolTip="",this.using=new zs}setButton(e){this.using.itemType=R.Btn,this.using.label=e}setLabel(e,t){this.using.itemType=t?R.Label:R.LabelRO,this.using.label=e}setCombo(e){this.using.itemType=R.Combo,this.using.combo=e}setInput(e){this.using.itemType=R.Input,this.using.input=e}setCheck(e){this.using.itemType=R.Chk,this.using.check=e}setImg(e){this.using.itemType=R.Img,this.using.img=e}setPlain(e){this.using.itemType=R.Plain,this.using.innerHTML=e}setTable(e){this.using.itemType=R.Table,this.using.innerHTML=e}setLowerTable(){this.using.itemType=R.LowerTable}ToButtonHTML(e){const t=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"";return`
<button class="${e}"${t} title="${this.toolTip}">${this.using.label}</button>
`.trim()}ToLableHTML(e){const t=this.toolTip!==""?` title="${this.toolTip}"`:"";return`
<span class="${e}" data-readonly="false"${t}>${this.using.label}</span>
`.trim()}ToLableROHTML(e){const t=this.toolTip!==""?` title="${this.toolTip}"`:"";return`
<span class="${e}" data-readonly="true"${t}>${this.using.label}</span>
`.trim()}ToComboHTML(e){if(this.using.combo===void 0)return"";const t=this.using.combo;let s=te.makeComboItemsHTML(t);const n=t.classify!==""?` data-classify="${t.classify}"`:"";return`
<select class="${e}" ${n} title="${this.toolTip}">
  ${s}
</select>
`.trim()}ToInputHTML(e){if(this.using.input===void 0)return"";const t=this.using.input,s=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"",n=t.value!==""?` value="${t.value}"`:"",i=t.placeholder!==""?` placeholder="${t.placeholder}"`:"",o=t.disableKeyDown===!0?' data-disableKeyDown="true"':"",l=t.enableClicked===!0?' data-enableClicked="true"':"",a=`${o}${l}`;return`
<input type="${t.type}" class="${e}"${s}${n}${i}${a} title="${this.toolTip}">
`.trim()}ToCheckHTML(e){if(this.using.check===void 0)return"";const t=this.using.check,s=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"",n=t.value?" checked":"",i=t.placeholder!==""?` placeholder="${t.placeholder}"`:"",l=`${t.enableClicked===""?"":t.enableClicked==="true"?' data-enableClicked="true"':' data-enableClicked="false"'}`;return`
<div class="${e}-container">
 <span class="${e}-text">${this.toolTip}</span>
 <label class="${e}-label" title="${t.placeholder}">
  <input type="${t.type}" class="${e}"${s}${n}${i}${l}>
  <span class="${e}-slider"></span>
 </label>
</div>
`.trim()}ToImgHTML(e,t){let s="",n="";return this.using.img.lazy===!0?(n='loading="lazy"',s=`src="${this.using.img.imgSrc}"`):this.using.img.imgSrc===""?s=`src="" data-filename="${this.using.img.imgFile}"`:s=`src="${this.using.img.imgSrc}"`,`
<img class="${e}" ${s}${n} alt="${t}">
`.trim()}ToOverlayHTML(){return`<div class="overlay" title="${this.toolTip}"></div>`}}class Js{constructor(){this.name="",this.id="",this.className="",this.option=new Is}}class te{constructor(){this.props=new Js}ToHTML(e){let t="",s="";switch(e.option.using.itemType){case R.Btn:t=e.option.ToButtonHTML(e.className);break;case R.Label:t=e.option.ToLableHTML(e.className),s=e.option.ToOverlayHTML();break;case R.LabelRO:t=e.option.ToLableROHTML(e.className);break;case R.Plain:t=`
${e.option.using.innerHTML}
`.trim();break;case R.Combo:t=e.option.ToComboHTML(e.className);break;case R.Input:t=e.option.ToInputHTML(e.className);break;case R.Chk:t=e.option.ToCheckHTML(e.className);break;case R.Img:t=e.option.ToImgHTML(e.className,e.option.using.img.alt),s=e.option.ToOverlayHTML();break}return`
  ${t}
  ${s}
`.trim()}MakeSelectableHTML(){return`
<div class="${this.props.name}" id="${this.props.name}" item-id="${this.props.id}">
${this.ToHTML(this.props)}
</div>
`.trim()}static makeComboItemsHTML(e){if(e.selectionPair===void 0||e.selectionPair.length<=0)return"";let t="";for(const s of e.selectionPair){let[n,i]=s.split("/");i=i.trim();const o=e.selectedItem===i?" selected":"",l=`
<option value="${i}"${o}>${n}</option>
`.trim();t+=l}return t}}class A{constructor(){this._defaultButtonsName="dialog-buttons",this._defaultToolButtonsName="dialog-tool-btns",this._enableScrollEvt=!1,this._scrollTimer=null,this._isScrolling=!1,this.onButtonClicked=e=>{const t=e.target;if(t===null)return;const s=t.tagName==="BUTTON"?t:t.parentElement;if(s===null)return;let n=this.supplessSelected(s.className);if(n!==""){n=`.${n}`;const o=document.querySelectorAll(`${n}.selected`);if(o.length>=1)o.forEach(l=>l.classList.remove("selected"));else{let l=this.getTopElement(t);if(l!==null){const a=s.tagName,r=l.querySelectorAll(`${a}.selected`);r.length>=1&&r.forEach(c=>c.classList.remove("selected"))}}s.classList.add("selected")}const i=s.getAttribute("item-id");if(i){const o=this.itemList.find(l=>`${l.props.id}`===i);if(o){if(o.props.option.onSelect){let l="";t.tagName==="BUTTON"&&(l=t.getAttribute("item-id"),l===null&&(l=""));const a=new qe;a.parentElem=t.parentElement,a.item=o,a.targetId=l,o.props.option.onSelect(a)}this.selectedCh=o}else{let l=this.getTopElement(t);if(l?.tagName==="TABLE"){const a=l.className,r=this.itemList.find(c=>c.props.className===a);if(r){if(r.props.option.onSelect){let c="";t.tagName==="BUTTON"&&(c=t.getAttribute("item-id"),c===null&&(c=""));const m=t.parentElement!==null?t.parentElement.className:"";let p=t.className;p==="overlay"&&(p=m,t.parentElement!==null&&(c=t.parentElement.getAttribute("item-id"),c===null&&(c="")));const u=new qe;u.parentElem=t.parentElement,u.item=r,u.targetId=c,u.classify=this.supplessSelected(p),r.props.option.onSelect(u)}this.selectedCh=r}}}}},this.onInputKeydown=e=>{const t=e.target;if(t===null||t.tagName!=="INPUT")return;const s=t,n=e;let i=fe.None;switch(n.key){case je.Enter:i=fe.Normal;const o=n.repeat,l=n.timeStamp;let a=s.dataset.pressInfo;if(a===void 0)a=`1;${l}`,i=fe.Normal;else if(!o){const c=a.split(";");if(c.length===2){let m=parseInt(c[0]),p=parseFloat(c[1]);l-p>=4*1e3?m=1:(m++,m>=3&&(m=0,i=fe.Special)),a=`${m};${l}`}}s.dataset.pressInfo=a,n.preventDefault();break;case je.Escape:s.value="元の値",s.blur();break;case je.Tab:break;case je.Process:return;default:s.dataset.disablekeydown!==void 0&&n.preventDefault();return}this.notifyOnInputEvent(s,De.KeyDown,n.key,i)},this.onInputClicked=e=>{const t=e.target;if(t===null||t.tagName!=="INPUT")return;const s=t;s.dataset.enableclicked!==void 0&&this.notifyOnInputEvent(s,De.Click,"",fe.None)},this.onSelectChange=e=>{const t=e.target;if(t===null||t.tagName!=="SELECT")return;const s=t?.dataset.classify;let n=t.getAttribute("item-id");if(n===null){const i=this.getTopElement(t);i!==null&&(n=i.getAttribute("item-id"))}if(n){let i=this.itemList.find(o=>`${o.props.id}`===n);if(i===void 0&&(i=this.itemList.find(o=>`${s}${o.props.id}`===n)),i){if(i.props.option.onSelect){const o=new qe;o.parentElem=t.parentElement,o.item=i,o.targetId=n,o.classify=s===void 0?"?":s,o.selectedValue=t.value,i.props.option.onSelect(o)}this.selectedCh=i}}},this.itemList=new Array}add(e){this.itemList.push(e)}MakeDefaultDialogParentCss(e,t,s,n=0){return`
.${e} {
  position: fixed;
  inset: auto; /* ブラウザの中央寄せを無効化 */
  top: ${s}px;
  left: ${t}px;
  transform: translateX(-50%);
  z-index: ${n};
}
`.trim()}MakeSystematicDialogCss(e){return`
.${e} {
  background-color: #86aef7;
  border: 2px solid #2c3e50;
  padding: 10px;
  ${L.borderShadowText}
}
`.trim()}MakeDefaultDialogCss(e){return`
.${e} {
  background-color: #f7eb86e6;
  border: 2px solid #2c3e50;
  padding: 10px;
  ${L.borderShadowText}
}
`.trim()}ToHTML(){let e="";for(const t of this.itemList){if(t.props.option.using.itemType===R.Table){e+=t.props.option.using.innerHTML;continue}e+=t.MakeSelectableHTML()}return`${e}`}MakeScrollableList(e){let t="";for(const s of this.itemList)t+=s.MakeSelectableHTML();return`<div id="${e}" class="${e} scroll">
${t}
</div>`}MakeDefaultScrollCss(e,t){return`
.${e} .scroll {
max-height: ${t}px;
overflow-y: auto;
${L.scrollBarText}
}
`.trim()}MakeDefaultNonScrollCss(e,t){return""}MakeDefaultGridColCss(e,t,s,n){return`
.${e} {
display: grid;
grid-template-columns: repeat(${s}, ${t}px);
gap: 0px;
width: ${n}px;
}
`.trim()}MakeDefaultGridRowCss(e,t,s,n){return`
.${e} {
display: grid;
grid: repeat(${s}, ${n}px) / auto-flow ${t}px;
gap: 0px;
height: ${(n+2)*s}px;
}
`.trim()}MakeDefaultItemJustifyRightCss(e,t,s){return`
.${e} {
position: relative;
width: ${t}px;
height: ${s}px;
display: flex;
justify-content: flex-end;
font-size: 12px;
cursor: pointer;
}
`.trim()}MakeDefaultItemJustifyCenterCss(e,t,s){return`
.${e} {
position: relative;
width: ${t}px;
height: ${s}px;
display: flex;
justify-content: center;
font-size: 12px;
cursor: pointer;
}
`.trim()}MakeDefaultItemimgCss(e,t,s,n){return`
.${e} {
position: relative;
width: ${s}px;
height: ${n}px;
cursor: pointer;
}
.${e} .${t} {
width: 100%;
height: 100%;
}
`.trim()}MakeDefaultItemLabelCss(e,t,s,n){return`
.${e} {
position: relative;
width: ${s}px;
height: ${n}px;
cursor: pointer;
}
.${e} .${t} {
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
`.trim()}MakeSystematicSelectionCss(e){return this.overlayCss(e,"rgba(128, 128, 128, 0.4)")}MakeDefaultSelectionCss(e){return this.overlayCss(e,"rgba(0, 128, 255, 0.4)")}overlayCss(e,t){return`
.${e} .overlay {
position: absolute;
inset: 0;
background: ${t}; /* 選択時の色 */
opacity: 0;
transition: opacity 0.2s;
}
.${e}.selected .overlay {
opacity: 1;
}
`.trim()}get defaultButtonsCssName(){return this._defaultButtonsName}set defaultButtonsCssName(e){this._defaultButtonsName=e}MakeDefaultButtonsHTML(e){return`
<div class="${this.defaultButtonsCssName}">
    ${e}
</div>
`.trim()}MakeDefaultButtonsCss(){return`
.${this.defaultButtonsCssName} {
    display: flex;
    justify-content: flex-end; /* 右寄せも簡単 */
    gap: 8px;
}
.${this.defaultButtonsCssName} button {
    width: 120px; /* または flex:1 */
    ${L.footerButtonText()}
}`.trim()}get defaultToolButtonsCssName(){return this._defaultToolButtonsName}set defaultToolButtonsCssName(e){this._defaultToolButtonsName=e}MakeDefaultToolButtonsHTML(e){return`
<div class="${this.defaultToolButtonsCssName}" id="${this.defaultToolButtonsCssName}">
    ${e}
</div>
`.trim()}MakeDefaultToolButtonsCss(){return`
.${this.defaultToolButtonsCssName} {
    display: flex;
    justify-content: flex-start; /* 左寄せも簡単 */
    gap: unset;
}
.${this.defaultToolButtonsCssName} button {
    height: 30px;
    ${L.footerButtonText()}
}
.${this.defaultToolButtonsCssName} select {
    height: 30px;
    ${L.footerButtonText()}
}
`.trim()}initFullScreen(e,t){const s=document.getElementById(e);if(s===null)return!1;s.innerHTML=`
<div class="loader-content">
  <p>${t}</p>
  <div class="spinner">
    <img class="spinner-spin" src="spinner.gif"></img>
  </div>
</div>
`.trim()}MakeFullScreenCss(e){return`
#${e} {
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
`.trim()}applyFullScreenCss(e){const t=document.getElementById(e);if(t===null||t.classList.contains("hidden"))return!1;const s=document.createElement("style");return s.textContent=`
${this.MakeFullScreenCss(e)}
`.trim(),document.head.appendChild(s),!0}hideFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.add("hidden")}showFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.remove("hidden")}getFullScreenMsgElem(e){const t=document.getElementById(e);if(t){const s=t.querySelectorAll("p");return s!==null&&s.length>=1?s[0]:null}return null}initObserver(e,t){const s=document.getElementById(e);if(!s)return;const n=async l=>{await l.forEach(async a=>{if(a.isIntersecting){const r=a.target,c=this.isDemo&&!t.isMaterial(r.dataset.filename)?"demo.png":r.dataset.filename;if(c&&r.src===""||r.src.startsWith(window.location.origin)){const m=await t.findNs(c);m===null||m===""?(this.observer.unobserve(r),console.log(`cannot set image : ${c}`)):await t.getImageUrlBy(c,m).then(p=>{p!==null?(r.src=p,this.observer.unobserve(r)):console.log(`pending set image : ${c}`)})}}})},i={root:s,rootMargin:"0px",threshold:.1};this.observer=new IntersectionObserver(n,i),s.querySelectorAll("img[data-filename]").forEach(l=>this.observer.observe(l)),console.log("[initObserver] enabled!")}get isDemo(){return window.EVONA_CONFIG.demo}get isScrolling(){return this._enableScrollEvt?!(this._scrollTimer!==null&&this._isScrolling):!1}enableScrollEvent(e){this._isScrolling=!1;const t=document.getElementById(e);return t?(this._enableScrollEvt=!0,t.addEventListener("scroll",()=>{this._isScrolling=!0,clearTimeout(this._scrollTimer),this._scrollTimer=setTimeout(()=>{this._scrollTimer=null,this._isScrolling=!1;const s=this.observer.takeRecords();console.log(`[enableScrollEvent] stopped ${s.length}`)},200)}),console.log("[enableScrollEvent] enabled!"),!0):!1}enableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(n=>{const i=n.querySelectorAll("img");i.length>=1&&(i[0],this.addButtonEvent(t,n));const o=n.querySelectorAll("span");o.length>=1&&o[0]?.dataset.readonly=="false"&&this.addButtonEvent(t,n);const l=n.querySelectorAll("select");l.length>=1&&(l[0],this.addSelectEvent(t,n));const a=n.querySelectorAll("button");if(a.length>=1)for(const r of a)console.log(`${n.tagName}::${t}::button::${r.innerHTML}`),n.addEventListener("click",this.onButtonClicked)})}enableTableEvents(e,t=void 0){const s=`.${e}`;document.querySelectorAll(`${s}`).forEach(i=>{const o=i.querySelectorAll("table");if(o.length>=1)for(const l of o){if(t!==void 0&&t.find(r=>r===l.className)){console.log(`[enableTableEvents] exclude table ${i.className}`);continue}l.addEventListener("click",this.onButtonClicked),l.addEventListener("keydown",this.onInputKeydown),l.addEventListener("click",this.onInputClicked),l.addEventListener("change",this.onSelectChange)}})}disableTableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(n=>{const i=n.querySelectorAll("table");if(i.length>=1)for(const o of i)n.removeEventListener("click",this.onButtonClicked),n.removeEventListener("keydown",this.onInputKeydown),n.removeEventListener("click",this.onInputClicked),n.removeEventListener("change",this.onSelectChange)})}addButtonEvent(e,t){t.getAttribute("item-id")&&t.addEventListener("click",this.onButtonClicked)}notifyOnInputEvent(e,t,s,n){const i=e.getAttribute("item-id");if(i){let o=this.getTopElement(e);if(o?.tagName==="TABLE"){const l=o.className,a=this.itemList.find(r=>r.props.className===l);if(a){const r=new qe;r.parentElem=e.parentElement,r.item=a,r.targetId=i,r.classify=this.supplessSelected(e.className),r.eventType=t,r.Keydown=s,r.KeyEnter=n,a.props.option.onSelect(r)}}}else console.log("**notifyOnInputEvent::invalid id**"),console.log(e)}addSelectEvent(e,t){t.addEventListener("change",s=>{const n=s.target,i=n?.dataset.classify,o=t.getAttribute("item-id");if(o){let l=this.itemList.find(a=>`${a.props.id}`===o);if(l===void 0&&(l=this.itemList.find(a=>`${i}${a.props.id}`===o)),l){if(l.props.option.onSelect){const a=new qe;a.item=l,a.targetId=o,a.classify=i===void 0?"?":i,a.selectedValue=n.value,l.props.option.onSelect(a)}this.selectedCh=l}}})}supplessSelected(e){let t=e,s=e.indexOf(" selected");return s>=0&&(t=e.substring(0,s)),t}getTopElement(e){let t=e.parentElement;for(;t!==null;){if(t.tagName==="DIV"){t=t.parentElement;continue}if(t.tagName==="TD"){t=t.parentElement;continue}if(t.tagName==="TR"){t=t.parentElement;continue}if(t.tagName==="TBODY"){t=t.parentElement;continue}if(t.tagName==="LABEL"&&e.tagName==="INPUT"&&e.type==="checkbox"){t=t.parentElement;continue}break}return t}GetRect(e){const t=e.getBoundingClientRect(),s=new Nt;return s.left=`${t.left}`,s.top=`${t.top}`,s.width=`${t.width}`,s.height=`${t.height}`,s}EnableElem(e,t){e.ariaDisabled=t?"false":"true"}IsEnabledElem(e){return e.ariaDisabled===null?!0:e.ariaDisabled==="false"}EnableId(e,t){const s=document.getElementById(e);return s===null?null:(this.EnableElem(s,t),t)}IsEnabledId(e){const t=document.getElementById(e);return t===null?null:this.IsEnabledElem(t)}ToElem(e){const t=document.createElement("div");if(t===null)return null;t.innerHTML=e;const s=t.firstElementChild;return t.remove(),s}ReplaceElem(e,t){if(t===null)return;const s=document.getElementsByClassName(e);if(s.length===0)return;const n=s[0],i=new Array;let o=-1,l=-1;for(const m of n.children)o++,m.className===t.className&&m.tagName===t.tagName?l=o:i.push(m);if(l===-1)return;const a=n.children.length,r=new Array;for(const m of n.children)r.push(m);for(const m of r)n.removeChild(m),m.remove();r.slice(0,r.length);let c=-1;for(o=0;o<a;o++)o===l?n.appendChild(t):(c++,n.appendChild(i[c]))}GetIdByIndex(e){return this.itemList[e].props.id}UnselectAll(e){const t=`.${e}`;document.querySelectorAll(`${t}.selected`).forEach(s=>s.classList.remove("selected"))}SelectByID(e,t){const s=this.FindByID(e,t);if(s){s.classList.add("selected");const n=s.getAttribute("item-id");if(n){const i=this.itemList.find(o=>`${o.props.id}`===n);i&&(this.selectedCh=i)}return s}return null}FindDivByClassName(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.querySelectorAll("div");for(const l of o)if(l.className===t||l.className.startsWith(t))return l}return null}FindByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t)return i}return null}FindImgByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("img");return l.length>=1?l[0]:null}}return null}FindImgsByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("img");return l.length>=1?l:null}}return null}FindDivByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("div");return l.length>=1?l[0]:null}}return null}FindSelectByID(e,t,s){const n=`.${e}`,i=document.querySelectorAll(`${n}`);for(const o of i){const l=o.getAttribute("item-id");if(l&&l===t){const a=o.querySelectorAll("select");if(a.length>=1){for(const r of a)if(r?.dataset.classify===s)return r}return null}}return null}ReplaceImg(e,t,s){const n=this.FindImgByID(e,t);return n===null?null:(n.dataset.filename,n.src=s,n)}ReplaceDivToolTip(e,t,s){const n=this.FindDivByID(e,t);return n===null?null:(n.title=s,n)}ReplaceImgToolTip(e,t,s){const n=this.FindImgByID(e,t);return n===null?null:(n.title=s,n)}SwapImgSrcAndPairToolTip(e,t){if(e===null||t===null)return!1;const s=e.parentElement,n=t.parentElement;let i=null,o=null;if(s!==null){for(const r of s.children)if(r.tagName==="DIV"){i=r;break}}if(n!==null){for(const r of n.children)if(r.tagName==="DIV"){o=r;break}}const l=e.src,a=t.src;if(e.src=a,t.src=l,i!==null&&o!==null){const r=i.title,c=o.title;i.title=c,o.title=r}else console.log("[SwapImgSrcAndBrosToolTip] cannot swap title");return!0}SetImgSrc(e,t){if(e===null)return null;e.dataset.filename,e.src=t}SetImgSize(e,t,s){if(e===null)return null;e.style.width=`${t}px`,e.style.height=`${s}px`}ReplaceComboItems(e,t,s){const n=this.FindSelectByID(e,t,s.classify);if(n===null)return null;n.querySelectorAll("option").length>=1&&(n.innerHTML="");const o=te.makeComboItemsHTML(s);return o!==""&&(n.innerHTML=o),n}setVisible(e,t){const s=document.getElementById(e);return s===null?null:(s.style.display=t===!0?"":"none",!0)}copyCssToInlineStyle(e,t){for(const s of document.styleSheets){let n;try{n=s.cssRules}catch{continue}for(const i of n)if(i instanceof CSSStyleRule&&i.selectorText===e){const o=i.style;console.log(`[copyCssToInlineStyle] coping [${e}]`);for(let l=0;l<o.length;l++){const a=o[l],r=o.getPropertyValue(a);t.style.setProperty(a,r)}return}}}}const He={Hide:"Hide",CopyPaste:"CopyPaste"},Ye={Hide:"Hide",MoveLowest:"MoveLowest"},Ae={Hide:"Hide",DialogHide:"DialogHide"},Xe={Hide:"Hide",Help:"Help"},Qe={Hide:"Hide",Guide:"Guide"},Te={Copy:"Copy",Paste:"Paste",Cancel:"Cancel"};class ye{constructor(){this.title="",this.dlgName="",this.B2Type=He.Hide,this.B3Type=Ye.MoveLowest,this.B4Type=Ae.Hide,this.B5Type=Xe.Hide,this.GType=Qe.Hide,this.initLeft=0,this.initTop=0,this.cornerIndex=-1,this.mover=new qs,this.moverOnMoveDone=async()=>{this.onMoveDone!==void 0&&(await this.onMoveDone(this.dlg),this.cornerIndex=0)},this.resizer=new Ks,this.resizerOnResizeDone=async(e,t)=>{this.onResizeDone!==void 0&&await this.onResizeDone(this.dlg,e,t)},this.b2cursor="",this.isIPad=/iPad|Macintosh/.test(navigator.userAgent)&&"ontouchend"in document,this.isTouchDevice=()=>"ontouchstart"in window||navigator.maxTouchPoints>0}SetB2Type(e=He.CopyPaste,t){this.B2Type=e,this.onCopyPaste=t}SetB3Type(e=Ye.MoveLowest){this.B3Type=e}SetB4Type(e=Ae.Hide){this.B4Type=e}SetB5Type(e=Xe.Help,t){this.B5Type=e,this.onHelp=t}SetGuide(e=Qe.Guide,t){this.GType=e,this.onGuide=t}NewDialog(e,t){this.dlgName=t;const s=document.createElement("dialog");s.id=t,s.className=t;const n=document.getElementById(e);return n.appendChild(s),this.dlgParent=n,this.dlg=s,s}SetContent(e,t,s=!0){const n=this.dlg,i=`<button class="${this.toolNameB0}" id="${this.toolNameB0}" title="DragMove">[＊]</button>`,o=`<button class="${this.toolNameB1}" id="${this.toolNameB1}" title="SideBy">[≫]</button>`;let l="";this.B2Type===He.CopyPaste&&(l=`<button class="${this.toolNameB2}" id="${this.toolNameB2}" title="Copy&Paste">[⇔]</button>`);let a="";this.B3Type===Ye.MoveLowest&&(a=`<button class="${this.toolNameB3}" id="${this.toolNameB3}" title="MoveLowest">[_]</button>`);let r="";this.B4Type===Ae.DialogHide&&(r=`<button class="${this.toolNameB4}" id="${this.toolNameB4}" title="Close">[×]</button>`);let c="";this.B5Type===Xe.Help&&(r=`<button class="${this.toolNameB5}" id="${this.toolNameB5}" title="Help">[？]</button>`);let m="";this.GType===Qe.Guide&&(m=`
<div class="${this.toolNameGuideOwn}" id="${this.toolNameGuideOwn}" style="position: relative;">
<button class="${this.toolNameGuideCtl}" id="${this.toolNameGuideCtl}" title="Guide">[G]</button>
</div>
`);const p=`${i}${o}${l}${a}${r}${c}${m}`;let u="";this.title!==""?u=`<div class="${this.titleName}">${this.title}${p}</div>`:u=`<div class="${this.titleName}">${p}</div>`;const f=document.createElement("div");f.innerHTML=u,n.innerHTML=t;const y=document.getElementById(e);y.hidden=s,y.appendChild(f),y.appendChild(n),this.applyCss()}EnableEventHandlers(){const e=this.dlgParent.style.left,t=this.dlgParent.style.top;this.initLeft=parseInt(e.substring(0,e.length-2)),this.initTop=parseInt(t.substring(0,t.length-2)),console.log(`[EnableEventHandlers] ${this.dlgParent.id}::(${e},${t})::(${this.initLeft},${this.initTop})`);const s=document.getElementById(`${this.toolNameB0}`);s!==null&&(this.mover.onMoveDone=this.moverOnMoveDone,this.mover.attach(s,this.dlgParent));const n=document.getElementById(`${this.toolNameB1}`);n!==null&&(n.onclick=async()=>{if(this.dlgParent===void 0)return;const i=window.innerWidth,o=window.innerHeight,l=this.dlgParent.offsetWidth/2,a=Math.max(this.dlgParent.offsetWidth,this.dlg.offsetWidth),r=this.dlgParent.offsetHeight+this.dlg.offsetHeight;switch(this.cornerIndex=(this.cornerIndex+1)%4,this.cornerIndex){case 0:this.dlgParent.style.left=`${l}px`,this.dlgParent.style.top="0px";break;case 1:this.dlgParent.style.left=`${i-a+l}px`,this.dlgParent.style.top="0px";break;case 2:this.dlgParent.style.left=`${i-a+l}px`,this.dlgParent.style.top=`${o-r}px`;break;case 3:this.dlgParent.style.left=`${l}px`,this.dlgParent.style.top=`${o-r}px`;break}}),this.B2Type===He.CopyPaste&&(document.getElementById(`${this.toolNameB2}`).onclick=async()=>{if(this.dlgParent===void 0||this.onCopyPaste===void 0)return;if(this.isB2Allow()===!1){console.log(`[${this.dlgName}] not-allowed copy-paste`);return}const i=this.dlgParent,o=i.querySelectorAll(`.${this.toolNameB2}`),l=o.length>=1?o[0]:null,a=new A;if(a.IsEnabledElem(l)===!1)return;const r=new Array,c=new Be;c.key=Te.Copy,c.text="クリップボードへコピー",r.push(c);const m=new Be;m.key=Te.Paste,m.text="クリップボードからペースト",r.push(m);const p=new Be;p.key=Te.Cancel,p.text="キャンセル",r.push(p);const u=new Ps;u.setChoiceItems(r),a.EnableElem(l,!1);const f=a.GetRect(i);a.GetRect(this.dlg);const y=a.GetRect(l),d=this.dlg.className;u.setListener(`${d}-choice`,d,`${d}-B2`),u.applyCss(),u.show(`${parseInt(y.left)-parseInt(f.left)}`,"0"),u.enableEvents(async b=>{console.log(`[onSelect] ${b.callerName} ${b.result}`),u.dispose(),this.onCopyPaste(this.dlg,b.result),a.EnableElem(l,!0)})}),this.B3Type===Ye.MoveLowest&&(document.getElementById(`${this.toolNameB3}`).onclick=async()=>{if(this.dlgParent===void 0)return;new B().MoveLowestLayer(this.dlgParent)}),this.B4Type===Ae.DialogHide&&(document.getElementById(`${this.toolNameB4}`).onclick=async()=>{if(this.dlgParent===void 0)return;new A().setVisible(this.dlgParent.className,!1)}),this.B5Type===Xe.Help&&(document.getElementById(`${this.toolNameB5}`).onclick=async()=>{this.dlgParent!==void 0&&this.onHelp!==void 0&&await this.onHelp(this.dlg,this.B5Type)}),this.GType===Qe.Guide&&(document.getElementById(`${this.toolNameGuideOwn}`).onclick=async()=>{if(this.dlgParent!==void 0&&this.onGuide!==void 0){const o=this.dlgParent.querySelectorAll(`.${this.toolNameGuideOwn}`),l=o.length>=1?o[0]:null;l!==null&&await this.onGuide(this.dlg,this.GType,l)}})}EnableResize(){if(this.isIPad&&this.isTouchDevice()){console.log("EVONA: Touch device detected. Priority given to flick scrolling.");return}const e=`<button class="${this.handleNameB0}" id="${this.handleNameB0}" title="Resize">[」]</button>`,t=document.createElement("div");t.className=this.handleName,t.id=this.handleName,t.innerHTML=`${e}`,this.dlg.appendChild(t);const s=document.getElementById(`${this.handleName}`);s!==null&&(s.style.position="absolute",s.style.left=`${this.dlg.clientWidth-s.clientWidth}px`,s.style.top=`${this.dlg.clientHeight-s.clientHeight}px`,this.resizer.onResizeDone=this.resizerOnResizeDone,this.resizer.attach(s,this.dlg))}static GetDialogInfo(e){const t=this.FindDialogParent(e);if(t===null)return null;const s=t.querySelector("dialog");if(s===null)return null;const n=new ze,i=s.clientWidth,o=s.clientHeight;return n.name=e,n.left=t.style.left,n.top=t.style.top,n.width=`${i}px`,n.height=`${o}px`,n}static SetDialogInfo(e){const t=this.FindDialogParent(e.name);if(t===null)return!1;const s=t.querySelector("dialog");return s===null?!1:(t.style.left=e.left,t.style.top=e.top,s.style.width=e.width,s.style.height=e.height,!0)}static FindDialogParent(e){const t=document.getElementById(e);return t??null}get titleName(){return`${this.dlgName}-dlg-title-00`}get toolNameB0(){return`${this.dlgName}-dlg-tool-b0`}get toolNameB1(){return`${this.dlgName}-dlg-tool-b1`}get toolNameB2(){return`${this.dlgName}-dlg-tool-b2`}get toolNameB3(){return`${this.dlgName}-dlg-tool-b3`}get toolNameB4(){return`${this.dlgName}-dlg-tool-b4`}get toolNameB5(){return`${this.dlgName}-dlg-tool-b5`}get toolNameGuideOwn(){return`${this.dlgName}-dlg-tool-guide-own`}get toolNameGuideCtl(){return`${this.dlgName}-dlg-tool-guide-ctl`}get handleName(){return`${this.dlgName}-dlg-handle-00`}get handleNameB0(){return`${this.dlgName}-dlg-handle-b0`}applyCss(){const e=`${this.dlgName}-header-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
/* タイトルバー全体 */
.${this.titleName} {
    display: flex;
    align-items: center;
    justify-content: space-between; /* 左右に振り分け */
${L.titleColorText}
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
    background: #fbc02d; /* 共通のホバー色 */
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
`.trim(),document.head.appendChild(t)}setB2Allow(e=!0){const t=document.getElementById(`${this.toolNameB2}`);if(t===null)return;this.b2cursor===""&&(this.b2cursor=t.style.cursor);const s=e?this.b2cursor:"not-allowed";t.style.cursor=s}isB2Allow(){const e=document.getElementById(`${this.toolNameB2}`);return e===null?!1:e.style.cursor===this.b2cursor}}class ze{constructor(){this.name="",this.left="",this.top="",this.width="",this.height=""}copyTo(e){e.name=this.name,e.left=this.left,e.top=this.top,e.width=this.width,e.height=this.height}}class B{add(e){B.dlgElems.push(e)}AddDialogs(){B.dlgElems=new Array;const e=document.querySelectorAll("div");for(const t of e)t.style.zIndex!==""&&(parseInt(t.style.zIndex)>=B.ignoreIndex||t.querySelector("dialog")&&(console.log(`${t.id} added!`),this.add(t)))}AssignIndexies(){let e=B.dlgElems.length-1;for(const t of B.dlgElems)t.style.zIndex=`${e}`,e--}MoveLowestLayer(e){B.dlgElems.length;for(const t of B.dlgElems)if(t.id===e.id)t.style.zIndex="0";else{const s=t.style.zIndex;t.style.zIndex=`${parseInt(s)+1}`}}MoveHiestLayer(e){B.dlgElems.length;let t=-1;for(const s of B.dlgElems){const n=parseInt(s.style.zIndex);n>=B.ignoreIndex||n>t&&(t=n)}for(const s of B.dlgElems)if(s.id===e.id){s.style.zIndex=`${t}`;break}for(const s of B.dlgElems)if(s.id!==e.id){if(parseInt(s.style.zIndex)>=B.ignoreIndex)continue;t--,s.style.zIndex=`${t}`}}FindByName(e){const t=B.dlgElems.find(s=>s.id===e);return t||null}async ForEachAsync(e){for(const t of B.dlgElems)t.parentNode!==null&&await e(t.id)}ReOrder(){B.dlgElems.sort((e,t)=>{const s=e.style.zIndex,n=t.style.zIndex;if(s===""||n==="")throw new Error("z-index が未設定の要素が混入しています");return parseInt(t.style.zIndex)-parseInt(e.style.zIndex)})}async SaveSetting(e,t=!0){if(this.canSave&&e!==null&&e.parentElement!==null){if(t&&this.FindByName(e.parentElement.className)===null){console.log(`${e.className} is out of managed dlg`);return}await this.initSetting(),await B.setingAccess.saveDialogPos(e)}}async LoadAllSetting(){if(this.canSave){await this.initSetting();for(const e of B.dlgElems){const t=e.querySelector("dialog");t!==null&&await B.setingAccess.loadDialogPos(t)}}}async loadSetting(e){this.canSave&&(await this.initSetting(),e!==null&&await B.setingAccess.loadDialogPos(e))}async initSetting(){B.setingAccess===null&&(B.setingAccess=new ws,await B.setingAccess.init())}get canSave(){return!new A().isDemo}}B.ignoreIndex=1e3;B.setingAccess=null;class qs{constructor(){this.isDragging=!1,this.startX=0,this.startY=0}attach(e,t){e.onpointerdown=s=>{e.setPointerCapture(s.pointerId),this.isDragging=!0,this.startX=s.clientX-t.offsetLeft,this.startY=s.clientY-t.offsetTop,e.style.cursor="grabbing"},e.onpointermove=s=>{if(!this.isDragging)return;const n=s.clientX-this.startX,i=s.clientY-this.startY;t.style.left=`${n}px`,t.style.top=`${i}px`,t.style.margin="0"},e.onpointerup=async s=>{this.isDragging=!1,e.releasePointerCapture(s.pointerId),e.style.cursor="grab",this.onMoveDone!==void 0&&await this.onMoveDone()}}}class Ks{constructor(){this.isDragging=!1,this.startX=0,this.startY=0,this.startW=0,this.startH=0,this.handleX=0,this.handleY=0}attach(e,t){e.onpointerdown=s=>{e.setPointerCapture(s.pointerId),this.isDragging=!0,this.startX=s.clientX,this.startY=s.clientY;const n=t.getBoundingClientRect();console.log(`[${t.className}] (${n.left},${n.top}) - (${n.width},${n.height})`),this.startW=n.width,this.startH=n.height,this.handleX=e.offsetLeft,this.handleY=e.offsetTop,e.style.cursor="grabbing"},e.onpointermove=s=>{if(!this.isDragging)return;const n=s.clientX-this.startX,i=s.clientY-this.startY;t.style.width=`${this.startW+n-e.clientWidth}px`,t.style.height=`${this.startH+i-e.clientHeight}px`,e.style.left=`${this.handleX+n}px`,e.style.top=`${this.handleY+i}px`,e.style.margin="0"},e.onpointerup=async s=>{if(this.isDragging=!1,e.releasePointerCapture(s.pointerId),e.style.cursor="grab",this.onResizeDone!==void 0){const n=t.getBoundingClientRect();await this.onResizeDone(`${n.width-this.startW}`,`${n.height-this.startH}`)}}}}const F={None:"None",Ok:"Ok",OkCancel:"OkCancel",YesNo:"YesNo",YesNoCancel:"YesNoCancel"},Ke={None:"None",Ok:"Ok",Question:"Question"},H={None:"None",Ok:"Ok",Cancel:"Cancel",Yes:"Yes",No:"No",Secret:"Secret"};class Ce{constructor(){this.parentName="evona-msg-box",this.buttonType=F.Ok,this.iconType=Ke.None,this.title="Confirm",this.btnS="",this.SecretEnable=!1,this.btnAlign="right",this.btnOk="OK",this.btnCancel="Cancel",this.btnYes="Yes",this.btnNo="No",this.CheckVisible=!1,this.CheckText="",this.Checked=!1,this.Result=H.None,this.AuthVisible=!1,this.authText="",this.authTextMax=4,this.onS1Clicked=e=>{this.Result=H.Secret,this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB1Clicked=e=>{switch(this.buttonType){case F.None:this.Result=H.None;break;case F.Ok:this.Result=H.Ok;break;case F.OkCancel:this.Result=H.Ok;break;case F.YesNo:this.Result=H.Yes;break;case F.YesNoCancel:this.Result=H.Yes;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB2Clicked=e=>{switch(this.buttonType){case F.None:this.Result=H.None;break;case F.Ok:this.Result=H.None;break;case F.OkCancel:this.Result=H.Cancel;break;case F.YesNo:this.Result=H.No;break;case F.YesNoCancel:this.Result=H.No;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB3Clicked=e=>{switch(this.buttonType){case F.None:this.Result=H.None;break;case F.Ok:this.Result=H.None;break;case F.OkCancel:this.Result=H.Cancel;break;case F.YesNo:this.Result=H.No;break;case F.YesNoCancel:this.Result=H.Cancel;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onWindowKeyboard=e=>{e.key.length===1&&this.onAuthKeyProc(e.key)},this.onAuthButtonClicked=e=>{const t=e.target;t!==null&&this.onAuthKeyProc(t.textContent)}}get btnNameS(){return`${this.parentName}-s1`}get btnName1(){return`${this.parentName}-b1`}get btnName2(){return`${this.parentName}-b2`}get btnName3(){return`${this.parentName}-b3`}get chkName1(){return`${this.parentName}-chk1`}get authName1(){return`${this.parentName}-auth1`}get authBtnName(){return`${this.parentName}-authBtn`}setParent(e){this.parentName=`${e}-msg-box`}setTypes(e,t){this.buttonType=e,this.iconType=t}setOk(e=Ke.Ok){this.setTypes(F.Ok,e)}setOkCancel(e=Ke.Question){this.setTypes(F.OkCancel,e)}setYesNo(e=Ke.Question){this.setTypes(F.YesNo,e)}setYesNoCancel(e=Ke.Question){this.setTypes(F.YesNoCancel,e)}async showWait(e,t=null){return this.remove(),this.createUI(e,t===null?this.title:t,!0),new Promise(s=>{this.resolver=s;let n=!1,i=!1,o=!1;switch(this.buttonType){case F.None:break;case F.Ok:n=!0,i=!1,o=!1;break;case F.OkCancel:n=!0,i=!0,o=!1;break;case F.YesNo:n=!0,i=!0,o=!1;break;case F.YesNoCancel:n=!0,i=!0,o=!0;break}n&&document.getElementById(this.btnName1)?.addEventListener("click",this.onB1Clicked,{once:!0}),i&&document.getElementById(this.btnName2)?.addEventListener("click",this.onB2Clicked,{once:!0}),o&&document.getElementById(this.btnName3)?.addEventListener("click",this.onB3Clicked,{once:!0}),this.SecretEnable&&document.getElementById(this.btnNameS)?.addEventListener("click",this.onS1Clicked,{once:!0})})}onAuthKeyProc(e){if(this.authText.length<this.authTextMax&&/[a-zA-Z0-9]/.test(e)){this.authText+=e;const t=this.authText.length;let s="";for(let i=0;i<this.authTextMax;i++)i<t?s+="●":s+="○";const n=document.getElementById(this.authName1);n.innerText=s}if(this.authText.length>=this.authTextMax&&this.onAuthChecking!==void 0&&this.onAuthChecking(this.authText)){window.removeEventListener("keydown",this.onWindowKeyboard);for(let s=0;s<10;s++){const n=`${this.authBtnName}-b${s}`,i=document.querySelectorAll(`.${n}`);if(i.length!==1)continue;const o=i[0];o!==null&&o.removeEventListener("click",this.onAuthButtonClicked)}this.remove(),this.resolver&&this.resolver(this.Result)}}showNoWait(e,t="INFO"){this.remove(),this.createUI(e,t,!1)}showNoWaitEnd(){this.remove()}createUI(e,t,s){let n=`<button id="${this.btnNameS}" class="${this.btnNameS}">${this.btnS}</button>`,i="",o="",l="";switch(this.buttonType){case F.None:break;case F.Ok:i=`<button id="${this.btnName1}">${this.btnOk}</button>`,o="";break;case F.OkCancel:i=`<button id="${this.btnName1}">${this.btnOk}</button>`,o=`<button id="${this.btnName2}">${this.btnCancel}</button>`;break;case F.YesNo:i=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`;break;case F.YesNoCancel:i=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`,l=`<button id="${this.btnName3}">${this.btnCancel}</button>`;break}let a="";this.CheckVisible&&(a=`
<div style="padding: 5px 10px; font-size: 0.9em; text-align: left;">
    <label>
        <input type="checkbox" id="${this.chkName1}">${this.CheckText}
    </label>
</div>
`.trim());let r="";if(this.AuthVisible){let u="";for(let f=0;f<10;f++){const y=`${this.authBtnName}-b${f}`;u+=`<button class="${y}" id="${y}">${f}</button>`}r=`
<div style="padding: 5px 10px; font-size: 0.9em; text-align: left;">
    <label>
        <div class="${this.authName1}" id="${this.authName1}" tabindex="0">〇 〇 〇 〇</div>
    </label>
    ${u}
</div>
`.trim()}const c=`${a}${i}${o}${l}`,m=c!==""?`<div class="msg-footer">${c}</div>`:"",p=document.createElement("div");if(p.id=this.parentName,p.innerHTML=`
            <div class="msg-overlay">
                <div class="msg-panel">
                    <div class="msg-header">${t}${n}</div>
                    <div class="msg-body">${e}${r}</div>
                    ${m}
                </div>
            </div>
        `.trim(),this.applyCss(),document.body.appendChild(p),this.AuthVisible){document.getElementById(this.authName1).focus(),this.authText="",window.addEventListener("keydown",this.onWindowKeyboard);for(let f=0;f<10;f++){const y=`${this.authBtnName}-b${f}`,d=document.querySelectorAll(`.${y}`);if(d.length!==1)continue;const b=d[0];b!==null&&b.addEventListener("click",this.onAuthButtonClicked)}}}applyCss(){const e=`${this.parentName}-style`;if(document.getElementById(e))return;let t="";for(let n=0;n<10;n++){const i=`${this.authBtnName}-b${n}`;t+=`
#${this.parentName} .${i} {
width: 30px;
padding: 10px;
border: none;
border-radius: 9px 9px 9px 9px;
}
`.trim()}const s=document.createElement("style");s.id=e,s.textContent=`
#${this.parentName} .msg-overlay {
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex; justify-content: center; align-items: center;
    z-index: 10001; /* スプラッシュよりさらに上 */
}
#${this.parentName} .msg-panel {
    background: #fdfdfd; border: 2px solid #444; border-radius: 4px;
    min-width: 280px; max-width: 80%; box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    font-family: sans-serif; overflow: hidden;
}
#${this.parentName} .msg-header {
    background: linear-gradient(to bottom, #fff176, #fbc02d); /* Win風グラデ */
    color: #000000;
    padding: 6px 12px;
    font-size: 0.85rem;
    font-weight: bold;
    position: relative;
}
#${this.parentName} .msg-body {
    padding: 20px; color: #222; font-size: 1rem; line-height: 1.5; text-align: center;
}
#${this.parentName} .msg-footer {
    padding: 10px; border-top: 1px solid #eee; text-align: ${this.btnAlign};
}

#${this.parentName} button {
    padding: 6px 20px; cursor: pointer; border: 1px solid #888; background: #eee;
}
#${this.parentName} button:hover { background: #ddd; }

#${this.parentName} .${this.btnNameS} {
    position: absolute;
    width: 30px;  /* 少し大きくして押しやすくしましょう */
    height: 100%; /* ヘッダーの高さに合わせる */
    top: 0;
    right: 0;
    background: transparent;
    border: none;
    outline: none; /* フォーカス時の枠も消す */
    cursor: default;
    z-index: 10;   /* 手前に持ってくる */
    
    /* デバッグ用：一時的に red にすると場所がわかります */
    /* background: rgba(255, 0, 0, 0.3); */
}
/* マウスが乗った時（hover）の設定 */
#${this.parentName} .${this.btnNameS}:hover {
    background: transparent; /* ホバーしても透明なままにする！ */
    border: none;            /* 枠線も出さない */
    box-shadow: none;        /* 影も出さない */
}
/* クリックした瞬間（active）も念のため */
#${this.parentName} .${this.btnNameS}:active {
    background: transparent;
}
#${this.parentName} .${this.authName1} {
display: flex;
justify-content: center;
font-size: 20px;
}
${t}
`.trim(),document.head.appendChild(s)}setCheckResult(){const e=document.getElementById(this.chkName1);if(e!==null){const t=e.checked;this.Checked=t}}remove(){document.getElementById(this.btnName1)?.removeEventListener("click",this.onB1Clicked),document.getElementById(this.btnName2)?.removeEventListener("click",this.onB2Clicked),document.getElementById(this.btnName3)?.removeEventListener("click",this.onB3Clicked),document.getElementById(this.btnNameS)?.removeEventListener("click",this.onS1Clicked),document.getElementById(this.parentName)?.remove()}}class Ws{constructor(){this.intervalMs=1e3,this.isOneShot=!0,this.intervalTimer=null}start(e,t){this.intervalTimer!==null&&this.clear(),this.intervalTimer=setTimeout(async()=>{t!==void 0&&(await t(e)||this.clear()),this.isOneShot===!0&&this.clear()},this.intervalMs)}clear(){clearTimeout(this.intervalTimer),this.intervalTimer=null}}const ae={Resource:"Resource",ScoreUI:"ScoreUI",GameUI:"GameUI"},Ve={Sequence:"Sequence",Text:"Text"};class Xt{constructor(){this.key="",this.text=""}static copy(e,t){t.key=e.key,t.text=e.text}}class kt extends Xt{constructor(){super(...arguments),this.comment=""}static copy(e,t){t.key=e.key,t.text=e.text,t.comment=e.comment}}class It extends Xt{constructor(){super(...arguments),this.selectType=Ve.Sequence,this.start="",this.end="",this.step="",this.keyValue=""}static copy(e,t){t.key=e.key,t.text=e.text,t.selectType=e.selectType,t.start=e.start,t.end=e.end,t.step=e.step,t.keyValue=e.keyValue}get isScoreAvail(){if(this.key.trim().length===0||this.text.trim().length===0)return!1;if(this.selectType===Ve.Sequence){if(this.start.trim().length===0||this.end.trim().length===0||this.step.trim().length===0)return!1}else if(this.keyValue.trim().length===0)return!1;return!0}}class Et extends Xt{constructor(){super(...arguments),this.formation="",this.nsEnable=!1,this.nsCombo="",this.nsScore="",this.gameEnable=!1,this.gameCombo="",this.gameScore=""}static copy(e,t){t.key=e.key,t.text=e.text,t.formation=e.formation,t.nsEnable=`${e.nsEnable}`!="",t.nsCombo=e.nsCombo,t.nsScore=e.nsScore,t.gameEnable=`${e.gameEnable}`!="",t.gameCombo=e.gameCombo,t.gameScore=e.gameScore}get nsComboAvail(){return this.nsEnable===!1||this.nsCombo.trim().length===0||this.nsScore.trim().length===0?0:parseInt(this.nsCombo.trim())}get gameComboAvail(){return this.gameEnable===!1||this.gameCombo.trim().length===0||this.gameScore.trim().length===0?0:parseInt(this.gameCombo.trim())}get nsComboScoreList(){let e=this.nsComboAvail;return e===0?new Map:this.toScoreMap(this.nsScore,e)}get gameComboScoreList(){let e=this.gameComboAvail;return e===0?new Map:this.toScoreMap(this.gameScore,e)}toScoreMap(e,t){const s=new Map,n=e.split(",");if(n.length===0)return s;for(const i of n){if(i.trim().length===0)continue;const o=parseInt(i);s.set(t,o),t++}return s}}function js(){const h=(e,t)=>{const s=e;for(const n of s.inst){const i=new kt;kt.copy(n,i);const o=new at;o.resItem=i,o.owner=t,t.itemList.push(o)}};return{gameType:Y.none,editorType:ae.Resource,logType:$e.ResourceEditAction,fromJsonText:Gt.fromJsonText,logToItem:h}}function Es(){const h=(e,t)=>{const s=e;for(const n of s.inst){const i=new Et;Et.copy(n,i);const o=new at;o.gameItem=i,o.owner=t,t.itemList.push(o)}};return{gameType:Y.none,editorType:ae.GameUI,logType:$e.GameEditAction,fromJsonText:Vt.fromJsonText,logToItem:h}}function Ys(h){const e=(t,s)=>{const n=t;if(n.gameType===h)for(const i of n.inst){const o=new It;It.copy(i,o);const l=new at;l.scItem=o,l.owner=s,s.itemList.push(l)}};return{gameType:h,editorType:ae.ScoreUI,logType:$e.ScoreEditAction,fromJsonText:zt.fromJsonText,logToItem:e}}class at{constructor(){this.resItem=new kt,this.gameItem=new Et,this.scItem=new It}}class Qt{constructor(){this.gameType=Y.none,this.itemList=new Array,this.initNumItems=10}setConfig(e){e!==void 0&&(this.editorConfig=e,this.gameType=e.gameType)}async loadGameConfig(e){this.setConfig(Es()),await this.load(ae.GameUI,e);const t=this.itemList.filter(s=>s.gameItem.key===e);if(t.length!==0&&t[0].gameItem.key===e)return t[0].gameItem}setDefaultGameConfig(){this.init(),this.setDefaultGameConfigPq(),this.setDefaultGameConfigMm()}setDefaultGameConfigPq(){this.itemList[0].gameItem.key=Y.classPq,this.itemList[0].gameItem.text="ぷよクエ",this.itemList[0].gameItem.formation="5"}setDefaultGameConfigMm(){this.itemList[1].gameItem.key=Y.classMM,this.itemList[1].gameItem.text="メメントモリ",this.itemList[1].gameItem.formation="5"}init(){this.itemList=new Array;for(let e=0;e<this.initNumItems;e++){const t=new at;t.owner=this,this.itemList.push(t)}}async load(e,t){const s=this.getEditor(e);if(s===void 0)return;const n=s.logType,o=await(await Se()).get(n);if(o===null){e===ae.GameUI&&this.setDefaultGameConfig();return}const l=n,a=new Map,r=new Array;this.usingLog(l,o,a,r),this.itemList=new Array;for(const[c,m]of a){const p=s.fromJsonText(m.log);s.logToItem(p,this)}this.itemList.length===0&&this.init(),e===ae.GameUI&&(this.itemList[0].gameItem.key.length===0&&this.setDefaultGameConfigPq(),this.itemList[1].gameItem.key.length===0&&this.setDefaultGameConfigMm())}async loadUnused(e){const s=await(await Se()).get(e);if(s===null)return null;const n=new Map,i=new Array;return this.usingLog(e,s,n,i),i}usingLog(e,t,s,n){if(this.editorConfig!==void 0)for(const i of t){let l=this.editorConfig.fromJsonText(i.log).logType,a=!1,r=!1;switch(l){case Ie.None:break;case Ie.Add:a=!0;break;case Ie.Update:a=!0;break;case Ie.Delete:a=!0,r=!0;break}if(a)if(r){if(s.has(e)){const c=s.get(e);n.push(c),s.delete(e)}}else{if(s.has(e)){const c=s.get(e);n.push(c),s.delete(e)}s.set(e,i)}}}getEditor(e){return this.editorConfig}get editorType(){return this.editorConfig?.editorType}}class _t{constructor(){this.gameType=Y.none}}function Xs(){function h(){return`${n()}-key`}function e(){return`${n()}-text`}function t(){return`${n()}-comment`}function s(){return`${n()}-delete`}function n(){return`${ae.Resource}-edit-table-row`}const i=(u,f,y,d)=>{const b=new _;b.value=f.resItem.key,b.placeholder="キー",d.getCell(u,y).typeInfo.setInput(b),d.getCell(u,y).className=h(),d.getCell(u,y).typeInfo.using.itemId=y+d.firstRowIndex},o=(u,f,y,d)=>{const b=new _;b.value=f.resItem.text,b.placeholder="文字列",d.getCell(u,y).typeInfo.setInput(b),d.getCell(u,y).className=e(),d.getCell(u,y).typeInfo.using.itemId=y+d.firstRowIndex},l=(u,f,y,d)=>{const b=new _;b.value=f.resItem.comment,b.placeholder="コメント",d.getCell(u,y).typeInfo.setInput(b),d.getCell(u,y).className=t(),d.getCell(u,y).typeInfo.using.itemId=y+d.firstRowIndex},a=(u,f,y,d)=>{d.getCell(u,y).typeInfo.setButton("削除"),d.getCell(u,y).className=s(),d.getCell(u,y).typeInfo.using.itemId=y+d.firstRowIndex},r=async(u,f,y)=>{const d=new Gt;d.logType=Ie.Add;for(const I of y){const $=new kt;for(const g of I.cells)for(const T of g.children){if(T.className===s())continue;const C=f.getElemValue(T)||"";switch(T.className){case h():$.key=C;break;case e():$.text=C;break;case t():$.comment=C;break}}d.inst.push($)}const b=Gt.toJsonText(d);await(await Se()).put($e.ResourceEditAction,b)},c=async(u,f)=>{switch(console.log(`classify = ${u.classify} targetId = ${u.targetId}`),u.classify){case s():const y=new Ce;y.setParent(f.dlgCssClassName());let d=H.None;switch(y.setYesNo(),d=await y.showWait(`${u.targetId} を削除しますか？`),d){case H.Yes:break;case H.No:return;case H.Cancel:return}const b=parseInt(u.targetId);b>=1&&(f.table.deleteRow(b),f.table.redimAllRows(),f.itemList.splice(b-f.table.firstRowIndex,1));break}};function m(){return`
.${h()} {
height: 90%;
}
.${e()} {
height: 90%;
}
.${t()} {
height: 90%;
}
.${s()} {
${$s()}
}
`.trim()}const p=new _t;return p.editItems=[{className:h(),colConfig:i},{className:e(),colConfig:o},{className:t(),colConfig:l},{className:s(),colConfig:a}],p.makeLog=r,p.onSelect=c,p.getCssText=m,p}function Qs(){function h(){return`${a()}-key`}function e(){return`${a()}-text`}function t(){return`${a()}-select-type`}function s(){return`${a()}-seq-type-start`}function n(){return`${a()}-seq-type-end`}function i(){return`${a()}-seq-type-step`}function o(){return`${a()}-text-type`}function l(){return`${a()}-delete`}function a(){return`${ae.ScoreUI}-edit-table`}function r(){return`
.${h()} {
height: 90%;
}
.${e()} {
height: 90%;
}
.${t()} {
height: 106%;
}
.${s()} {
width: 60px;
height: 90%;
}
.${n()} {
width: 60px;
height: 90%;
}
.${i()} {
width: 60px;
height: 90%;
}
.${o()} {
height: 90%;
}
.${l()} {
${$s()}
}
`.trim()}const c=(g,T,C,N)=>{const w=new _;w.value=T.scItem.key,w.placeholder="キー",N.getCell(g,C).typeInfo.setInput(w),N.getCell(g,C).className=h(),N.getCell(g,C).typeInfo.using.itemId=C+N.firstRowIndex},m=(g,T,C,N)=>{const w=new _;w.value=T.scItem.text,w.placeholder="文字列",N.getCell(g,C).typeInfo.setInput(w),N.getCell(g,C).className=e(),N.getCell(g,C).typeInfo.using.itemId=C+N.firstRowIndex},p=(g,T,C,N)=>{const w=new nt;w.selectionPair=[`連続/${Ve.Sequence}`,`文字列/${Ve.Text}`],w.selectedItem=T.scItem.selectType,w.classify="selectType",N.getCell(g,C).typeInfo.setCombo(w),N.getCell(g,C).className=t(),N.getCell(g,C).typeInfo.using.itemId=C+N.firstRowIndex},u=(g,T,C,N)=>{const w=new _;w.value=T.scItem.start,w.placeholder="開始",w.disableKeyDown=!0,w.enableClicked=!0,N.getCell(g,C).typeInfo.setInput(w),N.getCell(g,C).className=s(),N.getCell(g,C).typeInfo.using.itemId=C+N.firstRowIndex},f=(g,T,C,N)=>{const w=new _;w.value=T.scItem.end,w.placeholder="終了",w.disableKeyDown=!0,w.enableClicked=!0,N.getCell(g,C).typeInfo.setInput(w),N.getCell(g,C).className=n(),N.getCell(g,C).typeInfo.using.itemId=C+N.firstRowIndex},y=(g,T,C,N)=>{const w=new _;w.value=T.scItem.step,w.placeholder="ステップ",w.disableKeyDown=!0,w.enableClicked=!0,N.getCell(g,C).typeInfo.setInput(w),N.getCell(g,C).className=i(),N.getCell(g,C).typeInfo.using.itemId=C+N.firstRowIndex},d=(g,T,C,N)=>{const w=new _;w.value=T.scItem.keyValue,w.placeholder="key/valueを&quot;,&quot;で区切った文字列",w.disableKeyDown=!0,w.enableClicked=!0,N.getCell(g,C).typeInfo.setInput(w),N.getCell(g,C).className=o(),N.getCell(g,C).typeInfo.using.itemId=C+N.firstRowIndex},b=(g,T,C,N)=>{N.getCell(g,C).typeInfo.setButton("削除"),N.getCell(g,C).className=l(),N.getCell(g,C).typeInfo.using.itemId=C+N.firstRowIndex},E=async(g,T,C)=>{const N=new zt;N.logType=Ie.Add,N.gameType=g;for(const ne of C){const X=new It;for(const J of ne.cells)for(const ce of J.children){if(ce.className===l())continue;const Z=T.getElemValue(ce)||"";switch(ce.className){case h():X.key=Z;break;case e():X.text=Z;break;case t():X.selectType=Z;break;case s():X.start=Z;break;case n():X.end=Z;break;case i():X.step=Z;break;case o():X.keyValue=Z;break}}N.inst.push(X)}const w=zt.toJsonText(N);await(await Se()).put($e.ScoreEditAction,w)},I=async(g,T)=>{switch(console.log(`classify = ${g.classify} targetId = ${g.targetId}`),g.classify){case h():await T.showUpDn(g,Zs());break;case s():await T.showUpDn(g,Dt());break;case n():await T.showUpDn(g,Dt());break;case i():await T.showUpDn(g,Dt());break;case o():await T.showMiniTableEditor(g,oe.KeyValue,Ue.asNumber,"スコアキー","スコア値");break;case l():const C=new Ce;C.setParent(T.dlgCssClassName());let N=H.None;switch(C.setYesNo(),N=await C.showWait(`${g.targetId} を削除しますか？`),N){case H.Yes:break;case H.No:return;case H.Cancel:return}const w=parseInt(g.targetId);w>=1&&(T.table.deleteRow(w),T.table.redimAllRows(),T.itemList.splice(w-T.table.firstRowIndex,1));break}},$=new _t;return $.editItems=[{className:h(),colConfig:c},{className:e(),colConfig:m},{className:t(),colConfig:p},{className:s(),colConfig:u},{className:n(),colConfig:f},{className:i(),colConfig:y},{className:o(),colConfig:d},{className:l(),colConfig:b}],$.makeLog=E,$.onSelect=I,$.getCssText=r,$}function _s(){function h(){return`${a()}-name`}function e(){return`${a()}-form`}function t(){return`${a()}-ns-enable`}function s(){return`${a()}-ns-combo`}function n(){return`${a()}-ns-score`}function i(){return`${a()}-game-enable`}function o(){return`${a()}-game-combo`}function l(){return`${a()}-game-score`}function a(){return`${ae.GameUI}-edit-table`}const r=(g,T,C,N)=>{const w=new _;w.value=T.gameItem.text,w.placeholder="ゲーム名",N.getCell(g,C).typeInfo.setInput(w),N.getCell(g,C).className=h(),N.getCell(g,C).typeInfo.using.itemId=C+N.firstRowIndex},c=(g,T,C,N)=>{const w=new _;w.value=T.gameItem.formation,w.placeholder="編成数",w.disableKeyDown=!0,w.enableClicked=!0,N.getCell(g,C).typeInfo.setInput(w),N.getCell(g,C).className=e(),N.getCell(g,C).typeInfo.using.itemId=C+N.firstRowIndex},m=(g,T,C,N)=>{const w=new Ut;w.value=T.gameItem.nsEnable,w.placeholder="NS有効",N.getCell(g,C).typeInfo.setCheck(w),N.getCell(g,C).className=t(),N.getCell(g,C).typeInfo.using.itemId=C+N.firstRowIndex,N.getCell(g,C).typeInfo.toolTip="N<br>S"},p=(g,T,C,N)=>{const w=new _;w.value=T.gameItem.nsCombo,w.placeholder="コンボ数",w.disableKeyDown=!0,w.enableClicked=!0,N.getCell(g,C).typeInfo.setInput(w),N.getCell(g,C).className=s(),N.getCell(g,C).typeInfo.using.itemId=C+N.firstRowIndex,N.getCell(g,C).typeInfo.toolTip="NSコンボ数"},u=(g,T,C,N)=>{const w=new _;w.value=T.gameItem.nsScore,w.placeholder="NSコンボ加点",w.disableKeyDown=!0,w.enableClicked=!0,N.getCell(g,C).typeInfo.setInput(w),N.getCell(g,C).className=n(),N.getCell(g,C).typeInfo.using.itemId=C+N.firstRowIndex,N.getCell(g,C).typeInfo.toolTip=`NSコンボ加点
(コンボ数毎の加点を,で区切って入力)`},f=(g,T,C,N)=>{const w=new Ut;w.value=T.gameItem.gameEnable,w.placeholder="GM有効",N.getCell(g,C).typeInfo.setCheck(w),N.getCell(g,C).className=i(),N.getCell(g,C).typeInfo.using.itemId=C+N.firstRowIndex,N.getCell(g,C).typeInfo.toolTip="G<br>M"},y=(g,T,C,N)=>{const w=new _;w.value=T.gameItem.gameCombo,w.placeholder="コンボ数",w.disableKeyDown=!0,w.enableClicked=!0,N.getCell(g,C).typeInfo.setInput(w),N.getCell(g,C).className=o(),N.getCell(g,C).typeInfo.using.itemId=C+N.firstRowIndex,N.getCell(g,C).typeInfo.toolTip="GMコンボ数"},d=(g,T,C,N)=>{const w=new _;w.value=T.gameItem.gameScore,w.placeholder="GMコンボ加点",w.disableKeyDown=!0,w.enableClicked=!0,N.getCell(g,C).typeInfo.setInput(w),N.getCell(g,C).className=l(),N.getCell(g,C).typeInfo.using.itemId=C+N.firstRowIndex,N.getCell(g,C).typeInfo.toolTip=`GMコンボ加点
(コンボ数毎の加点を,で区切って入力)`},b=async(g,T,C)=>{const N=new Vt;N.logType=Ie.Add;let w=0;for(const X of C){const J=new Et;for(const ce of X.cells)for(const Z of ce.children){const Q=T.getElemValue(Z)||"";switch(T.findInputElem(Z).className){case h():J.text=Q;break;case e():J.formation=Q;break;case t():J.nsEnable=Q;break;case s():J.nsCombo=Q;break;case n():J.nsScore=Q;break;case i():J.gameEnable=Q;break;case o():J.gameCombo=Q;break;case l():J.gameScore=Q;break}}switch(w){case 0:J.key=Y.classPq;break;case 1:J.key=Y.classMM;break}w++,console.log(J),N.inst.push(J)}const D=Vt.toJsonText(N);await(await Se()).put($e.GameEditAction,D)},E=async(g,T)=>{switch(console.log(`classify = ${g.classify} targetId = ${g.targetId}`),g.classify){case e():await T.showNumpad(g,1);break;case s():await T.showNumpad(g,1);break;case n():await T.showMiniTableEditor(g,oe.Text,Ue.asNumber,"","NSコンボ加点");break;case o():await T.showNumpad(g,1);break;case l():await T.showMiniTableEditor(g,oe.Text,Ue.asNumber,"","ゲームコンボ加点");break}};function I(){const g=`${t()}`,T=`${i()}`;return`
.${h()} {
height: 90%;
width: 100px;
}
.${e()} {
height: 90%;
width: 40px;
}

.${g} {
height: 90%;
}
${L.sliderText(g,"65")}
.${s()} {
height: 90%;
width: 40px;
}
.${n()} {
height: 90%;
width: 100px;
}

.${T} {
height: 90%;
}
${L.sliderText(T,"65")}
.${o()} {
height: 90%;
width: 40px;
}
.${l()} {
height: 90%;
width: 100px;
}
`.trim()}const $=new _t;return $.editItems=[{className:h(),colConfig:r},{className:e(),colConfig:c},{className:t(),colConfig:m},{className:s(),colConfig:p},{className:n(),colConfig:u},{className:i(),colConfig:f},{className:o(),colConfig:y},{className:l(),colConfig:d}],$.makeLog=b,$.onSelect=E,$.getCssText=I,$}function $s(){return`
width: 100%;
height: 100%;
white-space: nowrap;
background: #e91e63; /* ピンクがかった赤（ポップな警告色） */
color: white;
border-radius: 4px;
padding: 4px 12px;
`.trim()}function Zs(){const h=Object.values(v),e=new Array;for(const t of h){const s=t;e.push(`${s}/${s}`)}return e}function Dt(){const h=new Array;h.push("1/1");for(let e=1;e<=30;e++){const t=`${e*10}`;h.push(`${t}/${t}`)}return h}class Ft extends Qt{constructor(){super(...arguments),this.uiInfo=new ze,this.canAdd=!0,this.parentName="",this.saveTimer=null,this.onAutoSave=async e=>(console.log(`${e.parentName}`),!1),this.updn=null,this.numpad=null,this.miniEdit=null,this.numTableFooterName="numTableFooter",this.onOkClickNumTable=async e=>{if(this.miniEdit!==null){const t=this.miniEdit.editedResult();if(t!==void 0){const s=this.table.getCallerCellElem(this.miniEdit.callerName);if(s!==null){const n=s;n.value=t}}}this.closeNumTable()},this.onCancelClickNumTable=async e=>{this.closeNumTable()},this.isEnableWindowEvent=!1,this.onWindowKeyboard=e=>{e.key===je.Escape&&this.isEnableWindowEvent&&(this.disableWindowEvent(),this.closeUpDn(),this.closeNumpad())},this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new B().SaveSetting(e),this.requestActivate!==void 0&&await this.requestActivate(e)},this.resizerOnResizeDone=async(e,t,s)=>{console.log(`[${e.className}] resized (${t}, ${s})`);const n=parseInt(s),i=document.getElementById(this.dlgContentCssClassName());if(i!==null){i.style.width===""?i.offsetWidth:parseInt(i.style.width),i.style.maxWidth="none";const o=i.style.height===""?i.offsetHeight:parseInt(i.style.height);i.style.maxHeight="none",i.style.height=`${o+n}px`;const l=i.querySelectorAll(`.${this.tableCssClassName()}`);if(l!==null){const a=l[0],r=a.style.height===""?a.offsetHeight:parseInt(a.style.height);a.style.maxHeight="none",a.style.height=`${r+n}px`}}},this.onCopyPaste=async(e,t)=>{switch(console.log(`[${e.className}] selected [${t}]`),t){case Te.Copy:await this.table.toClipboard();break;case Te.Paste:await this.table.fromClipboard();break}}}async startAutoSave(){this.saveTimer=new Ws,this.saveTimer.intervalMs=1e3,this.saveTimer.isOneShot=!1,this.saveTimer.start(this,this.onAutoSave)}setRow(e,t,s){const n=this.config.editItems;if(n===void 0)return;let i=-1;for(const o of n)i++,o.colConfig(i,e,t,s)}toHTML(e){if(!this.itemList)return"";e.gameType=this.gameType,this.config=e;const s=e.editItems.length,n=new W;if(this.itemList.length>=1)n.makeDim(s,this.itemList.length),this.itemList.forEach((a,r)=>{this.setRow(a,r,n)}),n.makeRowTemplate(this.tableRowCssClassName()),this.table=n;else{n.makeDim(s,1);const a=new at;this.setRow(a,0,n),n.makeRowTemplate(this.tableRowCssClassName()),n.clearRows(),this.table=n}const i=this.tableCssClassName(),o=this.table.ToScrollHTML(i,i);this.htmlMaker=new A;const l=new te;return l.props.name="",l.props.id=i,l.props.className=i,l.props.option.setTable(o),l.props.option.onSelect=async a=>{console.log(`classify = ${a.classify} targetId = ${a.targetId}`),this.config.onSelect(a,this)},this.htmlMaker.add(l),this.htmlMaker.ToHTML()}checkValidStatus(e){return Object.values(v).find(n=>e)!==void 0}async showUpDn(e,t){if(e.KeyEnter===fe.Special||e.eventType===De.Click){if(this.updn!==null)return;const n=this.table.getScrollCellRect(e.parentElem),i=this.table.makeCallerName(e.classify,e.targetId),o=this.table.getCallerCellElem(i);let l="";o!==null&&(l=o.value);const a=new Rs;a.setListener("updn",this.dlgContentCssClassName(),i),a.setSelectedByValue(l,t),a.applyCss(),a.show(n.left,n.top),a.enableEvents(r=>{console.log(`[onApply] ${r.callerName} ${r.result}`);const c=this.table.getCallerCellElem(r.callerName);if(c!==null){const m=c;m.value=r.result}this.closeUpDn()},r=>{console.log(`[onUp] ${r.callerName} ${r.result}`)},r=>{console.log(`[onDown] ${r.callerName} ${r.result}`)}),this.enableWindowEvent(),this.updn=a}}closeUpDn(){this.disableWindowEvent(),this.updn!==null&&(this.updn.dispose(),this.updn=null)}async showNumpad(e,t){if(e.KeyEnter===fe.Special||e.eventType===De.Click){if(this.numpad!==null)return;const n=this.table.getScrollCellRect(e.parentElem),i=this.table.makeCallerName(e.classify,e.targetId),o=this.table.getCallerCellElem(i);let l="";o!==null&&(l=o.value);const a=new Ts;a.setNum(l),a.maxDig=t,a.setListener("numpad",this.dlgContentCssClassName(),i),a.applyCss(),a.show(n.left,n.top),a.enableEvents(r=>{console.log(`[onApply] ${r.callerName} ${r.result}`);const c=this.table.getCallerCellElem(r.callerName);if(c!==null){const m=c;m.value=r.result}this.closeNumpad()}),this.enableWindowEvent(),this.numpad=a,this.setB2Allow(!1)}}closeNumpad(){this.disableWindowEvent(),this.setB2Allow(!0),this.numpad!==null&&(this.numpad.dispose(),this.numpad=null)}async showMiniTableEditor(e,t,s,n,i){if(e.KeyEnter===fe.Special||e.eventType===De.Click){if(this.miniEdit!==null)return;const l=this.table.getScrollCellRect(e.parentElem),a=this.table.makeCallerName(e.classify,e.targetId),r=this.table.getCallerCellElem(a);let c="";r!==null&&(c=r.value);const m=`${a}-numTable`,p=`${this.numTableFooterName}-${a}`,u=new Us;if(t===oe.KeyValue?u.setKeyValuePairs(c):u.setTexts(c),u.setValueType(5,s),u.keyToolTip=n,u.valueToolTip=i,u.setListener(m,this.dlgContentCssClassName(),a,"",p),u.applyCss(),u.show(l.left,l.top),u.enableEvents(f=>{console.log(`[onApply] ${f.callerName} ${f.result}`)}),this.miniEdit=u,this.miniEdit.footerElem!==null){let f=`
<button id="${p}-okBtn">OK</button>
<button id="${p}-canBtn">CANCEL</button>
`.trim();this.miniEdit.footerElem.innerHTML=f,document.getElementById(`${p}-okBtn`).onclick=this.onOkClickNumTable,document.getElementById(`${p}-canBtn`).onclick=this.onCancelClickNumTable}this.enableWindowEvent(),this.setB2Allow(!1)}}closeNumTable(){this.disableWindowEvent(),this.setB2Allow(!0),this.miniEdit!==null&&(this.miniEdit.dispose(),this.miniEdit=null)}createEditorBox(e,t,s){this.parentName=t;let n="";this.canAdd&&(n=`<button id="${this.rowAddCssClassName()}">追加</button>`);const i=this.htmlMaker.MakeDefaultButtonsHTML(`
${n}
<button id="${this.applyCssClassName()}">保存</button>
`),o=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
   ${i}
   ${s}
</div>`,l=new ye;l.title="<"+e+">",l.SetB2Type(He.CopyPaste,this.onCopyPaste),l.SetB4Type(Ae.DialogHide);const a=l.NewDialog(t,this.dlgCssClassName());return l.SetContent(t,o,!1),this.applyCss(),l.EnableEventHandlers(),l.onMoveDone=this.moverOnMoveDone,this.dialogDesc=l,a}addEventHandlers(e){const t=document.getElementById(this.rowAddCssClassName());t!==null&&(t.onclick=async()=>{if(await this.confirmMsgBox("行を追加しますか？")===!1)return;const n=this.tableRowCssClassName();this.table.addRow(n)}),document.getElementById(this.applyCssClassName()).onclick=async()=>{if(await this.confirmMsgBox("保存しますか？")===!1)return;const n=this.table.getRowElems();n!==null&&(await this.config.makeLog(this.config.gameType,this.table,n),this.onSaved!==void 0&&await this.onSaved(this))}}enableWindowEvent(){return this.isEnableWindowEvent?!1:(this.isEnableWindowEvent=!0,window.addEventListener("keydown",this.onWindowKeyboard),!0)}disableWindowEvent(){return this.isEnableWindowEvent?(window.removeEventListener("keydown",this.onWindowKeyboard),this.isEnableWindowEvent=!1,!0):!1}addItemEventHandlers(){this.htmlMaker.enableTableEvents(this.tableCssClassName())}enableResize(){this.dialogDesc.onResizeDone=this.resizerOnResizeDone,this.dialogDesc.EnableResize()}setB2Allow(e=!0){this.dialogDesc.setB2Allow(e)}async confirmMsgBox(e){const t=new Ce;t.setParent(this.dlgCssClassName());let s=H.None;switch(t.setYesNo(),s=await t.showWait(e),s){case H.Yes:break;case H.No:return!1;case H.Cancel:return!1}return!0}rowAddCssClassName(){return`${this.editorType}-edit-add`}applyCssClassName(){return`${this.editorType}-edit-apply`}tableRowCssClassName(){return`${this.editorType}-edit-table-row`}tableCssClassName(){return`${this.editorType}-edit-table`}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return`${this.editorType}-edit-dlg`}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=this.uiInfo.height!==""?parseInt(this.uiInfo.height):400,n=this.tableCssClassName(),i=document.createElement("style");i.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,e,t)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgContentCssClassName()} {
width: 100%;
max-width: 640px;
margin: 0 0;    /*左上位置固定*/
}
${this.table.MakeTableScrollCss(n,s,!0)}
.${n} {
${L.spacingTable}
}
.${n} tr {
${L.spacingTr}
}
${this.config.getCssText()}
${this.htmlMaker.MakeDefaultButtonsCss()}

/*ミニエディタのボタン*/
[class^="${this.numTableFooterName}"] {
${L.footerText()}
}
[class^="${this.numTableFooterName}"] button {
${L.footerButtonText()}
}
`.trim(),document.head.appendChild(i);const o=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,o)}}const Ie={None:"None",Add:"Add",Delete:"Delete",Update:"Update"};class Zt{constructor(){this.logType=Ie.None}}class Gt extends Zt{constructor(){super(...arguments),this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class Vt extends Zt{constructor(){super(...arguments),this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class zt extends Zt{constructor(){super(...arguments),this.gameType=Y.none,this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class en{constructor(){this.channel="defaultChannel",this.started=!1,this.onMessage=e=>{console.log(e),this.receiveEventArg=e,this.onNotify!==void 0&&this.onNotify(this)}}Start(){return this.started?!1:(this.bc=new BroadcastChannel(this.channel),this.bc.onmessage=this.onMessage,this.started=!0,!0)}Stop(){this.started&&this.bc.close(),this.started=!1}notifyBool(e){this.started&&this.bc.postMessage(`${e}`)}get receivedBool(){return this.receiveEventArg===void 0||this.receiveEventArg.data===void 0?null:this.receiveEventArg.data==="true"}}const ue={None:"None",Full:"Full",Limit:"Limit",NotRun:"NotRun"},et={Undef:"Undef",True:"True",False:"False"},Pe={Undef:"Undef",Qiita:"Qiita",Line:"Line"};class rt{constructor(){this.imageRepository="https://puyon7676.github.io/GameImages/",this.imageHome="./Image/",this.user1Home="./User1/",this.user2Home="./User2/",this.currentUserHome="",this.appHref="",this.isLocal=!1,this.admin=!1,this.cmd="",this.edit=Y.none,this.evonaType=ue.None,this.aslocal=et.Undef,this.coming=Pe.Undef,this.dataBasePath="../キャラパースデータ",this.statusJsonPath="",this.zipPrefix="",this.chListFile="",this.chStatusListFile="",this.charStatusZip="./CharStatus.zip",this.nodeToolsImportFilename="./nodeTools.js",this.bc=new en,this.onNotifyBcHelper=async e=>{console.log("onNotifyBcHelper"),this.onGameConfigChanged!==void 0&&await this.onGameConfigChanged(e)}}setImageHome(e){if(this.isLocal=e,e)this.imageHome=`${this.currentUserHome}Image/`;else{let t=this.currentUserHome;this.currentUserHome.substring(0,2)==="./"&&(t=this.currentUserHome.substring(2)),this.imageHome=`${this.imageRepository}${t}`}}setUser(e){this.currentUserHome=e}setPath(){this.currentUserHome===this.user1Home&&(this.statusJsonPath=`${this.dataBasePath}/ぷよクエ_詳細JSON`,this.zipPrefix="puyoQue_",this.chListFile=`${this.currentUserHome}chListFile_puyo.json`,this.chStatusListFile=`${this.currentUserHome}puyoQue_CharStatus.zip`),this.currentUserHome===this.user2Home&&(this.statusJsonPath=`${this.dataBasePath}/メメントモリ_詳細JSON`,this.zipPrefix="memeMori_",this.chListFile=`${this.currentUserHome}chListFile_meme.json`,this.chStatusListFile=`${this.currentUserHome}memeMori_CharStatus.zip`)}get gameType(){return this.currentUserHome===this.user1Home,Y.classPq}get gameTitle(){return this.edit!==Y.none?`エディタ(${this.edit})`:this.gameType===Y.classPq?"ぷよクエ":"メメントモリ"}setBrowserTitle(){const e=this.gameTitle;document.head.title=e;for(const t of document.head.children)t.nodeName==="TITLE"&&(t.innerHTML=`EvoNa：${e} モード`);return e}get editorURL(){return`${this.appHref}?edit=${this.gameType}`}get isWebRunning(){return!(typeof document>"u")}parseURLParams(){if(!this.isWebRunning){console.log("cannot parse URL params!");return}const e=new URLSearchParams(window.location.search);for(const[t,s]of e)switch(t.trim()){case"user":const n=s.trim();this.setUser(n==="1"?this.user1Home:this.user2Home);break;case"debug":break;case"admin":this.admin=s.trim()==="true";break;case"cmd":this.cmd=s;break;case"edit":this.edit=s.trim()===Y.classMM?Y.classMM:Y.classPq;break;case"aslocal":this.aslocal=s.trim()==="true"?et.True:et.False;break;case"coming":switch(s.trim()){case Pe.Qiita:this.coming=Pe.Qiita;break;case Pe.Line:this.coming=Pe.Line;break}break}}get availComing(){return this.coming!==Pe.Undef}async loadGameConfig(e){const t=new Qt,s=await t.loadGameConfig(e);if(s!==void 0)return s;t.setDefaultGameConfig();const n=t.itemList.filter(i=>i.gameItem.key===e);return n.length===1?n[0].gameItem:void 0}startBcHelper(){console.log("startBcHelper"),this.bc.Start(),this.bc.onNotify=this.onNotifyBcHelper}stopBcHelper(){console.log("stopBcHelper"),this.bc.Stop()}notifyGameConfigChanged(){console.log("notifyGameConfigChanged"),this.bc.notifyBool(!0)}async loadJson(e){return console.log(`[loadJson] file=[${e}]`),await this._loadJson(e)}async _loadJson(e){if(this.isWebRunning){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`HTTPエラー! ステータス: ${t.status}`);return await t.json()}else{const{loadJsonNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async saveJson(e,t){const s=JSON.stringify(t);if(this.isWebRunning){const n=new Blob([s],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=e,o.click()}else{const{saveJsonNode:n}=await import(this.nodeToolsImportFilename);return n(e,t)}}async loadBinFile(e){if(this.isWebRunning)return await(await fetch(e)).blob();{const{readBinNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async getDoc(e){let t,s;if(this.isWebRunning)t=new DOMParser,s=t.parseFromString(e,"text/html");else{const{createHtmlParserNode:n}=await import(this.nodeToolsImportFilename);t=n(e),s=t.parseFromString(e,"text/html")}return s}}class ee{static async put(e){const t=ee.encodeEnable?await ee.encode(e):e;try{await navigator.clipboard.writeText(t)}catch(s){return console.error("コピー失敗...",s),!1}return!0}static async get(){let e="";try{e=await navigator.clipboard.readText()}catch(t){return console.error("ペースト失敗...",t),null}return ee.encodeEnable?await ee.decode(e):e}static async encode(e){const t=ee.getEncoder(),s=ee.storeFile;return t.file(s,e),await t.generateAsync({type:"base64",compression:"DEFLATE",compressionOptions:{level:9}})}static async decode(e){const t=ee.getEncoder(),s=ee.storeFile;try{return await(await t.loadAsync(e,{base64:!0})).file(s).async("string")}catch(n){return console.error("デコード失敗...",n),null}}static getEncoder(){return new window.JSZip}}ee.encodeEnable=!0;ee.storeFile="form.json";async function tn(h){const e=h.cmd.split(":");let t=!1;switch(e[0]){case"drop":t=sn();break;case"ref":t=document.referrer;break}const s=`[${h.cmd}] res=${t}`;alert(s)}async function sn(){const h=new Ot;return await h.setup(),await h.dropDb()}const Oe={plus:"plus.png",win:"win.png",even:"even.png",lost:"lost.png",demo:"demo.png"};class nn{constructor(){this.imageHome="",this.cache=new Map,this.cacheNs=new Map,this.zip=null,this.zipNs=new Map,this.isMultiZip=!1,this.materials=[{ns:"",fileName:Oe.plus},{ns:"",fileName:Oe.win},{ns:"",fileName:Oe.even},{ns:"",fileName:Oe.lost},{ns:"",fileName:Oe.demo}],this.AnyNs=""}get demoMaterial(){return Oe.demo}async setupNs(e,t,s){const n=s.findByNs(e);if(n!==void 0){this.imageHome=t.imageHome;for(const i of n){const o=i.iconFileName,l=`${this.imageHome}${e}/${o}`;this.cache.set(o,l),this.cacheNs.set(o,e)}this.isMultiZip=!0;for(const i of this.materials){const o=i.fileName,l=`${this.imageHome}${o}`;this.cache.set(o,l),this.cacheNs.set(o,e)}}}async checkExists(e){try{return(await fetch(e,{method:"HEAD"})).ok}catch{return!1}}isMaterial(e){return this.materials.find(s=>s.fileName.includes(e))!==void 0}get loaded(){return this.isMultiZip?this.zipNs.size!==0:this.zip!==null}async _loadZipBy(e,t){const s=new rt;this.imageHome=s.imageHome.substring(2);const n=await s.loadBinFile(e);let i=null;if(s.isWebRunning)i=await window.JSZip.loadAsync(n);else{const{loadZipNode:o}=await import(s.nodeToolsImportFilename);i=await o(n)}this.zipNs.set(t,i),this.isMultiZip=!0}async getImageUrlBy(e,t){if(this.isMaterial(e))return`${this.imageHome}${e}`;if(this.cache.has(e)){const n=this.cache.get(e);if(!await this.checkExists(n)){const o=`${this.imageHome}notexist.png`;this.cache.set(e,o)}return this.cache.get(e)}return null}async findNs(e){if(!this.isMultiZip)return null;if(this.cacheNs.has(e)){const t=this.cacheNs.get(e);if(t!==void 0)return t}return null}dispose(){for(const e of this.cache.values())URL.revokeObjectURL(e);this.cache.clear()}}class we{get iconFileName(){return this.id===null&&!Number.isNaN(this.id)?`${this.name}_${this.idAsText}.png`:`${this.name}_${this.id}.png`}constructor(e=0,t=""){this.ns=z.None,this.id=0,this.name="",this.contentURL="",this.iconURL="",this.idAsText="",this.idAttributeForHTML="",this.id=e,this.name=t}parseFromImgName(e){let t=e.indexOf("_");if(t>=0){const s=e.substring(0,t);let n=e.substring(t+1);if(t=n.indexOf("."),t>=0)return n=n.substring(0,t),this.id=Number.parseInt(n),this.name=s,this.idAsText=Number.isNaN(this.id)?n:"",!0}return!1}static copy(e,t){t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t.idAsText=e.idAsText,t.idAttributeForHTML=e.idAttributeForHTML}}class on{constructor(){this.itemName="",this.chNames=new Array,this.index=-1}reset(){this.itemName="",this.chNames=new Array,this.index=-1,this.onScroll=null}toCombo(e,t,s){this.reset();const n=`.${e}`,i=document.querySelectorAll(`${n} div[title*="${s}"]`);let o=-1,l="";for(const r of i){const c=r;console.log(c.title),o++;const m=c.title.trim(),p=m,f=`
 <option value="${m}"${o===0?" selected":""}>${p}</option>
`.trim();l+=f,this.chNames.push(p)}if(o===-1)return null;const a=document.createElement("select");return a.id=t,a.className=t,a.innerHTML=l,this.itemName=e,a}addEvent(e,t){e.addEventListener("change",s=>{const i=s.target.value;this.chNames.find(l=>l===i)&&this.scrollAction(i)}),this.onScroll=t}findFirst(){return this.chNames.length===0?!1:(this.index=0,this.scrollAction(this.chNames[this.index]),!0)}scroll(e){const t=`.${this.itemName}`,s=document.querySelector(`${t} div[title="${e}"]`);if(s===null)return null;const n=s.closest(t);return n===null?null:(n.scrollIntoView({behavior:"smooth",block:"center"}),s)}scrollAction(e){const t=this.scroll(e);t&&this.onScroll!==null&&this.onScroll(t)}}class es{async LoadList(e){const n=(await new rt().loadJson(e)).map(o=>Object.assign(new we,o)),i=new es;return i.chList=n,i}findNs(e){const t=this.chList.find(s=>s.id===e);return t?t.ns:z.None}findByNs(e){return e===z.None?void 0:this.chList.filter(s=>s.ns===e)}MakeList(){}}class ln{constructor(){this.uiInfo=new ze,this.charFinder=new on,this.parentName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new B().SaveSetting(e),this.requestActivate!==void 0&&await this.requestActivate(e)}}async toHTML(e){if(!this.chSet.chList)return"";this.htmlMaker=new A;let t=0;for(const s of this.chSet.chList){t++;const n=`chuid${t}`;s.idAttributeForHTML=n;const i="",o=new Mt;o.imgSrc=i,o.imgFile=s.iconFileName;const l=new te;l.props.name=this.itemCssClassName(),l.props.id=n,l.props.className=this.imgCssClassName(),l.props.option.setImg(o),l.props.option.toolTip=s.name,l.props.option.onSelect=a=>{this.setSelectedItem(a.item.props.id)},this.htmlMaker.add(l)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createSelectorBox(e,t,s){this.parentName=t;const n=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="${this.charOpenUrlCssClassName()}">URL</button>
`),i=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${s}
    <label id="char-dlg-chinfo">未選択</label>
    <div class="${this.charSeachParentCssClassName()}" id="${this.charSeachParentCssClassName()}">
    <input type="text" id="${this.charSeachInputCssClassName()}" placeholder="キャラ名検索...">
    </div>
    ${n}
</div>`,o=new ye;o.title="<"+e+">",o.SetB4Type(Ae.DialogHide);const l=o.NewDialog(t,this.dlgCssClassName());return o.SetContent(t,i),this.applyCss(),o.EnableEventHandlers(),o.onMoveDone=this.moverOnMoveDone,l}addEventHandlers(e){document.getElementById(this.charSeachInputCssClassName()).oninput=t=>{if(t!==null&&t.target!==null){const s=t.target;console.log(s.value);const n=s.value,i=this.charSeachComboCssClassName(),o=document.getElementById(i);o!==null&&o.parentNode?.removeChild(o);const l=this.charFinder.toCombo(this.itemCssClassName(),i,n);if(l!==null){const a=document.getElementById(this.charSeachParentCssClassName());a!==null&&(a.appendChild(l),this.charFinder.addEvent(l,r=>{const m=r.parentElement.getAttribute("item-id");this.htmlMaker.SelectByID(this.itemCssClassName(),m)}),this.charFinder.findFirst())}}},document.getElementById(this.charOpenUrlCssClassName()).onclick=async()=>{if(this.selectedCh===void 0)return;const t=this.chSet.chList.find(s=>this.selectedCh.idAttributeForHTML===s.idAttributeForHTML);if(t){this.charOpenUrlCssClassName();const s=new Ce;if(s.setParent(this.dlgCssClassName()),s.setYesNo(),await s.showWait(`${t.name} をブラウザで開いてよろしいですか？`)===H.Yes){const i=t.contentURL;window.open(i,"_blank")}}}}addItemEventHandlers(){const e=this.htmlMaker.GetIdByIndex(0);this.htmlMaker.SelectByID(this.itemCssClassName(),e),this.htmlMaker.enableEvents(this.itemCssClassName()),this.setSelectedItem(e)}setSelectedItem(e){const t=this.chSet.chList.find(s=>e===s.idAttributeForHTML);t&&(document.getElementById("char-dlg-chinfo").textContent=t.name,this.selectedCh=t)}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}itemCssClassName(){return"char-item"}imgCssClassName(){return"base"}listCssClassName(){return"char-list"}dlgContentCssClassName(){return"char-dlg-content"}dlgCssClassName(){return"char-dlg"}charSeachInputCssClassName(){return"char-search-input"}charSeachComboCssClassName(){return"char-search-combo"}charSeachParentCssClassName(){return"char-search-parent"}charOpenUrlCssClassName(){return"char-open-url"}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=parseInt(this.uiInfo.left),i=parseInt(this.uiInfo.top),o=document.createElement("style");o.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,n,i)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgContentCssClassName()} {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

${this.htmlMaker.MakeDefaultScrollCss(this.parentName,300)}
${this.htmlMaker.MakeDefaultGridColCss(e,64,5,336)}

${this.htmlMaker.MakeDefaultItemimgCss(t,s,64,64)}
${this.htmlMaker.MakeDefaultSelectionCss(t)}

${this.htmlMaker.MakeDefaultButtonsCss()}
`.trim(),document.head.appendChild(o);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}}class pe{constructor(){this.ns=z.None,this.id=0,this.name="",this.contentURL="",this.iconURL=""}static toJsonText(e){const t=pe.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new pe;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}static fromJsonInst(e){const t=new we;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}}class tt{constructor(){this.title="",this.key="",this.selectionPair=[],this.selectedVal="",this.initScoreVal=0,this.mulScoreVal=0,this.available=!1}get stdScore(){const e=this.selectedVal.length>=1?this.selectedVal:"1",t=parseInt(e);return this.initScoreVal+t*this.mulScoreVal}get maxScore(){if(this.selectionPair.length===0)return 0;const e=this.selectionPair.length;return this.initScoreVal+e*this.mulScoreVal}get selectedText(){if(this.selectionPair.length!==0&&this.selectedVal!=="")for(const e of this.selectionPair){const t=e.split("/");if(t[1]===this.selectedVal)return t[0]}}}class O{constructor(){this.ns=z.None,this.items=new Array,this.allow=new Map,this.roleText="",this.comboText=""}makeDemoLvText(e){let t="";for(let s=1;s<=100;s++)t+=`"${e}${s}/${s}",`;return t=t.substring(0,t.length-1),t}load(){const e=this.makeDemoLvText("Lv"),t=this.makeDemoLvText("Lv"),s=this.makeDemoLvText(""),n=`
[
    {
        "title": "Ch.Lv",
        "key": "chLvId",
        "selectionPair": [
            ${e}
        ],
        "selectedVal": "1",
        "initScoreVal": 0,
        "numScoreItem": 0,
        "mulScoreVal": 0
    },
    {
        "title": "Ar.Lv",
        "key": "chArId",
        "selectionPair": [
            ${t}
        ],
        "selectedVal": "1",
        "initScoreVal": 0,
        "numScoreItem": 0,
        "mulScoreVal": 0
    },
    {
        "title": "HP",
        "key": "chHpId",
        "selectionPair": [
            ${s}
        ],
        "selectedVal": "1",
        "initScoreVal": 0,
        "numScoreItem": 0,
        "mulScoreVal": 0
    }
]
`,o=JSON.parse(n).map(l=>Object.assign(new tt,l));this.items=o}save(){console.log(JSON.stringify(this,null,2))}clone(){const e=new O;for(const t of this.items){const s=JSON.stringify(t,null,2),n=JSON.parse(s);e.items.push(n)}return e}static copy(e,t,s=!1){for(let n=0;n<e.items.length;n++){const i=e.items[n],o=s?new tt:t.items[n];o.title=i.title,o.key=i.key,o.selectionPair=i.selectionPair,o.selectedVal=i.selectedVal,o.initScoreVal=i.initScoreVal,o.mulScoreVal=i.mulScoreVal,o.available=i.available,s&&t.items.push(o)}}set(e,t){const s=this.items.find(n=>n.key===e);return s?(s.selectedVal=t,!0):!1}get stdScore(){let e=0;for(const t of this.items)t.available&&(e+=t.stdScore);return e}get maxScore(){let e=0;for(const t of this.items)t.available&&(e+=t.maxScore);return e}get allAvailable(){for(const e of this.items)if(e.available===!1)return!1;return!0}static calcScore(e,t){const s=t.split("+");let n=0;for(const i of s){const o=i.trim();if(o.endsWith("()")){const l=o.slice(0,-2);typeof e[l]=="function"?n+=e[l]():console.warn(`関数 '${l}' が存在しません`)}else{const l=e[o];typeof l=="number"?n+=l:Array.isArray(l)?n+=l.reduce((a,r)=>a+r,0):console.warn(`プロパティ '${o}' が数値ではありません`)}}return n}static calcScoreAdvanced(e,t){const s=Object.keys(e),n=s.map(o=>e[o]);return new Function(...s,`return ${t};`)(...n)}toInst(e){return(n=>{const i=class{constructor(){n.forEach((o,l)=>{this[l]=o})}};return new i})(e)}}class Lt{constructor(){this.fileNames=null,this.minMap=new Map,this.maxMap=new Map,this.rangeMap=new Map,this.digLenMax=0,this.nMul=0,this.table=[{key:v.pqStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:v.pqStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:v.pqStatusREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:v.pqTokkunHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:v.pqTokkunATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:v.pqTokkunREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:v.pqTokuSp1,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:v.pqTokuSp2,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:v.mmStatusFGT,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusPDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusACC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusEVA,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusCRI,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusMDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusCRD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusDEF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusSPD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmAbilityDEX,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmAbilityMGC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmAbilityDUR,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmRole,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}}],this.rolePriolity=[{roleKey:ft.RlAttacker,priority:Ct.priHi,statusKey:[v.mmAbilitySTR,v.mmStatusATK,v.mmStatusSPD]},{roleKey:ft.RlHealer,priority:Ct.priHi,statusKey:[v.mmAbilityMGC,v.mmStatusMDF,v.mmStatusHP]},{roleKey:ft.RlDebuffer,priority:Ct.priHi,statusKey:[v.mmAbilityDEX,v.mmStatusACC,v.mmStatusHP]},{roleKey:ft.RlBuffer,priority:Ct.priHi,statusKey:[v.mmStatusPDF,v.mmStatusHP,v.mmStatusDEF]}]}async loadDB(e){const t=new rt,s=await t.loadBinFile(e);if(t.isWebRunning)this.zip=await window.JSZip.loadAsync(s);else{const{loadZipNode:n}=await import(t.nodeToolsImportFilename);this.zip=await n(s)}return this.fileNames=Object.keys(this.zip.files),!0}async enumStatus(e){if(this.fileNames!==null)for(const t of this.fileNames){const s=await this.getFileContent(t);if(s===null||e===void 0)continue;if(!e(t,s))break}}async debugCombo(){await this.enumStatus((e,t)=>{for(const s of t)s.useCombo&&console.log(`${e}:[${s.value}]`);return!0})}async loadAuxScoreSet(e){const t=new Qt;await t.load(ae.ScoreUI,e);const s=new O;for(const n of t.itemList){const i=n.scItem;if(!n.scItem.isScoreAvail)continue;const o=new tt;switch(o.title=i.text,o.key=i.key,o.available=!1,i.selectType){case Ve.Sequence:const l=this.auxScoreTextToValue(i.start),a=this.auxScoreTextToValue(i.end),r=this.auxScoreTextToValue(i.step),c=new Array;for(let u=l;u<=a;u+=r)c.push(`${u}/${u}`);o.selectionPair=c,o.selectedVal=`${l}`,o.initScoreVal=l,o.mulScoreVal=r,c.length>=1&&(o.available=!1);break;case Ve.Text:const m=i.keyValue.split(",");let p="";for(const u of m){const f=u.split("/");if(f.length>=2){p=f[1];break}}o.selectionPair=m,o.selectedVal=p,o.initScoreVal=0,o.mulScoreVal=0,m.length>=1&&(o.available=!1);break}s.items.push(o)}return this.auxScoreSet=s,s}auxScoreTextToValue(e){const t=e.split("/"),s=t.length===1?t[0]:t[1];return parseInt(s)}async getMinMax(){await this.enumStatus((e,t)=>{for(const s of t){if(s.useCombo)continue;let n=parseInt(this.itemValue(s));if(!this.minMap.has(s.key))this.minMap.set(s.key,n);else{const i=this.minMap.get(s.key);i===void 0?this.minMap.set(s.key,n):i>n&&this.minMap.set(s.key,n)}if(!this.maxMap.has(s.key))this.maxMap.set(s.key,n);else{const i=this.maxMap.get(s.key);i===void 0?this.maxMap.set(s.key,n):i<n&&this.maxMap.set(s.key,n)}}return!0})}async getRanges(){await this.getMinMax(),this.digLenMax=0;for(const[e,t]of this.minMap){const s=t,n=this.maxMap.get(e);let i=0;if(s!==void 0&&n!==void 0&&(i=n-s),i<=0&&(i=1),this.rangeMap.set(e,i),n!==void 0){const o=Math.log10(n);o>this.digLenMax&&(this.digLenMax=o)}}this.nMul=this.digLenMax>0?Math.pow(10,Math.ceil(this.digLenMax)):1;for(const[e,t]of this.minMap)console.log(`[${e}] = ${this.minMap.get(e)},${this.maxMap.get(e)} ${this.rangeMap.get(e)}`);console.log(`digLenMax=[${this.digLenMax}] nMul=[${this.nMul}]`)}stdBy(e,t){let s,n;if(this.rangeMap.has(e)&&(s=this.rangeMap.get(e)),this.minMap.has(e)&&(n=this.minMap.get(e)),s===void 0||n===void 0||this.isNumeric(t)===!1)return null;s<=0&&(s=1);const i=(parseInt(t)-n)*s;return this.nMul*i}getFilename(e){let t=null;for(let s of this.fileNames){let n=s.indexOf("_");if(n>=0){let i=s.substring(n+1);if(n=i.indexOf("."),n>=0&&(i=i.substring(0,n)),i===e){t=s;break}}}return t}async getFileContent(e){if(e===null)return null;const t=this.zip.file(e);if(t){const s=await t.async("string");return JSON.parse(s)}return null}async getStatus(e){this.digLenMax===0&&await this.getRanges();const t=this.getFilename(e);if(t===null)return null;const s=await this.getFileContent(t);if(s===null)return null;let n=null;for(const a of s)if(!a.useCombo){for(const r of this.rolePriolity)if(r.statusKey.find(m=>m===a.key)){n=r,console.log(`find role : ${n.roleKey}`);break}if(n!==null)break}const i=new O;if(n!==null)for(const a of s){if(a.useCombo)continue;if(n.statusKey.find(c=>c===a.key)){const c=this.table.find(m=>m.key===a.key);if(c){const m=c.scoreFunc(a.key,this.itemValue(a));m.title=a.disp,m.key=a.key,m.selectedVal="1",i.items.push(m)}}}else for(const a of s){if(a.useCombo)continue;const r=this.table.find(c=>c.key===a.key);if(r){const c=r.scoreFunc(a.key,this.itemValue(a));c.title=a.disp,c.key=a.key,c.selectedVal="1",i.items.push(c)}}const o=new O;O.copy(this.auxScoreSet,o,!0),i.items=i.items.concat(o.items);for(let a=0;a<i.items.length;a++)for(let r=0;r<i.items.length;r++)a!==r&&i.items[a].title===i.items[r].title&&(i.items[a].title=i.items[a].title+"(1)",i.items[r].title=i.items[r].title+"(2)");const l=parseInt(e);return i.ns=this.charSpecSet.findNs(l),i}async getComboKeywords(e){let t=0;const s=new Map,n=new Map;for(const i of e){const o=this.getFilename(i);if(o===null)continue;const l=await this.getFileContent(o);if(l===null)continue;const a=new Map;for(const r of l){if(!r.useCombo)continue;const c=r.value.split(",");for(const m of c)if(a.has(m)===!1)a.set(m,1);else{const p=a.get(m);a.set(m,p+1)}}if(a.size===0){t=0,n.clear();continue}for(const[r,c]of a)if(n.has(r)===!1)n.set(r,c);else{const m=n.get(r);n.set(r,m+c)}if(t++,!(t<=2))for(const[r,c]of n)c>=3&&s.set(r,c)}return s}isNumeric(e){return e.trim()===""?!1:!isNaN(Number(e))}itemValue(e){return e.converted===""?e.value:e.converted}toScoreMaxNum(e,t){return this.isNumeric(t)===!1?null:Lt.useStdConv?this.stdBy(e,t):t!==""?parseInt(t):1}scoreFunc(e,t){const s=new tt;if(e===null)return s;s.mulScoreVal=e/t;for(let n=1;n<=t;n++){const i=Math.ceil(e/t*n);s.selectionPair.push(`Lv${n}/${n}`),n===1&&(s.initScoreVal=i)}return s.available=!0,s}scoreFuncOld(e,t){const s=new tt;if(this.isNumeric(e)===!1)return s;let n=e!==""?parseInt(e):1;s.mulScoreVal=n/t;for(let i=1;i<=t;i++){const o=Math.ceil(n/t*i);s.selectionPair.push(`Lv${i}/${i}`),i===1&&(s.initScoreVal=o)}return s.available=!0,s}puyoToku(e){return e==="enable"?10:1}}Lt.useStdConv=!1;const Ct={priHi:0},Le={None:"None",UI:"UI",Menu:"Menu"};class de{constructor(){this.dockType=Le.None,this.iconFileName="",this.toolTip="",this.idAttributeForHTML=""}get labelWrap(){let e=this.toolTip,t=this.toolTip.length;if(t>3){const s=t%2===0?t/2:t/2+1,n=e.substring(0,s),i=e.substring(s);e=n+`
`+i}return e}setAsDlg(e,t){this.dockType=Le.UI,this.dlg=e,this.toolTip=t}setAsMenu(e){this.dockType=Le.Menu,this.toolTip=e}get isUIType(){return this.dockType==Le.UI}get isMenuType(){return this.dockType==Le.Menu}ToggleStatus(){this.dlg===void 0||this.dlg===null||(this.dlg.hidden=!this.dlg.hidden)}}class Bt{constructor(){this.items=new Array,this.parentName="",this.listName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new B().SaveSetting(e,!1)},this.onHelp=async(e,t)=>{await an()}}add(e){return e.dockType==Le.UI&&(e.dlgParent=e.dlg.parentElement),this.items.push(e),!0}async toHTML(e,t=null){if(!this.items)return"";this.listName=e,this.htmlMaker=new A;let s=0;for(const n of this.items){s++;const i=`dock-uid${s}`;n.idAttributeForHTML=i;const o=new te,l=n.labelWrap;o.props.name=this.itemCssClassName(),o.props.id=i,o.props.className=this.imgCssClassName(),o.props.option.toolTip=n.toolTip,o.props.option.setLabel(l,!0),o.props.option.onSelect=a=>{const r=this.items.find(c=>a.item.props.id===c.idAttributeForHTML);if(r&&(this.selectedItem=r,this.onApply!==void 0)){const c=new gs;c.item=this.selectedItem,this.onApply(c)}},this.htmlMaker.add(o)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createDockBox(e,t,s=!0){this.parentName=e;const n=`<div class="${this.parentName}-dlg-content">
    ${t}
</div>`,i=new ye;i.SetB3Type(Ye.Hide),i.SetB5Type(Xe.Help,this.onHelp);const o=i.NewDialog(e,this.dlgCssClassName());return i.SetContent(e,n,s),this.applyCss(),i.EnableEventHandlers(),i.onMoveDone=this.moverOnMoveDone,o}addItemClickHandlers(e){this.onApply=e,this.htmlMaker.SelectByID(this.itemCssClassName(),this.htmlMaker.GetIdByIndex(0)),this.htmlMaker.enableEvents(this.itemCssClassName())}stdApplyAction(e){return e.item.dlgParent===null?(e.cancel=!0,!1):(console.log(`selected item = [${e.item.toolTip}::${e.item.dockType}]`),this.htmlMaker.UnselectAll(this.itemCssClassName()),this.htmlMaker.SelectByID(this.itemCssClassName(),e.item.idAttributeForHTML),e.item.isUIType&&(new B().MoveHiestLayer(e.item.dlgParent),e.item.dlgParent.hidden&&(e.item.dlgParent.hidden=!1)),!0)}activateItem(e){const t=this.items.find(s=>s.dlg===e);if(t!==void 0){const s=new gs;s.item=t,this.stdApplyAction(s)}}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=48,i=this.items.length,o=document.createElement("style");o.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,60,10,B.ignoreIndex)}
${this.htmlMaker.MakeSystematicDialogCss(this.dlgCssClassName())}
.${this.parentName}-dlg-content {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

${this.htmlMaker.MakeDefaultNonScrollCss(this.parentName,0)}
${this.htmlMaker.MakeDefaultGridColCss(e,n,i,n*i)}

${this.htmlMaker.MakeDefaultItemLabelCss(t,s,n,n)}
${this.htmlMaker.MakeSystematicSelectionCss(t)}

${this.htmlMaker.MakeDefaultButtonsCss()}
span {
display: grid;
align-content: center;
white-space: pre-wrap;
}
`.trim(),document.head.appendChild(o);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}listCssClassName(){return`${this.listName}-list`}dlgCssClassName(){return`${this.parentName}-dlg`}static GetDialogInfo(e){return ye.GetDialogInfo(e)}static SetDialogInfo(e){return ye.SetDialogInfo(e)}async InitZOrder(e){await e.ForEachAsync(t=>{const s=Bt.GetDialogInfo(t),n=e.FindByName(t);return s!==null&&(s.zindex=n!==null?n.style.zIndex:""),console.log(s),!0})}}class gs{constructor(){this.cancel=!1}}async function an(){const h=new Ce;h.title="About EvoNa",await h.showWait('EvoNa (Evolution Navigator)<br>Release 1<br><img src="./wallpaper.png" width="64" height="64"></img><br><br>Powered By Gemini/Chromium Tech.')}class $t{constructor(){this.dockType=Le.None,this.iconFileName="",this.toolTip="",this.dlgName="",this.hidden=!1,this.zIndex="",this.topPx="",this.leftPx=""}static toJsonText(e){const t=$t.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new $t;return t.dockType=e.dockType,t.iconFileName=e.iconFileName,t.toolTip=e.toolTip,e.isUIType&&(t.dlgName=e.dlgParent.id,t.hidden=typeof e.dlgParent.hidden=="string"?!1:e.dlgParent.hidden,t.zIndex=e.dlgParent.style.zIndex,t.leftPx=e.dlgParent.style.left,t.topPx=e.dlgParent.style.top),t}}class St{static toJsonText(e){const t=St.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new St;t.items=new Array;for(const s of e.items)t.items.push($t.toJsonInst(s));return t}restore(e,t){for(const s of this.items){const n=e.items.find(i=>i.dlg.id===s.dlgName);n&&(n.dockType=s.dockType,n.iconFileName=s.iconFileName,n.toolTip=s.toolTip,n.isUIType&&(n.dlgParent.hidden=typeof s.hidden=="string"?!1:s.hidden,n.dlgParent.style.zIndex=s.zIndex,n.dlgParent.style.left=s.leftPx,n.dlgParent.style.top=s.topPx))}t.ReOrder()}}class rn{constructor(){this.splitTextList=["スキル","（星7）"]}convTitle(e){for(const t of this.splitTextList)if(e.endsWith(t))return`${e.substring(0,e.length-t.length)}<br>${t}`;return e.length<=8,e}}let Rt=null;function Jt(){return Rt||(Rt=new rn,console.log("ConvertTools instance created (Singleton)")),Rt}class se{constructor(){this.comment="",this.fixedType=me.None}static copy(e,t){t.comment=e.comment,t.fixedType=e.fixedType}}class st{constructor(){this.chUuid="",this.ch=new we,this.prop=new se}setDefault(){this.prop.comment===""&&(this.prop.comment=`${this.ch.name.replace("（星7）","")}(Lv1)`)}}class Ss{constructor(){this.chList=new Array,this.uiInfo=new ze,this.parentName="",this.scoreGrid=new Fs,this.gridHeaderName=`${this.dlgCssClassName()}-headerName`,this.gridFooterName=`${this.dlgCssClassName()}-footerName`,this.gridName=`${this.dlgCssClassName()}-gridName`,this.gridRowName=`${this.dlgCssClassName()}-gridRowName`,this.keyClassName=`${this.dlgCssClassName()}-keyClassName`,this.valueClassName=`${this.dlgCssClassName()}-valueClassName`,this.commentClassName=`${this.dlgCssClassName()}-commentClassName`,this.fixedClassName=`${this.dlgCssClassName()}-fixedClassName`,this.nsDefs=[],this.updateItemId=1,this.deleteItemId=2,this.onNotifyWatched=async e=>{const t=e.className.split("-"),s=t.length>=2?t[0]:"",n=this.nsComboCssClassName(),i=document.getElementsByClassName(n);if(i.length>=1){const o=i[0];o.value!==s&&(o.value=s)}},this.onNestedNodeSelect=async e=>{const t=e.callerName,s=t.split("_");if(s.length===0)return;let n=s.find(o=>o.startsWith("uuid"));if(n===void 0)return;n=n.substring(4);const i=this.chList.find(o=>o.chUuid===n);if(i!==void 0)switch(console.log(i),e.result){case`${this.updateItemId}`:this.editingCh=i;const o=i.scoreSet;se.copy(i.prop,this.savedProp),this.savedScoreSet=new O,O.copy(o,this.savedScoreSet,!0),this.createScoreGrid(i,o),this.htmlMaker.setVisible(this.htmlMaker.defaultToolButtonsCssName,!1),this.nested.setVisible(!1);const l=this.nested.findParentNodeBy(t);console.log(l);const a=this.nested.getCell(l);console.log(a);const r=this.nested.findCell(a,"img");console.log(r);const c=r.src,m=document.createElement("img");m.src=c,m.style.width="100px",m.style.height="100px",this.scoreGrid.headerElem?.appendChild(m);break;case`${this.deleteItemId}`:const p=new Ce;p.setParent(this.dlgCssClassName());let u=H.None;switch(p.setYesNo(),u=await p.showWait(`${i.ch.name} を削除しますか？`),u){case H.Yes:const f=this.nested.findParentNodeBy(t);console.log(f);const y=this.nested.getChildren(f);console.log(y),this.nested.removeNodeBy(t),y!==null&&y.length===1&&(this.nested.removeNode(f),this.addActionLog(i,ke.Delete));break;case H.No:return;case H.Cancel:return}break}},this.editingCh=null,this.onSelect=async e=>{switch(console.log(`classify = ${e.classify} selectedValue = ${e.selectedValue} targetId = ${e.targetId}`),e.classify){case this.commentClassName:const i=document.getElementsByClassName(this.commentClassName);if(i.length===1){const o=i[0];console.log("** comment input & enter! **",o.value)}return;case this.fixedClassName:this.editingCh!==null&&(this.editingCh.prop.fixedType=e.selectedValue);return}const t=this.editingCh;if(t===null)return;const n=t.scoreSet.items.find(i=>i.key===e.classify);n&&(n.selectedVal=e.selectedValue)},this.savedProp=new se,this.savedScoreSet=new O,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new B().SaveSetting(e),this.requestActivate!==void 0&&await this.requestActivate(e)},this.onCopyPaste=async(e,t)=>{console.log(`[${e.className}] selected [${t}]`);const s="charSummary:";switch(t){case Te.Copy:const n=ot.toJsonText(this);await ee.put(`${s}${n}`);break;case Te.Paste:const i=await ee.get();if(i===null)break;if(!i.startsWith(s)){const a=new Ce;a.setParent(this.dlgCssClassName()),await a.showWait(`ペーストデータの形式が不正です<br>${s}`);break}const o=JSON.parse(i.substring(s.length)),l=ot.fromJsonInst(o);this.chList=l.chList,this.nested.disableEvents(),this.nested.reset(),await this.addAllCharNodes(),this.enableLazyImages(this.imageLoader),this.nested.enableEvents(this.onNestedNodeSelect);break}}}async load(){const t=await(await Se()).get($e.CharSummaryAction);if(t===null)return;const s=new Map,n=new Array;this.usingLog(t,s,n),this.chList=new Array;for(const[i,o]of s){const l=bt.fromJsonText(o.log),a=new we;we.copy(l.ch,a);const r=new se;se.copy(l.prop,r);const c=new O;O.copy(l.scoreSet,c,!0);const m=new st;m.chUuid=l.chUuid,m.ch=a,m.prop=r,m.scoreSet=c,m.setDefault(),this.chList.push(m)}}usingLog(e,t,s){for(const n of e){const i=bt.fromJsonText(n.log);if(i.chUuid==="")continue;let o=!1,l=!1;switch(i.logType){case ke.None:break;case ke.Add:o=!0;break;case ke.Update:t.has(i.chUuid)?o=!0:o=!1;break;case ke.Delete:o=!0,l=!0;break}if(o)if(l){if(t.has(i.chUuid)){t.delete(i.chUuid);const a=t.get(i.chUuid);s.push(a)}}else{if(t.has(i.chUuid)){const a=t.get(i.chUuid);s.push(a),t.delete(i.chUuid)}t.set(i.chUuid,n)}}}sortByScore(){if(this.chList.length===0)return null;const e=new Array;for(const s of this.chList){const n=new we;we.copy(s.ch,n);const i=new O;O.copy(s.scoreSet,i,!0);const o=new st;o.chUuid=s.chUuid,o.ch=n,se.copy(s.prop,o.prop),o.setDefault(),o.scoreSet=i,e.push(o)}return e.sort((s,n)=>n.scoreSet.stdScore-s.scoreSet.stdScore)}toHTML(){return this.htmlMaker=new A,this.htmlMaker.ToHTML()}createSummaryBox(e,t,s){this.parentName=t;let n=`
<button id="${this.itemAddCssClassName()}">キャラ追加</button>
`.trim();this.htmlMaker.defaultToolButtonsCssName=`${this.dlgCssClassName()}-tool-btns`;const i=this.htmlMaker.MakeDefaultToolButtonsHTML(n),o=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${i}
    ${s}
</div>`,l=new ye;l.title="<"+e+">",l.SetB2Type(He.CopyPaste,this.onCopyPaste);const a=l.NewDialog(t,this.dlgCssClassName());return l.SetContent(t,o),this.applyCss(),l.EnableEventHandlers(),l.onMoveDone=this.moverOnMoveDone,a}addEventHandlers(e,t){this.onAdd=t,document.getElementById(`${this.itemAddCssClassName()}`).onclick=async()=>{if(this.onAdd===void 0)return;const s=new cn;await this.onAdd(s),s.cancel!==!0&&await this.onItemAdd(s)}}async createCharSummaryNodes(e,t){this.imageLoader=e;const s=new Vs;s.init(),s.setListener("charNodes",this.dlgContentCssClassName(),this.dlgContentCssClassName()),this.nested=s,this.nsDefs=t,await this.addAllCharNodes(),s.setSize("400"),s.applyCss()}async showCharSummaryNodes(){this.nested.enableOverlay(!1);let e=10,t=e;const s=document.getElementsByClassName(this.dlgContentCssClassName());if(s.length>=1){const i=s[0].getElementsByClassName(this.htmlMaker.defaultToolButtonsCssName);if(i.length>=1){const o=i[0],l=this.htmlMaker.GetRect(o);console.log("toolRc",l),t=e+Number(l.height)}if(i.length>=1){const o=this.nsComboCssClassName(),l=this.createNsCombo(o);i[0].appendChild(l)}}this.nested.show("0",`${t}`),this.nested.enableEvents(this.onNestedNodeSelect),this.nested.startWatch(this.onNotifyWatched)}createNsCombo(e){let t=-1,s="";for(const i of this.nsDefs){t++;const o=i.ns,l=i.nsName,r=`
 <option value="${o}"${t===0?" selected":""}>${l}</option>
`.trim();s+=r}const n=document.createElement("select");return n.id=e,n.className=e,n.innerHTML=s,n.addEventListener("change",i=>{const o=i.target,l=this.nested.findNodeBy(o.value);l!==null&&this.nested.scroll(l)}),n}getCharUuidClassName(e){const t=e.ch,s=t.ns,n=`${s}_${t.name}_${t.id}`;if(this.nested.findNodeBy(s)===null)return null;const o=n;return`${this.nested.findNodeBy(o).className}_uuid${e.chUuid}`}async addAllCharNodes(){this.nested.createRoot();const e=this.nested.topTableElem;for(const t of this.nsDefs){const s=new Tt;s.enableWatchNotify=!0,this.nested.createNode(e,t.ns,s);const n=this.nested.findNodeBy(t.ns),i=this.nested.makeTextCell(`${t.ns}Label`,t.nsName,`${t.nsName}グループ`).ToHTML();this.nested.setCellContent(n,0,i)}for(const t of this.chList)await this.addCharNode(this.nested,t,!0);console.log("**[TOP]**",this.nested.findNodeBy(this.nested.rootName))}async addCharNode(e,t,s){const n=t.ch,i=n.ns,o=`${i}_${n.name}_${n.id}`,l=e.findNodeBy(i);if(l===null)return null;const a=o;let r=e.findNodeBy(a);if(r===null){e.createNode(l,a),r=e.findNodeBy(a);let g=await this.imageLoader.getImageUrlBy(n.iconFileName,n.ns),T="",C=n.name,N=e.makeImgCell(`${a}Img`,g,T,C).ToHTML();e.setCellContent(r,0,N)}let c=`${r.className}_uuid${t.chUuid}`;const m=new Tt;m.numCell=2,e.createNode(r,c,m);const p=e.findNodeBy(c);let u=t.prop.comment,f=this.getChScoreText(t);const d=Jt().convTitle(u),b=`${u}${f}`;let E=e.makeTextCell(`${c}`,d,b).ToHTML();e.setCellContent(p,0,E);const I=e.makeBtnCell(`${c}`,"更新","更新",this.updateItemId).ToHTML(),$=e.makeBtnCell(`${c}`,"削除","削除",this.deleteItemId).ToHTML();return e.setCellContent(p,1,I+$),p}getChScoreText(e){let t="";for(const s of e.scoreSet.items){let n=s.selectedText;n=n===void 0?"*bug*":n,t+=jt.toolTipNewLine+s.title+"："+n+"("+Math.ceil(s.stdScore)+")"}return t}createScoreGrid(e,t){const s=this.dlgContentCssClassName(),n=Jt(),i=this.scoreGrid.makePair();this.setCommentPair(e,i),this.setFixedFormPair(e,i);for(const o of t.items){const l=n.convTitle(o.title),a=o.title,r=this.scoreGrid.makeKeyCell(l,this.keyClassName,a),c=new nt;c.selectionPair=o.selectionPair,c.selectedItem=o.selectedVal,c.classify=o.key;const m=new ge;m.makeItems(),m.items[0].typeInfo.setCombo(c),m.items[0].className=this.valueClassName,i.set(r,m)}if(this.scoreGrid.setPair(i),this.scoreGrid.setListener(this.gridName,this.gridRowName,s,this.gridHeaderName,this.gridFooterName),this.scoreGrid.enableEvents(this.onSelect),this.scoreGrid.footerElem!==null){let o=`
<button id="${this.gridFooterName}-okBtn">OK</button>
<button id="${this.gridFooterName}-canBtn">CANCEL</button>
`.trim();this.scoreGrid.footerElem.innerHTML=o,document.getElementById(`${this.gridFooterName}-okBtn`).onclick=async()=>{const l=this.editingCh;if(l===null)return;l.scoreSet;const a=document.getElementsByClassName(this.commentClassName);if(a.length===1){const r=a[0];l.prop.comment=r.value}this.addActionLog(l,ke.Update),this.removeScoreGrid(),this.updateChScoreInfo(this.editingCh)},document.getElementById(`${this.gridFooterName}-canBtn`).onclick=async()=>{const l=this.editingCh;if(l===null)return;l.prop.comment=this.savedProp.comment;const a=l.scoreSet;O.copy(this.savedScoreSet,a),this.removeScoreGrid()}}}setCommentPair(e,t){const s=e.prop.comment.trim(),n="キャラ情報を入力",i=this.scoreGrid.makeKeyCell("キャラ情報",this.keyClassName,n),o=new _;o.value=s,o.placeholder=n;const l=new ge;l.makeItems(),l.items[0].typeInfo.setInput(o),l.items[0].className=this.commentClassName,l.items[0].typeInfo.using.itemId=1,t.set(i,l)}setFixedFormPair(e,t){const i=this.scoreGrid.makeKeyCell("固定枠",this.keyClassName,"自動編成の固定枠を選択");let o=new Array,l="";for(const[c,m]of Cs){const p=`${m}/${c}`;o.push(p),e.prop.fixedType===c&&(l=c)}const a=new nt;a.selectionPair=o,a.selectedItem=l,a.classify=this.fixedClassName;const r=new ge;r.makeItems(),r.items[0].typeInfo.setCombo(a),r.items[0].className=this.fixedClassName,t.set(i,r)}removeScoreGrid(){if(this.scoreGrid.headerElem!==null){let e=this.scoreGrid.headerElem.children[0];e!==null&&(e.remove(),e=null)}this.scoreGrid!==null&&(this.scoreGrid.dispose(),this.htmlMaker.setVisible(this.htmlMaker.defaultToolButtonsCssName,!0),this.nested.setVisible(!0))}async onItemAdd(e){const t=new Ce;t.setParent(this.dlgCssClassName());let s=H.None;if(t.setYesNo(),s=await t.showWait(`${e.selectCh.name} を追加しますか？`),s===H.No)return;const n=new st;n.chUuid=As(),n.ch=e.selectCh,n.ch.iconURL=e.selectedImg,n.scoreSet=e.scoreSet,n.setDefault(),this.chList.push(n);const i=await this.addCharNode(this.nested,n,!1);i!==null&&(this.nested.scroll(i),this.addActionLog(n,ke.Add))}async addActionLog(e,t){const s=new bt;s.logType=t,s.chUuid=e.chUuid,s.ch=e.ch,s.prop=e.prop,s.scoreSet=e.scoreSet;const n=bt.toJsonText(s);await(await Se()).put($e.CharSummaryAction,n)}updateChScoreInfo(e){const t=this.getCharUuidClassName(e);if(t===null)return;const s=this.nested.findNodeBy(t);let n=this.getChScoreText(e);const i=`${e.prop.comment}`,o=`${i}${n}`;let l=this.nested.makeTextCell(`${t}`,i,o).ToHTML();this.nested.setCellContent(s,0,l)}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e),this.imageLoader=e}itemAddCssClassName(){return"char-summary-add"}nsComboCssClassName(){return`${this.dlgCssClassName()}-nscombo`}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return"char-summary-dlg"}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=document.createElement("style");s.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,e,t)}
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
${L.spanCssText("0.8",!0)}
}
/* 登録キャラのボタン */
button[class^="Cns"] {
${L.spanCssText("0.8",!0)}
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

${this.scoreGrid.getCssText(this.gridName,this.keyClassName,this.commentClassName)}
${this.scoreGrid.getCssText(this.gridName,this.keyClassName,this.fixedClassName)}
${this.scoreGrid.getCssText(this.gridName,this.keyClassName,this.valueClassName)}

.${this.gridFooterName} {
${L.footerText()}
}
.${this.gridFooterName} button {
${L.footerButtonText()}
}

`.trim(),document.head.appendChild(s);const n=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,n)}}class cn{constructor(){this.cancel=!1}}const ke={None:"None",Add:"Add",Delete:"Delete",Update:"Update"};class bt{constructor(){this.logType=ke.None,this.chUuid=""}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class it{constructor(){this.chUuid="",this.ch=new pe,this.prop=new se}static toJsonText(e){const t=it.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new it;return t.chUuid=e.chUuid,t.ch=pe.toJsonInst(e.ch),se.copy(e.prop,t.prop),t.scoreSet=e.scoreSet,t}static fromJsonInst(e){const t=new st;return t.ch=pe.fromJsonInst(e.ch),se.copy(e.prop,t.prop),t.scoreSet=new O,O.copy(e.scoreSet,t.scoreSet,!0),t}}class ot{constructor(){this.items=new Array}static toJsonText(e){const t=ot.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new ot;t.items=new Array;for(const s of e.chList)t.items.push(it.toJsonInst(s));return t}static fromJsonInst(e){const t=new Ss;t.chList=new Array;for(const s of e.items)t.chList.push(it.fromJsonInst(s));return t}}class mn{constructor(){this.TextMap=new Map}set(e,t){const s=this.TextMap.has(e);return this.TextMap.set(e,t),s}remove(e){const t=this.TextMap.has(e);return t&&this.TextMap.delete(e),t}get count(){return this.TextMap.size}clear(){this.TextMap.clear()}forEach(e){if(e===void 0)return;let t=!1;for(const[s,n]of this.TextMap)if(t=e(s,n),t)break;return t}values(){const e=new Map;for(const[t,s]of this.TextMap)e.set(t,parseInt(s));return e}}class xs{constructor(e=0,t=""){this.ch=new we,this.prop=new se,this.isEmpty=!0,this.details=new mn,this.ch.id=e,this.ch.name=t}set(e,t){const s=this.details.TextMap.has(e);return this.details.set(e,t),s}get values(){return this.details.values()}get itemID(){const e=this.itemKey,t=this.ch.idAttributeForHTML.substring(e.length);let s=parseInt(t);return s<=0?-1:s}get itemKey(){return"chuid"}}class qt{constructor(){this.nFormationItem=5,this.uiInfo=new ze}Init(){this.items=new Array;for(let e=0;e<this.nFormationItem;e++)this.items.push(new xs)}put(e,t){const s=this.items.find(n=>this.isExistCh(n,t));return s!==void 0&&s.isEmpty===!1?!1:(e.ch.ns=t.ns,e.ch.id=t.id,e.ch.name=t.name,e.isEmpty=!1,!0)}empty(e){const t=e.isEmpty;return e.isEmpty=!0,e.isEmpty!=t}isExistCh(e,t){return e.ch.name===t.name&&e.ch.id===t.id}equalsFormationItem(e,t){return e.ch.name===t.ch.name&&e.ch.id===t.ch.id}}class Me{constructor(){this.autoScoreType=Ne.High}static copy(e,t){t.autoScoreType=e.autoScoreType}}class hn{constructor(){this.emptyFile="plus.png",this.autoForm=!1,this.editFormEnable=!1,this.saveEnable=!1,this.enableScoreEvent=!1,this.parentName="",this.listName="",this.gridHeaderName=`${this.dlgCssClassName()}-headerName`,this.gridFooterName=`${this.dlgCssClassName()}-footerName`,this.gridName=`${this.dlgCssClassName()}-gridName`,this.scoreGrid=null,this.editingIndex=-1,this.onNotifyLvg=async e=>{if(e.classify===Ge.Ok){const t=e.notify,s=t.checkedRow();s!==-1&&(t.dispose(),await this.autoFormationApply(s))}e.classify===Ge.Cancel&&e.notify.dispose()},this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new B().SaveSetting(e),this.requestActivate!==void 0&&await this.requestActivate(e)},this.onScoreGridOpen=async e=>{console.log(`notifty id     = ${e.item.props.id}`),console.log(` targetId      = ${e.targetId}`),console.log(` classify      = ${e.classify}`),console.log(` selectedValue = ${e.selectedValue}`);const t=e.item.props.id,s=parseInt(t)-1;if(0<=s&&s<this.formation.items.length){const n=`${this.propItemCssClassName()}-${t}`;if(this.htmlMakerProp.IsEnabledId(n)!==!0)return;if(this.enableScoreEvent){const o=this.formation.items[s];if(o.ch.id===0){console.log("*bug?*");return}if(this.scsList[s].items.length===0){const l=`${o.ch.id}`,a=await this.charDB.getStatus(l);a!==null&&a.items!==void 0&&(this.scsList[s]=a,this.makeFlyoutGrid(a,s))}else{const l=this.scsList[s];this.makeFlyoutGrid(l,s)}}}else console.log(`invalid index = ${s}`)},this.savedOpt=new Me,this.savedScoreSet=new O,this.onScoreValueSelect=async e=>{if(console.log(`[onScoreValueSelect] callerName=${e.callerName}, result=${e.result}`),e.callerName===v.cmAutoScore){const n=this.formationOptList[this.editingIndex];n.autoScoreType=e.result;return}const s=this.scsList[this.editingIndex].items.find(n=>n.key===e.callerName);s!==void 0&&(s.selectedVal=e.result)},this.onOkClickScoreGrid=async e=>{const t=this.formation.items[this.editingIndex],s=this.scsList[this.editingIndex];this.disposeScorGrid(),this.notifyChangeScore(t,s)},this.onCancelClickScoreGrid=async e=>{const t=this.formationOptList[this.editingIndex];Me.copy(this.savedOpt,t);const s=this.scsList[this.editingIndex];O.copy(this.savedScoreSet,s),this.disposeScorGrid()},this.onCopyPaste=async(e,t)=>{console.log(`[${e.className}] selected [${t}]`);const s="formation:";switch(t){case Te.Copy:const n=Ee.toJsonText(this.formation,this.scsList,this.formationOptList);await ee.put(`${s}${n}`);break;case Te.Paste:const i=await ee.get();if(i===null)break;if(!i.startsWith(s)){const r=new Ce;r.setParent(this.dlgCssClassName()),await r.showWait(`ペーストデータの形式が不正です<br>${s}`);break}const o=JSON.parse(i.substring(s.length)),l=this.selectedItem.itemID;this.formation.Init();let a=-1;for(const r of o.items){a++,this.formation.items[a]=lt.fromJsonInst(r);const c=this.formation.items[a];c.ch.idAttributeForHTML=`${c.itemKey}${a+1}`}if(this.enableScoreEvent===!0)if(o.formationOptList.length>=1){this.formationOptList=new Array;for(const r of o.formationOptList){const c=new Me;Me.copy(r,c),this.formationOptList.push(c)}}else for(const r of this.formationOptList)r.autoScoreType=Ne.None;else this.formationOptList=new Array;this.scsList=new Array;for(const r of o.scsList){const c=new O;O.copy(r,c,!0),this.scsList.push(c)}a=-1;for(const r of this.formation.items){a++;let c=!1;if(r.isEmpty?await this.charEmptyItem(r):(await this.charPutItem(r),c=!0),this.enableScoreEvent!==!1){const p=`${this.propItemCssClassName()}-${a+1}`;this.htmlMakerProp.EnableId(p,c)}const m=this.scsList[a];this.notifyChangeScore(r,m)}this.selectedItem=this.formation.items[l-1];break}}}InitForEnemy(e){this.charDB=e,this.formation=new qt,this.formation.Init(),this.enableScoreEvent=!0,this.initScoreOptions(),this.initScsList()}InitForPlayer(e){this.charSummary=e,this.autoFormation()}initScsList(){this.scsList=new Array;const e=this.formation.nFormationItem;for(let t=0;t<e;t++){const s=new O;this.scsList.push(s)}}initScoreOptions(){this.formationOptList=new Array;const e=this.formation.nFormationItem;for(let t=0;t<e;t++){const s=new Me;this.formationOptList.push(s)}}async Setup(e,t){if(!e)return;this.formation=e;let s=0;for(const n of this.formation.items){n.isEmpty?this.formation.empty(n):this.formation.put(n,n.ch),s++;const i=`${n.itemKey}${s}`;n.ch.idAttributeForHTML=i;const o=n.isEmpty?this.emptyFile:n.ch.iconFileName,l=await t.getImageUrlBy(o,n.ch.ns);if(l===null)return;this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),n.ch.idAttributeForHTML,l)}}async toHTML(e){if(!this.formation)return"";this.listName=e,this.htmlMakerChSel=new A;let t=0;for(const s of this.formation.items){const n=s.ch;t++;const i=`${s.itemKey}${t}`;n.idAttributeForHTML=i;const o="",l=s.isEmpty?this.emptyFile:n.iconFileName,a=new Mt;a.imgSrc=o,a.imgFile=l;const r=new te;r.props.name=this.itemCssClassName(),r.props.id=i,r.props.className=this.imgCssClassName(),r.props.option.setImg(a),r.props.option.toolTip=n.name,r.props.option.onSelect=c=>{console.log(`notifty id = ${c.item.props.id}`),this.setSelectedItem(c.item.props.id)},this.htmlMakerChSel.add(r)}return this.htmlMakerChSel.MakeScrollableList(this.listCssClassName())}toGridHTML(){this.htmlMakerProp=new A;let e=0;for(const t of this.formation.items){t.ch;const s=this.scsList[e];e++;for(const i of s.items)t.details.set(i.key,i.selectedVal);const n=new te;n.props.name=`${this.propItemCssClassName()}-${e}`,n.props.id=`${e}`,n.props.className=`${this.propItemCssClassName()}`,n.props.option.setButton("スコア"),n.props.option.using.itemId=e,n.props.option.onSelect=this.onScoreGridOpen,this.htmlMakerProp.add(n)}return this.htmlMakerProp.MakeScrollableList(this.propCssClassName())}async autoFormation(){const e=this.formation!==void 0?this.formation.uiInfo:void 0;this.formation=new qt,this.formation.Init(),e===void 0&&this.initScsList(),e!==void 0&&(this.formation.uiInfo=e),await this.makeLvwGroup(this.imgLoader)}async autoFormationApply(e){const t=this.charSummary.sortByScore();if(t===null||t.length===0)return console.log("[autoFormationApply] sortedChSummary.length === 0"),!1;const s=this.formation.nFormationItem,n=this.moveLockedFormation(s);if(n===null)return console.log("[autoFormationApply] lockInfo === null"),!1;const i=n[0],o=n[1],l=t.length;let a=Math.floor(l/s);l%s&&a++;let r=0,c=-1,m=!1;for(let f=0;f<a;f++)if(i[f]){if(r++,r===e){c=f,m=!0;break}if(r++,r===e){c=f;break}}else{if(r++,r!==e)continue;c=f;break}if(c===-1)return;this.initScsList();const p=c*s;if(m){console.log("**lock form selected**",m,c,o[c]);for(let f=0;f<s;f++){let y=o[c][f],d=!1;switch(y){case-1:y=p+f;break;case-2:d=!0;break}console.log("->",y);const b=this.formation.items[f];d?this.formation.empty(b):(this.formation.put(b,t[y].ch),se.copy(t[y].prop,b.prop),O.copy(t[y].scoreSet,this.scsList[f],!0))}}else{console.log("**normal form selected**",p);for(let f=0;f<s;f++){let y=!1;p+f>=t.length&&(y=!0);const d=p+f;console.log("->",d);const b=this.formation.items[f];y?this.formation.empty(b):(this.formation.put(b,t[d].ch),se.copy(t[d].prop,b.prop),O.copy(t[d].scoreSet,this.scsList[f],!0))}}let u=0;for(const f of this.formation.items){u++;const y=`${f.itemKey}${u}`;f.ch.idAttributeForHTML=y,f.isEmpty?await this.charEmptyItem(f):await this.charPutItem(f),await this.notifyChangeScore(f,this.scsList[u-1])}}moveLockedFormation(e){let t=Math.floor(e/3);if(t<0||t>3)return null;const s=this.charSummary.sortByScore();if(s===null||s.length===0)return console.log("[moveLockedFormation] sortedChSummary.length === 0"),null;let n=s.length,i=Math.floor(n/e);n%e&&i++;const o=new Array,l=new Array;for(let b=0;b<i;b++)o.push(new Array),l.push(!1);let a=0;for(let b=0;b<i;b++){let E=0;for(;E<e;)a>=n?(o[b].push(-2),s.push(new st)):s[a].prop.fixedType===me.None?o[b].push(-1):o[b].push(a),E++,a++}const r=new Map([[3,[1,1]],[4,[1,2]],[5,[1,2]],[6,[1,2]],[7,[1,3]],[8,[1,3]],[9,[1,3]]]),c=new Map([[3,[2,2]],[4,[3,3]],[5,[3,3]],[6,[3,4]],[7,[4,5]],[8,[4,5]],[9,[4,6]]]),m=new Map([[3,[3,3]],[4,[4,4]],[5,[4,5]],[6,[5,6]],[7,[6,7]],[8,[6,8]],[9,[7,9]]]),p=new Map([[me.Front,r],[me.Center,c],[me.Backend,m]]);function u(b){let E=-1;for(const I of b){if(I<0)continue;if(s[I].prop.fixedType!==me.None){E=I;break}}return E}function f(b){let E=-1;for(const I of b){if(I<0)continue;const $=s[I].prop.fixedType,g=p.get($);if(g===void 0)continue;const T=g.get(e);if(T===void 0)continue;let C=T[0]-1,N=T[1]-1;for(let w=C;w<=N;w++){if(b[w]===-1){E=w;break}if(b[w]===-2){console.log(`[findToIndex] move to space-form(${w})`),E=w;break}}if(E!==-1)break}return E}let y=0,d=0;for(const b of o){for(;;){const E=u(b);if(E===-1)break;const I=f(b);if(I!==-1){console.log(`move from ${E} -> ${d+I}`);const $=b[E%e];s[$].prop.fixedType=me.None,b[E%e]=d+I,b[I]=$,l[y]=!0}}y++,d+=e}return[l,o]}async makeLvwGroup(e){if(e===void 0)return console.log("[makeLvwGroup] not initialized imgLoader"),!1;const t=this.charSummary.sortByScore();if(t===null||t.length===0)return console.log("[makeLvwGroup] sortedChSummary.length === 0"),!1;const s=this.formation.nFormationItem,n=this.moveLockedFormation(s);if(n===null)return console.log("[makeLvwGroup] lockInfo === null"),!1;const i=n[0],o=n[1];console.log("lockInfo",i,o);const l=t.length;let a=Math.floor(l/s);l%s&&a++;const r=new Array;for(let b=0;b<a;b++)r.push(b+1);const c="player",m=new At;let p=0,u=0;for(const b of r){if(i[b-1]){u++;const T=b-1,C=o[T],N=m.makeCheckHeader(`${c}Header`,`Locked Form${b}`,`${u}`),w=new Array;let D=0;for(const X of C){const J=new ps;if(X===-2||X>=l){const Z=this.emptyFile,Q=await e.getImageUrlBy(Z,"");if(Q===null)continue;J.url=Q,J.toolTip=""}else{let Z=X===-1?b-1+D:X;const Q=t[Z],Re=Q.ch,mt=Re.iconFileName,ht=await e.getImageUrlBy(mt,Re.ns);if(ht===null)continue;J.url=ht,J.toolTip=Q.prop.comment+jt.toolTipNewLine+Cs.get(Q.prop.fixedType)}w.push(J),D++}const ne=m.makeImgSubTbl(`${c}SubTbl`,w,`${u}`);m.addGroupPair(N,ne)}u++;const E=m.makeCheckHeader(`${c}Header`,`Form${b}`,`${u}`),I=new Array;let $=0;for(;$<s;){const T=new ps;if(p>=l){const C=this.emptyFile,N=await e.getImageUrlBy(C,"");if(N===null)continue;T.url=N,T.toolTip=""}else{const C=t[p],N=C.ch,w=N.iconFileName,D=await e.getImageUrlBy(w,N.ns);if(D===null)continue;T.url=D,T.toolTip=C.prop.comment}I.push(T),$++,p++}const g=m.makeImgSubTbl(`${c}SubTbl`,I,`${u}`);m.addGroupPair(E,g)}m.makeFooter(),m.setListener(c,this.listCssClassName(),this.listCssClassName()),m.setFontConfig("0.9");const y=document.getElementById(this.dlgContentCssClassName()).getElementsByClassName(this.htmlMakerChSel.defaultToolButtonsCssName),d=this.htmlMakerChSel.GetRect(y[0]);return m.show("0",`${parseInt(d.height)+10}`),m.setSize("350"),m.applyCss(),m.setCheckByRow(At.allRowAction),m.setCheck(),m.selectFirstCell(At.allRowAction),m.enableEvents(this.onNotifyLvg),!0}createFormationBox(e,t,s,n){this.parentName=t;let i=`
<button id="${this.dlgCssClassName()}-tbLeft">←</button>
<button id="${this.dlgCssClassName()}-tbRight">→</button>
`.trim(),o="";this.autoForm&&(o=`
<button id="${this.dlgCssClassName()}-auto">自動選定</button>
${i}
`.trim());let l="";this.editFormEnable&&(l=`
<button id="${this.dlgCssClassName()}-tbput">配置</button>
<button id="${this.dlgCssClassName()}-tbempty">抹消</button>
${i}
`.trim());let a="";this.saveEnable&&(a=`<button id="${this.dlgCssClassName()}-stock">編成保存</button>`);let r=`
${o}
${l}
${a}
`.trim();const c=this.htmlMakerChSel.MakeDefaultToolButtonsHTML(r),m="";let p="";n!==""?p=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${c}
    ${s}
    ${n}
    ${m}
</div>`:p=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${c}
    ${s}
    ${m}
</div>`;const u=new ye;u.title="<"+e+">",u.SetB2Type(He.CopyPaste,this.onCopyPaste),u.SetB4Type(Ae.DialogHide);const f=u.NewDialog(t,this.dlgCssClassName());return u.SetContent(t,p),this.applyCss(),u.EnableEventHandlers(),u.onMoveDone=this.moverOnMoveDone,f}addEventHandlers(e){const t=document.getElementById(`${this.dlgCssClassName()}-auto`);t!==null&&(t.onclick=async()=>{await this.onAutoPut()});const s=document.getElementById(`${this.dlgCssClassName()}-tbput`);s!==null&&(s.onclick=async()=>{await this.onCharPut()});const n=document.getElementById(`${this.dlgCssClassName()}-tbempty`);n!==null&&(n.onclick=async()=>{await this.onCharEmpty()});const i=document.getElementById(`${this.dlgCssClassName()}-tbLeft`);i!==null&&(i.onclick=async()=>{await this.onCharLeft()});const o=document.getElementById(`${this.dlgCssClassName()}-tbRight`);o!==null&&(o.onclick=async()=>{await this.onCharRight()});const l=document.getElementById(`${this.dlgCssClassName()}-stock`);l!==null&&(l.onclick=async()=>{if(this.onStock!==void 0){if(this.selectedItem.ch.ns===z.None)return;const a=this.htmlMakerChSel.FindImgByID(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML),r=new Pt;r.item=this.selectedItem,r.selectedImg=a===null?"":a.src;const c=this.findPropSelectedPos();c!==-1&&(r.scoreSet=this.scsList[c]),await this.onStock(r)}})}addItemEventkHandlers(e,t,s,n){this.onStock=s,this.onPut=e,this.onEmpty=t,this.onPropChanged=n;const i=this.htmlMakerChSel.GetIdByIndex(0);if(this.htmlMakerChSel.SelectByID(this.itemCssClassName(),i),this.htmlMakerChSel.enableEvents(this.itemCssClassName()),this.enableScoreEvent===!0){let o=0;for(const l of this.formation.items){o++;const a=`${this.propItemCssClassName()}-${o}`;this.htmlMakerProp.EnableId(a,!1)}this.htmlMakerProp.enableEvents(this.propCssClassName())}this.setSelectedItem(i)}async onAutoPut(){await this.autoFormation()}async notifyChangeForm(){for(const e of this.formation.items)await this.notifyChangeFormItem(e)}async notifyChangeFormItem(e){e.isEmpty?await this.notiftyOnEmpty(e):await this.notiftyOnPut(e,e.ch.iconFileName)}async notiftyOnPut(e,t){const s=new Pt;return s.uiName=this.formation.uiInfo.name,s.item=e,s.selectedImg=t,await this.onPut(s),s}async notiftyOnEmpty(e){const t=new Pt;return t.uiName=this.formation.uiInfo.name,t.item=e,t.selectedImg=this.emptyFile,await this.onEmpty(t),t}async notifyChangeScore(e,t){const s=new un;s.uiName=this.parentName,s.item=e,s.values=e.values,s.scoreConfigSet=t,await this.onPropChanged(s)}async onCharPut(){if(this.onPut!==void 0){this.selectedItem.isEmpty=!1;const e=await this.notiftyOnPut(this.selectedItem,"");this.formation.put(this.selectedItem,e.selectCh),this.replaceCharImg(this.selectedItem.ch.idAttributeForHTML,e.selectedImg,this.selectedItem.ch.name),this.propSelectedEnabled(!0)}}async onCharEmpty(){if(this.onEmpty!==void 0){this.selectedItem.isEmpty=!0;const e=await this.notiftyOnEmpty(this.selectedItem);this.formation.empty(this.selectedItem),this.replaceCharImg(this.selectedItem.ch.idAttributeForHTML,e.selectedImg,""),this.propSelectedEnabled(!1);const t=this.findPropSelectedPos();t!==-1&&(this.scsList[t]=new O)}}async onCharLeft(){this.canSwap(1)&&await this.formSwap(-1)}async onCharRight(){this.canSwap(this.formation.nFormationItem)&&await this.formSwap(1)}canSwap(e){return!(this.selectedItem===void 0||this.selectedItem.isEmpty===!0||this.selectedItem.itemID===e)}async formSwap(e){const t=this.selectedItem,s=t.itemID-1,n=s+e,i=this.formation.items[n],o=t.ch.idAttributeForHTML,l=i.ch.idAttributeForHTML,a=this.scsList[s],r=this.scsList[n],c=this.itemCssClassName(),m=this.htmlMakerChSel.FindImgByID(c,o),p=this.htmlMakerChSel.FindImgByID(c,l);if(m!==null&&p!==null){this.htmlMakerChSel.SwapImgSrcAndPairToolTip(m,p);const u=`${i.itemKey}${i.itemID}`;this.htmlMakerChSel.UnselectAll(c),this.htmlMakerChSel.SelectByID(c,u),this.formation.items[s]=i,this.formation.items[n]=t,this.formation.items[s].ch.idAttributeForHTML=o,this.formation.items[n].ch.idAttributeForHTML=l,this.scsList[s]=r,this.scsList[n]=a,this.setSelectedItem(u);const f=this.formation.items[n],y=this.formation.items[s];this.enableScoreEvent&&(this.propAutoEnabled(f),this.propAutoEnabled(y)),await this.notifyChangeFormItem(f),await this.notifyChangeFormItem(y),this.notifyChangeScore(f,this.scsList[s]),this.notifyChangeScore(y,this.scsList[n])}}async charPutItem(e){const t=await this.notiftyOnPut(e,e.ch.iconFileName);this.replaceCharImg(e.ch.idAttributeForHTML,t.selectedImg,e.prop.comment)}async charEmptyItem(e){const t=await this.notiftyOnEmpty(e);this.replaceCharImg(e.ch.idAttributeForHTML,t.selectedImg,"")}replaceCharImg(e,t,s){this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),e,t),this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(),e,s)}propSelectedEnabled(e){const t=this.findPropSelectedPos();if(t!==-1){const s=`${this.propItemCssClassName()}-${t+1}`;this.htmlMakerProp.EnableId(s,e)}}propAutoEnabled(e){const t=!e.isEmpty,s=`${this.propItemCssClassName()}-${e.itemID}`;this.htmlMakerProp.EnableId(s,t)}setOptionItem(e,t){const s="ステータス選定";let n=new Array,i="";for(const[r,c]of bs){const m=`${c.displayText}/${r}`;n.push(m),e.autoScoreType===r&&(i=r)}const o=new nt;o.selectionPair=n,o.selectedItem=i,o.classify=v.cmAutoScore;const l=new ge;l.makeItems(),l.items[0].typeInfo.setCombo(o),l.items[0].className="";const a=new hs;a.key=v.cmAutoScore,a.text=s,a.value=l,t.push(a)}makeFlyoutGrid(e,t){if(this.scoreGrid!==null)return;this.editingIndex=t,this.savedOpt=new Me,Me.copy(this.formationOptList[t],this.savedOpt),this.savedScoreSet=new O,O.copy(e,this.savedScoreSet,!0);const s=Jt(),n=new Array;this.setOptionItem(this.formationOptList[t],n);for(const p of e.items){const u=new nt;u.selectionPair=p.selectionPair,u.selectedItem=p.selectedVal,u.classify=p.key;const f=new ge;f.makeItems(),f.items[0].typeInfo.setCombo(u),f.items[0].className="";const y=new hs;y.key=p.key,y.text=s.convTitle(p.title),y.value=f,n.push(y)}const i=t+1,o=new Os;if(o.setGridtems(n),o.setListener(`${this.gridName}-${i}`,`${this.propItemCssClassName()}-${i}`,this.dlgContentCssClassName(),`${this.gridHeaderName}-${i}`,`${this.gridFooterName}-${i}`),o.setVisible(!0),o.setFontConfig("0.8"),o.setSize("190","200"),o.applyCss(),o.enableEvents(this.onScoreValueSelect),this.scoreGrid=o,this.scoreGrid.footerElem!==null){let p=`
<button id="${this.gridFooterName}-okBtn">OK</button>
<button id="${this.gridFooterName}-canBtn">CANCEL</button>
`.trim();this.scoreGrid.footerElem.innerHTML=p,document.getElementById(`${this.gridFooterName}-okBtn`).onclick=this.onOkClickScoreGrid,document.getElementById(`${this.gridFooterName}-canBtn`).onclick=this.onCancelClickScoreGrid}const l=document.getElementById(this.dlgContentCssClassName()),a=this.htmlMakerChSel.GetRect(l),r=this.htmlMakerChSel.FindDivByClassName(this.parentName,this.propCssClassName());this.htmlMakerChSel.GetRect(r);const c=this.htmlMakerChSel.FindDivByClassName(this.parentName,this.listCssClassName()),m=this.htmlMakerChSel.GetRect(c);o.show(`${parseInt(m.left)-parseInt(a.left)+t*100+5}`,`${parseInt(m.top)-parseInt(a.top)+parseInt(m.height)+5}`)}disposeScorGrid(){this.scoreGrid!==null&&(this.scoreGrid.dispose(),this.scoreGrid=null),this.editingIndex=-1}findPropSelectedPos(){const e=this.htmlMakerChSel.FindDivByClassName(this.dlgContentCssClassName(),this.propCssClassName());if(e!==null&&e.className.startsWith(this.propCssClassName())){let t=-1;for(const s of this.formation.items)if(t++,s===this.selectedItem)return console.log(`pos=${t}`),t}return-1}setSelectedItem(e){const t=this.formation.items.find(s=>e===s.ch.idAttributeForHTML);t&&(this.selectedItem=t)}enableLazyImages(e){this.htmlMakerChSel.initObserver(this.dlgCssClassName(),e)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}propCssClassName(){return`${this.listName}-prop`}propItemCssClassName(){return`${this.listName}-prop-item`}lblCssClassName(){return`${this.listName}-lbl`}listCssClassName(){return`${this.listName}-list`}dlgContentCssClassName(){return`${this.parentName}-dlg-content`}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=this.propCssClassName(),i=this.propItemCssClassName();this.lblCssClassName();const o=parseInt(this.formation.uiInfo.left),l=parseInt(this.formation.uiInfo.top),a=100,r=document.createElement("style");r.textContent=`
${this.htmlMakerChSel.MakeDefaultDialogParentCss(this.parentName,o,l)}
${this.htmlMakerChSel.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgContentCssClassName()} {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

${this.htmlMakerChSel.MakeDefaultNonScrollCss(this.parentName,500)}
${this.htmlMakerChSel.MakeDefaultGridColCss(e,a,5,a*5)}

${this.htmlMakerChSel.MakeDefaultItemimgCss(t,s,a,a)}
${this.htmlMakerChSel.MakeDefaultSelectionCss(t)}

${this.htmlMakerChSel.MakeDefaultGridColCss(n,a,5,a*5)}
${this.htmlMakerChSel.MakeDefaultItemJustifyCenterCss(i,a,30)}

${this.htmlMakerChSel.MakeDefaultToolButtonsCss()}
${this.htmlMakerChSel.MakeDefaultButtonsCss()}
.${i} {
  width: 100%;
  ${L.footerButtonText()}
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
${L.footerButtonText()}
}
`.trim(),document.head.appendChild(r);const c=document.getElementById(this.parentName);this.htmlMakerChSel.copyCssToInlineStyle(`.${this.parentName}`,c)}}class Pt{constructor(){this.cancel=!1}}class un{constructor(){this.uiName="",this.cancel=!1}}class lt{constructor(){this.ch=new pe,this.prop=new se,this.isEmpty=!0,this.TextMap=""}static toJsonText(e){const t=pe.toJsonInst(e.ch);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new lt;t.ch=pe.toJsonInst(e.ch),se.copy(e.prop,t.prop),t.isEmpty=e.isEmpty;const s=Object.fromEntries(e.details.TextMap);return t.TextMap=JSON.stringify(s,null,2),t}static fromJsonInst(e){const t=new xs;t.ch=pe.fromJsonInst(e.ch),se.copy(e.prop,t.prop),t.isEmpty=e.isEmpty;const s=new Map(Object.entries(JSON.parse(e.TextMap)));return t.details.TextMap=s,t}}class Ee{static toJsonText(e,t,s){const n=Ee.toJsonInst(e,t,s);return JSON.stringify(n,null,2)}static toJsonInst(e,t,s){const n=new Ee;n.items=new Array,n.scsList=new Array,n.formationOptList=new Array;for(const i of e.items)n.items.push(lt.toJsonInst(i));for(const i of t)n.scsList.push(i);if(s===void 0)console.log(`[FormationSetJson::toJsonInst] optList === undefined (${e.uiInfo.name})`);else for(const i of s)n.formationOptList.push(i);return n}static fromJsonInst(e){const t=new qt;t.items=new Array;for(const s of e.items)t.items.push(lt.fromJsonInst(s));return t}}class wt{constructor(){this.chName="",this.autoScoreType=Ne.None}static copy(e,t){t.chName=e.chName,t.autoScoreType=e.autoScoreType}}class Kt{constructor(e,t,s=!0,n){this.isEmpty=!0,this.allAvailable=!1;const i=new we;i.ns=e.ns,i.id=e.id,i.name=e.name,this.ch=i;const o=new wt;wt.copy(t,o),this.prop=o,this.isEmpty=s,this.scoreSet=n}get score(){let e=0;if(this.prop.autoScoreType===Ne.None)e=Math.ceil(this.scoreSet.stdScore);else{const t=bs.get(this.prop.autoScoreType),s=t===void 0?1:t.ratio;e=Math.ceil(this.scoreSet.maxScore*s)}return e}static copy(e,t){t.ch.ns=e.ch.ns,t.ch.id=e.ch.id,t.ch.name=e.ch.name,wt.copy(e.prop,t.prop),t.isEmpty=e.isEmpty,t.scoreSet=new O,O.copy(e.scoreSet,t.scoreSet,!0)}}class ts{Add(e){if(e===void 0){console.log("[VersusGroupRow::Add] scItem === undefined");return}this.columns===void 0&&(this.columns=[]),this.columns.push(e)}Count(){return this.columns.length}debug(){if(this.columns===void 0){console.log("[VersusGroupRow::debug] this.columns === undefined");return}console.log("**VersusGroupRow**",this.columns)}}ts.defNumColumn=5;class ss{Add(e){this.groupRows===void 0&&(this.groupRows=[]),this.groupRows.push(e)}Count(){return this.groupRows.length}debug(){if(this.groupRows===void 0)console.log("this.groupRows === undefined");else for(const e of this.groupRows)e.debug()}async loadJson(e){const n=(await new rt().loadJson(e)).groupRows.map(o=>Object.assign(new ts,o)),i=new ss;return i.groupRows=n,i}}const xe={None:"None",Player:"Player",Enemy:"Enemy"},be={None:"None",Attr:"Attr",Role:"Role"},xt={HiLv:"HiLv"},re={Likely:"Likely",Uncertain:"Uncertain",Wishful:"Wishful"};class vt{}vt.Likely=.9;vt.Uncertain=.64;class Wt{constructor(){this.scoreItems=[],this.formationType=xe.None,this.boost=0}get imgPrefix(){return this.formationType===xe.Player?"ftPlayer":"ftEnemy"}get judgeWidth(){return 48}setScoreItems(e){if(e!==void 0){this.scoreItems=new Array;for(const t of e){const s=new Kt(t.ch,t.prop,t.isEmpty,t.scoreSet);this.scoreItems.push(s)}}}async toCharHTML(e,t){const s=t.isEmpty?e.demoMaterial:t.ch.iconFileName,n=t.ch.ns===z.None?"":t.ch.ns,i=await e.getImageUrlBy(s,n);let o=this.scoreToolTip(t);return o!==""&&(o=`title="${o}"`),`
<img class=${this.charCssClassName()}
  src="${i}"
  ${o}>
`.trim()}scoreToolTip(e){return e.isEmpty?"":`${e.prop.chName}
score=${e.score}`}async toJudgeHTML(e,t){const s=this.toJudgeFileURL(e,t);return`<img class=${this.judgeCssClassName()} src="${s}" width="48">`}async toJudgeFileURL(e,t){let s=null;switch(t){case re.Likely:s=await e.getImageUrlBy("win.png",e.AnyNs);break;case re.Uncertain:s=await e.getImageUrlBy("even.png",e.AnyNs);break;case re.Wishful:s=await e.getImageUrlBy("lost.png",e.AnyNs);break;default:return""}return s}charCssClassName(){return"combat-char"}judgeCssClassName(){return"combat-judge"}get combatScore(){if(this.scoreItems===void 0)return 0;const e=this.scoreItems.reduce((s,n)=>n.isEmpty?s:s+n.score,0),t=this.boost===0?1:this.boost;return Math.ceil(e*t/100)}get checkNsCombo(){if(this.scoreItems===void 0){console.log(`[checkNsCombo] scoreItems undefined (${this.formationType})`);return}const e=Array();for(const i of this.scoreItems){if(i.isEmpty||i.ch.ns===z.None)continue;const o=new Kt(i.ch,i.prop,i.isEmpty,i.scoreSet);e.push(o)}if(e.length==0){console.log(`[checkNsCombo] no scoreItems (${this.formationType})`);return}let t=z.None,s=0;const n=new Map;for(const i of e){if(t===z.None){t=i.ch.ns,s=1;continue}if(t!==i.ch.ns){t=i.ch.ns,s=1;continue}s++,s>=2&&(n.has(t),n.set(t,s))}return console.log(`**checkNsCombo::${this.formationType}**`),console.log(n),n}calcNsScore(e){const t=this.checkNsCombo;if(t===void 0)return 0;let s=0;for(const[n,i]of t){if(!e.has(i))continue;const o=e.get(i);o!==void 0&&(s+=o)}return s}calcGmScore(e){let t=0;for(const[s,n]of this.gmComboKeywords)e.has(n)&&(t+=e.get(n));return t}}class dn{constructor(){this.hasCombo=!1,this.winRate=new Map}setPlayer(e){e.formationType=xe.Player,this.player=e}setEnemy(e){e.formationType=xe.Enemy,this.enemy=e}judge(e){const s=this.winRate.get(e);return s>=vt.Likely?re.Likely:s>=vt.Uncertain?re.Uncertain:re.Wishful}judgeForEnemy(e){switch(e){case re.Likely:return re.Wishful;case re.Uncertain:return re.Uncertain;case re.Wishful:return re.Likely}}}class fn{constructor(){this.uiInfo=new ze,this.combatPairs=new Map,this.gameConfig=void 0,this.guide=void 0,this.emptyFile="plus.png",this.parentName="",this.tableName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new B().SaveSetting(e),this.requestActivate!==void 0&&await this.requestActivate(e)},this.onGuide=async(e,t,s)=>{if(this.guide!==void 0){this.guide.setVisible(!this.guide.getVisible());return}const n=this.parentName,i=new Map,o=new us;o.value.makeItems(1),o.value.items[0].typeInfo.setLabel("NS : 0",!1),o.value.items[0].className=`${n}-guide-ns`,i.set("ns",o);const l=new us;l.value.makeItems(1),l.value.items[0].typeInfo.setLabel("GM : 0",!1),l.value.items[0].className=`${n}-guide-gm`,i.set("gm",l);const a=this.htmlMaker.GetRect(e.parentElement),r=this.htmlMaker.GetRect(s),c=new Gs;c.setGuidetems(i),c.setListener(`${n}-guide`,n,`${n}-guide`),c.setFontConfig("0.7"),c.applyCss(),c.enableOverlay(!1),c.show(`${parseInt(r.left)-parseInt(a.left)+34}`,"0"),this.guide=c,this.updateGuide()}}setPair(e,t){this.combatPairs.set(e,t)}calcCombatScore(){for(const[e,t]of this.combatPairs){if(t.player===void 0||t.enemy===void 0)continue;const s=[be.None,be.Attr,be.Role];for(const n of s){let i=t.player.combatScore,o=t.enemy.combatScore;if(this.gameConfig!==void 0){console.log("** NS combo checking ... **");const l=t.player.checkNsCombo,a=t.enemy.checkNsCombo,r=this.gameConfig.nsComboScoreList,c=this.gameConfig.gameComboScoreList;if(r.size===0&&console.log("** NS score disable or empty **"),c.size===0&&console.log("** GM score disable or empty **"),l!==void 0){let m=t.player.calcNsScore(r);console.log(`** player nsScoreAdd : ${m} **`),i+=m}if(a!==void 0){let m=t.enemy.calcNsScore(r);console.log(`** enemy nsScoreAdd : ${m} **`),o+=m}if(this.gameConfig.gameComboAvail>=1){let m=t.player.calcGmScore(c),p=t.enemy.calcGmScore(c);console.log(`** player gmScore : ${m} **`),console.log(`** enemy  gmScore : ${p} **`),i+=m,o+=p}}else console.log("** NS combo skipped **");t.winRate.set(n,o!==0?i/o:1)}}}async replaceChar(e,t,s,n,i){const o=this.combatPairs.get(e);let l;if(t===xe.Player?l=o?.player:t===xe.Enemy&&(l=o?.enemy),l===void 0)return!1;const a=s.itemID;if(a<0)return!1;const r=a-1;l=l;const m=`${l.imgPrefix}${a}`,p=l.scoreItems[r],u=p.ch;let f="";s.isEmpty?(u.id=0,u.name="",f=i.demoMaterial,console.log("[replaceChar] set empty")):(u.id=n.id,u.name=n.name,f=u.iconFileName,console.log(`[replaceChar] set char ${n.id}:${n.name}`)),p.isEmpty=s.isEmpty;const y=u.ns===z.None?"":u.ns,d=await i.getImageUrlBy(f,y);if(d===null)return!1;const b=new A,E=this.outerCssClassName();return b.ReplaceImg(E,m,d),!0}async replaceJudge(e){async function t(i,o){const l=await i.toJudgeFileURL(e,o);if(l===null)return;const a=i.imgPrefix;for(let r=0;r<i.scoreItems.length;r++){const c=`${a}${r+1}`,m=s.FindImgsByID(n,c);if(m===null||m.length<=1){console.error("fail on judge marker");continue}const p=m[1];s.SetImgSrc(p,l),i.scoreItems[r].isEmpty?s.SetImgSize(p,0,0):s.SetImgSize(p,i.judgeWidth,i.judgeWidth);const u=i.scoreItems[r];s.ReplaceImgToolTip(n,c,i.scoreToolTip(u))}}const s=new A,n=this.outerCssClassName();for(const[i,o]of this.combatPairs){if(o.player===void 0||o.enemy===void 0)continue;const l=[be.None,be.Attr,be.Role];for(const a of l){if(a!==be.None)continue;const r=o.judge(a),c=o.judgeForEnemy(r);await t(o.player,r),await t(o.enemy,c)}}}async updateGuide(){if(this.guide===void 0||this.gameConfig===void 0||this.combatPairs.has(xt.HiLv)===!1)return;const e=this.combatPairs.get(xt.HiLv);if(e===void 0)return;const t=e.player.checkNsCombo,s=e.enemy.checkNsCombo,n=this.gameConfig.nsComboScoreList,i=this.gameConfig.gameComboScoreList;let o=0;t!==void 0&&(o=e.player.calcNsScore(n));let l=0;s!==void 0&&(l=e.enemy.calcNsScore(n));let a=0,r=0;this.gameConfig.gameComboAvail>=1&&(a=e.player.calcGmScore(i),r=e.enemy.calcGmScore(i)),this.guide.setTextByKey("ns",`NSコンボ：P=${o} vs E=${l}`),this.guide.setTextByKey("gm",`GMコンボ：P=${a} vs E=${r}`)}async toHTML(e,t){this.tableName=e;const s=document.createElement("table");s.className=e,s.id=e;const n=document.createElement("tbody");s?.appendChild(n);async function i(l,a){const r=document.createElement("tr");n?.appendChild(r);const c=await a.toJudgeHTML(t,l),m=a.imgPrefix;let p=0;for(const u of a.scoreItems){p++;const f=await a.toCharHTML(t,u),y=`
<div class=${o} item-id="${m}${p}">
  ${f}
  ${c}
</div>
`.trim(),d=document.createElement("td");d.innerHTML=y,r.appendChild(d)}}const o=this.outerCssClassName();for(const[l,a]of this.combatPairs){const r=a.judge(be.None),c=a.judgeForEnemy(r);await i(r,a.player),await i(c,a.enemy)}return s.outerHTML}createCombatBox(e,t,s){this.parentName=t,this.htmlMaker=new A;const n=`<div class="${this.parentName}-dlg-content">
    ${s}
</div>`,i=new ye;i.title="<"+e+">";const o=i.NewDialog(t,this.dlgCssClassName());return i.SetGuide(Qe.Guide,this.onGuide),i.SetContent(t,n),this.applyCss(),i.EnableEventHandlers(),i.onMoveDone=this.moverOnMoveDone,o}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}outerCssClassName(){return"combat-outer"}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const e=new Wt,t=`.${this.outerCssClassName()}`,s=`.${e.charCssClassName()}`,n=`.${e.judgeCssClassName()}`,i=parseInt(this.uiInfo.left),o=parseInt(this.uiInfo.top),l=document.createElement("style");l.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,i,o)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.parentName}-dlg-content {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}
.${this.tableName} {
${L.spacingTable}
}
.${this.tableName} tr {
${L.spacingTr}
}
${t} {
  position: relative;
  width: 100px;
  height: 100px;
}
${t} ${s} {
  width: 100px;
  height: 100px;
}
${t} ${n} {
  position: absolute;
  width: 48px;
  height: 48px;
  right: 0;
  bottom: 0;
}
`.trim(),document.head.appendChild(l);const a=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,a)}}const We={Unknown:"Unknown",Success:"Success",Fail:"Fail",Cancel:"Cancel"};async function ys(h){const e=h.isWebRunning,t=h.currentUserHome,s=h.chStatusListFile,n=h.chListFile,i=new nn,o=new A,l="splash-screen";o.initFullScreen(l,"エボナ データベース初期化中..."),o.applyFullScreenCss(l);const a=o.getFullScreenMsgElem(l),r=a!==null?a.innerHTML:"",m=await new es().LoadList(n);let p;if(t===h.user1Home){p=[{ns:z.CnsRed,nsName:"赤属性"},{ns:z.CnsBlue,nsName:"青属性"},{ns:z.CnsGreen,nsName:"緑属性"},{ns:z.CnsYellow,nsName:"黄属性"},{ns:z.CnsViolet,nsName:"紫属性"}];for(const k of p)a!==null&&(a.innerHTML=`${r} ${k.nsName}`),await i.setupNs(k.ns,h,m)}if(t===h.user2Home){p=[{ns:z.CnsBlue,nsName:"藍属性"},{ns:z.CnsRed,nsName:"紅属性"},{ns:z.CnsGreen,nsName:"翠属性"},{ns:z.CnsYellow,nsName:"黄属性"},{ns:z.CnsWhite,nsName:"天属性"},{ns:z.CnsBlack,nsName:"冥属性"}];for(const k of p)a!==null&&(a.innerHTML=`${r} ${k.nsName}`),await i.setupNs(k.ns,h,m)}let u;u=await h.loadGameConfig(h.gameType),console.log(u),h.onGameConfigChanged=async k=>{k.receivedBool===!0&&(console.log("onGameConfigChanged"),console.log(k.receivedBool),u=await h.loadGameConfig(h.gameType),console.log(u),await rs())},h.startBcHelper(),a!==null&&(a.innerHTML="UI 初期化中 ...");const f=new Bt,y=new Lt;await y.loadDB(s),y.charSpecSet=m,await y.loadAuxScoreSet(h.gameType);async function d(){const k=new ln;k.chSet=m,k.uiInfo.name="charListArea",k.uiInfo.left="300",k.uiInfo.top="100";const S=k.uiInfo.name,K=await k.toHTML(i);if(e){const M="キャラ選択",x=k.createSelectorBox(M,S,K);k.addEventHandlers(x),k.addItemEventHandlers(),k.enableLazyImages(i),x.show();const V=new de;V.setAsDlg(x,M),f.add(V)}return k}const b=await d();async function E(){const k=new Ss;await k.load(),k.uiInfo.name="CharSummary",k.uiInfo.left="400",k.uiInfo.top="100";const S=k.uiInfo.name,K=await k.toHTML();if(e){const M="キャラ一覧",x=k.createSummaryBox(M,S,K);k.addEventHandlers(x,async U=>{U.selectCh=b.selectedCh;const j=await i.getImageUrlBy(b.selectedCh.iconFileName,b.selectedCh.ns);if(j===null)U.selectedImg="",U.cancel=!0;else{U.selectedImg=j,U.cancel=!1;const q=await y.getStatus(b.selectedCh.idAsText);U.scoreSet=q}console.log(`selected ch = ${U.selectCh.name}`)}),await k.createCharSummaryNodes(i,p),k.enableLazyImages(i),x.show();const V=new de;V.setAsDlg(x,M),f.add(V)}return k}const I=await E();async function $(k,S,K,M){const x=new hn;k===g&&(x.InitForPlayer(I),x.autoForm=!0,x.editFormEnable=!1,x.saveEnable=!1,x.imgLoader=i),k===T&&(x.InitForEnemy(y),x.autoForm=!1,x.editFormEnable=!0,x.saveEnable=!0),x.formation.uiInfo.name=k,x.formation.uiInfo.left=`${S}`,x.formation.uiInfo.top=`${K}`;const V=x.formation.uiInfo.name,U=await x.toHTML(V),j=k===T?x.toGridHTML():"";if(e){const q=x.createFormationBox(M,V,U,j);x.addEventHandlers(q),x.addItemEventkHandlers(async P=>{let ie="",Ht="";P.selectedImg===""?(ie=b.selectedCh.iconFileName,Ht=b.selectedCh.ns,P.selectCh=b.selectedCh):(ie=P.item.ch.iconFileName,Ht=P.item.ch.ns,P.selectCh=P.item.ch);const cs=await i.getImageUrlBy(ie,Ht);cs!==null&&(P.selectedImg=cs,P.item.isEmpty=!1,as(P.uiName,P.item,P.selectCh))},async P=>{const ie=await i.getImageUrlBy(P.selectedImg,b.selectedCh.ns);ie!==null&&(P.selectedImg=ie,P.item.isEmpty=!0,as(P.uiName,P.item,P.selectCh))},async P=>{console.log(`selected ch = ${P.item.ch.name}`)},async P=>{await rs()}),x.enableLazyImages(i),q.show();const he=new de;he.setAsDlg(q,M),f.add(he)}return x}const g="playerForm",T="enemyForm",C=await $(g,100,100,"自編成"),N=await $(T,100,200,"敵編成");async function w(k,S,K,M){D.uiInfo.name=k,D.uiInfo.left=`${S}`,D.uiInfo.top=`${K}`;const x=await D.toHTML("combatTable",i),V=D.createCombatBox(M,k,x);D.enableLazyImages(i),await D.replaceJudge(i),V.show();const U=new de;U.setAsDlg(V,M),f.add(U)}const D=new fn;await ls(),await w("combatForm",120,300,"対戦予想");const ne="保存";new de().setAsMenu(ne);const X="復帰";new de().setAsMenu(X);const J="設定";{const k=new de;k.setAsMenu(J),f.add(k)}let ce=null;const Z=await f.toHTML("dockForm",i);if(e){const k=f.createDockBox("dockForm",Z);f.addItemClickHandlers(async S=>{if(f.stdApplyAction(S)!==!1&&S.item.isMenuType&&(S.item.toolTip===ne&&await ht(),S.item.toolTip===X&&await Ms(async M=>{if(console.log(`[loadedResult] ${M}`),M!==We.Success)return;const x=Ee.fromJsonInst(ut),V=Ee.fromJsonInst(dt);ut=null,dt=null,await C.Setup(x,i),await N.Setup(V,i)}),S.item.toolTip===J)){const M=h.editorURL;window.open(M,M)}}),f.enableLazyImages(i),k.show(),ce=k}const Q="playerForm.json",Re="enemyForm.json",mt="dockForm.json";async function ht(){f.InitZOrder(ve);const k=Ee.toJsonText(C.formation,C.scsList,C.formationOptList),S=Ee.toJsonText(N.formation,N.scsList,N.formationOptList),K=St.toJsonText(f),M=new window.JSZip;M.file(Q,k),M.file(Re,S),M.file(mt,K);const x=await M.generateAsync({type:"blob"}),V="gameConfig.zip",U=URL.createObjectURL(x),j=document.createElement("a");j.href=U,j.download=V,j.click(),URL.revokeObjectURL(U),console.log("saved!")}let ns=null,ut=null,dt=null;async function Ms(k){const S=document.createElement("input");return S.type="file",S.accept=".zip",S.addEventListener("cancel",()=>(console.log("Cancelled."),We.Cancel)),S.addEventListener("change",async()=>{if(S.files.length==1){console.log("File selected: ",S.files[0].name);const M=await S.files[0].arrayBuffer(),V=await new window.JSZip().loadAsync(M);async function U(q){const he=V.file(q);if(he){const P=await he.async("string"),ie=JSON.parse(P);return console.log(ie),ie}}{const q=await U(mt);q&&(ns=q)}{const q=await U(Q);q&&(ut=q)}{const q=await U(Re);q&&(dt=q)}const j=ns!==null&&ut!==null&&dt!==null?We.Success:We.Fail;k(j)}}),S.click(),We.Unknown}const ve=new B;e&&(ve.AddDialogs(),ve.AssignIndexies(),await ve.LoadAllSetting(),await ve.loadSetting(ce),f.InitZOrder(ve),await ve.ForEachAsync(k=>{const S=ye.FindDialogParent(k);return S!==null&&(h.isLocal||k==="charListArea"?S.hidden=!1:S.hidden=h.evonaType!==ue.Full),!0}),ce!==null&&(ce.parentElement.hidden=h.evonaType!==ue.Full)),await I.showCharSummaryNodes(),o.hideFullScreenCss(l),b.requestActivate=Je,I.requestActivate=Je,C.requestActivate=Je,N.requestActivate=Je,D.requestActivate=Je;async function Je(k){console.log(`[${k.className}] requestActivate`),f.activateItem(k)}function is(k){const S=new ss,K=new ts,M=k.formation;M.uiInfo.name,M.uiInfo.name,k.scsList===void 0&&console.log(`[${k.formation.uiInfo.name}] 対戦予想結果の作成は工事中です`);let x=0;for(const V of M.items){if(k.scsList===void 0)continue;let U=!0;(k.formationOptList===void 0||k.formationOptList!==void 0&&k.formationOptList.length<1)&&(U=!1,M.uiInfo.name===T&&console.log(`[${k.formation.uiInfo.name}] 敵編成の「スコアの自動選定」は工事中です`));const j=k.scsList[x];if(j.ns===z.None){const ie=V.ch.ns;j.ns=ie,console.log(`[toScoreRes] set ns (${k.formation.uiInfo.name}::${V.ch.name}) : None -> ${ie}`)}let q=Ne.None;U&&(q=k.formationOptList[x].autoScoreType),x++;const he=new wt;he.chName=V.prop.comment,he.autoScoreType=q;const P=new Kt(V.ch,he,V.isEmpty,j);P.allAvailable=j.allAvailable,K.Add(P)}return S.Add(K),S.debug(),S}function os(k){const S=new Array,K=k.formation;for(const M of K.items)M.isEmpty!==!0&&M.ch.ns!==z.None&&S.push(`${M.ch.id}`);return S}async function ls(){D.gameConfig=u;const k=is(C),S=is(N),K=os(C),M=os(N),x=await y.getComboKeywords(K),V=await y.getComboKeywords(M),U=new Wt;U.setScoreItems(k.groupRows[0].columns),U.gmComboKeywords=x,U.boost=100;const j=new Wt;j.setScoreItems(S.groupRows[0].columns),j.gmComboKeywords=V,j.boost=100;const q=new dn;q.setPlayer(U),q.setEnemy(j),D.setPair(xt.HiLv,q),D.calcCombatScore();for(const[he,P]of D.combatPairs){const ie=P.judge(be.None);console.log(`judge=[${ie}]`)}}async function as(k,S,K){const M=xt.HiLv;D.combatPairs.get(M),k===g&&await D.replaceChar(M,xe.Player,S,K,i),k===T&&await D.replaceChar(M,xe.Enemy,S,K,i),await D.replaceJudge(i),await D.updateGuide()}async function rs(){await ls(),await D.replaceJudge(i),await D.updateGuide()}}async function pn(h){if(!h.isWebRunning)return;const e=h.isWebRunning;console.log(`mode=${h.edit}`);const t=new Bt;async function s(){const y=ae.Resource,d=new Ft;d.init(),d.setConfig(js()),await d.load(y,Y.none),d.uiInfo.name="ResourceEdit",d.uiInfo.left="110",d.uiInfo.top="10";const b=d.uiInfo.name,E=await d.toHTML(Xs());if(e){const I=document.createElement("div");I.id=d.uiInfo.name,I.className=d.uiInfo.name,document.body.appendChild(I);const $="文字列リソース",g=d.createEditorBox($,b,E);d.addEventHandlers(g),d.addItemEventHandlers(),g.show(),d.enableResize();const T=new de;T.setAsDlg(g,$),t.add(T)}return d}async function n(){const y=ae.GameUI,d=new Ft;d.initNumItems=5,d.canAdd=!1,d.init(),d.setConfig(Es()),await d.load(y,Y.none),d.uiInfo.name="GameEdit",d.uiInfo.left="110",d.uiInfo.top="10",d.uiInfo.height="235";const b=d.uiInfo.name,E=await d.toHTML(_s());if(e){const I=document.createElement("div");I.id=d.uiInfo.name,I.className=d.uiInfo.name,document.body.appendChild(I);const $="ゲーム設定",g=d.createEditorBox($,b,E);d.addEventHandlers(g),d.addItemEventHandlers(),g.show(),d.enableResize();const T=new de;T.setAsDlg(g,$),t.add(T)}return d}async function i(){const y=ae.ScoreUI,d=new Ft;d.init(),d.setConfig(Ys(h.gameType)),await d.load(y,h.edit),d.uiInfo.name="ScoreEdit",d.uiInfo.left="110",d.uiInfo.top="100";const b=d.uiInfo.name,E=await d.toHTML(Qs());if(e){const I=document.createElement("div");I.id=d.uiInfo.name,I.className=d.uiInfo.name,document.body.appendChild(I);const $="スコア設定",g=d.createEditorBox($,b,E);d.addEventHandlers(g),d.addItemEventHandlers(),g.show(),d.enableResize();const T=new de;T.setAsDlg(g,$),t.add(T)}return d}const o=await s();o.startAutoSave();const l=await n();l.startAutoSave(),l.onSaved=async y=>{h.startBcHelper(),h.notifyGameConfigChanged()};const a=await i();a.startAutoSave();const r=document.createElement("div"),c="dockEdit";r.id=c,r.className=c,document.body.appendChild(r);let m=null;const p=await t.toHTML(c,null);if(e){const y=t.createDockBox(c,p);t.addItemClickHandlers(async d=>{t.stdApplyAction(d)}),y.show(),m=y}const u=new B;e&&(u.AddDialogs(),u.AssignIndexies(),await u.LoadAllSetting(),await u.loadSetting(m),t.InitZOrder(u),await u.ForEachAsync(y=>{const d=ye.FindDialogParent(y);return d!==null&&(y!=="ResourceEdit"?d.hidden=!1:d.hidden=!0),!0}),m!==null&&(m.parentElement.hidden=!1)),o.requestActivate=f,l.requestActivate=f,a.requestActivate=f;async function f(y){console.log(`[${y.className}] requestActivate`),t.activateItem(y)}}const G=new rt,vs=G.isWebRunning;vs?(yn(),G.parseURLParams(),G.currentUserHome===""&&G.setUser(G.user1Home)):G.setUser(G.user2Home);let ct=window.EVONA_CONFIG.isLocal;G.aslocal!==et.Undef&&(ct=G.aslocal===et.True);G.setPath();G.appHref=window.location.href;ee.encodeEnable=!ct;G.setImageHome(ct);const gn=Cn(ct)||G.availComing;G.currentUserHome;G.statusJsonPath;G.zipPrefix;G.chListFile;G.chStatusListFile;switch(G.admin){case!0:await tn(G);break;case!1:if(vs)if(G.edit===Y.none){let h=!1,e=!1;const t=new Ce;t.CheckVisible=!0,t.CheckText="位置情報を初期化",t.SecretEnable=!0;const s=G.setBrowserTitle();await t.showWait(`「${s} 」モードで起動します`)===H.Secret&&(e=!0),h=t.Checked;let i=ue.None;if(ct)i=ue.Full;else if(i=ue.NotRun,e){let o="";t.CheckVisible=!1,t.SecretEnable=!1,t.AuthVisible=!0,t.onAuthChecking=p=>(o=p,!0),await t.showWait("認証コードを入力してください");const l=new Date,a=("0"+(l.getMonth()+1)).slice(-2),r=("0"+l.getDate()).slice(-2),m=Math.random()>.5?`${a}${r}`:`${r}${a}`;o===m?(console.log("auth success"),i=ue.Full):console.log("auth fail")}else gn&&(i=ue.Limit);switch(h&&(await(await Bs()).clear(),await(await Se()).clear()),G.evonaType=i,i){case ue.Full:window.EVONA_CONFIG.demo=!1,await ys(G);break;case ue.Limit:window.EVONA_CONFIG.demo=!0,await ys(G);break}}else G.setBrowserTitle(),await pn(G);break}function yn(){const h=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname.startsWith("192.168."),e=h?"./jszip_dist/jszip.min.js":"https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js",t=h?"./jsstore_dist/jsstore.min.js":"https://cdn.jsdelivr.net/npm/jsstore/dist/jsstore.min.js";window.EVONA_CONFIG={isLocal:h,workerFile:"./jsstore_dist/jsstore.worker.min.js",demo:!h};function s(n,i=!1){const o=document.createElement("script");o.src=n,i&&(o.type="module"),o.async=!1,document.head.appendChild(o)}s(e),s(t)}function Cn(h){if(h)return!0;const e=document.referrer;console.log(`${e}`);const t="evona_auth",s="granted";return sessionStorage.getItem(t)===s?!0:e.includes("qiita.com")?(sessionStorage.setItem(t,s),!0):!1}

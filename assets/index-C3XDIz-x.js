(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const z={none:"none",classPq:"pq",classMM:"mm"},v={pqStatusHP:"pqStatusHP",pqStatusATK:"pqStatusATK",pqStatusREC:"pqStatusREC",pqTokkunHP:"pqTokkunHP",pqTokkunATK:"pqTokkunATK",pqTokkunREC:"pqTokkunREC",pqTokuSp1:"pqTokuSp1",pqTokuSp2:"pqTokuSp2",pqStatusType:"pqStatusType",pqStatusCombo:"pqStatusCombo",mmAbilitySTR:"mmAbilitySTR",mmStatusFGT:"mmStatusFGT",mmStatusATK:"mmStatusATK",mmStatusPDF:"mmStatusPDF",mmStatusACC:"mmStatusACC",mmStatusEVA:"mmStatusEVA",mmStatusCRI:"mmStatusCRI",mmStatusMDF:"mmStatusMDF",mmStatusHP:"mmStatusHP",mmStatusCRD:"mmStatusCRD",mmStatusDEF:"mmStatusDEF",mmStatusSPD:"mmStatusSPD",mmAbilityDEX:"mmAbilityDEX",mmAbilityMGC:"mmAbilityMGC",mmAbilityDUR:"mmAbilityDUR",mmRole:"mmRole"},G={None:"None",CnsRed:"CnsRed",CnsBlue:"CnsBlue",CnsGreen:"CnsGreen",CnsYellow:"CnsYellow",CnsViolet:"CnsViolet",CnsWhite:"CnsWhite",CnsBlack:"CnsBlack"},st={RlAttacker:"RlAttacker",RlHealer:"RlHealer",RlDebuffer:"RlDebuffer",RlBuffer:"RlBuffer"};class Xt{constructor(){this.tblNameCharImages="CharImages",this.tblCharImages={name:this.tblNameCharImages,columns:{ns:{dataType:"string",index:!0},name:{dataType:"string"},fileName:{dataType:"string",index:!0},fileData:{dataType:"object"}}},this.tblNameSettings="Settings",this.tblSettings={name:this.tblNameSettings,columns:{key:{dataType:"string",primaryKey:!0},value:{dataType:"string"}}},this.tblNameActionLog="ActionLog",this.tblActionLog={name:this.tblNameActionLog,columns:{id:{primaryKey:!0,autoIncrement:!0},logType:{dataType:"string"},log:{dataType:"string"}}},this.dbName="EvonaDB",this.db={name:this.dbName,tables:[this.tblCharImages,this.tblSettings,this.tblActionLog]}}async connect(e){console.log("Waiting for JsStore library...");let t=0;for(;typeof window.JsStore>"u";){if(t>50)throw new Error("JsStore library load timeout. Check script tag order.");await new Promise(n=>setTimeout(n,100)),t++}const s=window.JsStore;this.connection=new s.Connection(new Worker(e)),console.log("connection started with library version:",s.VERSION)}async term(){await this.connection.terminate(),console.log("connection terminated")}async initDb(){const e=await this.connection.initDb(this.db);return console.log(e?"Db Created & connection is opened":"Db connection is opened"),e}async dropDb(){let e=!1;return await this.connection.dropDb().then(function(){console.log("Db deleted successfully"),e=!0}).catch(function(){console.error("dropDb error")}),e}async deleteAllRecords(e){return await this.existsTable(e)===!1?(console.log(`[${e}] not exist`),!1):(await this.connection.clear(e),console.log(`[${e}] all record deleted successfully`),!0)}async existsTable(e){try{const t=await this.connection.count({from:e});return!0}catch(t){console.log("[existsTable] JsStore Select Error:",t)}return!1}get defWorkerFile(){return window.EVONA_CONFIG.workerFile}async setup(){return await this.connect(this.defWorkerFile),await this.initDb()}sortByIdAscAsNum(e){e&&e.sort((t,s)=>Number(t.id)-Number(s.id))}}class qt extends Xt{async insert(e,t){await this.connection.insert({into:this.tblNameSettings,values:[{key:e,value:t}],upsert:!0})}async insertMultiple(e){const t=e.map(s=>({key:s.key,value:s.value}));return await this.connection.insert({into:this.tblNameSettings,values:t,upsert:!0})}async selectKey(e){try{var t=await this.connection.select({from:this.tblNameSettings,where:{key:e}});return t.length>=1?t[0].value:null}catch(s){console.error("[selectKey] JsStore Select Error:",s)}return null}async countKey(e){try{return await this.connection.count({from:this.tblNameSettings,where:{key:e}})}catch(t){console.error("[countKey] JsStore Select Error:",t)}return-1}async clear(){await this.deleteAllRecords(this.tblNameSettings)}}class Qt{constructor(){this.table=new qt}async init(){const e=new qt;await e.setup(),this.table=e}async saveDialogPos(e){const t=e.parentElement,s=`${t?.className},${t?.style.left},${t?.style.top}`;await this.table.insert(e.className,`${s}`)}async loadDialogPos(e){const t=e.parentElement,s=await this.table.selectKey(e.className);if(s!==null){const n=s.split(",");n.length===3&&t!==null&&n[0]===t.className&&(t.style.left=n[1],t.style.top=n[2])}}async clear(){this.table.clear()}}class Tt extends Xt{async insert(e,t){await this.connection.insert({into:this.tblNameActionLog,values:[{logType:e,log:t}]})}async insertMultiple(e){const t=e.map(s=>({logType:s.logType,log:s.log}));return await this.connection.insert({into:this.tblNameActionLog,values:t})}async selectType(e){try{var t=await this.connection.select({from:this.tblNameActionLog,where:{logType:e},order:{by:"id",type:"asc"}});return this.sortByIdAscAsNum(t),t.length>=1?t:null}catch(s){console.error("[selectType] JsStore Select Error:",s)}return null}async countType(e){try{return await this.connection.count({from:this.tblNameActionLog,where:{logType:e}})}catch(t){console.error("[countType] JsStore Select Error:",t)}return-1}async clear(){await this.deleteAllRecords(this.tblNameActionLog)}}class hs{constructor(){this.table=new Tt}async init(){const e=new Tt;await e.connect(e.defWorkerFile),await e.initDb(),this.table=e}async clear(){this.table.clear()}async put(e,t){return await this.table.insert(e,t)}async get(e){const t=await this.table.selectType(e);if(t===null)return null;const s=new Array;for(const n of t)s.push({id:n.id,log:n.log});return s}}const be={CharSummaryAction:"CharSummaryAction",ResourceEditAction:"ResourceEditAction",GameEditAction:"GameEditAction",ScoreEditAction:"ScoreEditAction"};let nt=null;async function ms(){return nt||(nt=new Qt,await nt.init(),console.log("SettingAccess instance created (Singleton)")),nt}let it=null;async function we(){return it||(it=new hs,await it.init(),console.log("LogAccess instance created (Singleton)")),it}function us(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,h=>{const e=Math.random()*16|0;return(h==="x"?e:e&3|8).toString(16)})}function ds(){const h=Date.now().toString(16),e=us();return`${h}-${e}`}const ve={Unknown:"Unknown",KeyDown:"KeyDown",Click:"Click"};class Pe{constructor(){this.eventType=ve.Unknown,this.parentElem=null,this.cancel=!1,this.targetId="",this.classify="",this.selectedValue="",this.Keydown="",this.KeyEnter=ce.None}}class Ce{constructor(){this.callerName="",this.result=""}}class rt{constructor(){this.parentElem=null,this.left="",this.top="",this.width="",this.height=""}}const Oe={Enter:"Enter",Escape:"Escape",Tab:"Tab",Process:"Process"},ce={None:"None",Normal:"Normal",Special:"Special"},D={Btn:"Btn",Chk:"Chk",Img:"Img",Label:"Label",LabelRO:"LabelRO",Combo:"Combo",Input:"Input",Plain:"Plain",Table:"Table"};class fs{constructor(){this.movingPx="20",this.textWidthPx="20",this.textAlign="center"}}class q{static get titleColorText(){return`
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
&::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
&::-webkit-scrollbar-thumb {
 background: #eeee52;
 border-radius: 10px;
 border: 1px solid #3b3a03;
}
&::-webkit-scrollbar-thumb:hover { background: ${this.onColor}; }
`.trim()}static sliderText(e,t,s=new fs){return`
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
`.trim()}}q.width="16px";q.offColor="#fff176";q.onColor="#fbc02d";class Lt{constructor(){this.imgSrc="",this.imgFile="",this.alt=""}}class Bt{constructor(){this.selectedItem="",this.selectionPair=[],this.classify=""}}class j{constructor(){this.type="text",this.value="",this.placeholder="",this.disableKeyDown=!1,this.enableClicked=!1}}class jt{constructor(){this.type="checkbox",this.value=!1,this.placeholder=""}}class _t{constructor(){this.typeInfo=new es,this.className=""}ToHTML(){let e="";switch(this.typeInfo.using.itemType){case D.Btn:e=this.typeInfo.ToButtonHTML(this.className);break;case D.Label:e=this.typeInfo.ToLableHTML(this.className);break;case D.LabelRO:e=this.typeInfo.ToLableROHTML(this.className);break;case D.Combo:e=this.typeInfo.ToComboHTML(this.className);break;case D.Input:e=this.typeInfo.ToInputHTML(this.className);break;case D.Chk:e=this.typeInfo.ToCheckHTML(this.className);break;case D.Img:e=this.typeInfo.ToImgHTML(this.className,this.typeInfo.using.img.alt);break;case D.Plain:e=this.typeInfo.using.innerHTML;break}return e}copyTo(e){e.className=this.className,e.typeInfo.toolTip=this.typeInfo.toolTip,e.typeInfo.using.itemType=this.typeInfo.using.itemType,e.typeInfo.using.label=this.typeInfo.using.label,e.typeInfo.using.combo=this.typeInfo.using.combo,e.typeInfo.using.input=this.typeInfo.using.input,e.typeInfo.using.innerHTML=this.typeInfo.using.innerHTML,e.typeInfo.using.img=this.typeInfo.using.img}}class qe{constructor(){this.items=new Array}makeItems(e=1){this.items.length>0&&this.items.splice(0,this.items.length);for(let t=0;t<e;t++){const s=new _t;this.items.push(s)}}ToHTML(){let e="";for(const t of this.items){const s=t.ToHTML();s!==""&&(this.items.length>=2?e=`${e}<div>${s}</div>`:e=s)}return e}}class Rt{constructor(){this.rowName="",this.cols=new Array}makeCols(e){this.cols.length>0&&this.cols.splice(0,this.cols.length);for(let t=0;t<e;t++){const s=new qe;s.makeItems(),this.cols.push(s)}}ToHTML(){let e="";for(const t of this.cols){let s="";s=t.ToHTML(),s!==""&&(e=`${e}<td>${s}</td>`)}return e}toTemplate(){const e=new Rt;e.rowName=this.rowName;for(const t of this.cols){const s=new qe;s.makeItems(t.items.length);let n=-1;for(const i of t.items){n++;const o=s.items[n];o.className=i.className,o.typeInfo.toolTip=i.typeInfo.toolTip,o.typeInfo.using.itemType=i.typeInfo.using.itemType,o.typeInfo.using.label=i.typeInfo.using.label,o.typeInfo.using.combo=i.typeInfo.using.combo,o.typeInfo.using.input=i.typeInfo.using.input,o.typeInfo.using.innerHTML=i.typeInfo.using.innerHTML,o.typeInfo.using.img=i.typeInfo.using.img}e.cols.push(s)}return e}}class W{constructor(){this.tableName="",this.rows=new Array,this.template=null,this.invalidRowIndex=-1,this.firstRowIndex=1,this.height="300",this.fontSize="font-size: 0.9em;",this.rowIdDelimiter="_",this.clipboardText=""}makeDim(e,t){this.rows.length>0&&this.rows.splice(0,this.rows.length);for(let s=0;s<t;s++){const n=new Rt;n.makeCols(e),this.rows.push(n)}}growCell(e,t=1){const s=this.rows.length;for(let n=0;n<s;n++)this.rows[n].cols[e].makeItems(t)}getCell(e,t,s=0){return this.rows[t].cols[e].items[s]}ToHTML(e="",t){this.tableName=e;let s="",n=0;for(const a of this.rows){n++;let r="";if(r=a.ToHTML(),r!==""){const c=a.rowName!==""?` class="${a.rowName}"`:"";s=`${s}<tr ${c} item-id="${n}">${r}</tr>`}}const i=e!==""?` class="${e}"`:"",o=t!==""?` id="${t}"`:"",l=t!==""?` item-id="${t}"`:"";return s=`<table${i}${o}${l}>${s}</table>`,s}ToScrollHTML(e="",t){const s=e!==""?` class="${e}"`:"",n=t!==""?` item-id="${t}"`:"";return`<div${s}${n}>
${this.ToHTML(e,t)}
</div>`}makeRowTemplate(e){if(this.rows.length>=1){for(const t of this.rows)t.rowName=e;this.template=this.rows[0].toTemplate()}}clearRows(){this.rows=new Array}addRow(e){const t=this.getTable();if(t===null)return-1;const s=t.insertRow(-1),n=t.rows.length;if(s.className=e,s.setAttribute("item-id",`${n}`),this.template!==null&&this.template.cols.length>=1){const i=this.template.toTemplate();let o="";for(const l of i.cols){let a="";for(const r of l.items){r.typeInfo.using.itemId=n;const c=r.ToHTML();c!==""&&(l.items.length>=2?a=`${a}<div>${c}</div>`:a=c)}a!==""&&(o=`${o}<td>${a}</td>`)}return s.innerHTML=o,n}return-1}deleteRow(e){const t=this.getTable();if(t===null)return!1;for(const s of t.rows){const n=s.getAttribute("item-id");if(n!==null&&n===`${e}`)return t.deleteRow(e-this.firstRowIndex),!0}return!1}redimAllRows(){const e=this.getTable();if(e===null)return;let t=this.firstRowIndex-1;for(const s of e.rows)if(s.getAttribute("item-id")!==null){t++,s.setAttribute("item-id",`${t}`);for(const i of s.cells)this.redimElems(i.children,t)}}redimElems(e,t){for(const s of e)s.getAttribute("item-id")!==null&&s.setAttribute("item-id",`${t}`),s.children!==void 0&&this.redimElems(s.children,t)}selectRow(e){const t=this.getTable();if(t!==null&&!(e<=0)&&!(e>t.rows.length)){for(const s of t.rows)s.classList!==void 0&&s.classList.remove("selected");t.rows[e-1].classList.add("selected")}}getSelectedRow(){const e=this.getTable();if(e===null)return this.invalidRowIndex;for(const t of e.rows)if(t.classList!==void 0&&t.classList.contains("selected")){const s=t.getAttribute("item-id");return s!==null?parseInt(s):this.invalidRowIndex}return this.invalidRowIndex}updateRowImage(e,t){const n=this.getTable()?.querySelector(`tr[item-id="${e}"] img`);n instanceof HTMLImageElement&&(n.src=t)}updateRowImageToolTip(e,t){const n=this.getTable()?.querySelector(`tr[item-id="${e}"] img`);n instanceof HTMLImageElement&&(n.title=t)}updateText(e,t){if(e.children!==null){const s=e.children[0];s.textContent=t}}scroll(e){const t=this.getTable();if(t===null||e<=0||e>t.rows.length)return null;const s=t.querySelector(`tr[item-id="${e}"] img`);return s===null||s===void 0?null:(s.scrollIntoView({behavior:"smooth",block:"center"}),s)}getRowElems(){const e=this.getTable();return e===null?null:e.rows}findInputElem(e){if(e===null)return null;if(e.tagName!=="INPUT"){for(const s of e.children){const n=this.findInputElem(s);if(n!==null&&n.tagName==="INPUT")return n}return null}return e}getElemValue(e){if(e instanceof HTMLInputElement)return e.value;if(e instanceof HTMLSelectElement)return e.value;{const t=this.findInputElem(e);if(t!==null)return t.type==="checkbox"?t.checked:t.value}return null}setElemValue(e,t){if(e instanceof HTMLInputElement){const s=e,n=s.value;return s.value=t,n}else if(e instanceof HTMLSelectElement){const s=e,n=s.value;return s.value=t,n}else{const s=this.findInputElem(e);if(s!==null){if(s.type==="checkbox"){const i=s.checked;return s.checked=`${t}`.toLowerCase()==="true",i}const n=s.value;return s.value=t,n}}return null}getRowElem(e){const t=this.getTable();if(t===null)return null;for(const s of t.rows){const n=s.getAttribute("item-id");if(n!==null&&n===`${e}`)return console.log(`match row id : ${n}`),t.rows[e-this.firstRowIndex]}return null}getCellElems(e){if(e===null)return null;const t=new Array;for(const s of e.cells){if(s===null)continue;const n=new Array;for(const i of s.children)n.push(i);t.push(n)}return t}setVisible(e){const t=this.getTable();return t===null?null:(t.hidden=!e,t.parentElement.hidden=!e,!0)}getCellRect(e){const t=new H,s=t.GetRect(e.parentElement),n=t.GetRect(e),i=new rt;return i.left=`${n.left}`,i.top=`${s.top}`,i.width=`${n.width}`,i.height=`${n.height}`,i}getTableOwnerRect(e){const t=new H,s=t.GetRect(e.parentElement.parentElement.parentElement.parentElement.parentElement);console.log(`[OWNER] ${s.left}, ${s.top}`);const n=t.GetRect(e.parentElement.parentElement.parentElement);console.log(`[TABLE] ${n.left}, ${n.top}`);const i=t.GetRect(e.parentElement.parentElement);console.log(`[TBODY] ${i.left}, ${i.top}`);const o=t.GetRect(e.parentElement);console.log(`[TROW] ${o.left}, ${o.top}`);const l=new rt;return l.left=`${n.left}`,l.top=`${s.top}`,l.width="0",l.height="0",l}makeCallerName(e,t){return`${e}${this.rowIdDelimiter}${t}`}getCallerCellElem(e){const t=e.split(this.rowIdDelimiter);if(t===void 0||t.length!==2)return null;const s=this.getRowElem(parseInt(t[1]));if(s===null)return null;const n=this.getCellElems(s);if(n===null)return null;for(const i of n)for(const o of i)if(o.className===t[0])return o;return null}async toClipboard(){const e=this.getTable();if(e===null)return!1;let t="";for(const n of e.rows){let i="";const o=this.getCellElems(n);if(o===null)return!1;for(const l of o){let a="";for(const r of l){const c=this.getElemValue(r);let m=c===null?"&null&":`&${c}&`;a.length!==0?a=`${a}	${m}`:a=m}i.length!==0?i=`${i}	${a}`:i=`${a}`}t.length!==0?t=`${t}
${i}`:t=`${i}`}const s=`table:{${t}}`;try{await navigator.clipboard.writeText(s)}catch(n){return console.error("コピー失敗...",n),!1}return!0}async fromClipboard(){const e=this.getTable();if(e===null)return!1;let t="";try{t=await navigator.clipboard.readText()}catch(o){return console.error("ペースト失敗...",o),!1}this.clipboardText=t;const s="table:{";if(t.length<s.length+1||t.startsWith(s)===!1||t.endsWith("}")===!1)return!1;t=t.substring(s.length),t=t.substring(0,t.length-1);const n=t.split(`
`);let i=0;for(const o of e.rows){const a=n[i].split("	"),r=this.getCellElems(o);if(r===null)return!1;if(a.length!==r.length)return console.log(`different column size : line ${i+1}`),!1;i++}i=0;for(const o of e.rows){const a=n[i].split("	"),r=this.getCellElems(o);if(r===null)return!1;let c=0;for(const m of r){let g=a[c];if(g.endsWith("\r")===!0&&(g=g.substring(0,g.length-1)),g.startsWith("&")!==!1&&g.endsWith("&")!==!1&&(g=g.substring(1,g.length-1),g!=="null")){for(const u of m){this.setElemValue(u,g);break}c++}}i++}return!0}getTable(){const e=`.${this.tableName}`,t=document.querySelectorAll(e);if(t===null||t.length<=0)return null;const n=t[0].querySelectorAll(e);return n===null||n.length<=0?null:n[0]}getParentElem(){const e=`.${this.tableName}`,t=document.querySelectorAll(e);return t===null||t.length<=0?null:t[0]}getScrollCellRect(e){new H;const t=this.getCellRect(e),s=this.getTableOwnerRect(e),n=this.getParentElem(),i=n!==null?n.scrollLeft:0,o=new rt;return o.left=`${parseInt(t.left)-parseInt(s.left)+10-i}`,o.top=`${parseInt(t.top)-parseInt(s.top)+10}`,o.width=`${t.width}`,o.height=`${t.height}`,o}setFontConfig(e="0.9"){this.fontSize=`font-size: ${e}em;`}getCssText(e){return`
/* テーブル */
.${e} {
width: 100%;                /* テーブル全体を親要素いっぱいに広げる */
table-layout: fixed;        /* これが重要！これで td の％指定が絶対になります */
height: ${this.height}px;   /* ダイアログに合わせた固定高 */
overflow-y: auto;
${q.scrollBarText}
}
.${e} tr {
background-color: #f5f5dc; /* ベージュ */
}
`.trim()}getKvpCssText(e,t,s){return`
${this.getCssText(e)}

/* 左側のラベルセル (Key) */
.${t} {
    background-color: #f5f5dc; /* ベージュ */
    color: #4b0082;       /* インディゴ/紫 */
    font-weight: bold;
    ${this.fontSize}
    text-align: right;
    padding-right: 8px;
    border-right: 1px solid #ddd; /* 境界線 */
    width: 100%;            /* 幅を固定するとGridらしくなります */
/* 内容が溢れても折り返さない、あるいは省略する設定 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
`.trim()}}class ps{constructor(){this.htmlMaker=new H,this.table=new W,this.gridElem=null,this.headerElem=null,this.footerElem=null}makeKeyCell(e,t,s){const n=new _t;return n.typeInfo.setLabel(e,!1),n.className=t,n.typeInfo.toolTip=s,n}makePair(){return new Map}setPair(e){if(e.size===0)return!1;this.table.makeDim(2,e.size),e.forEach((s,n)=>{this.table.growCell(1,s.items.length)});let t=-1;return e.forEach((s,n)=>{t++,this.table.getCell(0,t).typeInfo.setLabel(n.typeInfo.using.label,!1),this.table.getCell(0,t).className=n.className;let i=-1;for(const o of s.items)i++,this.table.getCell(1,t,i).typeInfo=o.typeInfo,this.table.getCell(1,t,i).className=o.className}),!0}setListener(e,t,s,n="",i=""){this.dispose(),this.table.makeRowTemplate(t);const o=document.getElementById(s);if(o===null)return console.log(`[setListener] cannot found ${s}`),!1;const l=this.table.ToScrollHTML(e,e),a=new Q;a.props.name="",a.props.id=e,a.props.className=e,a.props.option.setTable(l),a.props.option.onSelect=async m=>{console.log(`classify = ${m.classify} targetId = ${m.targetId}`),this.onSelect!==void 0&&await this.onSelect(m)},this.htmlMaker=new H,this.htmlMaker.add(a);const r=this.htmlMaker.ToHTML();let c=document.createElement("div");return c.className=e,c.innerHTML=r,this.gridElem=c.children[0],n!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=n,this.headerElem.id=n,o.appendChild(this.headerElem)),o.appendChild(this.gridElem),c.remove(),c=null,i!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=i,this.footerElem.id=i,o.appendChild(this.footerElem)),!0}getSelectedRow(){return this.table.getSelectedRow()}enableEvents(e){return this.gridElem===null?!1:(this.htmlMaker.enableTableEvents(this.gridElem.className),this.onSelect=e,!0)}disableEvents(){return this.gridElem===null?!1:(this.htmlMaker.disableTableEvents(this.gridElem.className),!0)}setVisible(e){return this.gridElem===null?!1:(this.gridElem.hidden=!e,!0)}dispose(){this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.gridElem!==null&&(this.gridElem.parentElement?.removeChild(this.gridElem),this.gridElem.remove()),this.disableEvents(),this.headerElem=null,this.footerElem=null,this.gridElem=null}getCssText(e,t,s){return this.table.getKvpCssText(e,t,s)}}class He{constructor(){this.ctlName="",this.ovElem=null}firstAction(e,t){const s=document.getElementById(t);return s===null?(console.log(`[firstAction] cannot found ${t}`),null):(this.createOverlay(s),this.ctlName=e,s)}createOverlay(e){const t=document.createElement("div");t.id=`${this.ovCssName()}`,t.style.position="absolute",t.style.inset="0",t.style.zIndex=this.zIndexOv(),t.style.background="transparent",t.style.background="rgba(0,0,0,0.1)",e.appendChild(t),this.ovElem=t,t.dataset.display=t.style.display}enableOverlay(e=!0){this.ovElem!==null&&(this.ovElem.style.display=e?this.ovElem.dataset.display:"none")}get isEnableOverlay(){return this.ovElem.style.display!=="none"}resultTable(e){const t=`.${this.ctlName}`,s=document.querySelectorAll(t);if(s===null||s.length<=0)return null;const n=s[0],i=`.${e}`,o=n.querySelectorAll(i);return o===null||o.length<=0?null:o[0]}getBaseElem(){return this.ovElem!==null?this.ovElem.parentElement:null}getOuterCssText(){return`
.${this.ctlName} {
  position: absolute;
  inset: auto;

  padding: 0;       /* 内側の余白をゼロに */
  border: none;     /* 枠線を消す（枠線があると1px〜ズレます） */
  overflow: hidden; /* 中身がはみ出さないように（任意） */

  ${q.borderShadowText}

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
        `.trim()}dispose(){this.ovElem!==null&&(this.ovElem.parentElement?.removeChild(this.ovElem),this.ovElem.remove())}ovCssName(){return`${this.ctlName}-barrier`}zIndexCtl(){return"1000"}zIndexOv(){return"999"}}const ot={ByText:"ByText",ByValue:"ByValue",Both:"Both"};class gs extends He{constructor(){super(...arguments),this.ctlName="",this.initValue="",this.selectedIndex=-1,this.delimiter="/",this.callerName="",this.htmlMaker=new H,this.table=new W,this.ctlElem=null,this.onUpAction=async()=>{this.keyValuePairs!==void 0&&(this.selectedIndex=this.selectedIndex<=0?this.keyValuePairs.length-1:this.selectedIndex-1,this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]))},this.onDnAction=async()=>{this.keyValuePairs!==void 0&&(this.selectedIndex=this.selectedIndex>=this.keyValuePairs.length-1?0:this.selectedIndex+1,this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]))}}setListener(e,t,s){this.dispose(),this.callerName=s,this.ctlName=e;const n=new W;n.makeDim(1,3);let i=0;n.getCell(0,i).typeInfo.setButton("▲"),n.getCell(0,i).className=this.upCssName(),n.getCell(0,i).typeInfo.using.itemId=i,i++,n.getCell(0,i).typeInfo.setButton(""),n.getCell(0,i).className=this.valCssName(),n.getCell(0,i).typeInfo.using.itemId=i,i++,n.getCell(0,i).typeInfo.setButton("▼"),n.getCell(0,i).className=this.dwCssName(),n.getCell(0,i).typeInfo.using.itemId=i;const o=this.firstAction(e,t);if(o===null)return!1;const l=n.ToScrollHTML(e,e),a=new Q;a.props.name="",a.props.id=this.tblCssName(),a.props.className=this.tblCssName(),a.props.option.setTable(l),a.props.option.onSelect=async u=>{switch(u.classify){case this.valCssName():if(this.onApply!==void 0){const p=new Ce;p.callerName=this.callerName,p.result=this.keyValuePairs[this.selectedIndex],await this.onApply(p)}break;case this.upCssName():if(this.onUp!==void 0){const p=new Ce;p.callerName=this.callerName,p.result=this.keyValuePairs[this.selectedIndex],await this.onUp(p),u.cancel||this.onUpAction()}break;case this.dwCssName():if(this.onDown!==void 0){const p=new Ce;p.callerName=this.callerName,p.result=this.keyValuePairs[this.selectedIndex],await this.onDown(p),u.cancel||this.onDnAction()}break}},this.htmlMaker=new H,this.htmlMaker.add(a);const r=this.htmlMaker.ToHTML();let c=document.createElement("dialog");c.className=e,c.innerHTML=r,this.ctlElem=c;let m=c.children[0],g=m.children[0];return g.className=`${this.tblCssName()}`,g.id=`${this.tblCssName()}`,this.ctlElem.appendChild(g),m.remove(),m=null,o.appendChild(this.ctlElem),this.table=n,!0}setSelectedByValue(e,t,s=ot.Both){const n=new Array;switch(s){case ot.ByText:n.push(0);break;case ot.ByValue:n.push(1);break;case ot.Both:n.push(0),n.push(1);break;default:return!1}this.initValue=e,this.keyValuePairs=t,this.selectedIndex=-1;const i=e.split(this.delimiter);let o=i.length>=2?i[1]:e,l="";for(const a of n){let r=-1;for(const c of t)if(r++,c!==null&&c!==""){const m=c.split(this.delimiter);if(m.length>=2&&m[a]===o){this.selectedIndex=r,l=m[0];break}}if(this.selectedIndex!==-1)break}if(this.selectedIndex===-1){const r=t[0].split(this.delimiter);this.selectedIndex=0,l=r[0]}return this.updateValueElemByText(l),this.selectedIndex!==-1}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-updn-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e,t,s){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onApply=e,this.onUp=t,this.onDown=s,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}updateValueElemByKeyValue(e){if(this.ctlElem===null)return;let t="";const s=e.split(this.delimiter);s.length>=2&&(t=s[0]),this.updateValueElemByText(t)}updateValueElemByText(e){if(this.ctlElem===null)return;const t=this.ctlElem.querySelectorAll(`.${this.valCssName()}`);t!==null&&(t[0].textContent=e)}tblCssName(){return`${this.ctlName}-tbl`}upCssName(){return`${this.ctlName}-upBtn`}dwCssName(){return`${this.ctlName}-dwBtn`}valCssName(){return`${this.ctlName}-values`}}class $e{constructor(){this.key="",this.text=""}}class ys extends He{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new H,this.table=new W,this.ctlElem=null}setChoiceItems(e){this.items=e}setListener(e,t,s){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const n=this.items.length,i=new W;i.makeDim(1,n);let o=0;for(const p of this.items)i.getCell(0,o).typeInfo.setButton(`${p.text}`),i.getCell(0,o).className=`${e}-${p.key}`,i.getCell(0,o).typeInfo.using.itemId=o,o++;const l=this.firstAction(e,t);if(l===null)return!1;const a=i.ToScrollHTML(e,e),r=new Q;r.props.name="",r.props.id=this.tblCssName(),r.props.className=this.tblCssName(),r.props.option.setTable(a),r.props.option.onSelect=async p=>{if(console.log(`classify = ${p.classify} targetId = ${p.targetId}`),this.onSelect!==void 0){const d=parseInt(p.targetId),w=new Ce;w.callerName=this.callerName,w.result=0<=d&&d<this.items.length?this.items[d].key:"",await this.onSelect(w)}},this.htmlMaker=new H,this.htmlMaker.add(r);const c=this.htmlMaker.ToHTML();let m=document.createElement("dialog");m.className=e,m.innerHTML=c,this.ctlElem=m;let g=m.children[0],u=g.children[0];return u.className=`${this.tblCssName()}`,u.id=`${this.tblCssName()}`,this.ctlElem.appendChild(u),g.remove(),g=null,l.appendChild(this.ctlElem),this.table=i,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-updn-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
}
.${this.tblCssName()} button {
width: 100%;
white-space: nowrap;
cursor: pointer;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}tblCssName(){return`${this.ctlName}-tbl`}}class Cs{constructor(){this.key="",this.text=""}}class bs extends He{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new H,this.table=new W,this.ctlElem=null,this.headerElem=null,this.footerElem=null}setGridtems(e){this.items=e}setListener(e,t,s,n="",i=""){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const o=this.items.length,l=new W;l.makeDim(2,o);let a=0;for(const k of this.items)l.getCell(0,a).typeInfo.setLabel(`${k.text}`,!1),l.getCell(0,a).className=this.keyCssName(),l.getCell(0,a).typeInfo.using.itemId=a,l.getCell(1,a).typeInfo=k.value.items[0].typeInfo,l.getCell(1,a).className=this.valueCssName(),l.getCell(1,a).typeInfo.using.itemId=a,a++;const r=this.firstAction(e,t);if(r===null)return!1;const c=l.ToScrollHTML(e,this.tblCssName()),m=new Q;m.props.name="",m.props.id=this.tblCssName(),m.props.className=this.tblCssName(),m.props.option.setTable(c),m.props.option.onSelect=async k=>{if(this.onSelect!==void 0){const x=new Ce;x.callerName=k.classify,x.result=k.selectedValue,await this.onSelect(x)}},this.htmlMaker=new H,this.htmlMaker.add(m);const g=this.htmlMaker.ToHTML();let u=document.createElement("dialog");u.className=e,u.innerHTML=g,this.ctlElem=u;let p=u.children[0];const d=this.divCssName();p.className=d,p.id=d;let w=p.children[0];return w.className=`${this.tblCssName()}`,w.id=`${this.tblCssName()}`,n!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=n,this.headerElem.id=n,u.appendChild(this.headerElem)),r.appendChild(this.ctlElem),i!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=i,this.footerElem.id=i,u.appendChild(this.footerElem)),this.table=l,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}setFontConfig(e="0.9"){this.table.setFontConfig(e)}applyCss(){const e=`${this.getBaseElem().className}-flgrd-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
${this.table.getKvpCssText(this.divCssName(),this.keyCssName(),this.valueCssName())}
.${this.ctlName} {
width: 200px;
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}divCssName(){return`${this.ctlName}-div`}tblCssName(){return`${this.ctlName}-tbl`}keyCssName(){return`${this.ctlName}-key`}valueCssName(){return`${this.ctlName}-value`}}const te={Text:"Text",KeyValue:"KeyValue"},Be={asText:"asText",asNumber:"asNumber"};class ws extends He{constructor(){super(...arguments),this.pairDelimiter=",",this.itemDelimiter="/",this.keyToolTip="キー",this.valueToolTip="テキスト",this.editType=te.KeyValue,this.valueType=Be.asText,this.digLen=5,this.callerName="",this.htmlMaker=new H,this.table=new W,this.ctlElem=null,this.headerElem=null,this.footerElem=null,this.numpad=null}setKeyValuePairs(e,t=8){const s=e.split(this.pairDelimiter);if(s.length===0)return;const n=new Array;for(const o of s){const l=o.split(this.itemDelimiter);if(l.length<=1)continue;const a=new $e;a.key=l[0],a.text=l[1],n.push(a)}const i=t-n.length;if(i>0)for(let o=0;o<i;o++){const l=new $e;l.key=`key${n.length+1}`,l.text="",n.push(l)}this.editType=te.KeyValue,this.items=n}setTexts(e,t=8){const s=e.split(this.pairDelimiter);if(s.length===0)return;const n=new Array;for(const o of s){const l=new $e;l.text=o,n.push(l)}const i=t-n.length;if(i>0)for(let o=0;o<i;o++){const l=new $e;l.key=`key${n.length+o}`,l.text="",n.push(l)}this.editType=te.Text,this.items=n}setValueType(e,t=Be.asNumber){this.digLen=e,this.valueType=t}setListener(e,t,s,n,i){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const o=this.items.length,l=new W,a=this.editType===te.KeyValue?2:1;l.makeDim(a,o);let r=this.valueType===Be.asNumber,c=0;for(const x of this.items){let B=0,$="",f="";this.editType===te.KeyValue?($=x.key,f=this.keyToolTip):($=x.text,f=this.valueToolTip);const N=new j;if(N.value=$,N.placeholder=f,this.editType!==te.KeyValue&&(N.disableKeyDown=r,N.enableClicked=r),l.getCell(B,c).typeInfo.setInput(N),l.getCell(B,c).className=`${e}-key-${c+1}`,l.getCell(B,c).typeInfo.using.itemId=c+l.firstRowIndex,l.getCell(B,c).typeInfo.toolTip=f,this.editType===te.KeyValue){B++;const y=new j;y.value=x.text,y.placeholder=this.valueToolTip,y.disableKeyDown=r,y.enableClicked=r,l.getCell(B,c).typeInfo.setInput(y),l.getCell(B,c).className=`${e}-text-${c+1}`,l.getCell(B,c).typeInfo.using.itemId=c+l.firstRowIndex,l.getCell(B,c).typeInfo.toolTip=this.valueToolTip}c++}const m=this.firstAction(e,t);if(m===null)return!1;const g=l.ToScrollHTML(e,e),u=new Q;u.props.name="",u.props.id=this.tblCssName(),u.props.className=this.tblCssName(),u.props.option.setTable(g),u.props.option.onSelect=async x=>{console.log(`[HtmlMakerInputEdit] classify = ${x.classify} targetId = ${x.targetId}`),this.onSelect!==void 0&&this.showNumpad(x,this.digLen)},this.htmlMaker=new H,this.htmlMaker.add(u);const p=this.htmlMaker.ToHTML();let d=document.createElement("dialog");d.className=e,d.innerHTML=p,this.ctlElem=d;let w=d.children[0],k=w.children[0];return k.className=`${this.tblCssName()}`,k.id=`${this.tblCssName()}`,this.ctlElem.appendChild(k),w.remove(),w=null,n!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=n,this.headerElem.id=n,d.appendChild(this.headerElem)),m.appendChild(this.ctlElem),i!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=i,this.footerElem.id=i,d.appendChild(this.footerElem)),this.table=l,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-inputedit-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
  height: 180px;
overflow-y: auto;
${q.scrollBarText}
}
[class^="${this.ctlName}-key-"] {
height: 25px;
}
[class^="${this.ctlName}-text-"] {
height: 25px;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}editedResult(){const e=this.resultTable(this.tblCssName());if(e===null)return;let t="";for(const s of e.rows)if(s!==null)if(this.editType===te.KeyValue){const n=s.cells[0],i=s.cells[1];if(n===null||i===null)continue;const o=this.table.getElemValue(n)||"",l=this.table.getElemValue(i)||"";t===""?t=o+this.itemDelimiter+l:t+=this.pairDelimiter+o+this.itemDelimiter+l}else{const n=s.cells[0];if(n===null)continue;const i=this.table.getElemValue(n)||"";t===""?t=`${i}`:t+=this.pairDelimiter+i}return t}showNumpad(e,t){if(e.KeyEnter===ce.Special||e.eventType===ve.Click){if(this.numpad!==null)return;this.table.getCellRect(e.parentElem),this.table.getTableOwnerRect(e.parentElem);const n=e.classify,i=document.getElementsByClassName(e.classify);let o="";i.length>=1&&(o=i[0].value);let l="";this.editType===te.KeyValue?l="270":l="90";const a=`${this.ctlName}-numpad`,r=new Zt;r.setNum(o),r.maxDig=t,r.setListener(a,this.resultTable(this.tblCssName()).className,n),r.applyCss(),r.show(l,"4"),r.enableEvents(c=>{console.log(`[onApply] ${c.callerName} ${c.result}`);const m=document.getElementsByClassName(e.classify);if(m!==null){const g=m[0];g.value=c.result}this.closeNumpad()}),this.numpad=r}}closeNumpad(){this.numpad!==null&&(this.numpad.dispose(),this.numpad=null)}tblCssName(){return`${this.ctlName}-tbl`}}class Zt extends He{constructor(){super(...arguments),this.num="0",this.edit="0",this.maxDig=7,this.errText="NaN",this.callerName="",this.prevPad="",this.htmlMaker=new H,this.table=new W,this.ctlElem=null}setNum(e){if(e.length===0)this.num="0",this.edit="";else if(e.length<=this.maxDig&&e.length!==0){let t=!1;for(let s=0;s<e.length;s++){const n=e.charAt(s);if(/[0-9]/.test(n)===!1){t=!0;break}}t?(this.num=this.errText,this.edit=this.errText):(this.num=e,this.edit=e)}}setListener(e,t,s){if(this.num===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const n=new W;n.makeDim(1,1);const i=new W;i.makeDim(2,1);const o=new W;o.makeDim(3,3);const l=new W;l.makeDim(2,1),n.getCell(0,0).typeInfo.setLabel(`${this.num}`,!1),n.getCell(0,0).className=this.resultCssName(),n.getCell(0,0).typeInfo.using.itemId=0,i.getCell(0,0).typeInfo.setButton("AC"),i.getCell(0,0).className=this.acCssName(),i.getCell(0,0).typeInfo.using.itemId=0,i.getCell(1,0).typeInfo.setButton("ESC"),i.getCell(1,0).className=this.escCssName(),i.getCell(1,0).typeInfo.using.itemId=1,i.getCell(1,0).typeInfo.toolTip=`1回タップ：元の値に戻す
2回タップ：入力キャンセル`;let a=0;for(const g of[7,8,9,4,5,6,1,2,3]){const u=a%3,p=Math.floor(a/3);o.getCell(u,p).typeInfo.setButton(`${g}`),o.getCell(u,p).className=`${e}-pad-${g}`,o.getCell(u,p).typeInfo.using.itemId=a,a++}l.getCell(0,0).typeInfo.setButton("0"),l.getCell(0,0).className=`${e}-pad-0`,l.getCell(0,0).typeInfo.using.itemId=0,l.getCell(1,0).typeInfo.setButton("ENTR"),l.getCell(1,0).className=this.entrCssName(),l.getCell(1,0).typeInfo.using.itemId=1,l.getCell(1,0).typeInfo.toolTip="入力確定";const r=this.firstAction(e,t);if(r===null)return console.log(`[setListener] cannot found ${t}`),!1;const c=new Map;c.set("pad1",n.ToScrollHTML(e,e)),c.set("pad2",i.ToScrollHTML(e,e)),c.set("pad3",o.ToScrollHTML(e,e)),c.set("pad4",l.ToScrollHTML(e,e));let m=document.createElement("dialog");m.className=e,this.ctlElem=m;for(const[g,u]of c){const p=this.tblCssName(g),d=new Q;d.props.name="",d.props.id=p,d.props.className=p,d.props.option.setTable(u),d.props.option.onSelect=async f=>{if(console.log(`classify = ${f.classify} targetId = ${f.targetId}`),this.onSelect!==void 0){const N=this.resultCell();if(N===null)return;const y=N.textContent;switch(f.classify){case this.acCssName():N.textContent="0",this.prevPad=this.acCssName();break;case this.escCssName():if(N.textContent=this.edit!==""?this.edit:"0",this.prevPad===this.escCssName()){const ne=new Ce;ne.callerName=this.callerName,ne.result=this.edit,await this.onSelect(ne)}this.prevPad=this.escCssName();break;case this.entrCssName():this.num=N.textContent;const b=new Ce;b.callerName=this.callerName,b.result=this.num,await this.onSelect(b);break;case"":break;default:if(this.maxDig===1){const ne=f.classify.charAt(f.classify.length-1);N.textContent=ne,this.prevPad=ne}if(y.length>=this.maxDig)return;const C=f.classify.charAt(f.classify.length-1),Ie=y==="0"||y===this.edit;N.textContent=Ie?C:N.textContent+C,this.prevPad=C;break}}};const w=new H;w.add(d);const k=w.ToHTML(),x=w.ToElem(k);this.htmlMaker.add(d);let B=x,$=B.children[0];$.className=p,$.id=p,this.ctlElem.appendChild($),B.remove(),B=null}return r.appendChild(this.ctlElem),this.table=n,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-numpad-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
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
        `.trim(),document.head.appendChild(t)}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}resultCell(){const e=this.resultTable(this.tblCssName("pad1"));return e===null?null:e.rows[0].cells[0]}tblCssName(e){return`${this.ctlName}-tbl-${e}`}resultCssName(){return`${this.ctlName}-result`}acCssName(){return`${this.ctlName}-ac`}escCssName(){return`${this.ctlName}-esc`}entrCssName(){return`${this.ctlName}-entr`}}class Ns{constructor(){this.value=new qe}}class Is extends He{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new H,this.table=new W,this.ctlElem=null}setGuidetems(e){this.items=e}setListener(e,t,s){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const n=this.items.length,i=new W;i.makeDim(n,1);let o=0;for(const w of this.items)i.getCell(o,0).typeInfo=w.value.items[0].typeInfo,i.getCell(o,0).className=w.value.items[0].className,i.getCell(o,0).typeInfo.using.itemId=o,o++;const l=this.firstAction(e,t);if(l===null)return!1;const a=i.ToScrollHTML(e,this.tblCssName()),r=new Q;r.props.name="",r.props.id=this.tblCssName(),r.props.className=this.tblCssName(),r.props.option.setTable(a),r.props.option.onSelect=async w=>{if(this.onSelect!==void 0){const k=new Ce;k.callerName=w.classify,k.result=w.selectedValue,await this.onSelect(k)}},this.htmlMaker=new H,this.htmlMaker.add(r);const c=this.htmlMaker.ToHTML();let m=document.createElement("dialog");m.className=e,m.innerHTML=c,this.ctlElem=m;let g=m.children[0];const u=this.divCssName();g.className=u,g.id=u;let p=g.children[0];p.className=`${this.tblCssName()}`,p.id=`${this.tblCssName()}`,l.appendChild(this.ctlElem),this.table=i,this.table.height="36";const d=this.resultTable(this.tblCssName());if(this.cells=new Array,d!==null){const w=d.rows[0];if(w!==null){const k=this.table.getCellElems(w);if(k!==null)for(const x of k)for(const B of x)this.cells.push(B)}}return!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}setFontConfig(e="0.9"){this.table.setFontConfig(e)}applyCss(){const e=`${this.getBaseElem().className}-guidebar-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
${this.table.getCssText(this.divCssName())}
.${this.ctlName} {
width: 300px;
}
/*後で消す
.${this.tblCssName()} button {
width: 100%;
}
*/
        `.trim(),document.head.appendChild(t)}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}getVisible(){return this.ctlElem===null?!1:this.ctlElem.hidden!==!0}setText(e,t){return this.cells===void 0?!1:0<=e&&e<this.cells.length?(this.cells[e].textContent=t,!0):!1}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}divCssName(){return`${this.ctlName}-div`}tblCssName(){return`${this.ctlName}-tbl`}}class ks{constructor(){this.itemType=D.Img,this.itemId=-1,this.label="",this.innerHTML=""}}class es{constructor(){this.toolTip="",this.using=new ks}setButton(e){this.using.itemType=D.Btn,this.using.label=e}setLabel(e,t){this.using.itemType=t?D.Label:D.LabelRO,this.using.label=e}setCombo(e){this.using.itemType=D.Combo,this.using.combo=e}setInput(e){this.using.itemType=D.Input,this.using.input=e}setCheck(e){this.using.itemType=D.Chk,this.using.check=e}setImg(e){this.using.itemType=D.Img,this.using.img=e}setPlain(e){this.using.itemType=D.Plain,this.using.innerHTML=e}setTable(e){this.using.itemType=D.Table,this.using.innerHTML=e}ToButtonHTML(e){const t=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"";return`
<button class="${e}"${t} title="${this.toolTip}">${this.using.label}</button>
`.trim()}ToLableHTML(e){return`
<span class="${e}" data-readonly="false">${this.using.label}</span>
`.trim()}ToLableROHTML(e){return`
<span class="${e}" data-readonly="true">${this.using.label}</span>
`.trim()}ToComboHTML(e){if(this.using.combo===void 0)return"";const t=this.using.combo;let s=Q.makeComboItemsHTML(t);const n=t.classify!==""?` data-classify="${t.classify}"`:"";return`
<select class="${e}" ${n} title="${this.toolTip}">
  ${s}
</select>
`.trim()}ToInputHTML(e){if(this.using.input===void 0)return"";const t=this.using.input,s=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"",n=t.value!==""?` value="${t.value}"`:"",i=t.placeholder!==""?` placeholder="${t.placeholder}"`:"",o=t.disableKeyDown===!0?' data-disableKeyDown="true"':"",l=t.enableClicked===!0?' data-enableClicked="true"':"",a=`${o}${l}`;return`
<input type="${t.type}" class="${e}"${s}${n}${i}${a} title="${this.toolTip}">
`.trim()}ToCheckHTML(e){if(this.using.check===void 0)return"";const t=this.using.check,s=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"",n=t.value?" checked":"",i=t.placeholder!==""?` placeholder="${t.placeholder}"`:"";return`
<div class="${e}-container">
 <span class="${e}-text">${this.toolTip}</span>
 <label class="${e}-label" title="${t.placeholder}">
  <input type="${t.type}" class="${e}"${s}${n}${i}>
  <span class="${e}-slider"></span>
 </label>
</div>
`.trim()}ToImgHTML(e,t){let s="";return this.using.img.imgSrc===""?s=`src="" data-filename="${this.using.img.imgFile}"`:s=`src="${this.using.img.imgSrc}"`,`
<img class="${e}" ${s} alt="${t}">
`.trim()}ToOverlayHTML(){return`<div class="overlay" title="${this.toolTip}"></div>`}}class Ts{constructor(){this.name="",this.id="",this.className="",this.option=new es}}class Q{constructor(){this.props=new Ts}ToHTML(e){let t="",s="";switch(e.option.using.itemType){case D.Btn:t=e.option.ToButtonHTML(e.className);break;case D.Label:t=e.option.ToLableHTML(e.className),s=e.option.ToOverlayHTML();break;case D.LabelRO:t=e.option.ToLableROHTML(e.className);break;case D.Plain:t=`
${e.option.using.innerHTML}
`.trim();break;case D.Combo:t=e.option.ToComboHTML(e.className);break;case D.Input:t=e.option.ToInputHTML(e.className);break;case D.Chk:t=e.option.ToCheckHTML(e.className);break;case D.Img:t=e.option.ToImgHTML(e.className,e.option.using.img.alt),s=e.option.ToOverlayHTML();break}return`
  ${t}
  ${s}
`.trim()}MakeSelectableHTML(){return`
<div class="${this.props.name}" id="${this.props.name}" item-id="${this.props.id}">
${this.ToHTML(this.props)}
</div>
`.trim()}static makeComboItemsHTML(e){if(e.selectionPair===void 0||e.selectionPair.length<=0)return"";let t="";for(const s of e.selectionPair){let[n,i]=s.split("/");i=i.trim();const o=e.selectedItem===i?" selected":"",l=`
<option value="${i}"${o}>${n}</option>
`.trim();t+=l}return t}}class H{constructor(){this._defaultButtonsName="dialog-buttons",this._defaultToolButtonsName="dialog-tool-btns",this._enableScrollEvt=!1,this._scrollTimer=null,this._isScrolling=!1,this.onButtonClicked=e=>{const t=e.target;if(t===null)return;const s=t.tagName==="BUTTON"?t:t.parentElement;if(s===null)return;let n=this.supplessSelected(s.className);if(n!==""){n=`.${n}`;const o=document.querySelectorAll(`${n}.selected`);o!==null&&o.forEach(l=>l.classList.remove("selected")),s.classList.add("selected")}const i=s.getAttribute("item-id");if(i){const o=this.itemList.find(l=>`${l.props.id}`===i);if(o){if(o.props.option.onSelect){let l="";t.tagName==="BUTTON"&&(l=t.getAttribute("item-id"),l===null&&(l=""));const a=new Pe;a.parentElem=t.parentElement,a.item=o,a.targetId=l,o.props.option.onSelect(a)}this.selectedCh=o}else{let l=this.getTopElement(t);if(l?.tagName==="TABLE"){const a=l.className,r=this.itemList.find(c=>c.props.className===a);if(r){if(r.props.option.onSelect){let c="";t.tagName==="BUTTON"&&(c=t.getAttribute("item-id"),c===null&&(c=""));const m=new Pe;m.parentElem=t.parentElement,m.item=r,m.targetId=c,m.classify=this.supplessSelected(t.className),r.props.option.onSelect(m)}this.selectedCh=r}}}}},this.onInputKeydown=e=>{const t=e.target;if(t===null||t.tagName!=="INPUT")return;const s=t,n=e;let i=ce.None;switch(n.key){case Oe.Enter:i=ce.Normal;const o=n.repeat,l=n.timeStamp;let a=s.dataset.pressInfo;if(a===void 0)a=`1;${l}`,i=ce.Normal;else if(!o){const c=a.split(";");if(c.length===2){let m=parseInt(c[0]),g=parseFloat(c[1]);l-g>=4*1e3?m=1:(m++,m>=3&&(m=0,i=ce.Special)),a=`${m};${l}`}}s.dataset.pressInfo=a,n.preventDefault();break;case Oe.Escape:s.value="元の値",s.blur();break;case Oe.Tab:break;case Oe.Process:return;default:s.dataset.disablekeydown!==void 0&&n.preventDefault();return}this.notifyOnInputEvent(s,ve.KeyDown,n.key,i)},this.onInputClicked=e=>{const t=e.target;if(t===null||t.tagName!=="INPUT")return;const s=t;s.dataset.enableclicked!==void 0&&this.notifyOnInputEvent(s,ve.Click,"",ce.None)},this.onSelectChange=e=>{const t=e.target;if(t===null||t.tagName!=="SELECT")return;const s=t?.dataset.classify;let n=t.getAttribute("item-id");if(n===null){const i=this.getTopElement(t);i!==null&&(n=i.getAttribute("item-id"))}if(n){let i=this.itemList.find(o=>`${o.props.id}`===n);if(i===void 0&&(i=this.itemList.find(o=>`${s}${o.props.id}`===n)),i){if(i.props.option.onSelect){const o=new Pe;o.parentElem=t.parentElement,o.item=i,o.targetId=n,o.classify=s===void 0?"?":s,o.selectedValue=t.value,i.props.option.onSelect(o)}this.selectedCh=i}}},this.itemList=new Array}add(e){this.itemList.push(e)}get DefaultBlueColor(){return"#86aef7e6"}get DefaultYellowColor(){return"#f7eb86e6"}get DefaultBorderColor(){return"#2c3e50ff"}MakeDefaultDialogParentCss(e,t,s,n=0){return`
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
  ${q.borderShadowText}
}
`.trim()}MakeDefaultDialogCss(e){return`
.${e} {
  background-color: #f7eb86e6;
  border: 2px solid #2c3e50;
  padding: 10px;
  ${q.borderShadowText}
}
`.trim()}ToHTML(){let e="";for(const t of this.itemList){if(t.props.option.using.itemType===D.Table){e+=t.props.option.using.innerHTML;continue}e+=t.MakeSelectableHTML()}return`${e}`}MakeTableScrollCss(e,t,s=!1){return`
.${e} {
height: ${t}px;              /* ダイアログに合わせた固定高 */
overflow-y: auto;
overflow-x: ${s?"auto":"hidden"};
-webkit-overflow-scrolling: touch;  /* iPad用の滑らか設定 */
border: 1px solid #7b1fa2;        /* 紫色の枠線 */
background: rgba(192, 192, 192, 0.6);
${q.scrollBarText}
}
`.trim()}MakeScrollableList(e){let t="";for(const s of this.itemList)t+=s.MakeSelectableHTML();return`<div id="${e}" class="${e} scroll">
${t}
</div>`}MakeDefaultScrollCss(e,t){return`
.${e} .scroll {
max-height: ${t}px;
overflow-y: auto;
${q.scrollBarText}
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
    ${q.footerButtonText()}
}`.trim()}get defaultToolButtonsCssName(){return this._defaultToolButtonsName}set defaultToolButtonsCssName(e){this._defaultToolButtonsName=e}MakeDefaultToolButtonsHTML(e){return`
<div class="${this.defaultToolButtonsCssName}">
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
    ${q.footerButtonText()}
}`.trim()}initFullScreen(e,t){const s=document.getElementById(e);if(s===null)return!1;s.innerHTML=`
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
`.trim(),document.head.appendChild(s),!0}hideFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.add("hidden")}showFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.remove("hidden")}getFullScreenMsgElem(e){const t=document.getElementById(e);if(t){const s=t.querySelectorAll("p");return s!==null&&s.length>=1?s[0]:null}return null}initObserver(e,t){const s=document.getElementById(e);if(!s)return;const n=async l=>{await l.forEach(async a=>{if(a.isIntersecting){const r=a.target,c=this.isDemo&&!t.isMaterial(r.dataset.filename)?"demo.png":r.dataset.filename;if(console.log(`[${this.isDemo}] 見えた！:${r.dataset.filename}`),c&&r.src===""||r.src.startsWith(window.location.origin)){const m=await t.findNs(c);m===null||m===""?(this.observer.unobserve(r),console.log(`cannot set image : ${c}`)):await t.getImageUrlBy(c,m).then(g=>{g!==null?(r.src=g,this.observer.unobserve(r)):console.log(`pending set image : ${c}`)})}}})},i={root:s,rootMargin:"0px",threshold:.1};this.observer=new IntersectionObserver(n,i),s.querySelectorAll("img[data-filename]").forEach(l=>this.observer.observe(l)),console.log("[initObserver] enabled!")}get isDemo(){return window.EVONA_CONFIG.demo}get isScrolling(){return this._enableScrollEvt?!(this._scrollTimer!==null&&this._isScrolling):!1}enableScrollEvent(e){this._isScrolling=!1;const t=document.getElementById(e);return t?(this._enableScrollEvt=!0,t.addEventListener("scroll",()=>{this._isScrolling=!0,clearTimeout(this._scrollTimer),this._scrollTimer=setTimeout(()=>{this._scrollTimer=null,this._isScrolling=!1;const s=this.observer.takeRecords();console.log(`[enableScrollEvent] stopped ${s.length}`)},200)}),console.log("[enableScrollEvent] enabled!"),!0):!1}enableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(n=>{const i=n.querySelectorAll("img");i.length>=1&&(i[0],this.addButtonEvent(t,n));const o=n.querySelectorAll("span");o.length>=1&&o[0]?.dataset.readonly=="false"&&this.addButtonEvent(t,n);const l=n.querySelectorAll("select");l.length>=1&&(l[0],this.addSelectEvent(t,n));const a=n.querySelectorAll("button");if(a.length>=1)for(const r of a)console.log(`${n.tagName}::${t}::button::${r.innerHTML}`),n.addEventListener("click",this.onButtonClicked)})}enableTableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(n=>{const i=n.querySelectorAll("table");if(i.length>=1)for(const o of i)o.addEventListener("click",this.onButtonClicked),o.addEventListener("keydown",this.onInputKeydown),o.addEventListener("click",this.onInputClicked),o.addEventListener("change",this.onSelectChange)})}disableTableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(n=>{const i=n.querySelectorAll("table");if(i.length>=1)for(const o of i)n.removeEventListener("click",this.onButtonClicked),n.removeEventListener("keydown",this.onInputKeydown),n.removeEventListener("click",this.onInputClicked),n.removeEventListener("change",this.onSelectChange)})}addButtonEvent(e,t){t.getAttribute("item-id")&&t.addEventListener("click",this.onButtonClicked)}notifyOnInputEvent(e,t,s,n){const i=e.getAttribute("item-id");if(i){let o=this.getTopElement(e);if(o?.tagName==="TABLE"){const l=o.className,a=this.itemList.find(r=>r.props.className===l);if(a){const r=new Pe;r.parentElem=e.parentElement,r.item=a,r.targetId=i,r.classify=this.supplessSelected(e.className),r.eventType=t,r.Keydown=s,r.KeyEnter=n,a.props.option.onSelect(r)}}}else console.log("**notifyOnInputEvent::invalid id**"),console.log(e)}addSelectEvent(e,t){t.addEventListener("change",s=>{const n=s.target,i=n?.dataset.classify,o=t.getAttribute("item-id");if(o){let l=this.itemList.find(a=>`${a.props.id}`===o);if(l===void 0&&(l=this.itemList.find(a=>`${i}${a.props.id}`===o)),l){if(l.props.option.onSelect){const a=new Pe;a.item=l,a.targetId=o,a.classify=i===void 0?"?":i,a.selectedValue=n.value,l.props.option.onSelect(a)}this.selectedCh=l}}})}supplessSelected(e){let t=e,s=e.indexOf(" selected");return s>=0&&(t=e.substring(0,s)),t}getTopElement(e){let t=e.parentElement;for(;t!==null;){if(t.tagName==="DIV"){t=t.parentElement;continue}if(t.tagName==="TD"){t=t.parentElement;continue}if(t.tagName==="TR"){t=t.parentElement;continue}if(t.tagName==="TBODY"){t=t.parentElement;continue}break}return t}GetRect(e){const t=e.getBoundingClientRect(),s=new rt;return s.left=`${t.left}`,s.top=`${t.top}`,s.width=`${t.width}`,s.height=`${t.height}`,s}EnableElem(e,t){e.ariaDisabled=t?"false":"true"}IsEnabledElem(e){return e.ariaDisabled===null?!0:e.ariaDisabled==="false"}EnableId(e,t){const s=document.getElementById(e);return s===null?null:(this.EnableElem(s,t),t)}IsEnabledId(e){const t=document.getElementById(e);return t===null?null:this.IsEnabledElem(t)}ToElem(e){const t=document.createElement("div");if(t===null)return null;t.innerHTML=e;const s=t.firstElementChild;return t.remove(),s}ReplaceElem(e,t){if(t===null)return;const s=document.getElementsByClassName(e);if(s.length===0)return;const n=s[0],i=new Array;let o=-1,l=-1;for(const m of n.children)o++,m.className===t.className&&m.tagName===t.tagName?l=o:i.push(m);if(l===-1)return;const a=n.children.length,r=new Array;for(const m of n.children)r.push(m);for(const m of r)n.removeChild(m),m.remove();r.slice(0,r.length);let c=-1;for(o=0;o<a;o++)o===l?n.appendChild(t):(c++,n.appendChild(i[c]))}GetIdByIndex(e){return this.itemList[e].props.id}UnselectAll(e){const t=`.${e}`;document.querySelectorAll(`${t}.selected`).forEach(s=>s.classList.remove("selected"))}SelectByID(e,t){const s=this.FindByID(e,t);if(s){s.classList.add("selected");const n=s.getAttribute("item-id");if(n){const i=this.itemList.find(o=>`${o.props.id}`===n);i&&(this.selectedCh=i)}return s}return null}FindDivByClassName(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.querySelectorAll("div");for(const l of o)if(l.className===t||l.className.startsWith(t))return l}return null}FindByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t)return i}return null}FindImgByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("img");return l.length>=1?l[0]:null}}return null}FindImgsByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("img");return l.length>=1?l:null}}return null}FindDivByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("div");return l.length>=1?l[0]:null}}return null}FindSelectByID(e,t,s){const n=`.${e}`,i=document.querySelectorAll(`${n}`);for(const o of i){const l=o.getAttribute("item-id");if(l&&l===t){const a=o.querySelectorAll("select");if(a.length>=1){for(const r of a)if(r?.dataset.classify===s)return r}return null}}return null}ReplaceImg(e,t,s){const n=this.FindImgByID(e,t);return n===null?null:(n.dataset.filename,n.src=s,n)}ReplaceDivToolTip(e,t,s){const n=this.FindDivByID(e,t);return n===null?null:(n.title=s,n)}ReplaceImgToolTip(e,t,s){const n=this.FindImgByID(e,t);return n===null?null:(n.title=s,n)}SwapImgSrcAndPairToolTip(e,t){if(e===null||t===null)return!1;const s=e.parentElement,n=t.parentElement;let i=null,o=null;if(s!==null){for(const r of s.children)if(r.tagName==="DIV"){i=r;break}}if(n!==null){for(const r of n.children)if(r.tagName==="DIV"){o=r;break}}const l=e.src,a=t.src;if(e.src=a,t.src=l,i!==null&&o!==null){const r=i.title,c=o.title;i.title=c,o.title=r}else console.log("[SwapImgSrcAndBrosToolTip] cannot swap title");return!0}SetImgSrc(e,t){if(e===null)return null;e.dataset.filename,e.src=t}SetImgSize(e,t,s){if(e===null)return null;e.style.width=`${t}px`,e.style.height=`${s}px`}ReplaceComboItems(e,t,s){const n=this.FindSelectByID(e,t,s.classify);if(n===null)return null;n.querySelectorAll("option").length>=1&&(n.innerHTML="");const o=Q.makeComboItemsHTML(s);return o!==""&&(n.innerHTML=o),n}setVisible(e,t){const s=document.getElementById(e);return s===null?null:(s.hidden=!t,!0)}copyCssToInlineStyle(e,t){for(const s of document.styleSheets){let n;try{n=s.cssRules}catch{continue}for(const i of n)if(i instanceof CSSStyleRule&&i.selectorText===e){const o=i.style;console.log(`[copyCssToInlineStyle] coping [${e}]`);for(let l=0;l<o.length;l++){const a=o[l],r=o.getPropertyValue(a);t.style.setProperty(a,r)}return}}}}const Se={Hide:"Hide",CopyPaste:"CopyPaste"},Ge={Hide:"Hide",MoveLowest:"MoveLowest"},xe={Hide:"Hide",DialogHide:"DialogHide"},Ve={Hide:"Hide",Help:"Help"},ze={Hide:"Hide",Guide:"Guide"},fe={Copy:"Copy",Paste:"Paste",Cancel:"Cancel"};class ue{constructor(){this.title="",this.dlgName="",this.B2Type=Se.Hide,this.B3Type=Ge.MoveLowest,this.B4Type=xe.Hide,this.B5Type=Ve.Hide,this.GType=ze.Hide,this.initLeft=0,this.initTop=0,this.cornerIndex=-1,this.mover=new Es,this.moverOnMoveDone=async()=>{this.onMoveDone!==void 0&&(await this.onMoveDone(this.dlg),this.cornerIndex=0)},this.resizer=new $s,this.resizerOnResizeDone=async(e,t)=>{this.onResizeDone!==void 0&&await this.onResizeDone(this.dlg,e,t)},this.b2cursor="",this.isIPad=/iPad|Macintosh/.test(navigator.userAgent)&&"ontouchend"in document,this.isTouchDevice=()=>"ontouchstart"in window||navigator.maxTouchPoints>0}SetB2Type(e=Se.CopyPaste,t){this.B2Type=e,this.onCopyPaste=t}SetB3Type(e=Ge.MoveLowest){this.B3Type=e}SetB4Type(e=xe.Hide){this.B4Type=e}SetB5Type(e=Ve.Help,t){this.B5Type=e,this.onHelp=t}SetGuide(e=ze.Guide,t){this.GType=e,this.onGuide=t}NewDialog(e,t){this.dlgName=t;const s=document.createElement("dialog");s.id=t,s.className=t;const n=document.getElementById(e);return n.appendChild(s),this.dlgParent=n,this.dlg=s,s}SetContent(e,t,s=!0){const n=this.dlg,i=`<button class="${this.toolNameB0}" id="${this.toolNameB0}" title="DragMove">[＊]</button>`,o=`<button class="${this.toolNameB1}" id="${this.toolNameB1}" title="SideBy">[≫]</button>`;let l="";this.B2Type===Se.CopyPaste&&(l=`<button class="${this.toolNameB2}" id="${this.toolNameB2}" title="Copy&Paste">[⇔]</button>`);let a="";this.B3Type===Ge.MoveLowest&&(a=`<button class="${this.toolNameB3}" id="${this.toolNameB3}" title="MoveLowest">[_]</button>`);let r="";this.B4Type===xe.DialogHide&&(r=`<button class="${this.toolNameB4}" id="${this.toolNameB4}" title="Close">[×]</button>`);let c="";this.B5Type===Ve.Help&&(r=`<button class="${this.toolNameB5}" id="${this.toolNameB5}" title="Help">[？]</button>`);let m="";this.GType===ze.Guide&&(m=`
<div class="${this.toolNameGuideOwn}" id="${this.toolNameGuideOwn}" style="position: relative;">
<button class="${this.toolNameGuideCtl}" id="${this.toolNameGuideCtl}" title="Guide">[G]</button>
</div>
`);const g=`${i}${o}${l}${a}${r}${c}${m}`;let u="";this.title!==""?u=`<div class="${this.titleName}">${this.title}${g}</div>`:u=`<div class="${this.titleName}">${g}</div>`;const p=document.createElement("div");p.innerHTML=u,n.innerHTML=t;const d=document.getElementById(e);d.hidden=s,d.appendChild(p),d.appendChild(n),this.applyCss()}EnableEventHandlers(){const e=this.dlgParent.style.left,t=this.dlgParent.style.top;this.initLeft=parseInt(e.substring(0,e.length-2)),this.initTop=parseInt(t.substring(0,t.length-2)),console.log(`[EnableEventHandlers] ${this.dlgParent.id}::(${e},${t})::(${this.initLeft},${this.initTop})`);const s=document.getElementById(`${this.toolNameB0}`);s!==null&&(this.mover.onMoveDone=this.moverOnMoveDone,this.mover.attach(s,this.dlgParent));const n=document.getElementById(`${this.toolNameB1}`);n!==null&&(n.onclick=async()=>{if(this.dlgParent===void 0)return;const i=window.innerWidth,o=window.innerHeight,l=this.dlgParent.offsetWidth/2,a=Math.max(this.dlgParent.offsetWidth,this.dlg.offsetWidth),r=this.dlgParent.offsetHeight+this.dlg.offsetHeight;switch(this.cornerIndex=(this.cornerIndex+1)%4,this.cornerIndex){case 0:this.dlgParent.style.left=`${l}px`,this.dlgParent.style.top="0px";break;case 1:this.dlgParent.style.left=`${i-a+l}px`,this.dlgParent.style.top="0px";break;case 2:this.dlgParent.style.left=`${i-a+l}px`,this.dlgParent.style.top=`${o-r}px`;break;case 3:this.dlgParent.style.left=`${l}px`,this.dlgParent.style.top=`${o-r}px`;break}}),this.B2Type===Se.CopyPaste&&(document.getElementById(`${this.toolNameB2}`).onclick=async()=>{if(this.dlgParent===void 0||this.onCopyPaste===void 0)return;if(this.isB2Allow()===!1){console.log(`[${this.dlgName}] not-allowed copy-paste`);return}const i=this.dlgParent,o=i.querySelectorAll(`.${this.toolNameB2}`),l=o.length>=1?o[0]:null,a=new H;if(a.IsEnabledElem(l)===!1)return;const r=new Array,c=new $e;c.key=fe.Copy,c.text="クリップボードへコピー",r.push(c);const m=new $e;m.key=fe.Paste,m.text="クリップボードからペースト",r.push(m);const g=new $e;g.key=fe.Cancel,g.text="キャンセル",r.push(g);const u=new ys;u.setChoiceItems(r),a.EnableElem(l,!1);const p=a.GetRect(i);a.GetRect(this.dlg);const d=a.GetRect(l),w=this.dlg.className;u.setListener(`${w}-choice`,w,`${w}-B2`),u.applyCss(),u.show(`${parseInt(d.left)-parseInt(p.left)}`,"0"),u.enableEvents(async k=>{console.log(`[onSelect] ${k.callerName} ${k.result}`),u.dispose(),this.onCopyPaste(this.dlg,k.result),a.EnableElem(l,!0)})}),this.B3Type===Ge.MoveLowest&&(document.getElementById(`${this.toolNameB3}`).onclick=async()=>{if(this.dlgParent===void 0)return;new M().MoveLowestLayer(this.dlgParent)}),this.B4Type===xe.DialogHide&&(document.getElementById(`${this.toolNameB4}`).onclick=async()=>{if(this.dlgParent===void 0)return;new H().setVisible(this.dlgParent.className,!1)}),this.B5Type===Ve.Help&&(document.getElementById(`${this.toolNameB5}`).onclick=async()=>{this.dlgParent!==void 0&&this.onHelp!==void 0&&await this.onHelp(this.dlg,this.B5Type)}),this.GType===ze.Guide&&(document.getElementById(`${this.toolNameGuideOwn}`).onclick=async()=>{if(this.dlgParent!==void 0&&this.onGuide!==void 0){const o=this.dlgParent.querySelectorAll(`.${this.toolNameGuideOwn}`),l=o.length>=1?o[0]:null;l!==null&&await this.onGuide(this.dlg,this.GType,l)}})}EnableResize(){if(this.isIPad&&this.isTouchDevice()){console.log("EVONA: Touch device detected. Priority given to flick scrolling.");return}const e=`<button class="${this.handleNameB0}" id="${this.handleNameB0}" title="Resize">[」]</button>`,t=document.createElement("div");t.className=this.handleName,t.id=this.handleName,t.innerHTML=`${e}`,this.dlg.appendChild(t);const s=document.getElementById(`${this.handleName}`);s!==null&&(s.style.position="absolute",s.style.left=`${this.dlg.clientWidth-s.clientWidth}px`,s.style.top=`${this.dlg.clientHeight-s.clientHeight}px`,this.resizer.onResizeDone=this.resizerOnResizeDone,this.resizer.attach(s,this.dlg))}static GetDialogInfo(e){const t=this.FindDialogParent(e);if(t===null)return null;const s=t.querySelector("dialog");if(s===null)return null;const n=new De,i=s.clientWidth,o=s.clientHeight;return n.name=e,n.left=t.style.left,n.top=t.style.top,n.width=`${i}px`,n.height=`${o}px`,n}static SetDialogInfo(e){const t=this.FindDialogParent(e.name);if(t===null)return!1;const s=t.querySelector("dialog");return s===null?!1:(t.style.left=e.left,t.style.top=e.top,s.style.width=e.width,s.style.height=e.height,!0)}static FindDialogParent(e){const t=document.getElementById(e);return t??null}get titleName(){return`${this.dlgName}-dlg-title-00`}get toolNameB0(){return`${this.dlgName}-dlg-tool-b0`}get toolNameB1(){return`${this.dlgName}-dlg-tool-b1`}get toolNameB2(){return`${this.dlgName}-dlg-tool-b2`}get toolNameB3(){return`${this.dlgName}-dlg-tool-b3`}get toolNameB4(){return`${this.dlgName}-dlg-tool-b4`}get toolNameB5(){return`${this.dlgName}-dlg-tool-b5`}get toolNameGuideOwn(){return`${this.dlgName}-dlg-tool-guide-own`}get toolNameGuideCtl(){return`${this.dlgName}-dlg-tool-guide-ctl`}get handleName(){return`${this.dlgName}-dlg-handle-00`}get handleNameB0(){return`${this.dlgName}-dlg-handle-b0`}applyCss(){const e=`${this.dlgName}-header-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
/* タイトルバー全体 */
.${this.titleName} {
    display: flex;
    align-items: center;
    justify-content: space-between; /* 左右に振り分け */
${q.titleColorText}
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
`.trim(),document.head.appendChild(t)}setB2Allow(e=!0){const t=document.getElementById(`${this.toolNameB2}`);if(t===null)return;this.b2cursor===""&&(this.b2cursor=t.style.cursor);const s=e?this.b2cursor:"not-allowed";t.style.cursor=s}isB2Allow(){const e=document.getElementById(`${this.toolNameB2}`);return e===null?!1:e.style.cursor===this.b2cursor}}class De{constructor(){this.name="",this.left="",this.top="",this.width="",this.height=""}copyTo(e){e.name=this.name,e.left=this.left,e.top=this.top,e.width=this.width,e.height=this.height}}class M{add(e){M.dlgElems.push(e)}AddDialogs(){M.dlgElems=new Array;const e=document.querySelectorAll("div");for(const t of e)t.style.zIndex!==""&&(parseInt(t.style.zIndex)>=M.ignoreIndex||t.querySelector("dialog")&&(console.log(`${t.id} added!`),this.add(t)))}AssignIndexies(){let e=M.dlgElems.length-1;for(const t of M.dlgElems)t.style.zIndex=`${e}`,e--}MoveLowestLayer(e){M.dlgElems.length;for(const t of M.dlgElems)if(t.id===e.id)t.style.zIndex="0";else{const s=t.style.zIndex;t.style.zIndex=`${parseInt(s)+1}`}}MoveHiestLayer(e){M.dlgElems.length;let t=-1;for(const s of M.dlgElems){const n=parseInt(s.style.zIndex);n>=M.ignoreIndex||n>t&&(t=n)}for(const s of M.dlgElems)if(s.id===e.id){s.style.zIndex=`${t}`;break}for(const s of M.dlgElems)if(s.id!==e.id){if(parseInt(s.style.zIndex)>=M.ignoreIndex)continue;t--,s.style.zIndex=`${t}`}}FindByName(e){const t=M.dlgElems.find(s=>s.id===e);return t||null}async ForEachAsync(e){for(const t of M.dlgElems)t.parentNode!==null&&await e(t.id)}ReOrder(){M.dlgElems.sort((e,t)=>{const s=e.style.zIndex,n=t.style.zIndex;if(s===""||n==="")throw new Error("z-index が未設定の要素が混入しています");return parseInt(t.style.zIndex)-parseInt(e.style.zIndex)})}async SaveSetting(e,t=!0){if(this.canSave&&e!==null&&e.parentElement!==null){if(t&&this.FindByName(e.parentElement.className)===null){console.log(`${e.className} is out of managed dlg`);return}await this.initSetting(),await M.setingAccess.saveDialogPos(e)}}async LoadAllSetting(){if(this.canSave){await this.initSetting();for(const e of M.dlgElems){const t=e.querySelector("dialog");t!==null&&await M.setingAccess.loadDialogPos(t)}}}async loadSetting(e){this.canSave&&(await this.initSetting(),e!==null&&await M.setingAccess.loadDialogPos(e))}async initSetting(){M.setingAccess===null&&(M.setingAccess=new Qt,await M.setingAccess.init())}get canSave(){return!new H().isDemo}}M.ignoreIndex=1e3;M.setingAccess=null;class Es{constructor(){this.isDragging=!1,this.startX=0,this.startY=0}attach(e,t){e.onpointerdown=s=>{e.setPointerCapture(s.pointerId),this.isDragging=!0,this.startX=s.clientX-t.offsetLeft,this.startY=s.clientY-t.offsetTop,e.style.cursor="grabbing"},e.onpointermove=s=>{if(!this.isDragging)return;const n=s.clientX-this.startX,i=s.clientY-this.startY;t.style.left=`${n}px`,t.style.top=`${i}px`,t.style.margin="0"},e.onpointerup=async s=>{this.isDragging=!1,e.releasePointerCapture(s.pointerId),e.style.cursor="grab",this.onMoveDone!==void 0&&await this.onMoveDone()}}}class $s{constructor(){this.isDragging=!1,this.startX=0,this.startY=0,this.startW=0,this.startH=0,this.handleX=0,this.handleY=0}attach(e,t){e.onpointerdown=s=>{e.setPointerCapture(s.pointerId),this.isDragging=!0,this.startX=s.clientX,this.startY=s.clientY;const n=t.getBoundingClientRect();console.log(`[${t.className}] (${n.left},${n.top}) - (${n.width},${n.height})`),this.startW=n.width,this.startH=n.height,this.handleX=e.offsetLeft,this.handleY=e.offsetTop,e.style.cursor="grabbing"},e.onpointermove=s=>{if(!this.isDragging)return;const n=s.clientX-this.startX,i=s.clientY-this.startY;t.style.width=`${this.startW+n-e.clientWidth}px`,t.style.height=`${this.startH+i-e.clientHeight}px`,e.style.left=`${this.handleX+n}px`,e.style.top=`${this.handleY+i}px`,e.style.margin="0"},e.onpointerup=async s=>{if(this.isDragging=!1,e.releasePointerCapture(s.pointerId),e.style.cursor="grab",this.onResizeDone!==void 0){const n=t.getBoundingClientRect();await this.onResizeDone(`${n.width-this.startW}`,`${n.height-this.startH}`)}}}}const R={None:"None",Ok:"Ok",OkCancel:"OkCancel",YesNo:"YesNo",YesNoCancel:"YesNoCancel"},Fe={None:"None",Ok:"Ok",Question:"Question"},S={None:"None",Ok:"Ok",Cancel:"Cancel",Yes:"Yes",No:"No",Secret:"Secret"};class le{constructor(){this.parentName="evona-msg-box",this.buttonType=R.Ok,this.iconType=Fe.None,this.title="Confirm",this.btnS="",this.SecretEnable=!1,this.btnAlign="right",this.btnOk="OK",this.btnCancel="Cancel",this.btnYes="Yes",this.btnNo="No",this.CheckVisible=!1,this.CheckText="",this.Checked=!1,this.Result=S.None,this.AuthVisible=!1,this.authText="",this.authTextMax=4,this.onS1Clicked=e=>{this.Result=S.Secret,this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB1Clicked=e=>{switch(this.buttonType){case R.None:this.Result=S.None;break;case R.Ok:this.Result=S.Ok;break;case R.OkCancel:this.Result=S.Ok;break;case R.YesNo:this.Result=S.Yes;break;case R.YesNoCancel:this.Result=S.Yes;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB2Clicked=e=>{switch(this.buttonType){case R.None:this.Result=S.None;break;case R.Ok:this.Result=S.None;break;case R.OkCancel:this.Result=S.Cancel;break;case R.YesNo:this.Result=S.No;break;case R.YesNoCancel:this.Result=S.No;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB3Clicked=e=>{switch(this.buttonType){case R.None:this.Result=S.None;break;case R.Ok:this.Result=S.None;break;case R.OkCancel:this.Result=S.Cancel;break;case R.YesNo:this.Result=S.No;break;case R.YesNoCancel:this.Result=S.Cancel;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onWindowKeyboard=e=>{e.key.length===1&&this.onAuthKeyProc(e.key)},this.onAuthButtonClicked=e=>{const t=e.target;t!==null&&this.onAuthKeyProc(t.textContent)}}get btnNameS(){return`${this.parentName}-s1`}get btnName1(){return`${this.parentName}-b1`}get btnName2(){return`${this.parentName}-b2`}get btnName3(){return`${this.parentName}-b3`}get chkName1(){return`${this.parentName}-chk1`}get authName1(){return`${this.parentName}-auth1`}get authBtnName(){return`${this.parentName}-authBtn`}setParent(e){this.parentName=`${e}-msg-box`}setTypes(e,t){this.buttonType=e,this.iconType=t}setOk(e=Fe.Ok){this.setTypes(R.Ok,e)}setOkCancel(e=Fe.Question){this.setTypes(R.OkCancel,e)}setYesNo(e=Fe.Question){this.setTypes(R.YesNo,e)}setYesNoCancel(e=Fe.Question){this.setTypes(R.YesNoCancel,e)}async showWait(e,t=null){return this.remove(),this.createUI(e,t===null?this.title:t,!0),new Promise(s=>{this.resolver=s;let n=!1,i=!1,o=!1;switch(this.buttonType){case R.None:break;case R.Ok:n=!0,i=!1,o=!1;break;case R.OkCancel:n=!0,i=!0,o=!1;break;case R.YesNo:n=!0,i=!0,o=!1;break;case R.YesNoCancel:n=!0,i=!0,o=!0;break}n&&document.getElementById(this.btnName1)?.addEventListener("click",this.onB1Clicked,{once:!0}),i&&document.getElementById(this.btnName2)?.addEventListener("click",this.onB2Clicked,{once:!0}),o&&document.getElementById(this.btnName3)?.addEventListener("click",this.onB3Clicked,{once:!0}),this.SecretEnable&&document.getElementById(this.btnNameS)?.addEventListener("click",this.onS1Clicked,{once:!0})})}onAuthKeyProc(e){if(this.authText.length<this.authTextMax&&/[a-zA-Z0-9]/.test(e)){this.authText+=e;const t=this.authText.length;let s="";for(let i=0;i<this.authTextMax;i++)i<t?s+="●":s+="○";const n=document.getElementById(this.authName1);n.innerText=s}if(this.authText.length>=this.authTextMax&&this.onAuthChecking!==void 0&&this.onAuthChecking(this.authText)){window.removeEventListener("keydown",this.onWindowKeyboard);for(let s=0;s<10;s++){const n=`${this.authBtnName}-b${s}`,i=document.querySelectorAll(`.${n}`);if(i.length!==1)continue;const o=i[0];o!==null&&o.removeEventListener("click",this.onAuthButtonClicked)}this.remove(),this.resolver&&this.resolver(this.Result)}}showNoWait(e,t="INFO"){this.remove(),this.createUI(e,t,!1)}showNoWaitEnd(){this.remove()}createUI(e,t,s){let n=`<button id="${this.btnNameS}" class="${this.btnNameS}">${this.btnS}</button>`,i="",o="",l="";switch(this.buttonType){case R.None:break;case R.Ok:i=`<button id="${this.btnName1}">${this.btnOk}</button>`,o="";break;case R.OkCancel:i=`<button id="${this.btnName1}">${this.btnOk}</button>`,o=`<button id="${this.btnName2}">${this.btnCancel}</button>`;break;case R.YesNo:i=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`;break;case R.YesNoCancel:i=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`,l=`<button id="${this.btnName3}">${this.btnCancel}</button>`;break}let a="";this.CheckVisible&&(a=`
<div style="padding: 5px 10px; font-size: 0.9em; text-align: left;">
    <label>
        <input type="checkbox" id="${this.chkName1}">${this.CheckText}
    </label>
</div>
`.trim());let r="";if(this.AuthVisible){let u="";for(let p=0;p<10;p++){const d=`${this.authBtnName}-b${p}`;u+=`<button class="${d}" id="${d}">${p}</button>`}r=`
<div style="padding: 5px 10px; font-size: 0.9em; text-align: left;">
    <label>
        <div class="${this.authName1}" id="${this.authName1}" tabindex="0">〇 〇 〇 〇</div>
    </label>
    ${u}
</div>
`.trim()}const c=`${a}${i}${o}${l}`,m=c!==""?`<div class="msg-footer">${c}</div>`:"",g=document.createElement("div");if(g.id=this.parentName,g.innerHTML=`
            <div class="msg-overlay">
                <div class="msg-panel">
                    <div class="msg-header">${t}${n}</div>
                    <div class="msg-body">${e}${r}</div>
                    ${m}
                </div>
            </div>
        `.trim(),this.applyCss(),document.body.appendChild(g),this.AuthVisible){document.getElementById(this.authName1).focus(),this.authText="",window.addEventListener("keydown",this.onWindowKeyboard);for(let p=0;p<10;p++){const d=`${this.authBtnName}-b${p}`,w=document.querySelectorAll(`.${d}`);if(w.length!==1)continue;const k=w[0];k!==null&&k.addEventListener("click",this.onAuthButtonClicked)}}}applyCss(){const e=`${this.parentName}-style`;if(document.getElementById(e))return;let t="";for(let n=0;n<10;n++){const i=`${this.authBtnName}-b${n}`;t+=`
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
`.trim(),document.head.appendChild(s)}setCheckResult(){const e=document.getElementById(this.chkName1);if(e!==null){const t=e.checked;this.Checked=t}}remove(){document.getElementById(this.btnName1)?.removeEventListener("click",this.onB1Clicked),document.getElementById(this.btnName2)?.removeEventListener("click",this.onB2Clicked),document.getElementById(this.btnName3)?.removeEventListener("click",this.onB3Clicked),document.getElementById(this.btnNameS)?.removeEventListener("click",this.onS1Clicked),document.getElementById(this.parentName)?.remove()}}class Ss{constructor(){this.intervalMs=1e3,this.isOneShot=!0,this.intervalTimer=null}start(e,t){this.intervalTimer!==null&&this.clear(),this.intervalTimer=setTimeout(async()=>{t!==void 0&&(await t(e)||this.clear()),this.isOneShot===!0&&this.clear()},this.intervalMs)}clear(){clearTimeout(this.intervalTimer),this.intervalTimer=null}}const se={Resource:"Resource",ScoreUI:"ScoreUI",GameUI:"GameUI"},Re={Sequence:"Sequence",Text:"Text"};class Ht{constructor(){this.key="",this.text=""}static copy(e,t){t.key=e.key,t.text=e.text}}class ct extends Ht{constructor(){super(...arguments),this.comment=""}static copy(e,t){t.key=e.key,t.text=e.text,t.comment=e.comment}}class ht extends Ht{constructor(){super(...arguments),this.selectType=Re.Sequence,this.start="",this.end="",this.step="",this.keyValue=""}static copy(e,t){t.key=e.key,t.text=e.text,t.selectType=e.selectType,t.start=e.start,t.end=e.end,t.step=e.step,t.keyValue=e.keyValue}get isScoreAvail(){if(this.key.trim().length===0||this.text.trim().length===0)return!1;if(this.selectType===Re.Sequence){if(this.start.trim().length===0||this.end.trim().length===0||this.step.trim().length===0)return!1}else if(this.keyValue.trim().length===0)return!1;return!0}}class mt extends Ht{constructor(){super(...arguments),this.formation="",this.nsEnable=!1,this.nsCombo="",this.nsScore="",this.gameEnable=!1,this.gameCombo="",this.gameScore=""}static copy(e,t){t.key=e.key,t.text=e.text,t.formation=e.formation,t.nsEnable=e.nsEnable,t.nsCombo=e.nsCombo,t.nsScore=e.nsScore,t.gameEnable=e.gameEnable,t.gameCombo=e.gameCombo,t.gameScore=e.gameScore}get nsComboAvail(){return this.nsEnable===!1||this.nsCombo.trim().length===0||this.nsScore.trim().length===0?0:parseInt(this.nsCombo.trim())}get gameComboAvail(){return this.gameEnable===!1||this.gameCombo.trim().length===0||this.gameScore.trim().length===0?0:parseInt(this.gameCombo.trim())}get nsComboScoreList(){let e=this.nsComboAvail;return e===0?new Map:this.toScoreMap(this.nsScore,e)}get gameComboScoreList(){let e=this.gameComboAvail;return e===0?new Map:this.toScoreMap(this.gameScore,e)}toScoreMap(e,t){const s=new Map,n=e.split(",");if(n.length===0)return s;for(const i of n){const o=parseInt(i);s.set(t,o),t++}return s}}function xs(){const h=(e,t)=>{const s=e;for(const n of s.inst){const i=new ct;ct.copy(n,i);const o=new Qe;o.resItem=i,o.owner=t,t.itemList.push(o)}};return{gameType:z.none,editorType:se.Resource,logType:be.ResourceEditAction,fromJsonText:Et.fromJsonText,logToItem:h}}function ts(){const h=(e,t)=>{const s=e;for(const n of s.inst){const i=new mt;mt.copy(n,i);const o=new Qe;o.gameItem=i,o.owner=t,t.itemList.push(o)}};return{gameType:z.none,editorType:se.GameUI,logType:be.GameEditAction,fromJsonText:$t.fromJsonText,logToItem:h}}function vs(h){const e=(t,s)=>{const n=t;if(n.gameType===h)for(const i of n.inst){const o=new ht;ht.copy(i,o);const l=new Qe;l.scItem=o,l.owner=s,s.itemList.push(l)}};return{gameType:h,editorType:se.ScoreUI,logType:be.ScoreEditAction,fromJsonText:St.fromJsonText,logToItem:e}}class Qe{constructor(){this.resItem=new ct,this.gameItem=new mt,this.scItem=new ht}}class Dt{constructor(){this.gameType=z.none,this.itemList=new Array,this.initNumItems=10}setConfig(e){e!==void 0&&(this.editorConfig=e,this.gameType=e.gameType)}async loadGameConfig(e){this.setConfig(ts()),await this.load(se.GameUI,e);const t=this.itemList.filter(s=>s.gameItem.key===e);if(t.length!==0&&t[0].gameItem.key===e)return t[0].gameItem}setDefaultGameConfig(){this.init(),this.setDefaultGameConfigPq(),this.setDefaultGameConfigMm()}setDefaultGameConfigPq(){this.itemList[0].gameItem.key=z.classPq,this.itemList[0].gameItem.text="ぷよクエ",this.itemList[0].gameItem.formation="5"}setDefaultGameConfigMm(){this.itemList[1].gameItem.key=z.classMM,this.itemList[1].gameItem.text="メメントモリ",this.itemList[1].gameItem.formation="5"}init(){this.itemList=new Array;for(let e=0;e<this.initNumItems;e++){const t=new Qe;t.owner=this,this.itemList.push(t)}}async load(e,t){const s=this.getEditor(e);if(s===void 0)return;const n=s.logType,o=await(await we()).get(n);if(o===null){e===se.GameUI&&this.setDefaultGameConfig();return}const l=n,a=new Map,r=new Array;this.usingLog(l,o,a,r),this.itemList=new Array;for(const[c,m]of a){const g=s.fromJsonText(m.log);s.logToItem(g,this)}this.itemList.length===0&&this.init(),e===se.GameUI&&(this.itemList[0].gameItem.key.length===0&&this.setDefaultGameConfigPq(),this.itemList[1].gameItem.key.length===0&&this.setDefaultGameConfigMm())}async loadUnused(e){const s=await(await we()).get(e);if(s===null)return null;const n=new Map,i=new Array;return this.usingLog(e,s,n,i),i}usingLog(e,t,s,n){if(this.editorConfig!==void 0)for(const i of t){let l=this.editorConfig.fromJsonText(i.log).logType,a=!1,r=!1;switch(l){case ge.None:break;case ge.Add:a=!0;break;case ge.Update:a=!0;break;case ge.Delete:a=!0,r=!0;break}if(a)if(r){if(s.has(e)){const c=s.get(e);n.push(c),s.delete(e)}}else{if(s.has(e)){const c=s.get(e);n.push(c),s.delete(e)}s.set(e,i)}}}getEditor(e){return this.editorConfig}get editorType(){return this.editorConfig?.editorType}}class At{constructor(){this.gameType=z.none}}function Ms(){function h(){return`${n()}-key`}function e(){return`${n()}-text`}function t(){return`${n()}-comment`}function s(){return`${n()}-delete`}function n(){return`${se.Resource}-edit-table-row`}const i=(u,p,d,w)=>{const k=new j;k.value=p.resItem.key,k.placeholder="キー",w.getCell(u,d).typeInfo.setInput(k),w.getCell(u,d).className=h(),w.getCell(u,d).typeInfo.using.itemId=d+w.firstRowIndex},o=(u,p,d,w)=>{const k=new j;k.value=p.resItem.text,k.placeholder="文字列",w.getCell(u,d).typeInfo.setInput(k),w.getCell(u,d).className=e(),w.getCell(u,d).typeInfo.using.itemId=d+w.firstRowIndex},l=(u,p,d,w)=>{const k=new j;k.value=p.resItem.comment,k.placeholder="コメント",w.getCell(u,d).typeInfo.setInput(k),w.getCell(u,d).className=t(),w.getCell(u,d).typeInfo.using.itemId=d+w.firstRowIndex},a=(u,p,d,w)=>{w.getCell(u,d).typeInfo.setButton("削除"),w.getCell(u,d).className=s(),w.getCell(u,d).typeInfo.using.itemId=d+w.firstRowIndex},r=async(u,p,d)=>{const w=new Et;w.logType=ge.Add;for(const B of d){const $=new ct;for(const f of B.cells)for(const N of f.children){if(N.className===s())continue;const y=p.getElemValue(N)||"";switch(N.className){case h():$.key=y;break;case e():$.text=y;break;case t():$.comment=y;break}}w.inst.push($)}const k=Et.toJsonText(w);await(await we()).put(be.ResourceEditAction,k)},c=async(u,p)=>{switch(console.log(`classify = ${u.classify} targetId = ${u.targetId}`),u.classify){case s():const d=new le;d.setParent(p.dlgCssClassName());let w=S.None;switch(d.setYesNo(),w=await d.showWait(`${u.targetId} を削除しますか？`),w){case S.Yes:break;case S.No:return;case S.Cancel:return}const k=parseInt(u.targetId);k>=1&&(p.table.deleteRow(k),p.table.redimAllRows(),p.itemList.splice(k-p.table.firstRowIndex,1));break}};function m(){return`
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
${ss()}
}
`.trim()}const g=new At;return g.editItems=[{className:h(),colConfig:i},{className:e(),colConfig:o},{className:t(),colConfig:l},{className:s(),colConfig:a}],g.makeLog=r,g.onSelect=c,g.getCssText=m,g}function Ls(){function h(){return`${a()}-key`}function e(){return`${a()}-text`}function t(){return`${a()}-select-type`}function s(){return`${a()}-seq-type-start`}function n(){return`${a()}-seq-type-end`}function i(){return`${a()}-seq-type-step`}function o(){return`${a()}-text-type`}function l(){return`${a()}-delete`}function a(){return`${se.ScoreUI}-edit-table`}function r(){return`
.${h()} {
height: 90%;
}
.${e()} {
height: 90%;
}
.${t()} {
height: 108%;
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
${ss()}
}
`.trim()}const c=(f,N,y,b)=>{const C=new j;C.value=N.scItem.key,C.placeholder="キー",b.getCell(f,y).typeInfo.setInput(C),b.getCell(f,y).className=h(),b.getCell(f,y).typeInfo.using.itemId=y+b.firstRowIndex},m=(f,N,y,b)=>{const C=new j;C.value=N.scItem.text,C.placeholder="文字列",b.getCell(f,y).typeInfo.setInput(C),b.getCell(f,y).className=e(),b.getCell(f,y).typeInfo.using.itemId=y+b.firstRowIndex},g=(f,N,y,b)=>{const C=new Bt;C.selectionPair=[`連続/${Re.Sequence}`,`文字列/${Re.Text}`],C.selectedItem=N.scItem.selectType,C.classify="selectType",b.getCell(f,y).typeInfo.setCombo(C),b.getCell(f,y).className=t(),b.getCell(f,y).typeInfo.using.itemId=y+b.firstRowIndex},u=(f,N,y,b)=>{const C=new j;C.value=N.scItem.start,C.placeholder="開始",C.disableKeyDown=!0,C.enableClicked=!0,b.getCell(f,y).typeInfo.setInput(C),b.getCell(f,y).className=s(),b.getCell(f,y).typeInfo.using.itemId=y+b.firstRowIndex},p=(f,N,y,b)=>{const C=new j;C.value=N.scItem.end,C.placeholder="終了",C.disableKeyDown=!0,C.enableClicked=!0,b.getCell(f,y).typeInfo.setInput(C),b.getCell(f,y).className=n(),b.getCell(f,y).typeInfo.using.itemId=y+b.firstRowIndex},d=(f,N,y,b)=>{const C=new j;C.value=N.scItem.step,C.placeholder="ステップ",C.disableKeyDown=!0,C.enableClicked=!0,b.getCell(f,y).typeInfo.setInput(C),b.getCell(f,y).className=i(),b.getCell(f,y).typeInfo.using.itemId=y+b.firstRowIndex},w=(f,N,y,b)=>{const C=new j;C.value=N.scItem.keyValue,C.placeholder="key/valueを&quot;,&quot;で区切った文字列",C.disableKeyDown=!0,C.enableClicked=!0,b.getCell(f,y).typeInfo.setInput(C),b.getCell(f,y).className=o(),b.getCell(f,y).typeInfo.using.itemId=y+b.firstRowIndex},k=(f,N,y,b)=>{b.getCell(f,y).typeInfo.setButton("削除"),b.getCell(f,y).className=l(),b.getCell(f,y).typeInfo.using.itemId=y+b.firstRowIndex},x=async(f,N,y)=>{const b=new St;b.logType=ge.Add,b.gameType=f;for(const ne of y){const Z=new ht;for(const J of ne.cells)for(const ke of J.children){if(ke.className===l())continue;const ee=N.getElemValue(ke)||"";switch(ke.className){case h():Z.key=ee;break;case e():Z.text=ee;break;case t():Z.selectType=ee;break;case s():Z.start=ee;break;case n():Z.end=ee;break;case i():Z.step=ee;break;case o():Z.keyValue=ee;break}}b.inst.push(Z)}const C=St.toJsonText(b);await(await we()).put(be.ScoreEditAction,C)},B=async(f,N)=>{switch(console.log(`classify = ${f.classify} targetId = ${f.targetId}`),f.classify){case h():await N.showUpDn(f,Rs());break;case s():await N.showUpDn(f,wt());break;case n():await N.showUpDn(f,wt());break;case i():await N.showUpDn(f,wt());break;case o():await N.showMiniTableEditor(f,te.KeyValue,Be.asNumber,"スコアキー","スコア値");break;case l():const y=new le;y.setParent(N.dlgCssClassName());let b=S.None;switch(y.setYesNo(),b=await y.showWait(`${f.targetId} を削除しますか？`),b){case S.Yes:break;case S.No:return;case S.Cancel:return}const C=parseInt(f.targetId);C>=1&&(N.table.deleteRow(C),N.table.redimAllRows(),N.itemList.splice(C-N.table.firstRowIndex,1));break}},$=new At;return $.editItems=[{className:h(),colConfig:c},{className:e(),colConfig:m},{className:t(),colConfig:g},{className:s(),colConfig:u},{className:n(),colConfig:p},{className:i(),colConfig:d},{className:o(),colConfig:w},{className:l(),colConfig:k}],$.makeLog=x,$.onSelect=B,$.getCssText=r,$}function Bs(){function h(){return`${a()}-name`}function e(){return`${a()}-form`}function t(){return`${a()}-ns-enable`}function s(){return`${a()}-ns-combo`}function n(){return`${a()}-ns-score`}function i(){return`${a()}-game-enable`}function o(){return`${a()}-game-combo`}function l(){return`${a()}-game-score`}function a(){return`${se.GameUI}-edit-table`}const r=(f,N,y,b)=>{const C=new j;C.value=N.gameItem.text,C.placeholder="ゲーム名",b.getCell(f,y).typeInfo.setInput(C),b.getCell(f,y).className=h(),b.getCell(f,y).typeInfo.using.itemId=y+b.firstRowIndex},c=(f,N,y,b)=>{const C=new j;C.value=N.gameItem.formation,C.placeholder="編成数",C.disableKeyDown=!0,C.enableClicked=!0,b.getCell(f,y).typeInfo.setInput(C),b.getCell(f,y).className=e(),b.getCell(f,y).typeInfo.using.itemId=y+b.firstRowIndex},m=(f,N,y,b)=>{const C=new jt;C.value=N.gameItem.nsEnable,C.placeholder="NS有効",b.getCell(f,y).typeInfo.setCheck(C),b.getCell(f,y).className=t(),b.getCell(f,y).typeInfo.using.itemId=y+b.firstRowIndex,b.getCell(f,y).typeInfo.toolTip="N<br>S"},g=(f,N,y,b)=>{const C=new j;C.value=N.gameItem.nsCombo,C.placeholder="コンボ数",C.disableKeyDown=!0,C.enableClicked=!0,b.getCell(f,y).typeInfo.setInput(C),b.getCell(f,y).className=s(),b.getCell(f,y).typeInfo.using.itemId=y+b.firstRowIndex,b.getCell(f,y).typeInfo.toolTip="NSコンボ数"},u=(f,N,y,b)=>{const C=new j;C.value=N.gameItem.nsScore,C.placeholder="NSコンボ加点",C.disableKeyDown=!0,C.enableClicked=!0,b.getCell(f,y).typeInfo.setInput(C),b.getCell(f,y).className=n(),b.getCell(f,y).typeInfo.using.itemId=y+b.firstRowIndex,b.getCell(f,y).typeInfo.toolTip=`NSコンボ加点
(コンボ数毎の加点を,で区切って入力)`},p=(f,N,y,b)=>{const C=new jt;C.value=N.gameItem.gameEnable,C.placeholder="GM有効",b.getCell(f,y).typeInfo.setCheck(C),b.getCell(f,y).className=i(),b.getCell(f,y).typeInfo.using.itemId=y+b.firstRowIndex,b.getCell(f,y).typeInfo.toolTip="G<br>M"},d=(f,N,y,b)=>{const C=new j;C.value=N.gameItem.gameCombo,C.placeholder="コンボ数",C.disableKeyDown=!0,C.enableClicked=!0,b.getCell(f,y).typeInfo.setInput(C),b.getCell(f,y).className=o(),b.getCell(f,y).typeInfo.using.itemId=y+b.firstRowIndex,b.getCell(f,y).typeInfo.toolTip="GMコンボ数"},w=(f,N,y,b)=>{const C=new j;C.value=N.gameItem.gameScore,C.placeholder="GMコンボ加点",C.disableKeyDown=!0,C.enableClicked=!0,b.getCell(f,y).typeInfo.setInput(C),b.getCell(f,y).className=l(),b.getCell(f,y).typeInfo.using.itemId=y+b.firstRowIndex,b.getCell(f,y).typeInfo.toolTip=`GMコンボ加点
(コンボ数毎の加点を,で区切って入力)`},k=async(f,N,y)=>{const b=new $t;b.logType=ge.Add;let C=0;for(const Z of y){const J=new mt;for(const ke of Z.cells)for(const ee of ke.children){const oe=N.getElemValue(ee)||"";switch(N.findInputElem(ee).className){case h():J.text=oe;break;case e():J.formation=oe;break;case t():J.nsEnable=oe;break;case s():J.nsCombo=oe;break;case n():J.nsScore=oe;break;case i():J.gameEnable=oe;break;case o():J.gameCombo=oe;break;case l():J.gameScore=oe;break}}switch(C){case 0:J.key=z.classPq;break;case 1:J.key=z.classMM;break}C++,console.log(J),b.inst.push(J)}const Ie=$t.toJsonText(b);await(await we()).put(be.GameEditAction,Ie)},x=async(f,N)=>{switch(console.log(`classify = ${f.classify} targetId = ${f.targetId}`),f.classify){case e():await N.showNumpad(f,1);break;case s():await N.showNumpad(f,1);break;case n():await N.showMiniTableEditor(f,te.Text,Be.asNumber,"","NSコンボ加点");break;case o():await N.showNumpad(f,1);break;case l():await N.showMiniTableEditor(f,te.Text,Be.asNumber,"","ゲームコンボ加点");break}};function B(){const f=`${t()}`,N=`${i()}`;return`
.${h()} {
height: 90%;
width: 100px;
}
.${e()} {
height: 90%;
width: 40px;
}

.${f} {
height: 90%;
}
${q.sliderText(f,"65")}
.${s()} {
height: 90%;
width: 40px;
}
.${n()} {
height: 90%;
width: 100px;
}

.${N} {
height: 90%;
}
${q.sliderText(N,"65")}
.${o()} {
height: 90%;
width: 40px;
}
.${l()} {
height: 90%;
width: 100px;
}
`.trim()}const $=new At;return $.editItems=[{className:h(),colConfig:r},{className:e(),colConfig:c},{className:t(),colConfig:m},{className:s(),colConfig:g},{className:n(),colConfig:u},{className:i(),colConfig:p},{className:o(),colConfig:d},{className:l(),colConfig:w}],$.makeLog=k,$.onSelect=x,$.getCssText=B,$}function ss(){return`
width: 100%;
height: 100%;
white-space: nowrap;
background: #e91e63; /* ピンクがかった赤（ポップな警告色） */
color: white;
border-radius: 4px;
padding: 4px 12px;
`.trim()}function Rs(){const h=Object.values(v),e=new Array;for(const t of h){const s=t;e.push(`${s}/${s}`)}return e}function wt(){const h=new Array;h.push("1/1");for(let e=1;e<=30;e++){const t=`${e*10}`;h.push(`${t}/${t}`)}return h}class Nt extends Dt{constructor(){super(...arguments),this.uiInfo=new De,this.canAdd=!0,this.parentName="",this.saveTimer=null,this.onAutoSave=async e=>(console.log(`${e.parentName}`),!1),this.updn=null,this.numpad=null,this.miniEdit=null,this.numTableFooterName="numTableFooter",this.onOkClickNumTable=async e=>{if(this.miniEdit!==null){const t=this.miniEdit.editedResult();if(t!==void 0){const s=this.table.getCallerCellElem(this.miniEdit.callerName);if(s!==null){const n=s;n.value=t}}}this.closeNumTable()},this.onCancelClickNumTable=async e=>{this.closeNumTable()},this.isEnableWindowEvent=!1,this.onWindowKeyboard=e=>{e.key===Oe.Escape&&this.isEnableWindowEvent&&(this.disableWindowEvent(),this.closeUpDn(),this.closeNumpad())},this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new M().SaveSetting(e)},this.resizerOnResizeDone=async(e,t,s)=>{console.log(`[${e.className}] resized (${t}, ${s})`);const n=parseInt(s),i=document.getElementById(this.dlgContentCssClassName());if(i!==null){i.style.width===""?i.offsetWidth:parseInt(i.style.width),i.style.maxWidth="none";const o=i.style.height===""?i.offsetHeight:parseInt(i.style.height);i.style.maxHeight="none",i.style.height=`${o+n}px`;const l=i.querySelectorAll(`.${this.tableCssClassName()}`);if(l!==null){const a=l[0],r=a.style.height===""?a.offsetHeight:parseInt(a.style.height);a.style.maxHeight="none",a.style.height=`${r+n}px`}}},this.onCopyPaste=async(e,t)=>{switch(console.log(`[${e.className}] selected [${t}]`),t){case fe.Copy:await this.table.toClipboard();break;case fe.Paste:await this.table.fromClipboard();break}}}async startAutoSave(){this.saveTimer=new Ss,this.saveTimer.intervalMs=1e3,this.saveTimer.isOneShot=!1,this.saveTimer.start(this,this.onAutoSave)}setRow(e,t,s){const n=this.config.editItems;if(n===void 0)return;let i=-1;for(const o of n)i++,o.colConfig(i,e,t,s)}toHTML(e){if(!this.itemList)return"";e.gameType=this.gameType,this.config=e;const s=e.editItems.length,n=new W;if(this.itemList.length>=1)n.makeDim(s,this.itemList.length),this.itemList.forEach((a,r)=>{this.setRow(a,r,n)}),n.makeRowTemplate(this.tableRowCssClassName()),this.table=n;else{n.makeDim(s,1);const a=new Qe;this.setRow(a,0,n),n.makeRowTemplate(this.tableRowCssClassName()),n.clearRows(),this.table=n}const i=this.tableCssClassName(),o=this.table.ToScrollHTML(i,i);this.htmlMaker=new H;const l=new Q;return l.props.name="",l.props.id=i,l.props.className=i,l.props.option.setTable(o),l.props.option.onSelect=async a=>{console.log(`classify = ${a.classify} targetId = ${a.targetId}`),this.config.onSelect(a,this)},this.htmlMaker.add(l),this.htmlMaker.ToHTML()}checkValidStatus(e){return Object.values(v).find(n=>e)!==void 0}async showUpDn(e,t){if(e.KeyEnter===ce.Special||e.eventType===ve.Click){if(this.updn!==null)return;const n=this.table.getScrollCellRect(e.parentElem),i=this.table.makeCallerName(e.classify,e.targetId),o=this.table.getCallerCellElem(i);let l="";o!==null&&(l=o.value);const a=new gs;a.setListener("updn",this.dlgContentCssClassName(),i),a.setSelectedByValue(l,t),a.applyCss(),a.show(n.left,n.top),a.enableEvents(r=>{console.log(`[onApply] ${r.callerName} ${r.result}`);const c=this.table.getCallerCellElem(r.callerName);if(c!==null){const m=c;m.value=r.result}this.closeUpDn()},r=>{console.log(`[onUp] ${r.callerName} ${r.result}`)},r=>{console.log(`[onDown] ${r.callerName} ${r.result}`)}),this.enableWindowEvent(),this.updn=a}}closeUpDn(){this.disableWindowEvent(),this.updn!==null&&(this.updn.dispose(),this.updn=null)}async showNumpad(e,t){if(e.KeyEnter===ce.Special||e.eventType===ve.Click){if(this.numpad!==null)return;const n=this.table.getScrollCellRect(e.parentElem),i=this.table.makeCallerName(e.classify,e.targetId),o=this.table.getCallerCellElem(i);let l="";o!==null&&(l=o.value);const a=new Zt;a.setNum(l),a.maxDig=t,a.setListener("numpad",this.dlgContentCssClassName(),i),a.applyCss(),a.show(n.left,n.top),a.enableEvents(r=>{console.log(`[onApply] ${r.callerName} ${r.result}`);const c=this.table.getCallerCellElem(r.callerName);if(c!==null){const m=c;m.value=r.result}this.closeNumpad()}),this.enableWindowEvent(),this.numpad=a,this.setB2Allow(!1)}}closeNumpad(){this.disableWindowEvent(),this.setB2Allow(!0),this.numpad!==null&&(this.numpad.dispose(),this.numpad=null)}async showMiniTableEditor(e,t,s,n,i){if(e.KeyEnter===ce.Special||e.eventType===ve.Click){if(this.miniEdit!==null)return;const l=this.table.getScrollCellRect(e.parentElem),a=this.table.makeCallerName(e.classify,e.targetId),r=this.table.getCallerCellElem(a);let c="";r!==null&&(c=r.value);const m=`${a}-numTable`,g=`${this.numTableFooterName}-${a}`,u=new ws;if(t===te.KeyValue?u.setKeyValuePairs(c):u.setTexts(c),u.setValueType(5,s),u.keyToolTip=n,u.valueToolTip=i,u.setListener(m,this.dlgContentCssClassName(),a,"",g),u.applyCss(),u.show(l.left,l.top),u.enableEvents(p=>{console.log(`[onApply] ${p.callerName} ${p.result}`)}),this.miniEdit=u,this.miniEdit.footerElem!==null){let p=`
<button id="${g}-okBtn">OK</button>
<button id="${g}-canBtn">CANCEL</button>
`.trim();this.miniEdit.footerElem.innerHTML=p,document.getElementById(`${g}-okBtn`).onclick=this.onOkClickNumTable,document.getElementById(`${g}-canBtn`).onclick=this.onCancelClickNumTable}this.enableWindowEvent(),this.setB2Allow(!1)}}closeNumTable(){this.disableWindowEvent(),this.setB2Allow(!0),this.miniEdit!==null&&(this.miniEdit.dispose(),this.miniEdit=null)}createEditorBox(e,t,s){this.parentName=t;let n="";this.canAdd&&(n=`<button id="${this.rowAddCssClassName()}">追加</button>`);const i=this.htmlMaker.MakeDefaultButtonsHTML(`
${n}
<button id="${this.applyCssClassName()}">保存</button>
`),o=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
   ${i}
   ${s}
</div>`,l=new ue;l.title="<"+e+">",l.SetB2Type(Se.CopyPaste,this.onCopyPaste),l.SetB4Type(xe.DialogHide);const a=l.NewDialog(t,this.dlgCssClassName());return l.SetContent(t,o,!1),this.applyCss(),l.EnableEventHandlers(),l.onMoveDone=this.moverOnMoveDone,this.dialogDesc=l,a}addEventHandlers(e){const t=document.getElementById(this.rowAddCssClassName());t!==null&&(t.onclick=async()=>{if(await this.confirmMsgBox("行を追加しますか？")===!1)return;const n=this.tableRowCssClassName();this.table.addRow(n)}),document.getElementById(this.applyCssClassName()).onclick=async()=>{if(await this.confirmMsgBox("保存しますか？")===!1)return;const n=this.table.getRowElems();n!==null&&(await this.config.makeLog(this.config.gameType,this.table,n),this.onSaved!==void 0&&await this.onSaved(this))}}enableWindowEvent(){return this.isEnableWindowEvent?!1:(this.isEnableWindowEvent=!0,window.addEventListener("keydown",this.onWindowKeyboard),!0)}disableWindowEvent(){return this.isEnableWindowEvent?(window.removeEventListener("keydown",this.onWindowKeyboard),this.isEnableWindowEvent=!1,!0):!1}addItemEventHandlers(){this.htmlMaker.enableTableEvents(this.tableCssClassName())}enableResize(){this.dialogDesc.onResizeDone=this.resizerOnResizeDone,this.dialogDesc.EnableResize()}setB2Allow(e=!0){this.dialogDesc.setB2Allow(e)}async confirmMsgBox(e){const t=new le;t.setParent(this.dlgCssClassName());let s=S.None;switch(t.setYesNo(),s=await t.showWait(e),s){case S.Yes:break;case S.No:return!1;case S.Cancel:return!1}return!0}rowAddCssClassName(){return`${this.editorType}-edit-add`}applyCssClassName(){return`${this.editorType}-edit-apply`}tableRowCssClassName(){return`${this.editorType}-edit-table-row`}tableCssClassName(){return`${this.editorType}-edit-table`}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return`${this.editorType}-edit-dlg`}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=this.uiInfo.height!==""?parseInt(this.uiInfo.height):400,n=document.createElement("style");n.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,e,t)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgContentCssClassName()} {
width: 100%;
max-width: 640px;
margin: 0 0;    /*左上位置固定*/
}
${this.htmlMaker.MakeTableScrollCss(this.tableCssClassName(),s,!0)}
${this.config.getCssText()}
${this.htmlMaker.MakeDefaultButtonsCss()}

/*ミニエディタのボタン*/
[class^="${this.numTableFooterName}"] {
display: flex;
gap: unset;
padding: 4px;
justify-content: flex-end;
  background-color: #f7eb86e6;
  border: 1px solid #b4b107;
}
[class^="${this.numTableFooterName}"] button {
${q.footerButtonText()}
}
`.trim(),document.head.appendChild(n);const i=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,i)}}const ge={None:"None",Add:"Add",Delete:"Delete",Update:"Update"};class Pt{constructor(){this.logType=ge.None}}class Et extends Pt{constructor(){super(...arguments),this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class $t extends Pt{constructor(){super(...arguments),this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class St extends Pt{constructor(){super(...arguments),this.gameType=z.none,this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class Hs{constructor(){this.channel="defaultChannel",this.started=!1,this.onMessage=e=>{console.log(e),this.receiveEventArg=e,this.onNotify!==void 0&&this.onNotify(this)}}Start(){return this.started?!1:(this.bc=new BroadcastChannel(this.channel),this.bc.onmessage=this.onMessage,this.started=!0,!0)}Stop(){this.started&&this.bc.close(),this.started=!1}notifyBool(e){this.started&&this.bc.postMessage(`${e}`)}get receivedBool(){return this.receiveEventArg===void 0||this.receiveEventArg.data===void 0?null:this.receiveEventArg.data==="true"}}const ae={None:"None",Full:"Full",Limit:"Limit",NotRun:"NotRun"},Ke={Undef:"Undef",True:"True",False:"False"},Me={Undef:"Undef",Qiita:"Qiita",Line:"Line"};class _e{constructor(){this.imageRepository="https://puyon7676.github.io/GameImages/",this.imageHome="./Image/",this.user1Home="./User1/",this.user2Home="./User2/",this.currentUserHome="",this.appHref="",this.isLocal=!1,this.admin=!1,this.cmd="",this.edit=z.none,this.evonaType=ae.None,this.aslocal=Ke.Undef,this.coming=Me.Undef,this.dataBasePath="../キャラパースデータ",this.statusJsonPath="",this.zipPrefix="",this.chListFile="",this.chStatusListFile="",this.charStatusZip="./CharStatus.zip",this.nodeToolsImportFilename="./nodeTools.js",this.bc=new Hs,this.onNotifyBcHelper=async e=>{console.log("onNotifyBcHelper"),this.onGameConfigChanged!==void 0&&await this.onGameConfigChanged(e)}}setImageHome(e){if(this.isLocal=e,e)this.imageHome=`${this.currentUserHome}Image/`;else{let t=this.currentUserHome;this.currentUserHome.substring(0,2)==="./"&&(t=this.currentUserHome.substring(2)),this.imageHome=`${this.imageRepository}${t}`}}setUser(e){this.currentUserHome=e}setPath(){this.currentUserHome===this.user1Home&&(this.statusJsonPath=`${this.dataBasePath}/ぷよクエ_詳細JSON`,this.zipPrefix="puyoQue_",this.chListFile=`${this.currentUserHome}chListFile_puyo.json`,this.chStatusListFile=`${this.currentUserHome}puyoQue_CharStatus.zip`),this.currentUserHome===this.user2Home&&(this.statusJsonPath=`${this.dataBasePath}/メメントモリ_詳細JSON`,this.zipPrefix="memeMori_",this.chListFile=`${this.currentUserHome}chListFile_meme.json`,this.chStatusListFile=`${this.currentUserHome}memeMori_CharStatus.zip`)}get gameType(){return this.currentUserHome===this.user1Home,z.classPq}get gameTitle(){return this.edit!==z.none?`エディタ(${this.edit})`:this.gameType===z.classPq?"ぷよクエ":"メメントモリ"}setBrowserTitle(){const e=this.gameTitle;document.head.title=e;for(const t of document.head.children)t.nodeName==="TITLE"&&(t.innerHTML=`EvoNa：${e} モード`);return e}get editorURL(){return`${this.appHref}?edit=${this.gameType}`}get isWebRunning(){return!(typeof document>"u")}parseURLParams(){if(!this.isWebRunning){console.log("cannot parse URL params!");return}const e=new URLSearchParams(window.location.search);for(const[t,s]of e)switch(t.trim()){case"user":const n=s.trim();this.setUser(n==="1"?this.user1Home:this.user2Home);break;case"debug":break;case"admin":this.admin=s.trim()==="true";break;case"cmd":this.cmd=s;break;case"edit":this.edit=s.trim()===z.classMM?z.classMM:z.classPq;break;case"aslocal":this.aslocal=s.trim()==="true"?Ke.True:Ke.False;break;case"coming":switch(s.trim()){case Me.Qiita:this.coming=Me.Qiita;break;case Me.Line:this.coming=Me.Line;break}break}}get availComing(){return this.coming!==Me.Undef}async loadGameConfig(e){const t=new Dt,s=await t.loadGameConfig(e);if(s!==void 0)return s;t.setDefaultGameConfig();const n=t.itemList.filter(i=>i.gameItem.key===e);return n.length===1?n[0].gameItem:void 0}startBcHelper(){console.log("startBcHelper"),this.bc.Start(),this.bc.onNotify=this.onNotifyBcHelper}stopBcHelper(){console.log("stopBcHelper"),this.bc.Stop()}notifyGameConfigChanged(){console.log("notifyGameConfigChanged"),this.bc.notifyBool(!0)}async loadJson(e){return console.log(`[loadJson] file=[${e}]`),await this._loadJson(e)}async _loadJson(e){if(this.isWebRunning){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`HTTPエラー! ステータス: ${t.status}`);return await t.json()}else{const{loadJsonNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async saveJson(e,t){const s=JSON.stringify(t);if(this.isWebRunning){const n=new Blob([s],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=e,o.click()}else{const{saveJsonNode:n}=await import(this.nodeToolsImportFilename);return n(e,t)}}async loadBinFile(e){if(this.isWebRunning)return await(await fetch(e)).blob();{const{readBinNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async getDoc(e){let t,s;if(this.isWebRunning)t=new DOMParser,s=t.parseFromString(e,"text/html");else{const{createHtmlParserNode:n}=await import(this.nodeToolsImportFilename);t=n(e),s=t.parseFromString(e,"text/html")}return s}}class Y{static async put(e){const t=Y.encodeEnable?await Y.encode(e):e;try{await navigator.clipboard.writeText(t)}catch(s){return console.error("コピー失敗...",s),!1}return!0}static async get(){let e="";try{e=await navigator.clipboard.readText()}catch(t){return console.error("ペースト失敗...",t),null}return Y.encodeEnable?await Y.decode(e):e}static async encode(e){const t=Y.getEncoder(),s=Y.storeFile;return t.file(s,e),await t.generateAsync({type:"base64",compression:"DEFLATE",compressionOptions:{level:9}})}static async decode(e){const t=Y.getEncoder(),s=Y.storeFile;try{return await(await t.loadAsync(e,{base64:!0})).file(s).async("string")}catch(n){return console.error("デコード失敗...",n),null}}static getEncoder(){return new window.JSZip}}Y.encodeEnable=!0;Y.storeFile="form.json";async function Ds(h){const e=h.cmd.split(":");let t=!1;switch(e[0]){case"drop":t=As();break;case"ref":t=document.referrer;break}const s=`[${h.cmd}] res=${t}`;alert(s)}async function As(){const h=new Tt;return await h.setup(),await h.dropDb()}const Le={plus:"plus.png",win:"win.png",even:"even.png",lost:"lost.png",demo:"demo.png"};class Ps{constructor(){this.imageHome="",this.cache=new Map,this.cacheNs=new Map,this.zip=null,this.zipNs=new Map,this.isMultiZip=!1,this.materials=[{ns:"",fileName:Le.plus},{ns:"",fileName:Le.win},{ns:"",fileName:Le.even},{ns:"",fileName:Le.lost},{ns:"",fileName:Le.demo}],this.AnyNs=""}get demoMaterial(){return Le.demo}async setupNs(e,t,s){const n=s.findByNs(e);if(n!==void 0){this.imageHome=t.imageHome;for(const i of n){const o=i.iconFileName,l=`${this.imageHome}${e}/${o}`;this.cache.set(o,l),this.cacheNs.set(o,e)}this.isMultiZip=!0;for(const i of this.materials){const o=i.fileName,l=`${this.imageHome}${o}`;this.cache.set(o,l),this.cacheNs.set(o,e)}}}async checkExists(e){try{return(await fetch(e,{method:"HEAD"})).ok}catch{return!1}}isMaterial(e){return this.materials.find(s=>s.fileName.includes(e))!==void 0}get loaded(){return this.isMultiZip?this.zipNs.size!==0:this.zip!==null}async _loadZipBy(e,t){const s=new _e;this.imageHome=s.imageHome.substring(2);const n=await s.loadBinFile(e);let i=null;if(s.isWebRunning)i=await window.JSZip.loadAsync(n);else{const{loadZipNode:o}=await import(s.nodeToolsImportFilename);i=await o(n)}this.zipNs.set(t,i),this.isMultiZip=!0}async getImageUrlBy(e,t){if(this.isMaterial(e))return`${this.imageHome}${e}`;if(this.cache.has(e)){const n=this.cache.get(e);if(!await this.checkExists(n)){const o=`${this.imageHome}notexist.png`;this.cache.set(e,o)}return this.cache.get(e)}return null}async findNs(e){if(!this.isMultiZip)return null;if(this.cacheNs.has(e)){const t=this.cacheNs.get(e);if(t!==void 0)return t}return null}dispose(){for(const e of this.cache.values())URL.revokeObjectURL(e);this.cache.clear()}}class he{get iconFileName(){return this.id===null&&!Number.isNaN(this.id)?`${this.name}_${this.idAsText}.png`:`${this.name}_${this.id}.png`}constructor(e=0,t=""){this.ns=G.None,this.id=0,this.name="",this.contentURL="",this.iconURL="",this.idAsText="",this.idAttributeForHTML="",this.id=e,this.name=t}parseFromImgName(e){let t=e.indexOf("_");if(t>=0){const s=e.substring(0,t);let n=e.substring(t+1);if(t=n.indexOf("."),t>=0)return n=n.substring(0,t),this.id=Number.parseInt(n),this.name=s,this.idAsText=Number.isNaN(this.id)?n:"",!0}return!1}static copy(e,t){t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t.idAsText=e.idAsText,t.idAttributeForHTML=e.idAttributeForHTML}}class Fs{constructor(){this.itemName="",this.chNames=new Array,this.index=-1}reset(){this.itemName="",this.chNames=new Array,this.index=-1,this.onScroll=null}toCombo(e,t,s){this.reset();const n=`.${e}`,i=document.querySelectorAll(`${n} div[title*="${s}"]`);let o=-1,l="";for(const r of i){const c=r;console.log(c.title),o++;const m=c.title.trim(),g=m,p=`
 <option value="${m}"${o===0?" selected":""}>${g}</option>
`.trim();l+=p,this.chNames.push(g)}if(o===-1)return null;const a=document.createElement("select");return a.id=t,a.className=t,a.innerHTML=l,this.itemName=e,a}addEvent(e,t){e.addEventListener("change",s=>{const i=s.target.value;this.chNames.find(l=>l===i)&&this.scrollAction(i)}),this.onScroll=t}findFirst(){return this.chNames.length===0?!1:(this.index=0,this.scrollAction(this.chNames[this.index]),!0)}scroll(e){const t=`.${this.itemName}`,s=document.querySelector(`${t} div[title="${e}"]`);if(s===null)return null;const n=s.closest(t);return n===null?null:(n.scrollIntoView({behavior:"smooth",block:"center"}),s)}scrollAction(e){const t=this.scroll(e);t&&this.onScroll!==null&&this.onScroll(t)}}class Ft{async LoadList(e){const n=(await new _e().loadJson(e)).map(o=>Object.assign(new he,o)),i=new Ft;return i.chList=n,i}findNs(e){const t=this.chList.find(s=>s.id===e);return t?t.ns:G.None}findByNs(e){return e===G.None?void 0:this.chList.filter(s=>s.ns===e)}MakeList(){}}class Us{constructor(){this.uiInfo=new De,this.charFinder=new Fs,this.parentName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new M().SaveSetting(e)}}async toHTML(e){if(!this.chSet.chList)return"";this.htmlMaker=new H;let t=0;for(const s of this.chSet.chList){t++;const n=`chuid${t}`;s.idAttributeForHTML=n;const i="",o=new Lt;o.imgSrc=i,o.imgFile=s.iconFileName;const l=new Q;l.props.name=this.itemCssClassName(),l.props.id=n,l.props.className=this.imgCssClassName(),l.props.option.setImg(o),l.props.option.toolTip=s.name,l.props.option.onSelect=a=>{this.setSelectedItem(a.item.props.id)},this.htmlMaker.add(l)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createSelectorBox(e,t,s){this.parentName=t;const n=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="${this.charOpenUrlCssClassName()}">URL</button>
`),i=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${s}
    <label id="char-dlg-chinfo">未選択</label>
    <div class="${this.charSeachParentCssClassName()}" id="${this.charSeachParentCssClassName()}">
    <input type="text" id="${this.charSeachInputCssClassName()}" placeholder="キャラ名検索...">
    </div>
    ${n}
</div>`,o=new ue;o.title="<"+e+">",o.SetB4Type(xe.DialogHide);const l=o.NewDialog(t,this.dlgCssClassName());return o.SetContent(t,i),this.applyCss(),o.EnableEventHandlers(),o.onMoveDone=this.moverOnMoveDone,l}addEventHandlers(e){document.getElementById(this.charSeachInputCssClassName()).oninput=t=>{if(t!==null&&t.target!==null){const s=t.target;console.log(s.value);const n=s.value,i=this.charSeachComboCssClassName(),o=document.getElementById(i);o!==null&&o.parentNode?.removeChild(o);const l=this.charFinder.toCombo(this.itemCssClassName(),i,n);if(l!==null){const a=document.getElementById(this.charSeachParentCssClassName());a!==null&&(a.appendChild(l),this.charFinder.addEvent(l,r=>{const m=r.parentElement.getAttribute("item-id");this.htmlMaker.SelectByID(this.itemCssClassName(),m)}),this.charFinder.findFirst())}}},document.getElementById(this.charOpenUrlCssClassName()).onclick=async()=>{if(this.selectedCh===void 0)return;const t=this.chSet.chList.find(s=>this.selectedCh.idAttributeForHTML===s.idAttributeForHTML);if(t){this.charOpenUrlCssClassName();const s=new le;if(s.setParent(this.dlgCssClassName()),s.setYesNo(),await s.showWait(`${t.name} をブラウザで開いてよろしいですか？`)===S.Yes){const i=t.contentURL;window.open(i,"_blank")}}}}addItemEventHandlers(){const e=this.htmlMaker.GetIdByIndex(0);this.htmlMaker.SelectByID(this.itemCssClassName(),e),this.htmlMaker.enableEvents(this.itemCssClassName()),this.setSelectedItem(e)}setSelectedItem(e){const t=this.chSet.chList.find(s=>e===s.idAttributeForHTML);t&&(document.getElementById("char-dlg-chinfo").textContent=t.name,this.selectedCh=t)}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}itemCssClassName(){return"char-item"}imgCssClassName(){return"base"}listCssClassName(){return"char-list"}dlgContentCssClassName(){return"char-dlg-content"}dlgCssClassName(){return"char-dlg"}charSeachInputCssClassName(){return"char-search-input"}charSeachComboCssClassName(){return"char-search-combo"}charSeachParentCssClassName(){return"char-search-parent"}charOpenUrlCssClassName(){return"char-open-url"}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=parseInt(this.uiInfo.left),i=parseInt(this.uiInfo.top),o=document.createElement("style");o.textContent=`
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
`.trim(),document.head.appendChild(o);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}}class me{constructor(){this.ns=G.None,this.id=0,this.name="",this.contentURL="",this.iconURL=""}static toJsonText(e){const t=me.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new me;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}static fromJsonInst(e){const t=new he;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}}class We{constructor(){this.title="",this.key="",this.selectionPair=[],this.selectedVal="",this.initScoreVal=0,this.mulScoreVal=0,this.available=!1}get stdScore(){const e=this.selectedVal.length>=1?this.selectedVal:"1",t=parseInt(e);return this.initScoreVal+t*this.mulScoreVal}get selectedText(){if(this.selectionPair.length!==0&&this.selectedVal!=="")for(const e of this.selectionPair){const t=e.split("/");if(t[1]===this.selectedVal)return t[0]}}}class A{constructor(){this.ns=G.None,this.items=new Array,this.allow=new Map,this.roleText="",this.comboText=""}makeDemoLvText(e){let t="";for(let s=1;s<=100;s++)t+=`"${e}${s}/${s}",`;return t=t.substring(0,t.length-1),t}load(){const e=this.makeDemoLvText("Lv"),t=this.makeDemoLvText("Lv"),s=this.makeDemoLvText(""),n=`
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
`,o=JSON.parse(n).map(l=>Object.assign(new We,l));this.items=o}save(){console.log(JSON.stringify(this,null,2))}clone(){const e=new A;for(const t of this.items){const s=JSON.stringify(t,null,2),n=JSON.parse(s);e.items.push(n)}return e}static copy(e,t,s=!1){for(let n=0;n<e.items.length;n++){const i=e.items[n],o=s?new We:t.items[n];o.title=i.title,o.key=i.key,o.selectionPair=i.selectionPair,o.selectedVal=i.selectedVal,o.initScoreVal=i.initScoreVal,o.mulScoreVal=i.mulScoreVal,o.available=i.available,s&&t.items.push(o)}}set(e,t){const s=this.items.find(n=>n.key===e);return s?(s.selectedVal=t,!0):!1}get stdScore(){let e=0;for(const t of this.items)t.available&&(e+=t.stdScore);return e}get allAvailable(){for(const e of this.items)if(e.available===!1)return!1;return!0}static calcScore(e,t){const s=t.split("+");let n=0;for(const i of s){const o=i.trim();if(o.endsWith("()")){const l=o.slice(0,-2);typeof e[l]=="function"?n+=e[l]():console.warn(`関数 '${l}' が存在しません`)}else{const l=e[o];typeof l=="number"?n+=l:Array.isArray(l)?n+=l.reduce((a,r)=>a+r,0):console.warn(`プロパティ '${o}' が数値ではありません`)}}return n}static calcScoreAdvanced(e,t){const s=Object.keys(e),n=s.map(o=>e[o]);return new Function(...s,`return ${t};`)(...n)}toInst(e){return(n=>{const i=class{constructor(){n.forEach((o,l)=>{this[l]=o})}};return new i})(e)}}class gt{constructor(){this.fileNames=null,this.minMap=new Map,this.maxMap=new Map,this.rangeMap=new Map,this.digLenMax=0,this.nMul=0,this.table=[{key:v.pqStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:v.pqStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:v.pqStatusREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:v.pqTokkunHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:v.pqTokkunATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:v.pqTokkunREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:v.pqTokuSp1,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:v.pqTokuSp2,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:v.mmStatusFGT,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusPDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusACC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusEVA,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusCRI,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusMDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusCRD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusDEF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusSPD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmAbilityDEX,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmAbilityMGC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmAbilityDUR,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmRole,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}}],this.rolePriolity=[{roleKey:st.RlAttacker,priority:lt.priHi,statusKey:[v.mmAbilitySTR,v.mmStatusATK,v.mmStatusSPD]},{roleKey:st.RlHealer,priority:lt.priHi,statusKey:[v.mmAbilityMGC,v.mmStatusMDF,v.mmStatusHP]},{roleKey:st.RlDebuffer,priority:lt.priHi,statusKey:[v.mmAbilityDEX,v.mmStatusACC,v.mmStatusHP]},{roleKey:st.RlBuffer,priority:lt.priHi,statusKey:[v.mmStatusPDF,v.mmStatusHP,v.mmStatusDEF]}]}async loadDB(e){const t=new _e,s=await t.loadBinFile(e);if(t.isWebRunning)this.zip=await window.JSZip.loadAsync(s);else{const{loadZipNode:n}=await import(t.nodeToolsImportFilename);this.zip=await n(s)}return this.fileNames=Object.keys(this.zip.files),!0}async enumStatus(e){if(this.fileNames!==null)for(const t of this.fileNames){const s=await this.getFileContent(t);if(s===null||e===void 0)continue;if(!e(t,s))break}}async debugCombo(){await this.enumStatus((e,t)=>{for(const s of t)s.useCombo&&console.log(`${e}:[${s.value}]`);return!0})}async loadAuxScoreSet(e){const t=new Dt;await t.load(se.ScoreUI,e);const s=new A;for(const n of t.itemList){const i=n.scItem;if(!n.scItem.isScoreAvail)continue;const o=new We;switch(o.title=i.text,o.key=i.key,o.available=!1,i.selectType){case Re.Sequence:const l=this.auxScoreTextToValue(i.start),a=this.auxScoreTextToValue(i.end),r=this.auxScoreTextToValue(i.step),c=new Array;for(let u=l;u<=a;u+=r)c.push(`${u}/${u}`);o.selectionPair=c,o.selectedVal=`${l}`,o.initScoreVal=l,o.mulScoreVal=r,c.length>=1&&(o.available=!1);break;case Re.Text:const m=i.keyValue.split(",");let g="";for(const u of m){const p=u.split("/");if(p.length>=2){g=p[1];break}}o.selectionPair=m,o.selectedVal=g,o.initScoreVal=0,o.mulScoreVal=0,m.length>=1&&(o.available=!1);break}s.items.push(o)}return this.auxScoreSet=s,s}auxScoreTextToValue(e){const t=e.split("/"),s=t.length===1?t[0]:t[1];return parseInt(s)}async getMinMax(){await this.enumStatus((e,t)=>{for(const s of t){if(s.useCombo)continue;let n=parseInt(this.itemValue(s));if(!this.minMap.has(s.key))this.minMap.set(s.key,n);else{const i=this.minMap.get(s.key);i===void 0?this.minMap.set(s.key,n):i>n&&this.minMap.set(s.key,n)}if(!this.maxMap.has(s.key))this.maxMap.set(s.key,n);else{const i=this.maxMap.get(s.key);i===void 0?this.maxMap.set(s.key,n):i<n&&this.maxMap.set(s.key,n)}}return!0})}async getRanges(){await this.getMinMax(),this.digLenMax=0;for(const[e,t]of this.minMap){const s=t,n=this.maxMap.get(e);let i=0;if(s!==void 0&&n!==void 0&&(i=n-s),i<=0&&(i=1),this.rangeMap.set(e,i),n!==void 0){const o=Math.log10(n);o>this.digLenMax&&(this.digLenMax=o)}}this.nMul=this.digLenMax>0?Math.pow(10,Math.ceil(this.digLenMax)):1;for(const[e,t]of this.minMap)console.log(`[${e}] = ${this.minMap.get(e)},${this.maxMap.get(e)} ${this.rangeMap.get(e)}`);console.log(`digLenMax=[${this.digLenMax}] nMul=[${this.nMul}]`)}stdBy(e,t){let s,n;if(this.rangeMap.has(e)&&(s=this.rangeMap.get(e)),this.minMap.has(e)&&(n=this.minMap.get(e)),s===void 0||n===void 0||this.isNumeric(t)===!1)return null;s<=0&&(s=1);const i=(parseInt(t)-n)*s;return this.nMul*i}getFilename(e){let t=null;for(let s of this.fileNames){let n=s.indexOf("_");if(n>=0){let i=s.substring(n+1);if(n=i.indexOf("."),n>=0&&(i=i.substring(0,n)),i===e){t=s;break}}}return t}async getFileContent(e){if(e===null)return null;const t=this.zip.file(e);if(t){const s=await t.async("string");return JSON.parse(s)}return null}async getStatus(e){this.digLenMax===0&&await this.getRanges();const t=this.getFilename(e);if(t===null)return null;const s=await this.getFileContent(t);if(s===null)return null;let n=null;for(const a of s)if(!a.useCombo){for(const r of this.rolePriolity)if(r.statusKey.find(m=>m===a.key)){n=r,console.log(`find role : ${n.roleKey}`);break}if(n!==null)break}const i=new A;if(n!==null)for(const a of s){if(a.useCombo)continue;if(n.statusKey.find(c=>c===a.key)){const c=this.table.find(m=>m.key===a.key);if(c){const m=c.scoreFunc(a.key,this.itemValue(a));m.title=a.disp,m.key=a.key,m.selectedVal="1",i.items.push(m)}}}else for(const a of s){if(a.useCombo)continue;const r=this.table.find(c=>c.key===a.key);if(r){const c=r.scoreFunc(a.key,this.itemValue(a));c.title=a.disp,c.key=a.key,c.selectedVal="1",i.items.push(c)}}const o=new A;A.copy(this.auxScoreSet,o,!0),i.items=i.items.concat(o.items);const l=parseInt(e);return i.ns=this.charSpecSet.findNs(l),i}async getComboKeywords(e){let t=0;const s=new Map,n=new Map;for(const i of e){const o=this.getFilename(i);if(o===null)return null;const l=await this.getFileContent(o);if(l===null)return null;const a=new Map;for(const r of l){if(!r.useCombo)continue;const c=r.value.split(",");for(const m of c)if(a.has(m)===!1)a.set(m,1);else{const g=a.get(m);a.set(m,g+1)}}if(a.size===0){t=0,n.clear();continue}for(const[r,c]of a)if(n.has(r)===!1)n.set(r,c);else{const m=n.get(r);n.set(r,m+c)}if(t++,!(t<=2))for(const[r,c]of n)c>=3&&s.set(r,c)}}async debugCheckCombo(){const e=new Array;e.push("119599"),e.push("119603"),e.push("119624"),await this.getComboKeywords(e)}isNumeric(e){return e.trim()===""?!1:!isNaN(Number(e))}itemValue(e){return e.converted===""?e.value:e.converted}toScoreMaxNum(e,t){return this.isNumeric(t)===!1?null:gt.useStdConv?this.stdBy(e,t):t!==""?parseInt(t):1}scoreFunc(e,t){const s=new We;if(e===null)return s;s.mulScoreVal=e/t;for(let n=1;n<=t;n++){const i=Math.ceil(e/t*n);s.selectionPair.push(`Lv${n}/${n}`),n===1&&(s.initScoreVal=i)}return s.available=!0,s}scoreFuncOld(e,t){const s=new We;if(this.isNumeric(e)===!1)return s;let n=e!==""?parseInt(e):1;s.mulScoreVal=n/t;for(let i=1;i<=t;i++){const o=Math.ceil(n/t*i);s.selectionPair.push(`Lv${i}/${i}`),i===1&&(s.initScoreVal=o)}return s.available=!0,s}puyoToku(e){return e==="enable"?10:1}}gt.useStdConv=!1;const lt={priHi:0},Ee={None:"None",UI:"UI",Menu:"Menu"};class re{constructor(){this.dockType=Ee.None,this.iconFileName="",this.toolTip="",this.idAttributeForHTML=""}get labelWrap(){let e=this.toolTip,t=this.toolTip.length;if(t>3){const s=t%2===0?t/2:t/2+1,n=e.substring(0,s),i=e.substring(s);e=n+`
`+i}return e}setAsDlg(e,t){this.dockType=Ee.UI,this.dlg=e,this.toolTip=t}setAsMenu(e){this.dockType=Ee.Menu,this.toolTip=e}get isUIType(){return this.dockType==Ee.UI}get isMenuType(){return this.dockType==Ee.Menu}ToggleStatus(){this.dlg===void 0||this.dlg===null||(this.dlg.hidden=!this.dlg.hidden)}}class yt{constructor(){this.items=new Array,this.parentName="",this.listName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new M().SaveSetting(e,!1)},this.onHelp=async(e,t)=>{await Gs()}}add(e){return e.dockType==Ee.UI&&(e.dlgParent=e.dlg.parentElement),this.items.push(e),!0}async toHTML(e,t=null){if(!this.items)return"";this.listName=e,this.htmlMaker=new H;let s=0;for(const n of this.items){s++;const i=`dock-uid${s}`;n.idAttributeForHTML=i;const o=new Q,l=n.labelWrap;o.props.name=this.itemCssClassName(),o.props.id=i,o.props.className=this.imgCssClassName(),o.props.option.toolTip=n.toolTip,o.props.option.setLabel(l,!0),o.props.option.onSelect=a=>{const r=this.items.find(c=>a.item.props.id===c.idAttributeForHTML);if(r&&(this.selectedItem=r,this.onApply!==void 0)){const c=new Os;c.item=this.selectedItem,this.onApply(c)}},this.htmlMaker.add(o)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createDockBox(e,t,s=!0){this.parentName=e;const n=`<div class="${this.parentName}-dlg-content">
    ${t}
</div>`,i=new ue;i.SetB3Type(Ge.Hide),i.SetB5Type(Ve.Help,this.onHelp);const o=i.NewDialog(e,this.dlgCssClassName());return i.SetContent(e,n,s),this.applyCss(),i.EnableEventHandlers(),i.onMoveDone=this.moverOnMoveDone,o}addItemClickHandlers(e){this.onApply=e,this.htmlMaker.SelectByID(this.itemCssClassName(),this.htmlMaker.GetIdByIndex(0)),this.htmlMaker.enableEvents(this.itemCssClassName())}stdApplyAction(e){return e.item.dlgParent===null?(e.cancel=!0,!1):(console.log(`selected item = [${e.item.toolTip}::${e.item.dockType}]`),e.item.isUIType&&(new M().MoveHiestLayer(e.item.dlgParent),e.item.dlgParent.hidden&&(e.item.dlgParent.hidden=!1)),!0)}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=48,i=this.items.length,o=document.createElement("style");o.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,60,10,M.ignoreIndex)}
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
`.trim(),document.head.appendChild(o);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}listCssClassName(){return`${this.listName}-list`}dlgCssClassName(){return`${this.parentName}-dlg`}static GetDialogInfo(e){return ue.GetDialogInfo(e)}static SetDialogInfo(e){return ue.SetDialogInfo(e)}async InitZOrder(e){await e.ForEachAsync(t=>{const s=yt.GetDialogInfo(t),n=e.FindByName(t);return s!==null&&(s.zindex=n!==null?n.style.zIndex:""),console.log(s),!0})}}class Os{constructor(){this.cancel=!1}}async function Gs(){const h=new le;h.title="About EvoNa",await h.showWait('EvoNa (Evolution Navigator)<br>Release 1<br><img src="./wallpaper.png" width="64" height="64"></img><br><br>Powered By Gemini/Chromium Tech.')}class ut{constructor(){this.dockType=Ee.None,this.iconFileName="",this.toolTip="",this.dlgName="",this.hidden=!1,this.zIndex="",this.topPx="",this.leftPx=""}static toJsonText(e){const t=ut.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new ut;return t.dockType=e.dockType,t.iconFileName=e.iconFileName,t.toolTip=e.toolTip,e.isUIType&&(t.dlgName=e.dlgParent.id,t.hidden=typeof e.dlgParent.hidden=="string"?!1:e.dlgParent.hidden,t.zIndex=e.dlgParent.style.zIndex,t.leftPx=e.dlgParent.style.left,t.topPx=e.dlgParent.style.top),t}}class dt{static toJsonText(e){const t=dt.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new dt;t.items=new Array;for(const s of e.items)t.items.push(ut.toJsonInst(s));return t}restore(e,t){for(const s of this.items){const n=e.items.find(i=>i.dlg.id===s.dlgName);n&&(n.dockType=s.dockType,n.iconFileName=s.iconFileName,n.toolTip=s.toolTip,n.isUIType&&(n.dlgParent.hidden=typeof s.hidden=="string"?!1:s.hidden,n.dlgParent.style.zIndex=s.zIndex,n.dlgParent.style.left=s.leftPx,n.dlgParent.style.top=s.topPx))}t.ReOrder()}}class Vs{convTitle(e){if(e.length<=8)return e;const t="スキル";return e.endsWith(t)?`${e.substring(0,e.length-t.length)}<br>${t}`:e}}let It=null;function ns(){return It||(It=new Vs,console.log("ConvertTools instance created (Singleton)")),It}class Je{constructor(){this.chUuid="",this.ch=new he}}class is{constructor(){this.chList=new Array,this.uiInfo=new De,this.parentName="",this.editingRowIndex=-1,this.scoreGrid=new ps,this.gridHeaderName=`${this.dlgCssClassName()}-headerName`,this.gridFooterName=`${this.dlgCssClassName()}-footerName`,this.gridName=`${this.dlgCssClassName()}-gridName`,this.gridRowName=`${this.dlgCssClassName()}-gridRowName`,this.keyClassName=`${this.dlgCssClassName()}-keyClassName`,this.valueClassName=`${this.dlgCssClassName()}-valueClassName`,this.onSelect=async e=>{console.log(`classify = ${e.classify} selectedValue = ${e.selectedValue} targetId = ${e.targetId}`);const t=this.editingCh;if(t===null)return;const n=t.scoreSet.items.find(i=>i.key===e.classify);n&&(n.selectedVal=e.selectedValue)},this.savedScoreSet=new A,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new M().SaveSetting(e)},this.onCopyPaste=async(e,t)=>{console.log(`[${e.className}] selected [${t}]`);const s="charSummary:";switch(t){case fe.Copy:const n=Ye.toJsonText(this);await Y.put(`${s}${n}`);break;case fe.Paste:const i=await Y.get();if(i===null)break;if(!i.startsWith(s)){const c=new le;c.setParent(this.dlgCssClassName()),await c.showWait(`ペーストデータの形式が不正です<br>${s}`);break}const o=JSON.parse(i.substring(s.length)),l=Ye.fromJsonInst(o);this.chList=l.chList;const a=this.toHTML(),r=this.htmlMaker.ToElem(a);r!==null&&(this.htmlMaker.disableTableEvents(this.tableCssClassName()),this.htmlMaker.ReplaceElem(this.dlgContentCssClassName(),r),this.updateCharInfos(this.imageLoader,!1),this.selectFirstRow(),this.enableLazyImages(this.imageLoader),this.addItemEventHandlers());break}}}async load(){const t=await(await we()).get(be.CharSummaryAction);if(t===null)return;const s=new Map,n=new Array;this.usingLog(t,s,n),this.chList=new Array;for(const[i,o]of s){const l=at.fromJsonText(o.log),a=new he;he.copy(l.ch,a);const r=new A;A.copy(l.scoreSet,r,!0);const c=new Je;c.chUuid=l.chUuid,c.ch=a,c.scoreSet=r,this.chList.push(c)}}usingLog(e,t,s){for(const n of e){const i=at.fromJsonText(n.log);if(i.chUuid==="")continue;let o=!1,l=!1;switch(i.logType){case pe.None:break;case pe.Add:o=!0;break;case pe.Update:t.has(i.chUuid)?o=!0:o=!1;break;case pe.Delete:o=!0,l=!0;break}if(o)if(l){if(t.has(i.chUuid)){t.delete(i.chUuid);const a=t.get(i.chUuid);s.push(a)}}else{if(t.has(i.chUuid)){const a=t.get(i.chUuid);s.push(a),t.delete(i.chUuid)}t.set(i.chUuid,n)}}}sortByScore(){if(this.chList.length===0)return null;const e=new Array;for(const s of this.chList){const n=new he;he.copy(s.ch,n);const i=new A;A.copy(s.scoreSet,i,!0);const o=new Je;o.chUuid=s.chUuid,o.ch=n,o.scoreSet=i,e.push(o)}return e.sort((s,n)=>n.scoreSet.stdScore-s.scoreSet.stdScore)}async updateCharInfos(e,t=!0){let s=this.table.firstRowIndex-1;for(const n of this.chList){if(s++,t){const i=await e.getImageUrlBy(n.ch.iconFileName,n.ch.ns);i!==null&&this.table.updateRowImage(s,i)}this.updateChScoreInfo(s)}this.selectFirstRow()}selectFirstRow(){this.table.redimAllRows();const e=this.table.firstRowIndex;this.table.selectRow(e),this.table.scroll(e)}setRow(e,t,s){let n=0;const i=new Lt;i.imgFile=e.iconFileName,s.getCell(n,t).typeInfo.setImg(i),s.getCell(n,t).className=this.itemIconCssClassName();const o=`${e.name}`;s.getCell(n,t,1).typeInfo.setLabel(o,!1),s.getCell(n,t,1).className=this.itemStatusCssClassName(),n++,s.getCell(n,t).typeInfo.setButton("更新"),s.getCell(n,t).className=this.itemUpdateCssClassName(),s.getCell(n,t).typeInfo.using.itemId=t,s.getCell(n,t,1).typeInfo.setButton("削除"),s.getCell(n,t,1).className=this.itemDeleteCssClassName(),s.getCell(n,t,1).typeInfo.using.itemId=t}toHTML(){if(!this.chList)return"";const e=new W;if(this.chList.length>=1)e.makeDim(2,this.chList.length),e.growCell(0,2),e.growCell(1,2),this.chList.forEach((i,o)=>{const l=i.ch;this.setRow(l,o,e)}),e.makeRowTemplate(this.tableRowCssClassName()),this.table=e;else{e.makeDim(2,1),e.growCell(0,2),e.growCell(1,2);const i=new he;this.setRow(i,0,e),e.makeRowTemplate(this.tableRowCssClassName()),e.clearRows(),this.table=e}const t=this.tableCssClassName(),s=this.table.ToScrollHTML(t,"");this.htmlMaker=new H;const n=new Q;return n.props.name="",n.props.id="0",n.props.className=t,n.props.option.setTable(s),n.props.option.onSelect=async i=>{switch(console.log(`classify = ${i.classify} targetId = ${i.targetId}`),i.classify){case this.itemUpdateCssClassName():await this.onItemEdit(i);break;case this.itemDeleteCssClassName():await this.onItemDelete(i);break}},this.htmlMaker.add(n),this.htmlMaker.ToHTML()}createSummaryBox(e,t,s){this.parentName=t;let n=`
<button id="${this.itemAddCssClassName()}">キャラ追加</button>
`.trim();const i=this.htmlMaker.MakeDefaultToolButtonsHTML(n),o=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${i}
    ${s}
</div>`,l=new ue;l.title="<"+e+">",l.SetB2Type(Se.CopyPaste,this.onCopyPaste);const a=l.NewDialog(t,this.dlgCssClassName());return l.SetContent(t,o),this.applyCss(),l.EnableEventHandlers(),l.onMoveDone=this.moverOnMoveDone,a}addEventHandlers(e,t){this.onAdd=t,document.getElementById(`${this.itemAddCssClassName()}`).onclick=async()=>{if(this.onAdd===void 0)return;const s=new os;await this.onAdd(s),s.cancel!==!0&&await this.onItemAdd(s)}}createScoreGrid(e){const t=this.dlgContentCssClassName(),s=ns(),n=this.scoreGrid.makePair();for(const i of e.items){const o=s.convTitle(i.title),l=i.title,a=this.scoreGrid.makeKeyCell(o,this.keyClassName,l),r=new Bt;r.selectionPair=i.selectionPair,r.selectedItem=i.selectedVal,r.classify=i.key;const c=new qe;c.makeItems(),c.items[0].typeInfo.setCombo(r),c.items[0].className=this.valueClassName,n.set(a,c)}if(this.scoreGrid.setPair(n),this.scoreGrid.setListener(this.gridName,this.gridRowName,t,this.gridHeaderName,this.gridFooterName),this.scoreGrid.enableEvents(this.onSelect),this.scoreGrid.footerElem!==null){let i=`
<button id="${this.gridFooterName}-okBtn">OK</button>
<button id="${this.gridFooterName}-canBtn">CANCEL</button>
`.trim();this.scoreGrid.footerElem.innerHTML=i,document.getElementById(`${this.gridFooterName}-okBtn`).onclick=async()=>{const o=this.editingCh;o!==null&&(o.scoreSet,this.addActionLog(o,pe.Update),this.removeScoreGrid(),this.updateChScoreInfo(this.editingRowIndex))},document.getElementById(`${this.gridFooterName}-canBtn`).onclick=async()=>{const o=this.editingCh;if(o===null)return;const l=o.scoreSet;A.copy(this.savedScoreSet,l),this.removeScoreGrid()}}}removeScoreGrid(){if(this.scoreGrid.headerElem!==null){const e=this.editingRowIndex,t=this.table.getRowElem(e),s=this.table.getCellElems(t),n=this.scoreGrid.headerElem.children[0];s[0][0].appendChild(n)}this.scoreGrid!==null&&(this.scoreGrid.dispose(),this.htmlMaker.setVisible(this.itemAddCssClassName(),!0),this.table.setVisible(!0))}get editingCh(){const e=this.editingRowIndex;return e<this.table.firstRowIndex?null:this.chList[e-this.table.firstRowIndex]}async onItemAdd(e){const t=new le;t.setParent(this.dlgCssClassName());let s=S.None;if(t.setYesNo(),s=await t.showWait(`${e.selectCh.name} を追加しますか？`),s===S.No)return;const n=this.tableRowCssClassName(),i=this.table.addRow(n);if(i<this.table.firstRowIndex)return;this.table.selectRow(i),this.table.updateRowImage(i,e.selectedImg),this.table.scroll(i);const o=new Je;o.chUuid=ds(),o.ch=e.selectCh,o.scoreSet=e.scoreSet,this.chList.push(o),this.updateChScoreInfo(i),this.addActionLog(o,pe.Add)}async onItemEdit(e){const t=parseInt(e.targetId);if(t<this.table.firstRowIndex)return;this.editingRowIndex=t;const s=this.chList[t-this.table.firstRowIndex].scoreSet;this.savedScoreSet=new A,A.copy(s,this.savedScoreSet,!0),this.createScoreGrid(s),this.htmlMaker.setVisible(this.itemAddCssClassName(),!1),this.table.setVisible(!1);const n=this.table.getRowElem(t),o=this.table.getCellElems(n)[0][0].children[0];this.scoreGrid.headerElem?.appendChild(o)}async onItemDelete(e){const t=parseInt(e.targetId);if(t<this.table.firstRowIndex)return;const s=this.chList[t-this.table.firstRowIndex],n=new le;n.setParent(this.dlgCssClassName());let i=S.None;switch(n.setYesNo(),i=await n.showWait(`${s.ch.name} を削除しますか？`),i){case S.Yes:break;case S.No:return;case S.Cancel:return}this.addActionLog(s,pe.Delete),t>=1&&(this.table.deleteRow(t),this.table.redimAllRows(),this.chList.splice(t-this.table.firstRowIndex,1))}async addActionLog(e,t){const s=new at;s.logType=t,s.chUuid=e.chUuid,s.ch=e.ch,s.scoreSet=e.scoreSet;const n=at.toJsonText(s);await(await we()).put(be.CharSummaryAction,n)}updateChScoreInfo(e){const t=this.table.getRowElem(e);if(t===null)return;const s=this.table.getCellElems(t);if(s===null)return;const n=this.chList[e-this.table.firstRowIndex].ch.name;this.table.updateText(s[0][1],n);const i=this.getChScoreInfo(e);this.table.updateRowImageToolTip(e,i)}getChScoreInfo(e){const t=e-this.table.firstRowIndex,s=this.chList[t];let n="";for(const i of s.scoreSet.items){let o=i.selectedText;o=o===void 0?"*bug*":o;const l=`${i.title}:${o}`;n!==""&&(n=`${n}
`),n=`${n}${l}`}return n}addItemEventHandlers(){this.htmlMaker.enableTableEvents(this.tableCssClassName())}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e),this.imageLoader=e}async charStock(e){let t=this.table.getSelectedRow();const s=t!==this.table.invalidRowIndex,n=new le;n.setParent(this.dlgCssClassName());let i=S.None;s?(n.setYesNoCancel(),i=await n.showWait(`${e.selectCh.name} を更新しますか？`)):(n.setYesNo(),i=await n.showWait(`${e.selectCh.name} を追加しますか？`));let o=!1,l=!1;switch(i){case S.Yes:s?(o=!1,l=!0):(o=!0,l=!1);break;case S.No:s?(o=!0,l=!1):(o=!1,l=!1);break;case S.Cancel:return}let a=null;if(o){const r=this.tableRowCssClassName(),c=this.table.addRow(r);if(c>=0){const m=new Je;m.ch=e.selectCh,m.scoreSet=e.scoreSet,this.chList.push(m),t=c,this.table.selectRow(c),this.table.updateRowImage(c,e.selectedImg),this.table.scroll(c),a=this.table.getRowElem(c)}}if(l){const r=t-this.table.firstRowIndex,c=this.chList[r];c.scoreSet=e.scoreSet,this.tableRowCssClassName();const m=t;this.table.scroll(m),a=this.table.getRowElem(m)}if(a!==null){const r=this.table.getCellElems(a);if(r){const c=this.getChScoreInfo(t);this.table.updateText(r[0][1],c)}}}itemIconCssClassName(){return`${this.tableCssClassName()}-icon`}itemStatusCssClassName(){return`${this.tableCssClassName()}-status`}itemAddCssClassName(){return`${this.tableCssClassName()}-add`}itemUpdateCssClassName(){return`${this.tableCssClassName()}-update`}itemDeleteCssClassName(){return`${this.tableCssClassName()}-delete`}tableRowCssClassName(){return"char-summary-table-row"}tableCssClassName(){return"char-summary-table"}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return"char-summary-dlg"}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=document.createElement("style");s.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,e,t)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgContentCssClassName()} {
  width: 100%;
  max-width: 320px;
  min-width: 240px;
  margin: 0 auto;
}

${this.htmlMaker.MakeTableScrollCss(this.tableCssClassName(),400)}

/* テーブル内の行設定 */
.${this.tableRowCssClassName()} tr {
border-bottom: 1px solid #eee;
display: flex;
align-items: center;
padding: 8px;
}
/* イメージ設定 */
.${this.itemIconCssClassName()} {
width: 128px;
height: 128px;
}
/* ステータス設定 */
.${this.itemStatusCssClassName()} {
justify-content: flex-end;
font-size: 12px;
}
/* ボタンの個別スタイル */
.${this.itemUpdateCssClassName()} {
background: #9c27b0; /* 紫 */
color: white;
border-radius: 4px;
padding: 4px 12px;
}
.${this.itemDeleteCssClassName()} {
background: #e91e63; /* ピンクがかった赤（ポップな警告色） */
color: white;
border-radius: 4px;
padding: 4px 12px;
}
/* HtmlMakerが自動付与する .selected クラスを利用 */
.${this.tableRowCssClassName()}.selected {
background: linear-gradient(to right, #fff176, #fbc02d); /* 選択されたら黄色に！ */
border-left: 5px solid #9c27b0; /* 左端に紫のアクセント */
}

${this.scoreGrid.getCssText(this.gridName,this.keyClassName,this.valueClassName)}

.${this.gridFooterName} {
  width: 100%;
  text-align: center;
}

`.trim(),document.head.appendChild(s);const n=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,n)}}class os{constructor(){this.cancel=!1}}const pe={None:"None",Add:"Add",Delete:"Delete",Update:"Update"};class at{constructor(){this.logType=pe.None,this.chUuid=""}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class je{constructor(){this.chUuid="",this.ch=new me}static toJsonText(e){const t=je.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new je;return t.chUuid=e.chUuid,t.ch=me.toJsonInst(e.ch),t.scoreSet=e.scoreSet,t}static fromJsonInst(e){const t=new Je;return t.ch=me.fromJsonInst(e.ch),t.scoreSet=new A,A.copy(e.scoreSet,t.scoreSet,!0),t}}class Ye{constructor(){this.items=new Array}static toJsonText(e){const t=Ye.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new Ye;t.items=new Array;for(const s of e.chList)t.items.push(je.toJsonInst(s));return t}static fromJsonInst(e){const t=new is;t.chList=new Array;for(const s of e.items)t.chList.push(je.fromJsonInst(s));return t}}class zs{constructor(){this.TextMap=new Map}set(e,t){const s=this.TextMap.has(e);return this.TextMap.set(e,t),s}remove(e){const t=this.TextMap.has(e);return t&&this.TextMap.delete(e),t}get count(){return this.TextMap.size}clear(){this.TextMap.clear()}forEach(e){if(e===void 0)return;let t=!1;for(const[s,n]of this.TextMap)if(t=e(s,n),t)break;return t}values(){const e=new Map;for(const[t,s]of this.TextMap)e.set(t,parseInt(s));return e}}class ls{constructor(e=0,t=""){this.ch=new he,this.isEmpty=!0,this.details=new zs,this.ch.id=e,this.ch.name=t}set(e,t){const s=this.details.TextMap.has(e);return this.details.set(e,t),s}get values(){return this.details.values()}get itemID(){const e=this.itemKey,t=this.ch.idAttributeForHTML.substring(e.length);let s=parseInt(t);return s<=0?-1:s}get itemKey(){return"chuid"}}class xt{constructor(){this.nFormationItem=5,this.uiInfo=new De}Init(){this.items=new Array;for(let e=0;e<this.nFormationItem;e++)this.items.push(new ls)}put(e,t){const s=this.items.find(n=>this.isExistCh(n,t));return s!==void 0&&s.isEmpty===!1?!1:(e.ch.ns=t.ns,e.ch.id=t.id,e.ch.name=t.name,e.isEmpty=!1,!0)}empty(e){const t=e.isEmpty;return e.isEmpty=!0,e.isEmpty!=t}isExistCh(e,t){return e.ch.name===t.name&&e.ch.id===t.id}equalsFormationItem(e,t){return e.ch.name===t.ch.name&&e.ch.id===t.ch.id}}class Js{constructor(){this.emptyFile="plus.png",this.autoForm=!1,this.editFormEnable=!1,this.saveEnable=!1,this.enableScoreEvent=!1,this.parentName="",this.listName="",this.gridHeaderName=`${this.dlgCssClassName()}-headerName`,this.gridFooterName=`${this.dlgCssClassName()}-footerName`,this.gridName=`${this.dlgCssClassName()}-gridName`,this.scoreGrid=null,this.editingIndex=-1,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new M().SaveSetting(e)},this.onScoreGridOpen=async e=>{console.log(`notifty id     = ${e.item.props.id}`),console.log(` targetId      = ${e.targetId}`),console.log(` classify      = ${e.classify}`),console.log(` selectedValue = ${e.selectedValue}`);const t=e.item.props.id,s=parseInt(t)-1;if(0<=s&&s<this.formation.items.length){const n=`${this.propItemCssClassName()}-${t}`;if(this.htmlMakerProp.IsEnabledId(n)!==!0)return;if(this.enableScoreEvent){const o=this.formation.items[s];if(o.ch.id===0){console.log("*bug?*");return}if(this.scsList[s].items.length===0){const l=`${o.ch.id}`,a=await this.charDB.getStatus(l);a!==null&&a.items!==void 0&&(this.scsList[s]=a,this.makeFlyoutGrid(a,s))}else{const l=this.scsList[s];this.makeFlyoutGrid(l,s)}}}else console.log(`invalid index = ${s}`)},this.savedScoreSet=new A,this.onScoreValueSelect=async e=>{console.log(`${e.callerName}, ${e.result}`);const s=this.scsList[this.editingIndex].items.find(n=>n.key===e.callerName);s!==void 0&&(s.selectedVal=e.result)},this.onOkClickScoreGrid=async e=>{const t=this.formation.items[this.editingIndex],s=this.scsList[this.editingIndex];this.disposeScorGrid(),this.notifyChangeScore(t,s)},this.onCancelClickScoreGrid=async e=>{const t=this.scsList[this.editingIndex];A.copy(this.savedScoreSet,t),this.disposeScorGrid()},this.onCopyPaste=async(e,t)=>{console.log(`[${e.className}] selected [${t}]`);const s="formation:";switch(t){case fe.Copy:const n=ye.toJsonText(this.formation,this.scsList);await Y.put(`${s}${n}`);break;case fe.Paste:const i=await Y.get();if(i===null)break;if(!i.startsWith(s)){const r=new le;r.setParent(this.dlgCssClassName()),await r.showWait(`ペーストデータの形式が不正です<br>${s}`);break}const o=JSON.parse(i.substring(s.length)),l=this.selectedItem.itemID;this.formation.Init();let a=-1;for(const r of o.items){a++,this.formation.items[a]=Xe.fromJsonInst(r);const c=this.formation.items[a];c.ch.idAttributeForHTML=`${c.itemKey}${a+1}`}this.scsList=new Array;for(const r of o.scsList){const c=new A;A.copy(r,c,!0),this.scsList.push(c)}a=-1;for(const r of this.formation.items){a++;let c=!1;r.isEmpty?await this.charEmptyItem(r):(await this.charPutItem(r),c=!0);const m=`${this.propItemCssClassName()}-${a+1}`;this.htmlMakerProp.EnableId(m,c);const g=this.scsList[a];this.notifyChangeScore(r,g)}this.selectedItem=this.formation.items[l-1];break}}}InitForEnemy(e){this.charDB=e,this.formation=new xt,this.formation.Init(),this.enableScoreEvent=!0,this.scsList=new Array;const t=this.formation.nFormationItem;for(let s=0;s<t;s++){const n=new A;this.scsList.push(n)}}InitForPlayer(e){this.charSummary=e,this.autoFormation()}autoFormation(){const e=this.formation!==void 0?this.formation.uiInfo:void 0;this.formation=new xt,this.formation.Init(),e!==void 0&&(this.formation.uiInfo=e);const t=this.charSummary.sortByScore();let s=0;if(this.scsList=new Array,t!==null){const n=Math.min(t.length,this.formation.nFormationItem);for(let i=0;i<n;i++){const o=this.formation.items[i];this.formation.put(o,t[i].ch)}for(const i of t){const o=i.scoreSet;this.scsList.push(o)}s=this.formation.nFormationItem-n}else s=this.formation.nFormationItem;for(let n=0;n<s;n++){const i=new A;this.scsList.push(i)}}async Setup(e,t){if(!e)return;this.formation=e;let s=0;for(const n of this.formation.items){n.isEmpty?this.formation.empty(n):this.formation.put(n,n.ch),s++;const i=`${n.itemKey}${s}`;n.ch.idAttributeForHTML=i;const o=n.isEmpty?this.emptyFile:n.ch.iconFileName,l=await t.getImageUrlBy(o,n.ch.ns);if(l===null)return;this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),n.ch.idAttributeForHTML,l)}}async toHTML(e){if(!this.formation)return"";this.listName=e,this.htmlMakerChSel=new H;let t=0;for(const s of this.formation.items){const n=s.ch;t++;const i=`${s.itemKey}${t}`;n.idAttributeForHTML=i;const o="",l=s.isEmpty?this.emptyFile:n.iconFileName,a=new Lt;a.imgSrc=o,a.imgFile=l;const r=new Q;r.props.name=this.itemCssClassName(),r.props.id=i,r.props.className=this.imgCssClassName(),r.props.option.setImg(a),r.props.option.toolTip=n.name,r.props.option.onSelect=c=>{console.log(`notifty id = ${c.item.props.id}`),this.setSelectedItem(c.item.props.id)},this.htmlMakerChSel.add(r)}return this.htmlMakerChSel.MakeScrollableList(this.listCssClassName())}toGridHTML(){this.htmlMakerProp=new H;let e=0;for(const t of this.formation.items){t.ch;const s=this.scsList[e];e++;for(const i of s.items)t.details.set(i.key,i.selectedVal);const n=new Q;n.props.name=`${this.propItemCssClassName()}-${e}`,n.props.id=`${e}`,n.props.className=`${this.propItemCssClassName()}`,n.props.option.setButton("スコア"),n.props.option.using.itemId=e,n.props.option.onSelect=this.onScoreGridOpen,this.htmlMakerProp.add(n)}return this.htmlMakerProp.MakeScrollableList(this.propCssClassName())}createFormationBox(e,t,s,n){this.parentName=t;let i=`
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
`.trim();const c=this.htmlMakerChSel.MakeDefaultToolButtonsHTML(r),m="";let g="";n!==""?g=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${c}
    ${s}
    ${n}
    ${m}
</div>`:g=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${c}
    ${s}
    ${m}
</div>`;const u=new ue;u.title="<"+e+">",u.SetB2Type(Se.CopyPaste,this.onCopyPaste),u.SetB4Type(xe.DialogHide);const p=u.NewDialog(t,this.dlgCssClassName());return u.SetContent(t,g),this.applyCss(),u.EnableEventHandlers(),u.onMoveDone=this.moverOnMoveDone,p}addEventHandlers(e){const t=document.getElementById(`${this.dlgCssClassName()}-auto`);t!==null&&(t.onclick=async()=>{await this.onAutoPut()});const s=document.getElementById(`${this.dlgCssClassName()}-tbput`);s!==null&&(s.onclick=async()=>{await this.onCharPut()});const n=document.getElementById(`${this.dlgCssClassName()}-tbempty`);n!==null&&(n.onclick=async()=>{await this.onCharEmpty()});const i=document.getElementById(`${this.dlgCssClassName()}-tbLeft`);i!==null&&(i.onclick=async()=>{await this.onCharLeft()});const o=document.getElementById(`${this.dlgCssClassName()}-tbRight`);o!==null&&(o.onclick=async()=>{await this.onCharRight()});const l=document.getElementById(`${this.dlgCssClassName()}-stock`);l!==null&&(l.onclick=async()=>{if(this.onStock!==void 0){if(this.selectedItem.ch.ns===G.None)return;const a=this.htmlMakerChSel.FindImgByID(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML),r=new kt;r.item=this.selectedItem,r.selectedImg=a===null?"":a.src;const c=this.findPropSelectedPos();c!==-1&&(r.scoreSet=this.scsList[c]),await this.onStock(r)}})}addItemEventkHandlers(e,t,s,n){this.onStock=s,this.onPut=e,this.onEmpty=t,this.onPropChanged=n;const i=this.htmlMakerChSel.GetIdByIndex(0);if(this.htmlMakerChSel.SelectByID(this.itemCssClassName(),i),this.htmlMakerChSel.enableEvents(this.itemCssClassName()),this.enableScoreEvent===!0){let o=0;for(const l of this.formation.items){o++;const a=`${this.propItemCssClassName()}-${o}`;this.htmlMakerProp.EnableId(a,!1)}this.htmlMakerProp.enableEvents(this.propCssClassName())}this.setSelectedItem(i)}async onAutoPut(){this.autoFormation(),await this.Setup(this.formation,this.imgLoader),await this.notifyChangeForm()}async notifyChangeForm(){for(const e of this.formation.items)await this.notifyChangeFormItem(e)}async notifyChangeFormItem(e){e.isEmpty?await this.notiftyOnEmpty(e):await this.notiftyOnPut(e,e.ch.iconFileName)}async notiftyOnPut(e,t){const s=new kt;return s.uiName=this.formation.uiInfo.name,s.item=e,s.selectedImg=t,await this.onPut(s),s}async notiftyOnEmpty(e){const t=new kt;return t.uiName=this.formation.uiInfo.name,t.item=e,t.selectedImg=this.emptyFile,await this.onEmpty(t),t}async notifyChangeScore(e,t){const s=new Ks;s.uiName=this.parentName,s.item=e,s.values=e.values,s.scoreConfigSet=t,await this.onPropChanged(s)}async onCharPut(){if(this.onPut!==void 0){this.selectedItem.isEmpty=!1;const e=await this.notiftyOnPut(this.selectedItem,"");this.formation.put(this.selectedItem,e.selectCh),this.replaceCharImg(this.selectedItem.ch.idAttributeForHTML,e.selectedImg,this.selectedItem.ch.name),this.propSelectedEnabled(!0)}}async onCharEmpty(){if(this.onEmpty!==void 0){this.selectedItem.isEmpty=!0;const e=await this.notiftyOnEmpty(this.selectedItem);this.formation.empty(this.selectedItem),this.replaceCharImg(this.selectedItem.ch.idAttributeForHTML,e.selectedImg,""),this.propSelectedEnabled(!1);const t=this.findPropSelectedPos();t!==-1&&(this.scsList[t]=new A)}}async onCharLeft(){this.canSwap(1)&&await this.formSwap(-1)}async onCharRight(){this.canSwap(this.formation.nFormationItem)&&await this.formSwap(1)}canSwap(e){return!(this.selectedItem===void 0||this.selectedItem.isEmpty===!0||this.selectedItem.itemID===e)}async formSwap(e){const t=this.selectedItem,s=t.itemID-1,n=s+e,i=this.formation.items[n],o=t.ch.idAttributeForHTML,l=i.ch.idAttributeForHTML,a=this.scsList[s],r=this.scsList[n],c=this.itemCssClassName(),m=this.htmlMakerChSel.FindImgByID(c,o),g=this.htmlMakerChSel.FindImgByID(c,l);if(m!==null&&g!==null){this.htmlMakerChSel.SwapImgSrcAndPairToolTip(m,g);const u=`${i.itemKey}${i.itemID}`;this.htmlMakerChSel.UnselectAll(c),this.htmlMakerChSel.SelectByID(c,u),this.formation.items[s]=i,this.formation.items[n]=t,this.formation.items[s].ch.idAttributeForHTML=o,this.formation.items[n].ch.idAttributeForHTML=l,this.scsList[s]=r,this.scsList[n]=a,this.setSelectedItem(u);const p=this.formation.items[n],d=this.formation.items[s];this.enableScoreEvent&&(this.propAutoEnabled(p),this.propAutoEnabled(d)),await this.notifyChangeFormItem(p),await this.notifyChangeFormItem(d),this.notifyChangeScore(p,this.scsList[s]),this.notifyChangeScore(d,this.scsList[n])}}async charPutItem(e){const t=await this.notiftyOnPut(e,e.ch.iconFileName);this.replaceCharImg(e.ch.idAttributeForHTML,t.selectedImg,e.ch.name)}async charEmptyItem(e){const t=await this.notiftyOnEmpty(e);this.replaceCharImg(e.ch.idAttributeForHTML,t.selectedImg,"")}replaceCharImg(e,t,s){this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),e,t),this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(),e,s)}propSelectedEnabled(e){const t=this.findPropSelectedPos();if(t!==-1){const s=`${this.propItemCssClassName()}-${t+1}`;this.htmlMakerProp.EnableId(s,e)}}propAutoEnabled(e){const t=!e.isEmpty,s=`${this.propItemCssClassName()}-${e.itemID}`;this.htmlMakerProp.EnableId(s,t)}makeFlyoutGrid(e,t){if(this.scoreGrid!==null)return;this.editingIndex=t,this.savedScoreSet=new A,A.copy(e,this.savedScoreSet,!0);const s=ns(),n=new Array;for(const g of e.items){const u=new Bt;u.selectionPair=g.selectionPair,u.selectedItem=g.selectedVal,u.classify=g.key;const p=new qe;p.makeItems(),p.items[0].typeInfo.setCombo(u),p.items[0].className="";const d=new Cs;d.key=g.key,d.text=s.convTitle(g.title),d.value=p,n.push(d)}const i=t+1,o=new bs;if(o.setGridtems(n),o.setListener(`${this.gridName}-${i}`,`${this.propItemCssClassName()}-${i}`,this.dlgContentCssClassName(),`${this.gridHeaderName}-${i}`,`${this.gridFooterName}-${i}`),o.setVisible(!0),o.setFontConfig("0.8"),o.applyCss(),o.enableEvents(this.onScoreValueSelect),this.scoreGrid=o,this.scoreGrid.footerElem!==null){let g=`
<button id="${this.gridFooterName}-okBtn">OK</button>
<button id="${this.gridFooterName}-canBtn">CANCEL</button>
`.trim();this.scoreGrid.footerElem.innerHTML=g,document.getElementById(`${this.gridFooterName}-okBtn`).onclick=this.onOkClickScoreGrid,document.getElementById(`${this.gridFooterName}-canBtn`).onclick=this.onCancelClickScoreGrid}const l=document.getElementById(this.dlgContentCssClassName()),a=this.htmlMakerChSel.GetRect(l),r=this.htmlMakerChSel.FindDivByClassName(this.parentName,this.propCssClassName());this.htmlMakerChSel.GetRect(r);const c=this.htmlMakerChSel.FindDivByClassName(this.parentName,this.listCssClassName()),m=this.htmlMakerChSel.GetRect(c);o.show(`${parseInt(m.left)-parseInt(a.left)+t*100+5}`,`${parseInt(m.top)-parseInt(a.top)+parseInt(m.height)+5}`)}disposeScorGrid(){this.scoreGrid!==null&&(this.scoreGrid.dispose(),this.scoreGrid=null),this.editingIndex=-1}findPropSelectedPos(){const e=this.htmlMakerChSel.FindDivByClassName(this.dlgContentCssClassName(),this.propCssClassName());if(e!==null&&e.className.startsWith(this.propCssClassName())){let t=-1;for(const s of this.formation.items)if(t++,s===this.selectedItem)return console.log(`pos=${t}`),t}return-1}setSelectedItem(e){const t=this.formation.items.find(s=>e===s.ch.idAttributeForHTML);t&&(this.selectedItem=t)}enableLazyImages(e){this.htmlMakerChSel.initObserver(this.dlgCssClassName(),e)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}propCssClassName(){return`${this.listName}-prop`}propItemCssClassName(){return`${this.listName}-prop-item`}lblCssClassName(){return`${this.listName}-lbl`}listCssClassName(){return`${this.listName}-list`}dlgContentCssClassName(){return`${this.parentName}-dlg-content`}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=this.propCssClassName(),i=this.propItemCssClassName();this.lblCssClassName();const o=parseInt(this.formation.uiInfo.left),l=parseInt(this.formation.uiInfo.top),a=100,r=document.createElement("style");r.textContent=`
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
  ${q.footerButtonText()}
}
[class^="${this.gridFooterName}-"] {
width: 100%;
display: flex;
gap: unset;
justify-content: flex-end;
}
`.trim(),document.head.appendChild(r);const c=document.getElementById(this.parentName);this.htmlMakerChSel.copyCssToInlineStyle(`.${this.parentName}`,c)}}class kt{constructor(){this.cancel=!1}}class Ks{constructor(){this.uiName="",this.cancel=!1}}class Xe{constructor(){this.ch=new me,this.isEmpty=!0,this.TextMap=""}static toJsonText(e){const t=me.toJsonInst(e.ch);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new Xe;t.ch=me.toJsonInst(e.ch),t.isEmpty=e.isEmpty;const s=Object.fromEntries(e.details.TextMap);return t.TextMap=JSON.stringify(s,null,2),t}static fromJsonInst(e){const t=new ls;t.ch=me.fromJsonInst(e.ch),t.isEmpty=e.isEmpty;const s=new Map(Object.entries(JSON.parse(e.TextMap)));return t.details.TextMap=s,t}}class ye{static toJsonText(e,t){const s=ye.toJsonInst(e,t);return JSON.stringify(s,null,2)}static toJsonInst(e,t){const s=new ye;s.items=new Array,s.scsList=new Array;for(const n of e.items)s.items.push(Xe.toJsonInst(n));for(const n of t)s.scsList.push(n);return s}static fromJsonInst(e){const t=new xt;t.items=new Array;for(const s of e.items)t.items.push(Xe.fromJsonInst(s));return t}}class vt{constructor(e,t=!0,s){this.isEmpty=!0,this.allAvailable=!1;const n=new he;n.ns=e.ns,n.id=e.id,n.name=e.name,this.ch=n,this.isEmpty=t,this.scoreSet=s}get score(){return Math.ceil(this.scoreSet.stdScore)}static copy(e,t){t.ch.ns=e.ch.ns,t.ch.id=e.ch.id,t.ch.name=e.ch.name,t.isEmpty=e.isEmpty,t.scoreSet=new A,A.copy(e.scoreSet,t.scoreSet,!0)}}class Ut{Add(e){if(e===void 0){console.log("[VersusGroupRow::Add] scItem === undefined");return}this.columns===void 0&&(this.columns=[]),this.columns.push(e)}Count(){return this.columns.length}debug(){if(this.columns===void 0){console.log("[VersusGroupRow::debug] this.columns === undefined");return}for(const e of this.columns)console.log(`[${e.ch.name}]	score=[${e.scoreSet}]`)}}Ut.defNumColumn=5;class Ot{Add(e){this.groupRows===void 0&&(this.groupRows=[]),this.groupRows.push(e)}Count(){return this.groupRows.length}debug(){if(this.groupRows===void 0)console.log("this.groupRows === undefined");else for(const e of this.groupRows)e.debug()}async loadJson(e){const n=(await new _e().loadJson(e)).groupRows.map(o=>Object.assign(new Ut,o)),i=new Ot;return i.groupRows=n,i}}const Ne={None:"None",Player:"Player",Enemy:"Enemy"},de={None:"None",Attr:"Attr",Role:"Role"},ft={HiLv:"HiLv"},ie={Likely:"Likely",Uncertain:"Uncertain",Wishful:"Wishful"};class pt{}pt.Likely=.9;pt.Uncertain=.64;class Mt{constructor(){this.scoreItems=[],this.formationType=Ne.None,this.boost=0}get imgPrefix(){return this.formationType===Ne.Player?"ftPlayer":"ftEnemy"}get judgeWidth(){return 48}setScoreItems(e){if(e!==void 0){this.scoreItems=new Array;for(const t of e){const s=new vt(t.ch,t.isEmpty,t.scoreSet);this.scoreItems.push(s)}}}async toCharHTML(e,t){const s=t.isEmpty?e.demoMaterial:t.ch.iconFileName,n=t.ch.ns===G.None?"":t.ch.ns,i=await e.getImageUrlBy(s,n);let o=this.scoreToolTip(t);return o!==""&&(o=`title="${o}"`),`
<img class=${this.charCssClassName()}
  src="${i}"
  ${o}>
`.trim()}scoreToolTip(e){return e.isEmpty?"":`${e.ch.name}
score=${e.score}`}async toJudgeHTML(e,t){const s=this.toJudgeFileURL(e,t);return`<img class=${this.judgeCssClassName()} src="${s}" width="48">`}async toJudgeFileURL(e,t){let s=null;switch(t){case ie.Likely:s=await e.getImageUrlBy("win.png",e.AnyNs);break;case ie.Uncertain:s=await e.getImageUrlBy("even.png",e.AnyNs);break;case ie.Wishful:s=await e.getImageUrlBy("lost.png",e.AnyNs);break;default:return""}return s}charCssClassName(){return"combat-char"}judgeCssClassName(){return"combat-judge"}get combatScore(){if(this.scoreItems===void 0)return 0;const e=this.scoreItems.reduce((s,n)=>n.isEmpty?s:s+n.score,0),t=this.boost===0?1:this.boost;return Math.ceil(e*t/100)}get checkNsCombo(){if(this.scoreItems===void 0){console.log(`[checkNsCombo] scoreItems undefined (${this.formationType})`);return}const e=Array();for(const i of this.scoreItems){if(i.isEmpty||i.ch.ns===G.None)continue;const o=new vt(i.ch,i.isEmpty,i.scoreSet);e.push(o)}if(e.length==0){console.log(`[checkNsCombo] no scoreItems (${this.formationType})`);return}let t=G.None,s=0;const n=new Map;for(const i of e){if(t===G.None){t=i.ch.ns,s=1;continue}if(t!==i.ch.ns){t=i.ch.ns,s=1;continue}s++,s>=2&&(n.has(t),n.set(t,s))}return console.log(`**checkNsCombo::${this.formationType}**`),console.log(n),n}calcNsScore(e){const t=this.checkNsCombo;if(t===void 0)return 0;let s=0;for(const[n,i]of t){if(!e.has(i))continue;const o=e.get(i);o!==void 0&&(s+=o)}return s}}class Ws{constructor(){this.hasCombo=!1,this.winRate=new Map}setPlayer(e){e.formationType=Ne.Player,this.player=e}setEnemy(e){e.formationType=Ne.Enemy,this.enemy=e}judge(e){const s=this.winRate.get(e);return s>=pt.Likely?ie.Likely:s>=pt.Uncertain?ie.Uncertain:ie.Wishful}judgeForEnemy(e){switch(e){case ie.Likely:return ie.Wishful;case ie.Uncertain:return ie.Uncertain;case ie.Wishful:return ie.Likely}}}class qs{constructor(){this.combatPairs=new Map,this.gameConfig=void 0,this.guide=void 0,this.emptyFile="plus.png",this.parentName="",this.uiInfo=new De,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new M().SaveSetting(e)},this.onGuide=async(e,t,s)=>{if(this.guide!==void 0){this.guide.setVisible(!this.guide.getVisible());return}const n=this.parentName,i=new Array,o=new Ns;o.value.makeItems(1),o.value.items[0].typeInfo.setLabel("NS : 0",!1),o.value.items[0].className=`${n}-guide-ns`,i.push(o);const l=this.htmlMaker.GetRect(e.parentElement),a=this.htmlMaker.GetRect(s),r=new Is;r.setGuidetems(i),r.setListener(`${n}-guide`,n,`${n}-guide`),r.applyCss(),r.enableOverlay(!1),r.show(`${parseInt(a.left)-parseInt(l.left)+34}`,"0"),this.guide=r}}setPair(e,t){this.combatPairs.set(e,t)}calcCombatScore(){for(const[e,t]of this.combatPairs){if(t.player===void 0||t.enemy===void 0)continue;const s=[de.None,de.Attr,de.Role];for(const n of s){let i=t.player.combatScore,o=t.enemy.combatScore;if(this.gameConfig!==void 0){console.log("** NS combo checking ... **");const l=t.player.checkNsCombo,a=t.enemy.checkNsCombo,r=this.gameConfig.nsComboScoreList;if(l!==void 0){let c=t.player.calcNsScore(r);console.log(`** player nsScoreAdd : ${c} **`),i+=c}if(a!==void 0){let c=t.enemy.calcNsScore(r);console.log(`** enemy nsScoreAdd : ${c} **`),o+=c}}else console.log("** NS combo skipped **");t.winRate.set(n,o!==0?i/o:1)}}}async replaceChar(e,t,s,n,i){const o=this.combatPairs.get(e);let l;if(t===Ne.Player?l=o?.player:t===Ne.Enemy&&(l=o?.enemy),l===void 0)return!1;const a=s.itemID;if(a<0)return!1;const r=a-1;l=l;const m=`${l.imgPrefix}${a}`,g=l.scoreItems[r],u=g.ch;let p="";s.isEmpty?(u.id=0,u.name="",p=i.demoMaterial,console.log("[replaceChar] set empty")):(u.id=n.id,u.name=n.name,p=u.iconFileName,console.log(`[replaceChar] set char ${n.id}:${n.name}`)),g.isEmpty=s.isEmpty;const d=u.ns===G.None?"":u.ns,w=await i.getImageUrlBy(p,d);if(w===null)return!1;const k=new H,x=this.outerCssClassName();return k.ReplaceImg(x,m,w),!0}async replaceJudge(e){async function t(i,o){const l=await i.toJudgeFileURL(e,o);if(l===null)return;const a=i.imgPrefix;for(let r=0;r<i.scoreItems.length;r++){const c=`${a}${r+1}`,m=s.FindImgsByID(n,c);if(m===null||m.length<=1){console.error("fail on judge marker");continue}const g=m[1];s.SetImgSrc(g,l),i.scoreItems[r].isEmpty?s.SetImgSize(g,0,0):s.SetImgSize(g,i.judgeWidth,i.judgeWidth);const u=i.scoreItems[r];s.ReplaceImgToolTip(n,c,i.scoreToolTip(u))}}const s=new H,n=this.outerCssClassName();for(const[i,o]of this.combatPairs){if(o.player===void 0||o.enemy===void 0)continue;const l=[de.None,de.Attr,de.Role];for(const a of l){if(a!==de.None)continue;const r=o.judge(a),c=o.judgeForEnemy(r);await t(o.player,r),await t(o.enemy,c)}}}async updateGuide(){if(this.guide===void 0||this.gameConfig===void 0||this.combatPairs.has(ft.HiLv)===!1)return;const e=this.combatPairs.get(ft.HiLv);if(e===void 0)return;const t=e.player.checkNsCombo,s=e.enemy.checkNsCombo,n=this.gameConfig.nsComboScoreList;let i=0;t!==void 0&&(i=e.player.calcNsScore(n));let o=0;s!==void 0&&(o=e.enemy.calcNsScore(n)),this.guide.setText(0,`NSコンボ：P=[${i}] vs E=${o}`)}async toHTML(e,t){const s=document.createElement("table");s.id=e;const n=document.createElement("tbody");s?.appendChild(n);async function i(l,a){const r=document.createElement("tr");n?.appendChild(r);const c=await a.toJudgeHTML(t,l),m=a.imgPrefix;let g=0;for(const u of a.scoreItems){g++;const p=await a.toCharHTML(t,u),d=`
<div class=${o} item-id="${m}${g}">
    ${p}
    ${c}
</div>
`.trim(),w=document.createElement("td");w.innerHTML=d,r.appendChild(w)}}const o=this.outerCssClassName();for(const[l,a]of this.combatPairs){const r=a.judge(de.None),c=a.judgeForEnemy(r);await i(r,a.player),await i(c,a.enemy)}return s.outerHTML}createCombatBox(e,t,s){this.parentName=t,this.htmlMaker=new H;const n=`<div class="${this.parentName}-dlg-content">
    ${s}
</div>`,i=new ue;i.title="<"+e+">";const o=i.NewDialog(t,this.dlgCssClassName());return i.SetGuide(ze.Guide,this.onGuide),i.SetContent(t,n),this.applyCss(),i.EnableEventHandlers(),i.onMoveDone=this.moverOnMoveDone,o}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}outerCssClassName(){return"combat-outer"}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const e=new Mt,t=`.${this.outerCssClassName()}`,s=`.${e.charCssClassName()}`,n=`.${e.judgeCssClassName()}`,i=parseInt(this.uiInfo.left),o=parseInt(this.uiInfo.top),l=document.createElement("style");l.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,i,o)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.parentName}-dlg-content {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
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
`.trim(),document.head.appendChild(l);const a=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,a)}}const Ue={Unknown:"Unknown",Success:"Success",Fail:"Fail",Cancel:"Cancel"};async function Yt(h){const e=h.isWebRunning,t=h.currentUserHome,s=h.chStatusListFile,n=h.chListFile,i=new Ps,o=new H,l="splash-screen";o.initFullScreen(l,"エボナ データベース初期化中..."),o.applyFullScreenCss(l);const a=o.getFullScreenMsgElem(l),r=a!==null?a.innerHTML:"",m=await new Ft().LoadList(n);if(t===h.user1Home){const I=[{ns:G.CnsRed,nsName:"赤属性"},{ns:G.CnsBlue,nsName:"青属性"},{ns:G.CnsGreen,nsName:"緑属性"},{ns:G.CnsYellow,nsName:"黄属性"},{ns:G.CnsViolet,nsName:"紫属性"}];for(const T of I)a!==null&&(a.innerHTML=`${r} ${T.nsName}`),await i.setupNs(T.ns,h,m)}if(t===h.user2Home){const I=[{ns:G.CnsBlue,nsName:"藍属性"},{ns:G.CnsRed,nsName:"紅属性"},{ns:G.CnsGreen,nsName:"翠属性"},{ns:G.CnsYellow,nsName:"黄属性"},{ns:G.CnsWhite,nsName:"天属性"},{ns:G.CnsBlack,nsName:"冥属性"}];for(const T of I)a!==null&&(a.innerHTML=`${r} ${T.nsName}`),await i.setupNs(T.ns,h,m)}let g;g=await h.loadGameConfig(h.gameType),console.log(g),h.onGameConfigChanged=async I=>{I.receivedBool===!0&&(console.log("onGameConfigChanged"),console.log(I.receivedBool),g=await h.loadGameConfig(h.gameType),console.log(g),await Kt())},h.startBcHelper(),a!==null&&(a.innerHTML="UI 初期化中 ...");const u=new yt,p=new gt;await p.loadDB(s),p.charSpecSet=m,await p.loadAuxScoreSet(h.gameType);async function d(){const I=new Us;I.chSet=m,I.uiInfo.name="charListArea",I.uiInfo.left="300",I.uiInfo.top="100";const T=I.uiInfo.name,V=await I.toHTML(i);if(e){const L="キャラ選択",E=I.createSelectorBox(L,T,V);I.addEventHandlers(E),I.addItemEventHandlers(),I.enableLazyImages(i),E.show();const O=new re;O.setAsDlg(E,L),u.add(O)}return I}const w=await d();async function k(){const I=new is;await I.load(),I.uiInfo.name="CharSummary",I.uiInfo.left="400",I.uiInfo.top="100";const T=I.uiInfo.name,V=await I.toHTML();if(e){const L="キャラ一覧",E=I.createSummaryBox(L,T,V);await I.updateCharInfos(i),I.addEventHandlers(E,async F=>{F.selectCh=w.selectedCh;const X=await i.getImageUrlBy(w.selectedCh.iconFileName,w.selectedCh.ns);if(X===null)F.selectedImg="",F.cancel=!0;else{F.selectedImg=X,F.cancel=!1;const K=await p.getStatus(w.selectedCh.idAsText);F.scoreSet=K}console.log(`selected ch = ${F.selectCh.name}`)}),I.addItemEventHandlers(),I.enableLazyImages(i),E.show();const O=new re;O.setAsDlg(E,L),u.add(O)}return I}const x=await k();async function B(I,T,V,L){const E=new Js;I===$&&(E.InitForPlayer(x),E.autoForm=!0,E.editFormEnable=!1,E.saveEnable=!1,E.imgLoader=i),I===f&&(E.InitForEnemy(p),E.autoForm=!1,E.editFormEnable=!0,E.saveEnable=!0),E.formation.uiInfo.name=I,E.formation.uiInfo.left=`${T}`,E.formation.uiInfo.top=`${V}`;const O=E.formation.uiInfo.name,F=await E.toHTML(O),X=I===f?E.toGridHTML():"";if(e){const K=E.createFormationBox(L,O,F,X);E.addEventHandlers(K),E.addItemEventkHandlers(async U=>{let _="",bt="";U.selectedImg===""?(_=w.selectedCh.iconFileName,bt=w.selectedCh.ns,U.selectCh=w.selectedCh):(_=U.item.ch.iconFileName,bt=U.item.ch.ns,U.selectCh=U.item.ch);const Wt=await i.getImageUrlBy(_,bt);Wt!==null&&(U.selectedImg=Wt,U.item.isEmpty=!1,Jt(U.uiName,U.item,U.selectCh))},async U=>{const _=await i.getImageUrlBy(U.selectedImg,w.selectedCh.ns);_!==null&&(U.selectedImg=_,U.item.isEmpty=!0,Jt(U.uiName,U.item,U.selectCh))},async U=>{console.log(`selected ch = ${U.item.ch.name}`);const _=new os;_.selectCh=U.item.ch,_.selectedImg=U.selectedImg,_.scoreSet=U.scoreSet,x.charStock(_)},async U=>{await Kt()}),E.enableLazyImages(i),K.show();const Ae=new re;Ae.setAsDlg(K,L),u.add(Ae)}return E}const $="playerForm",f="enemyForm",N=await B($,100,100,"自編成"),y=await B(f,100,200,"敵編成");async function b(I,T,V,L){C.uiInfo.name=I,C.uiInfo.left=`${T}`,C.uiInfo.top=`${V}`;const E=await C.toHTML("combatTable",i),O=C.createCombatBox(L,I,E);C.enableLazyImages(i),await C.replaceJudge(i),O.show();const F=new re;F.setAsDlg(O,L),u.add(F)}const C=new qs;zt(),await b("combatForm",120,300,"対戦予想");const Ie="保存";new re().setAsMenu(Ie);const ne="復帰";new re().setAsMenu(ne);const Z="設定";{const I=new re;I.setAsMenu(Z),u.add(I)}let J=null;const ke=await u.toHTML("dockForm",i);if(e){const I=u.createDockBox("dockForm",ke);u.addItemClickHandlers(async T=>{if(u.stdApplyAction(T)!==!1&&T.item.isMenuType&&(T.item.toolTip===Ie&&await rs(),T.item.toolTip===ne&&await cs(async L=>{if(console.log(`[loadedResult] ${L}`),L!==Ue.Success)return;const E=ye.fromJsonInst(et),O=ye.fromJsonInst(tt);et=null,tt=null,await N.Setup(E,i),await y.Setup(O,i)}),T.item.toolTip===Z)){const L=h.editorURL;window.open(L,L)}}),u.enableLazyImages(i),I.show(),J=I}const ee="playerForm.json",oe="enemyForm.json",Ct="dockForm.json";async function rs(){u.InitZOrder(Te);const I=ye.toJsonText(N.formation,N.scsList),T=ye.toJsonText(y.formation,y.scsList),V=dt.toJsonText(u),L=new window.JSZip;L.file(ee,I),L.file(oe,T),L.file(Ct,V);const E=await L.generateAsync({type:"blob"}),O="gameConfig.zip",F=URL.createObjectURL(E),X=document.createElement("a");X.href=F,X.download=O,X.click(),URL.revokeObjectURL(F),console.log("saved!")}let Gt=null,et=null,tt=null;async function cs(I){const T=document.createElement("input");return T.type="file",T.accept=".zip",T.addEventListener("cancel",()=>(console.log("Cancelled."),Ue.Cancel)),T.addEventListener("change",async()=>{if(T.files.length==1){console.log("File selected: ",T.files[0].name);const L=await T.files[0].arrayBuffer(),O=await new window.JSZip().loadAsync(L);async function F(K){const Ae=O.file(K);if(Ae){const U=await Ae.async("string"),_=JSON.parse(U);return console.log(_),_}}{const K=await F(Ct);K&&(Gt=K)}{const K=await F(ee);K&&(et=K)}{const K=await F(oe);K&&(tt=K)}const X=Gt!==null&&et!==null&&tt!==null?Ue.Success:Ue.Fail;I(X)}}),T.click(),Ue.Unknown}const Te=new M;e&&(Te.AddDialogs(),Te.AssignIndexies(),await Te.LoadAllSetting(),await Te.loadSetting(J),u.InitZOrder(Te),await Te.ForEachAsync(I=>{const T=ue.FindDialogParent(I);return T!==null&&(h.isLocal||I==="charListArea"?T.hidden=!1:T.hidden=h.evonaType!==ae.Full),!0}),J!==null&&(J.parentElement.hidden=h.evonaType!==ae.Full)),o.hideFullScreenCss(l);function Vt(I){const T=new Ot,V=new Ut,L=I.formation;L.uiInfo.name,L.uiInfo.name,I.scsList===void 0&&console.log(`[${I.formation.uiInfo.name}] 対戦予想結果の作成は工事中です`);let E=0;for(const O of L.items){if(I.scsList===void 0)continue;const F=I.scsList[E];if(F.ns===G.None){const K=O.ch.ns;F.ns=K,console.log(`[toScoreRes] set ns (${I.formation.uiInfo.name}::${O.ch.name}) : None -> ${K}`)}E++;const X=new vt(O.ch,O.isEmpty,F);X.allAvailable=F.allAvailable,V.Add(X)}return T.Add(V),T.debug(),T}function zt(){C.gameConfig=g;const I=Vt(N),T=Vt(y),V=new Mt;V.setScoreItems(I.groupRows[0].columns),V.boost=100;const L=new Mt;L.setScoreItems(T.groupRows[0].columns),L.boost=100;const E=new Ws;E.setPlayer(V),E.setEnemy(L),C.setPair(ft.HiLv,E),C.calcCombatScore();for(const[O,F]of C.combatPairs){const X=F.judge(de.None);console.log(`judge=[${X}]`)}}async function Jt(I,T,V){const L=ft.HiLv;C.combatPairs.get(L),I===$&&await C.replaceChar(L,Ne.Player,T,V,i),I===f&&await C.replaceChar(L,Ne.Enemy,T,V,i),await C.replaceJudge(i),await C.updateGuide()}async function Kt(){zt(),await C.replaceJudge(i),await C.updateGuide()}}async function js(h){if(!h.isWebRunning)return;const e=h.isWebRunning;console.log(`mode=${h.edit}`);const t=new yt;async function s(){const p=se.Resource,d=new Nt;d.init(),d.setConfig(xs()),await d.load(p,z.none),d.uiInfo.name="ResourceEdit",d.uiInfo.left="110",d.uiInfo.top="10";const w=d.uiInfo.name,k=await d.toHTML(Ms());if(e){const x=document.createElement("div");x.id=d.uiInfo.name,x.className=d.uiInfo.name,document.body.appendChild(x);const B="文字列リソース",$=d.createEditorBox(B,w,k);d.addEventHandlers($),d.addItemEventHandlers(),$.show(),d.enableResize();const f=new re;f.setAsDlg($,B),t.add(f)}return d}async function n(){const p=se.GameUI,d=new Nt;d.initNumItems=5,d.canAdd=!1,d.init(),d.setConfig(ts()),await d.load(p,z.none),d.uiInfo.name="GameEdit",d.uiInfo.left="110",d.uiInfo.top="10",d.uiInfo.height="235";const w=d.uiInfo.name,k=await d.toHTML(Bs());if(e){const x=document.createElement("div");x.id=d.uiInfo.name,x.className=d.uiInfo.name,document.body.appendChild(x);const B="ゲーム設定",$=d.createEditorBox(B,w,k);d.addEventHandlers($),d.addItemEventHandlers(),$.show(),d.enableResize();const f=new re;f.setAsDlg($,B),t.add(f)}return d}async function i(){const p=se.ScoreUI,d=new Nt;d.init(),d.setConfig(vs(h.gameType)),await d.load(p,h.edit),d.uiInfo.name="ScoreEdit",d.uiInfo.left="110",d.uiInfo.top="100";const w=d.uiInfo.name,k=await d.toHTML(Ls());if(e){const x=document.createElement("div");x.id=d.uiInfo.name,x.className=d.uiInfo.name,document.body.appendChild(x);const B="スコア設定",$=d.createEditorBox(B,w,k);d.addEventHandlers($),d.addItemEventHandlers(),$.show(),d.enableResize();const f=new re;f.setAsDlg($,B),t.add(f)}return d}(await s()).startAutoSave();const l=await n();l.startAutoSave(),l.onSaved=async p=>{h.startBcHelper(),h.notifyGameConfigChanged()},(await i()).startAutoSave();const r=document.createElement("div"),c="dockEdit";r.id=c,r.className=c,document.body.appendChild(r);let m=null;const g=await t.toHTML(c,null);if(e){const p=t.createDockBox(c,g);t.addItemClickHandlers(async d=>{t.stdApplyAction(d)}),p.show(),m=p}const u=new M;e&&(u.AddDialogs(),u.AssignIndexies(),await u.LoadAllSetting(),await u.loadSetting(m),t.InitZOrder(u),await u.ForEachAsync(p=>{const d=ue.FindDialogParent(p);return d!==null&&(p!=="ResourceEdit"?d.hidden=!1:d.hidden=!0),!0}),m!==null&&(m.parentElement.hidden=!1))}const P=new _e,as=P.isWebRunning;as?(Xs(),P.parseURLParams(),P.currentUserHome===""&&P.setUser(P.user1Home)):P.setUser(P.user2Home);let Ze=window.EVONA_CONFIG.isLocal;P.aslocal!==Ke.Undef&&(Ze=P.aslocal===Ke.True);P.setPath();P.appHref=window.location.href;Y.encodeEnable=!Ze;P.setImageHome(Ze);const Ys=Qs(Ze)||P.availComing;P.currentUserHome;P.statusJsonPath;P.zipPrefix;P.chListFile;P.chStatusListFile;switch(P.admin){case!0:await Ds(P);break;case!1:if(as)if(P.edit===z.none){let h=!1,e=!1;const t=new le;t.CheckVisible=!0,t.CheckText="位置情報を初期化",t.SecretEnable=!0;const s=P.setBrowserTitle();await t.showWait(`「${s} 」モードで起動します`)===S.Secret&&(e=!0),h=t.Checked;let i=ae.None;if(Ze)i=ae.Full;else if(i=ae.NotRun,e){let o="";t.CheckVisible=!1,t.SecretEnable=!1,t.AuthVisible=!0,t.onAuthChecking=g=>(o=g,!0),await t.showWait("認証コードを入力してください");const l=new Date,a=("0"+(l.getMonth()+1)).slice(-2),r=("0"+l.getDate()).slice(-2),m=Math.random()>.5?`${a}${r}`:`${r}${a}`;o===m?(console.log("auth success"),i=ae.Full):console.log("auth fail")}else Ys&&(i=ae.Limit);switch(h&&(await(await ms()).clear(),await(await we()).clear()),P.evonaType=i,i){case ae.Full:window.EVONA_CONFIG.demo=!1,await Yt(P);break;case ae.Limit:window.EVONA_CONFIG.demo=!0,await Yt(P);break}}else P.setBrowserTitle(),await js(P);break}function Xs(){const h=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname.startsWith("192.168."),e=h?"./jszip_dist/jszip.min.js":"https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js",t=h?"./jsstore_dist/jsstore.min.js":"https://cdn.jsdelivr.net/npm/jsstore/dist/jsstore.min.js";window.EVONA_CONFIG={isLocal:h,workerFile:"./jsstore_dist/jsstore.worker.min.js",demo:!h};function s(n,i=!1){const o=document.createElement("script");o.src=n,i&&(o.type="module"),o.async=!1,document.head.appendChild(o)}s(e),s(t)}function Qs(h){if(h)return!0;const e=document.referrer;console.log(`${e}`);const t="evona_auth",s="granted";return sessionStorage.getItem(t)===s?!0:e.includes("qiita.com")?(sessionStorage.setItem(t,s),!0):!1}

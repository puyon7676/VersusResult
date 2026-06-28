(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const Q={none:"none",classPq:"pq",classMM:"mm"},O={None:"None",CnsRed:"CnsRed",CnsBlue:"CnsBlue",CnsGreen:"CnsGreen",CnsYellow:"CnsYellow",CnsViolet:"CnsViolet",CnsWhite:"CnsWhite",CnsBlack:"CnsBlack"},fe={None:"None",Front:"Front",Center:"Center",Backend:"Backend"},Ye={B100:"B100",B125:"B125",B150:"B150",B200:"B200",B300:"B300"},Se={None:"None",High:"High",Mid:"Mid",Low:"Low"},B={cmAutoScore:"cmAutoScore",pqStatusHP:"pqStatusHP",pqStatusATK:"pqStatusATK",pqStatusREC:"pqStatusREC",pqTokkunHP:"pqTokkunHP",pqTokkunATK:"pqTokkunATK",pqTokkunREC:"pqTokkunREC",pqTokuSp1:"pqTokuSp1",pqTokuSp2:"pqTokuSp2",pqStatusType:"pqStatusType",pqStatusCombo:"pqStatusCombo",mmAbilitySTR:"mmAbilitySTR",mmStatusFGT:"mmStatusFGT",mmStatusATK:"mmStatusATK",mmStatusPDF:"mmStatusPDF",mmStatusACC:"mmStatusACC",mmStatusEVA:"mmStatusEVA",mmStatusCRI:"mmStatusCRI",mmStatusMDF:"mmStatusMDF",mmStatusHP:"mmStatusHP",mmStatusCRD:"mmStatusCRD",mmStatusDEF:"mmStatusDEF",mmStatusSPD:"mmStatusSPD",mmAbilityDEX:"mmAbilityDEX",mmAbilityMGC:"mmAbilityMGC",mmAbilityDUR:"mmAbilityDUR",mmRole:"mmRole"},Ht={RlAttacker:"RlAttacker",RlHealer:"RlHealer",RlDebuffer:"RlDebuffer",RlBuffer:"RlBuffer"},rn=new Map([[fe.None,"なし"],[fe.Front,"前衛"],[fe.Center,"中央"],[fe.Backend,"後衛"]]),cn=new Map([[Se.None,{displayText:"なし",ratio:0}],[Se.High,{displayText:"高Lv",ratio:1}],[Se.Mid,{displayText:"中Lv",ratio:.6}],[Se.Low,{displayText:"低Lv",ratio:.3}]]),Xs=new Map([[Ye.B100,{displayText:"100",ratio:1}],[Ye.B125,{displayText:"125",ratio:1.25}],[Ye.B150,{displayText:"150",ratio:1.5}],[Ye.B200,{displayText:"200",ratio:2}],[Ye.B300,{displayText:"300",ratio:3}]]),ge={GitHub:"GitHub",GitHubLocal:"GitHubLocal",Local:"Local"},An=new Map([[ge.GitHub,"GitHub"],[ge.GitHubLocal,"GitHub(ローカル)"],[ge.Local,"ローカル"]]),Ut={WP1:"WP1",WP2:"WP2",WP3:"WP3"},as=new Map([[Ut.WP1,{displayText:"ねこにん",png:"wallpaper_Copilot_20260622_045726.png"}],[Ut.WP2,{displayText:"ねこ",png:"wallpaper_Gemini_cat.png"}],[Ut.WP3,{displayText:"にんじん",png:"wallpaper_Gemini_carot.png"}]]);class mn{constructor(){this.tblNameCharImages="CharImages",this.tblCharImages={name:this.tblNameCharImages,columns:{ns:{dataType:"string",index:!0},name:{dataType:"string"},fileName:{dataType:"string",index:!0},fileData:{dataType:"object"}}},this.tblNameSettings="Settings",this.tblSettings={name:this.tblNameSettings,columns:{key:{dataType:"string",primaryKey:!0},value:{dataType:"string"}}},this.tblNameActionLog="ActionLog",this.tblActionLog={name:this.tblNameActionLog,columns:{id:{primaryKey:!0,autoIncrement:!0},logType:{dataType:"string"},log:{dataType:"string"}}},this.dbName="EvonaDB",this.db={name:this.dbName,tables:[this.tblCharImages,this.tblSettings,this.tblActionLog]}}async connect(e){console.log("Waiting for JsStore library...");let t=0;for(;typeof window.JsStore>"u";){if(t>50)throw new Error("JsStore library load timeout. Check script tag order.");await new Promise(n=>setTimeout(n,100)),t++}const s=window.JsStore;this.connection=new s.Connection(new Worker(e)),console.log("connection started with library version:",s.VERSION)}async term(){await this.connection.terminate(),console.log("connection terminated")}async initDb(){const e=await this.connection.initDb(this.db);return console.log(e?"Db Created & connection is opened":"Db connection is opened"),e}async dropDb(){let e=!1;return await this.connection.dropDb().then(function(){console.log("Db deleted successfully"),e=!0}).catch(function(){console.error("dropDb error")}),e}async deleteAllRecords(e){return await this.existsTable(e)===!1?(console.log(`[${e}] not exist`),!1):(await this.connection.clear(e),console.log(`[${e}] all record deleted successfully`),!0)}async existsTable(e){try{const t=await this.connection.count({from:e});return!0}catch(t){console.log("[existsTable] JsStore Select Error:",t)}return!1}get defWorkerFile(){return window.EVONA_CONFIG.workerFile}async setup(){return await this.connect(this.defWorkerFile),await this.initDb()}sortByIdAscAsNum(e){e&&e.sort((t,s)=>Number(t.id)-Number(s.id))}}class _s extends mn{async insert(e,t){await this.connection.insert({into:this.tblNameSettings,values:[{key:e,value:t}],upsert:!0})}async insertMultiple(e){const t=e.map(s=>({key:s.key,value:s.value}));return await this.connection.insert({into:this.tblNameSettings,values:t,upsert:!0})}async selectKey(e){try{var t=await this.connection.select({from:this.tblNameSettings,where:{key:e}});return t.length>=1?t[0].value:null}catch(s){console.error("[selectKey] JsStore Select Error:",s)}return null}async countKey(e){try{return await this.connection.count({from:this.tblNameSettings,where:{key:e}})}catch(t){console.error("[countKey] JsStore Select Error:",t)}return-1}async clear(){await this.deleteAllRecords(this.tblNameSettings)}}class Hn{constructor(){this.table=new _s,this.envRecKey="env"}async init(){const e=new _s;await e.setup(),this.table=e}async saveEnv(e){let t="";for(const s of e)s.split("=").length<=1||(t===""?t=s:t+=","+s);return t.length===0?!1:(await this.table.insert(this.envRecKey,`${t}`),!0)}async loadEnv(){const e=new Array,t=await this.table.selectKey(this.envRecKey);if(t!==null){const s=t.split(",");for(const n of s)t.split("=").length<=1||e.push(n)}return e}async saveDialogPos(e){const t=e.parentElement,s=`${t?.className},${t?.style.left},${t?.style.top}`;await this.table.insert(e.className,`${s}`)}async loadDialogPos(e){const t=e.parentElement,s=await this.table.selectKey(e.className);if(s!==null){const n=s.split(",");n.length===3&&t!==null&&n[0]===t.className&&(t.style.left=n[1],t.style.top=n[2])}}async clear(){this.table.clear()}}class ds extends mn{async insert(e,t){await this.connection.insert({into:this.tblNameActionLog,values:[{logType:e,log:t}]})}async insertMultiple(e){const t=e.map(s=>({logType:s.logType,log:s.log}));return await this.connection.insert({into:this.tblNameActionLog,values:t})}async selectType(e){try{var t=await this.connection.select({from:this.tblNameActionLog,where:{logType:e},order:{by:"id",type:"asc"}});return this.sortByIdAscAsNum(t),t.length>=1?t:null}catch(s){console.error("[selectType] JsStore Select Error:",s)}return null}async countType(e){try{return await this.connection.count({from:this.tblNameActionLog,where:{logType:e}})}catch(t){console.error("[countType] JsStore Select Error:",t)}return-1}async clear(){await this.deleteAllRecords(this.tblNameActionLog)}}class Fn{constructor(){this.table=new ds}async init(){const e=new ds;await e.connect(e.defWorkerFile),await e.initDb(),this.table=e}async clear(){this.table.clear()}async put(e,t){return await this.table.insert(e,t)}async get(e){const t=await this.table.selectType(e);if(t===null)return null;const s=new Array;for(const n of t)s.push({id:n.id,log:n.log});return s}}const Re={CharSummaryAction:"CharSummaryAction",ResourceEditAction:"ResourceEditAction",GameEditAction:"GameEditAction",ScoreEditAction:"ScoreEditAction"};let Ft=null;async function zt(){return Ft||(Ft=new Hn,await Ft.init(),console.log("SettingAccess instance created (Singleton)")),Ft}let Rt=null;async function De(){return Rt||(Rt=new Fn,await Rt.init(),console.log("LogAccess instance created (Singleton)")),Rt}function Rn(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,h=>{const e=Math.random()*16|0;return(h==="x"?e:e&3|8).toString(16)})}function Dn(){const h=Date.now().toString(16),e=Rn();return`${h}-${e}`}var W;const Ve={Unknown:"Unknown",KeyDown:"KeyDown",Click:"Click"};class lt{constructor(){this.eventType=Ve.Unknown,this.parentElem=null,this.cancel=!1,this.targetId="",this.classify="",this.selectedValue="",this.Keydown="",this.KeyEnter=Te.None}}const Qe={Unknown:"Unknown",Ok:"Ok",Cancel:"Cancel"};class he{constructor(){this.callerName="",this.result="",this.classify=Qe.Unknown}}class Gt{constructor(){this.parentElem=null,this.left="",this.top="",this.width="",this.height=""}}const mt={Enter:"Enter",Escape:"Escape",Tab:"Tab",Process:"Process"},Te={None:"None",Normal:"Normal",Special:"Special"},R={Unknown:"Unknown",Btn:"Btn",Chk:"Chk",Img:"Img",Label:"Label",LabelRO:"LabelRO",Combo:"Combo",Radio:"Radio",Input:"Input",Plain:"Plain",Table:"Table",LowerTable:"LowerTable"},bt={Single:"Single",Multi:"Multi"};class qt{}qt.toolTipNewLine=`
`;class Pn{constructor(){this.movingPx="20",this.textWidthPx="20",this.textAlign="center"}}class E{static get titleColorText(){return`
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
`.trim()}static get spacingTable(){return"border-collapse: collapse; border-spacing: 0;"}static get spacingTr(){return`background: ${this.normBkColor};`}static sliderText(e,t,s=new Pn){return`
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
`}static get radioBackCssText(){return`
display: flex;           /* 5つの選択肢を綺麗に横一列に整列！ */
gap: 4px;                /* ボタンとボタンの間に心地よい隙間をあける */
background: #2c3e50;   /* 外枠にシブいダークカラーを敷く */
padding: 2px;
border-radius: 4px;
`}static get radioNormCssText(){return`
flex: 1;                /* 5つのボタンの横幅を1ミリの狂いもなく完全均等に分配！ */
text-align: center;
padding: 4px 8px;
background: ${E.offColor};
color: black;
cursor: pointer;
border-radius: 3px;
font-size: 14px;
transition: all 0.9s;
`}static get radioActCssText(){return`
background: ${E.onColor};
color: #000;          /* 文字をクッキリ黒にして視認性MAX！ */
font-weight: bold;
`}get DefaultBlueColor(){return"#86aef7e6"}get DefaultYellowColor(){return"#f7eb86e6"}get DefaultBorderColor(){return"#2c3e50ff"}}E.width="16px";E.offColor="#fff176";E.onColor="#fbc02d";E.normBkColor="#f5ecc6";E.radioBackClassMark="-divs";E.radioActiveKeyText="is-active";class Zt{constructor(){this.imgSrc="",this.imgFile="",this.alt="",this.lazy=!1,this.marker=new Array}}class Nt{constructor(){this.selectedItem="",this.selectionPair=[],this.classify=""}}class Xe{constructor(){this.selectedItem="",this.selectedItems=[],this.selectionPair=[],this.classify="",this.selectType=bt.Single}}class se{constructor(){this.type="text",this.value="",this.placeholder="",this.disableKeyDown=!1,this.enableClicked=!1}}class ps{constructor(){this.type="checkbox",this.value=!1,this.placeholder="",this.enableClicked=""}}class pt{constructor(){this.typeInfo=new pn,this.className=""}ToHTML(){let e="";switch(this.typeInfo.using.itemType){case R.Btn:e=this.typeInfo.ToButtonHTML(this.className);break;case R.Label:e=this.typeInfo.ToLableHTML(this.className);break;case R.LabelRO:e=this.typeInfo.ToLableROHTML(this.className);break;case R.Combo:e=this.typeInfo.ToComboHTML(this.className);break;case R.Radio:e=this.typeInfo.ToRadioHTML(this.className);break;case R.Input:e=this.typeInfo.ToInputHTML(this.className);break;case R.Chk:e=this.typeInfo.ToCheckHTML(this.className);break;case R.Img:const t=this.typeInfo.ToImgHTML(this.className,this.typeInfo.using.img.alt),s=`<div class="overlay" title="${this.typeInfo.toolTip}"></div>`;e=`<div class="cell-${this.className}" item-id="${this.typeInfo.using.itemId}">${t}${s}</div>`;break;case R.Plain:e=this.typeInfo.using.innerHTML;break}return e}copyTo(e){e.className=this.className,e.typeInfo.toolTip=this.typeInfo.toolTip,e.typeInfo.using.itemType=this.typeInfo.using.itemType,e.typeInfo.using.label=this.typeInfo.using.label,e.typeInfo.using.combo=this.typeInfo.using.combo,e.typeInfo.using.radio=this.typeInfo.using.radio,e.typeInfo.using.input=this.typeInfo.using.input,e.typeInfo.using.innerHTML=this.typeInfo.using.innerHTML,e.typeInfo.using.img=this.typeInfo.using.img}}class ke{constructor(){this.items=new Array}makeItems(e=1){this.items.length>0&&this.items.splice(0,this.items.length);for(let t=0;t<e;t++){const s=new pt;this.items.push(s)}}ToHTML(){let e="";for(const t of this.items){const s=t.ToHTML();s!==""&&(this.items.length>=2?e=`${e}<div>${s}</div>`:e=s)}return e}}class Ts{constructor(){this.rowName="",this.cols=new Array}makeCols(e){this.cols.length>0&&this.cols.splice(0,this.cols.length);for(let t=0;t<e;t++){const s=new ke;s.makeItems(),this.cols.push(s)}}ToHTML(){let e="";for(const t of this.cols){let s=t.ToHTML();if(s!==""){let n="",i="",o="";if(t.items.length===1){const l=t.items[0],a=l.typeInfo.using;a.itemType===R.Radio&&(o=` colspan="${a.radio.selectionPair.length}"`,l.className!==""&&(n=` className="${l.className}${E.radioBackClassMark}"`,i=` id="${l.className}${E.radioBackClassMark}"`))}e=`${e}<td${n}${i}${o}>${s}</td>`}t.items.length===1&&t.items[0].typeInfo.using.itemType===R.LowerTable&&(e=`${e}<td></td>`)}return e}toTemplate(){const e=new Ts;e.rowName=this.rowName;for(const t of this.cols){const s=new ke;s.makeItems(t.items.length);let n=-1;for(const i of t.items){n++;const o=s.items[n];o.className=i.className,o.typeInfo.toolTip=i.typeInfo.toolTip,o.typeInfo.using.itemType=i.typeInfo.using.itemType,o.typeInfo.using.label=i.typeInfo.using.label,o.typeInfo.using.combo=i.typeInfo.using.combo,o.typeInfo.using.radio=i.typeInfo.using.radio,o.typeInfo.using.input=i.typeInfo.using.input,o.typeInfo.using.innerHTML=i.typeInfo.using.innerHTML,o.typeInfo.using.img=i.typeInfo.using.img}e.cols.push(s)}return e}}class K{constructor(){this.tableName="",this.rows=new Array,this.template=null,this.invalidRowIndex=-1,this.firstRowIndex=1,this.height="300",this.fontSize="0.9",this.rowIdDelimiter="_",this.clipboardText=""}makeDim(e,t){this.rows.length>0&&this.rows.splice(0,this.rows.length);for(let s=0;s<t;s++){const n=new Ts;n.makeCols(e),this.rows.push(n)}}growCell(e,t=1){const s=this.rows.length;for(let n=0;n<s;n++)this.rows[n].cols[e].makeItems(t)}getCell(e,t,s=0){return this.rows[t].cols[e].items[s]}ToHTML(e="",t){this.tableName=e;let s="",n=0;for(const a of this.rows){n++;let r="";if(r=a.ToHTML(),r!==""){const c=a.rowName!==""?` class="${a.rowName}"`:"";s=`${s}<tr ${c} item-id="${n}">${r}</tr>`}}const i=e!==""?` class="${e}"`:"",o=t!==""?` id="${t}"`:"",l=t!==""?` item-id="${t}"`:"";return s=`<table${i}${o}${l}>${s}</table>`,s}ToScrollHTML(e="",t){const s=e!==""?` class="${e}"`:"",n=t!==""?` item-id="${t}"`:"";return`<div${s}${n}>
${this.ToHTML(e,t)}
</div>`}makeRowTemplate(e){if(this.rows.length>=1){for(const t of this.rows)t.rowName=e;this.template=this.rows[0].toTemplate()}}clearRows(){this.rows=new Array}addRow(e){const t=this.getTable();if(t===null)return-1;const s=t.insertRow(-1),n=t.rows.length;if(s.className=e,s.setAttribute("item-id",`${n}`),this.template!==null&&this.template.cols.length>=1){const i=this.template.toTemplate();let o="";for(const l of i.cols){let a="";for(const r of l.items){r.typeInfo.using.itemId=n;const c=r.ToHTML();c!==""&&(l.items.length>=2?a=`${a}<div>${c}</div>`:a=c)}a!==""&&(o=`${o}<td>${a}</td>`)}return s.innerHTML=o,n}return-1}deleteRow(e){const t=this.getTable();if(t===null)return!1;for(const s of t.rows){const n=s.getAttribute("item-id");if(n!==null&&n===`${e}`)return t.deleteRow(e-this.firstRowIndex),!0}return!1}redimAllRows(){const e=this.getTable();if(e===null)return;let t=this.firstRowIndex-1;for(const s of e.rows)if(s.getAttribute("item-id")!==null){t++,s.setAttribute("item-id",`${t}`);for(const i of s.cells)this.redimElems(i.children,t)}}redimElems(e,t){for(const s of e)s.getAttribute("item-id")!==null&&s.setAttribute("item-id",`${t}`),s.children!==void 0&&this.redimElems(s.children,t)}selectRow(e){const t=this.getTable();if(t!==null&&!(e<=0)&&!(e>t.rows.length)){for(const s of t.rows)s.classList!==void 0&&s.classList.remove("selected");t.rows[e-1].classList.add("selected")}}getSelectedRow(){const e=this.getTable();if(e===null)return this.invalidRowIndex;for(const t of e.rows)if(t.classList!==void 0&&t.classList.contains("selected")){const s=t.getAttribute("item-id");return s!==null?parseInt(s):this.invalidRowIndex}return this.invalidRowIndex}updateRowImage(e,t){const n=this.getTable()?.querySelector(`tr[item-id="${e}"] img`);n instanceof HTMLImageElement&&(n.src=t)}updateRowImageToolTip(e,t){const n=this.getTable()?.querySelector(`tr[item-id="${e}"] img`);n instanceof HTMLImageElement&&(n.title=t)}updateText(e,t){if(e.children!==null){const s=e.children[0];s.textContent=t}}scroll(e){const t=this.getTable();if(t===null||e<=0||e>t.rows.length)return null;const s=t.querySelector(`tr[item-id="${e}"] img`);return s===null||s===void 0?null:(s.scrollIntoView({behavior:"smooth",block:"center"}),s)}getRowElems(){const e=this.getTable();return e===null?null:e.rows}findInputElem(e){if(e===null)return null;if(e.tagName!=="INPUT"){for(const s of e.children){const n=this.findInputElem(s);if(n!==null&&n.tagName==="INPUT")return n}return null}return e}getElemValue(e){if(e instanceof HTMLInputElement)return e.value;if(e instanceof HTMLSelectElement)return e.value;{const t=this.findInputElem(e);if(t!==null)return t.type==="checkbox"?t.checked:t.value}return null}setElemValue(e,t){if(e instanceof HTMLInputElement){const s=e,n=s.value;return s.value=t,n}else if(e instanceof HTMLSelectElement){const s=e,n=s.value;return s.value=t,n}else{const s=this.findInputElem(e);if(s!==null){if(s.type==="checkbox"){const i=s.checked;return s.checked=`${t}`.toLowerCase()==="true",i}const n=s.value;return s.value=t,n}}return null}getRowElem(e){const t=this.getTable();if(t===null)return null;for(const s of t.rows){const n=s.getAttribute("item-id");if(n!==null&&n===`${e}`)return console.log(`match row id : ${n}`),t.rows[e-this.firstRowIndex]}return null}getCellElems(e){if(e===null)return null;const t=new Array;for(const s of e.cells){if(s===null)continue;const n=new Array;for(const i of s.children)n.push(i);t.push(n)}return t}setVisible(e){const t=this.getTable();return t===null?null:(t.hidden=!e,t.parentElement.hidden=!e,!0)}getCellRect(e){const t=new A,s=t.GetRect(e.parentElement),n=t.GetRect(e),i=new Gt;return i.left=`${n.left}`,i.top=`${s.top}`,i.width=`${n.width}`,i.height=`${n.height}`,i}getTableOwnerRect(e){const t=new A,s=t.GetRect(e.parentElement.parentElement.parentElement.parentElement.parentElement);console.log(`[OWNER] ${s.left}, ${s.top}`);const n=t.GetRect(e.parentElement.parentElement.parentElement);console.log(`[TABLE] ${n.left}, ${n.top}`);const i=t.GetRect(e.parentElement.parentElement);console.log(`[TBODY] ${i.left}, ${i.top}`);const o=t.GetRect(e.parentElement);console.log(`[TROW] ${o.left}, ${o.top}`);const l=new Gt;return l.left=`${n.left}`,l.top=`${s.top}`,l.width="0",l.height="0",l}makeCallerName(e,t){return`${e}${this.rowIdDelimiter}${t}`}getCallerCellElem(e){const t=e.split(this.rowIdDelimiter);if(t===void 0||t.length!==2)return null;const s=this.getRowElem(parseInt(t[1]));if(s===null)return null;const n=this.getCellElems(s);if(n===null)return null;for(const i of n)for(const o of i)if(o.className===t[0])return o;return null}async toClipboard(){const e=this.getTable();if(e===null)return!1;let t="";for(const n of e.rows){let i="";const o=this.getCellElems(n);if(o===null)return!1;for(const l of o){let a="";for(const r of l){const c=this.getElemValue(r);let m=c===null?"&null&":`&${c}&`;a.length!==0?a=`${a}	${m}`:a=m}i.length!==0?i=`${i}	${a}`:i=`${a}`}t.length!==0?t=`${t}
${i}`:t=`${i}`}const s=`table:{${t}}`;try{await navigator.clipboard.writeText(s)}catch(n){return console.error("コピー失敗...",n),!1}return!0}async fromClipboard(){const e=this.getTable();if(e===null)return!1;let t="";try{t=await navigator.clipboard.readText()}catch(o){return console.error("ペースト失敗...",o),!1}this.clipboardText=t;const s="table:{";if(t.length<s.length+1||t.startsWith(s)===!1||t.endsWith("}")===!1)return!1;t=t.substring(s.length),t=t.substring(0,t.length-1);const n=t.split(`
`);let i=0;for(const o of e.rows){const a=n[i].split("	"),r=this.getCellElems(o);if(r===null)return!1;if(a.length!==r.length)return console.log(`different column size : line ${i+1}`),!1;i++}i=0;for(const o of e.rows){const a=n[i].split("	"),r=this.getCellElems(o);if(r===null)return!1;let c=0;for(const m of r){let f=a[c];if(f.endsWith("\r")===!0&&(f=f.substring(0,f.length-1)),f.startsWith("&")!==!1&&f.endsWith("&")!==!1&&(f=f.substring(1,f.length-1),f!=="null")){for(const u of m){this.setElemValue(u,f);break}c++}}i++}return!0}getTable(){const e=`.${this.tableName}`,t=document.querySelectorAll(e);if(t===null||t.length<=0)return null;const n=t[0].querySelectorAll(e);return n===null||n.length<=0?null:n[0]}getParentElem(){const e=`.${this.tableName}`,t=document.querySelectorAll(e);return t===null||t.length<=0?null:t[0]}getScrollCellRect(e){new A;const t=this.getCellRect(e),s=this.getTableOwnerRect(e),n=this.getParentElem(),i=n!==null?n.scrollLeft:0,o=new Gt;return o.left=`${parseInt(t.left)-parseInt(s.left)+10-i}`,o.top=`${parseInt(t.top)-parseInt(s.top)+10}`,o.width=`${t.width}`,o.height=`${t.height}`,o}setFontConfig(e="0.9"){this.fontSize=`font-size: ${e}em;`}getItemCssText(){return`
${E.spanCssText(this.fontSize,!0)}
width: 100%;            /* 幅を固定するとGridらしくなります */
`}getKvpCssText(e,t,s){return`
/* テーブル */
${E.getTableCssText(e,this.height)}
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
${E.scrollBarText}
}
`.trim()}}class On{constructor(){this.htmlMaker=new A,this.table=new K,this.gridElem=null,this.headerElem=null,this.footerElem=null}makeKeyCell(e,t,s){const n=new pt;return n.typeInfo.setLabel(e,!1),n.className=t,n.typeInfo.toolTip=s,n}makePair(){return new Map}setPair(e){if(e.size===0)return!1;this.table.makeDim(2,e.size),e.forEach((s,n)=>{this.table.growCell(1,s.items.length)});let t=-1;return e.forEach((s,n)=>{t++,this.table.getCell(0,t).typeInfo.setLabel(n.typeInfo.using.label,!1),this.table.getCell(0,t).className=n.className;let i=-1;for(const o of s.items)i++,this.table.getCell(1,t,i).typeInfo=o.typeInfo,this.table.getCell(1,t,i).className=o.className}),!0}setListener(e,t,s,n="",i=""){this.dispose(),this.table.makeRowTemplate(t);const o=document.getElementById(s);if(o===null)return console.log(`[setListener] cannot found ${s}`),!1;const l=this.table.ToScrollHTML(e,e),a=new ne;a.props.name="",a.props.id=e,a.props.className=e,a.props.option.setTable(l),a.props.option.onSelect=async m=>{console.log(`classify = ${m.classify} targetId = ${m.targetId}`),this.onSelect!==void 0&&await this.onSelect(m)},this.htmlMaker=new A,this.htmlMaker.add(a);const r=this.htmlMaker.ToHTML();let c=document.createElement("div");return c.className=e,c.innerHTML=r,this.gridElem=c.children[0],n!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=n,this.headerElem.id=n,o.appendChild(this.headerElem)),o.appendChild(this.gridElem),c.remove(),c=null,i!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=i,this.footerElem.id=i,o.appendChild(this.footerElem)),!0}getSelectedRow(){return this.table.getSelectedRow()}enableEvents(e){return this.gridElem===null?!1:(this.htmlMaker.enableTableEvents(this.gridElem.className),this.onSelect=e,!0)}disableEvents(){return this.gridElem===null?!1:(this.htmlMaker.disableTableEvents(this.gridElem.className),!0)}setVisible(e){return this.gridElem===null?!1:(this.gridElem.hidden=!e,!0)}dispose(){this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.gridElem!==null&&(this.gridElem.parentElement?.removeChild(this.gridElem),this.gridElem.remove()),this.disableEvents(),this.headerElem=null,this.footerElem=null,this.gridElem=null}getCssText(e,t,s){return this.table.getKvpCssText(e,t,s)}}class ze{constructor(){this.ctlName="",this.styleId="",this.ovElem=null,this.ctlElem=null}firstAction(e,t){const s=document.getElementById(t);return s===null?(console.log(`[firstAction] cannot found ${t}`),null):(this.createOverlay(s),this.ctlName=e,s)}createOverlay(e){const t=document.createElement("div");t.id=`${this.ovCssName()}`,t.style.position="absolute",t.style.inset="0",t.style.zIndex=this.zIndexOv(),t.style.background="transparent",t.style.background="rgba(0,0,0,0.1)",e.appendChild(t),this.ovElem=t}enableOverlay(e=!0){this.ovElem!==null&&(this.ovElem.style.display=e?"":"none")}get isEnableOverlay(){return this.ovElem.style.display!=="none"}resultTable(e){const t=`.${this.ctlName}`,s=document.querySelectorAll(t);if(s===null||s.length<=0)return null;const n=s[0],i=`.${e}`,o=n.querySelectorAll(i);return o===null||o.length<=0?null:o[0]}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.style.display=e?"":"none",!0)}getVisible(){return this.ctlElem===null?!1:this.ctlElem.style.display!=="none"}getBaseElem(){return this.ovElem!==null?this.ovElem.parentElement:null}getOuterCssText(){return`
.${this.ctlName} {
  position: absolute;
  inset: auto;

  padding: 0;       /* 内側の余白をゼロに */
  border: none;     /* 枠線を消す（枠線があると1px〜ズレます） */
  overflow: hidden; /* 中身がはみ出さないように（任意） */

  ${E.borderShadowText}

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
        `.trim()}appendStyle(e){const t=document.createElement("style");return t.id=e,document.head.appendChild(t),this.styleId=e,t}dispose(){const e=document.getElementById(this.styleId);e!==null&&e.remove(),this.ovElem!==null&&(this.ovElem.parentElement?.removeChild(this.ovElem),this.ovElem.remove())}ovCssName(){return`${this.ctlName}-barrier`}zIndexCtl(){return"1000"}zIndexOv(){return"999"}}const Dt={ByText:"ByText",ByValue:"ByValue",Both:"Both"};class Un extends ze{constructor(){super(...arguments),this.initValue="",this.selectedIndex=-1,this.delimiter="/",this.callerName="",this.htmlMaker=new A,this.table=new K,this.onUpAction=async()=>{this.keyValuePairs!==void 0&&(this.selectedIndex=this.selectedIndex<=0?this.keyValuePairs.length-1:this.selectedIndex-1,this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]))},this.onDnAction=async()=>{this.keyValuePairs!==void 0&&(this.selectedIndex=this.selectedIndex>=this.keyValuePairs.length-1?0:this.selectedIndex+1,this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]))}}setListener(e,t,s){this.dispose(),this.callerName=s,this.ctlName=e;const n=new K;n.makeDim(1,3);let i=0;n.getCell(0,i).typeInfo.setButton("▲"),n.getCell(0,i).className=this.upCssName(),n.getCell(0,i).typeInfo.using.itemId=i,i++,n.getCell(0,i).typeInfo.setButton(""),n.getCell(0,i).className=this.valCssName(),n.getCell(0,i).typeInfo.using.itemId=i,i++,n.getCell(0,i).typeInfo.setButton("▼"),n.getCell(0,i).className=this.dwCssName(),n.getCell(0,i).typeInfo.using.itemId=i;const o=this.firstAction(e,t);if(o===null)return!1;const l=n.ToScrollHTML(e,e),a=new ne;a.props.name="",a.props.id=this.tblCssName(),a.props.className=this.tblCssName(),a.props.option.setTable(l),a.props.option.onSelect=async u=>{switch(u.classify){case this.valCssName():if(this.onApply!==void 0){const g=new he;g.callerName=this.callerName,g.result=this.keyValuePairs[this.selectedIndex],await this.onApply(g)}break;case this.upCssName():if(this.onUp!==void 0){const g=new he;g.callerName=this.callerName,g.result=this.keyValuePairs[this.selectedIndex],await this.onUp(g),u.cancel||this.onUpAction()}break;case this.dwCssName():if(this.onDown!==void 0){const g=new he;g.callerName=this.callerName,g.result=this.keyValuePairs[this.selectedIndex],await this.onDown(g),u.cancel||this.onDnAction()}break}},this.htmlMaker=new A,this.htmlMaker.add(a);const r=this.htmlMaker.ToHTML();let c=document.createElement("dialog");c.className=e,c.innerHTML=r,this.ctlElem=c;let m=c.children[0],f=m.children[0];return f.className=`${this.tblCssName()}`,f.id=`${this.tblCssName()}`,this.ctlElem.appendChild(f),m.remove(),m=null,o.appendChild(this.ctlElem),this.table=n,!0}setSelectedByValue(e,t,s=Dt.Both){const n=new Array;switch(s){case Dt.ByText:n.push(0);break;case Dt.ByValue:n.push(1);break;case Dt.Both:n.push(0),n.push(1);break;default:return!1}this.initValue=e,this.keyValuePairs=t,this.selectedIndex=-1;const i=e.split(this.delimiter);let o=i.length>=2?i[1]:e,l="";for(const a of n){let r=-1;for(const c of t)if(r++,c!==null&&c!==""){const m=c.split(this.delimiter);if(m.length>=2&&m[a]===o){this.selectedIndex=r,l=m[0];break}}if(this.selectedIndex!==-1)break}if(this.selectedIndex===-1){const r=t[0].split(this.delimiter);this.selectedIndex=0,l=r[0]}return this.updateValueElemByText(l),this.selectedIndex!==-1}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-updn-style`;if(document.getElementById(e))return;const t=this.appendStyle(e);t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim()}enableEvents(e,t,s){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onApply=e,this.onUp=t,this.onDown=s,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}updateValueElemByKeyValue(e){if(this.ctlElem===null)return;let t="";const s=e.split(this.delimiter);s.length>=2&&(t=s[0]),this.updateValueElemByText(t)}updateValueElemByText(e){if(this.ctlElem===null)return;const t=this.ctlElem.querySelectorAll(`.${this.valCssName()}`);t!==null&&(t[0].textContent=e)}tblCssName(){return`${this.ctlName}-tbl`}upCssName(){return`${this.ctlName}-upBtn`}dwCssName(){return`${this.ctlName}-dwBtn`}valCssName(){return`${this.ctlName}-values`}}class ye{constructor(){this.key="",this.text=""}}class hn extends ze{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new A,this.table=new K}setChoiceItems(e){this.items=e}setListener(e,t,s){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const n=this.items.length,i=new K;i.makeDim(1,n);let o=0;for(const g of this.items)i.getCell(0,o).typeInfo.setButton(`${g.text}`),i.getCell(0,o).className=`${e}-${g.key}`,i.getCell(0,o).typeInfo.using.itemId=o,o++;const l=this.firstAction(e,t);if(l===null)return!1;const a=i.ToScrollHTML(e,e),r=new ne;r.props.name="",r.props.id=this.tblCssName(),r.props.className=this.tblCssName(),r.props.option.setTable(a),r.props.option.onSelect=async g=>{if(console.log(`classify = ${g.classify} targetId = ${g.targetId}`),this.onSelect!==void 0){const p=parseInt(g.targetId),d=new he;d.callerName=this.callerName,d.result=0<=p&&p<this.items.length?this.items[p].key:"",await this.onSelect(d)}},this.htmlMaker=new A,this.htmlMaker.add(r);const c=this.htmlMaker.ToHTML();let m=document.createElement("dialog");m.className=e,m.innerHTML=c,this.ctlElem=m;let f=m.children[0],u=f.children[0];return u.className=`${this.tblCssName()}`,u.id=`${this.tblCssName()}`,this.ctlElem.appendChild(u),f.remove(),f=null,l.appendChild(this.ctlElem),this.table=i,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-choice-style`;if(document.getElementById(e))return;const t=this.appendStyle(e);t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
}
.${this.tblCssName()} button {
width: 100%;
white-space: nowrap;
background: ${E.normBkColor};
border-radius: 8px;
cursor: pointer;
}
.${this.tblCssName()} button:hover {
background: ${E.onColor};
}
        `.trim()}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}tblCssName(){return`${this.ctlName}-tbl`}}class Qs{constructor(){this.key="",this.text=""}}class Gn extends ze{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new A,this.table=new K,this.headerElem=null,this.footerElem=null,this.width=0,this.height=0}setGridtems(e){this.items=e}setListener(e,t,s,n="",i=""){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const o=this.items.length,l=new K;l.makeDim(2,o);let a=0;for(const N of this.items)l.getCell(0,a).typeInfo.setLabel(`${N.text}`,!1),l.getCell(0,a).className=this.keyCssName(),l.getCell(0,a).typeInfo.using.itemId=a,l.getCell(1,a).typeInfo=N.value.items[0].typeInfo,l.getCell(1,a).className=this.valueCssName(),l.getCell(1,a).typeInfo.using.itemId=a,a++;const r=this.firstAction(e,t);if(r===null)return!1;const c=l.ToScrollHTML(e,this.tblCssName()),m=new ne;m.props.name="",m.props.id=this.tblCssName(),m.props.className=this.tblCssName(),m.props.option.setTable(c),m.props.option.onSelect=async N=>{if(this.onSelect!==void 0){const x=new he;x.callerName=N.classify,x.result=N.selectedValue,await this.onSelect(x)}},this.htmlMaker=new A,this.htmlMaker.add(m);const f=this.htmlMaker.ToHTML();let u=document.createElement("dialog");u.className=e,u.innerHTML=f,this.ctlElem=u;let g=u.children[0];const p=this.divCssName();g.className=p,g.id=p;let d=g.children[0];return d.className=`${this.tblCssName()}`,d.id=`${this.tblCssName()}`,n!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=n,this.headerElem.id=n,u.appendChild(this.headerElem)),r.appendChild(this.ctlElem),i!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=i,this.footerElem.id=i,u.appendChild(this.footerElem)),this.table=l,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}setFontConfig(e="0.9"){this.table.setFontConfig(e)}setSize(e="200",t="300"){let s=0;if(this.footerElem!==null){const n=this.htmlMaker.GetRect(this.footerElem);s=Number(n.height)}this.table.height=`${Number(t)-s}`,this.height=Number(t)+E.footerPadding,this.width=Number(e)}applyCss(){const e=`${this.getBaseElem().className}-flgrd-style`;if(document.getElementById(e))return;const t=this.appendStyle(e);t.textContent=`
${this.getOuterCssText()}
${this.table.getKvpCssText(this.divCssName(),this.keyCssName(),this.valueCssName())}
.${this.ctlName} {
width: ${this.width}px;
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim()}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}dispose(){super.dispose(),this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}divCssName(){return`${this.ctlName}-div`}tblCssName(){return`${this.ctlName}-tbl`}keyCssName(){return`${this.ctlName}-key`}valueCssName(){return`${this.ctlName}-value`}}const me={Text:"Text",KeyValue:"KeyValue"},_e={asText:"asText",asNumber:"asNumber"};class Vn extends ze{constructor(){super(...arguments),this.pairDelimiter=",",this.itemDelimiter="/",this.keyToolTip="キー",this.valueToolTip="テキスト",this.editType=me.KeyValue,this.valueType=_e.asText,this.digLen=5,this.callerName="",this.htmlMaker=new A,this.table=new K,this.headerElem=null,this.footerElem=null,this.numpad=null}setKeyValuePairs(e,t=8){const s=e.split(this.pairDelimiter);if(s.length===0)return;const n=new Array;for(const o of s){const l=o.split(this.itemDelimiter);if(l.length<=1)continue;const a=new ye;a.key=l[0],a.text=l[1],n.push(a)}const i=t-n.length;if(i>0)for(let o=0;o<i;o++){const l=new ye;l.key=`key${n.length+1}`,l.text="",n.push(l)}this.editType=me.KeyValue,this.items=n}setTexts(e,t=8){const s=e.split(this.pairDelimiter);if(s.length===0)return;const n=new Array;for(const o of s){const l=new ye;l.text=o,n.push(l)}const i=t-n.length;if(i>0)for(let o=0;o<i;o++){const l=new ye;l.key=`key${n.length+o}`,l.text="",n.push(l)}this.editType=me.Text,this.items=n}setValueType(e,t=_e.asNumber){this.digLen=e,this.valueType=t}setListener(e,t,s,n,i){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const o=this.items.length,l=new K,a=this.editType===me.KeyValue?2:1;l.makeDim(a,o);let r=this.valueType===_e.asNumber,c=0;for(const x of this.items){let M=0,L="",y="";this.editType===me.KeyValue?(L=x.key,y=this.keyToolTip):(L=x.text,y=this.valueToolTip);const I=new se;if(I.value=L,I.placeholder=y,this.editType!==me.KeyValue&&(I.disableKeyDown=r,I.enableClicked=r),l.getCell(M,c).typeInfo.setInput(I),l.getCell(M,c).className=`${e}-key-${c+1}`,l.getCell(M,c).typeInfo.using.itemId=c+l.firstRowIndex,l.getCell(M,c).typeInfo.toolTip=y,this.editType===me.KeyValue){M++;const b=new se;b.value=x.text,b.placeholder=this.valueToolTip,b.disableKeyDown=r,b.enableClicked=r,l.getCell(M,c).typeInfo.setInput(b),l.getCell(M,c).className=`${e}-text-${c+1}`,l.getCell(M,c).typeInfo.using.itemId=c+l.firstRowIndex,l.getCell(M,c).typeInfo.toolTip=this.valueToolTip}c++}const m=this.firstAction(e,t);if(m===null)return!1;const f=l.ToScrollHTML(e,e),u=new ne;u.props.name="",u.props.id=this.tblCssName(),u.props.className=this.tblCssName(),u.props.option.setTable(f),u.props.option.onSelect=async x=>{console.log(`[HtmlMakerInputEdit] classify = ${x.classify} targetId = ${x.targetId}`),this.onSelect!==void 0&&this.showNumpad(x,this.digLen)},this.htmlMaker=new A,this.htmlMaker.add(u);const g=this.htmlMaker.ToHTML();let p=document.createElement("dialog");p.className=e,p.innerHTML=g,this.ctlElem=p;let d=p.children[0],N=d.children[0];return N.className=`${this.tblCssName()}`,N.id=`${this.tblCssName()}`,this.ctlElem.appendChild(N),d.remove(),d=null,n!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=n,this.headerElem.id=n,p.appendChild(this.headerElem)),m.appendChild(this.ctlElem),i!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=i,this.footerElem.id=i,p.appendChild(this.footerElem)),this.table=l,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-inputedit-style`;if(document.getElementById(e))return;const t=this.appendStyle(e);t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
  height: 180px;
overflow-y: auto;
${E.scrollBarText}
}
[class^="${this.ctlName}-key-"] {
height: 25px;
}
[class^="${this.ctlName}-text-"] {
height: 25px;
}
        `.trim()}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}dispose(){super.dispose(),this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}editedResult(){const e=this.resultTable(this.tblCssName());if(e===null)return;let t="";for(const s of e.rows)if(s!==null)if(this.editType===me.KeyValue){const n=s.cells[0],i=s.cells[1];if(n===null||i===null)continue;const o=this.table.getElemValue(n)||"",l=this.table.getElemValue(i)||"";t===""?t=o+this.itemDelimiter+l:t+=this.pairDelimiter+o+this.itemDelimiter+l}else{const n=s.cells[0];if(n===null)continue;const i=this.table.getElemValue(n)||"";t===""?t=`${i}`:t+=this.pairDelimiter+i}return t}showNumpad(e,t){if(e.KeyEnter===Te.Special||e.eventType===Ve.Click){if(this.numpad!==null)return;const n=this.table.getCellRect(e.parentElem),i=e.classify,o=document.getElementsByClassName(e.classify);let l="";o.length>=1&&(l=o[0].value);let a="";this.editType===me.KeyValue?a=`${parseInt(n.width)+parseInt(n.width)/2}`:a=`${parseInt(n.width)/2}`,console.log("[showNumpad] posLeft",a);const r=`${this.ctlName}-numpad`,c=new un;c.setNum(l),c.maxDig=t,c.setListener(r,this.resultTable(this.tblCssName()).className,i),c.applyCss(),c.show(a,"4"),c.enableEvents(m=>{console.log(`[onApply] ${m.callerName} ${m.result}`);const f=document.getElementsByClassName(e.classify);if(f!==null){const u=f[0];u.value=m.result}this.closeNumpad()}),this.numpad=c}}closeNumpad(){this.numpad!==null&&(this.numpad.dispose(),this.numpad=null)}tblCssName(){return`${this.ctlName}-tbl`}}class un extends ze{constructor(){super(...arguments),this.num="0",this.edit="0",this.maxDig=7,this.errText="NaN",this.callerName="",this.prevPad="",this.htmlMaker=new A,this.table=new K}setNum(e){if(e.length===0)this.num="0",this.edit="";else if(e.length<=this.maxDig&&e.length!==0){let t=!1;for(let s=0;s<e.length;s++){const n=e.charAt(s);if(/[0-9]/.test(n)===!1){t=!0;break}}t?(this.num=this.errText,this.edit=this.errText):(this.num=e,this.edit=e)}}setListener(e,t,s){if(this.num===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const n=new K;n.makeDim(1,1);const i=new K;i.makeDim(2,1);const o=new K;o.makeDim(3,3);const l=new K;l.makeDim(2,1),n.getCell(0,0).typeInfo.setLabel(`${this.num}`,!1),n.getCell(0,0).className=this.resultCssName(),n.getCell(0,0).typeInfo.using.itemId=0,i.getCell(0,0).typeInfo.setButton("AC"),i.getCell(0,0).className=this.acCssName(),i.getCell(0,0).typeInfo.using.itemId=0,i.getCell(1,0).typeInfo.setButton("ESC"),i.getCell(1,0).className=this.escCssName(),i.getCell(1,0).typeInfo.using.itemId=1,i.getCell(1,0).typeInfo.toolTip=`1回タップ：元の値に戻す
2回タップ：入力キャンセル`;let a=0;for(const f of[7,8,9,4,5,6,1,2,3]){const u=a%3,g=Math.floor(a/3);o.getCell(u,g).typeInfo.setButton(`${f}`),o.getCell(u,g).className=`${e}-pad-${f}`,o.getCell(u,g).typeInfo.using.itemId=a,a++}l.getCell(0,0).typeInfo.setButton("0"),l.getCell(0,0).className=`${e}-pad-0`,l.getCell(0,0).typeInfo.using.itemId=0,l.getCell(1,0).typeInfo.setButton("ENTR"),l.getCell(1,0).className=this.entrCssName(),l.getCell(1,0).typeInfo.using.itemId=1,l.getCell(1,0).typeInfo.toolTip="入力確定";const r=this.firstAction(e,t);if(r===null)return console.log(`[setListener] cannot found ${t}`),!1;const c=new Map;c.set("pad1",n.ToScrollHTML(e,e)),c.set("pad2",i.ToScrollHTML(e,e)),c.set("pad3",o.ToScrollHTML(e,e)),c.set("pad4",l.ToScrollHTML(e,e));let m=document.createElement("dialog");m.className=e,this.ctlElem=m;for(const[f,u]of c){const g=this.tblCssName(f),p=new ne;p.props.name="",p.props.id=g,p.props.className=g,p.props.option.setTable(u),p.props.option.onSelect=async y=>{if(console.log(`classify = ${y.classify} targetId = ${y.targetId}`),this.onSelect!==void 0){const I=this.resultCell();if(I===null)return;const b=I.textContent;switch(y.classify){case this.acCssName():I.textContent="0",this.prevPad=this.acCssName();break;case this.escCssName():if(I.textContent=this.edit!==""?this.edit:"0",this.prevPad===this.escCssName()){const ce=new he;ce.callerName=this.callerName,ce.result=this.edit,await this.onSelect(ce)}this.prevPad=this.escCssName();break;case this.entrCssName():this.num=I.textContent;const w=new he;w.callerName=this.callerName,w.result=this.num,await this.onSelect(w);break;case"":break;default:if(this.maxDig===1){const ce=y.classify.charAt(y.classify.length-1);I.textContent=ce,this.prevPad=ce}if(b.length>=this.maxDig)return;const T=y.classify.charAt(y.classify.length-1),Y=b==="0"||b===this.edit;I.textContent=Y?T:I.textContent+T,this.prevPad=T;break}}};const d=new A;d.add(p);const N=d.ToHTML(),x=d.ToElem(N);this.htmlMaker.add(p);let M=x,L=M.children[0];L.className=g,L.id=g,this.ctlElem.appendChild(L),M.remove(),M=null}return r.appendChild(this.ctlElem),this.table=n,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-numpad-style`;if(document.getElementById(e))return;const t=this.appendStyle(e);t.textContent=`
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
        `.trim()}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}resultCell(){const e=this.resultTable(this.tblCssName("pad1"));return e===null?null:e.rows[0].cells[0]}tblCssName(e){return`${this.ctlName}-tbl-${e}`}resultCssName(){return`${this.ctlName}-result`}acCssName(){return`${this.ctlName}-ac`}escCssName(){return`${this.ctlName}-esc`}entrCssName(){return`${this.ctlName}-entr`}}class Zs{constructor(){this.value=new ke}}class zn extends ze{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new A,this.table=new K}setGuidetems(e){this.items=e}setListener(e,t,s){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const n=this.items.size,i=new K;i.makeDim(n,1),this.indexList=new Map;let o=0;for(const[d,N]of this.items)i.getCell(o,0).typeInfo=N.value.items[0].typeInfo,i.getCell(o,0).className=N.value.items[0].className,i.getCell(o,0).typeInfo.using.itemId=o,this.indexList.set(d,o),o++;const l=this.firstAction(e,t);if(l===null)return!1;const a=i.ToScrollHTML(e,this.tblCssName()),r=new ne;r.props.name="",r.props.id=this.tblCssName(),r.props.className=this.tblCssName(),r.props.option.setTable(a),r.props.option.onSelect=async d=>{if(this.onSelect!==void 0){const N=new he;N.callerName=d.classify,N.result=d.selectedValue,await this.onSelect(N)}},this.htmlMaker=new A,this.htmlMaker.add(r);const c=this.htmlMaker.ToHTML();let m=document.createElement("dialog");m.className=e,m.innerHTML=c,this.ctlElem=m;let f=m.children[0];const u=this.divCssName();f.className=u,f.id=u;let g=f.children[0];g.className=`${this.tblCssName()}`,g.id=`${this.tblCssName()}`,l.appendChild(this.ctlElem),this.table=i,this.table.height="36",this.table.fontSize="0.6";const p=this.resultTable(this.tblCssName());if(this.cells=new Array,p!==null){const d=p.rows[0];if(d!==null){const N=this.table.getCellElems(d);if(N!==null)for(const x of N)for(const M of x)this.cells.push(M)}}return!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}setFontConfig(e="0.9"){this.table.setFontConfig(e)}applyCss(){const e=`${this.getBaseElem().className}-guidebar-style`;if(document.getElementById(e))return;let t="";for(const n of this.cells){const i=n.className;i!==""&&(t+=`
.${i} {
${this.table.getItemCssText()}
}
`)}const s=this.appendStyle(e);s.textContent=`
${this.getOuterCssText()}
${E.getTableCssText(this.divCssName(),this.table.height)}
.${this.ctlName} {
width: 360px;
}
${t}
        `.trim()}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setTextByIndex(e,t){return this.cells===void 0?!1:0<=e&&e<this.cells.length?(this.cells[e].textContent=t,!0):!1}setTextByKey(e,t){if(this.cells===void 0||this.indexList===void 0||this.indexList.has(e)===!1)return!1;const s=this.indexList.get(e);return s===void 0?!1:(this.cells[s].textContent=t,!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}divCssName(){return`${this.ctlName}-div`}tblCssName(){return`${this.ctlName}-tbl`}}class en{constructor(){this.tblCssName=""}}class dn{constructor(){this.headerElem=null,this.subTblElem=null}}const tn={OkCancel:"OkCancel"};class ft extends ze{constructor(){super(...arguments),this.items=new Array,this.firstRowIndex=1,this.callerName="",this.htmlMaker=new A,this.table=new K,this.headerName="",this.footerName="",this.headerElem=null,this.footerElem=null,this.onOkClickFooter=async e=>{if(this.onSelect!==void 0){const t=new he;t.callerName=this.callerName,t.result="",t.classify=Qe.Ok,t.notify=this,await this.onSelect(t)}},this.onCancelClickFooter=async e=>{if(this.onSelect!==void 0){const t=new he;t.callerName=this.callerName,t.result="",t.classify=Qe.Cancel,t.notify=this,await this.onSelect(t)}},this.height=0}makeSubTable(e){const t=e.tblCssName,s=e.table.ToHTML(t,t),n=new ne;n.props.name="",n.props.id=t,n.props.className=t,n.props.option.setTable(s),n.props.option.onSelect=async a=>{if(this.onSelect!==void 0){const r=new he;if(r.callerName=a.classify,r.result=a.selectedValue,await this.onSelect(r),a.cancel)return}for(const r of this.items){if(a.classify.includes(r.headerItem.tblCssName)){r.headerItem.onSelect!==void 0&&r.headerItem.onSelect(a);break}if(a.classify.includes(r.subTblItem.tblCssName)){r.subTblItem.onSelect!==void 0&&r.subTblItem.onSelect(a);break}}};const i=e.htmlMaker;i.add(n);const o=i.ToHTML(),l=i.ToElem(o);return e.htmlMaker=i,l}addGroupPair(e,t){const s=new dn;e.htmlMaker===void 0&&(e.htmlMaker=new A),t.htmlMaker===void 0&&(t.htmlMaker=new A);const n=this.makeSubTable(e),i=this.makeSubTable(t);s.headerElem=n,s.subTblElem=i,s.headerItem=e,s.subTblItem=t,this.items.push(s)}makeHeader(){this.headerName="-header",this.headerElem=document.createElement("div")}makeFooter(e=tn.OkCancel){this.footerName=`-footer-${e}`,this.footerElem=document.createElement("div")}setListener(e,t,s){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const n=this.items.length,i=new K;i.makeDim(1,2*n);let o=0;for(const d of this.items)d.headerElem!==null&&(i.getCell(0,o).typeInfo.setLowerTable(),o++),d.subTblElem!==null&&(i.getCell(0,o).typeInfo.setLowerTable(),o++);const l=this.firstAction(e,t);if(l===null)return!1;const a=i.ToScrollHTML(e,this.tblCssName()),r=new ne;r.props.name="",r.props.id=this.tblCssName(),r.props.className=this.tblCssName(),r.props.option.setTable(a),r.props.option.onSelect=async d=>{if(this.onSelect!==void 0){const N=new he;N.callerName=d.classify,N.result=d.selectedValue,await this.onSelect(N)}},this.htmlMaker=new A,this.htmlMaker.add(r);const c=this.htmlMaker.ToHTML();for(const d of this.items){if(d.headerItem!==void 0)for(const N of d.headerItem.htmlMaker.itemList)this.htmlMaker.add(N);if(d.subTblItem!==void 0)for(const N of d.subTblItem.htmlMaker.itemList)this.htmlMaker.add(N)}let m=document.createElement("dialog");m.className=e,m.innerHTML=c,this.ctlElem=m;let f=m.children[0];const u=this.divCssName();f.className=u,f.id=u;let g=f.children[0];g.className=`${this.tblCssName()}`,g.id=`${this.tblCssName()}`,o=0;let p=0;for(const d of g.rows)o%2===0?(d.cells[0].appendChild(this.items[p].headerElem),o++):(d.cells[0].appendChild(this.items[p].subTblElem),o++,p++);if(this.headerElem!==null&&(this.headerElem.className=this.headerName,this.headerElem.id=this.headerName,m.appendChild(this.headerElem)),l.appendChild(this.ctlElem),this.footerElem!==null){const d=this.footerCssName();if(this.footerElem.className=d,this.footerElem.id=d,m.appendChild(this.footerElem),this.footerName.endsWith(tn.OkCancel)){const N=`${d}-okBtn`,x=`${d}-canBtn`;let M=`
<button id="${N}">OK</button>
<button id="${x}">CANCEL</button>
`.trim();this.footerElem.innerHTML=M,document.getElementById(N).onclick=this.onOkClickFooter,document.getElementById(x).onclick=this.onCancelClickFooter}}return this.table=i,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}enableEvents(e){if(this.ctlElem===null)return!1;const t=new Array;return t.push(this.items[0].headerItem.tblCssName),t.push(this.items[0].subTblItem.tblCssName),this.htmlMaker.enableTableEvents(this.ctlElem.className,t),this.onSelect=e,!0}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}dispose(){super.dispose(),this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}setSize(e="300"){let t=0;if(this.footerElem!==null){const s=this.htmlMaker.GetRect(this.footerElem);t=Number(s.height)}this.table.height=`${Number(e)-t}`,this.height=Number(e)+E.footerPadding}setFontConfig(e="0.9"){this.table.setFontConfig(e)}get cssText(){const e=this.footerCssName(),t=this.footerName!==""?`
/*フッター背景*/
[class^="${e}"] {
${E.footerText()}
}
/*フッターのボタン*/
[class^="${e}"] button {
${E.footerButtonText()}
}
`.trim():"";return`
${this.getOuterCssText()}
${E.getTableCssText(this.divCssName(),this.table.height)}
${t}
`.trim()}divCssName(){return`${this.ctlName}-div`}tblCssName(){return`${this.ctlName}-tbl`}headerCssName(){return`${this.ctlName}${this.headerName}`}footerCssName(){return`${this.ctlName}${this.footerName}`}}ft.allRowAction=-1;class sn{constructor(){this.url="",this.toolTip=""}}class rs extends ft{constructor(){super(...arguments),this.checkClassName="",this.subTblClassName="",this.imgClassName="",this.imgSize=100,this.bgColor=`${E.onColor}66`,this.onSelectHeader=async e=>{const t=e.classify.split("-");t.length>=1&&this.setCheck(Number(t[t.length-1]))},this.onSelectSubTbl=async e=>{console.log(e)}}makeCheckHeader(e,t,s){const n=new K;n.makeDim(1,1),this.checkClassName=`${e}-check`;const i=new ps;i.placeholder=t,i.value=!1,i.enableClicked="true";const o=new ke;o.makeItems(),o.items[0].typeInfo.setCheck(i),o.items[0].className=`${this.checkClassName}-${s}`,n.getCell(0,0).typeInfo=o.items[0].typeInfo,n.getCell(0,0).className=o.items[0].className,n.getCell(0,0).typeInfo.using.itemId=1,n.getCell(0,0).typeInfo.toolTip=t;const l=new en;return l.tblCssName=e,l.table=n,l.onSelect=this.onSelectHeader,l}makeImgSubTbl(e,t,s){const n=new K;n.makeDim(t.length,1),this.subTblClassName=e,this.imgClassName=`${e}-img`;let i=0;for(const l of t){const a=new Zt;a.imgFile="",a.imgSrc=l.url,a.alt="";const r=new ke;r.makeItems(),r.items[0].typeInfo.setImg(a),r.items[0].className=`${this.imgClassName}-${s}-${i}`,n.getCell(i,0).typeInfo=r.items[0].typeInfo,n.getCell(i,0).className=r.items[0].className,n.getCell(i,0).typeInfo.using.itemId=i,n.getCell(i,0).typeInfo.toolTip=l.toolTip,i++}const o=new en;return o.tblCssName=e,o.table=n,o.onSelect=this.onSelectSubTbl,o}setCheckByRow(e=this.firstRowIndex,t=!0){if(e===ft.allRowAction){for(const n of this.items)this.setCheckInternal(n);return!0}if(e<0||e>=this.items.length)return!1;const s=this.items[e-this.firstRowIndex];return this.setCheckInternal(s)}setCheck(e=this.firstRowIndex){let t=this.firstRowIndex;for(const s of this.items)t===e?this.setCheckInternal(s,!0):this.setCheckInternal(s,!1),t++}setCheckInternal(e,t=!0){const s=e.headerElem;if(s===null)return!1;const n=s.rows[0];for(const i of n.cells){for(const o of i.children)if(o.tagName==="DIV"){e.headerItem.table.setElemValue(o,t);break}break}return!0}getCheckMap(){const e=new Map;let t=this.firstRowIndex;for(const s of this.items){const n=s.headerElem;if(n===null)continue;const i=n.rows[0];for(const o of i.cells){for(const l of o.children){if(l.tagName!=="DIV")continue;const r=s.headerItem.table.getElemValue(l);e.set(t,r);break}break}t++}return e}checkedRow(){const e=this.getCheckMap();for(const[t,s]of e)if(s===!0)return t;return-1}selectFirstCell(e=this.firstRowIndex){if(e===ft.allRowAction){for(const s of this.items)this.selectFirstCellInternal(s);return!0}if(e<0||e>=this.items.length)return!1;const t=this.items[e-this.firstRowIndex];return this.selectFirstCellInternal(t)}selectFirstCellInternal(e){const t=e.subTblElem;if(t===null)return!1;const s=t.rows[0];for(const n of s.cells){for(const i of n.children)i.tagName==="DIV"&&i.classList.remove("selected");if(n.children.length>=1){n.children[0].classList.add("selected");break}break}return!0}applyCss(){const e=`${this.getBaseElem().className}-listviewgroup-style`;if(document.getElementById(e))return;const t=E.spacingTable,s=this.appendStyle(e);s.textContent=`
${this.cssText}

.${this.ctlName} {
width: ${(this.imgSize+4)*5}px; height: ${this.imgSize+50}px;
height: ${this.height}px;
}

[class^="${this.checkClassName}"] {
display: flex;
${E.spanCssText(this.table.fontSize,!1)}
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
`.trim()}}class Jt{constructor(){this.numCell=1,this.enableWatchNotify=!1}}class qn extends ft{constructor(){super(...arguments),this.indentPx=10,this.topTableElem=null,this.onButtonClicked=async e=>{const t=e.target;if(t!==null&&t.tagName==="BUTTON"&&this.onSelect!==void 0){const s=t.getAttribute("item-id"),n=new he;n.callerName=t.className,n.result=s||"",n.classify=Qe.Unknown,n.notify=this,await this.onSelect(n)}},this.rowObserver=null,this.rowSelector="",this.trSelector='tr[data-enable-watch-notify="true"]'}init(){const e=new dn;e.headerElem=null,e.subTblElem=null,this.items.push(e)}createRoot(){const e=this.table.getParentElem();if(e===null)return;const t=e.children[0];if(t===null)return;const s=t.children[0];t.style.padding="unset",s.style.padding="unset",this.topTableElem=s,this.newRow(s,"-root",new Jt),this.rowVisible(s,!1,null)}createNode(e,t,s=new Jt){const n=document.createElement("table");return n.className=t,this.newRow(n,"",s),e.rows[1].cells[0].appendChild(n),n}removeNode(e){if(e===null)return;const t=e.parentElement;t!==null&&(t.removeChild(e),e.remove(),e=null)}removeNodeBy(e){let t=this.findNodeBy(e);this.removeNode(t)}findParentNodeBy(e){let t=this.findNodeBy(e);if(t===null)return null;let s=t.parentElement;for(;s!==null;){if(s===this.topTableElem)return null;if(s.tagName==="TABLE")break;s=s.parentElement}return s}getChildren(e){if(e===null||e.rows.length!==2)return null;const t=e.rows[1].cells[0].children;if(t.length===0)return null;const s=new Array;for(const n of t)s.push(n);return s}newRow(e,t,s){const n=e.insertRow(-1),i=e.insertRow(-1);n.className=`${e.className}${t}-row_1`,i.className=`${e.className}${t}-row_2`,n.innerHTML="<td></td>".repeat(s.numCell),i.innerHTML="<td></td>",s.enableWatchNotify===!0&&(n.dataset.enableWatchNotify="true")}rowVisible(e,t,s){e!==null&&(t!==null&&(e.rows[0].style.display=t===!0?"":"none"),s!==null&&(e.rows[1].style.display=s===!0?"":"none"))}makeTextCell(e,t,s){const n=new pt;return n.typeInfo.setLabel(t,!1),n.className=e,n.typeInfo.toolTip=s,n}makeImgCell(e,t,s,n){const i=new Zt;i.imgSrc=t,i.imgFile=s,i.lazy=!0;const o=new pt;return o.typeInfo.setImg(i),o.className=e,o.typeInfo.toolTip=n,o}makeBtnCell(e,t,s,n){const i=new pt;return i.typeInfo.setButton(t),i.className=e,i.typeInfo.toolTip=s,i.typeInfo.using.itemId=n,i}get rootName(){return this.topTableElem.className}findNodeBy(e){if(this.topTableElem===null)return null;if(this.topTableElem.className===e)return this.topTableElem;const t=this.topTableElem.getElementsByClassName(e);return t.length===0?null:t[0]}getCell(e,t=0){if(e===null)return null;const s=e.rows[0];return t<0||t>=s.cells.length?null:s.cells[t]}findCell(e,t){return e===null?null:e.querySelector(t)}setCellContent(e,t,s){const n=this.getCell(e,t);return n===null?!1:(n.innerHTML=s,!0)}enableEvents(e){return this.topTableElem===null?!1:(this.topTableElem.addEventListener("click",this.onButtonClicked),this.onSelect=e,!0)}disableEvents(){return this.topTableElem===null?!1:(this.topTableElem.removeEventListener("click",this.onButtonClicked),!0)}startWatch(e,t=this.ctlName){if(this.rowObserver!==null)return;const s=document.getElementById(`${t}-div`);if(s===null)return;const n={root:s,rootMargin:"0px",threshold:.1},i=new IntersectionObserver(l=>{l.forEach(a=>{const r=a.target;a.isIntersecting&&r.dataset.enableWatchNotify==="true"&&this.onNotifyWatched!==void 0&&this.onNotifyWatched(r)})},n);document.querySelectorAll(`.${t}-tbl tbody ${this.trSelector}`).forEach(l=>{i.observe(l)}),this.rowObserver=i,this.rowSelector=t,this.onNotifyWatched=e}stopWatch(){if(this.rowObserver===null)return;const e=document.querySelectorAll(`.${this.rowSelector}-tbl tbody ${this.trSelector}`);for(const t of e)this.rowObserver.unobserve(t);this.rowObserver=null,this.rowSelector="",this.onNotifyWatched=void 0}reset(){this.topTableElem!==null&&(this.topTableElem.innerHTML="",this.topTableElem=null)}dispose(){super.dispose(),this.disableEvents(),this.stopWatch()}scroll(e){e!==null&&e.scrollIntoView({behavior:"smooth",block:"center"})}applyCss(){const e=`${this.getBaseElem().className}-nestednodegroup-style`;if(document.getElementById(e))return;const t=this.appendStyle(e);t.textContent=`
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

`.trim()}}class Jn{constructor(){this.itemType=R.Unknown,this.itemId=-1,this.label="",this.innerHTML=""}}class pn{constructor(){this.toolTip="",this.using=new Jn}setButton(e){this.using.itemType=R.Btn,this.using.label=e}setLabel(e,t){this.using.itemType=t?R.Label:R.LabelRO,this.using.label=e}setCombo(e){this.using.itemType=R.Combo,this.using.combo=e}setRadio(e){this.using.itemType=R.Radio,this.using.radio=e}setInput(e){this.using.itemType=R.Input,this.using.input=e}setCheck(e){this.using.itemType=R.Chk,this.using.check=e}setImg(e){this.using.itemType=R.Img,this.using.img=e}setPlain(e){this.using.itemType=R.Plain,this.using.innerHTML=e}setTable(e){this.using.itemType=R.Table,this.using.innerHTML=e}setLowerTable(){this.using.itemType=R.LowerTable}ToButtonHTML(e){const t=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"";return`
<button class="${e}"${t} title="${this.toolTip}">${this.using.label}</button>
`.trim()}ToLableHTML(e){const t=this.toolTip!==""?` title="${this.toolTip}"`:"";return`
<span class="${e}" data-readonly="false"${t}>${this.using.label}</span>
`.trim()}ToLableROHTML(e){const t=this.toolTip!==""?` title="${this.toolTip}"`:"";return`
<span class="${e}" data-readonly="true"${t}>${this.using.label}</span>
`.trim()}ToComboHTML(e){if(this.using.combo===void 0)return"";const t=this.using.combo;let s=ne.makeComboItemsHTML(t);const n=t.classify!==""?` data-classify="${t.classify}"`:"";return`
<select class="${e}" ${n} title="${this.toolTip}">
  ${s}
</select>
`.trim()}ToRadioHTML(e){if(this.using.radio===void 0)return"";const t=this.using.radio;if(t.selectionPair===void 0||t.selectionPair.length<=0)return"";const s=t.classify!==""?` data-classify="${t.classify}"`:"";let n="";for(const i of t.selectionPair){let[o,l]=i.split("/");l=l.trim();const a=E.radioActiveKeyText;let r="";t.selectType===bt.Single?r=t.selectedItem===l?` ${a}`:"":r=t.selectedItems.find(m=>m===l)?` ${a}`:"";const c=`
<div class="${e}${r}" id="${e}"${s}>${o}</div>
`.trim();n+=c}return n}ToInputHTML(e){if(this.using.input===void 0)return"";const t=this.using.input,s=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"",n=t.value!==""?` value="${t.value}"`:"",i=t.placeholder!==""?` placeholder="${t.placeholder}"`:"",o=t.disableKeyDown===!0?' data-disableKeyDown="true"':"",l=t.enableClicked===!0?' data-enableClicked="true"':"",a=`${o}${l}`;return`
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
`.trim()}ToOverlayHTML(){return`<div class="overlay" title="${this.toolTip}"></div>`}}class Wn{constructor(){this.name="",this.id="",this.className="",this.option=new pn}}class ne{constructor(){this.props=new Wn}ToHTML(e){let t="",s="";switch(e.option.using.itemType){case R.Btn:t=e.option.ToButtonHTML(e.className);break;case R.Label:t=e.option.ToLableHTML(e.className),s=e.option.ToOverlayHTML();break;case R.LabelRO:t=e.option.ToLableROHTML(e.className);break;case R.Plain:t=`
${e.option.using.innerHTML}
`.trim();break;case R.Combo:t=e.option.ToComboHTML(e.className);break;case R.Input:t=e.option.ToInputHTML(e.className);break;case R.Chk:t=e.option.ToCheckHTML(e.className);break;case R.Img:t=e.option.ToImgHTML(e.className,e.option.using.img.alt),s=e.option.ToOverlayHTML();break}return`
  ${t}
  ${s}
`.trim()}MakeSelectableHTML(){let e="";if(this.props.option.using.itemType===R.Img)for(const t of this.props.option.using.img.marker)e+=` data-${t}`;return`
<div class="${this.props.name}" id="${this.props.name}" item-id="${this.props.id}"${e}>
${this.ToHTML(this.props)}
</div>
`.trim()}static makeComboItemsHTML(e){if(e.selectionPair===void 0||e.selectionPair.length<=0)return"";let t="";for(const s of e.selectionPair){let[n,i]=s.split("/");i=i.trim();const o=e.selectedItem===i?" selected":"",l=`
<option value="${i}"${o}>${n}</option>
`.trim();t+=l}return t}}class A{constructor(){this._defaultButtonsName="dialog-buttons",this._defaultToolButtonsName="dialog-tool-btns",this._enableScrollEvt=!1,this._scrollTimer=null,this._isScrolling=!1,this.onButtonClicked=e=>{const t=e.target;if(t===null)return;const s=t.tagName==="BUTTON"?t:t.parentElement;if(s===null)return;let n=this.supplessSelected(s.className);if(n!==""){n=`.${n}`;const o=document.querySelectorAll(`${n}.selected`);if(o.length>=1)o.forEach(l=>l.classList.remove("selected"));else{let l=this.getTopElement(t);if(l!==null){const a=s.tagName,r=l.querySelectorAll(`${a}.selected`);r.length>=1&&r.forEach(c=>c.classList.remove("selected"))}}s.classList.add("selected")}const i=s.getAttribute("item-id");if(i){const o=this.itemList.find(l=>`${l.props.id}`===i);if(o){if(o.props.option.onSelect){let l="";t.tagName==="BUTTON"&&(l=t.getAttribute("item-id"),l===null&&(l=""));const a=new lt;a.parentElem=t.parentElement,a.item=o,a.targetId=l,o.props.option.onSelect(a)}this.selectedCh=o}else{let l=this.getTopElement(t);if(l?.tagName==="TABLE"){const a=l.className,r=this.itemList.find(c=>c.props.className===a);if(r){if(r.props.option.onSelect){let c="";t.tagName==="BUTTON"&&(c=t.getAttribute("item-id"),c===null&&(c=""));const m=t.parentElement!==null?t.parentElement.className:"";let f=t.className;f==="overlay"&&(f=m,t.parentElement!==null&&(c=t.parentElement.getAttribute("item-id"),c===null&&(c="")));const u=new lt;u.parentElem=t.parentElement,u.item=r,u.targetId=c,u.classify=this.supplessSelected(f),r.props.option.onSelect(u)}this.selectedCh=r}}}}},this.onInputKeydown=e=>{const t=e.target;if(t===null||t.tagName!=="INPUT")return;const s=t,n=e;let i=Te.None;switch(n.key){case mt.Enter:i=Te.Normal;const o=n.repeat,l=n.timeStamp;let a=s.dataset.pressInfo;if(a===void 0)a=`1;${l}`,i=Te.Normal;else if(!o){const c=a.split(";");if(c.length===2){let m=parseInt(c[0]),f=parseFloat(c[1]);l-f>=4*1e3?m=1:(m++,m>=3&&(m=0,i=Te.Special)),a=`${m};${l}`}}s.dataset.pressInfo=a,n.preventDefault();break;case mt.Escape:s.value="元の値",s.blur();break;case mt.Tab:break;case mt.Process:return;default:s.dataset.disablekeydown!==void 0&&n.preventDefault();return}this.notifyOnInputEvent(s,Ve.KeyDown,n.key,i)},this.onInputClicked=e=>{const t=e.target;if(t===null||t.tagName!=="INPUT")return;const s=t;s.dataset.enableclicked!==void 0&&this.notifyOnInputEvent(s,Ve.Click,"",Te.None)},this.onSelectChange=e=>{const t=e.target;if(t===null||t.tagName!=="SELECT")return;const s=t?.dataset.classify;let n=t.getAttribute("item-id");if(n===null){const i=this.getTopElement(t);i!==null&&(n=i.getAttribute("item-id"))}if(n){let i=this.itemList.find(o=>`${o.props.id}`===n);if(i===void 0&&(i=this.itemList.find(o=>`${s}${o.props.id}`===n)),i){if(i.props.option.onSelect){const o=new lt;o.parentElem=t.parentElement,o.item=i,o.targetId=n,o.classify=s===void 0?"?":s,o.selectedValue=t.value,i.props.option.onSelect(o)}this.selectedCh=i}}},this.itemList=new Array}add(e){this.itemList.push(e)}MakeDefaultDialogParentCss(e,t,s,n=0){return`
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
  ${E.borderShadowText}
}
`.trim()}MakeDefaultDialogCss(e){return`
.${e} {
  background-color: #f7eb86e6;
  border: 2px solid #2c3e50;
  padding: 10px;
  ${E.borderShadowText}
}
`.trim()}ToHTML(){let e="";for(const t of this.itemList){if(t.props.option.using.itemType===R.Table){e+=t.props.option.using.innerHTML;continue}e+=t.MakeSelectableHTML()}return`${e}`}MakeScrollableList(e){let t="";for(const s of this.itemList)t+=s.MakeSelectableHTML();return`<div id="${e}" class="${e} scroll">
${t}
</div>`}MakeDefaultScrollCss(e,t){return`
.${e} .scroll {
max-height: ${t}px;
overflow-y: auto;
${E.scrollBarText}
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
    ${E.footerButtonText()}
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
    ${E.footerButtonText()}
}
.${this.defaultToolButtonsCssName} select {
    height: 30px;
    ${E.footerButtonText()}
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
`.trim(),document.head.appendChild(s),!0}hideFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.add("hidden")}showFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.remove("hidden")}getFullScreenMsgElem(e){const t=document.getElementById(e);if(t){const s=t.querySelectorAll("p");return s!==null&&s.length>=1?s[0]:null}return null}initObserver(e,t){const s=document.getElementById(e);if(!s)return;const n=async l=>{await l.forEach(async a=>{if(a.isIntersecting){const r=a.target,c=this.isDemo&&!t.isMaterial(r.dataset.filename)?"demo.png":r.dataset.filename;if(c&&r.src===""||r.src.startsWith(window.location.origin)){const m=await t.findNs(c);m===null||m===""?(this.observer.unobserve(r),console.log(`cannot set image : ${c}`)):await t.getImageUrlBy(c,m).then(f=>{f!==null?(r.src=f,this.observer.unobserve(r)):console.log(`pending set image : ${c}`)})}}})},i={root:s,rootMargin:"0px",threshold:.1};this.observer=new IntersectionObserver(n,i),s.querySelectorAll("img[data-filename]").forEach(l=>this.observer.observe(l)),console.log("[initObserver] enabled!")}get isDemo(){return window.EVONA_CONFIG.demo}get isScrolling(){return this._enableScrollEvt?!(this._scrollTimer!==null&&this._isScrolling):!1}enableScrollEvent(e){this._isScrolling=!1;const t=document.getElementById(e);return t?(this._enableScrollEvt=!0,t.addEventListener("scroll",()=>{this._isScrolling=!0,clearTimeout(this._scrollTimer),this._scrollTimer=setTimeout(()=>{this._scrollTimer=null,this._isScrolling=!1;const s=this.observer.takeRecords();console.log(`[enableScrollEvent] stopped ${s.length}`)},200)}),console.log("[enableScrollEvent] enabled!"),!0):!1}enableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(n=>{const i=n.querySelectorAll("img");i.length>=1&&(i[0],this.addButtonEvent(t,n));const o=n.querySelectorAll("span");o.length>=1&&o[0]?.dataset.readonly=="false"&&this.addButtonEvent(t,n);const l=n.querySelectorAll("select");l.length>=1&&(l[0],this.addSelectEvent(t,n));const a=n.querySelectorAll("button");if(a.length>=1)for(const r of a)console.log(`${n.tagName}::${t}::button::${r.innerHTML}`),n.addEventListener("click",this.onButtonClicked)})}enableTableEvents(e,t=void 0){const s=`.${e}`;document.querySelectorAll(`${s}`).forEach(i=>{const o=i.querySelectorAll("table");if(o.length>=1)for(const l of o){if(t!==void 0&&t.find(r=>r===l.className)){console.log(`[enableTableEvents] exclude table ${i.className}`);continue}l.addEventListener("click",this.onButtonClicked),l.addEventListener("keydown",this.onInputKeydown),l.addEventListener("click",this.onInputClicked),l.addEventListener("change",this.onSelectChange)}})}disableTableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(n=>{const i=n.querySelectorAll("table");if(i.length>=1)for(const o of i)n.removeEventListener("click",this.onButtonClicked),n.removeEventListener("keydown",this.onInputKeydown),n.removeEventListener("click",this.onInputClicked),n.removeEventListener("change",this.onSelectChange)})}addButtonEvent(e,t){t.getAttribute("item-id")&&t.addEventListener("click",this.onButtonClicked)}notifyOnInputEvent(e,t,s,n){const i=e.getAttribute("item-id");if(i){let o=this.getTopElement(e);if(o?.tagName==="TABLE"){const l=o.className,a=this.itemList.find(r=>r.props.className===l);if(a){const r=new lt;r.parentElem=e.parentElement,r.item=a,r.targetId=i,r.classify=this.supplessSelected(e.className),r.eventType=t,r.Keydown=s,r.KeyEnter=n,a.props.option.onSelect(r)}}}else console.log("**notifyOnInputEvent::invalid id**"),console.log(e)}addSelectEvent(e,t){t.addEventListener("change",s=>{const n=s.target,i=n?.dataset.classify,o=t.getAttribute("item-id");if(o){let l=this.itemList.find(a=>`${a.props.id}`===o);if(l===void 0&&(l=this.itemList.find(a=>`${i}${a.props.id}`===o)),l){if(l.props.option.onSelect){const a=new lt;a.item=l,a.targetId=o,a.classify=i===void 0?"?":i,a.selectedValue=n.value,l.props.option.onSelect(a)}this.selectedCh=l}}})}supplessSelected(e){let t=e,s=e.indexOf(" selected");return s>=0&&(t=e.substring(0,s)),t}getTopElement(e){let t=e.parentElement;for(;t!==null;){if(t.tagName==="DIV"){t=t.parentElement;continue}if(t.tagName==="TD"){t=t.parentElement;continue}if(t.tagName==="TR"){t=t.parentElement;continue}if(t.tagName==="TBODY"){t=t.parentElement;continue}if(t.tagName==="LABEL"&&e.tagName==="INPUT"&&e.type==="checkbox"){t=t.parentElement;continue}break}return t}GetRect(e){const t=e.getBoundingClientRect(),s=new Gt;return s.left=`${t.left}`,s.top=`${t.top}`,s.width=`${t.width}`,s.height=`${t.height}`,s}EnableElem(e,t){e.ariaDisabled=t?"false":"true"}IsEnabledElem(e){return e.ariaDisabled===null?!0:e.ariaDisabled==="false"}EnableId(e,t){const s=document.getElementById(e);return s===null?null:(this.EnableElem(s,t),t)}IsEnabledId(e){const t=document.getElementById(e);return t===null?null:this.IsEnabledElem(t)}ToElem(e){const t=document.createElement("div");if(t===null)return null;t.innerHTML=e;const s=t.firstElementChild;return t.remove(),s}ReplaceElem(e,t){if(t===null)return;const s=document.getElementsByClassName(e);if(s.length===0)return;const n=s[0],i=new Array;let o=-1,l=-1;for(const m of n.children)o++,m.className===t.className&&m.tagName===t.tagName?l=o:i.push(m);if(l===-1)return;const a=n.children.length,r=new Array;for(const m of n.children)r.push(m);for(const m of r)n.removeChild(m),m.remove();r.slice(0,r.length);let c=-1;for(o=0;o<a;o++)o===l?n.appendChild(t):(c++,n.appendChild(i[c]))}GetIdByIndex(e){return this.itemList[e].props.id}UnselectAll(e){const t=`.${e}`;document.querySelectorAll(`${t}.selected`).forEach(s=>s.classList.remove("selected"))}SelectByID(e,t){const s=this.FindByID(e,t);if(s){s.classList.add("selected");const n=s.getAttribute("item-id");if(n){const i=this.itemList.find(o=>`${o.props.id}`===n);i&&(this.selectedCh=i)}return s}return null}FindDivByClassName(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.querySelectorAll("div");for(const l of o)if(l.className===t||l.className.startsWith(t))return l}return null}FindByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t)return i}return null}FindImgByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("img");return l.length>=1?l[0]:null}}return null}FindImgsByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("img");return l.length>=1?l:null}}return null}FindDivByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("div");return l.length>=1?l[0]:null}}return null}FindSelectByID(e,t,s){const n=`.${e}`,i=document.querySelectorAll(`${n}`);for(const o of i){const l=o.getAttribute("item-id");if(l&&l===t){const a=o.querySelectorAll("select");if(a.length>=1){for(const r of a)if(r?.dataset.classify===s)return r}return null}}return null}ReplaceImg(e,t,s){const n=this.FindImgByID(e,t);return n===null?null:(n.dataset.filename,n.src=s,n)}ReplaceDivToolTip(e,t,s){const n=this.FindDivByID(e,t);return n===null?null:(n.title=s,n)}ReplaceImgToolTip(e,t,s){const n=this.FindImgByID(e,t);return n===null?null:(n.title=s,n)}SwapImgSrcAndPairToolTip(e,t){if(e===null||t===null)return!1;const s=e.parentElement,n=t.parentElement;let i=null,o=null;if(s!==null){for(const r of s.children)if(r.tagName==="DIV"){i=r;break}}if(n!==null){for(const r of n.children)if(r.tagName==="DIV"){o=r;break}}const l=e.src,a=t.src;if(e.src=a,t.src=l,i!==null&&o!==null){const r=i.title,c=o.title;i.title=c,o.title=r}else console.log("[SwapImgSrcAndBrosToolTip] cannot swap title");return!0}SetImgSrc(e,t){if(e===null)return null;e.dataset.filename,e.src=t}SetImgSize(e,t,s){if(e===null)return null;e.style.width=`${t}px`,e.style.height=`${s}px`}ReplaceComboItems(e,t,s){const n=this.FindSelectByID(e,t,s.classify);if(n===null)return null;n.querySelectorAll("option").length>=1&&(n.innerHTML="");const o=ne.makeComboItemsHTML(s);return o!==""&&(n.innerHTML=o),n}setVisible(e,t){const s=document.getElementById(e);return s===null?null:(s.style.display=t===!0?"":"none",!0)}copyCssToInlineStyle(e,t){for(const s of document.styleSheets){let n;try{n=s.cssRules}catch{continue}for(const i of n)if(i instanceof CSSStyleRule&&i.selectorText===e){const o=i.style;console.log(`[copyCssToInlineStyle] coping [${e}]`);for(let l=0;l<o.length;l++){const a=o[l],r=o.getPropertyValue(a);t.style.setProperty(a,r)}return}}}}const Ge={Hide:"Hide",CopyPaste:"CopyPaste"},ht={Hide:"Hide",MoveLowest:"MoveLowest"},Ae={Hide:"Hide",DialogHide:"DialogHide"},ut={Hide:"Hide",Help:"Help"},pe={Hide:"Hide",Option:"Option",OptionWithArgs:"OptionWithArgs"},dt={Hide:"Hide",Guide:"Guide"},xe={Copy:"Copy",Paste:"Paste",Cancel:"Cancel"};class Kn{constructor(){this.leftPx="",this.topPx="",this.btnElem=null,this.dlg=null,this.enabled=!0}}class Ce{constructor(){this.title="",this.dlgName="",this.B2Type=Ge.Hide,this.B3Type=ht.MoveLowest,this.B4Type=Ae.Hide,this.HType=ut.Hide,this.OType=pe.Hide,this.GType=dt.Hide,this.initLeft=0,this.initTop=0,this.cornerIndex=-1,this.mover=new Is,this.moverOnMoveDone=async()=>{this.onMoveDone!==void 0&&(await this.onMoveDone(this.dlg),this.cornerIndex=0)},this.resizer=new Yn,this.resizerOnResizeDone=async(e,t)=>{this.onResizeDone!==void 0&&await this.onResizeDone(this.dlg,e,t)},this.b2cursor="",this.isIPad=/iPad|Macintosh/.test(navigator.userAgent)&&"ontouchend"in document,this.isTouchDevice=()=>"ontouchstart"in window||navigator.maxTouchPoints>0}SetB2Type(e=Ge.CopyPaste,t){this.B2Type=e,this.onCopyPaste=t}SetB3Type(e=ht.MoveLowest){this.B3Type=e}SetB4Type(e=Ae.Hide){this.B4Type=e}SetOType(e=pe.Option,t=void 0){this.OType=e,this.onOption=t}SetHType(e=ut.Help,t){this.HType=e,this.onHelp=t}SetGuide(e=dt.Guide,t){this.GType=e,this.onGuide=t}NewDialog(e,t){this.dlgName=t;const s=document.createElement("dialog");s.id=t,s.className=t;const n=document.getElementById(e);return n.appendChild(s),this.dlgParent=n,this.dlg=s,s}SetContent(e,t,s=!0){const n=this.dlg,i=`<button class="${this.toolNameB0}" id="${this.toolNameB0}" title="DragMove">[＊]</button>`,o=`<button class="${this.toolNameB1}" id="${this.toolNameB1}" title="SideBy">[≫]</button>`;let l="";this.B2Type===Ge.CopyPaste&&(l=`<button class="${this.toolNameB2}" id="${this.toolNameB2}" title="Copy&Paste">[⇔]</button>`);let a="";this.B3Type===ht.MoveLowest&&(a=`<button class="${this.toolNameB3}" id="${this.toolNameB3}" title="MoveLowest">[_]</button>`);let r="";this.B4Type===Ae.DialogHide&&(r=`<button class="${this.toolNameB4}" id="${this.toolNameB4}" title="Close">[×]</button>`);let c="";switch(this.OType){case pe.Option:case pe.OptionWithArgs:c=`<button class="${this.toolNameO}" id="${this.toolNameO}" title="Option">[…]</button>`;break}let m="";this.HType===ut.Help&&(m=`<button class="${this.toolNameH}" id="${this.toolNameH}" title="Help">[？]</button>`);let f="";this.GType===dt.Guide&&(f=`
<div class="${this.toolNameGuideOwn}" id="${this.toolNameGuideOwn}" style="position: relative;">
<button class="${this.toolNameGuideCtl}" id="${this.toolNameGuideCtl}" title="Guide">[G]</button>
</div>
`);const u=`${i}${o}${l}${a}${r}${c}${m}${f}`;let g="";this.title!==""?g=`<div class="${this.titleName}">${this.title}${u}</div>`:g=`<div class="${this.titleName}">${u}</div>`;const p=document.createElement("div");p.innerHTML=g,n.innerHTML=t;const d=document.getElementById(e);d.hidden=s,d.appendChild(p),d.appendChild(n),this.applyCss()}EnableEventHandlers(){const e=this.dlgParent.style.left,t=this.dlgParent.style.top;this.initLeft=parseInt(e.substring(0,e.length-2)),this.initTop=parseInt(t.substring(0,t.length-2)),console.log(`[EnableEventHandlers] ${this.dlgParent.id}::(${e},${t})::(${this.initLeft},${this.initTop})`);const s=document.getElementById(`${this.toolNameB0}`);s!==null&&(this.mover.onMoveDone=this.moverOnMoveDone,this.mover.attach(s,this.dlgParent));const n=document.getElementById(`${this.toolNameB1}`);switch(n!==null&&(n.onclick=async()=>{if(this.dlgParent===void 0)return;const i=window.innerWidth,o=window.innerHeight,l=this.dlgParent.offsetWidth/2,a=Math.max(this.dlgParent.offsetWidth,this.dlg.offsetWidth),r=this.dlgParent.offsetHeight+this.dlg.offsetHeight;switch(this.cornerIndex=(this.cornerIndex+1)%4,this.cornerIndex){case 0:this.dlgParent.style.left=`${l}px`,this.dlgParent.style.top="0px";break;case 1:this.dlgParent.style.left=`${i-a+l}px`,this.dlgParent.style.top="0px";break;case 2:this.dlgParent.style.left=`${i-a+l}px`,this.dlgParent.style.top=`${o-r}px`;break;case 3:this.dlgParent.style.left=`${l}px`,this.dlgParent.style.top=`${o-r}px`;break}}),this.B2Type===Ge.CopyPaste&&(document.getElementById(`${this.toolNameB2}`).onclick=async()=>{if(this.dlgParent===void 0||this.onCopyPaste===void 0)return;if(this.isB2Allow()===!1){console.log(`[${this.dlgName}] not-allowed copy-paste`);return}const i=this.dlgParent,o=i.querySelectorAll(`.${this.toolNameB2}`),l=o.length>=1?o[0]:null,a=new A;if(a.IsEnabledElem(l)===!1)return;const r=new Array,c=new ye;c.key=xe.Copy,c.text="クリップボードへコピー",r.push(c);const m=new ye;m.key=xe.Paste,m.text="クリップボードからペースト",r.push(m);const f=new ye;f.key=xe.Cancel,f.text="キャンセル",r.push(f);const u=new hn;u.setChoiceItems(r),a.EnableElem(l,!1);const g=a.GetRect(i);a.GetRect(this.dlg);const p=a.GetRect(l),d=this.dlg.className;u.setListener(`${d}-choice`,d,`${d}-B2`),u.applyCss(),u.show(`${parseInt(p.left)-parseInt(g.left)}`,"0"),u.enableEvents(async N=>{console.log(`[onSelect] ${N.callerName} ${N.result}`),u.dispose(),this.onCopyPaste(this.dlg,N.result),a.EnableElem(l,!0)})}),this.B3Type===ht.MoveLowest&&(document.getElementById(`${this.toolNameB3}`).onclick=async()=>{if(this.dlgParent===void 0)return;new P().MoveLowestLayer(this.dlgParent)}),this.B4Type===Ae.DialogHide&&(document.getElementById(`${this.toolNameB4}`).onclick=async()=>{if(this.dlgParent===void 0)return;new A().setVisible(this.dlgParent.className,!1)}),this.OType){case pe.Option:case pe.OptionWithArgs:document.getElementById(`${this.toolNameO}`).onclick=async()=>{if(this.dlgParent!==void 0&&this.onOption!==void 0)if(this.OType===pe.OptionWithArgs){const i=this.dlgParent,o=i.querySelectorAll(`.${this.toolNameO}`),l=o.length>=1?o[0]:null,a=l instanceof HTMLButtonElement?l:null,r=new A,c=a!==null?r.IsEnabledElem(a):!1,m=r.GetRect(i),f=r.GetRect(l),u=`${parseInt(f.left)-parseInt(m.left)}`,g="0",p=new Kn;p.leftPx=u,p.topPx=g,p.btnElem=a,p.dlg=this.dlg,p.enabled=c,await this.onOption(this.dlg,this.OType,p)}else await this.onOption(this.dlg,this.OType,null)};break}this.HType===ut.Help&&(document.getElementById(`${this.toolNameH}`).onclick=async()=>{this.dlgParent!==void 0&&this.onHelp!==void 0&&await this.onHelp(this.dlg,this.HType)}),this.GType===dt.Guide&&(document.getElementById(`${this.toolNameGuideOwn}`).onclick=async()=>{if(this.dlgParent!==void 0&&this.onGuide!==void 0){const o=this.dlgParent.querySelectorAll(`.${this.toolNameGuideOwn}`),l=o.length>=1?o[0]:null;l!==null&&await this.onGuide(this.dlg,this.GType,l)}})}EnableResize(){if(this.isIPad&&this.isTouchDevice()){console.log("EVONA: Touch device detected. Priority given to flick scrolling.");return}const e=`<button class="${this.handleNameB0}" id="${this.handleNameB0}" title="Resize">[」]</button>`,t=document.createElement("div");t.className=this.handleName,t.id=this.handleName,t.innerHTML=`${e}`,this.dlg.appendChild(t);const s=document.getElementById(`${this.handleName}`);s!==null&&(s.style.position="absolute",s.style.left=`${this.dlg.clientWidth-s.clientWidth}px`,s.style.top=`${this.dlg.clientHeight-s.clientHeight}px`,this.resizer.onResizeDone=this.resizerOnResizeDone,this.resizer.attach(s,this.dlg))}static GetDialogInfo(e){const t=this.FindDialogParent(e);if(t===null)return null;const s=t.querySelector("dialog");if(s===null)return null;const n=new qe,i=s.clientWidth,o=s.clientHeight;return n.name=e,n.left=t.style.left,n.top=t.style.top,n.width=`${i}px`,n.height=`${o}px`,n}static SetDialogInfo(e){const t=this.FindDialogParent(e.name);if(t===null)return!1;const s=t.querySelector("dialog");return s===null?!1:(t.style.left=e.left,t.style.top=e.top,s.style.width=e.width,s.style.height=e.height,!0)}static FindDialogParent(e){const t=document.getElementById(e);return t??null}get titleName(){return`${this.dlgName}-dlg-title-00`}get toolNameB0(){return`${this.dlgName}-dlg-tool-b0`}get toolNameB1(){return`${this.dlgName}-dlg-tool-b1`}get toolNameB2(){return`${this.dlgName}-dlg-tool-b2`}get toolNameB3(){return`${this.dlgName}-dlg-tool-b3`}get toolNameB4(){return`${this.dlgName}-dlg-tool-b4`}get toolNameO(){return`${this.dlgName}-dlg-tool-o0`}get toolNameH(){return`${this.dlgName}-dlg-tool-h0`}get toolNameGuideOwn(){return`${this.dlgName}-dlg-tool-guide-own`}get toolNameGuideCtl(){return`${this.dlgName}-dlg-tool-guide-ctl`}get handleName(){return`${this.dlgName}-dlg-handle-00`}get handleNameB0(){return`${this.dlgName}-dlg-handle-b0`}applyCss(){const e=`${this.dlgName}-header-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
/* タイトルバー全体 */
.${this.titleName} {
    display: flex;
    align-items: center;
    justify-content: space-between; /* 左右に振り分け */
${E.titleColorText}
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
`.trim(),document.head.appendChild(t)}setB2Allow(e=!0){const t=document.getElementById(`${this.toolNameB2}`);if(t===null)return;this.b2cursor===""&&(this.b2cursor=t.style.cursor);const s=e?this.b2cursor:"not-allowed";t.style.cursor=s}isB2Allow(){const e=document.getElementById(`${this.toolNameB2}`);return e===null?!1:e.style.cursor===this.b2cursor}}const wt={None:"None",Add:"Add",Remove:"Remove"};class jn{constructor(){this.reqType=wt.None,this.parentClassName="",this.uiName="",this.itemName="",this.title="",this.content=""}}const at={None:"None",Memo:"Memo",Table:"Table"},Tt={None:"None",InVisible:"InVisible"},Ze={None:"None",NotMgr:"NotMgr"};class nn{constructor(){this.heightPx="100",this.name="",this.title="",this.closeType=Tt.None,this.MgrType=Ze.None,this.toolTipType=at.None,this.memoSpanElem=null,this.tblElem=null,this.tblAuxCss="",this.onB0Click=async e=>{console.log("onB0Click",e)},this.onB4Click=async e=>{if(this.closeType===Tt.InVisible){this.SetVisible(!1);return}await U.Remove(this.dlg.id)},this.onMgClick=async e=>{await U.Activate(this)},this.onTableClick=async e=>{const t=e.target;if(t===null||t.tagName!=="DIV")return;const s=t,n=s.className!==""?s.classList[0]:"",i=s.textContent,o=E.radioActiveKeyText;let l="",a="";for(const r of this.table.rows)for(const c of r.cols)for(const m of c.items)if(m.className===n&&m.typeInfo.using.itemType===R.Radio&&s.dataset!==void 0&&m.typeInfo.using.radio.classify===s.dataset.classify)for(const f of m.typeInfo.using.radio.selectionPair){if(f.length===0)continue;const u=f.split("/");if(!(u.length<=1)&&u[0]===i){let g=!1;m.typeInfo.using.radio.selectType===bt.Single?(document.querySelectorAll(`.${t.className}`).forEach(p=>p.classList.remove(o)),t.classList.add(o),g=!0):t.classList.contains(o)?(t.classList.remove(o),g=!1):(t.classList.add(o),g=!0),a=u[0],l=u[1],this.onChangedTableSelection!==void 0&&await this.onChangedTableSelection(m.typeInfo.using.radio.classify,l,a,g);return}}},this.mover=new Is,this.moverOnMoveDone=async()=>{this.onMoveDone!==void 0&&await this.onMoveDone(this.dlg)}}NewToolTip(e,t){if(e===null)return null;const s=document.createElement("dialog");s.id=t,s.className=this.dlgName,e.appendChild(s),this.dlg=s;const n=`<button class="${this.toolNameB0}" id="${this.toolNameB0}" title="DragMove">[＊]</button>`,i=`<button class="${this.toolNameB4}" id="${this.toolNameB4}" title="Close">[×]</button>`,o=`<button class="${this.toolNameMg}" id="${this.toolNameMg}" title="ActivateMgr">[Ｍ]</button>`,l=`<span class="${this.toolNameTitle}" id="${this.toolNameTitle}" title="UIName">UIName</span>`,a=`${n}${i}${o}${l}`,r=document.createElement("div");r.id=this.toolDivName,r.className=this.toolDivName,r.innerHTML=a;const c=document.createElement("div"),m=this.divName;return c.id=m,c.className=m,s.appendChild(r),s.appendChild(c),this.div=c,s}SetTitle(e){const t=this.dlg.getElementsByClassName(`${this.toolDivName}`);if(t.length>=1){const n=t[0].getElementsByClassName(`${this.toolNameTitle}`);if(n.length>=1){const i=n[0];i.innerHTML=e}}}SetMemoText(e){return this.toolTipType!==at.None?!1:(this.memoSpanElem===null&&this.initMemoMode(this.div),this.memoSpanElem!==null&&(this.memoSpanElem.innerHTML=e),this.toolTipType=at.Memo,!0)}SetTable(e,t=""){return this.toolTipType!==at.None||e===void 0?!1:(this.tblElem===null&&(this.table=e,this.initTableMode(this.div)),this.tblAuxCss=t,this.toolTipType=at.Table,!0)}VisibleMgrBtn(e){const t=this.dlg.querySelector(`.${this.toolNameMg}`);if(t!==null){const s=t;s.style.display=e?"":"none"}}SetTableValue(e,t,s,n){for(const i of this.table.rows)for(const o of i.cols)for(const l of o.items){if(l.typeInfo.using.itemType!==R.Radio)continue;const a=l.typeInfo.using.radio;if(a.classify===e)if(a.selectType===bt.Single){a.selectedItem=t;return}else{let r=-1,c=-1;for(const m of a.selectionPair){r++;const[f,u]=m.split("/");if(u===t){c=r;break}}if(c===-1)continue;if(n===!1){const m=a.selectedItems.findIndex(f=>f===t);m!==void 0&&a.selectedItems.splice(m,1)}else{let m=new Array;a.selectedItems.length>=1&&(m=m.concat(a.selectedItems)),m.push(t),a.selectedItems=m.sort((f,u)=>f.localeCompare(u))}console.log("*multi changed*",a.selectionPair,a.selectedItems,c);return}}}initMemoMode(e){const t=document.createElement("span"),s=this.spanName;t.id=s,t.className=s,e.appendChild(t),this.memoSpanElem=t}initTableMode(e){const t=this.tableName,s=this.table.ToHTML(t,t),n=new ne;n.props.name="",n.props.id=t,n.props.className=t,n.props.option.setTable(s),n.props.option.onSelect=async a=>{};const i=new A;i.add(n);const o=i.ToHTML(),l=i.ToElem(o);e.appendChild(l),this.tblElem=l}Show(e){this.dlg.show();const t=document.getElementById(e);if(t!==null){const s=t.getBoundingClientRect(),n=s.left+s.width/2,i=s.top+s.height/2;this.dlg.style.left=`${n}px`,this.dlg.style.top=`${i}px`}}SetVisible(e=!0){this.dlg.style.display=e?"":"none"}GetVisible(){return this.dlg.style.display!=="none"}EnableEvents(){const e=document.getElementById(this.toolNameB0);e.onclick=this.onB0Click,this.mover.onMoveDone=this.moverOnMoveDone,this.mover.attach(e,this.dlg),document.getElementById(this.toolNameB4).onclick=this.onB4Click,document.getElementById(this.toolNameMg).onclick=this.onMgClick,this.tblElem!==null&&this.tblElem.addEventListener("click",this.onTableClick)}applyCss(){const e=`${this.name}-style`;if(document.getElementById(e))return;const t="100",s="120",n=document.createElement("style");n.id=e,n.textContent=`
/* ツールチップ外枠 */
.${this.dlgName} {
  position: fixed;
  inset: auto; /* ブラウザの中央寄せを無効化 */
  top: ${t}px;
  left: ${s}px;
  transform: translateX(-50%);

  background-color: #f7eb86e6;
  border: 2px solid #2c3e50;
  padding: 2px;
  ${E.borderShadowText}

${E.titleColorText}
}

/* ボタンをまとめるコンテナ */
.${this.toolDivName} {
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
    background: #fbc02d; /* 共通のホバー色 */
}

.${this.divName} {
max-height: ${this.heightPx}px;
overflow-y: auto;
${E.scrollBarText}
}

${this.tblAuxCss}
`.trim(),document.head.appendChild(n)}dispose(){}get toolDivName(){return`${this.dlgName}-tool-div`}get toolNameB0(){return`${this.dlg.id}-tool-b0`}get toolNameB4(){return`${this.dlg.id}-tool-b4`}get toolNameMg(){return`${this.dlg.id}-tool-Mg`}get toolNameTitle(){return`${this.dlg.id}-tool-title`}get dlgName(){return"toolTip-dlg-common"}get divName(){return`${this.dlg.id}-div`}get spanName(){return`${this.dlgName}-span`}get tableName(){return`${this.dlgName}-table`}}class U{constructor(){this.mover=new Is}static FindParent(e){return document.getElementById(e)}static TopElement(){return document.body}static MakeUniqueName(e,t){return`${e}_${t}`}static Add(e){if(W.FindBy(e)!==null)return!1;const s=W.items.length+W.zIndexFirst,n=new nn;return n.NewToolTip(W.TopElement(),e),n.dlg.style.zIndex=`${s}`,W.items.push(n),!0}static Remove(e){let t=-1,s=-1;for(const i of this.items)if(i.MgrType!==Ze.NotMgr&&(s++,i.dlg.id===e)){t=s;break}if(t===-1||(this.table.deleteRow(t+this.table.firstRowIndex),this.table.redimAllRows(),s=W.items.findIndex(i=>i.dlg.id===e),s===-1))return!1;const n=W.items[s];return n.dlg.innerHTML="",n.dlg.remove(),W.items.splice(s,1),!0}static SetToolTipText(e,t,s){const n=W.FindBy(e);return n===null?!1:(n.SetTitle(t),n.SetMemoText(s),!0)}static MoveTop(e){const t=W.FindBy(e);if(t===null)return!1;let s=W.items.length-1+W.zIndexFirst;for(const n of W.items)n.dlg.className!==t.dlg.className&&(n.dlg.style.zIndex=`${s}`,s--);return s=W.items.length+W.zIndexFirst,t.dlg.style.zIndex=`${s}`,!0}static FindBy(e){const t=W.items.findIndex(s=>s.dlg.id===e);return t===-1?null:W.items[t]}static async Activate(e){const t=this.parentCssClassName(),s=document.getElementById(t);if(s!==null&&(s.style.display="",s.hidden=!1,this.requestActivate!==void 0)){for(const n of s.children)if(n.tagName==="DIALOG"){const i=n;await this.requestActivate(i);break}}}static setRow(e,t,s){let n=0;s.getCell(n,t).typeInfo.setLabel(`${e.title}`,!1),s.getCell(n,t).className=this.itemNameCssClassName(),s.getCell(n,t).typeInfo.using.itemId=t+s.firstRowIndex,s.getCell(n,t,1).typeInfo.setLabel(`${e.title}`,!1),s.getCell(n,t,1).className=this.itemNameCssClassName(),s.getCell(n,t,1).typeInfo.using.itemId=t+s.firstRowIndex,n++,s.getCell(n,t).typeInfo.setButton("アクティブ化"),s.getCell(n,t).className=this.itemActCssClassName(),s.getCell(n,t).typeInfo.using.itemId=t+s.firstRowIndex}static toHTML(){if(!this.items)return"";const e=2,t=new K;if(this.items.length>=1)t.makeDim(e,this.items.length),t.growCell(0,2),this.items.forEach((o,l)=>{this.setRow(o,l,t)}),t.makeRowTemplate(this.tableRowCssClassName()),this.table=t;else{t.makeDim(e,1),t.growCell(0,2);const o=new nn;this.setRow(o,0,t),t.makeRowTemplate(this.tableRowCssClassName()),t.clearRows(),this.table=t}const s=this.tableCssClassName(),n=this.table.ToScrollHTML(s,s);this.htmlMaker=new A;const i=new ne;return i.props.name="",i.props.id=s,i.props.className=s,i.props.option.setTable(n),i.props.option.onSelect=async o=>{console.log(`classify = ${o.classify} targetId = ${o.targetId}`)},this.htmlMaker.add(i),this.htmlMaker.ToHTML()}static AddRow(){return this.table.addRow(this.tableRowCssClassName())}static SetTitle(e,t,s){const n=this.table.getRowElem(e);n!==null&&(n.cells[0].children[0].children[0].innerHTML=t,n.cells[0].children[1].children[0].innerHTML=s)}static createMgrBox(e,t){const s=document.createElement("div"),n=this.parentCssClassName();s.id=n,s.className=n,this.TopElement().appendChild(s),this.uiInfo=new qe;const i=new Ce;i.title="<"+e+">",i.SetB4Type(Ae.DialogHide);const o=i.NewDialog(n,this.dlgCssClassName());return i.SetContent(n,t),i.EnableEventHandlers(),i.onMoveDone=W.moverOnMoveDone,this.dlg=o,o}static enableEvents(){const e=this.getTableElem();return e===null?!1:(e.addEventListener("click",this.onButtonClicked),!0)}static disableEvents(){const e=this.getTableElem();return e===null?!1:(e.removeEventListener("click",this.onButtonClicked),!0)}static getTableElem(){const e=document.getElementsByClassName(this.tableCssClassName());return e===null||e.length<=0?null:e[0]}static applyCss(){const e=this.parentCssClassName(),t=parseInt(this.uiInfo.left),s=parseInt(this.uiInfo.top),n=new A,i=document.createElement("style");i.textContent=`
${n.MakeDefaultDialogParentCss(e,t,s)}
${n.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgCssClassName()} {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

/* テーブル */
${E.getTableCssText(this.tableCssClassName(),"200")}
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

`.trim(),document.head.appendChild(i);const o=document.getElementById(e);n.copyCssToInlineStyle(`.${e}`,o)}static itemNameCssClassName(){return`${this.tableCssClassName()}-name`}static itemActCssClassName(){return`${this.tableCssClassName()}-act`}static tableRowCssClassName(){return`${this.parentCssClassName()}-table-row`}static tableCssClassName(){return`${this.parentCssClassName()}-table`}static dlgCssClassName(){return`${this.parentCssClassName()}-dlg`}static parentCssClassName(){return"toolTipMgr-top"}}W=U;U.items=new Array;U.zIndexFirst=2e3;U.moverOnMoveDone=async h=>{W.onMoveDone!==void 0&&await W.onMoveDone(h),W.requestActivate!==void 0&&await W.requestActivate(h)};U.onButtonClicked=async h=>{const e=h.target;if(e===null||e.tagName!=="BUTTON")return;console.log(e);const t=e.getAttribute("item-id");if(t===null)return;const s=Number(t)-W.table.firstRowIndex;let n=-1;for(const i of W.items)if(i.MgrType!==Ze.NotMgr&&(n++,n===s)){i.Show(W.dlg.className),W.MoveTop(i.name);break}};class qe{constructor(){this.name="",this.left="",this.top="",this.width="",this.height=""}copyTo(e){e.name=this.name,e.left=this.left,e.top=this.top,e.width=this.width,e.height=this.height}}class P{add(e){P.dlgElems.push(e)}AddDialogs(){P.dlgElems=new Array;const e=document.querySelectorAll("div");for(const t of e)t.style.zIndex!==""&&(parseInt(t.style.zIndex)>=P.ignoreIndex||t.querySelector("dialog")&&(console.log(`${t.id} added!`),this.add(t)))}AssignIndexies(){let e=P.dlgElems.length-1;for(const t of P.dlgElems)t.style.zIndex=`${e}`,e--}MoveLowestLayer(e){P.dlgElems.length;for(const t of P.dlgElems)if(t.id===e.id)t.style.zIndex="0";else{const s=t.style.zIndex;t.style.zIndex=`${parseInt(s)+1}`}}MoveHiestLayer(e){P.dlgElems.length;let t=-1;for(const s of P.dlgElems){const n=parseInt(s.style.zIndex);n>=P.ignoreIndex||n>t&&(t=n)}for(const s of P.dlgElems)if(s.id===e.id){s.style.zIndex=`${t}`;break}for(const s of P.dlgElems)if(s.id!==e.id){if(parseInt(s.style.zIndex)>=P.ignoreIndex)continue;t--,s.style.zIndex=`${t}`}}FindByName(e){const t=P.dlgElems.find(s=>s.id===e);return t||null}async ForEachAsync(e){for(const t of P.dlgElems)t.parentNode!==null&&await e(t.id)}ReOrder(){P.dlgElems.sort((e,t)=>{const s=e.style.zIndex,n=t.style.zIndex;if(s===""||n==="")throw new Error("z-index が未設定の要素が混入しています");return parseInt(t.style.zIndex)-parseInt(e.style.zIndex)})}async SaveSetting(e,t=!0){if(this.canSave&&e!==null&&e.parentElement!==null){if(t&&this.FindByName(e.parentElement.className)===null){console.log(`${e.className} is out of managed dlg`);return}await this.initSetting(),await P.setingAccess.saveDialogPos(e)}}async LoadAllSetting(){if(this.canSave){await this.initSetting();for(const e of P.dlgElems){const t=e.querySelector("dialog");t!==null&&await P.setingAccess.loadDialogPos(t)}}}async loadSetting(e){this.canSave&&(await this.initSetting(),e!==null&&await P.setingAccess.loadDialogPos(e))}async initSetting(){P.setingAccess===null&&(P.setingAccess=await zt())}get canSave(){return!new A().isDemo}}P.ignoreIndex=1e3;P.setingAccess=null;class Is{constructor(){this.isDragging=!1,this.startX=0,this.startY=0}attach(e,t){e.onpointerdown=s=>{e.setPointerCapture(s.pointerId),this.isDragging=!0,this.startX=s.clientX-t.offsetLeft,this.startY=s.clientY-t.offsetTop,e.style.cursor="grabbing"},e.onpointermove=s=>{if(!this.isDragging)return;const n=s.clientX-this.startX,i=s.clientY-this.startY;t.style.left=`${n}px`,t.style.top=`${i}px`,t.style.margin="0"},e.onpointerup=async s=>{this.isDragging=!1,e.releasePointerCapture(s.pointerId),e.style.cursor="grab",this.onMoveDone!==void 0&&await this.onMoveDone()}}}class Yn{constructor(){this.isDragging=!1,this.startX=0,this.startY=0,this.startW=0,this.startH=0,this.handleX=0,this.handleY=0}attach(e,t){e.onpointerdown=s=>{e.setPointerCapture(s.pointerId),this.isDragging=!0,this.startX=s.clientX,this.startY=s.clientY;const n=t.getBoundingClientRect();console.log(`[${t.className}] (${n.left},${n.top}) - (${n.width},${n.height})`),this.startW=n.width,this.startH=n.height,this.handleX=e.offsetLeft,this.handleY=e.offsetTop,e.style.cursor="grabbing"},e.onpointermove=s=>{if(!this.isDragging)return;const n=s.clientX-this.startX,i=s.clientY-this.startY;t.style.width=`${this.startW+n-e.clientWidth}px`,t.style.height=`${this.startH+i-e.clientHeight}px`,e.style.left=`${this.handleX+n}px`,e.style.top=`${this.handleY+i}px`,e.style.margin="0"},e.onpointerup=async s=>{if(this.isDragging=!1,e.releasePointerCapture(s.pointerId),e.style.cursor="grab",this.onResizeDone!==void 0){const n=t.getBoundingClientRect();await this.onResizeDone(`${n.width-this.startW}`,`${n.height-this.startH}`)}}}}const G={None:"None",Ok:"Ok",OkCancel:"OkCancel",YesNo:"YesNo",YesNoCancel:"YesNoCancel"},rt={None:"None",Ok:"Ok",Question:"Question"},F={None:"None",Ok:"Ok",Cancel:"Cancel",Yes:"Yes",No:"No",Secret:"Secret"};class $e{constructor(){this.parentName="evona-msg-box",this.buttonType=G.Ok,this.iconType=rt.None,this.title="Confirm",this.btnS="",this.SecretEnable=!1,this.btnAlign="right",this.btnOk="OK",this.btnCancel="Cancel",this.btnYes="Yes",this.btnNo="No",this.CheckVisible=!1,this.CheckText="",this.Checked=!1,this.Result=F.None,this.AuthVisible=!1,this.authText="",this.authTextMax=4,this.onS1Clicked=e=>{this.Result=F.Secret,this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB1Clicked=e=>{switch(this.buttonType){case G.None:this.Result=F.None;break;case G.Ok:this.Result=F.Ok;break;case G.OkCancel:this.Result=F.Ok;break;case G.YesNo:this.Result=F.Yes;break;case G.YesNoCancel:this.Result=F.Yes;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB2Clicked=e=>{switch(this.buttonType){case G.None:this.Result=F.None;break;case G.Ok:this.Result=F.None;break;case G.OkCancel:this.Result=F.Cancel;break;case G.YesNo:this.Result=F.No;break;case G.YesNoCancel:this.Result=F.No;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB3Clicked=e=>{switch(this.buttonType){case G.None:this.Result=F.None;break;case G.Ok:this.Result=F.None;break;case G.OkCancel:this.Result=F.Cancel;break;case G.YesNo:this.Result=F.No;break;case G.YesNoCancel:this.Result=F.Cancel;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onWindowKeyboard=e=>{e.key.length===1&&this.onAuthKeyProc(e.key)},this.onAuthButtonClicked=e=>{const t=e.target;t!==null&&this.onAuthKeyProc(t.textContent)}}get btnNameS(){return`${this.parentName}-s1`}get btnName1(){return`${this.parentName}-b1`}get btnName2(){return`${this.parentName}-b2`}get btnName3(){return`${this.parentName}-b3`}get chkName1(){return`${this.parentName}-chk1`}get authName1(){return`${this.parentName}-auth1`}get authBtnName(){return`${this.parentName}-authBtn`}setParent(e){this.parentName=`${e}-msg-box`}setTypes(e,t){this.buttonType=e,this.iconType=t}setOk(e=rt.Ok){this.setTypes(G.Ok,e)}setOkCancel(e=rt.Question){this.setTypes(G.OkCancel,e)}setYesNo(e=rt.Question){this.setTypes(G.YesNo,e)}setYesNoCancel(e=rt.Question){this.setTypes(G.YesNoCancel,e)}async showWait(e,t=null){return this.remove(),this.createUI(e,t===null?this.title:t,!0),new Promise(s=>{this.resolver=s;let n=!1,i=!1,o=!1;switch(this.buttonType){case G.None:break;case G.Ok:n=!0,i=!1,o=!1;break;case G.OkCancel:n=!0,i=!0,o=!1;break;case G.YesNo:n=!0,i=!0,o=!1;break;case G.YesNoCancel:n=!0,i=!0,o=!0;break}n&&document.getElementById(this.btnName1)?.addEventListener("click",this.onB1Clicked,{once:!0}),i&&document.getElementById(this.btnName2)?.addEventListener("click",this.onB2Clicked,{once:!0}),o&&document.getElementById(this.btnName3)?.addEventListener("click",this.onB3Clicked,{once:!0}),this.SecretEnable&&document.getElementById(this.btnNameS)?.addEventListener("click",this.onS1Clicked,{once:!0})})}onAuthKeyProc(e){if(this.authText.length<this.authTextMax&&/[a-zA-Z0-9]/.test(e)){this.authText+=e;const t=this.authText.length;let s="";for(let i=0;i<this.authTextMax;i++)i<t?s+="●":s+="○";const n=document.getElementById(this.authName1);n.innerText=s}if(this.authText.length>=this.authTextMax&&this.onAuthChecking!==void 0&&this.onAuthChecking(this.authText)){window.removeEventListener("keydown",this.onWindowKeyboard);for(let s=0;s<10;s++){const n=`${this.authBtnName}-b${s}`,i=document.querySelectorAll(`.${n}`);if(i.length!==1)continue;const o=i[0];o!==null&&o.removeEventListener("click",this.onAuthButtonClicked)}this.remove(),this.resolver&&this.resolver(this.Result)}}showNoWait(e,t="INFO"){this.remove(),this.createUI(e,t,!1)}showNoWaitEnd(){this.remove()}createUI(e,t,s){let n=`<button id="${this.btnNameS}" class="${this.btnNameS}">${this.btnS}</button>`,i="",o="",l="";switch(this.buttonType){case G.None:break;case G.Ok:i=`<button id="${this.btnName1}">${this.btnOk}</button>`,o="";break;case G.OkCancel:i=`<button id="${this.btnName1}">${this.btnOk}</button>`,o=`<button id="${this.btnName2}">${this.btnCancel}</button>`;break;case G.YesNo:i=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`;break;case G.YesNoCancel:i=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`,l=`<button id="${this.btnName3}">${this.btnCancel}</button>`;break}let a="";this.CheckVisible&&(a=`
<div style="padding: 5px 10px; font-size: 0.9em; text-align: left;">
    <label>
        <input type="checkbox" id="${this.chkName1}">${this.CheckText}
    </label>
</div>
`.trim());let r="";if(this.AuthVisible){let u="";for(let g=0;g<10;g++){const p=`${this.authBtnName}-b${g}`;u+=`<button class="${p}" id="${p}">${g}</button>`}r=`
<div style="padding: 5px 10px; font-size: 0.9em; text-align: left;">
    <label>
        <div class="${this.authName1}" id="${this.authName1}" tabindex="0">〇 〇 〇 〇</div>
    </label>
    ${u}
</div>
`.trim()}const c=`${a}${i}${o}${l}`,m=c!==""?`<div class="msg-footer">${c}</div>`:"",f=document.createElement("div");if(f.id=this.parentName,f.innerHTML=`
            <div class="msg-overlay">
                <div class="msg-panel">
                    <div class="msg-header">${t}${n}</div>
                    <div class="msg-body">${e}${r}</div>
                    ${m}
                </div>
            </div>
        `.trim(),this.applyCss(),document.body.appendChild(f),this.AuthVisible){document.getElementById(this.authName1).focus(),this.authText="",window.addEventListener("keydown",this.onWindowKeyboard);for(let g=0;g<10;g++){const p=`${this.authBtnName}-b${g}`,d=document.querySelectorAll(`.${p}`);if(d.length!==1)continue;const N=d[0];N!==null&&N.addEventListener("click",this.onAuthButtonClicked)}}}applyCss(){const e=`${this.parentName}-style`;if(document.getElementById(e))return;let t="";for(let n=0;n<10;n++){const i=`${this.authBtnName}-b${n}`;t+=`
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
`.trim(),document.head.appendChild(s)}setCheckResult(){const e=document.getElementById(this.chkName1);if(e!==null){const t=e.checked;this.Checked=t}}remove(){document.getElementById(this.btnName1)?.removeEventListener("click",this.onB1Clicked),document.getElementById(this.btnName2)?.removeEventListener("click",this.onB2Clicked),document.getElementById(this.btnName3)?.removeEventListener("click",this.onB3Clicked),document.getElementById(this.btnNameS)?.removeEventListener("click",this.onS1Clicked),document.getElementById(this.parentName)?.remove()}}class Xn{constructor(){this.intervalMs=1e3,this.isOneShot=!0,this.intervalTimer=null}start(e,t){this.intervalTimer!==null&&this.clear(),this.intervalTimer=setTimeout(async()=>{t!==void 0&&(await t(e)||this.clear()),this.isOneShot===!0&&this.clear()},this.intervalMs)}clear(){clearTimeout(this.intervalTimer),this.intervalTimer=null}}const ue={Resource:"Resource",ScoreUI:"ScoreUI",GameUI:"GameUI"},et={Sequence:"Sequence",Text:"Text"};class ks{constructor(){this.key="",this.text=""}static copy(e,t){t.key=e.key,t.text=e.text}}class Wt extends ks{constructor(){super(...arguments),this.comment=""}static copy(e,t){t.key=e.key,t.text=e.text,t.comment=e.comment}}class Kt extends ks{constructor(){super(...arguments),this.selectType=et.Sequence,this.start="",this.end="",this.step="",this.keyValue=""}static copy(e,t){t.key=e.key,t.text=e.text,t.selectType=e.selectType,t.start=e.start,t.end=e.end,t.step=e.step,t.keyValue=e.keyValue}get isScoreAvail(){if(this.key.trim().length===0||this.text.trim().length===0)return!1;if(this.selectType===et.Sequence){if(this.start.trim().length===0||this.end.trim().length===0||this.step.trim().length===0)return!1}else if(this.keyValue.trim().length===0)return!1;return!0}}class jt extends ks{constructor(){super(...arguments),this.formation="",this.nsEnable=!1,this.nsCombo="",this.nsScore="",this.gameEnable=!1,this.gameCombo="",this.gameScore=""}static copy(e,t){t.key=e.key,t.text=e.text,t.formation=e.formation,t.nsEnable=`${e.nsEnable}`!="",t.nsCombo=e.nsCombo,t.nsScore=e.nsScore,t.gameEnable=`${e.gameEnable}`!="",t.gameCombo=e.gameCombo,t.gameScore=e.gameScore}get nsComboAvail(){return this.nsEnable===!1||this.nsCombo.trim().length===0||this.nsScore.trim().length===0?0:parseInt(this.nsCombo.trim())}get gameComboAvail(){return this.gameEnable===!1||this.gameCombo.trim().length===0||this.gameScore.trim().length===0?0:parseInt(this.gameCombo.trim())}get nsComboScoreList(){let e=this.nsComboAvail;return e===0?new Map:this.toScoreMap(this.nsScore,e)}get gameComboScoreList(){let e=this.gameComboAvail;return e===0?new Map:this.toScoreMap(this.gameScore,e)}toScoreMap(e,t){const s=new Map,n=e.split(",");if(n.length===0)return s;for(const i of n){if(i.trim().length===0)continue;const o=parseInt(i);s.set(t,o),t++}return s}}function _n(){const h=(e,t)=>{const s=e;for(const n of s.inst){const i=new Wt;Wt.copy(n,i);const o=new Et;o.resItem=i,o.owner=t,t.itemList.push(o)}};return{gameType:Q.none,editorType:ue.Resource,logType:Re.ResourceEditAction,fromJsonText:fs.fromJsonText,logToItem:h}}function fn(){const h=(e,t)=>{const s=e;for(const n of s.inst){const i=new jt;jt.copy(n,i);const o=new Et;o.gameItem=i,o.owner=t,t.itemList.push(o)}};return{gameType:Q.none,editorType:ue.GameUI,logType:Re.GameEditAction,fromJsonText:gs.fromJsonText,logToItem:h}}function Qn(h){const e=(t,s)=>{const n=t;if(n.gameType===h)for(const i of n.inst){const o=new Kt;Kt.copy(i,o);const l=new Et;l.scItem=o,l.owner=s,s.itemList.push(l)}};return{gameType:h,editorType:ue.ScoreUI,logType:Re.ScoreEditAction,fromJsonText:ys.fromJsonText,logToItem:e}}class Et{constructor(){this.resItem=new Wt,this.gameItem=new jt,this.scItem=new Kt}}class $s{constructor(){this.gameType=Q.none,this.itemList=new Array,this.initNumItems=10}setConfig(e){e!==void 0&&(this.editorConfig=e,this.gameType=e.gameType)}async loadGameConfig(e){this.setConfig(fn()),await this.load(ue.GameUI,e);const t=this.itemList.filter(s=>s.gameItem.key===e);if(t.length!==0&&t[0].gameItem.key===e)return t[0].gameItem}setDefaultGameConfig(){this.init(),this.setDefaultGameConfigPq(),this.setDefaultGameConfigMm()}setDefaultGameConfigPq(){this.itemList[0].gameItem.key=Q.classPq,this.itemList[0].gameItem.text="ぷよクエ",this.itemList[0].gameItem.formation="5"}setDefaultGameConfigMm(){this.itemList[1].gameItem.key=Q.classMM,this.itemList[1].gameItem.text="メメントモリ",this.itemList[1].gameItem.formation="5"}init(){this.itemList=new Array;for(let e=0;e<this.initNumItems;e++){const t=new Et;t.owner=this,this.itemList.push(t)}}async load(e,t){const s=this.getEditor(e);if(s===void 0)return;const n=s.logType,o=await(await De()).get(n);if(o===null){e===ue.GameUI&&this.setDefaultGameConfig();return}const l=n,a=new Map,r=new Array;this.usingLog(l,o,a,r),this.itemList=new Array;for(const[c,m]of a){const f=s.fromJsonText(m.log);s.logToItem(f,this)}this.itemList.length===0&&this.init(),e===ue.GameUI&&(this.itemList[0].gameItem.key.length===0&&this.setDefaultGameConfigPq(),this.itemList[1].gameItem.key.length===0&&this.setDefaultGameConfigMm())}async loadUnused(e){const s=await(await De()).get(e);if(s===null)return null;const n=new Map,i=new Array;return this.usingLog(e,s,n,i),i}usingLog(e,t,s,n){if(this.editorConfig!==void 0)for(const i of t){let l=this.editorConfig.fromJsonText(i.log).logType,a=!1,r=!1;switch(l){case He.None:break;case He.Add:a=!0;break;case He.Update:a=!0;break;case He.Delete:a=!0,r=!0;break}if(a)if(r){if(s.has(e)){const c=s.get(e);n.push(c),s.delete(e)}}else{if(s.has(e)){const c=s.get(e);n.push(c),s.delete(e)}s.set(e,i)}}}getEditor(e){return this.editorConfig}get editorType(){return this.editorConfig?.editorType}}class Es{constructor(){this.gameType=Q.none}}function Zn(){function h(){return`${n()}-key`}function e(){return`${n()}-text`}function t(){return`${n()}-comment`}function s(){return`${n()}-delete`}function n(){return`${ue.Resource}-edit-table-row`}const i=(u,g,p,d)=>{const N=new se;N.value=g.resItem.key,N.placeholder="キー",d.getCell(u,p).typeInfo.setInput(N),d.getCell(u,p).className=h(),d.getCell(u,p).typeInfo.using.itemId=p+d.firstRowIndex},o=(u,g,p,d)=>{const N=new se;N.value=g.resItem.text,N.placeholder="文字列",d.getCell(u,p).typeInfo.setInput(N),d.getCell(u,p).className=e(),d.getCell(u,p).typeInfo.using.itemId=p+d.firstRowIndex},l=(u,g,p,d)=>{const N=new se;N.value=g.resItem.comment,N.placeholder="コメント",d.getCell(u,p).typeInfo.setInput(N),d.getCell(u,p).className=t(),d.getCell(u,p).typeInfo.using.itemId=p+d.firstRowIndex},a=(u,g,p,d)=>{d.getCell(u,p).typeInfo.setButton("削除"),d.getCell(u,p).className=s(),d.getCell(u,p).typeInfo.using.itemId=p+d.firstRowIndex},r=async(u,g,p)=>{const d=new fs;d.logType=He.Add;for(const M of p){const L=new Wt;for(const y of M.cells)for(const I of y.children){if(I.className===s())continue;const b=g.getElemValue(I)||"";switch(I.className){case h():L.key=b;break;case e():L.text=b;break;case t():L.comment=b;break}}d.inst.push(L)}const N=fs.toJsonText(d);await(await De()).put(Re.ResourceEditAction,N)},c=async(u,g)=>{switch(console.log(`classify = ${u.classify} targetId = ${u.targetId}`),u.classify){case s():const p=new $e;p.setParent(g.dlgCssClassName());let d=F.None;switch(p.setYesNo(),d=await p.showWait(`${u.targetId} を削除しますか？`),d){case F.Yes:break;case F.No:return;case F.Cancel:return}const N=parseInt(u.targetId);N>=1&&(g.table.deleteRow(N),g.table.redimAllRows(),g.itemList.splice(N-g.table.firstRowIndex,1));break}};function m(){return`
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
${gn()}
}
`.trim()}const f=new Es;return f.editItems=[{className:h(),colConfig:i},{className:e(),colConfig:o},{className:t(),colConfig:l},{className:s(),colConfig:a}],f.makeLog=r,f.onSelect=c,f.getCssText=m,f}function ei(){function h(){return`${a()}-key`}function e(){return`${a()}-text`}function t(){return`${a()}-select-type`}function s(){return`${a()}-seq-type-start`}function n(){return`${a()}-seq-type-end`}function i(){return`${a()}-seq-type-step`}function o(){return`${a()}-text-type`}function l(){return`${a()}-delete`}function a(){return`${ue.ScoreUI}-edit-table`}function r(){return`
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
${gn()}
}
`.trim()}const c=(y,I,b,w)=>{const T=new se;T.value=I.scItem.key,T.placeholder="キー",w.getCell(y,b).typeInfo.setInput(T),w.getCell(y,b).className=h(),w.getCell(y,b).typeInfo.using.itemId=b+w.firstRowIndex},m=(y,I,b,w)=>{const T=new se;T.value=I.scItem.text,T.placeholder="文字列",w.getCell(y,b).typeInfo.setInput(T),w.getCell(y,b).className=e(),w.getCell(y,b).typeInfo.using.itemId=b+w.firstRowIndex},f=(y,I,b,w)=>{const T=new Nt;T.selectionPair=[`連続/${et.Sequence}`,`文字列/${et.Text}`],T.selectedItem=I.scItem.selectType,T.classify="selectType",w.getCell(y,b).typeInfo.setCombo(T),w.getCell(y,b).className=t(),w.getCell(y,b).typeInfo.using.itemId=b+w.firstRowIndex},u=(y,I,b,w)=>{const T=new se;T.value=I.scItem.start,T.placeholder="開始",T.disableKeyDown=!0,T.enableClicked=!0,w.getCell(y,b).typeInfo.setInput(T),w.getCell(y,b).className=s(),w.getCell(y,b).typeInfo.using.itemId=b+w.firstRowIndex},g=(y,I,b,w)=>{const T=new se;T.value=I.scItem.end,T.placeholder="終了",T.disableKeyDown=!0,T.enableClicked=!0,w.getCell(y,b).typeInfo.setInput(T),w.getCell(y,b).className=n(),w.getCell(y,b).typeInfo.using.itemId=b+w.firstRowIndex},p=(y,I,b,w)=>{const T=new se;T.value=I.scItem.step,T.placeholder="ステップ",T.disableKeyDown=!0,T.enableClicked=!0,w.getCell(y,b).typeInfo.setInput(T),w.getCell(y,b).className=i(),w.getCell(y,b).typeInfo.using.itemId=b+w.firstRowIndex},d=(y,I,b,w)=>{const T=new se;T.value=I.scItem.keyValue,T.placeholder="key/valueを&quot;,&quot;で区切った文字列",T.disableKeyDown=!0,T.enableClicked=!0,w.getCell(y,b).typeInfo.setInput(T),w.getCell(y,b).className=o(),w.getCell(y,b).typeInfo.using.itemId=b+w.firstRowIndex},N=(y,I,b,w)=>{w.getCell(y,b).typeInfo.setButton("削除"),w.getCell(y,b).className=l(),w.getCell(y,b).typeInfo.using.itemId=b+w.firstRowIndex},x=async(y,I,b)=>{const w=new ys;w.logType=He.Add,w.gameType=y;for(const ce of b){const Z=new Kt;for(const X of ce.cells)for(const le of X.children){if(le.className===l())continue;const _=I.getElemValue(le)||"";switch(le.className){case h():Z.key=_;break;case e():Z.text=_;break;case t():Z.selectType=_;break;case s():Z.start=_;break;case n():Z.end=_;break;case i():Z.step=_;break;case o():Z.keyValue=_;break}}w.inst.push(Z)}const T=ys.toJsonText(w);await(await De()).put(Re.ScoreEditAction,T)},M=async(y,I)=>{switch(console.log(`classify = ${y.classify} targetId = ${y.targetId}`),y.classify){case h():await I.showUpDn(y,si());break;case s():await I.showUpDn(y,cs());break;case n():await I.showUpDn(y,cs());break;case i():await I.showUpDn(y,cs());break;case o():await I.showMiniTableEditor(y,me.KeyValue,_e.asNumber,"スコアキー","スコア値");break;case l():const b=new $e;b.setParent(I.dlgCssClassName());let w=F.None;switch(b.setYesNo(),w=await b.showWait(`${y.targetId} を削除しますか？`),w){case F.Yes:break;case F.No:return;case F.Cancel:return}const T=parseInt(y.targetId);T>=1&&(I.table.deleteRow(T),I.table.redimAllRows(),I.itemList.splice(T-I.table.firstRowIndex,1));break}},L=new Es;return L.editItems=[{className:h(),colConfig:c},{className:e(),colConfig:m},{className:t(),colConfig:f},{className:s(),colConfig:u},{className:n(),colConfig:g},{className:i(),colConfig:p},{className:o(),colConfig:d},{className:l(),colConfig:N}],L.makeLog=x,L.onSelect=M,L.getCssText=r,L}function ti(){function h(){return`${a()}-name`}function e(){return`${a()}-form`}function t(){return`${a()}-ns-enable`}function s(){return`${a()}-ns-combo`}function n(){return`${a()}-ns-score`}function i(){return`${a()}-game-enable`}function o(){return`${a()}-game-combo`}function l(){return`${a()}-game-score`}function a(){return`${ue.GameUI}-edit-table`}const r=(y,I,b,w)=>{const T=new se;T.value=I.gameItem.text,T.placeholder="ゲーム名",w.getCell(y,b).typeInfo.setInput(T),w.getCell(y,b).className=h(),w.getCell(y,b).typeInfo.using.itemId=b+w.firstRowIndex},c=(y,I,b,w)=>{const T=new se;T.value=I.gameItem.formation,T.placeholder="編成数",T.disableKeyDown=!0,T.enableClicked=!0,w.getCell(y,b).typeInfo.setInput(T),w.getCell(y,b).className=e(),w.getCell(y,b).typeInfo.using.itemId=b+w.firstRowIndex},m=(y,I,b,w)=>{const T=new ps;T.value=I.gameItem.nsEnable,T.placeholder="NS有効",w.getCell(y,b).typeInfo.setCheck(T),w.getCell(y,b).className=t(),w.getCell(y,b).typeInfo.using.itemId=b+w.firstRowIndex,w.getCell(y,b).typeInfo.toolTip="N<br>S"},f=(y,I,b,w)=>{const T=new se;T.value=I.gameItem.nsCombo,T.placeholder="コンボ数",T.disableKeyDown=!0,T.enableClicked=!0,w.getCell(y,b).typeInfo.setInput(T),w.getCell(y,b).className=s(),w.getCell(y,b).typeInfo.using.itemId=b+w.firstRowIndex,w.getCell(y,b).typeInfo.toolTip="NSコンボ数"},u=(y,I,b,w)=>{const T=new se;T.value=I.gameItem.nsScore,T.placeholder="NSコンボ加点",T.disableKeyDown=!0,T.enableClicked=!0,w.getCell(y,b).typeInfo.setInput(T),w.getCell(y,b).className=n(),w.getCell(y,b).typeInfo.using.itemId=b+w.firstRowIndex,w.getCell(y,b).typeInfo.toolTip=`NSコンボ加点
(コンボ数毎の加点を,で区切って入力)`},g=(y,I,b,w)=>{const T=new ps;T.value=I.gameItem.gameEnable,T.placeholder="GM有効",w.getCell(y,b).typeInfo.setCheck(T),w.getCell(y,b).className=i(),w.getCell(y,b).typeInfo.using.itemId=b+w.firstRowIndex,w.getCell(y,b).typeInfo.toolTip="G<br>M"},p=(y,I,b,w)=>{const T=new se;T.value=I.gameItem.gameCombo,T.placeholder="コンボ数",T.disableKeyDown=!0,T.enableClicked=!0,w.getCell(y,b).typeInfo.setInput(T),w.getCell(y,b).className=o(),w.getCell(y,b).typeInfo.using.itemId=b+w.firstRowIndex,w.getCell(y,b).typeInfo.toolTip="GMコンボ数"},d=(y,I,b,w)=>{const T=new se;T.value=I.gameItem.gameScore,T.placeholder="GMコンボ加点",T.disableKeyDown=!0,T.enableClicked=!0,w.getCell(y,b).typeInfo.setInput(T),w.getCell(y,b).className=l(),w.getCell(y,b).typeInfo.using.itemId=b+w.firstRowIndex,w.getCell(y,b).typeInfo.toolTip=`GMコンボ加点
(コンボ数毎の加点を,で区切って入力)`},N=async(y,I,b)=>{const w=new gs;w.logType=He.Add;let T=0;for(const Z of b){const X=new jt;for(const le of Z.cells)for(const _ of le.children){const ee=I.getElemValue(_)||"";switch(I.findInputElem(_).className){case h():X.text=ee;break;case e():X.formation=ee;break;case t():X.nsEnable=ee;break;case s():X.nsCombo=ee;break;case n():X.nsScore=ee;break;case i():X.gameEnable=ee;break;case o():X.gameCombo=ee;break;case l():X.gameScore=ee;break}}switch(T){case 0:X.key=Q.classPq;break;case 1:X.key=Q.classMM;break}T++,console.log(X),w.inst.push(X)}const Y=gs.toJsonText(w);await(await De()).put(Re.GameEditAction,Y)},x=async(y,I)=>{switch(console.log(`classify = ${y.classify} targetId = ${y.targetId}`),y.classify){case e():await I.showNumpad(y,1);break;case s():await I.showNumpad(y,1);break;case n():await I.showMiniTableEditor(y,me.Text,_e.asNumber,"","NSコンボ加点");break;case o():await I.showNumpad(y,1);break;case l():await I.showMiniTableEditor(y,me.Text,_e.asNumber,"","ゲームコンボ加点");break}};function M(){const y=`${t()}`,I=`${i()}`;return`
.${h()} {
height: 90%;
width: 100px;
}
.${e()} {
height: 90%;
width: 40px;
}

.${y} {
height: 90%;
}
${E.sliderText(y,"65")}
.${s()} {
height: 90%;
width: 40px;
}
.${n()} {
height: 90%;
width: 100px;
}

.${I} {
height: 90%;
}
${E.sliderText(I,"65")}
.${o()} {
height: 90%;
width: 40px;
}
.${l()} {
height: 90%;
width: 100px;
}
`.trim()}const L=new Es;return L.editItems=[{className:h(),colConfig:r},{className:e(),colConfig:c},{className:t(),colConfig:m},{className:s(),colConfig:f},{className:n(),colConfig:u},{className:i(),colConfig:g},{className:o(),colConfig:p},{className:l(),colConfig:d}],L.makeLog=N,L.onSelect=x,L.getCssText=M,L}function gn(){return`
width: 100%;
height: 100%;
white-space: nowrap;
background: #e91e63; /* ピンクがかった赤（ポップな警告色） */
color: white;
border-radius: 4px;
padding: 4px 12px;
`.trim()}function si(){const h=Object.values(B),e=new Array;for(const t of h){const s=t;e.push(`${s}/${s}`)}return e}function cs(){const h=new Array;h.push("1/1");for(let e=1;e<=30;e++){const t=`${e*10}`;h.push(`${t}/${t}`)}return h}class ms extends $s{constructor(){super(...arguments),this.uiInfo=new qe,this.canAdd=!0,this.parentName="",this.saveTimer=null,this.onAutoSave=async e=>(console.log(`${e.parentName}`),!1),this.updn=null,this.numpad=null,this.miniEdit=null,this.numTableFooterName="numTableFooter",this.onOkClickNumTable=async e=>{if(this.miniEdit!==null){const t=this.miniEdit.editedResult();if(t!==void 0){const s=this.table.getCallerCellElem(this.miniEdit.callerName);if(s!==null){const n=s;n.value=t}}}this.closeNumTable()},this.onCancelClickNumTable=async e=>{this.closeNumTable()},this.isEnableWindowEvent=!1,this.onWindowKeyboard=e=>{e.key===mt.Escape&&this.isEnableWindowEvent&&(this.disableWindowEvent(),this.closeUpDn(),this.closeNumpad())},this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new P().SaveSetting(e),this.requestActivate!==void 0&&await this.requestActivate(e)},this.resizerOnResizeDone=async(e,t,s)=>{console.log(`[${e.className}] resized (${t}, ${s})`);const n=parseInt(s),i=document.getElementById(this.dlgContentCssClassName());if(i!==null){i.style.width===""?i.offsetWidth:parseInt(i.style.width),i.style.maxWidth="none";const o=i.style.height===""?i.offsetHeight:parseInt(i.style.height);i.style.maxHeight="none",i.style.height=`${o+n}px`;const l=i.querySelectorAll(`.${this.tableCssClassName()}`);if(l!==null){const a=l[0],r=a.style.height===""?a.offsetHeight:parseInt(a.style.height);a.style.maxHeight="none",a.style.height=`${r+n}px`}}},this.onCopyPaste=async(e,t)=>{switch(console.log(`[${e.className}] selected [${t}]`),t){case xe.Copy:await this.table.toClipboard();break;case xe.Paste:await this.table.fromClipboard();break}}}async startAutoSave(){this.saveTimer=new Xn,this.saveTimer.intervalMs=1e3,this.saveTimer.isOneShot=!1,this.saveTimer.start(this,this.onAutoSave)}setRow(e,t,s){const n=this.config.editItems;if(n===void 0)return;let i=-1;for(const o of n)i++,o.colConfig(i,e,t,s)}toHTML(e){if(!this.itemList)return"";e.gameType=this.gameType,this.config=e;const s=e.editItems.length,n=new K;if(this.itemList.length>=1)n.makeDim(s,this.itemList.length),this.itemList.forEach((a,r)=>{this.setRow(a,r,n)}),n.makeRowTemplate(this.tableRowCssClassName()),this.table=n;else{n.makeDim(s,1);const a=new Et;this.setRow(a,0,n),n.makeRowTemplate(this.tableRowCssClassName()),n.clearRows(),this.table=n}const i=this.tableCssClassName(),o=this.table.ToScrollHTML(i,i);this.htmlMaker=new A;const l=new ne;return l.props.name="",l.props.id=i,l.props.className=i,l.props.option.setTable(o),l.props.option.onSelect=async a=>{console.log(`classify = ${a.classify} targetId = ${a.targetId}`),this.config.onSelect(a,this)},this.htmlMaker.add(l),this.htmlMaker.ToHTML()}checkValidStatus(e){return Object.values(B).find(n=>e)!==void 0}async showUpDn(e,t){if(e.KeyEnter===Te.Special||e.eventType===Ve.Click){if(this.updn!==null)return;const n=this.table.getScrollCellRect(e.parentElem),i=this.table.makeCallerName(e.classify,e.targetId),o=this.table.getCallerCellElem(i);let l="";o!==null&&(l=o.value);const a=new Un;a.setListener("updn",this.dlgContentCssClassName(),i),a.setSelectedByValue(l,t),a.applyCss(),a.show(n.left,n.top),a.enableEvents(r=>{console.log(`[onApply] ${r.callerName} ${r.result}`);const c=this.table.getCallerCellElem(r.callerName);if(c!==null){const m=c;m.value=r.result}this.closeUpDn()},r=>{console.log(`[onUp] ${r.callerName} ${r.result}`)},r=>{console.log(`[onDown] ${r.callerName} ${r.result}`)}),this.enableWindowEvent(),this.updn=a}}closeUpDn(){this.disableWindowEvent(),this.updn!==null&&(this.updn.dispose(),this.updn=null)}async showNumpad(e,t){if(e.KeyEnter===Te.Special||e.eventType===Ve.Click){if(this.numpad!==null)return;const n=this.table.getScrollCellRect(e.parentElem),i=this.table.makeCallerName(e.classify,e.targetId),o=this.table.getCallerCellElem(i);let l="";o!==null&&(l=o.value);const a=new un;a.setNum(l),a.maxDig=t,a.setListener("numpad",this.dlgContentCssClassName(),i),a.applyCss(),a.show(n.left,n.top),a.enableEvents(r=>{console.log(`[onApply] ${r.callerName} ${r.result}`);const c=this.table.getCallerCellElem(r.callerName);if(c!==null){const m=c;m.value=r.result}this.closeNumpad()}),this.enableWindowEvent(),this.numpad=a,this.setB2Allow(!1)}}closeNumpad(){this.disableWindowEvent(),this.setB2Allow(!0),this.numpad!==null&&(this.numpad.dispose(),this.numpad=null)}async showMiniTableEditor(e,t,s,n,i){if(e.KeyEnter===Te.Special||e.eventType===Ve.Click){if(this.miniEdit!==null)return;const l=this.table.getScrollCellRect(e.parentElem),a=this.table.makeCallerName(e.classify,e.targetId),r=this.table.getCallerCellElem(a);let c="";r!==null&&(c=r.value);const m=`${a}-numTable`,f=`${this.numTableFooterName}-${a}`,u=new Vn;if(t===me.KeyValue?u.setKeyValuePairs(c):u.setTexts(c),u.setValueType(5,s),u.keyToolTip=n,u.valueToolTip=i,u.setListener(m,this.dlgContentCssClassName(),a,"",f),u.applyCss(),u.show(l.left,l.top),u.enableEvents(g=>{console.log(`[onApply] ${g.callerName} ${g.result}`)}),this.miniEdit=u,this.miniEdit.footerElem!==null){let g=`
<button id="${f}-okBtn">OK</button>
<button id="${f}-canBtn">CANCEL</button>
`.trim();this.miniEdit.footerElem.innerHTML=g,document.getElementById(`${f}-okBtn`).onclick=this.onOkClickNumTable,document.getElementById(`${f}-canBtn`).onclick=this.onCancelClickNumTable}this.enableWindowEvent(),this.setB2Allow(!1)}}closeNumTable(){this.disableWindowEvent(),this.setB2Allow(!0),this.miniEdit!==null&&(this.miniEdit.dispose(),this.miniEdit=null)}createEditorBox(e,t,s){this.parentName=t;let n="";this.canAdd&&(n=`<button id="${this.rowAddCssClassName()}">追加</button>`);const i=this.htmlMaker.MakeDefaultButtonsHTML(`
${n}
<button id="${this.applyCssClassName()}">保存</button>
`),o=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
   ${i}
   ${s}
</div>`,l=new Ce;l.title="<"+e+">",l.SetB2Type(Ge.CopyPaste,this.onCopyPaste),l.SetB4Type(Ae.DialogHide);const a=l.NewDialog(t,this.dlgCssClassName());return l.SetContent(t,o,!1),this.applyCss(),l.EnableEventHandlers(),l.onMoveDone=this.moverOnMoveDone,this.dialogDesc=l,a}addEventHandlers(e){const t=document.getElementById(this.rowAddCssClassName());t!==null&&(t.onclick=async()=>{if(await this.confirmMsgBox("行を追加しますか？")===!1)return;const n=this.tableRowCssClassName();this.table.addRow(n)}),document.getElementById(this.applyCssClassName()).onclick=async()=>{if(await this.confirmMsgBox("保存しますか？")===!1)return;const n=this.table.getRowElems();n!==null&&(await this.config.makeLog(this.config.gameType,this.table,n),this.onSaved!==void 0&&await this.onSaved(this))}}enableWindowEvent(){return this.isEnableWindowEvent?!1:(this.isEnableWindowEvent=!0,window.addEventListener("keydown",this.onWindowKeyboard),!0)}disableWindowEvent(){return this.isEnableWindowEvent?(window.removeEventListener("keydown",this.onWindowKeyboard),this.isEnableWindowEvent=!1,!0):!1}addItemEventHandlers(){this.htmlMaker.enableTableEvents(this.tableCssClassName())}enableResize(){this.dialogDesc.onResizeDone=this.resizerOnResizeDone,this.dialogDesc.EnableResize()}setB2Allow(e=!0){this.dialogDesc.setB2Allow(e)}async confirmMsgBox(e){const t=new $e;t.setParent(this.dlgCssClassName());let s=F.None;switch(t.setYesNo(),s=await t.showWait(e),s){case F.Yes:break;case F.No:return!1;case F.Cancel:return!1}return!0}rowAddCssClassName(){return`${this.editorType}-edit-add`}applyCssClassName(){return`${this.editorType}-edit-apply`}tableRowCssClassName(){return`${this.editorType}-edit-table-row`}tableCssClassName(){return`${this.editorType}-edit-table`}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return`${this.editorType}-edit-dlg`}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=this.uiInfo.height!==""?parseInt(this.uiInfo.height):400,n=this.tableCssClassName(),i=document.createElement("style");i.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,e,t)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgContentCssClassName()} {
width: 100%;
max-width: 640px;
margin: 0 0;    /*左上位置固定*/
}
${this.table.MakeTableScrollCss(n,s,!0)}
.${n} {
${E.spacingTable}
}
.${n} tr {
${E.spacingTr}
}
${this.config.getCssText()}
${this.htmlMaker.MakeDefaultButtonsCss()}

/*ミニエディタのボタン*/
[class^="${this.numTableFooterName}"] {
${E.footerText()}
}
[class^="${this.numTableFooterName}"] button {
${E.footerButtonText()}
}
`.trim(),document.head.appendChild(i);const o=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,o)}}const He={None:"None",Add:"Add",Delete:"Delete",Update:"Update"};class Ss{constructor(){this.logType=He.None}}class fs extends Ss{constructor(){super(...arguments),this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class gs extends Ss{constructor(){super(...arguments),this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class ys extends Ss{constructor(){super(...arguments),this.gameType=Q.none,this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class ni{constructor(){this.channel="defaultChannel",this.started=!1,this.onMessage=e=>{console.log(e),this.receiveEventArg=e,this.onNotify!==void 0&&this.onNotify(this)}}Start(){return this.started?!1:(this.bc=new BroadcastChannel(this.channel),this.bc.onmessage=this.onMessage,this.started=!0,!0)}Stop(){this.started&&this.bc.close(),this.started=!1}notifyBool(e){this.started&&this.bc.postMessage(`${e}`)}get receivedBool(){return this.receiveEventArg===void 0||this.receiveEventArg.data===void 0?null:this.receiveEventArg.data==="true"}}const Ne={None:"None",Full:"Full",Limit:"Limit",NotRun:"NotRun"},gt={Undef:"Undef",True:"True",False:"False"},Ke={Undef:"Undef",Qiita:"Qiita",Line:"Line"};class St{constructor(){this.qiitaRepository="https://puyon7676.github.io/",this.localRepository="http://localhost:8000/",this.qiitaImageRepository=`${this.qiitaRepository}GameImages/`,this.localImageRepository=`${this.localRepository}`,this.imageHome="",this.user1Home="./User1/",this.user2Home="./User2/",this.currentUserHome="",this.appHref="",this.isLocal=!1,this.admin=!1,this.cmd="",this.edit=Q.none,this.evonaType=Ne.None,this.aslocal=gt.Undef,this.coming=Ke.Undef,this.dataBasePath="../キャラパースデータ",this.statusJsonPath="",this.zipPrefix="",this.chListFile="",this.chStatusListFile="",this.charStatusZip="./CharStatus.zip",this.nodeToolsImportFilename="./nodeTools.js",this.bc=new ni,this.onNotifyBcHelper=async e=>{console.log("onNotifyBcHelper"),this.onGameConfigChanged!==void 0&&await this.onGameConfigChanged(e)},this.envUrlKey="EnvUrlType",this.envWallpaperKey="EnvWallpaperType",this.envUrlType=ge.Local,this.envWallpaperType=Ut.WP1}setImageHome(e){if(this.isLocal=e,e)this.imageHome=`${this.currentUserHome}Image/`;else{let t=this.currentUserHome;t.substring(0,2)==="./"&&(t=t.substring(2)),this.imageHome=`${this.qiitaImageRepository}${t}`}}applyImageHome(){let e=this.currentUserHome;switch(e.substring(0,2)==="./"&&(e=e.substring(2)),this.envUrlType){case ge.Local:break;case ge.GitHub:this.imageHome=`${this.qiitaImageRepository}${e}`;break;case ge.GitHubLocal:this.imageHome=`${this.localImageRepository}${e}Image/`;const t=`${this.localImageRepository}${e}`;this.chListFile=t,this.chStatusListFile=t;break}}setUser(e){this.currentUserHome=e}initDataPath(e){e===this.user1Home&&(this.statusJsonPath=`${this.dataBasePath}/ぷよクエ_詳細JSON`,this.zipPrefix="puyoQue_",this.chListFile=`${e}chListFile_puyo.json`,this.chStatusListFile=`${e}puyoQue_CharStatus.zip`),e===this.user2Home&&(this.statusJsonPath=`${this.dataBasePath}/メメントモリ_詳細JSON`,this.zipPrefix="memeMori_",this.chListFile=`${e}chListFile_meme.json`,this.chStatusListFile=`${e}memeMori_CharStatus.zip`)}get gameType(){return this.currentUserHome===this.user1Home,Q.classPq}get gameTitle(){return this.edit!==Q.none?`エディタ(${this.edit})`:this.gameType===Q.classPq?"ぷよクエ":"メメントモリ"}setBrowserTitle(){const e=this.gameTitle;document.head.title=e;for(const t of document.head.children)t.nodeName==="TITLE"&&(t.innerHTML=`EvoNa：${e} モード`);return e}get editorURL(){return`${this.appHref}?edit=${this.gameType}`}get isWebRunning(){return!(typeof document>"u")}parseURLParams(){if(!this.isWebRunning){console.log("cannot parse URL params!");return}const e=new URLSearchParams(window.location.search);for(const[t,s]of e)switch(t.trim()){case"user":const n=s.trim();this.setUser(n==="1"?this.user1Home:this.user2Home);break;case"debug":break;case"admin":this.admin=s.trim()==="true";break;case"cmd":this.cmd=s;break;case"edit":this.edit=s.trim()===Q.classMM?Q.classMM:Q.classPq;break;case"aslocal":this.aslocal=s.trim()==="true"?gt.True:gt.False;break;case"coming":switch(s.trim()){case Ke.Qiita:this.coming=Ke.Qiita;break;case Ke.Line:this.coming=Ke.Line;break}break}}get availComing(){return this.coming!==Ke.Undef}async loadGameConfig(e){const t=new $s,s=await t.loadGameConfig(e);if(s!==void 0)return s;t.setDefaultGameConfig();const n=t.itemList.filter(i=>i.gameItem.key===e);return n.length===1?n[0].gameItem:void 0}startBcHelper(){console.log("startBcHelper"),this.bc.Start(),this.bc.onNotify=this.onNotifyBcHelper}stopBcHelper(){console.log("stopBcHelper"),this.bc.Stop()}notifyGameConfigChanged(){console.log("notifyGameConfigChanged"),this.bc.notifyBool(!0)}async loadEnvSetting(){const t=await(await zt()).loadEnv();for(const s of t){const[n,i]=s.split("=");switch(n){case this.envUrlKey:this.envUrlType=i;break;case this.envWallpaperKey:this.envWallpaperType=i;break}}}async saveEnvSetting(){const e=new Array;e.push(`${this.envUrlKey}=${this.envUrlType}`),e.push(`${this.envWallpaperKey}=${this.envWallpaperType}`),await(await zt()).saveEnv(e)}replaceWallpaper(e){const t=Date.now(),s=`./${e}?v=${t}`,n=document.body.style;n.backgroundImage=`url('${s}')`}async loadJson(e){return console.log(`[loadJson] file=[${e}]`),await this._loadJson(e)}async _loadJson(e){if(this.isWebRunning){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`HTTPエラー! ステータス: ${t.status}`);return await t.json()}else{const{loadJsonNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async saveJson(e,t){const s=JSON.stringify(t);if(this.isWebRunning){const n=new Blob([s],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=e,o.click()}else{const{saveJsonNode:n}=await import(this.nodeToolsImportFilename);return n(e,t)}}async loadBinFile(e){if(this.isWebRunning)return await(await fetch(e)).blob();{const{readBinNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async getDoc(e){let t,s;if(this.isWebRunning)t=new DOMParser,s=t.parseFromString(e,"text/html");else{const{createHtmlParserNode:n}=await import(this.nodeToolsImportFilename);t=n(e),s=t.parseFromString(e,"text/html")}return s}}class ie{static async put(e){const t=ie.encodeEnable?await ie.encode(e):e;try{await navigator.clipboard.writeText(t)}catch(s){return console.error("コピー失敗...",s),!1}return!0}static async get(){let e="";try{e=await navigator.clipboard.readText()}catch(t){return console.error("ペースト失敗...",t),null}return ie.encodeEnable?await ie.decode(e):e}static async encode(e){const t=ie.getEncoder(),s=ie.storeFile;return t.file(s,e),await t.generateAsync({type:"base64",compression:"DEFLATE",compressionOptions:{level:9}})}static async decode(e){const t=ie.getEncoder(),s=ie.storeFile;try{return await(await t.loadAsync(e,{base64:!0})).file(s).async("string")}catch(n){return console.error("デコード失敗...",n),null}}static getEncoder(){return new window.JSZip}}ie.encodeEnable=!0;ie.storeFile="form.json";async function ii(h){const e=h.cmd.split(":");let t=!1;switch(e[0]){case"drop":t=oi();break;case"ref":t=document.referrer;break}const s=`[${h.cmd}] res=${t}`;alert(s)}async function oi(){const h=new ds;return await h.setup(),await h.dropDb()}const je={plus:"plus.png",win:"win.png",even:"even.png",lost:"lost.png",demo:"demo.png"};class li{constructor(){this.imageHome="",this.cache=new Map,this.cacheNs=new Map,this.zip=null,this.zipNs=new Map,this.isMultiZip=!1,this.materials=[{ns:"",fileName:je.plus},{ns:"",fileName:je.win},{ns:"",fileName:je.even},{ns:"",fileName:je.lost},{ns:"",fileName:je.demo}],this.AnyNs=""}get demoMaterial(){return je.demo}async setupNs(e,t,s){const n=s.findByNs(e);if(n!==void 0){this.imageHome=t.imageHome;for(const i of n){const o=i.iconFileName,l=`${this.imageHome}${e}/${o}`;this.cache.set(o,l),this.cacheNs.set(o,e)}this.isMultiZip=!0;for(const i of this.materials){const o=i.fileName,l=`${this.imageHome}${o}`;this.cache.set(o,l),this.cacheNs.set(o,e)}}}async checkExists(e){try{return(await fetch(e,{method:"HEAD"})).ok}catch{return!1}}isMaterial(e){return this.materials.find(s=>s.fileName.includes(e))!==void 0}get loaded(){return this.isMultiZip?this.zipNs.size!==0:this.zip!==null}async _loadZipBy(e,t){const s=new St;this.imageHome=s.imageHome.substring(2);const n=await s.loadBinFile(e);let i=null;if(s.isWebRunning)i=await window.JSZip.loadAsync(n);else{const{loadZipNode:o}=await import(s.nodeToolsImportFilename);i=await o(n)}this.zipNs.set(t,i),this.isMultiZip=!0}async getImageUrlBy(e,t){if(this.isMaterial(e))return`${this.imageHome}${e}`;if(this.cache.has(e)){const n=this.cache.get(e);if(!await this.checkExists(n)){const o=`${this.imageHome}notexist.png`;this.cache.set(e,o)}return this.cache.get(e)}return null}async findNs(e){if(!this.isMultiZip)return null;if(this.cacheNs.has(e)){const t=this.cacheNs.get(e);if(t!==void 0)return t}return null}dispose(){for(const e of this.cache.values())URL.revokeObjectURL(e);this.cache.clear()}}class ve{get iconFileName(){return this.id===null&&!Number.isNaN(this.id)?`${this.name}_${this.idAsText}.png`:`${this.name}_${this.id}.png`}constructor(e=0,t=""){this.ns=O.None,this.id=0,this.name="",this.contentURL="",this.iconURL="",this.idAsText="",this.idAttributeForHTML="",this.id=e,this.name=t}parseFromImgName(e){let t=e.indexOf("_");if(t>=0){const s=e.substring(0,t);let n=e.substring(t+1);if(t=n.indexOf("."),t>=0)return n=n.substring(0,t),this.id=Number.parseInt(n),this.name=s,this.idAsText=Number.isNaN(this.id)?n:"",!0}return!1}static copy(e,t){t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t.idAsText=e.idAsText,t.idAttributeForHTML=e.idAttributeForHTML}}class ai{constructor(){this.itemName="",this.chNames=new Array,this.index=-1}reset(){this.itemName="",this.chNames=new Array,this.index=-1,this.onScroll=null}toCombo(e,t,s){this.reset();const n=`.${e}`,i=document.querySelectorAll(`${n} div[title*="${s}"]`);let o=-1,l="";for(const r of i){const c=r;if(c.parentElement.style.display==="none")continue;o++;const m=c.title.trim(),f=m,g=`
 <option value="${m}"${o===0?" selected":""}>${f}</option>
`.trim();l+=g,this.chNames.push(f)}if(o===-1)return null;const a=document.createElement("select");return a.id=t,a.className=t,a.innerHTML=l,this.itemName=e,a}addEvent(e,t){e.addEventListener("change",s=>{const i=s.target.value;this.chNames.find(l=>l===i)&&this.scrollAction(i)}),this.onScroll=t}findFirst(){return this.chNames.length===0?!1:(this.index=0,this.scrollAction(this.chNames[this.index]),!0)}scroll(e){const t=`.${this.itemName}`,s=document.querySelector(`${t} div[title="${e}"]`);if(s===null)return null;const n=s.closest(t);return n===null?null:(n.scrollIntoView({behavior:"smooth",block:"center"}),s)}scrollAction(e){const t=this.scroll(e);t&&this.onScroll!==null&&this.onScroll(t)}}class vs{async LoadList(e){const n=(await new St().loadJson(e)).map(o=>Object.assign(new ve,o)),i=new vs;return i.chList=n,i}findNs(e){const t=this.chList.find(s=>s.id===e);return t?t.ns:O.None}findByNs(e){return e===O.None?void 0:this.chList.filter(s=>s.ns===e)}MakeList(){}}class ri{constructor(){this.uiInfo=new qe,this.charFinder=new ai,this.parentName="",this.option=void 0,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new P().SaveSetting(e),this.requestActivate!==void 0&&await this.requestActivate(e)},this.onVisibleToggle=async(e,t)=>{if(console.log("**onVisibleToggle**"),this.option!==void 0){this.option.SetVisible(!this.option.GetVisible());return}},this.nsFilter=[O.None,O.None],this.gmFilter=[],this.onNsOptionChanged=async(e,t)=>{this.option!==void 0&&(this.nsFilter=[e.typeInfo.using.radio.selectedItem,t.typeInfo.using.radio.selectedItem],console.log("**onNsOptionChanged**",this.nsFilter),this.charFilter())},this.onGmOptionChanged=async e=>{if(this.option!==void 0){this.gmFilter=new Array;for(const t of e){if(t.typeInfo.using.itemType!==R.Radio)continue;const s=t.typeInfo.using.radio;if(s.selectedItems.length!==0)for(const n of s.selectionPair){const[i,o]=n.split("/");s.selectedItems.find(a=>a===o)!==void 0&&this.gmFilter.push(i)}}console.log("**onGmOptionChanged**",this.gmFilter),this.charFilter()}}}async toHTML(e){if(!this.chSet.chList)return"";this.htmlMaker=new A;let t=0;for(const s of this.chSet.chList){t++;const n=`chuid${t}`;s.idAttributeForHTML=n;const i="",o=new Zt;o.imgSrc=i,o.imgFile=s.iconFileName,o.marker.push(`ns="${s.ns}"`),o.marker.push(`id="${s.id}"`);const l=new ne;l.props.name=this.itemCssClassName(),l.props.id=n,l.props.className=this.imgCssClassName(),l.props.option.setImg(o),l.props.option.toolTip=s.name,l.props.option.onSelect=a=>{this.setSelectedItem(a.item.props.id)},this.htmlMaker.add(l)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createSelectorBox(e,t,s){this.parentName=t;const n=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="${this.charOpenUrlCssClassName()}">URL</button>
`),i=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${s}
    <label id="char-dlg-chinfo">未選択</label>
    <div class="${this.charSeachParentCssClassName()}" id="${this.charSeachParentCssClassName()}">
    <input type="text" id="${this.charSeachInputCssClassName()}" placeholder="キャラ名検索...">
    </div>
    ${n}
</div>`,o=new Ce;o.title="<"+e+">",o.SetB4Type(Ae.DialogHide),o.SetOType(pe.Option,this.onVisibleToggle);const l=o.NewDialog(t,this.dlgCssClassName());return o.SetContent(t,i),this.applyCss(),o.EnableEventHandlers(),o.onMoveDone=this.moverOnMoveDone,l}addEventHandlers(e){document.getElementById(this.charSeachInputCssClassName()).oninput=t=>{if(t!==null&&t.target!==null){const s=t.target;console.log(s.value);const n=s.value;this.seachKwAction(n)}},document.getElementById(this.charOpenUrlCssClassName()).onclick=async()=>{if(this.selectedCh===void 0)return;const t=this.chSet.chList.find(s=>this.selectedCh.idAttributeForHTML===s.idAttributeForHTML);if(t){this.charOpenUrlCssClassName();const s=new $e;if(s.setParent(this.dlgCssClassName()),s.setYesNo(),await s.showWait(`${t.name} をブラウザで開いてよろしいですか？`)===F.Yes){const i=t.contentURL;window.open(i,"_blank")}}}}addItemEventHandlers(){const e=this.htmlMaker.GetIdByIndex(0);this.htmlMaker.SelectByID(this.itemCssClassName(),e),this.htmlMaker.enableEvents(this.itemCssClassName()),this.setSelectedItem(e)}seachKwAction(e){const t=this.charSeachComboCssClassName(),s=document.getElementById(t);s!==null&&s.parentNode?.removeChild(s);const n=this.charFinder.toCombo(this.itemCssClassName(),t,e);if(n!==null){const i=document.getElementById(this.charSeachParentCssClassName());i!==null&&(i.appendChild(n),this.charFinder.addEvent(n,o=>{const a=o.parentElement.getAttribute("item-id");this.htmlMaker.SelectByID(this.itemCssClassName(),a)}),this.charFinder.findFirst())}}charFilter(){const e=document.querySelectorAll(`.${this.listCssClassName()}`);if(e===null||e.length===0)return;const t=e[0].children;for(const n of t)if(n instanceof HTMLDivElement){const i=n,o=i.dataset.ns||"",l=i.dataset.id||"";if(o.trim()===""||l.trim()==="")continue;const a=i.children[0],r=a.dataset.filename;let c=!1;if(this.gmFilter.length===0)c=!0;else{const f=this.idComboKwMap.get(l);if(f!==void 0){for(const u of f)if(this.gmFilter.find(p=>p===u)!==void 0){c=!0;break}}}let m=!1;for(const f of this.nsFilter)if((f===O.None||o===f)&&c){m=!0;break}i.style.display=m?"":"none",!a.src&&r&&(a.src=r)}const s=document.getElementById(this.charSeachInputCssClassName());if(s!==null){const i=s.value;this.seachKwAction(i)}}setSelectedItem(e){const t=this.chSet.chList.find(s=>e===s.idAttributeForHTML);t&&(document.getElementById("char-dlg-chinfo").textContent=t.name,this.selectedCh=t)}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}itemCssClassName(){return"char-item"}imgCssClassName(){return"base"}listCssClassName(){return"char-list"}dlgContentCssClassName(){return"char-dlg-content"}dlgCssClassName(){return"char-dlg"}charSeachInputCssClassName(){return"char-search-input"}charSeachComboCssClassName(){return"char-search-combo"}charSeachParentCssClassName(){return"char-search-parent"}charOpenUrlCssClassName(){return"char-open-url"}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=parseInt(this.uiInfo.left),i=parseInt(this.uiInfo.top),o=document.createElement("style");o.textContent=`
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
`.trim(),document.head.appendChild(o);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}}class Ie{constructor(){this.ns=O.None,this.id=0,this.name="",this.contentURL="",this.iconURL=""}static toJsonText(e){const t=Ie.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new Ie;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}static fromJsonInst(e){const t=new ve;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}}class yt{constructor(){this.title="",this.key="",this.selectionPair=[],this.selectedVal="",this.initScoreVal=0,this.mulScoreVal=0,this.available=!1}get stdScore(){const e=this.selectedVal.length>=1?this.selectedVal:"1",t=parseInt(e);return this.initScoreVal+t*this.mulScoreVal}get maxScore(){if(this.selectionPair.length===0)return 0;const e=this.selectionPair.length;return this.initScoreVal+e*this.mulScoreVal}get selectedText(){if(this.selectionPair.length!==0&&this.selectedVal!=="")for(const e of this.selectionPair){const t=e.split("/");if(t[1]===this.selectedVal)return t[0]}}}class V{constructor(){this.ns=O.None,this.items=new Array,this.allow=new Map,this.roleText="",this.comboText=""}makeDemoLvText(e){let t="";for(let s=1;s<=100;s++)t+=`"${e}${s}/${s}",`;return t=t.substring(0,t.length-1),t}load(){const e=this.makeDemoLvText("Lv"),t=this.makeDemoLvText("Lv"),s=this.makeDemoLvText(""),n=`
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
`,o=JSON.parse(n).map(l=>Object.assign(new yt,l));this.items=o}save(){console.log(JSON.stringify(this,null,2))}clone(){const e=new V;for(const t of this.items){const s=JSON.stringify(t,null,2),n=JSON.parse(s);e.items.push(n)}return e}static copy(e,t,s=!1){for(let n=0;n<e.items.length;n++){const i=e.items[n],o=s?new yt:t.items[n];o.title=i.title,o.key=i.key,o.selectionPair=i.selectionPair,o.selectedVal=i.selectedVal,o.initScoreVal=i.initScoreVal,o.mulScoreVal=i.mulScoreVal,o.available=i.available,s&&t.items.push(o)}}set(e,t){const s=this.items.find(n=>n.key===e);return s?(s.selectedVal=t,!0):!1}get stdScore(){let e=0;for(const t of this.items)t.available&&(e+=t.stdScore);return e}get maxScore(){let e=0;for(const t of this.items)t.available&&(e+=t.maxScore);return e}get allAvailable(){for(const e of this.items)if(e.available===!1)return!1;return!0}getScoreText(e){let t="";for(const s of this.items){let n=s.selectedText;n=n===void 0?"*bug*":n,t+=e+s.title+"："+n+"("+Math.ceil(s.stdScore)+")"}return t}static calcScore(e,t){const s=t.split("+");let n=0;for(const i of s){const o=i.trim();if(o.endsWith("()")){const l=o.slice(0,-2);typeof e[l]=="function"?n+=e[l]():console.warn(`関数 '${l}' が存在しません`)}else{const l=e[o];typeof l=="number"?n+=l:Array.isArray(l)?n+=l.reduce((a,r)=>a+r,0):console.warn(`プロパティ '${o}' が数値ではありません`)}}return n}static calcScoreAdvanced(e,t){const s=Object.keys(e),n=s.map(o=>e[o]);return new Function(...s,`return ${t};`)(...n)}toInst(e){return(n=>{const i=class{constructor(){n.forEach((o,l)=>{this[l]=o})}};return new i})(e)}static renameTitles(e){if(e!==void 0)for(let t=0;t<e.items.length;t++)for(let s=0;s<e.items.length;s++)t!==s&&e.items[t].title===e.items[s].title&&(e.items[t].title=e.items[t].title+"(1)",e.items[s].title=e.items[s].title+"(2)")}}class es{constructor(){this.fileNames=null,this.minMap=new Map,this.maxMap=new Map,this.rangeMap=new Map,this.digLenMax=0,this.nMul=0,this.table=[{key:B.pqStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:B.pqStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:B.pqStatusREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:B.pqTokkunHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:B.pqTokkunATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:B.pqTokkunREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:B.pqTokuSp1,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:B.pqTokuSp2,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:B.mmStatusFGT,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:B.mmStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:B.mmStatusPDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:B.mmStatusACC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:B.mmStatusEVA,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:B.mmStatusCRI,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:B.mmStatusMDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:B.mmStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:B.mmStatusCRD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:B.mmStatusDEF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:B.mmStatusSPD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:B.mmAbilityDEX,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:B.mmAbilityMGC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:B.mmAbilityDUR,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:B.mmRole,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}}],this.rolePriolity=[{roleKey:Ht.RlAttacker,priority:Pt.priHi,statusKey:[B.mmAbilitySTR,B.mmStatusATK,B.mmStatusSPD]},{roleKey:Ht.RlHealer,priority:Pt.priHi,statusKey:[B.mmAbilityMGC,B.mmStatusMDF,B.mmStatusHP]},{roleKey:Ht.RlDebuffer,priority:Pt.priHi,statusKey:[B.mmAbilityDEX,B.mmStatusACC,B.mmStatusHP]},{roleKey:Ht.RlBuffer,priority:Pt.priHi,statusKey:[B.mmStatusPDF,B.mmStatusHP,B.mmStatusDEF]}]}async loadDB(e){const t=new St,s=await t.loadBinFile(e);if(t.isWebRunning)this.zip=await window.JSZip.loadAsync(s);else{const{loadZipNode:n}=await import(t.nodeToolsImportFilename);this.zip=await n(s)}return this.fileNames=Object.keys(this.zip.files),!0}async enumStatus(e){if(this.fileNames!==null)for(const t of this.fileNames){const s=await this.getFileContent(t);if(s===null||e===void 0)continue;if(!e(t,s))break}}async debugCombo(){await this.enumStatus((e,t)=>{for(const s of t)s.useCombo&&console.log(`${e}:[${s.value}]`);return!0})}async loadAuxScoreSet(e){const t=new $s;await t.load(ue.ScoreUI,e);const s=new V;for(const n of t.itemList){const i=n.scItem;if(!n.scItem.isScoreAvail)continue;const o=new yt;switch(o.title=i.text,o.key=i.key,o.available=!1,i.selectType){case et.Sequence:const l=this.auxScoreTextToValue(i.start),a=this.auxScoreTextToValue(i.end),r=this.auxScoreTextToValue(i.step),c=new Array;for(let u=l;u<=a;u+=r)c.push(`${u}/${u}`);o.selectionPair=c,o.selectedVal=`${l}`,o.initScoreVal=l,o.mulScoreVal=r,c.length>=1&&(o.available=!1);break;case et.Text:const m=i.keyValue.split(",");let f="";for(const u of m){const g=u.split("/");if(g.length>=2){f=g[1];break}}o.selectionPair=m,o.selectedVal=f,o.initScoreVal=0,o.mulScoreVal=0,m.length>=1&&(o.available=!1);break}s.items.push(o)}return this.auxScoreSet=s,s}auxScoreTextToValue(e){const t=e.split("/"),s=t.length===1?t[0]:t[1];return parseInt(s)}async getMinMax(){await this.enumStatus((e,t)=>{for(const s of t){if(s.useCombo)continue;let n=parseInt(this.itemValue(s));if(!this.minMap.has(s.key))this.minMap.set(s.key,n);else{const i=this.minMap.get(s.key);i===void 0?this.minMap.set(s.key,n):i>n&&this.minMap.set(s.key,n)}if(!this.maxMap.has(s.key))this.maxMap.set(s.key,n);else{const i=this.maxMap.get(s.key);i===void 0?this.maxMap.set(s.key,n):i<n&&this.maxMap.set(s.key,n)}}return!0})}async getRanges(){await this.getMinMax(),this.digLenMax=0;for(const[e,t]of this.minMap){const s=t,n=this.maxMap.get(e);let i=0;if(s!==void 0&&n!==void 0&&(i=n-s),i<=0&&(i=1),this.rangeMap.set(e,i),n!==void 0){const o=Math.log10(n);o>this.digLenMax&&(this.digLenMax=o)}}this.nMul=this.digLenMax>0?Math.pow(10,Math.ceil(this.digLenMax)):1;for(const[e,t]of this.minMap)console.log(`[${e}] = ${this.minMap.get(e)},${this.maxMap.get(e)} ${this.rangeMap.get(e)}`);console.log(`digLenMax=[${this.digLenMax}] nMul=[${this.nMul}]`)}stdBy(e,t){let s,n;if(this.rangeMap.has(e)&&(s=this.rangeMap.get(e)),this.minMap.has(e)&&(n=this.minMap.get(e)),s===void 0||n===void 0||this.isNumeric(t)===!1)return null;s<=0&&(s=1);const i=(parseInt(t)-n)*s;return this.nMul*i}getChIdFrom(e){let t=e.indexOf("_");if(t>=0){let s=e.substring(t+1);if(t=s.indexOf("."),t>=0)return s=s.substring(0,t),s}return""}getFilename(e){let t=null;for(let s of this.fileNames){const n=this.getChIdFrom(s);if(n!==""&&n===e){t=s;break}}return t}async getFileContent(e){if(e===null)return null;const t=this.zip.file(e);if(t){const s=await t.async("string");return JSON.parse(s)}return null}async getStatus(e){this.digLenMax===0&&await this.getRanges();const t=this.getFilename(e);if(t===null)return null;const s=await this.getFileContent(t);if(s===null)return null;let n=null;for(const a of s)if(!a.useCombo){for(const r of this.rolePriolity)if(r.statusKey.find(m=>m===a.key)){n=r,console.log(`find role : ${n.roleKey}`);break}if(n!==null)break}const i=new V;if(n!==null)for(const a of s){if(a.useCombo)continue;if(n.statusKey.find(c=>c===a.key)){const c=this.table.find(m=>m.key===a.key);if(c){const m=c.scoreFunc(a.key,this.itemValue(a));m.title=a.disp,m.key=a.key,m.selectedVal="1",i.items.push(m)}}}else for(const a of s){if(a.useCombo)continue;const r=this.table.find(c=>c.key===a.key);if(r){const c=r.scoreFunc(a.key,this.itemValue(a));c.title=a.disp,c.key=a.key,c.selectedVal="1",i.items.push(c)}}const o=new V;V.copy(this.auxScoreSet,o,!0),i.items=i.items.concat(o.items);const l=parseInt(e);return i.ns=this.charSpecSet.findNs(l),i}async getComboKeywords(e){let t=0;const s=new Map,n=new Map;for(const i of e){const o=this.getFilename(i);if(o===null)continue;const l=await this.getFileContent(o);if(l===null)continue;const a=new Map;for(const r of l){if(!r.useCombo)continue;const c=r.value.split(",");for(const m of c)if(a.has(m)===!1)a.set(m,1);else{const f=a.get(m);a.set(m,f+1)}}if(a.size===0){t=0,n.clear();continue}for(const[r,c]of a)if(n.has(r)===!1)n.set(r,c);else{const m=n.get(r);n.set(r,m+c)}if(t++,!(t<=2))for(const[r,c]of n)c>=3&&s.set(r,c)}return s}async getComboNameMap(){const e=new Map,t=new Map;return await this.enumStatus((s,n)=>{const i=this.getChIdFrom(s);if(i==="")return!0;let o=new Array;for(const l of n)if(l.useCombo){const a=l.value.split(",");for(const r of a)if(t.has(r)===!1)t.set(r,1);else{const c=t.get(r);t.set(r,c+1)}o=o.concat(a)}return e.set(i,o),!0}),console.log("**getComboNameMap**",e,t),[e,t]}isNumeric(e){return e.trim()===""?!1:!isNaN(Number(e))}itemValue(e){return e.converted===""?e.value:e.converted}toScoreMaxNum(e,t){return this.isNumeric(t)===!1?null:es.useStdConv?this.stdBy(e,t):t!==""?parseInt(t):1}scoreFunc(e,t){const s=new yt;if(e===null)return s;s.mulScoreVal=e/t;for(let n=1;n<=t;n++){const i=Math.ceil(e/t*n);s.selectionPair.push(`Lv${n}/${n}`),n===1&&(s.initScoreVal=i)}return s.available=!0,s}scoreFuncOld(e,t){const s=new yt;if(this.isNumeric(e)===!1)return s;let n=e!==""?parseInt(e):1;s.mulScoreVal=n/t;for(let i=1;i<=t;i++){const o=Math.ceil(n/t*i);s.selectionPair.push(`Lv${i}/${i}`),i===1&&(s.initScoreVal=o)}return s.available=!0,s}puyoToku(e){return e==="enable"?10:1}}es.useStdConv=!1;const Pt={priHi:0},ci=["こうげき・単体","かいふく・単体","バランス・単体","たいりょく・単体","たいりょく・全体","こうげき・全体","かいふく・全体","バランス","ボス","ボーイズ","ボーイズ.スピリッツ","ガールズ","ガールズ、トラベラー","スピリッツガールズ","初代メンバー","すずらん","魔導学校","魔道学校","蒸気都市","幾星学園"],mi=new Map([[Q.classPq,ci],[Q.classMM,[]]]);function hi(h,e){function t(i){return!!(i.trim().length===0||i.includes("※調査中"))}let s=new Array;const n=mi.get(h);if(n===void 0){for(const[i,o]of e)t(i)||s.push(i);return s=s.sort((i,o)=>i.localeCompare(o)),console.log("**getSortedComboKeywords**",s),s}for(const[i,o]of e)n.find(l=>l===i)||t(i)||s.push(i);return s=s.sort((i,o)=>i.localeCompare(o)),s=n.concat(s),s}function ui(h){const e=new Array;let t=0,s;for(const n of h){const i=di(n);t+i>24&&s!==void 0&&(e.push(s),s=void 0),s===void 0&&(s=new Array,t=0),s.push(n),t+=n.length}return s!==void 0&&(e.push(s),s=void 0),console.log("**splitRowByComboSortedKw**",e),e}function di(h){let e=0;for(const t of h)t.match(/^[\x20-\x7e\uff61-\uff9f]$/)?e+=1:e+=2;return e}const Be={None:"None",UI:"UI",InvisibleUI:"InvisibleUI",Menu:"Menu"};class we{constructor(){this.dockType=Be.None,this.iconFileName="",this.toolTip="",this.idAttributeForHTML=""}get labelWrap(){let e=this.toolTip,t=this.toolTip.length;if(t>3){const s=t%2===0?t/2:t/2+1,n=e.substring(0,s),i=e.substring(s);e=n+`
`+i}return e}setAsDlg(e,t){this.dockType=Be.UI,this.dlg=e,this.toolTip=t}setAsInvisibleDlg(e,t){this.dockType=Be.InvisibleUI,this.dlg=e,this.toolTip=t}setAsMenu(e){this.dockType=Be.Menu,this.toolTip=e}get isUIType(){return this.dockType==Be.UI}get isMenuType(){return this.dockType==Be.Menu}ToggleStatus(){this.dlg===void 0||this.dlg===null||(this.dlg.hidden=!this.dlg.hidden)}}class ts{constructor(){this.items=new Array,this.parentName="",this.listName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new P().SaveSetting(e,!1)},this.oBtn=null,this.onOptionClick=async(e,t,s)=>{if(console.log("**onOptionClick**",s),s===null)return;this.oBtn===null&&(this.oBtn=s.btnElem);const n=new A;if(n.IsEnabledElem(this.oBtn)===!1)return;const i=new Array,o=new ye;o.key="envSettings",o.text="📰環境設定",i.push(o);const l=new ye;l.key="gameSettings",l.text="📰ゲーム設定",i.push(l);const a=new ye;a.key="scoreSettings",a.text="📰スコア設定",i.push(a);const r=new ye;r.key="Cancel",r.text="❌キャンセル",i.push(r);const c=new hn;c.setChoiceItems(i),n.EnableElem(this.oBtn,!1);const m=s.dlg.className;c.setListener(`${m}-choice`,m,`${m}-opt`),c.applyCss(),c.show(s.leftPx,s.topPx),c.enableEvents(async f=>{switch(console.log(`[onSelect] ${f.callerName} ${f.result}`),c.dispose(),f.result){case"envSettings":this.envOptionToolTip!==void 0&&this.envOptionToolTip.SetVisible(!0);break;case"gameSettings":const u=this.env.editorURL;window.open(u,u);break;case"scoreSettings":const g=this.env.editorURL;window.open(g,g);break}this.oBtn!==null&&(new A().EnableElem(this.oBtn,!0),this.oBtn=null)})},this.onHelp=async(e,t)=>{await pi()}}add(e){return e.dockType==Be.UI&&(e.dlgParent=e.dlg.parentElement),this.items.push(e),!0}async toHTML(e,t=null){if(!this.items)return"";this.listName=e,this.htmlMaker=new A;let s=0;for(const n of this.items){s++;const i=`dock-uid${s}`;n.idAttributeForHTML=i;const o=new ne,l=n.labelWrap;o.props.name=this.itemCssClassName(),o.props.id=i,o.props.className=this.imgCssClassName(),o.props.option.toolTip=n.toolTip,o.props.option.setLabel(l,!0),o.props.option.onSelect=a=>{const r=this.items.find(c=>a.item.props.id===c.idAttributeForHTML);if(r&&(this.selectedItem=r,this.onApply!==void 0)){const c=new on;c.item=this.selectedItem,this.onApply(c)}},this.htmlMaker.add(o)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createDockBox(e,t,s=!0){this.parentName=e;const n=`<div class="${this.parentName}-dlg-content">
    ${t}
</div>`,i=new Ce;i.SetB3Type(ht.Hide),i.SetOType(pe.OptionWithArgs,this.onOptionClick),i.SetHType(ut.Help,this.onHelp);const o=i.NewDialog(e,this.dlgCssClassName());return i.SetContent(e,n,s),this.applyCss(),i.EnableEventHandlers(),i.onMoveDone=this.moverOnMoveDone,o}addItemClickHandlers(e){this.onApply=e,this.htmlMaker.SelectByID(this.itemCssClassName(),this.htmlMaker.GetIdByIndex(0)),this.htmlMaker.enableEvents(this.itemCssClassName())}stdApplyAction(e){return e.item.dlgParent===null?(e.cancel=!0,!1):(console.log(`selected item = [${e.item.toolTip}::${e.item.dockType}]`),e.item.isUIType&&(this.htmlMaker.UnselectAll(this.itemCssClassName()),this.htmlMaker.SelectByID(this.itemCssClassName(),e.item.idAttributeForHTML)),e.item.isUIType&&(new P().MoveHiestLayer(e.item.dlgParent),e.item.dlgParent.hidden&&(e.item.dlgParent.hidden=!1)),!0)}activateItem(e){const t=this.items.find(s=>s.dlg===e);if(t!==void 0){const s=new on;s.item=t,this.stdApplyAction(s)}}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=48,i=this.items.length,o=document.createElement("style");o.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,60,10,P.ignoreIndex)}
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
`.trim(),document.head.appendChild(o);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}listCssClassName(){return`${this.listName}-list`}dlgCssClassName(){return`${this.parentName}-dlg`}static GetDialogInfo(e){return Ce.GetDialogInfo(e)}static SetDialogInfo(e){return Ce.SetDialogInfo(e)}async InitZOrder(e){await e.ForEachAsync(t=>{const s=ts.GetDialogInfo(t),n=e.FindByName(t);return s!==null&&(s.zindex=n!==null?n.style.zIndex:""),console.log(s),!0})}}class on{constructor(){this.cancel=!1}}async function pi(){const h=new $e;h.title="About EvoNa",await h.showWait('EvoNa (Evolution Navigator)<br>Release 1<br><img src="./wallpaper.png" width="64" height="auto"></img><br><br>Powered By Gemini/Chromium Tech.')}class Yt{constructor(){this.dockType=Be.None,this.iconFileName="",this.toolTip="",this.dlgName="",this.hidden=!1,this.zIndex="",this.topPx="",this.leftPx=""}static toJsonText(e){const t=Yt.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new Yt;return t.dockType=e.dockType,t.iconFileName=e.iconFileName,t.toolTip=e.toolTip,e.isUIType&&(t.dlgName=e.dlgParent.id,t.hidden=typeof e.dlgParent.hidden=="string"?!1:e.dlgParent.hidden,t.zIndex=e.dlgParent.style.zIndex,t.leftPx=e.dlgParent.style.left,t.topPx=e.dlgParent.style.top),t}}class Xt{static toJsonText(e){const t=Xt.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new Xt;t.items=new Array;for(const s of e.items)t.items.push(Yt.toJsonInst(s));return t}restore(e,t){for(const s of this.items){const n=e.items.find(i=>i.dlg.id===s.dlgName);n&&(n.dockType=s.dockType,n.iconFileName=s.iconFileName,n.toolTip=s.toolTip,n.isUIType&&(n.dlgParent.hidden=typeof s.hidden=="string"?!1:s.hidden,n.dlgParent.style.zIndex=s.zIndex,n.dlgParent.style.left=s.leftPx,n.dlgParent.style.top=s.topPx))}t.ReOrder()}}class fi{constructor(){this.splitTextList=["スキル","（星7）"]}convTitle(e){for(const t of this.splitTextList)if(e.endsWith(t))return`${e.substring(0,e.length-t.length)}<br>${t}`;return e.length<=8,e}}let hs=null;function Cs(){return hs||(hs=new fi,console.log("ConvertTools instance created (Singleton)")),hs}class oe{constructor(){this.comment="",this.fixedType=fe.None}static copy(e,t){t.comment=e.comment,t.fixedType=e.fixedType}}class Ct{constructor(){this.chUuid="",this.ch=new ve,this.prop=new oe}setDefault(){this.prop.comment===""&&(this.prop.comment=`${this.ch.name.replace("（星7）","")}(Lv1)`)}}class yn{constructor(){this.chList=new Array,this.uiInfo=new qe,this.parentName="",this.scoreGrid=new On,this.gridHeaderName=`${this.dlgCssClassName()}-headerName`,this.gridFooterName=`${this.dlgCssClassName()}-footerName`,this.gridName=`${this.dlgCssClassName()}-gridName`,this.gridRowName=`${this.dlgCssClassName()}-gridRowName`,this.keyClassName=`${this.dlgCssClassName()}-keyClassName`,this.valueClassName=`${this.dlgCssClassName()}-valueClassName`,this.commentClassName=`${this.dlgCssClassName()}-commentClassName`,this.fixedClassName=`${this.dlgCssClassName()}-fixedClassName`,this.nsDefs=[],this.updateItemId=1,this.deleteItemId=2,this.onNotifyWatched=async e=>{const t=e.className.split("-"),s=t.length>=2?t[0]:"",n=this.nsComboCssClassName(),i=document.getElementsByClassName(n);if(i.length>=1){const o=i[0];o.value!==s&&(o.value=s)}},this.onNestedNodeSelect=async e=>{const t=e.callerName,s=t.split("_");if(s.length===0)return;let n=s.find(o=>o.startsWith("uuid"));if(n===void 0)return;n=n.substring(4);const i=this.chList.find(o=>o.chUuid===n);if(i!==void 0)switch(console.log(i),e.result){case`${this.updateItemId}`:this.editingCh=i;const o=i.scoreSet;oe.copy(i.prop,this.savedProp),this.savedScoreSet=new V,V.copy(o,this.savedScoreSet,!0),this.createScoreGrid(i,o),this.htmlMaker.setVisible(this.htmlMaker.defaultToolButtonsCssName,!1),this.nested.setVisible(!1);const l=this.nested.findParentNodeBy(t);console.log(l);const a=this.nested.getCell(l);console.log(a);const r=this.nested.findCell(a,"img");console.log(r);const c=r.src,m=document.createElement("img");m.src=c,m.style.width="100px",m.style.height="100px",this.scoreGrid.headerElem?.appendChild(m);break;case`${this.deleteItemId}`:const f=new $e;f.setParent(this.dlgCssClassName());let u=F.None;switch(f.setYesNo(),u=await f.showWait(`${i.ch.name} を削除しますか？`),u){case F.Yes:const g=this.nested.findParentNodeBy(t);console.log(g);const p=this.nested.getChildren(g);console.log(p),this.nested.removeNodeBy(t),p!==null&&p.length===1&&(this.nested.removeNode(g),this.addActionLog(i,Le.Delete));break;case F.No:return;case F.Cancel:return}break}},this.editingCh=null,this.onSelect=async e=>{switch(console.log(`classify = ${e.classify} selectedValue = ${e.selectedValue} targetId = ${e.targetId}`),e.classify){case this.commentClassName:const i=document.getElementsByClassName(this.commentClassName);if(i.length===1){const o=i[0];console.log("** comment input & enter! **",o.value)}return;case this.fixedClassName:this.editingCh!==null&&(this.editingCh.prop.fixedType=e.selectedValue);return}const t=this.editingCh;if(t===null)return;const n=t.scoreSet.items.find(i=>i.key===e.classify);n&&(n.selectedVal=e.selectedValue)},this.savedProp=new oe,this.savedScoreSet=new V,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new P().SaveSetting(e),this.requestActivate!==void 0&&await this.requestActivate(e)},this.onCopyPaste=async(e,t)=>{console.log(`[${e.className}] selected [${t}]`);const s="charSummary:";switch(t){case xe.Copy:const n=kt.toJsonText(this);await ie.put(`${s}${n}`);break;case xe.Paste:const i=await ie.get();if(i===null)break;if(!i.startsWith(s)){const a=new $e;a.setParent(this.dlgCssClassName()),await a.showWait(`ペーストデータの形式が不正です<br>${s}`);break}const o=JSON.parse(i.substring(s.length)),l=kt.fromJsonInst(o);this.chList=l.chList,this.nested.disableEvents(),this.nested.reset(),await this.addAllCharNodes(),this.enableLazyImages(this.imageLoader),this.nested.enableEvents(this.onNestedNodeSelect);break}}}async load(){const t=await(await De()).get(Re.CharSummaryAction);if(t===null)return;const s=new Map,n=new Array;this.usingLog(t,s,n),this.chList=new Array;for(const[i,o]of s){const l=Ot.fromJsonText(o.log),a=new ve;ve.copy(l.ch,a);const r=new oe;oe.copy(l.prop,r);const c=new V;V.copy(l.scoreSet,c,!0);const m=new Ct;m.chUuid=l.chUuid,m.ch=a,m.prop=r,m.scoreSet=c,m.setDefault(),this.chList.push(m)}}usingLog(e,t,s){for(const n of e){const i=Ot.fromJsonText(n.log);if(i.chUuid==="")continue;let o=!1,l=!1;switch(i.logType){case Le.None:break;case Le.Add:o=!0;break;case Le.Update:t.has(i.chUuid)?o=!0:o=!1;break;case Le.Delete:o=!0,l=!0;break}if(o)if(l){if(t.has(i.chUuid)){t.delete(i.chUuid);const a=t.get(i.chUuid);s.push(a)}}else{if(t.has(i.chUuid)){const a=t.get(i.chUuid);s.push(a),t.delete(i.chUuid)}t.set(i.chUuid,n)}}}sortByScore(){if(this.chList.length===0)return null;const e=new Array;for(const s of this.chList){const n=new ve;ve.copy(s.ch,n);const i=new V;V.copy(s.scoreSet,i,!0);const o=new Ct;o.chUuid=s.chUuid,o.ch=n,oe.copy(s.prop,o.prop),o.setDefault(),o.scoreSet=i,e.push(o)}return e.sort((s,n)=>n.scoreSet.stdScore-s.scoreSet.stdScore)}toHTML(){return this.htmlMaker=new A,this.htmlMaker.ToHTML()}createSummaryBox(e,t,s){this.parentName=t;let n=`
<button id="${this.itemAddCssClassName()}">キャラ追加</button>
`.trim();this.htmlMaker.defaultToolButtonsCssName=`${this.dlgCssClassName()}-tool-btns`;const i=this.htmlMaker.MakeDefaultToolButtonsHTML(n),o=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${i}
    ${s}
</div>`,l=new Ce;l.title="<"+e+">",l.SetB2Type(Ge.CopyPaste,this.onCopyPaste);const a=l.NewDialog(t,this.dlgCssClassName());return l.SetContent(t,o),this.applyCss(),l.EnableEventHandlers(),l.onMoveDone=this.moverOnMoveDone,a}addEventHandlers(e,t){this.onAdd=t,document.getElementById(`${this.itemAddCssClassName()}`).onclick=async()=>{if(this.onAdd===void 0)return;const s=new gi;await this.onAdd(s),s.cancel!==!0&&await this.onItemAdd(s)}}async createCharSummaryNodes(e,t){this.imageLoader=e;const s=new qn;s.init(),s.setListener("charNodes",this.dlgContentCssClassName(),this.dlgContentCssClassName()),this.nested=s,this.nsDefs=t,await this.addAllCharNodes(),s.setSize("400"),s.applyCss()}async showCharSummaryNodes(){this.nested.enableOverlay(!1);let e=10,t=e;const s=document.getElementsByClassName(this.dlgContentCssClassName());if(s.length>=1){const i=s[0].getElementsByClassName(this.htmlMaker.defaultToolButtonsCssName);if(i.length>=1){const o=i[0],l=this.htmlMaker.GetRect(o);console.log("toolRc",l),t=e+Number(l.height)}if(i.length>=1){const o=this.nsComboCssClassName(),l=this.createNsCombo(o);i[0].appendChild(l)}}this.nested.show("0",`${t}`),this.nested.enableEvents(this.onNestedNodeSelect),this.nested.startWatch(this.onNotifyWatched)}createNsCombo(e){let t=-1,s="";for(const i of this.nsDefs){t++;const o=i.ns,l=i.nsName,r=`
 <option value="${o}"${t===0?" selected":""}>${l}</option>
`.trim();s+=r}const n=document.createElement("select");return n.id=e,n.className=e,n.innerHTML=s,n.addEventListener("change",i=>{const o=i.target,l=this.nested.findNodeBy(o.value);l!==null&&this.nested.scroll(l)}),n}getCharUuidClassName(e){const t=e.ch,s=t.ns,n=`${s}_${t.name}_${t.id}`;if(this.nested.findNodeBy(s)===null)return null;const o=n;return`${this.nested.findNodeBy(o).className}_uuid${e.chUuid}`}async addAllCharNodes(){this.nested.createRoot();const e=this.nested.topTableElem;for(const t of this.nsDefs){const s=new Jt;s.enableWatchNotify=!0,this.nested.createNode(e,t.ns,s);const n=this.nested.findNodeBy(t.ns),i=this.nested.makeTextCell(`${t.ns}Label`,t.nsName,`${t.nsName}グループ`).ToHTML();this.nested.setCellContent(n,0,i)}for(const t of this.chList)await this.addCharNode(this.nested,t,!0);console.log("**[TOP]**",this.nested.findNodeBy(this.nested.rootName))}async addCharNode(e,t,s){const n=t.ch,i=n.ns,o=`${i}_${n.name}_${n.id}`,l=e.findNodeBy(i);if(l===null)return null;const a=o;let r=e.findNodeBy(a);if(r===null){e.createNode(l,a),r=e.findNodeBy(a);let y=await this.imageLoader.getImageUrlBy(n.iconFileName,n.ns),I="",b=n.name,w=e.makeImgCell(`${a}Img`,y,I,b).ToHTML();e.setCellContent(r,0,w)}let c=`${r.className}_uuid${t.chUuid}`;const m=new Jt;m.numCell=2,e.createNode(r,c,m);const f=e.findNodeBy(c);let u=t.prop.comment,g=this.getChScoreText(t);const d=Cs().convTitle(u),N=`${u}${g}`;let x=e.makeTextCell(`${c}`,d,N).ToHTML();e.setCellContent(f,0,x);const M=e.makeBtnCell(`${c}`,"更新","更新",this.updateItemId).ToHTML(),L=e.makeBtnCell(`${c}`,"削除","削除",this.deleteItemId).ToHTML();return e.setCellContent(f,1,M+L),f}getChScoreText(e){let t="";for(const s of e.scoreSet.items){let n=s.selectedText;n=n===void 0?"*bug*":n,t+=qt.toolTipNewLine+s.title+"："+n+"("+Math.ceil(s.stdScore)+")"}return t}createScoreGrid(e,t){const s=this.dlgContentCssClassName(),n=Cs(),i=this.scoreGrid.makePair();this.setCommentPair(e,i),this.setFixedFormPair(e,i);for(const o of t.items){const l=n.convTitle(o.title),a=o.title,r=this.scoreGrid.makeKeyCell(l,this.keyClassName,a),c=new Nt;c.selectionPair=o.selectionPair,c.selectedItem=o.selectedVal,c.classify=o.key;const m=new ke;m.makeItems(),m.items[0].typeInfo.setCombo(c),m.items[0].className=this.valueClassName,i.set(r,m)}if(this.scoreGrid.setPair(i),this.scoreGrid.setListener(this.gridName,this.gridRowName,s,this.gridHeaderName,this.gridFooterName),this.scoreGrid.enableEvents(this.onSelect),this.scoreGrid.footerElem!==null){let o=`
<button id="${this.gridFooterName}-okBtn">OK</button>
<button id="${this.gridFooterName}-canBtn">CANCEL</button>
`.trim();this.scoreGrid.footerElem.innerHTML=o,document.getElementById(`${this.gridFooterName}-okBtn`).onclick=async()=>{const l=this.editingCh;if(l===null)return;l.scoreSet;const a=document.getElementsByClassName(this.commentClassName);if(a.length===1){const r=a[0];l.prop.comment=r.value}this.addActionLog(l,Le.Update),this.removeScoreGrid(),this.updateChScoreInfo(this.editingCh)},document.getElementById(`${this.gridFooterName}-canBtn`).onclick=async()=>{const l=this.editingCh;if(l===null)return;l.prop.comment=this.savedProp.comment;const a=l.scoreSet;V.copy(this.savedScoreSet,a),this.removeScoreGrid()}}}setCommentPair(e,t){const s=e.prop.comment.trim(),n="キャラ情報を入力",i=this.scoreGrid.makeKeyCell("キャラ情報",this.keyClassName,n),o=new se;o.value=s,o.placeholder=n;const l=new ke;l.makeItems(),l.items[0].typeInfo.setInput(o),l.items[0].className=this.commentClassName,l.items[0].typeInfo.using.itemId=1,t.set(i,l)}setFixedFormPair(e,t){const i=this.scoreGrid.makeKeyCell("固定枠",this.keyClassName,"自動編成の固定枠を選択");let o=new Array,l="";for(const[c,m]of rn){const f=`${m}/${c}`;o.push(f),e.prop.fixedType===c&&(l=c)}const a=new Nt;a.selectionPair=o,a.selectedItem=l,a.classify=this.fixedClassName;const r=new ke;r.makeItems(),r.items[0].typeInfo.setCombo(a),r.items[0].className=this.fixedClassName,t.set(i,r)}removeScoreGrid(){if(this.scoreGrid.headerElem!==null){let e=this.scoreGrid.headerElem.children[0];e!==null&&(e.remove(),e=null)}this.scoreGrid!==null&&(this.scoreGrid.dispose(),this.htmlMaker.setVisible(this.htmlMaker.defaultToolButtonsCssName,!0),this.nested.setVisible(!0))}async onItemAdd(e){const t=new $e;t.setParent(this.dlgCssClassName());let s=F.None;if(t.setYesNo(),s=await t.showWait(`${e.selectCh.name} を追加しますか？`),s===F.No)return;const n=new Ct;n.chUuid=Dn(),n.ch=e.selectCh,n.ch.iconURL=e.selectedImg,n.scoreSet=e.scoreSet,n.setDefault(),this.chList.push(n);const i=await this.addCharNode(this.nested,n,!1);i!==null&&(this.nested.scroll(i),this.addActionLog(n,Le.Add))}async addActionLog(e,t){const s=new Ot;s.logType=t,s.chUuid=e.chUuid,s.ch=e.ch,s.prop=e.prop,s.scoreSet=e.scoreSet;const n=Ot.toJsonText(s);await(await De()).put(Re.CharSummaryAction,n)}updateChScoreInfo(e){const t=this.getCharUuidClassName(e);if(t===null)return;const s=this.nested.findNodeBy(t);let n=this.getChScoreText(e);const i=`${e.prop.comment}`,o=`${i}${n}`;let l=this.nested.makeTextCell(`${t}`,i,o).ToHTML();this.nested.setCellContent(s,0,l)}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e),this.imageLoader=e}itemAddCssClassName(){return"char-summary-add"}nsComboCssClassName(){return`${this.dlgCssClassName()}-nscombo`}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return"char-summary-dlg"}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=document.createElement("style");s.textContent=`
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
${E.spanCssText("0.8",!0)}
}
/* 登録キャラのボタン */
button[class^="Cns"] {
${E.spanCssText("0.8",!0)}
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
${E.footerText()}
}
.${this.gridFooterName} button {
${E.footerButtonText()}
}

`.trim(),document.head.appendChild(s);const n=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,n)}}class gi{constructor(){this.cancel=!1}}const Le={None:"None",Add:"Add",Delete:"Delete",Update:"Update"};class Ot{constructor(){this.logType=Le.None,this.chUuid=""}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class It{constructor(){this.chUuid="",this.ch=new Ie,this.prop=new oe}static toJsonText(e){const t=It.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new It;return t.chUuid=e.chUuid,t.ch=Ie.toJsonInst(e.ch),oe.copy(e.prop,t.prop),t.scoreSet=e.scoreSet,t}static fromJsonInst(e){const t=new Ct;return t.ch=Ie.fromJsonInst(e.ch),oe.copy(e.prop,t.prop),t.scoreSet=new V,V.copy(e.scoreSet,t.scoreSet,!0),t}}class kt{constructor(){this.items=new Array}static toJsonText(e){const t=kt.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new kt;t.items=new Array;for(const s of e.chList)t.items.push(It.toJsonInst(s));return t}static fromJsonInst(e){const t=new yn;t.chList=new Array;for(const s of e.items)t.chList.push(It.fromJsonInst(s));return t}}class yi{constructor(){this.TextMap=new Map}set(e,t){const s=this.TextMap.has(e);return this.TextMap.set(e,t),s}remove(e){const t=this.TextMap.has(e);return t&&this.TextMap.delete(e),t}get count(){return this.TextMap.size}clear(){this.TextMap.clear()}forEach(e){if(e===void 0)return;let t=!1;for(const[s,n]of this.TextMap)if(t=e(s,n),t)break;return t}values(){const e=new Map;for(const[t,s]of this.TextMap)e.set(t,parseInt(s));return e}}class Cn{constructor(e=0,t=""){this.ch=new ve,this.prop=new oe,this.isEmpty=!0,this.details=new yi,this.ch.id=e,this.ch.name=t}set(e,t){const s=this.details.TextMap.has(e);return this.details.set(e,t),s}get values(){return this.details.values()}get itemID(){const e=this.itemKey,t=this.ch.idAttributeForHTML.substring(e.length);let s=parseInt(t);return s<=0?-1:s}get itemKey(){return"chuid"}}class bs{constructor(){this.nFormationItem=5,this.uiInfo=new qe}Init(){this.items=new Array;for(let e=0;e<this.nFormationItem;e++)this.items.push(new Cn)}put(e,t){const s=this.items.find(n=>this.isExistCh(n,t));return s!==void 0&&s.isEmpty===!1?!1:(e.ch.ns=t.ns,e.ch.id=t.id,e.ch.name=t.name,e.isEmpty=!1,!0)}empty(e){const t=e.isEmpty;return e.isEmpty=!0,e.isEmpty!=t}isExistCh(e,t){return e.ch.name===t.name&&e.ch.id===t.id}equalsFormationItem(e,t){return e.ch.name===t.ch.name&&e.ch.id===t.ch.id}}class Ue{constructor(){this.autoScoreType=Se.High}static copy(e,t){t.autoScoreType=e.autoScoreType}}class Ci{constructor(){this.emptyFile="plus.png",this.option=void 0,this.autoForm=!1,this.editFormEnable=!1,this.saveEnable=!1,this.enableScoreEvent=!1,this.parentName="",this.listName="",this.gridHeaderName=`${this.dlgCssClassName()}-headerName`,this.gridFooterName=`${this.dlgCssClassName()}-footerName`,this.gridName=`${this.dlgCssClassName()}-gridName`,this.scoreGrid=null,this.editingIndex=-1,this.onNotifyLvg=async e=>{if(e.classify===Qe.Ok){const t=e.notify,s=t.checkedRow();s!==-1&&(t.dispose(),this.lvgAutoFormView=void 0,await this.autoFormationApply(s))}e.classify===Qe.Cancel&&(e.notify.dispose(),this.lvgAutoFormView=void 0)},this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new P().SaveSetting(e),this.requestActivate!==void 0&&await this.requestActivate(e)},this.onVisibleToggle=async(e,t)=>{if(this.option!==void 0){this.option.SetVisible(!this.option.GetVisible());return}},this.nsFilter=[O.None,O.None],this.gmFilter=[],this.onNsOptionChanged=async(e,t)=>{this.option!==void 0&&(this.nsFilter=[e.typeInfo.using.radio.selectedItem,t.typeInfo.using.radio.selectedItem],console.log("**onNsOptionChanged**",this.nsFilter),this.lvgAutoFormView!==void 0&&(this.lvgAutoFormView.dispose(),this.lvgAutoFormView=void 0,await this.autoFormation()))},this.onGmOptionChanged=async e=>{if(this.option!==void 0){this.gmFilter=new Array;for(const t of e){if(t.typeInfo.using.itemType!==R.Radio)continue;const s=t.typeInfo.using.radio;if(s.selectedItems.length!==0)for(const n of s.selectionPair){const[i,o]=n.split("/");s.selectedItems.find(a=>a===o)!==void 0&&this.gmFilter.push(i)}}console.log("**onGmOptionChanged**",this.gmFilter),this.lvgAutoFormView!==void 0&&(this.lvgAutoFormView.dispose(),this.lvgAutoFormView=void 0,await this.autoFormation())}},this.onScoreGridOpen=async e=>{console.log(`notifty id     = ${e.item.props.id}`),console.log(` targetId      = ${e.targetId}`),console.log(` classify      = ${e.classify}`),console.log(` selectedValue = ${e.selectedValue}`);const t=e.item.props.id,s=parseInt(t)-1;if(0<=s&&s<this.formation.items.length){const n=`${this.propItemCssClassName()}-${t}`;if(this.htmlMakerProp.IsEnabledId(n)!==!0)return;if(this.enableScoreEvent){const o=this.formation.items[s];if(o.ch.id===0){console.log("*bug?*");return}const l=await this.loadScoreConfig(o,s);l!==null&&this.makeFlyoutGrid(l,s)}}else console.log(`invalid index = ${s}`)},this.savedOpt=new Ue,this.savedScoreSet=new V,this.onScoreValueSelect=async e=>{if(console.log(`[onScoreValueSelect] callerName=${e.callerName}, result=${e.result}`),e.callerName===B.cmAutoScore){const n=this.formationOptList[this.editingIndex];n.autoScoreType=e.result;return}const s=this.scsList[this.editingIndex].items.find(n=>n.key===e.callerName);s!==void 0&&(s.selectedVal=e.result)},this.onOkClickScoreGrid=async e=>{const t=this.formation.items[this.editingIndex],s=this.scsList[this.editingIndex];this.disposeScorGrid(),await this.notifyChangeScore(t,s)},this.onCancelClickScoreGrid=async e=>{const t=this.formationOptList[this.editingIndex];Ue.copy(this.savedOpt,t);const s=this.scsList[this.editingIndex];V.copy(this.savedScoreSet,s),this.disposeScorGrid()},this.onCopyPaste=async(e,t)=>{console.log(`[${e.className}] selected [${t}]`);const s="formation:";switch(t){case xe.Copy:const n=Fe.toJsonText(this.formation,this.scsList,this.formationOptList);await ie.put(`${s}${n}`);break;case xe.Paste:const i=await ie.get();if(i===null)break;if(!i.startsWith(s)){const r=new $e;r.setParent(this.dlgCssClassName()),await r.showWait(`ペーストデータの形式が不正です<br>${s}`);break}const o=JSON.parse(i.substring(s.length)),l=this.selectedItem.itemID;this.formation.Init();let a=-1;for(const r of o.items){a++,this.formation.items[a]=$t.fromJsonInst(r);const c=this.formation.items[a];c.ch.idAttributeForHTML=`${c.itemKey}${a+1}`}if(this.enableScoreEvent===!0)if(o.formationOptList.length>=1){this.formationOptList=new Array;for(const r of o.formationOptList){const c=new Ue;Ue.copy(r,c),this.formationOptList.push(c)}}else for(const r of this.formationOptList)r.autoScoreType=Se.None;else this.formationOptList=new Array;this.scsList=new Array;for(const r of o.scsList){const c=new V;V.copy(r,c,!0),this.scsList.push(c)}a=-1;for(const r of this.formation.items){a++;let c=!1;if(r.isEmpty?await this.charEmptyItem(r):(await this.charPutItem(r),c=!0),this.enableScoreEvent!==!1){const f=`${this.propItemCssClassName()}-${a+1}`;this.htmlMakerProp.EnableId(f,c)}const m=this.scsList[a];await this.notifyChangeScore(r,m)}this.selectedItem=this.formation.items[l-1];break}}}InitForEnemy(e){this.charDB=e,this.formation=new bs,this.formation.Init(),this.enableScoreEvent=!0,this.initScoreOptions(),this.initScsList()}InitForPlayer(e){this.charSummary=e,this.formation=new bs,this.formation.Init(),this.initScsList()}initScsList(){this.scsList=new Array;const e=this.formation.nFormationItem;for(let t=0;t<e;t++){const s=new V;this.scsList.push(s)}}initScoreOptions(){this.formationOptList=new Array;const e=this.formation.nFormationItem;for(let t=0;t<e;t++){const s=new Ue;this.formationOptList.push(s)}}async Setup(e,t){if(!e)return;this.formation=e;let s=0;for(const n of this.formation.items){n.isEmpty?this.formation.empty(n):this.formation.put(n,n.ch),s++;const i=`${n.itemKey}${s}`;n.ch.idAttributeForHTML=i;const o=n.isEmpty?this.emptyFile:n.ch.iconFileName,l=await t.getImageUrlBy(o,n.ch.ns);if(l===null)return;this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),n.ch.idAttributeForHTML,l)}}async toHTML(e){if(!this.formation)return"";this.listName=e,this.htmlMakerChSel=new A;let t=0;for(const s of this.formation.items){const n=s.ch;t++;const i=`${s.itemKey}${t}`;n.idAttributeForHTML=i;const o="",l=s.isEmpty?this.emptyFile:n.iconFileName,a=new Zt;a.imgSrc=o,a.imgFile=l;const r=new ne;r.props.name=this.itemCssClassName(),r.props.id=i,r.props.className=this.imgCssClassName(),r.props.option.setImg(a),r.props.option.toolTip=n.name,r.props.option.onSelect=c=>{console.log(`notifty id = ${c.item.props.id}`),this.setSelectedItem(c.item.props.id)},this.htmlMakerChSel.add(r)}return this.htmlMakerChSel.MakeScrollableList(this.listCssClassName())}toGridHTML(){this.htmlMakerProp=new A;let e=0;for(const t of this.formation.items){t.ch;const s=this.scsList[e];e++;for(const i of s.items)t.details.set(i.key,i.selectedVal);const n=new ne;n.props.name=`${this.propItemCssClassName()}-${e}`,n.props.id=`${e}`,n.props.className=`${this.propItemCssClassName()}`,n.props.option.setButton("スコア"),n.props.option.using.itemId=e,n.props.option.onSelect=this.onScoreGridOpen,this.htmlMakerProp.add(n)}return this.htmlMakerProp.MakeScrollableList(this.propCssClassName())}async autoFormation(){this.lvgAutoFormView===void 0&&(this.formation.Init(),await this.makeLvwGroup(this.imgLoader))}async autoFormationApply(e){const t=this.playerScore();if(t===null||t.length===0)return console.log("[autoFormationApply] sortedChSummary.length === 0"),!1;const s=this.formation.nFormationItem,n=this.moveLockedFormation(s);if(n===null)return console.log("[autoFormationApply] lockInfo === null"),!1;const i=n[0],o=n[1],l=t.length;let a=Math.floor(l/s);l%s&&a++;let r=0,c=-1,m=!1;for(let p=0;p<a;p++)if(i[p]){if(r++,r===e){c=p,m=!0;break}if(r++,r===e){c=p;break}}else{if(r++,r!==e)continue;c=p;break}if(c===-1)return;this.initScsList();const f=c*s;if(m){console.log("**lock form selected**",m,c,o[c]);for(let p=0;p<s;p++){let d=o[c][p],N=!1;switch(d){case-1:d=f+p,console.log("not moved",d);break;case-2:N=!0;break;default:d>=t.length?(N=!0,console.log("to sapce moved",f+p)):console.log("to moved",d);break}const x=this.formation.items[p];N?this.formation.empty(x):(this.formation.put(x,t[d].ch),oe.copy(t[d].prop,x.prop),V.copy(t[d].scoreSet,this.scsList[p],!0))}}else{console.log("**normal form selected**",f);for(let p=0;p<s;p++){let d=!1;f+p>=t.length&&(d=!0);const N=f+p;console.log("->",N);const x=this.formation.items[p];d?this.formation.empty(x):(this.formation.put(x,t[N].ch),oe.copy(t[N].prop,x.prop),V.copy(t[N].scoreSet,this.scsList[p],!0))}}let u=0;for(const p of this.formation.items){u++;const d=`${p.itemKey}${u}`;p.ch.idAttributeForHTML=d,p.isEmpty?await this.charEmptyItem(p):await this.charPutItem(p),await this.notifyChangeScore(p,this.scsList[u-1])}this.formation.items.find(p=>p.ch.ns!==O.None)!==void 0&&(this.selectedItem=this.formation.items[0])}moveLockedFormation(e){let t=Math.floor(e/3);if(t<0||t>3)return null;const s=this.playerScore();if(s===null||s.length===0)return console.log("[moveLockedFormation] sortedChSummary.length === 0"),null;let n=s.length,i=Math.floor(n/e);n%e&&i++;const o=new Array,l=new Array;for(let N=0;N<i;N++)o.push(new Array),l.push(!1);let a=0;for(let N=0;N<i;N++){let x=0;for(;x<e;)a>=n?(o[N].push(-2),s.push(new Ct)):s[a].prop.fixedType===fe.None?o[N].push(-1):o[N].push(a),x++,a++}const r=new Map([[3,[1,1]],[4,[1,2]],[5,[1,2]],[6,[1,2]],[7,[1,3]],[8,[1,3]],[9,[1,3]]]),c=new Map([[3,[2,2]],[4,[3,3]],[5,[3,3]],[6,[3,4]],[7,[4,5]],[8,[4,5]],[9,[4,6]]]),m=new Map([[3,[3,3]],[4,[4,4]],[5,[4,5]],[6,[5,6]],[7,[6,7]],[8,[6,8]],[9,[7,9]]]),f=new Map([[fe.Front,r],[fe.Center,c],[fe.Backend,m]]);function u(N){let x=-1;for(const M of N){if(M<0)continue;if(s[M].prop.fixedType!==fe.None){x=M;break}}return x}function g(N){let x=-1;for(const M of N){if(M<0)continue;const L=s[M].prop.fixedType,y=f.get(L);if(y===void 0)continue;const I=y.get(e);if(I===void 0)continue;let b=I[0]-1,w=I[1]-1;for(let T=b;T<=w;T++){if(N[T]===-1){x=T;break}if(N[T]===-2){console.log(`[findToIndex] move to space-form(${T})`),x=T;break}}if(x!==-1)break}return x}let p=0,d=0;for(const N of o){for(;;){const x=u(N);if(x===-1)break;const M=g(N);if(M!==-1){console.log(`move from ${x} -> ${d+M}`);const L=N[x%e];s[L].prop.fixedType=fe.None,N[x%e]=d+M,N[M]=L,l[p]=!0}}p++,d+=e}return[l,o]}async makeLvwGroup(e){if(e===void 0)return console.log("[makeLvwGroup] not initialized imgLoader"),!1;const t=this.playerScore();if(t===null||t.length===0)return console.log("[makeLvwGroup] sortedChSummary.length === 0"),!1;const s=this.formation.nFormationItem,n=this.moveLockedFormation(s);if(n===null)return console.log("[makeLvwGroup] lockInfo === null"),!1;const i=n[0],o=n[1];console.log("lockInfo",i,o);const l=t.length;let a=Math.floor(l/s);l%s&&a++;const r=new Array;for(let N=0;N<a;N++)r.push(N+1);const c="player",m=new rs;let f=0,u=0;for(const N of r){if(i[N-1]){u++;const I=N-1,b=o[I],w=m.makeCheckHeader(`${c}Header`,`Locked Form${N}`,`${u}`),T=new Array;let Y=0;for(const Z of b){const X=new sn;if(Z===-2||Z>=l){const _=this.emptyFile,ee=await e.getImageUrlBy(_,"");if(ee===null)continue;X.url=ee,X.toolTip=""}else{let _=Z===-1?(N-1)*s+Y:Z;const ee=t[_],Je=ee.ch,vt=Je.iconFileName,ae=await e.getImageUrlBy(vt,Je.ns);if(ae===null)continue;X.url=ae,X.toolTip=ee.prop.comment+qt.toolTipNewLine+rn.get(ee.prop.fixedType)}T.push(X),Y++}const ce=m.makeImgSubTbl(`${c}SubTbl`,T,`${u}`);m.addGroupPair(w,ce)}u++;const x=m.makeCheckHeader(`${c}Header`,`Form${N}`,`${u}`),M=new Array;let L=0;for(;L<s;){const I=new sn;if(f>=l){const b=this.emptyFile,w=await e.getImageUrlBy(b,"");if(w===null)continue;I.url=w,I.toolTip=""}else{const b=t[f],w=b.ch,T=w.iconFileName,Y=await e.getImageUrlBy(T,w.ns);if(Y===null)continue;I.url=Y,I.toolTip=b.prop.comment}M.push(I),L++,f++}const y=m.makeImgSubTbl(`${c}SubTbl`,M,`${u}`);m.addGroupPair(x,y)}m.makeFooter(),m.setListener(c,this.listCssClassName(),this.listCssClassName()),m.setFontConfig("0.9");const p=document.getElementById(this.dlgContentCssClassName()).getElementsByClassName(this.htmlMakerChSel.defaultToolButtonsCssName),d=this.htmlMakerChSel.GetRect(p[0]);return m.show("0",`${parseInt(d.height)+10}`),m.setSize("350"),m.applyCss(),m.setCheckByRow(rs.allRowAction),m.setCheck(),m.selectFirstCell(rs.allRowAction),m.enableEvents(this.onNotifyLvg),this.lvgAutoFormView=m,!0}createFormationBox(e,t,s,n){this.parentName=t;let i=`
<button id="${this.dlgCssClassName()}-tbView">詳細</button>
`.trim(),o=`
<button id="${this.dlgCssClassName()}-tbLeft">←</button>
<button id="${this.dlgCssClassName()}-tbRight">→</button>
`.trim(),l="";this.autoForm&&(l=`
<button id="${this.dlgCssClassName()}-auto">自動選定</button>
${i}
${o}
`.trim());let a="";this.editFormEnable&&(a=`
${i}
<button id="${this.dlgCssClassName()}-tbput">配置</button>
<button id="${this.dlgCssClassName()}-tbempty">抹消</button>
${o}
`.trim());let r="";this.saveEnable&&(r=`<button id="${this.dlgCssClassName()}-stock">編成保存</button>`);let c=`
${l}
${a}
${r}
`.trim();const m=this.htmlMakerChSel.MakeDefaultToolButtonsHTML(c),f="";let u="";n!==""?u=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${m}
    ${s}
    ${n}
    ${f}
</div>`:u=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${m}
    ${s}
    ${f}
</div>`;const g=new Ce;g.title="<"+e+">",g.SetB2Type(Ge.CopyPaste,this.onCopyPaste),g.SetB4Type(Ae.DialogHide),this.autoForm===!0&&g.SetOType(pe.Option,this.onVisibleToggle);const p=g.NewDialog(t,this.dlgCssClassName());return g.SetContent(t,u),this.applyCss(),g.EnableEventHandlers(),g.onMoveDone=this.moverOnMoveDone,p}addEventHandlers(e){const t=document.getElementById(`${this.dlgCssClassName()}-auto`);t!==null&&(t.onclick=async()=>{await this.onAutoPut()});const s=document.getElementById(`${this.dlgCssClassName()}-tbView`);s!==null&&(s.onclick=async()=>{await this.onCharView()});const n=document.getElementById(`${this.dlgCssClassName()}-tbput`);n!==null&&(n.onclick=async()=>{await this.onCharPut()});const i=document.getElementById(`${this.dlgCssClassName()}-tbempty`);i!==null&&(i.onclick=async()=>{await this.onCharEmpty()});const o=document.getElementById(`${this.dlgCssClassName()}-tbLeft`);o!==null&&(o.onclick=async()=>{await this.onCharLeft()});const l=document.getElementById(`${this.dlgCssClassName()}-tbRight`);l!==null&&(l.onclick=async()=>{await this.onCharRight()});const a=document.getElementById(`${this.dlgCssClassName()}-stock`);a!==null&&(a.onclick=async()=>{if(this.onStock!==void 0){if(this.selectedItem.ch.ns===O.None)return;const r=this.htmlMakerChSel.FindImgByID(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML),c=new us;c.item=this.selectedItem,c.selectedImg=r===null?"":r.src;const m=this.findPropSelectedPos();m!==-1&&(c.scoreSet=this.scsList[m]),await this.onStock(c)}})}addItemEventkHandlers(e,t,s,n){this.onStock=s,this.onPut=e,this.onEmpty=t,this.onPropChanged=n;const i=this.htmlMakerChSel.GetIdByIndex(0);if(this.htmlMakerChSel.SelectByID(this.itemCssClassName(),i),this.htmlMakerChSel.enableEvents(this.itemCssClassName()),this.enableScoreEvent===!0){let o=0;for(const l of this.formation.items){o++;const a=`${this.propItemCssClassName()}-${o}`;this.htmlMakerProp.EnableId(a,!1)}this.htmlMakerProp.enableEvents(this.propCssClassName())}this.setSelectedItem(i)}playerScore(){let e=this.charSummary.sortByScore();if(e===null||e.length===0)return console.log("[playerScore] sortedChSummary.length === 0"),null;const t=new Array;for(const s of e){let n=!1;if(this.gmFilter.length===0)n=!0;else{const i=this.idComboKwMap.get(`${s.ch.id}`);if(i!==void 0){for(const o of i)if(this.gmFilter.find(a=>a===o)!==void 0){n=!0;break}}}console.log("**playerScore**",s.ch,n);for(const i of this.nsFilter)if((i===O.None||s.ch.ns===i)&&n){t.push(s);break}}return t}async onAutoPut(){await this.autoFormation()}async notifyChangeForm(){for(const e of this.formation.items)await this.notifyChangeFormItem(e)}async notifyChangeFormItem(e){e.isEmpty?await this.notiftyOnEmpty(e):await this.notiftyOnPut(e,e.ch.iconFileName)}async notiftyOnPut(e,t){const s=new us;return s.uiName=this.formation.uiInfo.name,s.item=e,s.selectedImg=t,await this.onPut(s),s}async notiftyOnEmpty(e){const t=new us;return t.uiName=this.formation.uiInfo.name,t.item=e,t.selectedImg=this.emptyFile,await this.onEmpty(t),t}async notifyChangeScore(e,t){const s=new bi;s.uiName=this.parentName,s.item=e,s.values=e.values,s.scoreConfigSet=t,await this.onPropChanged(s)}async onCharView(){await this.requestToToolTipMgr(wt.Add)}async requestToToolTipMgr(e){if(this.requestToolTip!==void 0){const t=this.selectedItem.itemID-1;if(await this.loadScoreConfig(this.selectedItem,t)!==null){const n=this.selectedItem.prop.comment!==""?this.selectedItem.prop.comment:this.selectedItem.ch.name,i=new jn;i.reqType=e,i.parentClassName=this.dlgCssClassName(),i.uiName=this.formation.uiInfo.name,i.itemName=`${this.selectedItem.ch.iconFileName}`,i.title=n,i.content=n+this.scsList[this.selectedItem.itemID-1].getScoreText(qt.toolTipNewLine),await this.requestToolTip(i)}}}async onCharPut(){if(this.onPut!==void 0){this.selectedItem.isEmpty=!1;const e=await this.notiftyOnPut(this.selectedItem,"");if(this.formation.put(this.selectedItem,e.selectCh),this.replaceCharImg(this.selectedItem.ch.idAttributeForHTML,e.selectedImg,this.selectedItem.ch.name),this.propSelectedEnabled(!0),this.findPropSelectedPos()!==-1){const s=this.selectedItem.itemID-1,n=await this.loadScoreConfig(this.selectedItem,s);n!==null&&await this.notifyChangeScore(this.selectedItem,n)}}}async onCharEmpty(){if(this.onEmpty!==void 0){this.selectedItem.isEmpty=!0;const e=await this.notiftyOnEmpty(this.selectedItem);this.formation.empty(this.selectedItem),this.replaceCharImg(this.selectedItem.ch.idAttributeForHTML,e.selectedImg,""),this.propSelectedEnabled(!1);const t=this.findPropSelectedPos();t!==-1&&(this.scsList[t]=new V),await this.requestToToolTipMgr(wt.Remove)}}async onCharLeft(){this.canSwap(1)&&await this.formSwap(-1)}async onCharRight(){this.canSwap(this.formation.nFormationItem)&&await this.formSwap(1)}canSwap(e){return!(this.selectedItem===void 0||this.selectedItem.isEmpty===!0||this.selectedItem.itemID===e)}async formSwap(e){const t=this.selectedItem,s=t.itemID-1,n=s+e,i=this.formation.items[n],o=t.ch.idAttributeForHTML,l=i.ch.idAttributeForHTML,a=this.scsList[s],r=this.scsList[n],c=this.itemCssClassName(),m=this.htmlMakerChSel.FindImgByID(c,o),f=this.htmlMakerChSel.FindImgByID(c,l);if(m!==null&&f!==null){this.htmlMakerChSel.SwapImgSrcAndPairToolTip(m,f);const u=`${i.itemKey}${i.itemID}`;this.htmlMakerChSel.UnselectAll(c),this.htmlMakerChSel.SelectByID(c,u),this.formation.items[s]=i,this.formation.items[n]=t,this.formation.items[s].ch.idAttributeForHTML=o,this.formation.items[n].ch.idAttributeForHTML=l,this.scsList[s]=r,this.scsList[n]=a,this.setSelectedItem(u);const g=this.formation.items[n],p=this.formation.items[s];this.enableScoreEvent&&(this.propAutoEnabled(g),this.propAutoEnabled(p)),await this.notifyChangeFormItem(g),await this.notifyChangeFormItem(p),await this.notifyChangeScore(g,this.scsList[s]),await this.notifyChangeScore(p,this.scsList[n])}}async charPutItem(e){const t=await this.notiftyOnPut(e,e.ch.iconFileName);this.replaceCharImg(e.ch.idAttributeForHTML,t.selectedImg,e.prop.comment)}async charEmptyItem(e){const t=await this.notiftyOnEmpty(e);this.replaceCharImg(e.ch.idAttributeForHTML,t.selectedImg,"")}replaceCharImg(e,t,s){this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),e,t),this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(),e,s)}async loadScoreConfig(e,t){if(this.scsList[t].items.length===0){const s=`${e.ch.id}`,n=await this.charDB.getStatus(s);if(n!==null&&n.items!==void 0)return V.renameTitles(n),this.scsList[t]=n,n}else{const s=this.scsList[t];return V.renameTitles(s),s}return null}propSelectedEnabled(e){const t=this.findPropSelectedPos();if(t!==-1){const s=`${this.propItemCssClassName()}-${t+1}`;this.htmlMakerProp.EnableId(s,e)}}propAutoEnabled(e){const t=!e.isEmpty,s=`${this.propItemCssClassName()}-${e.itemID}`;this.htmlMakerProp.EnableId(s,t)}setOptionItem(e,t){const s="ステータス選定";let n=new Array,i="";for(const[r,c]of cn){const m=`${c.displayText}/${r}`;n.push(m),e.autoScoreType===r&&(i=r)}const o=new Nt;o.selectionPair=n,o.selectedItem=i,o.classify=B.cmAutoScore;const l=new ke;l.makeItems(),l.items[0].typeInfo.setCombo(o),l.items[0].className="";const a=new Qs;a.key=B.cmAutoScore,a.text=s,a.value=l,t.push(a)}makeFlyoutGrid(e,t){if(this.scoreGrid!==null)return;this.editingIndex=t,this.savedOpt=new Ue,Ue.copy(this.formationOptList[t],this.savedOpt),this.savedScoreSet=new V,V.copy(e,this.savedScoreSet,!0);const s=Cs(),n=new Array;this.setOptionItem(this.formationOptList[t],n);for(const f of e.items){const u=new Nt;u.selectionPair=f.selectionPair,u.selectedItem=f.selectedVal,u.classify=f.key;const g=new ke;g.makeItems(),g.items[0].typeInfo.setCombo(u),g.items[0].className="";const p=new Qs;p.key=f.key,p.text=s.convTitle(f.title),p.value=g,n.push(p)}const i=t+1,o=new Gn;if(o.setGridtems(n),o.setListener(`${this.gridName}-${i}`,`${this.propItemCssClassName()}-${i}`,this.dlgContentCssClassName(),`${this.gridHeaderName}-${i}`,`${this.gridFooterName}-${i}`),o.setVisible(!0),o.setFontConfig("0.8"),o.setSize("190","200"),o.applyCss(),o.enableEvents(this.onScoreValueSelect),this.scoreGrid=o,this.scoreGrid.footerElem!==null){let f=`
<button id="${this.gridFooterName}-okBtn">OK</button>
<button id="${this.gridFooterName}-canBtn">CANCEL</button>
`.trim();this.scoreGrid.footerElem.innerHTML=f,document.getElementById(`${this.gridFooterName}-okBtn`).onclick=this.onOkClickScoreGrid,document.getElementById(`${this.gridFooterName}-canBtn`).onclick=this.onCancelClickScoreGrid}const l=document.getElementById(this.dlgContentCssClassName()),a=this.htmlMakerChSel.GetRect(l),r=this.htmlMakerChSel.FindDivByClassName(this.parentName,this.propCssClassName());this.htmlMakerChSel.GetRect(r);const c=this.htmlMakerChSel.FindDivByClassName(this.parentName,this.listCssClassName()),m=this.htmlMakerChSel.GetRect(c);o.show(`${parseInt(m.left)-parseInt(a.left)+t*100+5}`,`${parseInt(m.top)-parseInt(a.top)+parseInt(m.height)+5}`)}disposeScorGrid(){this.scoreGrid!==null&&(this.scoreGrid.dispose(),this.scoreGrid=null),this.editingIndex=-1}findPropSelectedPos(){const e=this.htmlMakerChSel.FindDivByClassName(this.dlgContentCssClassName(),this.propCssClassName());if(e!==null&&e.className.startsWith(this.propCssClassName())){let t=-1;for(const s of this.formation.items)if(t++,s===this.selectedItem)return console.log(`pos=${t}`),t}return-1}setSelectedItem(e){const t=this.formation.items.find(s=>e===s.ch.idAttributeForHTML);t&&(this.selectedItem=t)}enableLazyImages(e){this.htmlMakerChSel.initObserver(this.dlgCssClassName(),e)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}propCssClassName(){return`${this.listName}-prop`}propItemCssClassName(){return`${this.listName}-prop-item`}lblCssClassName(){return`${this.listName}-lbl`}listCssClassName(){return`${this.listName}-list`}dlgContentCssClassName(){return`${this.parentName}-dlg-content`}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=this.propCssClassName(),i=this.propItemCssClassName();this.lblCssClassName();const o=parseInt(this.formation.uiInfo.left),l=parseInt(this.formation.uiInfo.top),a=100,r=document.createElement("style");r.textContent=`
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
  ${E.footerButtonText()}
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
${E.footerButtonText()}
}
`.trim(),document.head.appendChild(r);const c=document.getElementById(this.parentName);this.htmlMakerChSel.copyCssToInlineStyle(`.${this.parentName}`,c)}}class us{constructor(){this.cancel=!1}}class bi{constructor(){this.uiName="",this.cancel=!1}}class $t{constructor(){this.ch=new Ie,this.prop=new oe,this.isEmpty=!0,this.TextMap=""}static toJsonText(e){const t=Ie.toJsonInst(e.ch);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new $t;t.ch=Ie.toJsonInst(e.ch),oe.copy(e.prop,t.prop),t.isEmpty=e.isEmpty;const s=Object.fromEntries(e.details.TextMap);return t.TextMap=JSON.stringify(s,null,2),t}static fromJsonInst(e){const t=new Cn;t.ch=Ie.fromJsonInst(e.ch),oe.copy(e.prop,t.prop),t.isEmpty=e.isEmpty;const s=new Map(Object.entries(JSON.parse(e.TextMap)));return t.details.TextMap=s,t}}class Fe{static toJsonText(e,t,s){const n=Fe.toJsonInst(e,t,s);return JSON.stringify(n,null,2)}static toJsonInst(e,t,s){const n=new Fe;n.items=new Array,n.scsList=new Array,n.formationOptList=new Array;for(const i of e.items)n.items.push($t.toJsonInst(i));for(const i of t)n.scsList.push(i);if(s===void 0)console.log(`[FormationSetJson::toJsonInst] optList === undefined (${e.uiInfo.name})`);else for(const i of s)n.formationOptList.push(i);return n}static fromJsonInst(e){const t=new bs;t.items=new Array;for(const s of e.items)t.items.push($t.fromJsonInst(s));return t}}class ln{constructor(){this.filterUiName="FilterOption",this.filterToolTip=null,this.onOptionChanged=async(e,t,s,n)=>{this.filterToolTip!==null&&(e.includes("ns")?(console.log("onPlayerOptionChanged::radio(ns)",e,t,s,n),this.filterToolTip.SetTableValue(e,t,s,n),this.chListUI!==void 0&&await this.chListUI.onNsOptionChanged(this.ns1Cell,this.ns2Cell),this.playerForm!==void 0&&await this.playerForm.onNsOptionChanged(this.ns1Cell,this.ns2Cell)):e.includes("gm")?(console.log("onPlayerOptionChanged::radio(gm)",e,t,s,n),this.filterToolTip.SetTableValue(e,t,s,n),this.chListUI!==void 0&&await this.chListUI.onGmOptionChanged(this.gmCells),this.playerForm!==void 0&&await this.playerForm.onGmOptionChanged(this.gmCells)):console.log("onPlayerOptionChanged::radio(*bug*)",e,t,s,n))},this.gmCells=new Array}async makeFilterToolTip(e,t,s){const n=U.MakeUniqueName(e,"optionUI");if(U.FindBy(n)!==null)return null;U.Add(n);const o=U.FindBy(n);if(o!==null){const l=await this.makeFilterTable();o.name=n,o.VisibleMgrBtn(!1),o.SetTitle(t+"：オプション"),o.SetTable(l,this.filterCssText()),o.onChangedTableSelection=this.onOptionChanged,o.closeType=Tt.InVisible,o.MgrType=Ze.NotMgr,o.heightPx="250",o.applyCss(),o.Show(s.className),o.SetVisible(!0),o.EnableEvents()}return this.filterUiName=e,this.filterToolTip=o,o}setTableRow(e,t,s,n,i,o,l){i.getCell(e,t).typeInfo.setLabel(s,!1),i.getCell(e,t).className=o,i.getCell(e,t).typeInfo.using.itemId=t+i.firstRowIndex,e++;const a=i.getCell(e,t);return a.typeInfo.setRadio(n),a.className=l,a.typeInfo.using.itemId=t+i.firstRowIndex,a}makeFilterTable(){const e=new Array;e.push(`なし/${O.None}`);for(const c of this.nsDefines)e.push(`${[c.nsName]}/${c.ns}`);const t=new Xe;t.selectionPair=e,t.selectedItem=O.None,t.classify="optionUI-opt-ns1";const s=new Xe;s.selectionPair=e,s.selectedItem=O.None,s.classify="optionUI-opt-ns2";const n=2,i=2+this.comboKwRows.length,o=new K;o.makeDim(n,i),this.ns1Cell=this.setTableRow(0,0,"NSフィルタ1",t,o,this.itemNameCssClassName(),this.ns1CssClassName()),this.ns2Cell=this.setTableRow(0,1,"NSフィルタ2",s,o,this.itemNameCssClassName(),this.ns2CssClassName());const l=new Array;let a=-1,r=-1;for(const c of this.comboKwRows){a++;const m=new Array,f=new Array;for(const d of c){r++,m.push(`${d}/${r}`);const N=`${r}`;l.find(x=>x===N)!==void 0&&f.push(N)}const u=new Xe;u.selectionPair=m,u.selectedItems=f,u.selectType=bt.Multi,u.classify="optionUI-opt-gm1";const g=a===0?"GMフィルタ":"　　　　　",p=this.setTableRow(0,2+a,g,u,o,this.itemNameCssClassName(),this.gm1CssClassName());this.gmCells.push(p)}return o}filterCssText(){const e=this.ns1CssClassName(),t=this.ns2CssClassName(),s=this.gm1CssClassName(),n=E.radioBackClassMark,i=E.radioActiveKeyText;return`
/* タイトル */
[class*="${this.itemNameCssClassName()}"] {
white-space: nowrap;
}
/* ========================================================
右側のセルの箱（td、またはその中のdivコンテナ）のOR指定
======================================================== */
[id*="${e}${n}"], 
[id*="${t}${n}"],
[id*="${s}${n}"] {
${E.radioBackCssText}
width: 96%;           /* 親のツールチップの幅いっぱいに広げる */
}

/* ========================================================
各選択肢ボタンそれぞれの法律（OR指定で均等分配）
======================================================== */
[id*="${e}"], 
[id*="${t}"],
[id*="${s}"] {
${E.radioNormCssText}
}

/* ========================================================
現在選択されているアイテム（is-active）が光る法律のOR指定
======================================================== */
[id*="${e}"].${i}, 
[id*="${t}"].${i},
[id*="${s}"].${i} {
${E.radioActCssText}
}
`.trim()}tableRowCssClassName(){return`${this.filterUiName}-row`}itemNameCssClassName(){return`${this.filterUiName}-title`}ns1CssClassName(){return`${this.filterUiName}-ns1`}ns2CssClassName(){return`${this.filterUiName}-ns2`}gm1CssClassName(){return`${this.filterUiName}-gm1`}}class Vt{constructor(){this.chName="",this.autoScoreType=Se.None}static copy(e,t){t.chName=e.chName,t.autoScoreType=e.autoScoreType}}class Ns{constructor(e,t,s=!0,n){this.isEmpty=!0,this.allAvailable=!1;const i=new ve;i.ns=e.ns,i.id=e.id,i.name=e.name,this.ch=i;const o=new Vt;Vt.copy(t,o),this.prop=o,this.isEmpty=s,this.scoreSet=n}get score(){let e=0;if(this.prop.autoScoreType===Se.None)e=Math.ceil(this.scoreSet.stdScore);else{const t=cn.get(this.prop.autoScoreType),s=t===void 0?1:t.ratio;e=Math.ceil(this.scoreSet.maxScore*s)}return e}static copy(e,t){t.ch.ns=e.ch.ns,t.ch.id=e.ch.id,t.ch.name=e.ch.name,Vt.copy(e.prop,t.prop),t.isEmpty=e.isEmpty,t.scoreSet=new V,V.copy(e.scoreSet,t.scoreSet,!0)}}class xs{Add(e){if(e===void 0){console.log("[VersusGroupRow::Add] scItem === undefined");return}this.columns===void 0&&(this.columns=[]),this.columns.push(e)}Count(){return this.columns.length}debug(){if(this.columns===void 0){console.log("[VersusGroupRow::debug] this.columns === undefined");return}console.log("**VersusGroupRow**",this.columns)}}xs.defNumColumn=5;class Ms{Add(e){this.groupRows===void 0&&(this.groupRows=[]),this.groupRows.push(e)}Count(){return this.groupRows.length}debug(){if(this.groupRows===void 0)console.log("this.groupRows === undefined");else for(const e of this.groupRows)e.debug()}async loadJson(e){const n=(await new St().loadJson(e)).groupRows.map(o=>Object.assign(new xs,o)),i=new Ms;return i.groupRows=n,i}}const Pe={None:"None",Player:"Player",Enemy:"Enemy"},Ee={None:"None",Attr:"Attr",Role:"Role"},_t={HiLv:"HiLv"},de={Likely:"Likely",Uncertain:"Uncertain",Wishful:"Wishful"};class Qt{}Qt.Likely=.9;Qt.Uncertain=.64;class ws{constructor(){this.scoreItems=[],this.formationType=Pe.None,this.boost=0}get imgPrefix(){return this.formationType===Pe.Player?"ftPlayer":"ftEnemy"}get judgeWidth(){return 48}setScoreItems(e){if(e!==void 0){this.scoreItems=new Array;for(const t of e){const s=new Ns(t.ch,t.prop,t.isEmpty,t.scoreSet);this.scoreItems.push(s)}}}async toCharHTML(e,t){const s=t.isEmpty?e.demoMaterial:t.ch.iconFileName,n=t.ch.ns===O.None?"":t.ch.ns,i=await e.getImageUrlBy(s,n);let o=this.scoreToolTip(t);return o!==""&&(o=`title="${o}"`),`
<img class=${this.charCssClassName()}
  src="${i}"
  ${o}>
`.trim()}scoreToolTip(e){return e.isEmpty?"":`${e.prop.chName}
score=${e.score}`}async toJudgeHTML(e,t){const s=this.toJudgeFileURL(e,t);return`<img class=${this.judgeCssClassName()} src="${s}" width="48">`}async toJudgeFileURL(e,t){let s=null;switch(t){case de.Likely:s=await e.getImageUrlBy("win.png",e.AnyNs);break;case de.Uncertain:s=await e.getImageUrlBy("even.png",e.AnyNs);break;case de.Wishful:s=await e.getImageUrlBy("lost.png",e.AnyNs);break;default:return""}return s}charCssClassName(){return"combat-char"}judgeCssClassName(){return"combat-judge"}get combatScore(){if(this.scoreItems===void 0)return 0;const e=this.scoreItems.reduce((s,n)=>n.isEmpty?s:s+n.score,0),t=this.boost===0?1:this.boost;return Math.ceil(e*t/100)}get checkNsCombo(){if(this.scoreItems===void 0){console.log(`[checkNsCombo] scoreItems undefined (${this.formationType})`);return}const e=Array();for(const i of this.scoreItems){if(i.isEmpty||i.ch.ns===O.None)continue;const o=new Ns(i.ch,i.prop,i.isEmpty,i.scoreSet);e.push(o)}if(e.length==0){console.log(`[checkNsCombo] no scoreItems (${this.formationType})`);return}let t=O.None,s=0;const n=new Map;for(const i of e){if(t===O.None){t=i.ch.ns,s=1;continue}if(t!==i.ch.ns){t=i.ch.ns,s=1;continue}s++,s>=2&&(n.has(t),n.set(t,s))}return n}calcNsScore(e){const t=this.checkNsCombo;if(t===void 0)return 0;let s=0;for(const[n,i]of t){if(!e.has(i))continue;const o=e.get(i);o!==void 0&&(s+=o)}return s}calcGmScore(e){let t=0;for(const[s,n]of this.gmComboKeywords)e.has(n)&&(t+=e.get(n));return t}}class Ni{constructor(){this.hasCombo=!1,this.winRate=new Map}setPlayer(e){e.formationType=Pe.Player,this.player=e}setEnemy(e){e.formationType=Pe.Enemy,this.enemy=e}judge(e){const s=this.winRate.get(e);return s>=Qt.Likely?de.Likely:s>=Qt.Uncertain?de.Uncertain:de.Wishful}judgeForEnemy(e){switch(e){case de.Likely:return de.Wishful;case de.Uncertain:return de.Uncertain;case de.Wishful:return de.Likely}}}class wi{constructor(){this.uiInfo=new qe,this.combatPairs=new Map,this.gameConfig=void 0,this.option=void 0,this.guide=void 0,this.parentName="",this.tableName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new P().SaveSetting(e),this.requestActivate!==void 0&&await this.requestActivate(e)},this.onVisibleToggle=async(e,t)=>{if(console.log("**onVisibleToggle**"),this.option!==void 0){this.option.SetVisible(!this.option.GetVisible());return}},this.onGuide=async(e,t,s)=>{if(this.guide!==void 0){this.guide.setVisible(!this.guide.getVisible());return}const n=this.parentName,i=new Map,o=new Zs;o.value.makeItems(1),o.value.items[0].typeInfo.setLabel("NS : 0",!1),o.value.items[0].className=`${n}-guide-ns`,i.set("ns",o);const l=new Zs;l.value.makeItems(1),l.value.items[0].typeInfo.setLabel("GM : 0",!1),l.value.items[0].className=`${n}-guide-gm`,i.set("gm",l);const a=this.htmlMaker.GetRect(e.parentElement),r=this.htmlMaker.GetRect(s),c=new zn;c.setGuidetems(i),c.setListener(`${n}-guide`,n,`${n}-guide`),c.setFontConfig("0.7"),c.applyCss(),c.enableOverlay(!1),c.show(`${parseInt(r.left)-parseInt(a.left)+34}`,"0"),this.guide=c,this.updateGuide()}}setPair(e,t){this.combatPairs.set(e,t)}calcCombatScore(){for(const[e,t]of this.combatPairs){if(t.player===void 0||t.enemy===void 0)continue;const s=[Ee.None,Ee.Attr,Ee.Role];for(const n of s){let i=t.player.combatScore,o=t.enemy.combatScore;if(console.log("**normal score**",i,o),this.gameConfig!==void 0){console.log("** NS combo checking ... **");const l=t.player.checkNsCombo,a=t.enemy.checkNsCombo,r=this.gameConfig.nsComboScoreList,c=this.gameConfig.gameComboScoreList;if(r.size===0&&console.log("** NS score disable or empty **"),c.size===0&&console.log("** GM score disable or empty **"),l!==void 0){let m=t.player.calcNsScore(r);console.log(`** player nsScoreAdd : ${m} **`),i+=m}if(a!==void 0){let m=t.enemy.calcNsScore(r);console.log(`** enemy nsScoreAdd : ${m} **`),o+=m}if(this.gameConfig.gameComboAvail>=1){let m=t.player.calcGmScore(c),f=t.enemy.calcGmScore(c);console.log(`** player gmScore : ${m} **`),console.log(`** enemy  gmScore : ${f} **`),i+=m,o+=f}}else console.log("** NS combo skipped **");console.log("**result score**",i,o),t.winRate.set(n,o!==0?i/o:1)}}}async replaceChar(e,t,s,n,i){const o=this.combatPairs.get(e);let l;if(t===Pe.Player?l=o?.player:t===Pe.Enemy&&(l=o?.enemy),l===void 0)return!1;const a=s.itemID;if(a<0)return!1;const r=a-1;l=l;const m=`${l.imgPrefix}${a}`,f=l.scoreItems[r],u=f.ch;let g="";s.isEmpty?(u.id=0,u.name="",g=i.demoMaterial,console.log("[replaceChar] set empty")):(u.id=n.id,u.name=n.name,g=u.iconFileName,console.log(`[replaceChar] set char ${n.id}:${n.name}`)),f.isEmpty=s.isEmpty;const p=u.ns===O.None?"":u.ns,d=await i.getImageUrlBy(g,p);if(d===null)return!1;const N=new A,x=this.outerCssClassName();return N.ReplaceImg(x,m,d),!0}async replaceJudge(e){async function t(i,o){const l=await i.toJudgeFileURL(e,o);if(l===null)return;const a=i.imgPrefix;for(let r=0;r<i.scoreItems.length;r++){const c=`${a}${r+1}`,m=s.FindImgsByID(n,c);if(m===null||m.length<=1){console.error("fail on judge marker");continue}const f=m[1];s.SetImgSrc(f,l),i.scoreItems[r].isEmpty?s.SetImgSize(f,0,0):s.SetImgSize(f,i.judgeWidth,i.judgeWidth);const u=i.scoreItems[r];s.ReplaceImgToolTip(n,c,i.scoreToolTip(u))}}const s=new A,n=this.outerCssClassName();for(const[i,o]of this.combatPairs){if(o.player===void 0||o.enemy===void 0)continue;const l=[Ee.None,Ee.Attr,Ee.Role];for(const a of l){if(a!==Ee.None)continue;const r=o.judge(a),c=o.judgeForEnemy(r);await t(o.player,r),await t(o.enemy,c)}}}async updateGuide(){if(this.guide===void 0||this.gameConfig===void 0||this.combatPairs.has(_t.HiLv)===!1)return;const e=this.combatPairs.get(_t.HiLv);if(e===void 0)return;const t=e.player.checkNsCombo,s=e.enemy.checkNsCombo,n=this.gameConfig.nsComboScoreList,i=this.gameConfig.gameComboScoreList;let o=0;t!==void 0&&(o=e.player.calcNsScore(n));let l=0;s!==void 0&&(l=e.enemy.calcNsScore(n));let a=0,r=0;this.gameConfig.gameComboAvail>=1&&(a=e.player.calcGmScore(i),r=e.enemy.calcGmScore(i)),this.guide.setTextByKey("ns",`NSコンボ：P=${o} vs E=${l}`),this.guide.setTextByKey("gm",`GMコンボ：P=${a} vs E=${r}`)}async toHTML(e,t){this.tableName=e;const s=document.createElement("table");s.className=e,s.id=e;const n=document.createElement("tbody");s?.appendChild(n);async function i(l,a){const r=document.createElement("tr");n?.appendChild(r);const c=await a.toJudgeHTML(t,l),m=a.imgPrefix;let f=0;for(const u of a.scoreItems){f++;const g=await a.toCharHTML(t,u),p=`
<div class=${o} item-id="${m}${f}">
  ${g}
  ${c}
</div>
`.trim(),d=document.createElement("td");d.innerHTML=p,r.appendChild(d)}}const o=this.outerCssClassName();for(const[l,a]of this.combatPairs){const r=a.judge(Ee.None),c=a.judgeForEnemy(r);await i(r,a.player),await i(c,a.enemy)}return s.outerHTML}createCombatBox(e,t,s){this.parentName=t,this.htmlMaker=new A;const n=`<div class="${this.parentName}-dlg-content">
    ${s}
</div>`,i=new Ce;i.title="<"+e+">";const o=i.NewDialog(t,this.dlgCssClassName());return i.SetOType(pe.Option,this.onVisibleToggle),i.SetGuide(dt.Guide,this.onGuide),i.SetContent(t,n),this.applyCss(),i.EnableEventHandlers(),i.onMoveDone=this.moverOnMoveDone,o}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}outerCssClassName(){return"combat-outer"}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const e=new ws,t=`.${this.outerCssClassName()}`,s=`.${e.charCssClassName()}`,n=`.${e.judgeCssClassName()}`,i=parseInt(this.uiInfo.left),o=parseInt(this.uiInfo.top),l=document.createElement("style");l.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,i,o)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.parentName}-dlg-content {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}
.${this.tableName} {
${E.spacingTable}
}
.${this.tableName} tr {
${E.spacingTr}
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
`.trim(),document.head.appendChild(l);const a=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,a)}}const ct={Unknown:"Unknown",Success:"Success",Fail:"Fail",Cancel:"Cancel"};async function an(h){const e=h.isWebRunning,t=h.currentUserHome,s=h.chStatusListFile,n=h.chListFile,i=new li,o=new A,l="splash-screen";o.initFullScreen(l,"エボナ データベース初期化中..."),o.applyFullScreenCss(l);const a=o.getFullScreenMsgElem(l),r=a!==null?a.innerHTML:"";await h.loadEnvSetting(),h.applyImageHome();const c=as.get(h.envWallpaperType);c!==void 0&&h.replaceWallpaper(c.png),console.log("**mainNormal()**",h);const f=await new vs().LoadList(n);let u;if(t===h.user1Home){u=[{ns:O.CnsRed,nsName:"赤属性"},{ns:O.CnsBlue,nsName:"青属性"},{ns:O.CnsGreen,nsName:"緑属性"},{ns:O.CnsYellow,nsName:"黄属性"},{ns:O.CnsViolet,nsName:"紫属性"}];for(const C of u)a!==null&&(a.innerHTML=`${r} ${C.nsName}`),await i.setupNs(C.ns,h,f)}if(t===h.user2Home){u=[{ns:O.CnsBlue,nsName:"藍属性"},{ns:O.CnsRed,nsName:"紅属性"},{ns:O.CnsGreen,nsName:"翠属性"},{ns:O.CnsYellow,nsName:"黄属性"},{ns:O.CnsWhite,nsName:"天属性"},{ns:O.CnsBlack,nsName:"冥属性"}];for(const C of u)a!==null&&(a.innerHTML=`${r} ${C.nsName}`),await i.setupNs(C.ns,h,f)}let g;g=await h.loadGameConfig(h.gameType),console.log(g),h.onGameConfigChanged=async C=>{C.receivedBool===!0&&(console.log("onGameConfigChanged"),console.log(C.receivedBool),g=await h.loadGameConfig(h.gameType),console.log(g),await os())},h.startBcHelper(),a!==null&&(a.innerHTML="UI 初期化中 ...");const p=new ts;p.env=h;const d=new es;await d.loadDB(s),d.charSpecSet=f,await d.loadAuxScoreSet(h.gameType);const N=await d.getComboNameMap(),x=N[0],M=N[1],L=hi(h.gameType,M),y=ui(L);async function I(){const C=new ri;C.chSet=f,C.uiInfo.name=b,C.uiInfo.left="300",C.uiInfo.top="100";const k=C.uiInfo.name,$=await C.toHTML(i);if(e){const v=w,S=C.createSelectorBox(v,k,$);C.addEventHandlers(S),C.addItemEventHandlers(),C.enableLazyImages(i),S.show(),T=S;const H=new we;H.setAsDlg(S,v),p.add(H)}return C}const b="charListArea",w="キャラ選択";let T;const Y=await I();Y.idComboKwMap=x;async function ce(){const C=new yn;await C.load(),C.uiInfo.name="CharSummary",C.uiInfo.left="400",C.uiInfo.top="100";const k=C.uiInfo.name,$=await C.toHTML();if(e){const v="キャラ一覧",S=C.createSummaryBox(v,k,$);C.addEventHandlers(S,async D=>{D.selectCh=Y.selectedCh;const z=await i.getImageUrlBy(Y.selectedCh.iconFileName,Y.selectedCh.ns);if(z===null)D.selectedImg="",D.cancel=!0;else{D.selectedImg=z,D.cancel=!1;const j=await d.getStatus(Y.selectedCh.idAsText);D.scoreSet=j}console.log(`selected ch = ${D.selectCh.name}`)}),await C.createCharSummaryNodes(i,u),C.enableLazyImages(i),S.show();const H=new we;H.setAsDlg(S,v),p.add(H)}return C}const Z=await ce();async function X(C,k,$,v){const S=new Ci;C===le&&(S.InitForPlayer(Z),S.autoForm=!0,S.editFormEnable=!1,S.saveEnable=!1,S.imgLoader=i),C===_&&(S.InitForEnemy(d),S.autoForm=!1,S.editFormEnable=!0,S.saveEnable=!0),S.formation.uiInfo.name=C,S.formation.uiInfo.left=`${k}`,S.formation.uiInfo.top=`${$}`;const H=S.formation.uiInfo.name,D=await S.toHTML(H),z=C===_?S.toGridHTML():"";if(e){const j=S.createFormationBox(v,H,D,z);S.addEventHandlers(j),S.addItemEventkHandlers(async J=>{let re="",ls="";J.selectedImg===""?(re=Y.selectedCh.iconFileName,ls=Y.selectedCh.ns,J.selectCh=Y.selectedCh):(re=J.item.ch.iconFileName,ls=J.item.ch.ns,J.selectCh=J.item.ch);const Ys=await i.getImageUrlBy(re,ls);Ys!==null&&(J.selectedImg=Ys,J.item.isEmpty=!1,js(J.uiName,J.item,J.selectCh))},async J=>{const re=await i.getImageUrlBy(J.selectedImg,Y.selectedCh.ns);re!==null&&(J.selectedImg=re,J.item.isEmpty=!0,js(J.uiName,J.item,J.selectCh))},async J=>{console.log(`selected ch = ${J.item.ch.name}`)},async J=>{await os()}),S.enableLazyImages(i),j.show(),C===le&&(vt=j);const be=new we;be.setAsDlg(j,v),p.add(be)}return S}const le="playerForm",_="enemyForm",ee="自編成",Je="敵編成";let vt;const ae=await X(le,100,100,ee),Me=await X(_,100,200,Je);ae.idComboKwMap=x;const st="combatForm",Ls="対戦予想";let Bs;async function Nn(C,k,$,v){te.uiInfo.name=C,te.uiInfo.left=`${k}`,te.uiInfo.top=`${$}`;const S=await te.toHTML("combatTable",i),H=te.createCombatBox(v,C,S);te.enableLazyImages(i),await te.replaceJudge(i),H.show(),Bs=H;const D=new we;D.setAsDlg(H,v),p.add(D)}const te=new wi;await Ks(),await Nn(st,120,300,Ls);const As="保存";new we().setAsMenu(As);const Hs="復帰";new we().setAsMenu(Hs);const nt="dockForm",wn="環境設定";let it=null;const Tn=await p.toHTML(nt,i);if(e){const C=p.createDockBox(nt,Tn);p.addItemClickHandlers(async k=>{p.stdApplyAction(k)!==!1&&k.item.isMenuType&&(k.item.toolTip===As&&await In(),k.item.toolTip===Hs&&await kn(async v=>{if(console.log(`[loadedResult] ${v}`),v!==ct.Success)return;const S=Fe.fromJsonInst(xt),H=Fe.fromJsonInst(Mt);xt=null,Mt=null,await ae.Setup(S,i),await Me.Setup(H,i)}))}),p.enableLazyImages(i),C.show(),it=C}const Fs="playerForm.json",Rs="enemyForm.json",Ds="dockForm.json";async function In(){p.InitZOrder(Oe);const C=Fe.toJsonText(ae.formation,ae.scsList,ae.formationOptList),k=Fe.toJsonText(Me.formation,Me.scsList,Me.formationOptList),$=Xt.toJsonText(p),v=new window.JSZip;v.file(Fs,C),v.file(Rs,k),v.file(Ds,$);const S=await v.generateAsync({type:"blob"}),H="gameConfig.zip",D=URL.createObjectURL(S),z=document.createElement("a");z.href=D,z.download=H,z.click(),URL.revokeObjectURL(D),console.log("saved!")}let Ps=null,xt=null,Mt=null;async function kn(C){const k=document.createElement("input");return k.type="file",k.accept=".zip",k.addEventListener("cancel",()=>(console.log("Cancelled."),ct.Cancel)),k.addEventListener("change",async()=>{if(k.files.length==1){console.log("File selected: ",k.files[0].name);const v=await k.files[0].arrayBuffer(),H=await new window.JSZip().loadAsync(v);async function D(j){const be=H.file(j);if(be){const J=await be.async("string"),re=JSON.parse(J);return console.log(re),re}}{const j=await D(Ds);j&&(Ps=j)}{const j=await D(Fs);j&&(xt=j)}{const j=await D(Rs);j&&(Mt=j)}const z=Ps!==null&&xt!==null&&Mt!==null?ct.Success:ct.Fail;C(z)}}),k.click(),ct.Unknown}const Oe=new P;if(e&&(Oe.AddDialogs(),Oe.AssignIndexies(),await Oe.LoadAllSetting(),await Oe.loadSetting(it),p.InitZOrder(Oe),await Oe.ForEachAsync(C=>{const k=Ce.FindDialogParent(C);return k!==null&&(h.isLocal||C==="charListArea"?k.hidden=!1:k.hidden=h.evonaType!==Ne.Full),!0}),it!==null&&(it.parentElement.hidden=h.evonaType!==Ne.Full)),await Z.showCharSummaryNodes(),e){const C="ツールチップ一覧",k=U.toHTML(),$=U.createMgrBox(C,k);U.uiInfo.left="400",U.uiInfo.top="100",U.applyCss(),$.show(),U.enableEvents();const v=new we;v.setAsDlg($,C),p.add(v)}ae.requestToolTip=Os,Me.requestToolTip=Os;async function Os(C){console.log(`[${C.uiName}] requestToolTip`);const k=U.MakeUniqueName(C.uiName,C.itemName),$=U.FindBy(k);switch(C.reqType){case wt.Add:if($===null){U.Add(k);const v=U.FindBy(k);if(v!==null){let S="*unknown*";switch(C.uiName){case le:S=ee;break;case _:S=Je;break}v.name=k,v.SetTitle(S),v.SetMemoText(C.content),v.applyCss(),v.Show(C.parentClassName),v.SetVisible(!0),v.EnableEvents();const H=U.AddRow();U.SetTitle(H,S,C.title)}}break;case wt.Remove:$!==null&&U.Remove(k);break}}function Us(){return`${st}-optionUI-row`}function ot(){return`${st}-optionUI-title`}function Gs(){return`${nt}-optionUI-url`}function Vs(){return`${nt}-optionUI-wallpaper`}function Lt(){return`${st}-optionUI-boost`}function ss(C,k,$,v,S,H,D){S.getCell(C,k).typeInfo.setLabel($,!1),S.getCell(C,k).className=H,S.getCell(C,k).typeInfo.using.itemId=k+S.firstRowIndex,C++;const z=S.getCell(C,k);return z.typeInfo.setRadio(v),z.className=D,z.typeInfo.using.itemId=k+S.firstRowIndex,z}const $n=async function(C,k,$,v){switch(console.log("onEnvOptionChanged::radio",C,k,$),C){case"optionUI-opt-envurl":switch(k){case ge.GitHub:case ge.GitHubLocal:case ge.Local:h.envUrlType=k,await h.saveEnvSetting();break}break;case"optionUI-opt-envwp":const S=as.get(k);S!==void 0&&(h.replaceWallpaper(S.png),h.envWallpaperType=k,await h.saveEnvSetting());break}};function En(){const C=new Xe,k=new Array;for(const[D,z]of An)h.isLocal===!1&&D===ge.Local||k.push(`${[z]}/${D}`);C.selectionPair=k,C.selectedItem=h.envUrlType,C.classify="optionUI-opt-envurl";const $=new Xe,v=new Array;for(const[D,z]of as)v.push(`${[z.displayText]}/${D}`);$.selectionPair=v,$.selectedItem=h.envWallpaperType,$.classify="optionUI-opt-envwp";const S=2,H=new K;return H.makeDim(S,2),ss(0,0,"URL選択",C,H,ot(),Gs()),ss(0,1,"壁紙選択",$,H,ot(),Vs()),H.makeRowTemplate(Us()),H}function Sn(){const C=Gs(),k=Vs(),$=E.radioBackClassMark,v=E.radioActiveKeyText;return`
/* タイトル */
[class*="${ot()}"] {
white-space: nowrap;
}
/* 右側のセルの箱（td、またはその中のdivコンテナ） */
[id*="${C}${$}"], 
[id*="${k}${$}"] {
${E.radioBackCssText}
width: 92%;        /* 親のツールチップの幅いっぱいに広げる */
}
/* 5つの選択肢（div）それぞれの法律 */
[id*="${C}"], 
[id*="${k}"] {
${E.radioNormCssText}
}
/* 現在選択されているアイテム（selectedItem = '1' など）が光る法律 */
[id*="${C}"].${v}, 
[id*="${k}"].${v} {
${E.radioActCssText}
}
`.trim()}async function vn(){const C=U.MakeUniqueName(nt,"optionUI");if(U.FindBy(C)!==null)return null;U.Add(C);const $=U.FindBy(C);if($!==null){const v=wn,S=await En();$.name=C,$.VisibleMgrBtn(!1),$.SetTitle(v+""),$.SetTable(S,Sn()),$.onChangedTableSelection=$n,$.closeType=Tt.InVisible,$.MgrType=Ze.NotMgr,$.applyCss(),$.Show(it.className),$.SetVisible(!1),$.EnableEvents()}return $}const zs=await vn();zs!==null&&(p.envOptionToolTip=zs);const Bt=new ln;Bt.nsDefines=u,Bt.comboKwRows=y;const ns=await Bt.makeFilterToolTip(b,w,T);ns!==null&&(Y.option=ns,Bt.chListUI=Y,ns.SetVisible(!1));const At=new ln;At.nsDefines=u,At.comboKwRows=y;const is=await At.makeFilterToolTip(le,ee,vt);is!==null&&(ae.option=is,At.playerForm=ae,is.SetVisible(!1));const xn=async function(C,k,$,v){console.log("onCombatOptionChanged::radio",C,k,$);const S=Xs.get(k);if(S!==void 0){for(const[H,D]of te.combatPairs)D.enemy.boost=S.ratio;await os()}};function Mn(){const C=new Xe,k=new Array;for(const[S,H]of Xs)k.push(`${[H.displayText]}/${S}`);C.selectionPair=k,C.selectedItem=Ye.B100,C.classify="optionUI-opt-boost";const $=2,v=new K;return v.makeDim($,1),ss(0,0,"ブースト率",C,v,ot(),Lt()),v.makeRowTemplate(Us()),v}function Ln(){const C=E.radioBackClassMark,k=E.radioActiveKeyText;return`
/* タイトル */
[class*="${ot()}"] {
white-space: nowrap;
}
/* 右側のセルの箱（td、またはその中のdivコンテナ） */
[id*="${Lt()}${C}"] {
${E.radioBackCssText}
width: 92%;        /* 親のツールチップの幅いっぱいに広げる */
}
/* 5つの選択肢（div）それぞれの法律 */
[id*="${Lt()}"] {
${E.radioNormCssText}
}
/* 現在選択されているアイテム（selectedItem = '1' など）が光る法律 */
[id*="${Lt()}"].${k} {
${E.radioActCssText}
}
`.trim()}async function Bn(){const C=U.MakeUniqueName(st,"optionUI");if(U.FindBy(C)!==null)return null;U.Add(C);const $=U.FindBy(C);if($!==null){const v=Ls,S=await Mn();$.name=C,$.VisibleMgrBtn(!1),$.SetTitle(v+"：オプション"),$.SetTable(S,Ln()),$.onChangedTableSelection=xn,$.closeType=Tt.InVisible,$.MgrType=Ze.NotMgr,$.applyCss(),$.Show(Bs.className),$.SetVisible(!0),$.EnableEvents()}return $}const qs=await Bn();qs!==null&&(te.option=qs),o.hideFullScreenCss(l),Y.requestActivate=We,Z.requestActivate=We,ae.requestActivate=We,Me.requestActivate=We,te.requestActivate=We,U.requestActivate=We;async function We(C){console.log(`[${C.className}] requestActivate`),p.activateItem(C)}function Js(C){const k=new Ms,$=new xs,v=C.formation;v.uiInfo.name,v.uiInfo.name,C.scsList===void 0&&console.log(`[${C.formation.uiInfo.name}] 対戦予想結果の作成は工事中です`);let S=0;for(const H of v.items){if(C.scsList===void 0)continue;let D=!0;(C.formationOptList===void 0||C.formationOptList!==void 0&&C.formationOptList.length<1)&&(D=!1,v.uiInfo.name===_&&console.log(`[${C.formation.uiInfo.name}] 敵編成の「スコアの自動選定」は工事中です`));const z=C.scsList[S];if(z.ns===O.None){const re=H.ch.ns;z.ns=re,console.log(`[toScoreRes] set ns (${C.formation.uiInfo.name}::${H.ch.name}) : None -> ${re}`)}let j=Se.None;D&&(j=C.formationOptList[S].autoScoreType),S++;const be=new Vt;be.chName=H.prop.comment,be.autoScoreType=j;const J=new Ns(H.ch,be,H.isEmpty,z);J.allAvailable=z.allAvailable,$.Add(J)}return k.Add($),k}function Ws(C){const k=new Array,$=C.formation;for(const v of $.items)v.isEmpty!==!0&&v.ch.ns!==O.None&&k.push(`${v.ch.id}`);return k}async function Ks(){te.gameConfig=g;const C=Js(ae),k=Js(Me),$=Ws(ae),v=Ws(Me),S=await d.getComboKeywords($),H=await d.getComboKeywords(v),D=new ws;D.setScoreItems(C.groupRows[0].columns),D.gmComboKeywords=S,D.boost=100;const z=new ws;z.setScoreItems(k.groupRows[0].columns),z.gmComboKeywords=H,z.boost=100;const j=new Ni;j.setPlayer(D),j.setEnemy(z),te.setPair(_t.HiLv,j),te.calcCombatScore();for(const[be,J]of te.combatPairs){const re=J.judge(Ee.None);console.log(`judge=[${re}]`)}}async function js(C,k,$){const v=_t.HiLv;te.combatPairs.get(v),C===le&&await te.replaceChar(v,Pe.Player,k,$,i),C===_&&await te.replaceChar(v,Pe.Enemy,k,$,i)}async function os(){await Ks(),await te.replaceJudge(i),await te.updateGuide()}}async function Ti(h){if(!h.isWebRunning)return;const e=h.isWebRunning;console.log(`mode=${h.edit}`);const t=new ts;async function s(){const p=ue.Resource,d=new ms;d.init(),d.setConfig(_n()),await d.load(p,Q.none),d.uiInfo.name="ResourceEdit",d.uiInfo.left="110",d.uiInfo.top="10";const N=d.uiInfo.name,x=await d.toHTML(Zn());if(e){const M=document.createElement("div");M.id=d.uiInfo.name,M.className=d.uiInfo.name,document.body.appendChild(M);const L="文字列リソース",y=d.createEditorBox(L,N,x);d.addEventHandlers(y),d.addItemEventHandlers(),y.show(),d.enableResize();const I=new we;I.setAsDlg(y,L),t.add(I)}return d}async function n(){const p=ue.GameUI,d=new ms;d.initNumItems=5,d.canAdd=!1,d.init(),d.setConfig(fn()),await d.load(p,Q.none),d.uiInfo.name="GameEdit",d.uiInfo.left="110",d.uiInfo.top="10",d.uiInfo.height="235";const N=d.uiInfo.name,x=await d.toHTML(ti());if(e){const M=document.createElement("div");M.id=d.uiInfo.name,M.className=d.uiInfo.name,document.body.appendChild(M);const L="ゲーム設定",y=d.createEditorBox(L,N,x);d.addEventHandlers(y),d.addItemEventHandlers(),y.show(),d.enableResize();const I=new we;I.setAsDlg(y,L),t.add(I)}return d}async function i(){const p=ue.ScoreUI,d=new ms;d.init(),d.setConfig(Qn(h.gameType)),await d.load(p,h.edit),d.uiInfo.name="ScoreEdit",d.uiInfo.left="110",d.uiInfo.top="100";const N=d.uiInfo.name,x=await d.toHTML(ei());if(e){const M=document.createElement("div");M.id=d.uiInfo.name,M.className=d.uiInfo.name,document.body.appendChild(M);const L="スコア設定",y=d.createEditorBox(L,N,x);d.addEventHandlers(y),d.addItemEventHandlers(),y.show(),d.enableResize();const I=new we;I.setAsDlg(y,L),t.add(I)}return d}const o=await s();o.startAutoSave();const l=await n();l.startAutoSave(),l.onSaved=async p=>{h.startBcHelper(),h.notifyGameConfigChanged()};const a=await i();a.startAutoSave();const r=document.createElement("div"),c="dockEdit";r.id=c,r.className=c,document.body.appendChild(r);let m=null;const f=await t.toHTML(c,null);if(e){const p=t.createDockBox(c,f);t.addItemClickHandlers(async d=>{t.stdApplyAction(d)}),p.show(),m=p}const u=new P;e&&(u.AddDialogs(),u.AssignIndexies(),await u.LoadAllSetting(),await u.loadSetting(m),t.InitZOrder(u),await u.ForEachAsync(p=>{const d=Ce.FindDialogParent(p);return d!==null&&(p!=="ResourceEdit"?d.hidden=!1:d.hidden=!0),!0}),m!==null&&(m.parentElement.hidden=!1)),o.requestActivate=g,l.requestActivate=g,a.requestActivate=g;async function g(p){console.log(`[${p.className}] requestActivate`),t.activateItem(p)}}const q=new St,bn=q.isWebRunning;let tt=!0;bn?(Ei(),q.parseURLParams(),ki(),tt=window.EVONA_CONFIG.isLocal,q.aslocal!==gt.Undef&&(tt=q.aslocal===gt.True),q.appHref=window.location.href,q.currentUserHome===""&&q.setUser(q.user1Home)):q.setUser(q.user2Home);q.initDataPath(q.currentUserHome);ie.encodeEnable=!tt;q.setImageHome(tt);console.log("**main()**",q);const Ii=$i(tt)||q.availComing;q.currentUserHome;q.statusJsonPath;q.zipPrefix;q.chListFile;q.chStatusListFile;switch(q.admin){case!0:await ii(q);break;case!1:if(bn)if(q.edit===Q.none){let h=!1,e=!1;const t=new $e;t.CheckVisible=!0,t.CheckText="位置情報を初期化",t.SecretEnable=!0;const s=q.setBrowserTitle();await t.showWait(`「${s} 」モードで起動します`)===F.Secret&&(e=!0),h=t.Checked;let i=Ne.None;if(tt)i=Ne.Full;else if(i=Ne.NotRun,e){let o="";t.CheckVisible=!1,t.SecretEnable=!1,t.AuthVisible=!0,t.onAuthChecking=f=>(o=f,!0),await t.showWait("認証コードを入力してください");const l=new Date,a=("0"+(l.getMonth()+1)).slice(-2),r=("0"+l.getDate()).slice(-2),m=Math.random()>.5?`${a}${r}`:`${r}${a}`;o===m?(console.log("auth success"),i=Ne.Full):console.log("auth fail")}else Ii&&(i=Ne.Limit);switch(h&&(await(await zt()).clear(),await(await De()).clear()),q.evonaType=i,i){case Ne.Full:window.EVONA_CONFIG.demo=!1,await an(q);break;case Ne.Limit:window.EVONA_CONFIG.demo=!0,await an(q);break}}else q.setBrowserTitle(),await Ti(q);break}function ki(){const h=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname.startsWith("192.168."),e=h?"./jszip_dist/jszip.min.js":"https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js",t=h?"./jsstore_dist/jsstore.min.js":"https://cdn.jsdelivr.net/npm/jsstore/dist/jsstore.min.js";window.EVONA_CONFIG={isLocal:h,workerFile:"./jsstore_dist/jsstore.worker.min.js",demo:!h};function s(n,i=!1){const o=document.createElement("script");o.src=n,i&&(o.type="module"),o.async=!1,document.head.appendChild(o)}s(e),s(t)}function $i(h){if(h)return!0;const e=document.referrer;console.log(`${e}`);const t="evona_auth",s="granted";return sessionStorage.getItem(t)===s?!0:e.includes("qiita.com")?(sessionStorage.setItem(t,s),!0):!1}function Ei(){const h="wallpaper.png",e=Date.now(),t=`./${h}?v=${e}`,s=document.body.style;s.backgroundImage=`url('${t}')`,s.backgroundAttachment="fixed",s.backgroundSize="cover",s.backgroundPosition="center",s.backgroundColor="rgba(0, 0, 0, 0.2)",s.backgroundBlendMode="darken"}

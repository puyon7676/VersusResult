(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=e(n);fetch(n.href,i)}})();class q{constructor(){this.imageHome="./Image/",this.user1Home="./User1/",this.user2Home="./User2/",this.currentUserHome="",this.admin=!1,this.cmd="",this.dataBasePath="../キャラパースデータ",this.statusJsonPath="",this.zipPrefix="",this.chListFile="",this.chStatusListFile="",this.charStatusZip="./CharStatus.zip",this.nodeToolsImportFilename="./nodeTools.js"}setUser(t){this.currentUserHome=t}setPath(){this.currentUserHome===this.user1Home&&(this.statusJsonPath=`${this.dataBasePath}/ぷよクエ_詳細JSON`,this.zipPrefix="puyoQue_",this.chListFile=`${this.currentUserHome}chListFile_puyo.json`,this.chStatusListFile=`${this.currentUserHome}puyoQue_CharStatus.zip`),this.currentUserHome===this.user2Home&&(this.statusJsonPath=`${this.dataBasePath}/メメントモリ_詳細JSON`,this.zipPrefix="memeMori_",this.chListFile=`${this.currentUserHome}chListFile_meme.json`,this.chStatusListFile=`${this.currentUserHome}memeMori_CharStatus.zip`)}get isWebRunning(){return!(typeof document>"u")}parseURLParams(){if(!this.isWebRunning){console.log("cannot parse URL params!");return}const t=new URLSearchParams(window.location.search);for(const[e,s]of t)switch(e.trim()){case"user":const n=s.trim();this.setUser(n==="1"?this.user1Home:this.user2Home);break;case"debug":break;case"admin":this.admin=s.trim()==="true";break;case"cmd":this.cmd=s;break}}async loadJson(t){return console.log(`[loadJson] file=[${t}]`),await this._loadJson(t)}async _loadJson(t){if(this.isWebRunning){const e=await fetch(t,{cache:"no-store"});if(!e.ok)throw new Error(`HTTPエラー! ステータス: ${e.status}`);return await e.json()}else{const{loadJsonNode:e}=await import(this.nodeToolsImportFilename);return e(t)}}async saveJson(t,e){const s=JSON.stringify(e);if(this.isWebRunning){const n=new Blob([s],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=t,o.click()}else{const{saveJsonNode:n}=await import(this.nodeToolsImportFilename);return n(t,e)}}async loadBinFile(t){if(this.isWebRunning)return await(await fetch(t)).blob();{const{readBinNode:e}=await import(this.nodeToolsImportFilename);return e(t)}}async getDoc(t){let e,s;if(this.isWebRunning)e=new DOMParser,s=e.parseFromString(t,"text/html");else{const{createHtmlParserNode:n}=await import(this.nodeToolsImportFilename);e=n(t),s=e.parseFromString(t,"text/html")}return s}}class Jt{constructor(){this.imageHome="",this.cache=new Map,this.cacheNs=new Map,this.zip=null,this.zipNs=new Map,this.isMultiZip=!1,this.dbh=null,this.AnyNs=""}async setupNs(t,e,s){if(this.dbh=s,await this.dbh.countNs(t)>=1){this.zipNs.set(t,null),this.isMultiZip=!0,await this.doCache(t);return}await this.loadZipBy(e,t),console.log(`insert begin : ${t}`);const i=this.zipNs.get(t),o=Object.keys(i.files);let a=-1;for(const l of o){if(a++,a===0||await s.selectBlob(t,l)!==null)continue;const c=l,m=await i.file(c).async("blob");await s.insert(l,t,m)}console.log(`insert end : ${t}`),await this.doCache(t)}async doCache(t){if(this.dbh===null)return;const e=new q;this.imageHome=e.imageHome.substring(2);const s=this.imageHome.length,n=await this.dbh.selectBlobByNs(t);if(n!==null){for(const[i,o]of n){const a=i.substring(s),l=URL.createObjectURL(o);this.cache.set(a,l),this.cacheNs.set(a,t)}console.log(`cache end : ${t}`)}}get loaded(){return this.isMultiZip?this.zipNs.size!==0:this.zip!==null}async loadZipBy(t,e){const s=new q;this.imageHome=s.imageHome.substring(2);const n=await s.loadBinFile(t);let i=null;if(s.isWebRunning)i=await window.JSZip.loadAsync(n);else{const{loadZipNode:o}=await import(s.nodeToolsImportFilename);i=await o(n)}this.zipNs.set(e,i),this.isMultiZip=!0}async getImageUrlBy(t,e){if(!this.loaded)return console.log("[getImageUrlBy] not yet load zip"),null;if(this.cache.has(t))return this.cache.get(t);const s=`${this.imageHome}${t}`;let n="";for(const[a,l]of this.zipNs){n=a;break}if(this.isMultiZip?e===this.AnyNs?this.zipNs.get(n):this.zipNs.get(e):this.zip,this.dbh===null)return"";const i=await this.dbh.selectBlob(e,s);if(i===null)return"";const o=URL.createObjectURL(i);return this.cache.set(t,o),o}async findNs(t){if(!this.isMultiZip||this.dbh===null)return null;if(this.cacheNs.has(t)){const e=this.cacheNs.get(t);if(e!==void 0)return e}return null}dispose(){for(const t of this.cache.values())URL.revokeObjectURL(t);this.cache.clear()}}class Ft{constructor(){this.tblNameCharImages="CharImages",this.tblCharImages={name:this.tblNameCharImages,columns:{ns:{dataType:"string",index:!0},name:{dataType:"string"},fileName:{dataType:"string",index:!0},fileData:{dataType:"object"}}},this.dbName="CharDB",this.db={name:this.dbName,tables:[this.tblCharImages]}}init(t){this.connection=new JsStore.Connection(new Worker(t)),console.log("connection started")}async term(){await this.connection.terminate(),console.log("connection terminated")}async initDb(){const t=await this.connection.initDb(this.db);return console.log(t?"Db Created & connection is opened":"Db connection is opened"),t}async dropDb(){const t=await this.connection.dropDb();return t?console.log("Db deleted successfully"):console.error("dropDb error"),t}async insert(t,e,s){await this.connection.insert({into:this.tblNameCharImages,values:[{ns:e,name:"",fileName:t,fileData:s}]})}async insertZipFile(t){await this.connection.insert({into:this.tblNameCharImages,values:[{ns:t.ns,name:t.name,fileName:t.name,fileData:t.fileData}]})}async selectBlob(t,e){try{var s=await this.connection.select({from:this.tblNameCharImages,where:{ns:t,fileName:e}});return s.length>=1?s[0].fileData:null}catch(n){console.error("[selectBlob] JsStore Select Error:",n)}return null}async selectBlobByNs(t){try{var e=await this.connection.select({from:this.tblNameCharImages,where:{ns:t}});const s=new Map;for(const n of e)s.set(n.fileName,n.fileData);return e.length>=1?s:null}catch(s){console.error("[selectBlobByNs] JsStore Select Error:",s)}return null}async selectNs(t){try{var e=await this.connection.select({from:this.tblNameCharImages,where:{fileName:t}});return e.length>=1?e[0].ns:null}catch(s){console.error("[selectNs] JsStore Select Error:",s)}return null}async countNs(t){try{return await this.connection.count({from:this.tblNameCharImages,where:{ns:t}})}catch(e){console.error("[countNs] JsStore Select Error:",e)}return-1}}async function Ot(u){const t=u.cmd.split(":"),e=window.EVONA_CONFIG.workerFile,s=new Ft;s.init(e),await s.initDb();let n=!1;switch(t[0]){case"countns":const o=t.length>=2?t[1]:"";n=await s.countNs(o);break;case"drop":n=await s.dropDb();break}const i=`[${u.cmd}] res=${n}`;alert(i)}class Lt{constructor(){this.cancel=!1,this.targetId="",this.classify="",this.selectedValue=""}}const L={Img:"Img",Label:"Label",LabelRO:"LabelRO",Combo:"Combo",Plain:"Plain"};class Ht{constructor(){this.imgSrc="",this.imgFile="",this.alt=""}}class xt{constructor(){this.selectedItem="",this.selectionPair=[],this.classify=""}}class jt{constructor(){this.typeInfo=new Et,this.className=""}}class Vt{constructor(){this.items=new Array}makeItems(t=1){for(let e=0;e<t;e++){const s=new jt;this.items.push(s)}}ToHTML(){let t="";for(const e of this.items){let s="";switch(e.typeInfo.using.itemType){case L.Label:s=e.typeInfo.ToLableHTML(e.className);break;case L.LabelRO:s=e.typeInfo.ToLableROHTML(e.className);break;case L.Combo:s=e.typeInfo.ToComboHTML(e.className);break;case L.Img:s=e.typeInfo.ToImgHTML(e.className,e.typeInfo.using.img.alt);break}s!==""&&(this.items.length>=2?t=`${t}<td>${s}</td>`:t=s)}return t}}class qt{constructor(){this.cols=new Array}makeCols(t){for(let e=0;e<t;e++){const s=new Vt;s.makeItems(),this.cols.push(s)}}ToHTML(){let t="";for(const e of this.cols){let s="";s=e.ToHTML(),s!==""&&(t=`${t}<td>${s}</td>`)}return t}}class vt{constructor(){this.rows=new Array}makeDim(t,e){for(let s=0;s<e;s++){const n=new qt;n.makeCols(t),this.rows.push(n)}}getCell(t,e,s=0){return this.rows[e].cols[t].items[s]}ToHTML(t="",e){let s="";for(const n of this.rows){let i="";i=n.ToHTML(),i!==""&&(s=`${s}<tr>${i}</tr>`)}if(s!==""){const n=t!==""?` class="${t}"`:"",i=e!==""?` item-id="${e}"`:"";s=`<table${n}${i}>${s}</table>`}return s}ToScrollHTML(t="",e){const s=t!==""?` class="${t}"`:"",n=e!==""?` item-id="${e}"`:"";return`<div${s}${n}>
${this.ToHTML(t,e)}
</div>`}HorzCSS(t){return`
.${t} {
  width: 1000px;
  overflow-x: auto; white-space: nowrap;
}`}VertCSS(t){return`
.${t} {
  height: 300px; overflow-y: auto;
}`}}class Gt{constructor(){this.itemType=L.Img,this.label="",this.innerHTML=""}}class Et{constructor(){this.toolTip="",this.using=new Gt}setLabel(t,e){this.using.itemType=e?L.Label:L.LabelRO,this.using.label=t}setCombo(t){this.using.itemType=L.Combo,this.using.combo=t}setImg(t){this.using.itemType=L.Img,this.using.img=t}setPlain(t){this.using.itemType=L.Plain,this.using.innerHTML=t}ToLableHTML(t){return`
<span class="${t}" data-readonly="false">${this.using.label}</span>
`.trim()}ToLableROHTML(t){return`
<span class="${t}" data-readonly="true">${this.using.label}</span>
`.trim()}ToComboHTML(t){if(this.using.combo===void 0)return"";const e=this.using.combo;let s=P.makeComboItemsHTML(e);const n=e.classify!==""?` data-classify="${e.classify}"`:"";return`
<select class="${t}" ${n}>
  ${s}
</select>
`.trim()}ToImgHTML(t,e){let s="";return this.using.img.imgSrc===""?s=`src="" data-filename="${this.using.img.imgFile}"`:s=`src="${this.using.img.imgSrc}"`,`
<img class="${t}" ${s} alt="${e}">
`.trim()}ToOverlayHTML(){return`<div class="overlay" title="${this.toolTip}"></div>`}}class Wt{constructor(){this.name="",this.id="",this.className="",this.option=new Et}}class P{constructor(){this.props=new Wt}ToHTML(t){let e="",s="";switch(t.option.using.itemType){case L.Label:e=t.option.ToLableHTML(t.className),s=t.option.ToOverlayHTML();break;case L.LabelRO:e=t.option.ToLableROHTML(t.className);break;case L.Plain:e=`
${t.option.using.innerHTML}
`.trim();break;case L.Combo:e=t.option.ToComboHTML(t.className);break;case L.Img:e=t.option.ToImgHTML(t.className,t.option.using.img.alt),s=t.option.ToOverlayHTML();break}return`
  ${e}
  ${s}
`.trim()}MakeSelectableHTML(){return`
<div class="${this.props.name}" item-id="${this.props.id}">
${this.ToHTML(this.props)}
</div>
`.trim()}static makeComboItemsHTML(t){if(t.selectionPair===void 0||t.selectionPair.length<=0)return"";let e="";for(const s of t.selectionPair){let[n,i]=s.split("/");i=i.trim();const o=t.selectedItem===i?" selected":"",a=`
<option value="${i}"${o}>${n}</option>
`.trim();e+=a}return e}}class D{constructor(){this._defaultButtonsName="dialog-buttons",this._defaultToolButtonsName="dialog-tool-btns",this._enableScrollEvt=!1,this._scrollTimer=null,this._isScrolling=!1,this.itemList=new Array}add(t){this.itemList.push(t)}get DefaultBlueColor(){return"#86aef7e6"}get DefaultYellowColor(){return"#f7eb86e6"}get DefaultBorderColor(){return"#2c3e50ff"}MakeDefaultDialogParentCss(t,e,s,n=0){return`
.${t} {
  position: fixed;
  inset: auto; /* ブラウザの中央寄せを無効化 */
  top: ${s}px;
  left: ${e}px;
  transform: translateX(-50%);
  z-index: ${n}
}
`.trim()}MakeSystematicDialogCss(t){return`
.${t} {
  background-color: #86aef7;
  border: 2px solid #2c3e50;
  padding: 10px;
}
`.trim()}MakeDefaultDialogCss(t){return`
.${t} {
  background-color: #f7eb86e6;
  border: 2px solid #2c3e50;
  padding: 10px;
}
`.trim()}ToHTML(){let t="";for(const e of this.itemList)t+=e.MakeSelectableHTML();return`${t}`}MakeScrollableList(t){let e="";for(const s of this.itemList)e+=s.MakeSelectableHTML();return`<div id="${t}" class="${t} scroll">
${e}
</div>`}MakeDefaultScrollCss(t,e){return`
.${t} .scroll {
max-height: ${e}px;
overflow-y: auto;
}
`.trim()}MakeDefaultNonScrollCss(t,e){return""}MakeDefaultGridColCss(t,e,s,n){return`
.${t} {
display: grid;
grid-template-columns: repeat(${s}, ${e}px);
gap: 0px;
width: ${n}px;
}
`.trim()}MakeDefaultGridRowCss(t,e,s,n){return`
.${t} {
display: grid;
grid: repeat(${s}, ${n}px) / auto-flow ${e}px;
gap: 0px;
height: ${(n+2)*s}px;
}
`.trim()}MakeDefaultItemJustifyRightCss(t,e,s){return`
.${t} {
position: relative;
width: ${e}px;
height: ${s}px;
display: flex;
justify-content: flex-end;
font-size: 10px;
}
`.trim()}MakeDefaultItemimgCss(t,e,s,n){return`
.${t} {
position: relative;
width: ${s}px;
height: ${n}px;
cursor: pointer;
}
.${t} .${e} {
width: 100%;
height: 100%;
}
`.trim()}MakeDefaultItemLabelCss(t,e,s,n){return`
.${t} {
position: relative;
width: ${s}px;
height: ${n}px;
cursor: pointer;
}
.${t} .${e} {
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
`.trim()}MakeSystematicSelectionCss(t){return this.overlayCss(t,"rgba(128, 128, 128, 0.4)")}MakeDefaultSelectionCss(t){return this.overlayCss(t,"rgba(0, 128, 255, 0.4)")}overlayCss(t,e){return`
.${t} .overlay {
position: absolute;
inset: 0;
background: ${e}; /* 選択時の色 */
opacity: 0;
transition: opacity 0.2s;
}
.${t}.selected .overlay {
opacity: 1;
}
`.trim()}get defaultButtonsCssName(){return this._defaultButtonsName}set defaultButtonsCssName(t){this._defaultButtonsName=t}MakeDefaultButtonsHTML(t){return`
<div class="${this.defaultButtonsCssName}">
    ${t}
</div>
`.trim()}MakeDefaultButtonsCss(){return`
.${this.defaultButtonsCssName} {
    display: flex;
    justify-content: flex-end; /* 右寄せも簡単 */
    gap: 8px;
}
.${this.defaultButtonsCssName} button {
    width: 120px; /* または flex:1 */
}`.trim()}get defaultToolButtonsCssName(){return this._defaultToolButtonsName}set defaultToolButtonsCssName(t){this._defaultToolButtonsName=t}MakeDefaultToolButtonsHTML(t){return`
<div class="${this.defaultToolButtonsCssName}">
    ${t}
</div>
`.trim()}MakeDefaultToolButtonsCss(){return`
.${this.defaultToolButtonsCssName} {
    display: flex;
    justify-content: flex-start; /* 左寄せも簡単 */
    gap: 8px;
}
.${this.defaultToolButtonsCssName} button {
    width: 120px; /* または flex:1 */
}`.trim()}initFullScreen(t,e){const s=document.getElementById(t);if(s===null)return!1;s.innerHTML=`
<div class="loader-content">
  <p>${e}</p>
  <div class="spinner"></div>
</div>
`.trim()}MakeFullScreenCss(t){return`
#${t} {
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
`.trim()}applyFullScreenCss(t){const e=document.getElementById(t);if(e===null||e.classList.contains("hidden"))return!1;const s=document.createElement("style");return s.textContent=`
${this.MakeFullScreenCss(t)}
`.trim(),document.head.appendChild(s),!0}hideFullScreenCss(t){const e=document.getElementById(t);e&&e.classList.add("hidden")}showFullScreenCss(t){const e=document.getElementById(t);e&&e.classList.remove("hidden")}getFullScreenMsgElem(t){const e=document.getElementById(t);if(e){const s=e.querySelectorAll("p");return s!==null&&s.length>=1?s[0]:null}return null}initObserver(t,e){const s=document.getElementById(t);if(!s)return;const n=async a=>{await a.forEach(async l=>{if(l.isIntersecting){const r=l.target,c=r.dataset.filename;if(console.log("見えた！:",r.dataset.filename),c&&r.src===""||r.src.startsWith(window.location.origin)){const d=await e.findNs(c);d===null||d===""?(this.observer.unobserve(r),console.log(`cannot set image : ${c}`)):await e.getImageUrlBy(c,d).then(m=>{m!==null?(r.src=m,this.observer.unobserve(r)):console.log(`pending set image : ${c}`)})}}})},i={root:s,rootMargin:"0px",threshold:.1};this.observer=new IntersectionObserver(n,i),s.querySelectorAll("img[data-filename]").forEach(a=>this.observer.observe(a)),console.log("[initObserver] enabled!")}get isScrolling(){return this._enableScrollEvt?!(this._scrollTimer!==null&&this._isScrolling):!1}enableScrollEvent(t){this._isScrolling=!1;const e=document.getElementById(t);return e?(this._enableScrollEvt=!0,e.addEventListener("scroll",()=>{this._isScrolling=!0,clearTimeout(this._scrollTimer),this._scrollTimer=setTimeout(()=>{this._scrollTimer=null,this._isScrolling=!1;const s=this.observer.takeRecords();console.log(`[enableScrollEvent] stopped ${s.length}`)},200)}),console.log("[enableScrollEvent] enabled!"),!0):!1}enableEvents(t){const e=`.${t}`;document.querySelectorAll(`${e}`).forEach(n=>{const i=n.querySelectorAll("img");i.length>=1&&(i[0],this.addButtonEvent(e,n));const o=n.querySelectorAll("span");o.length>=1&&o[0]?.dataset.readonly=="false"&&this.addButtonEvent(e,n);const a=n.querySelectorAll("select");a.length>=1&&(a[0],this.addSelectEvent(e,n))})}addButtonEvent(t,e){e.addEventListener("click",()=>{document.querySelectorAll(`${t}.selected`).forEach(n=>n.classList.remove("selected")),e.classList.add("selected");const s=e.getAttribute("item-id");if(s){const n=this.itemList.find(i=>`${i.props.id}`===s);if(n){if(n.props.option.onSelect){const i=new Lt;i.item=n,n.props.option.onSelect(i)}this.selectedCh=n}}})}addSelectEvent(t,e){e.addEventListener("change",s=>{const n=s.target,i=n?.dataset.classify,o=e.getAttribute("item-id");if(o){let a=this.itemList.find(l=>`${l.props.id}`===o);if(a===void 0&&(a=this.itemList.find(l=>`${i}${l.props.id}`===o)),a){if(a.props.option.onSelect){const l=new Lt;l.item=a,l.targetId=o,l.classify=i===void 0?"?":i,l.selectedValue=n.value,a.props.option.onSelect(l)}this.selectedCh=a}}})}GetIdByIndex(t){return this.itemList[t].props.id}UnselectAll(t){const e=`.${t}`;document.querySelectorAll(`${e}.selected`).forEach(s=>s.classList.remove("selected"))}SelectByID(t,e){const s=this.FindByID(t,e);if(s){s.classList.add("selected");const n=s.getAttribute("item-id");if(n){const i=this.itemList.find(o=>`${o.props.id}`===n);i&&(this.selectedCh=i)}return s}return null}FindDivByClassName(t,e){const s=`.${t}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.querySelectorAll("div");for(const a of o)if(a.className===e||a.className.startsWith(e))return a}return null}FindByID(t,e){const s=`.${t}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===e)return i}return null}FindImgByID(t,e){const s=`.${t}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===e){const a=i.querySelectorAll("img");return a.length>=1?a[0]:null}}return null}FindImgsByID(t,e){const s=`.${t}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===e){const a=i.querySelectorAll("img");return a.length>=1?a:null}}return null}FindDivByID(t,e){const s=`.${t}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===e){const a=i.querySelectorAll("div");return a.length>=1?a[0]:null}}return null}FindSelectByID(t,e,s){const n=`.${t}`,i=document.querySelectorAll(`${n}`);for(const o of i){const a=o.getAttribute("item-id");if(a&&a===e){const l=o.querySelectorAll("select");if(l.length>=1){for(const r of l)if(r?.dataset.classify===s)return r}return null}}return null}ReplaceImg(t,e,s){const n=this.FindImgByID(t,e);return n===null?null:(n.dataset.filename,n.src=s,n)}ReplaceDivToolTip(t,e,s){const n=this.FindDivByID(t,e);return n===null?null:(n.title=s,n)}ReplaceImgToolTip(t,e,s){const n=this.FindImgByID(t,e);return n===null?null:(n.title=s,n)}SetImgSrc(t,e){if(t===null)return null;t.dataset.filename,t.src=e}SetImgSize(t,e,s){if(t===null)return null;t.style.width=`${e}px`,t.style.height=`${s}px`}ReplaceComboItems(t,e,s){const n=this.FindSelectByID(t,e,s.classify);if(n===null)return null;n.querySelectorAll("option").length>=1&&(n.innerHTML="");const o=P.makeComboItemsHTML(s);return o!==""&&(n.innerHTML=o),n}copyCssToInlineStyle(t,e){for(const s of document.styleSheets){let n;try{n=s.cssRules}catch{continue}for(const i of n)if(i instanceof CSSStyleRule&&i.selectorText===t){const o=i.style;console.log(`[copyCssToInlineStyle] coping [${t}]`);for(let a=0;a<o.length;a++){const l=o[a],r=o.getPropertyValue(l);e.style.setProperty(l,r),console.log(`[copyCssToInlineStyle] copied [${l}]=[${r}]`)}return}}}}const _={Hide:"Hide",MoveLowest:"MoveLowest"};class V{constructor(){this.title="",this.dlgName="",this.B3Type=_.MoveLowest,this.nMove=4,this.initLeft=0,this.initTop=0,this.moveLeft=0,this.moveTop=0}NewDialog(t,e,s=_.MoveLowest){this.dlgName=e,this.B3Type=s;const n=document.createElement("dialog");n.id=e,n.className=e;const i=document.getElementById(t);return i.appendChild(n),this.dlgParent=i,this.dlg=n,n}SetContent(t,e){const s=this.dlg,n=`<button id="${this.toolNameB1}">[→]</button>`,i=`<button id="${this.toolNameB2}">[↓]</button>`;let o="";this.B3Type===_.MoveLowest&&(o=`<button id="${this.toolNameB3}">[_]</button>`);let a="";this.title!==""?a=`<div class="${this.titleName}">${this.title}${n}${i}${o}</div>`:a=`<div class="${this.titleName}">${n}${i}${o}</div>`;const l=document.createElement("div");l.innerHTML=a,s.innerHTML=e;const r=document.getElementById(t);r.appendChild(l),r.appendChild(s),this.applyCss()}EnableEventHandlers(){const t=this.dlgParent.style.left,e=this.dlgParent.style.top;this.initLeft=parseInt(t.substring(0,t.length-2)),this.initTop=parseInt(e.substring(0,e.length-2)),this.moveLeft=0,this.moveTop=0,console.log(`[EnableEventHandlers] ${this.dlgParent.id}::(${t},${e})::(${this.initLeft},${this.initTop})`),document.getElementById(`${this.toolNameB1}`).onclick=async()=>{this.dlgParent!==void 0&&(this.moveLeft++,this.moveLeft>=this.nMove&&(this.moveLeft=0),this.dlgParent.style.left=`${this.initLeft+this.moveLeft*100}px`)},document.getElementById(`${this.toolNameB2}`).onclick=async()=>{this.dlgParent!==void 0&&(this.moveTop++,this.moveTop>=this.nMove&&(this.moveTop=0),this.dlgParent.style.top=`${this.initTop+this.moveTop*100}px`)},this.B3Type===_.MoveLowest&&(document.getElementById(`${this.toolNameB3}`).onclick=async()=>{if(this.dlgParent===void 0)return;new b().MoveLowestLayer(this.dlgParent)})}static GetDialogInfo(t){const e=this.FindDialogParent(t);if(e===null)return null;const s=e.querySelector("dialog");if(s===null)return null;const n=new lt,i=s.clientWidth,o=s.clientHeight;return n.name=t,n.left=e.style.left,n.top=e.style.top,n.width=`${i}px`,n.height=`${o}px`,n}static SetDialogInfo(t){const e=this.FindDialogParent(t.name);if(e===null)return!1;const s=e.querySelector("dialog");return s===null?!1:(e.style.left=t.left,e.style.top=t.top,s.style.width=t.width,s.style.height=t.height,!0)}static FindDialogParent(t){const e=document.getElementById(t);return e??null}get titleName(){return`${this.dlgName}-dlg-title-00`}get toolNameB1(){return`${this.dlgName}-dlg-tool-b1`}get toolNameB2(){return`${this.dlgName}-dlg-tool-b2`}get toolNameB3(){return`${this.dlgName}-dlg-tool-b3`}applyCss(){const t=document.createElement("style");t.textContent=`
.${this.titleName} {
  display: flex;        /* 子要素を横並びにする */
  align-items: center;  /* 垂直方向の基準を中央に揃える */
  gap: 8px;             /* ボタンとテキストの間に隙間を作る（任意） */
  background-color: white;
  border: 2px solid black;
}
.${this.titleName} button {
  background-color: white;
  border: 2px solid black;
}
`.trim(),document.head.appendChild(t)}}class lt{constructor(){this.name="",this.left="",this.top="",this.width="",this.height=""}copyTo(t){t.name=this.name,t.left=this.left,t.top=this.top,t.width=this.width,t.height=this.height}}class b{add(t){b.dlgElems.push(t)}AddDialogs(){b.dlgElems=new Array;const t=document.querySelectorAll("div");for(const e of t)e.style.zIndex!==""&&(parseInt(e.style.zIndex)>=b.ignoreIndex||e.querySelector("dialog")&&(console.log(`${e.id} added!`),this.add(e)))}AssignIndexies(){let t=b.dlgElems.length-1;for(const e of b.dlgElems)e.style.zIndex=`${t}`,t--}MoveLowestLayer(t){b.dlgElems.length;for(const e of b.dlgElems)if(e.id===t.id)e.style.zIndex="0";else{const s=e.style.zIndex;e.style.zIndex=`${parseInt(s)+1}`}}MoveHiestLayer(t){b.dlgElems.length;let e=-1;for(const s of b.dlgElems){const n=parseInt(s.style.zIndex);n>=b.ignoreIndex||n>e&&(e=n)}for(const s of b.dlgElems)if(s.id===t.id){s.style.zIndex=`${e}`;break}for(const s of b.dlgElems)if(s.id!==t.id){if(parseInt(s.style.zIndex)>=b.ignoreIndex)continue;e--,s.style.zIndex=`${e}`}}FindByName(t){const e=b.dlgElems.find(s=>s.id===t);return e||null}async ForEachAsync(t){for(const e of b.dlgElems)e.parentNode!==null&&await t(e.id)}ReOrder(){b.dlgElems.sort((t,e)=>{const s=t.style.zIndex,n=e.style.zIndex;if(s===""||n==="")throw new Error("z-index が未設定の要素が混入しています");return parseInt(e.style.zIndex)-parseInt(t.style.zIndex)})}}b.ignoreIndex=1e3;const H={None:"None",CnsRed:"CnsRed",CnsBlue:"CnsBlue",CnsGreen:"CnsGreen",CnsYellow:"CnsYellow",CnsViolet:"CnsViolet"},et={RlAttacker:"RlAttacker",RlHealer:"RlHealer",RlDebuffer:"RlDebuffer",RlBuffer:"RlBuffer"};class rt{get iconFileName(){return this.id===null&&!Number.isNaN(this.id)?`${this.name}_${this.idAsText}.png`:`${this.name}_${this.id}.png`}constructor(t=0,e=""){this.ns=H.None,this.id=0,this.name="",this.contentURL="",this.iconURL="",this.idAsText="",this.idAttributeForHTML="",this.id=t,this.name=e}parseFromImgName(t){let e=t.indexOf("_");if(e>=0){const s=t.substring(0,e);let n=t.substring(e+1);if(e=n.indexOf("."),e>=0)return n=n.substring(0,e),this.id=Number.parseInt(n),this.name=s,this.idAsText=Number.isNaN(this.id)?n:"",!0}return!1}}class Kt{constructor(){this.itemName="",this.chNames=new Array,this.index=-1}reset(){this.itemName="",this.chNames=new Array,this.index=-1,this.onScroll=null}toCombo(t,e,s){this.reset();const n=`.${t}`,i=document.querySelectorAll(`${n} div[title*="${s}"]`);let o=-1,a="";for(const r of i){const c=r;console.log(c.title),o++;const d=c.title.trim(),m=d,k=`
 <option value="${d}"${o===0?" selected":""}>${m}</option>
`.trim();a+=k,this.chNames.push(m)}if(o===-1)return null;const l=document.createElement("select");return l.id=e,l.className=e,l.innerHTML=a,this.itemName=t,l}addEvent(t,e){t.addEventListener("change",s=>{const i=s.target.value;this.chNames.find(a=>a===i)&&this.scrollAction(i)}),this.onScroll=e}findFirst(){return this.chNames.length===0?!1:(this.index=0,this.scrollAction(this.chNames[this.index]),!0)}scroll(t){const e=`.${this.itemName}`,s=document.querySelector(`${e} div[title="${t}"]`);if(s===null)return null;const n=s.closest(e);return n===null?null:(n.scrollIntoView({behavior:"smooth",block:"center"}),s)}scrollAction(t){const e=this.scroll(t);e&&this.onScroll!==null&&this.onScroll(e)}}class gt{constructor(){this.uiInfo=new lt,this.charFinder=new Kt,this.parentName=""}MakeList(){}async LoadList(t){const n=(await new q().loadJson(t)).map(o=>Object.assign(new rt,o)),i=new gt;return i.chList=n,this.uiInfo.copyTo(i.uiInfo),i}findByNs(t){return t===H.None?void 0:this.chList.filter(s=>s.ns===t)}async toHTML(t){if(!this.chList)return"";this.htmlMaker=new D;let e=0;for(const s of this.chList){e++;const n=`chuid${e}`;s.idAttributeForHTML=n;const i="",o=new Ht;o.imgSrc=i,o.imgFile=s.iconFileName;const a=new P;a.props.name=this.itemCssClassName(),a.props.id=n,a.props.className=this.imgCssClassName(),a.props.option.setImg(o),a.props.option.toolTip=s.name,a.props.option.onSelect=l=>{this.setSelectedItem(l.item.props.id)},this.htmlMaker.add(a)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createSelectorBox(t,e,s){this.parentName=e;const n=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="char-dlg-url">URL</button>
<button id="char-dlg-close">閉じる</button>
`),i=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${s}
    <label id="char-dlg-chinfo">未選択</label>
    <input type="text" id="${this.charSeachInputCssClassName()}" placeholder="キャラ名検索...">
    ${n}
</div>`,o=new V;o.title="<"+t+">";const a=o.NewDialog(e,this.dlgCssClassName());return o.SetContent(e,i),this.applyCss(),o.EnableEventHandlers(),a}addEventHandlers(t){document.getElementById(this.charSeachInputCssClassName()).oninput=e=>{if(e!==null&&e.target!==null){const s=e.target;console.log(s.value);const n=s.value,i=this.charSeachComboCssClassName(),o=document.getElementById(i);o!==null&&o.parentNode?.removeChild(o);const a=this.charFinder.toCombo(this.itemCssClassName(),i,n);if(a!==null){const l=document.getElementById(this.dlgContentCssClassName());l!==null&&(l.appendChild(a),this.charFinder.addEvent(a,r=>{const d=r.parentElement.getAttribute("item-id");this.htmlMaker.SelectByID(this.itemCssClassName(),d)}),this.charFinder.findFirst())}}},document.getElementById("char-dlg-url").onclick=()=>{if(this.selectedCh===void 0)return;const e=this.chList.find(s=>this.selectedCh.idAttributeForHTML===s.idAttributeForHTML);if(e){const s=e.contentURL;window.open(s,"_blank")}},document.getElementById("char-dlg-close").onclick=()=>{document.getElementById(this.parentName).hidden=!0}}addItemEventHandlers(){const t=this.htmlMaker.GetIdByIndex(0);this.htmlMaker.SelectByID(this.itemCssClassName(),t),this.htmlMaker.enableEvents(this.itemCssClassName()),this.setSelectedItem(t)}setSelectedItem(t){const e=this.chList.find(s=>t===s.idAttributeForHTML);e&&(document.getElementById("char-dlg-chinfo").textContent=e.name,this.selectedCh=e)}enableLazyImages(t){this.htmlMaker.initObserver(this.dlgCssClassName(),t)}itemCssClassName(){return"char-item"}imgCssClassName(){return"base"}listCssClassName(){return"char-list"}dlgContentCssClassName(){return"char-dlg-content"}dlgCssClassName(){return"char-dlg"}charSeachInputCssClassName(){return"char-search-input"}charSeachComboCssClassName(){return"char-search-combo"}applyCss(){const t=this.listCssClassName(),e=this.itemCssClassName(),s=this.imgCssClassName(),n=parseInt(this.uiInfo.left),i=parseInt(this.uiInfo.top),o=document.createElement("style");o.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,n,i)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.char-dlg-content {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

${this.htmlMaker.MakeDefaultScrollCss(this.parentName,300)}
${this.htmlMaker.MakeDefaultGridColCss(t,64,5,336)}

${this.htmlMaker.MakeDefaultItemimgCss(e,s,64,64)}
${this.htmlMaker.MakeDefaultSelectionCss(e)}

${this.htmlMaker.MakeDefaultButtonsCss()}
`.trim(),document.head.appendChild(o);const a=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,a)}}class O{constructor(){this.ns=H.None,this.id=0,this.name="",this.contentURL="",this.iconURL=""}static toJsonText(t){const e=O.toJsonInst(t);return JSON.stringify(e,null,2)}static toJsonInst(t){const e=new O;return e.ns=t.ns,e.id=t.id,e.name=t.name,e.contentURL=t.contentURL,e.iconURL=t.iconURL,e}static fromJsonInst(t){const e=new rt;return e.ns=t.ns,e.id=t.id,e.name=t.name,e.contentURL=t.contentURL,e.iconURL=t.iconURL,e}}const p={pqStatusHP:"pqStatusHP",pqStatusATK:"pqStatusATK",pqStatusREC:"pqStatusREC",pqTokkunHP:"pqTokkunHP",pqTokkunATK:"pqTokkunATK",pqTokkunREC:"pqTokkunREC",pqTokuSp1:"pqTokuSp1",pqTokuSp2:"pqTokuSp2",mmAbilitySTR:"mmAbilitySTR",mmStatusFGT:"mmStatusFGT",mmStatusATK:"mmStatusATK",mmStatusPDF:"mmStatusPDF",mmStatusACC:"mmStatusACC",mmStatusEVA:"mmStatusEVA",mmStatusCRI:"mmStatusCRI",mmStatusMDF:"mmStatusMDF",mmStatusHP:"mmStatusHP",mmStatusCRD:"mmStatusCRD",mmStatusDEF:"mmStatusDEF",mmStatusSPD:"mmStatusSPD",mmAbilityDEX:"mmAbilityDEX",mmAbilityMGC:"mmAbilityMGC",mmAbilityDUR:"mmAbilityDUR",mmRole:"mmRole"};class pt{constructor(){this.title="",this.key="",this.selectionPair=[],this.selectedVal="",this.initScoreVal=0,this.mulScoreVal=0,this.available=!1}get stdScore(){const t=this.selectedVal.length>=1?this.selectedVal:"1",e=parseInt(t);return this.initScoreVal+e*this.mulScoreVal}}class Q{constructor(){this.items=new Array,this.allow=new Map,this.roleText="",this.comboText=""}makeDemoLvText(t){let e="";for(let s=1;s<=100;s++)e+=`"${t}${s}/${s}",`;return e=e.substring(0,e.length-1),e}load(){const t=this.makeDemoLvText("Lv"),e=this.makeDemoLvText("Lv"),s=this.makeDemoLvText(""),n=`
[
    {
        "title": "Ch.Lv",
        "key": "chLvId",
        "selectionPair": [
            ${t}
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
            ${e}
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
`,o=JSON.parse(n).map(a=>Object.assign(new pt,a));this.items=o}save(){console.log(JSON.stringify(this,null,2))}clone(){const t=new Q;for(const e of this.items){const s=JSON.stringify(e,null,2),n=JSON.parse(s);t.items.push(n)}return t}set(t,e){const s=this.items.find(n=>n.key===t);return s?(s.selectedVal=e,!0):!1}get stdScore(){let t=0;for(const e of this.items)e.available&&(t+=e.stdScore);return t}get allAvailable(){for(const t of this.items)if(t.available===!1)return!1;return!0}static calcScore(t,e){const s=e.split("+");let n=0;for(const i of s){const o=i.trim();if(o.endsWith("()")){const a=o.slice(0,-2);typeof t[a]=="function"?n+=t[a]():console.warn(`関数 '${a}' が存在しません`)}else{const a=t[o];typeof a=="number"?n+=a:Array.isArray(a)?n+=a.reduce((l,r)=>l+r,0):console.warn(`プロパティ '${o}' が数値ではありません`)}}return n}static calcScoreAdvanced(t,e){const s=Object.keys(t),n=s.map(o=>t[o]);return new Function(...s,`return ${e};`)(...n)}toInst(t){return(n=>{const i=class{constructor(){n.forEach((o,a)=>{this[a]=o})}};return new i})(t)}}class ct{constructor(){this.fileNames=null,this.minMap=new Map,this.maxMap=new Map,this.rangeMap=new Map,this.digLenMax=0,this.nMul=0,this.table=[{key:p.pqStatusHP,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,120)}},{key:p.pqStatusATK,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,120)}},{key:p.pqStatusREC,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,120)}},{key:p.pqTokkunHP,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,5)}},{key:p.pqTokkunATK,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,5)}},{key:p.pqTokkunREC,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,5)}},{key:p.pqTokuSp1,scoreFunc:(t,e)=>this.scoreFunc(this.puyoToku(e),10)},{key:p.pqTokuSp2,scoreFunc:(t,e)=>this.scoreFunc(this.puyoToku(e),10)},{key:p.mmStatusFGT,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,240)}},{key:p.mmStatusATK,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,240)}},{key:p.mmStatusPDF,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,240)}},{key:p.mmStatusACC,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,240)}},{key:p.mmStatusEVA,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,240)}},{key:p.mmStatusCRI,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,240)}},{key:p.mmStatusMDF,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,240)}},{key:p.mmStatusHP,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,240)}},{key:p.mmStatusCRD,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,240)}},{key:p.mmStatusDEF,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,240)}},{key:p.mmStatusSPD,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,240)}},{key:p.mmAbilityDEX,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,240)}},{key:p.mmAbilityMGC,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,240)}},{key:p.mmAbilityDUR,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,240)}},{key:p.mmRole,scoreFunc:(t,e)=>{const s=this.toScoreMaxNum(t,e);return this.scoreFunc(s,240)}}],this.rolePriolity=[{roleKey:et.RlAttacker,priority:st.priHi,statusKey:[p.mmAbilitySTR,p.mmStatusATK,p.mmStatusSPD]},{roleKey:et.RlHealer,priority:st.priHi,statusKey:[p.mmAbilityMGC,p.mmStatusMDF,p.mmStatusHP]},{roleKey:et.RlDebuffer,priority:st.priHi,statusKey:[p.mmAbilityDEX,p.mmStatusACC,p.mmStatusHP]},{roleKey:et.RlBuffer,priority:st.priHi,statusKey:[p.mmStatusPDF,p.mmStatusHP,p.mmStatusDEF]}]}async loadDB(t){const e=new q,s=await e.loadBinFile(t);if(e.isWebRunning)this.zip=await window.JSZip.loadAsync(s);else{const{loadZipNode:n}=await import(e.nodeToolsImportFilename);this.zip=await n(s)}return this.fileNames=Object.keys(this.zip.files),!0}async enumStatus(t){if(this.fileNames!==null)for(const e of this.fileNames){const s=await this.getFileContent(e);if(s===null||t===void 0)continue;if(!t(e,s))break}}async debugCombo(){await this.enumStatus((t,e)=>{for(const s of e)s.useCombo&&console.log(`${t}:[${s.value}]`);return!0})}async getMinMax(){await this.enumStatus((t,e)=>{for(const s of e){if(s.useCombo)continue;let n=parseInt(this.itemValue(s));if(!this.minMap.has(s.key))this.minMap.set(s.key,n);else{const i=this.minMap.get(s.key);i===void 0?this.minMap.set(s.key,n):i>n&&this.minMap.set(s.key,n)}if(!this.maxMap.has(s.key))this.maxMap.set(s.key,n);else{const i=this.maxMap.get(s.key);i===void 0?this.maxMap.set(s.key,n):i<n&&this.maxMap.set(s.key,n)}}return!0})}async getRanges(){await this.getMinMax(),this.digLenMax=0;for(const[t,e]of this.minMap){const s=e,n=this.maxMap.get(t);let i=0;if(s!==void 0&&n!==void 0&&(i=n-s),i<=0&&(i=1),this.rangeMap.set(t,i),n!==void 0){const o=Math.log10(n);o>this.digLenMax&&(this.digLenMax=o)}}this.nMul=this.digLenMax>0?Math.pow(10,Math.ceil(this.digLenMax)):1;for(const[t,e]of this.minMap)console.log(`[${t}] = ${this.minMap.get(t)},${this.maxMap.get(t)} ${this.rangeMap.get(t)}`);console.log(`digLenMax=[${this.digLenMax}] nMul=[${this.nMul}]`)}stdBy(t,e){let s,n;if(this.rangeMap.has(t)&&(s=this.rangeMap.get(t)),this.minMap.has(t)&&(n=this.minMap.get(t)),s===void 0||n===void 0||this.isNumeric(e)===!1)return null;s<=0&&(s=1);const i=(parseInt(e)-n)*s;return this.nMul*i}getFilename(t){let e=null;for(let s of this.fileNames){let n=s.indexOf("_");if(n>=0){let i=s.substring(n+1);if(n=i.indexOf("."),n>=0&&(i=i.substring(0,n)),i===t){e=s;break}}}return e}async getFileContent(t){if(t===null)return null;const e=this.zip.file(t);if(e){const s=await e.async("string");return JSON.parse(s)}return null}async getStatus(t){this.digLenMax===0&&await this.getRanges();const e=this.getFilename(t);if(e===null)return null;const s=await this.getFileContent(e);if(s===null)return null;let n=null;for(const o of s)if(!o.useCombo){for(const a of this.rolePriolity)if(a.statusKey.find(r=>r===o.key)){n=a,console.log(`find role : ${n.roleKey}`);break}if(n!==null)break}const i=new Q;if(n!==null)for(const o of s){if(o.useCombo)continue;if(n.statusKey.find(l=>l===o.key)){const l=this.table.find(r=>r.key===o.key);if(l){const r=l.scoreFunc(o.key,this.itemValue(o));r.title=o.disp,r.key=o.key,i.items.push(r)}}}else for(const o of s){if(o.useCombo)continue;const a=this.table.find(l=>l.key===o.key);if(a){const l=a.scoreFunc(o.key,this.itemValue(o));l.title=o.disp,l.key=o.key,i.items.push(l)}}return i}async getComboKeywords(t){let e=0;const s=new Map,n=new Map;for(const i of t){const o=this.getFilename(i);if(o===null)return null;const a=await this.getFileContent(o);if(a===null)return null;const l=new Map;for(const r of a){if(!r.useCombo)continue;const c=r.value.split(",");for(const d of c)if(l.has(d)===!1)l.set(d,1);else{const m=l.get(d);l.set(d,m+1)}}if(l.size===0){e=0,n.clear();continue}for(const[r,c]of l)if(n.has(r)===!1)n.set(r,c);else{const d=n.get(r);n.set(r,d+c)}if(e++,!(e<=2))for(const[r,c]of n)c>=3&&s.set(r,c)}}async debugCheckCombo(){const t=new Array;t.push("119599"),t.push("119603"),t.push("119624"),await this.getComboKeywords(t)}isNumeric(t){return t.trim()===""?!1:!isNaN(Number(t))}itemValue(t){return t.converted===""?t.value:t.converted}toScoreMaxNum(t,e){return this.isNumeric(e)===!1?null:ct.useStdConv?this.stdBy(t,e):e!==""?parseInt(e):1}scoreFunc(t,e){const s=new pt;if(t===null)return s;s.mulScoreVal=t/e;for(let n=1;n<=e;n++){const i=Math.ceil(t/e*n);s.selectionPair.push(`Lv${n}/${n}`),n===1&&(s.initScoreVal=i)}return s.available=!0,s}scoreFuncOld(t,e){const s=new pt;if(this.isNumeric(t)===!1)return s;let n=t!==""?parseInt(t):1;s.mulScoreVal=n/e;for(let i=1;i<=e;i++){const o=Math.ceil(n/e*i);s.selectionPair.push(`Lv${i}/${i}`),i===1&&(s.initScoreVal=o)}return s.available=!0,s}puyoToku(t){return t==="enable"?10:1}}ct.useStdConv=!1;const st={priHi:0},J={None:"None",UI:"UI",Menu:"Menu"};class W{constructor(){this.dockType=J.None,this.iconFileName="",this.toolTip="",this.idAttributeForHTML=""}get labelWrap(){let t=this.toolTip,e=this.toolTip.length;if(e>3){const s=e%2===0?e/2:e/2+1,n=t.substring(0,s),i=t.substring(s);t=n+`
`+i}return t}setAsDlg(t,e){this.dockType=J.UI,this.dlg=t,this.toolTip=e}setAsMenu(t){this.dockType=J.Menu,this.toolTip=t}get isUIType(){return this.dockType==J.UI}get isMenuType(){return this.dockType==J.Menu}ToggleStatus(){this.dlg===void 0||this.dlg===null||(this.dlg.hidden=!this.dlg.hidden)}}class yt{constructor(){this.items=new Array,this.parentName="",this.listName=""}add(t){return t.dockType==J.UI&&(t.dlgParent=t.dlg.parentElement),this.items.push(t),!0}async toHTML(t,e){if(!this.items)return"";this.listName=t,this.htmlMaker=new D;let s=0;for(const n of this.items){s++;const i=`dock-uid${s}`;n.idAttributeForHTML=i;const o=new P,a=n.labelWrap;o.props.name=this.itemCssClassName(),o.props.id=i,o.props.className=this.imgCssClassName(),o.props.option.toolTip=n.toolTip,o.props.option.setLabel(a,!0),o.props.option.onSelect=l=>{const r=this.items.find(c=>l.item.props.id===c.idAttributeForHTML);if(r&&(this.selectedItem=r,this.onApply!==void 0)){const c=new _t;c.item=this.selectedItem,this.onApply(c)}},this.htmlMaker.add(o)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createDockBox(t,e){this.parentName=t;const s=`<div class="${this.parentName}-dlg-content">
    ${e}
</div>`,n=new V,i=n.NewDialog(t,this.dlgCssClassName(),_.Hide);return n.SetContent(t,s),this.applyCss(),n.EnableEventHandlers(),i}addItemClickHandlers(t){this.onApply=t,this.htmlMaker.SelectByID(this.itemCssClassName(),this.htmlMaker.GetIdByIndex(0)),this.htmlMaker.enableEvents(this.itemCssClassName())}enableLazyImages(t){this.htmlMaker.initObserver(this.dlgCssClassName(),t)}applyCss(){const t=this.listCssClassName(),e=this.itemCssClassName(),s=this.imgCssClassName(),n=48,i=this.items.length,o=document.createElement("style");o.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,60,10,b.ignoreIndex)}
${this.htmlMaker.MakeSystematicDialogCss(this.dlgCssClassName())}
.${this.parentName}-dlg-content {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

${this.htmlMaker.MakeDefaultNonScrollCss(this.parentName,0)}
${this.htmlMaker.MakeDefaultGridColCss(t,n,i,n*i)}

${this.htmlMaker.MakeDefaultItemLabelCss(e,s,n,n)}
${this.htmlMaker.MakeSystematicSelectionCss(e)}

${this.htmlMaker.MakeDefaultButtonsCss()}
span {
display: grid;
align-content: center;
white-space: pre-wrap;
}
`.trim(),document.head.appendChild(o);const a=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,a)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}listCssClassName(){return`${this.listName}-list`}dlgCssClassName(){return`${this.parentName}-dlg`}static GetDialogInfo(t){return V.GetDialogInfo(t)}static SetDialogInfo(t){return V.SetDialogInfo(t)}async InitZOrder(t){await t.ForEachAsync(e=>{const s=yt.GetDialogInfo(e),n=t.FindByName(e);return s!==null&&(s.zindex=n!==null?n.style.zIndex:""),console.log(s),!0})}}class _t{constructor(){this.cancel=!1}}class nt{constructor(){this.dockType=J.None,this.iconFileName="",this.toolTip="",this.dlgName="",this.hidden=!1,this.zIndex="",this.topPx="",this.leftPx=""}static toJsonText(t){const e=nt.toJsonInst(t);return JSON.stringify(e,null,2)}static toJsonInst(t){const e=new nt;return e.dockType=t.dockType,e.iconFileName=t.iconFileName,e.toolTip=t.toolTip,t.isUIType&&(e.dlgName=t.dlgParent.id,e.hidden=t.dlgParent.hidden,e.zIndex=t.dlgParent.style.zIndex,e.leftPx=t.dlgParent.style.left,e.topPx=t.dlgParent.style.top),e}}class it{static toJsonText(t){const e=it.toJsonInst(t);return JSON.stringify(e,null,2)}static toJsonInst(t){const e=new it;e.items=new Array;for(const s of t.items)e.items.push(nt.toJsonInst(s));return e}restore(t,e){for(const s of this.items){const n=t.items.find(i=>i.dlg.id===s.dlgName);n&&(n.dockType=s.dockType,n.iconFileName=s.iconFileName,n.toolTip=s.toolTip,n.isUIType&&(n.dlgParent.hidden=s.hidden,n.dlgParent.style.zIndex=s.zIndex,n.dlgParent.style.left=s.leftPx,n.dlgParent.style.top=s.topPx))}e.ReOrder()}}class Qt{constructor(){this.TextMap=new Map}set(t,e){const s=this.TextMap.has(t);return this.TextMap.set(t,e),s}remove(t){const e=this.TextMap.has(t);return e&&this.TextMap.delete(t),e}get count(){return this.TextMap.size}clear(){this.TextMap.clear()}forEach(t){if(t===void 0)return;let e=!1;for(const[s,n]of this.TextMap)if(e=t(s,n),e)break;return e}values(){const t=new Map;for(const[e,s]of this.TextMap)t.set(e,parseInt(s));return t}}class Pt{constructor(t=0,e=""){this.ch=new rt,this.isEmpty=!0,this.details=new Qt,this.ch.id=t,this.ch.name=e}set(t,e){const s=this.details.TextMap.has(t);return this.details.set(t,e),s}get values(){return this.details.values()}get itemID(){const t=this.itemKey,e=this.ch.idAttributeForHTML.substring(t.length);let s=parseInt(e);return s<=0?-1:s}get itemKey(){return"chuid"}}class Dt{constructor(){this.nFormationItem=5,this.uiInfo=new lt}Init(){this.items=new Array;for(let t=0;t<this.nFormationItem;t++)this.items.push(new Pt)}put(t,e){return this.items.find(n=>this.isExistCh(n,e))!==void 0?!1:(t.ch.ns=e.ns,t.ch.id=e.id,t.ch.name=e.name,t.isEmpty=!1,!0)}empty(t){const e=t.isEmpty;return t.isEmpty=!0,t.isEmpty!=e}isExistCh(t,e){return t.ch.name===e.name&&t.ch.id===e.id}equalsFormationItem(t,e){return t.ch.name===e.ch.name&&t.ch.id===e.ch.id}}class Xt{constructor(){this.emptyFile="plus.png",this.propItemNum=0,this.parentName="",this.listName=""}Init(t){this.charDB=t,this.formation=new Dt,this.formation.Init(),this.scsList=new Array;const e=this.formation.nFormationItem;for(let s=0;s<e;s++){const n=new Q;this.scsList.push(n)}}async Setup(t,e){if(!t)return;this.formation=t;let s=0;for(const n of this.formation.items){n.isEmpty?this.formation.empty(n):this.formation.put(n,n.ch),s++;const i=`${n.itemKey}${s}`;n.ch.idAttributeForHTML=i;const o=n.isEmpty?this.emptyFile:n.ch.iconFileName,a=await e.getImageUrlBy(o,n.ch.ns);if(a===null)return;this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),n.ch.idAttributeForHTML,a)}}async toHTML(t,e){if(!this.formation)return"";this.listName=t,this.htmlMakerChSel=new D;let s=0;for(const n of this.formation.items){const i=n.ch;s++;const o=`${n.itemKey}${s}`;i.idAttributeForHTML=o;const a="",l=n.isEmpty?this.emptyFile:i.iconFileName,r=new Ht;r.imgSrc=a,r.imgFile=l;const c=new P;c.props.name=this.itemCssClassName(),c.props.id=o,c.props.className=this.imgCssClassName(),c.props.option.setImg(r),c.props.option.toolTip=i.name,c.props.option.onSelect=d=>{console.log(`notifty id = ${d.item.props.id}`),this.setSelectedItem(d.item.props.id)},this.htmlMakerChSel.add(c)}return this.htmlMakerChSel.MakeScrollableList(this.listCssClassName())}toGridHTML2(){this.htmlMakerProp=new D;let t=0,e="";for(const s of this.formation.items){s.ch;const n=this.scsList[t];t++;const i=new vt;i.makeDim(1,n.items.length*2);let o=-1;for(const r of n.items){o++;const c=new xt;c.selectionPair=r.selectionPair,c.selectedItem=r.selectedVal,c.classify=r.key,i.getCell(0,o*2).typeInfo.setLabel(r.title,!1);const m=i.getCell(0,o*2+1);m.className=this.propItemCssClassName(),m.typeInfo.setCombo(c),m.typeInfo.onSelect=I=>{console.log(`notifty id = ${I.item.props.id}`)}}const a=i.ToScrollHTML(this.propItemCssClassName(),`${t}`);e=`
${e}
${a}`.trim();const l=new P;l.props.id=`${t}`,l.props.option.onSelect=r=>{console.log(`notifty id = ${r.item.props.id}`)},this.htmlMakerProp.itemList.push(l)}return e}toGridHTML(){this.htmlMakerProp=new D;let t=0;for(const e of this.formation.items){e.ch;const s=this.scsList[t];t++;const n=new D;for(const a of s.items)this.makeChLvSelect(e,`${a.key}${t}`,a.title,a.key,a.selectionPair,a.selectedVal,n),e.details.set(a.key,a.selectedVal);const i=n.ToHTML(),o=new P;o.props.name="",o.props.id=`${t}`,o.props.className="",o.props.option.setPlain(i),o.props.option.onSelect=a=>{console.log(`notifty id     = ${a.item.props.id}`),console.log(` targetId      = ${a.targetId}`),console.log(` classify      = ${a.classify}`),console.log(` selectedValue = ${a.selectedValue}`);const l=a.item.props.id,r=parseInt(l)-1;if(0<=r&&r<this.formation.items.length){const c=this.formation.items[r];c.set(a.classify,a.selectedValue);const d=this.scsList[r];d.set(a.classify,a.selectedValue);const m=new Yt;m.uiName=this.parentName,m.item=c,m.values=c.values,m.scoreConfigSet=d,this.onPropChanged(m)}else console.log(`invalid index = ${r}`)},this.htmlMakerProp.add(o)}return this.htmlMakerProp.MakeScrollableList(this.propCssClassName())}makeChLvSelect(t,e,s,n,i,o,a){const l=new P;l.props.name=this.propItemCssClassName(),l.props.id=e,l.props.className=this.lblCssClassName(),l.props.option.setLabel(s,!1);const r=l.ToHTML(l.props),c=new P;c.props.name=this.propItemCssClassName(),c.props.id=e,c.props.className=this.lblCssClassName();const d=new xt;d.selectionPair=i,d.selectedItem=o,d.classify=n,c.props.option.setCombo(d);const m=c.ToHTML(c.props);let I=`
${r}
${m}
`.trim();const k=new P;k.props.name=this.propItemCssClassName(),k.props.id=e,k.props.className=this.lblCssClassName(),k.props.option.setPlain(I),a.add(k)}createFormationBox(t,e,s,n){this.parentName=e;const i=this.htmlMakerChSel.MakeDefaultToolButtonsHTML(`
<button id="${this.parentName}-dlg-tbput">キャラ配置</button>
<button id="${this.parentName}-dlg-tbempty">キャラ抹消</button>
`),o=this.htmlMakerChSel.MakeDefaultButtonsHTML(`
<button id="${this.parentName}-dlg-apply">確定</button>
<button id="${this.parentName}-dlg-close">閉じる</button>
`);let a="";n!==""?a=`<div class="${this.dlgContentCssClassName()}">
    ${i}
    ${s}
    ${n}
    ${o}
</div>`:a=`<div class="${this.dlgContentCssClassName()}">
    ${i}
    ${s}
    ${o}
</div>`;const l=new V;l.title="<"+t+">";const r=l.NewDialog(e,this.dlgCssClassName());return l.SetContent(e,a),this.applyCss(),l.EnableEventHandlers(),r}addEventHandlers(t){document.getElementById(`${this.parentName}-dlg-close`).onclick=()=>{document.getElementById(this.parentName).hidden=!0},document.getElementById(`${this.parentName}-dlg-apply`).onclick=()=>{if(this.onApply!==void 0){const e=new ut;e.item=this.selectedItem,this.onApply(e),e.cancel||t.close()}},document.getElementById(`${this.parentName}-dlg-tbput`).onclick=async()=>{if(this.onPut!==void 0){this.selectedItem.isEmpty=!1;const e=new ut;e.uiName=this.formation.uiInfo.name,e.item=this.selectedItem,await this.onPut(e),this.formation.put(this.selectedItem,e.selectCh),this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,e.selectedImg),this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,this.selectedItem.ch.name);const s=this.findPropGridPos();if(s!==-1){let n=this.selectedItem.ch.idAsText===""?`${this.selectedItem.ch.id}`:this.selectedItem.ch.idAsText;const i=await this.charDB.getStatus(n);if(console.log(i),i!==null&&i.items!==void 0){for(const a of i.items)this.selectedItem.details.set(a.key,a.selectedVal);this.scsList[s]=i;const o=this.toGridHTML();this.replacePropGrid(o),this.htmlMakerProp.enableEvents(this.propItemCssClassName())}}}},document.getElementById(`${this.parentName}-dlg-tbempty`).onclick=async()=>{if(this.onEmpty!==void 0){this.selectedItem.isEmpty=!0;const e=new ut;e.uiName=this.formation.uiInfo.name,e.item=this.selectedItem,e.selectedImg=this.emptyFile,await this.onEmpty(e),this.formation.empty(this.selectedItem),this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,e.selectedImg),this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,"");const s=this.findPropGridPos();if(s!==-1){this.scsList[s]=new Q;const n=this.toGridHTML();this.replacePropGrid(n),this.htmlMakerProp.enableEvents(this.propItemCssClassName())}}}}addItemEventkHandlers(t,e,s,n){this.onApply=t,this.onPut=e,this.onEmpty=s,this.onPropChanged=n;const i=this.htmlMakerChSel.GetIdByIndex(0);this.htmlMakerChSel.SelectByID(this.itemCssClassName(),i),this.htmlMakerChSel.enableEvents(this.itemCssClassName()),this.htmlMakerProp.enableEvents(this.propItemCssClassName()),this.setSelectedItem(i)}findPropGrid(){const t=this.htmlMakerChSel.FindDivByClassName(this.dlgContentCssClassName(),this.propCssClassName());return t!==null?t:null}findPropGridPos(){const t=this.findPropGrid();if(t!==null&&t.className.startsWith(this.propCssClassName())){let e=-1;for(const s of this.formation.items)if(e++,s===this.selectedItem)return console.log(`pos=${e}`),e}return-1}replacePropGrid(t){const e=this.htmlMakerChSel.FindDivByClassName(this.dlgContentCssClassName(),this.propCssClassName());if(e===null)return null;const s=document.createElement("div");s.innerHTML=t,e.replaceWith(s.childNodes[0])}setSelectedItem(t){const e=this.formation.items.find(s=>t===s.ch.idAttributeForHTML);e&&(this.selectedItem=e)}enableLazyImages(t){this.htmlMakerChSel.initObserver(this.dlgCssClassName(),t)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}propCssClassName(){return`${this.listName}-prop`}propItemCssClassName(){return`${this.listName}-prop-item`}lblCssClassName(){return`${this.listName}-lbl`}listCssClassName(){return`${this.listName}-list`}dlgContentCssClassName(){return`${this.parentName}-dlg-content`}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const t=this.listCssClassName(),e=this.itemCssClassName(),s=this.imgCssClassName(),n=this.propCssClassName(),i=this.propItemCssClassName();this.lblCssClassName();const o=parseInt(this.formation.uiInfo.left),a=parseInt(this.formation.uiInfo.top),l=100;new vt;const r=document.createElement("style");r.textContent=`
${this.htmlMakerChSel.MakeDefaultDialogParentCss(this.parentName,o,a)}
${this.htmlMakerChSel.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgContentCssClassName()} {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

${this.htmlMakerChSel.MakeDefaultScrollCss(this.parentName,500)}
${this.htmlMakerChSel.MakeDefaultGridColCss(t,l,5,l*5+16)}

${this.htmlMakerChSel.MakeDefaultItemimgCss(e,s,l,l)}
${this.htmlMakerChSel.MakeDefaultSelectionCss(e)}

/*
${this.htmlMakerChSel.MakeDefaultGridRowCss(n,l,this.propItemNum,22)}
${this.htmlMakerChSel.MakeDefaultItemJustifyRightCss(i,l,20)}
*/
${this.htmlMakerChSel.MakeDefaultGridColCss(n,l,5,l*5+16)}
${this.htmlMakerChSel.MakeDefaultItemJustifyRightCss(i,l,30)}

${this.htmlMakerChSel.MakeDefaultButtonsCss()}
`.trim(),document.head.appendChild(r);const c=document.getElementById(this.parentName);this.htmlMakerChSel.copyCssToInlineStyle(`.${this.parentName}`,c)}}class ut{constructor(){this.cancel=!1}}class Yt{constructor(){this.uiName="",this.cancel=!1}}class ot{constructor(){this.ch=new O,this.isEmpty=!0,this.TextMap=""}static toJsonText(t){const e=O.toJsonInst(t.ch);return JSON.stringify(e,null,2)}static toJsonInst(t){const e=new ot;e.ch=O.toJsonInst(t.ch),e.isEmpty=t.isEmpty;const s=Object.fromEntries(t.details.TextMap);return e.TextMap=JSON.stringify(s,null,2),e}static fromJsonInst(t){const e=new Pt;e.ch=O.fromJsonInst(t.ch),e.isEmpty=t.isEmpty;const s=new Map(Object.entries(JSON.parse(t.TextMap)));return e.details.TextMap=s,e}}class j{static toJsonText(t){const e=j.toJsonInst(t);return JSON.stringify(e,null,2)}static toJsonInst(t){const e=new j;e.items=new Array;for(const s of t.items)e.items.push(ot.toJsonInst(s));return e}static fromJsonInst(t){const e=new Dt;e.items=new Array;for(const s of t.items)e.items.push(ot.fromJsonInst(s));return e}}class Bt{constructor(t=0,e="",s=!0,n=0){this.ch=new rt,this.isEmpty=!0,this.score=0,this.allAvailable=!1,this.ch.id=t,this.ch.name=e,this.isEmpty=s,this.score=n}}class Ct{Add(t){if(t===void 0){console.log("[VersusGroupRow::Add] scItem === undefined");return}this.columns===void 0&&(this.columns=[]),this.columns.push(t)}Count(){return this.columns.length}debug(){if(this.columns===void 0){console.log("[VersusGroupRow::debug] this.columns === undefined");return}for(const t of this.columns)console.log(`[${t.ch.name}]	score=[${t.score}]`)}}Ct.defNumColumn=5;class bt{Add(t){this.groupRows===void 0&&(this.groupRows=[]),this.groupRows.push(t)}Count(){return this.groupRows.length}debug(){if(this.groupRows===void 0)console.log("this.groupRows === undefined");else for(const t of this.groupRows)t.debug()}async loadJson(t){const n=(await new q().loadJson(t)).groupRows.map(o=>Object.assign(new Ct,o)),i=new bt;return i.groupRows=n,i}}const B={None:"None",Player:"Player",Enemy:"Enemy"},E={None:"None",Attr:"Attr",Role:"Role"},dt={HiLv:"HiLv"},x={Likely:"Likely",Uncertain:"Uncertain",Wishful:"Wishful"};class at{}at.Likely=.9;at.Uncertain=.64;class ft{constructor(){this.scoreItems=[],this.formationType=B.None,this.boost=0}get imgPrefix(){return this.formationType===B.Player?"ftPlayer":"ftEnemy"}get judgeWidth(){return 48}setScoreItems(t){if(t!==void 0){this.scoreItems=new Array;for(const e of t){const s=new Bt(e.ch.id,e.ch.name,e.isEmpty,e.score);this.scoreItems.push(s)}}}async toCharHTML(t,e){const s=e.ch.ns===H.None?"":e.ch.ns,n=await t.getImageUrlBy(e.ch.iconFileName,s);let i=this.scoreToolTip(e);return i!==""&&(i=`title="${i}"`),`
<img class=${this.charCssClassName()}
  src="${n}"
  ${i}>
`.trim()}scoreToolTip(t){return t.isEmpty?"":`${t.ch.name}
score=${t.score}`}async toJudgeHTML(t,e){const s=this.toJudgeFileURL(t,e);return`<img class=${this.judgeCssClassName()} src="${s}" width="48">`}async toJudgeFileURL(t,e){let s=null;switch(e){case x.Likely:s=await t.getImageUrlBy("win.png",t.AnyNs);break;case x.Uncertain:s=await t.getImageUrlBy("even.png",t.AnyNs);break;case x.Wishful:s=await t.getImageUrlBy("lost.png",t.AnyNs);break;default:return""}return s}charCssClassName(){return"combat-char"}judgeCssClassName(){return"combat-judge"}get combatScore(){if(this.scoreItems===void 0)return 0;const t=this.scoreItems.reduce((s,n)=>n.isEmpty?s:s+n.score,0),e=this.boost===0?1:this.boost;return Math.ceil(t*e/100)}}class Zt{constructor(){this.hasCombo=!1,this.winRate=new Map}setPlayer(t){t.formationType=B.Player,this.player=t}setEnemy(t){t.formationType=B.Enemy,this.enemy=t}judge(t){const s=this.winRate.get(t);return s>=at.Likely?x.Likely:s>=at.Uncertain?x.Uncertain:x.Wishful}judgeForEnemy(t){switch(t){case x.Likely:return x.Wishful;case x.Uncertain:return x.Uncertain;case x.Wishful:return x.Likely}}}class te{constructor(){this.combatPairs=new Map,this.emptyFile="plus.png",this.parentName="",this.uiInfo=new lt}setPair(t,e){this.combatPairs.set(t,e)}calcCombatScore(){for(const[t,e]of this.combatPairs){if(e.player===void 0||e.enemy===void 0)continue;const s=[E.None,E.Attr,E.Role];for(const n of s){let i=e.player.combatScore,o=e.enemy.combatScore;e.winRate.set(n,o!==0?i/o:1)}}}async replaceChar(t,e,s,n,i){const o=this.combatPairs.get(t);let a;if(e===B.Player?a=o?.player:e===B.Enemy&&(a=o?.enemy),a===void 0)return!1;const l=s.itemID;if(l<0)return!1;const r=l-1;a=a;const d=`${a.imgPrefix}${l}`,m=a.scoreItems[r],I=m.ch;s.isEmpty?(I.id=0,I.name="",console.log("set empty")):(I.id=n.id,I.name=n.name,console.log(`set char ${n.id}:${n.name}`)),m.isEmpty=s.isEmpty;const k=I.ns===H.None?"":I.ns,R=await i.getImageUrlBy(I.iconFileName,k);if(R===null)return!1;const A=new D,U=this.outerCssClassName();return A.ReplaceImg(U,d,R),A.ReplaceImgToolTip(U,d,a.scoreToolTip(m)),!0}async replaceJudge(t){async function e(i,o){const a=await i.toJudgeFileURL(t,o);if(a===null)return;const l=i.imgPrefix;for(let r=0;r<i.scoreItems.length;r++){const c=`${l}${r+1}`,d=s.FindImgsByID(n,c);if(d===null||d.length<=1){console.error("fail on judge marker");continue}const m=d[1];s.SetImgSrc(m,a),i.scoreItems[r].isEmpty?s.SetImgSize(m,0,0):s.SetImgSize(m,i.judgeWidth,i.judgeWidth);const I=i.scoreItems[r];s.ReplaceImgToolTip(n,c,i.scoreToolTip(I))}}const s=new D,n=this.outerCssClassName();for(const[i,o]of this.combatPairs){if(o.player===void 0||o.enemy===void 0)continue;const a=[E.None,E.Attr,E.Role];for(const l of a){if(l!==E.None)continue;const r=o.judge(l),c=o.judgeForEnemy(r);await e(o.player,r),await e(o.enemy,c)}}}async toHTML(t,e){const s=document.createElement("table");s.id=t;const n=document.createElement("tbody");s?.appendChild(n);async function i(a,l){const r=document.createElement("tr");n?.appendChild(r);const c=await l.toJudgeHTML(e,a),d=l.imgPrefix;let m=0;for(const I of l.scoreItems){m++;const k=await l.toCharHTML(e,I),R=`
<div class=${o} item-id="${d}${m}">
    ${k}
    ${c}
</div>
`.trim(),A=document.createElement("td");A.innerHTML=R,r.appendChild(A)}}const o=this.outerCssClassName();for(const[a,l]of this.combatPairs){const r=l.judge(E.None),c=l.judgeForEnemy(r);await i(r,l.player),await i(c,l.enemy)}return s.outerHTML}createCombatBox(t,e,s){this.parentName=e,this.htmlMaker=new D;const n=`<div class="${this.parentName}-dlg-content">
    ${s}
</div>`,i=new V;i.title="<"+t+">";const o=i.NewDialog(e,this.dlgCssClassName());return i.SetContent(e,n),this.applyCss(),i.EnableEventHandlers(),o}enableLazyImages(t){this.htmlMaker.initObserver(this.dlgCssClassName(),t)}processResult(t,e,s){async function n(o,a){const l=e(a.formationType),r=await a.toJudgeHTML(t,o),c=a.imgPrefix;let d=0;for(const m of a.scoreItems){d++;const I=await a.toCharHTML(t,m),k=`
<div class=${i} item-id="${c}${d}">
    ${I}
    ${r}
</div>
`.trim();s(l,k)}}const i=this.outerCssClassName();for(const[o,a]of this.combatPairs){const l=a.judge(E.None),r=a.judgeForEnemy(l);n(l,a.player),n(r,a.enemy)}}outerCssClassName(){return"combat-outer"}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const t=new ft,e=`.${this.outerCssClassName()}`,s=`.${t.charCssClassName()}`,n=`.${t.judgeCssClassName()}`,i=parseInt(this.uiInfo.left),o=parseInt(this.uiInfo.top),a=document.createElement("style");a.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,i,o)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.parentName}-dlg-content {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}
${e} {
  position: relative;
  width: 100px;
  height: 100px;
}
${e} ${s} {
  width: 100px;
  height: 100px;
}
${e} ${n} {
  position: absolute;
  width: 48px;
  height: 48px;
  right: 0;
  bottom: 0;
}
`.trim(),document.head.appendChild(a);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}}const K={Unknown:"Unknown",Success:"Success",Fail:"Fail",Cancel:"Cancel"};async function ee(u){const t=u.isWebRunning,e=u.currentUserHome,s=u.chStatusListFile,n=u.chListFile,i=new Jt,o=new D,a="splash-screen";o.initFullScreen(a,"エボナ データベース初期化中..."),o.applyFullScreenCss(a);const l=window.EVONA_CONFIG.workerFile,r=new Ft;r.init(l),await r.initDb();const c=o.getFullScreenMsgElem(a),d=c!==null?c.innerHTML:"";if(e===u.user1Home){const g=[{ns:H.CnsRed,nsName:"赤属性",zipName:"puyoQueRed.zip"},{ns:H.CnsBlue,nsName:"青属性",zipName:"puyoQueBlue.zip"},{ns:H.CnsGreen,nsName:"緑属性",zipName:"puyoQueGreen.zip"},{ns:H.CnsYellow,nsName:"黄属性",zipName:"puyoQueYellow.zip"},{ns:H.CnsViolet,nsName:"紫属性",zipName:"puyoQueViolet.zip"}];for(const h of g)c!==null&&(c.innerHTML=`${d} ${h.nsName}`),await i.setupNs(h.nsName,`${e}${h.zipName}`,r)}e===u.user2Home&&await i.setupNs(H.None,`${e}Image_meme.zip`,r),c!==null&&(c.innerHTML="UI 初期化中 ...");const m=new yt,I=new ct;await I.loadDB(s);async function k(){async function g(){return await new gt().LoadList(n)}const h=await g();h.uiInfo.name="charListArea",h.uiInfo.left="300",h.uiInfo.top="100";const M=await h.toHTML(i);if(t){const y="キャラ選択",f=h.createSelectorBox(y,"charListArea",M);h.addEventHandlers(f),h.addItemEventHandlers(),h.enableLazyImages(i),f.show();const N=new W;N.setAsDlg(f,y),m.add(N)}return h}const R=await k();async function A(g,h,M,y){const f=new Xt;f.Init(I),f.formation.uiInfo.name=g,f.formation.uiInfo.left=`${h}`,f.formation.uiInfo.top=`${M}`;const N=f.formation.uiInfo.name,$=await f.toHTML(N,i),v=f.toGridHTML();if(t){const w=f.createFormationBox(y,N,$,v);f.addEventHandlers(w),f.addItemEventkHandlers(C=>{console.log(`selected ch = ${C.item.ch.name}`)},async C=>{C.selectCh=R.selectedCh;const F=await i.getImageUrlBy(R.selectedCh.iconFileName,R.selectedCh.ns);if(F===null)return;C.selectedImg=F,C.item.isEmpty=!1,console.log(`selected ch = ${C.selectCh.name}`);const z=dt.HiLv;T.combatPairs.get(z),C.uiName===U&&await T.replaceChar(z,B.Player,C.item,C.selectCh,i),C.uiName===X&&await T.replaceChar(z,B.Enemy,C.item,C.selectCh,i),await T.replaceJudge(i)},async C=>{const F=await i.getImageUrlBy(C.selectedImg,R.selectedCh.ns);if(F===null)return;C.selectedImg=F,C.item.isEmpty=!0,console.log(`empty ch = ${C.selectedImg}`);const z=dt.HiLv;T.combatPairs.get(z),C.uiName===U&&await T.replaceChar(z,B.Player,C.item,C.selectCh,i),C.uiName===X&&await T.replaceChar(z,B.Enemy,C.item,C.selectCh,i),await T.replaceJudge(i)},async C=>{const F=$t();console.log(F),await F.replaceJudge(i)}),f.enableLazyImages(i),w.show();const G=new W;G.setAsDlg(w,y),m.add(G)}return f}const U="playerForm",X="enemyForm",mt=await A(U,100,100,"自編成"),ht=await A(X,100,200,"敵編成");async function Rt(g,h,M,y){T.uiInfo.name=g,T.uiInfo.left=`${h}`,T.uiInfo.top=`${M}`;const f=await T.toHTML("combatTable",i),N=T.createCombatBox(y,g,f);T.enableLazyImages(i),await T.replaceJudge(i),N.show();const $=new W;$.setAsDlg(N,y),m.add($)}const T=$t();await Rt("combatForm",120,300,"対戦予想");const It="保存";{const g=new W;g.setAsMenu(It),m.add(g)}const Nt="復帰";{const g=new W;g.setAsMenu(Nt),m.add(g)}const At=await m.toHTML("dockForm",i);if(t){const g=m.createDockBox("dockForm",At);m.addItemClickHandlers(async h=>{if(h.item.dlgParent===null){h.cancel=!0;return}console.log(`selected item = [${h.item.toolTip}::${h.item.dockType}]`),h.item.isUIType&&(new b().MoveHiestLayer(h.item.dlgParent),h.item.dlgParent.hidden&&(h.item.dlgParent.hidden=!1)),h.item.isMenuType&&(h.item.toolTip===It&&await Ut(),h.item.toolTip===Nt&&await zt(async M=>{if(console.log(`[loadedResult] ${M}`),M!==K.Success)return;const y=j.fromJsonInst(Y),f=j.fromJsonInst(Z);Y=null,Z=null,await mt.Setup(y,i),await ht.Setup(f,i)}))}),m.enableLazyImages(i),g.show()}const wt="playerForm.json",Mt="enemyForm.json",St="dockForm.json";async function Ut(){m.InitZOrder(tt);const g=j.toJsonText(mt.formation),h=j.toJsonText(ht.formation),M=it.toJsonText(m),y=new window.JSZip;y.file(wt,g),y.file(Mt,h),y.file(St,M);const f=await y.generateAsync({type:"blob"}),N="gameConfig.zip",$=URL.createObjectURL(f),v=document.createElement("a");v.href=$,v.download=N,v.click(),URL.revokeObjectURL($),console.log("saved!")}let kt=null,Y=null,Z=null;async function zt(g){const h=document.createElement("input");return h.type="file",h.accept=".zip",h.addEventListener("cancel",()=>(console.log("Cancelled."),K.Cancel)),h.addEventListener("change",async()=>{if(h.files.length==1){console.log("File selected: ",h.files[0].name);const y=await h.files[0].arrayBuffer(),N=await new window.JSZip().loadAsync(y);async function $(w){const G=N.file(w);if(G){const C=await G.async("string"),F=JSON.parse(C);return console.log(F),F}}{const w=await $(St);w&&(kt=w)}{const w=await $(wt);w&&(Y=w)}{const w=await $(Mt);w&&(Z=w)}const v=kt!==null&&Y!==null&&Z!==null?K.Success:K.Fail;g(v)}}),h.click(),K.Unknown}const tt=new b;t&&(tt.AddDialogs(),tt.AssignIndexies(),m.InitZOrder(tt)),o.hideFullScreenCss(a);function Tt(g){const h=new bt,M=new Ct,y=g.formation;y.uiInfo.name,y.uiInfo.name;let f=0;for(const N of y.items){const $=g.scsList[f];f++;const v=Math.ceil($.stdScore),w=new Bt(N.ch.id,N.ch.name,N.isEmpty,v);w.allAvailable=$.allAvailable,M.Add(w)}return h.Add(M),h.debug(),h}function $t(){const g=new te,h=Tt(mt),M=Tt(ht),y=new ft;y.setScoreItems(h.groupRows[0].columns),y.boost=100;const f=new ft;f.setScoreItems(M.groupRows[0].columns),f.boost=100;const N=new Zt;N.setPlayer(y),N.setEnemy(f),g.setPair(dt.HiLv,N),g.calcCombatScore();for(const[$,v]of g.combatPairs){const w=v.judge(E.None);console.log(`judge=[${w}]`)}return g}}const S=new q,se=S.isWebRunning;se?(S.parseURLParams(),S.currentUserHome===""&&S.setUser(S.user1Home)):S.setUser(S.user2Home);S.currentUserHome;S.setPath();S.statusJsonPath;S.zipPrefix;S.chListFile;S.chStatusListFile;switch(S.admin){case!0:await Ot(S);break;case!1:await ee(S);break}

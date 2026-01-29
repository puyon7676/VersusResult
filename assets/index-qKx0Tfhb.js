(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=e(n);fetch(n.href,i)}})();class R{constructor(){this.imageHome="./Image/",this.user1Home="./User1/",this.user2Home="./User2/",this.currentUserHome="",this.imageZip="./Image.zip",this.nodeToolsImportFilename="./nodeTools.js"}setUser(t){this.currentUserHome=t}get isWebRunning(){return typeof document>"u"?(console.log("please run web env!"),!1):!0}loadJson(t){return this._loadJson(t)}async _loadJson(t){if(this.isWebRunning)return await(await fetch(t)).json();{const{loadJsonNode:e}=await import(this.nodeToolsImportFilename);return e(t)}}async saveJson(t,e){const s=JSON.stringify(e);if(this.isWebRunning){const n=new Blob([s],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=t,o.click()}else{const{saveJsonNode:n}=await import(this.nodeToolsImportFilename);return n(t,e)}}async loadBinFile(t){if(this.isWebRunning)return await(await fetch(t)).blob();{const{readBinNode:e}=await import(this.nodeToolsImportFilename);return e(t)}}}class Mt{constructor(){this.imageHome="",this.cache=new Map}async loadZip(t){const e=new R;this.imageHome=e.imageHome.substring(2);const s=await e.loadBinFile(t);if(e.isWebRunning)this.zip=await window.JSZip.loadAsync(s);else{const{loadZipNode:n}=await import(e.nodeToolsImportFilename);this.zip=await n(s)}}async getImageUrl(t){if(this.cache.has(t))return this.cache.get(t);const e=`${this.imageHome}${t}`,s=this.zip.file(e);if(!s)return console.error("[getImageUrl] ファイルがありません: "+t),"";const n=await s.async("blob"),i=URL.createObjectURL(n);return this.cache.set(t,i),i}dispose(){for(const t of this.cache.values())URL.revokeObjectURL(t);this.cache.clear()}}class dt{constructor(){this.cancel=!1,this.selectedValue=""}}const w={Img:"Img",Label:"Label",LabelRO:"LabelRO",Combo:"Combo",Plain:"Plain"};class kt{constructor(){this.selectedItem="",this.selectionPair=[]}}class Tt{constructor(){this.itemType=w.Img,this.label="",this.innerHTML=""}}class Lt{constructor(){this.imgWidth=100,this.imgHeight=100,this.alt="",this.using=new Tt}setLabel(t,e){this.using.itemType=e?w.Label:w.LabelRO,this.using.label=t}setCombo(t){this.using.itemType=w.Combo,this.using.combo=t}setPlain(t){this.using.itemType=w.Plain,this.using.innerHTML=t}}class St{constructor(){this.name="",this.id="",this.imgName="",this.imgSrc="",this.imgFile="",this.toolTip="",this.option=new Lt}}class E{constructor(){this.props=new St}ToHTML(t){let e="",s=`<div class="overlay" title="${t.toolTip}"></div>`;switch(t.option.using.itemType){case w.Label:e=`
<span class="${t.imgName}" data-readonly="false">${t.option.using.label}</span>
`.trim();break;case w.LabelRO:e=`
<span class="${t.imgName}" data-readonly="true">${t.option.using.label}</span>
`.trim(),s="";break;case w.Plain:e=`
${t.option.using.innerHTML}
`.trim(),s="";break;case w.Combo:if(this.props.option.using.combo===void 0)return"";const n=this.props.option.using.combo;if(n.selectionPair===void 0||n.selectionPair.length<=0)return"";let i="";for(const a of n.selectionPair){let[l,r]=a.split("/");r=r.trim();let c="";n.selectedItem===r&&(c=" selected");const d=`
<option value="${r}"${c}>${l}</option>
`.trim();i+=d}e=`
<select class="${t.imgName}" alt="${t.option.alt}">
  ${i}
</select>
`.trim(),s="";break;case w.Img:let o="";t.imgSrc===""?o=`src="" data-filename="${t.imgFile}"`:o=`src="${t.imgSrc}"`,e=`
<img class="${t.imgName}" ${o} alt="${t.option.alt}">
`.trim();break}return`
  ${e}
  ${s}
`.trim()}MakeSelectableHTML(){return`
<div class="${this.props.name}" item-id="${this.props.id}">
${this.ToHTML(this.props)}
</div>
`.trim()}}class S{constructor(){this._defaultButtonsName="dialog-buttons",this._defaultToolButtonsName="dialog-tool-btns",this.itemList=new Array}add(t){this.itemList.push(t)}get DefaultBlueColor(){return"#86aef7e6"}get DefaultYellowColor(){return"#f7eb86e6"}get DefaultBorderColor(){return"#2c3e50ff"}MakeDefaultDialogParentCss(t,e,s,n=0){return`
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
`.trim()}MakeScrollableList(t){let e="";for(const s of this.itemList)e+=s.MakeSelectableHTML();return`<div class="${t} scroll">
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
}`.trim()}initObserver(t,e){const s=document.getElementById(t);if(!s)return;const n=a=>{a.forEach(l=>{if(l.isIntersecting){const r=l.target,c=r.dataset.filename;console.log("見えた！:",r.dataset.filename),(c&&r.src===""||r.src.startsWith(window.location.origin))&&e.getImageUrl(c).then(d=>{r.src=d,this.observer.unobserve(r)})}})},i={root:s,rootMargin:"0px",threshold:.1};this.observer=new IntersectionObserver(n,i),s.querySelectorAll("img[data-filename]").forEach(a=>this.observer.observe(a)),console.log("[initObserver] enabled!")}enableEvents(t){const e=`.${t}`;document.querySelectorAll(`${e}`).forEach(n=>{const i=n.querySelectorAll("img");i.length>=1&&(i[0],this.addButtonEvent(e,n));const o=n.querySelectorAll("span");o.length>=1&&o[0]?.dataset.readonly=="false"&&this.addButtonEvent(e,n);const a=n.querySelectorAll("select");a.length>=1&&(a[0],this.addSelectEvent(e,n))})}addButtonEvent(t,e){e.addEventListener("click",()=>{document.querySelectorAll(`${t}.selected`).forEach(n=>n.classList.remove("selected")),e.classList.add("selected");const s=e.getAttribute("item-id");if(s){const n=this.itemList.find(i=>`${i.props.id}`===s);if(n){if(n.props.option.onSelect){const i=new dt;i.item=n,n.props.option.onSelect(i)}this.selectedCh=n}}})}addSelectEvent(t,e){e.addEventListener("change",s=>{const n=s.target,i=e.getAttribute("item-id");if(i){const o=this.itemList.find(a=>`${a.props.id}`===i);if(o){if(o.props.option.onSelect){const a=new dt;a.item=o,a.selectedValue=n.value,o.props.option.onSelect(a)}this.selectedCh=o}}})}GetIdByIndex(t){return this.itemList[t].props.id}UnselectAll(t){const e=`.${t}`;document.querySelectorAll(`${e}.selected`).forEach(s=>s.classList.remove("selected"))}SelectByID(t,e){const s=this.FindByID(t,e);if(s){s.classList.add("selected");const n=s.getAttribute("item-id");if(n){const i=this.itemList.find(o=>`${o.props.id}`===n);i&&(this.selectedCh=i)}return s}return null}FindByID(t,e){const s=`.${t}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===e)return i}return null}FindImgByID(t,e){const s=`.${t}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===e){const a=i.querySelectorAll("img");return a.length>=1?a[0]:null}}return null}FindImgsByID(t,e){const s=`.${t}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===e){const a=i.querySelectorAll("img");return a.length>=1?a:null}}return null}FindDivByID(t,e){const s=`.${t}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===e){const a=i.querySelectorAll("div");return a.length>=1?a[0]:null}}return null}ReplaceImg(t,e,s){const n=this.FindImgByID(t,e);return n===null?null:(n.dataset.filename,n.src=s,n)}ReplaceDivToolTip(t,e,s){const n=this.FindDivByID(t,e);return n===null?null:(n.title=s,n)}ReplaceImgToolTip(t,e,s){const n=this.FindImgByID(t,e);return n===null?null:(n.title=s,n)}SetImgSrc(t,e){if(t===null)return null;t.dataset.filename,t.src=e}SetImgSize(t,e,s){if(t===null)return null;t.style.width=`${e}px`,t.style.height=`${s}px`}copyCssToInlineStyle(t,e){for(const s of document.styleSheets){let n;try{n=s.cssRules}catch{continue}for(const i of n)if(i instanceof CSSStyleRule&&i.selectorText===t){const o=i.style;for(let a=0;a<o.length;a++){const l=o[a],r=o.getPropertyValue(l);e.style.setProperty(l,r),console.log(`[copyCssToInlineStyle] copied [${l}]=[${r}]`)}return}}}}const F={Hide:"Hide",MoveLowest:"MoveLowest"};class P{constructor(){this.title="",this.dlgName="",this.B3Type=F.MoveLowest,this.nMove=4,this.initLeft=0,this.initTop=0,this.moveLeft=0,this.moveTop=0}NewDialog(t,e,s=F.MoveLowest){this.dlgName=e,this.B3Type=s;const n=document.createElement("dialog");n.id=e,n.className=e;const i=document.getElementById(t);return i.appendChild(n),this.dlgParent=i,this.dlg=n,n}SetContent(t,e){const s=this.dlg,n=`<button id="${this.toolNameB1}">[→]</button>`,i=`<button id="${this.toolNameB2}">[↓]</button>`;let o="";this.B3Type===F.MoveLowest&&(o=`<button id="${this.toolNameB3}">[_]</button>`);let a="";this.title!==""?a=`<div class="${this.titleName}">${this.title}${n}${i}${o}</div>`:a=`<div class="${this.titleName}">${n}${i}${o}</div>`;const l=document.createElement("div");l.innerHTML=a,s.innerHTML=e;const r=document.getElementById(t);r.appendChild(l),r.appendChild(s),this.applyCss()}EnableEventHandlers(){const t=this.dlgParent.style.left,e=this.dlgParent.style.top;this.initLeft=parseInt(t.substring(0,t.length-2)),this.initTop=parseInt(e.substring(0,e.length-2)),this.moveLeft=0,this.moveTop=0,document.getElementById(`${this.toolNameB1}`).onclick=async()=>{this.dlgParent!==void 0&&(this.moveLeft++,this.moveLeft>=this.nMove&&(this.moveLeft=0),this.dlgParent.style.left=`${this.initLeft+this.moveLeft*100}px`)},document.getElementById(`${this.toolNameB2}`).onclick=async()=>{this.dlgParent!==void 0&&(this.moveTop++,this.moveTop>=this.nMove&&(this.moveTop=0),this.dlgParent.style.top=`${this.initTop+this.moveTop*100}px`)},this.B3Type===F.MoveLowest&&(document.getElementById(`${this.toolNameB3}`).onclick=async()=>{if(this.dlgParent===void 0)return;new h().MoveLowestLayer(this.dlgParent)})}static GetDialogInfo(t){const e=this.FindDialogParent(t);if(e===null)return null;const s=e.querySelector("dialog");if(s===null)return null;const n=new K,i=s.clientWidth,o=s.clientHeight;return n.name=t,n.left=e.style.left,n.top=e.style.top,n.width=`${i}px`,n.height=`${o}px`,n}static SetDialogInfo(t){const e=this.FindDialogParent(t.name);if(e===null)return!1;const s=e.querySelector("dialog");return s===null?!1:(e.style.left=t.left,e.style.top=t.top,s.style.width=t.width,s.style.height=t.height,!0)}static FindDialogParent(t){const e=document.getElementById(t);return e??null}get titleName(){return`${this.dlgName}-dlg-title-00`}get toolNameB1(){return`${this.dlgName}-dlg-tool-b1`}get toolNameB2(){return`${this.dlgName}-dlg-tool-b2`}get toolNameB3(){return`${this.dlgName}-dlg-tool-b3`}applyCss(){const t=document.createElement("style");t.textContent=`
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
`.trim(),document.head.appendChild(t)}}class K{constructor(){this.name="",this.left="",this.top="",this.width="",this.height=""}copyTo(t){t.name=this.name,t.left=this.left,t.top=this.top,t.width=this.width,t.height=this.height}}class h{add(t){h.dlgElems.push(t)}AddDialogs(){h.dlgElems=new Array;const t=document.querySelectorAll("div");for(const e of t)e.style.zIndex!==""&&(parseInt(e.style.zIndex)>=h.ignoreIndex||e.querySelector("dialog")&&(console.log(`${e.id} added!`),this.add(e)))}AssignIndexies(){let t=h.dlgElems.length-1;for(const e of h.dlgElems)e.style.zIndex=`${t}`,t--}MoveLowestLayer(t){h.dlgElems.length;for(const e of h.dlgElems)if(e.id===t.id)e.style.zIndex="0";else{const s=e.style.zIndex;e.style.zIndex=`${parseInt(s)+1}`}}MoveHiestLayer(t){h.dlgElems.length;let e=-1;for(const s of h.dlgElems){const n=parseInt(s.style.zIndex);n>=h.ignoreIndex||n>e&&(e=n)}for(const s of h.dlgElems)if(s.id===t.id){s.style.zIndex=`${e}`;break}for(const s of h.dlgElems)if(s.id!==t.id){if(parseInt(s.style.zIndex)>=h.ignoreIndex)continue;e--,s.style.zIndex=`${e}`}}FindByName(t){const e=h.dlgElems.find(s=>s.id===t);return e||null}async ForEachAsync(t){for(const e of h.dlgElems)e.parentNode!==null&&await t(e.id)}ReOrder(){h.dlgElems.sort((t,e)=>{const s=t.style.zIndex,n=e.style.zIndex;if(s===""||n==="")throw new Error("z-index が未設定の要素が混入しています");return parseInt(e.style.zIndex)-parseInt(t.style.zIndex)})}}h.ignoreIndex=1e3;const gt={None:"None"};class X{get iconFileName(){return this.id===null&&!Number.isNaN(this.id)?`${this.name}_${this.idAsText}.png`:`${this.name}_${this.id}.png`}constructor(t=0,e=""){this.ns=gt.None,this.id=0,this.name="",this.contentURL="",this.iconURL="",this.idAsText="",this.idAttributeForHTML="",this.id=t,this.name=e}parseFromImgName(t){let e=t.indexOf("_");if(e>=0){const s=t.substring(0,e);let n=t.substring(e+1);if(e=n.indexOf("."),e>=0)return n=n.substring(0,e),this.id=Number.parseInt(n),this.name=s,this.idAsText=Number.isNaN(this.id)?n:"",!0}return!1}}class st{constructor(){this.uiInfo=new K,this.parentName=""}MakeList(){}async LoadList(t){const n=(await new R().loadJson(t)).map(o=>Object.assign(new X,o)),i=new st;return i.chList=n,this.uiInfo.copyTo(i.uiInfo),i}async toHTML(t){if(!this.chList)return"";this.htmlMaker=new S;let e=0;for(const s of this.chList){e++;const n=`chuid${e}`;s.idAttributeForHTML=n;const i="",o=new E;o.props.name=this.itemCssClassName(),o.props.id=n,o.props.imgName=this.imgCssClassName(),o.props.imgSrc=i,o.props.imgFile=s.iconFileName,o.props.toolTip=s.name,o.props.option.onSelect=a=>{this.setSelectedItem(a.item.props.id)},this.htmlMaker.add(o)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createSelectorBox(t,e,s){this.parentName=e;const n=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="char-dlg-close">閉じる</button>
`),i=`<div class="char-dlg-content">
    ${s}
    <label id="char-dlg-chinfo">未選択</label>
    ${n}
</div>`,o=new P;o.title="<"+t+">";const a=o.NewDialog(e,this.dlgCssClassName());return o.SetContent(e,i),this.applyCss(),o.EnableEventHandlers(),a}addEventHandlers(t){document.getElementById("char-dlg-close").onclick=()=>{document.getElementById(this.parentName).hidden=!0}}addItemEventHandlers(t){this.onApply=t;const e=this.htmlMaker.GetIdByIndex(0);this.htmlMaker.SelectByID(this.itemCssClassName(),e),this.htmlMaker.enableEvents(this.itemCssClassName()),this.setSelectedItem(e)}setSelectedItem(t){const e=this.chList.find(s=>t===s.idAttributeForHTML);e&&(document.getElementById("char-dlg-chinfo").textContent=e.name,this.selectedCh=e)}enableLazyImages(t){this.htmlMaker.initObserver(this.dlgCssClassName(),t)}itemCssClassName(){return"char-item"}imgCssClassName(){return"base"}listCssClassName(){return"char-list"}dlgCssClassName(){return"char-dlg"}applyCss(){const t=this.listCssClassName(),e=this.itemCssClassName(),s=this.imgCssClassName(),n=parseInt(this.uiInfo.left),i=parseInt(this.uiInfo.top),o=document.createElement("style");o.textContent=`
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
`.trim(),document.head.appendChild(o);const a=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,a)}}class L{constructor(){this.ns=gt.None,this.id=0,this.name="",this.contentURL="",this.iconURL=""}static toJsonText(t){const e=L.toJsonInst(t);return JSON.stringify(e,null,2)}static toJsonInst(t){const e=new L;return e.ns=t.ns,e.id=t.id,e.name=t.name,e.contentURL=t.contentURL,e.iconURL=t.iconURL,e}static fromJsonInst(t){const e=new X;return e.ns=t.ns,e.id=t.id,e.name=t.name,e.contentURL=t.contentURL,e.iconURL=t.iconURL,e}}class ft{constructor(t=0,e="",s=!0,n=0){this.ch=new X,this.isEmpty=!0,this.score=0,this.ch.id=t,this.ch.name=e,this.isEmpty=s,this.score=n}}class nt{Add(t){if(t===void 0){console.log("[VersusGroupRow::Add] scItem === undefined");return}this.columns===void 0&&(this.columns=[]),this.columns.push(t)}Count(){return this.columns.length}debug(){if(this.columns===void 0){console.log("[VersusGroupRow::debug] this.columns === undefined");return}for(const t of this.columns)console.log(`[${t.ch.name}]	score=[${t.score}]`)}}nt.defNumColumn=5;class it{Add(t){this.groupRows===void 0&&(this.groupRows=[]),this.groupRows.push(t)}Count(){return this.groupRows.length}debug(){if(this.groupRows===void 0)console.log("this.groupRows === undefined");else for(const t of this.groupRows)t.debug()}async loadJson(t){const n=(await new R().loadJson(t)).groupRows.map(o=>Object.assign(new nt,o)),i=new it;return i.groupRows=n,i}}const N={None:"None",Player:"Player",Enemy:"Enemy"},b={None:"None",Attr:"Attr",Role:"Role"},_={HiLv:"HiLv"},y={Likely:"Likely",Uncertain:"Uncertain",Wishful:"Wishful"};class U{}U.Likely=.9;U.Uncertain=.64;class tt{constructor(){this.scoreItems=[],this.formationType=N.None,this.boost=0}get imgPrefix(){return this.formationType===N.Player?"ftPlayer":"ftEnemy"}get judgeWidth(){return 48}setScoreItems(t){if(t!==void 0){this.scoreItems=new Array;for(const e of t){const s=new ft(e.ch.id,e.ch.name,e.isEmpty,e.score);this.scoreItems.push(s)}}}async toCharHTML(t,e){const s=await t.getImageUrl(e.ch.iconFileName);let n=this.scoreToolTip(e);return n!==""&&(n=`title="${n}"`),`
<img class=${this.charCssClassName()}
  src="${s}"
  ${n}>
`.trim()}scoreToolTip(t){return t.isEmpty?"":`${t.ch.name}
score=${t.score}`}async toJudgeHTML(t,e){const s=this.toJudgeFileURL(t,e);return`<img class=${this.judgeCssClassName()} src="${s}" width="48">`}async toJudgeFileURL(t,e){let s=null;switch(e){case y.Likely:s=await t.getImageUrl("win.png");break;case y.Uncertain:s=await t.getImageUrl("even.png");break;case y.Wishful:s=await t.getImageUrl("lost.png");break;default:return""}return s}charCssClassName(){return"combat-char"}judgeCssClassName(){return"combat-judge"}get combatScore(){if(this.scoreItems===void 0)return 0;const t=this.scoreItems.reduce((s,n)=>n.isEmpty?s:s+n.score,0),e=this.boost===0?1:this.boost;return Math.ceil(t*e/100)}}class vt{constructor(){this.hasCombo=!1,this.winRate=new Map}setPlayer(t){t.formationType=N.Player,this.player=t}setEnemy(t){t.formationType=N.Enemy,this.enemy=t}judge(t){const s=this.winRate.get(t);return s>=U.Likely?y.Likely:s>=U.Uncertain?y.Uncertain:y.Wishful}judgeForEnemy(t){switch(t){case y.Likely:return y.Wishful;case y.Uncertain:return y.Uncertain;case y.Wishful:return y.Likely}}}class xt{constructor(){this.combatPairs=new Map,this.emptyFile="plus.png",this.parentName="",this.uiInfo=new K}setPair(t,e){this.combatPairs.set(t,e)}calcCombatScore(){for(const[t,e]of this.combatPairs){if(e.player===void 0||e.enemy===void 0)continue;const s=[b.None,b.Attr,b.Role];for(const n of s){let i=e.player.combatScore,o=e.enemy.combatScore;e.winRate.set(n,o!==0?i/o:1)}}}async replaceChar(t,e,s,n,i){const o=this.combatPairs.get(t);let a;if(e===N.Player?a=o?.player:e===N.Enemy&&(a=o?.enemy),a===void 0)return!1;const l=s.itemID;if(l<0)return!1;const r=l-1;a=a;const d=`${a.imgPrefix}${l}`,u=a.scoreItems[r],g=u.ch;s.isEmpty?(g.id=0,g.name="",console.log("set empty")):(g.id=n.id,g.name=n.name,console.log(`set char ${n.id}:${n.name}`)),u.isEmpty=s.isEmpty;const I=g.iconFileName,x=await i.getImageUrl(I),M=new S,k=this.outerCssClassName();return M.ReplaceImg(k,d,x),M.ReplaceImgToolTip(k,d,a.scoreToolTip(u)),!0}async replaceJudge(t){async function e(i,o){const a=await i.toJudgeFileURL(t,o),l=i.imgPrefix;for(let r=0;r<i.scoreItems.length;r++){const c=`${l}${r+1}`,d=s.FindImgsByID(n,c);if(d===null||d.length<=1){console.error("fail on judge marker");continue}const u=d[1];s.SetImgSrc(u,a),i.scoreItems[r].isEmpty?s.SetImgSize(u,0,0):s.SetImgSize(u,i.judgeWidth,i.judgeWidth)}}const s=new S,n=this.outerCssClassName();for(const[i,o]of this.combatPairs){if(o.player===void 0||o.enemy===void 0)continue;const a=[b.None,b.Attr,b.Role];for(const l of a){if(l!==b.None)continue;const r=o.judge(l),c=o.judgeForEnemy(r);await e(o.player,r),await e(o.enemy,c)}}}async toHTML(t,e){const s=document.createElement("table");s.id=t;const n=document.createElement("tbody");s?.appendChild(n);async function i(a,l){const r=document.createElement("tr");n?.appendChild(r);const c=await l.toJudgeHTML(e,a),d=l.imgPrefix;let u=0;for(const g of l.scoreItems){u++;const I=await l.toCharHTML(e,g),x=`
<div class=${o} item-id="${d}${u}">
    ${I}
    ${c}
</div>
`.trim(),M=document.createElement("td");M.innerHTML=x,r.appendChild(M)}}const o=this.outerCssClassName();for(const[a,l]of this.combatPairs){const r=l.judge(b.None),c=l.judgeForEnemy(r);await i(r,l.player),await i(c,l.enemy)}return s.outerHTML}createCombatBox(t,e,s){this.parentName=e,this.htmlMaker=new S;const n=`<div class="${this.parentName}-dlg-content">
    ${s}
</div>`,i=new P;i.title="<"+t+">";const o=i.NewDialog(e,this.dlgCssClassName());return i.SetContent(e,n),this.applyCss(),i.EnableEventHandlers(),o}enableLazyImages(t){this.htmlMaker.initObserver(this.dlgCssClassName(),t)}processResult(t,e,s){async function n(o,a){const l=e(a.formationType),r=await a.toJudgeHTML(t,o),c=a.imgPrefix;let d=0;for(const u of a.scoreItems){d++;const g=await a.toCharHTML(t,u),I=`
<div class=${i} item-id="${c}${d}">
    ${g}
    ${r}
</div>
`.trim();s(l,I)}}const i=this.outerCssClassName();for(const[o,a]of this.combatPairs){const l=a.judge(b.None),r=a.judgeForEnemy(l);n(l,a.player),n(r,a.enemy)}}outerCssClassName(){return"combat-outer"}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const t=new tt,e=`.${this.outerCssClassName()}`,s=`.${t.charCssClassName()}`,n=`.${t.judgeCssClassName()}`,i=parseInt(this.uiInfo.left),o=parseInt(this.uiInfo.top),a=document.createElement("style");a.textContent=`
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
`.trim(),document.head.appendChild(a);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}}const T={None:"None",UI:"UI",Menu:"Menu"};class A{constructor(){this.dockType=T.None,this.iconFileName="",this.toolTip="",this.idAttributeForHTML=""}get labelWrap(){let t=this.toolTip,e=this.toolTip.length;if(e>3){const s=e%2===0?e/2:e/2+1,n=t.substring(0,s),i=t.substring(s);t=n+`
`+i}return t}setAsDlg(t,e){this.dockType=T.UI,this.dlg=t,this.toolTip=e}setAsMenu(t){this.dockType=T.Menu,this.toolTip=t}get isUIType(){return this.dockType==T.UI}get isMenuType(){return this.dockType==T.Menu}ToggleStatus(){this.dlg===void 0||this.dlg===null||(this.dlg.hidden=!this.dlg.hidden)}}class ot{constructor(){this.items=new Array,this.parentName="",this.listName=""}add(t){return t.dockType==T.UI&&(t.dlgParent=t.dlg.parentElement),this.items.push(t),!0}async toHTML(t,e){if(!this.items)return"";this.listName=t,this.htmlMaker=new S;let s=0;for(const n of this.items){s++;const i=`dock-uid${s}`;n.idAttributeForHTML=i;const o="",a=n.iconFileName,l=new E,r=n.labelWrap;l.props.name=this.itemCssClassName(),l.props.id=i,l.props.imgName=this.imgCssClassName(),l.props.imgSrc=o,l.props.imgFile=a,l.props.toolTip=n.toolTip,l.props.option.setLabel(r,!0),l.props.option.onSelect=c=>{const d=this.items.find(u=>c.item.props.id===u.idAttributeForHTML);if(d&&(this.selectedItem=d,this.onApply!==void 0)){const u=new Et;u.item=this.selectedItem,this.onApply(u)}},this.htmlMaker.add(l)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createDockBox(t,e){this.parentName=t;const s=`<div class="${this.parentName}-dlg-content">
    ${e}
</div>`,n=new P,i=n.NewDialog(t,this.dlgCssClassName(),F.Hide);return n.SetContent(t,s),this.applyCss(),n.EnableEventHandlers(),i}addItemClickHandlers(t){this.onApply=t,this.htmlMaker.SelectByID(this.itemCssClassName(),this.htmlMaker.GetIdByIndex(0)),this.htmlMaker.enableEvents(this.itemCssClassName())}enableLazyImages(t){this.htmlMaker.initObserver(this.dlgCssClassName(),t)}applyCss(){const t=this.listCssClassName(),e=this.itemCssClassName(),s=this.imgCssClassName(),n=48,i=this.items.length,o=document.createElement("style");o.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,60,10,h.ignoreIndex)}
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
`.trim(),document.head.appendChild(o);const a=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,a)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}listCssClassName(){return`${this.listName}-list`}dlgCssClassName(){return`${this.parentName}-dlg`}static GetDialogInfo(t){return P.GetDialogInfo(t)}static SetDialogInfo(t){return P.SetDialogInfo(t)}async InitZOrder(t){await t.ForEachAsync(e=>{const s=ot.GetDialogInfo(e),n=t.FindByName(e);return s!==null&&(s.zindex=n!==null?n.style.zIndex:""),console.log(s),!0})}}class Et{constructor(){this.cancel=!1}}class z{constructor(){this.dockType=T.None,this.iconFileName="",this.toolTip="",this.dlgName="",this.hidden=!1,this.zIndex="",this.topPx="",this.leftPx=""}static toJsonText(t){const e=z.toJsonInst(t);return JSON.stringify(e,null,2)}static toJsonInst(t){const e=new z;return e.dockType=t.dockType,e.iconFileName=t.iconFileName,e.toolTip=t.toolTip,t.isUIType&&(e.dlgName=t.dlgParent.id,e.hidden=t.dlgParent.hidden,e.zIndex=t.dlgParent.style.zIndex,e.leftPx=t.dlgParent.style.left,e.topPx=t.dlgParent.style.top),e}}class j{static toJsonText(t){const e=j.toJsonInst(t);return JSON.stringify(e,null,2)}static toJsonInst(t){const e=new j;e.items=new Array;for(const s of t.items)e.items.push(z.toJsonInst(s));return e}restore(t,e){for(const s of this.items){const n=t.items.find(i=>i.dlg.id===s.dlgName);n&&(n.dockType=s.dockType,n.iconFileName=s.iconFileName,n.toolTip=s.toolTip,n.isUIType&&(n.dlgParent.hidden=s.hidden,n.dlgParent.style.zIndex=s.zIndex,n.dlgParent.style.left=s.leftPx,n.dlgParent.style.top=s.topPx))}e.ReOrder()}}class Pt{constructor(){this.title="",this.key="",this.selectionPair=[],this.selectedVal="",this.initScoreVal=0,this.mulScoreVal=0}get stdScore(){const t=this.selectedVal.length>=1?this.selectedVal:"1",e=parseInt(t);return this.initScoreVal+e*this.mulScoreVal}}class at{constructor(){this.items=new Array}makeDemoLvText(t){let e="";for(let s=1;s<=100;s++)e+=`"${t}${s}/${s}",`;return e=e.substring(0,e.length-1),e}load(){const t=this.makeDemoLvText("Lv"),e=this.makeDemoLvText("Lv"),s=this.makeDemoLvText(""),n=`
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
`,o=JSON.parse(n).map(a=>Object.assign(new Pt,a));this.items=o}save(){console.log(JSON.stringify(this,null,2))}static calcScore(t,e){const s=e.split("+");let n=0;for(const i of s){const o=i.trim();if(o.endsWith("()")){const a=o.slice(0,-2);typeof t[a]=="function"?n+=t[a]():console.warn(`関数 '${a}' が存在しません`)}else{const a=t[o];typeof a=="number"?n+=a:Array.isArray(a)?n+=a.reduce((l,r)=>l+r,0):console.warn(`プロパティ '${o}' が数値ではありません`)}}return n}static calcScoreAdvanced(t,e){const s=Object.keys(t),n=s.map(o=>t[o]);return new Function(...s,`return ${e};`)(...n)}toInst(t){return(n=>{const i=class{constructor(){n.forEach((o,a)=>{this[a]=o})}};return new i})(t)}}class Dt{constructor(){this.TextMap=new Map}set(t,e){const s=this.TextMap.has(t);return this.TextMap.set(t,e),s}remove(t){const e=this.TextMap.has(t);return e&&this.TextMap.delete(t),e}get count(){return this.TextMap.size}clear(){this.TextMap.clear()}forEach(t){if(t===void 0)return;let e=!1;for(const[s,n]of this.TextMap)if(e=t(s,n),e)break;return e}values(){const t=new Map;for(const[e,s]of this.TextMap)t.set(e,parseInt(s));return t}}class et{constructor(t=0,e=""){this.ch=new X,this.isEmpty=!0,this.details=new Dt,this.ch.id=t,this.ch.name=e}set(t,e){const s=this.details.TextMap.has(t);return this.details.set(t,e),s}get values(){return this.details.values()}get itemID(){const t=this.itemKey,e=this.ch.idAttributeForHTML.substring(t.length);let s=parseInt(e);return s<=0?-1:s}get itemKey(){return"chuid"}}class Y{constructor(){this.nFormationItem=5,this.uiInfo=new K}async Load(t){const n=(await new R().loadJson(t)).map(o=>Object.assign(new et,o)),i=new Y;return i.items=n,i}Init(){this.items=new Array;for(let t=0;t<this.nFormationItem;t++)this.items.push(new et)}put(t,e){return this.items.find(n=>this.isExistCh(n,e))!==void 0?!1:(t.ch.ns=e.ns,t.ch.id=e.id,t.ch.name=e.name,t.isEmpty=!1,!0)}empty(t){const e=t.isEmpty;return t.isEmpty=!0,t.isEmpty!=e}isExistCh(t,e){return t.ch.name===e.name&&t.ch.id===e.id}equalsFormationItem(t,e){return t.ch.name===e.ch.name&&t.ch.id===e.ch.id}}class Ft{constructor(){this.emptyFile="plus.png",this.propItemNum=0,this.parentName="",this.listName=""}Init(){this.formation=new Y,this.formation.Init()}async Setup(t,e){if(!t)return;this.formation=t;let s=0;for(const n of this.formation.items){n.isEmpty?this.formation.empty(n):this.formation.put(n,n.ch),s++;const i=`${n.itemKey}${s}`;n.ch.idAttributeForHTML=i;const o=n.isEmpty?this.emptyFile:n.ch.iconFileName,a=await e.getImageUrl(o);this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),n.ch.idAttributeForHTML,a)}}async toHTML(t,e){if(!this.formation)return"";this.listName=t,this.htmlMakerChSel=new S;let s=0;for(const n of this.formation.items){const i=n.ch;s++;const o=`${n.itemKey}${s}`;i.idAttributeForHTML=o;const a="",l=n.isEmpty?this.emptyFile:i.iconFileName,r=new E;r.props.name=this.itemCssClassName(),r.props.id=o,r.props.imgName=this.imgCssClassName(),r.props.imgSrc=a,r.props.imgFile=l,r.props.toolTip=i.name,r.props.option.onSelect=c=>{console.log(`notifty id = ${c.item.props.id}`),this.setSelectedItem(c.item.props.id)},this.htmlMakerChSel.add(r)}return this.htmlMakerChSel.MakeScrollableList(this.listCssClassName())}toGridHTML(){this.htmlMakerProp=new S,this.initScoreSet(),this.propItemNum=this.scoreConfigSet.items.length;let t=0;for(const e of this.formation.items){e.ch,t++;for(const s of this.scoreConfigSet.items)this.makeChLvSelect(e,`${s.key}${t}`,s.title,s.selectionPair,s.selectedVal,this.htmlMakerProp),e.details.set(s.key,s.selectedVal)}return this.htmlMakerProp.MakeScrollableList(this.propCssClassName())}initScoreSet(){const t=new at;t.load(),this.scoreConfigSet=t}makeChLvSelect(t,e,s,n,i,o){const a=new E;a.props.name=this.propItemCssClassName(),a.props.id=e,a.props.imgName=this.lblCssClassName(),a.props.option.setLabel(s,!1);const l=a.ToHTML(a.props),r=new E;r.props.name=this.propItemCssClassName(),r.props.id=e,r.props.imgName=this.lblCssClassName();const c=new kt;c.selectionPair=n,c.selectedItem=i,r.props.option.setCombo(c);const d=r.ToHTML(r.props);let u=`
${l}
${d}
`.trim();const g=new E;g.props.name=this.propItemCssClassName(),g.props.id=e,g.props.imgName=this.lblCssClassName(),g.props.option.setPlain(u),g.props.option.onSelect=I=>{console.log(`notifty id = ${I.item.props.id}`);const x=I.item.props.id;for(const M of this.scoreConfigSet.items){const k=M.key;let ct=k.length;if(x.substring(0,ct)===k){let $=parseInt(x.substring(ct));if($--,0<=$&&$<this.formation.items.length){if(this.formation.items[$].set(k,I.selectedValue),console.log(`valid index=[${$}], key=[${k}], value=[${I.selectedValue}]`),this.onPropChanged!==void 0){const mt=this.formation.items[$].values;this.scoreConfigSet.toInst(mt);const D=new Bt;D.uiName=this.parentName,D.item=this.formation.items[$],D.values=mt,D.scoreConfigSet=this.scoreConfigSet,this.onPropChanged(D)}}else console.log(`invalid index = ${$}`);break}}},o.add(g)}createFormationBox(t,e,s,n){this.parentName=e;const i=this.htmlMakerChSel.MakeDefaultToolButtonsHTML(`
<button id="${this.parentName}-dlg-tbput">キャラ配置</button>
<button id="${this.parentName}-dlg-tbempty">キャラ抹消</button>
`),o=this.htmlMakerChSel.MakeDefaultButtonsHTML(`
<button id="${this.parentName}-dlg-apply">確定</button>
<button id="${this.parentName}-dlg-close">閉じる</button>
`),a=`<div class="${this.parentName}-dlg-content">
    ${i}
    ${s}
    ${n}
    ${o}
</div>`,l=new P;l.title="<"+t+">";const r=l.NewDialog(e,this.dlgCssClassName());return l.SetContent(e,a),this.applyCss(),l.EnableEventHandlers(),r}addEventHandlers(t){document.getElementById(`${this.parentName}-dlg-close`).onclick=()=>{document.getElementById(this.parentName).hidden=!0},document.getElementById(`${this.parentName}-dlg-apply`).onclick=()=>{if(this.onApply!==void 0){const e=new Z;e.item=this.selectedItem,this.onApply(e),e.cancel||t.close()}},document.getElementById(`${this.parentName}-dlg-tbput`).onclick=async()=>{if(this.onPut!==void 0){this.selectedItem.isEmpty=!1;const e=new Z;e.uiName=this.formation.uiInfo.name,e.item=this.selectedItem,await this.onPut(e),this.formation.put(this.selectedItem,e.selectCh),this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,e.selectedImg),this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,this.selectedItem.ch.name)}},document.getElementById(`${this.parentName}-dlg-tbempty`).onclick=async()=>{if(this.onEmpty!==void 0){this.selectedItem.isEmpty=!0;const e=new Z;e.uiName=this.formation.uiInfo.name,e.item=this.selectedItem,e.selectedImg=this.emptyFile,await this.onEmpty(e),this.formation.empty(this.selectedItem),this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,e.selectedImg),this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,"")}}}addItemEventkHandlers(t,e,s,n){this.onApply=t,this.onPut=e,this.onEmpty=s,this.onPropChanged=n;const i=this.htmlMakerChSel.GetIdByIndex(0);this.htmlMakerChSel.SelectByID(this.itemCssClassName(),i),this.htmlMakerChSel.enableEvents(this.itemCssClassName()),this.htmlMakerProp.enableEvents(this.propItemCssClassName()),this.setSelectedItem(i)}setSelectedItem(t){const e=this.formation.items.find(s=>t===s.ch.idAttributeForHTML);e&&(this.selectedItem=e)}enableLazyImages(t){this.htmlMakerChSel.initObserver(this.dlgCssClassName(),t)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}propCssClassName(){return`${this.listName}-prop`}propItemCssClassName(){return`${this.listName}-prop-item`}lblCssClassName(){return`${this.listName}-lbl`}listCssClassName(){return`${this.listName}-list`}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const t=this.listCssClassName(),e=this.itemCssClassName(),s=this.imgCssClassName(),n=this.propCssClassName(),i=this.propItemCssClassName();this.lblCssClassName();const o=parseInt(this.formation.uiInfo.left),a=parseInt(this.formation.uiInfo.top),l=100,r=document.createElement("style");r.textContent=`
${this.htmlMakerChSel.MakeDefaultDialogParentCss(this.parentName,o,a)}
${this.htmlMakerChSel.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.parentName}-dlg-content {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

${this.htmlMakerChSel.MakeDefaultScrollCss(this.parentName,500)}
${this.htmlMakerChSel.MakeDefaultGridColCss(t,l,5,l*5+16)}

${this.htmlMakerChSel.MakeDefaultItemimgCss(e,s,l,l)}
${this.htmlMakerChSel.MakeDefaultSelectionCss(e)}

/*
*/
${this.htmlMakerChSel.MakeDefaultGridRowCss(n,l,this.propItemNum,22)}
${this.htmlMakerChSel.MakeDefaultItemJustifyRightCss(i,l,20)}

${this.htmlMakerChSel.MakeDefaultButtonsCss()}
`.trim(),document.head.appendChild(r);const c=document.getElementById(this.parentName);this.htmlMakerChSel.copyCssToInlineStyle(`.${this.parentName}`,c)}}class Z{constructor(){this.cancel=!1}}class Bt{constructor(){this.uiName="",this.cancel=!1}}class O{constructor(){this.ch=new L,this.isEmpty=!0,this.TextMap=""}static toJsonText(t){const e=L.toJsonInst(t.ch);return JSON.stringify(e,null,2)}static toJsonInst(t){const e=new O;e.ch=L.toJsonInst(t.ch),e.isEmpty=t.isEmpty;const s=Object.fromEntries(t.details.TextMap);return e.TextMap=JSON.stringify(s,null,2),e}static fromJsonInst(t){const e=new et;e.ch=L.fromJsonInst(t.ch),e.isEmpty=t.isEmpty;const s=new Map(Object.entries(JSON.parse(t.TextMap)));return e.details.TextMap=s,e}}class v{static toJsonText(t){const e=v.toJsonInst(t);return JSON.stringify(e,null,2)}static toJsonInst(t){const e=new v;e.items=new Array;for(const s of t.items)e.items.push(O.toJsonInst(s));return e}static fromJsonInst(t){const e=new Y;e.items=new Array;for(const s of t.items)e.items.push(O.fromJsonInst(s));return e}}const H=new R,Q=H.isWebRunning,p=new Mt;await p.loadZip(H.imageZip);const C=new ot;H.setUser(H.user1Home);const Ht=H.currentUserHome,Rt=`${Ht}chListFile.json`;async function At(){async function m(){return await new st().LoadList(Rt)}const t=await m();t.uiInfo.name="charListArea",t.uiInfo.left="300",t.uiInfo.top="100";const e=await t.toHTML(p);if(Q){const s="キャラ選択",n=t.createSelectorBox(s,"charListArea",e);t.addEventHandlers(n),t.addItemEventHandlers(o=>{console.log(`selected ch = ${o.ch.name}`)}),t.enableLazyImages(p),n.show();const i=new A;i.setAsDlg(n,s),C.add(i)}return t}const ht=await At();async function yt(m,t,e,s){const n=new Ft;n.Init(),n.formation.uiInfo.name=m,n.formation.uiInfo.left=`${t}`,n.formation.uiInfo.top=`${e}`;const i=n.formation.uiInfo.name,o=await n.toHTML(i,p),a=n.toGridHTML();if(Q){const l=n.createFormationBox(s,i,o,a);n.addEventHandlers(l),n.addItemEventkHandlers(c=>{console.log(`selected ch = ${c.item.ch.name}`)},async c=>{c.selectCh=ht.selectedCh,c.selectedImg=await p.getImageUrl(ht.selectedCh.iconFileName),c.item.isEmpty=!1,console.log(`selected ch = ${c.selectCh.name}`);const d=_.HiLv;f.combatPairs.get(d),c.uiName===V&&await f.replaceChar(d,N.Player,c.item,c.selectCh,p),c.uiName===G&&await f.replaceChar(d,N.Enemy,c.item,c.selectCh,p),await f.replaceJudge(p)},async c=>{c.selectedImg=await p.getImageUrl(c.selectedImg),c.item.isEmpty=!0,console.log(`empty ch = ${c.selectedImg}`);const d=_.HiLv;f.combatPairs.get(d),c.uiName===V&&await f.replaceChar(d,N.Player,c.item,c.selectCh,p),c.uiName===G&&await f.replaceChar(d,N.Enemy,c.item,c.selectCh,p),await f.replaceJudge(p)},async c=>{const d=c.scoreConfigSet.toInst(c.values),u=at.calcScoreAdvanced(d,"chLvId+chArId*chHpId");console.log(`uiName = ${c.uiName}, calcRes = ${u}`);const g=$t();console.log(g),await g.replaceJudge(p)}),n.enableLazyImages(p),l.show();const r=new A;r.setAsDlg(l,s),C.add(r)}return n}const V="playerForm",G="enemyForm",lt=await yt(V,100,100,"自編成"),rt=await yt(G,100,200,"敵編成");async function Jt(m,t,e,s){f.uiInfo.name=m,f.uiInfo.left=`${t}`,f.uiInfo.top=`${e}`;const n=await f.toHTML("combatTable",p),i=f.createCombatBox(s,m,n);f.enableLazyImages(p),await f.replaceJudge(p),i.show();const o=new A;o.setAsDlg(i,s),C.add(o)}const f=$t();await Jt("combatForm",100,300,"対戦予想");const Ct="保存";{const m=new A;m.setAsMenu(Ct),C.add(m)}const It="復帰";{const m=new A;m.setAsMenu(It),C.add(m)}const Ut=await C.toHTML("dockForm",p);if(Q){const m=C.createDockBox("dockForm",Ut);C.addItemClickHandlers(async t=>{if(t.item.dlgParent===null){t.cancel=!0;return}console.log(`selected item = [${t.item.toolTip}::${t.item.dockType}]`),t.item.isUIType&&(new h().MoveHiestLayer(t.item.dlgParent),t.item.dlgParent.hidden&&(t.item.dlgParent.hidden=!1)),t.item.isMenuType&&(t.item.toolTip===Ct&&await zt(),t.item.toolTip===It&&await jt(async e=>{if(console.log(`[loadedResult] ${e}`),e!==B.Success)return;const s=v.fromJsonInst(W),n=v.fromJsonInst(q);W=null,q=null,await lt.Setup(s,p),await rt.Setup(n,p)}))}),C.enableLazyImages(p),m.show()}const bt="playerForm.json",wt="enemyForm.json",Nt="dockForm.json";async function zt(){C.InitZOrder(J);const m=v.toJsonText(lt.formation),t=v.toJsonText(rt.formation),e=j.toJsonText(C),s=new window.JSZip;s.file(bt,m),s.file(wt,t),s.file(Nt,e);const n=await s.generateAsync({type:"blob"}),i="gameConfig.zip",o=URL.createObjectURL(n),a=document.createElement("a");a.href=o,a.download=i,a.click(),URL.revokeObjectURL(o),console.log("saved!")}let ut=null,W=null,q=null;const B={Unknown:"Unknown",Success:"Success",Fail:"Fail",Cancel:"Cancel"};async function jt(m){const t=document.createElement("input");return t.type="file",t.accept=".zip",t.addEventListener("cancel",()=>(console.log("Cancelled."),B.Cancel)),t.addEventListener("change",async()=>{if(t.files.length==1){console.log("File selected: ",t.files[0].name);const s=await t.files[0].arrayBuffer(),i=await new window.JSZip().loadAsync(s);async function o(l){const r=i.file(l);if(r){const c=await r.async("string"),d=JSON.parse(c);return console.log(d),d}}{const l=await o(Nt);l&&(ut=l)}{const l=await o(bt);l&&(W=l)}{const l=await o(wt);l&&(q=l)}const a=ut!==null&&W!==null&&q!==null?B.Success:B.Fail;m(a)}}),t.click(),B.Unknown}const J=new h;Q&&(J.AddDialogs(),J.AssignIndexies(),C.InitZOrder(J));function pt(m){const t=new it,e=new nt,s=m.formation,n=m.scoreConfigSet;s.uiInfo.name,s.uiInfo.name;for(const i of s.items){const o=n.toInst(i.values),a=at.calcScoreAdvanced(o,"chLvId+chArId*chHpId");e.Add(new ft(i.ch.id,i.ch.name,i.isEmpty,a))}return t.Add(e),t.debug(),t}function $t(){const m=new xt,t=pt(lt),e=pt(rt),s=new tt;s.setScoreItems(t.groupRows[0].columns),s.boost=100;const n=new tt;n.setScoreItems(e.groupRows[0].columns),n.boost=100;const i=new vt;i.setPlayer(s),i.setEnemy(n),m.setPair(_.HiLv,i),m.calcCombatScore();for(const[o,a]of m.combatPairs){const l=a.judge(b.None);console.log(`judge=[${l}]`)}return m}

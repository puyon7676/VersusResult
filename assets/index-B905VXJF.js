(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=e(n);fetch(n.href,i)}})();class A{constructor(){this.imageHome="./Image/",this.user1Home="./User1/",this.user2Home="./User2/",this.currentUserHome="",this.imageZip="./Image.zip",this.nodeToolsImportFilename="./nodeTools.js"}setUser(t){this.currentUserHome=t}get isWebRunning(){return typeof document>"u"?(console.log("please run web env!"),!1):!0}loadJson(t){return this._loadJson(t)}async _loadJson(t){if(this.isWebRunning)return await(await fetch(t)).json();{const{loadJsonNode:e}=await import(this.nodeToolsImportFilename);return e(t)}}async saveJson(t,e){const s=JSON.stringify(e);if(this.isWebRunning){const n=new Blob([s],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=t,o.click()}else{const{saveJsonNode:n}=await import(this.nodeToolsImportFilename);return n(t,e)}}async loadBinFile(t){if(this.isWebRunning)return await(await fetch(t)).blob();{const{readBinNode:e}=await import(this.nodeToolsImportFilename);return e(t)}}}class Mt{constructor(){this.imageHome="",this.cache=new Map}async loadZip(t){const e=new A;this.imageHome=e.imageHome.substring(2);const s=await e.loadBinFile(t);if(e.isWebRunning)this.zip=await window.JSZip.loadAsync(s);else{const{loadZipNode:n}=await import(e.nodeToolsImportFilename);this.zip=await n(s)}}async getImageUrl(t){if(this.cache.has(t))return this.cache.get(t);const e=`${this.imageHome}${t}`,s=this.zip.file(e);if(!s)return console.error("[getImageUrl] ファイルがありません: "+t),"";const n=await s.async("blob"),i=URL.createObjectURL(n);return this.cache.set(t,i),i}dispose(){for(const t of this.cache.values())URL.revokeObjectURL(t);this.cache.clear()}}class ht{constructor(){this.cancel=!1,this.selectedValue=""}}const C={Img:"Img",Label:"Label",LabelRO:"LabelRO",Combo:"Combo",Plain:"Plain"};class $t{constructor(){this.selectedItem="",this.selectionPair=[]}}class kt{constructor(){this.itemType=C.Img,this.label="",this.innerHTML=""}}class Lt{constructor(){this.imgWidth=100,this.imgHeight=100,this.alt="",this.using=new kt}setLabel(t,e){this.using.itemType=e?C.Label:C.LabelRO,this.using.label=t}setCombo(t){this.using.itemType=C.Combo,this.using.combo=t}setPlain(t){this.using.itemType=C.Plain,this.using.innerHTML=t}}class Tt{constructor(){this.name="",this.id="",this.imgName="",this.imgSrc="",this.imgFile="",this.toolTip="",this.option=new Lt}}class S{constructor(){this.props=new Tt}ToHTML(t){let e="",s=`<div class="overlay" title="${t.toolTip}"></div>`;switch(t.option.using.itemType){case C.Label:e=`
<span class="${t.imgName}" data-readonly="false">${t.option.using.label}</span>
`.trim();break;case C.LabelRO:e=`
<span class="${t.imgName}" data-readonly="true">${t.option.using.label}</span>
`.trim(),s="";break;case C.Plain:e=`
${t.option.using.innerHTML}
`.trim(),s="";break;case C.Combo:if(this.props.option.using.combo===void 0)return"";const n=this.props.option.using.combo;if(n.selectionPair===void 0||n.selectionPair.length<=0)return"";let i="";for(const a of n.selectionPair){let[r,c]=a.split("/");c=c.trim();let m="";n.selectedItem===c&&(m=" selected");const d=`
<option value="${c}"${m}>${r}</option>
`.trim();i+=d}e=`
<select class="${t.imgName}" alt="${t.option.alt}">
  ${i}
</select>
`.trim(),s="";break;case C.Img:let o="";t.imgSrc===""?o=`src="" data-filename="${t.imgFile}"`:o=`src="${t.imgSrc}"`,e=`
<img class="${t.imgName}" ${o} alt="${t.option.alt}">
`.trim();break}return`
  ${e}
  ${s}
`.trim()}MakeSelectableHTML(){return`
<div class="${this.props.name}" item-id="${this.props.id}">
${this.ToHTML(this.props)}
</div>
`.trim()}}class B{constructor(){this._defaultButtonsName="dialog-buttons",this._defaultToolButtonsName="dialog-tool-btns",this.itemList=new Array}add(t){this.itemList.push(t)}get DefaultBlueColor(){return"#86aef7e6"}get DefaultYellowColor(){return"#f7eb86e6"}get DefaultBorderColor(){return"#2c3e50ff"}MakeDefaultDialogParentCss(t,e,s,n=0){return`
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
`.trim()}MakeSystematicSelectionCss(t){return`
.${t} .overlay {
position: absolute;
inset: 0;
background: rgba(128, 128, 128, 0.4); /* 選択時の色 */
opacity: 0;
transition: opacity 0.2s;
}
.${t}.selected .overlay {
opacity: 1;
}
`.trim()}MakeDefaultSelectionCss(t){return`
.${t} .overlay {
position: absolute;
inset: 0;
background: rgba(0, 128, 255, 0.4); /* 選択時の色 */
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
}`.trim()}initObserver(t,e){const s=document.getElementById(t);if(!s)return;const n=a=>{a.forEach(r=>{if(r.isIntersecting){const c=r.target,m=c.dataset.filename;console.log("見えた！:",c.dataset.filename),(m&&c.src===""||c.src.startsWith(window.location.origin))&&e.getImageUrl(m).then(d=>{c.src=d,this.observer.unobserve(c)})}})},i={root:s,rootMargin:"0px",threshold:.1};this.observer=new IntersectionObserver(n,i),s.querySelectorAll("img[data-filename]").forEach(a=>this.observer.observe(a)),console.log("[initObserver] enabled!")}enableEvents(t){const e=`.${t}`;document.querySelectorAll(`${e}`).forEach(n=>{const i=n.querySelectorAll("img");i.length>=1&&(i[0],this.addButtonEvent(e,n));const o=n.querySelectorAll("span");o.length>=1&&o[0]?.dataset.readonly=="false"&&this.addButtonEvent(e,n);const a=n.querySelectorAll("select");a.length>=1&&(a[0],this.addSelectEvent(e,n))})}addButtonEvent(t,e){e.addEventListener("click",()=>{document.querySelectorAll(`${t}.selected`).forEach(n=>n.classList.remove("selected")),e.classList.add("selected");const s=e.getAttribute("item-id");if(s){const n=this.itemList.find(i=>`${i.props.id}`===s);if(n){if(n.props.option.onSelect){const i=new ht;i.item=n,n.props.option.onSelect(i)}this.selectedCh=n}}})}addSelectEvent(t,e){e.addEventListener("change",s=>{const n=s.target,i=e.getAttribute("item-id");if(i){const o=this.itemList.find(a=>`${a.props.id}`===i);if(o){if(o.props.option.onSelect){const a=new ht;a.item=o,a.selectedValue=n.value,o.props.option.onSelect(a)}this.selectedCh=o}}})}GetIdByIndex(t){return this.itemList[t].props.id}UnselectAll(t){const e=`.${t}`;document.querySelectorAll(`${e}.selected`).forEach(s=>s.classList.remove("selected"))}SelectByID(t,e){const s=this.FindByID(t,e);if(s){s.classList.add("selected");const n=s.getAttribute("item-id");if(n){const i=this.itemList.find(o=>`${o.props.id}`===n);i&&(this.selectedCh=i)}return s}return null}FindByID(t,e){const s=`.${t}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===e)return i}return null}FindImgByID(t,e){const s=`.${t}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===e){const a=i.querySelectorAll("img");return a.length>=1?a[0]:null}}return null}ReplaceImg(t,e,s){const n=this.FindImgByID(t,e);return n===null?null:(n.dataset.filename,n.src=s,n)}copyCssToInlineStyle(t,e){for(const s of document.styleSheets){let n;try{n=s.cssRules}catch{continue}for(const i of n)if(i instanceof CSSStyleRule&&i.selectorText===t){const o=i.style;for(let a=0;a<o.length;a++){const r=o[a],c=o.getPropertyValue(r);e.style.setProperty(r,c),console.log(`[copyCssToInlineStyle] copied [${r}]=[${c}]`)}return}}}}const x={Hide:"Hide",MoveLowest:"MoveLowest"};class D{constructor(){this.dlgName="",this.B3Type=x.MoveLowest,this.nMove=4,this.initLeft=0,this.initTop=0,this.moveLeft=0,this.moveTop=0}NewDialog(t,e,s=x.MoveLowest){this.dlgName=e,this.B3Type=s;const n=document.createElement("dialog");n.id=e,n.className=e;const i=document.getElementById(t);return i.appendChild(n),this.dlgParent=i,this.dlg=n,n}SetContent(t,e){const s=this.dlg;let n="";this.B3Type===x.MoveLowest&&(n=`<button id="${this.toolNameB3}">[_]</button>`);const i=`
<button id="${this.toolNameB1}">[→]</button>
<button id="${this.toolNameB2}">[↓]</button>
${n}
`,o=document.createElement("div");o.innerHTML=i,s.innerHTML=e;const a=document.getElementById(t);a.appendChild(o),a.appendChild(s)}EnableEventHandlers(){const t=this.dlgParent.style.left,e=this.dlgParent.style.top;this.initLeft=parseInt(t.substring(0,t.length-2)),this.initTop=parseInt(e.substring(0,e.length-2)),this.moveLeft=0,this.moveTop=0,document.getElementById(`${this.toolNameB1}`).onclick=async()=>{this.dlgParent!==void 0&&(this.moveLeft++,this.moveLeft>=this.nMove&&(this.moveLeft=0),this.dlgParent.style.left=`${this.initLeft+this.moveLeft*100}px`)},document.getElementById(`${this.toolNameB2}`).onclick=async()=>{this.dlgParent!==void 0&&(this.moveTop++,this.moveTop>=this.nMove&&(this.moveTop=0),this.dlgParent.style.top=`${this.initTop+this.moveTop*100}px`)},this.B3Type===x.MoveLowest&&(document.getElementById(`${this.toolNameB3}`).onclick=async()=>{if(this.dlgParent===void 0)return;new h().MoveLowestLayer(this.dlgParent)})}static GetDialogInfo(t){const e=this.FindDialogParent(t);if(e===null)return null;const s=e.querySelector("dialog");if(s===null)return null;const n=new st,i=s.clientWidth,o=s.clientHeight;return n.name=t,n.left=e.style.left,n.top=e.style.top,n.width=`${i}px`,n.height=`${o}px`,n}static SetDialogInfo(t){const e=this.FindDialogParent(t.name);if(e===null)return!1;const s=e.querySelector("dialog");return s===null?!1:(e.style.left=t.left,e.style.top=t.top,s.style.width=t.width,s.style.height=t.height,!0)}static FindDialogParent(t){const e=document.getElementById(t);return e??null}get toolNameB1(){return`${this.dlgName}-dlg-tool-b1`}get toolNameB2(){return`${this.dlgName}-dlg-tool-b2`}get toolNameB3(){return`${this.dlgName}-dlg-tool-b3`}}class st{constructor(){this.name="",this.left="",this.top="",this.width="",this.height=""}copyTo(t){t.name=this.name,t.left=this.left,t.top=this.top,t.width=this.width,t.height=this.height}}class h{add(t){h.dlgElems.push(t)}AddDialogs(){h.dlgElems=new Array;const t=document.querySelectorAll("div");for(const e of t)e.style.zIndex!==""&&(parseInt(e.style.zIndex)>=h.ignoreIndex||e.querySelector("dialog")&&(console.log(`${e.id} added!`),this.add(e)))}AssignIndexies(){let t=h.dlgElems.length-1;for(const e of h.dlgElems)e.style.zIndex=`${t}`,t--}MoveLowestLayer(t){h.dlgElems.length;for(const e of h.dlgElems)if(e.id===t.id)e.style.zIndex="0";else{const s=e.style.zIndex;e.style.zIndex=`${parseInt(s)+1}`}}MoveHiestLayer(t){h.dlgElems.length;let e=-1;for(const s of h.dlgElems){const n=parseInt(s.style.zIndex);n>=h.ignoreIndex||n>e&&(e=n)}for(const s of h.dlgElems)if(s.id===t.id){s.style.zIndex=`${e}`;break}for(const s of h.dlgElems)if(s.id!==t.id){if(parseInt(s.style.zIndex)>=h.ignoreIndex)continue;e--,s.style.zIndex=`${e}`}}FindByName(t){const e=h.dlgElems.find(s=>s.id===t);return e||null}async ForEachAsync(t){for(const e of h.dlgElems)e.parentNode!==null&&await t(e.id)}ReOrder(){h.dlgElems.sort((t,e)=>{const s=t.style.zIndex,n=e.style.zIndex;if(s===""||n==="")throw new Error("z-index が未設定の要素が混入しています");return parseInt(e.style.zIndex)-parseInt(t.style.zIndex)})}}h.ignoreIndex=1e3;const pt={None:"None"};class X{get iconFileName(){return this.id===null&&!Number.isNaN(this.id)?`${this.name}_${this.idAsText}.png`:`${this.name}_${this.id}.png`}constructor(t=0,e=""){this.ns=pt.None,this.id=0,this.name="",this.contentURL="",this.iconURL="",this.idAsText="",this.idAttributeForHTML="",this.id=t,this.name=e}parseFromImgName(t){let e=t.indexOf("_");if(e>=0){const s=t.substring(0,e);let n=t.substring(e+1);if(e=n.indexOf("."),e>=0)return n=n.substring(0,e),this.id=Number.parseInt(n),this.name=s,this.idAsText=Number.isNaN(this.id)?n:"",!0}return!1}}class nt{constructor(){this.uiInfo=new st,this.parentName=""}MakeList(){}async LoadList(t){const n=(await new A().loadJson(t)).map(o=>Object.assign(new X,o)),i=new nt;return i.chList=n,this.uiInfo.copyTo(i.uiInfo),i}async toHTML(t){if(!this.chList)return"";this.htmlMaker=new B;let e=0;for(const s of this.chList){e++;const n=`chuid${e}`;s.idAttributeForHTML=n;const i="",o=new S;o.props.name=this.itemCssClassName(),o.props.id=n,o.props.imgName=this.imgCssClassName(),o.props.imgSrc=i,o.props.imgFile=s.iconFileName,o.props.toolTip=s.name,o.props.option.onSelect=a=>{this.setSelectedItem(a.item.props.id)},this.htmlMaker.add(o)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createSelectorBox(t,e){this.parentName=t;const s=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="char-dlg-apply">選択</button>
<button id="char-dlg-close">閉じる</button>
`),n=`<div class="char-dlg-content">
    ${e}
    <label id="char-dlg-chinfo">未選択</label>
    ${s}
</div>`,i=new D,o=i.NewDialog(t,this.dlgCssClassName());return i.SetContent(t,n),this.applyCss(),i.EnableEventHandlers(),o}addEventHandlers(t){document.getElementById("char-dlg-close").onclick=()=>t.close(),document.getElementById("char-dlg-apply").onclick=()=>{if(this.onApply!==void 0){const e=new St;e.ch=this.selectedCh,this.onApply(e),e.cancel||t.close()}}}addItemClickHandlers(t){this.onApply=t;const e=this.htmlMaker.GetIdByIndex(0);this.htmlMaker.SelectByID(this.itemCssClassName(),e),this.htmlMaker.enableEvents(this.itemCssClassName()),this.setSelectedItem(e)}setSelectedItem(t){const e=this.chList.find(s=>t===s.idAttributeForHTML);e&&(document.getElementById("char-dlg-chinfo").textContent=e.name,this.selectedCh=e)}enableLazyImages(t){this.htmlMaker.initObserver(this.dlgCssClassName(),t)}itemCssClassName(){return"char-item"}imgCssClassName(){return"base"}listCssClassName(){return"char-list"}dlgCssClassName(){return"char-dlg"}applyCss(){const t=this.listCssClassName(),e=this.itemCssClassName(),s=this.imgCssClassName(),n=parseInt(this.uiInfo.left),i=parseInt(this.uiInfo.top),o=document.createElement("style");o.textContent=`
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
`.trim(),document.head.appendChild(o);const a=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,a)}}class St{constructor(){this.cancel=!1}}class M{constructor(){this.ns=pt.None,this.id=0,this.name="",this.contentURL="",this.iconURL=""}static toJsonText(t){const e=M.toJsonInst(t);return JSON.stringify(e,null,2)}static toJsonInst(t){const e=new M;return e.ns=t.ns,e.id=t.id,e.name=t.name,e.contentURL=t.contentURL,e.iconURL=t.iconURL,e}static fromJsonInst(t){const e=new X;return e.ns=t.ns,e.id=t.id,e.name=t.name,e.contentURL=t.contentURL,e.iconURL=t.iconURL,e}}class ft{constructor(t=0,e="",s=0){this.ch=new X,this.score=0,this.ch.id=t,this.ch.name=e,this.score=s}}class it{Add(t){if(t===void 0){console.log("[VersusGroupRow::Add] scItem === undefined");return}this.columns===void 0&&(this.columns=[]),this.columns.push(t)}Count(){return this.columns.length}debug(){if(this.columns===void 0){console.log("[VersusGroupRow::debug] this.columns === undefined");return}for(const t of this.columns)console.log(`[${t.ch.name}]	score=[${t.score}]`)}}it.defNumColumn=5;class ot{Add(t){this.groupRows===void 0&&(this.groupRows=[]),this.groupRows.push(t)}Count(){return this.groupRows.length}debug(){if(this.groupRows===void 0)console.log("this.groupRows === undefined");else for(const t of this.groupRows)t.debug()}async loadJson(t){const n=(await new A().loadJson(t)).groupRows.map(o=>Object.assign(new it,o)),i=new ot;return i.groupRows=n,i}}const b={None:"None",Player:"Player",Enemy:"Enemy"},P={None:"None",Attr:"Attr",Role:"Role"},E={HiLv:"HiLv"},p={Likely:"Likely",Uncertain:"Uncertain",Wishful:"Wishful"};class z{}z.Likely=.9;z.Uncertain=.64;class tt{constructor(){this.scoreItems=[],this.formationType=b.None,this.boost=0}get imgPrefix(){return this.formationType===b.Player?"ftPlayer":"ftEnemy"}setScoreItems(t){if(t!==void 0){this.scoreItems=new Array;for(const e of t){const s=new ft(e.ch.id,e.ch.name,e.score);this.scoreItems.push(s)}}}async toCharHTML(t,e){const s=await t.getImageUrl(e.ch.iconFileName);return`
<img class=${this.charCssClassName()}
  src="${s}"
  width="100"
  title="${e.ch.name}
score=${e.score}">
`.trim()}async toJudgeHTML(t,e){let s=null;switch(e){case p.Likely:s=await t.getImageUrl("win.png");break;case p.Uncertain:s=await t.getImageUrl("even.png");break;case p.Wishful:s=await t.getImageUrl("lost.png");break;default:return""}return`<img class=${this.judgeCssClassName()} src="${s}" width="48">`}charCssClassName(){return"combat-char"}judgeCssClassName(){return"combat-judge"}get combatScore(){if(this.scoreItems===void 0)return 0;const t=this.scoreItems.reduce((s,n)=>s+n.score,0),e=this.boost===0?1:this.boost;return Math.ceil(t*e/100)}}class vt{constructor(){this.hasCombo=!1,this.winRate=new Map}setPlayer(t){t.formationType=b.Player,this.player=t}setEnemy(t){t.formationType=b.Enemy,this.enemy=t}judge(t){const s=this.winRate.get(t);return s>=z.Likely?p.Likely:s>=z.Uncertain?p.Uncertain:p.Wishful}judgeForEnemy(t){switch(t){case p.Likely:return p.Wishful;case p.Uncertain:return p.Uncertain;case p.Wishful:return p.Likely}}}class xt{constructor(){this.combatPairs=new Map}setPair(t,e){this.combatPairs.set(t,e)}calcCombatScore(){for(const[t,e]of this.combatPairs){if(e.player===void 0||e.enemy===void 0)continue;const s=[P.None,P.Attr,P.Role];for(const n of s){let i=e.player.combatScore,o=e.enemy.combatScore;e.winRate.set(n,o!==0?i/o:1)}}}async replaceChar(t,e,s,n,i){const o=this.combatPairs.get(t);let a;if(e===b.Player?a=o?.player:e===b.Enemy&&(a=o?.enemy),a===void 0)return!1;const c=s.ch.idAttributeForHTML.substring("chuid".length);let m=parseInt(c);if(m<=0)return!1;const d=m;m--,a=a;const g=`${a.imgPrefix}${d}`,y=a.scoreItems[m].ch;y.id=n.id,y.name=n.name;const R=y.iconFileName,Z=await i.getImageUrl(R),T=new B,U=this.outerCssClassName();return T.ReplaceImg(U,g,Z),!0}processResult(t,e,s){async function n(o,a){const r=e(a.formationType),c=await a.toJudgeHTML(t,o),m=a.imgPrefix;let d=0;for(const L of a.scoreItems){d++;const g=await a.toCharHTML(t,L),y=`
<div class=${i} item-id="${m}${d}">
    ${g}
    ${c}
</div>
`.trim();s(r,y)}}const i=this.outerCssClassName();for(const[o,a]of this.combatPairs){const r=a.judge(P.None),c=a.judgeForEnemy(r);n(r,a.player),n(c,a.enemy)}}outerCssClassName(){return"combat-outer"}applyCss(){const t=new tt,e=`.${this.outerCssClassName()}`,s=`.${t.charCssClassName()}`,n=`.${t.judgeCssClassName()}`,i=document.createElement("style");i.textContent=`
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
`.trim(),document.head.appendChild(i)}}const w={None:"None",UI:"UI",Menu:"Menu"};class Y{constructor(){this.dockType=w.None,this.iconFileName="",this.toolTip="",this.idAttributeForHTML=""}setAsDlg(t,e){this.dockType=w.UI,this.dlg=t,this.toolTip=e}setAsMenu(t){this.dockType=w.Menu,this.toolTip=t}get isUIType(){return this.dockType==w.UI}get isMenuType(){return this.dockType==w.Menu}ToggleStatus(){this.dlg===void 0||this.dlg===null||(this.dlg.hidden=!this.dlg.hidden)}}class at{constructor(){this.items=new Array,this.parentName="",this.listName=""}add(t){return t.dockType==w.UI&&(t.dlgParent=t.dlg.parentElement),this.items.push(t),!0}async toHTML(t,e){if(!this.items)return"";this.listName=t,this.htmlMaker=new B;let s=0;for(const n of this.items){s++;const i=`dock-uid${s}`;n.idAttributeForHTML=i;const o="",a=n.iconFileName,r=new S;r.props.name=this.itemCssClassName(),r.props.id=i,r.props.imgName=this.imgCssClassName(),r.props.imgSrc=o,r.props.imgFile=a,r.props.toolTip=n.toolTip,r.props.option.setLabel(n.toolTip,!0),r.props.option.onSelect=c=>{const m=this.items.find(d=>c.item.props.id===d.idAttributeForHTML);if(m&&(this.selectedItem=m,this.onApply!==void 0)){const d=new Pt;d.item=this.selectedItem,this.onApply(d)}},this.htmlMaker.add(r)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createDockBox(t,e){this.parentName=t;const s=`<div class="${this.parentName}-dlg-content">
    ${e}
</div>`,n=new D,i=n.NewDialog(t,this.dlgCssClassName(),x.Hide);return n.SetContent(t,s),this.applyCss(),n.EnableEventHandlers(),i}addItemClickHandlers(t){this.onApply=t,this.htmlMaker.SelectByID(this.itemCssClassName(),this.htmlMaker.GetIdByIndex(0)),this.htmlMaker.enableEvents(this.itemCssClassName())}enableLazyImages(t){this.htmlMaker.initObserver(this.dlgCssClassName(),t)}applyCss(){const t=this.listCssClassName(),e=this.itemCssClassName(),s=this.imgCssClassName(),n=48,i=this.items.length,o=document.createElement("style");o.textContent=`
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
`.trim(),document.head.appendChild(o);const a=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,a)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}listCssClassName(){return`${this.listName}-list`}dlgCssClassName(){return`${this.parentName}-dlg`}static GetDialogInfo(t){return D.GetDialogInfo(t)}static SetDialogInfo(t){return D.SetDialogInfo(t)}async InitZOrder(t){await t.ForEachAsync(e=>{const s=at.GetDialogInfo(e),n=t.FindByName(e);return s!==null&&(s.zindex=n!==null?n.style.zIndex:""),console.log(s),!0})}}class Pt{constructor(){this.cancel=!1}}class O{constructor(){this.dockType=w.None,this.iconFileName="",this.toolTip="",this.dlgName="",this.hidden=!1,this.zIndex="",this.topPx="",this.leftPx=""}static toJsonText(t){const e=O.toJsonInst(t);return JSON.stringify(e,null,2)}static toJsonInst(t){const e=new O;return e.dockType=t.dockType,e.iconFileName=t.iconFileName,e.toolTip=t.toolTip,t.isUIType&&(e.dlgName=t.dlgParent.id,e.hidden=t.dlgParent.hidden,e.zIndex=t.dlgParent.style.zIndex,e.leftPx=t.dlgParent.style.left,e.topPx=t.dlgParent.style.top),e}}class j{static toJsonText(t){const e=j.toJsonInst(t);return JSON.stringify(e,null,2)}static toJsonInst(t){const e=new j;e.items=new Array;for(const s of t.items)e.items.push(O.toJsonInst(s));return e}restore(t,e){for(const s of this.items){const n=t.items.find(i=>i.dlg.id===s.dlgName);n&&(n.dockType=s.dockType,n.iconFileName=s.iconFileName,n.toolTip=s.toolTip,n.isUIType&&(n.dlgParent.hidden=s.hidden,n.dlgParent.style.zIndex=s.zIndex,n.dlgParent.style.left=s.leftPx,n.dlgParent.style.top=s.topPx))}e.ReOrder()}}class Et{constructor(){this.title="",this.key="",this.selectionPair=[],this.selectedVal="",this.initScoreVal=0,this.mulScoreVal=0}get stdScore(){const t=this.selectedVal.length>=1?this.selectedVal:"1",e=parseInt(t);return this.initScoreVal+e*this.mulScoreVal}}class lt{constructor(){this.items=new Array}makeDemoLvText(t){let e="";for(let s=1;s<=100;s++)e+=`"${t}${s}/${s}",`;return e=e.substring(0,e.length-1),e}load(){const t=this.makeDemoLvText("Lv"),e=this.makeDemoLvText("Lv"),s=this.makeDemoLvText(""),n=`
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
`,o=JSON.parse(n).map(a=>Object.assign(new Et,a));this.items=o}save(){console.log(JSON.stringify(this,null,2))}static calcScore(t,e){const s=e.split("+");let n=0;for(const i of s){const o=i.trim();if(o.endsWith("()")){const a=o.slice(0,-2);typeof t[a]=="function"?n+=t[a]():console.warn(`関数 '${a}' が存在しません`)}else{const a=t[o];typeof a=="number"?n+=a:Array.isArray(a)?n+=a.reduce((r,c)=>r+c,0):console.warn(`プロパティ '${o}' が数値ではありません`)}}return n}static calcScoreAdvanced(t,e){const s=Object.keys(t),n=s.map(o=>t[o]);return new Function(...s,`return ${e};`)(...n)}toInst(t){return(n=>{const i=class{constructor(){n.forEach((o,a)=>{this[a]=o})}};return new i})(t)}}class Ft{constructor(){this.TextMap=new Map}set(t,e){const s=this.TextMap.has(t);return this.TextMap.set(t,e),s}remove(t){const e=this.TextMap.has(t);return e&&this.TextMap.delete(t),e}get count(){return this.TextMap.size}clear(){this.TextMap.clear()}forEach(t){if(t===void 0)return;let e=!1;for(const[s,n]of this.TextMap)if(e=t(s,n),e)break;return e}values(){const t=new Map;for(const[e,s]of this.TextMap)t.set(e,parseInt(s));return t}}class et{constructor(t=0,e=""){this.ch=new X,this.isEmpty=!0,this.details=new Ft,this.ch.id=t,this.ch.name=e}set(t,e){const s=this.details.TextMap.has(t);return this.details.set(t,e),s}get values(){return this.details.values()}}class Q{constructor(){this.nFormationItem=5,this.uiInfo=new st}async Load(t){const n=(await new A().loadJson(t)).map(o=>Object.assign(new et,o)),i=new Q;return i.items=n,i}Init(){this.items=new Array;for(let t=0;t<this.nFormationItem;t++)this.items.push(new et)}put(t,e){return this.items.find(n=>this.isExistCh(n,e))!==void 0?!1:(t.ch.ns=e.ns,t.ch.id=e.id,t.ch.name=e.name,t.isEmpty=!1,!0)}empty(t){const e=t.isEmpty;return t.isEmpty=!0,t.isEmpty!=e}isExistCh(t,e){return t.ch.name===e.name&&t.ch.id===e.id}equalsFormationItem(t,e){return t.ch.name===e.ch.name&&t.ch.id===e.ch.id}}class Dt{constructor(){this.emptyFile="plus.png",this.propItemNum=0,this.parentName="",this.listName=""}Init(){this.formation=new Q,this.formation.Init()}async Setup(t,e){if(!t)return;this.formation=t;let s=0;for(const n of this.formation.items){n.isEmpty?this.formation.empty(n):this.formation.put(n,n.ch),s++;const i=`chuid${s}`;n.ch.idAttributeForHTML=i;const o=n.isEmpty?this.emptyFile:n.ch.iconFileName,a=await e.getImageUrl(o);this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),n.ch.idAttributeForHTML,a)}}async toHTML(t,e){if(!this.formation)return"";this.listName=t,this.htmlMakerChSel=new B;let s=0;for(const n of this.formation.items){const i=n.ch;s++;const o=`chuid${s}`;i.idAttributeForHTML=o;const a="",r=n.isEmpty?this.emptyFile:i.iconFileName,c=new S;c.props.name=this.itemCssClassName(),c.props.id=o,c.props.imgName=this.imgCssClassName(),c.props.imgSrc=a,c.props.imgFile=r,c.props.toolTip=i.name,c.props.option.onSelect=m=>{console.log(`notifty id = ${m.item.props.id}`),this.setSelectedItem(m.item.props.id)},this.htmlMakerChSel.add(c)}return this.htmlMakerChSel.MakeScrollableList(this.listCssClassName())}toGridHTML(){this.htmlMakerProp=new B,this.initScoreSet(),this.propItemNum=this.scoreConfigSet.items.length;let t=0;for(const e of this.formation.items){e.ch,t++;for(const s of this.scoreConfigSet.items)this.makeChLvSelect(e,`${s.key}${t}`,s.title,s.selectionPair,s.selectedVal,this.htmlMakerProp),e.details.set(s.key,s.selectedVal)}return this.htmlMakerProp.MakeScrollableList(this.propCssClassName())}initScoreSet(){const t=new lt;t.load(),this.scoreConfigSet=t}makeChLvSelect(t,e,s,n,i,o){const a=new S;a.props.name=this.propItemCssClassName(),a.props.id=e,a.props.imgName=this.lblCssClassName(),a.props.option.setLabel(s,!1);const r=a.ToHTML(a.props),c=new S;c.props.name=this.propItemCssClassName(),c.props.id=e,c.props.imgName=this.lblCssClassName();const m=new $t;m.selectionPair=n,m.selectedItem=i,c.props.option.setCombo(m);const d=c.ToHTML(c.props);let L=`
${r}
${d}
`.trim();const g=new S;g.props.name=this.propItemCssClassName(),g.props.id=e,g.props.imgName=this.lblCssClassName(),g.props.option.setPlain(L),g.props.option.onSelect=y=>{console.log(`notifty id = ${y.item.props.id}`);const R=y.item.props.id;for(const Z of this.scoreConfigSet.items){const T=Z.key;let U=T.length;if(R.substring(0,U)===T){let N=parseInt(R.substring(U));if(N--,0<=N&&N<this.formation.items.length){if(this.formation.items[N].set(T,y.selectedValue),console.log(`valid index=[${N}], key=[${T}], value=[${y.selectedValue}]`),this.onPropChanged!==void 0){const mt=this.formation.items[N].values;this.scoreConfigSet.toInst(mt);const v=new Bt;v.uiName=this.parentName,v.item=this.formation.items[N],v.values=mt,v.scoreConfigSet=this.scoreConfigSet,this.onPropChanged(v)}}else console.log(`invalid index = ${N}`);break}}},o.add(g)}createFormationBox(t,e,s){this.parentName=t;const n=this.htmlMakerChSel.MakeDefaultToolButtonsHTML(`
<button id="${this.parentName}-dlg-tbput">キャラ配置</button>
<button id="${this.parentName}-dlg-tbempty">キャラ抹消</button>
`),i=this.htmlMakerChSel.MakeDefaultButtonsHTML(`
<button id="${this.parentName}-dlg-apply">確定</button>
<button id="${this.parentName}-dlg-close">閉じる</button>
`),o=`<div class="${this.parentName}-dlg-content">
    ${n}
    ${e}
    ${s}
    ${i}
</div>`,a=new D,r=a.NewDialog(t,this.dlgCssClassName());return a.SetContent(t,o),this.applyCss(),a.EnableEventHandlers(),r}addEventHandlers(t){document.getElementById(`${this.parentName}-dlg-close`).onclick=()=>t.close(),document.getElementById(`${this.parentName}-dlg-apply`).onclick=()=>{if(this.onApply!==void 0){const e=new _;e.item=this.selectedItem,this.onApply(e),e.cancel||t.close()}},document.getElementById(`${this.parentName}-dlg-tbput`).onclick=async()=>{if(this.onPut!==void 0){const e=new _;e.uiName=this.formation.uiInfo.name,e.item=this.selectedItem,await this.onPut(e),this.formation.put(this.selectedItem,e.selectCh),this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,e.selectedImg)}},document.getElementById(`${this.parentName}-dlg-tbempty`).onclick=async()=>{if(this.onEmpty!==void 0){const e=new _;e.uiName=this.formation.uiInfo.name,e.item=this.selectedItem,e.selectedImg=this.emptyFile,await this.onEmpty(e),this.formation.empty(this.selectedItem),this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,e.selectedImg)}}}addItemClickHandlers(t,e,s,n){this.onApply=t,this.onPut=e,this.onEmpty=s,this.onPropChanged=n;const i=this.htmlMakerChSel.GetIdByIndex(0);this.htmlMakerChSel.SelectByID(this.itemCssClassName(),i),this.htmlMakerChSel.enableEvents(this.itemCssClassName()),this.htmlMakerProp.enableEvents(this.propItemCssClassName()),this.setSelectedItem(i)}setSelectedItem(t){const e=this.formation.items.find(s=>t===s.ch.idAttributeForHTML);e&&(this.selectedItem=e)}enableLazyImages(t){this.htmlMakerChSel.initObserver(this.dlgCssClassName(),t)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}propCssClassName(){return`${this.listName}-prop`}propItemCssClassName(){return`${this.listName}-prop-item`}lblCssClassName(){return`${this.listName}-lbl`}listCssClassName(){return`${this.listName}-list`}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const t=this.listCssClassName(),e=this.itemCssClassName(),s=this.imgCssClassName(),n=this.propCssClassName(),i=this.propItemCssClassName();this.lblCssClassName();const o=parseInt(this.formation.uiInfo.left),a=parseInt(this.formation.uiInfo.top),r=100,c=document.createElement("style");c.textContent=`
${this.htmlMakerChSel.MakeDefaultDialogParentCss(this.parentName,o,a)}
${this.htmlMakerChSel.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.parentName}-dlg-content {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

${this.htmlMakerChSel.MakeDefaultScrollCss(this.parentName,500)}
${this.htmlMakerChSel.MakeDefaultGridColCss(t,r,5,r*5+16)}

${this.htmlMakerChSel.MakeDefaultItemimgCss(e,s,r,r)}
${this.htmlMakerChSel.MakeDefaultSelectionCss(e)}

/*
*/
${this.htmlMakerChSel.MakeDefaultGridRowCss(n,r,this.propItemNum,22)}
${this.htmlMakerChSel.MakeDefaultItemJustifyRightCss(i,r,20)}
span {
display: grid;
align-content: center;
}

${this.htmlMakerChSel.MakeDefaultButtonsCss()}
`.trim(),document.head.appendChild(c);const m=document.getElementById(this.parentName);this.htmlMakerChSel.copyCssToInlineStyle(`.${this.parentName}`,m)}}class _{constructor(){this.cancel=!1}}class Bt{constructor(){this.uiName="",this.cancel=!1}}class V{constructor(){this.ch=new M,this.isEmpty=!0,this.TextMap=""}static toJsonText(t){const e=M.toJsonInst(t.ch);return JSON.stringify(e,null,2)}static toJsonInst(t){const e=new V;e.ch=M.toJsonInst(t.ch),e.isEmpty=t.isEmpty;const s=Object.fromEntries(t.details.TextMap);return e.TextMap=JSON.stringify(s,null,2),e}static fromJsonInst(t){const e=new et;e.ch=M.fromJsonInst(t.ch),e.isEmpty=t.isEmpty;const s=new Map(Object.entries(JSON.parse(t.TextMap)));return e.details.TextMap=s,e}}class k{static toJsonText(t){const e=k.toJsonInst(t);return JSON.stringify(e,null,2)}static toJsonInst(t){const e=new k;e.items=new Array;for(const s of t.items)e.items.push(V.toJsonInst(s));return e}static fromJsonInst(t){const e=new Q;e.items=new Array;for(const s of t.items)e.items.push(V.fromJsonInst(s));return e}}const H=new A,$=H.isWebRunning,u=new Mt;await u.loadZip(H.imageZip);const f=new at;H.setUser(H.user1Home);const Ht=H.currentUserHome,At=`${Ht}chListFile.json`;async function Rt(){async function l(){return await new nt().LoadList(At)}const t=await l();t.uiInfo.name="charListArea",t.uiInfo.left="300",t.uiInfo.top="100";const e=await t.toHTML(u);if($){const s=t.createSelectorBox("charListArea",e);t.addEventHandlers(s),t.addItemClickHandlers(i=>{console.log(`selected ch = ${i.ch.name}`)}),t.enableLazyImages(u),s.show();const n=new Y;n.setAsDlg(s,"キャラ選択"),f.add(n)}return t}const dt=await Rt();async function gt(l,t,e,s){const n=new Dt;n.Init(),n.formation.uiInfo.name=l,n.formation.uiInfo.left=`${t}`,n.formation.uiInfo.top=`${e}`;const i=n.formation.uiInfo.name,o=await n.toHTML(i,u),a=n.toGridHTML();if($){const r=n.createFormationBox(i,o,a);n.addEventHandlers(r),n.addItemClickHandlers(m=>{console.log(`selected ch = ${m.item.ch.name}`)},async m=>{m.selectCh=dt.selectedCh,m.selectedImg=await u.getImageUrl(dt.selectedCh.iconFileName),console.log(`selected ch = ${m.selectCh.name}`),I.combatPairs.get(E.HiLv),m.uiName===G&&I.replaceChar(E.HiLv,b.Player,m.item,m.selectCh,u),m.uiName===q&&I.replaceChar(E.HiLv,b.Enemy,m.item,m.selectCh,u)},async m=>{m.selectedImg=await u.getImageUrl(m.selectedImg),console.log(`empty ch = ${m.selectedImg}`),I.combatPairs.get(E.HiLv),m.uiName,m.uiName},async m=>{const d=m.scoreConfigSet.toInst(m.values),L=lt.calcScoreAdvanced(d,"chLvId+chArId*chHpId");console.log(`uiName = ${m.uiName}, calcRes = ${L}`)}),n.enableLazyImages(u),r.show();const c=new Y;c.setAsDlg(r,s),f.add(c)}return n}const G="playerForm",q="enemyForm",rt=await gt(G,100,100,"自編成"),ct=await gt(q,100,200,"敵編成"),yt="保存";{const l=new Y;l.setAsMenu(yt),f.add(l)}const Ct="復帰";{const l=new Y;l.setAsMenu(Ct),f.add(l)}const Ut=await f.toHTML("dockForm",u);if($){const l=f.createDockBox("dockForm",Ut);f.addItemClickHandlers(async t=>{if(t.item.dlgParent===null){t.cancel=!0;return}console.log(`selected item = [${t.item.toolTip}::${t.item.dockType}]`),t.item.isUIType&&new h().MoveHiestLayer(t.item.dlgParent),t.item.isMenuType&&(t.item.toolTip===yt&&await Jt(),t.item.toolTip===Ct&&await zt(async e=>{if(console.log(`[loadedResult] ${e}`),e!==F.Success)return;const s=k.fromJsonInst(W),n=k.fromJsonInst(K);W=null,K=null,await rt.Setup(s,u),await ct.Setup(n,u)}))}),f.enableLazyImages(u),l.show()}const It="playerForm.json",bt="enemyForm.json",Nt="dockForm.json";async function Jt(){f.InitZOrder(J);const l=k.toJsonText(rt.formation),t=k.toJsonText(ct.formation),e=j.toJsonText(f),s=new window.JSZip;s.file(It,l),s.file(bt,t),s.file(Nt,e);const n=await s.generateAsync({type:"blob"}),i="gameConfig.zip",o=URL.createObjectURL(n),a=document.createElement("a");a.href=o,a.download=i,a.click(),URL.revokeObjectURL(o),console.log("saved!")}let ut=null,W=null,K=null;const F={Unknown:"Unknown",Success:"Success",Fail:"Fail",Cancel:"Cancel"};async function zt(l){const t=document.createElement("input");return t.type="file",t.accept=".zip",t.addEventListener("cancel",()=>(console.log("Cancelled."),F.Cancel)),t.addEventListener("change",async()=>{if(t.files.length==1){console.log("File selected: ",t.files[0].name);const s=await t.files[0].arrayBuffer(),i=await new window.JSZip().loadAsync(s);async function o(r){const c=i.file(r);if(c){const m=await c.async("string"),d=JSON.parse(m);return console.log(d),d}}{const r=await o(Nt);r&&(ut=r)}{const r=await o(It);r&&(W=r)}{const r=await o(bt);r&&(K=r)}const a=ut!==null&&W!==null&&K!==null?F.Success:F.Fail;l(a)}}),t.click(),F.Unknown}const J=new h;$&&(J.AddDialogs(),J.AssignIndexies(),f.InitZOrder(J));function wt(l){const t=new ot,e=new it,s=l.formation,n=l.scoreConfigSet;s.uiInfo.name,s.uiInfo.name;for(const i of s.items){const o=n.toInst(i.values),a=lt.calcScoreAdvanced(o,"chLvId+chArId*chHpId");e.Add(new ft(i.ch.id,i.ch.name,a))}return t.Add(e),t.debug(),t}const Ot=wt(rt),jt=wt(ct);function Vt(){const l=new tt;l.setScoreItems(Ot.groupRows[0].columns),l.boost=100;const t=new tt;t.setScoreItems(jt.groupRows[0].columns),t.boost=100;const e=new vt;e.setPlayer(l),e.setEnemy(t),I.setPair(E.HiLv,e),I.calcCombatScore();for(const[s,n]of I.combatPairs){const i=n.judge(P.None);console.log(`judge=[${i}]`)}}const I=new xt;Vt();function Gt(){$&&I.applyCss(),I.processResult(u,l=>{if(!$)return null;const t=l===b.Player?"playerTable":"enemyTable",e=document.querySelector(`#${t} tbody`),s=document.createElement("tr");return e?.appendChild(s),s},(l,t)=>{if(!$)return null;const e=document.createElement("td");return e.innerHTML=t,l.appendChild(e),e})}Gt();

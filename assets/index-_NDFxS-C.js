(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();class M{constructor(){this.imageHome="./Image/",this.user1Home="./User1/",this.user2Home="./User2/",this.currentUserHome="",this.imageZip="./Image.zip",this.nodeToolsImportFilename="./nodeTools.js"}setUser(t){this.currentUserHome=t}get isWebRunning(){return typeof document>"u"?(console.log("please run web env!"),!1):!0}loadJson(t){return this._loadJson(t)}async _loadJson(t){if(this.isWebRunning)return await(await fetch(t)).json();{const{loadJsonNode:e}=await import(this.nodeToolsImportFilename);return e(t)}}async saveJson(t,e){const s=JSON.stringify(e);if(this.isWebRunning){const i=new Blob([s],{type:"application/json"}),n=URL.createObjectURL(i),o=document.createElement("a");o.href=n,o.download=t,o.click()}else{const{saveJsonNode:i}=await import(this.nodeToolsImportFilename);return i(t,e)}}async loadBinFile(t){if(this.isWebRunning)return await(await fetch(t)).blob();{const{readBinNode:e}=await import(this.nodeToolsImportFilename);return e(t)}}}class V{constructor(){this.imageHome="",this.cache=new Map}async loadZip(t){const e=new M;this.imageHome=e.imageHome.substring(2);const s=await e.loadBinFile(t);if(e.isWebRunning)this.zip=await window.JSZip.loadAsync(s);else{const{loadZipNode:i}=await import(e.nodeToolsImportFilename);this.zip=await i(s)}}async getImageUrl(t){if(this.cache.has(t))return this.cache.get(t);const e=`${this.imageHome}${t}`,s=this.zip.file(e);if(!s)throw new Error("ファイルがありません: "+t);const i=await s.async("blob"),n=URL.createObjectURL(i);return this.cache.set(t,n),n}dispose(){for(const t of this.cache.values())URL.revokeObjectURL(t);this.cache.clear()}}class K{constructor(){this.cancel=!1}}const E={Img:"Img",Label:"Label"};class X{constructor(){this.itemType=E.Img,this.label=""}}class Y{constructor(){this.imgWidth=100,this.imgHeight=100,this.alt="",this.using=new X}setLabel(t){this.using.itemType=E.Label,this.using.label=t}}class Q{constructor(){this.name="",this.id="",this.imgName="",this.imgSrc="",this.imgFile="",this.toolTip="",this.option=new Y}}class D{constructor(){this.props=new Q}MakeSelectableItem(t){let e="";if(t.option.using.itemType==E.Label)e=`
<span class="${t.imgName}">${t.option.using.label}</span>
            `.trim();else{let s="";t.imgSrc===""?s=`src="" data-filename="${t.imgFile}"`:s=`src="${t.imgSrc}"`,e=`
<img class="${t.imgName}" ${s} alt="${t.option.alt}">
            `.trim()}return`
<div class="${t.name}" item-id="${t.id}">
    ${e}
    <div class="overlay" title="${t.toolTip}"></div>
</div>
`.trim()}MakeSelectableHTML(){return this.MakeSelectableItem(this.props)}}class F{constructor(){this._defaultButtonsName="dialog-buttons",this._defaultToolButtonsName="dialog-tool-btns",this.itemList=new Array}add(t){this.itemList.push(t)}get DefaultBlueColor(){return"#86aef7e6"}get DefaultYellowColor(){return"#f7eb86e6"}get DefaultBorderColor(){return"#2c3e50ff"}MakeDefaultDialogParentCss(t,e,s,i=0){return`
.${t} {
  position: fixed;
  inset: auto; /* ブラウザの中央寄せを無効化 */
  top: ${e}px;
  left: ${s}px;
  transform: translateX(-50%);
  z-index: ${i}
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
`.trim()}MakeDefaultNonScrollCss(t,e){return""}MakeDefaultGridCss(t,e,s,i){return`
.${t} {
display: grid;
grid-template-columns: repeat(${s}, ${e}px);
gap: 0px;
width: ${i}px;
}
`.trim()}MakeDefaultItemimgCss(t,e,s,i){return`
.${t} {
position: relative;
width: ${s}px;
height: ${i}px;
cursor: pointer;
}
.${t} .${e} {
width: 100%;
height: 100%;
}
`.trim()}MakeDefaultItemLabelCss(t,e,s,i){return`
.${t} {
position: relative;
width: ${s}px;
height: ${i}px;
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
}`.trim()}initObserver(t,e){const s=document.getElementById(t);if(!s)return;const i=l=>{l.forEach(c=>{if(c.isIntersecting){const r=c.target,g=r.dataset.filename;console.log("見えた！:",r.dataset.filename),(g&&r.src===""||r.src.startsWith(window.location.origin))&&e.getImageUrl(g).then(p=>{r.src=p,this.observer.unobserve(r)})}})},n={root:s,rootMargin:"0px",threshold:.1};this.observer=new IntersectionObserver(i,n),s.querySelectorAll("img[data-filename]").forEach(l=>this.observer.observe(l)),console.log("[initObserver] enabled!")}enableClick(t){const e=`.${t}`;document.querySelectorAll(`${e}`).forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(`${e}.selected`).forEach(o=>o.classList.remove("selected")),i.classList.add("selected");const n=i.getAttribute("item-id");if(n){const o=this.itemList.find(l=>`${l.props.id}`===n);if(o){if(o.props.option.onSelect){const l=new K;l.item=o,o.props.option.onSelect(l)}this.selectedCh=o}}})})}GetIdByIndex(t){return this.itemList[t].props.id}UnselectAll(t){const e=`.${t}`;document.querySelectorAll(`${e}.selected`).forEach(s=>s.classList.remove("selected"))}SelectByID(t,e){const s=this.FindByID(t,e);if(s){s.classList.add("selected");const i=s.getAttribute("item-id");if(i){const n=this.itemList.find(o=>`${o.props.id}`===i);n&&(this.selectedCh=n)}return s}return null}FindByID(t,e){const s=`.${t}`,i=document.querySelectorAll(`${s}`);for(const n of i){const o=n.getAttribute("item-id");if(o&&o===e)return n}return null}FindImgByID(t,e){const s=`.${t}`,i=document.querySelectorAll(`${s}`);for(const n of i){const o=n.getAttribute("item-id");if(o&&o===e){const l=n.querySelectorAll("img");return l.length>=1?l[0]:null}}return null}ReplaceImg(t,e,s){const i=this.FindImgByID(t,e);return i===null?null:(i.dataset.filename,i.src=s,i)}copyCssToInlineStyle(t,e){for(const s of document.styleSheets){let i;try{i=s.cssRules}catch{continue}for(const n of i)if(n instanceof CSSStyleRule&&n.selectorText===t){const o=n.style;for(let l=0;l<o.length;l++){const c=o[l],r=o.getPropertyValue(c);e.style.setProperty(c,r),console.log(`[copyCssToInlineStyle] copied [${c}]=[${r}]`)}return}}}}const b={Hide:"Hide",MoveLowest:"MoveLowest"};class N{constructor(){this.dlgName="",this.B3Type=b.MoveLowest,this.nMove=4,this.initLeft=0,this.initTop=0,this.moveLeft=0,this.moveTop=0}NewDialog(t,e,s=b.MoveLowest){this.dlgName=e,this.B3Type=s;const i=document.createElement("dialog");i.id=e,i.className=e;const n=document.getElementById(t);return n.appendChild(i),this.dlgParent=n,this.dlg=i,i}SetContent(t,e){const s=this.dlg;let i="";this.B3Type===b.MoveLowest&&(i=`<button id="${this.toolNameB3}">[_]</button>`);const n=`
<button id="${this.toolNameB1}">[→]</button>
<button id="${this.toolNameB2}">[↓]</button>
${i}
`,o=document.createElement("div");o.innerHTML=n,s.innerHTML=e;const l=document.getElementById(t);l.appendChild(o),l.appendChild(s)}EnableEventHandlers(){const t=this.dlgParent.style.left,e=this.dlgParent.style.top;this.initLeft=parseInt(t.substring(0,t.length-2)),this.initTop=parseInt(e.substring(0,e.length-2)),this.moveLeft=0,this.moveTop=0,document.getElementById(`${this.toolNameB1}`).onclick=async()=>{this.dlgParent!==void 0&&(this.moveLeft++,this.moveLeft>=this.nMove&&(this.moveLeft=0),this.dlgParent.style.left=`${this.initLeft+this.moveLeft*100}px`)},document.getElementById(`${this.toolNameB2}`).onclick=async()=>{this.dlgParent!==void 0&&(this.moveTop++,this.moveTop>=this.nMove&&(this.moveTop=0),this.dlgParent.style.top=`${this.initTop+this.moveTop*100}px`)},this.B3Type===b.MoveLowest&&(document.getElementById(`${this.toolNameB3}`).onclick=async()=>{if(this.dlgParent===void 0)return;new m().MoveLowestLayer(this.dlgParent)})}static GetDialogInfo(t){const e=this.FindDialogParent(t);if(e===null)return null;const s=e.querySelector("dialog");if(s===null)return null;const i=new Z,n=s.clientWidth,o=s.clientHeight;return i.name=t,i.left=e.style.left,i.top=e.style.top,i.width=`${n}px`,i.height=`${o}px`,i}static SetDialogInfo(t){const e=this.FindDialogParent(t.name);if(e===null)return!1;const s=e.querySelector("dialog");return s===null?!1:(e.style.left=t.left,e.style.top=t.top,s.style.width=t.width,s.style.height=t.height,!0)}static FindDialogParent(t){const e=document.getElementById(t);return e??null}get toolNameB1(){return`${this.dlgName}-dlg-tool-b1`}get toolNameB2(){return`${this.dlgName}-dlg-tool-b2`}get toolNameB3(){return`${this.dlgName}-dlg-tool-b3`}}class Z{constructor(){this.name="",this.left="",this.top="",this.width="",this.height=""}}class m{add(t){m.dlgElems.push(t)}AddDialogs(){m.dlgElems=new Array;const t=document.querySelectorAll("div");for(const e of t)e.style.zIndex!==""&&(parseInt(e.style.zIndex)>=m.ignoreIndex||e.querySelector("dialog")&&(console.log(`${e.id} added!`),this.add(e)))}AssignIndexies(){let t=m.dlgElems.length-1;for(const e of m.dlgElems)e.style.zIndex=`${t}`,t--}MoveLowestLayer(t){m.dlgElems.length;for(const e of m.dlgElems)if(e.id===t.id)e.style.zIndex="0";else{const s=e.style.zIndex;e.style.zIndex=`${parseInt(s)+1}`}}MoveHiestLayer(t){m.dlgElems.length;let e=-1;for(const s of m.dlgElems){const i=parseInt(s.style.zIndex);i>=m.ignoreIndex||i>e&&(e=i)}for(const s of m.dlgElems)if(s.id===t.id){s.style.zIndex=`${e}`;break}for(const s of m.dlgElems)if(s.id!==t.id){if(parseInt(s.style.zIndex)>=m.ignoreIndex)continue;e--,s.style.zIndex=`${e}`}}FindByName(t){const e=m.dlgElems.find(s=>s.id===t);return e||null}async ForEachAsync(t){for(const e of m.dlgElems)e.parentNode!==null&&await t(e.id)}ReOrder(){m.dlgElems.sort((t,e)=>{const s=t.style.zIndex,i=e.style.zIndex;if(s===""||i==="")throw new Error("z-index が未設定の要素が混入しています");return parseInt(e.style.zIndex)-parseInt(t.style.zIndex)})}}m.ignoreIndex=1e3;const _={None:"None"};class H{get iconFileName(){return this.id===null&&!Number.isNaN(this.id)?`${this.name}_${this.idAsText}.png`:`${this.name}_${this.id}.png`}calcScore(t){const e=this,s=t.split("+");let i=0;for(const n of s){const o=n.trim();if(o.endsWith("()")){const l=o.slice(0,-2);typeof e[l]=="function"?i+=e[l]():console.warn(`関数 '${l}' が存在しません`)}else{const l=e[o];typeof l=="number"?i+=l:Array.isArray(l)?i+=l.reduce((c,r)=>c+r,0):console.warn(`プロパティ '${o}' が数値ではありません`)}}return i}constructor(t=0,e=""){this.ns=_.None,this.id=0,this.name="",this.contentURL="",this.iconURL="",this.idAsText="",this.idAttributeForHTML="",this.id=t,this.name=e}parseFromImgName(t){let e=t.indexOf("_");if(e>=0){const s=t.substring(0,e);let i=t.substring(e+1);if(e=i.indexOf("."),e>=0)return i=i.substring(0,e),this.id=Number.parseInt(i),this.name=s,this.idAsText=Number.isNaN(this.id)?i:"",!0}return!1}}class A{constructor(){this.parentName=""}MakeList(){}async LoadList(t){const i=(await new M().loadJson(t)).map(o=>Object.assign(new H,o)),n=new A;return n.chList=i,n}async toHTML(t){if(!this.chList)return"";this.htmlMaker=new F;let e=0;for(const s of this.chList){e++;const i=`chuid${e}`;s.idAttributeForHTML=i;const n="",o=new D;o.props.name=this.itemCssClassName(),o.props.id=i,o.props.imgName=this.imgCssClassName(),o.props.imgSrc=n,o.props.imgFile=s.iconFileName,o.props.toolTip=s.name,o.props.option.onSelect=l=>{this.setSelectedItem(l.item.props.id)},this.htmlMaker.add(o)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createSelectorBox(t,e){this.parentName=t;const s=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="char-dlg-apply">選択</button>
<button id="char-dlg-close">閉じる</button>
`),i=`<div class="char-dlg-content">
    ${e}
    <label id="char-dlg-chinfo">未選択</label>
    ${s}
</div>`,n=new N,o=n.NewDialog(t,this.dlgCssClassName());return n.SetContent(t,i),this.applyCss(),n.EnableEventHandlers(),o}addEventHandlers(t){document.getElementById("char-dlg-close").onclick=()=>t.close(),document.getElementById("char-dlg-apply").onclick=()=>{if(this.onApply!==void 0){const e=new tt;e.ch=this.selectedCh,this.onApply(e),e.cancel||t.close()}}}addItemClickHandlers(t){this.onApply=t;const e=this.htmlMaker.GetIdByIndex(0);this.htmlMaker.SelectByID(this.itemCssClassName(),e),this.htmlMaker.enableClick(this.itemCssClassName()),this.setSelectedItem(e)}setSelectedItem(t){const e=this.chList.find(s=>t===s.idAttributeForHTML);e&&(document.getElementById("char-dlg-chinfo").textContent=e.name,this.selectedCh=e)}enableLazyImages(t){this.htmlMaker.initObserver(this.dlgCssClassName(),t)}itemCssClassName(){return"char-item"}imgCssClassName(){return"base"}listCssClassName(){return"char-list"}dlgCssClassName(){return"char-dlg"}applyCss(){const t=this.listCssClassName(),e=this.itemCssClassName(),s=this.imgCssClassName(),i=document.createElement("style");i.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,100,100)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.char-dlg-content {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

${this.htmlMaker.MakeDefaultScrollCss(this.parentName,300)}
${this.htmlMaker.MakeDefaultGridCss(t,64,5,336)}

${this.htmlMaker.MakeDefaultItemimgCss(e,s,64,64)}
${this.htmlMaker.MakeDefaultSelectionCss(e)}

${this.htmlMaker.MakeDefaultButtonsCss()}
`.trim(),document.head.appendChild(i);const n=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,n)}}class tt{constructor(){this.cancel=!1}}class et{constructor(t=0,e="",s=0){this.ch=new H,this.score=0,this.ch.id=t,this.ch.name=e,this.score=s}}class J{Add(t){if(t===void 0){console.log("[VersusGroupRow::Add] scItem === undefined");return}this.columns===void 0&&(this.columns=[]),this.columns.push(t)}Count(){return this.columns.length}debug(){if(this.columns===void 0){console.log("[VersusGroupRow::debug] this.columns === undefined");return}for(const t of this.columns)console.log(`[${t.ch.name}]	score=[${t.score}]`)}}J.defNumColumn=5;class R{Add(t){this.groupRows===void 0&&(this.groupRows=[]),this.groupRows.push(t)}Count(){return this.groupRows.length}debug(){if(this.groupRows===void 0)console.log("this.groupRows === undefined");else for(const t of this.groupRows)t.debug()}async loadJson(t){const i=(await new M().loadJson(t)).groupRows.map(o=>Object.assign(new J,o)),n=new R;return n.groupRows=i,n}}const k={None:"None",Player:"Player",Enemy:"Enemy"},I={None:"None",Attr:"Attr",Role:"Role"},st={HiLv:"HiLv"},d={Likely:"Likely",Uncertain:"Uncertain",Wishful:"Wishful"};class L{}L.Likely=.9;L.Uncertain=.64;class B{constructor(){this.scoreItems=[],this.formationType=k.None,this.boost=0}setScoreItems(t){if(t!==void 0){this.scoreItems=new Array;for(const e of t){const s=new et(e.ch.id,e.ch.name,e.score);this.scoreItems.push(s)}}}async toCharHTML(t,e){const s=await t.getImageUrl(e.ch.iconFileName);return`
            <img class=${this.charCssClassName()}
            src="${s}"
            width="100"
            title="${e.ch.name}
score=${e.score}">
        `}async toJudgeHTML(t,e){let s=null;switch(e){case d.Likely:s=await t.getImageUrl("win.png");break;case d.Uncertain:s=await t.getImageUrl("even.png");break;case d.Wishful:s=await t.getImageUrl("lost.png");break;default:return""}return`<img class=${this.judgeCssClassName()} src="${s}" width="48">`}charCssClassName(){return"base"}judgeCssClassName(){return"mark"}get combatScore(){if(this.scoreItems===void 0)return 0;const t=this.scoreItems.reduce((s,i)=>s+i.score,0),e=this.boost===0?1:this.boost;return Math.ceil(t*e/100)}}class it{constructor(){this.hasCombo=!1,this.winRate=new Map}setPlayer(t){t.formationType=k.Player,this.player=t}setEnemy(t){t.formationType=k.Enemy,this.enemy=t}judge(t){const s=this.winRate.get(t);return s>=L.Likely?d.Likely:s>=L.Uncertain?d.Uncertain:d.Wishful}judgeForEnemy(t){switch(t){case d.Likely:return d.Wishful;case d.Uncertain:return d.Uncertain;case d.Wishful:return d.Likely}}}class nt{constructor(){this.combatPairs=new Map}setPair(t,e){this.combatPairs.set(t,e)}calcCombatScore(){for(const[t,e]of this.combatPairs){if(e.player===void 0||e.enemy===void 0)continue;const s=[I.None,I.Attr,I.Role];for(const i of s){let n=e.player.combatScore,o=e.enemy.combatScore;e.winRate.set(i,o!==0?n/o:1)}}}processResult(t,e,s){async function i(o,l){const c=e(l.formationType),r=await l.toJudgeHTML(t,o);for(const g of l.scoreItems){const p=await l.toCharHTML(t,g),q=`
                    <div class=${n}>
                        ${p}
                        ${r}
                    </div>
                `;s(c,q)}}const n=this.outerCssClassName();for(const[o,l]of this.combatPairs){const c=l.judge(I.None),r=l.judgeForEnemy(c);i(c,l.player),i(r,l.enemy)}}outerCssClassName(){return"icon"}applyCss(){const t=new B,e=`.${this.outerCssClassName()}`,s=`.${t.charCssClassName()}`,i=`.${t.judgeCssClassName()}`,n=document.createElement("style");n.textContent=`
            ${e} {
            position: relative;
            width: 100px;
            height: 100px;
            }

            ${e} ${s} {
            width: 100px;
            height: 100px;
            }

            ${e} ${i} {
            position: absolute;
            width: 48px;
            height: 48px;
            right: 0;
            bottom: 0;
            }
        `,document.head.appendChild(n)}}class O{constructor(){this.iconFileName="",this.toolTip="",this.idAttributeForHTML=""}ToggleStatus(){this.dlg===void 0||this.dlg===null||(this.dlg.hidden=!this.dlg.hidden)}}class S{constructor(){this.items=new Array,this.parentName="",this.listName=""}add(t){return t.dlgParent=t.dlg.parentElement,this.items.push(t),!0}async toHTML(t,e){if(!this.items)return"";this.listName=t,this.htmlMaker=new F;let s=0;for(const i of this.items){s++;const n=`dock-uid${s}`;i.idAttributeForHTML=n;const o="",l=i.iconFileName,c=new D;c.props.name=this.itemCssClassName(),c.props.id=n,c.props.imgName=this.imgCssClassName(),c.props.imgSrc=o,c.props.imgFile=l,c.props.toolTip=i.toolTip,c.props.option.setLabel(i.toolTip),c.props.option.onSelect=r=>{const g=this.items.find(p=>r.item.props.id===p.idAttributeForHTML);if(g&&(this.selectedItem=g,this.onApply!==void 0)){const p=new ot;p.item=this.selectedItem,this.onApply(p)}},this.htmlMaker.add(c)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createDockBox(t,e){this.parentName=t;const s=`<div class="${this.parentName}-dlg-content">
    ${e}
</div>`,i=new N,n=i.NewDialog(t,this.dlgCssClassName(),b.Hide);return i.SetContent(t,s),this.applyCss(),i.EnableEventHandlers(),n}addItemClickHandlers(t){this.onApply=t,this.htmlMaker.SelectByID(this.itemCssClassName(),this.htmlMaker.GetIdByIndex(0)),this.htmlMaker.enableClick(this.itemCssClassName())}enableLazyImages(t){this.htmlMaker.initObserver(this.dlgCssClassName(),t)}applyCss(){const t=this.listCssClassName(),e=this.itemCssClassName(),s=this.imgCssClassName(),i=48,n=document.createElement("style");n.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,10,60,m.ignoreIndex)}
${this.htmlMaker.MakeSystematicDialogCss(this.dlgCssClassName())}
.${this.parentName}-dlg-content {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

${this.htmlMaker.MakeDefaultNonScrollCss(this.parentName,0)}
${this.htmlMaker.MakeDefaultGridCss(t,i,2,i*2)}

${this.htmlMaker.MakeDefaultItemLabelCss(e,s,i,i)}
${this.htmlMaker.MakeSystematicSelectionCss(e)}

${this.htmlMaker.MakeDefaultButtonsCss()}
`.trim(),document.head.appendChild(n);const o=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,o)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}listCssClassName(){return`${this.listName}-list`}dlgCssClassName(){return`${this.parentName}-dlg`}static GetDialogInfo(t){return N.GetDialogInfo(t)}static SetDialogInfo(t){return N.SetDialogInfo(t)}async InitZOrder(t){await t.ForEachAsync(e=>{const s=S.GetDialogInfo(e),i=t.FindByName(e);return s!==null&&(s.zindex=i!==null?i.style.zIndex:""),console.log(s),!0})}}class ot{constructor(){this.cancel=!1}}class T{constructor(){this.dlgName="",this.iconFileName="",this.toolTip="",this.hidden=!1,this.zIndex=""}static toJsonText(t){const e=T.toJsonInst(t);return JSON.stringify(e,null,2)}static toJsonInst(t){const e=new T;return e.dlgName=t.dlg.id,e.iconFileName=t.iconFileName,e.toolTip=t.toolTip,e.hidden=t.dlg.hidden,e.zIndex=t.dlg.style.zIndex,e}}class v{static toJsonText(t){const e=v.toJsonInst(t);return JSON.stringify(e,null,2)}static toJsonInst(t){const e=new v;e.items=new Array;for(const s of t.items)e.items.push(T.toJsonInst(s));return e}restore(t,e){for(const s of this.items){const i=t.items.find(n=>n.dlg.id===s.dlgName);i&&(i.iconFileName=s.iconFileName,i.toolTip=s.toolTip,i.dlg.hidden=s.hidden,i.dlg.style.zIndex=s.zIndex)}e.ReOrder()}}class U{constructor(t=0,e=""){this.ch=new H,this.isEmpty=!0,this.ch.id=t,this.ch.name=e}}class P{constructor(){this.nFormationItem=5}async Load(t){const i=(await new M().loadJson(t)).map(o=>Object.assign(new U,o)),n=new P;return n.items=i,n}Init(){this.items=new Array;for(let t=0;t<this.nFormationItem;t++)this.items.push(new U)}put(t,e){return this.items.find(i=>this.isExistCh(i,e))?!1:(t.ch.ns=e.ns,t.ch.id=e.id,t.ch.name=e.name,t.isEmpty=!1,!0)}empty(t){const e=t.isEmpty;return t.isEmpty=!0,t.isEmpty!=e}isExistCh(t,e){return t.ch.name===e.name&&t.ch.id===e.id}equalsFormationItem(t,e){return t.ch.name===e.ch.name&&t.ch.id===e.ch.id}}class at{constructor(){this.emptyFile="plus.png",this.parentName="",this.listName=""}Init(){this.formation=new P,this.formation.Init()}Setup(t){this.formation=t}async toHTML(t,e){if(!this.formation)return"";this.listName=t,this.htmlMaker=new F;let s=0;for(const i of this.formation.items){const n=i.ch;s++;const o=`chuid${s}`;n.idAttributeForHTML=o;const l="",c=i.isEmpty?this.emptyFile:n.iconFileName,r=new D;r.props.name=this.itemCssClassName(),r.props.id=o,r.props.imgName=this.imgCssClassName(),r.props.imgSrc=l,r.props.imgFile=c,r.props.toolTip=n.name,r.props.option.onSelect=g=>{this.setSelectedItem(g.item.props.id)},this.htmlMaker.add(r)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createFormationBox(t,e){this.parentName=t;const s=this.htmlMaker.MakeDefaultToolButtonsHTML(`
<button id="${this.parentName}-dlg-tbput">キャラ配置</button>
<button id="${this.parentName}-dlg-tbempty">キャラ抹消</button>
`),i=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="${this.parentName}-dlg-apply">確定</button>
<button id="${this.parentName}-dlg-close">閉じる</button>
`),n=`<div class="${this.parentName}-dlg-content">
    ${s}
    ${e}
    ${i}
</div>`,o=new N,l=o.NewDialog(t,this.dlgCssClassName());return o.SetContent(t,n),this.applyCss(),o.EnableEventHandlers(),l}addEventHandlers(t){document.getElementById(`${this.parentName}-dlg-close`).onclick=()=>t.close(),document.getElementById(`${this.parentName}-dlg-apply`).onclick=()=>{if(this.onApply!==void 0){const e=new x;e.item=this.selectedItem,this.onApply(e),e.cancel||t.close()}},document.getElementById(`${this.parentName}-dlg-tbput`).onclick=async()=>{if(this.onPut!==void 0){const e=new x;e.item=this.selectedItem,await this.onPut(e),this.formation.put(this.selectedItem,e.selectCh),this.htmlMaker.ReplaceImg(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,e.selectedImg)}},document.getElementById(`${this.parentName}-dlg-tbempty`).onclick=async()=>{if(this.onEmpty!==void 0){const e=new x;e.item=this.selectedItem,e.selectedImg=this.emptyFile,await this.onEmpty(e),this.formation.empty(this.selectedItem),this.htmlMaker.ReplaceImg(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,e.selectedImg)}}}addItemClickHandlers(t,e,s){this.onApply=t,this.onPut=e,this.onEmpty=s;const i=this.htmlMaker.GetIdByIndex(0);this.htmlMaker.SelectByID(this.itemCssClassName(),i),this.htmlMaker.enableClick(this.itemCssClassName()),this.setSelectedItem(i)}setSelectedItem(t){const e=this.formation.items.find(s=>t===s.ch.idAttributeForHTML);e&&(this.selectedItem=e)}enableLazyImages(t){this.htmlMaker.initObserver(this.dlgCssClassName(),t)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}listCssClassName(){return`${this.listName}-list`}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const t=this.listCssClassName(),e=this.itemCssClassName(),s=this.imgCssClassName(),i=document.createElement("style");i.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,100,100)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.parentName}-dlg-content {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

${this.htmlMaker.MakeDefaultScrollCss(this.parentName,500)}
${this.htmlMaker.MakeDefaultGridCss(t,100,5,516)}

${this.htmlMaker.MakeDefaultItemimgCss(e,s,100,100)}
${this.htmlMaker.MakeDefaultSelectionCss(e)}

${this.htmlMaker.MakeDefaultButtonsCss()}
`.trim(),document.head.appendChild(i);const n=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,n)}}class x{constructor(){this.cancel=!1}}const $=new M,y=$.isWebRunning,u=new V;await u.loadZip($.imageZip);const h=new S;$.setUser($.user1Home);const z=$.currentUserHome,lt=`${z}playerForm.json`,rt=`${z}enemyForm.json`;async function ct(a){return await new A().LoadList(a)}const mt=`${z}chListFile.json`,f=await ct(mt),j=await f.toHTML(u);console.log(`${j}`);if(y){const a=f.createSelectorBox("charListArea",j);f.addEventHandlers(a),f.addItemClickHandlers(e=>{console.log(`selected ch = ${e.ch.name}`)}),f.enableLazyImages(u),a.show();const t=new O;t.iconFileName="",t.toolTip="キャラ選択",t.dlg=a,h.add(t)}const C=new at;C.Init();const G=await C.toHTML("playerForm",u);console.log(`${G}`);if(y){const a=C.createFormationBox("playerForm",G);C.addEventHandlers(a),C.addItemClickHandlers(e=>{console.log(`selected ch = ${e.item.ch.name}`)},async e=>{e.selectCh=f.selectedCh,e.selectedImg=await u.getImageUrl(f.selectedCh.iconFileName),console.log(`selected ch = ${e.selectCh.name}`)},async e=>{e.selectedImg=await u.getImageUrl(e.selectedImg),console.log(`empty ch = ${e.selectedImg}`)}),C.enableLazyImages(u),a.show();const t=new O;t.iconFileName="",t.toolTip="自編成",t.dlg=a,h.add(t)}const dt=await h.toHTML("dockForm",u);if(y){const a=h.createDockBox("dockForm",dt);h.addItemClickHandlers(t=>{if(t.item.dlgParent===null){t.cancel=!0;return}console.log(`selected dlg = ${t.item.toolTip}`),new m().MoveHiestLayer(t.item.dlgParent)}),h.enableLazyImages(u),a.show()}if(y){const a=new m;a.AddDialogs(),a.AssignIndexies(),h.InitZOrder(a);const e=v.toJsonInst(h),s=new S;s.add(h.items[0]),s.add(h.items[1]),e.restore(s,a)}async function W(a){const e=await new R().loadJson(a);return e.groupRows.forEach(s=>s.columns.forEach(i=>{console.log(`${i.ch.id}	${i.ch.name}	${i.score}`)})),e}const ht=await W(lt),ut=await W(rt);function gt(){const a=new B;a.setScoreItems(ht.groupRows[0].columns),a.boost=100;const t=new B;t.setScoreItems(ut.groupRows[0].columns),t.boost=100;const e=new it;e.setPlayer(a),e.setEnemy(t),w.setPair(st.HiLv,e),w.calcCombatScore();for(const[s,i]of w.combatPairs){const n=i.judge(I.None);console.log(`judge=[${n}]`)}}const w=new nt;gt();function pt(){y&&w.applyCss(),w.processResult(u,a=>{if(!y)return null;const t=a===k.Player?"playerTable":"enemyTable",e=document.querySelector(`#${t} tbody`),s=document.createElement("tr");return e?.appendChild(s),s},(a,t)=>{if(!y)return null;const e=document.createElement("td");return e.innerHTML=t,a.appendChild(e),e})}pt();

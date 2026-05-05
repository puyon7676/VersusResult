(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const G={none:"none",classPq:"pq",classMM:"mm"},v={pqStatusHP:"pqStatusHP",pqStatusATK:"pqStatusATK",pqStatusREC:"pqStatusREC",pqTokkunHP:"pqTokkunHP",pqTokkunATK:"pqTokkunATK",pqTokkunREC:"pqTokkunREC",pqTokuSp1:"pqTokuSp1",pqTokuSp2:"pqTokuSp2",pqStatusType:"pqStatusType",pqStatusCombo:"pqStatusCombo",mmAbilitySTR:"mmAbilitySTR",mmStatusFGT:"mmStatusFGT",mmStatusATK:"mmStatusATK",mmStatusPDF:"mmStatusPDF",mmStatusACC:"mmStatusACC",mmStatusEVA:"mmStatusEVA",mmStatusCRI:"mmStatusCRI",mmStatusMDF:"mmStatusMDF",mmStatusHP:"mmStatusHP",mmStatusCRD:"mmStatusCRD",mmStatusDEF:"mmStatusDEF",mmStatusSPD:"mmStatusSPD",mmAbilityDEX:"mmAbilityDEX",mmAbilityMGC:"mmAbilityMGC",mmAbilityDUR:"mmAbilityDUR",mmRole:"mmRole"},O={None:"None",CnsRed:"CnsRed",CnsBlue:"CnsBlue",CnsGreen:"CnsGreen",CnsYellow:"CnsYellow",CnsViolet:"CnsViolet",CnsWhite:"CnsWhite",CnsBlack:"CnsBlack"},Ye={RlAttacker:"RlAttacker",RlHealer:"RlHealer",RlDebuffer:"RlDebuffer",RlBuffer:"RlBuffer"},se={None:"None",Full:"Full",Limit:"Limit",NotRun:"NotRun"},De={Undef:"Undef",True:"True",False:"False"},Ie={Undef:"Undef",Qiita:"Qiita",Line:"Line"};class We{constructor(){this.imageRepository="https://puyon7676.github.io/GameImages/",this.imageHome="./Image/",this.user1Home="./User1/",this.user2Home="./User2/",this.currentUserHome="",this.appHref="",this.isLocal=!1,this.admin=!1,this.cmd="",this.edit=G.none,this.evonaType=se.None,this.aslocal=De.Undef,this.coming=Ie.Undef,this.dataBasePath="../キャラパースデータ",this.statusJsonPath="",this.zipPrefix="",this.chListFile="",this.chStatusListFile="",this.charStatusZip="./CharStatus.zip",this.nodeToolsImportFilename="./nodeTools.js"}setImageHome(e){if(this.isLocal=e,e)this.imageHome=`${this.currentUserHome}Image/`;else{let t=this.currentUserHome;this.currentUserHome.substring(0,2)==="./"&&(t=this.currentUserHome.substring(2)),this.imageHome=`${this.imageRepository}${t}`}}setUser(e){this.currentUserHome=e}setPath(){this.currentUserHome===this.user1Home&&(this.statusJsonPath=`${this.dataBasePath}/ぷよクエ_詳細JSON`,this.zipPrefix="puyoQue_",this.chListFile=`${this.currentUserHome}chListFile_puyo.json`,this.chStatusListFile=`${this.currentUserHome}puyoQue_CharStatus.zip`),this.currentUserHome===this.user2Home&&(this.statusJsonPath=`${this.dataBasePath}/メメントモリ_詳細JSON`,this.zipPrefix="memeMori_",this.chListFile=`${this.currentUserHome}chListFile_meme.json`,this.chStatusListFile=`${this.currentUserHome}memeMori_CharStatus.zip`)}get gameType(){return this.currentUserHome===this.user1Home,G.classPq}get gameTitle(){return this.edit!==G.none?`エディタ(${this.edit})`:this.gameType===G.classPq?"ぷよクエ":"メメントモリ"}setBrowserTitle(){const e=this.gameTitle;document.head.title=e;for(const t of document.head.children)t.nodeName==="TITLE"&&(t.innerHTML=`EvoNa：${e} モード`);return e}get editorURL(){return`${this.appHref}?edit=${this.gameType}`}get isWebRunning(){return!(typeof document>"u")}parseURLParams(){if(!this.isWebRunning){console.log("cannot parse URL params!");return}const e=new URLSearchParams(window.location.search);for(const[t,s]of e)switch(t.trim()){case"user":const n=s.trim();this.setUser(n==="1"?this.user1Home:this.user2Home);break;case"debug":break;case"admin":this.admin=s.trim()==="true";break;case"cmd":this.cmd=s;break;case"edit":this.edit=s.trim()===G.classMM?G.classMM:G.classPq;break;case"aslocal":this.aslocal=s.trim()==="true"?De.True:De.False;break;case"coming":switch(s.trim()){case Ie.Qiita:this.coming=Ie.Qiita;break;case Ie.Line:this.coming=Ie.Line;break}break}}get availComing(){return this.coming!==Ie.Undef}async loadJson(e){return console.log(`[loadJson] file=[${e}]`),await this._loadJson(e)}async _loadJson(e){if(this.isWebRunning){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`HTTPエラー! ステータス: ${t.status}`);return await t.json()}else{const{loadJsonNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async saveJson(e,t){const s=JSON.stringify(t);if(this.isWebRunning){const n=new Blob([s],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=e,o.click()}else{const{saveJsonNode:n}=await import(this.nodeToolsImportFilename);return n(e,t)}}async loadBinFile(e){if(this.isWebRunning)return await(await fetch(e)).blob();{const{readBinNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async getDoc(e){let t,s;if(this.isWebRunning)t=new DOMParser,s=t.parseFromString(e,"text/html");else{const{createHtmlParserNode:n}=await import(this.nodeToolsImportFilename);t=n(e),s=t.parseFromString(e,"text/html")}return s}}class W{static async put(e){const t=W.encodeEnable?await W.encode(e):e;try{await navigator.clipboard.writeText(t)}catch(s){return console.error("コピー失敗...",s),!1}return!0}static async get(){let e="";try{e=await navigator.clipboard.readText()}catch(t){return console.error("ペースト失敗...",t),null}return W.encodeEnable?await W.decode(e):e}static async encode(e){const t=W.getEncoder(),s=W.storeFile;return t.file(s,e),await t.generateAsync({type:"base64",compression:"DEFLATE",compressionOptions:{level:9}})}static async decode(e){const t=W.getEncoder(),s=W.storeFile;try{return await(await t.loadAsync(e,{base64:!0})).file(s).async("string")}catch(n){return console.error("デコード失敗...",n),null}}static getEncoder(){return new window.JSZip}}W.encodeEnable=!0;W.storeFile="form.json";const B={None:"None",Ok:"Ok",OkCancel:"OkCancel",YesNo:"YesNo",YesNoCancel:"YesNoCancel"},ve={None:"None",Ok:"Ok",Question:"Question"},E={None:"None",Ok:"Ok",Cancel:"Cancel",Yes:"Yes",No:"No",Secret:"Secret"};class ee{constructor(){this.parentName="evona-msg-box",this.buttonType=B.Ok,this.iconType=ve.None,this.title="Confirm",this.btnS="",this.SecretEnable=!1,this.btnAlign="right",this.btnOk="OK",this.btnCancel="Cancel",this.btnYes="Yes",this.btnNo="No",this.CheckVisible=!1,this.CheckText="",this.Checked=!1,this.Result=E.None,this.AuthVisible=!1,this.authText="",this.authTextMax=4,this.onS1Clicked=e=>{this.Result=E.Secret,this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB1Clicked=e=>{switch(this.buttonType){case B.None:this.Result=E.None;break;case B.Ok:this.Result=E.Ok;break;case B.OkCancel:this.Result=E.Ok;break;case B.YesNo:this.Result=E.Yes;break;case B.YesNoCancel:this.Result=E.Yes;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB2Clicked=e=>{switch(this.buttonType){case B.None:this.Result=E.None;break;case B.Ok:this.Result=E.None;break;case B.OkCancel:this.Result=E.Cancel;break;case B.YesNo:this.Result=E.No;break;case B.YesNoCancel:this.Result=E.No;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB3Clicked=e=>{switch(this.buttonType){case B.None:this.Result=E.None;break;case B.Ok:this.Result=E.None;break;case B.OkCancel:this.Result=E.Cancel;break;case B.YesNo:this.Result=E.No;break;case B.YesNoCancel:this.Result=E.Cancel;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onWindowKeyboard=e=>{e.key.length===1&&this.onAuthKeyProc(e.key)},this.onAuthButtonClicked=e=>{const t=e.target;t!==null&&this.onAuthKeyProc(t.textContent)}}get btnNameS(){return`${this.parentName}-s1`}get btnName1(){return`${this.parentName}-b1`}get btnName2(){return`${this.parentName}-b2`}get btnName3(){return`${this.parentName}-b3`}get chkName1(){return`${this.parentName}-chk1`}get authName1(){return`${this.parentName}-auth1`}get authBtnName(){return`${this.parentName}-authBtn`}setParent(e){this.parentName=`${e}-msg-box`}setTypes(e,t){this.buttonType=e,this.iconType=t}setOk(e=ve.Ok){this.setTypes(B.Ok,e)}setOkCancel(e=ve.Question){this.setTypes(B.OkCancel,e)}setYesNo(e=ve.Question){this.setTypes(B.YesNo,e)}setYesNoCancel(e=ve.Question){this.setTypes(B.YesNoCancel,e)}async showWait(e,t=null){return this.remove(),this.createUI(e,t===null?this.title:t,!0),new Promise(s=>{this.resolver=s;let n=!1,i=!1,o=!1;switch(this.buttonType){case B.None:break;case B.Ok:n=!0,i=!1,o=!1;break;case B.OkCancel:n=!0,i=!0,o=!1;break;case B.YesNo:n=!0,i=!0,o=!1;break;case B.YesNoCancel:n=!0,i=!0,o=!0;break}n&&document.getElementById(this.btnName1)?.addEventListener("click",this.onB1Clicked,{once:!0}),i&&document.getElementById(this.btnName2)?.addEventListener("click",this.onB2Clicked,{once:!0}),o&&document.getElementById(this.btnName3)?.addEventListener("click",this.onB3Clicked,{once:!0}),this.SecretEnable&&document.getElementById(this.btnNameS)?.addEventListener("click",this.onS1Clicked,{once:!0})})}onAuthKeyProc(e){if(this.authText.length<this.authTextMax&&/[a-zA-Z0-9]/.test(e)){this.authText+=e;const t=this.authText.length;let s="";for(let i=0;i<this.authTextMax;i++)i<t?s+="●":s+="○";const n=document.getElementById(this.authName1);n.innerText=s}if(this.authText.length>=this.authTextMax&&this.onAuthChecking!==void 0&&this.onAuthChecking(this.authText)){window.removeEventListener("keydown",this.onWindowKeyboard);for(let s=0;s<10;s++){const n=`${this.authBtnName}-b${s}`,i=document.querySelectorAll(`.${n}`);if(i.length!==1)continue;const o=i[0];o!==null&&o.removeEventListener("click",this.onAuthButtonClicked)}this.remove(),this.resolver&&this.resolver(this.Result)}}showNoWait(e,t="INFO"){this.remove(),this.createUI(e,t,!1)}showNoWaitEnd(){this.remove()}createUI(e,t,s){let n=`<button id="${this.btnNameS}" class="${this.btnNameS}">${this.btnS}</button>`,i="",o="",l="";switch(this.buttonType){case B.None:break;case B.Ok:i=`<button id="${this.btnName1}">${this.btnOk}</button>`,o="";break;case B.OkCancel:i=`<button id="${this.btnName1}">${this.btnOk}</button>`,o=`<button id="${this.btnName2}">${this.btnCancel}</button>`;break;case B.YesNo:i=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`;break;case B.YesNoCancel:i=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`,l=`<button id="${this.btnName3}">${this.btnCancel}</button>`;break}let a="";this.CheckVisible&&(a=`
<div style="padding: 5px 10px; font-size: 0.9em; text-align: left;">
    <label>
        <input type="checkbox" id="${this.chkName1}">${this.CheckText}
    </label>
</div>
`.trim());let r="";if(this.AuthVisible){let d="";for(let p=0;p<10;p++){const u=`${this.authBtnName}-b${p}`;d+=`<button class="${u}" id="${u}">${p}</button>`}r=`
<div style="padding: 5px 10px; font-size: 0.9em; text-align: left;">
    <label>
        <div class="${this.authName1}" id="${this.authName1}" tabindex="0">〇 〇 〇 〇</div>
    </label>
    ${d}
</div>
`.trim()}const c=`${a}${i}${o}${l}`,m=c!==""?`<div class="msg-footer">${c}</div>`:"",f=document.createElement("div");if(f.id=this.parentName,f.innerHTML=`
            <div class="msg-overlay">
                <div class="msg-panel">
                    <div class="msg-header">${t}${n}</div>
                    <div class="msg-body">${e}${r}</div>
                    ${m}
                </div>
            </div>
        `.trim(),this.applyCss(),document.body.appendChild(f),this.AuthVisible){document.getElementById(this.authName1).focus(),this.authText="",window.addEventListener("keydown",this.onWindowKeyboard);for(let p=0;p<10;p++){const u=`${this.authBtnName}-b${p}`,w=document.querySelectorAll(`.${u}`);if(w.length!==1)continue;const y=w[0];y!==null&&y.addEventListener("click",this.onAuthButtonClicked)}}}applyCss(){const e=`${this.parentName}-style`;if(document.getElementById(e))return;let t="";for(let n=0;n<10;n++){const i=`${this.authBtnName}-b${n}`;t+=`
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
`.trim(),document.head.appendChild(s)}setCheckResult(){const e=document.getElementById(this.chkName1);if(e!==null){const t=e.checked;this.Checked=t}}remove(){document.getElementById(this.btnName1)?.removeEventListener("click",this.onB1Clicked),document.getElementById(this.btnName2)?.removeEventListener("click",this.onB2Clicked),document.getElementById(this.btnName3)?.removeEventListener("click",this.onB3Clicked),document.getElementById(this.btnNameS)?.removeEventListener("click",this.onS1Clicked),document.getElementById(this.parentName)?.remove()}}class Vt{constructor(){this.tblNameCharImages="CharImages",this.tblCharImages={name:this.tblNameCharImages,columns:{ns:{dataType:"string",index:!0},name:{dataType:"string"},fileName:{dataType:"string",index:!0},fileData:{dataType:"object"}}},this.tblNameSettings="Settings",this.tblSettings={name:this.tblNameSettings,columns:{key:{dataType:"string",primaryKey:!0},value:{dataType:"string"}}},this.tblNameActionLog="ActionLog",this.tblActionLog={name:this.tblNameActionLog,columns:{id:{primaryKey:!0,autoIncrement:!0},logType:{dataType:"string"},log:{dataType:"string"}}},this.dbName="EvonaDB",this.db={name:this.dbName,tables:[this.tblCharImages,this.tblSettings,this.tblActionLog]}}async connect(e){console.log("Waiting for JsStore library...");let t=0;for(;typeof window.JsStore>"u";){if(t>50)throw new Error("JsStore library load timeout. Check script tag order.");await new Promise(n=>setTimeout(n,100)),t++}const s=window.JsStore;this.connection=new s.Connection(new Worker(e)),console.log("connection started with library version:",s.VERSION)}async term(){await this.connection.terminate(),console.log("connection terminated")}async initDb(){const e=await this.connection.initDb(this.db);return console.log(e?"Db Created & connection is opened":"Db connection is opened"),e}async dropDb(){let e=!1;return await this.connection.dropDb().then(function(){console.log("Db deleted successfully"),e=!0}).catch(function(){console.error("dropDb error")}),e}async deleteAllRecords(e){return await this.existsTable(e)===!1?(console.log(`[${e}] not exist`),!1):(await this.connection.clear(e),console.log(`[${e}] all record deleted successfully`),!0)}async existsTable(e){try{const t=await this.connection.count({from:e});return!0}catch(t){console.log("[existsTable] JsStore Select Error:",t)}return!1}get defWorkerFile(){return window.EVONA_CONFIG.workerFile}async setup(){return await this.connect(this.defWorkerFile),await this.initDb()}sortByIdAscAsNum(e){e&&e.sort((t,s)=>Number(t.id)-Number(s.id))}}class Ut extends Vt{async insert(e,t){await this.connection.insert({into:this.tblNameSettings,values:[{key:e,value:t}],upsert:!0})}async insertMultiple(e){const t=e.map(s=>({key:s.key,value:s.value}));return await this.connection.insert({into:this.tblNameSettings,values:t,upsert:!0})}async selectKey(e){try{var t=await this.connection.select({from:this.tblNameSettings,where:{key:e}});return t.length>=1?t[0].value:null}catch(s){console.error("[selectKey] JsStore Select Error:",s)}return null}async countKey(e){try{return await this.connection.count({from:this.tblNameSettings,where:{key:e}})}catch(t){console.error("[countKey] JsStore Select Error:",t)}return-1}async clear(){await this.deleteAllRecords(this.tblNameSettings)}}class Gt{constructor(){this.table=new Ut}async init(){const e=new Ut;await e.setup(),this.table=e}async saveDialogPos(e){const t=e.parentElement,s=`${t?.className},${t?.style.left},${t?.style.top}`;await this.table.insert(e.className,`${s}`)}async loadDialogPos(e){const t=e.parentElement,s=await this.table.selectKey(e.className);if(s!==null){const n=s.split(",");n.length===3&&t!==null&&n[0]===t.className&&(t.style.left=n[1],t.style.top=n[2])}}async clear(){this.table.clear()}}class ft extends Vt{async insert(e,t){await this.connection.insert({into:this.tblNameActionLog,values:[{logType:e,log:t}]})}async insertMultiple(e){const t=e.map(s=>({logType:s.logType,log:s.log}));return await this.connection.insert({into:this.tblNameActionLog,values:t})}async selectType(e){try{var t=await this.connection.select({from:this.tblNameActionLog,where:{logType:e},order:{by:"id",type:"asc"}});return this.sortByIdAscAsNum(t),t.length>=1?t:null}catch(s){console.error("[selectType] JsStore Select Error:",s)}return null}async countType(e){try{return await this.connection.count({from:this.tblNameActionLog,where:{logType:e}})}catch(t){console.error("[countType] JsStore Select Error:",t)}return-1}async clear(){await this.deleteAllRecords(this.tblNameActionLog)}}class ss{constructor(){this.table=new ft}async init(){const e=new ft;await e.connect(e.defWorkerFile),await e.initDb(),this.table=e}async clear(){this.table.clear()}async put(e,t){return await this.table.insert(e,t)}async get(e){const t=await this.table.selectType(e);if(t===null)return null;const s=new Array;for(const n of t)s.push({id:n.id,log:n.log});return s}}const fe={CharSummaryAction:"CharSummaryAction",ResourceEditAction:"ResourceEditAction",GameEditAction:"GameEditAction",ScoreEditAction:"ScoreEditAction"};let Xe=null;async function ns(){return Xe||(Xe=new Gt,await Xe.init(),console.log("SettingAccess instance created (Singleton)")),Xe}let Qe=null;async function pe(){return Qe||(Qe=new ss,await Qe.init(),console.log("LogAccess instance created (Singleton)")),Qe}function is(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,h=>{const e=Math.random()*16|0;return(h==="x"?e:e&3|8).toString(16)})}function os(){const h=Date.now().toString(16),e=is();return`${h}-${e}`}async function ls(h){const e=h.cmd.split(":");let t=!1;switch(e[0]){case"drop":t=as();break;case"ref":t=document.referrer;break}const s=`[${h.cmd}] res=${t}`;alert(s)}async function as(){const h=new ft;return await h.setup(),await h.dropDb()}const ke={plus:"plus.png",win:"win.png",even:"even.png",lost:"lost.png",demo:"demo.png"};class rs{constructor(){this.imageHome="",this.cache=new Map,this.cacheNs=new Map,this.zip=null,this.zipNs=new Map,this.isMultiZip=!1,this.materials=[{ns:"",fileName:ke.plus},{ns:"",fileName:ke.win},{ns:"",fileName:ke.even},{ns:"",fileName:ke.lost},{ns:"",fileName:ke.demo}],this.AnyNs=""}get demoMaterial(){return ke.demo}async setupNs(e,t,s){const n=s.findByNs(e);if(n!==void 0){this.imageHome=t.imageHome;for(const i of n){const o=i.iconFileName,l=`${this.imageHome}${e}/${o}`;this.cache.set(o,l),this.cacheNs.set(o,e)}this.isMultiZip=!0;for(const i of this.materials){const o=i.fileName,l=`${this.imageHome}${o}`;this.cache.set(o,l),this.cacheNs.set(o,e)}}}async checkExists(e){try{return(await fetch(e,{method:"HEAD"})).ok}catch{return!1}}isMaterial(e){return this.materials.find(s=>s.fileName.includes(e))!==void 0}get loaded(){return this.isMultiZip?this.zipNs.size!==0:this.zip!==null}async _loadZipBy(e,t){const s=new We;this.imageHome=s.imageHome.substring(2);const n=await s.loadBinFile(e);let i=null;if(s.isWebRunning)i=await window.JSZip.loadAsync(n);else{const{loadZipNode:o}=await import(s.nodeToolsImportFilename);i=await o(n)}this.zipNs.set(t,i),this.isMultiZip=!0}async getImageUrlBy(e,t){if(this.isMaterial(e))return`${this.imageHome}${e}`;if(this.cache.has(e)){const n=this.cache.get(e);if(!await this.checkExists(n)){const o=`${this.imageHome}notexist.png`;this.cache.set(e,o)}return this.cache.get(e)}return null}async findNs(e){if(!this.isMultiZip)return null;if(this.cacheNs.has(e)){const t=this.cacheNs.get(e);if(t!==void 0)return t}return null}dispose(){for(const e of this.cache.values())URL.revokeObjectURL(e);this.cache.clear()}}class Me{constructor(){this.parentElem=null,this.cancel=!1,this.targetId="",this.classify="",this.selectedValue="",this.Keydown="",this.KeyEnter=$e.None}}class Fe{constructor(){this.callerName="",this.result=""}}class pt{constructor(){this.parentElem=null,this.left="",this.top="",this.width="",this.height=""}}const Re={Enter:"Enter",Escape:"Escape",Tab:"Tab",Process:"Process"},$e={None:"None",Normal:"Normal",Special:"Special"},A={Btn:"Btn",Chk:"Chk",Img:"Img",Label:"Label",LabelRO:"LabelRO",Combo:"Combo",Input:"Input",Plain:"Plain",Table:"Table"};class Q{static get titleColorText(){return`
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
`.trim()}static sliderText(e,t){return`
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
  border-radius: 34px;
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
  transform: translateX(24px); /* ツマミが右に滑る */
}
/* ラベルテキストの装飾 */
.${e}-text {
  font-size: 0.75rem;
  color: black;
  user-select: none;
}
`.trim()}}Q.width="16px";Q.offColor="#fff176";Q.onColor="#fbc02d";class kt{constructor(){this.imgSrc="",this.imgFile="",this.alt=""}}class $t{constructor(){this.selectedItem="",this.selectionPair=[],this.classify=""}}class Y{constructor(){this.type="text",this.value="",this.placeholder=""}}class Ot{constructor(){this.type="checkbox",this.value=!1,this.placeholder=""}}class Wt{constructor(){this.typeInfo=new jt,this.className=""}ToHTML(){let e="";switch(this.typeInfo.using.itemType){case A.Btn:e=this.typeInfo.ToButtonHTML(this.className);break;case A.Label:e=this.typeInfo.ToLableHTML(this.className);break;case A.LabelRO:e=this.typeInfo.ToLableROHTML(this.className);break;case A.Combo:e=this.typeInfo.ToComboHTML(this.className);break;case A.Input:e=this.typeInfo.ToInputHTML(this.className);break;case A.Chk:e=this.typeInfo.ToCheckHTML(this.className);break;case A.Img:e=this.typeInfo.ToImgHTML(this.className,this.typeInfo.using.img.alt);break;case A.Plain:e=this.typeInfo.using.innerHTML;break}return e}copyTo(e){e.className=this.className,e.typeInfo.toolTip=this.typeInfo.toolTip,e.typeInfo.using.itemType=this.typeInfo.using.itemType,e.typeInfo.using.label=this.typeInfo.using.label,e.typeInfo.using.combo=this.typeInfo.using.combo,e.typeInfo.using.input=this.typeInfo.using.input,e.typeInfo.using.innerHTML=this.typeInfo.using.innerHTML,e.typeInfo.using.img=this.typeInfo.using.img}}class tt{constructor(){this.items=new Array}makeItems(e=1){this.items.length>0&&this.items.splice(0,this.items.length);for(let t=0;t<e;t++){const s=new Wt;this.items.push(s)}}ToHTML(){let e="";for(const t of this.items){const s=t.ToHTML();s!==""&&(this.items.length>=2?e=`${e}<div>${s}</div>`:e=s)}return e}}class Tt{constructor(){this.rowName="",this.cols=new Array}makeCols(e){this.cols.length>0&&this.cols.splice(0,this.cols.length);for(let t=0;t<e;t++){const s=new tt;s.makeItems(),this.cols.push(s)}}ToHTML(){let e="";for(const t of this.cols){let s="";s=t.ToHTML(),s!==""&&(e=`${e}<td>${s}</td>`)}return e}toTemplate(){const e=new Tt;e.rowName=this.rowName;for(const t of this.cols){const s=new tt;s.makeItems(t.items.length);let n=-1;for(const i of t.items){n++;const o=s.items[n];o.className=i.className,o.typeInfo.toolTip=i.typeInfo.toolTip,o.typeInfo.using.itemType=i.typeInfo.using.itemType,o.typeInfo.using.label=i.typeInfo.using.label,o.typeInfo.using.combo=i.typeInfo.using.combo,o.typeInfo.using.input=i.typeInfo.using.input,o.typeInfo.using.innerHTML=i.typeInfo.using.innerHTML,o.typeInfo.using.img=i.typeInfo.using.img}e.cols.push(s)}return e}}class he{constructor(){this.tableName="",this.rows=new Array,this.template=null,this.invalidRowIndex=-1,this.firstRowIndex=1,this.fontSize="font-size: 0.9em;",this.clipboardText=""}makeDim(e,t){this.rows.length>0&&this.rows.splice(0,this.rows.length);for(let s=0;s<t;s++){const n=new Tt;n.makeCols(e),this.rows.push(n)}}growCell(e,t=1){const s=this.rows.length;for(let n=0;n<s;n++)this.rows[n].cols[e].makeItems(t)}getCell(e,t,s=0){return this.rows[t].cols[e].items[s]}ToHTML(e="",t){this.tableName=e;let s="",n=0;for(const a of this.rows){n++;let r="";if(r=a.ToHTML(),r!==""){const c=a.rowName!==""?` class="${a.rowName}"`:"";s=`${s}<tr ${c} item-id="${n}">${r}</tr>`}}const i=e!==""?` class="${e}"`:"",o=t!==""?` id="${t}"`:"",l=t!==""?` item-id="${t}"`:"";return s=`<table${i}${o}${l}>${s}</table>`,s}ToScrollHTML(e="",t){const s=e!==""?` class="${e}"`:"",n=t!==""?` item-id="${t}"`:"";return`<div${s}${n}>
${this.ToHTML(e,t)}
</div>`}makeRowTemplate(e){if(this.rows.length>=1){for(const t of this.rows)t.rowName=e;this.template=this.rows[0].toTemplate()}}clearRows(){this.rows=new Array}addRow(e){const t=this.getTable();if(t===null)return-1;const s=t.insertRow(-1),n=t.rows.length;if(s.className=e,s.setAttribute("item-id",`${n}`),this.template!==null&&this.template.cols.length>=1){const i=this.template.toTemplate();let o="";for(const l of i.cols){let a="";for(const r of l.items){r.typeInfo.using.itemId=n;const c=r.ToHTML();c!==""&&(l.items.length>=2?a=`${a}<div>${c}</div>`:a=c)}a!==""&&(o=`${o}<td>${a}</td>`)}return s.innerHTML=o,n}return-1}deleteRow(e){const t=this.getTable();if(t===null)return!1;for(const s of t.rows){const n=s.getAttribute("item-id");if(n!==null&&n===`${e}`)return t.deleteRow(e-this.firstRowIndex),!0}return!1}redimAllRows(){const e=this.getTable();if(e===null)return;let t=this.firstRowIndex-1;for(const s of e.rows)if(s.getAttribute("item-id")!==null){t++,s.setAttribute("item-id",`${t}`);for(const i of s.cells)this.redimElems(i.children,t)}}redimElems(e,t){for(const s of e)s.getAttribute("item-id")!==null&&s.setAttribute("item-id",`${t}`),s.children!==void 0&&this.redimElems(s.children,t)}selectRow(e){const t=this.getTable();if(t!==null&&!(e<=0)&&!(e>t.rows.length)){for(const s of t.rows)s.classList!==void 0&&s.classList.remove("selected");t.rows[e-1].classList.add("selected")}}getSelectedRow(){const e=this.getTable();if(e===null)return this.invalidRowIndex;for(const t of e.rows)if(t.classList!==void 0&&t.classList.contains("selected")){const s=t.getAttribute("item-id");return s!==null?parseInt(s):this.invalidRowIndex}return this.invalidRowIndex}updateRowImage(e,t){const n=this.getTable()?.querySelector(`tr[item-id="${e}"] img`);n instanceof HTMLImageElement&&(n.src=t)}updateRowImageToolTip(e,t){const n=this.getTable()?.querySelector(`tr[item-id="${e}"] img`);n instanceof HTMLImageElement&&(n.title=t)}updateText(e,t){if(e.children!==null){const s=e.children[0];s.textContent=t}}scroll(e){const t=this.getTable();if(t===null||e<=0||e>t.rows.length)return null;const s=t.querySelector(`tr[item-id="${e}"] img`);return s===null||s===void 0?null:(s.scrollIntoView({behavior:"smooth",block:"center"}),s)}getRowElems(){const e=this.getTable();return e===null?null:e.rows}findInputElem(e){if(e===null)return null;if(e.tagName!=="INPUT"){for(const s of e.children){const n=this.findInputElem(s);if(n!==null&&n.tagName==="INPUT")return n}return null}return e}getElemValue(e){if(e instanceof HTMLInputElement)return e.value;if(e instanceof HTMLSelectElement)return e.value;{const t=this.findInputElem(e);if(t!==null)return t.type==="checkbox"?t.checked:t.value}return null}setElemValue(e,t){if(e instanceof HTMLInputElement){const s=e,n=s.value;return s.value=t,n}else if(e instanceof HTMLSelectElement){const s=e,n=s.value;return s.value=t,n}else{const s=this.findInputElem(e);if(s!==null){if(s.type==="checkbox"){const i=s.checked;return s.checked=`${t}`.toLowerCase()==="true",i}const n=s.value;return s.value=t,n}}return null}getRowElem(e){const t=this.getTable();if(t===null)return null;for(const s of t.rows){const n=s.getAttribute("item-id");if(n!==null&&n===`${e}`)return console.log(`match row id : ${n}`),t.rows[e-this.firstRowIndex]}return null}getCellElems(e){if(e===null)return null;const t=new Array;for(const s of e.cells){if(s===null)continue;const n=new Array;for(const i of s.children)n.push(i);t.push(n)}return t}setVisible(e){const t=this.getTable();return t===null?null:(t.hidden=!e,t.parentElement.hidden=!e,!0)}getCellRect(e){const t=new z,s=t.GetRect(e.parentElement),n=t.GetRect(e),i=new pt;return i.left=`${n.left}`,i.top=`${s.top}`,i.width=`${n.width}`,i.height=`${n.height}`,i}getTableOwnerRect(e){const t=new z,s=t.GetRect(e.parentElement.parentElement.parentElement.parentElement.parentElement);console.log(`[OWNER] ${s.left}, ${s.top}`);const n=t.GetRect(e.parentElement.parentElement.parentElement);console.log(`[TABLE] ${n.left}, ${n.top}`);const i=t.GetRect(e.parentElement.parentElement);console.log(`[TBODY] ${i.left}, ${i.top}`);const o=t.GetRect(e.parentElement);console.log(`[TROW] ${o.left}, ${o.top}`);const l=new pt;return l.left=`${n.left}`,l.top=`${s.top}`,l.width="0",l.height="0",l}makeCallerName(e,t){return`${e}:${t}`}getCallerCellElem(e){const t=e.split(":");if(t===void 0||t.length!==2)return null;const s=this.getRowElem(parseInt(t[1]));if(s===null)return null;const n=this.getCellElems(s);if(n===null)return null;for(const i of n)for(const o of i)if(o.className===t[0])return o;return null}async toClipboard(){const e=this.getTable();if(e===null)return!1;let t="";for(const n of e.rows){let i="";const o=this.getCellElems(n);if(o===null)return!1;for(const l of o){let a="";for(const r of l){const c=this.getElemValue(r);let m=c===null?"&null&":`&${c}&`;a.length!==0?a=`${a}	${m}`:a=m}i.length!==0?i=`${i}	${a}`:i=`${a}`}t.length!==0?t=`${t}
${i}`:t=`${i}`}const s=`table:{${t}}`;try{await navigator.clipboard.writeText(s)}catch(n){return console.error("コピー失敗...",n),!1}return!0}async fromClipboard(){const e=this.getTable();if(e===null)return!1;let t="";try{t=await navigator.clipboard.readText()}catch(o){return console.error("ペースト失敗...",o),!1}this.clipboardText=t;const s="table:{";if(t.length<s.length+1||t.startsWith(s)===!1||t.endsWith("}")===!1)return!1;t=t.substring(s.length),t=t.substring(0,t.length-1);const n=t.split(`
`);let i=0;for(const o of e.rows){const a=n[i].split("	"),r=this.getCellElems(o);if(r===null)return!1;if(a.length!==r.length)return console.log(`different column size : line ${i+1}`),!1;i++}i=0;for(const o of e.rows){const a=n[i].split("	"),r=this.getCellElems(o);if(r===null)return!1;let c=0;for(const m of r){let f=a[c];if(f.endsWith("\r")===!0&&(f=f.substring(0,f.length-1)),f.startsWith("&")!==!1&&f.endsWith("&")!==!1&&(f=f.substring(1,f.length-1),f!=="null")){for(const d of m){this.setElemValue(d,f);break}c++}}i++}return!0}getTable(){const e=`.${this.tableName}`,t=document.querySelectorAll(e);if(t===null||t.length<=0)return null;const n=t[0].querySelectorAll(e);return n===null||n.length<=0?null:n[0]}setFontConfig(e="0.9"){this.fontSize=`font-size: ${e}em;`}getCssText(e,t,s){return`
/* テーブル */
.${e} {
width: 100%;                /* テーブル全体を親要素いっぱいに広げる */
table-layout: fixed;        /* これが重要！これで td の％指定が絶対になります */
height: 300px;              /* ダイアログに合わせた固定高 */
overflow-y: auto;
${Q.scrollBarText}
}
.${e} tr {
background-color: #f5f5dc; /* ベージュ */
}
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
`.trim()}}class cs{constructor(){this.htmlMaker=new z,this.table=new he,this.gridElem=null,this.headerElem=null,this.footerElem=null}makeKeyCell(e,t,s){const n=new Wt;return n.typeInfo.setLabel(e,!1),n.className=t,n.typeInfo.toolTip=s,n}makePair(){return new Map}setPair(e){if(e.size===0)return!1;this.table.makeDim(2,e.size),e.forEach((s,n)=>{this.table.growCell(1,s.items.length)});let t=-1;return e.forEach((s,n)=>{t++,this.table.getCell(0,t).typeInfo.setLabel(n.typeInfo.using.label,!1),this.table.getCell(0,t).className=n.className;let i=-1;for(const o of s.items)i++,this.table.getCell(1,t,i).typeInfo=o.typeInfo,this.table.getCell(1,t,i).className=o.className}),!0}setListener(e,t,s,n="",i=""){this.dispose(),this.table.makeRowTemplate(t);const o=document.getElementById(s);if(o===null)return console.log(`[setListener] cannot found ${s}`),!1;const l=this.table.ToScrollHTML(e,e),a=new _;a.props.name="",a.props.id=e,a.props.className=e,a.props.option.setTable(l),a.props.option.onSelect=async m=>{console.log(`classify = ${m.classify} targetId = ${m.targetId}`),this.onSelect!==void 0&&await this.onSelect(m)},this.htmlMaker=new z,this.htmlMaker.add(a);const r=this.htmlMaker.ToHTML();let c=document.createElement("div");return c.className=e,c.innerHTML=r,this.gridElem=c.children[0],n!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=n,this.headerElem.id=n,o.appendChild(this.headerElem)),o.appendChild(this.gridElem),c.remove(),c=null,i!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=i,this.footerElem.id=i,o.appendChild(this.footerElem)),!0}getSelectedRow(){return this.table.getSelectedRow()}enableEvents(e){return this.gridElem===null?!1:(this.htmlMaker.enableTableEvents(this.gridElem.className),this.onSelect=e,!0)}disableEvents(){return this.gridElem===null?!1:(this.htmlMaker.disableTableEvents(this.gridElem.className),!0)}setVisible(e){return this.gridElem===null?!1:(this.gridElem.hidden=!e,!0)}dispose(){this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.gridElem!==null&&(this.gridElem.parentElement?.removeChild(this.gridElem),this.gridElem.remove()),this.disableEvents(),this.headerElem=null,this.footerElem=null,this.gridElem=null}getCssText(e,t,s){return this.table.getCssText(e,t,s)}}class St{constructor(){this.ctlName="",this.ovElem=null}firstAction(e,t){const s=document.getElementById(t);return s===null?(console.log(`[firstAction] cannot found ${t}`),null):(this.createOverlay(s),this.ctlName=e,s)}createOverlay(e){const t=document.createElement("div");t.id=`${this.ovCssName()}`,t.style.position="absolute",t.style.inset="0",t.style.zIndex=this.zIndexOv(),t.style.background="transparent",t.style.background="rgba(0,0,0,0.1)",e.appendChild(t),this.ovElem=t}getBaseElem(){return this.ovElem!==null?this.ovElem.parentElement:null}getOuterCssText(){return`
.${this.ctlName} {
  position: absolute;
  inset: auto;

  padding: 0;       /* 内側の余白をゼロに */
  border: none;     /* 枠線を消す（枠線があると1px〜ズレます） */
  overflow: hidden; /* 中身がはみ出さないように（任意） */

  ${Q.borderShadowText}

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
        `.trim()}dispose(){this.ovElem!==null&&(this.ovElem.parentElement?.removeChild(this.ovElem),this.ovElem.remove())}ovCssName(){return`${this.ctlName}-barrier`}zIndexCtl(){return"1000"}zIndexOv(){return"999"}}const _e={ByText:"ByText",ByValue:"ByValue",Both:"Both"};class hs extends St{constructor(){super(...arguments),this.ctlName="",this.initValue="",this.selectedIndex=-1,this.delimiter="/",this.callerName="",this.htmlMaker=new z,this.table=new he,this.ctlElem=null,this.onUpAction=async()=>{this.keyValuePairs!==void 0&&(this.selectedIndex=this.selectedIndex<=0?this.keyValuePairs.length-1:this.selectedIndex-1,this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]))},this.onDnAction=async()=>{this.keyValuePairs!==void 0&&(this.selectedIndex=this.selectedIndex>=this.keyValuePairs.length-1?0:this.selectedIndex+1,this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]))}}setListener(e,t,s){this.dispose(),this.callerName=s,this.ctlName=e;const n=new he;n.makeDim(1,3);let i=0;n.getCell(0,i).typeInfo.setButton("▲"),n.getCell(0,i).className=this.upCssName(),n.getCell(0,i).typeInfo.using.itemId=i,i++,n.getCell(0,i).typeInfo.setButton(""),n.getCell(0,i).className=this.valCssName(),n.getCell(0,i).typeInfo.using.itemId=i,i++,n.getCell(0,i).typeInfo.setButton("▼"),n.getCell(0,i).className=this.dwCssName(),n.getCell(0,i).typeInfo.using.itemId=i;const o=this.firstAction(e,t);if(o===null)return!1;const l=n.ToScrollHTML(e,e),a=new _;a.props.name="",a.props.id=this.tblCssName(),a.props.className=this.tblCssName(),a.props.option.setTable(l),a.props.option.onSelect=async d=>{switch(d.classify){case this.valCssName():if(this.onApply!==void 0){const p=new Fe;p.callerName=this.callerName,p.result=this.keyValuePairs[this.selectedIndex],await this.onApply(p)}break;case this.upCssName():if(this.onUp!==void 0){const p=new Fe;p.callerName=this.callerName,p.result=this.keyValuePairs[this.selectedIndex],await this.onUp(p),d.cancel||this.onUpAction()}break;case this.dwCssName():if(this.onDown!==void 0){const p=new Fe;p.callerName=this.callerName,p.result=this.keyValuePairs[this.selectedIndex],await this.onDown(p),d.cancel||this.onDnAction()}break}},this.htmlMaker=new z,this.htmlMaker.add(a);const r=this.htmlMaker.ToHTML();let c=document.createElement("dialog");c.className=e,c.innerHTML=r,this.ctlElem=c;let m=c.children[0],f=m.children[0];return f.className=`${this.tblCssName()}`,f.id=`${this.tblCssName()}`,this.ctlElem.appendChild(f),m.remove(),m=null,o.appendChild(this.ctlElem),this.table=n,!0}setSelectedByValue(e,t,s=_e.Both){const n=new Array;switch(s){case _e.ByText:n.push(0);break;case _e.ByValue:n.push(1);break;case _e.Both:n.push(0),n.push(1);break;default:return!1}this.initValue=e,this.keyValuePairs=t,this.selectedIndex=-1;const i=e.split(this.delimiter);let o=i.length>=2?i[1]:e,l="";for(const a of n){let r=-1;for(const c of t)if(r++,c!==null&&c!==""){const m=c.split(this.delimiter);if(m.length>=2&&m[a]===o){this.selectedIndex=r,l=m[0];break}}if(this.selectedIndex!==-1)break}if(this.selectedIndex===-1){const r=t[0].split(this.delimiter);this.selectedIndex=0,l=r[0]}return this.updateValueElemByText(l),this.selectedIndex!==-1}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-updn-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e,t,s){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onApply=e,this.onUp=t,this.onDown=s,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}updateValueElemByKeyValue(e){if(this.ctlElem===null)return;let t="";const s=e.split(this.delimiter);s.length>=2&&(t=s[0]),this.updateValueElemByText(t)}updateValueElemByText(e){if(this.ctlElem===null)return;const t=this.ctlElem.querySelectorAll(`.${this.valCssName()}`);t!==null&&(t[0].textContent=e)}tblCssName(){return`${this.ctlName}-tbl`}upCssName(){return`${this.ctlName}-upBtn`}dwCssName(){return`${this.ctlName}-dwBtn`}valCssName(){return`${this.ctlName}-values`}}class ct{constructor(){this.key="",this.text=""}}class ms extends St{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new z,this.table=new he,this.ctlElem=null}setChoiceItems(e){this.items=e}setListener(e,t,s){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const n=this.items.length,i=new he;i.makeDim(1,n);let o=0;for(const p of this.items)i.getCell(0,o).typeInfo.setButton(`${p.text}`),i.getCell(0,o).className=`${e}-${p.key}`,i.getCell(0,o).typeInfo.using.itemId=o,o++;const l=this.firstAction(e,t);if(l===null)return!1;const a=i.ToScrollHTML(e,e),r=new _;r.props.name="",r.props.id=this.tblCssName(),r.props.className=this.tblCssName(),r.props.option.setTable(a),r.props.option.onSelect=async p=>{if(console.log(`classify = ${p.classify} targetId = ${p.targetId}`),this.onSelect!==void 0){const u=parseInt(p.targetId),w=new Fe;w.callerName=this.callerName,w.result=0<=u&&u<this.items.length?this.items[u].key:"",await this.onSelect(w)}},this.htmlMaker=new z,this.htmlMaker.add(r);const c=this.htmlMaker.ToHTML();let m=document.createElement("dialog");m.className=e,m.innerHTML=c,this.ctlElem=m;let f=m.children[0],d=f.children[0];return d.className=`${this.tblCssName()}`,d.id=`${this.tblCssName()}`,this.ctlElem.appendChild(d),f.remove(),f=null,l.appendChild(this.ctlElem),this.table=i,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-updn-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
}
.${this.tblCssName()} button {
width: 100%;
white-space: nowrap;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}tblCssName(){return`${this.ctlName}-tbl`}}class us{constructor(){this.key="",this.text=""}}class ds extends St{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new z,this.table=new he,this.ctlElem=null,this.headerElem=null,this.footerElem=null}setGridtems(e){this.items=e}setListener(e,t,s,n="",i=""){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const o=this.items.length,l=new he;l.makeDim(2,o);let a=0;for(const y of this.items)l.getCell(0,a).typeInfo.setLabel(`${y.text}`,!1),l.getCell(0,a).className=this.keyCssName(),l.getCell(0,a).typeInfo.using.itemId=a,l.getCell(1,a).typeInfo=y.value.items[0].typeInfo,l.getCell(1,a).className=this.valueCssName(),l.getCell(1,a).typeInfo.using.itemId=a,a++;const r=this.firstAction(e,t);if(r===null)return!1;const c=l.ToScrollHTML(e,this.tblCssName()),m=new _;m.props.name="",m.props.id=this.tblCssName(),m.props.className=this.tblCssName(),m.props.option.setTable(c),m.props.option.onSelect=async y=>{if(this.onSelect!==void 0){const $=new Fe;$.callerName=y.classify,$.result=y.selectedValue,await this.onSelect($)}},this.htmlMaker=new z,this.htmlMaker.add(m);const f=this.htmlMaker.ToHTML();let d=document.createElement("dialog");d.className=e,d.innerHTML=f,this.ctlElem=d;let p=d.children[0];const u=this.divCssName();p.className=u,p.id=u;let w=p.children[0];return w.className=`${this.tblCssName()}`,w.id=`${this.tblCssName()}`,n!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=n,this.headerElem.id=n,d.appendChild(this.headerElem)),r.appendChild(this.ctlElem),i!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=i,this.footerElem.id=i,d.appendChild(this.footerElem)),this.table=l,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}setFontConfig(e="0.9"){this.table.setFontConfig(e)}applyCss(){const e=`${this.getBaseElem().className}-flgrd-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
${this.table.getCssText(this.divCssName(),this.keyCssName(),this.valueCssName())}
.${this.ctlName} {
width: 200px;
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}divCssName(){return`${this.ctlName}-div`}tblCssName(){return`${this.ctlName}-tbl`}keyCssName(){return`${this.ctlName}-key`}valueCssName(){return`${this.ctlName}-value`}}class fs{constructor(){this.itemType=A.Img,this.itemId=-1,this.label="",this.innerHTML=""}}class jt{constructor(){this.toolTip="",this.using=new fs}setButton(e){this.using.itemType=A.Btn,this.using.label=e}setLabel(e,t){this.using.itemType=t?A.Label:A.LabelRO,this.using.label=e}setCombo(e){this.using.itemType=A.Combo,this.using.combo=e}setInput(e){this.using.itemType=A.Input,this.using.input=e}setCheck(e){this.using.itemType=A.Chk,this.using.check=e}setImg(e){this.using.itemType=A.Img,this.using.img=e}setPlain(e){this.using.itemType=A.Plain,this.using.innerHTML=e}setTable(e){this.using.itemType=A.Table,this.using.innerHTML=e}ToButtonHTML(e){const t=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"";return`
<button class="${e}"${t}>${this.using.label}</button>
`.trim()}ToLableHTML(e){return`
<span class="${e}" data-readonly="false">${this.using.label}</span>
`.trim()}ToLableROHTML(e){return`
<span class="${e}" data-readonly="true">${this.using.label}</span>
`.trim()}ToComboHTML(e){if(this.using.combo===void 0)return"";const t=this.using.combo;let s=_.makeComboItemsHTML(t);const n=t.classify!==""?` data-classify="${t.classify}"`:"";return`
<select class="${e}" ${n} title="${this.toolTip}">
  ${s}
</select>
`.trim()}ToInputHTML(e){if(this.using.input===void 0)return"";const t=this.using.input,s=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"",n=t.value!==""?` value="${t.value}"`:"",i=t.placeholder!==""?` placeholder="${t.placeholder}"`:"";return`
<input type="${t.type}" class="${e}"${s}${n}${i} title="${t.placeholder}">
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
`.trim()}ToOverlayHTML(){return`<div class="overlay" title="${this.toolTip}"></div>`}}class ps{constructor(){this.name="",this.id="",this.className="",this.option=new jt}}class _{constructor(){this.props=new ps}ToHTML(e){let t="",s="";switch(e.option.using.itemType){case A.Btn:t=e.option.ToButtonHTML(e.className);break;case A.Label:t=e.option.ToLableHTML(e.className),s=e.option.ToOverlayHTML();break;case A.LabelRO:t=e.option.ToLableROHTML(e.className);break;case A.Plain:t=`
${e.option.using.innerHTML}
`.trim();break;case A.Combo:t=e.option.ToComboHTML(e.className);break;case A.Input:t=e.option.ToInputHTML(e.className);break;case A.Chk:t=e.option.ToCheckHTML(e.className);break;case A.Img:t=e.option.ToImgHTML(e.className,e.option.using.img.alt),s=e.option.ToOverlayHTML();break}return`
  ${t}
  ${s}
`.trim()}MakeSelectableHTML(){return`
<div class="${this.props.name}" id="${this.props.name}" item-id="${this.props.id}">
${this.ToHTML(this.props)}
</div>
`.trim()}static makeComboItemsHTML(e){if(e.selectionPair===void 0||e.selectionPair.length<=0)return"";let t="";for(const s of e.selectionPair){let[n,i]=s.split("/");i=i.trim();const o=e.selectedItem===i?" selected":"",l=`
<option value="${i}"${o}>${n}</option>
`.trim();t+=l}return t}}class z{constructor(){this._defaultButtonsName="dialog-buttons",this._defaultToolButtonsName="dialog-tool-btns",this._enableScrollEvt=!1,this._scrollTimer=null,this._isScrolling=!1,this.onButtonClicked=e=>{const t=e.target;if(t===null)return;const s=t.tagName==="BUTTON"?t:t.parentElement;if(s===null)return;let n=this.supplessSelected(s.className);if(n!==""){n=`.${n}`;const o=document.querySelectorAll(`${n}.selected`);o!==null&&o.forEach(l=>l.classList.remove("selected")),s.classList.add("selected")}const i=s.getAttribute("item-id");if(i){const o=this.itemList.find(l=>`${l.props.id}`===i);if(o){if(o.props.option.onSelect){let l="";t.tagName==="BUTTON"&&(l=t.getAttribute("item-id"),l===null&&(l=""));const a=new Me;a.parentElem=t.parentElement,a.item=o,a.targetId=l,o.props.option.onSelect(a)}this.selectedCh=o}else{let l=this.getTopElement(t);if(l?.tagName==="TABLE"){const a=l.className,r=this.itemList.find(c=>c.props.className===a);if(r){if(r.props.option.onSelect){let c="";t.tagName==="BUTTON"&&(c=t.getAttribute("item-id"),c===null&&(c=""));const m=new Me;m.parentElem=t.parentElement,m.item=r,m.targetId=c,m.classify=this.supplessSelected(t.className),r.props.option.onSelect(m)}this.selectedCh=r}}}}},this.onInputKeydown=e=>{const t=e.target;if(t===null||t.tagName!=="INPUT")return;const s=t,n=e;let i=$e.None;switch(n.key){case Re.Enter:i=$e.Normal;const l=n.repeat,a=n.timeStamp;let r=s.dataset.pressInfo;if(r===void 0)r=`1;${a}`,i=$e.Normal;else if(!l){const c=r.split(";");if(c.length===2){let m=parseInt(c[0]),f=parseFloat(c[1]);a-f>=4*1e3?m=1:(m++,m>=3&&(m=0,i=$e.Special)),r=`${m};${a}`}}s.dataset.pressInfo=r,n.preventDefault();break;case Re.Escape:s.value="元の値",s.blur();break;case Re.Tab:break;case Re.Process:return}const o=t.getAttribute("item-id");if(o){let l=this.getTopElement(t);if(l?.tagName==="TABLE"){const a=l.className,r=this.itemList.find(c=>c.props.className===a);if(r){const c=new Me;c.parentElem=t.parentElement,c.item=r,c.targetId=o,c.classify=this.supplessSelected(t.className),c.Keydown=n.key,c.KeyEnter=i,r.props.option.onSelect(c)}}}},this.onSelectChange=e=>{const t=e.target;if(t===null||t.tagName!=="SELECT")return;const s=t?.dataset.classify;let n=t.getAttribute("item-id");if(n===null){const i=this.getTopElement(t);i!==null&&(n=i.getAttribute("item-id"))}if(n){let i=this.itemList.find(o=>`${o.props.id}`===n);if(i===void 0&&(i=this.itemList.find(o=>`${s}${o.props.id}`===n)),i){if(i.props.option.onSelect){const o=new Me;o.parentElem=t.parentElement,o.item=i,o.targetId=n,o.classify=s===void 0?"?":s,o.selectedValue=t.value,i.props.option.onSelect(o)}this.selectedCh=i}}},this.itemList=new Array}add(e){this.itemList.push(e)}get DefaultBlueColor(){return"#86aef7e6"}get DefaultYellowColor(){return"#f7eb86e6"}get DefaultBorderColor(){return"#2c3e50ff"}MakeDefaultDialogParentCss(e,t,s,n=0){return`
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
  ${Q.borderShadowText}
}
`.trim()}MakeDefaultDialogCss(e){return`
.${e} {
  background-color: #f7eb86e6;
  border: 2px solid #2c3e50;
  padding: 10px;
  ${Q.borderShadowText}
}
`.trim()}ToHTML(){let e="";for(const t of this.itemList){if(t.props.option.using.itemType===A.Table){e+=t.props.option.using.innerHTML;continue}e+=t.MakeSelectableHTML()}return`${e}`}MakeTableScrollCss(e,t,s=!1){return`
.${e} {
height: ${t}px;              /* ダイアログに合わせた固定高 */
overflow-y: auto;
overflow-x: ${s?"auto":"hidden"};
-webkit-overflow-scrolling: touch;  /* iPad用の滑らか設定 */
border: 1px solid #7b1fa2;        /* 紫色の枠線 */
background: rgba(192, 192, 192, 0.6);
${Q.scrollBarText}
}
`.trim()}MakeScrollableList(e){let t="";for(const s of this.itemList)t+=s.MakeSelectableHTML();return`<div id="${e}" class="${e} scroll">
${t}
</div>`}MakeDefaultScrollCss(e,t){return`
.${e} .scroll {
max-height: ${t}px;
overflow-y: auto;
${Q.scrollBarText}
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
    ${this.GetDefaultButtonsCssText()}
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
    ${this.GetDefaultButtonsCssText()}
}`.trim()}GetDefaultButtonsCssText(){return`
background: #f7d98f;
color: black;
border: 1px solid #4d4949;
border-radius: 3px;
cursor: pointer;
transition: background 0.2s;
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
`.trim(),document.head.appendChild(s),!0}hideFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.add("hidden")}showFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.remove("hidden")}getFullScreenMsgElem(e){const t=document.getElementById(e);if(t){const s=t.querySelectorAll("p");return s!==null&&s.length>=1?s[0]:null}return null}initObserver(e,t){const s=document.getElementById(e);if(!s)return;const n=async l=>{await l.forEach(async a=>{if(a.isIntersecting){const r=a.target,c=this.isDemo&&!t.isMaterial(r.dataset.filename)?"demo.png":r.dataset.filename;if(console.log(`[${this.isDemo}] 見えた！:${r.dataset.filename}`),c&&r.src===""||r.src.startsWith(window.location.origin)){const m=await t.findNs(c);m===null||m===""?(this.observer.unobserve(r),console.log(`cannot set image : ${c}`)):await t.getImageUrlBy(c,m).then(f=>{f!==null?(r.src=f,this.observer.unobserve(r)):console.log(`pending set image : ${c}`)})}}})},i={root:s,rootMargin:"0px",threshold:.1};this.observer=new IntersectionObserver(n,i),s.querySelectorAll("img[data-filename]").forEach(l=>this.observer.observe(l)),console.log("[initObserver] enabled!")}get isDemo(){return window.EVONA_CONFIG.demo}get isScrolling(){return this._enableScrollEvt?!(this._scrollTimer!==null&&this._isScrolling):!1}enableScrollEvent(e){this._isScrolling=!1;const t=document.getElementById(e);return t?(this._enableScrollEvt=!0,t.addEventListener("scroll",()=>{this._isScrolling=!0,clearTimeout(this._scrollTimer),this._scrollTimer=setTimeout(()=>{this._scrollTimer=null,this._isScrolling=!1;const s=this.observer.takeRecords();console.log(`[enableScrollEvent] stopped ${s.length}`)},200)}),console.log("[enableScrollEvent] enabled!"),!0):!1}enableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(n=>{const i=n.querySelectorAll("img");i.length>=1&&(i[0],this.addButtonEvent(t,n));const o=n.querySelectorAll("span");o.length>=1&&o[0]?.dataset.readonly=="false"&&this.addButtonEvent(t,n);const l=n.querySelectorAll("select");l.length>=1&&(l[0],this.addSelectEvent(t,n));const a=n.querySelectorAll("button");if(a.length>=1)for(const r of a)console.log(`${n.tagName}::${t}::button::${r.innerHTML}`),n.addEventListener("click",this.onButtonClicked)})}enableTableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(n=>{const i=n.querySelectorAll("table");i.length>=1&&(i[0],n.addEventListener("click",this.onButtonClicked),n.addEventListener("keydown",this.onInputKeydown),n.addEventListener("change",this.onSelectChange))})}disableTableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(n=>{const i=n.querySelectorAll("table");i.length>=1&&(i[0],n.removeEventListener("click",this.onButtonClicked),n.removeEventListener("keydown",this.onInputKeydown),n.removeEventListener("change",this.onSelectChange))})}addButtonEvent(e,t){t.getAttribute("item-id")&&t.addEventListener("click",this.onButtonClicked)}addInputEvent(e,t){t.getAttribute("item-id")&&t.addEventListener("keydown",this.onInputKeydown)}addSelectEvent(e,t){t.addEventListener("change",s=>{const n=s.target,i=n?.dataset.classify,o=t.getAttribute("item-id");if(o){let l=this.itemList.find(a=>`${a.props.id}`===o);if(l===void 0&&(l=this.itemList.find(a=>`${i}${a.props.id}`===o)),l){if(l.props.option.onSelect){const a=new Me;a.item=l,a.targetId=o,a.classify=i===void 0?"?":i,a.selectedValue=n.value,l.props.option.onSelect(a)}this.selectedCh=l}}})}supplessSelected(e){let t=e,s=e.indexOf(" selected");return s>=0&&(t=e.substring(0,s)),t}getTopElement(e){let t=e.parentElement;for(;t!==null;){if(t.tagName==="DIV"){t=t.parentElement;continue}if(t.tagName==="TD"){t=t.parentElement;continue}if(t.tagName==="TR"){t=t.parentElement;continue}if(t.tagName==="TBODY"){t=t.parentElement;continue}break}return t}GetRect(e){const t=e.getBoundingClientRect(),s=new pt;return s.left=`${t.left}`,s.top=`${t.top}`,s.width=`${t.width}`,s.height=`${t.height}`,s}EnableElem(e,t){e.ariaDisabled=t?"false":"true"}IsEnabledElem(e){return e.ariaDisabled===null?!0:e.ariaDisabled==="false"}EnableId(e,t){const s=document.getElementById(e);return s===null?null:(this.EnableElem(s,t),t)}IsEnabledId(e){const t=document.getElementById(e);return t===null?null:this.IsEnabledElem(t)}ToElem(e){const t=document.createElement("div");if(t===null)return null;t.innerHTML=e;const s=t.firstElementChild;return t.remove(),s}ReplaceElem(e,t){if(t===null)return;const s=document.getElementsByClassName(e);if(s.length===0)return;const n=s[0],i=new Array;let o=-1,l=-1;for(const m of n.children)o++,m.className===t.className&&m.tagName===t.tagName?l=o:i.push(m);if(l===-1)return;const a=n.children.length,r=new Array;for(const m of n.children)r.push(m);for(const m of r)n.removeChild(m),m.remove();r.slice(0,r.length);let c=-1;for(o=0;o<a;o++)o===l?n.appendChild(t):(c++,n.appendChild(i[c]))}GetIdByIndex(e){return this.itemList[e].props.id}UnselectAll(e){const t=`.${e}`;document.querySelectorAll(`${t}.selected`).forEach(s=>s.classList.remove("selected"))}SelectByID(e,t){const s=this.FindByID(e,t);if(s){s.classList.add("selected");const n=s.getAttribute("item-id");if(n){const i=this.itemList.find(o=>`${o.props.id}`===n);i&&(this.selectedCh=i)}return s}return null}FindDivByClassName(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.querySelectorAll("div");for(const l of o)if(l.className===t||l.className.startsWith(t))return l}return null}FindByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t)return i}return null}FindImgByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("img");return l.length>=1?l[0]:null}}return null}FindImgsByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("img");return l.length>=1?l:null}}return null}FindDivByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("div");return l.length>=1?l[0]:null}}return null}FindSelectByID(e,t,s){const n=`.${e}`,i=document.querySelectorAll(`${n}`);for(const o of i){const l=o.getAttribute("item-id");if(l&&l===t){const a=o.querySelectorAll("select");if(a.length>=1){for(const r of a)if(r?.dataset.classify===s)return r}return null}}return null}ReplaceImg(e,t,s){const n=this.FindImgByID(e,t);return n===null?null:(n.dataset.filename,n.src=s,n)}ReplaceDivToolTip(e,t,s){const n=this.FindDivByID(e,t);return n===null?null:(n.title=s,n)}ReplaceImgToolTip(e,t,s){const n=this.FindImgByID(e,t);return n===null?null:(n.title=s,n)}SwapImgSrcAndPairToolTip(e,t){if(e===null||t===null)return!1;const s=e.parentElement,n=t.parentElement;let i=null,o=null;if(s!==null){for(const r of s.children)if(r.tagName==="DIV"){i=r;break}}if(n!==null){for(const r of n.children)if(r.tagName==="DIV"){o=r;break}}const l=e.src,a=t.src;if(e.src=a,t.src=l,i!==null&&o!==null){const r=i.title,c=o.title;i.title=c,o.title=r}else console.log("[SwapImgSrcAndBrosToolTip] cannot swap title");return!0}SetImgSrc(e,t){if(e===null)return null;e.dataset.filename,e.src=t}SetImgSize(e,t,s){if(e===null)return null;e.style.width=`${t}px`,e.style.height=`${s}px`}ReplaceComboItems(e,t,s){const n=this.FindSelectByID(e,t,s.classify);if(n===null)return null;n.querySelectorAll("option").length>=1&&(n.innerHTML="");const o=_.makeComboItemsHTML(s);return o!==""&&(n.innerHTML=o),n}setVisible(e,t){const s=document.getElementById(e);return s===null?null:(s.hidden=!t,!0)}copyCssToInlineStyle(e,t){for(const s of document.styleSheets){let n;try{n=s.cssRules}catch{continue}for(const i of n)if(i instanceof CSSStyleRule&&i.selectorText===e){const o=i.style;console.log(`[copyCssToInlineStyle] coping [${e}]`);for(let l=0;l<o.length;l++){const a=o[l],r=o.getPropertyValue(a);t.style.setProperty(a,r)}return}}}}const be={Hide:"Hide",CopyPaste:"CopyPaste"},Be={Hide:"Hide",MoveLowest:"MoveLowest"},Te={Hide:"Hide",DialogHide:"DialogHide"},Ae={Hide:"Hide",Help:"Help"},ce={Copy:"Copy",Paste:"Paste",Cancel:"Cancel"};class le{constructor(){this.title="",this.dlgName="",this.B2Type=be.Hide,this.B3Type=Be.MoveLowest,this.B4Type=Te.Hide,this.B5Type=Ae.Hide,this.initLeft=0,this.initTop=0,this.cornerIndex=-1,this.mover=new gs,this.moverOnMoveDone=async()=>{this.onMoveDone!==void 0&&(await this.onMoveDone(this.dlg),this.cornerIndex=0)},this.resizer=new ys,this.resizerOnResizeDone=async(e,t)=>{this.onResizeDone!==void 0&&await this.onResizeDone(this.dlg,e,t)},this.isIPad=/iPad|Macintosh/.test(navigator.userAgent)&&"ontouchend"in document,this.isTouchDevice=()=>"ontouchstart"in window||navigator.maxTouchPoints>0}SetB2Type(e=be.CopyPaste,t){this.B2Type=e,this.onCopyPaste=t}SetB3Type(e=Be.MoveLowest){this.B3Type=e}SetB4Type(e=Te.Hide){this.B4Type=e}SetB5Type(e=Ae.Help,t){this.B5Type=e,this.onHelp=t}NewDialog(e,t){this.dlgName=t;const s=document.createElement("dialog");s.id=t,s.className=t;const n=document.getElementById(e);return n.appendChild(s),this.dlgParent=n,this.dlg=s,s}SetContent(e,t,s=!0){const n=this.dlg,i=`<button class="${this.toolNameB0}" id="${this.toolNameB0}" title="DragMove">[＊]</button>`,o=`<button class="${this.toolNameB1}" id="${this.toolNameB1}" title="SideBy">[≫]</button>`;let l="";this.B2Type===be.CopyPaste&&(l=`<button class="${this.toolNameB2}" id="${this.toolNameB2}" title="Copy&Paste">[⇔]</button>`);let a="";this.B3Type===Be.MoveLowest&&(a=`<button class="${this.toolNameB3}" id="${this.toolNameB3}" title="MoveLowest">[_]</button>`);let r="";this.B4Type===Te.DialogHide&&(r=`<button class="${this.toolNameB4}" id="${this.toolNameB4}" title="Close">[×]</button>`);let c="";this.B5Type===Ae.Help&&(r=`<button class="${this.toolNameB5}" id="${this.toolNameB5}" title="Help">[？]</button>`);const m=`${i}${o}${l}${a}${r}${c}`;let f="";this.title!==""?f=`<div class="${this.titleName}">${this.title}${m}</div>`:f=`<div class="${this.titleName}">${m}</div>`;const d=document.createElement("div");d.innerHTML=f,n.innerHTML=t;const p=document.getElementById(e);p.hidden=s,p.appendChild(d),p.appendChild(n),this.applyCss()}EnableEventHandlers(){const e=this.dlgParent.style.left,t=this.dlgParent.style.top;this.initLeft=parseInt(e.substring(0,e.length-2)),this.initTop=parseInt(t.substring(0,t.length-2)),console.log(`[EnableEventHandlers] ${this.dlgParent.id}::(${e},${t})::(${this.initLeft},${this.initTop})`);const s=document.getElementById(`${this.toolNameB0}`);s!==null&&(this.mover.onMoveDone=this.moverOnMoveDone,this.mover.attach(s,this.dlgParent));const n=document.getElementById(`${this.toolNameB1}`);n!==null&&(n.onclick=async()=>{if(this.dlgParent===void 0)return;const i=window.innerWidth,o=window.innerHeight,l=this.dlgParent.offsetWidth/2,a=Math.max(this.dlgParent.offsetWidth,this.dlg.offsetWidth),r=this.dlgParent.offsetHeight+this.dlg.offsetHeight;switch(this.cornerIndex=(this.cornerIndex+1)%4,this.cornerIndex){case 0:this.dlgParent.style.left=`${l}px`,this.dlgParent.style.top="0px";break;case 1:this.dlgParent.style.left=`${i-a+l}px`,this.dlgParent.style.top="0px";break;case 2:this.dlgParent.style.left=`${i-a+l}px`,this.dlgParent.style.top=`${o-r}px`;break;case 3:this.dlgParent.style.left=`${l}px`,this.dlgParent.style.top=`${o-r}px`;break}}),this.B2Type===be.CopyPaste&&(document.getElementById(`${this.toolNameB2}`).onclick=async()=>{if(this.dlgParent===void 0||this.onCopyPaste===void 0)return;const i=this.dlgParent,o=i.querySelectorAll(`.${this.toolNameB2}`),l=o.length>=1?o[0]:null,a=new z;if(a.IsEnabledElem(l)===!1)return;const r=new Array,c=new ct;c.key=ce.Copy,c.text="クリップボードへコピー",r.push(c);const m=new ct;m.key=ce.Paste,m.text="クリップボードからペースト",r.push(m);const f=new ct;f.key=ce.Cancel,f.text="キャンセル",r.push(f);const d=new ms;d.setChoiceItems(r),a.EnableElem(l,!1);const p=a.GetRect(i);a.GetRect(this.dlg);const u=a.GetRect(l),w=this.dlg.className;d.setListener(`${w}-choice`,w,`${w}-B2`),d.applyCss(),d.show(`${parseInt(u.left)-parseInt(p.left)}`,"0"),d.enableEvents(async y=>{console.log(`[onSelect] ${y.callerName} ${y.result}`),d.dispose(),this.onCopyPaste(this.dlg,y.result),a.EnableElem(l,!0)})}),this.B3Type===Be.MoveLowest&&(document.getElementById(`${this.toolNameB3}`).onclick=async()=>{if(this.dlgParent===void 0)return;new M().MoveLowestLayer(this.dlgParent)}),this.B4Type===Te.DialogHide&&(document.getElementById(`${this.toolNameB4}`).onclick=async()=>{if(this.dlgParent===void 0)return;new z().setVisible(this.dlgParent.className,!1)}),this.B5Type===Ae.Help&&(document.getElementById(`${this.toolNameB5}`).onclick=async()=>{this.dlgParent!==void 0&&this.onHelp!==void 0&&await this.onHelp(this.dlg,this.B5Type)})}EnableResize(){if(this.isIPad&&this.isTouchDevice()){console.log("EVONA: Touch device detected. Priority given to flick scrolling.");return}const e=`<button class="${this.handleNameB0}" id="${this.handleNameB0}" title="Resize">[」]</button>`,t=document.createElement("div");t.className=this.handleName,t.id=this.handleName,t.innerHTML=`${e}`,this.dlg.appendChild(t);const s=document.getElementById(`${this.handleName}`);s!==null&&(s.style.position="absolute",s.style.left=`${this.dlg.clientWidth-s.clientWidth}px`,s.style.top=`${this.dlg.clientHeight-s.clientHeight}px`,this.resizer.onResizeDone=this.resizerOnResizeDone,this.resizer.attach(s,this.dlg))}static GetDialogInfo(e){const t=this.FindDialogParent(e);if(t===null)return null;const s=t.querySelector("dialog");if(s===null)return null;const n=new Ee,i=s.clientWidth,o=s.clientHeight;return n.name=e,n.left=t.style.left,n.top=t.style.top,n.width=`${i}px`,n.height=`${o}px`,n}static SetDialogInfo(e){const t=this.FindDialogParent(e.name);if(t===null)return!1;const s=t.querySelector("dialog");return s===null?!1:(t.style.left=e.left,t.style.top=e.top,s.style.width=e.width,s.style.height=e.height,!0)}static FindDialogParent(e){const t=document.getElementById(e);return t??null}get titleName(){return`${this.dlgName}-dlg-title-00`}get toolNameB0(){return`${this.dlgName}-dlg-tool-b0`}get toolNameB1(){return`${this.dlgName}-dlg-tool-b1`}get toolNameB2(){return`${this.dlgName}-dlg-tool-b2`}get toolNameB3(){return`${this.dlgName}-dlg-tool-b3`}get toolNameB4(){return`${this.dlgName}-dlg-tool-b4`}get toolNameB5(){return`${this.dlgName}-dlg-tool-b4`}get handleName(){return`${this.dlgName}-dlg-handle-00`}get handleNameB0(){return`${this.dlgName}-dlg-handle-b0`}applyCss_old(){const e=document.createElement("style");e.textContent=`
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
`.trim(),document.head.appendChild(e)}applyCss(){const e=`${this.dlgName}-header-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
/* タイトルバー全体 */
.${this.titleName} {
    display: flex;
    align-items: center;
    justify-content: space-between; /* 左右に振り分け */
${Q.titleColorText}
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
`.trim(),document.head.appendChild(t)}}class Ee{constructor(){this.name="",this.left="",this.top="",this.width="",this.height=""}copyTo(e){e.name=this.name,e.left=this.left,e.top=this.top,e.width=this.width,e.height=this.height}}class M{add(e){M.dlgElems.push(e)}AddDialogs(){M.dlgElems=new Array;const e=document.querySelectorAll("div");for(const t of e)t.style.zIndex!==""&&(parseInt(t.style.zIndex)>=M.ignoreIndex||t.querySelector("dialog")&&(console.log(`${t.id} added!`),this.add(t)))}AssignIndexies(){let e=M.dlgElems.length-1;for(const t of M.dlgElems)t.style.zIndex=`${e}`,e--}MoveLowestLayer(e){M.dlgElems.length;for(const t of M.dlgElems)if(t.id===e.id)t.style.zIndex="0";else{const s=t.style.zIndex;t.style.zIndex=`${parseInt(s)+1}`}}MoveHiestLayer(e){M.dlgElems.length;let t=-1;for(const s of M.dlgElems){const n=parseInt(s.style.zIndex);n>=M.ignoreIndex||n>t&&(t=n)}for(const s of M.dlgElems)if(s.id===e.id){s.style.zIndex=`${t}`;break}for(const s of M.dlgElems)if(s.id!==e.id){if(parseInt(s.style.zIndex)>=M.ignoreIndex)continue;t--,s.style.zIndex=`${t}`}}FindByName(e){const t=M.dlgElems.find(s=>s.id===e);return t||null}async ForEachAsync(e){for(const t of M.dlgElems)t.parentNode!==null&&await e(t.id)}ReOrder(){M.dlgElems.sort((e,t)=>{const s=e.style.zIndex,n=t.style.zIndex;if(s===""||n==="")throw new Error("z-index が未設定の要素が混入しています");return parseInt(t.style.zIndex)-parseInt(e.style.zIndex)})}async SaveSetting(e,t=!0){if(this.canSave&&e!==null&&e.parentElement!==null){if(t&&this.FindByName(e.parentElement.className)===null){console.log(`${e.className} is out of managed dlg`);return}await this.initSetting(),await M.setingAccess.saveDialogPos(e)}}async LoadAllSetting(){if(this.canSave){await this.initSetting();for(const e of M.dlgElems){const t=e.querySelector("dialog");t!==null&&await M.setingAccess.loadDialogPos(t)}}}async loadSetting(e){this.canSave&&(await this.initSetting(),e!==null&&await M.setingAccess.loadDialogPos(e))}async initSetting(){M.setingAccess===null&&(M.setingAccess=new Gt,await M.setingAccess.init())}get canSave(){return!new z().isDemo}}M.ignoreIndex=1e3;M.setingAccess=null;class gs{constructor(){this.isDragging=!1,this.startX=0,this.startY=0}attach(e,t){e.onpointerdown=s=>{e.setPointerCapture(s.pointerId),this.isDragging=!0,this.startX=s.clientX-t.offsetLeft,this.startY=s.clientY-t.offsetTop,e.style.cursor="grabbing"},e.onpointermove=s=>{if(!this.isDragging)return;const n=s.clientX-this.startX,i=s.clientY-this.startY;t.style.left=`${n}px`,t.style.top=`${i}px`,t.style.margin="0"},e.onpointerup=async s=>{this.isDragging=!1,e.releasePointerCapture(s.pointerId),e.style.cursor="grab",this.onMoveDone!==void 0&&await this.onMoveDone()}}}class ys{constructor(){this.isDragging=!1,this.startX=0,this.startY=0,this.startW=0,this.startH=0,this.handleX=0,this.handleY=0}attach(e,t){e.onpointerdown=s=>{e.setPointerCapture(s.pointerId),this.isDragging=!0,this.startX=s.clientX,this.startY=s.clientY;const n=t.getBoundingClientRect();console.log(`[${t.className}] (${n.left},${n.top}) - (${n.width},${n.height})`),this.startW=n.width,this.startH=n.height,this.handleX=e.offsetLeft,this.handleY=e.offsetTop,e.style.cursor="grabbing"},e.onpointermove=s=>{if(!this.isDragging)return;const n=s.clientX-this.startX,i=s.clientY-this.startY;t.style.width=`${this.startW+n-e.clientWidth}px`,t.style.height=`${this.startH+i-e.clientHeight}px`,e.style.left=`${this.handleX+n}px`,e.style.top=`${this.handleY+i}px`,e.style.margin="0"},e.onpointerup=async s=>{if(this.isDragging=!1,e.releasePointerCapture(s.pointerId),e.style.cursor="grab",this.onResizeDone!==void 0){const n=t.getBoundingClientRect();await this.onResizeDone(`${n.width-this.startW}`,`${n.height-this.startH}`)}}}}class ie{get iconFileName(){return this.id===null&&!Number.isNaN(this.id)?`${this.name}_${this.idAsText}.png`:`${this.name}_${this.id}.png`}constructor(e=0,t=""){this.ns=O.None,this.id=0,this.name="",this.contentURL="",this.iconURL="",this.idAsText="",this.idAttributeForHTML="",this.id=e,this.name=t}parseFromImgName(e){let t=e.indexOf("_");if(t>=0){const s=e.substring(0,t);let n=e.substring(t+1);if(t=n.indexOf("."),t>=0)return n=n.substring(0,t),this.id=Number.parseInt(n),this.name=s,this.idAsText=Number.isNaN(this.id)?n:"",!0}return!1}static copy(e,t){t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t.idAsText=e.idAsText,t.idAttributeForHTML=e.idAttributeForHTML}}class Cs{constructor(){this.itemName="",this.chNames=new Array,this.index=-1}reset(){this.itemName="",this.chNames=new Array,this.index=-1,this.onScroll=null}toCombo(e,t,s){this.reset();const n=`.${e}`,i=document.querySelectorAll(`${n} div[title*="${s}"]`);let o=-1,l="";for(const r of i){const c=r;console.log(c.title),o++;const m=c.title.trim(),f=m,p=`
 <option value="${m}"${o===0?" selected":""}>${f}</option>
`.trim();l+=p,this.chNames.push(f)}if(o===-1)return null;const a=document.createElement("select");return a.id=t,a.className=t,a.innerHTML=l,this.itemName=e,a}addEvent(e,t){e.addEventListener("change",s=>{const i=s.target.value;this.chNames.find(l=>l===i)&&this.scrollAction(i)}),this.onScroll=t}findFirst(){return this.chNames.length===0?!1:(this.index=0,this.scrollAction(this.chNames[this.index]),!0)}scroll(e){const t=`.${this.itemName}`,s=document.querySelector(`${t} div[title="${e}"]`);if(s===null)return null;const n=s.closest(t);return n===null?null:(n.scrollIntoView({behavior:"smooth",block:"center"}),s)}scrollAction(e){const t=this.scroll(e);t&&this.onScroll!==null&&this.onScroll(t)}}class Et{async LoadList(e){const n=(await new We().loadJson(e)).map(o=>Object.assign(new ie,o)),i=new Et;return i.chList=n,i}findNs(e){const t=this.chList.find(s=>s.id===e);return t?t.ns:O.None}findByNs(e){return e===O.None?void 0:this.chList.filter(s=>s.ns===e)}MakeList(){}}class bs{constructor(){this.uiInfo=new Ee,this.charFinder=new Cs,this.parentName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new M().SaveSetting(e)}}async toHTML(e){if(!this.chSet.chList)return"";this.htmlMaker=new z;let t=0;for(const s of this.chSet.chList){t++;const n=`chuid${t}`;s.idAttributeForHTML=n;const i="",o=new kt;o.imgSrc=i,o.imgFile=s.iconFileName;const l=new _;l.props.name=this.itemCssClassName(),l.props.id=n,l.props.className=this.imgCssClassName(),l.props.option.setImg(o),l.props.option.toolTip=s.name,l.props.option.onSelect=a=>{this.setSelectedItem(a.item.props.id)},this.htmlMaker.add(l)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createSelectorBox(e,t,s){this.parentName=t;const n=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="${this.charOpenUrlCssClassName()}">URL</button>
`),i=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${s}
    <label id="char-dlg-chinfo">未選択</label>
    <div class="${this.charSeachParentCssClassName()}" id="${this.charSeachParentCssClassName()}">
    <input type="text" id="${this.charSeachInputCssClassName()}" placeholder="キャラ名検索...">
    </div>
    ${n}
</div>`,o=new le;o.title="<"+e+">",o.SetB4Type(Te.DialogHide);const l=o.NewDialog(t,this.dlgCssClassName());return o.SetContent(t,i),this.applyCss(),o.EnableEventHandlers(),o.onMoveDone=this.moverOnMoveDone,l}addEventHandlers(e){document.getElementById(this.charSeachInputCssClassName()).oninput=t=>{if(t!==null&&t.target!==null){const s=t.target;console.log(s.value);const n=s.value,i=this.charSeachComboCssClassName(),o=document.getElementById(i);o!==null&&o.parentNode?.removeChild(o);const l=this.charFinder.toCombo(this.itemCssClassName(),i,n);if(l!==null){const a=document.getElementById(this.charSeachParentCssClassName());a!==null&&(a.appendChild(l),this.charFinder.addEvent(l,r=>{const m=r.parentElement.getAttribute("item-id");this.htmlMaker.SelectByID(this.itemCssClassName(),m)}),this.charFinder.findFirst())}}},document.getElementById(this.charOpenUrlCssClassName()).onclick=async()=>{if(this.selectedCh===void 0)return;const t=this.chSet.chList.find(s=>this.selectedCh.idAttributeForHTML===s.idAttributeForHTML);if(t){this.charOpenUrlCssClassName();const s=new ee;if(s.setParent(this.dlgCssClassName()),s.setYesNo(),await s.showWait(`${t.name} をブラウザで開いてよろしいですか？`)===E.Yes){const i=t.contentURL;window.open(i,"_blank")}}}}addItemEventHandlers(){const e=this.htmlMaker.GetIdByIndex(0);this.htmlMaker.SelectByID(this.itemCssClassName(),e),this.htmlMaker.enableEvents(this.itemCssClassName()),this.setSelectedItem(e)}setSelectedItem(e){const t=this.chSet.chList.find(s=>e===s.idAttributeForHTML);t&&(document.getElementById("char-dlg-chinfo").textContent=t.name,this.selectedCh=t)}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}itemCssClassName(){return"char-item"}imgCssClassName(){return"base"}listCssClassName(){return"char-list"}dlgContentCssClassName(){return"char-dlg-content"}dlgCssClassName(){return"char-dlg"}charSeachInputCssClassName(){return"char-search-input"}charSeachComboCssClassName(){return"char-search-combo"}charSeachParentCssClassName(){return"char-search-parent"}charOpenUrlCssClassName(){return"char-open-url"}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=parseInt(this.uiInfo.left),i=parseInt(this.uiInfo.top),o=document.createElement("style");o.textContent=`
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
`.trim(),document.head.appendChild(o);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}}class oe{constructor(){this.ns=O.None,this.id=0,this.name="",this.contentURL="",this.iconURL=""}static toJsonText(e){const t=oe.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new oe;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}static fromJsonInst(e){const t=new ie;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}}class Pe{constructor(){this.title="",this.key="",this.selectionPair=[],this.selectedVal="",this.initScoreVal=0,this.mulScoreVal=0,this.available=!1}get stdScore(){const e=this.selectedVal.length>=1?this.selectedVal:"1",t=parseInt(e);return this.initScoreVal+t*this.mulScoreVal}get selectedText(){if(this.selectionPair.length!==0&&this.selectedVal!=="")for(const e of this.selectionPair){const t=e.split("/");if(t[1]===this.selectedVal)return t[0]}}}class H{constructor(){this.ns=O.None,this.items=new Array,this.allow=new Map,this.roleText="",this.comboText=""}makeDemoLvText(e){let t="";for(let s=1;s<=100;s++)t+=`"${e}${s}/${s}",`;return t=t.substring(0,t.length-1),t}load(){const e=this.makeDemoLvText("Lv"),t=this.makeDemoLvText("Lv"),s=this.makeDemoLvText(""),n=`
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
`,o=JSON.parse(n).map(l=>Object.assign(new Pe,l));this.items=o}save(){console.log(JSON.stringify(this,null,2))}clone(){const e=new H;for(const t of this.items){const s=JSON.stringify(t,null,2),n=JSON.parse(s);e.items.push(n)}return e}static copy(e,t,s=!1){for(let n=0;n<e.items.length;n++){const i=e.items[n],o=s?new Pe:t.items[n];o.title=i.title,o.key=i.key,o.selectionPair=i.selectionPair,o.selectedVal=i.selectedVal,o.initScoreVal=i.initScoreVal,o.mulScoreVal=i.mulScoreVal,o.available=i.available,s&&t.items.push(o)}}set(e,t){const s=this.items.find(n=>n.key===e);return s?(s.selectedVal=t,!0):!1}get stdScore(){let e=0;for(const t of this.items)t.available&&(e+=t.stdScore);return e}get allAvailable(){for(const e of this.items)if(e.available===!1)return!1;return!0}static calcScore(e,t){const s=t.split("+");let n=0;for(const i of s){const o=i.trim();if(o.endsWith("()")){const l=o.slice(0,-2);typeof e[l]=="function"?n+=e[l]():console.warn(`関数 '${l}' が存在しません`)}else{const l=e[o];typeof l=="number"?n+=l:Array.isArray(l)?n+=l.reduce((a,r)=>a+r,0):console.warn(`プロパティ '${o}' が数値ではありません`)}}return n}static calcScoreAdvanced(e,t){const s=Object.keys(e),n=s.map(o=>e[o]);return new Function(...s,`return ${t};`)(...n)}toInst(e){return(n=>{const i=class{constructor(){n.forEach((o,l)=>{this[l]=o})}};return new i})(e)}}class ws{constructor(){this.intervalMs=1e3,this.isOneShot=!0,this.intervalTimer=null}start(e,t){this.intervalTimer!==null&&this.clear(),this.intervalTimer=setTimeout(async()=>{t!==void 0&&(await t(e)||this.clear()),this.isOneShot===!0&&this.clear()},this.intervalMs)}clear(){clearTimeout(this.intervalTimer),this.intervalTimer=null}}const ae={Resource:"Resource",ScoreUI:"ScoreUI",GameUI:"GameUI"},Se={Sequence:"Sequence",Text:"Text"};class xt{constructor(){this.key="",this.text=""}static copy(e,t){t.key=e.key,t.text=e.text}}class Ue extends xt{constructor(){super(...arguments),this.comment=""}static copy(e,t){t.key=e.key,t.text=e.text,t.comment=e.comment}}class Oe extends xt{constructor(){super(...arguments),this.selectType=Se.Sequence,this.start="",this.end="",this.step="",this.keyValue=""}static copy(e,t){t.key=e.key,t.text=e.text,t.selectType=e.selectType,t.start=e.start,t.end=e.end,t.step=e.step,t.keyValue=e.keyValue}get isScoreAvail(){if(this.key.trim().length===0||this.text.trim().length===0)return!1;if(this.selectType===Se.Sequence){if(this.start.trim().length===0||this.end.trim().length===0||this.step.trim().length===0)return!1}else if(this.keyValue.trim().length===0)return!1;return!0}}class ze extends xt{constructor(){super(...arguments),this.formation="",this.nsEnable=!1,this.nsCombo="",this.gameEnable=!1,this.gameCombo=""}static copy(e,t){t.key=e.key,t.text=e.text,t.formation=e.formation,t.nsEnable=e.nsEnable,t.nsCombo=e.nsCombo,t.gameEnable=e.gameEnable,t.gameCombo=e.gameCombo}}function Ns(){const h=e=>{const t=e,s=new Array;for(const n of t.inst){const i=new Ue;Ue.copy(n,i),s.push(i)}return s};return{gameType:G.none,editorType:ae.Resource,logType:fe.ResourceEditAction,fromJsonText:yt.fromJsonText,logToItem:h}}function Is(){const h=e=>{const t=e,s=new Array;for(const n of t.inst){const i=new ze;ze.copy(n,i),s.push(i)}return s};return{gameType:G.none,editorType:ae.GameUI,logType:fe.GameEditAction,fromJsonText:Ct.fromJsonText,logToItem:h}}function ks(h){const e=t=>{const s=t;if(s.gameType!==h)return;const n=new Array;for(const i of s.inst){const o=new Oe;Oe.copy(i,o),n.push(o)}return n};return{gameType:h,editorType:ae.ScoreUI,logType:fe.ScoreEditAction,fromJsonText:bt.fromJsonText,logToItem:e}}class gt{constructor(){this.resItem=new Ue,this.gameItem=new ze,this.scItem=new Oe}}class qt{constructor(){this.gameType=G.none,this.itemList=new Array,this.initNumItems=10}setConfig(e){e!==void 0&&(this.editorConfig=e,this.gameType=e.gameType)}init(){for(let e=0;e<this.initNumItems;e++){const t=new gt;t.owner=this,this.itemList.push(t)}}async load(e,t){const s=this.getEditor(e);if(s===void 0)return;const n=s.logType,o=await(await pe()).get(n);if(o===null)return;const l=n,a=new Map,r=new Array;this.usingLog(l,o,a,r),this.itemList=new Array;for(const[c,m]of a){const f=s.fromJsonText(m.log),d=s.logToItem(f);for(const p of d){const u=p,w=p,y=p,$=new gt;p instanceof Ue&&($.resItem=u,$.owner=this),p instanceof Oe&&($.scItem=w,$.owner=this),p instanceof ze&&($.gameItem=y,$.owner=this),this.itemList.push($)}}this.itemList.length===0&&this.init()}async loadUnused(e){const s=await(await pe()).get(e);if(s===null)return null;const n=new Map,i=new Array;return this.usingLog(e,s,n,i),i}usingLog(e,t,s,n){if(this.editorConfig!==void 0)for(const i of t){let l=this.editorConfig.fromJsonText(i.log).logType,a=!1,r=!1;switch(l){case ue.None:break;case ue.Add:a=!0;break;case ue.Update:a=!0;break;case ue.Delete:a=!0,r=!0;break}if(a)if(r){if(s.has(e)){const c=s.get(e);n.push(c),s.delete(e)}}else{if(s.has(e)){const c=s.get(e);n.push(c),s.delete(e)}s.set(e,i)}}}getEditor(e){return this.editorConfig}get editorType(){return this.editorConfig?.editorType}}class vt{constructor(){this.gameType=G.none}}function $s(){function h(){return`${n()}-key`}function e(){return`${n()}-text`}function t(){return`${n()}-comment`}function s(){return`${n()}-delete`}function n(){return`${ae.Resource}-edit-table-row`}const i=(d,p,u,w)=>{const y=new Y;y.value=p.resItem.key,y.placeholder="キー",w.getCell(d,u).typeInfo.setInput(y),w.getCell(d,u).className=h(),w.getCell(d,u).typeInfo.using.itemId=u+w.firstRowIndex},o=(d,p,u,w)=>{const y=new Y;y.value=p.resItem.text,y.placeholder="文字列",w.getCell(d,u).typeInfo.setInput(y),w.getCell(d,u).className=e(),w.getCell(d,u).typeInfo.using.itemId=u+w.firstRowIndex},l=(d,p,u,w)=>{const y=new Y;y.value=p.resItem.comment,y.placeholder="コメント",w.getCell(d,u).typeInfo.setInput(y),w.getCell(d,u).className=t(),w.getCell(d,u).typeInfo.using.itemId=u+w.firstRowIndex},a=(d,p,u,w)=>{w.getCell(d,u).typeInfo.setButton("削除"),w.getCell(d,u).className=s(),w.getCell(d,u).typeInfo.using.itemId=u+w.firstRowIndex},r=async(d,p,u)=>{const w=new yt;w.logType=ue.Add;for(const k of u){const N=new Ue;for(const g of k.cells)for(const L of g.children){if(L.className===s())continue;const I=p.getElemValue(L)||"";switch(L.className){case h():N.key=I;break;case e():N.text=I;break;case t():N.comment=I;break}}w.inst.push(N)}const y=yt.toJsonText(w);await(await pe()).put(fe.ResourceEditAction,y)},c=async(d,p)=>{switch(console.log(`classify = ${d.classify} targetId = ${d.targetId}`),d.classify){case s():const u=new ee;u.setParent(p.dlgCssClassName());let w=E.None;switch(u.setYesNo(),w=await u.showWait(`${d.targetId} を削除しますか？`),w){case E.Yes:break;case E.No:return;case E.Cancel:return}const y=parseInt(d.targetId);y>=1&&(p.table.deleteRow(y),p.table.redimAllRows(),p.itemList.splice(y-p.table.firstRowIndex,1));break}};function m(){return`
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
${Kt()}
}
`.trim()}const f=new vt;return f.editItems=[{className:h(),colConfig:i},{className:e(),colConfig:o},{className:t(),colConfig:l},{className:s(),colConfig:a}],f.makeLog=r,f.onSelect=c,f.getCssText=m,f}function Ts(){function h(){return`${a()}-key`}function e(){return`${a()}-text`}function t(){return`${a()}-select-type`}function s(){return`${a()}-seq-type-start`}function n(){return`${a()}-seq-type-end`}function i(){return`${a()}-seq-type-step`}function o(){return`${a()}-text-type`}function l(){return`${a()}-delete`}function a(){return`${ae.ScoreUI}-edit-table`}function r(){return`
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
${Kt()}
}
`.trim()}const c=(g,L,I,C)=>{const x=new Y;x.value=L.scItem.key,x.placeholder="キー",C.getCell(g,I).typeInfo.setInput(x),C.getCell(g,I).className=h(),C.getCell(g,I).typeInfo.using.itemId=I+C.firstRowIndex},m=(g,L,I,C)=>{const x=new Y;x.value=L.scItem.text,x.placeholder="文字列",C.getCell(g,I).typeInfo.setInput(x),C.getCell(g,I).className=e(),C.getCell(g,I).typeInfo.using.itemId=I+C.firstRowIndex},f=(g,L,I,C)=>{const x=new $t;x.selectionPair=[`連続/${Se.Sequence}`,`文字列/${Se.Text}`],x.selectedItem=L.scItem.selectType,x.classify="selectType",C.getCell(g,I).typeInfo.setCombo(x),C.getCell(g,I).className=t(),C.getCell(g,I).typeInfo.using.itemId=I+C.firstRowIndex},d=(g,L,I,C)=>{const x=new Y;x.value=L.scItem.start,x.placeholder="開始",C.getCell(g,I).typeInfo.setInput(x),C.getCell(g,I).className=s(),C.getCell(g,I).typeInfo.using.itemId=I+C.firstRowIndex},p=(g,L,I,C)=>{const x=new Y;x.value=L.scItem.end,x.placeholder="終了",C.getCell(g,I).typeInfo.setInput(x),C.getCell(g,I).className=n(),C.getCell(g,I).typeInfo.using.itemId=I+C.firstRowIndex},u=(g,L,I,C)=>{const x=new Y;x.value=L.scItem.step,x.placeholder="ステップ",C.getCell(g,I).typeInfo.setInput(x),C.getCell(g,I).className=i(),C.getCell(g,I).typeInfo.using.itemId=I+C.firstRowIndex},w=(g,L,I,C)=>{const x=new Y;x.value=L.scItem.keyValue,x.placeholder="key/valueを&quot;,&quot;で区切った文字列",C.getCell(g,I).typeInfo.setInput(x),C.getCell(g,I).className=o(),C.getCell(g,I).typeInfo.using.itemId=I+C.firstRowIndex},y=(g,L,I,C)=>{C.getCell(g,I).typeInfo.setButton("削除"),C.getCell(g,I).className=l(),C.getCell(g,I).typeInfo.using.itemId=I+C.firstRowIndex},$=async(g,L,I)=>{const C=new bt;C.logType=ue.Add,C.gameType=g;for(const Z of I){const K=new Oe;for(const at of Z.cells)for(const Ne of at.children){if(Ne.className===l())continue;const te=L.getElemValue(Ne)||"";switch(Ne.className){case h():K.key=te;break;case e():K.text=te;break;case t():K.selectType=te;break;case s():K.start=te;break;case n():K.end=te;break;case i():K.step=te;break;case o():K.keyValue=te;break}}C.inst.push(K)}const x=bt.toJsonText(C);await(await pe()).put(fe.ScoreEditAction,x)},k=async(g,L)=>{switch(console.log(`classify = ${g.classify} targetId = ${g.targetId}`),g.classify){case h():await L.showUpDn(g,Es());break;case s():await L.showUpDn(g,ht());break;case n():await L.showUpDn(g,ht());break;case i():await L.showUpDn(g,ht());break;case l():const I=new ee;I.setParent(L.dlgCssClassName());let C=E.None;switch(I.setYesNo(),C=await I.showWait(`${g.targetId} を削除しますか？`),C){case E.Yes:break;case E.No:return;case E.Cancel:return}const x=parseInt(g.targetId);x>=1&&(L.table.deleteRow(x),L.table.redimAllRows(),L.itemList.splice(x-L.table.firstRowIndex,1));break}},N=new vt;return N.editItems=[{className:h(),colConfig:c},{className:e(),colConfig:m},{className:t(),colConfig:f},{className:s(),colConfig:d},{className:n(),colConfig:p},{className:i(),colConfig:u},{className:o(),colConfig:w},{className:l(),colConfig:y}],N.makeLog=$,N.onSelect=k,N.getCssText=r,N}function Ss(){function h(){return`${o()}-name`}function e(){return`${o()}-form`}function t(){return`${o()}-ns`}function s(){return`${o()}-ns-combo`}function n(){return`${o()}-game`}function i(){return`${o()}-game-combo`}function o(){return`${ae.GameUI}-edit-table`}const l=(y,$,k,N)=>{const g=new Y;g.value=$.gameItem.text,g.placeholder="ゲーム名",N.getCell(y,k).typeInfo.setInput(g),N.getCell(y,k).className=h(),N.getCell(y,k).typeInfo.using.itemId=k+N.firstRowIndex},a=(y,$,k,N)=>{const g=new Y;g.value=$.gameItem.formation,g.placeholder="編成数",N.getCell(y,k).typeInfo.setInput(g),N.getCell(y,k).className=e(),N.getCell(y,k).typeInfo.using.itemId=k+N.firstRowIndex},r=(y,$,k,N)=>{const g=new Ot;g.value=$.gameItem.nsEnable,g.placeholder="NS有効",N.getCell(y,k).typeInfo.setCheck(g),N.getCell(y,k).className=t(),N.getCell(y,k).typeInfo.using.itemId=k+N.firstRowIndex,N.getCell(y,k).typeInfo.toolTip="NS<br>有効"},c=(y,$,k,N)=>{const g=new Y;g.value=$.gameItem.nsCombo,g.placeholder="NSコンボ数",N.getCell(y,k).typeInfo.setInput(g),N.getCell(y,k).className=s(),N.getCell(y,k).typeInfo.using.itemId=k+N.firstRowIndex},m=(y,$,k,N)=>{const g=new Ot;g.value=$.gameItem.gameEnable,g.placeholder="GM有効",N.getCell(y,k).typeInfo.setCheck(g),N.getCell(y,k).className=n(),N.getCell(y,k).typeInfo.using.itemId=k+N.firstRowIndex,N.getCell(y,k).typeInfo.toolTip="GM<br>有効"},f=(y,$,k,N)=>{const g=new Y;g.value=$.gameItem.gameCombo,g.placeholder="GMコンボ数",N.getCell(y,k).typeInfo.setInput(g),N.getCell(y,k).className=i(),N.getCell(y,k).typeInfo.using.itemId=k+N.firstRowIndex},d=async(y,$,k)=>{const N=new Ct;N.logType=ue.Add;for(const I of k){const C=new ze;for(const x of I.cells)for(const we of x.children){const Z=$.getElemValue(we)||"";switch($.findInputElem(we).className){case h():C.key=Z;break;case e():C.formation=Z;break;case t():C.nsEnable=Z;break;case s():C.nsCombo=Z;break;case n():C.gameEnable=Z;break;case i():C.gameCombo=Z;break}}console.log(C),N.inst.push(C)}const g=Ct.toJsonText(N);await(await pe()).put(fe.GameEditAction,g)},p=async(y,$)=>{console.log(`classify = ${y.classify} targetId = ${y.targetId}`)};function u(){const y=`${t()}`,$=`${n()}`;return`
.${h()} {
height: 90%;
}
.${e()} {
height: 90%;
width: 45px;
}

.${y} {
height: 90%;
}
${Q.sliderText(y,"80")}
.${s()} {
height: 90%;
width: 45px;
}

.${$} {
height: 90%;
}
${Q.sliderText($,"80")}
.${i()} {
height: 90%;
width: 45px;
}
`.trim()}const w=new vt;return w.editItems=[{className:h(),colConfig:l},{className:e(),colConfig:a},{className:t(),colConfig:r},{className:s(),colConfig:c},{className:n(),colConfig:m},{className:i(),colConfig:f}],w.makeLog=d,w.onSelect=p,w.getCssText=u,w}function Kt(){return`
width: 100%;
height: 100%;
white-space: nowrap;
background: #e91e63; /* ピンクがかった赤（ポップな警告色） */
color: white;
border-radius: 4px;
padding: 4px 12px;
`.trim()}function Es(){const h=Object.values(v),e=new Array;for(const t of h){const s=t;e.push(`${s}/${s}`)}return e}function ht(){const h=new Array;h.push("1/1");for(let e=1;e<=30;e++){const t=`${e*10}`;h.push(`${t}/${t}`)}return h}class mt extends qt{constructor(){super(...arguments),this.uiInfo=new Ee,this.canAdd=!0,this.parentName="",this.saveTimer=null,this.onSave=async e=>(console.log(`${e.parentName}`),!1),this.updn=null,this.isEnableWindowEvent=!1,this.onWindowKeyboard=e=>{e.key===Re.Escape&&this.isEnableWindowEvent&&(this.disableWindowEvent(),this.closeUpDn())},this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new M().SaveSetting(e)},this.resizerOnResizeDone=async(e,t,s)=>{console.log(`[${e.className}] resized (${t}, ${s})`);const n=parseInt(s),i=document.getElementById(this.dlgContentCssClassName());if(i!==null){i.style.width===""?i.offsetWidth:parseInt(i.style.width),i.style.maxWidth="none";const o=i.style.height===""?i.offsetHeight:parseInt(i.style.height);i.style.maxHeight="none",i.style.height=`${o+n}px`;const l=i.querySelectorAll(`.${this.tableCssClassName()}`);if(l!==null){const a=l[0],r=a.style.height===""?a.offsetHeight:parseInt(a.style.height);a.style.maxHeight="none",a.style.height=`${r+n}px`}}},this.onCopyPaste=async(e,t)=>{switch(console.log(`[${e.className}] selected [${t}]`),t){case ce.Copy:await this.table.toClipboard();break;case ce.Paste:await this.table.fromClipboard();break}}}async startAutoSave(){this.saveTimer=new ws,this.saveTimer.intervalMs=1e3,this.saveTimer.isOneShot=!1,this.saveTimer.start(this,this.onSave)}setRow(e,t,s){const n=this.config.editItems;if(n===void 0)return;let i=-1;for(const o of n)i++,o.colConfig(i,e,t,s)}toHTML(e){if(!this.itemList)return"";e.gameType=this.gameType,this.config=e;const s=e.editItems.length,n=new he;if(this.itemList.length>=1)n.makeDim(s,this.itemList.length),this.itemList.forEach((a,r)=>{this.setRow(a,r,n)}),n.makeRowTemplate(this.tableRowCssClassName()),this.table=n;else{n.makeDim(s,1);const a=new gt;this.setRow(a,0,n),n.makeRowTemplate(this.tableRowCssClassName()),n.clearRows(),this.table=n}const i=this.tableCssClassName(),o=this.table.ToScrollHTML(i,i);this.htmlMaker=new z;const l=new _;return l.props.name="",l.props.id=i,l.props.className=i,l.props.option.setTable(o),l.props.option.onSelect=async a=>{console.log(`classify = ${a.classify} targetId = ${a.targetId}`),this.config.onSelect(a,this)},this.htmlMaker.add(l),this.htmlMaker.ToHTML()}checkValidStatus(e){return Object.values(v).find(n=>e)!==void 0}async showUpDn(e,t){if(e.KeyEnter===$e.Special){if(this.updn!==null)return;const s=this.table.getCellRect(e.parentElem),n=this.table.getTableOwnerRect(e.parentElem),i=this.table.makeCallerName(e.classify,e.targetId),o=this.table.getCallerCellElem(i);let l="";o!==null&&(l=o.value);const a=new hs;a.setListener("updn",this.dlgContentCssClassName(),i),a.setSelectedByValue(l,t),a.applyCss(),a.show(`${parseInt(s.left)-parseInt(n.left)+10}`,`${parseInt(s.top)-parseInt(n.top)+10}`),a.enableEvents(r=>{console.log(`[onApply] ${r.callerName} ${r.result}`);const c=this.table.getCallerCellElem(r.callerName);if(c!==null){const m=c;m.value=r.result}this.closeUpDn()},r=>{console.log(`[onUp] ${r.callerName} ${r.result}`)},r=>{console.log(`[onDown] ${r.callerName} ${r.result}`)}),this.enableWindowEvent(),this.updn=a}}closeUpDn(){this.disableWindowEvent(),this.updn!==null&&(this.updn.dispose(),this.updn=null)}createEditorBox(e,t,s){this.parentName=t;let n="";this.canAdd&&(n=`<button id="${this.rowAddCssClassName()}">追加</button>`);const i=this.htmlMaker.MakeDefaultButtonsHTML(`
${n}
<button id="${this.applyCssClassName()}">保存</button>
`),o=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
   ${i}
   ${s}
</div>`,l=new le;l.title="<"+e+">",l.SetB2Type(be.CopyPaste,this.onCopyPaste);const a=l.NewDialog(t,this.dlgCssClassName());return l.SetContent(t,o,!1),this.applyCss(),l.EnableEventHandlers(),l.onMoveDone=this.moverOnMoveDone,this.dialogDesc=l,a}addEventHandlers(e){const t=document.getElementById(this.rowAddCssClassName());t!==null&&(t.onclick=async()=>{if(await this.confirmMsgBox("行を追加しますか？")===!1)return;const n=this.tableRowCssClassName();this.table.addRow(n)}),document.getElementById(this.applyCssClassName()).onclick=async()=>{if(await this.confirmMsgBox("保存しますか？")===!1)return;const n=this.table.getRowElems();n!==null&&await this.config.makeLog(this.config.gameType,this.table,n)}}enableWindowEvent(){return this.isEnableWindowEvent?!1:(this.isEnableWindowEvent=!0,window.addEventListener("keydown",this.onWindowKeyboard),!0)}disableWindowEvent(){return this.isEnableWindowEvent?(window.removeEventListener("keydown",this.onWindowKeyboard),this.isEnableWindowEvent=!1,!0):!1}addItemEventHandlers(){this.htmlMaker.enableTableEvents(this.tableCssClassName())}enableResize(){this.dialogDesc.onResizeDone=this.resizerOnResizeDone,this.dialogDesc.EnableResize()}async confirmMsgBox(e){const t=new ee;t.setParent(this.dlgCssClassName());let s=E.None;switch(t.setYesNo(),s=await t.showWait(e),s){case E.Yes:break;case E.No:return!1;case E.Cancel:return!1}return!0}rowAddCssClassName(){return`${this.editorType}-edit-add`}applyCssClassName(){return`${this.editorType}-edit-apply`}tableRowCssClassName(){return`${this.editorType}-edit-table-row`}tableCssClassName(){return`${this.editorType}-edit-table`}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return`${this.editorType}-edit-dlg`}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=this.uiInfo.height!==""?parseInt(this.uiInfo.height):400,n=document.createElement("style");n.textContent=`
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
`.trim(),document.head.appendChild(n);const i=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,i)}}const ue={None:"None",Add:"Add",Delete:"Delete",Update:"Update"};class Mt{constructor(){this.logType=ue.None}}class yt extends Mt{constructor(){super(...arguments),this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class Ct extends Mt{constructor(){super(...arguments),this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class bt extends Mt{constructor(){super(...arguments),this.gameType=G.none,this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class ot{constructor(){this.fileNames=null,this.minMap=new Map,this.maxMap=new Map,this.rangeMap=new Map,this.digLenMax=0,this.nMul=0,this.table=[{key:v.pqStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:v.pqStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:v.pqStatusREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:v.pqTokkunHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:v.pqTokkunATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:v.pqTokkunREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:v.pqTokuSp1,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:v.pqTokuSp2,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:v.mmStatusFGT,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusPDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusACC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusEVA,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusCRI,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusMDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusCRD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusDEF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmStatusSPD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmAbilityDEX,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmAbilityMGC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmAbilityDUR,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:v.mmRole,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}}],this.rolePriolity=[{roleKey:Ye.RlAttacker,priority:Ze.priHi,statusKey:[v.mmAbilitySTR,v.mmStatusATK,v.mmStatusSPD]},{roleKey:Ye.RlHealer,priority:Ze.priHi,statusKey:[v.mmAbilityMGC,v.mmStatusMDF,v.mmStatusHP]},{roleKey:Ye.RlDebuffer,priority:Ze.priHi,statusKey:[v.mmAbilityDEX,v.mmStatusACC,v.mmStatusHP]},{roleKey:Ye.RlBuffer,priority:Ze.priHi,statusKey:[v.mmStatusPDF,v.mmStatusHP,v.mmStatusDEF]}]}async loadDB(e){const t=new We,s=await t.loadBinFile(e);if(t.isWebRunning)this.zip=await window.JSZip.loadAsync(s);else{const{loadZipNode:n}=await import(t.nodeToolsImportFilename);this.zip=await n(s)}return this.fileNames=Object.keys(this.zip.files),!0}async enumStatus(e){if(this.fileNames!==null)for(const t of this.fileNames){const s=await this.getFileContent(t);if(s===null||e===void 0)continue;if(!e(t,s))break}}async debugCombo(){await this.enumStatus((e,t)=>{for(const s of t)s.useCombo&&console.log(`${e}:[${s.value}]`);return!0})}async loadAuxScoreSet(e){const t=new qt;await t.load(ae.ScoreUI,e);const s=new H;for(const n of t.itemList){const i=n.scItem;if(!n.scItem.isScoreAvail)continue;const o=new Pe;switch(o.title=i.text,o.key=i.key,o.available=!1,i.selectType){case Se.Sequence:const l=this.auxScoreTextToValue(i.start),a=this.auxScoreTextToValue(i.end),r=this.auxScoreTextToValue(i.step),c=new Array;for(let d=l;d<=a;d+=r)c.push(`${d}/${d}`);o.selectionPair=c,o.selectedVal=`${l}`,o.initScoreVal=l,o.mulScoreVal=r,c.length>=1&&(o.available=!1);break;case Se.Text:const m=i.keyValue.split(",");let f="";for(const d of m){const p=d.split("/");if(p.length>=2){f=p[1];break}}o.selectionPair=m,o.selectedVal=f,o.initScoreVal=0,o.mulScoreVal=0,m.length>=1&&(o.available=!1);break}s.items.push(o)}return this.auxScoreSet=s,s}auxScoreTextToValue(e){const t=e.split("/"),s=t.length===1?t[0]:t[1];return parseInt(s)}async getMinMax(){await this.enumStatus((e,t)=>{for(const s of t){if(s.useCombo)continue;let n=parseInt(this.itemValue(s));if(!this.minMap.has(s.key))this.minMap.set(s.key,n);else{const i=this.minMap.get(s.key);i===void 0?this.minMap.set(s.key,n):i>n&&this.minMap.set(s.key,n)}if(!this.maxMap.has(s.key))this.maxMap.set(s.key,n);else{const i=this.maxMap.get(s.key);i===void 0?this.maxMap.set(s.key,n):i<n&&this.maxMap.set(s.key,n)}}return!0})}async getRanges(){await this.getMinMax(),this.digLenMax=0;for(const[e,t]of this.minMap){const s=t,n=this.maxMap.get(e);let i=0;if(s!==void 0&&n!==void 0&&(i=n-s),i<=0&&(i=1),this.rangeMap.set(e,i),n!==void 0){const o=Math.log10(n);o>this.digLenMax&&(this.digLenMax=o)}}this.nMul=this.digLenMax>0?Math.pow(10,Math.ceil(this.digLenMax)):1;for(const[e,t]of this.minMap)console.log(`[${e}] = ${this.minMap.get(e)},${this.maxMap.get(e)} ${this.rangeMap.get(e)}`);console.log(`digLenMax=[${this.digLenMax}] nMul=[${this.nMul}]`)}stdBy(e,t){let s,n;if(this.rangeMap.has(e)&&(s=this.rangeMap.get(e)),this.minMap.has(e)&&(n=this.minMap.get(e)),s===void 0||n===void 0||this.isNumeric(t)===!1)return null;s<=0&&(s=1);const i=(parseInt(t)-n)*s;return this.nMul*i}getFilename(e){let t=null;for(let s of this.fileNames){let n=s.indexOf("_");if(n>=0){let i=s.substring(n+1);if(n=i.indexOf("."),n>=0&&(i=i.substring(0,n)),i===e){t=s;break}}}return t}async getFileContent(e){if(e===null)return null;const t=this.zip.file(e);if(t){const s=await t.async("string");return JSON.parse(s)}return null}async getStatus(e){this.digLenMax===0&&await this.getRanges();const t=this.getFilename(e);if(t===null)return null;const s=await this.getFileContent(t);if(s===null)return null;let n=null;for(const a of s)if(!a.useCombo){for(const r of this.rolePriolity)if(r.statusKey.find(m=>m===a.key)){n=r,console.log(`find role : ${n.roleKey}`);break}if(n!==null)break}const i=new H;if(n!==null)for(const a of s){if(a.useCombo)continue;if(n.statusKey.find(c=>c===a.key)){const c=this.table.find(m=>m.key===a.key);if(c){const m=c.scoreFunc(a.key,this.itemValue(a));m.title=a.disp,m.key=a.key,m.selectedVal="1",i.items.push(m)}}}else for(const a of s){if(a.useCombo)continue;const r=this.table.find(c=>c.key===a.key);if(r){const c=r.scoreFunc(a.key,this.itemValue(a));c.title=a.disp,c.key=a.key,c.selectedVal="1",i.items.push(c)}}const o=new H;H.copy(this.auxScoreSet,o,!0),i.items=i.items.concat(o.items);const l=parseInt(e);return i.ns=this.charSpecSet.findNs(l),i}async getComboKeywords(e){let t=0;const s=new Map,n=new Map;for(const i of e){const o=this.getFilename(i);if(o===null)return null;const l=await this.getFileContent(o);if(l===null)return null;const a=new Map;for(const r of l){if(!r.useCombo)continue;const c=r.value.split(",");for(const m of c)if(a.has(m)===!1)a.set(m,1);else{const f=a.get(m);a.set(m,f+1)}}if(a.size===0){t=0,n.clear();continue}for(const[r,c]of a)if(n.has(r)===!1)n.set(r,c);else{const m=n.get(r);n.set(r,m+c)}if(t++,!(t<=2))for(const[r,c]of n)c>=3&&s.set(r,c)}}async debugCheckCombo(){const e=new Array;e.push("119599"),e.push("119603"),e.push("119624"),await this.getComboKeywords(e)}isNumeric(e){return e.trim()===""?!1:!isNaN(Number(e))}itemValue(e){return e.converted===""?e.value:e.converted}toScoreMaxNum(e,t){return this.isNumeric(t)===!1?null:ot.useStdConv?this.stdBy(e,t):t!==""?parseInt(t):1}scoreFunc(e,t){const s=new Pe;if(e===null)return s;s.mulScoreVal=e/t;for(let n=1;n<=t;n++){const i=Math.ceil(e/t*n);s.selectionPair.push(`Lv${n}/${n}`),n===1&&(s.initScoreVal=i)}return s.available=!0,s}scoreFuncOld(e,t){const s=new Pe;if(this.isNumeric(e)===!1)return s;let n=e!==""?parseInt(e):1;s.mulScoreVal=n/t;for(let i=1;i<=t;i++){const o=Math.ceil(n/t*i);s.selectionPair.push(`Lv${i}/${i}`),i===1&&(s.initScoreVal=o)}return s.available=!0,s}puyoToku(e){return e==="enable"?10:1}}ot.useStdConv=!1;const Ze={priHi:0},Ce={None:"None",UI:"UI",Menu:"Menu"};class ne{constructor(){this.dockType=Ce.None,this.iconFileName="",this.toolTip="",this.idAttributeForHTML=""}get labelWrap(){let e=this.toolTip,t=this.toolTip.length;if(t>3){const s=t%2===0?t/2:t/2+1,n=e.substring(0,s),i=e.substring(s);e=n+`
`+i}return e}setAsDlg(e,t){this.dockType=Ce.UI,this.dlg=e,this.toolTip=t}setAsMenu(e){this.dockType=Ce.Menu,this.toolTip=e}get isUIType(){return this.dockType==Ce.UI}get isMenuType(){return this.dockType==Ce.Menu}ToggleStatus(){this.dlg===void 0||this.dlg===null||(this.dlg.hidden=!this.dlg.hidden)}}class lt{constructor(){this.items=new Array,this.parentName="",this.listName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new M().SaveSetting(e,!1)},this.onHelp=async(e,t)=>{await vs()}}add(e){return e.dockType==Ce.UI&&(e.dlgParent=e.dlg.parentElement),this.items.push(e),!0}async toHTML(e,t=null){if(!this.items)return"";this.listName=e,this.htmlMaker=new z;let s=0;for(const n of this.items){s++;const i=`dock-uid${s}`;n.idAttributeForHTML=i;const o=new _,l=n.labelWrap;o.props.name=this.itemCssClassName(),o.props.id=i,o.props.className=this.imgCssClassName(),o.props.option.toolTip=n.toolTip,o.props.option.setLabel(l,!0),o.props.option.onSelect=a=>{const r=this.items.find(c=>a.item.props.id===c.idAttributeForHTML);if(r&&(this.selectedItem=r,this.onApply!==void 0)){const c=new xs;c.item=this.selectedItem,this.onApply(c)}},this.htmlMaker.add(o)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createDockBox(e,t,s=!0){this.parentName=e;const n=`<div class="${this.parentName}-dlg-content">
    ${t}
</div>`,i=new le;i.SetB3Type(Be.Hide),i.SetB5Type(Ae.Help,this.onHelp);const o=i.NewDialog(e,this.dlgCssClassName());return i.SetContent(e,n,s),this.applyCss(),i.EnableEventHandlers(),i.onMoveDone=this.moverOnMoveDone,o}addItemClickHandlers(e){this.onApply=e,this.htmlMaker.SelectByID(this.itemCssClassName(),this.htmlMaker.GetIdByIndex(0)),this.htmlMaker.enableEvents(this.itemCssClassName())}stdApplyAction(e){return e.item.dlgParent===null?(e.cancel=!0,!1):(console.log(`selected item = [${e.item.toolTip}::${e.item.dockType}]`),e.item.isUIType&&(new M().MoveHiestLayer(e.item.dlgParent),e.item.dlgParent.hidden&&(e.item.dlgParent.hidden=!1)),!0)}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=48,i=this.items.length,o=document.createElement("style");o.textContent=`
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
`.trim(),document.head.appendChild(o);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}listCssClassName(){return`${this.listName}-list`}dlgCssClassName(){return`${this.parentName}-dlg`}static GetDialogInfo(e){return le.GetDialogInfo(e)}static SetDialogInfo(e){return le.SetDialogInfo(e)}async InitZOrder(e){await e.ForEachAsync(t=>{const s=lt.GetDialogInfo(t),n=e.FindByName(t);return s!==null&&(s.zindex=n!==null?n.style.zIndex:""),console.log(s),!0})}}class xs{constructor(){this.cancel=!1}}async function vs(){const h=new ee;h.title="About EvoNa",await h.showWait('EvoNa (Evolution Navigator)<br>Release 1<br><img src="./wallpaper.png" width="64" height="64"></img><br><br>Powered By Gemini/Chromium Tech.')}class st{constructor(){this.dockType=Ce.None,this.iconFileName="",this.toolTip="",this.dlgName="",this.hidden=!1,this.zIndex="",this.topPx="",this.leftPx=""}static toJsonText(e){const t=st.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new st;return t.dockType=e.dockType,t.iconFileName=e.iconFileName,t.toolTip=e.toolTip,e.isUIType&&(t.dlgName=e.dlgParent.id,t.hidden=typeof e.dlgParent.hidden=="string"?!1:e.dlgParent.hidden,t.zIndex=e.dlgParent.style.zIndex,t.leftPx=e.dlgParent.style.left,t.topPx=e.dlgParent.style.top),t}}class nt{static toJsonText(e){const t=nt.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new nt;t.items=new Array;for(const s of e.items)t.items.push(st.toJsonInst(s));return t}restore(e,t){for(const s of this.items){const n=e.items.find(i=>i.dlg.id===s.dlgName);n&&(n.dockType=s.dockType,n.iconFileName=s.iconFileName,n.toolTip=s.toolTip,n.isUIType&&(n.dlgParent.hidden=typeof s.hidden=="string"?!1:s.hidden,n.dlgParent.style.zIndex=s.zIndex,n.dlgParent.style.left=s.leftPx,n.dlgParent.style.top=s.topPx))}t.ReOrder()}}class Ms{convTitle(e){if(e.length<=8)return e;const t="スキル";return e.endsWith(t)?`${e.substring(0,e.length-t.length)}<br>${t}`:e}}let ut=null;function Yt(){return ut||(ut=new Ms,console.log("ConvertTools instance created (Singleton)")),ut}class He{constructor(){this.chUuid="",this.ch=new ie}}class Xt{constructor(){this.chList=new Array,this.uiInfo=new Ee,this.parentName="",this.editingRowIndex=-1,this.scoreGrid=new cs,this.gridHeaderName=`${this.dlgCssClassName()}-headerName`,this.gridFooterName=`${this.dlgCssClassName()}-footerName`,this.gridName=`${this.dlgCssClassName()}-gridName`,this.gridRowName=`${this.dlgCssClassName()}-gridRowName`,this.keyClassName=`${this.dlgCssClassName()}-keyClassName`,this.valueClassName=`${this.dlgCssClassName()}-valueClassName`,this.onSelect=async e=>{console.log(`classify = ${e.classify} selectedValue = ${e.selectedValue} targetId = ${e.targetId}`);const t=this.editingCh;if(t===null)return;const n=t.scoreSet.items.find(i=>i.key===e.classify);n&&(n.selectedVal=e.selectedValue)},this.savedScoreSet=new H,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new M().SaveSetting(e)},this.onCopyPaste=async(e,t)=>{console.log(`[${e.className}] selected [${t}]`);const s="charSummary:";switch(t){case ce.Copy:const n=Ve.toJsonText(this);await W.put(`${s}${n}`);break;case ce.Paste:const i=await W.get();if(i===null)break;if(!i.startsWith(s)){const c=new ee;c.setParent(this.dlgCssClassName()),await c.showWait(`ペーストデータの形式が不正です<br>${s}`);break}const o=JSON.parse(i.substring(s.length)),l=Ve.fromJsonInst(o);this.chList=l.chList;const a=this.toHTML(),r=this.htmlMaker.ToElem(a);r!==null&&(this.htmlMaker.disableTableEvents(this.tableCssClassName()),this.htmlMaker.ReplaceElem(this.dlgContentCssClassName(),r),this.updateCharInfos(this.imageLoader,!1),this.selectFirstRow(),this.enableLazyImages(this.imageLoader),this.addItemEventHandlers());break}}}async load(){const t=await(await pe()).get(fe.CharSummaryAction);if(t===null)return;const s=new Map,n=new Array;this.usingLog(t,s,n),this.chList=new Array;for(const[i,o]of s){const l=et.fromJsonText(o.log),a=new ie;ie.copy(l.ch,a);const r=new H;H.copy(l.scoreSet,r,!0);const c=new He;c.chUuid=l.chUuid,c.ch=a,c.scoreSet=r,this.chList.push(c)}}usingLog(e,t,s){for(const n of e){const i=et.fromJsonText(n.log);if(i.chUuid==="")continue;let o=!1,l=!1;switch(i.logType){case me.None:break;case me.Add:o=!0;break;case me.Update:t.has(i.chUuid)?o=!0:o=!1;break;case me.Delete:o=!0,l=!0;break}if(o)if(l){if(t.has(i.chUuid)){t.delete(i.chUuid);const a=t.get(i.chUuid);s.push(a)}}else{if(t.has(i.chUuid)){const a=t.get(i.chUuid);s.push(a),t.delete(i.chUuid)}t.set(i.chUuid,n)}}}sortByScore(){if(this.chList.length===0)return null;const e=new Array;for(const s of this.chList){const n=new ie;ie.copy(s.ch,n);const i=new H;H.copy(s.scoreSet,i,!0);const o=new He;o.chUuid=s.chUuid,o.ch=n,o.scoreSet=i,e.push(o)}return e.sort((s,n)=>n.scoreSet.stdScore-s.scoreSet.stdScore)}async updateCharInfos(e,t=!0){let s=this.table.firstRowIndex-1;for(const n of this.chList){if(s++,t){const i=await e.getImageUrlBy(n.ch.iconFileName,n.ch.ns);i!==null&&this.table.updateRowImage(s,i)}this.updateChScoreInfo(s)}this.selectFirstRow()}selectFirstRow(){this.table.redimAllRows();const e=this.table.firstRowIndex;this.table.selectRow(e),this.table.scroll(e)}setRow(e,t,s){let n=0;const i=new kt;i.imgFile=e.iconFileName,s.getCell(n,t).typeInfo.setImg(i),s.getCell(n,t).className=this.itemIconCssClassName();const o=`${e.name}`;s.getCell(n,t,1).typeInfo.setLabel(o,!1),s.getCell(n,t,1).className=this.itemStatusCssClassName(),n++,s.getCell(n,t).typeInfo.setButton("更新"),s.getCell(n,t).className=this.itemUpdateCssClassName(),s.getCell(n,t).typeInfo.using.itemId=t,s.getCell(n,t,1).typeInfo.setButton("削除"),s.getCell(n,t,1).className=this.itemDeleteCssClassName(),s.getCell(n,t,1).typeInfo.using.itemId=t}toHTML(){if(!this.chList)return"";const e=new he;if(this.chList.length>=1)e.makeDim(2,this.chList.length),e.growCell(0,2),e.growCell(1,2),this.chList.forEach((i,o)=>{const l=i.ch;this.setRow(l,o,e)}),e.makeRowTemplate(this.tableRowCssClassName()),this.table=e;else{e.makeDim(2,1),e.growCell(0,2),e.growCell(1,2);const i=new ie;this.setRow(i,0,e),e.makeRowTemplate(this.tableRowCssClassName()),e.clearRows(),this.table=e}const t=this.tableCssClassName(),s=this.table.ToScrollHTML(t,"");this.htmlMaker=new z;const n=new _;return n.props.name="",n.props.id="0",n.props.className=t,n.props.option.setTable(s),n.props.option.onSelect=async i=>{switch(console.log(`classify = ${i.classify} targetId = ${i.targetId}`),i.classify){case this.itemUpdateCssClassName():await this.onItemEdit(i);break;case this.itemDeleteCssClassName():await this.onItemDelete(i);break}},this.htmlMaker.add(n),this.htmlMaker.ToHTML()}createSummaryBox(e,t,s){this.parentName=t;let n=`
<button id="${this.itemAddCssClassName()}">キャラ追加</button>
`.trim();const i=this.htmlMaker.MakeDefaultToolButtonsHTML(n),o=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${i}
    ${s}
</div>`,l=new le;l.title="<"+e+">",l.SetB2Type(be.CopyPaste,this.onCopyPaste);const a=l.NewDialog(t,this.dlgCssClassName());return l.SetContent(t,o),this.applyCss(),l.EnableEventHandlers(),l.onMoveDone=this.moverOnMoveDone,a}addEventHandlers(e,t){this.onAdd=t,document.getElementById(`${this.itemAddCssClassName()}`).onclick=async()=>{if(this.onAdd===void 0)return;const s=new Qt;await this.onAdd(s),s.cancel!==!0&&await this.onItemAdd(s)}}createScoreGrid(e){const t=this.dlgContentCssClassName(),s=Yt(),n=this.scoreGrid.makePair();for(const i of e.items){const o=s.convTitle(i.title),l=i.title,a=this.scoreGrid.makeKeyCell(o,this.keyClassName,l),r=new $t;r.selectionPair=i.selectionPair,r.selectedItem=i.selectedVal,r.classify=i.key;const c=new tt;c.makeItems(),c.items[0].typeInfo.setCombo(r),c.items[0].className=this.valueClassName,n.set(a,c)}if(this.scoreGrid.setPair(n),this.scoreGrid.setListener(this.gridName,this.gridRowName,t,this.gridHeaderName,this.gridFooterName),this.scoreGrid.enableEvents(this.onSelect),this.scoreGrid.footerElem!==null){let i=`
<button id="${this.gridFooterName}-okBtn">OK</button>
<button id="${this.gridFooterName}-canBtn">CANCEL</button>
`.trim();this.scoreGrid.footerElem.innerHTML=i,document.getElementById(`${this.gridFooterName}-okBtn`).onclick=async()=>{const o=this.editingCh;o!==null&&(o.scoreSet,this.addActionLog(o,me.Update),this.removeScoreGrid(),this.updateChScoreInfo(this.editingRowIndex))},document.getElementById(`${this.gridFooterName}-canBtn`).onclick=async()=>{const o=this.editingCh;if(o===null)return;const l=o.scoreSet;H.copy(this.savedScoreSet,l),this.removeScoreGrid()}}}removeScoreGrid(){if(this.scoreGrid.headerElem!==null){const e=this.editingRowIndex,t=this.table.getRowElem(e),s=this.table.getCellElems(t),n=this.scoreGrid.headerElem.children[0];s[0][0].appendChild(n)}this.scoreGrid!==null&&(this.scoreGrid.dispose(),this.htmlMaker.setVisible(this.itemAddCssClassName(),!0),this.table.setVisible(!0))}get editingCh(){const e=this.editingRowIndex;return e<this.table.firstRowIndex?null:this.chList[e-this.table.firstRowIndex]}async onItemAdd(e){const t=new ee;t.setParent(this.dlgCssClassName());let s=E.None;if(t.setYesNo(),s=await t.showWait(`${e.selectCh.name} を追加しますか？`),s===E.No)return;const n=this.tableRowCssClassName(),i=this.table.addRow(n);if(i<this.table.firstRowIndex)return;this.table.selectRow(i),this.table.updateRowImage(i,e.selectedImg),this.table.scroll(i);const o=new He;o.chUuid=os(),o.ch=e.selectCh,o.scoreSet=e.scoreSet,this.chList.push(o),this.updateChScoreInfo(i),this.addActionLog(o,me.Add)}async onItemEdit(e){const t=parseInt(e.targetId);if(t<this.table.firstRowIndex)return;this.editingRowIndex=t;const s=this.chList[t-this.table.firstRowIndex].scoreSet;this.savedScoreSet=new H,H.copy(s,this.savedScoreSet,!0),this.createScoreGrid(s),this.htmlMaker.setVisible(this.itemAddCssClassName(),!1),this.table.setVisible(!1);const n=this.table.getRowElem(t),o=this.table.getCellElems(n)[0][0].children[0];this.scoreGrid.headerElem?.appendChild(o)}async onItemDelete(e){const t=parseInt(e.targetId);if(t<this.table.firstRowIndex)return;const s=this.chList[t-this.table.firstRowIndex],n=new ee;n.setParent(this.dlgCssClassName());let i=E.None;switch(n.setYesNo(),i=await n.showWait(`${s.ch.name} を削除しますか？`),i){case E.Yes:break;case E.No:return;case E.Cancel:return}this.addActionLog(s,me.Delete),t>=1&&(this.table.deleteRow(t),this.table.redimAllRows(),this.chList.splice(t-this.table.firstRowIndex,1))}async addActionLog(e,t){const s=new et;s.logType=t,s.chUuid=e.chUuid,s.ch=e.ch,s.scoreSet=e.scoreSet;const n=et.toJsonText(s);await(await pe()).put(fe.CharSummaryAction,n)}updateChScoreInfo(e){const t=this.table.getRowElem(e);if(t===null)return;const s=this.table.getCellElems(t);if(s===null)return;const n=this.chList[e-this.table.firstRowIndex].ch.name;this.table.updateText(s[0][1],n);const i=this.getChScoreInfo(e);this.table.updateRowImageToolTip(e,i)}getChScoreInfo(e){const t=e-this.table.firstRowIndex,s=this.chList[t];let n="";for(const i of s.scoreSet.items){let o=i.selectedText;o=o===void 0?"*bug*":o;const l=`${i.title}:${o}`;n!==""&&(n=`${n}
`),n=`${n}${l}`}return n}addItemEventHandlers(){this.htmlMaker.enableTableEvents(this.tableCssClassName())}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e),this.imageLoader=e}async charStock(e){let t=this.table.getSelectedRow();const s=t!==this.table.invalidRowIndex,n=new ee;n.setParent(this.dlgCssClassName());let i=E.None;s?(n.setYesNoCancel(),i=await n.showWait(`${e.selectCh.name} を更新しますか？`)):(n.setYesNo(),i=await n.showWait(`${e.selectCh.name} を追加しますか？`));let o=!1,l=!1;switch(i){case E.Yes:s?(o=!1,l=!0):(o=!0,l=!1);break;case E.No:s?(o=!0,l=!1):(o=!1,l=!1);break;case E.Cancel:return}let a=null;if(o){const r=this.tableRowCssClassName(),c=this.table.addRow(r);if(c>=0){const m=new He;m.ch=e.selectCh,m.scoreSet=e.scoreSet,this.chList.push(m),t=c,this.table.selectRow(c),this.table.updateRowImage(c,e.selectedImg),this.table.scroll(c),a=this.table.getRowElem(c)}}if(l){const r=t-this.table.firstRowIndex,c=this.chList[r];c.scoreSet=e.scoreSet,this.tableRowCssClassName();const m=t;this.table.scroll(m),a=this.table.getRowElem(m)}if(a!==null){const r=this.table.getCellElems(a);if(r){const c=this.getChScoreInfo(t);this.table.updateText(r[0][1],c)}}}itemIconCssClassName(){return`${this.tableCssClassName()}-icon`}itemStatusCssClassName(){return`${this.tableCssClassName()}-status`}itemAddCssClassName(){return`${this.tableCssClassName()}-add`}itemUpdateCssClassName(){return`${this.tableCssClassName()}-update`}itemDeleteCssClassName(){return`${this.tableCssClassName()}-delete`}tableRowCssClassName(){return"char-summary-table-row"}tableCssClassName(){return"char-summary-table"}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return"char-summary-dlg"}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=document.createElement("style");s.textContent=`
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

`.trim(),document.head.appendChild(s);const n=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,n)}}class Qt{constructor(){this.cancel=!1}}const me={None:"None",Add:"Add",Delete:"Delete",Update:"Update"};class et{constructor(){this.logType=me.None,this.chUuid=""}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class Je{constructor(){this.chUuid="",this.ch=new oe}static toJsonText(e){const t=Je.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new Je;return t.chUuid=e.chUuid,t.ch=oe.toJsonInst(e.ch),t.scoreSet=e.scoreSet,t}static fromJsonInst(e){const t=new He;return t.ch=oe.fromJsonInst(e.ch),t.scoreSet=new H,H.copy(e.scoreSet,t.scoreSet,!0),t}}class Ve{constructor(){this.items=new Array}static toJsonText(e){const t=Ve.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new Ve;t.items=new Array;for(const s of e.chList)t.items.push(Je.toJsonInst(s));return t}static fromJsonInst(e){const t=new Xt;t.chList=new Array;for(const s of e.items)t.chList.push(Je.fromJsonInst(s));return t}}class Ls{constructor(){this.TextMap=new Map}set(e,t){const s=this.TextMap.has(e);return this.TextMap.set(e,t),s}remove(e){const t=this.TextMap.has(e);return t&&this.TextMap.delete(e),t}get count(){return this.TextMap.size}clear(){this.TextMap.clear()}forEach(e){if(e===void 0)return;let t=!1;for(const[s,n]of this.TextMap)if(t=e(s,n),t)break;return t}values(){const e=new Map;for(const[t,s]of this.TextMap)e.set(t,parseInt(s));return e}}class _t{constructor(e=0,t=""){this.ch=new ie,this.isEmpty=!0,this.details=new Ls,this.ch.id=e,this.ch.name=t}set(e,t){const s=this.details.TextMap.has(e);return this.details.set(e,t),s}get values(){return this.details.values()}get itemID(){const e=this.itemKey,t=this.ch.idAttributeForHTML.substring(e.length);let s=parseInt(t);return s<=0?-1:s}get itemKey(){return"chuid"}}class wt{constructor(){this.nFormationItem=5,this.uiInfo=new Ee}Init(){this.items=new Array;for(let e=0;e<this.nFormationItem;e++)this.items.push(new _t)}put(e,t){const s=this.items.find(n=>this.isExistCh(n,t));return s!==void 0&&s.isEmpty===!1?!1:(e.ch.ns=t.ns,e.ch.id=t.id,e.ch.name=t.name,e.isEmpty=!1,!0)}empty(e){const t=e.isEmpty;return e.isEmpty=!0,e.isEmpty!=t}isExistCh(e,t){return e.ch.name===t.name&&e.ch.id===t.id}equalsFormationItem(e,t){return e.ch.name===t.ch.name&&e.ch.id===t.ch.id}}class Rs{constructor(){this.emptyFile="plus.png",this.autoForm=!1,this.editFormEnable=!1,this.saveEnable=!1,this.enableScoreEvent=!1,this.parentName="",this.listName="",this.gridHeaderName=`${this.dlgCssClassName()}-headerName`,this.gridFooterName=`${this.dlgCssClassName()}-footerName`,this.gridName=`${this.dlgCssClassName()}-gridName`,this.scoreGrid=null,this.editingIndex=-1,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new M().SaveSetting(e)},this.onScoreGridOpen=async e=>{console.log(`notifty id     = ${e.item.props.id}`),console.log(` targetId      = ${e.targetId}`),console.log(` classify      = ${e.classify}`),console.log(` selectedValue = ${e.selectedValue}`);const t=e.item.props.id,s=parseInt(t)-1;if(0<=s&&s<this.formation.items.length){const n=`${this.propItemCssClassName()}-${t}`;if(this.htmlMakerProp.IsEnabledId(n)!==!0)return;if(this.enableScoreEvent){const o=this.formation.items[s];if(o.ch.id===0){console.log("*bug?*");return}if(this.scsList[s].items.length===0){const l=`${o.ch.id}`,a=await this.charDB.getStatus(l);a!==null&&a.items!==void 0&&(this.scsList[s]=a,this.makeFlyoutGrid(a,s))}else{const l=this.scsList[s];this.makeFlyoutGrid(l,s)}}}else console.log(`invalid index = ${s}`)},this.savedScoreSet=new H,this.onScoreValueSelect=async e=>{console.log(`${e.callerName}, ${e.result}`);const s=this.scsList[this.editingIndex].items.find(n=>n.key===e.callerName);s!==void 0&&(s.selectedVal=e.result)},this.onOkClickScoreGrid=async e=>{const t=this.formation.items[this.editingIndex],s=this.scsList[this.editingIndex];this.disposeScorGrid(),this.notifyChangeScore(t,s)},this.onCancelClickScoreGrid=async e=>{const t=this.scsList[this.editingIndex];H.copy(this.savedScoreSet,t),this.disposeScorGrid()},this.onCopyPaste=async(e,t)=>{console.log(`[${e.className}] selected [${t}]`);const s="formation:";switch(t){case ce.Copy:const n=de.toJsonText(this.formation,this.scsList);await W.put(`${s}${n}`);break;case ce.Paste:const i=await W.get();if(i===null)break;if(!i.startsWith(s)){const r=new ee;r.setParent(this.dlgCssClassName()),await r.showWait(`ペーストデータの形式が不正です<br>${s}`);break}const o=JSON.parse(i.substring(s.length)),l=this.selectedItem.itemID;this.formation.Init();let a=-1;for(const r of o.items){a++,this.formation.items[a]=Ge.fromJsonInst(r);const c=this.formation.items[a];c.ch.idAttributeForHTML=`${c.itemKey}${a+1}`}this.scsList=new Array;for(const r of o.scsList){const c=new H;H.copy(r,c,!0),this.scsList.push(c)}a=-1;for(const r of this.formation.items){a++;let c=!1;r.isEmpty?await this.charEmptyItem(r):(await this.charPutItem(r),c=!0);const m=`${this.propItemCssClassName()}-${a+1}`;this.htmlMakerProp.EnableId(m,c);const f=this.scsList[a];this.notifyChangeScore(r,f)}this.selectedItem=this.formation.items[l-1];break}}}InitForEnemy(e){this.charDB=e,this.formation=new wt,this.formation.Init(),this.enableScoreEvent=!0,this.scsList=new Array;const t=this.formation.nFormationItem;for(let s=0;s<t;s++){const n=new H;this.scsList.push(n)}}InitForPlayer(e){this.charSummary=e,this.autoFormation()}autoFormation(){const e=this.formation!==void 0?this.formation.uiInfo:void 0;this.formation=new wt,this.formation.Init(),e!==void 0&&(this.formation.uiInfo=e);const t=this.charSummary.sortByScore();let s=0;if(this.scsList=new Array,t!==null){const n=Math.min(t.length,this.formation.nFormationItem);for(let i=0;i<n;i++){const o=this.formation.items[i];this.formation.put(o,t[i].ch)}for(const i of t){const o=i.scoreSet;this.scsList.push(o)}s=this.formation.nFormationItem-n}else s=this.formation.nFormationItem;for(let n=0;n<s;n++){const i=new H;this.scsList.push(i)}}async Setup(e,t){if(!e)return;this.formation=e;let s=0;for(const n of this.formation.items){n.isEmpty?this.formation.empty(n):this.formation.put(n,n.ch),s++;const i=`${n.itemKey}${s}`;n.ch.idAttributeForHTML=i;const o=n.isEmpty?this.emptyFile:n.ch.iconFileName,l=await t.getImageUrlBy(o,n.ch.ns);if(l===null)return;this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),n.ch.idAttributeForHTML,l)}}async toHTML(e){if(!this.formation)return"";this.listName=e,this.htmlMakerChSel=new z;let t=0;for(const s of this.formation.items){const n=s.ch;t++;const i=`${s.itemKey}${t}`;n.idAttributeForHTML=i;const o="",l=s.isEmpty?this.emptyFile:n.iconFileName,a=new kt;a.imgSrc=o,a.imgFile=l;const r=new _;r.props.name=this.itemCssClassName(),r.props.id=i,r.props.className=this.imgCssClassName(),r.props.option.setImg(a),r.props.option.toolTip=n.name,r.props.option.onSelect=c=>{console.log(`notifty id = ${c.item.props.id}`),this.setSelectedItem(c.item.props.id)},this.htmlMakerChSel.add(r)}return this.htmlMakerChSel.MakeScrollableList(this.listCssClassName())}toGridHTML(){this.htmlMakerProp=new z;let e=0;for(const t of this.formation.items){t.ch;const s=this.scsList[e];e++;for(const i of s.items)t.details.set(i.key,i.selectedVal);const n=new _;n.props.name=`${this.propItemCssClassName()}-${e}`,n.props.id=`${e}`,n.props.className=`${this.propItemCssClassName()}`,n.props.option.setButton("スコア"),n.props.option.using.itemId=e,n.props.option.onSelect=this.onScoreGridOpen,this.htmlMakerProp.add(n)}return this.htmlMakerProp.MakeScrollableList(this.propCssClassName())}createFormationBox(e,t,s,n){this.parentName=t;let i=`
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
`.trim();const c=this.htmlMakerChSel.MakeDefaultToolButtonsHTML(r),m="";let f="";n!==""?f=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${c}
    ${s}
    ${n}
    ${m}
</div>`:f=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${c}
    ${s}
    ${m}
</div>`;const d=new le;d.title="<"+e+">",d.SetB2Type(be.CopyPaste,this.onCopyPaste),d.SetB4Type(Te.DialogHide);const p=d.NewDialog(t,this.dlgCssClassName());return d.SetContent(t,f),this.applyCss(),d.EnableEventHandlers(),d.onMoveDone=this.moverOnMoveDone,p}addEventHandlers(e){const t=document.getElementById(`${this.dlgCssClassName()}-auto`);t!==null&&(t.onclick=async()=>{await this.onAutoPut()});const s=document.getElementById(`${this.dlgCssClassName()}-tbput`);s!==null&&(s.onclick=async()=>{await this.onCharPut()});const n=document.getElementById(`${this.dlgCssClassName()}-tbempty`);n!==null&&(n.onclick=async()=>{await this.onCharEmpty()});const i=document.getElementById(`${this.dlgCssClassName()}-tbLeft`);i!==null&&(i.onclick=async()=>{await this.onCharLeft()});const o=document.getElementById(`${this.dlgCssClassName()}-tbRight`);o!==null&&(o.onclick=async()=>{await this.onCharRight()});const l=document.getElementById(`${this.dlgCssClassName()}-stock`);l!==null&&(l.onclick=async()=>{if(this.onStock!==void 0){if(this.selectedItem.ch.ns===O.None)return;const a=this.htmlMakerChSel.FindImgByID(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML),r=new dt;r.item=this.selectedItem,r.selectedImg=a===null?"":a.src;const c=this.findPropSelectedPos();c!==-1&&(r.scoreSet=this.scsList[c]),await this.onStock(r)}})}addItemEventkHandlers(e,t,s,n){this.onStock=s,this.onPut=e,this.onEmpty=t,this.onPropChanged=n;const i=this.htmlMakerChSel.GetIdByIndex(0);if(this.htmlMakerChSel.SelectByID(this.itemCssClassName(),i),this.htmlMakerChSel.enableEvents(this.itemCssClassName()),this.enableScoreEvent===!0){let o=0;for(const l of this.formation.items){o++;const a=`${this.propItemCssClassName()}-${o}`;this.htmlMakerProp.EnableId(a,!1)}this.htmlMakerProp.enableEvents(this.propCssClassName())}this.setSelectedItem(i)}async onAutoPut(){this.autoFormation(),await this.Setup(this.formation,this.imgLoader),await this.notifyChangeForm()}async notifyChangeForm(){for(const e of this.formation.items)await this.notifyChangeFormItem(e)}async notifyChangeFormItem(e){e.isEmpty?await this.notiftyOnEmpty(e):await this.notiftyOnPut(e,e.ch.iconFileName)}async notiftyOnPut(e,t){const s=new dt;return s.uiName=this.formation.uiInfo.name,s.item=e,s.selectedImg=t,await this.onPut(s),s}async notiftyOnEmpty(e){const t=new dt;return t.uiName=this.formation.uiInfo.name,t.item=e,t.selectedImg=this.emptyFile,await this.onEmpty(t),t}async notifyChangeScore(e,t){const s=new Bs;s.uiName=this.parentName,s.item=e,s.values=e.values,s.scoreConfigSet=t,await this.onPropChanged(s)}async onCharPut(){if(this.onPut!==void 0){this.selectedItem.isEmpty=!1;const e=await this.notiftyOnPut(this.selectedItem,"");this.formation.put(this.selectedItem,e.selectCh),this.replaceCharImg(this.selectedItem.ch.idAttributeForHTML,e.selectedImg,this.selectedItem.ch.name),this.propSelectedEnabled(!0)}}async onCharEmpty(){if(this.onEmpty!==void 0){this.selectedItem.isEmpty=!0;const e=await this.notiftyOnEmpty(this.selectedItem);this.formation.empty(this.selectedItem),this.replaceCharImg(this.selectedItem.ch.idAttributeForHTML,e.selectedImg,""),this.propSelectedEnabled(!1);const t=this.findPropSelectedPos();t!==-1&&(this.scsList[t]=new H)}}async onCharLeft(){this.canSwap(1)&&await this.formSwap(-1)}async onCharRight(){this.canSwap(this.formation.nFormationItem)&&await this.formSwap(1)}canSwap(e){return!(this.selectedItem===void 0||this.selectedItem.isEmpty===!0||this.selectedItem.itemID===e)}async formSwap(e){const t=this.selectedItem,s=t.itemID-1,n=s+e,i=this.formation.items[n],o=t.ch.idAttributeForHTML,l=i.ch.idAttributeForHTML,a=this.scsList[s],r=this.scsList[n],c=this.itemCssClassName(),m=this.htmlMakerChSel.FindImgByID(c,o),f=this.htmlMakerChSel.FindImgByID(c,l);if(m!==null&&f!==null){this.htmlMakerChSel.SwapImgSrcAndPairToolTip(m,f);const d=`${i.itemKey}${i.itemID}`;this.htmlMakerChSel.UnselectAll(c),this.htmlMakerChSel.SelectByID(c,d),this.formation.items[s]=i,this.formation.items[n]=t,this.formation.items[s].ch.idAttributeForHTML=o,this.formation.items[n].ch.idAttributeForHTML=l,this.scsList[s]=r,this.scsList[n]=a,this.setSelectedItem(d);const p=this.formation.items[n],u=this.formation.items[s];this.enableScoreEvent&&(this.propAutoEnabled(p),this.propAutoEnabled(u)),await this.notifyChangeFormItem(p),await this.notifyChangeFormItem(u),this.notifyChangeScore(p,this.scsList[s]),this.notifyChangeScore(u,this.scsList[n])}}async charPutItem(e){const t=await this.notiftyOnPut(e,e.ch.iconFileName);this.replaceCharImg(e.ch.idAttributeForHTML,t.selectedImg,e.ch.name)}async charEmptyItem(e){const t=await this.notiftyOnEmpty(e);this.replaceCharImg(e.ch.idAttributeForHTML,t.selectedImg,"")}replaceCharImg(e,t,s){this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),e,t),this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(),e,s)}propSelectedEnabled(e){const t=this.findPropSelectedPos();if(t!==-1){const s=`${this.propItemCssClassName()}-${t+1}`;this.htmlMakerProp.EnableId(s,e)}}propAutoEnabled(e){const t=!e.isEmpty,s=`${this.propItemCssClassName()}-${e.itemID}`;this.htmlMakerProp.EnableId(s,t)}makeFlyoutGrid(e,t){if(this.scoreGrid!==null)return;this.editingIndex=t,this.savedScoreSet=new H,H.copy(e,this.savedScoreSet,!0);const s=Yt(),n=new Array;for(const f of e.items){const d=new $t;d.selectionPair=f.selectionPair,d.selectedItem=f.selectedVal,d.classify=f.key;const p=new tt;p.makeItems(),p.items[0].typeInfo.setCombo(d),p.items[0].className="";const u=new us;u.key=f.key,u.text=s.convTitle(f.title),u.value=p,n.push(u)}const i=t+1,o=new ds;if(o.setGridtems(n),o.setListener(`${this.gridName}-${i}`,`${this.propItemCssClassName()}-${i}`,this.dlgContentCssClassName(),`${this.gridHeaderName}-${i}`,`${this.gridFooterName}-${i}`),o.setVisible(!0),o.setFontConfig("0.8"),o.applyCss(),o.enableEvents(this.onScoreValueSelect),this.scoreGrid=o,this.scoreGrid.footerElem!==null){let f=`
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
  ${this.htmlMakerChSel.GetDefaultButtonsCssText()}
}
[class^="${this.gridFooterName}-"] {
width: 100%;
display: flex;
gap: unset;
justify-content: flex-end;
}
`.trim(),document.head.appendChild(r);const c=document.getElementById(this.parentName);this.htmlMakerChSel.copyCssToInlineStyle(`.${this.parentName}`,c)}}class dt{constructor(){this.cancel=!1}}class Bs{constructor(){this.uiName="",this.cancel=!1}}class Ge{constructor(){this.ch=new oe,this.isEmpty=!0,this.TextMap=""}static toJsonText(e){const t=oe.toJsonInst(e.ch);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new Ge;t.ch=oe.toJsonInst(e.ch),t.isEmpty=e.isEmpty;const s=Object.fromEntries(e.details.TextMap);return t.TextMap=JSON.stringify(s,null,2),t}static fromJsonInst(e){const t=new _t;t.ch=oe.fromJsonInst(e.ch),t.isEmpty=e.isEmpty;const s=new Map(Object.entries(JSON.parse(e.TextMap)));return t.details.TextMap=s,t}}class de{static toJsonText(e,t){const s=de.toJsonInst(e,t);return JSON.stringify(s,null,2)}static toJsonInst(e,t){const s=new de;s.items=new Array,s.scsList=new Array;for(const n of e.items)s.items.push(Ge.toJsonInst(n));for(const n of t)s.scsList.push(n);return s}static fromJsonInst(e){const t=new wt;t.items=new Array;for(const s of e.items)t.items.push(Ge.fromJsonInst(s));return t}}class Nt{constructor(e,t=!0,s){this.isEmpty=!0,this.allAvailable=!1;const n=new ie;n.ns=e.ns,n.id=e.id,n.name=e.name,this.ch=n,this.isEmpty=t,this.scoreSet=s}get score(){return Math.ceil(this.scoreSet.stdScore)}static copy(e,t){t.ch.ns=e.ch.ns,t.ch.id=e.ch.id,t.ch.name=e.ch.name,t.isEmpty=e.isEmpty,t.scoreSet=new H,H.copy(e.scoreSet,t.scoreSet,!0)}}class Lt{Add(e){if(e===void 0){console.log("[VersusGroupRow::Add] scItem === undefined");return}this.columns===void 0&&(this.columns=[]),this.columns.push(e)}Count(){return this.columns.length}debug(){if(this.columns===void 0){console.log("[VersusGroupRow::debug] this.columns === undefined");return}for(const e of this.columns)console.log(`[${e.ch.name}]	score=[${e.scoreSet}]`)}}Lt.defNumColumn=5;class Rt{Add(e){this.groupRows===void 0&&(this.groupRows=[]),this.groupRows.push(e)}Count(){return this.groupRows.length}debug(){if(this.groupRows===void 0)console.log("this.groupRows === undefined");else for(const e of this.groupRows)e.debug()}async loadJson(e){const n=(await new We().loadJson(e)).groupRows.map(o=>Object.assign(new Lt,o)),i=new Rt;return i.groupRows=n,i}}const ge={None:"None",Player:"Player",Enemy:"Enemy"},re={None:"None",Attr:"Attr",Role:"Role"},zt={HiLv:"HiLv"},X={Likely:"Likely",Uncertain:"Uncertain",Wishful:"Wishful"};class it{}it.Likely=.9;it.Uncertain=.64;class It{constructor(){this.scoreItems=[],this.formationType=ge.None,this.boost=0}get imgPrefix(){return this.formationType===ge.Player?"ftPlayer":"ftEnemy"}get judgeWidth(){return 48}setScoreItems(e){if(e!==void 0){this.scoreItems=new Array;for(const t of e){const s=new Nt(t.ch,t.isEmpty,t.scoreSet);this.scoreItems.push(s)}}}async toCharHTML(e,t){const s=t.isEmpty?e.demoMaterial:t.ch.iconFileName,n=t.ch.ns===O.None?"":t.ch.ns,i=await e.getImageUrlBy(s,n);let o=this.scoreToolTip(t);return o!==""&&(o=`title="${o}"`),`
<img class=${this.charCssClassName()}
  src="${i}"
  ${o}>
`.trim()}scoreToolTip(e){return e.isEmpty?"":`${e.ch.name}
score=${e.score}`}async toJudgeHTML(e,t){const s=this.toJudgeFileURL(e,t);return`<img class=${this.judgeCssClassName()} src="${s}" width="48">`}async toJudgeFileURL(e,t){let s=null;switch(t){case X.Likely:s=await e.getImageUrlBy("win.png",e.AnyNs);break;case X.Uncertain:s=await e.getImageUrlBy("even.png",e.AnyNs);break;case X.Wishful:s=await e.getImageUrlBy("lost.png",e.AnyNs);break;default:return""}return s}charCssClassName(){return"combat-char"}judgeCssClassName(){return"combat-judge"}get combatScore(){if(this.scoreItems===void 0)return 0;const e=this.scoreItems.reduce((s,n)=>n.isEmpty?s:s+n.score,0),t=this.boost===0?1:this.boost;return Math.ceil(e*t/100)}get checkCombo(){if(this.scoreItems===void 0)return;const e=Array();for(const i of this.scoreItems){if(i.isEmpty||i.ch.ns===O.None)continue;const o=new Nt(i.ch,i.isEmpty,i.scoreSet);e.push(o)}if(e.length==0)return;let t=O.None,s=0;const n=new Map;for(const i of e){if(t===O.None){t=i.ch.ns,s=1;continue}if(t!==i.ch.ns){t=i.ch.ns,s=1;continue}s++,s>=2&&(n.has(t),n.set(t,s))}return console.log(`**checkCombo::${this.formationType}**`),console.log(n),n}}class As{constructor(){this.hasCombo=!1,this.winRate=new Map}setPlayer(e){e.formationType=ge.Player,this.player=e}setEnemy(e){e.formationType=ge.Enemy,this.enemy=e}judge(e){const s=this.winRate.get(e);return s>=it.Likely?X.Likely:s>=it.Uncertain?X.Uncertain:X.Wishful}judgeForEnemy(e){switch(e){case X.Likely:return X.Wishful;case X.Uncertain:return X.Uncertain;case X.Wishful:return X.Likely}}}class Hs{constructor(){this.combatPairs=new Map,this.emptyFile="plus.png",this.parentName="",this.uiInfo=new Ee,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new M().SaveSetting(e)}}setPair(e,t){this.combatPairs.set(e,t)}calcCombatScore(){for(const[e,t]of this.combatPairs){if(t.player===void 0||t.enemy===void 0)continue;const s=[re.None,re.Attr,re.Role];for(const n of s){let i=t.player.combatScore,o=t.enemy.combatScore;t.winRate.set(n,o!==0?i/o:1),t.player.checkCombo,t.enemy.checkCombo}}}async replaceChar(e,t,s,n,i){const o=this.combatPairs.get(e);let l;if(t===ge.Player?l=o?.player:t===ge.Enemy&&(l=o?.enemy),l===void 0)return!1;const a=s.itemID;if(a<0)return!1;const r=a-1;l=l;const m=`${l.imgPrefix}${a}`,f=l.scoreItems[r],d=f.ch;let p="";s.isEmpty?(d.id=0,d.name="",p=i.demoMaterial,console.log("[replaceChar] set empty")):(d.id=n.id,d.name=n.name,p=d.iconFileName,console.log(`[replaceChar] set char ${n.id}:${n.name}`)),f.isEmpty=s.isEmpty;const u=d.ns===O.None?"":d.ns,w=await i.getImageUrlBy(p,u);if(w===null)return!1;const y=new z,$=this.outerCssClassName();return y.ReplaceImg($,m,w),!0}async replaceJudge(e){async function t(i,o){const l=await i.toJudgeFileURL(e,o);if(l===null)return;const a=i.imgPrefix;for(let r=0;r<i.scoreItems.length;r++){const c=`${a}${r+1}`,m=s.FindImgsByID(n,c);if(m===null||m.length<=1){console.error("fail on judge marker");continue}const f=m[1];s.SetImgSrc(f,l),i.scoreItems[r].isEmpty?s.SetImgSize(f,0,0):s.SetImgSize(f,i.judgeWidth,i.judgeWidth);const d=i.scoreItems[r];s.ReplaceImgToolTip(n,c,i.scoreToolTip(d))}}const s=new z,n=this.outerCssClassName();for(const[i,o]of this.combatPairs){if(o.player===void 0||o.enemy===void 0)continue;const l=[re.None,re.Attr,re.Role];for(const a of l){if(a!==re.None)continue;const r=o.judge(a),c=o.judgeForEnemy(r);await t(o.player,r),await t(o.enemy,c)}}}async toHTML(e,t){const s=document.createElement("table");s.id=e;const n=document.createElement("tbody");s?.appendChild(n);async function i(l,a){const r=document.createElement("tr");n?.appendChild(r);const c=await a.toJudgeHTML(t,l),m=a.imgPrefix;let f=0;for(const d of a.scoreItems){f++;const p=await a.toCharHTML(t,d),u=`
<div class=${o} item-id="${m}${f}">
    ${p}
    ${c}
</div>
`.trim(),w=document.createElement("td");w.innerHTML=u,r.appendChild(w)}}const o=this.outerCssClassName();for(const[l,a]of this.combatPairs){const r=a.judge(re.None),c=a.judgeForEnemy(r);await i(r,a.player),await i(c,a.enemy)}return s.outerHTML}createCombatBox(e,t,s){this.parentName=t,this.htmlMaker=new z;const n=`<div class="${this.parentName}-dlg-content">
    ${s}
</div>`,i=new le;i.title="<"+e+">";const o=i.NewDialog(t,this.dlgCssClassName());return i.SetContent(t,n),this.applyCss(),i.EnableEventHandlers(),i.onMoveDone=this.moverOnMoveDone,o}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}outerCssClassName(){return"combat-outer"}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const e=new It,t=`.${this.outerCssClassName()}`,s=`.${e.charCssClassName()}`,n=`.${e.judgeCssClassName()}`,i=parseInt(this.uiInfo.left),o=parseInt(this.uiInfo.top),l=document.createElement("style");l.textContent=`
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
`.trim(),document.head.appendChild(l);const a=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,a)}}const Le={Unknown:"Unknown",Success:"Success",Fail:"Fail",Cancel:"Cancel"};async function Jt(h){const e=h.isWebRunning,t=h.currentUserHome,s=h.chStatusListFile,n=h.chListFile,i=new rs,o=new z,l="splash-screen";o.initFullScreen(l,"エボナ データベース初期化中..."),o.applyFullScreenCss(l);const a=o.getFullScreenMsgElem(l),r=a!==null?a.innerHTML:"",m=await new Et().LoadList(n);if(t===h.user1Home){const b=[{ns:O.CnsRed,nsName:"赤属性"},{ns:O.CnsBlue,nsName:"青属性"},{ns:O.CnsGreen,nsName:"緑属性"},{ns:O.CnsYellow,nsName:"黄属性"},{ns:O.CnsViolet,nsName:"紫属性"}];for(const T of b)a!==null&&(a.innerHTML=`${r} ${T.nsName}`),await i.setupNs(T.ns,h,m)}if(t===h.user2Home){const b=[{ns:O.CnsBlue,nsName:"藍属性"},{ns:O.CnsRed,nsName:"紅属性"},{ns:O.CnsGreen,nsName:"翠属性"},{ns:O.CnsYellow,nsName:"黄属性"},{ns:O.CnsWhite,nsName:"天属性"},{ns:O.CnsBlack,nsName:"冥属性"}];for(const T of b)a!==null&&(a.innerHTML=`${r} ${T.nsName}`),await i.setupNs(T.ns,h,m)}a!==null&&(a.innerHTML="UI 初期化中 ...");const f=new lt,d=new ot;await d.loadDB(s),d.charSpecSet=m,await d.loadAuxScoreSet(h.gameType);async function p(){const b=new bs;b.chSet=m,b.uiInfo.name="charListArea",b.uiInfo.left="300",b.uiInfo.top="100";const T=b.uiInfo.name,V=await b.toHTML(i);if(e){const R="キャラ選択",S=b.createSelectorBox(R,T,V);b.addEventHandlers(S),b.addItemEventHandlers(),b.enableLazyImages(i),S.show();const F=new ne;F.setAsDlg(S,R),f.add(F)}return b}const u=await p();async function w(){const b=new Xt;await b.load(),b.uiInfo.name="CharSummary",b.uiInfo.left="400",b.uiInfo.top="100";const T=b.uiInfo.name,V=await b.toHTML();if(e){const R="キャラ一覧",S=b.createSummaryBox(R,T,V);await b.updateCharInfos(i),b.addEventHandlers(S,async U=>{U.selectCh=u.selectedCh;const j=await i.getImageUrlBy(u.selectedCh.iconFileName,u.selectedCh.ns);if(j===null)U.selectedImg="",U.cancel=!0;else{U.selectedImg=j,U.cancel=!1;const J=await d.getStatus(u.selectedCh.idAsText);U.scoreSet=J}console.log(`selected ch = ${U.selectCh.name}`)}),b.addItemEventHandlers(),b.enableLazyImages(i),S.show();const F=new ne;F.setAsDlg(S,R),f.add(F)}return b}const y=await w();async function $(b,T,V,R){const S=new Rs;b===k&&(S.InitForPlayer(y),S.autoForm=!0,S.editFormEnable=!1,S.saveEnable=!1,S.imgLoader=i),b===N&&(S.InitForEnemy(d),S.autoForm=!1,S.editFormEnable=!0,S.saveEnable=!0),S.formation.uiInfo.name=b,S.formation.uiInfo.left=`${T}`,S.formation.uiInfo.top=`${V}`;const F=S.formation.uiInfo.name,U=await S.toHTML(F),j=b===N?S.toGridHTML():"";if(e){const J=S.createFormationBox(R,F,U,j);S.addEventHandlers(J),S.addItemEventkHandlers(async P=>{let q="",rt="";P.selectedImg===""?(q=u.selectedCh.iconFileName,rt=u.selectedCh.ns,P.selectCh=u.selectedCh):(q=P.item.ch.iconFileName,rt=P.item.ch.ns,P.selectCh=P.item.ch);const Pt=await i.getImageUrlBy(q,rt);Pt!==null&&(P.selectedImg=Pt,P.item.isEmpty=!1,Ft(P.uiName,P.item,P.selectCh))},async P=>{const q=await i.getImageUrlBy(P.selectedImg,u.selectedCh.ns);q!==null&&(P.selectedImg=q,P.item.isEmpty=!0,Ft(P.uiName,P.item,P.selectCh))},async P=>{console.log(`selected ch = ${P.item.ch.name}`);const q=new Qt;q.selectCh=P.item.ch,q.selectedImg=P.selectedImg,q.scoreSet=P.scoreSet,y.charStock(q)},async P=>{await Dt().replaceJudge(i)}),S.enableLazyImages(i),J.show();const xe=new ne;xe.setAsDlg(J,R),f.add(xe)}return S}const k="playerForm",N="enemyForm",g=await $(k,100,100,"自編成"),L=await $(N,100,200,"敵編成");async function I(b,T,V,R){C.uiInfo.name=b,C.uiInfo.left=`${T}`,C.uiInfo.top=`${V}`;const S=await C.toHTML("combatTable",i),F=C.createCombatBox(R,b,S);C.enableLazyImages(i),await C.replaceJudge(i),F.show();const U=new ne;U.setAsDlg(F,R),f.add(U)}const C=Dt();await I("combatForm",120,300,"対戦予想");const x="保存";new ne().setAsMenu(x);const we="復帰";new ne().setAsMenu(we);const Z="設定";{const b=new ne;b.setAsMenu(Z),f.add(b)}let K=null;const at=await f.toHTML("dockForm",i);if(e){const b=f.createDockBox("dockForm",at);f.addItemClickHandlers(async T=>{if(f.stdApplyAction(T)!==!1&&T.item.isMenuType&&(T.item.toolTip===x&&await es(),T.item.toolTip===we&&await ts(async R=>{if(console.log(`[loadedResult] ${R}`),R!==Le.Success)return;const S=de.fromJsonInst(qe),F=de.fromJsonInst(Ke);qe=null,Ke=null,await g.Setup(S,i),await L.Setup(F,i)}),T.item.toolTip===Z)){const R=h.editorURL;window.open(R,R)}}),f.enableLazyImages(i),b.show(),K=b}const Ne="playerForm.json",te="enemyForm.json",Bt="dockForm.json";async function es(){f.InitZOrder(ye);const b=de.toJsonText(g.formation,g.scsList),T=de.toJsonText(L.formation,L.scsList),V=nt.toJsonText(f),R=new window.JSZip;R.file(Ne,b),R.file(te,T),R.file(Bt,V);const S=await R.generateAsync({type:"blob"}),F="gameConfig.zip",U=URL.createObjectURL(S),j=document.createElement("a");j.href=U,j.download=F,j.click(),URL.revokeObjectURL(U),console.log("saved!")}let At=null,qe=null,Ke=null;async function ts(b){const T=document.createElement("input");return T.type="file",T.accept=".zip",T.addEventListener("cancel",()=>(console.log("Cancelled."),Le.Cancel)),T.addEventListener("change",async()=>{if(T.files.length==1){console.log("File selected: ",T.files[0].name);const R=await T.files[0].arrayBuffer(),F=await new window.JSZip().loadAsync(R);async function U(J){const xe=F.file(J);if(xe){const P=await xe.async("string"),q=JSON.parse(P);return console.log(q),q}}{const J=await U(Bt);J&&(At=J)}{const J=await U(Ne);J&&(qe=J)}{const J=await U(te);J&&(Ke=J)}const j=At!==null&&qe!==null&&Ke!==null?Le.Success:Le.Fail;b(j)}}),T.click(),Le.Unknown}const ye=new M;e&&(ye.AddDialogs(),ye.AssignIndexies(),await ye.LoadAllSetting(),await ye.loadSetting(K),f.InitZOrder(ye),await ye.ForEachAsync(b=>{const T=le.FindDialogParent(b);return T!==null&&(h.isLocal||b==="charListArea"?T.hidden=!1:T.hidden=h.evonaType!==se.Full),!0}),K!==null&&(K.parentElement.hidden=h.evonaType!==se.Full)),o.hideFullScreenCss(l);function Ht(b){const T=new Rt,V=new Lt,R=b.formation;R.uiInfo.name,R.uiInfo.name,b.scsList===void 0&&console.log(`[${b.formation.uiInfo.name}] 対戦予想結果の作成は工事中です`);let S=0;for(const F of R.items){if(b.scsList===void 0)continue;const U=b.scsList[S];if(U.ns===O.None){const J=F.ch.ns;U.ns=J,console.log(`[toScoreRes] set ns (${b.formation.uiInfo.name}::${F.ch.name}) : None -> ${J}`)}S++;const j=new Nt(F.ch,F.isEmpty,U);j.allAvailable=U.allAvailable,V.Add(j)}return T.Add(V),T.debug(),T}function Dt(){const b=new Hs,T=Ht(g),V=Ht(L),R=new It;R.setScoreItems(T.groupRows[0].columns),R.boost=100;const S=new It;S.setScoreItems(V.groupRows[0].columns),S.boost=100;const F=new As;F.setPlayer(R),F.setEnemy(S),b.setPair(zt.HiLv,F),b.calcCombatScore();for(const[U,j]of b.combatPairs){const J=j.judge(re.None);console.log(`judge=[${J}]`)}return b}async function Ft(b,T,V){const R=zt.HiLv;C.combatPairs.get(R),b===k&&await C.replaceChar(R,ge.Player,T,V,i),b===N&&await C.replaceChar(R,ge.Enemy,T,V,i),await C.replaceJudge(i)}}async function Ds(h){if(!h.isWebRunning)return;const e=h.isWebRunning;console.log(`mode=${h.edit}`);const t=new lt;async function s(){const p=ae.Resource,u=new mt;u.init(),u.setConfig(Ns()),await u.load(p,G.none),u.uiInfo.name="ResourceEdit",u.uiInfo.left="110",u.uiInfo.top="10";const w=u.uiInfo.name,y=await u.toHTML($s());if(e){const $=document.createElement("div");$.id=u.uiInfo.name,$.className=u.uiInfo.name,document.body.appendChild($);const k="文字列リソース",N=u.createEditorBox(k,w,y);u.addEventHandlers(N),u.addItemEventHandlers(),N.show(),u.enableResize();const g=new ne;g.setAsDlg(N,k),t.add(g)}return u}async function n(){const p=ae.GameUI,u=new mt;u.initNumItems=5,u.canAdd=!1,u.init(),u.setConfig(Is()),await u.load(p,G.none),u.uiInfo.name="GameEdit",u.uiInfo.left="110",u.uiInfo.top="10",u.uiInfo.height="235";const w=u.uiInfo.name,y=await u.toHTML(Ss());if(e){const $=document.createElement("div");$.id=u.uiInfo.name,$.className=u.uiInfo.name,document.body.appendChild($);const k="ゲーム設定",N=u.createEditorBox(k,w,y);u.addEventHandlers(N),u.addItemEventHandlers(),N.show(),u.enableResize();const g=new ne;g.setAsDlg(N,k),t.add(g)}return u}async function i(){const p=ae.ScoreUI,u=new mt;u.init(),u.setConfig(ks(h.gameType)),await u.load(p,h.edit),u.uiInfo.name="ScoreEdit",u.uiInfo.left="110",u.uiInfo.top="100";const w=u.uiInfo.name,y=await u.toHTML(Ts());if(e){const $=document.createElement("div");$.id=u.uiInfo.name,$.className=u.uiInfo.name,document.body.appendChild($);const k="スコア設定",N=u.createEditorBox(k,w,y);u.addEventHandlers(N),u.addItemEventHandlers(),N.show(),u.enableResize();const g=new ne;g.setAsDlg(N,k),t.add(g)}return u}(await s()).startAutoSave(),(await n()).startAutoSave(),(await i()).startAutoSave();const r=document.createElement("div"),c="dockEdit";r.id=c,r.className=c,document.body.appendChild(r);let m=null;const f=await t.toHTML(c,null);if(e){const p=t.createDockBox(c,f);t.addItemClickHandlers(async u=>{t.stdApplyAction(u)}),p.show(),m=p}const d=new M;e&&(d.AddDialogs(),d.AssignIndexies(),await d.LoadAllSetting(),await d.loadSetting(m),t.InitZOrder(d),await d.ForEachAsync(p=>{const u=le.FindDialogParent(p);return u!==null&&(h.isLocal||p==="charListArea"?u.hidden=!1:u.hidden=!0),!0}),m!==null&&(m.parentElement.hidden=!h.isLocal))}const D=new We,Zt=D.isWebRunning;Zt?(Ps(),D.parseURLParams(),D.currentUserHome===""&&D.setUser(D.user1Home)):D.setUser(D.user2Home);let je=window.EVONA_CONFIG.isLocal;D.aslocal!==De.Undef&&(je=D.aslocal===De.True);D.setPath();D.appHref=window.location.href;W.encodeEnable=!je;D.setImageHome(je);const Fs=Us(je)||D.availComing;D.currentUserHome;D.statusJsonPath;D.zipPrefix;D.chListFile;D.chStatusListFile;switch(D.admin){case!0:await ls(D);break;case!1:if(Zt)if(D.edit===G.none){let h=!1,e=!1;const t=new ee;t.CheckVisible=!0,t.CheckText="位置情報を初期化",t.SecretEnable=!0;const s=D.setBrowserTitle();await t.showWait(`「${s} 」モードで起動します`)===E.Secret&&(e=!0),h=t.Checked;let i=se.None;if(je)i=se.Full;else if(i=se.NotRun,e){let o="";t.CheckVisible=!1,t.SecretEnable=!1,t.AuthVisible=!0,t.onAuthChecking=f=>(o=f,!0),await t.showWait("認証コードを入力してください");const l=new Date,a=("0"+(l.getMonth()+1)).slice(-2),r=("0"+l.getDate()).slice(-2),m=Math.random()>.5?`${a}${r}`:`${r}${a}`;o===m?(console.log("auth success"),i=se.Full):console.log("auth fail")}else Fs&&(i=se.Limit);switch(h&&(await(await ns()).clear(),await(await pe()).clear()),D.evonaType=i,i){case se.Full:window.EVONA_CONFIG.demo=!1,await Jt(D);break;case se.Limit:window.EVONA_CONFIG.demo=!0,await Jt(D);break}}else D.setBrowserTitle(),await Ds(D);break}function Ps(){const h=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname.startsWith("192.168."),e=h?"./jszip_dist/jszip.min.js":"https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js",t=h?"./jsstore_dist/jsstore.min.js":"https://cdn.jsdelivr.net/npm/jsstore/dist/jsstore.min.js";window.EVONA_CONFIG={isLocal:h,workerFile:"./jsstore_dist/jsstore.worker.min.js",demo:!h};function s(n,i=!1){const o=document.createElement("script");o.src=n,i&&(o.type="module"),o.async=!1,document.head.appendChild(o)}s(e),s(t)}function Us(h){if(h)return!0;const e=document.referrer;console.log(`${e}`);const t="evona_auth",s="granted";return sessionStorage.getItem(t)===s?!0:e.includes("qiita.com")?(sessionStorage.setItem(t,s),!0):!1}

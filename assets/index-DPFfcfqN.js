(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();const z={none:"none",classPq:"pq",classMM:"mm"},w={pqStatusHP:"pqStatusHP",pqStatusATK:"pqStatusATK",pqStatusREC:"pqStatusREC",pqTokkunHP:"pqTokkunHP",pqTokkunATK:"pqTokkunATK",pqTokkunREC:"pqTokkunREC",pqTokuSp1:"pqTokuSp1",pqTokuSp2:"pqTokuSp2",mmAbilitySTR:"mmAbilitySTR",mmStatusFGT:"mmStatusFGT",mmStatusATK:"mmStatusATK",mmStatusPDF:"mmStatusPDF",mmStatusACC:"mmStatusACC",mmStatusEVA:"mmStatusEVA",mmStatusCRI:"mmStatusCRI",mmStatusMDF:"mmStatusMDF",mmStatusHP:"mmStatusHP",mmStatusCRD:"mmStatusCRD",mmStatusDEF:"mmStatusDEF",mmStatusSPD:"mmStatusSPD",mmAbilityDEX:"mmAbilityDEX",mmAbilityMGC:"mmAbilityMGC",mmAbilityDUR:"mmAbilityDUR",mmRole:"mmRole"},H={None:"None",CnsRed:"CnsRed",CnsBlue:"CnsBlue",CnsGreen:"CnsGreen",CnsYellow:"CnsYellow",CnsViolet:"CnsViolet",CnsWhite:"CnsWhite",CnsBlack:"CnsBlack"},Re={RlAttacker:"RlAttacker",RlHealer:"RlHealer",RlDebuffer:"RlDebuffer",RlBuffer:"RlBuffer"},W={None:"None",Full:"Full",Limit:"Limit",NotRun:"NotRun"};class $e{constructor(){this.imageRepository="https://puyon7676.github.io/GameImages/",this.imageHome="./Image/",this.user1Home="./User1/",this.user2Home="./User2/",this.currentUserHome="",this.isLocal=!1,this.admin=!1,this.cmd="",this.edit=z.none,this.evonaType=W.None,this.dataBasePath="../キャラパースデータ",this.statusJsonPath="",this.zipPrefix="",this.chListFile="",this.chStatusListFile="",this.charStatusZip="./CharStatus.zip",this.nodeToolsImportFilename="./nodeTools.js"}setImageHome(e){if(this.isLocal=e,e)this.imageHome=`${this.currentUserHome}Image/`;else{let t=this.currentUserHome;this.currentUserHome.substring(0,2)==="./"&&(t=this.currentUserHome.substring(2)),this.imageHome=`${this.imageRepository}${t}`}}setUser(e){this.currentUserHome=e}setPath(){this.currentUserHome===this.user1Home&&(this.statusJsonPath=`${this.dataBasePath}/ぷよクエ_詳細JSON`,this.zipPrefix="puyoQue_",this.chListFile=`${this.currentUserHome}chListFile_puyo.json`,this.chStatusListFile=`${this.currentUserHome}puyoQue_CharStatus.zip`),this.currentUserHome===this.user2Home&&(this.statusJsonPath=`${this.dataBasePath}/メメントモリ_詳細JSON`,this.zipPrefix="memeMori_",this.chListFile=`${this.currentUserHome}chListFile_meme.json`,this.chStatusListFile=`${this.currentUserHome}memeMori_CharStatus.zip`)}get gameType(){return this.currentUserHome===this.user1Home,z.classPq}get gameTitle(){return this.edit!==z.none?`エディタ(${this.edit})`:this.gameType===z.classPq?"ぷよクエ":"メメントモリ"}setBrowserTitle(){const e=this.gameTitle;document.head.title=e;for(const t of document.head.children)t.nodeName==="TITLE"&&(t.innerHTML=`EvoNa：${e} モード`);return e}get isWebRunning(){return!(typeof document>"u")}parseURLParams(){if(!this.isWebRunning){console.log("cannot parse URL params!");return}const e=new URLSearchParams(window.location.search);for(const[t,s]of e)switch(t.trim()){case"user":const i=s.trim();this.setUser(i==="1"?this.user1Home:this.user2Home);break;case"debug":break;case"admin":this.admin=s.trim()==="true";break;case"cmd":this.cmd=s;break;case"edit":this.edit=s.trim()===z.classMM?z.classMM:z.classPq;break}}async loadJson(e){return console.log(`[loadJson] file=[${e}]`),await this._loadJson(e)}async _loadJson(e){if(this.isWebRunning){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`HTTPエラー! ステータス: ${t.status}`);return await t.json()}else{const{loadJsonNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async saveJson(e,t){const s=JSON.stringify(t);if(this.isWebRunning){const i=new Blob([s],{type:"application/json"}),n=URL.createObjectURL(i),o=document.createElement("a");o.href=n,o.download=e,o.click()}else{const{saveJsonNode:i}=await import(this.nodeToolsImportFilename);return i(e,t)}}async loadBinFile(e){if(this.isWebRunning)return await(await fetch(e)).blob();{const{readBinNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async getDoc(e){let t,s;if(this.isWebRunning)t=new DOMParser,s=t.parseFromString(e,"text/html");else{const{createHtmlParserNode:i}=await import(this.nodeToolsImportFilename);t=i(e),s=t.parseFromString(e,"text/html")}return s}}class O{static async put(e){const t=O.encodeEnable?await O.encode(e):e;try{await navigator.clipboard.writeText(t)}catch(s){return console.error("コピー失敗...",s),!1}return!0}static async get(){let e="";try{e=await navigator.clipboard.readText()}catch(t){return console.error("ペースト失敗...",t),null}return O.encodeEnable?await O.decode(e):e}static async encode(e){const t=O.getEncoder(),s=O.storeFile;return t.file(s,e),await t.generateAsync({type:"base64",compression:"DEFLATE",compressionOptions:{level:9}})}static async decode(e){const t=O.getEncoder(),s=O.storeFile;try{return await(await t.loadAsync(e,{base64:!0})).file(s).async("string")}catch(i){return console.error("デコード失敗...",i),null}}static getEncoder(){return new window.JSZip}}O.encodeEnable=!0;O.storeFile="form.json";const k={None:"None",Ok:"Ok",OkCancel:"OkCancel",YesNo:"YesNo",YesNoCancel:"YesNoCancel"},Ce={None:"None",Ok:"Ok",Question:"Question"},N={None:"None",Ok:"Ok",Cancel:"Cancel",Yes:"Yes",No:"No",Secret:"Secret"};class de{constructor(){this.parentName="evona-msg-box",this.buttonType=k.Ok,this.iconType=Ce.None,this.title="Confirm",this.btnS="",this.SecretEnable=!1,this.btnOk="OK",this.btnCancel="Cancel",this.btnYes="Yes",this.btnNo="No",this.CheckVisible=!1,this.CheckText="",this.Checked=!1,this.Result=N.None,this.AuthVisible=!1,this.authText="",this.authTextMax=4,this.onS1Clicked=e=>{this.Result=N.Secret,this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB1Clicked=e=>{switch(this.buttonType){case k.None:this.Result=N.None;break;case k.Ok:this.Result=N.Ok;break;case k.OkCancel:this.Result=N.Ok;break;case k.YesNo:this.Result=N.Yes;break;case k.YesNoCancel:this.Result=N.Yes;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB2Clicked=e=>{switch(this.buttonType){case k.None:this.Result=N.None;break;case k.Ok:this.Result=N.None;break;case k.OkCancel:this.Result=N.Cancel;break;case k.YesNo:this.Result=N.No;break;case k.YesNoCancel:this.Result=N.No;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB3Clicked=e=>{switch(this.buttonType){case k.None:this.Result=N.None;break;case k.Ok:this.Result=N.None;break;case k.OkCancel:this.Result=N.Cancel;break;case k.YesNo:this.Result=N.No;break;case k.YesNoCancel:this.Result=N.Cancel;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onWindowKeyboard=e=>{e.key.length===1&&this.onAuthKeyProc(e.key)},this.onAuthButtonClicked=e=>{const t=e.target;t!==null&&this.onAuthKeyProc(t.textContent)}}get btnNameS(){return`${this.parentName}-s1`}get btnName1(){return`${this.parentName}-b1`}get btnName2(){return`${this.parentName}-b2`}get btnName3(){return`${this.parentName}-b3`}get chkName1(){return`${this.parentName}-chk1`}get authName1(){return`${this.parentName}-auth1`}get authBtnName(){return`${this.parentName}-authBtn`}setParent(e){this.parentName=`${e}-msg-box`}setTypes(e,t){this.buttonType=e,this.iconType=t}setOk(e=Ce.Ok){this.setTypes(k.Ok,e)}setOkCancel(e=Ce.Question){this.setTypes(k.OkCancel,e)}setYesNo(e=Ce.Question){this.setTypes(k.YesNo,e)}setYesNoCancel(e=Ce.Question){this.setTypes(k.YesNoCancel,e)}async showWait(e,t=null){return this.remove(),this.createUI(e,t===null?this.title:t,!0),new Promise(s=>{this.resolver=s;let i=!1,n=!1,o=!1;switch(this.buttonType){case k.None:break;case k.Ok:i=!0,n=!1,o=!1;break;case k.OkCancel:i=!0,n=!0,o=!1;break;case k.YesNo:i=!0,n=!0,o=!1;break;case k.YesNoCancel:i=!0,n=!0,o=!0;break}i&&document.getElementById(this.btnName1)?.addEventListener("click",this.onB1Clicked,{once:!0}),n&&document.getElementById(this.btnName2)?.addEventListener("click",this.onB2Clicked,{once:!0}),o&&document.getElementById(this.btnName3)?.addEventListener("click",this.onB3Clicked,{once:!0}),this.SecretEnable&&document.getElementById(this.btnNameS)?.addEventListener("click",this.onS1Clicked,{once:!0})})}onAuthKeyProc(e){if(this.authText.length<this.authTextMax&&/[a-zA-Z0-9]/.test(e)){this.authText+=e;const t=this.authText.length;let s="";for(let n=0;n<this.authTextMax;n++)n<t?s+="●":s+="○";const i=document.getElementById(this.authName1);i.innerText=s}if(this.authText.length>=this.authTextMax&&this.onAuthChecking!==void 0&&this.onAuthChecking(this.authText)){window.removeEventListener("keydown",this.onWindowKeyboard);for(let s=0;s<10;s++){const i=`${this.authBtnName}-b${s}`,n=document.querySelectorAll(`.${i}`);if(n.length!==1)continue;const o=n[0];o!==null&&o.removeEventListener("click",this.onAuthButtonClicked)}this.remove(),this.resolver&&this.resolver(this.Result)}}showNoWait(e,t="INFO"){this.remove(),this.createUI(e,t,!1)}showNoWaitEnd(){this.remove()}createUI(e,t,s){let i=`<button id="${this.btnNameS}" class="${this.btnNameS}">${this.btnS}</button>`,n="",o="",l="";switch(this.buttonType){case k.None:break;case k.Ok:n=`<button id="${this.btnName1}">${this.btnOk}</button>`,o="";break;case k.OkCancel:n=`<button id="${this.btnName1}">${this.btnOk}</button>`,o=`<button id="${this.btnName2}">${this.btnCancel}</button>`;break;case k.YesNo:n=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`;break;case k.YesNoCancel:n=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`,l=`<button id="${this.btnName3}">${this.btnCancel}</button>`;break}let a="";this.CheckVisible&&(a=`
<div style="padding: 5px 10px; font-size: 0.9em; text-align: left;">
    <label>
        <input type="checkbox" id="${this.chkName1}">${this.CheckText}
    </label>
</div>
`.trim());let r="";if(this.AuthVisible){let u="";for(let p=0;p<10;p++){const I=`${this.authBtnName}-b${p}`;u+=`<button class="${I}" id="${I}">${p}</button>`}r=`
<div style="padding: 5px 10px; font-size: 0.9em; text-align: left;">
    <label>
        <div class="${this.authName1}" id="${this.authName1}" tabindex="0">〇 〇 〇 〇</div>
    </label>
    ${u}
</div>
`.trim()}const c=`${a}${n}${o}${l}`,h=c!==""?`<div class="msg-footer">${c}</div>`:"",d=document.createElement("div");if(d.id=this.parentName,d.innerHTML=`
            <div class="msg-overlay">
                <div class="msg-panel">
                    <div class="msg-header">${t}${i}</div>
                    <div class="msg-body">${e}${r}</div>
                    ${h}
                </div>
            </div>
        `.trim(),this.applyCss(),document.body.appendChild(d),this.AuthVisible){document.getElementById(this.authName1).focus(),this.authText="",window.addEventListener("keydown",this.onWindowKeyboard);for(let p=0;p<10;p++){const I=`${this.authBtnName}-b${p}`,T=document.querySelectorAll(`.${I}`);if(T.length!==1)continue;const x=T[0];x!==null&&x.addEventListener("click",this.onAuthButtonClicked)}}}applyCss(){const e=`${this.parentName}-style`;if(document.getElementById(e))return;let t="";for(let i=0;i<10;i++){const n=`${this.authBtnName}-b${i}`;t+=`
#${this.parentName} .${n} {
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
    padding: 10px; border-top: 1px solid #eee; text-align: right;
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
`.trim(),document.head.appendChild(s)}setCheckResult(){const e=document.getElementById(this.chkName1);if(e!==null){const t=e.checked;this.Checked=t}}remove(){document.getElementById(this.btnName1)?.removeEventListener("click",this.onB1Clicked),document.getElementById(this.btnName2)?.removeEventListener("click",this.onB2Clicked),document.getElementById(this.btnName3)?.removeEventListener("click",this.onB3Clicked),document.getElementById(this.btnNameS)?.removeEventListener("click",this.onS1Clicked),document.getElementById(this.parentName)?.remove()}}class kt{constructor(){this.tblNameCharImages="CharImages",this.tblCharImages={name:this.tblNameCharImages,columns:{ns:{dataType:"string",index:!0},name:{dataType:"string"},fileName:{dataType:"string",index:!0},fileData:{dataType:"object"}}},this.tblNameSettings="Settings",this.tblSettings={name:this.tblNameSettings,columns:{key:{dataType:"string",primaryKey:!0},value:{dataType:"string"}}},this.tblNameActionLog="ActionLog",this.tblActionLog={name:this.tblNameActionLog,columns:{id:{primaryKey:!0,autoIncrement:!0},logType:{dataType:"string"},log:{dataType:"string"}}},this.dbName="EvonaDB",this.db={name:this.dbName,tables:[this.tblCharImages,this.tblSettings,this.tblActionLog]}}async connect(e){console.log("Waiting for JsStore library...");let t=0;for(;typeof window.JsStore>"u";){if(t>50)throw new Error("JsStore library load timeout. Check script tag order.");await new Promise(i=>setTimeout(i,100)),t++}const s=window.JsStore;this.connection=new s.Connection(new Worker(e)),console.log("connection started with library version:",s.VERSION)}async term(){await this.connection.terminate(),console.log("connection terminated")}async initDb(){const e=await this.connection.initDb(this.db);return console.log(e?"Db Created & connection is opened":"Db connection is opened"),e}async dropDb(){let e=!1;return await this.connection.dropDb().then(function(){console.log("Db deleted successfully"),e=!0}).catch(function(){console.error("dropDb error")}),e}async deleteAllRecords(e){return await this.existsTable(e)===!1?(console.log(`[${e}] not exist`),!1):(await this.connection.clear(e),console.log(`[${e}] all record deleted successfully`),!0)}async existsTable(e){try{const t=await this.connection.count({from:e});return!0}catch(t){console.log("[existsTable] JsStore Select Error:",t)}return!1}get defWorkerFile(){return window.EVONA_CONFIG.workerFile}async setup(){return await this.connect(this.defWorkerFile),await this.initDb()}sortByIdAscAsNum(e){e&&e.sort((t,s)=>Number(t.id)-Number(s.id))}}class wt extends kt{async insert(e,t){await this.connection.insert({into:this.tblNameSettings,values:[{key:e,value:t}],upsert:!0})}async insertMultiple(e){const t=e.map(s=>({key:s.key,value:s.value}));return await this.connection.insert({into:this.tblNameSettings,values:t,upsert:!0})}async selectKey(e){try{var t=await this.connection.select({from:this.tblNameSettings,where:{key:e}});return t.length>=1?t[0].value:null}catch(s){console.error("[selectKey] JsStore Select Error:",s)}return null}async countKey(e){try{return await this.connection.count({from:this.tblNameSettings,where:{key:e}})}catch(t){console.error("[countKey] JsStore Select Error:",t)}return-1}async clear(){await this.deleteAllRecords(this.tblNameSettings)}}class St{constructor(){this.table=new wt}async init(){const e=new wt;await e.setup(),this.table=e}async saveDialogPos(e){const t=e.parentElement,s=`${t?.className},${t?.style.left},${t?.style.top}`;await this.table.insert(e.className,`${s}`)}async loadDialogPos(e){const t=e.parentElement,s=await this.table.selectKey(e.className);if(s!==null){const i=s.split(",");i.length===3&&t!==null&&i[0]===t.className&&(t.style.left=i[1],t.style.top=i[2])}}async clear(){this.table.clear()}}class _e extends kt{async insert(e,t){await this.connection.insert({into:this.tblNameActionLog,values:[{logType:e,log:t}]})}async insertMultiple(e){const t=e.map(s=>({logType:s.logType,log:s.log}));return await this.connection.insert({into:this.tblNameActionLog,values:t})}async selectType(e){try{var t=await this.connection.select({from:this.tblNameActionLog,where:{logType:e},order:{by:"id",type:"asc"}});return this.sortByIdAscAsNum(t),t.length>=1?t:null}catch(s){console.error("[selectType] JsStore Select Error:",s)}return null}async countType(e){try{return await this.connection.count({from:this.tblNameActionLog,where:{logType:e}})}catch(t){console.error("[countType] JsStore Select Error:",t)}return-1}async clear(){await this.deleteAllRecords(this.tblNameActionLog)}}class Vt{constructor(){this.table=new _e}async init(){const e=new _e;await e.connect(e.defWorkerFile),await e.initDb(),this.table=e}async clear(){this.table.clear()}async put(e,t){return await this.table.insert(e,t)}async get(e){const t=await this.table.selectType(e);if(t===null)return null;const s=new Array;for(const i of t)s.push({id:i.id,log:i.log});return s}}const pe={CharSummaryAction:"CharSummaryAction",ResourceEditAction:"ResourceEditAction",ScoreEditAction:"ScoreEditAction"};let Be=null;async function Jt(){return Be||(Be=new St,await Be.init(),console.log("SettingAccess instance created (Singleton)")),Be}let Ae=null;async function le(){return Ae||(Ae=new Vt,await Ae.init(),console.log("LogAccess instance created (Singleton)")),Ae}function qt(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,m=>{const e=Math.random()*16|0;return(m==="x"?e:e&3|8).toString(16)})}function Gt(){const m=Date.now().toString(16),e=qt();return`${m}-${e}`}async function jt(m){const e=m.cmd.split(":");let t=!1;switch(e[0]){case"drop":t=Wt();break;case"ref":t=document.referrer;break}const s=`[${m.cmd}] res=${t}`;alert(s)}async function Wt(){const m=new _e;return await m.setup(),await m.dropDb()}const ce={plus:"plus.png",win:"win.png",even:"even.png",lost:"lost.png",demo:"demo.png"};class Kt{constructor(){this.imageHome="",this.cache=new Map,this.cacheNs=new Map,this.zip=null,this.zipNs=new Map,this.isMultiZip=!1,this.materials=[{ns:"",fileName:ce.plus},{ns:"",fileName:ce.win},{ns:"",fileName:ce.even},{ns:"",fileName:ce.lost},{ns:"",fileName:ce.demo}],this.AnyNs=""}get demoMaterial(){return ce.demo}async setupNs(e,t,s){const i=s.findByNs(e);if(i!==void 0){this.imageHome=t.imageHome;for(const n of i){const o=n.iconFileName,l=`${this.imageHome}${e}/${o}`;this.cache.set(o,l),this.cacheNs.set(o,e)}this.isMultiZip=!0;for(const n of this.materials){const o=n.fileName,l=`${this.imageHome}${o}`;this.cache.set(o,l),this.cacheNs.set(o,e)}}}async checkExists(e){try{return(await fetch(e,{method:"HEAD"})).ok}catch{return!1}}isMaterial(e){return this.materials.find(s=>s.fileName.includes(e))!==void 0}get loaded(){return this.isMultiZip?this.zipNs.size!==0:this.zip!==null}async _loadZipBy(e,t){const s=new $e;this.imageHome=s.imageHome.substring(2);const i=await s.loadBinFile(e);let n=null;if(s.isWebRunning)n=await window.JSZip.loadAsync(i);else{const{loadZipNode:o}=await import(s.nodeToolsImportFilename);n=await o(i)}this.zipNs.set(t,n),this.isMultiZip=!0}async getImageUrlBy(e,t){if(this.isMaterial(e))return`${this.imageHome}${e}`;if(this.cache.has(e)){const i=this.cache.get(e);if(!await this.checkExists(i)){const o=`${this.imageHome}notexist.png`;this.cache.set(e,o)}return this.cache.get(e)}return null}async findNs(e){if(!this.isMultiZip)return null;if(this.cacheNs.has(e)){const t=this.cacheNs.get(e);if(t!==void 0)return t}return null}dispose(){for(const e of this.cache.values())URL.revokeObjectURL(e);this.cache.clear()}}class be{constructor(){this.parentElem=null,this.cancel=!1,this.targetId="",this.classify="",this.selectedValue="",this.Keydown="",this.KeyEnter=he.None}}class Ie{constructor(){this.callerName="",this.result=""}}class Ze{constructor(){this.parentElem=null,this.left="",this.top="",this.width="",this.height=""}}const De={Enter:"Enter",Escape:"Escape",Tab:"Tab",Process:"Process"},he={None:"None",Normal:"Normal",Special:"Special"},M={Btn:"Btn",Img:"Img",Label:"Label",LabelRO:"LabelRO",Combo:"Combo",Input:"Input",Plain:"Plain",Table:"Table"};class se{static get borderShadowText(){return`
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
&::-webkit-scrollbar-thumb:hover { background: #fbc02d; }
`.trim()}}se.width="16px";class nt{constructor(){this.imgSrc="",this.imgFile="",this.alt=""}}class ot{constructor(){this.selectedItem="",this.selectionPair=[],this.classify=""}}class ee{constructor(){this.type="text",this.value="",this.placeholder=""}}class $t{constructor(){this.typeInfo=new Et,this.className=""}ToHTML(){let e="";switch(this.typeInfo.using.itemType){case M.Btn:e=this.typeInfo.ToButtonHTML(this.className);break;case M.Label:e=this.typeInfo.ToLableHTML(this.className);break;case M.LabelRO:e=this.typeInfo.ToLableROHTML(this.className);break;case M.Combo:e=this.typeInfo.ToComboHTML(this.className);break;case M.Input:e=this.typeInfo.ToInputHTML(this.className);break;case M.Img:e=this.typeInfo.ToImgHTML(this.className,this.typeInfo.using.img.alt);break;case M.Plain:e=this.typeInfo.using.innerHTML;break}return e}copyTo(e){e.className=this.className,e.typeInfo.toolTip=this.typeInfo.toolTip,e.typeInfo.using.itemType=this.typeInfo.using.itemType,e.typeInfo.using.label=this.typeInfo.using.label,e.typeInfo.using.combo=this.typeInfo.using.combo,e.typeInfo.using.input=this.typeInfo.using.input,e.typeInfo.using.innerHTML=this.typeInfo.using.innerHTML,e.typeInfo.using.img=this.typeInfo.using.img}}class Ue{constructor(){this.items=new Array}makeItems(e=1){this.items.length>0&&this.items.splice(0,this.items.length);for(let t=0;t<e;t++){const s=new $t;this.items.push(s)}}ToHTML(){let e="";for(const t of this.items){const s=t.ToHTML();s!==""&&(this.items.length>=2?e=`${e}<div>${s}</div>`:e=s)}return e}}class lt{constructor(){this.rowName="",this.cols=new Array}makeCols(e){this.cols.length>0&&this.cols.splice(0,this.cols.length);for(let t=0;t<e;t++){const s=new Ue;s.makeItems(),this.cols.push(s)}}ToHTML(){let e="";for(const t of this.cols){let s="";s=t.ToHTML(),s!==""&&(e=`${e}<td>${s}</td>`)}return e}toTemplate(){const e=new lt;e.rowName=this.rowName;for(const t of this.cols){const s=new Ue;s.makeItems(t.items.length);let i=-1;for(const n of t.items){i++;const o=s.items[i];o.className=n.className,o.typeInfo.toolTip=n.typeInfo.toolTip,o.typeInfo.using.itemType=n.typeInfo.using.itemType,o.typeInfo.using.label=n.typeInfo.using.label,o.typeInfo.using.combo=n.typeInfo.using.combo,o.typeInfo.using.input=n.typeInfo.using.input,o.typeInfo.using.innerHTML=n.typeInfo.using.innerHTML,o.typeInfo.using.img=n.typeInfo.using.img}e.cols.push(s)}return e}}class K{constructor(){this.tableName="",this.rows=new Array,this.template=null,this.invalidRowIndex=-1,this.firstRowIndex=1,this.fontSize="font-size: 0.9em;",this.clipboardText=""}makeDim(e,t){this.rows.length>0&&this.rows.splice(0,this.rows.length);for(let s=0;s<t;s++){const i=new lt;i.makeCols(e),this.rows.push(i)}}growCell(e,t=1){const s=this.rows.length;for(let i=0;i<s;i++)this.rows[i].cols[e].makeItems(t)}getCell(e,t,s=0){return this.rows[t].cols[e].items[s]}ToHTML(e="",t){this.tableName=e;let s="",i=0;for(const a of this.rows){i++;let r="";if(r=a.ToHTML(),r!==""){const c=a.rowName!==""?` class="${a.rowName}"`:"";s=`${s}<tr ${c} item-id="${i}">${r}</tr>`}}const n=e!==""?` class="${e}"`:"",o=t!==""?` id="${t}"`:"",l=t!==""?` item-id="${t}"`:"";return s=`<table${n}${o}${l}>${s}</table>`,s}ToScrollHTML(e="",t){const s=e!==""?` class="${e}"`:"",i=t!==""?` item-id="${t}"`:"";return`<div${s}${i}>
${this.ToHTML(e,t)}
</div>`}makeRowTemplate(e){if(this.rows.length>=1){for(const t of this.rows)t.rowName=e;this.template=this.rows[0].toTemplate()}}clearRows(){this.rows=new Array}addRow(e){const t=this.getTable();if(t===null)return-1;const s=t.insertRow(-1),i=t.rows.length;if(s.className=e,s.setAttribute("item-id",`${i}`),this.template!==null&&this.template.cols.length>=1){const n=this.template.toTemplate();let o="";for(const l of n.cols){let a="";for(const r of l.items){r.typeInfo.using.itemId=i;const c=r.ToHTML();c!==""&&(l.items.length>=2?a=`${a}<div>${c}</div>`:a=c)}a!==""&&(o=`${o}<td>${a}</td>`)}return s.innerHTML=o,i}return-1}deleteRow(e){const t=this.getTable();if(t===null)return!1;for(const s of t.rows){const i=s.getAttribute("item-id");if(i!==null&&i===`${e}`)return t.deleteRow(e-this.firstRowIndex),!0}return!1}redimAllRows(){const e=this.getTable();if(e===null)return;let t=this.firstRowIndex-1;for(const s of e.rows)if(s.getAttribute("item-id")!==null){t++,s.setAttribute("item-id",`${t}`);for(const n of s.cells)this.redimElems(n.children,t)}}redimElems(e,t){for(const s of e)s.getAttribute("item-id")!==null&&s.setAttribute("item-id",`${t}`),s.children!==void 0&&this.redimElems(s.children,t)}selectRow(e){const t=this.getTable();if(t!==null&&!(e<=0)&&!(e>t.rows.length)){for(const s of t.rows)s.classList!==void 0&&s.classList.remove("selected");t.rows[e-1].classList.add("selected")}}getSelectedRow(){const e=this.getTable();if(e===null)return this.invalidRowIndex;for(const t of e.rows)if(t.classList!==void 0&&t.classList.contains("selected")){const s=t.getAttribute("item-id");return s!==null?parseInt(s):this.invalidRowIndex}return this.invalidRowIndex}updateRowImage(e,t){const i=this.getTable()?.querySelector(`tr[item-id="${e}"] img`);i instanceof HTMLImageElement&&(i.src=t)}updateRowImageToolTip(e,t){const i=this.getTable()?.querySelector(`tr[item-id="${e}"] img`);i instanceof HTMLImageElement&&(i.title=t)}updateText(e,t){if(e.children!==null){const s=e.children[0];s.textContent=t}}scroll(e){const t=this.getTable();if(t===null||e<=0||e>t.rows.length)return null;const s=t.querySelector(`tr[item-id="${e}"] img`);return s===null||s===void 0?null:(s.scrollIntoView({behavior:"smooth",block:"center"}),s)}getRowElems(){const e=this.getTable();return e===null?null:e.rows}getElemValue(e){return e instanceof HTMLInputElement||e instanceof HTMLSelectElement?e.value:null}setElemValue(e,t){if(e instanceof HTMLInputElement){const s=e,i=s.value;return s.value=t,i}else if(e instanceof HTMLSelectElement){const s=e,i=s.value;return s.value=t,i}return null}getRowElem(e){const t=this.getTable();if(t===null)return null;for(const s of t.rows){const i=s.getAttribute("item-id");if(i!==null&&i===`${e}`)return console.log(`match row id : ${i}`),t.rows[e-this.firstRowIndex]}return null}getCellElems(e){if(e===null)return null;const t=new Array;for(const s of e.cells){if(s===null)continue;const i=new Array;for(const n of s.children)i.push(n);t.push(i)}return t}setVisible(e){const t=this.getTable();return t===null?null:(t.hidden=!e,t.parentElement.hidden=!e,!0)}getCellRect(e){const t=new R,s=t.GetRect(e.parentElement),i=t.GetRect(e),n=new Ze;return n.left=`${i.left}`,n.top=`${s.top}`,n.width=`${i.width}`,n.height=`${i.height}`,n}getTableOwnerRect(e){const t=new R,s=t.GetRect(e.parentElement.parentElement.parentElement.parentElement.parentElement);console.log(`[OWNER] ${s.left}, ${s.top}`);const i=t.GetRect(e.parentElement.parentElement.parentElement);console.log(`[TABLE] ${i.left}, ${i.top}`);const n=t.GetRect(e.parentElement.parentElement);console.log(`[TBODY] ${n.left}, ${n.top}`);const o=t.GetRect(e.parentElement);console.log(`[TROW] ${o.left}, ${o.top}`);const l=new Ze;return l.left=`${i.left}`,l.top=`${s.top}`,l.width="0",l.height="0",l}makeCallerName(e,t){return`${e}:${t}`}getCallerCellElem(e){const t=e.split(":");if(t===void 0||t.length!==2)return null;const s=this.getRowElem(parseInt(t[1]));if(s===null)return null;const i=this.getCellElems(s);if(i===null)return null;for(const n of i)for(const o of n)if(o.className===t[0])return o;return null}async toClipboard(){const e=this.getTable();if(e===null)return!1;let t="";for(const i of e.rows){let n="";const o=this.getCellElems(i);if(o===null)return!1;for(const l of o){let a="";for(const r of l){const c=this.getElemValue(r);let h=c===null?"&null&":`&${c}&`;a.length!==0?a=`${a}	${h}`:a=h}n.length!==0?n=`${n}	${a}`:n=`${a}`}t.length!==0?t=`${t}
${n}`:t=`${n}`}const s=`table:{${t}}`;try{await navigator.clipboard.writeText(s)}catch(i){return console.error("コピー失敗...",i),!1}return!0}async fromClipboard(){const e=this.getTable();if(e===null)return!1;let t="";try{t=await navigator.clipboard.readText()}catch(o){return console.error("ペースト失敗...",o),!1}this.clipboardText=t;const s="table:{";if(t.length<s.length+1||t.startsWith(s)===!1||t.endsWith("}")===!1)return!1;t=t.substring(s.length),t=t.substring(0,t.length-1);const i=t.split(`
`);let n=0;for(const o of e.rows){const a=i[n].split("	"),r=this.getCellElems(o);if(r===null)return!1;if(a.length!==r.length)return console.log(`different column size : line ${n+1}`),!1;n++}n=0;for(const o of e.rows){const a=i[n].split("	"),r=this.getCellElems(o);if(r===null)return!1;let c=0;for(const h of r){let d=a[c];if(d.startsWith("&")!==!1&&d.endsWith("&")!==!1&&(d=d.substring(1,d.length-1),d!=="null")){for(const u of h){this.setElemValue(u,d);break}c++}}n++}return!0}getTable(){const e=`.${this.tableName}`,t=document.querySelectorAll(e);if(t===null||t.length<=0)return null;const i=t[0].querySelectorAll(e);return i===null||i.length<=0?null:i[0]}setFontConfig(e="0.9"){this.fontSize=`font-size: ${e}em;`}getCssText(e,t,s){return`
/* テーブル */
.${e} {
width: 100%;                /* テーブル全体を親要素いっぱいに広げる */
table-layout: fixed;        /* これが重要！これで td の％指定が絶対になります */
height: 300px;              /* ダイアログに合わせた固定高 */
overflow-y: auto;
${se.scrollBarText}
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
`.trim()}}class Yt{constructor(){this.htmlMaker=new R,this.table=new K,this.gridElem=null,this.headerElem=null,this.footerElem=null}makeKeyCell(e,t,s){const i=new $t;return i.typeInfo.setLabel(e,!1),i.className=t,i.typeInfo.toolTip=s,i}makePair(){return new Map}setPair(e){if(e.size===0)return!1;this.table.makeDim(2,e.size),e.forEach((s,i)=>{this.table.growCell(1,s.items.length)});let t=-1;return e.forEach((s,i)=>{t++,this.table.getCell(0,t).typeInfo.setLabel(i.typeInfo.using.label,!1),this.table.getCell(0,t).className=i.className;let n=-1;for(const o of s.items)n++,this.table.getCell(1,t,n).typeInfo=o.typeInfo,this.table.getCell(1,t,n).className=o.className}),!0}setListener(e,t,s,i="",n=""){this.dispose(),this.table.makeRowTemplate(t);const o=document.getElementById(s);if(o===null)return console.log(`[setListener] cannot found ${s}`),!1;const l=this.table.ToScrollHTML(e,e),a=new V;a.props.name="",a.props.id=e,a.props.className=e,a.props.option.setTable(l),a.props.option.onSelect=async h=>{console.log(`classify = ${h.classify} targetId = ${h.targetId}`),this.onSelect!==void 0&&await this.onSelect(h)},this.htmlMaker=new R,this.htmlMaker.add(a);const r=this.htmlMaker.ToHTML();let c=document.createElement("div");return c.className=e,c.innerHTML=r,this.gridElem=c.children[0],i!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=i,this.headerElem.id=i,o.appendChild(this.headerElem)),o.appendChild(this.gridElem),c.remove(),c=null,n!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=n,this.footerElem.id=n,o.appendChild(this.footerElem)),!0}getSelectedRow(){return this.table.getSelectedRow()}enableEvents(e){return this.gridElem===null?!1:(this.htmlMaker.enableTableEvents(this.gridElem.className),this.onSelect=e,!0)}disableEvents(){return this.gridElem===null?!1:(this.htmlMaker.disableTableEvents(this.gridElem.className),!0)}setVisible(e){return this.gridElem===null?!1:(this.gridElem.hidden=!e,!0)}dispose(){this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.gridElem!==null&&(this.gridElem.parentElement?.removeChild(this.gridElem),this.gridElem.remove()),this.disableEvents(),this.headerElem=null,this.footerElem=null,this.gridElem=null}getCssText(e,t,s){return this.table.getCssText(e,t,s)}}class at{constructor(){this.ctlName="",this.ovElem=null}firstAction(e,t){const s=document.getElementById(t);return s===null?(console.log(`[firstAction] cannot found ${t}`),null):(this.createOverlay(s),this.ctlName=e,s)}createOverlay(e){const t=document.createElement("div");t.id=`${this.ovCssName()}`,t.style.position="absolute",t.style.inset="0",t.style.zIndex=this.zIndexOv(),t.style.background="transparent",t.style.background="rgba(0,0,0,0.1)",e.appendChild(t),this.ovElem=t}getBaseElem(){return this.ovElem!==null?this.ovElem.parentElement:null}getOuterCssText(){return`
.${this.ctlName} {
  position: absolute;
  inset: auto;

  padding: 0;       /* 内側の余白をゼロに */
  border: none;     /* 枠線を消す（枠線があると1px〜ズレます） */
  overflow: hidden; /* 中身がはみ出さないように（任意） */

  ${se.borderShadowText}

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
        `.trim()}dispose(){this.ovElem!==null&&(this.ovElem.parentElement?.removeChild(this.ovElem),this.ovElem.remove())}ovCssName(){return`${this.ctlName}-barrier`}zIndexCtl(){return"1000"}zIndexOv(){return"999"}}const He={ByText:"ByText",ByValue:"ByValue",Both:"Both"};class Xt extends at{constructor(){super(...arguments),this.ctlName="",this.initValue="",this.selectedIndex=-1,this.delimiter="/",this.callerName="",this.htmlMaker=new R,this.table=new K,this.ctlElem=null,this.onUpAction=async()=>{this.keyValuePairs!==void 0&&(this.selectedIndex=this.selectedIndex<=0?this.keyValuePairs.length-1:this.selectedIndex-1,this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]))},this.onDnAction=async()=>{this.keyValuePairs!==void 0&&(this.selectedIndex=this.selectedIndex>=this.keyValuePairs.length-1?0:this.selectedIndex+1,this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]))}}setListener(e,t,s){this.dispose(),this.callerName=s,this.ctlName=e;const i=new K;i.makeDim(1,3);let n=0;i.getCell(0,n).typeInfo.setButton("▲"),i.getCell(0,n).className=this.upCssName(),i.getCell(0,n).typeInfo.using.itemId=n,n++,i.getCell(0,n).typeInfo.setButton(""),i.getCell(0,n).className=this.valCssName(),i.getCell(0,n).typeInfo.using.itemId=n,n++,i.getCell(0,n).typeInfo.setButton("▼"),i.getCell(0,n).className=this.dwCssName(),i.getCell(0,n).typeInfo.using.itemId=n;const o=this.firstAction(e,t);if(o===null)return!1;const l=i.ToScrollHTML(e,e),a=new V;a.props.name="",a.props.id=this.tblCssName(),a.props.className=this.tblCssName(),a.props.option.setTable(l),a.props.option.onSelect=async u=>{switch(u.classify){case this.valCssName():if(this.onApply!==void 0){const p=new Ie;p.callerName=this.callerName,p.result=this.keyValuePairs[this.selectedIndex],await this.onApply(p)}break;case this.upCssName():if(this.onUp!==void 0){const p=new Ie;p.callerName=this.callerName,p.result=this.keyValuePairs[this.selectedIndex],await this.onUp(p),u.cancel||this.onUpAction()}break;case this.dwCssName():if(this.onDown!==void 0){const p=new Ie;p.callerName=this.callerName,p.result=this.keyValuePairs[this.selectedIndex],await this.onDown(p),u.cancel||this.onDnAction()}break}},this.htmlMaker=new R,this.htmlMaker.add(a);const r=this.htmlMaker.ToHTML();let c=document.createElement("dialog");c.className=e,c.innerHTML=r,this.ctlElem=c;let h=c.children[0],d=h.children[0];return d.className=`${this.tblCssName()}`,d.id=`${this.tblCssName()}`,this.ctlElem.appendChild(d),h.remove(),h=null,o.appendChild(this.ctlElem),this.table=i,!0}setSelectedByValue(e,t,s=He.Both){const i=new Array;switch(s){case He.ByText:i.push(0);break;case He.ByValue:i.push(1);break;case He.Both:i.push(0),i.push(1);break;default:return!1}this.initValue=e,this.keyValuePairs=t,this.selectedIndex=-1;const n=e.split(this.delimiter);let o=n.length>=2?n[1]:e,l="";for(const a of i){let r=-1;for(const c of t)if(r++,c!==null&&c!==""){const h=c.split(this.delimiter);if(h.length>=2&&h[a]===o){this.selectedIndex=r,l=h[0];break}}if(this.selectedIndex!==-1)break}if(this.selectedIndex===-1){const r=t[0].split(this.delimiter);this.selectedIndex=0,l=r[0]}return this.updateValueElemByText(l),this.selectedIndex!==-1}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-updn-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e,t,s){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onApply=e,this.onUp=t,this.onDown=s,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}updateValueElemByKeyValue(e){if(this.ctlElem===null)return;let t="";const s=e.split(this.delimiter);s.length>=2&&(t=s[0]),this.updateValueElemByText(t)}updateValueElemByText(e){if(this.ctlElem===null)return;const t=this.ctlElem.querySelectorAll(`.${this.valCssName()}`);t!==null&&(t[0].textContent=e)}tblCssName(){return`${this.ctlName}-tbl`}upCssName(){return`${this.ctlName}-upBtn`}dwCssName(){return`${this.ctlName}-dwBtn`}valCssName(){return`${this.ctlName}-values`}}class Ke{constructor(){this.key="",this.text=""}}class Qt extends at{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new R,this.table=new K,this.ctlElem=null}setChoiceItems(e){this.items=e}setListener(e,t,s){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const i=this.items.length,n=new K;n.makeDim(1,i);let o=0;for(const p of this.items)n.getCell(0,o).typeInfo.setButton(`${p.text}`),n.getCell(0,o).className=`${e}-${p.key}`,n.getCell(0,o).typeInfo.using.itemId=o,o++;const l=this.firstAction(e,t);if(l===null)return!1;const a=n.ToScrollHTML(e,e),r=new V;r.props.name="",r.props.id=this.tblCssName(),r.props.className=this.tblCssName(),r.props.option.setTable(a),r.props.option.onSelect=async p=>{if(console.log(`classify = ${p.classify} targetId = ${p.targetId}`),this.onSelect!==void 0){const I=parseInt(p.targetId),T=new Ie;T.callerName=this.callerName,T.result=0<=I&&I<this.items.length?this.items[I].key:"",await this.onSelect(T)}},this.htmlMaker=new R,this.htmlMaker.add(r);const c=this.htmlMaker.ToHTML();let h=document.createElement("dialog");h.className=e,h.innerHTML=c,this.ctlElem=h;let d=h.children[0],u=d.children[0];return u.className=`${this.tblCssName()}`,u.id=`${this.tblCssName()}`,this.ctlElem.appendChild(u),d.remove(),d=null,l.appendChild(this.ctlElem),this.table=n,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-updn-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}tblCssName(){return`${this.ctlName}-tbl`}}class _t{constructor(){this.key="",this.text=""}}class Zt extends at{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new R,this.table=new K,this.ctlElem=null,this.headerElem=null,this.footerElem=null}setGridtems(e){this.items=e}setListener(e,t,s,i="",n=""){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const o=this.items.length,l=new K;l.makeDim(2,o);let a=0;for(const x of this.items)l.getCell(0,a).typeInfo.setLabel(`${x.text}`,!1),l.getCell(0,a).className=this.keyCssName(),l.getCell(0,a).typeInfo.using.itemId=a,l.getCell(1,a).typeInfo=x.value.items[0].typeInfo,l.getCell(1,a).className=this.valueCssName(),l.getCell(1,a).typeInfo.using.itemId=a,a++;const r=this.firstAction(e,t);if(r===null)return!1;const c=l.ToScrollHTML(e,this.tblCssName()),h=new V;h.props.name="",h.props.id=this.tblCssName(),h.props.className=this.tblCssName(),h.props.option.setTable(c),h.props.option.onSelect=async x=>{if(this.onSelect!==void 0){const A=new Ie;A.callerName=x.classify,A.result=x.selectedValue,await this.onSelect(A)}},this.htmlMaker=new R,this.htmlMaker.add(h);const d=this.htmlMaker.ToHTML();let u=document.createElement("dialog");u.className=e,u.innerHTML=d,this.ctlElem=u;let p=u.children[0];const I=this.divCssName();p.className=I,p.id=I;let T=p.children[0];return T.className=`${this.tblCssName()}`,T.id=`${this.tblCssName()}`,i!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=i,this.headerElem.id=i,u.appendChild(this.headerElem)),r.appendChild(this.ctlElem),n!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=n,this.footerElem.id=n,u.appendChild(this.footerElem)),this.table=l,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}setFontConfig(e="0.9"){this.table.setFontConfig(e)}applyCss(){const e=`${this.getBaseElem().className}-flgrd-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
${this.table.getCssText(this.divCssName(),this.keyCssName(),this.valueCssName())}
.${this.ctlName} {
width: 200px;
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}divCssName(){return`${this.ctlName}-div`}tblCssName(){return`${this.ctlName}-tbl`}keyCssName(){return`${this.ctlName}-key`}valueCssName(){return`${this.ctlName}-value`}}class es{constructor(){this.itemType=M.Img,this.itemId=-1,this.label="",this.innerHTML=""}}class Et{constructor(){this.toolTip="",this.using=new es}setButton(e){this.using.itemType=M.Btn,this.using.label=e}setLabel(e,t){this.using.itemType=t?M.Label:M.LabelRO,this.using.label=e}setCombo(e){this.using.itemType=M.Combo,this.using.combo=e}setInput(e){this.using.itemType=M.Input,this.using.input=e}setImg(e){this.using.itemType=M.Img,this.using.img=e}setPlain(e){this.using.itemType=M.Plain,this.using.innerHTML=e}setTable(e){this.using.itemType=M.Table,this.using.innerHTML=e}ToButtonHTML(e){const t=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"";return`
<button class="${e}"${t}>${this.using.label}</button>
`.trim()}ToLableHTML(e){return`
<span class="${e}" data-readonly="false">${this.using.label}</span>
`.trim()}ToLableROHTML(e){return`
<span class="${e}" data-readonly="true">${this.using.label}</span>
`.trim()}ToComboHTML(e){if(this.using.combo===void 0)return"";const t=this.using.combo;let s=V.makeComboItemsHTML(t);const i=t.classify!==""?` data-classify="${t.classify}"`:"";return`
<select class="${e}" ${i}>
  ${s}
</select>
`.trim()}ToInputHTML(e){if(this.using.input===void 0)return"";const t=this.using.input,s=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"",i=t.value!==""?` value="${t.value}"`:"",n=t.placeholder!==""?` placeholder="${t.placeholder}"`:"";return`
<input type="${t.type}" class="${e}"${s}${i}${n}>
`.trim()}ToImgHTML(e,t){let s="";return this.using.img.imgSrc===""?s=`src="" data-filename="${this.using.img.imgFile}"`:s=`src="${this.using.img.imgSrc}"`,`
<img class="${e}" ${s} alt="${t}">
`.trim()}ToOverlayHTML(){return`<div class="overlay" title="${this.toolTip}"></div>`}}class ts{constructor(){this.name="",this.id="",this.className="",this.option=new Et}}class V{constructor(){this.props=new ts}ToHTML(e){let t="",s="";switch(e.option.using.itemType){case M.Btn:t=e.option.ToButtonHTML(e.className);break;case M.Label:t=e.option.ToLableHTML(e.className),s=e.option.ToOverlayHTML();break;case M.LabelRO:t=e.option.ToLableROHTML(e.className);break;case M.Plain:t=`
${e.option.using.innerHTML}
`.trim();break;case M.Combo:t=e.option.ToComboHTML(e.className);break;case M.Input:t=e.option.ToInputHTML(e.className);break;case M.Img:t=e.option.ToImgHTML(e.className,e.option.using.img.alt),s=e.option.ToOverlayHTML();break}return`
  ${t}
  ${s}
`.trim()}MakeSelectableHTML(){return`
<div class="${this.props.name}" id="${this.props.name}" item-id="${this.props.id}">
${this.ToHTML(this.props)}
</div>
`.trim()}static makeComboItemsHTML(e){if(e.selectionPair===void 0||e.selectionPair.length<=0)return"";let t="";for(const s of e.selectionPair){let[i,n]=s.split("/");n=n.trim();const o=e.selectedItem===n?" selected":"",l=`
<option value="${n}"${o}>${i}</option>
`.trim();t+=l}return t}}class R{constructor(){this._defaultButtonsName="dialog-buttons",this._defaultToolButtonsName="dialog-tool-btns",this._enableScrollEvt=!1,this._scrollTimer=null,this._isScrolling=!1,this.onButtonClicked=e=>{const t=e.target;if(t===null)return;const s=t.tagName==="BUTTON"?t:t.parentElement;if(s===null)return;let i=this.supplessSelected(s.className);if(i!==""){i=`.${i}`;const o=document.querySelectorAll(`${i}.selected`);o!==null&&o.forEach(l=>l.classList.remove("selected")),s.classList.add("selected")}const n=s.getAttribute("item-id");if(n){const o=this.itemList.find(l=>`${l.props.id}`===n);if(o){if(o.props.option.onSelect){let l="";t.tagName==="BUTTON"&&(l=t.getAttribute("item-id"),l===null&&(l=""));const a=new be;a.parentElem=t.parentElement,a.item=o,a.targetId=l,o.props.option.onSelect(a)}this.selectedCh=o}else{let l=this.getTopElement(t);if(l?.tagName==="TABLE"){const a=l.className,r=this.itemList.find(c=>c.props.className===a);if(r){if(r.props.option.onSelect){let c="";t.tagName==="BUTTON"&&(c=t.getAttribute("item-id"),c===null&&(c=""));const h=new be;h.parentElem=t.parentElement,h.item=r,h.targetId=c,h.classify=this.supplessSelected(t.className),r.props.option.onSelect(h)}this.selectedCh=r}}}}},this.onInputKeydown=e=>{const t=e.target;if(t===null||t.tagName!=="INPUT")return;const s=t,i=e;let n=he.None;switch(i.key){case De.Enter:n=he.Normal;const l=i.repeat,a=i.timeStamp;let r=s.dataset.pressInfo;if(r===void 0)r=`1;${a}`,n=he.Normal;else if(!l){const c=r.split(";");if(c.length===2){let h=parseInt(c[0]),d=parseFloat(c[1]);a-d>=4*1e3?h=1:(h++,h>=3&&(h=0,n=he.Special)),r=`${h};${a}`}}s.dataset.pressInfo=r,i.preventDefault();break;case De.Escape:s.value="元の値",s.blur();break;case De.Tab:break;case De.Process:return}const o=t.getAttribute("item-id");if(o){let l=this.getTopElement(t);if(l?.tagName==="TABLE"){const a=l.className,r=this.itemList.find(c=>c.props.className===a);if(r){const c=new be;c.parentElem=t.parentElement,c.item=r,c.targetId=o,c.classify=this.supplessSelected(t.className),c.Keydown=i.key,c.KeyEnter=n,r.props.option.onSelect(c)}}}},this.onSelectChange=e=>{const t=e.target;if(t===null||t.tagName!=="SELECT")return;const s=t?.dataset.classify;let i=t.getAttribute("item-id");if(i===null){const n=this.getTopElement(t);n!==null&&(i=n.getAttribute("item-id"))}if(i){let n=this.itemList.find(o=>`${o.props.id}`===i);if(n===void 0&&(n=this.itemList.find(o=>`${s}${o.props.id}`===i)),n){if(n.props.option.onSelect){const o=new be;o.parentElem=t.parentElement,o.item=n,o.targetId=i,o.classify=s===void 0?"?":s,o.selectedValue=t.value,n.props.option.onSelect(o)}this.selectedCh=n}}},this.itemList=new Array}add(e){this.itemList.push(e)}get DefaultBlueColor(){return"#86aef7e6"}get DefaultYellowColor(){return"#f7eb86e6"}get DefaultBorderColor(){return"#2c3e50ff"}MakeDefaultDialogParentCss(e,t,s,i=0){return`
.${e} {
  position: fixed;
  inset: auto; /* ブラウザの中央寄せを無効化 */
  top: ${s}px;
  left: ${t}px;
  transform: translateX(-50%);
  z-index: ${i};
}
`.trim()}MakeSystematicDialogCss(e){return`
.${e} {
  background-color: #86aef7;
  border: 2px solid #2c3e50;
  padding: 10px;
  ${se.borderShadowText}
}
`.trim()}MakeDefaultDialogCss(e){return`
.${e} {
  background-color: #f7eb86e6;
  border: 2px solid #2c3e50;
  padding: 10px;
  ${se.borderShadowText}
}
`.trim()}ToHTML(){let e="";for(const t of this.itemList){if(t.props.option.using.itemType===M.Table){e+=t.props.option.using.innerHTML;continue}e+=t.MakeSelectableHTML()}return`${e}`}MakeTableScrollCss(e,t,s=!1){return`
.${e} {
height: ${t}px;              /* ダイアログに合わせた固定高 */
overflow-y: auto;
overflow-x: ${s?"auto":"hidden"};
-webkit-overflow-scrolling: touch;  /* iPad用の滑らか設定 */
border: 1px solid #7b1fa2;        /* 紫色の枠線 */
background: rgba(192, 192, 192, 0.6);
${se.scrollBarText}
}
`.trim()}MakeScrollableList(e){let t="";for(const s of this.itemList)t+=s.MakeSelectableHTML();return`<div id="${e}" class="${e} scroll">
${t}
</div>`}MakeDefaultScrollCss(e,t){return`
.${e} .scroll {
max-height: ${t}px;
overflow-y: auto;
${se.scrollBarText}
}
`.trim()}MakeDefaultNonScrollCss(e,t){return""}MakeDefaultGridColCss(e,t,s,i){return`
.${e} {
display: grid;
grid-template-columns: repeat(${s}, ${t}px);
gap: 0px;
width: ${i}px;
}
`.trim()}MakeDefaultGridRowCss(e,t,s,i){return`
.${e} {
display: grid;
grid: repeat(${s}, ${i}px) / auto-flow ${t}px;
gap: 0px;
height: ${(i+2)*s}px;
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
`.trim()}MakeDefaultItemimgCss(e,t,s,i){return`
.${e} {
position: relative;
width: ${s}px;
height: ${i}px;
cursor: pointer;
}
.${e} .${t} {
width: 100%;
height: 100%;
}
`.trim()}MakeDefaultItemLabelCss(e,t,s,i){return`
.${e} {
position: relative;
width: ${s}px;
height: ${i}px;
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
    background: #fbc02d;
    color: black;
    border: 1px solid #4d4949;
    border-radius: 3px;
    height: 30px;
    cursor: pointer;
    transition: background 0.2s;
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
`.trim(),document.head.appendChild(s),!0}hideFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.add("hidden")}showFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.remove("hidden")}getFullScreenMsgElem(e){const t=document.getElementById(e);if(t){const s=t.querySelectorAll("p");return s!==null&&s.length>=1?s[0]:null}return null}initObserver(e,t){const s=document.getElementById(e);if(!s)return;const i=async l=>{await l.forEach(async a=>{if(a.isIntersecting){const r=a.target,c=this.isDemo&&!t.isMaterial(r.dataset.filename)?"demo.png":r.dataset.filename;if(console.log(`[${this.isDemo}] 見えた！:${r.dataset.filename}`),c&&r.src===""||r.src.startsWith(window.location.origin)){const h=await t.findNs(c);h===null||h===""?(this.observer.unobserve(r),console.log(`cannot set image : ${c}`)):await t.getImageUrlBy(c,h).then(d=>{d!==null?(r.src=d,this.observer.unobserve(r)):console.log(`pending set image : ${c}`)})}}})},n={root:s,rootMargin:"0px",threshold:.1};this.observer=new IntersectionObserver(i,n),s.querySelectorAll("img[data-filename]").forEach(l=>this.observer.observe(l)),console.log("[initObserver] enabled!")}get isDemo(){return window.EVONA_CONFIG.demo}get isScrolling(){return this._enableScrollEvt?!(this._scrollTimer!==null&&this._isScrolling):!1}enableScrollEvent(e){this._isScrolling=!1;const t=document.getElementById(e);return t?(this._enableScrollEvt=!0,t.addEventListener("scroll",()=>{this._isScrolling=!0,clearTimeout(this._scrollTimer),this._scrollTimer=setTimeout(()=>{this._scrollTimer=null,this._isScrolling=!1;const s=this.observer.takeRecords();console.log(`[enableScrollEvent] stopped ${s.length}`)},200)}),console.log("[enableScrollEvent] enabled!"),!0):!1}enableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(i=>{const n=i.querySelectorAll("img");n.length>=1&&(n[0],this.addButtonEvent(t,i));const o=i.querySelectorAll("span");o.length>=1&&o[0]?.dataset.readonly=="false"&&this.addButtonEvent(t,i);const l=i.querySelectorAll("select");l.length>=1&&(l[0],this.addSelectEvent(t,i));const a=i.querySelectorAll("button");if(a.length>=1)for(const r of a)console.log(`${i.tagName}::${t}::button::${r.innerHTML}`),i.addEventListener("click",this.onButtonClicked)})}enableTableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(i=>{const n=i.querySelectorAll("table");n.length>=1&&(n[0],i.addEventListener("click",this.onButtonClicked),i.addEventListener("keydown",this.onInputKeydown),i.addEventListener("change",this.onSelectChange))})}disableTableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(i=>{const n=i.querySelectorAll("table");n.length>=1&&(n[0],i.removeEventListener("click",this.onButtonClicked),i.removeEventListener("keydown",this.onInputKeydown),i.removeEventListener("change",this.onSelectChange))})}addButtonEvent(e,t){t.getAttribute("item-id")&&t.addEventListener("click",this.onButtonClicked)}addInputEvent(e,t){t.getAttribute("item-id")&&t.addEventListener("keydown",this.onInputKeydown)}addSelectEvent(e,t){t.addEventListener("change",s=>{const i=s.target,n=i?.dataset.classify,o=t.getAttribute("item-id");if(o){let l=this.itemList.find(a=>`${a.props.id}`===o);if(l===void 0&&(l=this.itemList.find(a=>`${n}${a.props.id}`===o)),l){if(l.props.option.onSelect){const a=new be;a.item=l,a.targetId=o,a.classify=n===void 0?"?":n,a.selectedValue=i.value,l.props.option.onSelect(a)}this.selectedCh=l}}})}supplessSelected(e){let t=e,s=e.indexOf(" selected");return s>=0&&(t=e.substring(0,s)),t}getTopElement(e){let t=e.parentElement;for(;t!==null;){if(t.tagName==="DIV"){t=t.parentElement;continue}if(t.tagName==="TD"){t=t.parentElement;continue}if(t.tagName==="TR"){t=t.parentElement;continue}if(t.tagName==="TBODY"){t=t.parentElement;continue}break}return t}GetRect(e){const t=e.getBoundingClientRect(),s=new Ze;return s.left=`${t.left}`,s.top=`${t.top}`,s.width=`${t.width}`,s.height=`${t.height}`,s}EnableElem(e,t){e.ariaDisabled=t?"false":"true"}IsEnabledElem(e){return e.ariaDisabled===null?!0:e.ariaDisabled==="false"}EnableId(e,t){const s=document.getElementById(e);return s===null?null:(this.EnableElem(s,t),t)}IsEnabledId(e){const t=document.getElementById(e);return t===null?null:this.IsEnabledElem(t)}GetIdByIndex(e){return this.itemList[e].props.id}UnselectAll(e){const t=`.${e}`;document.querySelectorAll(`${t}.selected`).forEach(s=>s.classList.remove("selected"))}SelectByID(e,t){const s=this.FindByID(e,t);if(s){s.classList.add("selected");const i=s.getAttribute("item-id");if(i){const n=this.itemList.find(o=>`${o.props.id}`===i);n&&(this.selectedCh=n)}return s}return null}FindDivByClassName(e,t){const s=`.${e}`,i=document.querySelectorAll(`${s}`);for(const n of i){const o=n.querySelectorAll("div");for(const l of o)if(l.className===t||l.className.startsWith(t))return l}return null}FindByID(e,t){const s=`.${e}`,i=document.querySelectorAll(`${s}`);for(const n of i){const o=n.getAttribute("item-id");if(o&&o===t)return n}return null}FindImgByID(e,t){const s=`.${e}`,i=document.querySelectorAll(`${s}`);for(const n of i){const o=n.getAttribute("item-id");if(o&&o===t){const l=n.querySelectorAll("img");return l.length>=1?l[0]:null}}return null}FindImgsByID(e,t){const s=`.${e}`,i=document.querySelectorAll(`${s}`);for(const n of i){const o=n.getAttribute("item-id");if(o&&o===t){const l=n.querySelectorAll("img");return l.length>=1?l:null}}return null}FindDivByID(e,t){const s=`.${e}`,i=document.querySelectorAll(`${s}`);for(const n of i){const o=n.getAttribute("item-id");if(o&&o===t){const l=n.querySelectorAll("div");return l.length>=1?l[0]:null}}return null}FindSelectByID(e,t,s){const i=`.${e}`,n=document.querySelectorAll(`${i}`);for(const o of n){const l=o.getAttribute("item-id");if(l&&l===t){const a=o.querySelectorAll("select");if(a.length>=1){for(const r of a)if(r?.dataset.classify===s)return r}return null}}return null}ReplaceImg(e,t,s){const i=this.FindImgByID(e,t);return i===null?null:(i.dataset.filename,i.src=s,i)}ReplaceDivToolTip(e,t,s){const i=this.FindDivByID(e,t);return i===null?null:(i.title=s,i)}ReplaceImgToolTip(e,t,s){const i=this.FindImgByID(e,t);return i===null?null:(i.title=s,i)}SwapImgSrcToolTip(e,t){if(e===null||t===null)return!1;const s=e.src,i=t.src,n=e.title,o=t.title;return e.src=i,t.src=s,e.title=o,t.title=n,!0}SetImgSrc(e,t){if(e===null)return null;e.dataset.filename,e.src=t}SetImgSize(e,t,s){if(e===null)return null;e.style.width=`${t}px`,e.style.height=`${s}px`}ReplaceComboItems(e,t,s){const i=this.FindSelectByID(e,t,s.classify);if(i===null)return null;i.querySelectorAll("option").length>=1&&(i.innerHTML="");const o=V.makeComboItemsHTML(s);return o!==""&&(i.innerHTML=o),i}setVisible(e,t){const s=document.getElementById(e);return s===null?null:(s.hidden=!t,!0)}copyCssToInlineStyle(e,t){for(const s of document.styleSheets){let i;try{i=s.cssRules}catch{continue}for(const n of i)if(n instanceof CSSStyleRule&&n.selectorText===e){const o=n.style;console.log(`[copyCssToInlineStyle] coping [${e}]`);for(let l=0;l<o.length;l++){const a=o[l],r=o.getPropertyValue(a);t.style.setProperty(a,r)}return}}}}const me={Hide:"Hide",CopyPaste:"CopyPaste"},Ne={Hide:"Hide",MoveLowest:"MoveLowest"},ue={Hide:"Hide",DialogHide:"DialogHide"},oe={Copy:"Copy",Paste:"Paste",Cancel:"Cancel"};class j{constructor(){this.title="",this.dlgName="",this.B2Type=me.Hide,this.B3Type=Ne.MoveLowest,this.B4Type=ue.Hide,this.initLeft=0,this.initTop=0,this.cornerIndex=-1,this.mover=new ss,this.moverOnMoveDone=async()=>{this.onMoveDone!==void 0&&(await this.onMoveDone(this.dlg),this.cornerIndex=0)},this.resizer=new is,this.resizerOnResizeDone=async(e,t)=>{this.onResizeDone!==void 0&&await this.onResizeDone(this.dlg,e,t)},this.isIPad=/iPad|Macintosh/.test(navigator.userAgent)&&"ontouchend"in document,this.isTouchDevice=()=>"ontouchstart"in window||navigator.maxTouchPoints>0}SetB2Type(e=me.CopyPaste,t){this.B2Type=e,this.onCopyPaste=t}SetB3Type(e=Ne.MoveLowest){this.B3Type=e}SetB4Type(e=ue.Hide){this.B4Type=e}NewDialog(e,t){this.dlgName=t;const s=document.createElement("dialog");s.id=t,s.className=t;const i=document.getElementById(e);return i.appendChild(s),this.dlgParent=i,this.dlg=s,s}SetContent(e,t,s=!0){const i=this.dlg,n=`<button class="${this.toolNameB0}" id="${this.toolNameB0}" title="DragMove">[＊]</button>`,o=`<button class="${this.toolNameB1}" id="${this.toolNameB1}" title="SideBy">[≫]</button>`;let l="";this.B2Type===me.CopyPaste&&(l=`<button class="${this.toolNameB2}" id="${this.toolNameB2}" title="Copy&Paste">[⇔]</button>`);let a="";this.B3Type===Ne.MoveLowest&&(a=`<button class="${this.toolNameB3}" id="${this.toolNameB3}" title="MoveLowest">[_]</button>`);let r="";this.B4Type===ue.DialogHide&&(r=`<button class="${this.toolNameB4}" id="${this.toolNameB4}" title="Close">[×]</button>`);const c=`${n}${o}${l}${a}${r}`;let h="";this.title!==""?h=`<div class="${this.titleName}">${this.title}${c}</div>`:h=`<div class="${this.titleName}">${c}</div>`;const d=document.createElement("div");d.innerHTML=h,i.innerHTML=t;const u=document.getElementById(e);u.hidden=s,u.appendChild(d),u.appendChild(i),this.applyCss()}EnableEventHandlers(){const e=this.dlgParent.style.left,t=this.dlgParent.style.top;this.initLeft=parseInt(e.substring(0,e.length-2)),this.initTop=parseInt(t.substring(0,t.length-2)),console.log(`[EnableEventHandlers] ${this.dlgParent.id}::(${e},${t})::(${this.initLeft},${this.initTop})`);const s=document.getElementById(`${this.toolNameB0}`);s!==null&&(this.mover.onMoveDone=this.moverOnMoveDone,this.mover.attach(s,this.dlgParent));const i=document.getElementById(`${this.toolNameB1}`);i!==null&&(i.onclick=async()=>{if(this.dlgParent===void 0)return;const n=window.innerWidth,o=window.innerHeight,l=this.dlgParent.offsetWidth/2,a=Math.max(this.dlgParent.offsetWidth,this.dlg.offsetWidth),r=this.dlgParent.offsetHeight+this.dlg.offsetHeight;switch(this.cornerIndex=(this.cornerIndex+1)%4,this.cornerIndex){case 0:this.dlgParent.style.left=`${l}px`,this.dlgParent.style.top="0px";break;case 1:this.dlgParent.style.left=`${n-a+l}px`,this.dlgParent.style.top="0px";break;case 2:this.dlgParent.style.left=`${n-a+l}px`,this.dlgParent.style.top=`${o-r}px`;break;case 3:this.dlgParent.style.left=`${l}px`,this.dlgParent.style.top=`${o-r}px`;break}}),this.B2Type===me.CopyPaste&&(document.getElementById(`${this.toolNameB2}`).onclick=async()=>{if(this.dlgParent===void 0||this.onCopyPaste===void 0)return;const n=this.dlgParent,o=n.querySelectorAll(`.${this.toolNameB2}`),l=o.length>=1?o[0]:null,a=new R;if(a.IsEnabledElem(l)===!1)return;const r=new Array,c=new Ke;c.key=oe.Copy,c.text="クリップボードへコピー",r.push(c);const h=new Ke;h.key=oe.Paste,h.text="クリップボードからペースト",r.push(h);const d=new Ke;d.key=oe.Cancel,d.text="キャンセル",r.push(d);const u=new Qt;u.setChoiceItems(r),a.EnableElem(l,!1);const p=a.GetRect(n);a.GetRect(this.dlg);const I=a.GetRect(l),T=this.dlg.className;u.setListener(`${T}-choice`,T,`${T}-B2`),u.applyCss(),u.show(`${parseInt(I.left)-parseInt(p.left)}`,"0"),u.enableEvents(async x=>{console.log(`[onSelect] ${x.callerName} ${x.result}`),u.dispose(),this.onCopyPaste(this.dlg,x.result),a.EnableElem(l,!0)})}),this.B3Type===Ne.MoveLowest&&(document.getElementById(`${this.toolNameB3}`).onclick=async()=>{if(this.dlgParent===void 0)return;new b().MoveLowestLayer(this.dlgParent)}),this.B4Type===ue.DialogHide&&(document.getElementById(`${this.toolNameB4}`).onclick=async()=>{if(this.dlgParent===void 0)return;new R().setVisible(this.dlgParent.className,!1)})}EnableResize(){if(this.isIPad&&this.isTouchDevice()){console.log("EVONA: Touch device detected. Priority given to flick scrolling.");return}const e=`<button class="${this.handleNameB0}" id="${this.handleNameB0}" title="Resize">[」]</button>`,t=document.createElement("div");t.className=this.handleName,t.id=this.handleName,t.innerHTML=`${e}`,this.dlg.appendChild(t);const s=document.getElementById(`${this.handleName}`);s!==null&&(s.style.position="absolute",s.style.left=`${this.dlg.clientWidth-s.clientWidth}px`,s.style.top=`${this.dlg.clientHeight-s.clientHeight}px`,this.resizer.onResizeDone=this.resizerOnResizeDone,this.resizer.attach(s,this.dlg))}static GetDialogInfo(e){const t=this.FindDialogParent(e);if(t===null)return null;const s=t.querySelector("dialog");if(s===null)return null;const i=new ge,n=s.clientWidth,o=s.clientHeight;return i.name=e,i.left=t.style.left,i.top=t.style.top,i.width=`${n}px`,i.height=`${o}px`,i}static SetDialogInfo(e){const t=this.FindDialogParent(e.name);if(t===null)return!1;const s=t.querySelector("dialog");return s===null?!1:(t.style.left=e.left,t.style.top=e.top,s.style.width=e.width,s.style.height=e.height,!0)}static FindDialogParent(e){const t=document.getElementById(e);return t??null}get titleName(){return`${this.dlgName}-dlg-title-00`}get toolNameB0(){return`${this.dlgName}-dlg-tool-b0`}get toolNameB1(){return`${this.dlgName}-dlg-tool-b1`}get toolNameB2(){return`${this.dlgName}-dlg-tool-b2`}get toolNameB3(){return`${this.dlgName}-dlg-tool-b3`}get toolNameB4(){return`${this.dlgName}-dlg-tool-b4`}get handleName(){return`${this.dlgName}-dlg-handle-00`}get handleNameB0(){return`${this.dlgName}-dlg-handle-b0`}applyCss_old(){const e=document.createElement("style");e.textContent=`
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
    background: linear-gradient(to bottom, #fff176, #fbc02d); /* Win風グラデ */
    color: #000000;
    padding: 4px 8px;
    border: 1px solid #000;
    border-bottom: none;
    border-radius: 6px 6px 0 0; /* 上だけ角丸 */
    font-family: 'Segoe UI', sans-serif;
    font-size: 14px;
    user-select: none; /* テキスト選択防止 */

    user-select: none;           /* テキスト選択を禁止 */
    -webkit-user-select: none;   /* iOS Safari用 */
    touch-action: none;          /* ブラウザ独自のスクロールやズームを無効化 */
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
`.trim(),document.head.appendChild(t)}}class ge{constructor(){this.name="",this.left="",this.top="",this.width="",this.height=""}copyTo(e){e.name=this.name,e.left=this.left,e.top=this.top,e.width=this.width,e.height=this.height}}class b{add(e){b.dlgElems.push(e)}AddDialogs(){b.dlgElems=new Array;const e=document.querySelectorAll("div");for(const t of e)t.style.zIndex!==""&&(parseInt(t.style.zIndex)>=b.ignoreIndex||t.querySelector("dialog")&&(console.log(`${t.id} added!`),this.add(t)))}AssignIndexies(){let e=b.dlgElems.length-1;for(const t of b.dlgElems)t.style.zIndex=`${e}`,e--}MoveLowestLayer(e){b.dlgElems.length;for(const t of b.dlgElems)if(t.id===e.id)t.style.zIndex="0";else{const s=t.style.zIndex;t.style.zIndex=`${parseInt(s)+1}`}}MoveHiestLayer(e){b.dlgElems.length;let t=-1;for(const s of b.dlgElems){const i=parseInt(s.style.zIndex);i>=b.ignoreIndex||i>t&&(t=i)}for(const s of b.dlgElems)if(s.id===e.id){s.style.zIndex=`${t}`;break}for(const s of b.dlgElems)if(s.id!==e.id){if(parseInt(s.style.zIndex)>=b.ignoreIndex)continue;t--,s.style.zIndex=`${t}`}}FindByName(e){const t=b.dlgElems.find(s=>s.id===e);return t||null}async ForEachAsync(e){for(const t of b.dlgElems)t.parentNode!==null&&await e(t.id)}ReOrder(){b.dlgElems.sort((e,t)=>{const s=e.style.zIndex,i=t.style.zIndex;if(s===""||i==="")throw new Error("z-index が未設定の要素が混入しています");return parseInt(t.style.zIndex)-parseInt(e.style.zIndex)})}async SaveSetting(e,t=!0){if(this.canSave&&e!==null&&e.parentElement!==null){if(t&&this.FindByName(e.parentElement.className)===null){console.log(`${e.className} is out of managed dlg`);return}await this.initSetting(),await b.setingAccess.saveDialogPos(e)}}async LoadAllSetting(){if(this.canSave){await this.initSetting();for(const e of b.dlgElems){const t=e.querySelector("dialog");t!==null&&await b.setingAccess.loadDialogPos(t)}}}async loadSetting(e){this.canSave&&(await this.initSetting(),e!==null&&await b.setingAccess.loadDialogPos(e))}async initSetting(){b.setingAccess===null&&(b.setingAccess=new St,await b.setingAccess.init())}get canSave(){return!new R().isDemo}}b.ignoreIndex=1e3;b.setingAccess=null;class ss{constructor(){this.isDragging=!1,this.startX=0,this.startY=0}attach(e,t){e.onpointerdown=s=>{e.setPointerCapture(s.pointerId),this.isDragging=!0,this.startX=s.clientX-t.offsetLeft,this.startY=s.clientY-t.offsetTop,e.style.cursor="grabbing"},e.onpointermove=s=>{if(!this.isDragging)return;const i=s.clientX-this.startX,n=s.clientY-this.startY;t.style.left=`${i}px`,t.style.top=`${n}px`,t.style.margin="0"},e.onpointerup=async s=>{this.isDragging=!1,e.releasePointerCapture(s.pointerId),e.style.cursor="grab",this.onMoveDone!==void 0&&await this.onMoveDone()}}}class is{constructor(){this.isDragging=!1,this.startX=0,this.startY=0,this.startW=0,this.startH=0,this.handleX=0,this.handleY=0}attach(e,t){e.onpointerdown=s=>{e.setPointerCapture(s.pointerId),this.isDragging=!0,this.startX=s.clientX,this.startY=s.clientY;const i=t.getBoundingClientRect();console.log(`[${t.className}] (${i.left},${i.top}) - (${i.width},${i.height})`),this.startW=i.width,this.startH=i.height,this.handleX=e.offsetLeft,this.handleY=e.offsetTop,e.style.cursor="grabbing"},e.onpointermove=s=>{if(!this.isDragging)return;const i=s.clientX-this.startX,n=s.clientY-this.startY;t.style.width=`${this.startW+i-e.clientWidth}px`,t.style.height=`${this.startH+n-e.clientHeight}px`,e.style.left=`${this.handleX+i}px`,e.style.top=`${this.handleY+n}px`,e.style.margin="0"},e.onpointerup=async s=>{if(this.isDragging=!1,e.releasePointerCapture(s.pointerId),e.style.cursor="grab",this.onResizeDone!==void 0){const i=t.getBoundingClientRect();await this.onResizeDone(`${i.width-this.startW}`,`${i.height-this.startH}`)}}}}class ae{get iconFileName(){return this.id===null&&!Number.isNaN(this.id)?`${this.name}_${this.idAsText}.png`:`${this.name}_${this.id}.png`}constructor(e=0,t=""){this.ns=H.None,this.id=0,this.name="",this.contentURL="",this.iconURL="",this.idAsText="",this.idAttributeForHTML="",this.id=e,this.name=t}parseFromImgName(e){let t=e.indexOf("_");if(t>=0){const s=e.substring(0,t);let i=e.substring(t+1);if(t=i.indexOf("."),t>=0)return i=i.substring(0,t),this.id=Number.parseInt(i),this.name=s,this.idAsText=Number.isNaN(this.id)?i:"",!0}return!1}}class ns{constructor(){this.itemName="",this.chNames=new Array,this.index=-1}reset(){this.itemName="",this.chNames=new Array,this.index=-1,this.onScroll=null}toCombo(e,t,s){this.reset();const i=`.${e}`,n=document.querySelectorAll(`${i} div[title*="${s}"]`);let o=-1,l="";for(const r of n){const c=r;console.log(c.title),o++;const h=c.title.trim(),d=h,p=`
 <option value="${h}"${o===0?" selected":""}>${d}</option>
`.trim();l+=p,this.chNames.push(d)}if(o===-1)return null;const a=document.createElement("select");return a.id=t,a.className=t,a.innerHTML=l,this.itemName=e,a}addEvent(e,t){e.addEventListener("change",s=>{const n=s.target.value;this.chNames.find(l=>l===n)&&this.scrollAction(n)}),this.onScroll=t}findFirst(){return this.chNames.length===0?!1:(this.index=0,this.scrollAction(this.chNames[this.index]),!0)}scroll(e){const t=`.${this.itemName}`,s=document.querySelector(`${t} div[title="${e}"]`);if(s===null)return null;const i=s.closest(t);return i===null?null:(i.scrollIntoView({behavior:"smooth",block:"center"}),s)}scrollAction(e){const t=this.scroll(e);t&&this.onScroll!==null&&this.onScroll(t)}}class Te{constructor(){this.uiInfo=new ge,this.charFinder=new ns,this.parentName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new b().SaveSetting(e)}}MakeList(){}async LoadList(e){const i=(await new $e().loadJson(e)).map(o=>Object.assign(new ae,o)),n=new Te;return n.chList=i,this.uiInfo.copyTo(n.uiInfo),n}findByNs(e){return e===H.None?void 0:this.chList.filter(s=>s.ns===e)}async toHTML(e){if(!this.chList)return"";this.htmlMaker=new R;let t=0;for(const s of this.chList){t++;const i=`chuid${t}`;s.idAttributeForHTML=i;const n="",o=new nt;o.imgSrc=n,o.imgFile=s.iconFileName;const l=new V;l.props.name=this.itemCssClassName(),l.props.id=i,l.props.className=this.imgCssClassName(),l.props.option.setImg(o),l.props.option.toolTip=s.name,l.props.option.onSelect=a=>{this.setSelectedItem(a.item.props.id)},this.htmlMaker.add(l)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createSelectorBox(e,t,s){this.parentName=t;const i=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="${this.charOpenUrlCssClassName()}">URL</button>
`),n=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${s}
    <label id="char-dlg-chinfo">未選択</label>
    <input type="text" id="${this.charSeachInputCssClassName()}" placeholder="キャラ名検索...">
    ${i}
</div>`,o=new j;o.title="<"+e+">",o.SetB4Type(ue.DialogHide);const l=o.NewDialog(t,this.dlgCssClassName());return o.SetContent(t,n),this.applyCss(),o.EnableEventHandlers(),o.onMoveDone=this.moverOnMoveDone,l}addEventHandlers(e){document.getElementById(this.charSeachInputCssClassName()).oninput=t=>{if(t!==null&&t.target!==null){const s=t.target;console.log(s.value);const i=s.value,n=this.charSeachComboCssClassName(),o=document.getElementById(n);o!==null&&o.parentNode?.removeChild(o);const l=this.charFinder.toCombo(this.itemCssClassName(),n,i);if(l!==null){const a=document.getElementById(this.dlgContentCssClassName());a!==null&&(a.appendChild(l),this.charFinder.addEvent(l,r=>{const h=r.parentElement.getAttribute("item-id");this.htmlMaker.SelectByID(this.itemCssClassName(),h)}),this.charFinder.findFirst())}}},document.getElementById(this.charOpenUrlCssClassName()).onclick=async()=>{if(this.selectedCh===void 0)return;const t=this.chList.find(s=>this.selectedCh.idAttributeForHTML===s.idAttributeForHTML);if(t){this.charOpenUrlCssClassName();const s=new de;if(s.setParent(this.dlgCssClassName()),s.setYesNo(),await s.showWait(`${t.name} をブラウザで開いてよろしいですか？`)===N.Yes){const n=t.contentURL;window.open(n,"_blank")}}}}addItemEventHandlers(){const e=this.htmlMaker.GetIdByIndex(0);this.htmlMaker.SelectByID(this.itemCssClassName(),e),this.htmlMaker.enableEvents(this.itemCssClassName()),this.setSelectedItem(e)}setSelectedItem(e){const t=this.chList.find(s=>e===s.idAttributeForHTML);t&&(document.getElementById("char-dlg-chinfo").textContent=t.name,this.selectedCh=t)}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}itemCssClassName(){return"char-item"}imgCssClassName(){return"base"}listCssClassName(){return"char-list"}dlgContentCssClassName(){return"char-dlg-content"}dlgCssClassName(){return"char-dlg"}charSeachInputCssClassName(){return"char-search-input"}charSeachComboCssClassName(){return"char-search-combo"}charOpenUrlCssClassName(){return"char-open-url"}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),i=parseInt(this.uiInfo.left),n=parseInt(this.uiInfo.top),o=document.createElement("style");o.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,i,n)}
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
`.trim(),document.head.appendChild(o);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}}class ie{constructor(){this.ns=H.None,this.id=0,this.name="",this.contentURL="",this.iconURL=""}static toJsonText(e){const t=ie.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new ie;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}static fromJsonInst(e){const t=new ae;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}}class ke{constructor(){this.title="",this.key="",this.selectionPair=[],this.selectedVal="",this.initScoreVal=0,this.mulScoreVal=0,this.available=!1}get stdScore(){const e=this.selectedVal.length>=1?this.selectedVal:"1",t=parseInt(e);return this.initScoreVal+t*this.mulScoreVal}get selectedText(){if(this.selectionPair.length!==0&&this.selectedVal!=="")for(const e of this.selectionPair){const t=e.split("/");if(t[1]===this.selectedVal)return t[0]}}}class F{constructor(){this.items=new Array,this.allow=new Map,this.roleText="",this.comboText=""}makeDemoLvText(e){let t="";for(let s=1;s<=100;s++)t+=`"${e}${s}/${s}",`;return t=t.substring(0,t.length-1),t}load(){const e=this.makeDemoLvText("Lv"),t=this.makeDemoLvText("Lv"),s=this.makeDemoLvText(""),i=`
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
`,o=JSON.parse(i).map(l=>Object.assign(new ke,l));this.items=o}save(){console.log(JSON.stringify(this,null,2))}clone(){const e=new F;for(const t of this.items){const s=JSON.stringify(t,null,2),i=JSON.parse(s);e.items.push(i)}return e}static copy(e,t,s=!1){for(let i=0;i<e.items.length;i++){const n=e.items[i],o=s?new ke:t.items[i];o.title=n.title,o.key=n.key,o.selectionPair=n.selectionPair,o.selectedVal=n.selectedVal,o.initScoreVal=n.initScoreVal,o.mulScoreVal=n.mulScoreVal,o.available=n.available,s&&t.items.push(o)}}set(e,t){const s=this.items.find(i=>i.key===e);return s?(s.selectedVal=t,!0):!1}get stdScore(){let e=0;for(const t of this.items)t.available&&(e+=t.stdScore);return e}get allAvailable(){for(const e of this.items)if(e.available===!1)return!1;return!0}static calcScore(e,t){const s=t.split("+");let i=0;for(const n of s){const o=n.trim();if(o.endsWith("()")){const l=o.slice(0,-2);typeof e[l]=="function"?i+=e[l]():console.warn(`関数 '${l}' が存在しません`)}else{const l=e[o];typeof l=="number"?i+=l:Array.isArray(l)?i+=l.reduce((a,r)=>a+r,0):console.warn(`プロパティ '${o}' が数値ではありません`)}}return i}static calcScoreAdvanced(e,t){const s=Object.keys(e),i=s.map(o=>e[o]);return new Function(...s,`return ${t};`)(...i)}toInst(e){return(i=>{const n=class{constructor(){i.forEach((o,l)=>{this[l]=o})}};return new n})(e)}}class os{constructor(){this.intervalMs=1e3,this.isOneShot=!0,this.intervalTimer=null}start(e,t){this.intervalTimer!==null&&this.clear(),this.intervalTimer=setTimeout(async()=>{t!==void 0&&(await t(e)||this.clear()),this.isOneShot===!0&&this.clear()},this.intervalMs)}clear(){clearTimeout(this.intervalTimer),this.intervalTimer=null}}const re={Resource:"Resource",ScoreUI:"ScoreUI"},fe={Sequence:"Sequence",Text:"Text"};class xt{constructor(){this.key="",this.text=""}}class Mt extends xt{constructor(){super(...arguments),this.comment=""}}class vt extends xt{constructor(){super(...arguments),this.selectType=fe.Sequence,this.start="",this.end="",this.step="",this.keyValue=""}}class Oe{constructor(){this.resItem=new Mt,this.scItem=new vt}get isScoreAvail(){if(this.scItem.key.trim().length===0||this.scItem.text.trim().length===0)return!1;if(this.scItem.selectType===fe.Sequence){if(this.scItem.start.trim().length===0||this.scItem.end.trim().length===0||this.scItem.step.trim().length===0)return!1}else if(this.scItem.keyValue.trim().length===0)return!1;return!0}}class Lt{constructor(){this.gameType=z.none,this.itemList=new Array,this.resLogToItem=e=>{const t=e;for(const s of t.inst){const i=new Oe;i.owner=this,i.resItem=s,this.itemList.push(i)}},this.scLogToItem=e=>{const t=e;if(t.gameType===this.gameType)for(const s of t.inst){const i=new Oe;i.owner=this,i.scItem=s,this.itemList.push(i)}},this.editorConfigs=[{editorType:re.Resource,logType:pe.ResourceEditAction,fromJsonText:et.fromJsonText,logToItem:this.resLogToItem},{editorType:re.ScoreUI,logType:pe.ScoreEditAction,fromJsonText:tt.fromJsonText,logToItem:this.scLogToItem}],this.actEditor=this.editorConfigs[0]}init(){for(let e=0;e<10;e++){const t=new Oe;t.owner=this,this.itemList.push(t)}}async load(e,t){const s=this.getEditor(e);if(s===void 0)return;this.actEditor=s!==void 0?s:this.editorConfigs[0],this.gameType=t;const i=s.logType,o=await(await le()).get(i);if(o===null)return;const l=i,a=new Map,r=new Array;this.usingLog(l,o,a,r),this.itemList=new Array;for(const[c,h]of a){const d=s.fromJsonText(h.log);s.logToItem(d)}this.itemList.length===0&&this.init()}async loadUnused(e){const s=await(await le()).get(e);if(s===null)return null;const i=new Map,n=new Array;return this.usingLog(e,s,i,n),n}usingLog(e,t,s,i){for(const n of t){let l=this.actEditor.fromJsonText(n.log).logType,a=!1,r=!1;switch(l){case ne.None:break;case ne.Add:a=!0;break;case ne.Update:a=!0;break;case ne.Delete:a=!0,r=!0;break}if(a)if(r){if(s.has(e)){const c=s.get(e);i.push(c),s.delete(e)}}else{if(s.has(e)){const c=s.get(e);i.push(c),s.delete(e)}s.set(e,n)}}}getEditor(e){return this.editorConfigs.find(s=>s.editorType===e)}get editorType(){return this.actEditor.editorType}}class Nt extends Lt{constructor(){super(...arguments),this.uiInfo=new ge,this.parentName="",this.saveTimer=null,this.onSave=async e=>(console.log(`${e.parentName}`),!1),this.setColKey=(e,t,s,i)=>{const n=new ee;n.value=t.owner.editorType==re.Resource?t.resItem.key:t.scItem.key,n.placeholder="キー",i.getCell(e,s).typeInfo.setInput(n),i.getCell(e,s).className=this.itemKeyCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.setColValue=(e,t,s,i)=>{const n=new ee;n.value=t.owner.editorType==re.Resource?t.resItem.text:t.scItem.text,n.placeholder="文字列",i.getCell(e,s).typeInfo.setInput(n),i.getCell(e,s).className=this.itemDispCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.setColComment=(e,t,s,i)=>{const n=new ee;n.value=t.resItem.comment,n.placeholder="コメント",i.getCell(e,s).typeInfo.setInput(n),i.getCell(e,s).className=this.itemCommentCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.setColSelectType=(e,t,s,i)=>{const n=new ot;n.selectionPair=[`連続/${fe.Sequence}`,`文字列/${fe.Text}`],n.selectedItem=t.scItem.selectType,n.classify="selectType",i.getCell(e,s).typeInfo.setCombo(n),i.getCell(e,s).className=this.itemSelectTypeCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.setColSelectStart=(e,t,s,i)=>{const n=new ee;n.value=t.scItem.start,n.placeholder="開始",i.getCell(e,s).typeInfo.setInput(n),i.getCell(e,s).className=this.itemSeqTypeStartCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.setColSelectEnd=(e,t,s,i)=>{const n=new ee;n.value=t.scItem.end,n.placeholder="終了",i.getCell(e,s).typeInfo.setInput(n),i.getCell(e,s).className=this.itemSeqTypeEndCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.setColSelectStep=(e,t,s,i)=>{const n=new ee;n.value=t.scItem.step,n.placeholder="ステップ",i.getCell(e,s).typeInfo.setInput(n),i.getCell(e,s).className=this.itemSeqTypeStepCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.setColText=(e,t,s,i)=>{const n=new ee;n.value=t.scItem.keyValue,n.placeholder="key/valueを&quot;,&quot;で区切った文字列",i.getCell(e,s).typeInfo.setInput(n),i.getCell(e,s).className=this.itemTextTypeCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.setColDelBtn=(e,t,s,i)=>{i.getCell(e,s).typeInfo.setButton("削除"),i.getCell(e,s).className=this.itemDeleteCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.makeResLog=async e=>{const t=new et;t.logType=ne.Add;for(const n of e){const o=new Mt;for(const l of n.cells)for(const a of l.children){if(a.className===this.itemDeleteCssClassName())continue;const r=this.table.getElemValue(a)||"";switch(a.className){case this.itemKeyCssClassName():o.key=r;break;case this.itemDispCssClassName():o.text=r;break;case this.itemCommentCssClassName():o.comment=r;break}}t.inst.push(o)}const s=et.toJsonText(t);await(await le()).put(pe.ResourceEditAction,s)},this.makeScoreLog=async e=>{const t=new tt;t.logType=ne.Add,t.gameType=this.gameType;for(const n of e){const o=new vt;for(const l of n.cells)for(const a of l.children){if(a.className===this.itemDeleteCssClassName())continue;const r=this.table.getElemValue(a)||"";switch(a.className){case this.itemKeyCssClassName():o.key=r;break;case this.itemDispCssClassName():o.text=r;break;case this.itemSelectTypeCssClassName():o.selectType=r;break;case this.itemSeqTypeStartCssClassName():o.start=r;break;case this.itemSeqTypeEndCssClassName():o.end=r;break;case this.itemSeqTypeStepCssClassName():o.step=r;break;case this.itemTextTypeCssClassName():o.keyValue=r;break}}t.inst.push(o)}const s=tt.toJsonText(t);await(await le()).put(pe.ScoreEditAction,s)},this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new b().SaveSetting(e)},this.resizerOnResizeDone=async(e,t,s)=>{console.log(`[${e.className}] resized (${t}, ${s})`);const i=parseInt(s),n=document.getElementById(this.dlgContentCssClassName());if(n!==null){n.style.width===""?n.offsetWidth:parseInt(n.style.width),n.style.maxWidth="none";const o=n.style.height===""?n.offsetHeight:parseInt(n.style.height);n.style.maxHeight="none",n.style.height=`${o+i}px`;const l=n.querySelectorAll(`.${this.tableCssClassName()}`);if(l!==null){const a=l[0],r=a.style.height===""?a.offsetHeight:parseInt(a.style.height);a.style.maxHeight="none",a.style.height=`${r+i}px`}}},this.onCopyPaste=async(e,t)=>{switch(console.log(`[${e.className}] selected [${t}]`),t){case oe.Copy:await this.table.toClipboard();break;case oe.Paste:await this.table.fromClipboard();break}}}async startAutoSave(){this.saveTimer=new os,this.saveTimer.intervalMs=1e3,this.saveTimer.isOneShot=!1,this.saveTimer.start(this,this.onSave)}setRow(e,t,s){const i=this.editItems;if(i===void 0)return;let n=-1;for(const o of i)n++,o.colConfig(n,e,t,s)}makeResEditItems(){return[{className:"",colConfig:this.setColKey},{className:"",colConfig:this.setColValue},{className:"",colConfig:this.setColComment},{className:"",colConfig:this.setColDelBtn}]}makeScoreEditItems(){return[{className:"",colConfig:this.setColKey},{className:"",colConfig:this.setColValue},{className:"",colConfig:this.setColSelectType},{className:"",colConfig:this.setColSelectStart},{className:"",colConfig:this.setColSelectEnd},{className:"",colConfig:this.setColSelectStep},{className:"",colConfig:this.setColText},{className:"",colConfig:this.setColDelBtn}]}toHTML(e,t){if(!this.itemList)return"";this.editItems=e,this.makeLog=t;const s=e.length,i=new K;if(this.itemList.length>=1)i.makeDim(s,this.itemList.length),this.itemList.forEach((a,r)=>{this.setRow(a,r,i)}),i.makeRowTemplate(this.tableRowCssClassName()),this.table=i;else{i.makeDim(s,1);const a=new Oe;this.setRow(a,0,i),i.makeRowTemplate(this.tableRowCssClassName()),i.clearRows(),this.table=i}const n=this.tableCssClassName(),o=this.table.ToScrollHTML(n,n);this.htmlMaker=new R;const l=new V;return l.props.name="",l.props.id=n,l.props.className=n,l.props.option.setTable(o),l.props.option.onSelect=async a=>{switch(console.log(`classify = ${a.classify} targetId = ${a.targetId}`),a.classify){case this.itemSeqTypeStartCssClassName():await this.onSeqEnter(a);break;case this.itemSeqTypeEndCssClassName():await this.onSeqEnter(a);break;case this.itemSeqTypeStepCssClassName():await this.onSeqEnter(a);break;case this.itemDeleteCssClassName():const r=new de;r.setParent(this.dlgCssClassName());let c=N.None;switch(r.setYesNo(),c=await r.showWait(`${a.targetId} を削除しますか？`),c){case N.Yes:break;case N.No:return;case N.Cancel:return}const h=parseInt(a.targetId);h>=1&&(i.deleteRow(h),i.redimAllRows(),this.itemList.splice(h-this.table.firstRowIndex,1));break}},this.htmlMaker.add(l),this.htmlMaker.ToHTML()}async onSeqEnter(e){if(e.KeyEnter===he.Special){const t=this.table.getCellRect(e.parentElem),s=this.table.getTableOwnerRect(e.parentElem),i=this.table.makeCallerName(e.classify,e.targetId),n=this.table.getCallerCellElem(i);let o="";n!==null&&(o=n.value);const l=new Array;l.push("1/1");for(let r=1;r<=30;r++){const c=`${r*10}`;l.push(`${c}/${c}`)}const a=new Xt;a.setListener("updn",this.dlgContentCssClassName(),i),a.setSelectedByValue(o,l),a.applyCss(),a.show(`${parseInt(t.left)-parseInt(s.left)+10}`,`${parseInt(t.top)-parseInt(s.top)+10}`),a.enableEvents(r=>{console.log(`[onApply] ${r.callerName} ${r.result}`);const c=this.table.getCallerCellElem(r.callerName);if(c!==null){const h=c;h.value=r.result}a.dispose()},r=>{console.log(`[onUp] ${r.callerName} ${r.result}`)},r=>{console.log(`[onDown] ${r.callerName} ${r.result}`)})}}createEditorBox(e,t,s){this.parentName=t;const i=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="${this.textAddCssClassName()}">追加</button>
<button id="${this.applyCssClassName()}">保存</button>
`),n=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
   ${i}
   ${s}
</div>`,o=new j;o.title="<"+e+">",o.SetB2Type(me.CopyPaste,this.onCopyPaste);const l=o.NewDialog(t,this.dlgCssClassName());return o.SetContent(t,n,!1),this.applyCss(),o.EnableEventHandlers(),o.onMoveDone=this.moverOnMoveDone,this.dialogDesc=o,l}addEventHandlers(e){document.getElementById(this.textAddCssClassName()).onclick=async()=>{const t=this.tableRowCssClassName();this.table.addRow(t)},document.getElementById(this.applyCssClassName()).onclick=async()=>{const t=this.table.getRowElems();t!==null&&await this.makeLog(t)}}addItemEventHandlers(){this.htmlMaker.enableTableEvents(this.tableCssClassName())}enableResize(){this.dialogDesc.onResizeDone=this.resizerOnResizeDone,this.dialogDesc.EnableResize()}textAddCssClassName(){return`${this.actEditor.editorType}-edit-add`}applyCssClassName(){return`${this.actEditor.editorType}-edit-apply`}itemKeyCssClassName(){return`${this.tableCssClassName()}-key`}itemDispCssClassName(){return`${this.tableCssClassName()}-text`}itemCommentCssClassName(){return`${this.tableCssClassName()}-comment`}itemSelectTypeCssClassName(){return`${this.tableCssClassName()}-select-type`}itemSeqTypeStartCssClassName(){return`${this.tableCssClassName()}-seq-type-start`}itemSeqTypeEndCssClassName(){return`${this.tableCssClassName()}-seq-type-end`}itemSeqTypeStepCssClassName(){return`${this.tableCssClassName()}-seq-type-step`}itemTextTypeCssClassName(){return`${this.tableCssClassName()}-text-type`}itemDeleteCssClassName(){return`${this.tableCssClassName()}-delete`}tableRowCssClassName(){return`${this.actEditor.editorType}-edit-table-row`}tableCssClassName(){return`${this.actEditor.editorType}-edit-table`}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return`${this.actEditor.editorType}-edit-dlg`}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=document.createElement("style");s.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,e,t)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgContentCssClassName()} {
width: 100%;
max-width: 640px;
margin: 0 0;    /*左上位置固定*/
}
${this.htmlMaker.MakeTableScrollCss(this.tableCssClassName(),400,!0)}
.${this.itemKeyCssClassName()} {
height: 90%;
}
.${this.itemDispCssClassName()} {
height: 90%;
}
.${this.itemCommentCssClassName()} {
height: 90%;
}
.${this.itemSelectTypeCssClassName()} {
height: 90%;
}
.${this.itemSeqTypeStartCssClassName()} {
width: 60px;
height: 90%;
}
.${this.itemSeqTypeEndCssClassName()} {
width: 60px;
height: 90%;
}
.${this.itemSeqTypeStepCssClassName()} {
width: 60px;
height: 90%;
}
.${this.itemTextTypeCssClassName()} {
height: 90%;
}
.${this.itemDeleteCssClassName()} {
width: 100%;
height: 100%;
white-space: nowrap;
background: #e91e63; /* ピンクがかった赤（ポップな警告色） */
color: white;
border-radius: 4px;
padding: 4px 12px;
}
${this.htmlMaker.MakeDefaultButtonsCss()}
`.trim(),document.head.appendChild(s);const i=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,i)}}const ne={None:"None",Add:"Add",Delete:"Delete",Update:"Update"};class Rt{constructor(){this.logType=ne.None}}class et extends Rt{constructor(){super(...arguments),this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class tt extends Rt{constructor(){super(...arguments),this.gameType=z.none,this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class qe{constructor(){this.fileNames=null,this.minMap=new Map,this.maxMap=new Map,this.rangeMap=new Map,this.digLenMax=0,this.nMul=0,this.table=[{key:w.pqStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:w.pqStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:w.pqStatusREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:w.pqTokkunHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:w.pqTokkunATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:w.pqTokkunREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:w.pqTokuSp1,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:w.pqTokuSp2,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:w.mmStatusFGT,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:w.mmStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:w.mmStatusPDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:w.mmStatusACC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:w.mmStatusEVA,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:w.mmStatusCRI,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:w.mmStatusMDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:w.mmStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:w.mmStatusCRD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:w.mmStatusDEF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:w.mmStatusSPD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:w.mmAbilityDEX,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:w.mmAbilityMGC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:w.mmAbilityDUR,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:w.mmRole,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}}],this.rolePriolity=[{roleKey:Re.RlAttacker,priority:Fe.priHi,statusKey:[w.mmAbilitySTR,w.mmStatusATK,w.mmStatusSPD]},{roleKey:Re.RlHealer,priority:Fe.priHi,statusKey:[w.mmAbilityMGC,w.mmStatusMDF,w.mmStatusHP]},{roleKey:Re.RlDebuffer,priority:Fe.priHi,statusKey:[w.mmAbilityDEX,w.mmStatusACC,w.mmStatusHP]},{roleKey:Re.RlBuffer,priority:Fe.priHi,statusKey:[w.mmStatusPDF,w.mmStatusHP,w.mmStatusDEF]}]}async loadDB(e){const t=new $e,s=await t.loadBinFile(e);if(t.isWebRunning)this.zip=await window.JSZip.loadAsync(s);else{const{loadZipNode:i}=await import(t.nodeToolsImportFilename);this.zip=await i(s)}return this.fileNames=Object.keys(this.zip.files),!0}async enumStatus(e){if(this.fileNames!==null)for(const t of this.fileNames){const s=await this.getFileContent(t);if(s===null||e===void 0)continue;if(!e(t,s))break}}async debugCombo(){await this.enumStatus((e,t)=>{for(const s of t)s.useCombo&&console.log(`${e}:[${s.value}]`);return!0})}async loadAuxScoreSet(e){const t=new Lt;await t.load(re.ScoreUI,e);const s=new F;for(const i of t.itemList){const n=i.scItem;if(!i.isScoreAvail)continue;const o=new ke;switch(o.title=n.text,o.key=n.key,o.available=!1,n.selectType){case fe.Sequence:const l=this.auxScoreTextToValue(n.start),a=this.auxScoreTextToValue(n.end),r=this.auxScoreTextToValue(n.step),c=new Array;for(let u=l;u<=a;u+=r)c.push(`${u}/${u}`);o.selectionPair=c,o.selectedVal=`${l}`,o.initScoreVal=l,o.mulScoreVal=r,c.length>=1&&(o.available=!1);break;case fe.Text:const h=n.keyValue.split(",");let d="";for(const u of h){const p=u.split("/");if(p.length>=2){d=p[1];break}}o.selectionPair=h,o.selectedVal=d,o.initScoreVal=0,o.mulScoreVal=0,h.length>=1&&(o.available=!1);break}s.items.push(o)}return console.log(s),s}auxScoreTextToValue(e){const t=e.split("/"),s=t.length===1?t[0]:t[1];return parseInt(s)}async getMinMax(){await this.enumStatus((e,t)=>{for(const s of t){if(s.useCombo)continue;let i=parseInt(this.itemValue(s));if(!this.minMap.has(s.key))this.minMap.set(s.key,i);else{const n=this.minMap.get(s.key);n===void 0?this.minMap.set(s.key,i):n>i&&this.minMap.set(s.key,i)}if(!this.maxMap.has(s.key))this.maxMap.set(s.key,i);else{const n=this.maxMap.get(s.key);n===void 0?this.maxMap.set(s.key,i):n<i&&this.maxMap.set(s.key,i)}}return!0})}async getRanges(){await this.getMinMax(),this.digLenMax=0;for(const[e,t]of this.minMap){const s=t,i=this.maxMap.get(e);let n=0;if(s!==void 0&&i!==void 0&&(n=i-s),n<=0&&(n=1),this.rangeMap.set(e,n),i!==void 0){const o=Math.log10(i);o>this.digLenMax&&(this.digLenMax=o)}}this.nMul=this.digLenMax>0?Math.pow(10,Math.ceil(this.digLenMax)):1;for(const[e,t]of this.minMap)console.log(`[${e}] = ${this.minMap.get(e)},${this.maxMap.get(e)} ${this.rangeMap.get(e)}`);console.log(`digLenMax=[${this.digLenMax}] nMul=[${this.nMul}]`)}stdBy(e,t){let s,i;if(this.rangeMap.has(e)&&(s=this.rangeMap.get(e)),this.minMap.has(e)&&(i=this.minMap.get(e)),s===void 0||i===void 0||this.isNumeric(t)===!1)return null;s<=0&&(s=1);const n=(parseInt(t)-i)*s;return this.nMul*n}getFilename(e){let t=null;for(let s of this.fileNames){let i=s.indexOf("_");if(i>=0){let n=s.substring(i+1);if(i=n.indexOf("."),i>=0&&(n=n.substring(0,i)),n===e){t=s;break}}}return t}async getFileContent(e){if(e===null)return null;const t=this.zip.file(e);if(t){const s=await t.async("string");return JSON.parse(s)}return null}async getStatus(e){this.digLenMax===0&&await this.getRanges();const t=this.getFilename(e);if(t===null)return null;const s=await this.getFileContent(t);if(s===null)return null;let i=null;for(const o of s)if(!o.useCombo){for(const l of this.rolePriolity)if(l.statusKey.find(r=>r===o.key)){i=l,console.log(`find role : ${i.roleKey}`);break}if(i!==null)break}const n=new F;if(i!==null)for(const o of s){if(o.useCombo)continue;if(i.statusKey.find(a=>a===o.key)){const a=this.table.find(r=>r.key===o.key);if(a){const r=a.scoreFunc(o.key,this.itemValue(o));r.title=o.disp,r.key=o.key,r.selectedVal="1",n.items.push(r)}}}else for(const o of s){if(o.useCombo)continue;const l=this.table.find(a=>a.key===o.key);if(l){const a=l.scoreFunc(o.key,this.itemValue(o));a.title=o.disp,a.key=o.key,a.selectedVal="1",n.items.push(a)}}return n}async getComboKeywords(e){let t=0;const s=new Map,i=new Map;for(const n of e){const o=this.getFilename(n);if(o===null)return null;const l=await this.getFileContent(o);if(l===null)return null;const a=new Map;for(const r of l){if(!r.useCombo)continue;const c=r.value.split(",");for(const h of c)if(a.has(h)===!1)a.set(h,1);else{const d=a.get(h);a.set(h,d+1)}}if(a.size===0){t=0,i.clear();continue}for(const[r,c]of a)if(i.has(r)===!1)i.set(r,c);else{const h=i.get(r);i.set(r,h+c)}if(t++,!(t<=2))for(const[r,c]of i)c>=3&&s.set(r,c)}}async debugCheckCombo(){const e=new Array;e.push("119599"),e.push("119603"),e.push("119624"),await this.getComboKeywords(e)}isNumeric(e){return e.trim()===""?!1:!isNaN(Number(e))}itemValue(e){return e.converted===""?e.value:e.converted}toScoreMaxNum(e,t){return this.isNumeric(t)===!1?null:qe.useStdConv?this.stdBy(e,t):t!==""?parseInt(t):1}scoreFunc(e,t){const s=new ke;if(e===null)return s;s.mulScoreVal=e/t;for(let i=1;i<=t;i++){const n=Math.ceil(e/t*i);s.selectionPair.push(`Lv${i}/${i}`),i===1&&(s.initScoreVal=n)}return s.available=!0,s}scoreFuncOld(e,t){const s=new ke;if(this.isNumeric(e)===!1)return s;let i=e!==""?parseInt(e):1;s.mulScoreVal=i/t;for(let n=1;n<=t;n++){const o=Math.ceil(i/t*n);s.selectionPair.push(`Lv${n}/${n}`),n===1&&(s.initScoreVal=o)}return s.available=!0,s}puyoToku(e){return e==="enable"?10:1}}qe.useStdConv=!1;const Fe={priHi:0},te={None:"None",UI:"UI",Menu:"Menu"};class X{constructor(){this.dockType=te.None,this.iconFileName="",this.toolTip="",this.idAttributeForHTML=""}get labelWrap(){let e=this.toolTip,t=this.toolTip.length;if(t>3){const s=t%2===0?t/2:t/2+1,i=e.substring(0,s),n=e.substring(s);e=i+`
`+n}return e}setAsDlg(e,t){this.dockType=te.UI,this.dlg=e,this.toolTip=t}setAsMenu(e){this.dockType=te.Menu,this.toolTip=e}get isUIType(){return this.dockType==te.UI}get isMenuType(){return this.dockType==te.Menu}ToggleStatus(){this.dlg===void 0||this.dlg===null||(this.dlg.hidden=!this.dlg.hidden)}}class Ge{constructor(){this.items=new Array,this.parentName="",this.listName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new b().SaveSetting(e,!1)}}add(e){return e.dockType==te.UI&&(e.dlgParent=e.dlg.parentElement),this.items.push(e),!0}async toHTML(e,t=null){if(!this.items)return"";this.listName=e,this.htmlMaker=new R;let s=0;for(const i of this.items){s++;const n=`dock-uid${s}`;i.idAttributeForHTML=n;const o=new V,l=i.labelWrap;o.props.name=this.itemCssClassName(),o.props.id=n,o.props.className=this.imgCssClassName(),o.props.option.toolTip=i.toolTip,o.props.option.setLabel(l,!0),o.props.option.onSelect=a=>{const r=this.items.find(c=>a.item.props.id===c.idAttributeForHTML);if(r&&(this.selectedItem=r,this.onApply!==void 0)){const c=new ls;c.item=this.selectedItem,this.onApply(c)}},this.htmlMaker.add(o)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createDockBox(e,t,s=!0){this.parentName=e;const i=`<div class="${this.parentName}-dlg-content">
    ${t}
</div>`,n=new j;n.SetB3Type(Ne.Hide);const o=n.NewDialog(e,this.dlgCssClassName());return n.SetContent(e,i,s),this.applyCss(),n.EnableEventHandlers(),n.onMoveDone=this.moverOnMoveDone,o}addItemClickHandlers(e){this.onApply=e,this.htmlMaker.SelectByID(this.itemCssClassName(),this.htmlMaker.GetIdByIndex(0)),this.htmlMaker.enableEvents(this.itemCssClassName())}stdApplyAction(e){return e.item.dlgParent===null?(e.cancel=!0,!1):(console.log(`selected item = [${e.item.toolTip}::${e.item.dockType}]`),e.item.isUIType&&(new b().MoveHiestLayer(e.item.dlgParent),e.item.dlgParent.hidden&&(e.item.dlgParent.hidden=!1)),!0)}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),i=48,n=this.items.length,o=document.createElement("style");o.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,60,10,b.ignoreIndex)}
${this.htmlMaker.MakeSystematicDialogCss(this.dlgCssClassName())}
.${this.parentName}-dlg-content {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

${this.htmlMaker.MakeDefaultNonScrollCss(this.parentName,0)}
${this.htmlMaker.MakeDefaultGridColCss(e,i,n,i*n)}

${this.htmlMaker.MakeDefaultItemLabelCss(t,s,i,i)}
${this.htmlMaker.MakeSystematicSelectionCss(t)}

${this.htmlMaker.MakeDefaultButtonsCss()}
span {
display: grid;
align-content: center;
white-space: pre-wrap;
}
`.trim(),document.head.appendChild(o);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}listCssClassName(){return`${this.listName}-list`}dlgCssClassName(){return`${this.parentName}-dlg`}static GetDialogInfo(e){return j.GetDialogInfo(e)}static SetDialogInfo(e){return j.SetDialogInfo(e)}async InitZOrder(e){await e.ForEachAsync(t=>{const s=Ge.GetDialogInfo(t),i=e.FindByName(t);return s!==null&&(s.zindex=i!==null?i.style.zIndex:""),console.log(s),!0})}}class ls{constructor(){this.cancel=!1}}class ze{constructor(){this.dockType=te.None,this.iconFileName="",this.toolTip="",this.dlgName="",this.hidden=!1,this.zIndex="",this.topPx="",this.leftPx=""}static toJsonText(e){const t=ze.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new ze;return t.dockType=e.dockType,t.iconFileName=e.iconFileName,t.toolTip=e.toolTip,e.isUIType&&(t.dlgName=e.dlgParent.id,t.hidden=typeof e.dlgParent.hidden=="string"?!1:e.dlgParent.hidden,t.zIndex=e.dlgParent.style.zIndex,t.leftPx=e.dlgParent.style.left,t.topPx=e.dlgParent.style.top),t}}class Ve{static toJsonText(e){const t=Ve.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new Ve;t.items=new Array;for(const s of e.items)t.items.push(ze.toJsonInst(s));return t}restore(e,t){for(const s of this.items){const i=e.items.find(n=>n.dlg.id===s.dlgName);i&&(i.dockType=s.dockType,i.iconFileName=s.iconFileName,i.toolTip=s.toolTip,i.isUIType&&(i.dlgParent.hidden=typeof s.hidden=="string"?!1:s.hidden,i.dlgParent.style.zIndex=s.zIndex,i.dlgParent.style.left=s.leftPx,i.dlgParent.style.top=s.topPx))}t.ReOrder()}}class as{convTitle(e){if(e.length<=8)return e;const t="スキル";return e.endsWith(t)?`${e.substring(0,e.length-t.length)}<br>${t}`:e}}let Ye=null;function Bt(){return Ye||(Ye=new as,console.log("ConvertTools instance created (Singleton)")),Ye}class Xe{constructor(){this.chUuid="",this.ch=new ae}}class rs{constructor(){this.chList=new Array,this.uiInfo=new ge,this.parentName="",this.editingRowIndex=-1,this.scoreGrid=new Yt,this.gridHeaderName=`${this.dlgCssClassName()}-headerName`,this.gridFooterName=`${this.dlgCssClassName()}-footerName`,this.gridName=`${this.dlgCssClassName()}-gridName`,this.gridRowName=`${this.dlgCssClassName()}-gridRowName`,this.keyClassName=`${this.dlgCssClassName()}-keyClassName`,this.valueClassName=`${this.dlgCssClassName()}-valueClassName`,this.onSelect=async e=>{console.log(`classify = ${e.classify} selectedValue = ${e.selectedValue} targetId = ${e.targetId}`);const t=this.editingCh;if(t===null)return;const i=t.scoreSet.items.find(n=>n.key===e.classify);i&&(i.selectedVal=e.selectedValue)},this.savedScoreSet=new F,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new b().SaveSetting(e)}}async load(){const t=await(await le()).get(pe.CharSummaryAction);if(t===null)return;const s=new Map,i=new Array;this.usingLog(t,s,i),this.chList=new Array;for(const[n,o]of s){const l=Pe.fromJsonText(o.log),a=new ae;a.ns=l.ch.ns,a.id=l.ch.id,a.name=l.ch.name,a.contentURL=l.ch.contentURL,a.iconURL=l.ch.iconURL,a.idAsText=l.ch.idAsText,a.idAttributeForHTML=l.ch.idAttributeForHTML;const r=new F;F.copy(l.scoreSet,r,!0);const c=new Xe;c.chUuid=l.chUuid,c.ch=a,c.scoreSet=r,this.chList.push(c)}}usingLog(e,t,s){for(const i of e){const n=Pe.fromJsonText(i.log);if(n.chUuid==="")continue;let o=!1,l=!1;switch(n.logType){case Y.None:break;case Y.Add:o=!0;break;case Y.Update:t.has(n.chUuid)?o=!0:o=!1;break;case Y.Delete:o=!0,l=!0;break}if(o)if(l){if(t.has(n.chUuid)){t.delete(n.chUuid);const a=t.get(n.chUuid);s.push(a)}}else{if(t.has(n.chUuid)){const a=t.get(n.chUuid);s.push(a),t.delete(n.chUuid)}t.set(n.chUuid,i)}}}sortByScore(){return this.chList.length===0?null:this.chList.sort((t,s)=>s.scoreSet.stdScore-t.scoreSet.stdScore)}async updateCharInfos(e){let t=this.table.firstRowIndex-1;for(const s of this.chList){t++;const i=await e.getImageUrlBy(s.ch.iconFileName,s.ch.ns);i!==null&&this.table.updateRowImage(t,i),this.updateChScoreInfo(t)}this.table.redimAllRows(),t=this.table.firstRowIndex,this.table.selectRow(t),this.table.scroll(t)}setRow(e,t,s){let i=0;const n=new nt;n.imgFile=e.iconFileName,s.getCell(i,t).typeInfo.setImg(n),s.getCell(i,t).className=this.itemIconCssClassName();const o=`${e.name}`;s.getCell(i,t,1).typeInfo.setLabel(o,!1),s.getCell(i,t,1).className=this.itemStatusCssClassName(),i++,s.getCell(i,t).typeInfo.setButton("更新"),s.getCell(i,t).className=this.itemUpdateCssClassName(),s.getCell(i,t).typeInfo.using.itemId=t,s.getCell(i,t,1).typeInfo.setButton("削除"),s.getCell(i,t,1).className=this.itemDeleteCssClassName(),s.getCell(i,t,1).typeInfo.using.itemId=t}toHTML(){if(!this.chList)return"";const e=new K;if(this.chList.length>=1)e.makeDim(2,this.chList.length),e.growCell(0,2),e.growCell(1,2),this.chList.forEach((n,o)=>{const l=n.ch;this.setRow(l,o,e)}),e.makeRowTemplate(this.tableRowCssClassName()),this.table=e;else{e.makeDim(2,1),e.growCell(0,2),e.growCell(1,2);const n=new ae;this.setRow(n,0,e),e.makeRowTemplate(this.tableRowCssClassName()),e.clearRows(),this.table=e}const t=this.tableCssClassName(),s=this.table.ToScrollHTML(t,"");this.htmlMaker=new R;const i=new V;return i.props.name="",i.props.id="0",i.props.className=t,i.props.option.setTable(s),i.props.option.onSelect=async n=>{switch(console.log(`classify = ${n.classify} targetId = ${n.targetId}`),n.classify){case this.itemUpdateCssClassName():await this.onItemEdit(n);break;case this.itemDeleteCssClassName():await this.onItemDelete(n);break}},this.htmlMaker.add(i),this.htmlMaker.ToHTML()}createSummaryBox(e,t,s){this.parentName=t;let i=`
<button id="${this.itemAddCssClassName()}">キャラ追加</button>
`.trim();const n=this.htmlMaker.MakeDefaultToolButtonsHTML(i),o=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${n}
    ${s}
</div>`,l=new j;l.title="<"+e+">";const a=l.NewDialog(t,this.dlgCssClassName());return l.SetContent(t,o),this.applyCss(),l.EnableEventHandlers(),l.onMoveDone=this.moverOnMoveDone,a}addEventHandlers(e,t){this.onAdd=t,document.getElementById(`${this.itemAddCssClassName()}`).onclick=async()=>{if(this.onAdd===void 0)return;const s=new At;await this.onAdd(s),s.cancel!==!0&&await this.onItemAdd(s)}}createScoreGrid(e){const t=this.dlgContentCssClassName(),s=Bt(),i=this.scoreGrid.makePair();for(const n of e.items){const o=s.convTitle(n.title),l=n.title,a=this.scoreGrid.makeKeyCell(o,this.keyClassName,l),r=new ot;r.selectionPair=n.selectionPair,r.selectedItem=n.selectedVal,r.classify=n.key;const c=new Ue;c.makeItems(),c.items[0].typeInfo.setCombo(r),c.items[0].className=this.valueClassName,i.set(a,c)}if(this.scoreGrid.setPair(i),this.scoreGrid.setListener(this.gridName,this.gridRowName,t,this.gridHeaderName,this.gridFooterName),this.scoreGrid.enableEvents(this.onSelect),this.scoreGrid.footerElem!==null){let n=`
<button id="${this.gridFooterName}-okBtn">OK</button>
<button id="${this.gridFooterName}-canBtn">CANCEL</button>
`.trim();this.scoreGrid.footerElem.innerHTML=n,document.getElementById(`${this.gridFooterName}-okBtn`).onclick=async()=>{const o=this.editingCh;o!==null&&(o.scoreSet,this.addActionLog(o,Y.Update),this.removeScoreGrid(),this.updateChScoreInfo(this.editingRowIndex))},document.getElementById(`${this.gridFooterName}-canBtn`).onclick=async()=>{const o=this.editingCh;if(o===null)return;const l=o.scoreSet;F.copy(this.savedScoreSet,l),this.removeScoreGrid()}}}removeScoreGrid(){if(this.scoreGrid.headerElem!==null){const e=this.editingRowIndex,t=this.table.getRowElem(e),s=this.table.getCellElems(t),i=this.scoreGrid.headerElem.children[0];s[0][0].appendChild(i)}this.scoreGrid!==null&&(this.scoreGrid.dispose(),this.htmlMaker.setVisible(this.itemAddCssClassName(),!0),this.table.setVisible(!0))}get editingCh(){const e=this.editingRowIndex;return e<this.table.firstRowIndex?null:this.chList[e-this.table.firstRowIndex]}async onItemAdd(e){const t=new de;t.setParent(this.dlgCssClassName());let s=N.None;if(t.setYesNo(),s=await t.showWait(`${e.selectCh.name} を追加しますか？`),s===N.No)return;const i=this.tableRowCssClassName(),n=this.table.addRow(i);if(n<this.table.firstRowIndex)return;this.table.selectRow(n),this.table.updateRowImage(n,e.selectedImg),this.table.scroll(n);const o=new Xe;o.chUuid=Gt(),o.ch=e.selectCh,o.scoreSet=e.scoreSet,this.chList.push(o),this.updateChScoreInfo(n),this.addActionLog(o,Y.Add)}async onItemEdit(e){const t=parseInt(e.targetId);if(t<this.table.firstRowIndex)return;this.editingRowIndex=t;const s=this.chList[t-this.table.firstRowIndex].scoreSet;this.savedScoreSet=new F,F.copy(s,this.savedScoreSet,!0),this.createScoreGrid(s),this.htmlMaker.setVisible(this.itemAddCssClassName(),!1),this.table.setVisible(!1);const i=this.table.getRowElem(t),o=this.table.getCellElems(i)[0][0].children[0];this.scoreGrid.headerElem?.appendChild(o)}async onItemDelete(e){const t=parseInt(e.targetId);if(t<this.table.firstRowIndex)return;const s=this.chList[t-this.table.firstRowIndex],i=new de;i.setParent(this.dlgCssClassName());let n=N.None;switch(i.setYesNo(),n=await i.showWait(`${s.ch.name} を削除しますか？`),n){case N.Yes:break;case N.No:return;case N.Cancel:return}this.addActionLog(s,Y.Delete),t>=1&&(this.table.deleteRow(t),this.table.redimAllRows(),this.chList.splice(t-this.table.firstRowIndex,1))}async addActionLog(e,t){const s=new Pe;s.logType=t,s.chUuid=e.chUuid,s.ch=e.ch,s.scoreSet=e.scoreSet;const i=Pe.toJsonText(s);await(await le()).put(pe.CharSummaryAction,i)}updateChScoreInfo(e){const t=this.table.getRowElem(e);if(t===null)return;const s=this.table.getCellElems(t);if(s===null)return;const i=this.chList[e-this.table.firstRowIndex].ch.name;this.table.updateText(s[0][1],i);const n=this.getChScoreInfo(e);this.table.updateRowImageToolTip(e,n)}getChScoreInfo(e){const t=e-this.table.firstRowIndex,s=this.chList[t];let i="";for(const n of s.scoreSet.items){console.log(n);let o=n.selectedText;o=o===void 0?"*bug*":o;const l=`${n.title}:${o}`;i!==""&&(i=`${i}
`),i=`${i}${l}`}return i}addItemEventHandlers(){this.htmlMaker.enableTableEvents(this.tableCssClassName())}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}async charStock(e){let t=this.table.getSelectedRow();const s=t!==this.table.invalidRowIndex,i=new de;i.setParent(this.dlgCssClassName());let n=N.None;s?(i.setYesNoCancel(),n=await i.showWait(`${e.selectCh.name} を更新しますか？`)):(i.setYesNo(),n=await i.showWait(`${e.selectCh.name} を追加しますか？`));let o=!1,l=!1;switch(n){case N.Yes:s?(o=!1,l=!0):(o=!0,l=!1);break;case N.No:s?(o=!0,l=!1):(o=!1,l=!1);break;case N.Cancel:return}let a=null;if(o){const r=this.tableRowCssClassName(),c=this.table.addRow(r);if(c>=0){const h=new Xe;h.ch=e.selectCh,h.scoreSet=e.scoreSet,this.chList.push(h),t=c,this.table.selectRow(c),this.table.updateRowImage(c,e.selectedImg),this.table.scroll(c),a=this.table.getRowElem(c)}}if(l){const r=t-this.table.firstRowIndex,c=this.chList[r];c.scoreSet=e.scoreSet,this.tableRowCssClassName();const h=t;this.table.scroll(h),a=this.table.getRowElem(h)}if(a!==null){const r=this.table.getCellElems(a);if(r){const c=this.getChScoreInfo(t);this.table.updateText(r[0][1],c)}}}itemIconCssClassName(){return`${this.tableCssClassName()}-icon`}itemStatusCssClassName(){return`${this.tableCssClassName()}-status`}itemAddCssClassName(){return`${this.tableCssClassName()}-add`}itemUpdateCssClassName(){return`${this.tableCssClassName()}-update`}itemDeleteCssClassName(){return`${this.tableCssClassName()}-delete`}tableRowCssClassName(){return"char-summary-table-row"}tableCssClassName(){return"char-summary-table"}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return"char-summary-dlg"}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=document.createElement("style");s.textContent=`
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

`.trim(),document.head.appendChild(s);const i=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,i)}}class At{constructor(){this.cancel=!1}}const Y={None:"None",Add:"Add",Delete:"Delete",Update:"Update"};class Pe{constructor(){this.logType=Y.None,this.chUuid=""}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class cs{constructor(){this.TextMap=new Map}set(e,t){const s=this.TextMap.has(e);return this.TextMap.set(e,t),s}remove(e){const t=this.TextMap.has(e);return t&&this.TextMap.delete(e),t}get count(){return this.TextMap.size}clear(){this.TextMap.clear()}forEach(e){if(e===void 0)return;let t=!1;for(const[s,i]of this.TextMap)if(t=e(s,i),t)break;return t}values(){const e=new Map;for(const[t,s]of this.TextMap)e.set(t,parseInt(s));return e}}class Dt{constructor(e=0,t=""){this.ch=new ae,this.isEmpty=!0,this.details=new cs,this.ch.id=e,this.ch.name=t}set(e,t){const s=this.details.TextMap.has(e);return this.details.set(e,t),s}get values(){return this.details.values()}get itemID(){const e=this.itemKey,t=this.ch.idAttributeForHTML.substring(e.length);let s=parseInt(t);return s<=0?-1:s}get itemKey(){return"chuid"}}class st{constructor(){this.nFormationItem=5,this.uiInfo=new ge}Init(){this.items=new Array;for(let e=0;e<this.nFormationItem;e++)this.items.push(new Dt)}put(e,t){const s=this.items.find(i=>this.isExistCh(i,t));return s!==void 0&&s.isEmpty===!1?!1:(e.ch.ns=t.ns,e.ch.id=t.id,e.ch.name=t.name,e.isEmpty=!1,!0)}empty(e){const t=e.isEmpty;return e.isEmpty=!0,e.isEmpty!=t}isExistCh(e,t){return e.ch.name===t.name&&e.ch.id===t.id}equalsFormationItem(e,t){return e.ch.name===t.ch.name&&e.ch.id===t.ch.id}}class hs{constructor(){this.emptyFile="plus.png",this.autoForm=!1,this.editFormEnable=!1,this.saveEnable=!1,this.enableScoreEvent=!1,this.parentName="",this.listName="",this.gridHeaderName=`${this.dlgCssClassName()}-headerName`,this.gridFooterName=`${this.dlgCssClassName()}-footerName`,this.gridName=`${this.dlgCssClassName()}-gridName`,this.scoreGrid=null,this.editingIndex=-1,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new b().SaveSetting(e)},this.onScoreGridOpen=async e=>{console.log(`notifty id     = ${e.item.props.id}`),console.log(` targetId      = ${e.targetId}`),console.log(` classify      = ${e.classify}`),console.log(` selectedValue = ${e.selectedValue}`);const t=e.item.props.id,s=parseInt(t)-1;if(0<=s&&s<this.formation.items.length){const i=`${this.propItemCssClassName()}-${t}`;if(this.htmlMakerProp.IsEnabledId(i)!==!0)return;if(this.enableScoreEvent){const o=this.formation.items[s];if(o.ch.id===0){console.log("*bug?*");return}if(this.scsList[s].items.length===0){const l=`${o.ch.id}`,a=await this.charDB.getStatus(l);a!==null&&a.items!==void 0&&(a.items=a.items.concat(this.auxScoreSet.items),this.scsList[s]=a,this.makeFlyoutGrid(a,s))}else{const l=this.scsList[s];this.makeFlyoutGrid(l,s)}}}else console.log(`invalid index = ${s}`)},this.savedScoreSet=new F,this.onScoreValueSelect=async e=>{console.log(`${e.callerName}, ${e.result}`);const s=this.scsList[this.editingIndex].items.find(i=>i.key===e.callerName);s!==void 0&&(s.selectedVal=e.result)},this.onOkClickScoreGrid=async e=>{const t=this.formation.items[this.editingIndex],s=this.scsList[this.editingIndex];this.disposeScorGrid();const i=new ms;i.uiName=this.parentName,i.item=t,i.values=t.values,i.scoreConfigSet=s,this.onPropChanged(i)},this.onCancelClickScoreGrid=async e=>{const t=this.scsList[this.editingIndex];F.copy(this.savedScoreSet,t),this.disposeScorGrid()},this.onCopyPaste=async(e,t)=>{console.log(`[${e.className}] selected [${t}]`);const s="formation:";switch(t){case oe.Copy:const i=Q.toJsonText(this.formation,this.scsList);await O.put(`${s}${i}`);break;case oe.Paste:const n=await O.get();if(n===null||!n.startsWith(s))break;const o=JSON.parse(n.substring(s.length));console.log(o);const l=this.selectedItem.itemID;this.formation.Init();let a=-1;for(const r of o.items){a++,this.formation.items[a]=Se.fromJsonInst(r);const c=this.formation.items[a];c.ch.idAttributeForHTML=`${c.itemKey}${a+1}`}this.scsList=new Array;for(const r of o.scsList)this.scsList.push(r);a=-1;for(const r of this.formation.items){a++;let c=!1;r.isEmpty?await this.charEmptyItem(r):(await this.charPutItem(r),c=!0);const h=`${this.propItemCssClassName()}-${a+1}`;this.htmlMakerProp.EnableId(h,c)}this.selectedItem=this.formation.items[l-1];break}}}InitForEnemy(e){this.charDB=e,this.formation=new st,this.formation.Init(),this.enableScoreEvent=!0,this.scsList=new Array;const t=this.formation.nFormationItem;for(let s=0;s<t;s++){const i=new F;this.scsList.push(i)}}InitForPlayer(e){this.charSummary=e,this.autoFormation()}autoFormation(){this.formation=new st,this.formation.Init();const e=this.charSummary.sortByScore();console.log("sorted"),console.log(e);let t=0;if(this.scsList=new Array,e!==null){const s=Math.min(e.length,this.formation.nFormationItem);for(let i=0;i<s;i++){const n=this.formation.items[i];this.formation.put(n,e[i].ch)}for(const i of e){const n=i.scoreSet;this.scsList.push(n)}t=this.formation.nFormationItem-s}else t=this.formation.nFormationItem;for(let s=0;s<t;s++){const i=new F;this.scsList.push(i)}}SetAuxScoreSet(e){this.auxScoreSet=e}async Setup(e,t){if(!e)return;this.formation=e;let s=0;for(const i of this.formation.items){i.isEmpty?this.formation.empty(i):this.formation.put(i,i.ch),s++;const n=`${i.itemKey}${s}`;i.ch.idAttributeForHTML=n;const o=i.isEmpty?this.emptyFile:i.ch.iconFileName,l=await t.getImageUrlBy(o,i.ch.ns);if(l===null)return;this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),i.ch.idAttributeForHTML,l)}}async toHTML(e){if(!this.formation)return"";this.listName=e,this.htmlMakerChSel=new R;let t=0;for(const s of this.formation.items){const i=s.ch;t++;const n=`${s.itemKey}${t}`;i.idAttributeForHTML=n;const o="",l=s.isEmpty?this.emptyFile:i.iconFileName,a=new nt;a.imgSrc=o,a.imgFile=l;const r=new V;r.props.name=this.itemCssClassName(),r.props.id=n,r.props.className=this.imgCssClassName(),r.props.option.setImg(a),r.props.option.toolTip=i.name,r.props.option.onSelect=c=>{console.log(`notifty id = ${c.item.props.id}`),this.setSelectedItem(c.item.props.id)},this.htmlMakerChSel.add(r)}return this.htmlMakerChSel.MakeScrollableList(this.listCssClassName())}toGridHTML(){this.htmlMakerProp=new R;let e=0;for(const t of this.formation.items){t.ch;const s=this.scsList[e];e++;for(const n of s.items)t.details.set(n.key,n.selectedVal);const i=new V;i.props.name=`${this.propItemCssClassName()}-${e}`,i.props.id=`${e}`,i.props.className=`${this.propItemCssClassName()}`,i.props.option.setButton("スコア"),i.props.option.using.itemId=e,i.props.option.onSelect=this.onScoreGridOpen,this.htmlMakerProp.add(i)}return this.htmlMakerProp.MakeScrollableList(this.propCssClassName())}createFormationBox(e,t,s,i){this.parentName=t;let n="";this.autoForm&&(n=`<button id="${this.dlgCssClassName()}-auto">自動選定</button>`);let o="";this.editFormEnable&&(o=`
<button id="${this.dlgCssClassName()}-tbput">配置</button>
<button id="${this.dlgCssClassName()}-tbempty">抹消</button>
<button id="${this.dlgCssClassName()}-tbLeft">←</button>
<button id="${this.dlgCssClassName()}-tbRight">→</button>
`.trim());let l="";this.saveEnable&&(l=`<button id="${this.dlgCssClassName()}-stock">編成保存</button>`);let a=`
${n}
${o}
${l}
`.trim();const r=this.htmlMakerChSel.MakeDefaultToolButtonsHTML(a),c="";let h="";i!==""?h=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${r}
    ${s}
    ${i}
    ${c}
</div>`:h=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${r}
    ${s}
    ${c}
</div>`;const d=new j;d.title="<"+e+">",d.SetB2Type(me.CopyPaste,this.onCopyPaste),d.SetB4Type(ue.DialogHide);const u=d.NewDialog(t,this.dlgCssClassName());return d.SetContent(t,h),this.applyCss(),d.EnableEventHandlers(),d.onMoveDone=this.moverOnMoveDone,u}addEventHandlers(e){const t=document.getElementById(`${this.dlgCssClassName()}-auto`);t!==null&&(t.onclick=async()=>{await this.onAutoPut()});const s=document.getElementById(`${this.dlgCssClassName()}-tbput`);s!==null&&(s.onclick=async()=>{await this.onCharPut()});const i=document.getElementById(`${this.dlgCssClassName()}-tbempty`);i!==null&&(i.onclick=async()=>{await this.onCharEmpty()});const n=document.getElementById(`${this.dlgCssClassName()}-tbLeft`);n!==null&&(n.onclick=async()=>{await this.onCharLeft()});const o=document.getElementById(`${this.dlgCssClassName()}-tbRight`);o!==null&&(o.onclick=async()=>{await this.onCharRight()});const l=document.getElementById(`${this.dlgCssClassName()}-stock`);l!==null&&(l.onclick=async()=>{if(this.onStock!==void 0){if(this.selectedItem.ch.ns===H.None)return;const a=this.htmlMakerChSel.FindImgByID(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML),r=new Qe;r.item=this.selectedItem,r.selectedImg=a===null?"":a.src;const c=this.findPropSelectedPos();c!==-1&&(r.scoreSet=this.scsList[c]),await this.onStock(r)}})}addItemEventkHandlers(e,t,s,i){this.onStock=s,this.onPut=e,this.onEmpty=t,this.onPropChanged=i;const n=this.htmlMakerChSel.GetIdByIndex(0);if(this.htmlMakerChSel.SelectByID(this.itemCssClassName(),n),this.htmlMakerChSel.enableEvents(this.itemCssClassName()),this.enableScoreEvent===!0){let o=0;for(const l of this.formation.items){o++;const a=`${this.propItemCssClassName()}-${o}`;this.htmlMakerProp.EnableId(a,!1)}this.htmlMakerProp.enableEvents(this.propCssClassName())}this.setSelectedItem(n)}async onAutoPut(){this.autoFormation(),await this.Setup(this.formation,this.imgLoader),await this.notifyChangeForm()}async notifyChangeForm(){for(const e of this.formation.items)await this.notifyChangeFormItem(e)}async notifyChangeFormItem(e){e.isEmpty?await this.notiftyOnEmpty(e):await this.notiftyOnPut(e,e.ch.iconFileName)}async notiftyOnPut(e,t){const s=new Qe;return s.uiName=this.formation.uiInfo.name,s.item=e,s.selectedImg=t,await this.onPut(s),s}async notiftyOnEmpty(e){const t=new Qe;return t.uiName=this.formation.uiInfo.name,t.item=e,t.selectedImg=this.emptyFile,await this.onEmpty(t),t}async onCharPut(){if(this.onPut!==void 0){this.selectedItem.isEmpty=!1;const e=await this.notiftyOnPut(this.selectedItem,"");this.formation.put(this.selectedItem,e.selectCh),this.replaceCharImg(this.selectedItem.ch.idAttributeForHTML,e.selectedImg,this.selectedItem.ch.name),this.propSelectedEnabled(!0)}}async onCharEmpty(){if(this.onEmpty!==void 0){this.selectedItem.isEmpty=!0;const e=await this.notiftyOnEmpty(this.selectedItem);this.formation.empty(this.selectedItem),this.replaceCharImg(this.selectedItem.ch.idAttributeForHTML,e.selectedImg,""),this.propSelectedEnabled(!1);const t=this.findPropSelectedPos();t!==-1&&(this.scsList[t]=new F)}}async onCharLeft(){this.canSwap(1)&&await this.formSwap(-1)}async onCharRight(){this.canSwap(this.formation.nFormationItem)&&await this.formSwap(1)}canSwap(e){return!(this.selectedItem===void 0||this.selectedItem.isEmpty===!0||this.selectedItem.itemID===e)}async formSwap(e){const t=this.selectedItem,s=t.itemID-1,i=s+e,n=this.formation.items[i],o=t.ch.idAttributeForHTML,l=n.ch.idAttributeForHTML,a=this.scsList[s],r=this.scsList[i],c=this.itemCssClassName(),h=this.htmlMakerChSel.FindImgByID(c,o),d=this.htmlMakerChSel.FindImgByID(c,l);if(h!==null&&d!==null){this.htmlMakerChSel.SwapImgSrcToolTip(h,d);const u=`${n.itemKey}${n.itemID}`;this.htmlMakerChSel.UnselectAll(c),this.htmlMakerChSel.SelectByID(c,u),this.formation.items[s]=n,this.formation.items[i]=t,this.formation.items[s].ch.idAttributeForHTML=o,this.formation.items[i].ch.idAttributeForHTML=l,this.scsList[s]=r,this.scsList[i]=a,this.setSelectedItem(u);const p=this.formation.items[s],I=this.formation.items[i];this.propAutoEnabled(p),this.propAutoEnabled(I),await this.notifyChangeFormItem(p),await this.notifyChangeFormItem(I)}}async charPutItem(e){const t=await this.notiftyOnPut(e,e.ch.iconFileName);this.replaceCharImg(e.ch.idAttributeForHTML,t.selectedImg,e.ch.name)}async charEmptyItem(e){const t=await this.notiftyOnEmpty(e);this.replaceCharImg(e.ch.idAttributeForHTML,t.selectedImg,"")}replaceCharImg(e,t,s){this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),e,t),this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(),e,s)}propSelectedEnabled(e){const t=this.findPropSelectedPos();if(t!==-1){const s=`${this.propItemCssClassName()}-${t+1}`;this.htmlMakerProp.EnableId(s,e)}}propAutoEnabled(e){const t=!e.isEmpty,s=`${this.propItemCssClassName()}-${e.itemID}`;this.htmlMakerProp.EnableId(s,t)}makeFlyoutGrid(e,t){if(this.scoreGrid!==null)return;this.editingIndex=t,this.savedScoreSet=new F,F.copy(e,this.savedScoreSet,!0);const s=Bt(),i=new Array;for(const d of e.items){const u=new ot;u.selectionPair=d.selectionPair,u.selectedItem=d.selectedVal,u.classify=d.key;const p=new Ue;p.makeItems(),p.items[0].typeInfo.setCombo(u),p.items[0].className="";const I=new _t;I.key=d.key,I.text=s.convTitle(d.title),I.value=p,i.push(I)}const n=t+1,o=new Zt;if(o.setGridtems(i),o.setListener(`${this.gridName}-${n}`,`${this.propItemCssClassName()}-${n}`,this.dlgContentCssClassName(),`${this.gridHeaderName}-${n}`,`${this.gridFooterName}-${n}`),o.setVisible(!0),o.setFontConfig("0.8"),o.applyCss(),o.enableEvents(this.onScoreValueSelect),this.scoreGrid=o,this.scoreGrid.footerElem!==null){let d=`
<button id="${this.gridFooterName}-okBtn">OK</button>
<button id="${this.gridFooterName}-canBtn">CANCEL</button>
`.trim();this.scoreGrid.footerElem.innerHTML=d,document.getElementById(`${this.gridFooterName}-okBtn`).onclick=this.onOkClickScoreGrid,document.getElementById(`${this.gridFooterName}-canBtn`).onclick=this.onCancelClickScoreGrid}const l=document.getElementById(this.dlgContentCssClassName()),a=this.htmlMakerChSel.GetRect(l),r=this.htmlMakerChSel.FindDivByClassName(this.parentName,this.propCssClassName());this.htmlMakerChSel.GetRect(r);const c=this.htmlMakerChSel.FindDivByClassName(this.parentName,this.listCssClassName()),h=this.htmlMakerChSel.GetRect(c);o.show(`${parseInt(h.left)-parseInt(a.left)+t*100+5}`,`${parseInt(h.top)-parseInt(a.top)+parseInt(h.height)+5}`)}disposeScorGrid(){this.scoreGrid!==null&&(this.scoreGrid.dispose(),this.scoreGrid=null),this.editingIndex=-1}findPropSelectedPos(){const e=this.htmlMakerChSel.FindDivByClassName(this.dlgContentCssClassName(),this.propCssClassName());if(e!==null&&e.className.startsWith(this.propCssClassName())){let t=-1;for(const s of this.formation.items)if(t++,s===this.selectedItem)return console.log(`pos=${t}`),t}return-1}setSelectedItem(e){const t=this.formation.items.find(s=>e===s.ch.idAttributeForHTML);t&&(this.selectedItem=t)}enableLazyImages(e){this.htmlMakerChSel.initObserver(this.dlgCssClassName(),e)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}propCssClassName(){return`${this.listName}-prop`}propItemCssClassName(){return`${this.listName}-prop-item`}lblCssClassName(){return`${this.listName}-lbl`}listCssClassName(){return`${this.listName}-list`}dlgContentCssClassName(){return`${this.parentName}-dlg-content`}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),i=this.propCssClassName(),n=this.propItemCssClassName();this.lblCssClassName();const o=parseInt(this.formation.uiInfo.left),l=parseInt(this.formation.uiInfo.top),a=100,r=document.createElement("style");r.textContent=`
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

${this.htmlMakerChSel.MakeDefaultGridColCss(i,a,5,a*5)}
${this.htmlMakerChSel.MakeDefaultItemJustifyCenterCss(n,a,30)}

${this.htmlMakerChSel.MakeDefaultToolButtonsCss()}
${this.htmlMakerChSel.MakeDefaultButtonsCss()}
`.trim(),document.head.appendChild(r);const c=document.getElementById(this.parentName);this.htmlMakerChSel.copyCssToInlineStyle(`.${this.parentName}`,c)}}class Qe{constructor(){this.cancel=!1}}class ms{constructor(){this.uiName="",this.cancel=!1}}class Se{constructor(){this.ch=new ie,this.isEmpty=!0,this.TextMap=""}static toJsonText(e){const t=ie.toJsonInst(e.ch);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new Se;t.ch=ie.toJsonInst(e.ch),t.isEmpty=e.isEmpty;const s=Object.fromEntries(e.details.TextMap);return t.TextMap=JSON.stringify(s,null,2),t}static fromJsonInst(e){const t=new Dt;t.ch=ie.fromJsonInst(e.ch),t.isEmpty=e.isEmpty;const s=new Map(Object.entries(JSON.parse(e.TextMap)));return t.details.TextMap=s,t}}class Q{static toJsonText(e,t){const s=Q.toJsonInst(e,t);return JSON.stringify(s,null,2)}static toJsonInst(e,t){const s=new Q;s.items=new Array,s.scsList=new Array;for(const i of e.items)s.items.push(Se.toJsonInst(i));for(const i of t)s.scsList.push(i);return s}static fromJsonInst(e){const t=new st;t.items=new Array;for(const s of e.items)t.items.push(Se.fromJsonInst(s));return t}}class Ht{constructor(e=0,t="",s=!0,i=0){this.ch=new ae,this.isEmpty=!0,this.score=0,this.allAvailable=!1,this.ch.id=e,this.ch.name=t,this.isEmpty=s,this.score=i}}class rt{Add(e){if(e===void 0){console.log("[VersusGroupRow::Add] scItem === undefined");return}this.columns===void 0&&(this.columns=[]),this.columns.push(e)}Count(){return this.columns.length}debug(){if(this.columns===void 0){console.log("[VersusGroupRow::debug] this.columns === undefined");return}for(const e of this.columns)console.log(`[${e.ch.name}]	score=[${e.score}]`)}}rt.defNumColumn=5;class ct{Add(e){this.groupRows===void 0&&(this.groupRows=[]),this.groupRows.push(e)}Count(){return this.groupRows.length}debug(){if(this.groupRows===void 0)console.log("this.groupRows === undefined");else for(const e of this.groupRows)e.debug()}async loadJson(e){const i=(await new $e().loadJson(e)).groupRows.map(o=>Object.assign(new rt,o)),n=new ct;return n.groupRows=i,n}}const _={None:"None",Player:"Player",Enemy:"Enemy"},G={None:"None",Attr:"Attr",Role:"Role"},It={HiLv:"HiLv"},U={Likely:"Likely",Uncertain:"Uncertain",Wishful:"Wishful"};class Je{}Je.Likely=.9;Je.Uncertain=.64;class it{constructor(){this.scoreItems=[],this.formationType=_.None,this.boost=0}get imgPrefix(){return this.formationType===_.Player?"ftPlayer":"ftEnemy"}get judgeWidth(){return 48}setScoreItems(e){if(e!==void 0){this.scoreItems=new Array;for(const t of e){const s=new Ht(t.ch.id,t.ch.name,t.isEmpty,t.score);this.scoreItems.push(s)}}}async toCharHTML(e,t){const s=t.isEmpty?e.demoMaterial:t.ch.iconFileName,i=t.ch.ns===H.None?"":t.ch.ns,n=await e.getImageUrlBy(s,i);let o=this.scoreToolTip(t);return o!==""&&(o=`title="${o}"`),`
<img class=${this.charCssClassName()}
  src="${n}"
  ${o}>
`.trim()}scoreToolTip(e){return e.isEmpty?"":`${e.ch.name}
score=${e.score}`}async toJudgeHTML(e,t){const s=this.toJudgeFileURL(e,t);return`<img class=${this.judgeCssClassName()} src="${s}" width="48">`}async toJudgeFileURL(e,t){let s=null;switch(t){case U.Likely:s=await e.getImageUrlBy("win.png",e.AnyNs);break;case U.Uncertain:s=await e.getImageUrlBy("even.png",e.AnyNs);break;case U.Wishful:s=await e.getImageUrlBy("lost.png",e.AnyNs);break;default:return""}return s}charCssClassName(){return"combat-char"}judgeCssClassName(){return"combat-judge"}get combatScore(){if(this.scoreItems===void 0)return 0;const e=this.scoreItems.reduce((s,i)=>i.isEmpty?s:s+i.score,0),t=this.boost===0?1:this.boost;return Math.ceil(e*t/100)}}class us{constructor(){this.hasCombo=!1,this.winRate=new Map}setPlayer(e){e.formationType=_.Player,this.player=e}setEnemy(e){e.formationType=_.Enemy,this.enemy=e}judge(e){const s=this.winRate.get(e);return s>=Je.Likely?U.Likely:s>=Je.Uncertain?U.Uncertain:U.Wishful}judgeForEnemy(e){switch(e){case U.Likely:return U.Wishful;case U.Uncertain:return U.Uncertain;case U.Wishful:return U.Likely}}}class ds{constructor(){this.combatPairs=new Map,this.emptyFile="plus.png",this.parentName="",this.uiInfo=new ge,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new b().SaveSetting(e)}}setPair(e,t){this.combatPairs.set(e,t)}calcCombatScore(){for(const[e,t]of this.combatPairs){if(t.player===void 0||t.enemy===void 0)continue;const s=[G.None,G.Attr,G.Role];for(const i of s){let n=t.player.combatScore,o=t.enemy.combatScore;t.winRate.set(i,o!==0?n/o:1)}}}async replaceChar(e,t,s,i,n){const o=this.combatPairs.get(e);let l;if(t===_.Player?l=o?.player:t===_.Enemy&&(l=o?.enemy),l===void 0)return!1;const a=s.itemID;if(a<0)return!1;const r=a-1;l=l;const h=`${l.imgPrefix}${a}`,d=l.scoreItems[r],u=d.ch;let p="";s.isEmpty?(u.id=0,u.name="",p=n.demoMaterial,console.log("[replaceChar] set empty")):(u.id=i.id,u.name=i.name,p=u.iconFileName,console.log(`[replaceChar] set char ${i.id}:${i.name}`)),d.isEmpty=s.isEmpty;const I=u.ns===H.None?"":u.ns,T=await n.getImageUrlBy(p,I);if(T===null)return!1;const x=new R,A=this.outerCssClassName();return x.ReplaceImg(A,h,T),x.ReplaceImgToolTip(A,h,l.scoreToolTip(d)),!0}async replaceJudge(e){async function t(n,o){const l=await n.toJudgeFileURL(e,o);if(l===null)return;const a=n.imgPrefix;for(let r=0;r<n.scoreItems.length;r++){const c=`${a}${r+1}`,h=s.FindImgsByID(i,c);if(h===null||h.length<=1){console.error("fail on judge marker");continue}const d=h[1];s.SetImgSrc(d,l),n.scoreItems[r].isEmpty?s.SetImgSize(d,0,0):s.SetImgSize(d,n.judgeWidth,n.judgeWidth);const u=n.scoreItems[r];s.ReplaceImgToolTip(i,c,n.scoreToolTip(u))}}const s=new R,i=this.outerCssClassName();for(const[n,o]of this.combatPairs){if(o.player===void 0||o.enemy===void 0)continue;const l=[G.None,G.Attr,G.Role];for(const a of l){if(a!==G.None)continue;const r=o.judge(a),c=o.judgeForEnemy(r);await t(o.player,r),await t(o.enemy,c)}}}async toHTML(e,t){const s=document.createElement("table");s.id=e;const i=document.createElement("tbody");s?.appendChild(i);async function n(l,a){const r=document.createElement("tr");i?.appendChild(r);const c=await a.toJudgeHTML(t,l),h=a.imgPrefix;let d=0;for(const u of a.scoreItems){d++;const p=await a.toCharHTML(t,u),I=`
<div class=${o} item-id="${h}${d}">
    ${p}
    ${c}
</div>
`.trim(),T=document.createElement("td");T.innerHTML=I,r.appendChild(T)}}const o=this.outerCssClassName();for(const[l,a]of this.combatPairs){const r=a.judge(G.None),c=a.judgeForEnemy(r);await n(r,a.player),await n(c,a.enemy)}return s.outerHTML}createCombatBox(e,t,s){this.parentName=t,this.htmlMaker=new R;const i=`<div class="${this.parentName}-dlg-content">
    ${s}
</div>`,n=new j;n.title="<"+e+">";const o=n.NewDialog(t,this.dlgCssClassName());return n.SetContent(t,i),this.applyCss(),n.EnableEventHandlers(),n.onMoveDone=this.moverOnMoveDone,o}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}processResult(e,t,s){async function i(o,l){const a=t(l.formationType),r=await l.toJudgeHTML(e,o),c=l.imgPrefix;let h=0;for(const d of l.scoreItems){h++;const u=await l.toCharHTML(e,d),p=`
<div class=${n} item-id="${c}${h}">
    ${u}
    ${r}
</div>
`.trim();s(a,p)}}const n=this.outerCssClassName();for(const[o,l]of this.combatPairs){const a=l.judge(G.None),r=l.judgeForEnemy(a);i(a,l.player),i(r,l.enemy)}}outerCssClassName(){return"combat-outer"}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const e=new it,t=`.${this.outerCssClassName()}`,s=`.${e.charCssClassName()}`,i=`.${e.judgeCssClassName()}`,n=parseInt(this.uiInfo.left),o=parseInt(this.uiInfo.top),l=document.createElement("style");l.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,n,o)}
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
${t} ${i} {
  position: absolute;
  width: 48px;
  height: 48px;
  right: 0;
  bottom: 0;
}
`.trim(),document.head.appendChild(l);const a=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,a)}}const we={Unknown:"Unknown",Success:"Success",Fail:"Fail",Cancel:"Cancel"};async function Tt(m){const e=m.isWebRunning,t=m.currentUserHome,s=m.chStatusListFile,i=m.chListFile,n=new Kt,o=new R,l="splash-screen";o.initFullScreen(l,"エボナ データベース初期化中..."),o.applyFullScreenCss(l);const a=o.getFullScreenMsgElem(l),r=a!==null?a.innerHTML:"";if(t===m.user1Home){const f=[{ns:H.CnsRed,nsName:"赤属性"},{ns:H.CnsBlue,nsName:"青属性"},{ns:H.CnsGreen,nsName:"緑属性"},{ns:H.CnsYellow,nsName:"黄属性"},{ns:H.CnsViolet,nsName:"紫属性"}],v=await new Te().LoadList(i);for(const C of f)a!==null&&(a.innerHTML=`${r} ${C.nsName}`),await n.setupNs(C.ns,m,v)}if(t===m.user2Home){const f=[{ns:H.CnsBlue,nsName:"藍属性"},{ns:H.CnsRed,nsName:"紅属性"},{ns:H.CnsGreen,nsName:"翠属性"},{ns:H.CnsYellow,nsName:"黄属性"},{ns:H.CnsWhite,nsName:"天属性"},{ns:H.CnsBlack,nsName:"冥属性"}],v=await new Te().LoadList(i);for(const C of f)a!==null&&(a.innerHTML=`${r} ${C.nsName}`),await n.setupNs(C.ns,m,v)}a!==null&&(a.innerHTML="UI 初期化中 ...");const c=new Ge,h=new qe;await h.loadDB(s);const d=await h.loadAuxScoreSet(m.gameType);async function u(){async function f(){return await new Te().LoadList(i)}const g=await f();g.uiInfo.name="charListArea",g.uiInfo.left="300",g.uiInfo.top="100";const v=g.uiInfo.name,C=await g.toHTML(n);if(e){const y="キャラ選択",$=g.createSelectorBox(y,v,C);g.addEventHandlers($),g.addItemEventHandlers(),g.enableLazyImages(n),$.show();const S=new X;S.setAsDlg($,y),c.add(S)}return g}const p=await u();async function I(){const f=new rs;await f.load(),f.uiInfo.name="CharSummary",f.uiInfo.left="400",f.uiInfo.top="100";const g=f.uiInfo.name,v=await f.toHTML();if(e){const C="キャラ一覧",y=f.createSummaryBox(C,g,v);await f.updateCharInfos(n),f.addEventHandlers(y,async S=>{S.selectCh=p.selectedCh;const P=await n.getImageUrlBy(p.selectedCh.iconFileName,p.selectedCh.ns);if(P===null)S.selectedImg="",S.cancel=!0;else{S.selectedImg=P,S.cancel=!1;const B=await h.getStatus(p.selectedCh.idAsText);console.log(B),S.scoreSet=B,S.scoreSet.items=S.scoreSet.items.concat(d.items)}console.log(`selected ch = ${S.selectCh.name}`)}),f.addItemEventHandlers(),f.enableLazyImages(n),y.show();const $=new X;$.setAsDlg(y,C),c.add($)}return f}const T=await I();async function x(f,g,v,C){const y=new hs;f===A&&(y.InitForPlayer(T),y.autoForm=!0,y.editFormEnable=!1,y.saveEnable=!1,y.imgLoader=n),f===J&&(y.InitForEnemy(h),y.SetAuxScoreSet(d),y.autoForm=!1,y.editFormEnable=!0,y.saveEnable=!0),y.formation.uiInfo.name=f,y.formation.uiInfo.left=`${g}`,y.formation.uiInfo.top=`${v}`;const $=y.formation.uiInfo.name,S=await y.toHTML($),P=f===J?y.toGridHTML():"";if(e){const B=y.createFormationBox(C,$,S,P);y.addEventHandlers(B),y.addItemEventkHandlers(async E=>{let D="",We="";E.selectedImg===""?(D=p.selectedCh.iconFileName,We=p.selectedCh.ns,E.selectCh=p.selectedCh):(D=E.item.ch.iconFileName,We=E.item.ch.ns,E.selectCh=E.item.ch);const bt=await n.getImageUrlBy(D,We);bt!==null&&(E.selectedImg=bt,E.item.isEmpty=!1,Ct(E.uiName,E.item,E.selectCh))},async E=>{const D=await n.getImageUrlBy(E.selectedImg,p.selectedCh.ns);D!==null&&(E.selectedImg=D,E.item.isEmpty=!0,Ct(E.uiName,E.item,E.selectCh))},async E=>{console.log(`selected ch = ${E.item.ch.name}`);const D=new At;D.selectCh=E.item.ch,D.selectedImg=E.selectedImg,D.scoreSet=E.scoreSet,T.charStock(D)},async E=>{const D=yt();console.log(D),await D.replaceJudge(n)}),y.enableLazyImages(n),B.show();const ye=new X;ye.setAsDlg(B,C),c.add(ye)}return y}const A="playerForm",J="enemyForm",Ee=await x(A,100,100,"自編成"),xe=await x(J,100,200,"敵編成");async function Pt(f,g,v,C){q.uiInfo.name=f,q.uiInfo.left=`${g}`,q.uiInfo.top=`${v}`;const y=await q.toHTML("combatTable",n),$=q.createCombatBox(C,f,y);q.enableLazyImages(n),await q.replaceJudge(n),$.show();const S=new X;S.setAsDlg($,C),c.add(S)}const q=yt();await Pt("combatForm",120,300,"対戦予想");const ht="保存";{const f=new X;f.setAsMenu(ht),c.add(f)}const mt="復帰";{const f=new X;f.setAsMenu(mt),c.add(f)}let Me=null;const Ot=await c.toHTML("dockForm",n);if(e){const f=c.createDockBox("dockForm",Ot);c.addItemClickHandlers(async g=>{c.stdApplyAction(g)!==!1&&g.item.isMenuType&&(g.item.toolTip===ht&&await Ut(),g.item.toolTip===mt&&await zt(async C=>{if(console.log(`[loadedResult] ${C}`),C!==we.Success)return;const y=Q.fromJsonInst(ve),$=Q.fromJsonInst(Le);ve=null,Le=null,await Ee.Setup(y,n),await xe.Setup($,n)}))}),c.enableLazyImages(n),f.show(),Me=f}const ut="playerForm.json",dt="enemyForm.json",pt="dockForm.json";async function Ut(){c.InitZOrder(Z);const f=Q.toJsonText(Ee.formation,Ee.scsList),g=Q.toJsonText(xe.formation,xe.scsList),v=Ve.toJsonText(c),C=new window.JSZip;C.file(ut,f),C.file(dt,g),C.file(pt,v);const y=await C.generateAsync({type:"blob"}),$="gameConfig.zip",S=URL.createObjectURL(y),P=document.createElement("a");P.href=S,P.download=$,P.click(),URL.revokeObjectURL(S),console.log("saved!")}let ft=null,ve=null,Le=null;async function zt(f){const g=document.createElement("input");return g.type="file",g.accept=".zip",g.addEventListener("cancel",()=>(console.log("Cancelled."),we.Cancel)),g.addEventListener("change",async()=>{if(g.files.length==1){console.log("File selected: ",g.files[0].name);const C=await g.files[0].arrayBuffer(),$=await new window.JSZip().loadAsync(C);async function S(B){const ye=$.file(B);if(ye){const E=await ye.async("string"),D=JSON.parse(E);return console.log(D),D}}{const B=await S(pt);B&&(ft=B)}{const B=await S(ut);B&&(ve=B)}{const B=await S(dt);B&&(Le=B)}const P=ft!==null&&ve!==null&&Le!==null?we.Success:we.Fail;f(P)}}),g.click(),we.Unknown}const Z=new b;e&&(Z.AddDialogs(),Z.AssignIndexies(),await Z.LoadAllSetting(),await Z.loadSetting(Me),c.InitZOrder(Z),await Z.ForEachAsync(f=>{const g=j.FindDialogParent(f);return g!==null&&(m.isLocal||f==="charListArea"?g.hidden=!1:g.hidden=m.evonaType!==W.Full),!0}),Me!==null&&(Me.parentElement.hidden=!m.isLocal)),o.hideFullScreenCss(l);function gt(f){const g=new ct,v=new rt,C=f.formation;C.uiInfo.name,C.uiInfo.name,f.scsList===void 0&&console.log(`[${f.formation.uiInfo.name}] 対戦予想結果の作成は工事中です`);let y=0;for(const $ of C.items){if(f.scsList===void 0)continue;const S=f.scsList[y];y++;const P=Math.ceil(S.stdScore),B=new Ht($.ch.id,$.ch.name,$.isEmpty,P);B.allAvailable=S.allAvailable,v.Add(B)}return g.Add(v),g.debug(),g}function yt(){const f=new ds,g=gt(Ee),v=gt(xe),C=new it;C.setScoreItems(g.groupRows[0].columns),C.boost=100;const y=new it;y.setScoreItems(v.groupRows[0].columns),y.boost=100;const $=new us;$.setPlayer(C),$.setEnemy(y),f.setPair(It.HiLv,$),f.calcCombatScore();for(const[S,P]of f.combatPairs){const B=P.judge(G.None);console.log(`judge=[${B}]`)}return f}async function Ct(f,g,v){const C=It.HiLv;q.combatPairs.get(C),f===A&&await q.replaceChar(C,_.Player,g,v,n),f===J&&await q.replaceChar(C,_.Enemy,g,v,n),await q.replaceJudge(n)}}async function ps(m){if(!m.isWebRunning)return;const e=m.isWebRunning;console.log(`mode=${m.edit}`);const t=new Ge;async function s(){const d=re.Resource,u=new Nt;u.init(),await u.load(d,z.none),u.uiInfo.name="ResourceEdit",u.uiInfo.left="110",u.uiInfo.top="10";const p=u.uiInfo.name,I=await u.toHTML(u.makeResEditItems(),u.makeResLog);if(e){const T=document.createElement("div");T.id=u.uiInfo.name,T.className=u.uiInfo.name,document.body.appendChild(T);const x="文字列リソース",A=u.createEditorBox(x,p,I);u.addEventHandlers(A),u.addItemEventHandlers(),A.show(),u.enableResize();const J=new X;J.setAsDlg(A,x),t.add(J)}return u}async function i(){const d=re.ScoreUI,u=new Nt;u.init(),await u.load(d,m.edit),u.uiInfo.name="ScoreEdit",u.uiInfo.left="110",u.uiInfo.top="100";const p=u.uiInfo.name,I=await u.toHTML(u.makeScoreEditItems(),u.makeScoreLog);if(e){const T=document.createElement("div");T.id=u.uiInfo.name,T.className=u.uiInfo.name,document.body.appendChild(T);const x="スコア設定",A=u.createEditorBox(x,p,I);u.addEventHandlers(A),u.addItemEventHandlers(),A.show(),u.enableResize();const J=new X;J.setAsDlg(A,x),t.add(J)}return u}(await s()).startAutoSave(),(await i()).startAutoSave();const l=document.createElement("div"),a="dockEdit";l.id=a,l.className=a,document.body.appendChild(l);let r=null;const c=await t.toHTML(a,null);if(e){const d=t.createDockBox(a,c);t.addItemClickHandlers(async u=>{t.stdApplyAction(u)}),d.show(),r=d}const h=new b;e&&(h.AddDialogs(),h.AssignIndexies(),await h.LoadAllSetting(),await h.loadSetting(r),t.InitZOrder(h),await h.ForEachAsync(d=>{const u=j.FindDialogParent(d);return u!==null&&(m.isLocal||d==="charListArea"?u.hidden=!1:u.hidden=!0),!0}),r!==null&&(r.parentElement.hidden=!m.isLocal))}const L=new $e,Ft=L.isWebRunning;Ft?(gs(),L.parseURLParams(),L.currentUserHome===""&&L.setUser(L.user1Home)):L.setUser(L.user2Home);const je=window.EVONA_CONFIG.isLocal;L.setPath();O.encodeEnable=!je;L.setImageHome(je);const fs=ys(je);L.currentUserHome;L.statusJsonPath;L.zipPrefix;L.chListFile;L.chStatusListFile;switch(L.admin){case!0:await jt(L);break;case!1:if(Ft)if(L.edit===z.none){let m=!1,e=!1;const t=new de;t.CheckVisible=!0,t.CheckText="位置情報を初期化",t.SecretEnable=!0;const s=L.setBrowserTitle();await t.showWait(`「${s} 」モードで起動します`)===N.Secret&&(e=!0),m=t.Checked;let n=W.None;if(je)n=W.Full;else if(n=W.NotRun,e){let o="";t.CheckVisible=!1,t.SecretEnable=!1,t.AuthVisible=!0,t.onAuthChecking=d=>(o=d,!0),await t.showWait("認証コードを入力してください");const l=new Date,a=("0"+(l.getMonth()+1)).slice(-2),r=("0"+l.getDate()).slice(-2),h=Math.random()>.5?`${a}${r}`:`${r}${a}`;o===h?(console.log("auth success"),n=W.Full):console.log("auth fail")}else fs&&(n=W.Limit);switch(m&&(await(await Jt()).clear(),await(await le()).clear()),L.evonaType=n,n){case W.Full:window.EVONA_CONFIG.demo=!1,await Tt(L);break;case W.Limit:window.EVONA_CONFIG.demo=!0,await Tt(L);break}}else L.setBrowserTitle(),await ps(L);break}function gs(){const m=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname.startsWith("192.168."),e=m?"./jszip_dist/jszip.min.js":"https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js",t=m?"./jsstore_dist/jsstore.min.js":"https://cdn.jsdelivr.net/npm/jsstore/dist/jsstore.min.js";window.EVONA_CONFIG={isLocal:m,workerFile:"./jsstore_dist/jsstore.worker.min.js",demo:!m};function s(i,n=!1){const o=document.createElement("script");o.src=i,n&&(o.type="module"),o.async=!1,document.head.appendChild(o)}s(e),s(t)}function ys(m){if(m)return!0;const e=document.referrer;console.log(`${e}`);const t="evona_auth",s="granted";return sessionStorage.getItem(t)===s?!0:e.includes("qiita.com")?(sessionStorage.setItem(t,s),!0):!1}

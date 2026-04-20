(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const V={none:"none",classPq:"pq",classMM:"mm"},b={pqStatusHP:"pqStatusHP",pqStatusATK:"pqStatusATK",pqStatusREC:"pqStatusREC",pqTokkunHP:"pqTokkunHP",pqTokkunATK:"pqTokkunATK",pqTokkunREC:"pqTokkunREC",pqTokuSp1:"pqTokuSp1",pqTokuSp2:"pqTokuSp2",mmAbilitySTR:"mmAbilitySTR",mmStatusFGT:"mmStatusFGT",mmStatusATK:"mmStatusATK",mmStatusPDF:"mmStatusPDF",mmStatusACC:"mmStatusACC",mmStatusEVA:"mmStatusEVA",mmStatusCRI:"mmStatusCRI",mmStatusMDF:"mmStatusMDF",mmStatusHP:"mmStatusHP",mmStatusCRD:"mmStatusCRD",mmStatusDEF:"mmStatusDEF",mmStatusSPD:"mmStatusSPD",mmAbilityDEX:"mmAbilityDEX",mmAbilityMGC:"mmAbilityMGC",mmAbilityDUR:"mmAbilityDUR",mmRole:"mmRole"},D={None:"None",CnsRed:"CnsRed",CnsBlue:"CnsBlue",CnsGreen:"CnsGreen",CnsYellow:"CnsYellow",CnsViolet:"CnsViolet",CnsWhite:"CnsWhite",CnsBlack:"CnsBlack"},Me={RlAttacker:"RlAttacker",RlHealer:"RlHealer",RlDebuffer:"RlDebuffer",RlBuffer:"RlBuffer"};class ke{constructor(){this.imageRepository="https://puyon7676.github.io/GameImages/",this.imageHome="./Image/",this.user1Home="./User1/",this.user2Home="./User2/",this.currentUserHome="",this.isLocal=!1,this.admin=!1,this.cmd="",this.edit=V.none,this.dataBasePath="../キャラパースデータ",this.statusJsonPath="",this.zipPrefix="",this.chListFile="",this.chStatusListFile="",this.charStatusZip="./CharStatus.zip",this.nodeToolsImportFilename="./nodeTools.js"}setImageHome(e){if(this.isLocal=e,e)this.imageHome=`${this.currentUserHome}Image/`;else{let t=this.currentUserHome;this.currentUserHome.substring(0,2)==="./"&&(t=this.currentUserHome.substring(2)),this.imageHome=`${this.imageRepository}${t}`}console.log(`imageHome=[${this.imageHome}]`)}setUser(e){this.currentUserHome=e}setPath(){this.currentUserHome===this.user1Home&&(this.statusJsonPath=`${this.dataBasePath}/ぷよクエ_詳細JSON`,this.zipPrefix="puyoQue_",this.chListFile=`${this.currentUserHome}chListFile_puyo.json`,this.chStatusListFile=`${this.currentUserHome}puyoQue_CharStatus.zip`),this.currentUserHome===this.user2Home&&(this.statusJsonPath=`${this.dataBasePath}/メメントモリ_詳細JSON`,this.zipPrefix="memeMori_",this.chListFile=`${this.currentUserHome}chListFile_meme.json`,this.chStatusListFile=`${this.currentUserHome}memeMori_CharStatus.zip`)}get gameType(){return this.currentUserHome===this.user1Home,V.classPq}get gameTitle(){return this.edit!==V.none?`エディタ(${this.edit})`:this.gameType===V.classPq?"ぷよクエ":"メメントモリ"}setBrowserTitle(){const e=this.gameTitle;document.head.title=e;for(const t of document.head.children)t.nodeName==="TITLE"&&(t.innerHTML=`EvoNa：${e} モード`);return e}get isWebRunning(){return!(typeof document>"u")}parseURLParams(){if(!this.isWebRunning){console.log("cannot parse URL params!");return}const e=new URLSearchParams(window.location.search);for(const[t,s]of e)switch(t.trim()){case"user":const n=s.trim();this.setUser(n==="1"?this.user1Home:this.user2Home);break;case"debug":break;case"admin":this.admin=s.trim()==="true";break;case"cmd":this.cmd=s;break;case"edit":this.edit=s.trim()===V.classMM?V.classMM:V.classPq;break}}async loadJson(e){return console.log(`[loadJson] file=[${e}]`),await this._loadJson(e)}async _loadJson(e){if(this.isWebRunning){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`HTTPエラー! ステータス: ${t.status}`);return await t.json()}else{const{loadJsonNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async saveJson(e,t){const s=JSON.stringify(t);if(this.isWebRunning){const n=new Blob([s],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=e,o.click()}else{const{saveJsonNode:n}=await import(this.nodeToolsImportFilename);return n(e,t)}}async loadBinFile(e){if(this.isWebRunning)return await(await fetch(e)).blob();{const{readBinNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async getDoc(e){let t,s;if(this.isWebRunning)t=new DOMParser,s=t.parseFromString(e,"text/html");else{const{createHtmlParserNode:n}=await import(this.nodeToolsImportFilename);t=n(e),s=t.parseFromString(e,"text/html")}return s}}const I={None:"None",Ok:"Ok",OkCancel:"OkCancel",YesNo:"YesNo",YesNoCancel:"YesNoCancel"},ge={None:"None",Ok:"Ok",Question:"Question"},N={None:"None",Ok:"Ok",Cancel:"Cancel",Yes:"Yes",No:"No",Secret:"Secret"};class me{constructor(){this.parentName="evona-msg-box",this.buttonType=I.Ok,this.iconType=ge.None,this.title="Confirm",this.btnS="",this.SecretEnable=!1,this.btnOk="OK",this.btnCancel="Cancel",this.btnYes="Yes",this.btnNo="No",this.CheckVisible=!1,this.CheckText="",this.Checked=!1,this.Result=N.None,this.onS1Clicked=e=>{this.Result=N.Secret,this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB1Clicked=e=>{switch(this.buttonType){case I.None:this.Result=N.None;break;case I.Ok:this.Result=N.Ok;break;case I.OkCancel:this.Result=N.Ok;break;case I.YesNo:this.Result=N.Yes;break;case I.YesNoCancel:this.Result=N.Yes;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB2Clicked=e=>{switch(this.buttonType){case I.None:this.Result=N.None;break;case I.Ok:this.Result=N.None;break;case I.OkCancel:this.Result=N.Cancel;break;case I.YesNo:this.Result=N.No;break;case I.YesNoCancel:this.Result=N.No;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB3Clicked=e=>{switch(this.buttonType){case I.None:this.Result=N.None;break;case I.Ok:this.Result=N.None;break;case I.OkCancel:this.Result=N.Cancel;break;case I.YesNo:this.Result=N.No;break;case I.YesNoCancel:this.Result=N.Cancel;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)}}get btnNameS(){return`${this.parentName}-s1`}get btnName1(){return`${this.parentName}-b1`}get btnName2(){return`${this.parentName}-b2`}get btnName3(){return`${this.parentName}-b3`}get chkName1(){return`${this.parentName}-chk1`}setParent(e){this.parentName=`${e}-msg-box`}setTypes(e,t){this.buttonType=e,this.iconType=t}setOk(e=ge.Ok){this.setTypes(I.Ok,e)}setOkCancel(e=ge.Question){this.setTypes(I.OkCancel,e)}setYesNo(e=ge.Question){this.setTypes(I.YesNo,e)}setYesNoCancel(e=ge.Question){this.setTypes(I.YesNoCancel,e)}async showWait(e,t=null){return this.remove(),this.createUI(e,t===null?this.title:t,!0),new Promise(s=>{this.resolver=s;let n=!1,i=!1,o=!1;switch(this.buttonType){case I.None:break;case I.Ok:n=!0,i=!1,o=!1;break;case I.OkCancel:n=!0,i=!0,o=!1;break;case I.YesNo:n=!0,i=!0,o=!1;break;case I.YesNoCancel:n=!0,i=!0,o=!0;break}n&&document.getElementById(this.btnName1)?.addEventListener("click",this.onB1Clicked,{once:!0}),i&&document.getElementById(this.btnName2)?.addEventListener("click",this.onB2Clicked,{once:!0}),o&&document.getElementById(this.btnName3)?.addEventListener("click",this.onB3Clicked,{once:!0}),this.SecretEnable&&document.getElementById(this.btnNameS)?.addEventListener("click",this.onS1Clicked,{once:!0})})}showNoWait(e,t="INFO"){this.remove(),this.createUI(e,t,!1)}showNoWaitEnd(){this.remove()}createUI(e,t,s){let n=`<button id="${this.btnNameS}" class="${this.btnNameS}">${this.btnS}</button>`,i="",o="",l="";switch(this.buttonType){case I.None:break;case I.Ok:i=`<button id="${this.btnName1}">${this.btnOk}</button>`,o="";break;case I.OkCancel:i=`<button id="${this.btnName1}">${this.btnOk}</button>`,o=`<button id="${this.btnName2}">${this.btnCancel}</button>`;break;case I.YesNo:i=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`;break;case I.YesNoCancel:i=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`,l=`<button id="${this.btnName3}">${this.btnCancel}</button>`;break}let a="";this.CheckVisible&&(a=`
<div style="padding: 5px 10px; font-size: 0.9em; text-align: left;">
    <label>
        <input type="checkbox" id="${this.chkName1}">${this.CheckText}
    </label>
</div>
`.trim());const r=`${a}${i}${o}${l}`,c=r!==""?`<div class="msg-footer">${r}</div>`:"",h=document.createElement("div");h.id=this.parentName,h.innerHTML=`
            <div class="msg-overlay">
                <div class="msg-panel">
                    <div class="msg-header">${t}${n}</div>
                    <div class="msg-body">${e}</div>
                    ${c}
                </div>
            </div>
        `.trim(),this.applyCss(),document.body.appendChild(h)}applyCss(){const e=`${this.parentName}-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
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
            `.trim(),document.head.appendChild(t)}setCheckResult(){const e=document.getElementById(this.chkName1);if(e!==null){const t=e.checked;console.log(`[setCheckResult] ${t}`),this.Checked=t}}remove(){document.getElementById(this.btnName1)?.removeEventListener("click",this.onB1Clicked),document.getElementById(this.btnName2)?.removeEventListener("click",this.onB2Clicked),document.getElementById(this.btnName3)?.removeEventListener("click",this.onB3Clicked),document.getElementById(this.btnNameS)?.removeEventListener("click",this.onS1Clicked),document.getElementById(this.parentName)?.remove()}}class bt{constructor(){this.tblNameCharImages="CharImages",this.tblCharImages={name:this.tblNameCharImages,columns:{ns:{dataType:"string",index:!0},name:{dataType:"string"},fileName:{dataType:"string",index:!0},fileData:{dataType:"object"}}},this.tblNameSettings="Settings",this.tblSettings={name:this.tblNameSettings,columns:{key:{dataType:"string",primaryKey:!0},value:{dataType:"string"}}},this.tblNameActionLog="ActionLog",this.tblActionLog={name:this.tblNameActionLog,columns:{id:{primaryKey:!0,autoIncrement:!0},logType:{dataType:"string"},log:{dataType:"string"}}},this.dbName="EvonaDB",this.db={name:this.dbName,tables:[this.tblCharImages,this.tblSettings,this.tblActionLog]}}async connect(e){console.log("Waiting for JsStore library...");let t=0;for(;typeof window.JsStore>"u";){if(t>50)throw new Error("JsStore library load timeout. Check script tag order.");await new Promise(n=>setTimeout(n,100)),t++}const s=window.JsStore;this.connection=new s.Connection(new Worker(e)),console.log("connection started with library version:",s.VERSION)}async term(){await this.connection.terminate(),console.log("connection terminated")}async initDb(){const e=await this.connection.initDb(this.db);return console.log(e?"Db Created & connection is opened":"Db connection is opened"),e}async dropDb(){let e=!1;return await this.connection.dropDb().then(function(){console.log("Db deleted successfully"),e=!0}).catch(function(){console.error("dropDb error")}),e}async deleteAllRecords(e){return await this.existsTable(e)===!1?(console.log(`[${e}] not exist`),!1):(await this.connection.clear(e),console.log(`[${e}] all record deleted successfully`),!0)}async existsTable(e){try{const t=await this.connection.count({from:e});return!0}catch(t){console.log("[existsTable] JsStore Select Error:",t)}return!1}get defWorkerFile(){return window.EVONA_CONFIG.workerFile}async setup(){return await this.connect(this.defWorkerFile),await this.initDb()}sortByIdAscAsNum(e){e&&e.sort((t,s)=>Number(t.id)-Number(s.id))}}class ft extends bt{async insert(e,t){await this.connection.insert({into:this.tblNameSettings,values:[{key:e,value:t}],upsert:!0})}async insertMultiple(e){const t=e.map(s=>({key:s.key,value:s.value}));return await this.connection.insert({into:this.tblNameSettings,values:t,upsert:!0})}async selectKey(e){try{var t=await this.connection.select({from:this.tblNameSettings,where:{key:e}});return t.length>=1?t[0].value:null}catch(s){console.error("[selectKey] JsStore Select Error:",s)}return null}async countKey(e){try{return await this.connection.count({from:this.tblNameSettings,where:{key:e}})}catch(t){console.error("[countKey] JsStore Select Error:",t)}return-1}async clear(){await this.deleteAllRecords(this.tblNameSettings)}}class wt{constructor(){this.table=new ft}async init(){const e=new ft;await e.setup(),this.table=e}async saveDialogPos(e){const t=e.parentElement,s=`${t?.className},${t?.style.left},${t?.style.top}`;await this.table.insert(e.className,`${s}`)}async loadDialogPos(e){const t=e.parentElement,s=await this.table.selectKey(e.className);if(s!==null){const n=s.split(",");n.length===3&&t!==null&&n[0]===t.className&&(t.style.left=n[1],t.style.top=n[2])}}async clear(){this.table.clear()}}class Ye extends bt{async insert(e,t){await this.connection.insert({into:this.tblNameActionLog,values:[{logType:e,log:t}]})}async insertMultiple(e){const t=e.map(s=>({logType:s.logType,log:s.log}));return await this.connection.insert({into:this.tblNameActionLog,values:t})}async selectType(e){try{var t=await this.connection.select({from:this.tblNameActionLog,where:{logType:e},order:{by:"id",type:"asc"}});return this.sortByIdAscAsNum(t),t.length>=1?t:null}catch(s){console.error("[selectType] JsStore Select Error:",s)}return null}async countType(e){try{return await this.connection.count({from:this.tblNameActionLog,where:{logType:e}})}catch(t){console.error("[countType] JsStore Select Error:",t)}return-1}async clear(){await this.deleteAllRecords(this.tblNameActionLog)}}class Pt{constructor(){this.table=new Ye}async init(){const e=new Ye;await e.connect(e.defWorkerFile),await e.initDb(),this.table=e}async clear(){this.table.clear()}async put(e,t){return await this.table.insert(e,t)}async get(e){const t=await this.table.selectType(e);if(t===null)return null;const s=new Array;for(const n of t)s.push({id:n.id,log:n.log});return s}}const ue={CharSummaryAction:"CharSummaryAction",ResourceEditAction:"ResourceEditAction",ScoreEditAction:"ScoreEditAction"};let ve=null;async function Ut(){return ve||(ve=new wt,await ve.init(),console.log("SettingAccess instance created (Singleton)")),ve}let Le=null;async function ie(){return Le||(Le=new Pt,await Le.init(),console.log("LogAccess instance created (Singleton)")),Le}function Ot(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,m=>{const e=Math.random()*16|0;return(m==="x"?e:e&3|8).toString(16)})}function zt(){const m=Date.now().toString(16),e=Ot();return`${m}-${e}`}async function Vt(m){const e=m.cmd.split(":");let t=!1;switch(e[0]){case"drop":t=Jt();break;case"ref":t=document.referrer;break}const s=`[${m.cmd}] res=${t}`;alert(s)}async function Jt(){const m=new Ye;return await m.setup(),await m.dropDb()}const ae={plus:"plus.png",win:"win.png",even:"even.png",lost:"lost.png",demo:"demo.png"};class Gt{constructor(){this.imageHome="",this.cache=new Map,this.cacheNs=new Map,this.zip=null,this.zipNs=new Map,this.isMultiZip=!1,this.materials=[{ns:"",fileName:ae.plus},{ns:"",fileName:ae.win},{ns:"",fileName:ae.even},{ns:"",fileName:ae.lost},{ns:"",fileName:ae.demo}],this.AnyNs=""}get demoMaterial(){return ae.demo}async setupNs(e,t,s){const n=s.findByNs(e);if(n!==void 0){this.imageHome=t.imageHome;for(const i of n){const o=i.iconFileName,l=`${this.imageHome}${e}/${o}`;this.cache.set(o,l),this.cacheNs.set(o,e)}this.isMultiZip=!0;for(const i of this.materials){const o=i.fileName,l=`${this.imageHome}${o}`;this.cache.set(o,l),this.cacheNs.set(o,e)}}}async checkExists(e){try{return(await fetch(e,{method:"HEAD"})).ok}catch{return!1}}isMaterial(e){return this.materials.find(s=>s.fileName.includes(e))!==void 0}get loaded(){return this.isMultiZip?this.zipNs.size!==0:this.zip!==null}async _loadZipBy(e,t){const s=new ke;this.imageHome=s.imageHome.substring(2);const n=await s.loadBinFile(e);let i=null;if(s.isWebRunning)i=await window.JSZip.loadAsync(n);else{const{loadZipNode:o}=await import(s.nodeToolsImportFilename);i=await o(n)}this.zipNs.set(t,i),this.isMultiZip=!0}async getImageUrlBy(e,t){if(this.isMaterial(e))return`${this.imageHome}${e}`;if(this.cache.has(e)){const n=this.cache.get(e);if(!await this.checkExists(n)){const o=`${this.imageHome}notexist.png`;this.cache.set(e,o)}return this.cache.get(e)}return null}async findNs(e){if(!this.isMultiZip)return null;if(this.cacheNs.has(e)){const t=this.cacheNs.get(e);if(t!==void 0)return t}return null}dispose(){for(const e of this.cache.values())URL.revokeObjectURL(e);this.cache.clear()}}class ye{constructor(){this.parentElem=null,this.cancel=!1,this.targetId="",this.classify="",this.selectedValue="",this.Keydown="",this.KeyEnter=re.None}}class we{constructor(){this.callerName="",this.result=""}}class Xe{constructor(){this.parentElem=null,this.left="",this.top="",this.width="",this.height=""}}const Re={Enter:"Enter",Escape:"Escape",Tab:"Tab",Process:"Process"},re={None:"None",Normal:"Normal",Special:"Special"},E={Btn:"Btn",Img:"Img",Label:"Label",LabelRO:"LabelRO",Combo:"Combo",Input:"Input",Plain:"Plain",Table:"Table"};class ce{static get borderShadowText(){return`
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3); /* ほんのり黒い影 */
border-radius: 4px; /* 角を少し丸くすると、影と馴染みます（任意） */
`.trim()}static scrollBarText(e="16px"){return`
&::-webkit-scrollbar { width: ${e}; }
&::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
&::-webkit-scrollbar-thumb { background: #eeee52; border-radius: 10px; }
&::-webkit-scrollbar-thumb:hover { background: #fbc02d; }
`.trim()}}class tt{constructor(){this.imgSrc="",this.imgFile="",this.alt=""}}class st{constructor(){this.selectedItem="",this.selectionPair=[],this.classify=""}}class Z{constructor(){this.type="text",this.value="",this.placeholder=""}}class Nt{constructor(){this.typeInfo=new It,this.className=""}ToHTML(){let e="";switch(this.typeInfo.using.itemType){case E.Btn:e=this.typeInfo.ToButtonHTML(this.className);break;case E.Label:e=this.typeInfo.ToLableHTML(this.className);break;case E.LabelRO:e=this.typeInfo.ToLableROHTML(this.className);break;case E.Combo:e=this.typeInfo.ToComboHTML(this.className);break;case E.Input:e=this.typeInfo.ToInputHTML(this.className);break;case E.Img:e=this.typeInfo.ToImgHTML(this.className,this.typeInfo.using.img.alt);break;case E.Plain:e=this.typeInfo.using.innerHTML;break}return e}copyTo(e){e.className=this.className,e.typeInfo.toolTip=this.typeInfo.toolTip,e.typeInfo.using.itemType=this.typeInfo.using.itemType,e.typeInfo.using.label=this.typeInfo.using.label,e.typeInfo.using.combo=this.typeInfo.using.combo,e.typeInfo.using.input=this.typeInfo.using.input,e.typeInfo.using.innerHTML=this.typeInfo.using.innerHTML,e.typeInfo.using.img=this.typeInfo.using.img}}class Fe{constructor(){this.items=new Array}makeItems(e=1){this.items.length>0&&this.items.splice(0,this.items.length);for(let t=0;t<e;t++){const s=new Nt;this.items.push(s)}}ToHTML(){let e="";for(const t of this.items){const s=t.ToHTML();s!==""&&(this.items.length>=2?e=`${e}<div>${s}</div>`:e=s)}return e}}class nt{constructor(){this.rowName="",this.cols=new Array}makeCols(e){this.cols.length>0&&this.cols.splice(0,this.cols.length);for(let t=0;t<e;t++){const s=new Fe;s.makeItems(),this.cols.push(s)}}ToHTML(){let e="";for(const t of this.cols){let s="";s=t.ToHTML(),s!==""&&(e=`${e}<td>${s}</td>`)}return e}toTemplate(){const e=new nt;e.rowName=this.rowName;for(const t of this.cols){const s=new Fe;s.makeItems(t.items.length);let n=-1;for(const i of t.items){n++;const o=s.items[n];o.className=i.className,o.typeInfo.toolTip=i.typeInfo.toolTip,o.typeInfo.using.itemType=i.typeInfo.using.itemType,o.typeInfo.using.label=i.typeInfo.using.label,o.typeInfo.using.combo=i.typeInfo.using.combo,o.typeInfo.using.input=i.typeInfo.using.input,o.typeInfo.using.innerHTML=i.typeInfo.using.innerHTML,o.typeInfo.using.img=i.typeInfo.using.img}e.cols.push(s)}return e}}class W{constructor(){this.tableName="",this.rows=new Array,this.template=null,this.invalidRowIndex=-1,this.firstRowIndex=1,this.fontSize="font-size: 0.9em;",this.clipboardText=""}makeDim(e,t){this.rows.length>0&&this.rows.splice(0,this.rows.length);for(let s=0;s<t;s++){const n=new nt;n.makeCols(e),this.rows.push(n)}}growCell(e,t=1){const s=this.rows.length;for(let n=0;n<s;n++)this.rows[n].cols[e].makeItems(t)}getCell(e,t,s=0){return this.rows[t].cols[e].items[s]}ToHTML(e="",t){this.tableName=e;let s="",n=0;for(const a of this.rows){n++;let r="";if(r=a.ToHTML(),r!==""){const c=a.rowName!==""?` class="${a.rowName}"`:"";s=`${s}<tr ${c} item-id="${n}">${r}</tr>`}}const i=e!==""?` class="${e}"`:"",o=t!==""?` id="${t}"`:"",l=t!==""?` item-id="${t}"`:"";return s=`<table${i}${o}${l}>${s}</table>`,s}ToScrollHTML(e="",t){const s=e!==""?` class="${e}"`:"",n=t!==""?` item-id="${t}"`:"";return`<div${s}${n}>
${this.ToHTML(e,t)}
</div>`}makeRowTemplate(e){if(this.rows.length>=1){for(const t of this.rows)t.rowName=e;this.template=this.rows[0].toTemplate()}}clearRows(){this.rows=new Array}addRow(e){const t=this.getTable();if(t===null)return-1;const s=t.insertRow(-1),n=t.rows.length;if(s.className=e,s.setAttribute("item-id",`${n}`),this.template!==null&&this.template.cols.length>=1){const i=this.template.toTemplate();let o="";for(const l of i.cols){let a="";for(const r of l.items){r.typeInfo.using.itemId=n;const c=r.ToHTML();c!==""&&(l.items.length>=2?a=`${a}<div>${c}</div>`:a=c)}a!==""&&(o=`${o}<td>${a}</td>`)}return s.innerHTML=o,n}return-1}deleteRow(e){const t=this.getTable();if(t===null)return!1;for(const s of t.rows){const n=s.getAttribute("item-id");if(n!==null&&n===`${e}`)return t.deleteRow(e-this.firstRowIndex),!0}return!1}redimAllRows(){const e=this.getTable();if(e===null)return;let t=this.firstRowIndex-1;for(const s of e.rows)if(s.getAttribute("item-id")!==null){t++,s.setAttribute("item-id",`${t}`);for(const i of s.cells)this.redimElems(i.children,t)}}redimElems(e,t){for(const s of e)s.getAttribute("item-id")!==null&&s.setAttribute("item-id",`${t}`),s.children!==void 0&&this.redimElems(s.children,t)}selectRow(e){const t=this.getTable();if(t!==null&&!(e<=0)&&!(e>t.rows.length)){for(const s of t.rows)s.classList!==void 0&&s.classList.remove("selected");t.rows[e-1].classList.add("selected")}}getSelectedRow(){const e=this.getTable();if(e===null)return this.invalidRowIndex;for(const t of e.rows)if(t.classList!==void 0&&t.classList.contains("selected")){const s=t.getAttribute("item-id");return s!==null?parseInt(s):this.invalidRowIndex}return this.invalidRowIndex}updateRowImage(e,t){const n=this.getTable()?.querySelector(`tr[item-id="${e}"] img`);n instanceof HTMLImageElement&&(n.src=t)}updateRowImageToolTip(e,t){const n=this.getTable()?.querySelector(`tr[item-id="${e}"] img`);n instanceof HTMLImageElement&&(n.title=t)}updateText(e,t){if(e.children!==null){const s=e.children[0];s.textContent=t}}scroll(e){const t=this.getTable();if(t===null||e<=0||e>t.rows.length)return null;const s=t.querySelector(`tr[item-id="${e}"] img`);return s===null||s===void 0?null:(s.scrollIntoView({behavior:"smooth",block:"center"}),s)}getRowElems(){const e=this.getTable();return e===null?null:e.rows}getElemValue(e){return e instanceof HTMLInputElement||e instanceof HTMLSelectElement?e.value:null}setElemValue(e,t){if(e instanceof HTMLInputElement){const s=e,n=s.value;return s.value=t,n}else if(e instanceof HTMLSelectElement){const s=e,n=s.value;return s.value=t,n}return null}getRowElem(e){const t=this.getTable();if(t===null)return null;for(const s of t.rows){const n=s.getAttribute("item-id");if(n!==null&&n===`${e}`)return console.log(`match row id : ${n}`),t.rows[e-this.firstRowIndex]}return null}getCellElems(e){if(e===null)return null;const t=new Array;for(const s of e.cells){if(s===null)continue;const n=new Array;for(const i of s.children)n.push(i);t.push(n)}return t}setVisible(e){const t=this.getTable();return t===null?null:(t.hidden=!e,t.parentElement.hidden=!e,!0)}getCellRect(e){const t=new L,s=t.GetRect(e.parentElement),n=t.GetRect(e),i=new Xe;return i.left=`${n.left}`,i.top=`${s.top}`,i.width=`${n.width}`,i.height=`${n.height}`,i}getTableOwnerRect(e){const t=new L,s=t.GetRect(e.parentElement.parentElement.parentElement.parentElement.parentElement);console.log(`[OWNER] ${s.left}, ${s.top}`);const n=t.GetRect(e.parentElement.parentElement.parentElement);console.log(`[TABLE] ${n.left}, ${n.top}`);const i=t.GetRect(e.parentElement.parentElement);console.log(`[TBODY] ${i.left}, ${i.top}`);const o=t.GetRect(e.parentElement);console.log(`[TROW] ${o.left}, ${o.top}`);const l=new Xe;return l.left=`${n.left}`,l.top=`${s.top}`,l.width="0",l.height="0",l}makeCallerName(e,t){return`${e}:${t}`}getCallerCellElem(e){const t=e.split(":");if(t===void 0||t.length!==2)return null;const s=this.getRowElem(parseInt(t[1]));if(s===null)return null;const n=this.getCellElems(s);if(n===null)return null;for(const i of n)for(const o of i)if(o.className===t[0])return o;return null}async toClipboard(){const e=this.getTable();if(e===null)return!1;let t="";for(const n of e.rows){let i="";const o=this.getCellElems(n);if(o===null)return!1;for(const l of o){let a="";for(const r of l){const c=this.getElemValue(r);let h=c===null?"&null&":`&${c}&`;a.length!==0?a=`${a}	${h}`:a=h}i.length!==0?i=`${i}	${a}`:i=`${a}`}t.length!==0?t=`${t}
${i}`:t=`${i}`}const s=`table:{${t}}`;try{await navigator.clipboard.writeText(s)}catch(n){return console.error("コピー失敗...",n),!1}return!0}async fromClipboard(){const e=this.getTable();if(e===null)return!1;let t="";try{t=await navigator.clipboard.readText()}catch(o){return console.error("ペースト失敗...",o),!1}this.clipboardText=t;const s="table:{";if(t.length<s.length+1||t.startsWith(s)===!1||t.endsWith("}")===!1)return!1;t=t.substring(s.length),t=t.substring(0,t.length-1);const n=t.split(`
`);let i=0;for(const o of e.rows){const a=n[i].split("	"),r=this.getCellElems(o);if(r===null)return!1;if(a.length!==r.length)return console.log(`different column size : line ${i+1}`),!1;i++}i=0;for(const o of e.rows){const a=n[i].split("	"),r=this.getCellElems(o);if(r===null)return!1;let c=0;for(const h of r){let d=a[c];if(d.startsWith("&")!==!1&&d.endsWith("&")!==!1&&(d=d.substring(1,d.length-1),d!=="null")){for(const u of h){this.setElemValue(u,d);break}c++}}i++}return!0}getTable(){const e=`.${this.tableName}`,t=document.querySelectorAll(e);if(t===null||t.length<=0)return null;const n=t[0].querySelectorAll(e);return n===null||n.length<=0?null:n[0]}setFontConfig(e="0.9"){this.fontSize=`font-size: ${e}em;`}getCssText(e,t,s){return`
/* テーブル */
.${e} {
width: 100%;                /* テーブル全体を親要素いっぱいに広げる */
table-layout: fixed;        /* これが重要！これで td の％指定が絶対になります */
height: 300px;              /* ダイアログに合わせた固定高 */
overflow-y: auto;
${ce.scrollBarText()}
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
`.trim()}}class qt{constructor(){this.htmlMaker=new L,this.table=new W,this.gridElem=null,this.headerElem=null,this.footerElem=null}makeKeyCell(e,t,s){const n=new Nt;return n.typeInfo.setLabel(e,!1),n.className=t,n.typeInfo.toolTip=s,n}makePair(){return new Map}setPair(e){if(e.size===0)return!1;this.table.makeDim(2,e.size),e.forEach((s,n)=>{this.table.growCell(1,s.items.length)});let t=-1;return e.forEach((s,n)=>{t++,this.table.getCell(0,t).typeInfo.setLabel(n.typeInfo.using.label,!1),this.table.getCell(0,t).className=n.className;let i=-1;for(const o of s.items)i++,this.table.getCell(1,t,i).typeInfo=o.typeInfo,this.table.getCell(1,t,i).className=o.className}),!0}setListener(e,t,s,n="",i=""){this.dispose(),this.table.makeRowTemplate(t);const o=document.getElementById(s);if(o===null)return console.log(`[setListener] cannot found ${s}`),!1;const l=this.table.ToScrollHTML(e,e),a=new J;a.props.name="",a.props.id=e,a.props.className=e,a.props.option.setTable(l),a.props.option.onSelect=async h=>{console.log(`classify = ${h.classify} targetId = ${h.targetId}`),this.onSelect!==void 0&&await this.onSelect(h)},this.htmlMaker=new L,this.htmlMaker.add(a);const r=this.htmlMaker.ToHTML();let c=document.createElement("div");return c.className=e,c.innerHTML=r,this.gridElem=c.children[0],n!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=n,this.headerElem.id=n,o.appendChild(this.headerElem)),o.appendChild(this.gridElem),c.remove(),c=null,i!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=i,this.footerElem.id=i,o.appendChild(this.footerElem)),!0}getSelectedRow(){return this.table.getSelectedRow()}enableEvents(e){return this.gridElem===null?!1:(this.htmlMaker.enableTableEvents(this.gridElem.className),this.onSelect=e,!0)}disableEvents(){return this.gridElem===null?!1:(this.htmlMaker.disableTableEvents(this.gridElem.className),!0)}setVisible(e){return this.gridElem===null?!1:(this.gridElem.hidden=!e,!0)}dispose(){this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.gridElem!==null&&(this.gridElem.parentElement?.removeChild(this.gridElem),this.gridElem.remove()),this.disableEvents(),this.headerElem=null,this.footerElem=null,this.gridElem=null}getCssText(e,t,s){return this.table.getCssText(e,t,s)}}class it{constructor(){this.ctlName="",this.ovElem=null}firstAction(e,t){const s=document.getElementById(t);return s===null?(console.log(`[firstAction] cannot found ${t}`),null):(this.createOverlay(s),this.ctlName=e,s)}createOverlay(e){const t=document.createElement("div");t.id=`${this.ovCssName()}`,t.style.position="absolute",t.style.inset="0",t.style.zIndex=this.zIndexOv(),t.style.background="transparent",t.style.background="rgba(0,0,0,0.1)",e.appendChild(t),this.ovElem=t}getBaseElem(){return this.ovElem!==null?this.ovElem.parentElement:null}getOuterCssText(){return`
.${this.ctlName} {
  position: absolute;
  inset: auto;

  padding: 0;       /* 内側の余白をゼロに */
  border: none;     /* 枠線を消す（枠線があると1px〜ズレます） */
  overflow: hidden; /* 中身がはみ出さないように（任意） */

  ${ce.borderShadowText}

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
        `.trim()}dispose(){this.ovElem!==null&&(this.ovElem.parentElement?.removeChild(this.ovElem),this.ovElem.remove())}ovCssName(){return`${this.ctlName}-barrier`}zIndexCtl(){return"1000"}zIndexOv(){return"999"}}const Be={ByText:"ByText",ByValue:"ByValue",Both:"Both"};class jt extends it{constructor(){super(...arguments),this.ctlName="",this.initValue="",this.selectedIndex=-1,this.delimiter="/",this.callerName="",this.htmlMaker=new L,this.table=new W,this.ctlElem=null,this.onUpAction=async()=>{this.keyValuePairs!==void 0&&(this.selectedIndex=this.selectedIndex<=0?this.keyValuePairs.length-1:this.selectedIndex-1,this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]))},this.onDnAction=async()=>{this.keyValuePairs!==void 0&&(this.selectedIndex=this.selectedIndex>=this.keyValuePairs.length-1?0:this.selectedIndex+1,this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]))}}setListener(e,t,s){this.dispose(),this.callerName=s,this.ctlName=e;const n=new W;n.makeDim(1,3);let i=0;n.getCell(0,i).typeInfo.setButton("▲"),n.getCell(0,i).className=this.upCssName(),n.getCell(0,i).typeInfo.using.itemId=i,i++,n.getCell(0,i).typeInfo.setButton(""),n.getCell(0,i).className=this.valCssName(),n.getCell(0,i).typeInfo.using.itemId=i,i++,n.getCell(0,i).typeInfo.setButton("▼"),n.getCell(0,i).className=this.dwCssName(),n.getCell(0,i).typeInfo.using.itemId=i;const o=this.firstAction(e,t);if(o===null)return!1;const l=n.ToScrollHTML(e,e),a=new J;a.props.name="",a.props.id=this.tblCssName(),a.props.className=this.tblCssName(),a.props.option.setTable(l),a.props.option.onSelect=async u=>{switch(u.classify){case this.valCssName():if(this.onApply!==void 0){const p=new we;p.callerName=this.callerName,p.result=this.keyValuePairs[this.selectedIndex],await this.onApply(p)}break;case this.upCssName():if(this.onUp!==void 0){const p=new we;p.callerName=this.callerName,p.result=this.keyValuePairs[this.selectedIndex],await this.onUp(p),u.cancel||this.onUpAction()}break;case this.dwCssName():if(this.onDown!==void 0){const p=new we;p.callerName=this.callerName,p.result=this.keyValuePairs[this.selectedIndex],await this.onDown(p),u.cancel||this.onDnAction()}break}},this.htmlMaker=new L,this.htmlMaker.add(a);const r=this.htmlMaker.ToHTML();let c=document.createElement("dialog");c.className=e,c.innerHTML=r,this.ctlElem=c;let h=c.children[0],d=h.children[0];return d.className=`${this.tblCssName()}`,d.id=`${this.tblCssName()}`,this.ctlElem.appendChild(d),h.remove(),h=null,o.appendChild(this.ctlElem),this.table=n,!0}setSelectedByValue(e,t,s=Be.Both){const n=new Array;switch(s){case Be.ByText:n.push(0);break;case Be.ByValue:n.push(1);break;case Be.Both:n.push(0),n.push(1);break;default:return!1}this.initValue=e,this.keyValuePairs=t,this.selectedIndex=-1;const i=e.split(this.delimiter);let o=i.length>=2?i[1]:e,l="";for(const a of n){let r=-1;for(const c of t)if(r++,c!==null&&c!==""){const h=c.split(this.delimiter);if(h.length>=2&&h[a]===o){this.selectedIndex=r,l=h[0];break}}if(this.selectedIndex!==-1)break}if(this.selectedIndex===-1){const r=t[0].split(this.delimiter);this.selectedIndex=0,l=r[0]}return this.updateValueElemByText(l),this.selectedIndex!==-1}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-updn-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e,t,s){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onApply=e,this.onUp=t,this.onDown=s,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}updateValueElemByKeyValue(e){if(this.ctlElem===null)return;let t="";const s=e.split(this.delimiter);s.length>=2&&(t=s[0]),this.updateValueElemByText(t)}updateValueElemByText(e){if(this.ctlElem===null)return;const t=this.ctlElem.querySelectorAll(`.${this.valCssName()}`);t!==null&&(t[0].textContent=e)}tblCssName(){return`${this.ctlName}-tbl`}upCssName(){return`${this.ctlName}-upBtn`}dwCssName(){return`${this.ctlName}-dwBtn`}valCssName(){return`${this.ctlName}-values`}}class Ge{constructor(){this.key="",this.text=""}}class Wt extends it{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new L,this.table=new W,this.ctlElem=null}setChoiceItems(e){this.items=e}setListener(e,t,s){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const n=this.items.length,i=new W;i.makeDim(1,n);let o=0;for(const p of this.items)i.getCell(0,o).typeInfo.setButton(`${p.text}`),i.getCell(0,o).className=`${e}-${p.key}`,i.getCell(0,o).typeInfo.using.itemId=o,o++;const l=this.firstAction(e,t);if(l===null)return!1;const a=i.ToScrollHTML(e,e),r=new J;r.props.name="",r.props.id=this.tblCssName(),r.props.className=this.tblCssName(),r.props.option.setTable(a),r.props.option.onSelect=async p=>{if(console.log(`classify = ${p.classify} targetId = ${p.targetId}`),this.onSelect!==void 0){const x=parseInt(p.targetId),S=new we;S.callerName=this.callerName,S.result=0<=x&&x<this.items.length?this.items[x].key:"",await this.onSelect(S)}},this.htmlMaker=new L,this.htmlMaker.add(r);const c=this.htmlMaker.ToHTML();let h=document.createElement("dialog");h.className=e,h.innerHTML=c,this.ctlElem=h;let d=h.children[0],u=d.children[0];return u.className=`${this.tblCssName()}`,u.id=`${this.tblCssName()}`,this.ctlElem.appendChild(u),d.remove(),d=null,l.appendChild(this.ctlElem),this.table=i,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-updn-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}tblCssName(){return`${this.ctlName}-tbl`}}class Kt{constructor(){this.key="",this.text=""}}class Yt extends it{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new L,this.table=new W,this.ctlElem=null,this.headerElem=null,this.footerElem=null}setGridtems(e){this.items=e}setListener(e,t,s,n="",i=""){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const o=this.items.length,l=new W;l.makeDim(2,o);let a=0;for(const R of this.items)l.getCell(0,a).typeInfo.setLabel(`${R.text}`,!1),l.getCell(0,a).className=this.keyCssName(),l.getCell(0,a).typeInfo.using.itemId=a,l.getCell(1,a).typeInfo=R.value.items[0].typeInfo,l.getCell(1,a).className=this.valueCssName(),l.getCell(1,a).typeInfo.using.itemId=a,a++;const r=this.firstAction(e,t);if(r===null)return!1;const c=l.ToScrollHTML(e,this.tblCssName()),h=new J;h.props.name="",h.props.id=this.tblCssName(),h.props.className=this.tblCssName(),h.props.option.setTable(c),h.props.option.onSelect=async R=>{if(this.onSelect!==void 0){const B=new we;B.callerName=R.classify,B.result=R.selectedValue,await this.onSelect(B)}},this.htmlMaker=new L,this.htmlMaker.add(h);const d=this.htmlMaker.ToHTML();let u=document.createElement("dialog");u.className=e,u.innerHTML=d,this.ctlElem=u;let p=u.children[0];const x=this.divCssName();p.className=x,p.id=x;let S=p.children[0];return S.className=`${this.tblCssName()}`,S.id=`${this.tblCssName()}`,n!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=n,this.headerElem.id=n,u.appendChild(this.headerElem)),r.appendChild(this.ctlElem),i!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=i,this.footerElem.id=i,u.appendChild(this.footerElem)),this.table=l,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}setFontConfig(e="0.9"){this.table.setFontConfig(e)}applyCss(){const e=`${this.getBaseElem().className}-flgrd-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
${this.table.getCssText(this.divCssName(),this.keyCssName(),this.valueCssName())}
.${this.ctlName} {
width: 200px;
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}divCssName(){return`${this.ctlName}-div`}tblCssName(){return`${this.ctlName}-tbl`}keyCssName(){return`${this.ctlName}-key`}valueCssName(){return`${this.ctlName}-value`}}class Xt{constructor(){this.itemType=E.Img,this.itemId=-1,this.label="",this.innerHTML=""}}class It{constructor(){this.toolTip="",this.using=new Xt}setButton(e){this.using.itemType=E.Btn,this.using.label=e}setLabel(e,t){this.using.itemType=t?E.Label:E.LabelRO,this.using.label=e}setCombo(e){this.using.itemType=E.Combo,this.using.combo=e}setInput(e){this.using.itemType=E.Input,this.using.input=e}setImg(e){this.using.itemType=E.Img,this.using.img=e}setPlain(e){this.using.itemType=E.Plain,this.using.innerHTML=e}setTable(e){this.using.itemType=E.Table,this.using.innerHTML=e}ToButtonHTML(e){const t=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"";return`
<button class="${e}"${t}>${this.using.label}</button>
`.trim()}ToLableHTML(e){return`
<span class="${e}" data-readonly="false">${this.using.label}</span>
`.trim()}ToLableROHTML(e){return`
<span class="${e}" data-readonly="true">${this.using.label}</span>
`.trim()}ToComboHTML(e){if(this.using.combo===void 0)return"";const t=this.using.combo;let s=J.makeComboItemsHTML(t);const n=t.classify!==""?` data-classify="${t.classify}"`:"";return`
<select class="${e}" ${n}>
  ${s}
</select>
`.trim()}ToInputHTML(e){if(this.using.input===void 0)return"";const t=this.using.input,s=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"",n=t.value!==""?` value="${t.value}"`:"",i=t.placeholder!==""?` placeholder="${t.placeholder}"`:"";return`
<input type="${t.type}" class="${e}"${s}${n}${i}>
`.trim()}ToImgHTML(e,t){let s="";return this.using.img.imgSrc===""?s=`src="" data-filename="${this.using.img.imgFile}"`:s=`src="${this.using.img.imgSrc}"`,`
<img class="${e}" ${s} alt="${t}">
`.trim()}ToOverlayHTML(){return`<div class="overlay" title="${this.toolTip}"></div>`}}class _t{constructor(){this.name="",this.id="",this.className="",this.option=new It}}class J{constructor(){this.props=new _t}ToHTML(e){let t="",s="";switch(e.option.using.itemType){case E.Btn:t=e.option.ToButtonHTML(e.className);break;case E.Label:t=e.option.ToLableHTML(e.className),s=e.option.ToOverlayHTML();break;case E.LabelRO:t=e.option.ToLableROHTML(e.className);break;case E.Plain:t=`
${e.option.using.innerHTML}
`.trim();break;case E.Combo:t=e.option.ToComboHTML(e.className);break;case E.Input:t=e.option.ToInputHTML(e.className);break;case E.Img:t=e.option.ToImgHTML(e.className,e.option.using.img.alt),s=e.option.ToOverlayHTML();break}return`
  ${t}
  ${s}
`.trim()}MakeSelectableHTML(){return`
<div class="${this.props.name}" id="${this.props.name}" item-id="${this.props.id}">
${this.ToHTML(this.props)}
</div>
`.trim()}static makeComboItemsHTML(e){if(e.selectionPair===void 0||e.selectionPair.length<=0)return"";let t="";for(const s of e.selectionPair){let[n,i]=s.split("/");i=i.trim();const o=e.selectedItem===i?" selected":"",l=`
<option value="${i}"${o}>${n}</option>
`.trim();t+=l}return t}}class L{constructor(){this._defaultButtonsName="dialog-buttons",this._defaultToolButtonsName="dialog-tool-btns",this._enableScrollEvt=!1,this._scrollTimer=null,this._isScrolling=!1,this.onButtonClicked=e=>{const t=e.target;if(t===null)return;const s=t.tagName==="BUTTON"?t:t.parentElement;if(s===null)return;let n=this.supplessSelected(s.className);if(n!==""){n=`.${n}`;const o=document.querySelectorAll(`${n}.selected`);o!==null&&o.forEach(l=>l.classList.remove("selected")),s.classList.add("selected")}const i=s.getAttribute("item-id");if(i){const o=this.itemList.find(l=>`${l.props.id}`===i);if(o){if(o.props.option.onSelect){let l="";t.tagName==="BUTTON"&&(l=t.getAttribute("item-id"),l===null&&(l=""));const a=new ye;a.parentElem=t.parentElement,a.item=o,a.targetId=l,o.props.option.onSelect(a)}this.selectedCh=o}else{let l=this.getTopElement(t);if(l?.tagName==="TABLE"){const a=l.className,r=this.itemList.find(c=>c.props.className===a);if(r){if(r.props.option.onSelect){let c="";t.tagName==="BUTTON"&&(c=t.getAttribute("item-id"),c===null&&(c=""));const h=new ye;h.parentElem=t.parentElement,h.item=r,h.targetId=c,h.classify=this.supplessSelected(t.className),r.props.option.onSelect(h)}this.selectedCh=r}}}}},this.onInputKeydown=e=>{const t=e.target;if(t===null||t.tagName!=="INPUT")return;const s=t,n=e;let i=re.None;switch(n.key){case Re.Enter:i=re.Normal;const l=n.repeat,a=n.timeStamp;let r=s.dataset.pressInfo;if(r===void 0)r=`1;${a}`,i=re.Normal;else if(!l){const c=r.split(";");if(c.length===2){let h=parseInt(c[0]),d=parseFloat(c[1]);a-d>=4*1e3?h=1:(h++,h>=3&&(h=0,i=re.Special)),r=`${h};${a}`}}s.dataset.pressInfo=r,n.preventDefault();break;case Re.Escape:s.value="元の値",s.blur();break;case Re.Tab:break;case Re.Process:return}const o=t.getAttribute("item-id");if(o){let l=this.getTopElement(t);if(l?.tagName==="TABLE"){const a=l.className,r=this.itemList.find(c=>c.props.className===a);if(r){const c=new ye;c.parentElem=t.parentElement,c.item=r,c.targetId=o,c.classify=this.supplessSelected(t.className),c.Keydown=n.key,c.KeyEnter=i,r.props.option.onSelect(c)}}}},this.onSelectChange=e=>{const t=e.target;if(t===null||t.tagName!=="SELECT")return;const s=t?.dataset.classify;let n=t.getAttribute("item-id");if(n===null){const i=this.getTopElement(t);i!==null&&(n=i.getAttribute("item-id"))}if(n){let i=this.itemList.find(o=>`${o.props.id}`===n);if(i===void 0&&(i=this.itemList.find(o=>`${s}${o.props.id}`===n)),i){if(i.props.option.onSelect){const o=new ye;o.parentElem=t.parentElement,o.item=i,o.targetId=n,o.classify=s===void 0?"?":s,o.selectedValue=t.value,i.props.option.onSelect(o)}this.selectedCh=i}}},this.itemList=new Array}add(e){this.itemList.push(e)}get DefaultBlueColor(){return"#86aef7e6"}get DefaultYellowColor(){return"#f7eb86e6"}get DefaultBorderColor(){return"#2c3e50ff"}MakeDefaultDialogParentCss(e,t,s,n=0){return`
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
  ${ce.borderShadowText}
}
`.trim()}MakeDefaultDialogCss(e){return`
.${e} {
  background-color: #f7eb86e6;
  border: 2px solid #2c3e50;
  padding: 10px;
  ${ce.borderShadowText}
}
`.trim()}ToHTML(){let e="";for(const t of this.itemList){if(t.props.option.using.itemType===E.Table){e+=t.props.option.using.innerHTML;continue}e+=t.MakeSelectableHTML()}return`${e}`}MakeTableScrollCss(e,t,s=!1){return`
.${e} {
height: ${t}px;              /* ダイアログに合わせた固定高 */
overflow-y: auto;
overflow-x: ${s?"auto":"hidden"};
-webkit-overflow-scrolling: touch;  /* iPad用の滑らか設定 */
border: 1px solid #7b1fa2;        /* 紫色の枠線 */
background: rgba(192, 192, 192, 0.6);
${ce.scrollBarText()}
}
`.trim()}MakeScrollableList(e){let t="";for(const s of this.itemList)t+=s.MakeSelectableHTML();return`<div id="${e}" class="${e} scroll">
${t}
</div>`}MakeDefaultScrollCss(e,t){return`
.${e} .scroll {
max-height: ${t}px;
overflow-y: auto;
${ce.scrollBarText()}
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
  <div class="spinner"></div>
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
`.trim()}applyFullScreenCss(e){const t=document.getElementById(e);if(t===null||t.classList.contains("hidden"))return!1;const s=document.createElement("style");return s.textContent=`
${this.MakeFullScreenCss(e)}
`.trim(),document.head.appendChild(s),!0}hideFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.add("hidden")}showFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.remove("hidden")}getFullScreenMsgElem(e){const t=document.getElementById(e);if(t){const s=t.querySelectorAll("p");return s!==null&&s.length>=1?s[0]:null}return null}initObserver(e,t){const s=document.getElementById(e);if(!s)return;const n=async l=>{await l.forEach(async a=>{if(a.isIntersecting){const r=a.target,c=this.isDemo&&!t.isMaterial(r.dataset.filename)?"demo.png":r.dataset.filename;if(console.log(`[${this.isDemo}] 見えた！:${r.dataset.filename}`),c&&r.src===""||r.src.startsWith(window.location.origin)){const h=await t.findNs(c);h===null||h===""?(this.observer.unobserve(r),console.log(`cannot set image : ${c}`)):await t.getImageUrlBy(c,h).then(d=>{d!==null?(r.src=d,this.observer.unobserve(r)):console.log(`pending set image : ${c}`)})}}})},i={root:s,rootMargin:"0px",threshold:.1};this.observer=new IntersectionObserver(n,i),s.querySelectorAll("img[data-filename]").forEach(l=>this.observer.observe(l)),console.log("[initObserver] enabled!")}get isDemo(){return window.EVONA_CONFIG.demo}get isScrolling(){return this._enableScrollEvt?!(this._scrollTimer!==null&&this._isScrolling):!1}enableScrollEvent(e){this._isScrolling=!1;const t=document.getElementById(e);return t?(this._enableScrollEvt=!0,t.addEventListener("scroll",()=>{this._isScrolling=!0,clearTimeout(this._scrollTimer),this._scrollTimer=setTimeout(()=>{this._scrollTimer=null,this._isScrolling=!1;const s=this.observer.takeRecords();console.log(`[enableScrollEvent] stopped ${s.length}`)},200)}),console.log("[enableScrollEvent] enabled!"),!0):!1}enableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(n=>{const i=n.querySelectorAll("img");i.length>=1&&(i[0],this.addButtonEvent(t,n));const o=n.querySelectorAll("span");o.length>=1&&o[0]?.dataset.readonly=="false"&&this.addButtonEvent(t,n);const l=n.querySelectorAll("select");l.length>=1&&(l[0],this.addSelectEvent(t,n));const a=n.querySelectorAll("button");if(a.length>=1)for(const r of a)console.log(`${n.tagName}::${t}::button::${r.innerHTML}`),n.addEventListener("click",this.onButtonClicked)})}enableTableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(n=>{const i=n.querySelectorAll("table");i.length>=1&&(i[0],n.addEventListener("click",this.onButtonClicked),n.addEventListener("keydown",this.onInputKeydown),n.addEventListener("change",this.onSelectChange))})}disableTableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(n=>{const i=n.querySelectorAll("table");i.length>=1&&(i[0],n.removeEventListener("click",this.onButtonClicked),n.removeEventListener("keydown",this.onInputKeydown),n.removeEventListener("change",this.onSelectChange))})}addButtonEvent(e,t){t.getAttribute("item-id")&&t.addEventListener("click",this.onButtonClicked)}addInputEvent(e,t){t.getAttribute("item-id")&&t.addEventListener("keydown",this.onInputKeydown)}addSelectEvent(e,t){t.addEventListener("change",s=>{const n=s.target,i=n?.dataset.classify,o=t.getAttribute("item-id");if(o){let l=this.itemList.find(a=>`${a.props.id}`===o);if(l===void 0&&(l=this.itemList.find(a=>`${i}${a.props.id}`===o)),l){if(l.props.option.onSelect){const a=new ye;a.item=l,a.targetId=o,a.classify=i===void 0?"?":i,a.selectedValue=n.value,l.props.option.onSelect(a)}this.selectedCh=l}}})}supplessSelected(e){let t=e,s=e.indexOf(" selected");return s>=0&&(t=e.substring(0,s)),t}getTopElement(e){let t=e.parentElement;for(;t!==null;){if(t.tagName==="DIV"){t=t.parentElement;continue}if(t.tagName==="TD"){t=t.parentElement;continue}if(t.tagName==="TR"){t=t.parentElement;continue}if(t.tagName==="TBODY"){t=t.parentElement;continue}break}return t}GetRect(e){const t=e.getBoundingClientRect(),s=new Xe;return s.left=`${t.left}`,s.top=`${t.top}`,s.width=`${t.width}`,s.height=`${t.height}`,s}EnableElem(e,t){e.ariaDisabled=t?"false":"true"}IsEnabledElem(e){return e.ariaDisabled===null?!0:e.ariaDisabled==="false"}EnableId(e,t){const s=document.getElementById(e);return s===null?null:(this.EnableElem(s,t),t)}IsEnabledId(e){const t=document.getElementById(e);return t===null?null:this.IsEnabledElem(t)}GetIdByIndex(e){return this.itemList[e].props.id}UnselectAll(e){const t=`.${e}`;document.querySelectorAll(`${t}.selected`).forEach(s=>s.classList.remove("selected"))}SelectByID(e,t){const s=this.FindByID(e,t);if(s){s.classList.add("selected");const n=s.getAttribute("item-id");if(n){const i=this.itemList.find(o=>`${o.props.id}`===n);i&&(this.selectedCh=i)}return s}return null}FindDivByClassName(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.querySelectorAll("div");for(const l of o)if(l.className===t||l.className.startsWith(t))return l}return null}FindByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t)return i}return null}FindImgByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("img");return l.length>=1?l[0]:null}}return null}FindImgsByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("img");return l.length>=1?l:null}}return null}FindDivByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("div");return l.length>=1?l[0]:null}}return null}FindSelectByID(e,t,s){const n=`.${e}`,i=document.querySelectorAll(`${n}`);for(const o of i){const l=o.getAttribute("item-id");if(l&&l===t){const a=o.querySelectorAll("select");if(a.length>=1){for(const r of a)if(r?.dataset.classify===s)return r}return null}}return null}ReplaceImg(e,t,s){const n=this.FindImgByID(e,t);return n===null?null:(n.dataset.filename,n.src=s,n)}ReplaceDivToolTip(e,t,s){const n=this.FindDivByID(e,t);return n===null?null:(n.title=s,n)}ReplaceImgToolTip(e,t,s){const n=this.FindImgByID(e,t);return n===null?null:(n.title=s,n)}SetImgSrc(e,t){if(e===null)return null;e.dataset.filename,e.src=t}SetImgSize(e,t,s){if(e===null)return null;e.style.width=`${t}px`,e.style.height=`${s}px`}ReplaceComboItems(e,t,s){const n=this.FindSelectByID(e,t,s.classify);if(n===null)return null;n.querySelectorAll("option").length>=1&&(n.innerHTML="");const o=J.makeComboItemsHTML(s);return o!==""&&(n.innerHTML=o),n}setVisible(e,t){const s=document.getElementById(e);return s===null?null:(s.hidden=!t,!0)}copyCssToInlineStyle(e,t){for(const s of document.styleSheets){let n;try{n=s.cssRules}catch{continue}for(const i of n)if(i instanceof CSSStyleRule&&i.selectorText===e){const o=i.style;console.log(`[copyCssToInlineStyle] coping [${e}]`);for(let l=0;l<o.length;l++){const a=o[l],r=o.getPropertyValue(a);t.style.setProperty(a,r)}return}}}}const he={Hide:"Hide",CopyPaste:"CopyPaste"},be={Hide:"Hide",MoveLowest:"MoveLowest"},ne={Copy:"Copy",Paste:"Paste",Cancel:"Cancel"};class j{constructor(){this.title="",this.dlgName="",this.B2Type=he.Hide,this.B3Type=be.MoveLowest,this.initLeft=0,this.initTop=0,this.cornerIndex=-1,this.mover=new Qt,this.moverOnMoveDone=async()=>{this.onMoveDone!==void 0&&(await this.onMoveDone(this.dlg),this.cornerIndex=0)},this.resizer=new Zt,this.resizerOnResizeDone=async(e,t)=>{this.onResizeDone!==void 0&&await this.onResizeDone(this.dlg,e,t)},this.isIPad=/iPad|Macintosh/.test(navigator.userAgent)&&"ontouchend"in document,this.isTouchDevice=()=>"ontouchstart"in window||navigator.maxTouchPoints>0}SetB2Type(e=he.CopyPaste,t){this.B2Type=e,this.onCopyPaste=t}SetB3Type(e=be.MoveLowest){this.B3Type=e}NewDialog(e,t){this.dlgName=t;const s=document.createElement("dialog");s.id=t,s.className=t;const n=document.getElementById(e);return n.appendChild(s),this.dlgParent=n,this.dlg=s,s}SetContent(e,t,s=!0){const n=this.dlg,i=`<button class="${this.toolNameB0}" id="${this.toolNameB0}" title="DragMove">[＊]</button>`,o=`<button class="${this.toolNameB1}" id="${this.toolNameB1}" title="SideBy">[≫]</button>`;let l="";this.B2Type===he.CopyPaste&&(l=`<button class="${this.toolNameB2}" id="${this.toolNameB2}" title="Copy&Paste">[⇔]</button>`);let a="";this.B3Type===be.MoveLowest&&(a=`<button class="${this.toolNameB3}" id="${this.toolNameB3}" title="MoveLowest">[_]</button>`);const r=`${i}${o}${l}${a}`;let c="";this.title!==""?c=`<div class="${this.titleName}">${this.title}${r}</div>`:c=`<div class="${this.titleName}">${r}</div>`;const h=document.createElement("div");h.innerHTML=c,n.innerHTML=t;const d=document.getElementById(e);d.hidden=s,d.appendChild(h),d.appendChild(n),this.applyCss()}EnableEventHandlers(){const e=this.dlgParent.style.left,t=this.dlgParent.style.top;this.initLeft=parseInt(e.substring(0,e.length-2)),this.initTop=parseInt(t.substring(0,t.length-2)),console.log(`[EnableEventHandlers] ${this.dlgParent.id}::(${e},${t})::(${this.initLeft},${this.initTop})`);const s=document.getElementById(`${this.toolNameB0}`);s!==null&&(this.mover.onMoveDone=this.moverOnMoveDone,this.mover.attach(s,this.dlgParent));const n=document.getElementById(`${this.toolNameB1}`);n!==null&&(n.onclick=async()=>{if(this.dlgParent===void 0)return;const i=window.innerWidth,o=window.innerHeight,l=this.dlgParent.offsetWidth/2,a=Math.max(this.dlgParent.offsetWidth,this.dlg.offsetWidth),r=this.dlgParent.offsetHeight+this.dlg.offsetHeight;switch(this.cornerIndex=(this.cornerIndex+1)%4,this.cornerIndex){case 0:this.dlgParent.style.left=`${l}px`,this.dlgParent.style.top="0px";break;case 1:this.dlgParent.style.left=`${i-a+l}px`,this.dlgParent.style.top="0px";break;case 2:this.dlgParent.style.left=`${i-a+l}px`,this.dlgParent.style.top=`${o-r}px`;break;case 3:this.dlgParent.style.left=`${l}px`,this.dlgParent.style.top=`${o-r}px`;break}}),this.B2Type===he.CopyPaste&&(document.getElementById(`${this.toolNameB2}`).onclick=async()=>{if(this.dlgParent===void 0||this.onCopyPaste===void 0)return;const i=this.dlgParent,o=i.querySelectorAll(`.${this.toolNameB2}`),l=o.length>=1?o[0]:null,a=new L;if(a.IsEnabledElem(l)===!1)return;const r=new Array,c=new Ge;c.key=ne.Copy,c.text="クリップボードへコピー",r.push(c);const h=new Ge;h.key=ne.Paste,h.text="クリップボードからペースト",r.push(h);const d=new Ge;d.key=ne.Cancel,d.text="キャンセル",r.push(d);const u=new Wt;u.setChoiceItems(r),a.EnableElem(l,!1);const p=a.GetRect(i);a.GetRect(this.dlg);const x=a.GetRect(l),S=this.dlg.className;u.setListener(`${S}-choice`,S,`${S}-B2`),u.applyCss(),u.show(`${parseInt(x.left)-parseInt(p.left)}`,"0"),u.enableEvents(async R=>{console.log(`[onSelect] ${R.callerName} ${R.result}`),u.dispose(),this.onCopyPaste(this.dlg,R.result),a.EnableElem(l,!0)})}),this.B3Type===be.MoveLowest&&(document.getElementById(`${this.toolNameB3}`).onclick=async()=>{if(this.dlgParent===void 0)return;new C().MoveLowestLayer(this.dlgParent)})}EnableResize(){if(this.isIPad&&this.isTouchDevice()){console.log("EVONA: Touch device detected. Priority given to flick scrolling.");return}const e=`<button class="${this.handleNameB0}" id="${this.handleNameB0}" title="Resize">[」]</button>`,t=document.createElement("div");t.className=this.handleName,t.id=this.handleName,t.innerHTML=`${e}`,this.dlg.appendChild(t);const s=document.getElementById(`${this.handleName}`);s!==null&&(s.style.position="absolute",s.style.left=`${this.dlg.clientWidth-s.clientWidth}px`,s.style.top=`${this.dlg.clientHeight-s.clientHeight}px`,this.resizer.onResizeDone=this.resizerOnResizeDone,this.resizer.attach(s,this.dlg))}static GetDialogInfo(e){const t=this.FindDialogParent(e);if(t===null)return null;const s=t.querySelector("dialog");if(s===null)return null;const n=new pe,i=s.clientWidth,o=s.clientHeight;return n.name=e,n.left=t.style.left,n.top=t.style.top,n.width=`${i}px`,n.height=`${o}px`,n}static SetDialogInfo(e){const t=this.FindDialogParent(e.name);if(t===null)return!1;const s=t.querySelector("dialog");return s===null?!1:(t.style.left=e.left,t.style.top=e.top,s.style.width=e.width,s.style.height=e.height,!0)}static FindDialogParent(e){const t=document.getElementById(e);return t??null}get titleName(){return`${this.dlgName}-dlg-title-00`}get toolNameB0(){return`${this.dlgName}-dlg-tool-b0`}get toolNameB1(){return`${this.dlgName}-dlg-tool-b1`}get toolNameB2(){return`${this.dlgName}-dlg-tool-b2`}get toolNameB3(){return`${this.dlgName}-dlg-tool-b3`}get handleName(){return`${this.dlgName}-dlg-handle-00`}get handleNameB0(){return`${this.dlgName}-dlg-handle-b0`}applyCss_old(){const e=document.createElement("style");e.textContent=`
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
`.trim(),document.head.appendChild(t)}}class pe{constructor(){this.name="",this.left="",this.top="",this.width="",this.height=""}copyTo(e){e.name=this.name,e.left=this.left,e.top=this.top,e.width=this.width,e.height=this.height}}class C{add(e){C.dlgElems.push(e)}AddDialogs(){C.dlgElems=new Array;const e=document.querySelectorAll("div");for(const t of e)t.style.zIndex!==""&&(parseInt(t.style.zIndex)>=C.ignoreIndex||t.querySelector("dialog")&&(console.log(`${t.id} added!`),this.add(t)))}AssignIndexies(){let e=C.dlgElems.length-1;for(const t of C.dlgElems)t.style.zIndex=`${e}`,e--}MoveLowestLayer(e){C.dlgElems.length;for(const t of C.dlgElems)if(t.id===e.id)t.style.zIndex="0";else{const s=t.style.zIndex;t.style.zIndex=`${parseInt(s)+1}`}}MoveHiestLayer(e){C.dlgElems.length;let t=-1;for(const s of C.dlgElems){const n=parseInt(s.style.zIndex);n>=C.ignoreIndex||n>t&&(t=n)}for(const s of C.dlgElems)if(s.id===e.id){s.style.zIndex=`${t}`;break}for(const s of C.dlgElems)if(s.id!==e.id){if(parseInt(s.style.zIndex)>=C.ignoreIndex)continue;t--,s.style.zIndex=`${t}`}}FindByName(e){const t=C.dlgElems.find(s=>s.id===e);return t||null}async ForEachAsync(e){for(const t of C.dlgElems)t.parentNode!==null&&await e(t.id)}ReOrder(){C.dlgElems.sort((e,t)=>{const s=e.style.zIndex,n=t.style.zIndex;if(s===""||n==="")throw new Error("z-index が未設定の要素が混入しています");return parseInt(t.style.zIndex)-parseInt(e.style.zIndex)})}async SaveSetting(e,t=!0){if(this.canSave&&e!==null&&e.parentElement!==null){if(t&&this.FindByName(e.parentElement.className)===null){console.log(`${e.className} is out of managed dlg`);return}await this.initSetting(),await C.setingAccess.saveDialogPos(e)}}async LoadAllSetting(){if(this.canSave){await this.initSetting();for(const e of C.dlgElems){const t=e.querySelector("dialog");t!==null&&await C.setingAccess.loadDialogPos(t)}}}async loadSetting(e){this.canSave&&(await this.initSetting(),e!==null&&await C.setingAccess.loadDialogPos(e))}async initSetting(){C.setingAccess===null&&(C.setingAccess=new wt,await C.setingAccess.init())}get canSave(){return!new L().isDemo}}C.ignoreIndex=1e3;C.setingAccess=null;class Qt{constructor(){this.isDragging=!1,this.startX=0,this.startY=0}attach(e,t){e.onpointerdown=s=>{e.setPointerCapture(s.pointerId),this.isDragging=!0,this.startX=s.clientX-t.offsetLeft,this.startY=s.clientY-t.offsetTop,e.style.cursor="grabbing"},e.onpointermove=s=>{if(!this.isDragging)return;const n=s.clientX-this.startX,i=s.clientY-this.startY;t.style.left=`${n}px`,t.style.top=`${i}px`,t.style.margin="0"},e.onpointerup=async s=>{this.isDragging=!1,e.releasePointerCapture(s.pointerId),e.style.cursor="grab",this.onMoveDone!==void 0&&await this.onMoveDone()}}}class Zt{constructor(){this.isDragging=!1,this.startX=0,this.startY=0,this.startW=0,this.startH=0,this.handleX=0,this.handleY=0}attach(e,t){e.onpointerdown=s=>{e.setPointerCapture(s.pointerId),this.isDragging=!0,this.startX=s.clientX,this.startY=s.clientY;const n=t.getBoundingClientRect();console.log(`[${t.className}] (${n.left},${n.top}) - (${n.width},${n.height})`),this.startW=n.width,this.startH=n.height,this.handleX=e.offsetLeft,this.handleY=e.offsetTop,e.style.cursor="grabbing"},e.onpointermove=s=>{if(!this.isDragging)return;const n=s.clientX-this.startX,i=s.clientY-this.startY;t.style.width=`${this.startW+n-e.clientWidth}px`,t.style.height=`${this.startH+i-e.clientHeight}px`,e.style.left=`${this.handleX+n}px`,e.style.top=`${this.handleY+i}px`,e.style.margin="0"},e.onpointerup=async s=>{if(this.isDragging=!1,e.releasePointerCapture(s.pointerId),e.style.cursor="grab",this.onResizeDone!==void 0){const n=t.getBoundingClientRect();await this.onResizeDone(`${n.width-this.startW}`,`${n.height-this.startH}`)}}}}class oe{get iconFileName(){return this.id===null&&!Number.isNaN(this.id)?`${this.name}_${this.idAsText}.png`:`${this.name}_${this.id}.png`}constructor(e=0,t=""){this.ns=D.None,this.id=0,this.name="",this.contentURL="",this.iconURL="",this.idAsText="",this.idAttributeForHTML="",this.id=e,this.name=t}parseFromImgName(e){let t=e.indexOf("_");if(t>=0){const s=e.substring(0,t);let n=e.substring(t+1);if(t=n.indexOf("."),t>=0)return n=n.substring(0,t),this.id=Number.parseInt(n),this.name=s,this.idAsText=Number.isNaN(this.id)?n:"",!0}return!1}}class es{constructor(){this.itemName="",this.chNames=new Array,this.index=-1}reset(){this.itemName="",this.chNames=new Array,this.index=-1,this.onScroll=null}toCombo(e,t,s){this.reset();const n=`.${e}`,i=document.querySelectorAll(`${n} div[title*="${s}"]`);let o=-1,l="";for(const r of i){const c=r;console.log(c.title),o++;const h=c.title.trim(),d=h,p=`
 <option value="${h}"${o===0?" selected":""}>${d}</option>
`.trim();l+=p,this.chNames.push(d)}if(o===-1)return null;const a=document.createElement("select");return a.id=t,a.className=t,a.innerHTML=l,this.itemName=e,a}addEvent(e,t){e.addEventListener("change",s=>{const i=s.target.value;this.chNames.find(l=>l===i)&&this.scrollAction(i)}),this.onScroll=t}findFirst(){return this.chNames.length===0?!1:(this.index=0,this.scrollAction(this.chNames[this.index]),!0)}scroll(e){const t=`.${this.itemName}`,s=document.querySelector(`${t} div[title="${e}"]`);if(s===null)return null;const n=s.closest(t);return n===null?null:(n.scrollIntoView({behavior:"smooth",block:"center"}),s)}scrollAction(e){const t=this.scroll(e);t&&this.onScroll!==null&&this.onScroll(t)}}class Ne{constructor(){this.uiInfo=new pe,this.charFinder=new es,this.parentName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new C().SaveSetting(e)}}MakeList(){}async LoadList(e){const n=(await new ke().loadJson(e)).map(o=>Object.assign(new oe,o)),i=new Ne;return i.chList=n,this.uiInfo.copyTo(i.uiInfo),i}findByNs(e){return e===D.None?void 0:this.chList.filter(s=>s.ns===e)}async toHTML(e){if(!this.chList)return"";this.htmlMaker=new L;let t=0;for(const s of this.chList){t++;const n=`chuid${t}`;s.idAttributeForHTML=n;const i="",o=new tt;o.imgSrc=i,o.imgFile=s.iconFileName;const l=new J;l.props.name=this.itemCssClassName(),l.props.id=n,l.props.className=this.imgCssClassName(),l.props.option.setImg(o),l.props.option.toolTip=s.name,l.props.option.onSelect=a=>{this.setSelectedItem(a.item.props.id)},this.htmlMaker.add(l)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createSelectorBox(e,t,s){this.parentName=t;const n=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="${this.charOpenUrlCssClassName()}">URL</button>
<button id="char-dlg-close">閉じる</button>
`),i=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${s}
    <label id="char-dlg-chinfo">未選択</label>
    <input type="text" id="${this.charSeachInputCssClassName()}" placeholder="キャラ名検索...">
    ${n}
</div>`,o=new j;o.title="<"+e+">";const l=o.NewDialog(t,this.dlgCssClassName());return o.SetContent(t,i),this.applyCss(),o.EnableEventHandlers(),o.onMoveDone=this.moverOnMoveDone,l}addEventHandlers(e){document.getElementById(this.charSeachInputCssClassName()).oninput=t=>{if(t!==null&&t.target!==null){const s=t.target;console.log(s.value);const n=s.value,i=this.charSeachComboCssClassName(),o=document.getElementById(i);o!==null&&o.parentNode?.removeChild(o);const l=this.charFinder.toCombo(this.itemCssClassName(),i,n);if(l!==null){const a=document.getElementById(this.dlgContentCssClassName());a!==null&&(a.appendChild(l),this.charFinder.addEvent(l,r=>{const h=r.parentElement.getAttribute("item-id");this.htmlMaker.SelectByID(this.itemCssClassName(),h)}),this.charFinder.findFirst())}}},document.getElementById(this.charOpenUrlCssClassName()).onclick=async()=>{if(this.selectedCh===void 0)return;const t=this.chList.find(s=>this.selectedCh.idAttributeForHTML===s.idAttributeForHTML);if(t){this.charOpenUrlCssClassName();const s=new me;if(s.setParent(this.dlgCssClassName()),s.setYesNo(),await s.showWait(`${t.name} をブラウザで開いてよろしいですか？`)===N.Yes){const i=t.contentURL;window.open(i,"_blank")}}},document.getElementById("char-dlg-close").onclick=()=>{document.getElementById(this.parentName).hidden=!0}}addItemEventHandlers(){const e=this.htmlMaker.GetIdByIndex(0);this.htmlMaker.SelectByID(this.itemCssClassName(),e),this.htmlMaker.enableEvents(this.itemCssClassName()),this.setSelectedItem(e)}setSelectedItem(e){const t=this.chList.find(s=>e===s.idAttributeForHTML);t&&(document.getElementById("char-dlg-chinfo").textContent=t.name,this.selectedCh=t)}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}itemCssClassName(){return"char-item"}imgCssClassName(){return"base"}listCssClassName(){return"char-list"}dlgContentCssClassName(){return"char-dlg-content"}dlgCssClassName(){return"char-dlg"}charSeachInputCssClassName(){return"char-search-input"}charSeachComboCssClassName(){return"char-search-combo"}charOpenUrlCssClassName(){return"char-open-url"}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=parseInt(this.uiInfo.left),i=parseInt(this.uiInfo.top),o=document.createElement("style");o.textContent=`
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
`.trim(),document.head.appendChild(o);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}}class te{constructor(){this.ns=D.None,this.id=0,this.name="",this.contentURL="",this.iconURL=""}static toJsonText(e){const t=te.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new te;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}static fromJsonInst(e){const t=new oe;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}}class Ie{constructor(){this.title="",this.key="",this.selectionPair=[],this.selectedVal="",this.initScoreVal=0,this.mulScoreVal=0,this.available=!1}get stdScore(){const e=this.selectedVal.length>=1?this.selectedVal:"1",t=parseInt(e);return this.initScoreVal+t*this.mulScoreVal}get selectedText(){if(this.selectionPair.length!==0&&this.selectedVal!=="")for(const e of this.selectionPair){const t=e.split("/");if(t[1]===this.selectedVal)return t[0]}}}class A{constructor(){this.items=new Array,this.allow=new Map,this.roleText="",this.comboText=""}makeDemoLvText(e){let t="";for(let s=1;s<=100;s++)t+=`"${e}${s}/${s}",`;return t=t.substring(0,t.length-1),t}load(){const e=this.makeDemoLvText("Lv"),t=this.makeDemoLvText("Lv"),s=this.makeDemoLvText(""),n=`
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
`,o=JSON.parse(n).map(l=>Object.assign(new Ie,l));this.items=o}save(){console.log(JSON.stringify(this,null,2))}clone(){const e=new A;for(const t of this.items){const s=JSON.stringify(t,null,2),n=JSON.parse(s);e.items.push(n)}return e}static copy(e,t,s=!1){for(let n=0;n<e.items.length;n++){const i=e.items[n],o=s?new Ie:t.items[n];o.title=i.title,o.key=i.key,o.selectionPair=i.selectionPair,o.selectedVal=i.selectedVal,o.initScoreVal=i.initScoreVal,o.mulScoreVal=i.mulScoreVal,o.available=i.available,s&&t.items.push(o)}}set(e,t){const s=this.items.find(n=>n.key===e);return s?(s.selectedVal=t,!0):!1}get stdScore(){let e=0;for(const t of this.items)t.available&&(e+=t.stdScore);return e}get allAvailable(){for(const e of this.items)if(e.available===!1)return!1;return!0}static calcScore(e,t){const s=t.split("+");let n=0;for(const i of s){const o=i.trim();if(o.endsWith("()")){const l=o.slice(0,-2);typeof e[l]=="function"?n+=e[l]():console.warn(`関数 '${l}' が存在しません`)}else{const l=e[o];typeof l=="number"?n+=l:Array.isArray(l)?n+=l.reduce((a,r)=>a+r,0):console.warn(`プロパティ '${o}' が数値ではありません`)}}return n}static calcScoreAdvanced(e,t){const s=Object.keys(e),n=s.map(o=>e[o]);return new Function(...s,`return ${t};`)(...n)}toInst(e){return(n=>{const i=class{constructor(){n.forEach((o,l)=>{this[l]=o})}};return new i})(e)}}class ts{constructor(){this.intervalMs=1e3,this.isOneShot=!0,this.intervalTimer=null}start(e,t){this.intervalTimer!==null&&this.clear(),this.intervalTimer=setTimeout(async()=>{t!==void 0&&(await t(e)||this.clear()),this.isOneShot===!0&&this.clear()},this.intervalMs)}clear(){clearTimeout(this.intervalTimer),this.intervalTimer=null}}const le={Resource:"Resource",ScoreUI:"ScoreUI"},de={Sequence:"Sequence",Text:"Text"};class kt{constructor(){this.key="",this.text=""}}class Tt extends kt{constructor(){super(...arguments),this.comment=""}}class St extends kt{constructor(){super(...arguments),this.selectType=de.Sequence,this.start="",this.end="",this.step="",this.keyValue=""}}class Ae{constructor(){this.resItem=new Tt,this.scItem=new St}get isScoreAvail(){if(this.scItem.key.trim().length===0||this.scItem.text.trim().length===0)return!1;if(this.scItem.selectType===de.Sequence){if(this.scItem.start.trim().length===0||this.scItem.end.trim().length===0||this.scItem.step.trim().length===0)return!1}else if(this.scItem.keyValue.trim().length===0)return!1;return!0}}class $t{constructor(){this.gameType=V.none,this.itemList=new Array,this.resLogToItem=e=>{const t=e;for(const s of t.inst){const n=new Ae;n.owner=this,n.resItem=s,this.itemList.push(n)}},this.scLogToItem=e=>{const t=e;if(t.gameType===this.gameType)for(const s of t.inst){const n=new Ae;n.owner=this,n.scItem=s,this.itemList.push(n)}},this.editorConfigs=[{editorType:le.Resource,logType:ue.ResourceEditAction,fromJsonText:_e.fromJsonText,logToItem:this.resLogToItem},{editorType:le.ScoreUI,logType:ue.ScoreEditAction,fromJsonText:Qe.fromJsonText,logToItem:this.scLogToItem}],this.actEditor=this.editorConfigs[0]}init(){for(let e=0;e<10;e++){const t=new Ae;t.owner=this,this.itemList.push(t)}}async load(e,t){const s=this.getEditor(e);if(s===void 0)return;this.actEditor=s!==void 0?s:this.editorConfigs[0],this.gameType=t;const n=s.logType,o=await(await ie()).get(n);if(o===null)return;const l=n,a=new Map,r=new Array;this.usingLog(l,o,a,r),this.itemList=new Array;for(const[c,h]of a){const d=s.fromJsonText(h.log);s.logToItem(d)}this.itemList.length===0&&this.init()}async loadUnused(e){const s=await(await ie()).get(e);if(s===null)return null;const n=new Map,i=new Array;return this.usingLog(e,s,n,i),i}usingLog(e,t,s,n){for(const i of t){let l=this.actEditor.fromJsonText(i.log).logType,a=!1,r=!1;switch(l){case se.None:break;case se.Add:a=!0;break;case se.Update:a=!0;break;case se.Delete:a=!0,r=!0;break}if(a)if(r){if(s.has(e)){const c=s.get(e);n.push(c),s.delete(e)}}else{if(s.has(e)){const c=s.get(e);n.push(c),s.delete(e)}s.set(e,i)}}}getEditor(e){return this.editorConfigs.find(s=>s.editorType===e)}get editorType(){return this.actEditor.editorType}}class gt extends $t{constructor(){super(...arguments),this.uiInfo=new pe,this.parentName="",this.saveTimer=null,this.onSave=async e=>(console.log(`${e.parentName}`),!1),this.setColKey=(e,t,s,n)=>{const i=new Z;i.value=t.owner.editorType==le.Resource?t.resItem.key:t.scItem.key,i.placeholder="キー",n.getCell(e,s).typeInfo.setInput(i),n.getCell(e,s).className=this.itemKeyCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.setColValue=(e,t,s,n)=>{const i=new Z;i.value=t.owner.editorType==le.Resource?t.resItem.text:t.scItem.text,i.placeholder="文字列",n.getCell(e,s).typeInfo.setInput(i),n.getCell(e,s).className=this.itemDispCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.setColComment=(e,t,s,n)=>{const i=new Z;i.value=t.resItem.comment,i.placeholder="コメント",n.getCell(e,s).typeInfo.setInput(i),n.getCell(e,s).className=this.itemCommentCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.setColSelectType=(e,t,s,n)=>{const i=new st;i.selectionPair=[`連続/${de.Sequence}`,`文字列/${de.Text}`],i.selectedItem=t.scItem.selectType,i.classify="selectType",n.getCell(e,s).typeInfo.setCombo(i),n.getCell(e,s).className=this.itemSelectTypeCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.setColSelectStart=(e,t,s,n)=>{const i=new Z;i.value=t.scItem.start,i.placeholder="開始",n.getCell(e,s).typeInfo.setInput(i),n.getCell(e,s).className=this.itemSeqTypeStartCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.setColSelectEnd=(e,t,s,n)=>{const i=new Z;i.value=t.scItem.end,i.placeholder="終了",n.getCell(e,s).typeInfo.setInput(i),n.getCell(e,s).className=this.itemSeqTypeEndCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.setColSelectStep=(e,t,s,n)=>{const i=new Z;i.value=t.scItem.step,i.placeholder="ステップ",n.getCell(e,s).typeInfo.setInput(i),n.getCell(e,s).className=this.itemSeqTypeStepCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.setColText=(e,t,s,n)=>{const i=new Z;i.value=t.scItem.keyValue,i.placeholder="key/valueを&quot;,&quot;で区切った文字列",n.getCell(e,s).typeInfo.setInput(i),n.getCell(e,s).className=this.itemTextTypeCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.setColDelBtn=(e,t,s,n)=>{n.getCell(e,s).typeInfo.setButton("削除"),n.getCell(e,s).className=this.itemDeleteCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.makeResLog=async e=>{const t=new _e;t.logType=se.Add;for(const i of e){const o=new Tt;for(const l of i.cells)for(const a of l.children){if(a.className===this.itemDeleteCssClassName())continue;const r=this.table.getElemValue(a)||"";switch(a.className){case this.itemKeyCssClassName():o.key=r;break;case this.itemDispCssClassName():o.text=r;break;case this.itemCommentCssClassName():o.comment=r;break}}t.inst.push(o)}const s=_e.toJsonText(t);await(await ie()).put(ue.ResourceEditAction,s)},this.makeScoreLog=async e=>{const t=new Qe;t.logType=se.Add,t.gameType=this.gameType;for(const i of e){const o=new St;for(const l of i.cells)for(const a of l.children){if(a.className===this.itemDeleteCssClassName())continue;const r=this.table.getElemValue(a)||"";switch(a.className){case this.itemKeyCssClassName():o.key=r;break;case this.itemDispCssClassName():o.text=r;break;case this.itemSelectTypeCssClassName():o.selectType=r;break;case this.itemSeqTypeStartCssClassName():o.start=r;break;case this.itemSeqTypeEndCssClassName():o.end=r;break;case this.itemSeqTypeStepCssClassName():o.step=r;break;case this.itemTextTypeCssClassName():o.keyValue=r;break}}t.inst.push(o)}const s=Qe.toJsonText(t);await(await ie()).put(ue.ScoreEditAction,s)},this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new C().SaveSetting(e)},this.resizerOnResizeDone=async(e,t,s)=>{console.log(`[${e.className}] resized (${t}, ${s})`);const n=parseInt(s),i=document.getElementById(this.dlgContentCssClassName());if(i!==null){i.style.width===""?i.offsetWidth:parseInt(i.style.width),i.style.maxWidth="none";const o=i.style.height===""?i.offsetHeight:parseInt(i.style.height);i.style.maxHeight="none",i.style.height=`${o+n}px`;const l=i.querySelectorAll(`.${this.tableCssClassName()}`);if(l!==null){const a=l[0],r=a.style.height===""?a.offsetHeight:parseInt(a.style.height);a.style.maxHeight="none",a.style.height=`${r+n}px`}}},this.onCopyPaste=async(e,t)=>{switch(console.log(`[${e.className}] selected [${t}]`),t){case ne.Copy:await this.table.toClipboard();break;case ne.Paste:await this.table.fromClipboard();break}}}async startAutoSave(){this.saveTimer=new ts,this.saveTimer.intervalMs=1e3,this.saveTimer.isOneShot=!1,this.saveTimer.start(this,this.onSave)}setRow(e,t,s){const n=this.editItems;if(n===void 0)return;let i=-1;for(const o of n)i++,o.colConfig(i,e,t,s)}makeResEditItems(){return[{className:"",colConfig:this.setColKey},{className:"",colConfig:this.setColValue},{className:"",colConfig:this.setColComment},{className:"",colConfig:this.setColDelBtn}]}makeScoreEditItems(){return[{className:"",colConfig:this.setColKey},{className:"",colConfig:this.setColValue},{className:"",colConfig:this.setColSelectType},{className:"",colConfig:this.setColSelectStart},{className:"",colConfig:this.setColSelectEnd},{className:"",colConfig:this.setColSelectStep},{className:"",colConfig:this.setColText},{className:"",colConfig:this.setColDelBtn}]}toHTML(e,t){if(!this.itemList)return"";this.editItems=e,this.makeLog=t;const s=e.length,n=new W;if(this.itemList.length>=1)n.makeDim(s,this.itemList.length),this.itemList.forEach((a,r)=>{this.setRow(a,r,n)}),n.makeRowTemplate(this.tableRowCssClassName()),this.table=n;else{n.makeDim(s,1);const a=new Ae;this.setRow(a,0,n),n.makeRowTemplate(this.tableRowCssClassName()),n.clearRows(),this.table=n}const i=this.tableCssClassName(),o=this.table.ToScrollHTML(i,i);this.htmlMaker=new L;const l=new J;return l.props.name="",l.props.id=i,l.props.className=i,l.props.option.setTable(o),l.props.option.onSelect=async a=>{switch(console.log(`classify = ${a.classify} targetId = ${a.targetId}`),a.classify){case this.itemSeqTypeStartCssClassName():await this.onSeqEnter(a);break;case this.itemSeqTypeEndCssClassName():await this.onSeqEnter(a);break;case this.itemSeqTypeStepCssClassName():await this.onSeqEnter(a);break;case this.itemDeleteCssClassName():const r=new me;r.setParent(this.dlgCssClassName());let c=N.None;switch(r.setYesNo(),c=await r.showWait(`${a.targetId} を削除しますか？`),c){case N.Yes:break;case N.No:return;case N.Cancel:return}const h=parseInt(a.targetId);h>=1&&(n.deleteRow(h),n.redimAllRows(),this.itemList.splice(h-this.table.firstRowIndex,1));break}},this.htmlMaker.add(l),this.htmlMaker.ToHTML()}async onSeqEnter(e){if(e.KeyEnter===re.Special){const t=this.table.getCellRect(e.parentElem),s=this.table.getTableOwnerRect(e.parentElem),n=this.table.makeCallerName(e.classify,e.targetId),i=this.table.getCallerCellElem(n);let o="";i!==null&&(o=i.value);const l=new Array;l.push("1/1");for(let r=1;r<=30;r++){const c=`${r*10}`;l.push(`${c}/${c}`)}const a=new jt;a.setListener("updn",this.dlgContentCssClassName(),n),a.setSelectedByValue(o,l),a.applyCss(),a.show(`${parseInt(t.left)-parseInt(s.left)+10}`,`${parseInt(t.top)-parseInt(s.top)+10}`),a.enableEvents(r=>{console.log(`[onApply] ${r.callerName} ${r.result}`);const c=this.table.getCallerCellElem(r.callerName);if(c!==null){const h=c;h.value=r.result}a.dispose()},r=>{console.log(`[onUp] ${r.callerName} ${r.result}`)},r=>{console.log(`[onDown] ${r.callerName} ${r.result}`)})}}createEditorBox(e,t,s){this.parentName=t;const n=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="${this.textAddCssClassName()}">追加</button>
<button id="${this.applyCssClassName()}">保存</button>
`),i=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
   ${n}
   ${s}
</div>`,o=new j;o.title="<"+e+">",o.SetB2Type(he.CopyPaste,this.onCopyPaste);const l=o.NewDialog(t,this.dlgCssClassName());return o.SetContent(t,i,!1),this.applyCss(),o.EnableEventHandlers(),o.onMoveDone=this.moverOnMoveDone,this.dialogDesc=o,l}addEventHandlers(e){document.getElementById(this.textAddCssClassName()).onclick=async()=>{const t=this.tableRowCssClassName();this.table.addRow(t)},document.getElementById(this.applyCssClassName()).onclick=async()=>{const t=this.table.getRowElems();t!==null&&await this.makeLog(t)}}addItemEventHandlers(){this.htmlMaker.enableTableEvents(this.tableCssClassName())}enableResize(){this.dialogDesc.onResizeDone=this.resizerOnResizeDone,this.dialogDesc.EnableResize()}textAddCssClassName(){return`${this.actEditor.editorType}-edit-add`}applyCssClassName(){return`${this.actEditor.editorType}-edit-apply`}itemKeyCssClassName(){return`${this.tableCssClassName()}-key`}itemDispCssClassName(){return`${this.tableCssClassName()}-text`}itemCommentCssClassName(){return`${this.tableCssClassName()}-comment`}itemSelectTypeCssClassName(){return`${this.tableCssClassName()}-select-type`}itemSeqTypeStartCssClassName(){return`${this.tableCssClassName()}-seq-type-start`}itemSeqTypeEndCssClassName(){return`${this.tableCssClassName()}-seq-type-end`}itemSeqTypeStepCssClassName(){return`${this.tableCssClassName()}-seq-type-step`}itemTextTypeCssClassName(){return`${this.tableCssClassName()}-text-type`}itemDeleteCssClassName(){return`${this.tableCssClassName()}-delete`}tableRowCssClassName(){return`${this.actEditor.editorType}-edit-table-row`}tableCssClassName(){return`${this.actEditor.editorType}-edit-table`}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return`${this.actEditor.editorType}-edit-dlg`}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=document.createElement("style");s.textContent=`
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
`.trim(),document.head.appendChild(s);const n=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,n)}}const se={None:"None",Add:"Add",Delete:"Delete",Update:"Update"};class Et{constructor(){this.logType=se.None}}class _e extends Et{constructor(){super(...arguments),this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class Qe extends Et{constructor(){super(...arguments),this.gameType=V.none,this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class Ve{constructor(){this.fileNames=null,this.minMap=new Map,this.maxMap=new Map,this.rangeMap=new Map,this.digLenMax=0,this.nMul=0,this.table=[{key:b.pqStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:b.pqStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:b.pqStatusREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:b.pqTokkunHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:b.pqTokkunATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:b.pqTokkunREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:b.pqTokuSp1,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:b.pqTokuSp2,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:b.mmStatusFGT,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusPDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusACC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusEVA,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusCRI,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusMDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusCRD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusDEF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusSPD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmAbilityDEX,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmAbilityMGC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmAbilityDUR,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmRole,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}}],this.rolePriolity=[{roleKey:Me.RlAttacker,priority:He.priHi,statusKey:[b.mmAbilitySTR,b.mmStatusATK,b.mmStatusSPD]},{roleKey:Me.RlHealer,priority:He.priHi,statusKey:[b.mmAbilityMGC,b.mmStatusMDF,b.mmStatusHP]},{roleKey:Me.RlDebuffer,priority:He.priHi,statusKey:[b.mmAbilityDEX,b.mmStatusACC,b.mmStatusHP]},{roleKey:Me.RlBuffer,priority:He.priHi,statusKey:[b.mmStatusPDF,b.mmStatusHP,b.mmStatusDEF]}]}async loadDB(e){const t=new ke,s=await t.loadBinFile(e);if(t.isWebRunning)this.zip=await window.JSZip.loadAsync(s);else{const{loadZipNode:n}=await import(t.nodeToolsImportFilename);this.zip=await n(s)}return this.fileNames=Object.keys(this.zip.files),!0}async enumStatus(e){if(this.fileNames!==null)for(const t of this.fileNames){const s=await this.getFileContent(t);if(s===null||e===void 0)continue;if(!e(t,s))break}}async debugCombo(){await this.enumStatus((e,t)=>{for(const s of t)s.useCombo&&console.log(`${e}:[${s.value}]`);return!0})}async loadAuxScoreSet(e){const t=new $t;await t.load(le.ScoreUI,e);const s=new A;for(const n of t.itemList){const i=n.scItem;if(!n.isScoreAvail)continue;const o=new Ie;switch(o.title=i.text,o.key=i.key,o.available=!1,i.selectType){case de.Sequence:const l=this.auxScoreTextToValue(i.start),a=this.auxScoreTextToValue(i.end),r=this.auxScoreTextToValue(i.step),c=new Array;for(let u=l;u<=a;u+=r)c.push(`${u}/${u}`);o.selectionPair=c,o.selectedVal=`${l}`,o.initScoreVal=l,o.mulScoreVal=r,c.length>=1&&(o.available=!1);break;case de.Text:const h=i.keyValue.split(",");let d="";for(const u of h){const p=u.split("/");if(p.length>=2){d=p[1];break}}o.selectionPair=h,o.selectedVal=d,o.initScoreVal=0,o.mulScoreVal=0,h.length>=1&&(o.available=!1);break}s.items.push(o)}return console.log(s),s}auxScoreTextToValue(e){const t=e.split("/"),s=t.length===1?t[0]:t[1];return parseInt(s)}async getMinMax(){await this.enumStatus((e,t)=>{for(const s of t){if(s.useCombo)continue;let n=parseInt(this.itemValue(s));if(!this.minMap.has(s.key))this.minMap.set(s.key,n);else{const i=this.minMap.get(s.key);i===void 0?this.minMap.set(s.key,n):i>n&&this.minMap.set(s.key,n)}if(!this.maxMap.has(s.key))this.maxMap.set(s.key,n);else{const i=this.maxMap.get(s.key);i===void 0?this.maxMap.set(s.key,n):i<n&&this.maxMap.set(s.key,n)}}return!0})}async getRanges(){await this.getMinMax(),this.digLenMax=0;for(const[e,t]of this.minMap){const s=t,n=this.maxMap.get(e);let i=0;if(s!==void 0&&n!==void 0&&(i=n-s),i<=0&&(i=1),this.rangeMap.set(e,i),n!==void 0){const o=Math.log10(n);o>this.digLenMax&&(this.digLenMax=o)}}this.nMul=this.digLenMax>0?Math.pow(10,Math.ceil(this.digLenMax)):1;for(const[e,t]of this.minMap)console.log(`[${e}] = ${this.minMap.get(e)},${this.maxMap.get(e)} ${this.rangeMap.get(e)}`);console.log(`digLenMax=[${this.digLenMax}] nMul=[${this.nMul}]`)}stdBy(e,t){let s,n;if(this.rangeMap.has(e)&&(s=this.rangeMap.get(e)),this.minMap.has(e)&&(n=this.minMap.get(e)),s===void 0||n===void 0||this.isNumeric(t)===!1)return null;s<=0&&(s=1);const i=(parseInt(t)-n)*s;return this.nMul*i}getFilename(e){let t=null;for(let s of this.fileNames){let n=s.indexOf("_");if(n>=0){let i=s.substring(n+1);if(n=i.indexOf("."),n>=0&&(i=i.substring(0,n)),i===e){t=s;break}}}return t}async getFileContent(e){if(e===null)return null;const t=this.zip.file(e);if(t){const s=await t.async("string");return JSON.parse(s)}return null}async getStatus(e){this.digLenMax===0&&await this.getRanges();const t=this.getFilename(e);if(t===null)return null;const s=await this.getFileContent(t);if(s===null)return null;let n=null;for(const o of s)if(!o.useCombo){for(const l of this.rolePriolity)if(l.statusKey.find(r=>r===o.key)){n=l,console.log(`find role : ${n.roleKey}`);break}if(n!==null)break}const i=new A;if(n!==null)for(const o of s){if(o.useCombo)continue;if(n.statusKey.find(a=>a===o.key)){const a=this.table.find(r=>r.key===o.key);if(a){const r=a.scoreFunc(o.key,this.itemValue(o));r.title=o.disp,r.key=o.key,r.selectedVal="1",i.items.push(r)}}}else for(const o of s){if(o.useCombo)continue;const l=this.table.find(a=>a.key===o.key);if(l){const a=l.scoreFunc(o.key,this.itemValue(o));a.title=o.disp,a.key=o.key,a.selectedVal="1",i.items.push(a)}}return i}async getComboKeywords(e){let t=0;const s=new Map,n=new Map;for(const i of e){const o=this.getFilename(i);if(o===null)return null;const l=await this.getFileContent(o);if(l===null)return null;const a=new Map;for(const r of l){if(!r.useCombo)continue;const c=r.value.split(",");for(const h of c)if(a.has(h)===!1)a.set(h,1);else{const d=a.get(h);a.set(h,d+1)}}if(a.size===0){t=0,n.clear();continue}for(const[r,c]of a)if(n.has(r)===!1)n.set(r,c);else{const h=n.get(r);n.set(r,h+c)}if(t++,!(t<=2))for(const[r,c]of n)c>=3&&s.set(r,c)}}async debugCheckCombo(){const e=new Array;e.push("119599"),e.push("119603"),e.push("119624"),await this.getComboKeywords(e)}isNumeric(e){return e.trim()===""?!1:!isNaN(Number(e))}itemValue(e){return e.converted===""?e.value:e.converted}toScoreMaxNum(e,t){return this.isNumeric(t)===!1?null:Ve.useStdConv?this.stdBy(e,t):t!==""?parseInt(t):1}scoreFunc(e,t){const s=new Ie;if(e===null)return s;s.mulScoreVal=e/t;for(let n=1;n<=t;n++){const i=Math.ceil(e/t*n);s.selectionPair.push(`Lv${n}/${n}`),n===1&&(s.initScoreVal=i)}return s.available=!0,s}scoreFuncOld(e,t){const s=new Ie;if(this.isNumeric(e)===!1)return s;let n=e!==""?parseInt(e):1;s.mulScoreVal=n/t;for(let i=1;i<=t;i++){const o=Math.ceil(n/t*i);s.selectionPair.push(`Lv${i}/${i}`),i===1&&(s.initScoreVal=o)}return s.available=!0,s}puyoToku(e){return e==="enable"?10:1}}Ve.useStdConv=!1;const He={priHi:0},ee={None:"None",UI:"UI",Menu:"Menu"};class Y{constructor(){this.dockType=ee.None,this.iconFileName="",this.toolTip="",this.idAttributeForHTML=""}get labelWrap(){let e=this.toolTip,t=this.toolTip.length;if(t>3){const s=t%2===0?t/2:t/2+1,n=e.substring(0,s),i=e.substring(s);e=n+`
`+i}return e}setAsDlg(e,t){this.dockType=ee.UI,this.dlg=e,this.toolTip=t}setAsMenu(e){this.dockType=ee.Menu,this.toolTip=e}get isUIType(){return this.dockType==ee.UI}get isMenuType(){return this.dockType==ee.Menu}ToggleStatus(){this.dlg===void 0||this.dlg===null||(this.dlg.hidden=!this.dlg.hidden)}}class Je{constructor(){this.items=new Array,this.parentName="",this.listName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new C().SaveSetting(e,!1)}}add(e){return e.dockType==ee.UI&&(e.dlgParent=e.dlg.parentElement),this.items.push(e),!0}async toHTML(e,t=null){if(!this.items)return"";this.listName=e,this.htmlMaker=new L;let s=0;for(const n of this.items){s++;const i=`dock-uid${s}`;n.idAttributeForHTML=i;const o=new J,l=n.labelWrap;o.props.name=this.itemCssClassName(),o.props.id=i,o.props.className=this.imgCssClassName(),o.props.option.toolTip=n.toolTip,o.props.option.setLabel(l,!0),o.props.option.onSelect=a=>{const r=this.items.find(c=>a.item.props.id===c.idAttributeForHTML);if(r&&(this.selectedItem=r,this.onApply!==void 0)){const c=new ss;c.item=this.selectedItem,this.onApply(c)}},this.htmlMaker.add(o)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createDockBox(e,t,s=!0){this.parentName=e;const n=`<div class="${this.parentName}-dlg-content">
    ${t}
</div>`,i=new j;i.SetB3Type(be.Hide);const o=i.NewDialog(e,this.dlgCssClassName());return i.SetContent(e,n,s),this.applyCss(),i.EnableEventHandlers(),i.onMoveDone=this.moverOnMoveDone,o}addItemClickHandlers(e){this.onApply=e,this.htmlMaker.SelectByID(this.itemCssClassName(),this.htmlMaker.GetIdByIndex(0)),this.htmlMaker.enableEvents(this.itemCssClassName())}stdApplyAction(e){return e.item.dlgParent===null?(e.cancel=!0,!1):(console.log(`selected item = [${e.item.toolTip}::${e.item.dockType}]`),e.item.isUIType&&(new C().MoveHiestLayer(e.item.dlgParent),e.item.dlgParent.hidden&&(e.item.dlgParent.hidden=!1)),!0)}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=48,i=this.items.length,o=document.createElement("style");o.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,60,10,C.ignoreIndex)}
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
`.trim(),document.head.appendChild(o);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}listCssClassName(){return`${this.listName}-list`}dlgCssClassName(){return`${this.parentName}-dlg`}static GetDialogInfo(e){return j.GetDialogInfo(e)}static SetDialogInfo(e){return j.SetDialogInfo(e)}async InitZOrder(e){await e.ForEachAsync(t=>{const s=Je.GetDialogInfo(t),n=e.FindByName(t);return s!==null&&(s.zindex=n!==null?n.style.zIndex:""),console.log(s),!0})}}class ss{constructor(){this.cancel=!1}}class Pe{constructor(){this.dockType=ee.None,this.iconFileName="",this.toolTip="",this.dlgName="",this.hidden=!1,this.zIndex="",this.topPx="",this.leftPx=""}static toJsonText(e){const t=Pe.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new Pe;return t.dockType=e.dockType,t.iconFileName=e.iconFileName,t.toolTip=e.toolTip,e.isUIType&&(t.dlgName=e.dlgParent.id,t.hidden=typeof e.dlgParent.hidden=="string"?!1:e.dlgParent.hidden,t.zIndex=e.dlgParent.style.zIndex,t.leftPx=e.dlgParent.style.left,t.topPx=e.dlgParent.style.top),t}}class Ue{static toJsonText(e){const t=Ue.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new Ue;t.items=new Array;for(const s of e.items)t.items.push(Pe.toJsonInst(s));return t}restore(e,t){for(const s of this.items){const n=e.items.find(i=>i.dlg.id===s.dlgName);n&&(n.dockType=s.dockType,n.iconFileName=s.iconFileName,n.toolTip=s.toolTip,n.isUIType&&(n.dlgParent.hidden=typeof s.hidden=="string"?!1:s.hidden,n.dlgParent.style.zIndex=s.zIndex,n.dlgParent.style.left=s.leftPx,n.dlgParent.style.top=s.topPx))}t.ReOrder()}}class ns{convTitle(e){if(e.length<=8)return e;const t="スキル";return e.endsWith(t)?`${e.substring(0,e.length-t.length)}<br>${t}`:e}}let qe=null;function xt(){return qe||(qe=new ns,console.log("ConvertTools instance created (Singleton)")),qe}class je{constructor(){this.chUuid="",this.ch=new oe}}class is{constructor(){this.chList=new Array,this.uiInfo=new pe,this.parentName="",this.editingRowIndex=-1,this.scoreGrid=new qt,this.gridHeaderName="headerName",this.gridFooterName="footerName",this.gridName="gridName",this.gridRowName="gridRowName",this.keyClassName="keyClassName",this.valueClassName="valueClassName",this.onSelect=async e=>{console.log(`classify = ${e.classify} selectedValue = ${e.selectedValue} targetId = ${e.targetId}`);const t=this.editingCh;if(t===null)return;const n=t.scoreSet.items.find(i=>i.key===e.classify);n&&(n.selectedVal=e.selectedValue)},this.savedScoreSet=new A,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new C().SaveSetting(e)}}async load(){const t=await(await ie()).get(ue.CharSummaryAction);if(t===null)return;const s=new Map,n=new Array;this.usingLog(t,s,n),this.chList=new Array;for(const[i,o]of s){const l=De.fromJsonText(o.log),a=new oe;a.ns=l.ch.ns,a.id=l.ch.id,a.name=l.ch.name,a.contentURL=l.ch.contentURL,a.iconURL=l.ch.iconURL,a.idAsText=l.ch.idAsText,a.idAttributeForHTML=l.ch.idAttributeForHTML;const r=new A;A.copy(l.scoreSet,r,!0);const c=new je;c.chUuid=l.chUuid,c.ch=a,c.scoreSet=r,this.chList.push(c)}}usingLog(e,t,s){for(const n of e){const i=De.fromJsonText(n.log);if(i.chUuid==="")continue;let o=!1,l=!1;switch(i.logType){case K.None:break;case K.Add:o=!0;break;case K.Update:t.has(i.chUuid)?o=!0:o=!1;break;case K.Delete:o=!0,l=!0;break}if(o)if(l){if(t.has(i.chUuid)){t.delete(i.chUuid);const a=t.get(i.chUuid);s.push(a)}}else{if(t.has(i.chUuid)){const a=t.get(i.chUuid);s.push(a),t.delete(i.chUuid)}t.set(i.chUuid,n)}}}sortByScore(){return this.chList.length===0?null:this.chList.sort((t,s)=>s.scoreSet.stdScore-t.scoreSet.stdScore)}async updateCharInfos(e){let t=this.table.firstRowIndex-1;for(const s of this.chList){t++;const n=await e.getImageUrlBy(s.ch.iconFileName,s.ch.ns);n!==null&&this.table.updateRowImage(t,n),this.updateChScoreInfo(t)}this.table.redimAllRows(),t=this.table.firstRowIndex,this.table.selectRow(t),this.table.scroll(t)}setRow(e,t,s){let n=0;const i=new tt;i.imgFile=e.iconFileName,s.getCell(n,t).typeInfo.setImg(i),s.getCell(n,t).className=this.itemIconCssClassName();const o=`${e.name}`;s.getCell(n,t,1).typeInfo.setLabel(o,!1),s.getCell(n,t,1).className=this.itemStatusCssClassName(),n++,s.getCell(n,t).typeInfo.setButton("更新"),s.getCell(n,t).className=this.itemUpdateCssClassName(),s.getCell(n,t).typeInfo.using.itemId=t,s.getCell(n,t,1).typeInfo.setButton("削除"),s.getCell(n,t,1).className=this.itemDeleteCssClassName(),s.getCell(n,t,1).typeInfo.using.itemId=t}toHTML(){if(!this.chList)return"";const e=new W;if(this.chList.length>=1)e.makeDim(2,this.chList.length),e.growCell(0,2),e.growCell(1,2),this.chList.forEach((i,o)=>{const l=i.ch;this.setRow(l,o,e)}),e.makeRowTemplate(this.tableRowCssClassName()),this.table=e;else{e.makeDim(2,1),e.growCell(0,2),e.growCell(1,2);const i=new oe;this.setRow(i,0,e),e.makeRowTemplate(this.tableRowCssClassName()),e.clearRows(),this.table=e}const t=this.tableCssClassName(),s=this.table.ToScrollHTML(t,"");this.htmlMaker=new L;const n=new J;return n.props.name="",n.props.id="0",n.props.className=t,n.props.option.setTable(s),n.props.option.onSelect=async i=>{switch(console.log(`classify = ${i.classify} targetId = ${i.targetId}`),i.classify){case this.itemUpdateCssClassName():await this.onItemEdit(i);break;case this.itemDeleteCssClassName():await this.onItemDelete(i);break}},this.htmlMaker.add(n),this.htmlMaker.ToHTML()}createSummaryBox(e,t,s){this.parentName=t;let n=`
<button id="${this.itemAddCssClassName()}">キャラ追加</button>
`.trim();const i=this.htmlMaker.MakeDefaultToolButtonsHTML(n),o=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${i}
    ${s}
</div>`,l=new j;l.title="<"+e+">";const a=l.NewDialog(t,this.dlgCssClassName());return l.SetContent(t,o),this.applyCss(),l.EnableEventHandlers(),l.onMoveDone=this.moverOnMoveDone,a}addEventHandlers(e,t){this.onAdd=t,document.getElementById(`${this.itemAddCssClassName()}`).onclick=async()=>{if(this.onAdd===void 0)return;const s=new Mt;await this.onAdd(s),s.cancel!==!0&&await this.onItemAdd(s)}}createScoreGrid(e){const t=this.dlgContentCssClassName(),s=xt(),n=this.scoreGrid.makePair();for(const i of e.items){const o=s.convTitle(i.title),l=i.title,a=this.scoreGrid.makeKeyCell(o,this.keyClassName,l),r=new st;r.selectionPair=i.selectionPair,r.selectedItem=i.selectedVal,r.classify=i.key;const c=new Fe;c.makeItems(),c.items[0].typeInfo.setCombo(r),c.items[0].className=this.valueClassName,n.set(a,c)}if(this.scoreGrid.setPair(n),this.scoreGrid.setListener(this.gridName,this.gridRowName,t,this.gridHeaderName,this.gridFooterName),this.scoreGrid.enableEvents(this.onSelect),this.scoreGrid.footerElem!==null){let i=`
<button id="${this.gridFooterName}-okBtn">OK</button>
<button id="${this.gridFooterName}-canBtn">CANCEL</button>
`.trim();this.scoreGrid.footerElem.innerHTML=i,document.getElementById(`${this.gridFooterName}-okBtn`).onclick=async()=>{const o=this.editingCh;o!==null&&(o.scoreSet,this.addActionLog(o,K.Update),this.removeScoreGrid(),this.updateChScoreInfo(this.editingRowIndex))},document.getElementById(`${this.gridFooterName}-canBtn`).onclick=async()=>{const o=this.editingCh;if(o===null)return;const l=o.scoreSet;A.copy(this.savedScoreSet,l),this.removeScoreGrid()}}}removeScoreGrid(){if(this.scoreGrid.headerElem!==null){const e=this.editingRowIndex,t=this.table.getRowElem(e),s=this.table.getCellElems(t),n=this.scoreGrid.headerElem.children[0];s[0][0].appendChild(n)}this.scoreGrid!==null&&(this.scoreGrid.dispose(),this.htmlMaker.setVisible(this.itemAddCssClassName(),!0),this.table.setVisible(!0))}get editingCh(){const e=this.editingRowIndex;return e<this.table.firstRowIndex?null:this.chList[e-this.table.firstRowIndex]}async onItemAdd(e){const t=new me;t.setParent(this.dlgCssClassName());let s=N.None;if(t.setYesNo(),s=await t.showWait(`${e.selectCh.name} を追加しますか？`),s===N.No)return;const n=this.tableRowCssClassName(),i=this.table.addRow(n);if(i<this.table.firstRowIndex)return;this.table.selectRow(i),this.table.updateRowImage(i,e.selectedImg),this.table.scroll(i);const o=new je;o.chUuid=zt(),o.ch=e.selectCh,o.scoreSet=e.scoreSet,this.chList.push(o),this.updateChScoreInfo(i),this.addActionLog(o,K.Add)}async onItemEdit(e){const t=parseInt(e.targetId);if(t<this.table.firstRowIndex)return;this.editingRowIndex=t;const s=this.chList[t-this.table.firstRowIndex].scoreSet;this.savedScoreSet=new A,A.copy(s,this.savedScoreSet,!0),this.createScoreGrid(s),this.htmlMaker.setVisible(this.itemAddCssClassName(),!1),this.table.setVisible(!1);const n=this.table.getRowElem(t),o=this.table.getCellElems(n)[0][0].children[0];this.scoreGrid.headerElem?.appendChild(o)}async onItemDelete(e){const t=parseInt(e.targetId);if(t<this.table.firstRowIndex)return;const s=this.chList[t-this.table.firstRowIndex],n=new me;n.setParent(this.dlgCssClassName());let i=N.None;switch(n.setYesNo(),i=await n.showWait(`${s.ch.name} を削除しますか？`),i){case N.Yes:break;case N.No:return;case N.Cancel:return}this.addActionLog(s,K.Delete),t>=1&&(this.table.deleteRow(t),this.table.redimAllRows(),this.chList.splice(t-this.table.firstRowIndex,1))}async addActionLog(e,t){const s=new De;s.logType=t,s.chUuid=e.chUuid,s.ch=e.ch,s.scoreSet=e.scoreSet;const n=De.toJsonText(s);await(await ie()).put(ue.CharSummaryAction,n)}updateChScoreInfo(e){const t=this.table.getRowElem(e);if(t===null)return;const s=this.table.getCellElems(t);if(s===null)return;const n=this.chList[e-this.table.firstRowIndex].ch.name;this.table.updateText(s[0][1],n);const i=this.getChScoreInfo(e);this.table.updateRowImageToolTip(e,i)}getChScoreInfo(e){const t=e-this.table.firstRowIndex,s=this.chList[t];let n="";for(const i of s.scoreSet.items){console.log(i);let o=i.selectedText;o=o===void 0?"*bug*":o;const l=`${i.title}:${o}`;n!==""&&(n=`${n}
`),n=`${n}${l}`}return n}addItemEventHandlers(){this.htmlMaker.enableTableEvents(this.tableCssClassName())}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}async charStock(e){let t=this.table.getSelectedRow();const s=t!==this.table.invalidRowIndex,n=new me;n.setParent(this.dlgCssClassName());let i=N.None;s?(n.setYesNoCancel(),i=await n.showWait(`${e.selectCh.name} を更新しますか？`)):(n.setYesNo(),i=await n.showWait(`${e.selectCh.name} を追加しますか？`));let o=!1,l=!1;switch(i){case N.Yes:s?(o=!1,l=!0):(o=!0,l=!1);break;case N.No:s?(o=!0,l=!1):(o=!1,l=!1);break;case N.Cancel:return}let a=null;if(o){const r=this.tableRowCssClassName(),c=this.table.addRow(r);if(c>=0){const h=new je;h.ch=e.selectCh,h.scoreSet=e.scoreSet,this.chList.push(h),t=c,this.table.selectRow(c),this.table.updateRowImage(c,e.selectedImg),this.table.scroll(c),a=this.table.getRowElem(c)}}if(l){const r=t-this.table.firstRowIndex,c=this.chList[r];c.scoreSet=e.scoreSet,this.tableRowCssClassName();const h=t;this.table.scroll(h),a=this.table.getRowElem(h)}if(a!==null){const r=this.table.getCellElems(a);if(r){const c=this.getChScoreInfo(t);this.table.updateText(r[0][1],c)}}}itemIconCssClassName(){return`${this.tableCssClassName()}-icon`}itemStatusCssClassName(){return`${this.tableCssClassName()}-status`}itemAddCssClassName(){return`${this.tableCssClassName()}-add`}itemUpdateCssClassName(){return`${this.tableCssClassName()}-update`}itemDeleteCssClassName(){return`${this.tableCssClassName()}-delete`}tableRowCssClassName(){return"char-summary-table-row"}tableCssClassName(){return"char-summary-table"}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return"char-summary-dlg"}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=document.createElement("style");s.textContent=`
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

`.trim(),document.head.appendChild(s);const n=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,n)}}class Mt{constructor(){this.cancel=!1}}const K={None:"None",Add:"Add",Delete:"Delete",Update:"Update"};class De{constructor(){this.logType=K.None,this.chUuid=""}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class yt{static async put(e){try{await navigator.clipboard.writeText(e)}catch(t){return console.error("コピー失敗...",t),!1}return!0}static async get(){let e="";try{e=await navigator.clipboard.readText()}catch(t){return console.error("ペースト失敗...",t),null}return e}}class os{constructor(){this.TextMap=new Map}set(e,t){const s=this.TextMap.has(e);return this.TextMap.set(e,t),s}remove(e){const t=this.TextMap.has(e);return t&&this.TextMap.delete(e),t}get count(){return this.TextMap.size}clear(){this.TextMap.clear()}forEach(e){if(e===void 0)return;let t=!1;for(const[s,n]of this.TextMap)if(t=e(s,n),t)break;return t}values(){const e=new Map;for(const[t,s]of this.TextMap)e.set(t,parseInt(s));return e}}class vt{constructor(e=0,t=""){this.ch=new oe,this.isEmpty=!0,this.details=new os,this.ch.id=e,this.ch.name=t}set(e,t){const s=this.details.TextMap.has(e);return this.details.set(e,t),s}get values(){return this.details.values()}get itemID(){const e=this.itemKey,t=this.ch.idAttributeForHTML.substring(e.length);let s=parseInt(t);return s<=0?-1:s}get itemKey(){return"chuid"}}class Ze{constructor(){this.nFormationItem=5,this.uiInfo=new pe}Init(){this.items=new Array;for(let e=0;e<this.nFormationItem;e++)this.items.push(new vt)}put(e,t){const s=this.items.find(n=>this.isExistCh(n,t));return s!==void 0&&s.isEmpty===!1?!1:(e.ch.ns=t.ns,e.ch.id=t.id,e.ch.name=t.name,e.isEmpty=!1,!0)}empty(e){const t=e.isEmpty;return e.isEmpty=!0,e.isEmpty!=t}isExistCh(e,t){return e.ch.name===t.name&&e.ch.id===t.id}equalsFormationItem(e,t){return e.ch.name===t.ch.name&&e.ch.id===t.ch.id}}class ls{constructor(){this.emptyFile="plus.png",this.autoForm=!1,this.editFormEnable=!1,this.saveEnable=!1,this.enableScoreEvent=!1,this.parentName="",this.listName="",this.gridHeaderName="headerName",this.gridFooterName="footerName",this.gridName="gridName",this.scoreGrid=null,this.editingIndex=-1,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new C().SaveSetting(e)},this.onScoreGridOpen=async e=>{console.log(`notifty id     = ${e.item.props.id}`),console.log(` targetId      = ${e.targetId}`),console.log(` classify      = ${e.classify}`),console.log(` selectedValue = ${e.selectedValue}`);const t=e.item.props.id,s=parseInt(t)-1;if(0<=s&&s<this.formation.items.length){const n=`${this.propItemCssClassName()}-${t}`;if(this.htmlMakerProp.IsEnabledId(n)!==!0)return;if(this.enableScoreEvent){const o=this.formation.items[s];if(o.ch.id===0){console.log("*bug?*");return}if(this.scsList[s].items.length===0){const l=`${o.ch.id}`,a=await this.charDB.getStatus(l);a!==null&&a.items!==void 0&&(a.items=a.items.concat(this.auxScoreSet.items),this.scsList[s]=a,this.makeFlyoutGrid(a,s))}else{const l=this.scsList[s];this.makeFlyoutGrid(l,s)}}}else console.log(`invalid index = ${s}`)},this.savedScoreSet=new A,this.onScoreValueSelect=async e=>{console.log(`${e.callerName}, ${e.result}`);const s=this.scsList[this.editingIndex].items.find(n=>n.key===e.callerName);s!==void 0&&(s.selectedVal=e.result)},this.onOkClickScoreGrid=async e=>{const t=this.formation.items[this.editingIndex],s=this.scsList[this.editingIndex];this.disposeScorGrid();const n=new as;n.uiName=this.parentName,n.item=t,n.values=t.values,n.scoreConfigSet=s,this.onPropChanged(n)},this.onCancelClickScoreGrid=async e=>{const t=this.scsList[this.editingIndex];A.copy(this.savedScoreSet,t),this.disposeScorGrid()},this.onCopyPaste=async(e,t)=>{switch(console.log(`[${e.className}] selected [${t}]`),t){case ne.Copy:const s=X.toJsonText(this.formation,this.scsList);await yt.put(s);break;case ne.Paste:await yt.get();break}}}InitForEnemy(e){this.charDB=e,this.formation=new Ze,this.formation.Init(),this.enableScoreEvent=!0,this.scsList=new Array;const t=this.formation.nFormationItem;for(let s=0;s<t;s++){const n=new A;this.scsList.push(n)}}InitForPlayer(e){this.charSummary=e,this.autoFormation()}autoFormation(){this.formation=new Ze,this.formation.Init();const e=this.charSummary.sortByScore();console.log("sorted"),console.log(e);let t=0;if(this.scsList=new Array,e!==null){const s=Math.min(e.length,this.formation.nFormationItem);for(let n=0;n<s;n++){const i=this.formation.items[n];this.formation.put(i,e[n].ch)}for(const n of e){const i=n.scoreSet;this.scsList.push(i)}t=this.formation.nFormationItem-s}else t=this.formation.nFormationItem;for(let s=0;s<t;s++){const n=new A;this.scsList.push(n)}}SetAuxScoreSet(e){this.auxScoreSet=e}async Setup(e,t){if(!e)return;this.formation=e;let s=0;for(const n of this.formation.items){n.isEmpty?this.formation.empty(n):this.formation.put(n,n.ch),s++;const i=`${n.itemKey}${s}`;n.ch.idAttributeForHTML=i;const o=n.isEmpty?this.emptyFile:n.ch.iconFileName,l=await t.getImageUrlBy(o,n.ch.ns);if(l===null)return;this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),n.ch.idAttributeForHTML,l)}}async toHTML(e){if(!this.formation)return"";this.listName=e,this.htmlMakerChSel=new L;let t=0;for(const s of this.formation.items){const n=s.ch;t++;const i=`${s.itemKey}${t}`;n.idAttributeForHTML=i;const o="",l=s.isEmpty?this.emptyFile:n.iconFileName,a=new tt;a.imgSrc=o,a.imgFile=l;const r=new J;r.props.name=this.itemCssClassName(),r.props.id=i,r.props.className=this.imgCssClassName(),r.props.option.setImg(a),r.props.option.toolTip=n.name,r.props.option.onSelect=c=>{console.log(`notifty id = ${c.item.props.id}`),this.setSelectedItem(c.item.props.id)},this.htmlMakerChSel.add(r)}return this.htmlMakerChSel.MakeScrollableList(this.listCssClassName())}toGridHTML(){this.htmlMakerProp=new L;let e=0;for(const t of this.formation.items){t.ch;const s=this.scsList[e];e++;for(const i of s.items)t.details.set(i.key,i.selectedVal);const n=new J;n.props.name=`${this.propItemCssClassName()}-${e}`,n.props.id=`${e}`,n.props.className=`${this.propItemCssClassName()}`,n.props.option.setButton("スコア"),n.props.option.using.itemId=e,n.props.option.onSelect=this.onScoreGridOpen,this.htmlMakerProp.add(n)}return this.htmlMakerProp.MakeScrollableList(this.propCssClassName())}createFormationBox(e,t,s,n){this.parentName=t;let i="";this.autoForm&&(i=`<button id="${this.dlgCssClassName()}-auto">自動選定</button>`);let o="";this.editFormEnable&&(o=`
<button id="${this.dlgCssClassName()}-tbput">配置</button>
<button id="${this.dlgCssClassName()}-tbempty">抹消</button>
<button id="${this.dlgCssClassName()}-tbLeft">←</button>
<button id="${this.dlgCssClassName()}-tbRight">→</button>
`.trim());let l="";this.saveEnable&&(l=`<button id="${this.dlgCssClassName()}-stock">編成保存</button>`);let a=`
${i}
${o}
${l}
`.trim();const r=this.htmlMakerChSel.MakeDefaultToolButtonsHTML(a),c=this.htmlMakerChSel.MakeDefaultButtonsHTML(`
<button id="${this.dlgCssClassName()}-close">閉じる</button>
`);let h="";n!==""?h=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${r}
    ${s}
    ${n}
    ${c}
</div>`:h=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${r}
    ${s}
    ${c}
</div>`;const d=new j;d.title="<"+e+">",d.SetB2Type(he.CopyPaste,this.onCopyPaste);const u=d.NewDialog(t,this.dlgCssClassName());return d.SetContent(t,h),this.applyCss(),d.EnableEventHandlers(),d.onMoveDone=this.moverOnMoveDone,u}addEventHandlers(e){document.getElementById(`${this.dlgCssClassName()}-close`).onclick=()=>{document.getElementById(this.parentName).hidden=!0};const t=document.getElementById(`${this.dlgCssClassName()}-auto`);t!==null&&(t.onclick=async()=>{await this.onAutoPut()});const s=document.getElementById(`${this.dlgCssClassName()}-tbput`);s!==null&&(s.onclick=async()=>{await this.onCharPut()});const n=document.getElementById(`${this.dlgCssClassName()}-tbempty`);n!==null&&(n.onclick=async()=>{await this.onCharEmpty()});const i=document.getElementById(`${this.dlgCssClassName()}-stock`);i!==null&&(i.onclick=async()=>{if(this.onStock!==void 0){if(this.selectedItem.ch.ns===D.None)return;const o=this.htmlMakerChSel.FindImgByID(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML),l=new We;l.item=this.selectedItem,l.selectedImg=o===null?"":o.src;const a=this.findPropGridPos();a!==-1&&(l.scoreSet=this.scsList[a]),await this.onStock(l)}})}addItemEventkHandlers(e,t,s,n){this.onStock=s,this.onPut=e,this.onEmpty=t,this.onPropChanged=n;const i=this.htmlMakerChSel.GetIdByIndex(0);if(this.htmlMakerChSel.SelectByID(this.itemCssClassName(),i),this.htmlMakerChSel.enableEvents(this.itemCssClassName()),this.enableScoreEvent===!0){let o=0;for(const l of this.formation.items){o++;const a=`${this.propItemCssClassName()}-${o}`;this.htmlMakerProp.EnableId(a,!1)}this.htmlMakerProp.enableEvents(this.propCssClassName())}this.setSelectedItem(i)}async onAutoPut(){this.autoFormation(),await this.Setup(this.formation,this.imgLoader),await this.notifyChangeForm()}async notifyChangeForm(){for(const e of this.formation.items)e.isEmpty?await this.notiftyOnEmpty(e):await this.notiftyOnPut(e)}async notiftyOnPut(e){const t=new We;return t.uiName=this.formation.uiInfo.name,t.item=e,await this.onPut(t),t}async notiftyOnEmpty(e){const t=new We;return t.uiName=this.formation.uiInfo.name,t.item=e,t.selectedImg=this.emptyFile,await this.onEmpty(t),t}async onCharPut(){if(this.onPut!==void 0){this.selectedItem.isEmpty=!1;const e=await this.notiftyOnPut(this.selectedItem);this.formation.put(this.selectedItem,e.selectCh),this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,e.selectedImg),this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,this.selectedItem.ch.name),this.propEnabled(!0)}}async onCharEmpty(){if(this.onEmpty!==void 0){this.selectedItem.isEmpty=!0;const e=await this.notiftyOnEmpty(this.selectedItem);this.formation.empty(this.selectedItem),this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,e.selectedImg),this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,""),this.propEnabled(!1);const t=this.findPropGridPos();t!==-1&&(this.scsList[t]=new A)}}propEnabled(e){const t=this.findPropGridPos();if(t!==-1){const s=`${this.propItemCssClassName()}-${t+1}`;this.htmlMakerProp.EnableId(s,e)}}makeFlyoutGrid(e,t){if(this.scoreGrid!==null)return;this.editingIndex=t,this.savedScoreSet=new A,A.copy(e,this.savedScoreSet,!0);const s=xt(),n=new Array;for(const d of e.items){const u=new st;u.selectionPair=d.selectionPair,u.selectedItem=d.selectedVal,u.classify=d.key;const p=new Fe;p.makeItems(),p.items[0].typeInfo.setCombo(u),p.items[0].className="";const x=new Kt;x.key=d.key,x.text=s.convTitle(d.title),x.value=p,n.push(x)}const i=t+1,o=new Yt;if(o.setGridtems(n),o.setListener(`${this.gridName}-${i}`,`${this.propItemCssClassName()}-${i}`,this.dlgContentCssClassName(),`${this.gridHeaderName}-${i}`,`${this.gridFooterName}-${i}`),o.setVisible(!0),o.setFontConfig("0.8"),o.applyCss(),o.enableEvents(this.onScoreValueSelect),this.scoreGrid=o,this.scoreGrid.footerElem!==null){let d=`
<button id="${this.gridFooterName}-okBtn">OK</button>
<button id="${this.gridFooterName}-canBtn">CANCEL</button>
`.trim();this.scoreGrid.footerElem.innerHTML=d,document.getElementById(`${this.gridFooterName}-okBtn`).onclick=this.onOkClickScoreGrid,document.getElementById(`${this.gridFooterName}-canBtn`).onclick=this.onCancelClickScoreGrid}const l=document.getElementById(this.dlgContentCssClassName()),a=this.htmlMakerChSel.GetRect(l),r=this.htmlMakerChSel.FindDivByClassName(this.parentName,this.propCssClassName());this.htmlMakerChSel.GetRect(r);const c=this.htmlMakerChSel.FindDivByClassName(this.parentName,this.listCssClassName()),h=this.htmlMakerChSel.GetRect(c);o.show(`${parseInt(h.left)-parseInt(a.left)+t*100+5}`,`${parseInt(h.top)-parseInt(a.top)+parseInt(h.height)+5}`)}disposeScorGrid(){this.scoreGrid!==null&&(this.scoreGrid.dispose(),this.scoreGrid=null),this.editingIndex=-1}findPropGrid(){const e=this.htmlMakerChSel.FindDivByClassName(this.dlgContentCssClassName(),this.propCssClassName());return e!==null?e:null}findPropGridPos(){const e=this.findPropGrid();if(e!==null&&e.className.startsWith(this.propCssClassName())){let t=-1;for(const s of this.formation.items)if(t++,s===this.selectedItem)return console.log(`pos=${t}`),t}return-1}replacePropGrid(e){const t=this.htmlMakerChSel.FindDivByClassName(this.dlgContentCssClassName(),this.propCssClassName());if(t===null)return null;const s=document.createElement("div");s.innerHTML=e,t.replaceWith(s.childNodes[0])}setSelectedItem(e){const t=this.formation.items.find(s=>e===s.ch.idAttributeForHTML);t&&(this.selectedItem=t)}enableLazyImages(e){this.htmlMakerChSel.initObserver(this.dlgCssClassName(),e)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}propCssClassName(){return`${this.listName}-prop`}propItemCssClassName(){return`${this.listName}-prop-item`}lblCssClassName(){return`${this.listName}-lbl`}listCssClassName(){return`${this.listName}-list`}dlgContentCssClassName(){return`${this.parentName}-dlg-content`}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=this.propCssClassName(),i=this.propItemCssClassName();this.lblCssClassName();const o=parseInt(this.formation.uiInfo.left),l=parseInt(this.formation.uiInfo.top),a=100,r=document.createElement("style");r.textContent=`
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
`.trim(),document.head.appendChild(r);const c=document.getElementById(this.parentName);this.htmlMakerChSel.copyCssToInlineStyle(`.${this.parentName}`,c)}}class We{constructor(){this.cancel=!1}}class as{constructor(){this.uiName="",this.cancel=!1}}class Oe{constructor(){this.ch=new te,this.isEmpty=!0,this.TextMap=""}static toJsonText(e){const t=te.toJsonInst(e.ch);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new Oe;t.ch=te.toJsonInst(e.ch),t.isEmpty=e.isEmpty;const s=Object.fromEntries(e.details.TextMap);return t.TextMap=JSON.stringify(s,null,2),t}static fromJsonInst(e){const t=new vt;t.ch=te.fromJsonInst(e.ch),t.isEmpty=e.isEmpty;const s=new Map(Object.entries(JSON.parse(e.TextMap)));return t.details.TextMap=s,t}}class X{static toJsonText(e,t){const s=X.toJsonInst(e,t);return JSON.stringify(s,null,2)}static toJsonInst(e,t){const s=new X;s.items=new Array,s.scsList=new Array;for(const n of e.items)s.items.push(Oe.toJsonInst(n));for(const n of t)s.scsList.push(n);return s}static fromJsonInst(e){const t=new Ze;t.items=new Array;for(const s of e.items)t.items.push(Oe.fromJsonInst(s));return t}}class Lt{constructor(e=0,t="",s=!0,n=0){this.ch=new oe,this.isEmpty=!0,this.score=0,this.allAvailable=!1,this.ch.id=e,this.ch.name=t,this.isEmpty=s,this.score=n}}class ot{Add(e){if(e===void 0){console.log("[VersusGroupRow::Add] scItem === undefined");return}this.columns===void 0&&(this.columns=[]),this.columns.push(e)}Count(){return this.columns.length}debug(){if(this.columns===void 0){console.log("[VersusGroupRow::debug] this.columns === undefined");return}for(const e of this.columns)console.log(`[${e.ch.name}]	score=[${e.score}]`)}}ot.defNumColumn=5;class lt{Add(e){this.groupRows===void 0&&(this.groupRows=[]),this.groupRows.push(e)}Count(){return this.groupRows.length}debug(){if(this.groupRows===void 0)console.log("this.groupRows === undefined");else for(const e of this.groupRows)e.debug()}async loadJson(e){const n=(await new ke().loadJson(e)).groupRows.map(o=>Object.assign(new ot,o)),i=new lt;return i.groupRows=n,i}}const q={None:"None",Player:"Player",Enemy:"Enemy"},G={None:"None",Attr:"Attr",Role:"Role"},Ke={HiLv:"HiLv"},z={Likely:"Likely",Uncertain:"Uncertain",Wishful:"Wishful"};class ze{}ze.Likely=.9;ze.Uncertain=.64;class et{constructor(){this.scoreItems=[],this.formationType=q.None,this.boost=0}get imgPrefix(){return this.formationType===q.Player?"ftPlayer":"ftEnemy"}get judgeWidth(){return 48}setScoreItems(e){if(e!==void 0){this.scoreItems=new Array;for(const t of e){const s=new Lt(t.ch.id,t.ch.name,t.isEmpty,t.score);this.scoreItems.push(s)}}}async toCharHTML(e,t){const s=t.isEmpty?e.demoMaterial:t.ch.iconFileName,n=t.ch.ns===D.None?"":t.ch.ns,i=await e.getImageUrlBy(s,n);let o=this.scoreToolTip(t);return o!==""&&(o=`title="${o}"`),`
<img class=${this.charCssClassName()}
  src="${i}"
  ${o}>
`.trim()}scoreToolTip(e){return e.isEmpty?"":`${e.ch.name}
score=${e.score}`}async toJudgeHTML(e,t){const s=this.toJudgeFileURL(e,t);return`<img class=${this.judgeCssClassName()} src="${s}" width="48">`}async toJudgeFileURL(e,t){let s=null;switch(t){case z.Likely:s=await e.getImageUrlBy("win.png",e.AnyNs);break;case z.Uncertain:s=await e.getImageUrlBy("even.png",e.AnyNs);break;case z.Wishful:s=await e.getImageUrlBy("lost.png",e.AnyNs);break;default:return""}return s}charCssClassName(){return"combat-char"}judgeCssClassName(){return"combat-judge"}get combatScore(){if(this.scoreItems===void 0)return 0;const e=this.scoreItems.reduce((s,n)=>n.isEmpty?s:s+n.score,0),t=this.boost===0?1:this.boost;return Math.ceil(e*t/100)}}class rs{constructor(){this.hasCombo=!1,this.winRate=new Map}setPlayer(e){e.formationType=q.Player,this.player=e}setEnemy(e){e.formationType=q.Enemy,this.enemy=e}judge(e){const s=this.winRate.get(e);return s>=ze.Likely?z.Likely:s>=ze.Uncertain?z.Uncertain:z.Wishful}judgeForEnemy(e){switch(e){case z.Likely:return z.Wishful;case z.Uncertain:return z.Uncertain;case z.Wishful:return z.Likely}}}class cs{constructor(){this.combatPairs=new Map,this.emptyFile="plus.png",this.parentName="",this.uiInfo=new pe,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new C().SaveSetting(e)}}setPair(e,t){this.combatPairs.set(e,t)}calcCombatScore(){for(const[e,t]of this.combatPairs){if(t.player===void 0||t.enemy===void 0)continue;const s=[G.None,G.Attr,G.Role];for(const n of s){let i=t.player.combatScore,o=t.enemy.combatScore;t.winRate.set(n,o!==0?i/o:1)}}}async replaceChar(e,t,s,n,i){const o=this.combatPairs.get(e);let l;if(t===q.Player?l=o?.player:t===q.Enemy&&(l=o?.enemy),l===void 0)return!1;const a=s.itemID;if(a<0)return!1;const r=a-1;l=l;const h=`${l.imgPrefix}${a}`,d=l.scoreItems[r],u=d.ch;let p="";s.isEmpty?(u.id=0,u.name="",p=i.demoMaterial,console.log("set empty")):(u.id=n.id,u.name=n.name,p=u.iconFileName,console.log(`set char ${n.id}:${n.name}`)),d.isEmpty=s.isEmpty;const x=u.ns===D.None?"":u.ns,S=await i.getImageUrlBy(p,x);if(S===null)return!1;const R=new L,B=this.outerCssClassName();return R.ReplaceImg(B,h,S),R.ReplaceImgToolTip(B,h,l.scoreToolTip(d)),!0}async replaceJudge(e){async function t(i,o){const l=await i.toJudgeFileURL(e,o);if(l===null)return;const a=i.imgPrefix;for(let r=0;r<i.scoreItems.length;r++){const c=`${a}${r+1}`,h=s.FindImgsByID(n,c);if(h===null||h.length<=1){console.error("fail on judge marker");continue}const d=h[1];s.SetImgSrc(d,l),i.scoreItems[r].isEmpty?s.SetImgSize(d,0,0):s.SetImgSize(d,i.judgeWidth,i.judgeWidth);const u=i.scoreItems[r];s.ReplaceImgToolTip(n,c,i.scoreToolTip(u))}}const s=new L,n=this.outerCssClassName();for(const[i,o]of this.combatPairs){if(o.player===void 0||o.enemy===void 0)continue;const l=[G.None,G.Attr,G.Role];for(const a of l){if(a!==G.None)continue;const r=o.judge(a),c=o.judgeForEnemy(r);await t(o.player,r),await t(o.enemy,c)}}}async toHTML(e,t){const s=document.createElement("table");s.id=e;const n=document.createElement("tbody");s?.appendChild(n);async function i(l,a){const r=document.createElement("tr");n?.appendChild(r);const c=await a.toJudgeHTML(t,l),h=a.imgPrefix;let d=0;for(const u of a.scoreItems){d++;const p=await a.toCharHTML(t,u),x=`
<div class=${o} item-id="${h}${d}">
    ${p}
    ${c}
</div>
`.trim(),S=document.createElement("td");S.innerHTML=x,r.appendChild(S)}}const o=this.outerCssClassName();for(const[l,a]of this.combatPairs){const r=a.judge(G.None),c=a.judgeForEnemy(r);await i(r,a.player),await i(c,a.enemy)}return s.outerHTML}createCombatBox(e,t,s){this.parentName=t,this.htmlMaker=new L;const n=`<div class="${this.parentName}-dlg-content">
    ${s}
</div>`,i=new j;i.title="<"+e+">";const o=i.NewDialog(t,this.dlgCssClassName());return i.SetContent(t,n),this.applyCss(),i.EnableEventHandlers(),i.onMoveDone=this.moverOnMoveDone,o}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}processResult(e,t,s){async function n(o,l){const a=t(l.formationType),r=await l.toJudgeHTML(e,o),c=l.imgPrefix;let h=0;for(const d of l.scoreItems){h++;const u=await l.toCharHTML(e,d),p=`
<div class=${i} item-id="${c}${h}">
    ${u}
    ${r}
</div>
`.trim();s(a,p)}}const i=this.outerCssClassName();for(const[o,l]of this.combatPairs){const a=l.judge(G.None),r=l.judgeForEnemy(a);n(a,l.player),n(r,l.enemy)}}outerCssClassName(){return"combat-outer"}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const e=new et,t=`.${this.outerCssClassName()}`,s=`.${e.charCssClassName()}`,n=`.${e.judgeCssClassName()}`,i=parseInt(this.uiInfo.left),o=parseInt(this.uiInfo.top),l=document.createElement("style");l.textContent=`
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
`.trim(),document.head.appendChild(l);const a=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,a)}}const Ce={Unknown:"Unknown",Success:"Success",Fail:"Fail",Cancel:"Cancel"};async function Ct(m){const e=m.isWebRunning,t=m.currentUserHome,s=m.chStatusListFile,n=m.chListFile,i=new Gt,o=new L,l="splash-screen";o.initFullScreen(l,"エボナ データベース初期化中..."),o.applyFullScreenCss(l);const a=o.getFullScreenMsgElem(l),r=a!==null?a.innerHTML:"";if(t===m.user1Home){const f=[{ns:D.CnsRed,nsName:"赤属性"},{ns:D.CnsBlue,nsName:"青属性"},{ns:D.CnsGreen,nsName:"緑属性"},{ns:D.CnsYellow,nsName:"黄属性"},{ns:D.CnsViolet,nsName:"紫属性"}],H=await new Ne().LoadList(n);for(const w of f)a!==null&&(a.innerHTML=`${r} ${w.nsName}`),await i.setupNs(w.ns,m,H)}if(t===m.user2Home){const f=[{ns:D.CnsBlue,nsName:"藍属性"},{ns:D.CnsRed,nsName:"紅属性"},{ns:D.CnsGreen,nsName:"翠属性"},{ns:D.CnsYellow,nsName:"黄属性"},{ns:D.CnsWhite,nsName:"天属性"},{ns:D.CnsBlack,nsName:"冥属性"}],H=await new Ne().LoadList(n);for(const w of f)a!==null&&(a.innerHTML=`${r} ${w.nsName}`),await i.setupNs(w.ns,m,H)}a!==null&&(a.innerHTML="UI 初期化中 ...");const c=new Je,h=new Ve;await h.loadDB(s);const d=await h.loadAuxScoreSet(m.gameType);async function u(){async function f(){return await new Ne().LoadList(n)}const g=await f();g.uiInfo.name="charListArea",g.uiInfo.left="300",g.uiInfo.top="100";const H=g.uiInfo.name,w=await g.toHTML(i);if(e){const y="キャラ選択",$=g.createSelectorBox(y,H,w);g.addEventHandlers($),g.addItemEventHandlers(),g.enableLazyImages(i),$.show();const T=new Y;T.setAsDlg($,y),c.add(T)}return g}const p=await u();async function x(){const f=new is;await f.load(),f.uiInfo.name="CharSummary",f.uiInfo.left="400",f.uiInfo.top="100";const g=f.uiInfo.name,H=await f.toHTML();if(e){const w="キャラ一覧",y=f.createSummaryBox(w,g,H);await f.updateCharInfos(i),f.addEventHandlers(y,async T=>{T.selectCh=p.selectedCh;const U=await i.getImageUrlBy(p.selectedCh.iconFileName,p.selectedCh.ns);if(U===null)T.selectedImg="",T.cancel=!0;else{T.selectedImg=U,T.cancel=!1;const M=await h.getStatus(p.selectedCh.idAsText);console.log(M),T.scoreSet=M,T.scoreSet.items=T.scoreSet.items.concat(d.items)}console.log(`selected ch = ${T.selectCh.name}`)}),f.addItemEventHandlers(),f.enableLazyImages(i),y.show();const $=new Y;$.setAsDlg(y,w),c.add($)}return f}const S=await x();async function R(f,g,H,w){const y=new ls;f===B&&(y.InitForPlayer(S),y.autoForm=!0,y.editFormEnable=!1,y.saveEnable=!1,y.imgLoader=i),f===O&&(y.InitForEnemy(h),y.SetAuxScoreSet(d),y.autoForm=!1,y.editFormEnable=!0,y.saveEnable=!0),y.formation.uiInfo.name=f,y.formation.uiInfo.left=`${g}`,y.formation.uiInfo.top=`${H}`;const $=y.formation.uiInfo.name,T=await y.toHTML($),U=f===O?y.toGridHTML():"";if(e){const M=y.createFormationBox(w,$,T,U);y.addEventHandlers(M),y.addItemEventkHandlers(async k=>{k.selectCh=p.selectedCh;const F=await i.getImageUrlBy(p.selectedCh.iconFileName,p.selectedCh.ns);if(F===null)return;k.selectedImg=F,k.item.isEmpty=!1,console.log(`selected ch = ${k.selectCh.name}`);const Q=Ke.HiLv;P.combatPairs.get(Q),k.uiName===B&&await P.replaceChar(Q,q.Player,k.item,k.selectCh,i),k.uiName===O&&await P.replaceChar(Q,q.Enemy,k.item,k.selectCh,i),await P.replaceJudge(i)},async k=>{const F=await i.getImageUrlBy(k.selectedImg,p.selectedCh.ns);if(F===null)return;k.selectedImg=F,k.item.isEmpty=!0,console.log(`empty ch = ${k.selectedImg}`);const Q=Ke.HiLv;P.combatPairs.get(Q),k.uiName===B&&await P.replaceChar(Q,q.Player,k.item,k.selectCh,i),k.uiName===O&&await P.replaceChar(Q,q.Enemy,k.item,k.selectCh,i),await P.replaceJudge(i)},async k=>{console.log(`selected ch = ${k.item.ch.name}`);const F=new Mt;F.selectCh=k.item.ch,F.selectedImg=k.selectedImg,F.scoreSet=k.scoreSet,S.charStock(F)},async k=>{const F=pt();console.log(F),await F.replaceJudge(i)}),y.enableLazyImages(i),M.show();const fe=new Y;fe.setAsDlg(M,w),c.add(fe)}return y}const B="playerForm",O="enemyForm",Te=await R(B,100,100,"自編成"),Se=await R(O,100,200,"敵編成");async function Ht(f,g,H,w){P.uiInfo.name=f,P.uiInfo.left=`${g}`,P.uiInfo.top=`${H}`;const y=await P.toHTML("combatTable",i),$=P.createCombatBox(w,f,y);P.enableLazyImages(i),await P.replaceJudge(i),$.show();const T=new Y;T.setAsDlg($,w),c.add(T)}const P=pt();await Ht("combatForm",120,300,"対戦予想");const at="保存";{const f=new Y;f.setAsMenu(at),c.add(f)}const rt="復帰";{const f=new Y;f.setAsMenu(rt),c.add(f)}let $e=null;const Dt=await c.toHTML("dockForm",i);if(e){const f=c.createDockBox("dockForm",Dt);c.addItemClickHandlers(async g=>{c.stdApplyAction(g)!==!1&&g.item.isMenuType&&(g.item.toolTip===at&&await At(),g.item.toolTip===rt&&await Ft(async w=>{if(console.log(`[loadedResult] ${w}`),w!==Ce.Success)return;const y=X.fromJsonInst(Ee),$=X.fromJsonInst(xe);Ee=null,xe=null,await Te.Setup(y,i),await Se.Setup($,i)}))}),c.enableLazyImages(i),f.show(),$e=f}const ct="playerForm.json",ht="enemyForm.json",mt="dockForm.json";async function At(){c.InitZOrder(_);const f=X.toJsonText(Te.formation,Te.scsList),g=X.toJsonText(Se.formation,Se.scsList),H=Ue.toJsonText(c),w=new window.JSZip;w.file(ct,f),w.file(ht,g),w.file(mt,H);const y=await w.generateAsync({type:"blob"}),$="gameConfig.zip",T=URL.createObjectURL(y),U=document.createElement("a");U.href=T,U.download=$,U.click(),URL.revokeObjectURL(T),console.log("saved!")}let ut=null,Ee=null,xe=null;async function Ft(f){const g=document.createElement("input");return g.type="file",g.accept=".zip",g.addEventListener("cancel",()=>(console.log("Cancelled."),Ce.Cancel)),g.addEventListener("change",async()=>{if(g.files.length==1){console.log("File selected: ",g.files[0].name);const w=await g.files[0].arrayBuffer(),$=await new window.JSZip().loadAsync(w);async function T(M){const fe=$.file(M);if(fe){const k=await fe.async("string"),F=JSON.parse(k);return console.log(F),F}}{const M=await T(mt);M&&(ut=M)}{const M=await T(ct);M&&(Ee=M)}{const M=await T(ht);M&&(xe=M)}const U=ut!==null&&Ee!==null&&xe!==null?Ce.Success:Ce.Fail;f(U)}}),g.click(),Ce.Unknown}const _=new C;e&&(_.AddDialogs(),_.AssignIndexies(),await _.LoadAllSetting(),await _.loadSetting($e),c.InitZOrder(_),await _.ForEachAsync(f=>{const g=j.FindDialogParent(f);return g!==null&&(m.isLocal||f==="charListArea"?g.hidden=!1:g.hidden=!0),!0}),$e!==null&&($e.parentElement.hidden=!m.isLocal)),o.hideFullScreenCss(l);function dt(f){const g=new lt,H=new ot,w=f.formation;w.uiInfo.name,w.uiInfo.name,f.scsList===void 0&&console.log(`[${f.formation.uiInfo.name}] 対戦予想結果の作成は工事中です`);let y=0;for(const $ of w.items){if(f.scsList===void 0)continue;const T=f.scsList[y];y++;const U=Math.ceil(T.stdScore),M=new Lt($.ch.id,$.ch.name,$.isEmpty,U);M.allAvailable=T.allAvailable,H.Add(M)}return g.Add(H),g.debug(),g}function pt(){const f=new cs,g=dt(Te),H=dt(Se),w=new et;w.setScoreItems(g.groupRows[0].columns),w.boost=100;const y=new et;y.setScoreItems(H.groupRows[0].columns),y.boost=100;const $=new rs;$.setPlayer(w),$.setEnemy(y),f.setPair(Ke.HiLv,$),f.calcCombatScore();for(const[T,U]of f.combatPairs){const M=U.judge(G.None);console.log(`judge=[${M}]`)}return f}}async function hs(m){if(!m.isWebRunning)return;const e=m.isWebRunning;console.log(`mode=${m.edit}`);const t=new Je;async function s(){const d=le.Resource,u=new gt;u.init(),await u.load(d,V.none),u.uiInfo.name="ResourceEdit",u.uiInfo.left="110",u.uiInfo.top="10";const p=u.uiInfo.name,x=await u.toHTML(u.makeResEditItems(),u.makeResLog);if(e){const S=document.createElement("div");S.id=u.uiInfo.name,S.className=u.uiInfo.name,document.body.appendChild(S);const R="文字列リソース",B=u.createEditorBox(R,p,x);u.addEventHandlers(B),u.addItemEventHandlers(),B.show(),u.enableResize();const O=new Y;O.setAsDlg(B,R),t.add(O)}return u}async function n(){const d=le.ScoreUI,u=new gt;u.init(),await u.load(d,m.edit),u.uiInfo.name="ScoreEdit",u.uiInfo.left="110",u.uiInfo.top="100";const p=u.uiInfo.name,x=await u.toHTML(u.makeScoreEditItems(),u.makeScoreLog);if(e){const S=document.createElement("div");S.id=u.uiInfo.name,S.className=u.uiInfo.name,document.body.appendChild(S);const R="スコア設定",B=u.createEditorBox(R,p,x);u.addEventHandlers(B),u.addItemEventHandlers(),B.show(),u.enableResize();const O=new Y;O.setAsDlg(B,R),t.add(O)}return u}(await s()).startAutoSave(),(await n()).startAutoSave();const l=document.createElement("div"),a="dockEdit";l.id=a,l.className=a,document.body.appendChild(l);let r=null;const c=await t.toHTML(a,null);if(e){const d=t.createDockBox(a,c);t.addItemClickHandlers(async u=>{t.stdApplyAction(u)}),d.show(),r=d}const h=new C;e&&(h.AddDialogs(),h.AssignIndexies(),await h.LoadAllSetting(),await h.loadSetting(r),t.InitZOrder(h),await h.ForEachAsync(d=>{const u=j.FindDialogParent(d);return u!==null&&(m.isLocal||d==="charListArea"?u.hidden=!1:u.hidden=!0),!0}),r!==null&&(r.parentElement.hidden=!m.isLocal))}const v=new ke,Rt=v.isWebRunning;Rt?(us(),v.parseURLParams(),v.currentUserHome===""&&v.setUser(v.user1Home)):v.setUser(v.user2Home);const Bt=window.EVONA_CONFIG.isLocal;v.setPath();v.setImageHome(Bt);const ms=ds(Bt);v.currentUserHome;v.statusJsonPath;v.zipPrefix;v.chListFile;v.chStatusListFile;switch(v.admin){case!0:await Vt(v);break;case!1:if(Rt)if(v.edit===V.none){let m=!1,e=!1;const t=new me;t.CheckVisible=!0,t.CheckText="位置情報を初期化",t.SecretEnable=!0;const s=v.setBrowserTitle();await t.showWait(`「${s} 」モードで起動します`)===N.Secret&&(e=!0),m=t.Checked,console.log(`secretMode=[${e}]`),console.log(`cleanMode=[${m}]`),m&&(await(await Ut()).clear(),await(await ie()).clear()),e?(window.EVONA_CONFIG.demo=!1,await Ct(v)):ms&&await Ct(v)}else v.setBrowserTitle(),await hs(v);break}function us(){const m=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname.startsWith("192.168."),e=m?"./jszip_dist/jszip.min.js":"https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js",t=m?"./jsstore_dist/jsstore.min.js":"https://cdn.jsdelivr.net/npm/jsstore/dist/jsstore.min.js";window.EVONA_CONFIG={isLocal:m,workerFile:"./jsstore_dist/jsstore.worker.min.js",demo:!m};function s(n,i=!1){const o=document.createElement("script");o.src=n,i&&(o.type="module"),o.async=!1,document.head.appendChild(o)}s(e),s(t)}function ds(m){if(m)return!0;const e=document.referrer;console.log(`${e}`);const t="evona_auth",s="granted";return sessionStorage.getItem(t)===s?!0:e.includes("qiita.com")?(sessionStorage.setItem(t,s),!0):!1}

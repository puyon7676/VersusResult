(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();const J={none:"none",classPq:"pq",classMM:"mm"},b={pqStatusHP:"pqStatusHP",pqStatusATK:"pqStatusATK",pqStatusREC:"pqStatusREC",pqTokkunHP:"pqTokkunHP",pqTokkunATK:"pqTokkunATK",pqTokkunREC:"pqTokkunREC",pqTokuSp1:"pqTokuSp1",pqTokuSp2:"pqTokuSp2",mmAbilitySTR:"mmAbilitySTR",mmStatusFGT:"mmStatusFGT",mmStatusATK:"mmStatusATK",mmStatusPDF:"mmStatusPDF",mmStatusACC:"mmStatusACC",mmStatusEVA:"mmStatusEVA",mmStatusCRI:"mmStatusCRI",mmStatusMDF:"mmStatusMDF",mmStatusHP:"mmStatusHP",mmStatusCRD:"mmStatusCRD",mmStatusDEF:"mmStatusDEF",mmStatusSPD:"mmStatusSPD",mmAbilityDEX:"mmAbilityDEX",mmAbilityMGC:"mmAbilityMGC",mmAbilityDUR:"mmAbilityDUR",mmRole:"mmRole"},D={None:"None",CnsRed:"CnsRed",CnsBlue:"CnsBlue",CnsGreen:"CnsGreen",CnsYellow:"CnsYellow",CnsViolet:"CnsViolet",CnsWhite:"CnsWhite",CnsBlack:"CnsBlack"},xe={RlAttacker:"RlAttacker",RlHealer:"RlHealer",RlDebuffer:"RlDebuffer",RlBuffer:"RlBuffer"};class Ie{constructor(){this.imageRepository="https://puyon7676.github.io/GameImages/",this.imageHome="./Image/",this.user1Home="./User1/",this.user2Home="./User2/",this.currentUserHome="",this.isLocal=!1,this.admin=!1,this.cmd="",this.edit=J.none,this.dataBasePath="../キャラパースデータ",this.statusJsonPath="",this.zipPrefix="",this.chListFile="",this.chStatusListFile="",this.charStatusZip="./CharStatus.zip",this.nodeToolsImportFilename="./nodeTools.js"}setImageHome(e){if(this.isLocal=e,e)this.imageHome=`${this.currentUserHome}Image/`;else{let t=this.currentUserHome;this.currentUserHome.substring(0,2)==="./"&&(t=this.currentUserHome.substring(2)),this.imageHome=`${this.imageRepository}${t}`}console.log(`imageHome=[${this.imageHome}]`)}setUser(e){this.currentUserHome=e}setPath(){this.currentUserHome===this.user1Home&&(this.statusJsonPath=`${this.dataBasePath}/ぷよクエ_詳細JSON`,this.zipPrefix="puyoQue_",this.chListFile=`${this.currentUserHome}chListFile_puyo.json`,this.chStatusListFile=`${this.currentUserHome}puyoQue_CharStatus.zip`),this.currentUserHome===this.user2Home&&(this.statusJsonPath=`${this.dataBasePath}/メメントモリ_詳細JSON`,this.zipPrefix="memeMori_",this.chListFile=`${this.currentUserHome}chListFile_meme.json`,this.chStatusListFile=`${this.currentUserHome}memeMori_CharStatus.zip`)}get gameType(){return this.currentUserHome===this.user1Home,J.classPq}get gameTitle(){return this.edit!==J.none?`エディタ(${this.edit})`:this.gameType===J.classPq?"ぷよクエ":"メメントモリ"}setBrowserTitle(){const e=this.gameTitle;document.head.title=e;for(const t of document.head.children)t.nodeName==="TITLE"&&(t.innerHTML=`EvoNa：${e} モード`);return e}get isWebRunning(){return!(typeof document>"u")}parseURLParams(){if(!this.isWebRunning){console.log("cannot parse URL params!");return}const e=new URLSearchParams(window.location.search);for(const[t,s]of e)switch(t.trim()){case"user":const i=s.trim();this.setUser(i==="1"?this.user1Home:this.user2Home);break;case"debug":break;case"admin":this.admin=s.trim()==="true";break;case"cmd":this.cmd=s;break;case"edit":this.edit=s.trim()===J.classMM?J.classMM:J.classPq;break}}async loadJson(e){return console.log(`[loadJson] file=[${e}]`),await this._loadJson(e)}async _loadJson(e){if(this.isWebRunning){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`HTTPエラー! ステータス: ${t.status}`);return await t.json()}else{const{loadJsonNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async saveJson(e,t){const s=JSON.stringify(t);if(this.isWebRunning){const i=new Blob([s],{type:"application/json"}),n=URL.createObjectURL(i),o=document.createElement("a");o.href=n,o.download=e,o.click()}else{const{saveJsonNode:i}=await import(this.nodeToolsImportFilename);return i(e,t)}}async loadBinFile(e){if(this.isWebRunning)return await(await fetch(e)).blob();{const{readBinNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async getDoc(e){let t,s;if(this.isWebRunning)t=new DOMParser,s=t.parseFromString(e,"text/html");else{const{createHtmlParserNode:i}=await import(this.nodeToolsImportFilename);t=i(e),s=t.parseFromString(e,"text/html")}return s}}const I={None:"None",Ok:"Ok",OkCancel:"OkCancel",YesNo:"YesNo",YesNoCancel:"YesNoCancel"},fe={None:"None",Ok:"Ok",Question:"Question"},N={None:"None",Ok:"Ok",Cancel:"Cancel",Yes:"Yes",No:"No",Secret:"Secret"};class he{constructor(){this.parentName="evona-msg-box",this.buttonType=I.Ok,this.iconType=fe.None,this.title="Confirm",this.btnS="",this.SecretEnable=!1,this.btnOk="OK",this.btnCancel="Cancel",this.btnYes="Yes",this.btnNo="No",this.CheckVisible=!1,this.CheckText="",this.Checked=!1,this.Result=N.None,this.onS1Clicked=e=>{this.Result=N.Secret,this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB1Clicked=e=>{switch(this.buttonType){case I.None:this.Result=N.None;break;case I.Ok:this.Result=N.Ok;break;case I.OkCancel:this.Result=N.Ok;break;case I.YesNo:this.Result=N.Yes;break;case I.YesNoCancel:this.Result=N.Yes;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB2Clicked=e=>{switch(this.buttonType){case I.None:this.Result=N.None;break;case I.Ok:this.Result=N.None;break;case I.OkCancel:this.Result=N.Cancel;break;case I.YesNo:this.Result=N.No;break;case I.YesNoCancel:this.Result=N.No;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB3Clicked=e=>{switch(this.buttonType){case I.None:this.Result=N.None;break;case I.Ok:this.Result=N.None;break;case I.OkCancel:this.Result=N.Cancel;break;case I.YesNo:this.Result=N.No;break;case I.YesNoCancel:this.Result=N.Cancel;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)}}get btnNameS(){return`${this.parentName}-s1`}get btnName1(){return`${this.parentName}-b1`}get btnName2(){return`${this.parentName}-b2`}get btnName3(){return`${this.parentName}-b3`}get chkName1(){return`${this.parentName}-chk1`}setParent(e){this.parentName=`${e}-msg-box`}setTypes(e,t){this.buttonType=e,this.iconType=t}setOk(e=fe.Ok){this.setTypes(I.Ok,e)}setOkCancel(e=fe.Question){this.setTypes(I.OkCancel,e)}setYesNo(e=fe.Question){this.setTypes(I.YesNo,e)}setYesNoCancel(e=fe.Question){this.setTypes(I.YesNoCancel,e)}async showWait(e,t=null){return this.remove(),this.createUI(e,t===null?this.title:t,!0),new Promise(s=>{this.resolver=s;let i=!1,n=!1,o=!1;switch(this.buttonType){case I.None:break;case I.Ok:i=!0,n=!1,o=!1;break;case I.OkCancel:i=!0,n=!0,o=!1;break;case I.YesNo:i=!0,n=!0,o=!1;break;case I.YesNoCancel:i=!0,n=!0,o=!0;break}i&&document.getElementById(this.btnName1)?.addEventListener("click",this.onB1Clicked,{once:!0}),n&&document.getElementById(this.btnName2)?.addEventListener("click",this.onB2Clicked,{once:!0}),o&&document.getElementById(this.btnName3)?.addEventListener("click",this.onB3Clicked,{once:!0}),this.SecretEnable&&document.getElementById(this.btnNameS)?.addEventListener("click",this.onS1Clicked,{once:!0})})}showNoWait(e,t="INFO"){this.remove(),this.createUI(e,t,!1)}showNoWaitEnd(){this.remove()}createUI(e,t,s){let i=`<button id="${this.btnNameS}" class="${this.btnNameS}">${this.btnS}</button>`,n="",o="",l="";switch(this.buttonType){case I.None:break;case I.Ok:n=`<button id="${this.btnName1}">${this.btnOk}</button>`,o="";break;case I.OkCancel:n=`<button id="${this.btnName1}">${this.btnOk}</button>`,o=`<button id="${this.btnName2}">${this.btnCancel}</button>`;break;case I.YesNo:n=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`;break;case I.YesNoCancel:n=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`,l=`<button id="${this.btnName3}">${this.btnCancel}</button>`;break}let a="";this.CheckVisible&&(a=`
<div style="padding: 5px 10px; font-size: 0.9em; text-align: left;">
    <label>
        <input type="checkbox" id="${this.chkName1}">${this.CheckText}
    </label>
</div>
`.trim());const r=`${a}${n}${o}${l}`,c=r!==""?`<div class="msg-footer">${r}</div>`:"",h=document.createElement("div");h.id=this.parentName,h.innerHTML=`
            <div class="msg-overlay">
                <div class="msg-panel">
                    <div class="msg-header">${t}${i}</div>
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
            `.trim(),document.head.appendChild(t)}setCheckResult(){const e=document.getElementById(this.chkName1);if(e!==null){const t=e.checked;console.log(`[setCheckResult] ${t}`),this.Checked=t}}remove(){document.getElementById(this.btnName1)?.removeEventListener("click",this.onB1Clicked),document.getElementById(this.btnName2)?.removeEventListener("click",this.onB2Clicked),document.getElementById(this.btnName3)?.removeEventListener("click",this.onB3Clicked),document.getElementById(this.btnNameS)?.removeEventListener("click",this.onS1Clicked),document.getElementById(this.parentName)?.remove()}}class Ct{constructor(){this.tblNameCharImages="CharImages",this.tblCharImages={name:this.tblNameCharImages,columns:{ns:{dataType:"string",index:!0},name:{dataType:"string"},fileName:{dataType:"string",index:!0},fileData:{dataType:"object"}}},this.tblNameSettings="Settings",this.tblSettings={name:this.tblNameSettings,columns:{key:{dataType:"string",primaryKey:!0},value:{dataType:"string"}}},this.tblNameActionLog="ActionLog",this.tblActionLog={name:this.tblNameActionLog,columns:{id:{primaryKey:!0,autoIncrement:!0},logType:{dataType:"string"},log:{dataType:"string"}}},this.dbName="EvonaDB",this.db={name:this.dbName,tables:[this.tblCharImages,this.tblSettings,this.tblActionLog]}}async connect(e){console.log("Waiting for JsStore library...");let t=0;for(;typeof window.JsStore>"u";){if(t>50)throw new Error("JsStore library load timeout. Check script tag order.");await new Promise(i=>setTimeout(i,100)),t++}const s=window.JsStore;this.connection=new s.Connection(new Worker(e)),console.log("connection started with library version:",s.VERSION)}async term(){await this.connection.terminate(),console.log("connection terminated")}async initDb(){const e=await this.connection.initDb(this.db);return console.log(e?"Db Created & connection is opened":"Db connection is opened"),e}async dropDb(){let e=!1;return await this.connection.dropDb().then(function(){console.log("Db deleted successfully"),e=!0}).catch(function(){console.error("dropDb error")}),e}async deleteAllRecords(e){return await this.existsTable(e)===!1?(console.log(`[${e}] not exist`),!1):(await this.connection.clear(e),console.log(`[${e}] all record deleted successfully`),!0)}async existsTable(e){try{const t=await this.connection.count({from:e});return!0}catch(t){console.log("[existsTable] JsStore Select Error:",t)}return!1}get defWorkerFile(){return window.EVONA_CONFIG.workerFile}async setup(){return await this.connect(this.defWorkerFile),await this.initDb()}sortByIdAscAsNum(e){e&&e.sort((t,s)=>Number(t.id)-Number(s.id))}}class dt extends Ct{async insert(e,t){await this.connection.insert({into:this.tblNameSettings,values:[{key:e,value:t}],upsert:!0})}async insertMultiple(e){const t=e.map(s=>({key:s.key,value:s.value}));return await this.connection.insert({into:this.tblNameSettings,values:t,upsert:!0})}async selectKey(e){try{var t=await this.connection.select({from:this.tblNameSettings,where:{key:e}});return t.length>=1?t[0].value:null}catch(s){console.error("[selectKey] JsStore Select Error:",s)}return null}async countKey(e){try{return await this.connection.count({from:this.tblNameSettings,where:{key:e}})}catch(t){console.error("[countKey] JsStore Select Error:",t)}return-1}async clear(){await this.deleteAllRecords(this.tblNameSettings)}}class bt{constructor(){this.table=new dt}async init(){const e=new dt;await e.setup(),this.table=e}async saveDialogPos(e){const t=e.parentElement,s=`${t?.className},${t?.style.left},${t?.style.top}`;await this.table.insert(e.className,`${s}`)}async loadDialogPos(e){const t=e.parentElement,s=await this.table.selectKey(e.className);if(s!==null){const i=s.split(",");i.length===3&&t!==null&&i[0]===t.className&&(t.style.left=i[1],t.style.top=i[2])}}async clear(){this.table.clear()}}class Ke extends Ct{async insert(e,t){await this.connection.insert({into:this.tblNameActionLog,values:[{logType:e,log:t}]})}async insertMultiple(e){const t=e.map(s=>({logType:s.logType,log:s.log}));return await this.connection.insert({into:this.tblNameActionLog,values:t})}async selectType(e){try{var t=await this.connection.select({from:this.tblNameActionLog,where:{logType:e},order:{by:"id",type:"asc"}});return this.sortByIdAscAsNum(t),t.length>=1?t:null}catch(s){console.error("[selectType] JsStore Select Error:",s)}return null}async countType(e){try{return await this.connection.count({from:this.tblNameActionLog,where:{logType:e}})}catch(t){console.error("[countType] JsStore Select Error:",t)}return-1}async clear(){await this.deleteAllRecords(this.tblNameActionLog)}}class At{constructor(){this.table=new Ke}async init(){const e=new Ke;await e.connect(e.defWorkerFile),await e.initDb(),this.table=e}async clear(){this.table.clear()}async put(e,t){return await this.table.insert(e,t)}async get(e){const t=await this.table.selectType(e);if(t===null)return null;const s=new Array;for(const i of t)s.push({id:i.id,log:i.log});return s}}const me={CharSummaryAction:"CharSummaryAction",ResourceEditAction:"ResourceEditAction",ScoreEditAction:"ScoreEditAction"};let Me=null;async function Ft(){return Me||(Me=new bt,await Me.init(),console.log("SettingAccess instance created (Singleton)")),Me}let ve=null;async function ne(){return ve||(ve=new At,await ve.init(),console.log("LogAccess instance created (Singleton)")),ve}function Pt(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,m=>{const e=Math.random()*16|0;return(m==="x"?e:e&3|8).toString(16)})}function Ut(){const m=Date.now().toString(16),e=Pt();return`${m}-${e}`}async function Ot(m){const e=m.cmd.split(":");let t=!1;switch(e[0]){case"drop":t=zt();break;case"ref":t=document.referrer;break}const s=`[${m.cmd}] res=${t}`;alert(s)}async function zt(){const m=new Ke;return await m.setup(),await m.dropDb()}const ae={plus:"plus.png",win:"win.png",even:"even.png",lost:"lost.png",demo:"demo.png"};class Vt{constructor(){this.imageHome="",this.cache=new Map,this.cacheNs=new Map,this.zip=null,this.zipNs=new Map,this.isMultiZip=!1,this.materials=[{ns:"",fileName:ae.plus},{ns:"",fileName:ae.win},{ns:"",fileName:ae.even},{ns:"",fileName:ae.lost},{ns:"",fileName:ae.demo}],this.AnyNs=""}get demoMaterial(){return ae.demo}async setupNs(e,t,s){const i=s.findByNs(e);if(i!==void 0){this.imageHome=t.imageHome;for(const n of i){const o=n.iconFileName,l=`${this.imageHome}${e}/${o}`;this.cache.set(o,l),this.cacheNs.set(o,e)}this.isMultiZip=!0;for(const n of this.materials){const o=n.fileName,l=`${this.imageHome}${o}`;this.cache.set(o,l),this.cacheNs.set(o,e)}}}async checkExists(e){try{return(await fetch(e,{method:"HEAD"})).ok}catch{return!1}}isMaterial(e){return this.materials.find(s=>s.fileName.includes(e))!==void 0}get loaded(){return this.isMultiZip?this.zipNs.size!==0:this.zip!==null}async _loadZipBy(e,t){const s=new Ie;this.imageHome=s.imageHome.substring(2);const i=await s.loadBinFile(e);let n=null;if(s.isWebRunning)n=await window.JSZip.loadAsync(i);else{const{loadZipNode:o}=await import(s.nodeToolsImportFilename);n=await o(i)}this.zipNs.set(t,n),this.isMultiZip=!0}async getImageUrlBy(e,t){if(this.isMaterial(e))return`${this.imageHome}${e}`;if(this.cache.has(e)){const i=this.cache.get(e);if(!await this.checkExists(i)){const o=`${this.imageHome}notexist.png`;this.cache.set(e,o)}return this.cache.get(e)}return null}async findNs(e){if(!this.isMultiZip)return null;if(this.cacheNs.has(e)){const t=this.cacheNs.get(e);if(t!==void 0)return t}return null}dispose(){for(const e of this.cache.values())URL.revokeObjectURL(e);this.cache.clear()}}class ge{constructor(){this.parentElem=null,this.cancel=!1,this.targetId="",this.classify="",this.selectedValue="",this.Keydown="",this.KeyEnter=re.None}}class be{constructor(){this.callerName="",this.result=""}}class Ye{constructor(){this.parentElem=null,this.left="",this.top="",this.width="",this.height=""}}const Le={Enter:"Enter",Escape:"Escape",Tab:"Tab",Process:"Process"},re={None:"None",Normal:"Normal",Special:"Special"},E={Btn:"Btn",Img:"Img",Label:"Label",LabelRO:"LabelRO",Combo:"Combo",Input:"Input",Plain:"Plain",Table:"Table"};class et{constructor(){this.imgSrc="",this.imgFile="",this.alt=""}}class Ae{constructor(){this.selectedItem="",this.selectionPair=[],this.classify=""}}class Z{constructor(){this.type="text",this.value="",this.placeholder=""}}class wt{constructor(){this.typeInfo=new Nt,this.className=""}ToHTML(){let e="";switch(this.typeInfo.using.itemType){case E.Btn:e=this.typeInfo.ToButtonHTML(this.className);break;case E.Label:e=this.typeInfo.ToLableHTML(this.className);break;case E.LabelRO:e=this.typeInfo.ToLableROHTML(this.className);break;case E.Combo:e=this.typeInfo.ToComboHTML(this.className);break;case E.Input:e=this.typeInfo.ToInputHTML(this.className);break;case E.Img:e=this.typeInfo.ToImgHTML(this.className,this.typeInfo.using.img.alt);break;case E.Plain:e=this.typeInfo.using.innerHTML;break}return e}copyTo(e){e.className=this.className,e.typeInfo.toolTip=this.typeInfo.toolTip,e.typeInfo.using.itemType=this.typeInfo.using.itemType,e.typeInfo.using.label=this.typeInfo.using.label,e.typeInfo.using.combo=this.typeInfo.using.combo,e.typeInfo.using.input=this.typeInfo.using.input,e.typeInfo.using.innerHTML=this.typeInfo.using.innerHTML,e.typeInfo.using.img=this.typeInfo.using.img}}class Fe{constructor(){this.items=new Array}makeItems(e=1){this.items.length>0&&this.items.splice(0,this.items.length);for(let t=0;t<e;t++){const s=new wt;this.items.push(s)}}ToHTML(){let e="";for(const t of this.items){const s=t.ToHTML();s!==""&&(this.items.length>=2?e=`${e}<div>${s}</div>`:e=s)}return e}}class tt{constructor(){this.rowName="",this.cols=new Array}makeCols(e){this.cols.length>0&&this.cols.splice(0,this.cols.length);for(let t=0;t<e;t++){const s=new Fe;s.makeItems(),this.cols.push(s)}}ToHTML(){let e="";for(const t of this.cols){let s="";s=t.ToHTML(),s!==""&&(e=`${e}<td>${s}</td>`)}return e}toTemplate(){const e=new tt;e.rowName=this.rowName;for(const t of this.cols){const s=new Fe;s.makeItems(t.items.length);let i=-1;for(const n of t.items){i++;const o=s.items[i];o.className=n.className,o.typeInfo.toolTip=n.typeInfo.toolTip,o.typeInfo.using.itemType=n.typeInfo.using.itemType,o.typeInfo.using.label=n.typeInfo.using.label,o.typeInfo.using.combo=n.typeInfo.using.combo,o.typeInfo.using.input=n.typeInfo.using.input,o.typeInfo.using.innerHTML=n.typeInfo.using.innerHTML,o.typeInfo.using.img=n.typeInfo.using.img}e.cols.push(s)}return e}}class W{constructor(){this.tableName="",this.rows=new Array,this.template=null,this.invalidRowIndex=-1,this.firstRowIndex=1,this.fontSize="font-size: 0.9em;",this.clipboardText=""}makeDim(e,t){this.rows.length>0&&this.rows.splice(0,this.rows.length);for(let s=0;s<t;s++){const i=new tt;i.makeCols(e),this.rows.push(i)}}growCell(e,t=1){const s=this.rows.length;for(let i=0;i<s;i++)this.rows[i].cols[e].makeItems(t)}getCell(e,t,s=0){return this.rows[t].cols[e].items[s]}ToHTML(e="",t){this.tableName=e;let s="",i=0;for(const a of this.rows){i++;let r="";if(r=a.ToHTML(),r!==""){const c=a.rowName!==""?` class="${a.rowName}"`:"";s=`${s}<tr ${c} item-id="${i}">${r}</tr>`}}const n=e!==""?` class="${e}"`:"",o=t!==""?` id="${t}"`:"",l=t!==""?` item-id="${t}"`:"";return s=`<table${n}${o}${l}>${s}</table>`,s}ToScrollHTML(e="",t){const s=e!==""?` class="${e}"`:"",i=t!==""?` item-id="${t}"`:"";return`<div${s}${i}>
${this.ToHTML(e,t)}
</div>`}makeRowTemplate(e){if(this.rows.length>=1){for(const t of this.rows)t.rowName=e;this.template=this.rows[0].toTemplate()}}clearRows(){this.rows=new Array}addRow(e){const t=this.getTable();if(t===null)return-1;const s=t.insertRow(-1),i=t.rows.length;if(s.className=e,s.setAttribute("item-id",`${i}`),this.template!==null&&this.template.cols.length>=1){const n=this.template.toTemplate();let o="";for(const l of n.cols){let a="";for(const r of l.items){r.typeInfo.using.itemId=i;const c=r.ToHTML();c!==""&&(l.items.length>=2?a=`${a}<div>${c}</div>`:a=c)}a!==""&&(o=`${o}<td>${a}</td>`)}return s.innerHTML=o,i}return-1}deleteRow(e){const t=this.getTable();if(t===null)return!1;for(const s of t.rows){const i=s.getAttribute("item-id");if(i!==null&&i===`${e}`)return t.deleteRow(e-this.firstRowIndex),!0}return!1}redimAllRows(){const e=this.getTable();if(e===null)return;let t=this.firstRowIndex-1;for(const s of e.rows)if(s.getAttribute("item-id")!==null){t++,s.setAttribute("item-id",`${t}`);for(const n of s.cells)this.redimElems(n.children,t)}}redimElems(e,t){for(const s of e)s.getAttribute("item-id")!==null&&s.setAttribute("item-id",`${t}`),s.children!==void 0&&this.redimElems(s.children,t)}selectRow(e){const t=this.getTable();if(t!==null&&!(e<=0)&&!(e>t.rows.length)){for(const s of t.rows)s.classList!==void 0&&s.classList.remove("selected");t.rows[e-1].classList.add("selected")}}getSelectedRow(){const e=this.getTable();if(e===null)return this.invalidRowIndex;for(const t of e.rows)if(t.classList!==void 0&&t.classList.contains("selected")){const s=t.getAttribute("item-id");return s!==null?parseInt(s):this.invalidRowIndex}return this.invalidRowIndex}updateRowImage(e,t){const i=this.getTable()?.querySelector(`tr[item-id="${e}"] img`);i instanceof HTMLImageElement&&(i.src=t)}updateRowImageToolTip(e,t){const i=this.getTable()?.querySelector(`tr[item-id="${e}"] img`);i instanceof HTMLImageElement&&(i.title=t)}updateText(e,t){if(e.children!==null){const s=e.children[0];s.textContent=t}}scroll(e){const t=this.getTable();if(t===null||e<=0||e>t.rows.length)return null;const s=t.querySelector(`tr[item-id="${e}"] img`);return s===null||s===void 0?null:(s.scrollIntoView({behavior:"smooth",block:"center"}),s)}getRowElems(){const e=this.getTable();return e===null?null:e.rows}getElemValue(e){return e instanceof HTMLInputElement||e instanceof HTMLSelectElement?e.value:null}setElemValue(e,t){if(e instanceof HTMLInputElement){const s=e,i=s.value;return s.value=t,i}else if(e instanceof HTMLSelectElement){const s=e,i=s.value;return s.value=t,i}return null}getRowElem(e){const t=this.getTable();if(t===null)return null;for(const s of t.rows){const i=s.getAttribute("item-id");if(i!==null&&i===`${e}`)return console.log(`match row id : ${i}`),t.rows[e-this.firstRowIndex]}return null}getCellElems(e){if(e===null)return null;const t=new Array;for(const s of e.cells){if(s===null)continue;const i=new Array;for(const n of s.children)i.push(n);t.push(i)}return t}setVisible(e){const t=this.getTable();return t===null?null:(t.hidden=!e,t.parentElement.hidden=!e,!0)}getCellRect(e){const t=new L,s=t.GetRect(e.parentElement),i=t.GetRect(e),n=new Ye;return n.left=`${i.left}`,n.top=`${s.top}`,n.width=`${i.width}`,n.height=`${i.height}`,n}getTableOwnerRect(e){const t=new L,s=t.GetRect(e.parentElement.parentElement.parentElement.parentElement.parentElement);console.log(`[OWNER] ${s.left}, ${s.top}`);const i=t.GetRect(e.parentElement.parentElement.parentElement);console.log(`[TABLE] ${i.left}, ${i.top}`);const n=t.GetRect(e.parentElement.parentElement);console.log(`[TBODY] ${n.left}, ${n.top}`);const o=t.GetRect(e.parentElement);console.log(`[TROW] ${o.left}, ${o.top}`);const l=new Ye;return l.left=`${i.left}`,l.top=`${s.top}`,l.width="0",l.height="0",l}makeCallerName(e,t){return`${e}:${t}`}getCallerCellElem(e){const t=e.split(":");if(t===void 0||t.length!==2)return null;const s=this.getRowElem(parseInt(t[1]));if(s===null)return null;const i=this.getCellElems(s);if(i===null)return null;for(const n of i)for(const o of n)if(o.className===t[0])return o;return null}async toClipboard(){const e=this.getTable();if(e===null)return!1;let t="";for(const i of e.rows){let n="";const o=this.getCellElems(i);if(o===null)return!1;for(const l of o){let a="";for(const r of l){const c=this.getElemValue(r);let h=c===null?"&null&":`&${c}&`;a.length!==0?a=`${a}	${h}`:a=h}n.length!==0?n=`${n}	${a}`:n=`${a}`}t.length!==0?t=`${t}
${n}`:t=`${n}`}const s=`table:{${t}}`;try{await navigator.clipboard.writeText(s)}catch(i){return console.error("コピー失敗...",i),!1}return!0}async fromClipboard(){const e=this.getTable();if(e===null)return!1;let t="";try{t=await navigator.clipboard.readText()}catch(o){return console.error("ペースト失敗...",o),!1}this.clipboardText=t;const s="table:{";if(t.length<s.length+1||t.startsWith(s)===!1||t.endsWith("}")===!1)return!1;t=t.substring(s.length),t=t.substring(0,t.length-1);const i=t.split(`
`);let n=0;for(const o of e.rows){const a=i[n].split("	"),r=this.getCellElems(o);if(r===null)return!1;if(a.length!==r.length)return console.log(`different column size : line ${n+1}`),!1;n++}n=0;for(const o of e.rows){const a=i[n].split("	"),r=this.getCellElems(o);if(r===null)return!1;let c=0;for(const h of r){let d=a[c];if(d.startsWith("&")!==!1&&d.endsWith("&")!==!1&&(d=d.substring(1,d.length-1),d!=="null")){for(const u of h){this.setElemValue(u,d);break}c++}}n++}return!0}getTable(){const e=`.${this.tableName}`,t=document.querySelectorAll(e);if(t===null||t.length<=0)return null;const i=t[0].querySelectorAll(e);return i===null||i.length<=0?null:i[0]}setFontConfig(e="0.9"){this.fontSize=`font-size: ${e}em;`}getCssText(e,t,s){return`
/* テーブル */
.${e} {
width: 100%;                /* テーブル全体を親要素いっぱいに広げる */
table-layout: fixed;        /* これが重要！これで td の％指定が絶対になります */
height: 300px;              /* ダイアログに合わせた固定高 */
overflow-y: auto;
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
`.trim()}}class Jt{constructor(){this.htmlMaker=new L,this.table=new W,this.gridElem=null,this.headerElem=null,this.footerElem=null}makeKeyCell(e,t,s){const i=new wt;return i.typeInfo.setLabel(e,!1),i.className=t,i.typeInfo.toolTip=s,i}makePair(){return new Map}setPair(e){if(e.size===0)return!1;this.table.makeDim(2,e.size),e.forEach((s,i)=>{this.table.growCell(1,s.items.length)});let t=-1;return e.forEach((s,i)=>{t++,this.table.getCell(0,t).typeInfo.setLabel(i.typeInfo.using.label,!1),this.table.getCell(0,t).className=i.className;let n=-1;for(const o of s.items)n++,this.table.getCell(1,t,n).typeInfo=o.typeInfo,this.table.getCell(1,t,n).className=o.className}),!0}setListener(e,t,s,i="",n=""){this.dispose(),this.table.makeRowTemplate(t);const o=document.getElementById(s);if(o===null)return console.log(`[setListener] cannot found ${s}`),!1;const l=this.table.ToScrollHTML(e,e),a=new U;a.props.name="",a.props.id=e,a.props.className=e,a.props.option.setTable(l),a.props.option.onSelect=async h=>{console.log(`classify = ${h.classify} targetId = ${h.targetId}`),this.onSelect!==void 0&&await this.onSelect(h)},this.htmlMaker=new L,this.htmlMaker.add(a);const r=this.htmlMaker.ToHTML();let c=document.createElement("div");return c.className=e,c.innerHTML=r,this.gridElem=c.children[0],i!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=i,this.headerElem.id=i,o.appendChild(this.headerElem)),o.appendChild(this.gridElem),c.remove(),c=null,n!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=n,this.footerElem.id=n,o.appendChild(this.footerElem)),!0}getSelectedRow(){return this.table.getSelectedRow()}enableEvents(e){return this.gridElem===null?!1:(this.htmlMaker.enableTableEvents(this.gridElem.className),this.onSelect=e,!0)}disableEvents(){return this.gridElem===null?!1:(this.htmlMaker.disableTableEvents(this.gridElem.className),!0)}setVisible(e){return this.gridElem===null?!1:(this.gridElem.hidden=!e,!0)}dispose(){this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.gridElem!==null&&(this.gridElem.parentElement?.removeChild(this.gridElem),this.gridElem.remove()),this.disableEvents(),this.headerElem=null,this.footerElem=null,this.gridElem=null}getCssText(e,t,s){return this.table.getCssText(e,t,s)}}class st{constructor(){this.ctlName="",this.ovElem=null}firstAction(e,t){const s=document.getElementById(t);return s===null?(console.log(`[firstAction] cannot found ${t}`),null):(this.createOverlay(s),this.ctlName=e,s)}createOverlay(e){const t=document.createElement("div");t.id=`${this.ovCssName()}`,t.style.position="absolute",t.style.inset="0",t.style.zIndex=this.zIndexOv(),t.style.background="transparent",t.style.background="rgba(0,0,0,0.1)",e.appendChild(t),this.ovElem=t}getBaseElem(){return this.ovElem!==null?this.ovElem.parentElement:null}getOuterCssText(){return`
.${this.ctlName} {
  position: absolute;
  inset: auto;

  padding: 0;       /* 内側の余白をゼロに */
  border: none;     /* 枠線を消す（枠線があると1px〜ズレます） */
  overflow: hidden; /* 中身がはみ出さないように（任意） */

  /* box-shadow: 右へのズレ 下へのズレ ぼかし具合 影の広がり 影の色 */
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3); /* ほんのり黒い影 */
  border-radius: 4px; /* 角を少し丸くすると、影と馴染みます（任意） */

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
        `.trim()}dispose(){this.ovElem!==null&&(this.ovElem.parentElement?.removeChild(this.ovElem),this.ovElem.remove())}ovCssName(){return`${this.ctlName}-barrier`}zIndexCtl(){return"1000"}zIndexOv(){return"999"}}const Re={ByText:"ByText",ByValue:"ByValue",Both:"Both"};class qt extends st{constructor(){super(...arguments),this.ctlName="",this.initValue="",this.selectedIndex=-1,this.delimiter="/",this.callerName="",this.htmlMaker=new L,this.table=new W,this.ctlElem=null,this.onUpAction=async()=>{this.keyValuePairs!==void 0&&(this.selectedIndex=this.selectedIndex<=0?this.keyValuePairs.length-1:this.selectedIndex-1,this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]))},this.onDnAction=async()=>{this.keyValuePairs!==void 0&&(this.selectedIndex=this.selectedIndex>=this.keyValuePairs.length-1?0:this.selectedIndex+1,this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]))}}setListener(e,t,s){this.dispose(),this.callerName=s,this.ctlName=e;const i=new W;i.makeDim(1,3);let n=0;i.getCell(0,n).typeInfo.setButton("▲"),i.getCell(0,n).className=this.upCssName(),i.getCell(0,n).typeInfo.using.itemId=n,n++,i.getCell(0,n).typeInfo.setButton(""),i.getCell(0,n).className=this.valCssName(),i.getCell(0,n).typeInfo.using.itemId=n,n++,i.getCell(0,n).typeInfo.setButton("▼"),i.getCell(0,n).className=this.dwCssName(),i.getCell(0,n).typeInfo.using.itemId=n;const o=this.firstAction(e,t);if(o===null)return!1;const l=i.ToScrollHTML(e,e),a=new U;a.props.name="",a.props.id=this.tblCssName(),a.props.className=this.tblCssName(),a.props.option.setTable(l),a.props.option.onSelect=async u=>{switch(u.classify){case this.valCssName():if(this.onApply!==void 0){const p=new be;p.callerName=this.callerName,p.result=this.keyValuePairs[this.selectedIndex],await this.onApply(p)}break;case this.upCssName():if(this.onUp!==void 0){const p=new be;p.callerName=this.callerName,p.result=this.keyValuePairs[this.selectedIndex],await this.onUp(p),u.cancel||this.onUpAction()}break;case this.dwCssName():if(this.onDown!==void 0){const p=new be;p.callerName=this.callerName,p.result=this.keyValuePairs[this.selectedIndex],await this.onDown(p),u.cancel||this.onDnAction()}break}},this.htmlMaker=new L,this.htmlMaker.add(a);const r=this.htmlMaker.ToHTML();let c=document.createElement("dialog");c.className=e,c.innerHTML=r,this.ctlElem=c;let h=c.children[0],d=h.children[0];return d.className=`${this.tblCssName()}`,d.id=`${this.tblCssName()}`,this.ctlElem.appendChild(d),h.remove(),h=null,o.appendChild(this.ctlElem),this.table=i,!0}setSelectedByValue(e,t,s=Re.Both){const i=new Array;switch(s){case Re.ByText:i.push(0);break;case Re.ByValue:i.push(1);break;case Re.Both:i.push(0),i.push(1);break;default:return!1}this.initValue=e,this.keyValuePairs=t,this.selectedIndex=-1;const n=e.split(this.delimiter);let o=n.length>=2?n[1]:e,l="";for(const a of i){let r=-1;for(const c of t)if(r++,c!==null&&c!==""){const h=c.split(this.delimiter);if(h.length>=2&&h[a]===o){this.selectedIndex=r,l=h[0];break}}if(this.selectedIndex!==-1)break}if(this.selectedIndex===-1){const r=t[0].split(this.delimiter);this.selectedIndex=0,l=r[0]}return this.updateValueElemByText(l),this.selectedIndex!==-1}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-updn-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e,t,s){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onApply=e,this.onUp=t,this.onDown=s,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}updateValueElemByKeyValue(e){if(this.ctlElem===null)return;let t="";const s=e.split(this.delimiter);s.length>=2&&(t=s[0]),this.updateValueElemByText(t)}updateValueElemByText(e){if(this.ctlElem===null)return;const t=this.ctlElem.querySelectorAll(`.${this.valCssName()}`);t!==null&&(t[0].textContent=e)}tblCssName(){return`${this.ctlName}-tbl`}upCssName(){return`${this.ctlName}-upBtn`}dwCssName(){return`${this.ctlName}-dwBtn`}valCssName(){return`${this.ctlName}-values`}}class qe{constructor(){this.key="",this.text=""}}class Gt extends st{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new L,this.table=new W,this.ctlElem=null}setChoiceItems(e){this.items=e}setListener(e,t,s){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const i=this.items.length,n=new W;n.makeDim(1,i);let o=0;for(const p of this.items)n.getCell(0,o).typeInfo.setButton(`${p.text}`),n.getCell(0,o).className=`${e}-${p.key}`,n.getCell(0,o).typeInfo.using.itemId=o,o++;const l=this.firstAction(e,t);if(l===null)return!1;const a=n.ToScrollHTML(e,e),r=new U;r.props.name="",r.props.id=this.tblCssName(),r.props.className=this.tblCssName(),r.props.option.setTable(a),r.props.option.onSelect=async p=>{if(console.log(`classify = ${p.classify} targetId = ${p.targetId}`),this.onSelect!==void 0){const H=parseInt(p.targetId),S=new be;S.callerName=this.callerName,S.result=0<=H&&H<this.items.length?this.items[H].key:"",await this.onSelect(S)}},this.htmlMaker=new L,this.htmlMaker.add(r);const c=this.htmlMaker.ToHTML();let h=document.createElement("dialog");h.className=e,h.innerHTML=c,this.ctlElem=h;let d=h.children[0],u=d.children[0];return u.className=`${this.tblCssName()}`,u.id=`${this.tblCssName()}`,this.ctlElem.appendChild(u),d.remove(),d=null,l.appendChild(this.ctlElem),this.table=n,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-updn-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getBaseCssText()}
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}tblCssName(){return`${this.ctlName}-tbl`}}class jt{constructor(){this.key="",this.text=""}}class pt extends st{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new L,this.table=new W,this.ctlElem=null,this.headerElem=null,this.footerElem=null}setGridtems(e){this.items=e}setListener(e,t,s,i="",n=""){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const o=this.items.length,l=new W;l.makeDim(2,o);let a=0;for(const x of this.items)l.getCell(0,a).typeInfo.setLabel(`${x.text}`,!1),l.getCell(0,a).className=this.keyCssName(),l.getCell(0,a).typeInfo.using.itemId=a,l.getCell(1,a).typeInfo=x.value.items[0].typeInfo,l.getCell(1,a).className=this.valueCssName(),l.getCell(1,a).typeInfo.using.itemId=a,a++;const r=this.firstAction(e,t);if(r===null)return!1;const c=l.ToScrollHTML(e,this.tblCssName()),h=new U;h.props.name="",h.props.id=this.tblCssName(),h.props.className=this.tblCssName(),h.props.option.setTable(c),h.props.option.onSelect=async x=>{if(console.log(`classify = ${x.classify} targetId = ${x.targetId}`),this.onSelect!==void 0){const R=parseInt(x.targetId),A=new be;A.callerName=this.callerName,A.result=0<=R&&R<this.items.length?this.items[R].key:"",await this.onSelect(A)}},this.htmlMaker=new L,this.htmlMaker.add(h);const d=this.htmlMaker.ToHTML();let u=document.createElement("dialog");u.className=e,u.innerHTML=d,this.ctlElem=u;let p=u.children[0];const H=this.divCssName();p.className=H,p.id=H;let S=p.children[0];return S.className=`${this.tblCssName()}`,S.id=`${this.tblCssName()}`,i!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=i,this.headerElem.id=i,u.appendChild(this.headerElem)),r.appendChild(this.ctlElem),n!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=n,this.footerElem.id=n,u.appendChild(this.footerElem)),this.table=l,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}setFontConfig(e="0.9"){this.table.setFontConfig(e)}applyCss(){const e=`${this.getBaseElem().className}-flgrd-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
${this.table.getCssText(this.divCssName(),this.keyCssName(),this.valueCssName())}
.${this.ctlName} {
width: 200px;
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}divCssName(){return`${this.ctlName}-div`}tblCssName(){return`${this.ctlName}-tbl`}keyCssName(){return`${this.ctlName}-key`}valueCssName(){return`${this.ctlName}-value`}}class Wt{constructor(){this.itemType=E.Img,this.itemId=-1,this.label="",this.innerHTML=""}}class Nt{constructor(){this.toolTip="",this.using=new Wt}setButton(e){this.using.itemType=E.Btn,this.using.label=e}setLabel(e,t){this.using.itemType=t?E.Label:E.LabelRO,this.using.label=e}setCombo(e){this.using.itemType=E.Combo,this.using.combo=e}setInput(e){this.using.itemType=E.Input,this.using.input=e}setImg(e){this.using.itemType=E.Img,this.using.img=e}setPlain(e){this.using.itemType=E.Plain,this.using.innerHTML=e}setTable(e){this.using.itemType=E.Table,this.using.innerHTML=e}ToButtonHTML(e){const t=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"";return`
<button class="${e}"${t}>${this.using.label}</button>
`.trim()}ToLableHTML(e){return`
<span class="${e}" data-readonly="false">${this.using.label}</span>
`.trim()}ToLableROHTML(e){return`
<span class="${e}" data-readonly="true">${this.using.label}</span>
`.trim()}ToComboHTML(e){if(this.using.combo===void 0)return"";const t=this.using.combo;let s=U.makeComboItemsHTML(t);const i=t.classify!==""?` data-classify="${t.classify}"`:"";return`
<select class="${e}" ${i}>
  ${s}
</select>
`.trim()}ToInputHTML(e){if(this.using.input===void 0)return"";const t=this.using.input,s=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"",i=t.value!==""?` value="${t.value}"`:"",n=t.placeholder!==""?` placeholder="${t.placeholder}"`:"";return`
<input type="${t.type}" class="${e}"${s}${i}${n}>
`.trim()}ToImgHTML(e,t){let s="";return this.using.img.imgSrc===""?s=`src="" data-filename="${this.using.img.imgFile}"`:s=`src="${this.using.img.imgSrc}"`,`
<img class="${e}" ${s} alt="${t}">
`.trim()}ToOverlayHTML(){return`<div class="overlay" title="${this.toolTip}"></div>`}}class Kt{constructor(){this.name="",this.id="",this.className="",this.option=new Nt}}class U{constructor(){this.props=new Kt}ToHTML(e){let t="",s="";switch(e.option.using.itemType){case E.Btn:t=e.option.ToButtonHTML(e.className);break;case E.Label:t=e.option.ToLableHTML(e.className),s=e.option.ToOverlayHTML();break;case E.LabelRO:t=e.option.ToLableROHTML(e.className);break;case E.Plain:t=`
${e.option.using.innerHTML}
`.trim();break;case E.Combo:t=e.option.ToComboHTML(e.className);break;case E.Input:t=e.option.ToInputHTML(e.className);break;case E.Img:t=e.option.ToImgHTML(e.className,e.option.using.img.alt),s=e.option.ToOverlayHTML();break}return`
  ${t}
  ${s}
`.trim()}MakeSelectableHTML(){return`
<div class="${this.props.name}" id="${this.props.name}" item-id="${this.props.id}">
${this.ToHTML(this.props)}
</div>
`.trim()}static makeComboItemsHTML(e){if(e.selectionPair===void 0||e.selectionPair.length<=0)return"";let t="";for(const s of e.selectionPair){let[i,n]=s.split("/");n=n.trim();const o=e.selectedItem===n?" selected":"",l=`
<option value="${n}"${o}>${i}</option>
`.trim();t+=l}return t}}class L{constructor(){this._defaultButtonsName="dialog-buttons",this._defaultToolButtonsName="dialog-tool-btns",this._enableScrollEvt=!1,this._scrollTimer=null,this._isScrolling=!1,this.onButtonClicked=e=>{const t=e.target;if(t===null)return;const s=t.tagName==="BUTTON"?t:t.parentElement;if(s===null)return;let i=this.supplessSelected(s.className);if(i!==""){i=`.${i}`;const o=document.querySelectorAll(`${i}.selected`);o!==null&&o.forEach(l=>l.classList.remove("selected")),s.classList.add("selected")}const n=s.getAttribute("item-id");if(n){const o=this.itemList.find(l=>`${l.props.id}`===n);if(o){if(o.props.option.onSelect){let l="";t.tagName==="BUTTON"&&(l=t.getAttribute("item-id"),l===null&&(l=""));const a=new ge;a.parentElem=t.parentElement,a.item=o,a.targetId=l,o.props.option.onSelect(a)}this.selectedCh=o}else{let l=this.getTopElement(t);if(l?.tagName==="TABLE"){const a=l.className,r=this.itemList.find(c=>c.props.className===a);if(r){if(r.props.option.onSelect){let c="";t.tagName==="BUTTON"&&(c=t.getAttribute("item-id"),c===null&&(c=""));const h=new ge;h.parentElem=t.parentElement,h.item=r,h.targetId=c,h.classify=this.supplessSelected(t.className),r.props.option.onSelect(h)}this.selectedCh=r}}}}},this.onInputKeydown=e=>{const t=e.target;if(t===null||t.tagName!=="INPUT")return;const s=t,i=e;let n=re.None;switch(i.key){case Le.Enter:n=re.Normal;const l=i.repeat,a=i.timeStamp;let r=s.dataset.pressInfo;if(r===void 0)r=`1;${a}`,n=re.Normal;else if(!l){const c=r.split(";");if(c.length===2){let h=parseInt(c[0]),d=parseFloat(c[1]);a-d>=4*1e3?h=1:(h++,h>=3&&(h=0,n=re.Special)),r=`${h};${a}`}}s.dataset.pressInfo=r,i.preventDefault();break;case Le.Escape:s.value="元の値",s.blur();break;case Le.Tab:break;case Le.Process:return}const o=t.getAttribute("item-id");if(o){let l=this.getTopElement(t);if(l?.tagName==="TABLE"){const a=l.className,r=this.itemList.find(c=>c.props.className===a);if(r){const c=new ge;c.parentElem=t.parentElement,c.item=r,c.targetId=o,c.classify=this.supplessSelected(t.className),c.Keydown=i.key,c.KeyEnter=n,r.props.option.onSelect(c)}}}},this.onSelectChange=e=>{const t=e.target;if(t===null||t.tagName!=="SELECT")return;const s=t?.dataset.classify;let i=t.getAttribute("item-id");if(i===null){const n=this.getTopElement(t);n!==null&&(i=n.getAttribute("item-id"))}if(i){let n=this.itemList.find(o=>`${o.props.id}`===i);if(n===void 0&&(n=this.itemList.find(o=>`${s}${o.props.id}`===i)),n){if(n.props.option.onSelect){const o=new ge;o.parentElem=t.parentElement,o.item=n,o.targetId=i,o.classify=s===void 0?"?":s,o.selectedValue=t.value,n.props.option.onSelect(o)}this.selectedCh=n}}},this.itemList=new Array}add(e){this.itemList.push(e)}get DefaultBlueColor(){return"#86aef7e6"}get DefaultYellowColor(){return"#f7eb86e6"}get DefaultBorderColor(){return"#2c3e50ff"}MakeDefaultDialogParentCss(e,t,s,i=0){return`
.${e} {
  position: fixed;
  inset: auto; /* ブラウザの中央寄せを無効化 */
  top: ${s}px;
  left: ${t}px;
  transform: translateX(-50%);
  z-index: ${i}
}
`.trim()}MakeSystematicDialogCss(e){return`
.${e} {
  background-color: #86aef7;
  border: 2px solid #2c3e50;
  padding: 10px;
}
`.trim()}MakeDefaultDialogCss(e){return`
.${e} {
  background-color: #f7eb86e6;
  border: 2px solid #2c3e50;
  padding: 10px;
}
`.trim()}ToHTML(){let e="";for(const t of this.itemList){if(t.props.option.using.itemType===E.Table){e+=t.props.option.using.innerHTML;continue}e+=t.MakeSelectableHTML()}return`${e}`}MakeTableScrollCss(e,t,s=!1){return`
.${e} {
height: ${t}px;              /* ダイアログに合わせた固定高 */
overflow-y: auto;
overflow-x: ${s?"auto":"hidden"};
-webkit-overflow-scrolling: touch;  /* iPad用の滑らか設定 */
border: 1px solid #7b1fa2;        /* 紫色の枠線 */
background: rgba(192, 192, 192, 0.6);
}
`.trim()}MakeScrollableList(e){let t="";for(const s of this.itemList)t+=s.MakeSelectableHTML();return`<div id="${e}" class="${e} scroll">
${t}
</div>`}MakeDefaultScrollCss(e,t){return`
.${e} .scroll {
max-height: ${t}px;
overflow-y: auto;
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
font-size: 10px;
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
`.trim(),document.head.appendChild(s),!0}hideFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.add("hidden")}showFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.remove("hidden")}getFullScreenMsgElem(e){const t=document.getElementById(e);if(t){const s=t.querySelectorAll("p");return s!==null&&s.length>=1?s[0]:null}return null}initObserver(e,t){const s=document.getElementById(e);if(!s)return;const i=async l=>{await l.forEach(async a=>{if(a.isIntersecting){const r=a.target,c=this.isDemo&&!t.isMaterial(r.dataset.filename)?"demo.png":r.dataset.filename;if(console.log(`[${this.isDemo}] 見えた！:${r.dataset.filename}`),c&&r.src===""||r.src.startsWith(window.location.origin)){const h=await t.findNs(c);h===null||h===""?(this.observer.unobserve(r),console.log(`cannot set image : ${c}`)):await t.getImageUrlBy(c,h).then(d=>{d!==null?(r.src=d,this.observer.unobserve(r)):console.log(`pending set image : ${c}`)})}}})},n={root:s,rootMargin:"0px",threshold:.1};this.observer=new IntersectionObserver(i,n),s.querySelectorAll("img[data-filename]").forEach(l=>this.observer.observe(l)),console.log("[initObserver] enabled!")}get isDemo(){return window.EVONA_CONFIG.demo}get isScrolling(){return this._enableScrollEvt?!(this._scrollTimer!==null&&this._isScrolling):!1}enableScrollEvent(e){this._isScrolling=!1;const t=document.getElementById(e);return t?(this._enableScrollEvt=!0,t.addEventListener("scroll",()=>{this._isScrolling=!0,clearTimeout(this._scrollTimer),this._scrollTimer=setTimeout(()=>{this._scrollTimer=null,this._isScrolling=!1;const s=this.observer.takeRecords();console.log(`[enableScrollEvent] stopped ${s.length}`)},200)}),console.log("[enableScrollEvent] enabled!"),!0):!1}enableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(i=>{const n=i.querySelectorAll("img");n.length>=1&&(n[0],this.addButtonEvent(t,i));const o=i.querySelectorAll("span");o.length>=1&&o[0]?.dataset.readonly=="false"&&this.addButtonEvent(t,i);const l=i.querySelectorAll("select");l.length>=1&&(l[0],this.addSelectEvent(t,i));const a=i.querySelectorAll("button");if(a.length>=1)for(const r of a)console.log(`${i.tagName}::${t}::button::${r.innerHTML}`),i.addEventListener("click",this.onButtonClicked)})}enableTableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(i=>{const n=i.querySelectorAll("table");n.length>=1&&(n[0],i.addEventListener("click",this.onButtonClicked),i.addEventListener("keydown",this.onInputKeydown),i.addEventListener("change",this.onSelectChange))})}disableTableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(i=>{const n=i.querySelectorAll("table");n.length>=1&&(n[0],i.removeEventListener("click",this.onButtonClicked),i.removeEventListener("keydown",this.onInputKeydown),i.removeEventListener("change",this.onSelectChange))})}addButtonEvent(e,t){t.getAttribute("item-id")&&t.addEventListener("click",this.onButtonClicked)}addInputEvent(e,t){t.getAttribute("item-id")&&t.addEventListener("keydown",this.onInputKeydown)}addSelectEvent(e,t){t.addEventListener("change",s=>{const i=s.target,n=i?.dataset.classify,o=t.getAttribute("item-id");if(o){let l=this.itemList.find(a=>`${a.props.id}`===o);if(l===void 0&&(l=this.itemList.find(a=>`${n}${a.props.id}`===o)),l){if(l.props.option.onSelect){const a=new ge;a.item=l,a.targetId=o,a.classify=n===void 0?"?":n,a.selectedValue=i.value,l.props.option.onSelect(a)}this.selectedCh=l}}})}supplessSelected(e){let t=e,s=e.indexOf(" selected");return s>=0&&(t=e.substring(0,s)),t}getTopElement(e){let t=e.parentElement;for(;t!==null;){if(t.tagName==="DIV"){t=t.parentElement;continue}if(t.tagName==="TD"){t=t.parentElement;continue}if(t.tagName==="TR"){t=t.parentElement;continue}if(t.tagName==="TBODY"){t=t.parentElement;continue}break}return t}GetRect(e){const t=e.getBoundingClientRect(),s=new Ye;return s.left=`${t.left}`,s.top=`${t.top}`,s.width=`${t.width}`,s.height=`${t.height}`,s}EnableElem(e,t){e.ariaDisabled=t?"false":"true"}IsEnabledElem(e){return e.ariaDisabled===null?!0:e.ariaDisabled==="false"}GetIdByIndex(e){return this.itemList[e].props.id}UnselectAll(e){const t=`.${e}`;document.querySelectorAll(`${t}.selected`).forEach(s=>s.classList.remove("selected"))}SelectByID(e,t){const s=this.FindByID(e,t);if(s){s.classList.add("selected");const i=s.getAttribute("item-id");if(i){const n=this.itemList.find(o=>`${o.props.id}`===i);n&&(this.selectedCh=n)}return s}return null}FindDivByClassName(e,t){const s=`.${e}`,i=document.querySelectorAll(`${s}`);for(const n of i){const o=n.querySelectorAll("div");for(const l of o)if(l.className===t||l.className.startsWith(t))return l}return null}FindByID(e,t){const s=`.${e}`,i=document.querySelectorAll(`${s}`);for(const n of i){const o=n.getAttribute("item-id");if(o&&o===t)return n}return null}FindImgByID(e,t){const s=`.${e}`,i=document.querySelectorAll(`${s}`);for(const n of i){const o=n.getAttribute("item-id");if(o&&o===t){const l=n.querySelectorAll("img");return l.length>=1?l[0]:null}}return null}FindImgsByID(e,t){const s=`.${e}`,i=document.querySelectorAll(`${s}`);for(const n of i){const o=n.getAttribute("item-id");if(o&&o===t){const l=n.querySelectorAll("img");return l.length>=1?l:null}}return null}FindDivByID(e,t){const s=`.${e}`,i=document.querySelectorAll(`${s}`);for(const n of i){const o=n.getAttribute("item-id");if(o&&o===t){const l=n.querySelectorAll("div");return l.length>=1?l[0]:null}}return null}FindSelectByID(e,t,s){const i=`.${e}`,n=document.querySelectorAll(`${i}`);for(const o of n){const l=o.getAttribute("item-id");if(l&&l===t){const a=o.querySelectorAll("select");if(a.length>=1){for(const r of a)if(r?.dataset.classify===s)return r}return null}}return null}ReplaceImg(e,t,s){const i=this.FindImgByID(e,t);return i===null?null:(i.dataset.filename,i.src=s,i)}ReplaceDivToolTip(e,t,s){const i=this.FindDivByID(e,t);return i===null?null:(i.title=s,i)}ReplaceImgToolTip(e,t,s){const i=this.FindImgByID(e,t);return i===null?null:(i.title=s,i)}SetImgSrc(e,t){if(e===null)return null;e.dataset.filename,e.src=t}SetImgSize(e,t,s){if(e===null)return null;e.style.width=`${t}px`,e.style.height=`${s}px`}ReplaceComboItems(e,t,s){const i=this.FindSelectByID(e,t,s.classify);if(i===null)return null;i.querySelectorAll("option").length>=1&&(i.innerHTML="");const o=U.makeComboItemsHTML(s);return o!==""&&(i.innerHTML=o),i}setVisible(e,t){const s=document.getElementById(e);return s===null?null:(s.hidden=!t,!0)}copyCssToInlineStyle(e,t){for(const s of document.styleSheets){let i;try{i=s.cssRules}catch{continue}for(const n of i)if(n instanceof CSSStyleRule&&n.selectorText===e){const o=n.style;console.log(`[copyCssToInlineStyle] coping [${e}]`);for(let l=0;l<o.length;l++){const a=o[l],r=o.getPropertyValue(a);t.style.setProperty(a,r)}return}}}}const ce={Hide:"Hide",CopyPaste:"CopyPaste"},Ce={Hide:"Hide",MoveLowest:"MoveLowest"},ie={Copy:"Copy",Paste:"Paste",Cancel:"Cancel"};class j{constructor(){this.title="",this.dlgName="",this.B2Type=ce.Hide,this.B3Type=Ce.MoveLowest,this.initLeft=0,this.initTop=0,this.cornerIndex=-1,this.mover=new Yt,this.moverOnMoveDone=async()=>{this.onMoveDone!==void 0&&(await this.onMoveDone(this.dlg),this.cornerIndex=0)},this.resizer=new Xt,this.resizerOnResizeDone=async(e,t)=>{this.onResizeDone!==void 0&&await this.onResizeDone(this.dlg,e,t)},this.isIPad=/iPad|Macintosh/.test(navigator.userAgent)&&"ontouchend"in document,this.isTouchDevice=()=>"ontouchstart"in window||navigator.maxTouchPoints>0}SetB2Type(e=ce.CopyPaste,t){this.B2Type=e,this.onCopyPaste=t}SetB3Type(e=Ce.MoveLowest){this.B3Type=e}NewDialog(e,t){this.dlgName=t;const s=document.createElement("dialog");s.id=t,s.className=t;const i=document.getElementById(e);return i.appendChild(s),this.dlgParent=i,this.dlg=s,s}SetContent(e,t,s=!0){const i=this.dlg,n=`<button class="${this.toolNameB0}" id="${this.toolNameB0}" title="DragMove">[＊]</button>`,o=`<button class="${this.toolNameB1}" id="${this.toolNameB1}" title="SideBy">[≫]</button>`;let l="";this.B2Type===ce.CopyPaste&&(l=`<button class="${this.toolNameB2}" id="${this.toolNameB2}" title="Copy&Paste">[⇔]</button>`);let a="";this.B3Type===Ce.MoveLowest&&(a=`<button class="${this.toolNameB3}" id="${this.toolNameB3}" title="MoveLowest">[_]</button>`);const r=`${n}${o}${l}${a}`;let c="";this.title!==""?c=`<div class="${this.titleName}">${this.title}${r}</div>`:c=`<div class="${this.titleName}">${r}</div>`;const h=document.createElement("div");h.innerHTML=c,i.innerHTML=t;const d=document.getElementById(e);d.hidden=s,d.appendChild(h),d.appendChild(i),this.applyCss()}EnableEventHandlers(){const e=this.dlgParent.style.left,t=this.dlgParent.style.top;this.initLeft=parseInt(e.substring(0,e.length-2)),this.initTop=parseInt(t.substring(0,t.length-2)),console.log(`[EnableEventHandlers] ${this.dlgParent.id}::(${e},${t})::(${this.initLeft},${this.initTop})`);const s=document.getElementById(`${this.toolNameB0}`);s!==null&&(this.mover.onMoveDone=this.moverOnMoveDone,this.mover.attach(s,this.dlgParent));const i=document.getElementById(`${this.toolNameB1}`);i!==null&&(i.onclick=async()=>{if(this.dlgParent===void 0)return;const n=window.innerWidth,o=window.innerHeight,l=this.dlgParent.offsetWidth/2,a=Math.max(this.dlgParent.offsetWidth,this.dlg.offsetWidth),r=this.dlgParent.offsetHeight+this.dlg.offsetHeight;switch(this.cornerIndex=(this.cornerIndex+1)%4,this.cornerIndex){case 0:this.dlgParent.style.left=`${l}px`,this.dlgParent.style.top="0px";break;case 1:this.dlgParent.style.left=`${n-a+l}px`,this.dlgParent.style.top="0px";break;case 2:this.dlgParent.style.left=`${n-a+l}px`,this.dlgParent.style.top=`${o-r}px`;break;case 3:this.dlgParent.style.left=`${l}px`,this.dlgParent.style.top=`${o-r}px`;break}}),this.B2Type===ce.CopyPaste&&(document.getElementById(`${this.toolNameB2}`).onclick=async()=>{if(this.dlgParent===void 0||this.onCopyPaste===void 0)return;const n=this.dlgParent,o=n.querySelectorAll(`.${this.toolNameB2}`),l=o.length>=1?o[0]:null,a=new L;if(a.IsEnabledElem(l)===!1)return;const r=new Array,c=new qe;c.key=ie.Copy,c.text="クリップボードへコピー",r.push(c);const h=new qe;h.key=ie.Paste,h.text="クリップボードからペースト",r.push(h);const d=new qe;d.key=ie.Cancel,d.text="キャンセル",r.push(d);const u=new Gt;u.setChoiceItems(r),a.EnableElem(l,!1);const p=a.GetRect(n);a.GetRect(this.dlg);const H=a.GetRect(l),S=this.dlg.className;u.setListener(`${S}-choice`,S,`${S}-B2`),u.applyCss(),u.show(`${parseInt(H.left)-parseInt(p.left)}`,"0"),u.enableEvents(async x=>{console.log(`[onSelect] ${x.callerName} ${x.result}`),u.dispose(),this.onCopyPaste(this.dlg,x.result),a.EnableElem(l,!0)})}),this.B3Type===Ce.MoveLowest&&(document.getElementById(`${this.toolNameB3}`).onclick=async()=>{if(this.dlgParent===void 0)return;new C().MoveLowestLayer(this.dlgParent)})}EnableResize(){if(this.isIPad&&this.isTouchDevice()){console.log("EVONA: Touch device detected. Priority given to flick scrolling.");return}const e=`<button class="${this.handleNameB0}" id="${this.handleNameB0}" title="Resize">[」]</button>`,t=document.createElement("div");t.className=this.handleName,t.id=this.handleName,t.innerHTML=`${e}`,this.dlg.appendChild(t);const s=document.getElementById(`${this.handleName}`);s!==null&&(s.style.position="absolute",s.style.left=`${this.dlg.clientWidth-s.clientWidth}px`,s.style.top=`${this.dlg.clientHeight-s.clientHeight}px`,this.resizer.onResizeDone=this.resizerOnResizeDone,this.resizer.attach(s,this.dlg))}static GetDialogInfo(e){const t=this.FindDialogParent(e);if(t===null)return null;const s=t.querySelector("dialog");if(s===null)return null;const i=new de,n=s.clientWidth,o=s.clientHeight;return i.name=e,i.left=t.style.left,i.top=t.style.top,i.width=`${n}px`,i.height=`${o}px`,i}static SetDialogInfo(e){const t=this.FindDialogParent(e.name);if(t===null)return!1;const s=t.querySelector("dialog");return s===null?!1:(t.style.left=e.left,t.style.top=e.top,s.style.width=e.width,s.style.height=e.height,!0)}static FindDialogParent(e){const t=document.getElementById(e);return t??null}get titleName(){return`${this.dlgName}-dlg-title-00`}get toolNameB0(){return`${this.dlgName}-dlg-tool-b0`}get toolNameB1(){return`${this.dlgName}-dlg-tool-b1`}get toolNameB2(){return`${this.dlgName}-dlg-tool-b2`}get toolNameB3(){return`${this.dlgName}-dlg-tool-b3`}get handleName(){return`${this.dlgName}-dlg-handle-00`}get handleNameB0(){return`${this.dlgName}-dlg-handle-b0`}applyCss_old(){const e=document.createElement("style");e.textContent=`
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
`.trim(),document.head.appendChild(t)}}class de{constructor(){this.name="",this.left="",this.top="",this.width="",this.height=""}copyTo(e){e.name=this.name,e.left=this.left,e.top=this.top,e.width=this.width,e.height=this.height}}class C{add(e){C.dlgElems.push(e)}AddDialogs(){C.dlgElems=new Array;const e=document.querySelectorAll("div");for(const t of e)t.style.zIndex!==""&&(parseInt(t.style.zIndex)>=C.ignoreIndex||t.querySelector("dialog")&&(console.log(`${t.id} added!`),this.add(t)))}AssignIndexies(){let e=C.dlgElems.length-1;for(const t of C.dlgElems)t.style.zIndex=`${e}`,e--}MoveLowestLayer(e){C.dlgElems.length;for(const t of C.dlgElems)if(t.id===e.id)t.style.zIndex="0";else{const s=t.style.zIndex;t.style.zIndex=`${parseInt(s)+1}`}}MoveHiestLayer(e){C.dlgElems.length;let t=-1;for(const s of C.dlgElems){const i=parseInt(s.style.zIndex);i>=C.ignoreIndex||i>t&&(t=i)}for(const s of C.dlgElems)if(s.id===e.id){s.style.zIndex=`${t}`;break}for(const s of C.dlgElems)if(s.id!==e.id){if(parseInt(s.style.zIndex)>=C.ignoreIndex)continue;t--,s.style.zIndex=`${t}`}}FindByName(e){const t=C.dlgElems.find(s=>s.id===e);return t||null}async ForEachAsync(e){for(const t of C.dlgElems)t.parentNode!==null&&await e(t.id)}ReOrder(){C.dlgElems.sort((e,t)=>{const s=e.style.zIndex,i=t.style.zIndex;if(s===""||i==="")throw new Error("z-index が未設定の要素が混入しています");return parseInt(t.style.zIndex)-parseInt(e.style.zIndex)})}async SaveSetting(e,t=!0){if(this.canSave&&e!==null&&e.parentElement!==null){if(t&&this.FindByName(e.parentElement.className)===null){console.log(`${e.className} is out of managed dlg`);return}await this.initSetting(),await C.setingAccess.saveDialogPos(e)}}async LoadAllSetting(){if(this.canSave){await this.initSetting();for(const e of C.dlgElems){const t=e.querySelector("dialog");t!==null&&await C.setingAccess.loadDialogPos(t)}}}async loadSetting(e){this.canSave&&(await this.initSetting(),e!==null&&await C.setingAccess.loadDialogPos(e))}async initSetting(){C.setingAccess===null&&(C.setingAccess=new bt,await C.setingAccess.init())}get canSave(){return!new L().isDemo}}C.ignoreIndex=1e3;C.setingAccess=null;class Yt{constructor(){this.isDragging=!1,this.startX=0,this.startY=0}attach(e,t){e.onpointerdown=s=>{e.setPointerCapture(s.pointerId),this.isDragging=!0,this.startX=s.clientX-t.offsetLeft,this.startY=s.clientY-t.offsetTop,e.style.cursor="grabbing"},e.onpointermove=s=>{if(!this.isDragging)return;const i=s.clientX-this.startX,n=s.clientY-this.startY;t.style.left=`${i}px`,t.style.top=`${n}px`,t.style.margin="0"},e.onpointerup=async s=>{this.isDragging=!1,e.releasePointerCapture(s.pointerId),e.style.cursor="grab",this.onMoveDone!==void 0&&await this.onMoveDone()}}}class Xt{constructor(){this.isDragging=!1,this.startX=0,this.startY=0,this.startW=0,this.startH=0,this.handleX=0,this.handleY=0}attach(e,t){e.onpointerdown=s=>{e.setPointerCapture(s.pointerId),this.isDragging=!0,this.startX=s.clientX,this.startY=s.clientY;const i=t.getBoundingClientRect();console.log(`[${t.className}] (${i.left},${i.top}) - (${i.width},${i.height})`),this.startW=i.width,this.startH=i.height,this.handleX=e.offsetLeft,this.handleY=e.offsetTop,e.style.cursor="grabbing"},e.onpointermove=s=>{if(!this.isDragging)return;const i=s.clientX-this.startX,n=s.clientY-this.startY;t.style.width=`${this.startW+i-e.clientWidth}px`,t.style.height=`${this.startH+n-e.clientHeight}px`,e.style.left=`${this.handleX+i}px`,e.style.top=`${this.handleY+n}px`,e.style.margin="0"},e.onpointerup=async s=>{if(this.isDragging=!1,e.releasePointerCapture(s.pointerId),e.style.cursor="grab",this.onResizeDone!==void 0){const i=t.getBoundingClientRect();await this.onResizeDone(`${i.width-this.startW}`,`${i.height-this.startH}`)}}}}class oe{get iconFileName(){return this.id===null&&!Number.isNaN(this.id)?`${this.name}_${this.idAsText}.png`:`${this.name}_${this.id}.png`}constructor(e=0,t=""){this.ns=D.None,this.id=0,this.name="",this.contentURL="",this.iconURL="",this.idAsText="",this.idAttributeForHTML="",this.id=e,this.name=t}parseFromImgName(e){let t=e.indexOf("_");if(t>=0){const s=e.substring(0,t);let i=e.substring(t+1);if(t=i.indexOf("."),t>=0)return i=i.substring(0,t),this.id=Number.parseInt(i),this.name=s,this.idAsText=Number.isNaN(this.id)?i:"",!0}return!1}}class _t{constructor(){this.itemName="",this.chNames=new Array,this.index=-1}reset(){this.itemName="",this.chNames=new Array,this.index=-1,this.onScroll=null}toCombo(e,t,s){this.reset();const i=`.${e}`,n=document.querySelectorAll(`${i} div[title*="${s}"]`);let o=-1,l="";for(const r of n){const c=r;console.log(c.title),o++;const h=c.title.trim(),d=h,p=`
 <option value="${h}"${o===0?" selected":""}>${d}</option>
`.trim();l+=p,this.chNames.push(d)}if(o===-1)return null;const a=document.createElement("select");return a.id=t,a.className=t,a.innerHTML=l,this.itemName=e,a}addEvent(e,t){e.addEventListener("change",s=>{const n=s.target.value;this.chNames.find(l=>l===n)&&this.scrollAction(n)}),this.onScroll=t}findFirst(){return this.chNames.length===0?!1:(this.index=0,this.scrollAction(this.chNames[this.index]),!0)}scroll(e){const t=`.${this.itemName}`,s=document.querySelector(`${t} div[title="${e}"]`);if(s===null)return null;const i=s.closest(t);return i===null?null:(i.scrollIntoView({behavior:"smooth",block:"center"}),s)}scrollAction(e){const t=this.scroll(e);t&&this.onScroll!==null&&this.onScroll(t)}}class we{constructor(){this.uiInfo=new de,this.charFinder=new _t,this.parentName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new C().SaveSetting(e)}}MakeList(){}async LoadList(e){const i=(await new Ie().loadJson(e)).map(o=>Object.assign(new oe,o)),n=new we;return n.chList=i,this.uiInfo.copyTo(n.uiInfo),n}findByNs(e){return e===D.None?void 0:this.chList.filter(s=>s.ns===e)}async toHTML(e){if(!this.chList)return"";this.htmlMaker=new L;let t=0;for(const s of this.chList){t++;const i=`chuid${t}`;s.idAttributeForHTML=i;const n="",o=new et;o.imgSrc=n,o.imgFile=s.iconFileName;const l=new U;l.props.name=this.itemCssClassName(),l.props.id=i,l.props.className=this.imgCssClassName(),l.props.option.setImg(o),l.props.option.toolTip=s.name,l.props.option.onSelect=a=>{this.setSelectedItem(a.item.props.id)},this.htmlMaker.add(l)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createSelectorBox(e,t,s){this.parentName=t;const i=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="${this.charOpenUrlCssClassName()}">URL</button>
<button id="char-dlg-close">閉じる</button>
`),n=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${s}
    <label id="char-dlg-chinfo">未選択</label>
    <input type="text" id="${this.charSeachInputCssClassName()}" placeholder="キャラ名検索...">
    ${i}
</div>`,o=new j;o.title="<"+e+">";const l=o.NewDialog(t,this.dlgCssClassName());return o.SetContent(t,n),this.applyCss(),o.EnableEventHandlers(),o.onMoveDone=this.moverOnMoveDone,l}addEventHandlers(e){document.getElementById(this.charSeachInputCssClassName()).oninput=t=>{if(t!==null&&t.target!==null){const s=t.target;console.log(s.value);const i=s.value,n=this.charSeachComboCssClassName(),o=document.getElementById(n);o!==null&&o.parentNode?.removeChild(o);const l=this.charFinder.toCombo(this.itemCssClassName(),n,i);if(l!==null){const a=document.getElementById(this.dlgContentCssClassName());a!==null&&(a.appendChild(l),this.charFinder.addEvent(l,r=>{const h=r.parentElement.getAttribute("item-id");this.htmlMaker.SelectByID(this.itemCssClassName(),h)}),this.charFinder.findFirst())}}},document.getElementById(this.charOpenUrlCssClassName()).onclick=async()=>{if(this.selectedCh===void 0)return;const t=this.chList.find(s=>this.selectedCh.idAttributeForHTML===s.idAttributeForHTML);if(t){this.charOpenUrlCssClassName();const s=new he;if(s.setParent(this.dlgCssClassName()),s.setYesNo(),await s.showWait(`${t.name} をブラウザで開いてよろしいですか？`)===N.Yes){const n=t.contentURL;window.open(n,"_blank")}}},document.getElementById("char-dlg-close").onclick=()=>{document.getElementById(this.parentName).hidden=!0}}addItemEventHandlers(){const e=this.htmlMaker.GetIdByIndex(0);this.htmlMaker.SelectByID(this.itemCssClassName(),e),this.htmlMaker.enableEvents(this.itemCssClassName()),this.setSelectedItem(e)}setSelectedItem(e){const t=this.chList.find(s=>e===s.idAttributeForHTML);t&&(document.getElementById("char-dlg-chinfo").textContent=t.name,this.selectedCh=t)}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}itemCssClassName(){return"char-item"}imgCssClassName(){return"base"}listCssClassName(){return"char-list"}dlgContentCssClassName(){return"char-dlg-content"}dlgCssClassName(){return"char-dlg"}charSeachInputCssClassName(){return"char-search-input"}charSeachComboCssClassName(){return"char-search-combo"}charOpenUrlCssClassName(){return"char-open-url"}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),i=parseInt(this.uiInfo.left),n=parseInt(this.uiInfo.top),o=document.createElement("style");o.textContent=`
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
`.trim(),document.head.appendChild(o);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}}class te{constructor(){this.ns=D.None,this.id=0,this.name="",this.contentURL="",this.iconURL=""}static toJsonText(e){const t=te.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new te;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}static fromJsonInst(e){const t=new oe;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}}class Ne{constructor(){this.title="",this.key="",this.selectionPair=[],this.selectedVal="",this.initScoreVal=0,this.mulScoreVal=0,this.available=!1}get stdScore(){const e=this.selectedVal.length>=1?this.selectedVal:"1",t=parseInt(e);return this.initScoreVal+t*this.mulScoreVal}get selectedText(){if(this.selectionPair.length!==0&&this.selectedVal!=="")for(const e of this.selectionPair){const t=e.split("/");if(t[1]===this.selectedVal)return t[0]}}}class z{constructor(){this.items=new Array,this.allow=new Map,this.roleText="",this.comboText=""}makeDemoLvText(e){let t="";for(let s=1;s<=100;s++)t+=`"${e}${s}/${s}",`;return t=t.substring(0,t.length-1),t}load(){const e=this.makeDemoLvText("Lv"),t=this.makeDemoLvText("Lv"),s=this.makeDemoLvText(""),i=`
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
`,o=JSON.parse(i).map(l=>Object.assign(new Ne,l));this.items=o}save(){console.log(JSON.stringify(this,null,2))}clone(){const e=new z;for(const t of this.items){const s=JSON.stringify(t,null,2),i=JSON.parse(s);e.items.push(i)}return e}static copy(e,t,s=!1){for(let i=0;i<e.items.length;i++){const n=e.items[i],o=s?new Ne:t.items[i];o.title=n.title,o.key=n.key,o.selectionPair=n.selectionPair,o.selectedVal=n.selectedVal,o.initScoreVal=n.initScoreVal,o.mulScoreVal=n.mulScoreVal,o.available=n.available,s&&t.items.push(o)}}set(e,t){const s=this.items.find(i=>i.key===e);return s?(s.selectedVal=t,!0):!1}get stdScore(){let e=0;for(const t of this.items)t.available&&(e+=t.stdScore);return e}get allAvailable(){for(const e of this.items)if(e.available===!1)return!1;return!0}static calcScore(e,t){const s=t.split("+");let i=0;for(const n of s){const o=n.trim();if(o.endsWith("()")){const l=o.slice(0,-2);typeof e[l]=="function"?i+=e[l]():console.warn(`関数 '${l}' が存在しません`)}else{const l=e[o];typeof l=="number"?i+=l:Array.isArray(l)?i+=l.reduce((a,r)=>a+r,0):console.warn(`プロパティ '${o}' が数値ではありません`)}}return i}static calcScoreAdvanced(e,t){const s=Object.keys(e),i=s.map(o=>e[o]);return new Function(...s,`return ${t};`)(...i)}toInst(e){return(i=>{const n=class{constructor(){i.forEach((o,l)=>{this[l]=o})}};return new n})(e)}}class Qt{constructor(){this.intervalMs=1e3,this.isOneShot=!0,this.intervalTimer=null}start(e,t){this.intervalTimer!==null&&this.clear(),this.intervalTimer=setTimeout(async()=>{t!==void 0&&(await t(e)||this.clear()),this.isOneShot===!0&&this.clear()},this.intervalMs)}clear(){clearTimeout(this.intervalTimer),this.intervalTimer=null}}const le={Resource:"Resource",ScoreUI:"ScoreUI"},ue={Sequence:"Sequence",Text:"Text"};class It{constructor(){this.key="",this.text=""}}class kt extends It{constructor(){super(...arguments),this.comment=""}}class Tt extends It{constructor(){super(...arguments),this.selectType=ue.Sequence,this.start="",this.end="",this.step="",this.keyValue=""}}class De{constructor(){this.resItem=new kt,this.scItem=new Tt}get isScoreAvail(){if(this.scItem.key.trim().length===0||this.scItem.text.trim().length===0)return!1;if(this.scItem.selectType===ue.Sequence){if(this.scItem.start.trim().length===0||this.scItem.end.trim().length===0||this.scItem.step.trim().length===0)return!1}else if(this.scItem.keyValue.trim().length===0)return!1;return!0}}class St{constructor(){this.gameType=J.none,this.itemList=new Array,this.resLogToItem=e=>{const t=e;for(const s of t.inst){const i=new De;i.owner=this,i.resItem=s,this.itemList.push(i)}},this.scLogToItem=e=>{const t=e;if(t.gameType===this.gameType)for(const s of t.inst){const i=new De;i.owner=this,i.scItem=s,this.itemList.push(i)}},this.editorConfigs=[{editorType:le.Resource,logType:me.ResourceEditAction,fromJsonText:Xe.fromJsonText,logToItem:this.resLogToItem},{editorType:le.ScoreUI,logType:me.ScoreEditAction,fromJsonText:_e.fromJsonText,logToItem:this.scLogToItem}],this.actEditor=this.editorConfigs[0]}init(){for(let e=0;e<10;e++){const t=new De;t.owner=this,this.itemList.push(t)}}async load(e,t){const s=this.getEditor(e);if(s===void 0)return;this.actEditor=s!==void 0?s:this.editorConfigs[0],this.gameType=t;const i=s.logType,o=await(await ne()).get(i);if(o===null)return;const l=i,a=new Map,r=new Array;this.usingLog(l,o,a,r),this.itemList=new Array;for(const[c,h]of a){const d=s.fromJsonText(h.log);s.logToItem(d)}this.itemList.length===0&&this.init()}async loadUnused(e){const s=await(await ne()).get(e);if(s===null)return null;const i=new Map,n=new Array;return this.usingLog(e,s,i,n),n}usingLog(e,t,s,i){for(const n of t){let l=this.actEditor.fromJsonText(n.log).logType,a=!1,r=!1;switch(l){case se.None:break;case se.Add:a=!0;break;case se.Update:a=!0;break;case se.Delete:a=!0,r=!0;break}if(a)if(r){if(s.has(e)){const c=s.get(e);i.push(c),s.delete(e)}}else{if(s.has(e)){const c=s.get(e);i.push(c),s.delete(e)}s.set(e,n)}}}getEditor(e){return this.editorConfigs.find(s=>s.editorType===e)}get editorType(){return this.actEditor.editorType}}class ft extends St{constructor(){super(...arguments),this.uiInfo=new de,this.parentName="",this.saveTimer=null,this.onSave=async e=>(console.log(`${e.parentName}`),!1),this.setColKey=(e,t,s,i)=>{const n=new Z;n.value=t.owner.editorType==le.Resource?t.resItem.key:t.scItem.key,n.placeholder="キー",i.getCell(e,s).typeInfo.setInput(n),i.getCell(e,s).className=this.itemKeyCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.setColValue=(e,t,s,i)=>{const n=new Z;n.value=t.owner.editorType==le.Resource?t.resItem.text:t.scItem.text,n.placeholder="文字列",i.getCell(e,s).typeInfo.setInput(n),i.getCell(e,s).className=this.itemDispCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.setColComment=(e,t,s,i)=>{const n=new Z;n.value=t.resItem.comment,n.placeholder="コメント",i.getCell(e,s).typeInfo.setInput(n),i.getCell(e,s).className=this.itemCommentCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.setColSelectType=(e,t,s,i)=>{const n=new Ae;n.selectionPair=[`連続/${ue.Sequence}`,`文字列/${ue.Text}`],n.selectedItem=t.scItem.selectType,n.classify="selectType",i.getCell(e,s).typeInfo.setCombo(n),i.getCell(e,s).className=this.itemSelectTypeCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.setColSelectStart=(e,t,s,i)=>{const n=new Z;n.value=t.scItem.start,n.placeholder="開始",i.getCell(e,s).typeInfo.setInput(n),i.getCell(e,s).className=this.itemSeqTypeStartCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.setColSelectEnd=(e,t,s,i)=>{const n=new Z;n.value=t.scItem.end,n.placeholder="終了",i.getCell(e,s).typeInfo.setInput(n),i.getCell(e,s).className=this.itemSeqTypeEndCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.setColSelectStep=(e,t,s,i)=>{const n=new Z;n.value=t.scItem.step,n.placeholder="ステップ",i.getCell(e,s).typeInfo.setInput(n),i.getCell(e,s).className=this.itemSeqTypeStepCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.setColText=(e,t,s,i)=>{const n=new Z;n.value=t.scItem.keyValue,n.placeholder="key/valueを&quot;,&quot;で区切った文字列",i.getCell(e,s).typeInfo.setInput(n),i.getCell(e,s).className=this.itemTextTypeCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.setColDelBtn=(e,t,s,i)=>{i.getCell(e,s).typeInfo.setButton("削除"),i.getCell(e,s).className=this.itemDeleteCssClassName(),i.getCell(e,s).typeInfo.using.itemId=s+i.firstRowIndex},this.makeResLog=async e=>{const t=new Xe;t.logType=se.Add;for(const n of e){const o=new kt;for(const l of n.cells)for(const a of l.children){if(a.className===this.itemDeleteCssClassName())continue;const r=this.table.getElemValue(a)||"";switch(a.className){case this.itemKeyCssClassName():o.key=r;break;case this.itemDispCssClassName():o.text=r;break;case this.itemCommentCssClassName():o.comment=r;break}}t.inst.push(o)}const s=Xe.toJsonText(t);await(await ne()).put(me.ResourceEditAction,s)},this.makeScoreLog=async e=>{const t=new _e;t.logType=se.Add,t.gameType=this.gameType;for(const n of e){const o=new Tt;for(const l of n.cells)for(const a of l.children){if(a.className===this.itemDeleteCssClassName())continue;const r=this.table.getElemValue(a)||"";switch(a.className){case this.itemKeyCssClassName():o.key=r;break;case this.itemDispCssClassName():o.text=r;break;case this.itemSelectTypeCssClassName():o.selectType=r;break;case this.itemSeqTypeStartCssClassName():o.start=r;break;case this.itemSeqTypeEndCssClassName():o.end=r;break;case this.itemSeqTypeStepCssClassName():o.step=r;break;case this.itemTextTypeCssClassName():o.keyValue=r;break}}t.inst.push(o)}const s=_e.toJsonText(t);await(await ne()).put(me.ScoreEditAction,s)},this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new C().SaveSetting(e)},this.resizerOnResizeDone=async(e,t,s)=>{console.log(`[${e.className}] resized (${t}, ${s})`);const i=parseInt(s),n=document.getElementById(this.dlgContentCssClassName());if(n!==null){n.style.width===""?n.offsetWidth:parseInt(n.style.width),n.style.maxWidth="none";const o=n.style.height===""?n.offsetHeight:parseInt(n.style.height);n.style.maxHeight="none",n.style.height=`${o+i}px`;const l=n.querySelectorAll(`.${this.tableCssClassName()}`);if(l!==null){const a=l[0],r=a.style.height===""?a.offsetHeight:parseInt(a.style.height);a.style.maxHeight="none",a.style.height=`${r+i}px`}}},this.onCopyPaste=async(e,t)=>{switch(console.log(`[${e.className}] selected [${t}]`),t){case ie.Copy:await this.table.toClipboard();break;case ie.Paste:await this.table.fromClipboard();break}}}async startAutoSave(){this.saveTimer=new Qt,this.saveTimer.intervalMs=1e3,this.saveTimer.isOneShot=!1,this.saveTimer.start(this,this.onSave)}setRow(e,t,s){const i=this.editItems;if(i===void 0)return;let n=-1;for(const o of i)n++,o.colConfig(n,e,t,s)}makeResEditItems(){return[{className:"",colConfig:this.setColKey},{className:"",colConfig:this.setColValue},{className:"",colConfig:this.setColComment},{className:"",colConfig:this.setColDelBtn}]}makeScoreEditItems(){return[{className:"",colConfig:this.setColKey},{className:"",colConfig:this.setColValue},{className:"",colConfig:this.setColSelectType},{className:"",colConfig:this.setColSelectStart},{className:"",colConfig:this.setColSelectEnd},{className:"",colConfig:this.setColSelectStep},{className:"",colConfig:this.setColText},{className:"",colConfig:this.setColDelBtn}]}toHTML(e,t){if(!this.itemList)return"";this.editItems=e,this.makeLog=t;const s=e.length,i=new W;if(this.itemList.length>=1)i.makeDim(s,this.itemList.length),this.itemList.forEach((a,r)=>{this.setRow(a,r,i)}),i.makeRowTemplate(this.tableRowCssClassName()),this.table=i;else{i.makeDim(s,1);const a=new De;this.setRow(a,0,i),i.makeRowTemplate(this.tableRowCssClassName()),i.clearRows(),this.table=i}const n=this.tableCssClassName(),o=this.table.ToScrollHTML(n,n);this.htmlMaker=new L;const l=new U;return l.props.name="",l.props.id=n,l.props.className=n,l.props.option.setTable(o),l.props.option.onSelect=async a=>{switch(console.log(`classify = ${a.classify} targetId = ${a.targetId}`),a.classify){case this.itemSeqTypeStartCssClassName():await this.onSeqEnter(a);break;case this.itemSeqTypeEndCssClassName():await this.onSeqEnter(a);break;case this.itemSeqTypeStepCssClassName():await this.onSeqEnter(a);break;case this.itemDeleteCssClassName():const r=new he;r.setParent(this.dlgCssClassName());let c=N.None;switch(r.setYesNo(),c=await r.showWait(`${a.targetId} を削除しますか？`),c){case N.Yes:break;case N.No:return;case N.Cancel:return}const h=parseInt(a.targetId);h>=1&&(i.deleteRow(h),i.redimAllRows(),this.itemList.splice(h-this.table.firstRowIndex,1));break}},this.htmlMaker.add(l),this.htmlMaker.ToHTML()}async onSeqEnter(e){if(e.KeyEnter===re.Special){const t=this.table.getCellRect(e.parentElem),s=this.table.getTableOwnerRect(e.parentElem),i=this.table.makeCallerName(e.classify,e.targetId),n=this.table.getCallerCellElem(i);let o="";n!==null&&(o=n.value);const l=new Array;l.push("1/1");for(let r=1;r<=30;r++){const c=`${r*10}`;l.push(`${c}/${c}`)}const a=new qt;a.setListener("updn",this.dlgContentCssClassName(),i),a.setSelectedByValue(o,l),a.applyCss(),a.show(`${parseInt(t.left)-parseInt(s.left)+10}`,`${parseInt(t.top)-parseInt(s.top)+10}`),a.enableEvents(r=>{console.log(`[onApply] ${r.callerName} ${r.result}`);const c=this.table.getCallerCellElem(r.callerName);if(c!==null){const h=c;h.value=r.result}a.dispose()},r=>{console.log(`[onUp] ${r.callerName} ${r.result}`)},r=>{console.log(`[onDown] ${r.callerName} ${r.result}`)})}}createEditorBox(e,t,s){this.parentName=t;const i=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="${this.textAddCssClassName()}">追加</button>
<button id="${this.applyCssClassName()}">保存</button>
`),n=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
   ${i}
   ${s}
</div>`,o=new j;o.title="<"+e+">",o.SetB2Type(ce.CopyPaste,this.onCopyPaste);const l=o.NewDialog(t,this.dlgCssClassName());return o.SetContent(t,n,!1),this.applyCss(),o.EnableEventHandlers(),o.onMoveDone=this.moverOnMoveDone,this.dialogDesc=o,l}addEventHandlers(e){document.getElementById(this.textAddCssClassName()).onclick=async()=>{const t=this.tableRowCssClassName();this.table.addRow(t)},document.getElementById(this.applyCssClassName()).onclick=async()=>{const t=this.table.getRowElems();t!==null&&await this.makeLog(t)}}addItemEventHandlers(){this.htmlMaker.enableTableEvents(this.tableCssClassName())}enableResize(){this.dialogDesc.onResizeDone=this.resizerOnResizeDone,this.dialogDesc.EnableResize()}textAddCssClassName(){return`${this.actEditor.editorType}-edit-add`}applyCssClassName(){return`${this.actEditor.editorType}-edit-apply`}itemKeyCssClassName(){return`${this.tableCssClassName()}-key`}itemDispCssClassName(){return`${this.tableCssClassName()}-text`}itemCommentCssClassName(){return`${this.tableCssClassName()}-comment`}itemSelectTypeCssClassName(){return`${this.tableCssClassName()}-select-type`}itemSeqTypeStartCssClassName(){return`${this.tableCssClassName()}-seq-type-start`}itemSeqTypeEndCssClassName(){return`${this.tableCssClassName()}-seq-type-end`}itemSeqTypeStepCssClassName(){return`${this.tableCssClassName()}-seq-type-step`}itemTextTypeCssClassName(){return`${this.tableCssClassName()}-text-type`}itemDeleteCssClassName(){return`${this.tableCssClassName()}-delete`}tableRowCssClassName(){return`${this.actEditor.editorType}-edit-table-row`}tableCssClassName(){return`${this.actEditor.editorType}-edit-table`}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return`${this.actEditor.editorType}-edit-dlg`}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=document.createElement("style");s.textContent=`
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
`.trim(),document.head.appendChild(s);const i=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,i)}}const se={None:"None",Add:"Add",Delete:"Delete",Update:"Update"};class $t{constructor(){this.logType=se.None}}class Xe extends $t{constructor(){super(...arguments),this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class _e extends $t{constructor(){super(...arguments),this.gameType=J.none,this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class Ve{constructor(){this.fileNames=null,this.minMap=new Map,this.maxMap=new Map,this.rangeMap=new Map,this.digLenMax=0,this.nMul=0,this.table=[{key:b.pqStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:b.pqStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:b.pqStatusREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:b.pqTokkunHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:b.pqTokkunATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:b.pqTokkunREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:b.pqTokuSp1,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:b.pqTokuSp2,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:b.mmStatusFGT,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusPDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusACC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusEVA,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusCRI,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusMDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusCRD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusDEF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmStatusSPD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmAbilityDEX,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmAbilityMGC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmAbilityDUR,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:b.mmRole,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}}],this.rolePriolity=[{roleKey:xe.RlAttacker,priority:Be.priHi,statusKey:[b.mmAbilitySTR,b.mmStatusATK,b.mmStatusSPD]},{roleKey:xe.RlHealer,priority:Be.priHi,statusKey:[b.mmAbilityMGC,b.mmStatusMDF,b.mmStatusHP]},{roleKey:xe.RlDebuffer,priority:Be.priHi,statusKey:[b.mmAbilityDEX,b.mmStatusACC,b.mmStatusHP]},{roleKey:xe.RlBuffer,priority:Be.priHi,statusKey:[b.mmStatusPDF,b.mmStatusHP,b.mmStatusDEF]}]}async loadDB(e){const t=new Ie,s=await t.loadBinFile(e);if(t.isWebRunning)this.zip=await window.JSZip.loadAsync(s);else{const{loadZipNode:i}=await import(t.nodeToolsImportFilename);this.zip=await i(s)}return this.fileNames=Object.keys(this.zip.files),!0}async enumStatus(e){if(this.fileNames!==null)for(const t of this.fileNames){const s=await this.getFileContent(t);if(s===null||e===void 0)continue;if(!e(t,s))break}}async debugCombo(){await this.enumStatus((e,t)=>{for(const s of t)s.useCombo&&console.log(`${e}:[${s.value}]`);return!0})}async loadAuxScoreSet(e){const t=new St;await t.load(le.ScoreUI,e);const s=new z;for(const i of t.itemList){const n=i.scItem;if(!i.isScoreAvail)continue;const o=new Ne;switch(o.title=n.text,o.key=n.key,o.available=!1,n.selectType){case ue.Sequence:const l=this.auxScoreTextToValue(n.start),a=this.auxScoreTextToValue(n.end),r=this.auxScoreTextToValue(n.step),c=new Array;for(let u=l;u<=a;u+=r)c.push(`${u}/${u}`);o.selectionPair=c,o.selectedVal=`${l}`,o.initScoreVal=l,o.mulScoreVal=r,c.length>=1&&(o.available=!1);break;case ue.Text:const h=n.keyValue.split(",");let d="";for(const u of h){const p=u.split("/");if(p.length>=2){d=p[1];break}}o.selectionPair=h,o.selectedVal=d,o.initScoreVal=0,o.mulScoreVal=0,h.length>=1&&(o.available=!1);break}s.items.push(o)}return console.log(s),s}auxScoreTextToValue(e){const t=e.split("/"),s=t.length===1?t[0]:t[1];return parseInt(s)}async getMinMax(){await this.enumStatus((e,t)=>{for(const s of t){if(s.useCombo)continue;let i=parseInt(this.itemValue(s));if(!this.minMap.has(s.key))this.minMap.set(s.key,i);else{const n=this.minMap.get(s.key);n===void 0?this.minMap.set(s.key,i):n>i&&this.minMap.set(s.key,i)}if(!this.maxMap.has(s.key))this.maxMap.set(s.key,i);else{const n=this.maxMap.get(s.key);n===void 0?this.maxMap.set(s.key,i):n<i&&this.maxMap.set(s.key,i)}}return!0})}async getRanges(){await this.getMinMax(),this.digLenMax=0;for(const[e,t]of this.minMap){const s=t,i=this.maxMap.get(e);let n=0;if(s!==void 0&&i!==void 0&&(n=i-s),n<=0&&(n=1),this.rangeMap.set(e,n),i!==void 0){const o=Math.log10(i);o>this.digLenMax&&(this.digLenMax=o)}}this.nMul=this.digLenMax>0?Math.pow(10,Math.ceil(this.digLenMax)):1;for(const[e,t]of this.minMap)console.log(`[${e}] = ${this.minMap.get(e)},${this.maxMap.get(e)} ${this.rangeMap.get(e)}`);console.log(`digLenMax=[${this.digLenMax}] nMul=[${this.nMul}]`)}stdBy(e,t){let s,i;if(this.rangeMap.has(e)&&(s=this.rangeMap.get(e)),this.minMap.has(e)&&(i=this.minMap.get(e)),s===void 0||i===void 0||this.isNumeric(t)===!1)return null;s<=0&&(s=1);const n=(parseInt(t)-i)*s;return this.nMul*n}getFilename(e){let t=null;for(let s of this.fileNames){let i=s.indexOf("_");if(i>=0){let n=s.substring(i+1);if(i=n.indexOf("."),i>=0&&(n=n.substring(0,i)),n===e){t=s;break}}}return t}async getFileContent(e){if(e===null)return null;const t=this.zip.file(e);if(t){const s=await t.async("string");return JSON.parse(s)}return null}async getStatus(e){this.digLenMax===0&&await this.getRanges();const t=this.getFilename(e);if(t===null)return null;const s=await this.getFileContent(t);if(s===null)return null;let i=null;for(const o of s)if(!o.useCombo){for(const l of this.rolePriolity)if(l.statusKey.find(r=>r===o.key)){i=l,console.log(`find role : ${i.roleKey}`);break}if(i!==null)break}const n=new z;if(i!==null)for(const o of s){if(o.useCombo)continue;if(i.statusKey.find(a=>a===o.key)){const a=this.table.find(r=>r.key===o.key);if(a){const r=a.scoreFunc(o.key,this.itemValue(o));r.title=o.disp,r.key=o.key,r.selectedVal="1",n.items.push(r)}}}else for(const o of s){if(o.useCombo)continue;const l=this.table.find(a=>a.key===o.key);if(l){const a=l.scoreFunc(o.key,this.itemValue(o));a.title=o.disp,a.key=o.key,a.selectedVal="1",n.items.push(a)}}return n}async getComboKeywords(e){let t=0;const s=new Map,i=new Map;for(const n of e){const o=this.getFilename(n);if(o===null)return null;const l=await this.getFileContent(o);if(l===null)return null;const a=new Map;for(const r of l){if(!r.useCombo)continue;const c=r.value.split(",");for(const h of c)if(a.has(h)===!1)a.set(h,1);else{const d=a.get(h);a.set(h,d+1)}}if(a.size===0){t=0,i.clear();continue}for(const[r,c]of a)if(i.has(r)===!1)i.set(r,c);else{const h=i.get(r);i.set(r,h+c)}if(t++,!(t<=2))for(const[r,c]of i)c>=3&&s.set(r,c)}}async debugCheckCombo(){const e=new Array;e.push("119599"),e.push("119603"),e.push("119624"),await this.getComboKeywords(e)}isNumeric(e){return e.trim()===""?!1:!isNaN(Number(e))}itemValue(e){return e.converted===""?e.value:e.converted}toScoreMaxNum(e,t){return this.isNumeric(t)===!1?null:Ve.useStdConv?this.stdBy(e,t):t!==""?parseInt(t):1}scoreFunc(e,t){const s=new Ne;if(e===null)return s;s.mulScoreVal=e/t;for(let i=1;i<=t;i++){const n=Math.ceil(e/t*i);s.selectionPair.push(`Lv${i}/${i}`),i===1&&(s.initScoreVal=n)}return s.available=!0,s}scoreFuncOld(e,t){const s=new Ne;if(this.isNumeric(e)===!1)return s;let i=e!==""?parseInt(e):1;s.mulScoreVal=i/t;for(let n=1;n<=t;n++){const o=Math.ceil(i/t*n);s.selectionPair.push(`Lv${n}/${n}`),n===1&&(s.initScoreVal=o)}return s.available=!0,s}puyoToku(e){return e==="enable"?10:1}}Ve.useStdConv=!1;const Be={priHi:0},ee={None:"None",UI:"UI",Menu:"Menu"};class Y{constructor(){this.dockType=ee.None,this.iconFileName="",this.toolTip="",this.idAttributeForHTML=""}get labelWrap(){let e=this.toolTip,t=this.toolTip.length;if(t>3){const s=t%2===0?t/2:t/2+1,i=e.substring(0,s),n=e.substring(s);e=i+`
`+n}return e}setAsDlg(e,t){this.dockType=ee.UI,this.dlg=e,this.toolTip=t}setAsMenu(e){this.dockType=ee.Menu,this.toolTip=e}get isUIType(){return this.dockType==ee.UI}get isMenuType(){return this.dockType==ee.Menu}ToggleStatus(){this.dlg===void 0||this.dlg===null||(this.dlg.hidden=!this.dlg.hidden)}}class Je{constructor(){this.items=new Array,this.parentName="",this.listName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new C().SaveSetting(e,!1)}}add(e){return e.dockType==ee.UI&&(e.dlgParent=e.dlg.parentElement),this.items.push(e),!0}async toHTML(e,t=null){if(!this.items)return"";this.listName=e,this.htmlMaker=new L;let s=0;for(const i of this.items){s++;const n=`dock-uid${s}`;i.idAttributeForHTML=n;const o=new U,l=i.labelWrap;o.props.name=this.itemCssClassName(),o.props.id=n,o.props.className=this.imgCssClassName(),o.props.option.toolTip=i.toolTip,o.props.option.setLabel(l,!0),o.props.option.onSelect=a=>{const r=this.items.find(c=>a.item.props.id===c.idAttributeForHTML);if(r&&(this.selectedItem=r,this.onApply!==void 0)){const c=new Zt;c.item=this.selectedItem,this.onApply(c)}},this.htmlMaker.add(o)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createDockBox(e,t,s=!0){this.parentName=e;const i=`<div class="${this.parentName}-dlg-content">
    ${t}
</div>`,n=new j;n.SetB3Type(Ce.Hide);const o=n.NewDialog(e,this.dlgCssClassName());return n.SetContent(e,i,s),this.applyCss(),n.EnableEventHandlers(),n.onMoveDone=this.moverOnMoveDone,o}addItemClickHandlers(e){this.onApply=e,this.htmlMaker.SelectByID(this.itemCssClassName(),this.htmlMaker.GetIdByIndex(0)),this.htmlMaker.enableEvents(this.itemCssClassName())}stdApplyAction(e){return e.item.dlgParent===null?(e.cancel=!0,!1):(console.log(`selected item = [${e.item.toolTip}::${e.item.dockType}]`),e.item.isUIType&&(new C().MoveHiestLayer(e.item.dlgParent),e.item.dlgParent.hidden&&(e.item.dlgParent.hidden=!1)),!0)}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),i=48,n=this.items.length,o=document.createElement("style");o.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,60,10,C.ignoreIndex)}
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
`.trim(),document.head.appendChild(o);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}listCssClassName(){return`${this.listName}-list`}dlgCssClassName(){return`${this.parentName}-dlg`}static GetDialogInfo(e){return j.GetDialogInfo(e)}static SetDialogInfo(e){return j.SetDialogInfo(e)}async InitZOrder(e){await e.ForEachAsync(t=>{const s=Je.GetDialogInfo(t),i=e.FindByName(t);return s!==null&&(s.zindex=i!==null?i.style.zIndex:""),console.log(s),!0})}}class Zt{constructor(){this.cancel=!1}}class Pe{constructor(){this.dockType=ee.None,this.iconFileName="",this.toolTip="",this.dlgName="",this.hidden=!1,this.zIndex="",this.topPx="",this.leftPx=""}static toJsonText(e){const t=Pe.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new Pe;return t.dockType=e.dockType,t.iconFileName=e.iconFileName,t.toolTip=e.toolTip,e.isUIType&&(t.dlgName=e.dlgParent.id,t.hidden=typeof e.dlgParent.hidden=="string"?!1:e.dlgParent.hidden,t.zIndex=e.dlgParent.style.zIndex,t.leftPx=e.dlgParent.style.left,t.topPx=e.dlgParent.style.top),t}}class Ue{static toJsonText(e){const t=Ue.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new Ue;t.items=new Array;for(const s of e.items)t.items.push(Pe.toJsonInst(s));return t}restore(e,t){for(const s of this.items){const i=e.items.find(n=>n.dlg.id===s.dlgName);i&&(i.dockType=s.dockType,i.iconFileName=s.iconFileName,i.toolTip=s.toolTip,i.isUIType&&(i.dlgParent.hidden=typeof s.hidden=="string"?!1:s.hidden,i.dlgParent.style.zIndex=s.zIndex,i.dlgParent.style.left=s.leftPx,i.dlgParent.style.top=s.topPx))}t.ReOrder()}}class Ge{constructor(){this.chUuid="",this.ch=new oe}}class es{constructor(){this.chList=new Array,this.uiInfo=new de,this.parentName="",this.editingRowIndex=-1,this.scoreGrid=new Jt,this.gridHeaderName="headerName",this.gridFooterName="footerName",this.gridName="gridName",this.gridRowName="gridRowName",this.keyClassName="keyClassName",this.valueClassName="valueClassName",this.onSelect=async e=>{console.log(`classify = ${e.classify} selectedValue = ${e.selectedValue} targetId = ${e.targetId}`);const t=this.editingCh;if(t===null)return;const i=t.scoreSet.items.find(n=>n.key===e.classify);i&&(i.selectedVal=e.selectedValue)},this.savedScoreSet=new z,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new C().SaveSetting(e)}}async load(){const t=await(await ne()).get(me.CharSummaryAction);if(t===null)return;const s=new Map,i=new Array;this.usingLog(t,s,i),this.chList=new Array;for(const[n,o]of s){const l=He.fromJsonText(o.log),a=new oe;a.ns=l.ch.ns,a.id=l.ch.id,a.name=l.ch.name,a.contentURL=l.ch.contentURL,a.iconURL=l.ch.iconURL,a.idAsText=l.ch.idAsText,a.idAttributeForHTML=l.ch.idAttributeForHTML;const r=new z;z.copy(l.scoreSet,r,!0);const c=new Ge;c.chUuid=l.chUuid,c.ch=a,c.scoreSet=r,this.chList.push(c)}}usingLog(e,t,s){for(const i of e){const n=He.fromJsonText(i.log);if(n.chUuid==="")continue;let o=!1,l=!1;switch(n.logType){case K.None:break;case K.Add:o=!0;break;case K.Update:t.has(n.chUuid)?o=!0:o=!1;break;case K.Delete:o=!0,l=!0;break}if(o)if(l){if(t.has(n.chUuid)){t.delete(n.chUuid);const a=t.get(n.chUuid);s.push(a)}}else{if(t.has(n.chUuid)){const a=t.get(n.chUuid);s.push(a),t.delete(n.chUuid)}t.set(n.chUuid,i)}}}sortByScore(){return this.chList.length===0?null:this.chList.sort((t,s)=>s.scoreSet.stdScore-t.scoreSet.stdScore)}async updateCharInfos(e){let t=this.table.firstRowIndex-1;for(const s of this.chList){t++;const i=await e.getImageUrlBy(s.ch.iconFileName,s.ch.ns);i!==null&&this.table.updateRowImage(t,i),this.updateChScoreInfo(t)}this.table.redimAllRows(),t=this.table.firstRowIndex,this.table.selectRow(t),this.table.scroll(t)}setRow(e,t,s){let i=0;const n=new et;n.imgFile=e.iconFileName,s.getCell(i,t).typeInfo.setImg(n),s.getCell(i,t).className=this.itemIconCssClassName();const o=`${e.name}`;s.getCell(i,t,1).typeInfo.setLabel(o,!1),s.getCell(i,t,1).className=this.itemStatusCssClassName(),i++,s.getCell(i,t).typeInfo.setButton("更新"),s.getCell(i,t).className=this.itemUpdateCssClassName(),s.getCell(i,t).typeInfo.using.itemId=t,s.getCell(i,t,1).typeInfo.setButton("削除"),s.getCell(i,t,1).className=this.itemDeleteCssClassName(),s.getCell(i,t,1).typeInfo.using.itemId=t}toHTML(){if(!this.chList)return"";const e=new W;if(this.chList.length>=1)e.makeDim(2,this.chList.length),e.growCell(0,2),e.growCell(1,2),this.chList.forEach((n,o)=>{const l=n.ch;this.setRow(l,o,e)}),e.makeRowTemplate(this.tableRowCssClassName()),this.table=e;else{e.makeDim(2,1),e.growCell(0,2),e.growCell(1,2);const n=new oe;this.setRow(n,0,e),e.makeRowTemplate(this.tableRowCssClassName()),e.clearRows(),this.table=e}const t=this.tableCssClassName(),s=this.table.ToScrollHTML(t,"");this.htmlMaker=new L;const i=new U;return i.props.name="",i.props.id="0",i.props.className=t,i.props.option.setTable(s),i.props.option.onSelect=async n=>{switch(console.log(`classify = ${n.classify} targetId = ${n.targetId}`),n.classify){case this.itemUpdateCssClassName():await this.onItemEdit(n);break;case this.itemDeleteCssClassName():await this.onItemDelete(n);break}},this.htmlMaker.add(i),this.htmlMaker.ToHTML()}createSummaryBox(e,t,s){this.parentName=t;let i=`
<button id="${this.itemAddCssClassName()}">キャラ追加</button>
`.trim();const n=this.htmlMaker.MakeDefaultToolButtonsHTML(i),o=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${n}
    ${s}
</div>`,l=new j;l.title="<"+e+">";const a=l.NewDialog(t,this.dlgCssClassName());return l.SetContent(t,o),this.applyCss(),l.EnableEventHandlers(),l.onMoveDone=this.moverOnMoveDone,a}addEventHandlers(e,t){this.onAdd=t,document.getElementById(`${this.itemAddCssClassName()}`).onclick=async()=>{if(this.onAdd===void 0)return;const s=new Et;await this.onAdd(s),s.cancel!==!0&&await this.onItemAdd(s)}}createScoreGrid(e){const t=this.dlgContentCssClassName(),s=this.scoreGrid.makePair();for(const i of e.items){const n=i.title,o=i.title,l=this.scoreGrid.makeKeyCell(n,this.keyClassName,o),a=new Ae;a.selectionPair=i.selectionPair,a.selectedItem=i.selectedVal,a.classify=i.key;const r=new Fe;r.makeItems(),r.items[0].typeInfo.setCombo(a),r.items[0].className=this.valueClassName,s.set(l,r)}if(this.scoreGrid.setPair(s),this.scoreGrid.setListener(this.gridName,this.gridRowName,t,this.gridHeaderName,this.gridFooterName),this.scoreGrid.enableEvents(this.onSelect),this.scoreGrid.footerElem!==null){let i=`
<button id="${this.gridFooterName}-okBtn">OK</button>
<button id="${this.gridFooterName}-canBtn">CANCEL</button>
`.trim();this.scoreGrid.footerElem.innerHTML=i,document.getElementById(`${this.gridFooterName}-okBtn`).onclick=async()=>{const n=this.editingCh;n!==null&&(n.scoreSet,this.addActionLog(n,K.Update),this.removeScoreGrid(),this.updateChScoreInfo(this.editingRowIndex))},document.getElementById(`${this.gridFooterName}-canBtn`).onclick=async()=>{const n=this.editingCh;if(n===null)return;const o=n.scoreSet;z.copy(this.savedScoreSet,o),this.removeScoreGrid()}}}removeScoreGrid(){if(this.scoreGrid.headerElem!==null){const e=this.editingRowIndex,t=this.table.getRowElem(e),s=this.table.getCellElems(t),i=this.scoreGrid.headerElem.children[0];s[0][0].appendChild(i)}this.scoreGrid!==null&&(this.scoreGrid.dispose(),this.htmlMaker.setVisible(this.itemAddCssClassName(),!0),this.table.setVisible(!0))}get editingCh(){const e=this.editingRowIndex;return e<this.table.firstRowIndex?null:this.chList[e-this.table.firstRowIndex]}async onItemAdd(e){const t=new he;t.setParent(this.dlgCssClassName());let s=N.None;if(t.setYesNo(),s=await t.showWait(`${e.selectCh.name} を追加しますか？`),s===N.No)return;const i=this.tableRowCssClassName(),n=this.table.addRow(i);if(n<this.table.firstRowIndex)return;this.table.selectRow(n),this.table.updateRowImage(n,e.selectedImg),this.table.scroll(n);const o=new Ge;o.chUuid=Ut(),o.ch=e.selectCh,o.scoreSet=e.scoreSet,this.chList.push(o),this.updateChScoreInfo(n),this.addActionLog(o,K.Add)}async onItemEdit(e){const t=parseInt(e.targetId);if(t<this.table.firstRowIndex)return;this.editingRowIndex=t;const s=this.chList[t-this.table.firstRowIndex].scoreSet;this.savedScoreSet=new z,z.copy(s,this.savedScoreSet,!0),this.createScoreGrid(s),this.htmlMaker.setVisible(this.itemAddCssClassName(),!1),this.table.setVisible(!1);const i=this.table.getRowElem(t),o=this.table.getCellElems(i)[0][0].children[0];this.scoreGrid.headerElem?.appendChild(o)}async onItemDelete(e){const t=parseInt(e.targetId);if(t<this.table.firstRowIndex)return;const s=this.chList[t-this.table.firstRowIndex],i=new he;i.setParent(this.dlgCssClassName());let n=N.None;switch(i.setYesNo(),n=await i.showWait(`${s.ch.name} を削除しますか？`),n){case N.Yes:break;case N.No:return;case N.Cancel:return}this.addActionLog(s,K.Delete),t>=1&&(this.table.deleteRow(t),this.table.redimAllRows(),this.chList.splice(t-this.table.firstRowIndex,1))}async addActionLog(e,t){const s=new He;s.logType=t,s.chUuid=e.chUuid,s.ch=e.ch,s.scoreSet=e.scoreSet;const i=He.toJsonText(s);await(await ne()).put(me.CharSummaryAction,i)}updateChScoreInfo(e){const t=this.table.getRowElem(e);if(t===null)return;const s=this.table.getCellElems(t);if(s===null)return;const i=this.chList[e-this.table.firstRowIndex].ch.name;this.table.updateText(s[0][1],i);const n=this.getChScoreInfo(e);this.table.updateRowImageToolTip(e,n)}getChScoreInfo(e){const t=e-this.table.firstRowIndex,s=this.chList[t];let i="";for(const n of s.scoreSet.items){console.log(n);let o=n.selectedText;o=o===void 0?"*bug*":o;const l=`${n.title}:${o}`;i!==""&&(i=`${i}
`),i=`${i}${l}`}return i}addItemEventHandlers(){this.htmlMaker.enableTableEvents(this.tableCssClassName())}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}async charStock(e){let t=this.table.getSelectedRow();const s=t!==this.table.invalidRowIndex,i=new he;i.setParent(this.dlgCssClassName());let n=N.None;s?(i.setYesNoCancel(),n=await i.showWait(`${e.selectCh.name} を更新しますか？`)):(i.setYesNo(),n=await i.showWait(`${e.selectCh.name} を追加しますか？`));let o=!1,l=!1;switch(n){case N.Yes:s?(o=!1,l=!0):(o=!0,l=!1);break;case N.No:s?(o=!0,l=!1):(o=!1,l=!1);break;case N.Cancel:return}let a=null;if(o){const r=this.tableRowCssClassName(),c=this.table.addRow(r);if(c>=0){const h=new Ge;h.ch=e.selectCh,h.scoreSet=e.scoreSet,this.chList.push(h),t=c,this.table.selectRow(c),this.table.updateRowImage(c,e.selectedImg),this.table.scroll(c),a=this.table.getRowElem(c)}}if(l){const r=t-this.table.firstRowIndex,c=this.chList[r];c.scoreSet=e.scoreSet,this.tableRowCssClassName();const h=t;this.table.scroll(h),a=this.table.getRowElem(h)}if(a!==null){const r=this.table.getCellElems(a);if(r){const c=this.getChScoreInfo(t);this.table.updateText(r[0][1],c)}}}itemIconCssClassName(){return`${this.tableCssClassName()}-icon`}itemStatusCssClassName(){return`${this.tableCssClassName()}-status`}itemAddCssClassName(){return`${this.tableCssClassName()}-add`}itemUpdateCssClassName(){return`${this.tableCssClassName()}-update`}itemDeleteCssClassName(){return`${this.tableCssClassName()}-delete`}tableRowCssClassName(){return"char-summary-table-row"}tableCssClassName(){return"char-summary-table"}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return"char-summary-dlg"}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=document.createElement("style");s.textContent=`
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

`.trim(),document.head.appendChild(s);const i=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,i)}}class Et{constructor(){this.cancel=!1}}const K={None:"None",Add:"Add",Delete:"Delete",Update:"Update"};class He{constructor(){this.logType=K.None,this.chUuid=""}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class gt{static async put(e){try{await navigator.clipboard.writeText(e)}catch(t){return console.error("コピー失敗...",t),!1}return!0}static async get(){let e="";try{e=await navigator.clipboard.readText()}catch(t){return console.error("ペースト失敗...",t),null}return e}}class ts{constructor(){this.TextMap=new Map}set(e,t){const s=this.TextMap.has(e);return this.TextMap.set(e,t),s}remove(e){const t=this.TextMap.has(e);return t&&this.TextMap.delete(e),t}get count(){return this.TextMap.size}clear(){this.TextMap.clear()}forEach(e){if(e===void 0)return;let t=!1;for(const[s,i]of this.TextMap)if(t=e(s,i),t)break;return t}values(){const e=new Map;for(const[t,s]of this.TextMap)e.set(t,parseInt(s));return e}}class xt{constructor(e=0,t=""){this.ch=new oe,this.isEmpty=!0,this.details=new ts,this.ch.id=e,this.ch.name=t}set(e,t){const s=this.details.TextMap.has(e);return this.details.set(e,t),s}get values(){return this.details.values()}get itemID(){const e=this.itemKey,t=this.ch.idAttributeForHTML.substring(e.length);let s=parseInt(t);return s<=0?-1:s}get itemKey(){return"chuid"}}class Qe{constructor(){this.nFormationItem=5,this.uiInfo=new de}Init(){this.items=new Array;for(let e=0;e<this.nFormationItem;e++)this.items.push(new xt)}put(e,t){return this.items.find(i=>this.isExistCh(i,t))!==void 0?!1:(e.ch.ns=t.ns,e.ch.id=t.id,e.ch.name=t.name,e.isEmpty=!1,!0)}empty(e){const t=e.isEmpty;return e.isEmpty=!0,e.isEmpty!=t}isExistCh(e,t){return e.ch.name===t.name&&e.ch.id===t.id}equalsFormationItem(e,t){return e.ch.name===t.ch.name&&e.ch.id===t.ch.id}}class ss{constructor(){this.emptyFile="plus.png",this.propItemNum=0,this.autoForm=!1,this.editFormEnable=!1,this.saveEnable=!1,this.enableScoreEvent=!1,this.parentName="",this.listName="",this.gridHeaderName="headerName",this.gridFooterName="footerName",this.gridName="gridName",this.scoreGrid=new pt,this.onOkClickScoreGrid=async e=>{console.log(`${e.target}`)},this.onCancelClickScoreGrid=async e=>{console.log(`${e.target}`)},this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new C().SaveSetting(e)},this.onCopyPaste=async(e,t)=>{switch(console.log(`[${e.className}] selected [${t}]`),t){case ie.Copy:const s=X.toJsonText(this.formation,this.scsList);await gt.put(s);break;case ie.Paste:await gt.get();break}}}InitForEnemy(e){this.charDB=e,this.formation=new Qe,this.formation.Init(),this.enableScoreEvent=!0,this.scsList=new Array;const t=this.formation.nFormationItem;for(let s=0;s<t;s++){const i=new z;this.scsList.push(i)}}InitForPlayer(e){this.charSummary=e,this.autoFormation()}autoFormation(){this.formation=new Qe,this.formation.Init();const e=this.charSummary.sortByScore();console.log("sorted"),console.log(e);let t=0;if(this.scsList=new Array,e!==null){const s=Math.min(e.length,this.formation.nFormationItem);for(let i=0;i<s;i++){const n=this.formation.items[i];this.formation.put(n,e[i].ch)}for(const i of e){const n=i.scoreSet;this.scsList.push(n)}t=this.formation.nFormationItem-s}else t=this.formation.nFormationItem;for(let s=0;s<t;s++){const i=new z;this.scsList.push(i)}}SetAuxScoreSet(e){this.auxScoreSet=e}async Setup(e,t){if(!e)return;this.formation=e;let s=0;for(const i of this.formation.items){i.isEmpty?this.formation.empty(i):this.formation.put(i,i.ch),s++;const n=`${i.itemKey}${s}`;i.ch.idAttributeForHTML=n;const o=i.isEmpty?this.emptyFile:i.ch.iconFileName,l=await t.getImageUrlBy(o,i.ch.ns);if(l===null)return;this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),i.ch.idAttributeForHTML,l)}}async toHTML(e){if(!this.formation)return"";this.listName=e,this.htmlMakerChSel=new L;let t=0;for(const s of this.formation.items){const i=s.ch;t++;const n=`${s.itemKey}${t}`;i.idAttributeForHTML=n;const o="",l=s.isEmpty?this.emptyFile:i.iconFileName,a=new et;a.imgSrc=o,a.imgFile=l;const r=new U;r.props.name=this.itemCssClassName(),r.props.id=n,r.props.className=this.imgCssClassName(),r.props.option.setImg(a),r.props.option.toolTip=i.name,r.props.option.onSelect=c=>{console.log(`notifty id = ${c.item.props.id}`),this.setSelectedItem(c.item.props.id)},this.htmlMakerChSel.add(r)}return this.htmlMakerChSel.MakeScrollableList(this.listCssClassName())}makeFlyoutGrid(e){const t=new Array;for(const c of e.items){const h=new Ae;h.selectionPair=c.selectionPair,h.selectedItem=c.selectedVal,h.classify=c.key;const d=new Fe;d.makeItems(),d.items[0].typeInfo.setCombo(h),d.items[0].className="";const u=new jt;u.key=c.key,u.text=c.title,u.value=d,t.push(u)}const s=1,i=new pt;if(i.setGridtems(t),i.setListener(`${this.gridName}-${s}`,`${this.propItemCssClassName()}-${s}`,this.dlgContentCssClassName(),`${this.gridHeaderName}-${s}`,`${this.gridFooterName}-${s}`),i.setVisible(!0),i.setFontConfig("0.8"),i.applyCss(),i.enableEvents(c=>{console.log(`${c.callerName}`)}),this.scoreGrid=i,this.scoreGrid.footerElem!==null){let c=`
<button id="${this.gridFooterName}-okBtn">OK</button>
<button id="${this.gridFooterName}-canBtn">CANCEL</button>
`.trim();this.scoreGrid.footerElem.innerHTML=c,document.getElementById(`${this.gridFooterName}-okBtn`).onclick=this.onOkClickScoreGrid,document.getElementById(`${this.gridFooterName}-canBtn`).onclick=this.onCancelClickScoreGrid}const n=document.getElementById(this.dlgContentCssClassName()),o=this.htmlMakerChSel.GetRect(n),l=this.htmlMakerChSel.FindDivByClassName(this.parentName,this.propCssClassName());this.htmlMakerChSel.GetRect(l);const a=this.htmlMakerChSel.FindDivByClassName(this.parentName,this.listCssClassName()),r=this.htmlMakerChSel.GetRect(a);i.show(`${parseInt(r.left)-parseInt(o.left)+5}`,`${parseInt(r.top)-parseInt(o.top)+parseInt(r.height)+5}`)}toGridHTML(){this.htmlMakerProp=new L;let e=0;for(const t of this.formation.items){t.ch;const s=this.scsList[e];e++;for(const n of s.items)t.details.set(n.key,n.selectedVal);const i=new U;i.props.name=`${this.propItemCssClassName()}-${e}`,i.props.id=`${e}`,i.props.className=`${this.propItemCssClassName()}`,i.props.option.setButton("スコア"),i.props.option.using.itemId=e,i.props.option.onSelect=n=>{console.log(`notifty id     = ${n.item.props.id}`),console.log(` targetId      = ${n.targetId}`),console.log(` classify      = ${n.classify}`),console.log(` selectedValue = ${n.selectedValue}`);const o=n.item.props.id,l=parseInt(o)-1;if(0<=l&&l<this.formation.items.length){const a=this.formation.items[l];a.set(n.classify,n.selectedValue);const r=this.scsList[l];r.set(n.classify,n.selectedValue);const c=new is;c.uiName=this.parentName,c.item=a,c.values=a.values,c.scoreConfigSet=r,this.onPropChanged(c)}else console.log(`invalid index = ${l}`)},this.htmlMakerProp.add(i)}return this.htmlMakerProp.MakeScrollableList(this.propCssClassName())}makeChLvSelect(e,t,s,i,n,o,l){const a=new U;a.props.name=this.propItemCssClassName(),a.props.id=t,a.props.className=this.lblCssClassName(),a.props.option.setLabel(s,!1);const r=a.ToHTML(a.props),c=new U;c.props.name=this.propItemCssClassName(),c.props.id=t,c.props.className=this.lblCssClassName();const h=new Ae;h.selectionPair=n,h.selectedItem=o,h.classify=i,c.props.option.setCombo(h);const d=c.ToHTML(c.props);let u=`
${r}
${d}
`.trim();const p=new U;p.props.name=this.propItemCssClassName(),p.props.id=t,p.props.className=this.lblCssClassName(),p.props.option.setPlain(u),l.add(p)}createFormationBox(e,t,s,i){this.parentName=t;let n="";this.autoForm&&(n=`<button id="${this.dlgCssClassName()}-auto">自動選定</button>`);let o="";this.editFormEnable&&(o=`
<button id="${this.dlgCssClassName()}-tbput">配置</button>
<button id="${this.dlgCssClassName()}-tbempty">抹消</button>
<button id="${this.dlgCssClassName()}-tbLeft">←</button>
<button id="${this.dlgCssClassName()}-tbRight">→</button>
`.trim());let l="";this.saveEnable&&(l=`<button id="${this.dlgCssClassName()}-stock">編成保存</button>`);let a=`
${n}
${o}
${l}
`.trim();const r=this.htmlMakerChSel.MakeDefaultToolButtonsHTML(a),c=this.htmlMakerChSel.MakeDefaultButtonsHTML(`
<button id="${this.dlgCssClassName()}-close">閉じる</button>
`);let h="";i!==""?h=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${r}
    ${s}
    ${i}
    ${c}
</div>`:h=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${r}
    ${s}
    ${c}
</div>`;const d=new j;d.title="<"+e+">",d.SetB2Type(ce.CopyPaste,this.onCopyPaste);const u=d.NewDialog(t,this.dlgCssClassName());return d.SetContent(t,h),this.applyCss(),d.EnableEventHandlers(),d.onMoveDone=this.moverOnMoveDone,u}addEventHandlers(e){document.getElementById(`${this.dlgCssClassName()}-close`).onclick=()=>{document.getElementById(this.parentName).hidden=!0};const t=document.getElementById(`${this.dlgCssClassName()}-auto`);t!==null&&(t.onclick=async()=>{await this.onAutoPut()});const s=document.getElementById(`${this.dlgCssClassName()}-tbput`);s!==null&&(s.onclick=async()=>{await this.onCharPut()});const i=document.getElementById(`${this.dlgCssClassName()}-tbempty`);i!==null&&(i.onclick=async()=>{await this.onCharEmpty()});const n=document.getElementById(`${this.dlgCssClassName()}-stock`);n!==null&&(n.onclick=async()=>{if(this.onStock!==void 0){if(this.selectedItem.ch.ns===D.None)return;const o=this.htmlMakerChSel.FindImgByID(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML),l=new je;l.item=this.selectedItem,l.selectedImg=o===null?"":o.src;const a=this.findPropGridPos();a!==-1&&(l.scoreSet=this.scsList[a]),await this.onStock(l)}})}addItemEventkHandlers(e,t,s,i){this.onStock=s,this.onPut=e,this.onEmpty=t,this.onPropChanged=i;const n=this.htmlMakerChSel.GetIdByIndex(0);this.htmlMakerChSel.SelectByID(this.itemCssClassName(),n),this.htmlMakerChSel.enableEvents(this.itemCssClassName()),this.enableScoreEvent===!0&&this.htmlMakerProp.enableEvents(this.propCssClassName()),this.setSelectedItem(n)}async onAutoPut(){this.autoFormation(),await this.Setup(this.formation,this.imgLoader),await this.notifyChangeForm()}async notifyChangeForm(){for(const e of this.formation.items)e.isEmpty?await this.notiftyOnEmpty(e):await this.notiftyOnPut(e)}async notiftyOnPut(e){const t=new je;return t.uiName=this.formation.uiInfo.name,t.item=e,await this.onPut(t),t}async notiftyOnEmpty(e){const t=new je;return t.uiName=this.formation.uiInfo.name,t.item=e,t.selectedImg=this.emptyFile,await this.onEmpty(t),t}async onCharPut(){if(this.onPut!==void 0){this.selectedItem.isEmpty=!1;const e=await this.notiftyOnPut(this.selectedItem);if(this.formation.put(this.selectedItem,e.selectCh),this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,e.selectedImg),this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,this.selectedItem.ch.name),this.enableScoreEvent){let t=this.selectedItem.ch.idAsText===""?`${this.selectedItem.ch.id}`:this.selectedItem.ch.idAsText;const s=await this.charDB.getStatus(t);s!==null&&s.items!==void 0&&(s.items=s.items.concat(this.auxScoreSet.items),this.makeFlyoutGrid(s))}}}async onCharEmpty(){if(this.onEmpty!==void 0){this.selectedItem.isEmpty=!0;const e=await this.notiftyOnEmpty(this.selectedItem);this.formation.empty(this.selectedItem),this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,e.selectedImg),this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,"");const t=this.findPropGridPos();if(t!==-1){this.scsList[t]=new z;const s=this.toGridHTML();this.replacePropGrid(s),this.htmlMakerProp.enableEvents(this.propItemCssClassName())}}}findPropGrid(){const e=this.htmlMakerChSel.FindDivByClassName(this.dlgContentCssClassName(),this.propCssClassName());return e!==null?e:null}findPropGridPos(){const e=this.findPropGrid();if(e!==null&&e.className.startsWith(this.propCssClassName())){let t=-1;for(const s of this.formation.items)if(t++,s===this.selectedItem)return console.log(`pos=${t}`),t}return-1}replacePropGrid(e){const t=this.htmlMakerChSel.FindDivByClassName(this.dlgContentCssClassName(),this.propCssClassName());if(t===null)return null;const s=document.createElement("div");s.innerHTML=e,t.replaceWith(s.childNodes[0])}setSelectedItem(e){const t=this.formation.items.find(s=>e===s.ch.idAttributeForHTML);t&&(this.selectedItem=t)}enableLazyImages(e){this.htmlMakerChSel.initObserver(this.dlgCssClassName(),e)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}propCssClassName(){return`${this.listName}-prop`}propItemCssClassName(){return`${this.listName}-prop-item`}lblCssClassName(){return`${this.listName}-lbl`}listCssClassName(){return`${this.listName}-list`}dlgContentCssClassName(){return`${this.parentName}-dlg-content`}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),i=this.propCssClassName(),n=this.propItemCssClassName();this.lblCssClassName();const o=parseInt(this.formation.uiInfo.left),l=parseInt(this.formation.uiInfo.top),a=100;new W;const r=document.createElement("style");r.textContent=`
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

/*
${this.htmlMakerChSel.MakeDefaultGridRowCss(i,a,this.propItemNum,22)}
${this.htmlMakerChSel.MakeDefaultItemJustifyRightCss(n,a,20)}
*/
${this.htmlMakerChSel.MakeDefaultGridColCss(i,a,5,a*5)}
${this.htmlMakerChSel.MakeDefaultItemJustifyRightCss(n,a,30)}

${this.htmlMakerChSel.MakeDefaultToolButtonsCss()}
${this.htmlMakerChSel.MakeDefaultButtonsCss()}
`.trim(),document.head.appendChild(r);const c=document.getElementById(this.parentName);this.htmlMakerChSel.copyCssToInlineStyle(`.${this.parentName}`,c)}}class je{constructor(){this.cancel=!1}}class is{constructor(){this.uiName="",this.cancel=!1}}class Oe{constructor(){this.ch=new te,this.isEmpty=!0,this.TextMap=""}static toJsonText(e){const t=te.toJsonInst(e.ch);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new Oe;t.ch=te.toJsonInst(e.ch),t.isEmpty=e.isEmpty;const s=Object.fromEntries(e.details.TextMap);return t.TextMap=JSON.stringify(s,null,2),t}static fromJsonInst(e){const t=new xt;t.ch=te.fromJsonInst(e.ch),t.isEmpty=e.isEmpty;const s=new Map(Object.entries(JSON.parse(e.TextMap)));return t.details.TextMap=s,t}}class X{static toJsonText(e,t){const s=X.toJsonInst(e,t);return JSON.stringify(s,null,2)}static toJsonInst(e,t){const s=new X;s.items=new Array,s.scsList=new Array;for(const i of e.items)s.items.push(Oe.toJsonInst(i));for(const i of t)s.scsList.push(i);return s}static fromJsonInst(e){const t=new Qe;t.items=new Array;for(const s of e.items)t.items.push(Oe.fromJsonInst(s));return t}}class Mt{constructor(e=0,t="",s=!0,i=0){this.ch=new oe,this.isEmpty=!0,this.score=0,this.allAvailable=!1,this.ch.id=e,this.ch.name=t,this.isEmpty=s,this.score=i}}class it{Add(e){if(e===void 0){console.log("[VersusGroupRow::Add] scItem === undefined");return}this.columns===void 0&&(this.columns=[]),this.columns.push(e)}Count(){return this.columns.length}debug(){if(this.columns===void 0){console.log("[VersusGroupRow::debug] this.columns === undefined");return}for(const e of this.columns)console.log(`[${e.ch.name}]	score=[${e.score}]`)}}it.defNumColumn=5;class nt{Add(e){this.groupRows===void 0&&(this.groupRows=[]),this.groupRows.push(e)}Count(){return this.groupRows.length}debug(){if(this.groupRows===void 0)console.log("this.groupRows === undefined");else for(const e of this.groupRows)e.debug()}async loadJson(e){const i=(await new Ie().loadJson(e)).groupRows.map(o=>Object.assign(new it,o)),n=new nt;return n.groupRows=i,n}}const G={None:"None",Player:"Player",Enemy:"Enemy"},q={None:"None",Attr:"Attr",Role:"Role"},We={HiLv:"HiLv"},V={Likely:"Likely",Uncertain:"Uncertain",Wishful:"Wishful"};class ze{}ze.Likely=.9;ze.Uncertain=.64;class Ze{constructor(){this.scoreItems=[],this.formationType=G.None,this.boost=0}get imgPrefix(){return this.formationType===G.Player?"ftPlayer":"ftEnemy"}get judgeWidth(){return 48}setScoreItems(e){if(e!==void 0){this.scoreItems=new Array;for(const t of e){const s=new Mt(t.ch.id,t.ch.name,t.isEmpty,t.score);this.scoreItems.push(s)}}}async toCharHTML(e,t){const s=t.isEmpty?e.demoMaterial:t.ch.iconFileName,i=t.ch.ns===D.None?"":t.ch.ns,n=await e.getImageUrlBy(s,i);let o=this.scoreToolTip(t);return o!==""&&(o=`title="${o}"`),`
<img class=${this.charCssClassName()}
  src="${n}"
  ${o}>
`.trim()}scoreToolTip(e){return e.isEmpty?"":`${e.ch.name}
score=${e.score}`}async toJudgeHTML(e,t){const s=this.toJudgeFileURL(e,t);return`<img class=${this.judgeCssClassName()} src="${s}" width="48">`}async toJudgeFileURL(e,t){let s=null;switch(t){case V.Likely:s=await e.getImageUrlBy("win.png",e.AnyNs);break;case V.Uncertain:s=await e.getImageUrlBy("even.png",e.AnyNs);break;case V.Wishful:s=await e.getImageUrlBy("lost.png",e.AnyNs);break;default:return""}return s}charCssClassName(){return"combat-char"}judgeCssClassName(){return"combat-judge"}get combatScore(){if(this.scoreItems===void 0)return 0;const e=this.scoreItems.reduce((s,i)=>i.isEmpty?s:s+i.score,0),t=this.boost===0?1:this.boost;return Math.ceil(e*t/100)}}class ns{constructor(){this.hasCombo=!1,this.winRate=new Map}setPlayer(e){e.formationType=G.Player,this.player=e}setEnemy(e){e.formationType=G.Enemy,this.enemy=e}judge(e){const s=this.winRate.get(e);return s>=ze.Likely?V.Likely:s>=ze.Uncertain?V.Uncertain:V.Wishful}judgeForEnemy(e){switch(e){case V.Likely:return V.Wishful;case V.Uncertain:return V.Uncertain;case V.Wishful:return V.Likely}}}class os{constructor(){this.combatPairs=new Map,this.emptyFile="plus.png",this.parentName="",this.uiInfo=new de,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new C().SaveSetting(e)}}setPair(e,t){this.combatPairs.set(e,t)}calcCombatScore(){for(const[e,t]of this.combatPairs){if(t.player===void 0||t.enemy===void 0)continue;const s=[q.None,q.Attr,q.Role];for(const i of s){let n=t.player.combatScore,o=t.enemy.combatScore;t.winRate.set(i,o!==0?n/o:1)}}}async replaceChar(e,t,s,i,n){const o=this.combatPairs.get(e);let l;if(t===G.Player?l=o?.player:t===G.Enemy&&(l=o?.enemy),l===void 0)return!1;const a=s.itemID;if(a<0)return!1;const r=a-1;l=l;const h=`${l.imgPrefix}${a}`,d=l.scoreItems[r],u=d.ch;let p="";s.isEmpty?(u.id=0,u.name="",p=n.demoMaterial,console.log("set empty")):(u.id=i.id,u.name=i.name,p=u.iconFileName,console.log(`set char ${i.id}:${i.name}`)),d.isEmpty=s.isEmpty;const H=u.ns===D.None?"":u.ns,S=await n.getImageUrlBy(p,H);if(S===null)return!1;const x=new L,R=this.outerCssClassName();return x.ReplaceImg(R,h,S),x.ReplaceImgToolTip(R,h,l.scoreToolTip(d)),!0}async replaceJudge(e){async function t(n,o){const l=await n.toJudgeFileURL(e,o);if(l===null)return;const a=n.imgPrefix;for(let r=0;r<n.scoreItems.length;r++){const c=`${a}${r+1}`,h=s.FindImgsByID(i,c);if(h===null||h.length<=1){console.error("fail on judge marker");continue}const d=h[1];s.SetImgSrc(d,l),n.scoreItems[r].isEmpty?s.SetImgSize(d,0,0):s.SetImgSize(d,n.judgeWidth,n.judgeWidth);const u=n.scoreItems[r];s.ReplaceImgToolTip(i,c,n.scoreToolTip(u))}}const s=new L,i=this.outerCssClassName();for(const[n,o]of this.combatPairs){if(o.player===void 0||o.enemy===void 0)continue;const l=[q.None,q.Attr,q.Role];for(const a of l){if(a!==q.None)continue;const r=o.judge(a),c=o.judgeForEnemy(r);await t(o.player,r),await t(o.enemy,c)}}}async toHTML(e,t){const s=document.createElement("table");s.id=e;const i=document.createElement("tbody");s?.appendChild(i);async function n(l,a){const r=document.createElement("tr");i?.appendChild(r);const c=await a.toJudgeHTML(t,l),h=a.imgPrefix;let d=0;for(const u of a.scoreItems){d++;const p=await a.toCharHTML(t,u),H=`
<div class=${o} item-id="${h}${d}">
    ${p}
    ${c}
</div>
`.trim(),S=document.createElement("td");S.innerHTML=H,r.appendChild(S)}}const o=this.outerCssClassName();for(const[l,a]of this.combatPairs){const r=a.judge(q.None),c=a.judgeForEnemy(r);await n(r,a.player),await n(c,a.enemy)}return s.outerHTML}createCombatBox(e,t,s){this.parentName=t,this.htmlMaker=new L;const i=`<div class="${this.parentName}-dlg-content">
    ${s}
</div>`,n=new j;n.title="<"+e+">";const o=n.NewDialog(t,this.dlgCssClassName());return n.SetContent(t,i),this.applyCss(),n.EnableEventHandlers(),n.onMoveDone=this.moverOnMoveDone,o}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}processResult(e,t,s){async function i(o,l){const a=t(l.formationType),r=await l.toJudgeHTML(e,o),c=l.imgPrefix;let h=0;for(const d of l.scoreItems){h++;const u=await l.toCharHTML(e,d),p=`
<div class=${n} item-id="${c}${h}">
    ${u}
    ${r}
</div>
`.trim();s(a,p)}}const n=this.outerCssClassName();for(const[o,l]of this.combatPairs){const a=l.judge(q.None),r=l.judgeForEnemy(a);i(a,l.player),i(r,l.enemy)}}outerCssClassName(){return"combat-outer"}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const e=new Ze,t=`.${this.outerCssClassName()}`,s=`.${e.charCssClassName()}`,i=`.${e.judgeCssClassName()}`,n=parseInt(this.uiInfo.left),o=parseInt(this.uiInfo.top),l=document.createElement("style");l.textContent=`
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
`.trim(),document.head.appendChild(l);const a=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,a)}}const ye={Unknown:"Unknown",Success:"Success",Fail:"Fail",Cancel:"Cancel"};async function yt(m){const e=m.isWebRunning,t=m.currentUserHome,s=m.chStatusListFile,i=m.chListFile,n=new Vt,o=new L,l="splash-screen";o.initFullScreen(l,"エボナ データベース初期化中..."),o.applyFullScreenCss(l);const a=o.getFullScreenMsgElem(l),r=a!==null?a.innerHTML:"";if(t===m.user1Home){const f=[{ns:D.CnsRed,nsName:"赤属性"},{ns:D.CnsBlue,nsName:"青属性"},{ns:D.CnsGreen,nsName:"緑属性"},{ns:D.CnsYellow,nsName:"黄属性"},{ns:D.CnsViolet,nsName:"紫属性"}],B=await new we().LoadList(i);for(const w of f)a!==null&&(a.innerHTML=`${r} ${w.nsName}`),await n.setupNs(w.ns,m,B)}if(t===m.user2Home){const f=[{ns:D.CnsBlue,nsName:"藍属性"},{ns:D.CnsRed,nsName:"紅属性"},{ns:D.CnsGreen,nsName:"翠属性"},{ns:D.CnsYellow,nsName:"黄属性"},{ns:D.CnsWhite,nsName:"天属性"},{ns:D.CnsBlack,nsName:"冥属性"}],B=await new we().LoadList(i);for(const w of f)a!==null&&(a.innerHTML=`${r} ${w.nsName}`),await n.setupNs(w.ns,m,B)}a!==null&&(a.innerHTML="UI 初期化中 ...");const c=new Je,h=new Ve;await h.loadDB(s);const d=await h.loadAuxScoreSet(m.gameType);async function u(){async function f(){return await new we().LoadList(i)}const g=await f();g.uiInfo.name="charListArea",g.uiInfo.left="300",g.uiInfo.top="100";const B=g.uiInfo.name,w=await g.toHTML(n);if(e){const y="キャラ選択",$=g.createSelectorBox(y,B,w);g.addEventHandlers($),g.addItemEventHandlers(),g.enableLazyImages(n),$.show();const T=new Y;T.setAsDlg($,y),c.add(T)}return g}const p=await u();async function H(){const f=new es;await f.load(),f.uiInfo.name="CharSummary",f.uiInfo.left="400",f.uiInfo.top="100";const g=f.uiInfo.name,B=await f.toHTML();if(e){const w="キャラ一覧",y=f.createSummaryBox(w,g,B);await f.updateCharInfos(n),f.addEventHandlers(y,async T=>{T.selectCh=p.selectedCh;const O=await n.getImageUrlBy(p.selectedCh.iconFileName,p.selectedCh.ns);if(O===null)T.selectedImg="",T.cancel=!0;else{T.selectedImg=O,T.cancel=!1;const M=await h.getStatus(p.selectedCh.idAsText);console.log(M),T.scoreSet=M,T.scoreSet.items=T.scoreSet.items.concat(d.items)}console.log(`selected ch = ${T.selectCh.name}`)}),f.addItemEventHandlers(),f.enableLazyImages(n),y.show();const $=new Y;$.setAsDlg(y,w),c.add($)}return f}const S=await H();async function x(f,g,B,w){const y=new ss;f===R&&(y.InitForPlayer(S),y.autoForm=!0,y.editFormEnable=!1,y.saveEnable=!1,y.imgLoader=n),f===A&&(y.InitForEnemy(h),y.SetAuxScoreSet(d),y.autoForm=!1,y.editFormEnable=!0,y.saveEnable=!0),y.formation.uiInfo.name=f,y.formation.uiInfo.left=`${g}`,y.formation.uiInfo.top=`${B}`;const $=y.formation.uiInfo.name,T=await y.toHTML($),O=f===A?y.toGridHTML():"";if(e){const M=y.createFormationBox(w,$,T,O);y.addEventHandlers(M),y.addItemEventkHandlers(async k=>{k.selectCh=p.selectedCh;const F=await n.getImageUrlBy(p.selectedCh.iconFileName,p.selectedCh.ns);if(F===null)return;k.selectedImg=F,k.item.isEmpty=!1,console.log(`selected ch = ${k.selectCh.name}`);const Q=We.HiLv;P.combatPairs.get(Q),k.uiName===R&&await P.replaceChar(Q,G.Player,k.item,k.selectCh,n),k.uiName===A&&await P.replaceChar(Q,G.Enemy,k.item,k.selectCh,n),await P.replaceJudge(n)},async k=>{const F=await n.getImageUrlBy(k.selectedImg,p.selectedCh.ns);if(F===null)return;k.selectedImg=F,k.item.isEmpty=!0,console.log(`empty ch = ${k.selectedImg}`);const Q=We.HiLv;P.combatPairs.get(Q),k.uiName===R&&await P.replaceChar(Q,G.Player,k.item,k.selectCh,n),k.uiName===A&&await P.replaceChar(Q,G.Enemy,k.item,k.selectCh,n),await P.replaceJudge(n)},async k=>{console.log(`selected ch = ${k.item.ch.name}`);const F=new Et;F.selectCh=k.item.ch,F.selectedImg=k.selectedImg,F.scoreSet=k.scoreSet,S.charStock(F)},async k=>{const F=ut();console.log(F),await F.replaceJudge(n)}),y.enableLazyImages(n),M.show();const pe=new Y;pe.setAsDlg(M,w),c.add(pe)}return y}const R="playerForm",A="enemyForm",ke=await x(R,100,100,"自編成"),Te=await x(A,100,200,"敵編成");async function Rt(f,g,B,w){P.uiInfo.name=f,P.uiInfo.left=`${g}`,P.uiInfo.top=`${B}`;const y=await P.toHTML("combatTable",n),$=P.createCombatBox(w,f,y);P.enableLazyImages(n),await P.replaceJudge(n),$.show();const T=new Y;T.setAsDlg($,w),c.add(T)}const P=ut();await Rt("combatForm",120,300,"対戦予想");const ot="保存";{const f=new Y;f.setAsMenu(ot),c.add(f)}const lt="復帰";{const f=new Y;f.setAsMenu(lt),c.add(f)}let Se=null;const Bt=await c.toHTML("dockForm",n);if(e){const f=c.createDockBox("dockForm",Bt);c.addItemClickHandlers(async g=>{c.stdApplyAction(g)!==!1&&g.item.isMenuType&&(g.item.toolTip===ot&&await Ht(),g.item.toolTip===lt&&await Dt(async w=>{if(console.log(`[loadedResult] ${w}`),w!==ye.Success)return;const y=X.fromJsonInst($e),$=X.fromJsonInst(Ee);$e=null,Ee=null,await ke.Setup(y,n),await Te.Setup($,n)}))}),c.enableLazyImages(n),f.show(),Se=f}const at="playerForm.json",rt="enemyForm.json",ct="dockForm.json";async function Ht(){c.InitZOrder(_);const f=X.toJsonText(ke.formation,ke.scsList),g=X.toJsonText(Te.formation,Te.scsList),B=Ue.toJsonText(c),w=new window.JSZip;w.file(at,f),w.file(rt,g),w.file(ct,B);const y=await w.generateAsync({type:"blob"}),$="gameConfig.zip",T=URL.createObjectURL(y),O=document.createElement("a");O.href=T,O.download=$,O.click(),URL.revokeObjectURL(T),console.log("saved!")}let ht=null,$e=null,Ee=null;async function Dt(f){const g=document.createElement("input");return g.type="file",g.accept=".zip",g.addEventListener("cancel",()=>(console.log("Cancelled."),ye.Cancel)),g.addEventListener("change",async()=>{if(g.files.length==1){console.log("File selected: ",g.files[0].name);const w=await g.files[0].arrayBuffer(),$=await new window.JSZip().loadAsync(w);async function T(M){const pe=$.file(M);if(pe){const k=await pe.async("string"),F=JSON.parse(k);return console.log(F),F}}{const M=await T(ct);M&&(ht=M)}{const M=await T(at);M&&($e=M)}{const M=await T(rt);M&&(Ee=M)}const O=ht!==null&&$e!==null&&Ee!==null?ye.Success:ye.Fail;f(O)}}),g.click(),ye.Unknown}const _=new C;e&&(_.AddDialogs(),_.AssignIndexies(),await _.LoadAllSetting(),await _.loadSetting(Se),c.InitZOrder(_),await _.ForEachAsync(f=>{const g=j.FindDialogParent(f);return g!==null&&(m.isLocal||f==="charListArea"?g.hidden=!1:g.hidden=!0),!0}),Se!==null&&(Se.parentElement.hidden=!m.isLocal)),o.hideFullScreenCss(l);function mt(f){const g=new nt,B=new it,w=f.formation;w.uiInfo.name,w.uiInfo.name,f.scsList===void 0&&console.log(`[${f.formation.uiInfo.name}] 対戦予想結果の作成は工事中です`);let y=0;for(const $ of w.items){if(f.scsList===void 0)continue;const T=f.scsList[y];y++;const O=Math.ceil(T.stdScore),M=new Mt($.ch.id,$.ch.name,$.isEmpty,O);M.allAvailable=T.allAvailable,B.Add(M)}return g.Add(B),g.debug(),g}function ut(){const f=new os,g=mt(ke),B=mt(Te),w=new Ze;w.setScoreItems(g.groupRows[0].columns),w.boost=100;const y=new Ze;y.setScoreItems(B.groupRows[0].columns),y.boost=100;const $=new ns;$.setPlayer(w),$.setEnemy(y),f.setPair(We.HiLv,$),f.calcCombatScore();for(const[T,O]of f.combatPairs){const M=O.judge(q.None);console.log(`judge=[${M}]`)}return f}}async function ls(m){if(!m.isWebRunning)return;const e=m.isWebRunning;console.log(`mode=${m.edit}`);const t=new Je;async function s(){const d=le.Resource,u=new ft;u.init(),await u.load(d,J.none),u.uiInfo.name="ResourceEdit",u.uiInfo.left="110",u.uiInfo.top="10";const p=u.uiInfo.name,H=await u.toHTML(u.makeResEditItems(),u.makeResLog);if(e){const S=document.createElement("div");S.id=u.uiInfo.name,S.className=u.uiInfo.name,document.body.appendChild(S);const x="文字列リソース",R=u.createEditorBox(x,p,H);u.addEventHandlers(R),u.addItemEventHandlers(),R.show(),u.enableResize();const A=new Y;A.setAsDlg(R,x),t.add(A)}return u}async function i(){const d=le.ScoreUI,u=new ft;u.init(),await u.load(d,m.edit),u.uiInfo.name="ScoreEdit",u.uiInfo.left="110",u.uiInfo.top="100";const p=u.uiInfo.name,H=await u.toHTML(u.makeScoreEditItems(),u.makeScoreLog);if(e){const S=document.createElement("div");S.id=u.uiInfo.name,S.className=u.uiInfo.name,document.body.appendChild(S);const x="スコア設定",R=u.createEditorBox(x,p,H);u.addEventHandlers(R),u.addItemEventHandlers(),R.show(),u.enableResize();const A=new Y;A.setAsDlg(R,x),t.add(A)}return u}(await s()).startAutoSave(),(await i()).startAutoSave();const l=document.createElement("div"),a="dockEdit";l.id=a,l.className=a,document.body.appendChild(l);let r=null;const c=await t.toHTML(a,null);if(e){const d=t.createDockBox(a,c);t.addItemClickHandlers(async u=>{t.stdApplyAction(u)}),d.show(),r=d}const h=new C;e&&(h.AddDialogs(),h.AssignIndexies(),await h.LoadAllSetting(),await h.loadSetting(r),t.InitZOrder(h),await h.ForEachAsync(d=>{const u=j.FindDialogParent(d);return u!==null&&(m.isLocal||d==="charListArea"?u.hidden=!1:u.hidden=!0),!0}),r!==null&&(r.parentElement.hidden=!m.isLocal))}const v=new Ie,vt=v.isWebRunning;vt?(rs(),v.parseURLParams(),v.currentUserHome===""&&v.setUser(v.user1Home)):v.setUser(v.user2Home);const Lt=window.EVONA_CONFIG.isLocal;v.setPath();v.setImageHome(Lt);const as=cs(Lt);v.currentUserHome;v.statusJsonPath;v.zipPrefix;v.chListFile;v.chStatusListFile;switch(v.admin){case!0:await Ot(v);break;case!1:if(vt)if(v.edit===J.none){let m=!1,e=!1;const t=new he;t.CheckVisible=!0,t.CheckText="位置情報を初期化",t.SecretEnable=!0;const s=v.setBrowserTitle();await t.showWait(`「${s} 」モードで起動します`)===N.Secret&&(e=!0),m=t.Checked,console.log(`secretMode=[${e}]`),console.log(`cleanMode=[${m}]`),m&&(await(await Ft()).clear(),await(await ne()).clear()),e?(window.EVONA_CONFIG.demo=!1,await yt(v)):as&&await yt(v)}else v.setBrowserTitle(),await ls(v);break}function rs(){const m=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname.startsWith("192.168."),e=m?"./jszip_dist/jszip.min.js":"https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js",t=m?"./jsstore_dist/jsstore.min.js":"https://cdn.jsdelivr.net/npm/jsstore/dist/jsstore.min.js";window.EVONA_CONFIG={isLocal:m,workerFile:"./jsstore_dist/jsstore.worker.min.js",demo:!m};function s(i,n=!1){const o=document.createElement("script");o.src=i,n&&(o.type="module"),o.async=!1,document.head.appendChild(o)}s(e),s(t)}function cs(m){if(m)return!0;const e=document.referrer;console.log(`${e}`);const t="evona_auth",s="granted";return sessionStorage.getItem(t)===s?!0:e.includes("qiita.com")?(sessionStorage.setItem(t,s),!0):!1}

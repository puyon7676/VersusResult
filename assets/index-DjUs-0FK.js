(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();class fe{constructor(){this.imageRepository="https://puyon7676.github.io/GameImages/",this.imageHome="./Image/",this.user1Home="./User1/",this.user2Home="./User2/",this.currentUserHome="",this.isLocal=!1,this.admin=!1,this.cmd="",this.edit=!1,this.dataBasePath="../キャラパースデータ",this.statusJsonPath="",this.zipPrefix="",this.chListFile="",this.chStatusListFile="",this.charStatusZip="./CharStatus.zip",this.nodeToolsImportFilename="./nodeTools.js"}setImageHome(e){if(this.isLocal=e,e)this.imageHome=`${this.currentUserHome}Image/`;else{let t=this.currentUserHome;this.currentUserHome.substring(0,2)==="./"&&(t=this.currentUserHome.substring(2)),this.imageHome=`${this.imageRepository}${t}`}console.log(`imageHome=[${this.imageHome}]`)}setUser(e){this.currentUserHome=e}setPath(){this.currentUserHome===this.user1Home&&(this.statusJsonPath=`${this.dataBasePath}/ぷよクエ_詳細JSON`,this.zipPrefix="puyoQue_",this.chListFile=`${this.currentUserHome}chListFile_puyo.json`,this.chStatusListFile=`${this.currentUserHome}puyoQue_CharStatus.zip`),this.currentUserHome===this.user2Home&&(this.statusJsonPath=`${this.dataBasePath}/メメントモリ_詳細JSON`,this.zipPrefix="memeMori_",this.chListFile=`${this.currentUserHome}chListFile_meme.json`,this.chStatusListFile=`${this.currentUserHome}memeMori_CharStatus.zip`)}get gameTitle(){return this.edit?"エディタ":this.currentUserHome===this.user1Home?"ぷよクエ":"メメントモリ"}setBrowserTitle(){const e=this.gameTitle;document.head.title=e;for(const t of document.head.children)t.nodeName==="TITLE"&&(t.innerHTML=`EvoNa：${e} モード`);return e}get isWebRunning(){return!(typeof document>"u")}parseURLParams(){if(!this.isWebRunning){console.log("cannot parse URL params!");return}const e=new URLSearchParams(window.location.search);for(const[t,s]of e)switch(t.trim()){case"user":const n=s.trim();this.setUser(n==="1"?this.user1Home:this.user2Home);break;case"debug":break;case"admin":this.admin=s.trim()==="true";break;case"cmd":this.cmd=s;break;case"edit":this.edit=s.trim()==="true";break}}async loadJson(e){return console.log(`[loadJson] file=[${e}]`),await this._loadJson(e)}async _loadJson(e){if(this.isWebRunning){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`HTTPエラー! ステータス: ${t.status}`);return await t.json()}else{const{loadJsonNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async saveJson(e,t){const s=JSON.stringify(t);if(this.isWebRunning){const n=new Blob([s],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=e,o.click()}else{const{saveJsonNode:n}=await import(this.nodeToolsImportFilename);return n(e,t)}}async loadBinFile(e){if(this.isWebRunning)return await(await fetch(e)).blob();{const{readBinNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async getDoc(e){let t,s;if(this.isWebRunning)t=new DOMParser,s=t.parseFromString(e,"text/html");else{const{createHtmlParserNode:n}=await import(this.nodeToolsImportFilename);t=n(e),s=t.parseFromString(e,"text/html")}return s}}const T={None:"None",Ok:"Ok",OkCancel:"OkCancel",YesNo:"YesNo",YesNoCancel:"YesNoCancel"},re={None:"None",Ok:"Ok",Question:"Question"},N={None:"None",Ok:"Ok",Cancel:"Cancel",Yes:"Yes",No:"No",Secret:"Secret"};class ne{constructor(){this.parentName="evona-msg-box",this.buttonType=T.Ok,this.iconType=re.None,this.title="Confirm",this.btnS="",this.SecretEnable=!1,this.btnOk="OK",this.btnCancel="Cancel",this.btnYes="Yes",this.btnNo="No",this.CheckVisible=!1,this.CheckText="",this.Checked=!1,this.Result=N.None,this.onS1Clicked=e=>{this.Result=N.Secret,this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB1Clicked=e=>{switch(this.buttonType){case T.None:this.Result=N.None;break;case T.Ok:this.Result=N.Ok;break;case T.OkCancel:this.Result=N.Ok;break;case T.YesNo:this.Result=N.Yes;break;case T.YesNoCancel:this.Result=N.Yes;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB2Clicked=e=>{switch(this.buttonType){case T.None:this.Result=N.None;break;case T.Ok:this.Result=N.None;break;case T.OkCancel:this.Result=N.Cancel;break;case T.YesNo:this.Result=N.No;break;case T.YesNoCancel:this.Result=N.No;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB3Clicked=e=>{switch(this.buttonType){case T.None:this.Result=N.None;break;case T.Ok:this.Result=N.None;break;case T.OkCancel:this.Result=N.Cancel;break;case T.YesNo:this.Result=N.No;break;case T.YesNoCancel:this.Result=N.Cancel;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)}}get btnNameS(){return`${this.parentName}-s1`}get btnName1(){return`${this.parentName}-b1`}get btnName2(){return`${this.parentName}-b2`}get btnName3(){return`${this.parentName}-b3`}get chkName1(){return`${this.parentName}-chk1`}setParent(e){this.parentName=`${e}-msg-box`}setTypes(e,t){this.buttonType=e,this.iconType=t}setOk(e=re.Ok){this.setTypes(T.Ok,e)}setOkCancel(e=re.Question){this.setTypes(T.OkCancel,e)}setYesNo(e=re.Question){this.setTypes(T.YesNo,e)}setYesNoCancel(e=re.Question){this.setTypes(T.YesNoCancel,e)}async showWait(e,t=null){return this.remove(),this.createUI(e,t===null?this.title:t,!0),new Promise(s=>{this.resolver=s;let n=!1,i=!1,o=!1;switch(this.buttonType){case T.None:break;case T.Ok:n=!0,i=!1,o=!1;break;case T.OkCancel:n=!0,i=!0,o=!1;break;case T.YesNo:n=!0,i=!0,o=!1;break;case T.YesNoCancel:n=!0,i=!0,o=!0;break}n&&document.getElementById(this.btnName1)?.addEventListener("click",this.onB1Clicked,{once:!0}),i&&document.getElementById(this.btnName2)?.addEventListener("click",this.onB2Clicked,{once:!0}),o&&document.getElementById(this.btnName3)?.addEventListener("click",this.onB3Clicked,{once:!0}),this.SecretEnable&&document.getElementById(this.btnNameS)?.addEventListener("click",this.onS1Clicked,{once:!0})})}showNoWait(e,t="INFO"){this.remove(),this.createUI(e,t,!1)}showNoWaitEnd(){this.remove()}createUI(e,t,s){let n=`<button id="${this.btnNameS}" class="${this.btnNameS}">${this.btnS}</button>`,i="",o="",l="";switch(this.buttonType){case T.None:break;case T.Ok:i=`<button id="${this.btnName1}">${this.btnOk}</button>`,o="";break;case T.OkCancel:i=`<button id="${this.btnName1}">${this.btnOk}</button>`,o=`<button id="${this.btnName2}">${this.btnCancel}</button>`;break;case T.YesNo:i=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`;break;case T.YesNoCancel:i=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`,l=`<button id="${this.btnName3}">${this.btnCancel}</button>`;break}let a="";this.CheckVisible&&(a=`
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
            `.trim(),document.head.appendChild(t)}setCheckResult(){const e=document.getElementById(this.chkName1);if(e!==null){const t=e.checked;console.log(`[setCheckResult] ${t}`),this.Checked=t}}remove(){document.getElementById(this.btnName1)?.removeEventListener("click",this.onB1Clicked),document.getElementById(this.btnName2)?.removeEventListener("click",this.onB2Clicked),document.getElementById(this.btnName3)?.removeEventListener("click",this.onB3Clicked),document.getElementById(this.btnNameS)?.removeEventListener("click",this.onS1Clicked),document.getElementById(this.parentName)?.remove()}}class ut{constructor(){this.tblNameCharImages="CharImages",this.tblCharImages={name:this.tblNameCharImages,columns:{ns:{dataType:"string",index:!0},name:{dataType:"string"},fileName:{dataType:"string",index:!0},fileData:{dataType:"object"}}},this.tblNameSettings="Settings",this.tblSettings={name:this.tblNameSettings,columns:{key:{dataType:"string",primaryKey:!0},value:{dataType:"string"}}},this.tblNameActionLog="ActionLog",this.tblActionLog={name:this.tblNameActionLog,columns:{id:{primaryKey:!0,autoIncrement:!0},logType:{dataType:"string"},log:{dataType:"string"}}},this.dbName="EvonaDB",this.db={name:this.dbName,tables:[this.tblCharImages,this.tblSettings,this.tblActionLog]}}async connect(e){console.log("Waiting for JsStore library...");let t=0;for(;typeof window.JsStore>"u";){if(t>50)throw new Error("JsStore library load timeout. Check script tag order.");await new Promise(n=>setTimeout(n,100)),t++}const s=window.JsStore;this.connection=new s.Connection(new Worker(e)),console.log("connection started with library version:",s.VERSION)}async term(){await this.connection.terminate(),console.log("connection terminated")}async initDb(){const e=await this.connection.initDb(this.db);return console.log(e?"Db Created & connection is opened":"Db connection is opened"),e}async dropDb(){let e=!1;return await this.connection.dropDb().then(function(){console.log("Db deleted successfully"),e=!0}).catch(function(){console.error("dropDb error")}),e}async deleteAllRecords(e){return await this.existsTable(e)===!1?(console.log(`[${e}] not exist`),!1):(await this.connection.clear(e),console.log(`[${e}] all record deleted successfully`),!0)}async existsTable(e){try{const t=await this.connection.count({from:e});return!0}catch(t){console.log("[existsTable] JsStore Select Error:",t)}return!1}get defWorkerFile(){return window.EVONA_CONFIG.workerFile}async setup(){return await this.connect(this.defWorkerFile),await this.initDb()}}class ct extends ut{async insert(e,t){await this.connection.insert({into:this.tblNameSettings,values:[{key:e,value:t}],upsert:!0})}async insertMultiple(e){const t=e.map(s=>({key:s.key,value:s.value}));return await this.connection.insert({into:this.tblNameSettings,values:t,upsert:!0})}async selectKey(e){try{var t=await this.connection.select({from:this.tblNameSettings,where:{key:e}});return t.length>=1?t[0].value:null}catch(s){console.error("[selectKey] JsStore Select Error:",s)}return null}async countKey(e){try{return await this.connection.count({from:this.tblNameSettings,where:{key:e}})}catch(t){console.error("[countKey] JsStore Select Error:",t)}return-1}async clear(){await this.deleteAllRecords(this.tblNameSettings)}}class dt{constructor(){this.table=new ct}async init(){const e=new ct;await e.setup(),this.table=e}async saveDialogPos(e){const t=e.parentElement,s=`${t?.className},${t?.style.left},${t?.style.top}`;await this.table.insert(e.className,`${s}`)}async loadDialogPos(e){const t=e.parentElement,s=await this.table.selectKey(e.className);if(s!==null){const n=s.split(",");n.length===3&&t!==null&&n[0]===t.className&&(t.style.left=n[1],t.style.top=n[2])}}async clear(){this.table.clear()}}class Ve extends ut{async insert(e,t){await this.connection.insert({into:this.tblNameActionLog,values:[{logType:e,log:t}]})}async insertMultiple(e){const t=e.map(s=>({logType:s.logType,log:s.log}));return await this.connection.insert({into:this.tblNameActionLog,values:t})}async selectType(e){try{var t=await this.connection.select({from:this.tblNameActionLog,where:{logType:e},order:{by:"id",type:"asc"}});return t.length>=1?t:null}catch(s){console.error("[selectType] JsStore Select Error:",s)}return null}async countType(e){try{return await this.connection.count({from:this.tblNameActionLog,where:{logType:e}})}catch(t){console.error("[countType] JsStore Select Error:",t)}return-1}async clear(){await this.deleteAllRecords(this.tblNameActionLog)}}class Lt{constructor(){this.table=new Ve}async init(){const e=new Ve;await e.connect(e.defWorkerFile),await e.initDb(),this.table=e}async clear(){this.table.clear()}async put(e,t){return await this.table.insert(e,t)}async get(e){const t=await this.table.selectType(e);if(t===null)return null;const s=new Array;for(const n of t)s.push(n.log);return s}}const ie={CharSummaryAction:"CharSummaryAction",ResourceEditAction:"ResourceEditAction",ScoreEditAction:"ScoreEditAction"};let Ne=null;async function Rt(){return Ne||(Ne=new dt,await Ne.init(),console.log("SettingAccess instance created (Singleton)")),Ne}let Ie=null;async function oe(){return Ie||(Ie=new Lt,await Ie.init(),console.log("LogAccess instance created (Singleton)")),Ie}function Ht(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,m=>{const e=Math.random()*16|0;return(m==="x"?e:e&3|8).toString(16)})}function Dt(){const m=Date.now().toString(16),e=Ht();return`${m}-${e}`}async function Bt(m){const e=m.cmd.split(":"),t=new Ve;await t.setup();let s=!1;e[0]==="drop"&&(s=await t.dropDb());const n=`[${m.cmd}] res=${s}`;alert(n)}class At{constructor(){this.imageHome="",this.cache=new Map,this.cacheNs=new Map,this.zip=null,this.zipNs=new Map,this.isMultiZip=!1,this.AnyNs=""}async setupNs(e,t,s){const n=s.findByNs(e);if(n===void 0)return;this.imageHome=t.imageHome;for(const o of n){const l=o.iconFileName,a=`${this.imageHome}${e}/${l}`;this.cache.set(l,a),this.cacheNs.set(l,e)}this.isMultiZip=!0;const i=[{ns:"",fileName:"plus.png"},{ns:"",fileName:"win.png"},{ns:"",fileName:"even.png"},{ns:"",fileName:"lost.png"},{ns:"",fileName:"demo.png"}];for(const o of i){const l=o.fileName,a=`${this.imageHome}${o.ns}/${l}`;this.cache.set(l,a),this.cacheNs.set(l,e)}}async checkExists(e){try{return(await fetch(e,{method:"HEAD"})).ok}catch{return!1}}isMaterial(e){return!!(e.includes("plus.png")||e.includes("win.png")||e.includes("even.png")||e.includes("lost.png"))}get loaded(){return this.isMultiZip?this.zipNs.size!==0:this.zip!==null}async _loadZipBy(e,t){const s=new fe;this.imageHome=s.imageHome.substring(2);const n=await s.loadBinFile(e);let i=null;if(s.isWebRunning)i=await window.JSZip.loadAsync(n);else{const{loadZipNode:o}=await import(s.nodeToolsImportFilename);i=await o(n)}this.zipNs.set(t,i),this.isMultiZip=!0}async getImageUrlBy(e,t){if(this.cache.has(e)){const s=this.cache.get(e);if(!await this.checkExists(s)){const i=`${this.imageHome}notexist.png`;this.cache.set(e,i)}return this.cache.get(e)}return null}async findNs(e){if(!this.isMultiZip)return null;if(this.cacheNs.has(e)){const t=this.cacheNs.get(e);if(t!==void 0)return t}return null}dispose(){for(const e of this.cache.values())URL.revokeObjectURL(e);this.cache.clear()}}class ce{constructor(){this.parentElem=null,this.cancel=!1,this.targetId="",this.classify="",this.selectedValue="",this.Keydown="",this.KeyEnter=se.None}}class xe{constructor(){this.callerName="",this.result=""}}class qe{constructor(){this.parentElem=null,this.left="",this.top="",this.width="",this.height=""}}const Te={Enter:"Enter",Escape:"Escape",Tab:"Tab",Process:"Process"},se={None:"None",Normal:"Normal",Special:"Special"},E={Btn:"Btn",Img:"Img",Label:"Label",LabelRO:"LabelRO",Combo:"Combo",Input:"Input",Plain:"Plain",Table:"Table"};class Xe{constructor(){this.imgSrc="",this.imgFile="",this.alt=""}}class ve{constructor(){this.selectedItem="",this.selectionPair=[],this.classify=""}}class K{constructor(){this.type="text",this.value="",this.placeholder=""}}class pt{constructor(){this.typeInfo=new gt,this.className=""}ToHTML(){let e="";switch(this.typeInfo.using.itemType){case E.Btn:e=this.typeInfo.ToButtonHTML(this.className);break;case E.Label:e=this.typeInfo.ToLableHTML(this.className);break;case E.LabelRO:e=this.typeInfo.ToLableROHTML(this.className);break;case E.Combo:e=this.typeInfo.ToComboHTML(this.className);break;case E.Input:e=this.typeInfo.ToInputHTML(this.className);break;case E.Img:e=this.typeInfo.ToImgHTML(this.className,this.typeInfo.using.img.alt);break;case E.Plain:e=this.typeInfo.using.innerHTML;break}return e}copyTo(e){e.className=this.className,e.typeInfo.toolTip=this.typeInfo.toolTip,e.typeInfo.using.itemType=this.typeInfo.using.itemType,e.typeInfo.using.label=this.typeInfo.using.label,e.typeInfo.using.combo=this.typeInfo.using.combo,e.typeInfo.using.input=this.typeInfo.using.input,e.typeInfo.using.innerHTML=this.typeInfo.using.innerHTML,e.typeInfo.using.img=this.typeInfo.using.img}}class je{constructor(){this.items=new Array}makeItems(e=1){this.items.length>0&&this.items.splice(0,this.items.length);for(let t=0;t<e;t++){const s=new pt;this.items.push(s)}}ToHTML(){let e="";for(const t of this.items){const s=t.ToHTML();s!==""&&(this.items.length>=2?e=`${e}<div>${s}</div>`:e=s)}return e}}class _e{constructor(){this.rowName="",this.cols=new Array}makeCols(e){this.cols.length>0&&this.cols.splice(0,this.cols.length);for(let t=0;t<e;t++){const s=new je;s.makeItems(),this.cols.push(s)}}ToHTML(){let e="";for(const t of this.cols){let s="";s=t.ToHTML(),s!==""&&(e=`${e}<td>${s}</td>`)}return e}toTemplate(){const e=new _e;e.rowName=this.rowName;for(const t of this.cols){const s=new je;s.makeItems(t.items.length);let n=-1;for(const i of t.items){n++;const o=s.items[n];o.className=i.className,o.typeInfo.toolTip=i.typeInfo.toolTip,o.typeInfo.using.itemType=i.typeInfo.using.itemType,o.typeInfo.using.label=i.typeInfo.using.label,o.typeInfo.using.combo=i.typeInfo.using.combo,o.typeInfo.using.input=i.typeInfo.using.input,o.typeInfo.using.innerHTML=i.typeInfo.using.innerHTML,o.typeInfo.using.img=i.typeInfo.using.img}e.cols.push(s)}return e}}class q{constructor(){this.tableName="",this.rows=new Array,this.template=null,this.invalidRowIndex=-1,this.firstRowIndex=1,this.clipboardText=""}makeDim(e,t){this.rows.length>0&&this.rows.splice(0,this.rows.length);for(let s=0;s<t;s++){const n=new _e;n.makeCols(e),this.rows.push(n)}}growCell(e,t=1){const s=this.rows.length;for(let n=0;n<s;n++)this.rows[n].cols[e].makeItems(t)}getCell(e,t,s=0){return this.rows[t].cols[e].items[s]}ToHTML(e="",t){this.tableName=e;let s="",n=0;for(const a of this.rows){n++;let r="";if(r=a.ToHTML(),r!==""){const c=a.rowName!==""?` class="${a.rowName}"`:"";s=`${s}<tr ${c} item-id="${n}">${r}</tr>`}}const i=e!==""?` class="${e}"`:"",o=t!==""?` id="${t}"`:"",l=t!==""?` item-id="${t}"`:"";return s=`<table${i}${o}${l}>${s}</table>`,s}ToScrollHTML(e="",t){const s=e!==""?` class="${e}"`:"",n=t!==""?` item-id="${t}"`:"";return`<div${s}${n}>
${this.ToHTML(e,t)}
</div>`}makeRowTemplate(e){if(this.rows.length>=1){for(const t of this.rows)t.rowName=e;this.template=this.rows[0].toTemplate()}}clearRows(){this.rows=new Array}addRow(e){const t=this.getTable();if(t===null)return-1;const s=t.insertRow(-1),n=t.rows.length;if(s.className=e,s.setAttribute("item-id",`${n}`),this.template!==null&&this.template.cols.length>=1){const i=this.template.toTemplate();let o="";for(const l of i.cols){let a="";for(const r of l.items){r.typeInfo.using.itemId=n;const c=r.ToHTML();c!==""&&(l.items.length>=2?a=`${a}<div>${c}</div>`:a=c)}a!==""&&(o=`${o}<td>${a}</td>`)}return s.innerHTML=o,n}return-1}deleteRow(e){const t=this.getTable();if(t===null)return!1;for(const s of t.rows){const n=s.getAttribute("item-id");if(n!==null&&n===`${e}`)return t.deleteRow(e-this.firstRowIndex),!0}return!1}redimAllRows(){const e=this.getTable();if(e===null)return;let t=this.firstRowIndex-1;for(const s of e.rows)if(s.getAttribute("item-id")!==null){t++,s.setAttribute("item-id",`${t}`);for(const i of s.cells)this.redimElems(i.children,t)}}redimElems(e,t){for(const s of e)s.getAttribute("item-id")!==null&&s.setAttribute("item-id",`${t}`),s.children!==void 0&&this.redimElems(s.children,t)}selectRow(e){const t=this.getTable();if(t!==null&&!(e<=0)&&!(e>t.rows.length)){for(const s of t.rows)s.classList!==void 0&&s.classList.remove("selected");t.rows[e-1].classList.add("selected")}}getSelectedRow(){const e=this.getTable();if(e===null)return this.invalidRowIndex;for(const t of e.rows)if(t.classList!==void 0&&t.classList.contains("selected")){const s=t.getAttribute("item-id");return s!==null?parseInt(s):this.invalidRowIndex}return this.invalidRowIndex}updateRowImage(e,t){const n=this.getTable()?.querySelector(`tr[item-id="${e}"] img`);n instanceof HTMLImageElement&&(n.src=t)}updateText(e,t){if(e.children!==null){const s=e.children[0];s.textContent=t}}scroll(e){const t=this.getTable();if(t===null||e<=0||e>t.rows.length)return null;const s=t.querySelector(`tr[item-id="${e}"] img`);return s===null||s===void 0?null:(s.scrollIntoView({behavior:"smooth",block:"center"}),s)}getRowElems(){const e=this.getTable();return e===null?null:e.rows}getElemValue(e){return e instanceof HTMLInputElement||e instanceof HTMLSelectElement?e.value:null}setElemValue(e,t){if(e instanceof HTMLInputElement){const s=e,n=s.value;return s.value=t,n}else if(e instanceof HTMLSelectElement){const s=e,n=s.value;return s.value=t,n}return null}getRowElem(e){const t=this.getTable();if(t===null)return null;for(const s of t.rows){const n=s.getAttribute("item-id");if(n!==null&&n===`${e}`)return console.log(`match row id : ${n}`),t.rows[e-this.firstRowIndex]}return null}getCellElems(e){if(e===null)return null;const t=new Array;for(const s of e.cells){if(s===null)continue;const n=new Array;for(const i of s.children)n.push(i);t.push(n)}return t}setVisible(e){const t=this.getTable();return t===null?null:(t.hidden=!e,t.parentElement.hidden=!e,!0)}getCellRect(e){const t=new M,s=t.GetRect(e.parentElement),n=t.GetRect(e),i=new qe;return i.left=`${n.left}`,i.top=`${s.top}`,i.width=`${n.width}`,i.height=`${n.height}`,i}getTableOwnerRect(e){const t=new M,s=t.GetRect(e.parentElement.parentElement.parentElement.parentElement.parentElement);console.log(`[OWNER] ${s.left}, ${s.top}`);const n=t.GetRect(e.parentElement.parentElement.parentElement);console.log(`[TABLE] ${n.left}, ${n.top}`);const i=t.GetRect(e.parentElement.parentElement);console.log(`[TBODY] ${i.left}, ${i.top}`);const o=t.GetRect(e.parentElement);console.log(`[TROW] ${o.left}, ${o.top}`);const l=new qe;return l.left=`${n.left}`,l.top=`${s.top}`,l.width="0",l.height="0",l}makeCallerName(e,t){return`${e}:${t}`}getCallerCellElem(e){const t=e.split(":");if(t===void 0||t.length!==2)return null;const s=this.getRowElem(parseInt(t[1]));if(s===null)return null;const n=this.getCellElems(s);if(n===null)return null;for(const i of n)for(const o of i)if(o.className===t[0])return o;return null}async toClipboard(){const e=this.getTable();if(e===null)return!1;let t="";for(const n of e.rows){let i="";const o=this.getCellElems(n);if(o===null)return!1;for(const l of o){let a="";for(const r of l){const c=this.getElemValue(r);let h=c===null?"&null&":`&${c}&`;a.length!==0?a=`${a}	${h}`:a=h}i.length!==0?i=`${i}	${a}`:i=`${a}`}t.length!==0?t=`${t}
${i}`:t=`${i}`}const s=`table:{${t}}`;try{await navigator.clipboard.writeText(s)}catch(n){return console.error("コピー失敗...",n),!1}return!0}async fromClipboard(){const e=this.getTable();if(e===null)return!1;let t="";try{t=await navigator.clipboard.readText()}catch(o){return console.error("ペースト失敗...",o),!1}this.clipboardText=t;const s="table:{";if(t.length<s.length+1||t.startsWith(s)===!1||t.endsWith("}")===!1)return!1;t=t.substring(s.length),t=t.substring(0,t.length-1);const n=t.split(`
`);let i=0;for(const o of e.rows){const a=n[i].split("	"),r=this.getCellElems(o);if(r===null)return!1;if(a.length!==r.length)return console.log(`different column size : line ${i+1}`),!1;i++}i=0;for(const o of e.rows){const a=n[i].split("	"),r=this.getCellElems(o);if(r===null)return!1;let c=0;for(const h of r){let u=a[c];if(u.startsWith("&")!==!1&&u.endsWith("&")!==!1&&(u=u.substring(1,u.length-1),u!=="null")){for(const p of h){this.setElemValue(p,u);break}c++}}i++}return!0}getTable(){const e=`.${this.tableName}`,t=document.querySelectorAll(e);if(t===null||t.length<=0)return null;const n=t[0].querySelectorAll(e);return n===null||n.length<=0?null:n[0]}HorzCSS(e){return`
.${e} {
  width: 1000px;
  overflow-x: auto; white-space: nowrap;
}`}VertCSS(e){return`
.${e} {
  height: 300px; overflow-y: auto;
}`}}class Pt{constructor(){this.htmlMaker=new M,this.table=new q,this.gridElem=null,this.headerElem=null,this.footerElem=null}makeKeyCell(e,t,s){const n=new pt;return n.typeInfo.setLabel(e,!1),n.className=t,n.typeInfo.toolTip=s,n}makePair(){return new Map}setPair(e){if(e.size===0)return!1;this.table.makeDim(2,e.size),e.forEach((s,n)=>{this.table.growCell(1,s.items.length)});let t=-1;return e.forEach((s,n)=>{t++,this.table.getCell(0,t).typeInfo.setLabel(n.typeInfo.using.label,!1),this.table.getCell(0,t).className=n.className;let i=-1;for(const o of s.items)i++,this.table.getCell(1,t,i).typeInfo=o.typeInfo,this.table.getCell(1,t,i).className=o.className}),!0}setListener(e,t,s,n="",i=""){this.dispose(),this.table.makeRowTemplate(t);const o=document.getElementById(s);if(o===null)return console.log(`[setListener] cannot found ${s}`),!1;const l=this.table.ToScrollHTML(e,e),a=new B;a.props.name="",a.props.id=e,a.props.className=e,a.props.option.setTable(l),a.props.option.onSelect=async h=>{console.log(`classify = ${h.classify} targetId = ${h.targetId}`),this.onSelect!==void 0&&await this.onSelect(h)},this.htmlMaker=new M,this.htmlMaker.add(a);const r=this.htmlMaker.ToHTML();let c=document.createElement("div");return c.className=e,c.innerHTML=r,this.gridElem=c.children[0],n!==""&&(this.headerElem=document.createElement("div"),this.headerElem.className=n,this.headerElem.id=n,o.appendChild(this.headerElem)),o.appendChild(this.gridElem),c.remove(),c=null,i!==""&&(this.footerElem=document.createElement("div"),this.footerElem.className=i,this.footerElem.id=i,o.appendChild(this.footerElem)),!0}getSelectedRow(){return this.table.getSelectedRow()}enableEvents(e){return this.gridElem===null?!1:(this.htmlMaker.enableTableEvents(this.gridElem.className),this.onSelect=e,!0)}disableEvents(){return this.gridElem===null?!1:(this.htmlMaker.disableTableEvents(this.gridElem.className),!0)}setVisible(e){return this.gridElem===null?!1:(this.gridElem.hidden=!e,!0)}dispose(){this.headerElem!==null&&(this.headerElem.parentElement?.removeChild(this.headerElem),this.headerElem.remove()),this.footerElem!==null&&(this.footerElem.parentElement?.removeChild(this.footerElem),this.footerElem.remove()),this.gridElem!==null&&(this.gridElem.parentElement?.removeChild(this.gridElem),this.gridElem.remove()),this.disableEvents(),this.headerElem=null,this.footerElem=null,this.gridElem=null}}class ft{constructor(){this.ctlName="",this.ovElem=null}firstAction(e,t){const s=document.getElementById(t);return s===null?(console.log(`[firstAction] cannot found ${t}`),null):(this.createOverlay(s),this.ctlName=e,s)}createOverlay(e){const t=document.createElement("div");t.id=`${this.ovCssName()}`,t.style.position="absolute",t.style.inset="0",t.style.zIndex=this.zIndexOv(),t.style.background="transparent",t.style.background="rgba(0,0,0,0.1)",e.appendChild(t),this.ovElem=t}getBaseElem(){return this.ovElem!==null?this.ovElem.parentElement:null}getOuterCssText(){return`
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
        `.trim()}getTblCssText(){return`
border-collapse: collapse; /* セルの境界線を重ねて隙間を消す */
border-spacing: 0;         /* 念のため間隔もゼロに */
margin: 0;                 /* 外側の余白もゼロに */
display: block;            /* もしくは table。配置を安定させます */
background-color: #f7eb86e6;
border: 1px solid #2c3e50;
padding: 1px;
        `.trim()}dispose(){this.ovElem!==null&&(this.ovElem.parentElement?.removeChild(this.ovElem),this.ovElem.remove())}ovCssName(){return`${this.ctlName}-barrier`}zIndexCtl(){return"1000"}zIndexOv(){return"999"}}const ke={ByText:"ByText",ByValue:"ByValue",Both:"Both"};class Ft extends ft{constructor(){super(...arguments),this.ctlName="",this.initValue="",this.selectedIndex=-1,this.delimiter="/",this.callerName="",this.htmlMaker=new M,this.table=new q,this.ctlElem=null,this.onUpAction=async()=>{this.keyValuePairs!==void 0&&(this.selectedIndex=this.selectedIndex<=0?this.keyValuePairs.length-1:this.selectedIndex-1,this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]))},this.onDnAction=async()=>{this.keyValuePairs!==void 0&&(this.selectedIndex=this.selectedIndex>=this.keyValuePairs.length-1?0:this.selectedIndex+1,this.updateValueElemByKeyValue(this.keyValuePairs[this.selectedIndex]))}}setListener(e,t,s){this.dispose(),this.callerName=s,this.ctlName=e;const n=new q;n.makeDim(1,3);let i=0;n.getCell(0,i).typeInfo.setButton("▲"),n.getCell(0,i).className=this.upCssName(),n.getCell(0,i).typeInfo.using.itemId=i,i++,n.getCell(0,i).typeInfo.setButton(""),n.getCell(0,i).className=this.valCssName(),n.getCell(0,i).typeInfo.using.itemId=i,i++,n.getCell(0,i).typeInfo.setButton("▼"),n.getCell(0,i).className=this.dwCssName(),n.getCell(0,i).typeInfo.using.itemId=i;const o=this.firstAction(e,t);if(o===null)return!1;const l=n.ToScrollHTML(e,e),a=new B;a.props.name="",a.props.id=this.tblCssName(),a.props.className=this.tblCssName(),a.props.option.setTable(l),a.props.option.onSelect=async p=>{switch(p.classify){case this.valCssName():if(this.onApply!==void 0){const g=new xe;g.callerName=this.callerName,g.result=this.keyValuePairs[this.selectedIndex],await this.onApply(g)}break;case this.upCssName():if(this.onUp!==void 0){const g=new xe;g.callerName=this.callerName,g.result=this.keyValuePairs[this.selectedIndex],await this.onUp(g),p.cancel||this.onUpAction()}break;case this.dwCssName():if(this.onDown!==void 0){const g=new xe;g.callerName=this.callerName,g.result=this.keyValuePairs[this.selectedIndex],await this.onDown(g),p.cancel||this.onDnAction()}break}},this.htmlMaker=new M,this.htmlMaker.add(a);const r=this.htmlMaker.ToHTML();let c=document.createElement("dialog");c.className=e,c.innerHTML=r,this.ctlElem=c;let h=c.children[0],u=h.children[0];return u.className=`${this.tblCssName()}`,u.id=`${this.tblCssName()}`,this.ctlElem.appendChild(u),h.remove(),h=null,o.appendChild(this.ctlElem),this.table=n,!0}setSelectedByValue(e,t,s=ke.Both){const n=new Array;switch(s){case ke.ByText:n.push(0);break;case ke.ByValue:n.push(1);break;case ke.Both:n.push(0),n.push(1);break;default:return!1}this.initValue=e,this.keyValuePairs=t,this.selectedIndex=-1;const i=e.split(this.delimiter);let o=i.length>=2?i[1]:e,l="";for(const a of n){let r=-1;for(const c of t)if(r++,c!==null&&c!==""){const h=c.split(this.delimiter);if(h.length>=2&&h[a]===o){this.selectedIndex=r,l=h[0];break}}if(this.selectedIndex!==-1)break}if(this.selectedIndex===-1){const r=t[0].split(this.delimiter);this.selectedIndex=0,l=r[0]}return this.updateValueElemByText(l),this.selectedIndex!==-1}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-updn-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getTblCssText()}
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e,t,s){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onApply=e,this.onUp=t,this.onDown=s,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}updateValueElemByKeyValue(e){if(this.ctlElem===null)return;let t="";const s=e.split(this.delimiter);s.length>=2&&(t=s[0]),this.updateValueElemByText(t)}updateValueElemByText(e){if(this.ctlElem===null)return;const t=this.ctlElem.querySelectorAll(`.${this.valCssName()}`);t!==null&&(t[0].textContent=e)}tblCssName(){return`${this.ctlName}-tbl`}upCssName(){return`${this.ctlName}-upBtn`}dwCssName(){return`${this.ctlName}-dwBtn`}valCssName(){return`${this.ctlName}-values`}}class Ue{constructor(){this.key="",this.text=""}}class Ut extends ft{constructor(){super(...arguments),this.callerName="",this.htmlMaker=new M,this.table=new q,this.ctlElem=null}setChoiceItems(e){this.items=e}setListener(e,t,s){if(this.items===void 0)return!1;this.dispose(),this.callerName=s,this.ctlName=e;const n=this.items.length,i=new q;i.makeDim(1,n);let o=0;for(const g of this.items)i.getCell(0,o).typeInfo.setButton(`${g.text}`),i.getCell(0,o).className=`${e}-${g.key}`,i.getCell(0,o).typeInfo.using.itemId=o,o++;const l=this.firstAction(e,t);if(l===null)return!1;const a=i.ToScrollHTML(e,e),r=new B;r.props.name="",r.props.id=this.tblCssName(),r.props.className=this.tblCssName(),r.props.option.setTable(a),r.props.option.onSelect=async g=>{if(console.log(`classify = ${g.classify} targetId = ${g.targetId}`),this.onSelect!==void 0){const L=parseInt(g.targetId),H=new xe;H.callerName=this.callerName,H.result=0<=L&&L<this.items.length?this.items[L].key:"",await this.onSelect(H)}},this.htmlMaker=new M,this.htmlMaker.add(r);const c=this.htmlMaker.ToHTML();let h=document.createElement("dialog");h.className=e,h.innerHTML=c,this.ctlElem=h;let u=h.children[0],p=u.children[0];return p.className=`${this.tblCssName()}`,p.id=`${this.tblCssName()}`,this.ctlElem.appendChild(p),u.remove(),u=null,l.appendChild(this.ctlElem),this.table=i,!0}show(e,t){this.ctlElem!==null&&(this.ctlElem.style.left=`${e}px`,this.ctlElem.style.top=`${t}px`,this.ctlElem.show())}applyCss(){const e=`${this.getBaseElem().className}-updn-style`;if(document.getElementById(e))return;const t=document.createElement("style");t.id=e,t.textContent=`
${this.getOuterCssText()}
.${this.tblCssName()} {
  ${this.getTblCssText()}
}
.${this.tblCssName()} button {
width: 100%;
}
        `.trim(),document.head.appendChild(t)}enableEvents(e){return this.ctlElem===null?!1:(this.htmlMaker.enableTableEvents(this.ctlElem.className),this.onSelect=e,!0)}disableEvents(){return this.ctlElem===null?!1:(this.htmlMaker.disableTableEvents(this.ctlElem.className),!0)}setVisible(e){return this.ctlElem===null?!1:(this.ctlElem.hidden=!e,!0)}dispose(){super.dispose(),this.ctlElem!==null&&(this.ctlElem.parentElement?.removeChild(this.ctlElem),this.ctlElem.remove()),this.disableEvents(),this.ctlElem=null}tblCssName(){return`${this.ctlName}-tbl`}}class Ot{constructor(){this.itemType=E.Img,this.itemId=-1,this.label="",this.innerHTML=""}}class gt{constructor(){this.toolTip="",this.using=new Ot}setButton(e){this.using.itemType=E.Btn,this.using.label=e}setLabel(e,t){this.using.itemType=t?E.Label:E.LabelRO,this.using.label=e}setCombo(e){this.using.itemType=E.Combo,this.using.combo=e}setInput(e){this.using.itemType=E.Input,this.using.input=e}setImg(e){this.using.itemType=E.Img,this.using.img=e}setPlain(e){this.using.itemType=E.Plain,this.using.innerHTML=e}setTable(e){this.using.itemType=E.Table,this.using.innerHTML=e}ToButtonHTML(e){const t=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"";return`
<button class="${e}"${t}>${this.using.label}</button>
`.trim()}ToLableHTML(e){return`
<span class="${e}" data-readonly="false">${this.using.label}</span>
`.trim()}ToLableROHTML(e){return`
<span class="${e}" data-readonly="true">${this.using.label}</span>
`.trim()}ToComboHTML(e){if(this.using.combo===void 0)return"";const t=this.using.combo;let s=B.makeComboItemsHTML(t);const n=t.classify!==""?` data-classify="${t.classify}"`:"";return`
<select class="${e}" ${n}>
  ${s}
</select>
`.trim()}ToInputHTML(e){if(this.using.input===void 0)return"";const t=this.using.input,s=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"",n=t.value!==""?` value="${t.value}"`:"",i=t.placeholder!==""?` placeholder="${t.placeholder}"`:"";return`
<input type="${t.type}" class="${e}"${s}${n}${i}>
`.trim()}ToImgHTML(e,t){let s="";return this.using.img.imgSrc===""?s=`src="" data-filename="${this.using.img.imgFile}"`:s=`src="${this.using.img.imgSrc}"`,`
<img class="${e}" ${s} alt="${t}">
`.trim()}ToOverlayHTML(){return`<div class="overlay" title="${this.toolTip}"></div>`}}class zt{constructor(){this.name="",this.id="",this.className="",this.option=new gt}}class B{constructor(){this.props=new zt}ToHTML(e){let t="",s="";switch(e.option.using.itemType){case E.Label:t=e.option.ToLableHTML(e.className),s=e.option.ToOverlayHTML();break;case E.LabelRO:t=e.option.ToLableROHTML(e.className);break;case E.Plain:t=`
${e.option.using.innerHTML}
`.trim();break;case E.Combo:t=e.option.ToComboHTML(e.className);break;case E.Input:t=e.option.ToInputHTML(e.className);break;case E.Img:t=e.option.ToImgHTML(e.className,e.option.using.img.alt),s=e.option.ToOverlayHTML();break}return`
  ${t}
  ${s}
`.trim()}MakeSelectableHTML(){return`
<div class="${this.props.name}" item-id="${this.props.id}">
${this.ToHTML(this.props)}
</div>
`.trim()}static makeComboItemsHTML(e){if(e.selectionPair===void 0||e.selectionPair.length<=0)return"";let t="";for(const s of e.selectionPair){let[n,i]=s.split("/");i=i.trim();const o=e.selectedItem===i?" selected":"",l=`
<option value="${i}"${o}>${n}</option>
`.trim();t+=l}return t}}class M{constructor(){this._defaultButtonsName="dialog-buttons",this._defaultToolButtonsName="dialog-tool-btns",this._enableScrollEvt=!1,this._scrollTimer=null,this._isScrolling=!1,this.onButtonClicked=e=>{const t=e.target;if(t===null)return;const s=t.tagName==="BUTTON"?t:t.parentElement;if(s===null)return;let n=this.supplessSelected(s.className);if(n!==""){n=`.${n}`;const o=document.querySelectorAll(`${n}.selected`);o!==null&&o.forEach(l=>l.classList.remove("selected")),s.classList.add("selected")}const i=s.getAttribute("item-id");if(i){const o=this.itemList.find(l=>`${l.props.id}`===i);if(o){if(o.props.option.onSelect){let l="";t.tagName==="BUTTON"&&(l=t.getAttribute("item-id"),l===null&&(l=""));const a=new ce;a.parentElem=t.parentElement,a.item=o,a.targetId=l,o.props.option.onSelect(a)}this.selectedCh=o}else{let l=this.getTopElement(t);if(l?.tagName==="TABLE"){const a=l.className,r=this.itemList.find(c=>c.props.className===a);if(r){if(r.props.option.onSelect){let c="";t.tagName==="BUTTON"&&(c=t.getAttribute("item-id"),c===null&&(c=""));const h=new ce;h.parentElem=t.parentElement,h.item=r,h.targetId=c,h.classify=this.supplessSelected(t.className),r.props.option.onSelect(h)}this.selectedCh=r}}}}},this.onInputKeydown=e=>{const t=e.target;if(t===null||t.tagName!=="INPUT")return;const s=t,n=e;let i=se.None;switch(n.key){case Te.Enter:i=se.Normal;const l=n.repeat,a=n.timeStamp;let r=s.dataset.pressInfo;if(r===void 0)r=`1;${a}`,i=se.Normal;else if(!l){const c=r.split(";");if(c.length===2){let h=parseInt(c[0]),u=parseFloat(c[1]);a-u>=4*1e3?h=1:(h++,h>=3&&(h=0,i=se.Special)),r=`${h};${a}`}}s.dataset.pressInfo=r,n.preventDefault();break;case Te.Escape:s.value="元の値",s.blur();break;case Te.Tab:break;case Te.Process:return}const o=t.getAttribute("item-id");if(o){let l=this.getTopElement(t);if(l?.tagName==="TABLE"){const a=l.className,r=this.itemList.find(c=>c.props.className===a);if(r){const c=new ce;c.parentElem=t.parentElement,c.item=r,c.targetId=o,c.classify=this.supplessSelected(t.className),c.Keydown=n.key,c.KeyEnter=i,r.props.option.onSelect(c)}}}},this.onSelectChange=e=>{const t=e.target;if(t===null||t.tagName!=="SELECT")return;const s=t?.dataset.classify;let n=t.getAttribute("item-id");if(n===null){const i=this.getTopElement(t);i!==null&&(n=i.getAttribute("item-id"))}if(n){let i=this.itemList.find(o=>`${o.props.id}`===n);if(i===void 0&&(i=this.itemList.find(o=>`${s}${o.props.id}`===n)),i){if(i.props.option.onSelect){const o=new ce;o.parentElem=t.parentElement,o.item=i,o.targetId=n,o.classify=s===void 0?"?":s,o.selectedValue=t.value,i.props.option.onSelect(o)}this.selectedCh=i}}},this.itemList=new Array}add(e){this.itemList.push(e)}get DefaultBlueColor(){return"#86aef7e6"}get DefaultYellowColor(){return"#f7eb86e6"}get DefaultBorderColor(){return"#2c3e50ff"}MakeDefaultDialogParentCss(e,t,s,n=0){return`
.${e} {
  position: fixed;
  inset: auto; /* ブラウザの中央寄せを無効化 */
  top: ${s}px;
  left: ${t}px;
  transform: translateX(-50%);
  z-index: ${n}
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
font-size: 10px;
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
    gap: 8px;
}
.${this.defaultToolButtonsCssName} button {
    width: 120px; /* または flex:1 */
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
`.trim(),document.head.appendChild(s),!0}hideFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.add("hidden")}showFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.remove("hidden")}getFullScreenMsgElem(e){const t=document.getElementById(e);if(t){const s=t.querySelectorAll("p");return s!==null&&s.length>=1?s[0]:null}return null}initObserver(e,t){const s=document.getElementById(e);if(!s)return;const n=async l=>{await l.forEach(async a=>{if(a.isIntersecting){const r=a.target,c=this.isDemo&&!t.isMaterial(r.dataset.filename)?"demo.png":r.dataset.filename;if(console.log(`[${this.isDemo}] 見えた！:${r.dataset.filename}`),c&&r.src===""||r.src.startsWith(window.location.origin)){const h=await t.findNs(c);h===null||h===""?(this.observer.unobserve(r),console.log(`cannot set image : ${c}`)):await t.getImageUrlBy(c,h).then(u=>{u!==null?(r.src=u,this.observer.unobserve(r)):console.log(`pending set image : ${c}`)})}}})},i={root:s,rootMargin:"0px",threshold:.1};this.observer=new IntersectionObserver(n,i),s.querySelectorAll("img[data-filename]").forEach(l=>this.observer.observe(l)),console.log("[initObserver] enabled!")}get isDemo(){return window.EVONA_CONFIG.demo}get isScrolling(){return this._enableScrollEvt?!(this._scrollTimer!==null&&this._isScrolling):!1}enableScrollEvent(e){this._isScrolling=!1;const t=document.getElementById(e);return t?(this._enableScrollEvt=!0,t.addEventListener("scroll",()=>{this._isScrolling=!0,clearTimeout(this._scrollTimer),this._scrollTimer=setTimeout(()=>{this._scrollTimer=null,this._isScrolling=!1;const s=this.observer.takeRecords();console.log(`[enableScrollEvent] stopped ${s.length}`)},200)}),console.log("[enableScrollEvent] enabled!"),!0):!1}enableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(n=>{const i=n.querySelectorAll("img");i.length>=1&&(i[0],this.addButtonEvent(t,n));const o=n.querySelectorAll("span");o.length>=1&&o[0]?.dataset.readonly=="false"&&this.addButtonEvent(t,n);const l=n.querySelectorAll("select");l.length>=1&&(l[0],this.addSelectEvent(t,n));const a=n.querySelectorAll("table");a.length>=1&&(a[0],n.addEventListener("click",this.onButtonClicked),n.addEventListener("keydown",this.onInputKeydown))})}enableTableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(n=>{const i=n.querySelectorAll("table");i.length>=1&&(i[0],n.addEventListener("click",this.onButtonClicked),n.addEventListener("keydown",this.onInputKeydown),n.addEventListener("change",this.onSelectChange))})}disableTableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(n=>{const i=n.querySelectorAll("table");i.length>=1&&(i[0],n.removeEventListener("click",this.onButtonClicked),n.removeEventListener("keydown",this.onInputKeydown),n.removeEventListener("change",this.onSelectChange))})}addButtonEvent(e,t){t.getAttribute("item-id")&&t.addEventListener("click",this.onButtonClicked)}addInputEvent(e,t){t.getAttribute("item-id")&&t.addEventListener("keydown",this.onInputKeydown)}addSelectEvent(e,t){t.addEventListener("change",s=>{const n=s.target,i=n?.dataset.classify,o=t.getAttribute("item-id");if(o){let l=this.itemList.find(a=>`${a.props.id}`===o);if(l===void 0&&(l=this.itemList.find(a=>`${i}${a.props.id}`===o)),l){if(l.props.option.onSelect){const a=new ce;a.item=l,a.targetId=o,a.classify=i===void 0?"?":i,a.selectedValue=n.value,l.props.option.onSelect(a)}this.selectedCh=l}}})}supplessSelected(e){let t=e,s=e.indexOf(" selected");return s>=0&&(t=e.substring(0,s)),t}getTopElement(e){let t=e.parentElement;for(;t!==null;){if(t.tagName==="DIV"){t=t.parentElement;continue}if(t.tagName==="TD"){t=t.parentElement;continue}if(t.tagName==="TR"){t=t.parentElement;continue}if(t.tagName==="TBODY"){t=t.parentElement;continue}break}return t}GetRect(e){const t=e.getBoundingClientRect(),s=new qe;return s.left=`${t.left}`,s.top=`${t.top}`,s.width=`${t.width}`,s.height=`${t.height}`,s}EnableElem(e,t){e.ariaDisabled=t?"false":"true"}IsEnabledElem(e){return e.ariaDisabled===null?!0:e.ariaDisabled==="false"}GetIdByIndex(e){return this.itemList[e].props.id}UnselectAll(e){const t=`.${e}`;document.querySelectorAll(`${t}.selected`).forEach(s=>s.classList.remove("selected"))}SelectByID(e,t){const s=this.FindByID(e,t);if(s){s.classList.add("selected");const n=s.getAttribute("item-id");if(n){const i=this.itemList.find(o=>`${o.props.id}`===n);i&&(this.selectedCh=i)}return s}return null}FindDivByClassName(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.querySelectorAll("div");for(const l of o)if(l.className===t||l.className.startsWith(t))return l}return null}FindByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t)return i}return null}FindImgByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("img");return l.length>=1?l[0]:null}}return null}FindImgsByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("img");return l.length>=1?l:null}}return null}FindDivByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const l=i.querySelectorAll("div");return l.length>=1?l[0]:null}}return null}FindSelectByID(e,t,s){const n=`.${e}`,i=document.querySelectorAll(`${n}`);for(const o of i){const l=o.getAttribute("item-id");if(l&&l===t){const a=o.querySelectorAll("select");if(a.length>=1){for(const r of a)if(r?.dataset.classify===s)return r}return null}}return null}ReplaceImg(e,t,s){const n=this.FindImgByID(e,t);return n===null?null:(n.dataset.filename,n.src=s,n)}ReplaceDivToolTip(e,t,s){const n=this.FindDivByID(e,t);return n===null?null:(n.title=s,n)}ReplaceImgToolTip(e,t,s){const n=this.FindImgByID(e,t);return n===null?null:(n.title=s,n)}SetImgSrc(e,t){if(e===null)return null;e.dataset.filename,e.src=t}SetImgSize(e,t,s){if(e===null)return null;e.style.width=`${t}px`,e.style.height=`${s}px`}ReplaceComboItems(e,t,s){const n=this.FindSelectByID(e,t,s.classify);if(n===null)return null;n.querySelectorAll("option").length>=1&&(n.innerHTML="");const o=B.makeComboItemsHTML(s);return o!==""&&(n.innerHTML=o),n}setVisible(e,t){const s=document.getElementById(e);return s===null?null:(s.hidden=!t,!0)}copyCssToInlineStyle(e,t){for(const s of document.styleSheets){let n;try{n=s.cssRules}catch{continue}for(const i of n)if(i instanceof CSSStyleRule&&i.selectorText===e){const o=i.style;console.log(`[copyCssToInlineStyle] coping [${e}]`);for(let l=0;l<o.length;l++){const a=o[l],r=o.getPropertyValue(a);t.style.setProperty(a,r)}return}}}}const me={Hide:"Hide",CopyPaste:"CopyPaste"},ue={Hide:"Hide",MoveLowest:"MoveLowest"},de={Copy:"Copy",Paste:"Paste",Cancel:"Cancel"};class V{constructor(){this.title="",this.dlgName="",this.B2Type=me.Hide,this.B3Type=ue.MoveLowest,this.initLeft=0,this.initTop=0,this.cornerIndex=-1,this.mover=new Jt,this.moverOnMoveDone=async()=>{this.onMoveDone!==void 0&&(await this.onMoveDone(this.dlg),this.cornerIndex=0)},this.resizer=new Vt,this.resizerOnResizeDone=async(e,t)=>{this.onResizeDone!==void 0&&await this.onResizeDone(this.dlg,e,t)},this.isIPad=/iPad|Macintosh/.test(navigator.userAgent)&&"ontouchend"in document,this.isTouchDevice=()=>"ontouchstart"in window||navigator.maxTouchPoints>0}SetB2Type(e=me.CopyPaste,t){this.B2Type=e,this.onCopyPaste=t}SetB3Type(e=ue.MoveLowest){this.B3Type=e}NewDialog(e,t){this.dlgName=t;const s=document.createElement("dialog");s.id=t,s.className=t;const n=document.getElementById(e);return n.appendChild(s),this.dlgParent=n,this.dlg=s,s}SetContent(e,t,s=!0){const n=this.dlg,i=`<button class="${this.toolNameB0}" id="${this.toolNameB0}" title="DragMove">[＊]</button>`,o=`<button class="${this.toolNameB1}" id="${this.toolNameB1}" title="SideBy">[≫]</button>`;let l="";this.B2Type===me.CopyPaste&&(l=`<button class="${this.toolNameB2}" id="${this.toolNameB2}" title="Copy&Paste">[⇔]</button>`);let a="";this.B3Type===ue.MoveLowest&&(a=`<button class="${this.toolNameB3}" id="${this.toolNameB3}" title="MoveLowest">[_]</button>`);const r=`${i}${o}${l}${a}`;let c="";this.title!==""?c=`<div class="${this.titleName}">${this.title}${r}</div>`:c=`<div class="${this.titleName}">${r}</div>`;const h=document.createElement("div");h.innerHTML=c,n.innerHTML=t;const u=document.getElementById(e);u.hidden=s,u.appendChild(h),u.appendChild(n),this.applyCss()}EnableEventHandlers(){const e=this.dlgParent.style.left,t=this.dlgParent.style.top;this.initLeft=parseInt(e.substring(0,e.length-2)),this.initTop=parseInt(t.substring(0,t.length-2)),console.log(`[EnableEventHandlers] ${this.dlgParent.id}::(${e},${t})::(${this.initLeft},${this.initTop})`);const s=document.getElementById(`${this.toolNameB0}`);s!==null&&(this.mover.onMoveDone=this.moverOnMoveDone,this.mover.attach(s,this.dlgParent));const n=document.getElementById(`${this.toolNameB1}`);n!==null&&(n.onclick=async()=>{if(this.dlgParent===void 0)return;const i=window.innerWidth,o=window.innerHeight,l=this.dlgParent.offsetWidth/2,a=Math.max(this.dlgParent.offsetWidth,this.dlg.offsetWidth),r=this.dlgParent.offsetHeight+this.dlg.offsetHeight;switch(this.cornerIndex=(this.cornerIndex+1)%4,this.cornerIndex){case 0:this.dlgParent.style.left=`${l}px`,this.dlgParent.style.top="0px";break;case 1:this.dlgParent.style.left=`${i-a+l}px`,this.dlgParent.style.top="0px";break;case 2:this.dlgParent.style.left=`${i-a+l}px`,this.dlgParent.style.top=`${o-r}px`;break;case 3:this.dlgParent.style.left=`${l}px`,this.dlgParent.style.top=`${o-r}px`;break}}),this.B2Type===me.CopyPaste&&(document.getElementById(`${this.toolNameB2}`).onclick=async()=>{if(this.dlgParent===void 0||this.onCopyPaste===void 0)return;const i=this.dlgParent,o=i.querySelectorAll(`.${this.toolNameB2}`),l=o.length>=1?o[0]:null,a=new M;if(a.IsEnabledElem(l)===!1)return;const r=new Array,c=new Ue;c.key=de.Copy,c.text="クリップボードへコピー",r.push(c);const h=new Ue;h.key=de.Paste,h.text="クリップボードからペースト",r.push(h);const u=new Ue;u.key=de.Cancel,u.text="キャンセル",r.push(u);const p=new Ut;p.setChoiceItems(r),a.EnableElem(l,!1);const g=a.GetRect(i);a.GetRect(this.dlg);const L=a.GetRect(l),H=this.dlg.className;p.setListener(`${H}-choice`,H,`${H}-B2`),p.applyCss(),p.show(`${parseInt(L.left)-parseInt(g.left)}`,"0"),p.enableEvents(async U=>{console.log(`[onSelect] ${U.callerName} ${U.result}`),p.dispose(),this.onCopyPaste(this.dlg,U.result),a.EnableElem(l,!0)})}),this.B3Type===ue.MoveLowest&&(document.getElementById(`${this.toolNameB3}`).onclick=async()=>{if(this.dlgParent===void 0)return;new b().MoveLowestLayer(this.dlgParent)})}EnableResize(){if(this.isIPad&&this.isTouchDevice()){console.log("EVONA: Touch device detected. Priority given to flick scrolling.");return}const e=`<button class="${this.handleNameB0}" id="${this.handleNameB0}" title="Resize">[」]</button>`,t=document.createElement("div");t.className=this.handleName,t.id=this.handleName,t.innerHTML=`${e}`,this.dlg.appendChild(t);const s=document.getElementById(`${this.handleName}`);s!==null&&(s.style.position="absolute",s.style.left=`${this.dlg.clientWidth-s.clientWidth}px`,s.style.top=`${this.dlg.clientHeight-s.clientHeight}px`,this.resizer.onResizeDone=this.resizerOnResizeDone,this.resizer.attach(s,this.dlg))}static GetDialogInfo(e){const t=this.FindDialogParent(e);if(t===null)return null;const s=t.querySelector("dialog");if(s===null)return null;const n=new ae,i=s.clientWidth,o=s.clientHeight;return n.name=e,n.left=t.style.left,n.top=t.style.top,n.width=`${i}px`,n.height=`${o}px`,n}static SetDialogInfo(e){const t=this.FindDialogParent(e.name);if(t===null)return!1;const s=t.querySelector("dialog");return s===null?!1:(t.style.left=e.left,t.style.top=e.top,s.style.width=e.width,s.style.height=e.height,!0)}static FindDialogParent(e){const t=document.getElementById(e);return t??null}get titleName(){return`${this.dlgName}-dlg-title-00`}get toolNameB0(){return`${this.dlgName}-dlg-tool-b0`}get toolNameB1(){return`${this.dlgName}-dlg-tool-b1`}get toolNameB2(){return`${this.dlgName}-dlg-tool-b2`}get toolNameB3(){return`${this.dlgName}-dlg-tool-b3`}get handleName(){return`${this.dlgName}-dlg-handle-00`}get handleNameB0(){return`${this.dlgName}-dlg-handle-b0`}applyCss_old(){const e=document.createElement("style");e.textContent=`
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
`.trim(),document.head.appendChild(t)}}class ae{constructor(){this.name="",this.left="",this.top="",this.width="",this.height=""}copyTo(e){e.name=this.name,e.left=this.left,e.top=this.top,e.width=this.width,e.height=this.height}}class b{add(e){b.dlgElems.push(e)}AddDialogs(){b.dlgElems=new Array;const e=document.querySelectorAll("div");for(const t of e)t.style.zIndex!==""&&(parseInt(t.style.zIndex)>=b.ignoreIndex||t.querySelector("dialog")&&(console.log(`${t.id} added!`),this.add(t)))}AssignIndexies(){let e=b.dlgElems.length-1;for(const t of b.dlgElems)t.style.zIndex=`${e}`,e--}MoveLowestLayer(e){b.dlgElems.length;for(const t of b.dlgElems)if(t.id===e.id)t.style.zIndex="0";else{const s=t.style.zIndex;t.style.zIndex=`${parseInt(s)+1}`}}MoveHiestLayer(e){b.dlgElems.length;let t=-1;for(const s of b.dlgElems){const n=parseInt(s.style.zIndex);n>=b.ignoreIndex||n>t&&(t=n)}for(const s of b.dlgElems)if(s.id===e.id){s.style.zIndex=`${t}`;break}for(const s of b.dlgElems)if(s.id!==e.id){if(parseInt(s.style.zIndex)>=b.ignoreIndex)continue;t--,s.style.zIndex=`${t}`}}FindByName(e){const t=b.dlgElems.find(s=>s.id===e);return t||null}async ForEachAsync(e){for(const t of b.dlgElems)t.parentNode!==null&&await e(t.id)}ReOrder(){b.dlgElems.sort((e,t)=>{const s=e.style.zIndex,n=t.style.zIndex;if(s===""||n==="")throw new Error("z-index が未設定の要素が混入しています");return parseInt(t.style.zIndex)-parseInt(e.style.zIndex)})}async SaveSetting(e,t=!0){if(e!==null&&e.parentElement!==null){if(t&&this.FindByName(e.parentElement.className)===null){console.log(`${e.className} is out of managed dlg`);return}await this.initSetting(),await b.setingAccess.saveDialogPos(e)}}async LoadAllSetting(){await this.initSetting();for(const e of b.dlgElems){const t=e.querySelector("dialog");t!==null&&await b.setingAccess.loadDialogPos(t)}}async loadSetting(e){await this.initSetting(),e!==null&&await b.setingAccess.loadDialogPos(e)}async initSetting(){b.setingAccess===null&&(b.setingAccess=new dt,await b.setingAccess.init())}}b.ignoreIndex=1e3;b.setingAccess=null;class Jt{constructor(){this.isDragging=!1,this.startX=0,this.startY=0}attach(e,t){e.onpointerdown=s=>{e.setPointerCapture(s.pointerId),this.isDragging=!0,this.startX=s.clientX-t.offsetLeft,this.startY=s.clientY-t.offsetTop,e.style.cursor="grabbing"},e.onpointermove=s=>{if(!this.isDragging)return;const n=s.clientX-this.startX,i=s.clientY-this.startY;t.style.left=`${n}px`,t.style.top=`${i}px`,t.style.margin="0"},e.onpointerup=async s=>{this.isDragging=!1,e.releasePointerCapture(s.pointerId),e.style.cursor="grab",this.onMoveDone!==void 0&&await this.onMoveDone()}}}class Vt{constructor(){this.isDragging=!1,this.startX=0,this.startY=0,this.startW=0,this.startH=0,this.handleX=0,this.handleY=0}attach(e,t){e.onpointerdown=s=>{e.setPointerCapture(s.pointerId),this.isDragging=!0,this.startX=s.clientX,this.startY=s.clientY;const n=t.getBoundingClientRect();console.log(`[${t.className}] (${n.left},${n.top}) - (${n.width},${n.height})`),this.startW=n.width,this.startH=n.height,this.handleX=e.offsetLeft,this.handleY=e.offsetTop,e.style.cursor="grabbing"},e.onpointermove=s=>{if(!this.isDragging)return;const n=s.clientX-this.startX,i=s.clientY-this.startY;t.style.width=`${this.startW+n-e.clientWidth}px`,t.style.height=`${this.startH+i-e.clientHeight}px`,e.style.left=`${this.handleX+n}px`,e.style.top=`${this.handleY+i}px`,e.style.margin="0"},e.onpointerup=async s=>{if(this.isDragging=!1,e.releasePointerCapture(s.pointerId),e.style.cursor="grab",this.onResizeDone!==void 0){const n=t.getBoundingClientRect();await this.onResizeDone(`${n.width-this.startW}`,`${n.height-this.startH}`)}}}}const R={None:"None",CnsRed:"CnsRed",CnsBlue:"CnsBlue",CnsGreen:"CnsGreen",CnsYellow:"CnsYellow",CnsViolet:"CnsViolet",CnsWhite:"CnsWhite",CnsBlack:"CnsBlack"},$e={RlAttacker:"RlAttacker",RlHealer:"RlHealer",RlDebuffer:"RlDebuffer",RlBuffer:"RlBuffer"};class Z{get iconFileName(){return this.id===null&&!Number.isNaN(this.id)?`${this.name}_${this.idAsText}.png`:`${this.name}_${this.id}.png`}constructor(e=0,t=""){this.ns=R.None,this.id=0,this.name="",this.contentURL="",this.iconURL="",this.idAsText="",this.idAttributeForHTML="",this.id=e,this.name=t}parseFromImgName(e){let t=e.indexOf("_");if(t>=0){const s=e.substring(0,t);let n=e.substring(t+1);if(t=n.indexOf("."),t>=0)return n=n.substring(0,t),this.id=Number.parseInt(n),this.name=s,this.idAsText=Number.isNaN(this.id)?n:"",!0}return!1}}class qt{constructor(){this.itemName="",this.chNames=new Array,this.index=-1}reset(){this.itemName="",this.chNames=new Array,this.index=-1,this.onScroll=null}toCombo(e,t,s){this.reset();const n=`.${e}`,i=document.querySelectorAll(`${n} div[title*="${s}"]`);let o=-1,l="";for(const r of i){const c=r;console.log(c.title),o++;const h=c.title.trim(),u=h,g=`
 <option value="${h}"${o===0?" selected":""}>${u}</option>
`.trim();l+=g,this.chNames.push(u)}if(o===-1)return null;const a=document.createElement("select");return a.id=t,a.className=t,a.innerHTML=l,this.itemName=e,a}addEvent(e,t){e.addEventListener("change",s=>{const i=s.target.value;this.chNames.find(l=>l===i)&&this.scrollAction(i)}),this.onScroll=t}findFirst(){return this.chNames.length===0?!1:(this.index=0,this.scrollAction(this.chNames[this.index]),!0)}scroll(e){const t=`.${this.itemName}`,s=document.querySelector(`${t} div[title="${e}"]`);if(s===null)return null;const n=s.closest(t);return n===null?null:(n.scrollIntoView({behavior:"smooth",block:"center"}),s)}scrollAction(e){const t=this.scroll(e);t&&this.onScroll!==null&&this.onScroll(t)}}class pe{constructor(){this.uiInfo=new ae,this.charFinder=new qt,this.parentName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new b().SaveSetting(e)}}MakeList(){}async LoadList(e){const n=(await new fe().loadJson(e)).map(o=>Object.assign(new Z,o)),i=new pe;return i.chList=n,this.uiInfo.copyTo(i.uiInfo),i}findByNs(e){return e===R.None?void 0:this.chList.filter(s=>s.ns===e)}async toHTML(e){if(!this.chList)return"";this.htmlMaker=new M;let t=0;for(const s of this.chList){t++;const n=`chuid${t}`;s.idAttributeForHTML=n;const i="",o=new Xe;o.imgSrc=i,o.imgFile=s.iconFileName;const l=new B;l.props.name=this.itemCssClassName(),l.props.id=n,l.props.className=this.imgCssClassName(),l.props.option.setImg(o),l.props.option.toolTip=s.name,l.props.option.onSelect=a=>{this.setSelectedItem(a.item.props.id)},this.htmlMaker.add(l)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createSelectorBox(e,t,s){this.parentName=t;const n=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="${this.charOpenUrlCssClassName()}">URL</button>
<button id="char-dlg-close">閉じる</button>
`),i=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${s}
    <label id="char-dlg-chinfo">未選択</label>
    <input type="text" id="${this.charSeachInputCssClassName()}" placeholder="キャラ名検索...">
    ${n}
</div>`,o=new V;o.title="<"+e+">";const l=o.NewDialog(t,this.dlgCssClassName());return o.SetContent(t,i),this.applyCss(),o.EnableEventHandlers(),o.onMoveDone=this.moverOnMoveDone,l}addEventHandlers(e){document.getElementById(this.charSeachInputCssClassName()).oninput=t=>{if(t!==null&&t.target!==null){const s=t.target;console.log(s.value);const n=s.value,i=this.charSeachComboCssClassName(),o=document.getElementById(i);o!==null&&o.parentNode?.removeChild(o);const l=this.charFinder.toCombo(this.itemCssClassName(),i,n);if(l!==null){const a=document.getElementById(this.dlgContentCssClassName());a!==null&&(a.appendChild(l),this.charFinder.addEvent(l,r=>{const h=r.parentElement.getAttribute("item-id");this.htmlMaker.SelectByID(this.itemCssClassName(),h)}),this.charFinder.findFirst())}}},document.getElementById(this.charOpenUrlCssClassName()).onclick=async()=>{if(this.selectedCh===void 0)return;const t=this.chList.find(s=>this.selectedCh.idAttributeForHTML===s.idAttributeForHTML);if(t){this.charOpenUrlCssClassName();const s=new ne;if(s.setParent(this.dlgCssClassName()),s.setYesNo(),await s.showWait(`${t.name} をブラウザで開いてよろしいですか？`)===N.Yes){const i=t.contentURL;window.open(i,"_blank")}}},document.getElementById("char-dlg-close").onclick=()=>{document.getElementById(this.parentName).hidden=!0}}addItemEventHandlers(){const e=this.htmlMaker.GetIdByIndex(0);this.htmlMaker.SelectByID(this.itemCssClassName(),e),this.htmlMaker.enableEvents(this.itemCssClassName()),this.setSelectedItem(e)}setSelectedItem(e){const t=this.chList.find(s=>e===s.idAttributeForHTML);t&&(document.getElementById("char-dlg-chinfo").textContent=t.name,this.selectedCh=t)}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}itemCssClassName(){return"char-item"}imgCssClassName(){return"base"}listCssClassName(){return"char-list"}dlgContentCssClassName(){return"char-dlg-content"}dlgCssClassName(){return"char-dlg"}charSeachInputCssClassName(){return"char-search-input"}charSeachComboCssClassName(){return"char-search-combo"}charOpenUrlCssClassName(){return"char-open-url"}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=parseInt(this.uiInfo.left),i=parseInt(this.uiInfo.top),o=document.createElement("style");o.textContent=`
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
`.trim(),document.head.appendChild(o);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}}class X{constructor(){this.ns=R.None,this.id=0,this.name="",this.contentURL="",this.iconURL=""}static toJsonText(e){const t=X.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new X;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}static fromJsonInst(e){const t=new Z;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}}const C={pqStatusHP:"pqStatusHP",pqStatusATK:"pqStatusATK",pqStatusREC:"pqStatusREC",pqTokkunHP:"pqTokkunHP",pqTokkunATK:"pqTokkunATK",pqTokkunREC:"pqTokkunREC",pqTokuSp1:"pqTokuSp1",pqTokuSp2:"pqTokuSp2",mmAbilitySTR:"mmAbilitySTR",mmStatusFGT:"mmStatusFGT",mmStatusATK:"mmStatusATK",mmStatusPDF:"mmStatusPDF",mmStatusACC:"mmStatusACC",mmStatusEVA:"mmStatusEVA",mmStatusCRI:"mmStatusCRI",mmStatusMDF:"mmStatusMDF",mmStatusHP:"mmStatusHP",mmStatusCRD:"mmStatusCRD",mmStatusDEF:"mmStatusDEF",mmStatusSPD:"mmStatusSPD",mmAbilityDEX:"mmAbilityDEX",mmAbilityMGC:"mmAbilityMGC",mmAbilityDUR:"mmAbilityDUR",mmRole:"mmRole"};class Le{constructor(){this.title="",this.key="",this.selectionPair=[],this.selectedVal="",this.initScoreVal=0,this.mulScoreVal=0,this.available=!1}get stdScore(){const e=this.selectedVal.length>=1?this.selectedVal:"1",t=parseInt(e);return this.initScoreVal+t*this.mulScoreVal}get selectedText(){if(this.selectionPair.length===0||this.selectedVal==="")return;const e=parseInt(this.selectedVal)-1;if(e<0)return;const t=this.selectionPair[e].split("/");if(t.length===2)return t[0]}}class O{constructor(){this.items=new Array,this.allow=new Map,this.roleText="",this.comboText=""}makeDemoLvText(e){let t="";for(let s=1;s<=100;s++)t+=`"${e}${s}/${s}",`;return t=t.substring(0,t.length-1),t}load(){const e=this.makeDemoLvText("Lv"),t=this.makeDemoLvText("Lv"),s=this.makeDemoLvText(""),n=`
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
`,o=JSON.parse(n).map(l=>Object.assign(new Le,l));this.items=o}save(){console.log(JSON.stringify(this,null,2))}clone(){const e=new O;for(const t of this.items){const s=JSON.stringify(t,null,2),n=JSON.parse(s);e.items.push(n)}return e}static copy(e,t,s=!1){for(let n=0;n<e.items.length;n++){const i=e.items[n],o=s?new Le:t.items[n];o.title=i.title,o.key=i.key,o.selectionPair=i.selectionPair,o.selectedVal=i.selectedVal,o.initScoreVal=i.initScoreVal,o.mulScoreVal=i.mulScoreVal,o.available=i.available,s&&t.items.push(o)}}set(e,t){const s=this.items.find(n=>n.key===e);return s?(s.selectedVal=t,!0):!1}get stdScore(){let e=0;for(const t of this.items)t.available&&(e+=t.stdScore);return e}get allAvailable(){for(const e of this.items)if(e.available===!1)return!1;return!0}static calcScore(e,t){const s=t.split("+");let n=0;for(const i of s){const o=i.trim();if(o.endsWith("()")){const l=o.slice(0,-2);typeof e[l]=="function"?n+=e[l]():console.warn(`関数 '${l}' が存在しません`)}else{const l=e[o];typeof l=="number"?n+=l:Array.isArray(l)?n+=l.reduce((a,r)=>a+r,0):console.warn(`プロパティ '${o}' が数値ではありません`)}}return n}static calcScoreAdvanced(e,t){const s=Object.keys(e),n=s.map(o=>e[o]);return new Function(...s,`return ${t};`)(...n)}toInst(e){return(n=>{const i=class{constructor(){n.forEach((o,l)=>{this[l]=o})}};return new i})(e)}}class Ae{constructor(){this.fileNames=null,this.minMap=new Map,this.maxMap=new Map,this.rangeMap=new Map,this.digLenMax=0,this.nMul=0,this.table=[{key:C.pqStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:C.pqStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:C.pqStatusREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:C.pqTokkunHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:C.pqTokkunATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:C.pqTokkunREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:C.pqTokuSp1,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:C.pqTokuSp2,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:C.mmStatusFGT,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:C.mmStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:C.mmStatusPDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:C.mmStatusACC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:C.mmStatusEVA,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:C.mmStatusCRI,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:C.mmStatusMDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:C.mmStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:C.mmStatusCRD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:C.mmStatusDEF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:C.mmStatusSPD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:C.mmAbilityDEX,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:C.mmAbilityMGC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:C.mmAbilityDUR,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:C.mmRole,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}}],this.rolePriolity=[{roleKey:$e.RlAttacker,priority:Se.priHi,statusKey:[C.mmAbilitySTR,C.mmStatusATK,C.mmStatusSPD]},{roleKey:$e.RlHealer,priority:Se.priHi,statusKey:[C.mmAbilityMGC,C.mmStatusMDF,C.mmStatusHP]},{roleKey:$e.RlDebuffer,priority:Se.priHi,statusKey:[C.mmAbilityDEX,C.mmStatusACC,C.mmStatusHP]},{roleKey:$e.RlBuffer,priority:Se.priHi,statusKey:[C.mmStatusPDF,C.mmStatusHP,C.mmStatusDEF]}]}async loadDB(e){const t=new fe,s=await t.loadBinFile(e);if(t.isWebRunning)this.zip=await window.JSZip.loadAsync(s);else{const{loadZipNode:n}=await import(t.nodeToolsImportFilename);this.zip=await n(s)}return this.fileNames=Object.keys(this.zip.files),!0}async enumStatus(e){if(this.fileNames!==null)for(const t of this.fileNames){const s=await this.getFileContent(t);if(s===null||e===void 0)continue;if(!e(t,s))break}}async debugCombo(){await this.enumStatus((e,t)=>{for(const s of t)s.useCombo&&console.log(`${e}:[${s.value}]`);return!0})}async getMinMax(){await this.enumStatus((e,t)=>{for(const s of t){if(s.useCombo)continue;let n=parseInt(this.itemValue(s));if(!this.minMap.has(s.key))this.minMap.set(s.key,n);else{const i=this.minMap.get(s.key);i===void 0?this.minMap.set(s.key,n):i>n&&this.minMap.set(s.key,n)}if(!this.maxMap.has(s.key))this.maxMap.set(s.key,n);else{const i=this.maxMap.get(s.key);i===void 0?this.maxMap.set(s.key,n):i<n&&this.maxMap.set(s.key,n)}}return!0})}async getRanges(){await this.getMinMax(),this.digLenMax=0;for(const[e,t]of this.minMap){const s=t,n=this.maxMap.get(e);let i=0;if(s!==void 0&&n!==void 0&&(i=n-s),i<=0&&(i=1),this.rangeMap.set(e,i),n!==void 0){const o=Math.log10(n);o>this.digLenMax&&(this.digLenMax=o)}}this.nMul=this.digLenMax>0?Math.pow(10,Math.ceil(this.digLenMax)):1;for(const[e,t]of this.minMap)console.log(`[${e}] = ${this.minMap.get(e)},${this.maxMap.get(e)} ${this.rangeMap.get(e)}`);console.log(`digLenMax=[${this.digLenMax}] nMul=[${this.nMul}]`)}stdBy(e,t){let s,n;if(this.rangeMap.has(e)&&(s=this.rangeMap.get(e)),this.minMap.has(e)&&(n=this.minMap.get(e)),s===void 0||n===void 0||this.isNumeric(t)===!1)return null;s<=0&&(s=1);const i=(parseInt(t)-n)*s;return this.nMul*i}getFilename(e){let t=null;for(let s of this.fileNames){let n=s.indexOf("_");if(n>=0){let i=s.substring(n+1);if(n=i.indexOf("."),n>=0&&(i=i.substring(0,n)),i===e){t=s;break}}}return t}async getFileContent(e){if(e===null)return null;const t=this.zip.file(e);if(t){const s=await t.async("string");return JSON.parse(s)}return null}async getStatus(e){this.digLenMax===0&&await this.getRanges();const t=this.getFilename(e);if(t===null)return null;const s=await this.getFileContent(t);if(s===null)return null;let n=null;for(const o of s)if(!o.useCombo){for(const l of this.rolePriolity)if(l.statusKey.find(r=>r===o.key)){n=l,console.log(`find role : ${n.roleKey}`);break}if(n!==null)break}const i=new O;if(n!==null)for(const o of s){if(o.useCombo)continue;if(n.statusKey.find(a=>a===o.key)){const a=this.table.find(r=>r.key===o.key);if(a){const r=a.scoreFunc(o.key,this.itemValue(o));r.title=o.disp,r.key=o.key,r.selectedVal="1",i.items.push(r)}}}else for(const o of s){if(o.useCombo)continue;const l=this.table.find(a=>a.key===o.key);if(l){const a=l.scoreFunc(o.key,this.itemValue(o));a.title=o.disp,a.key=o.key,a.selectedVal="1",i.items.push(a)}}return i}async getComboKeywords(e){let t=0;const s=new Map,n=new Map;for(const i of e){const o=this.getFilename(i);if(o===null)return null;const l=await this.getFileContent(o);if(l===null)return null;const a=new Map;for(const r of l){if(!r.useCombo)continue;const c=r.value.split(",");for(const h of c)if(a.has(h)===!1)a.set(h,1);else{const u=a.get(h);a.set(h,u+1)}}if(a.size===0){t=0,n.clear();continue}for(const[r,c]of a)if(n.has(r)===!1)n.set(r,c);else{const h=n.get(r);n.set(r,h+c)}if(t++,!(t<=2))for(const[r,c]of n)c>=3&&s.set(r,c)}}async debugCheckCombo(){const e=new Array;e.push("119599"),e.push("119603"),e.push("119624"),await this.getComboKeywords(e)}isNumeric(e){return e.trim()===""?!1:!isNaN(Number(e))}itemValue(e){return e.converted===""?e.value:e.converted}toScoreMaxNum(e,t){return this.isNumeric(t)===!1?null:Ae.useStdConv?this.stdBy(e,t):t!==""?parseInt(t):1}scoreFunc(e,t){const s=new Le;if(e===null)return s;s.mulScoreVal=e/t;for(let n=1;n<=t;n++){const i=Math.ceil(e/t*n);s.selectionPair.push(`Lv${n}/${n}`),n===1&&(s.initScoreVal=i)}return s.available=!0,s}scoreFuncOld(e,t){const s=new Le;if(this.isNumeric(e)===!1)return s;let n=e!==""?parseInt(e):1;s.mulScoreVal=n/t;for(let i=1;i<=t;i++){const o=Math.ceil(n/t*i);s.selectionPair.push(`Lv${i}/${i}`),i===1&&(s.initScoreVal=o)}return s.available=!0,s}puyoToku(e){return e==="enable"?10:1}}Ae.useStdConv=!1;const Se={priHi:0},Y={None:"None",UI:"UI",Menu:"Menu"};class te{constructor(){this.dockType=Y.None,this.iconFileName="",this.toolTip="",this.idAttributeForHTML=""}get labelWrap(){let e=this.toolTip,t=this.toolTip.length;if(t>3){const s=t%2===0?t/2:t/2+1,n=e.substring(0,s),i=e.substring(s);e=n+`
`+i}return e}setAsDlg(e,t){this.dockType=Y.UI,this.dlg=e,this.toolTip=t}setAsMenu(e){this.dockType=Y.Menu,this.toolTip=e}get isUIType(){return this.dockType==Y.UI}get isMenuType(){return this.dockType==Y.Menu}ToggleStatus(){this.dlg===void 0||this.dlg===null||(this.dlg.hidden=!this.dlg.hidden)}}class Qe{constructor(){this.items=new Array,this.parentName="",this.listName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new b().SaveSetting(e,!1)}}add(e){return e.dockType==Y.UI&&(e.dlgParent=e.dlg.parentElement),this.items.push(e),!0}async toHTML(e,t){if(!this.items)return"";this.listName=e,this.htmlMaker=new M;let s=0;for(const n of this.items){s++;const i=`dock-uid${s}`;n.idAttributeForHTML=i;const o=new B,l=n.labelWrap;o.props.name=this.itemCssClassName(),o.props.id=i,o.props.className=this.imgCssClassName(),o.props.option.toolTip=n.toolTip,o.props.option.setLabel(l,!0),o.props.option.onSelect=a=>{const r=this.items.find(c=>a.item.props.id===c.idAttributeForHTML);if(r&&(this.selectedItem=r,this.onApply!==void 0)){const c=new jt;c.item=this.selectedItem,this.onApply(c)}},this.htmlMaker.add(o)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createDockBox(e,t,s=!0){this.parentName=e;const n=`<div class="${this.parentName}-dlg-content">
    ${t}
</div>`,i=new V;i.SetB3Type(ue.Hide);const o=i.NewDialog(e,this.dlgCssClassName());return i.SetContent(e,n,s),this.applyCss(),i.EnableEventHandlers(),i.onMoveDone=this.moverOnMoveDone,o}addItemClickHandlers(e){this.onApply=e,this.htmlMaker.SelectByID(this.itemCssClassName(),this.htmlMaker.GetIdByIndex(0)),this.htmlMaker.enableEvents(this.itemCssClassName())}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=48,i=this.items.length,o=document.createElement("style");o.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,60,10,b.ignoreIndex)}
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
`.trim(),document.head.appendChild(o);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}listCssClassName(){return`${this.listName}-list`}dlgCssClassName(){return`${this.parentName}-dlg`}static GetDialogInfo(e){return V.GetDialogInfo(e)}static SetDialogInfo(e){return V.SetDialogInfo(e)}async InitZOrder(e){await e.ForEachAsync(t=>{const s=Qe.GetDialogInfo(t),n=e.FindByName(t);return s!==null&&(s.zindex=n!==null?n.style.zIndex:""),console.log(s),!0})}}class jt{constructor(){this.cancel=!1}}class Re{constructor(){this.dockType=Y.None,this.iconFileName="",this.toolTip="",this.dlgName="",this.hidden=!1,this.zIndex="",this.topPx="",this.leftPx=""}static toJsonText(e){const t=Re.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new Re;return t.dockType=e.dockType,t.iconFileName=e.iconFileName,t.toolTip=e.toolTip,e.isUIType&&(t.dlgName=e.dlgParent.id,t.hidden=typeof e.dlgParent.hidden=="string"?!1:e.dlgParent.hidden,t.zIndex=e.dlgParent.style.zIndex,t.leftPx=e.dlgParent.style.left,t.topPx=e.dlgParent.style.top),t}}class He{static toJsonText(e){const t=He.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new He;t.items=new Array;for(const s of e.items)t.items.push(Re.toJsonInst(s));return t}restore(e,t){for(const s of this.items){const n=e.items.find(i=>i.dlg.id===s.dlgName);n&&(n.dockType=s.dockType,n.iconFileName=s.iconFileName,n.toolTip=s.toolTip,n.isUIType&&(n.dlgParent.hidden=typeof s.hidden=="string"?!1:s.hidden,n.dlgParent.style.zIndex=s.zIndex,n.dlgParent.style.left=s.leftPx,n.dlgParent.style.top=s.topPx))}t.ReOrder()}}class Oe{constructor(){this.chUuid="",this.ch=new Z}}class Gt{constructor(){this.chList=new Array,this.uiInfo=new ae,this.parentName="",this.editingRowIndex=-1,this.scoreGrid=new Pt,this.onSelect=async e=>{console.log(`classify = ${e.classify} selectedValue = ${e.selectedValue} targetId = ${e.targetId}`);const t=this.editingCh;if(t===null)return;const n=t.scoreSet.items.find(i=>i.key===e.classify);n&&(n.selectedVal=e.selectedValue)},this.savedScoreSet=new O,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new b().SaveSetting(e)}}async load(){const t=await(await oe()).get(ie.CharSummaryAction);if(t===null)return;const s=new Map;for(const n of t){const i=Ee.fromJsonText(n);if(console.log(i.logType),console.log(i.ch),console.log(i.scoreSet),i.chUuid==="")continue;let o=!1,l=!1;switch(i.logType){case j.None:break;case j.Add:o=!0;break;case j.Update:s.has(i.chUuid)?o=!0:o=!1;break;case j.Delete:o=!0,l=!0;break}o&&(l?s.has(i.chUuid)&&s.delete(i.chUuid):(s.has(i.chUuid)&&s.delete(i.chUuid),s.set(i.chUuid,n)))}this.chList=new Array;for(const[n,i]of s){const o=Ee.fromJsonText(i),l=new Z;l.ns=o.ch.ns,l.id=o.ch.id,l.name=o.ch.name,l.contentURL=o.ch.contentURL,l.iconURL=o.ch.iconURL,l.idAsText=o.ch.idAsText,l.idAttributeForHTML=o.ch.idAttributeForHTML;const a=new O;O.copy(o.scoreSet,a,!0);const r=new Oe;r.chUuid=o.chUuid,r.ch=l,r.scoreSet=a,this.chList.push(r)}}async updateCharInfos(e){let t=this.table.firstRowIndex-1;for(const s of this.chList){t++;const n=await e.getImageUrlBy(s.ch.iconFileName,s.ch.ns);n!==null&&this.table.updateRowImage(t,n),this.updateChScoreInfo(t)}this.table.redimAllRows(),t=this.table.firstRowIndex,this.table.selectRow(t),this.table.scroll(t)}setRow(e,t,s){let n=0;const i=new Xe;i.imgFile=e.iconFileName,s.getCell(n,t).typeInfo.setImg(i),s.getCell(n,t).className=this.itemIconCssClassName();const o=`${e.name} Lv.1 [ATK:1]`;s.getCell(n,t,1).typeInfo.setLabel(o,!1),s.getCell(n,t,1).className=this.itemStatusCssClassName(),n++,s.getCell(n,t).typeInfo.setButton("更新"),s.getCell(n,t).className=this.itemUpdateCssClassName(),s.getCell(n,t).typeInfo.using.itemId=t,s.getCell(n,t,1).typeInfo.setButton("削除"),s.getCell(n,t,1).className=this.itemDeleteCssClassName(),s.getCell(n,t,1).typeInfo.using.itemId=t}toHTML(){if(!this.chList)return"";const e=new q;if(this.chList.length>=1)e.makeDim(2,this.chList.length),e.growCell(0,2),e.growCell(1,2),this.chList.forEach((i,o)=>{const l=i.ch;this.setRow(l,o,e)}),e.makeRowTemplate(this.tableRowCssClassName()),this.table=e;else{e.makeDim(2,1),e.growCell(0,2),e.growCell(1,2);const i=new Z;this.setRow(i,0,e),e.makeRowTemplate(this.tableRowCssClassName()),e.clearRows(),this.table=e}const t=this.tableCssClassName(),s=this.table.ToScrollHTML(t,"");this.htmlMaker=new M;const n=new B;return n.props.name="",n.props.id="0",n.props.className=t,n.props.option.setTable(s),n.props.option.onSelect=async i=>{switch(console.log(`classify = ${i.classify} targetId = ${i.targetId}`),i.classify){case this.itemUpdateCssClassName():await this.onItemEdit(i);break;case this.itemDeleteCssClassName():await this.onItemDelete(i);break}},this.htmlMaker.add(n),this.htmlMaker.ToHTML()}createSummaryBox(e,t,s){this.parentName=t;let n=`
<button id="${this.itemAddCssClassName()}">キャラ追加</button>
`.trim();const i=this.htmlMaker.MakeDefaultToolButtonsHTML(n),o=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${i}
    ${s}
</div>`,l=new V;l.title="<"+e+">";const a=l.NewDialog(t,this.dlgCssClassName());return l.SetContent(t,o),this.applyCss(),l.EnableEventHandlers(),l.onMoveDone=this.moverOnMoveDone,a}addEventHandlers(e,t){this.onAdd=t,document.getElementById(`${this.itemAddCssClassName()}`).onclick=async()=>{if(this.onAdd===void 0)return;const s=new yt;await this.onAdd(s),s.cancel!==!0&&await this.onItemAdd(s)}}createScoreGrid(e){const t=this.dlgContentCssClassName(),s="headerName",n="footerName",i="gridName",o="gridRowName",l="keyClassName",a="valueClassName",r=this.scoreGrid.makePair();for(const c of e.items){const h=c.title,u=c.title,p=this.scoreGrid.makeKeyCell(h,l,u),g=new ve;g.selectionPair=c.selectionPair,g.selectedItem=c.selectedVal,g.classify=c.key;const L=new je;L.makeItems(),L.items[0].typeInfo.setCombo(g),L.items[0].className=a,r.set(p,L)}if(this.scoreGrid.setPair(r),this.scoreGrid.setListener(i,o,t,s,n),this.scoreGrid.enableEvents(this.onSelect),this.scoreGrid.footerElem!==null){let c=`
<button id="${n}-okBtn">OK</button>
<button id="${n}-canBtn">CANCEL</button>
`.trim();this.scoreGrid.footerElem.innerHTML=c,document.getElementById(`${n}-okBtn`).onclick=async()=>{this.updateChScoreInfo(this.editingRowIndex);const h=this.editingCh;h!==null&&(h.scoreSet,this.addActionLog(h,j.Update),this.removeScoreGrid())},document.getElementById(`${n}-canBtn`).onclick=async()=>{const h=this.editingCh;if(h===null)return;const u=h.scoreSet;O.copy(this.savedScoreSet,u),this.removeScoreGrid()}}}removeScoreGrid(){if(this.scoreGrid.headerElem!==null){const e=this.editingRowIndex,t=this.table.getRowElem(e),s=this.table.getCellElems(t),n=this.scoreGrid.headerElem.children[0];s[0][0].appendChild(n)}this.scoreGrid!==null&&(this.scoreGrid.dispose(),this.htmlMaker.setVisible(this.itemAddCssClassName(),!0),this.table.setVisible(!0))}get editingCh(){const e=this.editingRowIndex;return e<this.table.firstRowIndex?null:this.chList[e-this.table.firstRowIndex]}async onItemAdd(e){const t=new ne;t.setParent(this.dlgCssClassName());let s=N.None;if(t.setYesNo(),s=await t.showWait(`${e.selectCh.name} を追加しますか？`),s===N.No)return;const n=this.tableRowCssClassName(),i=this.table.addRow(n);if(i<this.table.firstRowIndex)return;this.table.selectRow(i),this.table.updateRowImage(i,e.selectedImg),this.table.scroll(i);const o=new Oe;o.chUuid=Dt(),o.ch=e.selectCh,o.scoreSet=e.scoreSet,this.chList.push(o),this.updateChScoreInfo(i),this.addActionLog(o,j.Add)}async onItemEdit(e){const t=parseInt(e.targetId);if(t<this.table.firstRowIndex)return;this.editingRowIndex=t;const s=this.chList[t-this.table.firstRowIndex].scoreSet;this.savedScoreSet=new O,O.copy(s,this.savedScoreSet,!0),this.createScoreGrid(s),this.htmlMaker.setVisible(this.itemAddCssClassName(),!1),this.table.setVisible(!1);const n=this.table.getRowElem(t),o=this.table.getCellElems(n)[0][0].children[0];this.scoreGrid.headerElem?.appendChild(o)}async onItemDelete(e){const t=parseInt(e.targetId);if(t<this.table.firstRowIndex)return;const s=this.chList[t-this.table.firstRowIndex],n=new ne;n.setParent(this.dlgCssClassName());let i=N.None;switch(n.setYesNo(),i=await n.showWait(`${s.ch.name} を削除しますか？`),i){case N.Yes:break;case N.No:return;case N.Cancel:return}this.addActionLog(s,j.Delete),t>=1&&(this.table.deleteRow(t),this.table.redimAllRows(),this.chList.splice(t-this.table.firstRowIndex,1))}async addActionLog(e,t){const s=new Ee;s.logType=t,s.chUuid=e.chUuid,s.ch=e.ch,s.scoreSet=e.scoreSet;const n=Ee.toJsonText(s);await(await oe()).put(ie.CharSummaryAction,n)}updateChScoreInfo(e){const t=this.table.getRowElem(e);if(t===null)return;const s=this.table.getCellElems(t);if(s===null)return;const n=e-this.table.firstRowIndex,i=this.chList[n];let o="";for(const l of i.scoreSet.items){let a=l.selectedText;a=a===void 0?"*bug*":a;const r=`${l.title}:${a}`;o!==""&&(o=`${o}
`),o=`${o}${r}`}this.table.updateText(s[0][1],o)}addItemEventHandlers(){this.htmlMaker.enableEvents(this.tableCssClassName())}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}async charStock(e){let t=this.table.getSelectedRow();const s=t!==this.table.invalidRowIndex,n=new ne;n.setParent(this.dlgCssClassName());let i=N.None;s?(n.setYesNoCancel(),i=await n.showWait(`${e.selectCh.name} を更新しますか？`)):(n.setYesNo(),i=await n.showWait(`${e.selectCh.name} を追加しますか？`));let o=!1,l=!1;switch(i){case N.Yes:s?(o=!1,l=!0):(o=!0,l=!1);break;case N.No:s?(o=!0,l=!1):(o=!1,l=!1);break;case N.Cancel:return}let a=null;if(o){const r=this.tableRowCssClassName(),c=this.table.addRow(r);if(c>=0){const h=new Oe;h.ch=e.selectCh,h.scoreSet=e.scoreSet,this.chList.push(h),t=c,this.table.selectRow(c),this.table.updateRowImage(c,e.selectedImg),this.table.scroll(c),a=this.table.getRowElem(c)}}if(l){const r=t-this.table.firstRowIndex,c=this.chList[r];c.scoreSet=e.scoreSet,this.tableRowCssClassName();const h=t;this.table.scroll(h),a=this.table.getRowElem(h)}if(a!==null){const r=this.table.getCellElems(a);if(r){const c=t-this.table.firstRowIndex,h=this.chList[c];let u="";for(const p of h.scoreSet.items){let g=p.selectedText;g=g===void 0?"*bug*":g;const L=`${p.title}:${g}`;u!==""&&(u=`${u}
`),u=`${u}${L}`}this.table.updateText(r[0][1],u)}}}itemIconCssClassName(){return`${this.tableCssClassName()}-icon`}itemStatusCssClassName(){return`${this.tableCssClassName()}-status`}itemAddCssClassName(){return`${this.tableCssClassName()}-add`}itemUpdateCssClassName(){return`${this.tableCssClassName()}-update`}itemDeleteCssClassName(){return`${this.tableCssClassName()}-delete`}tableRowCssClassName(){return"char-summary-table-row"}tableCssClassName(){return"char-summary-table"}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return"char-summary-dlg"}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=document.createElement("style");s.textContent=`
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


/* テーブル */
.gridName {
    width: 100%;                /* テーブル全体を親要素いっぱいに広げる */
    table-layout: fixed;        /* これが重要！これで td の％指定が絶対になります */
}
.gridName tr {
    background-color: #f5f5dc; /* ベージュ */
}
/* 左側のラベルセル (Key) */
.keyClassName {
    background-color: #f5f5dc; /* ベージュ */
    color: #4b0082;           /* インディゴ/紫 */
    font-weight: bold;
    font-size: 0.9em;
    text-align: right;
    padding-right: 8px;
    border-right: 1px solid #ddd; /* 境界線 */
    width: 100%;               /* 幅を固定するとGridらしくなります */
/* 内容が溢れても折り返さない、あるいは省略する設定 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* 右側の入力セル (Value) */
.valueClassName {
    background-color: #f5f5dc;
    padding: 0;           /* 1. 余白をゼロにして、コンボを端まで広げる */
    width: 100%;
    border: none;
    vertical-align: middle; /* 上下の位置を中央に */
    padding-top: 4px; /* 下にパディングを入れて、文字を上に押し上げる */
    padding-bottom: 4px; /* 下にパディングを入れて、文字を上に押し上げる */
}

.valueClassName select {
    width: 100%;          /* 2. 95% から 100% に変更 */
    height: 100%;         /* セルの高さに合わせる（必要に応じて） */
    border: none;         /* 3. 枠線を消す、あるいは内側に寄せる */
    border-left: 1px solid #ddd; /* 必要なら左側だけに境界線を入れる */
    border-radius: 4px;        /* 4pxのこだわり！ */
    background-color: #fff;
    color: #333;
    font-size: 0.9em;
    cursor: pointer;
    padding: 4px 8px;     /* 内側に少し余白を持たせて文字を見やすく */
    box-sizing: border-box; /* width: 100% に padding を含める設定 */
}

.valueClassName select:focus {
    outline: none;
    box-shadow: 0 0 3px #4b0082; /* 選択中に光らせる */
}

/* テーブルの行にマウスが乗ったら背景を変える */
tr:hover .keyClassName {
    background-color: #e9e9d0; /* 少し濃いベージュ */
}
tr:hover .valueClassName {
    background-color: #f0f0ff; /* 親のホバー色に合わせる */
}

`.trim(),document.head.appendChild(s);const n=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,n)}}class yt{constructor(){this.cancel=!1}}const j={None:"None",Add:"Add",Delete:"Delete",Update:"Update"};class Ee{constructor(){this.logType=j.None,this.chUuid=""}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class Wt{constructor(){this.TextMap=new Map}set(e,t){const s=this.TextMap.has(e);return this.TextMap.set(e,t),s}remove(e){const t=this.TextMap.has(e);return t&&this.TextMap.delete(e),t}get count(){return this.TextMap.size}clear(){this.TextMap.clear()}forEach(e){if(e===void 0)return;let t=!1;for(const[s,n]of this.TextMap)if(t=e(s,n),t)break;return t}values(){const e=new Map;for(const[t,s]of this.TextMap)e.set(t,parseInt(s));return e}}class Ct{constructor(e=0,t=""){this.ch=new Z,this.isEmpty=!0,this.details=new Wt,this.ch.id=e,this.ch.name=t}set(e,t){const s=this.details.TextMap.has(e);return this.details.set(e,t),s}get values(){return this.details.values()}get itemID(){const e=this.itemKey,t=this.ch.idAttributeForHTML.substring(e.length);let s=parseInt(t);return s<=0?-1:s}get itemKey(){return"chuid"}}class bt{constructor(){this.nFormationItem=5,this.uiInfo=new ae}Init(){this.items=new Array;for(let e=0;e<this.nFormationItem;e++)this.items.push(new Ct)}put(e,t){return this.items.find(n=>this.isExistCh(n,t))!==void 0?!1:(e.ch.ns=t.ns,e.ch.id=t.id,e.ch.name=t.name,e.isEmpty=!1,!0)}empty(e){const t=e.isEmpty;return e.isEmpty=!0,e.isEmpty!=t}isExistCh(e,t){return e.ch.name===t.name&&e.ch.id===t.id}equalsFormationItem(e,t){return e.ch.name===t.ch.name&&e.ch.id===t.ch.id}}class Kt{constructor(){this.emptyFile="plus.png",this.propItemNum=0,this.parentName="",this.listName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new b().SaveSetting(e)}}Init(e){this.charDB=e,this.formation=new bt,this.formation.Init(),this.scsList=new Array;const t=this.formation.nFormationItem;for(let s=0;s<t;s++){const n=new O;this.scsList.push(n)}}async Setup(e,t){if(!e)return;this.formation=e;let s=0;for(const n of this.formation.items){n.isEmpty?this.formation.empty(n):this.formation.put(n,n.ch),s++;const i=`${n.itemKey}${s}`;n.ch.idAttributeForHTML=i;const o=n.isEmpty?this.emptyFile:n.ch.iconFileName,l=await t.getImageUrlBy(o,n.ch.ns);if(l===null)return;this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),n.ch.idAttributeForHTML,l)}}async toHTML(e,t){if(!this.formation)return"";this.listName=e,this.htmlMakerChSel=new M;let s=0;for(const n of this.formation.items){const i=n.ch;s++;const o=`${n.itemKey}${s}`;i.idAttributeForHTML=o;const l="",a=n.isEmpty?this.emptyFile:i.iconFileName,r=new Xe;r.imgSrc=l,r.imgFile=a;const c=new B;c.props.name=this.itemCssClassName(),c.props.id=o,c.props.className=this.imgCssClassName(),c.props.option.setImg(r),c.props.option.toolTip=i.name,c.props.option.onSelect=h=>{console.log(`notifty id = ${h.item.props.id}`),this.setSelectedItem(h.item.props.id)},this.htmlMakerChSel.add(c)}return this.htmlMakerChSel.MakeScrollableList(this.listCssClassName())}toGridHTML2(){this.htmlMakerProp=new M;let e=0,t="";for(const s of this.formation.items){s.ch;const n=this.scsList[e];e++;const i=new q;i.makeDim(1,n.items.length*2);let o=-1;for(const r of n.items){o++;const c=new ve;c.selectionPair=r.selectionPair,c.selectedItem=r.selectedVal,c.classify=r.key,i.getCell(0,o*2).typeInfo.setLabel(r.title,!1);const u=i.getCell(0,o*2+1);u.className=this.propItemCssClassName(),u.typeInfo.setCombo(c),u.typeInfo.onSelect=p=>{console.log(`notifty id = ${p.item.props.id}`)}}const l=i.ToScrollHTML(this.propItemCssClassName(),`${e}`);t=`
${t}
${l}`.trim();const a=new B;a.props.id=`${e}`,a.props.option.onSelect=r=>{console.log(`notifty id = ${r.item.props.id}`)},this.htmlMakerProp.itemList.push(a)}return t}toGridHTML(){this.htmlMakerProp=new M;let e=0;for(const t of this.formation.items){t.ch;const s=this.scsList[e];e++;const n=new M;for(const l of s.items)this.makeChLvSelect(t,`${l.key}${e}`,l.title,l.key,l.selectionPair,l.selectedVal,n),t.details.set(l.key,l.selectedVal);const i=n.ToHTML(),o=new B;o.props.name="",o.props.id=`${e}`,o.props.className="",o.props.option.setPlain(i),o.props.option.onSelect=l=>{console.log(`notifty id     = ${l.item.props.id}`),console.log(` targetId      = ${l.targetId}`),console.log(` classify      = ${l.classify}`),console.log(` selectedValue = ${l.selectedValue}`);const a=l.item.props.id,r=parseInt(a)-1;if(0<=r&&r<this.formation.items.length){const c=this.formation.items[r];c.set(l.classify,l.selectedValue);const h=this.scsList[r];h.set(l.classify,l.selectedValue);const u=new Yt;u.uiName=this.parentName,u.item=c,u.values=c.values,u.scoreConfigSet=h,this.onPropChanged(u)}else console.log(`invalid index = ${r}`)},this.htmlMakerProp.add(o)}return this.htmlMakerProp.MakeScrollableList(this.propCssClassName())}makeChLvSelect(e,t,s,n,i,o,l){const a=new B;a.props.name=this.propItemCssClassName(),a.props.id=t,a.props.className=this.lblCssClassName(),a.props.option.setLabel(s,!1);const r=a.ToHTML(a.props),c=new B;c.props.name=this.propItemCssClassName(),c.props.id=t,c.props.className=this.lblCssClassName();const h=new ve;h.selectionPair=i,h.selectedItem=o,h.classify=n,c.props.option.setCombo(h);const u=c.ToHTML(c.props);let p=`
${r}
${u}
`.trim();const g=new B;g.props.name=this.propItemCssClassName(),g.props.id=t,g.props.className=this.lblCssClassName(),g.props.option.setPlain(p),l.add(g)}createFormationBox(e,t,s,n,i){this.parentName=t;let o="";i&&(o=`<button id="${this.dlgCssClassName()}-stock">キャラ保存</button>`);let l=`
<button id="${this.dlgCssClassName()}-tbput">キャラ配置</button>
<button id="${this.dlgCssClassName()}-tbempty">キャラ抹消</button>
${o}
`.trim();const a=this.htmlMakerChSel.MakeDefaultToolButtonsHTML(l),r=this.htmlMakerChSel.MakeDefaultButtonsHTML(`
<button id="${this.dlgCssClassName()}-close">閉じる</button>
`);let c="";n!==""?c=`<div class="${this.dlgContentCssClassName()}">
    ${a}
    ${s}
    ${n}
    ${r}
</div>`:c=`<div class="${this.dlgContentCssClassName()}">
    ${a}
    ${s}
    ${r}
</div>`;const h=new V;h.title="<"+e+">";const u=h.NewDialog(t,this.dlgCssClassName());return h.SetContent(t,c),this.applyCss(),h.EnableEventHandlers(),h.onMoveDone=this.moverOnMoveDone,u}addEventHandlers(e){document.getElementById(`${this.dlgCssClassName()}-close`).onclick=()=>{document.getElementById(this.parentName).hidden=!0},document.getElementById(`${this.dlgCssClassName()}-tbput`).onclick=async()=>{if(this.onPut!==void 0){this.selectedItem.isEmpty=!1;const s=new ze;s.uiName=this.formation.uiInfo.name,s.item=this.selectedItem,await this.onPut(s),this.formation.put(this.selectedItem,s.selectCh),this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,s.selectedImg),this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,this.selectedItem.ch.name);const n=this.findPropGridPos();if(n!==-1){let i=this.selectedItem.ch.idAsText===""?`${this.selectedItem.ch.id}`:this.selectedItem.ch.idAsText;const o=await this.charDB.getStatus(i);if(console.log(o),o!==null&&o.items!==void 0){for(const a of o.items)this.selectedItem.details.set(a.key,a.selectedVal);this.scsList[n]=o;const l=this.toGridHTML();this.replacePropGrid(l),this.htmlMakerProp.enableEvents(this.propItemCssClassName())}}}},document.getElementById(`${this.dlgCssClassName()}-tbempty`).onclick=async()=>{if(this.onEmpty!==void 0){this.selectedItem.isEmpty=!0;const s=new ze;s.uiName=this.formation.uiInfo.name,s.item=this.selectedItem,s.selectedImg=this.emptyFile,await this.onEmpty(s),this.formation.empty(this.selectedItem),this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,s.selectedImg),this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,"");const n=this.findPropGridPos();if(n!==-1){this.scsList[n]=new O;const i=this.toGridHTML();this.replacePropGrid(i),this.htmlMakerProp.enableEvents(this.propItemCssClassName())}}};const t=document.getElementById(`${this.dlgCssClassName()}-stock`);t!==null&&(t.onclick=async()=>{if(this.onStock!==void 0){if(this.selectedItem.ch.ns===R.None)return;const s=this.htmlMakerChSel.FindImgByID(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML),n=new ze;n.item=this.selectedItem,n.selectedImg=s===null?"":s.src;const i=this.findPropGridPos();i!==-1&&(n.scoreSet=this.scsList[i]),await this.onStock(n)}})}addItemEventkHandlers(e,t,s,n){this.onStock=s,this.onPut=e,this.onEmpty=t,this.onPropChanged=n;const i=this.htmlMakerChSel.GetIdByIndex(0);this.htmlMakerChSel.SelectByID(this.itemCssClassName(),i),this.htmlMakerChSel.enableEvents(this.itemCssClassName()),this.htmlMakerProp.enableEvents(this.propItemCssClassName()),this.setSelectedItem(i)}findPropGrid(){const e=this.htmlMakerChSel.FindDivByClassName(this.dlgContentCssClassName(),this.propCssClassName());return e!==null?e:null}findPropGridPos(){const e=this.findPropGrid();if(e!==null&&e.className.startsWith(this.propCssClassName())){let t=-1;for(const s of this.formation.items)if(t++,s===this.selectedItem)return console.log(`pos=${t}`),t}return-1}replacePropGrid(e){const t=this.htmlMakerChSel.FindDivByClassName(this.dlgContentCssClassName(),this.propCssClassName());if(t===null)return null;const s=document.createElement("div");s.innerHTML=e,t.replaceWith(s.childNodes[0])}setSelectedItem(e){const t=this.formation.items.find(s=>e===s.ch.idAttributeForHTML);t&&(this.selectedItem=t)}enableLazyImages(e){this.htmlMakerChSel.initObserver(this.dlgCssClassName(),e)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}propCssClassName(){return`${this.listName}-prop`}propItemCssClassName(){return`${this.listName}-prop-item`}lblCssClassName(){return`${this.listName}-lbl`}listCssClassName(){return`${this.listName}-list`}dlgContentCssClassName(){return`${this.parentName}-dlg-content`}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=this.propCssClassName(),i=this.propItemCssClassName();this.lblCssClassName();const o=parseInt(this.formation.uiInfo.left),l=parseInt(this.formation.uiInfo.top),a=100;new q;const r=document.createElement("style");r.textContent=`
${this.htmlMakerChSel.MakeDefaultDialogParentCss(this.parentName,o,l)}
${this.htmlMakerChSel.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgContentCssClassName()} {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

${this.htmlMakerChSel.MakeDefaultScrollCss(this.parentName,500)}
${this.htmlMakerChSel.MakeDefaultGridColCss(e,a,5,a*5+16)}

${this.htmlMakerChSel.MakeDefaultItemimgCss(t,s,a,a)}
${this.htmlMakerChSel.MakeDefaultSelectionCss(t)}

/*
${this.htmlMakerChSel.MakeDefaultGridRowCss(n,a,this.propItemNum,22)}
${this.htmlMakerChSel.MakeDefaultItemJustifyRightCss(i,a,20)}
*/
${this.htmlMakerChSel.MakeDefaultGridColCss(n,a,5,a*5+16)}
${this.htmlMakerChSel.MakeDefaultItemJustifyRightCss(i,a,30)}

${this.htmlMakerChSel.MakeDefaultButtonsCss()}
`.trim(),document.head.appendChild(r);const c=document.getElementById(this.parentName);this.htmlMakerChSel.copyCssToInlineStyle(`.${this.parentName}`,c)}}class ze{constructor(){this.cancel=!1}}class Yt{constructor(){this.uiName="",this.cancel=!1}}class De{constructor(){this.ch=new X,this.isEmpty=!0,this.TextMap=""}static toJsonText(e){const t=X.toJsonInst(e.ch);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new De;t.ch=X.toJsonInst(e.ch),t.isEmpty=e.isEmpty;const s=Object.fromEntries(e.details.TextMap);return t.TextMap=JSON.stringify(s,null,2),t}static fromJsonInst(e){const t=new Ct;t.ch=X.fromJsonInst(e.ch),t.isEmpty=e.isEmpty;const s=new Map(Object.entries(JSON.parse(e.TextMap)));return t.details.TextMap=s,t}}class _{static toJsonText(e){const t=_.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new _;t.items=new Array;for(const s of e.items)t.items.push(De.toJsonInst(s));return t}static fromJsonInst(e){const t=new bt;t.items=new Array;for(const s of e.items)t.items.push(De.fromJsonInst(s));return t}}class wt{constructor(e=0,t="",s=!0,n=0){this.ch=new Z,this.isEmpty=!0,this.score=0,this.allAvailable=!1,this.ch.id=e,this.ch.name=t,this.isEmpty=s,this.score=n}}class Ze{Add(e){if(e===void 0){console.log("[VersusGroupRow::Add] scItem === undefined");return}this.columns===void 0&&(this.columns=[]),this.columns.push(e)}Count(){return this.columns.length}debug(){if(this.columns===void 0){console.log("[VersusGroupRow::debug] this.columns === undefined");return}for(const e of this.columns)console.log(`[${e.ch.name}]	score=[${e.score}]`)}}Ze.defNumColumn=5;class et{Add(e){this.groupRows===void 0&&(this.groupRows=[]),this.groupRows.push(e)}Count(){return this.groupRows.length}debug(){if(this.groupRows===void 0)console.log("this.groupRows === undefined");else for(const e of this.groupRows)e.debug()}async loadJson(e){const n=(await new fe().loadJson(e)).groupRows.map(o=>Object.assign(new Ze,o)),i=new et;return i.groupRows=n,i}}const J={None:"None",Player:"Player",Enemy:"Enemy"},z={None:"None",Attr:"Attr",Role:"Role"},Je={HiLv:"HiLv"},F={Likely:"Likely",Uncertain:"Uncertain",Wishful:"Wishful"};class Be{}Be.Likely=.9;Be.Uncertain=.64;class Ge{constructor(){this.scoreItems=[],this.formationType=J.None,this.boost=0}get imgPrefix(){return this.formationType===J.Player?"ftPlayer":"ftEnemy"}get judgeWidth(){return 48}setScoreItems(e){if(e!==void 0){this.scoreItems=new Array;for(const t of e){const s=new wt(t.ch.id,t.ch.name,t.isEmpty,t.score);this.scoreItems.push(s)}}}async toCharHTML(e,t){const s=t.ch.ns===R.None?"":t.ch.ns,n=await e.getImageUrlBy(t.ch.iconFileName,s);let i=this.scoreToolTip(t);return i!==""&&(i=`title="${i}"`),`
<img class=${this.charCssClassName()}
  src="${n}"
  ${i}>
`.trim()}scoreToolTip(e){return e.isEmpty?"":`${e.ch.name}
score=${e.score}`}async toJudgeHTML(e,t){const s=this.toJudgeFileURL(e,t);return`<img class=${this.judgeCssClassName()} src="${s}" width="48">`}async toJudgeFileURL(e,t){let s=null;switch(t){case F.Likely:s=await e.getImageUrlBy("win.png",e.AnyNs);break;case F.Uncertain:s=await e.getImageUrlBy("even.png",e.AnyNs);break;case F.Wishful:s=await e.getImageUrlBy("lost.png",e.AnyNs);break;default:return""}return s}charCssClassName(){return"combat-char"}judgeCssClassName(){return"combat-judge"}get combatScore(){if(this.scoreItems===void 0)return 0;const e=this.scoreItems.reduce((s,n)=>n.isEmpty?s:s+n.score,0),t=this.boost===0?1:this.boost;return Math.ceil(e*t/100)}}class Xt{constructor(){this.hasCombo=!1,this.winRate=new Map}setPlayer(e){e.formationType=J.Player,this.player=e}setEnemy(e){e.formationType=J.Enemy,this.enemy=e}judge(e){const s=this.winRate.get(e);return s>=Be.Likely?F.Likely:s>=Be.Uncertain?F.Uncertain:F.Wishful}judgeForEnemy(e){switch(e){case F.Likely:return F.Wishful;case F.Uncertain:return F.Uncertain;case F.Wishful:return F.Likely}}}class _t{constructor(){this.combatPairs=new Map,this.emptyFile="plus.png",this.parentName="",this.uiInfo=new ae,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new b().SaveSetting(e)}}setPair(e,t){this.combatPairs.set(e,t)}calcCombatScore(){for(const[e,t]of this.combatPairs){if(t.player===void 0||t.enemy===void 0)continue;const s=[z.None,z.Attr,z.Role];for(const n of s){let i=t.player.combatScore,o=t.enemy.combatScore;t.winRate.set(n,o!==0?i/o:1)}}}async replaceChar(e,t,s,n,i){const o=this.combatPairs.get(e);let l;if(t===J.Player?l=o?.player:t===J.Enemy&&(l=o?.enemy),l===void 0)return!1;const a=s.itemID;if(a<0)return!1;const r=a-1;l=l;const h=`${l.imgPrefix}${a}`,u=l.scoreItems[r],p=u.ch;s.isEmpty?(p.id=0,p.name="",console.log("set empty")):(p.id=n.id,p.name=n.name,console.log(`set char ${n.id}:${n.name}`)),u.isEmpty=s.isEmpty;const g=p.ns===R.None?"":p.ns,L=await i.getImageUrlBy(p.iconFileName,g);if(L===null)return!1;const H=new M,U=this.outerCssClassName();return H.ReplaceImg(U,h,L),H.ReplaceImgToolTip(U,h,l.scoreToolTip(u)),!0}async replaceJudge(e){async function t(i,o){const l=await i.toJudgeFileURL(e,o);if(l===null)return;const a=i.imgPrefix;for(let r=0;r<i.scoreItems.length;r++){const c=`${a}${r+1}`,h=s.FindImgsByID(n,c);if(h===null||h.length<=1){console.error("fail on judge marker");continue}const u=h[1];s.SetImgSrc(u,l),i.scoreItems[r].isEmpty?s.SetImgSize(u,0,0):s.SetImgSize(u,i.judgeWidth,i.judgeWidth);const p=i.scoreItems[r];s.ReplaceImgToolTip(n,c,i.scoreToolTip(p))}}const s=new M,n=this.outerCssClassName();for(const[i,o]of this.combatPairs){if(o.player===void 0||o.enemy===void 0)continue;const l=[z.None,z.Attr,z.Role];for(const a of l){if(a!==z.None)continue;const r=o.judge(a),c=o.judgeForEnemy(r);await t(o.player,r),await t(o.enemy,c)}}}async toHTML(e,t){const s=document.createElement("table");s.id=e;const n=document.createElement("tbody");s?.appendChild(n);async function i(l,a){const r=document.createElement("tr");n?.appendChild(r);const c=await a.toJudgeHTML(t,l),h=a.imgPrefix;let u=0;for(const p of a.scoreItems){u++;const g=await a.toCharHTML(t,p),L=`
<div class=${o} item-id="${h}${u}">
    ${g}
    ${c}
</div>
`.trim(),H=document.createElement("td");H.innerHTML=L,r.appendChild(H)}}const o=this.outerCssClassName();for(const[l,a]of this.combatPairs){const r=a.judge(z.None),c=a.judgeForEnemy(r);await i(r,a.player),await i(c,a.enemy)}return s.outerHTML}createCombatBox(e,t,s){this.parentName=t,this.htmlMaker=new M;const n=`<div class="${this.parentName}-dlg-content">
    ${s}
</div>`,i=new V;i.title="<"+e+">";const o=i.NewDialog(t,this.dlgCssClassName());return i.SetContent(t,n),this.applyCss(),i.EnableEventHandlers(),i.onMoveDone=this.moverOnMoveDone,o}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}processResult(e,t,s){async function n(o,l){const a=t(l.formationType),r=await l.toJudgeHTML(e,o),c=l.imgPrefix;let h=0;for(const u of l.scoreItems){h++;const p=await l.toCharHTML(e,u),g=`
<div class=${i} item-id="${c}${h}">
    ${p}
    ${r}
</div>
`.trim();s(a,g)}}const i=this.outerCssClassName();for(const[o,l]of this.combatPairs){const a=l.judge(z.None),r=l.judgeForEnemy(a);n(a,l.player),n(r,l.enemy)}}outerCssClassName(){return"combat-outer"}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const e=new Ge,t=`.${this.outerCssClassName()}`,s=`.${e.charCssClassName()}`,n=`.${e.judgeCssClassName()}`,i=parseInt(this.uiInfo.left),o=parseInt(this.uiInfo.top),l=document.createElement("style");l.textContent=`
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
`.trim(),document.head.appendChild(l);const a=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,a)}}const he={Unknown:"Unknown",Success:"Success",Fail:"Fail",Cancel:"Cancel"};async function ht(m){const e=m.isWebRunning,t=m.currentUserHome,s=m.chStatusListFile,n=m.chListFile,i=new At,o=new M,l="splash-screen";o.initFullScreen(l,"エボナ データベース初期化中..."),o.applyFullScreenCss(l);const a=o.getFullScreenMsgElem(l),r=a!==null?a.innerHTML:"";if(t===m.user1Home){const f=[{ns:R.CnsRed,nsName:"赤属性"},{ns:R.CnsBlue,nsName:"青属性"},{ns:R.CnsGreen,nsName:"緑属性"},{ns:R.CnsYellow,nsName:"黄属性"},{ns:R.CnsViolet,nsName:"紫属性"}],$=await new pe().LoadList(n);for(const w of f)a!==null&&(a.innerHTML=`${r} ${w.nsName}`),await i.setupNs(w.ns,m,$)}if(t===m.user2Home){const f=[{ns:R.CnsBlue,nsName:"藍属性"},{ns:R.CnsRed,nsName:"紅属性"},{ns:R.CnsGreen,nsName:"翠属性"},{ns:R.CnsYellow,nsName:"黄属性"},{ns:R.CnsWhite,nsName:"天属性"},{ns:R.CnsBlack,nsName:"冥属性"}],$=await new pe().LoadList(n);for(const w of f)a!==null&&(a.innerHTML=`${r} ${w.nsName}`),await i.setupNs(w.ns,m,$)}a!==null&&(a.innerHTML="UI 初期化中 ...");const c=new Qe,h=new Ae;await h.loadDB(s);async function u(){async function f(){return await new pe().LoadList(n)}const d=await f();d.uiInfo.name="charListArea",d.uiInfo.left="300",d.uiInfo.top="100";const $=d.uiInfo.name,w=await d.toHTML(i);if(e){const S="キャラ選択",y=d.createSelectorBox(S,$,w);d.addEventHandlers(y),d.addItemEventHandlers(),d.enableLazyImages(i),y.show();const k=new te;k.setAsDlg(y,S),c.add(k)}return d}const p=await u();async function g(){const f=new Gt;await f.load(),f.uiInfo.name="CharSummary",f.uiInfo.left="400",f.uiInfo.top="100";const d=f.uiInfo.name,$=await f.toHTML();if(e){const w="キャラ一覧",S=f.createSummaryBox(w,d,$);await f.updateCharInfos(i),f.addEventHandlers(S,async k=>{k.selectCh=p.selectedCh;const A=await i.getImageUrlBy(p.selectedCh.iconFileName,p.selectedCh.ns);if(A===null)k.selectedImg="",k.cancel=!0;else{k.selectedImg=A,k.cancel=!1;const v=await h.getStatus(p.selectedCh.idAsText);console.log(v),k.scoreSet=v}console.log(`selected ch = ${k.selectCh.name}`)}),f.addItemEventHandlers(),f.enableLazyImages(i),S.show();const y=new te;y.setAsDlg(S,w),c.add(y)}return f}const L=await g();async function H(f,d,$,w,S){const y=new Kt;y.Init(h),y.formation.uiInfo.name=f,y.formation.uiInfo.left=`${d}`,y.formation.uiInfo.top=`${$}`;const k=y.formation.uiInfo.name,A=await y.toHTML(k,i),v=y.toGridHTML();if(e){const ee=y.createFormationBox(w,k,A,v,S);y.addEventHandlers(ee),y.addItemEventkHandlers(async I=>{I.selectCh=p.selectedCh;const P=await i.getImageUrlBy(p.selectedCh.iconFileName,p.selectedCh.ns);if(P===null)return;I.selectedImg=P,I.item.isEmpty=!1,console.log(`selected ch = ${I.selectCh.name}`);const W=Je.HiLv;D.combatPairs.get(W),I.uiName===U&&await D.replaceChar(W,J.Player,I.item,I.selectCh,i),I.uiName===ge&&await D.replaceChar(W,J.Enemy,I.item,I.selectCh,i),await D.replaceJudge(i)},async I=>{const P=await i.getImageUrlBy(I.selectedImg,p.selectedCh.ns);if(P===null)return;I.selectedImg=P,I.item.isEmpty=!0,console.log(`empty ch = ${I.selectedImg}`);const W=Je.HiLv;D.combatPairs.get(W),I.uiName===U&&await D.replaceChar(W,J.Player,I.item,I.selectCh,i),I.uiName===ge&&await D.replaceChar(W,J.Enemy,I.item,I.selectCh,i),await D.replaceJudge(i)},async I=>{console.log(`selected ch = ${I.item.ch.name}`);const P=new yt;P.selectCh=I.item.ch,P.selectedImg=I.selectedImg,P.scoreSet=I.scoreSet,L.charStock(P)},async I=>{const P=rt();console.log(P),await P.replaceJudge(i)}),y.enableLazyImages(i),ee.show();const we=new te;we.setAsDlg(ee,w),c.add(we)}return y}const U="playerForm",ge="enemyForm",Pe=await H(U,100,100,"自編成",!0),Fe=await H(ge,100,200,"敵編成",!1);async function Et(f,d,$,w){D.uiInfo.name=f,D.uiInfo.left=`${d}`,D.uiInfo.top=`${$}`;const S=await D.toHTML("combatTable",i),y=D.createCombatBox(w,f,S);D.enableLazyImages(i),await D.replaceJudge(i),y.show();const k=new te;k.setAsDlg(y,w),c.add(k)}const D=rt();await Et("combatForm",120,300,"対戦予想");const tt="保存";{const f=new te;f.setAsMenu(tt),c.add(f)}const st="復帰";{const f=new te;f.setAsMenu(st),c.add(f)}let ye=null;const xt=await c.toHTML("dockForm",i);if(e){const f=c.createDockBox("dockForm",xt);c.addItemClickHandlers(async d=>{if(d.item.dlgParent===null){d.cancel=!0;return}console.log(`selected item = [${d.item.toolTip}::${d.item.dockType}]`),d.item.isUIType&&(new b().MoveHiestLayer(d.item.dlgParent),d.item.dlgParent.hidden&&(d.item.dlgParent.hidden=!1)),d.item.isMenuType&&(d.item.toolTip===tt&&await Mt(),d.item.toolTip===st&&await vt(async $=>{if(console.log(`[loadedResult] ${$}`),$!==he.Success)return;const w=_.fromJsonInst(Ce),S=_.fromJsonInst(be);Ce=null,be=null,await Pe.Setup(w,i),await Fe.Setup(S,i)}))}),c.enableLazyImages(i),f.show(),ye=f}const nt="playerForm.json",it="enemyForm.json",ot="dockForm.json";async function Mt(){c.InitZOrder(G);const f=_.toJsonText(Pe.formation),d=_.toJsonText(Fe.formation),$=He.toJsonText(c),w=new window.JSZip;w.file(nt,f),w.file(it,d),w.file(ot,$);const S=await w.generateAsync({type:"blob"}),y="gameConfig.zip",k=URL.createObjectURL(S),A=document.createElement("a");A.href=k,A.download=y,A.click(),URL.revokeObjectURL(k),console.log("saved!")}let lt=null,Ce=null,be=null;async function vt(f){const d=document.createElement("input");return d.type="file",d.accept=".zip",d.addEventListener("cancel",()=>(console.log("Cancelled."),he.Cancel)),d.addEventListener("change",async()=>{if(d.files.length==1){console.log("File selected: ",d.files[0].name);const w=await d.files[0].arrayBuffer(),y=await new window.JSZip().loadAsync(w);async function k(v){const ee=y.file(v);if(ee){const we=await ee.async("string"),I=JSON.parse(we);return console.log(I),I}}{const v=await k(ot);v&&(lt=v)}{const v=await k(nt);v&&(Ce=v)}{const v=await k(it);v&&(be=v)}const A=lt!==null&&Ce!==null&&be!==null?he.Success:he.Fail;f(A)}}),d.click(),he.Unknown}const G=new b;e&&(G.AddDialogs(),G.AssignIndexies(),await G.LoadAllSetting(),await G.loadSetting(ye),c.InitZOrder(G),await G.ForEachAsync(f=>{const d=V.FindDialogParent(f);return d!==null&&(m.isLocal||f==="charListArea"?d.hidden=!1:d.hidden=!0),!0}),ye!==null&&(ye.parentElement.hidden=!m.isLocal)),o.hideFullScreenCss(l);function at(f){const d=new et,$=new Ze,w=f.formation;w.uiInfo.name,w.uiInfo.name;let S=0;for(const y of w.items){const k=f.scsList[S];S++;const A=Math.ceil(k.stdScore),v=new wt(y.ch.id,y.ch.name,y.isEmpty,A);v.allAvailable=k.allAvailable,$.Add(v)}return d.Add($),d.debug(),d}function rt(){const f=new _t,d=at(Pe),$=at(Fe),w=new Ge;w.setScoreItems(d.groupRows[0].columns),w.boost=100;const S=new Ge;S.setScoreItems($.groupRows[0].columns),S.boost=100;const y=new Xt;y.setPlayer(w),y.setEnemy(S),f.setPair(Je.HiLv,y),f.calcCombatScore();for(const[k,A]of f.combatPairs){const v=A.judge(z.None);console.log(`judge=[${v}]`)}return f}}class Qt{constructor(){this.intervalMs=1e3,this.isOneShot=!0,this.intervalTimer=null}start(e,t){this.intervalTimer!==null&&this.clear(),this.intervalTimer=setTimeout(async()=>{t!==void 0&&(await t(e)||this.clear()),this.isOneShot===!0&&this.clear()},this.intervalMs)}clear(){clearTimeout(this.intervalTimer),this.intervalTimer=null}}const le={Resource:"Resource",ScoreUI:"ScoreUI"},We={Sequence:"Sequence",Text:"Text"};class Nt{constructor(){this.key="",this.text=""}}class It extends Nt{constructor(){super(...arguments),this.comment=""}}class Tt extends Nt{constructor(){super(...arguments),this.selectType=We.Sequence,this.start="",this.end="",this.step="",this.keyValue=""}}class Me{constructor(){this.resItem=new It,this.scItem=new Tt}}class Zt{constructor(){this.itemList=new Array,this.resLogToItem=e=>{const t=e;for(const s of t.inst){const n=new Me;n.owner=this,n.resItem=s,this.itemList.push(n)}},this.scLogToItem=e=>{const t=e;for(const s of t.inst){const n=new Me;n.owner=this,n.scItem=s,this.itemList.push(n)}},this.editorConfigs=[{editorType:le.Resource,logType:ie.ResourceEditAction,fromJsonText:Ke.fromJsonText,logToItem:this.resLogToItem},{editorType:le.ScoreUI,logType:ie.ScoreEditAction,fromJsonText:Ye.fromJsonText,logToItem:this.scLogToItem}],this.actEditor=this.editorConfigs[0]}init(){for(let e=0;e<10;e++){const t=new Me;t.owner=this,this.itemList.push(t)}}async load(e){const t=this.getEditor(e);if(t===void 0)return;this.actEditor=t!==void 0?t:this.editorConfigs[0];const s=t.logType,i=await(await oe()).get(s);if(i===null)return;const o=s,l=new Map;for(const a of i){let c=t.fromJsonText(a).logType,h=!1,u=!1;switch(c){case Q.None:break;case Q.Add:h=!0;break;case Q.Update:h=!0;break;case Q.Delete:h=!0,u=!0;break}h&&(u?l.has(o)&&l.delete(o):(l.has(o)&&l.delete(o),l.set(o,a)))}this.itemList=new Array;for(const[a,r]of l){const c=t.fromJsonText(r);t.logToItem(c)}}getEditor(e){return this.editorConfigs.find(s=>s.editorType===e)}get editorType(){return this.actEditor.editorType}}class mt extends Zt{constructor(){super(...arguments),this.uiInfo=new ae,this.parentName="",this.saveTimer=null,this.onSave=async e=>(console.log(`${e.parentName}`),!1),this.setColKey=(e,t,s,n)=>{const i=new K;i.value=t.owner.editorType==le.Resource?t.resItem.key:t.scItem.key,i.placeholder="キー",n.getCell(e,s).typeInfo.setInput(i),n.getCell(e,s).className=this.itemKeyCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.setColValue=(e,t,s,n)=>{const i=new K;i.value=t.owner.editorType==le.Resource?t.resItem.text:t.scItem.text,i.placeholder="文字列",n.getCell(e,s).typeInfo.setInput(i),n.getCell(e,s).className=this.itemDispCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.setColComment=(e,t,s,n)=>{const i=new K;i.value=t.resItem.comment,i.placeholder="コメント",n.getCell(e,s).typeInfo.setInput(i),n.getCell(e,s).className=this.itemCommentCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.setColSelectType=(e,t,s,n)=>{const i=new ve;i.selectionPair=[`連続/${We.Sequence}`,`文字列/${We.Text}`],i.selectedItem=t.scItem.selectType,i.classify="selectType",n.getCell(e,s).typeInfo.setCombo(i),n.getCell(e,s).className=this.itemSelectTypeCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.setColSelectStart=(e,t,s,n)=>{const i=new K;i.value=t.scItem.start,i.placeholder="開始",n.getCell(e,s).typeInfo.setInput(i),n.getCell(e,s).className=this.itemSeqTypeStartCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.setColSelectEnd=(e,t,s,n)=>{const i=new K;i.value=t.scItem.end,i.placeholder="終了",n.getCell(e,s).typeInfo.setInput(i),n.getCell(e,s).className=this.itemSeqTypeEndCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.setColSelectStep=(e,t,s,n)=>{const i=new K;i.value=t.scItem.step,i.placeholder="ステップ",n.getCell(e,s).typeInfo.setInput(i),n.getCell(e,s).className=this.itemSeqTypeStepCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.setColText=(e,t,s,n)=>{const i=new K;i.value=t.scItem.keyValue,i.placeholder="key/valueを&quot;,&quot;で区切った文字列",n.getCell(e,s).typeInfo.setInput(i),n.getCell(e,s).className=this.itemTextTypeCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.setColDelBtn=(e,t,s,n)=>{n.getCell(e,s).typeInfo.setButton("削除"),n.getCell(e,s).className=this.itemDeleteCssClassName(),n.getCell(e,s).typeInfo.using.itemId=s+n.firstRowIndex},this.makeResLog=async e=>{const t=new Ke;t.logType=Q.Add;for(const i of e){const o=new It;for(const l of i.cells)for(const a of l.children){if(a.className===this.itemDeleteCssClassName())continue;const r=this.table.getElemValue(a)||"";switch(a.className){case this.itemKeyCssClassName():o.key=r;break;case this.itemDispCssClassName():o.text=r;break;case this.itemCommentCssClassName():o.comment=r;break}}t.inst.push(o)}const s=Ke.toJsonText(t);await(await oe()).put(ie.ResourceEditAction,s)},this.makeScoreLog=async e=>{const t=new Ye;t.logType=Q.Add;for(const i of e){const o=new Tt;for(const l of i.cells)for(const a of l.children){if(a.className===this.itemDeleteCssClassName())continue;const r=this.table.getElemValue(a)||"";switch(a.className){case this.itemKeyCssClassName():o.key=r;break;case this.itemDispCssClassName():o.text=r;break;case this.itemSelectTypeCssClassName():o.selectType=r;break;case this.itemSeqTypeStartCssClassName():o.start=r;break;case this.itemSeqTypeEndCssClassName():o.end=r;break;case this.itemSeqTypeStepCssClassName():o.step=r;break;case this.itemTextTypeCssClassName():o.keyValue=r;break}}t.inst.push(o)}const s=Ye.toJsonText(t);await(await oe()).put(ie.ScoreEditAction,s)},this.resizerOnResizeDone=async(e,t,s)=>{console.log(`[${e.className}] resized (${t}, ${s})`);const n=parseInt(s),i=document.getElementById(this.dlgContentCssClassName());if(i!==null){i.style.width===""?i.offsetWidth:parseInt(i.style.width),i.style.maxWidth="none";const o=i.style.height===""?i.offsetHeight:parseInt(i.style.height);i.style.maxHeight="none",i.style.height=`${o+n}px`;const l=i.querySelectorAll(`.${this.tableCssClassName()}`);if(l!==null){const a=l[0],r=a.style.height===""?a.offsetHeight:parseInt(a.style.height);a.style.maxHeight="none",a.style.height=`${r+n}px`}}},this.onCopyPaste=async(e,t)=>{switch(console.log(`[${e.className}] selected [${t}]`),t){case de.Copy:await this.table.toClipboard();break;case de.Paste:await this.table.fromClipboard();break}}}async startAutoSave(){this.saveTimer=new Qt,this.saveTimer.intervalMs=1e3,this.saveTimer.isOneShot=!1,this.saveTimer.start(this,this.onSave)}setRow(e,t,s){const n=this.editItems;if(n===void 0)return;let i=-1;for(const o of n)i++,o.colConfig(i,e,t,s)}makeResEditItems(){return[{className:"",colConfig:this.setColKey},{className:"",colConfig:this.setColValue},{className:"",colConfig:this.setColComment},{className:"",colConfig:this.setColDelBtn}]}makeScoreEditItems(){return[{className:"",colConfig:this.setColKey},{className:"",colConfig:this.setColValue},{className:"",colConfig:this.setColSelectType},{className:"",colConfig:this.setColSelectStart},{className:"",colConfig:this.setColSelectEnd},{className:"",colConfig:this.setColSelectStep},{className:"",colConfig:this.setColText},{className:"",colConfig:this.setColDelBtn}]}toHTML(e,t){if(!this.itemList)return"";this.editItems=e,this.makeLog=t;const s=e.length,n=new q;if(this.itemList.length>=1)n.makeDim(s,this.itemList.length),this.itemList.forEach((a,r)=>{this.setRow(a,r,n)}),n.makeRowTemplate(this.tableRowCssClassName()),this.table=n;else{n.makeDim(s,1);const a=new Me;this.setRow(a,0,n),n.makeRowTemplate(this.tableRowCssClassName()),n.clearRows(),this.table=n}const i=this.tableCssClassName(),o=this.table.ToScrollHTML(i,i);this.htmlMaker=new M;const l=new B;return l.props.name="",l.props.id=i,l.props.className=i,l.props.option.setTable(o),l.props.option.onSelect=async a=>{switch(console.log(`classify = ${a.classify} targetId = ${a.targetId}`),a.classify){case this.itemSeqTypeStartCssClassName():await this.onSeqEnter(a);break;case this.itemSeqTypeEndCssClassName():await this.onSeqEnter(a);break;case this.itemSeqTypeStepCssClassName():await this.onSeqEnter(a);break;case this.itemDeleteCssClassName():const r=new ne;r.setParent(this.dlgCssClassName());let c=N.None;switch(r.setYesNo(),c=await r.showWait(`${a.targetId} を削除しますか？`),c){case N.Yes:break;case N.No:return;case N.Cancel:return}const h=parseInt(a.targetId);h>=1&&(n.deleteRow(h),n.redimAllRows(),this.itemList.splice(h-this.table.firstRowIndex,1));break}},this.htmlMaker.add(l),this.htmlMaker.ToHTML()}async onSeqEnter(e){if(e.KeyEnter===se.Special){const t=this.table.getCellRect(e.parentElem),s=this.table.getTableOwnerRect(e.parentElem),n=this.table.makeCallerName(e.classify,e.targetId),i=this.table.getCallerCellElem(n);let o="";i!==null&&(o=i.value);const l=new Array;l.push("1/1");for(let r=1;r<=30;r++){const c=`${r*10}`;l.push(`${c}/${c}`)}const a=new Ft;a.setListener("updn",this.dlgContentCssClassName(),n),a.setSelectedByValue(o,l),a.applyCss(),a.show(`${parseInt(t.left)-parseInt(s.left)+10}`,`${parseInt(t.top)-parseInt(s.top)+10}`),a.enableEvents(r=>{console.log(`[onApply] ${r.callerName} ${r.result}`);const c=this.table.getCallerCellElem(r.callerName);if(c!==null){const h=c;h.value=r.result}a.dispose()},r=>{console.log(`[onUp] ${r.callerName} ${r.result}`)},r=>{console.log(`[onDown] ${r.callerName} ${r.result}`)})}}createEditorBox(e,t,s){this.parentName=t;const n=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="${this.textAddCssClassName()}">追加</button>
<button id="${this.applyCssClassName()}">保存</button>
`),i=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
   ${n}
   ${s}
</div>`,o=new V;o.title="<"+e+">",o.SetB2Type(me.CopyPaste,this.onCopyPaste);const l=o.NewDialog(t,this.dlgCssClassName());return o.SetContent(t,i,!1),this.applyCss(),o.EnableEventHandlers(),this.dialogDesc=o,l}addEventHandlers(e){document.getElementById(this.textAddCssClassName()).onclick=async()=>{const t=this.tableRowCssClassName();this.table.addRow(t)},document.getElementById(this.applyCssClassName()).onclick=async()=>{const t=this.table.getRowElems();t!==null&&await this.makeLog(t)}}addItemEventHandlers(){this.htmlMaker.enableTableEvents(this.tableCssClassName())}enableResize(){this.dialogDesc.onResizeDone=this.resizerOnResizeDone,this.dialogDesc.EnableResize()}textAddCssClassName(){return`${this.actEditor.editorType}-edit-add`}applyCssClassName(){return`${this.actEditor.editorType}-edit-apply`}itemKeyCssClassName(){return`${this.tableCssClassName()}-key`}itemDispCssClassName(){return`${this.tableCssClassName()}-text`}itemCommentCssClassName(){return`${this.tableCssClassName()}-comment`}itemSelectTypeCssClassName(){return`${this.tableCssClassName()}-select-type`}itemSeqTypeStartCssClassName(){return`${this.tableCssClassName()}-seq-type-start`}itemSeqTypeEndCssClassName(){return`${this.tableCssClassName()}-seq-type-end`}itemSeqTypeStepCssClassName(){return`${this.tableCssClassName()}-seq-type-step`}itemTextTypeCssClassName(){return`${this.tableCssClassName()}-text-type`}itemDeleteCssClassName(){return`${this.tableCssClassName()}-delete`}tableRowCssClassName(){return`${this.actEditor.editorType}-edit-table-row`}tableCssClassName(){return`${this.actEditor.editorType}-edit-table`}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return`${this.actEditor.editorType}-edit-dlg`}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=document.createElement("style");s.textContent=`
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
`.trim(),document.head.appendChild(s);const n=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,n)}}const Q={None:"None",Add:"Add",Delete:"Delete",Update:"Update"};class kt{constructor(){this.logType=Q.None}}class Ke extends kt{constructor(){super(...arguments),this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}class Ye extends kt{constructor(){super(...arguments),this.inst=new Array}static toJsonText(e){return JSON.stringify(e,null,2)}static fromJsonText(e){return JSON.parse(e)}}async function es(m){if(!m.isWebRunning)return;const e=m.isWebRunning;async function t(){const o=le.Resource,l=new mt;l.init(),await l.load(o),l.uiInfo.name="ResourceEdit",l.uiInfo.left="110",l.uiInfo.top="10";const a=l.uiInfo.name,r=await l.toHTML(l.makeResEditItems(),l.makeResLog);if(e){const c=document.createElement("div");c.id=l.uiInfo.name,c.className=l.uiInfo.name,document.body.appendChild(c);const h=l.createEditorBox("文字列リソース",a,r);l.addEventHandlers(h),l.addItemEventHandlers(),h.show(),l.enableResize()}return l}async function s(){const o=le.ScoreUI,l=new mt;l.init(),await l.load(o),l.uiInfo.name="ScoreEdit",l.uiInfo.left="110",l.uiInfo.top="100";const a=l.uiInfo.name,r=await l.toHTML(l.makeScoreEditItems(),l.makeScoreLog);if(e){const c=document.createElement("div");c.id=l.uiInfo.name,c.className=l.uiInfo.name,document.body.appendChild(c);const h=l.createEditorBox("スコア設定",a,r);l.addEventHandlers(h),l.addItemEventHandlers(),h.show(),l.enableResize()}return l}(await t()).startAutoSave(),(await s()).startAutoSave()}const x=new fe,$t=x.isWebRunning;$t?(ss(),x.parseURLParams(),x.currentUserHome===""&&x.setUser(x.user1Home)):x.setUser(x.user2Home);const St=window.EVONA_CONFIG.isLocal;x.setPath();x.setImageHome(St);const ts=ns(St);x.currentUserHome;x.statusJsonPath;x.zipPrefix;x.chListFile;x.chStatusListFile;switch(x.admin){case!0:await Bt(x);break;case!1:if($t)if(x.edit===!1){let m=!1,e=!1;const t=new ne;t.CheckVisible=!0,t.CheckText="位置情報を初期化",t.SecretEnable=!0;const s=x.setBrowserTitle();await t.showWait(`「${s} 」モードで起動します`)===N.Secret&&(e=!0),m=t.Checked,console.log(`secretMode=[${e}]`),console.log(`cleanMode=[${m}]`),m&&(await(await Rt()).clear(),await(await oe()).clear()),e?(window.EVONA_CONFIG.demo=!1,await ht(x)):ts&&await ht(x)}else x.setBrowserTitle(),await es(x);break}function ss(){const m=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname.startsWith("192.168."),e=m?"./jszip_dist/jszip.min.js":"https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js",t=m?"./jsstore_dist/jsstore.min.js":"https://cdn.jsdelivr.net/npm/jsstore/dist/jsstore.min.js";window.EVONA_CONFIG={isLocal:m,workerFile:"./jsstore_dist/jsstore.worker.min.js",demo:!m};function s(n,i=!1){const o=document.createElement("script");o.src=n,i&&(o.type="module"),o.async=!1,document.head.appendChild(o)}s(e),s(t)}function ns(m){if(m)return!0;const e=document.referrer;console.log(`${e}`);const t="evona_auth",s="granted";return sessionStorage.getItem(t)===s?!0:e.includes("qiita.com")?(sessionStorage.setItem(t,s),!0):!1}

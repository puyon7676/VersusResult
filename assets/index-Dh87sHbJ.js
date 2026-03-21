(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();class ie{constructor(){this.imageRepository="https://puyon7676.github.io/GameImages/",this.imageHome="./Image/",this.user1Home="./User1/",this.user2Home="./User2/",this.currentUserHome="",this.isLocal=!1,this.admin=!1,this.cmd="",this.resMode="",this.dataBasePath="../キャラパースデータ",this.statusJsonPath="",this.zipPrefix="",this.chListFile="",this.chStatusListFile="",this.charStatusZip="./CharStatus.zip",this.nodeToolsImportFilename="./nodeTools.js"}setImageHome(e){if(this.isLocal=e,e)this.imageHome=`${this.currentUserHome}Image/`;else{let t=this.currentUserHome;this.currentUserHome.substring(0,2)==="./"&&(t=this.currentUserHome.substring(2)),this.imageHome=`${this.imageRepository}${t}`}console.log(`imageHome=[${this.imageHome}]`)}setUser(e){this.currentUserHome=e}setPath(){this.currentUserHome===this.user1Home&&(this.statusJsonPath=`${this.dataBasePath}/ぷよクエ_詳細JSON`,this.zipPrefix="puyoQue_",this.chListFile=`${this.currentUserHome}chListFile_puyo.json`,this.chStatusListFile=`${this.currentUserHome}puyoQue_CharStatus.zip`),this.currentUserHome===this.user2Home&&(this.statusJsonPath=`${this.dataBasePath}/メメントモリ_詳細JSON`,this.zipPrefix="memeMori_",this.chListFile=`${this.currentUserHome}chListFile_meme.json`,this.chStatusListFile=`${this.currentUserHome}memeMori_CharStatus.zip`)}get gameTitle(){return this.currentUserHome===this.user1Home?"ぷよクエ":"メメントモリ"}setBrowserTitle(){const e=this.gameTitle;document.head.title=e;for(const t of document.head.children)t.nodeName==="TITLE"&&(t.innerHTML=`EvoNa：${e} モード`);return e}get isWebRunning(){return!(typeof document>"u")}parseURLParams(){if(!this.isWebRunning){console.log("cannot parse URL params!");return}const e=new URLSearchParams(window.location.search);for(const[t,s]of e)switch(t.trim()){case"user":const n=s.trim();this.setUser(n==="1"?this.user1Home:this.user2Home);break;case"debug":break;case"admin":this.admin=s.trim()==="true";break;case"cmd":this.cmd=s;break;case"res":this.resMode=s.trim()==="edit"?"edit":"";break}}async loadJson(e){return console.log(`[loadJson] file=[${e}]`),await this._loadJson(e)}async _loadJson(e){if(this.isWebRunning){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`HTTPエラー! ステータス: ${t.status}`);return await t.json()}else{const{loadJsonNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async saveJson(e,t){const s=JSON.stringify(t);if(this.isWebRunning){const n=new Blob([s],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=e,o.click()}else{const{saveJsonNode:n}=await import(this.nodeToolsImportFilename);return n(e,t)}}async loadBinFile(e){if(this.isWebRunning)return await(await fetch(e)).blob();{const{readBinNode:t}=await import(this.nodeToolsImportFilename);return t(e)}}async getDoc(e){let t,s;if(this.isWebRunning)t=new DOMParser,s=t.parseFromString(e,"text/html");else{const{createHtmlParserNode:n}=await import(this.nodeToolsImportFilename);t=n(e),s=t.parseFromString(e,"text/html")}return s}}const w={None:"None",Ok:"Ok",OkCancel:"OkCancel",YesNo:"YesNo",YesNoCancel:"YesNoCancel"},Q={None:"None",Ok:"Ok",Question:"Question"},b={None:"None",Ok:"Ok",Cancel:"Cancel",Yes:"Yes",No:"No",Secret:"Secret"};class se{constructor(){this.parentName="evona-msg-box",this.buttonType=w.Ok,this.iconType=Q.None,this.title="Confirm",this.btnS="",this.SecretEnable=!1,this.btnOk="OK",this.btnCancel="Cancel",this.btnYes="Yes",this.btnNo="No",this.CheckVisible=!1,this.CheckText="",this.Checked=!1,this.Result=b.None,this.onS1Clicked=e=>{this.Result=b.Secret,this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB1Clicked=e=>{switch(this.buttonType){case w.None:this.Result=b.None;break;case w.Ok:this.Result=b.Ok;break;case w.OkCancel:this.Result=b.Ok;break;case w.YesNo:this.Result=b.Yes;break;case w.YesNoCancel:this.Result=b.Yes;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB2Clicked=e=>{switch(this.buttonType){case w.None:this.Result=b.None;break;case w.Ok:this.Result=b.None;break;case w.OkCancel:this.Result=b.Cancel;break;case w.YesNo:this.Result=b.No;break;case w.YesNoCancel:this.Result=b.No;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)},this.onB3Clicked=e=>{switch(this.buttonType){case w.None:this.Result=b.None;break;case w.Ok:this.Result=b.None;break;case w.OkCancel:this.Result=b.Cancel;break;case w.YesNo:this.Result=b.No;break;case w.YesNoCancel:this.Result=b.Cancel;break}this.setCheckResult(),this.remove(),this.resolver&&this.resolver(this.Result)}}get btnNameS(){return`${this.parentName}-s1`}get btnName1(){return`${this.parentName}-b1`}get btnName2(){return`${this.parentName}-b2`}get btnName3(){return`${this.parentName}-b3`}get chkName1(){return`${this.parentName}-chk1`}setParent(e){this.parentName=`${e}-msg-box`}setTypes(e,t){this.buttonType=e,this.iconType=t}setOk(e=Q.Ok){this.setTypes(w.Ok,e)}setOkCancel(e=Q.Question){this.setTypes(w.OkCancel,e)}setYesNo(e=Q.Question){this.setTypes(w.YesNo,e)}setYesNoCancel(e=Q.Question){this.setTypes(w.YesNoCancel,e)}async showWait(e,t=null){return this.remove(),this.createUI(e,t===null?this.title:t,!0),new Promise(s=>{this.resolver=s;let n=!1,i=!1,o=!1;switch(this.buttonType){case w.None:break;case w.Ok:n=!0,i=!1,o=!1;break;case w.OkCancel:n=!0,i=!0,o=!1;break;case w.YesNo:n=!0,i=!0,o=!1;break;case w.YesNoCancel:n=!0,i=!0,o=!0;break}n&&document.getElementById(this.btnName1)?.addEventListener("click",this.onB1Clicked,{once:!0}),i&&document.getElementById(this.btnName2)?.addEventListener("click",this.onB2Clicked,{once:!0}),o&&document.getElementById(this.btnName3)?.addEventListener("click",this.onB3Clicked,{once:!0}),this.SecretEnable&&document.getElementById(this.btnNameS)?.addEventListener("click",this.onS1Clicked,{once:!0})})}showNoWait(e,t="INFO"){this.remove(),this.createUI(e,t,!1)}showNoWaitEnd(){this.remove()}createUI(e,t,s){let n=`<button id="${this.btnNameS}" class="${this.btnNameS}">${this.btnS}</button>`,i="",o="",a="";switch(this.buttonType){case w.None:break;case w.Ok:i=`<button id="${this.btnName1}">${this.btnOk}</button>`,o="";break;case w.OkCancel:i=`<button id="${this.btnName1}">${this.btnOk}</button>`,o=`<button id="${this.btnName2}">${this.btnCancel}</button>`;break;case w.YesNo:i=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`;break;case w.YesNoCancel:i=`<button id="${this.btnName1}">${this.btnYes}</button>`,o=`<button id="${this.btnName2}">${this.btnNo}</button>`,a=`<button id="${this.btnName3}">${this.btnCancel}</button>`;break}let l="";this.CheckVisible&&(l=`
<div style="padding: 5px 10px; font-size: 0.9em; text-align: left;">
    <label>
        <input type="checkbox" id="${this.chkName1}">${this.CheckText}
    </label>
</div>
`.trim());const r=`${l}${i}${o}${a}`,c=r!==""?`<div class="msg-footer">${r}</div>`:"",h=document.createElement("div");h.id=this.parentName,h.innerHTML=`
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
            `.trim(),document.head.appendChild(t)}setCheckResult(){const e=document.getElementById(this.chkName1);if(e!==null){const t=e.checked;console.log(`[setCheckResult] ${t}`),this.Checked=t}}remove(){document.getElementById(this.btnName1)?.removeEventListener("click",this.onB1Clicked),document.getElementById(this.btnName2)?.removeEventListener("click",this.onB2Clicked),document.getElementById(this.btnName3)?.removeEventListener("click",this.onB3Clicked),document.getElementById(this.btnNameS)?.removeEventListener("click",this.onS1Clicked),document.getElementById(this.parentName)?.remove()}}class qe{constructor(){this.tblNameCharImages="CharImages",this.tblCharImages={name:this.tblNameCharImages,columns:{ns:{dataType:"string",index:!0},name:{dataType:"string"},fileName:{dataType:"string",index:!0},fileData:{dataType:"object"}}},this.tblNameSettings="Settings",this.tblSettings={name:this.tblNameSettings,columns:{key:{dataType:"string",primaryKey:!0},value:{dataType:"string"}}},this.dbName="EvonaDB",this.db={name:this.dbName,tables:[this.tblCharImages,this.tblSettings]}}init(e){this.connection=new JsStore.Connection(new Worker(e)),console.log("connection started")}async term(){await this.connection.terminate(),console.log("connection terminated")}async initDb(){const e=await this.connection.initDb(this.db);return console.log(e?"Db Created & connection is opened":"Db connection is opened"),e}async dropDb(){let e=!1;return await this.connection.dropDb().then(function(){console.log("Db deleted successfully"),e=!0}).catch(function(){console.error("dropDb error")}),e}async deleteAllRecords(e){await this.connection.clear(e),console.log("all record deleted successfully")}get defWorkerFile(){return window.EVONA_CONFIG.workerFile}}class nt extends qe{async insert(e,t,s){await this.connection.insert({into:this.tblNameCharImages,values:[{ns:t,name:"",fileName:e,fileData:s}]})}async insertZipFile(e){await this.connection.insert({into:this.tblNameCharImages,values:[{ns:e.ns,name:e.name,fileName:e.name,fileData:e.fileData}]})}async insertMultiple(e){const t=e.map(s=>({ns:s.ns,name:"",fileName:s.fileName,fileData:s.blob}));return await this.connection.insert({into:this.tblNameCharImages,values:t,upsert:!0})}async selectBlob(e,t){try{var s=await this.connection.select({from:this.tblNameCharImages,where:{ns:e,fileName:t}});return s.length>=1?s[0].fileData:null}catch(n){console.error("[selectBlob] JsStore Select Error:",n)}return null}async selectBlobByNs(e){try{var t=await this.connection.select({from:this.tblNameCharImages,where:{ns:e}});const s=new Map;for(const n of t)s.set(n.fileName,n.fileData);return t.length>=1?s:null}catch(s){console.error("[selectBlobByNs] JsStore Select Error:",s)}return null}async selectNs(e){try{var t=await this.connection.select({from:this.tblNameCharImages,where:{fileName:e}});return t.length>=1?t[0].ns:null}catch(s){console.error("[selectNs] JsStore Select Error:",s)}return null}async countNs(e){try{return await this.connection.count({from:this.tblNameCharImages,where:{ns:e}})}catch(t){console.error("[countNs] JsStore Select Error:",t)}return-1}}class ze extends qe{async insert(e,t){await this.connection.insert({into:this.tblNameSettings,values:[{key:e,value:t}],upsert:!0})}async insertMultiple(e){const t=e.map(s=>({key:s.key,value:s.value}));return await this.connection.insert({into:this.tblNameSettings,values:t,upsert:!0})}async selectKey(e){try{var t=await this.connection.select({from:this.tblNameSettings,where:{key:e}});return t.length>=1?t[0].value:null}catch(s){console.error("[selectKey] JsStore Select Error:",s)}return null}async countKey(e){try{return await this.connection.count({from:this.tblNameSettings,where:{key:e}})}catch(t){console.error("[countKey] JsStore Select Error:",t)}return-1}async clear(){await this.deleteAllRecords(this.tblNameSettings)}}class Ge{constructor(){this.table=new ze}init(){const e=new ze;e.init(e.defWorkerFile),e.initDb(),this.table=e}async saveDialogPos(e){const t=e.parentElement,s=`${t?.className},${t?.style.left},${t?.style.top}`;await this.table.insert(e.className,`${s}`)}async loadDialogPos(e){const t=e.parentElement,s=await this.table.selectKey(e.className);if(s!==null){const n=s.split(",");n.length===3&&t!==null&&n[0]===t.className&&(t.style.left=n[1],t.style.top=n[2])}}async clear(){this.table.clear()}}async function it(m){const e=m.cmd.split(":"),t=window.EVONA_CONFIG.workerFile,s=new nt;s.init(t),await s.initDb();let n=!1;switch(e[0]){case"countns":const o=e.length>=2?e[1]:"";n=await s.countNs(o);break;case"drop":n=await s.dropDb();break}const i=`[${m.cmd}] res=${n}`;alert(i)}class ot{constructor(){this.imageHome="",this.cache=new Map,this.cacheNs=new Map,this.zip=null,this.zipNs=new Map,this.isMultiZip=!1,this.AnyNs=""}async setupNs(e,t,s){const n=s.findByNs(e);if(n===void 0)return;this.imageHome=t.imageHome;for(const o of n){const a=o.iconFileName,l=`${this.imageHome}${e}/${a}`;this.cache.set(a,l),this.cacheNs.set(a,e)}this.isMultiZip=!0;const i=[{ns:"",fileName:"plus.png"},{ns:"",fileName:"win.png"},{ns:"",fileName:"even.png"},{ns:"",fileName:"lost.png"},{ns:"",fileName:"demo.png"}];for(const o of i){const a=o.fileName,l=`${this.imageHome}${o.ns}/${a}`;this.cache.set(a,l),this.cacheNs.set(a,e)}}async checkExists(e){try{return(await fetch(e,{method:"HEAD"})).ok}catch{return!1}}isMaterial(e){return!!(e.includes("plus.png")||e.includes("win.png")||e.includes("even.png")||e.includes("lost.png"))}get loaded(){return this.isMultiZip?this.zipNs.size!==0:this.zip!==null}async _loadZipBy(e,t){const s=new ie;this.imageHome=s.imageHome.substring(2);const n=await s.loadBinFile(e);let i=null;if(s.isWebRunning)i=await window.JSZip.loadAsync(n);else{const{loadZipNode:o}=await import(s.nodeToolsImportFilename);i=await o(n)}this.zipNs.set(t,i),this.isMultiZip=!0}async getImageUrlBy(e,t){if(this.cache.has(e)){const s=this.cache.get(e);if(!await this.checkExists(s)){const i=`${this.imageHome}notexist.png`;this.cache.set(e,i)}return this.cache.get(e)}return null}async findNs(e){if(!this.isMultiZip)return null;if(this.cacheNs.has(e)){const t=this.cacheNs.get(e);if(t!==void 0)return t}return null}dispose(){for(const e of this.cache.values())URL.revokeObjectURL(e);this.cache.clear()}}class ce{constructor(){this.cancel=!1,this.targetId="",this.classify="",this.selectedValue="",this.Keydown=""}}const me={Enter:"Enter",Escape:"Escape",Tab:"Tab",Process:"Process"},I={Btn:"Btn",Img:"Img",Label:"Label",LabelRO:"LabelRO",Combo:"Combo",Input:"Input",Plain:"Plain",Table:"Table"};class Se{constructor(){this.imgSrc="",this.imgFile="",this.alt=""}}class Je{constructor(){this.selectedItem="",this.selectionPair=[],this.classify=""}}class we{constructor(){this.type="text",this.placeholder=""}}class at{constructor(){this.typeInfo=new We,this.className=""}}class je{constructor(){this.items=new Array}makeItems(e=1){this.items.length>0&&this.items.splice(0,this.items.length);for(let t=0;t<e;t++){const s=new at;this.items.push(s)}}ToHTML(){let e="";for(const t of this.items){let s="";switch(t.typeInfo.using.itemType){case I.Btn:s=t.typeInfo.ToButtonHTML(t.className);break;case I.Label:s=t.typeInfo.ToLableHTML(t.className);break;case I.LabelRO:s=t.typeInfo.ToLableROHTML(t.className);break;case I.Combo:s=t.typeInfo.ToComboHTML(t.className);break;case I.Input:s=t.typeInfo.ToInputHTML(t.className);break;case I.Img:s=t.typeInfo.ToImgHTML(t.className,t.typeInfo.using.img.alt);break;case I.Plain:s=t.typeInfo.using.innerHTML;break}s!==""&&(this.items.length>=2?e=`${e}<div>${s}</div>`:e=s)}return e}}class $e{constructor(){this.cols=new Array}makeCols(e){this.cols.length>0&&this.cols.splice(0,this.cols.length);for(let t=0;t<e;t++){const s=new je;s.makeItems(),this.cols.push(s)}}ToHTML(){let e="";for(const t of this.cols){let s="";s=t.ToHTML(),s!==""&&(e=`${e}<td>${s}</td>`)}return e}toTemplate(){const e=new $e;for(const t of this.cols){const s=new je;s.makeItems(t.items.length);let n=-1;for(const i of t.items){n++;const o=s.items[n];o.className=i.className,o.typeInfo.toolTip=i.typeInfo.toolTip,o.typeInfo.using.itemType=i.typeInfo.using.itemType,o.typeInfo.using.label=i.typeInfo.using.label,o.typeInfo.using.combo=i.typeInfo.using.combo,o.typeInfo.using.innerHTML=i.typeInfo.using.innerHTML,o.typeInfo.using.img=i.typeInfo.using.img}e.cols.push(s)}return e}}class de{constructor(){this.tableName="",this.rows=new Array,this.template=null,this.invalidRowIndex=-1,this.firstRowIndex=1}makeDim(e,t){for(let s=0;s<t;s++){const n=new $e;n.makeCols(e),this.rows.push(n)}}growCell(e,t=1){const s=this.rows.length;for(let n=0;n<s;n++)this.rows[n].cols[e].makeItems(t)}getCell(e,t,s=0){return this.rows[t].cols[e].items[s]}ToHTML(e="",t){this.tableName=e;let s="";for(const o of this.rows){let a="";a=o.ToHTML(),a!==""&&(s=`${s}<tr>${a}</tr>`)}const n=e!==""?` class="${e}"`:"",i=t!==""?` item-id="${t}"`:"";return s=`<table${n}${i}>${s}</table>`,s}ToScrollHTML(e="",t){const s=e!==""?` class="${e}"`:"",n=t!==""?` item-id="${t}"`:"";return`<div${s}${n}>
${this.ToHTML(e,t)}
</div>`}makeRowTemplate(){this.rows.length>=1&&(this.template=this.rows[0].toTemplate())}clearRows(){this.rows=new Array}addRow(e){const t=this.getTable();if(t===null)return-1;const s=t.insertRow(-1),n=t.rows.length;if(s.className=e,s.setAttribute("item-id",`${n}`),this.template!==null&&this.template.cols.length>=1){const i=this.template.toTemplate();let o="";for(const a of i.cols){let l="";for(const r of a.items){r.typeInfo.using.itemId=n;let c="";switch(r.typeInfo.using.itemType){case I.Btn:c=r.typeInfo.ToButtonHTML(r.className);break;case I.Label:c=r.typeInfo.ToLableHTML(r.className);break;case I.LabelRO:c=r.typeInfo.ToLableROHTML(r.className);break;case I.Combo:c=r.typeInfo.ToComboHTML(r.className);break;case I.Input:c=r.typeInfo.ToInputHTML(r.className);break;case I.Img:c=r.typeInfo.ToImgHTML(r.className,r.typeInfo.using.img.alt);break;case I.Plain:c=r.typeInfo.using.innerHTML;break}c!==""&&(a.items.length>=2?l=`${l}<div>${c}</div>`:l=c)}l!==""&&(o=`${o}<td>${l}</td>`)}return s.innerHTML=o,n}return-1}deleteRow(e){const t=this.getTable();if(t===null)return!1;for(const s of t.rows){const n=s.getAttribute("item-id");if(n!==null&&n===`${e}`)return t.deleteRow(e-this.firstRowIndex),!0}return!1}redimAllRows(){const e=this.getTable();if(e===null)return;let t=this.firstRowIndex-1;for(const s of e.rows)if(s.getAttribute("item-id")!==null){t++,s.setAttribute("item-id",`${t}`);for(const i of s.cells)for(const o of i.children)o.getAttribute("item-id")!==null&&o.setAttribute("item-id",`${t}`)}}selectRow(e){const t=this.getTable();if(t!==null&&!(e<=0)&&!(e>t.rows.length)){for(const s of t.rows)s.classList!==void 0&&s.classList.remove("selected");t.rows[e-1].classList.add("selected")}}getSelectedRow(){const e=this.getTable();if(e===null)return this.invalidRowIndex;for(const t of e.rows)if(t.classList!==void 0&&t.classList.contains("selected")){const s=t.getAttribute("item-id");return s!==null?parseInt(s):this.invalidRowIndex}return this.invalidRowIndex}updateRowImage(e,t){const n=this.getTable()?.querySelector(`tr[item-id="${e}"] img`);n instanceof HTMLImageElement&&(n.src=t)}scroll(e){const t=this.getTable();if(t===null||e<=0||e>t.rows.length)return null;const s=t.querySelector(`tr[item-id="${e}"] img`);return s===null||s===void 0?null:(s.scrollIntoView({behavior:"smooth",block:"center"}),s)}getRowElem(e){const t=this.getTable();if(t===null)return null;for(const s of t.rows){const n=s.getAttribute("item-id");if(n!==null&&n===`${e}`)return console.log(`match row id : ${n}`),t.rows[e-this.firstRowIndex]}return null}getCellElems(e){if(e===null)return null;const t=new Array;for(const s of e.cells){if(s===null)continue;const n=new Array;for(const i of s.children)n.push(i);t.push(n)}return t}getTable(){const e=`.${this.tableName}`,t=document.querySelectorAll(e);if(t===null||t.length<=0)return null;const n=t[0].querySelectorAll(e);return n===null||n.length<=0?null:n[0]}HorzCSS(e){return`
.${e} {
  width: 1000px;
  overflow-x: auto; white-space: nowrap;
}`}VertCSS(e){return`
.${e} {
  height: 300px; overflow-y: auto;
}`}}class lt{constructor(){this.itemType=I.Img,this.itemId=-1,this.label="",this.innerHTML=""}}class We{constructor(){this.toolTip="",this.using=new lt}setButton(e){this.using.itemType=I.Btn,this.using.label=e}setLabel(e,t){this.using.itemType=t?I.Label:I.LabelRO,this.using.label=e}setCombo(e){this.using.itemType=I.Combo,this.using.combo=e}setInput(e){this.using.itemType=I.Input,this.using.input=e}setImg(e){this.using.itemType=I.Img,this.using.img=e}setPlain(e){this.using.itemType=I.Plain,this.using.innerHTML=e}setTable(e){this.using.itemType=I.Table,this.using.innerHTML=e}ToButtonHTML(e){const t=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"";return`
<button class="${e}"${t}>${this.using.label}</button>
`.trim()}ToLableHTML(e){return`
<span class="${e}" data-readonly="false">${this.using.label}</span>
`.trim()}ToLableROHTML(e){return`
<span class="${e}" data-readonly="true">${this.using.label}</span>
`.trim()}ToComboHTML(e){if(this.using.combo===void 0)return"";const t=this.using.combo;let s=D.makeComboItemsHTML(t);const n=t.classify!==""?` data-classify="${t.classify}"`:"";return`
<select class="${e}" ${n}>
  ${s}
</select>
`.trim()}ToInputHTML(e){if(this.using.input===void 0)return"";const t=this.using.input,s=this.using.itemId>=0?` item-id="${this.using.itemId}"`:"",n=t.placeholder!==""?` placeholder="${t.placeholder}"`:"";return`
<input type="${t.type}" class="${e}"${s}${n}>
`.trim()}ToImgHTML(e,t){let s="";return this.using.img.imgSrc===""?s=`src="" data-filename="${this.using.img.imgFile}"`:s=`src="${this.using.img.imgSrc}"`,`
<img class="${e}" ${s} alt="${t}">
`.trim()}ToOverlayHTML(){return`<div class="overlay" title="${this.toolTip}"></div>`}}class rt{constructor(){this.name="",this.id="",this.className="",this.option=new We}}class D{constructor(){this.props=new rt}ToHTML(e){let t="",s="";switch(e.option.using.itemType){case I.Label:t=e.option.ToLableHTML(e.className),s=e.option.ToOverlayHTML();break;case I.LabelRO:t=e.option.ToLableROHTML(e.className);break;case I.Plain:t=`
${e.option.using.innerHTML}
`.trim();break;case I.Combo:t=e.option.ToComboHTML(e.className);break;case I.Input:t=e.option.ToInputHTML(e.className);break;case I.Img:t=e.option.ToImgHTML(e.className,e.option.using.img.alt),s=e.option.ToOverlayHTML();break}return`
  ${t}
  ${s}
`.trim()}MakeSelectableHTML(){return`
<div class="${this.props.name}" item-id="${this.props.id}">
${this.ToHTML(this.props)}
</div>
`.trim()}static makeComboItemsHTML(e){if(e.selectionPair===void 0||e.selectionPair.length<=0)return"";let t="";for(const s of e.selectionPair){let[n,i]=s.split("/");i=i.trim();const o=e.selectedItem===i?" selected":"",a=`
<option value="${i}"${o}>${n}</option>
`.trim();t+=a}return t}}class F{constructor(){this._defaultButtonsName="dialog-buttons",this._defaultToolButtonsName="dialog-tool-btns",this._enableScrollEvt=!1,this._scrollTimer=null,this._isScrolling=!1,this.onButtonClicked=e=>{const t=e.target;if(t===null)return;const s=t.tagName==="BUTTON"?t:t.parentElement;if(s===null)return;let n=this.supplessSelected(s.className);if(n!==""){n=`.${n}`;const o=document.querySelectorAll(`${n}.selected`);o!==null&&o.forEach(a=>a.classList.remove("selected")),s.classList.add("selected")}const i=s.getAttribute("item-id");if(i){const o=this.itemList.find(a=>`${a.props.id}`===i);if(o){if(o.props.option.onSelect){let a="";t.tagName==="BUTTON"&&(a=t.getAttribute("item-id"),a===null&&(a=""));const l=new ce;l.item=o,l.targetId=a,o.props.option.onSelect(l)}this.selectedCh=o}else{let a=this.getTopElement(t);if(a?.tagName==="TABLE"){const l=a.className,r=this.itemList.find(c=>c.props.className===l);if(r){if(r.props.option.onSelect){let c="";t.tagName==="BUTTON"&&(c=t.getAttribute("item-id"),c===null&&(c=""));const h=new ce;h.item=r,h.targetId=c,h.classify=this.supplessSelected(t.className),r.props.option.onSelect(h)}this.selectedCh=r}}}}},this.onInputKeydown=e=>{const t=e.target;if(t===null||t.tagName!=="INPUT")return;const s=t,n=e;switch(n.key){case me.Enter:console.log("確定して次へ！"),n.preventDefault();break;case me.Escape:s.value="元の値",s.blur();break;case me.Tab:break;case me.Process:return}const i=t.getAttribute("item-id");if(i){let o=this.getTopElement(t);if(o?.tagName==="TABLE"){const a=o.className,l=this.itemList.find(r=>r.props.className===a);if(l){const r=new ce;r.item=l,r.targetId=i,r.classify=this.supplessSelected(t.className),r.Keydown=n.key,l.props.option.onSelect(r)}}}},this.itemList=new Array}add(e){this.itemList.push(e)}get DefaultBlueColor(){return"#86aef7e6"}get DefaultYellowColor(){return"#f7eb86e6"}get DefaultBorderColor(){return"#2c3e50ff"}MakeDefaultDialogParentCss(e,t,s,n=0){return`
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
`.trim()}ToHTML(){let e="";for(const t of this.itemList){if(t.props.option.using.itemType===I.Table){e+=t.props.option.using.innerHTML;continue}e+=t.MakeSelectableHTML()}return`${e}`}MakeScrollableList(e){let t="";for(const s of this.itemList)t+=s.MakeSelectableHTML();return`<div id="${e}" class="${e} scroll">
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
`.trim(),document.head.appendChild(s),!0}hideFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.add("hidden")}showFullScreenCss(e){const t=document.getElementById(e);t&&t.classList.remove("hidden")}getFullScreenMsgElem(e){const t=document.getElementById(e);if(t){const s=t.querySelectorAll("p");return s!==null&&s.length>=1?s[0]:null}return null}initObserver(e,t){const s=document.getElementById(e);if(!s)return;const n=async a=>{await a.forEach(async l=>{if(l.isIntersecting){const r=l.target,c=this.isDemo&&!t.isMaterial(r.dataset.filename)?"demo.png":r.dataset.filename;if(console.log("見えた！:",r.dataset.filename),c&&r.src===""||r.src.startsWith(window.location.origin)){const h=await t.findNs(c);h===null||h===""?(this.observer.unobserve(r),console.log(`cannot set image : ${c}`)):await t.getImageUrlBy(c,h).then(p=>{p!==null?(r.src=p,this.observer.unobserve(r)):console.log(`pending set image : ${c}`)})}}})},i={root:s,rootMargin:"0px",threshold:.1};this.observer=new IntersectionObserver(n,i),s.querySelectorAll("img[data-filename]").forEach(a=>this.observer.observe(a)),console.log("[initObserver] enabled!")}get isDemo(){return window.EVONA_CONFIG.demo}get isScrolling(){return this._enableScrollEvt?!(this._scrollTimer!==null&&this._isScrolling):!1}enableScrollEvent(e){this._isScrolling=!1;const t=document.getElementById(e);return t?(this._enableScrollEvt=!0,t.addEventListener("scroll",()=>{this._isScrolling=!0,clearTimeout(this._scrollTimer),this._scrollTimer=setTimeout(()=>{this._scrollTimer=null,this._isScrolling=!1;const s=this.observer.takeRecords();console.log(`[enableScrollEvent] stopped ${s.length}`)},200)}),console.log("[enableScrollEvent] enabled!"),!0):!1}enableEvents(e){const t=`.${e}`;document.querySelectorAll(`${t}`).forEach(n=>{const i=n.querySelectorAll("img");i.length>=1&&(i[0],this.addButtonEvent(t,n));const o=n.querySelectorAll("span");o.length>=1&&o[0]?.dataset.readonly=="false"&&this.addButtonEvent(t,n);const a=n.querySelectorAll("select");a.length>=1&&(a[0],this.addSelectEvent(t,n));const l=n.querySelectorAll("table");l.length>=1&&(l[0],n.addEventListener("click",this.onButtonClicked),n.addEventListener("keydown",this.onInputKeydown))})}addButtonEvent(e,t){t.getAttribute("item-id")&&t.addEventListener("click",this.onButtonClicked)}addInputEvent(e,t){t.getAttribute("item-id")&&t.addEventListener("keydown",this.onInputKeydown)}addSelectEvent(e,t){t.addEventListener("change",s=>{const n=s.target,i=n?.dataset.classify,o=t.getAttribute("item-id");if(o){let a=this.itemList.find(l=>`${l.props.id}`===o);if(a===void 0&&(a=this.itemList.find(l=>`${i}${l.props.id}`===o)),a){if(a.props.option.onSelect){const l=new ce;l.item=a,l.targetId=o,l.classify=i===void 0?"?":i,l.selectedValue=n.value,a.props.option.onSelect(l)}this.selectedCh=a}}})}supplessSelected(e){let t=e,s=e.indexOf(" selected");return s>=0&&(t=e.substring(0,s)),t}getTopElement(e){let t=e.parentElement;for(;t!==null;){if(t.tagName==="TD"){t=t.parentElement;continue}if(t.tagName==="TR"){t=t.parentElement;continue}if(t.tagName==="TBODY"){t=t.parentElement;continue}break}return t}GetIdByIndex(e){return this.itemList[e].props.id}UnselectAll(e){const t=`.${e}`;document.querySelectorAll(`${t}.selected`).forEach(s=>s.classList.remove("selected"))}SelectByID(e,t){const s=this.FindByID(e,t);if(s){s.classList.add("selected");const n=s.getAttribute("item-id");if(n){const i=this.itemList.find(o=>`${o.props.id}`===n);i&&(this.selectedCh=i)}return s}return null}FindDivByClassName(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.querySelectorAll("div");for(const a of o)if(a.className===t||a.className.startsWith(t))return a}return null}FindByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t)return i}return null}FindImgByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const a=i.querySelectorAll("img");return a.length>=1?a[0]:null}}return null}FindImgsByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const a=i.querySelectorAll("img");return a.length>=1?a:null}}return null}FindDivByID(e,t){const s=`.${e}`,n=document.querySelectorAll(`${s}`);for(const i of n){const o=i.getAttribute("item-id");if(o&&o===t){const a=i.querySelectorAll("div");return a.length>=1?a[0]:null}}return null}FindSelectByID(e,t,s){const n=`.${e}`,i=document.querySelectorAll(`${n}`);for(const o of i){const a=o.getAttribute("item-id");if(a&&a===t){const l=o.querySelectorAll("select");if(l.length>=1){for(const r of l)if(r?.dataset.classify===s)return r}return null}}return null}ReplaceImg(e,t,s){const n=this.FindImgByID(e,t);return n===null?null:(n.dataset.filename,n.src=s,n)}ReplaceDivToolTip(e,t,s){const n=this.FindDivByID(e,t);return n===null?null:(n.title=s,n)}ReplaceImgToolTip(e,t,s){const n=this.FindImgByID(e,t);return n===null?null:(n.title=s,n)}SetImgSrc(e,t){if(e===null)return null;e.dataset.filename,e.src=t}SetImgSize(e,t,s){if(e===null)return null;e.style.width=`${t}px`,e.style.height=`${s}px`}ReplaceComboItems(e,t,s){const n=this.FindSelectByID(e,t,s.classify);if(n===null)return null;n.querySelectorAll("option").length>=1&&(n.innerHTML="");const o=D.makeComboItemsHTML(s);return o!==""&&(n.innerHTML=o),n}copyCssToInlineStyle(e,t){for(const s of document.styleSheets){let n;try{n=s.cssRules}catch{continue}for(const i of n)if(i instanceof CSSStyleRule&&i.selectorText===e){const o=i.style;console.log(`[copyCssToInlineStyle] coping [${e}]`);for(let a=0;a<o.length;a++){const l=o[a],r=o.getPropertyValue(l);t.style.setProperty(l,r),console.log(`[copyCssToInlineStyle] copied [${l}]=[${r}]`)}return}}}}const ee={Hide:"Hide",MoveLowest:"MoveLowest"};class O{constructor(){this.title="",this.dlgName="",this.B3Type=ee.MoveLowest,this.nMove=4,this.initLeft=0,this.initTop=0,this.moveLeft=0,this.moveTop=0,this.mover=new ct,this.moverOnMoveDone=async()=>{this.onMoveDone!==void 0&&await this.onMoveDone(this.dlg)}}NewDialog(e,t,s=ee.MoveLowest){this.dlgName=t,this.B3Type=s;const n=document.createElement("dialog");n.id=t,n.className=t;const i=document.getElementById(e);return i.appendChild(n),this.dlgParent=i,this.dlg=n,n}SetContent(e,t){const s=this.dlg,n=`<button id="${this.toolNameB0}">[＊]</button>`;`${this.toolNameB1}`,`${this.toolNameB2}`;let i="";this.B3Type===ee.MoveLowest&&(i=`<button id="${this.toolNameB3}">[_]</button>`);const o=`${n}${i}`;let a="";this.title!==""?a=`<div class="${this.titleName}">${this.title}${o}</div>`:a=`<div class="${this.titleName}">${o}</div>`;const l=document.createElement("div");l.innerHTML=a,s.innerHTML=t;const r=document.getElementById(e);r.hidden=!0,r.appendChild(l),r.appendChild(s),this.applyCss()}EnableEventHandlers(){const e=this.dlgParent.style.left,t=this.dlgParent.style.top;this.initLeft=parseInt(e.substring(0,e.length-2)),this.initTop=parseInt(t.substring(0,t.length-2)),this.moveLeft=0,this.moveTop=0,console.log(`[EnableEventHandlers] ${this.dlgParent.id}::(${e},${t})::(${this.initLeft},${this.initTop})`);const s=document.getElementById(`${this.toolNameB0}`);s!==null&&(this.mover.onMoveDone=this.moverOnMoveDone,this.mover.attach(s,this.dlgParent));const n=document.getElementById(`${this.toolNameB1}`);n!==null&&(n.onclick=async()=>{this.dlgParent!==void 0&&(this.moveLeft++,this.moveLeft>=this.nMove&&(this.moveLeft=0),this.dlgParent.style.left=`${this.initLeft+this.moveLeft*100}px`)});const i=document.getElementById(`${this.toolNameB2}`);i!==null&&(i.onclick=async()=>{this.dlgParent!==void 0&&(this.moveTop++,this.moveTop>=this.nMove&&(this.moveTop=0),this.dlgParent.style.top=`${this.initTop+this.moveTop*100}px`)}),this.B3Type===ee.MoveLowest&&(document.getElementById(`${this.toolNameB3}`).onclick=async()=>{if(this.dlgParent===void 0)return;new y().MoveLowestLayer(this.dlgParent)})}static GetDialogInfo(e){const t=this.FindDialogParent(e);if(t===null)return null;const s=t.querySelector("dialog");if(s===null)return null;const n=new X,i=s.clientWidth,o=s.clientHeight;return n.name=e,n.left=t.style.left,n.top=t.style.top,n.width=`${i}px`,n.height=`${o}px`,n}static SetDialogInfo(e){const t=this.FindDialogParent(e.name);if(t===null)return!1;const s=t.querySelector("dialog");return s===null?!1:(t.style.left=e.left,t.style.top=e.top,s.style.width=e.width,s.style.height=e.height,!0)}static FindDialogParent(e){const t=document.getElementById(e);return t??null}get titleName(){return`${this.dlgName}-dlg-title-00`}get toolNameB0(){return`${this.dlgName}-dlg-tool-b0`}get toolNameB1(){return`${this.dlgName}-dlg-tool-b1`}get toolNameB2(){return`${this.dlgName}-dlg-tool-b2`}get toolNameB3(){return`${this.dlgName}-dlg-tool-b3`}applyCss_old(){const e=document.createElement("style");e.textContent=`
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
    cursor: pointer;
    transition: background 0.2s;
}

/* 1. まず共通のホバー設定を「B3以外」にも効くように整理 */
.${this.titleName} button:hover {
    background: #888; /* 共通のホバー色 */
}

/* 2. B3ボタン自体の背景色（ID指定は強いので、これで上書きされます） */
#${this.toolNameB3} { 
    background: #9c27b0; 
}

/* 3. 【重要】B3ボタン自体のホバー設定 */
#${this.toolNameB3}:hover { 
    background: #e1bee7; /* 黄色に映える薄紫などに変えるとポップです！ */
}
`.trim(),document.head.appendChild(t)}}class X{constructor(){this.name="",this.left="",this.top="",this.width="",this.height=""}copyTo(e){e.name=this.name,e.left=this.left,e.top=this.top,e.width=this.width,e.height=this.height}}class y{add(e){y.dlgElems.push(e)}AddDialogs(){y.dlgElems=new Array;const e=document.querySelectorAll("div");for(const t of e)t.style.zIndex!==""&&(parseInt(t.style.zIndex)>=y.ignoreIndex||t.querySelector("dialog")&&(console.log(`${t.id} added!`),this.add(t)))}AssignIndexies(){let e=y.dlgElems.length-1;for(const t of y.dlgElems)t.style.zIndex=`${e}`,e--}MoveLowestLayer(e){y.dlgElems.length;for(const t of y.dlgElems)if(t.id===e.id)t.style.zIndex="0";else{const s=t.style.zIndex;t.style.zIndex=`${parseInt(s)+1}`}}MoveHiestLayer(e){y.dlgElems.length;let t=-1;for(const s of y.dlgElems){const n=parseInt(s.style.zIndex);n>=y.ignoreIndex||n>t&&(t=n)}for(const s of y.dlgElems)if(s.id===e.id){s.style.zIndex=`${t}`;break}for(const s of y.dlgElems)if(s.id!==e.id){if(parseInt(s.style.zIndex)>=y.ignoreIndex)continue;t--,s.style.zIndex=`${t}`}}FindByName(e){const t=y.dlgElems.find(s=>s.id===e);return t||null}async ForEachAsync(e){for(const t of y.dlgElems)t.parentNode!==null&&await e(t.id)}ReOrder(){y.dlgElems.sort((e,t)=>{const s=e.style.zIndex,n=t.style.zIndex;if(s===""||n==="")throw new Error("z-index が未設定の要素が混入しています");return parseInt(t.style.zIndex)-parseInt(e.style.zIndex)})}async SaveSetting(e,t=!0){if(e!==null&&e.parentElement!==null){if(t&&this.FindByName(e.parentElement.className)===null){console.log(`${e.className} is out of managed dlg`);return}this.initSetting(),await y.setingAccess.saveDialogPos(e)}}async LoadAllSetting(){this.initSetting();for(const e of y.dlgElems){const t=e.querySelector("dialog");t!==null&&await y.setingAccess.loadDialogPos(t)}}async loadSetting(e){this.initSetting(),e!==null&&await y.setingAccess.loadDialogPos(e)}initSetting(){y.setingAccess===null&&(y.setingAccess=new Ge,y.setingAccess.init())}}y.ignoreIndex=1e3;y.setingAccess=null;class ct{constructor(){this.isDragging=!1,this.startX=0,this.startY=0}attach(e,t){e.onpointerdown=s=>{e.setPointerCapture(s.pointerId),this.isDragging=!0,this.startX=s.clientX-t.offsetLeft,this.startY=s.clientY-t.offsetTop,e.style.cursor="grabbing"},e.onpointermove=s=>{if(!this.isDragging)return;const n=s.clientX-this.startX,i=s.clientY-this.startY;t.style.left=`${n}px`,t.style.top=`${i}px`,t.style.margin="0"},e.onpointerup=async s=>{this.isDragging=!1,e.releasePointerCapture(s.pointerId),e.style.cursor="grab",this.onMoveDone!==void 0&&await this.onMoveDone()}}}const x={None:"None",CnsRed:"CnsRed",CnsBlue:"CnsBlue",CnsGreen:"CnsGreen",CnsYellow:"CnsYellow",CnsViolet:"CnsViolet",CnsWhite:"CnsWhite",CnsBlack:"CnsBlack"},he={RlAttacker:"RlAttacker",RlHealer:"RlHealer",RlDebuffer:"RlDebuffer",RlBuffer:"RlBuffer"};class _{get iconFileName(){return this.id===null&&!Number.isNaN(this.id)?`${this.name}_${this.idAsText}.png`:`${this.name}_${this.id}.png`}constructor(e=0,t=""){this.ns=x.None,this.id=0,this.name="",this.contentURL="",this.iconURL="",this.idAsText="",this.idAttributeForHTML="",this.id=e,this.name=t}parseFromImgName(e){let t=e.indexOf("_");if(t>=0){const s=e.substring(0,t);let n=e.substring(t+1);if(t=n.indexOf("."),t>=0)return n=n.substring(0,t),this.id=Number.parseInt(n),this.name=s,this.idAsText=Number.isNaN(this.id)?n:"",!0}return!1}}class mt{constructor(){this.itemName="",this.chNames=new Array,this.index=-1}reset(){this.itemName="",this.chNames=new Array,this.index=-1,this.onScroll=null}toCombo(e,t,s){this.reset();const n=`.${e}`,i=document.querySelectorAll(`${n} div[title*="${s}"]`);let o=-1,a="";for(const r of i){const c=r;console.log(c.title),o++;const h=c.title.trim(),p=h,$=`
 <option value="${h}"${o===0?" selected":""}>${p}</option>
`.trim();a+=$,this.chNames.push(p)}if(o===-1)return null;const l=document.createElement("select");return l.id=t,l.className=t,l.innerHTML=a,this.itemName=e,l}addEvent(e,t){e.addEventListener("change",s=>{const i=s.target.value;this.chNames.find(a=>a===i)&&this.scrollAction(i)}),this.onScroll=t}findFirst(){return this.chNames.length===0?!1:(this.index=0,this.scrollAction(this.chNames[this.index]),!0)}scroll(e){const t=`.${this.itemName}`,s=document.querySelector(`${t} div[title="${e}"]`);if(s===null)return null;const n=s.closest(t);return n===null?null:(n.scrollIntoView({behavior:"smooth",block:"center"}),s)}scrollAction(e){const t=this.scroll(e);t&&this.onScroll!==null&&this.onScroll(t)}}class te{constructor(){this.uiInfo=new X,this.charFinder=new mt,this.parentName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new y().SaveSetting(e)}}MakeList(){}async LoadList(e){const n=(await new ie().loadJson(e)).map(o=>Object.assign(new _,o)),i=new te;return i.chList=n,this.uiInfo.copyTo(i.uiInfo),i}findByNs(e){return e===x.None?void 0:this.chList.filter(s=>s.ns===e)}async toHTML(e){if(!this.chList)return"";this.htmlMaker=new F;let t=0;for(const s of this.chList){t++;const n=`chuid${t}`;s.idAttributeForHTML=n;const i="",o=new Se;o.imgSrc=i,o.imgFile=s.iconFileName;const a=new D;a.props.name=this.itemCssClassName(),a.props.id=n,a.props.className=this.imgCssClassName(),a.props.option.setImg(o),a.props.option.toolTip=s.name,a.props.option.onSelect=l=>{this.setSelectedItem(l.item.props.id)},this.htmlMaker.add(a)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createSelectorBox(e,t,s){this.parentName=t;const n=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="${this.charOpenUrlCssClassName()}">URL</button>
<button id="char-dlg-close">閉じる</button>
`),i=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${s}
    <label id="char-dlg-chinfo">未選択</label>
    <input type="text" id="${this.charSeachInputCssClassName()}" placeholder="キャラ名検索...">
    ${n}
</div>`,o=new O;o.title="<"+e+">";const a=o.NewDialog(t,this.dlgCssClassName());return o.SetContent(t,i),this.applyCss(),o.EnableEventHandlers(),o.onMoveDone=this.moverOnMoveDone,a}addEventHandlers(e){document.getElementById(this.charSeachInputCssClassName()).oninput=t=>{if(t!==null&&t.target!==null){const s=t.target;console.log(s.value);const n=s.value,i=this.charSeachComboCssClassName(),o=document.getElementById(i);o!==null&&o.parentNode?.removeChild(o);const a=this.charFinder.toCombo(this.itemCssClassName(),i,n);if(a!==null){const l=document.getElementById(this.dlgContentCssClassName());l!==null&&(l.appendChild(a),this.charFinder.addEvent(a,r=>{const h=r.parentElement.getAttribute("item-id");this.htmlMaker.SelectByID(this.itemCssClassName(),h)}),this.charFinder.findFirst())}}},document.getElementById(this.charOpenUrlCssClassName()).onclick=async()=>{if(this.selectedCh===void 0)return;const t=this.chList.find(s=>this.selectedCh.idAttributeForHTML===s.idAttributeForHTML);if(t){this.charOpenUrlCssClassName();const s=new se;if(s.setParent(this.dlgCssClassName()),s.setYesNo(),await s.showWait(`${t.name} をブラウザで開いてよろしいですか？`)===b.Yes){const i=t.contentURL;window.open(i,"_blank")}}},document.getElementById("char-dlg-close").onclick=()=>{document.getElementById(this.parentName).hidden=!0}}addItemEventHandlers(){const e=this.htmlMaker.GetIdByIndex(0);this.htmlMaker.SelectByID(this.itemCssClassName(),e),this.htmlMaker.enableEvents(this.itemCssClassName()),this.setSelectedItem(e)}setSelectedItem(e){const t=this.chList.find(s=>e===s.idAttributeForHTML);t&&(document.getElementById("char-dlg-chinfo").textContent=t.name,this.selectedCh=t)}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}itemCssClassName(){return"char-item"}imgCssClassName(){return"base"}listCssClassName(){return"char-list"}dlgContentCssClassName(){return"char-dlg-content"}dlgCssClassName(){return"char-dlg"}charSeachInputCssClassName(){return"char-search-input"}charSeachComboCssClassName(){return"char-search-combo"}charOpenUrlCssClassName(){return"char-open-url"}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=parseInt(this.uiInfo.left),i=parseInt(this.uiInfo.top),o=document.createElement("style");o.textContent=`
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
`.trim(),document.head.appendChild(o);const a=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,a)}}class G{constructor(){this.ns=x.None,this.id=0,this.name="",this.contentURL="",this.iconURL=""}static toJsonText(e){const t=G.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new G;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}static fromJsonInst(e){const t=new _;return t.ns=e.ns,t.id=e.id,t.name=e.name,t.contentURL=e.contentURL,t.iconURL=e.iconURL,t}}const g={pqStatusHP:"pqStatusHP",pqStatusATK:"pqStatusATK",pqStatusREC:"pqStatusREC",pqTokkunHP:"pqTokkunHP",pqTokkunATK:"pqTokkunATK",pqTokkunREC:"pqTokkunREC",pqTokuSp1:"pqTokuSp1",pqTokuSp2:"pqTokuSp2",mmAbilitySTR:"mmAbilitySTR",mmStatusFGT:"mmStatusFGT",mmStatusATK:"mmStatusATK",mmStatusPDF:"mmStatusPDF",mmStatusACC:"mmStatusACC",mmStatusEVA:"mmStatusEVA",mmStatusCRI:"mmStatusCRI",mmStatusMDF:"mmStatusMDF",mmStatusHP:"mmStatusHP",mmStatusCRD:"mmStatusCRD",mmStatusDEF:"mmStatusDEF",mmStatusSPD:"mmStatusSPD",mmAbilityDEX:"mmAbilityDEX",mmAbilityMGC:"mmAbilityMGC",mmAbilityDUR:"mmAbilityDUR",mmRole:"mmRole"};class Te{constructor(){this.title="",this.key="",this.selectionPair=[],this.selectedVal="",this.initScoreVal=0,this.mulScoreVal=0,this.available=!1}get stdScore(){const e=this.selectedVal.length>=1?this.selectedVal:"1",t=parseInt(e);return this.initScoreVal+t*this.mulScoreVal}get selectedText(){if(this.selectionPair.length===0||this.selectedVal==="")return;const e=parseInt(this.selectedVal)-1;if(e<0)return;const t=this.selectionPair[e].split("/");if(t.length===2)return t[0]}}class ne{constructor(){this.items=new Array,this.allow=new Map,this.roleText="",this.comboText=""}makeDemoLvText(e){let t="";for(let s=1;s<=100;s++)t+=`"${e}${s}/${s}",`;return t=t.substring(0,t.length-1),t}load(){const e=this.makeDemoLvText("Lv"),t=this.makeDemoLvText("Lv"),s=this.makeDemoLvText(""),n=`
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
`,o=JSON.parse(n).map(a=>Object.assign(new Te,a));this.items=o}save(){console.log(JSON.stringify(this,null,2))}clone(){const e=new ne;for(const t of this.items){const s=JSON.stringify(t,null,2),n=JSON.parse(s);e.items.push(n)}return e}set(e,t){const s=this.items.find(n=>n.key===e);return s?(s.selectedVal=t,!0):!1}get stdScore(){let e=0;for(const t of this.items)t.available&&(e+=t.stdScore);return e}get allAvailable(){for(const e of this.items)if(e.available===!1)return!1;return!0}static calcScore(e,t){const s=t.split("+");let n=0;for(const i of s){const o=i.trim();if(o.endsWith("()")){const a=o.slice(0,-2);typeof e[a]=="function"?n+=e[a]():console.warn(`関数 '${a}' が存在しません`)}else{const a=e[o];typeof a=="number"?n+=a:Array.isArray(a)?n+=a.reduce((l,r)=>l+r,0):console.warn(`プロパティ '${o}' が数値ではありません`)}}return n}static calcScoreAdvanced(e,t){const s=Object.keys(e),n=s.map(o=>e[o]);return new Function(...s,`return ${t};`)(...n)}toInst(e){return(n=>{const i=class{constructor(){n.forEach((o,a)=>{this[a]=o})}};return new i})(e)}}class Ce{constructor(){this.fileNames=null,this.minMap=new Map,this.maxMap=new Map,this.rangeMap=new Map,this.digLenMax=0,this.nMul=0,this.table=[{key:g.pqStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:g.pqStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:g.pqStatusREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,120)}},{key:g.pqTokkunHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:g.pqTokkunATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:g.pqTokkunREC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,5)}},{key:g.pqTokuSp1,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:g.pqTokuSp2,scoreFunc:(e,t)=>this.scoreFunc(this.puyoToku(t),10)},{key:g.mmStatusFGT,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:g.mmStatusATK,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:g.mmStatusPDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:g.mmStatusACC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:g.mmStatusEVA,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:g.mmStatusCRI,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:g.mmStatusMDF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:g.mmStatusHP,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:g.mmStatusCRD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:g.mmStatusDEF,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:g.mmStatusSPD,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:g.mmAbilityDEX,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:g.mmAbilityMGC,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:g.mmAbilityDUR,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}},{key:g.mmRole,scoreFunc:(e,t)=>{const s=this.toScoreMaxNum(e,t);return this.scoreFunc(s,240)}}],this.rolePriolity=[{roleKey:he.RlAttacker,priority:ue.priHi,statusKey:[g.mmAbilitySTR,g.mmStatusATK,g.mmStatusSPD]},{roleKey:he.RlHealer,priority:ue.priHi,statusKey:[g.mmAbilityMGC,g.mmStatusMDF,g.mmStatusHP]},{roleKey:he.RlDebuffer,priority:ue.priHi,statusKey:[g.mmAbilityDEX,g.mmStatusACC,g.mmStatusHP]},{roleKey:he.RlBuffer,priority:ue.priHi,statusKey:[g.mmStatusPDF,g.mmStatusHP,g.mmStatusDEF]}]}async loadDB(e){const t=new ie,s=await t.loadBinFile(e);if(t.isWebRunning)this.zip=await window.JSZip.loadAsync(s);else{const{loadZipNode:n}=await import(t.nodeToolsImportFilename);this.zip=await n(s)}return this.fileNames=Object.keys(this.zip.files),!0}async enumStatus(e){if(this.fileNames!==null)for(const t of this.fileNames){const s=await this.getFileContent(t);if(s===null||e===void 0)continue;if(!e(t,s))break}}async debugCombo(){await this.enumStatus((e,t)=>{for(const s of t)s.useCombo&&console.log(`${e}:[${s.value}]`);return!0})}async getMinMax(){await this.enumStatus((e,t)=>{for(const s of t){if(s.useCombo)continue;let n=parseInt(this.itemValue(s));if(!this.minMap.has(s.key))this.minMap.set(s.key,n);else{const i=this.minMap.get(s.key);i===void 0?this.minMap.set(s.key,n):i>n&&this.minMap.set(s.key,n)}if(!this.maxMap.has(s.key))this.maxMap.set(s.key,n);else{const i=this.maxMap.get(s.key);i===void 0?this.maxMap.set(s.key,n):i<n&&this.maxMap.set(s.key,n)}}return!0})}async getRanges(){await this.getMinMax(),this.digLenMax=0;for(const[e,t]of this.minMap){const s=t,n=this.maxMap.get(e);let i=0;if(s!==void 0&&n!==void 0&&(i=n-s),i<=0&&(i=1),this.rangeMap.set(e,i),n!==void 0){const o=Math.log10(n);o>this.digLenMax&&(this.digLenMax=o)}}this.nMul=this.digLenMax>0?Math.pow(10,Math.ceil(this.digLenMax)):1;for(const[e,t]of this.minMap)console.log(`[${e}] = ${this.minMap.get(e)},${this.maxMap.get(e)} ${this.rangeMap.get(e)}`);console.log(`digLenMax=[${this.digLenMax}] nMul=[${this.nMul}]`)}stdBy(e,t){let s,n;if(this.rangeMap.has(e)&&(s=this.rangeMap.get(e)),this.minMap.has(e)&&(n=this.minMap.get(e)),s===void 0||n===void 0||this.isNumeric(t)===!1)return null;s<=0&&(s=1);const i=(parseInt(t)-n)*s;return this.nMul*i}getFilename(e){let t=null;for(let s of this.fileNames){let n=s.indexOf("_");if(n>=0){let i=s.substring(n+1);if(n=i.indexOf("."),n>=0&&(i=i.substring(0,n)),i===e){t=s;break}}}return t}async getFileContent(e){if(e===null)return null;const t=this.zip.file(e);if(t){const s=await t.async("string");return JSON.parse(s)}return null}async getStatus(e){this.digLenMax===0&&await this.getRanges();const t=this.getFilename(e);if(t===null)return null;const s=await this.getFileContent(t);if(s===null)return null;let n=null;for(const o of s)if(!o.useCombo){for(const a of this.rolePriolity)if(a.statusKey.find(r=>r===o.key)){n=a,console.log(`find role : ${n.roleKey}`);break}if(n!==null)break}const i=new ne;if(n!==null)for(const o of s){if(o.useCombo)continue;if(n.statusKey.find(l=>l===o.key)){const l=this.table.find(r=>r.key===o.key);if(l){const r=l.scoreFunc(o.key,this.itemValue(o));r.title=o.disp,r.key=o.key,r.selectedVal="1",i.items.push(r)}}}else for(const o of s){if(o.useCombo)continue;const a=this.table.find(l=>l.key===o.key);if(a){const l=a.scoreFunc(o.key,this.itemValue(o));l.title=o.disp,l.key=o.key,l.selectedVal="1",i.items.push(l)}}return i}async getComboKeywords(e){let t=0;const s=new Map,n=new Map;for(const i of e){const o=this.getFilename(i);if(o===null)return null;const a=await this.getFileContent(o);if(a===null)return null;const l=new Map;for(const r of a){if(!r.useCombo)continue;const c=r.value.split(",");for(const h of c)if(l.has(h)===!1)l.set(h,1);else{const p=l.get(h);l.set(h,p+1)}}if(l.size===0){t=0,n.clear();continue}for(const[r,c]of l)if(n.has(r)===!1)n.set(r,c);else{const h=n.get(r);n.set(r,h+c)}if(t++,!(t<=2))for(const[r,c]of n)c>=3&&s.set(r,c)}}async debugCheckCombo(){const e=new Array;e.push("119599"),e.push("119603"),e.push("119624"),await this.getComboKeywords(e)}isNumeric(e){return e.trim()===""?!1:!isNaN(Number(e))}itemValue(e){return e.converted===""?e.value:e.converted}toScoreMaxNum(e,t){return this.isNumeric(t)===!1?null:Ce.useStdConv?this.stdBy(e,t):t!==""?parseInt(t):1}scoreFunc(e,t){const s=new Te;if(e===null)return s;s.mulScoreVal=e/t;for(let n=1;n<=t;n++){const i=Math.ceil(e/t*n);s.selectionPair.push(`Lv${n}/${n}`),n===1&&(s.initScoreVal=i)}return s.available=!0,s}scoreFuncOld(e,t){const s=new Te;if(this.isNumeric(e)===!1)return s;let n=e!==""?parseInt(e):1;s.mulScoreVal=n/t;for(let i=1;i<=t;i++){const o=Math.ceil(n/t*i);s.selectionPair.push(`Lv${i}/${i}`),i===1&&(s.initScoreVal=o)}return s.available=!0,s}puyoToku(e){return e==="enable"?10:1}}Ce.useStdConv=!1;const ue={priHi:0},q={None:"None",UI:"UI",Menu:"Menu"};class K{constructor(){this.dockType=q.None,this.iconFileName="",this.toolTip="",this.idAttributeForHTML=""}get labelWrap(){let e=this.toolTip,t=this.toolTip.length;if(t>3){const s=t%2===0?t/2:t/2+1,n=e.substring(0,s),i=e.substring(s);e=n+`
`+i}return e}setAsDlg(e,t){this.dockType=q.UI,this.dlg=e,this.toolTip=t}setAsMenu(e){this.dockType=q.Menu,this.toolTip=e}get isUIType(){return this.dockType==q.UI}get isMenuType(){return this.dockType==q.Menu}ToggleStatus(){this.dlg===void 0||this.dlg===null||(this.dlg.hidden=!this.dlg.hidden)}}class Le{constructor(){this.items=new Array,this.parentName="",this.listName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new y().SaveSetting(e,!1)}}add(e){return e.dockType==q.UI&&(e.dlgParent=e.dlg.parentElement),this.items.push(e),!0}async toHTML(e,t){if(!this.items)return"";this.listName=e,this.htmlMaker=new F;let s=0;for(const n of this.items){s++;const i=`dock-uid${s}`;n.idAttributeForHTML=i;const o=new D,a=n.labelWrap;o.props.name=this.itemCssClassName(),o.props.id=i,o.props.className=this.imgCssClassName(),o.props.option.toolTip=n.toolTip,o.props.option.setLabel(a,!0),o.props.option.onSelect=l=>{const r=this.items.find(c=>l.item.props.id===c.idAttributeForHTML);if(r&&(this.selectedItem=r,this.onApply!==void 0)){const c=new ht;c.item=this.selectedItem,this.onApply(c)}},this.htmlMaker.add(o)}return this.htmlMaker.MakeScrollableList(this.listCssClassName())}createDockBox(e,t){this.parentName=e;const s=`<div class="${this.parentName}-dlg-content">
    ${t}
</div>`,n=new O,i=n.NewDialog(e,this.dlgCssClassName(),ee.Hide);return n.SetContent(e,s),this.applyCss(),n.EnableEventHandlers(),n.onMoveDone=this.moverOnMoveDone,i}addItemClickHandlers(e){this.onApply=e,this.htmlMaker.SelectByID(this.itemCssClassName(),this.htmlMaker.GetIdByIndex(0)),this.htmlMaker.enableEvents(this.itemCssClassName())}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=48,i=this.items.length,o=document.createElement("style");o.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,60,10,y.ignoreIndex)}
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
`.trim(),document.head.appendChild(o);const a=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,a)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}listCssClassName(){return`${this.listName}-list`}dlgCssClassName(){return`${this.parentName}-dlg`}static GetDialogInfo(e){return O.GetDialogInfo(e)}static SetDialogInfo(e){return O.SetDialogInfo(e)}async InitZOrder(e){await e.ForEachAsync(t=>{const s=Le.GetDialogInfo(t),n=e.FindByName(t);return s!==null&&(s.zindex=n!==null?n.style.zIndex:""),console.log(s),!0})}}class ht{constructor(){this.cancel=!1}}class pe{constructor(){this.dockType=q.None,this.iconFileName="",this.toolTip="",this.dlgName="",this.hidden=!1,this.zIndex="",this.topPx="",this.leftPx=""}static toJsonText(e){const t=pe.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new pe;return t.dockType=e.dockType,t.iconFileName=e.iconFileName,t.toolTip=e.toolTip,e.isUIType&&(t.dlgName=e.dlgParent.id,t.hidden=e.dlgParent.hidden,t.zIndex=e.dlgParent.style.zIndex,t.leftPx=e.dlgParent.style.left,t.topPx=e.dlgParent.style.top),t}}class fe{static toJsonText(e){const t=fe.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new fe;t.items=new Array;for(const s of e.items)t.items.push(pe.toJsonInst(s));return t}restore(e,t){for(const s of this.items){const n=e.items.find(i=>i.dlg.id===s.dlgName);n&&(n.dockType=s.dockType,n.iconFileName=s.iconFileName,n.toolTip=s.toolTip,n.isUIType&&(n.dlgParent.hidden=s.hidden,n.dlgParent.style.zIndex=s.zIndex,n.dlgParent.style.left=s.leftPx,n.dlgParent.style.top=s.topPx))}t.ReOrder()}}class ut{constructor(){this.ch=new _,this.idAsText="",this.idAttributeForHTML=""}}class dt{constructor(){this.chList=new Array,this.uiInfo=new X,this.parentName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new y().SaveSetting(e)}}setRow(e,t,s){let n=0;const i=new Se;i.imgFile=e.iconFileName,s.getCell(n,t).typeInfo.setImg(i),s.getCell(n,t).className=this.itemIconCssClassName();const o=`${e.name} Lv.1 [ATK:1]`;s.getCell(n,t,1).typeInfo.setLabel(o,!1),s.getCell(n,t,1).className=this.itemStatusCssClassName(),n++,s.getCell(n,t).typeInfo.setButton("配置"),s.getCell(n,t).className=this.itemDeployCssClassName(),s.getCell(n,t).typeInfo.using.itemId=t,n++,s.getCell(n,t).typeInfo.setButton("削除"),s.getCell(n,t).className=this.itemDeleteCssClassName(),s.getCell(n,t).typeInfo.using.itemId=t}toHTML(){if(!this.chList)return"";const e=new de;if(this.chList.length>=1)e.makeDim(3,this.chList.length),e.growCell(0,2),this.chList.forEach((i,o)=>{const a=i.ch;this.setRow(a,o,e)}),e.makeRowTemplate(),this.table=e;else{e.makeDim(3,1),e.growCell(0,2);const i=new _;this.setRow(i,0,e),e.makeRowTemplate(),e.clearRows(),this.table=e}const t=this.summaryCssClassName(),s=this.table.ToScrollHTML(t,"");this.htmlMaker=new F;const n=new D;return n.props.name="",n.props.id="0",n.props.className=t,n.props.option.setTable(s),n.props.option.onSelect=async i=>{switch(console.log(`classify = ${i.classify} targetId = ${i.targetId}`),i.classify){case this.itemDeployCssClassName():break;case this.itemDeleteCssClassName():const o=new se;o.setParent(this.dlgCssClassName());let a=b.None;switch(o.setYesNo(),a=await o.showWait("キャラ名 を削除しますか？"),a){case b.Yes:break;case b.No:return;case b.Cancel:return}const l=parseInt(i.targetId);l>=1&&(e.deleteRow(l),e.redimAllRows(),this.chList.splice(l-this.table.firstRowIndex,1));break}},this.htmlMaker.add(n),this.htmlMaker.ToHTML()}createSummaryBox(e,t,s){this.parentName=t;const n=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
    ${s}
</div>`,i=new O;i.title="<"+e+">";const o=i.NewDialog(t,this.dlgCssClassName());return i.SetContent(t,n),this.applyCss(),i.EnableEventHandlers(),i.onMoveDone=this.moverOnMoveDone,o}addItemEventHandlers(){this.htmlMaker.enableEvents(this.summaryCssClassName())}setSelectedItem(e){this.chList.find(t=>e===t.idAttributeForHTML)}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}async charStock(e){let t=this.table.getSelectedRow();const s=t!==this.table.invalidRowIndex,n=new se;n.setParent(this.dlgCssClassName());let i=b.None;s?(n.setYesNoCancel(),i=await n.showWait(`${e.selectCh.name} を更新しますか？`)):(n.setYesNo(),i=await n.showWait(`${e.selectCh.name} を追加しますか？`));let o=!1,a=!1;switch(i){case b.Yes:s?(o=!1,a=!0):(o=!0,a=!1);break;case b.No:s?(o=!0,a=!1):(o=!1,a=!1);break;case b.Cancel:return}let l=null;if(o){const r=this.summaryRowCssClassName(),c=this.table.addRow(r);if(c>=0){const h=new ut;h.ch=e.selectCh,h.scoreSet=e.scoreSet,this.chList.push(h),t=c,this.table.selectRow(c),this.table.updateRowImage(c,e.selectedImg),this.table.scroll(c),l=this.table.getRowElem(c)}}if(a){const r=t-this.table.firstRowIndex,c=this.chList[r];c.scoreSet=e.scoreSet,this.summaryRowCssClassName();const h=t;this.table.scroll(h),l=this.table.getRowElem(h)}if(l!==null){const r=this.table.getCellElems(l);if(r){const c=t-this.table.firstRowIndex,h=this.chList[c];let p="";for(const k of h.scoreSet.items){let $=k.selectedText;$=$===void 0?"*bug*":$;const U=`${k.title}:${$}`;p!==""&&(p=`${p}<br>`),p=`${p}${U}`}r[0][1].innerHTML=p}}}itemIconCssClassName(){return`${this.summaryCssClassName()}-icon`}itemStatusCssClassName(){return`${this.summaryCssClassName()}-status`}itemDeployCssClassName(){return`${this.summaryCssClassName()}-deploy`}itemDeleteCssClassName(){return`${this.summaryCssClassName()}-delete`}summaryRowCssClassName(){return"char-summary-table-row"}summaryCssClassName(){return"char-summary-table"}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return"char-summary-dlg"}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=document.createElement("style");s.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,e,t)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgContentCssClassName()} {
  width: 100%;
  max-width: 320px;
  min-width: 240px;
  margin: 0 auto;
}

/* 一覧のコンテナ（縦スクロール有効） */
.${this.dlgContentCssClassName()} {
height: 400px;           /* ダイアログに合わせた固定高 */
overflow-y: auto;
overflow-x: hidden;
-webkit-overflow-scrolling: touch; /* iPad用の滑らか設定 */
border: 1px solid #7b1fa2; /* 紫色の枠線 */
background: #fff;
}
/* テーブル内の行設定 */
.${this.summaryRowCssClassName()} tr {
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
/* ボタンの個別スタイル */
.${this.itemDeployCssClassName()} {
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
.${this.summaryRowCssClassName()}.selected {
background: linear-gradient(to right, #fff176, #fbc02d); /* 選択されたら黄色に！ */
border-left: 5px solid #9c27b0; /* 左端に紫のアクセント */
}
`.trim(),document.head.appendChild(s);const n=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,n)}}class pt{constructor(){this.cancel=!1}}class ft{constructor(){this.TextMap=new Map}set(e,t){const s=this.TextMap.has(e);return this.TextMap.set(e,t),s}remove(e){const t=this.TextMap.has(e);return t&&this.TextMap.delete(e),t}get count(){return this.TextMap.size}clear(){this.TextMap.clear()}forEach(e){if(e===void 0)return;let t=!1;for(const[s,n]of this.TextMap)if(t=e(s,n),t)break;return t}values(){const e=new Map;for(const[t,s]of this.TextMap)e.set(t,parseInt(s));return e}}class Ye{constructor(e=0,t=""){this.ch=new _,this.isEmpty=!0,this.details=new ft,this.ch.id=e,this.ch.name=t}set(e,t){const s=this.details.TextMap.has(e);return this.details.set(e,t),s}get values(){return this.details.values()}get itemID(){const e=this.itemKey,t=this.ch.idAttributeForHTML.substring(e.length);let s=parseInt(t);return s<=0?-1:s}get itemKey(){return"chuid"}}class Ke{constructor(){this.nFormationItem=5,this.uiInfo=new X}Init(){this.items=new Array;for(let e=0;e<this.nFormationItem;e++)this.items.push(new Ye)}put(e,t){return this.items.find(n=>this.isExistCh(n,t))!==void 0?!1:(e.ch.ns=t.ns,e.ch.id=t.id,e.ch.name=t.name,e.isEmpty=!1,!0)}empty(e){const t=e.isEmpty;return e.isEmpty=!0,e.isEmpty!=t}isExistCh(e,t){return e.ch.name===t.name&&e.ch.id===t.id}equalsFormationItem(e,t){return e.ch.name===t.ch.name&&e.ch.id===t.ch.id}}class gt{constructor(){this.emptyFile="plus.png",this.propItemNum=0,this.parentName="",this.listName="",this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new y().SaveSetting(e)}}Init(e){this.charDB=e,this.formation=new Ke,this.formation.Init(),this.scsList=new Array;const t=this.formation.nFormationItem;for(let s=0;s<t;s++){const n=new ne;this.scsList.push(n)}}async Setup(e,t){if(!e)return;this.formation=e;let s=0;for(const n of this.formation.items){n.isEmpty?this.formation.empty(n):this.formation.put(n,n.ch),s++;const i=`${n.itemKey}${s}`;n.ch.idAttributeForHTML=i;const o=n.isEmpty?this.emptyFile:n.ch.iconFileName,a=await t.getImageUrlBy(o,n.ch.ns);if(a===null)return;this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),n.ch.idAttributeForHTML,a)}}async toHTML(e,t){if(!this.formation)return"";this.listName=e,this.htmlMakerChSel=new F;let s=0;for(const n of this.formation.items){const i=n.ch;s++;const o=`${n.itemKey}${s}`;i.idAttributeForHTML=o;const a="",l=n.isEmpty?this.emptyFile:i.iconFileName,r=new Se;r.imgSrc=a,r.imgFile=l;const c=new D;c.props.name=this.itemCssClassName(),c.props.id=o,c.props.className=this.imgCssClassName(),c.props.option.setImg(r),c.props.option.toolTip=i.name,c.props.option.onSelect=h=>{console.log(`notifty id = ${h.item.props.id}`),this.setSelectedItem(h.item.props.id)},this.htmlMakerChSel.add(c)}return this.htmlMakerChSel.MakeScrollableList(this.listCssClassName())}toGridHTML2(){this.htmlMakerProp=new F;let e=0,t="";for(const s of this.formation.items){s.ch;const n=this.scsList[e];e++;const i=new de;i.makeDim(1,n.items.length*2);let o=-1;for(const r of n.items){o++;const c=new Je;c.selectionPair=r.selectionPair,c.selectedItem=r.selectedVal,c.classify=r.key,i.getCell(0,o*2).typeInfo.setLabel(r.title,!1);const p=i.getCell(0,o*2+1);p.className=this.propItemCssClassName(),p.typeInfo.setCombo(c),p.typeInfo.onSelect=k=>{console.log(`notifty id = ${k.item.props.id}`)}}const a=i.ToScrollHTML(this.propItemCssClassName(),`${e}`);t=`
${t}
${a}`.trim();const l=new D;l.props.id=`${e}`,l.props.option.onSelect=r=>{console.log(`notifty id = ${r.item.props.id}`)},this.htmlMakerProp.itemList.push(l)}return t}toGridHTML(){this.htmlMakerProp=new F;let e=0;for(const t of this.formation.items){t.ch;const s=this.scsList[e];e++;const n=new F;for(const a of s.items)this.makeChLvSelect(t,`${a.key}${e}`,a.title,a.key,a.selectionPair,a.selectedVal,n),t.details.set(a.key,a.selectedVal);const i=n.ToHTML(),o=new D;o.props.name="",o.props.id=`${e}`,o.props.className="",o.props.option.setPlain(i),o.props.option.onSelect=a=>{console.log(`notifty id     = ${a.item.props.id}`),console.log(` targetId      = ${a.targetId}`),console.log(` classify      = ${a.classify}`),console.log(` selectedValue = ${a.selectedValue}`);const l=a.item.props.id,r=parseInt(l)-1;if(0<=r&&r<this.formation.items.length){const c=this.formation.items[r];c.set(a.classify,a.selectedValue);const h=this.scsList[r];h.set(a.classify,a.selectedValue);const p=new yt;p.uiName=this.parentName,p.item=c,p.values=c.values,p.scoreConfigSet=h,this.onPropChanged(p)}else console.log(`invalid index = ${r}`)},this.htmlMakerProp.add(o)}return this.htmlMakerProp.MakeScrollableList(this.propCssClassName())}makeChLvSelect(e,t,s,n,i,o,a){const l=new D;l.props.name=this.propItemCssClassName(),l.props.id=t,l.props.className=this.lblCssClassName(),l.props.option.setLabel(s,!1);const r=l.ToHTML(l.props),c=new D;c.props.name=this.propItemCssClassName(),c.props.id=t,c.props.className=this.lblCssClassName();const h=new Je;h.selectionPair=i,h.selectedItem=o,h.classify=n,c.props.option.setCombo(h);const p=c.ToHTML(c.props);let k=`
${r}
${p}
`.trim();const $=new D;$.props.name=this.propItemCssClassName(),$.props.id=t,$.props.className=this.lblCssClassName(),$.props.option.setPlain(k),a.add($)}createFormationBox(e,t,s,n,i){this.parentName=t;let o="";i&&(o=`<button id="${this.dlgCssClassName()}-stock">キャラ保存</button>`);let a=`
<button id="${this.dlgCssClassName()}-tbput">キャラ配置</button>
<button id="${this.dlgCssClassName()}-tbempty">キャラ抹消</button>
${o}
`.trim();const l=this.htmlMakerChSel.MakeDefaultToolButtonsHTML(a),r=this.htmlMakerChSel.MakeDefaultButtonsHTML(`
<button id="${this.dlgCssClassName()}-close">閉じる</button>
`);let c="";n!==""?c=`<div class="${this.dlgContentCssClassName()}">
    ${l}
    ${s}
    ${n}
    ${r}
</div>`:c=`<div class="${this.dlgContentCssClassName()}">
    ${l}
    ${s}
    ${r}
</div>`;const h=new O;h.title="<"+e+">";const p=h.NewDialog(t,this.dlgCssClassName());return h.SetContent(t,c),this.applyCss(),h.EnableEventHandlers(),h.onMoveDone=this.moverOnMoveDone,p}addEventHandlers(e){document.getElementById(`${this.dlgCssClassName()}-close`).onclick=()=>{document.getElementById(this.parentName).hidden=!0},document.getElementById(`${this.dlgCssClassName()}-tbput`).onclick=async()=>{if(this.onPut!==void 0){this.selectedItem.isEmpty=!1;const s=new Ie;s.uiName=this.formation.uiInfo.name,s.item=this.selectedItem,await this.onPut(s),this.formation.put(this.selectedItem,s.selectCh),this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,s.selectedImg),this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,this.selectedItem.ch.name);const n=this.findPropGridPos();if(n!==-1){let i=this.selectedItem.ch.idAsText===""?`${this.selectedItem.ch.id}`:this.selectedItem.ch.idAsText;const o=await this.charDB.getStatus(i);if(console.log(o),o!==null&&o.items!==void 0){for(const l of o.items)this.selectedItem.details.set(l.key,l.selectedVal);this.scsList[n]=o;const a=this.toGridHTML();this.replacePropGrid(a),this.htmlMakerProp.enableEvents(this.propItemCssClassName())}}}},document.getElementById(`${this.dlgCssClassName()}-tbempty`).onclick=async()=>{if(this.onEmpty!==void 0){this.selectedItem.isEmpty=!0;const s=new Ie;s.uiName=this.formation.uiInfo.name,s.item=this.selectedItem,s.selectedImg=this.emptyFile,await this.onEmpty(s),this.formation.empty(this.selectedItem),this.htmlMakerChSel.ReplaceImg(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,s.selectedImg),this.htmlMakerChSel.ReplaceDivToolTip(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML,"");const n=this.findPropGridPos();if(n!==-1){this.scsList[n]=new ne;const i=this.toGridHTML();this.replacePropGrid(i),this.htmlMakerProp.enableEvents(this.propItemCssClassName())}}};const t=document.getElementById(`${this.dlgCssClassName()}-stock`);t!==null&&(t.onclick=async()=>{if(this.onStock!==void 0){if(this.selectedItem.ch.ns===x.None)return;const s=this.htmlMakerChSel.FindImgByID(this.itemCssClassName(),this.selectedItem.ch.idAttributeForHTML),n=new Ie;n.item=this.selectedItem,n.selectedImg=s===null?"":s.src;const i=this.findPropGridPos();i!==-1&&(n.scoreSet=this.scsList[i]),await this.onStock(n)}})}addItemEventkHandlers(e,t,s,n){this.onStock=s,this.onPut=e,this.onEmpty=t,this.onPropChanged=n;const i=this.htmlMakerChSel.GetIdByIndex(0);this.htmlMakerChSel.SelectByID(this.itemCssClassName(),i),this.htmlMakerChSel.enableEvents(this.itemCssClassName()),this.htmlMakerProp.enableEvents(this.propItemCssClassName()),this.setSelectedItem(i)}findPropGrid(){const e=this.htmlMakerChSel.FindDivByClassName(this.dlgContentCssClassName(),this.propCssClassName());return e!==null?e:null}findPropGridPos(){const e=this.findPropGrid();if(e!==null&&e.className.startsWith(this.propCssClassName())){let t=-1;for(const s of this.formation.items)if(t++,s===this.selectedItem)return console.log(`pos=${t}`),t}return-1}replacePropGrid(e){const t=this.htmlMakerChSel.FindDivByClassName(this.dlgContentCssClassName(),this.propCssClassName());if(t===null)return null;const s=document.createElement("div");s.innerHTML=e,t.replaceWith(s.childNodes[0])}setSelectedItem(e){const t=this.formation.items.find(s=>e===s.ch.idAttributeForHTML);t&&(this.selectedItem=t)}enableLazyImages(e){this.htmlMakerChSel.initObserver(this.dlgCssClassName(),e)}itemCssClassName(){return`${this.listName}-item`}imgCssClassName(){return`${this.listName}-img`}propCssClassName(){return`${this.listName}-prop`}propItemCssClassName(){return`${this.listName}-prop-item`}lblCssClassName(){return`${this.listName}-lbl`}listCssClassName(){return`${this.listName}-list`}dlgContentCssClassName(){return`${this.parentName}-dlg-content`}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const e=this.listCssClassName(),t=this.itemCssClassName(),s=this.imgCssClassName(),n=this.propCssClassName(),i=this.propItemCssClassName();this.lblCssClassName();const o=parseInt(this.formation.uiInfo.left),a=parseInt(this.formation.uiInfo.top),l=100;new de;const r=document.createElement("style");r.textContent=`
${this.htmlMakerChSel.MakeDefaultDialogParentCss(this.parentName,o,a)}
${this.htmlMakerChSel.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgContentCssClassName()} {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

${this.htmlMakerChSel.MakeDefaultScrollCss(this.parentName,500)}
${this.htmlMakerChSel.MakeDefaultGridColCss(e,l,5,l*5+16)}

${this.htmlMakerChSel.MakeDefaultItemimgCss(t,s,l,l)}
${this.htmlMakerChSel.MakeDefaultSelectionCss(t)}

/*
${this.htmlMakerChSel.MakeDefaultGridRowCss(n,l,this.propItemNum,22)}
${this.htmlMakerChSel.MakeDefaultItemJustifyRightCss(i,l,20)}
*/
${this.htmlMakerChSel.MakeDefaultGridColCss(n,l,5,l*5+16)}
${this.htmlMakerChSel.MakeDefaultItemJustifyRightCss(i,l,30)}

${this.htmlMakerChSel.MakeDefaultButtonsCss()}
`.trim(),document.head.appendChild(r);const c=document.getElementById(this.parentName);this.htmlMakerChSel.copyCssToInlineStyle(`.${this.parentName}`,c)}}class Ie{constructor(){this.cancel=!1}}class yt{constructor(){this.uiName="",this.cancel=!1}}class ge{constructor(){this.ch=new G,this.isEmpty=!0,this.TextMap=""}static toJsonText(e){const t=G.toJsonInst(e.ch);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new ge;t.ch=G.toJsonInst(e.ch),t.isEmpty=e.isEmpty;const s=Object.fromEntries(e.details.TextMap);return t.TextMap=JSON.stringify(s,null,2),t}static fromJsonInst(e){const t=new Ye;t.ch=G.fromJsonInst(e.ch),t.isEmpty=e.isEmpty;const s=new Map(Object.entries(JSON.parse(e.TextMap)));return t.details.TextMap=s,t}}class W{static toJsonText(e){const t=W.toJsonInst(e);return JSON.stringify(t,null,2)}static toJsonInst(e){const t=new W;t.items=new Array;for(const s of e.items)t.items.push(ge.toJsonInst(s));return t}static fromJsonInst(e){const t=new Ke;t.items=new Array;for(const s of e.items)t.items.push(ge.fromJsonInst(s));return t}}class Xe{constructor(e=0,t="",s=!0,n=0){this.ch=new _,this.isEmpty=!0,this.score=0,this.allAvailable=!1,this.ch.id=e,this.ch.name=t,this.isEmpty=s,this.score=n}}class ve{Add(e){if(e===void 0){console.log("[VersusGroupRow::Add] scItem === undefined");return}this.columns===void 0&&(this.columns=[]),this.columns.push(e)}Count(){return this.columns.length}debug(){if(this.columns===void 0){console.log("[VersusGroupRow::debug] this.columns === undefined");return}for(const e of this.columns)console.log(`[${e.ch.name}]	score=[${e.score}]`)}}ve.defNumColumn=5;class xe{Add(e){this.groupRows===void 0&&(this.groupRows=[]),this.groupRows.push(e)}Count(){return this.groupRows.length}debug(){if(this.groupRows===void 0)console.log("this.groupRows === undefined");else for(const e of this.groupRows)e.debug()}async loadJson(e){const n=(await new ie().loadJson(e)).groupRows.map(o=>Object.assign(new ve,o)),i=new xe;return i.groupRows=n,i}}const A={None:"None",Player:"Player",Enemy:"Enemy"},P={None:"None",Attr:"Attr",Role:"Role"},ke={HiLv:"HiLv"},R={Likely:"Likely",Uncertain:"Uncertain",Wishful:"Wishful"};class ye{}ye.Likely=.9;ye.Uncertain=.64;class Me{constructor(){this.scoreItems=[],this.formationType=A.None,this.boost=0}get imgPrefix(){return this.formationType===A.Player?"ftPlayer":"ftEnemy"}get judgeWidth(){return 48}setScoreItems(e){if(e!==void 0){this.scoreItems=new Array;for(const t of e){const s=new Xe(t.ch.id,t.ch.name,t.isEmpty,t.score);this.scoreItems.push(s)}}}async toCharHTML(e,t){const s=t.ch.ns===x.None?"":t.ch.ns,n=await e.getImageUrlBy(t.ch.iconFileName,s);let i=this.scoreToolTip(t);return i!==""&&(i=`title="${i}"`),`
<img class=${this.charCssClassName()}
  src="${n}"
  ${i}>
`.trim()}scoreToolTip(e){return e.isEmpty?"":`${e.ch.name}
score=${e.score}`}async toJudgeHTML(e,t){const s=this.toJudgeFileURL(e,t);return`<img class=${this.judgeCssClassName()} src="${s}" width="48">`}async toJudgeFileURL(e,t){let s=null;switch(t){case R.Likely:s=await e.getImageUrlBy("win.png",e.AnyNs);break;case R.Uncertain:s=await e.getImageUrlBy("even.png",e.AnyNs);break;case R.Wishful:s=await e.getImageUrlBy("lost.png",e.AnyNs);break;default:return""}return s}charCssClassName(){return"combat-char"}judgeCssClassName(){return"combat-judge"}get combatScore(){if(this.scoreItems===void 0)return 0;const e=this.scoreItems.reduce((s,n)=>n.isEmpty?s:s+n.score,0),t=this.boost===0?1:this.boost;return Math.ceil(e*t/100)}}class Ct{constructor(){this.hasCombo=!1,this.winRate=new Map}setPlayer(e){e.formationType=A.Player,this.player=e}setEnemy(e){e.formationType=A.Enemy,this.enemy=e}judge(e){const s=this.winRate.get(e);return s>=ye.Likely?R.Likely:s>=ye.Uncertain?R.Uncertain:R.Wishful}judgeForEnemy(e){switch(e){case R.Likely:return R.Wishful;case R.Uncertain:return R.Uncertain;case R.Wishful:return R.Likely}}}class bt{constructor(){this.combatPairs=new Map,this.emptyFile="plus.png",this.parentName="",this.uiInfo=new X,this.moverOnMoveDone=async e=>{console.log(`[${e.className}] moved`),new y().SaveSetting(e)}}setPair(e,t){this.combatPairs.set(e,t)}calcCombatScore(){for(const[e,t]of this.combatPairs){if(t.player===void 0||t.enemy===void 0)continue;const s=[P.None,P.Attr,P.Role];for(const n of s){let i=t.player.combatScore,o=t.enemy.combatScore;t.winRate.set(n,o!==0?i/o:1)}}}async replaceChar(e,t,s,n,i){const o=this.combatPairs.get(e);let a;if(t===A.Player?a=o?.player:t===A.Enemy&&(a=o?.enemy),a===void 0)return!1;const l=s.itemID;if(l<0)return!1;const r=l-1;a=a;const h=`${a.imgPrefix}${l}`,p=a.scoreItems[r],k=p.ch;s.isEmpty?(k.id=0,k.name="",console.log("set empty")):(k.id=n.id,k.name=n.name,console.log(`set char ${n.id}:${n.name}`)),p.isEmpty=s.isEmpty;const $=k.ns===x.None?"":k.ns,U=await i.getImageUrlBy(k.iconFileName,$);if(U===null)return!1;const z=new F,J=this.outerCssClassName();return z.ReplaceImg(J,h,U),z.ReplaceImgToolTip(J,h,a.scoreToolTip(p)),!0}async replaceJudge(e){async function t(i,o){const a=await i.toJudgeFileURL(e,o);if(a===null)return;const l=i.imgPrefix;for(let r=0;r<i.scoreItems.length;r++){const c=`${l}${r+1}`,h=s.FindImgsByID(n,c);if(h===null||h.length<=1){console.error("fail on judge marker");continue}const p=h[1];s.SetImgSrc(p,a),i.scoreItems[r].isEmpty?s.SetImgSize(p,0,0):s.SetImgSize(p,i.judgeWidth,i.judgeWidth);const k=i.scoreItems[r];s.ReplaceImgToolTip(n,c,i.scoreToolTip(k))}}const s=new F,n=this.outerCssClassName();for(const[i,o]of this.combatPairs){if(o.player===void 0||o.enemy===void 0)continue;const a=[P.None,P.Attr,P.Role];for(const l of a){if(l!==P.None)continue;const r=o.judge(l),c=o.judgeForEnemy(r);await t(o.player,r),await t(o.enemy,c)}}}async toHTML(e,t){const s=document.createElement("table");s.id=e;const n=document.createElement("tbody");s?.appendChild(n);async function i(a,l){const r=document.createElement("tr");n?.appendChild(r);const c=await l.toJudgeHTML(t,a),h=l.imgPrefix;let p=0;for(const k of l.scoreItems){p++;const $=await l.toCharHTML(t,k),U=`
<div class=${o} item-id="${h}${p}">
    ${$}
    ${c}
</div>
`.trim(),z=document.createElement("td");z.innerHTML=U,r.appendChild(z)}}const o=this.outerCssClassName();for(const[a,l]of this.combatPairs){const r=l.judge(P.None),c=l.judgeForEnemy(r);await i(r,l.player),await i(c,l.enemy)}return s.outerHTML}createCombatBox(e,t,s){this.parentName=t,this.htmlMaker=new F;const n=`<div class="${this.parentName}-dlg-content">
    ${s}
</div>`,i=new O;i.title="<"+e+">";const o=i.NewDialog(t,this.dlgCssClassName());return i.SetContent(t,n),this.applyCss(),i.EnableEventHandlers(),i.onMoveDone=this.moverOnMoveDone,o}enableLazyImages(e){this.htmlMaker.initObserver(this.dlgCssClassName(),e)}processResult(e,t,s){async function n(o,a){const l=t(a.formationType),r=await a.toJudgeHTML(e,o),c=a.imgPrefix;let h=0;for(const p of a.scoreItems){h++;const k=await a.toCharHTML(e,p),$=`
<div class=${i} item-id="${c}${h}">
    ${k}
    ${r}
</div>
`.trim();s(l,$)}}const i=this.outerCssClassName();for(const[o,a]of this.combatPairs){const l=a.judge(P.None),r=a.judgeForEnemy(l);n(l,a.player),n(r,a.enemy)}}outerCssClassName(){return"combat-outer"}dlgCssClassName(){return`${this.parentName}-dlg`}applyCss(){const e=new Me,t=`.${this.outerCssClassName()}`,s=`.${e.charCssClassName()}`,n=`.${e.judgeCssClassName()}`,i=parseInt(this.uiInfo.left),o=parseInt(this.uiInfo.top),a=document.createElement("style");a.textContent=`
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
`.trim(),document.head.appendChild(a);const l=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,l)}}const Z={Unknown:"Unknown",Success:"Success",Fail:"Fail",Cancel:"Cancel"};async function Nt(m){const e=m.isWebRunning,t=m.currentUserHome,s=m.chStatusListFile,n=m.chListFile,i=new ot,o=new F,a="splash-screen";o.initFullScreen(a,"エボナ データベース初期化中..."),o.applyFullScreenCss(a);const l=o.getFullScreenMsgElem(a),r=l!==null?l.innerHTML:"";if(t===m.user1Home){const d=[{ns:x.CnsRed,nsName:"赤属性"},{ns:x.CnsBlue,nsName:"青属性"},{ns:x.CnsGreen,nsName:"緑属性"},{ns:x.CnsYellow,nsName:"黄属性"},{ns:x.CnsViolet,nsName:"紫属性"}],T=await new te().LoadList(n);for(const C of d)l!==null&&(l.innerHTML=`${r} ${C.nsName}`),await i.setupNs(C.ns,m,T)}if(t===m.user2Home){const d=[{ns:x.CnsBlue,nsName:"藍属性"},{ns:x.CnsRed,nsName:"紅属性"},{ns:x.CnsGreen,nsName:"翠属性"},{ns:x.CnsYellow,nsName:"黄属性"},{ns:x.CnsWhite,nsName:"天属性"},{ns:x.CnsBlack,nsName:"冥属性"}],T=await new te().LoadList(n);for(const C of d)l!==null&&(l.innerHTML=`${r} ${C.nsName}`),await i.setupNs(C.ns,m,T)}l!==null&&(l.innerHTML="UI 初期化中 ...");const c=new Le,h=new Ce;await h.loadDB(s);async function p(){async function d(){return await new te().LoadList(n)}const u=await d();u.uiInfo.name="charListArea",u.uiInfo.left="300",u.uiInfo.top="100";const T=u.uiInfo.name,C=await u.toHTML(i);if(e){const M="キャラ選択",f=u.createSelectorBox(M,T,C);u.addEventHandlers(f),u.addItemEventHandlers(),u.enableLazyImages(i),f.show();const L=new K;L.setAsDlg(f,M),c.add(L)}return u}const k=await p();async function $(){const d=new dt;d.uiInfo.name="CharSummary",d.uiInfo.left="400",d.uiInfo.top="100";const u=d.uiInfo.name,T=await d.toHTML();if(e){const C="キャラ一覧",M=d.createSummaryBox(C,u,T);d.addItemEventHandlers(),d.enableLazyImages(i),M.show();const f=new K;f.setAsDlg(M,C),c.add(f)}return d}const U=await $();async function z(d,u,T,C,M){const f=new gt;f.Init(h),f.formation.uiInfo.name=d,f.formation.uiInfo.left=`${u}`,f.formation.uiInfo.top=`${T}`;const L=f.formation.uiInfo.name,B=await f.toHTML(L,i),v=f.toGridHTML();if(e){const Y=f.createFormationBox(C,L,B,v,M);f.addEventHandlers(Y),f.addItemEventkHandlers(async N=>{N.selectCh=k.selectedCh;const H=await i.getImageUrlBy(k.selectedCh.iconFileName,k.selectedCh.ns);if(H===null)return;N.selectedImg=H,N.item.isEmpty=!1,console.log(`selected ch = ${N.selectCh.name}`);const V=ke.HiLv;E.combatPairs.get(V),N.uiName===J&&await E.replaceChar(V,A.Player,N.item,N.selectCh,i),N.uiName===oe&&await E.replaceChar(V,A.Enemy,N.item,N.selectCh,i),await E.replaceJudge(i)},async N=>{const H=await i.getImageUrlBy(N.selectedImg,k.selectedCh.ns);if(H===null)return;N.selectedImg=H,N.item.isEmpty=!0,console.log(`empty ch = ${N.selectedImg}`);const V=ke.HiLv;E.combatPairs.get(V),N.uiName===J&&await E.replaceChar(V,A.Player,N.item,N.selectCh,i),N.uiName===oe&&await E.replaceChar(V,A.Enemy,N.item,N.selectCh,i),await E.replaceJudge(i)},async N=>{console.log(`selected ch = ${N.item.ch.name}`);const H=new pt;H.selectCh=N.item.ch,H.selectedImg=N.selectedImg,H.scoreSet=N.scoreSet,U.charStock(H)},async N=>{const H=Ue();console.log(H),await H.replaceJudge(i)}),f.enableLazyImages(i),Y.show();const re=new K;re.setAsDlg(Y,C),c.add(re)}return f}const J="playerForm",oe="enemyForm",be=await z(J,100,100,"自編成",!0),Ne=await z(oe,100,200,"敵編成",!1);async function Ze(d,u,T,C){E.uiInfo.name=d,E.uiInfo.left=`${u}`,E.uiInfo.top=`${T}`;const M=await E.toHTML("combatTable",i),f=E.createCombatBox(C,d,M);E.enableLazyImages(i),await E.replaceJudge(i),f.show();const L=new K;L.setAsDlg(f,C),c.add(L)}const E=Ue();await Ze("combatForm",120,300,"対戦予想");const He="保存";{const d=new K;d.setAsMenu(He),c.add(d)}const Re="復帰";{const d=new K;d.setAsMenu(Re),c.add(d)}let De=null;const et=await c.toHTML("dockForm",i);if(e){const d=c.createDockBox("dockForm",et);c.addItemClickHandlers(async u=>{if(u.item.dlgParent===null){u.cancel=!0;return}console.log(`selected item = [${u.item.toolTip}::${u.item.dockType}]`),u.item.isUIType&&(new y().MoveHiestLayer(u.item.dlgParent),u.item.dlgParent.hidden&&(u.item.dlgParent.hidden=!1)),u.item.isMenuType&&(u.item.toolTip===He&&await tt(),u.item.toolTip===Re&&await st(async T=>{if(console.log(`[loadedResult] ${T}`),T!==Z.Success)return;const C=W.fromJsonInst(ae),M=W.fromJsonInst(le);ae=null,le=null,await be.Setup(C,i),await Ne.Setup(M,i)}))}),c.enableLazyImages(i),d.show(),De=d}const Fe="playerForm.json",Be="enemyForm.json",Pe="dockForm.json";async function tt(){c.InitZOrder(j);const d=W.toJsonText(be.formation),u=W.toJsonText(Ne.formation),T=fe.toJsonText(c),C=new window.JSZip;C.file(Fe,d),C.file(Be,u),C.file(Pe,T);const M=await C.generateAsync({type:"blob"}),f="gameConfig.zip",L=URL.createObjectURL(M),B=document.createElement("a");B.href=L,B.download=f,B.click(),URL.revokeObjectURL(L),console.log("saved!")}let Ae=null,ae=null,le=null;async function st(d){const u=document.createElement("input");return u.type="file",u.accept=".zip",u.addEventListener("cancel",()=>(console.log("Cancelled."),Z.Cancel)),u.addEventListener("change",async()=>{if(u.files.length==1){console.log("File selected: ",u.files[0].name);const C=await u.files[0].arrayBuffer(),f=await new window.JSZip().loadAsync(C);async function L(v){const Y=f.file(v);if(Y){const re=await Y.async("string"),N=JSON.parse(re);return console.log(N),N}}{const v=await L(Pe);v&&(Ae=v)}{const v=await L(Fe);v&&(ae=v)}{const v=await L(Be);v&&(le=v)}const B=Ae!==null&&ae!==null&&le!==null?Z.Success:Z.Fail;d(B)}}),u.click(),Z.Unknown}const j=new y;e&&(j.AddDialogs(),j.AssignIndexies(),await j.LoadAllSetting(),await j.loadSetting(De),c.InitZOrder(j),await j.ForEachAsync(d=>{const u=O.FindDialogParent(d);return u!==null&&(m.isLocal||d==="charListArea"?u.hidden=!1:u.hidden=!0),!0})),o.hideFullScreenCss(a);function Oe(d){const u=new xe,T=new ve,C=d.formation;C.uiInfo.name,C.uiInfo.name;let M=0;for(const f of C.items){const L=d.scsList[M];M++;const B=Math.ceil(L.stdScore),v=new Xe(f.ch.id,f.ch.name,f.isEmpty,B);v.allAvailable=L.allAvailable,T.Add(v)}return u.Add(T),u.debug(),u}function Ue(){const d=new bt,u=Oe(be),T=Oe(Ne),C=new Me;C.setScoreItems(u.groupRows[0].columns),C.boost=100;const M=new Me;M.setScoreItems(T.groupRows[0].columns),M.boost=100;const f=new Ct;f.setPlayer(C),f.setEnemy(M),d.setPair(ke.HiLv,f),d.calcCombatScore();for(const[L,B]of d.combatPairs){const v=B.judge(P.None);console.log(`judge=[${v}]`)}return d}}class wt{constructor(){this.intervalMs=1e3,this.isOneShot=!0,this.intervalTimer=null}start(e,t){this.intervalTimer!==null&&this.clear(),this.intervalTimer=setTimeout(async()=>{t!==void 0&&(await t(e)||this.clear()),this.isOneShot===!0&&this.clear()},this.intervalMs)}clear(){clearTimeout(this.intervalTimer),this.intervalTimer=null}}class Ve{constructor(){this.key="",this.text="",this.comment=""}}class It{constructor(){this.itemList=new Array,this.uiInfo=new X,this.parentName="",this.saveTimer=null,this.onSave=async e=>(console.log(`${e.parentName}`),!1)}init(){for(let e=0;e<10;e++)this.itemList.push(new Ve)}async startAutoSave(){this.saveTimer=new wt,this.saveTimer.intervalMs=1e3,this.saveTimer.isOneShot=!1,this.saveTimer.start(this,this.onSave)}setRow(e,t,s){const n=new we;n.placeholder=e.key===""?"キー":e.key,s.getCell(0,t).typeInfo.setInput(n),s.getCell(0,t).className=this.itemKeyCssClassName(),s.getCell(0,t).typeInfo.using.itemId=t;const i=new we;i.placeholder=e.text===""?"文字列":e.text,s.getCell(1,t).typeInfo.setInput(i),s.getCell(1,t).className=this.itemTextCssClassName(),s.getCell(1,t).typeInfo.using.itemId=t;const o=new we;o.placeholder=e.comment===""?"コメント":e.comment,s.getCell(2,t).typeInfo.setInput(o),s.getCell(2,t).className=this.itemCommentCssClassName(),s.getCell(2,t).typeInfo.using.itemId=t,s.getCell(3,t).typeInfo.setButton("削除"),s.getCell(3,t).className=this.itemDeleteCssClassName(),s.getCell(3,t).typeInfo.using.itemId=t}toHTML(){if(!this.itemList)return"";const e=new de;if(this.itemList.length>=1)e.makeDim(4,this.itemList.length),this.itemList.forEach((i,o)=>{this.setRow(i,o,e)}),e.makeRowTemplate(),this.table=e;else{e.makeDim(4,1);const i=new Ve;this.setRow(i,0,e),e.makeRowTemplate(),e.clearRows(),this.table=e}const t=this.tableCssClassName(),s=this.table.ToScrollHTML(t,"");this.htmlMaker=new F;const n=new D;return n.props.name="",n.props.id="0",n.props.className=t,n.props.option.setTable(s),n.props.option.onSelect=async i=>{switch(console.log(`classify = ${i.classify} targetId = ${i.targetId}`),i.classify){case this.itemKeyCssClassName():break;case this.itemTextCssClassName():break;case this.itemCommentCssClassName():break;case this.itemDeleteCssClassName():const o=new se;o.setParent(this.dlgCssClassName());let a=b.None;switch(o.setYesNo(),a=await o.showWait(`${i.targetId} を削除しますか？`),a){case b.Yes:break;case b.No:return;case b.Cancel:return}const l=parseInt(i.targetId);l>=1&&(e.deleteRow(l),e.redimAllRows(),this.itemList.splice(l-this.table.firstRowIndex,1));break}},this.htmlMaker.add(n),this.htmlMaker.ToHTML()}createSummaryBox(e,t,s){this.parentName=t;const n=this.htmlMaker.MakeDefaultButtonsHTML(`
<button id="${this.textAddCssClassName()}">追加</button>
<button id="${this.applyCssClassName()}">保存</button>
`),i=`<div class="${this.dlgContentCssClassName()}" id="${this.dlgContentCssClassName()}">
   ${n}
   ${s}
</div>`,o=new O;o.title="<"+e+">";const a=o.NewDialog(t,this.dlgCssClassName());return o.SetContent(t,i),this.applyCss(),o.EnableEventHandlers(),a}addEventHandlers(e){document.getElementById(this.textAddCssClassName()).onclick=async()=>{},document.getElementById(this.applyCssClassName()).onclick=()=>{}}addItemEventHandlers(){this.htmlMaker.enableEvents(this.tableCssClassName())}textAddCssClassName(){return"res-edit-add"}applyCssClassName(){return"res-edit-apply"}itemKeyCssClassName(){return`${this.tableCssClassName()}-key`}itemTextCssClassName(){return`${this.tableCssClassName()}-text`}itemCommentCssClassName(){return`${this.tableCssClassName()}-comment`}itemDeleteCssClassName(){return`${this.tableCssClassName()}-delete`}tableRowCssClassName(){return"res-edit-table-row"}tableCssClassName(){return"res-edit-table"}dlgContentCssClassName(){return`${this.dlgCssClassName()}-content`}dlgCssClassName(){return"res-edit-dlg"}applyCss(){const e=parseInt(this.uiInfo.left),t=parseInt(this.uiInfo.top),s=document.createElement("style");s.textContent=`
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName,e,t)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.dlgContentCssClassName()} {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}
${this.htmlMaker.MakeDefaultButtonsCss()}
`.trim(),document.head.appendChild(s);const n=document.getElementById(this.parentName);this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`,n)}}async function kt(m){if(!m.isWebRunning)return;const e=m.isWebRunning;async function t(){const n=new It;n.init(),n.uiInfo.name="ResourceEdit",n.uiInfo.left="110",n.uiInfo.top="10";const i=n.uiInfo.name,o=await n.toHTML();if(e){const a=document.createElement("div");a.id=n.uiInfo.name,a.className=n.uiInfo.name,document.body.appendChild(a);const r=n.createSummaryBox("文字列リソース",i,o);n.addEventHandlers(r),n.addItemEventHandlers(),r.show()}return n}(await t()).startAutoSave()}const S=new ie,_e=S.isWebRunning;_e?(Tt(),S.parseURLParams(),S.currentUserHome===""&&S.setUser(S.user1Home)):S.setUser(S.user2Home);S.setPath();S.setImageHome(window.EVONA_CONFIG.isLocal);S.currentUserHome;let Ee=!1,Qe=!1;if(S.resMode===""&&_e){const m=new se;m.CheckVisible=!0,m.CheckText="位置情報を初期化",m.SecretEnable=!0;const e=S.setBrowserTitle();await m.showWait(`「${e} 」モードで起動します`)===b.Secret&&(Qe=!0),Ee=m.Checked}console.log(`secretMode=[${Qe}]`);console.log(`cleanMode=[${Ee}]`);S.statusJsonPath;S.zipPrefix;S.chListFile;S.chStatusListFile;if(Ee){const m=new Ge;m.init(),await m.clear()}switch(S.admin){case!0:await it(S);break;case!1:S.resMode===""?await Nt(S):await kt(S);break}function Tt(){const m=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname.startsWith("192.168."),e=m?"./jszip_dist/jszip.min.js":"https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js",t=m?"./jsstore_dist/jsstore.min.js":"https://cdn.jsdelivr.net/npm/jsstore/dist/jsstore.min.js";window.EVONA_CONFIG={isLocal:m,workerFile:"./jsstore_dist/jsstore.worker.min.js",demo:!m};function s(n,i=!1){const o=document.createElement("script");o.src=n,i&&(o.type="module"),o.async=!1,document.head.appendChild(o)}s(e),s(t)}

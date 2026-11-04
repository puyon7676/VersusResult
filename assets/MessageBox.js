export const MessageBoxButtonTypes = {
    None: "None",
    Ok: "Ok",
    OkCancel: "OkCancel",
    YesNo: "YesNo",
    YesNoCancel: "YesNoCancel",
};
export const MessageBoxIconTypes = {
    None: "None",
    Ok: "Ok",
    Question: "Question",
    Warning: "Warning",
};
export const MessageBoxResultTypes = {
    None: "None",
    Ok: "Ok",
    Cancel: "Cancel",
    Yes: "Yes",
    No: "No",
    Secret: "Secret",
};
/**
 * MessageBox API (EVONA Edition)
 * スプラッシュ画面と同様、動的CSS注入とinnerHTMLによるリッチテキスト対応
 */
export class EvonaMessageBox {
    //private readonly parentName: string = "evona-msg-box";
    parentName = "evona-msg-box";
    buttonType = MessageBoxButtonTypes.Ok;
    iconType = MessageBoxIconTypes.None;
    get btnNameS() { return `${this.parentName}-s1`; }
    get btnName1() { return `${this.parentName}-b1`; }
    get btnName2() { return `${this.parentName}-b2`; }
    get btnName3() { return `${this.parentName}-b3`; }
    get chkName1() { return `${this.parentName}-chk1`; }
    get authName1() { return `${this.parentName}-auth1`; }
    get authBtnName() { return `${this.parentName}-authBtn`; }
    resolver;
    setParent(parentName) {
        this.parentName = `${parentName}-msg-box`;
    }
    setTypes(buttonType, iconType) {
        this.buttonType = buttonType;
        this.iconType = iconType;
    }
    setOk(icon = MessageBoxIconTypes.Ok) {
        this.setTypes(MessageBoxButtonTypes.Ok, icon);
    }
    setOkCancel(icon = MessageBoxIconTypes.Question) {
        this.setTypes(MessageBoxButtonTypes.OkCancel, icon);
    }
    setYesNo(icon = MessageBoxIconTypes.Question) {
        this.setTypes(MessageBoxButtonTypes.YesNo, icon);
    }
    setYesNoCancel(icon = MessageBoxIconTypes.Question) {
        this.setTypes(MessageBoxButtonTypes.YesNoCancel, icon);
    }
    title = `Confirm`;
    btnS = ``;
    SecretEnable = false;
    btnAlign = `right`;
    btnOk = `OK`;
    btnCancel = `Cancel`;
    btnYes = `Yes`;
    btnNo = `No`;
    CheckVisible = false;
    CheckText = ``;
    Checked = false;
    Result = MessageBoxResultTypes.None;
    AuthVisible = false;
    onAuthChecking;
    authText = ``;
    authTextMax = 4;
    /**
     * 【1. 停止型】OKを押すまで次の行に行かせない
     * 使い方: await msgBox.showWait("確認してください");
     */
    async showWait(htmlContent, title = null) {
        this.remove();
        this.createUI(htmlContent, title === null ? this.title : title, true); // OKボタンあり
        return new Promise((resolve) => {
            this.resolver = resolve;
            let btn1 = false;
            let btn2 = false;
            let btn3 = false;
            switch (this.buttonType) {
                case MessageBoxButtonTypes.None:
                    break;
                case MessageBoxButtonTypes.Ok:
                    btn1 = true;
                    btn2 = false;
                    btn3 = false;
                    break;
                case MessageBoxButtonTypes.OkCancel:
                    btn1 = true;
                    btn2 = true;
                    btn3 = false;
                    break;
                case MessageBoxButtonTypes.YesNo:
                    btn1 = true;
                    btn2 = true;
                    btn3 = false;
                    break;
                case MessageBoxButtonTypes.YesNoCancel:
                    btn1 = true;
                    btn2 = true;
                    btn3 = true;
                    break;
            }
            if (btn1) {
                document.getElementById(this.btnName1)?.addEventListener("click", this.onB1Clicked, { once: true });
            }
            if (btn2) {
                document.getElementById(this.btnName2)?.addEventListener("click", this.onB2Clicked, { once: true });
            }
            if (btn3) {
                document.getElementById(this.btnName3)?.addEventListener("click", this.onB3Clicked, { once: true });
            }
            if (this.SecretEnable) {
                document.getElementById(this.btnNameS)?.addEventListener("click", this.onS1Clicked, { once: true });
            }
        });
    }
    onS1Clicked = (event) => {
        this.Result = MessageBoxResultTypes.Secret;
        this.setCheckResult();
        this.remove();
        if (this.resolver)
            this.resolver(this.Result);
    };
    onB1Clicked = (event) => {
        switch (this.buttonType) {
            case MessageBoxButtonTypes.None:
                this.Result = MessageBoxResultTypes.None;
                break;
            case MessageBoxButtonTypes.Ok:
                this.Result = MessageBoxResultTypes.Ok;
                break;
            case MessageBoxButtonTypes.OkCancel:
                this.Result = MessageBoxResultTypes.Ok;
                break;
            case MessageBoxButtonTypes.YesNo:
                this.Result = MessageBoxResultTypes.Yes;
                break;
            case MessageBoxButtonTypes.YesNoCancel:
                this.Result = MessageBoxResultTypes.Yes;
                break;
        }
        this.setCheckResult();
        this.remove();
        if (this.resolver)
            this.resolver(this.Result);
    };
    onB2Clicked = (event) => {
        switch (this.buttonType) {
            case MessageBoxButtonTypes.None:
                this.Result = MessageBoxResultTypes.None;
                break;
            case MessageBoxButtonTypes.Ok:
                this.Result = MessageBoxResultTypes.None;
                break;
            case MessageBoxButtonTypes.OkCancel:
                this.Result = MessageBoxResultTypes.Cancel;
                break;
            case MessageBoxButtonTypes.YesNo:
                this.Result = MessageBoxResultTypes.No;
                break;
            case MessageBoxButtonTypes.YesNoCancel:
                this.Result = MessageBoxResultTypes.No;
                break;
        }
        this.setCheckResult();
        this.remove();
        if (this.resolver)
            this.resolver(this.Result);
    };
    onB3Clicked = (event) => {
        switch (this.buttonType) {
            case MessageBoxButtonTypes.None:
                this.Result = MessageBoxResultTypes.None;
                break;
            case MessageBoxButtonTypes.Ok:
                this.Result = MessageBoxResultTypes.None;
                break;
            case MessageBoxButtonTypes.OkCancel:
                this.Result = MessageBoxResultTypes.Cancel;
                break;
            case MessageBoxButtonTypes.YesNo:
                this.Result = MessageBoxResultTypes.No;
                break;
            case MessageBoxButtonTypes.YesNoCancel:
                this.Result = MessageBoxResultTypes.Cancel;
                break;
        }
        this.setCheckResult();
        this.remove();
        if (this.resolver)
            this.resolver(this.Result);
    };
    onWindowKeyboard = (e) => {
        //console.log(e.key)
        if (e.key.length === 1) {
            this.onAuthKeyProc(e.key);
        }
    };
    onAuthButtonClicked = (event) => {
        const elemSend = event.target;
        if (elemSend === null)
            return;
        this.onAuthKeyProc(elemSend.textContent);
    };
    onAuthKeyProc(key) {
        if (this.authText.length < this.authTextMax) {
            if (/[a-zA-Z0-9]/.test(key)) {
                this.authText += key;
                const nInp = this.authText.length;
                let dispText = ``;
                for (let i = 0; i < this.authTextMax; i++) {
                    if (i < nInp)
                        dispText += `●`;
                    else
                        dispText += `○`;
                }
                const panel = document.getElementById(this.authName1);
                panel.innerText = dispText;
            }
        }
        if (this.authText.length >= this.authTextMax) {
            if (this.onAuthChecking !== undefined) {
                const authRes = this.onAuthChecking(this.authText);
                if (authRes) {
                    //認証結果がどうであれ「true」ならメッセージボックスを消す
                    window.removeEventListener('keydown', this.onWindowKeyboard);
                    for (let btn = 0; btn < 10; btn++) {
                        const btnName = `${this.authBtnName}-b${btn}`;
                        const elems = document.querySelectorAll(`.${btnName}`);
                        if (elems.length !== 1)
                            continue;
                        const btnElem = elems[0];
                        if (btnElem === null)
                            continue;
                        btnElem.removeEventListener("click", this.onAuthButtonClicked);
                    }
                    this.remove();
                    if (this.resolver)
                        this.resolver(this.Result);
                }
            }
        }
    }
    /**
     * 【2. 通過型】表示だけして、すぐ次の行を実行する
     * 使い方: msgBox.showNoWait("計算中...", "RUNNING");
     */
    showNoWait(htmlContent, title = "INFO") {
        this.remove();
        this.createUI(htmlContent, title, false); // ボタンなし（勝手に進む）
    }
    /**
     * 【3. 消去型】 showNoWait で出した窓を、好きなタイミングで消す
     * 使い方: msgBox.showNoWaitEnd();
     */
    showNoWaitEnd() {
        this.remove();
    }
    /** UI作成の共通処理 */
    createUI(htmlContent, title, hasButton) {
        let btnSecret = `<button id="${this.btnNameS}" class="${this.btnNameS}">${this.btnS}</button>`;
        let btn1 = ``;
        let btn2 = ``;
        let btn3 = ``;
        switch (this.buttonType) {
            case MessageBoxButtonTypes.None:
                break;
            case MessageBoxButtonTypes.Ok:
                btn1 = `<button id="${this.btnName1}">${this.btnOk}</button>`;
                btn2 = ``;
                break;
            case MessageBoxButtonTypes.OkCancel:
                btn1 = `<button id="${this.btnName1}">${this.btnOk}</button>`;
                btn2 = `<button id="${this.btnName2}">${this.btnCancel}</button>`;
                break;
            case MessageBoxButtonTypes.YesNo:
                btn1 = `<button id="${this.btnName1}">${this.btnYes}</button>`;
                btn2 = `<button id="${this.btnName2}">${this.btnNo}</button>`;
                break;
            case MessageBoxButtonTypes.YesNoCancel:
                btn1 = `<button id="${this.btnName1}">${this.btnYes}</button>`;
                btn2 = `<button id="${this.btnName2}">${this.btnNo}</button>`;
                btn3 = `<button id="${this.btnName3}">${this.btnCancel}</button>`;
                break;
        }
        let chk1 = ``;
        if (this.CheckVisible) {
            chk1 = `
<div style="padding: 5px 10px; font-size: 0.9em; text-align: left;">
    <label>
        <input type="checkbox" id="${this.chkName1}">${this.CheckText}
    </label>
</div>
`.trim();
        }
        let auth1 = ``;
        if (this.AuthVisible) {
            let authBtn = ``;
            for (let btn = 0; btn < 10; btn++) {
                const btnName = `${this.authBtnName}-b${btn}`;
                authBtn += `<button class="${btnName}" id="${btnName}">${btn}</button>`;
            }
            auth1 = `
<div style="padding: 5px 10px; font-size: 0.9em; text-align: left;">
    <label>
        <div class="${this.authName1}" id="${this.authName1}" tabindex="0">〇 〇 〇 〇</div>
    </label>
    ${authBtn}
</div>
`.trim();
        }
        const btnHTML = `${chk1}${btn1}${btn2}${btn3}`;
        const footer = btnHTML !== `` ? `<div class="msg-footer">${btnHTML}</div>` : ``;
        const wrapper = document.createElement("div");
        wrapper.id = this.parentName;
        wrapper.innerHTML = `
            <div class="msg-overlay">
                <div class="msg-panel">
                    <div class="msg-header">${title}${btnSecret}</div>
                    <div class="msg-body">${htmlContent}${auth1}</div>
                    ${footer}
                </div>
            </div>
        `.trim();
        this.applyCss();
        document.body.appendChild(wrapper);
        if (this.AuthVisible) {
            const panel = document.getElementById(this.authName1);
            panel.focus();
            this.authText = ``;
            window.addEventListener('keydown', this.onWindowKeyboard);
            for (let btn = 0; btn < 10; btn++) {
                const btnName = `${this.authBtnName}-b${btn}`;
                const elems = document.querySelectorAll(`.${btnName}`);
                if (elems.length !== 1)
                    continue;
                const btnElem = elems[0];
                if (btnElem === null)
                    continue;
                btnElem.addEventListener("click", this.onAuthButtonClicked);
            }
        }
    }
    /** 専用CSSの生成と注入 */
    applyCss() {
        const styleId = `${this.parentName}-style`;
        if (document.getElementById(styleId))
            return;
        let authBtn = ``;
        for (let btn = 0; btn < 10; btn++) {
            const btnName = `${this.authBtnName}-b${btn}`;
            authBtn += `
#${this.parentName} .${btnName} {
width: 30px;
padding: 10px;
border: none;
border-radius: 9px 9px 9px 9px;
}
`.trim();
        }
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
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
${authBtn}
`.trim();
        document.head.appendChild(style);
    }
    setCheckResult() {
        const checkElem = document.getElementById(this.chkName1);
        if (checkElem !== null) {
            const checked = checkElem.checked;
            this.Checked = checked;
        }
    }
    remove() {
        document.getElementById(this.btnName1)?.removeEventListener("click", this.onB1Clicked);
        document.getElementById(this.btnName2)?.removeEventListener("click", this.onB2Clicked);
        document.getElementById(this.btnName3)?.removeEventListener("click", this.onB3Clicked);
        document.getElementById(this.btnNameS)?.removeEventListener("click", this.onS1Clicked);
        document.getElementById(this.parentName)?.remove();
    }
}
//# sourceMappingURL=MessageBox.js.map
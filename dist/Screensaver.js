export class SimpleScreensaverManager {
    renderer;
    idleTimeoutMs;
    targetContainer;
    idleTimer = null;
    isRunning = false;
    overlayElement = null;
    constructor(renderer, idleTimeoutMs = 3000, // テスト用に3秒無操作で発動
    targetContainer // 指定がなければ全画面オーバーレイを自動生成
    ) {
        this.renderer = renderer;
        this.idleTimeoutMs = idleTimeoutMs;
        this.targetContainer = targetContainer;
        this.initEventListeners();
        this.resetIdleTimer();
    }
    /** マウスやキーボードの監視 */
    initEventListeners() {
        const events = ['mousemove', 'mousedown', 'keydown', 'touchstart'];
        events.forEach((event) => {
            window.addEventListener(event, () => this.handleUserActivity(), { passive: true });
        });
    }
    handleUserActivity() {
        if (this.isRunning) {
            this.stop(); // 動作中なら終了タイミングを通知
        }
        this.resetIdleTimer();
    }
    resetIdleTimer() {
        if (this.idleTimer !== null)
            window.clearTimeout(this.idleTimer);
        this.idleTimer = window.setTimeout(() => this.start(), this.idleTimeoutMs);
    }
    /** 【動かすタイミング】の到達 */
    start() {
        if (this.isRunning)
            return;
        this.isRunning = true;
        let mountTarget;
        if (this.targetContainer) {
            // プレビュー表示用DIVが指定されている場合
            mountTarget = this.targetContainer;
        }
        else {
            // 指定がない場合は画面全体を覆う暗転DIVを作成
            this.overlayElement = document.createElement('div');
            Object.assign(this.overlayElement.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                zIndex: '999999'
            });
            document.body.appendChild(this.overlayElement);
            mountTarget = this.overlayElement;
        }
        // レンダラーに「始まったよ！ここ（mountTarget）に描いてね！」と教える
        this.renderer.onStart(mountTarget);
    }
    /** 【終了するタイミング】の到達 */
    stop() {
        if (!this.isRunning)
            return;
        this.isRunning = false;
        // レンダラーに「終わったよ！片付けてね！」と教える
        this.renderer.onStop();
        // 暗転全画面DIVの破棄
        if (this.overlayElement && this.overlayElement.parentNode) {
            this.overlayElement.parentNode.removeChild(this.overlayElement);
            this.overlayElement = null;
        }
    }
}
//var idleTimeoutMs: number = 180000  // 3分無操作
var idleTimeoutMs = 3000; // 3分無操作
export function fullscreenScreensaver() {
    const myRenderer = {
        onStart: (container) => console.log("スクリーンセーバー開始！描画先:", container),
        onStop: () => console.log("スクリーンセーバー終了！")
    };
    const manager = new SimpleScreensaverManager(myRenderer, idleTimeoutMs);
}
export function previewScreensaver() {
    const myRenderer = {
        onStart: (container) => console.log("スクリーンセーバー開始！描画先:", container),
        onStop: () => console.log("スクリーンセーバー終了！")
    };
    const previewDiv = document.getElementById("preview-box");
    const previewManager = new SimpleScreensaverManager(myRenderer, 3000, previewDiv);
}
//# sourceMappingURL=Screensaver.js.map
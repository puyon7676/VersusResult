/**サーバーツール */
export class ServerTools {
    static server = `http://localhost:3000`;
    controller;
    async startFetchWithTry(url) {
        try {
            return await this.startFetch(url);
        }
        catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
                console.error("❌【AbortError！】（￣ー￣）");
            }
            else {
                console.error("サーバーが応答しません！", error);
            }
        }
        return null;
    }
    async startFetch(url) {
        const isOnline = navigator.onLine;
        if (!isOnline)
            return null;
        this.controller = new AbortController();
        const response = await fetch(url, {
            signal: this.controller.signal // コントローラーを直列結線！
        });
        this.endFetch(false);
        return response;
    }
    endFetch(isAbort = false) {
        if (this.controller !== undefined) {
            if (isAbort)
                this.controller.abort();
            this.controller = undefined;
        }
    }
    async startPost(url, bodyText) {
        const isOnline = navigator.onLine;
        if (!isOnline)
            return null;
        this.controller = new AbortController();
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // ⚡️ JSONを送るよ、という法律
            },
            body: bodyText,
            signal: this.controller.signal // コントローラーを直列結線！
        });
        this.endFetch(false);
        return response;
    }
    static async request(cmd) {
        const svt = new ServerTools();
        const response = await svt.startFetchWithTry(`${this.server}/${cmd}`);
        if (response !== null) {
            const result = await response.json();
            return result;
        }
        return null;
    }
    static async post(cmd, bodyText) {
        const svt = new ServerTools();
        const response = await svt.startPost(`${this.server}/${cmd}`, bodyText);
        if (response !== null) {
            const result = await response.json();
            return result;
        }
        return null;
    }
}
//# sourceMappingURL=ServerTools.js.map
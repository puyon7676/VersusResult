import { GameEnv } from "./GameEnv.js";
export const MaterialNames = {
    plus: `plus.png`,
    win: `win.png`,
    even: `even.png`,
    lost: `lost.png`,
    demo: `demo.png`,
};
export class ImageLoader {
    imageHome = "";
    enableCheckExist = true;
    cache = new Map(); // fileName → blobUrl
    cacheNs = new Map(); // fileName → ns
    zip = null;
    zipNs = new Map;
    isMultiZip = false;
    materials = [
        { ns: ``, fileName: MaterialNames.plus },
        { ns: ``, fileName: MaterialNames.win },
        { ns: ``, fileName: MaterialNames.even },
        { ns: ``, fileName: MaterialNames.lost },
        { ns: ``, fileName: MaterialNames.demo },
    ];
    get demoMaterial() { return MaterialNames.demo; }
    async setupNs(ns, env, chList) {
        const chNsList = chList.findByNs(ns);
        if (chNsList === undefined)
            return;
        /*
        const env = new GameEnv
        this.imageHome = env.imageHome.substring(2) // "./"を取り除く
        */
        this.imageHome = env.imageHome;
        for (const chInfo of chNsList) {
            const fileName = chInfo.iconFileName;
            //const url = `${currentUserHome}${this.imageHome}${ns}/${fileName}`
            const url = `${this.imageHome}${ns}/${fileName}`;
            this.cache.set(fileName, url);
            this.cacheNs.set(fileName, ns);
        }
        this.isMultiZip = true;
        for (const part of this.materials) {
            const fileName = part.fileName;
            //const url = `${this.imageHome}${part.ns}/${fileName}`
            const url = `${this.imageHome}${fileName}`;
            this.cache.set(fileName, url);
            this.cacheNs.set(fileName, ns);
        }
    }
    async checkExists(url) {
        try {
            const response = await fetch(url, { method: "HEAD" });
            // ステータスコードが 200(OK) なら存在、404 なら不在
            return response.ok;
        }
        catch (error) {
            // ネットワークエラーなども含めて「なし」と判断
            return false;
        }
    }
    isMaterial(fileName) {
        const exist = this.materials.find(material => material.fileName.includes(fileName));
        return exist === undefined ? false : true;
    }
    get loaded() {
        if (this.isMultiZip) {
            return this.zipNs.size !== 0 ? true : false;
        }
        return this.zip !== null ? true : false;
    }
    async _loadZipBy(zipFile, ns) {
        const env = new GameEnv;
        this.imageHome = env.imageHome.substring(2); // "./"を取り除く
        const data = await env.loadBinFile(zipFile);
        let zip = null;
        if (env.isWebRunning)
            zip = await window.JSZip.loadAsync(data);
        else {
            //this.zip = await JSZip.loadAsync(data);
            const { loadZipNode } = await import(env.nodeToolsImportFilename);
            zip = await loadZipNode(data);
        }
        this.zipNs.set(ns, zip);
        this.isMultiZip = true;
    }
    AnyNs = "";
    async getImageUrlBy(fileName, ns) {
        const isMaterial = this.isMaterial(fileName);
        if (isMaterial)
            return `${this.imageHome}${fileName}`;
        if (this.cache.has(fileName)) {
            const url = this.cache.get(fileName);
            if (this.enableCheckExist) {
                const exist = await this.checkExists(url);
                if (!exist) {
                    const url = `${this.imageHome}notexist.png`;
                    this.cache.set(fileName, url);
                }
            }
            return this.cache.get(fileName);
        }
        return null;
    }
    async findNs(fileNameFind) {
        if (!this.isMultiZip)
            return null;
        if (this.cacheNs.has(fileNameFind)) {
            const res = this.cacheNs.get(fileNameFind);
            if (res !== undefined)
                return res;
        }
        return null;
    }
    dispose() {
        for (const url of this.cache.values()) {
            URL.revokeObjectURL(url);
        }
        this.cache.clear();
    }
}
//# sourceMappingURL=ImageLoader.js.map
export class ClipboardHelper {
    static encodeEnable = true;
    static storeFile = `form.json`;
    static async put(text) {
        const encodedText = ClipboardHelper.encodeEnable ? await ClipboardHelper.encode(text) : text;
        try {
            await navigator.clipboard.writeText(encodedText);
        }
        catch (err) {
            console.error("コピー失敗...", err);
            return false;
        }
        return true;
    }
    static async get() {
        let text = ``;
        try {
            text = await navigator.clipboard.readText();
        }
        catch (err) {
            console.error("ペースト失敗...", err);
            return null;
        }
        return ClipboardHelper.encodeEnable ? await ClipboardHelper.decode(text) : text;
    }
    static async encode(jsonText) {
        const zip = ClipboardHelper.getEncoder();
        const fileName = ClipboardHelper.storeFile;
        zip.file(fileName, jsonText);
        const content = await zip.generateAsync({
            type: "base64",
            compression: "DEFLATE", // ここでギュッと圧縮
            compressionOptions: { level: 9 }
        });
        return content;
    }
    static async decode(encode) {
        const zip = ClipboardHelper.getEncoder();
        const fileName = ClipboardHelper.storeFile;
        try {
            const zipContent = await zip.loadAsync(encode, { base64: true });
            const decodeText = await zipContent.file(fileName).async("string");
            return decodeText;
        }
        catch (err) {
            console.error("デコード失敗...", err);
            return null;
        }
    }
    static getEncoder() {
        const zip = new window.JSZip();
        return zip;
    }
}
//# sourceMappingURL=ClipboardHelper.js.map
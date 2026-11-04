export class SegmenterHelperBuilder {
    useClassExport = false;
    stopWords = ``; //区切り文字判定
    importantWords = ``; //重要単語
    purgeMarks = ``; //抽出した単語の捨てる対象
    classSource = ``; //.jsのクラスコード
    constructor() {
        this.stopWords = `
"と","に","の","や","を","で","が",
"さ","せ","し","させる","さらに","する","て","自分",
`.trim();
        this.importantWords = `
"説明","挑発","効果",
`.trim();
        this.purgeMarks = `
"あり","ない","いる","え","える","が","に","の","した","そう","その","場合","約秒)","を","%","HP",
`.trim();
    }
    async LoadHelper() {
        const url = `./dist/SegmenterHelper.js`;
        const className = `SegmenterHelper`;
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Fetch failed: ${response.status}`);
            return false;
        }
        // 改行コードの表記揺れ（CRLF / LF）を LF (\n) に統一
        const code = (await response.text()).replace(/\r\n/g, '\n');
        // JSDocコメント（任意） + export class ClassName { までにマッチする正規表現
        const headerRegex = new RegExp(`(?:\\/\\*\\*[\\s\\S]*?\\*\\/\\s*)?export\\s+class\\s+${className}\\s*\\{`);
        const match = headerRegex.exec(code);
        if (!match)
            return false; // 対象クラスが見つからない場合
        const startIndex = match.index; // 開始位置（JSDocの先頭）
        let bodyStartIndex = startIndex + match[0].length - 1; // '{' の位置
        let closingIndex = this.findClosingBraceRecursive(code, bodyStartIndex);
        let classSource = code.substring(startIndex, closingIndex + 1);
        //console.log(classSource)
        if (!this.useClassExport) {
            const pos = classSource.indexOf(`export`);
            if (pos !== -1)
                classSource = classSource.substring(pos + `export`.length + 1).trim();
        }
        this.classSource = classSource;
        return true;
    }
    async makeCaller() {
        const callerCode = `
${this.classSource}
var stopWords = new Set([ ${this.stopWords} ]);
var importantWords = new Set([ ${this.importantWords} ]);
var purgeMarks = new Set([ ${this.purgeMarks} ]);
var jpText = "**ここに解析対象の日本語文章をいれる**";
var helper = new SegmenterHelper();
helper.decipheringContextJapaneseText(jpText);
for (const [w, n] of helper.resMap)
    console.log(w, n);
`;
        try {
            await navigator.clipboard.writeText(callerCode);
            console.log('クリップボードにコピーしました！');
        }
        catch (err) {
            console.error('クリップボードのコピーに失敗しました:', err);
        }
    }
    openIntlSegmenterDocs() {
        window.open('https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter', '_blank', 'noopener,noreferrer');
    }
    /**
     * openIndex（最初の '{' の位置）に対応する '}' の位置を再帰的に探す関数
     *
     * @param code ソースコード全文
     * @param openIndex 探したいブロックの開始 '{' の位置
     * @returns [見つかった '}' の位置, 次の検索開始位置]
     */
    findClosingBraceRecursive(code, openIndex) {
        let cursor = openIndex + 1;
        //console.log(openIndex, code.substring(openIndex, openIndex + 20))
        while (cursor < code.length) {
            const nextOpen = code.indexOf('{', cursor);
            const nextClose = code.indexOf('}', cursor);
            if (nextClose === -1)
                return -1; // 構文エラー（閉じカッコなし）
            // 自分の '}' より手前に新しい '{' が現れたら、子関数に「その '{' の閉じカッコ」までスキップしてもらう！
            if (nextOpen !== -1 && nextOpen < nextClose) {
                // ★ 子に任せて、帰ってきた '}' の次の位置までカーソルを一気に進める（再帰呼び出し）
                cursor = this.findClosingBraceRecursive(code, nextOpen) + 1;
            }
            else {
                // 手前に '{' がなければ、この nextClose こそが「自分が探していた '}'」！
                return nextClose;
            }
        }
        return -1;
    }
}
//# sourceMappingURL=SegmenterHelperBuilder.js.map
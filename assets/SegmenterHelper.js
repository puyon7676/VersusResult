/**日本語の文章を意味ある単位でくぎってみる */
export class SegmenterHelper {
    /**文章の\rをスペースに置き換える場合true */
    useSupressLf = false;
    /**抽出した語の最終文字から取り除きたい文字 */
    purgeSyms = new Set([
        `：`, `:`, `=`,
    ]);
    /**文章読み解き結果 */
    resMap = new Map;
    segmenter;
    crSplit = `|`;
    fifo = new Array();
    stopWords = new Set([
        /*`、`,`。`,*/ //これは必ず「isWordLike === false」になるみたいなので除外
        `と`, `に`, `の`, `や`, `を`, `で`, `が`,
        `さ`, `せ`, `し`, `させる`, `さらに`, `する`, `て`, `自分`,
    ]);
    punctMarks = new Set([
        `、`, `。`,
    ]);
    brackets = new Set([
        `【`, `『`, `「`, `［`, `（`, `(`, `｢`,
    ]);
    cbrackets = new Set([
        `】`, `』`, `」`, `］`, `）`, `)`, `｣`,
    ]);
    importantWords = new Set([
        `説明`, `挑発`, `効果`,
    ]);
    purgeMarks = new Set([
        `あり`, `ない`, `いる`, `え`, `える`, `が`, `に`, `の`, `した`, `そう`, `その`, `場合`, `約秒)`, `を`, `%`, `HP`,
    ]);
    constructor() {
        this.initInstance();
    }
    /**日本語の文脈を読み解く */
    decipheringContextJapaneseText(jpText) {
        //es2022で利用可能
        //const segmenter = new Intl.Segmenter("ja-JP", { granularity: "word" });
        //es2021で利用可能
        //const cleanString = jpText.replaceAll(/<[^>]+>/g, this.crSplit);
        let cleanString = jpText.replace(/<[^>]+>/g, this.crSplit);
        if (this.useSupressLf) {
            cleanString = cleanString.replace(/[\r\n]+/g, '');
        }
        //const segments = segmenter.segment(cleanString);
        const segments = this.segmenter.segment(cleanString);
        this.fifo = new Array();
        for (const { segment, isWordLike } of segments) {
            const word = segment.trim();
            if (!isWordLike) {
                if (this.punctMarks.has(word)) {
                    //console.log(`...!isWordLike && punctMarks`, `[${word}]`)
                    if (!this.isClosedBrackets()) {
                        this.fifo.push(word);
                    }
                    else {
                        if (word === `。`) {
                            this.fifo.push(word);
                            this.flushExpectLast();
                        }
                        else {
                            if (this.fifo.length !== 0)
                                this.fifo.push(word);
                        }
                    }
                    continue;
                }
                if (word === this.crSplit) {
                    this.flushAll();
                }
                else if (this.brackets.has(word)) {
                    if (this.fifo.length >= 1) {
                        const first = this.fifo[0];
                        if (!this.brackets.has(first)) {
                            //console.log(`...!isWordLike`, `[${word}]`, `flush[${first}]`)
                            this.flushAll();
                            this.fifo.push(word);
                        }
                        else
                            this.fifo.push(word);
                    }
                    else
                        this.fifo.push(word);
                }
                else if (this.cbrackets.has(word)) {
                    this.fifo.push(word);
                    if (this.isClosedBrackets())
                        this.flushAll();
                }
                else
                    this.fifo.push(word);
                //console.log(`...!isWordLike`, `[${word}]`)
                for (const w of this.fifo) {
                    if (this.importantWords.has(w)) {
                        this.flushAll();
                        break;
                    }
                }
                continue;
            }
            /*
            if (!isNaN(Number(word))) continue;
            if (/\d/.test(word)) continue
            if (/\d/.test(word)) {
                if (this.fifo.length >= 1) {
                    const last = this.fifo[this.fifo.length - 1]
                    if (last === `+`) {}
                    else continue
                }
            }
            */
            //console.log(`...`, word)
            if (!this.isClosedBrackets()) {
                this.fifo.push(word);
                continue;
            }
            const is1LenInFifo = this.fifo.length === 1 && this.fifo[0].length === 1;
            if (word.length >= 1) {
                this.fifo.push(word);
            }
            if (this.stopWords.has(word)) {
                let isExist = false;
                for (const br of this.brackets) {
                    isExist = this.fifo.includes(br);
                    if (isExist)
                        break;
                }
                if (isExist) {
                    continue;
                }
                if (is1LenInFifo)
                    this.flushAll();
                else
                    this.flushExpectLast();
            }
        }
        this.flushAll();
        this.purgeResMap();
    }
    purgeResMap() {
        const purgeKeys = new Array;
        for (const pw of this.purgeMarks) {
            for (const [key, count] of this.resMap) {
                if (key.startsWith(pw)) {
                    purgeKeys.push(key);
                }
                if (key.endsWith(pw)) {
                    purgeKeys.push(key);
                }
            }
        }
        console.log(`**purged**`, purgeKeys);
        for (const pk of purgeKeys) {
            this.resMap.delete(pk);
        }
    }
    /**カタカナのみの文字列か：厳密にカタカナのみ（一般的な長音符を含む） */
    static isKatakana(str) {
        return /^[\p{Script=Katakana}ー]+$/u.test(str);
    }
    /**カタカナのみの文字列か：空白や中黒（・）も許可する（姓名の入力など） */
    static isKatakana2(str) {
        return /^[\p{Script=Katakana}ー・\s]+$/u.test(str);
    }
    /**カタカナを含んでいるか */
    static containsKatakana(str) {
        return /\p{Script=Katakana}/u.test(str);
    }
    /**ひらがなを含んでいるか */
    static containsHiragana(str) {
        return /\p{Script=Hiragana}/u.test(str);
    }
    /**結果をキーの短い順にソート */
    get resMapKeyLenSorted() {
        const sortedEntries = Array.from(this.resMap.entries()).sort((p1, p2) => {
            return p1[0].length - p2[0].length;
        });
        const sortedMap = new Map(sortedEntries);
        return sortedMap;
    }
    /**結果を出現高順にソート */
    get resMapCountSorted() {
        const sortedEntries = Array.from(this.resMap.entries()).sort((p1, p2) => {
            return p1[1] - p2[1];
        });
        const sortedMap = new Map(sortedEntries);
        return sortedMap;
    }
    initInstance() {
        //const segmenter = new Intl.Segmenter("ja-JP", { granularity: "word" });
        if (SegmenterHelper.isSegmenterSupported) {
            // 型エラーを回避してインスタンス化
            const SegmenterClass = Intl.Segmenter;
            const segmenter = new SegmenterClass("ja-JP", { granularity: "word" });
            this.segmenter = segmenter;
        }
    }
    /**Intl.Segmenter が利用可能かチェックする*/
    static get isSegmenterSupported() {
        //return typeof Intl !== "undefined" && typeof Intl.Segmenter === "function";
        //console.log(typeof Intl, typeof Intl !== "undefined", "Segmenter" in (Intl as any))
        return typeof Intl !== "undefined" && "Segmenter" in Intl;
    }
    isClosedBrackets() {
        const openCount = this.fifo.filter(w => this.brackets.has(w)).length;
        const closeCount = this.fifo.filter(w => this.cbrackets.has(w)).length;
        const res = openCount - closeCount === 0;
        return res;
    }
    flushAll() {
        let combine = ``;
        for (const w of this.fifo) {
            //if (!this.stopWords.has(w))
            combine += w;
        }
        this.toResMap(combine);
        this.fifo = new Array();
    }
    flushExpectLast() {
        let combine = ``;
        let nWord = this.fifo.length - 1;
        for (const w of this.fifo) {
            if (nWord >= 1)
                combine += w;
            nWord--;
        }
        this.toResMap(combine);
        this.fifo = new Array();
    }
    toResMap(text) {
        if (text.trim() !== ``) {
            //console.log(text)
            let purged = false;
            for (const punct of this.punctMarks) {
                if (text.endsWith(punct)) {
                    if (text.length === 1)
                        return; //結果が空になるので捨てる
                    text = text.substring(0, text.length - 1);
                    purged = true;
                    break;
                }
            }
            if (!purged) {
                for (const sym of this.purgeSyms) {
                    if (text.endsWith(sym)) {
                        if (text.length === 1)
                            return; //結果が空になるので捨てる
                        text = text.substring(0, text.length - 1);
                        break;
                    }
                }
            }
            const exist = this.resMap.get(text);
            if (exist === undefined)
                this.resMap.set(text, 1);
            else
                this.resMap.set(text, exist + 1);
        }
    }
}
//# sourceMappingURL=SegmenterHelper.js.map
export class WordAnalysisInfo {
    leadingText = ``; //数値に先行する文字列
    numeric = Number.NaN; //含まれる数値
    text = ``;
    next = null;
}
export class ConvertTools {
    splitTextList = [`スキル`, `（星7）`];
    convTitle(title) {
        for (const splitText of this.splitTextList) {
            //const splitText = `スキル`
            if (title.endsWith(splitText)) {
                const t1 = title.substring(0, title.length - splitText.length);
                return `${t1}<br>${splitText}`;
            }
        }
        if (title.length <= 8)
            return title;
        return title;
    }
    /**文字列の先頭からグループキー（インデックス）を抽出する */
    static getIndexGroupKey(text) {
        // 先頭の連続する数字（全角数字も考慮する場合は [0-9０-９]+）をマッチさせる
        const match = text.match(/^([0-9]+)/);
        if (match) {
            return match[1]; // "10回攻撃" なら "10" を返す
        }
        // 数字で始まらない場合は従来通り先頭1文字
        return text.charAt(0);
    }
    /**文字列の先頭が数値から始まっているか */
    /*
    public static isNumericStarting(text: string): NumericInfo {
        // 先頭にある カッコ [(（] や 符号 [+-＋－] を無効化して、その直後の連続する数字を検出する
        // 例: "(100%)" -> "100", "(＋10)" -> "10", "（1.5倍）" -> "1.5"
        /*
        const cleanedText = text.replace(/^[（(][＋+－-]?|^[＋+－-]/, '');
        if (cleanedText !== text) {
            const match = cleanedText.match(/^([0-9０-９]+)/)
            if (match) {
                console.log(text, cleanedText, match[1])
                return { isNumeric: true, value: Number(match[1]), firstChar: match[1].charAt(0) }
            }
        }
        * /

        // 先頭の連続する数字（全角数字も考慮する場合は [0-9０-９]+）をマッチさせる
        //const match = text.match(/^([0-9]+)/);
        //const match = text.match(/^(\d+)/);
        const match = text.match(/^([0-9.]+)/);
        if (match) {
            //console.log(text, match[1])
            return { isNumeric: true, value: Number(match[1]), firstChar: match[1].charAt(0) }
        }
        // 数字で始まらない場合
        return { isNumeric: false, value: -1, firstChar: `` }
    }
    */
    /** 文字列の先頭が数値から始まっているか（全角・記号考慮版の例） */
    static isNumericStarting(text) {
        // 1. 先頭のカッコや空白、符号をスキップして最初の数字のカタマリを狙う場合
        // または、シンプルに全角半角の数字・小数点・符号を許容する場合の例：
        // 全角数字を半角に置換する小技を入れておくと、後続の Number() 変換が確実になります
        /*
        const normalized = text.replace(/[０-９]/g, (s) => {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
        */
        const normalized = text;
        // 符号やカッコを無視して、先頭の数値（整数・小数）を安全に抜く正規表現
        // 例: "(+12.35)" のようなケースに対応する場合
        const match = normalized.match(/^[+-]?[0-9]+(?:\.[0-9]+)?/);
        if (match && match[1]) {
            const numVal = Number(match[1]);
            if (!isNaN(numVal)) {
                return {
                    isNumeric: true,
                    value: numVal,
                    firstChar: match[1].charAt(0)
                };
            }
        }
        return { isNumeric: false, value: -1, firstChar: `` };
    }
    /**文字列に数値を含んでいるか解析する */
    static containsNumeric(word) {
        //const containsNum = word.match(/(\d+)/)
        //const containsNum = word.match(/^([0-9.]+)/);
        const containsNum = word.match(/[+-]?[0-9]+(?:\.[0-9]+)?/);
        if (containsNum !== null) {
            const numPos = containsNum.index;
            if (numPos !== undefined && numPos >= 1) {
                const left = word.substring(0, numPos);
                const numText = containsNum[0];
                const right = word.substring(left.length + numText.length);
                //console.log(left, numText, right)
                const info = new WordAnalysisInfo();
                info.leadingText = left;
                info.numeric = Number(numText);
                info.text = numText;
                if (right.trim().length !== 0)
                    info.next = this.containsNumeric(right.trim());
                return info;
            }
        }
        return null;
    }
    /** 比較用ロジック（再帰ノードを順に評価） */
    static compareNumericInfo(aInfo, bInfo, isAsc) {
        let aNode = aInfo;
        let bNode = bInfo;
        while (aNode !== null && bNode !== null) {
            // 接頭辞が一致している場合のみ数値比較
            if (aNode.leadingText === bNode.leadingText) {
                const diff = aNode.numeric - bNode.numeric;
                if (diff !== 0) {
                    return isAsc ? diff : -diff;
                }
                // 最初の数値が同じなら、next（次の数値構造）へ進んで比較を継続
                aNode = aNode.next;
                bNode = bNode.next;
            }
            else {
                // 接頭辞が異なるなら文字列の辞書順比較へ
                break;
            }
        }
        return 0;
    }
    /** 数値の全角半角変換 */
    static convNumZenToHan(text) {
        return text.replace(/[０-９]/g, (s) => {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
    }
    /**Unicodeエスケープシーケンスを含んでいるか判定 */
    static isUnicodeEscaped(text) {
        return /\\u[0-9a-fA-F]{4}/.test(text);
    }
    /**エスケープ文字列（\uXXXX）を人間が読める文字列に変換！ */
    static decodeUnicodeEscapes(text) {
        if (!this.isUnicodeEscaped(text))
            return text;
        try {
            // "\u0046" という文字列を JSON の文字列挙動を利用して変換
            return JSON.parse(`"${text.replace(/"/g, '\\"')}"`);
        }
        catch {
            // 万が一エスケープが崩れていた場合のフォールバック
            return text.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
        }
    }
    /**モールス信号（. と -）っぽいか判定（ドット、ハイフン、スペースのみで8文字以上など） */
    static isMorseCode(text) {
        const trimmed = text.trim();
        if (trimmed.length < 5)
            return false;
        // . - スペース / のみで構成されているか
        return /^[.\-\s\/]+$/.test(trimmed);
    }
    //モールス信号変換テーブル
    static MORSE_TABLE = {
        '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
        '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
        '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
        '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
        '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
        '--..': 'Z', '-----': '0', '.----': '1', '..---': '2', '...--': '3',
        '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8',
        '----.': '9',
        '----': 'O', // ハイフン4つのゆらぎを 'O' に変換
        '\\u0020': ' ', // 退避させた \u0020 をスペースに戻す
        ' ': ' ' // 生のスペースもスペースとして保持
    };
    /**モールス信号（. と -）変換 */
    static decodeMorse(text) {
        //text = `...- ---- ...- -. --- - ..-. --- ..- -. -..`
        return text.trim().split(/\s+/).map(code => this.MORSE_TABLE[code] || code).join('');
    }
    static decodeMorseGreedy(morseStr) {
        // 長いパターンから優先してマッチさせるためのテーブル
        const MORSE_PATTERNS = [
            { code: '...-', char: 'V' },
            { code: '---', char: 'O' },
            { code: '-..-', char: 'X' },
            { code: '-.-.', char: 'C' },
            { code: '---.', char: 'Ö' },
            { code: '----', char: 'CH' },
            { code: '...', char: 'S' },
            { code: '--', char: 'M' },
            { code: '..', char: 'I' },
            { code: '.-', char: 'A' },
            { code: '-.', char: 'N' },
            { code: '-', char: 'T' },
            { code: '.', char: 'E' },
        ];
        let result = '';
        let i = 0;
        while (i < morseStr.length) {
            let matched = false;
            for (const { code, char } of MORSE_PATTERNS) {
                if (morseStr.startsWith(code, i)) {
                    result += char;
                    i += code.length;
                    matched = true;
                    break;
                }
            }
            // 万が一マッチしない文字があれば1文字飛ばす
            if (!matched) {
                i++;
            }
        }
        return result;
    }
    /**ASCIIコードを対応文字に変換 */
    static isAsciiConvetable(input) {
        const tokens = input.trim().split(/\s+/);
        for (const token of tokens) {
            const tested = /^[0-9]+$/.test(token);
            if (!tested)
                return false;
            //console.log(token, tested)
            const code = parseInt(token, 10);
            // 有効な数値（ASCIIコードの範囲）であれば文字に変換
            if (!isNaN(code) && code >= 0 && code <= 0xffff) {
                continue;
            }
            return false; // 数値でなければそのまま残す（またはスキップ）
        }
        return true;
    }
    /**
     * 10進数ASCII文字列（例: "69 110 116 101 114"）を復元する
     */
    static decodeAsciiDec(input) {
        // 連続するスペースやタブ、改行で分割
        const tokens = input.trim().split(/\s+/);
        return tokens
            .map(token => {
            const code = parseInt(token, 10);
            // 有効な数値（ASCIIコードの範囲）であれば文字に変換
            if (!isNaN(code) && code >= 0 && code <= 0xffff) {
                return String.fromCharCode(code);
            }
            return token; // 数値でなければそのまま残す（またはスキップ）
        })
            .join('');
    }
}
let instConvertTools = null;
export function getConvertToolsInstance() {
    if (!instConvertTools) {
        instConvertTools = new ConvertTools();
        console.log("ConvertTools instance created (Singleton)");
    }
    return instConvertTools;
}
//# sourceMappingURL=ConvertTools.js.map
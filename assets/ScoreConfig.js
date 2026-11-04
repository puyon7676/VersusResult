import { CharNameSpaceTypes } from "./CharClass.js";
export class ScoreConfigItem {
    title = ""; //combo選択のタイトル文字列
    key = ""; //combo選択の識別
    selectionPair = []; //combo選択肢：["Lv1/1", "Lv2/2"]
    selectedVal = ""; //combo初期選択の値
    initScoreVal = 0; //スコア計算の最小値
    mulScoreVal = 0; //スコア計算の増分
    available = false; //選択肢が有効か
    orgMaxVal = 0; //元の最大値
    isSkill = false; //スキル項目か(getDetailでセット)
    /**標準スコア計算 */
    get stdScore() {
        const selectedVal = this.selectedVal.length >= 1 ? this.selectedVal : "1";
        const index = parseInt(selectedVal);
        let res = this.initScoreVal + index * this.mulScoreVal;
        return res;
    }
    /**標準スコア最大値 */
    get maxScore() {
        /*
        if (this.selectionPair.length === 0) return 0
        const index = this.selectionPair.length - 1
        let res = this.initScoreVal + index * this.mulScoreVal
        return res
        */
        return this.orgMaxVal;
    }
    get selectedText() {
        if (this.selectionPair.length === 0)
            return undefined;
        if (this.selectedVal === ``)
            return undefined;
        /*
        const index = parseInt(this.selectedVal) - 1
        if (index < 0)
            return undefined
        const pair = this.selectionPair[index].split(`/`)
        if (pair.length !== 2)
            return undefined
        return pair[0]
        */
        for (const pairText of this.selectionPair) {
            const pair = pairText.split(`/`);
            if (pair[1] === this.selectedVal)
                return pair[0];
        }
        return undefined;
    }
}
export class ScoreConfigSet {
    ns = CharNameSpaceTypes.None;
    items = new Array();
    allow = new Map(); //対応する性質（ぷよクエでの「とっくん」、メメントモリでの「」）
    roleText = ""; //ロール（ぷよクエでの「こうげきタイプ」、メメントモリでの「役割」）
    comboText = ""; //キャラコンビネーション加点のキーワード
    makeDemoLvText(prefix) {
        let res = "";
        for (let i = 1; i <= 100; i++) {
            res += `"${prefix}${i}/${i}",`;
        }
        res = res.substring(0, res.length - 1);
        return res;
    }
    load() {
        /*
                let scoreItem = new ScoreConfigItem()
                scoreItem.title = "Ch.Lv"
                scoreItem.key = "chLvId"
                scoreItem.selectionPair = ["Lv1/1", "Lv2/2"]
                scoreItem.selectedVal = "1"
                scoreItem.initScoreVal = 0
                scoreItem.numScoreItem = 0
                scoreItem.mulScoreVal = 0
                this.items.push(scoreItem)
        
                scoreItem = new ScoreConfigItem()
                scoreItem.title = "Ar.Lv"
                scoreItem.key = "chArId"
                scoreItem.selectionPair = ["Lv1/1", "Lv2/2"]
                scoreItem.selectedVal = "1"
                scoreItem.initScoreVal = 0
                scoreItem.numScoreItem = 0
                scoreItem.mulScoreVal = 0
                this.items.push(scoreItem)
        
                scoreItem = new ScoreConfigItem()
                scoreItem.title = "HP"
                scoreItem.key = "chHpId"
                scoreItem.selectionPair = ["Lv1/1", "Lv2/2"]
                scoreItem.selectedVal = "1"
                scoreItem.initScoreVal = 0
                scoreItem.numScoreItem = 0
                scoreItem.mulScoreVal = 0
                this.items.push(scoreItem)
        */
        /*
        const jsonText = await jsonFile.async("string");
        */
        const chLvs = this.makeDemoLvText("Lv");
        const arLvs = this.makeDemoLvText("Lv");
        const hpLvs = this.makeDemoLvText("");
        const jsonText = `
[
    {
        "title": "Ch.Lv",
        "key": "chLvId",
        "selectionPair": [
            ${chLvs}
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
            ${arLvs}
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
            ${hpLvs}
        ],
        "selectedVal": "1",
        "initScoreVal": 0,
        "numScoreItem": 0,
        "mulScoreVal": 0
    }
]
`;
        const resJson = JSON.parse(jsonText);
        const resMap = resJson.map((item) => Object.assign(new ScoreConfigItem(), item));
        this.items = resMap;
    }
    save() {
        console.log(JSON.stringify(this, null, 2));
    }
    clone() {
        const res = new ScoreConfigSet();
        for (const item of this.items) {
            const text = JSON.stringify(item, null, 2);
            const toItem = JSON.parse(text);
            res.items.push(toItem);
        }
        return res;
    }
    static copy(fromScSet, toScSet, isNewItems = false) {
        for (let index = 0; index < fromScSet.items.length; index++) {
            const fromItem = fromScSet.items[index];
            const toItem = isNewItems ? new ScoreConfigItem() : toScSet.items[index];
            toItem.title = fromItem.title;
            toItem.key = fromItem.key;
            toItem.selectionPair = fromItem.selectionPair;
            toItem.selectedVal = fromItem.selectedVal;
            toItem.initScoreVal = fromItem.initScoreVal;
            toItem.mulScoreVal = fromItem.mulScoreVal;
            toItem.available = fromItem.available;
            toItem.orgMaxVal = fromItem.orgMaxVal;
            toItem.isSkill = fromItem.isSkill;
            if (isNewItems)
                toScSet.items.push(toItem);
        }
    }
    set(key, value) {
        const match = this.items.find(item => item.key === key);
        if (match) {
            match.selectedVal = value;
            return true;
        }
        return false;
    }
    /**標準スコア計算 */
    get stdScore() {
        let res = 0;
        for (const item of this.items) {
            if (item.available)
                res += item.stdScore;
        }
        return res;
    }
    /**標準スコア最大値 */
    get maxScore() {
        let res = 0;
        for (const item of this.items) {
            if (item.available)
                res += item.maxScore;
        }
        return res;
    }
    /**スコア計算計算結果が有効か */
    get allAvailable() {
        for (const item of this.items) {
            if (item.available === false)
                return false;
        }
        return true;
    }
    getScoreText(toolTipNewLine) {
        let scoreText = ``;
        for (const scItem of this.items) {
            let scText = scItem.selectedText;
            scText = scText === undefined ? `*bug*` : scText;
            scoreText += toolTipNewLine + scItem.title + "：" + scText + "(" + Math.ceil(scItem.stdScore) + ")";
        }
        return scoreText;
    }
    getMaxScoreText(toolTipNewLine) {
        let scoreText = ``;
        for (const scItem of this.items) {
            let scText = scItem.selectedText;
            scText = scText === undefined ? `*bug*` : scText;
            scoreText += toolTipNewLine + scItem.title + "：" + scText + "(" + Math.ceil(scItem.maxScore) + ")";
        }
        return scoreText;
    }
    /**インスタンスメンバを対象にしたスコア計算 */
    static calcScore(inst, formula) {
        const parts = formula.split("+");
        let total = 0;
        for (const p of parts) {
            const token = p.trim();
            if (token.endsWith("()")) {
                //関数呼び出し
                const methodName = token.slice(0, -2);
                if (typeof inst[methodName] === "function") {
                    total += inst[methodName]();
                }
                else {
                    console.warn(`関数 '${methodName}' が存在しません`);
                }
            }
            else {
                //プロパティ参照
                const value = inst[token];
                if (typeof value === "number") {
                    total += value;
                }
                else if (Array.isArray(value)) {
                    total += value.reduce((a, b) => a + b, 0);
                }
                else {
                    console.warn(`プロパティ '${token}' が数値ではありません`);
                }
            }
        }
        return total;
    }
    /**インスタンスメンバを対象にしたスコア計算 */
    static calcScoreAdvanced(inst, formula) {
        // 1. inst のプロパティ名を引数名リストとして抽出
        const keys = Object.keys(inst);
        // 2. 引数に対応する実際の値を抽出
        const values = keys.map(k => inst[k]);
        // 3. コンパイル！ 
        // 第1引数〜は「変数名」、最後の一手が「関数の本体（return 文）」
        const executor = new Function(...keys, `return ${formula};`);
        // 4. 実行して結果を得る
        return executor(...values);
    }
    toInst(map) {
        // 1. テストデータをMapに追加
        /*
        const map = new Map<string, number>()
        for (const item of this.items) {
            map.set(item.key, parseInt(item.selectedVal))
        }
        */
        // 2. Mapを元にインスタンスを作成する関数
        const createInstanceFromMap = (dataMap) => {
            const DynamicClass = class {
                constructor() {
                    // Mapの各エントリーをこのインスタンスのプロパティとして設定
                    dataMap.forEach((value, key) => {
                        this[key] = value;
                    });
                }
            };
            return new DynamicClass();
        };
        // 3. 実行
        const instance = createInstanceFromMap(map);
        return instance;
    }
    static renameTitles(scoreSet) {
        if (scoreSet === undefined)
            return;
        for (let i = 0; i < scoreSet.items.length; i++) {
            for (let j = 0; j < scoreSet.items.length; j++) {
                if (i === j)
                    continue;
                if (scoreSet.items[i].title === scoreSet.items[j].title) {
                    scoreSet.items[i].title = scoreSet.items[i].title + `(1)`;
                    scoreSet.items[j].title = scoreSet.items[j].title + `(2)`;
                }
            }
        }
    }
}
//# sourceMappingURL=ScoreConfig.js.map
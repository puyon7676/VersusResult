import { GameEnv } from "../GameEnv.js";
import { registerCharStatusClassifyTypes, CharNameSpaceTypes, } from "../CharClass.js";
import { CharSpecItem } from "../CharSpec.js";
import { CharLoader } from "../CharLoader.js";
import { CharParseData, CharSaveStatusData } from "../CharDB.js";
import { registImporter } from "../SiteImporter.js";
import { ScoreConfigItem } from "../ScoreConfig.js";
export const PqCharStatusClassifyTypes = {
    /**ぷよクエ用 */
    classPq: "pq",
};
export const PqCharStatusNameTypes = {
    pqStatusHP: 'pqStatusHP',
    pqStatusATK: 'pqStatusATK',
    pqStatusREC: 'pqStatusREC',
    pqTokkunHP: 'pqTokkunHP',
    pqTokkunATK: 'pqTokkunATK',
    pqTokkunREC: 'pqTokkunREC',
    pqTokuSp1: 'pqTokuSp1',
    pqTokuSp2: 'pqTokuSp2',
    pqStatusType: 'pqStatusType',
    pqStatusCombo: 'pqStatusCombo',
    pqStatusSeries: 'pqStatusSeries',
    /**リーダースキル */
    pqLeaderSkill: 'pqLeaderSkill',
    /**フルパワースキル */
    pqFpSkill: 'pqFpSkill',
    /**デュアルシフトスキル */
    pqDsSkill: 'pqDsSkill',
    /**ダブルパワースキル */
    pqDpSkill: 'pqDpSkill',
    /**クロスアビリティ */
    pqCa: 'pqCa',
    /**ブーストエリア */
    pqBa: 'pqBa',
    /**スキル */
    pqNormalSkill: 'pqNormalSkill',
};
export class PuyoQueSiteImporter {
    gameType = PqCharStatusClassifyTypes.classPq;
    nsURLs = [
        { ns: CharNameSpaceTypes.CnsRed, nsName: "赤属性", url: `https://game8.jp/puyoque/116443`, lastUpdate: null }, //赤
        { ns: CharNameSpaceTypes.CnsBlue, nsName: "青属性", url: `https://game8.jp/puyoque/116444`, lastUpdate: null }, //青
        { ns: CharNameSpaceTypes.CnsGreen, nsName: "緑属性", url: `https://game8.jp/puyoque/116445`, lastUpdate: null }, //緑
        { ns: CharNameSpaceTypes.CnsYellow, nsName: "黄属性", url: `https://game8.jp/puyoque/116446`, lastUpdate: null }, //黄
        { ns: CharNameSpaceTypes.CnsViolet, nsName: "紫属性", url: `https://game8.jp/puyoque/116447`, lastUpdate: null }, //紫
    ];
    importerMapItem = {
        gm: PqCharStatusClassifyTypes.classPq,
        displayText: `ぷよクエ`,
        inst: this,
        nsURLs: this.nsURLs,
        htmlMarker: `puyoQue`,
        chListMaker: `puyo`, parseHtml: this.doParsePuyoHtml,
        statusMaker: `puyoStatus_`, parseStatus: this.doParsePuyoStatus, statusZip: `puyoQue_CharStatus.zip`,
        charHtmlZip: `puyoQue_CharHtml.zip`,
        charRisticWd: `puyoQue_RisticWd.json`,
    };
    async doParsePuyoHtml(htmlText, ns) {
        const saveArray = new Array;
        const timeElem = await PuyoQueSiteImporter.parsePuyoHtml(htmlText, async (chParseData) => {
            //console.log(chParseData)
            const ch = new CharSpecItem;
            //ch.id = parseInt(chParseData.id)
            ch.name = chParseData.name;
            ch.gt = PqCharStatusClassifyTypes.classPq;
            ch.ns = ns;
            ch.idAsText = chParseData.id;
            ch.contentURL = chParseData.contentURL;
            ch.iconURL = chParseData.imageFileName;
            saveArray.push(ch);
        });
        const nsItem = this.nsURLs.find(nsURL => nsURL.ns === ns);
        if (nsItem !== undefined)
            nsItem.lastUpdate = timeElem;
        console.log(timeElem, saveArray);
        return saveArray;
    }
    async doParsePuyoStatus(htmlText) {
        const saveArray = new Array();
        const siteLoader = new CharLoader();
        const res = await siteLoader.parsePuyoInfoHtml(htmlText, parseArray => {
            for (const item of parseArray) {
                if (item.need) {
                    if (item.value === ``) {
                        continue;
                    }
                }
                else {
                    if (item.value === ``) {
                        continue;
                    }
                }
                const saveItem = new CharSaveStatusData();
                saveItem.disp = item.find;
                saveItem.key = item.key;
                saveItem.value = item.value;
                saveItem.useCombo = item.useCombo;
                saveArray.push(saveItem);
            }
        });
        console.log(saveArray);
        return saveArray;
    }
    charStatusDB;
    get scoreTable() {
        const table = [
            { key: PqCharStatusNameTypes.pqStatusHP, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: PqCharStatusNameTypes.pqStatusATK, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: PqCharStatusNameTypes.pqStatusREC, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: PqCharStatusNameTypes.pqTokkunHP, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 5);
                } },
            { key: PqCharStatusNameTypes.pqTokkunATK, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 5);
                } },
            { key: PqCharStatusNameTypes.pqTokkunREC, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 5);
                } },
            { key: PqCharStatusNameTypes.pqTokuSp1, isSkill: false,
                scoreFunc: (key, min, value) => {
                    return this.charStatusDB.scoreFunc(1, this.puyoToku(value), 10);
                } },
            { key: PqCharStatusNameTypes.pqTokuSp2, isSkill: false,
                scoreFunc: (key, min, value) => {
                    return this.charStatusDB.scoreFunc(1, this.puyoToku(value), 10);
                } },
        ];
        return table;
    }
    get detailTable() {
        function makeRes(key, value) {
            const sci = new ScoreConfigItem;
            sci.key = key;
            sci.selectedVal = value;
            return sci;
        }
        const table1 = this.scoreTable;
        const table2 = [
            { key: PqCharStatusNameTypes.pqLeaderSkill, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
            { key: PqCharStatusNameTypes.pqFpSkill, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
            { key: PqCharStatusNameTypes.pqDsSkill, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
            { key: PqCharStatusNameTypes.pqDpSkill, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
            { key: PqCharStatusNameTypes.pqCa, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
            { key: PqCharStatusNameTypes.pqBa, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
            { key: PqCharStatusNameTypes.pqNormalSkill, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
        ];
        return table1.concat(table2);
    }
    register() {
        registerCharStatusClassifyTypes(PqCharStatusClassifyTypes);
        const res = registImporter(this.importerMapItem);
        return res;
    }
    static parsePuyoHtml = async (htmlText, callback) => {
        const env = new GameEnv;
        const doc = await env.getDoc(htmlText);
        //更新日時を検索
        const timeElems = doc.getElementsByTagName(`time`);
        let timeElem = null;
        if (timeElems.length === 1) {
            timeElem = timeElems[0];
            console.log(`**found update datetime(time tag)**`, timeElem);
        }
        // tablesorterクラスのテーブルを特定
        const table = doc.querySelector('.a-table.tablesorter');
        if (!table)
            return null;
        let validRows = 0;
        const rows = table.querySelectorAll('tr');
        const rowArray = Array.from(rows);
        for (const row of rowArray) {
            const cols = row.querySelectorAll('td');
            if (cols.length < 3)
                continue;
            const colCh = cols[0];
            const name = colCh?.textContent?.trim();
            //console.log(colCh)
            if (name === null) {
                //キャラ名が未定義
                console.log(`excluded character name`);
                continue;
            }
            //画像タグ
            const imgTag = colCh.querySelector('img');
            let localImagePath = "";
            if (imgTag) {
                const datasrc = imgTag.getAttribute('data-src') || "";
                localImagePath = datasrc;
            }
            //キャラID : https://game8.jp/puyoque/134992
            //          https://img.game8.jp/10425036/ce942ce498067436847cf19b96a3ebd8.png/show
            let id = "";
            let hrefPath = "";
            const aTag = colCh.querySelector('a');
            if (aTag) {
                const href = aTag.getAttribute('href') || "";
                if (href.length >= 1) {
                    const words = href.split(`/`);
                    if (words.length >= 4) {
                        id = words[words.length - 1];
                        if (id === `show`) {
                            id = words[words.length - 3];
                        }
                        //詳細ページは、HTML形式とイメージ形式があるみたい
                        hrefPath = href;
                    }
                }
            }
            //id が <a>タグになく、<img>タグにあるケース（そもそも<a>タグがない）
            if (id === "") {
                //詳細URLも未設定みたい
                //const name = colCh?.textContent?.trim()
                console.log(`excluded undefined-id character : ${name}(${id})`);
                continue;
            }
            //id を特定する文字列が未設定のケース
            if (id === "puyoque") {
                //詳細URLも未設定みたい
                //const name = colCh?.textContent?.trim()
                console.log(`excluded unknown-id character : ${name}(${id})`);
                continue;
            }
            //レアリティ
            const colRarity = cols[2];
            const rarityText = colRarity.textContent; // "☆1~4" や "☆6~7"
            let rarity = "";
            if (rarityText !== null) {
                // 「6」が含まれているか、または正規表現で数値を取り出して判定
                if (rarityText.includes("6") || rarityText.includes("7")) {
                    rarity = rarityText;
                }
            }
            if (rarity === "") {
                console.log(`excluded low rarity character : ${name}(${id})`);
                continue;
            }
            const res = new CharParseData();
            res.name = name;
            res.id = id;
            res.rarity = rarity;
            res.imageFileName = localImagePath;
            res.contentURL = hrefPath;
            //console.log(`[${res.imageFileName}]`)
            if (callback !== undefined) {
                validRows++;
                res.nRow = validRows;
                await callback(res);
            }
        }
        console.log(`[parsePuyoHtml] ${validRows} valid parsed!`);
        return timeElem;
    };
    puyoToku(value) {
        if (value === `enable`) {
            return 10;
        }
        return 1;
    }
}
//# sourceMappingURL=SitePqImporter.js.map
import { GameEnv } from "../GameEnv.js";
import { registerCharStatusClassifyTypes, CharNameSpaceTypes, CharRoleTypes, } from "../CharClass.js";
import { CharSpecItem } from "../CharSpec.js";
import { CharLoader } from "../CharLoader.js";
import { CharParseData, CharSaveStatusData } from "../CharDB.js";
import { registImporter } from "../SiteImporter.js";
import { CharRolePriolityTypes } from "../CharDB.js";
import { ScoreConfigItem } from "../ScoreConfig.js";
export const MmCharStatusClassifyTypes = {
    /**メメントモリ用 */
    classMM: "mm",
};
export const MmCharStatusNameTypes = {
    mmAbilitySTR: `mmAbilitySTR`, //腕力(*未対応)
    mmStatusFGT: `mmStatusFGT`, //戦闘力
    mmStatusATK: `mmStatusATK`, //攻撃力
    mmStatusPDF: `mmStatusPDF`, //物理防御力
    mmStatusACC: `mmStatusACC`, //命中
    mmStatusEVA: `mmStatusEVA`, //回避
    mmStatusCRI: `mmStatusCRI`, //クリティカル
    mmStatusMDF: `mmStatusMDF`, //魔法防御力
    mmStatusHP: `mmStatusHP`, //HP
    mmStatusCRD: `mmStatusCRD`, //クリティカル耐性
    mmStatusDEF: `mmStatusDEF`, //防御力
    mmStatusSPD: `mmStatusSPD`, //スピード
    mmAbilityDEX: `mmAbilityDEX`, //技力
    mmAbilityMGC: `mmAbilityMGC`, //魔力
    mmAbilityDUR: `mmAbilityDUR`, //耐久力
    mmRole: `mmRole`,
    /**アクティブスキル：Active Skill */
    mmSkillA: 'mmSkillA',
    /**パッシブスキル：Passive Skill */
    mmSkillP: 'mmSkillP',
    /**専用武器スキル：Signature Weapon Skill */
    mmSkillSw: 'mmSkillSw',
    /**専用スキル効果：Unique Skill Effect */
    mmSkillUe: 'mmSkillUe',
    /**専用パッシブ効果：Exclusive Passive Effect */
    mmSkillEpe: 'mmSkillEpe',
};
export class MemeMoriSiteImporter {
    gameType = MmCharStatusClassifyTypes.classMM;
    nsURLs = [
        { ns: CharNameSpaceTypes.CnsBlue, nsName: "藍属性", url: `https://altema.jp/mememori/indigochara`, lastUpdate: null }, //藍
        { ns: CharNameSpaceTypes.CnsRed, nsName: "紅属性", url: `https://altema.jp/mememori/crimsonchara`, lastUpdate: null }, //紅
        { ns: CharNameSpaceTypes.CnsGreen, nsName: "翠属性", url: `https://altema.jp/mememori/greenchara`, lastUpdate: null }, //翠
        { ns: CharNameSpaceTypes.CnsYellow, nsName: "黄属性", url: `https://altema.jp/mememori/yellowchara/`, lastUpdate: null }, //黄
        { ns: CharNameSpaceTypes.CnsWhite, nsName: "天属性", url: `https://altema.jp/mememori/heavenchara`, lastUpdate: null }, //天
        { ns: CharNameSpaceTypes.CnsBlack, nsName: "冥属性", url: `https://altema.jp/mememori/darknesschara`, lastUpdate: null }, //冥
    ];
    importerMapItem = {
        gm: MmCharStatusClassifyTypes.classMM,
        displayText: `メメントモリ`,
        inst: this,
        nsURLs: this.nsURLs,
        htmlMarker: `memeMori`,
        chListMaker: `meme`, parseHtml: this.doParseMemeHtml,
        statusMaker: `memeStatus_`, parseStatus: this.doParseMemeStatus, statusZip: `memeMori_CharStatus.zip`,
        charHtmlZip: `memeMori_CharHtml.zip`,
        charRisticWd: `memeMori_RisticWd.json`,
    };
    async doParseMemeHtml(htmlText, ns) {
        const saveArray = new Array;
        const timeElem = await MemeMoriSiteImporter.parseMemeHtml(htmlText, async (chParseData) => {
            //console.log(chParseData)
            const ch = new CharSpecItem;
            //ch.id = parseInt(chParseData.id)
            ch.name = chParseData.name;
            ch.gt = MmCharStatusClassifyTypes.classMM;
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
    async doParseMemeStatus(htmlText) {
        //後処理（"x位/n位"の表記の場合に100倍）：必要なので消さないこと！
        function postProc(statusData) {
            for (const status of statusData) {
                if (status.useCombo)
                    continue;
                if (status.key === MmCharStatusNameTypes.mmSkillA)
                    continue;
                if (status.key === MmCharStatusNameTypes.mmSkillP)
                    continue;
                if (status.key === MmCharStatusNameTypes.mmSkillSw)
                    continue;
                if (status.key === MmCharStatusNameTypes.mmSkillUe)
                    continue;
                if (status.key === MmCharStatusNameTypes.mmSkillEpe)
                    continue;
                //値に順位が含まれている場合100倍する
                let ratio = 1;
                let text = status.value;
                let pos = text.indexOf(`(`);
                if (pos >= 0) {
                    text = status.value.substring(0, pos);
                    ratio = 100;
                }
                //カンマを取り除く
                text = text.replace(/,/g, '');
                //変換結果設定
                status.converted = `${parseInt(text) * ratio}`;
            }
        }
        const saveArray = new Array();
        const siteLoader = new CharLoader();
        const res = await siteLoader.parseMemeInfoHtml(htmlText, parseArray => {
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
        postProc(saveArray);
        console.log(saveArray);
        return saveArray;
    }
    get scoreTable() {
        const table = [
            { key: MmCharStatusNameTypes.mmStatusFGT, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 240);
                } },
            { key: MmCharStatusNameTypes.mmStatusATK, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 240);
                } },
            { key: MmCharStatusNameTypes.mmStatusPDF, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 240);
                } },
            { key: MmCharStatusNameTypes.mmStatusACC, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 240);
                } },
            { key: MmCharStatusNameTypes.mmStatusEVA, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 240);
                } },
            { key: MmCharStatusNameTypes.mmStatusCRI, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 240);
                } },
            { key: MmCharStatusNameTypes.mmStatusMDF, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 240);
                } },
            { key: MmCharStatusNameTypes.mmStatusHP, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 240);
                } },
            { key: MmCharStatusNameTypes.mmStatusCRD, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 240);
                } },
            { key: MmCharStatusNameTypes.mmStatusDEF, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 240);
                } },
            { key: MmCharStatusNameTypes.mmStatusSPD, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 240);
                } },
            { key: MmCharStatusNameTypes.mmAbilityDEX, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 240);
                } },
            { key: MmCharStatusNameTypes.mmAbilityMGC, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 240);
                } },
            { key: MmCharStatusNameTypes.mmAbilityDUR, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 240);
                } },
            { key: MmCharStatusNameTypes.mmRole, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 240);
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
            { key: MmCharStatusNameTypes.mmSkillA, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
            { key: MmCharStatusNameTypes.mmSkillP, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
            { key: MmCharStatusNameTypes.mmSkillSw, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
            { key: MmCharStatusNameTypes.mmSkillUe, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
            { key: MmCharStatusNameTypes.mmSkillEpe, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
        ];
        return table1.concat(table2);
    }
    get rolePriolity() {
        const table = [
            { roleKey: CharRoleTypes.RlAttacker, priority: CharRolePriolityTypes.priHi,
                statusKey: [MmCharStatusNameTypes.mmAbilitySTR, MmCharStatusNameTypes.mmStatusATK, MmCharStatusNameTypes.mmStatusSPD] },
            { roleKey: CharRoleTypes.RlHealer, priority: CharRolePriolityTypes.priHi,
                statusKey: [MmCharStatusNameTypes.mmAbilityMGC, MmCharStatusNameTypes.mmStatusMDF, MmCharStatusNameTypes.mmStatusHP] },
            { roleKey: CharRoleTypes.RlDebuffer, priority: CharRolePriolityTypes.priHi,
                statusKey: [MmCharStatusNameTypes.mmAbilityDEX, MmCharStatusNameTypes.mmStatusACC, MmCharStatusNameTypes.mmStatusHP] },
            { roleKey: CharRoleTypes.RlBuffer, priority: CharRolePriolityTypes.priHi,
                statusKey: [MmCharStatusNameTypes.mmStatusPDF, MmCharStatusNameTypes.mmStatusHP, MmCharStatusNameTypes.mmStatusDEF] },
        ];
        return table;
    }
    charStatusDB;
    register() {
        registerCharStatusClassifyTypes(MmCharStatusClassifyTypes);
        const res = registImporter(this.importerMapItem);
        return res;
    }
    static parseMemeHtml = async (htmlText, callback) => {
        const env = new GameEnv;
        const doc = await env.getDoc(htmlText);
        // tablesorterクラスのテーブルを特定
        const table = doc.querySelector('.result_table.tableLine');
        if (!table)
            return null;
        //更新日時を検索
        const timeElems = doc.getElementsByTagName(`time`);
        let timeElem = null;
        if (timeElems.length === 1) {
            timeElem = timeElems[0];
            console.log(`**found update datetime(time tag)**`, timeElem);
        }
        let validRows = 0;
        const rows = table.querySelectorAll('tr');
        const rowArray = Array.from(rows);
        for (const row of rowArray) {
            const cols = row.querySelectorAll('td');
            if (cols.length < 5)
                continue;
            //[0]キャラ:id,img,name
            //[1]点数
            //[2]レア
            //[3]職業
            //[4]役割(Role)
            const colCh = cols[0];
            const name = colCh.textContent;
            if (name === null)
                continue;
            //console.log(colCh)
            //キャラID : <a href="https://altema.jp/mememori/chara/3">
            //          <a href="/mememori/rishesu">
            let id = "";
            let hrefPath = "";
            const aTag = colCh.querySelector('a');
            if (aTag) {
                const href = aTag.getAttribute('href') || "";
                if (href.length >= 1) {
                    const words = href.split(`/`);
                    if (words.length >= 4) {
                        id = words[words.length - 1];
                        hrefPath = href;
                    }
                    else if (words.length >= 3) {
                        hrefPath = href;
                    }
                }
            }
            if (hrefPath !== ``) {
                if (hrefPath.startsWith(`https://altema.jp/mememori`) === false) {
                    hrefPath = `https://altema.jp` + hrefPath;
                }
            }
            //画像タグ : <img src="https://img.altema.jp/common/1x1.trans.gif" data-lazy-src="https://img.altema.jp/mememori/chara/icon/114.jpg" alt="ケルベロス(冥)" class="aligncenter iconsize-60">
            const imgTag = colCh.querySelector('img');
            let localImagePath = "";
            if (imgTag) {
                const src = imgTag.getAttribute('data-lazy-src') || "";
                localImagePath = src;
            }
            //レアリティ
            const colRarity = cols[2];
            const rarityText = colRarity.textContent; //"N","R","R+","SR"
            let rarity = "";
            if (rarityText !== undefined) {
                //"N" 以外対象にする
                if (rarityText === "R" || rarityText === "R+" || rarityText === "SR") {
                    rarity = rarityText;
                }
            }
            //役割(Role)
            const colRole = cols[4];
            //キャラIDが未定義？
            if (id === ``) {
                //画像URLのURIをシリアル変換
                const fileParts = localImagePath.split(`/`);
                if (fileParts.length >= 1) {
                    const fileName = fileParts[fileParts.length - 1];
                    const idPart = fileName.split(`.`);
                    if (idPart.length >= 1) {
                        const num = Number(idPart[0]);
                        if (!isNaN(Number(num))) {
                            id = `${num}`;
                        }
                        else {
                            const serial = this.decodeStringToUtcSeconds(idPart[0]);
                            id = `${serial}`;
                        }
                    }
                }
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
        console.log(`[parseMemeHtml] ${validRows} valid parsed!`);
        return timeElem;
    };
    /**
     * 「2023y06m14d_1713340」といった文字列を
     * UTC基準のシリアル秒（Unix Timestamp）に一発変換する関数（￣ー￣）
     */
    static decodeStringToUtcSeconds(str) {
        // 1. 正規表現の釣り竿で、年(y)、月(m)、日(d)の数字をそれぞれ一本釣りする！
        const match = str.match(/(\d{4})y(\d{2})m(\d{2})d/);
        if (!match) {
            // 万が一、形式が違う文字列が来たら、安全弁として現在のタイムスタンプ（秒）を返す
            return Math.floor(Date.now() / 1000);
        }
        const year = parseInt(match[1], 10);
        // ★注意：JavaScriptのDateは「月」だけ0スタート（0=1月、5=6月）なので-1するお利口さん仕様！
        const month = parseInt(match[2], 10) - 1;
        const day = parseInt(match[3], 10);
        // 2. UTC基準でミリ秒のタイムスタンプを算出し、/1000 で「シリアル秒」へと昇華させる！
        const utcMillis = Date.UTC(year, month, day, 0, 0, 0);
        const utcSeconds = Math.floor(utcMillis / 1000);
        return utcSeconds;
    }
}
//# sourceMappingURL=SiteMmImporter.js.map
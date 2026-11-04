import { GameEnv } from "../GameEnv.js";
import { registerCharStatusClassifyTypes, CharNameSpaceTypes, } from "../CharClass.js";
import { CharSpecItem } from "../CharSpec.js";
import { CharParseData, CharSaveStatusData, CharParseDebug } from "../CharDB.js";
import { registImporter } from "../SiteImporter.js";
import { ScoreConfigItem } from "../ScoreConfig.js";
export const PcCharStatusClassifyTypes = {
    /**Pc用 */
    classPc: "Pc",
};
export const PcCharStatusNameTypes = {
    /**HP： */
    PcStatusHP: 'PcStatusHP',
    /**HP回：recovery */
    PcStatusHR: 'PcStatusHR',
    /**HP吸収：absorption */
    PcStatusHA: 'PcStatusHA',
    /**物攻： */
    PcStatusPA: 'PcStatusPA',
    /**物防： */
    PcStatusPD: 'PcStatusPD',
    /**魔攻： */
    PcStatusMA: 'PcStatusMA',
    /**魔防： */
    PcStatusMD: 'PcStatusMD',
    /**物クリ： */
    PcStatusPC: 'PcStatusPC',
    /**魔クリ： */
    PcStatusMC: 'PcStatusMC',
    /**TP上： */
    PcStatusTU: 'PcStatusTU',
    /**TP軽：To become lighter */
    PcStatusTL: 'PcStatusTL',
    /**TP自動回復：recovery */
    PcStatusTR: 'PcStatusTR',
    /**回復量上昇：Increased Healing Amount */
    PcStatusHI: 'PcStatusHI',
    /**回避：Evasion */
    PcStatusEv: 'PcStatusEv',
    /**命中： */
    PcStatusHt: 'PcStatusHt',
    /**スキル */
    PcSkill: 'PcSkill',
};
export class PcSiteImporter {
    gameType = PcCharStatusClassifyTypes.classPc;
    static domain = `https://gamewith.jp/pricone-re/article/show`;
    static imgDomain = `https://img.gamewith.jp`;
    nsURLs = [
        { ns: CharNameSpaceTypes.CnsRed, nsName: "火属性", url: `${PcSiteImporter.domain}/432553`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsBlue, nsName: "水属性", url: `${PcSiteImporter.domain}/432559`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsGreen, nsName: "風属性", url: `${PcSiteImporter.domain}/432575`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsYellow, nsName: "光属性", url: `${PcSiteImporter.domain}/432577`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsViolet, nsName: "闇属性", url: `${PcSiteImporter.domain}/432578`, lastUpdate: null },
    ];
    importerMapItem = {
        gm: PcCharStatusClassifyTypes.classPc,
        displayText: `プリコネ`,
        inst: this,
        nsURLs: this.nsURLs,
        htmlMarker: `pc`,
        chListMaker: `pc`, parseHtml: this.doParsePcHtml,
        statusMaker: `pcStatus_`, parseStatus: this.doParsePcStatus, statusZip: `pc_CharStatus.zip`,
        charHtmlZip: `pc_CharHtml.zip`,
        charRisticWd: `pc_RisticWd.json`,
    };
    async doParsePcHtml(htmlText, ns) {
        const saveArray = new Array;
        const timeElem = await PcSiteImporter.parsePcHtml(htmlText, async (chParseData) => {
            //console.log(chParseData)
            const ch = new CharSpecItem;
            //ch.id = Number(chParseData.id)
            ch.name = chParseData.name;
            ch.gt = PcCharStatusClassifyTypes.classPc;
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
    async doParsePcStatus(htmlText) {
        //後処理（カンマ除去）：必要なので消さないこと！
        function postProc(statusData) {
            for (const status of statusData) {
                if (status.useCombo)
                    continue;
                if (status.key === PcCharStatusNameTypes.PcSkill)
                    continue;
                let text = status.value;
                const valueParts = text.split(`→`);
                let min = valueParts[0];
                let max = valueParts[valueParts.length - 1];
                //カンマを取り除く
                max = max.replace(/,/g, '');
                //変換結果設定
                status.init = `${parseInt(min)}`;
                status.converted = `${parseInt(max)}`;
            }
        }
        const saveArray = new Array();
        const res = await PcSiteImporter.parsePcInfoHtml(htmlText, parseArray => {
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
    charStatusDB;
    get scoreTable() {
        const table = [
            { key: PcCharStatusNameTypes.PcStatusHP, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: PcCharStatusNameTypes.PcStatusHR, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: PcCharStatusNameTypes.PcStatusHA, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: PcCharStatusNameTypes.PcStatusPA, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: PcCharStatusNameTypes.PcStatusPD, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: PcCharStatusNameTypes.PcStatusMA, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: PcCharStatusNameTypes.PcStatusMD, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: PcCharStatusNameTypes.PcStatusPC, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: PcCharStatusNameTypes.PcStatusMC, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: PcCharStatusNameTypes.PcStatusTU, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: PcCharStatusNameTypes.PcStatusTL, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: PcCharStatusNameTypes.PcStatusTR, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: PcCharStatusNameTypes.PcStatusHI, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: PcCharStatusNameTypes.PcStatusEv, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: PcCharStatusNameTypes.PcStatusHt, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
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
            { key: PcCharStatusNameTypes.PcSkill, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
        ];
        return table1.concat(table2);
    }
    register() {
        registerCharStatusClassifyTypes(PcCharStatusClassifyTypes);
        const res = registImporter(this.importerMapItem);
        return res;
    }
    static parsePcHtml = async (htmlText, callback) => {
        const env = new GameEnv;
        const doc = await env.getDoc(htmlText);
        function sanitizeFileName(fileName) {
            return fileName.replace(/\//g, '／'); // スラッシュを全角に変換
        }
        //更新日時を検索
        const timeElems = doc.getElementsByTagName(`time`);
        let timeElem = null;
        if (timeElems.length === 1) {
            timeElem = timeElems[0];
            console.log(`**found update datetime(time tag)**`, timeElem);
        }
        //目次コンテナ要素を取得
        let validRows = 0;
        const h2_1 = doc.getElementById(`auto-convert-article-outline-h2-1`);
        let table = null;
        if (h2_1 !== null) {
            const aTag = h2_1.nextElementSibling;
            if (aTag !== null) {
                const div2 = aTag.nextElementSibling;
                if (div2 !== null) {
                    const div1 = div2.nextElementSibling;
                    if (div1 !== null) {
                        if (div1.tagName === `DIV`) {
                            for (const elem1 of div1.children) {
                                if (elem1.tagName !== `DIV`)
                                    continue;
                                const div0 = elem1;
                                for (const elem0 of div0.children) {
                                    if (elem0.tagName !== `TABLE`)
                                        continue;
                                    table = elem0;
                                    break;
                                }
                                if (table !== null)
                                    break;
                            }
                        }
                    }
                }
            }
        }
        if (table !== null) {
            const trs = table.querySelectorAll('tr');
            for (const tr of trs) {
                const cols = tr.cells;
                if (cols.length !== 5)
                    continue;
                if (cols[0].tagName !== `TD`)
                    continue;
                let name = "";
                let id = "";
                let hrefPath = "";
                let localImagePath = "";
                let rarityId = "";
                //キャラ詳細URL、数字部分をキャラIDとして取得
                //https://gamewith.jp/pricone-re/article/show/92871
                const aTagChs = cols[0].querySelectorAll('a');
                if (aTagChs.length >= 1) {
                    const aTagCh = aTagChs[0];
                    const hrefCh = aTagCh.getAttribute('href') || "";
                    hrefPath = hrefCh;
                    const parts = hrefPath.split(`/`);
                    if (parts.length - 1 > 0)
                        id = parts[parts.length - 1];
                }
                //キャラ画像
                //キャラ名
                //https://img.gamewith.jp/article_tools/pricone-re/gacha/92871_i.png
                const imgs = cols[0].querySelectorAll('img');
                if (imgs.length >= 1) {
                    const img = imgs[0];
                    const imgURL = img.src;
                    if (imgURL !== undefined)
                        localImagePath = imgURL;
                    const imgAlt = img.alt;
                    if (imgAlt !== undefined)
                        name = imgAlt;
                }
                if (name === null || name === ``)
                    continue;
                if (id === null || id === ``)
                    continue;
                if (hrefPath === null || hrefPath === ``) {
                    console.log(`[${name}] hrefPath is empty`);
                    continue;
                }
                const match2 = id.match(/(\d+)/);
                if (match2 === null) {
                    console.log(`[${name}] id is invalid`);
                    continue; //id未設定の場合は、キャラ詳細URLにも情報がないみたいなので除外
                }
                const res = new CharParseData();
                res.name = sanitizeFileName(name);
                res.id = id;
                res.rarity = rarityId;
                res.imageFileName = localImagePath;
                res.contentURL = hrefPath;
                if (callback !== undefined) {
                    validRows++;
                    res.nRow = validRows;
                    await callback(res);
                }
            }
        }
        console.log(`[parsePcHtml] ${validRows} valid parsed!`);
        return timeElem;
    };
    static parsePcInfoHtml = async (htmlText, callback) => {
        const env = new GameEnv;
        const doc = await env.getDoc(htmlText);
        const parseRules = [
            { hContent: ``, find: `HP`, key: `PcStatusHP`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `HP回`, key: `PcStatusHR`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `HP吸収`, key: `PcStatusHA`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `物攻`, key: `PcStatusPA`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `物防`, key: `PcStatusPD`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `魔攻`, key: `PcStatusMA`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `魔防`, key: `PcStatusMD`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `物クリ`, key: `PcStatusPC`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `魔クリ`, key: `PcStatusMC`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `TP上`, key: `PcStatusTU`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `TP軽`, key: `PcStatusTL`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `TP自動回復`, key: `PcStatusTR`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `回復量上昇`, key: `PcStatusHI`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `回避`, key: `PcStatusMD`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `命中`, key: `PcStatusEv`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `スキル`, key: `PcSkill`, value: ``, need: false, useCombo: false },
        ];
        function findRule(findText, hContent) {
            const match = parseRules.find(item => item.find === findText && item.hContent === hContent);
            if (match)
                return match;
            return null;
        }
        function parseScoreItems() {
            let table = null;
            const hSelector = `h2`;
            const headers = doc.querySelectorAll(hSelector);
            for (const hElem of headers) {
                const patternId = hElem.getAttribute('id') || "";
                const headerText = hElem.textContent !== null ? hElem.textContent.trim() : ``;
                //if (CharParseDebug.debug)
                //console.log(`${hSelector}::${patternId}::${headerText}`)
                if (headerText.includes(`のステータスボーナス`) === false)
                    continue;
                const h3 = hElem.nextElementSibling;
                if (h3 === null)
                    continue;
                const div1 = h3.nextElementSibling;
                if (div1 === null)
                    continue;
                const p = div1.nextElementSibling;
                if (p === null)
                    continue;
                const div0 = p.nextElementSibling;
                if (div0 === null)
                    continue;
                if (div0.children.length === 0)
                    continue;
                const table0 = div0.children[0];
                if (table0 === null)
                    continue;
                if (table0.tagName !== `TABLE`)
                    continue;
                table = table0;
                break;
            }
            if (table !== null && table.rows.length >= 2) {
                const tableHead = table.rows[0];
                const tableInfo = table.rows[table.rows.length - 1];
                if (tableHead.cells.length === tableInfo.cells.length) {
                    for (let colIndex = 1; colIndex < tableHead.cells.length; colIndex++) {
                        const name = tableHead.cells[colIndex].textContent;
                        const value = tableInfo.cells[colIndex].textContent;
                        const match = findRule(name, ``);
                        if (match) {
                            match.value = value;
                        }
                        else {
                            console.log(name, value);
                        }
                    }
                }
            }
        }
        function parseSkillItems() {
            const hSelector = `h3`;
            const headers = doc.querySelectorAll(hSelector);
            for (const hElem of headers) {
                const patternId = hElem.getAttribute('id') || "";
                const headerText = hElem.textContent !== null ? hElem.textContent.trim() : ``;
                //if (CharParseDebug.debug)
                //console.log(`${hSelector}::${patternId}::${headerText}`)
                if (headerText.includes(`最大スキル効果`) === false)
                    continue;
                const p = hElem.nextElementSibling;
                if (p === null)
                    continue;
                if (p.tagName !== `P`)
                    continue;
                let divNext = p.nextElementSibling;
                let skillAll = ``;
                while (divNext !== null) {
                    const divName = divNext;
                    if (divName === null)
                        break;
                    if (divName.tagName !== `DIV`)
                        break;
                    const divAbirity = divName.nextElementSibling;
                    if (divAbirity === null)
                        break;
                    if (divAbirity.tagName !== `DIV`)
                        break;
                    console.log(divName.className, divAbirity.className);
                    const h4s = divName.querySelectorAll(`h4`);
                    if (h4s.length === 0)
                        break;
                    const tables = divAbirity.querySelectorAll(`table`);
                    if (tables.length === 0)
                        break;
                    const skillName = h4s[0].textContent;
                    const table = tables[0];
                    let skillAbirityAll = ``;
                    for (const row of table.rows) {
                        for (const td of row.cells) {
                            for (const node of td.childNodes) {
                                if (node.nodeType === 3 /*Node.TEXT_NODE*/) {
                                    if (node.textContent !== null) {
                                        const skillAbirity = node.textContent.replace(/\s+/g, '');
                                        if (skillAbirityAll !== ``)
                                            skillAbirityAll += `<br>`;
                                        skillAbirityAll += skillAbirity;
                                    }
                                }
                                else if (node.nodeType === 1 /*Node.ELEMENT_NODE*/) {
                                    if (node.nodeName === 'BR') {
                                        skillAbirityAll += `<br>`;
                                    }
                                    if (node.nodeName === 'SPAN') {
                                        if (skillAbirityAll !== ``)
                                            skillAbirityAll += `<br>`;
                                        skillAbirityAll += node.textContent;
                                    }
                                }
                            }
                        }
                    }
                    //console.log(skillName, skillAbirityAll)
                    if (skillName !== `` && skillAbirityAll !== ``) {
                        if (skillAll !== ``)
                            skillAll += `<br>`;
                        skillAll += skillName + `<br>` + skillAbirityAll;
                    }
                    divNext = divAbirity.nextElementSibling;
                }
                if (skillAll !== ``) {
                    const match = findRule(`スキル`, ``);
                    if (match) {
                        match.value = skillAll;
                    }
                }
            }
        }
        parseScoreItems();
        parseSkillItems();
        let nEmpty = 0;
        parseRules.forEach(rule => { if (rule.need && rule.value === ``)
            nEmpty++; });
        if (nEmpty - parseRules.length === 0) { //if (nEmpty >= 1) {
            console.log(`cannot info parsed !`);
            parseRules.forEach(rule => { if (rule.need && rule.value === ``)
                console.log(`empty [${rule.find}]`); });
        }
        else {
            if (CharParseDebug.debug)
                console.log(`success all info parsed !`);
            if (callback)
                callback(parseRules);
            return true;
        }
        return false;
    };
}
//# sourceMappingURL=SitePcImporter.js.map
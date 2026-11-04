import { GameEnv } from "../GameEnv.js";
import { registerCharStatusClassifyTypes, CharNameSpaceTypes, } from "../CharClass.js";
import { CharSpecItem } from "../CharSpec.js";
import { CharParseData, CharSaveStatusData, CharParseDebug } from "../CharDB.js";
import { registImporter } from "../SiteImporter.js";
import { ScoreConfigItem } from "../ScoreConfig.js";
import { ConvertTools } from "../ConvertTools.js";
export const NkCharStatusClassifyTypes = {
    /**ニケ用 */
    classNk: "Nk",
};
export const NkCharStatusNameTypes = {
    /**バースト： */
    nkStatusBst: 'nkStatusBst',
    /**HP： */
    nkStatusHP: 'nkStatusHP',
    /**攻撃力： */
    nkStatusAtk: 'nkStatusAtk',
    /**防御力： */
    nkStatusDf: 'nkStatusDf',
    /**スキル： */
    nkSkillP: 'nkSkillP',
};
export class NkSiteImporter {
    gameType = NkCharStatusClassifyTypes.classNk;
    static domain = `https://game8.jp/nikke`;
    static imgDomain = `https://img.game8.jp`;
    nsURLs = [
        { ns: CharNameSpaceTypes.CnsRed, nsName: "灼熱", url: `${NkSiteImporter.domain}/491932`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsBlue, nsName: "水冷", url: `${NkSiteImporter.domain}/491933`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsGreen, nsName: "風圧", url: `${NkSiteImporter.domain}/491934`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsYellow, nsName: "電撃", url: `${NkSiteImporter.domain}/491936`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsViolet, nsName: "鉄甲", url: `${NkSiteImporter.domain}/491935`, lastUpdate: null },
    ];
    importerMapItem = {
        gm: NkCharStatusClassifyTypes.classNk,
        displayText: `ニケ`,
        inst: this,
        nsURLs: this.nsURLs,
        htmlMarker: `nikke`,
        chListMaker: `nk`, parseHtml: this.doParseNkHtml,
        statusMaker: `nkStatus_`, parseStatus: this.doParseNkStatus, statusZip: `nikke_CharStatus.zip`,
        charHtmlZip: `nikke_CharHtml.zip`,
        charRisticWd: `nikke_RisticWd.json`,
    };
    async doParseNkHtml(htmlText, ns) {
        const saveArray = new Array;
        const timeElem = await NkSiteImporter.parseNkHtml(htmlText, async (chParseData) => {
            //console.log(chParseData)
            const ch = new CharSpecItem;
            //ch.id = parseInt(chParseData.id)
            ch.name = chParseData.name;
            ch.gt = NkCharStatusClassifyTypes.classNk;
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
    async doParseNkStatus(htmlText) {
        const saveArray = new Array();
        const res = await NkSiteImporter.parseNkInfoHtml(htmlText, parseArray => {
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
            /*不要
            { key: NkCharStatusNameTypes.nkStatusBst, isSkill: false,
                scoreFunc: (key, min, value): ScoreConfigItem => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value); return this.charStatusDB.scoreFunc(min, max, max!) } },
            */
            { key: NkCharStatusNameTypes.nkStatusHP, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 100);
                } },
            { key: NkCharStatusNameTypes.nkStatusAtk, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 100);
                } },
            { key: NkCharStatusNameTypes.nkStatusDf, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 100);
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
            { key: NkCharStatusNameTypes.nkSkillP, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
        ];
        return table1.concat(table2);
    }
    register() {
        registerCharStatusClassifyTypes(NkCharStatusClassifyTypes);
        const res = registImporter(this.importerMapItem);
        return res;
    }
    static parseNkHtml = async (htmlText, callback) => {
        const env = new GameEnv;
        const doc = await env.getDoc(htmlText);
        //更新日時を検索
        const timeElems = doc.getElementsByTagName(`time`);
        let timeElem = null;
        if (timeElems.length === 1) {
            timeElem = timeElems[0];
            console.log(`**found update datetime(time tag)**`, timeElem);
        }
        let validRows = 0;
        const headers = doc.querySelectorAll('h2.a-header--2');
        for (const h2 of headers) {
            const h2Id = h2.getAttribute('id') || "";
            const h2Text = h2.textContent.trim();
            if (h2Text.includes(`キャラ一覧`) === false)
                continue;
            console.log(`${h2Id}, ${h2Text}`);
            let rowArray = null;
            let nextEl = h2.nextElementSibling;
            if (nextEl === null)
                continue;
            let tagName = nextEl.tagName;
            if (tagName !== `P`)
                continue;
            let pElem = nextEl;
            nextEl = pElem.nextElementSibling;
            if (nextEl === null)
                continue;
            tagName = nextEl.tagName;
            if (tagName !== `DIV`)
                continue;
            let divElem = nextEl;
            nextEl = divElem.nextElementSibling;
            if (nextEl === null)
                continue;
            tagName = nextEl.tagName;
            if (tagName !== `P`)
                continue;
            pElem = nextEl;
            nextEl = pElem.nextElementSibling;
            if (nextEl === null)
                continue;
            tagName = nextEl.tagName;
            if (tagName !== `DIV`)
                continue;
            divElem = nextEl;
            const tables = divElem.querySelectorAll('table');
            if (tables.length === 0)
                continue;
            const table = tables[0];
            const rows = table.querySelectorAll('tr');
            rowArray = Array.from(rows);
            if (rowArray.length >= 1) {
                console.log(`[${tagName}] found char info`);
                for (const row of rowArray) {
                    const cols = row.querySelectorAll('td');
                    if (cols.length < 4)
                        continue;
                    const colCh = cols[0];
                    //console.log(colCh)
                    //キャラID : https://game8.jp/nikke/805934
                    let name = "";
                    let id = "";
                    let hrefPath = "";
                    const aTag = colCh.querySelector('a');
                    if (aTag) {
                        name = aTag.textContent;
                        const href = aTag.getAttribute('href') || "";
                        if (href.length >= 1) {
                            const words = href.split(`/`);
                            if (words.length >= 4) {
                                id = words[words.length - 1];
                                hrefPath = href;
                            }
                        }
                    }
                    if (name === null || name === ``)
                        continue;
                    if (id === null || id === ``)
                        continue;
                    const imgTag = colCh.querySelector('img');
                    let localImagePath = "";
                    if (imgTag) {
                        const datasrc = imgTag.getAttribute('data-src') || "";
                        localImagePath = datasrc;
                    }
                    const res = new CharParseData();
                    res.name = name;
                    res.id = id;
                    res.rarity = cols[4].textContent;
                    res.imageFileName = localImagePath;
                    res.contentURL = hrefPath;
                    //console.log(`[${res.imageFileName}]`)
                    if (callback !== undefined) {
                        validRows++;
                        res.nRow = validRows;
                        await callback(res);
                    }
                }
            }
        }
        console.log(`[parseNkHtml] ${validRows} valid parsed!`);
        return timeElem;
    };
    static parseNkInfoHtml = async (htmlText, callback) => {
        const env = new GameEnv;
        const doc = await env.getDoc(htmlText);
        const parseRules = [
            //{ hContent: ``, find: `バースト`,   key: `nkStatusBst`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `HP`, key: `nkStatusHP`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `攻撃力`, key: `nkStatusAtk`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `防御力`, key: `nkStatusDf`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `スキル`, key: `nkSkillP`, value: ``, need: false, useCombo: false },
        ];
        function findRule(findText, hContent) {
            const match = parseRules.find(item => item.find === findText && item.hContent === hContent);
            if (match)
                return match;
            return null;
        }
        function formatSkillText(skillText) {
            if (!skillText.includes(`・`))
                return skillText;
            const skillTextTests = skillText.split(`・`);
            if (skillTextTests.length === 0)
                return skillText;
            const skillTextTest = skillTextTests[skillTextTests.length - 1];
            if (ConvertTools.isUnicodeEscaped(skillTextTest) ||
                ConvertTools.isMorseCode(skillTextTest) ||
                ConvertTools.isAsciiConvetable(skillTextTest)) {
                // モールス信号っぽい部分や数字列内の「半角スペース」だけを \u0020 に一時退避！
                // あるいは単純に全スペースを \u0020 に変換してトークナイザに渡す
                const converted = skillText.replace(/ /g, '\\u0020');
                console.log(`**converted**`, skillText, converted);
                return converted;
            }
            return skillText;
        }
        const divContents = doc.querySelectorAll('div.a-outline');
        for (const divContent of divContents) {
            const ulContents = divContent.querySelectorAll('ul');
            if (ulContents.length === 0)
                continue;
            const aContents = ulContents[0].querySelectorAll('a');
            for (const aContent of aContents) {
                const trackNierValue = aContent.dataset.trackNierValue;
                if (trackNierValue === undefined)
                    continue;
                const href = aContent.getAttribute('href') || "";
                if (href === ``)
                    continue;
                if (href.startsWith(`#`) === false)
                    continue;
                const contentId = href.substring(1);
                if (trackNierValue.includes(`評価とステータス`)) {
                    const h2Divs = doc.querySelectorAll(`h2[id="${contentId}"]`);
                    if (h2Divs.length === 0)
                        continue;
                    const h2Div = h2Divs[0];
                    let h3 = h2Div.nextElementSibling;
                    if (h3 === null)
                        continue;
                    let tableSkip = h3.nextElementSibling;
                    if (tableSkip === null)
                        continue;
                    const pElem = tableSkip.nextElementSibling;
                    if (pElem === null)
                        continue;
                    h3 = pElem.nextElementSibling;
                    if (h3 === null)
                        continue;
                    tableSkip = h3.nextElementSibling;
                    if (tableSkip === null)
                        continue;
                    h3 = tableSkip.nextElementSibling;
                    if (h3 === null)
                        continue;
                    const table = h3.nextElementSibling;
                    if (table === null)
                        continue;
                    if (table.tagName !== `TABLE`)
                        continue;
                    const rows = table.querySelectorAll('tr');
                    const rowArray = Array.from(rows);
                    if (rowArray.length === 0)
                        continue;
                    let thsTitle = null;
                    let tdsValue = null;
                    for (const row of rowArray) {
                        const ths = row.querySelectorAll('th');
                        const tds = row.querySelectorAll('td');
                        if (ths.length !== 0)
                            thsTitle = ths;
                        if (tds.length !== 0)
                            tdsValue = tds;
                        if (thsTitle !== null && tdsValue !== null)
                            break;
                    }
                    if (thsTitle !== null && tdsValue !== null) {
                        if (thsTitle.length !== tdsValue.length)
                            continue;
                        const nCol = thsTitle.length;
                        for (let colIndex = 0; colIndex < nCol; colIndex++) {
                            const title = thsTitle[colIndex].textContent;
                            const value = tdsValue[colIndex].textContent;
                            if (title === `` || value === ``)
                                continue;
                            const rule = findRule(title, ``);
                            if (rule !== null)
                                rule.value = value;
                        }
                    }
                }
                else if (trackNierValue.includes(`スキル`)) {
                    const h2Divs = doc.querySelectorAll(`h2[id="${contentId}"]`);
                    if (h2Divs.length === 0)
                        continue;
                    const h2Div = h2Divs[0];
                    let h3 = h2Div.nextElementSibling;
                    if (h3 === null)
                        continue;
                    let tableSkip = h3.nextElementSibling;
                    if (tableSkip === null)
                        continue;
                    tableSkip = tableSkip.nextElementSibling;
                    if (tableSkip === null)
                        continue;
                    let table = tableSkip.nextElementSibling;
                    let skillAll = ``;
                    while (table !== null) {
                        if (table.tagName !== `TABLE`)
                            break;
                        const rows = table.querySelectorAll('tr');
                        const rowArray = Array.from(rows);
                        if (rowArray.length === 0)
                            continue;
                        let thsTitle = null;
                        let tdsValue = null;
                        for (const row of rowArray) {
                            const ths = row.querySelectorAll('th');
                            const tds = row.querySelectorAll('td');
                            if (ths.length !== 0)
                                thsTitle = ths;
                            if (tds.length !== 0)
                                tdsValue = tds;
                            if (thsTitle !== null && tdsValue !== null)
                                break;
                        }
                        if (thsTitle !== null && tdsValue !== null) {
                            if (thsTitle.length !== tdsValue.length)
                                continue;
                            const nCol = thsTitle.length;
                            for (let colIndex = 0; colIndex < nCol; colIndex++) {
                                const skillName = thsTitle[colIndex].textContent;
                                const skillAbility = tdsValue[colIndex].textContent;
                                if (skillName === `` || skillAbility === ``)
                                    continue;
                                if (skillAll !== ``)
                                    skillAll += `<br>`;
                                skillAll += skillName + `<br>` + formatSkillText(skillAbility);
                            }
                        }
                        table = table.nextElementSibling;
                    }
                    if (skillAll !== ``) {
                        const rule = findRule(`スキル`, ``);
                        if (rule !== null)
                            rule.value = skillAll;
                    }
                }
            }
        }
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
//# sourceMappingURL=SiteNkImporter.js.map
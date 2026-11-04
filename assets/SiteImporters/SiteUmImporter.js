import { GameEnv } from "../GameEnv.js";
import { registerCharStatusClassifyTypes, CharNameSpaceTypes, } from "../CharClass.js";
import { CharSpecItem } from "../CharSpec.js";
import { CharParseData, CharSaveStatusData, CharParseDebug } from "../CharDB.js";
import { registImporter, toPlainText } from "../SiteImporter.js";
import { ScoreConfigItem } from "../ScoreConfig.js";
export const UmCharStatusClassifyTypes = {
    /**ウマ娘用 */
    classUm: "Um",
};
export const UmCharStatusNameTypes = {
    /**友情ボーナス：Friendship Bonus */
    umStatusFrB: 'umStatusFrB',
    /**トレーニング効果アップ ：Boost training effectiveness */
    umStatusBTE: 'umStatusBTE',
    /**レースボーナス：Race Bonus */
    umStatusRcB: 'umStatusRcB',
    /**得意率アップ：Increased Specialty Rate */
    umStatusSpR: 'umStatusSpR',
    /**所持スキル：Skills Possessed */
    umSkillP: 'umSkillP',
    /**育成イベントで取れるスキル：Skills obtainable in training events */
    umSkillOte: 'umSkillOte',
};
export class UmaMsmSiteImporter {
    gameType = UmCharStatusClassifyTypes.classUm;
    nsURLs = [
        { ns: CharNameSpaceTypes.CnsRed, nsName: "スピードタイプ", url: `https://game8.jp/umamusume/372400`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsBlue, nsName: "スタミナタイプ", url: `https://game8.jp/umamusume/372451`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsGreen, nsName: "パワータイプ", url: `https://game8.jp/umamusume/372452`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsYellow, nsName: "根性タイプ", url: `https://game8.jp/umamusume/372453`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsViolet, nsName: "賢さタイプ", url: `https://game8.jp/umamusume/372454`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsWhite, nsName: "友人タイプ", url: `https://game8.jp/umamusume/372455`, lastUpdate: null },
    ];
    importerMapItem = {
        gm: UmCharStatusClassifyTypes.classUm,
        displayText: `ウマ娘`,
        inst: this,
        nsURLs: this.nsURLs,
        htmlMarker: `umaMsm`,
        chListMaker: `uma`, parseHtml: this.doParseUmaHtml,
        statusMaker: `umaStatus_`, parseStatus: this.doParseUmaStatus, statusZip: `umaMsm_CharStatus.zip`,
        charHtmlZip: `umaMsm_CharHtml.zip`,
        charRisticWd: `umaMsm_RisticWd.json`,
    };
    async doParseUmaHtml(htmlText, ns) {
        const saveArray = new Array;
        const timeElem = await UmaMsmSiteImporter.parseUmaHtml(htmlText, async (chParseData) => {
            //console.log(chParseData)
            const ch = new CharSpecItem;
            //ch.id = parseInt(chParseData.id)
            ch.name = chParseData.name;
            ch.gt = UmCharStatusClassifyTypes.classUm;
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
    async doParseUmaStatus(htmlText) {
        const saveArray = new Array();
        const res = await UmaMsmSiteImporter.parseUmaInfoHtml(htmlText, parseArray => {
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
            { key: UmCharStatusNameTypes.umStatusFrB, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, max);
                } },
            { key: UmCharStatusNameTypes.umStatusBTE, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, max);
                } },
            { key: UmCharStatusNameTypes.umStatusRcB, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, max);
                } },
            { key: UmCharStatusNameTypes.umStatusSpR, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, max);
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
            { key: UmCharStatusNameTypes.umSkillP, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
            { key: UmCharStatusNameTypes.umSkillOte, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
        ];
        return table1.concat(table2);
    }
    register() {
        registerCharStatusClassifyTypes(UmCharStatusClassifyTypes);
        const res = registImporter(this.importerMapItem);
        return res;
    }
    static parseUmaHtml = async (htmlText, callback) => {
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
        const headers = doc.querySelectorAll('h3.a-header--3');
        for (const h3 of headers) {
            const rarityId = h3.getAttribute('id') || "";
            const rarityName = h3.textContent.trim();
            console.log(`${rarityId}, ${rarityName}`);
            let rowArray = null;
            let nextEl = h3.nextElementSibling;
            while (nextEl) {
                const tagName = nextEl.tagName;
                if (tagName === `P`) {
                    console.log(`[${tagName}] ${rarityId} nothing char info`);
                    break;
                }
                if (tagName === `TABLE`) {
                    //console.log(`[${tagName}]`)
                    const table = nextEl;
                    const rows = table.querySelectorAll('tr');
                    rowArray = Array.from(rows);
                    if (rowArray.length >= 1) {
                        console.log(`[${tagName}] found char info`);
                        break;
                    }
                }
                nextEl = nextEl.nextElementSibling;
            }
            if (rowArray === null)
                continue;
            for (const row of rowArray) {
                const cols = row.querySelectorAll('td');
                if (cols.length < 1)
                    continue;
                const colCh = cols[0];
                //console.log(colCh)
                //キャラID : https://game8.jp/umamusume/785656"
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
                res.rarity = rarityId;
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
        console.log(`[parseUmaHtml] ${validRows} valid parsed!`);
        return timeElem;
    };
    static parseUmaInfoHtml = async (htmlText, callback) => {
        const env = new GameEnv;
        const doc = await env.getDoc(htmlText);
        const parseRules = [
            { hContent: ``, find: `友情ボーナス`, key: `umStatusFrB`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `トレーニング効果アップ`, key: `umStatusBTE`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `レースボーナス`, key: `umStatusRcB`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `得意率アップ`, key: `umStatusSpR`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `所持スキル`, key: `umSkillP`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `育成イベントで取れるスキル`, key: `umSkillOte`, value: ``, need: false, useCombo: false },
        ];
        function findRule(findText, hContent) {
            const match = parseRules.find(item => item.find === findText && item.hContent === hContent);
            if (match)
                return match;
            return null;
        }
        function seekToSupportTableTag(h3) {
            let rowArray = null;
            let nextEl = h3.nextElementSibling;
            while (nextEl) {
                const tagName = nextEl.tagName;
                if (tagName === `P`) {
                    //console.log(`[${tagName}] ${hmId} nothing char info`)
                    break;
                }
                if (tagName === `TABLE`) {
                    //console.log(`[${tagName}]`)
                    const table = nextEl;
                    if (table.textContent.includes(`固有ボーナス効果`) === false) {
                        const rows = table.querySelectorAll('tr');
                        rowArray = Array.from(rows);
                        if (rowArray.length >= 1) {
                            //console.log(`[${tagName}] found char info`)
                            break;
                        }
                    }
                }
                nextEl = nextEl.nextElementSibling;
            }
            return rowArray;
        }
        function seekToSkillTableTag(h3) {
            let rowArray = null;
            let nextEl = h3.nextElementSibling;
            while (nextEl) {
                const tagName = nextEl.tagName;
                if (tagName === `P`) {
                    //console.log(`[${tagName}] ${hmId} nothing char info`)
                    break;
                }
                if (tagName === `TABLE`) {
                    //console.log(`[${tagName}]`)
                    const table = nextEl;
                    const rows = table.querySelectorAll('tr');
                    rowArray = Array.from(rows);
                    if (rowArray.length >= 1) {
                        //console.log(`[${tagName}] found char info`)
                        break;
                    }
                }
                nextEl = nextEl.nextElementSibling;
            }
            return rowArray;
        }
        function parseScoreItems(rowArray) {
            for (const row of rowArray) {
                const ths = row.querySelectorAll('th');
                let max = -1;
                for (const th of ths) {
                    let thNext = th.nextElementSibling;
                    do {
                        if (thNext === null)
                            break;
                        if (thNext.tagName !== `TD`)
                            break;
                        let titleText = toPlainText(th);
                        console.log(`${titleText}`);
                        if (titleText === `レスボ`)
                            titleText = `レースボーナス`; //通称名があるみたい
                        const find = parseRules.find(rule => rule.find.includes(titleText));
                        if (find !== undefined) {
                            const td = thNext;
                            const statusText = toPlainText(td);
                            const match1 = statusText.match(/(\d+)%/);
                            const match2 = statusText.match(/(\d+)/);
                            const match = match1 !== null ? match1 : match2;
                            if (match) {
                                if (find.value === ``) {
                                    find.value = statusText;
                                    max = Number(match[1]);
                                }
                                else if (find.value === `-`) {
                                    find.value = statusText;
                                    const nowVal = Number(match[1]);
                                    if (nowVal > max) {
                                        find.value = statusText;
                                        max = nowVal;
                                    }
                                }
                                else {
                                    if (max === -1) {
                                        find.value = statusText;
                                        max = Number(match[1]);
                                    }
                                    else {
                                        const nowVal = Number(match[1]);
                                        if (nowVal > max) {
                                            find.value = statusText;
                                            max = nowVal;
                                        }
                                    }
                                }
                            }
                            else {
                                if (find.value === ``)
                                    find.value = statusText;
                            }
                        }
                        thNext = thNext.nextElementSibling;
                    } while (true);
                    //break
                }
            }
        }
        function parseSkillItems(rowArray) {
            const skillMap = new Map;
            for (const row of rowArray) {
                const ths = row.querySelectorAll('th');
                const tds = row.querySelectorAll('td');
                let skillName = ``;
                for (const td of tds) {
                    const aTags = td.querySelectorAll('a');
                    const hrTags = td.querySelectorAll('hr');
                    if (aTags.length >= 1 && hrTags.length >= 1) {
                        //スキル名とスキル値があるTD
                        skillName = toPlainText(aTags[0]);
                        const ability = toPlainText(td);
                        if (skillName !== `` && ability !== ``) {
                            let ab = skillMap.get(skillName);
                            if (ab === undefined) {
                                ab = new Array;
                                skillMap.set(skillName, ab);
                            }
                            ab.push(ability);
                        }
                        //console.log(`**found skill(name/ability)**`, skillName, ability)
                    }
                    else {
                        //スキル値のみがあるTD
                        const ability = toPlainText(td);
                        if (skillName !== `` && ability !== ``) {
                            const ab = skillMap.get(skillName);
                            if (ab !== undefined) {
                                ab.push(`${ability}pt`);
                            }
                        }
                        //console.log(`**found skill(ability)**`, ability)
                    }
                }
            }
            console.log(`**parseSkillItems**`, skillMap);
            return skillMap;
        }
        function formatSkillMap(skillMap) {
            if (skillMap.size === 0)
                return null;
            let allTexts = ``;
            for (const [skillName, arr] of skillMap) {
                let texts = ``;
                for (const text of arr) {
                    texts += `<br>${text}`;
                }
                texts = skillName + texts;
                if (allTexts !== ``)
                    allTexts += `<br>`;
                allTexts += texts;
            }
            return allTexts;
        }
        const headers = doc.querySelectorAll('h3.a-header--3');
        for (const h3 of headers) {
            const hmId = h3.getAttribute('id') || "";
            const hmContent = toPlainText(h3);
            /*
            if (hmContent !== `サポート効果一覧`) continue

            let rowArray = null
            let nextEl = h3.nextElementSibling
            while (nextEl) {
                const tagName = nextEl.tagName

                if (tagName === `P`) {
                    //console.log(`[${tagName}] ${hmId} nothing char info`)
                    break
                }
                if (tagName === `TABLE`) {
                    //console.log(`[${tagName}]`)
                    const table = nextEl
                    if (table.textContent.includes(`固有ボーナス効果`) === false) {
                        const rows = table.querySelectorAll('tr');
                        rowArray = Array.from(rows);
                        if (rowArray.length >= 1) {
                            //console.log(`[${tagName}] found char info`)
                            break
                        }
                    }
                }

                nextEl = nextEl.nextElementSibling;
            }
            if (rowArray === null)  continue

            */
            let rowArray = null;
            if (hmContent === `サポート効果一覧`) {
                rowArray = seekToSupportTableTag(h3);
                if (rowArray !== null)
                    parseScoreItems(rowArray);
            }
            else if (hmContent === `所持スキル`) {
                rowArray = seekToSkillTableTag(h3);
                if (rowArray !== null) {
                    const skillMap = parseSkillItems(rowArray);
                    const formated = formatSkillMap(skillMap);
                    if (formated !== null) {
                        const rule = findRule(hmContent, ``);
                        if (rule !== null)
                            rule.value = formated;
                    }
                }
            }
            else if (hmContent === `育成イベントで取れるスキル`) {
                rowArray = seekToSkillTableTag(h3);
                if (rowArray !== null) {
                    const skillMap = parseSkillItems(rowArray);
                    const formated = formatSkillMap(skillMap);
                    if (formated !== null) {
                        const rule = findRule(hmContent, ``);
                        if (rule !== null)
                            rule.value = formated;
                    }
                }
            }
            /*
            for (const row of rowArray) {
                const ths = row.querySelectorAll('th')
                let max = -1
                for (const th of ths) {
                    let thNext = th.nextElementSibling
                    do {
                        if (thNext === null) break
                        if (thNext.tagName !== `TD`) break
                        let titleText = toPlainText(th as HTMLElement)
                        console.log(`${titleText}`)
                        if (titleText === `レスボ`) titleText = `レースボーナス`    //通称名があるみたい

                        const find = parseRules.find(rule => rule.find.includes(titleText))
                        if (find !== undefined) {
                            const td = thNext as HTMLTableCellElement
                            const statusText = toPlainText(td as HTMLElement)
                            const match1 = statusText.match(/(\d+)%/)
                            const match2 = statusText.match(/(\d+)/)
                            const match = match1 !== null ? match1 : match2
                            if (match) {
                                if (find.value === ``) {
                                    find.value = statusText
                                    max = Number(match[1])
                                }
                                else if (find.value === `-`) {
                                    find.value = statusText
                                    const nowVal = Number(match[1])
                                    if (nowVal > max) {
                                        find.value = statusText
                                        max = nowVal
                                    }
                                }
                                else {
                                    if (max === -1) {
                                        find.value = statusText
                                        max = Number(match[1])
                                    }
                                    else {
                                        const nowVal = Number(match[1])
                                        if (nowVal > max) {
                                            find.value = statusText
                                            max = nowVal
                                        }
                                    }
                                }
                            }
                            else {
                                if (find.value === ``)
                                    find.value = statusText
                            }
                        }
                        thNext = thNext.nextElementSibling
                    } while (true)
                    //break
                }
            }
            */
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
//# sourceMappingURL=SiteUmImporter.js.map
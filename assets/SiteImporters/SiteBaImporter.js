import { GameEnv } from "../GameEnv.js";
import { registerCharStatusClassifyTypes, CharNameSpaceTypes, } from "../CharClass.js";
import { CharSpecItem } from "../CharSpec.js";
import { CharParseData, CharSaveStatusData, CharParseDebug } from "../CharDB.js";
import { registImporter, toPlainText } from "../SiteImporter.js";
import { ScoreConfigItem } from "../ScoreConfig.js";
export const BaCharStatusClassifyTypes = {
    /**ブルアカ用 */
    classBa: "Ba",
};
export const BaCharStatusNameTypes = {
    /**HP：HP */
    baStatusHP: 'baStatusHP',
    /**攻撃力：Attack Power */
    baStatusAtk: 'baStatusAtk',
    /**防御力：Defense power */
    baStatusDf: 'baStatusDf',
    /**治癒力：Healing power */
    baStatusHl: 'baStatusHl',
    /**命中値：Accuracy value */
    baStatusAcc: 'baStatusAcc',
    /**回避値：Evasion value */
    baStatusEva: 'baStatusEva',
    /**スキル効果： */
    baSkillEf: 'baSkillEf',
};
export class BluArcSiteImporter {
    gameType = BaCharStatusClassifyTypes.classBa;
    static domain = `https://kamigame.jp/bluearchive/page`;
    static imgDomain = `https://kamigame.jp`;
    nsURLs = [
        { ns: CharNameSpaceTypes.CnsRed, nsName: "爆発タイプ", url: `${BluArcSiteImporter.domain}/143820831284265016.html`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsBlue, nsName: "貫通タイプ", url: `${BluArcSiteImporter.domain}/143821787216478264.html`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsGreen, nsName: "神秘タイプ", url: `${BluArcSiteImporter.domain}/143822000807215160.html`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsYellow, nsName: "振動タイプ", url: `${BluArcSiteImporter.domain}/273709769204747122.html`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsViolet, nsName: "軽装備タイプ", url: `${BluArcSiteImporter.domain}/143822859146391946.html`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsWhite, nsName: "重装甲タイプ", url: `${BluArcSiteImporter.domain}/143822935751168442.html`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsBlack, nsName: "特殊装甲タイプ", url: `${BluArcSiteImporter.domain}/143823112062904956.html`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsGray, nsName: "弾力装甲タイプ", url: `${BluArcSiteImporter.domain}/251351689796307378.html`, lastUpdate: null },
    ];
    importerMapItem = {
        gm: BaCharStatusClassifyTypes.classBa,
        displayText: `ブルアカ`,
        inst: this,
        nsURLs: this.nsURLs,
        htmlMarker: `bluArc`,
        chListMaker: `bla`, parseHtml: this.doParseBlaHtml,
        statusMaker: `blaStatus_`, parseStatus: this.doParseBlaStatus, statusZip: `bluArc_CharStatus.zip`,
        charHtmlZip: `bluArc_CharHtml.zip`,
        charRisticWd: `bluArc_RisticWd.json`,
    };
    async doParseBlaHtml(htmlText, ns) {
        const saveArray = new Array;
        const timeElem = await BluArcSiteImporter.parseBlaHtml(htmlText, async (chParseData) => {
            //console.log(chParseData)
            const ch = new CharSpecItem;
            //ch.id = Number(chParseData.id)
            ch.name = chParseData.name;
            ch.gt = BaCharStatusClassifyTypes.classBa;
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
    async doParseBlaStatus(htmlText) {
        //後処理（カンマ除去）：必要なので消さないこと！
        function postProc(statusData) {
            for (const status of statusData) {
                if (status.useCombo)
                    continue;
                if (status.key === BaCharStatusNameTypes.baSkillEf)
                    continue;
                let text = status.value;
                //カンマを取り除く
                text = text.replace(/,/g, '');
                //変換結果設定
                status.converted = `${parseInt(text)}`;
            }
        }
        const saveArray = new Array();
        const res = await BluArcSiteImporter.parseBlaInfoHtml(htmlText, parseArray => {
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
            { key: BaCharStatusNameTypes.baStatusHP, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(max, min, 90);
                } },
            { key: BaCharStatusNameTypes.baStatusAtk, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(max, min, 90);
                } },
            { key: BaCharStatusNameTypes.baStatusDf, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(max, min, 90);
                } },
            { key: BaCharStatusNameTypes.baStatusHl, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(max, min, 90);
                } },
            { key: BaCharStatusNameTypes.baStatusAcc, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(max, min, 90);
                } },
            { key: BaCharStatusNameTypes.baStatusEva, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(max, min, 90);
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
            { key: BaCharStatusNameTypes.baSkillEf, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
        ];
        return table1.concat(table2);
    }
    register() {
        registerCharStatusClassifyTypes(BaCharStatusClassifyTypes);
        const res = registImporter(this.importerMapItem);
        return res;
    }
    static parseBlaHtml = async (htmlText, callback) => {
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
        const headers = doc.querySelectorAll('h3');
        for (const h3 of headers) {
            const rarityId = h3.getAttribute('id') || "";
            const rarityName = h3.textContent.trim();
            console.log(`${rarityId}, ${rarityName}`);
            if (rarityName === `星3のキャラ一覧` ||
                rarityName === `星2のキャラ一覧` ||
                rarityName === `星1のキャラ一覧`) {
                if (rarityId.includes(`のキャラ一覧`)) { }
                else
                    continue;
            }
            else
                continue;
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
                //キャラID : <a href="/bluearchive/page/142242019727683388.html">
                let name = "";
                let id = "";
                let hrefPath = "";
                const aTag = colCh.querySelector('a');
                if (aTag) {
                    name = aTag.textContent.replace(/\s+/g, '');
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
                const matchId = id.match(/(\d+)/);
                if (matchId === null)
                    continue;
                id = matchId[1];
                if (hrefPath !== ``)
                    hrefPath = BluArcSiteImporter.imgDomain + hrefPath;
                const imgTag = colCh.querySelector('img');
                let localImagePath = "";
                if (imgTag) {
                    const src = imgTag.getAttribute('src') || "";
                    localImagePath = src;
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
        console.log(`[parseBlaHtml] ${validRows} valid parsed!`);
        return timeElem;
    };
    static parseBlaInfoHtml = async (htmlText, callback) => {
        const env = new GameEnv;
        const doc = await env.getDoc(htmlText);
        const parseRules = [
            { hContent: ``, find: `HP`, key: `baStatusHP`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `攻撃力`, key: `baStatusAtk`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `防御力`, key: `baStatusDf`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `治癒力`, key: `baStatusHl`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `命中値`, key: `baStatusAcc`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `回避値`, key: `baStatusEva`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `スキル効果`, key: `baSkillEf`, value: ``, need: false, useCombo: false },
        ];
        function findRule(findText, hContent) {
            const match = parseRules.find(item => item.find === findText && item.hContent === hContent);
            if (match)
                return match;
            return null;
        }
        function seekToStatusTableTag(h3) {
            let rowArray = null;
            let nextEl = h3.nextElementSibling;
            while (nextEl) {
                let tagName = nextEl.tagName;
                if (tagName !== `DIV`) {
                    nextEl = nextEl.nextElementSibling;
                    continue;
                }
                const div = nextEl;
                const divTrig = div.dataset.trigger;
                if (divTrig === undefined) {
                    nextEl = nextEl.nextElementSibling;
                    continue;
                }
                if (divTrig !== `最大ステータス`) {
                    nextEl = nextEl.nextElementSibling;
                    continue;
                }
                const tables = div.querySelectorAll('table');
                if (tables.length >= 1) {
                    //console.log(`[${tagName}]`)
                    const table = tables[0];
                    if (table.textContent.includes(`ステータス`) === true) {
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
                const tds = row.querySelectorAll('td');
                if (tds.length !== 3)
                    continue;
                let titleText = toPlainText(tds[0]);
                let statusText = toPlainText(tds[1]);
                console.log(titleText, statusText);
                const find = parseRules.find(rule => rule.find.includes(titleText));
                if (find !== undefined) {
                    find.value = statusText;
                }
            }
        }
        function parseSkillItems(rowArray) {
            const skillMap = new Map;
            for (const row of rowArray) {
                const tds = row.querySelectorAll('td');
                //td[0]：スキル名
                //td[1]：スキル値a
                //td[2]：スキル値b
                let skillName = ``;
                if (tds.length >= 1) {
                    const td = tds[0];
                    skillName = toPlainText(td);
                }
                if (tds.length >= 2) {
                    const td = tds[1];
                    const spans = td.querySelectorAll('span');
                    if (spans.length >= 1) {
                        const span = spans[0];
                        const ability = toPlainText(span);
                        if (skillName !== `` && ability !== ``) {
                            let ab = skillMap.get(skillName);
                            if (ab === undefined) {
                                ab = new Array;
                                skillMap.set(skillName, ab);
                            }
                            ab.push(ability);
                        }
                    }
                    const ability = toPlainText(td);
                    if (skillName !== `` && ability !== ``) {
                        let ab = skillMap.get(skillName);
                        if (ab === undefined) {
                            ab = new Array;
                            skillMap.set(skillName, ab);
                        }
                        ab.push(ability);
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
        const headers = doc.querySelectorAll('h3');
        for (const h3 of headers) {
            const h3Id = h3.getAttribute('id') || "";
            const h3Content = toPlainText(h3);
            let rowArray = null;
            if (h3Content === `ステータス`) {
                rowArray = seekToStatusTableTag(h3);
                if (rowArray !== null)
                    parseScoreItems(rowArray);
            }
            else if (h3Content === `スキル効果`) {
                rowArray = seekToSkillTableTag(h3);
                if (rowArray !== null) {
                    const skillMap = parseSkillItems(rowArray);
                    const formated = formatSkillMap(skillMap);
                    if (formated !== null) {
                        const rule = findRule(h3Content, ``);
                        if (rule !== null)
                            rule.value = formated;
                    }
                }
            }
            /*
            else if (h3Content === `性能評価`) {
                rowArray = seekToSkillTableTag(h3)
                if (rowArray !== null) {
                    const skillMap = parseSkillItems(rowArray)
                    const formated = formatSkillMap(skillMap)
                    if (formated !== null) {
                        const rule = findRule(h3Content, ``)
                        if (rule !== null)
                            rule.value = formated
                    }
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
//# sourceMappingURL=SiteBaImporter.js.map
import { GameEnv } from "../GameEnv.js";
import { registerCharStatusClassifyTypes, CharNameSpaceTypes, } from "../CharClass.js";
import { CharSpecItem } from "../CharSpec.js";
import { CharParseData, CharSaveStatusData, CharParseDebug } from "../CharDB.js";
import { registImporter, toPlainText } from "../SiteImporter.js";
import { ScoreConfigItem } from "../ScoreConfig.js";
export const FgCharStatusClassifyTypes = {
    /**FGO用 */
    classFg: "Fg",
};
export const FgCharStatusNameTypes = {
    /**ATK：Attack */
    FgStatusAtk: 'FgStatusAtk',
    /**HP：HP */
    FgStatusHP: 'FgStatusHP',
    /**スキル */
    FgSkill: 'FgSkill',
    /**クラススキル */
    FgSkillC: 'FgSkillC',
    /**アペンドスキル */
    FgSkillA: 'FgSkillA',
};
export class FgoSiteImporter {
    gameType = FgCharStatusClassifyTypes.classFg;
    static domain = `https://kamigame.jp/fgo`;
    static imgDomain = `https://kamigame.jp`;
    nsURLs = [
        { ns: CharNameSpaceTypes.CnsRed, nsName: "秩序属性", url: `${FgoSiteImporter.domain}/%E6%94%BB%E7%95%A5%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9/%E3%82%B5%E3%83%BC%E3%83%B4%E3%82%A1%E3%83%B3%E3%83%88%E4%B8%80%E8%A6%A7/index-%E7%A7%A9%E5%BA%8F%E5%B1%9E%E6%80%A7.html`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsBlue, nsName: "中立属性", url: `${FgoSiteImporter.domain}/%E6%94%BB%E7%95%A5%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9/%E3%82%B5%E3%83%BC%E3%83%B4%E3%82%A1%E3%83%B3%E3%83%88%E4%B8%80%E8%A6%A7/index-%E4%B8%AD%E7%AB%8B%E5%B1%9E%E6%80%A7.html`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsGreen, nsName: "混沌属性", url: `${FgoSiteImporter.domain}/%E6%94%BB%E7%95%A5%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9/%E3%82%B5%E3%83%BC%E3%83%B4%E3%82%A1%E3%83%B3%E3%83%88%E4%B8%80%E8%A6%A7/index-%E6%B7%B7%E6%B2%8C%E5%B1%9E%E6%80%A7.html`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsWhite, nsName: "善属性", url: `${FgoSiteImporter.domain}/%E6%94%BB%E7%95%A5%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9/%E3%82%B5%E3%83%BC%E3%83%B4%E3%82%A1%E3%83%B3%E3%83%88%E4%B8%80%E8%A6%A7/index-%E5%96%84%E5%B1%9E%E6%80%A7.html`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsGray, nsName: "中庸属性", url: `${FgoSiteImporter.domain}/%E6%94%BB%E7%95%A5%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9/%E3%82%B5%E3%83%BC%E3%83%B4%E3%82%A1%E3%83%B3%E3%83%88%E4%B8%80%E8%A6%A7/index-%E4%B8%AD%E5%BA%B8%E5%B1%9E%E6%80%A7.html`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsBlack, nsName: "悪属性", url: `${FgoSiteImporter.domain}/%E6%94%BB%E7%95%A5%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9/%E3%82%B5%E3%83%BC%E3%83%B4%E3%82%A1%E3%83%B3%E3%83%88%E4%B8%80%E8%A6%A7/index-%E6%82%AA%E5%B1%9E%E6%80%A7.html`, lastUpdate: null },
    ];
    importerMapItem = {
        gm: FgCharStatusClassifyTypes.classFg,
        displayText: `FGO`,
        inst: this,
        nsURLs: this.nsURLs,
        htmlMarker: `fgo`,
        chListMaker: `fgo`, parseHtml: this.doParseFgoHtml,
        statusMaker: `fgoStatus_`, parseStatus: this.doParseFgoStatus, statusZip: `fgo_CharStatus.zip`,
        charHtmlZip: `fgo_CharHtml.zip`,
        charRisticWd: `fgo_RisticWd.json`,
    };
    async doParseFgoHtml(htmlText, ns) {
        const saveArray = new Array;
        const timeElem = await FgoSiteImporter.parseFgoHtml(htmlText, async (chParseData) => {
            //console.log(chParseData)
            const ch = new CharSpecItem;
            //ch.id = Number(chParseData.id)
            ch.name = chParseData.name;
            ch.gt = FgCharStatusClassifyTypes.classFg;
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
    async doParseFgoStatus(htmlText) {
        //後処理（カンマ除去）：必要なので消さないこと！
        function postProc(statusData) {
            for (const status of statusData) {
                if (status.useCombo)
                    continue;
                if (status.key === FgCharStatusNameTypes.FgSkill)
                    continue;
                if (status.key === FgCharStatusNameTypes.FgSkillA)
                    continue;
                if (status.key === FgCharStatusNameTypes.FgSkillC)
                    continue;
                let text = status.value;
                //カンマを取り除く
                text = text.replace(/,/g, '');
                //変換結果設定
                status.converted = `${parseInt(text)}`;
            }
        }
        const saveArray = new Array();
        const res = await FgoSiteImporter.parseFgoInfoHtml(htmlText, parseArray => {
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
            { key: FgCharStatusNameTypes.FgStatusAtk, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: FgCharStatusNameTypes.FgStatusHP, isSkill: false,
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
            { key: FgCharStatusNameTypes.FgSkill, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
            { key: FgCharStatusNameTypes.FgSkillC, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
            { key: FgCharStatusNameTypes.FgSkillA, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
        ];
        return table1.concat(table2);
    }
    register() {
        registerCharStatusClassifyTypes(FgCharStatusClassifyTypes);
        const res = registImporter(this.importerMapItem);
        return res;
    }
    static parseFgoHtml = async (htmlText, callback) => {
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
        let validRows = 0;
        const headers = doc.querySelectorAll('h2');
        for (const h2 of headers) {
            const rarityId = h2.getAttribute('id') || "";
            const rarityName = h2.textContent.trim();
            console.log(`${rarityId}, ${rarityName}`);
            if (rarityName.includes(`サーヴァント一覧`)) {
                if (rarityId.includes(`サーヴァント一覧`)) { }
                else
                    continue;
            }
            else
                continue;
            let rowArray = null;
            let nextEl = h2.nextElementSibling;
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
                let colIndex = -1;
                for (const td of cols) {
                    colIndex++;
                    if (colIndex === 0)
                        continue; //クラス：無視する？
                    const spans = td.querySelectorAll('span');
                    for (const span of spans) {
                        const className = span.className;
                        if (className.includes(`属性別キャラ一覧`) === false)
                            continue;
                        let name = "";
                        let id = "";
                        let hrefPath = "";
                        let localImagePath = "";
                        const words = span.className.split(`_`);
                        if (words.length >= 3) {
                            id = words[words.length - 1];
                            const aTags = span.querySelectorAll('a');
                            if (aTags.length >= 1) {
                                const aTag = aTags[0];
                                const href = aTag.getAttribute('href') || "";
                                hrefPath = href;
                            }
                            const imgs = span.querySelectorAll('img');
                            if (imgs.length >= 1) {
                                const img = imgs[0];
                                const src = img.getAttribute('src') || "";
                                localImagePath = src;
                                const alt = img.getAttribute('alt') || "";
                                name = alt;
                            }
                        }
                        if (name === null || name === ``)
                            continue;
                        if (id === null || id === ``)
                            continue;
                        if (hrefPath === null || hrefPath === ``) {
                            console.log(`[${name}] hrefPath is empty`);
                            continue;
                        }
                        hrefPath = FgoSiteImporter.imgDomain + hrefPath;
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
            }
        }
        console.log(`[parseBlaHtml] ${validRows} valid parsed!`);
        return timeElem;
    };
    static parseFgoInfoHtml = async (htmlText, callback) => {
        const env = new GameEnv;
        const doc = await env.getDoc(htmlText);
        const parseRules = [
            { hContent: ``, find: `ATK`, key: `FgStatusAtk`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `HP`, key: `FgStatusHP`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `スキル3`, key: `FgSkill`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `クラススキル`, key: `FgSkillC`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `アペンドスキル`, key: `FgSkillA`, value: ``, need: false, useCombo: false },
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
                    console.log(`-> not include trigger`);
                    continue;
                }
                if (divTrig.includes(`再臨`) === false) {
                    nextEl = nextEl.nextElementSibling;
                    console.log(`-> not include 再臨`);
                    continue;
                }
                const tables = div.querySelectorAll('table');
                if (tables.length >= 1) {
                    //console.log(`[${tagName}]`)
                    const table = tables[0];
                    if (table.classList.contains(`joint_table`) === true) {
                        const rows = table.querySelectorAll('tr');
                        rowArray = Array.from(rows);
                        if (rowArray.length >= 1) {
                            //console.log(`[${tagName}] found char info`)
                            break;
                        }
                    }
                    else {
                        console.log(`-> not include joint_table`);
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
                if (tagName === `DIV`) {
                    const div = nextEl;
                    const divTrig = div.dataset.trigger;
                    if (divTrig === undefined) {
                        nextEl = nextEl.nextElementSibling;
                        console.log(`-> not include trigger`);
                        continue;
                    }
                    if (divTrig.includes(`強化後`) === false) {
                        nextEl = nextEl.nextElementSibling;
                        console.log(`-> not include 強化後`);
                        continue;
                    }
                    const tables = div.querySelectorAll('table');
                    if (tables.length >= 1) {
                        const table = tables[0];
                        if (table.classList.contains(`matrix_table`) === true) {
                            const rows = table.querySelectorAll('tr');
                            rowArray = Array.from(rows);
                            if (rowArray.length >= 1) {
                                //console.log(`[${tagName}] found char info`)
                                break;
                            }
                        }
                        else {
                            console.log(`-> not include matrix_table`);
                        }
                    }
                }
                nextEl = nextEl.nextElementSibling;
            }
            return rowArray;
        }
        function seekToClassSkillTableTag(h3) {
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
                if (tds.length !== 2)
                    continue;
                const elem = tds[1];
                let statusText = ``;
                for (const node of elem.childNodes) {
                    if (node.nodeType === 3 /*Node.TEXT_NODE*/) {
                        // テキスト内の \n (改行コード) や余計な空白を削除・整理
                        if (node.textContent !== null) {
                            statusText = node.textContent.replace(/\s+/g, '');
                            const statusData = statusText.split(`:`);
                            if (statusData.length !== 2)
                                continue;
                            const statusKey = statusData[0];
                            const statusValue = statusData[1];
                            const find = parseRules.find(rule => rule.find.includes(statusKey));
                            if (find !== undefined) {
                                find.value = statusValue;
                            }
                        }
                    }
                    else if (node.nodeType === 1 /*Node.ELEMENT_NODE*/) {
                    }
                }
            }
        }
        function parseSkillItems(rowArray) {
            const skillMap = new Map;
            if (rowArray.length >= 4) {
                //rowArray[0]：th：無視
                //rowArray[1]：名称
                //rowArray[2]：CT：無視
                //rowArray[3]：効果1
                //rowArray[4]：効果2：無視
                let skillName = ``;
                const tdsName = rowArray[1].cells;
                if (tdsName.length >= 2) {
                    skillName = toPlainText(tdsName[1]);
                }
                const tdsAbr = rowArray[3].cells;
                if (tdsAbr.length >= 2) {
                    const tdAbr = tdsAbr[1];
                    const ems = tdAbr.querySelectorAll('em');
                    if (ems.length >= 1) {
                        const ability = toPlainText(ems[0]);
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
            }
            console.log(`**parseSkillItems**`, skillMap);
            return skillMap;
        }
        function parseClassSkillItems(rowArray) {
            const skillMap = new Map;
            for (const row of rowArray) {
                const tds = row.querySelectorAll('td');
                //td[0]：スキル名
                //td[1]：スキル値
                let skillName = ``;
                if (tds.length >= 2) {
                    const td = tds[0];
                    const spans = td.querySelectorAll('span');
                    if (spans.length >= 1) {
                        const span = spans[0];
                        for (const node of span.childNodes) {
                            if (node.nodeType === 3 /*Node.TEXT_NODE*/) {
                                // テキスト内の \n (改行コード) や余計な空白を削除・整理
                                if (node.textContent !== null) {
                                    skillName += node.textContent.replace(/\s+/g, '');
                                }
                            }
                        }
                    }
                    const ability = toPlainText(tds[1]);
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
                texts = skillName + `=` + texts;
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
            if (h3Content === `性能` && h3Id.includes(`の性能評価`)) {
                rowArray = seekToStatusTableTag(h3);
                if (rowArray !== null)
                    parseScoreItems(rowArray);
            }
            else if (h3Content === `スキル3` && h3Id.includes(`スキル`)) {
                //強化前・強化後の区別があるキャラの場合？
                rowArray = seekToSkillTableTag(h3);
                if (rowArray === null) {
                    //強化前・強化後の区別がないキャラの場合
                    rowArray = seekToClassSkillTableTag(h3);
                    if (rowArray === null) {
                        console.log(`スキル3 info not found !`);
                    }
                    else {
                        //console.log(`スキル3(強化前・強化後の区別がないキャラ) info found !`)
                    }
                }
                else {
                    //console.log(`スキル3(強化前・強化後の区別があるキャラ) info found !`)
                }
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
            else if (h3Content === `クラススキル` && h3Id.includes(`クラススキル`)) {
                rowArray = seekToClassSkillTableTag(h3);
                if (rowArray === null) {
                    console.log(`クラススキル info not found !`);
                }
                else {
                    //console.log(`クラススキル info found !`)
                    const skillMap = parseClassSkillItems(rowArray);
                    const formated = formatSkillMap(skillMap);
                    if (formated !== null) {
                        const rule = findRule(h3Content, ``);
                        if (rule !== null)
                            rule.value = formated;
                    }
                }
            }
            else if (h3Content === `アペンドスキル` && h3Id.includes(`アペンドスキル`)) {
                rowArray = seekToClassSkillTableTag(h3);
                if (rowArray === null) {
                    //console.log(`アペンドスキル info not found !`)
                }
                else {
                    console.log(`アペンドスキル info found !`);
                    const skillMap = parseClassSkillItems(rowArray);
                    const formated = formatSkillMap(skillMap);
                    if (formated !== null) {
                        const rule = findRule(h3Content, ``);
                        if (rule !== null)
                            rule.value = formated;
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
//# sourceMappingURL=SiteFgImporter.js.map
import { GameEnv } from "../GameEnv.js";
import { registerCharStatusClassifyTypes, CharNameSpaceTypes, } from "../CharClass.js";
import { CharSpecItem } from "../CharSpec.js";
import { CharParseData, CharSaveStatusData, CharParseDebug } from "../CharDB.js";
import { registImporter, toPlainText } from "../SiteImporter.js";
import { ScoreConfigItem } from "../ScoreConfig.js";
export const HsCharStatusClassifyTypes = {
    /**放置少女用 */
    classHS: "hs",
};
export const HsCharStatusNameTypes = {
    //スコア項目は「パッシブスキル」に入っている前提です
    hsHpMax: `hsHpMax`, //HP上限
    hsAtk: `hsAtk`, //攻撃力
    hsHp: `hsHp`, //体力
    /**アクティブスキル： */
    hsSkillA: `hsSkillA`,
    /**パッシブスキル： */
    //hsSkillP: `hsSkillP`,
    /**連携スキル：Co-op Skill */
    hsSkillC: `hsSkillC`
};
export class HouchiSyojoSiteImporter {
    gameType = HsCharStatusClassifyTypes.classHS;
    nsURLs = [
        { ns: CharNameSpaceTypes.CnsBlue, nsName: "魏陣営", url: `https://game8.jp/houchishoujo/339990`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsGreen, nsName: "蜀陣営", url: `https://game8.jp/houchishoujo/339991`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsRed, nsName: "呉陣営", url: `https://game8.jp/houchishoujo/339992`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsYellow, nsName: "群陣営", url: `https://game8.jp/houchishoujo/339993`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsViolet, nsName: "華陣営", url: `https://game8.jp/houchishoujo/339995`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsWhite, nsName: "和陣営", url: `https://game8.jp/houchishoujo/339997`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsBlack, nsName: "洋陣営", url: `https://game8.jp/houchishoujo/395793`, lastUpdate: null },
    ];
    importerMapItem = {
        gm: HsCharStatusClassifyTypes.classHS,
        displayText: `放置少女`,
        inst: this,
        nsURLs: this.nsURLs,
        htmlMarker: `houShou`,
        chListMaker: `hou`, parseHtml: this.doParseHouchiHtml,
        statusMaker: `houStatus_`, parseStatus: this.doParseHouchiStatus, statusZip: `houShou_CharStatus.zip`,
        charHtmlZip: `houShou_CharHtml.zip`,
        charRisticWd: `houShou_RisticWd.json`,
    };
    async doParseHouchiHtml(htmlText, ns) {
        const saveArray = new Array;
        const timeElem = await HouchiSyojoSiteImporter.parseHouchiHtml(htmlText, async (chParseData) => {
            //console.log(chParseData)
            const ch = new CharSpecItem;
            //ch.id = parseInt(chParseData.id)
            ch.name = chParseData.name;
            ch.gt = HsCharStatusClassifyTypes.classHS;
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
    async doParseHouchiStatus(htmlText) {
        const saveArray = new Array();
        const res = await HouchiSyojoSiteImporter.parseHouchiInfoHtml(htmlText, parseArray => {
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
    register() {
        registerCharStatusClassifyTypes(HsCharStatusClassifyTypes);
        const res = registImporter(this.importerMapItem);
        return res;
    }
    charStatusDB;
    get scoreTable() {
        const table = [
            { key: HsCharStatusNameTypes.hsHpMax, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, max);
                } },
            { key: HsCharStatusNameTypes.hsAtk, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, max);
                } },
            { key: HsCharStatusNameTypes.hsHp, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreMaxNum(key, value);
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
            { key: HsCharStatusNameTypes.hsSkillA, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
        ];
        return table1.concat(table2);
    }
    static parseHouchiHtml = async (htmlText, callback) => {
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
            //const rarityName = h3.textContent.trim()
            //console.log(`${rarityId}, ${rarityName}`)
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
                //const name = colCh.textContent
                const name = toPlainText(colCh);
                if (name === null)
                    continue;
                //キャラID : https://game8.jp/houchishoujo/748309"
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
                    }
                }
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
        console.log(`[parseHouchiHtml] ${validRows} valid parsed!`);
        return timeElem;
    };
    static parseHouchiInfoHtml = async (htmlText, callback) => {
        const env = new GameEnv;
        const doc = await env.getDoc(htmlText);
        const parseRules = [
            { hContent: ``, find: `HP上限`, key: `hsHpMax`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `攻撃力`, key: `hsAtk`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `体力`, key: `hsHp`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `アクティブスキル`, key: `hsSkillA`, value: ``, need: false, useCombo: false },
            //{ hContent: ``, find: `パッシブスキル`,   key: `hsSkillP`, value: ``, need: false, useCombo: false },
            { hContent: ``, find: `連携スキル`, key: `hsSkillC`, value: ``, need: false, useCombo: false },
        ];
        function findRule(findText, hContent) {
            const match = parseRules.find(item => item.find === findText && item.hContent === hContent);
            if (match)
                return match;
            return null;
        }
        function parseScoreItems(rowArray) {
            for (const row of rowArray) {
                const cols = row.querySelectorAll('td');
                for (const td of cols) {
                    const statusText = toPlainText(td);
                    //console.log(`**ステータス**`, statusText)
                    if (statusText.includes(`HP上限`)) {
                        //console.log(`**ステータス:HP上限**`, statusText)
                        const parts = statusText.split(`,`);
                        for (const part of parts) {
                            if (part.startsWith(`HP上限`) || part.startsWith(`自身のHP上限`)) {
                                const match = part.match(/(\d+)%/);
                                const match2 = part.match(/Lv×(\d+)/);
                                let checked = ``;
                                if (match && match2) {
                                    if (match.index < match2.index)
                                        checked = match[1];
                                    else
                                        checked = match2[1];
                                }
                                else if (match)
                                    checked = match[1];
                                else if (match2)
                                    checked = match2[1];
                                if (checked !== ``) {
                                    console.log(`**ステータス:HP上限**`, part, checked);
                                    const rule = findRule(`HP上限`, ``);
                                    if (rule)
                                        rule.value = checked;
                                }
                            }
                        }
                    }
                    if (statusText.includes(`攻撃力`)) {
                        //console.log(`**ステータス:攻撃力**`, statusText)
                        const parts = statusText.split(`,`);
                        for (const part of parts) {
                            if (part.startsWith(`攻撃力`) || part.startsWith(`自身の攻撃力`)) {
                                if (part.includes(`被ダメージ`))
                                    continue;
                                if (part.includes(`受ダメージ`))
                                    continue;
                                const match = part.match(/(\d+)%/);
                                const match2 = part.match(/Lv×(\d+)/);
                                let checked = ``;
                                if (match && match2) {
                                    if (match.index < match2.index)
                                        checked = match[1];
                                    else
                                        checked = match2[1];
                                }
                                else if (match)
                                    checked = match[1];
                                else if (match2)
                                    checked = match2[1];
                                if (checked !== ``) {
                                    console.log(`**ステータス:攻撃力**`, part, checked);
                                    const rule = findRule(`攻撃力`, ``);
                                    if (rule)
                                        rule.value = checked;
                                }
                            }
                        }
                    }
                    if (statusText.includes(`体力`)) {
                        //console.log(`**ステータス:体力**`, statusText)
                        const parts = statusText.split(`,`);
                        for (const part of parts) {
                            if (part.startsWith(`体力`) || part.startsWith(`自身の体力`)) {
                                const match = part.match(/(\d+)%/);
                                const match2 = part.match(/Lv×(\d+)/);
                                let checked = ``;
                                if (match && match2) {
                                    if (match.index < match2.index)
                                        checked = match[1];
                                    else
                                        checked = match2[1];
                                }
                                else if (match)
                                    checked = match[1];
                                else if (match2)
                                    checked = match2[1];
                                if (checked !== ``) {
                                    console.log(`**ステータス:体力**`, part, checked);
                                    const rule = findRule(`体力`, ``);
                                    if (rule)
                                        rule.value = checked;
                                }
                            }
                        }
                    }
                }
            }
        }
        function parseSkillItems(rowArray, isNameInDiv) {
            const skillMap = new Map;
            if ((rowArray.length % 2) !== 0) {
                console.log(`parseSkillItems: not even records`);
                return skillMap;
            }
            const nSkills = rowArray.length / 2;
            for (let iSkill = 0; iSkill < nSkills; iSkill++) {
                const nameRow = rowArray[iSkill * 2];
                const abilityRow = rowArray[iSkill * 2 + 1];
                const ths = nameRow.querySelectorAll('th');
                const tds = abilityRow.querySelectorAll('td');
                //th[0]：スキル名
                //td[0]：スキル値
                let skillName = ``;
                let ability = ``;
                if (ths.length >= 1) {
                    const th = ths[0];
                    if (isNameInDiv) {
                        const div1s = th.querySelectorAll('div');
                        if (div1s.length >= 1) {
                            const div2s = div1s[0].querySelectorAll('div');
                            if (div2s.length >= 1) {
                                skillName = toPlainText(div2s[0]);
                            }
                            else {
                                console.log(`--> not exist div2`);
                            }
                        }
                        else {
                            console.log(`--> not exist div1`);
                        }
                    }
                    else {
                        skillName = toPlainText(th);
                    }
                }
                if (tds.length >= 1) {
                    ability = toPlainText(tds[0]);
                }
                if (skillName !== `` && ability !== ``) {
                    let ab = skillMap.get(skillName);
                    if (ab === undefined) {
                        ab = new Array;
                        skillMap.set(skillName, ab);
                    }
                    ab.push(ability);
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
            const h3Content = toPlainText(h3); //パッシブスキル, 連携スキル, 縁定スキル
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
            if (rowArray === null)
                continue;
            //console.log(`**スキル名**`, hmContent)
            if (h3Content.includes(`パッシブスキル`)) {
                console.log(`**パッシブスキル**`);
                parseScoreItems(rowArray);
            }
            else if (h3Content.includes(`アクティブスキル`)) {
                console.log(`**アクティブスキル**`);
                let skillMap = parseSkillItems(rowArray, true);
                if (skillMap.size === 0) {
                    skillMap = parseSkillItems(rowArray, false);
                }
                const formated = formatSkillMap(skillMap);
                if (formated !== null) {
                    const rule = findRule(h3Content, ``);
                    if (rule !== null)
                        rule.value = formated;
                }
            }
            else if (h3Content.includes(`連携スキル`)) {
                if (h3Content.includes(`おすすめ`))
                    continue;
                console.log(`**連携スキル**`);
                const skillMap = parseSkillItems(rowArray, false);
                const formated = formatSkillMap(skillMap);
                if (formated !== null) {
                    const rule = findRule(h3Content, ``);
                    if (rule !== null)
                        rule.value = formated;
                }
            }
            else if (h3Content.includes(`縁定スキル`)) {
                //今は考えない
                continue;
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
//# sourceMappingURL=SiteHsImporter.js.map
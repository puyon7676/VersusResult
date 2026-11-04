import { GameEnv } from "../GameEnv.js";
import { registerCharStatusClassifyTypes, CharNameSpaceTypes, } from "../CharClass.js";
import { CharSpecItem } from "../CharSpec.js";
import { CharParseData, CharSaveStatusData, CharParseDebug } from "../CharDB.js";
import { registImporter, toPlainText } from "../SiteImporter.js";
import { ScoreConfigItem } from "../ScoreConfig.js";
export const AlCharStatusClassifyTypes = {
    /**Al用 */
    classAl: "Al",
};
export const AlCharStatusNameTypes = {
    /**火力：Firepower */
    AlStatusFp: 'AlStatusFp',
    /**耐久：Durability */
    AlStatusDr: 'AlStatusDr',
    /**雷装：torpedo */
    AlStatusTp: 'AlStatusTp',
    /**対空：Anti-air */
    AlStatusAa: 'AlStatusAa',
    /**航空：aviation */
    AlStatusAv: 'AlStatusAv',
    /**回避：Evasion */
    AlStatusEv: 'AlStatusEv',
    /**装填：Loading */
    AlStatusLd: 'AlStatusLd',
    /**消費：consumption */
    AlStatusCo: 'AlStatusCo',
    /**スキル */
    AlSkill: 'AlSkill',
};
export class AlSiteImporter {
    gameType = AlCharStatusClassifyTypes.classAl;
    static domain = `https://azurlane.gamerch.com`;
    static imgDomain = `https://azurlane.gamerch.com`;
    nsURLs = [
        { ns: CharNameSpaceTypes.CnsRed, nsName: "ユニオン", url: `${AlSiteImporter.domain}/%E3%83%A6%E3%83%8B%E3%82%AA%E3%83%B3`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsBlue, nsName: "ロイヤル", url: `${AlSiteImporter.domain}/%E3%83%AD%E3%82%A4%E3%83%A4%E3%83%AB`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsGreen, nsName: "重桜", url: `${AlSiteImporter.domain}/%E9%87%8D%E6%A1%9C`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsWhite, nsName: "鉄血", url: `${AlSiteImporter.domain}/%E9%89%84%E8%A1%80`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsGray, nsName: "東煌", url: `${AlSiteImporter.domain}/%E6%9D%B1%E7%85%8C`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsBlack, nsName: "北連", url: `${AlSiteImporter.domain}/%E5%8C%97%E9%80%A3`, lastUpdate: null },
    ];
    importerMapItem = {
        gm: AlCharStatusClassifyTypes.classAl,
        displayText: `アズレン`,
        inst: this,
        nsURLs: this.nsURLs,
        htmlMarker: `al`,
        chListMaker: `al`, parseHtml: this.doParseAlHtml,
        statusMaker: `alStatus_`, parseStatus: this.doParseAlStatus, statusZip: `al_CharStatus.zip`,
        charHtmlZip: `al_CharHtml.zip`,
        charRisticWd: `al_RisticWd.json`,
    };
    async doParseAlHtml(htmlText, ns) {
        const saveArray = new Array;
        const timeElem = await AlSiteImporter.parseAlHtml(htmlText, async (chParseData) => {
            //console.log(chParseData)
            const ch = new CharSpecItem;
            //ch.id = Number(chParseData.id)
            ch.name = chParseData.name;
            ch.gt = AlCharStatusClassifyTypes.classAl;
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
    async doParseAlStatus(htmlText) {
        //後処理（カンマ除去）：必要なので消さないこと！
        function postProc(statusData) {
            for (const status of statusData) {
                if (status.useCombo)
                    continue;
                if (status.key === AlCharStatusNameTypes.AlSkill)
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
        const res = await AlSiteImporter.parseAlInfoHtml(htmlText, parseArray => {
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
            { key: AlCharStatusNameTypes.AlStatusFp, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: AlCharStatusNameTypes.AlStatusDr, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: AlCharStatusNameTypes.AlStatusTp, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: AlCharStatusNameTypes.AlStatusAa, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: AlCharStatusNameTypes.AlStatusAv, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: AlCharStatusNameTypes.AlStatusEv, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: AlCharStatusNameTypes.AlStatusLd, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 120);
                } },
            { key: AlCharStatusNameTypes.AlStatusCo, isSkill: false,
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
            { key: AlCharStatusNameTypes.AlSkill, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
        ];
        return table1.concat(table2);
    }
    register() {
        registerCharStatusClassifyTypes(AlCharStatusClassifyTypes);
        const res = registImporter(this.importerMapItem);
        return res;
    }
    static parseAlHtml = async (htmlText, callback) => {
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
        const front_index = doc.getElementById(`front_index`);
        if (front_index !== null) {
            const js_markup_contents = front_index.querySelectorAll('.js_markup_contents');
            if (js_markup_contents !== null) {
                const contents = js_markup_contents[0];
                const aTags = contents.querySelectorAll('a');
                if (aTags.length !== 0) {
                    for (const aTag of aTags) {
                        const href = aTag.getAttribute('href') || "";
                        if (href === ``)
                            continue;
                        if (href.startsWith(`#`) === false)
                            continue;
                        const contentId = href.substring(1);
                        const contentDivs = doc.querySelectorAll(`div[id="${contentId}"]`);
                        if (contentDivs.length === 0)
                            continue;
                        const contentDiv = contentDivs[0];
                        if (contentDiv === null)
                            continue;
                        const charDiv = contentDiv.nextElementSibling;
                        if (charDiv === null)
                            continue;
                        console.log(charDiv.className);
                        const tables = charDiv.querySelectorAll(`TABLE`);
                        if (tables.length === 0)
                            continue;
                        const table = tables[0];
                        console.log(table.id);
                        const trs = table.querySelectorAll('tr');
                        for (const tr of trs) {
                            const cols = tr.cells;
                            if (cols.length !== 6)
                                continue;
                            let name = "";
                            let id = "";
                            let hrefPath = "";
                            let localImagePath = "";
                            let rarityId = "";
                            //キャラ画像、数字部分をキャラIDとして取得
                            //https://cdn.img-conv.gamerch.com/img.gamerch.com/azurlane/wikidb_thumbnail/740991/individual_200.jpg?d=20171023161825&q=20
                            const imgs = cols[0].querySelectorAll('img');
                            if (imgs.length >= 1) {
                                const img = imgs[0];
                                const imgURL = img.dataset.original;
                                if (imgURL !== undefined) {
                                    localImagePath = imgURL;
                                    const parts = localImagePath.split(`/`);
                                    if (parts.length - 2 > 0)
                                        id = parts[parts.length - 2];
                                }
                            }
                            //キャラ名
                            const spanChNames = cols[1].querySelectorAll('span');
                            if (spanChNames.length >= 1) {
                                const spanChName = spanChNames[0];
                                const nameURL = spanChName.dataset.jscol_sort;
                                if (nameURL !== undefined)
                                    name = nameURL;
                            }
                            //キャラ詳細URL
                            const aTagChs = cols[1].querySelectorAll('a');
                            if (aTagChs.length >= 1) {
                                const aTagCh = aTagChs[0];
                                const hrefCh = aTagCh.getAttribute('href') || "";
                                hrefPath = hrefCh;
                            }
                            //レア
                            const spanChRars = cols[2].querySelectorAll('span');
                            if (spanChRars.length >= 1) {
                                const spanChRar = spanChRars[0];
                                const rarity = spanChRar.textContent;
                                if (rarity !== undefined)
                                    rarityId = rarity;
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
                }
            }
        }
        console.log(`[parseAlHtml] ${validRows} valid parsed!`);
        return timeElem;
    };
    static parseAlInfoHtml = async (htmlText, callback) => {
        const env = new GameEnv;
        const doc = await env.getDoc(htmlText);
        const parseRules = [
            { hContent: ``, find: `火力`, key: `AlStatusFp`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `耐久`, key: `AlStatusDr`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `雷装`, key: `AlStatusTp`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `対空`, key: `AlStatusAa`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `航空`, key: `AlStatusAv`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `回避`, key: `AlStatusEv`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `装填`, key: `AlStatusLd`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `消費`, key: `AlStatusCo`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `スキル`, key: `AlSkill`, value: ``, need: false, useCombo: false },
        ];
        function findRule(findText, hContent) {
            const match = parseRules.find(item => item.find === findText && item.hContent === hContent);
            if (match)
                return match;
            return null;
        }
        //目次コンテナ要素を取得
        const front_index = doc.getElementById(`front_index`);
        if (front_index !== null) {
            const js_markup_contents = front_index.querySelectorAll('.js_markup_contents');
            if (js_markup_contents !== null) {
                const contents = js_markup_contents[0];
                const aTags = contents.querySelectorAll('a');
                if (aTags.length !== 0) {
                    for (const aTag of aTags) {
                        const href = aTag.getAttribute('href') || "";
                        if (href === ``)
                            continue;
                        if (href.startsWith(`#`) === false)
                            continue;
                        const contentId = href.substring(1);
                        const contentText = aTag.textContent.trim();
                        if (contentText === `ステータス`) {
                            const contentDivs = doc.querySelectorAll(`div[id="${contentId}"]`);
                            if (contentDivs.length === 0)
                                continue;
                            const contentDiv = contentDivs[0];
                            if (contentDiv === null)
                                continue;
                            const charDiv = contentDiv.nextElementSibling;
                            if (charDiv === null)
                                continue;
                            console.log(charDiv.className);
                            const tables = charDiv.querySelectorAll(`TABLE`);
                            if (tables.length === 0)
                                continue;
                            const table = tables[0];
                            //console.log(table.id)
                            const trs = table.querySelectorAll('tr');
                            for (const tr of trs) {
                                const tds = tr.querySelectorAll(`td`);
                                if (tds.length === 0)
                                    continue;
                                if ((tds.length % 2) !== 0)
                                    continue;
                                for (let colIndex = 0; colIndex < tds.length; colIndex += 2) {
                                    const colTitle = tds[colIndex];
                                    const colValue = tds[colIndex + 1];
                                    const keyParts = colTitle.textContent.split(`[`);
                                    let key = keyParts[0];
                                    const rule = findRule(key, ``);
                                    if (rule !== null) {
                                        //最小→最大：975 →5041
                                        let value = toPlainText(colValue);
                                        /*
                                        const valueParts = value.split(`→`)
                                        rule.value = valueParts[valueParts.length - 1]
                                        */
                                        rule.value = value;
                                    }
                                }
                            }
                        }
                        else if (contentText === `スキル`) {
                            const contentDivs = doc.querySelectorAll(`div[id="${contentId}"]`);
                            if (contentDivs.length === 0)
                                continue;
                            let contentDiv = contentDivs[0];
                            let skillUl = contentDiv.nextElementSibling === null ?
                                null : contentDiv.nextElementSibling;
                            let skillAll = ``;
                            while (skillUl !== null) {
                                if (skillUl.tagName !== `UL`) {
                                    contentDiv = skillUl;
                                    const h2s = contentDiv.querySelectorAll(`h2`);
                                    if (h2s.length >= 1) {
                                        const h2 = h2s[0];
                                        if (h2.textContent === `入手方法`)
                                            break;
                                    }
                                }
                                //スキル名
                                const spans = skillUl.querySelectorAll(`span`);
                                if (spans.length === 0)
                                    break;
                                const span = spans[0];
                                const skillName = span.textContent;
                                console.log(skillName);
                                //スキル項目
                                const table = skillUl.nextElementSibling === null ?
                                    null : skillUl.nextElementSibling;
                                if (table === null)
                                    break;
                                let skillAbility = ``;
                                const trs = table.querySelectorAll('tr');
                                for (const tr of trs) {
                                    for (const col of tr.children) {
                                        const colText = toPlainText(col);
                                        console.log(`->${colText}`);
                                        if (skillAbility !== ``)
                                            skillAbility += `<br>`;
                                        skillAbility += colText;
                                    }
                                }
                                if (skillAll !== ``)
                                    skillAll += `<br>`;
                                skillAll += skillName + `<br>` + skillAbility;
                                //次のulへ
                                skillUl = table.nextElementSibling === null ?
                                    null : table.nextElementSibling;
                            }
                            if (skillAll !== ``) {
                                const rule = findRule(contentText, ``);
                                if (rule !== null) {
                                    rule.value = skillAll;
                                }
                            }
                        }
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
//# sourceMappingURL=SiteAlImporter.js.map
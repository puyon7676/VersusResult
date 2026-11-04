import { GameEnv } from "../GameEnv.js";
import { registerCharStatusClassifyTypes, CharNameSpaceTypes, } from "../CharClass.js";
import { CharSpecItem } from "../CharSpec.js";
import { CharParseData, CharSaveStatusData } from "../CharDB.js";
import { registImporter } from "../SiteImporter.js";
import { CharParseDebug } from "../CharDB.js";
import { ScoreConfigItem } from "../ScoreConfig.js";
export const GtCharStatusClassifyTypes = {
    /**Gt用 */
    classGt: "Gt",
};
export const GtCharStatusNameTypes = {
    /**攻撃力： */
    GtStatusAtk: 'GtStatusAtk',
    /**体力： */
    GtStatusHP: 'GtStatusHP',
    /**ダメージ減少：Damage Reduction */
    GtStatusDr: 'GtStatusDr',
    /**スキル */
    AlSkill: 'AlSkill',
};
export class GtSiteImporter {
    gameType = GtCharStatusClassifyTypes.classGt;
    static domain = `https://gamerch.com/guardiantales`;
    static imgDomain = `https://cdn.gamerch.com/resize`;
    nsURLs = [
        { ns: CharNameSpaceTypes.CnsRed, nsName: "火属性", url: `${GtSiteImporter.domain}/293990`, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsBlue, nsName: "水属性", url: ``, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsGreen, nsName: "土属性", url: ``, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsWhite, nsName: "光属性", url: ``, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsGray, nsName: "闇属性", url: ``, lastUpdate: null },
        { ns: CharNameSpaceTypes.CnsBlack, nsName: "無属性", url: ``, lastUpdate: null },
    ];
    importerMapItem = {
        gm: GtCharStatusClassifyTypes.classGt,
        displayText: `ガデテル`,
        inst: this,
        nsURLs: this.nsURLs,
        htmlMarker: `gt`,
        chListMaker: `gt`, parseHtml: this.doParseGtHtml,
        statusMaker: `gtStatus_`, parseStatus: this.doParseGtStatus, statusZip: `gt_CharStatus.zip`,
        charHtmlZip: `gt_CharHtml.zip`,
        charRisticWd: `gt_RisticWd.json`,
    };
    async doParseGtHtml(htmlText, ns) {
        const saveArray = new Array;
        const timeElem = await GtSiteImporter.parseGtHtml(htmlText, async (chParseData, nsUse) => {
            //console.log(chParseData)
            const ch = new CharSpecItem;
            //ch.id = Number(chParseData.id)
            ch.name = chParseData.name;
            ch.gt = GtCharStatusClassifyTypes.classGt;
            ch.ns = nsUse;
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
    async doParseGtStatus(htmlText) {
        //後処理（カンマ除去）：必要なので消さないこと！
        function postProc(statusData) {
            for (const status of statusData) {
                if (status.useCombo)
                    continue;
                if (status.key === GtCharStatusNameTypes.AlSkill)
                    continue;
                let text = status.value;
                const valueParts = text.split(`→`);
                text = valueParts[valueParts.length - 1];
                //カンマを取り除く
                text = text.replace(/,/g, '');
                //変換結果設定
                status.converted = `${parseInt(text)}`;
            }
        }
        const saveArray = new Array();
        const res = await GtSiteImporter.parseGtInfoHtml(htmlText, parseArray => {
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
            { key: GtCharStatusNameTypes.GtStatusAtk, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 10);
                } },
            { key: GtCharStatusNameTypes.GtStatusHP, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 10);
                } },
            { key: GtCharStatusNameTypes.GtStatusDr, isSkill: false,
                scoreFunc: (key, min, value) => {
                    const max = this.charStatusDB.toScoreRateMaxNum(key, value);
                    return this.charStatusDB.scoreFunc(min, max, 10);
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
            { key: GtCharStatusNameTypes.AlSkill, isSkill: true,
                scoreFunc: (key, min, value) => { return makeRes(key, value); } },
        ];
        return table1.concat(table2);
    }
    register() {
        registerCharStatusClassifyTypes(GtCharStatusClassifyTypes);
        const res = registImporter(this.importerMapItem);
        return res;
    }
    static parseGtHtml = async (htmlText, callback) => {
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
        const mu__indexies = doc.getElementsByClassName(`mu__index`);
        if (mu__indexies.length >= 1) {
            const mu__index = mu__indexies[0];
            const mu__list = mu__index.querySelectorAll('.mu__list');
            if (mu__list !== null) {
                const contents = mu__list[0];
                const aTags = contents.querySelectorAll('a');
                if (aTags.length !== 0) {
                    for (const aTag of aTags) {
                        const href = aTag.getAttribute('href') || "";
                        if (href === ``)
                            continue;
                        if (href.startsWith(`#`) === false)
                            continue;
                        const contentId = href.substring(1);
                        const contentText = aTag.textContent;
                        const contentDivs = doc.querySelectorAll(`h2[id="${contentId}"]`);
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
                            if (cols.length !== 10)
                                continue;
                            let name = "";
                            let id = "";
                            let hrefPath = "";
                            let localImagePath = "";
                            let rarityId = "";
                            //キャラ画像
                            //https://cdn.gamerch.com/contents/wiki/2335/entry/y1ySNgPU.png
                            const imgs = cols[0].querySelectorAll('img');
                            if (imgs.length >= 1) {
                                const img = imgs[0];
                                const imgURL = img.dataset.src;
                                if (imgURL !== undefined) {
                                    localImagePath = imgURL;
                                }
                            }
                            //キャラ名
                            const aTagChNames = cols[1].querySelectorAll('a');
                            if (aTagChNames.length >= 1) {
                                const aTagChName = aTagChNames[0];
                                name = aTagChName.textContent;
                                //キャラ詳細URL
                                const hrefCh = aTagChName.getAttribute('href') || "";
                                hrefPath = hrefCh;
                                //キャラID
                                const parts = hrefPath.split(`/`);
                                if (parts.length - 1 > 0)
                                    id = parts[parts.length - 1];
                            }
                            //レア
                            const rarity = cols[2].textContent;
                            if (rarity !== ``)
                                rarityId = rarity;
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
                            const endText = `キャラ一覧`;
                            if (contentText.endsWith(endText) === false) {
                                console.log(`[${name}] missmatch contentText`, contentText);
                                continue;
                            }
                            const contentKey = contentText.substring(0, contentText.length - endText.length);
                            const inst = new GtSiteImporter();
                            const nsFind = inst.nsURLs.find(nsItem => nsItem.nsName === contentKey);
                            if (nsFind === undefined) {
                                console.log(`[${name}] no match ns`);
                                continue;
                            }
                            const nsUse = nsFind.ns;
                            const res = new CharParseData();
                            res.name = sanitizeFileName(name);
                            res.id = id;
                            res.rarity = rarityId;
                            res.imageFileName = localImagePath;
                            res.contentURL = hrefPath;
                            if (callback !== undefined) {
                                validRows++;
                                res.nRow = validRows;
                                await callback(res, nsUse);
                            }
                        }
                    }
                }
            }
        }
        console.log(`[parseGtHtml] ${validRows} valid parsed!`);
        return timeElem;
    };
    static parseGtInfoHtml = async (htmlText, callback) => {
        const env = new GameEnv;
        const doc = await env.getDoc(htmlText);
        const parseRules = [
            { hContent: ``, find: `攻撃力`, key: `GtStatusAtk`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `体力`, key: `GtStatusHP`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `ダメージ減少`, key: `GtStatusDr`, value: ``, need: true, useCombo: false },
            { hContent: ``, find: `スキル`, key: `AlSkill`, value: ``, need: false, useCombo: false },
        ];
        function toSkillText(elem) {
            let resText = ``;
            for (const node of elem.childNodes) {
                if (node.nodeType === 3 /*Node.TEXT_NODE*/) {
                    // テキスト内の \n (改行コード) や余計な空白を削除・整理
                    if (node.textContent !== null) {
                        resText += node.textContent.replace(/\s+/g, '');
                    }
                }
                else if (node.nodeType === 1 /*Node.ELEMENT_NODE*/) {
                    if (node.nodeName === 'BR') {
                        // <br> を見つけたら意図通り ',' に置換
                        resText += "<br>";
                    }
                    else if (node.textContent !== null) {
                        resText += node.textContent.replace(/\s+/g, '');
                    }
                }
            }
            return resText;
        }
        function findRule(findText, hContent) {
            const match = parseRules.find(item => item.find === findText && item.hContent === hContent);
            if (match)
                return match;
            return null;
        }
        //目次コンテナ要素を取得
        const mu__indexies = doc.getElementsByClassName(`mu__index`);
        if (mu__indexies.length >= 1) {
            const mu__index = mu__indexies[0];
            const mu__list = mu__index.querySelectorAll('.mu__list');
            if (mu__list !== null) {
                const contents = mu__list[0];
                const aTags = contents.querySelectorAll('a');
                if (aTags.length !== 0) {
                    for (const aTag of aTags) {
                        const href = aTag.getAttribute('href') || "";
                        if (href === ``)
                            continue;
                        if (href.startsWith(`#`) === false)
                            continue;
                        const contentId = href.substring(1);
                        const contentText = aTag.textContent;
                        const contentDivs = doc.querySelectorAll(`h2[id="${contentId}"]`);
                        if (contentDivs.length === 0)
                            continue;
                        const contentDiv = contentDivs[0];
                        if (contentDiv === null)
                            continue;
                        if (contentText.includes(`基本情報`)) {
                            const statusDiv2 = contentDiv.nextElementSibling;
                            if (statusDiv2 === null)
                                continue;
                            const statusHr = statusDiv2.nextElementSibling;
                            if (statusHr === null)
                                continue;
                            const statusDiv1 = statusHr.nextElementSibling;
                            if (statusDiv1 === null)
                                continue;
                            const statusH3 = statusDiv1.nextElementSibling;
                            if (statusH3 === null)
                                continue;
                            const statusDiv0 = statusH3.nextElementSibling;
                            if (statusDiv0 === null)
                                continue;
                            const tables = statusDiv0.querySelectorAll(`TABLE`);
                            if (tables.length === 0)
                                continue;
                            const table = tables[0];
                            console.log(`**ステータス値**`, statusDiv2.className);
                            const trs = table.querySelectorAll('tr');
                            for (const tr of trs) {
                                const ths = tr.querySelectorAll(`th`);
                                for (const th of ths) {
                                    const td = th.nextElementSibling;
                                    if (td === null)
                                        continue;
                                    if (td.tagName !== `TD`)
                                        continue;
                                    const statusName = th.textContent;
                                    const statusValue = td.textContent;
                                    const rule = findRule(statusName, ``);
                                    if (rule !== null)
                                        rule.value = statusValue;
                                }
                            }
                        }
                        else if (contentText.includes(`スキル関連情報`)) {
                            const skillDiv = contentDiv.nextElementSibling;
                            if (skillDiv === null)
                                continue;
                            const tables = skillDiv.querySelectorAll(`TABLE`);
                            if (tables.length === 0)
                                continue;
                            const table = tables[0];
                            console.log(`**スキル項目**`, skillDiv.className);
                            const trs = table.querySelectorAll('tr');
                            if (trs.length === 0)
                                continue;
                            if (trs.length !== 7) {
                                console.log(`→スキル項目(missmatch rec count)`, trs.length);
                                continue;
                            }
                            let rowIndex = 0;
                            let skillType = ``;
                            let skillName = ``;
                            let skillAbility = ``;
                            let skillAll = ``;
                            //「通常攻撃」は２行で１セット
                            let trSkillType = trs[rowIndex];
                            let trSkillContent = trs[rowIndex + 1];
                            if (trSkillType.cells.length === 0)
                                continue;
                            if (trSkillContent.cells.length === 0)
                                continue;
                            let colSkillType;
                            let colSkillName;
                            if (trSkillType.cells[0].tagName === `TH`) {
                                colSkillType = trSkillType.cells[0];
                                colSkillName = colSkillType.nextElementSibling;
                                skillType = toSkillText(colSkillType);
                                skillName = toSkillText(colSkillName);
                                const td = trSkillContent.cells[0];
                                skillAbility = toSkillText(td);
                                console.log(skillType, skillName, skillAbility);
                                if (skillAll !== ``)
                                    skillAll += `<br>`;
                                skillAll += skillType + `：` + skillName + `<br>` + skillAbility;
                            }
                            rowIndex += 2;
                            //「特殊能力」は２行で１セット
                            skillType = ``;
                            skillName = ``;
                            skillAbility = ``;
                            trSkillType = trs[rowIndex];
                            trSkillContent = trs[rowIndex + 1];
                            if (trSkillType.cells.length === 0)
                                continue;
                            if (trSkillContent.cells.length === 0)
                                continue;
                            if (trSkillType.cells[0].className !== `TH`) {
                                colSkillType = trSkillType.cells[0];
                                colSkillName = colSkillType.nextElementSibling;
                                skillType = toSkillText(colSkillType);
                                skillName = toSkillText(colSkillName);
                                const td = trSkillContent.cells[0];
                                skillAbility = toSkillText(td);
                                console.log(skillType, skillName, skillAbility);
                                if (skillAll !== ``)
                                    skillAll += `<br>`;
                                skillAll += skillType + `：` + skillName + `<br>` + skillAbility;
                            }
                            rowIndex += 2;
                            //「チェインスキル」は１行で１セット
                            skillType = ``;
                            skillName = ``;
                            skillAbility = ``;
                            trSkillType = trs[rowIndex];
                            trSkillContent = trs[rowIndex];
                            if (trSkillType.cells.length === 0)
                                continue;
                            if (trSkillContent.cells.length === 0)
                                continue;
                            if (trSkillType.cells[0].tagName === `TH`) {
                                colSkillType = trSkillType.cells[0];
                                colSkillName = colSkillType.nextElementSibling;
                                skillType = toSkillText(colSkillType);
                                skillName = toSkillText(colSkillName);
                                skillAbility = toSkillText(trSkillContent); //これはデバッグのみで出力しない
                                console.log(skillType, skillName, skillAbility);
                                if (skillAll !== ``)
                                    skillAll += `<br>`;
                                skillAll += skillType + `<br>` + skillName;
                            }
                            rowIndex++;
                            //最後は２行で１セット
                            skillType = ``;
                            skillName = ``;
                            skillAbility = ``;
                            trSkillType = trs[rowIndex + 1];
                            trSkillContent = trs[rowIndex];
                            if (trSkillType.cells.length === 0)
                                continue;
                            if (trSkillContent.cells.length === 0)
                                continue;
                            if (trSkillType.cells[0].className !== `TH`) {
                                skillType = trSkillType.cells[0].textContent;
                                const spans = skillDiv.querySelectorAll(`span`);
                                if (spans.length === 0)
                                    continue;
                                skillName = spans[0].textContent;
                                const td = trSkillContent.cells[0];
                                skillAbility = toSkillText(td);
                                console.log(skillType, skillName, skillAbility);
                                if (skillAll !== ``)
                                    skillAll += `<br>`;
                                skillAll += skillType + `：` + skillName + `<br>` + skillAbility;
                            }
                            const rule = findRule(`スキル`, ``);
                            if (rule !== null)
                                rule.value = skillAll;
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
//# sourceMappingURL=SiteGtImporter.js.map
import { CharNameSpaceTypes } from "./CharClass.js";
import { VersusScoreItem } from "./VersusResult.js";
import { HtmlMaker, HtmlMakerDialogDesc, HtmlDialogInfo, HtmlZindexHelper } from "./HtmlMaker.js";
import { HtmlMakerDialogOTypes } from "./HtmlMaker.js";
import { HtmlMakerDialogGTypes } from "./HtmlMaker.js";
import { HtmlMakerCommonCss } from "./HtmlMaker.js";
import { HtmlMakerGuideBar, HtmlMakerGuideBarItem } from "./HtmlMaker.js";
export const CombatFormationTypes = {
    None: "None",
    Player: "Player",
    Enemy: "Enemy"
};
export const CombatComboTypes = {
    None: "None",
    Attr: "Attr",
    Role: "Role"
};
export const CombatLevelTypes = {
    HiLv: "HiLv",
    MidLv: "MidLv",
    LoLv: "LoLv"
};
export const CombatJudgeTypes = {
    Likely: "Likely",
    Uncertain: "Uncertain",
    Wishful: "Wishful"
};
export class CombatJudgeBasis {
    static Likely = 0.9;
    static Uncertain = 0.64;
}
export class CombatResultItem {
    scoreItems = [];
    formationType = CombatFormationTypes.None;
    gmComboKeywords;
    boost = 0;
    get imgPrefix() {
        return this.formationType === CombatFormationTypes.Player ? "ftPlayer" : "ftEnemy";
    }
    get judgeWidth() {
        return 48;
    }
    setScoreItems(scoreItems) {
        if (scoreItems === undefined)
            return;
        this.scoreItems = new Array;
        for (const item of scoreItems) {
            //console.log(`score=[${item.score}]`);
            const scItem = new VersusScoreItem(item.ch, item.prop, item.isEmpty, item.scoreSet);
            this.scoreItems.push(scItem);
        }
    }
    async toCharHTML(imgLoader, item) {
        const fileName = item.isEmpty ? imgLoader.demoMaterial : item.ch.iconFileName;
        const ns = item.ch.ns === CharNameSpaceTypes.None ? "" : item.ch.ns;
        const fileURL = await imgLoader.getImageUrlBy(fileName, ns);
        let title = this.scoreToolTip(item);
        if (title !== "") {
            title = `title="${title}"`;
        }
        return `
<img class=${this.charCssClassName()}
  src="${fileURL}"
  ${title}>
`.trim();
    }
    scoreToolTip(item) {
        if (item.isEmpty) {
            return "";
        }
        const score = this.calcBoostScore(item.score);
        return `${item.prop.chName}\nscore=${score}`;
    }
    async toJudgeHTML(imgLoader, judge) {
        const fileURL = this.toJudgeFileURL(imgLoader, judge);
        return `<img class=${this.judgeCssClassName()} src="${fileURL}" width="48">`;
    }
    async toJudgeFileURL(imgLoader, judge) {
        let fileURL = null;
        switch (judge) {
            case CombatJudgeTypes.Likely:
                //fileURL = await imgLoader.getImageUrl("win.png");
                fileURL = await imgLoader.getImageUrlBy("win.png", imgLoader.AnyNs);
                break;
            case CombatJudgeTypes.Uncertain:
                //fileURL = await imgLoader.getImageUrl("even.png");
                fileURL = await imgLoader.getImageUrlBy("even.png", imgLoader.AnyNs);
                break;
            case CombatJudgeTypes.Wishful:
                //fileURL = await imgLoader.getImageUrl("lost.png");
                fileURL = await imgLoader.getImageUrlBy("lost.png", imgLoader.AnyNs);
                break;
            default: return "";
        }
        return fileURL;
    }
    charCssClassName() {
        return "combat-char";
    }
    judgeCssClassName() {
        return "combat-judge";
    }
    calcBoostScore(base) {
        const boost = this.boost === 0 ? 1 : this.boost;
        return Math.ceil(base * boost / 100);
    }
    /** コンボなしの合計スコア */
    get combatScore() {
        if (this.scoreItems === undefined)
            return 0;
        const base = this.scoreItems.reduce((sum, vsItem) => vsItem.isEmpty ? sum : sum + vsItem.score, 0);
        return this.calcBoostScore(base);
    }
    /** グループコンボ判定（同一NSの連続数をカウント） */
    get checkNsCombo() {
        if (this.scoreItems === undefined) {
            console.log(`[checkNsCombo] scoreItems undefined (${this.formationType})`);
            return undefined;
        }
        //console.log(`**checkNsCombo**`)
        //console.log(this.scoreItems)
        const scoreItems = Array();
        for (const item of this.scoreItems) {
            if (item.isEmpty)
                continue;
            if (item.ch.ns === CharNameSpaceTypes.None)
                continue;
            const newItem = new VersusScoreItem(item.ch, item.prop, item.isEmpty, item.scoreSet);
            scoreItems.push(newItem);
        }
        if (scoreItems.length == 0) {
            console.log(`[checkNsCombo] no scoreItems (${this.formationType})`);
            return undefined;
        }
        let key = CharNameSpaceTypes.None;
        let nCombo = 0;
        const comboMap = new Map;
        for (const item of scoreItems) {
            if (key === CharNameSpaceTypes.None) {
                key = item.ch.ns;
                nCombo = 1;
                continue;
            }
            if (key !== item.ch.ns) {
                key = item.ch.ns;
                nCombo = 1;
                continue;
            }
            nCombo++;
            if (nCombo >= 2) {
                if (comboMap.has(key)) {
                    comboMap.set(key, nCombo);
                }
                else {
                    comboMap.set(key, nCombo);
                }
            }
        }
        //console.log(`**checkNsCombo::${this.formationType}**`)
        //console.log(comboMap)
        return comboMap;
    }
    /** グループコンボスコア値（同一NSの連続数をカウント結果での合計スコア） */
    calcNsScore(nsScore) {
        const nsCombo = this.checkNsCombo;
        if (nsCombo === undefined)
            return 0;
        let nsScoreAdd = 0;
        for (const [ns, numCombo] of nsCombo) {
            if (!nsScore.has(numCombo))
                continue;
            const addScore = nsScore.get(numCombo);
            if (addScore === undefined)
                continue;
            nsScoreAdd += addScore;
        }
        return nsScoreAdd;
    }
    calcGmScore(gmScore) {
        let gmScoreAdd = 0;
        for (const [kw, count] of this.gmComboKeywords) {
            if (gmScore.has(count)) {
                gmScoreAdd += gmScore.get(count);
            }
        }
        return gmScoreAdd;
    }
}
export class CombatResultPair {
    hasCombo = false;
    player;
    enemy;
    winRate = new Map;
    setPlayer(playerRes) {
        playerRes.formationType = CombatFormationTypes.Player;
        this.player = playerRes;
    }
    setEnemy(playerRes) {
        playerRes.formationType = CombatFormationTypes.Enemy;
        this.enemy = playerRes;
    }
    judge(combo) {
        const rateGet = this.winRate.get(combo);
        const rate = rateGet;
        if (rate >= CombatJudgeBasis.Likely)
            return CombatJudgeTypes.Likely;
        if (rate >= CombatJudgeBasis.Uncertain)
            return CombatJudgeTypes.Uncertain;
        return CombatJudgeTypes.Wishful;
    }
    judgeForEnemy(playerJudge) {
        switch (playerJudge) {
            case CombatJudgeTypes.Likely:
                return CombatJudgeTypes.Wishful;
            case CombatJudgeTypes.Uncertain:
                return CombatJudgeTypes.Uncertain;
            case CombatJudgeTypes.Wishful:
                return CombatJudgeTypes.Likely;
        }
    }
}
export class CombatResult {
    uiInfo = new HtmlDialogInfo;
    combatPairs = new Map;
    gameConfig = undefined;
    requestActivate;
    option = undefined;
    guide = undefined;
    //emptyFile: string = "plus.png"  //「空欄」用PNG
    parentName = "";
    tableName = "";
    setPair(levelType, pair) {
        this.combatPairs.set(levelType, pair);
    }
    calcCombatScore() {
        for (const [key, pair] of this.combatPairs) {
            if (pair.player === undefined)
                continue;
            if (pair.enemy === undefined)
                continue;
            const combos = [
                CombatComboTypes.None,
                CombatComboTypes.Attr,
                CombatComboTypes.Role
            ];
            for (const combo of combos) {
                let playerScore = pair.player.combatScore;
                let enemyScore = pair.enemy.combatScore;
                console.log(`**normal score**`, playerScore, enemyScore);
                if (this.gameConfig !== undefined) {
                    console.log(`** NS combo checking ... **`);
                    const playerNsCombo = pair.player.checkNsCombo;
                    const enemyNsCombo = pair.enemy.checkNsCombo;
                    const nsScore = this.gameConfig.nsComboScoreList;
                    const gmScore = this.gameConfig.gameComboScoreList;
                    if (nsScore.size === 0) {
                        console.log(`** NS score disable or empty **`);
                    }
                    if (gmScore.size === 0) {
                        console.log(`** GM score disable or empty **`);
                    }
                    if (playerNsCombo !== undefined) {
                        let nsScoreAdd = pair.player.calcNsScore(nsScore);
                        console.log(`** player nsScoreAdd : ${nsScoreAdd} **`);
                        playerScore += nsScoreAdd;
                    }
                    if (enemyNsCombo !== undefined) {
                        let nsScoreAdd = pair.enemy.calcNsScore(nsScore);
                        console.log(`** enemy nsScoreAdd : ${nsScoreAdd} **`);
                        enemyScore += nsScoreAdd;
                    }
                    if (this.gameConfig.gameComboAvail >= 1) {
                        let playerGmScore = pair.player.calcGmScore(gmScore);
                        let enemyGmScore = pair.enemy.calcGmScore(gmScore);
                        console.log(`** player gmScore : ${playerGmScore} **`);
                        console.log(`** enemy  gmScore : ${enemyGmScore} **`);
                        playerScore += playerGmScore;
                        enemyScore += enemyGmScore;
                    }
                }
                else {
                    console.log(`** NS combo skipped **`);
                }
                console.log(`**result score**`, playerScore, enemyScore);
                pair.winRate.set(combo, enemyScore !== 0
                    ? playerScore / enemyScore
                    : 1);
            }
        }
    }
    /**キャライメージ差し替え */
    async replaceChar(levelType, formType, fItem, chItem, imgLoader) {
        const pair = this.combatPairs.get(levelType);
        let combatRes = undefined;
        if (formType === CombatFormationTypes.Player) {
            combatRes = pair?.player;
        }
        else if (formType === CombatFormationTypes.Enemy) {
            combatRes = pair?.enemy;
        }
        if (combatRes === undefined)
            return false;
        const id = fItem.itemID;
        if (id < 0)
            return false;
        const pos = id - 1;
        combatRes = combatRes;
        const prefix = combatRes.imgPrefix;
        const imgId = `${prefix}${id}`;
        const vItem = combatRes.scoreItems[pos];
        const ch = vItem.ch;
        let imgFile = ``;
        if (fItem.isEmpty) {
            //ch.id = 0
            ch.idAsText = ``;
            ch.name = "";
            imgFile = imgLoader.demoMaterial;
            console.log(`[replaceChar] set empty`);
        }
        else {
            //ch.id = chItem.id
            ch.idAsText = chItem.idAsText;
            ch.name = chItem.name;
            imgFile = ch.iconFileName;
            console.log(`[replaceChar] set char ${chItem.id}:${chItem.name}`);
        }
        vItem.isEmpty = fItem.isEmpty;
        const ns = ch.ns === CharNameSpaceTypes.None ? "" : ch.ns;
        const fileURL = await imgLoader.getImageUrlBy(imgFile, ns);
        if (fileURL === null)
            return false;
        const htmlMaker = new HtmlMaker();
        const outerCss = this.outerCssClassName();
        htmlMaker.ReplaceImg(outerCss, imgId, fileURL);
        //これを実行するとゼロで上書きしてしまう：htmlMaker.ReplaceImgToolTip(outerCss, imgId, combatRes.scoreToolTip(vItem))
        return true;
    }
    /**判定マーク差し替え */
    async replaceJudge(imgLoader) {
        async function replaceJudgeInternal(item, judge) {
            const fileURL = await item.toJudgeFileURL(imgLoader, judge);
            if (fileURL === null)
                return;
            const prefix = item.imgPrefix;
            for (let id = 0; id < item.scoreItems.length; id++) {
                const imgId = `${prefix}${id + 1}`;
                const imgs = htmlMaker.FindImgsByID(outerCss, imgId);
                if (imgs === null || imgs.length <= 1) {
                    console.error(`fail on judge marker`);
                    continue;
                }
                const img = imgs[1];
                htmlMaker.SetImgSrc(img, fileURL);
                if (item.scoreItems[id].isEmpty) {
                    htmlMaker.SetImgSize(img, 0, 0);
                }
                else {
                    htmlMaker.SetImgSize(img, item.judgeWidth, item.judgeWidth);
                }
                const vItem = item.scoreItems[id];
                //console.log(`[replaceJudge] ${id}:${item.formationType}:${vItem.ch.name}:${vItem.score}`)
                htmlMaker.ReplaceImgToolTip(outerCss, imgId, item.scoreToolTip(vItem));
            }
        }
        const htmlMaker = new HtmlMaker();
        const outerCss = this.outerCssClassName();
        for (const [key, pair] of this.combatPairs) {
            if (pair.player === undefined)
                continue;
            if (pair.enemy === undefined)
                continue;
            const combos = [
                CombatComboTypes.None,
                CombatComboTypes.Attr,
                CombatComboTypes.Role
            ];
            for (const combo of combos) {
                if (combo !== CombatComboTypes.None)
                    continue;
                const judge = pair.judge(combo);
                const judgeEnemy = pair.judgeForEnemy(judge);
                await replaceJudgeInternal(pair.player, judge);
                await replaceJudgeInternal(pair.enemy, judgeEnemy);
            }
        }
    }
    /**ガイド更新 */
    async updateGuide() {
        if (this.guide === undefined)
            return;
        if (this.gameConfig === undefined)
            return;
        if (this.combatPairs.has(CombatLevelTypes.HiLv) === false)
            return;
        const pair = this.combatPairs.get(CombatLevelTypes.HiLv);
        if (pair === undefined)
            return;
        const playerNsCombo = pair.player.checkNsCombo;
        const enemyNsCombo = pair.enemy.checkNsCombo;
        const nsScore = this.gameConfig.nsComboScoreList;
        const gmScore = this.gameConfig.gameComboScoreList;
        let playerNsScoreAdd = 0;
        if (playerNsCombo !== undefined) {
            playerNsScoreAdd = pair.player.calcNsScore(nsScore);
        }
        let enemyNsScoreAdd = 0;
        if (enemyNsCombo !== undefined) {
            enemyNsScoreAdd = pair.enemy.calcNsScore(nsScore);
        }
        let playerGmScore = 0;
        let enemyGmScore = 0;
        if (this.gameConfig.gameComboAvail >= 1) {
            playerGmScore = pair.player.calcGmScore(gmScore);
            enemyGmScore = pair.enemy.calcGmScore(gmScore);
        }
        this.guide.setTextByKey(`ns`, `NSコンボ：P=${playerNsScoreAdd} vs E=${enemyNsScoreAdd}`);
        this.guide.setTextByKey(`gm`, `GMコンボ：P=${playerGmScore} vs E=${enemyGmScore}`);
    }
    async toHTML(formationName, imgLoader) {
        this.tableName = formationName;
        const table = document.createElement("table");
        table.className = formationName;
        table.id = formationName;
        const tbody = document.createElement("tbody");
        table?.appendChild(tbody);
        async function makeCombatTableInternal(judge, combatRes) {
            const tableRow = document.createElement("tr");
            tbody?.appendChild(tableRow);
            const judgeHtml = await combatRes.toJudgeHTML(imgLoader, judge);
            const prefix = combatRes.imgPrefix;
            let id = 0;
            for (const scItem of combatRes.scoreItems) {
                id++;
                const charHtml = await combatRes.toCharHTML(imgLoader, scItem);
                const innerHTML = `
<div class=${outerCss} item-id="${prefix}${id}">
  ${charHtml}
  ${judgeHtml}
</div>
`.trim();
                const td = document.createElement("td");
                td.innerHTML = innerHTML;
                tableRow.appendChild(td);
            }
        }
        const outerCss = this.outerCssClassName();
        for (const [combatLevel, pair] of this.combatPairs) {
            const judge = pair.judge(CombatComboTypes.None);
            const enemyJudge = pair.judgeForEnemy(judge);
            await makeCombatTableInternal(judge, pair.player);
            await makeCombatTableInternal(enemyJudge, pair.enemy);
        }
        return table.outerHTML;
    }
    htmlMaker;
    createCombatBox(title, parentName, combatHTML) {
        this.parentName = parentName;
        this.htmlMaker = new HtmlMaker;
        const dlgHTML = `<div class="${this.parentName}-dlg-content">
    ${combatHTML}
</div>`;
        const dialogDesc = new HtmlMakerDialogDesc();
        dialogDesc.title = "<" + title + ">";
        const dlg = dialogDesc.NewDialog(parentName, this.dlgCssClassName());
        dialogDesc.SetOType(HtmlMakerDialogOTypes.Option, this.onVisibleToggle);
        dialogDesc.SetGuide(HtmlMakerDialogGTypes.Guide, this.onGuide);
        dialogDesc.SetContent(parentName, dlgHTML);
        this.applyCss();
        dialogDesc.EnableEventHandlers();
        dialogDesc.onMoveDone = this.moverOnMoveDone;
        return dlg;
    }
    moverOnMoveDone = async (dlg) => {
        console.log(`[${dlg.className}] moved`);
        const zindexHelper = new HtmlZindexHelper();
        zindexHelper.SaveSetting(dlg);
        if (this.requestActivate !== undefined) {
            await this.requestActivate(dlg);
        }
    };
    onVisibleToggle = async (dlg, oType) => {
        console.log(`**onVisibleToggle**`);
        if (this.option !== undefined) {
            this.option.SetVisible(!this.option.GetVisible());
            return;
        }
    };
    onGuide = async (dlg, gType, gOwnElem) => {
        if (this.guide !== undefined) {
            this.guide.setVisible(!this.guide.getVisible());
            return;
        }
        const parentName = this.parentName;
        const gItems = new Map;
        const nsItem = new HtmlMakerGuideBarItem();
        nsItem.value.makeItems(1);
        nsItem.value.items[0].typeInfo.setLabel(`NS : 0`, false);
        nsItem.value.items[0].className = `${parentName}-guide-ns`;
        gItems.set(`ns`, nsItem);
        const gmItem = new HtmlMakerGuideBarItem();
        gmItem.value.makeItems(1);
        gmItem.value.items[0].typeInfo.setLabel(`GM : 0`, false);
        gmItem.value.items[0].className = `${parentName}-guide-gm`;
        gItems.set(`gm`, gmItem);
        const rcParent = this.htmlMaker.GetRect(dlg.parentElement);
        const rcOwn = this.htmlMaker.GetRect(gOwnElem);
        const guide = new HtmlMakerGuideBar();
        guide.setGuidetems(gItems);
        guide.setListener(`${parentName}-guide`, parentName, `${parentName}-guide`);
        guide.setFontConfig(`0.7`);
        guide.applyCss();
        guide.enableOverlay(false);
        /*
        guide.show(`34`, `-4`)
        */
        guide.show(`${parseInt(rcOwn.left) - parseInt(rcParent.left) + 34}`, `0`);
        this.guide = guide;
        this.updateGuide();
    };
    enableLazyImages(imageLoader) {
        this.htmlMaker.initObserver(this.dlgCssClassName(), imageLoader);
    }
    outerCssClassName() {
        return "combat-outer";
    }
    dlgCssClassName() {
        return `${this.parentName}-dlg`;
    }
    applyCss() {
        const item = new CombatResultItem();
        const outerCss = `.${this.outerCssClassName()}`;
        const charCss = `.${item.charCssClassName()}`;
        const judgeCss = `.${item.judgeCssClassName()}`;
        const leftPos = parseInt(this.uiInfo.left);
        const topPos = parseInt(this.uiInfo.top);
        const style = document.createElement("style");
        style.textContent = `
${this.htmlMaker.MakeDefaultDialogParentCss(this.parentName, leftPos, topPos)}
${this.htmlMaker.MakeDefaultDialogCss(this.dlgCssClassName())}
.${this.parentName}-dlg-content {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}
.${this.tableName} {
${HtmlMakerCommonCss.spacingTable}
}
.${this.tableName} tr {
${HtmlMakerCommonCss.spacingTr}
}
${outerCss} {
  position: relative;
  width: 100px;
  height: 100px;
}
${outerCss} ${charCss} {
  width: 100px;
  height: 100px;
}
${outerCss} ${judgeCss} {
  position: absolute;
  width: 48px;
  height: 48px;
  right: 0;
  bottom: 0;
}
`.trim();
        document.head.appendChild(style);
        const dlgParent = document.getElementById(this.parentName);
        this.htmlMaker.copyCssToInlineStyle(`.${this.parentName}`, dlgParent);
    }
}
//# sourceMappingURL=CombatResult.js.map
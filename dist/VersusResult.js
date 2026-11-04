import { AutoScoreTypes, autoScoreMap } from "./CharClass.js";
import { CharSpecItem } from "./CharSpec.js";
import { ScoreConfigSet } from "./ScoreConfig.js";
export class VersusScoreItemProp {
    chName = ``;
    autoScoreType = AutoScoreTypes.None;
    static copy(from, to) {
        to.chName = from.chName;
        to.autoScoreType = from.autoScoreType;
    }
}
export class VersusScoreItem {
    ch;
    prop;
    isEmpty = true;
    scoreSet;
    allAvailable = false;
    constructor(ch, prop, isEmpty = true, scoreSet) {
        const chNew = new CharSpecItem;
        chNew.gt = ch.gt;
        chNew.ns = ch.ns;
        //chNew.id = ch.id
        chNew.idAsText = ch.idAsText;
        chNew.name = ch.name;
        this.ch = chNew;
        const propNew = new VersusScoreItemProp;
        VersusScoreItemProp.copy(prop, propNew);
        this.prop = propNew;
        this.isEmpty = isEmpty;
        this.scoreSet = scoreSet;
    }
    get score() {
        //const score = Math.ceil( this.scoreSet.stdScore )
        let score = 0;
        switch (this.prop.autoScoreType) {
            case AutoScoreTypes.None:
                score = Math.ceil(this.scoreSet.stdScore);
                break;
            default:
                const scoreDef = autoScoreMap.get(this.prop.autoScoreType);
                const ratio = scoreDef === undefined ? 1 : scoreDef.ratio;
                score = Math.ceil(this.scoreSet.maxScore * ratio);
                break;
        }
        return score;
    }
    static copy(from, to) {
        to.ch.gt = from.ch.gt;
        to.ch.ns = from.ch.ns;
        //to.ch.id = from.ch.id
        to.ch.idAsText = from.ch.idAsText;
        to.ch.name = from.ch.name;
        VersusScoreItemProp.copy(from.prop, to.prop);
        to.isEmpty = from.isEmpty;
        to.scoreSet = new ScoreConfigSet;
        ScoreConfigSet.copy(from.scoreSet, to.scoreSet, true);
    }
}
export class VersusGroupRow {
    static defNumColumn = 5;
    columns;
    Add(scItem) {
        if (scItem === undefined) {
            console.log("[VersusGroupRow::Add] scItem === undefined");
            return;
        }
        if (this.columns === undefined) {
            this.columns = [];
        }
        this.columns.push(scItem);
    }
    Count() {
        return this.columns.length;
    }
    debug() {
        if (this.columns === undefined) {
            console.log("[VersusGroupRow::debug] this.columns === undefined");
            return;
        }
        console.log(`**VersusGroupRow**`, this.columns);
    }
}
import { GameEnv } from "./GameEnv.js";
export class VersusResult {
    groupRows;
    Add(row) {
        if (this.groupRows === undefined) {
            this.groupRows = [];
        }
        this.groupRows.push(row);
    }
    Count() {
        return this.groupRows.length;
    }
    debug() {
        if (this.groupRows === undefined) {
            console.log("this.groupRows === undefined");
        }
        else {
            for (const item of this.groupRows) {
                item.debug();
            }
        }
    }
    async loadJson(file) {
        const env = new GameEnv;
        const resJson = await env.loadJson(file);
        const resMap = resJson.groupRows.map((item) => Object.assign(new VersusGroupRow(), item));
        const res = new VersusResult();
        res.groupRows = resMap;
        return res;
    }
}
//# sourceMappingURL=VersusResult.js.map
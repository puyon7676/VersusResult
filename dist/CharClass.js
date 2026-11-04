/**ゲーム種別(ベース) */
export const CharClassifyBaseTypes = {
    /**未使用 */
    none: "none",
};
/**ゲーム種別 */
export const CharStatusClassifyTypes = { ...CharClassifyBaseTypes };
/**ゲーム種別登録 */
export function registerCharStatusClassifyTypes(newTypes) {
    Object.assign(CharStatusClassifyTypes, newTypes);
}
/*
/**ゲーム種別 * /
export const CharStatusClassifyTypes = {
    /**未使用 * /
    none: "none",
    /**ぷよクエ用 * /
    classPq: "pq",
    /**メメントモリ用 * /
    classMM: "mm",
    /**放置少女用 * /
    classHS: "hs",
} as const;
export type CharStatusClassify = typeof CharStatusClassifyTypes[keyof typeof CharStatusClassifyTypes];
*/
/**キャラ所属グループ */
export const CharNameSpaceTypes = {
    None: "None",
    CnsRed: "CnsRed",
    CnsBlue: "CnsBlue",
    CnsGreen: "CnsGreen",
    CnsYellow: "CnsYellow",
    CnsViolet: "CnsViolet",
    CnsWhite: "CnsWhite",
    CnsBlack: "CnsBlack",
    CnsGray: "CnsGray",
};
/**自動編成の枠固定 */
export const FixedFormSlotTypes = {
    None: "None",
    Front: "Front",
    Center: "Center",
    Backend: "Backend",
};
/**ブースト率 */
export const BoostTypes = {
    B100: "B100",
    B125: "B125",
    B150: "B150",
    B200: "B200",
    B300: "B300",
};
/**スコアの自動選定 */
export const AutoScoreTypes = {
    None: "None",
    High: "High",
    Mid: "Mid",
    Low: "Low",
};
/**標準スコアキー */
export const CharStatusNameTypes = {
    //共通
    cmAutoScore: `cmAutoScore`,
    /*
    //ぷよクエ用
    pqStatusHP: `pqStatusHP`,
    pqStatusATK: `pqStatusATK`,
    pqStatusREC: `pqStatusREC`,
    pqTokkunHP: `pqTokkunHP`,
    pqTokkunATK: `pqTokkunATK`,
    pqTokkunREC: `pqTokkunREC`,
    pqTokuSp1: `pqTokuSp1`,
    pqTokuSp2: `pqTokuSp2`,
    pqStatusType: `pqStatusType`,
    pqStatusCombo: `pqStatusCombo`,
    //メメントモリ用
    mmAbilitySTR: `mmAbilitySTR`,//腕力(*未対応)
    mmStatusFGT: `mmStatusFGT`, //戦闘力
    mmStatusATK: `mmStatusATK`, //攻撃力
    mmStatusPDF: `mmStatusPDF`, //物理防御力
    mmStatusACC: `mmStatusACC`, //命中
    mmStatusEVA: `mmStatusEVA`, //回避
    mmStatusCRI: `mmStatusCRI`, //クリティカル
    mmStatusMDF: `mmStatusMDF`, //魔法防御力
    mmStatusHP: `mmStatusHP`,   //HP
    mmStatusCRD: `mmStatusCRD`, //クリティカル耐性
    mmStatusDEF: `mmStatusDEF`, //防御力
    mmStatusSPD: `mmStatusSPD`, //スピード
    mmAbilityDEX: `mmAbilityDEX`,//技力
    mmAbilityMGC: `mmAbilityMGC`,//魔力
    mmAbilityDUR: `mmAbilityDUR`,//耐久力
    mmRole: `mmRole`,
    //放置少女用
    hsHpMax: `hsHpMax`, //HP上限
    hsAtk: `hsAtk`,     //攻撃力
    hsHp: `hsHp`,       //体力
    */
};
//キャラ役割
export const CharRoleTypes = {
    None: "None",
    RlAttacker: "RlAttacker",
    RlHealer: "RlHealer",
    RlDebuffer: "RlDebuffer",
    RlBuffer: "RlBuffer",
};
/**NS定義 */
export class NsDef {
    ns = CharNameSpaceTypes.None;
    nsName = ``;
}
export class NsMapItem {
    marker = ``;
    seq = 0;
}
/**キャラ一覧HTMLインポート結果のzipへの格納順 */
export const nsMap = new Map([
    [CharNameSpaceTypes.None, { marker: `None`, seq: 0 }],
    [CharNameSpaceTypes.CnsRed, { marker: `Red`, seq: 1 }],
    [CharNameSpaceTypes.CnsBlue, { marker: `Blue`, seq: 2 }],
    [CharNameSpaceTypes.CnsGreen, { marker: `Green`, seq: 3 }],
    [CharNameSpaceTypes.CnsYellow, { marker: `Yellow`, seq: 4 }],
    [CharNameSpaceTypes.CnsViolet, { marker: `Violet`, seq: 5 }],
    [CharNameSpaceTypes.CnsWhite, { marker: `White`, seq: 6 }],
    [CharNameSpaceTypes.CnsBlack, { marker: `Black`, seq: 7 }],
    [CharNameSpaceTypes.CnsGray, { marker: `Gray`, seq: 8 }],
]);
/**自編成の枠固定定義 */
export const fixedMap = new Map([
    [FixedFormSlotTypes.None, `なし`],
    [FixedFormSlotTypes.Front, `前衛`],
    [FixedFormSlotTypes.Center, `中央`],
    [FixedFormSlotTypes.Backend, `後衛`],
]);
export class AutoScoreItem {
    displayText = ``;
    ratio = 0;
}
/**敵編成のステータス値定義 */
export const autoScoreMap = new Map([
    [AutoScoreTypes.None, { displayText: `なし`, ratio: 0 }],
    [AutoScoreTypes.High, { displayText: `高Lv`, ratio: 1.0 }],
    [AutoScoreTypes.Mid, { displayText: `中Lv`, ratio: 0.6 }],
    [AutoScoreTypes.Low, { displayText: `低Lv`, ratio: 0.3 }],
]);
export class BoostItem {
    displayText = ``;
    ratio = 0;
}
/**敵編成のステータス値定義 */
export const BoostMap = new Map([
    [BoostTypes.B100, { displayText: `100`, ratio: 1.0 }],
    [BoostTypes.B125, { displayText: `125`, ratio: 1.25 }],
    [BoostTypes.B150, { displayText: `150`, ratio: 1.5 }],
    [BoostTypes.B200, { displayText: `200`, ratio: 2.0 }],
    [BoostTypes.B300, { displayText: `300`, ratio: 3.0 }],
]);
/**環境設定のURL */
export const EnvUrlTypes = {
    GitHub: "GitHub",
    GitHubLocal: "GitHubLocal",
    Local: "Local",
};
/**環境設定のURL */
export class EnvUrlItem {
    displayText = ``;
    desc = ``;
}
export const EnvUrlMap = new Map([
    [EnvUrlTypes.GitHub, { displayText: `GitHub`, desc: `GitHubの画像を参照` }],
    [EnvUrlTypes.GitHubLocal, { displayText: `GitHub(ローカル)`, desc: `ローカルの画像を参照` }],
    [EnvUrlTypes.Local, { displayText: `ローカル`, desc: `ローカルの画像を参照` }],
]);
/**環境設定の壁紙選択 */
export const EnvWallpaperTypes = {
    WP1: "WP1",
    WP2: "WP2",
    WP3: "WP3",
    WP4: "WP4",
};
/**環境設定の壁紙選択 */
export class EnvWallpaperItem {
    displayText = ``;
    png = ``;
}
export const EnvWallpaperMap = new Map([
    //[EnvWallpaperTypes.WP1, { displayText: `ねこにん`, png: `wallpaper_Copilot_20260622_045726.png` }],
    [EnvWallpaperTypes.WP1, { displayText: `MAGIC`, png: `wallpaper_Gemini_magic.jfif` }],
    [EnvWallpaperTypes.WP2, { displayText: `ねこ`, png: `wallpaper_Gemini_cat.png` }],
    [EnvWallpaperTypes.WP3, { displayText: `にんじん`, png: `wallpaper_Gemini_carot.png` }],
    [EnvWallpaperTypes.WP4, { displayText: `DRAGON`, png: `wallpaper_Gemini_dragon.png` }],
]);
//# sourceMappingURL=CharClass.js.map
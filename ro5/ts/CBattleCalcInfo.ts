
/**
 * 戦闘計算情報クラス.
 */
function CBattleCalcInfo() {

    // スキルID
    // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.skillId = 0;

    // スキルレベル
    // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.skillLv = 0;

    // 発生率
    // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.actRate = 0;

    // 命中率
    // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.hitRate = 0;

    // クリティカル率
    // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.criRate = 0;

    // 武器ATK（右手[最小, 平均, 最大]、左手[最小, 平均, 最大]）
    // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.atkUnitArrayWpn = null;

    // クリティカル武器ATK（右手[最小, 平均, 最大]、左手[最小, 平均, 最大]）
    // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.atkUnitArrayCri = null;

    // ウォーグ武器ATK（単一[最小, 平均, 最大]）
    // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.atkUnitArrayWug = null;

    // 素手ATK
    // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.statusAtk = 0;

    // 修練ATK
    // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.masteryAtk = 0;

    // 修練ATK
    // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.masteryAtkLeft = 0;

    // 親スキルID
    // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.parentSkillId = undefined;

    // オートスペルフラグ
    // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.bAutoSpell = false;

    // ダメージ増幅効果
    // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.dmgAmpRate = 0;



    /**
     * 無名イニシャライザ.
     */
    (function () {

        var zeroUnit = [0, 0, 0];

        // データを初期化
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.skillId = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.skillLv = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.actRate = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.hitRate = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.criRate = 0;

        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.atkUnitArrayWpn = [
            zeroUnit.slice(),
            zeroUnit.slice(),
        ];

        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.atkUnitArrayCri = [
            zeroUnit.slice(),
            zeroUnit.slice(),
        ];

        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.atkUnitArrayWug = [
            zeroUnit.slice(),
        ];

        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.statusAtk = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.masteryAtk = 0;

        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.parentSkillId = undefined;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.bAutoSpell = false;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.dmgAmpRate = 0;

        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    }).call(this);



    /**
     * 複製する.
     * @return 複製されたインスタンス
     */
    // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.Clone = function () {

        var info = null;

        // インスタンス用意
        // @ts-expect-error TS(7009): 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
        info = new CBattleCalcInfo();

        // データ複製
        info.skillId = this.skillId;
        info.skillLv = this.skillLv;
        info.actRate = this.actRate;
        info.hitRate = this.hitRate;
        info.criRate = this.criRate;
        info.atkUnitArrayWpn = JSON.parse(JSON.stringify(this.atkUnitArrayWpn));
        info.atkUnitArrayCri = JSON.parse(JSON.stringify(this.atkUnitArrayCri));
        info.atkUnitArrayWug = JSON.parse(JSON.stringify(this.atkUnitArrayWug));
        info.statusAtk = this.statusAtk;
        info.masteryAtk = this.masteryAtk;
        info.parentSkillId = this.parentSkillId;
        info.bAutoSpell = this.bAutoSpell;
        info.dmgAmpRate = this.dmgAmpRate;

        return info;
    };
}

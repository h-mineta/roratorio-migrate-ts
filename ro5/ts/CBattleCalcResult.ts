import { g_bDefinedDamageIntervals } from "./head";

/**
 * 戦闘結果クラス.
 */
function CBattleCalcResult(this: any) {

    // スキルID
    this.skillId = 0;

    // スキルレベル
    this.skillLv = 0;

    // 変動詠唱時間
    this.castVary = 0;

    // 固定詠唱時間
    this.castFixed = 0;

    // モーションディレイ
    this.delayMotion = 0;

    // スキルディレイ
    this.delaySkill = 0;

    // 強制ディレイ（固有モーション、コンボ待ち受け）
    this.delayForce = 0;

    // 入力限界ディレイ
    this.delayInput = 0;

    // ダメージ間隔
    this.damageInterval = 0;

    // オブジェクト持続時間
    this.objectLifeTime = 0;

    // クールタイム
    this.coolTime = 0;

    // 攻撃間隔
    this.attackInterval = 0;

    // 発生率率
    this.actRate = 0;

    // 命中率
    this.hitRate = 0;

    // 必中効果
    this.perfectRate = 0;

    // クリティカル率
    this.criRate = 0;

    // ヒット数配列
    this.hitCountArray = null;

    // 分割ヒット数配列
    this.dividedHitCountArray = null;

    // ダメージ配列（通常[最小, 平均, 最大]、クリティカル[,,]）
    this.dmgUnitArray = null;

    // 必中のみダメージ（通常、クリティカル）
    this.dmgPerfectArray = null;

    // 親スキルID
    this.parentSkillId = undefined;

    // オートスペルフラグ
    this.bAutoSpell = false;

    // 子要素配列
    this.childResultArray = null;



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
        this.castVary = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.castFixed = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.delayMotion = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.delaySkill = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.delayForce = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.delayInput = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.damageInterval = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.objectLifeTime = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.coolTime = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.attackInterval = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.actRate = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.hitRate = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.perfectRate = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.criRate = 0;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.hitCountArray = [];
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.dividedHitCountArray = [];

        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.dmgUnitArray = [
            zeroUnit.slice(),
            zeroUnit.slice(),
        ];

        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.dmgPerfectArray = [];
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.parentSkillId = undefined;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.bAutoSpell = false;
        // @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        this.childResultArray = [];

    }).call(this);



    /**
     * スキル名の取得.
     * @return スキル名
     */
    this.GetSkillName = function () {

        var nameWork = "";
        var nameText = "";

        // @ts-expect-error TS(7006): Parameter 'nameF' implicitly has an 'any' type.
        var funcAddName = function (nameF) {
            if (nameText.length > 0) {
                nameText += "（" + nameF + "）";
            }
            else {
                nameText += nameF;
            }
        };



        // 親スキル指定がある場合は、親スキルの名称を追加
        if (this.parentSkillId !== undefined) {
            nameText = g_skillManager.GetSkillPlaneName(this.parentSkillId);
        }

        // オートスペルの場合は表記を追加
        if (this.bAutoSpell) {
            funcAddName("オートスペル");
        }

        // スキル本体の名称
        nameWork = g_skillManager.GetSkillPlaneName(this.skillId);
        if (this.bAutoSpell) {
            nameWork += " Lv" + this.skillLv;
        }
        funcAddName(nameWork);



        return nameText;
    };

    /**
     * 子要素を追加する.
     * @param resultChild 子要素
     */
    // @ts-expect-error TS(7006): Parameter 'resultChild' implicitly has an 'any' ty... Remove this comment to see the full error message
    this.AddChild = function (resultChild) {
        this.childResultArray.push(resultChild.Clone());
    };





    /**
     * 概算ダメージ回数の取得.
     * @return 概算ダメージ回数
     */
    this.GetDamageCountSummary = function () {

        if ((this.objectLifeTime > 0) && (this.damageInterval > 0)) {
            //return Math.floor(this.objectLifeTime / this.damageInterval);
            return Math.ceil(this.objectLifeTime / this.damageInterval);
        }

        return "（計算不能）";
    };





    /**
     * （内部）概算ダメージの取得.
     * @param bCollectChild 子要素加算フラグ
     * @return 概算ダメージ（最小）
     */
    // @ts-expect-error TS(7006): Parameter 'idxKind' implicitly has an 'any' type.
    this._GetDamageSummaryKM = function (idxKind, idxMath) {

        var dmg = this.dmgUnitArray[idxKind][idxMath];
        var divHit = this.dividedHitCountArray[idxKind][idxMath];
        var multiHit = this.hitCountArray[idxKind][idxMath];

        if (divHit > 1) {
            dmg /= divHit;
        }
        else {
            divHit = 1;
        }

        if (multiHit > 1) {
        }
        else {
            multiHit = 1;
        }

        return [dmg, divHit, multiHit];
    };

    /**
     * 概算ダメージ（最小）の取得.
     * @param bCollectChild 子要素加算フラグ
     * @return 概算ダメージ（最小）
     */
    // @ts-expect-error TS(7006): Parameter 'bCollectChild' implicitly has an 'any' ... Remove this comment to see the full error message
    this.GetDamageSummaryMin = function (bCollectChild) {

        var idx = 0;
        var ret = null;

        var dmgArray = [this._GetDamageSummaryKM(0, 0)];

        if (bCollectChild) {
            for (idx = 0; idx < this.childResultArray.length; idx++) {
                ret = this.childResultArray[idx].GetDamageSummaryMin(bCollectChild);
                dmgArray = dmgArray.concat(ret);
            }
        }

        return dmgArray;
    };

    /**
     * 概算ダメージ（平均）の取得.
     * @param bCollectChild 子要素加算フラグ
     * @return 概算ダメージ（平均）
     */
    // @ts-expect-error TS(7006): Parameter 'bCollectChild' implicitly has an 'any' ... Remove this comment to see the full error message
    this.GetDamageSummaryAve = function (bCollectChild) {

        var idx = 0;
        var ret = null;

        var dmgArray = [this._GetDamageSummaryKM(0, 1)];

        if (bCollectChild) {
            for (idx = 0; idx < this.childResultArray.length; idx++) {
                ret = this.childResultArray[idx].GetDamageSummaryAve(bCollectChild);
                dmgArray = dmgArray.concat(ret);
            }
        }

        return dmgArray;
    };

    /**
     * 概算ダメージ（最大）の取得.
     * @param bCollectChild 子要素加算フラグ
     * @return 概算ダメージ（最大）
     */
    // @ts-expect-error TS(7006): Parameter 'bCollectChild' implicitly has an 'any' ... Remove this comment to see the full error message
    this.GetDamageSummaryMax = function (bCollectChild) {

        var idx = 0;
        var ret = null;

        var dmgArray = [this._GetDamageSummaryKM(0, 2)];

        if (bCollectChild) {
            for (idx = 0; idx < this.childResultArray.length; idx++) {
                ret = this.childResultArray[idx].GetDamageSummaryMax(bCollectChild);
                dmgArray = dmgArray.concat(ret);
            }
        }

        return dmgArray;
    };

    /**
     * 概算クリティカルダメージ（最小）の取得.
     * @param bCollectChild 子要素加算フラグ
     * @return 概算クリティカルダメージ（最小）
     */
    // @ts-expect-error TS(7006): Parameter 'bCollectChild' implicitly has an 'any' ... Remove this comment to see the full error message
    this.GetDamageSummaryCriMin = function (bCollectChild) {

        var idx = 0;
        var ret = null;

        var dmgArray = [this._GetDamageSummaryKM(1, 0)];

        if (bCollectChild) {
            for (idx = 0; idx < this.childResultArray.length; idx++) {
                ret = this.childResultArray[idx].GetDamageSummaryCriMin(bCollectChild);
                dmgArray = dmgArray.concat(ret);
            }
        }

        return dmgArray;
    };

    /**
     * 概算クリティカルダメージ（平均）の取得.
     * @param bCollectChild 子要素加算フラグ
     * @return 概算クリティカルダメージ（平均）
     */
    // @ts-expect-error TS(7006): Parameter 'bCollectChild' implicitly has an 'any' ... Remove this comment to see the full error message
    this.GetDamageSummaryCriAve = function (bCollectChild) {

        var idx = 0;
        var ret = null;

        var dmgArray = [this._GetDamageSummaryKM(1, 1)];

        if (bCollectChild) {
            for (idx = 0; idx < this.childResultArray.length; idx++) {
                ret = this.childResultArray[idx].GetDamageSummaryCriAve(bCollectChild);
                dmgArray = dmgArray.concat(ret);
            }
        }

        return dmgArray;
    };

    /**
     * 概算クリティカルダメージ（最大）の取得.
     * @param bCollectChild 子要素加算フラグ
     * @return 概算クリティカルダメージ（最大）
     */
    // @ts-expect-error TS(7006): Parameter 'bCollectChild' implicitly has an 'any' ... Remove this comment to see the full error message
    this.GetDamageSummaryCriMax = function (bCollectChild) {

        var idx = 0;
        var ret = null;

        var dmgArray = [this._GetDamageSummaryKM(1, 2)];

        if (bCollectChild) {
            for (idx = 0; idx < this.childResultArray.length; idx++) {
                ret = this.childResultArray[idx].GetDamageSummaryCriMax(bCollectChild);
                dmgArray = dmgArray.concat(ret);
            }
        }

        return dmgArray;
    };

    /**
     * 概算クリティカル率の取得.
     * @return 概算クリティカル率
     */
    this.GetCriRateSummary = function () {
        return this.criRate;
    };



    /**
     * 概算ダメージ（一撃最小）の取得.
     * @param bIgnoreActRate 発生率を無視して計算するフラグ
     * @return 概算ダメージ（最小）
     */
    // @ts-expect-error TS(7006): Parameter 'bCollectChild' implicitly has an 'any' ... Remove this comment to see the full error message
    this.GetDamageSummaryMinPerAtk = function (bCollectChild, bIgnoreActRate) {

        var idx = 0;
        var ret = null;

        var dmg = 0;
        var dmgArray = null;



        // 発生率が 100% 未満の場合、未発生（0 ダメージ）が最小
        if ((!bIgnoreActRate) && (this.actRate < 100)) {
            // 追撃も発生しないので、そのまま return
            return [0];
        }

        // クリティカル率が 100% の場合、クリティカルダメージの最小ダメージを採用
        else if (this.criRate >= 100) {
            dmg = this.dmgUnitArray[1][0] * Math.max(1, this.hitCountArray[1][0]);
        }

        // 上記以外で、命中率が 100% 未満の場合、Miss （0 ダメージ）が最小
        else if (this.hitRate < 100) {
            // 追撃も発生しないので、そのまま return
            return [0];
        }

        // 上記以外の場合、通常ダメージの最小ダメージを採用
        else {
            dmg = this.dmgUnitArray[0][0] * Math.max(1, this.hitCountArray[0][0]);
        }



        // 子要素の、最小ダメージを取得し、加算する
        if (bCollectChild) {
            for (idx = 0; idx < this.childResultArray.length; idx++) {
                // 子要素は発生率を考慮する
                ret = this.childResultArray[idx].GetDamageSummaryMinPerAtk(bCollectChild, false);
                // @ts-expect-error TS(2304): Cannot find name 'GetArrayMin'.
                dmg += GetArrayMin(ret);
            }
        }

        return [dmg];
    };

    /**
     * 概算ダメージ（一撃平均）の取得.
     * @return 概算ダメージ（平均）
     */
    // @ts-expect-error TS(7006): Parameter 'bCollectChild' implicitly has an 'any' ... Remove this comment to see the full error message
    this.GetDamageSummaryAvePerAtk = function (bCollectChild) {

        var idx = 0;
        var ret = null;

        var dmg = 0;
        var dmgArray = null;



        // 通常ダメージ
        dmg += Math.floor(this.dmgUnitArray[0][1] * Math.max(1, this.hitCountArray[0][1]) * (100 - this.criRate) / 100 * this.hitRate / 100);

        // クリティカルダメージ
        dmg += Math.floor(this.dmgUnitArray[1][1] * Math.max(1, this.hitCountArray[1][1]) * this.criRate / 100);

        // 配列に格納
        dmgArray = [dmg];



        // 子要素
        if (bCollectChild) {
            for (idx = 0; idx < this.childResultArray.length; idx++) {
                ret = this.childResultArray[idx].GetDamageSummaryAvePerAtk(bCollectChild);
                dmgArray = dmgArray.concat(ret);
            }
        }

        return dmgArray;
    };

    /**
     * 概算ダメージ（一撃最大）の取得.
     * @return 概算ダメージ（最大）
     */
    // @ts-expect-error TS(7006): Parameter 'bCollectChild' implicitly has an 'any' ... Remove this comment to see the full error message
    this.GetDamageSummaryMaxPerAtk = function (bCollectChild) {

        var idx = 0;
        var ret = null;

        var dmg = 0;
        var dmgArray = null;



        // 全最大ダメージを取得
        dmgArray = [];

        // 通常ダメージ
        dmgArray.push(this.dmgUnitArray[0][2] * Math.max(1, this.hitCountArray[0][2]));

        // クリティカルダメージ
        dmgArray.push(this.dmgUnitArray[1][2] * Math.max(1, this.hitCountArray[1][2]));

        // その中でも最大のダメージを採用する
        // @ts-expect-error TS(2304): Cannot find name 'GetArrayMax'.
        dmg = GetArrayMax(dmgArray);



        // 子要素の、最大ダメージを取得し、加算する
        if (bCollectChild) {
            for (idx = 0; idx < this.childResultArray.length; idx++) {
                ret = this.childResultArray[idx].GetDamageSummaryMaxPerAtk(bCollectChild);
                // @ts-expect-error TS(2304): Cannot find name 'GetArrayMax'.
                dmg += GetArrayMax(ret);
            }
        }

        return [dmg];
    };



    /**
     * 概算ダメージ（秒間最小）の取得.
     * @param bIgnoreActRate 発生率を無視して計算するフラグ
     * @param bCollectChild 子要素を持つ場合 true
     * @return 概算ダメージ（最小）
     */
    // @ts-expect-error TS(7006): Parameter 'castVary' implicitly has an 'any' type.
    this.GetDamageSummaryMinPerSec = function (castVary, castFixed, attackInterval, bCollectChild, bIgnoreActRate) {

        var idx = 0;
        var ret = null;

        var dmg = 0;
        var dmgArray = null;
        var actInterval = 0;

        if (g_bDefinedDamageIntervals && !bCollectChild) {
            // 子要素を持たない設置スキルの場合
            actInterval = attackInterval;
        }
        else {
            // 子要素を持つ設置スキル（アストラルストライクの初撃など）の場合
            // または設置スキルではない場合
            actInterval = castVary + castFixed + attackInterval;
        }

        // 発生率が 100% 未満の場合、未発生（0 ダメージ）が最小
        if ((!bIgnoreActRate) && (this.actRate < 100)) {
            // 追撃も発生しないので、そのまま return
            return [0];
        }

        // クリティカル率が 100% の場合、クリティカルダメージの最小ダメージを採用
        else if (this.criRate >= 100) {
            dmg = Math.floor(this.dmgUnitArray[1][0] * Math.max(1, this.hitCountArray[1][0]) / actInterval);
        }

        // 上記以外で、命中率が 100% 未満の場合、Miss （0 ダメージ）が最小
        else if (this.hitRate < 100) {
            // 追撃も発生しないので、そのまま return
            return [0];
        }

        // 上記以外の場合、通常ダメージの最小ダメージを採用
        else {
            dmg = Math.floor(this.dmgUnitArray[0][0] * Math.max(1, this.hitCountArray[0][0]) / actInterval);
        }

        // 子要素の、最小ダメージを取得し、加算する
        if (bCollectChild) {

            for (idx = 0; idx < this.childResultArray.length; idx++) {
                if (this.childResultArray.length - 1 == idx) {
                    // これ以上の子要素が無い場合
                    bCollectChild = false
                }
                // 子要素は発生率を考慮する
                ret = this.childResultArray[idx].GetDamageSummaryMinPerSec(castVary, castFixed, attackInterval, bCollectChild, false);
                // @ts-expect-error TS(2304): Cannot find name 'GetArrayMin'.
                dmg += GetArrayMin(ret);
            }
        }

        return [dmg];
    };

    /**
     * 概算ダメージ（秒間平均）の取得.
     * @return 概算ダメージ（平均）
     */
    // @ts-expect-error TS(7006): Parameter 'castVary' implicitly has an 'any' type.
    this.GetDamageSummaryAvePerSec = function (castVary, castFixed, attackInterval, bCollectChild) {

        var idx = 0;
        var ret = null;

        var dmg = 0;
        var dmgArray = null;
        var actInterval = 0;

        if (g_bDefinedDamageIntervals && !bCollectChild) {
            // 子要素を持たない設置スキルの場合
            actInterval = attackInterval;
        }
        else {
            // 子要素を持つ設置スキル（アストラルストライクの初撃など）の場合
            // または設置スキルではない場合
            actInterval = castVary + castFixed + attackInterval;
        }

        // 通常ダメージ
        dmg += Math.floor((this.dmgUnitArray[0][1] * Math.max(1, this.hitCountArray[0][1]) / actInterval) * (100 - this.criRate) / 100 * this.hitRate / 100);

        // クリティカルダメージ
        dmg += Math.floor((this.dmgUnitArray[1][1] * Math.max(1, this.hitCountArray[1][1]) / actInterval) * this.criRate / 100);

        // 配列に格納
        dmgArray = [dmg];

        // 子要素
        if (bCollectChild) {
            for (idx = 0; idx < this.childResultArray.length; idx++) {
                if (this.childResultArray.length - 1 == idx) {
                    // これ以上の子要素が無い場合
                    bCollectChild = false
                }
                ret = this.childResultArray[idx].GetDamageSummaryAvePerSec(castVary, castFixed, attackInterval, bCollectChild);
                dmgArray = dmgArray.concat(ret);
            }
        }

        return dmgArray;
    };

    /**
     * 概算ダメージ（秒間最大）の取得.
     * @return 概算ダメージ（最大）
     */
    // @ts-expect-error TS(7006): Parameter 'castVary' implicitly has an 'any' type.
    this.GetDamageSummaryMaxPerSec = function (castVary, castFixed, attackInterval, bCollectChild) {

        var idx = 0;
        var ret = null;

        var dmg = 0;
        var dmgArray = null;
        var actInterval = 0;

        if (g_bDefinedDamageIntervals && !bCollectChild) {
            // 子要素を持たない設置スキルの場合
            actInterval = attackInterval;
        }
        else {
            // 子要素を持つ設置スキル（アストラルストライクの初撃など）の場合
            // または設置スキルではない場合
            actInterval = castVary + castFixed + attackInterval;
        }

        // 全最大ダメージを取得
        dmgArray = [];

        // 通常ダメージ
        dmgArray.push(Math.floor(this.dmgUnitArray[0][2] * Math.max(1, this.hitCountArray[0][2]) / actInterval));

        // クリティカルダメージ
        dmgArray.push(Math.floor(this.dmgUnitArray[1][2] * Math.max(1, this.hitCountArray[1][2]) / actInterval));

        // その中でも最大のダメージを採用する
        // @ts-expect-error TS(2304): Cannot find name 'GetArrayMax'.
        dmg = GetArrayMax(dmgArray);

        // 子要素の、最大ダメージを取得し、加算する
        if (bCollectChild) {
            for (idx = 0; idx < this.childResultArray.length; idx++) {
                if (this.childResultArray.length - 1 == idx) {
                    // これ以上の子要素が無い場合
                    bCollectChild = false
                }
                ret = this.childResultArray[idx].GetDamageSummaryMaxPerSec(castVary, castFixed, attackInterval, bCollectChild);
                // @ts-expect-error TS(2304): Cannot find name 'GetArrayMax'.
                dmg += GetArrayMax(ret);
            }
        }

        return [dmg];
    };





    /**
     * 複製する.
     * @return 複製されたインスタンス
     */
    this.Clone = function () {

        var idx = 0;

        var result = null;

        // インスタンス用意
        // @ts-expect-error TS(7009): 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
        result = new CBattleCalcResult();

        // データ複製
        result.skillId = this.skillId;
        result.skillLv = this.skillLv;
        result.castVary = this.castVary;
        result.castFixed = this.castFixed;
        result.delayMotion = this.delayMotion;
        result.delaySkill = this.delaySkill;
        result.delayForce = this.delayForce;
        result.delayInput = this.delayInput;
        result.damageInterval = this.damageInterval;
        result.objectLifeTime = this.objectLifeTime;
        result.coolTime = this.coolTime;
        result.attackInterval = this.attackInterval;
        result.actRate = this.actRate;
        result.hitRate = this.hitRate;
        result.perfectRate = this.perfectRate;
        result.criRate = this.criRate;
        result.hitCountArray = this.hitCountArray.slice();
        result.dividedHitCountArray = this.dividedHitCountArray.slice();

        result.dmgUnitArray = JSON.parse(JSON.stringify(this.dmgUnitArray));
        result.dmgPerfectArray = this.dmgPerfectArray.slice();
        result.parentSkillId = this.parentSkillId;
        result.bAutoSpell = this.bAutoSpell;

        // 子要素配列
        for (idx = 0; idx < this.childResultArray.length; idx++) {
            result.childResultArray.push(this.childResultArray[idx].Clone());
        }

        return result;
    };
}

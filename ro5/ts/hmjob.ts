// @ts-expect-error TS(2304): Cannot find name 'g_pureStatus'.
g_pureStatus = [];
// @ts-expect-error TS(2304): Cannot find name 'g_bonusStatus'.
g_bonusStatus = [];




// @ts-expect-error TS(7006): Parameter 'jobId' implicitly has an 'any' type.
function RebuildStatusSelect(jobId) {

    var objStr = null;
    var objAgi = null;
    var objVit = null;
    var objInt = null;
    var objDex = null;
    var objLuk = null;

    var stMax = 0;
    var st = 0;

    objStr = document.getElementById("OBJID_SELECT_STATUS_STR");
    objAgi = document.getElementById("OBJID_SELECT_STATUS_AGI");
    objVit = document.getElementById("OBJID_SELECT_STATUS_VIT");
    objInt = document.getElementById("OBJID_SELECT_STATUS_INT");
    objDex = document.getElementById("OBJID_SELECT_STATUS_DEX");
    objLuk = document.getElementById("OBJID_SELECT_STATUS_LUK");

    // @ts-expect-error TS(2304): Cannot find name 'HtmlRemoveOptionAll'.
    HtmlRemoveOptionAll(objStr);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlRemoveOptionAll'.
    HtmlRemoveOptionAll(objAgi);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlRemoveOptionAll'.
    HtmlRemoveOptionAll(objVit);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlRemoveOptionAll'.
    HtmlRemoveOptionAll(objInt);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlRemoveOptionAll'.
    HtmlRemoveOptionAll(objDex);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlRemoveOptionAll'.
    HtmlRemoveOptionAll(objLuk);

    // @ts-expect-error TS(2304): Cannot find name 'n_A_JOB'.
    stMax = GetStatusMax(n_A_JOB, n_A_PassSkill8[13]);

    for (st = 1; st <= stMax; st++) {
        // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElementOption'.
        HtmlCreateElementOption(st, st, objStr);
        // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElementOption'.
        HtmlCreateElementOption(st, st, objAgi);
        // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElementOption'.
        HtmlCreateElementOption(st, st, objVit);
        // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElementOption'.
        HtmlCreateElementOption(st, st, objInt);
        // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElementOption'.
        HtmlCreateElementOption(st, st, objDex);
        // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElementOption'.
        HtmlCreateElementOption(st, st, objLuk);
    }

    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStr.value = 1;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objAgi.value = 1;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objVit.value = 1;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objInt.value = 1;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objDex.value = 1;
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objLuk.value = 1;





    // 特性ステータス仮処理
    var idxObj = 0;
    var objArray = null;

    objArray = [];
    objArray.push(document.getElementById("OBJID_SELECT_STATUS_POW"));
    objArray.push(document.getElementById("OBJID_SELECT_STATUS_STA"));
    objArray.push(document.getElementById("OBJID_SELECT_STATUS_WIS"));
    objArray.push(document.getElementById("OBJID_SELECT_STATUS_SPL"));
    objArray.push(document.getElementById("OBJID_SELECT_STATUS_CON"));
    objArray.push(document.getElementById("OBJID_SELECT_STATUS_CRT"));

    for (idxObj = 0; idxObj < objArray.length; idxObj++) {
        // @ts-expect-error TS(2304): Cannot find name 'HtmlRemoveOptionAll'.
        HtmlRemoveOptionAll(objArray[idxObj]);
    }

    stMax = 100;

    for (st = 0; st <= stMax; st++) {
        for (idxObj = 0; idxObj < objArray.length; idxObj++) {
            // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElementOption'.
            HtmlCreateElementOption(st, st, objArray[idxObj]);
        }
    }

    // 四次職出ない場合は、特性ステータス欄は非表示
    var dispStyle = "";
    if (GetBaseLevelMin(jobId) < 200) {
        dispStyle = "none";
    }
    else {
        dispStyle = "table";
    }
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    document.getElementById("OBJID_TABLE_SPEC_STATUS").style.display = dispStyle;

}



/**
 * ステータスポイントを計算する
 * @param bIgnoreAutoCalc 自動計算回避フラグ
 */
// @ts-expect-error TS(7006): Parameter 'bIgnoreAutoCalc' implicitly has an 'any... Remove this comment to see the full error message
function CalcStatusPoint(bIgnoreAutoCalc) {

    // @ts-expect-error TS(1101): 'with' statements are not allowed in strict mode.
    with (document.calcForm) {
        // ベースレベルの自動計算チェックボックスの状態を取得
        if (BLVauto.checked == 0) {
            bIgnoreAutoCalc = true;
        }

        // 職業ＩＤを取得する
        var jobId = eval(A_JOB.value);

        // ベースレベルを取得する
        var blvSelected = eval(A_BaseLV.value);

        // ステータス値を取得する
        var stValSTR = eval(A_STR.value);
        var stValAGI = eval(A_AGI.value);
        var stValVIT = eval(A_VIT.value);
        var stValINT = eval(A_INT.value);
        var stValDEX = eval(A_DEX.value);
        var stValLUK = eval(A_LUK.value);

        // 特性ステータス値を取得する
        var stValPOW = eval(A_POW.value);
        var stValSTA = eval(A_STA.value);
        var stValWIS = eval(A_WIS.value);
        var stValSPL = eval(A_SPL.value);
        var stValCON = eval(A_CON.value);
        var stValCRT = eval(A_CRT.value);
    }

    // 消費ステータスポイントを計算する
    var stPointUsed = 0;
    stPointUsed += GetStatusTotalCost(stValSTR);
    stPointUsed += GetStatusTotalCost(stValAGI);
    stPointUsed += GetStatusTotalCost(stValVIT);
    stPointUsed += GetStatusTotalCost(stValINT);
    stPointUsed += GetStatusTotalCost(stValDEX);
    stPointUsed += GetStatusTotalCost(stValLUK);

    // 消費特性ステータスポイントを計算する
    var stTSPointUsed = 0;
    stTSPointUsed += stValPOW;
    stTSPointUsed += stValSTA;
    stTSPointUsed += stValWIS;
    stTSPointUsed += stValSPL;
    stTSPointUsed += stValCON;
    stTSPointUsed += stValCRT;

    // 職業の基本情報を設定する
    // @ts-expect-error TS(2304): Cannot find name 'InitJobInfo'.
    InitJobInfo();

    // ベースレベル情報の取得
    var blvMin = GetBaseLevelMin(jobId);
    var blvMax = GetBaseLevelMax(jobId);

    // 初期ステータスポイントの決定
    var stPointEarned = 48;
    // @ts-expect-error TS(2304): Cannot find name 'n_A_PassSkill8'.
    if (IsReincarnatedJob(jobId) && n_A_PassSkill8[13] == 0) {
        stPointEarned = 100;
    }

    // 初期特性ステータスポイントの決定
    var stTSPointEarned = 7;

    // レベルの自動計算をしない場合
    if (bIgnoreAutoCalc) {
        for (var blv = 1; blv <= blvSelected; blv++) {
            stPointEarned += GetEarningStatusPoint(blv);
        }
    }
    // レベルの自動計算をする場合
    else {
        // 最低レベルまでは強制的に上げる
        for (blv = 1; blv <= blvMin; blv++) {
            stPointEarned += GetEarningStatusPoint(blv);
        }
        // ４次職の場合
        if (IsYojiJob(jobId)) {
            // 獲得した特性ステータスポイントが消費ステータスポイント未満の間
            // かつ、最大レベル以下の間、レベルを上げる
            for (blv; (stTSPointEarned < stTSPointUsed) && (blv <= blvMax); blv++) {
                stTSPointEarned = GetEarningTSStatusPoint(blv);
            }
        }
        // ４次職ではない場合
        else {
            // 獲得ステータスポイントが、消費ステータスポイント未満の間
            // かつ、最大レベル以下の間、レベルを上げる
            for (blv; (stPointEarned < stPointUsed) && (blv <= blvMax); blv++) {
                stPointEarned += GetEarningStatusPoint(blv);
            }
        }
        // ベースレベルの値を設定する
        // @ts-expect-error TS(2339): Property 'calcForm' does not exist on type 'Docume... Remove this comment to see the full error message
        document.calcForm.A_BaseLV.value = blv - 1;
    }

    // @ts-expect-error TS(2304): Cannot find name 'myInnerHtml'.
    myInnerHtml("A_STPOINT", stPointEarned - stPointUsed, 0);
    // @ts-expect-error TS(2304): Cannot find name 'myInnerHtml'.
    myInnerHtml("OBJID_SPAN_STATUS_T_STATUS_POINT", stTSPointEarned - stTSPointUsed, 0);

    // 特性ステータス仮処理
    // とりあえず、グローバル空間を汚す
    // @ts-expect-error TS(2304): Cannot find name 'g_pureStatus'.
    g_pureStatus = [];
    // @ts-expect-error TS(2304): Cannot find name 'g_pureStatus'.
    g_pureStatus[MIG_PARAM_ID_POW] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_POW", 0);
    // @ts-expect-error TS(2304): Cannot find name 'g_pureStatus'.
    g_pureStatus[MIG_PARAM_ID_STA] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_STA", 0);
    // @ts-expect-error TS(2304): Cannot find name 'g_pureStatus'.
    g_pureStatus[MIG_PARAM_ID_WIS] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_WIS", 0);
    // @ts-expect-error TS(2304): Cannot find name 'g_pureStatus'.
    g_pureStatus[MIG_PARAM_ID_SPL] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_SPL", 0);
    // @ts-expect-error TS(2304): Cannot find name 'g_pureStatus'.
    g_pureStatus[MIG_PARAM_ID_CON] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_CON", 0);
    // @ts-expect-error TS(2304): Cannot find name 'g_pureStatus'.
    g_pureStatus[MIG_PARAM_ID_CRT] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_CRT", 0);
}



/**
 * 指定のステータス値に上げるために必要なコストを取得する.
 * @param statusValue ステータス値
 * @return 必要コスト
 */
// @ts-expect-error TS(7006): Parameter 'statusValue' implicitly has an 'any' ty... Remove this comment to see the full error message
function GetStatusIncrementCost(statusValue) {
    if (statusValue <= 100) return Math.floor((statusValue - 2) / 10) + 2;
    if (statusValue <= 105) return 16;
    if (statusValue <= 110) return 20;
    if (statusValue <= 115) return 24;
    if (statusValue <= 120) return 28;
    if (statusValue <= 125) return 32;
    if (statusValue <= 130) return 36;
}

/**
 * 指定のステータス値に上げるために必要なコストの総和を取得する.
 * @param statusValue ステータス値
 * @return 必要コストの相和
 */
// @ts-expect-error TS(7006): Parameter 'statusValue' implicitly has an 'any' ty... Remove this comment to see the full error message
function GetStatusTotalCost(statusValue) {

    var statusPoint = 0;

    // ２から指定の値まで、コストを合算（１は初期値なので不要）
    for (var stVal = 2; stVal <= statusValue; stVal++) {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        statusPoint += GetStatusIncrementCost(stVal);
    }

    return statusPoint;
}

/**
 * 指定のレベルで獲得するステータスポイントを取得する.
 * @param baseLevel ベースレベル
 * @return 獲得ステー足すポイント
 */
// @ts-expect-error TS(7006): Parameter 'baseLevel' implicitly has an 'any' type... Remove this comment to see the full error message
function GetEarningStatusPoint(baseLevel) {

    if (baseLevel <= 1) {
        return 0;
    }

    if (baseLevel <= 100) {
        return Math.floor((baseLevel - 1) / 5) + 3;
    }

    if (baseLevel <= 150) {
        return Math.floor((baseLevel - 101) / 10) + 23;
    }

    if (baseLevel <= 157) {
        return 28;
    }

    if (baseLevel <= 164) {
        return 29;
    }

    if (baseLevel <= 171) {
        return 30;
    }

    if (baseLevel <= 178) {
        return 31;
    }

    if (baseLevel <= 185) {
        return 32;
    }

    if (baseLevel <= 192) {
        return 33;
    }

    if (baseLevel <= 199) {
        return 34;
    }

    if (baseLevel <= 200) {
        return 35;
    }

    return 0;

}



/**
 * ステータス補正を画面出力する.
 */
// @ts-expect-error TS(7006): Parameter 'baseLv' implicitly has an 'any' type.
function DisplayStatusBonusAll(baseLv, valSTR, valAGI, valVIT, valINT, valDEX, valLUK, valPOW, valSTA, valWIS, valSPL, valCON, valCRT) {

    var valWork = 0;
    var objStatus = null;

    // STR
    objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_STR");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = ((valSTR >= 0) ? "+" : "") + valSTR;

    // AGI
    objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_AGI");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = ((valAGI >= 0) ? "+" : "") + valAGI;

    // VIT
    objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_VIT");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = ((valVIT >= 0) ? "+" : "") + valVIT;

    // INT
    objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_INT");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = ((valINT >= 0) ? "+" : "") + valINT;

    // DEX
    objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_DEX");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = ((valDEX >= 0) ? "+" : "") + valDEX;

    // LUK
    objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_LUK");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = ((valLUK >= 0) ? "+" : "") + valLUK;



    // 特性ステータス対応

    // POW
    objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_POW");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = ((valPOW >= 0) ? "+" : "") + valPOW;

    // STA
    objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_STA");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = ((valSTA >= 0) ? "+" : "") + valSTA;

    // WIS
    objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_WIS");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = ((valWIS >= 0) ? "+" : "") + valWIS;

    // SPL
    objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_SPL");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = ((valSPL >= 0) ? "+" : "") + valSPL;

    // CON
    objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_CON");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = ((valCON >= 0) ? "+" : "") + valCON;

    // CRT
    objStatus = document.getElementById("OBJID_SPAN_STATUS_BONUS_CRT");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = ((valCRT >= 0) ? "+" : "") + valCRT;



    // 導出ステータス
    // ＋の場合、符号はつけない

    // T.Status Point
    valWork = GetTStatusPoint(baseLv);
    objStatus = document.getElementById("OBJID_SPAN_STATUS_T_STATUS_POINT");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = "" + valWork;
}



/**
 * 導出ステータスを画面出力する.
 */
function DisplayReferStatusAll() {

    var valWork = 0;
    var objStatus = null;

    // 導出ステータス
    // ＋の場合、符号はつけない

    // P.Atk
    valWork = GetPAtk();
    objStatus = document.getElementById("OBJID_SPAN_STATUS_P_ATK");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = "" + valWork;

    // S.Matk
    valWork = GetSMatk();
    objStatus = document.getElementById("OBJID_SPAN_STATUS_S_MATK");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = "" + valWork;

    // C.Rate
    valWork = GetCRate();
    objStatus = document.getElementById("OBJID_SPAN_STATUS_C_RATE");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = "" + valWork;

    // Res
    valWork = GetRes();
    objStatus = document.getElementById("OBJID_SPAN_STATUS_RES");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = "" + valWork;

    // Mres
    valWork = GetMres();
    objStatus = document.getElementById("OBJID_SPAN_STATUS_MRES");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = "" + valWork;

    // H.Plus
    valWork = GetHPlus();
    objStatus = document.getElementById("OBJID_SPAN_STATUS_H_PLUS");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objStatus.innerHTML = "" + valWork;
}



/**
 * 純粋な基本ステータスの全合計を取得する.
 * @reutnr 純粋な基本ステータスの全合計
 */
function GetTotalPureBasicStatus() {
    // @ts-expect-error TS(2304): Cannot find name 'SU_STR'.
    return (SU_STR + SU_AGI + SU_VIT + SU_DEX + SU_INT + SU_LUK);
}





//================================================================================================================================
//
// 特性ステータス系
//
//================================================================================================================================

// @ts-expect-error TS(7006): Parameter 'valPOW' implicitly has an 'any' type.
function StoreSpecStatusBonusAll(valPOW, valSTA, valWIS, valSPL, valCON, valCRT) {

    var value = 0;

    // とりあえず、グローバル空間を汚す
    // @ts-expect-error TS(2304): Cannot find name 'g_bonusStatus'.
    g_bonusStatus = [];
    // @ts-expect-error TS(2304): Cannot find name 'g_bonusStatus'.
    g_bonusStatus[MIG_PARAM_ID_POW] = valPOW;
    // @ts-expect-error TS(2304): Cannot find name 'g_bonusStatus'.
    g_bonusStatus[MIG_PARAM_ID_STA] = valSTA;
    // @ts-expect-error TS(2304): Cannot find name 'g_bonusStatus'.
    g_bonusStatus[MIG_PARAM_ID_WIS] = valWIS;
    // @ts-expect-error TS(2304): Cannot find name 'g_bonusStatus'.
    g_bonusStatus[MIG_PARAM_ID_SPL] = valSPL;
    // @ts-expect-error TS(2304): Cannot find name 'g_bonusStatus'.
    g_bonusStatus[MIG_PARAM_ID_CON] = valCON;
    // @ts-expect-error TS(2304): Cannot find name 'g_bonusStatus'.
    g_bonusStatus[MIG_PARAM_ID_CRT] = valCRT;

    return [
        // @ts-expect-error TS(2304): Cannot find name 'g_bonusStatus'.
        g_bonusStatus[MIG_PARAM_ID_POW],
        // @ts-expect-error TS(2304): Cannot find name 'g_bonusStatus'.
        g_bonusStatus[MIG_PARAM_ID_STA],
        // @ts-expect-error TS(2304): Cannot find name 'g_bonusStatus'.
        g_bonusStatus[MIG_PARAM_ID_WIS],
        // @ts-expect-error TS(2304): Cannot find name 'g_bonusStatus'.
        g_bonusStatus[MIG_PARAM_ID_SPL],
        // @ts-expect-error TS(2304): Cannot find name 'g_bonusStatus'.
        g_bonusStatus[MIG_PARAM_ID_CON],
        // @ts-expect-error TS(2304): Cannot find name 'g_bonusStatus'.
        g_bonusStatus[MIG_PARAM_ID_CRT],
    ];
}

/**
 * 特性ステータスの基本＋ボーナスの合計値を取得する
 * @param {*} paramId MIG_PARAM_ID_{POW|STA|WIS|SPL|CON|CRT}
 * @returns
 */
// @ts-expect-error TS(7006): Parameter 'paramId' implicitly has an 'any' type.
function GetTotalSpecStatus(paramId) {

    var value = 0;

    // 基礎値
    switch (paramId) {
        // @ts-expect-error TS(2304): Cannot find name 'MIG_PARAM_ID_POW'.
        case MIG_PARAM_ID_POW:
        // @ts-expect-error TS(2304): Cannot find name 'MIG_PARAM_ID_STA'.
        case MIG_PARAM_ID_STA:
        // @ts-expect-error TS(2304): Cannot find name 'MIG_PARAM_ID_WIS'.
        case MIG_PARAM_ID_WIS:
        // @ts-expect-error TS(2304): Cannot find name 'MIG_PARAM_ID_SPL'.
        case MIG_PARAM_ID_SPL:
        // @ts-expect-error TS(2304): Cannot find name 'MIG_PARAM_ID_CON'.
        case MIG_PARAM_ID_CON:
        // @ts-expect-error TS(2304): Cannot find name 'MIG_PARAM_ID_CRT'.
        case MIG_PARAM_ID_CRT:
            // @ts-expect-error TS(2304): Cannot find name 'g_pureStatus'.
            value += g_pureStatus[paramId] + g_bonusStatus[paramId];
    }

    return value;
}

/**
 * 指定のレベルで獲得する特性ステータスポイントを取得する.
 * @param baseLevel ベースレベル
 * @return 獲得ステータスポイント
 */
// @ts-expect-error TS(7006): Parameter 'baseLv' implicitly has an 'any' type.
function GetEarningTSStatusPoint(baseLv) {
    var stPoint = 0;
    if (baseLv < 200) {
        return 0;
    }
    // 全所持ポイントを計算
    stPoint = 3 * (1 + (baseLv - 200));
    stPoint += 4 * (1 + Math.floor((baseLv - 200) / 5));
    return stPoint;
}

// @ts-expect-error TS(7006): Parameter 'baseLv' implicitly has an 'any' type.
function GetTStatusPoint(baseLv) {
    // @ts-expect-error TS(2304): Cannot find name 'stPoint'.
    stPoint = GetEarningTSStatusPoint(baseLv);
    // 消費ポイントを計算
    // @ts-expect-error TS(2304): Cannot find name 'stPoint'.
    stPoint -= g_pureStatus[MIG_PARAM_ID_POW];
    // @ts-expect-error TS(2304): Cannot find name 'stPoint'.
    stPoint -= g_pureStatus[MIG_PARAM_ID_STA];
    // @ts-expect-error TS(2304): Cannot find name 'stPoint'.
    stPoint -= g_pureStatus[MIG_PARAM_ID_WIS];
    // @ts-expect-error TS(2304): Cannot find name 'stPoint'.
    stPoint -= g_pureStatus[MIG_PARAM_ID_SPL];
    // @ts-expect-error TS(2304): Cannot find name 'stPoint'.
    stPoint -= g_pureStatus[MIG_PARAM_ID_CON];
    // @ts-expect-error TS(2304): Cannot find name 'stPoint'.
    stPoint -= g_pureStatus[MIG_PARAM_ID_CRT];

    // @ts-expect-error TS(2304): Cannot find name 'stPoint'.
    return stPoint;
}



/**
 * 四次特性ステータス適用関数.
 */
// @ts-expect-error TS(7006): Parameter 'charaData' implicitly has an 'any' type... Remove this comment to see the full error message
function ApplySpecStatusModifications(charaData, n_tok) {
    // @ts-expect-error TS(2304): Cannot find name 'CHARA_DATA_INDEX_STATUS_ATK'.
    charaData[CHARA_DATA_INDEX_STATUS_ATK] += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);

    // @ts-expect-error TS(2304): Cannot find name 'CHARA_DATA_INDEX_HIT'.
    charaData[CHARA_DATA_INDEX_HIT] += 2 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
    // @ts-expect-error TS(2304): Cannot find name 'CHARA_DATA_INDEX_FLEE'.
    charaData[CHARA_DATA_INDEX_FLEE] += 2 * GetTotalSpecStatus(MIG_PARAM_ID_CON);
}

// 元の処理の構造上、同時に処理できないもの
// @ts-expect-error TS(7006): Parameter 'charaData' implicitly has an 'any' type... Remove this comment to see the full error message
function ApplySpecStatusModifyMATK(charaData, n_tok) {
    // @ts-expect-error TS(2304): Cannot find name 'CHARA_DATA_INDEX_STATUS_MATK'.
    charaData[CHARA_DATA_INDEX_STATUS_MATK] += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
}





function GetPAtk() {

    var value = 0;
    var sklLv = 0;
    var bufLv = 0;
    var valWork = 0;

    // ステータス値
    // @ts-expect-error TS(2304): Cannot find name 'MIG_PARAM_ID_POW'.
    value += Math.floor(GetTotalSpecStatus(MIG_PARAM_ID_POW) / 3);
    // @ts-expect-error TS(2304): Cannot find name 'MIG_PARAM_ID_CON'.
    value += Math.floor(GetTotalSpecStatus(MIG_PARAM_ID_CON) / 5);

    // 装備効果
    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_P_ATK_PLUS'.
    value += n_tok[ITEM_SP_P_ATK_PLUS];
    // @ts-expect-error TS(2304): Cannot find name 'GetEquippedTotalSPEquip'.
    value += GetEquippedTotalSPEquip(ITEM_SP_P_ATK_PLUS);
    // @ts-expect-error TS(2304): Cannot find name 'GetEquippedTotalSPCardAndElse'.
    value += GetEquippedTotalSPCardAndElse(ITEM_SP_P_ATK_PLUS);
    // @ts-expect-error TS(2304): Cannot find name 'GetRndOptTotalValue'.
    value += GetRndOptTotalValue(ITEM_SP_P_ATK_PLUS);

    // 性能カスタマイズ
    // @ts-expect-error TS(2304): Cannot find name 'g_objCharaConfCustomSpecStatus'.
    value += g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_P_ATK_PLUS)

    // 「インペリアルガード」スキル「アタックスタンス」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_ATTACK_STANCE'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_ATTACK_STANCE)) > 0) {

        // 盾装備時限定
        // @ts-expect-error TS(2304): Cannot find name 'n_A_Equip'.
        if (n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {
            value += [0, 1, 3, 5, 10, 15][sklLv];
        }
    }

    // 「アビスチェイサー」スキル「アビススレイヤー」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_ABYSS_SLAYER'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_ABYSS_SLAYER)) > 0) {
        value += 2 * sklLv;
    }

    // 「インクイジター」スキル「強靭な信念」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_KYOZINNA_SHINNEN'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_KYOZINNA_SHINNEN)) > 0) {
        value += [0, 1, 3, 5, 10, 15][sklLv];
    }

    // 「トルバドゥール／トルヴェール」スキル「ステージマナー」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_STAGE_MANNER'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_STAGE_MANNER)) > 0) {

        // 弓・楽器・鞭装備時装備時限定
        // @ts-expect-error TS(2304): Cannot find name 'n_A_WeaponType'.
        switch (n_A_WeaponType) {
            // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_BOW'.
            case ITEM_KIND_BOW:
            // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_MUSICAL'.
            case ITEM_KIND_MUSICAL:
            // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_WHIP'.
            case ITEM_KIND_WHIP:
                value += [0, 1, 3, 5, 10, 15][sklLv];
                break;
        }
    }

    // 「天帝」スキル「兵法修練」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_HYOHO_SHUREN'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_HYOHO_SHUREN)) > 0) {
        value += (1 * Math.min(5, sklLv)) + (2 * Math.min(5, Math.max(0, sklLv - 5)));
    }

    // 四次職支援「コンペテンティア」による効果
    // SKILL_ID_CONPETENTIA
    // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
    if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_CONPETENTIA]) > 0) {
        value += 20 + 2 * bufLv;
    }

    // 四次職支援「プロンテラマーチ」による効果
    // 「自身の周辺31 x 31セルにトルバドゥールかトルヴェールの異性のパーティーメンバーがいる場合、P.Atk増加量が 1.5倍になる」効果は未実装
    // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
    if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_PRONTERA_MARCH]) > 0) {
        const values = [0, 1, 3, 5, 8, 12];
        if (bufLv < values.length) {
            value += values[bufLv];
        }
    }

    // 四次職支援「武士符」による効果
    // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
    if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_BUSHI_FU]) > 0) {
        value += 2 * bufLv;
    }

    // 「スピリットハンドラー」スキル「スピリットマスタリー」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_SPIRIT_MASTERY'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY)) > 0) {
        value += [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 15][sklLv];
    }

    // 「スピリットハンドラー」スキル「三霊一体」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_SANREI_ITTAI'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_SANREI_ITTAI)) > 0) {
        value += 3 * sklLv;
    }

    // 「スピリットハンドラー」スキル「にゃんブレッシング」による効果
    // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
    if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_NYAN_BRESSING]) > 0) {
        value += 5 * bufLv;
    }

    // 「ハイパーノービス」スキル「独学 -戦闘学-」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_DOKUGAKU_SENTOGAKU'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_DOKUGAKU_SENTOGAKU)) > 0) {
        value += [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 15][sklLv];
    }

    // 「ナイトウォッチ」スキル「P.F.I」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_PFI'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_PFI)) > 0) {
        // 銃装備時のみ
        // @ts-expect-error TS(2304): Cannot find name 'n_A_WeaponType'.
        switch (n_A_WeaponType) {
            // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_HANDGUN'.
            case ITEM_KIND_HANDGUN:
            // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_RIFLE'.
            case ITEM_KIND_RIFLE:
            // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_SHOTGUN'.
            case ITEM_KIND_SHOTGUN:
            // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_GATLINGGUN'.
            case ITEM_KIND_GATLINGGUN:
            // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_GRENADEGUN'.
            case ITEM_KIND_GRENADEGUN:
                value += sklLv;
                break;
        }
    }

    // 「ナイトウォッチ」スキル「ヒドゥンカード」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_HIDDEN_CARD'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_HIDDEN_CARD)) > 0) {
        value += sklLv + 5;
    }

    return value;
}

function GetSMatk() {

    var value = 0;
    var sklLv = 0;
    var bufLv = 0;
    var valWork = 0;

    // ステータス値
    // @ts-expect-error TS(2304): Cannot find name 'MIG_PARAM_ID_SPL'.
    value += Math.floor(GetTotalSpecStatus(MIG_PARAM_ID_SPL) / 3);
    // @ts-expect-error TS(2304): Cannot find name 'MIG_PARAM_ID_CON'.
    value += Math.floor(GetTotalSpecStatus(MIG_PARAM_ID_CON) / 5);

    // 装備効果
    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_S_MATK_PLUS'.
    value += n_tok[ITEM_SP_S_MATK_PLUS];
    // @ts-expect-error TS(2304): Cannot find name 'GetEquippedTotalSPEquip'.
    value += GetEquippedTotalSPEquip(ITEM_SP_S_MATK_PLUS);
    // @ts-expect-error TS(2304): Cannot find name 'GetEquippedTotalSPCardAndElse'.
    value += GetEquippedTotalSPCardAndElse(ITEM_SP_S_MATK_PLUS);
    // @ts-expect-error TS(2304): Cannot find name 'GetRndOptTotalValue'.
    value += GetRndOptTotalValue(ITEM_SP_S_MATK_PLUS);

    // 性能カスタマイズ
    // @ts-expect-error TS(2304): Cannot find name 'g_objCharaConfCustomSpecStatus'.
    value += g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_S_MATK_PLUS)

    // アークメイジスキル「両手杖修練」
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_RYOTETUSE_SHUREN'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_RYOTETUSE_SHUREN)) > 0) {

        // 両手杖時限定
        // @ts-expect-error TS(2304): Cannot find name 'n_A_WeaponType'.
        if (n_A_WeaponType == ITEM_KIND_STUFF) {
            // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_STUFF2HAND'.
            if (n_tok[ITEM_SP_STUFF2HAND]) {

                valWork = 2 * sklLv - 1;

                if (sklLv >= 4) {
                    valWork += 1 * (sklLv - 3);
                }
                if (sklLv >= 8) {
                    valWork += 1 * (sklLv - 7);
                }
                if (sklLv >= 10) {
                    valWork += 1 * (sklLv - 9);
                }

                value += valWork;
            }
        }
    }

    // 「インペリアルガード」スキル「アタックスタンス」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_ATTACK_STANCE'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_ATTACK_STANCE)) > 0) {

        // 盾装備時限定
        // @ts-expect-error TS(2304): Cannot find name 'n_A_Equip'.
        if (n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {
            value += [0, 1, 3, 5, 10, 15][sklLv];
        }
    }

    // 「アビスチェイサー」スキル「アビススレイヤー」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_ABYSS_SLAYER'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_ABYSS_SLAYER)) > 0) {
        value += 2 * sklLv;
    }

    // 「トルバドゥール／トルヴェール」スキル「ステージマナー」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_STAGE_MANNER'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_STAGE_MANNER)) > 0) {

        // 弓・楽器・鞭装備時装備時限定
        // @ts-expect-error TS(2304): Cannot find name 'n_A_WeaponType'.
        switch (n_A_WeaponType) {
            // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_BOW'.
            case ITEM_KIND_BOW:
            // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_MUSICAL'.
            case ITEM_KIND_MUSICAL:
            // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_WHIP'.
            case ITEM_KIND_WHIP:
                value += [0, 1, 3, 5, 10, 15][sklLv];
                break;
        }
    }

    // 「ソウルアセティック」スキル「護符修練」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_GOFU_SHUREN'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_GOFU_SHUREN)) > 0) {
        value += 1 * sklLv;
    }

    // 「ソウルアセティック」スキル「四方五行陣状態」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_SHIHO_FU_ZYOTAI'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_SHIHO_FU_ZYOTAI)) >= 5) {
        value += 2 * (sklLv - 4);
    }

    // 四次職支援「コンペテンティア」による効果
    // SKILL_ID_CONPETENTIA
    // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
    if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_CONPETENTIA]) > 0) {
        value += 20 + 2 * bufLv;
    }

    // 四次職支援「スペルエンチャンティング」による効果
    // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
    if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_SPELL_ENCHANTING]) > 0) {
        value += 5 * bufLv;
    }

    // 四次職支援「夕焼けのセレナーデ」による効果
    // 「自身の周辺31 x 31セルにトルバドゥールかトルヴェールの異性のパーティーメンバーがいる場合、S.Matk増加量が 1.5倍になる」効果は未実装
    // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
    if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_YUYAKENO_SERENADE]) > 0) {
        const values = [0, 1, 3, 5, 8, 12];
        if (bufLv < values.length) {
            value += values[bufLv];
        }
    }

    // 四次職支援「法師符」による効果
    // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
    if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_HOSHI_FU]) > 0) {
        value += 2 * bufLv;
    }

    // 「スピリットハンドラー」スキル「スピリットマスタリー」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_SPIRIT_MASTERY'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY)) > 0) {
        value += [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 15][sklLv];
    }

    // 「スピリットハンドラー」スキル「三霊一体」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_SANREI_ITTAI'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_SANREI_ITTAI)) > 0) {
        value += 3 * sklLv;
    }

    // 「スピリットハンドラー」スキル「にゃんブレッシング」による効果
    // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
    if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_NYAN_BRESSING]) > 0) {
        value += 5 * bufLv;
    }

    // 「ハイパーノービス」スキル「独学 -魔導学-」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_DOKUGAKU_MADOGAKU'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_DOKUGAKU_MADOGAKU)) > 0) {
        value += [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 15][sklLv];
    }


    return value;
}

function GetCRate() {

    var value = 0;
    var bufLv = 0;



    // ステータス値
    // @ts-expect-error TS(2304): Cannot find name 'MIG_PARAM_ID_CRT'.
    value += Math.floor(GetTotalSpecStatus(MIG_PARAM_ID_CRT) / 3);

    // 装備効果
    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_C_RATE_PLUS'.
    value += n_tok[ITEM_SP_C_RATE_PLUS];
    // @ts-expect-error TS(2304): Cannot find name 'GetEquippedTotalSPEquip'.
    value += GetEquippedTotalSPEquip(ITEM_SP_C_RATE_PLUS);
    // @ts-expect-error TS(2304): Cannot find name 'GetEquippedTotalSPCardAndElse'.
    value += GetEquippedTotalSPCardAndElse(ITEM_SP_C_RATE_PLUS);
    // @ts-expect-error TS(2304): Cannot find name 'GetRndOptTotalValue'.
    value += GetRndOptTotalValue(ITEM_SP_C_RATE_PLUS);

    // 性能カスタマイズ
    // @ts-expect-error TS(2304): Cannot find name 'g_objCharaConfCustomSpecStatus'.
    value += g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_C_RATE_PLUS)

    // 四次職支援「プレセンスアキエース」による効果
    // SKILL_ID_PRESENSE_AKYACE
    // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
    if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_PRESENSE_AKYACE]) > 0) {
        value += 5 * bufLv;
    }



    return value;
}

function GetRes() {

    var value = 0;
    var sklLv = 0;
    var bufLv = 0;
    var valWork = 0;



    // ステータス値
    // @ts-expect-error TS(2304): Cannot find name 'MIG_PARAM_ID_STA'.
    value += GetTotalSpecStatus(MIG_PARAM_ID_STA);
    // @ts-expect-error TS(2304): Cannot find name 'MIG_PARAM_ID_STA'.
    value += 5 * Math.floor(GetTotalSpecStatus(MIG_PARAM_ID_STA) / 3);

    // 装備効果
    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_RES_PLUS'.
    value += n_tok[ITEM_SP_RES_PLUS];
    // @ts-expect-error TS(2304): Cannot find name 'GetRndOptTotalValue'.
    value += GetRndOptTotalValue(ITEM_SP_RES_PLUS);

    // 性能カスタマイズ
    // @ts-expect-error TS(2304): Cannot find name 'g_objCharaConfCustomSpecStatus'.
    value += g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_RES_PLUS)

    // 「インペリアルガード」スキル「盾修練」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_TATE_SHUREN'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_TATE_SHUREN)) > 0) {

        // 盾装備時限定
        // @ts-expect-error TS(2304): Cannot find name 'n_A_Equip'.
        if (n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {
            value += 10 * sklLv;
        }
    }

    // 「インクイジター」スキル「堅固な信念」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_KENKONA_SHINNEN'.
    if ((sklLv = UsedSkillSearch(SKILL_ID_KENKONA_SHINNEN)) > 0) {
        value += [0, 10, 20, 40, 70, 100][sklLv];
    }

    // 四次職支援「防御装置有効化」による効果
    // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
    if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_BOGYO_SOCHI_YUKOKA]) > 0) {
        value += [0, 20, 30, 40, 60, 100][bufLv];
    }

    // 四次職支援「ミュージカルインタールード」による効果
    // 「自身の周辺31 x 31セルにトルバドゥールかトルヴェールの異性のパーティーメンバーがいる場合、Res増加量が 1.5倍になる」効果は未実装
    // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
    if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_MUSICAL_INTERLUDE]) > 0) {
        const values = [0, 20, 30, 40, 60, 100];
        if (bufLv < values.length) {
            value += values[bufLv];
        }
    }



    return value;
}

function GetMres() {

    var value = 0;



    // ステータス値
    // @ts-expect-error TS(2304): Cannot find name 'MIG_PARAM_ID_WIS'.
    value += GetTotalSpecStatus(MIG_PARAM_ID_WIS);
    // @ts-expect-error TS(2304): Cannot find name 'MIG_PARAM_ID_WIS'.
    value += 5 * Math.floor(GetTotalSpecStatus(MIG_PARAM_ID_WIS) / 3);

    // 装備効果
    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MRES_PLUS'.
    value += n_tok[ITEM_SP_MRES_PLUS];
    // @ts-expect-error TS(2304): Cannot find name 'GetRndOptTotalValue'.
    value += GetRndOptTotalValue(ITEM_SP_MRES_PLUS);

    // 性能カスタマイズ
    // @ts-expect-error TS(2304): Cannot find name 'g_objCharaConfCustomSpecStatus'.
    value += g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_MRES_PLUS)


    return value;
}



function GetHPlus() {

    var value = 0;



    // ステータス値
    // @ts-expect-error TS(2304): Cannot find name 'MIG_PARAM_ID_CRT'.
    value += GetTotalSpecStatus(MIG_PARAM_ID_CRT);

    // 装備効果
    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_H_PLUS_PLUS'.
    value += n_tok[ITEM_SP_H_PLUS_PLUS];
    // @ts-expect-error TS(2304): Cannot find name 'GetRndOptTotalValue'.
    value += GetRndOptTotalValue(ITEM_SP_H_PLUS_PLUS);

    // 性能カスタマイズ
    // @ts-expect-error TS(2304): Cannot find name 'g_objCharaConfCustomSpecStatus'.
    value += g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_H_PLUS_PLUS)

    return value;
}





// @ts-expect-error TS(7006): Parameter 'mobData' implicitly has an 'any' type.
function GetMobRes(mobData) {

    var value = 0;
    var bufLv = 0;
    var ignore = 0;

    // 基礎値
    // @ts-expect-error TS(2304): Cannot find name 'MONSTER_DATA_INDEX_RES'.
    value = mobData[MONSTER_DATA_INDEX_RES];

    // Res無視効果
    ignore = 0;

    // アイテム特性による効果（とりあえず全種族だけ対応）
    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_IGNORE_RES_RACE_ALL'.
    ignore += n_tok[ITEM_SP_IGNORE_RES_RACE_ALL];

    // 四次職支援「アルグトゥステルム」による効果
    // SKILL_ID_ARUGUTUS_TERUM
    // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
    if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_ARUGUTUS_TERUM]) > 0) {
        ignore += 5 * bufLv;
    }

    // シャドウクロス「ポテントベナム」による効果
    // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_POTENT_VENOM'.
    if ((bufLv = UsedSkillSearch(SKILL_ID_POTENT_VENOM)) > 0) {
        ignore += 20 + bufLv;
    }

    // RES無視効果の上限は５０％
    ignore = Math.min(50, ignore);

    // 無視効果適用
    value -= Math.floor(value * ignore / 100);
    value = Math.max(0, value);

    return value;
}

// @ts-expect-error TS(7006): Parameter 'mobData' implicitly has an 'any' type.
function GetMobMres(mobData) {

    var value = 0;
    var bufLv = 0;
    var ignore = 0;

    // 基礎値
    // @ts-expect-error TS(2304): Cannot find name 'MONSTER_DATA_INDEX_MRES'.
    value = mobData[MONSTER_DATA_INDEX_MRES];

    // Mres無視効果
    ignore = 0;

    // アイテム特性による効果（とりあえず全種族だけ対応）
    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_IGNORE_MRES_RACE_ALL'.
    ignore += n_tok[ITEM_SP_IGNORE_MRES_RACE_ALL];

    // 四次職支援「アルグトゥスヴィタ」による効果
    // SKILL_ID_ARUGUTUS_VITA
    // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
    if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_ARUGUTUS_VITA]) > 0) {
        ignore += 5 * bufLv;
    }

    // MRES無視効果の上限は５０％
    ignore = Math.min(50, ignore);

    // 無視効果適用
    value -= Math.floor(value * ignore / 100);
    value = Math.max(0, value);

    return value;
}





/**
 * 導出特性ステータス P.Atk による物理ダメージ増幅効果の適用.
 */
// @ts-expect-error TS(7006): Parameter 'dmg' implicitly has an 'any' type.
function ApplyPAtkAmplify(dmg) {

    var patk = 0;
    var amped = 0;


    // 最終 P.Atk を取得する
    patk = GetPAtk();

    // 増幅後のダメージを計算
    amped = (dmg * (100 + patk)) / 100;



    return amped;
}



/**
 * 導出特性ステータス S.Matk による魔法ダメージ増幅効果の適用.
 */
// @ts-expect-error TS(7006): Parameter 'dmg' implicitly has an 'any' type.
function ApplySMatkAmplify(dmg) {

    var smatk = 0;
    var amped = 0;

    // 最終 S.Matk を取得する
    smatk = GetSMatk();

    // 増幅後のダメージを計算
    amped = (dmg * (100 + smatk)) / 100;

    // 小数点切り捨て
    amped = Math.floor(amped);

    return amped;
}



/**
 * 導出特性ステータス C.Rate によるクリティカルダメージ増幅効果の適用.
 */
// @ts-expect-error TS(7006): Parameter 'criDmgRate' implicitly has an 'any' typ... Remove this comment to see the full error message
function ApplyCRateAmplify(criDmgRate) {

    var crate = 0;
    var amped = 0;


    // 最終 C.Rate を取得する
    crate = GetCRate();



    // 増幅後のクリティカルダメージ増幅量を計算
    amped = criDmgRate + crate;



    return amped;
}



/**
 * 導出特性ステータス Res によるダメージ減衰効果の適用.
 */
// @ts-expect-error TS(7006): Parameter 'mobData' implicitly has an 'any' type.
function ApplyResResist(mobData, dmg) {

    var res = 0;
    var resistedRatio = 0;
    var resisted = 0;


    // 敵の Res を取得する
    res = GetMobRes(mobData);



    // 実測との誤差から、減少量を計算→小数切り捨て→元ダメージから減算、という順序の模様

    // 減衰率の計算
    resistedRatio = 1 - (2000 + res) / (2000 + (5 * res));

    // 減衰ダメージを計算
    resisted = Math.floor(dmg * resistedRatio);



    return (dmg - resisted);
}



/**
 * 導出特性ステータス Mres によるダメージ減衰効果の適用.
 */
// @ts-expect-error TS(7006): Parameter 'mobData' implicitly has an 'any' type.
function ApplyMresResist(mobData, dmg) {

    var mres = 0;
    var resistedRatio = 0;
    var resisted = 0;


    // 敵の Mres を取得する
    mres = GetMobMres(mobData);



    // 実測との誤差から、減少量を計算→小数切り捨て→元ダメージから減算、という順序の模様

    // 減衰率の計算
    resistedRatio = 1 - (2000 + mres) / (2000 + (5 * mres));

    // 減衰ダメージを計算
    resisted = Math.floor(dmg * resistedRatio);



    return (dmg - resisted);
}



/**
 * 左手ステータスATKのP.Atkペナルティ
 */
// @ts-expect-error TS(7006): Parameter 'charaData' implicitly has an 'any' type... Remove this comment to see the full error message
function ApplyPAtkLeftHandPenalty(charaData, specData, mobData, dmg) {

    // TODO: 何かおかしい
    return dmg;


    // TODO: ApplyPhysicalSpecializeMonster() 内部の切り捨て処理のせいか、1 誤差が出ることがある


    // 特性ステータスPOWによるATK増加効果が乗らない
    // @ts-expect-error TS(2304): Cannot find name 'MIG_PARAM_ID_POW'.
    var powAtk = Math.ceil(ApplyPAtkAmplify(5 * GetTotalSpecStatus(MIG_PARAM_ID_POW)));

    // モンスター特化適用（たぶん計算に含まれてる）
    powAtk = ApplyPhysicalSpecializeMonster(charaData, specData, mobData, powAtk);

    return Math.max(0, (dmg - powAtk));
}



/**
 * 特性データの補正を適用する.
 * @remarks foot.js を移植したくなかったため、無理やり分離した
 * @remarks ただ、呼び出し側も途中で追加計算していたりするため、特性ごとに個別に呼び出し処理をかかないといけない
 */
// @ts-expect-error TS(7006): Parameter 'spid' implicitly has an 'any' type.
function ApplySpecModify(spid, spVal) {

    var sklLv = 0;
    var bufLv = 0;
    var valWork = 0;
    var arrayWork = null;



    switch (spid) {

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_HIT_PLUS'.
        case ITEM_SP_HIT_PLUS:

            // 「インペリアルガード」スキル「槍＆片手剣修練」習得による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_YARI_KATATE_KEN_SHUREN'... Remove this comment to see the full error message
            if ((sklLv = UsedSkillSearch(SKILL_ID_YARI_KATATE_KEN_SHUREN)) > 0) {

                // 片手剣・片手槍・両手槍装備時限定
                // @ts-expect-error TS(2304): Cannot find name 'n_A_WeaponType'.
                switch (n_A_WeaponType) {
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_SWORD'.
                    case ITEM_KIND_SWORD:
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_SPEAR'.
                    case ITEM_KIND_SPEAR:
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_SPEAR_2HAND'.
                    case ITEM_KIND_SPEAR_2HAND:
                        spVal += 10 * sklLv;
                        break;
                }
            }

            // 「アビスチェイサー」スキル「アビススレイヤー」による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_ABYSS_SLAYER'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_ABYSS_SLAYER)) > 0) {
                spVal += 50 * Math.floor((sklLv + 1) / 2);
            }

            // 「天帝」スキル「兵法修練」による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_HYOHO_SHUREN'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_HYOHO_SHUREN)) > 0) {
                spVal += [0, 3, 6, 9, 12, 15, 20, 25, 30, 40, 50][sklLv];
            }

            // 「ナイトウォッチ」スキル「インテンシブエイム」による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_INTENSIVE_AIM'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_INTENSIVE_AIM)) > 0) {
                spVal += 250;
            }

            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_FLEE_PLUS'.
        case ITEM_SP_FLEE_PLUS:

            // 「シャドウクロス」スキル「シャドウセンス」習得による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_SHADOW_SENSE'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_SHADOW_SENSE)) > 0) {

                spVal += 10 * sklLv;
                if (sklLv >= 8) {
                    spVal += 5 * (sklLv - 7);
                }
                if (sklLv >= 10) {
                    spVal += 35;
                }
            }
            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_CRI_PLUS'.
        case ITEM_SP_CRI_PLUS:

            // 「シャドウクロス」スキル「シャドウセンス」習得による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_SHADOW_SENSE'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_SHADOW_SENSE)) > 0) {

                // 右手短剣、カタール装備時限定
                // @ts-expect-error TS(2304): Cannot find name 'n_A_WeaponType'.
                switch (n_A_WeaponType) {
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_KNIFE'.
                    case ITEM_KIND_KNIFE:
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_KATAR'.
                    case ITEM_KIND_KATAR:

                        valWork = 1 * sklLv;
                        if (sklLv >= 8) {
                            valWork += 2;
                        }
                        if (sklLv >= 9) {
                            valWork += 4;
                        }
                        if (sklLv >= 10) {
                            valWork += 9;
                        }

                        // @ts-expect-error TS(2304): Cannot find name 'n_A_WeaponType'.
                        if (n_A_WeaponType == ITEM_KIND_KNIFE) {
                            valWork *= 2;
                        }

                        spVal += valWork;
                        break;
                }
            }

            // 「ナイトウォッチ」スキル「インテンシブエイム」による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_INTENSIVE_AIM'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_INTENSIVE_AIM)) > 0) {
                spVal += 50;
            }

            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAXHP_UP'.
        case ITEM_SP_MAXHP_UP:

            // 「インクイジター」スキル「堅固な信念」による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_KENKONA_SHINNEN'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_KENKONA_SHINNEN)) > 0) {
                spVal += 10;
            }
            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_ATK_PLUS'.
        case ITEM_SP_ATK_PLUS:

            // 「インペリアルガード」スキル「ガードスタンス」による効果（ペナルティ）
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_GUARD_STANCE'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_GUARD_STANCE)) > 0) {

                // 盾装備時限定
                // @ts-expect-error TS(2304): Cannot find name 'n_A_Equip'.
                if (n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {
                    spVal -= 10 * sklLv;
                }
            }

            // 「インクイジター」スキル「強靭な信念」による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_KYOZINNA_SHINNEN'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_KYOZINNA_SHINNEN)) > 0) {
                spVal += 100;
            }

            // 「ナイトウォッチ」スキル「インテンシブエイム」による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_INTENSIVE_AIM'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_INTENSIVE_AIM)) > 0) {
                spVal += 100;
            }


            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_DEF_PLUS'.
        case ITEM_SP_DEF_PLUS:

            // 「インペリアルガード」スキル「ガードスタンス」による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_GUARD_STANCE'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_GUARD_STANCE)) > 0) {

                // 盾装備時限定
                // @ts-expect-error TS(2304): Cannot find name 'n_A_Equip'.
                if (n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {
                    spVal += 50 * sklLv;
                    if (sklLv >= 5) {
                        spVal += 50 * (sklLv - 4);
                    }
                }
            }

            // 「インペリアルガード」スキル「アタックスタンス」による効果（ペナルティ）
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_ATTACK_STANCE'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_ATTACK_STANCE)) > 0) {

                // 盾装備時限定
                // @ts-expect-error TS(2304): Cannot find name 'n_A_Equip'.
                if (n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {
                    spVal -= 10 * sklLv;
                }
            }

            // 四次職支援「クライマックスインパクト」による効果
            // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
            if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_CLIMAX_IMPACT]) > 0) {
                spVal += 300;
            }

            // 四次職支援「防御装置有効化」による効果
            // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
            if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_BOGYO_SOCHI_YUKOKA]) > 0) {
                spVal += 300;
            }
            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MDEF_PLUS'.
        case ITEM_SP_MDEF_PLUS:

            // 四次職支援「クライマックスインパクト」による効果
            // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
            if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_CLIMAX_IMPACT]) > 0) {
                spVal += 50;
            }
            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_LONGRANGE_DAMAGE_UP'.
        case ITEM_SP_LONGRANGE_DAMAGE_UP:

            // 「マイスター」スキル「ラッシュ状態」による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_RUSH_STATE'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_RUSH_STATE)) > 0) {
                spVal += 2 * sklLv;
            }

            // 「未知なる集中のブーツ」の純粋なステータスによる効果
            // @ts-expect-error TS(2304): Cannot find name 'itemCount'.
            if ((itemCount = EquipNumSearch(ITEM_ID_MICHINARU_SHUCHUNO_BOOTS)) > 0) {
                // @ts-expect-error TS(2304): Cannot find name 'g_pureStatus'.
                if (g_pureStatus[MIG_PARAM_ID_CON] >= 100) {
                    // @ts-expect-error TS(2304): Cannot find name 'itemCount'.
                    spVal += 30 * itemCount;
                }
            }

            // 四次職支援「天地神霊」による効果
            // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
            if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_TENCHI_SHINRE]) > 0) {
                spVal += 10 + bufLv;
            }

            // 「ナイトウォッチ」スキル「ヒドゥンカード」による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_HIDDEN_CARD'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_HIDDEN_CARD)) > 0) {
                spVal += 100 + sklLv * 10;
            }

            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE:

            // 「カーディナル」スキル「鈍器＆本修練」習得による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_DONKI_HON_SHUREN'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_DONKI_HON_SHUREN)) > 0) {

                // 鈍器、本装備時限定
                // @ts-expect-error TS(2304): Cannot find name 'n_A_WeaponType'.
                switch (n_A_WeaponType) {
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_CLUB'.
                    case ITEM_KIND_CLUB:
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_BOOK'.
                    case ITEM_KIND_BOOK:
                        valWork = [0, 1, 2, 3, 4, 5, 7, 9, 11, 15, 20][sklLv];
                        spVal += valWork;
                        break;
                }
            }

            // 「アビスチェイサー」スキル「短剣＆弓修練」習得による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_TANKEN_YUMI_SHUREN'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_TANKEN_YUMI_SHUREN)) > 0) {

                // 短剣、弓装備時限定
                // @ts-expect-error TS(2304): Cannot find name 'n_A_WeaponType'.
                switch (n_A_WeaponType) {
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_KNIFE'.
                    case ITEM_KIND_KNIFE:
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_BOW'.
                    case ITEM_KIND_BOW:

                        valWork = 1 * sklLv;
                        if (sklLv >= 8) {
                            valWork += 1 * (sklLv - 7);
                        }
                        if (sklLv >= 9) {
                            valWork += 1 * (sklLv - 8);
                        }

                        spVal += valWork;
                        break;
                }
            }
            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_UNDEAD:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANGEL:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DRAGON:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER:

            // 「インクイジター」スキル「信仰の意志」習得による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_SHINKONO_ISHI'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_SHINKONO_ISHI)) > 0) {

                // 爪装備時限定
                // @ts-expect-error TS(2304): Cannot find name 'n_A_WeaponType'.
                switch (n_A_WeaponType) {
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_FIST'.
                    case ITEM_KIND_FIST:

                        // 不死、悪魔
                        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_... Remove this comment to see the full error message
                        if ([ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_UNDEAD, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON].indexOf(spid) >= 0) {

                            valWork = 1 * sklLv;
                            if (sklLv >= 6) {
                                valWork += 1 * (sklLv - 5);
                            }
                            if (sklLv >= 9) {
                                valWork += 2 * (sklLv - 8);
                            }
                            if (sklLv >= 10) {
                                valWork += 1 * (sklLv - 9);
                            }

                            spVal += valWork;
                        }
                        break;
                }
            }

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_RESIST_ELM_WATER'.
        case ITEM_SP_RESIST_ELM_WATER:

            // 四次職支援「クライマックスインパクト」による効果
            // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
            if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_CLIMAX_IMPACT]) > 0) {
                spVal += 25;
            }
            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_RESIST_ELM_DARK'.
        case ITEM_SP_RESIST_ELM_DARK:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_RESIST_ELM_UNDEAD'.
        case ITEM_SP_RESIST_ELM_UNDEAD:

            // 「インペリアルガード」スキル「ホーリーシールド」による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_HOLY_SHIELD'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_HOLY_SHIELD)) > 0) {

                // 盾装備時限定
                // @ts-expect-error TS(2304): Cannot find name 'n_A_Equip'.
                if (n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {

                    // 闇、不死耐性
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_RESIST_ELM_DARK'.
                    if ([ITEM_SP_RESIST_ELM_DARK, ITEM_SP_RESIST_ELM_UNDEAD].indexOf(spid) >= 0) {
                        spVal += 3 * sklLv;
                    }
                }
            }
            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_CRITICAL_DAMAGE_UP'.
        case ITEM_SP_CRITICAL_DAMAGE_UP:

            // 「未知なる創造のブーツ」の純粋なステータスによる効果
            // @ts-expect-error TS(2304): Cannot find name 'itemCount'.
            if ((itemCount = EquipNumSearch(ITEM_ID_MICHINARU_SOZONO_BOOTS)) > 0) {
                // @ts-expect-error TS(2304): Cannot find name 'g_pureStatus'.
                if (g_pureStatus[MIG_PARAM_ID_CRT] >= 100) {
                    // @ts-expect-error TS(2304): Cannot find name 'itemCount'.
                    spVal += 30 * itemCount;
                }
            }
            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PERFECT_ATTACK_UP'.
        case ITEM_SP_PERFECT_ATTACK_UP:

            // 「インクイジター」スキル「忠実な信念」習得による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_CHUZITSUNA_SHINNEN'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_CHUZITSUNA_SHINNEN)) > 0) {
                spVal += [0, 1, 3, 5, 10, 15][sklLv];
            }
            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MATK_PLUS_TYPE_NOTSTUFF'... Remove this comment to see the full error message
        case ITEM_SP_MATK_PLUS_TYPE_NOTSTUFF:

            // 「アークメイジ」スキル「クライマックスハリケーン状態」による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_CLIMAX_HURRICANE_STATE'... Remove this comment to see the full error message
            if ((sklLv = UsedSkillSearch(SKILL_ID_CLIMAX_HURRICANE_STATE)) > 0) {
                spVal += 200;
            }
            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_ASPD_PLUS'.
        case ITEM_SP_ASPD_PLUS:

            // 「インクイジター」スキル「忠実な信念」習得による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_CHUZITSUNA_SHINNEN'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_CHUZITSUNA_SHINNEN)) > 0) {
                spVal += 1;
            }
            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_RESIST_SIZE_SMA... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_RESIST_SIZE_SMALL:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_RESIST_SIZE_MED... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_RESIST_SIZE_MEDIUM:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_RESIST_SIZE_LAR... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_RESIST_SIZE_LARGE:

            // 「ドラゴンナイト」スキル「ツーハンドディフェンディング」習得による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_TWOHAND_DEFENDING'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_TWOHAND_DEFENDING)) > 0) {

                // 両手武器装備時限定
                // @ts-expect-error TS(2304): Cannot find name 'n_A_WeaponType'.
                switch (n_A_WeaponType) {
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_SWORD_2HAND'.
                    case ITEM_KIND_SWORD_2HAND:
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_SPEAR_2HAND'.
                    case ITEM_KIND_SPEAR_2HAND:
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_AXE_2HAND'.
                    case ITEM_KIND_AXE_2HAND:
                        spVal += sklLv;
                        break;
                }
            }

            // 「マイスター」スキル「ツーアックスディフェンディング」習得による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_TWO_AXE_DEFENDING'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_TWO_AXE_DEFENDING)) > 0) {

                // 両手斧装備時限定
                // @ts-expect-error TS(2304): Cannot find name 'n_A_WeaponType'.
                switch (n_A_WeaponType) {
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_AXE_2HAND'.
                    case ITEM_KIND_AXE_2HAND:
                        spVal += sklLv;
                        break;
                }
            }
            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_S... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_M... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_L... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE:

            // 「アビスチェイサー」スキル「魔法剣修練」習得による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_MAHOKEN_SHUREN'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_MAHOKEN_SHUREN)) > 0) {

                // 短剣、片手剣装備時限定
                // @ts-expect-error TS(2304): Cannot find name 'n_A_WeaponType'.
                switch (n_A_WeaponType) {
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_KNIFE'.
                    case ITEM_KIND_KNIFE:
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_SWORD'.
                    case ITEM_KIND_SWORD:

                        valWork = 1 * sklLv;
                        if (sklLv >= 6) {
                            valWork += 1 * (sklLv - 5);
                        }

                        spVal += valWork;
                        break;
                }
            }
            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_SHORTRANGE_DAMAGE_UP'.
        case ITEM_SP_SHORTRANGE_DAMAGE_UP:

            // 四次職支援「天地神霊」による効果
            // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
            if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_TENCHI_SHINRE]) > 0) {
                spVal += 10 + bufLv;
            }
            // 「マイスター」スキル「ラッシュ状態」による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_RUSH_STATE'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_RUSH_STATE)) > 0) {
                spVal += 2 * sklLv;
            }
            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_P_ATK_PLUS'.
        case ITEM_SP_P_ATK_PLUS:

            // 「未知なる力のブーツ」の純粋なステータスによる効果
            // @ts-expect-error TS(2304): Cannot find name 'itemCount'.
            if ((itemCount = EquipNumSearch(ITEM_ID_MICHINARU_CHIKARANO_BOOTS)) > 0) {
                // @ts-expect-error TS(2304): Cannot find name 'g_pureStatus'.
                if (g_pureStatus[MIG_PARAM_ID_POW] >= 100) {
                    // @ts-expect-error TS(2304): Cannot find name 'itemCount'.
                    spVal += 5 * itemCount;
                }
            }
            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_S_MATK_PLUS'.
        case ITEM_SP_S_MATK_PLUS:

            // 「未知なる魔力のブーツ」の純粋なステータスによる効果
            // @ts-expect-error TS(2304): Cannot find name 'itemCount'.
            if ((itemCount = EquipNumSearch(ITEM_ID_MICHINARU_MARYOKUNO_BOOTS)) > 0) {
                // @ts-expect-error TS(2304): Cannot find name 'g_pureStatus'.
                if (g_pureStatus[MIG_PARAM_ID_SPL] >= 100) {
                    // @ts-expect-error TS(2304): Cannot find name 'itemCount'.
                    spVal += 5 * itemCount;
                }
            }
            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_RACE_S... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_RACE_U... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_UNDEAD:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_RACE_A... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANIMAL:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_RACE_P... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_PLANT:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_RACE_I... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_INSECT:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_RACE_F... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_FISH:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_RACE_D... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_RACE_H... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_RACE_A... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANGEL:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_RACE_D... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DRAGON:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_RACE_H... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VA... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WA... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EA... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FI... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WI... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_PO... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_POISON:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HO... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_DA... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_DARK:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_PS... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_PSYCO:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_UN... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_UNDEAD:

            // 「カーディナル」スキル「フィドスアニムス」習得による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_FIDOS_ANIMUS'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_FIDOS_ANIMUS)) > 0) {

                // 聖属性魔法
                // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HO... Remove this comment to see the full error message
                if ([ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY].indexOf(spid) >= 0) {

                    valWork = 1 * sklLv;
                    if (sklLv >= 6) {
                        valWork += 1 * (sklLv - 5);
                    }
                    if (sklLv >= 8) {
                        valWork += 1 * (sklLv - 7);
                    }
                    if (sklLv >= 10) {
                        valWork += 2 * (sklLv - 9);
                    }

                    spVal += valWork;
                }
            }

            // 「アークメイジ」スキル「クライマックスハリケーン状態」による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_CLIMAX_HURRICANE_STATE'... Remove this comment to see the full error message
            if ((sklLv = UsedSkillSearch(SKILL_ID_CLIMAX_HURRICANE_STATE)) > 0) {

                // 風属性魔法
                // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WI... Remove this comment to see the full error message
                if ([ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND].indexOf(spid) >= 0) {
                    spVal += 50;
                }
            }

            // 「インペリアルガード」スキル「ホーリーシールド」による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_HOLY_SHIELD'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_HOLY_SHIELD)) > 0) {

                // 盾装備時限定
                // @ts-expect-error TS(2304): Cannot find name 'n_A_Equip'.
                if (n_A_Equip[EQUIP_REGION_ID_SHIELD] != ITEM_ID_NOEQUIP_SHIELD) {

                    // 聖属性魔法
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HO... Remove this comment to see the full error message
                    if ([ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY].indexOf(spid) >= 0) {
                        spVal += 5 * sklLv;
                    }
                }
            }

            // 「エレメンタルマスター」スキル「魔法本修練」による効果
            // @ts-expect-error TS(2304): Cannot find name 'SKILL_ID_MAHO_HON_SHUREN'.
            if ((sklLv = UsedSkillSearch(SKILL_ID_MAHO_HON_SHUREN)) > 0) {

                // 本装備時限定
                // @ts-expect-error TS(2304): Cannot find name 'n_A_WeaponType'.
                switch (n_A_WeaponType) {
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_KIND_BOOK'.
                    case ITEM_KIND_BOOK:

                        arrayWork = [
                            // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FI... Remove this comment to see the full error message
                            ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE,
                            // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WA... Remove this comment to see the full error message
                            ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER,
                            // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WI... Remove this comment to see the full error message
                            ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND,
                            // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EA... Remove this comment to see the full error message
                            ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH,
                            // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_PO... Remove this comment to see the full error message
                            ITEM_SP_MAGICAL_DAMAGE_UP_ELM_POISON,
                        ];

                        // 火・水・風・地・毒属性魔法
                        if (arrayWork.indexOf(spid) >= 0) {
                            spVal += 1 * sklLv;
                            if (sklLv >= 6) {
                                spVal += 2 * (sklLv - 5);
                            }
                        }
                }
            }

            // 四次職支援「クライマックスインパクト」による効果
            // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
            if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_CLIMAX_IMPACT]) > 0) {
                // 水属性魔法
                // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WA... Remove this comment to see the full error message
                if ([ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER].indexOf(spid) >= 0) {
                    spVal += 25;
                }
            }

            // 四次職支援「天地神霊」による効果
            // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
            if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_TENCHI_SHINRE]) > 0) {
                spVal += 10 + bufLv;
            }

            // 「ハイパーノービス」スキル「ジャックフロストノヴァ」によるデバフ効果
            // @ts-expect-error TS(2304): Cannot find name 'n_B_IJYOU'.
            if (n_B_IJYOU[MOB_CONF_DEBUF_ID_JACK_FROST_NOVA]) {
                // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WA... Remove this comment to see the full error message
                if ([ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER].indexOf(spid) >= 0) {
                    spVal += 15;
                }
            }

            break;

        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_MONSTE... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_MONSTE... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_MONSTE... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_MONSTE... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_FIRE:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_MONSTE... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_MONSTE... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_POISON:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_MONSTE... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_HOLY:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_MONSTE... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_DARK:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_MONSTE... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_PSYCO:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_MONSTE... Remove this comment to see the full error message
        case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD:
            // 四次職支援「五行符」による効果
            // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
            if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_GOGYO_FU]) > 0) {
                arrayWork = [
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_MONSTE... Remove this comment to see the full error message
                    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_FIRE,
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_MONSTE... Remove this comment to see the full error message
                    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER,
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_MONSTE... Remove this comment to see the full error message
                    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND,
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_MONSTE... Remove this comment to see the full error message
                    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH,
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_MAGICAL_DAMAGE_UP_MONSTE... Remove this comment to see the full error message
                    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY,
                ];
                // 火・水・風・地・無属性モンスター
                if (arrayWork.indexOf(spid) >= 0) {
                    spVal += 2 * bufLv;
                }
            }
            break;

        // 属性攻撃ダメージ増加
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_V... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_VANITY:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_W... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_WATER:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_E... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_EARTH:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_F... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_FIRE:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_W... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_WIND:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_P... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_POISON:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_H... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_HOLY:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_D... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_DARK:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_P... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_PSYCO:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_U... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_UNDEAD:

            // 「ハイパーノービス」スキル「ジャックフロストノヴァ」によるデバフ効果
            // @ts-expect-error TS(2304): Cannot find name 'n_B_IJYOU'.
            if (n_B_IJYOU[MOB_CONF_DEBUF_ID_JACK_FROST_NOVA]) {
                // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_W... Remove this comment to see the full error message
                if ([ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_WATER].indexOf(spid) >= 0) {
                    spVal += 15;
                }
            }

            break;


        // 属性モンスターへの物理ダメージ増加
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_MONST... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_MONST... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_MONST... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_MONST... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_MONST... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_MONST... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_POISON:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_MONST... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_HOLY:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_MONST... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_MONST... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_PSYCO:
        // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_MONST... Remove this comment to see the full error message
        case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD:
            // 四次職支援「五行符」による効果
            // @ts-expect-error TS(7005): Variable 'g_confDataYozi' implicitly has an 'any' ... Remove this comment to see the full error message
            if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_GOGYO_FU]) > 0) {
                arrayWork = [
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_MONST... Remove this comment to see the full error message
                    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY,
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_MONST... Remove this comment to see the full error message
                    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER,
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_MONST... Remove this comment to see the full error message
                    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH,
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_MONST... Remove this comment to see the full error message
                    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE,
                    // @ts-expect-error TS(2304): Cannot find name 'ITEM_SP_PHYSICAL_DAMAGE_UP_MONST... Remove this comment to see the full error message
                    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND,
                ];
                // 火・水・風・地・無属性モンスター
                if (arrayWork.indexOf(spid) >= 0) {
                    spVal += 2 * bufLv;
                }
            }
            break;
    }

    return spVal;
}

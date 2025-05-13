




/**
 * モンスターマップエリアコンポーネントマネージャクラス.
 */
function CMonsterMapAreaComponentManager() {
}



// カテゴリ選択セレクト
// @ts-expect-error TS(2304): Cannot find name 'CCustomSelectMapCategory'.
CMonsterMapAreaComponentManager.customSelectCategory = new CCustomSelectMapCategory("MONSTER_MAP_CATEGORY");

// マップ選択セレクト
// @ts-expect-error TS(2304): Cannot find name 'CCustomSelectMapMap'.
CMonsterMapAreaComponentManager.customSelectMap = new CCustomSelectMapMap("MONSTER_MAP_MAP", CMonsterMapAreaComponentManager.customSelectCategory);

// モンスター選択セレクト
// @ts-expect-error TS(2304): Cannot find name 'CCustomSelectMapMonster'.
CMonsterMapAreaComponentManager.customSelectMonster = new CCustomSelectMapMonster("MONSTER_MAP_MONSTER", CMonsterMapAreaComponentManager.customSelectMap);

// 表示データのマップ
CMonsterMapAreaComponentManager.dispObjectMap = new Map();



/**
 * 画面部品を再構築する.
 */
CMonsterMapAreaComponentManager.RebuildControls = function () {

    var idx = 0;

    var switchChecked = "";

    var objSwitch = null;
    var objRoot = null;
    var objTable = null;
    var objTbody = null;
    var objTr = null;
    var objTd = null;
    var objSelect = null;
    var objSpan = null;

    var objTableChild = null;
    var objTbodyChild = null;
    var objTrChild = null;
    var objTdChild = null;



    // チェックボックスのチェック状態を取得
    objSwitch = document.getElementById("OBJID_MONSTER_MAP_AREA_EXTRACT_CHECKBOX");
    if (objSwitch) {
        // @ts-expect-error TS(2339): Property 'checked' does not exist on type 'HTMLEle... Remove this comment to see the full error message
        switchChecked = objSwitch.checked;
    }



    // ルートオブジェクトを取得
    objRoot = document.getElementById("OBJID_TD_MONSTER_MAP_AREA");

    // 設定欄を初期化
    // @ts-expect-error TS(2304): Cannot find name 'HtmlRemoveAllChild'.
    HtmlRemoveAllChild(objRoot);



    // 設定欄テーブルを再構築
    objTable = document.createElement("table");
    objTable.setAttribute("border", "1");
    objTable.setAttribute("style", "width : 100%;");
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    objRoot.appendChild(objTable);

    objTbody = document.createElement("tbody");
    objTable.appendChild(objTbody);



    //----------------------------------------------------------------
    // ヘッダ
    //----------------------------------------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTr = HtmlCreateElement("tr", objTbody);

    //--------------------------------
    // ラベル
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    objTd.setAttribute("colspan", "2");

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("モンスター", objTd);

    //--------------------------------
    // 展開スイッチ
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("id", "OBJID_TD_MONSTER_MAP_AREA_EXTRACT_CHECKBOX");
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    objTd.setAttribute("colspan", "2");

    // 設定欄展開用チェックボックス
    // @ts-expect-error TS(2304): Cannot find name 'objInput'.
    objInput = HtmlCreateElement("input", objTd);
    // @ts-expect-error TS(2304): Cannot find name 'objInput'.
    objInput.setAttribute("type", "checkbox");
    // @ts-expect-error TS(2304): Cannot find name 'objInput'.
    objInput.setAttribute("id", "OBJID_MONSTER_MAP_AREA_EXTRACT_CHECKBOX");
    // @ts-expect-error TS(2304): Cannot find name 'objInput'.
    objInput.setAttribute("onclick", "CMonsterMapAreaComponentManager.OnClickExtractSwitch()");
    if (switchChecked) {
        // 部品を再構築しているので、チェック状態の再設定が必要
        // @ts-expect-error TS(2304): Cannot find name 'objInput'.
        objInput.setAttribute("checked", "checked");
    }

    // @ts-expect-error TS(2304): Cannot find name 'objLabel'.
    objLabel = HtmlCreateElement("label", objTd);
    // @ts-expect-error TS(2304): Cannot find name 'objLabel'.
    objLabel.setAttribute("for", "OBJID_MONSTER_MAP_AREA_EXTRACT_CHECKBOX");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("マップ指定", objLabel);



    //----------------------------------------------------------------
    // 地域選択
    //----------------------------------------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTr = HtmlCreateElement("tr", objTbody);

    // 展開表示でなければ、隠す
    if (!switchChecked) {
        objTr.setAttribute("style", "display : none");
    }

    //--------------------------------
    // ラベル
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("地域", objTd);

    //----------------
    // カスタムセレクトオブジェクト生成
    //----------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("colspan", "3");

    objTd.appendChild(CMonsterMapAreaComponentManager.customSelectCategory.GetRootObject());



    //----------------------------------------------------------------
    // マップ選択
    //----------------------------------------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTr = HtmlCreateElement("tr", objTbody);

    // 展開表示でなければ、隠す
    if (!switchChecked) {
        objTr.setAttribute("style", "display : none");
    }

    //--------------------------------
    // ラベル
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("マップ", objTd);

    //----------------
    // カスタムセレクトオブジェクト生成
    //----------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("colspan", "3");

    objTd.appendChild(CMonsterMapAreaComponentManager.customSelectMap.GetRootObject());



    //----------------------------------------------------------------
    // モンスター選択
    //----------------------------------------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTr = HtmlCreateElement("tr", objTbody);

    //--------------------------------
    // ラベル
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("名称", objTd);

    //----------------
    // カスタムセレクトオブジェクト生成
    //----------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("colspan", "3");

    objTd.appendChild(CMonsterMapAreaComponentManager.customSelectMonster.GetRootObject());



    //----------------------------------------------------------------
    // HP / LV
    //----------------------------------------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTr = HtmlCreateElement("tr", objTbody);

    //--------------------------------
    // HP
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    objTd.setAttribute("style", "min-width: 8em;");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("HP", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("style", "min-width: 7em;");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_HP");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_HP");

    //--------------------------------
    // LV
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    objTd.setAttribute("style", "min-width: 8em;");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("LV", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("style", "min-width: 7em;");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_LEVEL");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_LEVEL");



    //----------------------------------------------------------------
    // ATK / BaseExp
    //----------------------------------------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTr = HtmlCreateElement("tr", objTbody);

    //--------------------------------
    // ATK
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("ATK", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.style.whiteSpace = "nowrap";
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_ATK_MIN");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("～", objTd);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_ATK_MAX");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_ATK_MIN");
    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_ATK_MAX");

    //--------------------------------
    // BaseExp
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("BaseExp", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_BASE_EXP");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_BASE_EXP");



    //----------------------------------------------------------------
    // MATK / JobExp
    //----------------------------------------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTr = HtmlCreateElement("tr", objTbody);

    //--------------------------------
    // MATK
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("MATK", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.style.whiteSpace = "nowrap";
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_MATK_MIN");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("～", objTd);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_MATK_MAX");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_MATK_MIN");
    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_MATK_MAX");

    //--------------------------------
    // JobExp
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("JobExp", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_JOB_EXP");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_JOB_EXP");



    //----------------------------------------------------------------
    // DEF(除算) / 種族
    //----------------------------------------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTr = HtmlCreateElement("tr", objTbody);

    //--------------------------------
    // DEF(除算)
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("DEF(除算)", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_DEF_DIV");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_DEF_DIV");

    //--------------------------------
    // 種族
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("種族", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_RACE");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_RACE");



    //----------------------------------------------------------------
    // DEF(減算) / 属性
    //----------------------------------------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTr = HtmlCreateElement("tr", objTbody);

    //--------------------------------
    // DEF(減算)
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("DEF(減算)", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_DEF_MINUS_MIN");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_DEF_MINUS_MIN");

    //--------------------------------
    // 属性
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("属性", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_ELEMENT");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_ELEMENT");



    //----------------------------------------------------------------
    // Res / サイズ
    //----------------------------------------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTr = HtmlCreateElement("tr", objTbody);

    //--------------------------------
    // Res
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("Res", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_RES");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_RES");

    //--------------------------------
    // サイズ
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("サイズ", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_SIZE");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_SIZE");



    //----------------------------------------------------------------
    // MDEF(除算) / 特性
    //----------------------------------------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTr = HtmlCreateElement("tr", objTbody);

    //--------------------------------
    // MDEF(除算)
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("MDEF(除算)", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_MDEF_DIV");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_MDEF_DIV");

    //--------------------------------
    // 特性
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("特性", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_SPECIALITY");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_SPECIALITY");



    //----------------------------------------------------------------
    // MDEF(減算) / 必中HIT
    //----------------------------------------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTr = HtmlCreateElement("tr", objTbody);

    //--------------------------------
    // MDEF(減算)
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("MDEF(減算)", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_MDEF_MINUS");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_MDEF_MINUS");

    //--------------------------------
    // 必中HIT
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("必中HIT", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_100HIT");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_100HIT");



    //----------------------------------------------------------------
    // Mres / 95%回避FLEE
    //----------------------------------------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTr = HtmlCreateElement("tr", objTbody);

    //--------------------------------
    // Mres
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("Mres", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_MRES");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_MRES");

    //--------------------------------
    // 95%回避FLEE
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("95%回避FLEE", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_95FLEE");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_95FLEE");

    //----------------------------------------------------------------
    // Blank / 100%要求CRI
    //----------------------------------------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTr = HtmlCreateElement("tr", objTbody);

    //--------------------------------
    // Blank
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);

    //--------------------------------
    // 100%要求CRI
    //--------------------------------
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateTextNode'.
    HtmlCreateTextNode("100%ｸﾘﾃｨｶﾙCRI", objTd);

    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objTd = HtmlCreateElement("td", objTr);
    // @ts-expect-error TS(2304): Cannot find name 'HtmlCreateElement'.
    objSpan = HtmlCreateElement("span", objTd);
    objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_100CRI");

    CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_100CRI");

};



/**
 * 展開表示変更イベントハンドラ.
 */
CMonsterMapAreaComponentManager.OnClickExtractSwitch = function () {
    // コントロール再構築
    CMonsterMapAreaComponentManager.RebuildControls();
};



/**
 * 選択中のカテゴリIDを取得する.
 * @return 選択中のカテゴリID
 */
CMonsterMapAreaComponentManager.GetCategoryId = function () {
    return CMonsterMapAreaComponentManager.customSelectCategory.GetSelectedDataId();
};

/**
 * 選択中のマップIDを取得する.
 * @return 選択中のマップID
 */
CMonsterMapAreaComponentManager.GetMapId = function () {
    return CMonsterMapAreaComponentManager.customSelectMap.GetSelectedDataId();
};

/**
 * 選択中のモンスターIDを取得する.
 * @return 選択中のモンスターID
 */
CMonsterMapAreaComponentManager.GetMonsterId = function () {
    return CMonsterMapAreaComponentManager.customSelectMonster.GetSelectedDataId();
};

/**
 * 選択状態を設定する.
 * @param categoryId カテゴリID
 * @param mapId マップID
 * @param monsterId モンスターID
 * @param bResetWhenFailed 選択失敗時にリセットするかのフラグ
 * @return 実際に選択されたIDの配列
 */
// @ts-expect-error TS(7006): Parameter 'categoryId' implicitly has an 'any' typ... Remove this comment to see the full error message
CMonsterMapAreaComponentManager.ChangeSelect = function (categoryId, mapId, monsterId, bResetWhenFailed) {

    var selectedArray = null;

    selectedArray = [];

    selectedArray.push(CMonsterMapAreaComponentManager.customSelectCategory.ChangeSelectedDataId(categoryId, bResetWhenFailed));
    selectedArray.push(CMonsterMapAreaComponentManager.customSelectMap.ChangeSelectedDataId(mapId, bResetWhenFailed));
    selectedArray.push(CMonsterMapAreaComponentManager.customSelectMonster.ChangeSelectedDataId(monsterId, bResetWhenFailed));

    CMonsterMapAreaComponentManager.RebuildControls();

    return selectedArray;
};

/**
 * 選択状態をリセットする.
 */
CMonsterMapAreaComponentManager.ResetSelect = function () {

    CMonsterMapAreaComponentManager.customSelectCategory.ResetSelect();
    CMonsterMapAreaComponentManager.customSelectMap.ResetSelect();
    CMonsterMapAreaComponentManager.customSelectMonster.ResetSelect();

    CMonsterMapAreaComponentManager.RebuildControls();
};



/**
 * 表示オブジェクトを設定する.
 * @param objId オブジェクトID
 * @param objDisp 表示オブジェクト
 */
// @ts-expect-error TS(7006): Parameter 'objId' implicitly has an 'any' type.
CMonsterMapAreaComponentManager.SetDispObject = function (objId, objDisp) {

    var objTarget = null;

    CMonsterMapAreaComponentManager.dispObjectMap.set(objId, objDisp);

    objTarget = document.getElementById(objId);

    if (objTarget) {
        // @ts-expect-error TS(2304): Cannot find name 'HtmlRemoveAllChild'.
        HtmlRemoveAllChild(objTarget);
        objTarget.appendChild(objDisp);
    }
};

/**
 * 表示オブジェクトを更新する.
 * @param objId オブジェクトID
 */
// @ts-expect-error TS(7006): Parameter 'objId' implicitly has an 'any' type.
CMonsterMapAreaComponentManager.RefreshtDispObject = function (objId) {

    var objTarget = null;
    var objDisp = null;

    objDisp = CMonsterMapAreaComponentManager.dispObjectMap.get(objId);

    objTarget = document.getElementById(objId);

    if (objTarget) {

        // @ts-expect-error TS(2304): Cannot find name 'HtmlRemoveAllChild'.
        HtmlRemoveAllChild(objTarget);

        if (objDisp) {
            objTarget.appendChild(objDisp);
        }
    }
};

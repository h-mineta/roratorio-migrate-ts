import { OnChangeSettingAutoSpell } from "./calcautospell";
import { CAttackMethodAreaComponentManager } from "./CAttackMethodAreaComponentManager";
import { CShadowEquipController } from "./CShadowEquipController";
import { Click_A1, Click_A3, Click_A4, Click_A7, Click_A8 } from "./head";
import { CSaveDataConst } from "./savedata/CSaveDataConst";
import * as SaveDataUnit from "./savedata/CSaveDataUnit";
import { CSaveDataUnitParse } from "./savedata/CSaveDataUnitParse";
import { CSaveDataUnitTypeManager } from "./savedata/CSaveDataUnitTypeManager";
import { SKeyMap } from "./savedata/SKeyMap";
/**
 * セーブデータマネージャクラス.
 */
export class CSaveDataManager {

    /**
     * プロパティに対応するHTMLオブジェクトIDのマップ（Map< type, Map< propName, objectID > >）.
     */
    static objectIDMapMap = new Map([
        [
            SaveDataUnit.TYPE_CHARA,
            new Map([
                [CSaveDataConst.propNameJobID, "OBJID_SELECT_JOB"],
                [CSaveDataConst.propNameBaseLv, "OBJID_SELECT_BASE_LEVEL"],
                [CSaveDataConst.propNameJobLv, "OBJID_SELECT_JOB_LEVEL"],
                [CSaveDataConst.propNameStStr, "OBJID_SELECT_STATUS_STR"],
                [CSaveDataConst.propNameStAgi, "OBJID_SELECT_STATUS_AGI"],
                [CSaveDataConst.propNameStVit, "OBJID_SELECT_STATUS_VIT"],
                [CSaveDataConst.propNameStInt, "OBJID_SELECT_STATUS_INT"],
                [CSaveDataConst.propNameStDex, "OBJID_SELECT_STATUS_DEX"],
                [CSaveDataConst.propNameStLuk, "OBJID_SELECT_STATUS_LUK"],
                [CSaveDataConst.propNameStPow, "OBJID_SELECT_STATUS_POW"],
                [CSaveDataConst.propNameStSta, "OBJID_SELECT_STATUS_STA"],
                [CSaveDataConst.propNameStWis, "OBJID_SELECT_STATUS_WIS"],
                [CSaveDataConst.propNameStSpl, "OBJID_SELECT_STATUS_SPL"],
                [CSaveDataConst.propNameStCon, "OBJID_SELECT_STATUS_CON"],
                [CSaveDataConst.propNameStCrt, "OBJID_SELECT_STATUS_CRT"],
                [CSaveDataConst.propNameSubAutoAdjustBaseLv, "OBJID_CHECK_AUTO_BASE_LEVEL"],
            ])
        ],
        // 装備箇所系、シャドウは別処理
        [
            //saveDataUnit.TYPE_EQUIP_REGIONS + "-" + CSaveDataConst.eqpRgnKindItem,
            SaveDataUnit.TYPE_EQUIP_REGIONS,
            new Map([
                [CSaveDataConst.propNameEqpRgnArmsRight, "OBJID_ARMS_RIGHT"],
                [CSaveDataConst.propNameEqpRgnArmsLeft, "OBJID_ARMS_LEFT"],
                [CSaveDataConst.propNameEqpRgnShield, "OBJID_SHIELD"],
                [CSaveDataConst.propNameEqpRgnHeadTop, "OBJID_HEAD_TOP"],
                [CSaveDataConst.propNameEqpRgnHeadMid, "OBJID_HEAD_MID"],
                [CSaveDataConst.propNameEqpRgnHeadUnder, "OBJID_HEAD_UNDER"],
                [CSaveDataConst.propNameEqpRgnBody, "OBJID_BODY"],
                [CSaveDataConst.propNameEqpRgnShoulder, "OBJID_SHOULDER"],
                [CSaveDataConst.propNameEqpRgnFoot, "OBJID_SHOES"],
                [CSaveDataConst.propNameEqpRgnAccessory1, "OBJID_ACCESSARY_1"],
                [CSaveDataConst.propNameEqpRgnAccessory2, "OBJID_ACCESSARY_2"],

                // TODO: 現状、矢は特殊処理
                [CSaveDataConst.propNameEqpRgnArrow, "OBJID_SELECT_ARROW"],
            ])
        ],
        [
            SaveDataUnit.TYPE_LEARNED_SKILLS,
            new Map([
                [CSaveDataConst.propNameSkillLv, "OBJID_SELECT_LEARNED_SKILL_LEVEL_"],
            ])
        ],
        [
            SaveDataUnit.TYPE_CHARA_BUFF,
            new Map([
                [CSaveDataConst.propNameArmsElement, "OBJID_SELECT_ARMS_ELEMENT"],
            ])
        ],
        [
            SaveDataUnit.TYPE_SKILL_BUFF_SELF,
            new Map([
                [CSaveDataConst.propNameBuffLv, "A_skill"],
            ])
        ],
        [
            SaveDataUnit.TYPE_SKILL_BUFF_1ST,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_SKILL_BUFF_2ND,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_SKILL_BUFF_3RD,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_SKILL_BUFF_4TH,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_SKILL_BUFF_MUSIC,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_SKILL_BUFF_GUILD,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_ITEM_BUFF,
            new Map([
                [CSaveDataConst.propNameSubSpeedPot, "OBJID_SPEED_POT"],
            ])
        ],
        [
            SaveDataUnit.TYPE_TIME_BUFF,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_AUTO_SPELLS,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_CHARA_DEBUFF,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_CHARA_CONF_BASIC,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_CHARA_CONF_SPECIALIZE,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_CHARA_CONF_SKILL,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_MOB_CONF_PLAYER,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_MOB,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_MOB_CONF_INPUT,
            // 処理方式が異なるので、同処理内のインデックスのマップ
            new Map([
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_LV'.
                [CSaveDataConst.propNameMobLv, MOB_CONF_INPUT_DATA_INDEX_LV],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_HP'.
                [CSaveDataConst.propNameMobHP, MOB_CONF_INPUT_DATA_INDEX_HP],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_STR'.
                [CSaveDataConst.propNameStStr, MOB_CONF_INPUT_DATA_INDEX_STR],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_AGI'.
                [CSaveDataConst.propNameStAgi, MOB_CONF_INPUT_DATA_INDEX_AGI],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_VIT'.
                [CSaveDataConst.propNameStVit, MOB_CONF_INPUT_DATA_INDEX_VIT],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_INT'.
                [CSaveDataConst.propNameStInt, MOB_CONF_INPUT_DATA_INDEX_INT],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_DEX'.
                [CSaveDataConst.propNameStDex, MOB_CONF_INPUT_DATA_INDEX_DEX],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_LUK'.
                [CSaveDataConst.propNameStLuk, MOB_CONF_INPUT_DATA_INDEX_LUK],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_ATK'.
                [CSaveDataConst.propNameStAtk, MOB_CONF_INPUT_DATA_INDEX_ATK],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_MATK'.
                [CSaveDataConst.propNameStMatk, MOB_CONF_INPUT_DATA_INDEX_MATK],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_RANGE'... Remove this comment to see the full error message
                [CSaveDataConst.propNameStRange, MOB_CONF_INPUT_DATA_INDEX_RANGE],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_DEF'.
                [CSaveDataConst.propNameStDefDiv, MOB_CONF_INPUT_DATA_INDEX_DEF],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_MDEF'.
                [CSaveDataConst.propNameStMdefDiv, MOB_CONF_INPUT_DATA_INDEX_MDEF],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_BASE_E... Remove this comment to see the full error message
                [CSaveDataConst.propNameBaseExp, MOB_CONF_INPUT_DATA_INDEX_BASE_EXP],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_JOB_EX... Remove this comment to see the full error message
                [CSaveDataConst.propNameJobExp, MOB_CONF_INPUT_DATA_INDEX_JOB_EXP],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_SIZE'.
                [CSaveDataConst.propNameMobSize, MOB_CONF_INPUT_DATA_INDEX_SIZE],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_ELEMEN... Remove this comment to see the full error message
                [CSaveDataConst.propNameMobElement, MOB_CONF_INPUT_DATA_INDEX_ELEMENT],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_RACE'.
                [CSaveDataConst.propNameMobRace, MOB_CONF_INPUT_DATA_INDEX_RACE],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_BOSS_T... Remove this comment to see the full error message
                [CSaveDataConst.propNameMobBossType, MOB_CONF_INPUT_DATA_INDEX_BOSS_TYPE],
                // @ts-expect-error TS(2304): Cannot find name 'MOB_CONF_INPUT_DATA_INDEX_GRASS_... Remove this comment to see the full error message
                [CSaveDataConst.propNameMobGrassType, MOB_CONF_INPUT_DATA_INDEX_GRASS_TYPE],
            ])
        ],
        [
            SaveDataUnit.TYPE_MOB_BUFF,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_MOB_DEBUFF,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_ATTACK_CONF,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_CHARA_CONF_SPEC_BASIC,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_EQUIP_ARROW,
            // 処理方式が異なるので空マップ
            new Map()
        ],
        [
            SaveDataUnit.TYPE_MOB_CONF_PLAYER2,
            // 処理方式が異なるので空マップ
            new Map()
        ],
    ]);



    /**
     * セーブデータユニットの配列.
     */
    // @ts-expect-error TS(7008): Member '#saveDataUnitArray' implicitly has an 'any... Remove this comment to see the full error message
    #saveDataUnitArray;



    /**
     * コンストラクタ.
     */
    constructor() {

        // メンバ変数の初期化
        this.#saveDataUnitArray = [];
    }



    /**
     * URLクエリ文字列として出力する.
     * @returns {string} URLクエリ文字列
     */
    encodeToURL() {

        if (!Array.isArray(this.#saveDataUnitArray)) {
            return "";
        }

        // TODO: 暫定対処　旧形式の保存処理を呼び出してパースする
        // パース処理のなかで、メンバ変数の配列を置き換えるため、データ追記はこれ以降に行う
        // @ts-expect-error TS(2304): Cannot find name 'SaveSystem'.
        this.parseDataText(SaveSystem())

        // 次世代版限定データの追加
        this.#collectDataShadowEquips();
        this.#collectDataTranscendence();

        // コンパクション
        this.doCompaction();

        // すべてのデータをエンコードして文字列として連結
        let dataTextWork = "";
        let bitOffset = 0;
        for (let idx = 0; idx < this.#saveDataUnitArray.length; idx++) {
            [dataTextWork, bitOffset] = this.#saveDataUnitArray[idx].encodeToURL(dataTextWork, bitOffset);
        }

        return dataTextWork;
    }

    /**
     * セーブ時、超越段階のデータをセーブデータユニットに追加する
     */
    #collectDataTranscendence() {
        // 装備箇所 判定用 データユニット 用意（すでに存在する可能性がある）
        let saveDataUnitEqpRgn = null;
        for (let idx = 0; idx < this.#saveDataUnitArray.length; idx++) {
            const saveDataUnit = this.#saveDataUnitArray[idx];
            // 装備用装備箇所データユニットでなければ、次へ
            if (saveDataUnit.constructor.type != SaveDataUnit.TYPE_EQUIP_REGIONS) {
                continue;
            }
            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            if (floorBigInt32(saveDataUnit.getProp(CSaveDataConst.propNameDataKind)) != CSaveDataConst.eqpRgnKindItem) {
                continue;
            }
            // ここまで来れば、目的のデータユニット
            saveDataUnitEqpRgn = saveDataUnit;
            break;
        }
        // メンバ変数の配列に存在しなかった場合は、新規に作成
        if (!saveDataUnitEqpRgn) {
            saveDataUnitEqpRgn = new (CSaveDataUnitTypeManager.getUnitClass(SaveDataUnit.TYPE_EQUIP_REGIONS))();
            saveDataUnitEqpRgn.SetUpAsDefault();
            saveDataUnitEqpRgn.setProp(CSaveDataConst.propNameDataKind, CSaveDataConst.eqpRgnKindItem);
            this.#saveDataUnitArray.push(saveDataUnitEqpRgn);
        }
        // 全ての装備を走査
        for (let idx = 0; idx < this.#saveDataUnitArray.length; idx++) {
            let saveDataUnit = this.#saveDataUnitArray[idx];
            // 装備データユニットでなければ、次へ
            if (saveDataUnit.constructor.type != SaveDataUnit.TYPE_EQUIPABLE) {
                continue;
            }
            // 装備部位ごとに超越段階をセット（参照渡しなので #saveDataUnitArray にセットできる）
            switch (saveDataUnit.getProp(CSaveDataConst.propNameEquipItemDefID)) {	// saveDataUnit の部位 (propNameEquipItemDefID) が...
                case saveDataUnitEqpRgn.getProp(CSaveDataConst.propNameEqpRgnArmsRight):	// 右手 (propNameEqpRgnArmsRight) のとき...
                    // @ts-expect-error TS(2304): Cannot find name 'n_A_Weapon_Transcendence'.
                    saveDataUnit.setProp(CSaveDataConst.propNameTranscendenceCount, n_A_Weapon_Transcendence);	// 右手の超越段階 (n_A_Weapon_Transcendence) を saveDataUnit に追加
                    break;
                case saveDataUnitEqpRgn.getProp(CSaveDataConst.propNameEqpRgnArmsLeft):
                    // @ts-expect-error TS(2304): Cannot find name 'n_A_Weapon2_Transcendence'.
                    saveDataUnit.setProp(CSaveDataConst.propNameTranscendenceCount, n_A_Weapon2_Transcendence);
                    break;
                case saveDataUnitEqpRgn.getProp(CSaveDataConst.propNameEqpRgnShield):
                    // @ts-expect-error TS(2304): Cannot find name 'n_A_SHIELD_DEF_Transcendence'.
                    saveDataUnit.setProp(CSaveDataConst.propNameTranscendenceCount, n_A_SHIELD_DEF_Transcendence);
                    break;
                case saveDataUnitEqpRgn.getProp(CSaveDataConst.propNameEqpRgnHeadTop):
                    // @ts-expect-error TS(2304): Cannot find name 'n_A_HEAD_DEF_Transcendence'.
                    saveDataUnit.setProp(CSaveDataConst.propNameTranscendenceCount, n_A_HEAD_DEF_Transcendence);
                    break;
                case saveDataUnitEqpRgn.getProp(CSaveDataConst.propNameEqpRgnBody):
                    // @ts-expect-error TS(2304): Cannot find name 'n_A_BODY_DEF_Transcendence'.
                    saveDataUnit.setProp(CSaveDataConst.propNameTranscendenceCount, n_A_BODY_DEF_Transcendence);
                    break;
                case saveDataUnitEqpRgn.getProp(CSaveDataConst.propNameEqpRgnShoulder):
                    // @ts-expect-error TS(2304): Cannot find name 'n_A_SHOULDER_DEF_Transcendence'.
                    saveDataUnit.setProp(CSaveDataConst.propNameTranscendenceCount, n_A_SHOULDER_DEF_Transcendence);
                    break;
                case saveDataUnitEqpRgn.getProp(CSaveDataConst.propNameEqpRgnFoot):
                    // @ts-expect-error TS(2304): Cannot find name 'n_A_SHOES_DEF_Transcendence'.
                    saveDataUnit.setProp(CSaveDataConst.propNameTranscendenceCount, n_A_SHOES_DEF_Transcendence);
                    break;
            }
        }
    }

    /**
     * シャドウ装備のデータを収集する.
     */
    #collectDataShadowEquips() {

        // シャドウ装備の装備箇所ID配列
        const eqpRgnIdArray = [
            // @ts-expect-error TS(2304): Cannot find name 'EQUIP_REGION_ID_SHADOW_ARMS_RIGH... Remove this comment to see the full error message
            EQUIP_REGION_ID_SHADOW_ARMS_RIGHT,
            // @ts-expect-error TS(2304): Cannot find name 'EQUIP_REGION_ID_SHADOW_ARMS_LEFT... Remove this comment to see the full error message
            EQUIP_REGION_ID_SHADOW_ARMS_LEFT,
            // @ts-expect-error TS(2304): Cannot find name 'EQUIP_REGION_ID_SHADOW_BODY'.
            EQUIP_REGION_ID_SHADOW_BODY,
            // @ts-expect-error TS(2304): Cannot find name 'EQUIP_REGION_ID_SHADOW_FOOT'.
            EQUIP_REGION_ID_SHADOW_FOOT,
            // @ts-expect-error TS(2304): Cannot find name 'EQUIP_REGION_ID_SHADOW_ACCESSARY... Remove this comment to see the full error message
            EQUIP_REGION_ID_SHADOW_ACCESSARY_1,
            // @ts-expect-error TS(2304): Cannot find name 'EQUIP_REGION_ID_SHADOW_ACCESSARY... Remove this comment to see the full error message
            EQUIP_REGION_ID_SHADOW_ACCESSARY_2,
        ];


        // 装備箇所用データユニット用意（すでに存在する可能性がある）
        let saveDataUnitEqpRgn = null;
        for (let idx = 0; idx < this.#saveDataUnitArray.length; idx++) {

            const saveDataUnit = this.#saveDataUnitArray[idx];

            // シャドウ装備用装備箇所データユニットでなければ、次へ
            if (saveDataUnit.constructor.type != SaveDataUnit.TYPE_EQUIP_REGIONS) {
                continue;
            }
            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            if (floorBigInt32(saveDataUnit.getProp(CSaveDataConst.propNameDataKind)) != CSaveDataConst.eqpRgnKindShadow) {
                continue;
            }

            // ここまで来れば、目的のデータユニット
            saveDataUnitEqpRgn = saveDataUnit;
            break;
        }

        // メンバ変数の配列に存在しなかった場合は、新規に作成
        if (!saveDataUnitEqpRgn) {
            saveDataUnitEqpRgn = new (CSaveDataUnitTypeManager.getUnitClass(SaveDataUnit.TYPE_EQUIP_REGIONS))();
            saveDataUnitEqpRgn.SetUpAsDefault();
            saveDataUnitEqpRgn.setProp(CSaveDataConst.propNameDataKind, CSaveDataConst.eqpRgnKindShadow);
            this.#saveDataUnitArray.push(saveDataUnitEqpRgn);
        }


        // すべての装備箇所のデータを追加する
        for (let idx = 0; idx < eqpRgnIdArray.length; idx++) {

            const eqpRgnId = eqpRgnIdArray[idx];

            // データユニット生成
            const saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SaveDataUnit.TYPE_EQUIPABLE))();
            saveDataUnit.SetUpAsDefault();

            // データ設定
            const candidateDefID = this.#getCandidateEquipItemDefID();
            saveDataUnit.setProp(CSaveDataConst.propNameEquipItemDefID, candidateDefID);
            saveDataUnit.setProp(CSaveDataConst.propNameOptCode, 0);

            // @ts-expect-error TS(2304): Cannot find name 'g_itemIdArray'.
            saveDataUnit.setProp(CSaveDataConst.propNameItemID, g_itemIdArray[eqpRgnId]);
            // @ts-expect-error TS(2304): Cannot find name 'g_refinedArray'.
            saveDataUnit.setProp(CSaveDataConst.propNameRefinedCount, g_refinedArray[eqpRgnId]);

            // @ts-expect-error TS(2304): Cannot find name 'GetEquipRndOptTableKind'.
            saveDataUnit.setProp(CSaveDataConst.propNameRndOptID1, GetEquipRndOptTableKind(eqpRgnId, 0));
            // @ts-expect-error TS(2304): Cannot find name 'GetEquipRndOptTableValue'.
            saveDataUnit.setProp(CSaveDataConst.propNameRndOptValue1, GetEquipRndOptTableValue(eqpRgnId, 0));
            // @ts-expect-error TS(2304): Cannot find name 'GetEquipRndOptTableKind'.
            saveDataUnit.setProp(CSaveDataConst.propNameRndOptID2, GetEquipRndOptTableKind(eqpRgnId, 1));
            // @ts-expect-error TS(2304): Cannot find name 'GetEquipRndOptTableValue'.
            saveDataUnit.setProp(CSaveDataConst.propNameRndOptValue2, GetEquipRndOptTableValue(eqpRgnId, 1));
            // @ts-expect-error TS(2304): Cannot find name 'GetEquipRndOptTableKind'.
            saveDataUnit.setProp(CSaveDataConst.propNameRndOptID3, GetEquipRndOptTableKind(eqpRgnId, 2));
            // @ts-expect-error TS(2304): Cannot find name 'GetEquipRndOptTableValue'.
            saveDataUnit.setProp(CSaveDataConst.propNameRndOptValue3, GetEquipRndOptTableValue(eqpRgnId, 2));
            // @ts-expect-error TS(2304): Cannot find name 'GetEquipRndOptTableKind'.
            saveDataUnit.setProp(CSaveDataConst.propNameRndOptID4, GetEquipRndOptTableKind(eqpRgnId, 3));
            // @ts-expect-error TS(2304): Cannot find name 'GetEquipRndOptTableValue'.
            saveDataUnit.setProp(CSaveDataConst.propNameRndOptValue4, GetEquipRndOptTableValue(eqpRgnId, 3));
            // @ts-expect-error TS(2304): Cannot find name 'GetEquipRndOptTableKind'.
            saveDataUnit.setProp(CSaveDataConst.propNameRndOptID5, GetEquipRndOptTableKind(eqpRgnId, 4));
            // @ts-expect-error TS(2304): Cannot find name 'GetEquipRndOptTableValue'.
            saveDataUnit.setProp(CSaveDataConst.propNameRndOptValue5, GetEquipRndOptTableValue(eqpRgnId, 4));

            // コンパクション実行
            saveDataUnit.doCompaction();

            // データなしの場合は次へ
            if (saveDataUnit.isEmptyUnit()) {
                continue;
            }

            // 装備箇所データ設定
            let propName = "";
            switch (eqpRgnId) {
                // @ts-expect-error TS(2304): Cannot find name 'EQUIP_REGION_ID_SHADOW_ARMS_RIGH... Remove this comment to see the full error message
                case EQUIP_REGION_ID_SHADOW_ARMS_RIGHT:
                    propName = CSaveDataConst.propNameEqpRgnArmsRight;
                    break;
                // @ts-expect-error TS(2304): Cannot find name 'EQUIP_REGION_ID_SHADOW_ARMS_LEFT... Remove this comment to see the full error message
                case EQUIP_REGION_ID_SHADOW_ARMS_LEFT:
                    propName = CSaveDataConst.propNameEqpRgnArmsLeft;
                    break;
                // @ts-expect-error TS(2304): Cannot find name 'EQUIP_REGION_ID_SHADOW_HEAD_TOP'... Remove this comment to see the full error message
                case EQUIP_REGION_ID_SHADOW_HEAD_TOP:
                    propName = CSaveDataConst.propNameEqpRgnHeadTop;
                    break;
                // @ts-expect-error TS(2304): Cannot find name 'EQUIP_REGION_ID_SHADOW_HEAD_MID'... Remove this comment to see the full error message
                case EQUIP_REGION_ID_SHADOW_HEAD_MID:
                    propName = CSaveDataConst.propNameEqpRgnHeadMid;
                    break;
                // @ts-expect-error TS(2304): Cannot find name 'EQUIP_REGION_ID_SHADOW_HEAD_UNDE... Remove this comment to see the full error message
                case EQUIP_REGION_ID_SHADOW_HEAD_UNDER:
                    propName = CSaveDataConst.propNameEqpRgnHeadUnder;
                    break;
                // @ts-expect-error TS(2304): Cannot find name 'EQUIP_REGION_ID_SHADOW_BODY'.
                case EQUIP_REGION_ID_SHADOW_BODY:
                    propName = CSaveDataConst.propNameEqpRgnBody;
                    break;
                // @ts-expect-error TS(2304): Cannot find name 'EQUIP_REGION_ID_SHADOW_SHOULDER'... Remove this comment to see the full error message
                case EQUIP_REGION_ID_SHADOW_SHOULDER:
                    propName = CSaveDataConst.propNameEqpRgnShoulder;
                    break;
                // @ts-expect-error TS(2304): Cannot find name 'EQUIP_REGION_ID_SHADOW_FOOT'.
                case EQUIP_REGION_ID_SHADOW_FOOT:
                    propName = CSaveDataConst.propNameEqpRgnFoot;
                    break;
                // @ts-expect-error TS(2304): Cannot find name 'EQUIP_REGION_ID_SHADOW_ACCESSARY... Remove this comment to see the full error message
                case EQUIP_REGION_ID_SHADOW_ACCESSARY_1:
                    propName = CSaveDataConst.propNameEqpRgnAccessory1;
                    break;
                // @ts-expect-error TS(2304): Cannot find name 'EQUIP_REGION_ID_SHADOW_ACCESSARY... Remove this comment to see the full error message
                case EQUIP_REGION_ID_SHADOW_ACCESSARY_2:
                    propName = CSaveDataConst.propNameEqpRgnAccessory2;
                    break;

                // 上記以外はNG
                default:
                    continue;
            }
            saveDataUnitEqpRgn.setProp(propName, candidateDefID);

            // データユニットをメンバ変数の配列へ追加
            this.#saveDataUnitArray.push(saveDataUnit);
        }
    }

    /**
     * 未使用、かつ、最小の装備定義IDを取得する.
     * @returns 未使用、かつ、最小の装備定義ID
     */
    #getCandidateEquipItemDefID() {

        const usedIdArray = [];

        // すでに使用されている装備定義IDを収集する
        for (let idx = 0; idx < this.#saveDataUnitArray.length; idx++) {

            const saveDataUnit = this.#saveDataUnitArray[idx];

            // 装備定義でなければ次へ
            if (saveDataUnit.constructor.type != SaveDataUnit.TYPE_EQUIPABLE) {
                continue;
            }

            // 装備定義IDを収集
            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            usedIdArray.push(floorBigInt32(saveDataUnit.getProp(CSaveDataConst.propNameEquipItemDefID)));
        }

        // 未使用、かつ、最小の装備定義IDを検索する
        for (let candidate = 1; candidate < (0x01 << 6); candidate++) {
            if (usedIdArray.indexOf(candidate) == -1) {
                return candidate;
            }
        }

        // ここに来たら使用できる装備定義IDがない（オーバーフローする）
        throw new Error("No candidates for EquipItemDefID");
    }


    /**
     * 文字表現データをパースする.
     * @param {string} dataText パース対象を含む文字表現データ文字列
     * @returns {int} パースした文字数
     * @throws {Error} パース中に異常が検出された場合
     */
    parseDataText(dataText: any) {

        let offset = 0;

        // 強制文字列化
        dataText = "" + dataText;

        // パースユニットのインスタンスを用意してパース開始
        const unitParse = new CSaveDataUnitParse();
        offset += unitParse.parse(dataText, 0);

        // メンバ変数にデータを保持
        this.#saveDataUnitArray = unitParse.saveDataUnitArray;

        // オフセット位置はパースした文字数に一致する
        return offset;
    }



    /**
     * すべてのセーブデータユニットのコンパクションを行う.
     */
    doCompaction() {

        if (!Array.isArray(this.#saveDataUnitArray)) {
            return;
        }

        // 重複が許されないデータユニットの検査用データを用意
        // 重複が許されるデータユニットのほうが少ないので、そちらの用意しておく
        const multiplableTypes = [
            SaveDataUnit.TYPE_EQUIPABLE,
            SaveDataUnit.TYPE_EQUIP_REGIONS,
            SaveDataUnit.TYPE_CHARA_CONF_SPECIALIZE,
        ];
        const dataUnitMapByType = new SKeyMap();

        // すべてのデータをコンパクション
        for (let idx = 0; idx < this.#saveDataUnitArray.length; idx++) {

            const saveDataUnit = this.#saveDataUnitArray[idx];

            // データユニットをコンパクション
            saveDataUnit.doCompaction();

            // 空のデータユニットになっている場合は除去する
            if (saveDataUnit.isEmptyUnit()) {
                this.#saveDataUnitArray.splice(idx--, 1);
                continue;
            }

            // 2つ以上の存在を許さないデータユニットの重複検査
            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            const dataUnitType = floorBigInt32(saveDataUnit.getProp(CSaveDataConst.propNameType));
            if (multiplableTypes.indexOf(dataUnitType) == -1) {
                if (dataUnitMapByType.get(dataUnitType) !== undefined) {
                    // すでに登録されている場合は、現在のユニットを除去する
                    this.#saveDataUnitArray.splice(idx--, 1);
                    continue;
                }
            }

            // 必須チェックにも使用するので、この位置で追加する
            dataUnitMapByType.set(dataUnitType, idx);
        }

        // 装備位置の追加コンパクション
        // 装備位置に指定された装備定義IDが存在しない場合にクリアしようかと考えたが、
        // 画面に設定する時などのエラー処理で補正したほうが効果的かもしれない

        // 必須データユニットの存在チェック
        const requiredTypes = [
            SaveDataUnit.TYPE_VERSION,
            SaveDataUnit.TYPE_CHARA,
            SaveDataUnit.TYPE_MOB,
            SaveDataUnit.TYPE_ATTACK_CONF,
        ];

        for (let idx = 0; idx < requiredTypes.length; idx++) {

            const dataUnitType = requiredTypes[idx];

            // 収集したマップに存在していれば問題なし
            if (dataUnitMapByType.get(dataUnitType.toString()) !== undefined) {
                continue;
            }

            // 必須のデータユニットが存在しない場合、新規に生成してデフォルト値に設定する
            const saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(dataUnitType))();
            saveDataUnit.SetUpAsDefault();
            this.#saveDataUnitArray.push(saveDataUnit);
        }

        // データユニットのタイプ値によるソート
        this.#saveDataUnitArray.sort(
            (a, b) => {
                // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
                const typeA = floorBigInt32(a.getProp(CSaveDataConst.propNameType));
                // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
                const typeB = floorBigInt32(b.getProp(CSaveDataConst.propNameType));
                return (typeA - typeB);
            }
        );
    }



    /**
     * 保持しているデータを画面部品に適用する.
     */
    applyDataToControls() {

        if (!Array.isArray(this.#saveDataUnitArray)) {
            return "";
        }

        // グローバル変数の初期化（移行対応変数のみ）
        ResetConfDataAllMIG(false);
        let n_A_Arrow = 0;		// 再ロード時のバグ対応

        // 必要な情報を収集する
        const idxMap = new SKeyMap();
        const mapDefEquipables = new SKeyMap();
        const idxMapEqpRgns = new SKeyMap();
        const idxMapSpecs = new SKeyMap();

        for (let idx = 0; idx < this.#saveDataUnitArray.length; idx++) {

            const saveDataUnit = this.#saveDataUnitArray[idx];

            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            const unitType = floorBigInt32(saveDataUnit.getProp(CSaveDataConst.propNameType));
            switch (unitType) {

                // 装備定義の場合は、定義IDマップを個別にマッピングする
                case SaveDataUnit.TYPE_EQUIPABLE: {
                    // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
                    const defID = floorBigInt32(saveDataUnit.getProp(CSaveDataConst.propNameEquipItemDefID));
                    mapDefEquipables.set(defID, idx);
                    break;
                }

                // 装備位置の場合は、種別（アイテム、衣装、シャドウ装備）を個別にマッピングする
                case SaveDataUnit.TYPE_EQUIP_REGIONS: {
                    // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
                    const dataKind = floorBigInt32(saveDataUnit.getProp(CSaveDataConst.propNameDataKind));
                    idxMapEqpRgns.set(dataKind, idx);
                    break;
                }

                // 性能カスタマイズ（特化）の場合は、種別（攻撃／防御｜物理／魔法／すべて）を個別にマッピングする
                case SaveDataUnit.TYPE_CHARA_CONF_SPECIALIZE: {
                    // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
                    const dataKind = floorBigInt32(saveDataUnit.getProp(CSaveDataConst.instanceKind));
                    idxMapSpecs.set(dataKind, idx);
                    break;
                }

                // 上記以外は、ユニットの種別をそのままキーにして登録
                default: {
                    idxMap.set(unitType, idx);
                    break;
                }
            }
        }

        // 処理呼び出し用ラッパ
        const funcCallApplyCommon = (thisF: any, unitTypeF: any) => {
            thisF.#applyDataToControlsChara(unitTypeF, idxMap.get(unitTypeF));
        };
        const funcCallApplyCompositBuff = (thisF: any, unitTypeF: any, dataArrayF: any) => {
            thisF.#applyDataToControlsCompositBuff(unitTypeF, idxMap.get(unitTypeF), dataArrayF);
        };
        const funcCallApplyEquipable = (thisF: any, eqpRgnF: any) => {
            thisF.#applyDataToControlsEquipable(eqpRgnF, idxMapEqpRgns.get(eqpRgnF), mapDefEquipables);
        };
        const funcCallApplyEquipableShadow = (thisF: any, eqpRgnF: any) => {
            thisF.#applyDataToControlsEquipableShadow(eqpRgnF, idxMapEqpRgns.get(eqpRgnF), mapDefEquipables);
        };
        const funcCallApplySkillLv = (thisF: any, unitTypeF: any, dataArrayF: any) => {
            thisF.#applyDataToControlsXXXXLv(unitTypeF, idxMap.get(unitTypeF), CSaveDataConst.propNameSkillLv, dataArrayF);
        };
        const funcCallApplyBuffLv = (thisF: any, unitTypeF: any, dataArrayF: any) => {
            thisF.#applyDataToControlsXXXXLv(unitTypeF, idxMap.get(unitTypeF), CSaveDataConst.propNameBuffLv, dataArrayF);
        };
        const funcCallApplyTimeBuffID = (thisF: any, unitTypeF: any, dataArrayF: any) => {
            thisF.#applyDataToControlsXXXXLv(unitTypeF, idxMap.get(unitTypeF), CSaveDataConst.propNameTimeBuffID, dataArrayF);
        };
        const funcCallApplyAutoSpell = (thisF: any, unitTypeF: any, dataArrayF: any) => {
            thisF.#applyDataToControlsAutoSpell(unitTypeF, idxMap.get(unitTypeF), dataArrayF);
        };
        const funcCallApplyConfig = (thisF: any, unitTypeF: any, dataArrayF: any) => {
            thisF.#applyDataToControlsConfig(unitTypeF, idxMap.get(unitTypeF), dataArrayF);
        };
        const funcCallApplyMob = (thisF: any, dataKindF: any) => {
            thisF.#applyDataToControlsMob(dataKindF, idxMap.get(dataKindF));
        };
        const funcCallApplyConfigSpec = (thisF: any, dataKindF: any, dataArrayF: any) => {
            thisF.#applyDataToControlsConfigSpec(dataKindF, idxMapSpecs.get(dataKindF), dataArrayF);
        };
        const funcCallApplyMobConfPlayer = (thisF: any, unitTypeF: any, dataArrayF: any) => {
            thisF.#applyDataToControlsMobConfPlayer(unitTypeF, idxMap.get(unitTypeF), dataArrayF);
        };
        const funcCallApplyMobConfPlayer2 = (thisF: any, unitTypeF: any, dataArrayF: any) => {
            thisF.#applyDataToControlsMobConfPlayer2(unitTypeF, idxMap.get(unitTypeF), dataArrayF);
        };
        const funcCallApplyMobConfInput = (thisF: any, unitTypeF: any) => {
            thisF.#applyDataToControlsMobConfInput(unitTypeF, idxMap.get(unitTypeF));
        };
        const funcCallApplyAttackConf = (thisF: any, unitTypeF: any) => {
            thisF.#applyDataToControlsAttackConf(unitTypeF, idxMap.get(unitTypeF));
        };

        // TODO: 構造変更後、撤去予定
        // 矢の調整
        //		const idxArrow = idxMapEqpRgns.get(CSaveDataConst.eqpRgnKindItem);
        //		const equipableID = (idxArrow !== undefined) ? this.#saveDataUnitArray[idxArrow].getProp(CSaveDataConst.propNameEqpRgnArrow) : undefined;
        //		const idxEquipable = (equipableID !== undefined) ? mapDefEquipables.get(floorBigInt32(equipableID)) : undefined;
        //		const itemIDArrow = (idxEquipable !== undefined) ? this.#saveDataUnitArray[idxEquipable].getProp(CSaveDataConst.propNameItemID) : undefined;
        //		n_A_Arrow = (itemIDArrow !== undefined) ? (floorBigInt32(itemIDArrow) - ITEM_ID_ARROW_NONE) : ARROW_ID_NONE;
        //		HtmlSetObjectValueById("OBJID_SELECT_ARROW", n_A_Arrow);

        let arrowArray: any = [];
        funcCallApplyConfig(this, SaveDataUnit.TYPE_EQUIP_ARROW, arrowArray);

        // 適切な順序で処理関数を呼び出す
        funcCallApplyCommon(this, SaveDataUnit.TYPE_CHARA);

        // TODO: 暫定措置
        //		HtmlSetObjectValueById("OBJID_SELECT_ARROW", n_A_Arrow);
        funcCallApplyEquipable(this, CSaveDataConst.propNameEqpRgnArrow);

        funcCallApplyEquipable(this, CSaveDataConst.eqpRgnKindItem);
        funcCallApplyEquipable(this, CSaveDataConst.eqpRgnKindCostume);
        funcCallApplyEquipableShadow(this, CSaveDataConst.eqpRgnKindShadow);

        // @ts-expect-error TS(2304): Cannot find name 'n_A_LearnedSkill'.
        funcCallApplySkillLv(this, SaveDataUnit.TYPE_LEARNED_SKILLS, n_A_LearnedSkill);
        funcCallApplyCompositBuff(this, SaveDataUnit.TYPE_CHARA_BUFF, n_A_PassSkill8);
        funcCallApplyBuffLv(this, SaveDataUnit.TYPE_SKILL_BUFF_SELF, n_A_PassSkill);
        funcCallApplyBuffLv(this, SaveDataUnit.TYPE_SKILL_BUFF_1ST, g_confDataIchizi);
        funcCallApplyBuffLv(this, SaveDataUnit.TYPE_SKILL_BUFF_2ND, g_confDataNizi);
        funcCallApplyBuffLv(this, SaveDataUnit.TYPE_SKILL_BUFF_3RD, g_confDataSanzi);
        funcCallApplyBuffLv(this, SaveDataUnit.TYPE_SKILL_BUFF_4TH, g_confDataYozi);
        funcCallApplyBuffLv(this, SaveDataUnit.TYPE_SKILL_BUFF_MUSIC, n_A_PassSkill3);
        funcCallApplyBuffLv(this, SaveDataUnit.TYPE_SKILL_BUFF_GUILD, n_A_PassSkill4);
        funcCallApplyCompositBuff(this, SaveDataUnit.TYPE_ITEM_BUFF, n_A_PassSkill7);
        funcCallApplyTimeBuffID(this, SaveDataUnit.TYPE_TIME_BUFF, g_timeItemConf);
        funcCallApplyAutoSpell(this, SaveDataUnit.TYPE_AUTO_SPELLS, n_A_PassSkill5);
        funcCallApplyBuffLv(this, SaveDataUnit.TYPE_CHARA_DEBUFF, n_A_IJYOU);
        funcCallApplyConfig(this, SaveDataUnit.TYPE_CHARA_CONF_BASIC, g_confDataCustomStatusMIG);
        funcCallApplyConfigSpec(this, CSaveDataConst.specKindAttackPhysical, g_confDataSpecMIG[0][0]);
        funcCallApplyConfigSpec(this, CSaveDataConst.specKindAttackMagical, g_confDataSpecMIG[0][1]);
        funcCallApplyConfigSpec(this, CSaveDataConst.specKindAttackAny, g_confDataSpecMIG[0][2]);
        funcCallApplyConfigSpec(this, CSaveDataConst.specKindDefencekAny, g_confDataSpecMIG[1][2]);
        funcCallApplyConfig(this, SaveDataUnit.TYPE_CHARA_CONF_SKILL, g_confDataCustomSkillMIG);
        funcCallApplyConfig(this, SaveDataUnit.TYPE_CHARA_CONF_SPEC_BASIC, g_confDataCustomSpecStatusMIG);
        funcCallApplyMob(this, SaveDataUnit.TYPE_MOB);
        funcCallApplyMobConfPlayer(this, SaveDataUnit.TYPE_MOB_CONF_PLAYER, n_B_TAISEI);
        funcCallApplyMobConfPlayer2(this, SaveDataUnit.TYPE_MOB_CONF_PLAYER2, n_B_TAISEI);
        funcCallApplyMobConfInput(this, SaveDataUnit.TYPE_MOB_CONF_INPUT);
        funcCallApplyBuffLv(this, SaveDataUnit.TYPE_MOB_BUFF, n_B_KYOUKA);
        funcCallApplyBuffLv(this, SaveDataUnit.TYPE_MOB_DEBUFF, n_B_IJYOU);



        // TODO: 構造変更後、撤去予定

        // グローバル変数のデータ調整
        let spliceArray = g_confDataCustomSpecStatusMIG.slice(0, 24);
        // @ts-expect-error TS(2304): Cannot find name 'g_confDataCustomSpecStatus'.
        g_confDataCustomSpecStatus.splice(1, spliceArray.length, ...spliceArray);

        spliceArray = g_confDataCustomStatusMIG.slice(0, 22);
        // @ts-expect-error TS(2304): Cannot find name 'g_confDataCustomStatus'.
        g_confDataCustomStatus.splice(1, spliceArray.length, ...spliceArray);

        spliceArray = g_confDataCustomStatusMIG.slice(22, 25);
        spliceArray.push(g_confDataCustomStatusMIG[25]);
        spliceArray.push(g_confDataSpecMIG[0][0][0]);
        spliceArray.push(g_confDataSpecMIG[0][0][14]);
        spliceArray.push(g_confDataSpecMIG[0][0][37]);
        spliceArray.push(g_confDataSpecMIG[0][0][41]);
        spliceArray.push(g_confDataSpecMIG[0][0][47]);
        spliceArray.push(g_confDataSpecMIG[0][2][1]);
        spliceArray.push(g_confDataCustomStatusMIG[26]);
        spliceArray.push(g_confDataSpecMIG[0][0][51]);
        spliceArray.push(g_confDataCustomStatusMIG[29]);
        spliceArray.push(g_confDataSpecMIG[0][1][0]);
        spliceArray.push(g_confDataSpecMIG[0][1][14]);
        spliceArray.push(g_confDataSpecMIG[0][1][37]);
        spliceArray.push(g_confDataSpecMIG[0][1][41]);
        spliceArray.push(g_confDataSpecMIG[0][1][26]);
        spliceArray.push(g_confDataSpecMIG[0][1][51]);
        spliceArray.push(g_confDataSpecMIG[0][2][50]);
        spliceArray.push(g_confDataSpecMIG[0][2][2]);
        spliceArray.push(g_confDataSpecMIG[0][0][44]);
        spliceArray.push(g_confDataSpecMIG[0][1][44]);
        spliceArray.push(g_confDataCustomStatusMIG[27]);
        spliceArray.push(g_confDataSpecMIG[0][0][26]);
        // @ts-expect-error TS(2304): Cannot find name 'g_confDataCustomAtk'.
        g_confDataCustomAtk.splice(1, spliceArray.length, ...spliceArray);

        spliceArray = g_confDataCustomStatusMIG.slice(30, 32);
        spliceArray.push(g_confDataSpecMIG[1][2][14]);
        spliceArray.push(g_confDataSpecMIG[1][2][37]);
        spliceArray.push(g_confDataSpecMIG[1][2][26]);
        spliceArray.push(g_confDataSpecMIG[1][2][41]);
        spliceArray.push(g_confDataSpecMIG[1][2][46]);		// 全射程ではなく遠距離なので注意
        spliceArray.push(g_confDataSpecMIG[1][2][50]);
        spliceArray.push(g_confDataSpecMIG[1][2][2]);
        spliceArray.push(g_confDataSpecMIG[1][2][44]);
        // @ts-expect-error TS(2304): Cannot find name 'g_confDataCustomDef'.
        g_confDataCustomDef.splice(1, spliceArray.length, ...spliceArray);

        spliceArray = [g_confDataCustomSkillMIG[3]];
        spliceArray.push(g_confDataCustomStatusMIG[32]);
        spliceArray.push(g_confDataCustomStatusMIG[33]);
        spliceArray.push(g_confDataCustomSkillMIG[7]);
        spliceArray.push(g_confDataCustomSkillMIG[6]);
        spliceArray.push(g_confDataCustomSkillMIG[9]);
        spliceArray.push(g_confDataCustomSkillMIG[8]);
        spliceArray.push(g_confDataCustomSkillMIG[11]);
        spliceArray.push(g_confDataCustomSkillMIG[10]);
        spliceArray.push(g_confDataCustomSkillMIG[2]);
        spliceArray.push(g_confDataCustomSkillMIG[4]);
        spliceArray.push(g_confDataCustomSkillMIG[5]);
        // @ts-expect-error TS(2304): Cannot find name 'g_confDataCustomSkill'.
        g_confDataCustomSkill.splice(1, spliceArray.length, ...spliceArray);
        spliceArray = g_confDataCustomSpecStatusMIG.slice(0, 24);
        // @ts-expect-error TS(2304): Cannot find name 'g_confDataCustomSpecStatus'.
        g_confDataCustomSpecStatus.splice(1, spliceArray.length, ...spliceArray);




        // 画面表示リフレッシュ処理（既存移植）
        OnClickSkillSWLearned();
        if (arrowArray[0] === undefined) {
            n_A_Arrow = 0;
        }
        else {
            n_A_Arrow = (arrowArray[0] - 1);
        }
        // @ts-expect-error TS(2304): Cannot find name 'HtmlSetObjectValueById'.
        HtmlSetObjectValueById("OBJID_SELECT_ARROW", n_A_Arrow);
        Click_A8(false);	// BuffChara（旧：支援スキル８（その他の支援/設定））
        Click_A1(false);	// BuffSelf
        g_objCharaConfIchizi.OnSaveDataLoaded();
        g_objCharaConfNizi.OnSaveDataLoaded();
        g_objCharaConfSanzi.OnSaveDataLoaded();
        g_objCharaConfYozi.OnSaveDataLoaded();
        Click_A3(false);	// BuffMusic
        Click_A4(false);	// BuffGuild
        Click_A7(false);	// BuffItem（旧：支援スキル７（アイテム（食品/他）））
        // @ts-expect-error TS(2304): Cannot find name 'CTimeItemAreaComponentManager'.
        CTimeItemAreaComponentManager.CloseArea();
        // @ts-expect-error TS(2304): Cannot find name 'CBattleQuickControlAreaComponent... Remove this comment to see the full error message
        CBattleQuickControlAreaComponentManager.CloseArea();
        OnChangeSettingAutoSpell(false);
        // @ts-expect-error TS(2304): Cannot find name 'g_objCharaConfCustomStatus'.
        g_objCharaConfCustomStatus.OnSaveDataLoaded();
        g_objCharaConfCustomAtk.OnSaveDataLoaded();
        g_objCharaConfCustomDef.OnSaveDataLoaded();
        g_objCharaConfCustomSkill.OnSaveDataLoaded();
        // @ts-expect-error TS(2304): Cannot find name 'g_objCharaConfCustomSpecStatus'.
        g_objCharaConfCustomSpecStatus.OnSaveDataLoaded();
        // @ts-expect-error TS(2304): Cannot find name 'RefreshMobConfPlayerSelectAreaHe... Remove this comment to see the full error message
        RefreshMobConfPlayerSelectAreaHeader();
        // @ts-expect-error TS(2304): Cannot find name 'RefreshMobConfPlayerControlCSS'.
        RefreshMobConfPlayerControlCSS();
        // @ts-expect-error TS(2304): Cannot find name 'g_objMobConfInput'.
        g_objMobConfInput.RefreshControlsByVars();
        // @ts-expect-error TS(2304): Cannot find name 'RefreshMobConfBufSelectAreaHeade... Remove this comment to see the full error message
        RefreshMobConfBufSelectAreaHeader();
        // @ts-expect-error TS(2304): Cannot find name 'RefreshMobConfBufControlCSS'.
        RefreshMobConfBufControlCSS();
        // @ts-expect-error TS(2304): Cannot find name 'RefreshMobConfDebufSelectAreaHea... Remove this comment to see the full error message
        RefreshMobConfDebufSelectAreaHeader();
        // @ts-expect-error TS(2304): Cannot find name 'RefreshMobConfDebufControlCSS'.
        RefreshMobConfDebufControlCSS();

        // ステータス再計算
        CalcStatusPoint(true);
        StAllCalc();

        // 攻撃手段読み込み
        funcCallApplyAttackConf(this, SaveDataUnit.TYPE_ATTACK_CONF);
    }

    /**
     * 保持しているデータを画面部品に適用する.
     * @param {int} unitType ユニットのタイプ値
     * @param {int|undefined} idxUnit データユニットの配列インデックス
     */
    #applyDataToControlsChara(unitType: any, idxUnit: any) {

        // データユニットが存在しない場合は、処理しない
        if ((idxUnit === undefined) || (idxUnit < 0) || (idxUnit >= this.#saveDataUnitArray.length)) {
            return;
        }

        // オブジェクトIDマップが存在しない場合は、処理しない
        // @ts-expect-error TS(2339): Property 'objectIDMapMap' does not exist on type '... Remove this comment to see the full error message
        const objIDMap = this.constructor.objectIDMapMap.get(unitType);
        if (!objIDMap) {
            return;
        }

        // データユニットを取得
        const saveDataUnit = this.#saveDataUnitArray[idxUnit];

        // 処理対象のプロパティを列挙
        const propNames = saveDataUnit.constructor.propNames.slice();
        propNames.push(CSaveDataConst.propNameSubAutoAdjustBaseLv);

        // すべてのプロパティを走査し、必要なプロパティのみ処理
        for (let idx = 0; idx < propNames.length; idx++) {

            // プロパティに関する情報を取得
            const propName = propNames[idx];
            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            const propValue = floorBigInt32(saveDataUnit.getProp(propName));
            const objID = objIDMap.get(propName);

            // プロパティ名で処理分岐
            switch (propName) {

                // 職業IDは専用処理
                case CSaveDataConst.propNameJobID: {
                    this.#applyToControlsCharaJobID(saveDataUnit, objID, propValue);
                    break;
                }

                // ベースレベル自動調整チェックボックス
                case CSaveDataConst.propNameSubAutoAdjustBaseLv: {
                    // @ts-expect-error TS(2304): Cannot find name 'HtmlSetObjectCheckedById'.
                    HtmlSetObjectCheckedById(objID, ((propValue > 0) ? true : false));
                    break;
                }

                // 上記以外は共通処理
                case CSaveDataConst.propNameBaseLv:
                case CSaveDataConst.propNameJobLv:
                case CSaveDataConst.propNameStStr:
                case CSaveDataConst.propNameStAgi:
                case CSaveDataConst.propNameStVit:
                case CSaveDataConst.propNameStInt:
                case CSaveDataConst.propNameStDex:
                case CSaveDataConst.propNameStLuk:
                case CSaveDataConst.propNameStPow:
                case CSaveDataConst.propNameStSta:
                case CSaveDataConst.propNameStWis:
                case CSaveDataConst.propNameStSpl:
                case CSaveDataConst.propNameStCon:
                case CSaveDataConst.propNameStCrt: {
                    // @ts-expect-error TS(2304): Cannot find name 'HtmlSetObjectValueById'.
                    HtmlSetObjectValueById(objID, propValue);
                    break;
                }
            }
        }
    }

    /**
     * 保持しているデータを画面部品に適用する（キャラクターステータス）（サブ：職業ID）.
     * @param {CSaveDataUnit} saveDataUnit セーブデータユニット
     * @param {string} objID 対応するHTMLオブジェクトのID
     * @param {int} propValue プロパティ値（32-bit整数値）
     */
    #applyToControlsCharaJobID(saveDataUnit: any, objID: any, propValue: any) {

        // 職業選択セレクトボックスの設定
        // @ts-expect-error TS(2304): Cannot find name 'HtmlSetObjectValueById'.
        HtmlSetObjectValueById(objID, propValue);
        OnChangeJobSelect(propValue);

        // スパノビ　全武器チェック
        // @ts-expect-error TS(2304): Cannot find name 'JOB_ID_SUPERNOVICE'.
        if (IsSameJobClass(JOB_ID_SUPERNOVICE) || IsSameJobClass(JOB_ID_SUPERNOVICE_PLUS)) {
            const bIgnore = true && (saveDataUnit.getProp(CSaveDataConst.propNameSubIgnoreEquipRestrict));
            // @ts-expect-error TS(2304): Cannot find name 'RefreshSuperNoviceFullWeapon'.
            RefreshSuperNoviceFullWeapon(bIgnore);
        }
    }

    /**
     * 保持しているデータを画面部品に適用する（装備可能品系）.
     * @param {int} equipRegionKind 装備領域種別
     * @param {int|undefined} idxUnitEqpRgn データユニットの配列インデックス
     * @param {Map} mapDefEquipables 装備定義のマップ
     */
    #applyDataToControlsEquipable(equipRegionKind: any, idxUnitEqpRgn: any, mapDefEquipables: any) {

        // 装備領域IDのマップ
        const eqpRgnIDMapMap = new Map([
            [
                CSaveDataConst.eqpRgnKindItem,
                new Map([
                    [CSaveDataConst.propNameEqpRgnArmsRight, EQUIP_REGION_ID_ARMS],
                    [CSaveDataConst.propNameEqpRgnArmsLeft, EQUIP_REGION_ID_ARMS_LEFT],
                    [CSaveDataConst.propNameEqpRgnShield, EQUIP_REGION_ID_SHIELD],
                    [CSaveDataConst.propNameEqpRgnHeadTop, EQUIP_REGION_ID_HEAD_TOP],
                    [CSaveDataConst.propNameEqpRgnHeadMid, EQUIP_REGION_ID_HEAD_MID],
                    [CSaveDataConst.propNameEqpRgnHeadUnder, EQUIP_REGION_ID_HEAD_UNDER],
                    [CSaveDataConst.propNameEqpRgnBody, EQUIP_REGION_ID_BODY],
                    [CSaveDataConst.propNameEqpRgnShoulder, EQUIP_REGION_ID_SHOULDER],
                    [CSaveDataConst.propNameEqpRgnFoot, EQUIP_REGION_ID_SHOES],
                    [CSaveDataConst.propNameEqpRgnAccessory1, EQUIP_REGION_ID_ACCESSARY_1],
                    [CSaveDataConst.propNameEqpRgnAccessory2, EQUIP_REGION_ID_ACCESSARY_2],
                ])
            ],
        ]);

        // 精錬値オブジェクトIDのマップ
        const objIDRefinedMapMap = new Map([
            [
                CSaveDataConst.eqpRgnKindItem,
                new Map([
                    [CSaveDataConst.propNameEqpRgnArmsRight, "OBJID_ARMS_RIGHT_REFINE"],
                    [CSaveDataConst.propNameEqpRgnArmsLeft, "OBJID_ARMS_LEFT_REFINE"],
                    [CSaveDataConst.propNameEqpRgnShield, "OBJID_SHIELD_REFINE"],
                    [CSaveDataConst.propNameEqpRgnHeadTop, "OBJID_HEAD_TOP_REFINE"],
                    [CSaveDataConst.propNameEqpRgnBody, "OBJID_BODY_REFINE"],
                    [CSaveDataConst.propNameEqpRgnShoulder, "OBJID_SHOULDER_REFINE"],
                    [CSaveDataConst.propNameEqpRgnFoot, "OBJID_SHOES_REFINE"],
                ])
            ],
        ]);

        // 超越段階オブジェクトIDのマップ
        const objIDTranscendenceMapMap = new Map([
            [
                CSaveDataConst.eqpRgnKindItem,
                new Map([
                    [CSaveDataConst.propNameEqpRgnArmsRight, "OBJID_ARMS_RIGHT_TRANSCENDENCE"],
                    [CSaveDataConst.propNameEqpRgnArmsLeft, "OBJID_ARMS_LEFT_TRANSCENDENCE"],
                    [CSaveDataConst.propNameEqpRgnShield, "OBJID_SHIELD_TRANSCENDENCE"],
                    [CSaveDataConst.propNameEqpRgnHeadTop, "OBJID_HEAD_TOP_TRANSCENDENCE"],
                    [CSaveDataConst.propNameEqpRgnBody, "OBJID_BODY_TRANSCENDENCE"],
                    [CSaveDataConst.propNameEqpRgnShoulder, "OBJID_SHOULDER_TRANSCENDENCE"],
                    [CSaveDataConst.propNameEqpRgnFoot, "OBJID_SHOES_TRANSCENDENCE"],
                ])
            ],
        ]);

        // カード設定用関数（旧処理の移植）
        const funcLoadAndSetCard = (objIdPrifixF: any, slotNoF: any, enchListIdF: any, cardIdF: any) => {

            // データ補正
            enchListIdF = (enchListIdF === undefined) ? 0 : enchListIdF;
            cardIdF = (cardIdF === undefined) ? 0 : cardIdF;

            // 従来の設定方法による設定
            // @ts-expect-error TS(2304): Cannot find name 'HtmlSetObjectValueById'.
            HtmlSetObjectValueById(objIdPrifixF + "_CARD_" + slotNoF, cardIdF);

            // 可能であれば、エンチャントリストの選択状態を復元する
            do {

                // セレクトボックス取得
                const objSelectF = document.getElementById(objIdPrifixF + "_CARD_" + slotNoF);
                if (!objSelectF) {
                    break;
                }

                // optgroup のリストを取得
                const objOptgroup = objSelectF.querySelector(":scope > optgroup[data-ench-list-id=\"" + enchListIdF + "\"]");
                if (!objOptgroup) {
                    break;
                }

                // option を取得
                const objOption = objOptgroup.querySelector(":scope > option[value=\"" + cardIdF + "\"]");
                if (!objOption) {
                    break;
                }

                // @ts-expect-error TS(2339): Property 'selected' does not exist on type 'Elemen... Remove this comment to see the full error message
                objOption.selected = true;

            } while (false);

            // エンチャントリストIDデータ設定
            const rgnTextF = objIdPrifixF.replace(/^OBJECT_/, "");

            let cardCategoryIDArrayF = g_charaData.cardCategoryMap.get(rgnTextF);
            if (!cardCategoryIDArrayF) {
                cardCategoryIDArrayF = [0, 0, 0, 0];
                g_charaData.cardCategoryMap.set(rgnTextF, cardCategoryIDArrayF);
            }

            // @ts-expect-error TS(2304): Cannot find name 'SLOT_INDEX_CARD_MIN'.
            cardCategoryIDArrayF[slotNoF - SLOT_INDEX_CARD_MIN] = enchListIdF;

            // ステートフルデータ設定
            // @ts-expect-error TS(2304): Cannot find name 'SetStatefullData'.
            SetStatefullData("DATA_" + objIdPrifixF + "_CARD_" + slotNoF, cardIdF);
        };



        // データユニットが存在しない場合は、処理しない
        if ((idxUnitEqpRgn === undefined) || (idxUnitEqpRgn < 0) || (idxUnitEqpRgn >= this.#saveDataUnitArray.length)) {
            return;
        }
        if ((!mapDefEquipables) || (!(mapDefEquipables instanceof SKeyMap))) {
            return;
        }

        // ユニットタイプは固定
        const unitType = SaveDataUnit.TYPE_EQUIP_REGIONS;

        // オブジェクトIDマップが存在しない場合は、処理しない
        // @ts-expect-error TS(2339): Property 'objectIDMapMap' does not exist on type '... Remove this comment to see the full error message
        const objIDMap = this.constructor.objectIDMapMap.get(unitType + "-" + equipRegionKind);
        if (!objIDMap) {
            return;
        }
        const objIDRefinedMap = objIDRefinedMapMap.get(equipRegionKind);
        const objIDTranscendenceMap = objIDTranscendenceMapMap.get(equipRegionKind);

        // 装備領域データユニットを取得
        const saveDataUnitEqpRgn = this.#saveDataUnitArray[idxUnitEqpRgn];

        // 処理対象のプロパティを列挙
        const propNames = saveDataUnitEqpRgn.constructor.propNames.slice();

        // すべてのプロパティを走査し、必要なプロパティのみ処理
        for (let idx = 0; idx < propNames.length; idx++) {

            // プロパティに関する情報を取得
            const propName = propNames[idx];
            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            const propValue = floorBigInt32(saveDataUnitEqpRgn.getProp(propName));

            // アイテムデータを検索する
            const idxItemDef = mapDefEquipables.get(propValue);
            if (idxItemDef === undefined) {
                continue;
            }
            const saveDataUnitItemDef = this.#saveDataUnitArray[idxItemDef];
            const itemID = saveDataUnitItemDef.getProp(CSaveDataConst.propNameItemID);
            // 精錬値のセット
            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            const refined = floorBigInt32(saveDataUnitItemDef.getProp(CSaveDataConst.propNameRefinedCount));
            if (objIDRefinedMap !== undefined) {
                const objIDRefined = objIDRefinedMap.get(propName);
                if (objIDRefined !== undefined) {
                    // @ts-expect-error TS(2304): Cannot find name 'HtmlSetObjectValueById'.
                    HtmlSetObjectValueById(objIDRefined, refined);
                }
            }
            // 超越段階のセット
            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            const transcendenceCount = floorBigInt32(saveDataUnitItemDef.getProp(CSaveDataConst.propNameTranscendenceCount));
            if (objIDTranscendenceMap !== undefined) {
                const objIDTranscendence = objIDTranscendenceMap.get(propName);
                if (objIDTranscendence !== undefined) {
                    // @ts-expect-error TS(2304): Cannot find name 'HtmlSetObjectValueById'.
                    HtmlSetObjectValueById(objIDTranscendence, transcendenceCount);
                }
            }


            // 画面側のオブジェクトに関する情報を取得
            const objID = objIDMap.get(propName);

            // プロパティ名で処理分岐
            switch (propName) {

                // 装備アイテム、かつ、（右手武器、または、左手武器）の場合は、武器種別変更の専用処理を行う
                case CSaveDataConst.propNameEqpRgnArmsRight: {
                    if (equipRegionKind == CSaveDataConst.eqpRgnKindItem) {
                        // @ts-expect-error TS(2304): Cannot find name 'OnChangeArmsTypeRight'.
                        OnChangeArmsTypeRight(ItemObjNew[itemID][ITEM_DATA_INDEX_KIND]);
                        // @ts-expect-error TS(2304): Cannot find name 'HtmlSetObjectValueById'.
                        HtmlSetObjectValueById(objID, itemID);
                        // @ts-expect-error TS(2304): Cannot find name 'SetStatefullData'.
                        SetStatefullData("DATA_" + objID, itemID);
                    }
                    break;
                }

                case CSaveDataConst.propNameEqpRgnArmsLeft: {
                    if (equipRegionKind == CSaveDataConst.eqpRgnKindItem) {
                        // @ts-expect-error TS(2304): Cannot find name 'OnChangeArmsTypeLeft'.
                        OnChangeArmsTypeLeft(ItemObjNew[itemID][ITEM_DATA_INDEX_KIND]);
                        // @ts-expect-error TS(2304): Cannot find name 'HtmlSetObjectValueById'.
                        HtmlSetObjectValueById(objID, itemID);
                        // @ts-expect-error TS(2304): Cannot find name 'SetStatefullData'.
                        SetStatefullData("DATA_" + objID, itemID);
                    }
                    break;
                }

                // 上記以外は共通処理
                case CSaveDataConst.propNameEqpRgnShield:
                case CSaveDataConst.propNameEqpRgnHeadTop:
                case CSaveDataConst.propNameEqpRgnHeadMid:
                case CSaveDataConst.propNameEqpRgnHeadUnder:
                case CSaveDataConst.propNameEqpRgnBody:
                case CSaveDataConst.propNameEqpRgnShoulder:
                case CSaveDataConst.propNameEqpRgnFoot:
                case CSaveDataConst.propNameEqpRgnAccessory1:
                case CSaveDataConst.propNameEqpRgnAccessory2: {
                    // @ts-expect-error TS(2304): Cannot find name 'HtmlSetObjectValueById'.
                    HtmlSetObjectValueById(objID, itemID);
                    // @ts-expect-error TS(2304): Cannot find name 'SetStatefullData'.
                    SetStatefullData("DATA_" + objID, itemID);
                    break;
                }

                // TODO: 現状、矢は特殊処理
                // case CSaveDataConst.propNameEqpRgnArrow:
            }

            // スロット欄の更新（旧処理の移植）
            const eqpRgnIDMap = eqpRgnIDMapMap.get(equipRegionKind);
            if (eqpRgnIDMap === undefined) {
                continue;
            }
            const eqpRgnID = eqpRgnIDMap.get(propName);
            if (eqpRgnID === undefined) {
                continue;
            }
            // @ts-expect-error TS(2304): Cannot find name 'GetSlotMode'.
            if (GetSlotMode() == SLOTPAGER_MODE_CARD) {
                // @ts-expect-error TS(2304): Cannot find name 'RebuildCardSelect'.
                RebuildCardSelect(eqpRgnID, itemID);
                // @ts-expect-error TS(2304): Cannot find name 'SetCardSlotEnability'.
                SetCardSlotEnability(eqpRgnID);
            }
            else {
                // @ts-expect-error TS(2304): Cannot find name 'RebuildRndOptSelect'.
                RebuildRndOptSelect(eqpRgnID, itemID);
                // @ts-expect-error TS(2304): Cannot find name 'SetRndOptEnablity'.
                SetRndOptEnablity(eqpRgnID);
            }

            // カードデータの読み込み
            const cardCategoryIDArray = [
                saveDataUnitItemDef.getProp(CSaveDataConst.propNameCardCategoryID1),
                saveDataUnitItemDef.getProp(CSaveDataConst.propNameCardCategoryID2),
                saveDataUnitItemDef.getProp(CSaveDataConst.propNameCardCategoryID3),
                saveDataUnitItemDef.getProp(CSaveDataConst.propNameCardCategoryID4),
            ];
            const cardIDArray = [
                saveDataUnitItemDef.getProp(CSaveDataConst.propNameCardID1),
                saveDataUnitItemDef.getProp(CSaveDataConst.propNameCardID2),
                saveDataUnitItemDef.getProp(CSaveDataConst.propNameCardID3),
                saveDataUnitItemDef.getProp(CSaveDataConst.propNameCardID4),
            ];
            for (let idxSlot = 0; idxSlot < 4; idxSlot++) {
                funcLoadAndSetCard(objID, (1 + idxSlot), cardCategoryIDArray[idxSlot], cardIDArray[idxSlot]);
            }

            // ランダムオプションデータの読み込み
            const rndOptIDArray = [
                saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptID1),
                saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptID2),
                saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptID3),
                saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptID4),
                saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptID5),
            ];
            const rndOptValueArray = [
                // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
                floorBigInt32(saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptValue1)),
                // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
                floorBigInt32(saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptValue2)),
                // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
                floorBigInt32(saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptValue3)),
                // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
                floorBigInt32(saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptValue4)),
                // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
                floorBigInt32(saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptValue5)),
            ];
            for (let idxSlot = 0; idxSlot < 5; idxSlot++) {
                // @ts-expect-error TS(2304): Cannot find name 'SetEquipRndOptTable'.
                SetEquipRndOptTable(eqpRgnID, idxSlot, rndOptIDArray[idxSlot], rndOptValueArray[idxSlot])
            }
        }
    }

    // TODO: いずれこちらの方式に統合したい
    /**
     * 保持しているデータを画面部品に適用する（装備可能品系、シャドウ装備用）.
     * @param {int} equipRegionKind 装備領域種別
     * @param {int|undefined} idxUnitEqpRgn データユニットの配列インデックス
     * @param {Map} mapDefEquipables 装備定義のマップ
     */
    #applyDataToControlsEquipableShadow(equipRegionKind: any, idxUnitEqpRgn: any, mapDefEquipables: any) {

        // データユニットが存在しない場合は、処理しない
        if ((idxUnitEqpRgn === undefined) || (idxUnitEqpRgn < 0) || (idxUnitEqpRgn >= this.#saveDataUnitArray.length)) {
            return;
        }
        if ((!mapDefEquipables) || (!(mapDefEquipables instanceof SKeyMap))) {
            return;
        }



        // 装備領域データユニットを取得
        const saveDataUnitEqpRgn = this.#saveDataUnitArray[idxUnitEqpRgn];

        // 処理対象のプロパティを列挙
        const propNames = saveDataUnitEqpRgn.constructor.propNames.slice();

        // すべてのプロパティを走査し、必要なプロパティのみ処理
        for (let idx = 0; idx < propNames.length; idx++) {

            // プロパティに関する情報を取得
            const propName = propNames[idx];
            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            const propValue = floorBigInt32(saveDataUnitEqpRgn.getProp(propName));

            // アイテムデータを検索する
            const idxItemDef = mapDefEquipables.get(propValue);
            if (idxItemDef === undefined) {
                continue;
            }
            const saveDataUnitItemDef = this.#saveDataUnitArray[idxItemDef];

            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            const itemID = floorBigInt32(saveDataUnitItemDef.getProp(CSaveDataConst.propNameItemID));
            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            const refined = floorBigInt32(saveDataUnitItemDef.getProp(CSaveDataConst.propNameRefinedCount));
            const rndOptInfoArray = [
                [saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptID1), saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptValue1)],
                [saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptID2), saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptValue2)],
                [saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptID3), saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptValue3)],
                [saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptID4), saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptValue4)],
                [saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptID5), saveDataUnitItemDef.getProp(CSaveDataConst.propNameRndOptValue5)],
            ];
            // ランダムオプションデータの補正
            for (let idxOpt = 0; idxOpt < rndOptInfoArray.length; idxOpt++) {
                // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
                rndOptInfoArray[idxOpt][0] = (rndOptInfoArray[idxOpt][0] === undefined) ? 0 : floorBigInt32(rndOptInfoArray[idxOpt][0]);
                // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
                rndOptInfoArray[idxOpt][1] = (rndOptInfoArray[idxOpt][1] === undefined) ? 0 : floorBigInt32(rndOptInfoArray[idxOpt][1]);
            }

            // プロパティ名から設定箇所名を取得
            let eqpRgnName = "";
            switch (propName) {

                case CSaveDataConst.propNameEqpRgnArmsRight: {
                    eqpRgnName = CShadowEquipController.EQPRGN_NAME_ARMS_RIGHT;
                    break;
                }
                case CSaveDataConst.propNameEqpRgnArmsLeft: {
                    eqpRgnName = CShadowEquipController.EQPRGN_NAME_ARMS_LEFT;
                    break;
                }
                case CSaveDataConst.propNameEqpRgnHeadTop: {
                    eqpRgnName = CShadowEquipController.EQPRGN_NAME_HEAD_TOP;
                    break;
                }
                case CSaveDataConst.propNameEqpRgnHeadMid: {
                    eqpRgnName = CShadowEquipController.EQPRGN_NAME_HEAD_MID;
                    break;
                }
                case CSaveDataConst.propNameEqpRgnHeadUnder: {
                    eqpRgnName = CShadowEquipController.EQPRGN_NAME_HEAD_UNDER;
                    break;
                }
                case CSaveDataConst.propNameEqpRgnBody: {
                    eqpRgnName = CShadowEquipController.EQPRGN_NAME_BODY;
                    break;
                }
                case CSaveDataConst.propNameEqpRgnShoulder: {
                    eqpRgnName = CShadowEquipController.EQPRGN_NAME_SHOULDER;
                    break;
                }
                case CSaveDataConst.propNameEqpRgnFoot: {
                    eqpRgnName = CShadowEquipController.EQPRGN_NAME_FOOT;
                    break;
                }
                case CSaveDataConst.propNameEqpRgnAccessory1: {
                    eqpRgnName = CShadowEquipController.EQPRGN_NAME_ACCESSORY_1;
                    break;
                }
                case CSaveDataConst.propNameEqpRgnAccessory2: {
                    eqpRgnName = CShadowEquipController.EQPRGN_NAME_ACCESSORY_2;
                    break;
                }
                default: {
                    continue;
                }
            }

            // 設定の適用
            // @ts-expect-error TS(2304): Cannot find name 'g_shadowEquipController'.
            g_shadowEquipController.onLoadShadow(eqpRgnName, itemID, refined, rndOptInfoArray);
        }
    }

    /**
     * 保持しているデータを画面部品に適用する（キャラBUFF）.
     * @param {int} unitType ユニットのタイプ値
     * @param {int|undefined} idxUnit データユニットの配列インデックス
     * @param {Array} dataArrayF データ値を保存しておくグローバル空間の配列（n_A_PassSkill等）
     */
    #applyDataToControlsCompositBuff(unitType: any, idxUnit: any, dataArrayF: any) {

        // データユニットが存在しない場合は、処理しない
        if ((idxUnit === undefined) || (idxUnit < 0) || (idxUnit >= this.#saveDataUnitArray.length)) {
            return;
        }

        // オブジェクトIDマップが存在しない場合は、処理しない
        // @ts-expect-error TS(2339): Property 'objectIDMapMap' does not exist on type '... Remove this comment to see the full error message
        const objIDMap = this.constructor.objectIDMapMap.get(unitType);
        if (!objIDMap) {
            return;
        }

        // データユニットを取得
        const saveDataUnit = this.#saveDataUnitArray[idxUnit];

        // オブジェクトIDマップの定義をもとに、データを設定
        for (const [propNameF, objIDF] of objIDMap) {
            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            const propValueF = floorBigInt32(saveDataUnit.getProp(propNameF));
            // @ts-expect-error TS(2304): Cannot find name 'HtmlSetObjectValueById'.
            HtmlSetObjectValueById(objIDF, propValueF);
        }


        // これ以降、従来のグローバル配列にデータを読み込む処理

        // パース制御フラグ、データプロパティ値（配列）を取得
        const ctrlFlag = saveDataUnit.getProp(CSaveDataConst.propNameParseCtrlFlag);
        let ctrlFlagWork = ctrlFlag;
        const propValueArray = saveDataUnit.getProp(CSaveDataConst.propNameBuffLv);

        // すべてのプロパティを走査し、必要なプロパティのみ処理
        const dataArrayRead = [];
        for (let idx = 0; ctrlFlagWork > 0n; idx++) {

            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            const buffLv = (ctrlFlagWork & 1n) ? floorBigInt32(propValueArray[idx]) : 0;
            dataArrayRead.push(buffLv);

            ctrlFlagWork >>= 1n;
        }

        // 読み取ったデータ値をグローバル配列に設定する
        if (Array.isArray(dataArrayF)) {
            dataArrayF.fill(0).splice(0, dataArrayRead.length, ...dataArrayRead);
        }
    }

    /**
     * 保持しているデータを画面部品に適用する（スキル／BUFFレベル）.
     * @param {int} unitType ユニットのタイプ値
     * @param {int|undefined} idxUnit データユニットの配列インデックス
     * @param {string} propName 対応するプロパティの名称
     * @param {Array} dataArrayF データ値を保存しておくグローバル空間の配列（n_A_PassSkill等）
     */
    #applyDataToControlsXXXXLv(unitType: any, idxUnit: any, propName: any, dataArrayF: any) {

        // データユニットが存在しない場合は、処理しない
        if ((idxUnit === undefined) || (idxUnit < 0) || (idxUnit >= this.#saveDataUnitArray.length)) {
            return;
        }

        // オブジェクトIDマップが存在しない場合は、処理しない
        // @ts-expect-error TS(2339): Property 'objectIDMapMap' does not exist on type '... Remove this comment to see the full error message
        const objIDMap = this.constructor.objectIDMapMap.get(unitType);
        if (!objIDMap) {
            return;
        }
        const objIDPrefixF = objIDMap.get(propName);

        // データユニットを取得
        const saveDataUnit = this.#saveDataUnitArray[idxUnit];

        // パース制御フラグ、データプロパティ値（配列）を取得
        const ctrlFlag = saveDataUnit.getProp(CSaveDataConst.propNameParseCtrlFlag);
        let ctrlFlagWork = ctrlFlag;
        const propValueArray = saveDataUnit.getProp(propName);

        // すべてのプロパティを走査し、必要なプロパティのみ処理
        const dataArrayRead = [];
        for (let idx = 0; ctrlFlagWork > 0n; ctrlFlagWork >>= 1n, idx++) {

            // スキルレベルを取得
            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            const skillLv = (ctrlFlagWork & 1n) ? floorBigInt32(propValueArray[idx]) : 0;

            // データを設定
            dataArrayRead.push(skillLv);
            if (objIDPrefixF !== undefined) {
                // @ts-expect-error TS(2304): Cannot find name 'HtmlSetObjectValueById'.
                HtmlSetObjectValueById(objIDPrefixF + idx, skillLv);
            }
        }

        // 読み取ったデータ値をグローバル配列に設定する
        if (Array.isArray(dataArrayF)) {
            dataArrayF.fill(0).splice(0, dataArrayRead.length, ...dataArrayRead);
        }
    }

    /**
     * 保持しているデータを画面部品に適用する（オートスペル）.
     * @param {int} unitType ユニットのタイプ値
     * @param {int|undefined} idxUnit データユニットの配列インデックス
     * @param {Array} dataArrayF データ値を保存しておくグローバル空間の配列（n_A_PassSkill等）
     */
    #applyDataToControlsAutoSpell(unitType: any, idxUnit: any, dataArrayF: any) {

        // データユニットが存在しない場合は、処理しない
        if ((idxUnit === undefined) || (idxUnit < 0) || (idxUnit >= this.#saveDataUnitArray.length)) {
            return;
        }

        // オブジェクトIDマップが存在しない場合は、処理しない
        // @ts-expect-error TS(2339): Property 'objectIDMapMap' does not exist on type '... Remove this comment to see the full error message
        const objIDMap = this.constructor.objectIDMapMap.get(unitType);
        if (!objIDMap) {
            return;
        }

        // データユニットを取得
        const saveDataUnit = this.#saveDataUnitArray[idxUnit];

        // パース制御フラグ、データプロパティ値（配列）を取得
        const ctrlFlag = saveDataUnit.getProp(CSaveDataConst.propNameParseCtrlFlag);
        let ctrlFlagWork = ctrlFlag;
        const propValueArrayID = saveDataUnit.getProp(CSaveDataConst.propNameAutoSpellID);
        const propValueArrayLv = saveDataUnit.getProp(CSaveDataConst.propNameAutoSpellLv);
        const propValueArrayProb = saveDataUnit.getProp(CSaveDataConst.propNameAutoSpellProb);

        // すべてのプロパティを走査し、必要なプロパティのみ処理
        const dataArrayID = [];
        const dataArrayLv = [];
        const dataArrayProb = [];
        // TODO: マジックナンバー
        for (let idx = 0; idx < 20; idx++) {

            // スキルレベルを取得
            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            const skillID = (ctrlFlagWork & 1n) ? floorBigInt32(propValueArrayID[idx]) : 0;
            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            const skillLv = (ctrlFlagWork & 2n) ? floorBigInt32(propValueArrayLv[idx]) : 0;
            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            const skillProb = (ctrlFlagWork & 4n) ? floorBigInt32(propValueArrayProb[idx]) : 0;

            // データを設定
            dataArrayID.push(skillID);
            dataArrayLv.push(skillLv);
            dataArrayProb.push(skillProb);

            ctrlFlagWork >>= 3n;
        }

        // 読み取ったデータ値をグローバル配列に設定する
        if (Array.isArray(dataArrayF)) {
            dataArrayF.fill(0);
            // @ts-expect-error TS(2304): Cannot find name 'OBJID_OFFSET_AS_SKILL_ID'.
            dataArrayF.splice(OBJID_OFFSET_AS_SKILL_ID, dataArrayID.length, ...dataArrayID);
            // @ts-expect-error TS(2304): Cannot find name 'OBJID_OFFSET_AS_SKILL_LV'.
            dataArrayF.splice(OBJID_OFFSET_AS_SKILL_LV, dataArrayLv.length, ...dataArrayLv);
            // @ts-expect-error TS(2304): Cannot find name 'OBJID_OFFSET_AS_SKILL_PROB'.
            dataArrayF.splice(OBJID_OFFSET_AS_SKILL_PROB, dataArrayProb.length, ...dataArrayProb);
        }
    }

    /**
     * 保持しているデータを画面部品に適用する（性能カスタマイズ）.
     * @param {int} unitType ユニットのタイプ値
     * @param {int|undefined} idxUnit データユニットの配列インデックス
     * @param {Array} dataArrayF データ値を保存しておくグローバル空間の配列（n_A_PassSkill等）
     */
    #applyDataToControlsConfig(unitType: any, idxUnit: any, dataArrayF: any) {

        // データユニットが存在しない場合は、処理しない
        if ((idxUnit === undefined) || (idxUnit < 0) || (idxUnit >= this.#saveDataUnitArray.length)) {
            return;
        }

        // オブジェクトIDマップが存在しない場合は、処理しない
        // @ts-expect-error TS(2339): Property 'objectIDMapMap' does not exist on type '... Remove this comment to see the full error message
        const objIDMap = this.constructor.objectIDMapMap.get(unitType);
        if (!objIDMap) {
            return;
        }

        // データユニットを取得
        const saveDataUnit = this.#saveDataUnitArray[idxUnit];

        // プロパティ名配列を取得
        const propNames = saveDataUnit.constructor.propNames.slice();

        // 一連の処理で共通の配列インデックスを使うため、ここで宣言
        let idx = 0;

        // パース制御フラグを取得
        let ctrlFlag = undefined;
        for (idx = 0; idx < propNames.length; idx++) {
            const propName = propNames[idx];
            if (propName == CSaveDataConst.propNameParseCtrlFlag) {
                ctrlFlag = saveDataUnit.getProp(propName);
                idx++;
                break;
            }
        }

        // パース制御フラグ以降のすべてのプロパティを走査し、必要なプロパティのみ処理
        let sign = undefined;
        const dataArrayRead = [];
        for (; idx < propNames.length; idx++) {

            // 必要な情報を収集
            const propName = propNames[idx];

            // 符号プロパティの場合
            if (propName.slice(-4) == "Sign") {
                if (ctrlFlag & 1n) {
                    // 負論理なので注意
                    sign = (saveDataUnit.getProp(propName) == 1n) ? -1 : 1;
                }
                else {
                    sign = undefined;
                }
            }

            // 上記以外の場合
            else {
                // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
                let propValue = (ctrlFlag & 1n) ? floorBigInt32(saveDataUnit.getProp(propName)) : 0;
                if (sign !== undefined) {
                    propValue *= sign;
                }
                dataArrayRead.push(propValue);
                sign = undefined;
            }

            ctrlFlag >>= 1n;
        }

        // 読み取ったデータ値をグローバル配列に設定する
        if (Array.isArray(dataArrayF)) {
            dataArrayF.fill(0).splice(0, dataArrayRead.length, ...dataArrayRead);
        }
    }

    /**
     * 保持しているデータを画面部品に適用する（性能カスタマイズ：特化）.
     * @param {int} dataKind 特化種別
     * @param {int|undefined} idxUnit データユニットの配列インデックス
     * @param {Array} dataArrayF データ値を保存しておくグローバル空間の配列（n_A_PassSkill等）
     */
    #applyDataToControlsConfigSpec(dataKind: any, idxUnit: any, dataArrayF: any) {

        // データユニットが存在しない場合は、処理しない
        if ((idxUnit === undefined) || (idxUnit < 0) || (idxUnit >= this.#saveDataUnitArray.length)) {
            return;
        }

        // ユニットデータ種別は固定
        const unitType = SaveDataUnit.TYPE_CHARA_CONF_SPECIALIZE;

        // オブジェクトIDマップが存在しない場合は、処理しない
        // @ts-expect-error TS(2339): Property 'objectIDMapMap' does not exist on type '... Remove this comment to see the full error message
        const objIDMap = this.constructor.objectIDMapMap.get(unitType);
        if (!objIDMap) {
            return;
        }

        // データユニットを取得
        const saveDataUnit = this.#saveDataUnitArray[idxUnit];

        // プロパティ名配列を取得
        const propNames = saveDataUnit.constructor.propNames.slice();

        // 一連の処理で共通の配列インデックスを使うため、ここで宣言
        let idx = 0;

        // パース制御フラグを取得
        let ctrlFlag = undefined;
        for (idx = 0; idx < propNames.length; idx++) {
            const propName = propNames[idx];
            if (propName == CSaveDataConst.propNameParseCtrlFlag) {
                ctrlFlag = saveDataUnit.getProp(propName);
                idx++;
                break;
            }
        }

        // パース制御フラグ以降のすべてのプロパティを走査し、必要なプロパティのみ処理
        let sign = undefined;
        const dataArrayRead = [];
        for (; idx < propNames.length; idx++) {

            // 必要な情報を収集
            const propName = propNames[idx];


            // 符号プロパティの場合
            if (propName.slice(-4) == "Sign") {
                if (ctrlFlag & 1n) {
                    // 負論理なので注意
                    sign = (saveDataUnit.getProp(propName) == 1n) ? -1 : 1;
                }
                else {
                    sign = undefined;
                }
            }

            // 上記以外の場合
            else {
                // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
                let propValue = (ctrlFlag & 1n) ? floorBigInt32(saveDataUnit.getProp(propName)) : 0;
                if (sign !== undefined) {
                    propValue *= sign;
                }
                dataArrayRead.push(propValue);
                sign = undefined;
            }

            ctrlFlag >>= 1n;
        }

        // 読み取ったデータ値をグローバル配列に設定する
        if (Array.isArray(dataArrayF)) {
            dataArrayF.fill(0).splice(0, dataArrayRead.length, ...dataArrayRead);
        }
    }

    /**
     * 保持しているデータを画面部品に適用する（モンスター基本）.
     * @param {int} unitType ユニットのタイプ値
     * @param {int|undefined} idxUnit データユニットの配列インデックス
     */
    #applyDataToControlsMob(unitType: any, idxUnit: any) {

        // データユニットが存在しない場合は、処理しない
        if ((idxUnit === undefined) || (idxUnit < 0) || (idxUnit >= this.#saveDataUnitArray.length)) {
            return;
        }

        // オブジェクトIDマップが存在しない場合は、処理しない
        // @ts-expect-error TS(2339): Property 'objectIDMapMap' does not exist on type '... Remove this comment to see the full error message
        const objIDMap = this.constructor.objectIDMapMap.get(unitType);
        if (!objIDMap) {
            return;
        }

        // データユニットを取得
        const saveDataUnit = this.#saveDataUnitArray[idxUnit];

        // データ取得
        // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
        const categoryID = floorBigInt32(saveDataUnit.getProp(CSaveDataConst.propNameMonsterMapCategoryID));
        // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
        const mapID = floorBigInt32(saveDataUnit.getProp(CSaveDataConst.propNameMonsterMapID));
        // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
        const mobID = floorBigInt32(saveDataUnit.getProp(CSaveDataConst.propNameMonsterID));

        // 専用処理
        CMonsterMapAreaComponentManager.ChangeSelect(categoryID, mapID, mobID, true);
    }

    /**
     * 保持しているデータを画面部品に適用する（対プレイヤー設定）.
     * @param {int} unitType ユニットのタイプ値
     * @param {int|undefined} idxUnit データユニットの配列インデックス
     */
    #applyDataToControlsMobConfPlayer(unitType: any, idxUnit: any, dataArrayF: any) {

        // データユニットが存在しない場合は、処理しない
        if ((idxUnit === undefined) || (idxUnit < 0) || (idxUnit >= this.#saveDataUnitArray.length)) {
            return;
        }

        // オブジェクトIDマップが存在しない場合は、処理しない
        // @ts-expect-error TS(2339): Property 'objectIDMapMap' does not exist on type '... Remove this comment to see the full error message
        const objIDMap = this.constructor.objectIDMapMap.get(unitType);
        if (!objIDMap) {
            return;
        }

        // データユニットを取得
        const saveDataUnit = this.#saveDataUnitArray[idxUnit];

        // 処理対象のプロパティを列挙
        const propNames = saveDataUnit.constructor.propNames.slice();

        // 一連の処理で共通の配列インデックスを使うため、ここで宣言
        let idx = 0;

        // パース制御フラグを取得
        let ctrlFlag = undefined;
        for (idx = 0; idx < propNames.length; idx++) {
            const propName = propNames[idx];
            if (propName == CSaveDataConst.propNameParseCtrlFlag) {
                ctrlFlag = saveDataUnit.getProp(propName);
                idx++;
                break;
            }
        }

        // パース制御フラグ以降のすべてのプロパティを走査し、必要なプロパティのみ処理
        let sign = undefined;
        const dataArrayRead = [];
        for (; idx < propNames.length; idx++) {

            // 必要な情報を収集
            const propName = propNames[idx];


            // 符号プロパティの場合
            if (propName.slice(-4) == "Sign") {
                if (ctrlFlag & 1n) {
                    // 負論理なので注意
                    sign = (saveDataUnit.getProp(propName) == 1n) ? -1 : 1;
                }
                else {
                    sign = undefined;
                }
            }

            // 上記以外の場合
            else {
                // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
                let propValue = (ctrlFlag & 1n) ? floorBigInt32(saveDataUnit.getProp(propName)) : 0;
                if (sign !== undefined) {
                    propValue *= sign;
                }
                dataArrayRead.push(propValue);
                sign = undefined;
            }

            ctrlFlag >>= 1n;
        }

        // 読み取ったデータ値をグローバル配列に設定する
        if (Array.isArray(dataArrayF)) {
            dataArrayF.fill(0).splice(0, dataArrayRead.length, ...dataArrayRead);
        }
    }

    /**
     * 保持しているデータを画面部品に適用する（対プレイヤー設定2）.
     * @param {int} unitType ユニットのタイプ値
     * @param {int|undefined} idxUnit データユニットの配列インデックス
     */
    #applyDataToControlsMobConfPlayer2(unitType: any, idxUnit: any, dataArrayF: any) {

        // データユニットが存在しない場合は、処理しない
        if ((idxUnit === undefined) || (idxUnit < 0) || (idxUnit >= this.#saveDataUnitArray.length)) {
            return;
        }

        // オブジェクトIDマップが存在しない場合は、処理しない
        // @ts-expect-error TS(2339): Property 'objectIDMapMap' does not exist on type '... Remove this comment to see the full error message
        const objIDMap = this.constructor.objectIDMapMap.get(unitType);
        if (!objIDMap) {
            return;
        }

        // データユニットを取得
        const saveDataUnit = this.#saveDataUnitArray[idxUnit];

        // 処理対象のプロパティを列挙
        const propNames = saveDataUnit.constructor.propNames.slice();

        // 一連の処理で共通の配列インデックスを使うため、ここで宣言
        let idx = 0;

        // パース制御フラグを取得
        let ctrlFlag = undefined;
        for (idx = 0; idx < propNames.length; idx++) {
            const propName = propNames[idx];
            if (propName == CSaveDataConst.propNameParseCtrlFlag) {
                ctrlFlag = saveDataUnit.getProp(propName);
                idx++;
                break;
            }
        }

        // パース制御フラグ以降のすべてのプロパティを走査し、必要なプロパティのみ処理
        let sign = undefined;
        const dataArrayRead = [];
        for (; idx < propNames.length; idx++) {

            // 必要な情報を収集
            const propName = propNames[idx];


            // 符号プロパティの場合
            if (propName.slice(-4) == "Sign") {
                if (ctrlFlag & 1n) {
                    // 負論理なので注意
                    sign = (saveDataUnit.getProp(propName) == 1n) ? -1 : 1;
                }
                else {
                    sign = undefined;
                }
            }

            // 上記以外の場合
            else {
                // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
                let propValue = (ctrlFlag & 1n) ? floorBigInt32(saveDataUnit.getProp(propName)) : 0;
                if (sign !== undefined) {
                    propValue *= sign;
                }
                dataArrayRead.push(propValue);
                sign = undefined;
            }

            ctrlFlag >>= 1n;
        }

        // 読み取ったデータ値をグローバル配列に設定する
        if (Array.isArray(dataArrayF)) {
            dataArrayF.fill(0).splice(0, dataArrayRead.length, ...dataArrayRead);
        }
    }

    /**
     * 保持しているデータを画面部品に適用する（モンスター手入力）.
     * @param {int} unitType ユニットのタイプ値
     * @param {int|undefined} idxUnit データユニットの配列インデックス
     */
    #applyDataToControlsMobConfInput(unitType: any, idxUnit: any) {

        // データユニットが存在しない場合は、処理しない
        if ((idxUnit === undefined) || (idxUnit < 0) || (idxUnit >= this.#saveDataUnitArray.length)) {
            return;
        }

        // オブジェクトIDマップが存在しない場合は、処理しない
        // @ts-expect-error TS(2339): Property 'objectIDMapMap' does not exist on type '... Remove this comment to see the full error message
        const objIDMap = this.constructor.objectIDMapMap.get(unitType);
        if (!objIDMap) {
            return;
        }

        // データユニットを取得
        const saveDataUnit = this.#saveDataUnitArray[idxUnit];

        // 旧形式の処理を移植
        // 自動読み込みをアクティブに
        // @ts-expect-error TS(2304): Cannot find name 'SetActiveIndexMobConfInput'.
        SetActiveIndexMobConfInput(0);

        // 処理対象のプロパティを列挙
        const propNames = saveDataUnit.constructor.propNames.slice();

        // 一連の処理で共通の配列インデックスを使うため、ここで宣言
        let idx = 0;

        // パース制御フラグを取得
        let ctrlFlag = undefined;
        for (idx = 0; idx < propNames.length; idx++) {
            const propName = propNames[idx];
            if (propName == CSaveDataConst.propNameParseCtrlFlag) {
                ctrlFlag = saveDataUnit.getProp(propName);
                idx++;
                break;
            }
        }

        // パース制御フラグ以降のすべてのプロパティを走査し、必要なプロパティのみ処理
        for (; idx < propNames.length; idx++) {

            // 必要な情報を収集
            const propName = propNames[idx];
            const propIndex = objIDMap.get(propName);

            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt40'.
            let propValue = (ctrlFlag & 1n) ? floorBigInt40(saveDataUnit.getProp(propName)) : 0;

            // @ts-expect-error TS(2304): Cannot find name 'SetMobConfInput'.
            SetMobConfInput(propIndex, propValue);

            ctrlFlag >>= 1n;
        }
    }

    /**
     * 保持しているデータを画面部品に適用する（攻撃手段情報）.
     * @param {int} unitType ユニットのタイプ値
     * @param {int|undefined} idxUnit データユニットの配列インデックス
     */
    #applyDataToControlsAttackConf(unitType: any, idxUnit: any) {

        // データユニットが存在しない場合は、処理しない
        if ((idxUnit === undefined) || (idxUnit < 0) || (idxUnit >= this.#saveDataUnitArray.length)) {
            return;
        }

        // オブジェクトIDマップが存在しない場合は、処理しない
        // @ts-expect-error TS(2339): Property 'objectIDMapMap' does not exist on type '... Remove this comment to see the full error message
        const objIDMap = this.constructor.objectIDMapMap.get(unitType);
        if (!objIDMap) {
            return;
        }

        // データユニットを取得
        const saveDataUnit = this.#saveDataUnitArray[idxUnit];

        // 旧形式の処理を移植

        // 必要な情報を取得
        // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
        const skillID = floorBigInt32(saveDataUnit.getProp(CSaveDataConst.propNameAttackSkillID));
        // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
        const sourceTypeID = floorBigInt32(saveDataUnit.getProp(CSaveDataConst.propNameSourceTypeID));
        // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
        const skillLv = floorBigInt32(saveDataUnit.getProp(CSaveDataConst.propNameAttackSkillLv));
        // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
        const optionArray = floorBigInt32(saveDataUnit.getProp(CSaveDataConst.propNameAttackSkillOption));

        // 攻撃手段エリアコンポーネントの再構築
        CAttackMethodAreaComponentManager.RebuildControls();

        // 攻撃手段設定を生成
        // @ts-expect-error TS(2304): Cannot find name 'CAttackMethodConf'.
        const attackMethodConf = new CAttackMethodConf();
        attackMethodConf.SetSkillId(skillID);
        attackMethodConf.SetSourceType(sourceTypeID);
        attackMethodConf.SetSkillLv(skillLv);
        attackMethodConf.SetOptionValueArray(optionArray);

        //  攻撃手段の設定設定を変更
        CAttackMethodAreaComponentManager.SetAttackMethodConf(attackMethodConf);
    }


}

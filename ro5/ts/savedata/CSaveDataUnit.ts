import { CSaveDataUnitAttackConf } from "./CSaveDataUnitAttackConf";
import { CSaveDataUnitAutoSpells } from "./CSaveDataUnitAutoSpells";
import { CSaveDataUnitChara } from "./CSaveDataUnitChara";
import { CSaveDataUnitCharaBuff } from "./CSaveDataUnitCharaBuff";
import { CSaveDataUnitCharaConfBasic } from "./CSaveDataUnitCharaConfBasic";
import { CSaveDataUnitCharaConfSkill } from "./CSaveDataUnitCharaConfSkill";
import { CSaveDataUnitCharaConfSpecBasic } from "./CSaveDataUnitCharaConfSpecBasic";
import { CSaveDataUnitCharaConfSpecialize } from "./CSaveDataUnitCharaConfSpecialize";
import { CSaveDataUnitCharaDebuff } from "./CSaveDataUnitCharaDebuff";
import { CSaveDataUnitEquipArrow } from "./CSaveDataUnitEquipArrow";
import { CSaveDataUnitEquipRegions } from "./CSaveDataUnitEquipRegions";
import { CSaveDataUnitEquipable } from "./CSaveDataUnitEquipable";
import { CSaveDataUnitItemBuff } from "./CSaveDataUnitItemBuff";
import { CSaveDataUnitLearnedSkills } from "./CSaveDataUnitLearnedSkills";
import { CSaveDataUnitMob } from "./CSaveDataUnitMob";
import { CSaveDataUnitMobBuff } from "./CSaveDataUnitMobBuff";
import { CSaveDataUnitMobConfInput } from "./CSaveDataUnitMobConfInput";
import { CSaveDataUnitMobConfPlayer } from "./CSaveDataUnitMobConfPlayer";
import { CSaveDataUnitMobConfPlayer2 } from "./CSaveDataUnitMobConfPlayer2";
import { CSaveDataUnitMobDebuff } from "./CSaveDataUnitMobDebuff";
import { CSaveDataUnitSettings } from "./CSaveDataUnitSettings";
import { CSaveDataUnitSkillBuff1st } from "./CSaveDataUnitSkillBuff1st";
import { CSaveDataUnitSkillBuff2nd } from "./CSaveDataUnitSkillBuff2nd";
import { CSaveDataUnitSkillBuff3rd } from "./CSaveDataUnitSkillBuff3rd";
import { CSaveDataUnitSkillBuff4th } from "./CSaveDataUnitSkillBuff4th";
import { CSaveDataUnitSkillBuffGuild } from "./CSaveDataUnitSkillBuffGuild";
import { CSaveDataUnitSkillBuffMusic } from "./CSaveDataUnitSkillBuffMusic";
import { CSaveDataUnitSkillBuffSelf } from "./CSaveDataUnitSkillBuffSelf";
import { CSaveDataUnitTimeBuff } from "./CSaveDataUnitTimeBuff";
import { CSaveDataUnitTypeManager } from "./CSaveDataUnitTypeManager";
import { CSaveDataUnitVersion } from "./CSaveDataUnitVersion";
/**
 * セーブデータユニットクラス：バージョン情報.
 */
export const TYPE_VERSION = CSaveDataUnitTypeManager.register(CSaveDataUnitVersion);

/**
 * セーブデータユニットクラス：キャラクターステータス.
 */
export const TYPE_CHARA = CSaveDataUnitTypeManager.register(CSaveDataUnitChara);

/**
 * セーブデータユニットクラス：装備可能品.
 * （将来的な持ち替え機能等を見据え、装備位置に依存せず、アイテム単品の性能をまとめて管理する）
 */
export const TYPE_EQUIPABLE = CSaveDataUnitTypeManager.register(CSaveDataUnitEquipable);

/**
 * セーブデータユニットクラス：装備位置.
 * （将来的な持ち替え機能等を見据え、装備位置とアイテム等との対応付けを管理する）
 */
export const TYPE_EQUIP_REGIONS = CSaveDataUnitTypeManager.register(CSaveDataUnitEquipRegions);

/**
 * セーブデータユニットクラス：習得スキル.
 */
export const TYPE_LEARNED_SKILLS = CSaveDataUnitTypeManager.register(CSaveDataUnitLearnedSkills);

/**
 * セーブデータユニットクラス：キャラクターBUFF.
 */
export const TYPE_CHARA_BUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaBuff);

/**
 * セーブデータユニットクラス：自己スキルBUFF.
 */
export const TYPE_SKILL_BUFF_SELF = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuffSelf);

/**
 * セーブデータユニットクラス：一次職スキルBUFF.
 */
export const TYPE_SKILL_BUFF_1ST = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuff1st);

/**
 * セーブデータユニットクラス：二次職スキルBUFF.
 */
export const TYPE_SKILL_BUFF_2ND = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuff2nd);

/**
 * セーブデータユニットクラス：三次職スキルBUFF.
 */
export const TYPE_SKILL_BUFF_3RD = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuff3rd);

/**
 * セーブデータユニットクラス：四次職スキルBUFF.
 */
export const TYPE_SKILL_BUFF_4TH = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuff4th);

/**
 * セーブデータユニットクラス：演奏スキルBUFF.
 */
export const TYPE_SKILL_BUFF_MUSIC = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuffMusic);

/**
 * セーブデータユニットクラス：ギルドスキルBUFF.
 */
export const TYPE_SKILL_BUFF_GUILD = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuffGuild);

/**
 * セーブデータユニットクラス：アイテムBUFF.
 */
export const TYPE_ITEM_BUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitItemBuff);

/**
 * セーブデータユニットクラス：時限効果設定.
 */
export const TYPE_TIME_BUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitTimeBuff);

/**
 * セーブデータユニットクラス：オートスペル設定.
 */
export const TYPE_AUTO_SPELLS = CSaveDataUnitTypeManager.register(CSaveDataUnitAutoSpells);

/**
 * セーブデータユニットクラス：キャラクターDEBUFF.
 */
export const TYPE_CHARA_DEBUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaDebuff);

/**
 * セーブデータユニットクラス：性能カスタマイズ（基本）.
 */
export const TYPE_CHARA_CONF_BASIC = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaConfBasic);

/**
 * セーブデータユニットクラス：性能カスタマイズ（特化）.
 */
export const TYPE_CHARA_CONF_SPECIALIZE = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaConfSpecialize);

/**
 * セーブデータユニットクラス：性能カスタマイズ（スキル）.
 */
export const TYPE_CHARA_CONF_SKILL = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaConfSkill);

/**
 * セーブデータユニットクラス：モンスター設定.
 */
export const TYPE_MOB = CSaveDataUnitTypeManager.register(CSaveDataUnitMob);

/**
 * セーブデータユニットクラス：対プレイヤー設定.
 */
export const TYPE_MOB_CONF_PLAYER = CSaveDataUnitTypeManager.register(CSaveDataUnitMobConfPlayer);

/**
 * セーブデータユニットクラス：対プレイヤー設定2.
 */
export const TYPE_MOB_CONF_PLAYER2 = CSaveDataUnitTypeManager.register(CSaveDataUnitMobConfPlayer2);

/**
 * セーブデータユニットクラス：モンスター手入力欄.
 */
export const TYPE_MOB_CONF_INPUT = CSaveDataUnitTypeManager.register(CSaveDataUnitMobConfInput);

/**
 * セーブデータユニットクラス：敵BUFF.
 */
export const TYPE_MOB_BUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitMobBuff);

/**
 * セーブデータユニットクラス：敵DEBUFF.
 */
export const TYPE_MOB_DEBUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitMobDebuff);

/**
 * セーブデータユニットクラス：戦闘結果情報.
 */
export const TYPE_ATTACK_CONF = CSaveDataUnitTypeManager.register(CSaveDataUnitAttackConf);

/**
 * セーブデータユニットクラス：計算機設定.
 */
export const TYPE_SETTINGS = CSaveDataUnitTypeManager.register(CSaveDataUnitSettings);

/**
 * セーブデータユニットクラス：性能カスタマイズ（特性ステータス）.
 */
export const TYPE_CHARA_CONF_SPEC_BASIC = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaConfSpecBasic);

/**
 * セーブデータユニットクラス：矢.
 */
export const TYPE_EQUIP_ARROW = CSaveDataUnitTypeManager.register(CSaveDataUnitEquipArrow);

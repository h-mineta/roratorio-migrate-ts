// bootstap.ts

import "./loadJSON"
/*
サイト共通系ファイル
*/
import "../../roro/common/js/util.js"
import "./CModalWindow"

/*
デバッグ定義
非デバッグ環境でも読み込む
*/
import "./DEBUG"

/*
共通系 javascript ファイル
*/
import "../../roro/m/js/CInstanceManager.js"
import "../../roro/m/js/CGlobalConstManager.js"
import "../../roro/m/js/CNameKana.js"
import "../../roro/m/js/CCustomSelectBase.js"
import "../../roro/m/js/CCustomSelectMapBase.js"
import "../../roro/m/js/CCustomSelectMapCategory.js"
import "../../roro/m/js/CCustomSelectMapMap.js"
import "../../roro/m/js/CCustomSelectMapMonster.js"
import "../../roro/m/js/common.js"
import "../../roro/m/js/etc.js"

/*
データ定義系 javascript ファイル
*/
import "../../roro/m/js/alias.h.js"
import "../../roro/m/js/alias.dat.js"
import "../../roro/m/js/chara.dat.js"
import "../../roro/m/js/skill.h.js"
import "../../roro/m/js/skill.dat.js"
import "../../roro/m/js/usableskill.h.js"
import "../../roro/m/js/usableskill.dat.js"
import "../../roro/m/js/autospell.h.js"
import "../../roro/m/js/autospell.dat.js"
import "../../roro/m/js/CSkillManager.js"
import "../../roro/m/js/monster.h.js"
import "../../roro/m/js/monster.dat.js"
import "../../roro/m/js/monstergroup.dat.js"
import "../../roro/m/js/monstermap.h.js"
import "../../roro/m/js/monstermap.dat.js"
import "../../roro/m/js/item.h.js"
import "../../roro/m/js/item.dat.js"

/*
追加分：item/pet/cardなど
*/
import "../../roro/m/js/arrow.h.js"
import "../../roro/m/js/arrow.dat.js"
import "../../roro/m/js/card.h.js"
import "../../roro/m/js/card.dat.js"
import "../../roro/m/js/costume.h.js"
import "../../roro/m/js/costume.dat.js"
import "../../roro/m/js/pet.h.js"
import "../../roro/m/js/pet.dat.js"
import "../../roro/m/js/itemset.h.js"
import "../../roro/m/js/itemset.dat.js"
import "../../roro/m/js/rndopt.h.js"
import "../../roro/m/js/rndopt.dat.js"
import "../../roro/m/js/rndoptlist.h.js"
import "../../roro/m/js/rndoptlist.dat.js"
import "../../roro/m/js/rndopttype.h.js"
import "../../roro/m/js/rndopttype.dat.js"
import "../../roro/m/js/timeitem.h.js"
import "../../roro/m/js/timeitem.dat.js"
import "../../roro/m/js/itempack.h.js"
import "../../roro/m/js/itempack.dat.js"

/*
[MIG] データ定義系
*/
//import "./data/mig.job.h.js"
import "../../roro/m/js/data/mig.itemsp.h.js"
import "../../roro/m/js/data/CMigJobData.js"
import "../../roro/m/js/data/CMigStateData.js"
import "../../roro/m/js/data/CMigEquipableSpTag.js"
import "../../roro/m/js/data/CMigEquipableStaticData.js"
import "../../roro/m/js/data/CMigEquipableSpData.js"
import "../../roro/m/js/data/CMigEquipableData.js"
import "../../roro/m/js/data/CMigConstDataManagerSubBase.js"
import "../../roro/m/js/data/CMigConstDataManagerSubJob.js"
import "../../roro/m/js/data/CMigConstDataManagerSubState.js"
import "../../roro/m/js/data/CMigConstDataManagerSubBuff.js"
import "../../roro/m/js/data/CMigConstDataManagerSubMonster.js"
import "../../roro/m/js/data/CMigConstDataManagerSubArrow.js"
import "../../roro/m/js/data/CMigConstDataManagerSubItem.js"
import "../../roro/m/js/data/CMigConstDataManagerSubCard.js"
import "../../roro/m/js/data/CMigConstDataManagerSubEnchList.js"
import "../../roro/m/js/data/CMigConstDataManagerSubRndOpt.js"
import "../../roro/m/js/data/CMigConstDataManager.js"

/*
グローバル変数定義
*/
import "./global"

/*
[MIG] datファイル
*/
//import "./data/mig.job.dat.js"
import "../../roro/m/js/data/mig.enchlist.dat.js"

/*
機能処理系 javascript ファイル
*/
import "./calcautospell"
import "../../roro/m/js/rndench.js"
import "../../roro/m/js/equip.js"
import "../../roro/m/js/learnedskill.js"
import "../../roro/m/js/slotpager.js"
import "../../roro/m/js/spmode.js"
import "../../roro/m/js/quickcontrol.js"

/*
データ管理系 javascript ファイル
*/
import "../../roro/m/js/chara.js"
import "../../roro/m/js/mob.js"
import "../../roro/m/js/CAttackMethodConf.js"

/*
キャラクター設定操作系 javascript ファイル
*/
import "../../roro/m/js/CConfBase.js"
import "../../roro/m/js/CConfBase2.js"
import "../../roro/m/js/CCharaConfIchizi.js"
import "../../roro/m/js/CCharaConfNizi.js"
import "../../roro/m/js/CCharaConfSanzi.js"
import "../../roro/m/js/CCharaConfYozi.js"
import "../../roro/m/js/CCharaConfCustomStatus.js"
import "../../roro/m/js/CCharaConfCustomAtk.js"
import "../../roro/m/js/CCharaConfCustomDef.js"
import "../../roro/m/js/CCharaConfCustomSkill.js"
import "../../roro/m/js/CCharaConfCustomSpecStatus.js"

/*
モンスター設定操作系 javascript ファイル
*/
import "../../roro/m/js/mobconfdebuf.js"
import "../../roro/m/js/mobconfbuf.js"
import "../../roro/m/js/mobconfplayer.js"
import "../../roro/m/js/CMobConfInput.js"

/*
機能処理系 HTML 処理 javascript ファイル
*/
import "../../roro/m/js/CItemInfoManager.js"
import "./hmjob"
import "../../roro/m/js/hmcard.js"
import "../../roro/m/js/hmcostume.js"

import "./CMonsterMapAreaComponentManager"
import "../../roro/m/js/hmrndopt.js"
import "../../roro/m/js/hmchara.js"
import "../../roro/m/js/hmmob.js"
import "../../roro/m/js/castsim.js"
import "./CEnchSearch"

/*
機能処理系 javascript ファイル
*/
import "../../roro/m/js/CTimeItemAreaComponentManager.js"
import "../../roro/m/js/CBattleQuickControlAreaComponentManager.js"
import "../../roro/m/js/CExtraInfoAreaComponentManager.js"
import "../../roro/m/js/CFloatingInfoAreaComponentManager.js"
import "../../roro/m/js/CCalcDataTextCreator.js"

/*
[MIG] 操作処理系 javascript ファイル
*/
import "./CShadowEquipController"

/*
メイン処理系 javascript ファイル
*/
import "./CBattleCalcInfo"
import "./CBattleCalcResult"
import "./CBattleCalcResultAll"
import "./head"

/*
セーブデータ管理系 javascript ファイル
*/
import "../../roro/m/js/CSaveDataMappingManager.js"
import "../../roro/m/js/CSaveDataConverter.js"
import "../../roro/m/js/saveload.js"
import "./savedata/CSaveDataUnit"
import "./CSaveDataManager"
import "./CSaveController"
import "./saveload"

/*
機能処理系 javascript ファイル （この辺の順序整理したい）
*/
import "./CAttackMethodAreaComponentManager"

/*
メイン処理系 javascript ファイル
*/
import "../../roro/m/js/foot.js"

/*
左メニュー用 javascript ファイル
*/
import "./frame"

/* load RODB Translator */
import "./loadRodbTranslator"

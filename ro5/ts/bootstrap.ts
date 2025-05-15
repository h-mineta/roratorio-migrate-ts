// bootstap.ts

import "./loadJSON"
/*
サイト共通系ファイル
*/
import "./CModalWindow"

/*
デバッグ定義
非デバッグ環境でも読み込む
*/
import "./DEBUG"

/*
グローバル変数定義
*/
import "./global"

/*
機能処理系 javascript ファイル
*/
import "./calcautospell"

/*
機能処理系 HTML 処理 javascript ファイル
*/
import "./hmjob"
import "./CMonsterMapAreaComponentManager"
import "./CEnchSearch"

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
import "./savedata/CSaveDataUnit"
import "./CSaveDataManager"
import "./CSaveController"
import "./saveload"

/*
機能処理系 javascript ファイル （この辺の順序整理したい）
*/
import "./CAttackMethodAreaComponentManager"

/*
左メニュー用 javascript ファイル
*/
import "./frame"

/* load RODB Translator */
import "./loadRodbTranslator"

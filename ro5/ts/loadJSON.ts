import { ZSTDDecoder } from 'zstddec';

const zstdDecoder = new ZSTDDecoder();
//--------------------------------------------------------

// SkillMapの型定義
export interface SkillMap {
    _mig_id: string | null;
    _mig_id2: string | null;
    _mig_id_num: number | null;
    _mig_name: string | null;
    attack_range: Record<number, number> | null;
    id: string;
    id_num: number;
    max_lv: number | null;
    name: string | null;
    need_skill_list: {
        need_lv: number;
        skill_id: string;
    }[] | null;
    seperate_lv: boolean | null;
    sp_amount: Record<number, number> | null;
    type: string | null;
}
// ハッシュ型配列
let skillMap: Record<string, SkillMap> = {};

/**
 * id から Skill を取得する関数
 * @param id 検索したいスキルID（例: "NV_BASIC"）
 * @returns Skill オブジェクトまたは undefined（見つからない場合）
 */
export function getSkillMapById(id: string): SkillMap | undefined {
    return skillMap[id];
}

/**
 * id_num から Skill を取得する関数
 * @param num 取得したいスキルの id_num（数値）
 * @returns Skill オブジェクトまたは undefined（見つからない場合）
 */
export function getSkillMapByIdNum(num: number): SkillMap | undefined {
    for (const skill of Object.values(skillMap)) {
        if (skill.id_num === num) {
            return skill;
        }
    }
    return undefined;
}

/**
 * _mig_id から Skill を取得する関数
 * @param num 取得したいスキルの _mig_id2（文字列）
 * @returns Skill オブジェクトまたは undefined（見つからない場合）
 */
export function getSkillMapByMigId(id: string): SkillMap | undefined {
    for (const skill of Object.values(skillMap)) {
        if (skill._mig_id === id) {
            return skill;
        }
    }
    return undefined;
}

/**
 * _mig_id2 から skill.h.jsで定義していた数値を取得する関数
 * @param num 取得したいスキルの _mig_id2（文字列）
 * @returns MIG_IDの数値 または -1（見つからない場合）
 */
export function getMigIdFromSkillMapByMigId2(id: string): number {
    for (const skill of Object.values(skillMap)) {
        if (skill._mig_id2 === id) {
            if (skill._mig_id_num !== null) {
                // _mig_id2が一致し、_mig_id_numがnullでない場合
                return skill._mig_id_num;
            }
            break; // _mig_id_numがnullの場合はスキップ
        }
    }
    return -1;
}

//--------------------------------------------------------

// ItemMapの型定義
export interface ItemMap {
    id: number;
    displayname: string;
    description: string;
    is_card: boolean;
    is_enchant: boolean;
    resname: string;
    type: string | null;
}
// ハッシュ型配列
let itemMap: Record<number, ItemMap> = {};

/*
* id から Item を取得する関数
* @param id 検索したいアイテムID（数値）
* @returns Item オブジェクトまたは undefined（見つからない場合）
*/
export function getItemMapById(id: number): ItemMap | undefined {
    return itemMap[id];
}

/**
 * displayname から Item を取得する関数
 * @param displayName 検索したいアイテム名（完全一致）
 * @returns Item オブジェクトまたは undefined（見つからない場合）
 */
export function getItemMapByDisplayName(displayName: string): ItemMap | undefined {
    for (const item of Object.values(itemMap)) {
        if (item.displayname === displayName) {
            return item;
        }
    }
    return undefined;
}

//--------------------------------------------------------

export interface Job {
    id_name: string, //ID
    id_num: number, //ID Num
    is_doram: boolean, //ドラムかどうか
    _mig_id_name: string, //MIG ID Name
    _mig_id_num: number, //MIG ID Num
    name: string, //名前(英語)
    name_ja: string, //名前(日本語)
    name_ja_alias: string[], //名前(日本語)の別名
    is_rebirthed: boolean, //転生職かどうか
    job_type_num: number, //職業タイプ
    job_type_name: string,  //職業タイプ名
    weight_correction: number, //重量補正
    weapons_aspd: {}, //武器ASPD
    additional_status: {}, //追加ステータス
    hp_basic_values: number[], //基本HP
    sp_basic_values: number[], //基本SP
    learned_skills: number[], //習得スキル
    passive_skills: number[], //パッシブスキル
    attack_skills: number[],  //攻撃スキル
    allow_equipment_weapons_type: number[] //装備可能武器タイプ
}

let jobMap: Record<string, Job> = {};

/**
 * id_name から Job を取得する関数
 * @param idName 検索したい職業ID名（例: "NOVICE"）
 * @returns Job オブジェクトまたは undefined（見つからない場合）
 */
export function getJobMapByIdName(idName: string): Job | undefined {
    return jobMap[idName];
}

/**
 * id_num から Job を取得する関数
 * @param idNum 検索したい職業ID番号
 * @returns Job オブジェクトまたは undefined（見つからない場合）
 */
export function getJobMapByIdNum(idNum: number): Job | undefined {
    for (const job of Object.values(jobMap)) {
        if (job.id_num === idNum) {
            return job;
        }
    }
    return undefined;
}

//--------------------------------------------------------

// ファイル読み込み
async function loadFileAsUint8Array(url: string): Promise<Uint8Array> {
    const response = await fetch(url);
    return new Uint8Array(await response.arrayBuffer());
}

async function loadAllJSON() {
    await zstdDecoder.init();

    let skillCompressed = await loadFileAsUint8Array('json/skills.json.zst');
    let skillDecompressed = zstdDecoder.decode(skillCompressed);
    let skillLines = new TextDecoder('utf-8').decode(skillDecompressed);
    try {
        skillMap = JSON.parse(skillLines);
    } catch (err) {
        console.error('JSON parse error:', err);
    }

    let itemCompressed = await loadFileAsUint8Array('json/items.jsonl.zst');
    let itemDecompressed = zstdDecoder.decode(itemCompressed);
    let itemLines = new TextDecoder('utf-8').decode(itemDecompressed);

    for (const line of itemLines.split('\n')) {
        if (!line.trim()) continue; // 空行スキップ

        try {
            const raw: ItemMap = JSON.parse(line);
            itemMap[raw.id] = raw;
        } catch (err) {
            console.error('JSON parse error:', err);
        }
    }

    let jobCompressed = await loadFileAsUint8Array('json/jobs.json.zst');
    let jobDecompressed = zstdDecoder.decode(jobCompressed);
    let jobLines = new TextDecoder('utf-8').decode(jobDecompressed);
    try {
        jobMap = JSON.parse(jobLines);
    } catch (err) {
        console.error('JSON parse error:', err);
    }
}
loadAllJSON()

import { ZSTDDecoder } from 'zstddec';

const zstdDecoder = new ZSTDDecoder();
//--------------------------------------------------------

// Skillの型定義
export interface Skill {
    name: string | null;
    max_lv: number | null;
    type: string | null;
    seperate_lv: boolean | null;
    sp_amount: Record<number, number> | null;
    attack_range: Record<number, number> | null;
    need_skill_list: any[] | null;
    id_num: number;
    id: string;
}
// ハッシュ型配列
const skillTable: Record<string, Skill> = {};

/**
 * id から Skill を取得する関数
 * @param id 検索したいスキルID（例: "NV_BASIC"）
 * @returns Skill オブジェクトまたは undefined（見つからない場合）
 */
export function getSkillTableById(id: string): Skill | undefined {
    return skillTable[id];
}

/**
 * id_num から Skill を取得する関数
 * @param idNum 取得したいスキルの id_num（数値）
 * @returns Skill オブジェクトまたは undefined（見つからない場合）
 */
export function getSkillTableByIdNum(idNum: number): Skill | undefined {
    for (const skill of Object.values(skillTable)) {
        if (skill.id_num === idNum) {
            return skill;
        }
    }
    return undefined;
}

//--------------------------------------------------------

// Itemの型定義
export interface Item {
    id: number;
    displayname: string;
    description: string;
    is_card: boolean;
    is_enchant: boolean;
    resname: string;
    type: string | null;
}
// ハッシュ型配列
const itemTable: Record<number, Item> = {};

/*
* id から Item を取得する関数
* @param id 検索したいアイテムID（数値）
* @returns Item オブジェクトまたは undefined（見つからない場合）
*/
export function getItemTableById(id: number): Item | undefined {
    return itemTable[id];
}

/**
 * displayname から Item を取得する関数
 * @param displayName 検索したいアイテム名（完全一致）
 * @returns Item オブジェクトまたは undefined（見つからない場合）
 */
export function getItemTableByDisplayName(displayName: string): Item | undefined {
    for (const item of Object.values(itemTable)) {
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

const jobTable: Record<string, Job> = {};

/**
 * id_name から Job を取得する関数
 * @param idName 検索したい職業ID名（例: "NOVICE"）
 * @returns Job オブジェクトまたは undefined（見つからない場合）
 */
export function getJobTableByIdName(idName: string): Job | undefined {
    return jobTable[idName];
}

/**
 * id_num から Job を取得する関数
 * @param idNum 検索したい職業ID番号
 * @returns Job オブジェクトまたは undefined（見つからない場合）
 */
export function getJobTableByIdNum(idNum: number): Job | undefined {
    for (const job of Object.values(jobTable)) {
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

// JSON文字列を安全にパースする関数（nullの場合も考慮）
function parseOptionalJSON<T>(str: string | null): T | null {
    if (str === null) return null;
    try {
        return JSON.parse(str);
    } catch {
        return null;
    }
}


async function loadAllJSON() {
    let skillCompressed = await loadFileAsUint8Array('json/skills.jsonl.zst');
    zstdDecoder.init();
    let skillDecompressed = zstdDecoder.decode(skillCompressed);
    let skillLines = new TextDecoder('utf-8').decode(skillDecompressed);

    for (const line of skillLines.split('\n')) {
        if (!line.trim()) continue;

        const raw = JSON.parse(line);

        raw.sp_amount = parseOptionalJSON<Record<number, number>>(raw.sp_amount);
        raw.attack_range = parseOptionalJSON<Record<number, number>>(raw.attack_range);
        raw.need_skill_list = parseOptionalJSON<any[]>(raw.need_skill_list);

        skillTable[raw.id] = raw as Skill;
    }

    let itemCompressed = await loadFileAsUint8Array('json/items.jsonl.zst');
    zstdDecoder.init();
    let itemDecompressed = zstdDecoder.decode(itemCompressed);
    let itemLines = new TextDecoder('utf-8').decode(itemDecompressed);

    for (const line of itemLines.split('\n')) {
        if (!line.trim()) continue; // 空行スキップ

        try {
            const raw: Item = JSON.parse(line);
            itemTable[raw.id] = raw;
        } catch (err) {
            console.error('JSON parse error:', err);
        }
    }

    let jobCompressed = await loadFileAsUint8Array('json/jobs.jsonl.zst');
    zstdDecoder.init();
    let jobDecompressed = zstdDecoder.decode(jobCompressed);
    let jobLines = new TextDecoder('utf-8').decode(jobDecompressed);

    for (const line of jobLines.split('\n')) {
        if (!line.trim()) continue;
        try {
            const raw: Job = JSON.parse(line);
            jobTable[raw.id_name] = raw;
        } catch (err) {
            console.error('JSON parse error:', err);
        }
    }
}
loadAllJSON()

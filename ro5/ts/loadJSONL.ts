import * as fs from 'fs';
import * as path from 'path';

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
const skillMap: Record<string, Skill> = {};

// ファイル読み込み
let filePath = path.join(__dirname, '../jsonl/skills.jsonl');
let lines = fs.readFileSync(filePath, 'utf-8').split('\n');

for (const line of lines) {
    if (!line.trim()) continue;

    const raw = JSON.parse(line);

    raw.sp_amount = parseOptionalJSON<Record<number, number>>(raw.sp_amount);
    raw.attack_range = parseOptionalJSON<Record<number, number>>(raw.attack_range);
    raw.need_skill_list = parseOptionalJSON<any[]>(raw.need_skill_list);

    skillMap[raw.id] = raw as Skill;
}

/**
 * id から Skill を取得する関数
 * @param id 検索したいスキルID（例: "NV_BASIC"）
 * @returns Skill オブジェクトまたは undefined（見つからない場合）
 */
export function getSkillById(id: string): Skill | undefined {
    return skillMap[id];
}

/**
 * id_num から Skill を取得する関数
 * @param idNum 取得したいスキルの id_num（数値）
 * @returns Skill オブジェクトまたは undefined（見つからない場合）
 */
export function getSkillByIdNum(idNum: number): Skill | undefined {
    for (const skill of Object.values(skillMap)) {
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
const itemMap: Record<number, Item> = {};

// ファイル読み込み
filePath = path.join(__dirname, '../jsonl/items.jsonl');
lines = fs.readFileSync(filePath, 'utf-8').split('\n');

for (const line of lines) {
    if (!line.trim()) continue; // 空行スキップ

    try {
        const raw: Item = JSON.parse(line);
        itemMap[raw.id] = raw;
    } catch (err) {
        console.error('JSON parse error:', err);
    }
}

/**
 * id から Skill を取得する関数
 * @param id 検索したいアイテムID（例: 501）
 * @returns Skill オブジェクトまたは undefined（見つからない場合）
 */
export function getItemById(id: number): Item | undefined {
    return itemMap[id];
}

/**
 * displayname から Item を取得する関数
 * @param name 検索したいアイテム名（完全一致）
 * @returns Item オブジェクトまたは undefined（見つからない場合）
 */
export function getItemByDisplayName(name: string): Item | undefined {
    for (const item of Object.values(itemMap)) {
        if (item.displayname === name) {
            return item;
        }
    }
    return undefined;
}

//--------------------------------------------------------

// JSON文字列を安全にパースする関数（nullの場合も考慮）
function parseOptionalJSON<T>(str: string | null): T | null {
    if (str === null) return null;
    try {
        return JSON.parse(str);
    } catch {
        return null;
    }
}

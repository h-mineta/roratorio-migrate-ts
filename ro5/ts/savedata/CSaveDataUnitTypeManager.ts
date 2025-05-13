import { CSaveDataUnitChara } from "./CSaveDataUnitChara";
import { CSingletonMapper } from "./CSingletonMapper";
/**
 * セーブデータユニットのタイプ値とクラスの対応を管理するクラス.
 */
export class CSaveDataUnitTypeManager {

    /**
     * タイプ値とクラスの関係を管理するシングルトンマッパ.
     */
    static #mapper = new CSingletonMapper();

    /**
     * タイプ値に対応するクラスを登録する.
     * @param {Object} unitClass クラス定義
     * @returns {int} クラス定義の中のタイプ値
     */
    static register(unitClass: typeof CSaveDataUnitChara): number {
        // 既に同一のクラスが定義されている場合は、登録しない
        const registered = this.#mapper.get(String(unitClass.type));
        if (registered == unitClass) {
            return unitClass.type;
        }
        // 登録試行
        try {
            this.#mapper.set(String(unitClass.type), unitClass);
            return unitClass.type;
        } catch (err) {
            throw new Error("Duplicated 'type' property in SaveDataCore.");
        }
    }

    /**
     * タイプ値に対応するクラスを取得する.
     * @param {int|string} type タイプ値
     * @returns {Object} タイプ値に対応するクラス定義
     */
    static getUnitClass(type: number | string): typeof CSaveDataUnitChara {
        return this.#mapper.get(String(type));
    }
}

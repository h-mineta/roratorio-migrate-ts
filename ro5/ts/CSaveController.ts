import { CSaveDataUnitChara } from "./savedata/CSaveDataUnitChara";
import { CSaveDataUnitParse } from "./savedata/CSaveDataUnitParse"
import { CSaveDataUnitTypeManager } from "./savedata/CSaveDataUnitTypeManager"
import { TYPE_SETTINGS } from "./savedata/CSaveDataUnit";
import { calc } from "./head"
import { CSaveDataManager } from "./CSaveDataManager";
/**
 * 計算機メインコントローラクラス.
 */
export class CSaveController {

    /**
     * ストレージタイプ（ローカルストレージ）.
     */
    static get STORAGE_TYPE_LOCALSTORAGE() {
        return "localStorage";
    }

    /**
     * ストレージデータ名（計算機設定）.
     */
    static get STORAGE_NAME_SETTINGS() {
        return "RRTST";
    }

    /**
     * ストレージデータ名（キャラクターデータ）.
     */
    static get STORAGE_NAME_CHARA_DATA() {
        return "RRTCD";
    }

    /**
     * ストレージデータデリミタ（データユニット）.
     */
    static get STORAGE_DATA_DELIMITER_UNIT() {
        return ";";
    }

    /**
     * ストレージデータデリミタ（データプロパティ）.
     */
    static get STORAGE_DATA_DELIMITER_PROP() {
        return ",";
    }

    /**
     * キャラクターデータの数.
     */
    static get CHARA_DATA_COUNT() {
        return 500;
    }

    /**
     * キャラクターデータの名前の文字列長.
     */
    static get CHARA_DATA_NAME_LENGTH() {
        return 40;
    }

    /**
     * キャラクターデータのデフォルト名.
     */
    static get CHARA_DATA_NAME_DEFAULT() {
        return "No Data";
    }



    /**
     * 計算機設定データユニット.
     */
    static #settingDataUnit: CSaveDataUnitChara | null = null;

    /**
     * キャラクターデータの配列.
     */
    static #charaDataArray = (() => {
        const unitArray = [];
        for (let idx = 0; idx < CSaveController.CHARA_DATA_COUNT; idx++) {
            unitArray.push(["", ""]);
        }
        return unitArray;
    })();

    /**
     * 現在の状況を扱っているセーブデータマネージャ.
     */
    static #saveDataManagerCur: any;



    /**
     * データテキストをサニタイジングする.
     * @param {string} dataText データテキスト
     * @returns サニタイズされたデータテキスト
     */
    static sanitizeDataText(dataText: any) {
        const regDataText = /[^-_\.\~a-zA-Z0-9]/g;
        return dataText.replaceAll(regDataText, "");
    }



    /**
     * セーブの名前をエンコードする.
     * @param {string} saveName 入力された名前文字列
     * @returns エンコードされた文字列
     */
    static encodeSaveName(saveName: any) {

        // 名前が未設定の場合は、職業とレベルを設定する
        if (saveName.length == 0) {
            // @ts-expect-error TS(2304): Cannot find name 'GetJobName'.
            saveName = (GetJobName(n_A_JOB) + "(Lv" + n_A_BaseLV + ")");
        }

        // 長すぎる名前を切り捨て
        saveName = saveName.slice(0, CSaveController.CHARA_DATA_NAME_LENGTH);

        // 表現できない文字の置換（コーディング時の仕様では起きないはずだが、拡張性を考慮してチェック）
        for (let idx = 0; idx < saveName.length; idx++) {
            const codePoint = saveName.codePointAt(idx);
            if (codePoint >= (2 ** 24)) {
                saveName[idx] = "?";
            }
        }

        // エンコード
        let nameEncoded = "";
        for (let idx = 0; idx < saveName.length; idx++) {
            const codePoint = saveName.codePointAt(idx);
            // @ts-expect-error TS(2304): Cannot find name 'CSaveDataConverter'.
            const converted = CSaveDataConverter.ConvertNtoSMIG(codePoint, 4);
            nameEncoded += converted;
        }

        return nameEncoded;
    }

    /**
     * セーブの名前をデコードする.
     * @param {string} saveName エンコードされた名前文字列
     * @returns デコードされた文字列
     */
    static decodeSaveName(saveName: any) {

        const codePointArray = [];
        for (let idx = 0; idx < saveName.length; idx += 4) {

            // 該当文字部分をスライス
            const sliced = saveName.slice(idx, idx + 4);
            if (sliced.length != 4) {
                return "復元エラー";
            }

            // コードポイントにデコードして収集
            // @ts-expect-error TS(2304): Cannot find name 'floorBigInt32'.
            const codePoint = floorBigInt32(CSaveDataConverter.ConvertStoNMIG(sliced));
            codePointArray.push(codePoint);
        }

        // 復元して返す
        try {
            return String.fromCodePoint(...codePointArray);
        }
        catch (err) {
            return "復元エラー";
        }
    }

    /**
     * キャラクター名を取得する.
     * @param {int} index 取得するインデックス（０オリジン）
     * @returns {string} キャラクター名
     */
    static getDisplayName(index: any) {

        // ストレージデータ配列の範囲外の場合は、処理不可
        if ((index < 0) || (index >= this.#charaDataArray.length)) {
            return "";
        }

        const charaData = this.#charaDataArray[index];

        let charaName = "";
        if (charaData.length != 2) {
            charaName = CSaveController.CHARA_DATA_NAME_DEFAULT;
        }
        else if (charaData[0].length == 0) {
            charaName = CSaveController.CHARA_DATA_NAME_DEFAULT;
        }
        else {
            charaName = this.decodeSaveName(charaData[0]);
        }

        return ("No." + (index + 1) + ":" + charaName);
    }



    /**
     * 計算機の設定を取得する.
     * @param {string} propName プロパティ名
     * @returns 指定のプロパティ:データがある場合、undefined:データがない場合
     */
    static getSettingProp(propName: any) {
        return this.#settingDataUnit ? this.#settingDataUnit.getProp(propName) : undefined;
    }

    /**
     * 計算機の設定を設定する.
     * @param {string} propName プロパティ名
     * @param {int} propValue プロパティ値
     */
    static setSettingProp(propName: any, propValue: any) {

        if (!this.#settingDataUnit) {
            return;
        }

        this.#settingDataUnit.setProp(propName, propValue);

        // ローカルストレージへ保存
        this.SaveSettingToLocalStorageMIG();
    }

    /**
     * 現在のデータを指定のインデックスにセーブする.
     * @param {int} index セーブするインデックス（０オリジン）
     * @param {string} charaName キャラクター名（空文字列可）
     * @returns {string} セレクトボックス表示用キャラクター名
     */
    static saveCharaData(index: any, charaName: any) {

        // ストレージデータ配列の範囲外の場合は、処理不可
        if ((index < 0) || (index >= this.#charaDataArray.length)) {
            return "";
        }

        // 名前と計算機データをエンコード
        const nameEncoded = this.encodeSaveName(charaName);
        const calcsEncoded = this.encodeToURL();

        // データ上書き
        this.#charaDataArray[index] = [nameEncoded, calcsEncoded];

        // ローカルストレージへ保存
        const ret = CSaveController.SaveToLocalStorageMIG();
        if (!ret) {
            return "";
        }

        return this.getDisplayName(index);
    }

    /**
     * Cookie からセーブデータ文字列を取得する
     * saveload.js@OnClickClipboardSaveData() から呼び出されるデバッグ関数
     * @param {*} index
     * @returns {string[2]} [セーブデータ名, セーブデータ文字列]
     */
    static getSaveData(index: any) {
        // ストレージデータ配列の範囲外の場合は、処理不可
        if ((index < 0) || (index >= this.#charaDataArray.length)) {
            return "";
        }
        // 名前と計算機データを取得
        const charaData = this.#charaDataArray[index];
        const nameDecoded = this.decodeSaveName(charaData[0]);
        const dataURL = charaData[1];
        return [nameDecoded, dataURL];
    }


    /**
     * 指定のインデックスからロードする.
     * @param {int} index ロードするインデックス（０オリジン）
     * @returns {string} キャラクター名
     */
    static loadCharaData(index: any) {

        // ストレージデータ配列の範囲外の場合は、処理不可
        if ((index < 0) || (index >= this.#charaDataArray.length)) {
            return "";
        }

        // 名前と計算機データを取得
        const charaData = this.#charaDataArray[index];
        const nameDecoded = this.decodeSaveName(charaData[0]);
        const dataURL = charaData[1];

        // データがない場合は処理しない
        if (dataURL.length == 0) {
            return "";
        }

        // 計算機データの読み込み
        CSaveController.loadFromURL(dataURL);

        return nameDecoded;
    }

    /**
     * 指定のインデックスを削除する.
     * @param {int} index 削除するインデックス（０オリジン）
     * @returns {string} セレクトボックス表示用キャラクター名
     */
    static deleteCharaData(index: any) {

        // ストレージデータ配列の範囲外の場合は、処理不可
        if ((index < 0) || (index >= this.#charaDataArray.length)) {
            return "";
        }

        // データを初期化
        this.#charaDataArray[index] = ["", ""];

        // ローカルストレージへ保存
        const ret = CSaveController.SaveToLocalStorageMIG();
        if (!ret) {
            return "";
        }

        return this.getDisplayName(index);
    }

    /**
     * URLへデータを出力する.
     * @returns {string} データURL文字列（クエリ部分のみ）
     */
    static encodeToURL() {

        // 再計算
        calc();

        // セーブデータマネージャが存在しない場合は生成（ロードせずに保存する場合など）
        if (!this.#saveDataManagerCur) {
            this.#saveDataManagerCur = new CSaveDataManager();
        }

        // データをエンコード
        let encoded = this.#saveDataManagerCur.encodeToURL();

        // データURL文字列を圧縮（新形式用）
        // @ts-expect-error TS(2304): Cannot find name 'CSaveDataConverter'.
        encoded = CSaveDataConverter.CompressDataTextMIG(encoded);

        return encoded;
    }


    /**
     * URLからデータを読み込む.
     * @param {string} urlText データURL文字列（クエリ部分のみ）
     */
    static loadFromURL(urlText: any) {

        // サニタイジング
        let dataText = this.sanitizeDataText(urlText);

        // ゼロ値圧縮の展開
        // @ts-expect-error TS(2304): Cannot find name 'CSaveDataConverter'.
        dataText = CSaveDataConverter.ExtractDataTextMIG(dataText);

        // モンスター状態異常等のクリア
        // 職業変更など引き継ぎたいケースもあるので、ロード処理のここでクリアする
        if (Array.isArray(n_B_KYOUKA)) {
            n_B_KYOUKA.fill(0);
        }
        if (Array.isArray(n_B_IJYOU)) {
            n_B_IJYOU.fill(0);
        }

        // セーブデータ読み込み
        const saveDataManagerNew = new CSaveDataManager();
        saveDataManagerNew.parseDataText(dataText);
        // 旧形式から移行した場合には、全体のコンパクションが必要なので
        saveDataManagerNew.doCompaction();

        // データ復元
        saveDataManagerNew.applyDataToControls();

        // メンバ変数を置き換え
        this.#saveDataManagerCur = saveDataManagerNew;

        // 再計算
        calc();
    }



    /**
     * ブラウザのローカルストレージが使用可能かを判定する.
     * （MDN参照：https://developer.mozilla.org/ja/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#localstorage_%E3%81%AE%E6%A9%9F%E8%83%BD%E6%A4%9C%E5%87%BA）
     * @param {string} type ストレージタイプ（"localStorage" or "sessionStorage"）
     * @returns true:使用可能、false:使用不可
     */
    static isAvailableBrowserStorage(type: any) {

        try {

            const storage = window[type];

            const x = '__storage_test__';
            // @ts-expect-error TS(2339): Property 'setItem' does not exist on type 'Window'... Remove this comment to see the full error message
            storage.setItem(x, x);
            // @ts-expect-error TS(2339): Property 'removeItem' does not exist on type 'Wind... Remove this comment to see the full error message
            storage.removeItem(x);

            return true;
        }
        catch (e) {
            return false;
        }
    }

    /**
     * ローカルストレージから計算機設定を読み込む.
     */
    static LoadSettingFromLocalStorageMIG() {

        const rrtstAll = localStorage.getItem(CSaveController.STORAGE_NAME_SETTINGS);

        // サニタイジング
        const rrtst = this.sanitizeDataText(rrtstAll);

        // パース
        const parser = new CSaveDataUnitParse();
        parser.parse(rrtst, 0);

        // ローカルストレージが空の場合は初期化する
        const loadedUnit = parser.saveDataUnitArray[0];
        if (loadedUnit != null) {
            this.#settingDataUnit = loadedUnit;
        } else {
            this.#settingDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(TYPE_SETTINGS))();
            this.#settingDataUnit.SetUpAsDefault();
        }
    }

    /**
     * ローカルストレージへ計算機設定を保存する.
     * @returns true:成功、false:失敗
     */
    static SaveSettingToLocalStorageMIG() {

        // 計算機設定データを保存
        if (!this.#settingDataUnit) {
            return false;
        }

        const [dataText, indexOffset] = this.#settingDataUnit.encodeToURL("", 0);
        try {
            localStorage.setItem(CSaveController.STORAGE_NAME_SETTINGS, dataText);
        }
        catch (err) {
            return false;
        }

        return true;
    }

    /**
     * ローカルストレージからデータを読み込む.
     * @returns （なし）
     */
    static LoadFromLocalStorageMIG() {

        // ローカルストレージが使用不可の場合、処理しない
        if (!this.isAvailableBrowserStorage(CSaveController.STORAGE_TYPE_LOCALSTORAGE)) {
            return;
        }

        // キャラクターデータ読み込み
        const rrtcdAll = localStorage.getItem(CSaveController.STORAGE_NAME_CHARA_DATA);
        const rrtcdArray = (rrtcdAll ? rrtcdAll.split(CSaveController.STORAGE_DATA_DELIMITER_UNIT) : []);

        // データを補正し、余白をトリム
        for (let idx = 0; idx < this.#charaDataArray.length; idx++) {

            // ストレージから読み取ったデータがない場合、処理しない
            if (idx >= rrtcdArray.length) {
                break;
            }
            if (rrtcdArray[idx] == null) {
                continue;
            }

            // データがある場合、名前データとセーブデータを分離する
            const splitted = rrtcdArray[idx].split(CSaveController.STORAGE_DATA_DELIMITER_PROP);

            // データがおかしい場合は、次へ
            if (splitted.length != 2) {
                continue;
            }

            // データ保持
            let nameData = splitted[0];
            let saveData = splitted[1];

            // サニタイジング
            nameData = this.sanitizeDataText(nameData);
            saveData = this.sanitizeDataText(saveData);

            // 配列データとして追加して、次へ
            this.#charaDataArray[idx] = [nameData, saveData];
        }
    }

    /**
     * ローカルストレージへデータを保存する.
     * @returns true:成功、false:失敗
     */
    static SaveToLocalStorageMIG() {

        // ローカルストレージが使用不可の場合、処理しない
        if (!this.isAvailableBrowserStorage(CSaveController.STORAGE_TYPE_LOCALSTORAGE)) {
            return false;
        }

        // キャラクターデータを保存
        const rrtsdTextArray = [];
        for (let idx = 0; idx < this.#charaDataArray.length; idx++) {

            const propArray = [];

            // 名前、セーブデータを追加
            propArray.push(this.#charaDataArray[idx][0]);
            propArray.push(this.#charaDataArray[idx][1]);

            // 全プロパティを結合
            const propText = propArray.join(CSaveController.STORAGE_DATA_DELIMITER_PROP);

            // 全体テキスト配列に追加
            rrtsdTextArray.push(propText);
        }

        // 全体を結合
        const rrtsdText = rrtsdTextArray.join(CSaveController.STORAGE_DATA_DELIMITER_UNIT);

        // ストレージに設定
        try {
            localStorage.setItem(CSaveController.STORAGE_NAME_CHARA_DATA, rrtsdText);
        }
        catch (err) {
            return false;
        }

        return true;
    }


    static getSaveDataManagerCur() {
        return this.#saveDataManagerCur;
    }

    static setSaveDataManagerCur(manager: any) {
        this.#saveDataManagerCur = manager;
    }

    /**
     * ローカルストレージに保存されている全セーブデータをテキストファイルにエクスポートする
     * @returns
     */
    static exportAllCharaData() {
        // ローカルストレージが使用不可の場合、処理しない
        if (!this.isAvailableBrowserStorage(CSaveController.STORAGE_TYPE_LOCALSTORAGE)) {
            return;
        }
        const dataText = localStorage.getItem(CSaveController.STORAGE_NAME_CHARA_DATA);	// 全セーブデータが結合された文字列
        if (dataText) {
            const saveData = new Blob([`#ratoriohub-savedata#\n${dataText}`], { type: "text/plain" });
            let a = document.createElement("a");
            a.href = URL.createObjectURL(saveData);
            a.download = "ratoriohub.txt";
            a.click();
        }
    }

    /**
     * テキストファイルに保存された全セーブデータをローカルストレージにインポートする
     * @returns
     */
    static importAllCharaData() {
        // ローカルストレージが使用不可の場合、処理しない
        if (!this.isAvailableBrowserStorage(CSaveController.STORAGE_TYPE_LOCALSTORAGE)) {
            return;
        }
        let input = document.createElement("input");
        input.type = "file";
        input.onchange = function (e) {
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            const file = e.target.files[0]
            let reader = new FileReader();
            reader.onload = function (ev) {
                // @ts-expect-error TS(2531): Object is possibly 'null'.
                const saveData = ev.target.result.split("\n");
                if (saveData[0] === "#ratoriohub-savedata#") {
                    if (confirm("【重要】ブラウザに保存されているROラトリオHUBの全てのセーブデータが、選択したファイルの内容で上書きされます。\n\nこの操作は元に戻すことができません。本当に読み込みますか？")) {
                        localStorage.setItem(CSaveController.STORAGE_NAME_CHARA_DATA, saveData[1]);
                        location.reload();
                    }
                } else {
                    alert("指定されたセーブデータファイルが不正です。読み込めません。");
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }

}

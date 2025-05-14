/**
 * 計算機の状態をCookieにセーブ、あるいはロードする
 */

// Cookie操作用ユーティリティ
const Cookie = {
    get(name: string): string | null {
        const match = document.cookie.match(new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : null;
    },
    set(name: string, value: string, days = 365) {
        const expires = new Date();
        expires.setDate(expires.getDate() + days);
        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    /**
     * ----------------------------------------
     * カスタム表示の処理
     * ----------------------------------------
     */
    const custom_display_ids = [
        "OBJID_FLOATING_INFO_AREA_EXTRACT_CHECKBOX",
        "OBJID_SELECT_FLOATING_INFO_AREA_COUNT",
        "OBJID_SELECT_FLOATING_INFO_AREA_FONT_SIZE",
        "OBJID_SELECT_FLOATING_INFO_0", "OBJID_SELECT_EXTRA_INFO_1",
        "OBJID_SELECT_FLOATING_INFO_1", "OBJID_SELECT_EXTRA_INFO_2",
        "OBJID_SELECT_FLOATING_INFO_2", "OBJID_SELECT_EXTRA_INFO_3",
        "OBJID_SELECT_FLOATING_INFO_3", "OBJID_SELECT_EXTRA_INFO_4",
        "OBJID_SELECT_FLOATING_INFO_4", "OBJID_SELECT_EXTRA_INFO_5",
    ];
    let custom_display_status: any = [];

    const bake_custom_display = () => {
        Cookie.set("custom-display", custom_display_status.join(":"), 365);
    };

    // Cookieからロード
    const customDisplayCookie = Cookie.get("custom-display");
    if (customDisplayCookie) {
        custom_display_status = customDisplayCookie.split(":");
        if (~~custom_display_status[0]) {
            const el = document.getElementById(custom_display_ids[0]) as HTMLInputElement;
            if (el && !el.checked) el.click();
        }
        for (let i = 1; i < custom_display_status.length; i++) {
            const el = document.getElementById(custom_display_ids[i]) as HTMLInputElement | HTMLSelectElement;
            if (el) {
                if ("value" in el) el.value = custom_display_status[i];
                el.dispatchEvent(new Event("change"));
            }
        }
    }

    // チェックボックスクリック
    document.getElementById("OBJID_FLOATING_INFO_AREA_EXTRACT_CHECKBOX")?.addEventListener("click", (e: Event) => {
        const target = e.target as HTMLInputElement;
        custom_display_status[0] = target.checked ? 1 : 0;
        if (target.checked) {
            const countEl = document.getElementById("OBJID_SELECT_FLOATING_INFO_AREA_COUNT") as HTMLInputElement | HTMLSelectElement;
            const fontSizeEl = document.getElementById("OBJID_SELECT_FLOATING_INFO_AREA_FONT_SIZE") as HTMLInputElement | HTMLSelectElement;
            custom_display_status[1] = countEl?.value ?? "";
            custom_display_status[2] = fontSizeEl?.value ?? "";
        }
        bake_custom_display();
    });

    // カウント変更
    document.getElementById("OBJID_SELECT_FLOATING_INFO_AREA_COUNT")?.addEventListener("change", (e: Event) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        custom_display_status[1] = target.value;
        const count = parseInt(target.value);
        custom_display_status = custom_display_status.slice(0, 3 + 2 * count);
        for (let i = 3; i < 3 + 2 * count; i++) {
            const el = document.getElementById(custom_display_ids[i]) as HTMLInputElement | HTMLSelectElement;
            custom_display_status[i] = el?.value || 0;
        }
        bake_custom_display();
    });

    // フォントサイズ変更
    document.getElementById("OBJID_SELECT_FLOATING_INFO_AREA_FONT_SIZE")?.addEventListener("change", (e: Event) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        custom_display_status[2] = target.value;
        bake_custom_display();
    });

    // 各表示項目の変更
    for (let i = 0; i < 5; i++) {
        const idx = i;
        document.getElementById(`OBJID_SELECT_FLOATING_INFO_${i}`)?.addEventListener("change", (e: Event) => {
            const target = e.target as HTMLInputElement | HTMLSelectElement;
            custom_display_status[3 + 2 * idx] = target.value;
            const extraEl = document.getElementById(`OBJID_SELECT_EXTRA_INFO_${idx + 1}`) as HTMLInputElement | HTMLSelectElement;
            custom_display_status[3 + 2 * idx + 1] = extraEl?.value || 0;
            bake_custom_display();
        });
        document.getElementById(`OBJID_SELECT_EXTRA_INFO_${i + 1}`)?.addEventListener("change", (e: Event) => {
            const target = e.target as HTMLInputElement | HTMLSelectElement;
            custom_display_status[3 + 2 * idx + 1] = target.value;
            bake_custom_display();
        });
    }

    /**
     * ----------------------------------------
     * アイテム情報の処理
     * ----------------------------------------
     */
    const item_info_ids = [
        "OBJID_ITEM_INFO_EXTRACT_CHECKBOX",
        "OBJID_CHECK_ITEM_INFO_AUTO_FLAG",
        "OBJID_CHECK_ITEM_INFO_APPLY_AUTO_FOCUS_FLAG",
    ];
    let item_info_status: any = [];

    const bake_item_info = () => {
        Cookie.set("item_info", item_info_status.join(":"), 365);
    };

    // Cookieからアイテム情報の状態をロード
    const itemInfoCookie = Cookie.get("item_info");
    if (itemInfoCookie) {
        item_info_status = itemInfoCookie.split(":");
        for (let i = 0; i < item_info_status.length; i++) {
            const el = document.getElementById(item_info_ids[i]) as HTMLInputElement;
            if (!el) continue;
            // ロードされた状態がチェック済み かつ 現在の状態が未チェックの場合
            if (item_info_status[i] === "1" && !el.checked) {
                el.click();
            }
            // ロードされた状態が未チェック かつ 現在の状態がチェック済みの場合
            else if (item_info_status[i] === "0" && el.checked) {
                el.click();
            }
        }
    }

    // アイテム情報チェックボックス
    document.getElementById("OBJID_ITEM_INFO_EXTRACT_CHECKBOX")?.addEventListener("click", (e: Event) => {
        const target = e.target as HTMLInputElement;
        item_info_status[0] = target.checked ? 1 : 0;
        const autoFlag = document.getElementById("OBJID_CHECK_ITEM_INFO_AUTO_FLAG") as HTMLInputElement;
        const focusFlag = document.getElementById("OBJID_CHECK_ITEM_INFO_APPLY_AUTO_FOCUS_FLAG") as HTMLInputElement;
        item_info_status[1] = autoFlag?.checked ? 1 : 0;
        item_info_status[2] = focusFlag?.checked ? 1 : 0;
        bake_item_info();
    });

    document.getElementById("OBJID_CHECK_ITEM_INFO_AUTO_FLAG")?.addEventListener("click", (e: Event) => {
        item_info_status[0] = 1;
        const target = e.target as HTMLInputElement;
        item_info_status[1] = target.checked ? 1 : 0;
        const focusFlag = document.getElementById("OBJID_CHECK_ITEM_INFO_APPLY_AUTO_FOCUS_FLAG") as HTMLInputElement;
        item_info_status[2] = focusFlag?.checked ? 1 : 0;
        bake_item_info();
    });

    document.getElementById("OBJID_CHECK_ITEM_INFO_APPLY_AUTO_FOCUS_FLAG")?.addEventListener("click", (e: Event) => {
        item_info_status[0] = 1;
        const target = e.target as HTMLInputElement;
        const autoFlag = document.getElementById("OBJID_CHECK_ITEM_INFO_AUTO_FLAG") as HTMLInputElement;
        item_info_status[1] = autoFlag?.checked ? 1 : 0;
        item_info_status[2] = target.checked ? 1 : 0;
        bake_item_info();
    });
});

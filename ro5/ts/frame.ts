const last_updated = "2025/05/10 05:30";

// 背景色切替
let g_BGColorSwitch = false;
function SwitchBGColor() {
    const objBodies = document.getElementsByTagName("body");
    g_BGColorSwitch = !g_BGColorSwitch;
    for (let index = 0; index < objBodies.length; index++) {
        const objBody = objBodies[index];
        if (g_BGColorSwitch) {
            objBody.setAttribute("class", "CLS_BODY_ALTERNATIVE");
        } else {
            objBody.removeAttribute("class");
        }
    }
}

// オリジナル版とFork版の判定
let sitename = "ROラトリオHub"
let formurl = "https://docs.google.com/forms/d/e/1FAIpQLSfP7hZkIInuBIvlDKf3L66fQ4DGzP3DUAbGPeTwTc3B-y7AKg/viewform"
if (window.location.hostname !== "roratorio-hub.github.io") {
    sitename += "<br>- 開発デモ版 -"
    formurl += `?entry.1590472346=ラトリオHUB以外から遷移しています`
}

let templ = `
<aside id="sidebar" class="sidebar">
  <div class="sidebar-layout">
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <div>RH</div>
        <h5>${sitename}</h5>
      </div>
    </div>
    <div class="sidebar-content">
      <nav class="menu">
        <ul>
          <li class="menu-header"><span>Main</span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../ro4/m/calcx.html">計算機</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../roro/other/itemlist.html">アイテム一覧</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../roro/other/cardlist.html">カード一覧</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../roro/other/petlist.html">ペット一覧</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../roro/other/monsterlist.html">モンスター一覧</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../roro/other/exp.html">経験値テーブル</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../roro/other/jobb.html">JOBボーナス表</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../roro/other/element.html">属性表</a></span></li>

          <li class="menu-header"><span>Information</span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../information/index.html" class="local">このサイトについて</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../information/todo.html" class="local">今後の予定</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../information/history/index.html" class="local">更新履歴</a></span></li>
          <!--<li class="menu-item"><span class="menu-title"><a href="../../information/alert/index.html" class="local">不具合のお知らせ</a></span></li>-->
          <li class="menu-item"><span class="menu-title"><a href="../../information/wanted/index.html" class="local">[募集] スキル情報</a></span></li>

          <li class="menu-header" style="padding-top: 10px"><span>Contact Us</span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../information/response/index.html" class="local">Q&amp;A</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="${formurl}">Googleフォーム</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="https://discord.gg/wcKE7PkQ9x">Discord</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="https://github.com/roratorio-hub/ratorio">Github</a></span></li>

          <li class="menu-header" style="padding-top: 10px"><span>Link</span></li>
          <li class="menu-item"><span class="menu-title"><a href="https://roratorio-hinanjo.net/roro/main/main.html">ROラトリオ避難所</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="http://roratorio.2-d.jp/ro/">ROラトリオ</a></span></li>

          <li class="menu-header" style="padding-top: 20px"><span>Updated</span></li>
          <li class="menu-item"><span class="menu-title">${last_updated}</span></li>
        </ul>
      </nav>
    </div>
        <input type="button" value="背景色切替" onclick="SwitchBGColor()" style="margin-top: 3em;">
        </div>
</aside>
<div class="modal-container">
  <div class="modal-body">
    <button type="button" class="modal-close">close</button>
    <div class="modal-content">
      <iframe></iframe>
    </div>
  </div>
</div>
`;

document.addEventListener("DOMContentLoaded", () => {
    // サイドバー挿入
    const frameElem = document.getElementById("ID_FRAME");
    if (frameElem) {
        frameElem.insertAdjacentHTML("beforeend", templ);
    }

    // モーダルリンクのクリックイベント
    document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        // サイドバーやトースト内の .local リンク
        if (target.matches(".sidebar a.local, .update-toast a.local")) {
            event.preventDefault();
            const href = target.getAttribute("href");
            const iframe = document.querySelector('.modal-container iframe') as HTMLIFrameElement;
            if (iframe && href) {
                iframe.src = href;
            }
            document.querySelector('.modal-container')?.classList.toggle("active");
        }
        // モーダル外クリックで閉じる
        else if (!target.closest('.modal-body') && document.querySelector('.modal-container.active')) {
            document.querySelector('.modal-container')?.classList.remove('active');
        }
    });

    // モーダルクローズボタン
    const modalClose = document.querySelector(".modal-close");
    if (modalClose) {
        modalClose.addEventListener("click", () => {
            document.querySelector('.modal-container')?.classList.toggle("active");
        });
    }

    // 更新トースト
    if (typeof (window as any).CSaveController !== "undefined") {
        const CSaveController = (window as any).CSaveController;
        if (CSaveController.isAvailableBrowserStorage(CSaveController.STORAGE_TYPE_LOCALSTORAGE)) {
            const save_updated = localStorage.getItem("last_updated");
            if (save_updated && save_updated < last_updated) {
                // jQueryの$.toastの代替（必要に応じてカスタム実装が必要）
                showToast(
                    "前回アクセス以降に更新があります",
                    '<span class="update-toast"><a href="../../information/history/index.html" class="local">更新履歴</a> から詳細を確認してください</span>'
                );
            }
            localStorage.setItem("last_updated", last_updated);
        }
    }
});

// 簡易トースト表示（必要に応じてカスタマイズ）
function showToast(heading: string, html: string) {
    const toast = document.createElement("div");
    toast.className = "custom-toast";
    toast.innerHTML = `<strong>${heading}</strong><div>${html}</div>`;
    Object.assign(toast.style, {
        position: "fixed",
        left: "50%",
        bottom: "40px",
        transform: "translateX(-50%)",
        background: "#00d1b2",
        color: "#000",
        padding: "16px 24px",
        borderRadius: "8px",
        zIndex: "9999",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        fontSize: "1em",
        maxWidth: "90vw",
        textAlign: "center",
    });
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

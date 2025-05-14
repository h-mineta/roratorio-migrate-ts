import { CSaveController } from "./CSaveController";

// jQueryを使わずにDOM操作
document.addEventListener("DOMContentLoaded", () => {
    const buildForm = () => {
        // HTML挿入
        const attackSettingBlock = document.getElementById("OBJID_ATTACK_SETTING_BLOCK_MIG");
        if (!attackSettingBlock) return;

        // クリップボタンなどのパネル
        const panel = document.createElement("div");
        panel.innerHTML = `
<div style="margin-left:1em;width:4em">
<input type="button" id="history_clip" value="Clip" style="width:100%"><br>
<label style="font-size:x-small;white-space: nowrap;"><input type="checkbox" id="clip_with_memo">memo</label>
<input type="button" id="history_list" value="List" style="margin-top:0.5em;width:100%;font-size:x-small;">
<input type="button" id="history_reset" value="Reset" style="margin-top:1.5em;width:100%">
</div>
<div id="history_container" style="margin-left:1em;padding:0px 5px;height:7em;width:40em">
  <canvas id="history_graph"></canvas>
</div>
<style>
.jquery-modal.blocker {
  z-index: 100 !important;
}
#clip_modal {
  min-width: 800px;
}
#clip_modal_table {
  width: 100%;
  border-collapse: collapse;
}
#clip_modal_table tr{
  border-bottom: 1px solid lightgray;
}
.col {
  width: 7rem;
  text-align: right;
  padding-right: 1rem;
}
.col.no {
  width: 3rem;
}
.col.memo {
  width: unset;
  text-align: left;
  padding: unset;
}
.col.action {
  width: 4.5rem;
  padding-right: unset;
}
.clip_memo {
  width: 100%;
}
div.clip_memo {
  cursor: pointer;
  min-height: 1.5rem;
}
</style>
<div id="clip_modal" class="modal" style="display:none;">
  <table id="clip_modal_table">
    <thead><tr>
        <th class="col no">No.</th><th class="col">DPS</th>
        <th class="col">確殺</th>
        <th class="col memo">メモ</th>
        <th class="col action"></th>
    </tr></thead>
    <tbody></tbody>
  </table>
</div>
        `;
        attackSettingBlock.insertAdjacentElement("afterend", panel);

        let target = 0;
        const data = {
            labels: [] as (number | string)[],
            datasets: [{
                label: "DPS",
                data: [],
                borderColor: "#005AFF",
                yAxisID: "y",
                metadata: [] as any[]
            }, {
                label: "確殺",
                data: [],
                borderColor: "#FF4B00",
                yAxisID: "y1",
            }, {
                label: "通常",
                data: [],
                borderColor: "#4DC4FF",
                yAxisID: "y",
            }, {
                label: "1ｻｲｸﾙﾀﾞﾒ",
                data: [],
                borderColor: "#03AF7A",
                yAxisID: "y",
                hidden: true,
            }]
        }
        const footer = (items: any) => {
            return items[0].dataset.metadata[items[0].parsed.x].memo;
        };
        const ctx = document.getElementById("history_graph") as HTMLCanvasElement;
        // @ts-expect-error TS(2552): Cannot find name 'Chart'. Did you mean 'chart'?
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: "right"
                    },
                    tooltip: {
                        callbacks: {
                            footer: footer,
                        }
                    },
                },
                stacked: false,
                scales: {
                    y: {
                        type: "linear",
                        display: true,
                        position: "left",
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                    y1: {
                        type: "linear",
                        display: true,
                        position: "right",
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                },
                onClick: (e: any) => {
                    // @ts-expect-error TS(2552): Cannot find name 'Chart'. Did you mean 'chart'?
                    const canvasPosition = Chart.helpers.getRelativePosition(e, chart);
                    const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
                    if (chart.data.datasets[0].data.length > dataX) {
                        const url = chart.data.datasets[0].metadata[Math.abs(dataX)]["url"];
                        CSaveController.loadFromURL(url);
                        CItemInfoManager.OnClickExtractSwitch();
                        // @ts-expect-error TS(2304): Cannot find name 'LoadSelect2'.
                        LoadSelect2();
                    }
                }
            }
        });

        // クリップボタン
        document.getElementById("history_clip")?.addEventListener("click", () => {
            const monsterSelect = document.querySelector<HTMLInputElement>(".OBJID_MONSTER_MAP_MONSTER");
            const monsterVal = monsterSelect?.value ?? "";
            if (target != Number(monsterVal)) {
                chart.data.labels = [];
                chart.data.datasets[0].data = [];
                chart.data.datasets[0].metadata = [];
                chart.data.datasets[1].data = [];
                chart.data.datasets[2].data = [];
                chart.data.datasets[3].data = [];
                target = monsterVal as any;
            }
            const metadata = { "memo": "", "url": CSaveController.encodeToURL() };
            const memoCheckbox = document.getElementById("clip_with_memo") as HTMLInputElement;
            if (memoCheckbox?.checked) {
                const memo = prompt("clipメモ");
                if (memo) metadata["memo"] = memo;
            }
            chart.data.labels.push(chart.data.labels.length + 1);

            // DPS
            const dpsElem = document.getElementById("BTLRSLT_PART_ATKCNT");
            let dps = 0;
            if (dpsElem) {
                let el: HTMLElement | null = dpsElem;
                for (let i = 0; i < 4; i++) el = el?.parentElement?.previousElementSibling as HTMLElement;
                if (el) dps = parseFloat(el.textContent?.replaceAll(",", "") ?? "0");
            }
            chart.data.datasets[0].data.push(isNaN(dps) ? 0 : dps);
            chart.data.datasets[0].metadata.push(metadata);

            // 確殺
            const expElem = document.getElementById("BTLRSLT_PART_EXP");
            let cnt = 0;
            if (expElem) {
                let el: HTMLElement | null = expElem;
                for (let i = 0; i < 2; i++) el = el?.parentElement?.previousElementSibling as HTMLElement;
                if (el) cnt = parseInt(el.textContent?.replaceAll(",", "") ?? "0");
            }
            chart.data.datasets[1].data.push(isNaN(cnt) ? 0 : cnt);

            // 通常・1サイクルダメ
            const btlrsltDamage = document.getElementById("BATTLE_RESULT_DAMAGE");
            let dmg = 0, cycle = 0;
            if (btlrsltDamage) {
                const totals = Array.from(btlrsltDamage.getElementsByClassName("BTLRSLT_DAMAGE_TOTAL"));
                const details = Array.from(btlrsltDamage.getElementsByClassName("BTLRSLT_DAMAGE_DETAIL"));
                const dmg_index = totals.length / 3;
                if (totals[dmg_index]) dmg = parseFloat((totals[dmg_index] as HTMLElement).textContent?.replaceAll(",", "") ?? "0");
                const cycle_index = dmg_index + totals.length / 3 / 2;
                if (details[cycle_index]) cycle = parseFloat((details[cycle_index] as HTMLElement).textContent?.replaceAll(",", "") ?? "0");
            }
            chart.data.datasets[2].data.push(isNaN(dmg) ? 0 : dmg);
            chart.data.datasets[3].data.push(isNaN(cycle) ? 0 : cycle);
            chart.update();
        });

        // リセットボタン
        document.getElementById("history_reset")?.addEventListener("click", () => {
            chart.data.labels = [];
            chart.data.datasets[0].data = [];
            chart.data.datasets[0].metadata = [];
            chart.data.datasets[1].data = [];
            chart.data.datasets[2].data = [];
            chart.data.datasets[3].data = [];
            target = 0;
            chart.update();
        });

        // リストボタン
        document.getElementById("history_list")?.addEventListener("click", () => {
            const graph = document.getElementById("history_graph");
            const table = document.getElementById("clip_modal_table");
            if (graph && table) table.parentElement?.insertBefore(graph, table);
            reload_history_table();
            // モーダル表示
            const modal = document.getElementById("clip_modal");
            if (modal) modal.style.display = "";
        });

        // モーダル閉じる
        document.getElementById("clip_modal")?.addEventListener("modal:before-close", () => {
            const graph = document.getElementById("history_graph");
            const container = document.getElementById("history_container");
            if (graph && container) container.appendChild(graph);
            const modal = document.getElementById("clip_modal");
            if (modal) modal.style.display = "none";
        });
        // テーブル操作
        function flip_clip(i: number, j: number) {
            [data.datasets[0].data[i], data.datasets[0].data[j]] = [data.datasets[0].data[j], data.datasets[0].data[i]];
            if (data.datasets[0].metadata) {
                [data.datasets[0].metadata[i], data.datasets[0].metadata[j]] = [data.datasets[0].metadata[j], data.datasets[0].metadata[i]];
            }
            [data.datasets[1].data[i], data.datasets[1].data[j]] = [data.datasets[1].data[j], data.datasets[1].data[i]];
            [data.datasets[2].data[i], data.datasets[2].data[j]] = [data.datasets[2].data[j], data.datasets[2].data[i]];
            [data.datasets[3].data[i], data.datasets[3].data[j]] = [data.datasets[3].data[j], data.datasets[3].data[i]];
        }

        function reload_history_table() {
            const tbody = document.querySelector("#clip_modal_table tbody");
            if (!tbody) return;
            tbody.innerHTML = "";
            for (let i = 0; i < data.labels.length; i++) {
                const meta = data.datasets?.[0]?.metadata?.[i];
                const tr = document.createElement("tr");
                tr.innerHTML = `
                <td class="col no">${data.labels[i]?.toLocaleString?.() ?? ""}</td>
                <td class="col">${(data.datasets?.[0]?.data?.[i] as number)?.toLocaleString?.() ?? ""}</td>
                <td class="col">${(data.datasets?.[1]?.data?.[i] as number)?.toLocaleString?.() ?? ""}</td>
                <td class="col memo"><div class="clip_memo">${meta?.memo ?? ""}</div><input type="text" class="clip_memo" style="display:none;" value="${meta?.memo ?? ""}"></td>
                <td class="col action"><button class="up_clip" ${i == 0 ? "disabled" : ""}>↑</button><button class="down_clip"${i == data.labels.length - 1 ? "disabled" : ""}>↓</button><button class="remove_clip">×</button></td>
              `;
                tbody.appendChild(tr);
            }
        }

        // メモ編集
        document.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains("clip_memo") && target.tagName === "DIV") {
                target.style.display = "none";
                const input = target.nextElementSibling as HTMLInputElement;
                if (input) {
                    input.style.display = "";
                    input.focus();
                }
            }
            if (target.classList.contains("up_clip")) {
                const row = target.closest("tr");
                if (row && row.previousElementSibling) {
                    const index = row.rowIndex - 1;
                    flip_clip(index, index - 1);
                    chart.update();
                    reload_history_table();
                }
            }
            if (target.classList.contains("down_clip")) {
                const row = target.closest("tr");
                if (row && row.nextElementSibling) {
                    const index = row.rowIndex - 1;
                    flip_clip(index, index + 1);
                    chart.update();
                    reload_history_table();
                }
            }
            if (target.classList.contains("remove_clip")) {
                const row = target.closest("tr");
                if (row) {
                    const index = row.rowIndex - 1;
                    data.labels.pop();
                    data.datasets[0].data.splice(index, 1);
                    if (data.datasets[0].metadata) {
                        data.datasets[0].metadata.splice(index, 1);
                    }
                    data.datasets[1].data.splice(index, 1);
                    data.datasets[2].data.splice(index, 1);
                    data.datasets[3].data.splice(index, 1);
                    chart.update();
                    reload_history_table();
                }
            }
        });

        document.addEventListener("change", (e) => {
            const target = e.target as HTMLInputElement;
            if (target.classList.contains("clip_memo")) {
                const row = target.closest("tr");
                if (row) {
                    const index = row.rowIndex - 1;
                    if (
                        data.datasets[0].metadata &&
                        Array.isArray(data.datasets[0].metadata) &&
                        typeof data.datasets[0].metadata[index] !== "undefined" &&
                        data.datasets[0].metadata[index] !== undefined
                    ) {
                        if (data.datasets[0].metadata[index]) {
                            data.datasets[0].metadata[index]["memo"] = target.value;
                            chart.update();
                            reload_history_table();
                        }
                    }
                }
            }
        });

        document.addEventListener("blur", (e) => {
            const target = e.target as HTMLInputElement;
            if (target.classList.contains("clip_memo")) {
                target.style.display = "none";
                const div = target.previousElementSibling as HTMLDivElement;
                if (div) div.style.display = "";
            }
        }, true);
    };
    buildForm();
});

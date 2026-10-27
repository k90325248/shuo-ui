---
title: "Skills"
description: "安裝 Shuo UI 的 skill，讓 AI coding agent 熟悉元件、表單驗證與全站設定的寫法。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/getting-started/agents/skills"
---
# Skills

> 安裝 Shuo UI 的 skill，讓 AI coding agent 熟悉元件、表單驗證與全站設定的寫法。

## 什麼是 Skills？

Skills 是結構化的知識檔案，提供 AI coding agent 關於函式庫、框架或程式碼庫的 context。agent 會直接把 skill 載入 context，在整段對話中隨時參考。

Shuo UI 提供一個**使用 skill**，教 AI agent 用 Shuo UI 撰寫表單與查詢頁面。

## 使用方式

使用 skill 讓 AI agent 完整了解如何以 Shuo UI 開發，涵蓋：

- 安裝與 CSS 設定
- 17 個元件的 v-model 型別、主要 props、slots 與常見陷阱
- 搭配 `UForm`、`UFormField` 與 Valibot 的表單驗證，以及共用規則（`requiredText` 等）
- 各元件的空值約定與初始 state 寫法
- 查詢條件卡片搭配結果清單的伺服器端分頁寫法
- `shuoUi` 模組選項：全站預設值、語系與文案、主題
- 日期、數字、電話、月數的顯示工具函式

skill 附有額外的 references，agent 依任務需要才讀取，回答更聚焦也更省 context。需要完整 props 表或更多範例時，skill 會引導 agent 讀取文件網站上對應頁面的 [markdown 版本](https://k90325248.github.io/shuo-ui/getting-started/agents/llms-txt#%E5%96%AE%E4%B8%80%E9%A0%81%E9%9D%A2%E7%9A%84-markdown-%E7%89%88%E6%9C%AC)。

<note>

安裝後，在 agent 的對話框輸入 `/shuo-ui` 即可呼叫這個 skill。

</note>

### Skills CLI

[`skills`](https://skills.sh) CLI 是安裝 Shuo UI skill 最簡單的方式，支援 Cursor、Claude Code、Codex、Windsurf、Cline 等多種 agent。

```bash
npx skills add k90325248/shuo-ui
```

用 `--agent` 指定 agent：

```bash
npx skills add k90325248/shuo-ui --agent cursor
npx skills add k90325248/shuo-ui --agent claude-code
```

或安裝到全域，讓所有專案都能使用：

```bash
npx skills add k90325248/shuo-ui --global
```

如果從 GitHub clone 的速度較慢，也可以直接從文件網站安裝：

```bash
npx skills add https://k90325248.github.io/shuo-ui
```

<tip>

前往 [skills.sh](https://skills.sh) 了解 skills 生態系並瀏覽其他 skill。

</tip>

### Cursor

#### 快速安裝

點擊下方按鈕，直接在 Cursor 安裝 Shuo UI skill：

<u-button color="neutral" icon="i-simple-icons-cursor" label="安裝 Skill" to="cursor://anysphere.cursor-deeplink/install-skill?url=https://github.com/k90325248/shuo-ui/tree/main/skills/shuo-ui" variant="outline">



</u-button>

#### 手動設定

1. 開啟 Cursor，前往「Settings」>「Skills」
2. 點擊「Add skill」並輸入以下網址：

```text
https://github.com/k90325248/shuo-ui/tree/main/skills/shuo-ui
```

### Claude Code

<note>

**請先安裝 Claude Code。** 安裝方式見 [Anthropic 的文件](https://docs.anthropic.com/en/docs/claude-code/quickstart)。

</note>

使用 CLI 指令加入 skill：

```bash
claude skill add https://github.com/k90325248/shuo-ui/tree/main/skills/shuo-ui
```

### 其他 AI 工具

skill 檔案都公開在 GitHub 上，任何支援自訂 context 或指示的 AI 工具都可以直接引用：

- **skill 主檔**：[`skills/shuo-ui/SKILL.md`](https://github.com/k90325248/shuo-ui/tree/main/skills/shuo-ui/SKILL.md)
- **完整 skill 目錄**：[`skills/shuo-ui/`](https://github.com/k90325248/shuo-ui/tree/main/skills/shuo-ui)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.

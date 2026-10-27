---
title: "LLMs.txt"
description: "讓 Cursor、Windsurf、GitHub Copilot、ChatGPT、Claude 等 AI 工具理解 Shuo UI 的元件、設定與寫法。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/getting-started/agents/llms-txt"
---
# LLMs.txt

> 讓 Cursor、Windsurf、GitHub Copilot、ChatGPT、Claude 等 AI 工具理解 Shuo UI 的元件、設定與寫法。

## 什麼是 LLMs.txt？

LLMs.txt 是專為大型語言模型（LLM）設計的文件格式。Shuo UI 的文件網站提供 LLMs.txt 檔案，整理元件庫的元件、props、工具函式與使用方式，讓 AI 工具能據此協助開發。

## 可用的路徑

- **/llms.txt**：所有頁面的索引，每頁附上標題、說明與 markdown 連結（約 4K tokens）
- **/llms-full.txt**：完整文件合併成單一檔案，包含元件範例、props、工具函式與版本紀錄（超過 10 萬 tokens）

兩個檔案都同時收錄繁體中文與英文的頁面。

## 選擇合適的檔案

<note>

**大多數情況請先用 /llms.txt**，它包含所有頁面的連結，一般的 context window 就放得下，AI 工具可以再依需要讀取個別頁面。只有在需要完整範例、且 AI 工具支援大型 context（200K tokens 以上）時才使用 `/llms-full.txt`。

</note>

## 單一頁面的 markdown 版本

每個頁面都有 markdown 版本，在網址後面加上 `.md` 即可，例如：

- [`/zh-tw/getting-started/overview/installation.md`](https://k90325248.github.io/shuo-ui/zh-tw/getting-started/overview/installation.md)
- [`/en/components/text/input-text.md`](https://k90325248.github.io/shuo-ui/en/components/text/input-text.md)

只需要某個元件的說明時，直接提供該頁的 markdown 比整份文件更省 tokens。

## 使用注意事項

<warning>

**@ 符號必須手動輸入**：在 Cursor 或 Windsurf 的對話框中，`@` 符號要親手輸入，貼上的 `@` 不會被辨識為 context 引用。

</warning>

## 搭配 AI 工具使用

### Cursor

在 Cursor 中引用 LLMs.txt，讓 AI 更準確地協助撰寫 Shuo UI 表單。

#### 使用方式

1. **直接引用**：提問時附上 LLMs.txt 的網址
2. 使用 `@docs` 將網址加入專案的 context

[進一步了解 Cursor 的提示與 `@` 引用](https://cursor.com/docs/agent/prompting)

### Windsurf

Windsurf 可以直接讀取 Shuo UI 的 LLMs.txt，了解元件用法與慣例。

#### 在 Windsurf 中使用

- 使用 `@docs` 引用 LLMs.txt 的網址
- 在 workspace 建立固定規則，引用這些網址

[進一步了解 Windsurf 的網頁與文件搜尋](https://docs.windsurf.com/windsurf/cascade/web-search)

### 其他 AI 工具

任何支援 LLMs.txt 的 AI 工具都可以透過這些路徑理解 Shuo UI。

#### ChatGPT、Claude 等 LLM 的提示範例

- 「請參考 Shuo UI 文件：[https://k90325248.github.io/shuo-ui/llms.txt](https://k90325248.github.io/shuo-ui/llms.txt)」
- 「請依照 Shuo UI 完整文件撰寫：[https://k90325248.github.io/shuo-ui/llms-full.txt](https://k90325248.github.io/shuo-ui/llms-full.txt)」

## 網站地圖

所有頁面的清單見[網站地圖](https://k90325248.github.io/shuo-ui/sitemap.md)。


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.

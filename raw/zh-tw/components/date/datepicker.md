---
title: "Datepicker"
description: "日期選擇器，預設民國年，支援五種精度與範圍選擇。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/components/date/datepicker"
---
# Datepicker

> 日期選擇器，預設民國年，支援五種精度與範圍選擇。

`v-model: string`（範圍為 `[string, string] | []`），另有 `v-model:start`、`v-model:end`，見下方 [v-model](#v-model)。預設顯示民國年、選擇年月日，綁定值永遠使用西元字串。

## 用法

### 選擇模式

`mode` 決定選擇精度，預設為 `date`；綁定值一律是西元字串。

<table>
<thead>
  <tr>
    <th>
      mode
    </th>
    
    <th>
      民國顯示
    </th>
    
    <th>
      西元顯示
    </th>
    
    <th>
      v-model
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        year
      </code>
    </td>
    
    <td>
      115 年
    </td>
    
    <td>
      2026 年
    </td>
    
    <td>
      <code>
        "2026"
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        month
      </code>
    </td>
    
    <td>
      115 年 09 月
    </td>
    
    <td>
      2026 年 09 月
    </td>
    
    <td>
      <code>
        "2026/09"
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        date
      </code>
    </td>
    
    <td>
      115/09/20
    </td>
    
    <td>
      2026/09/20
    </td>
    
    <td>
      <code>
        "2026/09/20"
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        datetime
      </code>
    </td>
    
    <td>
      115/09/20 14:02
    </td>
    
    <td>
      2026/09/20 14:02
    </td>
    
    <td>
      <code>
        "2026/09/20 14:02"
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        datetime-second
      </code>
    </td>
    
    <td>
      115/09/20 14:02:09
    </td>
    
    <td>
      2026/09/20 14:02:09
    </td>
    
    <td>
      <code>
        "2026/09/20 14:02:09"
      </code>
    </td>
  </tr>
</tbody>
</table>

<component-example name="datepicker-modes">



</component-example>

- 年模式開啟時，已選年份會捲至清單中央；尚未選取時以今年置中，綁定值仍保持 `''`。接近年份範圍兩端時，以可捲動範圍為限。
- 日期時間是本地日曆時間，不做 UTC 或時區轉換。
- 切換 `mode` 後，既有值不符合新格式時會清空，見下方的警告。範例中每種 `mode` 各保留一個符合格式的值。

### 民國年與分隔符號

`roc` 只切換顯示，預設開啟，不改寫綁定值；`separator` 只影響綁定值，預設 `/`，顯示仍為斜線。

<component-example name="datepicker-roc">



</component-example>

- 民國年為西元年減 1911；1911 年顯示為民國 0 年。年份按鈕與年份清單也使用此規則。
- 民國模式不顯示、也不能選取 1911 年以前的日期；西元模式沿用一般年份範圍。
- 綁定值預設以斜線分隔；API 使用 `YYYY-MM-DD` 等連字號格式時，設定 `separator="-"` 即可直接綁定。`separator` 不可為空或含數字、空白、冒號，無效時沿用預設並警告。

<warning>

父層傳入（掛載時或之後回填）不符合目前 `mode`、`separator` 的格式、型別錯誤、民國下限之前的日期，或範圍起日晚於迄日時，元件會清空綁定值，並以 `console.warn` 留下 `[ShuoDatepicker] modelValue 格式不符，已清空：` 或 `起迄相反` 紀錄。切換 `mode`、`roc` 或 `separator` 後，若既有值不符合新設定，同樣會清空並警告；請同時回填符合新設定的值。

</warning>

同一輪清空只送出一次 `update:modelValue`（或 `update:start`、`update:end`）事件；起迄相反時不會先同步出排序後的暫時值。

### 範圍綁定

`range` 開啟範圍選擇。主陣列與獨立起迄同步，方便對接不同 API。只會提交完整起迄陣列或 `[]`，不回傳半個範圍。

<component-example name="datepicker-range">



</component-example>

- 初始化同時提供兩種綁定時，以主 `v-model` 為準；之後可由父層更新主值或起迄。
- 清空時主值為 `[]`，起迄為 `''`。父層綁定 `null` 或 `undefined` 時，元件回寫為單選 `''`、範圍 `[]`、起迄 `''`。
- 只綁起迄時允許分次回填，單邊格式不符只清空該端，兩端皆有值但起日晚於迄日則兩端都清空。
- 不需要主陣列時，可以只寫 `<ShuoDatepicker v-model:start="start" v-model:end="end" range />`，見[只綁定起迄](#%E5%8F%AA%E7%B6%81%E5%AE%9A%E8%B5%B7%E8%BF%84)。迄日須配合起日使用，元件不將單獨迄日視為完整範圍。

### 可選日期範圍

`min-date`、`max-date` 限制可選的最早與最晚日期，範圍外的日期無法選取；`year-range` 是年份清單的西元範圍，預設 `[1900, 2100]`。

<component-example name="datepicker-limits">



</component-example>

- 民國模式下，`min-date` 至少為 1911/01/01，`year-range` 的下限至少為 1911。
- `min-date` 傳字串時可用斜線或連字號分隔，可含時分（秒）。
- 年與年月模式以整年、整月比較 `min-date`。

### 圖示與清除按鈕

`clearable` 顯示清除按鈕，預設關閉，清除後綁定值為 `''`（範圍為 `[]`）。`calendar-icon` 是尾端的日曆圖示，預設 `i-lucide-calendar`；`clear-icon` 是清除按鈕的圖示，預設 `i-lucide-x`。

<component-example name="datepicker-icons">



</component-example>

### 驗證狀態

`ShuoDatepicker` 沒有 `color`，改以 `state` 表示驗證結果：`false` 顯示錯誤、`true` 顯示成功，未指定時為一般樣式。放在 `UFormField` 內且欄位有錯誤時，一律顯示錯誤。

<component-example name="datepicker-feedback">



</component-example>

### 尺寸與狀態

載入中以轉圈圖示取代尾端日曆圖示並停用輸入。各狀態的共通行為見[共用參數](https://k90325248.github.io/shuo-ui/components/overview/common)。

<component-example name="datepicker-states">



</component-example>

## 範例

### 搭配表單驗證

單選用 `requiredText`，範圍用 `requiredArray`。只選了起日的範圍不會提交、不觸發 change，因此仍會顯示必填錯誤。放在 `UFormField` 內時接入欄位的 id、name、尺寸、停用與錯誤狀態，見[搭配 UForm 與 UFormField](https://k90325248.github.io/shuo-ui/components/overview/common#%E6%90%AD%E9%85%8D-uform-%E8%88%87-uformfield)。

<component-example name="datepicker-validation">



</component-example>

### 只綁定起迄

查詢 API 的起迄是兩個欄位時，只綁 `v-model:start`、`v-model:end`；搭配 `separator="-"` 直接使用 `YYYY-MM-DD` 格式。

<component-example name="datepicker-start-end">



</component-example>

### 起迄互相限制

用兩個單選日期分別輸入起日與迄日時，以對方的值作為 `max-date`、`min-date`，避免起日晚於迄日。

<component-example name="datepicker-linked-range">



</component-example>

## 互動說明

### 選取流程

- **年、年月、日期**：選取即套用並關閉選單，不再顯示確認／取消按鈕。
- **範圍**：僅選起日時保留草稿，父層三個綁定值維持原值；起迄皆選完才一次提交並關閉。中途點外面、按 Esc 或關閉選單，捨棄草稿並恢復上次完整範圍；原本為空值則保持 `[]`。
- **日期時分／秒**：選取日期後，立即帶入完整日期時間並切到時間面板；時間沿用既有值，空值以套件初始化的本地目前時間為準。調整時間即更新，點外面關閉即可保留。
- **日期時間範圍**：先選完兩個日期，再切換到起迄時間面板，兩端的時間都可即時修改。
- 單選切換為範圍時清空並等待完整選擇；關閉範圍時保留起日作為單選值，並清空 `start`、`end`。

### 鍵盤操作

開啟選單時焦點移到已選日期（或年份、月份），未選取時移到第一個可選項目。方向鍵移動焦點，Enter 選取，Esc 關閉；選單關閉時若焦點仍在選單內，回到輸入框。選單 teleport 至 body，無法以 Tab 進入。

### 日曆顯示

日曆以週日為每週第一天，固定顯示六週；前後月份的日期以較淡文字呈現。換月使用透明度過場，避免水平位移產生捲軸。

月份與星期名稱、年份清單的「年」字、年與年月模式的「115 年 10 月」格式，以及範圍的分隔符號「～」都依語系切換（英文為「10/115」與「–」）；民國年或西元年仍由 `roc` 決定。見[多語系與文案](https://k90325248.github.io/shuo-ui/getting-started/theme/messages)。

## v-model

<table>
<thead>
  <tr>
    <th>
      v-model
    </th>
    
    <th>
      型別
    </th>
    
    <th>
      說明
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        v-model
      </code>
    </td>
    
    <td>
      單選 <code>
        string
      </code>
      
      ；範圍 <code>
        [string, string] | []
      </code>
    </td>
    
    <td>
      永遠使用西元字串，範圍以起迄陣列表示；單選空值 <code>
        ''
      </code>
      
      ，範圍空值 <code>
        []
      </code>
      
      。
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        v-model:start
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      範圍起日，可獨立回填，非範圍時為 <code>
        ''
      </code>
      
      。
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        v-model:end
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      範圍迄日，可獨立回填，尚無完整範圍或非範圍時為 <code>
        ''
      </code>
      
      。
    </td>
  </tr>
</tbody>
</table>

## Props

<component-props :exclude="["start", "end"]" name="ShuoDatepicker">



</component-props>

`size`、`disabled`、`loading`、`skeleton`、`id`、`name` 的行為見[共用參數](https://k90325248.github.io/shuo-ui/components/overview/common#%E5%85%B1%E7%94%A8%E5%8F%83%E6%95%B8)。`clearable`、`calendarIcon`、`clearIcon`、`roc`、`separator`、`yearRange` 可在全站設定預設值，見[可設定的項目](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults#%E5%8F%AF%E8%A8%AD%E5%AE%9A%E7%9A%84%E9%A0%85%E7%9B%AE)。

<note>

元件只開放上表的參數，不繼承 `@vuepic/vue-datepicker` 的全部 props；`auto-apply`、`flow`、`config`、`formats`、`model-type` 等由元件內部統一管理。

</note>

## 樣式

沒有 `ui` prop。`class`、`style` 等 HTML attributes 套用在外層容器，不會透傳到日期套件。外層內建 `relative block w-full min-w-0`，`class` 以 tailwind-merge 與其合併，衝突時優先，可覆寫寬度與最小寬度（例如 `class="w-40"`、`class="min-w-20"`）。

顯示的日期文字超過寬度時以省略號截斷，滑鼠移入或聚焦時以 Tooltip 顯示完整文字，觸控裝置長按顯示（見 [Tooltip](https://k90325248.github.io/shuo-ui/components/helper/tooltip#%E8%A7%B8%E6%8E%A7%E9%95%B7%E6%8C%89)），長按不會開啟日曆；選單開啟或骨架期間不顯示。

## 更新紀錄

<component-changelog name="ShuoDatepicker">



</component-changelog>

---

- [@vuepic/vue-datepicker](https://vue3datepicker.com)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.

---
title: "Datepicker"
description: "日期選擇器，預設民國年，支援五種精度與範圍選擇。"
canonical_url: "https://k90325248.github.io/components/datepicker"
---
# Datepicker

> 日期選擇器，預設民國年，支援五種精度與範圍選擇。

預設顯示民國年、選擇年月日、尺寸為 `lg`。綁定值永遠使用西元字串。

## 用法

### 五種格式

`mode` 決定選擇精度，綁定值一律是西元字串。

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

- 民國年為西元年減 1911；1911 年顯示為民國 0 年。年份按鈕與年份清單也使用此規則。
- 年模式開啟時，已選年份會捲至清單中央；尚未選取時以今年置中，綁定值仍保持 `''`。接近年份範圍兩端時，以可捲動範圍為限。
- 民國模式不顯示、也不能選取 1911 年以前的日期；西元模式沿用一般年份範圍。
- 日期時間是本地日曆時間，不做 UTC 或時區轉換。
- 綁定值預設以斜線分隔；API 使用 `YYYY-MM-DD` 等連字號格式時，設定 `separator="-"` 即可直接綁定。

### 民國年與分隔符號

`roc` 只切換顯示，不改寫綁定值；`separator` 只影響綁定值，顯示仍為斜線。

<component-example name="datepicker-roc">



</component-example>

<warning>

父層傳入（掛載時或之後回填）不符合目前 `mode`、`separator` 的格式、型別錯誤、民國下限之前的日期，或範圍起日晚於迄日時，元件會清空綁定值，並以 `console.warn` 留下 `[ShuoDatepicker] modelValue 格式不符，已清空：` 或 `起迄相反` 紀錄。切換 `mode`、`roc` 或 `separator` 後，若既有值不符合新設定，同樣會清空並警告；請同時回填符合新設定的值。

</warning>

同一輪清空只送出一次 `update:modelValue`（或 `update:start`、`update:end`）事件；起迄相反時不會先同步出排序後的暫時值。

### 範圍綁定

主陣列與獨立起迄同步，方便對接不同 API。只會提交完整起迄陣列或 `[]`，不回傳半個範圍。

<component-example name="datepicker-range">



</component-example>

- 初始化同時提供兩種綁定時，以主 `v-model` 為準；之後可由父層更新主值或起迄。
- 清空時主值為 `[]`，起迄為 `''`。父層綁定 `null` 或 `undefined` 時，元件回寫為單選 `''`、範圍 `[]`、起迄 `''`。
- 只綁起迄時允許分次回填，單邊格式不符只清空該端，兩端皆有值但起日晚於迄日則兩端都清空。
- 不需要主陣列時，可以只寫 `<ShuoDatepicker v-model:start="start" v-model:end="end" range />`。迄日須配合起日使用，元件不將單獨迄日視為完整範圍。

## 選取流程

- **年、年月、日期**：選取即套用並關閉選單，不再顯示確認／取消按鈕。
- **範圍**：僅選起日時保留草稿，父層三個綁定值維持原值；起迄皆選完才一次提交並關閉。中途點外面、按 Esc 或關閉選單，捨棄草稿並恢復上次完整範圍；原本為空值則保持 `[]`。
- **日期時分／秒**：選取日期後，立即帶入完整日期時間並切到時間面板；時間沿用既有值，空值以套件初始化的本地目前時間為準。調整時間即更新，點外面關閉即可保留。
- **日期時間範圍**：先選完兩個日期，再切換到起迄時間面板，兩端的時間都可即時修改。
- 單選切換為範圍時清空並等待完整選擇；關閉範圍時保留起日作為單選值，並清空 `start`、`end`。

## 鍵盤操作

開啟選單時焦點移到已選日期（或年份、月份），未選取時移到第一個可選項目。方向鍵移動焦點，Enter 選取，Esc 關閉；選單關閉時若焦點仍在選單內，回到輸入框。選單 teleport 至 body，無法以 Tab 進入。

## 日曆顯示

日曆以週日為每週第一天，固定顯示六週；前後月份的日期以較淡文字呈現。換月使用透明度過場，避免水平位移產生捲軸。

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

<note>

元件只開放上表的參數，不繼承 `@vuepic/vue-datepicker` 的全部 props。`class`、`style` 等 HTML attributes 套用在外層容器，不會透傳到日期套件。外層內建 `w-full min-w-0`，`class` 與其合併且衝突時優先，可覆寫寬度與最小寬度（例如 `class="w-40"`、`class="min-w-20"`）；`auto-apply`、`flow`、`config`、`formats`、`model-type` 等由元件內部統一管理。

</note>

## 與 UForm 搭配

日期選擇器透過 `useFormField` 接入欄位 id、name、size、停用與錯誤狀態。選取或清除後觸發 change，未完成的範圍不提交、不觸發 change。必填驗證使用 `requiredText('欄位名稱')`（範圍可用 `requiredArray`），見[表單驗證](https://k90325248.github.io/guides/validation)。

---

- [@vuepic/vue-datepicker](https://vue3datepicker.com)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.

# 日期選擇器

使用 `ShuoDatepicker`，預設顯示民國年、選擇年月日、尺寸為 `lg`。

## 參數

| 參數            | 型別                                         | 預設                  | 說明                                                                                                           |
| --------------- | -------------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------- |
| `v-model`       | 單選 `string`；範圍 `[string, string] \| []` | 空值                  | 永遠使用西元字串，範圍以起迄陣列表示；單選空值 `''`，範圍空值 `[]`。                                           |
| `v-model:start` | `string`                                     | `''`                  | 範圍起日，可獨立回填，非範圍時為 `''`。                                                                        |
| `v-model:end`   | `string`                                     | `''`                  | 範圍迄日，可獨立回填，尚無完整範圍或非範圍時為 `''`。                                                          |
| `id`            | `string`                                     | 未指定                | 輸入框識別碼，對應外部 label。                                                                                 |
| `clearable`     | `boolean`                                    | `false`               | 顯示清除按鈕，清空時單選為 `''`，範圍為 `[]`，起迄為 `''`。                                                    |
| `disabled`      | `boolean`                                    | `false`               | 禁用輸入、選單與清除操作。                                                                                     |
| `range`         | `boolean`                                    | `false`               | 開啟起迄選擇，五種日期精度皆支援。                                                                             |
| `roc`           | `boolean`                                    | `true`                | 開關民國年顯示，切換不改寫綁定值。                                                                             |
| `mode`          | `DatepickerMode`                             | `date`                | 選擇精度，見下表。                                                                                             |
| `size`          | `xs \| sm \| md \| lg \| xl`                 | `lg`                  | 與其他表單元件一致。                                                                                           |
| `min-date`      | `Date \| string \| number`                   | 民國模式為 1911/01/01 | 民國模式採指定日期與 1911/01/01 中較晚者；年與年月模式以整年、整月比較。                                       |
| `max-date`      | `Date \| string \| number`                   | 未指定                | 最晚可選日期。                                                                                                 |
| `year-range`    | `[number, number]`                           | `[1900, 2100]`        | 西元年份範圍，民國模式的下限至少為 1911。                                                                      |
| `separator`     | `string`                                     | `'/'`                 | 綁定值的日期分隔符號，例如 `'-'`；顯示仍為斜線。不可為空或含數字、空白、冒號、單引號，無效時警告並沿用 `'/'`。 |
| `state`         | `boolean \| undefined`                       | `undefined`           | 一般、成功或錯誤樣式。                                                                                         |

公開設定集中於元件內的 `DatepickerProps`，只列出共用元件已支援且驗證的功能，不繼承套件全部 props。`class`、`style` 等 HTML attributes 套用在外層容器；不透傳任意屬性覆寫日期套件設定。`auto-apply`、`flow`、`config`、`formats`、`model-type` 等由元件內部統一管理。

## 自動套用與選取流程

- 年、年月、日期：選取即套用並關閉選單，不再顯示確認／取消按鈕。
- 範圍：僅選起日時保留草稿，父層三個綁定值維持原值；起迄皆選完才一次提交並關閉。中途點外面、按 Esc 或關閉選單，捨棄草稿並恢復上次完整範圍；原本為空值則保持 `[]`。
- 日期時分／秒：選取日期後，立即帶入完整日期時間並切到時間面板；時間沿用既有值，空值以套件初始化的本地目前時間為準。調整時間即更新，點外面關閉即可保留。
- 日期時間範圍：先選完兩個日期，再切換到起迄時間面板，兩端的時間都可即時修改。
- 單選切換為範圍時清空並等待完整選擇；關閉範圍時保留起日作為單選值，並清空 `start`、`end`。

## 鍵盤操作

開啟選單時焦點移到已選日期（或年份、月份），未選取時移到第一個可選項目。方向鍵移動焦點，Enter 選取，Esc 關閉；選單關閉時若焦點仍在選單內，回到輸入框。選單 teleport 至 body，無法以 Tab 進入。

## 範圍綁定

主陣列與獨立起迄同步，方便對接不同 API。只會提交完整起迄陣列或 `[]`，不回傳半個範圍。初始化同時提供兩種綁定時，以主 `v-model` 為準；之後可由父層更新主值或起迄。清空時主值為 `[]`，起迄為 `''`。父層綁定 `null` 或 `undefined` 時，元件回寫為單選 `''`、範圍 `[]`、起迄 `''`。只綁起迄時允許分次回填，單邊格式不符只清空該端，兩端皆有值但起日晚於迄日則兩端都清空。

```vue
<template>
  <ShuoDatepicker v-model="period" v-model:start="start" v-model:end="end" range clearable />
</template>

<script setup lang="ts">
import type { DatepickerValue } from '#shuo-ui/components/ShuoDatepicker.vue';

const period = ref<DatepickerValue<true>>([]);
const start = ref('');
const end = ref('');
</script>
```

不需要主陣列時，可以只寫 `<ShuoDatepicker v-model:start="start" v-model:end="end" range />`。迄日須配合起日使用，元件不將單獨迄日視為完整範圍。所有起迄字串皆依下表模式使用西元格式。

## 五種格式

| mode              | 民國顯示           | 西元顯示            | v-model                 |
| ----------------- | ------------------ | ------------------- | ----------------------- |
| `year`            | 115 年             | 2026 年             | `"2026"`                |
| `month`           | 115 年 09 月       | 2026 年 09 月       | `"2026/09"`             |
| `date`            | 115/09/20          | 2026/09/20          | `"2026/09/20"`          |
| `datetime`        | 115/09/20 14:02    | 2026/09/20 14:02    | `"2026/09/20 14:02"`    |
| `datetime-second` | 115/09/20 14:02:09 | 2026/09/20 14:02:09 | `"2026/09/20 14:02:09"` |

```vue
<template>
  <ShuoDatepicker v-model="date" />
  <ShuoDatepicker v-model="timestamp" mode="datetime-second" :roc="false" />
</template>

<script setup lang="ts">
const date = ref('2026/09/20');
const timestamp = ref('2026/09/20 14:02:09');
</script>
```

- 民國年為西元年減 1911；1911 年顯示為民國 0 年。年份按鈕與年份清單也使用此規則。
- 年模式開啟時，已選年份會捲至清單中央；尚未選取時以今年置中，綁定值仍保持 `''`。接近年份範圍兩端時，以可捲動範圍為限。
- 民國模式不顯示、也不能選取 1911 年以前的日期；西元模式沿用一般年份範圍。
- 父層傳入（掛載時或之後回填）不符合目前 `mode`、`separator` 的格式、型別錯誤、民國下限之前的日期，或範圍起日晚於迄日時，元件會清空綁定值，並以 `console.warn` 留下 `[ShuoDatepicker] modelValue 格式不符，已清空：` 或 `起迄相反` 紀錄。
- 切換 `mode`、`roc` 或 `separator` 後，若既有值不符合新設定，同樣會清空並警告；請同時回填符合新設定的值。
- 同一輪清空只送出一次 `update:modelValue`（或 `update:start`、`update:end`）事件；起迄相反時不會先同步出排序後的暫時值。
- 日期時間是本地日曆時間，不做 UTC 或時區轉換。
- 修改模式時，使用端應同步提供該模式格式的綁定值。
- 日期綁定已改為斜線格式，舊的 `YYYY-MM-DD` 資料須先轉換。

## 日曆顯示

日曆以週日為每週第一天，固定顯示六週；前後月份的日期以較淡文字呈現。換月使用透明度過場，避免水平位移產生捲軸。

## 與 UForm 搭配

日期選擇器透過 `useFormField` 接入欄位 id、name、size、停用與錯誤狀態。選取或清除後觸發 change，未完成的範圍不提交、不觸發 change。必填驗證使用 `requiredText('欄位名稱')`（範圍可用 `requiredArray`），見[表單驗證](validation.md)。

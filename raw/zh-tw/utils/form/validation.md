---
title: "Validation"
description: "搭配 Valibot 的共用驗證規則，錯誤訊息格式全站一致。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/utils/form/validation"
---
# Validation

> 搭配 Valibot 的共用驗證規則，錯誤訊息格式全站一致。

## 用法

規則由模組自動匯入，回傳 Valibot schema，直接放進 `v.object` 組合表單的 schema：

```ts
import * as v from 'valibot';

const schema = v.object({
  name: requiredText('姓名'),
  amount: requiredNumber('金額'),
  types: requiredArray('類別', v.string())
});
```

- 參數 `label` 是畫面上的欄位名稱，預設錯誤訊息為「欄位名稱 說明」，例如「姓名 為必填」。訊息跟隨 Nuxt UI 的語系，在驗證當下才產生，切換語系後重新驗證即為新語系；可用模組設定 `shuoUi.messages.validation` 或 `shuoUi.locales` 覆寫，見[多語系與文案](https://k90325248.github.io/shuo-ui/getting-started/theme/messages)。
- 輸入型別容納編輯中的 `null`、`undefined`，驗證通過後的輸出收斂為 `string`、`number` 或陣列，不需要改掉元件的空值約定。
- 表單、空值與錯誤顯示的整體說明見[表單驗證](https://k90325248.github.io/shuo-ui/getting-started/form/validation)。

<note>

專案裡 `import * as v from 'valibot'` 時，請另外安裝 `valibot`（`pnpm add valibot`），pnpm 不會讓專案直接引用套件的依賴。

</note>

## API

### requiredText

```ts
requiredText(label: string)
```

文字必填。拒絕 `null`、`undefined`、空字串、純空白與非字串值，保留原始文字（不去除前後空白）。適用文字輸入、多行文字、下拉選單與單選群組的字串值、日期字串。

<field-group>
<field :required="true" name="label" type="string">

欄位名稱，用於錯誤訊息。

</field>
</field-group>

### requiredNumber

```ts
requiredNumber(label: string)
```

數字必填。接受 `0`、負數與小數；空值與字串顯示「為必填」，`NaN` 與無限大顯示「必須是有效數字」。

<field-group>
<field :required="true" name="label" type="string">

欄位名稱，用於錯誤訊息。

</field>
</field-group>

### requiredArray

```ts
requiredArray(label: string, itemSchema: GenericSchema)
```

陣列必填，至少一項。空陣列、`null` 與 `undefined` 不通過。適用複選群組與多選下拉選單。

<field-group>
<field :required="true" name="label" type="string">

欄位名稱，用於錯誤訊息。

</field>

<field :required="true" name="itemSchema" type="GenericSchema">

每個項目的 schema，例如 `v.string()`；選項的合法值由頁面自行組合，不寫死在共用規則。

</field>
</field-group>

### optionalEmail

```ts
optionalEmail(label: string)
```

選填電子信箱。空字串通過；有值時須符合 email 格式，否則顯示「格式錯誤」。必填的信箱改用 `requiredText` 串接 `v.email`。

<field-group>
<field :required="true" name="label" type="string">

欄位名稱，用於錯誤訊息。

</field>
</field-group>

### optionalNonNegativeNumber

```ts
optionalNonNegativeNumber(label: string)
```

選填非負數字。`null` 通過；接受 `0` 與小數；負數顯示「不可小於 0」，`NaN`、無限大與非數字顯示「必須是有效數字」。適用金額、期數、評分、利率等選填欄位。

<field-group>
<field :required="true" name="label" type="string">

欄位名稱，用於錯誤訊息。

</field>
</field-group>

## 範例

### 組合其他 Valibot 規則

共用規則都是一般的 Valibot schema，可以再用 `v.pipe` 追加條件：

```ts
import * as v from 'valibot';

const schema = v.object({
  // 必填的信箱：必填規則再串接格式檢查
  email: v.pipe(requiredText('電子郵件'), v.email('電子郵件 格式錯誤')),

  // 選填的整數期數
  terms: v.pipe(
    optionalNonNegativeNumber('期數'),
    v.check(
      (value) => value === null || Number.isInteger(value),
      '期數 須為整數'
    )
  ),

  // 備用信箱可留空
  backupEmail: optionalEmail('備用電子郵件')
});
```

### 搭配表單

完整的表單寫法與即時範例見各元件頁的「搭配表單驗證」，例如 [InputText](https://k90325248.github.io/shuo-ui/components/text/input-text)、[SelectMenu](https://k90325248.github.io/shuo-ui/components/choice/select-menu)。

---

- [Valibot](https://valibot.dev/guides/introduction/)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.

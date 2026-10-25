---
title: "Number"
description: "千分位與固定小數位數的數字顯示。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/utils/format/number"
---
# Number

> 千分位與固定小數位數的數字顯示。

## 用法

API 資料與綁定值保留數字，只在顯示時格式化。清單欄位直接在 template 呼叫，不另外建立 formatter：

```vue
<template>
  <ShuoListCard :data="rows" :columns="columns">
    <!-- 金額 -->
    <template #amount-cell="{ row }">
      {{ formatNumberDisplay(row.original.amount) }}
    </template>
  </ShuoListCard>
</template>
```

函式由模組自動匯入，與 [InputNumber](https://k90325248.github.io/shuo-ui/components/text/input-number) 離開輸入框後的顯示使用同一套規則。不要將帶逗號或補零的字串寫回資料。

## API

### formatNumberDisplay

```ts
formatNumberDisplay(
  value: number | null | undefined,
  decimal?: boolean | number,
  thousandSeparator?: boolean
): string
```

把數字轉成顯示文字。`null`、`undefined`、`NaN` 與無限大回傳空字串，`0` 正常顯示；很大或很小的數字也會展開成一般寫法，不出現科學記號。

<field-group>
<field name="value" type="number | null | undefined" :required="true">

要顯示的數字。

</field>

<field name="decimal" type="boolean | number">

小數位數，預設 `true`。`true` 保留原本的小數，不補零；`false` 或 `0` 四捨五入為整數；正整數為固定位數，不足補零、超出時捨入，最多 100 位。

</field>

<field name="thousandSeparator" type="boolean">

是否加上千分位，預設 `true`。

</field>
</field-group>

<note>

`ShuoInputNumber` 的 `decimal` 預設為 `false`（只允許整數），和這裡預設保留小數不同。

</note>

## 範例

```ts
formatNumberDisplay(1234567); // 1,234,567
formatNumberDisplay(-1234.5); // -1,234.5
formatNumberDisplay(1234.5, 3); // 1,234.500
formatNumberDisplay(1234.5, 3, false); // 1234.500
formatNumberDisplay(1234.5, false); // 1,235
formatNumberDisplay(0.1 + 0.2, 2); // 0.30
formatNumberDisplay(0); // 0
formatNumberDisplay(null); // ''
```


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.

---
title: "Phone"
description: "市話號碼的區碼拆分與合併。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/utils/field/phone"
---
# Phone

> 市話號碼的區碼拆分與合併。

## 用法

[Phone](https://k90325248.github.io/shuo-ui/components/phone-file/phone) 以 `v-model` 綁定完整號碼，另可綁定 `area-code` 與 `number`。後端分開存區碼與號碼、或要在畫面上分開顯示時，用這兩個函式轉換：

```ts
// 後端回傳完整號碼與區碼，拆成兩欄
const { areaCode, number } = splitPhone(data.phone, data.areaCode);

// 送出前合併
const phone = joinPhone(state.areaCode, state.number);
```

函式由模組自動匯入。號碼只包含數字，不加入 `-` 或括號等分隔符號。

## API

### splitPhone

```ts
splitPhone(
  value: string | undefined,
  areaCode: string | undefined
): { areaCode: string | undefined; number: string | undefined }
```

依已知的區碼拆分完整號碼。台灣區碼長度不固定，無法確定區碼時不猜測長度：區碼為空或號碼不是以該區碼開頭時，區碼回傳空字串，完整號碼放在 `number`。

<field-group>
<field :required="true" name="value" type="string | undefined">

完整號碼。`undefined` 或空字串時，區碼與號碼都回傳相同的值。

</field>

<field :required="true" name="areaCode" type="string | undefined">

已知的區碼，例如 `02`。

</field>
</field-group>

### joinPhone

```ts
joinPhone(
  areaCode: string | undefined,
  number: string | undefined
): string | undefined
```

合併區碼與號碼，不加入分隔符號。兩者都是 `undefined` 時回傳 `undefined`（表示尚未初始化），其中一邊為 `undefined` 時視為空字串。

<field-group>
<field :required="true" name="areaCode" type="string | undefined">

區碼。

</field>

<field :required="true" name="number" type="string | undefined">

電話號碼。

</field>
</field-group>

## 範例

```ts
splitPhone('0223456789', '02'); // { areaCode: '02', number: '23456789' }
splitPhone('0223456789', '03'); // { areaCode: '', number: '0223456789' }
splitPhone('0223456789', undefined); // { areaCode: '', number: '0223456789' }

joinPhone('02', '23456789'); // '0223456789'
joinPhone(undefined, undefined); // undefined
```


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.

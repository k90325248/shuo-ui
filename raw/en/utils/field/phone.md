---
title: "Phone"
description: "Splitting and joining the area code of landline numbers."
canonical_url: "https://k90325248.github.io/shuo-ui/en/utils/field/phone"
---
# Phone

> Splitting and joining the area code of landline numbers.

## Usage

[Phone](https://k90325248.github.io/shuo-ui/components/phone-file/phone) binds the full number with `v-model`, and can also bind `area-code` and `number`. When the back end stores the area code and number separately, or the screen shows them separately, convert with these two functions:

```ts
// The back end returns the full number and area code; split them into two fields
const { areaCode, number } = splitPhone(data.phone, data.areaCode);

// Join them before submitting
const phone = joinPhone(state.areaCode, state.number);
```

The functions are auto-imported by the module. Numbers contain only digits, with no separators such as `-` or parentheses.

## API

### splitPhone

```ts
splitPhone(
  value: string | undefined,
  areaCode: string | undefined
): { areaCode: string | undefined; number: string | undefined }
```

Splits the full number by a known area code. Taiwanese area codes vary in length, so it never guesses the length when the area code is unknown: when the area code is empty or the number does not start with it, the area code is returned as an empty string and the full number goes in `number`.

<field-group>
<field :required="true" name="value" type="string | undefined">

The full number. When `undefined` or an empty string, both the area code and the number return the same value.

</field>

<field :required="true" name="areaCode" type="string | undefined">

The known area code, such as `02`.

</field>
</field-group>

### joinPhone

```ts
joinPhone(
  areaCode: string | undefined,
  number: string | undefined
): string | undefined
```

Joins the area code and number with no separator. When both are `undefined`, it returns `undefined` (meaning not initialized yet); when only one is `undefined`, it counts as an empty string.

<field-group>
<field :required="true" name="areaCode" type="string | undefined">

The area code.

</field>

<field :required="true" name="number" type="string | undefined">

The phone number.

</field>
</field-group>

## Examples

```ts
splitPhone('0223456789', '02'); // { areaCode: '02', number: '23456789' }
splitPhone('0223456789', '03'); // { areaCode: '', number: '0223456789' }
splitPhone('0223456789', undefined); // { areaCode: '', number: '0223456789' }

joinPhone('02', '23456789'); // '0223456789'
joinPhone(undefined, undefined); // undefined
```


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.

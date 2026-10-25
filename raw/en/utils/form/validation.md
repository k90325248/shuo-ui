---
title: "Validation"
description: "Shared validation rules for Valibot, with consistent error messages across the site."
canonical_url: "https://k90325248.github.io/shuo-ui/en/utils/form/validation"
---
# Validation

> Shared validation rules for Valibot, with consistent error messages across the site.

## Usage

The rules are auto-imported by the module and return Valibot schemas, so put them straight into `v.object` to build a form schema:

```ts
import * as v from 'valibot';

const schema = v.object({
  name: requiredText('Name'),
  amount: requiredNumber('Amount'),
  types: requiredArray('Types', v.string())
});
```

- The `label` parameter is the field name on screen; the default error message is "field name + description", for example "Name is required". Messages follow the Nuxt UI locale and are produced at validation time, so validating again after switching gives the new locale. Override them with the module option `shuoUi.messages.validation` or `shuoUi.locales`; see [Locales and messages](https://k90325248.github.io/shuo-ui/getting-started/theme/messages).
- The input types accept `null` and `undefined` while editing, and the output after validation narrows to `string`, `number` or an array, so you do not need to change the components' empty-value contract.
- See [Validation](https://k90325248.github.io/shuo-ui/getting-started/form/validation) for forms, empty values and error display as a whole.

<note>

If your project uses `import * as v from 'valibot'`, install `valibot` as well (`pnpm add valibot`); pnpm does not let a project import a package's dependencies directly.

</note>

## API

### requiredText

```ts
requiredText(label: string)
```

Required text. Rejects `null`, `undefined`, empty strings, whitespace only and non-string values, and keeps the original text (no trimming). For text inputs, multi-line text, string values of select menus and radio groups, and date strings.

<field-group>
<field :required="true" name="label" type="string">

Field name, used in the error message.

</field>
</field-group>

### requiredNumber

```ts
requiredNumber(label: string)
```

Required number. Accepts `0`, negative numbers and decimals; empty values and strings show "is required", and `NaN` and infinity show "must be a valid number".

<field-group>
<field :required="true" name="label" type="string">

Field name, used in the error message.

</field>
</field-group>

### requiredArray

```ts
requiredArray(label: string, itemSchema: GenericSchema)
```

Required array with at least one item. Empty arrays, `null` and `undefined` fail. For checkbox groups and multiple select menus.

<field-group>
<field :required="true" name="label" type="string">

Field name, used in the error message.

</field>

<field :required="true" name="itemSchema" type="GenericSchema">

The schema of each item, such as `v.string()`; the valid option values are composed by each page rather than fixed in the shared rule.

</field>
</field-group>

### optionalEmail

```ts
optionalEmail(label: string)
```

Optional email. Empty strings pass; a value must be a valid email, otherwise "has an invalid format" is shown. For a required email, chain `v.email` after `requiredText` instead.

<field-group>
<field :required="true" name="label" type="string">

Field name, used in the error message.

</field>
</field-group>

### optionalNonNegativeNumber

```ts
optionalNonNegativeNumber(label: string)
```

Optional non-negative number. `null` passes; `0` and decimals are accepted; negative numbers show "must be at least 0", and `NaN`, infinity and non-numbers show "must be a valid number". For optional fields such as amounts, terms, scores and rates.

<field-group>
<field :required="true" name="label" type="string">

Field name, used in the error message.

</field>
</field-group>

## Examples

### Combining with other Valibot rules

The shared rules are ordinary Valibot schemas, so you can add conditions with `v.pipe`:

```ts
import * as v from 'valibot';

const schema = v.object({
  // Required email: the required rule followed by a format check
  email: v.pipe(requiredText('Email'), v.email('Email is invalid')),

  // Optional whole number of terms
  terms: v.pipe(
    optionalNonNegativeNumber('Terms'),
    v.check(
      (value) => value === null || Number.isInteger(value),
      'Terms must be a whole number'
    )
  ),

  // The backup email can be left empty
  backupEmail: optionalEmail('Backup email')
});
```

### In a form

See "With form validation" on each component page for complete forms with live examples, such as [InputText](https://k90325248.github.io/shuo-ui/components/text/input-text) and [SelectMenu](https://k90325248.github.io/shuo-ui/components/choice/select-menu).

---

- [Valibot](https://valibot.dev/guides/introduction/)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.

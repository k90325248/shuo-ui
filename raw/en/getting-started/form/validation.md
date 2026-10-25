---
title: "Validation"
description: "Validate forms with UForm, UFormField and Valibot, using the built-in shared rules."
canonical_url: "https://k90325248.github.io/shuo-ui/en/getting-started/form/validation"
---
# Validation

> Validate forms with UForm, UFormField and Valibot, using the built-in shared rules.

We recommend `UForm + UFormField` for forms and Valibot for validation schemas. The `name` of `UFormField` must match the field name in the schema and state; `required` only shows the required asterisk, and the schema decides whether a field is actually required.

## Shared rules

The rules are auto-imported by the module. Each form composes its own schema, and business rules stay out of the input components. See [Validation](https://k90325248.github.io/shuo-ui/utils/form/validation) under Utilities for the parameters and behavior of each rule:

<table>
<thead>
  <tr>
    <th>
      Rule
    </th>
    
    <th>
      Fields
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        requiredText('Field name')
      </code>
    </td>
    
    <td>
      Text, string values of select menus and radio groups, date strings, multi-line text
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        requiredNumber('Field name')
      </code>
    </td>
    
    <td>
      Numbers
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        requiredArray('Field name', itemSchema)
      </code>
    </td>
    
    <td>
      Checkbox groups, multiple select menus
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        optionalEmail('Field name')
      </code>
    </td>
    
    <td>
      Optional email
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        optionalNonNegativeNumber('Field name')
      </code>
    </td>
    
    <td>
      Optional non-negative numbers such as amounts, terms, scores and rates
    </td>
  </tr>
</tbody>
</table>

The default error message is "field name + description", where the field name is the label on screen, for example "Name is required". Messages can be overridden with the module option `shuoUi.messages.validation`; see [Locales and messages](https://k90325248.github.io/shuo-ui/getting-started/theme/messages).

```ts
import * as v from 'valibot';

const schema = v.object({
  name: requiredText('Name'),
  amount: requiredNumber('Amount'),
  email: v.pipe(requiredText('Email'), v.email('Email is invalid')),
  backupEmail: optionalEmail('Backup email'),
  approvedAmount: optionalNonNegativeNumber('Approved amount')
});
```

Add reusable format, length or range rules to the shared file; cross-field rules specific to one page stay in that form. Compose them with Valibot `pipe` instead of building a separate validation config language.

File fields (`ShuoFile`) bind `File | null`. Combine Valibot's `v.file`, `v.mimeType` and `v.maxSize` for required, type and size checks; see [With form validation](https://k90325248.github.io/shuo-ui/components/phone-file/file#with-form-validation) on the File page.

<note>

Dates and options are currently only checked for being required. Add rules for date formats, whether an option is still valid, cross-field conditions, numeric ranges and so on as needed, for example `v.pipe(v.number(), v.minValue(1), v.maxValue(100))`.

</note>

## Empty values and types

Components write `null` / `undefined` bound by the parent back as the agreed empty value (`''` for text, `null` for numbers, `[]` for date ranges and so on; see [Empty values](https://k90325248.github.io/shuo-ui/components/overview/common#empty-values)). Unexpected values are cleared, and most components also log a `console.warn` (`ShuoSelectMenu` and `ShuoMonths` only clear without warning; see the same section). An unselected radio group is `''`, so options should not use an empty string as their value.

The input types of the shared schemas accept `null` / `undefined` while editing, and the output after validation narrows to `string`, `number` or an array of the item type, so you do not need to change the components' empty-value contract.

## Display and interaction

- We recommend the built-in theme (`theme: true`) for error messages: a floating style inset in the field's bottom border that does not add to the field height. Keep enough spacing between fields, and avoid clipping overflowing content in the containers.
- `UForm` only fires `@submit` after validation passes; read the validated data from `event.data`. When validation fails, `@error` fires.
- Use the default validation timing on input, blur and change. When resetting, besides clearing the state, call the form's `clear()` to clear the errors.


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.

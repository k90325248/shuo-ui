# Configuration

Full pages: `https://k90325248.github.io/shuo-ui/en/getting-started/theme/module-options.md`, `.../theme/component-defaults.md`, `.../theme/messages.md`, `.../theme/theming.md`.

## Module options

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@shuo/ui'],
  shuoUi: {
    prefix: 'Shuo', // component prefix: 'My' gives <MyInputText>
    theme: true, // apply the built-in Nuxt UI theme
    css: true, // load the default --ui-form-* CSS variables
    locale: 'zh-TW', // used when <UApp> has no locale; 'zh-TW' or 'en'
    messages: {}, // override texts of the default locale
    locales: {}, // override texts per locale code, or add locales
    components: {} // site-wide component defaults
  }
});
```

## Site-wide component defaults

Precedence: prop written on the component (any value, even `false` or `null`) > `shuoUi.components.<key>` > built-in default. Keys are camelCase without the prefix and do not change with `prefix`.

| Key             | Configurable props (built-in default)                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `inputText`     | `size` (`lg`), `hideMaskToggle` (`false`), `revealIcon`, `concealIcon`                                                      |
| `inputNumber`   | `size`, `unit` (`false`; boolean only), `thousandSeparator` (`true`)                                                        |
| `textarea`      | `size`, `autoresize`, `rows`, `maxrows`, `fixed`                                                                            |
| `file`          | `size`, `clearIcon`, `downloadIcon`, `selectIcon`                                                                           |
| `months`        | `size`                                                                                                                      |
| `phone`         | `size`                                                                                                                      |
| `selectMenu`    | `size`, `format` (`{label}`), `emptyValue` (`''`), `labelKey` (`label`), `valueKey` (`value`)                               |
| `checkbox`      | `size`, `trueValue` (`1`), `falseValue` (`0`)                                                                               |
| `switch`        | `size`, `color`, `loadingIcon`                                                                                              |
| `radioGroup`    | `size`, `orientation` (`auto`), `breakpoint` (`md`), `ui`, `labelKey`, `valueKey`                                           |
| `checkboxGroup` | Same as `radioGroup`                                                                                                        |
| `datepicker`    | `size`, `clearable` (`false`), `calendarIcon`, `clearIcon`, `roc` (`true`), `separator` (`/`), `yearRange` (`[1900, 2100]`) |
| `queryCard`     | `icon`, `expandIcon`, `collapseIcon`, `validateOn`, `ui`                                                                    |
| `table`         | `selectAll` (`true`), `checkboxProps`, `skeletonRows` (`3`), `skeletonClass` (`h-6`) (also apply inside `ShuoListCard`)     |
| `listCard`      | `icon`, `pageSize` (`10`), `showPagination` (`true`), `showSummary` (`true`), `transition` (`true`), `ui`                   |
| `infoTooltip`   | `icon`                                                                                                                      |
| `tooltip`       | `touch` (`true`; also affects tooltips inside the library)                                                                  |

Example for a back end that uses `{ Code, Name }` items, `Y` / `N` flags and `YYYY-MM-DD` dates:

```ts [nuxt.config.ts]
shuoUi: {
  components: {
    selectMenu: { format: '{value}_{label}', labelKey: 'Name', valueKey: 'Code', emptyValue: null },
    radioGroup: { labelKey: 'Name', valueKey: 'Code' },
    checkboxGroup: { labelKey: 'Name', valueKey: 'Code' },
    checkbox: { trueValue: 'Y', falseValue: 'N' },
    datepicker: { clearable: true, separator: '-' },
    listCard: { pageSize: 20 },
    queryCard: { ui: { grid: 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4' } }
  }
}
```

Rules:

- Values must be JSON-serializable (they go through `runtimeConfig.public`): no functions, no secrets. Unknown components or props are type errors.
- `ui` merges per slot with a page's `ui`; a slot set on the page replaces the site-wide class string for that slot. Other values (arrays such as `yearRange`) are replaced as a whole.
- When overriding grid columns with `ui.grid`, write every breakpoint: tailwind-merge keeps the built-in `xl:grid-cols-4` if you only write `md:grid-cols-3`.
- With site-wide `labelKey` / `valueKey`, pages whose items still use `{ label, value }` must pass `label-key="label" value-key="value"`.
- Read the effective value in a page with `resolveShuoDefault('listCard', 'pageSize')`.

### Size

Component `size` > `UFormField` `size` > `components.<key>.size` > `app.config.ts` `ui.formField.defaultVariants.size` > `lg`. There is no global `components.size`; to resize every field inside `UFormField`s at once:

```ts [app.config.ts]
export default defineAppConfig({
  ui: { formField: { defaultVariants: { size: 'md' } } }
});
```

## Locales and messages

- Texts follow the Nuxt UI locale on `<UApp :locale>`; `zh-TW` and `en` are built in. Without a `UApp` locale, `shuoUi.locale` is used.
- Unknown codes fall back to `shuoUi.locales[code]`, then the built-in locale of the same language, then English.
- `messages` overrides the default locale; `locales` overrides per code and wins over `messages`. Placeholders: `{label}`, `{min}`, `{unit}`, `{total}`, `{start}`, `{end}`, `{year}`, `{month}`.

```ts [nuxt.config.ts]
shuoUi: {
  locales: {
    'zh-TW': { listCard: { title: '查詢清單' } },
    en: { validation: { required: '{label} cannot be empty' }, listCard: { title: 'Search results' } }
  }
}
```

Message groups: `validation` (`required`, `invalidNumber`, `invalidFormat`, `minValue`), `checkbox`, `file`, `inputNumber` (`unit`), `inputText`, `phone`, `months`, `selectMenu` (`searchPlaceholder`, `empty`), `infoTooltip`, `queryCard` (`title`, `collapse`, `expand`, `submit`), `table` (`empty`, `loading`, `selectAll`, `selectRow`, `selectionHeader`), `listCard` (`title`, `summary`), `datepicker`.

## Theming

- Colors come from the project's Nuxt UI theme (`primary`, `neutral` and so on); the library adds no brand colors.
- `theme: true` applies a built-in Nuxt UI theme (including the floating error message style inside the field border); `false` leaves styling to the project.
- `css: true` loads the `--ui-form-*` CSS variables; with `false` the project defines them.
- Per component, pass `ui` with slot classes (merged with tailwind-merge) or a `(defaults) => string` function to replace a slot entirely.
- Classes written in `nuxt.config.ts` must be within Tailwind's scan range; if not, add `@source '../../../nuxt.config.ts';` to the CSS file.

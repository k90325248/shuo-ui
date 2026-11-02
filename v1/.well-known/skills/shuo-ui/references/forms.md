# Forms and validation

Full pages: `https://k90325248.github.io/shuo-ui/en/getting-started/form/validation.md`, `https://k90325248.github.io/shuo-ui/en/utils/form/validation.md`.

## Structure

- `UForm` with `:schema` and `:state`; each component inside a `UFormField` whose `name` matches the state key.
- `required` on `UFormField` only shows the asterisk. The schema decides what is required.
- `@submit` fires only after validation passes; read `event.data`. `@error` fires on failure.
- To reset: restore the state, then call the form's `clear()` to remove errors.
- Validation runs on input, blur and change by default; keep that.

## Shared rules

Auto-imported, return Valibot schemas. `label` is the on-screen field name used in messages ("Name is required"; messages follow the locale).

| Rule                               | Use for                                                        |
| ---------------------------------- | -------------------------------------------------------------- |
| `requiredText(label)`              | Text, textarea, single select, radio group, single date, phone |
| `requiredNumber(label)`            | Numbers, total months (accepts 0, negatives, decimals)         |
| `requiredArray(label, itemSchema)` | Checkbox group, multiple select, date range                    |
| `optionalEmail(label)`             | Optional email (`''` passes)                                   |
| `optionalNonNegativeNumber(label)` | Optional amounts, terms, rates (`null` passes, negatives fail) |

Input types accept `null` / `undefined`; outputs narrow to `string`, `number` or arrays. Compose extra conditions with `v.pipe`:

```ts
import * as v from 'valibot';

const schema = v.object({
  email: v.pipe(requiredText('Email'), v.email('Email is invalid')),
  score: v.pipe(requiredNumber('Score'), v.minValue(0), v.maxValue(100)),
  terms: v.pipe(
    optionalNonNegativeNumber('Terms'),
    v.check((value) => value === null || Number.isInteger(value), 'Terms must be a whole number')
  ),
  types: requiredArray('Types', v.string()),
  // ShuoCheckbox with true-value="Y": compare with v.check, not v.literal (which narrows the UForm state type)
  agree: v.pipe(
    v.union([v.string(), v.number(), v.boolean()]),
    v.check((value) => value === 'Y', 'Please agree to the terms')
  ),
  attachment: v.pipe(v.file('Attachment is required'), v.mimeType(['application/pdf']), v.maxSize(5 * 1024 * 1024))
});
```

- Put reusable format rules in a shared file; keep cross-field rules in the page (`v.forward`, `v.variant`).
- Conditional fields: switch the schema with `v.variant` on a discriminating field.
- The project needs its own `valibot` dependency to `import * as v from 'valibot'`.

## Initial state

Match each component's empty value:

```ts
const state = reactive({
  name: '', // ShuoInputText, ShuoTextarea
  amount: null as number | null, // ShuoInputNumber
  type: '', // ShuoSelectMenu (single), ShuoRadioGroup
  tags: [] as string[], // ShuoSelectMenu multiple, ShuoCheckboxGroup
  date: '', // ShuoDatepicker
  period: [] as [string, string] | [], // ShuoDatepicker range
  seniority: null as number | null, // ShuoMonths
  phone: '', // ShuoPhone
  enabled: 0 as 0 | 1, // ShuoCheckbox (default true-value 1, false-value 0)
  file: null as File | null // ShuoFile
});
```

## Loading an edit page

Use one flag for `skeleton` while the record loads, then assign the data. `null` from the back end is normalized by the components.

```vue
<UForm :schema="schema" :state="state">
  <UFormField label="Name" name="name">
    <ShuoInputText v-model="state.name" :skeleton="pending" />
  </UFormField>
</UForm>
```

## Query page with a result list

```vue
<template>
  <div class="flex flex-col gap-4">
    <ShuoQueryCard :state="query" @submit="onSubmit" @clear="query.keyword = ''">
      <UFormField label="Keyword" name="keyword">
        <ShuoInputText v-model="query.keyword" />
      </UFormField>

      <template #actions="{ clear }">
        <UButton label="Clear" color="neutral" variant="soft" @click="clear" />
        <UButton type="submit" label="Search" :loading="loading" />
      </template>
    </ShuoQueryCard>

    <ShuoListCard
      ref="list"
      :data="rows"
      :columns="columns"
      :loading="loading"
      :total="total"
      :page="page"
      @page-change="search"
    >
      <template #applyDate-cell="{ row }">
        {{ formatDateDisplay(row.original.applyDate) }}
      </template>
    </ShuoListCard>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import type { PageRequest } from '#shuo-ui/types/pagination';

interface Row {
  id: number;
  name: string;
  applyDate: string;
}

const columns: TableColumn<Row>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'applyDate', header: 'Application date' }
];

const query = reactive({ keyword: '' });
const applied = ref(''); // the submitted query, kept while changing pages
const list = useTemplateRef('list');
const rows = ref<Row[]>([]);
const total = ref(0);
const page = ref(1);
const loading = ref(true); // true on creation shows skeleton rows

const search = async ({ PageNumber, PageSize }: PageRequest) => {
  loading.value = true;
  const result = await fetchRows({ keyword: applied.value, PageNumber, PageSize });
  rows.value = result.rows;
  total.value = result.total;
  page.value = PageNumber;
  loading.value = false;
};

const onSubmit = () => {
  applied.value = query.keyword;
  const request = list.value?.getPagination(1);
  if (request) search(request);
};

onMounted(() => search({ PageNumber: 1, PageSize: resolveShuoDefault('listCard', 'pageSize') }));
</script>
```

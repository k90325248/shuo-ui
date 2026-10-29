<template>
  <!-- 外層承接 class 等屬性；需要捲動時建議以 tableProps.ui.root 限制高度，表頭才能固定 -->
  <div>
    <!-- 資料區：開啟過渡時以量測高度平滑變化，重新查詢時保留舊資料並淡化 -->
    <div
      data-testid="table-viewport"
      class="common-table-viewport"
      :class="{ 'common-table-viewport--transition': transition }"
      :style="{ height: transition && tableHeight !== void 0 ? `${tableHeight}px` : void 0 }"
    >
      <div ref="tableContent">
        <!-- UTable 只在建立時讀取勾選與列 ID 設定，開關勾選或切換 rowKey 種類時重新建立 -->
        <UTable
          :key="tableKey"
          v-bind="forwardedTableProps"
          :data="data"
          :columns="tableColumns"
          :column-visibility="tableProps?.state?.columnVisibility"
          :loading="loading"
          :pagination-options="{ ...tableProps?.paginationOptions, manualPagination: true }"
          :aria-busy="loading"
          :ui="tableUi"
        >
          <!-- 動態欄位插槽：保留 Table 參數，另提供操作停用狀態 -->
          <template v-for="name in tableSlotNames()" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps" :interaction-disabled="loading" />
          </template>

          <!-- 勾選欄表頭：全選只勾選目前這頁可勾選的資料，關閉全選時顯示表頭文字；可由 select-header 插槽覆寫 -->
          <template v-if="selectable && !$slots['select-header']" #select-header="{ table }">
            <UCheckbox
              v-if="resolved.selectAll"
              v-bind="checkboxProps"
              :model-value="table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected()"
              :disabled="loading || !table.getRowModel().rows.some((row2) => row2.getCanSelect())"
              :aria-label="messages.table.selectAll"
              @update:model-value="(value) => table.toggleAllPageRowsSelected(!!value)"
            />
            <template v-else>{{ selectionHeaderText }}</template>
          </template>

          <!-- 每列的勾選；不可勾選的列與查詢中停用，可由 select-cell 插槽覆寫 -->
          <template v-if="selectable && !$slots['select-cell']" #select-cell="{ row }">
            <UCheckbox
              v-bind="checkboxProps"
              :model-value="row.getIsSelected()"
              :disabled="loading || !row.getCanSelect()"
              :aria-label="messages.table.selectRow"
              @update:model-value="(value) => row.toggleSelected(!!value)"
            />
          </template>

          <!-- 初次載入：依欄位數顯示骨架，列數與每條骨架的 class 可由 prop 或全站設定調整（內建 3 列、高 24px） -->
          <template #body-top>
            <template v-if="initialLoading">
              <tr v-for="row in skeletonRowCount" :key="row" aria-hidden="true">
                <td v-for="column in skeletonColumns" :key="column" class="px-4 py-2">
                  <USkeleton :class="['w-full min-w-16', resolved.skeletonClass]" />
                </td>
              </tr>
            </template>
            <slot v-else name="body-top" :interaction-disabled="loading" />
          </template>

          <!-- 無資料時的查詢狀態，可由使用頁面覆寫 -->
          <template #loading>
            <slot v-if="!initialLoading" name="loading">{{ messages.table.loading }}</slot>
          </template>

          <!-- 查詢完成但沒有符合資料時的提示 -->
          <template #empty>
            <slot name="empty">{{ emptyText }}</slot>
          </template>
        </UTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMessageDefault, useShuoMessages } from "../internal/useShuoLocale";
import { BUILT_IN_DEFAULTS } from "../utils/component-defaults";
import {
  SELECT_COLUMN_ID,
  withSelectColumn,
  fromRowSelection,
  getRowKey,
  toRowSelection
} from "../utils/table-selection";
import { useShuoComponentProps } from "../internal/useShuoComponentProps";
const props = defineProps({
  data: { type: Array, required: true },
  columns: { type: Array, required: true },
  loading: { type: Boolean, required: false, default: false },
  empty: { type: String, required: false },
  transition: { type: Boolean, required: false, default: true },
  skeletonRows: { type: Number, required: false, default: BUILT_IN_DEFAULTS.table.skeletonRows },
  skeletonClass: { type: String, required: false, default: BUILT_IN_DEFAULTS.table.skeletonClass },
  tableProps: { type: Object, required: false, default: void 0 },
  selectable: { type: Boolean, required: false, default: false },
  selectAll: { type: Boolean, required: false, default: BUILT_IN_DEFAULTS.table.selectAll },
  selectionHeader: { type: String, required: false, default: void 0 },
  rowKey: { type: Function, required: false, skipCheck: true, default: void 0 },
  rowSelectable: { type: Function, required: false, default: void 0 },
  checkboxProps: { type: Object, required: false, default: void 0 }
});
const selected = defineModel("selected", { type: Array, ...{ default: () => [] } });
const resolved = useShuoComponentProps(
  "table",
  props
);
const checkboxProps = computed(() => resolved.checkboxProps);
const slots = useSlots();
const messages = useShuoMessages();
const emptyText = useMessageDefault(
  () => props.empty,
  (m) => m.table.empty,
  messages
);
const selectionHeaderText = useMessageDefault(
  () => props.selectionHeader,
  (m) => m.table.selectionHeader,
  messages
);
const tableContent = useTemplateRef("tableContent");
const tableHeight = ref();
let tableResizeObserver;
const firstLoadPending = ref(props.loading);
const initialLoading = computed(() => firstLoadPending.value && props.loading && props.data.length === 0);
const tableColumns = computed(
  () => props.selectable ? withSelectColumn(props.columns, {
    id: SELECT_COLUMN_ID,
    enableSorting: false,
    enableHiding: false,
    meta: { class: { th: "w-px", td: "w-px" } }
  }) : props.columns
);
const rowKeys = computed(
  () => props.data.map((row, index) => props.rowKey === void 0 ? String(index) : getRowKey(row, props.rowKey))
);
const tableKey = computed(() => {
  const rowKey = props.rowKey;
  if (rowKey === void 0) return `${props.selectable}:`;
  return `${props.selectable}:${typeof rowKey === "function" ? "function" : String(rowKey)}`;
});
const getRowId = (row) => String(getRowKey(row, props.rowKey));
const enableRowSelection = (row) => {
  if (props.rowSelectable) return props.rowSelectable(row.original);
  const option = props.tableProps?.rowSelectionOptions?.enableRowSelection;
  return typeof option === "function" ? option(row) : option ?? true;
};
const onRowSelectionChange = (value) => {
  selected.value = fromRowSelection(value, selected.value, rowKeys.value);
};
const forwardedTableProps = computed(() => ({
  ...props.tableProps,
  ...props.rowKey !== void 0 && { getRowId },
  ...props.selectable && {
    "rowSelection": toRowSelection(selected.value),
    "onUpdate:rowSelection": onRowSelectionChange,
    "rowSelectionOptions": { ...props.tableProps?.rowSelectionOptions, enableRowSelection }
  }
}));
const skeletonColumns = computed(() => countColumns(tableColumns.value));
const skeletonRowCount = computed(() => Math.max(1, Math.floor(resolved.skeletonRows) || 1));
const tableUi = computed(() => {
  const ui = props.tableProps?.ui;
  const body = ["common-table-body", props.transition ? void 0 : "common-table-body--instant"];
  if (props.loading && props.data.length) body.push("common-table-body--loading");
  return {
    ...ui,
    th: appendSlotClass(ui?.th, "whitespace-nowrap overflow-visible text-clip"),
    td: appendSlotClass(ui?.td, "py-2"),
    tbody: appendSlotClass(ui?.tbody, body.filter(Boolean).join(" ")),
    loading: appendSlotClass(
      prependSlotClass(ui?.loading, "text-sm text-muted"),
      initialLoading.value ? "hidden" : void 0
    )
  };
});
const appendSlotClass = (value, extra) => {
  if (!extra) return value;
  if (typeof value === "function") return (defaults) => [value(defaults), extra];
  return [value, extra];
};
const prependSlotClass = (value, base) => {
  if (typeof value === "function") return (defaults) => value([defaults, base].join(" "));
  return [base, value];
};
const tableSlotNames = () => Object.keys(slots).filter((name) => !["body-top", "loading", "empty"].includes(name));
const countColumns = (columns) => columns.reduce((count, column) => {
  if ("columns" in column && column.columns) return count + countColumns(column.columns);
  const id = column.id ?? ("accessorKey" in column ? String(column.accessorKey) : void 0);
  return count + (id && props.tableProps?.state?.columnVisibility?.[id] === false ? 0 : 1);
}, 0);
const observeHeight = () => {
  const content = tableContent.value;
  if (!content || tableResizeObserver) return;
  tableHeight.value = content.getBoundingClientRect().height;
  tableResizeObserver = new ResizeObserver(() => {
    tableHeight.value = content.getBoundingClientRect().height;
  });
  tableResizeObserver.observe(content);
};
const stopObserving = () => {
  tableResizeObserver?.disconnect();
  tableResizeObserver = void 0;
  tableHeight.value = void 0;
};
watch(
  () => props.loading,
  (loading) => {
    if (!loading) firstLoadPending.value = false;
  },
  { flush: "sync" }
);
watch(
  () => props.transition,
  (transition) => {
    if (transition) observeHeight();
    else stopObserving();
  }
);
onMounted(() => {
  if (props.transition) observeHeight();
});
onBeforeUnmount(stopObserving);
</script>

<style scoped>
.common-table-viewport {
  overflow: clip;
}
.common-table-viewport--transition {
  transition: height 200ms ease;
}
@media (prefers-reduced-motion: reduce) {
  .common-table-viewport--transition {
    transition: none;
  }
}

:deep(.common-table-body) {
  opacity: 1;
  transition: opacity 200ms ease;
}
:deep(.common-table-body).common-table-body--loading {
  opacity: 0.5;
}
:deep(.common-table-body).common-table-body--instant {
  transition-duration: 0ms;
}
@media (prefers-reduced-motion: reduce) {
  :deep(.common-table-body) {
    transition-duration: 0ms;
  }
}
</style>

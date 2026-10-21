<template>
  <UCard :ui="{ root: 'rounded-[10px] bg-white ring-0 shadow-sm', body: 'p-0 sm:p-0' }">
    <!-- 標題區：圖示、標題與右側自訂操作 -->
    <template #header>
      <div class="flex min-h-8 flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <UIcon v-if="icon" :name="icon" data-testid="list-title-icon" class="text-primary size-5 shrink-0" />
          <h2 class="text-highlighted text-base font-semibold">
            <slot name="title">{{ title }}</slot>
          </h2>
        </div>
        <div v-if="$slots['header-right']" class="flex items-center gap-3">
          <slot name="header-right" :interaction-disabled="loading" />
        </div>
      </div>
    </template>

    <!-- 資料區：接收後端當頁資料，重新查詢時保留舊資料並淡化 -->
    <div
      data-testid="list-viewport"
      class="common-list-viewport"
      :style="{ height: tableHeight === void 0 ? void 0 : `${tableHeight}px` }"
    >
      <div ref="tableContent">
        <UTable
          v-bind="tableProps"
          :data="data"
          :columns="columns"
          :column-visibility="tableProps?.state?.columnVisibility"
          :loading="loading"
          :pagination-options="{ ...tableProps?.paginationOptions, manualPagination: true }"
          :aria-busy="loading"
          :ui="{
  ...tableProps?.ui,
  th: appendSlotClass(tableProps?.ui?.th, 'whitespace-nowrap overflow-visible text-clip'),
  td: appendSlotClass(tableProps?.ui?.td, 'py-2'),
  tbody: appendSlotClass(
    tableProps?.ui?.tbody,
    loading && data.length ? 'common-list-body common-list-body-loading' : 'common-list-body'
  ),
  loading: appendSlotClass(
    prependSlotClass(tableProps?.ui?.loading, 'text-sm text-muted'),
    initialLoading ? 'hidden' : void 0
  )
}"
        >
          <!-- 動態欄位插槽：保留 Table 參數，另提供操作停用狀態 -->
          <template v-for="name in tableSlotNames()" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps" :interaction-disabled="loading" />
          </template>

          <!-- 初次載入：依欄位數顯示 3 列骨架，每條高 24px -->
          <template #body-top>
            <template v-if="initialLoading">
              <tr v-for="row in 3" :key="row" aria-hidden="true">
                <td v-for="column in skeletonColumns" :key="column" class="px-4 py-2">
                  <USkeleton class="h-6 w-full min-w-16" />
                </td>
              </tr>
            </template>
            <slot v-else name="body-top" :interaction-disabled="loading" />
          </template>

          <!-- 無資料時的查詢狀態，可由使用頁面覆寫 -->
          <template #loading>
            <slot v-if="!initialLoading" name="loading">查詢中…</slot>
          </template>

          <!-- 查詢完成但沒有符合資料時的提示 -->
          <template #empty>
            <slot name="empty">{{ empty }}</slot>
          </template>
        </UTable>
      </div>
    </div>

    <!-- 底部區：分頁、筆數範圍與額外內容 -->
    <template v-if="showPagination || showSummary || $slots.footer" #footer>
      <!-- 最小高度與 sm 分頁同為 28px，隱藏分頁時不縮短，換行時自然增高。 -->
      <div class="flex min-h-7 flex-wrap items-center justify-between gap-3">
        <!-- 左側分頁：換頁通知使用頁面查詢，載入中禁止操作 -->
        <UPagination
          v-if="showPagination"
          :page="page"
          :items-per-page="pageSize"
          :total="total"
          :disabled="loading"
          :sibling-count="1"
          size="sm"
          @update:page="onPageChange"
        />
        <!-- 右側統計：依總筆數、已載入頁碼及當頁資料數計算範圍 -->
        <p v-if="showSummary" class="text-muted ms-auto text-sm" aria-live="polite">
          共有
          <span class="text-primary">{{ total }}</span>
          筆資料, 目前顯示第
          <span class="text-primary">{{ rangeStart }}</span>
          筆至第
          <span class="text-primary">{{ rangeEnd }}</span>
          筆資料。
        </p>
      </div>
      <!-- 額外底部內容，可取得查詢中的停用狀態 -->
      <slot name="footer" :interaction-disabled="loading" />
    </template>
  </UCard>
</template>

<script setup>
import { getShuoMessages } from "../utils/messages";
const props = defineProps({
  title: { type: String, required: false, default: () => getShuoMessages().list.title },
  icon: { type: String, required: false, default: "i-lucide-list" },
  data: { type: Array, required: true },
  columns: { type: Array, required: true },
  loading: { type: Boolean, required: false, default: false },
  empty: { type: String, required: false, default: () => getShuoMessages().list.empty },
  total: { type: Number, required: false, default: 0 },
  page: { type: Number, required: false, default: 1 },
  pageSize: { type: Number, required: false, default: 10 },
  showPagination: { type: Boolean, required: false, default: true },
  showSummary: { type: Boolean, required: false, default: true },
  tableProps: { type: Object, required: false }
});
const emit = defineEmits(["page-change"]);
const slots = useSlots();
const tableContent = useTemplateRef("tableContent");
const tableHeight = ref();
let tableResizeObserver;
const firstLoadPending = ref(props.loading);
const rangeStart = computed(() => props.data.length && props.total > 0 ? (props.page - 1) * props.pageSize + 1 : 0);
const rangeEnd = computed(
  () => rangeStart.value ? Math.min(props.total, rangeStart.value + props.data.length - 1) : 0
);
const initialLoading = computed(() => firstLoadPending.value && props.loading && props.data.length === 0);
const skeletonColumns = computed(() => countColumns(props.columns));
const getPagination = (page = props.page) => ({ PageNumber: page, PageSize: props.pageSize });
const onPageChange = (page) => {
  if (props.loading || page === props.page || page < 1 || page > Math.max(1, Math.ceil(props.total / props.pageSize)))
    return;
  emit("page-change", getPagination(page));
};
const appendSlotClass = (value, extra) => {
  if (!extra) return value;
  if (typeof value === "function") return (defaults) => [value(defaults), extra];
  return [value, extra];
};
const prependSlotClass = (value, base) => {
  if (typeof value === "function") return (defaults) => value([defaults, base].join(" "));
  return [base, value];
};
const tableSlotNames = () => Object.keys(slots).filter(
  (name) => !["title", "header-right", "footer", "body-top", "loading", "empty"].includes(name)
);
const countColumns = (columns) => columns.reduce((count, column) => {
  if ("columns" in column && column.columns) return count + countColumns(column.columns);
  const id = column.id ?? ("accessorKey" in column ? String(column.accessorKey) : void 0);
  return count + (id && props.tableProps?.state?.columnVisibility?.[id] === false ? 0 : 1);
}, 0);
defineExpose({ getPagination });
watch(
  () => props.loading,
  (loading) => {
    if (!loading) firstLoadPending.value = false;
  },
  { flush: "sync" }
);
onMounted(() => {
  const content = tableContent.value;
  if (!content) return;
  tableHeight.value = content.getBoundingClientRect().height;
  tableResizeObserver = new ResizeObserver(() => {
    tableHeight.value = content.getBoundingClientRect().height;
  });
  tableResizeObserver.observe(content);
});
onBeforeUnmount(() => tableResizeObserver?.disconnect());
</script>

<style scoped>
.common-list-viewport {
  overflow: clip;
  transition: height 200ms ease;
}
@media (prefers-reduced-motion: reduce) {
  .common-list-viewport {
    transition: none;
  }
}

:deep(.common-list-body) {
  opacity: 1;
  transition: opacity 200ms ease;
}
:deep(.common-list-body).common-list-body-loading {
  opacity: 0.5;
}
@media (prefers-reduced-motion: reduce) {
  :deep(.common-list-body) {
    transition-duration: 0ms;
  }
}
</style>

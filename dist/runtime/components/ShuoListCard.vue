<template>
  <UCard :ui="{ root: 'rounded-[10px] bg-default ring-0 shadow-sm', body: 'p-0 sm:p-0' }">
    <!-- 標題列：圖示、標題與右側自訂操作，與查詢條件卡片一致 -->
    <template #header>
      <div data-slot="bar" :class="styles.bar({ class: listUi?.bar })">
        <UIcon
          v-if="resolved.icon"
          :name="resolved.icon"
          data-testid="list-title-icon"
          data-slot="icon"
          :class="styles.icon({ class: listUi?.icon })"
        />
        <h2 data-slot="title" :class="styles.title({ class: listUi?.title })">
          <slot name="title">{{ title }}</slot>
        </h2>
        <!-- 空間不足時整塊換到下一行並靠右 -->
        <div
          v-if="$slots['header-right']"
          data-slot="headerRight"
          :class="styles.headerRight({ class: listUi?.headerRight })"
        >
          <slot name="header-right" :interaction-disabled="loading" />
        </div>
      </div>
    </template>

    <!-- 資料區：骨架、淡化與高度過渡由表格處理 -->
    <ShuoTable
      :data="data"
      :columns="columns"
      :loading="loading"
      :empty="empty"
      :transition="resolved.transition"
      :table-props="tableProps"
    >
      <!-- 動態插槽：欄位、body-top、loading、empty 原樣轉傳給表格 -->
      <template v-for="name in tableSlotNames()" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps ?? {}" />
      </template>
    </ShuoTable>

    <!-- 底部區：分頁、筆數範圍與額外內容 -->
    <template v-if="resolved.showPagination || resolved.showSummary || $slots.footer" #footer>
      <!-- 最小高度與 sm 分頁同為 28px，隱藏分頁時不縮短，換行時自然增高；兩者皆關閉時不渲染，避免 footer 插槽上方留白。 -->
      <div
        v-if="resolved.showPagination || resolved.showSummary"
        class="flex min-h-7 flex-wrap items-center justify-between gap-3"
      >
        <!-- 左側分頁：換頁通知使用頁面查詢，載入中禁止操作 -->
        <UPagination
          v-if="resolved.showPagination"
          :page="page"
          :items-per-page="resolved.pageSize"
          :total="total"
          :disabled="loading"
          :sibling-count="1"
          size="sm"
          @update:page="onPageChange"
        />
        <!-- 右側統計：依總筆數、已載入頁碼及當頁資料數計算範圍 -->
        <p v-if="resolved.showSummary" class="text-muted ms-auto text-sm" aria-live="polite">
          <template v-for="(part, index) in summaryParts" :key="index">
            <span v-if="part.value" class="text-primary">{{ part.text }}</span>
            <template v-else>{{ part.text }}</template>
          </template>
        </p>
      </div>
      <!-- 額外底部內容，可取得查詢中的停用狀態 -->
      <slot name="footer" :interaction-disabled="loading" />
    </template>
  </UCard>
</template>

<script setup>
import { getShuoMessages } from "../utils/messages";
import { tv } from "@nuxt/ui/utils/tv";
import ShuoTable from "./ShuoTable.vue";
import { BUILT_IN_DEFAULTS } from "../utils/component-defaults";
import { useShuoComponentProps } from "../internal/useShuoComponentProps";
const props = defineProps({
  title: { type: String, required: false, default: () => getShuoMessages().listCard.title },
  icon: { type: String, required: false, default: BUILT_IN_DEFAULTS.listCard.icon },
  data: { type: Array, required: true },
  columns: { type: Array, required: true },
  loading: { type: Boolean, required: false, default: false },
  empty: { type: String, required: false, default: void 0 },
  transition: { type: Boolean, required: false, default: BUILT_IN_DEFAULTS.listCard.transition },
  total: { type: Number, required: false, default: 0 },
  page: { type: Number, required: false, default: 1 },
  pageSize: { type: Number, required: false, default: BUILT_IN_DEFAULTS.listCard.pageSize },
  showPagination: { type: Boolean, required: false, default: BUILT_IN_DEFAULTS.listCard.showPagination },
  showSummary: { type: Boolean, required: false, default: BUILT_IN_DEFAULTS.listCard.showSummary },
  tableProps: { type: Object, required: false, default: void 0 },
  ui: { type: Object, required: false, default: void 0 }
});
const emit = defineEmits(["page-change"]);
const resolved = useShuoComponentProps("listCard", props);
const listUi = computed(() => resolved.ui);
const slots = useSlots();
const messages = getShuoMessages();
const styles = tv({
  slots: {
    bar: "flex min-h-8 flex-wrap items-center gap-2",
    icon: "text-primary size-5 shrink-0",
    title: "text-highlighted shrink-0 text-base font-semibold whitespace-nowrap",
    headerRight: "ml-auto flex min-w-0 items-center gap-3"
  }
})();
const rangeStart = computed(
  () => props.data.length && props.total > 0 ? (props.page - 1) * resolved.pageSize + 1 : 0
);
const rangeEnd = computed(
  () => rangeStart.value ? Math.min(props.total, rangeStart.value + props.data.length - 1) : 0
);
const summaryParts = computed(() => {
  const values = { total: props.total, start: rangeStart.value, end: rangeEnd.value };
  return messages.listCard.summary.split(/(\{(?:total|start|end)\})/).filter(Boolean).map((text) => {
    const key = text.match(/^\{(\w+)\}$/)?.[1];
    return key ? { text: String(values[key]), value: true } : { text, value: false };
  });
});
const getPagination = (page = props.page) => ({ PageNumber: page, PageSize: resolved.pageSize });
const onPageChange = (page) => {
  if (props.loading || page === props.page || page < 1 || page > Math.max(1, Math.ceil(props.total / resolved.pageSize)))
    return;
  emit("page-change", getPagination(page));
};
const tableSlotNames = () => Object.keys(slots).filter((name) => !["title", "header-right", "footer"].includes(name));
defineExpose({ getPagination });
</script>

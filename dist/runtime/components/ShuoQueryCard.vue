<template>
  <UCard :ui="cardUi">
    <!-- 標題列：圖示、標題、收合按鈕與右側自訂內容 -->
    <template #header>
      <div data-slot="bar" :class="styles.bar({ class: queryUi?.bar })">
        <UIcon v-if="queryIcon" :name="queryIcon" data-slot="icon" :class="styles.icon({ class: queryUi?.icon })" />
        <h2 data-slot="title" :class="styles.title({ class: queryUi?.title })">{{ titleText }}</h2>

        <!-- 展開／收合按鈕 -->
        <UButton
          :icon="toggleIcon"
          :aria-label="`${open ? messages.queryCard.collapse : messages.queryCard.expand}${titleText}`"
          :aria-expanded="open"
          :aria-controls="formId"
          color="neutral"
          variant="ghost"
          size="sm"
          type="button"
          data-slot="toggle"
          :class="styles.toggle({ class: queryUi?.toggle })"
          @click="open = !open"
        />

        <!-- 標題列右側自訂內容；空間不足時整塊換到下一行並靠右 -->
        <div
          v-if="$slots['header-right']"
          data-slot="headerRight"
          :class="styles.headerRight({ class: queryUi?.headerRight })"
        >
          <slot name="header-right" />
        </div>
      </div>
    </template>

    <!-- 查詢條件區：可收合的表單 -->
    <Transition name="query-collapse">
      <div v-show="open" data-testid="query-collapse" class="query-collapse" :inert="!open">
        <div data-testid="query-collapse-inner" class="query-collapse-inner">
          <UForm
            :id="formId"
            ref="form"
            v-slot="{ errors, loading }"
            :state="state"
            :schema="schema"
            :validate="validate"
            :validate-on="validateTrigger"
            :disabled="disabled"
            data-slot="form"
            :class="styles.form({ class: queryUi?.form })"
            @submit="emit('submit', $event)"
            @error="onError"
          >
            <!-- 查詢欄位 -->
            <div data-slot="grid" :class="styles.grid({ class: queryUi?.grid })">
              <slot :state="state" :errors="errors" :loading="loading" />
            </div>

            <!-- 隱藏送出按鈕：讓欄位內按 Enter 可送出查詢 -->
            <button type="submit" class="sr-only" tabindex="-1" aria-hidden="true">
              {{ messages.queryCard.submit }}
            </button>

            <!-- 操作按鈕：有提供 actions 插槽時顯示 -->
            <div v-if="$slots.actions" data-slot="actions" :class="styles.actions({ class: queryUi?.actions })">
              <slot name="actions" :submit="submit" :clear="clear" :loading="loading" />
            </div>
          </UForm>
        </div>
      </div>
    </Transition>
  </UCard>
</template>

<script setup>
import { useMessageDefault, useShuoMessages } from "../internal/useShuoLocale";
import { tv } from "@nuxt/ui/utils/tv";
import { mergeUi } from "../utils/ui";
import { BUILT_IN_DEFAULTS } from "../utils/component-defaults";
import { useShuoComponentProps } from "../internal/useShuoComponentProps";
const messages = useShuoMessages();
const titleText = useMessageDefault(
  () => props.title,
  (m) => m.queryCard.title,
  messages
);
const props = defineProps({
  title: { type: String, required: false },
  icon: { type: String, required: false, default: BUILT_IN_DEFAULTS.queryCard.icon },
  expandIcon: { type: String, required: false, default: BUILT_IN_DEFAULTS.queryCard.expandIcon },
  collapseIcon: { type: String, required: false, default: BUILT_IN_DEFAULTS.queryCard.collapseIcon },
  state: { type: null, required: true },
  schema: { type: null, required: false },
  validate: { type: Function, required: false },
  validateOn: { type: Array, required: false },
  disabled: { type: Boolean, required: false, default: false },
  ui: { type: Object, required: false }
});
const emit = defineEmits(["submit", "clear", "error"]);
const resolved = useShuoComponentProps("queryCard", props);
const queryIcon = computed(() => resolved.icon);
const validateTrigger = computed(() => resolved.validateOn);
const queryUi = computed(() => resolved.ui);
const open = defineModel("open", { type: Boolean, ...{ default: true } });
const toggleIcon = computed(() => open.value ? resolved.collapseIcon : resolved.expandIcon);
const appConfig = useAppConfig();
const styles = computed(
  () => tv({
    slots: {
      bar: "flex min-h-8 flex-wrap items-center gap-2",
      icon: "text-primary size-5 shrink-0",
      title: "text-highlighted shrink-0 text-base font-semibold whitespace-nowrap",
      toggle: "shrink-0",
      headerRight: "ml-auto flex min-w-0 items-center gap-3",
      form: ["relative", appConfig.ui.card?.slots?.body ?? "p-4 sm:p-6"],
      grid: "grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2 xl:grid-cols-4",
      actions: "mt-6 flex flex-wrap justify-end gap-2"
    }
  })()
);
const cardUi = computed(() => {
  const {
    bar: _bar,
    icon: _icon,
    title: _title,
    toggle: _toggle,
    headerRight: _headerRight,
    form: _form,
    grid: _grid,
    actions: _actions,
    ...ui
  } = resolved.ui ?? {};
  return mergeUi(
    { root: "overflow-visible rounded-[10px] bg-default ring-0 shadow-sm", body: "p-0 sm:p-0" },
    ui
  );
});
const formId = `query-form-${useId()}`;
const form = useTemplateRef("form");
const submit = async () => {
  if (props.disabled) return;
  await form.value?.submit();
};
const clear = async () => {
  if (props.disabled) return;
  emit("clear");
  await nextTick();
  form.value?.clear();
};
const onError = (event) => {
  open.value = true;
  emit("error", event);
};
defineExpose({ submit, clear });
</script>

<style scoped>
.query-collapse {
  display: grid;
  grid-template-rows: 1fr;
}
.query-collapse .query-collapse-inner {
  min-height: 0;
}
.query-collapse-enter-active, .query-collapse-leave-active {
  transition: grid-template-rows 200ms ease, opacity 200ms ease;
}
.query-collapse-enter-active .query-collapse-inner, .query-collapse-leave-active .query-collapse-inner {
  overflow: hidden;
}
.query-collapse-enter-from, .query-collapse-leave-to {
  grid-template-rows: 0fr;
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .query-collapse-enter-active, .query-collapse-leave-active {
    transition: none;
  }
}
</style>

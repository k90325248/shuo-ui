<template>
  <UCard
    :ui="{
  root: 'overflow-visible rounded-[10px] bg-default ring-0 shadow-sm',
  body: 'p-0 sm:p-0'
}"
  >
    <!-- 標題列：圖示、標題、收合按鈕與右側自訂內容 -->
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon :name="icon" class="text-primary size-5 shrink-0" />
        <h2 class="text-highlighted text-base font-semibold">{{ title }}</h2>

        <!-- 展開／收合按鈕 -->
        <UButton
          :icon="open ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
          :aria-label="`${open ? messages.queryCard.collapse : messages.queryCard.expand}${title}`"
          :aria-expanded="open"
          :aria-controls="formId"
          color="neutral"
          variant="ghost"
          size="sm"
          type="button"
          @click="open = !open"
        />

        <!-- 標題列右側自訂內容 -->
        <slot name="header-right" />
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
            :validate-on="validateOn"
            :disabled="disabled"
            :class="['relative', appConfig.ui.card?.slots?.body ?? 'p-4 sm:p-6']"
            @submit="emit('submit', $event)"
            @error="onError"
          >
            <!-- 查詢欄位 -->
            <div class="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2 xl:grid-cols-4">
              <slot :state="state" :errors="errors" :loading="loading" />
            </div>

            <!-- 隱藏送出按鈕：讓欄位內按 Enter 可送出查詢 -->
            <button type="submit" class="sr-only" tabindex="-1" aria-hidden="true">
              {{ messages.queryCard.submit }}
            </button>

            <!-- 操作按鈕：有提供 actions 插槽時顯示 -->
            <div v-if="$slots.actions" class="mt-6 flex flex-wrap justify-end gap-2">
              <slot name="actions" :submit="submit" :clear="clear" :loading="loading" />
            </div>
          </UForm>
        </div>
      </div>
    </Transition>
  </UCard>
</template>

<script setup>
import { getShuoMessages } from "../utils/messages";
const messages = getShuoMessages();
const props = defineProps({
  title: { type: String, required: false, default: () => getShuoMessages().queryCard.title },
  icon: { type: String, required: false, default: "i-lucide-search" },
  state: { type: null, required: true },
  schema: { type: null, required: false },
  validate: { type: Function, required: false },
  validateOn: { type: Array, required: false },
  disabled: { type: Boolean, required: false, default: false }
});
const emit = defineEmits(["submit", "clear", "error"]);
const open = defineModel("open", { type: Boolean, ...{ default: true } });
const appConfig = useAppConfig();
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

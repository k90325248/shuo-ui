import {
  getShuoDefaultLocale,
  resolveShuoLocale,
  setShuoActiveLocale
} from "../utils/messages.js";
const NUXT_UI_LOCALE = Symbol.for("nuxt-ui.locale-context");
export const useShuoLocale = () => {
  const nuxtUiLocale = inject(NUXT_UI_LOCALE, void 0);
  const locale = computed(() => resolveShuoLocale(nuxtUiLocale?.value?.code ?? getShuoDefaultLocale()));
  if (import.meta.client) watch(() => locale.value.code, setShuoActiveLocale, { immediate: true });
  return locale;
};
export const useShuoMessages = () => {
  const locale = useShuoLocale();
  return computed(() => locale.value.messages);
};
export const useMessageDefault = (value, fallback, messages = useShuoMessages()) => computed(() => value() ?? fallback(messages.value));

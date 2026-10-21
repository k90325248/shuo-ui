import { breakpointsTailwind, useBreakpoints, useResizeObserver } from "@vueuse/core";
export const useChoiceGroup = (props) => {
  const tooltipReference = shallowRef();
  const tooltipText = ref("");
  const isTruncated = ref(false);
  const tooltipOpen = ref(false);
  const isWide = useBreakpoints(breakpointsTailwind).greaterOrEqual(() => props.breakpoint);
  const resolvedOrientation = computed(() => {
    if (props.orientation !== "auto") return props.orientation;
    return isWide.value ? "horizontal" : "vertical";
  });
  const measureTooltip = () => {
    const label = tooltipReference.value?.querySelector("[data-choice-label]");
    tooltipText.value = label?.textContent ?? "";
    isTruncated.value = !!label && label.scrollWidth > label.clientWidth;
    if (!isTruncated.value) tooltipOpen.value = false;
  };
  const showOptionTooltip = (event) => {
    if ("pointerType" in event && event.pointerType === "touch") return;
    const target = event.target;
    tooltipReference.value = target instanceof Element ? target.closest('[data-slot="item"]') ?? void 0 : void 0;
    measureTooltip();
    tooltipOpen.value = isTruncated.value;
  };
  const closeTooltip = () => {
    tooltipOpen.value = false;
  };
  useResizeObserver(tooltipReference, measureTooltip);
  watch([() => props.items, resolvedOrientation], measureTooltip, { deep: true, flush: "post" });
  return {
    resolvedOrientation,
    tooltipReference,
    tooltipText,
    isTruncated,
    tooltipOpen,
    showOptionTooltip,
    closeTooltip
  };
};

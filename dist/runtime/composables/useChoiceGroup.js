import { breakpointsTailwind, useBreakpoints, useMounted, useResizeObserver } from "@vueuse/core";
export const getChoiceGroupUi = ({ orientation, grid, loading }) => {
  const horizontal = orientation === "horizontal";
  const join = (...classes) => classes.filter(Boolean).join(" ");
  return {
    root: grid ? "w-full max-w-full min-w-0" : "w-fit max-w-full min-w-0",
    fieldset: join(
      "min-w-0 flex-nowrap justify-start",
      grid && "grid grid-cols-1",
      horizontal && "h-(--choice-control-height) items-center gap-x-2"
    ),
    item: join(
      "min-w-0 w-fit max-w-full text-start",
      horizontal && "min-w-[calc(var(--choice-indicator-size)+0.25rem)] flex-[0_1_auto] items-center",
      grid && "min-h-(--choice-control-height) items-center",
      loading && "relative"
    ),
    wrapper: join("w-auto min-w-0", horizontal && "ms-1"),
    label: "w-fit max-w-full",
    base: loading ? "opacity-0" : void 0
  };
};
export const useChoiceGroup = (props) => {
  const tooltipReference = shallowRef();
  const tooltipText = ref("");
  const isTruncated = ref(false);
  const tooltipOpen = ref(false);
  const isWide = useBreakpoints(breakpointsTailwind).greaterOrEqual(() => props.breakpoint);
  const isMounted = useMounted();
  const resolvedOrientation = computed(() => {
    if (props.orientation !== "auto") return props.orientation;
    return isMounted.value && isWide.value ? "horizontal" : "vertical";
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

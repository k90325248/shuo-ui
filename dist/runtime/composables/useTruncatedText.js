export const useTruncatedText = (root, text, selector) => {
  const isTruncated = ref(false);
  const tooltipOpen = ref(false);
  let observer;
  const measure = () => {
    const element = root.value?.querySelector(selector);
    if (!element || !text.value) {
      isTruncated.value = false;
      return;
    }
    if (element instanceof HTMLInputElement) {
      const style = getComputedStyle(element);
      const context = document.createElement("canvas").getContext("2d");
      if (!context) return;
      context.font = style.font;
      const spacing = Number.parseFloat(style.letterSpacing) || 0;
      const width = context.measureText(text.value).width + spacing * Math.max(0, text.value.length - 1);
      const available = element.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      isTruncated.value = width > available;
      return;
    }
    isTruncated.value = element.scrollWidth > element.clientWidth;
  };
  const showTooltip = () => {
    measure();
    tooltipOpen.value = true;
  };
  onMounted(() => {
    observer = new ResizeObserver(measure);
    if (root.value) observer.observe(root.value);
    measure();
  });
  watch(text, measure, { flush: "post" });
  onBeforeUnmount(() => observer?.disconnect());
  return { isTruncated, measure, tooltipOpen, showTooltip };
};

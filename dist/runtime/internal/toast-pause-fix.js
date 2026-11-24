export const TOAST_VIEWPORT_SELECTOR = '[role="region"] > [data-slot="viewport"]';
export function resumeStuckToastViewports(doc, createEvent = () => new PointerEvent("pointerleave")) {
  if (!doc.hasFocus()) return 0;
  let count = 0;
  for (const viewport of doc.querySelectorAll(TOAST_VIEWPORT_SELECTOR)) {
    if (viewport.matches(":hover")) continue;
    if (doc.activeElement && viewport.contains(doc.activeElement)) continue;
    viewport.dispatchEvent(createEvent());
    count++;
  }
  return count;
}

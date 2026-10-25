const touchModality = ref(false);
let installed = false;
const onPointer = (event) => {
  touchModality.value = event.pointerType === "touch";
};
const onKeydown = () => {
  touchModality.value = false;
};
export const usePointerModality = () => {
  onMounted(() => {
    if (installed) return;
    installed = true;
    document.addEventListener("pointerdown", onPointer, { capture: true, passive: true });
    document.addEventListener(
      "pointermove",
      (event) => {
        if (event.pointerType === "mouse") onPointer(event);
      },
      { capture: true, passive: true }
    );
    document.addEventListener("keydown", onKeydown, { capture: true, passive: true });
  });
  return touchModality;
};

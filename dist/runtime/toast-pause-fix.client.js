import { nextTick, watch } from "vue";
import { defineNuxtPlugin, useToast } from "#imports";
import { resumeStuckToastViewports } from "./internal/toast-pause-fix.js";
export default defineNuxtPlugin({
  name: "shuo-ui:toast-pause-fix",
  setup() {
    const { toasts } = useToast();
    watch(
      () => toasts.value.length,
      (count, previous) => {
        if (!previous && count > 0) {
          nextTick(() => requestAnimationFrame(() => resumeStuckToastViewports(document)));
        }
      },
      { flush: "post" }
    );
  }
});

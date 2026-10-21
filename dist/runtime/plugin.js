import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import { setShuoMessages } from "./utils/messages.js";
export default defineNuxtPlugin({
  name: "shuo-ui",
  setup() {
    const config = useRuntimeConfig().public.shuoUi;
    setShuoMessages(config?.messages);
  }
});

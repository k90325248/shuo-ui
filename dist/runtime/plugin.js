import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import { setShuoMessages } from "./utils/messages.js";
import { setShuoComponentDefaults } from "./utils/component-defaults.js";
export default defineNuxtPlugin({
  name: "shuo-ui",
  setup() {
    const config = useRuntimeConfig().public.shuoUi;
    setShuoMessages(config?.messages);
    setShuoComponentDefaults(config?.components);
  }
});

import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import { setShuoLocales } from "./utils/messages.js";
import { setShuoComponentDefaults } from "./utils/component-defaults.js";
export default defineNuxtPlugin({
  name: "shuo-ui",
  setup() {
    const config = useRuntimeConfig().public.shuoUi;
    setShuoLocales({ locale: config?.locale, messages: config?.messages, locales: config?.locales });
    setShuoComponentDefaults(config?.components);
  }
});

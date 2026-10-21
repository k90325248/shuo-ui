import { defineNuxtModule, createResolver, addComponent, addImportsDir, addPlugin } from '@nuxt/kit';
import { defu } from 'defu';
import { readdirSync } from 'node:fs';
import { defaultTheme } from '../dist/runtime/theme.js';

const ICONS = [
  "lucide:chevron-down",
  "lucide:chevron-up",
  "lucide:circle-alert",
  "lucide:download",
  "lucide:eye",
  "lucide:eye-off",
  "lucide:list",
  "lucide:paperclip",
  "lucide:search",
  "lucide:x"
];
const module$1 = defineNuxtModule({
  meta: {
    name: "@shuo/ui",
    configKey: "shuoUi",
    compatibility: { nuxt: ">=4.0.0" }
  },
  defaults: {
    prefix: "Shuo",
    theme: true,
    css: true,
    messages: {}
  },
  moduleDependencies: {
    "@nuxt/ui": {}
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const runtime = resolve("./runtime");
    nuxt.options.imports.transform ||= {};
    nuxt.options.imports.transform.include ||= [];
    nuxt.options.imports.transform.include.push(
      /[\\/]@shuo[\\/]ui[\\/]dist[\\/]runtime[\\/]/,
      new RegExp(runtime.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    );
    nuxt.options.alias["#shuo-ui"] = runtime;
    const componentsDir = resolve("./runtime/components");
    for (const file of readdirSync(componentsDir).filter((name) => name.endsWith(".vue"))) {
      const name = file.replace(/^Shuo/, "").replace(/\.vue$/, "");
      addComponent({ name: `${options.prefix}${name}`, filePath: resolve(componentsDir, file) });
    }
    addImportsDir(resolve("./runtime/utils"));
    addImportsDir(resolve("./runtime/composables"));
    nuxt.options.runtimeConfig.public.shuoUi = defu(nuxt.options.runtimeConfig.public.shuoUi, {
      messages: options.messages
    });
    addPlugin(resolve("./runtime/plugin"));
    if (options.css) nuxt.options.css.push(resolve("./runtime/assets/css/shuo-ui.css"));
    if (options.theme)
      nuxt.options.appConfig.ui = defu(
        nuxt.options.appConfig.ui,
        defaultTheme
      );
    const iconOptions = nuxt.options;
    iconOptions.icon ||= {};
    iconOptions.icon.clientBundle ||= {};
    iconOptions.icon.clientBundle.icons = [.../* @__PURE__ */ new Set([...iconOptions.icon.clientBundle.icons ?? [], ...ICONS])];
    nuxt.options.build.transpile.push("@vuepic/vue-datepicker");
    const installed = import.meta.url.includes("node_modules");
    const deps = ["date-fns", "date-fns/locale", "valibot"].map((name) => installed ? `@shuo/ui > ${name}` : name);
    nuxt.options.vite.optimizeDeps = defu(nuxt.options.vite.optimizeDeps, { include: deps });
  }
});

export { module$1 as default };

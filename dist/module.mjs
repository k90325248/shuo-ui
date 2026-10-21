import { defineNuxtModule, createResolver, addComponent, addImportsDir, addPlugin } from '@nuxt/kit';
import { defu } from 'defu';
import { readdirSync } from 'node:fs';
import { defaultTheme } from '../dist/runtime/theme.js';

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
    nuxt.options.build.transpile.push("@vuepic/vue-datepicker");
    nuxt.options.vite.optimizeDeps = defu(nuxt.options.vite.optimizeDeps, {
      include: ["date-fns", "date-fns/locale", "valibot"]
    });
  }
});

export { module$1 as default };

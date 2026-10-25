import { defineNuxtModule, createResolver, addComponent, addImports, addPlugin } from '@nuxt/kit';
import { defu } from 'defu';
import { readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { defaultTheme } from '../dist/runtime/theme.js';
import { collectConfiguredIcons, toBundleIconName, filterInstalledIcons } from '../dist/runtime/internal/configured-icons.js';

const PUBLIC_IMPORTS = {
  "validation": ["requiredText", "requiredNumber", "requiredArray", "optionalEmail", "optionalNonNegativeNumber"],
  "date": ["formatDateDisplay", "parseDateValue"],
  "number": ["formatNumberDisplay"],
  "phone": ["splitPhone", "joinPhone"],
  "months": ["splitMonths", "combineMonths"],
  "component-defaults": ["resolveShuoDefault", "getShuoComponentDefaults"]
};

const ICONS = [
  "lucide:calendar",
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
    locale: "zh-TW",
    messages: {},
    locales: {},
    components: {}
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
    addImports(
      Object.entries(PUBLIC_IMPORTS).flatMap(
        ([file, names]) => names.map((name) => ({ name, from: resolve(`./runtime/utils/${file}`) }))
      )
    );
    const publicConfig = nuxt.options.runtimeConfig.public;
    publicConfig.shuoUi = defu(publicConfig.shuoUi, {
      locale: options.locale,
      messages: options.messages,
      locales: options.locales,
      components: options.components
    });
    addPlugin(resolve("./runtime/plugin"));
    if (options.css) nuxt.options.css.push(resolve("./runtime/assets/css/shuo-ui.css"));
    if (options.theme)
      nuxt.options.appConfig.ui = defu(
        nuxt.options.appConfig.ui,
        defaultTheme
      );
    const projectRequire = createRequire(join(nuxt.options.rootDir, "package.json"));
    const hasCollection = (prefix) => {
      try {
        projectRequire.resolve(`@iconify-json/${prefix}/icons.json`);
        return true;
      } catch {
        return false;
      }
    };
    const configured = collectConfiguredIcons(options.components).map((name) => toBundleIconName(name, hasCollection));
    const iconOptions = nuxt.options;
    iconOptions.icon ||= {};
    iconOptions.icon.clientBundle ||= {};
    iconOptions.icon.clientBundle.icons = [
      .../* @__PURE__ */ new Set([
        ...iconOptions.icon.clientBundle.icons ?? [],
        ...filterInstalledIcons([...ICONS, ...configured], hasCollection)
      ])
    ];
    nuxt.options.build.transpile.push("@vuepic/vue-datepicker");
    const installed = import.meta.url.includes("node_modules");
    const deps = ["date-fns", "date-fns/locale", "valibot"].map((name) => installed ? `@shuo/ui > ${name}` : name);
    nuxt.options.vite.optimizeDeps = defu(nuxt.options.vite.optimizeDeps, { include: deps });
  }
});

export { module$1 as default };

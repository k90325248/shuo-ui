---
canonical_url: "https://k90325248.github.io/shuo-ui/en"
---
<u-page-hero>
<template v-slot:title="">

Shuo UI

</template>

<template v-slot:description="">

[Nuxt UI](https://ui.nuxt.com) components shaped around the way our projects build forms. Masking, thousands separators, ROC dates, query cards and other features that every project used to implement on its own now live in one module, so everyone uses the same set and fixes only need to happen in one place.

</template>

<template v-slot:links="">
<u-button to="https://k90325248.github.io/shuo-ui/getting-started/overview/installation" size="xl" trailing-icon="i-lucide-arrow-right">

Get started

</u-button>

<u-button to="https://k90325248.github.io/shuo-ui/getting-started/overview/introduction" color="neutral" size="xl" variant="subtle">

Learn more

</u-button>
</template>
</u-page-hero>

<u-page-section>
<template v-slot:title="">

Why this module

</template>

<template v-slot:description="">

Each project used to write its own set of form components: ID numbers need masking, amounts need thousands separators, dates need ROC years, and query pages need a collapsible filter section. The features were much the same, but the code, prop names and details all differed, so fixing one issue meant changing every project.

</template>

<div className="grid,gap-6,md:grid-cols-3">
<u-page-card icon="i-lucide-copy-check" title="Consistent usage">

The same need uses the same component and props, so switching projects or picking up someone else's code takes no relearning.

</u-page-card>

<u-page-card icon="i-lucide-wrench" title="Maintained in one place">

Fix an issue once and every project gets it by updating the version, with no more copy and paste.

</u-page-card>

<u-page-card icon="i-lucide-feather" title="No reinventing">

Every component is built on Nuxt UI and only adds what we commonly need; for everything else, follow the Nuxt UI docs.

</u-page-card>
</div>
</u-page-section>

<u-page-section>
<template v-slot:title="">

See it in action

</template>

<template v-slot:description="">

Below is a set of fields you can actually use. Turn on the switch to see each component's skeleton while data is loading; turn it off and everything you entered is still there.

</template>

<div className="mx-auto,max-w-3xl">
<component-example name="home-form">



</component-example>
</div>
</u-page-section>

<u-page-section>
<template v-slot:title="">

What it takes care of

</template>

<template v-slot:features="">
<u-page-feature icon="i-lucide-layers">
<template v-slot:title="">

Built on Nuxt UI

</template>

<template v-slot:description="">

Nuxt UI props, slots and refs that are not redeclared can be used directly, with full type inference.

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-scan-line">
<template v-slot:title="">

Consistent states

</template>

<template v-slot:description="">

Size, disabled, loading and skeleton behave the same on every form component, and follow `UFormField` and `UForm`.

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-languages">
<template v-slot:title="">

Traditional Chinese and English

</template>

<template v-slot:description="">

Validation messages, tooltips and accessible labels default to Traditional Chinese, follow the Nuxt UI locale with English built in, and can be overridden in the module options.

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-shield-check">
<template v-slot:title="">

Shared validation rules

</template>

<template v-slot:description="">

Common Valibot rules for required fields, numbers and more are ready and auto-imported, with consistent error messages across the site.

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-sliders-horizontal">
<template v-slot:title="">

Site-wide defaults

</template>

<template v-slot:description="">

Size, display format, icons and more can be set once in `nuxt.config.ts`, while values passed explicitly on a component still win.

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-palette">
<template v-slot:title="">

Styling stays with your project

</template>

<template v-slot:description="">

Built on Nuxt UI semantic colors and CSS variables, so colors and themes are decided by your project, not locked in by the library.

</template>
</u-page-feature>
</template>
</u-page-section>

<u-page-section>
<template v-slot:title="">

Components

</template>

<template v-slot:description="">

There are 16 components, roughly grouped as below. Every component page has live examples and a full props table.

</template>

<div className="grid,gap-6,sm:grid-cols-2,lg:grid-cols-3">
<u-page-card icon="i-lucide-text-cursor-input" title="Text and numbers" to="https://k90325248.github.io/shuo-ui/components/text/input-text">

ShuoInputText, ShuoInputNumber, ShuoTextarea

</u-page-card>

<u-page-card icon="i-lucide-list-checks" title="Choice" to="https://k90325248.github.io/shuo-ui/components/choice/select-menu">

ShuoSelectMenu, ShuoCheckbox, ShuoRadioGroup, ShuoCheckboxGroup

</u-page-card>

<u-page-card icon="i-lucide-calendar-days" title="Dates and periods" to="https://k90325248.github.io/shuo-ui/components/date/datepicker">

ShuoDatepicker, ShuoMonths

</u-page-card>

<u-page-card icon="i-lucide-phone" title="Phone and files" to="https://k90325248.github.io/shuo-ui/components/phone-file/phone">

ShuoPhone, ShuoFile

</u-page-card>

<u-page-card icon="i-lucide-layout-list" title="Query page layout" to="https://k90325248.github.io/shuo-ui/components/layout/query-card">

ShuoQueryCard, ShuoListCard, ShuoTable

</u-page-card>

<u-page-card icon="i-lucide-info" title="Helpers" to="https://k90325248.github.io/shuo-ui/components/helper/info-tooltip">

ShuoInfoTooltip, ShuoTooltip

</u-page-card>
</div>
</u-page-section>

<u-page-section>
<template v-slot:title="">

Maintained together

</template>

<template v-slot:description="">

This module exists to be shared by many projects, so before adding a feature we ask: is this something most projects need? Special behavior that only one project needs is best kept in that project, handled through Nuxt UI's own props or slots, so the library stays simple and easy to maintain.

</template>

<template v-slot:links="">
<u-button to="https://k90325248.github.io/shuo-ui/getting-started/overview/quick-start" color="neutral" trailing-icon="i-lucide-arrow-right" variant="subtle">

Start with your first form

</u-button>
</template>
</u-page-section>

## Resources for Agents

- [API catalog: every service document this site publishes](https://k90325248.github.io/shuo-ui/.well-known/api-catalog)
- [Sitemap (XML)](https://k90325248.github.io/shuo-ui/sitemap.xml)
- [Sitemap (Markdown): every page on the site](https://k90325248.github.io/shuo-ui/sitemap.md)
- [llms.txt: index of the documentation for LLMs](https://k90325248.github.io/shuo-ui/llms.txt)
- [llms-full.txt: the full documentation as a single file](https://k90325248.github.io/shuo-ui/llms-full.txt)
- [OpenAPI document: every route this site serves to agents](https://k90325248.github.io/shuo-ui/openapi.json)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.

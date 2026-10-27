---
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw"
---
<u-page-hero>
<template v-slot:title="">

Shuo UI

</template>

<template v-slot:description="">

依照我們專案的表單寫法整理出來的 [Nuxt UI](https://ui.nuxt.com) 元件。把各專案重複實作的遮罩、千分位、民國年、查詢卡片等功能集中到一個模組，大家用同一套，維護也只需要改一個地方。

</template>

<template v-slot:links="">
<u-button to="https://k90325248.github.io/shuo-ui/getting-started/overview/installation" size="xl" trailing-icon="i-lucide-arrow-right">

開始使用

</u-button>

<u-button to="https://k90325248.github.io/shuo-ui/getting-started/overview/introduction" color="neutral" size="xl" variant="subtle">

了解更多

</u-button>
</template>
</u-page-hero>

<u-page-section>
<template v-slot:title="">

為什麼要做這個模組

</template>

<template v-slot:description="">

過去每個專案都會各自寫一套表單元件：身分證要遮蔽、金額要千分位、日期要顯示民國年、查詢頁要有可收合的條件區塊。功能大同小異，但寫法、參數名稱和細節各不相同，修一個問題要到每個專案各改一次。

</template>

<div className="grid,gap-6,md:grid-cols-3">
<u-page-card icon="i-lucide-copy-check" title="寫法一致">

同樣的需求用同樣的元件和參數，換專案、接手別人的程式碼時不用重新熟悉。

</u-page-card>

<u-page-card icon="i-lucide-wrench" title="集中維護">

問題修一次，各專案更新版本就能拿到，不用再到處複製貼上。

</u-page-card>

<u-page-card icon="i-lucide-feather" title="不另起爐灶">

元件都建立在 Nuxt UI 之上，只補上我們常用的部分，其餘照 Nuxt UI 文件使用即可。

</u-page-card>
</div>
</u-page-section>

<u-page-section>
<template v-slot:title="">

實際用起來的樣子

</template>

<template v-slot:description="">

下面是一組真的可以操作的欄位。打開開關，可以看到每個元件在資料載入中時的骨架效果；關掉後，原本填的內容都還在。

</template>

<div className="mx-auto,max-w-3xl">
<component-example name="home-form">



</component-example>
</div>
</u-page-section>

<u-page-section>
<template v-slot:title="">

它幫你處理了哪些事

</template>

<template v-slot:features="">
<u-page-feature icon="i-lucide-layers">
<template v-slot:title="">

沿用 Nuxt UI

</template>

<template v-slot:description="">

沒有另外宣告的 Nuxt UI 參數、插槽與 ref 都能直接使用，型別也會一併推導。

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-scan-line">
<template v-slot:title="">

一致的狀態

</template>

<template v-slot:description="">

尺寸、停用、載入中與骨架在每個表單元件上的行為都相同，並會跟著 `UFormField`、`UForm` 走。

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-languages">
<template v-slot:title="">

繁體中文預設

</template>

<template v-slot:description="">

驗證訊息、提示文字與無障礙標籤預設為繁體中文，需要時可在模組設定覆寫。

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-shield-check">
<template v-slot:title="">

共用驗證規則

</template>

<template v-slot:description="">

常用的必填、數字等 Valibot 規則已經寫好並自動匯入，錯誤訊息格式全站一致。

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-sliders-horizontal">
<template v-slot:title="">

全站預設值

</template>

<template v-slot:description="">

尺寸、顯示格式、圖示等可在 `nuxt.config.ts` 統一設定，元件上明確傳入的值仍然優先。

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-palette">
<template v-slot:title="">

樣式交給專案

</template>

<template v-slot:description="">

使用 Nuxt UI 的語意色與 CSS 變數，顏色和主題由使用的專案決定，不會被元件庫綁死。

</template>
</u-page-feature>
</template>
</u-page-section>

<u-page-section>
<template v-slot:title="">

有哪些元件

</template>

<template v-slot:description="">

目前共 16 個元件，大致分成下面幾類。每個元件頁都有可操作的範例和完整參數表。

</template>

<div className="grid,gap-6,sm:grid-cols-2,lg:grid-cols-3">
<u-page-card icon="i-lucide-text-cursor-input" title="文字與數字" to="https://k90325248.github.io/shuo-ui/components/text/input-text">

ShuoInputText、ShuoInputNumber、ShuoTextarea

</u-page-card>

<u-page-card icon="i-lucide-list-checks" title="選擇" to="https://k90325248.github.io/shuo-ui/components/choice/select-menu">

ShuoSelectMenu、ShuoCheckbox、ShuoRadioGroup、ShuoCheckboxGroup、ShuoSwitch

</u-page-card>

<u-page-card icon="i-lucide-calendar-days" title="日期與期間" to="https://k90325248.github.io/shuo-ui/components/date/datepicker">

ShuoDatepicker、ShuoMonths

</u-page-card>

<u-page-card icon="i-lucide-phone" title="電話與附件" to="https://k90325248.github.io/shuo-ui/components/phone-file/phone">

ShuoPhone、ShuoFile

</u-page-card>

<u-page-card icon="i-lucide-layout-list" title="查詢頁版面" to="https://k90325248.github.io/shuo-ui/components/layout/query-card">

ShuoQueryCard、ShuoListCard、ShuoTable

</u-page-card>

<u-page-card icon="i-lucide-info" title="輔助說明" to="https://k90325248.github.io/shuo-ui/components/helper/info-tooltip">

ShuoInfoTooltip、ShuoTooltip

</u-page-card>
</div>
</u-page-section>

<u-page-section>
<template v-slot:title="">

一起維護

</template>

<template v-slot:description="">

這個模組是為了多個專案共用而做的，所以新增功能時會先想：這是不是大部分專案都會遇到的需求？只有單一專案用得到的特殊行為，建議留在該專案內，透過 Nuxt UI 原本的參數或插槽處理，讓元件庫保持簡單、好維護。

</template>

<template v-slot:links="">
<u-button to="https://k90325248.github.io/shuo-ui/getting-started/overview/quick-start" color="neutral" trailing-icon="i-lucide-arrow-right" variant="subtle">

從第一個表單開始

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

---
title: "SelectMenu"
description: "下拉選單，可搜尋、多選，文字過長時顯示完整提示。"
canonical_url: "https://k90325248.github.io/components/select-menu"
---
# SelectMenu

> 下拉選單，可搜尋、多選，文字過長時顯示完整提示。

基於 `USelectMenu`，帶有搜尋與省略提示。單選 `v-model` 為選項的 value，多選為 value 陣列。

## 用法

### 單選與多選

單選綁定選項的 value；`multiple` 時綁定 value 陣列。單選未選取時為 `emptyValue`（預設 `''`），多選為 `[]`。

<component-example name="select-menu-basic">



</component-example>

### 顯示格式

預設只顯示名稱。`{value}`、`{label}` 會被替換，替換結果不再二次解析，未知標記原樣保留。關鍵字查詢依 `labelKey` 欄位比對，不受顯示格式影響。

<component-example name="select-menu-format">



</component-example>

要讓整個專案都顯示「值_名稱」，在全站設定 `format`：

<code-group>

```vue [單一元件]
<ShuoSelectMenu v-model="state.type" :items="items" format="{value}_{label}" />
```

```ts [全站設定]
// nuxt.config.ts
export default defineNuxtConfig({
  shuoUi: {
    components: {
      selectMenu: { format: '{value}_{label}' }
    }
  }
});
```

</code-group>

### 自訂選項欄位

後端欄位不是 `label`、`value` 時，以 `label-key`、`value-key` 指定。`USelectMenu` 的 `description-key` 等 props 也能直接使用，欄位名稱依 `items` 推導，寫錯會有型別錯誤。

<component-example name="select-menu-keys">



</component-example>

### 載入中、停用與骨架

切換骨架、停用或載入中時會關閉已開啟的選單，還原後不自動重開。

<component-example name="select-menu-states">



</component-example>

## Props

<component-props name="ShuoSelectMenu">



</component-props>

`open` 未設定時由使用者操作開關，不提供 v-model。`clear`、`clearIcon` 的型別依 Nuxt UI 的另一個泛型推導，本元件未提供，因此不列入型別。

## Slots

`USelectMenu` 的 slot 全部可用（`leading`、`trailing`、`item`、`item-leading`、`content-top` 等）。以下三個有傳入時取代元件的內建內容：

<table>
<thead>
  <tr>
    <th>
      Slot
    </th>
    
    <th>
      內建內容
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        item-label
      </code>
    </td>
    
    <td>
      依 <code>
        format
      </code>
      
       格式化的選項文字
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        default
      </code>
    </td>
    
    <td>
      依 <code>
        format
      </code>
      
       格式化的已選取文字
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        empty
      </code>
    </td>
    
    <td>
      「無可用選項」
    </td>
  </tr>
</tbody>
</table>

## Expose

<table>
<thead>
  <tr>
    <th>
      名稱
    </th>
    
    <th>
      型別
    </th>
    
    <th>
      說明
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        triggerRef
      </code>
    </td>
    
    <td>
      <code>
        HTMLButtonElement
      </code>
    </td>
    
    <td>
      觸發按鈕
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        viewportRef
      </code>
    </td>
    
    <td>
      <code>
        HTMLDivElement | null
      </code>
    </td>
    
    <td>
      選單捲動區域
    </td>
  </tr>
</tbody>
</table>

## 樣式

`ui` 可用 Nuxt UI `USelectMenu` 的所有 slot，另外提供 `wrapper`：

<table>
<thead>
  <tr>
    <th>
      Slot
    </th>
    
    <th>
      部位
    </th>
    
    <th>
      內建樣式
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        wrapper
      </code>
    </td>
    
    <td>
      外層，量測省略文字並掛 Tooltip
    </td>
    
    <td>
      <code>
        flex w-full min-w-0
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        base
      </code>
    </td>
    
    <td>
      觸發按鈕（Nuxt UI）
    </td>
    
    <td>
      <code>
        w-full min-w-0
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        value
      </code>
      
      、<code>
        placeholder
      </code>
    </td>
    
    <td>
      已選取文字、提示文字（Nuxt UI）
    </td>
    
    <td>
      <code>
        min-w-0 truncate
      </code>
    </td>
  </tr>
</tbody>
</table>

要縮短寬度時設定 `ui.wrapper`（例如 `w-40`），觸發按鈕會填滿外層；`class` 落在觸發按鈕，不影響外層。`ui.value`、`ui.placeholder` 在已選取、未選取與找不到選項時都套用。

---

- [USelectMenu](https://ui.nuxt.com/docs/components/select-menu)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.

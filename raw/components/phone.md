---
title: "Phone"
description: "市話號碼，兩個輸入框分別輸入區碼與電話。"
canonical_url: "https://k90325248.github.io/components/phone"
---
# Phone

> 市話號碼，兩個輸入框分別輸入區碼與電話。

`v-model: string`（完整號碼），另有 `v-model:area-code`、`v-model:number`，見下方 [v-model](#v-model)。

## 用法

### 綁定

三個綁定同步更新，完整號碼為區碼加電話，不加分隔符號。按「讀取綁定值」以通知顯示目前的三個值。

<component-example name="phone-basic">



</component-example>

- 三者皆保留字串與開頭的 `0`，例如區碼 `02`、電話 `00123456`，完整號碼為 `0200123456`。
- 使用者輸入或貼上時只保留半形數字；父層回填則原樣顯示，使用者編輯該欄後才過濾。
- 區碼或電話型別不符時只清空該欄並重新合併完整號碼；完整號碼型別不符時兩欄一併清空。

### 只回填完整號碼

只回填完整號碼時，依已知且符合前綴的區碼拆分；沒有可用區碼則全文放入電話欄並清空區碼，不猜測長度。要拆成兩欄，請同時綁定 `v-model:area-code` 並給已知區碼。切換 `area-code` 比較兩種結果：

<component-example name="phone-split">



</component-example>

### 外觀

沿用 `UInput` 的 `color` 與 `highlight`，同時套用到區碼與電話兩個輸入框。

<component-example name="phone-color">



</component-example>

### 尺寸與狀態

載入中在電話號碼欄最右側顯示轉圈圖示並停用兩欄；各狀態的共通行為見[共用參數](https://k90325248.github.io/components/common)。

<component-example name="phone-states">



</component-example>

## 範例

### 搭配表單驗證

元件不內建電話長度或區碼合法性規則，請由表單 schema 定義。範例以 `requiredText` 檢查必填，再以 `v.regex` 檢查完整號碼的格式。

<component-example name="phone-validation">



</component-example>

### 區碼與電話分開儲存

後端以兩個欄位儲存時，只綁 `v-model:area-code` 與 `v-model:number`。按「載入資料」模擬向後端取資料，期間以 `loading` 停用輸入。

<component-example name="phone-parts">



</component-example>

## v-model

<table>
<thead>
  <tr>
    <th>
      v-model
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
        v-model
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      完整號碼（區碼加號碼，無分隔符號）
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        v-model:area-code
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      區碼
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        v-model:number
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      電話號碼
    </td>
  </tr>
</tbody>
</table>

## Props

<component-props name="ShuoPhone">



</component-props>

`size`、`disabled`、`loading`、`skeleton`、`name` 的行為見[共用參數](https://k90325248.github.io/components/common#%E5%85%B1%E7%94%A8%E5%8F%83%E6%95%B8)；`id` 指向區碼框。

## 樣式

`ui` 合併規則見[單一元件的 `ui` prop](https://k90325248.github.io/guides/theming#%E5%96%AE%E4%B8%80%E5%85%83%E4%BB%B6%E7%9A%84-ui-prop)；`areaCode`、`number` 的值同 Nuxt UI `UInput` 的 `ui`：

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
        root
      </code>
    </td>
    
    <td>
      外層
    </td>
    
    <td>
      <code>
        flex w-full min-w-0 items-center gap-2
      </code>
      
      ，字級依尺寸
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        areaCode
      </code>
    </td>
    
    <td>
      區碼輸入框
    </td>
    
    <td>
      <code>
        root
      </code>
      
       容納三位數、最多佔一半寬度；<code>
        base
      </code>
      
       為 <code>
        text-center tabular-nums
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      電話號碼輸入框
    </td>
    
    <td>
      <code>
        root
      </code>
      
       為 <code>
        min-w-0 flex-1
      </code>
      
      ；<code>
        base
      </code>
      
       為 <code>
        tabular-nums
      </code>
    </td>
  </tr>
</tbody>
</table>

```vue
<ShuoPhone
  v-model="fullPhone"
  class="w-72"
  :ui="{ areaCode: { root: 'w-20' } }"
/>
```

外層的 `class` 與 `ui.root` 一起合併，可覆寫寬度。

## 更新紀錄

<component-changelog name="ShuoPhone">



</component-changelog>

---

- [UInput](https://ui.nuxt.com/docs/components/input)


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.

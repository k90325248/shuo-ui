---
title: "共用參數"
description: "表單輸入元件共同支援的參數、骨架行為與空值約定。"
canonical_url: "https://k90325248.github.io/components/common"
---
# 共用參數

> 表單輸入元件共同支援的參數、骨架行為與空值約定。

## 共用參數

表單輸入元件（`ShuoInputText`、`ShuoInputNumber`、`ShuoSelectMenu`、`ShuoDatepicker`、`ShuoCheckbox`、`ShuoCheckboxGroup`、`ShuoRadioGroup`、`ShuoTextarea`、`ShuoFile`、`ShuoMonths`、`ShuoPhone`）都支援下列參數，各元件頁面不再重複列出：

<field-group>
<field name="size" type="'xs' | 'sm' | 'md' | 'lg' | 'xl'" default="lg">

元件尺寸，同尺寸元件高度一致。未傳入時依序沿用 `UFormField` 的 `size`、全站設定，最後為 `lg`，見[尺寸與 UFormField](https://k90325248.github.io/guides/component-defaults#%E5%B0%BA%E5%AF%B8%E8%88%87-uformfield)。

</field>

<field name="disabled" type="boolean">

停用。未設定時沿用 `UForm` 的停用狀態。

</field>

<field name="loading" type="boolean" default="false">

顯示轉圈圖示並停用操作。

</field>

<field name="skeleton" type="boolean" default="false">

以骨架覆蓋並暫停互動，保留原排版；切回後保留綁定值，不影響表單驗證。

</field>

<field name="id" type="string">

輸入框識別碼，未設定時沿用 `UFormField`。`ShuoMonths` 指向年數框、`ShuoPhone` 指向區碼框；`ShuoFile` 只沿用 `UFormField`。

</field>

<field name="name" type="string">

欄位名稱，未設定時沿用 `UFormField`。

</field>
</field-group>

除 `ShuoDatepicker`（改用 `state`，見[日期選擇器](https://k90325248.github.io/components/datepicker)）與 `ShuoFile` 外，也支援 Nuxt UI 的 `color`（元件顏色）與 `highlight`（強調外框）；`ShuoFile` 的顏色與錯誤外框沿用 `UFormField`。

建議外包 `UFormField`，`name` 對應 schema 欄位，元件會接入 `UFormField` 的 id、尺寸、停用與錯誤狀態，並在 input、blur、change 時觸發驗證：

```vue
<UFormField label="姓名" name="name" required>
  <ShuoInputText v-model="state.name" />
</UFormField>
```

## 沿用 Nuxt UI

包裝 Nuxt UI 元件的 Shuo 元件，props 型別繼承底層元件，未自行宣告的 Nuxt UI props 也有自動補全與型別檢查；slots 轉給底層元件，並對外提供與底層相同的 ref。

<table>
<thead>
  <tr>
    <th>
      元件
    </th>
    
    <th>
      繼承的 props
    </th>
    
    <th>
      可用的 slots
    </th>
    
    <th>
      對外提供的 ref
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/input-text">
        <code>
          ShuoInputText
        </code>
      </a>
    </td>
    
    <td>
      <code>
        UInput
      </code>
    </td>
    
    <td>
      <code>
        leading
      </code>
      
      、<code>
        default
      </code>
      
      、<code>
        trailing
      </code>
    </td>
    
    <td>
      <code>
        inputRef
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/input-number">
        <code>
          ShuoInputNumber
        </code>
      </a>
    </td>
    
    <td>
      <code>
        UInput
      </code>
    </td>
    
    <td>
      <code>
        leading
      </code>
      
      、<code>
        default
      </code>
      
      、<code>
        trailing
      </code>
    </td>
    
    <td>
      <code>
        inputRef
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/textarea">
        <code>
          ShuoTextarea
        </code>
      </a>
    </td>
    
    <td>
      <code>
        UTextarea
      </code>
    </td>
    
    <td>
      <code>
        leading
      </code>
      
      、<code>
        default
      </code>
      
      、<code>
        trailing
      </code>
    </td>
    
    <td>
      <code>
        textareaRef
      </code>
      
      、<code>
        autoResize
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/file">
        <code>
          ShuoFile
        </code>
      </a>
    </td>
    
    <td>
      <code>
        UInput
      </code>
    </td>
    
    <td>
      <code>
        leading
      </code>
      
      、<code>
        default
      </code>
    </td>
    
    <td>
      <code>
        inputRef
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/select-menu">
        <code>
          ShuoSelectMenu
        </code>
      </a>
    </td>
    
    <td>
      <code>
        USelectMenu
      </code>
    </td>
    
    <td>
      全部
    </td>
    
    <td>
      <code>
        triggerRef
      </code>
      
      、<code>
        viewportRef
      </code>
    </td>
  </tr>
</tbody>
</table>

- 繼承的 props 只用於型別推導，執行時經 `$attrs` 傳給底層元件。
- 元件自行處理的 props 不列入繼承（例如 `modelValue`、載入圖示 `loadingIcon`）。這些名稱照樣能寫，Vue 會當成一般 HTML attribute，但不會出現在自動補全。
- `@blur`、`@change` 等事件照常轉給底層元件，事件參數型別尚未補上。

## 骨架

骨架保留原控制項的排版空間，沿用 `size`、寬度、textarea 行數及選項群組排列，不另設固定高度。啟用期間不可點擊或鍵盤操作，Tooltip 與已開啟的選單會關閉。

```vue
<ShuoInputText v-model="state.text" :skeleton="loading" />
<ShuoTextarea v-model="state.description" :rows="5" :skeleton="loading" />
<ShuoFile v-model="file" :skeleton="loading" />
```

## 空值約定

父層綁定 `null`／`undefined` 時，下列元件會回寫約定空值；型別錯誤等非預期值會清空為約定空值，並以 `console.warn`（`[Shuo元件名] … 已清空`）留下紀錄。掛載時與之後由父層回填皆適用。

<table>
<thead>
  <tr>
    <th>
      元件
    </th>
    
    <th>
      空值
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ShuoInputText
      </code>
      
      、<code>
        ShuoTextarea
      </code>
      
      、<code>
        ShuoRadioGroup
      </code>
      
      、<code>
        ShuoPhone
      </code>
    </td>
    
    <td>
      <code>
        ''
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ShuoSelectMenu
      </code>
    </td>
    
    <td>
      <code>
        emptyValue
      </code>
      
      （預設 <code>
        ''
      </code>
      
      ）；多選 <code>
        []
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ShuoInputNumber
      </code>
      
      、<code>
        ShuoMonths
      </code>
    </td>
    
    <td>
      <code>
        null
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ShuoDatepicker
      </code>
    </td>
    
    <td>
      單選 <code>
        ''
      </code>
      
      、範圍 <code>
        []
      </code>
    </td>
  </tr>
</tbody>
</table>

下列元件不回寫父層的值：

- `ShuoCheckboxGroup`：`null` 或非陣列值顯示為全部未勾選，勾選後回寫完整陣列；清空為 `[]`。
- `ShuoCheckbox`：綁定值不等於 `trueValue` 時顯示未勾選。
- `ShuoFile`：清除後為 `null`。


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.

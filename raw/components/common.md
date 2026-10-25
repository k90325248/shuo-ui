---
title: "共用參數"
description: "表單輸入元件共同支援的參數、骨架行為與空值約定。"
canonical_url: "https://k90325248.github.io/components/common"
---
# 共用參數

> 表單輸入元件共同支援的參數、骨架行為與空值約定。

## 互動展示

用上方的下拉切換尺寸與狀態，下面每個元件會一起變化。狀態的停用、載入中、骨架分別對應 `disabled`、`loading`、`skeleton`，為了方便比較，一次只開一個。四個參數以 `v-bind` 一次傳給每個元件，實際使用時照一般 prop 寫即可，例如 `<ShuoInputText v-model="name" size="md" :loading="pending" />`。

<component-example name="common-playground">



</component-example>

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

輸入框識別碼，未設定時沿用 `UFormField`。`ShuoMonths` 指向年數框（窄容器時為總月數框）、`ShuoPhone` 指向區碼框；`ShuoFile` 只沿用 `UFormField`。

</field>

<field name="name" type="string">

欄位名稱，未設定時沿用 `UFormField`。

</field>
</field-group>

除 `ShuoDatepicker`（改用 `state`，見[日期選擇器](https://k90325248.github.io/components/datepicker)）與 `ShuoFile` 外，也支援 Nuxt UI 的 `color`（元件顏色）；除 `ShuoDatepicker`、`ShuoFile` 外的輸入框類元件另支援 `highlight`（強調外框），核取方塊與群組沒有外框，不支援 `highlight`。`ShuoFile` 的顏色與錯誤外框沿用 `UFormField`。

### 搭配 UForm 與 UFormField

建議外包 `UFormField`，`name` 對應 schema 欄位，元件會接入 `UFormField` 的 id、尺寸、停用與錯誤狀態，並在 input、blur、change 時觸發驗證：

```vue
<UFormField label="姓名" name="name" required>
  <ShuoInputText v-model="state.name" />
</UFormField>
```

下面的元件都沒有傳 `size` 與 `disabled`：尺寸來自 `UFormField`，停用來自 `UForm`。先按「送出」，可以看到未填欄位的錯誤外框與訊息；全部填好再送出，會跳出通知顯示送出的資料。

<component-example name="common-form-field">



</component-example>

### 顏色與強調外框

`color` 改變聚焦外框與選取色；`highlight` 讓輸入框的外框持續顯示該顏色，不必聚焦（核取方塊與群組不支援）。`ShuoDatepicker` 沒有 `color`，改以 `state` 表示驗證結果（`false` 錯誤、`true` 成功）。

<component-example name="common-color">



</component-example>

## 沿用 Nuxt UI

包裝 Nuxt UI 元件的 Shuo 元件，props 型別繼承底層元件，未自行宣告的 Nuxt UI props 也有自動補全與型別檢查；事件參數也有型別；slots 轉給底層元件，並對外提供與底層相同的 ref。

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
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/checkbox">
        <code>
          ShuoCheckbox
        </code>
      </a>
    </td>
    
    <td>
      <code>
        UCheckbox
      </code>
    </td>
    
    <td>
      <code>
        append
      </code>
      
      （元件自有）
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/radio-group">
        <code>
          ShuoRadioGroup
        </code>
      </a>
    </td>
    
    <td>
      <code>
        URadioGroup
      </code>
    </td>
    
    <td>
      <code>
        legend
      </code>
      
      、<code>
        item-append
      </code>
      
      （元件自有）
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <a href="https://k90325248.github.io/components/checkbox-group">
        <code>
          ShuoCheckboxGroup
        </code>
      </a>
    </td>
    
    <td>
      <code>
        UCheckboxGroup
      </code>
    </td>
    
    <td>
      <code>
        legend
      </code>
      
      、<code>
        item-append
      </code>
      
      （元件自有）
    </td>
    
    <td>
      —
    </td>
  </tr>
</tbody>
</table>

- 繼承的 props 只用於型別推導，執行時經 `$attrs` 傳給底層元件。
- 元件自行處理的 props 不列入繼承，不會出現在自動補全，例如 `modelValue`。輸入框類元件（`ShuoInputText`、`ShuoInputNumber`、`ShuoTextarea`、`ShuoFile`）自行顯示載入圖示，固定使用 Nuxt UI 的 `appConfig.ui.icons.loading`，因此也排除 `loadingIcon`，寫了不會生效；`ShuoSelectMenu` 由 `USelectMenu` 顯示載入圖示，`loadingIcon` 照常可用。
- 事件照常經 `$attrs` 轉給底層元件，型別取自底層元件的 emits，例如 `@blur` 的參數為 `FocusEvent`。
- 核取方塊與群組不支援說明文字（`description`、`descriptionKey`）：說明會撐高選項，破壞與輸入框對齊的高度。
- 核取方塊與群組也不支援 Nuxt UI 的 `variant`（card、table）、`indicator` 與 `highlight`：card、table 的外框與內距會撐高選項；`indicator` 會移動勾選框，載入中的轉圈圖示固定在左側勾選框的位置；`highlight` 只改 card、table 的外框顏色。傳入時型別會報錯，執行時也不會套用。

### Slots

輸入框類元件可用 `#leading`、`#trailing` 在前後放圖示或按鈕；`ShuoSelectMenu` 可用 `USelectMenu` 的全部 slot。核取方塊與群組則有元件自有的 `#append`、`#item-append`，在選項文字旁放附加內容。

<component-example name="common-slots">



</component-example>

- `ShuoInputNumber` 的 `#trailing` 和單位、載入圖示並排，不會互相取代。
- 各 slot 的參數見元件頁，例如[選項附加內容](https://k90325248.github.io/components/radio-group#%E9%81%B8%E9%A0%85%E9%99%84%E5%8A%A0%E5%85%A7%E5%AE%B9)。

### 對外提供的 ref

以 template ref 取得元件後，可透過表格中的 ref 操作底層的原生元素，例如聚焦、全選或展開選單。

<component-example name="common-expose">



</component-example>

## 骨架

骨架保留原控制項的排版空間，沿用 `size`、寬度、textarea 行數及選項群組排列，不另設固定高度。啟用期間不可點擊或鍵盤操作，Tooltip 與已開啟的選單會關閉。

常見用法是編輯頁向後端取資料時，用同一個載入狀態控制所有欄位的骨架。按「重新載入資料」看看：骨架期間版面不變，資料回來後直接填入。

<component-example name="common-skeleton">



</component-example>

和 `loading` 的差別：`loading` 保留目前的值、在欄位內顯示轉圈圖示，適合欄位自己在處理（例如查詢下拉選項）；`skeleton` 蓋住整個欄位，適合整頁資料還沒回來、目前的值沒有意義的時候。

## 空值約定

父層綁定 `null`／`undefined` 時，下列元件會回寫約定空值；型別錯誤等非預期值也會清空為約定空值。掛載時與之後由父層回填皆適用。清空非預期值時，`ShuoInputText`、`ShuoTextarea`、`ShuoInputNumber`、`ShuoRadioGroup`、`ShuoPhone`、`ShuoDatepicker` 會以 `console.warn`（`[Shuo元件名] … 已清空`）留下紀錄；`ShuoSelectMenu`、`ShuoMonths` 只清空，不警告。

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

按「套用後端回傳的 null」，模擬後端把每個欄位都回傳 `null`，下方的綁定值會改成各元件約定的空值；`ShuoCheckboxGroup` 不回寫，維持 `null`。

<component-example name="common-empty-value">



</component-example>

下列元件不回寫父層的值：

- `ShuoCheckboxGroup`：`null` 或非陣列值顯示為全部未勾選，勾選後回寫完整陣列；清空為 `[]`。
- `ShuoCheckbox`：綁定值不等於 `trueValue` 時顯示未勾選。
- `ShuoFile`：清除後為 `null`。


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.

---
title: "Switch"
description: "開關，切換後可先執行處理函式，成功才更新、失敗自動復原。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/components/choice/switch"
---
# Switch

> 開關，切換後可先執行處理函式，成功才更新、失敗自動復原。

`v-model: boolean | string | number`，預設為布林值。除了 `action` 與文字省略之外，參數、事件與插槽都與 `USwitch` 相同。

## 用法

### 顯示文字與說明

`label` 為開關旁的文字，`description` 為下方的說明。文字單行顯示，超過容器寬度時截斷，滑過或聚焦時以 Tooltip 顯示完整文字，觸控裝置長按顯示（見 [Tooltip](https://k90325248.github.io/shuo-ui/components/helper/tooltip#%E8%A7%B8%E6%8E%A7%E9%95%B7%E6%8C%89)），與[核取方塊](https://k90325248.github.io/shuo-ui/components/choice/checkbox#%E9%A1%AF%E7%A4%BA%E6%96%87%E5%AD%97)相同。說明文字會換行：沒有說明時外框高度對齊輸入框，有說明時往下撐高，第一行文字仍與旁邊的欄位對齊。

<component-example name="switch-basic">



</component-example>

### 處理函式

`action` 是切換後執行的處理函式，參數為切換後的值，可以回傳 Promise。適合切換當下就要呼叫 API 儲存的設定，例如啟用帳號、開啟通知。

<component-example name="switch-action">



</component-example>

<table>
<thead>
  <tr>
    <th>
      階段
    </th>
    
    <th>
      開關畫面
    </th>
    
    <th>
      <code>
        v-model
      </code>
    </th>
    
    <th>
      <code>
        change
      </code>
      
       事件
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      處理中
    </td>
    
    <td>
      顯示切換後的值、載入中並停用
    </td>
    
    <td>
      不變
    </td>
    
    <td>
      不送出
    </td>
  </tr>
  
  <tr>
    <td>
      成功
    </td>
    
    <td>
      維持切換後的值，解除載入與停用
    </td>
    
    <td>
      更新為切換後的值
    </td>
    
    <td>
      送出
    </td>
  </tr>
  
  <tr>
    <td>
      失敗
    </td>
    
    <td>
      回到原本的值，解除載入與停用
    </td>
    
    <td>
      不變
    </td>
    
    <td>
      不送出
    </td>
  </tr>
  
  <tr>
    <td>
      丟出錯誤
    </td>
    
    <td>
      同失敗
    </td>
    
    <td>
      不變
    </td>
    
    <td>
      不送出
    </td>
  </tr>
</tbody>
</table>

- **判斷成功**：回傳 `false`（或 Promise 解析為 `false`）才算失敗，其他回傳值都算成功，包含沒有回傳值的 `async () => { await save(value) }`。
- **錯誤**：處理函式丟出錯誤時開關一樣復原，錯誤會再往外拋，交給全域的錯誤處理或顯示在主控台。要提示使用者時，在處理函式內 `try`／`catch` 後顯示訊息並回傳 `false`，如上方範例。
- **處理中**：開關停用，不會重複呼叫處理函式。處理中如果頁面改變了 `v-model`，以頁面的值為準，處理函式完成後不再覆蓋。
- **沒有傳 action 時**，切換後立即更新 `v-model`，與 `USwitch` 相同。

型別 `SwitchAction`、`SwitchValue` 可由 `#shuo-ui/components/ShuoSwitch.vue` 匯入。

### 開啟與關閉的值

`true-value`、`false-value` 為開啟與關閉時的綁定值，預設為 `true`、`false`。後端使用 `Y`／`N` 時改成對應的值，處理函式收到的也是這些值。

<component-example name="switch-values">



</component-example>

### 尺寸與狀態

`size` 未設定時依 `UFormField` 的尺寸與全站設定決定，內建為 `lg`，與其他輸入元件一致。沒有說明時外框高度對齊同尺寸的輸入框（`xs`～`xl` 為 24～40px），和其他欄位放在同一列時高度一致。`loading` 顯示載入圖示並停用；`disabled` 未設定時沿用表單狀態；`skeleton` 以同尺寸的骨架覆蓋。各狀態的共通行為見[共用參數](https://k90325248.github.io/shuo-ui/components/overview/common)。

<component-example name="switch-states">



</component-example>

`size`、`color`、`loadingIcon` 可在[全站元件預設值](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults)以 `components.switch` 統一設定。

## 範例

### 按鈕的處理中

按鈕不需要另外包裝：`UButton` 的 `loading-auto` 會在 `@click` 回傳的 Promise 完成前顯示載入中並停用。

```vue
<UButton label="儲存" loading-auto @click="save" />
```

## Props

<component-props name="ShuoSwitch">



</component-props>

## Events

<table>
<thead>
  <tr>
    <th>
      Event
    </th>
    
    <th>
      參數
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
        change
      </code>
    </td>
    
    <td>
      <code>
        Event
      </code>
    </td>
    
    <td>
      切換完成後送出；有 <code>
        action
      </code>
      
       時在處理成功後才送出
    </td>
  </tr>
</tbody>
</table>

`update:modelValue` 同樣在處理成功後才送出。

## Slots

<table>
<thead>
  <tr>
    <th>
      Slot
    </th>
    
    <th>
      參數
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
        label
      </code>
    </td>
    
    <td>
      <code>
        label
      </code>
    </td>
    
    <td>
      取代顯示文字，與 USwitch 相同
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        description
      </code>
    </td>
    
    <td>
      <code>
        description
      </code>
    </td>
    
    <td>
      取代說明，與 USwitch 相同
    </td>
  </tr>
</tbody>
</table>

## 樣式

`ui` 可用 Nuxt UI `USwitch` 的所有 slot，合併規則見[單一元件的 `ui` prop](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#%E5%96%AE%E4%B8%80%E5%85%83%E4%BB%B6%E7%9A%84-ui-prop)；`wrapper` 改為元件自有的外層：

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
        inline-flex w-fit max-w-full min-w-0 align-top
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        root
      </code>
    </td>
    
    <td>
      開關外框（Nuxt UI）
    </td>
    
    <td>
      <code>
        w-fit max-w-full min-w-0
      </code>
      
      ，高度對齊同尺寸輸入框、垂直置中
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        label
      </code>
    </td>
    
    <td>
      文字（Nuxt UI）
    </td>
    
    <td>
      <code>
        block truncate
      </code>
    </td>
  </tr>
</tbody>
</table>

高度也可用 `class="[--form-switch-height:1.25rem]"` 調整。`class` 落在開關外框，不影響外層。在 flex 中外層會隨空間收縮並截斷文字，要完整顯示文字時設定 `ui.wrapper` 為 `shrink-0`。

## 更新紀錄

<component-changelog name="ShuoSwitch">



</component-changelog>

---

- [USwitch](https://ui.nuxt.com/docs/components/switch)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.

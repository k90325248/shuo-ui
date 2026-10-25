---
title: "Months"
description: "年月數換算輸入，可同時綁定總月數、年數與月數。"
canonical_url: "https://k90325248.github.io/shuo-ui/zh-tw/components/date/months"
---
# Months

> 年月數換算輸入，可同時綁定總月數、年數與月數。

`v-model: number | null`（總月數），另有 `v-model:year`、`v-model:month`，見下方 [v-model](#v-model)。顯示「年輸入框 年 月輸入框 月」。

## 用法

### 年月換算

`v-model` 是總月數，`v-model:year`、`v-model:month` 是拆分後的年數與月數（0～11），三個綁定互相同步。

<component-example name="months-basic">



</component-example>

- 只接受非負整數；焦點離開年月整組後才進位（在年與月之間移動焦點不提交，可同時清空兩欄）：0 年 13 月變成 1 年 1 月，總月數 13。
- 三個綁定可單獨或同時使用。父層同時回填總月數與年月且內容衝突時，總月數優先；只回填年月時重新合計並進位。
- 單邊空白視為 0，兩邊皆空則三個綁定皆為 `null`。父層回填字串、負數、小數、`NaN` 或超出安全整數的值時視為空值。

### 窄容器

容器寬度不足以顯示年月兩欄時，自動改為單一「總月數」輸入框；寬度足夠時恢復年月兩欄，尚未離開焦點的輸入會保留。

<component-example name="months-compact">



</component-example>

### 外觀

沿用 `UInput` 的 `color` 與 `highlight`，套用到每個輸入框。

<component-example name="months-color">



</component-example>

### 尺寸與狀態

載入中在「月」後方顯示轉圈圖示並停用輸入。「年」「月」單位依語系切換（英文為「yr」「mo」），寬度隨文字延伸，完整年月所需的寬度也跟著調整。各狀態的共通行為見[共用參數](https://k90325248.github.io/shuo-ui/components/overview/common)。

<component-example name="months-states">



</component-example>

## 範例

### 搭配表單驗證

綁定總月數，必填用 `requiredNumber`，上下限另以 `v.minValue`、`v.maxValue` 檢查。

<component-example name="months-validation">



</component-example>

### 只綁定年月

API 的年資分成年、月兩個欄位時，只綁 `v-model:year`、`v-model:month`。

<component-example name="months-year-month">



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
        number | null
      </code>
    </td>
    
    <td>
      總月數
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        v-model:year
      </code>
    </td>
    
    <td>
      <code>
        number | null
      </code>
    </td>
    
    <td>
      年數
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        v-model:month
      </code>
    </td>
    
    <td>
      <code>
        number | null
      </code>
    </td>
    
    <td>
      月數
    </td>
  </tr>
</tbody>
</table>

## Props

<component-props name="ShuoMonths">



</component-props>

`size`、`disabled`、`loading`、`skeleton`、`name` 的行為見[共用參數](https://k90325248.github.io/shuo-ui/components/overview/common#%E5%85%B1%E7%94%A8%E5%8F%83%E6%95%B8)；`id` 指向年數框，窄容器時為總月數框。

## 樣式

`ui` 合併規則見[單一元件的 `ui` prop](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#%E5%96%AE%E4%B8%80%E5%85%83%E4%BB%B6%E7%9A%84-ui-prop)；`year`、`month`、`total` 的值同 Nuxt UI `UInput` 的 `ui`：

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
        inline-flex items-center gap-2
      </code>
      
      ，寬度為完整年月所需寬度，字級依尺寸
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        year
      </code>
      
      、<code>
        month
      </code>
    </td>
    
    <td>
      年數、月數輸入框
    </td>
    
    <td>
      <code>
        root
      </code>
      
       容納兩位數的寬度；<code>
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
        total
      </code>
    </td>
    
    <td>
      窄容器時的總月數輸入框
    </td>
    
    <td>
      <code>
        root
      </code>
      
       容納四位數的寬度；<code>
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
        unit
      </code>
    </td>
    
    <td>
      「年」「月」文字
    </td>
    
    <td>
      <code>
        min-w-[1em] flex-none whitespace-nowrap
      </code>
    </td>
  </tr>
</tbody>
</table>

```vue
<ShuoMonths
  v-model="totalMonths"
  class="w-80"
  :ui="{ unit: 'text-muted', year: { base: 'text-left' } }"
/>
```

外層的 `class` 與 `ui.root` 一起合併，可覆寫寬度；寬度小於完整年月所需時會改為總月數輸入。

## 更新紀錄

<component-changelog name="ShuoMonths">



</component-changelog>

---

- [UInput](https://ui.nuxt.com/docs/components/input)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.

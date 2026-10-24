---
title: "Months"
description: "年月數換算輸入，可同時綁定總月數、年數與月數。"
canonical_url: "https://k90325248.github.io/components/months"
---
# Months

> 年月數換算輸入，可同時綁定總月數、年數與月數。

顯示「年輸入框 年 月輸入框 月」。

## 用法

<component-example name="months-basic">



</component-example>

- 只接受非負整數；焦點離開年月整組後才進位（在年與月之間移動焦點不提交，可同時清空兩欄）：0 年 13 月變成 1 年 1 月，總月數 13。
- 三個綁定可單獨或同時使用。父層同時回填總月數與年月且內容衝突時，總月數優先。
- 單邊空白視為 0，兩邊皆空則三個綁定皆為 `null`。父層回填字串、負數、小數、`NaN` 或超出安全整數的值時視為空值。
- 容器寬度不足以顯示年月兩欄時，自動改為單一「總月數」輸入框。

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

`size`、`disabled`、`loading`、`skeleton`、`name` 的行為見[共用參數](https://k90325248.github.io/components/common#%E5%85%B1%E7%94%A8%E5%8F%83%E6%95%B8)；`id` 指向年數框。

## 樣式

`ui` 合併規則見[單一元件的 `ui` prop](https://k90325248.github.io/guides/theming#%E5%96%AE%E4%B8%80%E5%85%83%E4%BB%B6%E7%9A%84-ui-prop)；`year`、`month`、`total` 的值同 Nuxt UI `UInput` 的 `ui`：

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
        w-[1em] flex-none whitespace-nowrap
      </code>
    </td>
  </tr>
</tbody>
</table>

```vue
<ShuoMonths v-model="totalMonths" class="w-80" :ui="{ unit: 'text-muted', year: { base: 'text-left' } }" />
```

外層的 `class` 與 `ui.root` 一起合併，可覆寫寬度；寬度小於完整年月所需時會改為總月數輸入。


## Sitemap

See the full [sitemap](https://k90325248.github.io/sitemap.md) for all pages.

---
title: "Switch"
description: "A switch that can run an action after toggling, updating only on success and reverting on failure."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/choice/switch"
---
# Switch

> A switch that can run an action after toggling, updating only on success and reverting on failure.

`v-model: boolean | string | number`, boolean by default. Apart from `action` and label truncation, its props, events and slots are the same as `USwitch`.

## Usage

### Label and description

`label` is the text next to the switch and `description` the text below it. It shows on one line and is truncated when wider than its container. A tooltip shows the full text on hover or focus, or on long press on touch devices (see [Tooltip](https://k90325248.github.io/shuo-ui/components/helper/tooltip#touch-long-press)), the same as the [checkbox](https://k90325248.github.io/shuo-ui/components/choice/checkbox#label). The description wraps: without one the height matches an input, and with one the switch grows while its first line still lines up with fields next to it.

<component-example name="switch-basic">



</component-example>

### Action

`action` runs after toggling, receives the new value and may return a Promise. Use it for settings that are saved through an API as soon as they change, such as enabling an account or notifications.

<component-example name="switch-action">



</component-example>

<table>
<thead>
  <tr>
    <th>
      Stage
    </th>
    
    <th>
      Switch
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
      
       event
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Pending
    </td>
    
    <td>
      Shows the new value, loading and disabled
    </td>
    
    <td>
      Unchanged
    </td>
    
    <td>
      Not emitted
    </td>
  </tr>
  
  <tr>
    <td>
      Success
    </td>
    
    <td>
      Keeps the new value, loading and disabled end
    </td>
    
    <td>
      Updated to the new value
    </td>
    
    <td>
      Emitted
    </td>
  </tr>
  
  <tr>
    <td>
      Failure
    </td>
    
    <td>
      Goes back to the old value, loading and disabled end
    </td>
    
    <td>
      Unchanged
    </td>
    
    <td>
      Not emitted
    </td>
  </tr>
  
  <tr>
    <td>
      Error
    </td>
    
    <td>
      Same as failure
    </td>
    
    <td>
      Unchanged
    </td>
    
    <td>
      Not emitted
    </td>
  </tr>
</tbody>
</table>

- **Success**: only returning `false` (or a Promise resolving to `false`) counts as a failure. Any other value is a success, including no return value as in `async () => { await save(value) }`.
- **Errors**: when the action throws, the switch reverts the same way and the error is thrown again, for the global error handler or the console. To notify the user, `try`/`catch` inside the action, show a message and return `false`, as in the example above.
- **Pending**: the switch is disabled, so the action is not called twice. If the page changes `v-model` while pending, the page's value wins and is not overwritten when the action finishes.
- **Without action**, `v-model` updates right after toggling, the same as `USwitch`.

The `SwitchAction` and `SwitchValue` types can be imported from `#shuo-ui/components/ShuoSwitch.vue`.

### On and off values

`true-value` and `false-value` are the bound values when on and off, `true` and `false` by default. Change them when the back end uses `Y`/`N`; the action receives these values too.

<component-example name="switch-values">



</component-example>

### Size and states

When `size` is not set, it follows the `UFormField` size and the site-wide setting, `lg` built in, the same as the other input components. Without a description, the switch height matches an input of the same size (24 to 40px for `xs` to `xl`), so it lines up with other fields in the same row. `loading` shows a loading icon and disables the switch; `disabled` follows the form state when not set; `skeleton` covers it with a skeleton of the same size. See [Common props](https://k90325248.github.io/shuo-ui/components/overview/common) for the shared behavior of the states.

<component-example name="switch-states">



</component-example>

`size`, `color` and `loadingIcon` can be set site-wide with `components.switch` in [Component defaults](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults).

## Examples

### Loading state on buttons

Buttons need no wrapper: with `loading-auto`, `UButton` shows loading and is disabled until the Promise returned by `@click` settles.

```vue
<UButton label="Save" loading-auto @click="save" />
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
      Payload
    </th>
    
    <th>
      Description
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
      Emitted after toggling; with <code>
        action
      </code>
      
      , only after the action succeeds
    </td>
  </tr>
</tbody>
</table>

`update:modelValue` is also emitted only after the action succeeds.

## Slots

<table>
<thead>
  <tr>
    <th>
      Slot
    </th>
    
    <th>
      Props
    </th>
    
    <th>
      Description
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
      Replaces the label, the same as USwitch
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
      Replaces the description, the same as USwitch
    </td>
  </tr>
</tbody>
</table>

## Styling

`ui` accepts every slot of Nuxt UI `USwitch`, merged as described in [Per-component `ui` prop](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#per-component-ui-prop); `wrapper` is the component's own outer wrapper instead:

<table>
<thead>
  <tr>
    <th>
      Slot
    </th>
    
    <th>
      Part
    </th>
    
    <th>
      Built-in style
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
      Outer wrapper that measures truncation and holds the tooltip
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
      Switch box (Nuxt UI)
    </td>
    
    <td>
      <code>
        w-fit max-w-full min-w-0
      </code>
      
      , height matching an input of the same size, centered
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        label
      </code>
    </td>
    
    <td>
      Label (Nuxt UI)
    </td>
    
    <td>
      <code>
        block truncate
      </code>
    </td>
  </tr>
</tbody>
</table>

You can also adjust the height with `class="[--form-switch-height:1.25rem]"`. `class` goes on the switch box, not the outer wrapper. Inside a flex container, the wrapper shrinks with the available space and truncates the label; set `ui.wrapper` to `shrink-0` to show the full label.

## Changelog

<component-changelog name="ShuoSwitch">



</component-changelog>

---

- [USwitch](https://ui.nuxt.com/docs/components/switch)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.

---
title: "Textarea"
description: "Multi-line text input that keeps line breaks and can resize automatically."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/text/textarea"
---
# Textarea

> Multi-line text input that keeps line breaks and can resize automatically.

`v-model: string`, keeping line breaks.

## Usage

### Rows and auto height

`rows` is the base number of rows (Nuxt UI defaults to `3`). When `autoresize` is `true`, the height grows with the content, from at least `rows` rows up to `maxrows` rows, after which a scrollbar appears; `maxrows` of `0` means no limit.

<component-example name="textarea-autoresize">



</component-example>

- Without `autoresize`, the height can be dragged up and down, but not below a single-line input of the same size; with it, dragging is disabled.
- `autoresize`, `rows`, `maxrows` and `fixed` can have site-wide defaults; see [Configurable props](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults#configurable-props).

### Variants

Uses the `variant`, `color` and `highlight` of `UTextarea`.

<component-example name="textarea-variant">



</component-example>

### Icon

Uses the `icon` of `UTextarea`; when `trailing` is `true`, the icon goes on the right.

<component-example name="textarea-icon">



</component-example>

### Size and states

While loading, a spinner shows in the top right corner, in the same place as Nuxt UI's trailing icon, without replacing the left `icon` or shifting where the text starts. The skeleton keeps the height of `rows`. See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common) for the behavior shared by all states.

<component-example name="textarea-states">



</component-example>

## Examples

### With form validation

Use `requiredText` for required fields, which also rejects whitespace only; check a minimum length separately with `v.minLength`.

<component-example name="textarea-validation">



</component-example>

### Character limit and counter

`maxlength` is the native character limit; once reached, nothing more can be typed. Show the current count with the `hint` of `UFormField`.

<component-example name="textarea-maxlength">



</component-example>

### Submitting with a shortcut

Events are forwarded to the native textarea, so keyboard modifiers work directly. In this example, Ctrl+Enter (⌘+Enter on macOS) posts the comment, while Enter alone still adds a line break.

<component-example name="textarea-shortcut">



</component-example>

### Accessing the native textarea

Get the native textarea through `textareaRef` on the template ref; `autoResize()` recalculates the auto height from the content. See [Expose](#expose) below.

<component-example name="textarea-expose">



</component-example>

## Props

<component-props name="ShuoTextarea">



</component-props>

See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common#shared-props) for the behavior of `size`, `disabled`, `loading`, `skeleton`, `id` and `name`.

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
        leading
      </code>
    </td>
    
    <td>
      <code>
        ui
      </code>
    </td>
    
    <td>
      Leading content; when not passed, <code>
        icon
      </code>
      
      , <code>
        leadingIcon
      </code>
      
       and <code>
        avatar
      </code>
      
       are kept
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        default
      </code>
    </td>
    
    <td>
      <code>
        ui
      </code>
    </td>
    
    <td>
      Extra content inside the input
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        trailing
      </code>
    </td>
    
    <td>
      <code>
        ui
      </code>
    </td>
    
    <td>
      Trailing content; hidden while loading, when the loading icon takes its place
    </td>
  </tr>
</tbody>
</table>

The props are the same as Nuxt UI `UTextarea`.

## Expose

<table>
<thead>
  <tr>
    <th>
      Name
    </th>
    
    <th>
      Type
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
        textareaRef
      </code>
    </td>
    
    <td>
      <code>
        HTMLTextAreaElement | null
      </code>
    </td>
    
    <td>
      The native textarea
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        autoResize
      </code>
    </td>
    
    <td>
      <code>
        () => void
      </code>
    </td>
    
    <td>
      Recalculates the auto height from the content
    </td>
  </tr>
</tbody>
</table>

## Styling

`ui` accepts every slot of Nuxt UI `UTextarea`, plus `loading`:

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
      Built-in styles
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
      Outer frame (Nuxt UI)
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
        base
      </code>
    </td>
    
    <td>
      Native textarea (Nuxt UI)
    </td>
    
    <td>
      Minimum height by size; <code>
        resize-y
      </code>
      
       without <code>
        autoresize
      </code>
      
      ; right padding while loading
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        loading
      </code>
    </td>
    
    <td>
      Wrapper of the top-right loading icon
    </td>
    
    <td>
      <code>
        pointer-events-none absolute end-0 flex items-start
      </code>
      
      , positioned by size
    </td>
  </tr>
</tbody>
</table>

## Changelog

<component-changelog name="ShuoTextarea">



</component-changelog>

---

- [UTextarea](https://ui.nuxt.com/docs/components/textarea)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.

---
title: "File"
description: "Single file selection and existing attachment download; selecting a file does not upload it."
canonical_url: "https://k90325248.github.io/shuo-ui/en/components/phone-file/file"
---
# File

> Single file selection and existing attachment download; selecting a file does not upload it.

`v-model: File | null`, required; selecting a file does not upload it.

## Usage

### Selecting a file

Binds the original `File`; `null` after clearing. Click the field, or focus it and press Enter or Space, to open the file dialog. `accept` only filters the file dialog and does not block other types; validate type limits with form rules.

<component-example name="file-basic">



</component-example>

### Existing attachments

Without a local `File`, `file-name` is shown. The download button appears only when a `download` function is passed, and it is called only when the button is pressed, so there is no need to fetch the file up front and put it in `v-model`; the page decides on auth headers, POST and the like. Return a `Blob` to have the component save it under `file-name`, or return nothing if the page handled the download itself (for example by opening a new tab). While downloading, the button shows a spinner and ignores repeated clicks; throwing an error shows the download failed toast (requires `UApp`), and the passed `signal` is aborted on unmount. With a local `File`, the local file is downloaded directly and `download` is not called.

When the file name is truncated, hovering or keyboard focus shows the full name, or a long press on touch devices (see [Tooltip](https://k90325248.github.io/shuo-ui/components/helper/tooltip#touch-long-press)); a long press does not open the file dialog.

<component-example name="file-existing">



</component-example>

### Clearing

`clear` is on by default and shows a trailing clear button when there is a local `File` or an existing attachment; it is hidden while disabled or loading. Clearing sets `v-model` to `null` and `file-name` to `''`, leaving the field completely empty so a new file can be selected. Bind the attachment name with `v-model:file-name` so the page can tell from `''` that the user removed the existing attachment; when it is passed one-way, clearing still empties the field.

Pass `:clear="false"` to disallow removal; it is off by default inside a `required` `UFormField`, following the same rules as the [SelectMenu clear button](https://k90325248.github.io/shuo-ui/components/choice/select-menu#clear-button). To turn it off across the project, use the [global defaults](https://k90325248.github.io/shuo-ui/getting-started/theme/component-defaults#configurable-props).

<component-example name="file-clear">



</component-example>

### Button icons

`select-icon` is the select button shown when there is nothing to download, `clear-icon` is the clear button, and `download-icon` is the download button shown when the file can be downloaded.

<component-example name="file-icons">



</component-example>

### Variants

Uses the `variant` and `icon` of `UInput`. `ShuoFile` has no `color` or `highlight`; the color and error border follow `UFormField`.

<component-example name="file-variant">



</component-example>

### Size and states

When disabled, the clear button is hidden but an existing attachment can still be downloaded; while loading, a spinner replaces the trailing buttons and nothing can be used. See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common) for the behavior shared by all states.

<component-example name="file-states">



</component-example>

## Examples

### With form validation

Check required, type and size with Valibot's `v.file`, `v.mimeType` and `v.maxSize`; `accept` only affects the file dialog, and the schema is the real limit.

<component-example name="file-validation">



</component-example>

### Uploading after selection

Selecting a file does not upload it; the page decides when to send the `File` in `v-model`. In the example, pressing "Upload" disables the field with `loading`, then clears `v-model` when done and shows the file as an existing attachment with `file-name` and `download`.

<component-example name="file-upload">



</component-example>

### Accessing the native input

Get the native input that shows the file name through `inputRef` on the template ref.

<component-example name="file-expose">



</component-example>

## Props

<component-props name="ShuoFile">



</component-props>

See [Shared props](https://k90325248.github.io/shuo-ui/components/overview/common#shared-props) for the behavior of `size`, `disabled`, `loading` and `skeleton`. The trailing area is always the clear and download buttons, so `trailing` and `trailingIcon` are not available; the id and error appearance come from `UFormField`.

## Slots

<table>
<thead>
  <tr>
    <th>
      Slot
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
      Extra content inside the input
    </td>
  </tr>
</tbody>
</table>

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
        inputRef
      </code>
    </td>
    
    <td>
      <code>
        HTMLInputElement | null
      </code>
    </td>
    
    <td>
      The native input that shows the file name
    </td>
  </tr>
</tbody>
</table>

## Styling

`ui` accepts every slot of Nuxt UI `UInput`, plus `wrapper`; see [Per-component `ui` prop](https://k90325248.github.io/shuo-ui/getting-started/theme/theming#per-component-ui-prop) for how it is merged:

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
        wrapper
      </code>
    </td>
    
    <td>
      Outer wrapper that measures truncation and holds the tooltip
    </td>
    
    <td>
      <code>
        flex w-full min-w-0 cursor-default
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
      Input frame (Nuxt UI)
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
      File name field (Nuxt UI)
    </td>
    
    <td>
      <code>
        truncate
      </code>
      
      , cursor and hover background; right padding <code>
        pe-9
      </code>
      
       or <code>
        pe-16
      </code>
      
       by the number of trailing buttons
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        trailing
      </code>
    </td>
    
    <td>
      Wrapper of the clear and download buttons (Nuxt UI)
    </td>
    
    <td>
      <code>
        pointer-events-auto cursor-default gap-1 pe-2
      </code>
    </td>
  </tr>
</tbody>
</table>

To make it narrower, set `ui.wrapper` (for example `w-60`); `class` goes on the input frame.

## Changelog

<component-changelog name="ShuoFile">



</component-changelog>

---

- [UInput](https://ui.nuxt.com/docs/components/input)


## Sitemap

See the full [sitemap](https://k90325248.github.io/shuo-ui/sitemap.md) for all pages.

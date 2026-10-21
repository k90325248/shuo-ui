const formControlTheme = {
  slots: {
    base: "[--ui-border-accented:var(--ui-form-border)] disabled:opacity-100 disabled:ring-(--ui-form-disabled-border) disabled:bg-(--ui-form-disabled-bg) disabled:text-(--ui-form-disabled-text) disabled:[--ui-bg:var(--ui-form-disabled-bg)] disabled:[--ui-text-dimmed:var(--ui-form-disabled-text)]"
  }
};
export const defaultTheme = {
  input: formControlTheme,
  textarea: formControlTheme,
  select: formControlTheme,
  selectMenu: formControlTheme,
  checkbox: {
    slots: {
      root: "min-w-0 [--ui-border-accented:var(--ui-form-border)]",
      container: "shrink-0",
      wrapper: "min-w-0",
      label: "break-words"
    },
    variants: {
      disabled: {
        true: {
          // 複選群組內的核取方塊沿用表單停用色，保留勾選狀態。
          root: "opacity-100",
          base: "bg-(--ui-form-disabled-bg) ring-(--ui-form-disabled-border)",
          indicator: "bg-(--ui-form-disabled-border)! text-(--ui-form-disabled-bg)",
          label: "text-(--ui-form-disabled-text)"
        }
      }
    }
  },
  radioGroup: {
    slots: {
      root: "[--ui-border-accented:var(--ui-form-border)]",
      // 窄容器允許選項文字換行，保留圓鈕尺寸。
      item: "min-w-0",
      container: "shrink-0",
      wrapper: "min-w-0",
      label: "break-words"
    },
    variants: {
      disabled: {
        true: {
          // 停用顏色沿用表單主題，不用透明度淡化整個選項。
          item: "opacity-100",
          base: "bg-(--ui-form-disabled-bg) ring-(--ui-form-disabled-border)",
          indicator: "bg-(--ui-form-disabled-border)! after:bg-(--ui-form-disabled-bg)",
          label: "text-(--ui-form-disabled-text)"
        }
      }
    }
  },
  formField: {
    defaultVariants: { size: "lg" },
    slots: {
      // 欄位標題使用比主題色深一階的 700，維持單行並在空間不足時省略。
      label: "block font-medium text-(--ui-color-primary-700) truncate",
      // 錯誤訊息嵌在下邊線，底色遮住後方線條，邊框沿用輸入框的錯誤色。
      error: "pointer-events-none absolute inset-e-2 top-full z-10 mt-1 max-w-[calc(100%-1rem)] -translate-y-1/2 rounded-sm bg-default px-1 py-0 text-[11px] leading-4 text-error shadow-none ring ring-error"
    }
  }
};

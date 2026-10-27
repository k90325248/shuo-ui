import type { CheckboxGroupItem, RadioGroupItem, SlotClassReplacer } from '@nuxt/ui';
/** 底層單選群組的物件選項 */
type NuxtRadioGroupOption = Extract<RadioGroupItem, {
    label?: string;
}>;
/** 底層複選群組的物件選項 */
type NuxtCheckboxGroupOption = Extract<CheckboxGroupItem, {
    label?: string;
}>;
/**
 * 選項樣式覆寫：沿用 Nuxt UI 選項 `ui` 的部位，值限定為 class 字串或取代預設值的函式。
 * Nuxt UI 的 class 型別含遞迴陣列，選項陣列放進 `reactive`／`ref` 時解包過深會觸發 TS2589，故不接受陣列與物件寫法。
 */
type ChoiceOptionUi<O extends {
    ui?: object;
}> = {
    [K in keyof NonNullable<O['ui']>]?: string | SlotClassReplacer;
};
/** 單選群組內建欄位的選項；也可傳任意物件，以 labelKey、valueKey 指定欄位，其他欄位於 slot 的 item 取得。 */
export interface RadioGroupOption {
    /** 顯示名稱 */
    label: string;
    /** 綁定值 */
    value: string;
    /** 選項說明，顯示在選項文字下方並換行；有說明的選項會撐高，沒有說明的選項高度對齊輸入框。欄位名稱可由 descriptionKey 指定 */
    description?: string;
    /** 是否停用此選項 */
    disabled?: boolean;
    /** 此選項的 class */
    class?: NuxtRadioGroupOption['class'];
    /** 此選項的樣式覆寫 */
    ui?: ChoiceOptionUi<NuxtRadioGroupOption>;
}
/** 複選群組內建欄位的選項；也可傳任意物件，以 labelKey、valueKey 指定欄位，其他欄位於 slot 的 item 取得。 */
export interface CheckboxGroupOption {
    /** 顯示名稱 */
    label: string;
    /** 綁定值 */
    value: string;
    /** 選項說明，顯示在選項文字下方並換行；有說明的選項會撐高，沒有說明的選項高度對齊輸入框。欄位名稱可由 descriptionKey 指定 */
    description?: string;
    /** 是否停用此選項 */
    disabled?: boolean;
    /** 勾選時顯示的圖示 */
    icon?: NuxtCheckboxGroupOption['icon'];
    /** 此選項的 class */
    class?: NuxtCheckboxGroupOption['class'];
    /** 此選項的樣式覆寫 */
    ui?: ChoiceOptionUi<NuxtCheckboxGroupOption>;
}
/**
 * 轉換後的單選群組選項：保留原始欄位，`label`、`value` 改為依 `labelKey`、`valueKey` 解析的值，`description` 原樣保留。
 * 原始資料本身的 `label`、`value` 欄位會被取代。
 */
export type ResolvedRadioGroupOption<T extends object = RadioGroupOption> = Omit<T, 'label' | 'value' | 'description'> & RadioGroupOption;
/**
 * 轉換後的複選群組選項：保留原始欄位，`label`、`value` 改為依 `labelKey`、`valueKey` 解析的值，`description` 原樣保留。
 * 原始資料本身的 `label`、`value` 欄位會被取代。
 */
export type ResolvedCheckboxGroupOption<T extends object = CheckboxGroupOption> = Omit<T, 'label' | 'value' | 'description'> & CheckboxGroupOption;
export {};

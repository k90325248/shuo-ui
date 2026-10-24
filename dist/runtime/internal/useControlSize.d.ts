import type { ComputedRef } from 'vue';
import type { InputProps } from '@nuxt/ui';
import type { ShuoComponentName } from '../types/component-defaults.js';
/** 元件尺寸 */
export type ControlSize = NonNullable<InputProps['size']>;
/**
 * 決定元件尺寸：明確傳入的 size > UFormField 明確寫的 size > 全站預設 > UFormField 的主題預設 > 內建預設（'lg'）。
 * - `props` 必須是原始 props（不經 useShuoComponentProps），`size` 也不能在 withDefaults 設預設值，否則全站預設會被當成明確傳入。
 * - Nuxt UI 的 UFormField 提供的 size 已含主題 `formField.defaultVariants.size`，因此另外檢查 UFormField 的 vnode，
 *   只有明確寫在 UFormField 上的 size 優先於全站預設；主題預設排在全站預設之後，未設定全站預設時行為與過去相同。
 * - 只 inject 欄位設定讀取 size，不呼叫 `useFormField`：它會 provide undefined，讓內層的 Nuxt UI 元件失去欄位 id、錯誤與驗證事件。
 *   已呼叫 `useFormField` 的元件也用同一個工具，inject 讀的是父層的設定，不受自己 provide 的影響。
 */
export declare const useControlSize: (name: ShuoComponentName, props: {
    size?: InputProps["size"];
}) => ComputedRef<ControlSize>;

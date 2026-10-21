import * as _nuxt_schema from '@nuxt/schema';
import { ShuoMessagesOverride } from '../dist/runtime/utils/messages.js';

/** 模組設定 */
interface ModuleOptions {
    /** 元件名稱前綴，預設 `Shuo`（例如 `<ShuoInputText>`）。 */
    prefix: string;
    /** 是否套用內建的 Nuxt UI 主題（輸入框、核取方塊、欄位錯誤樣式等），設為 false 則完全交由專案決定。 */
    theme: boolean;
    /** 是否載入預設的 CSS 變數（`--ui-form-*`），設為 false 則由專案自行定義。 */
    css: boolean;
    /** 內建文案覆寫（驗證訊息、aria-label、提示文字等），只需提供想修改的項目。 */
    messages: ShuoMessagesOverride;
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions, ModuleOptions, false>;

export { _default as default };
export type { ModuleOptions };

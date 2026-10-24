import type { ShuoComponentDefaults } from '../types/component-defaults.js';
/** 全站預設值中的圖示名稱（白名單內以 icon 結尾的 prop），供模組加入 client bundle；ui 內的 class 與空字串不列入。 */
export declare const collectConfiguredIcons: (components: ShuoComponentDefaults) => string[];
/**
 * 將 `i-lucide-x` 形式的圖示名稱轉為 client bundle 使用的 `lucide:x`。
 * 集合名稱可能含連字號（如 `simple-icons`），依已安裝的集合由長到短比對；都找不到時以第一個連字號切開。
 */
export declare const toBundleIconName: (name: string, hasCollection: (prefix: string) => boolean) => string;

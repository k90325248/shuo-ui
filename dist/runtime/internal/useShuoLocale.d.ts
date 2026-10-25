import type { Ref } from 'vue';
import { type ShuoLocale, type ShuoMessages } from '../utils/messages.js';
/**
 * 目前元件使用的語系：跟隨 Nuxt UI 的語系（`<UApp :locale>`），沒有設定時為模組的預設語系。
 * 瀏覽器端同時記錄目前語系，讓驗證規則在驗證當下取得同一個語系的文案。
 */
export declare const useShuoLocale: () => Readonly<Ref<ShuoLocale>>;
/** 目前語系的文案，切換語系時跟著更新。 */
export declare const useShuoMessages: () => Readonly<Ref<ShuoMessages>>;
/**
 * 文案類 prop 的實際值：明確傳入時使用傳入值，否則為目前語系的內建文案。
 * 文件網站依 `useMessageDefault(() => props.名稱, (m) => m.分組.項目)` 的寫法產生 props 表的預設值。
 */
export declare const useMessageDefault: <T>(value: () => T | undefined, fallback: (messages: ShuoMessages) => T, messages?: Readonly<Ref<ShuoMessages>>) => any;

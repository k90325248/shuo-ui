import type { ShuoComponentName } from '../types/component-defaults.js';
import type { PropSource } from './option-keys.js';
/**
 * 依「明確 prop > 全站預設 > 內建預設」解析元件 props。
 * 白名單內的 prop 在 template、computed、watch 中一律經回傳值讀取；其他 prop 仍可直接讀原始 props。
 */
export declare const useShuoComponentProps: <T extends object>(name: ShuoComponentName, props: T) => T;
/** 回傳 prop 值的來源：明確傳入、全站設定或元件內建預設；供開發期警告註明設定位置。 */
export declare const useShuoPropSource: (name: ShuoComponentName) => (key: string) => PropSource;

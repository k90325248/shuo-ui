/**
 * 判斷父層是否明確傳入某個 prop：看元件 vnode 的 props 有沒有這個鍵（camelCase 或 kebab-case），且值不是 `undefined`。
 * 不看 prop 的值，才能分辨「沒傳」與「傳 false」；作法同 Nuxt UI `useComponentProps` 的 `propIsDefined`。
 */
export declare const isPropDefined: (vnodeProps: Record<string, unknown> | null | undefined, key: string) => boolean;

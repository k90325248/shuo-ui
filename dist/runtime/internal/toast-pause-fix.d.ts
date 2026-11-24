/**
 * Nuxt UI `Toaster` 的 viewport：reka-ui `ToastViewport` 的清單元素帶 `data-slot="viewport"`（來自 Nuxt UI），
 * 外層是 reka-ui `DismissableLayerBranch` 的 `role="region"` 容器。限定外層，避免誤選其他元件同名 slot（例如 NavigationMenu）。
 */
export declare const TOAST_VIEWPORT_SELECTOR = "[role=\"region\"] > [data-slot=\"viewport\"]";
/** 解除暫停所需的 DOM 能力，抽成介面方便單元測試 */
export interface ToastViewportDocument {
    hasFocus(): boolean;
    readonly activeElement: unknown;
    querySelectorAll(selector: string): Iterable<ToastViewportElement>;
}
export interface ToastViewportElement {
    matches(selector: string): boolean;
    contains(node: never): boolean;
    dispatchEvent(event: Event): boolean;
}
/**
 * 對不該暫停的 toast viewport 派發 pointerleave，讓 reka-ui 把卡住的暫停旗標設回 false 並重新計時。
 * 視窗失焦、滑鼠停在 viewport 上或焦點在 viewport 內時維持暫停（正常行為）。
 * @returns 派發事件的 viewport 數量
 */
export declare function resumeStuckToastViewports(doc: ToastViewportDocument, createEvent?: () => Event): number;

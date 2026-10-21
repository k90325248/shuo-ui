/** 元件庫預設主題；模組設定 `theme: false` 可停用，專案 app.config.ts 的 ui 設定優先。 */
export declare const defaultTheme: {
    input: {
        slots: {
            base: string;
        };
    };
    textarea: {
        slots: {
            base: string;
        };
    };
    select: {
        slots: {
            base: string;
        };
    };
    selectMenu: {
        slots: {
            base: string;
        };
    };
    checkbox: {
        slots: {
            root: string;
            container: string;
            wrapper: string;
            label: string;
        };
        variants: {
            disabled: {
                true: {
                    root: string;
                    base: string;
                    indicator: string;
                    label: string;
                };
            };
        };
    };
    radioGroup: {
        slots: {
            root: string;
            item: string;
            container: string;
            wrapper: string;
            label: string;
        };
        variants: {
            disabled: {
                true: {
                    item: string;
                    base: string;
                    indicator: string;
                    label: string;
                };
            };
        };
    };
    formField: {
        defaultVariants: {
            size: string;
        };
        slots: {
            label: string;
            error: string;
        };
    };
};

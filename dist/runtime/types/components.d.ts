import type { CardProps, CheckboxEmits as NuxtCheckboxEmits, CheckboxGroupEmits as NuxtCheckboxGroupEmits, CheckboxGroupProps as NuxtCheckboxGroupProps, CheckboxProps as NuxtCheckboxProps, EmitsToProps, FormProps, FormSchema, GetItemKeys, InputEmits, InputProps, RadioGroupEmits as NuxtRadioGroupEmits, RadioGroupProps as NuxtRadioGroupProps, SelectMenuEmits as USelectMenuEmits, SelectMenuItem, SelectMenuProps as USelectMenuProps, SlotClass, TableColumn, TableData, TableProps, TextareaEmits as NuxtTextareaEmits, TextareaProps as NuxtTextareaProps, TooltipProps } from '@nuxt/ui';
import type { DateValue } from '@vuepic/vue-datepicker';
import type { ChoiceGroupBreakpoint, ChoiceGroupOrientation } from '../composables/useChoiceGroup.js';
import type { DatepickerMode, DatepickerValue } from '../utils/datepicker.js';
import type { DecimalOption } from '../utils/number.js';
import type { TextMask } from '../utils/text-mask.js';
import type { CheckboxGroupOption, RadioGroupOption } from './choice.js';
/**
 * 底層元件的事件轉成 `onBlur`、`onChange` 等 prop，僅供型別推導；事件仍經 `$attrs` 轉給底層元件。
 * v-model 由元件自行處理，不列入。
 */
type ForwardedEvents<E> = Partial<EmitsToProps<Omit<E, 'update:modelValue'>>>;
/**
 * 沿用 Nuxt UI 輸入框的參數，僅供型別推導；值經 `$attrs` 轉給 UInput。
 * 排除元件自行宣告或改寫語意的項目：綁定值固定為字串、`type` 由遮蔽決定、載入圖示由元件繪製。
 */
type InheritedInputProps = Omit<InputProps<string>, keyof InputTextOwnProps | 'modelValue' | 'defaultValue' | 'modelModifiers' | 'type' | 'loadingIcon'> & ForwardedEvents<InputEmits>;
/** 文字輸入元件參數；未列出的 Nuxt UI 輸入框參數（variant、icon、trailingIcon、autofocus 等）皆可直接使用 */
export interface InputTextProps extends /* @vue-ignore */ InheritedInputProps, InputTextOwnProps {
}
/** 文字輸入元件自行宣告的參數 */
interface InputTextOwnProps {
    /** 輸入框識別碼 */
    id?: string;
    /** 欄位名稱 */
    name?: string;
    /** 元件尺寸，預設 lg */
    size?: InputProps['size'];
    /** 是否停用，未設定時沿用表單狀態 */
    disabled?: boolean;
    /** 元件顏色 */
    color?: InputProps['color'];
    /** 是否強調外框 */
    highlight?: boolean;
    /** 提示文字 */
    placeholder?: string;
    /** 是否顯示與原控制項同尺寸的骨架 */
    skeleton?: boolean;
    /** 是否顯示載入中，於尾端顯示轉圈圖示並停用輸入 */
    loading?: boolean;
    /** true 遮蔽全部，正整數遮蔽最後指定碼數，預設不遮蔽。 */
    mask?: TextMask;
    /** 是否隱藏遮罩顯示按鈕，預設 false。 */
    hideMaskToggle?: boolean;
    /** 遮罩顯示按鈕在遮蔽中的圖示，預設 `i-lucide-eye`。 */
    revealIcon?: string;
    /** 遮罩顯示按鈕在顯示明碼時的圖示，預設 `i-lucide-eye-off`。 */
    concealIcon?: string;
    /** 樣式覆寫，同 Nuxt UI 輸入框的 ui，與內建樣式合併，同一 slot 衝突時以傳入值優先 */
    ui?: InputProps['ui'];
}
/** 數字輸入框樣式覆寫 */
export type InputNumberUi = NonNullable<InputProps['ui']> & {
    /** 尾端外層，包住單位與載入圖示 */
    suffix?: SlotClass;
    /** 單位文字 */
    unit?: SlotClass;
};
/**
 * 沿用 Nuxt UI 輸入框的參數，僅供型別推導；值經 `$attrs` 轉給 UInput。
 * 排除元件自行宣告或改寫語意的項目：綁定值為數字、輸入模式依小數設定決定、載入圖示由元件繪製；
 * 原生 min、max、step 對文字輸入框無效，一併排除，避免誤以為有數值限制。
 */
type InheritedInputNumberProps = Omit<InputProps<string>, keyof InputNumberOwnProps | 'modelValue' | 'defaultValue' | 'modelModifiers' | 'type' | 'min' | 'max' | 'step' | 'loadingIcon'> & ForwardedEvents<InputEmits>;
/** 數字輸入框參數；未列出的 Nuxt UI 輸入框參數（variant、icon、autofocus 等）皆可直接使用 */
export interface InputNumberProps extends /* @vue-ignore */ InheritedInputNumberProps, InputNumberOwnProps {
}
/** 數字輸入框自行宣告的參數 */
interface InputNumberOwnProps {
    /** 輸入框識別碼 */
    id?: string;
    /** 欄位名稱 */
    name?: string;
    /** 元件尺寸，預設 lg */
    size?: InputProps['size'];
    /** 是否停用，未設定時沿用表單狀態 */
    disabled?: boolean;
    /** 元件顏色 */
    color?: InputProps['color'];
    /** 是否強調外框 */
    highlight?: boolean;
    /** 提示文字 */
    placeholder?: string;
    /** 是否顯示與原控制項同尺寸的骨架 */
    skeleton?: boolean;
    /** 是否顯示載入中，於最右側顯示轉圈圖示並停用輸入；數字與單位往左讓出圖示空間 */
    loading?: boolean;
    /** 單位，true 顯示「元」，字串顯示傳入文字，預設不顯示 */
    unit?: boolean | string;
    /** 是否在離開輸入框後顯示千分位，預設開啟。 */
    thousandSeparator?: boolean;
    /** 是否允許小數或指定小數位數，預設 false；固定精度最多 100 位。 */
    decimal?: DecimalOption;
    /** 樣式覆寫，與內建樣式合併，同一 slot 衝突時以傳入值優先；可用函式取得預設值後自行取代 */
    ui?: InputNumberUi;
}
/** 多行文字輸入樣式覆寫 */
export type TextareaUi = NonNullable<NuxtTextareaProps['ui']> & {
    /** 載入圖示外層，定位於右上角 */
    loading?: SlotClass;
};
/**
 * 沿用 Nuxt UI 多行輸入的參數，僅供型別推導；值經 `$attrs` 轉給 UTextarea。
 * 排除元件自行宣告或改寫語意的項目：綁定值固定為字串、載入圖示由元件繪製。
 */
type InheritedTextareaProps = Omit<NuxtTextareaProps<string>, keyof TextareaOwnProps | 'modelValue' | 'defaultValue' | 'modelModifiers' | 'loadingIcon'> & ForwardedEvents<NuxtTextareaEmits>;
/** 多行文字輸入參數；未列出的 Nuxt UI 多行輸入參數（autofocus、leadingIcon、trailingIcon 等）皆可直接使用 */
export interface TextareaProps extends /* @vue-ignore */ InheritedTextareaProps, TextareaOwnProps {
}
/** 多行文字輸入自行宣告的參數 */
interface TextareaOwnProps {
    /** 是否顯示與原控制項同尺寸的骨架 */
    skeleton?: boolean;
    /** 是否停用 */
    disabled?: boolean;
    /** 是否顯示載入中，在右上角顯示轉圈圖示並停用輸入 */
    loading?: boolean;
    /** 是否自動調整高度 */
    autoresize?: boolean;
    /** 是否為原生必填欄位 */
    required?: boolean;
    /** 是否強調外框 */
    highlight?: boolean;
    /** 是否固定文字尺寸 */
    fixed?: boolean;
    /** 元件尺寸，預設 lg */
    size?: NuxtTextareaProps['size'];
    /** 元件顏色 */
    color?: NuxtTextareaProps['color'];
    /** 元件外觀 */
    variant?: NuxtTextareaProps['variant'];
    /** 基本行數 */
    rows?: number;
    /** 自動高度上限行數 */
    maxrows?: number;
    /** 原生字數上限 */
    maxlength?: number;
    /** 提示文字 */
    placeholder?: string;
    /** 欄位名稱 */
    name?: string;
    /** 圖示名稱 */
    icon?: string;
    /** 樣式覆寫，與內建樣式合併，同一 slot 衝突時以傳入值優先；可用函式取得預設值後自行取代 */
    ui?: TextareaUi;
}
/** 單檔選擇與下載樣式覆寫 */
export type FileUi = NonNullable<InputProps['ui']> & {
    /** 外層，量測省略檔名並掛 Tooltip */
    wrapper?: SlotClass;
};
/**
 * 沿用 Nuxt UI 輸入框的參數，僅供型別推導；值經 `$attrs` 轉給顯示檔名的 UInput。
 * 排除元件自行宣告或改寫語意的項目：檔名欄位唯讀、尾端固定為清除與下載按鈕、識別碼與錯誤外觀取自表單欄位。
 */
type InheritedFileProps = Omit<InputProps<string>, keyof FileOwnProps | 'modelValue' | 'defaultValue' | 'modelModifiers' | 'type' | 'id' | 'color' | 'highlight' | 'readonly' | 'trailing' | 'trailingIcon' | 'loadingIcon'> & ForwardedEvents<InputEmits>;
/** 單檔選擇與下載元件參數；未列出的 Nuxt UI 輸入框參數（variant、icon、autofocus 等）皆可直接使用 */
export interface FileProps extends /* @vue-ignore */ InheritedFileProps, FileOwnProps {
}
/** 單檔選擇與下載元件自行宣告的參數 */
interface FileOwnProps {
    /** 是否顯示與原控制項同尺寸的骨架 */
    skeleton?: boolean;
    /** 允許選取的檔案類型，沿用原生 accept 格式；只篩選選檔對話框，不阻擋其他類型，類型限制須由表單規則驗證。 */
    accept?: string;
    /** 未選檔時的提示文字 */
    placeholder?: string;
    /** 既有附件名稱，沒有本機 File 時顯示此名稱。 */
    fileName?: string;
    /** 既有附件下載 API 網址，以 Blob 取得內容；跨來源網址須允許 CORS。 */
    fileUrl?: string;
    /** 輸入框尺寸 */
    size?: InputProps['size'];
    /** 是否停用選檔並隱藏清除按鈕；已有附件仍可下載 */
    disabled?: boolean;
    /** 是否顯示載入中，以轉圈圖示取代尾端按鈕，並停用選檔、清除與下載 */
    loading?: boolean;
    /** 清除按鈕圖示，預設 `i-lucide-x`。 */
    clearIcon?: string;
    /** 下載按鈕圖示，預設 `i-lucide-download`。 */
    downloadIcon?: string;
    /** 選擇檔案按鈕圖示，預設 `i-lucide-paperclip`。 */
    selectIcon?: string;
    /** 樣式覆寫，與內建樣式合併，同一 slot 衝突時以傳入值優先；可用函式取得預設值後自行取代 */
    ui?: FileUi;
}
/** 年月合併輸入樣式覆寫 */
export interface MonthsUi {
    /** 外層，排列輸入框與單位 */
    root?: SlotClass;
    /** 年數輸入框，同 Nuxt UI 輸入框的 ui */
    year?: InputProps['ui'];
    /** 月數輸入框，同 Nuxt UI 輸入框的 ui */
    month?: InputProps['ui'];
    /** 窄容器時的總月數輸入框，同 Nuxt UI 輸入框的 ui */
    total?: InputProps['ui'];
    /** 「年」「月」單位文字 */
    unit?: SlotClass;
}
/** 年月合併輸入元件參數 */
export interface MonthsProps {
    /** 年數輸入框識別碼，供外部 label 關聯。 */
    id?: string;
    /** 表單欄位名稱 */
    name?: string;
    /** 輸入框尺寸 */
    size?: InputProps['size'];
    /** 主題色 */
    color?: InputProps['color'];
    /** 是否強調欄位狀態 */
    highlight?: boolean;
    /** 是否停用 */
    disabled?: boolean;
    /** 是否顯示與原控制項同尺寸的骨架 */
    skeleton?: boolean;
    /** 是否顯示載入中，在「月」後方顯示轉圈圖示並停用輸入 */
    loading?: boolean;
    /** 樣式覆寫，與內建樣式合併，同一 slot 衝突時以傳入值優先；可用函式取得預設值後自行取代 */
    ui?: MonthsUi;
}
/** 市話號碼樣式覆寫 */
export interface PhoneUi {
    /** 外層，排列區碼與號碼 */
    root?: SlotClass;
    /** 區碼輸入框，同 Nuxt UI 輸入框的 ui */
    areaCode?: InputProps['ui'];
    /** 電話號碼輸入框，同 Nuxt UI 輸入框的 ui */
    number?: InputProps['ui'];
}
/** 市話號碼元件參數 */
export interface PhoneProps {
    /** 區碼輸入框識別碼 */
    id?: string;
    /** 表單欄位名稱 */
    name?: string;
    /** 輸入框尺寸 */
    size?: InputProps['size'];
    /** 主題色 */
    color?: InputProps['color'];
    /** 是否強調欄位狀態 */
    highlight?: boolean;
    /** 是否停用 */
    disabled?: boolean;
    /** 是否顯示與原控制項同尺寸的骨架 */
    skeleton?: boolean;
    /** 是否顯示載入中，在電話號碼欄最右側顯示轉圈圖示並停用輸入 */
    loading?: boolean;
    /** 樣式覆寫，與內建樣式合併，同一 slot 衝突時以傳入值優先；可用函式取得預設值後自行取代 */
    ui?: PhoneUi;
}
/** 單個核取方塊綁定值 */
export type CheckboxValue = string | number | boolean;
/** 單個核取方塊樣式覆寫 */
export type CheckboxUi = NonNullable<NuxtCheckboxProps['ui']> & {
    /** 外層，負責量測省略文字、Tooltip 與載入圖示定位 */
    wrapper?: SlotClass;
};
/**
 * 核取方塊與選項群組不支援的 Nuxt UI 外觀參數，宣告為 never 讓傳入時型別報錯；執行時也不會轉給 Nuxt UI。
 * variant（card、table）的外框與內距會撐高選項，破壞與輸入框對齊的固定高度；
 * indicator 會移動勾選框，載入圖示固定蓋在左側勾選框上；highlight 只改 card、table 的外框顏色。
 */
interface UnsupportedChoiceProps {
    /** 不支援：card、table 會撐高選項，破壞與輸入框對齊的高度。 */
    variant?: never;
    /** 不支援：載入圖示固定在左側勾選框的位置。 */
    indicator?: never;
    /** 不支援：只在 card、table 有外框時才有作用。 */
    highlight?: never;
}
/** 單個核取方塊參數 */
/**
 * 沿用 Nuxt UI 核取方塊的參數與事件，僅供型別推導；值經 `$attrs` 轉給 UCheckbox。
 * 排除元件自行宣告或改寫語意的項目：勾選值由 trueValue／falseValue 決定；
 * 不支援 description、variant、indicator、highlight：說明與 card 外框會撐高選項、破壞與輸入框對齊的高度，
 * 移動勾選框會讓載入圖示對不上，highlight 只在 card 有作用。
 */
type InheritedCheckboxProps = Omit<NuxtCheckboxProps<CheckboxValue>, keyof CheckboxOwnProps | 'modelValue' | 'defaultValue' | 'value' | 'description' | 'variant' | 'indicator' | 'highlight'> & ForwardedEvents<NuxtCheckboxEmits<CheckboxValue>> & UnsupportedChoiceProps;
/** 單個核取方塊參數；未列出的 Nuxt UI 核取方塊參數（icon、required 等）皆可直接使用；不支援 variant、indicator、highlight */
export interface CheckboxProps extends /* @vue-ignore */ InheritedCheckboxProps, CheckboxOwnProps {
}
/** 單個核取方塊自行宣告的參數 */
interface CheckboxOwnProps {
    /** 輸入框識別碼 */
    id?: string;
    /** 欄位名稱 */
    name?: string;
    /** 是否停用，未設定時沿用表單狀態 */
    disabled?: boolean;
    /** 元件顏色 */
    color?: NuxtCheckboxProps['color'];
    /** 是否顯示與原控制項同尺寸的骨架 */
    skeleton?: boolean;
    /** 顯示文字，預設為「啟用」。 */
    label?: string;
    /** 勾選時的回傳值，預設為數字 1。 */
    trueValue?: CheckboxValue;
    /** 取消勾選時的回傳值，預設為數字 0。 */
    falseValue?: CheckboxValue;
    /** 是否顯示載入中，以轉圈圖示取代勾選框並停用 */
    loading?: boolean;
    /** 元件尺寸，外框高度對齊同尺寸輸入框，預設 lg。 */
    size?: NuxtCheckboxProps['size'];
    /** 樣式覆寫，與內建樣式合併，同一 slot 衝突時以傳入值優先；可用函式取得預設值後自行取代 */
    ui?: CheckboxUi;
}
/** 單選群組排列模式：水平、垂直、網格或依視窗寬度自動切換。 */
export type RadioGroupOrientation = ChoiceGroupOrientation | 'grid';
/** 自動排列斷點，沿用 Tailwind 的 sm、md、lg、xl、2xl。 */
export type RadioGroupBreakpoint = ChoiceGroupBreakpoint;
/** 單選群組參數 */
/**
 * 沿用 Nuxt UI 單選群組的參數與事件，僅供型別推導；值經 `$attrs` 轉給 URadioGroup。
 * 排除元件自行宣告或改寫語意的項目：選項與欄位名稱由元件轉換；
 * 不支援 descriptionKey、variant、indicator、highlight：說明與 card／table 外框會撐高選項、破壞與輸入框對齊的高度，
 * 移動選項按鈕會讓載入圖示對不上，highlight 只在 card／table 有作用。
 */
type InheritedRadioGroupProps = Omit<NuxtRadioGroupProps, keyof RadioGroupOwnProps | 'modelValue' | 'defaultValue' | 'descriptionKey' | 'variant' | 'indicator' | 'highlight'> & ForwardedEvents<NuxtRadioGroupEmits> & UnsupportedChoiceProps;
/** 單選群組參數；未列出的 Nuxt UI 單選群組參數（legend、required 等）皆可直接使用；不支援 variant、indicator、highlight */
export interface RadioGroupProps<T extends object = RadioGroupOption> extends /* @vue-ignore */ InheritedRadioGroupProps, RadioGroupOwnProps<T> {
}
/** 單選群組自行宣告的參數 */
interface RadioGroupOwnProps<T extends object = RadioGroupOption> {
    /** 輸入框識別碼 */
    id?: string;
    /** 欄位名稱 */
    name?: string;
    /** 是否停用，未設定時沿用表單狀態 */
    disabled?: boolean;
    /** 元件顏色 */
    color?: NuxtRadioGroupProps['color'];
    /** 是否顯示與原控制項同尺寸的骨架 */
    skeleton?: boolean;
    /** 是否顯示載入中，以轉圈圖示取代各選項按鈕並停用 */
    loading?: boolean;
    /** 選項清單；字串選項的 label 與 value 皆為該字串，物件選項依 labelKey、valueKey 取得顯示名稱與綁定值。 */
    items: (T | string)[];
    /** 顯示名稱欄位，支援 `a.b` 路徑，預設 label */
    labelKey?: string;
    /** 綁定值欄位，支援 `a.b` 路徑，預設 value；欄位值須為字串 */
    valueKey?: string;
    /** 排列模式，預設依斷點自動切換。 */
    orientation?: RadioGroupOrientation;
    /** 自動排列斷點，視窗達此寬度時水平排列，預設 md。 */
    breakpoint?: RadioGroupBreakpoint;
    /** 元件尺寸，水平高度對齊同尺寸的輸入框，預設 lg。 */
    size?: NuxtRadioGroupProps['size'];
    /** 樣式覆寫；grid 模式以 fieldset 設定分欄與響應式斷點 class。 */
    ui?: NuxtRadioGroupProps['ui'];
}
/** 複選群組排列模式：水平、垂直、網格或依視窗寬度自動切換。 */
export type CheckboxGroupOrientation = ChoiceGroupOrientation | 'grid';
/** 自動排列斷點，沿用 Tailwind 的 sm、md、lg、xl、2xl。 */
export type CheckboxGroupBreakpoint = ChoiceGroupBreakpoint;
/** 複選群組參數 */
/**
 * 沿用 Nuxt UI 複選群組的參數與事件，僅供型別推導；值經 `$attrs` 轉給 UCheckboxGroup。
 * 排除元件自行宣告或改寫語意的項目：選項與欄位名稱由元件轉換；
 * 不支援 descriptionKey、variant、indicator、highlight：說明與 card／table 外框會撐高選項、破壞與輸入框對齊的高度，
 * 移動勾選框會讓載入圖示對不上，highlight 只在 card／table 有作用。
 */
type InheritedCheckboxGroupProps = Omit<NuxtCheckboxGroupProps, keyof CheckboxGroupOwnProps | 'modelValue' | 'defaultValue' | 'descriptionKey' | 'variant' | 'indicator' | 'highlight'> & ForwardedEvents<NuxtCheckboxGroupEmits> & UnsupportedChoiceProps;
/** 複選群組參數；未列出的 Nuxt UI 複選群組參數（legend、max、required 等）皆可直接使用；不支援 variant、indicator、highlight */
export interface CheckboxGroupProps<T extends object = CheckboxGroupOption> extends /* @vue-ignore */ InheritedCheckboxGroupProps, CheckboxGroupOwnProps<T> {
}
/** 複選群組自行宣告的參數 */
interface CheckboxGroupOwnProps<T extends object = CheckboxGroupOption> {
    /** 輸入框識別碼 */
    id?: string;
    /** 欄位名稱 */
    name?: string;
    /** 是否停用，未設定時沿用表單狀態 */
    disabled?: boolean;
    /** 元件顏色 */
    color?: NuxtCheckboxGroupProps['color'];
    /** 是否顯示與原控制項同尺寸的骨架 */
    skeleton?: boolean;
    /** 是否顯示載入中，以轉圈圖示取代各選項按鈕並停用 */
    loading?: boolean;
    /** 選項清單；字串選項的 label 與 value 皆為該字串，物件選項依 labelKey、valueKey 取得顯示名稱與綁定值。 */
    items: (T | string)[];
    /** 顯示名稱欄位，支援 `a.b` 路徑，預設 label */
    labelKey?: string;
    /** 綁定值欄位，支援 `a.b` 路徑，預設 value；欄位值須為字串 */
    valueKey?: string;
    /** 排列模式，預設依斷點自動切換。 */
    orientation?: CheckboxGroupOrientation;
    /** 自動排列斷點，視窗達此寬度時水平排列，預設 md。 */
    breakpoint?: CheckboxGroupBreakpoint;
    /** 元件尺寸，水平高度對齊同尺寸的輸入框，預設 lg。 */
    size?: NuxtCheckboxGroupProps['size'];
    /** 樣式覆寫；grid 模式以 fieldset 設定分欄與響應式斷點 class。 */
    ui?: NuxtCheckboxGroupProps['ui'];
}
/** 日期輸入框參數 */
export interface DatepickerProps<TRange extends boolean = false> {
    /** 是否顯示與原控制項同尺寸的骨架 */
    skeleton?: boolean;
    /** 主綁定值，單選為西元字串，範圍為 [起日, 迄日]；單選清空為 ''，範圍清空為 []。 */
    modelValue?: DatepickerValue<TRange>;
    /** 起始日期綁定值，僅範圍模式使用，清空或關閉範圍時為 ''。 */
    start?: string;
    /** 結束日期綁定值，僅範圍模式使用，尚無完整範圍或關閉範圍時為 ''。 */
    end?: string;
    /** 清除按鈕，預設關閉。 */
    clearable?: boolean;
    /** 尾端日曆圖示，預設 `i-lucide-calendar`。 */
    calendarIcon?: string;
    /** 清除按鈕圖示，預設 `i-lucide-x`。 */
    clearIcon?: string;
    /** 停用狀態，預設關閉。 */
    disabled?: boolean;
    /** 是否顯示載入中，以轉圈圖示取代尾端日曆圖示並停用輸入。 */
    loading?: boolean;
    /** 範圍選擇，預設關閉；boolean 交集保留 Vue 對裸 range 屬性的布林轉換。 */
    range?: TRange & boolean;
    /** 輸入框識別碼，用於連結外部標籤。 */
    id?: string;
    /** 欄位名稱，未設定時沿用 UFormField。 */
    name?: string;
    /** 元件尺寸，與 Nuxt UI 的五種 size 一致。 */
    size?: InputProps['size'];
    /** 驗證狀態，false 顯示錯誤，true 顯示成功，未指定時使用一般樣式。 */
    state?: boolean;
    /** 是否顯示民國年，預設開啟；不影響西元綁定值。 */
    roc?: boolean;
    /** 選擇模式，預設為年月日。 */
    mode?: DatepickerMode;
    /** 最早可選日期，民國模式至少為 1911/01/01。 */
    minDate?: DateValue;
    /** 最晚可選日期。 */
    maxDate?: DateValue;
    /** 西元年份選擇範圍，民國模式的下限至少為 1911。 */
    yearRange?: [number, number];
    /** 綁定值的日期分隔符號，預設 '/'；不可為空或含數字、空白、冒號，無效時沿用預設並警告。 */
    separator?: string;
}
/** 資訊提示樣式覆寫 */
export interface InfoTooltipUi {
    /** 觸發按鈕 */
    trigger?: SlotClass;
    /** 按鈕內的圖示 */
    icon?: SlotClass;
    /** 提示內容外層，處理換行與斷字 */
    text?: SlotClass;
    /** 提示框，同 Nuxt UI Tooltip 的 ui */
    tooltip?: TooltipProps['ui'];
}
/** 資訊提示參數 */
export interface InfoTooltipProps {
    /** 提示文字，支援換行字元 */
    text?: string;
    /** 提示圖示 */
    icon?: string;
    /** 圖示按鈕的無障礙名稱 */
    label?: string;
    /** 樣式覆寫，與內建樣式合併，同一 slot 衝突時以傳入值優先；可用函式取得預設值後自行取代 */
    ui?: InfoTooltipUi;
}
/** 表格參數 */
export interface ShuoTableProps<T extends TableData> {
    /** 表格資料，重新查詢期間請保留原值 */
    data: T[];
    /** 欄位設定，內容可透過對應 cell slot 自訂 */
    columns: TableColumn<T>[];
    /** 是否正在查詢 */
    loading?: boolean;
    /** 空資料說明 */
    empty?: string;
    /** 是否在高度變化與重新查詢淡化時播放過渡，預設開啟 */
    transition?: boolean;
    /** 額外 Table 設定 */
    tableProps?: Partial<TableProps<T>>;
}
/** 下拉選項 */
export interface SelectMenuOption {
    /** 顯示名稱 */
    label: string;
    /** 綁定值 */
    value: string;
}
/** 單選未選取時的綁定值 */
export type SelectMenuEmptyValue = '' | null;
/** 下拉選單樣式覆寫 */
export type SelectMenuUi = NonNullable<USelectMenuProps['ui']> & {
    /** 外層，負責量測省略文字與 Tooltip */
    wrapper?: SlotClass;
};
/**
 * 沿用 Nuxt UI 下拉選單的參數，僅供型別推導；值經 `$attrs` 轉給 USelectMenu。
 * 排除元件自行宣告或改寫語意的項目：綁定值另依 emptyValue 處理；清除按鈕的型別依 Nuxt UI 的 C 泛型推導，本元件未提供該泛型，一併排除。
 */
type InheritedSelectMenuProps<T extends SelectMenuItem[], VK extends GetItemKeys<T>, M extends boolean> = Omit<USelectMenuProps<T, VK, M>, keyof SelectMenuOwnProps<T, VK, M> | 'modelValue' | 'defaultValue' | 'modelModifiers' | 'clear' | 'clearIcon'> & ForwardedEvents<USelectMenuEmits<T, VK, M>>;
/** 下拉選單參數；未列出的 Nuxt UI 下拉選單參數（variant、icon、searchInput、content、descriptionKey 等）皆可直接使用 */
export interface SelectMenuProps<T extends SelectMenuItem[] = SelectMenuItem[], VK extends GetItemKeys<T> = GetItemKeys<T>, M extends boolean = false> extends /* @vue-ignore */ InheritedSelectMenuProps<T, VK, M>, SelectMenuOwnProps<T, VK, M> {
}
/** 下拉選單自行宣告的參數 */
interface SelectMenuOwnProps<T extends SelectMenuItem[] = SelectMenuItem[], VK extends GetItemKeys<T> = GetItemKeys<T>, M extends boolean = false> {
    /** 輸入框識別碼 */
    id?: string;
    /** 欄位名稱 */
    name?: string;
    /** 元件尺寸，預設 lg */
    size?: USelectMenuProps<T, VK, M>['size'];
    /** 元件顏色 */
    color?: USelectMenuProps<T, VK, M>['color'];
    /** 是否強調外框 */
    highlight?: boolean;
    /** 提示文字 */
    placeholder?: string;
    /** 是否開啟選單，未設定時由元件管理 */
    open?: boolean;
    /** 是否顯示與原控制項同尺寸的骨架 */
    skeleton?: boolean;
    /** 選項清單，字串選項同時作為顯示名稱與綁定值 */
    items: T;
    /** 顯示名稱欄位，預設 label */
    labelKey?: GetItemKeys<T>;
    /** 綁定值欄位，預設 value */
    valueKey?: VK;
    /** 是否允許多選，綁定值改為陣列 */
    multiple?: M;
    /** 顯示格式，支援 {value} 與 {label} 替換；預設 {label} 只顯示名稱，需要同時顯示值時可傳 {value}_{label}，或由全站設定 components.selectMenu.format 調整 */
    format?: string;
    /** 是否停用選單 */
    disabled?: boolean;
    /** 是否顯示載入中，以轉圈圖示取代尾端箭頭並停用選單 */
    loading?: boolean;
    /** 單選未選取時的綁定值，預設空字串；多選固定為空陣列 */
    emptyValue?: SelectMenuEmptyValue;
    /** 樣式覆寫，與內建樣式合併，同一 slot 衝突時以傳入值優先；可用函式取得預設值後自行取代 */
    ui?: SelectMenuUi;
}
/** 查詢條件卡片樣式覆寫；root、header、body 同 Nuxt UI 卡片的 slot */
export type QueryCardUi = NonNullable<CardProps['ui']> & {
    /** 標題列，排列圖示、標題、收合按鈕與右側內容，空間不足時右側內容換行 */
    bar?: SlotClass;
    /** 標題圖示 */
    icon?: SlotClass;
    /** 標題文字，預設不換行、不省略 */
    title?: SlotClass;
    /** 展開／收合按鈕 */
    toggle?: SlotClass;
    /** 標題列右側自訂內容的外層 */
    headerRight?: SlotClass;
    /** 查詢條件表單，內距沿用全站卡片內容 */
    form?: SlotClass;
    /** 查詢欄位格線 */
    grid?: SlotClass;
    /** 操作按鈕列 */
    actions?: SlotClass;
};
/** 查詢條件卡片參數 */
export interface QueryCardProps<S extends FormSchema = FormSchema> {
    /** 標題 */
    title?: string;
    /** 標題圖示，空字串可隱藏 */
    icon?: string;
    /** 收合時的展開按鈕圖示，預設 `i-lucide-chevron-down`。 */
    expandIcon?: string;
    /** 展開時的收合按鈕圖示，預設 `i-lucide-chevron-up`。 */
    collapseIcon?: string;
    /** 表單資料，由使用頁面管理與重設 */
    state: FormProps<S>['state'];
    /** 表單驗證規則 */
    schema?: S;
    /** 自訂驗證方法 */
    validate?: FormProps<S>['validate'];
    /** 觸發驗證的輸入事件 */
    validateOn?: FormProps<S>['validateOn'];
    /** 是否停用表單 */
    disabled?: boolean;
    /** 樣式覆寫，與內建樣式合併，同一 slot 衝突時以傳入值優先；可用函式取得預設值後自行取代 */
    ui?: QueryCardUi;
}
/** 清單卡片樣式覆寫，目前開放標題列各部位 */
export type ListCardUi = {
    /** 標題列，排列圖示、標題與右側內容，空間不足時右側內容換行 */
    bar?: SlotClass;
    /** 標題圖示 */
    icon?: SlotClass;
    /** 標題文字，預設不換行、不省略 */
    title?: SlotClass;
    /** 標題列右側自訂內容的外層 */
    headerRight?: SlotClass;
};
/** 清單卡片參數 */
export interface ListCardProps<T extends TableData = TableData> {
    /** 清單標題 */
    title?: string;
    /** 標題圖示，空字串可隱藏 */
    icon?: string;
    /** 已完成查詢的資料，重新查詢期間請保留原值 */
    data: T[];
    /** 欄位設定，內容可透過對應 cell slot 自訂 */
    columns: TableColumn<T>[];
    /** 是否正在查詢 */
    loading?: boolean;
    /** 空資料說明，未設定時沿用表格預設 */
    empty?: string;
    /** 是否在高度變化與重新查詢淡化時播放過渡，預設開啟 */
    transition?: boolean;
    /** 後端回傳的總筆數 */
    total?: number;
    /** 目前已載入的頁碼，從 1 起算 */
    page?: number;
    /** 每頁筆數，預設為 10 */
    pageSize?: number;
    /** 是否顯示分頁，只有一頁仍顯示 */
    showPagination?: boolean;
    /** 是否顯示筆數與範圍 */
    showSummary?: boolean;
    /** 額外 Table 設定 */
    tableProps?: Partial<TableProps<T>>;
    /** 樣式覆寫，與內建樣式合併，同一 slot 衝突時以傳入值優先；可用函式取得預設值後自行取代 */
    ui?: ListCardUi;
}
export {};

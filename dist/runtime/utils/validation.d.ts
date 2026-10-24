import * as v from 'valibot';
/** 文字必填規則，空字串、純空白、null 與 undefined 均不通過；保留原始文字。 */
export declare const requiredText: (label: string) => v.SchemaWithPipe<readonly [v.NullishSchema<v.StringSchema<string>, undefined>, v.StringSchema<string>, v.CheckAction<string, string>]>;
/** 數字必填規則，接受 0 與負數，拒絕空值、數字字串及非有限數字。 */
export declare const requiredNumber: (label: string) => v.SchemaWithPipe<readonly [v.NullishSchema<v.CustomSchema<number, v.ErrorMessage<v.CustomIssue> | undefined>, undefined>, v.CustomSchema<number, v.ErrorMessage<v.CustomIssue> | undefined>, v.FiniteAction<number, string>]>;
/** 陣列必填規則，至少一項；項目型別與驗證由傳入的 schema 決定。 */
export declare const requiredArray: <TItem extends v.GenericSchema>(label: string, itemSchema: TItem) => v.SchemaWithPipe<readonly [v.NullishSchema<v.ArraySchema<TItem, string>, undefined>, v.ArraySchema<TItem, string>, v.MinLengthAction<v.InferOutput<TItem>[], 1, string>]>;
/**
 * 選填電子信箱規則，空字串通過；有值時須符合 email 格式。
 * @param label 欄位名稱，預設錯誤訊息為「欄位名稱 格式錯誤」。
 */
export declare const optionalEmail: (label: string) => v.UnionSchema<[v.LiteralSchema<"", undefined>, v.SchemaWithPipe<readonly [v.StringSchema<undefined>, v.EmailAction<string, string>]>], undefined>;
/**
 * 選填非負數字規則，`null` 通過；有值時須為有限數字且不可小於 0，接受小數。
 * @param label 欄位名稱，預設錯誤訊息為「欄位名稱 必須是有效數字」或「欄位名稱 不可小於 0」。
 */
export declare const optionalNonNegativeNumber: (label: string) => v.NullableSchema<v.SchemaWithPipe<readonly [v.NumberSchema<string>, v.FiniteAction<number, string>, v.MinValueAction<number, 0, string>]>, undefined>;

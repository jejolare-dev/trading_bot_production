import { SuccessResponse } from './success-response';
import { ErrorResponse } from './error-response';

export type Response<T = unknown, K extends string = string, L = unknown> =
    | SuccessResponse<T>
    | ErrorResponse<K, L>;

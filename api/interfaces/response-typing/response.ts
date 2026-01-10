import { SuccessResponse } from './success-response';
import { ErrorResponse, ErrorType } from './error-response';

export type ServerResponse<T = unknown, K extends ErrorType = ErrorType> =
    | SuccessResponse<T>
    | ErrorResponse<K>;

import { ErrorType, ServerResponse } from '@/interfaces/response-typing';

export const enum SharedErrorCodes {
    INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export type InternalErrorType = {
    errorCode: SharedErrorCodes.INTERNAL_ERROR;
};

export type InternalErrorResponse = ServerResponse<never, InternalErrorType>;

export type GetServerError<T extends ErrorType> = T | InternalErrorType;

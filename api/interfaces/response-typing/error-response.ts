export type ErrorType = {
    errorCode: string;
    details?: unknown;
};

export type ErrorResponse<T extends ErrorType = ErrorType> = {
    success: false;
    error: T;
};

export type ErrorResponse<T extends string = string, K = unknown> = {
    success: false;
    errorCode: T;
    details: K;
};
